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

    expect(page?.mdx).toContain('<Callout kind="warning">');
    expect(page?.mdx).toContain("This overwrites **config**.");
    // The heading is an emoji plus a repeat of the severity — it is dropped.
    expect(page?.mdx).not.toContain("Careful");
  });

  it("maps every ReadMe callout severity to the ucc schema kinds", () => {
    const kinds: [string, string][] = [
      ["callout_info", "note"],
      ["callout_default", "note"],
      ["callout_warn", "warning"],
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

  it("converts a ReadMe figure into a self-closing Image, keeping the remote URL", () => {
    const { page } = convert(
      `<h1>T</h1><figure>
         <span class="img lightbox"><span class="lightbox-inner">
           <img alt="Schema block" src="https://files.readme.io/abc-schema.gif" width="auto" height="auto">
         </span></span>
         <figcaption><p>Schema block</p></figcaption>
       </figure>`
    );

    expect(page?.mdx).toContain('<Image');
    expect(page?.mdx).toContain('src="https://files.readme.io/abc-schema.gif"');
    expect(page?.mdx).toContain('alt="Schema block"');
    // width/height were "auto", so they must not appear as attributes.
    expect(page?.mdx).not.toContain("auto");
    // Self-closing — no separate closing tag.
    expect(page?.mdx).not.toContain("</Image>");
  });

  it("turns a single-tab CodeTabs into a fenced block with its data-lang", () => {
    const { page } = convert(
      `<h1>T</h1><div class="CodeTabs">
         <div class="CodeTabs-toolbar"><button value="json">JSON</button></div>
         <div class="CodeTabs-inner"><pre><code class="rdmd-code" data-lang="json">const a = 1;</code></pre></div>
       </div>`
    );

    expect(page?.mdx).toContain("```json");
    expect(page?.mdx).toContain("const a = 1;");
    expect(page?.mdx).not.toContain("<CodeGroup>");
  });

  it("turns a multi-tab CodeTabs into a CodeGroup of fenced blocks", () => {
    const { page } = convert(
      `<h1>T</h1><div class="CodeTabs">
         <div class="CodeTabs-toolbar">
           <button value="json">JSON</button><button value="bash">Shell</button>
         </div>
         <div class="CodeTabs-inner">
           <pre><code class="rdmd-code" data-lang="json">{"a":1}</code></pre>
           <pre><code class="rdmd-code" data-lang="bash">echo hi</code></pre>
         </div>
       </div>`
    );

    expect(page?.mdx).toContain("<CodeGroup>");
    expect(page?.mdx).toContain("</CodeGroup>");
    expect(page?.mdx).toContain("```json JSON");
    expect(page?.mdx).toContain("```bash Shell");
    expect(page?.mdx).toContain('{"a":1}');
    expect(page?.mdx).toContain("echo hi");
  });

  it("wraps consecutive ReadMe cards in Columns", () => {
    const { page } = convert(
      `<h1>T</h1><div>
         <a class="lqc-card" href="https://x.test/docs/a#one"><div class="lqc-tile"><svg></svg><span class="lqc-label">One</span></div></a>
         <a class="lqc-card" href="https://x.test/docs/a#two"><div class="lqc-tile"><svg></svg><span class="lqc-label">Two</span></div></a>
       </div>`
    );

    expect(page?.mdx).toContain('<Columns cols="2">');
    expect(page?.mdx).toContain('<Card title="One" href="https://x.test/docs/a#one"');
    expect(page?.mdx).toContain('<Card title="Two" href="https://x.test/docs/a#two"');
  });

  it("strips ReadMe SuperHub chrome (breadcrumb, pager, feedback, ToC)", () => {
    const { page } = convert(
      `<div class="rm-Breadcrumb">GETTING STARTED</div>
       <h1>Accessing Capillary</h1>
       <p>Intro.</p>
       <p>Real body.</p>
       <div class="UpdatedAt"><p>Updated 5 months ago</p></div>
       <hr class="NextStepsDivider">
       <nav class="rm-Pagination"><a href="/docs/introduction">Introduction</a></nav>
       <div class="rm-PageThumbs PageThumbs">Did this page help you?<span>Yes</span><span>No</span><span>Copy Page</span></div>
       <section class="content-toc grid-25 rm-Aside"><ul><li><a href="#x">Cluster URLs</a></li></ul></section>`
    );

    expect(page?.mdx.trim()).toBe("Real body.");
    for (const leaked of [
      "GETTING STARTED",
      "Updated 5 months ago",
      "Introduction",
      "Did this page help you?",
      "Copy Page",
      "Cluster URLs",
    ]) {
      expect(page?.mdx).not.toContain(leaked);
    }
  });

  it("uses rootPath as the slug for a bare-origin page", () => {
    const html = article("<h1>Home</h1><p>Welcome.</p>");
    detectFramework(htmlToHast(html));
    const { result, page } = scrapePage(html, "https://docs.example.com/", { rootPath: "home" });

    expect(result.success).toBe(true);
    expect(page?.slug).toBe("home");
  });
});
