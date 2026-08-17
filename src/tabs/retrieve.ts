import type { Root as HastRoot, Element } from "hast";
import { visit, EXIT, CONTINUE } from "unist-util-visit";

import type { Tab } from "../types/nav";
import { hasClassName } from "../utils/className";
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
/**
 * The blocks inside `header.rm-Header` that hold tab links.
 *
 * `rm-Header-left` is the one that matters and it used to be missing. ReadMe
 * renders the tab bar there on every site; some sites *also* render a duplicate
 * copy inside a `<nav>`, and reading only that duplicate is why Capillary
 * worked while Flutterwave, Miro, Front, Rollbar and Split silently returned
 * zero tabs — and were then scraped as single-tab sites. Front lost 100 of its
 * 173 pages that way, Miro 143 of 337, with no error raised.
 *
 * `rm-Header-top` is deliberately absent: it holds the "Jump to Content"
 * skip-link (`#content`), which is not a tab.
 *
 * Duplicates across blocks collapse on the `seen` href set below.
 */
const TAB_CONTAINER_CLASSES = ["rm-Header-left", "rm-Header-right", "rm-Header-bottom"];

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
        TAB_CONTAINER_CLASSES.some((className) => hasClassName(node, className)));

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
