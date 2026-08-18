import { createHash } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { getErrorMessage } from "../utils/errors";
import { intoChunks } from "../utils/intoChunks";

/**
 * Pulls every image a page points at onto disk, so the migrated site stops
 * depending on the platform it is leaving.
 *
 * **[CORPUS]** 3,055 images, essentially all of them on `files.readme.io`
 * `[RM §10.2]`. Two reasons they cannot stay there:
 *
 * 1. **They are not optimised.** Documentation.AI's image loader rewrites URLs on
 *    its own CDN and returns everything else untouched `[APP imgixLoader.ts]`, so a
 *    `files.readme.io` src gets no resizing, no format conversion, no caching.
 * 2. **They are on someone else's server.** A migration that leaves 3,000 assets
 *    behind has not finished; the day the ReadMe project is closed, the docs lose
 *    their images.
 *
 * This module only fetches and names. It is never the thing that *finds* an image:
 * the conversion pass already walked the page and knows where every one of them
 * is, so it hands the URLs over and puts the results back itself. Searching the
 * page a second time — with a regex, over the raw text — would be a second answer
 * to a question already answered, and the two would drift.
 */

const CONCURRENCY = 6;
const DELAY_MS = 300;

export type ImageDownloadOptions = {
  /** Directory the image folder is created in. */
  outDir: string;
  /** Folder name under `outDir`. Default `images`. */
  dir?: string;
  /** Path written into the page. Default `/images`. */
  publicPath?: string;
  /** Fetch again even when the file is already on disk. */
  refetch?: boolean;
  concurrency?: number;
  delayMs?: number;
  /** Injectable, so tests do not reach the network. */
  fetchImpl?: typeof fetch;
};

export type ImageDownloadReport = {
  /**
   * Original URL -> the path to write into the page.
   *
   * **Successes only.** A URL missing from this map is one whose download failed,
   * and the converter leaves those pointing at the original host.
   */
  map: Record<string, string>;
  downloaded: number;
  fromCache: number;
  failed: { url: string; message: string }[];
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** The file name part of a URL, reduced to characters every filesystem accepts. */
function baseName(url: string): string {
  const path = url.split(/[?#]/)[0] ?? "";
  const name = (path.split("/").pop() ?? "").toLowerCase();
  return name.replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "image";
}

/**
 * URL -> file name, for a whole batch at once.
 *
 * ReadMe's uploads are already `<hash>-<original-name>.<ext>`, so the base name is
 * almost always unique and stays readable. Only an actual collision — two
 * different URLs ending in the same file name — gets a hash of its URL mixed in,
 * so one page's `diagram.png` cannot overwrite another's.
 */
export function nameImages(urls: string[]): Record<string, string> {
  const byName = new Map<string, string[]>();
  for (const url of urls) {
    const name = baseName(url);
    byName.set(name, [...(byName.get(name) ?? []), url]);
  }

  const names: Record<string, string> = {};
  for (const [name, sharing] of byName) {
    for (const url of sharing) {
      if (sharing.length === 1) {
        names[url] = name;
        continue;
      }
      const digest = createHash("sha1").update(url).digest("hex").slice(0, 8);
      const dot = name.lastIndexOf(".");
      names[url] = dot > 0 ? `${name.slice(0, dot)}-${digest}${name.slice(dot)}` : `${name}-${digest}`;
    }
  }
  return names;
}

function writeBinary(path: string, data: ArrayBuffer): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, Buffer.from(data));
}

/**
 * Downloads every URL into `<outDir>/<dir>`.
 *
 * Resumable in the same way the page download is: a file already on disk is not
 * fetched again unless `refetch` is set, so a re-run after a failure costs only
 * the images that failed. Fetched six at a time with a pause between batches —
 * the same shape the markdown download uses, for the same reason.
 */
export async function downloadImages(
  urls: string[],
  options: ImageDownloadOptions,
): Promise<ImageDownloadReport> {
  const dir = options.dir ?? "images";
  const publicPath = options.publicPath ?? "/images";
  const fetchImpl = options.fetchImpl ?? fetch;
  const names = nameImages(urls);

  const report: ImageDownloadReport = { map: {}, downloaded: 0, fromCache: 0, failed: [] };

  const chunks = [...intoChunks(urls, options.concurrency ?? CONCURRENCY)];
  for (const [index, chunk] of chunks.entries()) {
    await Promise.all(
      chunk.map(async (url) => {
        const name = names[url] as string;
        const path = join(options.outDir, dir, name);
        const local = `${publicPath.replace(/\/$/, "")}/${name}`;

        if (!options.refetch && existsSync(path)) {
          report.map[url] = local;
          report.fromCache += 1;
          return;
        }

        try {
          const response = await fetchImpl(url);
          if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

          writeBinary(path, await response.arrayBuffer());
          report.map[url] = local;
          report.downloaded += 1;
        } catch (error) {
          // Deliberately not added to `map`: the page keeps pointing at the
          // original host, because a src to a file that is not there is worse
          // than a src to one that is.
          report.failed.push({ url, message: getErrorMessage(error) });
        }
      }),
    );

    if (index < chunks.length - 1) await sleep(options.delayMs ?? DELAY_MS);
  }

  return report;
}
