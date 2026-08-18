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
  // Major platforms
  "youtube.com",
  "youtu.be",
  "vimeo.com",
  "dailymotion.com",
  "twitch.tv",
  "tiktok.com",

  // Business/Sales
  "loom.com",
  "wistia.com",
  "wistia.net",
  "vidyard.com",

  // Enterprise
  "brightcove.com",
  "kaltura.com",
  "jwplatform.com",
  "jwplayer.com",
  "sproutvideo.com",

  // Infrastructure/CDN
  "mux.com",
  "stream.mux.com",
  "cloudflarestream.com",
  "videodelivery.net",
  "bunny.net",

  // Social embeds
  "facebook.com",
  "twitter.com",
  "x.com",

  // Misc
  "streamable.com",
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
 * Plan §3.3 — a **raw `<iframe>`** becomes `<Iframe>`, or `<Video>` when it points
 * at a video host.
 *
 * It is the same decision `<Embed>` already makes, so it is made here rather than
 * in a module of its own: an author who hand-wrote `<iframe src="youtube.com/…">`
 * meant the same thing as one who wrote `<Embed url="youtube.com/…">`, and both
 * should land on the player rather than on a bare frame.
 *
 * Raw HTML is not an option on the target regardless (global rule), and the
 * component adds lazy loading and sandboxing that a hand-written frame does not
 * get `[APP Iframe.tsx]`.
 */

/** HTML attribute -> the target's prop, which is kebab-case `[APP Iframe.tsx]`. */
const IFRAME_PROPS: Record<string, string> = {
  title: "title",
  sandbox: "sandbox",
  allowfullscreen: "allow-full-screen",
  allowFullScreen: "allow-full-screen",
  frameborder: "frame-border",
  frameBorder: "frame-border",
  loading: "loading",
};

/** Attributes with nowhere to go on the target. */
const IFRAME_DROPPED = [
  "allow", "referrerpolicy", "referrerPolicy", "scrolling", "marginwidth", "marginheight",
  "name", "id", "class", "className", "style", "align", "srcdoc",
];

/**
 * One raw `<iframe>` -> `<Iframe>` / `<Video>`.
 *
 * `loading="lazy"` is dropped rather than carried: it is already the component's
 * default `[APP Iframe.tsx]`, so writing it down says nothing.
 */
export function convertRawIframe(node: MdxJsxFlowElement, notes: ConversionNote[]): RootContent {
  const line = lineOf(node);
  const url = readAttr(node, "src") ?? "";

  if (!url) {
    notes.push({
      rule: "iframe",
      level: "blocker",
      line,
      detail: "raw <iframe> has no src — left in place, since there is nothing to embed",
    });
    return node;
  }

  const target = routeEmbed(url, "iframe");
  const src = embedSrc(url);
  const name = target === "video" || target === "video-file" ? "Video" : "Iframe";

  const carried =
    name === "Iframe"
      ? Object.entries(IFRAME_PROPS).flatMap(([from, to]) => {
          const value = readAttr(node, from);
          if (value === undefined) return [];
          if (to === "loading" && value.toLowerCase() === "lazy") return [];
          return [attr(to, value)];
        })
      : [];

  const width = dimension(readAttr(node, "width"), target, "width", notes, line);
  const height = dimension(readAttr(node, "height"), target, "height", notes, line);

  const dropped = [
    ...IFRAME_DROPPED,
    // On a video player these have nowhere to go either — the provider's embed
    // owns the frame.
    ...(name === "Video" ? Object.keys(IFRAME_PROPS).filter((key) => key !== "title") : []),
  ].filter((attribute) => readAttr(node, attribute) !== undefined);
  if (dropped.length > 0) {
    notes.push({
      rule: "iframe",
      level: "change",
      line,
      detail: `dropped ${dropped.join(", ")} — no equivalent on <${name}>`,
    });
  }

  notes.push({
    rule: "iframe",
    level: "change",
    line,
    detail:
      name === "Video"
        ? `raw <iframe> -> <Video> on ${hostOf(src) || "the source URL"}, which is what the URL is`
        : "raw <iframe> -> <Iframe>, which adds lazy loading and sandboxing",
  });

  return {
    type: "mdxJsxFlowElement",
    name,
    attributes: [
      attr("src", src),
      ...(width === undefined ? [] : [attr("width", width)]),
      ...(height === undefined ? [] : [attr("height", height)]),
      ...carried,
    ],
    children: [],
    ...(node.position ? { position: node.position } : {}),
  };
}

/** `<iframe …>` written as raw HTML, with an optional closing tag and nothing else. */
const RAW_IFRAME = /^<iframe\b([^>]*?)\/?>(?:\s*<\/iframe\s*>)?$/i;
const RAW_ATTR = /([A-Za-z_][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})|([A-Za-z_][\w:-]*)/g;

/**
 * The same tag on a page the MDX parser rejected, where it is raw text.
 *
 * A hand-written `<iframe>` is a common reason a page *is* rejected — it is often
 * written unclosed — so this is not a rare path.
 */
function iframeFromHtml(value: string): MdxJsxFlowElement | undefined {
  const tag = RAW_IFRAME.exec(value.trim());
  if (!tag) return undefined;

  const attributes = [];
  for (const match of (tag[1] ?? "").matchAll(RAW_ATTR)) {
    const name = match[1] ?? match[5];
    if (name) attributes.push(attr(name, (match[2] ?? match[3] ?? match[4] ?? "true").trim()));
  }

  return { type: "mdxJsxFlowElement", name: "iframe", attributes, children: [] };
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

/** Converts every `<Embed>`, every `"@embed"` link and every raw `<iframe>`. */
export function convertEmbeds(root: Root | Parent, notes: ConversionNote[]): void {
  liftInlineJsx(root, new Set(["Embed", "iframe"]), notes);

  const children = root.children as RootContent[];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    if (child.type === "mdxJsxFlowElement" && child.name === "Embed") {
      children[i] = convertEmbedElement(child, notes);
      continue;
    }

    if (child.type === "mdxJsxFlowElement" && child.name === "iframe") {
      children[i] = convertRawIframe(child, notes);
      continue;
    }

    // The same tag on a page the MDX parser rejected, where it is raw text.
    if (child.type === "html") {
      const raw = iframeFromHtml(child.value);
      if (raw) {
        if (child.position) raw.position = child.position;
        children[i] = convertRawIframe(raw, notes);
        continue;
      }
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
