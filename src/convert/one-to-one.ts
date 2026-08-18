import type { Code, Link, Parent, PhrasingContent, Root, RootContent } from "mdast";
import type { MdxJsxAttribute, MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";
import { toString as mdastToString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { CALLOUT_EMOJI_TO_KIND, calloutKind } from "../download/mapping";
import { lucideIcon } from "./icons";
import { attr, bold, isJsx, lineOf, readAttr, type ConversionNote } from "./mdast";

export type { ConversionNote } from "./mdast";
export { FA_TO_LUCIDE, lucideIcon } from "./icons";

/**
 * Section 1 of `Components-Information/component-conversion-plan.md`: the ReadMe
 * constructs that survive the move to Documentation.AI with no loss, where only
 * attribute names and values change.
 *
 * Every conversion here is a pure function over MDAST. That matters for two
 * reasons. A page can be converted, inspected and converted again without
 * drifting (the driver is idempotent, so one page can be re-run without
 * re-running the corpus), and each rule can be unit-tested against a two-line
 * fixture instead of a whole page.
 *
 * What the module deliberately does NOT do:
 *
 * - **Promote ordered lists to `<Steps>`.** That rule needs to look at a whole
 *   list at once and lives in `steps.ts` (plan §2.8).
 * - **Demote body H1s.** Reproducing source heading levels is the rule and
 *   silently "fixing" a hierarchy is the documented failure, so H1s are reported
 *   and only moved when the caller opts in (plan §1.9).
 * - **Emit raw HTML.** No branch in this file produces a `<div>`, `<table>` or
 *   `<span>` (plan global rules).
 *
 * Anything that needs restructuring rather than renaming — `Accordion`, `Cards`,
 * `Columns`, `Embed`, the JSX `<Table>` — is Section 2 and lives elsewhere.
 */

export type LinkProtocol = "doc" | "ref" | "changelog" | "blog" | "page";

export type ConvertOptions = {
  /**
   * The frontmatter title. A body `# Title` that duplicates it is dropped,
   * because Documentation.AI generates the H1 from frontmatter and the page
   * would otherwise print its title twice.
   */
  title?: string;
  /**
   * The source site origin (`https://docs.capillarytech.com`). Absolute URLs
   * pointing back at it are internal links wearing an external costume — 361 of
   * 361 corpus anchors are written this way — and get rewritten to site-relative
   * paths.
   */
  site?: string;
  /**
   * Slug -> migrated path. Supply the site-wide map here; links are the one
   * conversion that cannot be decided from a single page, which is why the
   * driver runs them last.
   */
  resolvePath?: (protocol: LinkProtocol, slug: string) => string | undefined;
  /**
   * What to do with body H1s once the duplicate title is gone. `preserve` (the
   * default) keeps them and reports them. `demote` shifts every heading on the
   * page down one level, preserving the hierarchy — an explicit, page-wide
   * decision, never a per-heading guess.
   */
  headingPolicy?: "preserve" | "demote";
  /**
   * Original image URL -> the local path to write instead. This is the `map` from
   * `downloadImages`; a URL it does not contain keeps its original `src`.
   */
  imageSrc?: (url: string) => string | undefined;
};

export type ConvertResult = { tree: Root; notes: ConversionNote[] };

/**
 * Fence languages we recognise. Used for one decision only: a fence whose
 * "language" is not in this set and which has no title is really a title-only
 * fence (ReadMe allows ```` ```Zed ````), so the word moves into `title=` and
 * the language becomes `text`.
 *
 * `curl` is here on purpose — Documentation.AI aliases it to `bash` natively, so
 * all 266 corpus `curl` fences carry across untouched rather than being rewritten.
 */
const KNOWN_LANGS = new Set([
  "bash", "c", "cpp", "cs", "csharp", "css", "curl", "dart", "diff", "go", "graphql", "groovy",
  "html", "http", "ini", "java", "javascript", "js", "json", "json5", "jsonc", "jsx", "kotlin",
  "liquid", "markdown", "md", "mdx", "mermaid", "node", "nodejs", "none", "objectivec", "php",
  "plain", "plaintext", "powershell", "ps1", "python", "py", "rb", "ruby", "rust", "scss", "sh",
  "shell", "sql", "swift", "text", "toml", "ts", "tsx", "typescript", "xml", "yaml", "yml", "zsh",
]);

/** Default protocol targets, matching ReadMe's own `getHref` resolution. */
const PROTOCOL_PREFIX: Record<LinkProtocol, string> = {
  doc: "/docs/",
  ref: "/reference/",
  changelog: "/changelog/",
  blog: "/changelog/",
  page: "/page/",
};

// ---------------------------------------------------------------------------
// 1.1 Callout -> Callout
// ---------------------------------------------------------------------------

/**
 * `<Callout icon theme>` -> `<Callout kind>`.
 *
 * Two source signals collapse into one target attribute, and the order is not
 * negotiable: **`theme` wins over `icon`**, because that is how ReadMe itself
 * resolves it (`<Callout icon="👍" theme="error">` renders red). Reversing the
 * precedence recolours every callout where the corpus pairs 📘 with
 * `theme="warning"`.
 *
 * ReadMe treats a callout's *first child* as its heading. Documentation.AI's
 * `<Callout>` has no `title` attribute, so that text becomes a bold first line
 * of the body — dropping it would be invisible content loss.
 */
export function convertCalloutElement(node: MdxJsxFlowElement, notes: ConversionNote[]): void {
  const theme = readAttr(node, "theme");
  const icon = readAttr(node, "icon");

  /*
   * An already-converted callout keeps its kind. Two things arrive here that way:
   * a blockquote callout the driver converted a moment ago, and any page being
   * re-run. Recomputing from absent theme/icon would reset every one of them to
   * `info` — which is exactly the bug this guard exists to prevent.
   */
  const existing = readAttr(node, "kind");
  if (theme === undefined && icon === undefined && existing) {
    node.attributes = [attr("kind", existing)];
    promoteHeadingToBold(node);
    return;
  }

  const kind = calloutKind(theme, icon);
  node.attributes = [attr("kind", kind)];
  promoteHeadingToBold(node);

  notes.push({
    rule: "callout",
    level: "change",
    line: lineOf(node),
    detail: `theme=${theme ?? "-"} icon=${icon ?? "-"} -> kind="${kind}"`,
  });
}

/** The heading line has no slot on the target, so it becomes bold body text. */
function promoteHeadingToBold(node: MdxJsxFlowElement): void {
  const [first] = node.children;
  // A single child is the body, not a heading — leave it alone.
  if (!first || node.children.length < 2) return;

  if (first.type === "heading") {
    node.children[0] = bold(first.children);
    return;
  }
  if (first.type === "paragraph" && !(first.children.length === 1 && first.children[0]?.type === "strong")) {
    node.children[0] = bold(first.children);
  }
}

/**
 * The markdown callout: `> 📘 Title` + a blank `>` + body. This is the majority
 * spelling — roughly 887 blockquote callouts against 174 JSX ones — so a
 * converter that only handles the JSX form misses most of them.
 *
 * A blockquote with no leading emoji is left as a blockquote. It is a quote.
 */
export function calloutFromBlockquote(
  node: RootContent,
  notes: ConversionNote[],
): MdxJsxFlowElement | null {
  if (node.type !== "blockquote") return null;

  const [first, ...rest] = node.children;
  if (!first || first.type !== "paragraph") return null;

  const leading = first.children[0];
  if (!leading || leading.type !== "text") return null;

  const emoji = Object.keys(CALLOUT_EMOJI_TO_KIND).find((key) => leading.value.startsWith(key));
  if (!emoji) return null;

  const kind = CALLOUT_EMOJI_TO_KIND[emoji] ?? "info";
  const titleChildren: PhrasingContent[] = [
    { ...leading, value: leading.value.slice(emoji.length).trimStart() },
    ...first.children.slice(1),
  ];
  const hasTitle = mdastToString({ type: "paragraph", children: titleChildren }).trim().length > 0;

  notes.push({
    rule: "callout",
    level: "change",
    line: lineOf(node),
    detail: `blockquote "${emoji}" -> <Callout kind="${kind}">`,
  });

  return {
    type: "mdxJsxFlowElement",
    name: "Callout",
    attributes: [attr("kind", kind)],
    // A title with no body stays a plain paragraph: there is nothing to
    // distinguish it from, and bolding a lone line adds emphasis the source
    // never had.
    children: hasTitle
      ? [rest.length > 0 ? bold(titleChildren) : { type: "paragraph", children: titleChildren }, ...rest]
      : rest,
  };
}

// ---------------------------------------------------------------------------
// 1.2 Fence title -> title="…"
// ---------------------------------------------------------------------------

/**
 * ReadMe's fence infostring is `language` + a space + free text. Documentation.AI
 * wants that free text in a named attribute:
 *
 *     ```json Sample response   ->   ```json title="Sample response"
 *     ```Zed                    ->   ```text title="Zed"
 *
 * Skips a fence whose meta is already `title="…"`, which is what makes the whole
 * driver safe to run twice.
 */
export function convertFenceTitle(node: Code, notes: ConversionNote[]): void {
  if (node.meta && /(^|\s)title="/.test(node.meta)) return;

  if (node.meta) {
    const title = node.meta.trim();
    node.meta = `title="${title.replace(/"/g, "&quot;")}"`;
    notes.push({ rule: "fence-title", level: "change", line: lineOf(node), detail: `title="${title}"` });
    return;
  }

  // A title-only fence: the "language" is really the tab label.
  if (node.lang && !KNOWN_LANGS.has(node.lang.toLowerCase())) {
    const title = node.lang;
    node.lang = "text";
    node.meta = `title="${title.replace(/"/g, "&quot;")}"`;
    notes.push({
      rule: "fence-title",
      level: "flag",
      line: lineOf(node),
      detail: `"${title}" read as a title, not a language — confirm it is not a language we do not list`,
    });
  }
}

// ---------------------------------------------------------------------------
// 1.3 CodeTabs -> CodeGroup
// ---------------------------------------------------------------------------

/** The tab label ReadMe would have shown: the fence title, else LANG, else Text. */
function fenceLabel(node: Code): string {
  const title = /title="([^"]*)"/.exec(node.meta ?? "")?.[1];
  if (title) return title;
  if (node.lang) return node.lang.toUpperCase();
  return "Text";
}

/**
 * There is no `<CodeTabs>` tag to match. ReadMe builds the switcher from
 * **consecutive fences with no blank line between them**, and a blank line is its
 * documented opt-out — so the run is detected on adjacency, never on the fences
 * looking similar.
 *
 * A run of one stays a plain fence: `tabs` on a single-child `CodeGroup` is
 * chrome around nothing, and a lone mermaid fence must stay a bare diagram.
 */
export function groupFenceRuns(parent: Parent, notes: ConversionNote[]): void {
  const children = parent.children as RootContent[];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child && "children" in child && Array.isArray((child as Parent).children)) {
      groupFenceRuns(child as Parent, notes);
    }
    if (!child || child.type !== "code") continue;

    // Extend the run while each fence starts on the line after the previous one ends.
    let end = i;
    while (end + 1 < children.length) {
      const current = children[end];
      const next = children[end + 1];
      if (!next || next.type !== "code") break;
      const currentEnd = current?.position?.end.line;
      const nextStart = next.position?.start.line;
      if (currentEnd === undefined || nextStart === undefined || nextStart !== currentEnd + 1) break;
      end += 1;
    }

    if (end === i) continue;

    const run = children.slice(i, end + 1) as Code[];
    const labels = run.map(fenceLabel);

    for (const label of labels) {
      if (label.includes(",")) {
        notes.push({
          rule: "code-group",
          level: "blocker",
          line: lineOf(run[0] ?? child),
          detail: `tab label "${label}" contains a comma, which is the separator in tabs="…" — rename the label`,
        });
      }
    }

    const group: MdxJsxFlowElement = {
      type: "mdxJsxFlowElement",
      name: "CodeGroup",
      attributes: [attr("tabs", labels.join(","))],
      children: run,
    };

    children.splice(i, run.length, group);
    notes.push({
      rule: "code-group",
      level: "change",
      line: lineOf(group.children[0] ?? child),
      detail: `${run.length} adjacent fences -> <CodeGroup tabs="${labels.join(",")}">`,
    });
  }
}

// ---------------------------------------------------------------------------
// 1.4 Tabs / Tab
// ---------------------------------------------------------------------------

/** `<Tab title icon iconColor>` -> `<Tab title icon>`; the tags are identical. */
export function convertTab(node: MdxJsxFlowElement, notes: ConversionNote[]): void {
  const icon = readAttr(node, "icon");
  const title = readAttr(node, "title");
  const mapped = lucideIcon(icon);

  const attributes: MdxJsxAttribute[] = [];
  if (title !== undefined) attributes.push(attr("title", title));
  if (mapped) attributes.push(attr("icon", mapped));
  node.attributes = attributes;

  if (title === undefined) {
    notes.push({
      rule: "tab",
      level: "blocker",
      line: lineOf(node),
      detail: "<Tab> has no title, which is required on both platforms",
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
}

// ---------------------------------------------------------------------------
// 1.7 Anchor / links
// ---------------------------------------------------------------------------

/**
 * Rewrites one href. Handles ReadMe's four link protocols and absolute URLs that
 * point back at the source site.
 *
 * Hash fragments are preserved on both paths — `doc:my-page#section` keeps its
 * `#section`, or 17 in-page anchors break.
 */
export function rewriteHref(
  href: string,
  options: ConvertOptions = {},
): { href: string; internal: boolean; changed: boolean } {
  const protocol = /^(doc|ref|changelog|blog|page):(.+)$/.exec(href);
  if (protocol) {
    const kind = protocol[1] as LinkProtocol;
    const rest = protocol[2] ?? "";
    const hash = rest.indexOf("#");
    const slug = hash === -1 ? rest : rest.slice(0, hash);
    const fragment = hash === -1 ? "" : rest.slice(hash);
    const resolved = options.resolvePath?.(kind, slug) ?? `${PROTOCOL_PREFIX[kind]}${slug}`;
    return { href: `${resolved}${fragment}`, internal: true, changed: true };
  }

  if (options.site && href.startsWith(options.site)) {
    const tail = href.slice(options.site.length) || "/";
    return { href: tail.startsWith("/") ? tail : `/${tail}`, internal: true, changed: true };
  }

  return { href, internal: /^[#/]/.test(href), changed: false };
}

/**
 * `<Anchor>` exists on ReadMe only to carry `target`/`title`/`download`, so it
 * unwraps to a markdown link.
 *
 * `label` is dropped: the React component never reads it, and it duplicates the
 * link text in 318 of 318 corpus uses. `target="_blank"` is dropped for internal
 * links — every corpus anchor sets it, including links to their own docs, so
 * carrying it across makes every internal link open a new tab.
 */
function anchorToLink(
  node: MdxJsxFlowElement | MdxJsxTextElement,
  options: ConvertOptions,
  notes: ConversionNote[],
): Link {
  const raw = readAttr(node, "href") ?? "";
  const { href, internal, changed } = rewriteHref(raw, options);
  const title = readAttr(node, "title");
  const target = readAttr(node, "target");

  if (readAttr(node, "download") !== undefined) {
    notes.push({
      rule: "link",
      level: "flag",
      line: lineOf(node),
      detail: "<Anchor download> has no documented Documentation.AI equivalent — dropped",
    });
  }
  if (target && !internal) {
    notes.push({
      rule: "link",
      level: "flag",
      line: lineOf(node),
      detail: `external link kept target="${target}", which markdown cannot express — dropped`,
    });
  }
  notes.push({
    rule: "link",
    level: "change",
    line: lineOf(node),
    detail: changed ? `<Anchor href="${raw}"> -> [text](${href})` : `<Anchor> -> [text](${href})`,
  });

  return {
    type: "link",
    url: href,
    title: title ?? null,
    children: node.children as PhrasingContent[],
  };
}

// ---------------------------------------------------------------------------
// 1.8 Lists — reported, never restructured
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// 1.9 Headings
// ---------------------------------------------------------------------------

/** Loose comparison, so "Create a Reward" matches "Create a reward". */
function sameTitle(a: string, b: string): boolean {
  const normalise = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");
  return normalise(a) === normalise(b);
}

/**
 * H2–H6 carry across untouched. H1 does not: Documentation.AI generates it from
 * frontmatter `title`.
 *
 * A leading `# Title` that duplicates the frontmatter is dropped — otherwise the
 * page prints its title twice. Every other H1 is reported, and only moved when
 * the caller passes `headingPolicy: "demote"`, in which case *all* headings shift
 * together so the hierarchy is preserved rather than flattened.
 */
export function convertHeadings(tree: Root, options: ConvertOptions, notes: ConversionNote[]): void {
  if (options.title) {
    const index = tree.children.findIndex((node) => node.type !== "yaml" && node.type !== "html");
    const candidate = tree.children[index];
    if (candidate?.type === "heading" && candidate.depth === 1 && sameTitle(mdastToString(candidate), options.title)) {
      tree.children.splice(index, 1);
      notes.push({
        rule: "heading",
        level: "change",
        line: lineOf(candidate),
        detail: "dropped the body H1 that duplicated the frontmatter title",
      });
    }
  }

  const h1s: number[] = [];
  visit(tree, "heading", (node) => {
    if (node.depth === 1) h1s.push(lineOf(node) ?? 0);
  });
  if (h1s.length === 0) return;

  if (options.headingPolicy !== "demote") {
    notes.push({
      rule: "heading",
      level: "flag",
      line: h1s[0],
      detail: `${h1s.length} body H1${h1s.length === 1 ? "" : "s"} kept as-is (lines ${h1s.join(", ")}) — the page-wide heading policy is the user's decision`,
    });
    return;
  }

  visit(tree, "heading", (node) => {
    node.depth = Math.min(6, node.depth + 1) as 1 | 2 | 3 | 4 | 5 | 6;
  });
  notes.push({
    rule: "heading",
    level: "change",
    line: h1s[0],
    detail: `demoted every heading by one level so ${h1s.length} body H1${h1s.length === 1 ? "" : "s"} start at H2`,
  });
}

// ---------------------------------------------------------------------------
// 1.5 Tables — verified, not rewritten
// ---------------------------------------------------------------------------

/**
 * GFM pipe tables and their alignment rows carry across byte-for-byte, so there
 * is nothing to convert. The risk is content, not syntax, which is why this only
 * reports: an empty header row is a decision the user has to make, because GFM
 * always styles row 1 as the header and the header-less HTML alternative is not
 * available here.
 */
export function checkTables(tree: Root, notes: ConversionNote[]): void {
  visit(tree, "table", (node) => {
    const [header] = node.children;
    if (!header) return;
    if (mdastToString(header).trim().length === 0) {
      notes.push({
        rule: "table",
        level: "blocker",
        line: lineOf(node),
        detail: "empty header row — promote row 1 to the header, or escalate (raw <table> is not an option)",
      });
    }
  });
}

// ---------------------------------------------------------------------------
// The driver
// ---------------------------------------------------------------------------

/**
 * Runs every Section 1 conversion over one page, in the only order that works:
 *
 * 1. **Headings** — before anything else reads the document shape.
 * 2. **Callouts** — both spellings, so later passes see one canonical form.
 * 3. **Fence titles** — before grouping, because the tab labels come from them.
 * 4. **Fence runs -> CodeGroup** — needs converted siblings, so it cannot be
 *    node-local.
 * 5. **Tabs** — node-local.
 * 6. **Links** — last, because it needs the site-wide slug map.
 * 7. **Reports** — tables, which change nothing.
 *
 * Returns the mutated tree and the note log. Running it twice on the same tree
 * produces the same tree.
 */
export function convertOneToOne(tree: Root, options: ConvertOptions = {}): ConvertResult {
  const notes: ConversionNote[] = [];

  convertHeadings(tree, options, notes);

  // Blockquote callouts first: they *become* JSX Callouts, and converting them
  // before the JSX pass would mean walking them twice.
  visit(tree, (node, index, parent) => {
    if (!parent || index === undefined) return;
    const callout = calloutFromBlockquote(node as RootContent, notes);
    if (callout) (parent.children as RootContent[])[index] = callout;
  });

  visit(tree, "mdxJsxFlowElement", (node) => {
    if (isJsx(node as RootContent, "Callout")) convertCalloutElement(node, notes);
    else if (isJsx(node as RootContent, "Tab")) convertTab(node, notes);
  });

  visit(tree, "code", (node) => convertFenceTitle(node, notes));
  groupFenceRuns(tree, notes);

  // Links last. Flow-level anchors become a paragraph holding the link; inline
  // ones are replaced in place.
  visit(tree, (node, index, parent) => {
    if (!parent || index === undefined) return;
    const current = node as RootContent;

    if (current.type === "mdxJsxTextElement" && current.name === "Anchor") {
      (parent.children as RootContent[])[index] = anchorToLink(current, options, notes) as RootContent;
      return;
    }
    if (current.type === "mdxJsxFlowElement" && current.name === "Anchor") {
      const link = anchorToLink(current, options, notes);
      (parent.children as RootContent[])[index] = { type: "paragraph", children: [link] };
      return;
    }
    /*
     * An `href` on a component goes through the same policy as a markdown link.
     * `<Card href="doc:quickstart">` is the case that matters: that href does not
     * exist in the source at all — `<Columns>`/`<Cards>` produce it — so nothing
     * else in the pipeline would ever rewrite it, and the card would ship pointing
     * at a ReadMe protocol the target cannot resolve.
     */
    if (current.type === "mdxJsxFlowElement" || current.type === "mdxJsxTextElement") {
      for (const attribute of current.attributes ?? []) {
        if (attribute.type !== "mdxJsxAttribute" || attribute.name !== "href") continue;
        if (typeof attribute.value !== "string") continue;

        const { href, changed } = rewriteHref(attribute.value, options);
        if (!changed) continue;

        notes.push({
          rule: "link",
          level: "change",
          line: lineOf(current),
          detail: `<${current.name}> href ${attribute.value} -> ${href}`,
        });
        attribute.value = href;
      }
      return;
    }

    if (current.type === "link") {
      const { href, changed } = rewriteHref(current.url, options);
      if (!changed) return;
      notes.push({
        rule: "link",
        level: "change",
        line: lineOf(current),
        detail: `${current.url} -> ${href}`,
      });
      current.url = href;
    }
  });

  checkTables(tree, notes);

  return { tree, notes };
}

/**
 * MDAST -> Documentation.AI MDX.
 *
 * Two options carry conversion rules rather than taste:
 *
 * - `bullet: "-"` — mixing `-`, `*` and `+` inside one list renders
 *   inconsistently on the target, so every bullet is normalised here rather than
 *   in a transform.
 * - `resourceLink: true` — forces `[text](url)` and never the autolink form
 *   `<https://…>`. **An autolink does not compile as MDX**: `<` starts JSX, and
 *   the parser fails with *"to create a link in MDX, use [text](url)"*. Without
 *   this, any link whose text equals its URL silently produces a page that will
 *   not build.
 */
export function toMdx(tree: Root): string {
  return unified()
    .use(remarkGfm)
    .use(remarkMdx)
    .use(remarkStringify, {
      bullet: "-",
      fences: true,
      rule: "-",
      emphasis: "_",
      strong: "*",
      resourceLink: true,
    })
    .stringify(tree);
}
