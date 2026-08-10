---
title: "Step 5 — Find the sidebar"
description: "Locating the single element that contains the entire navigation, and why there is no fallback if it is missing."
---

## What this step does

Finds the one element in the page that contains the whole sidebar. Everything in
[step 6](06-walk-sidebar.md) happens inside it.

## File

[`src/nav/root.ts`](../src/nav/root.ts)

## The code

```ts
export function retrieveRootNavElement(rootNode: HastRoot): Element | undefined {
  let rootTagName = "nav";
  let rootSelectorSet = new Set<string>(["rm-Sidebar"]);

  switch (framework.vendor) {
    case "readme":
      rootTagName = "nav";
      rootSelectorSet = new Set(["rm-Sidebar"]);
      break;
  }

  let element: Element | undefined = undefined;
  visit(rootNode, "element", function (node) {
    const { className } = node.properties;
    if (
      node.tagName === rootTagName &&
      Array.isArray(className) &&
      intersection(className as string[], rootSelectorSet).size > 0
    ) {
      element = node;
      return EXIT;
    }
    return CONTINUE;
  });

  return element;
}
```

Tag name plus a class-name intersection, first match wins, `EXIT` immediately.

## By vendor

| Vendor | Element |
|--------|---------|
| ReadMe | `nav.rm-Sidebar` |
| Docusaurus | `nav.menu` |
| GitBook | `aside#table-of-contents`, or an `aside` with one of `lg:page-no-toc:hidden`, `page-no-toc:hidden`, `page-no-toc:lg:hidden` |

GitBook is the odd one because it matches on `id` / `data-testid` first, and its class names are
Tailwind variants rather than semantic hooks.

## Why an intersection instead of `includes`

`rootSelectorSet` is a `Set` because some vendors accept **any of several** class names. GitBook has
three. Using [`intersection`](../src/utils/intersection.ts) rather than a single `includes` keeps one
code path for all of them.

For ReadMe the set has one member, so it behaves like `includes`.

## Why the class name is stable

ReadMe ships both hashed CSS-module classes and stable `rm-` prefixed hooks on the same element:

```html
<nav class="rm-Sidebar hub-sidebar reference-redesign Nav3C5f8FcjkaHj rm-Sidebar_guides">
```

`Nav3C5f8FcjkaHj` changes with every ReadMe deploy. `rm-Sidebar` does not — it exists so customers
can write custom CSS. Matching only on `rm-` prefixed names is what makes this survive ReadMe
releases.

The same rule holds for `rm-Sidebar-section`, `rm-Sidebar-category`, `rm-Sidebar-link`,
`rm-APIMethod`, `rm-Header` and `rm-Article`. **Never match a hashed class.**

## No fallback

If this returns `undefined`, the run for that tab fails outright:

```ts
const sidebar = retrieveRootNavElement(hast);
if (!sidebar) return { success: false, message: `${urlObj.toString()}: ${NAV_FAILURE_MSG}` };
```

There is no crawl, no sitemap, and no link-scraping fallback anywhere. That is the design: this is a
sidebar reader, not a crawler.

In practice a missing sidebar means one of three things:

1. The URL is a landing page, not a docs page. Expected — see [step 4](04-find-tabs.md).
2. The sidebar is client-rendered and you need a browser. See [step 1](01-fetch-pages.md).
3. The vendor changed its class names.

## Gotchas

- **`className` is an array in HAST.** `Array.isArray(className)` is a required guard, not defensive
  padding — a single-class element still parses to a one-element array, but a missing `class`
  attribute leaves `className` undefined.
- **First match wins.** If a page has two elements matching the selector, you get the first in
  document order. Not currently a problem for ReadMe.
- **The returned element is a live reference** into the tree from [step 2](02-parse-html.md). Step 6
  mutates it.

## Related

- [Step 6 — Walk the sidebar](06-walk-sidebar.md) — what happens to this element next
- [Step 3 — Detect the vendor](03-detect-vendor.md) — what selects the branch here
