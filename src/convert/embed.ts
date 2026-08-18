import type { Link, Paragraph, Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

import { attr, liftInlineJsx, lineOf, readAttr, type ConversionNote } from "./mdast";

/**
 * Plan §2.4 — `<Embed>` -> `<Video>`, `<Iframe>`, or a link.
 *
 * One source component becomes one of three targets, and picking wrong is visible
 * on the page. Routing everything to `<Iframe>` loses the player affordances for
 * YouTube/Vimeo/Loom; routing everything to `<Video>` breaks non-video embeds —
 * and the Capillary corpus is mostly the latter, with 8 `typeOfEmbed="iframe"`
 * (Vimeo player URLs and Clueso walkthroughs) against 1 `youtube`.
 *
 * **The host decides, not `typeOfEmbed`.** A Vimeo player URL is a video whether
 * the author wrote `typeOfEmbed="iframe"` or not — which is exactly what 8 of the
 * 9 corpus embeds did.
 *
 * ReadMe's own precedence is iframe -> raw `html` -> link card `[RM §4.6]`. The
 * link-card branch has no target component at all, so it degrades to a markdown
 * link rather than pretending otherwise.
 */

/** Hosts whose embeds are players — `<Video>` gives them the right chrome. */
const VIDEO_HOSTS = [
  "youtube.com",
  "youtu.be",
  "vimeo.com",
  "loom.com",
  "wistia.com",
  "wistia.net",
];

/** Extensions Documentation.AI plays natively in `render-type="video"`. */
const VIDEO_FILES = /\.(mp4|webm|ogg|ogv)(\?|#|$)/i;

/**
 * `typeOfEmbed` values ReadMe can derive an iframe from, plus the explicit
 * `iframe`. Consulted only when the host is not a known player.
 */
const IFRAME_TYPES = new Set(["iframe", "jsfiddle", "pdf"]);

export type EmbedTarget = "video" | "video-file" | "iframe" | "link";

// ---------------------------------------------------------------------------
// Routing
// ---------------------------------------------------------------------------

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function isVideoHost(url: string): boolean {
  const host = hostOf(url);
  return VIDEO_HOSTS.some((known) => host === known || host.endsWith(`.${known}`));
}

/**
 * Decides where one embed lands. Host first, `typeOfEmbed`/`iframe` second,
 * link-card last — the order that matches how each platform actually renders.
 */
export function routeEmbed(url: string, typeOfEmbed?: string, iframe?: string, html?: string): EmbedTarget {
  if (VIDEO_FILES.test(url)) return "video-file";
  if (isVideoHost(url)) return "video";

  const type = typeOfEmbed?.trim().toLowerCase();
  if (iframe?.trim().toLowerCase() === "true" || (type && IFRAME_TYPES.has(type))) return "iframe";

  // `html="false"` is ReadMe's idiom for "no oEmbed markup" and appears in the
  // corpus verbatim — the literal string is treated as absent `[RM §4.6]`.
  const markup = html?.trim();
  if (markup && markup.toLowerCase() !== "false") return "iframe";

  return "link";
}

/**
 * YouTube share URLs become embed URLs; everything else is left as authored.
 *
 * The asymmetry is deliberate. The live Documentation.AI docs show `<Video>` with
 * a `youtube.com/embed/…` URL, and ReadMe normalises YouTube to that form
 * internally too `[RM §4.6]` — so a `watch?v=` URL is rewritten rather than
 * copied. For Vimeo and Loom, `[DAI §17]` documents the plain share URL as
 * accepted, so rewriting them would be a guess with nothing to gain.
 */
export function embedSrc(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  const host = hostOf(url);
  if (host === "youtu.be") {
    const id = parsed.pathname.replace(/^\//, "");
    if (!id) return url;
    parsed.searchParams.delete("v");
    return `https://www.youtube.com/embed/${id}${parsed.search}`;
  }

  if (host === "youtube.com" && parsed.pathname === "/watch") {
    const id = parsed.searchParams.get("v");
    if (!id) return url;
    parsed.searchParams.delete("v");
    return `https://www.youtube.com/embed/${id}${parsed.search}`;
  }

  return url;
}

// ---------------------------------------------------------------------------
// Dimensions
// ---------------------------------------------------------------------------

/**
 * `<Video>` takes pixels; `<Iframe>` takes pixels or percentages
 * `[LIVE-DAI /components/videos-and-iframes]`. So `width="100%"` is fine on one
 * target and meaningless on the other — and the corpus uses it on both.
 */
function dimension(
  value: string | undefined,
  target: EmbedTarget,
  name: string,
  notes: ConversionNote[],
  line?: number,
): string | undefined {
  const raw = value?.trim();
  if (!raw) return undefined;

  if (target === "iframe") return raw;

  if (raw.endsWith("%")) {
    notes.push({
      rule: "embed",
      level: "flag",
      line,
      detail: `dropped ${name}="${raw}" — <Video> takes pixels, and a percentage has no valid form there`,
    });
    return undefined;
  }

  const px = raw.replace(/px$/i, "").trim();
  if (/^\d+$/.test(px)) return px;

  notes.push({
    rule: "embed",
    level: "flag",
    line,
    detail: `dropped ${name}="${raw}" — not a pixel value`,
  });
  return undefined;
}

// ---------------------------------------------------------------------------
// Conversion
// ---------------------------------------------------------------------------

/** ReadMe writes this as `title` when the embed has none `[RM §4.6]`. */
const NO_TITLE = "@embed";

function titleOf(value: string | undefined): string | undefined {
  const title = value?.trim();
  if (!title || title === NO_TITLE) return undefined;
  return title;
}

/** A link, for the link-card case that has no target component. */
function linkNode(url: string, text: string): Paragraph {
  return {
    type: "paragraph",
    children: [{ type: "link", url, title: null, children: [{ type: "text", value: text }] }],
  };
}

/**
 * Converts one `<Embed>` into its replacement node.
 *
 * Dropped throughout, because nothing on the target reads them: `href` (a
 * duplicate of `url` in 9 of 9 corpus uses), `html` (oEmbed player markup),
 * `provider` / `providerName` / `providerUrl` / `favicon` (the link-card
 * furniture), and `lazy` (both targets lazy-load by default).
 */
export function convertEmbedElement(node: MdxJsxFlowElement, notes: ConversionNote[]): RootContent {
  const line = lineOf(node);
  const url = readAttr(node, "url") ?? readAttr(node, "href") ?? "";
  const typeOfEmbed = readAttr(node, "typeOfEmbed");
  const target = routeEmbed(url, typeOfEmbed, readAttr(node, "iframe"), readAttr(node, "html"));
  const title = titleOf(readAttr(node, "title"));
  const image = readAttr(node, "image");

  if (!url) {
    notes.push({
      rule: "embed",
      level: "blocker",
      line,
      detail: "<Embed> has no url — <Video> and <Iframe> both require src",
    });
    return node;
  }

  if (target === "link") {
    notes.push({
      rule: "embed",
      level: "flag",
      line,
      detail: `<Embed> rendered as a ReadMe link card, which has no Documentation.AI component — emitted as a link to ${url}`,
    });
    return linkNode(url, title ?? url);
  }

  const src = embedSrc(url);
  if (src !== url) {
    notes.push({ rule: "embed", level: "change", line, detail: `${url} -> ${src} (embed form)` });
  }

  const width = dimension(readAttr(node, "width"), target, "width", notes, line);
  const height = dimension(readAttr(node, "height"), target, "height", notes, line);

  const name = target === "iframe" ? "Iframe" : "Video";
  const attributes = [
    attr("src", src),
    ...(target === "video-file" ? [attr("render-type", "video")] : []),
    ...(title === undefined ? [] : [attr("title", title)]),
    ...(width === undefined ? [] : [attr("width", width)]),
    ...(height === undefined ? [] : [attr("height", height)]),
    // `poster` exists only in `render-type="video"` mode; in iframe mode the
    // provider supplies the thumbnail and there is nowhere to put one.
    ...(target === "video-file" && image ? [attr("poster", image)] : []),
  ];

  if (image && target !== "video-file") {
    notes.push({
      rule: "embed",
      level: "change",
      line,
      detail: `dropped image="${image}" — an embedded player supplies its own thumbnail`,
    });
  }

  notes.push({
    rule: "embed",
    level: "change",
    line,
    detail: `<Embed${typeOfEmbed ? ` typeOfEmbed="${typeOfEmbed}"` : ""}> -> <${name}${target === "video-file" ? ' render-type="video"' : ""}> on ${hostOf(src) || "the source URL"}`,
  });

  return {
    type: "mdxJsxFlowElement",
    name,
    attributes,
    children: [],
    ...(node.position ? { position: node.position } : {}),
  };
}

/**
 * The markdown shorthand: `[Title](https://youtu.be/x "@embed")` `[RM §4.6]`.
 *
 * Only a paragraph that holds nothing but the link is converted — an `@embed`
 * link sitting inside a sentence cannot become a block-level player without
 * reordering the author's text, so it degrades to an ordinary link.
 */
function embedLinkOf(node: RootContent): Link | null {
  if (node.type !== "paragraph") return null;

  const inline = node.children.filter(
    (child) => !(child.type === "text" && child.value.trim().length === 0),
  );
  const only = inline[0];
  if (inline.length !== 1 || only?.type !== "link") return null;
  return only.title?.trim() === NO_TITLE ? only : null;
}

// ---------------------------------------------------------------------------
// The walk
// ---------------------------------------------------------------------------

/** Converts every `<Embed>` and every `"@embed"` link on a page. */
export function convertEmbeds(root: Root | Parent, notes: ConversionNote[]): void {
  liftInlineJsx(root, new Set(["Embed"]), notes);

  const children = root.children as RootContent[];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    if (child.type === "mdxJsxFlowElement" && child.name === "Embed") {
      children[i] = convertEmbedElement(child, notes);
      continue;
    }

    const link = embedLinkOf(child);
    if (link) {
      const text = link.children.length > 0 ? undefined : link.url;
      const shorthand: MdxJsxFlowElement = {
        type: "mdxJsxFlowElement",
        name: "Embed",
        attributes: [
          attr("url", link.url),
          // The link text is the embed's title; `"@embed"` itself never is.
          ...(text === undefined ? [attr("title", toText(link))] : []),
        ],
        children: [],
        ...(link.position ? { position: link.position } : {}),
      };
      children[i] = convertEmbedElement(shorthand, notes);
      continue;
    }

    if ("children" in child && Array.isArray((child as Parent).children)) {
      convertEmbeds(child as Parent, notes);
    }
  }
}

function toText(link: Link): string {
  return link.children
    .map((child) => (child.type === "text" ? child.value : ""))
    .join("")
    .trim();
}
