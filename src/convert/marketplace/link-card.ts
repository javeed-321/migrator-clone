import type { PhrasingContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

import { attr } from "../mdast";


/**
 * The shared shape of a Route 3 conversion (marketplace-conversion.md §5.3).
 *
 * Three components render a button that goes somewhere, and their destination is
 * already in a prop. The widget cannot survive — the target has no
 * script-injecting component — but the *link* is the part that carries meaning,
 * and it is the part that stays true. A frozen snapshot of live data goes stale
 * with nothing to refresh it; a link is correct forever.
 *
 * `<Card>` requires `title`, `href` **and** children `[DAI §12]`, so every caller
 * supplies a body. None of them may invent an `href` `[PLAN §2.2]` — a missing
 * URL is a blocker, not a guess.
 */
export function linkCard(
  title: string,
  href: string,
  icon: string,
  body: string | PhrasingContent[],
): MdxJsxFlowElement {
  // Phrasing nodes rather than a string, because a body naming a filename wants
  // `inlineCode` — and a backtick written into a text node is escaped on the way
  // out, so the reader sees the escape instead of code formatting.
  const children: PhrasingContent[] = typeof body === "string" ? [{ type: "text", value: body }] : body;

  return {
    type: "mdxJsxFlowElement",
    name: "Card",
    attributes: [attr("title", title), attr("href", href), attr("icon", icon)],
    children: [{ type: "paragraph", children }] as never,
  };
}
