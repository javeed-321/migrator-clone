import type { Root as HastRoot } from "hast";

import { NAV_FAILURE_MSG, OVERVIEW_PAGE_SLUG } from "../constants";
import { retrieveListNavItems } from "../nav/list";
import { retrieveNavItems } from "../nav/retrieve";
import { retrieveRootNavElement } from "../nav/root";
import type { DiscoveryReport, NavigationEntry, Tab } from "../types/nav";
import type { Result } from "../types/result";
import { detectFramework, framework } from "../utils/detectFramework";
import { log } from "../utils/log";
import { convertStrToTitle, optionallyAddLeadingSlash, removeTrailingSlash } from "../utils/strings";
import { htmlToHast } from "./root";

export type ScrapeSiteOptions = {
  /** Reuse an already-parsed tree instead of re-parsing `html`. */
  hast?: HastRoot;
  /** Metadata passthrough — lands in the report, triggers nothing. */
  tabs?: Tab[];
  /** Only keep slugs under this path, e.g. `/docs` matches `/docs` and `/docs/*`. */
  filter?: string;
};

/** `/docs` matches `/docs` and `/docs/*`, but not the sibling `/docs-archive`. */
function matchesFilter(pathname: string, filter: string): boolean {
  const normalizedPathname = removeTrailingSlash(pathname);
  const normalizedFilter = removeTrailingSlash(optionallyAddLeadingSlash(filter));
  return (
    normalizedPathname === normalizedFilter || normalizedPathname.startsWith(normalizedFilter + "/")
  );
}

/**
 * An absolute URL that survived the sidebar walk points off-site, so it is not a
 * page in the migrated docs and does not belong in navigation.
 */
function isAbsolute(slug: string): boolean {
  return /^https?:\/\//i.test(slug);
}

/**
 * Tidy the walked tree into publishable navigation.
 *
 * Rebuilt bottom-up rather than mutated in place, which is what lets one pass do
 * the work several used to:
 *
 *   - `OVERVIEW_PAGE_SLUG` is stripped, having served its purpose in the walk
 *   - off-site links and anything outside `filter` are dropped
 *   - a group whose children all disappear drops itself, in the same pass — no
 *     repeat-until-clean loop is needed, because children are repaired before
 *     their parent decides whether it still has pages
 *
 * Pure: returns a new tree and leaves the input untouched.
 */
function repairNavigation(entries: NavigationEntry[], filter?: string): NavigationEntry[] {
  return entries.flatMap<NavigationEntry>((entry) => {
    if (typeof entry === "string") {
      const slug = entry.replace(OVERVIEW_PAGE_SLUG, "");
      if (!slug || isAbsolute(slug)) return [];
      if (filter && !matchesFilter(optionallyAddLeadingSlash(slug), filter)) return [];
      return [slug];
    }

    const pages = repairNavigation(entry.pages, filter);
    return pages.length ? [{ ...entry, pages }] : [];
  });
}

/** A loose slug at the top level is not valid navigation, so give it a group. */
function wrapLooseSlugs(entries: NavigationEntry[]): NavigationEntry[] {
  return entries.map((entry) => {
    if (typeof entry !== "string") return entry;
    const lastItemInPath = entry.split("/").pop() || entry;
    return { group: convertStrToTitle(lastItemInPath), pages: [entry] };
  });
}

/**
 * Steps 5 to 7 for a single tab: sidebar -> nav tree -> tidy.
 *
 * The output is navigation and nothing else. Page bodies are deliberately not
 * fetched here — the next stage takes these slugs and requests `<slug>.md` from
 * ReadMe, which answers with markdown directly and needs no HTML conversion.
 *
 * Note this never fetches the page it is handed; `html` is already in hand.
 */
export async function scrapeSite(
  html: string,
  url: string | URL,
  opts: ScrapeSiteOptions = {}
): Promise<Result<DiscoveryReport>> {
  const hast = opts.hast ?? htmlToHast(html);
  const urlObj = new URL(url);

  if (!framework.vendor && !detectFramework(hast)) {
    return { success: false, message: `${urlObj.toString()}: unsupported documentation vendor` };
  }

  // --- Step 5: find the sidebar ------------------------------------------
  const sidebar = retrieveRootNavElement(hast);

  // --- Step 6: walk it into a nav tree -----------------------------------
  let navItems: NavigationEntry[];

  if (sidebar) {
    navItems = retrieveNavItems(sidebar);
  } else {
    // No sidebar. Changelog and Discussions are paginated lists rather than
    // trees, so there is nothing to walk — collect their entry links instead.
    // Anything that is not a list still fails exactly as it did before.
    navItems = await retrieveListNavItems(hast, urlObj, { title: opts.tabs?.[0]?.name });
    if (navItems.length === 0) {
      return { success: false, message: `${urlObj.toString()}: ${NAV_FAILURE_MSG}` };
    }
    log(`No sidebar at ${urlObj.pathname} — built navigation from its paginated list instead.`);
  }

  // --- Step 7: tidy into publishable navigation ---------------------------
  const navigation = wrapLooseSlugs(repairNavigation(navItems, opts.filter));

  if (navigation.length === 0) {
    return { success: false, message: `no navigation links were able to be found: ${urlObj}` };
  }

  return {
    success: true,
    data: {
      site: urlObj.toString(),
      vendor: framework.vendor ?? "unknown",
      navigation,
      tabs: opts.tabs ?? [],
    },
  };
}
