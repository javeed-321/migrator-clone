import type { Parent, PhrasingContent, Root, RootContent } from "mdast";

import { lineOf, type ConversionNote } from "./mdast";

/**
 * Plan §3.6 — layout wrappers and manual spacing hacks are removed.
 *
 * These are the leftovers of writing in a markdown editor: a `<p></p>` used as a
 * blank line, a run of `&nbsp;` standing in for indentation. Neither says anything
 * about the content, and markdown expresses both natively.
 *
 * | Source | What happens |
 * |---|---|
 * | `<p></p>` | **deleted** — it was vertical padding |
 * | `<p>Some content</p>` | **unwrapped** — a `<p>` around content *is* a paragraph |
 * | `<div>…</div>`, styled or not | **left as authored** |
 * | `&nbsp;&nbsp;` between words | one ordinary space |
 *
 * A `<div>` is deliberately untouched: the target renders it, and a container
 * someone wrote is theirs to keep. Note that a string `style="…"` on one is a
 * React error there — `style` takes an object — so a styled wrapper that came
 * through will need fixing by hand; that is a separate decision from deleting it.
 *
 * ## The one place a non-breaking space is not noise
 *
 * Inside a table's **first cell** it is load-bearing — an NBSP ladder is how the
 * corpus encodes nested-parameter depth, and `TableConversion.md` turns those into
 * em-spaces so the nesting survives GFM. Table cells are therefore skipped
 * entirely here. The table pass runs first, so anything it needed is already
 * converted by the time this sees the page.
 */

/**
 * Only `<p>`.
 *
 * `<div>` and the other containers are **left exactly as authored**. The target
 * compiles a lowercase tag as an intrinsic element, so a `<div>` renders — and a
 * wrapper someone wrote on purpose is not this converter's to discard.
 *
 * `<p>` is the exception because markdown *is* paragraphs: an empty one is a blank
 * line someone typed as a tag, and one holding content is a paragraph written the
 * long way. Neither carries anything the markdown form does not.
 */
const WRAPPERS = new Set(["p"]);

/** `<p …>` / `</p>` as raw text, on a page the MDX parser rejected. */
const RAW_WRAPPER = /^<\/?([A-Za-z][A-Za-z0-9-]*)\b[^>]*>$/;

const NBSP = / +/g;

function isWrapper(name: string | null | undefined): boolean {
  return typeof name === "string" && WRAPPERS.has(name.toLowerCase());
}

/** Content that would survive the wrapper being removed. */
function meaningful(children: readonly RootContent[]): RootContent[] {
  return children.filter(
    (child) => !(child.type === "text" && child.value.trim().length === 0),
  );
}

/**
 * Collapses runs of non-breaking spaces to one ordinary space.
 *
 * Returns the number replaced, so the caller can report it — an NBSP is invisible
 * in a diff, and a silent change to whitespace is the kind of thing that is
 * noticed much later.
 */
function normaliseSpaces(children: PhrasingContent[]): number {
  let replaced = 0;

  for (const node of children) {
    if (node.type === "text" && NBSP.test(node.value)) {
      replaced += node.value.match(NBSP)?.length ?? 0;
      node.value = node.value.replace(NBSP, " ");
      continue;
    }
    if ("children" in node && Array.isArray(node.children)) {
      replaced += normaliseSpaces(node.children as PhrasingContent[]);
    }
  }

  return replaced;
}

/** Unwraps every inline wrapper in a run of phrasing content. */
function unwrapInline(children: PhrasingContent[], removed: string[]): PhrasingContent[] | undefined {
  const out: PhrasingContent[] = [];
  let changed = false;

  for (const node of children) {
    if (node.type === "mdxJsxTextElement" && isWrapper(node.name)) {
      const inner = unwrapInline(node.children as PhrasingContent[], removed);
      out.push(...((inner ?? node.children) as PhrasingContent[]));
      removed.push(`<${node.name}>`);
      changed = true;
      continue;
    }

    if ("children" in node && Array.isArray(node.children)) {
      const inner = unwrapInline(node.children as PhrasingContent[], removed);
      if (inner) {
        node.children = inner as never;
        changed = true;
      }
    }
    out.push(node);
  }

  return changed ? out : undefined;
}

/**
 * Removes every `<p>` tag and spacing hack on a page.
 *
 * Runs after the table pass, which has already settled what a cell's indentation
 * is; nothing here reaches into one.
 */
export function convertWrappers(root: Root | Parent, notes: ConversionNote[]): void {
  const removed: string[] = [];
  let spaces = 0;

  const walk = (node: Parent): void => {
    // A table cell's whitespace is content — the table pass owns it.
    if (node.type === "tableCell") return;

    const children = node.children as RootContent[];

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (!child) continue;

      if (child.type === "mdxJsxFlowElement" && isWrapper(child.name)) {
        const inner = meaningful(child.children as RootContent[]);
        removed.push(`<${child.name}>`);
        // Empty: it was a spacer, and nothing replaces it. Otherwise the wrapper
        // dissolves and its children take its place in the parent.
        children.splice(i, 1, ...inner);
        i -= 1;
        continue;
      }

      // The same wrapper as raw text, on a page that fell back to the plain
      // parser: the opening and closing tags are separate siblings with ordinary
      // content between them, so dropping both leaves the content in place.
      if (child.type === "html") {
        const tag = RAW_WRAPPER.exec(child.value.trim());
        if (tag?.[1] && isWrapper(tag[1])) {
          removed.push(child.value.trim());
          children.splice(i, 1);
          i -= 1;
          continue;
        }
      }

      if (child.type === "paragraph" || child.type === "heading") {
        const unwrapped = unwrapInline(child.children as PhrasingContent[], removed);
        if (unwrapped) child.children = unwrapped as never;
        spaces += normaliseSpaces(child.children as PhrasingContent[]);
        // A paragraph that held nothing but a spacer has nothing left to show.
        if (meaningful(child.children as RootContent[]).length === 0) {
          children.splice(i, 1);
          i -= 1;
        }
        continue;
      }

      if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);
    }
  };

  walk(root as Parent);

  if (removed.length > 0) {
    const distinct = [...new Set(removed)];
    notes.push({
      rule: "wrapper",
      level: "change",
      line: lineOf(root as { position?: { start: { line: number } } }),
      detail: `removed ${removed.length} <p> tag${removed.length === 1 ? "" : "s"} (${distinct.slice(0, 5).join(", ")}${distinct.length > 5 ? `, +${distinct.length - 5} more` : ""}) — an empty one was a blank line, and one holding content is a paragraph written the long way`,
    });
  }

  if (spaces > 0) {
    notes.push({
      rule: "wrapper",
      level: "change",
      detail: `replaced ${spaces} run${spaces === 1 ? "" : "s"} of non-breaking spaces with ordinary ones — they were padding, and an invisible character is not spacing`,
    });
  }
}
