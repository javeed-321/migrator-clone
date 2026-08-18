import type { Paragraph, Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { toString as mdastToString } from "mdast-util-to-string";

import { parseMarkdown } from "../download/parse";
import { attr, liftInlineJsx, lineOf, readAttr, type ConversionNote } from "./mdast";

/**
 * Plan §3.3 — raw `<details>` / `<summary>` -> `<Expandable>`.
 *
 * **[CORPUS]** 8 blocks across 3 pages `[RM §10.1]`. Authors did not reach for raw
 * HTML by preference: ReadMe's built-in `<Accordion>` **starts closed and has no
 * open prop** `[RM §12 gotcha 13]`, so `<details open>` was the only way to ship a
 * section that is expanded on arrival. That is the whole reason these exist, and
 * it is why `open` is the one attribute here that carries meaning.
 *
 * | Source | Target |
 * |---|---|
 * | `<details><summary>Q</summary>A</details>` | `<Expandable title="Q" default-open="false">A</Expandable>` |
 * | `<details open>` | `<Expandable … default-open="true">` `[DAI §11]` |
 * | Two or more adjacent | one `<ExpandableGroup>`, as in §2.1 |
 *
 * Documentation.AI's support for raw `<details>` is undocumented (plan §3.2,
 * `NEEDS VERIFICATION`) and this project emits no raw HTML at all, so passing it
 * through is not an option even if the platform would render it.
 *
 * ## The four shapes this has to match
 *
 * `<details>` is lowercase, so it is valid JSX *and* valid HTML, and it reaches
 * this pass in four different forms depending on how the page parsed:
 *
 * 1. **Flow JSX** — the page is strict MDX: an `mdxJsxFlowElement` named
 *    `details`, with `<summary>` as an inline element inside its first paragraph.
 * 2. **Inline JSX** — written on one line, so the whole block is an
 *    `mdxJsxTextElement` inside a paragraph. `liftInlineJsx` normalises it.
 * 3. **A run of `html` nodes** — the page fell back to plain GFM (one unclosed
 *    `<br>` anywhere is enough). The open tag and the body and the close tag are
 *    then *three separate siblings* with ordinary markdown between them, not a
 *    subtree.
 * 4. **One `html` node** — same fallback, but written with no blank lines, so
 *    remark swallowed the whole block into a single node.
 *
 * Handling only the first shape would silently drop the block on exactly the
 * pages most likely to contain it — the ones with raw HTML elsewhere.
 */

/** `<details …>` opening a raw-HTML block. */
const OPEN = /<details\b([^>]*)>/i;
/** `<summary …>…</summary>`, anywhere in the same html node. */
const SUMMARY = /<summary\b[^>]*>([\s\S]*?)<\/summary>/i;
const CLOSE = /<\/details\s*>/i;

/**
 * Whether `open` is set.
 *
 * `<details open>` parses with a **null** attribute value, which `readAttr`
 * reports as `"true"`. Only an explicit `open="false"` / `open={false}` means
 * closed.
 */
function startsOpen(value: string | undefined): boolean {
  return value !== undefined && value.trim().toLowerCase() !== "false";
}

/**
 * The title, as a plain string.
 *
 * `mdastToString` resolves inline code and emphasis to their text, because
 * `title` is a plain string attribute and cannot carry markdown — the same
 * constraint `<Step title>` has.
 */
function titleFrom(node: unknown): string {
  return mdastToString(node).replace(/\s+/g, " ").trim();
}

/** Builds the `<Expandable>`, and reports what was and was not carried across. */
function expandable(
  title: string | undefined,
  open: boolean,
  body: RootContent[],
  line: number | undefined,
  notes: ConversionNote[],
): MdxJsxFlowElement {
  notes.push({
    rule: "details",
    level: "change",
    line,
    detail: `<details${open ? " open" : ""}> -> <Expandable${title ? ` title="${title}"` : ""} default-open="${open}">`,
  });

  if (!title) {
    notes.push({
      rule: "details",
      level: "flag",
      line,
      detail: '<details> had no <summary> — <Expandable> will show its "Click to expand" default',
    });
  }

  return {
    type: "mdxJsxFlowElement",
    name: "Expandable",
    attributes: [
      ...(title ? [attr("title", title)] : []),
      // Always explicit. `default-open` defaults to `false` on the target, but
      // writing it down records which of the two states the source chose — and
      // for `<details open>` that state was the entire point of the raw HTML.
      attr("default-open", String(open)),
    ],
    children: body as MdxJsxFlowElement["children"],
  };
}

/**
 * Shape 1/2 — a `<details>` that parsed as a JSX element.
 *
 * The `<summary>` is an *inline* element inside the first paragraph, so it is
 * lifted out of that paragraph rather than out of the children list. Whatever
 * text follows it on the same line is body content and stays.
 */
function convertJsxDetails(node: MdxJsxFlowElement, notes: ConversionNote[]): MdxJsxFlowElement {
  const body = [...node.children] as RootContent[];
  let title: string | undefined;

  const first = body[0];
  if (first?.type === "paragraph") {
    const index = first.children.findIndex(
      (child) => child.type === "mdxJsxTextElement" && child.name === "summary",
    );
    if (index !== -1) {
      title = titleFrom(first.children[index]);
      const rest = first.children.filter((_, at) => at !== index);
      // Drop the newline the summary tag left behind, so the body does not open
      // with a blank line.
      const head = rest[0];
      if (head?.type === "text") head.value = head.value.replace(/^\s+/, "");
      const remaining = rest.filter((child) => !(child.type === "text" && child.value.trim() === ""));
      if (remaining.length === 0) body.shift();
      else body[0] = { type: "paragraph", children: remaining } as Paragraph;
    }
  }

  return expandable(title, startsOpen(readAttr(node, "open")), body, lineOf(node), notes);
}

/** Parses a fragment recovered from raw HTML back into nodes. */
function nodesFrom(source: string, notes: ConversionNote[]): RootContent[] {
  const { tree } = parseMarkdown(source);
  convertDetails(tree, notes);
  return tree.children;
}

/** `<summary>` text pulled out of a raw-HTML string. */
function summaryFrom(html: string, notes: ConversionNote[]): { title?: string; rest: string } {
  const match = SUMMARY.exec(html);
  if (!match) return { rest: html };

  const { tree } = parseMarkdown(match[1] ?? "");
  const title = titleFrom(tree);
  return { ...(title ? { title } : {}), rest: html.replace(match[0], "") };
}

/**
 * Shape 3/4 — a `<details>` that arrived as raw `html` nodes on a page that fell
 * back to the plain-markdown parser.
 *
 * Returns the number of sibling nodes consumed, or `0` when this is not the head
 * of a convertible block. A `<details>` with no matching close, or an open node
 * carrying markup this pass does not recognise, is **left exactly as it was** and
 * reported: rewriting it on a guess would destroy the only copy of its content.
 */
function convertHtmlDetails(
  children: RootContent[],
  start: number,
  notes: ConversionNote[],
): number {
  const head = children[start];
  if (head?.type !== "html") return 0;

  const open = OPEN.exec(head.value);
  if (!open || open.index !== head.value.search(/\S/)) return 0;

  const line = lineOf(head);
  const attributes = open[1] ?? "";
  const isOpen = /\bopen\b/i.test(attributes) && !/\bopen\s*=\s*["{]?false/i.test(attributes);

  // Shape 4: the whole block in one node.
  const selfContained = head.value.slice(open.index + open[0].length);
  if (CLOSE.test(selfContained)) {
    const inner = selfContained.slice(0, selfContained.search(CLOSE));
    const tail = selfContained.slice(selfContained.search(CLOSE)).replace(CLOSE, "").trim();
    if (tail.length > 0) {
      notes.push({
        rule: "details",
        level: "blocker",
        line,
        detail: `raw <details> block has HTML after its closing tag (${tail.slice(0, 40)}) — left in place rather than rewritten on a guess`,
      });
      return 0;
    }
    const { title, rest } = summaryFrom(inner, notes);
    children.splice(start, 1, expandable(title, isOpen, nodesFrom(rest, notes), line, notes));
    return 1;
  }

  // Shape 3: open tag, body siblings, close tag. Count depth so a nested block
  // does not close its parent.
  let depth = 1;
  let end = -1;
  for (let i = start + 1; i < children.length; i += 1) {
    const node = children[i];
    if (node?.type !== "html") continue;
    for (const token of node.value.match(/<\/?details\b[^>]*>/gi) ?? []) {
      depth += /^<\//.test(token) ? -1 : 1;
    }
    if (depth === 0) {
      end = i;
      break;
    }
  }

  if (end === -1) {
    notes.push({
      rule: "details",
      level: "blocker",
      line,
      detail: "raw <details> has no closing tag — left in place, since guessing where it ends would move content into or out of the block",
    });
    return 0;
  }

  const closer = children[end];
  if (closer?.type === "html" && closer.value.replace(CLOSE, "").trim().length > 0) {
    notes.push({
      rule: "details",
      level: "blocker",
      line,
      detail: "raw <details> shares its closing tag with other HTML — left in place rather than rewritten on a guess",
    });
    return 0;
  }

  const { title, rest } = summaryFrom(head.value.slice(open.index + open[0].length), notes);
  if (rest.trim().length > 0) {
    notes.push({
      rule: "details",
      level: "blocker",
      line,
      detail: `raw <details> opens with HTML this converter does not recognise (${rest.trim().slice(0, 40)}) — left in place`,
    });
    return 0;
  }

  const body = children.slice(start + 1, end);
  for (const node of body) {
    if (node && "children" in node) convertDetails(node as Parent, notes);
  }

  children.splice(start, end - start + 1, expandable(title, isOpen, body, line, notes));
  return 1;
}

/**
 * Collapses runs of adjacent siblings into one `<ExpandableGroup>`, exactly as
 * §2.1 does for accordions and for the same reason: a stack of FAQ entries is one
 * group, and emitting bare siblings renders unrelated boxes instead.
 *
 * Only the nodes *this pass* produced are grouped. An `<Expandable>` that was
 * already in the source is the author's own, and its grouping is their decision.
 */
function groupRuns(children: RootContent[], made: Set<RootContent>, notes: ConversionNote[]): void {
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child || !made.has(child)) continue;

    let end = i;
    while (end + 1 < children.length && made.has(children[end + 1] as RootContent)) end += 1;
    if (end === i) continue;

    const run = children.slice(i, end + 1) as MdxJsxFlowElement[];
    const group: MdxJsxFlowElement = {
      type: "mdxJsxFlowElement",
      name: "ExpandableGroup",
      attributes: [],
      children: run,
    };
    children.splice(i, run.length, group);

    notes.push({
      rule: "details",
      level: "change",
      line: lineOf(run[0] ?? group),
      detail: `${run.length} adjacent <details> blocks -> one <ExpandableGroup>`,
    });
  }
}

/**
 * Converts every `<details>` on a page, in whichever of the four shapes it
 * arrived in.
 *
 * Recurses into containers first, so a `<details>` nested inside a `<Tab>` or a
 * `<Step>` is converted — and grouped — within its own parent rather than across
 * it.
 */
export function convertDetails(root: Root | Parent, notes: ConversionNote[]): void {
  // A one-line `<details><summary>Q</summary>A</details>` parses as inline JSX.
  liftInlineJsx(root, new Set(["details"]), notes);

  const children = root.children as RootContent[];

  for (const child of children) {
    if (child && "children" in child && Array.isArray((child as Parent).children)) {
      convertDetails(child as Parent, notes);
    }
  }

  const made = new Set<RootContent>();

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    if (child.type === "mdxJsxFlowElement" && child.name === "details") {
      const converted = convertJsxDetails(child, notes);
      children[i] = converted;
      made.add(converted);
      continue;
    }

    if (child.type === "html" && convertHtmlDetails(children, i, notes) > 0) {
      made.add(children[i] as RootContent);
    }
  }

  groupRuns(children, made, notes);
}
