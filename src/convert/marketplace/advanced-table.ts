import { lineOf, readAttr, type ConversionNote } from "../mdast";
import { parseRecordArray } from "./js-literal";
import { safeCell, table, type Rule } from "./rule";

/**
 * `<AdvancedTable>` -> a pipe table (marketplace-conversion.md §7.2).
 *
 * Source `[MP AdvancedTable]`: `({ data })` — an array of flat objects rendered
 * with live filtering, column sorting, pagination and CSV export.
 *
 * All four of those need JavaScript the target will not run, so they are lost.
 * The rows are not: they are the content, and they are what search and the AI
 * assistant need to see.
 *
 * ## Two things this has to get right
 *
 * **Column order comes from the first object's keys**, not from a union of all
 * keys sorted somehow. That is the order the author wrote, and the order the
 * component itself renders. Later objects missing a key get an empty cell rather
 * than shifting the row.
 *
 * **Braces in the data are an MDX hazard.** ReadMe's own sample rows contain
 * `'{category}'`, `'{slug}'` and `'{error}'`. Inside `data={…}` those are ordinary
 * string characters; lifted into body text a bare `{…}` is an expression and gets
 * evaluated `[RM §12 gotcha 15]` `[PIT Phase 5]`. `safeCell` backticks them, which
 * both disarms them and marks them as the placeholders they are.
 */
export const advancedTable: Rule = (node, notes: ConversionNote[]) => {
  const raw = readAttr(node, "data");
  const rows = raw === undefined ? null : parseRecordArray(raw);

  if (rows === null || rows.length === 0) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<AdvancedTable> has no readable `data` array — the rows cannot be rebuilt, and an empty table would silently drop them",
    });
    return null;
  }

  const keys = Object.keys(rows[0]!);
  if (keys.length === 0) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<AdvancedTable>'s first data object has no keys, so there are no columns to build",
    });
    return null;
  }

  const headers = keys.map((key) => key.charAt(0).toUpperCase() + key.slice(1));
  const body = rows.map((row) =>
    keys.map((key) => {
      const value = row[key];
      if (value === undefined || value === null) return "";
      return safeCell(typeof value === "object" ? JSON.stringify(value) : String(value));
    }),
  );

  notes.push({
    rule: "marketplace",
    level: "flag",
    line: lineOf(node),
    detail: `<AdvancedTable> -> a ${rows.length}-row table — sorting, filtering, pagination and CSV export are lost; every row is preserved`,
  });

  return [table(headers, body)];
};
