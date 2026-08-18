import { describe, expect, it } from "vitest";

import { convertCards } from "../src/convert/cards";
import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertCards(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

const blockers = (notes: ConversionNote[]) => notes.filter((note) => note.level === "blocker");

const THREE = `<Cards columns={3}>
  <Card title="First" href="https://readme.com" icon="fa-home" target="_blank" badge="New">
    Neque porro quisquam est.
  </Card>

  <Card title="Second" href="/docs/second" icon="fa-user">
    Lorem ipsum dolor sit amet.
  </Card>

  <Card title="Third" href="/docs/third">
    Ut enim ad minim veniam.
  </Card>
</Cards>`;

describe("2.2 Cards -> Columns", () => {
  it("replaces the container, because Documentation.AI has no <Cards>", () => {
    const { mdx } = run(THREE);

    expect(mdx).toContain('<Columns cols="3">');
    expect(mdx).not.toContain("Cards");
  });

  it("keeps the cards inside, in source order", () => {
    const { mdx } = run(THREE);

    expect(mdx.indexOf('title="First"')).toBeLessThan(mdx.indexOf('title="Second"'));
    expect(mdx.indexOf('title="Second"')).toBeLessThan(mdx.indexOf('title="Third"'));
    expect((mdx.match(/<Card /g) ?? []).length).toBe(3);
  });

  it("derives cols from the child count when columns is absent", () => {
    const source = `<Cards>\n  <Card title="A" href="/a">a</Card>\n  <Card title="B" href="/b">b</Card>\n</Cards>`;

    expect(run(source).mdx).toContain('<Columns cols="2">');
  });

  it("derives cols when columns is ReadMe's non-numeric auto-fit", () => {
    const source = `<Cards columns="auto-fit">\n  <Card title="A" href="/a">a</Card>\n</Cards>`;

    expect(run(source).mdx).toContain('<Columns cols="1">');
  });

  it("caps cols at the target maximum of 5", () => {
    const cards = Array.from({ length: 7 }, (_, i) => `  <Card title="C${i}" href="/c${i}">body</Card>`).join("\n");
    const { mdx, notes } = run(`<Cards columns={7}>\n${cards}\n</Cards>`);

    expect(mdx).toContain('<Columns cols="5">');
    expect(notes.some((note) => note.level === "flag" && note.detail.includes("capped"))).toBe(true);
  });

  it("drops cardWidth, which has no equivalent", () => {
    const source = `<Cards columns={2} cardWidth="200px">\n  <Card title="A" href="/a">a</Card>\n  <Card title="B" href="/b">b</Card>\n</Cards>`;
    const { mdx, notes } = run(source);

    expect(mdx).not.toContain("cardWidth");
    expect(notes.some((note) => note.detail.includes("cardWidth"))).toBe(true);
  });
});

describe("2.2 Card attributes", () => {
  it("maps the icon to Lucide and keeps title, href and target", () => {
    const { mdx } = run(THREE);

    expect(mdx).toContain('icon="house"'); // fa-home -> house
    expect(mdx).toContain('icon="user"');
    expect(mdx).toContain('target="_blank"');
    expect(mdx).toContain('href="https://readme.com"');
  });

  it("drops badge, iconColor and kind", () => {
    const source = `<Cards columns={1}>\n  <Card title="A" href="/a" badge="New" iconColor="purple" kind="tile">a</Card>\n</Cards>`;
    const { mdx, notes } = run(source);

    expect(mdx).not.toContain("badge");
    expect(mdx).not.toContain("iconColor");
    expect(mdx).not.toContain("kind=");
    expect(notes.some((note) => note.detail.includes("dropped"))).toBe(true);
  });

  it("never invents image, cta or horizontal", () => {
    const { mdx } = run(THREE);

    expect(mdx).not.toContain("image=");
    expect(mdx).not.toContain("cta=");
    expect(mdx).not.toContain("horizontal");
  });
});

describe("2.2 required target props are blockers, not guesses", () => {
  it("blocks a card with no href instead of inventing a destination", () => {
    const source = `<Cards columns={1}>\n  <Card title="Second Card" icon="fa-user">\n    Lorem ipsum.\n  </Card>\n</Cards>`;
    const { mdx, notes } = run(source);

    expect(blockers(notes).some((note) => note.detail.includes("no href"))).toBe(true);
    expect(mdx).not.toContain("href");
  });

  it("blocks a card with no title", () => {
    const source = `<Cards columns={1}>\n  <Card href="/a">\n    Body only.\n  </Card>\n</Cards>`;

    expect(blockers(run(source).notes).some((note) => note.detail.includes("no title"))).toBe(true);
  });

  it("blocks a card with no body", () => {
    const source = `<Cards columns={1}>\n  <Card title="A" href="/a" />\n</Cards>`;

    expect(blockers(run(source).notes).some((note) => note.detail.includes("no body"))).toBe(true);
  });

  it("blocks a non-Card child rather than wrapping it in a div", () => {
    const source = `<Cards columns={2}>\n  <Card title="A" href="/a">a</Card>\n\n  Some loose prose.\n</Cards>`;
    const { mdx, notes } = run(source);

    expect(blockers(notes).some((note) => note.detail.includes("<Card> children only"))).toBe(true);
    expect(mdx).not.toContain("<div");
  });

  it("counts only real cards when deriving cols", () => {
    const source = `<Cards>\n  <Card title="A" href="/a">a</Card>\n\n  Loose prose that is not a card.\n</Cards>`;

    expect(run(source).mdx).toContain('<Columns cols="1">');
  });
});

describe("2.2 standalone cards", () => {
  it("leaves a lone Card alone — it is valid on its own", () => {
    const source = `<Card title="Getting started" href="/docs/quickstart" icon="fa-rocket">\n  Ten minutes, start to finish.\n</Card>`;
    const { mdx } = run(source);

    expect(mdx).not.toContain("Columns");
    expect(mdx).toContain('icon="rocket"');
  });

  it("does not grid a run of bare cards, which would invent a layout", () => {
    const source = `<Card title="A" href="/a">a</Card>\n\n<Card title="B" href="/b">b</Card>`;
    const { mdx } = run(source);

    expect(mdx).not.toContain("Columns");
    expect((mdx.match(/<Card /g) ?? []).length).toBe(2);
  });

  it("converts a bare card's attributes exactly once", () => {
    const source = `<Card title="A" href="/a" badge="New">a</Card>`;
    const { notes } = run(source);

    expect(notes.filter((note) => note.detail.includes("dropped badge"))).toHaveLength(1);
  });
});

describe("2.2 reporting and re-runs", () => {
  it("is idempotent", () => {
    const once = run(THREE).mdx;
    const twice = run(once).mdx;

    expect(twice).toBe(once);
  });

  it("reports no blockers for a well-formed grid", () => {
    expect(blockers(run(THREE).notes)).toHaveLength(0);
  });

  it("emits no raw HTML", () => {
    expect(run(THREE).mdx).not.toMatch(/<(div|span|table|p|br)\b/);
  });
});
