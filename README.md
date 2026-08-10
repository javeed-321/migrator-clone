# mintlify-clone

A port of how [`@mintlify/scraping`](https://www.npmjs.com/package/@mintlify/scraping) discovers
documentation pages, rebuilt as a Next.js 16 app. **ReadMe sites only**, and it stops at discovery +
fetch — there is no HTML→MDX conversion.

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
```

```bash
curl -X POST http://localhost:3000/api/discover \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://docs.capillarytech.com/docs","skipFetch":true}'
```

CLI flags: `--filter <path>`, `--out <dir>` (default `./output`), `--no-fetch`.

## The pipeline

Each step is one file, so it can be read or replaced in isolation.

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
npm test        # 14 tests over vendor detection, the sidebar walk, and tab discovery
npm run typecheck
```
