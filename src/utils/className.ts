import type { Element } from "hast";
import { EXIT, visit, CONTINUE } from "unist-util-visit";

export function hasClassName(node: Element, className: string): boolean {
  const list = node.properties?.className;
  return Array.isArray(list) && (list as string[]).includes(className);
}

/** First descendant carrying `className`, in document order. */
export function findByClassName(node: Element, className: string): Element | undefined {
  let element: Element | undefined = undefined as Element | undefined;
  visit(node, "element", function (subNode) {
    if (hasClassName(subNode, className)) {
      element = subNode;
      return EXIT;
    }
    return CONTINUE;
  });
  return element;
}
