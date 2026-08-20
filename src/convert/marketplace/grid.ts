import type { RootContent } from "mdast";

import { lineOf, type ConversionNote } from "../mdast";
import type { Rule } from "./rule";

/**
 * `<Grid>` -> its children, in order (marketplace-conversion.md §5.2).
 *
 * Source `[MP Grid]`: `({ columns = 2, children, gap, padding, style })` — a bare
 * CSS grid with no semantics of its own.
 *
 * **Why the layout is dropped rather than rebuilt.** The obvious target is
 * `<Columns>`, but `<Columns>` takes `<Card>` children and `<Card>` requires both
 * `title` and `href` `[DAI §12]`. A `<Grid>` child has neither, and `[PLAN §2.3]`
 * is explicit that a destination must never be invented to satisfy `<Card>`. The
 * same section says that when content is not card-shaped, the two-column layout
 * is what gives way — losing a side-by-side arrangement is acceptable, losing or
 * fabricating content is not.
 *
 * So the children are unwrapped in document order and the loss is reported. Where
 * the children *are* card-shaped, a person can promote them to `<Columns>` +
 * `<Card>` afterwards; the note says so.
 */
export const grid: Rule = (node, notes: ConversionNote[]) => {
  const children = (node.children as RootContent[]).filter(
    (child) => child.type !== "text" || child.value.trim().length > 0,
  );

  notes.push({
    rule: "marketplace",
    level: "flag",
    line: lineOf(node),
    detail: `<Grid> unwrapped to its ${children.length} children in order — the grid layout is lost, because <Card> requires an href that a <Grid> child does not have (plan §2.3). If the children are card-shaped, promote them to <Columns> + <Card> by hand`,
  });

  return children;
};
