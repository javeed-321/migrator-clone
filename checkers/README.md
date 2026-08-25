# checkers

Two checkers for migrated `.mdx`, one per thing that can consume it.

```bash
node checkers/app-checker.mjs       output/projects/docs-x/pages/
node checkers/dashboard-checker.mjs output/projects/docs-x/pages/
```

They are deliberately separate programmes. A page can render flawlessly on the
site and be destroyed the first time someone opens it in the editor, and the two
failures are found by different rules, fixed at different times, and owned by
different people. One combined "MDX linter" would hide that.

No install and no `package.json` — plain `.mjs` importing `unified` / `remark-*`
out of this repo's `node_modules`, so both work on a real MDX tree rather than
guessing with regexes.

## app-checker — will the site render this?

Mirrors `documentation-ai-app`:

| Stage | Source |
|---|---|
| frontmatter split, then `preprocessMdx` over the body | `src/lib/r2.ts` |
| `remark-gfm` → `rehype-mdx-code-props` → `rehype-mermaid` → `rehype-slug`, `blockJS: false`, `scope: { user }` | `src/components/mdx-components/MDXRemoteServer.tsx` |
| the component map — the only names that exist | same file, `defaultComponents` |

**It checks the preprocessed text, not the file.** That is the whole point. The
app never compiles the bytes on disk, so checking them reports problems the
preprocessor fixes for you and stays silent about the ones it creates. A real
example from the Capillary corpus:

```
Use the tag {{pin}} to insert the verification PIN
```

parses fine as MDX. The preprocessor rewrites it to `{&#123;pin}}`, which does
not, and the page 500s. Only a check that runs the preprocessor first can see it.

| Rule | Level | What happens without it |
|---|---|---|
| `mdx-compile` | blocker | the page does not compile after preprocessing |
| `unknown-component` | blocker | undefined identifier at render; no error boundary, so the whole page fails |
| `undefined-identifier` | blocker | `{anything}` that is not rooted at `user` throws — `blockJS: false` lets it compile first |
| `spread-attribute` | blocker | nothing is in scope to spread |
| `attribute-case` | flag | the app destructures kebab-case (`param-type`, `show-lines`, `field-type`); a camelCase spelling is silently dropped |
| `unknown-attribute`, `missing-attribute`, `enum` | flag | prop ignored, or a silent fallback (`kind="warning"` renders as info) |
| `icon` | flag | not a kebab-case Lucide name, so nothing renders |
| `image-dimensions` | flag | width/height on an external image — the imgix loader passes the URL through untouched and the numbers are a guess |
| `fence-meta` | flag | says exactly what the fence header becomes; only a title and `highlight`/`focus`/`show-lines`/`wrap` survive |
| `block-anchor` | flag | `remark-wrap-flow-inline-jsx` is registered in the PDF route only, so on the site consecutive block-level `<a>` run together. Mostly seen on files that have already been through the editor |
| `br`, `line-shift`, `frontmatter`, `conditional-component` | flag | — |

Exits `1` on any blocker.

## dashboard-checker — will this survive being edited?

Mirrors `documentation-ai-dashboard`:

| Stage | Source |
|---|---|
| the sync gate that refuses unparseable MDX | `src/lib/validators/mdx-validators.ts` |
| MDX → mdast → ProseMirror, with a hard-coded `case` per component | `src/lib/mdx-utils.ts` |
| the `content:` schema each node enforces | `src/components/dashboard/editor/extensions/*Node.ts` |
| ProseMirror → mdast → MDX, restringified whole | `proseMirrorToMdx` |

Nothing here throws. `mdxToProseMirror` logs a `console.warn` nobody reads,
ProseMirror discards children that do not fit without comment, and the next save
writes the result over your file. Hence `degrade` — damage that is only visible
after it has happened.

| Rule | Level | What happens without it |
|---|---|---|
| `sync-gate`, `frontmatter` | blocker | the page cannot be edited at all |
| `not-in-editor` | degrade | no `case` in mdx-utils, so the component *and everything inside it* is flattened into one frozen `htmlBlock` |
| `inline-unwrapped` | degrade | an inline tag that is not a mark — the tag is dropped, the text stays |
| `content-model` | degrade | `Steps` takes `step+`, `Columns` takes `card+`, `CodeGroup` takes `codeBlock*`. A stray paragraph is dropped on open |
| `inline-wrapped-child` | degrade | a `<Card>` sharing a line with prose parses as inline JSX and goes with the paragraph |
| `atom-children` | degrade | content written inside an atom (`Image`, `Iframe`, `Board`, `CollectionList`) is discarded |
| `attribute-case` | flag | camelCase is rewritten to kebab on first save — diff churn on lines nobody edited |
| `empty-container` | flag | an empty `<Tabs>` gets `"Tab 1"`/`"Tab 2"` invented and saved |
| `bullet-style`, `emphasis-style`, `rule-style`, `heading-style` | flag | `proseMirrorToMdx` restringifies the whole document with fixed options (`-` bullets, `_` emphasis, `---` rules, ATX headings) |

Exits `1` on a blocker, or on any `degrade` with `--strict`.

## Flags

```
--json                            machine-readable, for wiring into a report
--only blocker|degrade|flag       show this level and above
--strict                          (dashboard) degrade also exits 1
```

## Files

| File | |
|---|---|
| `contract.mjs` | the target's contract as data — component lists, content models, attribute schemas, enums, scope. **The one file to diff when the platform changes.** |
| `preprocess.mjs` | a port of the app's `preprocessMdx`. Two deliberate differences from the original, both documented in the file: pass 12 (blank-line collapsing) is skipped so line numbers stay true, and passes 7–8 (repairing hand-typed ``double`` fences) are skipped as dead code here |
| `lib.mjs` | plumbing only — file walking, parsing, findings, printing. No rules |
| `fixtures/kitchen-sink.mdx` | one page that trips nearly every rule, for seeing both checkers work |

Keeping the contract in one file is the point: when someone adds a component to
`MDXRemoteServer.tsx` or a `case` to `mdx-utils.ts`, this stays honest with a
one-line edit rather than a hunt through the rules.
