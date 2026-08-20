import { lineOf, readAttr, type ConversionNote } from "../mdast";
import { expandable, para, type Rule } from "./rule";

/**
 * `<ContentModal>` -> `<Expandable>` (marketplace-conversion.md §5.1, §7.4).
 *
 * Source `[MP ContentModal]`: `({ label, title, content, size, buttonColor })` —
 * a button labelled `label` that opens an overlay headed `title` containing
 * `content`.
 *
 * **The body text is in a prop, not in children.** Dropping the tag deletes the
 * whole modal's content, and the page still compiles `[PIT Phase 2]`. So
 * `content` is lifted into the body, which is the only part of this conversion
 * that is not cosmetic.
 *
 * `title` names the disclosure when present; `label` is the fallback, since it is
 * what the reader clicked in the source. `size` and `buttonColor` are
 * presentation-only.
 */
export const contentModal: Rule = (node, notes: ConversionNote[]) => {
  const title = readAttr(node, "title")?.trim();
  const label = readAttr(node, "label")?.trim();
  const content = readAttr(node, "content")?.trim();

  const heading = title || label;
  if (!heading) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<ContentModal> has neither `title` nor `label` — an <Expandable> needs a name and one must not be invented",
    });
    return null;
  }

  // `content` is the modal's body; children are used only when the prop is absent.
  const body = content ? [para(content)] : (node.children as never[]);

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: `<ContentModal> -> <Expandable title="${heading}"> — the overlay is lost; the \`content\` prop is lifted into the body so the text survives`,
  });

  return [expandable(heading, body, false)];
};
