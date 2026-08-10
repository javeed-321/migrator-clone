import type { DocsConfig, DiscoveryReport } from "./types/nav";
import type { Result } from "./types/result";
import { scrapeAllSiteTabs } from "./pipeline/tabs";
import { htmlToHast } from "./pipeline/root";
import { fetchPageHtml } from "./utils/network";
import { findTitle } from "./utils/title";
import { log } from "./utils/log";
import { visit, EXIT, CONTINUE } from "unist-util-visit";
import type { Root as HastRoot } from "hast";

export type DiscoverOptions = {
  filter?: string;
  outDir?: string;
  skipFetch?: boolean;
};

/**
 * The public entry point: URL in, full discovery report out.
 *
 * Runs steps 1-9 end to end. Everything below this is the same code the CLI
 * and the API route both call.
 */
export async function discover(
  url: string,
  opts: DiscoverOptions = {}
): Promise<Result<DiscoveryReport & { docsConfig: DocsConfig }>> {
  const urlObj = new URL(url);

  const html = await fetchPageHtml(urlObj);
  log("Successfully retrieved initial HTML from src: " + urlObj.toString());

  const result = await scrapeAllSiteTabs(html, urlObj, opts);
  if (!result.success || !result.data) {
    return result as Result<DiscoveryReport & { docsConfig: DocsConfig }>;
  }

  const name = getSiteTitle(htmlToHast(html)) || urlObj.hostname;

  return {
    success: true,
    data: {
      ...result.data,
      docsConfig: {
        $schema: "https://mintlify.com/docs.json",
        name,
        navigation: result.data.navigation,
        ...(result.data.tabs.length ? { tabs: result.data.tabs } : {}),
      },
    },
  };
}

/**
 * `<title>` on a ReadMe page is the *page* title, not the site's — so
 * `og:site_name` is checked first and only falls back to `<title>`.
 */
function getSiteTitle(hast: HastRoot): string {
  let siteName = "";
  let documentTitle = "";

  visit(hast, "element", function (node) {
    if (
      node.tagName === "meta" &&
      node.properties.property === "og:site_name" &&
      typeof node.properties.content === "string"
    ) {
      siteName = node.properties.content.trim();
      return EXIT;
    }
    if (node.tagName === "title" && !documentTitle) {
      documentTitle = findTitle(node, { delete: false });
    }
    return CONTINUE;
  });

  return siteName || documentTitle;
}

export { scrapeAllSiteTabs } from "./pipeline/tabs";
export { scrapeSite } from "./pipeline/site";
export { scrapePageGroup } from "./pipeline/group";
export { retrieveNavItems } from "./nav/retrieve";
export { retrieveRootNavElement } from "./nav/root";
export { iterateOverNavItems } from "./nav/iterate";
export { retrieveTabLinks } from "./tabs/retrieve";
export { detectFramework, framework } from "./utils/detectFramework";
export { htmlToHast } from "./pipeline/root";
export type { DiscoveryReport, DocsConfig, NavigationEntry, Tab } from "./types/nav";
