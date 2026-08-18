import { describe, expect, it } from "vitest";

import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { convertSteps } from "../src/convert/steps";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertSteps(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

/** Every step has a body — the shape that qualifies. */
const WITH_BODIES = `1. Install the dependencies.

   \`\`\`bash
   npm install documentation-ai
   \`\`\`

2. Configure your environment.

   Create a \`documentation.json\` file at the project root.`;

describe("2.8 lists that become Steps", () => {
  it("converts when every step has a body", () => {
    const { mdx } = run(WITH_BODIES);

    expect(mdx).toContain("<Steps>");
    expect((mdx.match(/<Step /g) ?? []).length).toBe(2);
  });

  it("uses the instruction line as the step title", () => {
    const { mdx } = run(WITH_BODIES);

    expect(mdx).toContain('<Step title="Install the dependencies.">');
    expect(mdx).toContain('<Step title="Configure your environment.">');
  });

  it("keeps each step's body", () => {
    const { mdx } = run(WITH_BODIES);

    expect(mdx).toContain("npm install documentation-ai");
    expect(mdx).toContain("Create a `documentation.json` file at the project root.");
  });

  it("leaves the numbering to the component", () => {
    const { mdx } = run(WITH_BODIES);

    expect(mdx).not.toMatch(/^\s*1\./m);
    expect(mdx).not.toMatch(/^\s*2\./m);
  });

  it("resolves inline markup in the title, which is a plain string attribute", () => {
    const source = "1. Run `npm install`.\n\n   It takes a moment.\n\n2. Open **the app**.\n\n   Then log in.";
    const { mdx } = run(source);

    expect(mdx).toContain('<Step title="Run npm install.">');
    expect(mdx).toContain('<Step title="Open the app.">');
  });

  it("never invents an icon or a title-type", () => {
    const { mdx } = run(WITH_BODIES);

    expect(mdx).not.toContain("icon=");
    expect(mdx).not.toContain("title-type");
  });

  it("reports the change", () => {
    const { notes } = run(WITH_BODIES);

    expect(notes.some((note) => note.rule === "steps" && note.level === "change")).toBe(true);
  });
});

describe("2.8 lists that stay lists", () => {
  it("keeps a one-line-per-step list", () => {
    const source = "1. Install the dependencies.\n2. Configure your environment.\n3. Start the server.";
    const { mdx, notes } = run(source);

    expect(mdx).not.toContain("<Steps>");
    expect(mdx).toContain("1. Install the dependencies.");
    expect(notes).toHaveLength(0);
  });

  it("keeps an unordered list, which is not a procedure", () => {
    const source = "- Install.\n\n  Run `npm install`.\n\n- Configure.\n\n  Edit the config.";

    expect(run(source).mdx).not.toContain("<Steps>");
  });

  it("keeps a single-item list", () => {
    expect(run("1. Install.\n\n   Run it.").mdx).not.toContain("<Steps>");
  });

  it("keeps a mixed list and reports it, rather than splitting one procedure", () => {
    const source = "1. Install.\n\n   Run `npm install`.\n\n2. Configure.\n3. Start.";
    const { mdx, notes } = run(source);

    expect(mdx).not.toContain("<Steps>");
    expect(notes.some((note) => note.level === "flag" && note.detail.includes("1 of 3"))).toBe(true);
  });

  it("keeps a list whose item opens with something other than an instruction line", () => {
    const source = "1. ```bash\n   npm install\n   ```\n\n   Then this.\n\n2. Configure.\n\n   And this.";

    expect(run(source).mdx).not.toContain("<Steps>");
  });
});

describe("2.8 nesting and re-runs", () => {
  it("converts a procedure nested inside another component", () => {
    const source = `<Tabs>
  <Tab title="macOS">
1. Install.

   Run \`brew install foo\`.

2. Verify.

   Run \`foo --version\`.
  </Tab>
</Tabs>`;
    const { mdx } = run(source);

    expect(mdx).toContain("<Steps>");
    expect(mdx).toContain("<Tab ");
  });

  it("is idempotent", () => {
    const once = run(WITH_BODIES).mdx;

    expect(run(once).mdx).toBe(once);
  });

  it("emits no raw HTML", () => {
    expect(run(WITH_BODIES).mdx).not.toMatch(/<(div|span|ol|li|p)\b/);
  });
});
