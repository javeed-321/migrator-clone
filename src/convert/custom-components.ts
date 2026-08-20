import type { Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";

import { HTML_ELEMENTS, KNOWN_COMPONENTS, MARKETPLACE } from "./known-names";
import { lineOf, type ConversionNote } from "./mdast";

/**
 * Plan §4 — find the components nothing else knew how to convert.
 *
 * This pass converts nothing. It answers one question per leftover tag — *do we
 * know what this draws?* — and that answer decides whether the tag is a table
 * lookup, an AI job, or a stop condition.
 *
 * ## Why it has to run last
 *
 * Every pass before this one claims a construct it recognises: `<Accordion>` is
 * gone by the time `convertAccordions` returns, `<Glossary>` by the time
 * `convertGlossary` does. So the detector does not need to know what is
 * convertible — **whatever is still a JSX element at the end of the pipeline is,
 * by definition, unhandled.** Run early and it would report `<Accordion>` as
 * unknown moments before the accordion pass converted it.
 *
 * ## The hole this closes
 *
 * Before this pass, an unrecognised component was copied into the output
 * byte-for-byte with no note of any kind. That is the quietest possible failure:
 * the conversion reports success, the page looks converted, and the tag only
 * surfaces later as a Documentation.AI build error `[PIT Phase 5]` — or, for an
 * `export const`, as no error at all and nothing rendered. `[PIT Phase 2]`:
 * content loss is invisible to a compile.
 */

/** One leftover component, and what is known about it. */
export type FoundCustom = {
  name: string;
  /**
   * - `marketplace` — one of ReadMe's 24 public components. Behaviour is knowable
   *   from the plan's §4.2 table; no source needed.
   * - `local` — defined by an `export const` on this very page, so the source is
   *   in hand and an equivalent can be chosen from it.
   * - `unknown` — a project custom component whose definition lives in ReadMe's
   *   *Settings → Custom Components*, i.e. **not in the file we downloaded**.
   */
  kind: "marketplace" | "local" | "unknown";
  line?: number;
  /** Attribute names on this instance, in source order. Empty when there are none. */
  props: string[];
};

export type DetectOptions = {
  /**
   * Names a conversion rule already attempted.
   *
   * A rule that declines leaves its node in place and pushes a precise blocker of
   * its own. Reporting it again here would be a duplicate — and a wrong one,
   * since this pass would call a fully documented component "a custom component
   * whose definition is not in this file".
   */
  handled?: ReadonlySet<string>;
  /**
   * Which parser produced the tree. In `markdown` the strict parser rejected the
   * page, so JSX arrives as opaque `html` nodes instead of typed ones and the
   * detection below is necessarily coarser.
   */
  mode?: "mdx" | "markdown";
};

/**
 * Component names defined by an `export const` on this page.
 *
 * This set is the whole `local` / `unknown` distinction. ReadMe authors a custom
 * component in the dashboard, but MDX requires the `export` keyword to define one
 * `[RM §8]`, so a page that carries its own component carries its own source —
 * and a page that only *uses* one carries nothing but the call site.
 *
 * Read off the raw `mdxjsEsm` value rather than its estree: the node's `value` is
 * the authored text, the parse is optional (`data.estree` is only populated when
 * a plugin asks for it), and a name is all that is wanted here.
 */
export function definedHere(root: Root): Set<string> {
  const names = new Set<string>();

  for (const node of root.children) {
    if (node.type !== "mdxjsEsm") continue;
    for (const match of node.value.matchAll(/export\s+(?:const|let|var|function)\s+([A-Z][A-Za-z0-9_]*)/g)) {
      if (match[1]) names.add(match[1]);
    }
  }

  return names;
}

/**
 * Which bucket a leftover name falls into, or `null` when it is not leftover.
 *
 * **`defined` is checked before `MARKETPLACE`, and the order is load-bearing.**
 * A Marketplace component is installed *into* a project as an editable Custom
 * Component `[RM §9]`. So a page holding a local definition for a Marketplace
 * name is a page whose author changed it, and the standard §4.2 mapping would
 * describe a component this site does not have. Local source always wins.
 */
function classify(
  name: string,
  defined: Set<string>,
  handled: ReadonlySet<string>,
): FoundCustom["kind"] | null {
  if (HTML_ELEMENTS.has(name)) return null;
  if (KNOWN_COMPONENTS.has(name)) return null;
  if (handled.has(name) && !defined.has(name)) return null;
  if (defined.has(name)) return "local";
  if (MARKETPLACE.has(name)) return "marketplace";
  return "unknown";
}

function isJsxElement(node: RootContent): node is MdxJsxFlowElement | MdxJsxTextElement {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}

function propNames(node: MdxJsxFlowElement | MdxJsxTextElement): string[] {
  return (node.attributes ?? [])
    .map((attribute) => (attribute.type === "mdxJsxAttribute" ? attribute.name : "{...spread}"))
    .filter((name): name is string => typeof name === "string");
}

/**
 * Every `</Name>` on a fallback-parsed page — the evidence that an opening tag was
 * an element rather than prose.
 *
 * The same test `placeholders.ts` uses, for the same reason: in `markdown` mode
 * there are no typed nodes, so *"is `<Spoiler>` a component or a sentence about
 * one?"* can only be answered by whether the page closes it. Self-closing tags are
 * collected separately, since they never have a closer.
 */
function fallbackTags(root: Parent): { opened: Map<string, number>; closed: Set<string>; selfClosed: Set<string> } {
  const opened = new Map<string, number>();
  const closed = new Set<string>();
  const selfClosed = new Set<string>();

  const walk = (node: Parent): void => {
    for (const child of node.children as RootContent[]) {
      if (child.type === "html") {
        for (const match of child.value.matchAll(/<([A-Z][A-Za-z0-9_]*)\b[^>]*?(\/?)>/g)) {
          const name = match[1];
          if (!name) continue;
          if (!opened.has(name)) opened.set(name, child.position?.start.line ?? 0);
          if (match[2] === "/") selfClosed.add(name);
        }
        for (const match of child.value.matchAll(/<\/([A-Z][A-Za-z0-9_]*)\s*>/g)) {
          if (match[1]) closed.add(match[1]);
        }
      }
      if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);
    }
  };

  walk(root);
  return { opened, closed, selfClosed };
}

/**
 * Reports every component left unconverted, and returns them for the run-wide
 * inventory (plan §4.4 step 4 — *every unmapped construct is a queue item, never a
 * silent drop*).
 *
 * Levels follow what a person can actually do about each one:
 *
 * | Kind | Level | Because |
 * |---|---|---|
 * | `marketplace` | `flag` | The mapping is already written down in plan §4.2 |
 * | `local` | `flag` | The source is on the page; an equivalent can be chosen from it |
 * | `unknown` | `blocker` | The definition is not in the file — converting it would be a guess |
 *
 * `unknown` is a blocker for the same reason `<Recipe>` is one: the thing needed to
 * do the work is not in what was downloaded `[PIT Phase 0]`.
 */
export function detectCustomComponents(
  root: Root,
  notes: ConversionNote[],
  options: DetectOptions = {},
): FoundCustom[] {
  const defined = definedHere(root);
  const handled = options.handled ?? new Set<string>();
  const found: FoundCustom[] = [];

  for (const node of root.children) {
    if (node.type !== "mdxjsEsm") continue;
    notes.push({
      rule: "custom-component",
      level: "flag",
      line: lineOf(node),
      detail:
        "an `export const` defines a component on this page — Documentation.AI has no custom-component surface (plan §4.2), so this definition renders nothing and must be removed once its usages are converted",
    });
  }

  if (options.mode === "markdown") {
    // No typed nodes to walk. Fall back to tag evidence, and say so: `export
    // const` is plain text here, so every local component looks like an unknown
    // one. A page in this mode is already flagged as needing repair and has had
    // no component conversions at all, so the coarser answer costs nothing.
    const { opened, closed, selfClosed } = fallbackTags(root);

    for (const [name, line] of opened) {
      if (!closed.has(name) && !selfClosed.has(name)) continue;
      const kind = classify(name, defined, handled);
      if (kind === null) continue;
      found.push({ name, kind, line: line || undefined, props: [] });
    }
  } else {
    const walk = (parent: Parent): void => {
      for (const child of parent.children as RootContent[]) {
        if (isJsxElement(child) && child.name !== null) {
          const kind = classify(child.name, defined, handled);
          if (kind !== null) {
            found.push({ name: child.name, kind, line: lineOf(child), props: propNames(child) });
          }
        }
        if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);
      }
    };

    walk(root);
  }

  for (const entry of found) notes.push(noteFor(entry, options.mode));

  return found;
}

function noteFor(entry: FoundCustom, mode: DetectOptions["mode"]): ConversionNote {
  const base = { rule: "custom-component", line: entry.line } as const;

  if (entry.kind === "marketplace") {
    return {
      ...base,
      level: "flag",
      detail: `<${entry.name}> is a ReadMe Marketplace component (RM §9) — plan §4.2 gives its Documentation.AI equivalent; it has not been converted`,
    };
  }

  if (entry.kind === "local") {
    return {
      ...base,
      level: "flag",
      detail: `<${entry.name}> is defined by an \`export const\` on this page — choose a Documentation.AI equivalent from that source (plan §4.4)`,
    };
  }

  return {
    ...base,
    level: "blocker",
    detail:
      `<${entry.name}> is a custom component whose definition is not in this file — it lives in ReadMe's Settings → Custom Components. ` +
      (mode === "markdown"
        ? "This page also fell back to the plain parser, so a local `export const` would not have been seen. "
        : "") +
      "Fetch the definition or decide what it should become; do not convert it on a guess (plan §4.2)",
  };
}
