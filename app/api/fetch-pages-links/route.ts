import type { NextRequest } from "next/server";

import type { FetchPagesResponse, SkippedTab, TabResult } from "@/app/fetch-pages-links/types";
import { htmlToHast } from "@/src/pipeline/root";
import { scrapeSite } from "@/src/pipeline/site";
import { retrieveTabLinks } from "@/src/tabs/retrieve";
import type { DiscoveryReport, NavigationEntry, Tab } from "@/src/types/nav";
import type { Result } from "@/src/types/result";
import { detectFramework, framework } from "@/src/utils/detectFramework";
import { getErrorMessage } from "@/src/utils/errors";
import { logTable, setLogsEnabled } from "@/src/utils/log";
import { fetchPageHtml } from "@/src/utils/network";
import { getTitleFromLink } from "@/src/utils/title";

// The pipeline uses undici and a mutable module singleton — no edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function countNav(items: NavigationEntry[]): { groups: number; pages: number } {
  let groups = 0;
  let pages = 0;

  for (const entry of items) {
    if (typeof entry === "string") {
      pages++;
    } else {
      groups++;
      const nested = countNav(entry.pages);
      groups += nested.groups;
      pages += nested.pages;
    }
  }

  return { groups, pages };
}

function toTabResult(tab: Tab, result: Result<DiscoveryReport>): TabResult {
  if (!result.success || !result.data) {
    return {
      name: tab.name,
      url: tab.url,
      navigation: [],
      groups: 0,
      pages: 0,
      ok: false,
      message: result.success ? "No navigation was produced" : result.message,
    };
  }

  const { groups, pages } = countNav(result.data.navigation);
  return {
    name: tab.name,
    url: tab.url,
    navigation: result.data.navigation,
    groups,
    pages,
    ok: true,
  };
}

export async function POST(request: NextRequest) {
  let body: { url?: string; filter?: string; verifyPages?: boolean };

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Body must be JSON" }, { status: 400 });
  }

  if (!body.url) {
    return Response.json({ ok: false, message: "`url` is required" }, { status: 400 });
  }

  let urlObj: URL;
  try {
    urlObj = new URL(body.url);
  } catch {
    return Response.json(
      { ok: false, message: `Invalid link: ${body.url} — it must start with http(s)://` },
      { status: 400 }
    );
  }

  const filter = body.filter || undefined;
  // Fetching every page body only tells us which pages 404 — off by default so
  // a preview stays fast.
  const skipFetch = !body.verifyPages;

  function fail(message: string): Response {
    return Response.json({
      ok: false,
      message,
      site: urlObj.toString(),
      vendor: framework.vendor ?? "unknown",
      tabs: [],
    } satisfies FetchPagesResponse);
  }

  try {
    const html = await fetchPageHtml(urlObj);
    const hast = htmlToHast(html);

    if (!detectFramework(hast)) {
      return fail(
        `${urlObj.toString()} is not a ReadMe site — no <meta name="readme-deploy"> in its HTML. ` +
          `This build implements ReadMe selectors only.`
      );
    }

    const links = retrieveTabLinks(hast) ?? [];
    logTable(`Tabs found on ${urlObj.host}`, links, { columns: ["name", "url"] });

    // which merges every tab's navigation into one array. Running the loop here
    // keeps each tab's tree attributed to the tab it came from.
    const singleTab =
      !links.length || (links.length === 1 && links[0]?.url === urlObj.pathname);

    let scraped: TabResult[];

    if (singleTab) {
      const entryTab: Tab = links[0] ?? {
        name: getTitleFromLink(urlObj.pathname) || urlObj.hostname,
        url: urlObj.pathname,
      };
      scraped = [
        toTabResult(entryTab, await scrapeSite(html, urlObj, { hast, filter, skipFetch })),
      ];
    } else {
      // The entry URL might not be reachable from the tab bar; keep it anyway.
      if (!links.find((link) => urlObj.pathname.startsWith(link.url))) {
        links.push({ name: getTitleFromLink(urlObj.pathname), url: urlObj.pathname });
      }

      scraped = await Promise.all(
        links.map(async (tab) => {
          const tabUrl = new URL(urlObj.toString());
          tabUrl.pathname = tab.url;
          try {
            const tabHtml = await fetchPageHtml(tabUrl);
            return toTabResult(
              tab,
              await scrapeSite(tabHtml, tabUrl, { tabs: [tab], filter, skipFetch })
            );
          } catch (error) {
            return {
              name: tab.name,
              url: tab.url,
              navigation: [],
              groups: 0,
              pages: 0,
              ok: false,
              message: `Failed to load this tab${getErrorMessage(error)}`,
            } satisfies TabResult;
          }
        })
      );
    }

    // A tab that still has zero links after the sidebar walk *and* the
    // paginated-list fallback is not navigation. On ReadMe these are custom
    // pages (`main.rm-CustomPage`) and client-rendered modules like Recipes.
    // Checked against docs.capillarytech.com: all 27 links inside its two
    // 0-link tabs resolve to /docs pages the User Documentation tab already
    // carries, so dropping them loses no content.
    const tabs = scraped.filter((tab) => tab.pages > 0);
    const skipped: SkippedTab[] = scraped
      .filter((tab) => tab.pages === 0)
      .map((tab) => ({
        name: tab.name,
        url: tab.url,
        reason: tab.message ?? "no page links found in this tab",
      }));

    if (tabs.length === 0) {
      return fail(scraped[0]?.message ?? `No tab produced any navigation for ${urlObj.toString()}`);
    }

    return Response.json({
      ok: true,
      site: urlObj.toString(),
      vendor: framework.vendor ?? "unknown",
      tabs,
      ...(skipped.length ? { skipped } : {}),
    } satisfies FetchPagesResponse);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Unknown error");
  } finally {
    setLogsEnabled(true);
  }
}
