import type { Element, Parents, Root as HastRoot } from "hast";
import { defaultHandlers, toMdast, type Handle, type State } from "hast-util-to-mdast";
import type { BlockContent, DefinitionContent, Root as MdastRoot } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { EXIT, visit } from "unist-util-visit";

import { ESCAPED_COMPONENTS } from "../constants";
import { hasPresentation, hasSpanAttributes, hastPropsToJsxAttributes } from "./attributes";

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
    // Not a plain `String(value)` map: `className` is an array and `style` is a
    // CSS string, and both need real conversion to be valid JSX. See
    // `./attributes`.
    attributes: hastPropsToJsxAttributes(node),
    children: node.children as Array<BlockContent | DefinitionContent>,
  };
}

/* -------------------------------------------------------------------------- */
/* Styled containers                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Block-level wrappers that `hast-util-to-mdast` dissolves into their children,
 * because Markdown has no node for them.
 *
 * That is the right default — an unstyled `<div>` is pure scaffolding — but it
 * also means a hand-authored, styled layout block loses its box. Preserving the
 * attributes is not enough on its own: without a handler the element is gone
 * before the JSX printer ever sees it.
 */
const FLOW_CONTAINERS = ["div", "section", "article", "aside", "header", "footer", "nav", "main"];

/** The same idea for inline wrappers, which must stay phrasing content. */
const TEXT_CONTAINERS = ["span", "small", "b", "u"];

/**
 * Keeps a styled container instead of dissolving it.
 *
 * An element carrying nothing still unwraps, so ordinary scaffolding does not
 * turn into a wall of `<div>`s in the output.
 *
 * The flow/inline split matters: a `<span>` emitted as a flow element breaks
 * the paragraph it sits in, because flow content cannot nest inside phrasing.
 */
function containerHandler(inline: boolean) {
  return function (state: State, node: Element) {
    if (!hasPresentation(node)) return state.all(node);

    return {
      type: inline ? "mdxJsxTextElement" : "mdxJsxFlowElement",
      name: node.tagName,
      attributes: hastPropsToJsxAttributes(node),
      children: state.all(node),
    } as unknown as MdxJsxFlowElement;
  };
}

/* -------------------------------------------------------------------------- */
/* Links and images                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Markdown link and image syntax carries a URL, a label and nothing else.
 *
 * So `<a href="…" target="_blank" rel="noopener noreferrer">` becomes
 * `[label](…)` and quietly drops both the target and the link-security tokens,
 * and `<img width="300" class="border">` loses its sizing. Neither is a styling
 * nicety — `rel="noopener"` is what stops a `target="_blank"` link handing the
 * opener window to the destination page.
 *
 * Anything carrying more than the attributes Markdown can express is emitted as
 * JSX instead. `expressible` names the ones that survive the plain syntax, so a
 * simple link stays `[label](url)` and only the loaded ones become tags.
 */
function markdownOrJsx(expressible: string[], inline: boolean, fallback: Handle) {
  const expected = new Set(expressible);

  return function (state: State, node: Element, parent: Parents | undefined) {
    const attributes = hastPropsToJsxAttributes(node);
    const extra = attributes.filter((attribute) => !expected.has(attribute.name));
    if (!extra.length) return fallback(state, node, parent);

    return {
      type: inline ? "mdxJsxTextElement" : "mdxJsxFlowElement",
      name: node.tagName,
      attributes,
      children: node.tagName === "img" ? [] : state.all(node),
    } as unknown as MdxJsxFlowElement;
  };
}

/* -------------------------------------------------------------------------- */
/* Tables                                                                     */
/* -------------------------------------------------------------------------- */

/** Every tag that is structurally part of a table. */
const TABLE_TAGS = new Set([
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "td",
  "th",
  "caption",
  "colgroup",
  "col",
]);

/** The ones whose children are content rather than more table structure. */
const TABLE_CELLS = new Set(["td", "th", "caption"]);

/**
 * Whether this table has to be JSX to survive intact.
 *
 * A GFM pipe table is a lossy target twice over: cells cannot carry attributes,
 * so a styled `<td>` loses its style, and there is no way to merge cells, so
 * `colspan`/`rowspan` silently collapse and every following row shifts out of
 * alignment. When either shows up anywhere in the table, the whole table is
 * emitted as JSX instead.
 *
 * Tables with neither — the overwhelming majority — stay as pipe tables, which
 * are far more readable and diff better.
 */
function needsJsxTable(node: Element): boolean {
  let needed = false;

  visit(node, "element", function (subNode: Element) {
    if (!TABLE_TAGS.has(subNode.tagName)) return;
    if (hasPresentation(subNode) || hasSpanAttributes(subNode)) {
      needed = true;
      return EXIT;
    }
  });

  return needed;
}

/**
 * Rebuilds a table as nested JSX, preserving every attribute on the way down.
 *
 * Structural nodes recurse; cells hand their contents to `state.all` so the
 * text inside them is still converted to Markdown (a link in a cell stays a
 * Markdown link, it does not become raw HTML).
 */
function tableToJsx(state: State, node: Element): MdxJsxFlowElement {
  const children: unknown[] = [];

  for (const child of node.children) {
    if (child.type !== "element") continue;
    if (!TABLE_TAGS.has(child.tagName)) continue;

    if (TABLE_CELLS.has(child.tagName)) {
      children.push({
        type: "mdxJsxFlowElement",
        name: child.tagName,
        attributes: hastPropsToJsxAttributes(child),
        children: state.all(child),
      });
    } else {
      children.push(tableToJsx(state, child));
    }
  }

  return {
    type: "mdxJsxFlowElement",
    name: node.tagName,
    attributes: hastPropsToJsxAttributes(node),
    children: children as Array<BlockContent | DefinitionContent>,
  };
}

/** Pipe table by default; JSX only when a pipe table would lose something. */
function tableHandler(state: State, node: Element) {
  if (!needsJsxTable(node)) return defaultHandlers.table(state, node);
  return tableToJsx(state, node);
}

/* -------------------------------------------------------------------------- */

/** The handler table: HTML defaults, plus one escape hatch per special case. */
export function componentHandlers(extra: Record<string, Handle> = {}): Record<string, Handle> {
  const handlers: Record<string, Handle> = { ...defaultHandlers };

  for (const tagName of ESCAPED_COMPONENTS) {
    handlers[tagName] = mdxJsxFlowElementHandler;
  }
  for (const tagName of FLOW_CONTAINERS) {
    handlers[tagName] = containerHandler(false) as Handle;
  }
  for (const tagName of TEXT_CONTAINERS) {
    handlers[tagName] = containerHandler(true) as Handle;
  }
  handlers.table = tableHandler as Handle;
  // A plain link stays `[label](url)`; one carrying target/rel/class becomes JSX.
  handlers.a = markdownOrJsx(["href", "title"], true, defaultHandlers.a) as Handle;
  handlers.img = markdownOrJsx(["src", "alt", "title"], true, defaultHandlers.img) as Handle;
  // A Markdown paragraph carries no attributes at all, so a styled `<p>` — the
  // headings inside a hand-written footer, say — has to become a tag to keep
  // its class. Plain paragraphs, which is nearly all of them, are untouched.
  //
  // Caveat: `getDescriptionFromRoot` reads the lead paragraph for frontmatter
  // and only recognises a `paragraph` node. A page whose *first* paragraph
  // carries a class would lose its description. That does not happen on ReadMe
  // SuperHub markup, but it is the thing to check first if a description ever
  // comes back empty.
  handlers.p = markdownOrJsx([], false, defaultHandlers.p) as Handle;
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
