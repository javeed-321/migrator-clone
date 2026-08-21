import type { Code, Heading, Parent, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { toString as mdastToString } from "mdast-util-to-string";

import { splitFrontmatter } from "../download/blocks";
import { parseMarkdown } from "../download/parse";
import { attr, lineOf, readAttr, type ConversionNote } from "./mdast";

/**
 * Plan §4.2 row 27 — `<Recipe>` / `<TutorialTile>` -> `<Steps>`.
 *
 * ## The blocker this retires
 *
 * The plan calls a Recipe a stop condition, and the reasoning was sound: *"the
 * steps are not in your downloaded `.md` at all"* `[PLAN §4.2]`. A `<Recipe
 * slug="…" />` carries a slug and a tile label and nothing else, because recipes
 * are authored in ReadMe's dashboard — three panes of highlighted steps, code and
 * responses — rather than in MDX `[RM §4.14]`.
 *
 * All of that is still true. What is **not** true is the conclusion, because the
 * content is served: `<site>/recipes/<slug>.md` returns the recipe as markdown,
 * with its title, its code, and every step. Confirmed against
 * `docs.readme.com/recipes/create-a-custom-component.md`. So this is not a gap in
 * what was downloaded — it is a page that was never asked for.
 *
 * That makes it the same shape as `<PostList>`: a component whose content needs
 * one request, so the rule records the node synchronously and `fetchRecipes`
 * fills it in afterwards. And gated the same way, for the same reason — this
 * requests a URL derived from the page being converted, so it is off unless asked
 * for.
 *
 * ## What a recipe is, and what survives
 *
 * ```
 * # Create a Custom Component     <- the title
 * ```javascript JavaScript        <- one code block, the whole example
 * # Create an ExampleComponent    <- a step
 * <!-- javascript@1 -->           <- the lines that step highlights
 * We're creating a React component…
 * ```
 *
 * Steps, titles, prose and code all carry over. **The line highlighting does
 * not** — the target has no component that lights up lines 2–8 of a fence while
 * you read a step. Rather than drop the association, each step keeps its range as
 * text and the fence is emitted with `show-lines`, so a reader can still follow
 * it. That is rung 1 of the fallback ladder: *losing the animation is acceptable,
 * losing the words is not* `[PLAN §4.4]`.
 */

export type RecipeOptions = {
  /** Fetch each recipe and rebuild it as `<Steps>`. Off unless asked for. */
  enabled: boolean;
  /** Abort a request after this long. Default 10s. */
  timeoutMs?: number;
  /** Refuse a response larger than this. Default 512 KB. */
  maxBytes?: number;
  /** Injectable, so tests do not reach the network. */
  fetchImpl?: typeof fetch;
};

export type FoundRecipe = {
  slug: string;
  /** The tile label from the tag, used when the fetched page has no H1. */
  title?: string;
  node: MdxJsxFlowElement;
  parent: Parent;
  line?: number;
};

/** `<!-- javascript@2-8 -->` — which lines of the code block a step is about. */
const ANNOTATION = /^<!--\s*[\w-]+@([\d\s,-]+)\s*-->$/;

function isRecipe(node: RootContent): node is MdxJsxFlowElement {
  return (
    node.type === "mdxJsxFlowElement" && (node.name === "Recipe" || node.name === "TutorialTile")
  );
}

/**
 * Records every recipe on the page and leaves the tags in place.
 *
 * Left in place on purpose: until the content arrives there is nothing to put
 * there, and a tag that stays is a tag the detector will fence if the fetch never
 * happens. Emitting an empty `<Steps>` would look converted while holding nothing.
 */
export function convertRecipes(root: Root): FoundRecipe[] {
  const found: FoundRecipe[] = [];

  const walk = (parent: Parent): void => {
    for (const child of parent.children as RootContent[]) {
      if (isRecipe(child)) {
        const slug = readAttr(child, "slug")?.trim();
        const title = readAttr(child, "title")?.trim();
        if (slug) {
          found.push({
            slug,
            ...(title ? { title } : {}),
            node: child,
            parent,
            line: lineOf(child),
          });
        }
        continue;
      }
      if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);
    }
  };

  walk(root);
  return found;
}

/** `2-8` -> `Lines 2–8`; `1` -> `Line 1`. Written for a reader, not a parser. */
function describeRange(range: string): string {
  const trimmed = range.trim();
  const plural = /[,-]/.test(trimmed);
  return `${plural ? "Lines" : "Line"} ${trimmed.replace(/-/g, "–")}`;
}

type Parsed = { title?: string; code?: Code; steps: { title: string; body: RootContent[] }[] };

/**
 * A recipe's markdown -> its title, its code and its steps.
 *
 * Every `#` after the first opens a step. The first one is the recipe's own
 * title, and the code block between them is the example the whole recipe is
 * about — one block, shared by every step, which is why it is lifted out rather
 * than repeated inside each one.
 */
function parseRecipe(markdown: string): Parsed {
  const { tree } = parseMarkdown(splitFrontmatter(markdown).body);
  const parsed: Parsed = { steps: [] };
  let current: { title: string; body: RootContent[] } | null = null;

  for (const node of tree.children) {
    // ReadMe injects an llms.txt preamble into every `.md` it serves. It is an
    // export artefact, not content, and it sits before the title.
    if (node.type === "paragraph" && /Fetch the complete documentation index at:/.test(mdastToString(node))) {
      continue;
    }

    if (node.type === "heading" && (node as Heading).depth === 1) {
      const text = mdastToString(node).trim();
      if (parsed.title === undefined) parsed.title = text;
      else {
        if (current) parsed.steps.push(current);
        current = { title: text, body: [] };
      }
      continue;
    }

    if (node.type === "code" && parsed.code === undefined && current === null) {
      parsed.code = node;
      continue;
    }

    if (current === null) continue;

    if (node.type === "html") {
      const match = ANNOTATION.exec(node.value.trim());
      if (match?.[1]) {
        current.body.push({
          type: "paragraph",
          children: [{ type: "emphasis", children: [{ type: "text", value: describeRange(match[1]) }] }],
        });
        continue;
      }
    }

    current.body.push(node);
  }

  if (current) parsed.steps.push(current);
  return parsed;
}

function step(title: string, body: RootContent[]): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: "Step",
    attributes: [attr("title", title)],
    children: (body.length > 0
      ? body
      : [{ type: "paragraph", children: [] }]) as MdxJsxFlowElement["children"],
  };
}

/** The code block, with line numbers on — the only way a step's range still reads. */
function codeBlock(code: Code, title: string | undefined): Code {
  return {
    type: "code",
    ...(code.lang ? { lang: code.lang } : {}),
    meta: [title ? `title="${title.replace(/"/g, "'")}"` : "", 'show-lines="true"']
      .filter(Boolean)
      .join(" "),
    value: code.value,
  };
}

function build(parsed: Parsed, fallbackTitle: string | undefined): RootContent[] {
  const out: RootContent[] = [];
  const title = parsed.title ?? fallbackTitle;

  if (parsed.code) out.push(codeBlock(parsed.code, title));

  if (parsed.steps.length > 0) {
    out.push({
      type: "mdxJsxFlowElement",
      name: "Steps",
      attributes: [],
      children: parsed.steps.map((entry) => step(entry.title, entry.body)) as MdxJsxFlowElement["children"],
    });
  }

  return out;
}

/**
 * Phase two — fetch each recipe and rebuild it.
 *
 * A recipe that cannot be read is left exactly as it was. That is not a failure
 * to handle: the tag then reaches the detector, which reports it and fences it,
 * so the page still compiles and the queue still has the entry `[PLAN §4.4]`.
 */
export async function fetchRecipes(
  found: FoundRecipe[],
  site: string | undefined,
  options: RecipeOptions | undefined,
  notes: ConversionNote[],
): Promise<void> {
  if (found.length === 0) return;

  if (!options?.enabled) {
    for (const entry of found) {
      notes.push({
        rule: "recipe",
        level: "flag",
        ...(entry.line !== undefined ? { line: entry.line } : {}),
        detail:
          `<Recipe slug="${entry.slug}"> was left in place — its steps live at ` +
          "`<site>/recipes/<slug>.md`, not in this file. Set `recipes.enabled` to fetch and rebuild " +
          "it as <Steps>, or rebuild it by hand",
      });
    }
    return;
  }

  if (!site) {
    for (const entry of found) {
      notes.push({
        rule: "recipe",
        level: "blocker",
        ...(entry.line !== undefined ? { line: entry.line } : {}),
        detail:
          `<Recipe slug="${entry.slug}"> could not be fetched — the tag carries only a slug, so the ` +
          "site it belongs to has to be given as `site` for the recipe URL to be built",
      });
    }
    return;
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? 10_000;
  const maxBytes = options.maxBytes ?? 512 * 1024;

  for (const entry of found) {
    const url = new URL(`/recipes/${entry.slug}.md`, site).toString();

    const failed = (reason: string): void => {
      notes.push({
        rule: "recipe",
        level: "blocker",
        ...(entry.line !== undefined ? { line: entry.line } : {}),
        detail:
          `<Recipe slug="${entry.slug}"> could not be read from ${url} — ${reason}. The tag is left ` +
          "in place rather than replaced with empty steps",
      });
    };

    try {
      const response = await fetchImpl(url, {
        signal: AbortSignal.timeout(timeoutMs),
        redirect: "follow",
      });

      if (!response.ok) {
        failed(`the site answered ${response.status}`);
        continue;
      }

      const body = await response.text();
      if (body.length > maxBytes) {
        failed(`the response is larger than the ${maxBytes}-byte limit`);
        continue;
      }

      const parsed = parseRecipe(body);
      const built = build(parsed, entry.title);

      if (built.length === 0) {
        failed("it has no steps and no code in it");
        continue;
      }

      const children = entry.parent.children as RootContent[];
      const at = children.indexOf(entry.node);
      if (at === -1) continue;
      children.splice(at, 1, ...built);

      notes.push({
        rule: "recipe",
        level: "change",
        ...(entry.line !== undefined ? { line: entry.line } : {}),
        detail:
          `rebuilt <Recipe slug="${entry.slug}"> as <Steps> with ${parsed.steps.length} step` +
          `${parsed.steps.length === 1 ? "" : "s"}, fetched from ${url}`,
      });

      if (parsed.code) {
        notes.push({
          rule: "recipe",
          level: "flag",
          ...(entry.line !== undefined ? { line: entry.line } : {}),
          detail:
            "the recipe's line highlighting was not carried over — the target has no component that " +
            "lights up a fence's lines as you read a step. Each step keeps its range as text and the " +
            "code block is emitted with `show-lines`, so the reference still reads",
        });
      }
    } catch (error) {
      failed(error instanceof Error ? error.message : String(error));
    }
  }
}
