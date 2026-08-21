import type { Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";

import { classify, definedHere, propNames, type FoundCustom } from "./custom-components";
import { liftInlineJsx, lineOf, type ConversionNote } from "./mdast";
import { toMdx } from "./one-to-one";

/**
 * Plan §4.4 rung 3 — the components nothing converted, put somewhere they cannot
 * break the build.
 *
 * ## The problem this solves
 *
 * `detectCustomComponents` says a tag is unconverted. It does not move it, so the
 * tag ships as-is — and an undefined JSX component is not a cosmetic problem on
 * the target, it is a **compile error** `[PIT Phase 5]`. One `<QuizGame>` nobody
 * mapped fails the whole page, which turns a content problem into a deployment
 * problem. The plan is explicit that this is the thing not to do.
 *
 * Deleting it is worse: `[PIT Phase 2]` — content loss is invisible to a compile,
 * so a page that drops the tag builds green and reads as complete with a block
 * missing.
 *
 * ## Backticks settle it
 *
 * So the tag is kept, verbatim, inside a fence. Nothing inside a code fence is
 * MDX, so the page compiles; every character the author wrote is still on it, so
 * nothing is lost; and a reader sees exactly what has not been dealt with yet.
 * This is the same reasoning `placeholders.ts` uses for tag-shaped prose, applied
 * one level up — there to text that only looks like a component, here to a
 * component that is real but has no home.
 *
 * The fence is **review scaffolding and must not ship** `[PLAN §4.4 rung 3]`. It
 * is a holding pen with a paper trail, not an answer: the report this returns is
 * the queue of decisions still owed, and rung 3 exists so that queue can be worked
 * through without the corpus being broken or quietly thinned in the meantime.
 *
 * ## Why it runs after the detector, not instead of it
 *
 * The detector's whole design is that it converts nothing — it runs last and reads
 * *"still a JSX element"* as *"nothing handled this"*. Fold the rewrite into it and
 * that reading stops being true mid-pass. Keeping them separate also keeps the
 * notes honest: the detector explains **what** each tag is and why it is a flag or
 * a blocker, and this pass adds one line about **where** they all went.
 */

/** One quarantined component: what it was, where it was, and its exact source. */
export type Quarantined = {
  name: string;
  kind: FoundCustom["kind"];
  /** Line in the *repaired* source — the same line the detector's note carries. */
  line?: number;
  /** Attribute names on this instance, in source order. */
  props: string[];
  /**
   * The component as it was written, byte for byte, and now the fence's body.
   * This is what someone converting it by hand reads, so it is the whole node —
   * children included — not just the opening tag.
   */
  source: string;
  /**
   * `true` when the component sat inside a sentence rather than between blocks.
   * Those become `inlineCode` instead of a fence, because a block node cannot go
   * in a paragraph — putting one there is the invalid MDX this pass exists to
   * prevent.
   */
  inline: boolean;
};

export type QuarantineOptions = {
  /** Same meaning as `DetectOptions.mode`. */
  mode?: "mdx" | "markdown";
  /** Same set the detector is given — names a Marketplace rule already attempted. */
  handled?: ReadonlySet<string>;
  /** Same set the detector is given — names `convertLocalComponents` reported on. */
  localHandled?: ReadonlySet<string>;
};

/**
 * The node as MDX, exactly as it would have been written to the page.
 *
 * Serialising the node beats slicing the original source by offset: every pass
 * above has been free to move nodes around, and a node that moved carries a
 * `position` pointing at where it *used* to be. The tree is the truth by now.
 *
 * An inline element is wrapped in a paragraph first — `remark-stringify` walks
 * block content from the root, and a phrasing node handed to it directly has no
 * container to be serialised in.
 */
function sourceOf(node: MdxJsxFlowElement | MdxJsxTextElement): string {
  const child: RootContent =
    node.type === "mdxJsxTextElement"
      ? { type: "paragraph", children: [node] }
      : node;

  return toMdx({ type: "root", children: [child] }).trim();
}

/**
 * Replaces every unconverted component with its own source, quoted.
 *
 * Returns the report rather than only writing notes, because *"which components
 * are still owed a decision, and where"* is a question asked across a corpus and
 * answered per page — the same reason `detectCustomComponents` returns its
 * findings `[PIT Phase 0]`.
 */
export function quarantineCustomComponents(
  root: Root,
  notes: ConversionNote[],
  options: QuarantineOptions = {},
): Quarantined[] {
  // A page that fell back to the plain parser has no typed JSX to replace — its
  // tags are characters inside `html` nodes, and rewriting those by regex is the
  // guesswork this pass exists to avoid. Such a page already carries a blocker
  // saying its syntax needs repairing; repairing it is what makes this pass able
  // to help, and doing it in the wrong order helps nobody.
  if (options.mode === "markdown") return [];

  const defined = definedHere(root);
  const handled = options.handled ?? new Set<string>();
  const localHandled = options.localHandled ?? new Set<string>();
  const report: Quarantined[] = [];

  // A component alone on one line parses as an `mdxJsxTextElement` *inside a
  // paragraph*, so without this it would be quoted with backticks — correct, but
  // wrong-looking: a block component reads as a fence, and a fence is what a
  // person scanning for what is left to do is looking for. Lifting first means
  // backticks are reserved for what is genuinely mid-sentence.
  //
  // The names cannot be known in advance — this pass discovers them — so the tree
  // is read once to find them and only then lifted. The same lift the Marketplace
  // and local passes do with the names they already know.
  const candidates = new Set<string>();
  const scout = (parent: Parent): void => {
    for (const child of parent.children as RootContent[]) {
      if (
        (child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement") &&
        child.name !== null &&
        classify(child.name, defined, handled, localHandled) !== null
      ) {
        candidates.add(child.name);
      }
      if ("children" in child && Array.isArray((child as Parent).children)) scout(child as Parent);
    }
  };
  scout(root);
  if (candidates.size > 0) liftInlineJsx(root, candidates, notes);

  const walk = (parent: Parent): void => {
    const children = parent.children as RootContent[];

    for (let index = 0; index < children.length; index += 1) {
      const child = children[index];
      if (child === undefined) continue;

      const jsx =
        child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement" ? child : null;
      const kind = jsx !== null && jsx.name !== null ? classify(jsx.name, defined, handled, localHandled) : null;

      if (jsx !== null && jsx.name !== null && kind !== null) {
        const inline = jsx.type === "mdxJsxTextElement";
        const source = sourceOf(jsx);

        report.push({ name: jsx.name, kind, line: lineOf(jsx), props: propNames(jsx), source, inline });

        children[index] = inline
          ? { type: "inlineCode", value: source }
          : { type: "code", lang: "mdx", value: source };

        // Its children went into the fence with it. Descending now would walk a
        // node that is no longer in the tree and quarantine the same content
        // twice — once inside the fence, once as a sibling of it.
        continue;
      }

      if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);
    }
  };

  walk(root);

  if (report.length > 0) {
    const names = [...new Set(report.map((entry) => entry.name))];
    notes.push({
      rule: "custom-component",
      level: "flag",
      detail:
        `${report.length} unconverted component${report.length === 1 ? "" : "s"} ` +
        `(${names.map((name) => `<${name}>`).join(", ")}) ${report.length === 1 ? "was" : "were"} ` +
        "moved into code fences so the page compiles and nothing is lost (plan §4.4 rung 3). " +
        "The fences are review scaffolding: convert each one and delete it before publishing",
    });
  }

  return report;
}
