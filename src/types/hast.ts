import type { Element, Root as HastRoot } from "hast";
import type { MdxJsxFlowElementHast, MdxJsxTextElementHast } from "mdast-util-mdx-jsx";

export type HastNode = Element;
export type HastNodeIndex = number | undefined;
/**
 * Includes the MDX element types because by the time a scraper runs, earlier
 * scrapers have already left MDX nodes in the tree — so a match's parent can be
 * one of them.
 */
export type HastNodeParent =
  | Element
  | HastRoot
  | MdxJsxFlowElementHast
  | MdxJsxTextElementHast
  | undefined;

/**
 * What every component scraper looks like.
 *
 * It is handed one HAST element and returns a replacement element whose
 * `tagName` is a component name, or `undefined` when the node is not the thing
 * that scraper is looking for.
 */
export type ScrapeFunc = (
  node: HastNode,
  index: HastNodeIndex,
  parent: HastNodeParent
) => Element | undefined;
