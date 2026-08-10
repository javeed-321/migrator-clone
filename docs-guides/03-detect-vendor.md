---
title: "Step 3 — Detect the vendor"
description: "Identifying the documentation platform from meta tags, and why a mutable singleton drives every selector downstream."
---

## What this step does

Reads `<meta>` and `<link>` tags to work out which documentation platform built the page, then
stores the answer in a module-level singleton that every later step reads.

Nothing downstream works until this has run.

## File

[`src/utils/detectFramework.ts`](../src/utils/detectFramework.ts)

## The signals

| Signal | Vendor |
|--------|--------|
| `<meta name="readme-deploy">` | `readme` |
| `<meta name="generator" content="…docusaurus…">` | `docusaurus` — recognised, not implemented |
| `<link rel="preconnect" href="https://api.gitbook.com">` | `gitbook` — recognised, not implemented |
| `<meta name="generator" content="…gitbook…">` | `gitbook` — recognised, not implemented |

## The singleton

```ts
export const framework: Framework = {
  vendor: undefined,
  version: undefined,
  unsupportedVendor: undefined,
};
```

This is exported mutable state, and it is intentional. Every selector downstream reads
`framework.vendor` rather than taking it as an argument:

```ts
switch (framework.vendor) {
  case "readme":
    rootTagName = "nav";
    rootSelectorSet = new Set(["rm-Sidebar"]);
    break;
}
```

The upside is that `retrieveNavItems`, `processListItem`, `retrieveRootNavElement`,
`retrieveTabLinks` and `retrieveRootContent` all stay single-argument and mutually recursive without
threading a config object through five call layers.

The cost is real though:

- **Order matters.** Call any selector before `detectFramework` and it silently uses the wrong
  branch.
- **It is not concurrency-safe across different vendors.** Step 4 scrapes tabs in parallel — fine,
  because every tab of one site is the same vendor. Scraping two *different* sites concurrently in
  one process would corrupt the state.
- **Tests must reset it.** That is why `resetFramework()` exists and why
  [`tests/nav.test.ts`](../tests/nav.test.ts) calls it in `beforeEach`.

## Returns a boolean, does not exit

Upstream ends with `process.exit(1)` when it cannot identify the vendor. That is fine for a CLI and
fatal for a web server — it would kill the Next.js process on a bad URL.

This version returns `false` instead:

```ts
if (framework.vendor) return true;

if (framework.unsupportedVendor) {
  log(`Detected ${framework.unsupportedVendor}, but this build only implements ReadMe selectors. …`);
  return false;
}

log('Failed to detect documentation vendor — no <meta name="readme-deploy"> found', "error");
return false;
```

Callers turn that into a failed `Result`.

## Why recognise vendors it cannot scrape

`unsupportedVendor` is tracked separately from `vendor` so the error message can be specific.
"Detected gitbook, but this build only implements ReadMe selectors" tells you what to do next.
"Failed to detect documentation vendor" does not.

## Adding a vendor

Four files, in this order:

1. **This file** — add the detection signal, and move the vendor from `recognisedButUnsupported` to
   `docVendors` in [`src/types/framework.ts`](../src/types/framework.ts).
2. [`src/nav/root.ts`](../src/nav/root.ts) — its sidebar element. See [step 5](05-find-sidebar.md).
3. [`src/nav/retrieve.ts`](../src/nav/retrieve.ts) — its list-item shape. See
   [step 6](06-walk-sidebar.md).
4. [`src/tabs/retrieve.ts`](../src/tabs/retrieve.ts) — its tab bar. See [step 4](04-find-tabs.md).

Plus [`src/pipeline/page.ts`](../src/pipeline/page.ts) for the content root, and a browser path in
[step 1](01-fetch-pages.md) if the sidebar is client-rendered.

## Gotchas

- **Docusaurus v1 is unsupported upstream too.** Only v2 and v3 have a parseable sidebar.
- **Detection runs per tab.** `scrapeAllSiteTabs` calls it once, then each `scrapeSite` re-checks
  `if (!framework.vendor)`. Since the singleton is already set, the recheck is a no-op — but it
  means calling `scrapeSite` directly, without `scrapeAllSiteTabs`, still works.

## Related

- [Step 5 — Find the sidebar](05-find-sidebar.md) — the first consumer of `framework.vendor`
- [Step 1 — Fetch pages](01-fetch-pages.md) — where the vendor decides browser vs `fetch`
