import type { Element } from "hast";
import { EXIT, visit, CONTINUE } from "unist-util-visit";

import { OVERVIEW_PAGE_SLUG } from "../constants";
import type { NavigationEntry } from "../types/nav";
import { dedupedAppend } from "../utils/append";
import { findFirstChild } from "../utils/firstChild";
import { removeTrailingSlash } from "../utils/strings";
import { getText } from "../utils/text";
import { retrieveNavItems } from "./retrieve";

export type ListItemOptions = {
  sectionTagName: string;
  childListTagName: string;
  title?: string;
};

/**
 * Step 6b: turn a single sidebar `<li>` into either a leaf slug or a group.
 *
 * The branch that decides everything is `findFirstChild(node, 'ul')`:
 * no nested list means leaf page, a nested list means group + recurse.
 *
 * Mutually recursive with `retrieveNavItems`.
 */
export function processListItem(
  node: Element,
  opts: ListItemOptions = {
    sectionTagName: "div",
    childListTagName: "ul",
    title: undefined,
  }
): NavigationEntry | undefined {
  const link = findFirstChild(node, "a");
  if (!link) return undefined;

  let linkHref = link.properties.href as string | undefined;
  if (linkHref === undefined || linkHref === "#") return undefined;

  // ReadMe marks API endpoint links with a method chip (GET/POST/...). Those
  // pages are generated from the OpenAPI spec instead, so they are skipped.
  let isApiReferenceLink = false;
  visit(link, "element", function (subNode) {
    if (
      subNode.tagName === "span" &&
      Array.isArray(subNode.properties.className) &&
      (subNode.properties.className as string[]).includes("rm-APIMethod")
    ) {
      isApiReferenceLink = true;
      return EXIT;
    }
    return CONTINUE;
  });
  if (isApiReferenceLink) return undefined;

  // The slug doubles as the output file path, so it is stored without the
  // leading slash from here on.
  if (linkHref.startsWith("/")) linkHref = linkHref.substring(1);

  const sectionHeader = findFirstChild(node, opts.sectionTagName);
  const childList = findFirstChild(node, opts.childListTagName);
  if (!childList) return linkHref;

  // An <li> that has children is a page that is also a parent, so its own
  // anchor text names it. Category headings, which have no anchor at all, are
  // handled by `processSection` in retrieve.ts.
  const title = opts.title || getText(link) || getText(sectionHeader) || "";

  let childEntries = retrieveNavItems(childList);

  // Mark the group's own landing page when its slug is a prefix of a child's.
  // See OVERVIEW_PAGE_SLUG — the marker is stripped again in step 9b.
  const newLink = childEntries.find(
    (child) => typeof child === "string" && child.startsWith(linkHref)
  )
    ? removeTrailingSlash(linkHref) + OVERVIEW_PAGE_SLUG
    : linkHref;

  if (childEntries.includes(linkHref)) {
    childEntries.forEach((child, index) => {
      if (child === linkHref) childEntries[index] = newLink;
    });
  }
  // Prepended, so a group's landing page is always its first page.
  childEntries = dedupedAppend(newLink, childEntries, true);

  return { group: title, pages: childEntries };
}
