import type { Code, Parent, PhrasingContent, RootContent, Table } from "mdast";
import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { toString as mdastToString } from "mdast-util-to-string";

import {
  calloutKind,
  targetForComponent,
  targetForMagicBlock,
  targetForSyntax,
} from "./mapping";
import { CALLOUT_EMOJI_TO_KIND } from "./mapping";
import { parseMarkdown } from "./parse";
import type { Block, CodeIR, InlineHit, TableIR, Target } from "./types";

/**
 * MDAST -> the block IR.
 *
 * Everything here answers one question per node: *what component is this, and
 * what does it become?* The tree walk stays shallow on purpose — a page reads as
 * an ordered list of blocks, and only container components (a `Tabs`, a
 * `Callout` with a table in it) recurse.
 */

/** ReadMe injects this above every page it serves as `.md`. It is not content. */
const BOILERPLATE = /Fetch the complete documentation index at:\s*https?:\S+llms\.txt/i;

/**
 * Container components worth descending into rather than treating as opaque.
 *
 * `Table` is deliberately absent: its children are `thead`/`tbody`/`tr`/`td`,
 * which are structure rather than content. It gets a `table` IR instead, the
 * same shape a GFM pipe table gets, so both spellings read identically.
 */
const CONTAINERS = new Set([
  "Callout",
  "Tabs",
  "Tab",
  "Cards",
  "Card",
  "Columns",
  "Column",
  "Accordion",
  "Steps",
  "Step",
]);

/** Splits ReadMe's YAML frontmatter off the top, so the parser never sees it. */
export function splitFrontmatter(text: string): {
  frontmatter: Record<string, string>;
  body: string;
  /** Lines removed from the top — added back to every reported line number. */
  offset: number;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { frontmatter: {}, body: text, offset: 0 };

  const frontmatter: Record<string, string> = {};
  for (const line of (match[1] ?? "").split("\n")) {
    const pair = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line.trim());
    if (pair?.[1]) frontmatter[pair[1]] = (pair[2] ?? "").trim();
  }

  return {
    frontmatter,
    body: text.slice(match[0].length),
    offset: match[0].split("\n").length - 1,
  };
}

type Ctx = {
  /** Every line of the *original* file, so `raw` slices include the frontmatter. */
  lines: string[];
  offset: number;
  counter: { i: number };
};

/** Reads a JSX attribute list into plain strings. `{true}` keeps its braces. */
function readAttrs(node: MdxJsxFlowElement): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const attribute of node.attributes ?? []) {
    if (attribute.type !== "mdxJsxAttribute") {
      // `{...spread}` — rare, but record that it was there rather than drop it.
      attrs["...spread"] = "";
      continue;
    }
    const { name, value } = attribute as MdxJsxAttribute;
    if (value === null || value === undefined) {
      attrs[name] = "true";
    } else if (typeof value === "string") {
      attrs[name] = value;
    } else {
      attrs[name] = `{${value.value}}`;
    }
  }
  return attrs;
}

/** Attribute reader for the fallback path, where a tag is just a string. */
function readAttrsFromHtml(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const open = /^<[A-Za-z][\w.-]*([\s\S]*?)\/?>/.exec(raw.trim());
  if (!open?.[1]) return attrs;

  const pattern = /([A-Za-z_:][\w.:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(open[1]))) {
    const [, name = "", double, single, expression] = match;
    attrs[name] = double ?? single ?? `{${expression ?? ""}}`;
  }
  return attrs;
}

function lineRange(node: RootContent, ctx: Ctx): [number, number] {
  const start = (node.position?.start.line ?? 1) + ctx.offset;
  const end = (node.position?.end.line ?? start - ctx.offset) + ctx.offset;
  return [start, end];
}

function rawSlice(range: [number, number], ctx: Ctx): string {
  return ctx.lines.slice(range[0] - 1, range[1]).join("\n");
}

/** The regexes behind `inline` — ReadMe syntax that hides inside a block's text. */
const INLINE_PATTERNS: { kind: InlineHit["kind"]; pattern: RegExp }[] = [
  { kind: "glossary", pattern: /<<glossary:([^>]+)>>/g },
  { kind: "variable", pattern: /<<(?!glossary:)([A-Za-z0-9_.-]+)>>/g },
  { kind: "docLink", pattern: /\]\((doc:[^)\s]+)/g },
  { kind: "refLink", pattern: /\]\((ref:[^)\s]+)/g },
  { kind: "changelogLink", pattern: /\]\(((?:changelog|blog):[^)\s]+)/g },
  { kind: "pageLink", pattern: /\]\((page:[^)\s]+)/g },
  { kind: "embedLink", pattern: /\]\(([^)\s]+)\s+"@embed"\)/g },
  { kind: "markdownImage", pattern: /!\[[^\]]*\]\(([^)\s]+)/g },
  { kind: "anchorJsx", pattern: /<Anchor\b[^>]*href="([^"]*)"/g },
  { kind: "breakTag", pattern: /(\\?<br\s*\/?>)/g },
  { kind: "handlebars", pattern: /(\\?\{\\?\{[^}]+\}\}?)/g },
  { kind: "escapedAngle", pattern: /(\\<[A-Za-z][\w ._-]*>)/g },
];

/** Absolute links back into the source site — these become relative on migration. */
function internalLinkPattern(host: string): RegExp {
  return new RegExp(`https?://${host.replace(/\./g, "\\.")}/(?:docs|reference|page)/[^)\\s"']+`, "g");
}

function findInline(raw: string, startLine: number, host?: string): InlineHit[] {
  const hits: InlineHit[] = [];
  const patterns = host
    ? [...INLINE_PATTERNS, { kind: "absoluteInternalLink" as const, pattern: internalLinkPattern(host) }]
    : INLINE_PATTERNS;

  for (const { kind, pattern } of patterns) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(raw))) {
      const before = raw.slice(0, match.index);
      hits.push({
        kind,
        value: match[1] ?? match[0],
        line: startLine + (before.match(/\n/g)?.length ?? 0),
      });
    }
  }
  return hits;
}

/** The gotchas from the ReadMe reference, surfaced per block instead of per site. */
function findNotes(raw: string, component?: string): string[] {
  const notes: string[] = [];
  if (component === "Image") {
    if (/width="smart"/.test(raw)) notes.push('width="smart" is a legacy RDMD value — drop it');
    if (/width="[^"]*\s"/.test(raw)) notes.push("width has a trailing space — trim it");
    if (/className="border"/.test(raw)) notes.push('className="border" is redundant with border={true}');
    if (!/\balt=/.test(raw)) notes.push("no alt text — Documentation.AI pages need one");
  }
  if (/\\<br\s*>/.test(raw)) notes.push("escaped \\<br> renders as literal text");
  if (/<br(?!\s*\/)\s*>/.test(raw)) notes.push("unclosed <br> is invalid MDX");
  if (/theme="warning"/.test(raw)) notes.push('theme="warning" — the canonical spelling is "warn"');
  if (/```curl/.test(raw)) notes.push("`curl` is not a highlighter language — use bash");
  if (/style="[^"]*"/.test(raw) && !/<HTMLBlock/.test(raw)) {
    notes.push('string style="…" outside HTMLBlock is invalid MDX');
  }
  return notes;
}

function makeBlock(
  ctx: Ctx,
  node: RootContent,
  partial: Omit<Block, "i" | "lines" | "raw" | "target"> & { target?: Target },
  host?: string
): Block {
  const lines = lineRange(node, ctx);
  const raw = rawSlice(lines, ctx);
  const notes = [...(partial.notes ?? []), ...findNotes(raw, partial.component)];

  return {
    i: ctx.counter.i++,
    lines,
    raw,
    ...partial,
    target: partial.target ?? targetForSyntax(partial.kind),
    inline: partial.inline ?? findInline(raw, lines[0], host),
    ...(notes.length ? { notes } : {}),
  };
}

function tableIR(node: Table): TableIR {
  const rows = node.children.map((row) =>
    row.children.map((cell) => mdastToString(cell as unknown as Parent).trim())
  );
  const [header = [], ...body] = rows;
  return {
    header,
    rows: body,
    align: (node.align ?? []).map((value) => value ?? null),
    emptyHeader: header.length > 0 && header.every((cell) => cell === ""),
  };
}

function codeIR(node: Code): CodeIR {
  return { lang: node.lang ?? null, title: node.meta?.trim() || null, code: node.value };
}

/**
 * The JSX `<Table>` spelling, flattened into the same IR a pipe table produces.
 *
 * ReadMe emits JSX instead of GFM whenever a cell holds block content — a list,
 * a code block, another table — so these are exactly the tables that will need
 * care on the way out. Reading them in the same shape is what makes that
 * comparable.
 */
function jsxTableIR(node: MdxJsxFlowElement): TableIR {
  const rows: string[][] = [];

  const collectRow = (child: RootContent) => {
    const element = child as MdxJsxFlowElement;
    if (element.type !== "mdxJsxFlowElement") return;
    if (element.name === "tr") {
      rows.push(
        element.children
          .filter((cell) => {
            const name = (cell as MdxJsxFlowElement).name;
            return name === "td" || name === "th";
          })
          .map((cell) => mdastToString(cell as unknown as Parent).trim())
      );
      return;
    }
    // thead / tbody / tfoot — one level deeper.
    if (element.name === "thead" || element.name === "tbody" || element.name === "tfoot") {
      for (const grandchild of element.children) collectRow(grandchild as RootContent);
    }
  };

  for (const child of node.children) collectRow(child as RootContent);

  const [header = [], ...body] = rows;
  const align = readAttrs(node).align ?? "";
  return {
    header,
    rows: body,
    // `align={["left","left"]}` — kept as written; the converter reads it back.
    align: align ? align.replace(/[{}[\]"']/g, "").split(",").map((value) => value.trim() || null) : [],
    emptyHeader: header.length > 0 && header.every((cell) => cell === ""),
  };
}

/** `[block:callout]{…}[/block]` — recognised so legacy pages are not misfiled. */
function magicBlockName(raw: string): string | undefined {
  return /^\s*\[block:([a-z-]+)\]/.exec(raw)?.[1];
}

/** Recovers a tag name from a raw HTML/JSX string in the fallback parse path. */
function htmlTagName(raw: string): string | undefined {
  return /^\s*<\/?([A-Za-z][\w.-]*)/.exec(raw)?.[1];
}

function isComponentName(name: string): boolean {
  return /^[A-Z]/.test(name);
}

/**
 * One MDAST node -> one block. Returns `undefined` only for nodes that carry no
 * source position (nothing in a parsed file does).
 */
function toBlock(node: RootContent, ctx: Ctx, host?: string): Block {
  switch (node.type) {
    case "heading":
      return makeBlock(ctx, node, {
        kind: "heading",
        syntax: "markdown",
        depth: node.depth,
        text: mdastToString(node),
      }, host);

    case "code": {
      const code = codeIR(node);
      return makeBlock(ctx, node, {
        kind: "code",
        syntax: "markdown",
        component: code.lang === "mermaid" ? "Mermaid" : undefined,
        code,
        text: code.title ?? undefined,
        target: targetForSyntax(code.lang === "mermaid" ? "mermaid" : "code"),
      }, host);
    }

    case "table":
      return makeBlock(ctx, node, {
        kind: "table",
        syntax: "markdown",
        component: "Table",
        table: tableIR(node),
      }, host);

    case "blockquote": {
      // `> 📘 Title` is ReadMe's markdown shorthand for a Callout. The emoji is
      // the entire signal — it is the first text in the first child.
      const text = mdastToString(node).trim();
      const emoji = Object.keys(CALLOUT_EMOJI_TO_KIND).find((key) => text.startsWith(key));
      if (!emoji) {
        return makeBlock(ctx, node, { kind: "blockquote", syntax: "markdown", text }, host);
      }
      const kind = CALLOUT_EMOJI_TO_KIND[emoji]!;
      return makeBlock(ctx, node, {
        kind: "callout",
        syntax: "markdown",
        component: "Callout",
        attrs: { icon: emoji },
        text: text.slice(emoji.length).trim(),
        target: { ...targetForComponent("Callout"), attrs: { kind } },
      }, host);
    }

    case "mdxJsxFlowElement": {
      const element = node as MdxJsxFlowElement;
      const name = element.name ?? "";
      const attrs = readAttrs(element);

      if (!name || !isComponentName(name)) {
        // Lowercase tag: real HTML that MDX happens to accept.
        return makeBlock(ctx, node, {
          kind: name === "br" ? "html" : "html",
          syntax: "html",
          component: name || undefined,
          attrs,
          text: mdastToString(node).trim() || undefined,
          target: targetForSyntax(name === "details" ? "details" : name === "br" ? "br" : "html"),
        }, host);
      }

      if (name === "Table") {
        return makeBlock(ctx, node, {
          kind: "table",
          syntax: "jsx",
          component: "Table",
          attrs,
          table: jsxTableIR(element),
          target: targetForComponent("Table"),
        }, host);
      }

      const isCallout = name === "Callout";
      const target = isCallout
        ? {
            ...targetForComponent("Callout"),
            attrs: { kind: calloutKind(attrs.theme, attrs.icon) },
          }
        : targetForComponent(name);

      return makeBlock(ctx, node, {
        kind: isCallout ? "callout" : name === "Image" ? "image" : "component",
        syntax: "jsx",
        component: name,
        attrs,
        text: CONTAINERS.has(name) ? mdastToString(node).trim() || undefined : undefined,
        target,
        children: CONTAINERS.has(name)
          ? element.children.map((child) => toBlock(child as RootContent, ctx, host))
          : undefined,
      }, host);
    }

    case "html": {
      // The fallback parse path, plus any raw HTML in an MDX page.
      const raw = rawSlice(lineRange(node, ctx), ctx);
      const magic = magicBlockName(raw);
      if (magic) {
        return makeBlock(ctx, node, {
          kind: "magicBlock",
          syntax: "magic-block",
          component: magic,
          target: targetForMagicBlock(magic),
        }, host);
      }

      const tag = htmlTagName(raw);
      if (tag && isComponentName(tag)) {
        const attrs = readAttrsFromHtml(raw);
        const isCallout = tag === "Callout";
        return makeBlock(ctx, node, {
          kind: isCallout ? "callout" : tag === "Image" ? "image" : "component",
          syntax: "jsx",
          component: tag,
          attrs,
          target: isCallout
            ? { ...targetForComponent("Callout"), attrs: { kind: calloutKind(attrs.theme, attrs.icon) } }
            : targetForComponent(tag),
        }, host);
      }

      return makeBlock(ctx, node, {
        kind: "html",
        syntax: "html",
        component: tag,
        target: targetForSyntax(tag === "details" ? "details" : tag === "br" ? "br" : "html"),
      }, host);
    }

    case "paragraph": {
      const text = mdastToString(node).trim();
      if (BOILERPLATE.test(text)) {
        return makeBlock(ctx, node, {
          kind: "boilerplate",
          syntax: "markdown",
          text,
          target: targetForSyntax("boilerplate"),
        }, host);
      }

      // A paragraph holding nothing but an image is ReadMe's markdown shorthand
      // for an `Image` block, and is worth filing as one.
      const inlineChildren = (node.children as PhrasingContent[]).filter(
        (child) => !(child.type === "text" && child.value.trim() === "")
      );
      const only = inlineChildren.length === 1 ? inlineChildren[0] : undefined;
      if (only?.type === "image") {
        return makeBlock(ctx, node, {
          kind: "image",
          syntax: "markdown",
          component: "Image",
          attrs: { src: only.url, ...(only.alt ? { alt: only.alt } : {}), ...(only.title ? { title: only.title } : {}) },
          target: targetForComponent("Image"),
        }, host);
      }

      return makeBlock(ctx, node, { kind: "paragraph", syntax: "markdown", text }, host);
    }

    case "list":
      return makeBlock(ctx, node, {
        kind: "list",
        syntax: "markdown",
        text: mdastToString(node).trim(),
        attrs: { ordered: String(Boolean(node.ordered)) },
      }, host);

    case "thematicBreak":
      return makeBlock(ctx, node, { kind: "thematicBreak", syntax: "markdown" }, host);

    case "definition":
      return makeBlock(ctx, node, { kind: "definition", syntax: "markdown", text: node.url }, host);

    default:
      return makeBlock(ctx, node, {
        kind: "unknown",
        syntax: "markdown",
        component: node.type,
        text: "children" in node ? mdastToString(node as unknown as Parent).trim() : undefined,
      }, host);
  }
}

/**
 * Reassembles a JSX element that the fallback parser split across several
 * blocks.
 *
 * Markdown treats a run of raw HTML as ending at the first blank line, so a
 * `<Table>` with breathing room between its rows arrives as `<Table …>`,
 * `<thead>…`, `<tbody>…` — three blocks where the strict MDX parse produces one.
 * Left alone the census would report `thead` and `tbody` as components in their
 * own right, and only for the pages that happened to need tier 2.
 *
 * So an unclosed opening tag absorbs the blocks after it until its closing tag
 * turns up. Both parse modes then describe the same page the same way, which is
 * the only reason the IR is worth comparing across pages at all.
 */
function mergeUnclosedJsx(blocks: Block[], ctx: Ctx): Block[] {
  const merged: Block[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]!;
    const name = block.component;
    const isOpenTag =
      (block.syntax === "jsx" || block.syntax === "html") &&
      !!name &&
      new RegExp(`<${name}\\b[^>]*[^/]>`).test(block.raw) &&
      !new RegExp(`</${name}\\s*>`).test(block.raw);

    if (!isOpenTag) {
      merged.push(block);
      continue;
    }

    let end = i;
    while (end + 1 < blocks.length && !new RegExp(`</${name}\\s*>`).test(blocks[end]!.raw)) {
      end++;
    }
    if (end === i) {
      merged.push(block);
      continue;
    }

    const lines: [number, number] = [block.lines[0], blocks[end]!.lines[1]];
    merged.push({
      ...block,
      lines,
      raw: rawSlice(lines, ctx),
      notes: [
        ...(block.notes ?? []),
        // Deliberately not "reassembled from N chunks" — the count varies per
        // block and would split one issue across a dozen rows of the census.
        "reassembled from several raw-HTML chunks — this page needed the lenient parser",
      ],
    });
    i = end;
  }

  return merged;
}

/**
 * ReadMe turns *immediately consecutive* fences into one `CodeTabs` switcher —
 * a blank line between them is the documented way to opt out. The MDAST has no
 * such node, so the run is reconstructed here from the source line numbers,
 * because that distinction survives nowhere else and it decides whether the
 * output is one `<CodeGroup>` or several separate blocks.
 */
function groupCodeTabs(blocks: Block[], ctx: Ctx): Block[] {
  const grouped: Block[] = [];

  for (const block of blocks) {
    const previous = grouped.at(-1);
    const adjacent =
      block.kind === "code" &&
      previous &&
      (previous.kind === "code" || previous.kind === "codeTabs") &&
      block.lines[0] === previous.lines[1] + 1;

    if (!adjacent || !previous) {
      grouped.push(block);
      continue;
    }

    const tabs = previous.kind === "codeTabs" ? [...(previous.tabs ?? [])] : [previous.code!];
    tabs.push(block.code!);

    const lines: [number, number] = [previous.lines[0], block.lines[1]];
    grouped[grouped.length - 1] = {
      ...previous,
      kind: "codeTabs",
      component: "CodeTabs",
      syntax: "markdown",
      code: undefined,
      tabs,
      lines,
      raw: rawSlice(lines, ctx),
      target: targetForComponent("CodeTabs"),
    };
  }

  // The indices were assigned before grouping; renumber so `i` stays dense.
  return grouped.map((block, index) => ({ ...block, i: index }));
}

export type BuildResult = {
  frontmatter: Record<string, string>;
  blocks: Block[];
  components: Record<string, number>;
  parseMode: "mdx" | "markdown";
  parseError?: string;
};

/**
 * Raw `.md` text -> the block IR.
 *
 * The frontmatter is split off before parsing rather than after: left in, `---`
 * plus a `key: value` line reads as a thematic break followed by a setext
 * heading, and ReadMe's `updatedAt` stamp arrives as page content. Splitting
 * first means the parser only ever sees the body, and `offset` puts the line
 * numbers back where they belong in the original file.
 */
export function buildBlocks(text: string, host?: string): BuildResult {
  const { frontmatter, body, offset } = splitFrontmatter(text);
  const { tree, mode, error } = parseMarkdown(body);
  const ctx: Ctx = { lines: text.split("\n"), offset, counter: { i: 0 } };

  const blocks = groupCodeTabs(
    mergeUnclosedJsx(
      tree.children.map((node) => toBlock(node, ctx, host)),
      ctx
    ),
    ctx
  );

  return {
    frontmatter,
    blocks,
    components: countComponents(blocks),
    parseMode: mode,
    ...(error ? { parseError: error } : {}),
  };
}

export function countComponents(blocks: Block[]): Record<string, number> {
  const counts: Record<string, number> = {};
  const walk = (list: Block[]) => {
    for (const block of list) {
      const name = block.component ?? block.kind;
      counts[name] = (counts[name] ?? 0) + 1;
      if (block.children) walk(block.children);
    }
  };
  walk(blocks);
  return counts;
}
