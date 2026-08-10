---
title: "Pipeline guides"
description: "One guide per step of the discovery pipeline, mapping every source file to what it does and why."
---

## What this folder is

One guide per step of the discovery pipeline. Each guide covers the files that implement that step,
what they do, the decisions inside them, and the traps.

Read them in order the first time. After that, jump to the step you are changing.

## The whole thing in one sentence

Fetch one page, find the sidebar element in its DOM, and walk that `<li>` tree — the tree *is* both
the complete page list and the navigation structure.

There is no crawler, no sitemap, no `llms.txt`, and no link-following anywhere in this codebase.

## The guides

| Guide | Step | Source files |
|-------|------|--------------|
| [01 — Fetch pages](01-fetch-pages.md) | Get HTML over the network | `src/utils/network.ts`, `src/utils/backoff.ts` |
| [02 — Parse HTML](02-parse-html.md) | HTML string to a walkable tree | `src/pipeline/root.ts` |
| [03 — Detect the vendor](03-detect-vendor.md) | Identify the docs platform | `src/utils/detectFramework.ts` |
| [04 — Find the tabs](04-find-tabs.md) | Split the site into independent scrapes | `src/tabs/retrieve.ts`, `src/pipeline/tabs.ts` |
| [05 — Find the sidebar](05-find-sidebar.md) | Locate the one element that holds the nav | `src/nav/root.ts` |
| [06 — Walk the sidebar](06-walk-sidebar.md) | Build the nav tree — the core of the project | `src/nav/retrieve.ts`, `src/nav/listItems.ts` |
| [07 — Flatten and partition](07-flatten-and-partition.md) | Nav tree to a URL list, then split it | `src/nav/iterate.ts`, `src/pipeline/site.ts` |
| [08 — Fetch the pages](08-fetch-pool.md) | Concurrent fetching, 16 at a time | `src/pipeline/group.ts`, `src/pipeline/page.ts` |
| [09 — Repair the navigation](09-repair-navigation.md) | Prune failures and empty groups | `src/pipeline/site.ts` |
| [10 — Entry points](10-entry-points.md) | Library, CLI, API route, UI | `src/index.ts`, `src/cli.ts`, `app/` |
| [11 — Helpers](11-helpers.md) | Every file in `src/utils/` and `src/types/` | `src/utils/`, `src/types/` |

## Call graph

Where control actually flows, top to bottom:

```
discover()                        src/index.ts
└── fetchPageHtml()               step 1
└── scrapeAllSiteTabs()           src/pipeline/tabs.ts
    ├── htmlToHast()              step 2
    ├── detectFramework()         step 3
    ├── retrieveTabLinks()        step 4
    └── scrapeSite()  ── once per tab, in parallel ──  src/pipeline/site.ts
        ├── retrieveRootNavElement()   step 5
        ├── retrieveNavItems()         step 6  ⇄ processListItem()
        ├── iterateOverNavItems()      step 7
        ├── scrapePageGroup()          step 8  → scrapePage()
        └── traverse(navItems)         step 9
```

## Which file do I change?

| I want to… | Go to |
|------------|-------|
| Support GitBook or Docusaurus | [03](03-detect-vendor.md), [05](05-find-sidebar.md), [06](06-walk-sidebar.md), [04](04-find-tabs.md) |
| Include API endpoint pages | [06](06-walk-sidebar.md) — the `rm-APIMethod` check |
| Change concurrency | [08](08-fetch-pool.md) — `CHUNK_SIZE` |
| Add HTML to MDX conversion | [08](08-fetch-pool.md) — `scrapePage` is the seam |
| Fix a wrong group name or a doubled group | [06](06-walk-sidebar.md) |
| Understand why a page went missing | [07](07-flatten-and-partition.md), [09](09-repair-navigation.md) |
| Add retries or rate limiting | [01](01-fetch-pages.md) |

## A note on these files

These are plain GitHub-flavored Markdown because they live in a code repository and are read in an
IDE. They carry frontmatter so they can be moved into a Documentation.AI site later without a
rewrite — at which point the code blocks and tables stay as-is and only callouts need converting.
