import type { Element, Root as HastRoot } from "hast";
import { defaultHandlers, toMdast, type Handle, type State } from "hast-util-to-mdast";
import type { BlockContent, DefinitionContent, Root as MdastRoot } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { visit } from "unist-util-visit";

import { ESCAPED_COMPONENTS } from "../constants";

const ESCAPED = new Set<string>(ESCAPED_COMPONENTS);

/**
 * The bridge between the two trees.
 *
 * `hast-util-to-mdast` knows how to translate real HTML — `h1` becomes a
 * heading, `pre > code` becomes a code block, `table` becomes a table. What it
 * does *not* know is what to do with a node whose tagName is `Callout`, because
 * no such HTML element exists; left alone it flattens the node and keeps only
 * the text inside.
 *
 * So every name in `ESCAPED_COMPONENTS` gets this handler instead, which turns
 * the node into the MDAST node MDX uses for a JSX element. `remark-mdx` is what
 * later prints that node back out as `<Callout kind="alert">…</Callout>`.
 */
export function mdxJsxFlowElementHandler(_: State, node: Element): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: node.tagName,
    attributes: Object.entries(node.properties ?? {})
      // A component built by a scraper only ever carries string props. Anything
      // else is left-over HTML noise and would stringify as `[object Object]`.
      .filter(([, value]) => typeof value === "string" || typeof value === "number")
      .map(([name, value]) => ({
        type: "mdxJsxAttribute",
        name,
        value: String(value),
      })),
    children: node.children as Array<BlockContent | DefinitionContent>,
  };
}

/** The handler table: HTML defaults, plus one escape hatch per component. */
export function componentHandlers(extra: Record<string, Handle> = {}): Record<string, Handle> {
  const handlers: Record<string, Handle> = { ...defaultHandlers };
  for (const tagName of ESCAPED_COMPONENTS) {
    handlers[tagName] = mdxJsxFlowElementHandler;
  }
  handlers.mdxJsxFlowElement = mdxJsxFlowElementHandler;
  return { ...handlers, ...extra };
}

/**
 * The one step in the pipeline that changes the tree's type: HAST goes in,
 * MDAST comes out. Everything registered before this runs against HTML nodes,
 * everything after it against Markdown nodes.
 */
export function selectiveRehypeRemark() {
  const handlers = componentHandlers();
  return function (tree: HastRoot): MdastRoot {
    return toMdast(tree, { handlers }) as MdastRoot;
  };
}

/**
 * A second, MDAST-side pass that finishes off nested components.
 *
 * The bridge only translates a component node it visits directly; a component
 * that was carried across *inside* another component's children (a `Card` inside
 * a `Columns`) arrives on this side still shaped like a raw HAST element. This
 * rewrites any such leftover into the `mdxJsxFlowElement` MDX needs — the same
 * job `mdxJsxFlowElementHandler` does at the bridge, but for the ones it missed.
 */
export function convertLeftoverComponents() {
  return function (tree: MdastRoot): MdastRoot {
    visit(tree, function (node, index, parent) {
      const element = node as unknown as Element;
      if (element.type !== "element" || !ESCAPED.has(element.tagName)) return;
      if (!parent || typeof index !== "number") return;
      (parent.children as unknown[])[index] = mdxJsxFlowElementHandler(
        undefined as unknown as State,
        element
      );
    });
    return tree;
  };
}
