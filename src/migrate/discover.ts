import { fetchLlmsTxt, slugFromUrl, toMarkdownUrl, toPageUrl } from "../download/fetch";
import type { PageRef } from "../download/types";
import { htmlToHast } from "../pipeline/root";
import { scrapeSite } from "../pipeline/site";
import { retrieveTabLinks } from "../tabs/retrieve";
import type { NavigationEntry, Tab } from "../types/nav";
import { detectFramework, framework } from "../utils/detectFramework";
import { getErrorMessage } from "../utils/errors";
import { fetchPageHtml } from "../utils/network";
import { getTitleFromLink } from "../utils/title";
import type { DiscoveredTab, DiscoveryReport } from "./types";

/**
 * Stage 1 of a migration: one URL -> the sidebar, and the list of pages to fetch.
 *
 * ## Two answers, because there are two questions
 *
 * The sidebar walk answers *"what is the navigation?"* and `llms.txt` answers
 * *"what pages exist?"*. They are not the same list and neither substitutes for
 * the other: ReadMe's sidebar deliberately omits spec-generated API endpoints
 * (39 of 58 on developer.flutterwave.com), and `llms.txt` is a flat list with no
 * structure in it at all.
 *
 * Taking either one alone is the mistake `[PIT Phase 0]` names — *the nav is a
 * lower bound, not the page list*. So both run, the page list is the union, and
 * anything downloaded that the sidebar cannot reach is reported rather than
 * quietly shipped as an orphan.
 */

export type DiscoveryResult = {
  report: DiscoveryReport;
  tabs: DiscoveredTab[];
  refs: PageRef[];
  /** Slugs the sidebar can actually reach — the denominator for orphan checking. */
  navSlugs: Set<string>;
};

function countNav(items: NavigationEntry[]): { groups: number; pages: number } {
  let groups = 0;
  let pages = 0;

  for (const entry of items) {
    if (typeof entry === "string") {
      pages += 1;
    } else {
      groups += 1;
      const nested = countNav(entry.pages);
      groups += nested.groups;
      pages += nested.pages;
    }
  }

  return { groups, pages };
}

/** Every slug in a navigation tree, flattened. */
function slugsIn(items: NavigationEntry[], into: Set<string>): Set<string> {
  for (const entry of items) {
    if (typeof entry === "string") into.add(entry.replace(/^\//, ""));
    else slugsIn(entry.pages, into);
  }
  return into;
}

/** A nav slug turned back into something the download stage can fetch. */
function refFromSlug(site: URL, slug: string): PageRef {
  const url = new URL(site.toString());
  url.pathname = `/${slug.replace(/^\//, "")}`;
  const source = toMarkdownUrl(url.toString());
  const resolved = slugFromUrl(source);

  return {
    title: "",
    description: "",
    source,
    url: toPageUrl(source),
    slug: resolved,
    section: "",
    kind: resolved.startsWith("reference/") ? "api" : resolved.startsWith("page/") ? "page" : "guide",
  };
}

/**
 * Walk one tab's sidebar.
 *
 * A tab that yields zero pages after both the sidebar walk and the paginated-list
 * fallback is not navigation — on ReadMe those are custom pages and
 * client-rendered modules — so it is reported as skipped rather than emitted as
 * an empty tab.
 */
async function walkTab(
  tab: Tab,
  site: URL,
  html: string | undefined,
  filter: string | undefined,
): Promise<{ tab: DiscoveredTab; groups: number; pages: number } | { skipped: string }> {
  try {
    const tabUrl = new URL(site.toString());
    tabUrl.pathname = tab.url;
    const source = html ?? (await fetchPageHtml(tabUrl));
    const result = await scrapeSite(source, tabUrl, { tabs: [tab], filter });

    if (!result.success || !result.data) {
      return { skipped: result.success ? "no navigation was produced" : result.message };
    }

    const { groups, pages } = countNav(result.data.navigation);
    if (pages === 0) return { skipped: "no page links found in this tab" };

    return { tab: { name: tab.name, url: tab.url, navigation: result.data.navigation }, groups, pages };
  } catch (error) {
    return { skipped: `failed to load this tab${getErrorMessage(error)}` };
  }
}

export async function discoverSite(
  site: URL,
  options: { filter?: string } = {},
): Promise<DiscoveryResult> {
  const html = await fetchPageHtml(site);
  const hast = htmlToHast(html);

  if (!detectFramework(hast)) {
    throw new Error(
      `${site.toString()} is not a ReadMe site — no <meta name="readme-deploy"> in its HTML. ` +
        "This build implements ReadMe selectors only.",
    );
  }

  const links = retrieveTabLinks(hast) ?? [];
  // One tab, or a tab bar whose only entry is the page we are already on: the
  // HTML in hand is that tab's, so re-fetching it would be a second request for
  // a document we have.
  const singleTab = !links.length || (links.length === 1 && links[0]?.url === site.pathname);

  let walked: { tab: DiscoveredTab; groups: number; pages: number }[] = [];
  const skippedTabs: DiscoveryReport["skippedTabs"] = [];

  if (singleTab) {
    const entry: Tab = links[0] ?? {
      name: getTitleFromLink(site.pathname) || site.hostname,
      url: site.pathname,
    };
    const result = await walkTab(entry, site, html, options.filter);
    if ("skipped" in result) skippedTabs.push({ ...entry, reason: result.skipped });
    else walked = [result];
  } else {
    // The entry URL is not always reachable from the tab bar. Keeping it means a
    // migration started deep in the site still covers where it was pointed.
    if (!links.find((link) => site.pathname.startsWith(link.url))) {
      links.push({ name: getTitleFromLink(site.pathname), url: site.pathname });
    }

    const results = await Promise.all(
      links.map(async (tab) => ({ tab, result: await walkTab(tab, site, undefined, options.filter) })),
    );

    for (const { tab, result } of results) {
      if ("skipped" in result) skippedTabs.push({ name: tab.name, url: tab.url, reason: result.skipped });
      else walked.push(result);
    }
  }

  if (walked.length === 0) {
    throw new Error(
      `No tab produced any navigation for ${site.toString()}` +
        (skippedTabs[0] ? ` — ${skippedTabs[0].reason}` : ""),
    );
  }

  const navSlugs = new Set<string>();
  for (const entry of walked) slugsIn(entry.tab.navigation, navSlugs);

  // `llms.txt` is the fuller list where it exists. Where it does not, the sidebar
  // is all there is — which is a smaller migration, not a failed one.
  let listed: PageRef[] = [];
  let source = "the sidebar walk";
  try {
    listed = await fetchLlmsTxt(site.toString());
    if (listed.length > 0) source = "llms.txt, plus any sidebar page missing from it";
  } catch {
    /* no llms.txt on this site; the sidebar list below stands on its own */
  }

  // Union, llms.txt first: its entries carry real titles and sections, and a
  // slug rebuilt from the sidebar carries neither.
  const refs: PageRef[] = [...listed];
  const seen = new Set(refs.map((ref) => ref.slug));
  for (const slug of navSlugs) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    refs.push(refFromSlug(site, slug));
  }

  return {
    report: {
      vendor: framework.vendor ?? "unknown",
      source,
      tabs: walked.map((entry) => ({
        name: entry.tab.name,
        url: entry.tab.url,
        groups: entry.groups,
        pages: entry.pages,
      })),
      skippedTabs,
      navPages: navSlugs.size,
      listedPages: refs.length,
    },
    tabs: walked.map((entry) => entry.tab),
    refs,
    navSlugs,
  };
}
