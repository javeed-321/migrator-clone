import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { getErrorMessage } from "../utils/errors";
import { write } from "../utils/file";
import { intoChunks } from "../utils/intoChunks";
import { log } from "../utils/log";
import { buildBlocks } from "./blocks";
import { fetchMarkdown } from "./fetch";
import { buildInventory, renderInventoryMarkdown } from "./inventory";
import type { Inventory, PageIR, PageRef } from "./types";

export type DownloadOptions = {
  /**
   * Where the cache and the artefacts live. Omit it to run entirely in memory —
   * nothing is read from or written to disk. That is the mode the web UI uses:
   * a browser request should not leave files behind in the repo, and it only
   * ever asks for a handful of pages anyway.
   */
  outDir?: string;
  /** Skip a page whose raw `.md` is already cached — the run is resumable. */
  refetch?: boolean;
  /** Only pages whose slug starts with this. */
  filter?: string;
  limit?: number;
  concurrency?: number;
  /** Pause between chunks, in ms. The source rate-limits well before 16-wide. */
  delayMs?: number;
  /** Return each page's raw markdown alongside its IR — the UI shows both. */
  keepRaw?: boolean;
  /**
   * Called after each chunk, with how many of the selected pages are done.
   *
   * A chunk, not a page: the fan-out resolves six at a time, so a per-page call
   * would report six identical instants and then a pause. The chunk boundary is
   * where the number actually changes.
   */
  onProgress?: (done: number, total: number) => void;
};

/**
 * Six at a time, with a breath between chunks.
 *
 * Step 8 fetches HTML 16-wide, but that is a different endpoint: at 16 the
 * markdown endpoint starts answering 429 part way through a run. Six plus a
 * short pause holds across a full-site download, and the cache means the cost is
 * paid once.
 */
const HARVEST_CONCURRENCY = 6;
const HARVEST_DELAY_MS = 300;

export type DownloadReport = {
  site: string;
  /** The pages downloaded by *this* run, in the order they were listed. */
  pages: PageIR[];
  failed: { slug: string; message: string }[];
  fromCache: number;
  fetched: number;
  /**
   * Built from every page on disk, not just this run's — see `loadExistingIR`.
   * In memory mode it covers exactly the pages in `pages`.
   */
  inventory: Inventory;
  /** slug -> raw markdown, when `keepRaw` is set. */
  raw?: Record<string, string>;
};

/**
 * `output/download/raw/<slug>.md` — the source, byte for byte.
 *
 * Kept because it is the only thing a conversion can be checked against, and
 * because re-running the IR builder against a cache takes seconds where
 * re-fetching 1,500 pages takes minutes and hammers the source.
 */
function rawPath(outDir: string, slug: string): string {
  return join(outDir, "raw", `${slug}.md`);
}

/** `output/download/ir/<slug>.json` — the block IR for one page. */
function irPath(outDir: string, slug: string): string {
  return join(outDir, "ir", `${slug}.json`);
}

/**
 * Every page IR already on disk, minus the ones this run just rewrote.
 *
 * Downloading 1,500 pages is naturally done in batches (`--filter`, `--limit`),
 * and an inventory that only covered the current batch would be misleading the
 * moment you ran a second one. The census is therefore always built from
 * everything in `ir/`, not just from what was fetched this time.
 */
function loadExistingIR(outDir: string, exclude: Set<string>): PageIR[] {
  const root = join(outDir, "ir");
  if (!existsSync(root)) return [];

  const pages: PageIR[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(path);
      } else if (entry.name.endsWith(".json")) {
        try {
          const page = JSON.parse(readFileSync(path, "utf8")) as PageIR;
          if (page.slug && !exclude.has(page.slug)) pages.push(page);
        } catch {
          // A half-written file from an interrupted run — the next download of
          // that slug replaces it.
        }
      }
    }
  };
  walk(root);
  return pages;
}

async function downloadPage(
  ref: PageRef,
  opts: DownloadOptions,
  host: string
): Promise<{ page: PageIR; cached: boolean; raw: string }> {
  const cache = opts.outDir ? rawPath(opts.outDir, ref.slug) : undefined;
  const cached = !!cache && !opts.refetch && existsSync(cache);
  const text = cached && cache ? readFileSync(cache, "utf8") : await fetchMarkdown(ref.source);

  if (cache && !cached) write(cache, text);

  const { frontmatter, blocks, components, parseMode, parseError } = buildBlocks(text, host);

  // The `.md` body opens with an H1 that repeats the page title. llms.txt has
  // the title too, so whichever is present wins in that order.
  const heading = blocks.find((block) => block.kind === "heading" && block.depth === 1);

  const page: PageIR = {
    slug: ref.slug,
    source: ref.source,
    url: ref.url,
    title: ref.title || heading?.text || "",
    description: ref.description,
    section: ref.section,
    kind: ref.kind,
    frontmatter,
    parseMode,
    ...(parseError ? { parseError } : {}),
    components,
    blocks,
  };

  if (opts.outDir) write(irPath(opts.outDir, ref.slug), JSON.stringify(page, undefined, 2));
  return { page, cached, raw: text };
}

/**
 * Fetch -> parse -> IR, for a whole page list.
 *
 * The same chunked fan-out step 8 uses for HTML, at a gentler width. Nothing is
 * converted here on purpose: the run stops with the source frozen and every
 * component in it named, which is the point at which you can decide what the
 * conversion should do.
 */
export async function download(refs: PageRef[], opts: DownloadOptions): Promise<DownloadReport> {
  const selected = refs
    .filter((ref) => !opts.filter || ref.slug.startsWith(opts.filter.replace(/^\//, "")))
    .slice(0, opts.limit ?? Infinity);

  const host = selected[0] ? new URL(selected[0].source).host : "";
  const pages: PageIR[] = [];
  const failed: { slug: string; message: string }[] = [];
  const raw: Record<string, string> = {};
  let fromCache = 0;

  const chunks = intoChunks(selected, opts.concurrency ?? HARVEST_CONCURRENCY);
  const delayMs = opts.delayMs ?? HARVEST_DELAY_MS;
  let done = 0;

  for (const chunk of chunks) {
    if (done) await new Promise((resolve) => setTimeout(resolve, delayMs));
    const results = await Promise.all(
      chunk.map(async (ref) => {
        try {
          return { ok: true as const, ...(await downloadPage(ref, opts, host)) };
        } catch (error) {
          return { ok: false as const, slug: ref.slug, message: getErrorMessage(error) };
        }
      })
    );

    for (const result of results) {
      if (result.ok) {
        pages.push(result.page);
        if (opts.keepRaw) raw[result.page.slug] = result.raw;
        if (result.cached) fromCache++;
      } else {
        failed.push({ slug: result.slug, message: result.message });
      }
    }

    done += chunk.length;
    log(`downloaded ${done}/${selected.length}`, "info");
    opts.onProgress?.(done, selected.length);
  }

  const site = host ? `https://${host}` : "";
  const all = opts.outDir
    ? [...pages, ...loadExistingIR(opts.outDir, new Set(pages.map((page) => page.slug)))].sort(
        (a, b) => a.slug.localeCompare(b.slug)
      )
    : pages;
  const inventory = buildInventory(
    all,
    site,
    opts.filter ? `llms.txt, filtered to ${opts.filter}` : "llms.txt"
  );

  if (opts.outDir) {
    write(
      join(opts.outDir, "index.json"),
      JSON.stringify(
        {
          site,
          pages: all.map((page) => ({
            slug: page.slug,
            title: page.title,
            kind: page.kind,
            section: page.section,
            url: page.url,
            source: page.source,
            parseMode: page.parseMode,
            blocks: page.blocks.length,
            components: page.components,
          })),
          failed,
        },
        undefined,
        2
      )
    );
    write(join(opts.outDir, "inventory.json"), JSON.stringify(inventory, undefined, 2));
    write(join(opts.outDir, "inventory.md"), renderInventoryMarkdown(inventory));
  }

  return {
    site,
    pages,
    failed,
    fromCache,
    fetched: pages.length - fromCache,
    inventory,
    ...(opts.keepRaw ? { raw } : {}),
  };
}
