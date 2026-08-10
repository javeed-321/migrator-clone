import type { Root as HastRoot, Element } from "hast";
import { visit, EXIT, CONTINUE } from "unist-util-visit";

import { framework } from "../utils/detectFramework";
import { intersection } from "../utils/intersection";

/**
 * Step 5 of the pipeline: find the one element that contains the whole sidebar.
 *
 * Matching is tag name + a class-name intersection, per vendor:
 *   readme     -> nav.rm-Sidebar
 *   docusaurus -> nav.menu                  (not implemented here)
 *   gitbook    -> aside#table-of-contents   (not implemented here)
 *
 * If this returns undefined the whole run fails — there is no crawl fallback.
 */
export function retrieveRootNavElement(rootNode: HastRoot): Element | undefined {
  let rootTagName = "nav";
  let rootSelectorSet = new Set<string>(["rm-Sidebar"]);

  switch (framework.vendor) {
    case "readme":
      rootTagName = "nav";
      rootSelectorSet = new Set(["rm-Sidebar"]);
      break;
  }

  let element: Element | undefined = undefined;
  visit(rootNode, "element", function (node) {
    const { className } = node.properties;

    if (
      node.tagName === rootTagName &&
      Array.isArray(className) &&
      intersection(className as string[], rootSelectorSet).size > 0
    ) {
      element = node;
      return EXIT;
    }
    return CONTINUE;
  });

  return element;
}
