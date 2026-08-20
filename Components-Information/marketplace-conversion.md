# ReadMe Marketplace & custom components → Documentation.AI

How every ReadMe Marketplace component becomes a Documentation.AI construct, and the
procedure to follow for a custom component nobody has mapped yet.

Companion to `component-conversion-plan.md`, which covers the built-ins. This file covers
only what that one calls Section 4 — the open-ended extension surfaces.

## How to read this

| Citation | Source |
|---|---|
| `[MP <Name>]` | `marketplace-main/components/<Name>/<Name>.mdx` — the component's real source, read directly |
| `[RM §n]` | `readme-components-info.md`, section *n* |
| `[DAI §n]` | `documentationai-components-information.md`, section *n* |
| `[PIT Phase n]` | `migration-pitfalls.md`, phase *n* |
| `[PLAN §n]` | `component-conversion-plan.md`, section *n* |
| `[LIVE-DAI …]` | Fetched from the live `documentation.ai` docs, 2026-08-20 — path given |

Every mapping below was derived by reading the component's own source in
`marketplace-main/`, not from the ReadMe docs' prop summaries. Where the two disagree, the
source wins and the disagreement is called out.

---

## 1. The governing insight

**A Marketplace component and a project custom component are the same thing.** Both are an
`export const X = props => …` in an `.mdx` file `[RM §8, §9]`. `Spoiler` ships as:

```jsx
export const Spoiler = ({ children, overlayColor = 'black', fadeDuration = 500 }) => { … };

<Spoiler>This is a secret message. Click the black bar to reveal it!</Spoiler>
```

which is byte-for-byte the shape of a component someone authors in *Settings → Custom
Components*.

So there is **one conversion procedure**, and the three kinds the detector reports
(`src/convert/custom-components.ts`) differ only in **where the source can be found**:

| Detector kind | Source lives | Action |
|---|---|---|
| `marketplace` | `marketplace-main/components/<Name>/<Name>.mdx` | Use the table in §5 |
| `local` | Inline in the page, in the `export const` | Run the procedure in §7 |
| `unknown` | ReadMe's dashboard — **not in the downloaded file** | Stop condition (§9) |

---

## 2. The question that decides everything: where is the content?

Before choosing a target, read the source and find where the *words* are. Getting this
wrong deletes content, and `[PIT Phase 2]` is explicit that content loss is invisible to a
compile.

| Content lives in | Components | Risk |
|---|---|---|
| **`children`** | `Accordion`, `Cards`, `Columns`, `Grid`, `KeyPress`, `Latex`, `SimpleStepper`, `SnapSlider`, `Spoiler`, `Steps`, `Tabs`, `Terminal`, `ToggleList`, `Windows` | Low — the words are already in the page |
| **props** | `AdvancedTable` (`data`), `Banner` (`message`), `Compatibility` (`plans`), `ContentModal` (`content`), `QuizGame` (`question`, `options`) | **High** — drop the tag and the content goes with it |
| **a remote URL** | `PostList`, `StatusPage`, `PostmanRunButton`, `DownloadOASButton`, `GitHubBadge` | The content was never in the page. `GitHubBadge` is the one exception that still converts natively — see §5.4 |

The prop-carried five are the ones that need real data transformation — a JS object or
array rebuilt as MDX — rather than a tag swap.

---

## 3. The decision rule: content or decoration?

Two viable routes exist for anything without a native equivalent, and the choice is not
about fidelity. It is about whether the words matter more than the pixels.

- **Content** — the words are the point, the UI is presentation. Convert to a **native
  component**. The content stays searchable, the AI assistant can read it, and it themes
  correctly in dark mode.
- **Decoration** — the UI *is* the point and the words are incidental. **Prerender to
  HTML + CSS** (§6). Reproducing the look is the whole job, and nobody searches for it.

The cost that decides most cases: **HTML blocks are opaque to Documentation.AI's search
and its AI assistant** `[PLAN §4.2]`. That is not recoverable with more engineering. A plan
comparison table is worth more findable than pretty; a retro window frame is not.

### The four standard approaches, and why two of them

| Approach | Verdict |
|---|---|
| **Static render** — execute the component with `renderToStaticMarkup` and the call-site props | ✅ The general-purpose fallback (§6) |
| **Semantic mapping** — hand-map to a native target | ✅ Preferred wherever one exists (§5) |
| **Headless-browser capture** — mount in Playwright, read `outerHTML` | Viable, heavier; only needed when post-mount state matters |
| **AST transpile** — rewrite JSX tags to HTML without executing | ❌ **Do not.** `Compatibility`'s body is `Object.entries(plans).map(…)`; it cannot be resolved without evaluation. Every real component has expressions, maps and ternaries |

---

## 4. Styling: inline CSS and stylesheets

Both routes are available, and both persist.

**Inline `style` works and survives a save.** An earlier concern that the platform editor
stripped inline styles `[PIT Phase 6]` is **resolved — the issue is fixed and inline styles
now persist**. Use inline for a one-off block.

**Stylesheets attach through `documentation.json`** `[LIVE-DAI /docs/customize/custom-css]`:

```json
{
  "css": [
    { "src": "styles/custom.css" },
    { "src": "https://cdn.example.com/external-styles.css" }
  ]
}
```

`src` takes a relative path or an HTTPS URL. Stylesheets load **after** the default theme,
so their rules win. Use a stylesheet when the same block repeats across pages — one place
to edit beats N copies.

Three rules for either route:

- **Inline `style` on Documentation.AI is a CSS *string*, not a JSX object**:
  `style="width: 400px; height: auto;"`, never `style={{ width: '400px' }}`
  `[LIVE-DAI /components/images]`. ReadMe requires the object form `[PLAN global rules]`, so
  every migrated `style` must be rewritten.
- **CSS is site-wide — there is no page scoping** `[LIVE-DAI /docs/customize/custom-css]`.
  Scope by putting your own class on the block and targeting that.
- **Prefix your classes.** `dai-*` belongs to the platform (`dai-article`,
  `dai-content-area`, `dai-callout-body`, `dai-step-number`, …). Use your own prefix, e.g.
  `rm-terminal`, or you will collide with a platform hook.
- **Do not hard-code colours.** Use the theme's CSS variables, or the block breaks in dark
  mode.

---

## 5. The mapping — all 24

### 5.1 Route 1 — native component (16)

| Marketplace | Props `[MP]` | Target | Lost |
|---|---|---|---|
| `Accordion` | `title, icon, iconColor, children` | `<Expandable>` in `<ExpandableGroup>` `[DAI §11]` | icon, iconColor |
| `Tabs` / `Tab` | `children`; `title, icon, iconColor` | `<Tabs>` / `<Tab>` `[DAI §10]` | iconColor |
| `ToggleList` / `ToggleListItem` | `children`; `title` | `<ExpandableGroup>` / `<Expandable>` `[DAI §11]` | — |
| `Steps` / `Step` | `name, children`; `number, title` | `<Steps>` / `<Step>` `[DAI §9]` | per-step permalinks |
| `SimpleStepper` / `SimpleStep` | `children`; `header` | `<Steps>` / `<Step>` `[DAI §9]` | next/back navigation |
| `Cards` / `Card` | `columns`; `title, href, icon, iconColor, target` | `<Columns cols>` + `<Card>` `[DAI §12, §13]` | iconColor |
| `Columns` / `Column` | `layout`, `children` | `<Columns cols>` + `<Card>` `[DAI §13]` | `layout="auto"` sizing |
| `Grid` | `columns, gap, gapX, gapY, padding, style` | `<Columns cols>` + `<Card>` `[DAI §13]` | gap / padding control |
| `Spoiler` | `overlayColor, fadeDuration` | `<Expandable default-open="false">` | click-to-reveal fade |
| `ContentModal` | `label, title, **content**, size, buttonColor` | `<Expandable>` `[DAI §11]` | the modal overlay |
| `KeyPress` | `keyCombo, children, onPress` | `<Expandable>`, content shown | the key-combo trigger |
| `Terminal` | `children` (template literal) | a ` ```bash ` fence `[DAI §5]` | frame, per-line copy buttons |
| `Compatibility` | `title, subtitle, **plans**` | pipe table `[DAI §3]` | colour coding |
| `AdvancedTable` | **`data`** | pipe table `[DAI §3]` | sorting, filtering, paging, CSV export |
| `QuizGame` | **`question`, `options`** | text + list, answer in `<Expandable>` | scoring, interactivity |
| `GitHubBadge` | `owner, repo, workflow, branch` | `<Image>` `[DAI §16]` | — **stays live**, see §5.4 |

### 5.2 Route 2 — prerender to HTML + CSS (2)

Both are pure decoration with no native equivalent, and neither needs JavaScript.

| Marketplace | Why HTML is right | Note |
|---|---|---|
| `SnapSlider` | Pure CSS scroll-snap `[MP SnapSlider]` — `snap-x snap-mandatory overflow-x-scroll`. Reproduces exactly with no JS | Wrap images in `<div class="rm-slider">` |
| `Windows` | A decorative retro frame, no state, no effects `[MP Windows]` | Wrap in `<div class="rm-window">` |

`Terminal` and `Grid` may also take this route when the frame or the exact gap matters more
than searchability — but the native target is the default for both.

### 5.3 Route 3 — link out or site-level (5)

The content is not on the page, so there is nothing to convert. A frozen snapshot of live
data is worse than a link: it will be wrong eventually and nothing will refresh it.

| Marketplace | Target |
|---|---|
| `PostList` | `<Card href>` to the API, or a `json` fence showing an example response, clearly labelled as an example |
| `StatusPage` | `<Card href="https://status.…">` — **never freeze a status** |
| `PostmanRunButton` | `<Card title="Run in Postman" href={collectionUrl}>` `[RM §4.15]` |
| `DownloadOASButton` | `<Card title="Download OpenAPI spec" href={url}>` |
| `Banner` | **Split by mode** — see §5.4 |

### 5.4 Three components with a non-obvious answer

**`GitHubBadge` converts natively and stays live.** Its whole render is one image
`[MP GitHubBadge]`:

```jsx
const badgeUrl = `https://github.com/${owner}/${repo}/actions/workflows/${workflow}/badge.svg?branch=${branch}`;
<img src={badgeUrl} alt={`${workflow} status`} className="h-6" />
```

GitHub regenerates that SVG on every request, so the badge keeps updating with no
JavaScript at all:

```jsx
<Image src="https://github.com/readmeio/marketplace/actions/workflows/ci.yml/badge.svg?branch=main" alt="ci status" />
```

**`Banner` splits by mode `[MP Banner]`.** The two modes are different problems:

- `isInline={true}` — renders in the page. → `<Callout kind="info">` with `message` as the
  body.
- `isInline={false}` — its `useEffect` does `document.querySelector('#content-head')` and
  prepends a div to the **site header**. That is not page content at all. → site-level
  Custom Scripts + Custom CSS `[LIVE-DAI /docs/customize/custom-scripts]`, or drop it.

**`Latex` has no answer (1).** It fetches `react-latex-next` from a CDN at page load
`[RM §9]`, and Documentation.AI documents no math support. HTML + CSS cannot render LaTeX
either — it needs JS. The options are an image of the rendered formula, or a code fence
showing the source. **This is a user decision, not a mapping.**

That accounts for all 24: 16 native + 2 prerendered + 5 linked out + 1 undecided.

---

## 6. The prerender pipeline (Route 2)

For a component with no native equivalent whose content is static:

1. **Extract** the `export const` source and the props from the call site.
2. **Render** with `renderToStaticMarkup`, passing those props.
3. **Compile the Tailwind.** Every Marketplace component styles with utility classes —
   `bg-yellow-50 border border-yellow-200 rounded-lg flex` `[MP Compatibility]`. Those class
   names are **inert on Documentation.AI** unless the matching CSS ships too. Run the
   Tailwind CLI over the produced HTML with a content glob so only used utilities are
   emitted.
4. **Prefix the classes** so they cannot collide with `dai-*`.
5. **Register** the stylesheet in `documentation.json` under `css` (§4).
6. **Inline** the HTML in the page.

Four limits to record, not discover later:

- **Initial render only.** Effects do not run. `Spoiler` renders unrevealed, `QuizGame`
  unanswered, `PostList` frozen on "Loading posts…".
- **Font Awesome does not load.** `Compatibility` draws its ticks with
  `<i className="fa-regular fa-circle-check">` `[MP Compatibility]`. Rendered faithfully on
  a site without Font Awesome, that is a blank space. Substitute inline SVG.
- **Dark mode.** `Compatibility`'s own source carries
  `/* NOTE: Needs mobile and darkmode support still! */` `[MP Compatibility]`. Reproducing
  it faithfully reproduces a known bug.
- **Not editable.** A writer cannot edit frozen markup in the visual editor.

---

## 7. Worked conversions — the five that carry content in props

### 7.1 `Compatibility` → pipe table

The information is three booleans and two strings. A table carries **100%** of it, stays
searchable, and answers "is this on Enterprise?" — which is what a reader actually asks.

**Before** `[MP Compatibility]`:

```jsx
<Compatibility title="Feature Name" subtitle="This is a description of the feature"
               plans={{ Free: false, Business: true, Enterprise: true }} />
```

**After**:

```markdown
### Feature Name

This is a description of the feature.

| Plan | Available |
|:-----------|:----------|
| Free | — |
| Business | ✅ |
| Enterprise | ✅ |
```

`title` becomes a heading, `subtitle` the sentence beneath it, and each key of `plans`
becomes a row. Never drop `subtitle` — it is the only prose the component carries.

### 7.2 `AdvancedTable` → pipe table

Object keys become the header row, in first-object key order.

**Before** `[MP AdvancedTable]`:

```jsx
<AdvancedTable data={[
  { 'code': 'CATEGORY_NOTFOUND', 'status': 'Not Found',
    'description': "The category couldn't be found.",
    'message': "The category with the slug '{category}' couldn't be found." }
]} />
```

**After**:

```markdown
| Code | Status | Description | Message |
|:-----|:-------|:------------|:--------|
| `CATEGORY_NOTFOUND` | Not Found | The category couldn't be found. | The category with the slug `{category}` couldn't be found. |
```

> **MDX hazard.** The sample data contains `{category}`, `{slug}` and `{error}`. Inside a
> JSX attribute those are ordinary string characters; lifted into MDX body text a bare
> `{…}` is **an expression and will be evaluated** `[RM §12 gotcha 15]` `[PIT Phase 5]`.
> Wrap them in backticks or escape as `\{`. This applies to every prop-to-body lift, not
> just this component.

Sorting, filtering, pagination and CSV export are lost. Say so in a note.

### 7.3 `QuizGame` → question, options, answer

**Before** `[MP QuizGame]`:

```jsx
<QuizGame question="Which HTTP status means Not Found?"
          options={[{ text: '200', isCorrect: false }, { text: '404', isCorrect: true }]} />
```

**After**:

```markdown
**Which HTTP status means Not Found?**

- 200
- 404

<Expandable title="Show answer">
  **404** — Not Found.
</Expandable>
```

`isCorrect` must survive somewhere. Dropping it turns a quiz into an unanswerable list.

### 7.4 `ContentModal` → Expandable

`label` is the button text, `title` the modal heading, `content` the body `[MP ContentModal]`.
Collapse to one `<Expandable>`: use `title` when present, otherwise `label`.

```jsx
<Expandable title="Rate limits">
  Free accounts are limited to 60 requests per minute.
</Expandable>
```

`size` and `buttonColor` are presentation-only — drop them.

### 7.5 `Banner` (inline) → Callout

```jsx
<Banner isInline={true} message="Displayed inline!" color="#118cfd" textColor="#ffffff" />
```

becomes:

```jsx
<Callout kind="info">
  Displayed inline!
</Callout>
```

`color`, `textColor`, `fontSize` and `fontWeight` are dropped — `<Callout>` draws its own
palette from `kind`, which is what keeps it working in dark mode. For the non-inline mode,
see §5.4.

---

## 8. Local custom components — the same procedure

A component defined by an `export const` on the page is converted exactly as above. The
only difference is that nobody has pre-written the answer, so you read the source and
answer three questions:

1. **Where is the content?** `children`, props, or a fetch (§2).
2. **What does it draw?** That picks the target, or Route 2.
3. **What behaviour does it add?** That is what is lost, and what the note must say.

This is the step worth handing to a model, because the input is unbounded. Give it the
`export const` source, every usage on the page, the Documentation.AI component list, and
the ladder in `[PLAN §4.4]`. Constrain the output to a schema — the emitted MDX, the
components used, whether it is lossy, and what was lost — then **validate in code before
accepting it**:

| Check | Catches |
|---|---|
| Components used ⊆ the Documentation.AI set | A model handed Tailwind JSX reaching for `<div>` by reflex |
| Every text token from the source present in the output | Content loss `[PIT Phase 2]` |
| Output re-parses as MDX | Malformed JSX |
| `lossy` or low confidence | Anything a person should see before it ships |

Any check failing demotes the component to a stop condition. Never ship an unvalidated
guess into the corpus.

### The Marketplace is the eval set

The 24 components have known-correct answers — §5 is that answer key — and their real
source is on disk. So before trusting a model on an unknown local component, run it over
all 24 and diff against §5. A model that cannot work out that `Spoiler` is an `<Expandable>`,
or that `Banner`'s `message` prop has to become body text, cannot be trusted on a component
nobody has seen. This is a real regression test, and it exists only because
`marketplace-main/` is checked out.

---

## 9. Stop conditions

Treat as blockers, not notes `[PIT Phase 0]`:

- a component the detector reports as `unknown` — the definition is not in the file;
- `Latex`, or any component whose faithful rendering needs JavaScript the target will not run;
- a prop-carried content value that will not flatten into MDX without losing information;
- a component whose conversion the validation checks in §8 rejected.

---

## 10. What this file changes elsewhere

| Reference | Line | Change |
|---|---|---|
| `migration-pitfalls.md` | Phase 6 | **"The platform editor strips inline styles on save" is no longer true** — the issue is fixed and inline styles persist (confirmed 2026-08-20). §4 above supersedes it |
| `component-conversion-plan.md` | §3.2, §4.2 | Both repeat the stale inline-style claim; both should point here |
| `documentationai-components-information.md` | — | Documents no `css` key. `documentation.json` **does** accept `"css": [{ "src": … }]` `[LIVE-DAI /docs/customize/custom-css]` |
| `component-conversion-plan.md` | §4.2 | Maps `DownloadOasButton`; the real exported name is **`DownloadOASButton`** `[MP DownloadOasButton]` |
