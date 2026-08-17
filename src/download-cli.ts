#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { pagesFromDocumentationJson } from "./convert/pages";
import {
  fetchLlmsTxt,
  parseLlmsTxt,
  slugFromUrl,
  toMarkdownUrl,
  toPageUrl,
} from "./download/fetch";
import { download } from "./download/run";
import type { PageRef } from "./download/types";
import { log, logTable } from "./utils/log";

/**
 * Stage 2: download every page's authored markdown and describe what is in it.
 *
 * Usage:
 *   npm run download -- https://docs.capillarytech.com
 *   npm run download -- https://docs.capillarytech.com --from documentation.json
 *   npm run download -- https://docs.capillarytech.com --from ./my-config.json
 *   npm run download -- https://docs.capillarytech.com --from ./llms.txt
 *   npm run download -- https://docs.capillarytech.com/docs/create-a-reward --page
 *
 * Flags: --from <source> (default: the site's own llms.txt), --out <dir>
 *        (default ./output/download), --filter <slug-prefix>, --limit <n>,
 *        --concurrency <n> (default 6), --delay <ms> (default 300), --refetch,
 *        --page.
 *
 * There used to be two commands here, `harvest` and `convert`, differing only in
 * where the page list came from. They are one command with a `--from` flag, so
 * the fetching, caching and inventory can never drift between them.
 *
 * What it writes, under `--out`:
 *
 *   raw/<slug>.md    the page exactly as authored — the cache, and the thing a
 *                    conversion is checked against
 *   ir/<slug>.json   every block on that page: what it is and what it becomes
 *   inventory.md     the site-wide census, which is the work estimate
 *
 * Nothing is converted here. Stage 3 reads `raw/` from disk, which is what makes
 * it re-runnable in seconds instead of re-fetching a 2,000-page site.
 */
function parseArgs(argv: string[]) {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg) continue;
    if (arg.startsWith("--")) {
      const key = arg.substring(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

function readFlag(flags: Record<string, string | boolean>, key: string): string | undefined {
  return typeof flags[key] === "string" ? (flags[key] as string) : undefined;
}

function readNumber(flags: Record<string, string | boolean>, key: string): number | undefined {
  const raw = readFlag(flags, key);
  return raw === undefined ? undefined : Number(raw);
}

/** One page, addressed directly — `--page`. */
function singlePageRef(url: string): PageRef {
  const source = toMarkdownUrl(url);
  const slug = slugFromUrl(source);
  return {
    title: "",
    description: "",
    source,
    url: toPageUrl(source),
    slug,
    section: "",
    kind: slug.startsWith("reference/") ? "api" : slug.startsWith("page/") ? "page" : "guide",
  };
}

/**
 * Where the page list comes from.
 *
 * A `.json` is a `documentation.json` — the navigation stage 1 produced, which
 * is the list you want when the migration should mirror the site's own sidebar.
 * A `.txt` is an llms.txt file already on disk. Anything else, and the site's
 * own `llms.txt` is fetched: it lists more pages than the sidebar does, because
 * the sidebar deliberately skips API-reference endpoints.
 */
async function resolvePages(
  site: string,
  from: string | undefined,
  flags: Record<string, string | boolean>
): Promise<{ refs: PageRef[]; source: string }> {
  if (flags.page) {
    const refs = [site, ...parseArgs(process.argv.slice(3)).positional.slice(1)].map(singlePageRef);
    return { refs, source: "the URLs given" };
  }

  if (from && from.endsWith(".json")) {
    const path = from.includes("/") ? from : join(process.cwd(), from);
    const config = JSON.parse(readFileSync(path, "utf8"));
    const list = pagesFromDocumentationJson(config, {
      site,
      filter: readFlag(flags, "filter"),
      limit: readNumber(flags, "limit"),
    });

    if (list.duplicates.length) {
      log(
        `${list.duplicates.length} duplicate paths in the config; the first of each was kept`,
        "warn"
      );
    }
    if (list.skipped.length) {
      logTable("Entries with nothing to fetch", list.skipped, { columns: ["path", "reason"] });
    }
    return { refs: list.pages, source: path };
  }

  if (from && from.endsWith(".txt")) {
    return { refs: parseLlmsTxt(readFileSync(from, "utf8")), source: from };
  }

  return { refs: await fetchLlmsTxt(site), source: "llms.txt" };
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));

  const site = positional[0];
  if (!site) {
    log("A site URL is required: npm run download -- https://docs.example.com", "failure");
    process.exit(1);
  }

  const outDir = readFlag(flags, "out") ?? join(process.cwd(), "output", "download");

  // --- Step 1: the page list -----------------------------------------------
  let refs: PageRef[];
  let source: string;
  try {
    ({ refs, source } = await resolvePages(site, readFlag(flags, "from"), flags));
  } catch (error) {
    log(error instanceof Error ? error.message : String(error), "failure");
    process.exit(1);
  }

  if (!refs.length) {
    log(`No pages listed by ${source}`, "failure");
    process.exit(1);
  }
  log(`${refs.length} pages listed from ${source}`, "info");

  // --- Step 2: fetch each `<slug>.md`, cache it, describe it ----------------
  const report = await download(refs, {
    outDir,
    filter: readFlag(flags, "filter"),
    limit: readNumber(flags, "limit"),
    concurrency: readNumber(flags, "concurrency"),
    delayMs: readNumber(flags, "delay"),
    refetch: flags.refetch === true,
  });

  log(
    `${report.pages.length} pages ready (${report.fetched} fetched, ${report.fromCache} from cache), ` +
      `${report.failed.length} failed`,
    report.failed.length ? "warn" : "success"
  );
  log(`Cached under ${join(outDir, "raw")} — re-running is free from here`, "info");

  if (report.failed.length) {
    logTable("Failed pages", report.failed.slice(0, 20), { columns: ["slug", "message"] });
    log(
      `${report.failed.length} pages could not be fetched. They must be dropped from the ` +
        `navigation before writing documentation.json, or it will point at files that do not exist.`,
      "warn"
    );
  }

  const fallbacks = report.inventory.parseFallbacks.length;
  if (fallbacks) {
    log(`${fallbacks} pages needed the lenient parser — their syntax needs repairing`, "warn");
  }

  const manual = report.inventory.components.filter((row) => row.target.status === "manual");
  if (manual.length) {
    log(
      `${manual.length} constructs have no Documentation.AI equivalent and will need a human: ` +
        manual.map((row) => `${row.name} (${row.count})`).join(", "),
      "warn"
    );
  }

  log(`Wrote raw/, ir/, index.json, inventory.json and inventory.md under ${outDir}`, "success");
  process.exit(report.failed.length ? 1 : 0);
}

main().catch((error) => {
  log(error instanceof Error ? error.message : String(error), "failure");
  process.exit(1);
});
