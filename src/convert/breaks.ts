import type { Parent, Root, RootContent } from "mdast";

import { lineOf, type ConversionNote } from "./mdast";

/**
 * Plan §3.6 — **`<br>` is stripped**, in every spelling, and nothing takes its
 * place.
 *
 * **[CORPUS]** 1,943 in the Capillary pages, **95 of them unclosed** `[RM §10.8,
 * §12 gotcha 2]`. In-table ones are already gone by the time this runs — the table
 * pass turns them into `•` separators (`TableConversion.md` §7.1) — so this pass
 * owns the rest.
 *
 * ## What the target actually accepts, checked in its own source
 *
 * Documentation.AI compiles the page with `next-mdx-remote`, `remarkGfm` and three
 * rehype plugins, and **`rehypeRaw` is not among them**
 * `[APP MDXRemoteServer.tsx]`. HTML is therefore parsed as JSX, and `br` is not in
 * the component map, so it falls through to the intrinsic element. That splits the
 * two spellings:
 *
 * | Form | On the target |
 * |---|---|
 * | `<br />` self-closed | **compiles, and renders a real line break** |
 * | `<br>` unclosed | **build failure** — *"Expected a closing tag for `<br>`"* |
 *
 * So this is not "the platform cannot render it". `<br />` works. Both are removed
 * anyway, because the corpus mixes the two spellings freely, 95 of them would fail
 * the build outright, and a line break is presentation the renderer already
 * handles — blocks are spaced without it.
 *
 * ## What replaces it: nothing
 *
 * The tag is deleted and the text closes up. A break inside a sentence leaves a
 * **single space**, so words do not collide; a break standing between blocks
 * leaves nothing at all. No new paragraph, no blank line — the surrounding content
 * keeps the shape the author gave it.
 */

/** `<br>`, `<br/>`, `<br />` — as a raw-HTML token inside a string. */
const BR_TOKEN = /<br\s*\/?>/i;
/** The same, global. Kept separate: `.test()` on a `/g` regex carries `lastIndex`. */
const BR_TOKEN_ALL = /<br\s*\/?>/gi;
/** The same, as the whole value of a node. */
const BR_ONLY = /^(?:\s*<br\s*\/?>\s*)+$/i;

/**
 * Parents that hold *inline* content.
 *
 * A break inside one was separating words, so it leaves a space. Anywhere else it
 * was separating blocks, which the renderer spaces on its own, so it leaves
 * nothing.
 */
const INLINE_PARENTS = new Set([
  "paragraph",
  "heading",
  "tableCell",
  "strong",
  "emphasis",
  "delete",
  "link",
  "linkReference",
]);

/** Every spelling of a break that arrives as its own node. */
function isBreakNode(node: RootContent): boolean {
  if (node.type === "mdxJsxTextElement" || node.type === "mdxJsxFlowElement") {
    return node.name === "br";
  }
  // On a page that fell back to the plain parser, `<br>` is an `html` node.
  return node.type === "html" && BR_ONLY.test(node.value);
}

/**
 * Merges adjacent text nodes and collapses the whitespace a removed tag left
 * behind, so `One<br /> Two` closes up to `One Two` rather than `One  Two`.
 */
function tidy(children: RootContent[]): RootContent[] {
  const out: RootContent[] = [];

  for (const node of children) {
    const previous = out[out.length - 1];
    if (node.type === "text" && previous?.type === "text") {
      previous.value += node.value;
      continue;
    }
    out.push(node);
  }

  for (const node of out) {
    if (node.type === "text") node.value = node.value.replace(/[ \t]{2,}/g, " ");
  }

  const head = out[0];
  if (head?.type === "text") head.value = head.value.replace(/^[ \t]+/, "");
  const tail = out[out.length - 1];
  if (tail?.type === "text") tail.value = tail.value.replace(/[ \t]+$/, "");

  return out.filter((node) => !(node.type === "text" && node.value.length === 0));
}

/**
 * Strips every `<br>` on a page.
 *
 * Recurses into everything, so a break inside a `<Callout>`, a list item or a
 * heading is caught in the same walk. Fenced code is a `code` node with no
 * children, so a `<br>` written *as an example* is never touched.
 */
export function convertBreaks(root: Root | Parent, notes: ConversionNote[]): number {
  const inline = INLINE_PARENTS.has(root.type);
  const children = root.children as RootContent[];
  const kept: RootContent[] = [];
  /** Removed from this node's own children — what the note reports. */
  let removed = 0;
  /** Removed anywhere below it — what decides whether this level needs tidying. */
  let below = 0;

  for (const child of children) {
    if (isBreakNode(child)) {
      removed += 1;
      // A run of two or more is vertical padding, not two breaks: the tidy pass
      // collapses the spaces they leave into one.
      if (inline) kept.push({ type: "text", value: " " } as RootContent);
      continue;
    }

    // The escaped `\<br>` is the case a node walk cannot catch on its own: the
    // parser resolves the escape to the **literal characters** `<br>` inside a
    // text node, so there is no element to match `[RM §12 gotcha 1]`.
    if (child.type === "text" && BR_TOKEN.test(child.value)) {
      removed += child.value.match(BR_TOKEN_ALL)?.length ?? 0;
      kept.push({ ...child, value: child.value.replace(BR_TOKEN_ALL, " ") });
      continue;
    }

    // A break sharing an `html` node with other markup: strip the token and keep
    // whatever else was in there for the pass that owns it.
    if (child.type === "html" && BR_TOKEN.test(child.value)) {
      removed += child.value.match(BR_TOKEN_ALL)?.length ?? 0;
      const rest = child.value.replace(BR_TOKEN_ALL, " ");
      if (rest.trim().length > 0) kept.push({ ...child, value: rest });
      continue;
    }

    if ("children" in child && Array.isArray((child as Parent).children)) {
      below += convertBreaks(child as Parent, notes);
    }
    kept.push(child);
  }

  if (removed + below === 0) return 0;

  const tidied = tidy(kept);
  // A paragraph that held nothing but breaks has no content left to keep — which
  // is why an ancestor tidies even when the breaks were all removed below it.
  (root as Parent).children = (
    inline ? tidied : tidied.filter((node) => !(node.type === "paragraph" && node.children.length === 0))
  ) as Parent["children"];

  if (removed > 0) {
    notes.push({
      rule: "break",
      level: "change",
      line: lineOf(root as { position?: { start: { line: number } } }),
      detail: `removed ${removed} <br> — the tag is dropped and the text closes up${inline ? "" : ", since the renderer spaces blocks itself"}`,
    });
  }

  return removed + below;
}
