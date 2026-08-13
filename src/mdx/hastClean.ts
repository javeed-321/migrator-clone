import type { Root as HastRoot } from "hast";
import { CONTINUE, visit } from "unist-util-visit";

/**
 * Cleanup that runs *before* the bridge, while the tree is still HTML.
 *
 * Everything here deletes markup that only ever made sense in a browser. If it
 * survived to the MDAST stage it would come out as stray text, blank lines or
 * attribute noise in the MDX.
 *
 * Upstream splits these across utils/breaks.ts, utils/className.ts,
 * utils/breadcrumbs.ts and utils/toc.ts. The last two are Docusaurus- and
 * GitBook-only — for ReadMe they are no-ops, so they are not ported here.
 */

/**
 * ReadMe's SuperHub theme (`rm-Article rm-Guides-SuperHub`) nests page furniture
 * *inside* the article: a breadcrumb, an "Updated X ago" line, a prev/next
 * pager, the "Did this page help you?" feedback widget, and a duplicate
 * table-of-contents aside. None of it is page content, so it is stripped by the
 * stable ReadMe class on each container. Every token here is matched exactly.
 *
 * Upstream never removes any of this for ReadMe — its breadcrumb/ToC passes are
 * Docusaurus-only and its copy-button pass is GitBook-only — so on SuperHub
 * markup all of it would otherwise leak into the MDX.
 */
const CHROME_CLASSES = [
  "rm-Breadcrumb", // the category breadcrumb above the title
  "UpdatedAt", // "Updated 5 months ago"
  "NextStepsDivider", // the rule that precedes the pager
  "rm-Pagination", // prev / next page links
  "rm-PageThumbs", // "Did this page help you? · Yes · No · Copy Page"
  "content-toc", // the on-page table-of-contents aside
];

export function removeChrome() {
  return function (tree: HastRoot): HastRoot {
    visit(tree, "element", function (node, index, parent) {
      const className = node.properties?.className;
      const isChrome =
        Array.isArray(className) &&
        (className as string[]).some((name) => CHROME_CLASSES.includes(name));

      if (isChrome && parent && typeof index === "number") {
        parent.children.splice(index, 1);
        // Re-visit this index — the next sibling has shifted into it.
        return [CONTINUE, index];
      }
      return CONTINUE;
    });
    return tree;
  };
}

/** ReadMe puts a `<br>` between almost every block. The parser spaces blocks out on its own. */
export function removeBreaks() {
  return function (tree: HastRoot): HastRoot {
    visit(tree, "element", function (node, index, parent) {
      if (node.tagName === "br" && parent && typeof index === "number") {
        parent.children.splice(index, 1);
        return [CONTINUE, index];
      }
      return CONTINUE;
    });
    return tree;
  };
}

/**
 * Every heading on a ReadMe page carries an anchor link to itself. Left in, each
 * heading renders as `## [](#setup)Setup`.
 */
export function removeHeadingAnchors() {
  return function (tree: HastRoot): HastRoot {
    visit(tree, "element", function (node) {
      if (!/^h[1-6]$/.test(node.tagName)) return CONTINUE;

      visit(node, "element", function (subNode, index, parent) {
        const href = subNode.properties.href;
        if (
          subNode.tagName === "a" &&
          typeof href === "string" &&
          href.startsWith("#") &&
          parent &&
          typeof index === "number"
        ) {
          // Keep whatever text the anchor wrapped; drop only the link itself.
          parent.children.splice(index, 1, ...subNode.children);
          return [CONTINUE, index];
        }
        return CONTINUE;
      });
      return CONTINUE;
    });
    return tree;
  };
}

/**
 * Markdown cannot express a class, an id or a style. Anything left on a node
 * here becomes a JSX attribute on the other side of the bridge.
 *
 * This must run *after* component detection — the scrapers match on class
 * names, so stripping them first would leave nothing to match.
 */
export function removeClassNames() {
  return function (tree: HastRoot): HastRoot {
    visit(tree, "element", function (node) {
      // `language-bash` is the one class with meaning on the other side: it is
      // where `hast-util-to-mdast` reads a fenced block's language from. Strip
      // it and every code block comes out untagged.
      const className = node.properties.className;
      const languages =
        (node.tagName === "code" || node.tagName === "pre") && Array.isArray(className)
          ? (className as string[]).filter((name) => name.startsWith("language-"))
          : [];

      if (languages.length) {
        node.properties.className = languages;
      } else {
        delete node.properties.className;
      }
      delete node.properties.style;
      delete node.properties.id;
    });
    return tree;
  };
}
