import { attr, lineOf, readAttr, type ConversionNote } from "../mdast";
import { para, type Rule } from "./rule";

/**
 * `<Banner>` -> `<Callout>`, or a site-level concern (marketplace-conversion.md §5.4).
 *
 * **This component is two different problems wearing one tag** `[MP Banner]`:
 *
 * - `isInline={true}` renders a coloured box in the page. That is a `<Callout>`.
 * - `isInline={false}` — the default — runs
 *   `document.querySelector('#content-head')` and prepends a div to the **site
 *   header**. It is not page content at all, and no page-level component can
 *   express it. That belongs in Custom Scripts + Custom CSS `[PLAN §4.2]`.
 *
 * Converting the second case to a `<Callout>` would move a site-wide banner into
 * the middle of one page, so it is reported rather than converted.
 *
 * `message` is a **prop**, not children, so it must be lifted or the text is lost.
 * `color`, `textColor`, `fontSize` and `fontWeight` are dropped: `<Callout>` draws
 * its palette from `kind`, which is what keeps it correct in dark mode.
 */
export const banner: Rule = (node, notes: ConversionNote[]) => {
  const message = readAttr(node, "message")?.trim();
  const inline = readAttr(node, "isInline")?.trim();

  if (inline !== "true") {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail:
        "<Banner> without isInline={true} injects itself into the site header, not the page — rebuild it as Custom Scripts + Custom CSS, or drop it. " +
        (message ? `Its text was: "${message}"` : "It carried no message text"),
    });
    return null;
  }

  if (!message) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<Banner isInline> has no `message` — there is no text to carry into a <Callout>",
    });
    return null;
  }

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: '<Banner isInline> -> <Callout kind="info"> — the custom colours are dropped so the callout themes correctly in dark mode',
  });

  return [
    {
      type: "mdxJsxFlowElement",
      name: "Callout",
      attributes: [attr("kind", "info")],
      children: [para(message)] as never,
    },
  ];
};
