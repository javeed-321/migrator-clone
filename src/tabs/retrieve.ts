import type { Root as HastRoot, Element } from "hast";
import { visit, EXIT, CONTINUE } from "unist-util-visit";

import type { Tab } from "../types/nav";
import { framework } from "../utils/detectFramework";
import { findTitle, getTitleFromLink } from "../utils/title";

/**
 * Step 4: find the top-level tabs in the site header.
 *
 * This matters because the sidebar only ever shows the *current* tab's pages.
 * A four-tab docs site therefore needs four separate fetch + sidebar-walk
 * passes; miss this and you silently scrape a quarter of the site.
 *
 * ReadMe: `header.rm-Header`, then anchors inside its `<nav>` or its
 * `.rm-Header-right` block. Absolute (`http…`) hrefs are skipped — those are
 * links off-site, not tabs.
 */
/**
 * `.rm-Header-right` holds the tab overflow *and* the auth controls, so login
 * links land in the same sweep as real tabs. Upstream keeps them, which costs
 * one guaranteed-404 fetch per run.
 */
function isAuthLink(href: string): boolean {
  const path = href.split("?")[0] ?? "";
  return /^\/(login|logout|signup|sign-in|sign-up)\b/.test(path) || href.includes("redirect_uri");
}

export function retrieveTabLinks(rootNode: HastRoot): Tab[] | undefined {
  if (framework.vendor !== "readme") return undefined;

  // The `as` widens the declared type so TS does not narrow it to `undefined`
  // — it cannot see that the visitor callback assigns to it.
  let element: Element | undefined = undefined as Element | undefined;
  visit(rootNode, "element", function (node) {
    if (
      node.tagName === "header" &&
      Array.isArray(node.properties.className) &&
      (node.properties.className as string[]).includes("rm-Header")
    ) {
      element = node;
      return EXIT;
    }
    return CONTINUE;
  });

  if (!element) return undefined;

  const links: Tab[] = [];
  const seen = new Set<string>();

  visit(element, "element", function (node) {
    const isTabContainer =
      node.tagName === "nav" ||
      (node.tagName === "div" &&
        Array.isArray(node.properties.className) &&
        (node.properties.className as string[]).includes("rm-Header-right"));

    if (!isTabContainer) return CONTINUE;

    visit(node, "element", function (subNode) {
      const href = subNode.properties?.href;
      if (
        subNode.tagName !== "a" ||
        typeof href !== "string" ||
        !href ||
        href.startsWith("http") ||
        href === "#" ||
        isAuthLink(href)
      ) {
        return CONTINUE;
      }

      if (seen.has(href)) return CONTINUE;
      seen.add(href);

      const title = findTitle(subNode, { delete: false });
      links.push({ name: title || getTitleFromLink(href), url: href });
      return CONTINUE;
    });

    return CONTINUE;
  });

  return links;
}
