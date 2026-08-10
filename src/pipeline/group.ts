import type { PageResultData, Result } from "../types/result";
import { getErrorMessage } from "../utils/errors";
import { writeRawPage } from "../utils/file";
import { intoChunks } from "../utils/intoChunks";
import { log } from "../utils/log";
import { fetchPageHtml } from "../utils/network";
import { convertStrToTitle } from "../utils/strings";
import { OVERVIEW_PAGE_SLUG } from "../constants";
import { scrapePage } from "./page";

export type PageGroupOptions = {
  externalLinks?: boolean;
  /** Replacement slugs for bare-origin URLs, index-aligned with `navGroup`. */
  rootPaths?: string[];
  /** When set, each fetched page's raw HTML is written under this directory. */
  outDir?: string;
};

/**
 * Step 8: fetch every discovered page, `CHUNK_SIZE` at a time.
 *
 * Chunks run sequentially; the pages inside a chunk run concurrently. Errors
 * are captured per-URL and returned as failed Results — never thrown — so one
 * dead link cannot abort a 400-page run. Those failures are what step 9 prunes.
 *
 * The index passed to the callback is chunk-local, so `rootPaths` and the
 * external-link fallback names are resolved against a global offset here.
 * Upstream indexes with the chunk-local value, which misaligns past 16 items.
 */
export async function scrapePageGroup(
  navGroup: URL[],
  opts: PageGroupOptions = {}
): Promise<Result<PageResultData>[]> {
  const allResults: Result<PageResultData>[] = [];
  let offset = 0;

  try {
    for (const chunk of intoChunks(navGroup)) {
      const chunkOffset = offset;
      offset += chunk.length;

      const res = await Promise.all(
        chunk.map(async (url, chunkIndex) => {
          const index = chunkOffset + chunkIndex;
          try {
            if (opts.externalLinks) {
              // External links are never fetched. They only need a stable slug
              // so the nav tree can point at a local stub instead of off-site.
              let externalLinkTitle =
                convertStrToTitle(url.pathname.split("/").filter(Boolean).at(-1) ?? url.pathname) ||
                `external-link-${index}`;
              externalLinkTitle = externalLinkTitle.replace(/\s+/g, "-").toLowerCase();
              return { success: true as const, data: [url.toString(), externalLinkTitle] as PageResultData };
            }

            // Strip the overview marker before fetching — it is a nav-tree
            // annotation, not part of the real URL. Upstream also carries a
            // flag from here into the MDX frontmatter title; there is no
            // frontmatter in this build, so the marker is simply dropped.
            if (url.toString().endsWith(OVERVIEW_PAGE_SLUG)) {
              url = new URL(url.toString().replace(OVERVIEW_PAGE_SLUG, ""));
            }

            const html = await fetchPageHtml(url);
            const result = scrapePage(html, url, {
              rootPath: opts.rootPaths ? opts.rootPaths[index] : undefined,
            });

            if (result.success && opts.outDir) {
              writeRawPage(opts.outDir, opts.rootPaths?.[index] ?? url, html);
            }
            return result;
          } catch (error) {
            const errorMessage = getErrorMessage(error);
            return {
              success: false as const,
              message: `We encountered an error when scraping ${url}${errorMessage}`,
              data: [url.toString(), ""] as PageResultData,
            };
          }
        })
      );
      allResults.push(...res);
    }
  } catch (error) {
    log(
      `We encountered an error when scraping the page group from ${
        navGroup[0]?.origin ?? "the URL provided"
      }${getErrorMessage(error)}`,
      "error"
    );
  }

  return allResults;
}
