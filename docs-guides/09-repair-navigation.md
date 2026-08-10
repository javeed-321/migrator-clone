---
title: "Step 9 — Repair the navigation"
description: "Six passes over the nav tree that swap slugs, prune failed pages and collapse empty groups."
---

## What this step does

Takes the nav tree from [step 6](06-walk-sidebar.md) and the fetch results from
[step 8](08-fetch-pool.md), and reconciles them: rewrite what changed, remove what failed, and
collapse whatever that leaves empty.

Six passes, labelled `9a` to `9f` in the source.

## File

[`src/pipeline/site.ts`](../src/pipeline/site.ts), from the `--- Step 9 ---` comment to the return.

## Why `neotraverse`

The nav tree is arbitrarily deep and mixes strings with objects with arrays. `neotraverse` walks any
JSON structure and gives each visitor a context with `update()`, `remove()`, `parent`, `key` and
`isRoot`.

```ts
traverse(navItems).forEach(function (value: unknown) {
  if (typeof value === "string") this.update(something);
});
```

It must be a `function`, not an arrow — the context is `this`.

Every pass handles the string case and the array case separately, because a page slug can be visited
either as a standalone value or as a member of a `pages` array.

## 9a — Swap slugs

Two replacement maps are built from the successful results:

```ts
const externalLinkReplaceMap = new Map(externalResults.filter(r => r.success).map(r => r.data));
const rootPathReplaceMap     = new Map(rootResults.filter(r => r.success).map(r => r.data));
```

Then every occurrence in the tree is swapped. This is what turns
`https://other-site.com/thing` into a local `thing` slug, and the bare origin into `home`.

## 9b — Strip the overview marker

```ts
this.update(value.replace(OVERVIEW_PAGE_SLUG, ""));
```

The marker from [step 6](06-walk-sidebar.md) has served its purpose. `docs/loyalty/clone_overview`
becomes `docs/loyalty` again.

This is why the marker never appears in output, and why its over-eager `startsWith` match in step 6
is harmless.

## 9c — Wrap bare top-level slugs

```ts
navItems.forEach((navItem, index) => {
  if (typeof navItem !== "string") return;
  const lastItemInPath = navItem.split("/").pop() || navItem;
  navItems[index] = { group: convertStrToTitle(lastItemInPath), pages: [navItem] };
});
```

A page hanging at the top level with no group is not valid navigation, so it gets a group named after
its own slug — `docs/get-started` becomes a group called "Get Started" containing one page.

Only the top level. Nested bare slugs are legitimate — they are pages inside a group.

## 9d — Prune failures and filtered-out pages

```ts
const allErroredPaths = allErrors.map((result) => {
  if (!result.data) return "";
  try {
    return removeLeadingSlash(removeTrailingSlash(new URL(result.data[0]).pathname));
  } catch { return ""; }
}).filter(Boolean);

function shouldDrop(value: string): boolean {
  if (allErroredPaths.includes(value)) return true;
  if (opts.filter && !matchesFilter("/" + value, opts.filter)) return true;
  return false;
}
```

Two reasons to drop a page: it failed to fetch, or it is outside `--filter`.

The filter runs again here even though [step 7](07-flatten-and-partition.md) already applied it,
because step 7 only decided what to *fetch*. Without this pass the nav tree would still list pages
that were never fetched.

`this.key !== "group"` guards against deleting a **group name** that happens to look like a dropped
slug.

## 9e — Collapse empty groups

```ts
let count = 1;
while (count > 0) {
  count = 0;
  traverse(navItems).forEach(function (value: unknown) {
    if (!Array.isArray(value) || value.filter(Boolean).length > 0) return;
    if (this.isRoot) return;
    count++;
    if (this.parent && !this.parent.isRoot) this.parent.remove();
    else this.remove();
  });
}
```

An empty `pages` array means its **parent group** is dead, so the parent is what gets removed — not
the array.

The loop repeats because removing a group can empty its own parent. A three-deep chain of
single-child groups needs three passes. It runs until a full pass removes nothing.

### The root guard

`if (this.isRoot) return;` is a fix over upstream. Calling `remove()` on the traversal root throws
inside `neotraverse` with `Cannot read properties of undefined (reading 'node')`.

It triggers whenever a filter matches nothing, which upstream never hit because the filter option is
rarely used with a path that empties the tree. Reproduced reliably here with
`--filter /docs/loyalty-settings-2` before the guard was added.

## 9f — Drop remaining absolute URLs

```ts
const isAbsolute = (v: unknown) =>
  typeof v === "string" && (v.startsWith("https://") || v.startsWith("http://"));
```

Anything still absolute at this point could not be localised in 9a, so it does not belong in a
navigation file. Same parent-removal and root-guard logic as 9e.

## Order matters

The passes are not independent:

| Pass | Depends on |
|------|-----------|
| 9a | Step 8 results |
| 9b | 9a — swaps happen before markers are stripped |
| 9c | 9b — grouping uses the final slug |
| 9d | 9c — so a wrapped group can be pruned as a unit |
| 9e | 9d — pruning is what creates the empty groups |
| 9f | 9a — only unswapped absolutes remain |

## Worked example

`--filter /docs/loyalty-settings-2` against a 1022-page site produces exactly:

```json
[
  {
    "group": "LOYALTY+",
    "pages": [{ "group": "Loyalty Settings", "pages": ["docs/loyalty-settings-2"] }]
  }
]
```

9d removed 1021 pages; 9e collapsed the eleven other top-level groups and every emptied subgroup,
leaving only the two ancestors of the surviving page.

## Gotchas

- **`skipFetch` means nothing is pruned.** With no fetch results there are no failures, so 9d only
  applies the filter. Discovery-only output lists what the sidebar claimed, unverified.
- **This runs per tab**, before [step 4](04-find-tabs.md) merges the results — so a group cannot be
  collapsed against pages from another tab.
- **`allErroredPaths.includes` is a linear scan** inside a traversal. O(pages × failures). Fine at
  1000 pages with a handful of failures; a `Set` would be the fix if failures ever run high.
- **Group names are not deduplicated.** Two categories with the same name stay separate.

## Related

- [Step 8 — Fetch the pages](08-fetch-pool.md) — produces the results consumed here
- [Step 4 — Find the tabs](04-find-tabs.md) — merges the repaired trees
