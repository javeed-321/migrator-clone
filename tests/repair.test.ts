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

  /*
   * `<support@modulrfinance.com.>` — the sentence's full stop swept inside the
   * brackets. One page in the corpus, and it cost the whole page: the TLD had to
   * sit flush against the `>` to match, so the address survived, strict MDX read
   * `<s` as a tag and died on the `@`, and the fallback parser then gave the page
   * no component conversions at all.
   */
  it("repairs an email autolink with the sentence's punctuation inside the brackets", () => {
    const source = "Report it via <support@modulrfinance.com.>";

    expect(compiles(source)).toBe(false);
    // The full stop belongs to the sentence, not to the address.
    expect(repair(source)).toBe(
      "Report it via [support@modulrfinance.com](mailto:support@modulrfinance.com).",
    );
    expect(compiles(repair(source))).toBe(true);
  });

  it("still repairs a subdomained address, and a comma-terminated one", () => {
    expect(repair("Write to <a.b@mail.example.co.uk>.")).toContain(
      "[a.b@mail.example.co.uk](mailto:a.b@mail.example.co.uk)",
    );
    expect(repair("Either <one@x.com,> or <two@y.com;> works.")).toBe(
      "Either [one@x.com](mailto:one@x.com), or [two@y.com](mailto:two@y.com); works.",
    );
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

  /*
   * An indented code block cannot interrupt a paragraph — CommonMark renders a
   * four-space-indented line after prose as part of that prose. Masking on the
   * indent alone hid real text from every rule below, and hid exactly the text
   * most likely to need one: hand-written HTML, which authors indent.
   */
  it("does not mistake a paragraph's indented continuation for code", () => {
    const source = "Currently editable fields:\n    See <https://x.test/a> for more.\n";

    // No blank line above it, so this is prose and the autolink must be repaired.
    expect(repair(source)).toContain("[https://x.test/a](https://x.test/a)");
  });

  it("still treats an indented line after a heading as code", () => {
    // A heading is a leaf block: it closes, so what follows really is a block.
    const source = "# Title\n\n    if (a < b) return <c>;\n";

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

/*
 * MDX picks inline-vs-block JSX by what follows the opening tag. Text on the same
 * line makes the element inline, so it lives in a paragraph — and the block child
 * on the next line ends that paragraph while the element is still open. The markup
 * is well-formed HTML with every tag closed, and the page still will not parse.
 */
describe("text on a block tag's opening line", () => {
  const LIST = [
    "<ol>",
    "  <li>For all customer types: <b>externalReference</b> can be edited</li>",
    "  <li>For customers not requiring KYC: <b>industryCode</b> can be edited. Of those:",
    "    <ul>",
    "      <li>For all other types: <b>name</b> can be edited</li>",
    "    </ul>",
    "  </li>",
    "</ol>",
    "",
  ].join("\n");

  it("moves the text down a line so the element becomes block-level", () => {
    expect(compiles(LIST)).toBe(false);

    const repaired = repair(LIST);
    expect(compiles(repaired)).toBe(true);
    // The words are all still there, in order — markdown rejoins the two lines.
    expect(repaired).toContain("<li>\n  For customers not requiring KYC:");
  });

  it("leaves a list item that closes on its own line", () => {
    const source = "<ul>\n  <li>One</li>\n  <li>Two</li>\n</ul>\n";

    expect(repair(source)).toBe(source);
  });

  it("leaves a tag whose trailing content is another tag", () => {
    // `[CORPUS]` `<figure><span …>` and `<div class="…"><p>…</p>` both parse
    // already; splitting them would be churn on lines nobody needs changed.
    const source = '<div class="box"><p>Intro.</p>\n<ul>\n<li>One</li>\n</ul>\n</div>\n';

    expect(repair(source)).toBe(source);
  });
});

describe("HTML comments, which MDX does not have", () => {
  it("rewrites one into an MDX comment rather than deleting it", () => {
    const source = "Step one.\n\n<!-- java@16 -->\n\nStep two.\n";

    expect(compiles(source)).toBe(false);
    expect(repair(source)).toContain("{/* java@16 */}");
    expect(compiles(repair(source))).toBe(true);
  });

  it("neutralises a `*/` in the body, which would close the comment early", () => {
    const repaired = repair("<!-- see /* and */ here -->");

    expect(repaired).toBe("{/* see /* and *\\/ here */}");
    expect(compiles(repaired)).toBe(true);
  });

  it("leaves a comment inside a code fence as it was written", () => {
    const source = "```html\n<!-- a real example -->\n```\n";

    expect(repair(source)).toBe(source);
  });
});
