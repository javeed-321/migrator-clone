import { describe, expect, it } from "vitest";

import { repairSource } from "../src/convert/repair";
import { convertReadmeMarkdown } from "../src/convert/run";
import { parseMarkdown } from "../src/download/parse";

const repair = (source: string) => repairSource(source).source;
/** The check that matters: does the strict parser accept it now? */
const compiles = (source: string) => parseMarkdown(source).mode === "mdx";

describe("repairing what makes a page fail the strict parser", () => {
  it("turns an autolink into a markdown link — 39 corpus pages fail on this alone", () => {
    const source = "See <https://eu.intouch.capillarytech.com> for details.";

    expect(compiles(source)).toBe(false);
    expect(repair(source)).toBe(
      "See [https://eu.intouch.capillarytech.com](https://eu.intouch.capillarytech.com) for details.",
    );
    expect(compiles(repair(source))).toBe(true);
  });

  it("turns an email autolink into a mailto link", () => {
    const source = "Contact <gateways@capillarytech.com> today.";

    expect(compiles(source)).toBe(false);
    expect(repair(source)).toContain("[gateways@capillarytech.com](mailto:gateways@capillarytech.com)");
    expect(compiles(repair(source))).toBe(true);
  });

  it("unwraps a link destination rather than nesting a link inside one", () => {
    const source = "Use [Customer](<https://docs.capillarytech.com/reference/c>) here.";

    expect(repair(source)).toBe("Use [Customer](https://docs.capillarytech.com/reference/c) here.");
    expect(compiles(repair(source))).toBe(true);
  });

  it("escapes comparison operators", () => {
    for (const source of [
      "Operators: <,>,<=,>=,==",
      "When currentTxns.value<6000 applies",
      "Banding (<5000, 5000-7000) applies",
      "Less than (<) is supported",
    ]) {
      expect(compiles(source)).toBe(false);
      expect(compiles(repair(source))).toBe(true);
    }
  });

  it("escapes a template placeholder that will not parse as an expression", () => {
    const source = "Use {{#var}} in the template.";

    expect(compiles(source)).toBe(false);
    expect(compiles(repair(source))).toBe(true);
  });

  it("escapes one that parses but would be evaluated rather than shown", () => {
    // `{{total_points}}` is a valid JS object literal, so it compiles — and then
    // renders as an object instead of the placeholder the writer meant.
    const source = "The tag {{total_points}} and ${DATABRICKS_HOST} are placeholders.";

    expect(repair(source)).toBe(
      "The tag \\{\\{total_points}} and $\\{DATABRICKS_HOST} are placeholders.",
    );
    expect(compiles(repair(source))).toBe(true);
  });

  it("reports what it repaired", () => {
    const { notes } = repairSource("See <https://x.test/a> now.");

    expect(notes).toHaveLength(1);
    expect(notes[0]?.rule).toBe("repair");
    expect(notes[0]?.detail).toContain("autolink");
  });
});

describe("what the repair must never touch", () => {
  it("leaves a single brace alone, which is how every JSX attribute is written", () => {
    const source = '<Table align={["left","left"]}>\n  <thead><tr><th>A</th></tr></thead>\n</Table>';

    expect(repair(source)).toBe(source);
    expect(compiles(repair(source))).toBe(true);
  });

  it("leaves a numeric JSX attribute alone", () => {
    const source = '<Image src="x" width={100} />';

    expect(repair(source)).toBe(source);
  });

  it("leaves a style object alone, which is a doubled brace but still JSX", () => {
    for (const source of [
      '<span style={{fontSize: "11pt"}}>What\u2019s New</span>',
      '<th style={{ textAlign: "left" }}>Attributes</th>',
    ]) {
      expect(repair(source)).toBe(source);
      expect(compiles(repair(source))).toBe(true);
    }
  });

  it("leaves a fenced code block byte for byte", () => {
    const source = "```js\nif (a < b) return <c>;\nconst t = `${x}`;\n```";

    expect(repair(source)).toBe(source);
  });

  it("leaves an inline code span alone", () => {
    const source = "Inline `a < b` and `<https://x.test/a>` stay.";

    expect(repair(source)).toBe(source);
  });

  it("leaves an indented code block alone", () => {
    const source = "Text.\n\n    if (a < b) return <c>;\n";

    expect(repair(source)).toBe(source);
  });

  it("leaves a real component alone", () => {
    const source = '<Callout kind="info">\n\nBody text.\n\n</Callout>';

    expect(repair(source)).toBe(source);
  });

  it("leaves an already-escaped angle bracket alone", () => {
    expect(repair("Use \\< here.")).toBe("Use \\< here.");
  });

  it("leaves a clean page untouched and says nothing", () => {
    const source = "## Heading\n\nA paragraph with `code` and a [link](/docs/x).";

    expect(repair(source)).toBe(source);
    expect(repairSource(source).notes).toHaveLength(0);
  });
});

describe("repairing through the pipeline", () => {
  it("lets the component passes run on a page that would otherwise fall back", async () => {
    // The autolink is the only thing wrong; without repair it costs the page its
    // Callout conversion as well.
    const source = [
      "See <https://docs.capillarytech.com/docs/x> for details.",
      "",
      '<Callout icon="📘" theme="info">',
      "  Note",
      "",
      "  Read this first.",
      "</Callout>",
    ].join("\n");

    const result = await convertReadmeMarkdown(source);

    expect(result.parseMode).toBe("mdx");
    expect(result.mdx).toContain('<Callout kind="info">');
    expect(result.mdx).not.toContain("theme=");
    expect(result.outputCompiles).toBe(true);
  });

  it("is idempotent", async () => {
    const source = "Compare a <b and see <https://x.test/a>.";
    const once = (await convertReadmeMarkdown(source)).mdx;

    expect((await convertReadmeMarkdown(once)).mdx).toBe(once);
  });
});

describe("closing tag at the end of a line", () => {
  // [CORPUS] this one shape cost 54 of the 62 pages that failed the strict parser.
  it("moves a trailing closing tag onto its own line", () => {
    const source = '<Callout icon="x" theme="info">\n  Note\n\nNegative values are ignored. </Callout>\n';

    expect(repairSource(source).source).toBe(
      '<Callout icon="x" theme="info">\n  Note\n\nNegative values are ignored.\n</Callout>\n',
    );
  });

  // An element written entirely on one line is inline, valid, and must be left be —
  // this is what separates the broken callouts from the 318 working <Anchor>s.
  it("leaves a one-line element alone", () => {
    const source = 'See the <Anchor href="/x">reference</Anchor> for details.\n';

    expect(repairSource(source).source).toBe(source);
  });

  it("leaves a closing tag that is already on its own line", () => {
    const source = "<Callout>\n  Text.\n</Callout>\n";

    expect(repairSource(source).source).toBe(source);
  });

  it("peels off more than one trailing closing tag", () => {
    const source = "text</Expandable></ExpandableGroup>\n";

    expect(repairSource(source).source).toBe("text\n</Expandable>\n</ExpandableGroup>\n");
  });

  it("does not touch a closing tag inside a code fence", () => {
    const source = "```mdx\nNote. </Callout>\n```\n";

    expect(repairSource(source).source).toBe(source);
  });
});
