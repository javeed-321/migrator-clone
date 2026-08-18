import type { Paragraph, Parent, PhrasingContent, RootContent } from "mdast";
import type { MdxJsxAttribute, MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";

/**
 * The pieces every conversion module needs: the note type the whole converter
 * reports through, and the handful of MDAST readers/builders that would otherwise
 * be copy-pasted into one file per component.
 */

/** One thing the converter did, or wants a human to look at. */
export type ConversionNote = {
  /** The rule that fired, e.g. `callout`, `fence-title`, `accordion`. */
  rule: string;
  level:
    /** Something was rewritten. Informational. */
    | "change"
    /** Converted, but a human should confirm the choice. */
    | "flag"
    /** Cannot be converted faithfully — stop and ask (plan §6 stop conditions). */
    | "blocker";
  detail: string;
  /** 1-based line in the source page, when the node carried a position. */
  line?: number;
};

export function attr(name: string, value: string): MdxJsxAttribute {
  return { type: "mdxJsxAttribute", name, value };
}

/** Reads a JSX attribute as a string. `{true}` and a bare attribute both read `"true"`. */
export function readAttr(node: MdxJsxFlowElement | MdxJsxTextElement, name: string): string | undefined {
  for (const attribute of node.attributes ?? []) {
    if (attribute.type !== "mdxJsxAttribute" || attribute.name !== name) continue;
    const { value } = attribute;
    if (value === null || value === undefined) return "true";
    if (typeof value === "string") return value;
    return value.value;
  }
  return undefined;
}

export function isJsx(node: RootContent, name: string): node is MdxJsxFlowElement {
  return node.type === "mdxJsxFlowElement" && node.name === name;
}

export function lineOf(node: { position?: { start: { line: number } } }): number | undefined {
  return node.position?.start.line;
}

/** A paragraph whose whole content is bold — how a dropped heading survives. */
export function bold(children: PhrasingContent[]): Paragraph {
  return { type: "paragraph", children: [{ type: "strong", children }] };
}

/**
 * Promotes block components that were written on one line to flow elements.
 *
 * MDX only treats JSX as block-level when it is separated from surrounding text
 * by blank lines. So `<Accordion title="A">a</Accordion>` on a single line parses
 * as an **`mdxJsxTextElement` inside a paragraph**, while the same component
 * written across three lines parses as an `mdxJsxFlowElement`. A converter that
 * only matches flow elements silently skips every one-liner in the corpus — the
 * component vanishes from the output and the page still compiles, which is the
 * exact class of loss `[PIT Phase 2]` describes.
 *
 * Running this first means every later rule sees one shape.
 *
 * A paragraph that mixes a component with real prose is left alone and reported:
 * lifting it would reorder the author's sentence.
 */
export function liftInlineJsx(root: Parent, names: Set<string>, notes?: ConversionNote[]): void {
  const children = root.children as RootContent[];

  for (const child of children) {
    if (child && "children" in child && Array.isArray((child as Parent).children)) {
      liftInlineJsx(child as Parent, names, notes);
    }
  }

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child?.type !== "paragraph") continue;

    const meaningful = child.children.filter(
      (node) => !(node.type === "text" && node.value.trim().length === 0),
    );
    if (meaningful.length === 0) continue;

    const targets = meaningful.filter(
      (node): node is MdxJsxTextElement =>
        node.type === "mdxJsxTextElement" && node.name !== null && names.has(node.name),
    );
    if (targets.length === 0) continue;

    if (targets.length !== meaningful.length) {
      notes?.push({
        rule: "inline-jsx",
        level: "blocker",
        line: lineOf(child),
        detail: `<${targets[0]?.name}> shares a paragraph with prose — a block component cannot be lifted out without reordering the text`,
      });
      continue;
    }

    const lifted: MdxJsxFlowElement[] = targets.map((node) => ({
      type: "mdxJsxFlowElement",
      name: node.name,
      attributes: node.attributes,
      children: node.children.length > 0 ? [{ type: "paragraph", children: node.children }] : [],
      position: node.position ?? child.position,
    }));

    children.splice(i, 1, ...lifted);
    i += lifted.length - 1;
  }
}
