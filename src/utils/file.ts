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
 * One value, as a YAML double-quoted scalar.
 *
 * ## Why this is not `"${value}"`
 *
 * It was, and the corpus broke it the moment a description quoted an API error:
 *
 * ```text
 * …will return the response `403: Forbidden ("Unique/allowed nonce header not found")`
 * ```
 *
 * Interpolated raw, the `("` closes the scalar 400 characters early; YAML then
 * reads the rest of the line as a second mapping entry, trips over the `: ` in
 * `403: Forbidden`, and runs on into the closing `---`. The parser reports it at
 * the `---` — *"a multiline key may not be an implicit key"* — which is three
 * lines below the character that actually caused it, and names neither the page
 * nor the quote.
 *
 * The failure is total: frontmatter that will not parse is a page the site cannot
 * render and the dashboard's sync gate refuses outright. And it needs no exotic
 * input — a straight double quote in a sentence is enough.
 *
 * Escaping order matters. Backslash first, or the backslashes this adds are
 * themselves escaped on the next pass.
 */
function yamlString(value: string): string {
  const escaped = value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/\t/g, "\\t")
    // Remaining C0 controls have no meaning in a title and cannot be written
    // raw. `\xNN` is the double-quoted style's own escape, so this stays one
    // parseable scalar rather than a mangled one.
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, (character) =>
      `\\x${character.charCodeAt(0).toString(16).padStart(2, "0")}`
    );
  return `"${escaped}"`;
}

/**
 * The YAML block every Documentation.AI page must open with.
 *
 * `title` and `description` were lifted out of the body by `scrapePage`, which
 * is why neither is repeated in the markdown below them.
 *
 * Both go through `yamlString`, because both are prose written by someone who had
 * no reason to think about YAML.
 */
export function formatPageWithFrontmatter(
  title: string,
  description: string,
  markdown: string
): string {
  const lines = ["---"];
  if (title) lines.push(`title: ${yamlString(title)}`);
  if (description) lines.push(`description: ${yamlString(description)}`);
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
