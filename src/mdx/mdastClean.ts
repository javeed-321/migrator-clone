import type { InlineCode, Parent, Root as MdastRoot } from "mdast";
import { CONTINUE, visit } from "unist-util-visit";

/**
 * Cleanup that runs *after* the bridge, on Markdown nodes.
 *
 * The split matters: a plugin here can see `paragraph`, `list` and `tableCell`
 * nodes, which do not exist on the HAST side. Upstream registers
 * `unifiedRemoveEmptyParagraphs` before the bridge, where it visits `paragraph`
 * on a tree that only ever contains `element` nodes — so it never fires. It is
 * run on this side instead.
 */

/**
 * Wrapping a single element in a fresh root is what `scrapePage` does to isolate
 * the article; nested roots are the leftovers of that, plus of every component
 * whose children were converted early.
 */
export function removeNestedRoots() {
  return function (root: MdastRoot): MdastRoot {
    visit(root, "root", function (node, _index, parent) {
      if (!parent) return CONTINUE;
      (parent as MdastRoot).children = node.children;
      return CONTINUE;
    });
    return root;
  };
}

/** `<p></p>` spacers become blank paragraphs that print as stray newlines. */
export function removeEmptyParagraphs() {
  return function (root: MdastRoot): MdastRoot {
    visit(root, "paragraph", function (node, index, parent) {
      const isEmpty = node.children.every(
        (child) =>
          (child.type === "text" && child.value.trim() === "") ||
          ("children" in child && child.children.length === 0)
      );
      if (isEmpty && parent && typeof index === "number") {
        parent.children.splice(index, 1);
        return [CONTINUE, index];
      }
      return CONTINUE;
    });
    return root;
  };
}

/** ReadMe stacks `<ol>`s directly on each other; without a gap they merge into one list. */
export function spaceListsOut() {
  return function (root: MdastRoot): MdastRoot {
    visit(root, "list", function (_node, index, parent) {
      if (!parent || typeof index !== "number" || index === 0) return CONTINUE;
      if (parent.children[index - 1]?.type === "list") {
        parent.children.splice(index, 0, { type: "paragraph", children: [] });
        return [CONTINUE, index + 1];
      }
      return CONTINUE;
    });
    return root;
  };
}

/** "Updated 3 days ago" — ReadMe's page footer. */
export function removeUpdatedAt() {
  return function (root: MdastRoot): MdastRoot {
    visit(root, "text", function (node, index, parent) {
      const value = node.value.trim();
      const isTimestamp =
        (value.startsWith("Updated") || value.startsWith("Last updated")) && value.endsWith("ago");
      if (isTimestamp && parent && typeof index === "number") {
        parent.children.splice(index, 1);
        return [CONTINUE, index];
      }
      return CONTINUE;
    });
    return root;
  };
}

/** The rule + timestamp ReadMe closes every page with. */
export function removeBottomMetadata() {
  return function (root: MdastRoot): MdastRoot {
    const last = root.children.at(-1);
    if (last?.type === "paragraph" && last.children.length === 0) root.children.pop();
    if (root.children.at(-1)?.type === "thematicBreak") root.children.pop();
    return root;
  };
}

/** ReadMe allows `<pre>` inside table cells; a fenced block cannot live in a cell. */
export function inlineCodeBlocksInCells() {
  return function (root: MdastRoot): MdastRoot {
    visit(root, "tableCell", function (cell) {
      // A `code` node is not valid inside a table cell per the mdast types, so
      // the cell is widened — the tree really can contain one, which is the
      // whole reason this plugin exists.
      visit(cell as unknown as MdastRoot, "code", function (node, index, parent) {
        if (!parent || typeof index !== "number") return CONTINUE;
        const inline: InlineCode = { type: "inlineCode", value: node.value };
        (parent as Parent).children[index] = inline;
        return CONTINUE;
      });
      return CONTINUE;
    });
    return root;
  };
}

/** `** bold **` is not bold — the padding has to move outside the marker. */
export function formatEmphasis() {
  return function (root: MdastRoot): MdastRoot {
    visit(root, ["emphasis", "strong"], function (node, index, parent) {
      if (node.type !== "emphasis" && node.type !== "strong") return CONTINUE;

      // Drop the marker entirely when there is nothing inside it.
      if (node.children.length === 0 && parent && typeof index === "number") {
        parent.children.splice(index, 1);
        return [CONTINUE, index];
      }

      const child = node.children[0];
      if (
        node.children.length !== 1 ||
        child?.type !== "text" ||
        !parent ||
        typeof index !== "number"
      ) {
        return CONTINUE;
      }

      const leading = child.value.startsWith(" ");
      const trailing = child.value.endsWith(" ");
      if (!leading && !trailing) return CONTINUE;

      child.value = child.value.trim();
      if (trailing && parent.children.length > index + 1) {
        parent.children.splice(index + 1, 0, { type: "text", value: " " });
      }
      if (leading && index !== 0) {
        parent.children.splice(index, 0, { type: "text", value: " " });
      }
      return CONTINUE;
    });
    return root;
  };
}

/** A heading that links to itself prints as `## [](#setup)Setup`. */
export function convertHeaderLinksToText() {
  return function (root: MdastRoot): MdastRoot {
    visit(root, "heading", function (heading) {
      visit(heading, "link", function (node, index, parent) {
        if (node.url.startsWith("#") && parent && typeof index === "number") {
          parent.children.splice(index, 1, ...node.children);
          return [CONTINUE, index];
        }
        return CONTINUE;
      });
      return CONTINUE;
    });
    return root;
  };
}
