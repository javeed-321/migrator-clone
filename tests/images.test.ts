import { describe, expect, it } from "vitest";

import { altFromSrc, convertImages } from "../src/convert/images";
import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { convertReadmeMarkdown } from "../src/convert/run";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertImages(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

/** The canonical Capillary image: five attributes, one of them usable. */
const CANONICAL =
  '<Image align="center" border={true} width="80% " src="https://files.readme.io/abc-flow.png" className="border" alt="Password validation flow" />';

describe("3.5 the ReadMe <Image>", () => {
  it("keeps src and alt and drops the presentation attributes", async () => {
    expect(run(CANONICAL).mdx).toBe(
      '<Image src="https://files.readme.io/abc-flow.png" alt="Password validation flow" caption=" " />',
    );
  });

  it("drops a percentage width, which the component would read as pixels", async () => {
    const { mdx, notes } = run(CANONICAL);

    expect(mdx).not.toContain("width");
    expect(notes.some((note) => note.detail.includes("parseInt"))).toBe(true);
  });

  it('drops width="smart", which falls back to the default anyway', () => {
    const source = '<Image src="https://files.readme.io/a.png" alt="A" width="smart" />';

    expect(run(source).mdx).not.toContain("width");
  });

  it("emits src, alt and caption — every other prop has a safe default", async () => {
    const source = '<Image src="https://files.readme.io/logo.png" alt="Acme logo" width="120" />';

    expect(run(source).mdx).toBe(
      '<Image src="https://files.readme.io/logo.png" alt="Acme logo" caption=" " />',
    );
  });

  it("flags a dropped pixel width, since that one was a real size", async () => {
    const source = '<Image src="https://files.readme.io/logo.png" alt="Acme logo" width="120" />';
    const { notes } = run(source);

    expect(
      notes.some((note) => note.level === "flag" && note.detail.includes("800x600 default")),
    ).toBe(true);
  });

  it("does not flag a percentage or smart width, which were never real sizes", async () => {
    for (const width of ['80% ', 'smart']) {
      const { notes } = run(`<Image src="https://files.readme.io/a.png" alt="A" width="${width}" />`);

      expect(notes.some((note) => note.detail.includes("800x600 default"))).toBe(false);
    }
  });

  it("uses caption as the alt when there is no alt, and keeps the caption", async () => {
    const source = '<Image src="https://files.readme.io/a.png" caption="A flow chart" />';
    const { mdx } = run(source);

    expect(mdx).toContain('alt="A flow chart"');
    expect(mdx).toContain('caption="A flow chart"');
  });

  it("keeps a caption that says something different from the alt", async () => {
    const source = '<Image src="https://files.readme.io/a.png" alt="Flow chart" caption="Figure 2" />';
    const { mdx } = run(source);

    expect(mdx).toContain('alt="Flow chart"');
    expect(mdx).toContain('caption="Figure 2"');
  });

  it("writes a blank caption on every image, so the alt is not published as one", async () => {
    for (const source of [
      CANONICAL,
      "![A flow chart](https://files.readme.io/a.png)",
      '<img src="https://files.readme.io/a.png" alt="A">',
    ]) {
      expect(run(source).mdx).toContain('caption=" "');
    }
  });

  it("does not read the blank caption back as alt text on a second run", async () => {
    const once = run('<Image src="https://files.readme.io/9f8e7d6c5b4a.png" />').mdx;

    expect(run(once).mdx).toBe(once);
    expect(run(once).mdx).not.toContain('alt=" "');
  });

  it("reads a caption written as children, which ReadMe also allows", async () => {
    const source = '<Image src="https://files.readme.io/Blocks.png">\n  Owlbert!\n</Image>';
    const { mdx, notes } = run(source);

    expect(mdx).toContain('caption="Owlbert!"');
    expect(notes.some((note) => note.detail.includes("children"))).toBe(true);
  });

  it("lets children win over the attribute, as ReadMe does", async () => {
    const source =
      '<Image src="https://files.readme.io/a.png" alt="A" caption="Attribute">\n  Children win\n</Image>';

    expect(run(source).mdx).toContain('caption="Children win"');
  });

  it("blocks on an image with no src", async () => {
    const { notes } = run('<Image alt="Nothing" />');

    expect(notes.some((note) => note.level === "blocker" && note.detail.includes("no src"))).toBe(true);
  });
});

describe("3.5 alt is required", () => {
  it("derives one from the file name and flags it", async () => {
    const source = '<Image src="https://files.readme.io/f1f2d3a-password_validate.jpg" />';
    const { mdx, notes } = run(source);

    expect(mdx).toContain('alt="Password validate"');
    expect(notes.some((note) => note.level === "flag" && note.detail.includes("file name"))).toBe(true);
  });

  it("strips the upload hash before reading the name", async () => {
    expect(altFromSrc("https://files.readme.io/f1f2d3a-password_validate.jpg")).toBe(
      "Password validate",
    );
  });

  it("gives nothing back for a name with no words in it", async () => {
    expect(altFromSrc("https://files.readme.io/9f8e7d6c5b4a.png")).toBeUndefined();
  });

  it("blocks when no alt can be found at all", async () => {
    const { notes } = run('<Image src="https://files.readme.io/9f8e7d6c5b4a.png" />');

    expect(notes.some((note) => note.level === "blocker" && note.detail.includes("alt is required"))).toBe(
      true,
    );
  });

  it("does not flag an alt the author wrote", async () => {
    const { notes } = run(CANONICAL);

    expect(notes.some((note) => note.detail.includes("file name"))).toBe(false);
  });
});

describe("3.5 the markdown form", () => {
  it("becomes <Image>, which is the only form rendered as a component", async () => {
    const { mdx } = run("![Password validation flow](https://files.readme.io/a.jpg)");

    expect(mdx).toBe(
      '<Image src="https://files.readme.io/a.jpg" alt="Password validation flow" caption=" " />',
    );
  });

  it("drops the title, which has no target attribute", async () => {
    const { mdx, notes } = run('![A](https://files.readme.io/a.jpg "the title")');

    expect(mdx).not.toContain("the title");
    expect(notes.some((note) => note.detail.includes("image title"))).toBe(true);
  });

  it("leaves an image inside a sentence alone, and says why", async () => {
    const source = "Click the ![Acme logo](https://files.readme.io/logo.png) button.";
    const { mdx, notes } = run(source);

    expect(mdx).toContain("![Acme logo](https://files.readme.io/logo.png)");
    expect(notes.some((note) => note.level === "flag" && note.detail.includes("<figure>"))).toBe(true);
  });

  it("leaves a linked image alone, since a figure cannot sit in a link", async () => {
    const source = "[![Acme logo](https://files.readme.io/logo.png)](https://acme.test)";
    const { mdx, notes } = run(source);

    expect(mdx).toContain("![Acme logo]");
    expect(notes.some((note) => note.detail.includes("inside a link"))).toBe(true);
  });
});

describe("3.5 raw HTML and fallback pages", () => {
  /** One unclosed <img> rejects the whole page, so every tag on it is raw. */
  const FALLBACK = `<Image align="center" border={true} src="https://files.readme.io/abc-flow.png" alt="Flow chart" />

<img src="https://files.readme.io/acme-logo.png" width="120">`;

  it("converts an <img> that cannot parse as JSX because it is unclosed", async () => {
    const { mdx } = run(FALLBACK);

    expect(mdx).toContain('<Image src="https://files.readme.io/acme-logo.png"');
    expect(mdx).not.toContain("<img");
  });

  it("flags the logo's dropped pixel width through the raw path too", async () => {
    const { mdx, notes } = run(FALLBACK);

    expect(mdx).not.toContain("width");
    expect(notes.some((note) => note.detail.includes("logo"))).toBe(true);
  });

  it("still converts the <Image> tags that the unclosed <img> pushed into raw HTML", async () => {
    const { mdx } = run(FALLBACK);

    expect(mdx).toContain(
      '<Image src="https://files.readme.io/abc-flow.png" alt="Flow chart" caption=" " />',
    );
    expect(mdx).not.toContain("align");
  });
});

const result = await convertReadmeMarkdown(
  `${CANONICAL}\n\n![A flow chart](https://files.readme.io/b.png)\n\n<img src="https://files.readme.io/acme-logo.png" width="120">`,
);

describe("3.5 through the pipeline", () => {

  it("converts every form on one page", async () => {
    expect((result.mdx.match(/<Image /g) ?? []).length).toBe(3);
    expect(result.mdx).not.toContain("<img");
    expect(result.mdx).not.toContain("![");
  });

  it("leaves every src on the host the page was authored against", async () => {
    // The target renders an external URL directly, so the working URL is the one
    // to keep — repointing at a local path is a re-hosting decision, not a
    // conversion one.
    expect((result.mdx.match(/src="https:\/\/files\.readme\.io\//g) ?? []).length).toBe(3);
    expect(result.mdx).not.toContain('src="/images/');
  });

  it("is idempotent", async () => {
    expect((await convertReadmeMarkdown(result.mdx)).mdx).toBe(result.mdx);
  });

  it("reports nothing on a second run, since nothing changes", async () => {
    const again = await convertReadmeMarkdown(result.mdx);

    expect(again.notes.filter((note) => note.rule === "image" && note.level === "change")).toHaveLength(0);
  });
});
