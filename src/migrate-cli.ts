#!/usr/bin/env node
import { join } from "node:path";

import { migrateSite } from "./migrate/run";
import { DiskSink } from "./migrate/sink";
import { IMAGE_DIR } from "./constants";
import { outputRoot, projectDir } from "./paths";
import { log, logTable } from "./utils/log";
import { projectName } from "./migrate/run";

/**
 * The whole migration, from one URL.
 *
 * Usage:
 *   npm run migrate -- https://docs.capillarytech.com
 *   npm run migrate -- https://docs.capillarytech.com --filter docs/loyalty
 *   npm run migrate -- https://docs.capillarytech.com --limit 50 --refetch
 *
 * Flags: --out <dir> (default ./output/projects), --filter <slug-prefix>,
 *        --limit <n>, --concurrency <n>, --name <site name>, --refetch,
 *        --no-images, --no-brand, --brand-local.
 *
 * Writes, under `--out/<project>/`:
 *
 *   download/raw/<slug>.md    the source, byte for byte — also the cache
 *   download/ir/<slug>.json   every block on that page, and what it becomes
 *   download/inventory.md     the site-wide census
 *   <slug>.mdx                the converted page, at the root so its path
 *                             matches `documentation.json` exactly
 *   images/                   a copy of every image (pages still point at the CDN)
 *   brand/                    the site's logo and favicon, saved the same way
 *   styles/brand.css          the brand palette as CSS variables
 *   brand.json                what was found, and which source answered each value
 *   documentation.json        the navigation, colours and logos
 *   report.json               the run, as data
 *   report.md                 the run, as something to read
 *
 * Re-running is cheap: `raw/` is a cache, so a second run after a rule change
 * re-converts in seconds instead of re-fetching the site. `--refetch` is how you
 * ask for the network again.
 */
function parseArgs(argv: string[]) {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg) continue;
    if (arg.startsWith("--")) {
      const key = arg.substring(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i += 1;
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

async function main(): Promise<void> {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const site = positional[0];

  if (!site) {
    log("Usage: npm run migrate -- <docs-site-url> [--filter <slug>] [--limit <n>]", "error");
    process.exit(1);
  }

  try {
    new URL(site);
  } catch {
    log(`Invalid link: ${site} — it must start with http(s)://`, "error");
    process.exit(1);
  }

  // The output *root*. Projects go in `projects/<name>/` under it and images in
  // the shared `images/` beside them, so one flag places both.
  const outDir = readFlag(flags, "out") ?? outputRoot();

  const report = await migrateSite(site, {
    outDir,
    sink: new DiskSink(projectDir(projectName(new URL(site)), outDir)),
    ...(readFlag(flags, "filter") ? { filter: readFlag(flags, "filter") as string } : {}),
    ...(readNumber(flags, "limit") !== undefined ? { limit: readNumber(flags, "limit") as number } : {}),
    ...(readNumber(flags, "concurrency") !== undefined
      ? { concurrency: readNumber(flags, "concurrency") as number }
      : {}),
    ...(readFlag(flags, "name") ? { name: readFlag(flags, "name") as string } : {}),
    ...(flags.refetch ? { refetch: true } : {}),
    ...(flags["no-images"] ? { images: false } : {}),
    ...(flags["no-brand"] ? { brand: false } : {}),
    ...(flags["brand-local"] ? { brandLocal: true } : {}),
  });

  const { totals } = report;
  log(
    `${totals.converted}/${totals.pages} pages converted · ${totals.blockers} blockers · ` +
      `${totals.quarantined} components fenced`,
    totals.failed || totals.blockers ? "warn" : "success",
  );

  if (report.customComponents.length) {
    logTable("Components still owed a decision", report.customComponents, {
      columns: ["name", "kind", "uses"],
    });
  }

  if (report.failed.length) {
    logTable("Pages that could not be fetched", report.failed.slice(0, 20), {
      columns: ["slug", "message"],
    });
    log(
      `${report.failed.length} pages failed. They must be dropped from documentation.json, or it ` +
        "will point at files that do not exist.",
      "warn",
    );
  }

  // Printed rather than only written, because the number that decides whether a
  // run was any good is the one nobody thinks to open a file for.
  if (totals.compiles < totals.converted) {
    log(`${totals.converted - totals.compiles} pages will not compile as MDX — see report.md`, "error");
  }
  if (totals.needRepair > 0) {
    log(
      `${totals.needRepair} pages needed the lenient parser and got no component conversions — ` +
        "repair their source and run again",
      "warn",
    );
  }

  const wrote = [
    "<slug>.mdx",
    "download/",
    ...(report.brand ? ["brand/", "styles/brand.css", "brand.json"] : []),
    "documentation.json",
    "report.json",
    "report.md",
  ];
  log(`Wrote ${wrote.join(", ")} under ${report.outDir}`, "success");
  // Named separately because it is deliberately *not* in there: images are
  // content-addressed, so one folder beside the projects means a logo shared by
  // three sites is fetched once instead of three times.
  log(`Images went to ${join(outDir, IMAGE_DIR)}, shared by every project`, "info");
  process.exit(report.failed.length ? 1 : 0);
}

main().catch((error: unknown) => {
  log(error instanceof Error ? error.message : String(error), "error");
  process.exit(1);
});
