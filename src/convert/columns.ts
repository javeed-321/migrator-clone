import type { Parent, PhrasingContent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { toString as mdastToString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

import { convertCard, MAX_COLS } from "./cards";
import { attr, isJsx, liftInlineJsx, lineOf, readAttr, type ConversionNote } from "./mdast";

/**
 * Plan §2.3 — `<Columns>` / `<Column>` -> `<Columns>` / `<Card>`.
 *
 * **`<Columns>` takes `<Card>` children. Never `<div>`.** `[DAI §13]` offers a
 * `<div>` wrapper for plain content, but this project does not allow raw HTML in
 * MDX, so every column becomes a `<Card>` — or the content does not go in
 * `<Columns>` at all.
 *
 * That second branch is the important one. `<Card>` requires `title` *and* `href`,
 * so a column needs a heading and a destination. A column holding a table, a code
 * block, a procedure or several paragraphs is not card-shaped, and there is no
 * honest way to force it: inventing an `href` sends readers somewhere the author
 * never chose. Such a container is **unwrapped** — its columns' content is emitted
 * as consecutive blocks, in order, losing only the side-by-side layout — and the
 * page is flagged.
 *
 * Column count also changes shape: ReadMe derives it from the number of children
 * and has no `cols` prop, so `cols` is computed here.
 *
 * Not used anywhere in the Capillary corpus (0 occurrences), so this path exists
 * for the other ReadMe sites a migration will meet.
 */

/**
 * Block types that disqualify a column from becoming a card. Cards are short,
 * link-bearing summaries; a table or a fence inside one is a layout being abused.
 */
const NOT_CARD_CONTENT = new Set(["table", "code", "list", "blockquote", "thematicBreak", "heading"]);

/** Components that are themselves layout or structure, so never card bodies. */
const NOT_CARD_COMPONENTS = new Set([
  "Columns",
  "Cards",
  "Card",
  "Table",
  "Tabs",
  "Steps",
  "Accordion",
  "ExpandableGroup",
  "CodeGroup",
]);

/**
 * How many body paragraphs a card may hold before the column is treated as prose.
 * A judgement threshold, not a platform limit — the plan's wording is "several
 * paragraphs", and two is where a summary stops reading like one.
 */
const MAX_CARD_PARAGRAPHS = 2;

// ---------------------------------------------------------------------------
// Identification
// ---------------------------------------------------------------------------

function isColumns(node: RootContent | undefined): node is MdxJsxFlowElement {
  return node !== undefined && isJsx(node, "Columns");
}

function isColumn(node: RootContent | undefined): node is MdxJsxFlowElement {
  return node !== undefined && isJsx(node, "Column");
}

function isCard(node: RootContent | undefined): node is MdxJsxFlowElement {
  return node !== undefined && isJsx(node, "Card");
}

function meaningful(children: RootContent[]): RootContent[] {
  return children.filter((child) => !(child.type === "text" && child.value.trim().length === 0));
}

function isBlank(node: PhrasingContent): boolean {
  return node.type === "text" && node.value.trim().length === 0;
}

// ---------------------------------------------------------------------------
// Reading a card out of a column
// ---------------------------------------------------------------------------

/**
 * The card title comes from the column's own leading heading, or its bold lead-in
 * — the two ways an author signals "this is what this column is about".
 *
 * A bold lead-in is consumed from the paragraph and the rest of the sentence is
 * kept as body, so `**Sending a message** Use the POST endpoint.` yields the title
 * and the sentence, not one or the other.
 */
function extractTitle(children: RootContent[]): { title?: string; rest: RootContent[] } {
  const [first, ...others] = children;
  if (!first) return { rest: children };

  if (first.type === "heading") {
    return { title: mdastToString(first).trim(), rest: others };
  }

  if (first.type === "paragraph") {
    const inline = first.children.filter((child) => !isBlank(child));
    const lead = inline[0];
    if (lead?.type !== "strong") return { rest: children };

    const title = mdastToString(lead).trim();
    const tail = first.children.slice(first.children.indexOf(lead) + 1);

    // Drop the separator an author writes after a lead-in (": ", " — ", " - ").
    const trimmed = [...tail];
    const head = trimmed[0];
    if (head?.type === "text") {
      trimmed[0] = { ...head, value: head.value.replace(/^\s*[-—:–]?\s*/, "") };
    }
    const remaining = trimmed.filter((child) => !isBlank(child));

    return {
      title,
      rest: remaining.length > 0 ? [{ ...first, children: trimmed }, ...others] : others,
    };
  }

  return { rest: children };
}

/**
 * The `href` comes from the link the column already carries — never from anywhere
 * else, because a fabricated destination is invented content.
 *
 * A trailing link-only paragraph (`[Read the reference](doc:x)` on its own line) is
 * consumed: it *is* the card's link, and leaving it in the body would duplicate the
 * card's own affordance. A link embedded mid-sentence supplies the `href` but is
 * left in place, since removing it would rewrite the sentence.
 */
function extractHref(children: RootContent[]): { href?: string; rest: RootContent[] } {
  const last = children[children.length - 1];
  if (last?.type === "paragraph") {
    const inline = last.children.filter((child) => !isBlank(child));
    const only = inline[0];
    if (inline.length === 1 && only?.type === "link") {
      return { href: only.url, rest: children.slice(0, -1) };
    }
  }

  let found: string | undefined;
  for (const child of children) {
    visit(child, "link", (link) => {
      found ??= link.url;
    });
    // A column's link may still be an `<Anchor>`: the pass that unwraps those runs
    // last, so that link rewriting can run last. Reading it here keeps the two
    // passes independent instead of forcing an order between them.
    visit(child, (node) => {
      if (
        (node.type === "mdxJsxTextElement" || node.type === "mdxJsxFlowElement") &&
        node.name === "Anchor"
      ) {
        found ??= readAttr(node, "href");
      }
    });
    if (found) break;
  }
  return { href: found, rest: children };
}

type CardShape =
  | { ok: true; title: string; href: string; body: RootContent[] }
  | { ok: false; reason: string };

/**
 * Decides whether one `<Column>` can become a `<Card>`, and reads the pieces out
 * if it can. Every `ok: false` reason is phrased for a human report, because that
 * is where it ends up.
 */
export function cardShapeOf(column: MdxJsxFlowElement): CardShape {
  const children = meaningful(column.children as RootContent[]);
  if (children.length === 0) return { ok: false, reason: "the column is empty" };

  const { title, rest: afterTitle } = extractTitle(children);
  if (!title) {
    return { ok: false, reason: "no heading or bold lead-in to use as the card title" };
  }

  const { href, rest: body } = extractHref(afterTitle);
  if (!href) {
    return { ok: false, reason: "no link to use as the card href, and one must not be invented" };
  }
  if (body.length === 0) {
    return { ok: false, reason: "nothing left for the card body once the title and link are used" };
  }

  for (const child of body) {
    if (NOT_CARD_CONTENT.has(child.type)) {
      return { ok: false, reason: `the column contains a ${child.type}, which a card should not hold` };
    }
    if (
      (child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement") &&
      child.name !== null &&
      NOT_CARD_COMPONENTS.has(child.name)
    ) {
      return { ok: false, reason: `the column contains <${child.name}>, which a card should not hold` };
    }
  }

  const paragraphs = body.filter((child) => child.type === "paragraph").length;
  if (paragraphs > MAX_CARD_PARAGRAPHS) {
    return { ok: false, reason: `the column has ${paragraphs} paragraphs — it reads as prose, not a card` };
  }

  return { ok: true, title, href, body };
}

// ---------------------------------------------------------------------------
// Converting a container
// ---------------------------------------------------------------------------

/** ReadMe has no `cols` prop — the count is the number of children. */
function colsFor(count: number): string {
  return String(Math.min(MAX_COLS, Math.max(1, count || 1)));
}

/**
 * Converts one `<Columns>`.
 *
 * Returns `null` when it was converted in place, or the replacement nodes when the
 * container had to be unwrapped. The caller splices those in.
 */
export function convertColumnsContainer(
  node: MdxJsxFlowElement,
  notes: ConversionNote[],
): RootContent[] | null {
  const children = meaningful(node.children as RootContent[]);
  const layout = readAttr(node, "layout");

  // Already converted, or authored directly as Columns + Card: normalise `cols`
  // and hand the cards to the Card rules. This is the re-run path.
  if (children.length > 0 && children.every(isCard)) {
    node.attributes = [attr("cols", colsFor(children.length))];
    for (const card of children) convertCard(card, notes);
    return null;
  }

  const columns = children.filter(isColumn);
  const strays = children.filter((child) => !isColumn(child));

  for (const stray of strays) {
    notes.push({
      rule: "columns",
      level: "blocker",
      line: lineOf(stray),
      detail: `<Columns> holds a ${stray.type} that is not a <Column> — it cannot be placed in a card`,
    });
  }

  const shapes = columns.map((column) => ({ column, shape: cardShapeOf(column) }));
  const unusable = shapes.filter((entry) => !entry.shape.ok);

  /*
   * All or nothing. Converting the card-shaped columns and unwrapping the rest
   * would split one deliberate layout into a grid plus loose prose, which reads
   * worse than either. If any column cannot be a card, the whole container is
   * unwrapped and the page is flagged for a human.
   */
  if (unusable.length > 0 || columns.length === 0 || strays.length > 0) {
    for (const entry of unusable) {
      notes.push({
        rule: "columns",
        level: "blocker",
        line: lineOf(entry.column),
        detail: `<Column> cannot become a <Card>: ${entry.shape.ok ? "" : entry.shape.reason}`,
      });
    }

    const unwrapped = children.flatMap((child) =>
      isColumn(child) ? meaningful(child.children as RootContent[]) : [child],
    );

    notes.push({
      rule: "columns",
      level: "blocker",
      line: lineOf(node),
      detail: `unwrapped <Columns> into ${unwrapped.length} consecutive block${unwrapped.length === 1 ? "" : "s"} — the content is kept, the side-by-side layout is not`,
    });

    return unwrapped;
  }

  const cards: MdxJsxFlowElement[] = shapes.map(({ column, shape }) => {
    // Narrowed by the guard above; asserted so the map stays readable.
    const { title, href, body } = shape as { title: string; href: string; body: RootContent[] };
    const card: MdxJsxFlowElement = {
      type: "mdxJsxFlowElement",
      name: "Card",
      attributes: [attr("title", title), attr("href", href)],
      children: body as MdxJsxFlowElement["children"],
      ...(column.position ? { position: column.position } : {}),
    };
    return card;
  });

  node.attributes = [attr("cols", colsFor(cards.length))];
  node.children = cards;

  if (layout !== undefined) {
    notes.push({
      rule: "columns",
      level: "change",
      line: lineOf(node),
      detail: `dropped layout="${layout}" — equal widths is what cols already gives, and content-sized columns have no target equivalent`,
    });
  }
  notes.push({
    rule: "columns",
    level: "change",
    line: lineOf(node),
    detail: `${cards.length} <Column> -> <Card> inside <Columns cols="${colsFor(cards.length)}">`,
  });

  // Let the Card rules validate and normalise what was just built.
  for (const card of cards) convertCard(card, notes);
  return null;
}

// ---------------------------------------------------------------------------
// The walk
// ---------------------------------------------------------------------------

/**
 * Converts every `<Columns>` on a page, and reports any `<Column>` left stranded
 * outside one.
 */
export function convertColumns(root: Root | Parent, notes: ConversionNote[]): void {
  // `Card` is in the set as well as `Columns`/`Column`: a short card serialises to
  // a single line, which parses back as inline JSX. Without it, the
  // already-converted branch below would not recognise this module's own output
  // and would unwrap a perfectly good grid on the second run.
  liftInlineJsx(root, new Set(["Columns", "Column", "Card"]), notes);

  const children = root.children as RootContent[];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    /*
     * Read the tag name once and branch on it, rather than chaining type guards.
     * Two guards that both narrow to `MdxJsxFlowElement` make TypeScript exclude
     * that type from the second branch entirely — the first guard's negative case
     * narrows it away — and the second branch stops compiling.
     */
    const tag = child.type === "mdxJsxFlowElement" ? child.name : null;

    if (tag === "Columns") {
      /*
       * Descend into each column's *content* — but never into the `<Columns>` node
       * through the generic branch below. Doing so would reach its `<Column>`
       * children as if they were stranded and unwrap every one of them before this
       * container was ever judged, silently turning every grid into loose prose.
       */
      const container = child as MdxJsxFlowElement;
      for (const inner of container.children as RootContent[]) {
        if (isColumn(inner)) convertColumns(inner, notes);
      }

      const replacement = convertColumnsContainer(container, notes);
      if (replacement) {
        children.splice(i, 1, ...replacement);
        i += replacement.length - 1;
      }
      continue;
    }

    // A `<Column>` with no `<Columns>` around it: unwrap it so the content
    // survives, and report it — the tag has no meaning on the target.
    if (tag === "Column") {
      const stranded = child as MdxJsxFlowElement;
      const inner = meaningful(stranded.children as RootContent[]);
      children.splice(i, 1, ...inner);
      i += inner.length - 1;
      notes.push({
        rule: "columns",
        level: "blocker",
        line: lineOf(stranded),
        detail: "<Column> outside any <Columns> — unwrapped, since the tag does not exist on Documentation.AI",
      });
      continue;
    }

    if ("children" in child && Array.isArray((child as Parent).children)) {
      convertColumns(child as Parent, notes);
    }
  }
}
