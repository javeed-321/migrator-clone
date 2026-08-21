import { describe, expect, it } from "vitest";

import { convertReadmeMarkdown } from "../src/convert/run";
import type { ConversionNote } from "../src/convert/mdast";

/** A real recipe `.md`, preamble and all — the shape ReadMe actually serves. */
const RECIPE = `---
updatedAt: 2025-12-02T01:12:05.000Z
---

Fetch the complete documentation index at: https://docs.readme.com/main/llms.txt. Use this file to discover all available pages before exploring further.

# Create a Custom Component

\`\`\`javascript JavaScript
export const Example = ({ children }) => {
  return <div>{children}</div>;
};
\`\`\`

# Create an ExampleComponent

<!-- javascript@1 -->

We're creating a React component called \`Example\`.

# Structuring the Component

<!-- javascript@2-8 -->

\`return (...)\` defines what the component renders.
`;

const stubFetch = (body: string, status = 200) =>
  (async () =>
    ({ ok: status >= 200 && status < 300, status, text: async () => body }) as unknown as Response) as typeof fetch;

const convert = (source: string, fetchImpl: typeof fetch, enabled = true) =>
  convertReadmeMarkdown(source, {
    site: "https://docs.readme.com",
    recipes: { enabled, fetchImpl },
  });

const page = `<Recipe slug="create-a-custom-component" title="Create a Custom Component" />\n`;

const recipeNotes = (notes: ConversionNote[]) => notes.filter((note) => note.rule === "recipe");

describe("converting a Recipe", () => {
  it("rebuilds it as Steps, one per heading", async () => {
    const result = await convert(page, stubFetch(RECIPE));

    expect(result.mdx).toContain("<Steps>");
    expect(result.mdx).toContain('<Step title="Create an ExampleComponent">');
    expect(result.mdx).toContain('<Step title="Structuring the Component">');
    expect(result.mdx).not.toContain("<Recipe");
    expect(result.outputCompiles).toBe(true);
  });

  it("lifts the shared code block out, with line numbers on", async () => {
    const result = await convert(page, stubFetch(RECIPE));

    // One block, shared by every step — so it is emitted once above them, and
    // `show-lines` is the only thing that keeps each step's range readable.
    expect(result.mdx).toContain('show-lines="true"');
    expect(result.mdx.match(/```javascript/g)).toHaveLength(1);
    expect(result.mdx).toContain("export const Example");
  });

  it("keeps each step's line range as text, since highlighting cannot survive", async () => {
    const result = await convert(page, stubFetch(RECIPE));

    expect(result.mdx).toContain("_Line 1_");
    expect(result.mdx).toContain("_Lines 2–8_");
    expect(recipeNotes(result.notes).some((note) => note.detail.includes("line highlighting"))).toBe(
      true,
    );
  });

  it("strips the llms.txt preamble the source injects into every .md", async () => {
    const result = await convert(page, stubFetch(RECIPE));
    expect(result.mdx).not.toContain("Fetch the complete documentation index");
  });

  it("leaves the tag alone when the fetch fails, so the detector fences it", async () => {
    const result = await convert(page, stubFetch("", 404));

    expect(result.mdx).toContain("```mdx");
    expect(result.mdx).toContain("<Recipe");
    expect(result.quarantined.map((entry) => entry.name)).toContain("Recipe");
    expect(recipeNotes(result.notes)[0]?.detail).toContain("answered 404");
    // The page still compiles, which is the point of leaving it rather than
    // replacing it with empty steps.
    expect(result.outputCompiles).toBe(true);
  });

  it("is off unless asked for, because the URL comes from the page", async () => {
    const result = await convertReadmeMarkdown(page, { site: "https://docs.readme.com" });

    expect(recipeNotes(result.notes)[0]?.level).toBe("flag");
    expect(recipeNotes(result.notes)[0]?.detail).toContain("recipes.enabled");
    expect(result.quarantined.map((entry) => entry.name)).toContain("Recipe");
  });

  it("blocks rather than guessing a URL when no site was given", async () => {
    const result = await convertReadmeMarkdown(page, {
      recipes: { enabled: true, fetchImpl: stubFetch(RECIPE) },
    });

    expect(recipeNotes(result.notes)[0]?.level).toBe("blocker");
    expect(recipeNotes(result.notes)[0]?.detail).toContain("has to be given as `site`");
  });

  it("handles <TutorialTile>, the deprecated alias", async () => {
    const result = await convert(`<TutorialTile slug="x" title="T" />\n`, stubFetch(RECIPE));
    expect(result.mdx).toContain("<Steps>");
    expect(result.mdx).not.toContain("<TutorialTile");
  });
});
