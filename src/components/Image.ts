import type { Element } from "hast";
import { CONTINUE, EXIT, visit } from "unist-util-visit";

import type { HastNode, HastNodeIndex, HastNodeParent } from "../types/hast";

/**
 * ReadMe wraps article images in a lightbox `<figure>`:
 *
 *   <figure>
 *     <span class="img lightbox"><span class="lightbox-inner">
 *       <img src="https://files.readme.io/….gif" alt="…" width="auto" height="auto">
 *     </span></span>
 *     <figcaption><p>…</p></figcaption>
 *   </figure>
 *
 * Documentation.AI has no Frame component, so the whole thing collapses to a
 * self-closing `<Image>` (see ucc/Image.json). The remote `files.readme.io` URL
 * is kept as-is — nothing is downloaded.
 */
function firstImg(node: Element): Element | undefined {
  let img: Element | undefined = undefined;
  visit(node, "element", function (subNode) {
    if (subNode.tagName === "img") {
      img = subNode;
      return EXIT;
    }
    return CONTINUE;
  });
  return img;
}

function textOf(node: Element): string {
  let text = "";
  visit(node, "text", function (textNode) {
    text += textNode.value;
  });
  return text.trim();
}

/** A width/height is only usable if it is an integer; ReadMe often emits `auto`. */
function numericDimension(value: unknown): string | undefined {
  if (typeof value === "number") return String(value);
  if (typeof value === "string" && /^\d+$/.test(value)) return value;
  return undefined;
}

export function readmeScrapeImage(
  node: HastNode,
  _index: HastNodeIndex,
  _parent: HastNodeParent
): Element | undefined {
  let img: Element | undefined;
  let caption = "";

  if (node.tagName === "figure") {
    img = firstImg(node);
    visit(node, "element", function (subNode) {
      if (subNode.tagName === "figcaption") {
        caption = textOf(subNode);
        return EXIT;
      }
      return CONTINUE;
    });
  } else if (node.tagName === "img") {
    img = node;
  } else {
    return undefined;
  }

  const src = img && typeof img.properties.src === "string" ? img.properties.src : "";
  if (!src) return undefined;

  const rawAlt = typeof img!.properties.alt === "string" ? img!.properties.alt.trim() : "";
  const alt = rawAlt || caption;

  const properties: Record<string, string> = { src };
  if (alt) properties.alt = alt;

  const width = numericDimension(img!.properties.width);
  const height = numericDimension(img!.properties.height);
  if (width) properties.width = width;
  if (height) properties.height = height;

  if (caption && caption !== alt) properties.caption = caption;

  // Self-closing: an Image never carries children.
  return { type: "element", tagName: "Image", properties, children: [] };
}
