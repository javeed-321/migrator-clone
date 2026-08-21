import { describe, expect, it } from "vitest";

import { inlineStyle, parseCss, resolveVars } from "../src/convert/html-block/css";
import { convertReadmeMarkdown } from "../src/convert/run";
import type { ConversionNote } from "../src/convert/mdast";

const block = (html: string) => `<HTMLBlock>{\`\n${html}\n\`}</HTMLBlock>\n`;

const blockNotes = (notes: ConversionNote[]) => notes.filter((note) => note.rule === "html-block");

describe("the CSS engine", () => {
  it("resolves a var from :root, because the :root is about to be deleted", () => {
    const sheet = parseCss(`:root { --bg: #F9F9F9; } .tile { background: var(--bg); }`);
    expect(sheet.variables.get("--bg")).toBe("#F9F9F9");
    expect(
      inlineStyle({ tag: "div", classes: ["tile"], attrs: new Map() }, [], sheet),
    ).toBe("background: #F9F9F9");
  });

  it("falls back to the var's own default when :root never defined it", () => {
    expect(resolveVars("var(--missing, 12px)", new Map())).toBe("12px");
  });

  it("matches a descendant selector against an ancestor, not just a parent", () => {
    const sheet = parseCss(`.tile a { color: red; }`);
    const link = { tag: "a", classes: [], attrs: new Map() };
    const tile = { tag: "div", classes: ["tile"], attrs: new Map() };
    const between = { tag: "span", classes: [], attrs: new Map() };

    expect(inlineStyle(link, [tile, between], sheet)).toBe("color: red");
    expect(inlineStyle(link, [between], sheet)).toBeUndefined();
  });

  it("lets the more specific rule win, and source order break a tie", () => {
    const sheet = parseCss(`div { color: red; } .tile { color: blue; } .tile { color: green; }`);
    expect(inlineStyle({ tag: "div", classes: ["tile"], attrs: new Map() }, [], sheet)).toBe(
      "color: green",
    );
  });

  it("keeps !important, because it was written to beat a host stylesheet", () => {
    const sheet = parseCss(`.tile { margin: 0 !important; }`);
    expect(inlineStyle({ tag: "div", classes: ["tile"], attrs: new Map() }, [], sheet)).toBe(
      "margin: 0 !important",
    );
  });

  it("reports a media query rather than inlining half of it", () => {
    const sheet = parseCss(`@media (prefers-color-scheme: dark) { :root { --bg: #262626; } }`);
    expect(sheet.rules).toHaveLength(0);
    expect(sheet.dropped[0]?.selector).toContain("@media");
    expect(sheet.dropped[0]?.why).toContain("no inline form");
  });

  it("reports a pseudo-class as a behaviour with no attribute to carry it", () => {
    const sheet = parseCss(`.tile:hover { transform: scale(1.02); }`);
    expect(sheet.rules).toHaveLength(0);
    expect(sheet.dropped[0]?.why).toContain("behaviour");
  });

  it("matches an attribute selector, which is how data-* rules are written", () => {
    const sheet = parseCss(`[data-active="true"] { border-color: red; }`);
    const on = { tag: "div", classes: [], attrs: new Map([["data-active", "true"]]) };
    const off = { tag: "div", classes: [], attrs: new Map([["data-active", "false"]]) };

    expect(inlineStyle(on, [], sheet)).toBe("border-color: red");
    expect(inlineStyle(off, [], sheet)).toBeUndefined();
  });
});

describe("converting an HTMLBlock", () => {
  it("unwraps it and inlines the stylesheet", async () => {
    const result = await convertReadmeMarkdown(
      block(`<style>.grid { display: grid; gap: 16px; }</style>\n<div class="grid">Content</div>`),
    );

    expect(result.mdx).not.toContain("HTMLBlock");
    expect(result.mdx).not.toContain("<style>");
    expect(result.mdx).toContain('style="display: grid; gap: 16px"');
    expect(result.mdx).toContain("Content");
  });

  it("writes className, not class", async () => {
    const result = await convertReadmeMarkdown(block(`<div class="grid">Content</div>`));

    expect(result.mdx).toContain('className="grid"');
    expect(result.mdx).not.toMatch(/\sclass="/);
  });

  it("self-closes void elements, which HTML tolerates and MDX does not", async () => {
    const result = await convertReadmeMarkdown(block(`<p><img src="/a.png" alt="A"></p>`));

    expect(result.mdx).toContain('<img src="/a.png" alt="A" />');
    expect(result.outputCompiles).toBe(true);
  });

  it("drops the doctype, which would otherwise fail the whole page", async () => {
    const result = await convertReadmeMarkdown(
      block(`<!DOCTYPE html>\n<html><body><p>Hi</p></body></html>`),
    );

    // `<!doctype` reads as the start of a tag name in MDX, so leaving it in is
    // not cosmetic — it is a build error for the entire page.
    expect(result.mdx).not.toMatch(/<!doctype/i);
    expect(result.outputCompiles).toBe(true);
  });

  it("unwraps html/head/body but keeps what was inside them", async () => {
    const result = await convertReadmeMarkdown(
      block(`<html><head><meta charset="UTF-8" /></head><body><p>Kept</p></body></html>`),
    );

    expect(result.mdx).toContain("Kept");
    expect(result.mdx).not.toContain("<body");
    expect(result.mdx).not.toContain("<meta");
  });

  it("says what it could not carry over, per reason", async () => {
    const result = await convertReadmeMarkdown(
      block(
        `<style>` +
          `:root { --bg: #fff; }` +
          `@media (prefers-color-scheme: dark) { :root { --bg: #000; } }` +
          `.tile:hover { transform: scale(1.02); }` +
          `.tile { background: var(--bg); }` +
          `</style>\n<div class="tile">T</div>`,
      ),
    );

    const details = blockNotes(result.notes).map((note) => note.detail);
    expect(details.some((detail) => detail.includes("@media"))).toBe(true);
    expect(details.some((detail) => detail.includes(":hover"))).toBe(true);
    // The variable still resolved, from the light `:root` that survived.
    expect(result.mdx).toContain("background: #fff");
  });

  it("blocks on a script rather than removing it quietly", async () => {
    const result = await convertReadmeMarkdown(
      block(`<div>Body</div><script>alert(1)</script>`),
    );

    expect(result.mdx).not.toContain("alert(1)");
    expect(blockNotes(result.notes).find((note) => note.level === "blocker")?.detail).toContain(
      "<script>",
    );
  });

  it("unwraps a body with no template literal, rather than fencing it", async () => {
    // Without the `{`…`}` braces MDX parses the body as ordinary content, so by
    // the time this pass runs there is no HTML string — just a wrapper around
    // nodes already in the tree. Fencing would quote markdown that was never HTML.
    const result = await convertReadmeMarkdown(`<HTMLBlock>\n  Just words.\n</HTMLBlock>\n`);
    const note = blockNotes(result.notes)[0];

    expect(note?.level).toBe("change");
    expect(note?.detail).toContain("no `{`…`}` template literal");
    expect(result.mdx.trim()).toBe("Just words.");
    expect(result.mdx).not.toContain("```");
    expect(result.mdx).not.toContain("HTMLBlock");
  });

  it("keeps real markdown in an unwrapped body, and hands it on", async () => {
    const result = await convertReadmeMarkdown(
      `<HTMLBlock>\n\n## Heading\n\nSome **bold** text.\n\n</HTMLBlock>\n`,
    );

    expect(result.mdx).toContain("## Heading");
    expect(result.mdx).toContain("**bold**");
    expect(result.outputCompiles).toBe(true);
  });

  it("hands the unwrapped markup on to the passes that own it", async () => {
    // The point of running before the other component passes: a table inside an
    // <HTMLBlock> should reach the table pass as a table.
    const result = await convertReadmeMarkdown(
      block(`<table><tr><th>A</th></tr><tr><td>1</td></tr></table>`),
    );

    expect(result.mdx).toContain("| A |");
    expect(result.mdx).not.toContain("<table");
  });
});
