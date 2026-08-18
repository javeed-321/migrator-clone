import { describe, expect, it } from "vitest";

import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { convertReadmeMarkdown } from "../src/convert/run";
import { convertWrappers } from "../src/convert/wrappers";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertWrappers(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

describe("3.6 spacers are deleted", () => {
  it("removes an empty <p>, which was vertical padding", () => {
    expect(run("Before.\n\n<p></p>\n\nAfter.").mdx).toBe("Before.\n\nAfter.");
  });

  it("leaves no self-closed <p /> behind", () => {
    expect(run("Before.\n\n<p></p>\n\nAfter.").mdx).not.toContain("<p");
  });

  it("removes a paragraph left holding nothing", () => {
    expect(run("Before.\n\n<p>   </p>\n\nAfter.").mdx).toBe("Before.\n\nAfter.");
  });
});

describe("3.6 a <p> holding content is unwrapped, not deleted", () => {
  it("keeps the content", () => {
    expect(run("<p>Some content</p>").mdx).toBe("Some content");
  });

  it("keeps the markup inside it", () => {
    expect(run("<p>**bold** and `code`</p>").mdx).toBe("**bold** and `code`");
  });

  it("reports what it removed", () => {
    const { notes } = run("<p>Wrapped</p>");

    expect(notes.some((note) => note.rule === "wrapper" && note.detail.includes("<p>"))).toBe(true);
  });
});

describe("3.6 <div> is left exactly as authored", () => {
  it("keeps a styled one, tag and all", () => {
    const source = '<div style="margin-top: 20px">Wrapped content</div>';

    expect(run(source).mdx).toBe(source);
    expect(run(source).notes).toHaveLength(0);
  });

  it("keeps a multi-line one", () => {
    const { mdx } = run("<div>\n\n## Heading\n\nA paragraph.\n\n</div>");

    expect(mdx).toContain("<div>");
    expect(mdx).toContain("## Heading");
  });

  it("keeps the other containers too", () => {
    for (const tag of ["section", "article", "main", "header", "footer", "center"]) {
      expect(run(`<${tag}>Content</${tag}>`).notes).toHaveLength(0);
    }
  });

  it("still tidies a <p> nested inside one", () => {
    const { mdx } = run("<div>\n\n<p></p>\n\nContent.\n\n</div>");

    expect(mdx).toContain("<div>");
    expect(mdx).not.toContain("<p");
  });
});

describe("3.6 non-breaking spaces", () => {
  it("replaces padding with an ordinary space", () => {
    expect(run("Some text.  More text.").mdx).toBe("Some text. More text.");
  });

  it("leaves no invisible character behind", () => {
    expect(run("Some text.  More text.").mdx).not.toContain(" ");
  });

  it("reports the change, since an invisible character is invisible in a diff", () => {
    const { notes } = run("Some text. More text.");

    expect(notes.some((note) => note.detail.includes("non-breaking"))).toBe(true);
  });

  it("does not touch a table cell, where the spacing is the nesting", () => {
    const source = "| Field | Type |\n| --- | --- |\n|   `email` | string |";

    expect(run(source).mdx).toContain(" ");
  });
});

describe("3.6 what it leaves alone", () => {
  it("leaves a semantic container, which says something", () => {
    const source = "<figure>\n\nContent.\n\n</figure>";

    expect(run(source).notes).toHaveLength(0);
  });

  it("leaves an ordinary page untouched", () => {
    const source = "## Heading\n\nA paragraph with `code`.";

    expect(run(source).mdx).toBe(source);
    expect(run(source).notes).toHaveLength(0);
  });

  it("is idempotent", () => {
    const once = run('<div style="margin: 0">Wrapped content</div>').mdx;

    expect(run(once).mdx).toBe(once);
  });
});

describe("3.6 through the pipeline", () => {
  it("leaves no <p> tag or padding behind", async () => {
    const source = ["<p></p>", "", "Some text.  More text."].join("\n");

    const result = await convertReadmeMarkdown(source);

    expect(result.mdx).not.toMatch(/<p\b/);
    expect(result.mdx).not.toContain(" ");
    expect(result.mdx).toContain("Some text. More text.");
  });

  it("keeps the table indentation the table pass just created", async () => {
    const source = "| Field | Type |\n| --- | --- |\n|     `email` | string |";
    const { mdx } = await convertReadmeMarkdown(source);

    // The table pass encodes depth as em-spaces; nothing here may eat them.
    expect(mdx).toContain(" ");
  });
});
