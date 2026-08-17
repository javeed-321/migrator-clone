import type { Element } from "hast";
import { visit } from "unist-util-visit";

import { convertStrToTitle } from "./strings";

/**
 * Concatenated text of a node.
 *
 * `opts.delete` splices the text nodes out as it goes — upstream uses that when
 * a title has been lifted out of content that will be rendered later. The nav
 * walk always passes `delete: false`.
 */
export function findTitle(
  node: Element | undefined,
  opts: { delete: boolean } = { delete: true }
): string {
  let title = "";
  if (!node) return title;

  visit(node, "text", function (textNode, index, parent) {
    title += textNode.value;
    if (opts.delete && parent && typeof index === "number") {
      parent.children.splice(index, 1);
    }
  });

  return title.trim();
}

/** Fallback title when a link has no text: `/api/get-user` -> `Get User`. */
export function getTitleFromLink(url: string): string {
  if (url.startsWith("http")) {
    url = new URL(url).pathname;
  }
  const lastPathname = url.split("/").filter(Boolean).at(-1) ?? "";
  return convertStrToTitle(lastPathname);
}
