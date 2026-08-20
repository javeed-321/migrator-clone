import { describe, expect, it } from "vitest";

import { parseJsLiteral, parseRecord, parseRecordArray } from "../src/convert/marketplace/js-literal";
import { convertReadmeMarkdown } from "../src/convert/run";

const convert = (source: string) => convertReadmeMarkdown(source);
const mkNotes = (notes: { rule: string; detail: string; level: string }[]) =>
  notes.filter((note) => note.rule === "marketplace");

describe("js-literal", () => {
  it("reads the shapes real components use", () => {
    expect(parseRecord("{ Free: false, Business: true, Enterprise: true }")).toEqual({
      Free: false, Business: true, Enterprise: true,
    });
    expect(parseRecordArray("[{ 'code': 'X', 'status': 'Not Found' },]")).toEqual([
      { code: "X", status: "Not Found" },
    ]);
    expect(parseJsLiteral("{ a: 1, /* note */ b: [1, 2.5, -3], c: null }")).toEqual({
      a: 1, b: [1, 2.5, -3], c: null,
    });
  });

  it("refuses anything that is not a literal, rather than guessing", () => {
    expect(parseJsLiteral("someVariable")).toBeNull();
    expect(parseJsLiteral("{ a: fn() }")).toBeNull();
    expect(parseJsLiteral("`${interpolated}`")).toBeNull();
    expect(parseJsLiteral("{ a: 1 } + {}")).toBeNull();
  });
});

describe("marketplace conversion", () => {
  it("Spoiler -> Expandable", async () => {
    const r = await convert(`<Spoiler overlayColor="black">\nThe answer is 42.\n</Spoiler>\n`);
    expect(r.mdx).toContain('<Expandable title="Click to reveal" default-open="false">');
    expect(r.mdx).toContain("The answer is 42.");
    expect(r.custom).toEqual([]);
  });

  it("KeyPress -> Expandable naming the combo, content kept", async () => {
    const r = await convert(`<KeyPress keyCombo="Ctrl+Alt+a">\nSecret content.\n</KeyPress>\n`);
    expect(r.mdx).toContain('title="Press Ctrl+Alt+a"');
    expect(r.mdx).toContain("Secret content.");
  });

  it("ContentModal lifts its content prop into the body", async () => {
    const r = await convert(`<ContentModal label="Open" title="Rate limits" content="60 requests per minute." />\n`);
    expect(r.mdx).toContain('<Expandable title="Rate limits"');
    expect(r.mdx).toContain("60 requests per minute.");
  });

  it("Terminal -> a bash fence", async () => {
    const r = await convert("<Terminal>{`\n  $ npm install\n  added 1 package\n`}</Terminal>\n");
    expect(r.mdx).toContain("```bash");
    expect(r.mdx).toContain("$ npm install");
    expect(r.mdx).toContain("added 1 package");
  });

  it("GitHubBadge -> a live Image", async () => {
    const r = await convert(`<GitHubBadge owner="readmeio" repo="marketplace" workflow="ci.yml" />\n`);
    expect(r.mdx).toContain(
      "https://github.com/readmeio/marketplace/actions/workflows/ci.yml/badge.svg?branch=main",
    );
    expect(r.mdx).toContain('alt="ci.yml status"');
  });

  it("Banner inline -> Callout; header mode is a blocker that keeps the text", async () => {
    const inline = await convert(`<Banner isInline={true} message="Heads up!" color="#118cfd" />\n`);
    expect(inline.mdx).toContain('<Callout kind="info">');
    expect(inline.mdx).toContain("Heads up!");
    expect(inline.mdx).not.toContain("#118cfd");

    const header = await convert(`<Banner message="Site wide" color="#118cfd" />\n`);
    const note = mkNotes(header.notes)[0]!;
    expect(note.level).toBe("blocker");
    expect(note.detail).toContain("Site wide");
  });

  it("ToggleList -> ExpandableGroup", async () => {
    const r = await convert(
      `<ToggleList>\n  <ToggleListItem title="One">First.</ToggleListItem>\n  <ToggleListItem title="Two">Second.</ToggleListItem>\n</ToggleList>\n`,
    );
    expect(r.mdx).toContain("<ExpandableGroup>");
    expect(r.mdx).toContain('<Expandable title="One"');
    expect(r.mdx).toContain('<Expandable title="Two"');
  });

  it("SimpleStepper -> Steps with header as title", async () => {
    const r = await convert(
      `<SimpleStepper>\n  <SimpleStep header="Install">Run npm i.</SimpleStep>\n</SimpleStepper>\n`,
    );
    expect(r.mdx).toContain("<Steps>");
    expect(r.mdx).toContain('<Step title="Install">');
    expect(r.mdx).toContain("Run npm i.");
  });

  it("Grid unwraps its children and never invents an href", async () => {
    const r = await convert(`<Grid columns={2}>\n  First item.\n\n  Second item.\n</Grid>\n`);
    expect(r.mdx).toContain("First item.");
    expect(r.mdx).toContain("Second item.");
    expect(r.mdx).not.toContain("<Card");
    expect(mkNotes(r.notes)[0]?.level).toBe("flag");
  });

  it("Compatibility -> heading, subtitle and a table", async () => {
    const r = await convert(
      `<Compatibility title="Feature Name" subtitle="What it does" plans={{ Free: false, Business: true }} />\n`,
    );
    expect(r.mdx).toContain("### Feature Name");
    expect(r.mdx).toContain("What it does");
    expect(r.mdx).toMatch(/\| Plan\s+\| Available\s+\|/);
    expect(r.mdx).toMatch(/\| Free\s+\| —\s+\|/);
    expect(r.mdx).toMatch(/\| Business\s+\| ✅\s+\|/);
  });

  it("AdvancedTable -> a table, with braces disarmed", async () => {
    const r = await convert(
      `<AdvancedTable data={[{ 'code': 'CATEGORY_NOTFOUND', 'message': "Slug '{category}' not found." }]} />\n`,
    );
    expect(r.mdx).toMatch(/\| Code\s+\| Message\s+\|/);
    expect(r.mdx).toContain("CATEGORY");
    // The brace must not survive as a live MDX expression.
    expect(r.mdx).toContain("`{category}`");
    expect(r.outputCompiles).toBe(true);
  });

  it("QuizGame keeps the options and the answer", async () => {
    const r = await convert(
      `<QuizGame question="Which status means Not Found?" options={[{ text: '200', isCorrect: false }, { text: '404', isCorrect: true }]} />\n`,
    );
    expect(r.mdx).toContain("Which status means Not Found?");
    expect(r.mdx).toContain("- 200");
    expect(r.mdx).toContain("- 404");
    expect(r.mdx).toContain('<Expandable title="Show answer"');
  });

  it("blocks rather than guesses when the data cannot be read", async () => {
    const r = await convert(`<AdvancedTable data={buildRows()} />\n`);
    expect(mkNotes(r.notes)[0]?.level).toBe("blocker");
    // The node is left in place, so nothing is silently dropped.
    expect(r.mdx).toContain("AdvancedTable");
  });

  it("leaves Route 3 components to the detector instead of guessing a link", async () => {
    const r = await convert(`<StatusPage title="Status" url="https://status.example.com" />\n`);
    expect(mkNotes(r.notes)).toEqual([]);
    expect(r.custom.map((entry) => entry.name)).toEqual(["StatusPage"]);
  });

  it("does not touch names an earlier pass already owns", async () => {
    const r = await convert(`<Accordion title="Why">Because.</Accordion>\n`);
    expect(mkNotes(r.notes)).toEqual([]);
    expect(r.mdx).toContain("<Expandable");
  });
});
