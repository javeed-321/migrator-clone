import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import {
  assignDepths,
  convertTables,
  flattenCell,
  indentCell,
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

describe("depth: rendering", () => {
  it("emits two em-spaces per level, with a glyph", () => {
    expect(indentCell("`email`", 1)).toBe(`${EM}${EM}• \`email\``);
    expect(indentCell("`domain`", 2)).toBe(`${EM.repeat(4)}◦ \`domain\``);
    expect(indentCell("`tld`", 3)).toBe(`${EM.repeat(6)}▪ \`tld\``);
  });

  it("keeps widening past level 3 while clamping the glyph", () => {
    expect(indentCell("x", 5)).toBe(`${EM.repeat(10)}▪ x`);
  });

  it("leaves a top-level name untouched", () => {
    expect(indentCell("`customerId`", 0)).toBe("`customerId`");
  });

  it("uses em-space, never ASCII space or NBSP", () => {
    const rendered = indentCell("x", 2);

    expect(rendered.startsWith(EM)).toBe(true);
    expect(rendered).not.toContain(NBSP);
    expect(rendered.startsWith(" ")).toBe(false);
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

      it("reports what it did", () => {
        expect(notes.length).toBeGreaterThan(0);
      });
    });
  }

  it("encodes the deep dot ladder without losing a level", () => {
    const { mdx } = run(fixture("create-cart-promotion-api"));
    const depths = new Set<number>();

    for (const line of mdx.split("\n")) {
      if (!line.startsWith("|")) continue;
      const first = line.split("|")[1] ?? "";
      const run_ = /^( *)/.exec(first.replace(/^ /, ""))?.[1] ?? "";
      if (run_.length > 0) depths.add(run_.length / 2);
    }

    // The source uses 11 distinct dot counts; every one keeps its own level.
    expect(depths.size).toBeGreaterThanOrEqual(8);
    expect(Math.min(...depths)).toBe(1);
  });

  it("collapses the NBSP ladder to six levels, not nine", () => {
    const { mdx } = run(fixture("get-promotion-by-id"));
    const depths = new Set<number>();

    for (const line of mdx.split("\n")) {
      if (!line.startsWith("|")) continue;
      const first = line.split("|")[1] ?? "";
      const run_ = /^( *)/.exec(first.replace(/^ /, ""))?.[1] ?? "";
      if (run_.length > 0) depths.add(run_.length / 2);
    }

    expect([...depths].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("carries no NBSP indentation into the output", () => {
    const { mdx } = run(fixture("connectedorgs-get-associated-target-groups-of-a-user"));

    for (const line of mdx.split("\n")) {
      if (!line.startsWith("|")) continue;
      const first = (line.split("|")[1] ?? "").replace(/^ /, "");
      expect(first.startsWith(NBSP)).toBe(false);
    }
  });
});
