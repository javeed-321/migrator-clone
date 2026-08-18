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

const result = convertReadmeMarkdown(PAGE, {
  title: "Create a reward",
  site: "https://docs.capillarytech.com",
});

describe("the pipeline", () => {
  it("accepts the page as strict MDX", () => {
    expect(result.parseMode).toBe("mdx");
  });

  it("produces MDX that compiles again", () => {
    expect(parseMarkdown(result.mdx).mode).toBe("mdx");
  });

  it("emits no raw HTML and no ReadMe-only tags", () => {
    expect(result.mdx).not.toMatch(/<(div|span|table|thead|tbody|tr|td|th|br|p)\b/);
    for (const tag of ["<Table", "<Accordion", "<Cards", "<Embed", "<Anchor", "<Column>", "<Glossary"]) {
      expect(result.mdx).not.toContain(tag);
    }
  });

  it("drops the body H1 that duplicated the frontmatter title", () => {
    expect(result.mdx).not.toContain("# Create a reward");
  });

  it("converts the blockquote callout", () => {
    expect(result.mdx).toContain('<Callout kind="info">');
    expect(result.mdx).toContain("**Before you begin**");
  });

  it("rebuilds the JSX table as a pipe table, with depth encoded", () => {
    expect(result.mdx).toContain("| Field");
    // Two em-spaces (U+2003) + the depth glyph. Asserted as exact characters:
    // `\s*` in a regex would swallow the em-spaces and never match them.
    expect(result.mdx).toContain("\u2003\u2003\u2022 `email`");
  });

  it("groups the adjacent accordions", () => {
    expect(result.mdx).toContain("<ExpandableGroup>");
    expect((result.mdx.match(/<Expandable /g) ?? []).length).toBe(2);
  });

  it("turns Cards into Columns and maps the icons", () => {
    expect(result.mdx).toContain('<Columns cols="2">');
    expect(result.mdx).toContain('icon="rocket"');
    expect(result.mdx).toContain('icon="code"');
  });

  it("routes the Vimeo embed to Video", () => {
    expect(result.mdx).toContain("<Video");
    expect(result.mdx).toContain('height="370"');
  });

  it("groups the adjacent fences into a CodeGroup", () => {
    expect(result.mdx).toContain('<CodeGroup tabs="Sample request,Sample response">');
  });

  it("rewrites every link, including hrefs the conversion itself created", () => {
    // The card hrefs are `doc:`/`ref:` protocols that only exist after <Cards>
    // became <Columns> — proof that link rewriting really does run last.
    expect(result.mdx).toContain('href="/docs/quickstart"');
    expect(result.mdx).toContain('href="/reference/get-member"');
    // And the absolute self-link in prose became site-relative.
    expect(result.mdx).toContain("[Super Admins](/docs/admins)");
  });

  it("unwraps the glossary term to plain text", () => {
    expect(result.mdx).toContain("A Block is the smallest unit.");
  });

  it("reports what it did", () => {
    const rules = new Set(result.notes.map((note) => note.rule));

    expect(rules).toContain("table");
    expect(rules).toContain("accordion");
    expect(rules).toContain("cards");
    expect(rules).toContain("embed");
    expect(rules).toContain("callout");
    expect(rules).toContain("glossary");
    expect(rules).toContain("link");
  });

  it("is idempotent", () => {
    const again = convertReadmeMarkdown(result.mdx, {
      title: "Create a reward",
      site: "https://docs.capillarytech.com",
    });

    expect(again.mdx).toBe(result.mdx);
  });
});

describe("raw <details> through the whole pipeline", () => {
  /** The unclosed `<br>` is what forces the page onto the fallback parser. */
  const PAGE = `## FAQ

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

  const result = convertReadmeMarkdown(PAGE, { site: "https://docs.capillarytech.com" });

  it("converts both blocks even though the page is not valid MDX", () => {
    expect(result.parseMode).toBe("markdown");
    expect(result.mdx).not.toContain("<details");
    expect(result.mdx).toContain('<Expandable title="What is a loyalty program?"');
    expect(result.mdx).toContain('default-open="true"');
  });

  it("groups them, and lets the later passes reach inside", () => {
    expect(result.mdx).toContain("<ExpandableGroup>");
    // The callout pass swept the body the details pass had just moved.
    expect(result.mdx).toContain('<Callout kind="info">');
    // And the link pass rewrote a `doc:` href that sits inside an Expandable.
    expect(result.mdx).toContain("[the guide](/docs/loyalty-basics)");
  });

  it("is idempotent once the page is valid MDX", () => {
    // The stray unclosed `<br>` is still in the output — stripping it is §3.6,
    // which is not built yet — and it keeps the page on the fallback parser,
    // where the nested indentation of a converted <ExpandableGroup> reads as an
    // indented code block. Remove it and the conversion is a fixed point.
    const valid = result.mdx.replace(" <br>", "");
    const again = convertReadmeMarkdown(valid, { site: "https://docs.capillarytech.com" });

    expect(again.parseMode).toBe("mdx");
    expect(again.mdx).toBe(valid);
  });
});
