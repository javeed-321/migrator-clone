import type { Element, ElementContent } from "hast";

import { turnChildrenIntoMdx } from "../mdx/children";
import type { HastNode, HastNodeIndex, HastNodeParent } from "../types/hast";
import { hasClassName } from "../utils/className";

/**
 * ReadMe renders callouts as a `<blockquote>` carrying a severity class:
 *
 *   <blockquote class="callout callout_warn">
 *     <h3 class="callout-heading">⚠️ Careful</h3>
 *     <p>This deletes everything.</p>
 *   </blockquote>
 *
 * A plain conversion would make that a `> quote` and lose the severity, so the
 * node is swapped for one named `Callout` before the bridge runs. `Callout` is
 * in ESCAPED_COMPONENTS, which is what stops `hast-util-to-mdast` flattening it.
 */
const KIND_BY_CLASS = new Map<string, string>([
  ["callout_default", "info"],
  ["callout_info", "info"],
  ["callout_warn", "alert"],
  ["callout_error", "danger"],
  ["callout_okay", "success"],
]);

export function readmeScrapeCallout(
  node: HastNode,
  _index: HastNodeIndex,
  _parent: HastNodeParent
): Element | undefined {
  if (node.tagName !== "blockquote" || !hasClassName(node, "callout")) return undefined;

  const classNames = Array.isArray(node.properties.className)
    ? (node.properties.className as string[])
    : [];
  const kind = classNames.map((name) => KIND_BY_CLASS.get(name)).find(Boolean) ?? "info";

  // The heading is an emoji plus a repeat of the severity. Documentation.AI
  // callouts have no title slot, so it is dropped — but by identity, not by
  // position. Upstream does `children.shift()`, which removes whatever comes
  // first, and with whitespace preserved that is usually a text node.
  const children = node.children.filter(
    (child) =>
      !(
        child.type === "element" &&
        /^h[1-6]$/.test(child.tagName) &&
        hasClassName(child, "callout-heading")
      )
  );

  return {
    type: "element",
    tagName: "Callout",
    properties: { kind },
    children: turnChildrenIntoMdx(children) as ElementContent[],
  };
}
