import type { Root as HastRoot, Element } from "hast";
import type { Root as MdastRoot } from "mdast";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit, EXIT, CONTINUE } from "unist-util-visit";

import { wrapCardsInColumns } from "../components/Columns";
import { CONTENT_FAILURE_MSG, MDAST_FAILURE_MSG } from "../constants";
import { createCallout, createCard, createCodeGroup, createImage } from "../mdx/create";
import {
  removeBreaks,
  removeChrome,
  removeClassNames,
  removeHeadingAnchors,
} from "../mdx/hastClean";
import {
  convertHeaderLinksToText,
  formatEmphasis,
  inlineCodeBlocksInCells,
  removeBottomMetadata,
  removeEmptyParagraphs,
  removeNestedRoots,
  removeUpdatedAt,
  spaceListsOut,
} from "../mdx/mdastClean";
import { convertLeftoverComponents, selectiveRehypeRemark } from "../mdx/toMdast";
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
 * HTML in, MDX out.
 *
 * The whole conversion is one `unified()` chain, and the order inside it is the
 * only thing that makes it work:
 *
 *   HAST cleanup    delete browser-only markup while nodes are still HTML
 *   detection       swap ReadMe markup for `<Callout>`-style marker elements
 *   HAST cleanup    strip class/id/style, now that nothing needs to match on it
 *   THE BRIDGE      `selectiveRehypeRemark` — HAST becomes MDAST here
 *   MDAST cleanup   fix up Markdown-level artefacts
 *
 * `.runSync()` calls each registered transformer in order on one tree, so the
 * tree's type changes half way down a chain TypeScript believes is uniform —
 * hence the cast on the result.
 */
function htmlToMdast(content: Element): MdastRoot {
  // Wrapping the article in a fresh root is what drops the rest of the page:
  // <head>, the header, the sidebar and the footer are simply no longer
  // reachable from here.
  const contentAsRoot: HastRoot = { type: "root", children: [content] };

  return unified()
    // Strip ReadMe SuperHub page furniture (breadcrumb, pager, feedback widget,
    // on-page ToC, timestamp) before anything else looks at the tree.
    .use(removeChrome)
    .use(removeBreaks)
    .use(removeHeadingAnchors)
    // Component detection — still HAST. Order matters: images and code first,
    // then cards, then Columns (which needs the Card markers to already exist),
    // and every scraper must run before removeClassNames strips what it matches.
    .use(createImage)
    .use(createCodeGroup)
    .use(createCard)
    .use(wrapCardsInColumns)
    .use(createCallout)
    .use(removeClassNames)
    .use(selectiveRehypeRemark)
    // Nested components (a Card inside Columns) cross the bridge un-converted;
    // this finishes them on the MDAST side.
    .use(convertLeftoverComponents)
    .use(removeNestedRoots)
    .use(convertHeaderLinksToText)
    .use(removeEmptyParagraphs)
    .use(spaceListsOut)
    .use(removeUpdatedAt)
    .use(removeBottomMetadata)
    .use(inlineCodeBlocksInCells)
    .use(formatEmphasis)
    .runSync(contentAsRoot) as unknown as MdastRoot;
}

/** MDAST in, MDX text out. `.stringify()` only serialises — it runs no plugins. */
function mdastToMdx(tree: MdastRoot): string {
  const result = unified().use(remarkMdx).use(remarkGfm).use(remarkStringify).stringify(tree);
  return String(result).replace(/\n{3,}/g, "\n\n");
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
