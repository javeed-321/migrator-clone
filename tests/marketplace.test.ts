import { describe, expect, it } from "vitest";

import { parseJsLiteral, parseRecord, parseRecordArray } from "../src/convert/marketplace/js-literal";
import { convertReadmeMarkdown } from "../src/convert/run";

const convert = (source: string) => convertReadmeMarkdown(source);
const mkNotes = (notes: { rule: string; detail: string; level: string }[]) =>
  notes.filter((note) => note.rule === "marketplace");

describe("js-literal", () => {
  it("reads the shapes real components use", () => {
    expect(parseRecord("{ Free: false, Business: true, Enterprise: true }")).toEqual({
      Free: false, Business: true, Enterprise: true,
    });
    expect(parseRecordArray("[{ 'code': 'X', 'status': 'Not Found' },]")).toEqual([
      { code: "X", status: "Not Found" },
    ]);
    expect(parseJsLiteral("{ a: 1, /* note */ b: [1, 2.5, -3], c: null }")).toEqual({
      a: 1, b: [1, 2.5, -3], c: null,
    });
  });

  it("refuses anything that is not a literal, rather than guessing", () => {
    expect(parseJsLiteral("someVariable")).toBeNull();
    expect(parseJsLiteral("{ a: fn() }")).toBeNull();
    expect(parseJsLiteral("`${interpolated}`")).toBeNull();
    expect(parseJsLiteral("{ a: 1 } + {}")).toBeNull();
  });
});

describe("marketplace conversion", () => {
  it("Spoiler -> Expandable", async () => {
    const r = await convert(`<Spoiler overlayColor="black">\nThe answer is 42.\n</Spoiler>\n`);
    expect(r.mdx).toContain('<Expandable title="Click to reveal" default-open="false">');
    expect(r.mdx).toContain("The answer is 42.");
    expect(r.custom).toEqual([]);
  });

  it("KeyPress -> Expandable naming the combo, content kept", async () => {
    const r = await convert(`<KeyPress keyCombo="Ctrl+Alt+a">\nSecret content.\n</KeyPress>\n`);
    expect(r.mdx).toContain('title="Press Ctrl+Alt+a"');
    expect(r.mdx).toContain("Secret content.");
  });

  it("ContentModal lifts its content prop into the body", async () => {
    const r = await convert(`<ContentModal label="Open" title="Rate limits" content="60 requests per minute." />\n`);
    expect(r.mdx).toContain('<Expandable title="Rate limits"');
    expect(r.mdx).toContain("60 requests per minute.");
  });

  it("Terminal -> a bash fence", async () => {
    const r = await convert("<Terminal>{`\n  $ npm install\n  added 1 package\n`}</Terminal>\n");
    expect(r.mdx).toContain("```bash");
    expect(r.mdx).toContain("$ npm install");
    expect(r.mdx).toContain("added 1 package");
  });

  it("GitHubBadge -> a live Image", async () => {
    const r = await convert(`<GitHubBadge owner="readmeio" repo="marketplace" workflow="ci.yml" />\n`);
    expect(r.mdx).toContain(
      "https://github.com/readmeio/marketplace/actions/workflows/ci.yml/badge.svg?branch=main",
    );
    expect(r.mdx).toContain('alt="ci.yml status"');
  });

  it("Banner inline -> Callout; header mode is a blocker that keeps the text", async () => {
    const inline = await convert(`<Banner isInline={true} message="Heads up!" color="#118cfd" />\n`);
    expect(inline.mdx).toContain('<Callout kind="info">');
    expect(inline.mdx).toContain("Heads up!");
    expect(inline.mdx).not.toContain("#118cfd");

    const header = await convert(`<Banner message="Site wide" color="#118cfd" />\n`);
    const note = mkNotes(header.notes)[0]!;
    expect(note.level).toBe("blocker");
    expect(note.detail).toContain("Site wide");
  });

  it("ToggleList -> ExpandableGroup", async () => {
    const r = await convert(
      `<ToggleList>\n  <ToggleListItem title="One">First.</ToggleListItem>\n  <ToggleListItem title="Two">Second.</ToggleListItem>\n</ToggleList>\n`,
    );
    expect(r.mdx).toContain("<ExpandableGroup>");
    expect(r.mdx).toContain('<Expandable title="One"');
    expect(r.mdx).toContain('<Expandable title="Two"');
  });

  it("SimpleStepper -> Steps with header as title", async () => {
    const r = await convert(
      `<SimpleStepper>\n  <SimpleStep header="Install">Run npm i.</SimpleStep>\n</SimpleStepper>\n`,
    );
    expect(r.mdx).toContain("<Steps>");
    expect(r.mdx).toContain('<Step title="Install">');
    expect(r.mdx).toContain("Run npm i.");
  });

  it("Grid unwraps its children and never invents an href", async () => {
    const r = await convert(`<Grid columns={2}>\n  First item.\n\n  Second item.\n</Grid>\n`);
    expect(r.mdx).toContain("First item.");
    expect(r.mdx).toContain("Second item.");
    expect(r.mdx).not.toContain("<Card");
    expect(mkNotes(r.notes)[0]?.level).toBe("flag");
  });

  it("Compatibility -> heading, subtitle and a table", async () => {
    const r = await convert(
      `<Compatibility title="Feature Name" subtitle="What it does" plans={{ Free: false, Business: true }} />\n`,
    );
    expect(r.mdx).toContain("### Feature Name");
    expect(r.mdx).toContain("What it does");
    expect(r.mdx).toMatch(/\| Plan\s+\| Available\s+\|/);
    expect(r.mdx).toMatch(/\| Free\s+\| —\s+\|/);
    expect(r.mdx).toMatch(/\| Business\s+\| ✅\s+\|/);
  });

  it("AdvancedTable -> a table, with braces disarmed", async () => {
    const r = await convert(
      `<AdvancedTable data={[{ 'code': 'CATEGORY_NOTFOUND', 'message': "Slug '{category}' not found." }]} />\n`,
    );
    expect(r.mdx).toMatch(/\| Code\s+\| Message\s+\|/);
    expect(r.mdx).toContain("CATEGORY");
    // The brace must not survive as a live MDX expression.
    expect(r.mdx).toContain("`{category}`");
    expect(r.outputCompiles).toBe(true);
  });

  it("QuizGame keeps the options and the answer", async () => {
    const r = await convert(
      `<QuizGame question="Which status means Not Found?" options={[{ text: '200', isCorrect: false }, { text: '404', isCorrect: true }]} />\n`,
    );
    expect(r.mdx).toContain("Which status means Not Found?");
    expect(r.mdx).toContain("- 200");
    expect(r.mdx).toContain("- 404");
    expect(r.mdx).toContain('<Expandable title="Show answer"');
  });

  it("blocks rather than guesses when the data cannot be read", async () => {
    const r = await convert(`<AdvancedTable data={buildRows()} />\n`);
    expect(mkNotes(r.notes)[0]?.level).toBe("blocker");
    // The node is left in place, so nothing is silently dropped.
    expect(r.mdx).toContain("AdvancedTable");
  });

  it("StatusPage -> a Card, never a frozen status", async () => {
    const r = await convert(`<StatusPage title="Service status" url="https://status.example.com" />\n`);
    expect(r.mdx).toContain('<Card title="Service status" href="https://status.example.com"');
    expect(r.custom).toEqual([]);
  });

  it("DownloadOASButton -> a Card naming the file", async () => {
    const r = await convert(`<DownloadOASButton url="https://demo.readme.io/openapi/openapi.json" />\n`);
    expect(r.mdx).toContain('title="Download OpenAPI spec"');
    expect(r.mdx).toContain("`openapi.json`");
  });

  it("PostmanRunButton -> a Card, and blocks when only an id is given", async () => {
    const ok = await convert(`<PostmanRunButton collectionId="1" collectionUrl="https://www.postman.com/x/y" />\n`);
    expect(ok.mdx).toContain('title="Run in Postman"');
    expect(ok.mdx).toContain("https://www.postman.com/x/y");

    // Reconstructing Postman's fork URL from an id would be a guess at another
    // product's URL scheme.
    const idOnly = await convert(`<PostmanRunButton collectionId="1" />\n`);
    expect(mkNotes(idOnly.notes)[0]?.level).toBe("blocker");
    expect(idOnly.custom).toEqual([]);
  });

  it("SnapSlider -> a classed wrapper whose children stay markdown", async () => {
    const r = await convert(
      `<SnapSlider>\n  ![One](https://x.io/1.png)\n\n  ![Two](https://x.io/2.png)\n</SnapSlider>\n`,
    );
    expect(r.mdx).toContain('<div className="rm-slider">');
    // The images must still be components, not flattened into an HTML string.
    expect(r.mdx).toContain("<Image");
    expect(r.mdx).toContain("https://x.io/1.png");
    expect(r.mdx).toContain("https://x.io/2.png");
    expect(r.outputCompiles).toBe(true);
  });

  it("Windows lifts its header prop into a title bar", async () => {
    const r = await convert(`<Windows header="README.TXT">\nSome **body** text.\n</Windows>\n`);
    expect(r.mdx).toContain('<div className="rm-window">');
    expect(r.mdx).toContain('<div className="rm-window-title">');
    expect(r.mdx).toContain("README.TXT");
    expect(r.mdx).toContain("**body**");
    expect(r.outputCompiles).toBe(true);
  });

  it("Latex -> a .math marker with the formula untouched", async () => {
    const r = await convert("<Latex>{`$e^+e^-$ and $x^2$`}</Latex>\n");

    expect(r.mdx).toContain('<div className="math">');
    expect(r.mdx).toContain("$e^+e^-$");
    expect(r.custom).toEqual([]);
    expect(r.outputCompiles).toBe(true);
  });

  // A multi-line template literal must reach the rule untouched. `repairSource`
  // used to rewrite `${` to `$\{` inside one, because INLINE_CODE stops at a
  // newline and so never masked it — which broke the interpolation and left a
  // stray `$` for KaTeX to mis-pair against.
  it("Latex survives a multi-line literal containing an interpolation", async () => {
    const r = await convert(
      "<Latex>{`\n  We give illustrations for the ${1 + 2} processes $e^+e^-$ and $\\\\gamma$.\n`}</Latex>\n",
    );

    expect(r.mdx).toContain("${1 + 2}");
    expect(r.mdx).not.toContain("$\\{1 + 2}");
    expect(mkNotes(r.notes).every((n) => n.level !== "blocker")).toBe(true);
  });

  it("Latex blocks when the $ delimiters cannot pair", async () => {
    const r = await convert("<Latex>{`$a$ and $b`}</Latex>\n");

    const blocker = mkNotes(r.notes).find((n) => n.level === "blocker");
    expect(blocker?.detail).toContain("cannot pair");
  });

  // The reason the rule does not unwrap the template literal. A brace in MDX body
  // text is an expression, so `\frac{a}{b}` unwrapped would break the page.
  it("Latex keeps braces safe inside the template literal", async () => {
    const r = await convert("<Latex>{`$\\frac{a}{b}$ and $x_{n}$`}</Latex>\n");

    expect(r.mdx).toContain("\\frac{a}{b}");
    expect(r.mdx).toContain("x_{n}");
    expect(r.outputCompiles).toBe(true);
  });
});

describe("PostList — data fetched at conversion time", () => {
  const posts = [
    { id: 1, title: "sunt aut facere", body: "quia et suscipit" },
    { id: 2, title: "qui est esse", body: "est rerum tempore" },
  ];

  const stub = (body: unknown, ok = true): typeof fetch =>
    (async () =>
      ({ ok, status: ok ? 200 : 500, text: async () => JSON.stringify(body) }) as Response) as unknown as typeof fetch;

  it("writes the response into the page as a table", async () => {
    const r = await convertReadmeMarkdown(`<PostList url="https://api.example.com/posts" />\n`, {
      data: { enabled: true, fetchImpl: stub(posts) },
    });

    expect(r.mdx).toContain('<div className="rm-postlist">');
    expect(r.mdx).toMatch(/\| Id\s+\| Title\s+\| Body\s+\|/);
    expect(r.mdx).toContain("sunt aut facere");
    expect(r.mdx).toContain("est rerum tempore");
    expect(r.outputCompiles).toBe(true);
    expect(r.custom).toEqual([]);
  });

  it("says plainly that the data is frozen", async () => {
    const r = await convertReadmeMarkdown(`<PostList url="https://api.example.com/posts" />\n`, {
      data: { enabled: true, fetchImpl: stub(posts) },
    });

    expect(mkNotes(r.notes).some((n) => n.detail.includes("frozen at conversion time"))).toBe(true);
  });

  it("falls back to a json fence when the shape is not a flat record array", async () => {
    const r = await convertReadmeMarkdown(`<PostList url="https://api.example.com/x" />\n`, {
      data: { enabled: true, fetchImpl: stub({ nested: { a: [1, 2] } }) },
    });

    expect(r.mdx).toContain("```json");
    expect(r.mdx).toContain('"nested"');
  });

  it("does nothing unless asked, and says how to ask", async () => {
    const r = await convert(`<PostList url="https://api.example.com/posts" />\n`);

    expect(r.mdx).toContain("PostList");
    expect(mkNotes(r.notes)[0]?.detail).toContain("data.enabled");
  });

  it("refuses a private or link-local address", async () => {
    let called = false;
    const spy: typeof fetch = (async () => {
      called = true;
      return { ok: true, status: 200, text: async () => "[]" } as Response;
    }) as unknown as typeof fetch;

    const r = await convertReadmeMarkdown(
      `<PostList url="http://169.254.169.254/latest/meta-data/" />\n`,
      { data: { enabled: true, fetchImpl: spy } },
    );

    expect(called).toBe(false);
    expect(mkNotes(r.notes)[0]?.level).toBe("blocker");
    expect(mkNotes(r.notes)[0]?.detail).toContain("private or link-local");
  });

  it("blocks rather than emitting an empty table when the endpoint fails", async () => {
    const r = await convertReadmeMarkdown(`<PostList url="https://api.example.com/posts" />\n`, {
      data: { enabled: true, fetchImpl: stub([], false) },
    });

    expect(mkNotes(r.notes)[0]?.level).toBe("blocker");
    expect(r.mdx).toContain("PostList");
  });

  it("does not touch names an earlier pass already owns", async () => {
    const r = await convert(`<Accordion title="Why">Because.</Accordion>\n`);
    expect(mkNotes(r.notes)).toEqual([]);
    expect(r.mdx).toContain("<Expandable");
  });
});
