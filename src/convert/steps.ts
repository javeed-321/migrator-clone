import type { List, Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { toString as mdastToString } from "mdast-util-to-string";

import { attr, lineOf, type ConversionNote } from "./mdast";

/**
 * Plan §2.8 — an ordered list becomes `<Steps>` **only when every step has a body
 * beneath it**.
 *
 * ReadMe has no built-in Steps component, so every procedure in the source is an
 * ordered list. Documentation.AI recommends `<Steps>` for sequential procedures
 * `[DAI §9]`, but that is about procedures with substance, not about every `1.` in
 * the corpus:
 *
 * | Source shape | Target |
 * |---|---|
 * | One line per step, nothing beneath it | **stays an ordered list** |
 * | Every step followed by a paragraph, fence, image or callout | `<Steps>` / `<Step>` |
 * | Mixed — some steps have bodies, some do not | **stays a list**, and is reported |
 *
 * The mixed case is deliberate. Splitting one procedure across both forms reads
 * worse than either, so it is left alone for a person to look at.
 *
 * `title-type` is never emitted: it defaults to `"p"`, and `"h2"`/`"h3"` would add
 * every step to the page's heading structure and table of contents — a change to
 * the page outline, and a separate decision `[DAI §9]`. `icon` is never invented
 * either; the source carries no signal for one.
 */

/** A step needs an instruction line plus at least one block beneath it. */
function hasBody(item: RootContent): boolean {
  return "children" in item && item.children.length > 1;
}

/** The instruction line: the item's first paragraph, as plain text. */
function instructionOf(item: RootContent): string | undefined {
  if (!("children" in item)) return undefined;
  const [first] = item.children;
  if (!first || first.type !== "paragraph") return undefined;

  // `mdastToString` resolves inline code and emphasis to their text, which is what
  // a plain string attribute needs — `title` cannot carry markdown.
  const text = mdastToString(first).replace(/\s+/g, " ").trim();
  return text.length > 0 ? text : undefined;
}

type Verdict =
  | { kind: "convert"; steps: { title: string; body: RootContent[] }[] }
  | { kind: "keep" }
  | { kind: "mixed"; withBody: number; total: number };

/**
 * Decides what one list is.
 *
 * Every condition has to hold: ordered, at least two items, and *every* item
 * carrying both an instruction line and a body.
 */
export function readSteps(node: List): Verdict {
  if (!node.ordered || node.children.length < 2) return { kind: "keep" };

  const withBody = node.children.filter(hasBody).length;
  if (withBody === 0) return { kind: "keep" };
  if (withBody !== node.children.length) {
    return { kind: "mixed", withBody, total: node.children.length };
  }

  const steps: { title: string; body: RootContent[] }[] = [];
  for (const item of node.children) {
    const title = instructionOf(item);
    // An item that opens with something other than a paragraph — a fence, a table
    // — has no instruction line to use as a title, so the list stays a list.
    if (!title) return { kind: "keep" };
    steps.push({ title, body: item.children.slice(1) as RootContent[] });
  }

  return { kind: "convert", steps };
}

/** Builds the `<Steps>` element from what `readSteps` read. */
function buildSteps(steps: { title: string; body: RootContent[] }[], node: List): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: "Steps",
    attributes: [],
    children: steps.map((step) => ({
      type: "mdxJsxFlowElement" as const,
      name: "Step",
      attributes: [attr("title", step.title)],
      children: step.body as MdxJsxFlowElement["children"],
    })),
    ...(node.position ? { position: node.position } : {}),
  };
}

/**
 * Converts every qualifying ordered list on a page.
 *
 * Recurses first, so a procedure nested inside a `<Tab>` or an `<Expandable>` is
 * converted in its own container rather than being missed.
 */
export function convertSteps(root: Root | Parent, notes: ConversionNote[]): void {
  const children = root.children as RootContent[];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    if (child.type !== "list") {
      if ("children" in child && Array.isArray((child as Parent).children)) {
        convertSteps(child as Parent, notes);
      }
      continue;
    }

    const verdict = readSteps(child);

    if (verdict.kind === "mixed") {
      notes.push({
        rule: "steps",
        level: "flag",
        line: lineOf(child),
        detail: `ordered list where ${verdict.withBody} of ${verdict.total} steps have a body — left as a list, since splitting one procedure across a list and <Steps> reads worse than either`,
      });
      continue;
    }

    if (verdict.kind === "keep") continue;

    // Convert the step bodies before they move, so a nested procedure inside a
    // step is handled too.
    for (const step of verdict.steps) {
      convertSteps({ type: "root", children: step.body } as Root, notes);
    }

    children[i] = buildSteps(verdict.steps, child);
    notes.push({
      rule: "steps",
      level: "change",
      line: lineOf(child),
      detail: `ordered list of ${verdict.steps.length} -> <Steps>, since every step has a body beneath it`,
    });
  }
}
