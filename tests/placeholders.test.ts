import { describe, expect, it } from "vitest";

import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { convertPlaceholders } from "../src/convert/placeholders";
import { convertReadmeMarkdown } from "../src/convert/run";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertPlaceholders(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

describe("3.3 the two shapes a placeholder arrives in", () => {
  it("wraps one the parser read as a tag, which would otherwise reach the output raw", () => {
    expect(run("Pass the <String> value.").mdx).toBe("Pass the `<String>` value.");
  });

  it("wraps one the parser left as text, which would otherwise be escaped", () => {
    expect(run("Set <YOUR_ACCOUNT_ID> in the header.").mdx).toBe(
      "Set `<YOUR_ACCOUNT_ID>` in the header.",
    );
  });

  it("gives both the same output on one line", () => {
    const { mdx } = run("Pass the <String> value and set <YOUR_ACCOUNT_ID> in the header.");

    expect(mdx).toBe("Pass the `<String>` value and set `<YOUR_ACCOUNT_ID>` in the header.");
    expect(mdx).not.toContain("\\<");
  });

  it("handles a placeholder with spaces in it", () => {
    expect(run("Use <Alternate Currency Name> here.").mdx).toBe(
      "Use `<Alternate Currency Name>` here.",
    );
  });

  it("wraps several on one line", () => {
    const { mdx } = run("Send <Map> or <List> to <YOUR_BASE_URL>.");

    expect(mdx).toBe("Send `<Map>` or `<List>` to `<YOUR_BASE_URL>`.");
  });

  it("keeps the surrounding sentence intact", () => {
    expect(run("A <Selection> is required.").mdx).toBe("A `<Selection>` is required.");
  });
});

describe("3.3 where it reaches", () => {
  it("reaches a heading", () => {
    expect(run("## Setting <YOUR_SSL_KEY>").mdx).toBe("## Setting `<YOUR_SSL_KEY>`");
  });

  it("reaches inside emphasis without breaking it", () => {
    expect(run("**Pass <String> here**").mdx).toBe("**Pass `<String>` here**");
  });

  it("reaches a table cell", () => {
    const source = "| Field | Type |\n| --- | --- |\n| id | <String> |";

    expect(run(source).mdx).toContain("`<String>`");
  });

  it("reaches one standing alone on its own line, which parses as a block", () => {
    expect(run("<String>").mdx).toBe("`<String>`");
  });

  it("reaches one between paragraphs", () => {
    expect(run("Intro.\n\n<String>\n\nOutro.").mdx).toBe("Intro.\n\n`<String>`\n\nOutro.");
  });

  it("reaches one that is the whole of a list item", () => {
    expect(run("- <String>").mdx).toBe("- `<String>`");
  });

  it("leaves everything inside a block of raw HTML alone", () => {
    for (const source of [
      "<div>Pass the <String> value.</div>",
      "<div>\n  Pass the <String> value.\n</div>",
      '<style>\n  .x::after { content: "<String>"; }\n</style>',
      '<script>\n  var t = "<String>";\n</script>',
    ]) {
      expect(run(source).notes).toHaveLength(0);
    }
  });

  it("leaves an indented code block alone", () => {
    expect(run("    <String> stays\n").notes).toHaveLength(0);
  });

  it("leaves an <HTMLBlock> expression alone", () => {
    const source = "<HTMLBlock>{`\n  <div>Pass <String></div>\n`}</HTMLBlock>";

    expect(run(source).notes).toHaveLength(0);
  });

  it("leaves a block of raw HTML to the pass that owns it", () => {
    // Opaque: the page is not valid MDX, so the whole block is one `html` node
    // that this pass never opens.
    const source = "<div>\n  Pass the <String> value.\n</div>";

    expect(run(source).notes).toHaveLength(0);
  });

  it("reaches a list item", () => {
    expect(run("- Pass <Map> to it").mdx).toBe("- Pass `<Map>` to it");
  });
});

describe("3.3 what it must never touch", () => {
  it("leaves a fenced code block completely alone", () => {
    const source = "```dart\nFuture<LoyaltyLogDto> fetch();\n```";

    expect(run(source).mdx).toBe(source);
  });

  it("leaves an XML sample in a fence alone", () => {
    const source = "```xml\n<intent-filter>\n  <item name=\"x\" />\n</intent-filter>\n```";

    expect(run(source).mdx).toBe(source);
  });

  it("leaves a placeholder that is already inline code alone", () => {
    const source = "Pass the `<String>` value.";

    expect(run(source).mdx).toBe(source);
    expect(run(source).notes).toHaveLength(0);
  });

  it("leaves a real component alone when the page actually closes it", () => {
    // A page that fell back to the plain parser: the element arrives as raw html,
    // but its closing tag proves it is an element and not prose.
    const source = "<Callout>\n\nBody with a <br> in it.\n\n</Callout>";

    expect(run(source).mdx).not.toContain("`<Callout>`");
  });

  it("wraps a component name used as prose, which nothing closes", () => {
    // Leaving this raw is what keeps the page from compiling — the exact failure
    // this pass exists to fix.
    expect(run("The <Callout> component takes a kind.").mdx).toBe(
      "The `<Callout>` component takes a kind.",
    );
  });

  it("leaves an unknown element that carries attributes alone", () => {
    // An `=` means attributes, which means it was written as an element. Only a
    // bare tag is a placeholder.
    const source = '<Marketplace kind="info">body</Marketplace>';

    expect(run(source).notes).toHaveLength(0);
  });

  it("wraps an unknown lowercase tag, whose text vanishes silently otherwise", () => {
    // `<my-thing>` compiles cleanly on the target and renders nothing — no error
    // anywhere, the word just is not on the page.
    expect(run("Pass the <my-thing> value.").mdx).toBe("Pass the `<my-thing>` value.");
  });

  it("wraps a name the tag grammar rejected outright", () => {
    expect(run("Send <ENTITY_ID> and <9X> and <_Private>.").mdx).toBe(
      "Send `<ENTITY_ID>` and `<9X>` and `<_Private>`.",
    );
  });

  it("leaves a real HTML element alone, which is another pass's problem", () => {
    // <span> is not here: it has no markdown equivalent and is stripped, which
    // the "wrappers with no markdown equivalent" tests cover.
    for (const tag of ["<br>", "<img>", "<div>", "<table>", "<summary>", "<iframe>"]) {
      expect(run(`Use ${tag} sparingly.`).notes).toHaveLength(0);
    }
  });

  it("tells <map> the element from <Map> the placeholder", () => {
    expect(run("A <map> element and a <Map> value.").mdx).toBe(
      "A <map> element and a `<Map>` value.",
    );
  });

  it("does not swallow a sentence from a stray angle bracket", () => {
    const source = "Set a < b and then compare c > d in the expression.";
    const { mdx, notes } = run(source);

    // The writer escapes a bare `<` on its own, which is correct MDX. What
    // matters here is that this pass claimed nothing.
    expect(notes).toHaveLength(0);
    expect(mdx).not.toContain("`");
    expect(mdx).toContain("compare c > d in the expression.");
  });

  it("leaves an autolink alone", () => {
    const source = "See <https://docs.example.com/x> for more.";

    expect(run(source).mdx).toContain("https://docs.example.com/x");
    expect(run(source).notes).toHaveLength(0);
  });
});

describe("3.3 inline <code> becomes markdown code", () => {
  it("unwraps the element, which fixes the placeholder inside it at the same time", () => {
    expect(run("Text <code>Pass <String> here</code> text.").mdx).toBe(
      "Text `Pass <String> here` text.",
    );
  });

  it("leaves no raw tag behind for the target to strip", () => {
    const { mdx } = run("Text <code>Pass <String> here</code> text.");

    expect(mdx).not.toContain("<code>");
    expect(mdx).not.toContain("</code>");
    expect(mdx).toContain("<String>");
  });

  it("handles one that holds nothing but a placeholder", () => {
    expect(run("Before <code><String></code> and after <String> too.").mdx).toBe(
      "Before `<String>` and after `<String>` too.",
    );
  });

  it("leaves <kbd> and <samp> as they were", () => {
    // Both are real HTML elements that render on the target, and backticks cannot
    // express "keyboard key" or "program output".
    const source = "Press <kbd>Ctrl</kbd> then <samp>done</samp>.";

    expect(run(source).mdx).toBe(source);
  });

  it("puts back an opening tag that is never closed, rather than swallowing it", () => {
    const { mdx } = run("Text <code>Pass here without a closer.");

    expect(mdx).toContain("Pass here without a closer.");
  });

  it("gives the same output whichever parser read the page", () => {
    // Valid MDX, so <code> is a parsed JSX node.
    expect(run("Text <code>Pass here</code> text.").mdx).toBe("Text `Pass here` text.");
    // Not valid MDX because of the placeholder, so <code> is raw text.
    expect(run("Text <code>Pass <String> here</code> text.").mdx).toBe(
      "Text `Pass <String> here` text.",
    );
  });

  it("is idempotent", () => {
    const once = run("Text <code>Pass <String> here</code> text.").mdx;

    expect(run(once).mdx).toBe(once);
  });
});

describe("3.3 wrappers with no markdown equivalent are stripped", () => {
  it("drops a <span>, keeping its words", () => {
    expect(run("Text <span>inner</span> text.").mdx).toBe("Text inner text.");
  });

  it("drops one carrying an inline style, which the target strips anyway", () => {
    expect(run('A <span style={{color: "red"}}>required</span> field.').mdx).toBe(
      "A required field.",
    );
  });

  it("keeps the markup inside it", () => {
    expect(run("Text <span>**bold** and `code`</span> text.").mdx).toBe(
      "Text **bold** and `code` text.",
    );
  });

  it("still converts a placeholder that was inside one", () => {
    expect(run("Text <span>pass <String></span> text.").mdx).toBe("Text pass `<String>` text.");
  });

  it("leaves no raw tag behind", () => {
    expect(run("Text <span>inner</span> text.").mdx).not.toContain("<span");
  });
});

describe("3.3 reporting and re-runs", () => {
  it("reports once per page, naming what it wrapped", () => {
    const { notes } = run("Pass <String> and <String> and <Map>.");

    expect(notes).toHaveLength(1);
    expect(notes[0]?.detail).toContain("3 tag-shaped tokens");
    expect(notes[0]?.detail).toContain("<String>");
    expect(notes[0]?.detail).toContain("<Map>");
  });

  it("says nothing on a page with none", () => {
    expect(run("An ordinary sentence.").notes).toHaveLength(0);
  });

  it("is idempotent", () => {
    const once = run("Pass the <String> value to <YOUR_BASE_URL>.").mdx;

    expect(run(once).mdx).toBe(once);
  });
});

describe("3.3 through the pipeline", () => {
  it("makes a page that would not build into one that does", async () => {
    const source = "Pass the <String> value and set <YOUR_ACCOUNT_ID> in the header.";
    const result = await convertReadmeMarkdown(source);

    expect(result.mdx.trim()).toBe(
      "Pass the `<String>` value and set `<YOUR_ACCOUNT_ID>` in the header.",
    );
    // The unclosed <String> is what forced the page onto the fallback parser.
    expect(result.parseMode).toBe("markdown");
    // And the output parses as strict MDX, which the input did not.
    expect(parseMarkdown(result.mdx).mode).toBe("mdx");
  });

  it("leaves the code samples on the same page alone", async () => {
    const source = "Pass <String>.\n\n```dart\nFuture<LoyaltyLogDto> fetch();\n```";
    const { mdx } = await convertReadmeMarkdown(source);

    expect(mdx).toContain("`<String>`");
    expect(mdx).toContain("Future<LoyaltyLogDto> fetch();");
    expect(mdx).not.toContain("`<LoyaltyLogDto>`");
  });
});
