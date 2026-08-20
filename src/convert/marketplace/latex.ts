import { attr, lineOf, type ConversionNote } from "../mdast";
import type { Rule } from "./rule";

/**
 * `<Latex>` -> `<div className="math">`, children untouched
 * (marketplace-conversion.md §5.4).
 *
 * Source `[MP Latex]`: imports `react-latex-next` from a CDN inside a `useEffect`
 * and injects KaTeX's stylesheet with a `<link>` tag. Documentation.AI has **no
 * native math support** — no LaTeX, no KaTeX, no `$…$` syntax, confirmed against
 * the live component index — so the rendering has to be arranged at site level:
 *
 * ```json
 * { "css":     [{ "src": "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" }],
 *   "scripts": [{ "src": "scripts/katex-render.js" }] }
 * ```
 *
 * This rule's only job is to mark where the maths is. `scripts/katex-render.js`
 * finds `.math` and renders what is inside it.
 *
 * ## Why the children are not touched at all
 *
 * This is the whole reason the rule is three lines rather than thirty.
 *
 * LaTeX is full of braces — `\frac{a}{b}`, `x_{n}`, `\sqrt{2}` — and **a brace in
 * MDX body text is an expression**, not a character `[RM §12 gotcha 15]`
 * `[PIT Phase 5]`. Unwrapping `<Latex>` to bare text would break every formula
 * containing one, which is most of them.
 *
 * ReadMe's own component sidesteps this by requiring a template literal:
 * `` <Latex>{`\\frac{a}{b}`}</Latex> ``. Inside `` {`…`} `` a brace is just a
 * brace. So the fix is to *leave the expression node exactly where it is* and
 * rename only the element around it. Compare `terminal.ts`, which deliberately
 * does the opposite — it reads the literal out, because a fence needs plain text
 * and a fence has no MDX hazards.
 *
 * One inherited quirk: `${…}` inside the literal still interpolates, exactly as it
 * did on ReadMe — the component's own example relies on it (`the ${1 + 2}
 * processes`). That behaviour is preserved rather than fixed, because changing it
 * would change what the page says.
 */
/**
 * Counts the `$` signs KaTeX will treat as delimiters.
 *
 * `\$` is an escaped dollar and `${` opens a JS interpolation, so neither is a
 * delimiter. Everything else is, and they must pair.
 */
function delimiterCount(node: Parameters<Rule>[0]): number {
  const parts: string[] = [];

  const walk = (children: { type: string; value?: string; children?: unknown[] }[]): void => {
    for (const child of children) {
      if (typeof child.value === "string") parts.push(child.value);
      if (Array.isArray(child.children)) walk(child.children as typeof children);
    }
  };

  walk(node.children as unknown as { type: string; value?: string }[]);

  return (parts.join("").match(/(?<!\\)\$(?!\{)/g) ?? []).length;
}

export const latex: Rule = (node, notes: ConversionNote[]) => {
  // An odd count means one `$` has no partner, and KaTeX does not fail quietly:
  // it pairs each delimiter with the *next* one it finds, so the prose between two
  // unrelated formulas is rendered as an equation and the last formula is left as
  // raw TeX. Catching it here names the page; finding it afterwards means reading
  // rendered output.
  const delimiters = delimiterCount(node);
  if (delimiters % 2 !== 0) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: `<Latex> has ${delimiters} unescaped \`$\` delimiters — an odd number, so they cannot pair. KaTeX will match each one to the next and render the prose between two formulas as an equation. Escape the stray \`$\` as \`\\$\` or add its partner`,
    });
  }

  notes.push({
    rule: "marketplace",
    level: "flag",
    line: lineOf(node),
    detail:
      '<Latex> -> <div className="math"> with its formula untouched. Rendering needs KaTeX registered site-wide: add the KaTeX stylesheet to `css` and `scripts/katex-render.js` to `scripts` in documentation.json',
  });

  return [
    {
      type: "mdxJsxFlowElement",
      name: "div",
      attributes: [attr("className", "math")],
      children: node.children,
    },
  ];
};
