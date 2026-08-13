/**
 * The types for the harvest stage — the step that sits between "fetch a page"
 * and "convert it to Documentation.AI MDX".
 *
 * The existing pipeline goes HTML -> HAST -> MDAST -> MDX in one `unified()`
 * chain, which means the only place a component is ever visible is inside a
 * transformer, mid-run. Harvesting stops in the middle on purpose: it fetches
 * the *authored* markdown ReadMe serves at `<page-url>.md` and freezes it as an
 * ordered list of typed blocks, one JSON file per page. Every block says what
 * ReadMe component it is, what attributes it carries, which source lines it came
 * from, and what it should become on Documentation.AI.
 */

/** How a component was written in the source. */
export type Syntax =
  /** `<Callout theme="info">` — a real JSX tag. */
  | "jsx"
  /** `> 📘 Title` / `![alt](url)` / a pipe table — markdown that compiles to a component. */
  | "markdown"
  /** `[block:callout]{…}[/block]` — the legacy RDMD form. */
  | "magic-block"
  /** Raw HTML that is not a ReadMe component (`<details>`, a hand-written `<table>`). */
  | "html";

export type BlockKind =
  | "frontmatter"
  /** ReadMe's injected "Fetch the complete documentation index…" preamble. */
  | "boilerplate"
  | "heading"
  | "paragraph"
  | "list"
  | "table"
  | "code"
  /** Consecutive fences with no blank line — ReadMe renders these as one switcher. */
  | "codeTabs"
  | "blockquote"
  | "callout"
  | "image"
  | "component"
  | "magicBlock"
  | "html"
  | "thematicBreak"
  | "definition"
  | "unknown";

/** Where a block lands on Documentation.AI. */
export type Target = {
  /** The Documentation.AI component, or null when the block stays plain markdown. */
  component: string | null;
  /** Attributes to emit, already translated (`theme="warn"` -> `kind="alert"`). */
  attrs?: Record<string, string>;
  status:
    /** One-to-one: rename the tag, copy the body. */
    | "direct"
    /** Needs restructuring (a table rebuild, a fence run collapsed into a CodeGroup). */
    | "transform"
    /** No equivalent exists — a human decides. */
    | "manual"
    /** Intentionally not carried over. */
    | "drop";
  note?: string;
};

/** Something found *inside* a block's text rather than as a block of its own. */
export type InlineHit = {
  kind:
    | "glossary"
    | "variable"
    | "docLink"
    | "refLink"
    | "changelogLink"
    | "pageLink"
    | "embedLink"
    | "absoluteInternalLink"
    | "markdownImage"
    | "anchorJsx"
    | "breakTag"
    | "handlebars"
    | "escapedAngle";
  value: string;
  line: number;
};

export type TableIR = {
  header: string[];
  rows: string[][];
  align: (string | null)[];
  /** True when the header row is blank — the key-value shape from gotcha 4. */
  emptyHeader: boolean;
};

export type CodeIR = {
  lang: string | null;
  /** The free-text title after the language on the fence line. */
  title: string | null;
  code: string;
};

export type Block = {
  /** Position in the page, so a block can be referenced as `slug#12`. */
  i: number;
  kind: BlockKind;
  /** The ReadMe component name, when this block is one. */
  component?: string;
  syntax: Syntax;
  attrs?: Record<string, string>;
  /** 1-based, inclusive, into the raw `.md` file. */
  lines: [number, number];
  /** The verbatim source slice. Nothing in the page is lost by the IR. */
  raw: string;
  /** Plain text, for the blocks where reading it at a glance is the point. */
  text?: string;
  depth?: number;
  code?: CodeIR;
  tabs?: CodeIR[];
  table?: TableIR;
  inline?: InlineHit[];
  target: Target;
  /** Gotchas worth seeing before conversion (`width="smart"`, an unescaped `<String>`). */
  notes?: string[];
  /** Nested blocks, for containers like `Tabs` or a `Callout` with a table inside. */
  children?: Block[];
};

export type PageIR = {
  /** `docs/create-a-reward` — the path the page is written to, no extension. */
  slug: string;
  /** The `.md` URL this was fetched from. */
  source: string;
  /** The human-facing page URL. */
  url: string;
  title: string;
  description: string;
  /** Which llms.txt section it came from: `Guides`, `API Reference`, `Pages`. */
  section: string;
  kind: "guide" | "api" | "page";
  /** YAML frontmatter ReadMe ships (usually just `updatedAt`). */
  frontmatter: Record<string, string>;
  /**
   * `mdx` when the strict MDX parser accepted the page, `markdown` when it had to
   * fall back. A fallback page is still fully blocked out — JSX lands as `html`
   * blocks with the tag name recovered — but it flags MDXish syntax that will
   * need repairing before Documentation.AI will compile it.
   */
  parseMode: "mdx" | "markdown";
  parseError?: string;
  /** Component name -> count, for this page. */
  components: Record<string, number>;
  blocks: Block[];
};

/** One row of the site-wide census. */
export type InventoryRow = {
  name: string;
  syntax: Syntax;
  count: number;
  pages: number;
  target: Target;
  /** A few slugs to open when you want to see it in context. */
  examples: string[];
};

export type Inventory = {
  site: string;
  generatedFrom: string;
  pages: number;
  blocks: number;
  parseFallbacks: string[];
  components: InventoryRow[];
  inline: { kind: string; count: number; pages: number; examples: string[] }[];
  notes: { note: string; count: number; examples: string[] }[];
};

/** One page as listed by llms.txt or a discovery report, before it is fetched. */
export type PageRef = {
  title: string;
  description: string;
  /** The `.md` URL. */
  source: string;
  url: string;
  slug: string;
  section: string;
  kind: "guide" | "api" | "page";
};
