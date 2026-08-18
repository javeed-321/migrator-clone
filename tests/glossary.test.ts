import { describe, expect, it } from "vitest";

import { convertGlossary } from "../src/convert/glossary";
import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertGlossary(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

describe("2.6 the JSX form", () => {
  it("unwraps to the term and leaves no tag behind", () => {
    const { mdx } = run("<Glossary>Block</Glossary> is the smallest unit of a campaign.");

    expect(mdx).toBe("Block is the smallest unit of a campaign.");
    expect(mdx).not.toContain("Glossary");
  });

  it("reads the term attribute when there are no children", () => {
    expect(run(`<Glossary term="MLP" />`).mdx).toBe("MLP");
  });

  it("prefers the children over the attribute, as ReadMe does", () => {
    expect(run(`<Glossary term="MLP">Loyalty Program</Glossary>`).mdx).toBe("Loyalty Program");
  });

  it("keeps formatting the term carried", () => {
    expect(run("<Glossary>**Block**</Glossary> matters.").mdx).toBe("**Block** matters.");
  });

  it("unwraps every occurrence in a sentence", () => {
    const { mdx } = run("A <Glossary>Block</Glossary> holds a <Glossary>MLP</Glossary>.");

    expect(mdx).toBe("A Block holds a MLP.");
  });

  it("works inside other content", () => {
    const { mdx } = run("- A <Glossary>Block</Glossary> item\n- Another");

    expect(mdx).toContain("- A Block item");
    expect(mdx).not.toContain("Glossary");
  });
});

describe("2.6 the markdown shorthand", () => {
  it("unwraps <<glossary:term>>, which would otherwise render literally", () => {
    const { mdx } = run("**<<glossary:exogenous>>** and **<<glossary:endogenous>>**");

    expect(mdx).toBe("**exogenous** and **endogenous**");
    expect(mdx).not.toContain("<<");
  });

  it("leaves a plain <<variable>> alone — that is a different feature", () => {
    expect(run("Hi <<name>>!").mdx).toContain("<<name>>");
  });
});

describe("2.6 reporting", () => {
  it("names every term whose definition was lost, once", () => {
    const { notes } = run(
      "<Glossary>Block</Glossary>, <Glossary>Block</Glossary> and <<glossary:MLP>>.",
    );
    const flags = notes.filter((note) => note.level === "flag");

    expect(flags).toHaveLength(1);
    expect(flags[0]?.detail).toContain("Block");
    expect(flags[0]?.detail).toContain("MLP");
    expect(flags[0]?.detail).toContain("2 terms");
  });

  it("says nothing when a page has no glossary references", () => {
    expect(run("Just prose.").notes).toHaveLength(0);
  });
});

describe("2.6 re-runs", () => {
  it("is idempotent", () => {
    const source = "<Glossary>Block</Glossary> and <<glossary:MLP>>.";
    const once = run(source).mdx;

    expect(run(once).mdx).toBe(once);
  });

  it("emits no raw HTML", () => {
    expect(run("<Glossary>Block</Glossary>").mdx).not.toMatch(/<(span|div|p)\b/);
  });
});
