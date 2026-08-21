/**
 * The tag names the converter recognises, in one place.
 *
 * These lists were `placeholders.ts`-private until the custom-component detector
 * needed the same question answered — *is this name one we know?* — for the
 * opposite reason. The placeholder pass asks it to decide what is **prose**; the
 * detector asks it to decide what is **unhandled**. Two copies of the answer
 * would drift, and a drifted copy fails silently in both directions: a name
 * missing here gets flagged as an unknown component on every page that uses it,
 * and a name wrongly present here is never flagged at all.
 */

/**
 * Real HTML elements, which belong to the passes that own them — `<br>` to the
 * break pass, `<img>` to the image pass, `<table>` to the table pass — or which
 * render on their own.
 *
 * Compared case-sensitively and lowercase-only, on purpose: `<map>` is an HTML
 * element, `<Map>` is one of the corpus's placeholders `[RM §11.1]`.
 */
export const HTML_ELEMENTS = new Set(
  ("a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption " +
    "cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset " +
    "figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input " +
    "ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup " +
    "option output p param picture pre progress q rp rt ruby s samp script section select slot small " +
    "source span strong style sub summary sup svg table tbody td template textarea tfoot th thead " +
    "time title tr track u ul var video wbr").split(" "),
);

/**
 * Component names that are really components, in either platform's vocabulary.
 *
 * Without this, a page that documents `<Callout>` in prose would have its own
 * examples turned into placeholders. Lowercase HTML element names are not here on
 * purpose: `<div>` in prose is not a placeholder either, but it is also not this
 * pass's problem, and `PLACEHOLDER` requires a capital anyway.
 */
export const KNOWN_COMPONENTS = new Set([
  // Documentation.AI
  "Callout", "Card", "Columns", "CodeGroup", "Expandable", "ExpandableGroup", "Iframe",
  "Image", "MermaidDiagram", "ParamField", "Request", "Response", "ResponseField", "Script",
  "Step", "Steps", "SVG", "Tab", "Tabs", "Update", "Video", "Board", "BoardColumn",
  "BoardCard", "CollectionList", "CollectionContent", "AuthParams", "BodyParams", "Link",
  // ReadMe
  "Accordion", "Anchor", "Cards", "Column", "CodeTabs", "Embed", "Glossary", "HTMLBlock",
  "Recipe", "Table", "TutorialTile", "Variable",
]);

/**
 * ReadMe's Marketplace components `[RM §9]` — community-authored, ReadMe-reviewed,
 * installed per project. Public and fixed, so a name here is one whose behaviour
 * is knowable from the plan's §4.2 table without seeing any source.
 *
 * **Five of the 24 are deliberately absent**: `Accordion`, `Cards`, `Columns`,
 * `Tabs` and `PostmanRunButton` exist in *both* the built-in set and the
 * Marketplace, with different prop sets, and installing the Marketplace version
 * silently overrides the built-in `[RM §9, §12 gotcha 17]`. They live in
 * `KNOWN_COMPONENTS` above, where their own conversion pass claims them. Listing
 * them twice would make the detector's answer depend on which set it checked
 * first — and the tag alone cannot tell you which version a project installed.
 * That determination is per-site configuration, not per-file inference.
 */
/**
 * ReadMe names that are real components but that **no pass converts**.
 *
 * The distinction this set exists for is not "do we recognise the name" — every
 * name here is in `KNOWN_COMPONENTS` above and has to stay there, or the
 * placeholder pass would turn prose *about* `<Recipe>` into inline code. It is
 * "does anything actually handle it".
 *
 * Without the split, the two questions had one answer, and being listed as known
 * was read as being handled. `<HTMLBlock>` sat in `KNOWN_COMPONENTS` for the
 * placeholder pass's sake and so the detector skipped it — it reached the output
 * byte for byte, with no note of any kind, and failed on the target as an
 * undefined component `[PIT Phase 5]`. That is the quietest failure there is: it
 * looks handled in every report.
 *
 * So the detector checks this set *first*, and anything in it is reported and
 * fenced like any other unconverted component. **Deleting a name from here is
 * how you retire it** — write the conversion, then remove the name, and the
 * safety net stops catching it.
 */
export const UNCONVERTED = new Set([
  /**
   * `recipe.ts` converts these — but only when the fetch is enabled *and*
   * succeeds, and the tag is left in the tree whenever it is not. So they stay
   * here: a name is retired from this set only once nothing can leave it
   * unconverted, and "we usually convert it" is not that.
   *
   * A successfully rebuilt recipe never reaches the detector, so keeping them
   * listed costs nothing and catches every case where the network did not answer.
   */
  "Recipe",
  "TutorialTile",
  /** The markdown form (consecutive fences) converts; this JSX wrapper does not. */
  "CodeTabs",
  /** `<Variable name="company" />` -> `{user.company}` `[PLAN §4.2 row 30]`. */
  "Variable",
]);

export const MARKETPLACE = new Set([
  "AdvancedTable", "Banner", "Compatibility", "ContentModal", "DownloadOASButton",
  "GitHubBadge", "Grid", "KeyPress", "Latex", "PostList", "QuizGame",
  "SimpleStep", "SimpleStepper", "SnapSlider", "Spoiler", "StatusPage",
  "Terminal", "ToggleList", "ToggleListItem", "Windows",
]);
