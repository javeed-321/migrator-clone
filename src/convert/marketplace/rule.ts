import type { Paragraph, PhrasingContent, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

import { attr, type ConversionNote } from "../mdast";

/**
 * The contract every Marketplace conversion implements.
 *
 * One rule per component, one file per rule, so "how does `<Spoiler>` convert?"
 * is always answered by opening `spoiler.ts`. `index.ts` owns the walk and the
 * lookup; a rule only ever sees its own node.
 *
 * Returning `null` means *"I could not convert this"* — the node is left exactly
 * as it was and the rule is expected to have pushed a `blocker`. That is the
 * honest outcome for a component carrying data this converter cannot read; the
 * alternative is emitting a guess, which `[PIT Phase 2]` warns is invisible once
 * the page compiles.
 */
export type Rule = (
  node: MdxJsxFlowElement,
  notes: ConversionNote[],
  ctx: RuleContext,
) => RootContent[] | null;

/**
 * What a rule needs beyond its own node.
 *
 * Only `post-list.ts` uses this, and only because its conversion needs the
 * network. Rules stay synchronous — a rule that returned a promise would make
 * every rule's caller async for the sake of one — so instead the rule *records*
 * the work and an async step afterwards does it, the same two-phase shape the
 * image pass already uses (`convertImages` collects, `fetchImages` fetches).
 *
 * A rule written as `(node, notes) => …` still satisfies the type, so nothing
 * else had to change.
 */
export type RuleContext = {
  /** `<PostList>` nodes whose data has to be fetched before they can be rendered. */
  postLists: FoundPostList[];
};

/** A `<PostList>` awaiting its data. The node is mutated in place once it arrives. */
export type FoundPostList = {
  url: string;
  node: MdxJsxFlowElement;
  line?: number;
};

/** A paragraph of plain text. */
export function para(text: string): Paragraph {
  return { type: "paragraph", children: [{ type: "text", value: text }] };
}

/** A paragraph whose whole content is bold — how a lost heading survives. */
export function boldPara(text: string): Paragraph {
  return { type: "paragraph", children: [{ type: "strong", children: [{ type: "text", value: text }] }] };
}

/**
 * An `<Expandable>` `[DAI §11]`.
 *
 * `default-open` is written explicitly rather than left to the default, because
 * it records a fact about the source: every ReadMe collapsible starts closed
 * `[RM §4.11]`, and a later reader cannot then mistake the closed state for an
 * accident.
 */
export function expandable(title: string, children: RootContent[], open = false): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: "Expandable",
    attributes: [attr("title", title), attr("default-open", open ? "true" : "false")],
    children: children as MdxJsxFlowElement["children"],
  };
}

/** A GFM pipe table. `align` is per column; `null` means no explicit alignment. */
export function table(headers: string[], rows: string[][], align: ("left" | null)[] = []): RootContent {
  const cell = (value: string) => ({
    type: "tableCell" as const,
    children: cellNodes(value),
  });

  return {
    type: "table",
    align: headers.map((_, index) => align[index] ?? "left"),
    children: [
      { type: "tableRow", children: headers.map(cell) },
      ...rows.map((row) => ({ type: "tableRow" as const, children: row.map(cell) })),
    ],
  };
}

/**
 * Splits a value into text and inline-code nodes, so a `{placeholder}` survives.
 *
 * A value that was harmless inside a JSX attribute is not harmless once lifted
 * into the body: `{category}` in `AdvancedTable`'s sample data is an ordinary
 * string character in `data={…}` and **an expression that would be evaluated**
 * once it is prose `[RM §12 gotcha 15]` `[PIT Phase 5]`.
 *
 * The fix has to be a real `inlineCode` **node**, not backticks written into a
 * text node. Text is escaped on the way out, so a literal backtick becomes
 * `` \` `` and the reader sees the escape rather than code formatting. Building
 * the node instead lets the stringifier do the right thing — and it also escapes
 * pipes and underscores for us, which is why neither is handled here.
 */
export function cellNodes(value: string): PhrasingContent[] {
  const text = value.replace(/\s*\n\s*/g, " ").trim();
  const out: PhrasingContent[] = [];
  let last = 0;

  for (const match of text.matchAll(/\{[^{}]*\}/g)) {
    const at = match.index ?? 0;
    if (at > last) out.push({ type: "text", value: text.slice(last, at) });
    out.push({ type: "inlineCode", value: match[0] });
    last = at + match[0].length;
  }

  if (last < text.length) out.push({ type: "text", value: text.slice(last) });
  return out.length > 0 ? out : [{ type: "text", value: "" }];
}

/** Collapses whitespace in a value destined for a table cell. */
export function safeCell(value: string): string {
  return value.replace(/\s*\n\s*/g, " ").trim();
}
