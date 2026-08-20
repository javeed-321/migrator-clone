/**
 * Reads an `export const` component's source and says what it draws.
 *
 * ## Why this file exists at all
 *
 * A Marketplace component and a project custom component are the **same
 * artefact** — `marketplace-main/components/Latex/Latex.mdx` is literally an
 * `export const` sitting in a page `[MP Latex]`. The only difference is *when*
 * the source is available: ReadMe publishes the 24 Marketplace ones, so
 * `src/convert/marketplace/` could hand-write a rule per component ahead of
 * time. A customer's own component is only in hand at conversion time, so the
 * classification a human did 24 times over there has to happen here, in code.
 *
 * ## What it deliberately does not attempt
 *
 * This reads *signals*, not JSX. It is a classifier, not a compiler, and the
 * moment it is unsure it says `blocked` and stops. That asymmetry is the whole
 * design: a wrong `blocked` costs someone five minutes, and a wrong conversion is
 * invisible content loss that survives a passing build `[PIT Phase 2]`.
 *
 * The shapes it does claim are the ones most real custom components have,
 * because most custom components exist to draw a coloured box.
 */

import type { Root, RootContent } from "mdast";

export type Tone = "info" | "tip" | "alert" | "danger" | "success";

export type LocalShape =
  /** A box whose only content is `children`. -> `<Callout kind>` */
  | { kind: "callout"; tone: Tone }
  /** A box with no visual identity at all. -> its children, unwrapped */
  | { kind: "unwrap" }
  /** A title slot plus `children`, static. -> `<Callout>` with a bold first line */
  | { kind: "titled"; tone: Tone; titleProp: string }
  /** A title slot plus `children`, toggled by React state. -> `<Expandable>` */
  | { kind: "expandable"; titleProp: string }
  /** Not convertible without a person. `why` is written for that person. */
  | { kind: "blocked"; why: string };

export type EsmNode = Extract<RootContent, { type: "mdxjsEsm" }>;

/** One `export const` on the page: its name, its own slice of source, its shape. */
export type Definition = {
  name: string;
  source: string;
  shape: LocalShape;
  /** The `mdxjsEsm` node the definition was written in. */
  owner: EsmNode;
};

/** Prop names that mean "the heading of this box". */
const TITLE_SLOTS = new Set(["title", "header", "heading", "label", "summary", "caption"]);

/**
 * A top-level component definition. Uppercase-initial only, because that is what
 * JSX treats as a component — `export const config = …` is data, not a tag.
 */
const DEFINITION = /^[ \t]*export\s+(?:const|let|var|function)\s+([A-Z][A-Za-z0-9_]*)/gm;

/**
 * A rendered slot: `{children}` or `{props.title}`.
 *
 * Matching the *expression* rather than the destructured parameter list is what
 * makes this precise. `({ title, children })` says a prop exists; `{props.title}`
 * says it is drawn. Only the second decides where content lives, and content
 * location is the entire question `[marketplace-conversion.md §3]`.
 *
 * The leading path is optional and unbounded because the parameter has no fixed
 * name: `{children}`, `{props.children}` and `{p.children}` are all the same
 * slot, and hard-coding `props.` would block a component for a one-letter
 * parameter name.
 */
const SLOT = /\{\s*(?:[A-Za-z_$][\w$]*\s*\.\s*)*([A-Za-z_$][\w$]*)\s*\}/g;

const STATEFUL = /\buse(?:State|Reducer|Effect|Ref|Context|LayoutEffect)\s*\(/;
const NETWORKED = /\bfetch\s*\(|\bimport\s*\(|XMLHttpRequest|axios\./;
const ITERATES = /\.\s*map\s*\(/;
const BOX = /background|bg-|border|shadow|rounded|padding|\bp-\d|\bpx-\d|\bpy-\d/i;

/** A colour that means something. Grey and blue are default-box colours, so weak. */
const STRONG_COLOURS: ReadonlyArray<readonly [RegExp, Tone]> = [
  [/\b(red|rose|crimson|maroon)\b/i, "danger"],
  [/\b(yellow|amber|orange|gold)\b/i, "alert"],
  [/\b(green|emerald|lime|teal)\b/i, "success"],
  [/\b(purple|violet|fuchsia)\b/i, "tip"],
];

/** What the author called it. Checked after colour, because colour is what renders. */
const NAME_TONES: ReadonlyArray<readonly [RegExp, Tone]> = [
  [/danger|destruct|critical|fatal/i, "danger"],
  [/warn|caution|alert|important|error/i, "alert"],
  [/success|complete|passed/i, "success"],
  [/tip|hint|advice|best.?practice/i, "tip"],
  [/note|info|remark|aside|callout/i, "info"],
];

const WEAK_COLOURS = /\b(blue|sky|cyan|azure|indigo|slate|gray|grey|neutral|zinc|stone)\b/i;

/** Everything from the first JSX tag onwards — the part that renders. */
function jsxOf(source: string): string {
  const start = source.search(/<[A-Za-z]/);
  return start === -1 ? "" : source.slice(start);
}

/** The outermost element's tag, where its `className` and `style` live. */
function outerTag(jsx: string): string {
  return /<[A-Za-z][A-Za-z0-9.]*[^>]*>/.exec(jsx)?.[0] ?? "";
}

/** Opening and self-closing tags. Closing tags start with `/` and are not counted. */
function countTags(jsx: string): number {
  return (jsx.match(/<[A-Za-z][A-Za-z0-9.]*/g) ?? []).length;
}

function slotsIn(source: string): Set<string> {
  const slots = new Set<string>();
  for (const match of source.matchAll(SLOT)) {
    if (match[1]) slots.add(match[1]);
  }
  return slots;
}

/**
 * Which `<Callout kind>` the box is, or `null` when it is not a callout at all.
 *
 * Order: **strong colour, then name, then a weak colour or any box at all.** A
 * red box named `Note` is red on the page and the reader sees the colour, so
 * colour wins where it carries meaning. Grey and blue carry none — they are what
 * an undecorated box looks like — so there the author's name is better evidence.
 *
 * `null` means the wrapper adds no visual identity, and the honest conversion is
 * to unwrap it rather than invent a callout that was never on the page.
 */
export function toneOf(name: string, tag: string): Tone | null {
  for (const [pattern, tone] of STRONG_COLOURS) {
    if (pattern.test(tag)) return tone;
  }
  for (const [pattern, tone] of NAME_TONES) {
    if (pattern.test(name)) return tone;
  }
  if (WEAK_COLOURS.test(tag)) return "info";
  return BOX.test(tag) ? "info" : null;
}

/**
 * The classifier. Every `blocked` reason names the specific thing that stopped
 * it, because "unsupported" is not something anyone can act on.
 */
export function classifyShape(name: string, source: string): LocalShape {
  const jsx = jsxOf(source);
  if (jsx === "") {
    return { kind: "blocked", why: "it returns no JSX, so there is nothing on the page to convert" };
  }

  if (NETWORKED.test(source)) {
    return {
      kind: "blocked",
      why: "it loads something over the network while rendering — the content is not in the page. If the endpoint is public it can be prerendered the way `<PostList>` is (marketplace-conversion.md §5.5)",
    };
  }

  if (ITERATES.test(source)) {
    return {
      kind: "blocked",
      why: "it builds a list from a prop with `.map` — the row and column shape lives in the JSX inside that `.map`, which this pass does not read. Convert it by hand to a table or `<Steps>`, the way `<AdvancedTable>` was",
    };
  }

  const slots = slotsIn(source);
  if (!slots.has("children")) {
    return {
      kind: "blocked",
      why: "it never renders `children` — everything it shows comes from its props, so there is no content slot to map onto a Documentation.AI component",
    };
  }

  const tags = countTags(jsx);
  if (tags > 4) {
    return {
      kind: "blocked",
      why: `it draws ${tags} elements, which is more than a box around its children — the layout has to be rebuilt deliberately rather than matched to one component`,
    };
  }

  const titleProp = [...slots].find((slot) => TITLE_SLOTS.has(slot.toLowerCase()));
  const stateful = STATEFUL.test(source);

  if (titleProp !== undefined) {
    // State plus a title is the collapsible shape: the state exists to hide and
    // show the children under that title. `<Expandable>` is that component.
    return stateful
      ? { kind: "expandable", titleProp }
      : { kind: "titled", tone: toneOf(name, outerTag(jsx)) ?? "info", titleProp };
  }

  if (stateful) {
    return {
      kind: "blocked",
      why: "it holds React state but has no title to collapse under, so it is interactive in some other way — Documentation.AI runs no component code, and guessing which static component to leave behind would change what the page says",
    };
  }

  const tone = toneOf(name, outerTag(jsx));
  return tone === null ? { kind: "unwrap" } : { kind: "callout", tone };
}

/**
 * Every component defined on the page, each with only its own source.
 *
 * The slice matters: an `mdxjsEsm` node can hold several statements, and
 * classifying `<Note>` against a neighbouring component's `useState` would block
 * a plain wrapper for something it does not do.
 */
export function collectDefinitions(root: Root): Map<string, Definition> {
  const defs = new Map<string, Definition>();

  for (const node of root.children) {
    if (node.type !== "mdxjsEsm") continue;

    const starts: Array<{ name: string; at: number }> = [];
    for (const match of node.value.matchAll(DEFINITION)) {
      if (match[1]) starts.push({ name: match[1], at: match.index ?? 0 });
    }

    for (let index = 0; index < starts.length; index += 1) {
      const start = starts[index];
      if (!start) continue;
      const end = starts[index + 1]?.at ?? node.value.length;
      const source = node.value.slice(start.at, end);
      defs.set(start.name, {
        name: start.name,
        source,
        shape: classifyShape(start.name, source),
        owner: node,
      });
    }
  }

  return defs;
}

/** Names an `mdxjsEsm` node defines. Empty means it is imports only. */
export function namesIn(node: EsmNode): string[] {
  return [...node.value.matchAll(DEFINITION)]
    .map((match) => match[1])
    .filter((name): name is string => name !== undefined);
}
