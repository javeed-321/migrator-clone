import type { Code } from "mdast";

import { lineOf, type ConversionNote } from "../mdast";
import type { Rule } from "./rule";

/**
 * `<Terminal>` -> a ```bash fence (marketplace-conversion.md §5.1).
 *
 * Source `[MP Terminal]`: `children.trim().split('\n')` — lines beginning `$` are
 * rendered as input with a copy button, the rest as output.
 *
 * **The children are a template literal, not markdown.** ReadMe requires
 * `<Terminal>{\`…\`}</Terminal>`, so the content arrives as a single expression
 * node whose value is the backticked source — not as text children to walk.
 * Reading it means taking that raw string and stripping the backticks.
 *
 * A fence is chosen over reproducing the frame in HTML because the fence is
 * indexed by search, readable by the AI assistant, and gets a copy button for
 * free; the window chrome is decoration `[marketplace-conversion.md §3]`.
 */
/**
 * The flow-element child union in `mdast-util-mdx-jsx` does not include the MDX
 * expression nodes, but the parser produces them here — so the walk reads through
 * a minimal structural type rather than casting away each branch separately.
 */
type Loose = { type: string; value?: string; children?: Loose[] };

function literalText(node: Parameters<Rule>[0]): string | undefined {
  const parts: string[] = [];

  const walk = (children: Loose[]): void => {
    for (const child of children) {
      if (child.type === "mdxFlowExpression" || child.type === "mdxTextExpression") {
        parts.push((child.value ?? "").replace(/^\s*`|`\s*$/g, ""));
        continue;
      }
      if (child.type === "text") {
        parts.push(child.value ?? "");
        continue;
      }
      if (child.children) walk(child.children);
    }
  };

  walk(node.children as unknown as Loose[]);

  const text = parts.join("").replace(/^\n+|\n+$/g, "");
  return text.trim().length > 0 ? text : undefined;
}

export const terminal: Rule = (node, notes: ConversionNote[]) => {
  const text = literalText(node);

  if (text === undefined) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<Terminal> holds no readable text — its children are usually a template literal; check the source before converting",
    });
    return null;
  }

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: "<Terminal> -> a bash fence — the window frame and per-line copy buttons are lost; the fence is searchable and gets one copy button",
  });

  // Dedent, because a template literal in MDX carries the page's indentation.
  const lines = text.split("\n");
  const indent = Math.min(
    ...lines.filter((line) => line.trim().length > 0).map((line) => /^\s*/.exec(line)![0].length),
  );

  const code: Code = {
    type: "code",
    lang: "bash",
    value: lines.map((line) => line.slice(indent)).join("\n").trim(),
  };

  return [code];
};
