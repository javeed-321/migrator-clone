import { lineOf, readAttr, type ConversionNote } from "../mdast";
import { expandable, type Rule } from "./rule";

/**
 * `<KeyPress>` -> `<Expandable>` (marketplace-conversion.md §5.1).
 *
 * Source `[MP KeyPress]`: a `keydown` listener that reveals the children when
 * `keyCombo` is pressed. There is no keyboard-triggered component on the target
 * and no way to add one without page scripts.
 *
 * The gesture is lost; the content must not be. `[PLAN §4.4]` step 2 is explicit
 * — degrade to content, never to nothing — so the children are shown behind an
 * `<Expandable>` whose title names the combo the source used. A reader who came
 * for the hidden content can still reach it.
 */
export const keyPress: Rule = (node, notes: ConversionNote[]) => {
  const combo = readAttr(node, "keyCombo")?.trim();

  notes.push({
    rule: "marketplace",
    level: "flag",
    line: lineOf(node),
    detail: combo
      ? `<KeyPress keyCombo="${combo}"> -> <Expandable> — the key-combo trigger is lost; the content is now revealed by clicking`
      : "<KeyPress> -> <Expandable> — the key-combo trigger is lost; the content is now revealed by clicking",
  });

  return [expandable(combo ? `Press ${combo}` : "Show content", node.children as never, false)];
};
