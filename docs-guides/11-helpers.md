---
title: "Helpers — every file in utils and types"
description: "A reference for the small shared modules, what each one is for, and which are load-bearing."
---

## What this covers

Every file in [`src/utils/`](../src/utils/) and [`src/types/`](../src/types/), plus
[`src/constants.ts`](../src/constants.ts). Most are a few lines. Some are load-bearing in ways that
are not obvious from their size.

## Tree helpers

These wrap `unist-util-visit` patterns that repeat across the vendor selectors.

### [`firstChild.ts`](../src/utils/firstChild.ts)

```ts
export function findFirstChild(node: Element, tagName: string): Element | undefined
```

First **descendant** with a tag name, in document order — not a direct child.

That distinction matters twice. It is *required*, because a sidebar `<li>` buries its anchor under
several `<div>` and `<span>` layers. It is also the trap [step 6](06-walk-sidebar.md) works around:
called on a `<section>`, it happily reaches into the section's child pages and returns the first
one's anchor.

### [`text.ts`](../src/utils/text.ts)

```ts
export function getText(element: Element | undefined): string
```

All text under an element, trimmed, with `<svg>` subtrees skipped.

The skip is why group names come out as "Entities Management" rather than carrying icon glyph text.

### [`className.ts`](../src/utils/className.ts)

`hasClassName(node, name)` and `findByClassName(node, name)`.

HAST stores `class="a b c"` as the **array** `["a", "b", "c"]`, never a string. Every class check
needs an `Array.isArray` guard first, which is what these encapsulate.

### [`intersection.ts`](../src/utils/intersection.ts)

Set intersection, accepting arrays or Sets. Used by [step 5](05-find-sidebar.md) so a vendor can
match **any of several** class names through one code path.

### [`title.ts`](../src/utils/title.ts)

- `findTitle(node, { delete })` — concatenated text, optionally splicing the text nodes out as it
  goes. The nav walk always passes `delete: false`; the `true` path exists for the MDX stage, where a
  title is lifted out of content that will be rendered afterwards.
- `getTitleFromLink(url)` — `/api/get-user` becomes "Get User". The fallback when a link has no text.

## String helpers

### [`strings.ts`](../src/utils/strings.ts)

| Function | Purpose |
|----------|---------|
| `removeTrailingSlash` | Normalising before comparison — used heavily in the partition |
| `removeLeadingSlash` | Turning `/docs/x` into the slug `docs/x` |
| `optionallyAddLeadingSlash` | Normalising a user-supplied `--filter` |
| `convertStrToTitle` | `get-started` or `get_started` becomes "Get Started" |

Trailing-slash normalisation is what makes `removeTrailingSlash(link.toString()) === origin` a
reliable test for "this is the bare root URL" in [step 7](07-flatten-and-partition.md).

### [`reservedNames.ts`](../src/utils/reservedNames.ts)

`INDEX_NAMES` and `iterateThroughReservedNames`. Solves the "the root URL has no pathname, so it has
no filename" problem. See [step 7](07-flatten-and-partition.md).

Returns `""` when every name is taken — the caller treats that as a page to prune.

### [`append.ts`](../src/utils/append.ts)

```ts
export function dedupedAppend<T>(item: T, arr: T[], prepend?: boolean): T[]
```

Used once, in [step 6](06-walk-sidebar.md), with `prepend: true` — so a group's landing page is
always its first page.

## Infrastructure

### [`network.ts`](../src/utils/network.ts) and [`backoff.ts`](../src/utils/backoff.ts)

See [step 1](01-fetch-pages.md).

### [`detectFramework.ts`](../src/utils/detectFramework.ts)

See [step 3](03-detect-vendor.md). Exports the mutable `framework` singleton and `resetFramework()`
for tests.

### [`intoChunks.ts`](../src/utils/intoChunks.ts)

A generator yielding fixed-size batches. The entire concurrency control for
[step 8](08-fetch-pool.md).

### [`file.ts`](../src/utils/file.ts)

`write`, `toFilename`, `createFilename`, `writeRawPage`. `createFilename` turns a URL into a path,
mapping a trailing `/` to `index`.

Only the CLI reaches this — the API route never passes `outDir`.

### [`log.ts`](../src/utils/log.ts)

Coloured console output with a status heuristic: a message containing "fail" or "error" is logged as
an error, "success" or "written" as a success.

The heuristic has a bite. A summary line reading `0 failed` contains "fail" and gets logged red —
which is why [`src/cli.ts`](../src/cli.ts) passes an explicit `"info"` status for that line. Pass the
status explicitly whenever the wording could be misread.

`setLogsEnabled(false)` is what the API route uses to keep a web request from spamming the server
log.

### [`errors.ts`](../src/utils/errors.ts)

- `getErrorMessage(error)` — returns `": message"` for an `Error`, `""` otherwise. Designed to be
  concatenated: `` `Failed to fetch${getErrorMessage(error)}` ``.
- `logErrorResults(action, results)` — counts and prints the failures in a result array.

## Types

### [`types/result.ts`](../src/types/result.ts)

```ts
export type Result<T> =
  | { success: true; data?: T }
  | { success: false; message: string; data?: T };
```

`data` on the failure branch is deliberate — [step 9d](09-repair-navigation.md) needs the URL of a
failed page to prune it.

`PageResultData` is `[originalUrl, resolvedSlug]`.

### [`types/nav.ts`](../src/types/nav.ts)

```ts
export type NavigationEntry = string | { group: string; pages: NavigationEntry[] };
```

The recursive shape produced by [step 6](06-walk-sidebar.md). Also `Tab`, `DocsConfig` and
`DiscoveryReport`.

Upstream imports these from `@mintlify/models`; they are declared locally so the project has no
Mintlify dependency.

### [`types/framework.ts`](../src/types/framework.ts)

`docVendors` holds what is implemented; `recognisedButUnsupported` holds what can be identified but
not scraped. Adding a vendor means moving its name from the second list to the first.

## [`constants.ts`](../src/constants.ts)

| Constant | Purpose |
|----------|---------|
| `OVERVIEW_PAGE_SLUG` | The landing-page marker — see [step 6](06-walk-sidebar.md) |
| `CHUNK_SIZE` | Fetch concurrency, 16 |
| `NAV_FAILURE_MSG`, `CONTENT_FAILURE_MSG` | The two "selector found nothing" messages |
| `FINAL_SUCCESS_MESSAGE` | CLI closer |

The two failure messages name the selector that failed, so a vendor change reports something
actionable rather than "not found".

## Related

- [Step 6 — Walk the sidebar](06-walk-sidebar.md) — the heaviest consumer of the tree helpers
- [`tests/nav.test.ts`](../tests/nav.test.ts)
