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

/**
 * What `docs.readme.com/recipes/<missing-slug>.md` really answers — verbatim,
 * fetched 2026-08-25, and served with **HTTP 200**.
 *
 * Kept in full rather than trimmed to the two lines the check matches, because the
 * hazard is the shape of the whole page: it has a title, and it ends with a
 * heading and a link list that parse into a well-formed `<Step>`. A minimal
 * fixture would test the regex and miss the reason the regex exists.
 */
const NOT_FOUND = `---
updatedAt: 2026-04-19T03:56:30.000Z
---

Fetch the complete documentation index at: https://docs.readme.com/main/llms.txt. Use this file to discover all available pages before exploring further. Append .md to any documentation page URL to get its markdown version.

# 404

<br />

<div class="readme-tailwind">
  <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-[#008ef6] !mb-0">404</p>
      <h1 class="!mt-1 text-8xl font-bold tracking-tight text-gray-900 sm:text-9xl !mb-0">Page not found</h1>
      <p class="mt-4 text-lg text-gray-400 sm:text-xl">Sorry, we couldn't find the page you're looking for.</p>
    </div>
  </main>
</div>

<HTMLBlock>{\`
<style>.SuperHubCustomPage-content-header { display: none !important; }</style>
\`}</HTMLBlock>

<br />

# Sibling pages

* [Welcome to Our New Editing UI](https://docs.readme.com/main/page/welcome-to-our-new-editor-ui.md)
* [What is ReadMe Sync?](https://docs.readme.com/main/page/what-is-readme-sync.md)
* [What's a Custom Page?](https://docs.readme.com/main/page/custom-page.md)
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

  // The failure the status check cannot see. `NOT_FOUND` below is what
  // `docs.readme.com/recipes/<missing-slug>.md` really returns, verbatim and with
  // a 200 — title, marketing div, and a list of links that parses as a valid step.
  describe("a slug that does not exist", () => {
    it("refuses ReadMe's 404 page even though it arrives with a 200", async () => {
      const result = await convert(page, stubFetch(NOT_FOUND, 200));

      // The link list must not become a step, and the tag must survive so the
      // detector fences it and the page still says something is owed.
      expect(result.mdx).not.toContain("<Steps>");
      expect(result.mdx).not.toContain("Sibling pages");
      expect(result.mdx).toContain("<Recipe");
      expect(result.quarantined.map((entry) => entry.name)).toContain("Recipe");
      expect(result.outputCompiles).toBe(true);
    });

    it("reports it as a blocker that names the cause", async () => {
      const result = await convert(page, stubFetch(NOT_FOUND, 200));
      const note = recipeNotes(result.notes)[0];

      expect(note?.level).toBe("blocker");
      expect(note?.detail).toContain("page not found");
      // Never the note that says it worked.
      expect(recipeNotes(result.notes).some((entry) => entry.detail.startsWith("rebuilt"))).toBe(
        false,
      );
    });

    it("still converts a genuine recipe whose subject is 404s", async () => {
      // The title alone must not condemn a page: this one is a real recipe, and a
      // recipe is built around a code block, which a 404 page never has.
      const about404s = RECIPE.replace("# Create a Custom Component", "# 404").replace(
        "# Create an ExampleComponent",
        "# Handling a 404",
      );
      const result = await convert(page, stubFetch(about404s));

      expect(result.mdx).toContain('<Step title="Handling a 404">');
      expect(recipeNotes(result.notes)[0]?.level).toBe("change");
    });
  });

  it("handles <TutorialTile>, the deprecated alias", async () => {
    const result = await convert(`<TutorialTile slug="x" title="T" />\n`, stubFetch(RECIPE));
    expect(result.mdx).toContain("<Steps>");
    expect(result.mdx).not.toContain("<TutorialTile");
  });
});
