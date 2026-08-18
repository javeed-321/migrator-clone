import { describe, expect, it } from "vitest";

import { convertAccordions } from "../src/convert/accordion";
import { toMdx } from "../src/convert/one-to-one";
import type { ConversionNote } from "../src/convert/mdast";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertAccordions(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

const ONE = `<Accordion title="Troubleshooting connection issues" icon="fa-info-circle" iconColor="purple">
  Ensure your API key is valid and not expired.
</Accordion>`;

const TWO = `${ONE}

<Accordion title="Advanced configuration">
  Set \`retryAttempts\` in your config.
</Accordion>`;

describe("2.1 Accordion -> Expandable", () => {
  it("renames the tag and keeps the title", () => {
    const { mdx } = run(ONE);

    expect(mdx).toContain("<Expandable");
    expect(mdx).toContain('title="Troubleshooting connection issues"');
    expect(mdx).not.toContain("Accordion");
  });

  it("emits default-open=\"false\", because ReadMe's Accordion cannot start open", () => {
    expect(run(ONE).mdx).toContain('default-open="false"');
  });

  it("drops icon and iconColor, which do not exist on Expandable", () => {
    const { mdx, notes } = run(ONE);

    expect(mdx).not.toContain("icon");
    expect(notes.some((note) => note.detail.includes("no icon attribute"))).toBe(true);
  });

  it("keeps the body content", () => {
    expect(run(ONE).mdx).toContain("Ensure your API key is valid and not expired.");
  });

  it("leaves a lone accordion ungrouped", () => {
    expect(run(ONE).mdx).not.toContain("ExpandableGroup");
  });
});

describe("2.1 grouping adjacent siblings", () => {
  it("wraps a run of two in one ExpandableGroup", () => {
    const { mdx } = run(TWO);

    expect(mdx).toContain("<ExpandableGroup>");
    expect((mdx.match(/<Expandable /g) ?? []).length).toBe(2);
    expect((mdx.match(/<ExpandableGroup>/g) ?? []).length).toBe(1);
  });

  it("groups across a blank line — unlike fences, accordions have no opt-out", () => {
    const spaced = `<Accordion title="A">a</Accordion>

<Accordion title="B">b</Accordion>

<Accordion title="C">c</Accordion>`;
    const { mdx } = run(spaced);

    expect((mdx.match(/<ExpandableGroup>/g) ?? []).length).toBe(1);
    expect((mdx.match(/<Expandable /g) ?? []).length).toBe(3);
  });

  it("does not group across an intervening block", () => {
    const split = `<Accordion title="A">a</Accordion>

## A heading between them

<Accordion title="B">b</Accordion>`;
    const { mdx } = run(split);

    expect(mdx).not.toContain("ExpandableGroup");
    expect((mdx.match(/<Expandable /g) ?? []).length).toBe(2);
  });

  it("makes two groups when two runs are separated", () => {
    const source = `<Accordion title="A">a</Accordion>
<Accordion title="B">b</Accordion>

Text between the runs.

<Accordion title="C">c</Accordion>
<Accordion title="D">d</Accordion>`;
    const { mdx } = run(source);

    expect((mdx.match(/<ExpandableGroup>/g) ?? []).length).toBe(2);
  });

  it("groups within a container, not across it", () => {
    const source = `<Tabs>
  <Tab title="One">
    <Accordion title="A">a</Accordion>
    <Accordion title="B">b</Accordion>
  </Tab>
</Tabs>`;
    const { mdx } = run(source);

    expect((mdx.match(/<ExpandableGroup>/g) ?? []).length).toBe(1);
    expect(mdx).toContain("<Tab ");
  });
});

describe("2.1 reporting and re-runs", () => {
  it("flags a missing title rather than inventing one", () => {
    const { mdx, notes } = run(`<Accordion>\n  Body only.\n</Accordion>`);

    expect(mdx).not.toContain("title=");
    expect(notes.some((note) => note.level === "flag" && note.detail.includes("Click to expand"))).toBe(true);
  });

  it("is idempotent", () => {
    const once = run(TWO).mdx;
    const twice = run(once).mdx;

    expect(twice).toBe(once);
  });

  it("emits no raw HTML", () => {
    expect(run(TWO).mdx).not.toMatch(/<(div|span|details|summary|p)\b/);
  });
});
