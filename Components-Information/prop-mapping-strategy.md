# Prop mapping strategy — ReadMe → Documentation.AI

Attribute-by-attribute conversion rules. Where
[`component-conversion-plan.md`](component-conversion-plan.md) explains *which component* becomes
which, this file specifies *what happens to every prop* — precisely enough to implement without
a judgement call.

Citations follow the same convention: `[RM §n]` = `readme-components-info.md`,
`[DAI §n]` = `documentationai-components-information.md`, `[PIT Phase n]` =
`migration-pitfalls.md`, `[TBL]` = `table-spacing-information.md`.

---

## 1. The six actions

Every source prop resolves to exactly one of these. Nothing is left undecided.

| Action | Meaning | Example |
|---|---|---|
| **KEEP** | Same name, same value | `src` → `src` |
| **RENAME** | Same value, new name | `url` → `src` |
| **TRANSFORM** | New value, via a named transform in §2 | `theme="warn"` → `kind="alert"` |
| **DERIVE** | Target prop computed from something other than a source prop | child count → `cols` |
| **DROP** | Intentionally not carried | `align="center"` on an Image |
| **BLOCK** | Target requires it, source has no value → cannot emit; queue for a human | `Card` with no `href` |

**DROP is a decision, not a loss** — it means the target has no equivalent and the *content* is
unaffected. Anything that would lose content is a BLOCK `[PIT Phase 2]`.

---

## 2. Shared value transforms

Named once, referenced by every matrix below.

### T1 — Attribute case

Documentation.AI is **kebab-case** for multi-word props `[DAI header rule]`; ReadMe is camelCase
`[RM §2]`. Convert by default, with these **exceptions that stay camelCase on the target**:

`contentTypes`, `defaultType` `[DAI §23]` · `defaultScheme` `[DAI §24]` · `fetchPriority`,
`className` `[DAI §16–18]` · `titleType` (deprecated alias of `title-type` — emit the kebab form)
`[DAI §9]`

### T2 — Boolean form

ReadMe accepts `{true}`, `"true"`, `{false}`, `"false"` — string forms exist because the MDXish
parser passes JSX expressions through as strings `[RM §4.2]`.

**Emit strings on the target.** Several Documentation.AI props are **string-compared against
`"true"`**, so a JSX boolean silently fails:

| Target prop | Form required | Citation |
|---|---|---|
| `required`, `deprecated` on `ParamField` / `ResponseField` | `"true"` — compared with `=== "true"` | `[DAI §14, §15]` |
| `collapsed` on `Callout` | `"true"` / `"false"` | `[DAI §4]` |
| `default-open` on `Expandable` | `"true"` / `"false"` | `[DAI §11]` |
| `show-lines` on `CodeGroup` / `Response` | `"true"` / `"false"` | `[DAI §6, §8]` |
| `default-open` on `CollectionList` | `"true"` / `"false"` | `[DAI §21]` |
| `horizontal` on `Card` | either form accepted | `[DAI §12]` |
| `controls`, `autoplay`, `loop`, `muted`, `allow-full-screen` on `Video` / `Iframe` | either form accepted | `[DAI §17, §18]` |

Rule: **when in doubt, emit the string form.** It is accepted everywhere; the boolean is not.

### T3 — Callout theme/icon → kind

Resolve **`theme` first, then the emoji** — `theme` wins over `icon` on ReadMe `[RM §4.1]`.

```
theme: default→info · info→info · warn|warning→alert · ok|okay|success→success · err|error→danger
emoji (only when theme absent):
  📘 ℹ️ → info      🚧 ⚠️ ⚠ → alert      👍 ✅ → success
  ❗️ ❗ 🛑 ⁉️ ‼️ → danger        any other emoji → info
```

`[RM §4.1 emoji map]` → `[DAI §4 kinds]`. Never produce `kind="tip"`: it exists on the target but
has no source theme `[DAI §4]`.

### T4 — Icon vocabulary

ReadMe: emoji, or a Font Awesome class (`fa-info-circle`, `fa-duotone fa-solid fa-star`)
`[RM §4.18]`. Documentation.AI: **Lucide** names `[DAI §9, §10, §12]`.

| Source icon | Action |
|---|---|
| Emoji on a `Callout` | **DROP** — the target draws its own from `kind` `[DAI §4]` |
| Emoji elsewhere | **DROP** unless a Lucide equivalent is confirmed |
| `fa-*` class | **TRANSFORM** to a Lucide name — `NEEDS VERIFICATION` per icon; no mapping table exists in either reference |
| unresolved | **DROP** — every `icon` prop on the target is optional |
| `iconColor` (any component) | **DROP** — no target equivalent `[DAI §4, §9–12]` |

### T5 — Dimensions

| Source value | Example | Action |
|---|---|---|
| Percentage | `width="80%"`, `"80% "` (~1,050 uses) | **DROP** — target `width` is **pixels** `[DAI §16]` |
| `"smart"` | 275 uses | **DROP** — a legacy RDMD `sizing` value, not a CSS length `[RM §10.2, §12 gotcha 5]` |
| `"auto"` | — | **DROP** — not a number |
| Integer or `"600px"` | `width="600"` | **DROP for external images** (§4.2); keep only when the real pixel size is known |
| On `Video` / `Iframe` | `width="100%"`, `height="370px"` | **KEEP** — these accept CSS sizes `[DAI §17, §18]` |

Note the asymmetry: percentages are invalid on `Image` and fine on `Video`/`Iframe`.

### T6 — Link protocols

`[RM §4.4 getHref]` → site-relative paths. **Preserve hash fragments.**

```
doc:slug        → <migrated path for slug>
ref:slug        → <migrated path for endpoint slug>
changelog:slug  → <migrated path>   (legacy alias: blog:slug)
page:slug       → <migrated path>
https://<source-host>/docs/slug     → <migrated path>   ← Capillary writes these, 361 times
```

Resolving requires the **whole** slug set, so this transform runs after every page is known.
Verify each rewritten link lands on the *same* page `[PIT Phase 4]`.

### T7 — Text hygiene

| Input | Action | Citation |
|---|---|---|
| Trailing space in a value (`width="80% "`) | Trim | `[RM §10.2, §12 gotcha 4]` |
| `<br>` unclosed | → `<br />` | `[RM §12 gotcha 2]` |
| `\<br>` escaped | → `<br>` in cells, strip elsewhere | `[RM §12 gotcha 1]` |
| Trailing `\` hard break in a table cell | → `<br>` | `[RM §4.3]` `[TBL trap 4]` |
| Bare `{{token}}` in prose or a cell | Escape `\{\{…}}` or wrap in backticks | `[RM §12 gotcha 15]` `[PIT Phase 5]` |
| Tag-shaped placeholder (`<String>`) | Backticks or `\<` | `[RM §11.1]` `[PIT Phase 5]` |
| String `style="…"` | → `style={{…}}`, or drop | `[RM §2]` `[PIT Phase 5, 6]` |
| `class=` | → `className=` | `[PIT Phase 5]` |

---

## 3. Order of operations

Per node, in this order. Reordering breaks things — the numbered notes say how.

1. **Resolve the target component** (plan §1–§4).
2. **Resolve composite values first** — T3 needs both `theme` *and* `icon` before either is
   dropped. Dropping the emoji first loses the fallback for the 13 corpus callouts that set
   `icon` with no `theme` `[RM §10.3]`.
3. **Rename / transform surviving props** (T1, T2, T4, T5, T7).
4. **Drop the DROP set.**
5. **Validate required-on-target props** (§5). Missing → BLOCK, do not emit a placeholder.
6. **Restructure containers** — group runs (`Accordion`→`ExpandableGroup`, fence runs→`CodeGroup`),
   derive `cols`, convert each `<Column>` to a `<Card>`. After per-node work, because it needs
   the converted siblings. **Never emit a `<div>`** — no raw HTML (plan §2.3).
7. **Rewrite links** (T6). Last, because it needs the global slug map.

---

## 4. Per-component prop matrices

### 4.1 Callout → Callout `[RM §4.1]` → `[DAI §4]`

| ReadMe prop | Value | Action | Target | Note |
|---|---|---|---|---|
| `theme` | `default` `info` `warn` `warning` `ok` `okay` `success` `err` `error` | TRANSFORM T3 | `kind` | Wins over `icon` |
| `icon` | emoji | TRANSFORM T3 → then DROP | `kind` | Only consulted when `theme` is absent |
| `icon` | `fa-*` | T4 | `icon` | Lucide name or drop |
| `empty` | boolean | DROP | — | Internal to ReadMe |
| `attributes` | object | DROP | — | Internal; spread onto the `<blockquote>` |
| *first child* | nodes | **RESTRUCTURE** | first body line, bold | ReadMe's heading slot; the target has no `title` prop. **Never drop** `[PIT Phase 2]` |
| *remaining children* | nodes | KEEP | children | |
| — | — | never emit | `collapsed`, `color`, `kind="custom"`, `kind="tip"` | Target-only; no source signal `[DAI §4]` |

### 4.2 Image → Image `[RM §4.2]` → `[DAI §16]`

| ReadMe prop | Corpus count | Action | Target | Note |
|---|---:|---|---|---|
| `src` | 3,060 | KEEP | `src` | Required both sides |
| `alt` | 241 | KEEP | `alt` | **Required on target.** Absent → fall back to `caption`, then context. Never ship empty |
| `caption` | 94 | KEEP | `caption` | Falls back to `alt` on the target |
| `width` | 1,620 | DROP (T5) | — | Percentages/`smart` invalid; no dimensions on external images |
| `height` | 0 | DROP | — | Never used in the corpus |
| `border` | 2,921 | DROP | — | No target prop |
| `className="border"` | 2,468 | DROP | — | Redundant legacy RDMD marker even on ReadMe `[RM §12 gotcha 3]` |
| `align` | 2,781 | DROP | — | No target prop |
| `framed` | 1 | DROP | — | |
| `wrap`, `lazy`, `sizing`, `style` | — | DROP | — | |
| `title` | 35 | DROP | — | Usually the original filename |
| `className="emoji"` | — | **special case** | inline `<img>` | ReadMe renders these bare, with no lightbox `[RM §4.2]` — keep inline, do not promote to a block `<Image>` |
| *children* | — | TRANSFORM | `caption` | Children win over `caption` on ReadMe |
| — | — | never emit | `priority`, `sizes`, `style`, `fetchPriority`, `width`, `height` | Target-only `[DAI §16]` |

**Net result:** `src` + `alt` (+ `caption`). Everything else goes.

### 4.3 Anchor → markdown link `[RM §4.4]`

| ReadMe prop | Corpus count | Action | Target |
|---|---:|---|---|
| `href` | 361 | TRANSFORM T6 | the link target |
| `label` | 318 | DROP | — (component never reads it; duplicates the link text) |
| `target="_blank"` | 361 | DROP for internal, KEEP for external | — |
| `title` | — | KEEP if a tooltip is wanted | `[text](url "title")` |
| `download` | — | BLOCK | `NEEDS VERIFICATION` — no documented equivalent |
| *children* | — | KEEP | link text |

### 4.4 Code fence `[RM §4.8]` → `[DAI §5]`

| ReadMe | Action | Target |
|---|---|---|
| `lang` (infostring word 1) | KEEP | language identifier |
| `meta` (free text after the language) | RENAME | `title="…"` |
| Title with no language (` ```Zed `) | DERIVE | ` ```text title="Zed" ` |
| `curl` | KEEP | Aliased to `bash` natively `[DAI §5]` — no rewrite needed |
| `copyButtons`, `theme`, `value` | DROP | Runtime/context props, not authored |
| — | never emit | `show-lines`, `highlight`, `focus`, `wrap` — target-only |

### 4.5 CodeTabs → CodeGroup `[RM §4.9]` → `[DAI §6]`

`CodeTabs` has **no props and no tag** — it is a run of adjacent fences.

| Source signal | Action | Target |
|---|---|---|
| Adjacent fences, **no blank line** | DERIVE | one `<CodeGroup>` |
| Blank line between fences | **not a group** | separate blocks — ReadMe's documented opt-out |
| Each fence's `meta` | DERIVE | `tabs="A,B"` — keep the title on the fence too |
| Fence with no title | DERIVE | uppercased language, or `Text` |
| Run of one | DERIVE | plain fence, not a group |
| Run of one `mermaid` | DERIVE | bare mermaid fence (ReadMe renders it without tab chrome) |
| Labels like `200 OK` | TRANSFORM | `"200 - OK"` + `dropdown="true"` for status grouping `[DAI §6]` |

### 4.6 Tabs / Tab → Tabs / Tab `[RM §4.10]` → `[DAI §10]`

| ReadMe prop | Action | Target | Note |
|---|---|---|---|
| `Tab title` | KEEP | `title` | Required both sides |
| `Tab icon` | T4 | `icon` | Lucide |
| `Tab iconColor` | DROP | — | |
| `Tabs` (no props) | — | — | Children only, both sides |

### 4.7 Accordion → Expandable `[RM §4.11]` → `[DAI §11]`

| ReadMe prop | Action | Target | Note |
|---|---|---|---|
| `title` (required) | KEEP | `title` | Optional on target; defaults to `"Click to expand"` |
| `icon`, `iconColor` | DROP | — | No equivalent on `Expandable` |
| — | DERIVE | `default-open="false"` | Matches ReadMe: the built-in Accordion **cannot start open** `[RM §12 gotcha 13]` |
| raw `<details open>` | DERIVE | `default-open="true"` | The reason authors bypassed Accordion |
| *adjacent siblings* | RESTRUCTURE | one `<ExpandableGroup>` | ReadMe has no group wrapper; a run of one stays bare |

### 4.8 Cards / Card → Columns / Card `[RM §4.12]` → `[DAI §12, §13]`

| ReadMe prop | Action | Target | Note |
|---|---|---|---|
| `Cards columns={n}` | RENAME | `Columns cols="n"` | Range 1–5; ReadMe's default is `auto-fit` → derive from child count |
| `Cards cardWidth` | DROP | — | |
| `Card title` | KEEP | `title` | **Required on target** |
| `Card href` | KEEP | `href` | **Required on target, optional on source** → BLOCK when absent |
| `Card icon` | T4 | `icon` | |
| `Card iconColor`, `badge`, `kind` | DROP | — | |
| `Card target` | KEEP | `target` | Default `_self` both sides |
| `Card` children | KEEP | children | **Required on target** → BLOCK when absent |
| — | never emit | `image`, `cta`, `horizontal` | Target-only |

### 4.9 Columns / Column → Columns / `<div>` `[RM §4.13]` → `[DAI §13]`

| ReadMe | Action | Target | Note |
|---|---|---|---|
| child count | DERIVE | `cols="n"` | ReadMe has **no `cols` prop** — the count is implicit |
| `layout="fixed"` / `"1fr"` | DROP | — | Equal widths is what `cols` already gives |
| `layout="auto"` | DROP | — | Content-sized columns have **no equivalent**; layout becomes uniform |
| `<Column>` (no props) | TRANSFORM | `<div>` | Required wrapper for non-Card content |
| `<Card>` children | KEEP | bare inside `<Columns>` | Cards need no `<div>` |

### 4.10 Embed → Video / Iframe `[RM §4.6]` → `[DAI §17, §18]`

Route first: YouTube / Vimeo / Loom → `Video`; everything else → `Iframe`.

| ReadMe prop | Action | Target | Note |
|---|---|---|---|
| `url` | RENAME | `src` | Required; `Video` returns `null` without it `[DAI §17]` |
| `href` | DROP | — | Duplicates `url` in 9/9 corpus uses |
| `title` | KEEP | `title` | Literal `"@embed"` means "no title" → drop |
| `typeOfEmbed` | routing only | — | Not a target prop |
| `iframe` | routing only | — | |
| `html` | DROP | — | oEmbed markup; literal `"false"` already means absent |
| `width` (default `100%`) | KEEP | `width` | CSS sizes fine here (T5) |
| `height` (default `480px`) | KEEP | `height` | |
| `image` | conditional | `poster` | **`render-type="video"` only** `[DAI §17]`; else `NEEDS VERIFICATION` |
| `provider`, `providerName`, `providerUrl`, `favicon` | DROP | — | Link-card layout has no equivalent |
| `lazy` | DROP | — | `loading="lazy"` is already the `Iframe` default |

### 4.11 Table `[RM §4.3]` → pipe table `[DAI §3]`

| ReadMe | Action | Target |
|---|---|---|
| `align={["left",null,"center"]}` | TRANSFORM | delimiter row: `:---` / `---` / `:---:` / `---:` |
| `<thead>` / `<tbody>` / `<tr>` | TRANSFORM | header row + delimiter + body rows |
| `<th>` / `<td>` | TRANSFORM | cells |
| cell `style={{textAlign}}` | DROP | — (per-cell styling is impossible in GFM) |
| `colspan` / `rowspan` | **BLOCK** | Keep raw `<table>` — GFM cannot merge cells |
| cell with block content | **BLOCK or flatten** | `<br>`-separated `•` items / inline code; else raw `<table>` |

`null` is a legal `align` entry meaning "no explicit alignment" — do not coerce it to left
`[RM §10.5]`.

### 4.12 No-equivalent components

| ReadMe | Props | Strategy |
|---|---|---|
| `Glossary` | `term`, children | Unwrap to the term text — mirrors ReadMe's own fail-soft behaviour `[RM §4.5]` |
| `HTMLBlock` | `html`, `runScripts`, `safeMode` | Split by content: `<iframe>`→`Iframe`, layout→`Columns`+`Card`, `<style>`→site CSS, `<script>`→drop (plan §4.3) |
| `Recipe` / `TutorialTile` | `slug`, `title`, `id`, `link`, `emoji`, `backgroundColor` | **BLOCK** — content lives in ReadMe's dashboard, not the `.md` `[RM §4.14]` |
| `PostmanRunButton` | `collectionId`, `collectionUrl`, `visibility`, `action` | `<Card href>` or a link |
| `MCPIntro` | none | DROP — generated furniture |
| `Variable` | `<<name>>`, `{user.name}` | Substitute a literal or drop; `{user.name}` is also an MDX-expression hazard |

---

## 5. Required-on-target gaps

The short list of places where the target demands more than the source provides. These are the
**only** BLOCK cases in normal content, and each needs a human or a documented default.

| Target | Required prop | Source status | Resolution |
|---|---|---|---|
| `Image` | `alt` `[DAI §16]` | Optional; set on only 241 of 3,060 corpus images `[RM §10.2]` | `caption` → surrounding context → **queue for a human**. Never ship empty |
| `Card` | `href` `[DAI §12]` | Optional `[RM §4.12]` | Queue. **Do not invent a destination** |
| `Card` | children `[DAI §12]` | Optional | Use the source body; queue if there is none |
| `Tab` | `title` `[DAI §10]` | Required on source too | No gap |
| `Video` / `Iframe` | `src` `[DAI §17, §18]` | `url` required on source | No gap |
| `Update` | `label`, `description` `[DAI §19]` | No source component | Only for hand-authored changelogs |
| `ParamField` | one of `path`/`query`/`header`/`body` `[DAI §14]` | Source is a table cell | Derive from the table's location column; queue if ambiguous |

---

## 6. Never auto-emit

Target props with no source signal. Emitting a guessed value is inventing content
`[PIT Phase 2]`.

`Callout`: `kind="tip"`, `kind="custom"`, `collapsed`, `color` · `Card`: `image`, `cta`,
`horizontal` · `Image`: `width`, `height`, `priority`, `sizes`, `fetchPriority` · fences:
`show-lines`, `highlight`, `focus`, `wrap` · `Step`: `icon`, `title-type` (changes the TOC) ·
`Video`: `autoplay`, `loop`, `muted`, `poster` · `Iframe`: `display-mode="auto-resize"`,
`scripts`, `sandbox` · `ParamField`: `examples-b64`, `enum` (unless the source lists values
verbatim) · `Board`, `Update`, `CollectionList`, `CollectionContent`, `BodyParams`, `AuthParams`
— no ReadMe source component exists for any of them.

---

## 7. Machine-readable form

Drop-in shape for the converter. Mirrors §4; keep the two in sync.

```ts
type Action = "keep" | "rename" | "transform" | "derive" | "drop" | "block";

type PropRule = {
  action: Action;
  /** Target attribute name. Omitted for drop/block. */
  to?: string;
  /** Named transform from §2. */
  transform?: "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7";
  note?: string;
};

export const PROP_MAP: Record<string, {
  target: string | null;
  props: Record<string, PropRule>;
  /** Props the target requires; missing ones are blocked, never faked. */
  required?: string[];
  /** Emitted from structure, not from a source prop. */
  derived?: Record<string, string>;
}> = {
  Callout: {
    target: "Callout",
    props: {
      theme: { action: "transform", to: "kind", transform: "T3" },
      icon: { action: "transform", to: "kind", transform: "T3", note: "consulted only when theme is absent, then dropped" },
      empty: { action: "drop" },
      attributes: { action: "drop" },
    },
    derived: { kind: "T3(theme, icon) — default 'info'" },
  },

  Image: {
    target: "Image",
    props: {
      src: { action: "keep", to: "src" },
      alt: { action: "keep", to: "alt" },
      caption: { action: "keep", to: "caption" },
      width: { action: "drop", note: "T5 — percentages and 'smart' are invalid; none on external images" },
      height: { action: "drop" },
      border: { action: "drop" },
      className: { action: "drop", note: "'emoji' is a special case: keep the img inline" },
      align: { action: "drop" },
      framed: { action: "drop" },
      wrap: { action: "drop" },
      lazy: { action: "drop" },
      title: { action: "drop" },
      sizing: { action: "drop" },
      style: { action: "drop" },
    },
    required: ["src", "alt"],
  },

  Anchor: {
    target: null, // markdown link
    props: {
      href: { action: "transform", to: "url", transform: "T6" },
      label: { action: "drop" },
      target: { action: "drop", note: "keep only for external links" },
      title: { action: "keep", to: "title" },
      download: { action: "block", note: "NEEDS VERIFICATION" },
    },
  },

  Accordion: {
    target: "Expandable",
    props: {
      title: { action: "keep", to: "title" },
      icon: { action: "drop" },
      iconColor: { action: "drop" },
    },
    derived: { "default-open": '"false"', wrapper: "ExpandableGroup for adjacent runs of 2+" },
  },

  Cards: {
    target: "Columns",
    props: {
      columns: { action: "rename", to: "cols", note: "clamp 1..5; default: child count" },
      cardWidth: { action: "drop" },
    },
  },

  Card: {
    target: "Card",
    props: {
      title: { action: "keep", to: "title" },
      href: { action: "keep", to: "href" },
      icon: { action: "transform", to: "icon", transform: "T4" },
      iconColor: { action: "drop" },
      badge: { action: "drop" },
      kind: { action: "drop" },
      target: { action: "keep", to: "target" },
    },
    required: ["title", "href", "children"],
  },

  Columns: {
    target: "Columns",
    props: { layout: { action: "drop", note: "'auto' has no equivalent; layout becomes uniform" } },
    derived: { cols: "child count, clamped 1..5" },
  },

  Column: { target: "div", props: {} },

  Embed: {
    target: "Video|Iframe",
    props: {
      url: { action: "rename", to: "src" },
      href: { action: "drop" },
      title: { action: "keep", to: "title", note: 'drop the literal "@embed"' },
      typeOfEmbed: { action: "drop", note: "routing signal only" },
      iframe: { action: "drop", note: "routing signal only" },
      html: { action: "drop" },
      width: { action: "keep", to: "width" },
      height: { action: "keep", to: "height" },
      image: { action: "transform", to: "poster", note: 'render-type="video" only' },
      provider: { action: "drop" },
      providerName: { action: "drop" },
      providerUrl: { action: "drop" },
      favicon: { action: "drop" },
      lazy: { action: "drop" },
    },
    required: ["src"],
  },

  Tab: {
    target: "Tab",
    props: {
      title: { action: "keep", to: "title" },
      icon: { action: "transform", to: "icon", transform: "T4" },
      iconColor: { action: "drop" },
    },
    required: ["title"],
  },

  Table: {
    target: null, // pipe table
    props: { align: { action: "transform", to: "delimiterRow", note: "left/center/right/null" } },
  },

  Glossary: { target: null, props: { term: { action: "drop", note: "unwrap to the term text" } } },
  HTMLBlock: { target: null, props: { html: { action: "block" }, runScripts: { action: "drop" }, safeMode: { action: "drop" } } },
  Recipe: { target: null, props: { slug: { action: "block", note: "content is not in the .md" } } },
  TutorialTile: { target: null, props: { slug: { action: "block" } } },
  PostmanRunButton: { target: "Card", props: { collectionUrl: { action: "rename", to: "href" }, collectionId: { action: "drop" }, visibility: { action: "drop" }, action: { action: "drop" } } },
  MCPIntro: { target: null, props: {} },
  Variable: { target: null, props: { name: { action: "block", note: "substitute a literal or drop" } } },
};
```

---

## 8. Self-check before emitting a node

1. Every source prop appears in the matrix with one of the six actions — **no prop silently
   ignored**.
2. Every `required` target prop has a real value — no empty `alt`, no placeholder `href`.
3. Composite values (T3) resolved **before** their inputs were dropped.
4. Booleans emitted as strings (T2).
5. No prop from §6 emitted.
6. Blocks recorded as `slug#index` with the component name.
7. Block-level JSX on one line; `className` not `class` `[PIT Phase 5]`.
