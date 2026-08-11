import type { Root as HastRoot } from "hast";
import traverse from "neotraverse";

import { NAV_FAILURE_MSG, OVERVIEW_PAGE_SLUG } from "../constants";
import { iterateOverNavItems } from "../nav/iterate";
import { retrieveNavItems } from "../nav/retrieve";
import { retrieveRootNavElement } from "../nav/root";
import type { DiscoveryReport, NavigationEntry, Tab } from "../types/nav";
import type { PageResultData, Result } from "../types/result";
import { detectFramework, framework } from "../utils/detectFramework";
import { logErrorResults } from "../utils/errors";
import { INDEX_NAMES, iterateThroughReservedNames } from "../utils/reservedNames";
import {
  convertStrToTitle,
  optionallyAddLeadingSlash,
  removeLeadingSlash,
  removeTrailingSlash,
} from "../utils/strings";
import { scrapePageGroup } from "./group";
import { htmlToHast } from "./root";

export type ScrapeSiteOptions = {
  hast?: HastRoot;
  tabs?: Tab[];
  /** Only keep URLs under this path, e.g. `/docs` matches `/docs` and `/docs/*`. */
  filter?: string;
  outDir?: string;
  /** Skip step 8 entirely — nav tree only, no page bodies. */
  skipFetch?: boolean;
  /** When set, every converted page is written as `<slug>.mdx` under this directory. */
  mdxDir?: string;
};

function matchesFilter(pathname: string, filter: string): boolean {
  const normalizedPathname = removeTrailingSlash(pathname);
  const normalizedFilter = removeTrailingSlash(optionallyAddLeadingSlash(filter));
  return (
    normalizedPathname === normalizedFilter || normalizedPathname.startsWith(normalizedFilter + "/")
  );
}

/**
 * Steps 5 through 9 for a single tab.
 *
 * Sidebar -> nav tree -> flat URL list -> partition -> fetch -> prune failures.
 */
export async function scrapeSite(
  html: string,
  url: string | URL,
  opts: ScrapeSiteOptions = {}
): Promise<Result<DiscoveryReport>> {
  const hast = opts.hast ?? htmlToHast(html);
  const urlObj = new URL(url);
  const origin = urlObj.origin;

  if (!framework.vendor && !detectFramework(hast)) {
    return { success: false, message: `${urlObj.toString()}: unsupported documentation vendor` };
  }

  // --- Step 5: find the sidebar ------------------------------------------
  const sidebar = retrieveRootNavElement(hast);
  if (!sidebar) return { success: false, message: `${urlObj.toString()}: ${NAV_FAILURE_MSG}` };

  // --- Step 6: walk it into a nav tree -----------------------------------
  const navItems = retrieveNavItems(sidebar);

  // --- Step 7: flatten to URLs -------------------------------------------
  const listOfLinks = iterateOverNavItems(navItems, origin);
  if (listOfLinks.length === 0) {
    return { success: false, message: `no navigation links were able to be found: ${urlObj}` };
  }

  // --- Step 7b: partition -------------------------------------------------
  const externalLinks = listOfLinks.filter((link) => link.origin !== origin);
  const internalLinks = listOfLinks.filter((link) => {
    if (link.origin !== origin || removeTrailingSlash(link.toString()) === origin) return false;
    if (opts.filter && !matchesFilter(link.pathname, opts.filter)) return false;
    return true;
  });
  const rootLinks = listOfLinks.filter((link) => {
    if (link.origin !== origin || removeTrailingSlash(link.toString()) !== origin) return false;
    if (opts.filter && !matchesFilter("/", opts.filter)) return false;
    return true;
  });

  // The bare origin has no pathname to use as a filename, so it borrows the
  // first unclaimed name from INDEX_NAMES.
  const allPathnames = [
    ...internalLinks.map((link) => link.toString()),
    ...rootLinks.map((link) => link.toString()),
  ];
  const rootPaths = rootLinks.map(() => {
    const name = iterateThroughReservedNames(INDEX_NAMES, allPathnames);
    allPathnames.push(name);
    return name;
  });

  // --- Step 8: fetch and convert ------------------------------------------
  const empty = { results: [], pages: [] };
  const external = await scrapePageGroup(externalLinks, { externalLinks: true });
  const internal = opts.skipFetch
    ? empty
    : await scrapePageGroup(internalLinks, { outDir: opts.outDir, mdxDir: opts.mdxDir });
  const rootGroup = opts.skipFetch
    ? empty
    : await scrapePageGroup(rootLinks, { rootPaths, outDir: opts.outDir, mdxDir: opts.mdxDir });

  const externalResults = external.results;
  const internalResults = internal.results;
  const rootResults = rootGroup.results;
  const pages = [...internal.pages, ...rootGroup.pages];

  // --- Step 9: repair the nav tree ---------------------------------------
  const externalLinkReplaceMap = new Map<string, string>(
    externalResults.filter((r) => r.success).map((r) => r.data as PageResultData)
  );
  const rootPathReplaceMap = new Map<string, string>(
    rootResults.filter((r) => r.success).map((r) => r.data as PageResultData)
  );

  // 9a — swap external URLs and bare-origin entries for their local slugs.
  traverse(navItems).forEach(function (value: unknown) {
    if (typeof value === "string") {
      if (externalLinkReplaceMap.has(value)) {
        this.update(externalLinkReplaceMap.get(value) ?? value);
      } else if (rootPathReplaceMap.has(value)) {
        this.update(rootPathReplaceMap.get(value) ?? value);
      }
    } else if (Array.isArray(value)) {
      if (value.find((item) => externalLinkReplaceMap.has(item))) {
        this.update(value.map((item) => externalLinkReplaceMap.get(item) ?? item));
      } else if (value.find((item) => rootPathReplaceMap.has(item))) {
        this.update(value.map((item) => rootPathReplaceMap.get(item) ?? item));
      }
    }
  });

  // 9b — drop the overview marker now that filenames are settled.
  traverse(navItems).forEach(function (value: unknown) {
    if (typeof value === "string") {
      this.update(value.replace(OVERVIEW_PAGE_SLUG, ""));
    } else if (Array.isArray(value)) {
      this.update(
        value.map((item) => (typeof item === "string" ? item.replace(OVERVIEW_PAGE_SLUG, "") : item))
      );
    }
  });

  // 9c — a top-level bare slug is not valid navigation; wrap it in a group.
  navItems.forEach((navItem, index) => {
    if (typeof navItem !== "string") return;
    const lastItemInPath = navItem.split("/").pop() || navItem;
    navItems[index] = { group: convertStrToTitle(lastItemInPath), pages: [navItem] };
  });

  // 9d — remove pages that failed to fetch, plus anything outside the filter.
  const allErrors = [
    ...externalResults.filter((r) => !r.success),
    ...internalResults.filter((r) => !r.success),
    ...rootResults.filter((r) => !r.success),
  ];

  const allErroredPaths = allErrors
    .map((result) => {
      if (!result.data) return "";
      try {
        return removeLeadingSlash(removeTrailingSlash(new URL(result.data[0]).pathname));
      } catch {
        return "";
      }
    })
    .filter(Boolean);

  function shouldDrop(value: string): boolean {
    if (allErroredPaths.includes(value)) return true;
    if (opts.filter && !matchesFilter("/" + value, opts.filter)) return true;
    return false;
  }

  traverse(navItems).forEach(function (value: unknown) {
    if (typeof value === "string" && this.key !== "group" && shouldDrop(value)) {
      this.remove();
    } else if (Array.isArray(value)) {
      this.update(value.filter((item) => !(typeof item === "string" && shouldDrop(item))));
    }
  });

  // 9e — prune groups left with no pages, repeatedly, until a pass is clean.
  // An empty `pages` array means its parent group is dead, so the *parent* is
  // what gets removed. The root array is skipped: calling `remove()` on the
  // root throws inside neotraverse, which is what a filter that matches
  // nothing used to trigger.
  let count = 1;
  while (count > 0) {
    count = 0;
    traverse(navItems).forEach(function (value: unknown) {
      if (!Array.isArray(value) || value.filter(Boolean).length > 0) return;
      if (this.isRoot) return;
      count++;
      if (this.parent && !this.parent.isRoot) {
        this.parent.remove();
      } else {
        this.remove();
      }
    });
  }

  // 9f — anything still absolute could not be localised; it does not belong
  // in navigation.
  traverse(navItems).forEach(function (value: unknown) {
    const isAbsolute = (v: unknown) =>
      typeof v === "string" && (v.startsWith("https://") || v.startsWith("http://"));

    if (isAbsolute(value)) {
      this.remove();
    } else if (Array.isArray(value) && value.find(isAbsolute)) {
      const newPages = value.filter((v) => !isAbsolute(v));
      if (newPages.length) {
        this.update(newPages);
      } else if (this.parent && !this.parent.isRoot) {
        this.parent.remove();
      } else if (!this.isRoot) {
        this.remove();
      }
    }
  });

  logErrorResults("linking to external pages", externalResults);
  logErrorResults("scraping your docs", [...internalResults, ...rootResults]);

  return {
    success: true,
    data: {
      site: urlObj.toString(),
      vendor: framework.vendor ?? "unknown",
      discovered: listOfLinks.map((l) => l.toString()),
      internal: internalLinks.map((l) => l.toString()),
      external: externalLinks.map((l) => l.toString()),
      root: rootLinks.map((l) => l.toString()),
      failed: allErrors.map((r) => ({
        url: r.data?.[0] ?? "",
        message: r.success ? "" : r.message,
      })),
      navigation: navItems as NavigationEntry[],
      tabs: opts.tabs ?? [],
      pages,
    },
  };
}
