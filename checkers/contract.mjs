/**
 * The target's contract, transcribed as data.
 *
 * Everything here was read off the two real repos. When they change, this file
 * is the one diff to review — that is the whole reason it is separate from the
 * rules that use it.
 *
 *   app       ../../DocumentationAI/documentation-ai-app
 *   dashboard ../../DocumentationAI/documentation-ai-dashboard
 */

/* ------------------------------------------------------------------ *
 * 1. What the APP can render
 * ------------------------------------------------------------------ */

/**
 * The keys of `defaultComponents` in
 * app/src/components/mdx-components/MDXRemoteServer.tsx.
 *
 * A capitalised tag that is not in here compiles fine and then throws at
 * render — MDX turns it into a bare identifier, and there is no error boundary
 * under app/src/app, so the whole page fails.
 */
export const RENDER_COMPONENTS = new Set([
  'AuthParams', 'AuthType', 'Board', 'BoardCard', 'BoardColumn', 'BodyParams',
  'Callout', 'Card', 'CodeBlock', 'CodeGroup', 'CollectionContent', 'CollectionList',
  'Columns', 'ContentType', 'Expandable', 'ExpandableGroup', 'Iframe', 'Image',
  'Link', 'MermaidDiagram', 'ParamField', 'Request', 'Response', 'ResponseField',
  'SVG', 'Script', 'Step', 'Steps', 'Tab', 'Tabs', 'Update', 'Video',
]);

/**
 * Only bound when `operationData` is passed to MDXRemoteServer — i.e. on an
 * OpenAPI page. Anywhere else it is an undefined identifier.
 */
export const CONDITIONAL_COMPONENTS = new Set(['PlaygroundComponent']);

/**
 * The one and only binding in app/src/lib/mdx-scope.ts. No imports are
 * possible, so any other free identifier in an expression is a ReferenceError.
 */
export const MDX_SCOPE = new Set(['user']);

/** Globals an expression may legitimately reach for. */
export const JS_GLOBALS = new Set([
  'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',
  'Math', 'JSON', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Date',
]);

/* ------------------------------------------------------------------ *
 * 2. What the DASHBOARD can hold
 * ------------------------------------------------------------------ */

/**
 * The `case` labels under `mdxJsxFlowElement` in
 * dashboard/src/lib/mdx-utils.ts.
 *
 * Anything else falls to `default:`, which flattens the component to escaped
 * HTML inside an `htmlBlock` node. It still looks right on the site; it stops
 * being a component the moment anyone opens and saves the page.
 */
export const EDITOR_COMPONENTS = new Set([
  'Board', 'BoardCard', 'BoardColumn', 'Callout', 'Card', 'CardGroup', 'CodeGroup',
  'CollectionContent', 'CollectionList', 'Columns', 'Expandable', 'ExpandableGroup',
  'Iframe', 'Image', 'ParamField', 'Request', 'Response', 'ResponseField', 'SVG',
  'Script', 'Step', 'Steps', 'Tab', 'Tabs', 'Update', 'Video',
]);

/** Inline tags mdx-utils turns into marks. Anything else inline is flattened. */
export const EDITOR_INLINE = new Set(['a', 'u', 'kbd', 'Image', 'Video']);

/**
 * The Tiptap `content:` strings, from
 * dashboard/src/components/dashboard/editor/extensions/*Node.ts.
 *
 * ProseMirror drops children that do not fit. There is no warning and no
 * error — the content is simply not in the document the next save writes.
 *
 *   jsx   -> only these component names
 *   code  -> only fenced code blocks
 *   block -> any block content (nothing to check)
 *   none  -> an atom; children are discarded
 */
export const CONTENT_MODEL = {
  Steps: { kind: 'jsx', allow: ['Step'], placeholder: 'a step titled "New Step"' },
  Tabs: { kind: 'jsx', allow: ['Tab'], placeholder: 'tabs titled "Tab 1" and "Tab 2"' },
  Columns: { kind: 'jsx', allow: ['Card'] },
  CardGroup: { kind: 'jsx', allow: ['Card'] },
  ExpandableGroup: { kind: 'jsx', allow: ['Expandable'], placeholder: 'two expandables reading "Add your content here..."' },
  Board: { kind: 'jsx', allow: ['BoardColumn'] },
  BoardColumn: { kind: 'jsx', allow: ['BoardCard'] },
  CodeGroup: { kind: 'code', placeholder: 'example JavaScript and Python fences' },
  Request: { kind: 'code', placeholder: 'an example request.js fence' },
  Response: { kind: 'code', placeholder: 'an example response.json fence' },
  Callout: { kind: 'block' },
  Card: { kind: 'block' },
  Step: { kind: 'block' },
  Tab: { kind: 'block' },
  Expandable: { kind: 'block' },
  ParamField: { kind: 'block' },
  ResponseField: { kind: 'block' },
  Image: { kind: 'none' },
  Video: { kind: 'none' },
  Iframe: { kind: 'none' },
  Script: { kind: 'none' },
  SVG: { kind: 'none' },
  BoardCard: { kind: 'none' },
  CollectionList: { kind: 'none' },
  CollectionContent: { kind: 'none' },
};

/* ------------------------------------------------------------------ *
 * 3. Attributes
 * ------------------------------------------------------------------ */

/**
 * Per component: the attribute names it understands, which are required, and
 * which are closed sets.
 *
 * Names are kebab-case because that is the form the dashboard writes
 * (`createMdxJsxAttributes` camel -> kebab) and reads (`getAttributes` kebab ->
 * camel). A camelCase attribute in a file still works, but the first save
 * rewrites it — churn in every diff for as long as it survives.
 */
export const ATTRS = {
  Callout: { known: ['kind', 'collapsed', 'icon', 'color', 'uid'], enums: { kind: ['info', 'tip', 'alert', 'danger', 'success', 'custom'] } },
  Card: { known: ['title', 'href', 'icon', 'image', 'cta', 'horizontal', 'target', 'uid'], required: ['title'] },
  Columns: { known: ['cols', 'uid'], enums: { cols: ['1', '2', '3', '4'] } },
  CardGroup: { known: ['cols', 'uid'], enums: { cols: ['1', '2', '3', '4'] } },
  CodeGroup: { known: ['tabs', 'show-lines', 'uid'] },
  Request: { known: ['tabs', 'show-lines', 'uid'] },
  Response: { known: ['tabs', 'show-lines', 'dropdown', 'uid'] },
  Expandable: { known: ['title', 'default-open', 'uid'], required: ['title'] },
  ExpandableGroup: { known: ['uid'] },
  Steps: { known: ['uid'] },
  Step: { known: ['title', 'icon', 'title-type', 'uid'], required: ['title'], enums: { 'title-type': ['p', 'h2', 'h3'] } },
  Tabs: { known: ['uid'] },
  Tab: { known: ['title', 'icon', 'uid'], required: ['title'] },
  // `priority`, `fetchPriority`, `sizes` and `className` are camelCase on purpose:
  // Image.tsx declares them that way, and the preprocessor itself injects
  // `fetchPriority="high"` into the first two images on every page.
  Image: { known: ['src', 'alt', 'width', 'height', 'caption', 'style', 'priority', 'fetchPriority', 'sizes', 'className', 'uid'], required: ['src', 'alt'] },
  Video: { known: ['src', 'width', 'height', 'uid'], required: ['src'] },
  Iframe: { known: ['src', 'title', 'width', 'height', 'allow-full-screen', 'frame-border', 'loading', 'sandbox', 'style', 'iframe-id', 'scripts', 'display-mode', 'uid'], required: ['src'] },
  ParamField: { known: ['path', 'body', 'query', 'header', 'param-type', 'required', 'deprecated', 'show-location', 'enum', 'uid'] },
  ResponseField: { known: ['name', 'field-type', 'required', 'deprecated', 'enum', 'uid'], required: ['name'] },
  Update: { known: ['label', 'description', 'tags', 'uid'], required: ['label'] },
  Board: { known: ['title', 'columns', 'uid'] },
  BoardColumn: { known: ['title', 'color', 'icon', 'uid'], required: ['title'], enums: { color: ['0', '1', '2', '3', '4', '5', '6', '7', '8'] } },
  BoardCard: { known: ['title', 'description', 'icon', 'due-date', 'author', 'created-at', 'uid'], required: ['title'] },
  CollectionList: { known: ['node', 'layout', 'cols', 'card-variant', 'default-open'], required: ['node'], enums: { layout: ['cards', 'accordion', 'list', 'links'], cols: ['1', '2', '3', '4'], 'card-variant': ['default', 'horizontal', 'centered'] } },
  CollectionContent: { known: ['node', 'default-expanded'], required: ['node'] },
  SVG: { known: ['src', 'uid'], required: ['src'] },
  MermaidDiagram: { known: ['chart'], required: ['chart'] },
};

/**
 * The camelCase prop names the app really does destructure, so a checker does
 * not report the platform's own spelling as a mistake. Everything else the app
 * reads is kebab-case — `param-type`, `show-lines`, `default-open`, `field-type`.
 */
export const CAMEL_PROPS = new Set(['titleType', 'fetchPriority', 'className']);

/** Attributes whose value is read as a Lucide icon name. */
export const ICON_ATTRS = new Set(['icon']);

/** Lucide names are kebab-case; the app PascalCases them and a miss renders nothing. */
export const LUCIDE_NAME = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

/* ------------------------------------------------------------------ *
 * 4. Code fences
 * ------------------------------------------------------------------ */

/**
 * Pass 2 of the app's preprocessor rebuilds every fence's meta string from
 * scratch and keeps only these, plus one bare identifier (which becomes
 * `title="…"` when it contains a dot or a slash). Everything else is deleted
 * before the parser ever sees it.
 */
export const FENCE_META_PROPS = new Set(['highlight', 'focus', 'show-lines', 'wrap']);

/* ------------------------------------------------------------------ *
 * 5. HTML
 * ------------------------------------------------------------------ */

/** Lowercase tags React renders as intrinsics — never "undefined component". */
export const HTML_ELEMENTS = new Set(
  ('a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption ' +
    'cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset ' +
    'figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ' +
    'ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup ' +
    'option output p param picture pre progress q rp rt ruby s samp script section select slot small ' +
    'source span strong style sub summary sup svg table tbody td template textarea tfoot th thead ' +
    'time title tr track u ul var video wbr').split(' ')
);
