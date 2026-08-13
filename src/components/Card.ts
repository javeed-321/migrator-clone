import type { Element } from "hast";
import { CONTINUE, EXIT, visit } from "unist-util-visit";

import type { HastNode, HastNodeIndex, HastNodeParent } from "../types/hast";
import { findByClassName } from "../utils/className";

/**
 * Capillary's ReadMe docs hand-roll navigation cards:
 *
 *   <a class="lqc-card" href="…#member-attributes">
 *     <div class="lqc-tile"><svg>…</svg><span class="lqc-label">Member Attributes</span></div>
 *   </a>
 *
 * The icon is an inline SVG with no Lucide name to map onto, so it is dropped;
 * the label becomes the title and the anchor becomes the href. The card carries
 * no body, so it converts to a self-closing `<Card title href />`. Consecutive
 * cards are later wrapped in `<Columns>` by `wrapCardsInColumns`.
 */
function anyClassIncludes(node: Element, needle: string): boolean {
  const list = node.properties?.className;
  return Array.isArray(list) && (list as string[]).some((c) => c.toLowerCase().includes(needle));
}

function firstText(node: Element): string {
  let text = "";
  visit(node, "text", function (textNode) {
    text += textNode.value;
  });
  return text.trim();
}

export function readmeScrapeCard(
  node: HastNode,
  _index: HastNodeIndex,
  _parent: HastNodeParent
): Element | undefined {
  if ((node.tagName !== "a" && node.tagName !== "div") || !anyClassIncludes(node, "card")) {
    return undefined;
  }

  const label = findByClassName(node, "lqc-label");
  const title = label ? firstText(label) : firstText(node);

  let href = typeof node.properties.href === "string" ? node.properties.href : undefined;
  if (!href) {
    visit(node, "element", function (subNode) {
      if (subNode.tagName === "a" && typeof subNode.properties.href === "string") {
        href = subNode.properties.href;
        return EXIT;
      }
      return CONTINUE;
    });
  }

  if (!title && !href) return undefined;

  const properties: Record<string, string> = {};
  if (title) properties.title = title;
  if (href) properties.href = href;

  return { type: "element", tagName: "Card", properties, children: [] };
}
