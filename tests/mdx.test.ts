import { beforeEach, describe, expect, it } from "vitest";

import { scrapePage } from "../src/pipeline/page";
import { htmlToHast } from "../src/pipeline/root";
import { detectFramework, resetFramework } from "../src/utils/detectFramework";

const READ_ME_META = '<meta name="readme-deploy" content="1">';

function article(inner: string) {
  return `<html><head>${READ_ME_META}</head><body>
    <header class="rm-Header"><nav><a href="/docs">Guides</a></nav></header>
    <article class="rm-Article">${inner}</article>
  </body></html>`;
}

function convert(inner: string) {
  const html = article(inner);
  detectFramework(htmlToHast(html));
  return scrapePage(html, "https://docs.example.com/docs/setup");
}

describe("scrapePage", () => {
  beforeEach(() => resetFramework());

  it("lifts the first heading and paragraph into frontmatter", () => {
    const { page } = convert("<h1>Setup</h1><p>Five minute install.</p><p>Body copy.</p>");

    expect(page?.title).toBe("Setup");
    expect(page?.description).toBe("Five minute install.");
    // Both were spliced out of the tree, so neither is repeated in the body.
    expect(page?.mdx).not.toContain("Setup");
    expect(page?.mdx.trim()).toBe("Body copy.");
  });

  it("fails when the content root is missing", () => {
    const html = `<html><head>${READ_ME_META}</head><body><div>no article</div></body></html>`;
    detectFramework(htmlToHast(html));
    const { result, page } = scrapePage(html, "https://docs.example.com/docs/setup");

    expect(result.success).toBe(false);
    expect(page).toBeUndefined();
  });

  it("keeps a code block's language through className stripping", () => {
    const { page } = convert('<pre><code class="language-bash">npm i foo</code></pre>');
    expect(page?.mdx).toContain("```bash");
  });

  it("converts a ReadMe callout into a Callout component", () => {
    const { page } = convert(
      `<blockquote class="callout callout_warn">
         <h3 class="callout-heading">Careful</h3>
         <p>This overwrites <strong>config</strong>.</p>
       </blockquote>`
    );

    expect(page?.mdx).toContain('<Callout kind="alert">');
    expect(page?.mdx).toContain("This overwrites **config**.");
    // The heading is an emoji plus a repeat of the severity — it is dropped.
    expect(page?.mdx).not.toContain("Careful");
  });

  it("maps every ReadMe callout severity", () => {
    const kinds: [string, string][] = [
      ["callout_info", "info"],
      ["callout_default", "info"],
      ["callout_warn", "alert"],
      ["callout_error", "danger"],
      ["callout_okay", "success"],
    ];

    for (const [className, kind] of kinds) {
      resetFramework();
      const { page } = convert(`<blockquote class="callout ${className}"><p>x</p></blockquote>`);
      expect(page?.mdx).toContain(`<Callout kind="${kind}">`);
    }
  });

  it("does not rewrite markup inside a code sample", () => {
    const { page } = convert(
      '<pre><code>&lt;blockquote class="callout callout_warn"&gt;hi&lt;/blockquote&gt;</code></pre>'
    );
    expect(page?.mdx).not.toContain("<Callout");
  });

  it("strips heading anchors, breaks and the footer timestamp", () => {
    const { page } = convert(
      `<h1>Setup</h1>
       <h2><a href="#install" class="heading-anchor">Install</a></h2>
       <br>
       <p>Body.</p>
       <hr>
       <p>Updated 3 days ago</p>`
    );

    expect(page?.mdx).toContain("## Install");
    expect(page?.mdx).not.toContain("(#install)");
    expect(page?.mdx).not.toContain("Updated 3 days ago");
    expect(page?.mdx).not.toContain("***");
  });

  it("inlines code blocks that ReadMe allows inside table cells", () => {
    const { page } = convert(
      `<table><thead><tr><th>Name</th></tr></thead>
       <tbody><tr><td><pre><code>5000</code></pre></td></tr></tbody></table>`
    );

    expect(page?.mdx).toContain("| `5000` |");
    expect(page?.mdx).not.toContain("```");
  });

  it("moves padding outside an emphasis marker", () => {
    // The leading paragraph is consumed by `description`, so the one under test
    // needs something ahead of it.
    const { page } = convert("<p>Intro.</p><p><em> spaced </em>text</p>");
    expect(page?.mdx).toContain("*spaced* text");
  });

  it("uses rootPath as the slug for a bare-origin page", () => {
    const html = article("<h1>Home</h1><p>Welcome.</p>");
    detectFramework(htmlToHast(html));
    const { result, page } = scrapePage(html, "https://docs.example.com/", { rootPath: "home" });

    expect(result.success).toBe(true);
    expect(page?.slug).toBe("home");
  });
});
