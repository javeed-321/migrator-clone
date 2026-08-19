import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import {
  assignDepths,
  convertTables,
  flattenCell,
  inferIndentUnit,
  readMarker,
} from "../src/convert/table";
import { parseMarkdown } from "../src/download/parse";

const EM = " ";
const NBSP = " ";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertTables(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

const depthsOf = (cells: string[]) => assignDepths(cells.map(readMarker));

describe("depth: reading the source dialect", () => {
  it("reads the dot dialect", () => {
    expect(readMarker("..productConditions")).toEqual({
      kind: "dots",
      width: 2,
      rest: "productConditions",
    });
  });

  it("reads the NBSP ladder, glyph and all", () => {
    expect(readMarker(`${NBSP.repeat(4)}• \`code\``)).toEqual({
      kind: "space",
      width: 4,
      rest: "`code`",
    });
  });

  it("reads the dash dialect, escaped or not, from one dash up", () => {
    expect(readMarker("-to").kind).toBe("dashes");
    expect(readMarker("-to").width).toBe(1);
    expect(readMarker("--name").kind).toBe("dashes");
    expect(readMarker("\\--name").kind).toBe("dashes");
    expect(readMarker("--name").width).toBe(2);
  });

  it("reads a single bullet as one level", () => {
    expect(readMarker("* email")).toEqual({ kind: "bullet", width: 1, rest: "email" });
  });

  it("does not mistake a name that starts with a dot for depth", () => {
    // `.env` has no other dotted rows around it, so it is text (see the dialect
    // threshold below), and a lone dot never wins the dominant-kind vote.
    expect(depthsOf(["`.env`", "plain", "another"])).toEqual([0, 0, 0]);
  });

  it("needs a second dotted row before reading dots as a ladder", () => {
    expect(depthsOf(["..only", "plain", "another"])).toEqual([0, 0, 0]);
  });

  it("believes a single bullet row, which is unambiguous", () => {
    expect(depthsOf(["`customer`", "* `email`"])).toEqual([0, 1]);
  });
});

describe("depth: counted dialects rank, they do not divide", () => {
  it("assigns one level per dot when the step is 1", () => {
    expect(depthsOf([".cartCondition", "..criteriaList", "...entity"])).toEqual([1, 2, 3]);
  });

  it("keeps parent and child apart when one table mixes step 1 and step 2", () => {
    // Real shape from create-cart-promotion-api: `.` → `..` → `...` in one section,
    // 10 → 12 → 14 → 16 dots in another. An inferred unit of 2 would merge `.` and
    // `..`, which are parent and child. Ranking keeps every boundary.
    const depths = depthsOf([
      ".productCondition",
      "..criteriaList",
      "...entity",
      "..........productBasedCondition",
      "............type",
      "..............criteriaList",
      "................entity",
    ]);

    expect(depths).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(new Set(depths).size).toBe(7);
  });

  it("ranks dash runs the same way", () => {
    expect(depthsOf(["--a", "---b", "----c"])).toEqual([1, 2, 3]);
  });

  it("keeps the whole five-rung dash ladder from get-customer-details-v1api", () => {
    const ladder = ["-to", "--programId", "---linked_partner_program", "----upgrade_based_on", "-----tracker_name"];

    expect(depthsOf(ladder)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("depth: whitespace ladders snap to an inferred unit", () => {
  it("infers the unit of the real get-promotion-by-id ladder", () => {
    expect(inferIndentUnit([1, 3, 4, 5, 8, 12, 16, 20, 24])).toBe(4);
  });

  it("collapses the sloppy shallow rungs and steps the rest by four", () => {
    const ladder = [1, 3, 4, 5, 8, 12, 16, 20, 24].map((width) => `${NBSP.repeat(width)}• name`);

    expect(depthsOf(ladder)).toEqual([1, 1, 1, 1, 2, 3, 4, 5, 6]);
  });

  it("handles the connectedorgs ladder of 1/4/8/12", () => {
    const ladder = [1, 4, 8, 12].map((width) => `${NBSP.repeat(width)}**id**`);

    expect(depthsOf(ladder)).toEqual([1, 1, 2, 3]);
  });

  it("falls back to a unit of one when no larger step fits", () => {
    expect(inferIndentUnit([1, 2, 3])).toBe(1);
  });
});

describe("the depth marker becomes indentation, and the name is untouched", () => {
  const table = (...first: string[]) =>
    ["| Field | Type |", "| --- | --- |", ...first.map((f) => `| ${f} | String |`)].join("\n");

  it("puts the level in front of the name as em-spaces and a glyph, two per level", () => {
    const { mdx } = run(table("data", ".id", "..code"));

    expect(mdx).toContain(`${EM.repeat(2)}\u2022 id`);
    expect(mdx).toContain(`${EM.repeat(4)}\u25e6 code`);
  });

  it("steps the glyph down a level at a time", () => {
    const { mdx } = run(table("data", ".a", "..b", "...c"));

    expect(mdx).toContain(`${EM.repeat(2)}\u2022 a`);
    expect(mdx).toContain(`${EM.repeat(4)}\u25e6 b`);
    expect(mdx).toContain(`${EM.repeat(6)}\u25aa c`);
  });

  it("clamps the glyph past level 3 while the indentation keeps widening", () => {
    const { mdx } = run(table("data", ".a", "..b", "...c", "....d", ".....e"));

    expect(mdx).toContain(`${EM.repeat(8)}\u25aa d`);
    expect(mdx).toContain(`${EM.repeat(10)}\u25aa e`);
  });

  it("does the same for the dash dialect, which ReadMe already rendered as a glyph", () => {
    // The live create-promotion-for-ucc page shows `-- pointsPerCustomer` as an
    // indented `◦`, so this reproduces the page rather than reinterpreting it.
    const { mdx } = run(table("status", "-success", "--code"));

    expect(mdx).toContain(`${EM.repeat(2)}\u2022 success`);
    expect(mdx).toContain(`${EM.repeat(4)}\u25e6 code`);
    expect(mdx).not.toContain("-success");
  });

  it("never re-emits a bare `*`, which would open emphasis and eat the row", () => {
    const { mdx } = run(table("data", "* id", "* code"));

    expect(mdx).toContain(`${EM.repeat(2)}\u2022 id`);
    expect(mdx).not.toContain("* id");
  });

  it("leaves the name exactly as it was written, markup and all", () => {
    const { mdx } = run(table("`cart`", "..**items**", "..`total*`"));

    expect(mdx).toContain("**items**");
    expect(mdx).toContain("`total*`");
  });

  it("keeps dots that sit inside a name, not just in front of it", () => {
    const { mdx } = run(table("data", ".richContentRO..*", ".other"));

    expect(mdx).toContain("richContentRO..");
  });

  it("ranks the levels rather than counting the marks, so a step of 2 is one level", () => {
    const { mdx } = run(table("data", "..id", "....code"));

    expect(mdx).toContain(`${EM.repeat(2)}\u2022 id`);
    expect(mdx).toContain(`${EM.repeat(4)}\u25e6 code`);
  });

  it("uses the raw count as the scale when a table mixes two markers", () => {
    // create-promotion-for-ucc: `* limits` is level 1 and `-- pointsPerCustomer`
    // level 2, so the dash ladder has to start at 2 rather than at 1.
    const { mdx } = run(
      table("promotion", "* limits", "-- pointsPerCustomer", "-- totalPoints", "* restrictions"),
    );

    expect(mdx).toContain(`${EM.repeat(2)}\u2022 limits`);
    expect(mdx).toContain(`${EM.repeat(4)}\u25e6 pointsPerCustomer`);
    expect(mdx).toContain(`${EM.repeat(4)}\u25e6 totalPoints`);
  });

  it("keeps two markers on the same level together", () => {
    // The other table on that page: `-code` and `* id` are both level 1, under
    // different parents. Stacking the dialects would push the stars down a level.
    const { mdx } = run(table("status", "-code", "-message", "data", "* id", "* name"));

    expect(mdx).toContain(`${EM.repeat(2)}\u2022 code`);
    expect(mdx).toContain(`${EM.repeat(2)}\u2022 id`);
  });

  it("reports the levels, since the marker the writer typed is gone from the output", () => {
    const { notes } = run(table("data", ".id", "..code"));

    expect(notes.some((note) => note.detail.includes("2 levels deep"))).toBe(true);
  });

  it("flags a row that drops more than one level, which has no parent above it", () => {
    const { notes } = run(table("data", ".a", "..b", "other", "..d"));

    expect(notes.some((note) => note.detail.includes("more than one level"))).toBe(true);
  });

  it("is idempotent", () => {
    const once = run(table("data", ".id", "..code")).mdx;

    expect(run(once).mdx).toBe(once);
  });
});

describe("a marker below the threshold is part of the name", () => {
  it("keeps the dots when one row is the only dotted row", () => {
    // One dotted row is not a ladder — it is `.env`. Stripping the dots and putting
    // no indentation in their place deletes characters and shows nothing in return.
    const { mdx } = run("| Field | Type |\n| --- | --- |\n| data | Array |\n| ..id | String |");

    expect(mdx).toContain("..id");
  });

  it("keeps a lone leading dash for the same reason", () => {
    const { mdx } = run("| Field | Type |\n| --- | --- |\n| to | Object |\n| -programId | Number |");

    expect(mdx).toContain("-programId");
  });

  it("never leaves a name shorter than the one that was authored", () => {
    for (const cell of ["..id", "-programId", "`.env`"]) {
      const { mdx } = run(`| Field |\n| --- |\n| plain |\n| ${cell} |\n| another |`);

      expect(mdx).toContain(cell);
    }
  });

  it("flags it, since a table that mixes two markers looks exactly the same here", () => {
    const { notes } = run("| Field | Type |\n| --- | --- |\n| data | Array |\n| ..id | String |");

    expect(notes.some((note) => note.level === "flag" && note.detail.includes("as text"))).toBe(true);
  });

  it("converts the same marker once a second row proves it is a ladder", () => {
    const { mdx } = run(
      "| Field | Type |\n| --- | --- |\n| data | Array |\n| ..id | String |\n| ..orgId | Number |",
    );

    expect(mdx).toContain(`${EM.repeat(2)}\u2022 id`);
    expect(mdx).not.toContain("..id");
  });
});

describe("cells", () => {
  const cellOf = (markdown: string) => {
    const { tree } = parseMarkdown(markdown);
    return flattenCell(tree.children);
  };

  it("replaces a <br> with a bullet separator, never a <br>", () => {
    const text = cellOf("Content-Type: application/json<br />X-CAP-API-AUTH-ORG-ID: 12345");

    expect(text).toBe("• Content-Type: application/json • X-CAP-API-AUTH-ORG-ID: 12345");
    expect(text).not.toContain("<br");
  });

  it("joins multiple paragraphs with the same separator", () => {
    expect(cellOf("First statement.\n\nSecond statement.")).toBe(
      "• First statement. • Second statement.",
    );
  });

  it("unwraps <Anchor> to a markdown link", () => {
    expect(cellOf(`<Anchor href="/docs/x">Super Admins</Anchor>`)).toBe("[Super Admins](/docs/x)");
  });

  it("unwraps <Glossary> to its bare term", () => {
    expect(cellOf("<Glossary>Block</Glossary> is the unit")).toBe("Block is the unit");
  });

  it("keeps inline code, and leaves escaping to the writer", () => {
    // The parser consumes `\_`, and remark-stringify re-adds it when the cell is
    // written — see the pipeline assertion in the <Table> block below.
    expect(cellOf("`api_key` and ERR\\_LOYALTY\\_BILL")).toBe("`api_key` and ERR_LOYALTY_BILL");
  });

  it("keeps a <code> cell as inline code rather than flattening it to text", () => {
    expect(cellOf("<code>limit</code>")).toBe("`limit`");
  });

  it("keeps <kbd> as itself, since backticks would say something different", () => {
    expect(cellOf("<kbd>Ctrl+C</kbd>")).toBe("<kbd>Ctrl+C</kbd>");
  });

  it("strips an escaped \\<br>, which arrives as literal text", () => {
    expect(cellOf("one \\<br>two")).toBe("• one • two");
  });

  it("collapses a newline rather than breaking the row", () => {
    expect(cellOf("one\ntwo")).toBe("one two");
  });
});

describe("<Table> JSX -> pipe table", () => {
  const JSX = `<Table align={["left","center",null]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Problem
      </th>

      <th>
        Probable cause
      </th>

      <th>
        Fix
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        631 ERR\\_LOYALTY\\_BILL\\_AMOUNT\\_NEGATIVE
      </td>

      <td>
        Transaction amount cannot be negative
      </td>

      <td>
        Send a positive amount
      </td>
    </tr>
  </tbody>
</Table>`;

  it("emits a pipe table and never a <Table> tag", () => {
    const { mdx } = run(JSX);

    expect(mdx).not.toContain("<Table");
    expect(mdx).not.toContain("<thead");
    expect(mdx.split("\n")[0]).toMatch(/^\|\s*Problem\s*\|/);
  });

  it("turns the align array into the delimiter row", () => {
    const delimiter = run(JSX).mdx.split("\n")[1] ?? "";

    expect(delimiter).toContain(":-");
    expect(delimiter).toMatch(/:-+:/);
  });

  it("drops per-cell textAlign, which a pipe table cannot express", () => {
    expect(run(JSX).mdx).not.toContain("textAlign");
  });

  it("keeps the escaped identifiers a cell carried", () => {
    expect(run(JSX).mdx).toContain("ERR\\_LOYALTY\\_BILL\\_AMOUNT\\_NEGATIVE");
  });

  it("emits inline markup as syntax, not as escaped literals", () => {
    const source = [
      "| Field | Description |",
      "| --- | --- |",
      "| `limit*` | See **the guide** at [docs](/docs/x) |",
    ].join("\n");
    const { mdx } = run(source);

    expect(mdx).toContain("`limit*`");
    expect(mdx).toContain("**the guide**");
    expect(mdx).toContain("[docs](/docs/x)");
    expect(mdx).not.toContain("\\`");
  });

  it("still escapes bare markdown characters in plain text", () => {
    const source = ["| a | b |", "| - | - |", "| ERR_LOYALTY_BILL | x |"].join("\n");

    expect(run(source).mdx).toContain("ERR\\_LOYALTY\\_BILL");
  });

  it("collapses the multi-line cell indentation", () => {
    expect(run(JSX).mdx.split("\n")).toHaveLength(3);
  });
});

describe("header resolution", () => {
  it("promotes a bold first body row when the header is empty", () => {
    const source = [
      "|          |                   |            |",
      "| -------- | ----------------- | ---------- |",
      "| **Code** | **Currency Name** | **Symbol** |",
      "| ALL      | Albanian lek      | L          |",
      "|          | Alderney pound    | £          |",
    ].join("\n");
    const { mdx, notes } = run(source);
    const lines = mdx.split("\n");

    expect(lines[0]).toContain("Code");
    expect(lines[0]).not.toContain("**");
    expect(notes.some((note) => note.detail.includes("promoted the bold first body row"))).toBe(true);
    // The genuinely empty Alderney code cell is data, not an artefact.
    expect(mdx).toContain("Alderney pound");
    expect(lines).toHaveLength(4);
  });

  it("blocks when the header is empty and the first row is not bold", () => {
    const source = ["|     |     |", "| --- | --- |", "| a   | b   |"].join("\n");

    expect(
      run(source).notes.some(
        (note) => note.level === "blocker" && note.detail.includes("user's call"),
      ),
    ).toBe(true);
  });

  it("flags a ragged row", () => {
    const source = ["| a | b | c |", "| - | - | - |", "| 1 | 2 |"].join("\n");

    expect(run(source).notes.some((note) => note.detail.includes("ragged"))).toBe(true);
  });
});

describe("against the real corpus pages", () => {
  const fixture = (name: string) =>
    readFileSync(join(__dirname, "fixtures", "tables", `${name}.md`), "utf8");

  const PAGES = [
    "create-cart-promotion-api", // dot dialect, 320 rows, mixed step
    "get-promotion-by-id", // NBSP ladder to 24, inside <Table> JSX
    "connectedorgs-get-associated-target-groups-of-a-user", // NBSP 1/4/8/12
    "get-customer-details-v1api", // dash dialect, runs of 1-5 inside <Table> JSX
  ];

  for (const name of PAGES) {
    describe(name, () => {
      const { mdx, notes } = run(fixture(name));

      it("leaves no <Table> tag behind", () => {
        expect(mdx).not.toContain("<Table");
      });

      it("leaves no <br> in any table row", () => {
        const rows = mdx.split("\n").filter((line) => line.startsWith("|"));

        expect(rows.length).toBeGreaterThan(0);
        expect(rows.join("\n")).not.toMatch(/<br\s*\/?>/i);
      });

      it("still compiles as MDX", () => {
        expect(parseMarkdown(mdx).mode).toBe("mdx");
      });

      it("puts em-spaces in the first column only", () => {
        for (const line of mdx.split("\n")) {
          if (!line.startsWith("|") || !line.includes(EM)) continue;
          const cells = line.split("|").slice(1, -1);
          for (const [index, text] of cells.entries()) {
            if (index === 0) continue;
            expect(text).not.toContain(EM);
          }
        }
      });

      it("reports the rebuild when there was one", () => {
        const rebuilt = notes.some((note) => note.detail.includes("-> pipe table"));

        expect(rebuilt).toBe(fixture(name).includes("<Table"));
      });
    });
  }

  /** Every distinct leading run of `char` in the first column, source or output. */
  const ladder = (text: string, char: string): Set<number> => {
    const widths = new Set<number>();
    for (const line of text.split("\n")) {
      if (!line.startsWith("|")) continue;
      const first = (line.split("|")[1] ?? "").replace(/^ /, "");
      let width = 0;
      while (first[width] === char) width += 1;
      if (width > 0) widths.add(width);
    }
    return widths;
  };

  it("gives the deep dot ladder one level per distinct dot count", () => {
    const source = fixture("create-cart-promotion-api");
    const { mdx } = run(source);

    // 11 distinct dot counts in the source, across several tables. Depth is ranked
    // per table, so two tables can share a level — what must hold is that no level
    // is lost inside a table and that no dot survives into the output.
    expect(ladder(mdx, EM).size).toBeGreaterThanOrEqual(8);
    expect(ladder(source, ".").size).toBeGreaterThanOrEqual(ladder(mdx, EM).size);
    expect(ladder(mdx, ".").size).toBe(0);
  });

  it("indents by exactly two em-spaces per level", () => {
    const widths = [...ladder(run(fixture("create-cart-promotion-api")).mdx, EM)];

    expect(widths.every((width) => width % 2 === 0)).toBe(true);
    expect(Math.min(...widths)).toBe(2);
  });

  it("collapses the NBSP ladder to the levels it means, not the widths it used", () => {
    // This page indents by NBSP runs of 1, 3, 4, 5, 8, 12, 16, 20 and 24 inside
    // <Table> JSX. The 1/3/4/5 rows are one author eyeballing one level.
    const { mdx } = run(fixture("get-promotion-by-id"));

    expect([...ladder(mdx, EM)].sort((a, b) => a - b)).toEqual([2, 4, 6, 8, 10, 12]);
    expect(ladder(mdx, NBSP).size).toBe(0);
  });

  it("carries no NBSP into the output, since only em-space survives the renderer", () => {
    const { mdx } = run(fixture("connectedorgs-get-associated-target-groups-of-a-user"));

    expect(ladder(mdx, EM).size).toBeGreaterThan(0);
    expect(ladder(mdx, NBSP).size).toBe(0);
  });
});
