import type { Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { visit } from "unist-util-visit";

import { lucideIcon } from "./icons";
import { attr, isJsx, liftInlineJsx, lineOf, readAttr, type ConversionNote } from "./mdast";

/**
 * Plan §2.2 — `<Cards>` / `<Card>` -> `<Columns>` / `<Card>`.
 *
 * Three things make this a rebuild rather than a rename:
 *
 * 1. **There is no `<Cards>` container on Documentation.AI.** The grid *is*
 *    `<Columns>`, and `<Card>` sits directly inside it. Note the direction of the
 *    rule: on ReadMe `Cards` has its own grid and cards need *not* be inside
 *    `Columns`; on Documentation.AI a grid of cards must be.
 * 2. **Column count is expressed differently.** ReadMe's `columns` defaults to
 *    `auto-fit`, so the number is often implicit in the child count; the target
 *    needs an explicit `cols`, capped at 5.
 * 3. **`title` and `href` are required on the target `<Card>`** and optional on
 *    ReadMe's. A card with an icon and a body but no link is valid source and
 *    invalid output — so it is reported as a blocker, never given an invented
 *    destination.
 *
 * Not used anywhere in the Capillary corpus (0 occurrences of either tag), so this
 * path exists for the other ReadMe sites a migration will meet.
 */

/** Documentation.AI's grid caps at 5 columns. */
export const MAX_COLS = 5;

// ---------------------------------------------------------------------------
// Identification
// ---------------------------------------------------------------------------

function isCards(node: RootContent | undefined): node is MdxJsxFlowElement {
  return node !== undefined && isJsx(node, "Cards");
}

function isCard(node: RootContent | undefined): node is MdxJsxFlowElement {
  return node !== undefined && isJsx(node, "Card");
}

/** Children that carry content — whitespace-only text nodes are formatting. */
function meaningfulChildren(node: MdxJsxFlowElement): RootContent[] {
  return (node.children as RootContent[]).filter(
    (child) => !(child.type === "text" && child.value.trim().length === 0),
  );
}

/** Names a node for a report — `<Callout>` reads better than `mdxJsxFlowElement`. */
function describeNode(node: RootContent): string {
  if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
    return `<${node.name ?? "fragment"}>`;
  }
  return `a ${node.type}`;
}

/** True when a card has body content, which the target requires. */
function hasBody(node: MdxJsxFlowElement): boolean {
  return meaningfulChildren(node).length > 0;
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

/**
 * Converts one `<Card>` in place. The tag name is the same on both platforms;
 * everything interesting is in the attributes.
 *
 * Dropped, because the target has no equivalent: `iconColor`, `badge`, `kind`
 * (ReadMe's `card`/`tile` variants) and `LinkComponent` (internal to ReadMe).
 *
 * Never invented, because the source carries no signal for them: `image`, `cta`
 * and `horizontal` are target-only additions a human may add later.
 */
export function convertCard(node: MdxJsxFlowElement, notes: ConversionNote[]): void {
  const title = readAttr(node, "title");
  const href = readAttr(node, "href");
  const icon = readAttr(node, "icon");
  const target = readAttr(node, "target");
  const dropped = (["iconColor", "badge", "kind", "LinkComponent"] as const).filter(
    (name) => readAttr(node, name) !== undefined,
  );

  const mapped = lucideIcon(icon);
  const attributes = [
    ...(title === undefined ? [] : [attr("title", title)]),
    ...(href === undefined ? [] : [attr("href", href)]),
    ...(mapped ? [attr("icon", mapped)] : []),
    ...(target === undefined ? [] : [attr("target", target)]),
  ];
  node.attributes = attributes;

  /*
   * The three required-on-target props. Each is a BLOCK, not a guess: a fabricated
   * href sends readers somewhere the author never chose, and a fabricated title or
   * body is invented content. The card is still emitted with what it does have, so
   * the page stays readable while the note keeps it out of a clean run.
   */
  if (title === undefined) {
    notes.push({
      rule: "card",
      level: "blocker",
      line: lineOf(node),
      detail: "<Card> has no title, which is required on Documentation.AI",
    });
  }
  if (href === undefined) {
    notes.push({
      rule: "card",
      level: "blocker",
      line: lineOf(node),
      detail: `<Card${title === undefined ? "" : ` title="${title}"`}> has no href, which is required on Documentation.AI — supply the destination or make it plain content`,
    });
  }
  if (!hasBody(node)) {
    notes.push({
      rule: "card",
      level: "blocker",
      line: lineOf(node),
      detail: `<Card${title === undefined ? "" : ` title="${title}"`}> has no body, which is required on Documentation.AI`,
    });
  }

  if (icon && !mapped) {
    notes.push({
      rule: "icon",
      level: "flag",
      line: lineOf(node),
      detail: `icon="${icon}" has no Lucide equivalent in FA_TO_LUCIDE — dropped`,
    });
  }
  if (dropped.length > 0) {
    notes.push({
      rule: "card",
      level: "change",
      line: lineOf(node),
      detail: `dropped ${dropped.join(", ")} — no equivalent on Documentation.AI`,
    });
  }
}

// ---------------------------------------------------------------------------
// Cards -> Columns
// ---------------------------------------------------------------------------

/**
 * How many columns to emit.
 *
 * `columns={4}` is honoured; anything non-numeric (including ReadMe's `auto-fit`
 * default, and `cardWidth`-driven layouts) falls back to the child count, which is
 * what `auto-fit` would have produced for a small grid anyway. Both paths clamp to
 * 1–5.
 */
function resolveCols(
  node: MdxJsxFlowElement,
  cardCount: number,
  notes: ConversionNote[],
): string {
  const raw = readAttr(node, "columns")?.trim();
  const declared = raw !== undefined && /^\d+$/.test(raw) ? Number(raw) : undefined;
  const derived = Math.min(MAX_COLS, Math.max(1, cardCount || 1));

  if (declared === undefined) {
    notes.push({
      rule: "cards",
      level: "change",
      line: lineOf(node),
      detail: `columns=${raw === undefined ? "(absent, ReadMe defaults to auto-fit)" : `"${raw}"`} -> cols="${derived}", derived from ${cardCount} card${cardCount === 1 ? "" : "s"}`,
    });
    return String(derived);
  }

  if (declared > MAX_COLS) {
    notes.push({
      rule: "cards",
      level: "flag",
      line: lineOf(node),
      detail: `columns={${declared}} exceeds the target maximum — capped at cols="${MAX_COLS}"`,
    });
    return String(MAX_COLS);
  }

  return String(Math.max(1, declared));
}

/**
 * Converts one `<Cards>` container into `<Columns>`, and its `<Card>` children
 * with it.
 *
 * A non-`Card` child is a blocker rather than something to wrap: `<Columns>`
 * accepts `<Card>` children only, and the `<div>` wrapper the platform would
 * allow is not available here (plan §2.3).
 */
export function convertCardsContainer(node: MdxJsxFlowElement, notes: ConversionNote[]): void {
  const children = meaningfulChildren(node);
  const cards = children.filter(isCard);
  const cardWidth = readAttr(node, "cardWidth");

  // Filtered with a plain predicate rather than the type guard, so the stray keeps
  // its full node type and can be named in the note.
  for (const stray of children.filter((child) => !isCard(child))) {
    notes.push({
      rule: "cards",
      level: "blocker",
      line: lineOf(stray),
      detail: `<Cards> holds ${describeNode(stray)} — <Columns> accepts <Card> children only, and a <div> wrapper is not allowed`,
    });
  }

  const cols = resolveCols(node, cards.length, notes);

  node.name = "Columns";
  node.attributes = [attr("cols", cols)];

  if (cardWidth !== undefined) {
    notes.push({
      rule: "cards",
      level: "change",
      line: lineOf(node),
      detail: `dropped cardWidth="${cardWidth}" — no equivalent on <Columns>`,
    });
  }

  notes.push({
    rule: "cards",
    level: "change",
    line: lineOf(node),
    detail: `<Cards> -> <Columns cols="${cols}"> with ${cards.length} card${cards.length === 1 ? "" : "s"}`,
  });

  for (const card of cards) convertCard(card, notes);
}

// ---------------------------------------------------------------------------
// The walk
// ---------------------------------------------------------------------------

/**
 * Converts every `<Cards>` container and every `<Card>` on a page.
 *
 * **A bare `<Card>` outside `<Cards>` is left standalone.** It is valid on
 * Documentation.AI on its own, and wrapping a run of them in `<Columns>` would
 * turn a stack the author wrote into a side-by-side grid — inventing a layout the
 * source never had. Only an explicit `<Cards>` becomes a grid.
 */
export function convertCards(root: Root | Parent, notes: ConversionNote[]): void {
  // One-line `<Cards>` / `<Card>` parse as inline JSX; normalise them first or
  // the walk below never sees them.
  liftInlineJsx(root, new Set(["Cards", "Card"]), notes);

  // Containers first, so their children are converted exactly once, by
  // `convertCardsContainer`. Then any card that was never inside a `<Cards>`.
  const containers: MdxJsxFlowElement[] = [];
  visit(root as Root, "mdxJsxFlowElement", (node) => {
    if (isCards(node as RootContent)) containers.push(node);
  });
  for (const container of containers) convertCardsContainer(container, notes);

  const converted = new Set(containers.flatMap((container) => meaningfulChildren(container)));
  visit(root as Root, "mdxJsxFlowElement", (node, _index, parent) => {
    if (!isCard(node as RootContent) || converted.has(node as RootContent)) return;
    // A card already inside a `<Columns>` belongs to the columns pass, which
    // converts its children itself. Doing it here as well converts nothing extra
    // and reports every finding twice.
    if (parent && parent.type === "mdxJsxFlowElement" && parent.name === "Columns") return;
    convertCard(node, notes);
  });
}
