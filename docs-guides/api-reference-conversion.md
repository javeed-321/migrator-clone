# API Reference Conversion

How a ReadMe endpoint page becomes a Documentation.AI API page.

This implements Section 5 of
[`component-conversion-plan.md`](../Components-Information/component-conversion-plan.md).
Every rule below cites the subsection it comes from; where a rule was a judgement
call rather than something the plan settles, it says so and gives the reason.

Two files do all of it:

| File | Owns |
|---|---|
| [`src/convert/api-reference.ts`](../src/convert/api-reference.ts) | §5.3–§5.6 — everything inside one `.mdx` page |
| [`src/output/openapi.ts`](../src/output/openapi.ts) | §5.2 — the `documentation.json` wiring around it |

---

## The whole flow at a glance

```
 ReadMe .md                     one endpoint page
      │
      ▼
 convertReadmeMarkdown()        src/convert/run.ts
      │
      ├─ 0c  stripApiArtefacts        §5.6  llms.txt preamble  → gone
      │                                     # OpenAPI definition → gone
      │
      │      …passes 1–15 run as usual: tables, images, callouts,
      │        fence titles, CodeGroup, links…
      │
      ├─ 16  convertApiExamples       §5.5  # Example request  → <Request tabs>
      │                                     # Response body    → <Response tabs>
      │
      └─ 17  convertParamFields       §5.3  # Path parameters  → <ParamField path>
                                      §5.4  # Response params  → <ResponseField>
                                            (OFF by default — see below)
      │
      ▼
 .mdx  +  ConversionNote[]
      │
      ▼
 wireApiReference()             src/output/openapi.ts
      │                         §5.2  method / openapi / openapi-mode  on the page
      │                               openapi / hidden-apis            on the group
      ▼
 documentation.json  →  checkApiWiring()  →  WiringIssue[]
```

The pass order is stated in full at
[run.ts:65-146](../src/convert/run.ts#L65-L146). The two positions that matter are
explained under each step below.

---

## What the source looks like

Every Capillary endpoint page is the same run of headed sections. This is the
shape all of Section 5 keys off:

```markdown
Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. …

# Get Loyalty Promotion by ID
# Example request          ← ```curl fence
# Prerequisites
# Resource information     ← 2-column table
# Path parameters          ← parameter table
# Query parameters         ← parameter table
# Response body            ← ```json fence
# Response parameters      ← nested response-field table
# API specific error codes
# OpenAPI definition       ← ~300 lines of dumped spec
```

**The unit of work is the section, not the node.** A `json` fence *is* a response
example under `# Response body` and an ordinary sample four headings later, and
nothing in the node itself distinguishes them. Every rule below therefore reads
the nearest preceding heading first.

---

## Step 0c — Strip the artefacts (§5.6)

[`stripApiArtefacts`](../src/convert/api-reference.ts#L79). Runs **before every
other pass**, straight after parsing.

Two things §5.6 says must never reach a migrated page:

| Artefact | Match | Result |
|---|---|---|
| ReadMe's injected llms.txt preamble | [`LLMS_PREAMBLE`](../src/convert/api-reference.ts#L58) — the same regex the download IR flags it with | the paragraph is removed |
| `# OpenAPI definition` | [`OPENAPI_HEADING`](../src/convert/api-reference.ts#L64) | the heading **and its whole section** are removed |

The spec dump is removed *to the next heading at the same depth or shallower*,
which is what makes it a section rather than a heading. On the corpus pages the
dump is last, but a page that continues after it keeps everything that follows.

**Why first.** The dump is a ~300-line JSON fence with links in it. Every pass
below — placeholders, the link rewriter, the final MDX compile check — would
otherwise spend itself on a block that is about to be deleted.

Notes emitted: `api-artefact` / `change`, one per artefact.

> ⚠️ **Open gap.** The dump *is* the source spec, and §5.6 says the spec is the
> highest-fidelity input — *"migrate the spec, not the rendered page"*. This pass
> currently **discards** it rather than writing it to a file. On the Capillary
> corpus that is 25 pages whose spec is thrown away. See [Known gaps](#known-gaps).

---

## Step 16 — Request and Response (§5.5)

[`convertApiExamples`](../src/convert/api-reference.ts#L322).

Both components are thin wrappers around `CodeGroup` that render in the **right
sidebar** `[DAI §7, §8]`.

### Before

````markdown
# Example request

```curl Sample request
curl --location 'https://eu.api.capillarytech.com/v1.1/customer/add'
```

# Response body

```json 200 OK
{ "status": "success" }
```
````

### After

````markdown
<Request tabs="cURL">
  ```curl
  curl --location 'https://eu.api.capillarytech.com/v1.1/customer/add'
  ```
</Request>

<Response tabs="200 - OK">
  ```json
  { "status": "success" }
  ```
</Response>
````

### Where it runs, and why

**After** §1.3 (`groupFenceRuns`), not before. By then a fence's title is already
normalised to `title="…"` and a run of adjacent fences is already one
`<CodeGroup>`, so this pass reads one shape and reuses the labels §1.3 worked out.

Running it *first* would instead let `groupFenceRuns` build a `<CodeGroup>`
**inside** the `<Request>` it had just made — a switcher inside a switcher.
[`fencesOf`](../src/convert/api-reference.ts#L273) unwraps any `CodeGroup` it is
handed for the same reason.

### Section classification

[`classifySection`](../src/convert/api-reference.ts#L135) reads the heading text:

| Heading contains | Result |
|---|---|
| `param`, `field`, `schema`, `attribute`, `error code`, `status code` | **skipped** — these are table sections (§5.3, §5.4) |
| `request` | `<Request>` |
| `response` | `<Response>` |

The exclusion comes first on purpose: *"Response parameters"* and *"Request
parameters"* both contain the word the classifier keys off, and both are tables.
Routing them into `<Response>` would move a parameter table into the sidebar.

### The API-page gate

[`looksLikeApiReference`](../src/convert/api-reference.ts#L152) — a guide page with
a `## Request` heading and a code sample under it must keep a plain fence, because
`<Request>` renders in the sidebar. The page qualifies when it has a
parameters/fields heading, a `Resource information` / `Prerequisites` /
`API specific error codes` heading, or a `curl` fence.

The check **descends the tree** rather than reading `tree.children`: by the time
it runs, §1.3 has folded adjacent fences into a `<CodeGroup>`, so the `curl` fence
that marks the page is a grandchild of the root. Reading top-level children only
missed a real corpus page (`get-customer-details-v1api`).

### Tab labels

**`<Request>`** — labelled by **language**, via
[`requestLabels`](../src/convert/api-reference.ts#L200). §5.5 turns a fence titled
*"Sample request"* into `tabs="cURL"`, because a request switcher answers *"in
which language?"* and every tab in it is the same call. Titles come back only when
the languages cannot tell the tabs apart — which is what a page showing two curl
variants needs.

**`<Response>`** — labelled by **status code**, via
[`responseLabels`](../src/convert/api-reference.ts#L220), in the `"CODE - Variant"`
form `[DAI §6, §8]`:

| Fence title | Tab label |
|---|---|
| `200 OK` | `200 - OK` |
| `400 - Invalid payment mode` | `400 - Invalid payment mode` |
| `200` | `200` |
| `Sample response` | `Sample response` **+ flag** |
| *(no title)* | `JSON` **+ flag** |

**A title with no status code is kept verbatim and flagged, never given one.**
§5.5's own example reads a fence titled *"Invalid payment mode"* as
`400 - Invalid payment mode` — and that `400` is not in the source, it comes from
the spec. Inventing it here would put a wrong status code on the page, which is
worse than an unlabelled tab a human fixes.

### The remaining rules

| Rule | Detail |
|---|---|
| `dropdown="true"` | From [4 tabs up](../src/convert/api-reference.ts#L289). §5.5 calls the dropdown right "when a Capillary endpoint documents many scenarios" without fixing a number; four is where a tab strip starts wrapping at reading width. **Judgement call.** |
| `curl` fences | Left as `curl` — the target aliases it to `bash` `[DAI §5]`, so all 266 corpus curl fences carry across untouched |
| Fence `title="…"` | Removed once the label is in `tabs`, or the target prints it twice |
| A comma in a label | **blocker** — `tabs` is comma-separated, so the label would split into two tabs. Same treatment as §1.3 |
| `show-lines`, `default-tab` | **Not emitted.** §5.5 says not to count on suppressing line numbers on `Request`, and flags `default-tab` as contradicted between sources |
| Scattered examples | One fence, or one adjacent run, becomes one component **where it stood**. Two separated examples yield two `<Response>` blocks rather than one merged block — merging would reorder the prose between them |

### The heading

Dropped **only when the section held nothing but the examples**: they have moved
to the sidebar, so the heading would label empty space. A heading with prose still
under it stays, and both outcomes are reported.

Notes emitted: `api-request` / `api-response`, at `change` (converted, heading
dropped), `flag` (no status code), `blocker` (comma in a label).

---

## Step 17 — ParamField and ResponseField (§5.3, §5.4)

[`convertParamFields`](../src/convert/api-reference.ts#L588).

### This is OFF by default

`api: { paramFields: true }` turns it on. Off is not laziness — it is §5.6:

> `ParamField` / `ResponseField` blocks — **Generated** from the spec, the importer
> emits both. Hand-author them only for pages with no spec behind them.
>
> Convert the prose with `openapi-mode: "custom"`; **do not retype parameter
> tables that the spec already describes.**

Where a spec is wired to the page, a hand-converted copy in the body is a second
source of truth that drifts. Left alone the table is still lossless, and `[TBL]`
already carries its nested-parameter dialect across.

Off is not *silent*, though. Every API page with parameter tables gets one note
([`reportParamTables`](../src/convert/api-reference.ts#L630)) naming the decision
and the wiring that removes the need for it — 25 pages on the current corpus.

Turn it on for endpoints no spec covers, which is the one case §5.6 names for
hand-authoring these.

### Section → component

[`classifyParamSection`](../src/convert/api-reference.ts#L397), most-specific
first — a heading names one location in words rather than setting four attributes:

| Heading | Component |
|---|---|
| `Response parameters`, `Response fields` | `<ResponseField>` |
| `Path parameters` | `<ParamField path>` |
| `Query parameters`, `Request Query Parameters` | `<ParamField query>` |
| `Additional Header`, `Headers` | `<ParamField header>` |
| `Body parameters`, `Payload` | `<ParamField body>` |
| `Request parameters` *(no other location word)* | `<ParamField body>` |

Order matters: the corpus writes *"Request Query Parameters"*, which is a query
table with the word "request" in front of it.

### Row → component

```markdown
| Parameter Name | Data Type | Description                        |
| :------------- | :-------- | :--------------------------------- |
| `limit*`       | String    | Number of results to display.      |
| `offset`       | Integer   | Start index for data retrieval.    |
```

```jsx
<ParamField query="limit" param-type="string" required="true">
  Number of results to display.
</ParamField>

<ParamField query="offset" param-type="integer">
  Start index for data retrieval.
</ParamField>
```

| Field | Source |
|---|---|
| name | **column 0, always** `[PIT Phase 2]` |
| `param-type` / `field-type` | the `Data Type` column, lowercased. Note the two components use *different* attribute names `[DAI §14, §15]` |
| `required` | a trailing `*` on the name (ReadMe's convention), or a `Required`/`Mandatory` column reading yes/true/required |
| body | the description column |

`required` is written as the **string** `"true"`. `[DAI §14]` string-compares it,
so `required={true}` never registers. It is **omitted** when false rather than
written as `"false"` — the attribute already defaults to false, and a page of
`required="false"` hides the rows that matter.

### Reading the name — the one thing that must never be lost

[`readParamName`](../src/convert/api-reference.ts#L432). `[PIT Phase 2]` records
the worst documented defect of the Capillary migration: **40 parameter rows with
no name across 4 pages**, because an over-eager unwrap of `` **`name`** `` left an
empty string.

So the unwrap strips markup *around* the name and nothing that could be part of
it, in this order:

1. indent runs and depth glyphs — `•`, `◦`, `▪`, `.`, and `*`/`-`/`+` **only when
   whitespace follows**. A bare leading `*` would eat the first half of a
   `**bold**` name and leave `name**`.
2. bold → backticks → bold again, since the corpus writes all of
   `` **`name`** ``, `` `**name**` `` and `` `name` ``.
3. a trailing `*`, which sets `required`.

Each step only applies [when something is left underneath](../src/convert/api-reference.ts#L452).

**If a row's name is empty, the whole table is refused** — a `blocker` note, and
the table stays a table. Nothing nameless ships.

### What it refuses, and why refusing costs nothing

| Case | Result |
|---|---|
| A row with no name left | **blocker**, table kept `[PIT Phase 2]` |
| A **nested** parameter table | **flag**, table kept — `<ParamField>` has no nesting form in either reference, and flattening would silently reparent every child parameter. `[TBL]`'s em-space indentation already carries the depth |
| No description column | **flag**, table kept — a component with no body says less than the row did |

A refused table is already a faithful rendering of the source, so refusing loses
nothing.

### Nesting, for ResponseField only

`<ResponseField>` nests via `<Expandable>` `[DAI §15]`.
[`nest`](../src/convert/api-reference.ts#L539) reads depth from the first column
using the same [`readMarker`](../src/convert/table.ts) / `assignDepths` the table
pass uses, so all four corpus dialects (`..dots`, `--dashes`, whitespace runs,
`* bullets`) are already understood.

```jsx
<ResponseField name="status" field-type="object">
  Contains the status of the API response.

  <Expandable title="Status properties" default-open="false">
    <ResponseField name="code" field-type="integer">
      The HTTP status code.
    </ResponseField>
  </Expandable>
</ResponseField>
```

Note that a *single* nested row in the `dots` or `dashes` dialect is read as flat:
those markers can be ordinary prose, so `MIN_ROWS` in
[`table.ts`](../src/convert/table.ts) requires two rows to corroborate them. A
leading bullet or an indent run needs only one.

### One extra normalisation

The `•` the table pass writes where a cell had a `<br>` (`[TBL §7.1 option A]`)
becomes **real paragraphs** inside a component body
([`descriptionBody`](../src/convert/api-reference.ts#L477)). That separator exists
only because a table cell renders at `white-space: normal` and cannot hold a line
break; a `<ParamField>` body takes paragraphs, so carrying the bullet across would
ship a workaround for a constraint that no longer applies.

Notes emitted: `param-field` / `response-field`, at `change`, `flag`, `blocker`.

---

## Step 18 — Wiring the spec (§5.2)

[`src/output/openapi.ts`](../src/output/openapi.ts). Nothing here converts
content. The parameters, examples and interactive playground on a
Documentation.AI API page are all **generated** from a spec; what decides whether
they appear is three keys in `documentation.json`.

### Two levels

**Group level** — generate every endpoint page from one spec:

```json
{
  "group": "Users",
  "openapi": "api-reference/openapi.yaml",
  "hidden-apis": ["DELETE /users/{id}"],
  "pages": []
}
```

**Page level** — bind one endpoint to one hand-written page. This is the
per-endpoint wiring, and it is a *string on the page item*, not a YAML file per
endpoint:

```json
{
  "title": "Get User Details",
  "path": "api-reference/users/get-user",
  "method": "GET",
  "openapi": "api-reference/openapi.yaml GET /users/{id}",
  "openapi-mode": "custom"
}
```

**A per-endpoint YAML file is never required.** One spec serves many pages.

### Which mode

`wireApiReference` defaults to **`"custom"`**, per §5.2: a migrated page carries
real hand-written prose that must survive `[PIT Phase 2]`, and `"custom"` injects
only the playground and the examples. `"auto"` replaces the page with generated
documentation and is for pages with no authored content of their own.

### Every value here fails silently

That is why this is a module and not three lines at a call site:

| Value | Correct | Silently wrong |
|---|---|---|
| `hidden-apis` entry | `"GET /users/{id}"` | `"get /users/{id}"`, `"GET/users/{id}"` |
| page `openapi` | `"api-reference/openapi.yaml GET /users/{id}"` | any other spacing |
| `method` | `"POST"` | `"post"` |

A wrong one does not break the build — the endpoint simply stays visible, or the
playground simply does not appear. `[PIT Phase 7]` records that as *writing to an
ignored key*. Every value goes through
[`endpointRef`](../src/output/openapi.ts#L83), so the spelling is decided in one
place.

### The two entry points

| Function | Does |
|---|---|
| [`wireApiReference(config, wiring)`](../src/output/openapi.ts#L141) | writes `method` / `openapi` / `openapi-mode` per page, and `openapi` / `hidden-apis` per group. Returns `{ config, wired, issues }` |
| [`checkApiWiring(config)`](../src/output/openapi.ts#L205) | reads a config back — including one a human edited — and reports every value that will be ignored |

An endpoint whose page path is not in the config is **reported, not created**: a
`path` that maps to no file is the `[PIT Phase 7]` failure, and inventing a nav
entry for a page nobody converted is exactly how that happens.

```ts
const { config, wired, issues } = wireApiReference(built, {
  spec: "api-reference/openapi.yaml",
  endpoints: {
    "api-reference/users/get-user": { method: "get", path: "/users/{id}" },
  },
  group: { name: "Users", hidden: [{ method: "delete", path: "/users/{id}" }] },
});
```

`method: "get"` is normalised to `GET` on the way in — the caller does not have to
remember.

---

## Notes this conversion emits

Every note carries `rule`, `level` and the source line.

| Rule | Level | Means |
|---|---|---|
| `api-artefact` | change | llms.txt preamble or OpenAPI dump removed |
| `api-request` | change | fences wrapped in `<Request>`, or its heading dropped |
| `api-request` | blocker | comma in a tab label |
| `api-response` | change | fences wrapped in `<Response>`, or its heading dropped |
| `api-response` | flag | a response tab has no status code — add it by hand |
| `api-response` | blocker | comma in a tab label |
| `param-field` | flag | tables left as tables (the default), a nested table refused, or no description column |
| `param-field` | blocker | a row with no parameter name |
| `response-field` | change / flag / blocker | the same three, for `<ResponseField>` |

---

## Measured on the corpus

1,020 pages, run through the full pipeline:

| | |
|---|---|
| Artefacts stripped | 1,045 (1,020 preambles + 25 spec dumps) |
| Pages with a `<Request>` | 29 |
| Pages with a `<Response>` | 26 |
| Response tabs needing a status code by hand | 46 |
| Parameter tables left as tables | 25 pages |
| **Blockers from these passes** | **0** |
| MDX compile failures | 5 — all pre-existing, in other passes (unbalanced braces, `<Callout>` nesting, a raw `<thead>`) |

Test coverage: 39 tests across
[`tests/apiReference.test.ts`](../tests/apiReference.test.ts) and
[`tests/openapiWiring.test.ts`](../tests/openapiWiring.test.ts), inside a suite of
570.

---

## Known gaps

Named in Section 5, not implemented. Listed so nobody has to rediscover them.

1. **The spec is deleted, not captured (§5.6).** `stripApiArtefacts` removes the
   `# OpenAPI definition` dump — which *is* the source spec §5.2 then needs you to
   supply. It should be written to `api-reference/<slug>.json` instead. **25 pages
   on the current corpus.** This is a defect, not a scope choice.

2. **`<BodyParams>` / `<ContentType>` and `<AuthParams>` / `<AuthType>` (§5.5).**
   Not attempted. These cover endpoints with several request-body formats and
   multiple auth schemes, and carry the camelCase exception (`contentTypes`,
   `defaultType`) to the kebab-case rule `[DAI §23, §24]`.

3. **`enum`, `deprecated`, `show-location`, `examples-b64` (§5.3).** Not emitted.
   `enum` was a deliberate skip — deriving it from prose like *"Possible values are
   `UI`, `IMPORT`…"* is guesswork and the plan gives no rule for it. The other
   three have no signal in a ReadMe table.

4. **Anchor IDs (§5.3).** `ParamField` generates anchors as `location-paramName`
   (`path-doc_id`). §5.3 says in-page anchors from the old site must be checked
   against that scheme. No check exists.

5. **Playground preconditions (§5.2).** `checkApiWiring` catches malformed keys,
   but of the four failure causes the live docs list it covers only *"spec not
   referenced in documentation.json"*. It cannot tell whether the spec file is
   reachable, whether it is valid, or whether endpoints carry `operationId` — all
   three need to read the spec, which the module never opens.

6. **Spec-generated endpoint pages are still out of scope (§5.1).** Discovery
   skips sidebar links carrying ReadMe's `span.rm-APIMethod` chip. If those pages
   are in scope, the page list must come from `llms.txt` rather than the sidebar
   (`npm run download -- <site> --from ./llms.txt`), per
   `[PIT Phase 0: the nav/TOC is a lower bound, not the page list]`.
