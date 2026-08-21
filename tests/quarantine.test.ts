import { describe, expect, it } from "vitest";

import { convertReadmeMarkdown } from "../src/convert/run";
import type { ConversionNote } from "../src/convert/mdast";

const convert = (source: string) => convertReadmeMarkdown(source);

const customNotes = (notes: ConversionNote[]) => notes.filter((note) => note.rule === "custom-component");

describe("quarantining unconverted components", () => {
  it("fences an unknown component and keeps the page compiling", async () => {
    const result = await convert(
      `Intro.\n\n<CapillaryLoyaltyWidget program="gold">\n  Earn points.\n</CapillaryLoyaltyWidget>\n\nOutro.\n`,
    );

    // The whole point: an undefined JSX component is a compile error on the
    // target `[PIT Phase 5]`, and inside a fence it is not.
    expect(result.outputCompiles).toBe(true);
    expect(result.mdx).toContain("```mdx");
    expect(result.mdx).toContain('<CapillaryLoyaltyWidget program="gold">');
    // `[PIT Phase 2]` — the words survive, not just the tag.
    expect(result.mdx).toContain("Earn points.");
    expect(result.mdx).toContain("Intro.");
    expect(result.mdx).toContain("Outro.");
  });

  it("reports where each one was, with its source", async () => {
    const result = await convert(
      `# Title\n\n<CapillaryLoyaltyWidget program="gold" tier="1">\n  Earn points.\n</CapillaryLoyaltyWidget>\n`,
    );

    expect(result.quarantined).toHaveLength(1);
    expect(result.quarantined[0]).toMatchObject({
      name: "CapillaryLoyaltyWidget",
      kind: "unknown",
      line: 3,
      props: ["program", "tier"],
      inline: false,
    });
    expect(result.quarantined[0]?.source).toContain("Earn points.");
  });

  it("fences a block component written on one line, rather than backticking it", async () => {
    // On one line it parses as an inline element inside a paragraph. Backticks
    // would be safe but wrong-looking — a block component reads as a fence, and
    // a fence is what someone scanning for outstanding work looks for.
    const result = await convert(`<CapillaryLoyaltyWidget program="gold">Earn points.</CapillaryLoyaltyWidget>\n`);

    expect(result.quarantined[0]).toMatchObject({ name: "CapillaryLoyaltyWidget", inline: false });
    expect(result.mdx).toContain("```mdx");
    expect(result.outputCompiles).toBe(true);
  });

  it("uses inline code for a component inside a sentence", async () => {
    const result = await convert(`Text with a <Badge kind="new">NEW</Badge> in the middle.\n`);

    // A fenced block cannot go inside a paragraph — putting one there is the
    // invalid MDX this pass exists to prevent.
    expect(result.quarantined[0]).toMatchObject({ name: "Badge", inline: true });
    expect(result.mdx).not.toContain("```");
    expect(result.mdx).toContain("`<Badge kind=\"new\">NEW</Badge>`");
    expect(result.outputCompiles).toBe(true);
  });

  it("fences a Marketplace child orphaned from its parent", async () => {
    const result = await convert(`<ToggleListItem title="Orphan">Body.</ToggleListItem>\n`);

    expect(result.quarantined[0]).toMatchObject({ name: "ToggleListItem", kind: "marketplace" });
    expect(result.mdx).toContain("Body.");
    expect(result.outputCompiles).toBe(true);
  });

  it("does not quarantine the same content twice when components nest", async () => {
    const result = await convert(`<OuterThing>\n  <InnerThing>Words.</InnerThing>\n</OuterThing>\n`);

    // Descending into a node that is already inside a fence would emit the inner
    // one as a sibling of the fence holding it.
    expect(result.quarantined).toHaveLength(1);
    expect(result.quarantined[0]?.name).toBe("OuterThing");
    expect(result.quarantined[0]?.source).toContain("<InnerThing>");
    expect(result.mdx.match(/```mdx/g)).toHaveLength(1);
  });

  it("leaves converted components alone", async () => {
    const result = await convert(`<Accordion title="Details">\n  Body.\n</Accordion>\n`);

    expect(result.quarantined).toEqual([]);
    expect(result.mdx).not.toContain("```mdx");
  });

  it("writes one summary note naming every component it moved", async () => {
    const result = await convert(`<Alpha>One.</Alpha>\n\n<Beta>Two.</Beta>\n\n<Alpha>Three.</Alpha>\n`);

    const summary = customNotes(result.notes).find((note) => note.detail.includes("moved into code fences"));
    expect(summary).toBeDefined();
    expect(summary?.detail).toContain("3 unconverted components");
    // Named once each, not once per call site — that is how a real blocker gets buried.
    expect(summary?.detail).toContain("<Alpha>, <Beta>");
    expect(summary?.detail).toContain("delete it before publishing");
  });

  it("does nothing on a page that fell back to the plain parser", async () => {
    const result = await convert(`<Widget attr={>\n\nText.\n`);

    expect(result.parseMode).toBe("markdown");
    expect(result.quarantined).toEqual([]);
  });
});
