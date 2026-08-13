#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  fetchLlmsTxt,
  pagesFromDiscoveryReport,
  parseLlmsTxt,
  slugFromUrl,
  toMarkdownUrl,
  toPageUrl,
} from "./harvest/fetch";
import { harvest } from "./harvest/run";
import type { PageRef } from "./harvest/types";
import { log } from "./utils/log";

/**
 * Usage:
 *   npm run harvest -- https://docs.capillarytech.com
 *   npm run harvest -- https://docs.capillarytech.com --filter docs/loyalty --limit 25
 *   npm run harvest -- https://docs.capillarytech.com/docs/create-a-reward --page
 *   npm run harvest -- --from-report output/discovery-report.json
 *   npm run harvest -- --llms ./llms.txt
 *
 * Flags: --out <dir> (default ./output/harvest), --filter <slug-prefix>,
 *        --limit <n>, --concurrency <n> (default 6), --delay <ms> (default 300),
 *        --refetch, --page.
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

async function resolvePages(
  positional: string[],
  flags: Record<string, string | boolean>
): Promise<PageRef[]> {
  if (typeof flags["from-report"] === "string") {
    return pagesFromDiscoveryReport(flags["from-report"]);
  }
  if (typeof flags.llms === "string") {
    return parseLlmsTxt(readFileSync(flags.llms, "utf8"));
  }
  if (flags.page) {
    return positional.map(singlePageRef);
  }

  const url = positional[0];
  if (!url) throw new Error("A site URL is required (or use --from-report / --llms / --page)");
  return fetchLlmsTxt(url);
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));

  const outDir =
    typeof flags.out === "string" ? flags.out : join(process.cwd(), "output", "harvest");

  let refs: PageRef[];
  try {
    refs = await resolvePages(positional, flags);
  } catch (error) {
    log(error instanceof Error ? error.message : String(error), "failure");
    process.exit(1);
  }

  if (!refs.length) {
    log("No pages to harvest", "failure");
    process.exit(1);
  }
  log(`${refs.length} pages listed`, "info");

  const report = await harvest(refs, {
    outDir,
    filter: typeof flags.filter === "string" ? flags.filter : undefined,
    limit: typeof flags.limit === "string" ? Number(flags.limit) : undefined,
    concurrency: typeof flags.concurrency === "string" ? Number(flags.concurrency) : undefined,
    delayMs: typeof flags.delay === "string" ? Number(flags.delay) : undefined,
    refetch: flags.refetch === true,
  });

  const fallbacks = report.inventory.parseFallbacks.length;
  log(
    `${report.pages.length} pages harvested (${report.fetched} fetched, ${report.fromCache} from cache), ` +
      `${report.failed.length} failed, ${fallbacks} needed the lenient parser`,
    report.failed.length ? "warn" : "success"
  );
  log(
    `${report.inventory.components.length} distinct constructs across ${report.inventory.blocks} blocks. ` +
      `Wrote raw/, ir/, index.json, inventory.json and inventory.md under ${outDir}`,
    "success"
  );

  const unmapped = report.inventory.components.filter((row) => row.target.status === "manual");
  if (unmapped.length) {
    log(
      `${unmapped.length} constructs have no direct Documentation.AI equivalent: ` +
        unmapped.map((row) => `${row.name} (${row.count})`).join(", "),
      "warn"
    );
  }

  process.exit(0);
}

main().catch((error) => {
  log(error instanceof Error ? error.message : String(error), "failure");
  process.exit(1);
});
