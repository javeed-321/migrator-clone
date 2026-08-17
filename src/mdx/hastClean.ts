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

export interface CleanAttributesOptions {
  /**
   * Drop classes that are generated rather than authored — CSS-module names
   * carrying a build hash, e.g. `SuperHubDoc-article3ArTrEavUTKg`.
   *
   * These reference a stylesheet that is not migrating, so they can never
   * match anything on the target site. Keeping them only adds noise.
   */
  dropHashedClassNames?: boolean;
  /** Keep `class` as a JSX `className`. */
  keepClassNames?: boolean;
  /**
   * Keep `id`. Off by default: ReadMe emits ids that collide once several
   * pages are concatenated, and duplicate ids are invalid HTML.
   */
  keepIds?: boolean;
  /** Keep inline `style`, converted to a JSX object expression at the bridge. */
  keepStyles?: boolean;
}

/**
 * A CSS-module class: a readable prefix followed by a build hash, with no
 * separator. Matching on "ends in a long mixed-case/digit run" is deliberately
 * conservative — `rm-Article`, `callout_info` and `language-json` all survive.
 */
const HASHED_CLASS = /[A-Za-z]-?[A-Za-z0-9_-]*[a-z][A-Z0-9][A-Za-z0-9_-]{6,}$/;

/**
 * Normalises presentational attributes before the bridge.
 *
 * Upstream deletes `className` outright here, on the reasoning that Markdown
 * cannot express one. That is true of Markdown but not of MDX: anything left on
 * a node is printed as a JSX attribute on the other side, so inline styles and
 * classes can be carried across intact. This keeps them and lets
 * `hastPropsToJsxAttributes` put them into JSX form at the bridge.
 *
 * This must still run *after* component detection — the scrapers match on class
 * names, so stripping anything first would leave nothing to match.
 */
export function cleanAttributes(options: CleanAttributesOptions = {}) {
  const {
    keepClassNames = true,
    keepStyles = true,
    keepIds = false,
    dropHashedClassNames = true,
  } = options;

  return function (tree: HastRoot): HastRoot {
    visit(tree, "element", function (node) {
      const className = node.properties.className;
      const classes = Array.isArray(className) ? (className as string[]) : [];

      // `language-bash` is the one class with meaning to the bridge itself: it
      // is where `hast-util-to-mdast` reads a fenced block's language from.
      // Strip it and every code block comes out untagged, so it is kept even
      // when class names are otherwise switched off.
      const isCode = node.tagName === "code" || node.tagName === "pre";
      const languages = isCode ? classes.filter((name) => name.startsWith("language-")) : [];

      let kept = keepClassNames ? classes : languages;
      if (keepClassNames && dropHashedClassNames) {
        kept = kept.filter((name) => languages.includes(name) || !HASHED_CLASS.test(name));
      }

      if (kept.length) node.properties.className = kept;
      else delete node.properties.className;

      if (!keepStyles) delete node.properties.style;
      if (!keepIds) delete node.properties.id;
    });
    return tree;
  };
}
