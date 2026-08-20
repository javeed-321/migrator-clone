import type { Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";

import { attr, liftInlineJsx, lineOf, readAttr, type ConversionNote } from "../mdast";
import { boldPara, expandable } from "../marketplace/rule";
import { collectDefinitions, namesIn, type Definition, type EsmNode, type LocalShape } from "./shapes";

/**
 * Plan §4.4 / marketplace-conversion.md §8 — components defined by an
 * `export const` on the page being converted.
 *
 * ## The three-pass shape, and why it is three
 *
 * ```
 * 1. read every definition            -> Map<name, shape>
 * 2. rewrite every usage              -> one output per call site
 * 3. delete the definitions           -> only where step 2 left nothing behind
 * ```
 *
 * Steps 2 and 3 are separate because **a definition must not be deleted while a
 * usage still points at it.** Delete early and a page that was merely broken
 * becomes a page that is silently empty: the tag stays, nothing defines it, and
 * on Documentation.AI an undefined component renders nothing at all.
 *
 * Step 1 is separate because the definition is read *once* however many times the
 * component is used. Six `<Note>`s share one classification and produce six
 * outputs — and one note, not six. Six copies of the same sentence is how a real
 * blocker gets buried.
 *
 * ## The three things that actually go wrong
 *
 * **A component used both as a block and inline.** `<Note>text</Note>` written
 * mid-sentence is an `mdxJsxTextElement` inside a paragraph, and a `<Callout>` is
 * a block — putting one there is invalid MDX. `liftInlineJsx` promotes the
 * one-liners that are a whole paragraph; whatever is still inline afterwards is
 * genuinely inside a sentence, and there the box is dropped and the words kept.
 *
 * **A usage the shape cannot serve** — an `<Expandable>` with no title to put on
 * it. Rather than abandoning the component, that one call site falls to
 * unwrapping. The text survives; only the decoration is lost.
 *
 * **Nesting.** `<Note><Note>…</Note></Note>` is rewritten depth-first, on the way
 * back up the walk, so the inner one is already a `<Callout>` before the outer
 * one moves its children.
 *
 * ## Where it runs
 *
 * **After `convertOneToOne`**, which is later than every other component pass.
 * That pass treats a callout's first paragraph as a ReadMe-style heading and
 * bolds it `[promoteHeadingToBold]` — correct for a ReadMe `<Callout>`, wrong for
 * an arbitrary local wrapper, whose first paragraph is just its first paragraph.
 * Emitting the canonical `kind=` form here and staying out of that pass's way is
 * simpler than teaching it the difference.
 */

/** What happened to one component across the whole page. */
type Tally = {
  definition: Definition;
  /** Call sites converted to the shape's target. */
  converted: number;
  /** Call sites that fell back to plain content. */
  unwrapped: number;
  /** Call sites still in the tree — only possible for a `blocked` shape. */
  left: number;
};

function describe(shape: LocalShape): string {
  switch (shape.kind) {
    case "callout":
      return `<Callout kind="${shape.tone}">`;
    case "titled":
      return `<Callout kind="${shape.tone}"> with the title as a bold first line`;
    case "expandable":
      return "<Expandable>";
    case "unwrap":
      return "its own content, unwrapped";
    case "blocked":
      return "nothing";
  }
}

function callout(tone: string, children: RootContent[]): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: "Callout",
    attributes: [attr("kind", tone)],
    children: children as MdxJsxFlowElement["children"],
  };
}

/**
 * One call site -> its replacement nodes, or `null` when the shape cannot serve
 * this particular usage and it should fall back to plain content.
 */
function rewrite(node: MdxJsxFlowElement, shape: LocalShape): RootContent[] | null {
  const children = node.children as RootContent[];

  switch (shape.kind) {
    case "unwrap":
      return children;

    case "callout":
      return [callout(shape.tone, children)];

    case "titled": {
      const title = readAttr(node, shape.titleProp)?.trim();
      // No title on this call site: the shape's whole point is gone, so this one
      // usage degrades rather than the component being abandoned.
      if (!title) return null;
      return [callout(shape.tone, [boldPara(title), ...children])];
    }

    case "expandable": {
      const title = readAttr(node, shape.titleProp)?.trim();
      if (!title) return null;
      return [expandable(title, children, false)];
    }

    case "blocked":
      return null;
  }
}

/**
 * Converts every local component on the page, and returns the names it reported
 * on.
 *
 * The return value feeds the custom-component detector's `localHandled` set. A
 * `blocked` component has already been explained here in one precise sentence;
 * letting the detector add *"choose a Documentation.AI equivalent from that
 * source"* on top of it would be a second, vaguer note about the same tag.
 */
export function convertLocalComponents(root: Root, notes: ConversionNote[]): Set<string> {
  const defs = collectDefinitions(root);
  if (defs.size === 0) return new Set();

  const tallies = new Map<string, Tally>();
  for (const [name, definition] of defs) {
    tallies.set(name, { definition, converted: 0, unwrapped: 0, left: 0 });
  }

  const convertible = new Set(
    [...defs].filter(([, definition]) => definition.shape.kind !== "blocked").map(([name]) => name),
  );

  // Notes are withheld here on purpose. `liftInlineJsx` reports a component
  // sharing a paragraph with prose as a blocker, which is the right answer for a
  // block component with nowhere to go — but this pass *does* have somewhere to
  // go for that case (unwrap it, keep the words), and says so itself below.
  liftInlineJsx(root, convertible);

  const walk = (parent: Parent): void => {
    const children = parent.children as RootContent[];

    for (let index = 0; index < children.length; index += 1) {
      const child = children[index];
      if (child === undefined) continue;

      // Depth first: recurse before rewriting, so a nested usage is already
      // converted by the time its parent's children are moved.
      if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);

      const name =
        child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement" ? child.name : null;
      if (name === null) continue;

      const tally = tallies.get(name);
      if (tally === undefined) continue;

      if (tally.definition.shape.kind === "blocked") {
        tally.left += 1;
        continue;
      }

      if (child.type === "mdxJsxTextElement") {
        // Still inline after the lift means genuinely mid-sentence. A block
        // component cannot go there, so the box goes and the words stay.
        const inline = (child as MdxJsxTextElement).children as RootContent[];
        children.splice(index, 1, ...inline);
        index += inline.length - 1;
        tally.unwrapped += 1;
        continue;
      }

      const replacement = rewrite(child as MdxJsxFlowElement, tally.definition.shape);

      if (replacement === null) {
        const fallback = (child as MdxJsxFlowElement).children as RootContent[];
        children.splice(index, 1, ...fallback);
        index += fallback.length - 1;
        tally.unwrapped += 1;
        continue;
      }

      children.splice(index, 1, ...replacement);
      index += replacement.length - 1;
      tally.converted += 1;
    }
  };

  walk(root);
  removeDefinitions(root, tallies);

  for (const tally of tallies.values()) notes.push(noteFor(tally));

  return new Set(tallies.keys());
}

/**
 * Deletes the `export const`s whose usages are all gone.
 *
 * A definition renders nothing on Documentation.AI, so leaving one behind is not
 * neutral — it is dead text at the top of the page. But it is only safe to remove
 * once nothing refers to it, which is exactly `left === 0`.
 *
 * Import-only nodes go too, but only when **every** definition on the page was
 * removed: `import { useState } from 'react'` exists to serve those definitions,
 * and with all of them gone there is nothing left that could reference it.
 */
function removeDefinitions(root: Root, tallies: Map<string, Tally>): void {
  const clear = (node: EsmNode): boolean => {
    const names = namesIn(node);
    if (names.length === 0) return false;
    return names.every((name) => (tallies.get(name)?.left ?? 1) === 0);
  };

  const definitionNodes = root.children.filter(
    (node): node is EsmNode => node.type === "mdxjsEsm" && namesIn(node).length > 0,
  );
  const allCleared = definitionNodes.every(clear);

  root.children = root.children.filter((node) => {
    if (node.type !== "mdxjsEsm") return true;
    if (namesIn(node).length > 0) return !clear(node);
    // Imports only.
    return !allCleared;
  });
}

function noteFor(tally: Tally): ConversionNote {
  const { definition, converted, unwrapped, left } = tally;
  const uses = converted + unwrapped + left;
  const plural = uses === 1 ? "use" : "uses";
  const at = { rule: "local-component", line: lineOf(definition.owner) } as const;

  if (definition.shape.kind === "blocked") {
    return {
      ...at,
      level: "blocker",
      detail: `<${definition.name}> is defined by an \`export const\` on this page and cannot be converted automatically: ${definition.shape.why}. Its ${uses} ${plural} and the definition itself are left exactly as they were — but Documentation.AI has no custom-component surface, so as it stands the definition renders nothing and the content inside those ${plural} will not appear`,
    };
  }

  const tail =
    unwrapped > 0
      ? `; ${unwrapped} of them could not take a block component (used inside a sentence, or missing its title) and kept the text without the styling`
      : "";

  return {
    ...at,
    level: unwrapped > 0 ? "flag" : "change",
    detail: `<${definition.name}> (defined on this page, ${uses} ${plural}) -> ${describe(definition.shape)}${tail}. The \`export const\` was removed: it renders nothing on Documentation.AI`,
  };
}
