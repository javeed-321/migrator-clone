import type { Parent, Root, RootContent, Table } from "mdast";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";

import { parseMarkdown } from "../download/parse";
import { lineOf, readAttr, type ConversionNote } from "./mdast";
import { buildTable, flattenCell } from "./table";

/**
 * Plan §3.4 — a **raw `<table>`** becomes a GFM pipe table, spans and all.
 *
 * This is the lowercase HTML table, not ReadMe's `<Table>` component (§2.5 owns
 * that one). It is rarer — 7 in the Capillary corpus `[RM §11.3]` — but it is the
 * only inbound form that can carry `colspan` and `rowspan`, which GFM has no
 * syntax for.
 *
 * ## Why a raw `<table>` cannot simply be left alone
 *
 * Verified against the target's own renderer, by compiling each form with the MDX
 * compiler the platform uses:
 *
 * | Written as | What the compiler does |
 * |---|---|
 * | A GFM pipe table | resolves to `_components.table` -> the platform's `Table`, which wraps it in `overflow-x-auto` `[APP Table.tsx]` |
 * | Literal `<table>` | **bypasses the component map** — a bare intrinsic, with no scroll container |
 * | `<Table>` capital | `_missingMdxReference("Table")` — **throws**, since `Table` is not in the map `[APP MDXRemoteServer.tsx]` |
 *
 * So a raw `<table>` does render, but as an unwrapped element: a wide one overflows
 * the page instead of scrolling inside its own container. Only the markdown form
 * gets the wrapper, which is the whole reason every table converges on GFM.
 *
 * ## What happens to the spans
 *
 * §3.4: *"Flatten: repeat the spanned value in each cell it covers… Never drop a
 * spanned cell."* The table is expanded into a rectangular grid exactly the way a
 * browser lays one out — a `rowspan` occupies its column on the rows below, a
 * `colspan` occupies the columns beside it — and every covered slot receives the
 * value.
 *
 * Stacked header rows collapse into GFM's single header row by joining each
 * column's labels top to bottom, so `Performance` above `Q1` becomes
 * `Performance Q1`. A label repeated by its own `rowspan` is not doubled.
 *
 * Nothing is lost, but a summary row repeated across three columns reads worse
 * than the original did, so the flatten is **reported as a flag**: §3.4's other
 * option — splitting into two tables under separate headings — is better
 * documentation and is a content edit, which stays a human decision.
 */

type JsxElement = MdxJsxFlowElement | MdxJsxTextElement;

/** One cell as the source wrote it, before the grid is laid out. */
type SourceCell = { text: string; colspan: number; rowspan: number; header: boolean };
type SourceRow = { cells: SourceCell[]; inHead: boolean };

/** Presentation attributes a GFM table has nowhere to put. */
const DROPPED = ["border", "cellpadding", "cellspacing", "width", "style", "class", "className"];

function isElement(node: RootContent | JsxElement, names: string[]): node is JsxElement {
  return (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    node.name !== null &&
    names.includes(node.name)
  );
}

/** `colspan="3"`, `colSpan={3}`, absent — all read as a positive integer. */
function span(node: JsxElement, name: string): number {
  const raw = readAttr(node, name) ?? readAttr(node, name === "colspan" ? "colSpan" : "rowSpan");
  const value = Number.parseInt((raw ?? "").replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(value) && value > 0 ? value : 1;
}

/**
 * Every `<th>`/`<td>` under a row, however deeply it is wrapped.
 *
 * A descendant search, not a child scan: MDX parses `<tr><th>A</th></tr>` written
 * on one line as **inline** JSX, so the cells arrive inside a `paragraph` rather
 * than as children of the `<tr>`. A child scan finds nothing there and reports an
 * empty table — the same trap the `<Table>` reader documents. Nested tables and
 * rows are not entered, so their cells stay with their own row.
 */
function cellsIn(node: JsxElement): JsxElement[] {
  const found: JsxElement[] = [];

  for (const child of (node.children ?? []) as RootContent[]) {
    if (isElement(child, ["th", "td"])) {
      found.push(child);
      continue;
    }
    if (isElement(child, ["table", "tr"])) continue;
    if ("children" in child && Array.isArray((child as Parent).children)) {
      found.push(...cellsIn(child as unknown as JsxElement));
    }
  }

  return found;
}

/**
 * Reads the rows out of a `<table>`, keeping the one fact the grid needs from the
 * document structure: whether a row sits in `<thead>`.
 *
 * A hand-walked recursion rather than a `visit`, so a table nested inside a cell
 * belongs to its own conversion instead of being absorbed into this one.
 */
function readRows(node: JsxElement, inHead = false): SourceRow[] {
  const rows: SourceRow[] = [];

  for (const child of (node.children ?? []) as RootContent[]) {
    // The tag name is read once. Chaining `isElement` guards would narrow the
    // remaining branches to `never`, since each guard claims the same node type.
    const element =
      child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement" ? child : undefined;
    const name = element?.name ?? "";

    if (name === "table") continue; // a nested table converts on its own pass

    if (element && (name === "thead" || name === "tbody" || name === "tfoot")) {
      rows.push(...readRows(element, name === "thead"));
      continue;
    }

    if (element && name === "tr") {
      const cells: SourceCell[] = cellsIn(element).map((cellNode) => ({
        text: flattenCell(cellNode.children as RootContent[]),
        colspan: span(cellNode, "colspan"),
        rowspan: span(cellNode, "rowspan"),
        header: cellNode.name === "th",
      }));
      if (cells.length > 0) rows.push({ cells, inHead });
      continue;
    }

    // `<tr>` written compactly parses as inline JSX inside a paragraph, so keep
    // descending rather than assuming a tidy thead/tbody/tr shape.
    if ("children" in child && Array.isArray((child as Parent).children)) {
      rows.push(...readRows(child as unknown as JsxElement, inHead));
    }
  }

  return rows;
}

/**
 * Lays the rows out as a browser would: every span occupies the slots it covers,
 * and the value is written into each of them.
 *
 * Occupancy is tracked separately from content, because a `rowspan` claims a slot
 * on a row that has not been read yet — the next row's cells have to flow around
 * it rather than overwrite it.
 */
function expand(rows: SourceRow[]): string[][] {
  const grid: string[][] = [];
  const taken: boolean[][] = [];

  rows.forEach((row, r) => {
    grid[r] ??= [];
    taken[r] ??= [];

    let column = 0;
    for (const cell of row.cells) {
      while (taken[r]?.[column]) column += 1;

      for (let dr = 0; dr < cell.rowspan; dr += 1) {
        for (let dc = 0; dc < cell.colspan; dc += 1) {
          (grid[r + dr] ??= [])[column + dc] = cell.text;
          (taken[r + dr] ??= [])[column + dc] = true;
        }
      }
      column += cell.colspan;
    }
  });

  // A rowspan on the last row can claim slots past the end of the table; those
  // phantom rows are dropped rather than shipped as blank ones.
  const laid = grid.slice(0, rows.length);
  const width = laid.reduce((widest, row) => Math.max(widest, row.length), 0);
  return laid.map((row) => Array.from({ length: width }, (_, index) => row[index] ?? ""));
}

/**
 * Stacked header rows -> GFM's single header row.
 *
 * Each column's labels are read top to bottom and joined, so a group label lands
 * on every leaf beneath it. A label the grid repeated — because the cell had a
 * `rowspan` down the header — is written once, not twice.
 */
function joinHeader(headerRows: string[][]): string[] {
  const width = headerRows.reduce((widest, row) => Math.max(widest, row.length), 0);

  return Array.from({ length: width }, (_, column) => {
    const labels: string[] = [];
    for (const row of headerRows) {
      const label = (row[column] ?? "").trim();
      if (label.length > 0 && labels[labels.length - 1] !== label) labels.push(label);
    }
    return labels.join(" ");
  });
}

/**
 * How many rows at the top are header rows.
 *
 * `<thead>` is the authority when it is there. Without one, a leading run of rows
 * made entirely of `<th>` is the header — which is how the corpus's hand-written
 * tables spell it `[RM §11.3]`.
 */
function headerDepth(rows: SourceRow[]): number {
  const declared = rows.filter((row) => row.inHead).length;
  if (declared > 0) return declared;

  let depth = 0;
  while (rows[depth]?.cells.every((cell) => cell.header) === true) depth += 1;
  return depth;
}

/** Converts one raw `<table>` element into a markdown table node. */
export function convertHtmlTable(node: JsxElement, notes: ConversionNote[]): Table | undefined {
  const line = lineOf(node);
  const rows = readRows(node);

  if (rows.length === 0) {
    notes.push({
      rule: "html-table",
      level: "blocker",
      line,
      detail: "raw <table> has no readable rows — left in place rather than emitted as an empty table",
    });
    return undefined;
  }

  const depth = Math.max(headerDepth(rows), 1);
  const grid = expand(rows);
  const header = joinHeader(grid.slice(0, depth));
  const body = grid.slice(depth);

  const table = buildTable(header, body, [], notes, line);

  notes.push({
    rule: "html-table",
    level: "change",
    line,
    detail: `raw <table> -> GFM pipe table, ${header.length} column${header.length === 1 ? "" : "s"} and ${body.length} row${body.length === 1 ? "" : "s"}`,
  });

  const spanned = rows.flatMap((row) => row.cells).filter((cell) => cell.colspan > 1 || cell.rowspan > 1);
  if (spanned.length > 0) {
    notes.push({
      rule: "html-table",
      level: "flag",
      line,
      detail: `flattened ${spanned.length} colspan/rowspan cell${spanned.length === 1 ? "" : "s"} — each spanned value is repeated in every cell it covered, since GFM has no spans. Splitting the table under separate headings reads better and is your call (plan §3.4)`,
    });
  }

  if (depth > 1) {
    notes.push({
      rule: "html-table",
      level: "flag",
      line,
      detail: `${depth} header rows joined into one — a group label now prefixes each column beneath it, e.g. "${header.find((text) => text.includes(" ")) ?? header[0] ?? ""}"`,
    });
  }

  const bodyHeaders = rows.slice(depth).filter((row) => row.cells.some((cell) => cell.header)).length;
  if (bodyHeaders > 0) {
    notes.push({
      rule: "html-table",
      level: "flag",
      line,
      detail: `${bodyHeaders} body row${bodyHeaders === 1 ? " uses" : "s use"} <th> cells — GFM has a single header row, so they are ordinary rows now`,
    });
  }

  const dropped = DROPPED.filter((name) => readAttr(node, name) !== undefined);
  if (dropped.length > 0) {
    notes.push({
      rule: "html-table",
      level: "change",
      line,
      detail: `dropped ${dropped.join(", ")} — a GFM table carries no presentation attributes`,
    });
  }

  return table;
}

/**
 * A raw table on a page that fell back to the plain parser, where it arrives as an
 * `html` node instead of a subtree.
 *
 * The value is handed back to the strict parser on its own: a well-formed table is
 * valid JSX even when the rest of the page is not, so this recovers the common
 * case. A fragment that still will not parse — or a table split across several
 * nodes by the blank lines between its rows — is reported rather than guessed at.
 */
function fromHtmlNode(value: string, line: number | undefined, notes: ConversionNote[]): Table | undefined {
  if (!/<table[\s>]/i.test(value)) return undefined;

  if (!/<\/table\s*>/i.test(value)) {
    notes.push({
      rule: "html-table",
      level: "blocker",
      line,
      detail: "raw <table> is split across the page rather than parsed as one element — the page is not valid MDX, so repair it first (usually an unclosed tag) and convert again",
    });
    return undefined;
  }

  const { tree, mode } = parseMarkdown(value);
  const [first] = tree.children;
  if (mode !== "mdx" || !first || !isElement(first, ["table"])) {
    notes.push({
      rule: "html-table",
      level: "blocker",
      line,
      detail: "raw <table> will not parse as JSX — left in place rather than rewritten on a guess",
    });
    return undefined;
  }

  return convertHtmlTable(first, notes);
}

/**
 * Converts every raw `<table>` on a page.
 *
 * Runs before the `<Table>` pass, so the markdown table it produces is then
 * normalised by that pass like any other — same cell rules, same depth encoding.
 */
export function convertHtmlTables(root: Root | Parent, notes: ConversionNote[]): void {
  const children = root.children as RootContent[];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    if (isElement(child, ["table"])) {
      const table = convertHtmlTable(child, notes);
      if (table) children[i] = table;
      continue;
    }

    if (child.type === "html") {
      const table = fromHtmlNode(child.value, lineOf(child), notes);
      if (table) children[i] = table;
      continue;
    }

    if ("children" in child && Array.isArray((child as Parent).children)) {
      convertHtmlTables(child as Parent, notes);
    }
  }
}
