import { parseMarkdown } from "../download/parse";
import type { ConversionNote } from "./mdast";

/**
 * Makes a page parse as MDX, without changing what it says.
 *
 * **[CORPUS] 83 of 1,020 Capillary pages fail the strict parser** — and almost
 * none of them fails because of a component. They fail on a bare `<` in prose:
 *
 * | Cause | Pages | Example |
 * |---|---|---|
 * | A plain autolink | **39** | `<https://eu.intouch.capillarytech.com>` |
 * | A comparison operator | ~20 | `<=`, `<5000`, `currentTxns.value<6000` |
 * | An email autolink | 9 | `<gateways@capillarytech.com>` |
 * | A template placeholder | 8 | `{{#var}}`, `${DATABRICKS_HOST}` |
 *
 * `<https://…>` is a perfectly good CommonMark autolink. MDX gives `<` followed by
 * a letter to JSX, so it reads `https` as a tag name and dies on the `:`.
 *
 * ## Why this matters far more than it looks
 *
 * A page that fails strict MDX is parsed as plain markdown instead, and there
 * every component is just text: `<Callout icon="📘" theme="info">` never becomes a
 * `<Callout kind="info">`, a `<Table>` never becomes a pipe table, and the closing
 * tags leak into the output. **One autolink costs a page every component
 * conversion on it.** Repairing the source first is worth more than any single
 * component rule.
 *
 * ## What it must never touch
 *
 * Code. A fence, an indented block or an inline span is content, and `<`, `{` and
 * `<https://…>` all mean themselves there. Every repair below runs only on the
 * prose between them.
 */

/** A fenced block, from its opening fence to its closing one. */
const FENCE = /^( {0,3})(`{3,}|~{3,})[^\n]*\n[\s\S]*?(?:^\1?\2[^\n]*$|\z)/gm;
/** An inline code span. Single-line by definition — `[^`\n]` stops at a newline. */
const INLINE_CODE = /`+[^`\n]*`+/g;
/**
 * An MDX expression holding a template literal — `` {`…`} `` — across any number
 * of lines.
 *
 * **Without this, a multi-line template literal is not treated as code.**
 * `INLINE_CODE` cannot see one, because it stops at the first newline, so the
 * `${` rule below fires *inside* the literal and rewrites `${1 + 2}` to
 * `$\{1 + 2}`. That breaks the interpolation, and — worse for maths — leaves a
 * stray `$` behind, so KaTeX pairs its delimiters against the wrong dollar signs
 * and renders the prose between them as an equation.
 *
 * This is the form ReadMe requires for `<Latex>` and `<Terminal>` `[RM §9]`, and
 * inside a template literal `${`, `{` and `<` all mean themselves — exactly the
 * "code means itself" case the masking already exists for.
 */
const TEMPLATE_LITERAL = /\{`[\s\S]*?`\}/g;
/** Four spaces or a tab — the shape of an indented code block, on its own. */
const INDENTED_LINE = /^(?: {4}|\t)/;

/**
 * Lines that close whatever came before them, so the next indented line really is
 * a code block: an ATX heading and a thematic break are both leaf blocks.
 */
const CLOSES_PARAGRAPH = /^ {0,3}(#{1,6}(\s|$)|([-*_])\s*(\3\s*){2,}$)/;

/**
 * Masks indented code blocks — **and only the ones markdown would call code.**
 *
 * An indent of four spaces is not enough to make a line code. CommonMark is
 * explicit that *an indented code block cannot interrupt a paragraph*: after a
 * line of prose, an indented line is a lazy continuation of it, and renders as
 * ordinary text.
 *
 * Masking on the indent alone therefore hid real prose from every repair below,
 * and it hid exactly the prose most likely to need one — hand-written HTML, which
 * authors indent. `reference/editcustomer` is the case: its whole `<ol>` is
 * indented four spaces, so `splitOpenTagFromText` never saw the `<li>` that was
 * breaking the page, and the page kept falling to the lenient parser with its
 * markup untouched.
 *
 * Unmasking those lines cannot expose real code to the prose rules, because a
 * line that is a lazy continuation was never code to begin with — markdown was
 * already rendering it as text.
 */
function maskIndentedCode(text: string, hold: (match: string) => string): string {
  let paragraphOpen = false;

  return text
    .split("\n")
    .map((line) => {
      if (line.trim().length === 0) {
        paragraphOpen = false;
        return line;
      }

      if (INDENTED_LINE.test(line) && !paragraphOpen) return hold(line);

      // A heading or a rule ends the block above it, so what follows starts fresh.
      paragraphOpen = !CLOSES_PARAGRAPH.test(line);
      return line;
    })
    .join("\n");
}

/** `[text](<https://x>)` — angle brackets around a link destination. */
const WRAPPED_DESTINATION = /\]\(\s*<(https?:\/\/[^>\s]+)>\s*\)/g;
/** `<https://x>` standing on its own. */
const AUTOLINK = /<(https?:\/\/[^>\s]+)>/g;
/**
 * `<name@example.com>`, and the same with a sentence's punctuation swept inside
 * the brackets — `<support@modulrfinance.com.>`.
 *
 * That trailing group is not tidiness. Requiring the TLD to sit flush against the
 * `>` let one page in the corpus through with its `<support@…com.>` intact, and
 * the cost was the whole page: strict MDX read `<s` as a tag, died on the `@`,
 * and the fallback parser gave the page **no component conversions at all** — its
 * `<Callout theme="default">` shipped unconverted, and its `</Callout>` came back
 * indented inside a list item, so the output would not compile either. One
 * stray full stop, two failures, and neither of them mentions an email address.
 *
 * The punctuation is captured rather than consumed so it can be put back *after*
 * the link, where the author meant it: `[support@…com](mailto:support@…com).`
 * Swallowing it would put a full stop inside the address.
 */
const EMAIL =
  /<([A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,})([.,;:!?]*)>/g;
/**
 * `<!-- … -->` — an HTML comment, which **MDX does not have**. The parser says so
 * itself: *"to create a comment in MDX, use `{/* text *\/}`"*.
 *
 * Rewritten rather than deleted, because the two are not the same decision. A
 * comment is invisible either way, so translating it costs nothing and keeps a
 * note the author wrote; deleting it throws away information on the guess that
 * nobody wanted it. `[CORPUS]` the six in `recipes/hmac-authentication` are
 * ReadMe's `<!-- java@16 -->` line-highlight markers — meaningless to the target,
 * but they are the only record of which lines each step was about.
 *
 * Non-greedy, so two comments on one line stay two comments.
 */
const HTML_COMMENT = /<!--([\s\S]*?)-->/g;

/**
 * A `<` that cannot start a tag.
 *
 * JSX allows `<` only before a letter, a `/` that begins a closing tag, or a `>`
 * for a fragment. Anything else — `<=`, `<5000`, `<,`, `< ` — is a comparison or
 * prose, and escaping it is what the corpus already does 157 times by hand.
 */
const BARE_ANGLE = /(?<!\\)<(?![A-Za-z>]|\/[A-Za-z]|!--)/g;
/**
 * `{{handlebars}}` and `${shell}` placeholders, which MDX reads as expressions.
 *
 * **Only the doubled forms**, and **never after an `=`**. Both exclusions are real
 * JSX that the corpus is full of:
 *
 * - `<Table align={["left","left"]}>` — a single brace is how every attribute is
 *   written.
 * - `<span style={{fontSize: "11pt"}}>` — a style object is a *doubled* brace, and
 *   the only thing separating it from `{{handlebars}}` is the `=` before it.
 */
const TEMPLATE = /(?<![\\=])(\$\{|\{\{)/g;
/**
 * A line of text with a closing tag stuck on the end of it.
 *
 * `(.*\S)` is greedy, so on a line holding several closing tags this matches the
 * last one — the one actually at the end of the line.
 */
/**
 * An opening tag, split into its name, its attribute area, and its closing
 * slash.
 *
 * The alternation keeps a quoted value whole, so a `>` inside one cannot end the
 * match early. The three branches are mutually exclusive at any position —
 * `[^<>"']` cannot start where a quote does — so there is nothing to backtrack
 * between and the pattern stays linear.
 */
const OPEN_TAG = /<([A-Za-z][A-Za-z0-9.:-]*)((?:[^<>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;

/**
 * One step through a tag's attribute area: a quoted value, or `name=value` with
 * nothing quoting it.
 *
 * **The quoted branch comes first, and it is what makes this safe.** A URL in an
 * `href` routinely carries its own `=`:
 *
 * ```
 * <Anchor href="https://x/docs/customer?isFramePreview=true#step-5">
 * ```
 *
 * Matching `name=value` alone finds `isFramePreview=true#step-5` *inside* that
 * string and quotes it again, which ends the real attribute early and costs the
 * page — `[CORPUS] modulr/docs/customer-verification-integration-guide` failed
 * exactly this way. Consuming the quoted value whole means the scan never looks
 * inside one.
 *
 * An unquoted value may itself hold `/`, since `src=https://x/a.png` is one
 * attribute and not a URL cut off at its scheme — the tag's own closing slash is
 * already split off by `OPEN_TAG`.
 *
 * `{` and `}` are excluded so a JSX expression (`cols={2}`) is left alone: it is
 * already valid, and quoting it would turn a number into a string.
 */
const ATTRIBUTE = /("[^"]*"|'[^']*')|([A-Za-z_][A-Za-z0-9_.:-]*)=([^\s"'`{}<>]+)/g;

/**
 * Puts quotes around an attribute value that has none.
 *
 * **HTML allows it, MDX does not.** `<div align=center>` is valid HTML and has
 * been since 1995, so authors write it and ReadMe renders it — but MDX reads the
 * page as JSX, where an attribute value must be a string or an expression. It
 * fails with *"Unexpected character `c` (U+0063) before attribute value"*, `c`
 * being the first letter of `center`.
 *
 * `[CORPUS] 12 of 1,000 techdocs.akamai.com pages fail strict MDX, and all 12
 * fail on this` — 20 occurrences, every one `<div align=center>` wrapping a
 * screenshot. Two of them are also reported as broken `<table>`s, which is the
 * same failure seen from the other end: the page parsed as plain markdown, so
 * the table never became one element.
 *
 * The repair is the smallest one that exists — two characters — and it changes
 * nothing about what the page says, because a quoted value is what the HTML
 * parser was inferring anyway.
 */
function quoteAttributeValues(text: string): string {
  return text.replace(
    OPEN_TAG,
    (_tag, name: string, attributes: string, selfClosing: string) =>
      `<${name}${attributes.replace(
        ATTRIBUTE,
        (match, quoted: string | undefined, attribute: string, value: string) =>
          quoted === undefined ? `${attribute}="${value}"` : match,
      )}${selfClosing}>`,
  );
}

/** The HTML elements that never take a closing tag `[HTML §13.1.2]`. */
const VOID_ELEMENTS = "area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr";

/**
 * A void element, with the redundant closing tag some authors write after it
 * captured too, so the two can be replaced together.
 */
const VOID_TAG = new RegExp(
  `<(${VOID_ELEMENTS})\\b((?:[^<>"']|"[^"]*"|'[^']*')*)>(\\s*</\\1\\s*>)?`,
  "gi",
);

/**
 * Self-closes a void element that was written the HTML way.
 *
 * `<col>` and `<br>` need no closing tag in HTML, and JSX has no such category —
 * every element there is either self-closed or closed. So JSX reads `<col>` as an
 * element that is still open, and the failure surfaces on whatever closes next:
 *
 * ```
 * <colgroup><col><col></colgroup>
 * -> Unexpected closing tag `</colgroup>`, expected corresponding closing tag for `<col>`
 * ```
 *
 * The reported line is the `</colgroup>`, which is not where the problem is —
 * one of the several ways this class of error points somewhere innocent.
 *
 * Rare but fatal: `[CORPUS] 3 occurrences across 2 of 1,000 techdocs.akamai.com
 * pages`, and each one costs its whole page.
 */
function selfCloseVoidElements(text: string): string {
  return text.replace(
    VOID_TAG,
    (_match, name: string, attributes: string) =>
      // The trailing `/` goes too, so an already-self-closed tag is not given a
      // second one — and so `<img …></img>` loses the closing tag it should never
      // have had rather than keeping it beside a newly self-closing element.
      `<${name}${attributes.replace(/\s*\/?\s*$/, "")} />`,
  );
}

/**
 * HTML elements that hold flow content, longest name first so `</pre>` cannot be
 * matched as `</p>` plus a stray `re`.
 *
 * Only these, never an inline element. A closing `</em>` lifted onto its own line
 * is still a closing tag with no flow-level opener to attach to — the same error
 * moved two characters, and a sentence split in half for nothing.
 */
const BLOCK_ELEMENTS =
  "blockquote|figcaption|colgroup|fieldset|details|section|summary|address|article|caption|dialog|footer|header|hgroup|figure|tbody|thead|tfoot|table|aside|main|form|nav|h[1-6]|div|pre|dl|dt|dd|ol|ul|li|td|th|tr|p";

/**
 * A closing tag at the end of a line of prose.
 *
 * Matches a component (any capitalised name) or a block-level HTML element. The
 * two fail identically — MDX has one rule for both — and `</td>` at the end of a
 * cell is as common in a hand-written table as `</Callout>` is after a note.
 */
const TRAILING_CLOSE = new RegExp(
  `^(.*\\S)[ \\t]*(<\\/([A-Z][A-Za-z0-9]*|${BLOCK_ELEMENTS})>)[ \\t]*$`,
);

/**
 * Moves a closing tag off the end of a sentence and onto its own line.
 *
 * **[CORPUS] this single shape costs 54 of the 62 pages that fail the strict
 * parser**, and the pages it breaks are the same ones whose output will not
 * compile. It is written like this all over the source:
 *
 * ```mdx
 * <Callout icon="📘" theme="info">
 *   Note
 *
 * Negative values will not be considered. </Callout>
 * ```
 *
 * The blank line ends the paragraph, so MDX is back in flow content — and then
 * finds a closing tag inside a sentence, which it cannot attach to anything:
 * *"Expected the closing tag `</Callout>` either after the end of `paragraph`"*.
 * `</Callout>` on its own line parses, and says exactly the same thing.
 *
 * ## The case it must not touch
 *
 * A whole element written on one line is **valid** and common:
 *
 * ```mdx
 * See the <Anchor href="/x">reference</Anchor> for details.
 * ```
 *
 * That is an inline element, not a broken block one. So the opening tag is looked
 * for on the same line first, and the line is left alone when it is there — which
 * is what separates the 71 broken `</Callout>`s from the 318 `<Anchor>`s that are
 * already fine.
 */
function liftTrailingCloseTags(text: string): string {
  const lines = text.split("\n");
  const out: string[] = [];

  for (const line of lines) {
    let rest = line;

    // A line can end in more than one closing tag (`text</a></b>`), so peel them
    // off one at a time until what is left no longer ends in one.
    const peeled: string[] = [];
    for (;;) {
      const match = TRAILING_CLOSE.exec(rest);
      if (match === null) break;

      const [, before, close, name] = match;
      if (before === undefined || close === undefined || name === undefined) break;

      // Opened on this very line: an inline element, and already valid.
      if (new RegExp(`<${name}[\\s/>]`).test(before)) break;

      peeled.unshift(close);
      rest = before;
    }

    out.push(rest, ...peeled);
  }

  return out.join("\n");
}

/**
 * A block element whose text sits on the opening tag's line, while a block child
 * follows on the next.
 *
 * ## Why this one line decides how the whole page parses
 *
 * MDX chooses between *inline* and *block* JSX by what follows the opening tag.
 * Text on the same line makes the element an `mdxJsxTextElement`, which lives
 * inside a paragraph — and a paragraph ends at the next block. So the `<ul>` on
 * the following line terminates the paragraph while the `<li>` is still open:
 *
 * ```html
 * <li>For all customers not requiring KYC: <b>industryCode</b> can be edited. Of those:
 *   <ul>
 *     <li>For all other customer types: <b>name</b></li>
 *   </ul>
 * </li>
 * ```
 *
 * *"Expected a closing tag for `<li>` before the end of `paragraph`"* — on markup
 * that is perfectly well-formed HTML, with every tag closed. Verified against the
 * parser: the identical markup with the text on its **own** line parses, and so
 * does the identical markup written entirely on **one** line. It is the mixture
 * that fails.
 *
 * So the text moves down a line. Markdown joins the two again, so the page says
 * exactly what it said before — and the element is now block-level, which is what
 * its block children needed all along.
 *
 * ## What it must not touch
 *
 * The trailing content has to be **text**, not another tag. `[CORPUS]` the two
 * near-misses are `<figure><span …>` and `<div class="…"><p>…</p>`, both of which
 * open with an element rather than a sentence, both of which already parse, and
 * neither of which this touches — the negative lookahead for `<` is what keeps
 * them out.
 */
const OPEN_WITH_TRAILING_TEXT =
  /^(\s*)(<(li|td|th|dd|dt|div|section|figure|blockquote|details|summary)(?:\s[^>]*)?>)(?!\s*$)([^<].*)$/;

/** A line that begins a block-level element — the thing that ends the paragraph. */
const OPENS_BLOCK = /^\s*<(ul|ol|table|div|section|figure|blockquote|dl|pre|p|h[1-6])\b/;

function splitOpenTagFromText(text: string): string {
  const lines = text.split("\n");
  const out: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] as string;
    const match = OPEN_WITH_TRAILING_TEXT.exec(line);

    if (match) {
      const [, indent = "", open = "", tag = "", trailing = ""] = match;
      // Closed on its own line, so it is a self-contained inline element and the
      // block below belongs to something else.
      const closed = line.includes(`</${tag}>`);
      // The failure needs a block child *after* the text. Without one the element
      // is a perfectly good inline element and splitting it would change nothing
      // except the diff.
      const next = lines.slice(i + 1).find((value) => value.trim().length > 0) ?? "";

      if (!closed && OPENS_BLOCK.test(next)) {
        out.push(indent + open, indent + trailing);
        continue;
      }
    }

    out.push(line);
  }

  return out.join("\n");
}

/**
 * An opening component tag alone on its line, and its matching closing tag.
 *
 * Alone on the line is the whole precondition: a tag sharing a line with prose is
 * inline JSX and its indentation means nothing, so re-indenting it would be
 * rewriting a sentence.
 */
const LONE_OPEN = /^([ \t]*)<([A-Z][A-Za-z0-9]*)\b([^>]*)>[ \t]*$/;
const LONE_CLOSE = /^([ \t]*)<\/([A-Z][A-Za-z0-9]*)>[ \t]*$/;

/**
 * Pulls a closing tag back to its opening tag's column, when it has drifted out
 * to a shallower one.
 *
 * ## The shape, and why two spaces cost a whole page
 *
 * ```markdown
 * * When a contribution crosses the annual limit:
 *   * If a deposit reaches the exact limit, the transaction is approved.
 *     <Callout icon="📘" theme="info">     <- indent 4: inside the inner item
 *     The API will always accept it.
 *   </Callout>                            <- indent 2: the OUTER item's column
 * ```
 *
 * Indent 4 is the nested list item's content column and indent 2 is its parent's,
 * so the element opens inside one block and closes inside another. MDX cannot
 * represent that — *"Expected a closing tag for `<Callout>` before the end of
 * `listItem`"* — and the page drops to the lenient parser, where **no component
 * on it is converted at all**. `[CORPUS]` on the page this was found on, that
 * cost all three of its callouts, including the two that were written correctly.
 *
 * ## Only outward, and only when it helps
 *
 * A closing tag *deeper* than its opener is a different shape that parses on its
 * own, so it is left alone. And the whole rule is gated on the page failing
 * before and parsing after `[applyIfItHelps]` — re-indenting a closing tag moves
 * it between blocks, which is a content decision, and the only evidence that the
 * author meant it is that the alternative does not compile.
 */
function alignClosingTags(text: string): string {
  const open: { name: string; indent: string }[] = [];

  return text
    .split("\n")
    .map((line) => {
      const opening = LONE_OPEN.exec(line);
      // A self-closing tag opens nothing, so it must not go on the stack — one
      // `<Image />` between an opener and its closer would pair with the wrong tag.
      if (opening && !(opening[3] ?? "").trimEnd().endsWith("/")) {
        open.push({ name: opening[2] as string, indent: opening[1] as string });
        return line;
      }

      const closing = LONE_CLOSE.exec(line);
      if (!closing) return line;

      const owner = open[open.length - 1];
      // Unbalanced, or closing something other than the innermost open element:
      // the nesting is not what this rule assumes, so it is not this rule's to fix.
      if (!owner || owner.name !== closing[2]) return line;
      open.pop();

      return (closing[1] as string).length < owner.indent.length
        ? owner.indent + line.trim()
        : line;
    })
    .join("\n");
}

type Repair = { name: string; apply: (text: string) => string; count: number };

function repairs(): Repair[] {
  return [
    {
      // Before the autolink rule: `](<url>)` is a *destination*, and turning it
      // into a link would nest one link inside another.
      name: "link destination in angle brackets",
      apply: (text) => text.replace(WRAPPED_DESTINATION, "]($1)"),
      count: 0,
    },
    {
      name: "autolink",
      apply: (text) => text.replace(AUTOLINK, "[$1]($1)"),
      count: 0,
    },
    {
      name: "email autolink",
      // `$2` is whatever punctuation the brackets swallowed, put back outside the
      // link so the address stays an address and the sentence keeps its full stop.
      apply: (text) => text.replace(EMAIL, "[$1](mailto:$1)$2"),
      count: 0,
    },
    {
      name: "template placeholder",
      apply: (text) =>
        // Both braces of `{{`: escaping only the first leaves `{#var}` behind,
        // which is still an expression and still fails.
        text.replace(TEMPLATE, (match: string) => (match === "${" ? "$\\{" : "\\{\\{")),
      count: 0,
    },
    {
      name: "HTML comment",
      // A `*/` inside the body would close the MDX comment early and spill the
      // rest onto the page. Separating the two characters cannot do that, and a
      // comment nobody renders is the one place that is free.
      apply: (text) =>
        text.replace(HTML_COMMENT, (_match, body: string) => `{/*${body.replace(/\*\//g, "*\\/")}*/}`),
      count: 0,
    },
    {
      // Before the two tag-shape rules below, so they see a tag whose attributes
      // are already quoted — an unquoted value can hold a `/`, which is what
      // decides whether a tag reads as self-closing.
      name: "unquoted attribute value",
      apply: quoteAttributeValues,
      count: 0,
    },
    {
      // After the quoting rule, so a value that ends in `/` has already been
      // wrapped and cannot be mistaken for the tag's own closing slash.
      name: "unclosed void element",
      apply: selfCloseVoidElements,
      count: 0,
    },
    {
      name: "closing tag at the end of a line",
      apply: liftTrailingCloseTags,
      count: 0,
    },
    {
      // After `liftTrailingCloseTags`, which can put a closing tag on its own line
      // and so change whether the element below counts as closed.
      name: "text on a block tag's opening line",
      apply: splitOpenTagFromText,
      count: 0,
    },
    {
      name: "bare < in prose",
      apply: (text) => text.replace(BARE_ANGLE, "\\<"),
      count: 0,
    },
  ];
}

/**
 * Runs `fn` on the prose of a page, leaving every code region byte for byte.
 *
 * Code is masked out first — fences, indented blocks, inline spans — and put back
 * afterwards, so a regex can be written for the prose case without also having to
 * describe every place it must not fire.
 */
export function outsideCode(source: string, fn: (text: string) => string): string {
  const held: string[] = [];
  const hold = (match: string) => {
    held.push(match);
    return ` ${held.length - 1} `;
  };

  const masked = maskIndentedCode(
    source
      .replace(FENCE, hold)
      // Before the indent mask and INLINE_CODE: a template literal is usually
      // indented and is always backticked, so either would claim part of it and
      // leave the rest exposed to the prose rules.
      .replace(TEMPLATE_LITERAL, hold),
    hold,
  ).replace(INLINE_CODE, hold);

  return fn(masked).replace(/ (\d+) /g, (_, index: string) => held[Number(index)] ?? "");
}

/**
 * Repairs a page's source so the strict parser will accept it.
 *
 * Runs **before parsing**, for the same reason `expandMagicBlocks` does: what it
 * fixes is the reason there is no tree to fix.
 */
/** Whether the strict MDX parser accepts this text as it stands. */
function parses(text: string): boolean {
  return parseMarkdown(text).mode === "mdx";
}

/**
 * Repairs that are applied **only when they demonstrably help.**
 *
 * ## Why a second tier exists at all
 *
 * Every rule above is safe to run on any page: escaping a bare `<`, turning an
 * autolink into a link, translating a comment. None of them can change what a
 * page says, so none of them needs permission.
 *
 * Re-indenting a closing tag is not like that. Indentation is what decides which
 * block an element belongs to, so moving it *is* a content decision — and the
 * only evidence that the author meant the other block is that the version they
 * wrote does not compile. So the rule is allowed to act on exactly that evidence
 * and nothing else: the page must fail before, and parse after. A page that was
 * already fine is never touched, and a repair that does not fix the parse is
 * thrown away rather than shipped on a hunch.
 *
 * That is also what makes the tier the right home for anything riskier later.
 * `[CORPUS]` one page in 1,659 has the shape this exists for — too rare to be
 * worth an unconditional rule, too expensive to leave alone, since a page that
 * falls back loses every component conversion on it and not just the broken one.
 */
function applyIfItHelps(source: string): { source: string; notes: ConversionNote[] } {
  // Already good. Nothing here may touch a page that compiles.
  if (parses(source)) return { source, notes: [] };

  const candidate = outsideCode(source, alignClosingTags);
  if (candidate === source || !parses(candidate)) return { source, notes: [] };

  return {
    source: candidate,
    notes: [
      {
        rule: "repair",
        level: "flag",
        detail:
          "moved a closing tag back to its opening tag's column — it had drifted out to a " +
          "shallower block, which MDX cannot represent. Checked rather than assumed: the page " +
          "would not parse before and does after. Confirm the element wraps what the author meant",
      },
    ],
  };
}

export function repairSource(source: string): { source: string; notes: ConversionNote[] } {
  const rules = repairs();

  const repaired = outsideCode(source, (text) => {
    let out = text;
    for (const rule of rules) {
      const before = out;
      out = rule.apply(out);
      if (out !== before) {
        // Count the difference in length of the marker each rule adds, rather than
        // re-running the regex: a rule may change what the next one matches.
        rule.count += 1;
      }
    }
    return out;
  });

  const applied = rules.filter((rule) => rule.count > 0);
  const notes: ConversionNote[] =
    applied.length === 0
      ? []
      : [
          {
            rule: "repair",
            level: "change",
            detail: `repaired the source so it parses as MDX (${applied.map((rule) => rule.name).join(", ")}) — an unescaped \`<\` anywhere costs the page every component conversion on it`,
          },
        ];

  // Last, and on the already-repaired text: the cheap rules may have fixed the
  // page on their own, in which case the gate below sees a parsing page and does
  // nothing — which is exactly right.
  const conditional = applyIfItHelps(repaired);

  return { source: conditional.source, notes: [...notes, ...conditional.notes] };
}
