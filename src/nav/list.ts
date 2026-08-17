import type { Root as HastRoot, Element } from "hast";
import { visit, EXIT, CONTINUE } from "unist-util-visit";

import { MAX_LIST_PAGES } from "../constants";
import { htmlToHast } from "../pipeline/root";
import type { NavigationEntry } from "../types/nav";
import { hasClassName } from "../utils/className";
import { framework } from "../utils/detectFramework";
import { getErrorMessage } from "../utils/errors";
import { intoChunks } from "../utils/intoChunks";
import { log } from "../utils/log";
import { fetchPageHtml } from "../utils/network";
import { removeLeadingSlash, removeTrailingSlash } from "../utils/strings";
import { getText } from "../utils/text";
import { getTitleFromLink } from "../utils/title";

/**
 * Step 6, fallback path: build a nav tree from a paginated list page.
 *
 * Not every ReadMe tab renders a sidebar. Changelog and Discussions are
 * chronological lists — ten entries plus a "Next Page" control — so there is no
 * `nav.rm-Sidebar` for `retrieveNavItems` to walk and no hierarchy to recover.
 * On docs.readme.com that is three of the five tabs:
 *
 *   /main/docs       193 rm-Sidebar hits -> sidebar walk
 *   /main/reference  189 rm-Sidebar hits -> sidebar walk
 *   /main/changelog    0                 -> this file
 *   /main/discuss      0                 -> this file
 *   /main/recipes      0                 -> neither; its list is client-rendered
 *
 * The output is deliberately flat — one group holding every entry — because the
 * source has no nesting to preserve.
 *
 * `scrapeSite` only reaches this after `retrieveRootNavElement` returns
 * undefined, so the sidebar path is never affected.
 */

/**
 * List containers, by the stable `rm-` class ReadMe puts on the `<main>`.
 *
 * `rm-Recipes` is listed for completeness but yields nothing: its entries are
 * fetched client-side, so the initial HTML holds an empty shell. That is the
 * same reason GitBook and Docusaurus would need a headless browser.
 */
const LIST_ROOT_CLASSES = ["rm-Changelog", "rm-Discuss", "rm-Recipes"];

export type ListPage = {
  /** Entry slugs on this page, in document order, without a leading slash. */
  slugs: string[];
  /** The "Next Page" target, when the pagination control offers one. */
  next: URL | undefined;
  /** Total page count, read from the "1 of 22" counter when present. */
  totalPages: number | undefined;
};

/** `aria-label`, whichever casing the HAST property ends up in. */
function ariaLabel(node: Element): string {
  const value = node.properties?.ariaLabel ?? node.properties?.["aria-label"];
  return typeof value === "string" ? value : "";
}

/**
 * The element wrapping the list. Falls back to `<main>` so a module this build
 * has not seen still resolves to something narrower than the whole document —
 * scanning the full page would sweep up header and footer links.
 */
function findListRoot(rootNode: HastRoot): Element | undefined {
  let byClass: Element | undefined = undefined;
  let main: Element | undefined = undefined;

  visit(rootNode, "element", function (node) {
    if (LIST_ROOT_CLASSES.some((className) => hasClassName(node, className))) {
      byClass = node;
      return EXIT;
    }
    if (!main && node.tagName === "main") main = node;
    return CONTINUE;
  });

  return byClass ?? main;
}

/** The `nav.rm-Pagination` control, if the list has one. */
function findPagination(rootNode: HastRoot): Element | undefined {
  let element: Element | undefined = undefined;
  visit(rootNode, "element", function (node) {
    if (node.tagName === "nav" && hasClassName(node, "rm-Pagination")) {
      element = node;
      return EXIT;
    }
    return CONTINUE;
  });
  return element;
}

/**
 * Entry links: anchors under the list root pointing *below* the list's own
 * path. That prefix test is what separates real entries from the pagination
 * links, which stay at the list path and only vary by query string.
 */
function collectEntrySlugs(scope: Element, basePath: string): string[] {
  const slugs: string[] = [];
  const seen = new Set<string>();

  visit(scope, "element", function (node) {
    if (node.tagName !== "a") return CONTINUE;

    const href = node.properties?.href;
    if (typeof href !== "string" || !href.startsWith(basePath + "/")) return CONTINUE;

    const slug = removeLeadingSlash(removeTrailingSlash(href.split(/[?#]/)[0] ?? ""));
    if (!slug || seen.has(slug)) return CONTINUE;

    seen.add(slug);
    slugs.push(slug);
    return CONTINUE;
  });

  return slugs;
}

/**
 * One list page: its entries, its next-page link and the total page count.
 *
 * Pure — the caller does the fetching. `pageUrl` is what the relative hrefs and
 * the base-path test resolve against; for `?page=N` URLs the pathname is still
 * the list root, which is exactly what the prefix test needs.
 */
export function retrieveListPage(rootNode: HastRoot, pageUrl: URL): ListPage | undefined {
  const root = findListRoot(rootNode);
  if (!root) return undefined;

  const basePath = removeTrailingSlash(pageUrl.pathname);
  const slugs = collectEntrySlugs(root, basePath);

  const pagination = findPagination(rootNode);
  let next: URL | undefined = undefined;
  let totalPages: number | undefined = undefined;

  if (pagination) {
    // "1 of 22". Read from the rendered text rather than the class, because the
    // class carries a build hash (`PaginationControls-meta1gGHPN0gqjND`).
    const counter = getText(pagination).match(/(\d+)\s+of\s+(\d+)/);
    const parsed = counter?.[2] ? Number.parseInt(counter[2], 10) : Number.NaN;
    if (Number.isFinite(parsed) && parsed > 0) totalPages = parsed;

    visit(pagination, "element", function (node) {
      if (node.tagName !== "a" || ariaLabel(node) !== "Next Page") return CONTINUE;

      const href = node.properties?.href;
      if (typeof href !== "string" || !href) return CONTINUE;

      try {
        next = new URL(href, pageUrl);
      } catch {
        // A malformed pagination href just ends the walk.
      }
      return EXIT;
    });
  }

  return { slugs, next, totalPages };
}

/** Fetch and parse one more list page. A dead page ends the walk rather than the run. */
async function fetchListPage(url: URL): Promise<ListPage | undefined> {
  try {
    return retrieveListPage(htmlToHast(await fetchPageHtml(url)), url);
  } catch (error) {
    log(`Could not read list page ${url.toString()}${getErrorMessage(error)}`, "warn");
    return undefined;
  }
}

export type ListNavOptions = {
  /** Group name for the flat result. Defaults to a title derived from the path. */
  title?: string;
  /** Safety cap on how many list pages are read. */
  maxPages?: number;
};

/**
 * Collect every entry across the whole paginated list.
 *
 * Two strategies, because the sequential one is slow when a list runs to 22
 * pages: if the "1 of N" counter is present, every remaining page URL can be
 * derived up front and fetched concurrently. Without it there is no choice but
 * to follow the next-page chain one hop at a time.
 *
 * Returns `[]` when the page is not a list at all — the caller then reports the
 * original sidebar failure.
 */
export async function retrieveListNavItems(
  rootNode: HastRoot,
  pageUrl: URL,
  opts: ListNavOptions = {}
): Promise<NavigationEntry[]> {
  if (framework.vendor !== "readme") return [];

  const first = retrieveListPage(rootNode, pageUrl);
  if (!first || first.slugs.length === 0) return [];

  const maxPages = opts.maxPages ?? MAX_LIST_PAGES;
  const slugs = [...first.slugs];
  const seen = new Set(slugs);

  function absorb(page: ListPage | undefined): void {
    for (const slug of page?.slugs ?? []) {
      if (seen.has(slug)) continue;
      seen.add(slug);
      slugs.push(slug);
    }
  }

  if (first.totalPages && first.totalPages > 1) {
    const capped = Math.min(first.totalPages, maxPages);
    if (capped < first.totalPages) {
      log(
        `${pageUrl.pathname}: reading ${capped} of ${first.totalPages} list pages (maxPages cap)`,
        "warn"
      );
    }

    // Build page URLs from the next-page link, not from `pageUrl` — it carries
    // the query ReadMe expects (`lang`, `perPage`), and dropping those can
    // change the page size and therefore the paging itself.
    const template = first.next ?? pageUrl;
    const urls: URL[] = [];
    for (let page = 2; page <= capped; page++) {
      const url = new URL(template.toString());
      url.searchParams.set("page", String(page));
      urls.push(url);
    }

    for (const chunk of intoChunks(urls)) {
      for (const page of await Promise.all(chunk.map(fetchListPage))) absorb(page);
    }
  } else {
    const visited = new Set([removeTrailingSlash(pageUrl.toString())]);
    let next = first.next;
    let read = 1;

    while (next && read < maxPages) {
      const key = removeTrailingSlash(next.toString());
      if (visited.has(key)) break;
      visited.add(key);

      const page = await fetchListPage(next);
      read++;
      if (!page || page.slugs.length === 0) break;

      absorb(page);
      next = page.next;
    }

    if (next && read >= maxPages) {
      log(`${pageUrl.pathname}: stopped after ${maxPages} list pages (maxPages cap)`, "warn");
    }
  }

  const title = opts.title || getTitleFromLink(pageUrl.pathname) || "Pages";
  return [{ group: title, pages: slugs }];
}
