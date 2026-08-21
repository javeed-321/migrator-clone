import { zip as zipCallback } from "fflate";

import type { OutputFile } from "./sink";

/**
 * A migration's files, as one `.zip` a browser downloads.
 *
 * ## Why this exists at all
 *
 * The disk sink writes a folder, which is the right answer on your own machine
 * and a meaningless one on a deployed server: that server's filesystem is not
 * the reader's, so a folder written there is a folder nobody can reach. A zip is
 * the only shape that crosses the gap.
 *
 * ## What is deliberately not in it
 *
 * **Images.** Every `src` in the converted pages still points at the URL it was
 * authored with, so the pages are complete without them — the local copy is an
 * archive for re-hosting later, not a dependency. Including them would multiply
 * a few megabytes of markdown by hundreds of megabytes of binary for no gain in
 * what the reader can do with the result. `npm run migrate` is where you go when
 * you want the images.
 *
 * **The raw downloads.** Same reasoning: `download/raw/` is the cache and the
 * audit trail, and neither travels usefully through a browser.
 *
 * Both are excluded by never being handed to the sink in the first place, not by
 * being filtered out here — so there is one rule, in one place.
 *
 * ## One folder inside
 *
 * Every entry is prefixed with the project name, so unzipping produces a single
 * folder rather than emptying two hundred files into Downloads.
 */

/** Files -> zip bytes, with `project/` as the archive's single root folder. */
export function buildZip(project: string, files: OutputFile[]): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const entries: Record<string, Uint8Array> = {};

  for (const file of files) {
    // Backslashes are a legal filename character on the platforms that matter
    // and a directory separator inside a zip, so a path that arrived from
    // `node:path` on Windows would otherwise create phantom folders.
    const path = `${project}/${file.path.replace(/\\/g, "/")}`;
    entries[path] = typeof file.body === "string" ? encoder.encode(file.body) : file.body;
  }

  return new Promise((resolve, reject) => {
    // Level 6 rather than the maximum: this is markdown and JSON, which is
    // mostly compressed by the first few passes, and the last two levels buy a
    // few percent for a large multiple of the CPU time — paid while someone
    // waits on a request.
    zipCallback(entries, { level: 6 }, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

/** `docs-capillarytech-com` -> `docs-capillarytech-com.zip`, for the download. */
export function zipFilename(project: string): string {
  return `${project.replace(/[^a-z0-9-]+/gi, "-")}.zip`;
}
