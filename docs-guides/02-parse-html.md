---
title: "Step 2 — Parse HTML into a tree"
description: "Converting an HTML string into HAST, and why every selector in this project is a tree walk rather than a CSS query."
---

## What this step does

Converts the HTML string from [step 1](01-fetch-pages.md) into HAST — a JSON tree of
`{ type, tagName, properties, children }` nodes.

Every step after this one is a walk over that tree.

## File

[`src/pipeline/root.ts`](../src/pipeline/root.ts)

## The code

```ts
export function htmlToHast(html: string): HastRoot {
  const tree = unified().use(rehypeParse).parse(html);
  removePositions(tree);
  removeHastComments(tree);
  return tree;
}
```

Three things happen:

1. `rehype-parse` builds the tree.
2. `removePositions` strips the `position` object (line and column offsets) from every node.
3. `removeHastComments` splices out `<!-- -->` nodes.

Both cleanups exist to keep the tree small. `position` roughly doubles the node size, and this tree
gets held in memory for a whole tab's sidebar and, in the API route, serialised into a response.

## No CSS selectors

There is no `document.querySelector`, no cheerio, and no selector engine anywhere in this project.
Every element lookup is a `unist-util-visit` walk with a manual check:

```ts
visit(rootNode, "element", function (node) {
  if (node.tagName === "nav" && intersection(node.properties.className, selectorSet).size > 0) {
    element = node;
    return EXIT;
  }
  return CONTINUE;
});
```

That shape — match `tagName`, then check `className` — repeats in
[step 5](05-find-sidebar.md), [step 4](04-find-tabs.md), and [step 8](08-fetch-pool.md). Once you
recognise it, the vendor-specific code reads quickly.

`className` is always an **array** in HAST, never a string. `class="a b c"` parses to
`["a", "b", "c"]`. That is why the helpers in [`src/utils/className.ts`](../src/utils/className.ts)
exist.

## Visitor return values

`unist-util-visit` control flow is worth knowing before reading [step 6](06-walk-sidebar.md):

| Return | Effect |
|--------|--------|
| `CONTINUE` | Keep walking, including into this node's children |
| `SKIP` | Keep walking, but do **not** descend into this node's children |
| `EXIT` | Stop the entire walk |
| `[CONTINUE, index]` | Continue from a specific index — needed after splicing a sibling |

`SKIP` is what stops a group's children from being visited twice in step 6.

## An upstream quirk

Upstream writes this as:

```ts
return unified()
  .use(rehypeParse)
  .use(unifiedRemovePositions)      // a transformer
  .use(rehypeRemoveHastComments)    // a transformer
  .parse(html);
```

`.parse()` only runs the **parser**. Transformers require `.run()`. So both plugins are dead code
upstream and positions are never actually stripped. Calling the cleanups directly, as this project
does, is what the original intended.

## Gotchas

- **The tree is mutated in place.** Step 6 rewrites `section` tag names to `li` on the live tree. If
  you parse once and walk twice, the second walk sees the first walk's edits. `scrapeSite` accepts a
  pre-built `hast` for exactly this reason — so a tab's tree is not built twice.
- **Malformed HTML does not throw.** `rehype-parse` is forgiving, like a browser. A missing sidebar
  shows up as a `undefined` in [step 5](05-find-sidebar.md), not as a parse error.

## Related

- [Step 5 — Find the sidebar](05-find-sidebar.md) — the first real consumer of the tree
- [Step 11 — Helpers](11-helpers.md) — `className.ts`, `firstChild.ts`, `text.ts`
