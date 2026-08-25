import { join } from "node:path";

import { fetchBrand } from "../brand";
import { convertReadmeMarkdown } from "../convert/run";
import { download } from "../download/run";
import { buildDocumentationJson } from "../output/documentationJson";
import type { OpenApiBinding, OpenApiMode } from "../output/documentationJson";
import { imagesOptions, projectDir } from "../paths";
import { formatPageWithFrontmatter } from "../utils/file";
import { getErrorMessage } from "../utils/errors";
import { log } from "../utils/log";
import { discoverSite } from "./discover";
import { placementsForUnreachable, tabsForUnreachable } from "./orphans";
import { renderMigrationMarkdown } from "./report";
import { DiskSink, type Sink } from "./sink";
import type { BrandResult } from "../brand";
import type { BlockerRow, CustomComponentRow, MigrationReport, PageReport } from "./types";

/** Project-relative, no leading slash — the only form the target accepts. */
const BRAND_CSS = "styles/brand.css";

/**
 * One URL in, a migrated project out.
 *
 * ## What this replaces
 *
 * Discovery, download and conversion were three tools with three entry points,
 * and the operator was the integration between them: scrape a sidebar, save it,
 * feed it to the downloader, take the downloader's `raw/`, paste pages into the
 * converter one at a time, and hold the result in their head. Every join was
 * manual and every join was where things were lost — a tab that scraped empty, a
 * page that 404'd, a component nothing mapped.
 *
 * This runs the same four stages in the same order and keeps the joins, so the
 * things that fall between them land in one report instead of three consoles.
 *
 * ## Why the stages stay separate underneath
 *
 * `discoverSite`, `download` and `convertReadmeMarkdown` are untouched and still
 * work alone. That matters more than it looks: the download cache is what makes a
 * re-run take seconds instead of re-fetching 1,500 pages, and it only works
 * because downloading remains a step with its own artefacts rather than an
 * invisible phase of something bigger. Re-running a migration after fixing one
 * conversion rule should not hammer the source, and here it does not.
 */

export type MigrateOptions = {
  /**
   * Where the files go. A `DiskSink` writes a folder; a memory sink keeps them
   * for a zip. Omit it and the run produces only the report — no cache, no
   * `.mdx` anywhere.
   */
  sink?: Sink;
  /**
   * The output root, `output/`. Only used to place the shared image folder and
   * to say in the report where a disk run landed — the files themselves go
   * through `sink`.
   */
  outDir?: string;
  /** Only pages whose slug starts with this. */
  filter?: string;
  limit?: number;
  concurrency?: number;
  /** Re-fetch pages already in the cache. */
  refetch?: boolean;
  /**
   * Save every image the pages reference into the **shared** `output/images/`
   * folder — outside every project, because images are named by a hash of their
   * own bytes and a logo used by three sites should be fetched once.
   *
   * Needs a real `outDir`, and defaults to on when there is one. **No page is
   * repointed**: every `src` keeps the URL it was authored with, so this is an
   * archive rather than a dependency — which is exactly why a run with nowhere
   * to write can skip it and still produce complete pages.
   */
  images?: boolean;
  /** Site name for `documentation.json`. Defaults to the host. */
  name?: string;
  /**
   * Read the source site's colours, logos and favicon into `documentation.json`.
   *
   * On by default — it is one extra request against a site the run is already
   * fetching hundreds of pages from, and a migrated site wearing the default blue
   * reads as unfinished long before anyone opens a page. `false` keeps
   * Documentation.AI's defaults.
   */
  brand?: boolean;
  /**
   * Point the config at the saved copies of the logo and favicon rather than the
   * source CDN. Off by default, for the same reason the image pass does not
   * repoint: re-hosting is a decision, not a side effect.
   */
  brandLocal?: boolean;
  /**
   * Write navigation entries for pages `llms.txt` listed and the sidebar walk
   * could not reach, grouped by their `llms.txt` section `[orphans.ts]`.
   *
   * On by default. Those pages are downloaded and converted either way, so
   * turning this off does not make the migration smaller — it only makes the
   * files it already wrote unreachable. `false` is for the case where the pages
   * are genuinely out of scope and the grouping would be noise; the honest
   * version of that is a `filter` at discovery, so nothing is fetched at all.
   */
  navUnreachable?: boolean;
};

/**
 * The file one page is written to, inside the project.
 *
 * **The slug is the path.** `docs/introduction` -> `docs/introduction.mdx`, at
 * the project root, because a navigation `path` is the MDX file path with `.mdx`
 * removed `[DAI §26]` and `buildDocumentationJson` emits the slug verbatim.
 *
 * A function rather than a `join` at the call site so the rule has one spelling
 * and a test can hold it against the navigation builder's. The two drifted once
 * already — a `pages/` prefix here against a bare `docs/introduction` there — and
 * the result was a valid config whose every entry pointed at a missing file.
 *
 * Plain `/`, never `node:path`: this is a path *inside the output*, which the
 * sink joins onto its own root and the zip writer reads with `/` as the
 * separator. `join` would spell it `\` on Windows and make phantom folders.
 */
export function pagePath(slug: string): string {
  return `${slug.replace(/^\/+/, "")}.mdx`;
}

/**
 * The folder every OpenAPI spec goes in.
 *
 * Not a preference: Documentation.AI reads specs from `api-reference/` at the
 * documentation root `[LIVE-DAI …/openapi-import]`, and a spec anywhere else is
 * a path the importer does not resolve — which shows up as a page with no
 * playground and no error.
 */
export const API_SPEC_DIR = "api-reference";

/**
 * The spec file for one page: `api-reference/<name>.json`.
 *
 * **Named, not converted.** ReadMe dumps JSON and the importer accepts `.json`
 * as readily as `.yaml` `[LIVE-DAI …/openapi-import]`, so the bytes are written
 * through untouched — no YAML serialiser, no dependency, and no chance of a
 * re-serialisation changing a contract on its way past.
 *
 * The last slug segment is the name, because `reference/cardenquiry` should
 * produce `api-reference/cardenquiry.json` rather than a folder tree mirroring
 * the site. `taken` guards the one case that breaks: two pages in different
 * folders sharing a final segment, where the second would otherwise overwrite
 * the first's spec and bind both pages to one endpoint. That collision falls
 * back to the full slug, which is unique by construction.
 */
export function specPath(slug: string, taken: Set<string> = new Set()): string {
  const clean = slug.replace(/^\/+/, "");
  const name = clean.split("/").filter(Boolean).at(-1) ?? clean;
  const short = `${API_SPEC_DIR}/${name}.json`;
  if (!taken.has(short)) return short;
  return `${API_SPEC_DIR}/${clean.replace(/\//g, "-")}.json`;
}

/** Whitespace-insensitive, because the body is reflowed markdown and the excerpt is one line. */
function sameText(a: string, b: string): boolean {
  return a.replace(/\s+/g, " ").trim() === b.replace(/\s+/g, " ").trim();
}

/**
 * Which half of the page the spec is allowed to write.
 *
 * `"custom"` injects only the playground and the request/response examples and
 * leaves the body alone; `"auto"` writes the whole endpoint page from the spec
 * `[LIVE-DAI …/openapi-import]`. So the question is simply *is there a body worth
 * protecting?*
 *
 * On a spec-generated site there is not — ReadMe's endpoint pages are a title,
 * one description line and the dump, so after the dump moves out the body is
 * empty or repeats the description the playground is about to render anyway.
 * Those pages want `"auto"`, and it is the difference between a six-line stub and
 * a complete endpoint reference.
 *
 * A page carrying real prose — Prerequisites, Resource information, error codes —
 * wants `"custom"`, because `"auto"` would render the spec *instead of* it and
 * lose every hand-written section on the page `[PIT Phase 2]`.
 */
export function specMode(mdx: string, description?: string): OpenApiMode {
  const body = mdx.trim();
  if (!body) return "auto";
  if (description && sameText(body, description)) return "auto";
  return "custom";
}

/** `https://docs.capillarytech.com/docs` -> `docs-capillarytech-com`. */
export function projectName(site: URL): string {
  return site.hostname.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

/**
 * Roll per-page findings up to one row per component.
 *
 * A migration is worked component by component, not page by page: deciding what
 * `<CapillaryLoyaltyWidget>` becomes is one decision that settles all 40 of its
 * call sites. Forty rows saying the same thing is how the one row that matters
 * gets missed.
 */
function rollUp(pages: PageReport[]): CustomComponentRow[] {
  const rows = new Map<string, CustomComponentRow>();

  for (const page of pages) {
    for (const entry of page.quarantined) {
      const row = rows.get(entry.name) ?? { name: entry.name, kind: entry.kind, uses: 0, pages: [] };
      row.uses += 1;
      if (!row.pages.includes(page.slug)) row.pages.push(page.slug);
      rows.set(entry.name, row);
    }
  }

  // Blockers first, then by how much work each one is. An `unknown` used twice
  // still outranks a `marketplace` orphan used twenty times, because the first
  // cannot be answered from anything on disk and the second can.
  const rank = { unknown: 0, local: 1, marketplace: 2 };
  return [...rows.values()].sort(
    (a, b) => rank[a.kind] - rank[b.kind] || b.uses - a.uses || a.name.localeCompare(b.name),
  );
}

export async function migrateSite(url: string, options: MigrateOptions = {}): Promise<MigrationReport> {
  const site = new URL(url);
  const project = projectName(site);
  const startedAt = new Date().toISOString();
  const sink = options.sink;
  // Where a disk run landed, for the report. The sink knows this too, but a
  // memory sink has no path to report and the two must not be confused.
  const outDir = options.outDir ? projectDir(project, options.outDir) : undefined;
  const withImages = options.images ?? options.outDir !== undefined;

  // 1. Discover. Throws when the site is not ReadMe or no tab has navigation —
  //    both mean there is nothing to migrate, which is a failure, not a report.
  log(`discovering ${site.toString()}`, "info");
  const discovery = await discoverSite(site, { filter: options.filter });

  // 1b. Brand. One request, for the colours and logos the site already publishes
  //     in the page ReadMe serves. Failing here must not fail the migration: a
  //     site with default colours is a cosmetic problem, an aborted run is not.
  let brand: BrandResult | undefined;
  if (options.brand !== false) {
    try {
      brand = await fetchBrand(site, {
        // The page discovery just fetched, rather than a second request for it.
        // That request was the single likeliest way to lose the whole brand: a
        // rate-limited source answers the *second* call 429, the catch below
        // swallows it, and the site ships default-blue with no logo and no
        // favicon — for a document already in memory.
        fetchHtml: async () => discovery.html,
        ...(outDir ? { outDir } : {}),
        ...(options.brandLocal ? { local: true } : {}),
      });
      const found = brand.report.found.map((row) => row.field).join(", ") || "nothing";
      log(`brand: ${found}`, "info");
    } catch (error) {
      // Named in full, because the symptom is silence: `documentation.json` is
      // still written, still valid, and simply has no colours, logo or favicon in
      // it, which reads as "the tool does not do branding" rather than as a
      // failure.
      log(
        `brand lookup failed${getErrorMessage(error)} — documentation.json keeps the default ` +
          "colours and gets no logo or favicon. Re-run to pick them up",
        "warn",
      );
    }
  }

  // 2. Download. `keepRaw` because stage 3 converts from the markdown this
  //    returns; without it every page would be read back off disk, and in memory
  //    mode there would be nothing to read.
  log(`downloading ${discovery.refs.length} pages`, "info");
  const downloaded = await download(discovery.refs, {
    ...(outDir ? { outDir: join(outDir, "download") } : {}),
    ...(options.filter ? { filter: options.filter } : {}),
    ...(options.limit !== undefined ? { limit: options.limit } : {}),
    ...(options.concurrency !== undefined ? { concurrency: options.concurrency } : {}),
    ...(options.refetch ? { refetch: true } : {}),
    keepRaw: true,
  });

  // 3. Convert, one page at a time and in order. Sequential on purpose: the
  //    conversion is CPU-bound and its only async step is image fetching, so
  //    fanning out would contend for the same core while making the progress log
  //    unreadable.
  const pages: PageReport[] = [];
  const blockers: BlockerRow[] = [];
  // Spec bindings by slug, handed to the navigation builder below. Filled only
  // by pages that carried a readable `# OpenAPI definition`; every other page
  // stays an ordinary entry, which is what a guide under `/reference/` needs.
  const bindings: Record<string, OpenApiBinding> = {};
  const specFiles = new Set<string>();

  for (const page of downloaded.pages) {
    const source = downloaded.raw?.[page.slug];
    if (source === undefined) {
      // `keepRaw` is set above, so this is unreachable — but a missing page is
      // silently converting nothing, and that is the failure mode this whole
      // report exists to make impossible.
      downloaded.failed.push({ slug: page.slug, message: "the downloaded markdown was not kept" });
      continue;
    }

    try {
      const result = await convertReadmeMarkdown(source, {
        title: page.title,
        site: site.toString(),
        // Straight to the shared folder, never through the sink: these are
        // content-addressed, shared between projects, and referenced by no page.
        ...(options.outDir && withImages ? { images: imagesOptions(options.outDir) } : {}),
      });

      for (const note of result.notes) {
        if (note.level === "blocker") {
          blockers.push({
            slug: page.slug,
            rule: note.rule,
            ...(note.line !== undefined ? { line: note.line } : {}),
            detail: note.detail,
          });
        }
      }

      // The download's title comes from llms.txt or the body H1; the conversion's
      // comes from the page's own frontmatter, which it had to read to drop. Where
      // both exist they agree, and where they do not the page's own is the one the
      // author wrote.
      const title = result.title || page.title;
      const description = result.description || page.description;
      const path = pagePath(page.slug);
      sink?.write({ path, body: formatPageWithFrontmatter(title, description, result.mdx) });

      // 3b. The spec the page carried, written beside it and bound to it.
      //
      //     Only the first operation binds. ReadMe dumps one per endpoint page,
      //     and the conversion has already flagged the page if it found more.
      let binding: OpenApiBinding | undefined;
      const operation = result.openapi?.operations[0];
      if (result.openapi && operation) {
        const spec = specPath(page.slug, specFiles);
        specFiles.add(spec);
        sink?.write({ path: spec, body: result.openapi.json });
        binding = { spec, method: operation.method, route: operation.route, mode: specMode(result.mdx, description) };
        bindings[page.slug] = binding;
      }

      pages.push({
        slug: page.slug,
        title,
        url: page.url,
        parseMode: result.parseMode,
        outputCompiles: result.outputCompiles,
        notes: {
          blocker: result.notes.filter((note) => note.level === "blocker").length,
          flag: result.notes.filter((note) => note.level === "flag").length,
          change: result.notes.filter((note) => note.level === "change").length,
        },
        quarantined: result.quarantined.map((entry) => ({
          name: entry.name,
          kind: entry.kind,
          ...(entry.line !== undefined ? { line: entry.line } : {}),
        })),
        ...(sink ? { path } : {}),
        ...(binding
          ? {
              openapi: {
                spec: binding.spec,
                method: binding.method,
                route: binding.route,
                mode: binding.mode,
              },
            }
          : {}),
      });
    } catch (error) {
      // A page that throws is a page missing from the output. It belongs in
      // `failed` beside the ones that 404'd, not in a swallowed catch.
      downloaded.failed.push({ slug: page.slug, message: `conversion failed${getErrorMessage(error)}` });
    }
  }

  const bound = Object.values(bindings);
  if (bound.length > 0) {
    const auto = bound.filter((entry) => entry.mode === "auto").length;
    log(
      `openapi: wrote ${bound.length} spec file(s) to ${API_SPEC_DIR}/ and bound them — ` +
        `${auto} page(s) generated from the spec, ${bound.length - auto} keeping their own body`,
      "info",
    );
  }

  // 4. Navigation. Real titles come from the download, so the sidebar reads the
  //    way the source did rather than in slugs title-cased back into words.
  const titles: Record<string, string> = {};
  for (const page of downloaded.pages) if (page.title) titles[page.slug] = page.title;

  // Pages that converted but no tab can reach — `llms.txt` lists more than the
  // sidebar walks. Built from `converted` rather than `discovery.refs` so a page
  // that 404'd or failed to convert never gets an entry pointing at a file that
  // was never written.
  const converted = new Set(pages.map((page) => page.slug));
  const unreachable = [...converted].filter((slug) => !discovery.navSlugs.has(slug)).sort();

  const navTabs =
    options.navUnreachable === false
      ? discovery.tabs
      : tabsForUnreachable(unreachable, discovery.refs, discovery.tabs);
  const placements =
    options.navUnreachable === false
      ? []
      : placementsForUnreachable(unreachable, discovery.refs, discovery.tabs);

  if (placements.length > 0) {
    log(
      `navigation: placed ${unreachable.length} page(s) the sidebar could not reach — ` +
        placements.map((row) => `${row.section} (${row.count})`).join(", "),
      "info",
    );
  }

  const { name: brandName, colors, ...logos } = brand?.config ?? {};
  const config = buildDocumentationJson(navTabs, {
    // An explicit `--name` outranks the project's own name, which outranks the
    // hostname the builder falls back to.
    ...(options.name ? { name: options.name } : brandName ? { name: brandName } : {}),
    site: site.toString(),
    titles,
    // Without this the spec files are written and nothing reads them: the
    // playground is bound here or not at all.
    ...(Object.keys(bindings).length > 0 ? { openapi: bindings } : {}),
    normalizeGroupCase: true,
    ...(colors ? { colors } : {}),
    ...(Object.keys(logos).length > 0 ? { logos } : {}),
    // Only registered when the file is actually written, since Documentation.AI
    // requires a referenced stylesheet to exist.
    ...(brand && outDir ? { css: [{ src: BRAND_CSS }] } : {}),
  });

  const report: MigrationReport = {
    project,
    site: site.toString(),
    startedAt,
    finishedAt: new Date().toISOString(),
    ...(outDir ? { outDir } : {}),
    discovery: discovery.report,
    totals: {
      pages: downloaded.pages.length + downloaded.failed.length,
      converted: pages.length,
      failed: downloaded.failed.length,
      compiles: pages.filter((page) => page.outputCompiles).length,
      needRepair: pages.filter((page) => page.parseMode === "markdown").length,
      blockers: blockers.length,
      flags: pages.reduce((sum, page) => sum + page.notes.flag, 0),
      quarantined: pages.reduce((sum, page) => sum + page.quarantined.length, 0),
      endpoints: Object.keys(bindings).length,
    },
    pages,
    customComponents: rollUp(pages),
    blockers,
    failed: downloaded.failed,
    ...(brand ? { brand: brand.report } : {}),
    notInNavigation: unreachable,
    ...(placements.length > 0 ? { navPlacements: placements } : {}),
  };

  if (brand) {
    sink?.write({ path: BRAND_CSS, body: brand.css });
    // The extracted values, with where each came from. The config shows what was
    // used; this shows what was found and how much to trust it.
    sink?.write({ path: "brand.json", body: JSON.stringify(brand.brand, undefined, 2) });
  }
  sink?.write({ path: "documentation.json", body: JSON.stringify(config, undefined, 2) });
  sink?.write({ path: "report.json", body: JSON.stringify(report, undefined, 2) });
  sink?.write({ path: "report.md", body: renderMigrationMarkdown(report) });

  return report;
}
