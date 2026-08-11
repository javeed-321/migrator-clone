import type { Element } from "hast";
import type { Root as MdastRoot } from "mdast";
import { EXIT, visit } from "unist-util-visit";

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

/**
 * Lifts the first heading out of the page and returns its text.
 *
 * Destructive on purpose: the title moves into frontmatter, so leaving it in the
 * body would print it twice.
 */
export function getTitleFromHeading(root: MdastRoot): string {
  let title = "";

  visit(root, "heading", function (node, index, parent) {
    title = mdastText(node);
    if (parent && typeof index === "number") parent.children.splice(index, 1);
    return EXIT;
  });

  return escapeQuotes(title);
}

/**
 * Same idea for the description: the first paragraph, but only when it is the
 * very first thing on the page — otherwise it is body copy, not a summary.
 */
export function getDescriptionFromRoot(root: MdastRoot): string {
  const first = root.children[0];
  if (first?.type !== "paragraph") return "";

  const description = mdastText(first);
  root.children.shift();
  return escapeQuotes(description);
}

/** Concatenated text of any MDAST subtree. */
function mdastText(node: MdastRoot["children"][number] | MdastRoot): string {
  let text = "";
  visit(node, "text", function (textNode) {
    text += textNode.value;
  });
  return text.trim();
}

function escapeQuotes(value: string): string {
  return value.replace(/"/g, '\\"');
}

/** Fallback title when a link has no text: `/api/get-user` -> `Get User`. */
export function getTitleFromLink(url: string): string {
  if (url.startsWith("http")) {
    url = new URL(url).pathname;
  }
  const lastPathname = url.split("/").filter(Boolean).at(-1) ?? "";
  return convertStrToTitle(lastPathname);
}
