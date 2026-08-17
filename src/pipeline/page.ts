import type { Root as HastRoot, Element } from "hast";
import type { Root as MdastRoot } from "mdast";
import { visit, EXIT, CONTINUE } from "unist-util-visit";

import { CONTENT_FAILURE_MSG, MDAST_FAILURE_MSG } from "../constants";
import { mdastToMdx, runMdxPipeline } from "../mdx/convert";
import type { PageResultData, Result, ScrapedPage } from "../types/result";
import { framework } from "../utils/detectFramework";
import { getErrorMessage } from "../utils/errors";
import { removeLeadingSlash, removeTrailingSlash } from "../utils/strings";
import { getDescriptionFromRoot, getTitleFromHeading } from "../utils/title";
import { htmlToHast } from "./root";

/**
 * The content root of a page — the same shape of vendor selector the sidebar
 * lookup uses. ReadMe: `article.rm-Article`.
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
 * HTML in, MDAST out — the shared chain, given this page's content root.
 *
 * The chain itself lives in `mdx/convert` so the playground route runs exactly
 * the same one. Only the root handling is page-specific.
 */
function htmlToMdast(content: Element): MdastRoot {
  // Wrapping the article in a fresh root is what drops the rest of the page:
  // <head>, the header, the sidebar and the footer are simply no longer
  // reachable from here.
  //
  // The article's *own* class is stripped first. Every other container keeps
  // its presentation now, but this one is the selector we matched the page on
  // rather than anything an author wrote — left in place it survives the bridge
  // and wraps every page in a stray `<article className="rm-Article">`.
  const root: Element = { ...content, properties: {} };
  return runMdxPipeline({ type: "root", children: [root] });
}

/**
 * Converts one fetched page and reports the slug it maps to.
 *
 * `result.data` is the `[pathToReplace, replacementSlug]` tuple step 9 uses to
 * rewrite the nav tree; `page` carries the MDX itself. They are kept separate so
 * the repair passes never have to know about page bodies.
 *
 * Unlike upstream this writes nothing — the caller decides whether the MDX goes
 * to disk or into an HTTP response.
 */
export function scrapePage(
  html: string,
  url: string | URL,
  opts: { rootPath?: string } = {}
): { result: Result<PageResultData>; page?: ScrapedPage } {
  const urlObj = new URL(url);
  const urlStr = urlObj.toString();

  const hast = htmlToHast(html);
  const content = retrieveRootContent(hast);
  if (!content) {
    return {
      result: { success: false, message: `${urlStr}: ${CONTENT_FAILURE_MSG}`, data: [urlStr, ""] },
    };
  }

  const slug = opts.rootPath ?? removeLeadingSlash(removeTrailingSlash(urlObj.pathname));

  let page: ScrapedPage;
  try {
    const mdast = htmlToMdast(content);

    // Both of these splice their node out of the tree, so they have to run
    // before stringifying or the title would appear twice.
    const title = getTitleFromHeading(mdast);
    const description = getDescriptionFromRoot(mdast);

    page = { url: urlStr, slug, title, description, mdx: mdastToMdx(mdast) };
  } catch (error) {
    return {
      result: {
        success: false,
        message: `${urlStr}: ${MDAST_FAILURE_MSG}${getErrorMessage(error)}`,
        data: [urlStr, ""],
      },
    };
  }

  if (opts.rootPath) {
    return {
      result: {
        success: true,
        data: [removeLeadingSlash(removeTrailingSlash(urlObj.pathname)), opts.rootPath],
      },
      page,
    };
  }

  return { result: { success: true, data: [urlStr, slug] }, page };
}
