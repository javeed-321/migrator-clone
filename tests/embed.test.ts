import { describe, expect, it } from "vitest";

import { convertEmbeds, embedSrc, routeEmbed } from "../src/convert/embed";
import type { ConversionNote } from "../src/convert/mdast";
import { toMdx } from "../src/convert/one-to-one";
import { parseMarkdown } from "../src/download/parse";

function run(source: string): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  convertEmbeds(tree, notes);
  return { mdx: toMdx(tree).trim(), notes };
}

/** The corpus shape: a Vimeo player URL declared as an iframe. */
const VIMEO = `<Embed
  typeOfEmbed="iframe"
  url="https://player.vimeo.com/video/1071296714?h=6bfcb643fa"
  href="https://player.vimeo.com/video/1071296714?h=6bfcb643fa"
  html="false"
  iframe="true"
  width="100%"
  height="370px"
/>`;

describe("2.4 routing", () => {
  it("routes a video host to Video even when typeOfEmbed says iframe", () => {
    expect(routeEmbed("https://player.vimeo.com/video/1", "iframe", "true", "false")).toBe("video");
    expect(run(VIMEO).mdx).toContain("<Video");
  });

  it("routes YouTube, Loom and Wistia to Video", () => {
    expect(routeEmbed("https://www.youtube.com/watch?v=abc")).toBe("video");
    expect(routeEmbed("https://www.loom.com/share/abc")).toBe("video");
    expect(routeEmbed("https://company.wistia.com/medias/abc")).toBe("video");
  });

  it("routes a video file to Video in render-type=video mode", () => {
    expect(routeEmbed("https://cdn.example.com/demo.mp4")).toBe("video-file");
  });

  it("routes an explicit iframe on an unknown host to Iframe", () => {
    expect(routeEmbed("https://capillary.clueso.io/embed/6ad96931", "iframe", "true")).toBe("iframe");
  });

  it("routes jsfiddle and pdf to Iframe", () => {
    expect(routeEmbed("https://jsfiddle.net/x/", "jsfiddle")).toBe("iframe");
    expect(routeEmbed("https://example.com/spec.pdf", "pdf")).toBe("iframe");
  });

  it("treats html=\"false\" as absent, the way ReadMe does", () => {
    expect(routeEmbed("https://example.com/thing", undefined, undefined, "false")).toBe("link");
    expect(routeEmbed("https://example.com/thing", undefined, undefined, "<iframe …>")).toBe("iframe");
  });

  it("falls through to a link card when nothing makes it an embed", () => {
    expect(routeEmbed("https://example.com/article")).toBe("link");
  });
});

describe("2.4 src normalisation", () => {
  it("rewrites a YouTube watch URL to its embed form", () => {
    expect(embedSrc("https://www.youtube.com/watch?v=XVqVOMFpr-8")).toBe(
      "https://www.youtube.com/embed/XVqVOMFpr-8",
    );
  });

  it("rewrites a youtu.be short URL", () => {
    expect(embedSrc("https://youtu.be/XVqVOMFpr-8")).toBe("https://www.youtube.com/embed/XVqVOMFpr-8");
  });

  it("keeps other query parameters when it rewrites", () => {
    expect(embedSrc("https://www.youtube.com/watch?v=abc&t=30")).toBe(
      "https://www.youtube.com/embed/abc?t=30",
    );
  });

  it("leaves an already-embeddable YouTube URL alone", () => {
    const url = "https://www.youtube.com/embed/abc";

    expect(embedSrc(url)).toBe(url);
  });

  it("leaves Vimeo and Loom share URLs as authored", () => {
    expect(embedSrc("https://vimeo.com/1071296714")).toBe("https://vimeo.com/1071296714");
    expect(embedSrc("https://www.loom.com/share/abc")).toBe("https://www.loom.com/share/abc");
  });
});

describe("2.4 attributes", () => {
  it("renames url to src and drops href, html and iframe", () => {
    const { mdx } = run(VIMEO);

    expect(mdx).toContain('src="https://player.vimeo.com/video/1071296714?h=6bfcb643fa"');
    expect(mdx).not.toContain("href=");
    expect(mdx).not.toContain("html=");
    expect(mdx).not.toContain("typeOfEmbed");
  });

  it("drops a percentage width on Video, which takes pixels", () => {
    const { mdx, notes } = run(VIMEO);

    expect(mdx).not.toContain('width="100%"');
    expect(notes.some((note) => note.level === "flag" && note.detail.includes("takes pixels"))).toBe(true);
  });

  it("strips the px suffix for Video", () => {
    expect(run(VIMEO).mdx).toContain('height="370"');
  });

  it("keeps percentages on Iframe, which accepts them", () => {
    const source = `<Embed typeOfEmbed="iframe" iframe="true" url="https://capillary.clueso.io/embed/6ad96931" width="100%" height="400px" />`;
    const { mdx } = run(source);

    expect(mdx).toContain("<Iframe");
    expect(mdx).toContain('width="100%"');
    expect(mdx).toContain('height="400px"');
  });

  it("drops the literal @embed title", () => {
    const source = `<Embed url="https://youtu.be/abc" title="@embed" />`;

    expect(run(source).mdx).not.toContain("title=");
  });

  it("keeps a real title", () => {
    const source = `<Embed url="https://youtu.be/abc" title="Games Demo" />`;

    expect(run(source).mdx).toContain('title="Games Demo"');
  });

  it("drops provider, favicon and lazy", () => {
    const source = `<Embed url="https://youtu.be/abc" provider="youtube.com" providerName="YouTube" providerUrl="https://youtube.com" favicon="https://x/f.ico" lazy="true" />`;
    const { mdx } = run(source);

    expect(mdx).not.toContain("provider");
    expect(mdx).not.toContain("favicon");
    expect(mdx).not.toContain("lazy");
  });

  it("keeps image as poster only for a video file", () => {
    const file = `<Embed url="https://cdn.example.com/demo.mp4" image="https://cdn.example.com/poster.jpg" />`;
    const { mdx } = run(file);

    expect(mdx).toContain('render-type="video"');
    expect(mdx).toContain('poster="https://cdn.example.com/poster.jpg"');
  });

  it("drops image for a player embed, which supplies its own thumbnail", () => {
    const source = `<Embed url="https://youtu.be/abc" image="https://i.ytimg.com/vi/abc/hq.jpg" />`;
    const { mdx, notes } = run(source);

    expect(mdx).not.toContain("poster");
    expect(notes.some((note) => note.detail.includes("own thumbnail"))).toBe(true);
  });

  it("never auto-emits playback attributes", () => {
    const { mdx } = run(VIMEO);

    expect(mdx).not.toContain("autoplay");
    expect(mdx).not.toContain("controls");
    expect(mdx).not.toContain("allow-full-screen");
  });

  it("blocks an Embed with no url", () => {
    const { notes } = run(`<Embed typeOfEmbed="iframe" />`);

    expect(notes.some((note) => note.level === "blocker" && note.detail.includes("no url"))).toBe(true);
  });
});

describe("2.4 the link-card case", () => {
  it("degrades to a markdown link, since no component matches", () => {
    const source = `<Embed url="https://example.com/article" title="An article" />`;
    const { mdx, notes } = run(source);

    expect(mdx).toBe("[An article](https://example.com/article)");
    expect(notes.some((note) => note.level === "flag" && note.detail.includes("link card"))).toBe(true);
  });

  it("uses the URL as the link text when there is no title", () => {
    const source = `<Embed url="https://example.com/article" />`;

    expect(run(source).mdx).toBe("[https://example.com/article](https://example.com/article)");
  });
});

describe("2.4 the markdown shorthand", () => {
  it("converts a standalone @embed link", () => {
    const { mdx } = run(`[Embed Title](https://youtu.be/example "@embed")`);

    expect(mdx).toContain("<Video");
    expect(mdx).toContain('src="https://www.youtube.com/embed/example"');
    expect(mdx).toContain('title="Embed Title"');
  });

  it("leaves an @embed link that sits inside a sentence", () => {
    const source = `See [this](https://youtu.be/example "@embed") for details.`;
    const { mdx } = run(source);

    expect(mdx).not.toContain("<Video");
    expect(mdx).toContain("See [this]");
  });

  it("leaves ordinary links alone", () => {
    const source = `[Just a link](https://youtu.be/example)`;

    expect(run(source).mdx).toBe(source);
  });
});

describe("2.4 re-runs", () => {
  it("is idempotent", () => {
    const once = run(VIMEO).mdx;

    expect(run(once).mdx).toBe(once);
  });

  it("is idempotent for the link-card path", () => {
    const once = run(`<Embed url="https://example.com/a" title="A" />`).mdx;

    expect(run(once).mdx).toBe(once);
  });

  it("emits no raw HTML", () => {
    expect(run(VIMEO).mdx).not.toMatch(/<(div|span|iframe|video|p)\b/);
  });

  it("emits MDX that compiles — no autolinks", () => {
    // `<https://example.com>` is valid markdown and invalid MDX: `<` starts JSX.
    // The link-card path is where a link's text equals its URL, so it is the one
    // that would produce one.
    const { mdx } = run(`<Embed url="https://example.com/article" />`);

    expect(mdx).toBe("[https://example.com/article](https://example.com/article)");
    expect(parseMarkdown(mdx).mode).toBe("mdx");
  });
});

const mdxOf = (source: string) => run(source).mdx;
const notesOf = (source: string) => run(source).notes;

describe("3.3 raw <iframe>", () => {
  it("becomes <Iframe>, which adds lazy loading and sandboxing", () => {
    const out = mdxOf('<iframe src="https://example.com/demo" width="100%" height="600"></iframe>');

    expect(out).toContain('<Iframe src="https://example.com/demo"');
    expect(out).not.toContain("<iframe");
  });

  it("becomes <Video> when the URL is a video host, as <Embed> already does", () => {
    const out = mdxOf('<iframe src="https://player.vimeo.com/video/1071296714" height="370"></iframe>');

    expect(out).toContain("<Video ");
  });

  it("normalises a YouTube watch URL to its embed form", () => {
    const out = mdxOf('<iframe src="https://www.youtube.com/watch?v=abc123" width="560"></iframe>');

    expect(out).toContain('src="https://www.youtube.com/embed/abc123"');
  });

  it("renames the frame attributes to the target's kebab-case props", () => {
    const out = mdxOf(
      '<iframe src="https://example.com/x" frameborder="0" allowfullscreen sandbox="allow-scripts"></iframe>',
    );

    expect(out).toContain('frame-border="0"');
    expect(out).toContain('allow-full-screen="true"');
    expect(out).toContain('sandbox="allow-scripts"');
  });

  it('drops loading="lazy", which is already the default', () => {
    const out = mdxOf('<iframe src="https://example.com/x" loading="lazy"></iframe>');

    expect(out).not.toContain("loading");
  });

  it("keeps a percentage width, which <Iframe> accepts", () => {
    expect(mdxOf('<iframe src="https://example.com/x" width="100%"></iframe>')).toContain(
      'width="100%"',
    );
  });

  it("drops a percentage width on a video, which takes pixels", () => {
    const notes = notesOf('<iframe src="https://youtu.be/abc" width="100%"></iframe>');

    expect(notes.some((note) => note.detail.includes("takes pixels"))).toBe(true);
  });

  it("reports the attributes it dropped", () => {
    const notes = notesOf(
      '<iframe src="https://example.com/x" allow="camera" referrerpolicy="no-referrer" style="border:0"></iframe>',
    );

    expect(notes.some((note) => note.detail.includes("dropped allow, referrerpolicy, style"))).toBe(
      true,
    );
  });

  it("converts one written unclosed, which is why the page fell back in the first place", () => {
    const out = mdxOf('<iframe src="https://example.com/demo" width="100%" height="400">');

    expect(out).toContain('<Iframe src="https://example.com/demo"');
    expect(out).not.toContain("<iframe");
  });

  it("blocks on one with no src", () => {
    const notes = notesOf('<iframe width="560" height="315"></iframe>');

    expect(notes.some((note) => note.level === "blocker" && note.detail.includes("no src"))).toBe(true);
  });

  it("is idempotent", () => {
    const once = mdxOf('<iframe src="https://example.com/x" width="100%"></iframe>');

    expect(mdxOf(once)).toBe(once);
  });
});
