import type { Element } from "hast";
import { EXIT, visit } from "unist-util-visit";

/**
 * First descendant with the given tag name, in document order.
 *
 * Note this is *descendant*, not direct child — upstream relies on that, since
 * a sidebar `<li>` wraps its anchor in several layers of `<div>`.
 */
export function findFirstChild(node: Element, tagName: string): Element | undefined {
  let element: Element | undefined = undefined;
  visit(node, "element", function (subNode) {
    if (subNode.tagName === tagName) {
      element = subNode;
      return EXIT;
    }
    return undefined;
  });
  return element;
}
