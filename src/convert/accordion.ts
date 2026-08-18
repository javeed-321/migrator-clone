import type { Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

import { attr, isJsx, liftInlineJsx, lineOf, readAttr, type ConversionNote } from "./mdast";

/**
 * Plan §2.1 — `<Accordion>` -> `<Expandable>`, wrapped in `<ExpandableGroup>`.
 *
 * A one-for-one tag swap loses two things, which is why this is a Section 2
 * conversion rather than a rename:
 *
 * 1. **ReadMe has no wrapping group component** — you stack `<Accordion>`s
 *    directly. A run of five FAQ entries therefore arrives as five siblings, and
 *    emitting five bare `<Expandable>`s renders five unrelated boxes instead of
 *    one group. The run has to be *detected* and wrapped.
 * 2. **`icon` / `iconColor` do not exist on `<Expandable>`** at all. Left in
 *    place they are unknown attributes; there is nowhere to put them.
 *
 * The `<details>` / `<details open>` case is deliberately not here. Authors reach
 * for raw `<details>` precisely because ReadMe's Accordion cannot start open, and
 * raw HTML is a Section 3 concern (plan §3.3).
 */

/**
 * How a run is detected — and it is **not** the rule fences use.
 *
 * Fences form a `CodeGroup` only when they are line-adjacent, because a blank
 * line is ReadMe's documented opt-out. Accordions have no such opt-out: authors
 * separate them with blank lines as a matter of course, and ReadMe stacks them
 * either way. So a run here is *consecutive positions in the children array*,
 * whatever whitespace sits between them.
 */
function isAccordion(node: RootContent | undefined): node is MdxJsxFlowElement {
  return node !== undefined && isJsx(node, "Accordion");
}

/**
 * Converts one `<Accordion>` node in place.
 *
 * `default-open="false"` is emitted explicitly rather than relied on as a
 * default, because it is the one attribute that records a fact about the source:
 * ReadMe's built-in Accordion **starts closed and has no open prop**. Writing it
 * down means a later reader cannot mistake the closed state for an accident.
 */
export function convertAccordion(node: MdxJsxFlowElement, notes: ConversionNote[]): void {
  const title = readAttr(node, "title");
  const icon = readAttr(node, "icon");
  const iconColor = readAttr(node, "iconColor");

  node.name = "Expandable";
  node.attributes = [
    // `title` is required on ReadMe but optional on the target, where it falls
    // back to "Click to expand". Emit it only when the source had one.
    ...(title === undefined ? [] : [attr("title", title)]),
    attr("default-open", "false"),
  ];

  notes.push({
    rule: "accordion",
    level: "change",
    line: lineOf(node),
    detail: `<Accordion${title === undefined ? "" : ` title="${title}"`}> -> <Expandable default-open="false">`,
  });

  if (title === undefined) {
    notes.push({
      rule: "accordion",
      level: "flag",
      line: lineOf(node),
      detail: '<Accordion> had no title — <Expandable> will show its "Click to expand" default',
    });
  }
  if (icon !== undefined || iconColor !== undefined) {
    notes.push({
      rule: "accordion",
      level: "change",
      line: lineOf(node),
      detail: `dropped ${icon !== undefined ? `icon="${icon}"` : ""}${icon !== undefined && iconColor !== undefined ? " and " : ""}${iconColor !== undefined ? `iconColor="${iconColor}"` : ""} — <Expandable> has no icon attribute`,
    });
  }
}

/**
 * Walks a page, converting every `<Accordion>` and collapsing each run of
 * adjacent siblings into one `<ExpandableGroup>`.
 *
 * A run of one stays a bare `<Expandable>`: a group of one is chrome around
 * nothing, and the target's group adds no behaviour anyway — items in an
 * `ExpandableGroup` open and close independently, exactly as stacked ones do.
 *
 * Recurses into containers first, so accordions nested inside a `<Tab>` or a
 * `<Step>` are grouped within their own parent rather than across it.
 */
export function convertAccordions(root: Root | Parent, notes: ConversionNote[]): void {
  // A one-line `<Accordion>…</Accordion>` parses as inline JSX. Normalise those
  // to flow elements first, or the run detection below never sees them.
  liftInlineJsx(root, new Set(["Accordion"]), notes);

  const children = root.children as RootContent[];

  for (const child of children) {
    if (child && "children" in child && Array.isArray((child as Parent).children)) {
      convertAccordions(child as Parent, notes);
    }
  }

  for (let i = 0; i < children.length; i += 1) {
    if (!isAccordion(children[i])) continue;

    let end = i;
    while (isAccordion(children[end + 1])) end += 1;

    const run = children.slice(i, end + 1) as MdxJsxFlowElement[];
    for (const node of run) convertAccordion(node, notes);

    if (run.length === 1) continue;

    const group: MdxJsxFlowElement = {
      type: "mdxJsxFlowElement",
      name: "ExpandableGroup",
      attributes: [],
      children: run,
    };
    children.splice(i, run.length, group);

    notes.push({
      rule: "accordion",
      level: "change",
      line: lineOf(run[0] ?? group),
      detail: `${run.length} adjacent accordions -> one <ExpandableGroup>`,
    });
  }
}
