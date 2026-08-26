import { describe, expect, it } from "vitest";

import { convertBreaks } from "../src/convert/breaks";
import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { convertReadmeMarkdown } from "../src/convert/run";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertBreaks(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

describe("3.6 every spelling goes", () => {
  it("removes the unclosed form, which is a build failure on the target", async () => {
    expect(run("One<br>Two").mdx).not.toContain("<br");
  });

  it("removes the self-closed forms too", async () => {
    expect(run("One<br/>Two").mdx).not.toContain("<br");
    expect(run("One<br />Two").mdx).not.toContain("<br");
  });

  it("removes the escaped form, which renders as visible literal text", async () => {
    const { mdx } = run("One \\<br> Two");

    expect(mdx).not.toContain("<br");
    expect(mdx).not.toContain("br>");
  });

  it("removes a <BR> written in capitals", async () => {
    expect(run("One<BR>Two").mdx).not.toContain("BR");
  });
});

describe("3.6 nothing takes its place", () => {
  it("keeps one paragraph — no new line, no blank line", async () => {
    expect(run("First line.<br />Second line.").mdx).toBe("First line. Second line.");
  });

  it("collapses a run of breaks to a single space", async () => {
    expect(run("First line.<br /><br /><br />Second line.").mdx).toBe("First line. Second line.");
  });

  it("does not double the space when one was already there", async () => {
    expect(run("First line. <br /> Second line.").mdx).toBe("First line. Second line.");
  });

  it("keeps the words apart rather than colliding them", async () => {
    expect(run("alpha<br />beta").mdx).toBe("alpha beta");
  });

  it("removes a trailing break without leaving a space behind", async () => {
    expect(run("Only line.<br />").mdx).toBe("Only line.");
  });

  it("removes a leading break", async () => {
    expect(run("<br />Only line.").mdx).toBe("Only line.");
  });

  it("removes a break standing alone between blocks, and adds nothing", async () => {
    expect(run("## Heading\n\n<br />\n\nA paragraph.").mdx).toBe("## Heading\n\nA paragraph.");
  });

  it("drops a paragraph that held nothing but breaks", async () => {
    expect(run("Before.\n\n<br /><br />\n\nAfter.").mdx).toBe("Before.\n\nAfter.");
  });

  it("joins a heading rather than splitting it", async () => {
    expect(run("## Rate limits<br />and quotas").mdx).toBe("## Rate limits and quotas");
  });

  it("keeps surrounding inline markup intact", async () => {
    const { mdx } = run("See **the guide**.<br />Then [sign in](/login).");

    expect(mdx).toBe("See **the guide**. Then [sign in](/login).");
  });
});

describe("3.6 where it reaches", () => {
  it("strips a break inside a list item, keeping one line", async () => {
    expect(run("- Install the CLI.<br />Then run it.").mdx).toBe("- Install the CLI. Then run it.");
  });

  it("strips a break inside a component", async () => {
    const { mdx } = run('<Callout kind="info">\n\nOne.<br />Two.\n\n</Callout>');

    expect(mdx).not.toContain("<br");
    expect(mdx).toContain("One. Two.");
  });

  it("strips a break nested inside emphasis without breaking the emphasis", async () => {
    expect(run("**bold<br />text**").mdx).toBe("**bold text**");
  });

  it("strips a break inside a blockquote", async () => {
    expect(run("> One.<br />Two.").mdx).toBe("> One. Two.");
  });

  it("reports what it removed", async () => {
    const { notes } = run("One.<br />Two.");

    expect(notes).toHaveLength(1);
    expect(notes[0]?.rule).toBe("break");
    expect(notes[0]?.detail).toContain("removed 1 <br>");
  });

  it("leaves a page with no breaks untouched", async () => {
    const source = "## Heading\n\nA paragraph with `code` in it.";

    expect(run(source).mdx).toBe(source);
    expect(run(source).notes).toHaveLength(0);
  });

  it("does not touch a <br> written inside a fenced code block", async () => {
    const source = "```html\n<p>a<br>b</p>\n```";

    expect(run(source).mdx).toBe(source);
  });
});

describe("3.6 through the pipeline", () => {
  it("leaves no <br> anywhere on a page that mixes the spellings", async () => {
    const source = [
      "# Rate limits",
      "",
      "Requests are capped.<br>Bursts are smoothed.",
      "",
      "| Plan | Limit |",
      "| --- | --- |",
      "| Free | 100<br />per minute |",
      "",
      "<br /><br />",
      "",
      "Contact support \\<br> for an increase.",
    ].join("\n");

    const result = await convertReadmeMarkdown(source, { title: "Rate limits" });

    expect(result.mdx).not.toMatch(/<br/i);
    expect(result.mdx).toContain("Requests are capped. Bursts are smoothed.");
    // The unclosed `<br>` used to force the page onto the fallback parser, which
    // cost it every component conversion. The repair pass self-closes void
    // elements now, so the page reaches the strict parser intact.
    expect(result.parseMode).toBe("mdx");
  });

  it("leaves the table pass to handle its own cells", async () => {
    const source = "| Plan | Limit |\n| --- | --- |\n| Free | 100<br />per minute |";

    expect((await convertReadmeMarkdown(source)).mdx).toContain("•");
  });

  it("is idempotent", async () => {
    const once = (await convertReadmeMarkdown("One.<br>Two.<br><br>Three.")).mdx;

    expect((await convertReadmeMarkdown(once)).mdx).toBe(once);
  });
});
