import { describe, expect, it } from "vitest";

import type { ConversionNote } from "../src/convert/mdast";
import { convertReadmeMarkdown } from "../src/convert/run";

const convert = (source: string) => convertReadmeMarkdown(source);

const customNotes = (notes: ConversionNote[]) => notes.filter((note) => note.rule === "custom-component");

describe("custom-component detection", () => {
  // `Windows` is Route 2 in marketplace-conversion.md — decoration with no rule,
  // so it is still reported. A component that *does* have a rule (Spoiler,
  // GitHubBadge, …) is converted before this pass runs and must not appear here.
  it("flags a Marketplace component that has no conversion rule", async () => {
    const result = await convert(`<Windows header="README">\nThe hidden answer is 42.\n</Windows>\n`);

    expect(result.custom).toEqual([
      { name: "Windows", kind: "marketplace", line: 1, props: ["header"] },
    ]);
    expect(customNotes(result.notes)[0]).toMatchObject({ level: "flag" });
    expect(customNotes(result.notes)[0]?.detail).toContain("Marketplace");
  });

  it("flags a component defined on the page, and its export", async () => {
    const source = [
      "export const Note = props => <div className=\"p-4\">{props.children}</div>",
      "",
      "<Note kind=\"warn\">Body text here.</Note>",
      "",
    ].join("\n");

    const result = await convert(source);

    expect(result.custom).toEqual([{ name: "Note", kind: "local", line: 3, props: ["kind"] }]);

    const notes = customNotes(result.notes);
    expect(notes).toHaveLength(2);
    expect(notes[0]?.detail).toContain("export const");
    expect(notes[1]).toMatchObject({ level: "flag" });
  });

  it("blocks a custom component whose definition is not in the file", async () => {
    const result = await convert(`<PricingTile plan="pro" seats={5} />\n`);

    expect(result.custom).toEqual([
      { name: "PricingTile", kind: "unknown", line: 1, props: ["plan", "seats"] },
    ]);
    expect(customNotes(result.notes)[0]).toMatchObject({ level: "blocker" });
  });

  it("catches a self-closing component", async () => {
    const result = await convert(`<StatusPage title="Status" url="https://status.example.com" />\n`);

    expect(result.custom.map((entry) => entry.name)).toEqual(["StatusPage"]);
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

    const result = await convert(source);

    expect(result.custom.map((entry) => entry.kind)).toEqual(["local"]);
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
