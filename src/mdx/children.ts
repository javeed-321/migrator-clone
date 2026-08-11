import type { ElementContent, RootContent as HastRootContent, Root as HastRoot } from "hast";
import { toMdast } from "hast-util-to-mdast";
import type { Root as MdastRoot, RootContent as MdastRootContent } from "mdast";

import { componentHandlers } from "./toMdast";

/**
 * Converts one component's children ahead of the main bridge.
 *
 * Every scraper calls this on the children of the node it matched, which means
 * that between component detection and `selectiveRehypeRemark` the tree is a
 * hybrid: still HAST on the outside, already MDAST inside anything a scraper
 * touched. That is deliberate — a component's body has to be Markdown by the
 * time the component node is handed to `mdxJsxFlowElementHandler`, because that
 * handler passes `children` straight through without translating them.
 */
export function turnChildrenIntoMdx(
  children: Array<HastRootContent | ElementContent>
): MdastRootContent[] {
  const hast: HastRoot = { type: "root", children: children as HastRootContent[] };
  const mdast = toMdast(hast, { handlers: componentHandlers() }) as MdastRoot;

  // Raw `html` nodes would be printed verbatim into the MDX and break it.
  return mdast.children.filter((child) => child.type !== "html");
}
