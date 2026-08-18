import { describe, expect, it } from "vitest";

import { convertHtmlTables } from "../src/convert/html-table";
import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { convertReadmeMarkdown } from "../src/convert/run";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertHtmlTables(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

/** Cells of one row of the emitted pipe table, by 0-based row index. */
function row(mdx: string, index: number): string[] {
  const lines = mdx.split("\n").filter((line) => line.trim().startsWith("|"));
  return (lines[index] ?? "")
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

const PLAIN = `<table>
  <thead>
    <tr><th>Field</th><th>Type</th></tr>
  </thead>
  <tbody>
    <tr><td>\`customer\`</td><td>object</td></tr>
    <tr><td>email</td><td>string</td></tr>
  </tbody>
</table>`;

describe("3.4 a raw table becomes a pipe table", () => {
  it("converts it", async () => {
    const { mdx } = run(PLAIN);

    expect(mdx).not.toContain("<table");
    expect(mdx).not.toContain("<td");
    expect(mdx.split("\n")[0]?.trim().startsWith("|")).toBe(true);
  });

  it("keeps the header and every row", async () => {
    const { mdx } = run(PLAIN);

    expect(row(mdx, 0)).toEqual(["Field", "Type"]);
    expect(row(mdx, 2)).toEqual(["`customer`", "object"]);
    expect(row(mdx, 3)).toEqual(["email", "string"]);
  });

  it("finds cells that parsed as inline JSX inside a paragraph", async () => {
    // `<tr><th>A</th></tr>` on one line puts the cells in a paragraph, not in the
    // row — a child scan would report an empty table.
    const { mdx } = run("<table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table>");

    expect(row(mdx, 0)).toEqual(["A", "B"]);
    expect(row(mdx, 2)).toEqual(["1", "2"]);
  });

  it("reads a table with no thead, taking the leading all-th rows as the header", async () => {
    const { mdx } = run("<table>\n  <tr><th>A</th><th>B</th></tr>\n  <tr><td>1</td><td>2</td></tr>\n</table>");

    expect(row(mdx, 0)).toEqual(["A", "B"]);
  });

  it("drops the presentation attributes and says so", async () => {
    const source = '<table border="1" cellpadding="10" cellspacing="0">\n  <tr><th>A</th></tr>\n  <tr><td>1</td></tr>\n</table>';
    const { mdx, notes } = run(source);

    expect(mdx).not.toContain("border");
    expect(notes.some((note) => note.detail.includes("dropped border, cellpadding, cellspacing"))).toBe(
      true,
    );
  });

  it("reports the conversion", async () => {
    const { notes } = run(PLAIN);

    expect(notes.some((note) => note.rule === "html-table" && note.level === "change")).toBe(true);
  });
});

describe("3.4 colspan and rowspan are flattened, never dropped", () => {
  const SPANS = `<table>
  <thead>
    <tr>
      <th rowspan="2">Employee</th>
      <th colspan="3">Performance</th>
    </tr>
    <tr><th>Q1</th><th>Q2</th><th>Q3</th></tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">John</td>
      <td>85%</td><td>90%</td><td>88%</td>
    </tr>
    <tr><td colspan="3">Overall: Excellent</td></tr>
  </tbody>
</table>`;

  it("joins a stacked header into GFM's single row", async () => {
    expect(row(run(SPANS).mdx, 0)).toEqual([
      "Employee",
      "Performance Q1",
      "Performance Q2",
      "Performance Q3",
    ]);
  });

  it("does not double a label that spanned the header rows itself", async () => {
    expect(row(run(SPANS).mdx, 0)[0]).toBe("Employee");
  });

  it("repeats a colspan value across every column it covered", async () => {
    expect(row(run(SPANS).mdx, 3)).toEqual([
      "John",
      "Overall: Excellent",
      "Overall: Excellent",
      "Overall: Excellent",
    ]);
  });

  it("carries a rowspan value down into the rows it covered", async () => {
    expect(row(run(SPANS).mdx, 2)[0]).toBe("John");
    expect(row(run(SPANS).mdx, 3)[0]).toBe("John");
  });

  it("makes every row the same width", async () => {
    const { mdx } = run(SPANS);
    const widths = new Set(
      mdx.split("\n").filter((line) => line.trim().startsWith("|")).map((line) => line.split("|").length),
    );

    expect(widths.size).toBe(1);
  });

  it("flags the flatten, since splitting the table reads better and is a human call", async () => {
    const { notes } = run(SPANS);

    expect(
      notes.some((note) => note.level === "flag" && note.detail.includes("colspan/rowspan")),
    ).toBe(true);
  });

  it("flags the joined header rows", async () => {
    expect(run(SPANS).notes.some((note) => note.detail.includes("header rows joined"))).toBe(true);
  });

  it("flags a <th> stranded in a body row", async () => {
    const source =
      "<table>\n  <tr><th>A</th><th>B</th></tr>\n  <tr><td>1</td><td>2</td></tr>\n  <tr><th>Total</th><td>3</td></tr>\n</table>";

    expect(run(source).notes.some((note) => note.detail.includes("<th> cells"))).toBe(true);
  });
});

describe("3.4 what it refuses to guess at", () => {
  it("leaves a table with no readable rows in place, and blocks", async () => {
    const { mdx, notes } = run("<table>\n  <tbody></tbody>\n</table>");

    expect(mdx).toContain("<table");
    expect(notes.some((note) => note.level === "blocker")).toBe(true);
  });

  it("leaves ReadMe's <Table> component to its own pass", async () => {
    const source = "<Table>\n  <thead>\n    <tr><th>A</th></tr>\n  </thead>\n</Table>";

    expect(run(source).mdx).toContain("<Table>");
  });

  it("converts a table nested inside another component", async () => {
    const source = `<Callout kind="info">\n\n${PLAIN}\n\n</Callout>`;
    const { mdx } = run(source);

    expect(mdx).toContain("<Callout");
    expect(mdx).not.toContain("<td");
  });
});

const result = await convertReadmeMarkdown(PLAIN);

describe("3.4 through the pipeline", () => {

  it("hands the result to the table pass, which normalises it", async () => {
    expect(result.mdx).not.toContain("<table");
    expect(result.mdx).toContain("| Field");
  });

  it("is idempotent", async () => {
    expect((await convertReadmeMarkdown(result.mdx)).mdx).toBe(result.mdx);
  });

  it("emits no raw HTML", async () => {
    expect(result.mdx).not.toMatch(/<(table|thead|tbody|tr|th|td)\b/);
  });
});
