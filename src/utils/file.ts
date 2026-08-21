import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { getErrorMessage } from "./errors";
import { log } from "./log";
import { removeLeadingSlash } from "./strings";

/** `Uint8Array` as well as text, because images and fonts are files too. */
export function write(filename: string, data: string | Uint8Array): void {
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
 * The YAML block every Documentation.AI page must open with.
 *
 * `title` and `description` were lifted out of the body by `scrapePage`, which
 * is why neither is repeated in the markdown below them.
 */
export function formatPageWithFrontmatter(
  title: string,
  description: string,
  markdown: string
): string {
  const lines = ["---"];
  if (title) lines.push(`title: "${title}"`);
  if (description) lines.push(`description: "${description}"`);
  lines.push("---", "", markdown);
  return lines.join("\n");
}

/** Writes one converted page as `<slug>.mdx` under `outDir`. */
export function writeMdxPage(
  outDir: string,
  slug: string,
  title: string,
  description: string,
  markdown: string
): string | undefined {
  const writePath = createFilename(outDir, slug, ".mdx");
  try {
    write(writePath, formatPageWithFrontmatter(title, description, markdown));
    return writePath;
  } catch (error) {
    log(`${writePath} could not be written to disk${getErrorMessage(error)}`, "error");
    return undefined;
  }
}

/**
 * Persists the raw HTML for a page.
 *
 * Worth keeping even now that MDX conversion exists: upstream holds the HTML
 * only as a local variable, so any change to a scraper means refetching the
 * whole site to test it. With this, you fetch once and iterate offline.
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
