import type { Root as HastRoot } from "hast";
import type { Root as MdastRoot } from "mdast";
import rehypeParse from "rehype-parse";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

import { wrapCardsInColumns } from "../components/Columns";
import { framework } from "../utils/detectFramework";
import { createCallout, createCard, createCodeGroup, createImage } from "./create";
import { cleanAttributes, removeBreaks, removeChrome, removeHeadingAnchors } from "./hastClean";
import type { CleanAttributesOptions } from "./hastClean";
import {
  convertHeaderLinksToText,
  formatEmphasis,
  inlineCodeBlocksInCells,
  inlineContainersInCells,
  removeBottomMetadata,
  removeEmptyParagraphs,
  removeNestedRoots,
  removeUpdatedAt,
  spaceListsOut,
} from "./mdastClean";
import { removeHastComments, removePositions } from "../pipeline/root";
import { convertLeftoverComponents, selectiveRehypeRemark } from "./toMdast";

/**
 * The conversion itself, with no opinion about where the HTML came from.
 *
 * This is the single definition of the plugin chain. The page pipeline and the
 * playground both run it, so neither can quietly drift from the other — the
 * whole point of a playground is that what it shows is what a real migration
 * produces.
 *
 * The order is the only thing that makes it work:
 *
 *   HAST cleanup    delete browser-only markup while nodes are still HTML
 *   detection       swap ReadMe markup for `<Callout>`-style marker elements
 *   HAST cleanup    normalise class/id/style, now that nothing needs to match
 *   THE BRIDGE      `selectiveRehypeRemark` — HAST becomes MDAST here
 *   MDAST cleanup   fix up Markdown-level artefacts
 *
 * `.runSync()` calls each registered transformer in order on one tree, so the
 * tree's type changes half way down a chain TypeScript believes is uniform —
 * hence the cast on the result.
 */
export function runMdxPipeline(root: HastRoot, options: CleanAttributesOptions = {}): MdastRoot {
  return unified()
    // Strip ReadMe SuperHub page furniture (breadcrumb, pager, feedback widget,
    // on-page ToC, timestamp) before anything else looks at the tree.
    .use(removeChrome)
    .use(removeBreaks)
    .use(removeHeadingAnchors)
    // Component detection — still HAST. Order matters: images and code first,
    // then cards, then Columns (which needs the Card markers to already exist),
    // and every scraper must run before cleanAttributes rewrites what it matches.
    .use(createImage)
    .use(createCodeGroup)
    .use(createCard)
    .use(wrapCardsInColumns)
    .use(createCallout)
    // Classes and inline styles are carried across as JSX attributes rather
    // than deleted; the bridge converts them to valid JSX form.
    .use(cleanAttributes, options)
    .use(selectiveRehypeRemark)
    // Nested components (a Card inside Columns) cross the bridge un-converted;
    // this finishes them on the MDAST side.
    .use(convertLeftoverComponents)
    .use(removeNestedRoots)
    .use(convertHeaderLinksToText)
    .use(removeEmptyParagraphs)
    .use(spaceListsOut)
    .use(removeUpdatedAt)
    .use(removeBottomMetadata)
    .use(inlineCodeBlocksInCells)
    .use(inlineContainersInCells)
    .use(formatEmphasis)
    .runSync(root) as unknown as MdastRoot;
}

/** MDAST in, MDX text out. `.stringify()` only serialises — it runs no plugins. */
export function mdastToMdx(tree: MdastRoot): string {
  const result = unified().use(remarkMdx).use(remarkGfm).use(remarkStringify).stringify(tree);
  return String(result).replace(/\n{3,}/g, "\n\n");
}

/**
 * An arbitrary snippet of HTML -> MDX.
 *
 * Unlike `scrapePage` this does not look for `article.rm-Article`, so it works
 * on a fragment pasted out of dev tools rather than a whole fetched page.
 *
 * The vendor is forced to `readme` because component detection is gated on it
 * and a fragment carries none of the `<meta>` tags `detectFramework` reads. This
 * build only implements ReadMe selectors anyway, so there is nothing else it
 * could usefully be.
 */
export function convertHtmlFragment(html: string, options: CleanAttributesOptions = {}): string {
  if (!framework.vendor) framework.vendor = "readme";

  const tree = unified().use(rehypeParse, { fragment: true }).parse(html);
  removePositions(tree);
  removeHastComments(tree);

  return mdastToMdx(runMdxPipeline(tree, options));
}
