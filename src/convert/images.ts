import type { Image as MdImage, Parent, Root, RootContent } from "mdast";
import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";

import { attr, liftInlineJsx, lineOf, readAttr, type ConversionNote } from "./mdast";

/**
 * Plan §3.5 — every image, in every inbound spelling, becomes `<Image src alt />`.
 *
 * **[CORPUS]** 3,060 `<Image>` and 295 markdown images `[RM §10.2]`, carrying some
 * 9,000 presentation attributes between them.
 *
 * Four inbound forms reach this pass, because one unclosed `<img>` anywhere pushes
 * every tag on the page — `<Image>` included — out of the MDX parser and into raw
 * `html` nodes:
 *
 * | Written as | Route |
 * |---|---|
 * | `<Image …>` / `<img …>` JSX | `factsFromJsx` |
 * | `![alt](src)` alone in a paragraph | `factsFromMarkdown` |
 * | Either one as raw text, on a fallback-parsed page | `fromRawTag` |
 * | An image inside a sentence, a cell or a link | left alone, and reported |
 *
 * They all meet at `toImage`, which is where every rule below actually lives.
 *
 * **Why the markdown form has to convert.** Compiled with the target's own MDX
 * compiler, `![alt](src)` resolves to `_components.img`, and the platform's map
 * defines `Image` but no `img` `[APP MDXRemoteServer.tsx]` — so it renders as a
 * bare `<img>`, with none of the component.
 *
 * **Why only a standalone image converts.** `<Image>` renders a `<figure>`
 * `[APP Image.tsx]`, which cannot legally sit inside a paragraph or a link. That
 * rule is also what keeps an inline logo inline `[PIT Phase 4]`.
 */

/**
 * The caption written when the source has none.
 *
 * Not empty: the component renders the figcaption when `caption || alt` is truthy
 * `[APP Image.tsx]`, so `""` falls through to the alt text and publishes it under
 * every image — including the ones whose alt was guessed from a file name. A single
 * space is truthy and shows nothing.
 */
const BLANK_CAPTION = " ";

/** ReadMe presentation attributes with no target equivalent. */
const DROPPED = "align border className class framed title sizing style lazy wrap loading".split(" ");

/** One `<img …>` / `<Image … />` tag as raw HTML, and nothing else. */
const RAW_TAG = /^<(img|Image)\b([^>]*?)\/?>$/i;
/** `name="v"`, `name='v'`, `name={v}`, or a bare `name`. */
const RAW_ATTR = /([A-Za-z_][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})|([A-Za-z_][\w:-]*)/g;

/** What survives from any inbound form, plus what did not. */
type Facts = {
  src: string;
  alt?: string;
  caption?: string;
  /** Dropped dimensions that were real pixels — a loss worth flagging. */
  sized?: string[];
  dropped: string[];
};

type State = { external: number };

function note(
  notes: ConversionNote[],
  level: ConversionNote["level"],
  detail: string,
  line?: number,
): void {
  notes.push({ rule: "image", level, detail, ...(line === undefined ? {} : { line }) });
}

/**
 * Whether a width the source carried was a real pixel value.
 *
 * Nothing is emitted either way — **`src` and `alt` are the only props emitted**,
 * and every other prop on the target has a safe default `[APP Image.tsx]`. This
 * only decides how the loss is reported, because the three cases are not equally
 * harmless:
 *
 * | Source | On the target | Reported as |
 * |---|---|---|
 * | `width="80% "` (~1,050) | `parseInt` -> **80px**, so keeping it would be worse than dropping it | a plain drop |
 * | `width="smart"` (275) | `NaN` -> falls back to 800, exactly as if absent | a plain drop |
 * | `width="600px"` (34) | a real size the page will no longer request | **flagged** — the image publishes at the 800 default |
 *
 * That last row is the one to watch for a **logo**: a brand mark authored at 120px
 * now renders at the default, so re-add `width` by hand where it matters.
 */
function isPixels(raw: string | undefined): boolean {
  const value = (raw ?? "").trim();
  return value.length > 0 && !value.includes("%") && /^\d+(?:\.\d+)?\s*(?:px)?$/i.test(value);
}

/**
 * A last-resort `alt`, read out of the file name.
 *
 * ReadMe uploads are `<hash>-<original-name>.<ext>`, so the name usually survives:
 * `f1f2d3a-password_validate.jpg` carries "password validate". It is a guess, so it
 * is always flagged; a bare hash yields nothing rather than nonsense.
 */
export function altFromSrc(src: string): string | undefined {
  const file = (src.split(/[?#]/)[0] ?? "").split("/").pop() ?? "";
  const words = file
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .replace(/^[0-9a-f]{6,}-/i, "")
    .replace(/[-_+.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (words.length < 3 || !/[a-z]{3}/i.test(words)) return undefined;
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function factsFromJsx(node: MdxJsxFlowElement): Facts {
  const sized = ["width", "height"]
    .map((name) => ({ name, raw: readAttr(node, name) }))
    .filter((entry): entry is { name: string; raw: string } => entry.raw !== undefined);

  return {
    src: readAttr(node, "src") ?? "",
    alt: readAttr(node, "alt"),
    caption: readAttr(node, "caption"),
    // A pixel value is a real size the page will stop requesting, so it is called
    // out separately from the attributes that never meant anything.
    sized: sized.filter((entry) => isPixels(entry.raw)).map((entry) => `${entry.name}="${entry.raw.trim()}"`),
    dropped: [
      ...sized.map((entry) => `${entry.name}="${entry.raw.trim()}"`),
      ...DROPPED.filter((name) => readAttr(node, name) !== undefined),
    ],
  };
}

function factsFromMarkdown(node: MdImage): Facts {
  return {
    src: node.url,
    alt: node.alt?.trim() || undefined,
    dropped: node.title ? [`image title "${node.title}"`] : [],
  };
}

/**
 * Reads an image written as raw HTML.
 *
 * Not a shortcut around the parser — the only route for an **unclosed `<img>`**,
 * which cannot parse as JSX at all, and for every other tag on the page it drags
 * down with it.
 */
function fromRawTag(value: string): MdxJsxFlowElement | undefined {
  const tag = RAW_TAG.exec(value.trim());
  if (!tag) return undefined;

  const attributes: MdxJsxAttribute[] = [];
  for (const match of (tag[2] ?? "").matchAll(RAW_ATTR)) {
    const name = match[1] ?? match[5];
    if (name) attributes.push(attr(name, (match[2] ?? match[3] ?? match[4] ?? "true").trim()));
  }

  return { type: "mdxJsxFlowElement", name: "Image", attributes, children: [] };
}

/** Whether the node already carries exactly these attributes. */
function same(node: MdxJsxFlowElement | undefined, next: MdxJsxAttribute[]): boolean {
  const current = (node?.attributes ?? []).filter(
    (attribute): attribute is MdxJsxAttribute => attribute.type === "mdxJsxAttribute",
  );
  if (node?.name !== "Image" || current.length !== next.length) return false;

  return current.every(
    (attribute, index) =>
      attribute.name === next[index]?.name && attribute.value === next[index]?.value,
  );
}

/**
 * The one place the rules live: facts in, `<Image>` out.
 *
 * `alt` is required, so it falls back to `caption` and then to the file name.
 * `caption` is always emitted — an authored one when the source had it, a blank one
 * otherwise, so the alt text is never published as a visible caption.
 */
function toImage(
  facts: Facts,
  was: string,
  line: number | undefined,
  notes: ConversionNote[],
  state: State,
  from?: MdxJsxFlowElement,
): MdxJsxFlowElement | undefined {
  if (!facts.src) {
    note(notes, "blocker", `<${was}> has no src — left in place, since there is no image to point at`, line);
    return undefined;
  }

  // A whitespace-only caption is this converter's own blank marker, not something
  // to promote into the alt text.
  const authored = facts.alt ?? (facts.caption?.trim() ? facts.caption : undefined);
  const alt = authored ?? altFromSrc(facts.src);

  // `src` and `alt` carry the content; `caption` is always written, because the
  // component renders `caption || alt` in a `<figcaption>` [APP Image.tsx] — so an
  // image with no caption would otherwise publish its alt text as a visible one.
  // A blank caption is what keeps the figure silent.
  const attributes = [
    attr("src", facts.src),
    ...(alt ? [attr("alt", alt)] : []),
    attr("caption", facts.caption?.trim() ? facts.caption : BLANK_CAPTION),
  ];

  if (/^https?:\/\//i.test(facts.src)) state.external += 1;

  if (!same(from, attributes)) {
    const percentage = facts.dropped.some((text) => text.includes("%"))
      ? " — a percentage has no target form, since the component reads it with parseInt"
      : "";
    const lost = facts.dropped.length > 0 ? `, dropping ${facts.dropped.join(", ")}` : "";
    note(notes, "change", `<${was}> -> <Image src alt />${lost}${percentage}`, line);
  }

  if (facts.sized?.length) {
    note(
      notes,
      "flag",
      `dropped ${facts.sized.join(" and ")}, which was a real size — the image now publishes at the component's 800x600 default. Re-add it by hand if this is a logo or an image that must stay small`,
      line,
    );
  }

  if (alt && !authored) {
    note(notes, "flag", `alt was missing, so it was read off the file name as "${alt}" — replace it with a description of the image`, line);
  }
  if (!alt) {
    note(notes, "blocker", "image has no alt and the file name carries no words to derive one from — alt is required, so write one", line);
  }

  return { type: "mdxJsxFlowElement", name: "Image", attributes, children: [] };
}

/** The meaningful children of a node, ignoring whitespace. */
function meaningful(node: Parent): RootContent[] {
  return (node.children as RootContent[]).filter(
    (child) => !(child.type === "text" && child.value.trim().length === 0),
  );
}

/**
 * One block-level node -> an `<Image>`, if it is one.
 *
 * Only a standalone image qualifies: a markdown image alone in its paragraph, a
 * JSX element, or a raw tag on a fallback-parsed page.
 */
function asImage(
  node: RootContent,
  notes: ConversionNote[],
  state: State,
): MdxJsxFlowElement | undefined {
  const line = lineOf(node);

  if (node.type === "mdxJsxFlowElement" && (node.name === "Image" || node.name === "img")) {
    return toImage(factsFromJsx(node), node.name, line, notes, state, node);
  }

  if (node.type === "html") {
    const raw = fromRawTag(node.value);
    return raw && toImage(factsFromJsx(raw), "img", line, notes, state);
  }

  if (node.type === "paragraph") {
    const [only] = meaningful(node);
    if (meaningful(node).length !== 1 || !only) return undefined;

    if (only.type === "image") return toImage(factsFromMarkdown(only), "![…]", line, notes, state);
    if (only.type === "html") {
      const raw = fromRawTag(only.value);
      return raw && toImage(factsFromJsx(raw), "img", line, notes, state);
    }
  }

  return undefined;
}

function walk(root: Root | Parent, notes: ConversionNote[], state: State): void {
  liftInlineJsx(root, new Set(["Image", "img"]), notes);

  const children = root.children as RootContent[];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    const image = asImage(child, notes, state);
    if (image) {
      if (child.position) image.position = child.position;
      children[i] = image;
      continue;
    }

    if (!("children" in child) || !Array.isArray((child as Parent).children)) continue;
    const parent = child as Parent;

    // Anything still an image is staying put. Say so once, rather than leaving it
    // to be noticed on the rendered page.
    for (const inner of parent.children as RootContent[]) {
      if (inner.type !== "image") continue;
      const where =
        parent.type === "link" ? "inside a link" : parent.type === "tableCell" ? "inside a table cell" : "inside a paragraph";
      note(
        notes,
        "flag",
        `image left as markdown because it sits ${where} — <Image> renders a <figure>, which cannot be nested there. It will render as a plain <img>`,
        lineOf(inner),
      );
    }

    walk(parent, notes, state);
  }
}

/**
 * Converts every image on a page.
 *
 * Runs after the table pass, which has already turned an image inside a cell into
 * a link to it, so nothing here has to reason about cells.
 */
export function convertImages(root: Root | Parent, notes: ConversionNote[]): void {
  const state: State = { external: 0 };
  walk(root, notes, state);

  if (state.external > 0) {
    note(
      notes,
      "flag",
      `${state.external} image${state.external === 1 ? "" : "s"} still point at an external host — the CDN loader passes non-CDN URLs through unchanged [APP imgixLoader.ts], so these are served unoptimised and stay dependent on the platform being left behind. Re-host them through the editor`,
    );
  }
}
