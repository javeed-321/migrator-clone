import { readFileSync } from "node:fs";

import { exponentialBackoff } from "../utils/backoff";
import { getErrorMessage } from "../utils/errors";
import { removeLeadingSlash, removeTrailingSlash } from "../utils/strings";
import type { PageRef } from "./types";

/**
 * ReadMe serves the *authored* markdown for any page at `<page-url>.md`, and
 * honours `Accept: text/markdown` on the plain URL as well. It is the same MDX
 * the writer typed — components intact — at roughly 1/300th the bytes of the
 * rendered HTML (3 KB against 950 KB on `docs/loyalty-promotions`).
 *
 * That is the whole reason this stage exists. The HTML path has to *infer* a
 * component back out of rendered markup; this one reads it as written.
 */
const headers = {
  Accept: "text/markdown, text/plain;q=0.9, */*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
} as const;

/** `https://host/docs/x` -> `https://host/docs/x.md`. Already-`.md` URLs pass through. */
export function toMarkdownUrl(url: string): string {
  const parsed = new URL(url);
  if (parsed.pathname.endsWith(".md")) return parsed.toString();
  parsed.pathname = removeTrailingSlash(parsed.pathname) + ".md";
  return parsed.toString();
}

/** The inverse — the URL a reader would visit. */
export function toPageUrl(url: string): string {
  const parsed = new URL(url);
  parsed.pathname = parsed.pathname.replace(/\.md$/, "");
  return parsed.toString();
}

/** `https://host/docs/create-a-reward.md` -> `docs/create-a-reward`. */
export function slugFromUrl(url: string): string {
  const pathname = new URL(url).pathname.replace(/\.md$/, "");
  return removeLeadingSlash(removeTrailingSlash(pathname)) || "index";
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * A 404 is final; a 429 is not. The generic `exponentialBackoff` treats them the
 * same and gives up after four tries around 400 ms apart, which on a 1,500-page
 * run means a burst of pages fails purely because they were unlucky in the
 * queue. This retries 429 (and 5xx) on its own, much slower schedule, honours
 * `Retry-After` when the server sends one, and does not waste retries on a 404.
 */
const RATE_LIMIT_RETRIES = 5;
const RATE_LIMIT_BASE_MS = 2000;

export async function fetchMarkdown(url: string): Promise<string> {
  const target = toMarkdownUrl(url);

  for (let attempt = 0; ; attempt++) {
    let res: Response;
    try {
      res = await fetch(target, { headers, redirect: "follow" });
    } catch (error) {
      if (attempt >= RATE_LIMIT_RETRIES) {
        throw new Error(`Failed to fetch markdown for ${target}${getErrorMessage(error)}`);
      }
      await sleep(RATE_LIMIT_BASE_MS * 2 ** attempt);
      continue;
    }

    if (res.status === 429 || res.status >= 500) {
      if (attempt >= RATE_LIMIT_RETRIES) {
        throw new Error(`Failed to fetch markdown for ${target}: ${res.status} ${res.statusText}`);
      }
      const retryAfter = Number(res.headers.get("retry-after"));
      const wait = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : RATE_LIMIT_BASE_MS * 2 ** attempt;
      // Jitter, so a chunk of parallel requests does not retry in lockstep.
      await sleep(wait + Math.random() * 500);
      continue;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch markdown for ${target}: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type") ?? "";
    const body = await res.text();
    // A ReadMe slug that does not exist answers 200 with the SPA shell, not a
    // 404 — so the content type is the only reliable "this page is real" check.
    if (!contentType.includes("markdown") && !contentType.includes("text/plain")) {
      throw new Error(
        `Failed to fetch markdown for ${target}: served ${contentType || "an unknown type"} instead of markdown`
      );
    }
    return body;
  }
}

/**
 * Page discovery from `llms.txt`.
 *
 * ReadMe publishes one at the site root listing every page as
 * `- [Title](https://host/docs/slug.md): description`, grouped under `##`
 * headings. On Capillary that is 1,508 pages against the 889 the sidebar walk
 * finds — the sidebar deliberately skips API-reference endpoints (they come from
 * the OpenAPI spec), and llms.txt does not.
 *
 * So the two sources answer different questions and both are kept: the sidebar
 * walk owns the *navigation structure*, llms.txt owns the *page list*.
 */
export function parseLlmsTxt(text: string): PageRef[] {
  const pages: PageRef[] = [];
  let section = "";

  for (const line of text.split("\n")) {
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading?.[1]) {
      section = heading[1];
      continue;
    }

    const entry = /^-\s+\[(.*?)\]\((\S+?)\)(?::\s*(.*))?$/.exec(line.trim());
    if (!entry) continue;

    const [, title = "", href = "", description = ""] = entry;
    let source: string;
    try {
      source = toMarkdownUrl(href);
    } catch {
      continue;
    }

    pages.push({
      title,
      description,
      source,
      url: toPageUrl(source),
      slug: slugFromUrl(source),
      section,
      kind: kindForSlug(slugFromUrl(source), section),
    });
  }

  return pages;
}

function kindForSlug(slug: string, section: string): PageRef["kind"] {
  if (slug.startsWith("reference/") || /api/i.test(section)) return "api";
  if (slug.startsWith("page/")) return "page";
  return "guide";
}

export async function fetchLlmsTxt(siteUrl: string): Promise<PageRef[]> {
  const root = new URL(siteUrl);
  root.pathname = "/llms.txt";
  root.search = "";

  const res = await exponentialBackoff(async () => {
    const response = await fetch(root.toString(), { headers, redirect: "follow" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.text();
  });

  return parseLlmsTxt(res);
}

/**
 * The other page-list source: a `discovery-report.json` from the existing
 * sidebar walk. Use it when you only want the pages that are actually reachable
 * from the nav, rather than everything llms.txt knows about.
 */
export function pagesFromDiscoveryReport(path: string): PageRef[] {
  const report = JSON.parse(readFileSync(path, "utf8")) as { internal?: string[]; site?: string };
  return (report.internal ?? []).map((url) => {
    const source = toMarkdownUrl(url);
    const slug = slugFromUrl(source);
    return {
      title: "",
      description: "",
      source,
      url: toPageUrl(source),
      slug,
      section: "",
      kind: kindForSlug(slug, ""),
    };
  });
}
