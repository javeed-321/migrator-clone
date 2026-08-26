import { describe, expect, it } from "vitest";

import { convertReadmeMarkdown } from "../src/convert/run";
import { parseMarkdown } from "../src/download/parse";

/** One page carrying every construct the converter knows about. */
const PAGE = `# Create a reward

> 📘 Before you begin
>
> You need an API key with the \`loyalty:write\` scope.

<Table align={["left","left"]}>
  <thead>
    <tr><th>Field</th><th>Type</th></tr>
  </thead>
  <tbody>
    <tr><td>\`customer\`</td><td>object</td></tr>
    <tr><td>* \`email\`</td><td>string</td></tr>
  </tbody>
</Table>

<Accordion title="Troubleshooting" icon="fa-info-circle">
  Check the API key first.
</Accordion>

<Accordion title="Advanced">
  Set \`retryAttempts\`.
</Accordion>

<Cards columns={2}>
  <Card title="Quickstart" href="doc:quickstart" icon="fa-rocket">
    Ten minutes, start to finish.
  </Card>

  <Card title="Reference" href="ref:get-member" icon="fa-code">
    Every endpoint.
  </Card>
</Cards>

<Embed typeOfEmbed="iframe" url="https://player.vimeo.com/video/1071296714" iframe="true" width="100%" height="370px" />

\`\`\`curl Sample request
curl https://api.example.com/rewards
\`\`\`
\`\`\`json Sample response
{ "ok": true }
\`\`\`

A <Glossary>Block</Glossary> is the smallest unit.

See <Anchor label="Super Admins" target="_blank" href="https://docs.capillarytech.com/docs/admins">Super Admins</Anchor>.
`;

const result = await convertReadmeMarkdown(PAGE, {
  title: "Create a reward",
  site: "https://docs.capillarytech.com",
});

describe("the pipeline", () => {
  it("accepts the page as strict MDX", async () => {
    expect(result.parseMode).toBe("mdx");
  });

  it("produces MDX that compiles again", async () => {
    expect(parseMarkdown(result.mdx).mode).toBe("mdx");
  });

  it("emits no raw HTML and no ReadMe-only tags", async () => {
    expect(result.mdx).not.toMatch(/<(div|span|table|thead|tbody|tr|td|th|br|p)\b/);
    for (const tag of ["<Table", "<Accordion", "<Cards", "<Embed", "<Anchor", "<Column>", "<Glossary"]) {
      expect(result.mdx).not.toContain(tag);
    }
  });

  it("drops the body H1 that duplicated the frontmatter title", async () => {
    expect(result.mdx).not.toContain("# Create a reward");
  });

  it("converts the blockquote callout", async () => {
    expect(result.mdx).toContain('<Callout kind="info">');
    expect(result.mdx).toContain("**Before you begin**");
  });

  it("rebuilds the JSX table as a pipe table", async () => {
    expect(result.mdx).toContain("| Field");
    // The cell held a markdown list, which a GFM cell cannot, so the bullet is
    // re-emitted as the `•` the reader already saw. No indentation is invented in
    // front of it, and the name is untouched.
    expect(result.mdx).toContain("\u2022 `email`");
    expect(result.mdx).not.toContain("- `email`");
    expect(result.mdx).not.toContain("\u2003");
  });

  it("groups the adjacent accordions", async () => {
    expect(result.mdx).toContain("<ExpandableGroup>");
    expect((result.mdx.match(/<Expandable /g) ?? []).length).toBe(2);
  });

  it("turns Cards into Columns and maps the icons", async () => {
    expect(result.mdx).toContain('<Columns cols="2">');
    expect(result.mdx).toContain('icon="rocket"');
    expect(result.mdx).toContain('icon="code"');
  });

  it("routes the Vimeo embed to Video", async () => {
    expect(result.mdx).toContain("<Video");
    expect(result.mdx).toContain('height="370"');
  });

  it("groups the adjacent fences into a CodeGroup", async () => {
    expect(result.mdx).toContain('<CodeGroup tabs="Sample request,Sample response">');
  });

  it("rewrites every link, including hrefs the conversion itself created", async () => {
    // The card hrefs are `doc:`/`ref:` protocols that only exist after <Cards>
    // became <Columns> — proof that link rewriting really does run last.
    expect(result.mdx).toContain('href="/docs/quickstart"');
    expect(result.mdx).toContain('href="/reference/get-member"');
    // And the absolute self-link in prose became site-relative.
    expect(result.mdx).toContain("[Super Admins](/docs/admins)");
  });

  it("unwraps the glossary term to plain text", async () => {
    expect(result.mdx).toContain("A Block is the smallest unit.");
  });

  it("reports what it did", async () => {
    const rules = new Set(result.notes.map((note) => note.rule));

    expect(rules).toContain("table");
    expect(rules).toContain("accordion");
    expect(rules).toContain("cards");
    expect(rules).toContain("embed");
    expect(rules).toContain("callout");
    expect(rules).toContain("glossary");
    expect(rules).toContain("link");
  });

  it("is idempotent", async () => {
    const again = await convertReadmeMarkdown(result.mdx, {
      title: "Create a reward",
      site: "https://docs.capillarytech.com",
    });

    expect(again.mdx).toBe(result.mdx);
  });
});

/** The unclosed `<br>` is what forces the page onto the fallback parser. */
const DETAILS_PAGE = `## FAQ

<details>
<summary>What is a **loyalty program**?</summary>

A program that rewards repeat customers. See [the guide](doc:loyalty-basics).

</details>

<details open>
<summary>How do I join?</summary>

> 📘 Before you begin
>
> You need an API key.

</details>

Signed up? <br> Then you are done.`;

const detailsResult = await convertReadmeMarkdown(DETAILS_PAGE, {
  site: "https://docs.capillarytech.com",
});

describe("raw <details> through the whole pipeline", () => {


  it("converts both blocks, on the strict parser", async () => {
    // The page arrives with an unclosed `<br>`, which used to drop it onto the
    // lenient parser; the repair pass self-closes it first.
    expect(detailsResult.parseMode).toBe("mdx");
    expect(detailsResult.mdx).not.toContain("<details");
    expect(detailsResult.mdx).toContain('<Expandable title="What is a loyalty program?"');
    expect(detailsResult.mdx).toContain('default-open="true"');
  });

  it("groups them, and lets the later passes reach inside", async () => {
    expect(detailsResult.mdx).toContain("<ExpandableGroup>");
    // The callout pass swept the body the details pass had just moved.
    expect(detailsResult.mdx).toContain('<Callout kind="info">');
    // And the link pass rewrote a `doc:` href that sits inside an Expandable.
    expect(detailsResult.mdx).toContain("[the guide](/docs/loyalty-basics)");
  });

  it("strips the unclosed <br> the page came in with", async () => {
    expect(detailsResult.mdx).not.toMatch(/<br/i);
  });

  it("is idempotent", async () => {
    const again = await convertReadmeMarkdown(detailsResult.mdx, {
      site: "https://docs.capillarytech.com",
    });

    expect(again.parseMode).toBe("mdx");
    expect(again.mdx).toBe(detailsResult.mdx);
  });
});

/**
 * Anything reading a real `.md` file hits this; the paste box never did, because
 * it is fed page bodies. `remark-parse` has no frontmatter plugin, so an unsplit
 * block is a thematic break plus a setext H2 — and it lands *above* the body H1,
 * which is what stops that H1 being recognised as a duplicate of the title.
 */
describe("ReadMe frontmatter", () => {
  it("drops the block instead of rendering it as a rule and a heading", async () => {
    const result = await convertReadmeMarkdown(
      `---\nupdatedAt: 2026-08-11T06:18:16.000Z\n---\n\n# Introduction\n\nBody text.\n`,
      { title: "Introduction" },
    );

    expect(result.mdx).not.toContain("updatedAt");
    expect(result.mdx).not.toMatch(/^---/m);
    expect(result.mdx).toContain("Body text.");
  });

  it("still drops the body H1 that duplicates the title", async () => {
    const result = await convertReadmeMarkdown(
      `---\nupdatedAt: 2026-08-11T06:18:16.000Z\n---\n\n# Introduction\n\nBody text.\n`,
      { title: "Introduction" },
    );

    expect(result.mdx).not.toContain("# Introduction");
  });

  it("reads the title out of the frontmatter when the caller has none", async () => {
    const result = await convertReadmeMarkdown(
      `---\ntitle: Getting Started\nexcerpt: How to begin\n---\n\n# Getting Started\n\nBody.\n`,
    );

    expect(result.title).toBe("Getting Started");
    expect(result.description).toBe("How to begin");
    // Known from the frontmatter, so the duplicate H1 goes with no caller input.
    expect(result.mdx).not.toContain("# Getting Started");
  });

  it("says what it dropped", async () => {
    const result = await convertReadmeMarkdown(`---\nupdatedAt: 2026-01-01\n---\n\nBody.\n`);
    const note = result.notes.find((entry) => entry.rule === "frontmatter");

    expect(note).toMatchObject({ level: "change" });
    expect(note?.detail).toContain("updatedAt");
  });

  it("leaves a page with no frontmatter exactly as it was", async () => {
    const result = await convertReadmeMarkdown(`# Title\n\nBody.\n`);

    expect(result.notes.find((entry) => entry.rule === "frontmatter")).toBeUndefined();
    expect(result.mdx).toContain("# Title");
  });
});
