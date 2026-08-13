import type { Target } from "./types";

/**
 * The one table that says what every ReadMe construct becomes on
 * Documentation.AI. The converter reads it; the inventory report prints it; a
 * component that is missing from it shows up as `status: "manual"` instead of
 * being silently dropped.
 *
 * Sources: `Components-Information/readme-components-info.md` (what ReadMe
 * emits, verified against the engine source and the Capillary corpus) and the
 * Documentation.AI component reference in CLAUDE.md (what we can emit).
 */

/**
 * ReadMe callout theme -> Documentation.AI callout kind.
 *
 * ReadMe resolves `theme` first and falls back to an emoji lookup, so both are
 * mapped. `warn` is a caution, not a catastrophe, so it lands on `alert`;
 * `error` is the destructive one and lands on `danger`.
 */
export const CALLOUT_THEME_TO_KIND: Record<string, string> = {
  info: "info",
  warn: "alert",
  warning: "alert",
  ok: "success",
  okay: "success",
  success: "success",
  err: "danger",
  error: "danger",
  default: "info",
};

/** The emoji ReadMe accepts in `> 📘 Title` form, and in `icon=`. */
export const CALLOUT_EMOJI_TO_KIND: Record<string, string> = {
  "📘": "info",
  "ℹ️": "info",
  "ℹ": "info",
  "🚧": "alert",
  "⚠️": "alert",
  "⚠": "alert",
  "👍": "success",
  "✅": "success",
  "❗️": "danger",
  "❗": "danger",
  "🛑": "danger",
  "⁉️": "danger",
  "‼️": "danger",
};

export function calloutKind(theme?: string, icon?: string): string {
  const byTheme = theme ? CALLOUT_THEME_TO_KIND[theme.trim().toLowerCase()] : undefined;
  if (byTheme) return byTheme;
  if (icon) {
    const byIcon = CALLOUT_EMOJI_TO_KIND[icon.trim()];
    if (byIcon) return byIcon;
  }
  return "info";
}

/**
 * Component-level mapping. `attrs` here is the *shape* of the target, not the
 * translated values — the block builder fills those in, because they depend on
 * what the source node actually carried.
 */
export const COMPONENT_TARGETS: Record<string, Target> = {
  Callout: {
    component: "Callout",
    status: "direct",
    note: "theme/icon -> kind; drop the emoji, Documentation.AI draws its own",
  },
  Image: {
    component: "Image",
    status: "transform",
    note: "keep src/alt (+ width/height when real); drop align, border, className, and width=\"smart\"",
  },
  Table: {
    component: null,
    status: "transform",
    note: "rebuild as a markdown table; only cells with block content need HTML",
  },
  Anchor: {
    component: null,
    status: "transform",
    note: "becomes a markdown link; rewrite the source host to /docs/… or /reference/…",
  },
  Glossary: {
    component: null,
    status: "manual",
    note: "no glossary on Documentation.AI — inline the definition or keep the bare term",
  },
  Embed: {
    component: "Video",
    status: "transform",
    note: "YouTube/Vimeo/Loom -> <Video src>; anything else -> <Iframe src width height>",
  },
  HTMLBlock: {
    component: null,
    status: "manual",
    note: "raw HTML+CSS+JS has no equivalent — rebuild with Cards/Columns/Steps, or drop",
  },
  Code: { component: null, status: "direct", note: "fenced block; the fence title becomes a CodeGroup tab" },
  CodeTabs: {
    component: "CodeGroup",
    status: "transform",
    note: 'tab name goes on BOTH the fence and tabs={["a","b"]}',
  },
  Tabs: { component: "Tabs", status: "direct" },
  Tab: { component: "Tab", status: "direct", note: "title carries over; icon becomes a Lucide name" },
  Accordion: {
    component: "Expandable",
    status: "transform",
    note: "wrap sibling runs in <ExpandableGroup>; default-open=\"false\"",
  },
  Cards: { component: "Columns", status: "transform", note: "columns={n} -> cols=\"n\"" },
  Card: {
    component: "Card",
    status: "direct",
    note: "title + href are required on Documentation.AI; Font Awesome icon -> Lucide name",
  },
  Columns: { component: "Columns", status: "transform", note: "child count -> cols; non-Card children need a <div>" },
  Column: { component: null, status: "transform", note: "becomes a <div> inside <Columns>, or a bare Card" },
  Recipe: { component: null, status: "manual", note: "ReadMe-only interactive walkthrough — rebuild as <Steps>" },
  TutorialTile: { component: null, status: "manual", note: "deprecated alias of Recipe" },
  PostmanRunButton: { component: null, status: "manual", note: "no equivalent; link to the collection instead" },
  MCPIntro: { component: null, status: "drop", note: "ReadMe-generated MCP page intro" },
  Variable: { component: null, status: "manual", note: "personalised <<name>> — substitute a literal or drop" },
};

/** Markdown-syntax constructs that are not JSX but still need a decision. */
export const SYNTAX_TARGETS: Record<string, Target> = {
  mermaid: { component: null, status: "direct", note: "```mermaid renders natively on both platforms" },
  table: { component: null, status: "direct", note: "GFM table; watch for an empty `| |` header row" },
  heading: { component: null, status: "direct" },
  list: { component: null, status: "transform", note: "normalise `*`/`+` markers to `-`" },
  paragraph: { component: null, status: "direct" },
  blockquote: { component: null, status: "direct" },
  code: { component: null, status: "direct" },
  thematicBreak: { component: null, status: "direct" },
  definition: { component: null, status: "direct" },
  boilerplate: { component: null, status: "drop", note: "ReadMe's injected llms.txt preamble" },
  frontmatter: { component: null, status: "transform", note: "replace with Documentation.AI title/description" },
  details: { component: "Expandable", status: "transform", note: "<details>/<summary> -> <Expandable title>" },
  br: { component: null, status: "drop", note: "<br /> is not needed — blocks are spaced by the parser" },
  html: { component: null, status: "manual", note: "raw HTML — check it against the Documentation.AI components" },
  unknown: { component: null, status: "manual" },
};

/** Legacy `[block:…]` magic blocks. All of them predate MDX. */
export const MAGIC_BLOCK_TARGETS: Record<string, Target> = {
  callout: { component: "Callout", status: "transform" },
  code: { component: "CodeGroup", status: "transform" },
  image: { component: "Image", status: "transform" },
  parameters: { component: null, status: "transform", note: "-> markdown table" },
  table: { component: null, status: "transform", note: "-> markdown table" },
  embed: { component: "Video", status: "transform" },
  html: { component: null, status: "manual" },
  "api-header": { component: null, status: "transform", note: "-> a markdown heading" },
  recipe: { component: null, status: "manual" },
  "tutorial-tile": { component: null, status: "manual" },
};

export function targetForComponent(name: string): Target {
  return (
    COMPONENT_TARGETS[name] ?? {
      component: null,
      status: "manual",
      note: `unrecognised component — not in the ReadMe reference or the Documentation.AI set`,
    }
  );
}

export function targetForSyntax(name: string): Target {
  return SYNTAX_TARGETS[name] ?? SYNTAX_TARGETS.unknown!;
}

export function targetForMagicBlock(name: string): Target {
  return MAGIC_BLOCK_TARGETS[name] ?? { component: null, status: "manual", note: `unknown magic block` };
}
