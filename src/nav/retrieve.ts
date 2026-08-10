import type { Element } from "hast";
import { visit, CONTINUE, SKIP } from "unist-util-visit";

import type { NavigationEntry } from "../types/nav";
import { hasClassName, findByClassName } from "../utils/className";
import { framework } from "../utils/detectFramework";
import { findFirstChild } from "../utils/firstChild";
import { getText } from "../utils/text";
import { processListItem } from "./listItems";

/**
 * Step 6a: walk a sidebar subtree and build the nav tree.
 *
 * Two node shapes matter, and conflating them is the classic way to get a
 * doubled nav:
 *
 *   <section class="rm-Sidebar-section">   a category heading + a list.
 *     <button class="rm-Sidebar-category"> It has NO page of its own — the
 *     <ul>…</ul>                           heading is a collapse toggle.
 *
 *   <li>                                   a page, optionally with children.
 *     <a href="/docs/x">                   Its own href IS a page.
 *     <ul class="subpages">…</ul>
 *
 * Upstream looks for the section heading in an `<h2>`. ReadMe now renders it as
 * a `<button>`, so that lookup silently returns nothing and the section
 * borrows its first child link's title and href instead — every category ends
 * up named after its first page and that page appears twice.
 *
 * Mutually recursive with `processListItem`.
 */
export function retrieveNavItems(rootNode: Element): NavigationEntry[] {
  const result: NavigationEntry[] = [];

  visit(rootNode, "element", function (node) {
    if (framework.vendor === "readme" && node.tagName === "section") {
      result.push(...processSection(node));
      return SKIP;
    }

    if (node.tagName !== "li") return CONTINUE;

    const entry = processListItem(node, {
      sectionTagName: "h2",
      childListTagName: "ul",
    });

    if (entry !== undefined) {
      result.push(entry);
      return SKIP;
    }
    return CONTINUE;
  });

  return result;
}

/**
 * A category wrapper: heading text becomes the group name, the list becomes
 * its pages, and nothing is prepended because the section owns no page.
 *
 * Returns the child entries un-grouped when there is no heading to name them
 * with, rather than inventing a title.
 */
function processSection(node: Element): NavigationEntry[] {
  const childList = findFirstChild(node, "ul");
  if (!childList) return [];

  const pages = retrieveNavItems(childList);
  if (pages.length === 0) return [];

  const title = getText(findSectionHeading(node));
  if (!title) return pages;

  return [{ group: title, pages }];
}

/**
 * The category heading. ReadMe marks it with `rm-Sidebar-category` regardless
 * of which element it renders as, so match the class first and fall back to
 * the historical `<h2>` for older sites.
 */
function findSectionHeading(node: Element): Element | undefined {
  const byClass = findByClassName(node, "rm-Sidebar-category");
  if (byClass && !hasClassName(byClass, "rm-Sidebar-link")) return byClass;
  return findFirstChild(node, "h2");
}
