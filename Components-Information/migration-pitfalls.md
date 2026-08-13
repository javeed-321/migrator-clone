--
name: migration-pitfalls
description: >
  Cross-migration failure catalog for docs → Documentation.AI migrations, turned
  into preventive rules. Read alongside readme-documentation-migration-skill (the
  pipeline). The pipeline skill tells you HOW to migrate; this file tells you what
  actually goes wrong and the one rule that stops each failure repeating. Every rule
  below was earned on a real migration (Capillary API reference, Scrut help centre,
  Armor, and session pipeline work) — not a hypothetical checklist. Use this skill
  any time a documentation migration is starting, in progress, or being reviewed.
  Also trigger when the user mentions migration bugs, content loss, broken tables,
  heading issues, MDX compile errors, Documentation.AI rendering problems,
  documentation.json wiring issues, or any post-migration quality check — even if
  they don't say "pitfalls" explicitly. Skim this before every migration run.
---
 
# Migration pitfalls — rules, not stories
 
Each rule is stated as **do this → prevents this failure**. Tags: **[U]** universal to
any docs migration, **[P]** specific to Documentation.AI / a hosted-editor platform.
When two migrations hit the same failure, it is listed once.
 
---
 
## Phase 0 — Scope & discovery
 
- **[U] The nav/TOC is a lower bound, not the page list.** Enumerate from a machine
  source (sitemap, `llms.txt`, ReadMe `<url>.md`, API nav JSON) AND probe adjacent
  identifiers (`-1`, `-2`, sibling slugs) before declaring the set complete.
  *Prevents:* pages that exist but aren't in the TOC left undiscovered; a whole section
  missed because it sat on a separate deployment with its own TOC and was never revisited.
- **[U] A landing page that renders its menu by script has no links in the fetched HTML.**
  Detect script-rendered nav and fall back to sitemap/API, don't trust the empty crawl.
  *Prevents:* an entire section's children silently unmigrated.
- **[U] Record every page as `{title, source_url, kind, slug}` up front and treat every
  open scope question as a blocker, not a note.** *Prevents:* "we'll come back to it" sections
  that never get revisited.
## Phase 1 — Fetch & extract
 
- **[U] Convert from the richest source, not a lossy intermediate.** Use raw HTML / raw
  `.md`, never a scraper's pre-digested markdown, as the conversion input.
  *Prevents:* formatting fidelity lost before conversion even starts.
- **[U] Verify the content selector actually applied; confirm the slice ends at the content
  boundary.** *Prevents:* nav/footer chrome pulled into the body; a naive slice running past
  the content region and producing false audit findings later.
- **[U] Cache each fetched source to disk; make the run resumable; fetch sequentially with
  backoff on 429.** *Prevents:* an external scraper disconnecting mid-project taking the run
  with it; rate-limit pages mistaken for real content.
- **[U] Distinguish a 404 from a 429.** A ~220 KB HTML body is usually rate-limiting; retry
  with backoff before recording NO-SOURCE. Confirm absence with the HTTP status, not the body.
  *Prevents:* live pages wrongly logged as missing.
- **[U] Don't let raw fetches flood the context window; stream to files and parse from disk.**
  *Prevents:* oversized tool results blowing context.
- **[U] Treat any temp build/validation dir as ephemeral — re-create it as a run step.**
  *Prevents:* a cleaned dir silently invalidating the verification gate.
## Phase 2 — Body conversion (content loss)
 
- **[U] Content loss is invisible to a compile.** A page can compile and read as complete
  with whole tables, inline text, or list items gone. Never treat "it builds" as "it's complete."
  *Prevents:* dropped table blocks; prose that refers to a table/list that no longer follows it.
- **[U] Use a parser that keeps inline content between block elements and preserves nesting
  depth.** *Prevents:* a block-only parser dropping text that sits directly between blocks; a
  list nested inside a paragraph running together; a non-greedy pattern closing on the wrong
  tag and dropping items whenever lists nest >1 level.
- **[P] Never unwrap a first-column parameter name to nothing.** Source `**\`name\`**`
  (bold+backtick) must keep the identifier; do not collapse it to an empty `` `` `` span.
  *Prevents:* the Capillary defect — 40 parameter rows shipped nameless across 4 pages.
- **[U] Preserve cell text verbatim; never truncate, reorder, or "tidy" it.** Row COUNT
  matching is not row CONTENT matching. *Prevents:* descriptions cut >50%, row pairs reordered,
  and JSON fields deleted from a code sample while the row count still balances.
- **[U] Copy facts exactly — never edit a value and never invent one.** *Prevents:* an
  allowed-character set silently changed; a "Possible values: …" line added that is in no source.
- **[U] Keep the opening description sentence.** The lead paragraph often carries the only
  statement of a precondition or prerequisite. *Prevents:* password-enablement / sessionId /
  token-validity facts dropped with the intro.
- **[P] Strip tool/internal markers from the output.** No `### param-table-linebreaks`,
  no scraper scaffolding, no `# OpenAPI definition` dump, no ReadMe "Documentation Index"
  preamble. *Prevents:* internal markers rendering as visible headings on 16 published pages.
## Phase 3 — Tables (the single richest source of loss)
 
- **[U] Reconstruct tables structurally, never by visual position.** *Prevents:* a column
  spliced into another column's sentence; rows falling into prose read left-to-right; two
  entries merging with no boundary; a row with fewer columns jamming cells together.
- **[U] Rejoin values broken by the source's print/line wrap before building rows.**
  *Prevents:* one logical row split into two at a wrap; a single value broken across rows.
- **[P] Handle all three table forms — `<Table>` JSX, `<table>`, GFM pipe — and never let
  a data row become the header.** For an empty header row `| | |`, decide with the user:
  promote row 1, or use header-less HTML `<table><tbody>` (GFM always styles row 1 as header).
  *Prevents:* half-converted tables; lost header rows; tables left as prose.
- **[P] In a table cell: `\*` stays literal (keep the backslash); a leading `* child` is a
  nesting marker → `•`, not `-`; never put a raw newline in a cell.** *Prevents:* a stray
  asterisk opening emphasis; a newline breaking table syntax.
- **[P] Indent nested params with em-space (U+2003) + glyph, not ASCII spaces (stripped by
  GFM) or `\n`.** When editing in place, strip only ASCII (`.strip(" \t")`) so you don't remove
  the em-space you added. Verify on the live preview. *Prevents:* nested-param indentation
  collapsing on the hosted renderer.
- **[U] Tables inside numbered steps must stay tables.** *Prevents:* step tables flattened to
  run-on prose with row labels injected mid-sentence.
## Phase 4 — Headings, lists, links, images
 
- **[U] Reproduce the source heading levels; do not blanket-promote and do not promote only
  some siblings.** Flag inconsistent source hierarchy to the user rather than "fixing" it silently.
  *Prevents:* child headings flattened onto their parent; a heading nested under its former peer;
  skipped levels.
- **[U] Don't turn bold paragraphs into headings, and drop the body `# Title` that duplicates
  frontmatter.** *Prevents:* phantom TOC entries; a title printed twice.
- **[U] Fix the link policy ONCE, in writing, before touching files.** *Prevents:* repairing
  then reverting link handling and reworking every page twice.
- **[U] A link audit needs the path prefix and URL-decoding, and must not flag targets that
  merely sit outside the published nav.** *Prevents:* massively over-reported "broken" links.
- **[P] Carry in-page anchor IDs across; the platform slugs headings from TEXT, not level.**
  *Prevents:* 17 broken in-page anchors when a TOC still links to dropped `<a id>` targets.
- **[U] Verify a rewritten link points to the SAME page.** *Prevents:* a link silently retargeted
  to a different (similarly-named) page.
- **[P] Images: set explicit width, preserve aspect ratio, render block-level images as blocks.**
  *Prevents:* images stretching to the container; ratio distortion; block images emitted inline.
## Phase 5 — Build breakage (must compile with zero errors)
 
- **[P] Escape MDX hazards in prose: bare `{token}`, `<letter`, malformed/unknown tags, and
  bold inside inline code.** MDX-compile every page before writing.
  *Prevents:* unescaped braces/angle-brackets breaking the build; a stray tag parsed as a
  component; emphasis lost inside code.
- **[P] Block JSX stays on ONE line; raw HTML uses `className`, not `class`.** Verify with the
  loader, not by eye. *Prevents:* multi-line JSX re-parsed as markdown; styles never binding.
## Phase 6 — Hosted-platform rendering & the editor
 
- **[P] If you override a background, you own the foreground — tokenise colours, never
  hard-code, and redefine only tokens in the dark block.** *Prevents:* white-on-white card
  titles in dark mode; a too-faint hardcoded colour read as "unstyled."
- **[P] Measure a platform component before adding spacing; prefer documented hooks
  (`.dai-*`, `data-component`) over element types or utility classes.** *Prevents:* double
  padding; a selector that silently stops matching after a markup change.
- **[P] Don't scope a stylesheet on a heading/anchor the editor can rewrite; captions go
  outside code fences (fence attributes aren't rendered); a bare `<hr>` may be zeroed by the
  platform reset.** *Prevents:* an edit making the whole stylesheet inert; invisible captions;
  a rule that renders nothing.
- **[P] The platform editor mutates saved files** — it injects `<p>`, flips heading levels,
  strips inline styles and fence attributes, with only a timestamp as signal. Re-read before
  trusting on-disk content; reconcile manual edits deliberately. *Prevents:* silent regressions;
  a page left half-updated and internally inconsistent.
## Phase 7 — documentation.json & navigation
 
- **[P] Edit config surgically (targeted text edits); parse with `json.loads()` only to
  validate, never to rewrite.** *Prevents:* a serialiser reflowing a hand-formatted config and
  making the diff unreviewable.
- **[U] Keep a commit inside the scope its message claims.** *Prevents:* page-level flags
  (`show-sidebar:false`) spreading to sibling sections and hiding menus.
- **[P] Confirm every config key exists in the published schema before relying on it; every
  nav `path` must map to a real file, appear once, and sit under the right audience.**
  *Prevents:* writing to an ignored key (`customCss`); duplicate paths; 404s; mis-filed pages;
  and pre-existing root-prop schema errors masking your additions.
## Phase 8 — Verification (assume loss until proven otherwise)
 
- **[U] Compile + link-check + read-through does NOT prove completeness.** Extract headings,
  every table ROW, code blocks, error codes, param names, links and images from the raw source
  and confirm each appears in the output. *Prevents:* declaring a page verified while a whole
  block is missing.
- **[U] Cross-check by content, not position or visible text alone; match cells by content;
  handle duplicate texts.** Combine structural counts AND token comparison — neither alone is
  enough. *Prevents:* row-count checks passing while cells are truncated; duplicate-text false
  positives; counts contaminated by frontmatter delimiters.
- **[U] Apply the SAME verification depth to every page/section.** *Prevents:* one section
  getting a parity check the rest never got.
- **[U] Unicode-safe tooling only:** count in Python with explicit charsets (`.strip(" \t\r\n")`),
  never `grep -P '\xc2\xa0'`; match `<(td|th)\b[^>]*>` with `re.S`; don't let a tag-stripping
  regex eat angle-bracket text inside code. *Prevents:* NBSP/attributed-cell/code-block miscounts.
## Phase 9 — Performance [P]
 
- **Audit migrated images for dimensions AND format, not just host** (a 1360×1360 badge shown
  at 62×62 is waste even on the customer's own CDN). **Never `@import` fonts from a stylesheet**
  — register them in `documentation.json` `css` so the preload scanner finds them. **Merge
  page-scoped stylesheets** — with only site-wide CSS, request count costs more than bytes.
## Phase 10 — Process & reporting
 
- **[U] Read the file before reaching for a browser probe; escalate to a live probe only for
  computed styles, real timings, or DOM order.** *Prevents:* running headless-Chrome scripts to
  answer questions the source already answers.
- **[U] Re-fetch before declaring anything broken; never diagnose live behaviour from a stale
  capture; confirm any review/config finding against served output.** *Prevents:* a redeploy
  making a filename look wrong; a screenshot (one scroll, one zoom) read as a rendering bug; a
  speculative cost reported as real.
- **[U] A scope boundary applies to READING, not just writing** — don't open a repo you were
  told not to touch. *Prevents:* reading off-limits platform source.
- **[U] Regenerate reports after any decision reversal.** *Prevents:* migration/link reports
  describing decisions that were later undone.
---
 
## The 12-line pre-flight (run before every migration)
 
1. Enumerate pages from a machine source + probe adjacent slugs — TOC is a lower bound.
2. Convert from raw HTML/`.md`, cache to disk, resumable, backoff on 429.
3. No content loss: every row, sentence, code block, link, image — compile ≠ complete.
4. Never empty a param-name cell; never truncate/reorder/edit/invent cell content.
5. Tables: structural reconstruction, rejoin wrapped values, all three table forms.
6. Em-space indentation; `\*` literal; `•` for nesting; no newline in a cell.
7. Preserve source heading levels; carry anchor IDs; fix link policy once.
8. MDX-compile zero errors; block JSX one line; escape `{`/`<`.
9. Tokenise colours; documented hooks only; expect the editor to mutate files.
10. Edit config surgically; validate keys against schema; every path → one real file.
11. Verify by source parity (content, not position), same depth everywhere, Unicode-safe.
12. Re-fetch before calling anything broken; regenerate reports after any reversal.
