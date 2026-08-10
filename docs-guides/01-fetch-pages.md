---
title: "Step 1 — Fetch pages"
description: "How HTML is pulled over the network, why there is no headless browser, and where retries happen."
---

## What this step does

Turns a URL into an HTML string. That is all. Every other step in the pipeline consumes the output
of this one.

## Files

| File | Role |
|------|------|
| [`src/utils/network.ts`](../src/utils/network.ts) | The headers, the fetch, the error wrapping |
| [`src/utils/backoff.ts`](../src/utils/backoff.ts) | Retry with exponential backoff and jitter |

## The code

`fetchPageHtml` is the only function the rest of the codebase calls:

```ts
export async function fetchPageHtml(url: string | URL): Promise<string> {
  try {
    const res = await exponentialBackoff(() => fetchPageResponse(url));
    if (res) return res;
    throw new Error("An unknown error occurred.");
  } catch (error) {
    throw new Error(`Error retrieving HTML for ${url.toString()}${getErrorMessage(error)}`);
  }
}
```

Underneath, `fetchPageResponse` is a plain `fetch` that treats a non-2xx status as a throw, so the
backoff wrapper retries it:

```ts
const res = await fetch(url, { headers, redirect: "follow" });
if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
return await res.text();
```

## Why there is no headless browser

This is the biggest structural decision in the project.

ReadMe renders its full sidebar into the initial HTML response. You can `curl` a ReadMe docs page and
every nav link is already there. So a plain `fetch` is sufficient, and the project has no Puppeteer
dependency, no browser download, and no per-page browser tab.

The other two vendors are not so lucky:

| Vendor | Sidebar in initial HTML? | What it needs |
|--------|--------------------------|---------------|
| ReadMe | Yes | `fetch` |
| Docusaurus | No — client-rendered, categories collapsed | Browser, then click every `.menu__link--sublist` recursively |
| GitBook | No — client-rendered, collapsed | Browser, then up to 10 rounds of clicking expanders in `#table-of-contents`, waiting for `opacity: 1; height: auto` between rounds |

If you add either vendor, this file is where the browser path goes, and `fetchPageHtml` grows a
`browser?: Browser` second parameter — that is exactly how upstream structures it.

Collapsed sidebar items are the single biggest source of silently missing pages. A run that "works"
but returns a third of the expected pages is almost always this.

## The headers

```ts
const headers = {
  "Accept-Language": "en-US,en;q=0.9",
  Accept: "text/html,application/xhtml+xml,...",
  "User-Agent": "Mozilla/5.0 (Macintosh; ...) Chrome/123.0.0.0 Safari/537.36",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
} as const;
```

These exist to look like a browser. Docs hosts sit behind CDNs that serve different markup, a
challenge page, or a 403 to a bare `node-fetch` user agent. Upstream goes further and rotates
between five Chrome version strings; a single fixed string has been enough here.

## Retries

`exponentialBackoff` retries 4 times by default, starting at 400 ms and doubling, capped at 8 s:

```ts
const delay = Math.min(baseDelayMs * 2 ** attempt, maxDelayMs);
const jitter = delay * 0.25 * Math.random();
```

The jitter matters. Step 8 fires 16 requests at once; without it, a chunk that hits a rate limit
retries in perfect lockstep and hits the same limit again.

## Gotchas

- **`fetchPageHtml` throws.** It is the one place in the pipeline that does. Every caller is inside a
  `try`/`catch` that converts the throw into a failed `Result` — see [step 8](08-fetch-pool.md).
- **A 404 costs five requests**, not one, because backoff retries it. If you point the scraper at a
  site with many dead sidebar links, that is where the time goes. Consider not retrying 4xx.
- **No rate limiting.** 16 concurrent requests with no delay between chunks. Fine for the sites tested
  so far; add a delay here if you get throttled.
- **No caching.** Re-running a discovery re-fetches everything.

## Related

- [Step 8 — Fetch the pages](08-fetch-pool.md) — the only heavy consumer of this step
- [Step 3 — Detect the vendor](03-detect-vendor.md) — what decides whether a browser would be needed
