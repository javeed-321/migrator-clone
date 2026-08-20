import type { RootContent } from "mdast";

import { attr, lineOf, readAttr, type ConversionNote } from "../mdast";
import { para, type Rule } from "./rule";

/**
 * `<Windows>` -> `<div className="rm-window">` (marketplace-conversion.md §5.2).
 *
 * Source `[MP Windows]`: `({ header, children })` — nested bordered divs drawing a
 * retro window frame. No state, no effects, no data.
 *
 * Pure decoration, so the frame moves to CSS and the children stay markdown. As
 * with `snap-slider.ts`, wrapping beats prerendering: the words inside a window
 * frame are still words, and flattening them into an HTML string would hide them
 * from search for the sake of a border.
 *
 * `header` is the title-bar text. It is a **prop**, so it must be lifted or it is
 * lost — it becomes the first child, marked with its own class so the stylesheet
 * can draw it as a title bar.
 *
 * Requires `.rm-window` from `styles/marketplace.css`.
 */
export const windows: Rule = (node, notes: ConversionNote[]) => {
  const header = readAttr(node, "header")?.trim();

  const body = (node.children as RootContent[]).filter(
    (child) => child.type !== "text" || child.value.trim().length > 0,
  );

  const children: RootContent[] = [];

  if (header) {
    children.push({
      type: "mdxJsxFlowElement",
      name: "div",
      attributes: [attr("className", "rm-window-title")],
      children: [para(header)] as never,
    });
  }

  children.push({
    type: "mdxJsxFlowElement",
    name: "div",
    attributes: [attr("className", "rm-window-body")],
    children: body as never,
  });

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: header
      ? `<Windows header="${header}"> -> <div className="rm-window"> — the frame moves to CSS, the header and body stay markdown; needs .rm-window from styles/marketplace.css`
      : '<Windows> -> <div className="rm-window"> — the frame moves to CSS; needs .rm-window from styles/marketplace.css',
  });

  return [
    {
      type: "mdxJsxFlowElement",
      name: "div",
      attributes: [attr("className", "rm-window")],
      children: children as never,
    },
  ];
};
