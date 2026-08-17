# Fetch Pages & Links

How a ReadMe documentation URL becomes a Documentation.AI `documentation.json`.

This is the only discovery path in the project. There is no CLI and no second
pipeline — everything runs through `POST /api/fetch-pages-links`.

---

## The whole flow at a glance

```
 browser form                app/fetch-pages-links/page.tsx
      │  POST { url, filter?, verifyPages? }
      ▼
 route handler               app/api/fetch-pages-links/route.ts
      │
      ├─ 1  fetchPageHtml            URL      →  HTML string
      ├─ 2  htmlToHast               HTML     →  HAST tree
      ├─ 3  detectFramework          HAST     →  vendor = "readme"
      ├─ 4  retrieveTabLinks         HAST     →  Tab[]        ← the tab bar
      │
      └─ for each tab, in parallel:  fetch its page, then scrapeSite()
             ├─ 5  retrieveRootNavElement    find nav.rm-Sidebar
             ├─ 6  retrieveNavItems          sidebar → nav tree
             │     └─ or retrieveListNavItems   (no sidebar → paginated list)
             ├─ 7  iterateOverNavItems       nav tree → URL[]
             ├─ 7b partition                 internal / external / root
             ├─ 8  scrapePageGroup           fetch + convert each page
             └─ 9  repair                    prune, relink, tidy
      │
      ├─ drop tabs with 0 pages   → `skipped`
      ▼
 JSON response  { ok, site, vendor, tabs[], skipped? }
      │
      ▼
 browser        renders the tree, then
                buildDocumentationJson(tabs) → documentation.json
                                               (copy / download)
```

---

## Request contract

```
POST http://localhost:3000/api/fetch-pages-links
Content-Type: application/json
```

```json
{
  "url": "https://docs.capillarytech.com/docs",
  "filter": "/docs",
  "verifyPages": false
}
```

| Field | Required | Default | Effect |
|---|---|---|---|
| `url` | yes | — | Entry page. Must be absolute with a scheme. |
| `filter` | no | none | Keeps only slugs under this path. Applied in step 7b and again in 9d. |
| `verifyPages` | no | `false` | `false` = nav tree only, fast. `true` = fetch every page body to find 404s. |

`verifyPages` inverts into `skipFetch` at [route.ts:89](../app/api/fetch-pages-links/route.ts#L89).
With it off, step 8 is skipped entirely and the run makes one request per tab and
nothing more.

Failure codes: `400` for a malformed body or missing/unparseable `url`.
Everything else returns `200` with `ok: false` and a `message` — which is why the
client checks both `res.ok` and `json.ok`.

Runtime config at the top of the route: `nodejs` (the pipeline uses `undici` and a
mutable module singleton, so it cannot run on the edge), `force-dynamic`, and
`maxDuration = 300`. Raise your HTTP client's timeout to match.

---

## Step 1 — Fetch the entry page

`fetchPageHtml` · [src/utils/network.ts](../src/utils/network.ts)

A plain `fetch` with browser-like headers, wrapped in `exponentialBackoff`.
Returns the raw HTML string; it has no idea what a sidebar is.

The architectural fact worth knowing: **ReadMe ships its navbar and sidebar in the
initial HTML**, so there is no headless browser anywhere in this project. GitBook
and Docusaurus would need one, because their navigation is client-rendered.

## Step 2 — Parse to HAST

`htmlToHast` · [src/pipeline/root.ts](../src/pipeline/root.ts)

`rehype-parse` turns the HTML into a HAST tree, then `position` data and comments
are stripped so the tree is small enough to serialise into a response.

**There is no CSS selector engine in this project.** Every match after this point
is a `unist-util-visit` walk testing `tagName` plus a `className` array. That
constraint explains the shape of every selector below.

## Step 3 — Identify the vendor

`detectFramework` · [src/utils/detectFramework.ts](../src/utils/detectFramework.ts)

Looks for one tag:

```html
<meta name="readme-deploy" content="5.851.2">
```

Sets the module-level `framework.vendor = "readme"`. This is a **hard ordering
dependency** — `retrieveTabLinks` returns `undefined` immediately if the vendor
isn't set, so detection must run first or you silently get zero tabs.

> **Known sharp edge.** `framework` is a mutable module singleton and
> `detectFramework` calls `resetFramework()` on entry. That's fine for one request;
> two concurrent requests can blank each other's vendor mid-walk. The visible
> symptom is group names vanishing from the nav tree — no error, HTTP 200.

## Step 4 — Find the tabs

`retrieveTabLinks` · [src/tabs/retrieve.ts](../src/tabs/retrieve.ts)

Why this exists: **a ReadMe sidebar only ever contains the current tab's pages.**
The `/docs` HTML has no idea what lives under `/reference`. A four-tab site
therefore needs four separate fetch-and-walk passes.

1. Find `header.rm-Header`.
2. Inside it, treat these as tab containers ([line 40](../src/tabs/retrieve.ts#L40)):

   ```ts
   const TAB_CONTAINER_CLASSES = ["rm-Header-left", "rm-Header-right", "rm-Header-bottom"];
   ```

   plus any `<nav>`.
3. Collect anchors, rejecting: absolute URLs, `#`, and auth links
   (`/login`, `/signup`, anything with `redirect_uri`). Dedupe by `href`.
4. Name each tab from its link text, falling back to a title derived from the
   path (`/api-reference` → `Api Reference`).

`rm-Header-top` is deliberately **not** a container — it holds the "Jump to
Content" skip-link (`#content`), which is not a tab.

> **Why `rm-Header-left` matters.** It was missing originally, and the walk only
> read `<nav>` and `rm-Header-right`. Sites that render a duplicate copy of the tab
> bar inside a `<nav>` (Capillary) worked; sites that don't (Flutterwave, Miro,
> Front, Rollbar, Split) returned **zero tabs** and were then treated as single-tab
> sites. Front lost 100 of its 173 pages that way and Miro 143 of 337, with no
> error raised. Measured across 37 captured pages: 10 returned zero tabs before,
> 0 after, with no regressions.

### The fan-out

[route.ts:117-159](../app/api/fetch-pages-links/route.ts#L117-L159)

```ts
const singleTab = !links.length || (links.length === 1 && links[0]?.url === urlObj.pathname);
```

- **Single tab** — no tab bar, or one that points back at the page already loaded.
  The HTML and parsed `hast` in hand are reused; nothing is fetched twice.
- **Multiple tabs** — one `fetchPageHtml` + `scrapeSite` per tab, in parallel via
  `Promise.all`. Each tab's failure is caught individually, so one dead tab does
  not kill the run.

Before fanning out, the entry URL is re-added as its own tab if the tab bar
doesn't cover it — otherwise the page you asked for could be silently dropped.

---

## Steps 5–9 — One tab

`scrapeSite` · [src/pipeline/site.ts](../src/pipeline/site.ts)

Runs entirely on the HTML passed to it. It does **not** re-fetch that page.

### Step 5 — Find the sidebar

`retrieveRootNavElement` · [src/nav/root.ts](../src/nav/root.ts) ·
[site.ts:62](../src/pipeline/site.ts#L62)

Matches `nav.rm-Sidebar` — tag name plus a class-name intersection.

### Step 6 — Walk it into a nav tree

[site.ts:65-79](../src/pipeline/site.ts#L65-L79). Two possible paths:

#### 6a — Sidebar walk (the normal case)

`retrieveNavItems` · [src/nav/retrieve.ts](../src/nav/retrieve.ts)
and `processListItem` · [src/nav/listItems.ts](../src/nav/listItems.ts)

Mutually recursive. Two node shapes matter, and conflating them is the classic way
to produce a doubled nav:

| Markup | Meaning | Handler |
|---|---|---|
| `<section class="rm-Sidebar-section">` | a category heading + a list. **Owns no page** — the heading is a collapse toggle. | `processSection` |
| `<li>` | a page, optionally with children. Its own `href` **is** a page. | `processListItem` |

`SKIP` is load-bearing in both: it stops the visitor descending into a subtree
that recursion has already claimed.

Inside `processListItem` the branch that decides everything is
`findFirstChild(node, "ul")` — no nested list means a leaf slug, a nested list
means a group plus recursion. Along the way it also:

- skips links carrying an `rm-APIMethod` chip (GET/POST/…), because those pages
  come from the OpenAPI spec instead;
- strips the leading slash, so **the slug doubles as the output file path**;
- marks a group's own landing page with `OVERVIEW_PAGE_SLUG` when its slug is a
  prefix of a child's — a marker stripped again in step 9b.

Category headings are found by class (`rm-Sidebar-category`) first, falling back
to `<h2>`. ReadMe renders that heading as a `<button>` now; matching only `<h2>`
makes every category borrow its first child's title and list that page twice.

The output type is recursive:

```ts
type NavigationEntry = string | { group: string; pages: NavigationEntry[] };
```

A bare `string` is a leaf page slug. This shape flows unchanged all the way to the
browser.

#### 6b — Paginated-list fallback (no sidebar)

`retrieveListNavItems` · [src/nav/list.ts](../src/nav/list.ts)

Not every tab renders a sidebar. Changelog and Discussions are chronological
lists — ten entries plus a "Next Page" control — so there is no tree to walk. On
`docs.readme.com` that is three of five tabs:

```
/main/docs       193 rm-Sidebar hits  →  sidebar walk
/main/reference  189 rm-Sidebar hits  →  sidebar walk
/main/changelog    0                  →  list fallback  (215 pages)
/main/discuss      0                  →  list fallback  (250 pages)
/main/recipes      0                  →  neither; client-rendered
```

How it works:

1. Find the list container by class — `rm-Changelog`, `rm-Discuss`, `rm-Recipes`
   — falling back to `<main>`.
2. Collect anchors pointing *below* the list's own path. That prefix test is what
   separates real entries (`/main/changelog/in-app-oas-editing`) from pagination
   links, which stay at the list path and differ only by query string.
3. Follow pagination. If the `1 of 22` counter is present, every remaining page
   URL is derived up front and fetched **concurrently** — 22 pages in about a
   second instead of 22 sequential round trips. Without a counter it walks the
   next-page chain one hop at a time, with a visited-set guard.

Two details that matter:

- Page URLs are built from the **next-page link**, not the base URL, because it
  carries query params ReadMe needs — `?page=2&lang=en` for changelog,
  `?page=2&perPage=10` for discussions. Dropping `perPage` changes the page size
  and breaks the paging arithmetic.
- The `1 of 22` count is read from the **rendered text**, not the class, because
  the class carries a build hash (`PaginationControls-meta1gGHPN0gqjND`).

`MAX_LIST_PAGES` (25) caps the walk. Hitting the cap is logged, never silent.

#### 6c — Declined: pages that are not navigation

[list.ts:65](../src/nav/list.ts#L65) and [list.ts:166](../src/nav/list.ts#L166)

Two guards stop the fallback treating a marketing page as a list:

```ts
const NON_LIST_ROOT_CLASSES = ["rm-LandingPage", "rm-CustomPage"];
```

```ts
const basePath = removeTrailingSlash(pageUrl.pathname);  // "/" → ""
if (!basePath) return undefined;
```

The second guard is the one that does the work. A landing page always lives at
`/`, so `basePath` is empty and the prefix test in step 2 above degenerates to
`startsWith("/")` — matching every internal link on the page, header and footer
included. That's how a Home tab ends up swallowing pages the other tabs own.

> **Evidence.** Across 27 ReadMe sites, 14 serve a landing page. Every one has no
> `document` and an empty `sidebar` in its `ssr-props`, and **not one contributes a
> page of its own** — every link points into another tab. Capillary's 8 links are
> 6 duplicates and 2 dead 404s; Shopline's 34 are all duplicates. Custom pages
> (`/page/<slug>`) behave identically: all 27 links inside Capillary's two custom-page
> tabs resolve to `/docs` pages the User Documentation tab already carries.
>
> One caveat found while checking: Lithic's landing page links to
> `/docs/transaction-webhooks`, a live page in no sidebar. Landing pages are not a
> navigation source, but diffing their links against the union of tab slugs is a
> cheap way to surface genuinely unlisted pages. Not currently implemented.

When step 6 produces nothing, `scrapeSite` returns `NAV_FAILURE_MSG` and the tab
ends up with zero pages — which the route then drops.

### Step 7 — Flatten to URLs

`iterateOverNavItems` · [src/nav/iterate.ts](../src/nav/iterate.ts) ·
[site.ts:81](../src/pipeline/site.ts#L81)

Walks the tree into a flat `URL[]`. `new URL(slug, origin)` is what turns a
relative sidebar href into an absolute URL, and it is also what makes the origin
comparison in 7b possible.

### Step 7b — Partition

[site.ts:87-110](../src/pipeline/site.ts#L87-L110)

| Bucket | Test |
|---|---|
| `external` | `link.origin !== origin` |
| `internal` | same origin, not the bare origin, passes `filter` |
| `root` | the bare origin itself — it has no pathname to use as a filename, so it borrows a name from `INDEX_NAMES` |

### Step 8 — Fetch and convert

`scrapePageGroup` · [src/pipeline/group.ts](../src/pipeline/group.ts) ·
[site.ts:112](../src/pipeline/site.ts#L112)

**Skipped entirely when `verifyPages` is false.**

Fetches every discovered page `CHUNK_SIZE` (16) at a time — chunks sequential,
pages inside a chunk concurrent. Errors are captured per URL and returned as
failed results, never thrown, so one dead link cannot abort a 400-page run. Those
failures are exactly what step 9d prunes.

Each fetched page goes through `scrapePage`
([src/pipeline/page.ts](../src/pipeline/page.ts)): find the content root
(`article.rm-Article`), convert HAST → MDAST → MDX, and lift the title and
description out of the body into frontmatter.

External links are never fetched — they only need a stable slug so the nav tree
can point at a local stub instead of off-site.

### Step 9 — Repair the nav tree

[site.ts:127-244](../src/pipeline/site.ts#L127-L244). Six passes, in order:

| Pass | What it does |
|---|---|
| **9a** | Swap external URLs and bare-origin entries for their local slugs |
| **9b** | Drop the `OVERVIEW_PAGE_SLUG` marker now that filenames are settled |
| **9c** | Wrap a top-level bare slug in a group — a loose slug is not valid navigation |
| **9d** | Remove pages that failed to fetch, plus anything outside the filter |
| **9e** | Prune groups left with no pages, repeatedly, until a pass is clean |
| **9f** | Drop anything still absolute — it could not be localised |

9e loops because emptying a child group can empty its parent. The root array is
skipped, since `remove()` on the root throws inside `neotraverse` — which is what
a filter matching nothing used to trigger.

---

## Dropping empty tabs

[route.ts:167-178](../app/api/fetch-pages-links/route.ts#L167-L178)

```ts
const tabs = scraped.filter((tab) => tab.pages > 0);
const skipped = scraped.filter((tab) => tab.pages === 0).map(/* name, url, reason */);
```

A tab with no pages after the sidebar walk *and* the list fallback is not
navigation. The threshold is `pages > 0`, not `ok`, so it catches both hard
failures and tabs filtered down to nothing.

Dropped tabs are **reported, never silent** — they come back in `skipped` with a
reason, and the UI names them. The whole request only fails when every tab is
empty.

On `docs.capillarytech.com` that means:

```
Home                    → dropped (landing page)
User Documentation      → 891 pages
API Documentation       → 139 pages
Developer Documentation → dropped (custom page)
Releases                → dropped (custom page)
```

## Response

```jsonc
{
  "ok": true,
  "site": "https://docs.capillarytech.com/docs",
  "vendor": "readme",
  "tabs": [
    {
      "name": "User Documentation",
      "url": "/docs",
      "navigation": [ /* NavigationEntry[] */ ],
      "groups": 42,
      "pages": 891,
      "ok": true
    }
  ],
  "skipped": [
    { "name": "Home", "url": "/", "reason": "no page links found in this tab" }
  ]
}
```

Types in [app/fetch-pages-links/types.ts](../app/fetch-pages-links/types.ts).

---

## In the browser

[app/fetch-pages-links/page.tsx](../app/fetch-pages-links/page.tsx)

### Rendering the tree

The nav tree is recursive, so the renderer is too — three components calling each
other:

```
Sidebar  →  one tab, maps its top-level entries
  └─ Node   →  the type switch
       ├─ string  →  <a> page link
       └─ object  →  Group
             └─ Group  →  maps its pages back into Node
```

`Node` mirrors `NavigationEntry = string | NavigationGroup` exactly. Indentation
is computed (`0.5 + depth * 0.85rem`), not nested CSS.

Expand/collapse-all works by changing the `key` on `<Sidebar>`: a new key destroys
and rebuilds the subtree, so every `Group` re-initialises `useState(defaultOpen)`.

### Building `documentation.json`

`buildDocumentationJson` · [src/output/documentationJson.ts](../src/output/documentationJson.ts)

Runs **client-side**. `TabResult` already carries `name`, `url` and `navigation` —
structurally identical to the builder's `TabInput` — so the config is derived from
the response with no API change.

The rule that shapes the whole file is Documentation.AI's **one-child rule**: a tab
holds exactly one of `pages`, `groups` or `dropdowns`, never a mix. Our scraped
trees don't respect that, so:

| Tab contains | Emitted as |
|---|---|
| only groups | `groups: [...]` |
| only bare slugs | `pages: [...]` |
| **both** | loose pages collected into one group named after the tab, kept first |

Inside a group the rule relaxes — a `pages` array may mix page entries and nested
groups — which maps straight onto `NavigationEntry`.

Three things it does beyond the plain mapping:

- **Cross-tab dedupe** (default on). A slug claimed by an earlier tab is dropped
  from later ones; a tab emptied that way is omitted. ReadMe sidebars carry
  `type: "link"` entries pointing back at pages another tab owns — 14 of them on
  `developers.miro.com` — and a duplicate `path` renders the same page twice.
  Disable with `dedupe: false`.
- **Shouted group names get title-cased.** `CAPILLARY DATA PLATFORM` →
  `Capillary Data Platform`. Only fires when a name has no lowercase letter, so
  `API` and `OAuth Setup` are untouched. Disable with `normalizeGroupCase: false`.
- **Tab icons** by module word: `reference`→`code`, `changelog`→`megaphone`,
  `recipes`→`chef-hat`, `discuss`→`messages-square`, `guides|docs`→`book`.

Page titles are derived from the slug (`docs/get-started` → `Get Started`). Pass
`titles: { slug: "Real Title" }` to use the real H1s that step 8 produces when
`verifyPages` is on.

Output:

```json
{
  "name": "Capillary Documentation",
  "initialRoute": "docs/introduction",
  "colors": { "light": { … }, "dark": { … } },
  "navigation": {
    "tabs": [
      {
        "tab": "User Documentation",
        "icon": "book",
        "groups": [
          {
            "group": "Getting Started",
            "pages": [{ "title": "Introduction", "path": "docs/introduction" }]
          }
        ]
      }
    ]
  }
}
```

The JSON renders in a syntax-highlighted block at the bottom of the page, with
**Copy** and **Download**. `highlightJson` builds React nodes rather than injecting
HTML, and emits everything between matches verbatim — verified byte-identical over
a 201KB config.

---

## Reference

### Files, in pipeline order

| File | Role |
|---|---|
| [app/fetch-pages-links/page.tsx](../app/fetch-pages-links/page.tsx) | form, tree renderer, JSON panel |
| [app/fetch-pages-links/types.ts](../app/fetch-pages-links/types.ts) | request/response contract |
| [app/api/fetch-pages-links/route.ts](../app/api/fetch-pages-links/route.ts) | POST handler, tab fan-out, empty-tab drop |
| [src/utils/network.ts](../src/utils/network.ts) | step 1 — fetch with retry |
| [src/pipeline/root.ts](../src/pipeline/root.ts) | step 2 — HTML → HAST |
| [src/utils/detectFramework.ts](../src/utils/detectFramework.ts) | step 3 — vendor |
| [src/tabs/retrieve.ts](../src/tabs/retrieve.ts) | step 4 — tab bar |
| [src/pipeline/site.ts](../src/pipeline/site.ts) | steps 5–9 for one tab |
| [src/nav/root.ts](../src/nav/root.ts) | step 5 — sidebar element |
| [src/nav/retrieve.ts](../src/nav/retrieve.ts) · [listItems.ts](../src/nav/listItems.ts) | step 6a — sidebar walk |
| [src/nav/list.ts](../src/nav/list.ts) | step 6b — paginated-list fallback |
| [src/nav/iterate.ts](../src/nav/iterate.ts) | step 7 — flatten |
| [src/pipeline/group.ts](../src/pipeline/group.ts) · [page.ts](../src/pipeline/page.ts) | step 8 — fetch and convert |
| [src/output/documentationJson.ts](../src/output/documentationJson.ts) | final — Documentation.AI config |

### Constants

[src/constants.ts](../src/constants.ts)

| Name | Value | Meaning |
|---|---|---|
| `CHUNK_SIZE` | 16 | pages fetched concurrently per chunk in step 8 |
| `MAX_LIST_PAGES` | 25 | cap on the paginated-list walk |
| `OVERVIEW_PAGE_SLUG` | `/clone_overview` | temporary marker for a group's landing page |

### ReadMe page types

| `<main>` class | What it is | Handled by |
|---|---|---|
| `rm-Guides` | a docs page with a sidebar | step 6a |
| `rm-ReferenceMain` | API reference with a sidebar | step 6a |
| `rm-Changelog`, `rm-Discuss` | paginated list | step 6b |
| `rm-Recipes` | client-rendered list — no server-side entries | nothing; tab is dropped |
| `rm-LandingPage` | marketing page, links into other tabs | declined by 6c |
| `rm-CustomPage` | navigation hub at `/page/<slug>` | declined by 6c |

### URL shapes to expect

The module is **not** always the first path segment:

| Shape | Example |
|---|---|
| plain | `/docs/introduction` |
| version prefix | `/v4.0/docs/getting-started` (Flutterwave) |
| project prefix | `/onetrust/docs/…`, `/payments/docs/…` (OneTrust, Modern Treasury) |

Also worth knowing: ReadMe serves slugs **case-insensitively**, so
`/docs/Quickstart` and `/docs/quickstart` are the same page. Migrating both
produces a duplicate — and two files on a case-sensitive filesystem.

---

## Known gaps

Verified but not implemented:

- **Landing-page prose is not captured.** Three of four landing pages carry real
  copy in `ssr-props → context.project.landing_bottom` — Capillary 710 chars,
  Lithic 2,101, Pennylane ~1,450 including a v1-vs-v2 API note. Dropping the tab is
  right for *navigation*, but that content has no home yet.
- **No coverage check.** Diffing landing-page links against the union of tab slugs
  would surface genuinely unlisted pages, like Lithic's `transaction-webhooks`.
- **Concurrent requests can corrupt each other** via the `framework` singleton
  (see step 3).
- **Version selectors are invisible.** ReadMe renders them as
  `<option data-url="/v2.0.0/docs">`, and an anchor-based walk cannot see them.
- **A stray `console.log(urlObj)`** sits at
  [route.ts:78](../app/api/fetch-pages-links/route.ts#L78).
