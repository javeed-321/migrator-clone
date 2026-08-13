import type { Element, Root as HastRoot, RootContent } from "hast";
import { CONTINUE, SKIP, visit } from "unist-util-visit";

/**
 * Wraps a run of sibling `<Card>` markers in a `<Columns>`, the way ReadMe lays
 * cards out in a row. Documentation.AI has no CardGroup — `Columns` is the grid
 * wrapper (see mdx-utils, where the editor's cardGroup serialises to `Columns`).
 *
 * Runs of one are left alone: a lone card needs no grid. `cols` is capped at 4.
 * This must run after `createCard` (so the markers exist) and the `Card`s are
 * only turned into MDX nodes on the far side of the bridge, by
 * `convertLeftoverComponents`.
 */
const isCard = (node: RootContent): node is Element =>
  node.type === "element" && node.tagName === "Card";

/** Whitespace-only text between the `<a>` cards must not break the run. */
const isBlank = (node: RootContent): boolean =>
  node.type === "text" && node.value.trim() === "";

export function wrapCardsInColumns() {
  return function (tree: HastRoot): HastRoot {
    visit(tree, function (node) {
      if (!("children" in node) || !Array.isArray(node.children)) return CONTINUE;
      if ((node as Element).tagName === "Columns") return SKIP;

      const children = node.children as RootContent[];
      const next: RootContent[] = [];
      let i = 0;

      while (i < children.length) {
        const child = children[i]!;
        if (!isCard(child)) {
          next.push(child);
          i++;
          continue;
        }

        // Collect a run of cards, stepping over the whitespace between them.
        // `trailing` holds blank nodes seen after the last card so far, so they
        // are not swallowed if the run turns out to end.
        const run: Element[] = [];
        let trailing: RootContent[] = [];
        let j = i;
        while (j < children.length) {
          const c = children[j]!;
          if (isCard(c)) {
            run.push(c);
            trailing = [];
          } else if (isBlank(c)) {
            trailing.push(c);
          } else {
            break;
          }
          j++;
        }

        if (run.length >= 2) {
          next.push({
            type: "element",
            tagName: "Columns",
            properties: { cols: String(Math.min(run.length, 4)) },
            children: run,
          });
          next.push(...trailing);
          i = j;
        } else {
          // Not a group — leave the lone card and let normal iteration resume
          // right after it (its trailing whitespace is handled as usual).
          next.push(child);
          i++;
        }
      }

      node.children = next as typeof node.children;
      return CONTINUE;
    });
    return tree;
  };
}
