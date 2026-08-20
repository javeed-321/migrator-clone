import { describe, expect, it } from "vitest";

import { parseMarkdown } from "../src/download/parse";
import { detectCustomComponents } from "../src/convert/custom-components";
import type { ConversionNote } from "../src/convert/mdast";
import { convertReadmeMarkdown } from "../src/convert/run";

/**
 * The detector on its own, with no pipeline in front of it.
 *
 * Needed for the `local` cases: `convertLocalComponents` now converts those and
 * puts the name in `localHandled`, so nothing reaches the detector through
 * `convertReadmeMarkdown`. What is being checked here is the classification, and
 * that still has to be right — it is what decides the level of the note.
 */
const detect = (source: string) => {
  const notes: ConversionNote[] = [];
  const found = detectCustomComponents(parseMarkdown(source).tree, notes);
  return { found, notes };
};

const convert = (source: string) => convertReadmeMarkdown(source);

const customNotes = (notes: ConversionNote[]) => notes.filter((note) => note.rule === "custom-component");

describe("custom-component detection", () => {
  // Every one of the 24 Marketplace components now has a rule, or is claimed by the
  // pass that owns its built-in name. What still reaches this pass is a Marketplace
  // *child* component found outside its parent — a real authoring error, since a
  // `<ToggleListItem>` alone renders nothing and its parent consumes it otherwise.
  it("flags a Marketplace child component orphaned from its parent", async () => {
    const result = await convert(`<ToggleListItem title="Orphan">Body.</ToggleListItem>\n`);

    expect(result.custom).toEqual([
      { name: "ToggleListItem", kind: "marketplace", line: 1, props: ["title"] },
    ]);
    expect(customNotes(result.notes)[0]).toMatchObject({ level: "flag" });
    expect(customNotes(result.notes)[0]?.detail).toContain("Marketplace");
  });

  it("classifies a component defined on the page as local, and flags its export", () => {
    const source = [
      "export const Note = props => <div className=\"p-4\">{props.children}</div>",
      "",
      "<Note kind=\"warn\">Body text here.</Note>",
      "",
    ].join("\n");

    const { found, notes } = detect(source);

    expect(found).toEqual([{ name: "Note", kind: "local", line: 3, props: ["kind"] }]);
    expect(notes).toHaveLength(2);
    expect(notes[0]?.detail).toContain("export const");
    expect(notes[1]).toMatchObject({ level: "flag" });
  });

  // In the pipeline the same page is converted rather than reported, and the
  // definition goes with it — a local component is only a finding when nothing
  // could be done with it.
  it("leaves nothing for the detector once the local pass has run", async () => {
    const result = await convert(
      [
        "export const Note = props => <div className=\"bg-blue-50 p-4\">{props.children}</div>",
        "",
        "<Note>Body text here.</Note>",
        "",
      ].join("\n"),
    );

    expect(result.custom).toEqual([]);
    expect(customNotes(result.notes)).toEqual([]);
    expect(result.mdx).toContain('<Callout kind="info">');
  });

  it("blocks a custom component whose definition is not in the file", async () => {
    const result = await convert(`<PricingTile plan="pro" seats={5} />\n`);

    expect(result.custom).toEqual([
      { name: "PricingTile", kind: "unknown", line: 1, props: ["plan", "seats"] },
    ]);
    expect(customNotes(result.notes)[0]).toMatchObject({ level: "blocker" });
  });

  it("catches a self-closing component", async () => {
    const result = await convert(`<SimpleStep header="Orphan" />\n`);

    expect(result.custom.map((entry) => entry.name)).toEqual(["SimpleStep"]);
  });

  // A rule that declines leaves its node in place and pushes its own precise
  // blocker. Reporting it again here would be a duplicate, and would call a
  // documented component "a definition not in this file".
  it("does not re-report a component whose rule declined", async () => {
    const result = await convert(`<PostmanRunButton collectionId="1" />\n`);

    expect(result.custom).toEqual([]);
    expect(result.notes.filter((note) => note.level === "blocker")).toHaveLength(1);
  });

  it("says nothing about a Marketplace component the conversion pass already handled", async () => {
    const result = await convert(`<Spoiler overlayColor="black">Hidden.</Spoiler>\n`);

    expect(result.custom).toEqual([]);
    expect(result.mdx).toContain("<Expandable");
  });

  it("catches a component written inline in a paragraph", async () => {
    const result = await convert(`Prices start at <PricingTile plan="pro" /> per seat.\n`);

    expect(result.custom.map((entry) => entry.kind)).toEqual(["unknown"]);
  });

  it("prefers the page's own definition over the Marketplace table", async () => {
    const source = [
      "export const Spoiler = props => <div>{props.children}</div>",
      "",
      "<Spoiler>Hidden.</Spoiler>",
      "",
    ].join("\n");

    // Classified from the page, not from the table.
    expect(detect(source).found.map((entry) => entry.kind)).toEqual(["local"]);

    // And converted from the page too: this Spoiler is a bare `<div>`, so it
    // unwraps. The Marketplace rule would have made it an `<Expandable>`, which
    // is a component this site does not have.
    const result = await convert(source);
    expect(result.mdx.trim()).toBe("Hidden.");
    expect(result.mdx).not.toContain("Expandable");
  });

  // The two ways this pass can be wrong.

  it("says nothing about a component an earlier pass already converted", async () => {
    const result = await convert(`<Accordion title="Why">Because.</Accordion>\n`);

    expect(result.custom).toEqual([]);
    expect(customNotes(result.notes)).toEqual([]);
  });

  it("says nothing about prose that merely mentions a component", async () => {
    const result = await convert("The `<Callout>` component takes a kind, and `<QuizGame>` does not exist here.\n");

    expect(result.custom).toEqual([]);
    expect(customNotes(result.notes)).toEqual([]);
  });

  it("says nothing about a tag inside a code fence", async () => {
    const result = await convert("```jsx\n<Spoiler>Not real.</Spoiler>\n```\n");

    expect(result.custom).toEqual([]);
  });
});
