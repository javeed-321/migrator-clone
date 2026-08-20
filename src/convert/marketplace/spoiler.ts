import { lineOf, type ConversionNote } from "../mdast";
import { expandable, type Rule } from "./rule";

/**
 * `<Spoiler>` -> `<Expandable>` (marketplace-conversion.md §5.1).
 *
 * Source `[MP Spoiler]`: an absolutely-positioned overlay over the children,
 * cleared on click and faded out over `fadeDuration`.
 *
 * The content is in `children`, so nothing is at risk — only the reveal gesture
 * changes. `<Expandable default-open="false">` keeps the intent exactly: content
 * hidden until the reader acts. `overlayColor` and `fadeDuration` describe an
 * animation the target does not have, and are dropped.
 */
export const spoiler: Rule = (node, notes: ConversionNote[]) => {
  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: "<Spoiler> -> <Expandable default-open=\"false\"> — the click-to-reveal fade is lost, the hidden-until-asked-for behaviour is kept",
  });

  return [expandable("Click to reveal", node.children as never, false)];
};
