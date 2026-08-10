---
title: "Step 6 — Walk the sidebar"
description: "The mutual recursion that turns a sidebar DOM into a navigation tree, and the two node shapes you must not conflate."
---

## What this step does

Walks the sidebar element into a `NavigationEntry[]` — the tree of groups and page slugs that becomes
`docs.json`.

This is the core of the whole project. Everything else is plumbing around it.

## Files

| File | Role |
|------|------|
| [`src/nav/retrieve.ts`](../src/nav/retrieve.ts) | `retrieveNavItems` — walks a subtree, handles sections |
| [`src/nav/listItems.ts`](../src/nav/listItems.ts) | `processListItem` — turns one `<li>` into a leaf or a group |

The two are **mutually recursive**: `retrieveNavItems` calls `processListItem` for each `<li>`, and
`processListItem` calls `retrieveNavItems` on any nested `<ul>` it finds.

## The output shape

```ts
type NavigationEntry = string | { group: string; pages: NavigationEntry[] };
```

A bare string is a leaf page — and that string is the slug, which doubles as the output file path. A
group has a name and children, which are themselves entries. Arbitrarily deep.

## The two node shapes

This is the thing to get right. Conflating them is how you get a doubled navigation tree.

```html
<!-- Shape A: a category. Heading + list. NO page of its own. -->
<section class="rm-Sidebar-section">
  <button class="rm-Sidebar-category">Capillary Data Platform</button>
  <ul class="rm-Sidebar-list"> … </ul>
</section>

<!-- Shape B: a page, which may also be a parent. Its href IS a page. -->
<li class="Sidebar-item">
  <a class="rm-Sidebar-link Sidebar-link_parent" href="/docs/data-entities">Entities Management</a>
  <ul class="subpages"> … </ul>
</li>
```

Shape A's heading is a **collapse toggle**, not a link. There is no page behind "Capillary Data
Platform". Shape B's anchor is a real page that also happens to have children.

### The bug this prevents

Upstream looks for the category heading in an `<h2>`. ReadMe now renders it as a `<button>`. That
lookup finds nothing, so the section falls through to the generic `<li>` path, which does
`findFirstChild(node, 'a')` — the first anchor **descendant**, which is the first page inside the
section.

The result is that every category is named after its first page, and that page appears twice:

```
# Entities Management  (12 pages)          ← should be "CAPILLARY DATA PLATFORM"
  - docs/data-entities                     ← duplicated
  # Entities Management  (15 pages)
    - docs/data-entities                   ← here it is again
```

That is real output from this project before the fix.

## `retrieveNavItems`

```ts
visit(rootNode, "element", function (node) {
  if (framework.vendor === "readme" && node.tagName === "section") {
    result.push(...processSection(node));
    return SKIP;
  }

  if (node.tagName !== "li") return CONTINUE;

  const entry = processListItem(node, { sectionTagName: "h2", childListTagName: "ul" });
  if (entry !== undefined) {
    result.push(entry);
    return SKIP;
  }
  return CONTINUE;
});
```

`SKIP` after a successful match is essential. It stops the walk descending into a node whose children
have already been claimed by the recursion. Return `CONTINUE` there instead and every nested page is
collected twice — once by its parent's recursion and once by the outer walk.

## `processSection`

```ts
function processSection(node: Element): NavigationEntry[] {
  const childList = findFirstChild(node, "ul");
  if (!childList) return [];

  const pages = retrieveNavItems(childList);
  if (pages.length === 0) return [];

  const title = getText(findSectionHeading(node));
  if (!title) return pages;

  return [{ group: title, pages }];
}
```

Note what is **not** here: no `findFirstChild(node, 'a')`, and nothing prepended to `pages`. A
section owns no page.

It returns an array rather than a single entry so that a section with no heading can contribute its
children un-grouped instead of inventing a title.

The heading lookup matches the class first and falls back to `<h2>` for older ReadMe sites:

```ts
function findSectionHeading(node: Element): Element | undefined {
  const byClass = findByClassName(node, "rm-Sidebar-category");
  if (byClass && !hasClassName(byClass, "rm-Sidebar-link")) return byClass;
  return findFirstChild(node, "h2");
}
```

The `rm-Sidebar-link` exclusion guards against a page link that also carries the category class.

## `processListItem`

The branch that decides everything:

```ts
const childList = findFirstChild(node, "ul");
if (!childList) return linkHref;        // leaf page — just the slug
```

No nested `<ul>` means a leaf. A nested `<ul>` means a group, and the function recurses.

In order, it:

1. Finds the first anchor descendant. No anchor, no entry.
2. Reads `href`. Skips `undefined` and bare `#` (a toggle).
3. Skips API endpoint links — see below.
4. Strips the leading `/`, so `/docs/intro` becomes `docs/intro`. **From here on the slug is the file
   path.**
5. Looks for a nested `<ul>`. If none, returns the slug.
6. Otherwise: takes the title from the anchor text, recurses into the nested list, and prepends its
   own slug so the group's landing page is its first page.

```ts
const title = opts.title || getText(link) || getText(sectionHeader) || "";
let childEntries = retrieveNavItems(childList);
childEntries = dedupedAppend(newLink, childEntries, true);   // prepend
return { group: title, pages: childEntries };
```

## API endpoint links are skipped

```ts
visit(link, "element", function (subNode) {
  if (subNode.tagName === "span" && hasClassName(subNode, "rm-APIMethod")) {
    isApiReferenceLink = true;
    return EXIT;
  }
});
if (isApiReferenceLink) return undefined;
```

`span.rm-APIMethod` is the GET/POST/PUT chip ReadMe renders next to endpoint links. Upstream drops
these because Mintlify generates those pages from the OpenAPI spec instead.

**This is kept faithful here and it is the most likely thing you will want to change.** On the
Capillary docs it is the difference between 1022 pages and several hundred more. Delete the check in
[`src/nav/listItems.ts`](../src/nav/listItems.ts) to include them.

## The overview marker

```ts
const newLink = childEntries.find((child) => typeof child === "string" && child.startsWith(linkHref))
  ? removeTrailingSlash(linkHref) + OVERVIEW_PAGE_SLUG
  : linkHref;
```

Easy to misread. It does **not** rename any file and it does not prevent a collision.

Upstream's only lasting use is a boolean carried into the MDX stage that sets the page's frontmatter
title to "Overview" instead of its H1. Since this build stops before MDX, the marker is stripped in
[step 9b](09-repair-navigation.md) and has no effect on output.

The match is a plain `startsWith`, so a prefix-sharing *sibling* triggers it too — `/docs/loyalty`
gets marked because `/docs/loyalty-a` exists. Harmless, since it is stripped either way. There is a
test pinning this behaviour.

## Worked example

Input:

```html
<nav class="rm-Sidebar">
  <section class="rm-Sidebar-section">
    <button class="rm-Sidebar-category">GETTING STARTED</button>
    <ul>
      <li><a href="/docs/introduction">Introduction</a></li>
      <li>
        <a href="/docs/data-entities">Entities Management</a>
        <ul class="subpages">
          <li><a href="/docs/customer_entity">Customer entity</a></li>
        </ul>
      </li>
    </ul>
  </section>
</nav>
```

Output:

```json
[
  {
    "group": "GETTING STARTED",
    "pages": [
      "docs/introduction",
      { "group": "Entities Management", "pages": ["docs/data-entities", "docs/customer_entity"] }
    ]
  }
]
```

The section contributes its name only. The parent `<li>` contributes both its own page and its
children, with its own page first.

## Gotchas

- **`findFirstChild` finds descendants, not direct children.** A sidebar `<li>` wraps its anchor in
  several `<div>` and `<span>` layers, so this is required — but it also means a lookup on a
  `<section>` reaches into its child pages. That is exactly the trap `processSection` avoids.
- **The tree is mutated.** Group names are read from live nodes; nothing is cloned.
- **Category casing is kept as-is.** ReadMe's DOM literally contains `GETTING STARTED`. Upstream does
  not title-case it and neither does this.
- **Cross-listed pages appear twice.** Seven slugs on the Capillary docs are in two categories in
  ReadMe's own sidebar. Reproducing that is correct, not a bug.
- **`getText` skips `<svg>`** so icon glyphs do not end up inside group names.

## Related

- [Step 7 — Flatten and partition](07-flatten-and-partition.md) — what consumes this tree
- [Step 9 — Repair the navigation](09-repair-navigation.md) — where the tree is cleaned up
- [`tests/nav.test.ts`](../tests/nav.test.ts) — every rule above has a test
