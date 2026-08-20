import type { RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

import { attr, lineOf, readAttr, type ConversionNote } from "../mdast";
import type { Rule } from "./rule";

/**
 * `<SimpleStepper>` -> `<Steps>` (marketplace-conversion.md §5.1).
 *
 * Source `[MP SimpleStepper]`: `({ children })` over `<SimpleStep header>` — a
 * next/back stepper showing one step at a time.
 *
 * The target `<Steps>` shows every step at once `[DAI §9]`. That is a real
 * change: a reader who could only see step 3 now sees all of them. It is the
 * right trade — the content is all present either way, and a documentation page
 * that hides steps behind buttons is worse to scan, not better.
 *
 * `header` becomes `title`. `title-type` is deliberately not emitted: it defaults
 * to `"p"`, and `"h2"`/`"h3"` would add every step to the page's TOC and change
 * its outline `[DAI §9]` — a decision for a person, not a converter.
 */
export const simpleStepper: Rule = (node, notes: ConversionNote[]) => {
  const steps: RootContent[] = [];

  for (const child of node.children as RootContent[]) {
    if (child.type !== "mdxJsxFlowElement" || child.name !== "SimpleStep") {
      if (child.type !== "text" || child.value.trim().length > 0) steps.push(child);
      continue;
    }

    const step = child as MdxJsxFlowElement;
    const header = readAttr(step, "header")?.trim();

    steps.push({
      type: "mdxJsxFlowElement",
      name: "Step",
      attributes: header ? [attr("title", header)] : [],
      children: step.children,
    });

    if (!header) {
      notes.push({
        rule: "marketplace",
        level: "flag",
        line: lineOf(step),
        detail: "<SimpleStep> has no `header` — the <Step> is emitted without a title",
      });
    }
  }

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: `<SimpleStepper> -> <Steps> with ${steps.length} steps — next/back navigation is lost and every step is now visible at once`,
  });

  return [
    {
      type: "mdxJsxFlowElement",
      name: "Steps",
      attributes: [],
      children: steps as never,
    },
  ];
};
