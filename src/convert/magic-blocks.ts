import type { ConversionNote } from "./mdast";

/**
 * Plan §2.7 — legacy `[block:…]` magic blocks -> the modern components.
 *
 * ReadMe's pre-MDX format was JSON in a fenced-looking wrapper:
 *
 * ```
 * [block:callout]
 * { "type": "info", "title": "Heads up", "body": "Read this first." }
 * [/block]
 * ```
 *
 * **This pass runs on the source string, before parsing**, which is not a
 * shortcut — it is the only place it can run. The JSON body starts with `{`, so
 * strict MDX rejects the page (*"Could not parse expression with acorn"*) and the
 * plain-markdown parser hands the whole block back as **one paragraph of text**.
 * There is no node to match. A converter that treats it as code emits the JSON
 * verbatim into the page.
 *
 * Each block is expanded to its **modern ReadMe form**, not straight to the
 * target. `[block:callout]` becomes `<Callout theme=…>`, which the Callout rule
 * then maps to `kind` — so the theme/emoji precedence, the icon table and the
 * embed routing all stay defined in exactly one place. This pass only has to know
 * the JSON shapes `[RM §6]`.
 *
 * Zero magic blocks remain in the Capillary corpus — it is fully migrated to MDX
 * `[RM §6, §10.1]` — so this path exists for the other ReadMe sites a migration
 * will meet.
 */

/** `[block:name] … [/block]`, non-greedy so consecutive blocks stay separate. */
const BLOCK = /^[ \t]*\[block:([a-z-]+)\][ \t]*\r?\n([\s\S]*?)\r?\n[ \t]*\[\/block\][ \t]*$/gim;

/** Legacy callout `type` -> the modern `theme` the Callout rule understands. */
const CALLOUT_TYPE_TO_THEME: Record<string, string> = {
  info: "info",
  warning: "warn",
  warn: "warn",
  danger: "error",
  error: "error",
  success: "okay",
  ok: "okay",
  okay: "okay",
};

type Json = Record<string, unknown>;

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function escapeAttr(value: string): string {
  return value.replace(/"/g, "&quot;");
}

/** `[block:api-header]` -> a markdown heading `[RM §6]`. */
function apiHeader(json: Json): string {
  const level = typeof json.level === "number" ? Math.min(6, Math.max(1, json.level)) : 2;
  return `${"#".repeat(level)} ${str(json.title)}`.trim();
}

/**
 * `[block:callout]` -> `<Callout>`.
 *
 * `type` may be a string or a two-string array `[RM §6]`; the first entry is the
 * theme either way. The title becomes the callout's first child, which is exactly
 * where the Callout rule expects a heading to be.
 */
function callout(json: Json): string {
  const raw = Array.isArray(json.type) ? str(json.type[0]) : str(json.type);
  const theme = CALLOUT_TYPE_TO_THEME[raw.trim().toLowerCase()] ?? "default";
  const icon = str(json.icon);
  const title = str(json.title).trim();
  const body = str(json.body).trim();

  const open = `<Callout theme="${theme}"${icon ? ` icon="${escapeAttr(icon)}"` : ""}>`;
  const inner = [title, body].filter((part) => part.length > 0).join("\n\n");
  return `${open}\n\n${inner}\n\n</Callout>`;
}

/**
 * `[block:code]` -> fences.
 *
 * Emitted with **no blank line between them**, which is how ReadMe spells a tab
 * group — the CodeGroup rule then collapses the run exactly as it would for a
 * hand-written one.
 */
function code(json: Json): string {
  const codes = Array.isArray(json.codes) ? (json.codes as Json[]) : [];
  return codes
    .map((entry) => {
      const language = str(entry.language) || "text";
      const name = str(entry.name).trim();
      return `\`\`\`${language}${name ? ` ${name}` : ""}\n${str(entry.code)}\n\`\`\``;
    })
    .join("\n");
}

/**
 * `[block:image]` -> `<Image>`.
 *
 * The url sits at `images[].image[0]` `[RM §6]`. Only `src` and `alt` are emitted:
 * every ReadMe presentation attribute is dropped by the image rule anyway, and a
 * percentage width has no valid form on the target (plan §3.5). The caption is the
 * best available alt text when the block carries no other.
 */
function image(json: Json): string {
  const images = Array.isArray(json.images) ? (json.images as Json[]) : [];
  return images
    .map((entry) => {
      const url = Array.isArray(entry.image) ? str(entry.image[0]) : str(entry.image);
      const alt = (str(entry.caption) || str(entry.alt) || "").trim();
      return `<Image src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" />`;
    })
    .join("\n\n");
}

/** `[block:embed]` -> `<Embed>`, which the embed rule then routes. */
function embed(json: Json): string {
  const attrs = [
    `url="${escapeAttr(str(json.url))}"`,
    str(json.title) ? `title="${escapeAttr(str(json.title))}"` : "",
    str(json.provider) ? `provider="${escapeAttr(str(json.provider))}"` : "",
    str(json.html) ? `html="${escapeAttr(str(json.html))}"` : "",
  ].filter(Boolean);
  return `<Embed ${attrs.join(" ")} />`;
}

/**
 * `[block:parameters]` (alias `[block:table]`) -> a pipe table.
 *
 * The grid is flat: `data` is keyed `"h-0"` for header cells and `"0-1"` for body
 * cells `[RM §6]`, with `cols` and `rows` giving the shape. A missing key is an
 * empty cell, not a short row — emitting fewer cells would shift the whole row.
 */
function parameters(json: Json): string {
  const data = (json.data ?? {}) as Record<string, unknown>;
  const cols = typeof json.cols === "number" ? json.cols : 0;
  const rows = typeof json.rows === "number" ? json.rows : 0;
  if (cols < 1) return "";

  const align = Array.isArray(json.align) ? (json.align as unknown[]) : [];
  const cell = (key: string) => str(data[key]).replace(/\r?\n/g, " ").replace(/\|/g, "\\|").trim();

  const header = Array.from({ length: cols }, (_, column) => cell(`h-${column}`));
  const delimiter = Array.from({ length: cols }, (_, column) => {
    switch (str(align[column])) {
      case "center":
        return ":---:";
      case "right":
        return "---:";
      case "left":
        return ":---";
      default:
        return "---";
    }
  });
  const body = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, column) => cell(`${row}-${column}`)),
  );

  return [header, delimiter, ...body].map((line) => `| ${line.join(" | ")} |`).join("\n");
}

/**
 * `[block:html]` -> a fenced `html` block, and a blocker.
 *
 * The content is kept verbatim and visible rather than injected: raw HTML is not
 * allowed in the output (global rule), and what it should *become* depends on what
 * is inside it — an `<iframe>` is an `<Iframe>`, a KPI strip is `<Columns>` +
 * `<Card>`, a `<style>` belongs in site CSS (plan §4.3). That is a human decision,
 * so the block is parked where it can be seen and read.
 */
function html(json: Json): string {
  return `\`\`\`html\n${str(json.html).trim()}\n\`\`\``;
}

/** `[block:recipe]` / `[block:tutorial-tile]` -> `<Recipe>`, plus a blocker. */
function recipe(json: Json): string {
  const slug = str(json.slug);
  const title = str(json.title);
  return `<Recipe slug="${escapeAttr(slug)}"${title ? ` title="${escapeAttr(title)}"` : ""} />`;
}

type Expander = (json: Json) => string;

const EXPANDERS: Record<string, Expander> = {
  "api-header": apiHeader,
  callout,
  code,
  image,
  embed,
  parameters,
  table: parameters,
  html,
  recipe,
  "tutorial-tile": recipe,
};

/** Blocks whose expansion still needs a person, and why. */
const BLOCKERS: Record<string, string> = {
  html: "raw HTML has no target component — rebuild it as <Iframe>, <Columns>+<Card>, or site CSS (plan §4.3)",
  recipe: "a Recipe's steps live in the ReadMe dashboard, not in this file — fetch them separately or record the page as incomplete (plan §4.2)",
  "tutorial-tile":
    "a Recipe's steps live in the ReadMe dashboard, not in this file — fetch them separately or record the page as incomplete (plan §4.2)",
};

/** 1-based line number of an offset, for the notes. */
function lineAt(source: string, index: number): number {
  return source.slice(0, index).split(/\r?\n/).length;
}

/**
 * Expands every magic block in a page. Returns the rewritten source and a note
 * per block.
 *
 * A block whose JSON will not parse is **left exactly as it was** and reported.
 * Rewriting it on a guess would destroy the only copy of its content, and leaving
 * it visible means the failure is obvious rather than silent `[PIT Phase 2]`.
 */
export function expandMagicBlocks(source: string): { source: string; notes: ConversionNote[] } {
  const notes: ConversionNote[] = [];

  const expanded = source.replace(BLOCK, (match, rawName: string, body: string, offset: number) => {
    const name = rawName.toLowerCase();
    const line = lineAt(source, offset);

    let json: Json;
    try {
      json = JSON.parse(body.trim()) as Json;
    } catch {
      notes.push({
        rule: "magic-block",
        level: "blocker",
        line,
        detail: `[block:${name}] has JSON this converter cannot read — left in place rather than rewritten on a guess`,
      });
      return match;
    }

    const expander = EXPANDERS[name];
    if (!expander) {
      notes.push({
        rule: "magic-block",
        level: "blocker",
        line,
        detail: `[block:${name}] is not a known magic block — left in place`,
      });
      return match;
    }

    const out = expander(json);
    if (!out.trim()) {
      notes.push({
        rule: "magic-block",
        level: "blocker",
        line,
        detail: `[block:${name}] expanded to nothing — check the block's JSON`,
      });
      return match;
    }

    notes.push({
      rule: "magic-block",
      level: "change",
      line,
      detail: `[block:${name}] expanded to its modern form, which the ${name} rule then converts`,
    });

    const blocker = BLOCKERS[name];
    if (blocker) {
      notes.push({ rule: "magic-block", level: "blocker", line, detail: `[block:${name}]: ${blocker}` });
    }

    return out;
  });

  return { source: expanded, notes };
}
