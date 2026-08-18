import { describe, expect, it } from "vitest";

import { expandMagicBlocks } from "../src/convert/magic-blocks";
import { convertReadmeMarkdown } from "../src/convert/run";

const expand = (source: string) => expandMagicBlocks(source).source;
const notesFor = (source: string) => expandMagicBlocks(source).notes;
const blockers = (source: string) => notesFor(source).filter((note) => note.level === "blocker");

/** A block, written the way ReadMe wrote them. */
const block = (name: string, json: unknown) =>
  `[block:${name}]\n${JSON.stringify(json, null, 2)}\n[/block]`;

describe("2.7 expansion", () => {
  it("turns api-header into a markdown heading", () => {
    expect(expand(block("api-header", { title: "Section Title", level: 3 }))).toBe(
      "### Section Title",
    );
  });

  it("defaults a heading to H2 when the block gives no level", () => {
    expect(expand(block("api-header", { title: "Title" }))).toBe("## Title");
  });

  it("turns callout into <Callout>, with the title as its first child", () => {
    const out = expand(
      block("callout", { type: "info", title: "Heads up", body: "Read this first." }),
    );

    expect(out).toContain('<Callout theme="info">');
    expect(out).toContain("Heads up");
    expect(out).toContain("Read this first.");
  });

  it("maps the legacy callout types onto modern themes", () => {
    expect(expand(block("callout", { type: "warning", body: "x" }))).toContain('theme="warn"');
    expect(expand(block("callout", { type: "danger", body: "x" }))).toContain('theme="error"');
    expect(expand(block("callout", { type: "success", body: "x" }))).toContain('theme="okay"');
  });

  it("reads the array form of type", () => {
    expect(expand(block("callout", { type: ["warning", "x"], body: "y" }))).toContain(
      'theme="warn"',
    );
  });

  it("turns code into adjacent fences, which is how ReadMe spells a tab group", () => {
    const out = expand(
      block("code", {
        codes: [
          { code: "fetch('/api');", language: "js", name: "JavaScript" },
          { code: "requests.get('/api')", language: "python", name: "Python" },
        ],
      }),
    );

    expect(out).toContain("```js JavaScript");
    expect(out).toContain("```python Python");
    // No blank line between them, or they are not a group.
    expect(out).toContain("```\n```python");
  });

  it("turns image into <Image src alt>, dropping the presentation attributes", () => {
    const out = expand(
      block("image", {
        images: [{ image: ["https://files.readme.io/a.png", "a.png", 800], caption: "A flow chart", border: true, sizing: "smart" }],
      }),
    );

    expect(out).toBe('<Image src="https://files.readme.io/a.png" alt="A flow chart" />');
    expect(out).not.toContain("border");
    expect(out).not.toContain("smart");
  });

  it("turns embed into <Embed>, which the embed rule then routes", () => {
    const out = expand(block("embed", { url: "https://youtu.be/abc", title: "Demo" }));

    expect(out).toContain("<Embed");
    expect(out).toContain('url="https://youtu.be/abc"');
  });

  it("turns parameters into a pipe table", () => {
    const out = expand(
      block("parameters", {
        cols: 2,
        rows: 2,
        data: {
          "h-0": "Field",
          "h-1": "Type",
          "0-0": "customerId",
          "0-1": "string",
          "1-0": "email",
          "1-1": "string",
        },
      }),
    );

    expect(out.split("\n")).toEqual([
      "| Field | Type |",
      "| --- | --- |",
      "| customerId | string |",
      "| email | string |",
    ]);
  });

  it("honours the align array", () => {
    const out = expand(
      block("parameters", { cols: 2, rows: 0, data: { "h-0": "a", "h-1": "b" }, align: ["left", "center"] }),
    );

    expect(out).toContain("| :--- | :---: |");
  });

  it("keeps a missing cell as an empty cell, not a short row", () => {
    const out = expand(
      block("parameters", { cols: 3, rows: 1, data: { "h-0": "a", "0-0": "x", "0-2": "z" } }),
    );

    expect(out.split("\n")[2]).toBe("| x |  | z |");
  });

  it("accepts the table alias", () => {
    expect(expand(block("table", { cols: 1, rows: 1, data: { "h-0": "A", "0-0": "b" } }))).toContain(
      "| A |",
    );
  });
});

describe("2.7 blocks that still need a person", () => {
  it("parks html in a fenced block and blocks", () => {
    const source = block("html", { html: "<div style='x'>KPI</div>" });

    expect(expand(source)).toContain("```html");
    expect(expand(source)).toContain("KPI");
    expect(blockers(source).some((note) => note.detail.includes("no target component"))).toBe(true);
  });

  it("blocks a recipe, whose steps are not in the file", () => {
    const source = block("recipe", { slug: "create-a-reward", title: "Create a reward" });

    expect(expand(source)).toContain("<Recipe");
    expect(blockers(source).some((note) => note.detail.includes("ReadMe dashboard"))).toBe(true);
  });

  it("treats tutorial-tile as the same thing", () => {
    expect(expand(block("tutorial-tile", { slug: "x" }))).toContain("<Recipe");
  });
});

describe("2.7 bad input is left alone", () => {
  it("keeps a block whose JSON will not parse, and blocks", () => {
    const source = "[block:callout]\n{ not json }\n[/block]";

    expect(expand(source)).toBe(source);
    expect(blockers(source).some((note) => note.detail.includes("cannot read"))).toBe(true);
  });

  it("keeps an unknown block type", () => {
    const source = block("mystery", { a: 1 });

    expect(expand(source)).toBe(source);
    expect(blockers(source).some((note) => note.detail.includes("not a known magic block"))).toBe(
      true,
    );
  });

  it("leaves a page with no magic blocks untouched", () => {
    const source = "# Title\n\nJust prose.";

    expect(expand(source)).toBe(source);
    expect(notesFor(source)).toHaveLength(0);
  });

  it("expands several blocks on one page, and reports each", () => {
    const source = `${block("api-header", { title: "One" })}\n\n${block("api-header", { title: "Two" })}`;

    expect(expand(source)).toBe("## One\n\n## Two");
    expect(notesFor(source)).toHaveLength(2);
  });

  it("records the line each block sat on", () => {
    const source = `Intro paragraph.\n\n${block("api-header", { title: "One" })}`;

    expect(notesFor(source)[0]?.line).toBe(3);
  });
});

describe("2.7 through the pipeline", () => {
  it("hands each expanded block to the rule that owns it", () => {
    const source = [
      block("callout", { type: "warning", title: "Careful", body: "This is destructive." }),
      block("code", {
        codes: [
          { code: "curl https://api.example.com", language: "curl", name: "Sample request" },
          { code: '{ "ok": true }', language: "json", name: "Sample response" },
        ],
      }),
      block("parameters", { cols: 2, rows: 1, data: { "h-0": "Field", "h-1": "Type", "0-0": "id", "0-1": "string" } }),
    ].join("\n\n");

    const { mdx, notes } = convertReadmeMarkdown(source);

    // The Callout rule mapped the theme the expander produced.
    expect(mdx).toContain('<Callout kind="alert">');
    expect(mdx).toContain("**Careful**");
    // The CodeGroup rule collapsed the adjacent fences.
    expect(mdx).toContain('<CodeGroup tabs="Sample request,Sample response">');
    // The table rule normalised the grid.
    expect(mdx).toMatch(/\|\s*Field\s*\|\s*Type\s*\|/); // the writer pads cells to align them
    expect(mdx).not.toContain("[block:");
    expect(notes.some((note) => note.rule === "magic-block")).toBe(true);
  });
});
