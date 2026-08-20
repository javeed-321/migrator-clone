import { parseMarkdown } from "../download/parse";
import { convertAccordions } from "./accordion";
import { convertApiExamples, convertParamFields, stripApiArtefacts, type ApiReferenceOptions } from "./api-reference";
import { convertBreaks } from "./breaks";
import { convertCards } from "./cards";
import { detectCustomComponents, type FoundCustom } from "./custom-components";
import { convertColumns } from "./columns";
import { convertDetails } from "./details";
import { convertEmbeds } from "./embed";
import { convertGlossary } from "./glossary";
import { convertHtmlTables } from "./html-table";
import { convertImages, type FoundImage } from "./images";
import { convertLocalComponents } from "./local";
import { convertMarketplace, fetchPostLists, MARKETPLACE_HANDLED, type PostListOptions } from "./marketplace";
import { expandMagicBlocks } from "./magic-blocks";
import { convertSteps } from "./steps";
import type { ConversionNote } from "./mdast";
import { convertOneToOne, toMdx, type ConvertOptions } from "./one-to-one";
import { convertPlaceholders } from "./placeholders";
import { repairSource } from "./repair";
import { convertTables } from "./table";
import { convertWrappers } from "./wrappers";
import { downloadImages, type ImageDownloadOptions, type ImageDownloadReport } from "../download/images";

/**
 * One page of ReadMe markdown -> Documentation.AI MDX.
 *
 * The per-component passes each own one construct and none of them knows about
 * the others, so something has to say what runs when. This is that something,
 * and the order below is the only part of this file with any judgement in it.
 */

export type ConvertPageOptions = ConvertOptions & {
  /** Plan §5 — how much of an API-reference page this conversion owns. */
  api?: ApiReferenceOptions;
  /**
   * Pull every image the page uses onto disk, alongside the conversion.
   *
   * **The page is not repointed.** Every `src` keeps the URL it was authored with;
   * this only saves a copy of what that URL is currently serving, so the files
   * exist locally when someone decides to re-host them.
   *
   * Omit it and the conversion runs entirely in memory — the mode the paste box
   * uses, since a browser request should not leave files behind. The shape mirrors
   * `DownloadOptions.outDir` for the same reason.
   */
  images?: ImageDownloadOptions;
  /**
   * Plan §5.3 — fetch each `<PostList>` endpoint and write its response into the
   * page.
   *
   * Off unless asked for. This is the only pass that would request a URL taken
   * from the page being converted, so it is opt-in for the same reason
   * `images` is, and it refuses private and link-local addresses outright.
   */
  data?: PostListOptions;
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
  /**
   * Components no pass converted (plan §4). Reported as notes too, but returned
   * as data so a run can inventory them across the corpus rather than one page at
   * a time — the queue `[PIT Phase 0]` asks for.
   */
  custom: FoundCustom[];
  /**
   * Whether the **output** compiles as MDX. `false` means a tag survived that the
   * target cannot parse, and the page will fail to sync. The matching blocker note
   * carries the parser's own message, with the line and column.
   */
  outputCompiles: boolean;
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
 * 0. **`downloadImages`** — the one step that touches the network. It runs right
 *    after the image pass, on the URLs that pass collected, and it changes nothing
 *    on the page: it saves the files, and every `src` keeps the URL it was
 *    authored with. Skipped entirely when no `images.outDir` is given, which is
 *    what keeps the in-memory path pure.
 * 0c. **`stripApiArtefacts`** — plan §5.6. The llms.txt preamble and the
 *    `# OpenAPI definition` dump go before any pass reads the tree, because both
 *    are export artefacts and the dump is a ~300-line JSON fence: every pass
 *    below, up to and including the MDX compile check, would otherwise spend
 *    itself on a block that is about to be deleted.
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
 * 7. **`convertWrappers`** — layout `<div>`/`<p>` and `&nbsp;` padding go, their
 *    content stays (plan §3.6). After the table pass, so a cell's indentation is
 *    untouched rather than collapsed into ordinary spaces; before
 *    the container passes, so anything a wrapper was hiding is visible to them.
 * 8. **`convertImages`** — every image form -> `<Image src alt />` (plan §3.5).
 *    After the table pass, which has already turned an image inside a cell into a
 *    link, so nothing here has to reason about cells.
 * 9. **`convertAccordions`** — collapses runs of adjacent siblings, so it must see
 *    the page before anything can split a run.
 * 10. **`convertCards`** — `<Cards>` -> `<Columns>` + `<Card>`.
 * 11. **`convertColumns`** — handles source `<Columns>`/`<Column>` and tolerates the
 *    output of step 10, which is why it runs after it rather than before.
 * 12. **`convertSteps`** — promotes an ordered list to `<Steps>` when every step
 *    has a body. After the container passes, so a procedure that was moved into a
 *    `<Card>` or an `<Expandable>` is still seen.
 * 13. **`convertPlaceholders`** — tag-shaped prose -> inline code (plan §3.3).
 *    Late, so it only ever sees text that no other pass claimed: anything that was
 *    really a component has been converted by now, and what is left in a text or
 *    `html` node genuinely is prose.
 * 14. **`convertGlossary`** — unwraps terms to plain text. Before the link pass,
 *    because the `<<glossary:x>>` shorthand parses as a `glossary:` *link* that
 *    the rewriter would otherwise treat as an ordinary URL.
 * 15. **`convertOneToOne`** — headings, callouts, fence titles, fence runs, tabs,
 *    and the link rewriting that has to come last. Running it here also means it
 *    sweeps the content the structural passes just moved: a callout inside a new
 *    `<Card>`, a fence run inside an `<Expandable>`.
 *
 * 16. **`convertApiExamples`** — plan §5.5. Last, and after §1.3 rather than
 *    before it: by then a fence's title is already `title="…"` and a run of
 *    adjacent fences is already one `<CodeGroup>`, so `<Request>`/`<Response>`
 *    reads one shape and reuses the tab labels §1.3 worked out. Running it first
 *    would instead let `groupFenceRuns` build a `<CodeGroup>` *inside* the
 *    `<Request>` it had just made — a switcher inside a switcher.
 *
 * 17. **`convertParamFields`** — plan §5.3/§5.4, and off by default (§5.6). After
 *    the table pass, so it reads one normalised table shape with the depth already
 *    left exactly as the source wrote it `[TBL]`, so `readMarker` reads the depth
 *    off one normalised cell shape rather than four.
 *
 * If a nested case ever misbehaves, this order is the first thing to revisit — it
 * is a composition choice, not something the passes enforce.
 */
/**
 * Pulls down the images the conversion just found.
 *
 * **Nothing on the page changes.** Every `src` keeps the URL it was authored with
 * — the target renders an external URL directly, and the CDN loader passes a
 * non-CDN host through unchanged `[APP imgixLoader.ts]`, so a working remote URL
 * publishes correctly on day one. This saves a copy of each file so that
 * re-hosting later is a decision someone can make deliberately, rather than one
 * the migrator makes for them by writing paths to files that may not ship.
 *
 * The pass hands back the URLs it found, so nothing has to look for them a second
 * time — the parser found them, and this is the only consumer.
 */
async function fetchImages(
  found: FoundImage[],
  options: ConvertPageOptions,
  notes: ConversionNote[],
): Promise<ImageDownloadReport | undefined> {
  if (!options.images) return undefined;

  const report = await downloadImages(
    [...new Set(found.map((image) => image.url))],
    options.images,
  );

  notes.push({
    rule: "image",
    level: report.failed.length > 0 ? "flag" : "change",
    detail: `saved ${report.downloaded} image${report.downloaded === 1 ? "" : "s"} to disk${report.fromCache > 0 ? ` (${report.fromCache} already there)` : ""}${report.failed.length > 0 ? `, ${report.failed.length} could not be fetched` : ""} — the pages still point at the original URLs, which is what the target renders`,
  });

  return report;
}

export async function convertReadmeMarkdown(
  source: string,
  options: ConvertPageOptions = {},
): Promise<ConvertPageResult> {
  const expanded = expandMagicBlocks(source);
  // Step 0b. Repair the source so the strict parser accepts it. Before parsing,
  // because what it fixes is the reason there would be no tree to fix — and a page
  // that falls back to plain markdown gets *no* component conversions at all.
  const repaired = repairSource(expanded.source);
  const notes: ConversionNote[] = [...expanded.notes, ...repaired.notes];
  const { tree, mode, error } = parseMarkdown(repaired.source);

  stripApiArtefacts(tree, notes);
  convertHtmlTables(tree, notes);
  convertTables(tree, notes);
  convertEmbeds(tree, notes);
  convertDetails(tree, notes);
  convertBreaks(tree, notes);
  convertWrappers(tree, notes);
  const found = convertImages(tree, notes);
  const images = await fetchImages(found, options, notes);
  convertAccordions(tree, notes);
  convertCards(tree, notes);
  convertColumns(tree, notes);
  convertSteps(tree, notes);
  // After the built-in passes, so this and `convertColumns` cannot both claim a
  // `<Columns>`; before the detector, so anything without a rule is reported.
  const postLists = convertMarketplace(tree, notes);
  convertPlaceholders(tree, notes);
  convertGlossary(tree, notes);
  notes.push(...convertOneToOne(tree, options).notes);
  convertApiExamples(tree, notes);
  convertParamFields(tree, notes, options.api ?? {});
  // Phase two of the `<PostList>` conversion. Separate and async for the same
  // reason image downloading is: the rules that build the tree stay synchronous,
  // and the one conversion that needs the network happens once, here.
  await fetchPostLists(postLists, options.data, notes);
  // 18. `convertLocalComponents` — plan §4.4. Components the page defines itself
  //     with an `export const`. After §1.3 rather than with the other component
  //     passes: the callout pass bolds a callout's first paragraph on the ReadMe
  //     convention that it is a heading, which is not a convention an arbitrary
  //     local wrapper follows.
  const localHandled = convertLocalComponents(tree, notes);
  // Last, and that is the whole design: every pass above consumes the constructs
  // it recognises, so what is still a JSX element here is what nothing handled.
  const custom = detectCustomComponents(tree, notes, {
    mode,
    handled: MARKETPLACE_HANDLED,
    localHandled,
  });
  const mdx = toMdx(tree);

  // The page has to compile where it is going. Re-parsing the output with the
  // strict parser is the honest check: it is the same grammar Documentation.AI
  // applies, so its error is the error the dashboard will show — and it names the
  // tag and the line, which is the part a person needs.
  const check = parseMarkdown(mdx);
  if (check.mode !== "mdx") {
    notes.push({
      rule: "mdx",
      level: "blocker",
      detail: `the converted page will not compile as MDX — ${check.error}. Fix that tag in the source and convert again; everything else on the page is fine`,
    });
  }

  return {
    mdx,
    notes,
    outputCompiles: check.mode === "mdx",
    parseMode: mode,
    custom,
    ...(error ? { parseError: error } : {}),
    ...(images ? { images } : {}),
  };
}
