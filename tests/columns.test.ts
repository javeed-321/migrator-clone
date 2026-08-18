import { describe, expect, it } from "vitest";

import { convertColumns } from "../src/convert/columns";
import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertColumns(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

const blockers = (notes: ConversionNote[]) => notes.filter((note) => note.level === "blocker");

/** Two card-shaped columns: a heading, a sentence, and a link of their own. */
const CARD_SHAPED = `<Columns layout="fixed">
  <Column>
    ### Sending a message

    Use the \`POST /messages\` endpoint.

    [Read the reference](/docs/messages-api)
  </Column>

  <Column>
    ### Receiving a webhook

    Register a callback URL.

    [Read the reference](/docs/webhooks)
  </Column>
</Columns>`;

describe("2.3 Column -> Card", () => {
  it("converts each column to a card inside Columns", () => {
    const { mdx } = run(CARD_SHAPED);

    expect(mdx).toContain('<Columns cols="2">');
    expect((mdx.match(/<Card /g) ?? []).length).toBe(2);
    expect(mdx).not.toContain("<Column>");
  });

  it("never emits a div", () => {
    expect(run(CARD_SHAPED).mdx).not.toContain("<div");
  });

  it("takes the title from the column's heading", () => {
    const { mdx } = run(CARD_SHAPED);

    expect(mdx).toContain('title="Sending a message"');
    expect(mdx).toContain('title="Receiving a webhook"');
  });

  it("takes the href from the link the column already carries", () => {
    const { mdx } = run(CARD_SHAPED);

    expect(mdx).toContain('href="/docs/messages-api"');
    expect(mdx).toContain('href="/docs/webhooks"');
  });

  it("consumes a trailing link-only paragraph rather than duplicating it in the body", () => {
    const { mdx } = run(CARD_SHAPED);

    expect(mdx).not.toContain("[Read the reference]");
    expect(mdx).toContain("Use the `POST /messages` endpoint.");
  });

  it("keeps a mid-sentence link in place while using it as the href", () => {
    const source = `<Columns>
  <Column>
    ### Guides

    Start with the [quickstart](/docs/quickstart) guide today.
  </Column>
</Columns>`;
    const { mdx } = run(source);

    expect(mdx).toContain('href="/docs/quickstart"');
    expect(mdx).toContain("[quickstart](/docs/quickstart)");
  });

  it("reads a bold lead-in as the title and keeps the rest of the sentence", () => {
    const source = `<Columns>
  <Column>
    **Sending a message** — use the \`POST /messages\` endpoint.

    [Reference](/docs/messages)
  </Column>
</Columns>`;
    const { mdx } = run(source);

    expect(mdx).toContain('title="Sending a message"');
    expect(mdx).toContain("use the `POST /messages` endpoint.");
    expect(mdx).not.toContain("**Sending a message**");
  });

  it("drops layout and derives cols from the child count", () => {
    const { mdx, notes } = run(CARD_SHAPED);

    expect(mdx).not.toContain("layout");
    expect(mdx).toContain('cols="2"');
    expect(notes.some((note) => note.detail.includes('dropped layout="fixed"'))).toBe(true);
  });

  it("reports no blockers for card-shaped columns", () => {
    expect(blockers(run(CARD_SHAPED).notes)).toHaveLength(0);
  });
});

describe("2.3 columns that are not card-shaped are unwrapped", () => {
  const withTable = `<Columns>
  <Column>
    ### Limits

    | Plan | Calls |
    | :--- | :---- |
    | Free | 100 |

    [Pricing](/docs/pricing)
  </Column>

  <Column>
    ### Overview

    Short summary.

    [More](/docs/more)
  </Column>
</Columns>`;

  it("unwraps the whole container when any column holds a table", () => {
    const { mdx, notes } = run(withTable);

    expect(mdx).not.toContain("Columns");
    expect(mdx).not.toContain("<Card");
    expect(blockers(notes).some((note) => note.detail.includes("contains a table"))).toBe(true);
  });

  it("keeps every piece of content when it unwraps", () => {
    const { mdx } = run(withTable);

    expect(mdx).toContain("### Limits");
    // The stringifier pads cells to align the column, so match the row loosely.
    expect(mdx).toMatch(/\|\s*Free\s*\|\s*100\s*\|/);
    expect(mdx).toContain("### Overview");
    expect(mdx).toContain("Short summary.");
    expect(mdx).toContain("[Pricing](/docs/pricing)");
  });

  it("keeps the source order when it unwraps", () => {
    const { mdx } = run(withTable);

    expect(mdx.indexOf("### Limits")).toBeLessThan(mdx.indexOf("### Overview"));
  });

  it("unwraps rather than inventing an href when a column has no link", () => {
    const source = `<Columns>
  <Column>
    ### No link here

    Just a sentence.
  </Column>

  <Column>
    ### Fine

    Short summary.

    [More](/docs/more)
  </Column>
</Columns>`;
    const { mdx, notes } = run(source);

    expect(mdx).not.toContain("<Card");
    expect(mdx).not.toContain("href=");
    expect(blockers(notes).some((note) => note.detail.includes("must not be invented"))).toBe(true);
  });

  it("unwraps a column with no heading or bold lead-in", () => {
    const source = `<Columns>
  <Column>
    Just prose with a [link](/docs/x) in it.
  </Column>
</Columns>`;
    const { notes } = run(source);

    expect(blockers(notes).some((note) => note.detail.includes("card title"))).toBe(true);
  });

  it("unwraps a column holding a code block", () => {
    const source = `<Columns>
  <Column>
    ### Install

    \`\`\`bash
    npm install
    \`\`\`

    [Docs](/docs/install)
  </Column>
</Columns>`;

    expect(blockers(run(source).notes).some((note) => note.detail.includes("contains a code"))).toBe(true);
  });

  it("unwraps a column that reads as prose rather than a summary", () => {
    const source = `<Columns>
  <Column>
    ### Long one

    First paragraph.

    Second paragraph.

    Third paragraph.

    [More](/docs/more)
  </Column>
</Columns>`;

    expect(blockers(run(source).notes).some((note) => note.detail.includes("reads as prose"))).toBe(true);
  });
});

describe("2.3 edge cases", () => {
  it("leaves an already-converted Columns + Card alone", () => {
    const source = `<Columns cols="2">
  <Card title="A" href="/a">First body.</Card>

  <Card title="B" href="/b">Second body.</Card>
</Columns>`;
    const { mdx, notes } = run(source);

    expect(mdx).toContain('<Columns cols="2">');
    expect((mdx.match(/<Card /g) ?? []).length).toBe(2);
    expect(blockers(notes)).toHaveLength(0);
  });

  it("unwraps a stranded Column and reports it", () => {
    const source = `<Column>\n  ### Orphan\n\n  Body text.\n</Column>`;
    const { mdx, notes } = run(source);

    expect(mdx).not.toContain("Column");
    expect(mdx).toContain("### Orphan");
    expect(mdx).toContain("Body text.");
    expect(blockers(notes).some((note) => note.detail.includes("outside any <Columns>"))).toBe(true);
  });

  it("is idempotent", () => {
    const once = run(CARD_SHAPED).mdx;
    const twice = run(once).mdx;

    expect(twice).toBe(once);
  });

  it("is idempotent for the unwrapped path too", () => {
    const source = `<Columns>\n  <Column>\n    Prose with no title.\n  </Column>\n</Columns>`;
    const once = run(source).mdx;
    const twice = run(once).mdx;

    expect(twice).toBe(once);
  });
});
