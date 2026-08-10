import type { Root as HastRoot, Element } from "hast";
import { visit, EXIT, CONTINUE } from "unist-util-visit";

import { CONTENT_FAILURE_MSG } from "../constants";
import type { PageResultData, Result } from "../types/result";
import { framework } from "../utils/detectFramework";
import { removeLeadingSlash, removeTrailingSlash } from "../utils/strings";
import { htmlToHast } from "./root";

/**
 * The content root of a page — the same shape of vendor selector the sidebar
 * lookup uses. ReadMe: `article.rm-Article`.
 *
 * Converting this subtree to MDX is where the rest of the real scraper lives.
 * This build only checks it exists, which is what makes a page count as
 * successfully scraped.
 */
export function retrieveRootContent(rootNode: HastRoot): Element | undefined {
  const rootSelector = new Map<string, string | undefined>([["main", undefined]]);
  if (framework.vendor === "readme") {
    rootSelector.clear();
    rootSelector.set("article", "rm-Article");
  }

  let element: Element | undefined = undefined;
  visit(rootNode, "element", function (node) {
    if (!rootSelector.has(node.tagName)) return CONTINUE;

    const classNameSelector = rootSelector.get(node.tagName);
    const { className } = node.properties;
    if (
      !classNameSelector ||
      (Array.isArray(className) && (className as string[]).includes(classNameSelector))
    ) {
      element = node;
      return EXIT;
    }
    return CONTINUE;
  });

  return element;
}

/**
 * Validates one fetched page and reports the slug it maps to.
 *
 * The returned `data` tuple is `[pathToReplace, replacementSlug]`, which step 9
 * uses to rewrite bare-origin entries in the nav tree.
 */
export function scrapePage(
  html: string,
  url: string | URL,
  opts: { rootPath?: string } = {}
): Result<PageResultData> {
  const urlObj = new URL(url);
  const urlStr = urlObj.toString();

  const hast = htmlToHast(html);
  const content = retrieveRootContent(hast);
  if (!content) {
    return { success: false, message: `${urlStr}: ${CONTENT_FAILURE_MSG}`, data: [urlStr, ""] };
  }

  if (opts.rootPath) {
    return {
      success: true,
      data: [removeLeadingSlash(removeTrailingSlash(urlObj.pathname)), opts.rootPath],
    };
  }

  return { success: true, data: [urlStr, removeLeadingSlash(urlObj.pathname)] };
}
