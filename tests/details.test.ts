import { describe, expect, it } from "vitest";

import { convertDetails } from "../src/convert/details";
import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[]; mode: string } {
  const { tree, mode } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertDetails(tree, notes);
  return { mdx: toMdx(tree).trim(), notes, mode };
}

/** The shape three Capillary pages use, written as strict MDX. */
const BLOCK = `<details>
  <summary>What is a loyalty program?</summary>

  A program that rewards repeat customers.
</details>`;

describe("3.1 details -> Expandable", () => {
  it("converts the block and keeps its body", () => {
    const { mdx } = run(BLOCK);

    expect(mdx).toContain("<Expandable");
    expect(mdx).toContain("A program that rewards repeat customers.");
    expect(mdx).not.toContain("<details");
  });

  it("uses the summary as the title", () => {
    expect(run(BLOCK).mdx).toContain('title="What is a loyalty program?"');
  });

  it("leaves no summary tag behind", () => {
    expect(run(BLOCK).mdx).not.toContain("summary");
  });

  it("records the closed state explicitly", () => {
    expect(run(BLOCK).mdx).toContain('default-open="false"');
  });

  it("carries <details open> across, which is the only reason the raw HTML exists", () => {
    const source = `<details open>\n  <summary>Read this first</summary>\n\n  Body.\n</details>`;

    expect(run(source).mdx).toContain('default-open="true"');
  });

  it("treats an explicit open={false} as closed", () => {
    const source = `<details open={false}>\n  <summary>Q</summary>\n\n  A.\n</details>`;

    expect(run(source).mdx).toContain('default-open="false"');
  });

  it("resolves inline markup in the title, which is a plain string attribute", () => {
    const source = `<details>\n  <summary>What is \`orgId\`?</summary>\n\n  Your org.\n</details>`;

    expect(run(source).mdx).toContain('title="What is orgId?"');
  });

  it("keeps body text that shared the summary's line", () => {
    const source = `<details>\n<summary>Q</summary>\nAnswer on the next line.\n</details>`;
    const { mdx } = run(source);

    expect(mdx).toContain('title="Q"');
    expect(mdx).toContain("Answer on the next line.");
  });

  it("converts the one-line form, which parses as inline JSX", () => {
    const { mdx } = run("<details><summary>Q</summary>A short answer.</details>");

    expect(mdx).toContain('<Expandable title="Q"');
    expect(mdx).toContain("A short answer.");
  });

  it("flags a <details> with no <summary> rather than inventing a title", () => {
    const { mdx, notes } = run("<details>\n\n  Just a body.\n\n</details>");

    expect(mdx).not.toContain("title=");
    expect(notes.some((note) => note.level === "flag" && note.detail.includes("no <summary>"))).toBe(
      true,
    );
  });

  it("reports the change", () => {
    const { notes } = run(BLOCK);

    expect(notes.some((note) => note.rule === "details" && note.level === "change")).toBe(true);
  });
});

describe("3.1 runs and nesting", () => {
  it("collapses adjacent blocks into one ExpandableGroup", () => {
    const source = `${BLOCK}\n\n<details>\n  <summary>How do I join?</summary>\n\n  Sign up.\n</details>`;
    const { mdx } = run(source);

    expect(mdx).toContain("<ExpandableGroup>");
    expect((mdx.match(/<Expandable /g) ?? []).length).toBe(2);
  });

  it("leaves a lone block ungrouped, since a group of one is chrome around nothing", () => {
    expect(run(BLOCK).mdx).not.toContain("ExpandableGroup");
  });

  it("does not group an <Expandable> the author already wrote", () => {
    const source = `<Expandable title="Mine">\n\n  Body.\n\n</Expandable>\n\n${BLOCK}`;

    expect(run(source).mdx).not.toContain("ExpandableGroup");
  });

  it("converts a block nested inside another component", () => {
    const source = `<Tabs>\n  <Tab title="macOS">\n\n${BLOCK}\n\n  </Tab>\n</Tabs>`;
    const { mdx } = run(source);

    expect(mdx).toContain("<Expandable");
    expect(mdx).toContain("<Tab ");
  });

  it("converts a block nested inside another block", () => {
    const source = `<details>\n  <summary>Outer</summary>\n\n${BLOCK}\n\n</details>`;
    const { mdx } = run(source);

    expect((mdx.match(/<Expandable /g) ?? []).length).toBe(2);
    expect(mdx).not.toContain("<details");
  });
});

describe("3.1 pages that fell back to the plain-markdown parser", () => {
  /** One unclosed `<br>` anywhere is enough to reject the whole page as MDX. */
  const FALLBACK = `<details>
<summary>What is a loyalty program?</summary>

A program that rewards repeat customers.

</details>

A line with a <br> in it.`;

  it("still converts when the block arrived as raw html nodes", () => {
    const { mdx, mode } = run(FALLBACK);

    expect(mode).toBe("markdown");
    expect(mdx).toContain('<Expandable title="What is a loyalty program?"');
    expect(mdx).toContain("A program that rewards repeat customers.");
    expect(mdx).not.toContain("<details");
    expect(mdx).not.toContain("</details>");
  });

  it("converts the tight form, where remark swallowed the block into one node", () => {
    const source = `<details>\n<summary>Q</summary>\nAn answer with a <br> in it.\n</details>`;
    const { mdx, mode } = run(source);

    expect(mode).toBe("markdown");
    expect(mdx).toContain('<Expandable title="Q"');
    expect(mdx).toContain("An answer");
  });

  it("reads open off the raw tag too", () => {
    const source = `<details open>\n<summary>Q</summary>\nAn answer with a <br>.\n</details>`;

    expect(run(source).mdx).toContain('default-open="true"');
  });

  it("blocks on a <details> with no closing tag instead of guessing where it ends", () => {
    const source = `<details>\n<summary>Q</summary>\n\nBody with a <br> in it.`;
    const { mdx, notes } = run(source);

    expect(mdx).toContain("<details>");
    expect(notes.some((note) => note.level === "blocker" && note.detail.includes("no closing tag"))).toBe(
      true,
    );
  });

  it("keeps the block whose closing tag is shared with other HTML, and blocks", () => {
    const source = `<details>\n<summary>Q</summary>\n\nBody.\n\n<div>x</div>\n</details>\n\nA <br> here.`;
    const { notes } = run(source);

    expect(notes.some((note) => note.level === "blocker")).toBe(true);
  });
});

describe("3.1 output shape", () => {
  it("emits no raw HTML", () => {
    expect(run(BLOCK).mdx).not.toMatch(/<(details|summary|div|span|p|br)\b/);
  });

  it("is idempotent", () => {
    const once = run(BLOCK).mdx;

    expect(run(once).mdx).toBe(once);
  });

  it("is idempotent for a grouped run", () => {
    const source = `${BLOCK}\n\n<details open>\n  <summary>Two</summary>\n\n  Second.\n</details>`;
    const once = run(source).mdx;

    expect(run(once).mdx).toBe(once);
  });
});
