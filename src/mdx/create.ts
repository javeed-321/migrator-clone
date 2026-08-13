import type { Root as HastRoot } from "hast";
import { CONTINUE, SKIP, visit } from "unist-util-visit";

import { readmeScrapeCallout } from "../components/Callout";
import { readmeScrapeCard } from "../components/Card";
import { readmeScrapeCodeGroup } from "../components/CodeGroup";
import { readmeScrapeImage } from "../components/Image";
import type { ScrapeFunc } from "../types/hast";
import { framework } from "../utils/detectFramework";
import { log } from "../utils/log";

/**
 * Turns a per-vendor scraper into a unified plugin.
 *
 * The plugin walks the HAST tree and, wherever the scraper recognises a node,
 * replaces it in place with an element whose `tagName` is a component name.
 * `<Callout>` is not valid HTML — it is a marker that survives until the bridge,
 * where a handler turns it into a real MDX node.
 *
 * `SKIP` after a replacement stops the walk descending into children that have
 * already been converted to MDAST by `turnChildrenIntoMdx`.
 */
function createComponent(readmeScrapeFunc: ScrapeFunc) {
  return function (tree: HastRoot): HastRoot {
    visit(tree, "element", function (node, index, parent) {
      // Never rewrite anything inside a code sample.
      if (node.tagName === "code" || node.tagName === "pre") return SKIP;

      if (framework.vendor !== "readme") {
        log("Invalid documentation vendor requested: " + framework.vendor);
        return SKIP;
      }

      const result = readmeScrapeFunc(node, index, parent);
      if (!result) return CONTINUE;

      if (parent && typeof index === "number") {
        parent.children[index] = result;
        return SKIP;
      }
      return CONTINUE;
    });
    return tree;
  };
}

export function createCallout() {
  return createComponent(readmeScrapeCallout);
}

export function createImage() {
  return createComponent(readmeScrapeImage);
}

export function createCodeGroup() {
  return createComponent(readmeScrapeCodeGroup);
}

export function createCard() {
  return createComponent(readmeScrapeCard);
}
