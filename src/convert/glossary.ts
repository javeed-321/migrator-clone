import type { Parent, Root, RootContent } from "mdast";
import { visit } from "unist-util-visit";

import { lineOf, readAttr, type ConversionNote } from "./mdast";

/**
 * Plan §2.6 — `<Glossary>` -> plain text.
 *
 * Documentation.AI has no glossary or tooltip component, so this conversion is
 * **lossy by design**: the term survives, its hover definition does not.
 *
 * Unwrapping is the right degradation rather than a shrug, because it is exactly
 * what ReadMe itself does when a term is missing from the project glossary — the
 * component fails soft and renders a plain `<span>` with the text `[RM §4.5]`.
 * What is *not* acceptable is leaving the tag in place: `<Glossary>` is an unknown
 * component on the target and breaks the MDX build, turning a content problem into
 * a deployment problem `[PIT Phase 5]`.
 *
 * Both spellings are handled. The markdown shorthand matters as much as the JSX:
 * left alone, `<<glossary:exogenous>>` renders as those literal characters on the
 * page.
 *
 * 57 usages in the corpus, top term `Block` (24x) `[RM §4.5, §10.1]`. Table cells
 * are handled separately by the table flattener, which has to resolve them while
 * it is already collapsing a cell to one line.
 */

/** `<<glossary:exogenous>>` — the markdown shorthand `[RM §4.5]`. */
const SHORTHAND = /<<glossary:([^>]+)>>/g;

function isGlossary(node: RootContent): boolean {
  return (
    (node.type === "mdxJsxTextElement" || node.type === "mdxJsxFlowElement") &&
    node.name === "Glossary"
  );
}

/**
 * The term a `<Glossary>` carries.
 *
 * Children win over the `term` attribute, matching ReadMe's own precedence — the
 * text between the tags is what the reader sees, so it is what must survive.
 */
function termOf(node: RootContent): string {
  if (!("children" in node)) return "";
  const fromChildren = node.children
    .map((child) => ("value" in child && typeof child.value === "string" ? child.value : ""))
    .join("")
    .trim();
  if (fromChildren) return fromChildren;
  return (readAttr(node as never, "term") ?? "").trim();
}

/**
 * Replaces every `<Glossary>` with the content it wrapped.
 *
 * The element's own children are spliced in rather than flattened to a string, so
 * a term that carried formatting — `<Glossary>**Block**</Glossary>` — keeps it.
 * Only the `term=""` form, which has no children, produces a fresh text node.
 */
function unwrapElements(root: Root | Parent, notes: ConversionNote[], terms: Set<string>): void {
  const children = root.children as RootContent[];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    if (isGlossary(child)) {
      const term = termOf(child);
      if (term) terms.add(term);

      const inner = "children" in child ? (child.children as RootContent[]) : [];
      const replacement: RootContent[] =
        inner.length > 0 ? inner : term ? [{ type: "text", value: term }] : [];

      children.splice(i, 1, ...replacement);
      i += replacement.length - 1;

      notes.push({
        rule: "glossary",
        level: "change",
        line: lineOf(child),
        detail: `<Glossary> unwrapped to "${term || "(empty)"}" — no tooltip component exists on Documentation.AI`,
      });
      continue;
    }

    /*
     * The fallback path. A page carrying `<<glossary:x>>` is invalid MDX, so it is
     * parsed as plain markdown — and there every `<Glossary>` tag arrives as an
     * opaque `html` node rather than a component. Left alone it reaches the output
     * as a literal tag and breaks the target build `[PIT Phase 5]`, so the tags are
     * removed here and the text between them, already a sibling, simply stays.
     */
    if (child.type === "html") {
      const selfClosing = /^<Glossary\b[^>]*\/>$/i.exec(child.value.trim());
      if (selfClosing) {
        const term = (/\bterm\s*=\s*"([^"]*)"/i.exec(child.value)?.[1] ?? "").trim();
        if (term) terms.add(term);
        children[i] = { type: "text", value: term };
        notes.push({
          rule: "glossary",
          level: "change",
          line: lineOf(child),
          detail: `<Glossary term="${term}" /> unwrapped — the page parsed as plain markdown, so it arrived as raw HTML`,
        });
        continue;
      }

      if (/^<\/?Glossary\b[^>]*>$/i.test(child.value.trim())) {
        // On the opening tag the term is the next sibling — the text the tags
        // wrapped. Reading it here is the only way the page-level report can name
        // what lost its definition on a fallback-parsed page.
        if (!child.value.trim().startsWith("</")) {
          const next = children[i + 1];
          if (next?.type === "text" && next.value.trim()) terms.add(next.value.trim());
        }

        children.splice(i, 1);
        i -= 1;
        notes.push({
          rule: "glossary",
          level: "change",
          line: lineOf(child),
          detail: "removed a raw <Glossary> tag left by the plain-markdown parser",
        });
        continue;
      }
    }

    if ("children" in child && Array.isArray((child as Parent).children)) {
      unwrapElements(child as Parent, notes, terms);
    }
  }
}

/** The `glossary:` protocol, as the parser hands it back. */
const PROTOCOL = "glossary:";

/**
 * Rewrites the `<<glossary:term>>` shorthand in its parsed shape.
 *
 * It does not arrive as text. `<glossary:exogenous>` looks like a URI autolink to
 * the parser, so the shorthand lands as three siblings — a text node ending `<`, a
 * `link` whose url is `glossary:exogenous`, and a text node starting `>`. Matching
 * on the text alone finds nothing and the page ships with a visible
 * `<[glossary:exogenous](glossary:exogenous)>`.
 *
 * Note this shape only exists because `<<` is invalid MDX: a page using the
 * shorthand always falls back to the plain-markdown parser.
 */
function unwrapShorthandLinks(root: Root | Parent, notes: ConversionNote[], terms: Set<string>): void {
  const children = root.children as RootContent[];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    if (child.type === "link" && child.url.startsWith(PROTOCOL)) {
      const term = child.url.slice(PROTOCOL.length).trim();
      terms.add(term);

      // Drop the angle brackets the autolink left on either side.
      const before = children[i - 1];
      const after = children[i + 1];
      if (before?.type === "text" && before.value.endsWith("<")) {
        before.value = before.value.slice(0, -1);
      }
      if (after?.type === "text" && after.value.startsWith(">")) {
        after.value = after.value.slice(1);
      }

      children[i] = { type: "text", value: term };
      notes.push({
        rule: "glossary",
        level: "change",
        line: lineOf(child),
        detail: `<<glossary:${term}>> unwrapped to "${term}" — left in place it renders as literal characters`,
      });
      continue;
    }

    if ("children" in child && Array.isArray((child as Parent).children)) {
      unwrapShorthandLinks(child as Parent, notes, terms);
    }
  }
}

/** The same shorthand when it survived as literal text rather than an autolink. */
function unwrapShorthand(root: Root, notes: ConversionNote[], terms: Set<string>): void {
  visit(root, "text", (node) => {
    if (!SHORTHAND.test(node.value)) return;
    SHORTHAND.lastIndex = 0;

    node.value = node.value.replace(SHORTHAND, (_match, term: string) => {
      const text = term.trim();
      terms.add(text);
      notes.push({
        rule: "glossary",
        level: "change",
        line: lineOf(node),
        detail: `<<glossary:${text}>> unwrapped to "${text}" — left in place it renders as those literal characters`,
      });
      return text;
    });
  });
}

/**
 * Converts every glossary reference on a page.
 *
 * Ends with one flag naming the distinct terms whose definitions were lost. That
 * is a per-page decision — inline the definition where the sentence depends on it,
 * or add a terms table — and it is easier to make once with the list in front of
 * you than 57 times.
 */
export function convertGlossary(root: Root, notes: ConversionNote[]): void {
  const terms = new Set<string>();

  unwrapElements(root, notes, terms);
  unwrapShorthandLinks(root, notes, terms);
  unwrapShorthand(root, notes, terms);

  if (terms.size === 0) return;

  notes.push({
    rule: "glossary",
    level: "flag",
    detail: `${terms.size} term${terms.size === 1 ? "" : "s"} lost their definition: ${[...terms].join(", ")} — inline the definition where a sentence depends on it, or add a terms table`,
  });
}
