import type { Parent, PhrasingContent, Root, RootContent } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";

import { lineOf, type ConversionNote } from "./mdast";

/**
 * Plan §3.3 — tag-shaped prose becomes inline code.
 *
 * **[CORPUS]** ~25 distinct `[RM §11.1]`: `<String>` ×9, `<Base64…>` ×3,
 * `<Selection>` ×2, `<HydraNotification>` ×2, the five `<YOUR_*>` ones, `<Map>`,
 * `<List>`, `<Alternate Currency Name>`. They are placeholders a reader is meant
 * to substitute — not components, and not HTML.
 *
 * **This is the one Section 3 item that is a build failure rather than a quality
 * problem.** An unescaped `<String>` in prose is parsed as an unknown JSX
 * component and takes the page down `[PIT Phase 5]`. The corpus escapes them 157
 * times but not consistently `[RM §11.1]`, so no page can be assumed safe.
 *
 * ## Why inline code, and not `\<`
 *
 * Both render. Only one of them says what the thing *is*:
 *
 * | Form | Renders | Problem |
 * |---|---|---|
 * | `` `<String>` `` | `<String>`, in code style | none |
 * | `\<String>` | `<String>`, as ordinary prose | indistinguishable from a real tag, and the `_` in `<YOUR_ACCOUNT_ID>` still needs its own escape |
 *
 * Backticks also settle it permanently: nothing inside them is MDX, so there is
 * one mechanism instead of two, and a second run sees `inlineCode` and leaves it
 * be.
 *
 * ## Two node types, because they arrive differently
 *
 * `<String>` looks like a valid HTML tag name, so the fallback parser makes it an
 * inline **`html`** node — and it reaches the output raw. `<YOUR_ACCOUNT_ID>` has
 * characters the tag grammar rejects, so it stays **`text`** and is escaped on the
 * way out. Same intent, two shapes, one output.
 *
 * ## Why not simply leave them
 *
 * Compiled with the target's own MDX compiler, none of the three shapes keeps its
 * text — and the quietest one is the worst:
 *
 * | Written | Compiles | Reader sees |
 * |---|---|---|
 * | `<String>` unclosed | **no** — the build fails | nothing; the page is gone |
 * | `<String></String>` | throws `_missingMdxReference("String")` | the word is **dropped** |
 * | `<my-thing></my-thing>` | **yes, cleanly** | the word is **silently dropped** |
 *
 * That last row is why the rule covers unknown lowercase names too. Nothing errors
 * anywhere — the text simply is not on the published page.
 *
 * ## What is never touched
 *
 * Anything inside a code fence `[RM §11.2]` — `<CapTooltip>`, Dart generics like
 * `<LoyaltyLogDto>`, Android XML `<intent-filter>`, `<ENTITY_ID>` in curl samples.
 * A `code` node has no children, so the walk cannot reach into one. Nor are
 * already-backticked spans or real component names touched.
 */

/**
 * A placeholder: opens with a capital, no nesting, short.
 *
 * The capital is what separates `<String>` from a stray `a < b` comparison, and
 * the length cap stops a lone `<` in prose from swallowing half a sentence before
 * it finds a `>`. Spaces are allowed because `<Alternate Currency Name>` is one of
 * these too.
 */
const PLACEHOLDER = /<([A-Za-z0-9_][A-Za-z0-9_.\- ]{0,38})>/g;

/**
 * Whether a token the tag grammar *rejected* is a placeholder rather than prose.
 *
 * An underscore or a leading digit is what made it invalid in the first place, so
 * it was never going to be a tag; a capital marks the rest. A lowercase word with
 * none of those — `a < b` in a comparison — is left alone.
 */
function looksIntentional(name: string): boolean {
  return /_/.test(name) || /^[0-9]/.test(name) || /[A-Z]/.test(name);
}

/**
 * The same, anchored — for an `html` node that is nothing but the tag.
 *
 * Uppercase-only, like `PLACEHOLDER`: a lowercase `<br>` or `<img>` is real HTML
 * and belongs to the pass that owns it.
 *
 * Trailing words are allowed because the parser reads `<Alternate Currency Name>`
 * as a tag with two bare attributes. **An `=` is not** — that is what separates a
 * placeholder from a real element like `<Callout kind="info">`, which this pass
 * must never touch.
 */
const WHOLE_TAG = /^<\/?([A-Za-z_][A-Za-z0-9_.\-]*(?: [A-Za-z0-9_.\-]+){0,5})\s*\/?>$/;

/**
 * Real HTML elements, which belong to the passes that own them — `<br>` to the
 * break pass, `<img>` to the image pass, `<table>` to the table pass — or which
 * render on their own.
 *
 * Compared case-sensitively and lowercase-only, on purpose: `<map>` is an HTML
 * element, `<Map>` is one of the corpus's placeholders `[RM §11.1]`.
 */
const HTML_ELEMENTS = new Set(
  ("a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption " +
    "cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset " +
    "figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input " +
    "ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup " +
    "option output p param picture pre progress q rp rt ruby s samp script section select slot small " +
    "source span strong style sub summary sup svg table tbody td template textarea tfoot th thead " +
    "time title tr track u ul var video wbr").split(" "),
);

/**
 * Component names that are really components, in either platform's vocabulary.
 *
 * Without this, a page that documents `<Callout>` in prose would have its own
 * examples turned into placeholders. Lowercase HTML element names are not here on
 * purpose: `<div>` in prose is not a placeholder either, but it is also not this
 * pass's problem, and `PLACEHOLDER` requires a capital anyway.
 */
const COMPONENTS = new Set([
  // Documentation.AI
  "Callout", "Card", "Columns", "CodeGroup", "Expandable", "ExpandableGroup", "Iframe",
  "Image", "MermaidDiagram", "ParamField", "Request", "Response", "ResponseField", "Script",
  "Step", "Steps", "SVG", "Tab", "Tabs", "Update", "Video", "Board", "BoardColumn",
  "BoardCard", "CollectionList", "CollectionContent", "AuthParams", "BodyParams", "Link",
  // ReadMe
  "Accordion", "Anchor", "Cards", "Column", "CodeTabs", "Embed", "Glossary", "HTMLBlock",
  "Recipe", "Table", "TutorialTile", "Variable",
]);

/**
 * Whether a component name here is a real element rather than prose about one.
 *
 * The allowlist alone is not the answer. A page that says *"the `<Callout>`
 * component takes a kind"* has a bare, unclosed `<Callout>` in its prose — leaving
 * that alone keeps the page from compiling, which is the very thing this pass
 * exists to fix.
 *
 * What separates the two is whether the page closes it. A real element written on
 * a page that fell back to the plain parser arrives as an opening `html` node with
 * a matching `</Callout>` further down; prose about the component has no closer.
 * So the closing tags are collected first, and only names that have one are
 * treated as elements.
 */
function isElement(name: string, closed: Set<string>): boolean {
  const trimmed = name.trim();
  if (HTML_ELEMENTS.has(trimmed)) return true;
  return COMPONENTS.has(trimmed) && closed.has(trimmed);
}

/** Every `</Name>` on the page — the evidence that an opening tag was an element. */
function closingTags(root: Parent): Set<string> {
  const closed = new Set<string>();

  const walk = (node: Parent): void => {
    for (const child of node.children as RootContent[]) {
      if (child.type === "html") {
        for (const match of child.value.matchAll(/<\/([A-Za-z][A-Za-z0-9_.\-]*)\s*>/g)) {
          if (match[1]) closed.add(match[1]);
        }
      }
      if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);
    }
  };

  walk(root);
  return closed;
}

/**
 * Inline tags whose content is shown **verbatim**.
 *
 * Between `<code>` and `</code>` a backtick is a backtick, not code formatting, so
 * wrapping a placeholder there would put two visible backticks on the page. The
 * text is already safe inside them, which is the whole point of the element.
 *
 * Block-level HTML needs no such list: a `<div>` or a `<style>` block arrives as
 * one opaque `html` node that this pass never opens.
 */
const VERBATIM = new Set(["code", "pre", "script", "style", "kbd", "samp"]);

/**
 * Inline elements markdown expresses **exactly**, so no raw tag needs to survive.
 *
 * Only `<code>`. `<kbd>` and `<samp>` are deliberately not here: they are real
 * HTML elements that compile and render on the target, and backticks cannot say
 * "keyboard key" or "program output" — converting them would flatten a distinction
 * the author drew on purpose. `<code>` is the one with a lossless equivalent.
 */
const UNWRAP: Record<string, "code"> = { code: "code" };

/**
 * Inline wrappers with **no** markdown equivalent and nothing worth keeping.
 *
 * `<span style={{color:"red"}}>` is the corpus case `[RM §10.8]`: a hard-coded
 * colour, which breaks dark mode and which the target's editor strips on save
 * anyway `[PIT Phase 6]`. The tag goes and the words stay — the alternative is raw
 * HTML in the output, which this project does not emit.
 */
const UNTAG = new Set(["span", "font", "big", "nobr"]);

/** `<code>` -> +1, `</code>` -> -1, anything else -> 0. */
function verbatimDepth(value: string): number {
  const tag = /^<(\/?)([A-Za-z][A-Za-z0-9-]*)/.exec(value.trim());
  if (!tag?.[2] || !VERBATIM.has(tag[2])) return 0;
  return tag[1] === "/" ? -1 : 1;
}

/** `<String>` -> an `inlineCode` node holding the literal text. */
function code(value: string): PhrasingContent {
  return { type: "inlineCode", value };
}

/**
 * Rewrites one run of inline content.
 *
 * Returns `undefined` when nothing matched, so a paragraph with no placeholders
 * keeps its original nodes rather than being rebuilt.
 */
function rewrite(
  children: PhrasingContent[],
  found: string[],
  closed: Set<string>,
): PhrasingContent[] | undefined {
  const out: PhrasingContent[] = [];
  let changed = false;
  /** How deep inside a verbatim inline tag we are. Above zero, nothing is ours. */
  let verbatim = 0;
  /** The tag name being unwrapped, and the raw text collected so far. */
  let unwrapping: { name: string; text: string } | undefined;

  for (const node of children) {
    // `<code>Pass <String> here</code>` -> `` `Pass <String> here` ``.
    //
    // The element has an exact markdown equivalent, and converting it fixes the
    // placeholder inside it at the same time: nothing within backticks is parsed,
    // so `<String>` survives verbatim without a tag anywhere. Backticking each tag
    // on its own would leave the `<code>` visible as text.
    if (unwrapping) {
      const closes = node.type === "html" && new RegExp(`^</${unwrapping.name}\\s*>$`, "i").test(node.value.trim());
      if (closes) {
        out.push(code(unwrapping.text.trim()));
        found.push(`<${unwrapping.name}>`);
        unwrapping = undefined;
        changed = true;
        continue;
      }
      unwrapping.text += node.type === "text" || node.type === "html" ? node.value : "";
      continue;
    }

    if (node.type === "html") {
      const tagName = /^<\/?([A-Za-z][A-Za-z0-9-]*)/.exec(node.value.trim())?.[1]?.toLowerCase();

      if (tagName && UNWRAP[tagName] && !node.value.trim().startsWith("</")) {
        unwrapping = { name: tagName, text: "" };
        continue;
      }

      // Both halves of an untagged wrapper simply vanish; whatever sat between
      // them is ordinary content and is already in `out`.
      if (tagName && UNTAG.has(tagName)) {
        found.push(node.value.trim());
        changed = true;
        continue;
      }
    }

    // The same element on a page the MDX parser accepted, where it is a parsed
    // JSX node rather than raw text. Same source, same output — which parser ran
    // depends on unrelated content elsewhere on the page.
    if (node.type === "mdxJsxTextElement" && node.name && UNTAG.has(node.name.toLowerCase())) {
      const inner = rewrite(node.children as PhrasingContent[], found, closed) ?? node.children;
      out.push(...(inner as PhrasingContent[]));
      found.push(`<${node.name}>`);
      changed = true;
      continue;
    }

    if (node.type === "mdxJsxTextElement" && node.name && UNWRAP[node.name.toLowerCase()]) {
      out.push(code(mdastToString(node).replace(/\s+/g, " ").trim()));
      found.push(`<${node.name}>`);
      changed = true;
      continue;
    }

    // A tag the fallback parser recognised. Raw in the output, and fatal.
    if (node.type === "html") {
      verbatim = Math.max(0, verbatim + verbatimDepth(node.value));
      if (verbatim > 0) {
        out.push(node);
        continue;
      }

      const tag = WHOLE_TAG.exec(node.value.trim());
      if (tag?.[1] && !isElement(tag[1], closed)) {
        out.push(code(node.value.trim()));
        found.push(node.value.trim());
        changed = true;
        continue;
      }
      out.push(node);
      continue;
    }

    if (node.type === "text") {
      if (verbatim > 0) {
        out.push(node);
        continue;
      }

      const parts = [...node.value.matchAll(PLACEHOLDER)];
      const usable = parts.filter(
        (part) => looksIntentional(part[1] ?? "") && !isElement(part[1] ?? "", closed),
      );
      if (usable.length === 0) {
        out.push(node);
        continue;
      }

      let at = 0;
      for (const part of usable) {
        const start = part.index;
        if (start > at) out.push({ type: "text", value: node.value.slice(at, start) });
        out.push(code(part[0]));
        found.push(part[0]);
        at = start + part[0].length;
      }
      if (at < node.value.length) out.push({ type: "text", value: node.value.slice(at) });
      changed = true;
      continue;
    }

    // Emphasis, links, table cells — the text inside them counts too. `code` and
    // `inlineCode` are not parents, so a fenced or backticked placeholder is
    // unreachable from here, which is exactly what §11.2 needs.
    if ("children" in node && Array.isArray(node.children)) {
      const inner = rewrite(node.children as PhrasingContent[], found, closed);
      if (inner) {
        node.children = inner as never;
        changed = true;
      }
    }
    out.push(node);
  }

  // An opening tag with no closer: put back what was collected rather than
  // swallowing it.
  if (unwrapping) {
    out.push({ type: "html", value: `<${unwrapping.name}>` });
    if (unwrapping.text) out.push({ type: "text", value: unwrapping.text });
  }

  return changed ? out : undefined;
}

/**
 * Converts every tag-shaped placeholder on a page.
 *
 * Reported once per distinct placeholder rather than once per occurrence: nine
 * `<String>`s on a page are one decision, and a note per occurrence would bury the
 * rest of the page's notes.
 */
export function convertPlaceholders(root: Root | Parent, notes: ConversionNote[]): void {
  const found: string[] = [];
  const closed = closingTags(root as Parent);

  const walk = (node: Parent): void => {
    const children = node.children as RootContent[];

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (!child) continue;

      if (child.type === "paragraph" || child.type === "heading" || child.type === "tableCell") {
        const rewritten = rewrite(child.children as PhrasingContent[], found, closed);
        if (rewritten) child.children = rewritten as never;
        continue;
      }

      // A placeholder on a line of its own is a **block** `html` node, not inline
      // content — `<String>` alone, or as the whole of a list item. Only a bare
      // tag qualifies; a multi-line HTML blob belongs to another pass.
      if (child.type === "html") {
        const tag = WHOLE_TAG.exec(child.value.trim());
        if (tag?.[1] && !isElement(tag[1], closed)) {
          children[i] = { type: "paragraph", children: [code(child.value.trim())] } as RootContent;
          found.push(child.value.trim());
        }
        continue;
      }

      if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);
    }
  };

  walk(root as Parent);
  if (found.length === 0) return;

  const distinct = [...new Set(found)];
  notes.push({
    rule: "placeholder",
    level: "change",
    line: lineOf(root as { position?: { start: { line: number } } }),
    detail: `${found.length} tag-shaped token${found.length === 1 ? "" : "s"} rewritten (${distinct.slice(0, 6).join(", ")}${distinct.length > 6 ? `, +${distinct.length - 6} more` : ""}) — placeholders wrapped in inline code, tags with a markdown equivalent converted, wrappers dropped. Left as they were, MDX renders each as an unknown component and the text simply disappears`,
  });
}
