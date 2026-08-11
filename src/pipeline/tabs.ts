import { retrieveTabLinks } from "../tabs/retrieve";
import type { DiscoveryReport, NavigationEntry, Tab } from "../types/nav";
import type { Result } from "../types/result";
import { detectFramework, framework } from "../utils/detectFramework";
import { getErrorMessage } from "../utils/errors";
import { log } from "../utils/log";
import { fetchPageHtml } from "../utils/network";
import { getTitleFromLink } from "../utils/title";
import { htmlToHast } from "./root";
import { scrapeSite, type ScrapeSiteOptions } from "./site";

/**
 * Step 4 as an orchestrator: run the whole per-tab pipeline once per tab and
 * merge the results.
 *
 * Tabs are fetched in parallel because each one is an independent site scrape;
 * the sequential chunking only applies to pages *within* a tab.
 */
export async function scrapeAllSiteTabs(
  html: string,
  url: string | URL,
  opts: Omit<ScrapeSiteOptions, "hast" | "tabs"> = {}
): Promise<Result<DiscoveryReport>> {
  const hast = htmlToHast(html);
  const urlObj = new URL(url);

  if (!detectFramework(hast)) {
    return { success: false, message: `${urlObj.toString()}: unsupported documentation vendor` };
  }

  const links = retrieveTabLinks(hast);

  // No tab bar, or a tab bar that only points back at where we already are —
  // treat the whole site as a single tab.
  if (!links || !links.length || (links.length === 1 && links[0]?.url === urlObj.pathname)) {
    return scrapeSite(html, urlObj, { ...opts, hast });
  }

  // The entry URL might not be reachable from the tab bar; make sure it is
  // still scraped rather than silently dropped.
  if (!links.find((link) => urlObj.pathname.startsWith(link.url))) {
    links.push({ name: getTitleFromLink(urlObj.pathname), url: urlObj.pathname });
  }

  log(`Found ${links.length} tabs: ${links.map((l) => l.name).join(", ")}`);

  const results = await Promise.all(
    links.map(async (tabEntry) => {
      const newUrl = new URL(urlObj.toString());
      newUrl.pathname = tabEntry.url;
      try {
        const newHtml = await fetchPageHtml(newUrl);
        return await scrapeSite(newHtml, newUrl, { ...opts, tabs: [tabEntry] });
      } catch (error) {
        return { success: false as const, message: getErrorMessage(error) };
      }
    })
  );

  const navigation: NavigationEntry[] = [];
  const tabs: Tab[] = [];
  const pages: DiscoveryReport["pages"] = [];
  const discovered: string[] = [];
  const internal: string[] = [];
  const external: string[] = [];
  const root: string[] = [];
  const failed: DiscoveryReport["failed"] = [];

  results.forEach((result) => {
    if (!result.success || !result.data) return;
    navigation.push(...result.data.navigation);
    tabs.push(...result.data.tabs);
    pages.push(...result.data.pages);
    discovered.push(...result.data.discovered);
    internal.push(...result.data.internal);
    external.push(...result.data.external);
    root.push(...result.data.root);
    failed.push(...result.data.failed);
  });

  results.forEach((result) => {
    if (result.success) return;
    log("Failed to scrape tab" + (result.message ? `: ${result.message}` : ""), "failure");
  });

  if (navigation.length === 0) {
    return { success: false, message: `No tab produced any navigation for ${urlObj.toString()}` };
  }

  return {
    success: true,
    data: {
      site: urlObj.toString(),
      vendor: framework.vendor ?? "unknown",
      discovered,
      internal,
      external,
      root,
      failed,
      navigation,
      tabs,
      pages,
    },
  };
}
