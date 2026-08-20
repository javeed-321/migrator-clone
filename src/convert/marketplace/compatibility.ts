import type { Heading, RootContent } from "mdast";

import { lineOf, readAttr, type ConversionNote } from "../mdast";
import { parseRecord } from "./js-literal";
import { para, safeCell, table, type Rule } from "./rule";

/**
 * `<Compatibility>` -> a heading, a sentence and a pipe table
 * (marketplace-conversion.md §7.1).
 *
 * Source `[MP Compatibility]`:
 * `({ title, subtitle, plans })`, where `plans` is `{ Free: false, Business: true }`
 * and each entry renders as a Font Awesome tick or cross in a yellow panel.
 *
 * **A table carries 100% of the information.** What the component holds is a
 * handful of booleans and two strings; the panel adds colour, icons that only
 * render where Font Awesome is loaded, and — by its own source comment,
 * `NOTE: Needs mobile and darkmode support still!` — a known dark-mode bug.
 * Reproducing that faithfully would reproduce the bug and hide the content from
 * search. "Is this feature on Enterprise?" is exactly what a reader asks, so the
 * answer belongs in indexed text.
 *
 * **`title` and `subtitle` are the only prose the component carries.** They are
 * in props, so they are lifted; dropping them loses the feature's name and its
 * description with nothing to show it happened `[PIT Phase 2]`.
 */
export const compatibility: Rule = (node, notes: ConversionNote[]) => {
  const title = readAttr(node, "title")?.trim();
  const subtitle = readAttr(node, "subtitle")?.trim();
  const rawPlans = readAttr(node, "plans");

  const plans = rawPlans === undefined ? null : parseRecord(rawPlans);

  if (plans === null || Object.keys(plans).length === 0) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<Compatibility> has no readable `plans` object — the matrix cannot be rebuilt without guessing at which plans are supported",
    });
    return null;
  }

  const out: RootContent[] = [];

  if (title) {
    const heading: Heading = { type: "heading", depth: 3, children: [{ type: "text", value: title }] };
    out.push(heading);
  }
  if (subtitle) out.push(para(subtitle));

  out.push(
    table(
      ["Plan", "Available"],
      Object.entries(plans).map(([name, value]) => [safeCell(name), value === true ? "✅" : "—"]),
    ),
  );

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: `<Compatibility> -> a table of ${Object.keys(plans).length} plans — the colour coding is lost, every value is preserved and now searchable`,
  });

  return out;
};
