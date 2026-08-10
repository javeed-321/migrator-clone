import type { Root as HastRoot } from "hast";
import rehypeParse from "rehype-parse";
import { unified } from "unified";
import { visit, CONTINUE } from "unist-util-visit";

/**
 * Step 2 of the pipeline: HTML string -> HAST.
 *
 * Every selector after this point is a `unist-util-visit` walk over this tree.
 * There is no CSS selector engine anywhere in the scraper — matches are done by
 * `tagName` plus a `className` array check.
 *
 * Upstream chains `unifiedRemovePositions` / `rehypeRemoveHastComments` as
 * plugins and then calls `.parse()`, which never runs transformers — so those
 * two are effectively dead there. Doing the cleanup directly keeps the trees
 * small enough to serialise into an API response.
 */
export function htmlToHast(html: string): HastRoot {
  const tree = unified().use(rehypeParse).parse(html);
  removePositions(tree);
  removeHastComments(tree);
  return tree;
}

export function removePositions(tree: HastRoot): void {
  visit(tree, function (node) {
    delete node.position;
  });
}

export function removeHastComments(tree: HastRoot): void {
  visit(tree, "comment", function (_node, index, parent) {
    if (parent && typeof index === "number") {
      parent.children.splice(index, 1);
      return [CONTINUE, index];
    }
    return CONTINUE;
  });
}
