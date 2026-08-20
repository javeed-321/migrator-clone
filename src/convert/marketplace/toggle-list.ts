import type { RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

import { lineOf, readAttr, type ConversionNote } from "../mdast";
import { expandable, type Rule } from "./rule";

/**
 * `<ToggleList>` -> `<ExpandableGroup>` (marketplace-conversion.md §5.1).
 *
 * Source `[MP ToggleList]`: `({ children, ...rest })` wrapping
 * `<ToggleListItem title>` children — a list of independently collapsible rows.
 *
 * This maps cleanly, and unusually so: the target has a real group component
 * `[DAI §11]`, where most ReadMe collapsibles have to be gathered into one by
 * detecting adjacent siblings. Here the grouping is already explicit in the
 * source, so it is carried straight across.
 *
 * A `<ToggleListItem>` without a `title` still converts — `<Expandable>`'s title
 * is optional and falls back to "Click to expand" `[DAI §11]` — but it is flagged,
 * because an unnamed row in a list of named ones is usually an authoring slip.
 */
export const toggleList: Rule = (node, notes: ConversionNote[]) => {
  const items: RootContent[] = [];

  for (const child of node.children as RootContent[]) {
    if (child.type !== "mdxJsxFlowElement" || child.name !== "ToggleListItem") {
      // Anything that is not an item is kept in place rather than dropped.
      if (child.type !== "text" || child.value.trim().length > 0) items.push(child);
      continue;
    }

    const item = child as MdxJsxFlowElement;
    const title = readAttr(item, "title")?.trim();

    if (!title) {
      notes.push({
        rule: "marketplace",
        level: "flag",
        line: lineOf(item),
        detail: "<ToggleListItem> has no `title` — the <Expandable> falls back to \"Click to expand\"",
      });
    }

    items.push(expandable(title || "Click to expand", item.children as never, false));
  }

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: `<ToggleList> -> <ExpandableGroup> with ${items.length} <Expandable> children`,
  });

  return [
    {
      type: "mdxJsxFlowElement",
      name: "ExpandableGroup",
      attributes: [],
      children: items as never,
    },
  ];
};
