# mintlify-clone

A port of how [`@mintlify/scraping`](https://www.npmjs.com/package/@mintlify/scraping) discovers
documentation pages, rebuilt as a Next.js 16 app. **ReadMe sites only**.

Two stages, and they are independent:

- **discover** — walk the sidebar for the page list and the navigation structure.
- **harvest** — fetch each page's *authored* markdown and freeze it as a component-annotated
  intermediate representation, before any conversion happens. See
  [Harvesting](#harvesting-source-markdown-into-a-component-ir).

## The idea

It does not crawl. No sitemap, no BFS, no `llms.txt`, no link-following.

It fetches **one** page, finds the **sidebar element** in the DOM, and walks its `<li>` tree. That
tree *is* the complete page list and the navigation structure at the same time — so a single parse
yields both "which URLs exist" and "what `docs.json` should look like".

## Usage

```bash
npm install

# CLI — writes output/docs.json and output/discovery-report.json
npm run discover -- https://docs.capillarytech.com/docs --no-fetch

# ...and fetch each page's raw HTML into output/html/
npm run discover -- https://docs.capillarytech.com/docs

# only pages under a path
npm run discover -- https://docs.capillarytech.com/docs --filter /docs/loyalty-settings-2

# web UI + JSON API
npm run dev     # http://localhost:3000
                #   /                    full discovery
                #   /fetch-pages-links   rebuild the sidebar
                #   /harvest             source markdown next to the components found in it
```

```bash
curl -X POST http://localhost:3000/api/discover \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://docs.capillarytech.com/docs","skipFetch":true}'
```

CLI flags: `--filter <path>`, `--out <dir>` (default `./output`), `--no-fetch`.

## The pipeline

Each step is one file, so it can be read or replaced in isolation. **[`docs-guides/`](docs-guides/)
has one guide per step** — what the files do, the decisions inside them, and the traps.

| # | Step | File |
|---|------|------|
| 1 | Fetch entry HTML (backoff, browser headers) | [src/utils/network.ts](src/utils/network.ts) |
| 2 | HTML → HAST | [src/pipeline/root.ts](src/pipeline/root.ts) |
| 3 | Detect the vendor from `<meta>` tags | [src/utils/detectFramework.ts](src/utils/detectFramework.ts) |
| 4 | Find top-level tabs; scrape each as its own site | [src/tabs/retrieve.ts](src/tabs/retrieve.ts), [src/pipeline/tabs.ts](src/pipeline/tabs.ts) |
| 5 | Find the sidebar root element | [src/nav/root.ts](src/nav/root.ts) |
| 6 | Walk the `<li>` tree into a nav tree | [src/nav/retrieve.ts](src/nav/retrieve.ts), [src/nav/listItems.ts](src/nav/listItems.ts) |
| 7 | Flatten to URLs, partition internal/external/root | [src/nav/iterate.ts](src/nav/iterate.ts), [src/pipeline/site.ts](src/pipeline/site.ts) |
| 8 | Fetch page bodies, 16 at a time | [src/pipeline/group.ts](src/pipeline/group.ts), [src/pipeline/page.ts](src/pipeline/page.ts) |
| 9 | Prune failed paths, collapse empty groups | [src/pipeline/site.ts](src/pipeline/site.ts) |

Guides: [01](docs-guides/01-fetch-pages.md) · [02](docs-guides/02-parse-html.md) ·
[03](docs-guides/03-detect-vendor.md) · [04](docs-guides/04-find-tabs.md) ·
[05](docs-guides/05-find-sidebar.md) · [06](docs-guides/06-walk-sidebar.md) ·
[07](docs-guides/07-flatten-and-partition.md) · [08](docs-guides/08-fetch-pool.md) ·
[09](docs-guides/09-repair-navigation.md) · [10](docs-guides/10-entry-points.md) ·
[11](docs-guides/11-helpers.md)

Step 6 is the only interesting one. `retrieveNavItems` and `processListItem` are mutually recursive,
and the branch that decides everything is `findFirstChild(li, 'ul')`: no nested list means a leaf
page, a nested list means a group plus a recursive call.

### The two node shapes

Conflating these is the classic way to get a doubled nav tree:

```html
<section class="rm-Sidebar-section">      <!-- a category: heading + list.     -->
  <button class="rm-Sidebar-category">    <!-- NO page of its own; this is a     -->
  <ul>…</ul>                              <!-- collapse toggle, not a link.      -->
</section>

<li>                                      <!-- a page that may also be a parent. -->
  <a href="/docs/x">                      <!-- its href IS a page.               -->
  <ul class="subpages">…</ul>
</li>
```

## Harvesting source markdown into a component IR

Discovery answers *which pages exist*. Harvesting answers *what is on them* — and it stops one step
short of converting, on purpose.

```bash
# whole site, page list from llms.txt
npm run harvest -- https://docs.capillarytech.com

# a slice, while you iterate
npm run harvest -- https://docs.capillarytech.com --filter docs/loyalty --limit 25

# one page
npm run harvest -- https://docs.capillarytech.com/docs/create-a-reward --page

# or take the page list from a discovery run instead of llms.txt
npm run harvest -- --from-report output/discovery-report.json
```

Flags: `--out <dir>` (default `./output/harvest`), `--filter <slug-prefix>`, `--limit <n>`,
`--concurrency <n>` (default 6), `--delay <ms>` (default 300), `--refetch`, `--page`.

### In the browser

`npm run dev` → **[/harvest](http://localhost:3000/harvest)** runs the same stage and shows both
halves side by side: the **source markdown on the left**, the **blocks identified in it on the
right**. Selecting a block highlights the exact source lines it came from and scrolls them into view
— the IR is only worth trusting if you can see the text behind it.

Each block shows its component, its attributes, the `<Source>` → `<Target>` mapping, its status
(`direct` / `transform` / `drop` / **`manual`**), any gotchas flagged on it, and the raw JSON on
demand. Above the split are the run stats, the inventory table, and a page picker that marks pages
which needed the lenient parser.

```bash
curl -X POST http://localhost:3000/api/harvest \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://docs.capillarytech.com","filter":"docs/loyalty","limit":8}'

# or one page, by its own URL
curl -X POST http://localhost:3000/api/harvest \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://docs.capillarytech.com/docs/create-a-reward","single":true}'
```

The route runs the harvest **entirely in memory** — a browser request writes nothing to disk and
reads no cache. It returns every page's raw markdown alongside its IR (~30 KB a page), so it is
capped at 40 pages a request, 8 by default. Whole sites are the CLI's job; it caches.

### Why not reuse the HTML path

ReadMe serves the markdown a writer actually typed at **`<page-url>.md`**, and honours
`Accept: text/markdown` on the plain URL. On `docs/loyalty-promotions` that is 3 KB against 950 KB of
rendered HTML — and every component is still spelled out as `<Callout theme="info">` rather than
having to be inferred back out of a `<blockquote class="callout callout_info">`.

So the harvest reads components instead of reconstructing them. Discovery keeps using the HTML,
because the sidebar only exists there.

### What it writes

```
output/harvest/
  raw/<slug>.md        the source, byte for byte — the cache, and the thing to diff a conversion against
  ir/<slug>.json       the block IR for one page
  index.json           every page: title, kind, parse mode, per-page component counts
  inventory.json       the site-wide census
  inventory.md         the same census, readable
```

A page is an ordered list of **blocks**. Each one names its component, its attributes, the exact
source lines it came from, its verbatim `raw` text, and where it lands on Documentation.AI:

```jsonc
{
  "i": 3, "kind": "callout", "syntax": "jsx", "component": "Callout",
  "attrs": { "icon": "📘", "theme": "info" },
  "lines": [11, 15],
  "raw": "<Callout icon=\"📘\" theme=\"info\">\n  **Before you begin**\n…",
  "target": { "component": "Callout", "status": "direct", "attrs": { "kind": "info" } }
}
```

`target.status` is the only field you have to read: `direct` (rename the tag), `transform` (needs
restructuring), `drop` (decided — `<br />`, ReadMe's llms.txt preamble), `manual` (**no equivalent
exists, you decide**). The mapping behind it is one table,
[src/harvest/mapping.ts](src/harvest/mapping.ts), derived from
[Components-Information/readme-components-info.md](Components-Information/readme-components-info.md)
and the Documentation.AI component set. A component missing from it surfaces as `manual` rather than
being silently dropped.

`inventory.md` is what makes a converter plannable — every construct on the site, how often, on how
many pages, what it becomes, and a *Flagged for repair* section that pins the known ReadMe gotchas to
exact block references (`width="smart"`, redundant `className="border"`, missing `alt`, unclosed
`<br>`, `theme="warning"`).

### Two parsers, on purpose

Tier 1 is the strict MDX parser, which hands back `<Callout>` with its attributes already parsed.
ReadMe's engine also tolerates a lenient dialect it calls **MDXish** (unclosed `<br>`, string
`style="…"`), and those pages fail tier 1 — so they fall back to plain GFM, where JSX arrives as raw
HTML and the tag name is recovered by hand. Markdown ends a raw-HTML run at the first blank line, so
a `<Table>` would arrive in pieces; `mergeUnclosedJsx` reassembles it, which is what keeps both tiers
describing the same page the same way.

The tier is recorded per page as `parseMode`. A fallback is a *fact about the page* — its syntax
needs repairing before Documentation.AI will compile it — not a silent degradation.

### Two page lists, and why both

`llms.txt` lists 1,508 Capillary pages; the sidebar walk finds 889. The walk deliberately skips API
reference endpoints (upstream generates those from the OpenAPI spec) and `llms.txt` does not. They
answer different questions, so the walk owns the **navigation structure** and `llms.txt` owns the
**page list**.

### Batching and rate limits

The fetch pool is 6 wide with a pause between chunks, not the 16 step 8 uses — the markdown endpoint
starts returning 429 part way through a wider run. 429 and 5xx retry on their own slower schedule and
honour `Retry-After`; a 404 fails immediately rather than burning retries.

Runs are resumable: a page whose `raw/<slug>.md` is already cached is not refetched (`--refetch`
overrides), and the census is rebuilt from every IR file on disk, not just the current batch — so
harvesting a site in slices still yields one whole-site inventory.

## Vendor selectors

Only ReadMe is implemented. To add another vendor, add its cases to the `switch` in
[src/nav/root.ts](src/nav/root.ts), [src/nav/retrieve.ts](src/nav/retrieve.ts),
[src/pipeline/page.ts](src/pipeline/page.ts) and [src/tabs/retrieve.ts](src/tabs/retrieve.ts) —
`detectFramework` already recognises GitBook and Docusaurus and fails with a message pointing there.

| | ReadMe | GitBook | Docusaurus |
|---|---|---|---|
| detect | `<meta name="readme-deploy">` | `preconnect` to `api.gitbook.com` | `<meta name="generator" content="…docusaurus…">` |
| sidebar | `nav.rm-Sidebar` | `aside#table-of-contents` | `nav.menu` |
| tabs | `header.rm-Header` | `nav#sections` | `nav.navbar` |
| content | `article.rm-Article` | `main` | `article` |
| headless browser | not needed | required | required |

GitBook and Docusaurus render their sidebars client-side and start collapsed, so they need Puppeteer
plus scripted clicking to expand every node. ReadMe ships the whole sidebar in the initial HTML,
which is why this build has no browser dependency at all.

## Deviations from upstream

Behavioural differences, all deliberate:

- **Section headings.** Upstream looks for the category heading in an `<h2>`. ReadMe now renders it
  as `<button class="rm-Sidebar-category">`, so that lookup finds nothing and each section silently
  borrows its first child link's title *and* href — every category ends up named after its first
  page, and that page appears twice. Sections are handled separately here
  ([src/nav/retrieve.ts](src/nav/retrieve.ts) `processSection`).
- **Empty-group pruning.** Upstream calls `remove()` on the traversal root when a filter matches
  nothing, which throws inside `neotraverse`. Guarded with `isRoot`.
- **Chunk indexing.** Upstream resolves `rootPaths[index]` with the chunk-local index, which
  misaligns past 16 items. This uses a global offset.
- **Auth links.** `.rm-Header-right` holds login controls next to the tab overflow, so upstream
  picks up `/login?redirect_uri=…` as a tab and burns a guaranteed 404 on it. Filtered out.
- **`htmlToHast`.** Upstream chains two cleanup plugins then calls `.parse()`, which never runs
  transformers — so they are dead there. The cleanup is done directly.
- **`detectFramework`** returns `false` rather than calling `process.exit(1)`, so it is safe to call
  from a route handler.
- **Site name** comes from `og:site_name`, falling back to `<title>` (which on ReadMe is the *page*
  title, not the site's).

## Kept as-is

- **ReadMe API endpoint links are skipped.** Any sidebar link containing `span.rm-APIMethod` (the
  GET/POST chip) is dropped, because upstream generates those pages from the OpenAPI spec instead.
  On Capillary's docs this is the difference between 1022 discovered pages and several hundred more.
  If you want them, delete the `isApiReferenceLink` check in
  [src/nav/listItems.ts](src/nav/listItems.ts).
- **Category names keep their source casing** (`GETTING STARTED`), as upstream does.
- Pages cross-listed in two sidebar categories appear twice in the nav tree, as they do on the site.

## Verified against

`https://docs.capillarytech.com/docs` — 5 tabs found, 2 with sidebars (User Documentation, API
Documentation), **1022 pages discovered**, 13 top-level groups, 0 failures. The other three tabs
(`/`, `/page/developerdocumentation`, `/page/product-release-notes`) are ReadMe landing pages with
no sidebar and are reported as skipped.

The fetch stage (step 8) was exercised with `--filter`, not across all 1022 pages.

## Tests

```bash
npm test        # 48 tests: vendor detection, the sidebar walk, tab discovery, and the harvest IR
npm run typecheck
```

`tests/harvest.test.ts` runs a page shaped like the ones ReadMe serves through the whole IR builder —
frontmatter split, line offsets, both callout spellings, image gotchas, table extraction, the
consecutive-fence CodeTabs run — plus an MDXish page that has to take the fallback parser.
