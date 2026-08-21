# Migration report — docs-capillarytech-com

https://docs.capillarytech.com/docs/ · readme · page list from llms.txt, plus any sidebar page missing from it

25 pages · 25 converted · 0 failed · 1 blockers · 171 flags

Run finished 2026-08-21T11:17:06.369Z.

> **This run covered 25 of the site's 1563 pages.** Everything below describes only those — it is not a census of the site. Raise `--limit`, or drop it for the whole site.

> **1 page needed the lenient parser.** Their source has a syntax error, so they received *no component conversions at all*. Repair the source and convert again before reading anything else about them.

## Branding

| Value | Taken from | Source |
|---|---|---|
| Site name | Capillary Documentation | ssr-props |
| Brand colour (light) | #1341a9 | ssr-props |
| Brand colour (dark) | #4c7ceb | derived |
| Logo (light) | https://files.readme.io/bba3939-small-Layer_1_1.png | ssr-props |
| Logo (dark) | https://files.readme.io/8dd20af-white-logo.png | ssr-props |
| Favicon | https://files.readme.io/4956d96-favicon_v3_1.ico | ssr-props |

> 1 value was **computed here, not read from the site** — ReadMe leaves the dark-mode brand colour unset on most projects and lightens it at render time. Check it against the live site before publishing.

`heading` and `text` are deliberately left at the Documentation.AI defaults: they are chosen for contrast, and a source site's values were picked against its own background.

## Navigation

| Tab | Groups | Pages |
|---|---:|---:|
| User Documentation | 152 | 899 |
| API Documentation | 94 | 139 |

Tabs with no navigation in them, skipped:

- **Home** (`/`) — https://docs.capillarytech.com/: failed to retrieve nav items from HTML. Could not find the sidebar element. This build only implements ReadMe selectors (nav.rm-Sidebar).
- **Developer Documentation** (`/page/developerdocumentation`) — https://docs.capillarytech.com/page/developerdocumentation: failed to retrieve nav items from HTML. Could not find the sidebar element. This build only implements ReadMe selectors (nav.rm-Sidebar).
- **Releases** (`/page/product-release-notes`) — https://docs.capillarytech.com/page/product-release-notes: failed to retrieve nav items from HTML. Could not find the sidebar element. This build only implements ReadMe selectors (nav.rm-Sidebar).

## Blockers

| Page | Line | Rule | Detail |
|---|---:|---|---|
| `docs/customer-entities-management` | 110 | image | image has no alt and the file name carries no words to derive one from — alt is required, so write one |

## Pages

| Page | Parser | Compiles | Blockers | Flags | Fenced |
|---|---|---|---:|---:|---:|
| `docs/introduction` | mdx | yes | 0 | 1 | 0 |
| `docs/getting-started-with-capillary` | mdx | yes | 0 | 1 | 0 |
| `docs/accessing-capillary` | markdown | yes | 0 | 8 | 0 |
| `docs/explore-intouch-navigation` | mdx | yes | 0 | 19 | 0 |
| `docs/data-entities` | mdx | yes | 0 | 5 | 0 |
| `docs/customer_entity` | mdx | yes | 0 | 7 | 0 |
| `docs/store-hierarchy` | mdx | yes | 0 | 10 | 0 |
| `docs/locations-entities-management` | mdx | yes | 0 | 24 | 0 |
| `docs/product-entities-management` | mdx | yes | 0 | 20 | 0 |
| `docs/customer-entities-management` | mdx | yes | 1 | 10 | 0 |
| `docs/set-transactions` | mdx | yes | 0 | 0 | 0 |
| `docs/handling-of-rejected-transactions` | mdx | yes | 0 | 1 | 0 |
| `docs/setup-test-behavioral-events` | mdx | yes | 0 | 19 | 0 |
| `docs/card` | mdx | yes | 0 | 19 | 0 |
| `docs/user-group` | mdx | yes | 0 | 0 | 0 |
| `docs/hierarchy` | mdx | yes | 0 | 6 | 0 |
| `docs/data-fields` | mdx | yes | 0 | 0 | 0 |
| `docs/standard-fields` | mdx | yes | 0 | 0 | 0 |
| `docs/extended-fields` | mdx | yes | 0 | 8 | 0 |
| `docs/entity-management-custom-fields` | mdx | yes | 0 | 9 | 0 |
| `docs/create-search-filter` | mdx | yes | 0 | 0 | 0 |
| `docs/use-case-search-filter` | mdx | yes | 0 | 1 | 0 |
| `docs/overview-search-filter` | mdx | yes | 0 | 2 | 0 |
| `docs/create-search-filter-` | mdx | yes | 0 | 0 | 0 |
| `docs/performing-search-` | mdx | yes | 0 | 1 | 0 |
