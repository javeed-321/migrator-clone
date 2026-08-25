import type { Element, Root as HastRoot, RootContent as HastContent } from "hast";
import { minifyWhitespace } from "hast-util-minify-whitespace";
import { toHtml } from "hast-util-to-html";
import type { Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

import { htmlToHast } from "../../pipeline/root";
import { liftInlineJsx, lineOf, type ConversionNote } from "../mdast";
import { inlineStyle, parseCss, type Stylesheet, type Target } from "./css";

/**
 * Plan §4.3 — `<HTMLBlock>{`…`}</HTMLBlock>` -> the same markup, styled inline.
 *
 * ## What was happening before this pass
 *
 * Nothing, and *silently*. `HTMLBlock` is in `KNOWN_COMPONENTS`, so the detector
 * classified it as a component somebody handled and skipped it — which meant the
 * tag reached the output byte for byte with no note of any kind, and the
 * quarantine pass never saw it either. A construct listed as known while nothing
 * knows how to convert it is the worst of both: it looks handled in every report
 * and fails on the target.
 *
 * ## Why inline, and what it costs
 *
 * A `<style>` block cannot come along. The markup is being lifted out of its own
 * document and dropped into a page that already has one, where its `body { … }`
 * and `:root { … }` rules would either be ignored or leak into the whole site.
 * Moving each rule onto the element it selects is the only form that survives
 * the move, and Documentation.AI takes a plain CSS **string** in `style`
 * `[LIVE-DAI /components/images]` rather than the JSX object MDX normally wants.
 *
 * What inline cannot carry is reported, never dropped quietly:
 *
 * | In the stylesheet | Inline |
 * |---|---|
 * | `.tile { … }` | moves onto the element |
 * | `var(--tile-bg)` | resolved from `:root` before the `<style>` is deleted |
 * | `.tile:hover { … }` | **gone** — a behaviour has no attribute |
 * | `@media (prefers-color-scheme: dark)` | **gone** — the block keeps its light state only |
 *
 * The last row is usually the one that matters. A block that themes itself with
 * a media query renders in one theme after this pass, and the note says so.
 *
 * ## And why the tags change
 *
 * The output is MDX, not HTML. `class` is `className`, and every void element
 * has to be self-closed or the page will not compile `[PIT Phase 5]` — an
 * unclosed `<img>` in an HTML file is fine and in an MDX file is a build error.
 */

/**
 * Document scaffolding, split by what happens to what is inside it.
 *
 * `<html>`/`<head>`/`<body>` are containers: the tag cannot appear inside a page
 * but everything under it can, so the wrapper goes and the content stays.
 *
 * `<title>` is the one that has to be *deleted*. Unwrapped like the others it
 * leaves its text behind, and a page then opens with the browser-tab title of an
 * email template — content that was never on the page, now indistinguishable
 * from content that was.
 */
const UNWRAP = new Set(["html", "head", "body"]);
const DROP = new Set(["meta", "title", "link", "base", "style", "script"]);

/** The backticks around the template literal, and nothing else. */
function templateBody(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed.startsWith("`") || !trimmed.endsWith("`") || trimmed.length < 2) return null;
  return trimmed.slice(1, -1);
}

/**
 * What a `<HTMLBlock>` is holding — and there are two genuinely different answers.
 *
 * **`html`** is the documented form, `{`…`}`. The braces make the body a
 * *string*, so nothing inside it was ever parsed and the whole document arrives
 * as text for this pass to read.
 *
 * **`children`** is what you get without the braces. MDX then parses the body as
 * ordinary content, so by the time this pass runs there is no HTML string left —
 * `<HTMLBlock>Body text.</HTMLBlock>` is already a paragraph holding a text node.
 * Nothing is stringly-typed and nothing needs a CSS engine; the wrapper is simply
 * a wrapper, and the content underneath is content every later pass can handle.
 *
 * Reading the raw `mdxFlowExpression` value rather than its estree, for the same
 * reason `definedHere` does: `data.estree` is only populated when a plugin asks
 * for it, and the authored text is what is wanted.
 */
type Content = { kind: "html"; html: string } | { kind: "children" };

function contentOf(node: MdxJsxFlowElement): Content {
  const parts: string[] = [];

  for (const child of node.children as RootContent[]) {
    if (child.type === "mdxFlowExpression" || child.type === "mdxTextExpression") {
      const body = templateBody(child.value);
      if (body === null) return { kind: "children" };
      parts.push(body);
    } else if (child.type === "text") {
      parts.push(child.value);
    } else {
      return { kind: "children" };
    }
  }

  const html = parts.join("").trim();
  return html.length > 0 ? { kind: "html", html } : { kind: "children" };
}

function classesOf(element: Element): string[] {
  const value: unknown = element.properties?.["className"];
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean);
  return [];
}

/** The element as the CSS engine needs it — `data-*` included, since rules use them. */
function targetOf(element: Element): Target {
  const attrs = new Map<string, string>();
  for (const [name, value] of Object.entries(element.properties ?? {})) {
    if (value === null || value === undefined || value === false) continue;
    attrs.set(name.toLowerCase(), value === true ? "" : String(value));
  }

  const id = element.properties?.["id"];
  return {
    tag: element.tagName,
    ...(typeof id === "string" ? { id } : {}),
    classes: classesOf(element),
    attrs,
  };
}

/**
 * Collect every `<style>` on the way in, then delete it.
 *
 * Separate from the styling walk because a stylesheet applies to the whole
 * fragment however far down it was written — reading and applying in one pass
 * would style the elements above a `<style>` differently from the ones below it.
 */
function takeStyles(nodes: HastContent[]): string {
  let css = "";

  const walk = (list: HastContent[]): HastContent[] =>
    list.flatMap((node) => {
      // `<!doctype html>` describes a document, and there is only one of those
      // on the target — the one the page is already inside. Left in, MDX reads
      // the `!` as the start of a tag name and the whole page fails to compile.
      if (node.type === "doctype") return [];
      if (node.type !== "element") return [node];

      if (node.tagName === "style") {
        css += node.children.map((child) => (child.type === "text" ? child.value : "")).join("");
        return [];
      }
      // Everything in `DROP` goes whole, children included — `<script>` because
      // the target runs none (the caller reports that), `<title>` because its
      // text is not page content.
      if (DROP.has(node.tagName)) return [];

      node.children = walk(node.children) as Element["children"];
      return UNWRAP.has(node.tagName) ? (node.children as HastContent[]) : [node];
    });

  const kept = walk(nodes);
  nodes.length = 0;
  nodes.push(...kept);
  return css;
}

/** Whether the fragment had a `<script>` in it, before `takeStyles` removed them. */
function hasScript(html: string): boolean {
  return /<script[\s>]/i.test(html);
}

function applyStyles(nodes: HastContent[], sheet: Stylesheet): void {
  const walk = (list: HastContent[], ancestors: Target[]): void => {
    for (const node of list) {
      if (node.type !== "element") continue;

      const target = targetOf(node);
      const existing = node.properties?.["style"];
      const style = inlineStyle(
        target,
        ancestors,
        sheet,
        typeof existing === "string" ? existing : undefined,
      );

      node.properties = node.properties ?? {};
      if (style === undefined) delete node.properties["style"];
      else node.properties["style"] = style;

      walk(node.children as HastContent[], [...ancestors, target]);
    }
  };

  walk(nodes, []);
}

/**
 * HTML text -> MDX-safe JSX text.
 *
 * Two rewrites, both mandatory rather than cosmetic. `class` is `className` on
 * the target `[DAI §16–18]`. And `closeSelfClosing` turns `<img src=…>` into
 * `<img src=… />` — an unclosed void element is valid HTML and a fatal MDX parse
 * error, which is the difference between a page that renders and a page that
 * fails the build.
 *
 * The `class` rewrite is scoped to tag openings, so the same characters sitting
 * in a paragraph of prose are left alone.
 */
/**
 * The elements whose meaning is structural. Anything not here is inline and
 * belongs on the same line as the text around it, where a space between two
 * `<b>`s is a real space between two words.
 */
const BLOCK = new Set([
  "address", "article", "aside", "blockquote", "dd", "div", "dl", "dt", "fieldset",
  "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6",
  "header", "hr", "li", "main", "nav", "ol", "p", "pre", "section", "table",
  "tbody", "td", "tfoot", "th", "thead", "tr", "ul",
]);

function isBlockElement(node: HastContent): node is Element {
  return node.type === "element" && BLOCK.has(node.tagName);
}

function serialize(nodes: HastContent[]): string {
  return toHtml({ type: "root", children: nodes } as HastRoot, {
    closeSelfClosing: true,
    allowDangerousHtml: true,
  });
}

/** `<div class="x">` — the element's own opening tag, without its children. */
function openTag(element: Element): string {
  const empty = serialize([{ ...element, children: [] } as Element]);
  const close = `</${element.tagName}>`;
  return empty.endsWith(close) ? empty.slice(0, -close.length) : empty;
}

/**
 * Lay the markup out so MDX reads it as the structure it is.
 *
 * ## The two failures this sits between
 *
 * MDX parses the children of a JSX element as markdown, and that produces two
 * opposite disasters depending on where the newlines fall.
 *
 * **A line that starts with bare text** opens a markdown paragraph, and a closing
 * tag later on that line is then inside it:
 *
 *     <div style="…">
 *   Date: <span>16 JANUARY 2023</span></div></div></div>
 *
 * A `</div>` cannot close a block element from inside a paragraph — the page
 * fails to compile.
 *
 * **The whole block on one line** compiles, and is worse. Verified against the
 * MDX parser: every element in it comes back as an `mdxJsxTextElement` inside a
 * single `paragraph`. The `<ul>` and its `<li>`s are then *inline elements inside
 * a `<p>`*, which is invalid nesting, so the browser hoists them out and the list
 * arrives as one unbroken run of text — every word present, every bullet, heading
 * and paragraph break gone. That is what collapsing everything onto one line did
 * to the Pipedrive page.
 *
 * ## The rule
 *
 * **An element that has block-level children is split across lines; anything else
 * stays on one.**
 *
 * Split, and the outer elements parse as `mdxJsxFlowElement` — real structure.
 * Kept whole, a leaf like `<p>Date: <span>x</span></p>` never puts bare text at
 * the start of a line, so the first failure cannot happen either. Every text node
 * in the output is inside a leaf element, on that leaf's own line.
 */
function layout(nodes: HastContent[], depth: number): string[] {
  const pad = "  ".repeat(depth);
  const lines: string[] = [];
  let inline: HastContent[] = [];

  const flush = (): void => {
    if (inline.length === 0) return;
    const html = serialize(inline).trim();
    if (html.length > 0) lines.push(pad + html);
    inline = [];
  };

  for (const node of nodes) {
    if (!isBlockElement(node)) {
      inline.push(node);
      continue;
    }

    flush();

    const children = node.children as HastContent[];
    if (!children.some(isBlockElement)) {
      // A leaf: text and inline elements only, so it is safe — and better — whole.
      lines.push(pad + serialize([node]).trim());
      continue;
    }

    lines.push(pad + openTag(node));
    lines.push(...layout(children, depth + 1));
    lines.push(`${pad}</${node.tagName}>`);
  }

  flush();
  return lines;
}

/**
 * Two rewrites, both mandatory rather than cosmetic. `class` is `className` on
 * the target `[DAI §16–18]`. And `closeSelfClosing` turns `<img src=…>` into
 * `<img src=… />` — an unclosed void element is valid HTML and a fatal MDX parse
 * error, which is the difference between a page that renders and a page that
 * fails the build.
 *
 * The `class` rewrite is scoped to tag openings, so the same characters sitting
 * in a paragraph of prose are left alone.
 */
function toMdxHtml(nodes: HastContent[]): string {
  const tree = { type: "root", children: nodes } as HastRoot;

  // First, so the source's own indentation stops being content. `layout` then
  // decides every newline in the output deliberately, rather than inheriting
  // whatever the author's editor produced. Minifying rather than stripping,
  // because the space between `<b>a</b>` and `<b>b</b>` is a real space.
  minifyWhitespace(tree);

  const html = layout(tree.children as HastContent[], 0).join("\n");

  return html.replace(/<[a-zA-Z][^>]*>/g, (tag) => tag.replace(/\sclass="/g, ' className="'));
}

function isHtmlBlock(node: RootContent): node is MdxJsxFlowElement {
  return node.type === "mdxJsxFlowElement" && node.name === "HTMLBlock";
}

export function convertHtmlBlocks(root: Root, notes: ConversionNote[]): void {
  // A block written on one line parses as an `mdxJsxTextElement` inside a
  // paragraph, not as a flow element — so the walk below finds nothing and the
  // tag ships untouched. The same lift the Marketplace pass needs, for the same
  // reason.
  liftInlineJsx(root, new Set(["HTMLBlock"]), notes);

  const walk = (parent: Parent): void => {
    const children = parent.children as RootContent[];

    for (let index = 0; index < children.length; index += 1) {
      const child = children[index];
      if (child === undefined) continue;

      if (!isHtmlBlock(child)) {
        if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);
        continue;
      }

      const line = lineOf(child);
      const content = contentOf(child);

      if (content.kind === "children") {
        // No template literal means MDX already parsed the body, so there is no
        // HTML string to restyle — only a wrapper around content that is already
        // in the tree. Unwrapping keeps every node and lets the passes below
        // treat them like any other content; fencing would quote markdown that
        // was never HTML, and leaving the tag would ship an undefined component
        // `[PIT Phase 5]`.
        const inner = child.children as RootContent[];
        children.splice(index, 1, ...inner);
        index -= 1;

        notes.push({
          rule: "html-block",
          level: "change",
          ...(line !== undefined ? { line } : {}),
          detail:
            "unwrapped <HTMLBlock> — its body has no `{`…`}` template literal, so MDX parsed it as " +
            "ordinary content rather than as an HTML string. The wrapper is dropped and the content " +
            "kept; there was no stylesheet to inline",
        });
        continue;
      }

      const html = content.html;

      const tree = htmlToHast(html);
      const nodes = tree.children as HastContent[];
      const scripted = hasScript(html);
      const css = takeStyles(nodes);
      const sheet = parseCss(css);
      applyStyles(nodes, sheet);

      const converted = toMdxHtml(nodes).trim();
      if (converted.length === 0) {
        notes.push({
          rule: "html-block",
          level: "flag",
          ...(line !== undefined ? { line } : {}),
          detail: "<HTMLBlock> held no markup once its <style> and <script> were removed — dropped",
        });
        children.splice(index, 1);
        index -= 1;
        continue;
      }

      children.splice(index, 1, { type: "html", value: converted });

      notes.push({
        rule: "html-block",
        level: "change",
        ...(line !== undefined ? { line } : {}),
        detail:
          `unwrapped <HTMLBlock> and moved its ${sheet.rules.length} CSS rule${sheet.rules.length === 1 ? "" : "s"} ` +
          "onto the elements they style — Documentation.AI takes `style` as a plain CSS string, " +
          "and `class` became `className` so the markup compiles as MDX",
      });

      // Every one of these is behaviour the page used to have and now does not.
      // Reported per reason rather than as one count, because the answer differs:
      // a media query moves to site CSS, a `:hover` may simply be accepted as lost.
      for (const entry of sheet.dropped) {
        notes.push({
          rule: "html-block",
          level: "flag",
          ...(line !== undefined ? { line } : {}),
          detail:
            `\`${entry.selector}\` was not carried over — ${entry.why}. ` +
            "Re-add it in the site's own CSS (`documentation.json` accepts a `css` key) if the block needs it",
        });
      }

      if (scripted) {
        notes.push({
          rule: "html-block",
          level: "blocker",
          ...(line !== undefined ? { line } : {}),
          detail:
            "<HTMLBlock> contained a <script>, which was removed — Documentation.AI runs no page " +
            "scripts, so whatever it did is gone. Decide whether the block still says what it " +
            "should without it",
        });
      }
    }
  };

  walk(root);
}
