import { describe, expect, it } from "vitest";

import { parseMarkdown } from "../src/download/parse";
import {
  convertOneToOne,
  lucideIcon,
  rewriteHref,
  toMdx,
  type ConvertOptions,
} from "../src/convert/one-to-one";

/** Source markdown -> converted MDX, the way the pipeline runs it. */
function convert(source: string, options: ConvertOptions = {}): string {
  const { tree } = parseMarkdown(source);
  return toMdx(convertOneToOne(tree, options).tree).trim();
}

function notesFor(source: string, options: ConvertOptions = {}) {
  const { tree } = parseMarkdown(source);
  return convertOneToOne(tree, options).notes;
}

describe("1.1 Callout", () => {
  it("collapses theme and icon into kind, with theme winning", () => {
    const out = convert(`<Callout icon="👍" theme="error">\n  Body text.\n</Callout>`);

    expect(out).toContain('kind="danger"');
    expect(out).not.toContain("theme=");
    expect(out).not.toContain("👍");
  });

  it("falls back to the emoji when there is no theme", () => {
    expect(convert(`<Callout icon="🚧">\n  Careful.\n</Callout>`)).toContain('kind="alert"');
    expect(convert(`<Callout icon="📘">\n  Note.\n</Callout>`)).toContain('kind="info"');
  });

  it("keeps the heading line as bold body text, since there is no title attribute", () => {
    const out = convert(`<Callout theme="info">\n  Before you begin\n\n  You need an API key.\n</Callout>`);

    expect(out).toContain("**Before you begin**");
    expect(out).toContain("You need an API key.");
  });

  it("converts the blockquote spelling, which is most of the corpus", () => {
    const out = convert("> 📘 Before you begin\n>\n> You need an API key.");

    expect(out).toContain('<Callout kind="info">');
    expect(out).toContain("**Before you begin**");
    expect(out).toContain("You need an API key.");
    // No blockquote markers left behind.
    expect(out.split("\n").some((line) => line.trimStart().startsWith(">"))).toBe(false);
  });

  it("leaves a blockquote with no emoji as a blockquote", () => {
    expect(convert("> Just a quotation.")).toBe("> Just a quotation.");
  });

  it("does not bold a title-only callout, which has no body to distinguish it from", () => {
    const out = convert("> ❗ Deprecated");

    expect(out).toContain('kind="danger"');
    expect(out).not.toContain("**");
  });
});

describe("1.2 Fence titles", () => {
  it("moves the free-text title into title=", () => {
    expect(convert('```json Sample response\n{ "ok": true }\n```')).toContain('```json title="Sample response"');
  });

  it("reads a title-only fence as a title and sets the language to text", () => {
    const out = convert("```Zed\nTab Number Zero\n```");

    expect(out).toContain('```text title="Zed"');
  });

  it("leaves curl alone, because Documentation.AI aliases it to bash", () => {
    const out = convert("```curl\ncurl https://api.example.com\n```");

    expect(out).toContain("```curl");
    expect(out).not.toContain("bash");
  });

  it("is idempotent — a converted fence is not converted again", () => {
    const once = convert('```json Sample response\n{ "ok": true }\n```');
    const twice = convert(once);

    expect(twice).toBe(once);
  });
});

describe("1.3 CodeTabs -> CodeGroup", () => {
  const adjacent = "```js JavaScript\nfetch('/api');\n```\n```python Python\nrequests.get('/api')\n```";

  it("groups fences that are adjacent with no blank line", () => {
    const out = convert(adjacent);

    expect(out).toContain('<CodeGroup tabs="JavaScript,Python">');
    expect(out).toContain('```js title="JavaScript"');
    expect(out).toContain('```python title="Python"');
  });

  it("does not group fences separated by a blank line — ReadMe's documented opt-out", () => {
    const separated = "```js JavaScript\nfetch('/api');\n```\n\n```python Python\nrequests.get('/api')\n```";

    expect(convert(separated)).not.toContain("CodeGroup");
  });

  it("leaves a lone fence as a plain fence", () => {
    expect(convert("```mermaid\nflowchart TD\n  A --> B\n```")).not.toContain("CodeGroup");
  });

  it("labels an untitled fence with the uppercased language, as ReadMe does", () => {
    const out = convert("```js\nfetch('/api');\n```\n```python\nrequests.get('/api')\n```");

    expect(out).toContain('tabs="JS,PYTHON"');
  });

  it("blocks on a label containing the tabs separator", () => {
    const notes = notesFor("```json 200, OK\n{}\n```\n```json 400\n{}\n```");

    expect(notes.some((note) => note.level === "blocker" && note.rule === "code-group")).toBe(true);
  });
});

describe("1.4 Tabs", () => {
  it("maps a Font Awesome icon to a Lucide name and drops iconColor", () => {
    const out = convert(`<Tabs>\n  <Tab title="macOS" icon="fa-apple" iconColor="blue-500">\n    brew install foo\n  </Tab>\n</Tabs>`);

    expect(out).toContain('title="macOS"');
    expect(out).toContain('icon="apple"');
    expect(out).not.toContain("iconColor");
  });

  it("drops an icon it cannot map, and says so", () => {
    const notes = notesFor(`<Tabs>\n  <Tab title="Odd" icon="fa-flux-capacitor">\n    x\n  </Tab>\n</Tabs>`);

    expect(notes.some((note) => note.rule === "icon" && note.level === "flag")).toBe(true);
  });

  it("blocks on a Tab with no title", () => {
    const notes = notesFor(`<Tabs>\n  <Tab>\n    x\n  </Tab>\n</Tabs>`);

    expect(notes.some((note) => note.rule === "tab" && note.level === "blocker")).toBe(true);
  });

  it("maps names with and without a Font Awesome prefix", () => {
    expect(lucideIcon("fa-duotone fa-solid fa-rocket")).toBe("rocket");
    expect(lucideIcon("fa-info-circle")).toBe("info");
    expect(lucideIcon("📘")).toBeNull();
    expect(lucideIcon(undefined)).toBeNull();
  });
});

describe("1.5 Tables", () => {
  it("carries a pipe table across unchanged, alignment included", () => {
    const table = "| Parameter | Type |\n| :-------- | ---: |\n| `api_key` | string |";

    expect(convert(table)).toContain(":-");
    expect(convert(table)).toContain("`api_key`");
  });

  it("blocks on an empty header row", () => {
    const notes = notesFor("|  |  |\n| --- | --- |\n| Key | Value |");

    expect(notes.some((note) => note.rule === "table" && note.level === "blocker")).toBe(true);
  });
});

describe("1.7 Links", () => {
  const options: ConvertOptions = { site: "https://docs.capillarytech.com" };

  it("rewrites all four ReadMe protocols", () => {
    expect(rewriteHref("doc:new-user-management").href).toBe("/docs/new-user-management");
    expect(rewriteHref("ref:put_promotions-activate").href).toBe("/reference/put_promotions-activate");
    expect(rewriteHref("changelog:v2").href).toBe("/changelog/v2");
    expect(rewriteHref("page:pricing").href).toBe("/page/pricing");
  });

  it("preserves the hash fragment", () => {
    expect(rewriteHref("doc:my-page#section").href).toBe("/docs/my-page#section");
  });

  it("uses the site-wide slug map when one is supplied", () => {
    const resolved = rewriteHref("doc:old-slug", {
      resolvePath: (protocol, slug) => (protocol === "doc" ? `/guides/${slug}-v2` : undefined),
    });

    expect(resolved.href).toBe("/guides/old-slug-v2");
  });

  it("turns an absolute self-link into a site-relative path", () => {
    expect(rewriteHref("https://docs.capillarytech.com/docs/x#y", options).href).toBe("/docs/x#y");
  });

  it("leaves a genuinely external link alone", () => {
    const external = rewriteHref("https://example.com/thing", options);

    expect(external.href).toBe("https://example.com/thing");
    expect(external.changed).toBe(false);
  });

  it("unwraps <Anchor> to a markdown link, dropping label and target", () => {
    const source = `See <Anchor label="Super Admins" target="_blank" href="https://docs.capillarytech.com/docs/admins">Super Admins</Anchor> for more.`;
    const out = convert(source, options);

    expect(out).toContain("[Super Admins](/docs/admins)");
    expect(out).not.toContain("label=");
    expect(out).not.toContain("target=");
  });

  it("flags a dropped download attribute rather than losing it silently", () => {
    const notes = notesFor(`<Anchor href="/f.pdf" download="f.pdf">File</Anchor>`, options);

    expect(notes.some((note) => note.rule === "link" && note.detail.includes("download"))).toBe(true);
  });
});

describe("1.8 Lists", () => {
  it("keeps a one-line-per-step ordered list as a list", () => {
    const source = "1. Install the dependencies.\n2. Configure your environment.";
    const out = convert(source);

    expect(out).not.toContain("<Steps>");
    expect(out).toContain("1. Install the dependencies.");
  });

  it("normalises bullet markers to -", () => {
    expect(convert("* First\n* Second")).toBe("- First\n- Second");
  });

  it("leaves the <Steps> decision to its own pass", () => {
    const source = "1. Install.\n\n   Run `npm install`.\n\n2. Configure.\n\n   Create the config file.";

    expect(convert(source)).not.toContain("<Steps>");
  });
});

describe("1.9 Headings", () => {
  it("drops a body H1 that duplicates the frontmatter title", () => {
    const out = convert("# Create a reward\n\nBody text.", { title: "Create a Reward" });

    expect(out).toBe("Body text.");
  });

  it("keeps H2-H6 untouched", () => {
    const out = convert("## Section\n\n### Subsection");

    expect(out).toContain("## Section");
    expect(out).toContain("### Subsection");
  });

  it("reports remaining body H1s instead of silently demoting them", () => {
    const source = "# Overview\n\ntext\n\n# Details\n\ntext";
    const notes = notesFor(source);

    expect(notes.some((note) => note.rule === "heading" && note.level === "flag")).toBe(true);
    expect(convert(source)).toContain("# Overview");
  });

  it("demotes every heading together when the caller opts in", () => {
    const out = convert("# Overview\n\n## Detail", { headingPolicy: "demote" });

    expect(out).toContain("## Overview");
    expect(out).toContain("### Detail");
  });
});

describe("the driver", () => {
  it("is idempotent across every rule at once", () => {
    const source = [
      "# Create a reward",
      "",
      "> 📘 Before you begin",
      ">",
      "> You need an API key.",
      "",
      "```curl Sample request",
      "curl https://api.example.com",
      "```",
      "```json Sample response",
      '{ "ok": true }',
      "```",
      "",
      "See <Anchor label='Docs' target='_blank' href='doc:other-page'>Docs</Anchor>.",
      "",
      "| Parameter | Type |",
      "| :-------- | :--- |",
      "| `api_key` | string |",
    ].join("\n");

    const once = convert(source, { title: "Create a reward" });
    const twice = convert(once, { title: "Create a reward" });

    expect(twice).toBe(once);
  });

  it("emits no raw HTML", () => {
    const out = convert("> 👍 Done\n>\n> It worked.\n\n* a\n* b");

    expect(out).not.toMatch(/<(div|span|table|p|br|details|summary)\b/);
  });
});
