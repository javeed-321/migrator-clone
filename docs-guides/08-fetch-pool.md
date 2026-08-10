---
title: "Step 8 — Fetch the pages"
description: "The chunked concurrency pool, why errors are returned instead of thrown, and where MDX conversion would go."
---

## What this step does

Fetches every internal and root page, 16 at a time, validates each one has a content body, and
optionally writes the raw HTML to disk.

## Files

| File | Role |
|------|------|
| [`src/pipeline/group.ts`](../src/pipeline/group.ts) | `scrapePageGroup` — the concurrency pool |
| [`src/pipeline/page.ts`](../src/pipeline/page.ts) | `scrapePage` — validate one page, resolve its slug |
| [`src/utils/intoChunks.ts`](../src/utils/intoChunks.ts) | The batching generator |
| [`src/utils/file.ts`](../src/utils/file.ts) | Writing HTML to disk |

## The concurrency model

```ts
for (const chunk of intoChunks(navGroup)) {
  const res = await Promise.all(chunk.map(async (url, chunkIndex) => { … }));
  allResults.push(...res);
}
```

Chunks run **sequentially**; the 16 pages inside a chunk run **concurrently**. So the pool never
exceeds 16 in-flight requests per call, and a chunk cannot start until the slowest page in the
previous chunk finishes.

That head-of-line blocking is a real cost — one slow page stalls 15 idle slots — but it keeps the
implementation to four lines with no queue, no semaphore, and no dependency.

`CHUNK_SIZE` lives in [`src/constants.ts`](../src/constants.ts).

Remember [step 4](04-find-tabs.md) runs tabs in parallel, so peak concurrency is
`number of tabs × 16`.

## Errors are returned, never thrown

```ts
} catch (error) {
  return {
    success: false as const,
    message: `We encountered an error when scraping ${url}${getErrorMessage(error)}`,
    data: [url.toString(), ""] as PageResultData,
  };
}
```

This is the property that makes a 1000-page run survivable. One 404 produces one failed `Result`; the
other 999 pages are unaffected.

Note that `data` is populated **even on failure**. That is not incidental — [step 9d](09-repair-navigation.md)
reads `result.data[0]` to know which path to prune from the nav tree. A failure with no `data` would
leave a dead link in the output.

## The result tuple

Every page result carries `[originalUrl, resolvedSlug]`:

| Case | Tuple |
|------|-------|
| Normal page | `["https://host/docs/x", "docs/x"]` |
| Root link | `["", "home"]` — the pathname, and its reserved name |
| External link | `["https://other.com/x", "x"]` — a generated slug |
| Failure | `["https://host/docs/x", ""]` |

Step 9 turns the successful ones into replacement maps and the failed ones into a prune list.

## The global index

```ts
for (const chunk of intoChunks(navGroup)) {
  const chunkOffset = offset;
  offset += chunk.length;

  await Promise.all(chunk.map(async (url, chunkIndex) => {
    const index = chunkOffset + chunkIndex;
    …  opts.rootPaths[index]
  }));
}
```

`chunk.map` gives a **chunk-local** index — 0 to 15, resetting every chunk. But `rootPaths` from
[step 7](07-flatten-and-partition.md) is aligned to the full list.

Upstream indexes with the chunk-local value, so past 16 items every root path and external-link
fallback name is wrong. Tracking a global offset fixes it. In practice there are rarely more than 16
root links, which is why the bug survives upstream.

## External links are not fetched

```ts
if (opts.externalLinks) {
  let externalLinkTitle =
    convertStrToTitle(url.pathname.split("/").filter(Boolean).at(-1) ?? url.pathname) ||
    `external-link-${index}`;
  externalLinkTitle = externalLinkTitle.replace(/\s+/g, "-").toLowerCase();
  return { success: true, data: [url.toString(), externalLinkTitle] };
}
```

They only need a stable local slug so the nav tree can stop pointing off-site. No request is made.

## `scrapePage` — the validation seam

```ts
const hast = htmlToHast(html);
const content = retrieveRootContent(hast);
if (!content) {
  return { success: false, message: `${urlStr}: ${CONTENT_FAILURE_MSG}`, data: [urlStr, ""] };
}
```

`retrieveRootContent` uses the same tag-plus-class pattern as [step 5](05-find-sidebar.md):

| Vendor | Content root |
|--------|--------------|
| ReadMe | `article.rm-Article` |
| GitBook | `main` |
| Docusaurus | `article`, or `div.index-page` |

A page whose body cannot be found counts as a failure and is pruned. That catches soft-404s — pages
that return HTTP 200 with an error body.

**This is where HTML to MDX conversion goes.** Upstream's `scrapePage` continues from this exact
point: it pipes `content` through roughly forty `unified` plugins into MDAST, converts Mintlify
components, downloads images, extracts a title and description, and writes an `.mdx` file. This build
stops at "the content element exists".

## Writing to disk

```ts
if (result.success && opts.outDir) {
  writeRawPage(opts.outDir, opts.rootPaths?.[index] ?? url, html);
}
```

Raw HTML only, at `output/html/<slug>.html`. Controlled by `outDir` — the CLI sets it, the API route
never does, since writing to disk from a web request is not something you want.

## The overview marker

```ts
if (url.toString().endsWith(OVERVIEW_PAGE_SLUG)) {
  url = new URL(url.toString().replace(OVERVIEW_PAGE_SLUG, ""));
}
```

The marker from [step 6](06-walk-sidebar.md) is a nav-tree annotation, not part of a real URL, so it
is stripped before fetching. Upstream also carries a boolean out of this branch into the MDX
frontmatter title; with no frontmatter here, the marker is simply dropped.

## Gotchas

- **`skipFetch` bypasses this step entirely** — `internalResults` and `rootResults` are `[]`. Every
  page is therefore treated as successful, so nothing is pruned in step 9d. Discovery-only output is
  optimistic by construction: it lists what the sidebar claims, unverified.
- **No rate limiting or delay between chunks.** See [step 1](01-fetch-pages.md).
- **The outer `try`/`catch` around the chunk loop logs and returns partial results** rather than
  throwing, so a catastrophic failure still yields whatever completed.
- **Each page is parsed to HAST just to check one element exists.** Wasteful if you only want
  discovery — that is what `--no-fetch` is for.

## Related

- [Step 7 — Flatten and partition](07-flatten-and-partition.md) — produces the three buckets
- [Step 9 — Repair the navigation](09-repair-navigation.md) — consumes these results
- [Step 1 — Fetch pages](01-fetch-pages.md) — the underlying network call
