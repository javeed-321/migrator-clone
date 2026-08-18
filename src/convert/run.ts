import { parseMarkdown } from "../download/parse";
import { convertAccordions } from "./accordion";
import { convertBreaks } from "./breaks";
import { convertCards } from "./cards";
import { convertColumns } from "./columns";
import { convertDetails } from "./details";
import { convertEmbeds } from "./embed";
import { convertGlossary } from "./glossary";
import { convertHtmlTables } from "./html-table";
import { convertImages } from "./images";
import { expandMagicBlocks } from "./magic-blocks";
import { convertSteps } from "./steps";
import type { ConversionNote } from "./mdast";
import { convertOneToOne, toMdx, type ConvertOptions } from "./one-to-one";
import { convertTables } from "./table";
import { downloadImages, imageUrlsIn, type ImageDownloadOptions, type ImageDownloadReport } from "../download/images";

/**
 * One page of ReadMe markdown -> Documentation.AI MDX.
 *
 * The per-component passes each own one construct and none of them knows about
 * the others, so something has to say what runs when. This is that something,
 * and the order below is the only part of this file with any judgement in it.
 */

export type ConvertPageOptions = ConvertOptions & {
  /**
   * Pull every image onto disk as part of the conversion, and point the pages at
   * the local copies.
   *
   * Omit it and the conversion runs entirely in memory with the source URLs left
   * alone — the mode the paste box uses, since a browser request should not leave
   * files behind. The shape mirrors `DownloadOptions.outDir` for the same reason.
   */
  images?: ImageDownloadOptions;
};

export type ConvertPageResult = {
  mdx: string;
  notes: ConversionNote[];
  /**
   * Which parser accepted the source. `markdown` means strict MDX rejected it
   * and it fell back to GFM — a fact about the page (its syntax needs
   * repairing), not a silent degradation.
   */
  parseMode: "mdx" | "markdown";
  /** The strict-MDX error, when the page needed the fallback. */
  parseError?: string;
  /** What the image download did, when `options.images` asked for one. */
  images?: ImageDownloadReport;
};

/**
 * Pass order, and why.
 *
 * The governing rule is the plan's: **structure first, links last.** Link
 * rewriting needs the site-wide slug map and must see every link the conversion
 * produces — including ones that do not exist in the source, like the href a
 * `<Column>` hands to its `<Card>`, or the plain link an unembeddable `<Embed>`
 * degrades to. So the pass that rewrites links runs at the end, not the start.
 *
 * 0. **`downloadImages`** — the one step that touches the network, and it runs
 *    first because the image pass needs the local paths *while* it rewrites, not
 *    afterwards. Skipped entirely when no `images.outDir` is given, which is what
 *    keeps the in-memory path pure. It reads URLs out of the source text rather
 *    than the tree, so it can run before parsing.
 * 1. **`expandMagicBlocks`** — the only pass that runs on the *source string*,
 *    because it has to. A `[block:…]` body starts with `{`, so strict MDX rejects
 *    the page and the fallback parser returns the whole block as one paragraph of
 *    text — there is no node to match. It expands each block to its modern ReadMe
 *    form, which the passes below then convert normally.
 * 2. **`convertHtmlTables`** — a raw lowercase `<table>` -> a markdown table
 *    (plan §3.4). Before the `<Table>` pass, so what it produces is normalised by
 *    that pass like any other table.
 * 3. **`convertTables`** — rebuilds `<Table>` JSX and normalises every GFM table.
 *    Early, because it flattens cells into inline nodes that later passes (and the
 *    link rewriter) then treat like any other content.
 * 4. **`convertEmbeds`** — consumes `[Title](url "@embed")` while it is still an
 *    embed. After the link pass it would be an ordinary link and the shorthand
 *    would be lost.
 * 5. **`convertDetails`** — raw `<details>`/`<summary>` -> `<Expandable>`. Early,
 *    because on a page that fell back to the plain-markdown parser the block
 *    arrives as *stray `html` siblings* rather than a subtree; converting it first
 *    means every pass below sees one component tree instead of loose HTML.
 * 6. **`convertBreaks`** — strips every `<br>` (plan §3.6). After the details
 *    pass, because that one re-parses a raw block's body and so *creates* fresh
 *    `<br>` nodes for this pass to find.
 * 7. **`convertImages`** — every image form -> `<Image src alt />` (plan §3.5).
 *    After the table pass, which has already turned an image inside a cell into a
 *    link, so nothing here has to reason about cells.
 * 8. **`convertAccordions`** — collapses runs of adjacent siblings, so it must see
 *    the page before anything can split a run.
 * 9. **`convertCards`** — `<Cards>` -> `<Columns>` + `<Card>`.
 * 10. **`convertColumns`** — handles source `<Columns>`/`<Column>` and tolerates the
 *    output of step 9, which is why it runs after it rather than before.
 * 11. **`convertSteps`** — promotes an ordered list to `<Steps>` when every step
 *    has a body. After the container passes, so a procedure that was moved into a
 *    `<Card>` or an `<Expandable>` is still seen.
 * 12. **`convertGlossary`** — unwraps terms to plain text. Before the link pass,
 *    because the `<<glossary:x>>` shorthand parses as a `glossary:` *link* that
 *    the rewriter would otherwise treat as an ordinary URL.
 * 13. **`convertOneToOne`** — headings, callouts, fence titles, fence runs, tabs,
 *    and the link rewriting that has to come last. Running it here also means it
 *    sweeps the content the structural passes just moved: a callout inside a new
 *    `<Card>`, a fence run inside an `<Expandable>`.
 *
 * If a nested case ever misbehaves, this order is the first thing to revisit — it
 * is a composition choice, not something the passes enforce.
 */
export async function convertReadmeMarkdown(
  source: string,
  options: ConvertPageOptions = {},
): Promise<ConvertPageResult> {
  const expanded = expandMagicBlocks(source);
  const notes: ConversionNote[] = [...expanded.notes];

  // Step 0. The images come down before anything is parsed, so the image pass has
  // somewhere local to point at. `map` holds only what actually downloaded — a
  // failure keeps its original src rather than becoming a broken local path.
  const images = options.images
    ? await downloadImages(imageUrlsIn(expanded.source), options.images)
    : undefined;

  if (images) {
    notes.push({
      rule: "image",
      level: images.failed.length > 0 ? "flag" : "change",
      detail: `downloaded ${images.downloaded} image${images.downloaded === 1 ? "" : "s"}${images.fromCache > 0 ? ` (${images.fromCache} already on disk)` : ""}${images.failed.length > 0 ? `, ${images.failed.length} failed and kept their original src` : ""}`,
    });
  }

  const { tree, mode, error } = parseMarkdown(expanded.source);

  convertHtmlTables(tree, notes);
  convertTables(tree, notes);
  convertEmbeds(tree, notes);
  convertDetails(tree, notes);
  convertBreaks(tree, notes);
  convertImages(tree, notes, images ? (url) => images.map[url] : options.imageSrc);
  convertAccordions(tree, notes);
  convertCards(tree, notes);
  convertColumns(tree, notes);
  convertSteps(tree, notes);
  convertGlossary(tree, notes);
  notes.push(...convertOneToOne(tree, options).notes);

  return {
    mdx: toMdx(tree),
    notes,
    parseMode: mode,
    ...(error ? { parseError: error } : {}),
    ...(images ? { images } : {}),
  };
}
