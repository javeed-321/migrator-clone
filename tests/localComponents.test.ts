import { describe, expect, it } from "vitest";

import { classifyShape, toneOf } from "../src/convert/local/shapes";
import { convertReadmeMarkdown } from "../src/convert/run";

const convert = (source: string) => convertReadmeMarkdown(source);
const localNotes = (notes: { rule: string; detail: string; level: string }[]) =>
  notes.filter((note) => note.rule === "local-component");

const lines = (...parts: string[]) => parts.join("\n");

describe("shape classifier", () => {
  it("reads the tone from a strong colour before the name", () => {
    // A box named Note but painted red is red on the page, and the reader sees
    // the colour.
    expect(toneOf("Note", '<div className="bg-red-50 border-red-500">')).toBe("danger");
    // Grey and blue are what an undecorated box looks like, so the name wins.
    expect(toneOf("Warning", '<div className="bg-slate-50 border">')).toBe("alert");
    // Nothing to go on at all is not a callout.
    expect(toneOf("Box", "<div>")).toBeNull();
  });

  it("claims the four wrapper shapes", () => {
    expect(classifyShape("Note", "export const Note = p => <div className='bg-blue-50 p-4'>{p.children}</div>"))
      .toEqual({ kind: "callout", tone: "info" });

    expect(classifyShape("Box", "export const Box = p => <div>{p.children}</div>"))
      .toEqual({ kind: "unwrap" });

    expect(
      classifyShape(
        "Panel",
        "export const Panel = ({title, children}) => <div className='bg-amber-50'><b>{title}</b><div>{children}</div></div>",
      ),
    ).toEqual({ kind: "titled", tone: "alert", titleProp: "title" });

    expect(
      classifyShape(
        "Toggle",
        "export const Toggle = ({header, children}) => { const [o, s] = useState(false); return <div><button>{header}</button>{children}</div> }",
      ),
    ).toEqual({ kind: "expandable", titleProp: "header" });
  });

  it("blocks rather than guesses, and says which signal stopped it", () => {
    const shapes = {
      network: classifyShape("Live", "export const Live = ({url, children}) => { fetch(url); return <div>{children}</div> }"),
      list: classifyShape("Rows", "export const Rows = ({items, children}) => <ul>{items.map(i => <li>{i}</li>)}{children}</ul>"),
      noChildren: classifyShape("Badge", "export const Badge = ({label}) => <span className='bg-red-500'>{label}</span>"),
      interactive: classifyShape("Quiz", "export const Quiz = ({children}) => { const [n, s] = useState(0); return <div>{children}</div> }"),
    };

    for (const shape of Object.values(shapes)) expect(shape.kind).toBe("blocked");
    expect(shapes.network.kind === "blocked" && shapes.network.why).toContain("network");
    expect(shapes.list.kind === "blocked" && shapes.list.why).toContain("`.map`");
    expect(shapes.noChildren.kind === "blocked" && shapes.noChildren.why).toContain("`children`");
    expect(shapes.interactive.kind === "blocked" && shapes.interactive.why).toContain("no title");
  });

  it("classifies each definition against its own source, not its neighbour's", () => {
    // Both live in one `mdxjsEsm` node. Reading the node whole would let
    // Toggle's useState block Note, which does nothing of the kind.
    const source = lines(
      "export const Note = p => <div className='bg-blue-50 p-4'>{p.children}</div>",
      "export const Toggle = ({title, children}) => { const [o, s] = useState(false); return <div><b>{title}</b>{children}</div> }",
      "",
      "<Note>a</Note>",
      "",
      "<Toggle title='t'>b</Toggle>",
    );

    return convert(source).then((result) => {
      expect(result.mdx).toContain('<Callout kind="info">');
      expect(result.mdx).toContain('<Expandable title="t"');
      expect(result.mdx).not.toContain("export const");
    });
  });
});

describe("local component conversion", () => {
  it("converts every usage and removes the definition", async () => {
    const { mdx, notes, custom, outputCompiles } = await convert(
      lines(
        'export const Note = props => <div className="rounded bg-blue-50 p-4 border-l-4 border-blue-500">{props.children}</div>',
        "",
        "<Note>Free accounts get 60 requests per minute.</Note>",
        "",
        "<Note>",
        "",
        "Tokens expire after 24 hours.",
        "",
        "</Note>",
      ),
    );

    expect(mdx).not.toContain("export const");
    expect(mdx).not.toContain("<Note>");
    expect(mdx.match(/<Callout kind="info">/g)).toHaveLength(2);
    expect(mdx).toContain("Free accounts get 60 requests per minute.");
    expect(mdx).toContain("Tokens expire after 24 hours.");
    expect(outputCompiles).toBe(true);
    // Removed and reported, so nothing is left for the detector to find.
    expect(custom).toEqual([]);

    // One note for the component, not one per call site.
    const reported = localNotes(notes);
    expect(reported).toHaveLength(1);
    expect(reported[0]?.detail).toContain("2 uses");
  });

  it("keeps the words when the component is used inside a sentence", async () => {
    const { mdx, notes, outputCompiles } = await convert(
      lines(
        'export const Note = props => <div className="bg-blue-50 p-4">{props.children}</div>',
        "",
        "See the <Note>short aside</Note> in the middle of a sentence.",
      ),
    );

    // A <Callout> is a block and cannot sit inside a paragraph, so the box goes
    // and the text stays.
    expect(mdx).toContain("See the short aside in the middle of a sentence.");
    expect(mdx).not.toContain("Callout");
    expect(outputCompiles).toBe(true);
    expect(localNotes(notes)[0]?.level).toBe("flag");
  });

  it("falls back to plain content for one usage without abandoning the rest", async () => {
    const { mdx, notes } = await convert(
      lines(
        "export const Toggle = ({title, children}) => { const [o, s] = useState(false); return <div><b>{title}</b>{children}</div> }",
        "",
        '<Toggle title="Advanced options">',
        "",
        "Set retries to 3.",
        "",
        "</Toggle>",
        "",
        "<Toggle>",
        "",
        "This one has no title.",
        "",
        "</Toggle>",
      ),
    );

    expect(mdx).toContain('<Expandable title="Advanced options"');
    expect(mdx).toContain("This one has no title.");
    expect(mdx).not.toContain("<Toggle");
    expect(localNotes(notes)[0]?.detail).toContain("could not take a block component");
  });

  it("converts the inner usage before the outer one moves it", async () => {
    const { mdx, outputCompiles } = await convert(
      lines(
        'export const Note = props => <div className="bg-yellow-50 border p-4">{props.children}</div>',
        "",
        "<Note>",
        "",
        "<Note>",
        "",
        "inner",
        "",
        "</Note>",
        "",
        "</Note>",
      ),
    );

    expect(mdx.match(/<Callout kind="alert">/g)).toHaveLength(2);
    expect(mdx).toContain("inner");
    expect(outputCompiles).toBe(true);
  });

  it("leaves a blocked component and its definition exactly as they were", async () => {
    const source = lines(
      'export const Live = ({ url, children }) => { fetch(url); return <div>{children}</div> }',
      "",
      '<Live url="https://x.test/a">fallback</Live>',
    );
    const { mdx, notes, custom } = await convert(source);

    // Nothing removed: a definition may only go once nothing points at it.
    expect(mdx).toContain("export const Live");
    expect(mdx).toContain("<Live");

    const reported = localNotes(notes);
    expect(reported).toHaveLength(1);
    expect(reported[0]?.level).toBe("blocker");
    expect(reported[0]?.detail).toContain("network");

    // Reported once. The detector must not add a second, vaguer note about the
    // same tag, nor the generic `export const` flag.
    expect(custom).toEqual([]);
    expect(notes.filter((note) => note.rule === "custom-component")).toEqual([]);
  });

  it("removes the react import once every definition it served is gone", async () => {
    const { mdx } = await convert(
      lines(
        "import { useState } from 'react'",
        "",
        "export const Toggle = ({header, children}) => { const [o, s] = useState(false); return <div><b>{header}</b>{children}</div> }",
        "",
        '<Toggle header="Options">',
        "",
        "body",
        "",
        "</Toggle>",
      ),
    );

    expect(mdx).not.toContain("import");
    expect(mdx).toContain('<Expandable title="Options"');
  });

  it("keeps the import when a definition survives", async () => {
    const { mdx } = await convert(
      lines(
        "import { useState } from 'react'",
        "",
        "export const Live = ({ url, children }) => { fetch(url); return <div>{children}</div> }",
        "",
        '<Live url="https://x.test/a">x</Live>',
      ),
    );

    expect(mdx).toContain("import { useState }");
  });

  it("lets a local definition beat the Marketplace rule of the same name", async () => {
    // A Marketplace component is installed into a project as an editable custom
    // component, so a page carrying its own `export const Spoiler` has a Spoiler
    // that is no longer the one in the table.
    const { mdx, notes } = await convert(
      lines(
        'export const Spoiler = props => <div className="bg-red-50 p-4">{props.children}</div>',
        "",
        "<Spoiler>hidden</Spoiler>",
      ),
    );

    expect(mdx).toContain('<Callout kind="danger">');
    expect(mdx).not.toContain("Expandable");
    expect(localNotes(notes)).toHaveLength(1);
  });

  it("does nothing at all to a page with no local components", async () => {
    const { notes } = await convert("## Heading\n\nSome text.\n");
    expect(localNotes(notes)).toEqual([]);
  });
});
