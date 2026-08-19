import type { Code, Heading, PhrasingContent, Root, RootContent, Table, TableCell } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { toString as mdastToString } from "mdast-util-to-string";
import { CONTINUE, EXIT, visit } from "unist-util-visit";

import { attr, lineOf, type ConversionNote } from "./mdast";
import { assignDepths, readMarker } from "./table";

/**
 * Plan §5 — the API reference.
 *
 * The other conversion modules each own one *component*. This one owns one *page
 * kind*, because that is how the source is shaped: a ReadMe endpoint page is a
 * fixed run of headed sections — example request, response body, path/query
 * parameters, response parameters — and every rule in plan §5 keys off which
 * section a node is sitting in, not off the node itself. A `json` fence is a
 * response example under `# Response body` and an ordinary sample four headings
 * later; nothing in the node distinguishes them.
 *
 * So the unit of work here is a **section**: find the heading, classify it, and
 * apply the rule to what it covers.
 *
 * What this module deliberately does not do is retype the spec. Plan §5.6 is
 * explicit that `ParamField`/`ResponseField` are *generated* by the OpenAPI
 * importer, and that the 560 corpus endpoint pages are "one spec import plus
 * whatever hand-written prose each page carries". The parameter-table rules
 * (§5.3, §5.4) are implemented in full, but they are **opt-in** — see
 * `ApiReferenceOptions.paramFields`.
 */

export type ApiReferenceOptions = {
  /**
   * Rewrite parameter tables as `<ParamField>` and response-field tables as
   * `<ResponseField>` (plan §5.3, §5.4). **Off by default.**
   *
   * Off is not laziness, it is plan §5.6: where a spec is wired to the page with
   * `openapi-mode: "custom"`, the importer emits both component sets from the
   * spec, and a hand-converted copy in the body is a second, drifting source of
   * truth. A table left as a table is also lossless — `[TBL]` already carries the
   * nested-parameter dialect across.
   *
   * Turn it on for pages with no spec behind them, which is the one case plan
   * §5.6 names for hand-authoring these.
   */
  paramFields?: boolean;
};

// ---------------------------------------------------------------------------
// 5.6 Artefacts that must not reach the target
// ---------------------------------------------------------------------------

/**
 * ReadMe injects this line above every page it serves as `.md` — it is an export
 * artefact, not authored content `[RM §10.8]` `[PIT Phase 2]`. Same regex the
 * download IR uses to flag it (`download/blocks.ts`); this module is the one that
 * removes it, because the IR only reports.
 */
const LLMS_PREAMBLE = /Fetch the complete documentation index at:\s*https?:\S+llms\.txt/i;

/**
 * The heading over ReadMe's dumped spec. `[PIT Phase 2]` names `# OpenAPI
 * definition` among the internal markers that shipped visibly — on 16 pages.
 */
const OPENAPI_HEADING = /^open\s*api\s+definition$/i;

/**
 * Drops the two things plan §5.6 says must never reach a migrated API page.
 *
 * Runs on the tree before any other pass. That ordering is not cosmetic: the spec
 * dump is a ~300-line JSON fence with links in it, and every pass below —
 * placeholders, the link rewriter, the MDX compile check — would otherwise spend
 * itself on a block that is about to be deleted.
 *
 * The spec section is removed **to the next heading at the same depth or
 * shallower**, which is what makes it a section rather than a heading: on the
 * corpus pages the dump is last, but a page that continues after it keeps
 * everything that follows.
 */
export function stripApiArtefacts(tree: Root, notes: ConversionNote[]): void {
  const children = tree.children;

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (!child) continue;

    if (child.type === "paragraph" && LLMS_PREAMBLE.test(mdastToString(child))) {
      children.splice(i, 1);
      notes.push({
        rule: "api-artefact",
        level: "change",
        line: lineOf(child),
        detail: "dropped ReadMe's injected llms.txt preamble — an export artefact, not content [RM §10.8]",
      });
      i -= 1;
      continue;
    }

    if (child.type === "heading" && OPENAPI_HEADING.test(mdastToString(child).trim())) {
      const depth = child.depth;
      let end = i + 1;
      while (end < children.length) {
        const next = children[end];
        if (next?.type === "heading" && next.depth <= depth) break;
        end += 1;
      }
      const removed = children.splice(i, end - i);
      notes.push({
        rule: "api-artefact",
        level: "change",
        line: lineOf(child),
        detail: `dropped the "# OpenAPI definition" dump (${removed.length - 1} block${removed.length === 2 ? "" : "s"}) — the spec belongs in a wired-up YAML file, not the body [PIT Phase 2]`,
      });
      i -= 1;
    }
  }
}

// ---------------------------------------------------------------------------
// 5.5 Request / Response — the sidebar examples
// ---------------------------------------------------------------------------

/**
 * What a heading says the section under it holds.
 *
 * `parameters`/`fields` are excluded before anything else because
 * "Response parameters" and "Request parameters" both contain the words this
 * classifier keys off, and both are *table* sections (§5.3, §5.4) — routing them
 * into `<Response>` would move a parameter table into the sidebar.
 */
/** The nouns a parameter/response-field section is titled with. */
const PARAM_SECTION_WORDS = /\b(parameters?|params?|fields?|attributes?)\b/;
/** …and the location word that says which kind it is. Both are matched loosely: the corpus writes "Request Query Parameters", "Response parameter" and "Additional Header". */
const PARAM_SECTION_LOCATION = /\b(path|quer|header|body|payload|request|response)/;

function classifySection(text: string): "request" | "response" | undefined {
  const value = text.trim().toLowerCase();
  if (/param|field|schema|attribute|error code|status code/.test(value)) return undefined;
  if (/\brequests?\b/.test(value)) return "request";
  if (/\bresponses?\b/.test(value)) return "response";
  return undefined;
}

/**
 * Does this page have an endpoint's shape?
 *
 * `<Request>`/`<Response>` render in the **right sidebar** `[DAI §7, §8]`, so
 * wrapping a fence in one is only correct on a reference page. A guide with a
 * "Request" heading and a code sample under it must keep a plain fence, and the
 * cheapest honest signal that a page is an endpoint is the chrome ReadMe's own
 * endpoint template puts around it.
 */
function looksLikeApiReference(tree: Root): boolean {
  let found = false;

  visit(tree, (node) => {
    if (found) return EXIT;

    if (node.type === "heading") {
      const text = mdastToString(node).trim().toLowerCase();
      if (PARAM_SECTION_WORDS.test(text) && PARAM_SECTION_LOCATION.test(text)) found = true;
      if (/^(resource information|api specific error codes|prerequisites)$/.test(text)) found = true;
    }

    // Descends rather than reading `tree.children`: by the time this runs, §1.3
    // has folded a run of adjacent fences into a `<CodeGroup>`, so the `curl`
    // fence that marks the page is a *grandchild* of the root. Reading top-level
    // children only, this missed a real endpoint page in the corpus
    // (`get-customer-details-v1api`, whose two request fences are adjacent).
    if (node.type === "code" && node.lang?.toLowerCase() === "curl") found = true;

    return found ? EXIT : CONTINUE;
  });

  return found;
}

/** Display names for a tab label. A request switcher is labelled by language. */
const LANG_LABEL: Record<string, string> = {
  bash: "Shell", c: "C", cpp: "C++", csharp: "C#", cs: "C#", curl: "cURL", dart: "Dart",
  go: "Go", graphql: "GraphQL", http: "HTTP", java: "Java", javascript: "JavaScript",
  js: "JavaScript", json: "JSON", kotlin: "Kotlin", node: "Node", nodejs: "Node", php: "PHP",
  powershell: "PowerShell", py: "Python", python: "Python", rb: "Ruby", ruby: "Ruby",
  rust: "Rust", sh: "Shell", shell: "Shell", sql: "SQL", swift: "Swift", ts: "TypeScript",
  typescript: "TypeScript", xml: "XML", yaml: "YAML", yml: "YAML",
};

/** The title `convertFenceTitle` already normalised onto the fence, if any. */
function fenceTitle(node: Code): string | undefined {
  return /title="([^"]*)"/.exec(node.meta ?? "")?.[1];
}

/**
 * Tab labels for `<Request>`: the **language**, not the fence title.
 *
 * Plan §5.5 turns a fence titled *"Sample request"* into `tabs="cURL"` — because a
 * request switcher answers "in which language?", and every tab in it is the same
 * call. Titles only come back when the languages cannot tell the tabs apart,
 * which is what a page showing two curl variants needs.
 */
function requestLabels(fences: Code[]): string[] {
  const langs = fences.map((fence) => LANG_LABEL[(fence.lang ?? "").toLowerCase()]);
  const usable = langs.every((label): label is string => label !== undefined);
  if (usable && new Set(langs).size === langs.length) return langs;
  return fences.map((fence, index) => fenceTitle(fence) ?? langs[index] ?? `Example ${index + 1}`);
}

/** `200 OK` / `200 - OK` / `200: OK` -> `200 - OK`; `200` -> `200`. */
const STATUS_TITLE = /^(\d{3})\s*[-–—:]?\s*(.*)$/;

/**
 * Tab labels for `<Response>`: HTTP status codes `[DAI §8]`, in the
 * `"CODE - Variant"` form both `Response` and `CodeGroup` group by `[DAI §6, §8]`.
 *
 * A title with no status code in it is **kept verbatim and flagged**, never given
 * one. Plan §5.5's own example reads a fence titled *"Invalid payment mode"* as
 * `400 - Invalid payment mode`, and that 400 is not in the source — it comes from
 * the spec. Inventing it here would put a wrong status code on the page, which is
 * worse than an unlabelled tab a human fixes.
 */
function responseLabels(fences: Code[], notes: ConversionNote[]): string[] {
  return fences.map((fence, index) => {
    const title = fenceTitle(fence);
    if (!title) {
      notes.push({
        rule: "api-response",
        level: "flag",
        line: lineOf(fence),
        detail: `response example ${index + 1} has no title, so its tab has no status code — <Response tabs> expects "200", "400 - Invalid payment mode" [DAI §8]`,
      });
      return LANG_LABEL[(fence.lang ?? "").toLowerCase()] ?? `Response ${index + 1}`;
    }

    const status = STATUS_TITLE.exec(title);
    if (!status) {
      notes.push({
        rule: "api-response",
        level: "flag",
        line: lineOf(fence),
        detail: `response tab "${title}" carries no status code — the code is in the spec, not the page, so add it by hand rather than letting a guess ship [DAI §8]`,
      });
      return title;
    }

    const rest = (status[2] ?? "").trim();
    return rest ? `${status[1]} - ${rest}` : (status[1] as string);
  });
}

/**
 * Tabs are comma-separated, so a comma inside a label silently splits it into two
 * tabs. Same failure, same treatment as `<CodeGroup>` in §1.3.
 */
function checkLabels(labels: string[], tag: string, at: RootContent, notes: ConversionNote[]): void {
  for (const label of labels) {
    if (!label.includes(",")) continue;
    notes.push({
      rule: tag === "Request" ? "api-request" : "api-response",
      level: "blocker",
      line: lineOf(at),
      detail: `tab label "${label}" contains a comma, which is the separator in tabs="…" — rename the label`,
    });
  }
}

/**
 * Fences to wrap, given a node that is either a bare fence or the `<CodeGroup>`
 * §1.3 already made out of a run of them.
 *
 * `<Request>`/`<Response>` *are* `CodeGroup`s `[DAI §7, §8]`, so a group inside
 * one would be a switcher inside a switcher. Unwrapping it here is what keeps the
 * two passes composable in either order.
 */
function fencesOf(node: RootContent): Code[] | undefined {
  if (node.type === "code") return [node];
  if (node.type === "mdxJsxFlowElement" && node.name === "CodeGroup") {
    const fences = node.children.filter((child): child is Code => child.type === "code");
    return fences.length === node.children.length && fences.length > 0 ? fences : undefined;
  }
  return undefined;
}

/**
 * Threshold for `dropdown="true"`.
 *
 * Plan §5.5 calls the dropdown "the right choice when a Capillary endpoint
 * documents many scenarios" without fixing a number. Four is where a tab strip
 * starts wrapping at reading width; below it, tabs stay readable.
 */
const DROPDOWN_FROM = 4;

function wrap(tag: "Request" | "Response", fences: Code[], labels: string[]): MdxJsxFlowElement {
  const attributes = [attr("tabs", labels.join(","))];
  if (tag === "Response" && labels.length >= DROPDOWN_FROM) attributes.push(attr("dropdown", "true"));

  // The label lives in `tabs` now. Leaving `title="…"` on the fence as well makes
  // the target print it a second time, inside the tab it names.
  for (const fence of fences) {
    if (fence.meta && /^title="[^"]*"$/.test(fence.meta.trim())) fence.meta = null;
  }

  return { type: "mdxJsxFlowElement", name: tag, attributes, children: fences };
}

/**
 * Plan §5.5 — request examples into `<Request>`, response payloads into
 * `<Response>`, both of which the target renders in the right sidebar.
 *
 * Runs **after** §1.3, on purpose. By then a fence's title is already normalised
 * into `title="…"` and a run of adjacent fences is already one `<CodeGroup>`, so
 * this pass reads one shape instead of two and never has to re-derive a tab label
 * that §1.3 has already worked out.
 *
 * Conversion is node-local inside a classified section: one fence, or one group of
 * adjacent fences, becomes one component **where it stood**. A section holding two
 * separated examples yields two `<Response>` blocks rather than one merged block,
 * because merging them would reorder the prose between them.
 *
 * The section heading is dropped only when the section holds nothing else: after
 * the examples move to the sidebar, a heading with no body left under it is a
 * label for empty space. A heading with prose under it stays.
 */
export function convertApiExamples(tree: Root, notes: ConversionNote[]): void {
  if (!looksLikeApiReference(tree)) return;

  const children = tree.children;

  for (let i = children.length - 1; i >= 0; i -= 1) {
    const heading = children[i];
    if (heading?.type !== "heading") continue;

    const kind = classifySection(mdastToString(heading));
    if (!kind) continue;

    let end = i + 1;
    while (end < children.length) {
      const next = children[end];
      if (next?.type === "heading" && next.depth <= (heading as Heading).depth) break;
      end += 1;
    }

    const tag = kind === "request" ? "Request" : "Response";
    let converted = 0;

    for (let j = i + 1; j < end; j += 1) {
      const node = children[j];
      if (!node) continue;
      const fences = fencesOf(node);
      if (!fences) continue;

      const labels = kind === "request" ? requestLabels(fences) : responseLabels(fences, notes);
      checkLabels(labels, tag, node, notes);

      children[j] = wrap(tag, fences, labels);
      converted += 1;
      notes.push({
        rule: kind === "request" ? "api-request" : "api-response",
        level: "change",
        line: lineOf(node),
        detail: `${fences.length} fence${fences.length === 1 ? "" : "s"} under "${mdastToString(heading).trim()}" -> <${tag} tabs="${labels.join(",")}"> in the right sidebar`,
      });
    }

    if (converted === 0) continue;

    const onlyExamples = children
      .slice(i + 1, end)
      .every((node) => node.type === "mdxJsxFlowElement" && (node.name === "Request" || node.name === "Response"));

    if (onlyExamples) {
      const text = mdastToString(heading).trim();
      children.splice(i, 1);
      notes.push({
        rule: kind === "request" ? "api-request" : "api-response",
        level: "change",
        line: lineOf(heading),
        detail: `dropped the "${text}" heading — its whole section moved to the sidebar, so the heading would label empty space`,
      });
    }
  }
}

// ---------------------------------------------------------------------------
// 5.3 / 5.4 ParamField, ResponseField
// ---------------------------------------------------------------------------

/** Where a parameter lives. The attribute name *is* the location `[DAI §14]`. */
type Location = "path" | "query" | "header" | "body";

/**
 * Which component a table under this heading becomes.
 *
 * Location is read most-specific-first, not in `[DAI §14]`'s precedence order,
 * because a heading names one location in words rather than setting four
 * attributes: the corpus writes *"Request Query Parameters"*, which is a query
 * table with the word "request" in front of it, and *"Additional Header"*.
 */
function classifyParamSection(text: string): { tag: "ParamField"; location: Location } | { tag: "ResponseField" } | undefined {
  const value = text.trim().toLowerCase();
  if (!PARAM_SECTION_WORDS.test(value)) return undefined;
  if (/\bresponse\b/.test(value)) return { tag: "ResponseField" };
  if (/\bpath\b/.test(value)) return { tag: "ParamField", location: "path" };
  if (/\bquer/.test(value)) return { tag: "ParamField", location: "query" };
  if (/\bheaders?\b/.test(value)) return { tag: "ParamField", location: "header" };
  if (/\b(body|payload)\b/.test(value)) return { tag: "ParamField", location: "body" };
  if (/\brequest\b/.test(value)) return { tag: "ParamField", location: "body" };
  return undefined;
}

/** Header-cell patterns, in the order a row's columns are read. */
const COLUMN = {
  type: /\b(data\s*)?type\b/i,
  required: /\b(required|mandatory|optional)\b/i,
  description: /\b(description|desc|details|remarks)\b/i,
};

/** A value in a "Required" column that means yes. */
const AFFIRMATIVE = /^(y|yes|true|required|mandatory|✓|✔)\b/i;

/**
 * The identifier, out of a first cell that may be bold, backticked, carrying any of
 * the four depth markers `[TBL]` leaves in place, and suffixed with the `*` ReadMe
 * uses to mean required (`` `limit*` ``).
 *
 * Everything stripped here is *markup around* the name. Nothing that could be
 * part of the name is touched — which is the whole point: `[PIT Phase 2]` records
 * 40 rows across 4 pages that shipped with **no name at all** because an
 * over-eager unwrap of `` **`name`** `` left an empty string.
 */
/** Indent runs and depth glyphs that may sit in front of a name. */
const INDENT_AND_GLYPH = /^[\s   •◦▪.]+/;

function readParamName(cell: string): { name: string; required: boolean } {
  // Indent runs and depth glyphs first. `*`, `-` and `+` count as a glyph **only
  // when whitespace follows** — stripping a bare leading `*` would eat the first
  // half of a `**bold**` name and leave `name**`, which is the same class of
  // mangling as dropping the name altogether.
  let value = cell.replace(INDENT_AND_GLYPH, "").replace(/^[*+-]\s+/, "").trim();

  // Bold, then backticks, then bold again: the corpus writes all three of
  // `` **`name`** ``, `` `**name**` `` and plain `` `name` ``.
  value = unwrap(value, /^\*\*([\s\S]+)\*\*$/);
  value = unwrap(value, /^`+([\s\S]+?)`+$/);
  value = unwrap(value, /^\*\*([\s\S]+)\*\*$/);

  const required = value.endsWith("*");
  if (required) value = unwrap(value.slice(0, -1).trim(), /^`+([\s\S]+?)`+$/);

  return { name: value, required };
}

/** Removes markup around a name, and only when something is left underneath. */
function unwrap(value: string, pattern: RegExp): string {
  const inner = pattern.exec(value)?.[1]?.trim();
  return inner && inner.length > 0 ? inner : value;
}

function textCell(cell: TableCell | undefined): string {
  // Not `.trim()`. JS trims *every* Unicode space, em-space (U+2003) and NBSP
  // included — and those are exactly what the table pass writes to carry a row's
  // depth `[TBL]`. Trimming them here would flatten the ladder it just encoded and
  // leave every nested field looking top-level. Only ASCII padding comes off.
  return cell ? mdastToString(cell).replace(/^[\t\n\r ]+/, "").replace(/\s+$/, "") : "";
}

/** `metadata` -> `Metadata properties`, the title form plan §5.4 uses. */
function expandableTitle(name: string): string {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} properties`;
}

/**
 * The `•` `[TBL §7.1 option A]` the table pass writes where a cell had a `<br>`.
 *
 * It exists because a table cell renders at `white-space: normal` and cannot hold
 * a line break. A `<ParamField>` body is not a cell — it takes paragraphs — so
 * carrying the separator across would ship a literal bullet in the middle of a
 * sentence to work around a constraint that no longer applies.
 */
const CELL_SEPARATOR = "•";

/** Description cell -> paragraphs, splitting where the cell had a line break. */
function descriptionBody(cell: TableCell | undefined): MdxJsxFlowElement["children"] {
  if (!cell || cell.children.length === 0) return [];

  const paragraphs: PhrasingContent[][] = [[]];
  const push = (node: PhrasingContent) => paragraphs[paragraphs.length - 1]?.push(node);

  for (const node of cell.children) {
    if (node.type !== "text" || !node.value.includes(CELL_SEPARATOR)) {
      push(node);
      continue;
    }
    const segments = node.value.split(CELL_SEPARATOR);
    for (const [index, segment] of segments.entries()) {
      if (index > 0) paragraphs.push([]);
      if (segment.trim().length > 0) push({ type: "text", value: segment });
    }
  }

  return paragraphs
    .map((children) => trimEdges(children))
    .filter((children) => children.length > 0)
    .map((children) => ({ type: "paragraph" as const, children }));
}

/** Drops the whitespace a split left at a paragraph's edges. */
function trimEdges(children: PhrasingContent[]): PhrasingContent[] {
  const nodes = [...children];
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (first?.type === "text") first.value = first.value.replace(/^\s+/, "");
  if (last?.type === "text") last.value = last.value.replace(/\s+$/, "");
  return nodes.filter((node) => !(node.type === "text" && node.value.length === 0));
}

function field(
  tag: "ParamField" | "ResponseField",
  location: Location | undefined,
  name: string,
  type: string,
  required: boolean,
  description: TableCell | undefined,
): MdxJsxFlowElement {
  const attributes = [
    tag === "ParamField" ? attr(location ?? "path", name) : attr("name", name),
    ...(type ? [attr(tag === "ParamField" ? "param-type" : "field-type", type)] : []),
    // String-compared against "true" `[DAI §14]`: `required={true}` never registers.
    // Emitted only when true — the attribute already defaults to false, and a page
    // of `required="false"` is noise that hides the rows that matter.
    ...(required ? [attr("required", "true")] : []),
  ];

  return { type: "mdxJsxFlowElement", name: tag, attributes, children: descriptionBody(description) };
}

/**
 * Rows -> components, nesting the deeper ones inside `<Expandable>`.
 *
 * Only `ResponseField` nests: `[DAI §15]` gives it `<Expandable>` and plan §5.4
 * shows it. `ParamField` has no nesting form in either reference, which is why a
 * nested *parameter* table is refused outright rather than flattened — see
 * `convertParamFields`.
 */
function nest(fields: { node: MdxJsxFlowElement; depth: number; name: string }[]): MdxJsxFlowElement[] {
  const roots: MdxJsxFlowElement[] = [];
  const open: { node: MdxJsxFlowElement; depth: number; name: string }[] = [];

  for (const entry of fields) {
    while (open.length > 0 && (open[open.length - 1]?.depth ?? 0) >= entry.depth) open.pop();

    const parent = open[open.length - 1];
    if (!parent) roots.push(entry.node);
    else {
      const last = parent.node.children[parent.node.children.length - 1];
      const box =
        last && last.type === "mdxJsxFlowElement" && last.name === "Expandable"
          ? last
          : ({
              type: "mdxJsxFlowElement",
              name: "Expandable",
              attributes: [attr("title", expandableTitle(parent.name)), attr("default-open", "false")],
              children: [],
            } satisfies MdxJsxFlowElement);
      if (box !== last) parent.node.children.push(box);
      box.children.push(entry.node);
    }

    open.push(entry);
  }

  return roots;
}

/**
 * Plan §5.3 / §5.4 — a parameter table becomes one component per row.
 *
 * **Off unless `options.paramFields` asks for it**, and that default is plan §5.6:
 * where the page is bound to a spec with `openapi-mode: "custom"`, the importer
 * already emits these from the spec, and a hand-converted copy in the body is a
 * second source of truth that drifts. Left alone, the table is still correct and
 * still carries its nesting `[TBL]`.
 *
 * When it is on, the conversion **refuses more than it forces**. A table is left
 * as a table, with a note saying why, when:
 *
 * - any row's first cell has no identifier left in it — `[PIT Phase 2]`'s named
 *   defect, and the one thing here that must never be shipped quietly;
 * - a *parameter* table nests, because `ParamField` has no nesting form and
 *   flattening it would silently reparent every child parameter.
 *
 * Refusing loses nothing: the table is already a faithful rendering of the source.
 */
export function convertParamFields(tree: Root, notes: ConversionNote[], options: ApiReferenceOptions): void {
  if (!looksLikeApiReference(tree)) return;

  if (!options.paramFields) {
    reportParamTables(tree, notes);
    return;
  }

  const children = tree.children;

  for (let i = children.length - 1; i >= 0; i -= 1) {
    const heading = children[i];
    if (heading?.type !== "heading") continue;

    const target = classifyParamSection(mdastToString(heading));
    if (!target) continue;

    let end = i + 1;
    while (end < children.length) {
      const next = children[end];
      if (next?.type === "heading" && next.depth <= heading.depth) break;
      end += 1;
    }

    for (let j = end - 1; j > i; j -= 1) {
      const table = children[j];
      if (table?.type !== "table") continue;

      const converted = tableToFields(table, target, notes);
      if (converted) children.splice(j, 1, ...converted);
    }
  }
}

/**
 * The note the default path exists to produce.
 *
 * Leaving the tables alone is the right default (plan §5.6), but *silently*
 * leaving them is not: whoever runs the migration still has to decide, per group,
 * between wiring the spec and hand-authoring the components. This says which
 * pages carry that decision, once per page rather than once per table.
 */
function reportParamTables(tree: Root, notes: ConversionNote[]): void {
  let tables = 0;
  let first: Table | undefined;

  for (let i = 0; i < tree.children.length; i += 1) {
    const heading = tree.children[i];
    if (heading?.type !== "heading") continue;
    if (!classifyParamSection(mdastToString(heading))) continue;

    for (let j = i + 1; j < tree.children.length; j += 1) {
      const node = tree.children[j];
      if (node?.type === "heading" && node.depth <= heading.depth) break;
      if (node?.type === "table") {
        tables += 1;
        first ??= node;
      }
    }
  }

  if (tables === 0) return;

  notes.push({
    rule: "param-field",
    level: "flag",
    line: first ? lineOf(first) : undefined,
    detail: `${tables} parameter table${tables === 1 ? "" : "s"} left as table${tables === 1 ? "" : "s"} — plan §5.6: wire the spec to this page with openapi: "<spec> METHOD /path" and openapi-mode: "custom" and the importer emits <ParamField>/<ResponseField> from it. Convert with api.paramFields only if no spec covers this endpoint`,
  });
}

function tableToFields(
  table: Table,
  target: { tag: "ParamField"; location: Location } | { tag: "ResponseField" },
  notes: ConversionNote[],
): MdxJsxFlowElement[] | undefined {
  const [header, ...rows] = table.children;
  if (!header || rows.length === 0) return undefined;

  const headings = header.children.map((cell) => textCell(cell));
  const column = {
    type: headings.findIndex((text) => COLUMN.type.test(text)),
    required: headings.findIndex((text) => COLUMN.required.test(text)),
    description: headings.findIndex((text) => COLUMN.description.test(text)),
  };

  // The name is column 0 by definition `[PIT Phase 2]`; without a description
  // column there is nothing to say about each row, and a component per row would
  // be worse than the table it replaced.
  if (column.description <= 0) {
    notes.push({
      rule: target.tag === "ParamField" ? "param-field" : "response-field",
      level: "flag",
      line: lineOf(table),
      detail: `no description column in "${headings.join(" | ")}" — table kept as a table, since a <${target.tag}> with no body says less than the row did`,
    });
    return undefined;
  }

  const markers = rows.map((row) => readMarker(textCell(row.children[0])));
  const depths = assignDepths(markers);

  const entries: { node: MdxJsxFlowElement; depth: number; name: string }[] = [];

  for (const [index, row] of rows.entries()) {
    const marker = markers[index];
    const { name, required: starred } = readParamName(marker ? marker.rest : textCell(row.children[0]));

    if (name.length === 0) {
      notes.push({
        rule: target.tag === "ParamField" ? "param-field" : "response-field",
        level: "blocker",
        line: lineOf(table),
        detail: `row ${index + 1} has no parameter name left after unwrapping — table kept as a table rather than shipping a nameless <${target.tag}> [PIT Phase 2: 40 such rows shipped on 4 pages]`,
      });
      return undefined;
    }

    const depth = depths[index] ?? 0;
    if (depth > 0 && target.tag === "ParamField") {
      notes.push({
        rule: "param-field",
        level: "flag",
        line: lineOf(table),
        detail: `"${name}" is a nested parameter and <ParamField> has no nesting form — table kept as a table, where the first column still carries the depth exactly as the source wrote it [TBL]`,
      });
      return undefined;
    }

    const requiredCell = column.required >= 0 ? textCell(row.children[column.required]) : "";
    const required =
      starred ||
      (column.required >= 0 && !/optional/i.test(headings[column.required] ?? "")
        ? AFFIRMATIVE.test(requiredCell)
        : false);

    entries.push({
      node: field(
        target.tag,
        target.tag === "ParamField" ? target.location : undefined,
        name,
        column.type >= 0 ? textCell(row.children[column.type]).replace(/`/g, "").toLowerCase() : "",
        required,
        row.children[column.description],
      ),
      depth,
      name,
    });
  }

  notes.push({
    rule: target.tag === "ParamField" ? "param-field" : "response-field",
    level: "change",
    line: lineOf(table),
    detail: `${entries.length}-row table -> ${entries.length} <${target.tag}>${target.tag === "ParamField" ? ` ${target.location}="…"` : ""}`,
  });

  return target.tag === "ResponseField" ? nest(entries) : entries.map((entry) => entry.node);
}
