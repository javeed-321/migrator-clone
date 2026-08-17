import { describe, expect, it } from "vitest";

import { buildBlocks, splitFrontmatter } from "../src/download/blocks";
import { parseLlmsTxt, slugFromUrl, toMarkdownUrl } from "../src/download/fetch";
import { buildInventory } from "../src/download/inventory";
import type { Block, PageIR } from "../src/download/types";

/** A page shaped like the ones ReadMe actually serves at `<url>.md`. */
const PAGE = `---
updatedAt: 2026-05-18T10:23:58.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create a Reward

Intro paragraph with a [link](https://docs.capillarytech.com/docs/points#consumption).

<Callout icon="📘" theme="info">
  **Before you begin**

  Configure the catalog first.
</Callout>

<Image align="center" border={true} width="smart" src="https://files.readme.io/x-a.png" className="border" />

| Toggle | What it does |
| :----- | :----------- |
| **On** | Publishes the reward. |

\`\`\`curl Sample request
curl https://api.example.com/v1/rewards
\`\`\`
\`\`\`json Sample response
{ "ok": true }
\`\`\`

> 🚧 Heads up
>
> This one is a markdown callout.

<HTMLBlock>{\`
<div>raw</div>
\`}</HTMLBlock>
`;

function find(blocks: Block[], predicate: (block: Block) => boolean): Block {
  const match = blocks.find(predicate);
  if (!match) throw new Error("no matching block");
  return match;
}

describe("splitFrontmatter", () => {
  it("lifts the YAML off the top and reports how many lines it took", () => {
    const { frontmatter, body, offset } = splitFrontmatter(PAGE);
    expect(frontmatter.updatedAt).toBe("2026-05-18T10:23:58.000Z");
    expect(body.startsWith("\nFetch the complete")).toBe(true);
    expect(offset).toBe(3);
  });

  it("leaves a page without frontmatter alone", () => {
    const { frontmatter, body, offset } = splitFrontmatter("# Title\n");
    expect(frontmatter).toEqual({});
    expect(body).toBe("# Title\n");
    expect(offset).toBe(0);
  });
});

describe("buildBlocks", () => {
  const { blocks, components, parseMode } = buildBlocks(PAGE, "docs.capillarytech.com");

  it("parses a well-formed page with the strict MDX parser", () => {
    expect(parseMode).toBe("mdx");
  });

  it("files ReadMe's injected preamble as boilerplate, not as content", () => {
    const boilerplate = find(blocks, (block) => block.kind === "boilerplate");
    expect(boilerplate.target.status).toBe("drop");
  });

  it("reports line numbers into the original file, frontmatter included", () => {
    const heading = find(blocks, (block) => block.kind === "heading");
    // `# Create a Reward` is line 7 of PAGE — 3 frontmatter lines above it.
    expect(heading.lines[0]).toBe(7);
    expect(heading.raw).toBe("# Create a Reward");
    expect(heading.text).toBe("Create a Reward");
  });

  it("maps a JSX callout's theme onto a Documentation.AI kind", () => {
    const callout = find(blocks, (block) => block.kind === "callout" && block.syntax === "jsx");
    expect(callout.component).toBe("Callout");
    expect(callout.attrs?.theme).toBe("info");
    expect(callout.target.attrs?.kind).toBe("info");
  });

  it("recognises the markdown blockquote spelling of a callout", () => {
    const callout = find(blocks, (block) => block.kind === "callout" && block.syntax === "markdown");
    expect(callout.attrs?.icon).toBe("🚧");
    // 🚧 is a caution on ReadMe, which is `alert` on Documentation.AI.
    expect(callout.target.attrs?.kind).toBe("alert");
    expect(callout.text).toContain("Heads up");
  });

  it("flags the image gotchas rather than silently carrying them over", () => {
    const image = find(blocks, (block) => block.kind === "image");
    expect(image.attrs?.src).toBe("https://files.readme.io/x-a.png");
    expect(image.notes).toEqual(
      expect.arrayContaining([
        expect.stringContaining('width="smart"'),
        expect.stringContaining('className="border"'),
        expect.stringContaining("no alt text"),
      ])
    );
  });

  it("reads a pipe table into header and rows", () => {
    const table = find(blocks, (block) => block.kind === "table");
    expect(table.table?.header).toEqual(["Toggle", "What it does"]);
    expect(table.table?.rows).toEqual([["On", "Publishes the reward."]]);
    expect(table.table?.emptyHeader).toBe(false);
  });

  it("groups consecutive fences into one CodeTabs block, tab titles kept", () => {
    const tabs = find(blocks, (block) => block.kind === "codeTabs");
    expect(tabs.component).toBe("CodeTabs");
    expect(tabs.target.component).toBe("CodeGroup");
    expect(tabs.tabs?.map((tab) => tab.title)).toEqual(["Sample request", "Sample response"]);
    expect(tabs.tabs?.map((tab) => tab.lang)).toEqual(["curl", "json"]);
  });

  it("marks HTMLBlock as needing a human", () => {
    const html = find(blocks, (block) => block.component === "HTMLBlock");
    expect(html.target.status).toBe("manual");
  });

  it("records links back into the source site as inline hits", () => {
    const paragraph = find(blocks, (block) => block.kind === "paragraph");
    expect(paragraph.inline?.some((hit) => hit.kind === "absoluteInternalLink")).toBe(true);
  });

  it("counts every construct on the page", () => {
    expect(components.Callout).toBe(2);
    expect(components.Image).toBe(1);
    expect(components.CodeTabs).toBe(1);
  });
});

describe("the lenient fallback", () => {
  // An unclosed `<br>` is valid on ReadMe and fatal to the strict MDX parser.
  const MDXISH = `# Title

<Table align={["left"]}>
  <thead>
    <tr><th>A</th></tr>
  </thead>

  <tbody>
    <tr><td>one<br>two</td></tr>
  </tbody>
</Table>
`;

  const { blocks, parseMode, parseError } = buildBlocks(MDXISH);

  it("falls back to markdown and says why", () => {
    expect(parseMode).toBe("markdown");
    expect(parseError).toBeTruthy();
  });

  it("still names the component, and does not invent thead/tbody components", () => {
    const table = find(blocks, (block) => block.component === "Table");
    expect(table.raw).toContain("</Table>");
    expect(blocks.some((block) => block.component === "thead")).toBe(false);
    expect(blocks.some((block) => block.component === "tbody")).toBe(false);
  });
});

describe("parseLlmsTxt", () => {
  const LLMS = `# Docs

## Guides
- [Introduction](https://docs.capillarytech.com/docs/introduction.md): The intro page.
- [Cards](https://docs.capillarytech.com/docs/card.md)

## API Reference
- [Overview](https://docs.capillarytech.com/reference/apioverview.md): API overview.
`;

  it("keeps each page's section, title, description and slug", () => {
    const pages = parseLlmsTxt(LLMS);
    expect(pages).toHaveLength(3);
    expect(pages[0]).toMatchObject({
      title: "Introduction",
      description: "The intro page.",
      section: "Guides",
      slug: "docs/introduction",
      kind: "guide",
    });
    expect(pages[1]?.description).toBe("");
    expect(pages[2]).toMatchObject({ slug: "reference/apioverview", kind: "api" });
  });
});

describe("url helpers", () => {
  it("adds .md once and never twice", () => {
    expect(toMarkdownUrl("https://host/docs/x")).toBe("https://host/docs/x.md");
    expect(toMarkdownUrl("https://host/docs/x/")).toBe("https://host/docs/x.md");
    expect(toMarkdownUrl("https://host/docs/x.md")).toBe("https://host/docs/x.md");
  });

  it("derives the output slug from the path", () => {
    expect(slugFromUrl("https://host/docs/create-a-reward.md")).toBe("docs/create-a-reward");
  });
});

describe("buildInventory", () => {
  it("aggregates across pages and separates what needs a human", () => {
    const { blocks, components, frontmatter, parseMode } = buildBlocks(PAGE);
    const page: PageIR = {
      slug: "docs/create-a-reward",
      source: "https://host/docs/create-a-reward.md",
      url: "https://host/docs/create-a-reward",
      title: "Create a Reward",
      description: "",
      section: "Guides",
      kind: "guide",
      frontmatter,
      parseMode,
      components,
      blocks,
    };

    const inventory = buildInventory([page, { ...page, slug: "docs/other" }], "https://host", "test");
    expect(inventory.pages).toBe(2);

    const callout = inventory.components.find((row) => row.name === "Callout");
    expect(callout?.count).toBe(4);
    expect(callout?.pages).toBe(2);

    const manual = inventory.components.filter((row) => row.target.status === "manual");
    expect(manual.map((row) => row.name)).toContain("HTMLBlock");
  });
});
