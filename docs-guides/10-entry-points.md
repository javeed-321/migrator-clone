---
title: "Entry points — library, CLI, API and UI"
description: "The four ways to run the pipeline and what each one adds on top of the shared core."
---

## What this covers

The pipeline itself has no opinion about how it is invoked. Four entry points wrap it, and all of
them funnel through the same `discover()` function.

## Files

| File | Entry point |
|------|-------------|
| [`src/index.ts`](../src/index.ts) | Library — `discover()` and the public re-exports |
| [`src/cli.ts`](../src/cli.ts) | Command line |
| [`app/api/discover/route.ts`](../app/api/discover/route.ts) | `POST /api/discover` |
| [`app/page.tsx`](../app/page.tsx) | The browser UI |

## `discover()` — the shared core

```ts
export async function discover(url: string, opts: DiscoverOptions = {}) {
  const urlObj = new URL(url);
  const html = await fetchPageHtml(urlObj);
  const result = await scrapeAllSiteTabs(html, urlObj, opts);
  if (!result.success || !result.data) return result;

  const name = getSiteTitle(htmlToHast(html)) || urlObj.hostname;
  return { success: true, data: { ...result.data, docsConfig: { …, name, navigation, tabs } } };
}
```

Steps 1 and 4, then the `docs.json` assembly. Options are `filter`, `outDir` and `skipFetch`.

### The site name

```ts
function getSiteTitle(hast: HastRoot): string {
  // <meta property="og:site_name"> first…
  // …falling back to <title>
}
```

`<title>` on a ReadMe page is the **page** title, not the site's — the Capillary docs entry page has
`<title>Introduction</title>`, which would put "Introduction" in `docs.json`. `og:site_name` carries
"Capillary Documentation", which is what you want.

## The CLI

```bash
npm run discover -- <url> [--filter /docs] [--out ./output] [--no-fetch]
```

A hand-rolled arg parser — no `yargs`, which is what upstream uses — then:

```ts
write(join(outDir, "docs.json"), JSON.stringify(docsConfig, undefined, 2));
write(join(outDir, "discovery-report.json"), JSON.stringify(report, undefined, 2));
```

Two artifacts:

| File | Contents |
|------|----------|
| `docs.json` | `$schema`, `name`, `navigation`, `tabs` — the publishable config |
| `discovery-report.json` | The audit trail: `discovered`, `internal`, `external`, `root`, `failed` |

Plus `output/html/<slug>.html` per page, unless `--no-fetch`.

`discovery-report.json` is the one to read when a page is missing. `discovered` is what the sidebar
claimed; the buckets show where each URL went.

The CLI exits `0` on success and `1` on failure, and is the only entry point that writes to disk.

## The API route

```ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;
```

Three route segment config exports, each load-bearing:

- **`runtime = "nodejs"`** — the pipeline uses `node:fs` and undici. It cannot run on edge.
- **`dynamic = "force-dynamic"`** — every request hits the network. Next 16 does not cache route
  handlers by default, but this makes the intent explicit and blocks prerendering at build time.
- **`maxDuration = 300`** — a full 1000-page fetch takes minutes.

The route never passes `outDir`, so a web request cannot write to the filesystem. It also disables
logging for the duration of the request:

```ts
setLogsEnabled(false);
try { … } finally { setLogsEnabled(true); }
```

Status codes: `400` for a malformed body or URL, `422` when discovery ran but found nothing usable,
`500` for an unexpected throw.

## The UI

A single client component that posts to the route and renders the result: a stat row, the navigation
tree as a recursive `<ul>`, the flat URL list, failures, and the generated `docs.json`.

`NavTree` mirrors the recursion in [step 6](06-walk-sidebar.md) — string renders as a slug, object
renders as a group name plus a recursive call.

"Discovery only" is checked by default, because the alternative fetches every page in the site from a
browser click.

## Choosing an entry point

| Use | When |
|-----|------|
| CLI | You want files on disk, or you are scripting a migration |
| API route | Another service needs the JSON |
| UI | Exploring a site, or checking a selector change by eye |
| `discover()` | You are importing this into another Node project |

## Gotchas

- **`discover()` throws if step 1 fails**, rather than returning a failed `Result` — a bad hostname
  or a dead site surfaces as an exception. Every caller wraps it.
- **The CLI's `--out` default is `./output`**, relative to the working directory, and it is
  gitignored.
- **`skipFetch` skews the report.** With no fetch, `failed` is always empty. See
  [step 8](08-fetch-pool.md).
- **`src/index.ts` re-exports every stage function**, so you can call `retrieveNavItems` or
  `scrapeSite` directly without reaching into subpaths.

## Related

- [Step 1 — Fetch pages](01-fetch-pages.md)
- [Step 4 — Find the tabs](04-find-tabs.md) — what `discover()` delegates to
