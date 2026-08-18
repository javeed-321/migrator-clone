# Table conversion plan — ReadMe → Documentation.AI pipe tables

Steps for turning every ReadMe table into a GFM pipe table (`| … | … |`). No code — a procedure,
the decisions inside it, and the failure each step prevents.

**Verified against the platform's own source**, not inferred. Citations:

| Citation | Source |
|---|---|
| `[APP <file>:<line>]` | `~/Documents/DocumentationAI/documentation-ai-app` — the Documentation.AI renderer itself |
| `[CORPUS]` | Measured across the 1,020 pages in `output/capillary/raw/` |
| `[RM §n]` | `readme-components-info.md` |
| `[DAI §n]` | `documentationai-components-information.md` |
| `[PIT Phase n]` | `migration-pitfalls.md` |
| `[TBL]` | `table-spacing-information.md` |

Where the platform source contradicts a reference file, **the source wins**. §3 records the one
place that happens.

---

## 1. What we are actually converting

**[CORPUS]**:

| Source form | Count | Pages |
|---|---:|---:|
| GFM pipe table | 1,471 | 369 |
| `<Table>` JSX | 375 | 186 |
| Raw `<table>` HTML | 7 | 1 |
| `[block:parameters]` / `[block:table]` legacy | 0 | 0 |

Three inbound forms, one outbound form. Two facts shape everything:

- **Most tables are already pipe tables.** 1,471 of 1,853 need *normalising*, not restructuring.
  Do not rebuild what is already correct — touch only what a rule below names.
- **`<Table>` JSX is a warning label.** ReadMe emits it *specifically* when a cell holds content
  GFM cannot represent — `blockquote`, `code`, `heading`, `html`, `list`, `table`,
  `thematicBreak` `[RM §4.3]`. Each of those 375 is a place a naive conversion loses something.

### You never write `<Table>` on the target

The platform maps the markdown `table` element to its own `Table` component
`[APP MDXRemoteServer.tsx:100]`, which wraps it in a horizontally scrollable container
`[APP Table.tsx:3-9]`:

```tsx
<div data-component="Table" className="table-container w-full max-w-full overflow-x-auto">
  <table>{children}</table>
</div>
```

So a plain pipe table gets the styling, the scroll container and the `data-component` hook for
free. Writing `<Table>` by hand is never necessary and never correct.

---

## 2. How the platform actually renders a cell

Four mechanical facts from the source. Everything in this plan follows from them.

**1. Raw HTML is not raw — it is JSX.** The MDX pipeline is `remarkGfm` plus three rehype
plugins, and **`rehypeRaw` is not among them** `[APP MDXRemoteServer.tsx:123-127]`:

```ts
remarkPlugins: [remarkGfm],
rehypePlugins: [rehypeMdxCodeProps, rehypeMermaid, rehypeSlug],
```

Consequence: every HTML-looking tag is parsed as JSX. `<br />` is a valid intrinsic element.
**`<br>` unclosed is an MDX parse error** — it fails the build, it does not degrade.
**[CORPUS] 95 unclosed `<br>`** exist in the source and every one is a build failure if carried
across.

**2. Cells do not preserve whitespace.** Table cells carry no `white-space` override
`[APP editor.css:150-157]` — the only `pre-wrap` in the codebase is a print rule for code blocks
`[APP globals.css:115]`. So cells render at `white-space: normal`, and CSS collapses runs of
ASCII space, tab, newline and CR into one space.

**3. Cells wrap on their own.** `max-width: 250px; word-break: break-word; overflow-wrap:
break-word` `[APP editor.css:150-157]`. Long cell content wraps without help — **a manual line
break is never needed for wrapping.**

**4. Alignment comes from an attribute, not CSS classes.** `remark-gfm` turns the delimiter row
into `align` attributes, and the stylesheet reads them: `td[align='center']`, `td[align='right']`
`[APP editor.css:159-168]`. Left is already the default `[APP editor.css:133-138]`.

---

## 3. Spacing: what survives, and what silently does not

This is the section the whole conversion hinges on.

CSS white-space collapsing applies to exactly four characters: **space (U+0020), tab (U+0009),
newline (U+000A), carriage return (U+000D)**. Every other space-like character is *content* and is
never collapsed. Combined with fact 2 above:

| Character | Code point | In a cell | Verdict |
|---|---|---|---|
| ASCII space | U+0020 | **Collapsed** to one space; leading/trailing stripped by GFM too `[TBL]` | ❌ Useless for indentation |
| Tab | U+0009 | **Collapsed** | ❌ Never use — **[CORPUS]** 1 case to fix |
| Newline | U+000A | **Collapsed** to a space; also breaks the row in pipe syntax | ❌ Never |
| `&#xA;` / `&#10;` entity | U+000A | Decodes to a newline → **collapsed to a space** | ❌ **Does not produce a line break** |
| **Em space** | **U+2003** | Not a CSS white-space char → **renders at full width** | ✅ **Use this** |
| En space | U+2002 | Renders, half the width | ⚠️ Works, but pick one scheme |
| No-break space | U+00A0 | Renders, but the hosted visual editor often collapses or disallows it `[TBL]` | ⚠️ Avoid |
| `&nbsp;` entity | U+00A0 | Same as above | ⚠️ Avoid |
| Bullet glyphs | U+2022 `•` · U+25E6 `◦` · U+25AA `▪` | Content | ✅ Depth markers |

> ⚠️ **This corrects `[TBL trap 4]`.** That file offers `<br>` **or** `&#xA;` / `&#10;` for an
> in-cell line break. On this platform `&#xA;` decodes to a newline and the cell's
> `white-space: normal` collapses it to a single space `[APP editor.css:150-157]` — so it renders
> as a space, not a break. It is not an alternative to `<br>`; it does nothing.

### The rule for this migration

- **No `<br>` in tables.** Not `<br>`, not `<br/>`, not `<br />`. **[CORPUS] 922 in-table `<br>`s
  must go** — 660 inside 337 GFM rows, 262 inside 37 JSX tables. (The project rule allows `<br>`
  nowhere in the output; this plan supersedes the earlier "keep it in cells" guidance.)
- **Indentation is em-space (U+2003) only**, in the **first column only** `[TBL rule 6]`.
- **[CORPUS]** the source currently has **zero** em-spaces in table rows and **1** NBSP — so
  indentation is something this migration *adds*, not something it preserves.

### Levels: the depth scheme

Encode depth as **glyph + 2 em-spaces per level**, first cell only (`⎵` = U+2003):

| Depth | First cell | Renders as |
|---|---|---|
| 0 | `` `customerId` `` | `customerId` |
| 1 | `` ⎵⎵• `email` `` | ␣␣• email |
| 2 | `` ⎵⎵⎵⎵◦ `domain` `` | ␣␣␣␣◦ domain |
| 3 | `` ⎵⎵⎵⎵⎵⎵▪ `tld` `` | ␣␣␣␣␣␣▪ tld |

Map the source marker to a depth number first `[TBL]`:

| Source first-cell marker | Depth | **[CORPUS]** |
|---|---:|---:|
| plain name | 0 | most |
| `* name` / `- name` | 1 | 58 rows have a bullet-style first cell |
| `-- name` / `\-- name` | 2 | |
| stair-step dots (`.name`, `..name`) | by dot count | |
| leading `&nbsp;` or ASCII spaces | count them | |

Three constraints:

1. **Only the first column.** Indent characters in any other column are content corruption
   `[TBL rule 6]`.
2. **Strip ASCII only** when cleaning cells — `.strip(" \t\r\n")`, never a bare `.strip()`, which
   deletes the em-spaces you just added `[TBL traps 1, 3]` `[PIT Phase 8]`.
3. **Glyph then spaces then name**, consistently — the glyph is what makes depth legible when two
   levels sit adjacent.

---

## 4. The procedure, per table

### Step 1 — Locate and classify

Label every table `GFM` / `JSX` / `RAW-HTML` and record `slug#tableIndex`, so every later decision
and defect is addressable.

*Prevents:* a table no pass claimed.

### Step 2 — Extract the structure, never the appearance

Read the table into a grid: header cells, then body rows.

- `JSX`: `thead` → `tr` → `th`, then `tbody` → `tr` → `td`.
- `GFM`: the line above the delimiter row is the header; lines below, while they start with `|`,
  are body rows. Split on **unescaped** `|` only.
- `RAW-HTML`: as JSX, plus §7.4 for merged cells.

**Reconstruct structurally, never by visual position** `[PIT Phase 3]`. Rejoin any value the
source wrapped across lines *before* building the row `[PIT Phase 3]`.

*Prevents:* a column spliced into another column's sentence; one logical row split in two.

### Step 3 — Resolve the header

| Case | **[CORPUS]** | Action |
|---|---:|---|
| Header has content | most | Use it |
| **Header row entirely empty** (`\|  \|  \|  \|`) | **26** | See below |

From `docs/org-entities.md`:

```
|          |                                         |            |
| -------- | --------------------------------------- | ---------- |
| **Code** | **Currency Name**                       | **Symbol** |
| ALL      | Albanian lek                            | L          |
```

The real header is the first body row, bolded. **Promote it and strip the bold** — the renderer
already styles header cells at `font-weight: 600` `[APP editor.css:133-138]`.

**Rule:** empty header **and** an all-bold first body row → promote it. Empty header and a
*non-bold* first row → **stop and ask**; promote-vs-synthesise is the user's call `[PIT Phase 3]`.

*Prevents:* a lost header; a data row rendered as the header.

### Step 4 — Build the delimiter row

From `<Table align={…}>` `[RM §4.3]` — **[CORPUS]** 344 tables carry an `align` array:

| `align` entry | Delimiter | Note |
|---|---|---|
| `"left"` | `:---` | Cosmetic — left is the default `[APP editor.css:133-138]` |
| `"center"` | `:---:` | Emits `align="center"`, which the CSS reads `[APP editor.css:159-168]` |
| `"right"` | `---:` | Emits `align="right"` |
| `null` | `---` | Legal; means "no explicit alignment" `[RM §10.5]` — do not coerce to left |

Then **drop `style={{ textAlign: … }}` from every cell** — **[CORPUS]** 12 tables carry it. A pipe
table cannot express per-cell styling, and the value duplicates `align` anyway.

### Step 5 — Flatten each cell to one line

`<Table>` indents cell content across several lines; that indentation is formatting, not content.

- Collapse all internal newlines to **one space**. Not `<br>` — §3.
- Where the break carried meaning (a list of values, two distinct statements), go to §7.1/§7.2 —
  the answer is a separator glyph or a new row, never a `<br>`.
- Strip **ASCII** whitespace only (`" \t\r\n"`) `[TBL trap 1]`.
- Replace any literal **tab** with a space — **[CORPUS]** 1 case, in
  `docs/troubleshooting-guide-connectplus.md`.

*Prevents:* a newline breaking the row; em-space indentation destroyed by an over-broad trim.

### Step 6 — Normalise inline content

Per §5 below. The escaping rules are the ones that break builds; they are not optional.

### Step 7 — Encode depth

Apply the §3 level scheme to the first column. **[CORPUS]** 58 rows need it.

### Step 8 — Route what a pipe table cannot hold

Per §7. Never improvise — each case has a recorded default.

### Step 9 — Assemble and check parity

Emit header, delimiter, body. Then:

- **Cell count per row === header cell count.** **[CORPUS]** 17 rows currently differ — each is
  a ragged source row or an unescaped `|`. A short row jams cells together and shifts the rest
  `[PIT Phase 3]`.
- **Row count out === row count in.**
- **Every cell's text present**, matched by content `[PIT Phase 8]`.
- **No `<br>` anywhere in the table.**
- No literal newline in a row; no unescaped `|` in a cell.

---

## 5. Cell content: what each construct becomes

| Inside a cell | **[CORPUS]** | Becomes | Why |
|---|---:|---|---|
| Plain text | — | verbatim | Never truncate, reorder, tidy or invent `[PIT Phase 2]` |
| `<br>` / `<br/>` / `<br />` | 922 in tables | **REMOVE** — one space, a `•` separator, or a new row (§7.1–7.2) | Project rule; and 95 unclosed ones are outright build failures `[APP MDXRemoteServer.tsx:123-127]` |
| `&#xA;` / `&#10;` | 0 | never introduce | Collapses to a space — it is not a line break (§3) |
| Trailing `\` (ReadMe hard break) | — | one space, or a new row | ReadMe's in-cell break `[RM §4.3]` has no target equivalent |
| Indentation | 0 em-space today | em-space U+2003 + glyph, first column only | The only thing that survives (§3) |
| `<Anchor href=…>text</Anchor>` | 7 tables | `[text](path)` | Link protocols per the prop strategy T6 |
| `<Glossary>Term</Glossary>` | 39 tables | `Term` | No target equivalent; matches ReadMe's own fail-soft `[RM §4.5]` |
| Escaped `\_` / `\*` | 148 tables | **keep the backslash**, or wrap in backticks | `ERR\_LOYALTY\_BILL\_AMOUNT\_NEGATIVE` unescaped becomes emphasis; `\*` must stay literal `[TBL rule 5]` |
| `\|` in content | — | keep escaped | An unescaped pipe ends the cell `[RM §4.3]` |
| `{{orgId}}` / `{token}` | — | `` `{{orgId}}` `` | Bare braces evaluate as JS. The platform's preprocessor rewrites some brace forms to entities `[APP mdx-preprocessor.ts:245-340]`, but do not rely on it — backtick them `[PIT Phase 5]` |
| Tag-shaped text (`<String>`) | — | backticks or `\<` | Parses as an unknown JSX component `[RM §11.1]` |
| `<code>` / backticks | — | inline code | |
| `<b>` / `<i>` / `<strong>` | — | `**` / `*` | No raw HTML in the output |
| `<span style={{…}}>` | — | plain text | Inline styles do not survive the editor `[PIT Phase 6]` |
| Literal tab | 1 table | one space | Collapsed anyway (§3) |
| Multiple paragraphs | 375 JSX tables | §7.1 | |
| `<ul>` / `<li>` | 1 table | §7.2 | GFM cells cannot hold a list `[RM §4.3]` |
| Fenced code block | — | §7.3 | |
| Heading | — | bold text | A heading in a cell is emphasis, not structure |
| `<Image>` / `![]()` | — | `[caption](url)` link, or lift out | An image in a cell wrecks row height |

---

## 6. Order matters

1. **Structure** (Steps 1–4) — you cannot escape content correctly until you know its cell.
2. **Flatten** (Step 5) before inline normalisation.
3. **Escape** (Step 6) last *within* the cell — escaping before flattening double-escapes.
4. **Encode depth** (Step 7) after escaping, so no later trim eats the em-spaces `[TBL trap 3]`.
5. **Parity check** (Step 9) after everything.

---

## 7. The five hard cases — now that `<br>` is unavailable

### 7.1 A cell with multiple values or paragraphs

Ranked:

1. **One line, separated by `•`** — best when the values are short:
   `• Cannot be enabled after unrolling • Not available in line-item promotions`
2. **Split into multiple rows**, repeating the other columns — best for parameter tables, and the
   only option that keeps each value independently addressable.
3. **Lift out of the table** into prose beneath it, leaving a short reference in the cell — for
   genuinely long content. This is a content edit, so it needs a human.

Do **not** join with a space and hope: two sentences run together read as one
`[PIT Phase 2]`. Remember cells wrap by themselves at 250px `[APP editor.css:150-157]`, so
readability is not the reason to break a line — only meaning is.

### 7.2 A cell containing a list

**[CORPUS]** 1 case, `docs/actions.md`:

```html
<ul>
  <li>Payment method unrolling cannot be enabled after unrolling line items.</li>
  <li>Payment mode unrolling is not available in line-item-based promotions.</li>
</ul>
```

**Default:** `• Payment method unrolling cannot be enabled after unrolling line items. • Payment mode unrolling is not available in line-item-based promotions.`

Use `•`, **not** `-`. A leading `- ` in a cell collides with the depth scheme in §3 and is
ambiguous with a delimiter row.

### 7.3 A cell containing a fenced code block

**Default:** inline code, if it is one short line.
**Escalate** for anything multi-line — a code sample belongs above or below the table. Never drop
the sample to make the table fit `[PIT Phase 2]`.

### 7.4 Merged cells (`rowspan` / `colspan`)

**[CORPUS]** 8 occurrences, all `rowspan="3"` in `docs/introduction-engagement-channels.md`, on a
raw `<table>` whose inline styles are malformed (`style=border-right: 1px solid black; …"`,
missing its opening quote) — tolerated only by ReadMe's lenient parser `[RM §11.3]`, and an
outright build failure on the target, where HTML is JSX
`[APP MDXRemoteServer.tsx:123-127]`.

A pipe table cannot merge cells, and there is no HTML fallback. Choose per table:

| Option | When |
|---|---|
| **Repeat the value** in each spanned row | Default. A `rowspan="3"` label like `Engage+` → three rows each carrying `Engage+` |
| **Split into several tables**, label as a heading above each | The merged cell is really a section title |
| **Heading + one small table per group** | Many groups |

**Default: repeat the value.** Every cell's content survives; only the visual merge is lost
`[PIT Phase 2]`. Never silently drop a spanned cell — that is how meaning disappears while the
row count still balances.

### 7.5 A table used as layout, not data

**[CORPUS]** the raw `<table>` KPI/stat strip `[RM §11.3]`. Not tabular data → `<Columns>` +
`<Card>` `[DAI §12, §13]`, not a pipe table. Test: *do the columns have headers naming a field?*
If not, it is a layout.

---

## 8. Verification

Per table `[PIT Phase 8]`:

1. **Row count** in === out.
2. **Cell count** per row === header column count (17 rows flagged).
3. **Every cell's text present**, matched by **content, not position** — structural count *and*
   token comparison; neither alone suffices.
4. **First column never empty** where the source had a value — the documented defect is 40
   nameless parameter rows across 4 pages `[PIT Phase 2]`. Note a *legitimately* empty cell
   exists (`docs/org-entities.md` has a currency with no code), so compare against the source
   rather than asserting non-empty.
5. **Zero `<br>` in any table.** Grep the output.
6. **Zero unclosed `<br>` anywhere** — 95 in the source, each an MDX parse error.
7. **Em-spaces intact and in the first column only.** Count in Python with explicit charsets;
   `grep -P '\xc2\xa0'` returns 0 even when the character is present `[TBL trap 2]`.
8. **MDX-compiles with zero errors** `[PIT Phase 5]`.
9. **Check one nested-parameter table on the live preview** before trusting the scheme corpus-wide
   — the final render is the platform's `[TBL]`.
10. **Tables inside numbered steps are still tables**, not flattened prose `[PIT Phase 3]`.

---

## 9. Decisions to settle before a bulk run

| # | Decision | Scope |
|---|---|---|
| 1 | The 922 in-table `<br>`s: `•` separator or row-splitting as the default? | 337 GFM rows + 37 JSX tables |
| 2 | Empty header where the first body row is **not** bold: promote or synthesise? | Subset of 26 |
| 3 | `rowspan` in `docs/introduction-engagement-channels.md`: repeat, split, or nest? | 1 page, 8 cells |
| 4 | Escaped identifiers (`Bill\_number`): keep the backslash or wrap in backticks? | 148 tables |
| 5 | Depth glyphs: `• ◦ ▪` as specified, or names only? | 58 rows |

Record each answer once, in writing, before touching files — fixing a policy mid-run means
reworking every page twice `[PIT Phase 4]`.

---

## 10. Worked examples

### 10.1 `<Table>` JSX → pipe table

**Before** — `docs/troubleshooting-guide-connectplus.md` **[CORPUS]**:

```jsx
<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Problem
      </th>
      <th style={{ textAlign: "left" }}>
        Probable cause
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        631 ERR\_LOYALTY\_BILL\_AMOUNT\_NEGATIVE
      </td>
      <td style={{ textAlign: "left" }}>
        Transaction amount cannot be negative
      </td>
    </tr>
  </tbody>
</Table>
```

**After**:

```markdown
| Problem | Probable cause |
| :--- | :--- |
| 631 ERR\_LOYALTY\_BILL\_AMOUNT\_NEGATIVE | Transaction amount cannot be negative |
```

`align` → delimiter row · per-cell `textAlign` dropped · cell indentation collapsed · `\_`
escapes preserved · no `<Table>` tag on the target (§1).

### 10.2 A cell with `<br>` → separator or rows

**Before** **[CORPUS]** pattern, 337 rows like it:

```markdown
| Headers | Content-Type: application/json<br>X-CAP-API-AUTH-ORG-ID: 12345<br>Authorization: Basic |
```

**After, option A — `•` separators** (short values, keep one row):

```markdown
| Headers | • Content-Type: application/json • X-CAP-API-AUTH-ORG-ID: 12345 • Authorization: Basic |
```

**After, option B — one row per value** (preferred for parameter/header tables):

```markdown
| Header | Value |
| :--- | :--- |
| Content-Type | application/json |
| X-CAP-API-AUTH-ORG-ID | 12345 |
| Authorization | Basic |
```

Option B is better documentation: each header becomes independently linkable and searchable.
Option A is a mechanical transform that never needs a judgement call. Decision #1 in §9.

### 10.3 Empty header row → promoted header

**Before** — `docs/org-entities.md` **[CORPUS]**:

```markdown
|          |                                         |            |
| -------- | --------------------------------------- | ---------- |
| **Code** | **Currency Name**                       | **Symbol** |
| ALL      | Albanian lek                            | L          |
|          | Alderney pound                          | £          |
```

**After**:

```markdown
| Code | Currency Name | Symbol |
| --- | --- | --- |
| ALL | Albanian lek | L |
|  | Alderney pound | £ |
```

Bold stripped from the promoted header; the genuinely empty Alderney code cell **kept** — data,
not an artefact.

### 10.4 Merged cells → repeated value

**Before** — `docs/introduction-engagement-channels.md` **[CORPUS]**, simplified:

```html
<tr>
  <td rowspan="3" style=border-right: 1px solid black; text-align: center;"><b>Engage+</b></td>
  <td>SMS</td>
</tr>
<tr><td>Email</td></tr>
<tr><td>WhatsApp</td></tr>
```

**After**:

```markdown
| Product | Channel |
| :--- | :--- |
| **Engage+** | SMS |
| **Engage+** | Email |
| **Engage+** | WhatsApp |
```

Merge gone, every value survives, malformed inline style gone with the HTML.

### 10.5 Nested parameters → em-space depth

**Before** (ReadMe first-column bullets — **[CORPUS]** 58 rows):

```markdown
| Field | Type |
| --- | --- |
| `customer` | object |
| * `email` | string |
| ** `domain` | string |
```

**After** (⎵ = literal U+2003 em-space, two per level):

```markdown
| Field | Type |
| --- | --- |
| `customer` | object |
| ⎵⎵• `email` | string |
| ⎵⎵⎵⎵◦ `domain` | string |
```

ASCII spaces here would be collapsed by the renderer and stripped by GFM — the hierarchy would
render flat (§3).

---

## 11. One-page summary

1. Classify: GFM (1,471) / JSX (375) / raw HTML (7). Never emit `<Table>` — markdown `table` is
   already mapped to it `[APP MDXRemoteServer.tsx:100]`.
2. Extract the grid structurally, never by position.
3. Resolve the header — promote a bold first body row when the header is empty (26 cases).
4. Delimiter row from `align`; drop per-cell `textAlign` (12 tables).
5. Flatten each cell to one line; ASCII-only trimming.
6. **Remove all 922 in-table `<br>`s** — `•` separator, or split into rows. Never `&#xA;`.
7. **Indent with em-space U+2003 + glyph, first column only** (58 rows). Never ASCII spaces,
   never NBSP.
8. Normalise inline content: unwrap `<Anchor>`/`<Glossary>`, keep `\_` escapes, backtick `{{…}}`.
9. Route merged cells, lists, fences and layout-tables through §7 — never improvise.
10. Verify row/cell parity and content presence by content; grep the output for `<br>`; MDX-compile.
