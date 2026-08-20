import type { RootContent } from "mdast";

import { attr, lineOf, readAttr, type ConversionNote } from "../mdast";
import type { Rule } from "./rule";

/**
 * `<SnapSlider>` -> `<div className="rm-slider">` (marketplace-conversion.md §5.2).
 *
 * Source `[MP SnapSlider]`:
 * `flex items-center snap-x snap-mandatory overflow-x-scroll …` over
 * `snap-center flex-shrink-0` children — a scroll-snapping gallery that is
 * **entirely CSS**. No state, no effects, no JavaScript.
 *
 * That is what makes this Route 2 rather than a degradation: the behaviour can be
 * reproduced exactly, in a stylesheet, with nothing lost.
 *
 * ## Why a wrapper and not prerendered HTML
 *
 * The obvious reading of "convert to HTML" is to render the component and paste
 * the markup. Doing that would flatten the children — `<Image>` components and
 * markdown alike — into an opaque HTML string, and everything inside would stop
 * being visible to search and to the AI assistant `[PLAN §4.2]`.
 *
 * Wrapping instead keeps every child a real node: the images still go through the
 * image pass, the text is still indexed, and only the *layout* moves to CSS.
 * The chrome is the part that had to leave markdown; the content never did.
 *
 * Requires `.rm-slider` from `styles/marketplace.css`, registered in
 * `documentation.json` under `css` `[LIVE-DAI /docs/customize/custom-css]`.
 */
export const snapSlider: Rule = (node, notes: ConversionNote[]) => {
  const children = (node.children as RootContent[]).filter(
    (child) => child.type !== "text" || child.value.trim().length > 0,
  );

  // The source threads a caller-supplied `className` through, so keep it.
  const extra = readAttr(node, "className")?.trim();
  const id = readAttr(node, "id")?.trim();

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: `<SnapSlider> -> <div className="rm-slider"> with ${children.length} children — scroll-snap is pure CSS, so nothing is lost; needs .rm-slider from styles/marketplace.css`,
  });

  return [
    {
      type: "mdxJsxFlowElement",
      name: "div",
      attributes: [
        attr("className", extra ? `rm-slider ${extra}` : "rm-slider"),
        ...(id ? [attr("id", id)] : []),
      ],
      children: children as never,
    },
  ];
};
