import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { getErrorMessage } from "./errors";
import { log } from "./log";
import { removeLeadingSlash } from "./strings";

export function write(filename: string, data: string): void {
  mkdirSync(dirname(filename), { recursive: true });
  writeFileSync(filename, data);
}

/** Strips everything that is not `[a-z0-9]` and hyphenates the rest. */
export function toFilename(title: string): string {
  return title
    .replace(/[^a-z0-9]/gi, " ")
    .trim()
    .replace(/ /g, "-")
    .toLowerCase();
}

/**
 * Turns a page URL into a path on disk. A URL ending in `/` becomes `index`,
 * mirroring how upstream names the file it writes.
 */
export function createFilename(
  rootPath: string,
  target: string | URL,
  extension = ".html"
): string {
  let pathname = typeof target === "string" ? target : target.pathname;
  if (typeof target === "string" && target.startsWith("http")) {
    pathname = new URL(target).pathname;
  }

  if (pathname.endsWith("/")) pathname += "index";
  const slug = removeLeadingSlash(pathname) || "index";

  return join(rootPath, slug.endsWith(extension) ? slug : slug + extension);
}

/**
 * Persists the raw HTML for a page. This build stops here — converting the
 * body to MDX is deliberately out of scope.
 */
export function writeRawPage(outDir: string, target: string | URL, html: string): string | undefined {
  const writePath = createFilename(outDir, target);
  try {
    write(writePath, html);
    return writePath;
  } catch (error) {
    log(`${writePath} could not be written to disk${getErrorMessage(error)}`, "error");
    return undefined;
  }
}
