import rehypeParse from "rehype-parse";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { describe, expect, it } from "vitest";

import { styleToObjectSource } from "../src/mdx/attributes";
import { cleanAttributes } from "../src/mdx/hastClean";
import { inlineContainersInCells } from "../src/mdx/mdastClean";
import { selectiveRehypeRemark } from "../src/mdx/toMdast";

/**
 * html -> mdx, through the same steps the page pipeline uses.
 *
 * `inlineContainersInCells` is part of this on purpose: without it a preserved
 * container inside a pipe-table cell splits the row, so a helper that skipped it
 * would pass tests the real pipeline fails.
 */
function convert(html: string, options = {}): string {
  const tree = unified()
    .use(cleanAttributes, options)
    .use(selectiveRehypeRemark)
    .use(inlineContainersInCells)
    .runSync(unified().use(rehypeParse, { fragment: true }).parse(html));

  return String(
    unified().use(remarkMdx).use(remarkGfm).use(remarkStringify).stringify(tree as never)
  ).trim();
}

describe("styleToObjectSource", () => {
  it("camelCases hyphenated properties", () => {
    expect(styleToObjectSource("background-color: red; padding: 4px")).toBe(
      '{ backgroundColor: "red", padding: "4px" }'
    );
  });

  it("keeps semicolons inside url() and quotes", () => {
    expect(styleToObjectSource('background: url(a;b.png); content: "x;y"')).toBe(
      '{ background: "url(a;b.png)", content: "\\"x;y\\"" }'
    );
  });

  it("quotes keys that are not identifiers", () => {
    expect(styleToObjectSource("--brand: #fff")).toBe('{ "--brand": "#fff" }');
  });

  it("uses React's capitalised vendor-prefix form", () => {
    expect(styleToObjectSource("-webkit-transform: none")).toBe('{ WebkitTransform: "none" }');
  });

  it("returns undefined when nothing parses", () => {
    expect(styleToObjectSource(";;")).toBeUndefined();
  });
});

describe("class and style preservation", () => {
  it("emits className as a space-joined string, not a comma-joined array", () => {
    const mdx = convert('<div class="a b">text</div>');
    expect(mdx).toContain('className="a b"');
    expect(mdx).not.toContain('className="a,b"');
  });

  it("converts an inline style string into a JSX object expression", () => {
    const mdx = convert('<div style="padding:16px 24px; border-radius:8px">text</div>');
    expect(mdx).toContain('style={{ padding: "16px 24px", borderRadius: "8px" }}');
  });

  it("keeps a styled container instead of unwrapping it", () => {
    const mdx = convert('<footer class="sessionm-footer"><p>hi</p></footer>');
    expect(mdx).toContain("<footer");
    expect(mdx).toContain('className="sessionm-footer"');
  });

  it("still unwraps a container that carries nothing", () => {
    const mdx = convert("<div><p>hi</p></div>");
    expect(mdx).toBe("hi");
  });

  it("space-joins rel, which HTML also tokenises", () => {
    // `rel="noopener,noreferrer"` matches neither token, so a comma join here
    // silently disables both link-security keywords.
    const mdx = convert('<div class="x" rel="noopener noreferrer">t</div>');
    expect(mdx).toContain('rel="noopener noreferrer"');
    expect(mdx).not.toContain("noopener,noreferrer");
  });

  it("comma-joins accept, which HTML tokenises on commas", () => {
    const mdx = convert('<div class="x" accept="image/png, image/jpeg">t</div>');
    expect(mdx).toContain('accept="image/png, image/jpeg"');
  });

  it("restores kebab-case for data- and aria- attributes", () => {
    const mdx = convert('<div class="x" data-id="7" aria-label="Close">t</div>');
    expect(mdx).toContain('data-id="7"');
    expect(mdx).toContain('aria-label="Close"');
    expect(mdx).not.toContain("ariaLabel");
  });

  it("drops generated CSS-module classes but keeps authored ones", () => {
    const mdx = convert('<div class="SuperHubDoc-article3ArTrEavUTKg rm-Article">t</div>');
    expect(mdx).toContain('className="rm-Article"');
    expect(mdx).not.toContain("SuperHubDoc-article3ArTrEavUTKg");
  });

  it("keeps a code block's language even when class names are switched off", () => {
    const mdx = convert('<pre><code class="language-json">{"a":1}</code></pre>', {
      keepClassNames: false,
    });
    expect(mdx).toContain("```json");
  });

  it("drops ids by default and keeps them on request", () => {
    expect(convert('<div class="x" id="dup">t</div>')).not.toContain('id="dup"');
    expect(convert('<div class="x" id="dup">t</div>', { keepIds: true })).toContain('id="dup"');
  });

  it("writes a boolean attribute bare rather than as a string", () => {
    const mdx = convert('<div class="x" hidden>t</div>');
    expect(mdx).toContain("hidden");
    expect(mdx).not.toContain('hidden="true"');
  });
});

describe("links and images", () => {
  it("leaves a plain link as Markdown", () => {
    expect(convert('<a href="/x">label</a>')).toBe("[label](/x)");
  });

  it("keeps target and rel, which Markdown link syntax cannot carry", () => {
    const mdx = convert('<a href="https://x.com" target="_blank" rel="noopener noreferrer">S</a>');
    expect(mdx).toContain('target="_blank"');
    expect(mdx).toContain('rel="noopener noreferrer"');
  });

  it("leaves a plain image as Markdown", () => {
    expect(convert('<img src="/a.png" alt="A" />')).toBe("![A](/a.png)");
  });

  it("keeps image sizing rather than dropping it", () => {
    const mdx = convert('<img src="/a.png" alt="A" width="300" class="border" />');
    expect(mdx).toContain('width="300"');
    expect(mdx).toContain('className="border"');
  });
});

describe("tables", () => {
  const PLAIN = "<table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table>";

  it("leaves an ordinary table as a readable pipe table", () => {
    const mdx = convert(PLAIN);
    expect(mdx).toContain("| A | B |");
    expect(mdx).not.toContain("<table");
  });

  it("switches to JSX when a cell is styled, keeping the style", () => {
    const mdx = convert('<table><tr><td style="padding:16px">40</td></tr></table>');
    expect(mdx).toContain("<table>");
    expect(mdx).toContain('<td style={{ padding: "16px" }}>');
  });

  it("switches to JSX for colspan, which a pipe table cannot express", () => {
    const mdx = convert("<table><tr><td colspan='2'>merged</td></tr></table>");
    expect(mdx).toContain('colSpan="2"');
    expect(mdx).toContain("<table>");
  });

  it("keeps cell contents as Markdown inside a JSX table", () => {
    const mdx = convert(
      '<table><tr><td style="padding:1px"><a href="/x">link</a></td></tr></table>'
    );
    expect(mdx).toContain("[link](/x)");
  });

  it("keeps a nested styled div on one line so the row survives", () => {
    const mdx = convert(PLAIN.replace("<td>1</td>", '<td><div style="color:red">1</div></td>'));
    // The table stays GFM here (no attributes on the table itself), so the
    // container must not split the row across lines.
    const row = mdx.split("\n").find((line) => line.includes("color"));
    expect(row).toContain('<div style={{ color: "red" }}>1</div>');
  });
});

describe("paragraphs", () => {
  it("leaves a plain paragraph as Markdown", () => {
    expect(convert("<p>Just prose.</p>")).toBe("Just prose.");
  });

  it("keeps a styled paragraph's class", () => {
    const mdx = convert('<p class="sessionm-footer__heading">Company</p>');
    expect(mdx).toContain('<p className="sessionm-footer__heading">');
  });
});
