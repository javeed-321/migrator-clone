#!/usr/bin/env node
import { join } from "node:path";

import { FINAL_SUCCESS_MESSAGE } from "./constants";
import { discover } from "./index";
import { write } from "./utils/file";
import { log } from "./utils/log";

/**
 * Usage:
 *   npm run discover -- <url> [--filter /docs] [--out ./output] [--no-fetch]
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

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const url = positional[0];

  if (!url) {
    console.error(
      "Usage: npm run discover -- <url> [--filter /docs] [--out ./output] [--no-fetch]"
    );
    process.exit(1);
  }

  try {
    new URL(url);
  } catch {
    console.error(`Invalid link: ${url}\nMake sure the link starts with http:// or https://`);
    process.exit(1);
  }

  const outDir = typeof flags.out === "string" ? flags.out : join(process.cwd(), "output");
  const skipFetch = flags["no-fetch"] === true;

  const result = await discover(url, {
    filter: typeof flags.filter === "string" ? flags.filter : undefined,
    outDir: skipFetch ? undefined : join(outDir, "html"),
    mdxDir: skipFetch ? undefined : join(outDir, "pages"),
    skipFetch,
  });

  if (!result.success || !result.data) {
    log(result.success ? "Discovery returned no data" : result.message, "failure");
    process.exit(1);
  }

  // `pages` holds every page's MDX; it is already on disk under `pages/` and
  // would dwarf the rest of the report.
  const { docsConfig, pages, ...report } = result.data;

  write(join(outDir, "docs.json"), JSON.stringify(docsConfig, undefined, 2));
  write(join(outDir, "discovery-report.json"), JSON.stringify(report, undefined, 2));

  log(
    `${report.discovered.length} links discovered ` +
      `(${report.internal.length} internal, ${report.external.length} external, ` +
      `${report.root.length} root, ${report.failed.length} failed)`,
    "info"
  );
  if (pages.length) log(`${pages.length} pages converted to MDX under ${join(outDir, "pages")}`, "success");
  log(FINAL_SUCCESS_MESSAGE, "success");
  process.exit(0);
}

main().catch((error) => {
  log(error instanceof Error ? error.message : String(error), "failure");
  process.exit(1);
});
