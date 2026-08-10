---
title: "Step 4 — Find the tabs"
description: "Why a docs site with four tabs needs four separate sidebar walks, and how the per-tab results are merged."
---

## What this step does

Finds the top-level tabs in the site header, then runs the entire steps 5–9 pipeline **once per
tab**, in parallel, and merges the results.

## Files

| File | Role |
|------|------|
| [`src/tabs/retrieve.ts`](../src/tabs/retrieve.ts) | Extract tab links from the header DOM |
| [`src/pipeline/tabs.ts`](../src/pipeline/tabs.ts) | Orchestrate one `scrapeSite` per tab and merge |

## Why this step exists at all

The sidebar only ever shows the **current tab's** pages.

Load `docs.capillarytech.com/docs` and the sidebar has User Documentation's pages. Load `/reference`
and it has the API Documentation pages instead. Nothing on either page lists the other's.

Skip this step and you silently scrape a fraction of the site with no error. On the Capillary docs
that is 1022 pages versus roughly half that.

## Finding the tabs

```ts
if (framework.vendor !== "readme") return undefined;

// header.rm-Header
visit(rootNode, "element", function (node) {
  if (node.tagName === "header" && hasClassName(node, "rm-Header")) { element = node; return EXIT; }
});
```

Then anchors are collected from two containers inside that header — its `<nav>` and its
`.rm-Header-right` block — with four exclusions:

```ts
subNode.tagName !== "a" ||
typeof href !== "string" || !href ||
href.startsWith("http") ||   // off-site link, not a tab
href === "#" ||              // a dropdown toggle
isAuthLink(href)             // login / logout / signup
```

By vendor:

| Vendor | Tab bar element |
|--------|-----------------|
| ReadMe | `header.rm-Header` → anchors in `nav` and `.rm-Header-right` |
| Docusaurus | `nav.navbar` → anchors whose parent is exactly `.navbar__items` |
| GitBook | `nav#sections` with `aria-label="Sections"` |

## The auth-link filter

```ts
function isAuthLink(href: string): boolean {
  const path = href.split("?")[0] ?? "";
  return /^\/(login|logout|signup|sign-in|sign-up)\b/.test(path) || href.includes("redirect_uri");
}
```

`.rm-Header-right` holds the login controls next to the tab overflow, so a naive sweep picks up
`/login?redirect_uri=/docs/introduction` and treats it as a tab. Upstream does exactly that and
spends five requests (one plus four retries) earning a 404 on every run.

This is a deliberate deviation from upstream.

## The orchestration

```ts
const results = await Promise.all(
  links.map(async (tabEntry) => {
    const newUrl = new URL(urlObj.toString());
    newUrl.pathname = tabEntry.url;
    try {
      const newHtml = await fetchPageHtml(newUrl);
      return await scrapeSite(newHtml, newUrl, { ...opts, tabs: [tabEntry] });
    } catch (error) {
      return { success: false as const, message: getErrorMessage(error) };
    }
  })
);
```

Tabs run concurrently and unbounded — there are only ever a handful. The 16-at-a-time chunking
applies to pages *within* a tab, not to tabs. On a site with many tabs, this means
`tabs × 16` concurrent requests at peak.

Each tab's failure is caught individually, so one dead tab does not lose the others.

## Two fallbacks

**No tab bar, or a tab bar pointing only at the current page** — treat the whole site as one tab:

```ts
if (!links || !links.length || (links.length === 1 && links[0]?.url === urlObj.pathname)) {
  return scrapeSite(html, urlObj, { ...opts, hast });
}
```

Note `hast` is passed through, so the tree from step 2 is reused rather than re-parsed.

**The entry URL is not reachable from the tab bar** — add it as its own tab, so the page you
actually asked for is never dropped:

```ts
if (!links.find((link) => urlObj.pathname.startsWith(link.url))) {
  links.push({ name: getTitleFromLink(urlObj.pathname), url: urlObj.pathname });
}
```

## Merging

Every array in the report is concatenated across tabs — `navigation`, `tabs`, `discovered`,
`internal`, `external`, `root`, `failed`. Failed tabs contribute nothing. If no tab produced any
navigation, the whole run fails.

## Real-world result

On `docs.capillarytech.com`, five tabs are found and two produce navigation:

| Tab | Result |
|-----|--------|
| User Documentation (`/docs`) | Scraped |
| API Documentation (`/reference`) | Scraped |
| Home (`/`) | No sidebar — ReadMe landing page |
| Developer Documentation (`/page/developerdocumentation`) | No sidebar — ReadMe landing page |
| Releases (`/page/product-release-notes`) | No sidebar — ReadMe landing page |

The three landing pages are reported as skipped, not as bugs. ReadMe "custom pages" have no sidebar
by design.

## Gotchas

- **`newUrl.pathname = tabEntry.url` drops query strings.** Fine for tabs, which are path-only.
- **Duplicate hrefs are de-duplicated** by the `seen` set, because ReadMe renders the same tab twice
  for desktop and mobile layouts.
- **Tab names come from the anchor text**, falling back to a title derived from the href.

## Related

- [Step 5 — Find the sidebar](05-find-sidebar.md) — what runs inside each tab
- [Step 9 — Repair the navigation](09-repair-navigation.md) — runs per tab, before merging
