# Components-Information

Reference material for converting **ReadMe** documentation into **Documentation.AI** MDX.

Four of these files describe the two platforms and what goes wrong between them. The fifth —
[`component-conversion-plan.md`](component-conversion-plan.md) — is derived from the other four
and is the one you act on.

## The files

| File | Lines | What it is | Read it when |
|---|---:|---|---|
| **[component-conversion-plan.md](component-conversion-plan.md)** | 1,372 | **The plan.** Every ReadMe construct → its Documentation.AI target, with source and target snippets, and what breaks if converted naively | Converting a page, or deciding *which* component to emit |
| **[prop-mapping-strategy.md](prop-mapping-strategy.md)** | 555 | **The prop spec.** Every attribute, with one of six actions (keep / rename / transform / derive / drop / block), the shared value transforms, the order they run in, and a machine-readable `PROP_MAP` | Writing converter code, or deciding what happens to *one attribute* |
| **[TableConversion.md](TableConversion.md)** | 556 | **Tables, end to end.** The 9-step procedure, verified against the platform renderer's own source: what whitespace survives a cell, why `<br>` and `&#xA;` are out, and how depth is encoded | Converting any table — 1,853 of them in the corpus |
| [readme-components-info.md](readme-components-info.md) | 1,546 | **Source format.** Every ReadMe component, its real attributes, and usage counts from a 1,376-file corpus | You need to know what a ReadMe attribute actually does |
| [documentationai-components-information.md](documentationai-components-information.md) | 1,264 | **Target format.** Every Documentation.AI component, attributes, defaults, required fields | You need the exact target syntax |
| [migration-pitfalls.md](migration-pitfalls.md) | 201 | **What goes wrong.** A failure catalogue turned into preventive rules, earned on real migrations | Before starting, and during review |
| [table-spacing-information.md](table-spacing-information.md) | 118 | **Table whitespace.** Why nested-parameter indentation disappears, and the one encoding that survives | Any table with nested parameters |

## Start here

1. Skim **migration-pitfalls.md** — it is short and it is the difference between a migration that
   loses content and one that does not.
2. Read the section of **component-conversion-plan.md** covering the components on your page.
3. For each attribute, look it up in **prop-mapping-strategy.md** §4 — every source prop gets
   exactly one of six actions, so nothing is left to judgement.
4. Follow the **35-step checklist** in the plan's Section 6, per page.
5. Reach for the two platform references only when the plan says `NEEDS VERIFICATION`, or when
   you hit an attribute neither file covers.

**Building the converter rather than converting by hand?** Read
**prop-mapping-strategy.md** end to end — §2 (shared transforms), §3 (order of operations) and
§7 (the `PROP_MAP` constant) are the implementation spec.

## The plan at a glance

| Section | Covers |
|---|---|
| — | **Master conversion table** — all 37 ReadMe constructs → their target, one row each, at the top of the plan |
| 1 | **One-to-one** — Callout, code fences, CodeTabs→CodeGroup, Tabs, tables, Mermaid, links, lists, headings |
| 2 | **Near matches** — Accordion→Expandable, Cards→Columns+Card, Column→Card, Embed→Video/Iframe, `<Table>`→pipe table, Glossary, magic blocks, ordered lists (Steps only when a step has a body) |
| 3 | **Raw HTML** — the no-HTML rule, what must become a component, the image rule, `<br />` stripped everywhere |
| 4 | **Custom components** — ReadMe's four extension surfaces, Marketplace mapping, `HTMLBlock`, the fallback strategy |
| 5 | **API reference** — page structure, OpenAPI wiring, `ParamField`/`ResponseField`/`Request`/`Response` |
| 6 | **Checklist** — 35 ordered steps, plus stop conditions |

## Citation convention

Every mapping in the plan cites its source, so you can check any claim in one hop:

| Citation | Means |
|---|---|
| `[RM §4.1]` | `readme-components-info.md`, section 4.1 |
| `[DAI §4]` | `documentationai-components-information.md`, section 4 |
| `[PIT Phase 3]` | `migration-pitfalls.md`, phase 3 |
| `[TBL]` | `table-spacing-information.md` |
| `[LIVE-DAI …]` / `[LIVE-RM …]` | Fetched from the live docs sites, 2026-08-17 |

`NEEDS VERIFICATION` marks anything the references do not settle — an open question, never a
default. **Do not implement those from guesswork.** They are collected at the end of the plan,
split into resolved and still-open, alongside a table of the three places where the live docs
**contradict** the local reference files. Where they disagree, the live source wins.

## The rules that cause the most damage when broken

Pulled from the plan; each is cited there in full.

0. **No raw HTML in the output — components only, no exceptions.** `<Columns>` takes `<Card>`
   children, never `<div>`; `<details>` becomes `<Expandable>`; a raw `<table>` becomes a pipe
   table; and `<br>` is stripped everywhere, **tables included**. This is a project rule and it
   overrides the HTML routes the reference files offer.
0a. **A numbered list stays a numbered list.** Promote to `<Steps>` only when each step carries
   explanatory content beneath it.
1. **Content loss is invisible to a compile.** A page can build cleanly and read as complete with
   a whole table missing. "It builds" is not "it's complete" `[PIT Phase 2]`.
2. **Never empty a first-column parameter name.** One migration shipped 40 nameless parameter
   rows across 4 pages `[PIT Phase 2]`.
3. **ASCII spaces cannot indent a table cell** — GFM strips them, and the renderer collapses what
   is left. Use em-space (U+2003) + glyph, first column only `[TBL]`.
3a. **No `<br>` in tables, and `&#xA;` is not a substitute** — cells render at
   `white-space: normal`, so a newline entity collapses to a space. Use a `•` separator or split
   into rows. Verified in the platform source; see TableConversion.md §3.
4. **`theme` beats `icon`** when resolving a Callout's kind. Reversing it recolours callouts
   `[RM §4.1]`.
5. **Strip `<br />` everywhere, including table cells.** 922 of the corpus's `<br>`s sit inside
   tables — they become a `•`-separated line or separate rows, never a line break
   (TableConversion.md §3).
6. **External images take `src` + `alt` only** — no width, no height, and percentage widths are
   invalid on the target `[DAI §16]`.
7. **`<Card>` requires `title`, `href` *and* children** on Documentation.AI; all three are
   optional on ReadMe `[DAI §12]`.
8. **A blank line between code fences means they are not a CodeTabs group** — that is ReadMe's
   documented opt-out `[RM §4.9]`.
9. **`required="true"` is string-compared** on `ParamField` / `ResponseField`. `required={true}`
   does not register `[DAI §14]`.
10. **Never leave an unknown tag in the output.** `<Glossary>` or `<QuizGame>` left in place
    breaks the MDX build, turning a content problem into a deployment problem `[PIT Phase 5]`.

## Two blockers to settle before converting a site

Both are in the plan's Section 6 stop conditions:

- **`<Recipe>` content is not in the source file.** Recipes are authored in ReadMe's dashboard,
  so a page carrying `<Recipe slug title />` has none of its steps in the downloaded `.md`
  `[RM §4.14]`. Needs a separate fetch, or an explicit record that the page is incomplete.
- **API-endpoint pages may be out of your page list.** ReadMe generates them from an OpenAPI
  spec, and this repo's discovery stage skips them by design. On `developer.flutterwave.com`
  that is 39 of 58 API-reference pages. Decide scope first — the nav is a lower bound, not the
  page list `[PIT Phase 0]`.

## Related

The repo's conversion pipeline lives outside this folder:

- [`src/convert/`](../src/convert/) — turns a `documentation.json` into the list of pages to fetch
- [`src/download/`](../src/download/) — fetches each page's authored `.md` and describes its blocks
- [`src/download/mapping.ts`](../src/download/mapping.ts) — the machine-readable half of this plan:
  every ReadMe construct with its target and a `direct` / `transform` / `manual` / `drop` status

Keep `mapping.ts` and Sections 1–4 of the plan in agreement. When they disagree, the plan is the
one with citations.
