import type { NavigationEntry } from "../types/nav";
import { convertStrToTitle } from "../utils/strings";

/**
 * Final step: turn the scraped nav trees into a Documentation.AI
 * `documentation.json`.
 *
 * Schema per https://documentation.ai/docs/customize/site-configuration and
 * https://documentation.ai/docs/organize/overview:
 *
 *   { name, initialRoute, colors, navigation: { tabs: [...] } }
 *
 * The rule that shapes this whole file is Documentation.AI's **one-child rule**:
 * a tab holds exactly one of `pages`, `groups` or `dropdowns` — never a mix.
 * Our scraped trees do not respect that; a tab can come back holding both bare
 * slugs and groups side by side, so `toTabChildren` normalises it.
 *
 * Inside a group the rule relaxes: a `pages` array may mix page entries and
 * nested groups, which maps straight onto our recursive `NavigationEntry`.
 */

/**
 * The five HTTP methods `[DAI §26]` lists for the sidebar badge, plus the two the
 * OpenAPI spec allows. Uppercase is not a style choice — plan §5.2: a lowercase
 * method does not match and **silently fails**.
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

/**
 * What a page-level `openapi` binding injects.
 *
 * `"auto"` writes the whole endpoint page — parameters, descriptions, playground.
 * `"custom"` injects **only** the playground and the request/response examples and
 * leaves the page's own content alone, which is why plan §5.2 makes it the right
 * default for a ReadMe migration: the `.md` carries hand-written prose that must
 * survive `[PIT Phase 2]`.
 */
export type OpenApiMode = "auto" | "custom";

/**
 * One page bound to one endpoint in one spec file.
 *
 * The three parts are kept apart here and joined only when the entry is written,
 * because the joined form — `"<spec> <METHOD> <route>"` — is a string the target
 * parses, and building it by hand at a call site is how a lowercase method or a
 * missing space gets shipped. Both fail silently `[PLAN §5.2]`.
 */
export type OpenApiBinding = {
  /** Project-relative path to the spec file, e.g. `api-reference/cardenquiry.json`. */
  spec: string;
  method: HttpMethod;
  /** The route as the spec spells it, `{param}` placeholders intact. */
  route: string;
  mode: OpenApiMode;
};

/** A leaf page. `path` is the slug, which doubles as the MDX file path. */
export type DocPage = {
  title: string;
  path: string;
  icon?: string;
  /** The HTTP badge on the sidebar link `[DAI §26]`. */
  method?: HttpMethod;
  /** Page-level binding, `"<spec path> METHOD /endpoint"` `[LIVE-DAI …/openapi-import]`. */
  openapi?: string;
  "openapi-mode"?: OpenApiMode;
};

/** A sidebar section. `pages` may hold pages and further groups. */
export type DocGroup = {
  group: string;
  icon?: string;
  expandable?: boolean;
  /**
   * Group-level binding: the path to an OpenAPI 3.0+ spec inside the project
   * (`.json`, `.yaml` and `.yml` are all accepted). Every endpoint in it is
   * generated as its own page `[DAI §26]` `[LIVE-DAI …/site-configuration]`.
   */
  openapi?: string;
  /** Endpoints to exclude from that generation, each `"METHOD /path"`. */
  "hidden-apis"?: string[];
  pages: (DocPage | DocGroup)[];
};

/** A top-level tab. Carries `groups` or `pages`, never both. */
export type DocTab = {
  tab: string;
  icon?: string;
} & ({ groups: DocGroup[] } | { pages: DocPage[] });

export type DocColors = {
  light: { brand: string; heading: string; text: string };
  dark: { brand: string; heading: string; text: string };
};

/**
 * The branding keys, all optional. Read off the app's own config type
 * `[APP src/types/documentations.ts:362-382]`.
 *
 * **`logo-small-*` is not the favicon.** Both navbars render it as the logo on a
 * narrow viewport — `block lg:hidden` around an `<Image className="h-full w-auto">`
 * `[APP NavbarClassic.tsx:129-178, NavbarAtlas.tsx:136-180]` — so a 16×16 `.ico`
 * put here is stretched across the mobile header. The browser tab is `favicon`,
 * a key of its own, and the only one `layout.tsx` looks at.
 */
export type DocLogos = {
  "logo-light"?: string;
  "logo-dark"?: string;
  /** The navbar logo below the `lg` breakpoint, per theme. */
  "logo-small-light"?: string;
  "logo-small-dark"?: string;
  /**
   * The browser-tab icon.
   *
   * Validated before use: anything that does not start with `http` or `/` is
   * discarded and the platform default stands, silently
   * `[APP src/app/site/[subdomain]/layout.tsx:45-54]`. So a project-relative
   * path has to carry its leading slash — unlike `css`, which must not.
   */
  favicon?: string;
};

/** One stylesheet. `src` is a project-relative path or an HTTPS URL. */
export type DocStylesheet = { src: string };

export type DocumentationConfig = DocLogos & {
  name: string;
  initialRoute: string;
  colors: DocColors;
  /** Loaded after the theme, in order `[LIVE-DAI /docs/customize/custom-css]`. */
  css?: DocStylesheet[];
  navigation: { tabs: DocTab[] };
};

/** One scraped tab. Structurally what the API's `TabResult` already is. */
export type TabInput = {
  name: string;
  url: string;
  navigation: NavigationEntry[];
};

export type BuildOptions = {
  /** Site name. Falls back to the host derived from `site`. */
  name?: string;
  /** The entry URL, used only to derive a fallback name. */
  site?: string;
  colors?: DocColors;
  /** Logo and favicon URLs, from the brand stage. */
  logos?: DocLogos;
  /** Stylesheets to register, e.g. `[{ src: "styles/brand.css" }]`. */
  css?: DocStylesheet[];
  /**
   * Real page titles by slug, when the fetch stage produced them. Without this
   * the title is derived from the slug: `docs/get-started` -> `Get Started`.
   */
  titles?: Record<string, string> | Map<string, string>;
  /**
   * Spec bindings by slug, for the pages that carried an OpenAPI definition.
   *
   * Keyed the same way `titles` is, so both are looked up off the one thing a
   * navigation entry actually holds. A slug with no binding is an ordinary page
   * and gets none of the three keys — which is what a guide sitting under
   * `/reference/` needs.
   */
  openapi?: Record<string, OpenApiBinding> | Map<string, OpenApiBinding>;
  /**
   * Drop a slug that already appeared in an earlier tab. On by default: ReadMe
   * sidebars carry `type: "link"` entries that point back at pages another tab
   * owns (14 of them on developers.miro.com), and a duplicate `path` means the
   * same page rendered twice in the sidebar.
   */
  dedupe?: boolean;
  /**
   * Title-case a group name that is entirely uppercase. ReadMe authors shout
   * their category names — Capillary ships `CAPILLARY DATA PLATFORM` — which
   * reads badly next to derived page titles. Only applies when the name has no
   * lowercase letters at all, so `API` and `OAuth` survive untouched.
   */
  normalizeGroupCase?: boolean;
  /**
   * Folder the `.mdx` files were written to, prepended to every `path`.
   *
   * Omit it when the pages sit beside `documentation.json`. Pass `"pages"` when
   * they are in `pages/` — the path has to name the real file either way.
   */
  pathPrefix?: string;
};

/** Documentation.AI's own defaults, chosen for contrast. Exported so the brand
 * stage can override `brand` alone and leave `heading`/`text` untouched. */
export const DEFAULT_COLORS: DocColors = {
  light: { brand: "#3143e3", heading: "#1a1a1a", text: "#374151" },
  dark: { brand: "#85a1ff", heading: "#f2f2f2", text: "#c1c1c1" },
};

/**
 * Lucide icon per tab, matched on the words ReadMe modules actually use.
 * Unmatched tabs simply get no icon, which is valid.
 */
const TAB_ICONS: [RegExp, string][] = [
  [/api|reference/i, "code"],
  [/changelog|release/i, "megaphone"],
  [/recipe|tutorial|example/i, "chef-hat"],
  [/discuss|community|forum/i, "messages-square"],
  [/guide|doc/i, "book"],
];

function tabIcon(name: string): string | undefined {
  return TAB_ICONS.find(([pattern]) => pattern.test(name))?.[1];
}

/** `docs/get-started` -> `Get Started`. */
function titleFromSlug(slug: string): string {
  const last = slug.split("/").filter(Boolean).at(-1) ?? slug;
  return convertStrToTitle(last) || slug;
}

function lookupTitle(slug: string, titles: BuildOptions["titles"]): string | undefined {
  if (!titles) return undefined;
  return titles instanceof Map ? titles.get(slug) : titles[slug];
}

function lookupBinding(
  slug: string,
  bindings: BuildOptions["openapi"]
): OpenApiBinding | undefined {
  if (!bindings) return undefined;
  return bindings instanceof Map ? bindings.get(slug) : bindings[slug];
}

/**
 * The three keys that turn a page into an endpoint page.
 *
 * `method` is the sidebar badge; `openapi` is the binding the playground reads;
 * `openapi-mode` decides whether the spec writes the whole page or only adds the
 * playground to the one already there `[LIVE-DAI …/openapi-import]`.
 *
 * The method is uppercased once more on the way out. It is already uppercase by
 * construction, and this costs nothing next to a binding that matches no
 * operation and reports no error.
 */
function openApiKeys(binding: OpenApiBinding): Partial<DocPage> {
  const method = binding.method.toUpperCase() as HttpMethod;
  return {
    method,
    openapi: `${binding.spec} ${method} ${binding.route}`,
    "openapi-mode": binding.mode,
  };
}

/** Uppercase-only names get title-cased; anything with a lowercase letter is left alone. */
function normalizeGroup(name: string, enabled: boolean): string {
  if (!enabled || /[a-z]/.test(name)) return name;
  return name
    .split(/\s+/)
    .map((word) => (word[0] ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word))
    .join(" ");
}

type Ctx = {
  seen: Set<string>;
  opts: BuildOptions;
};

function toPage(slug: string, ctx: Ctx): DocPage | undefined {
  if (ctx.opts.dedupe !== false) {
    if (ctx.seen.has(slug)) return undefined;
    ctx.seen.add(slug);
  }
  // The prefix is where the `.mdx` actually is. A `path` names a file, so a page
  // written to `pages/docs/intro.mdx` must be listed as `pages/docs/intro` —
  // anything else is a sidebar entry pointing at nothing.
  const prefix = ctx.opts.pathPrefix?.replace(/^\/+|\/+$/g, "");
  const binding = lookupBinding(slug, ctx.opts.openapi);
  return {
    title: lookupTitle(slug, ctx.opts.titles) ?? titleFromSlug(slug),
    path: prefix ? `${prefix}/${slug}` : slug,
    ...(binding ? openApiKeys(binding) : {}),
  };
}

function toGroup(entry: Exclude<NavigationEntry, string>, ctx: Ctx): DocGroup | undefined {
  const pages = entry.pages
    .map((child) => toEntry(child, ctx))
    .filter((child): child is DocPage | DocGroup => child !== undefined);

  // A group emptied by deduping is not a group any more.
  if (pages.length === 0) return undefined;

  return {
    group: normalizeGroup(entry.group, ctx.opts.normalizeGroupCase !== false),
    pages,
  };
}

function toEntry(entry: NavigationEntry, ctx: Ctx): DocPage | DocGroup | undefined {
  return typeof entry === "string" ? toPage(entry, ctx) : toGroup(entry, ctx);
}

/**
 * Enforce the one-child rule.
 *
 * All groups -> `groups`. All bare slugs -> `pages`. A mix has to become one or
 * the other, so the loose pages are collected into a single group named after
 * the tab and kept first, which is where a landing page belongs anyway.
 */
function toTabChildren(
  tabName: string,
  navigation: NavigationEntry[],
  ctx: Ctx
): { groups: DocGroup[] } | { pages: DocPage[] } | undefined {
  const groups: DocGroup[] = [];
  const loose: DocPage[] = [];

  for (const entry of navigation) {
    const built = toEntry(entry, ctx);
    if (!built) continue;
    if ("group" in built) groups.push(built);
    else loose.push(built);
  }

  if (groups.length === 0 && loose.length === 0) return undefined;
  if (groups.length === 0) return { pages: loose };
  if (loose.length === 0) return { groups };

  return { groups: [{ group: tabName, pages: loose }, ...groups] };
}

/** First page path in document order — what `initialRoute` should point at. */
function firstPath(tabs: DocTab[]): string {
  const walk = (entries: (DocPage | DocGroup)[]): string | undefined => {
    for (const entry of entries) {
      if ("path" in entry) return entry.path;
      const nested = walk(entry.pages);
      if (nested) return nested;
    }
    return undefined;
  };

  for (const tab of tabs) {
    const found = "groups" in tab ? walk(tab.groups) : walk(tab.pages);
    if (found) return found;
  }
  return "";
}

/**
 * Build the config.
 *
 * Tabs that produce no pages are omitted — the scrape already drops empty tabs,
 * but deduping can empty one here too.
 */
export function buildDocumentationJson(
  tabs: TabInput[],
  opts: BuildOptions = {}
): DocumentationConfig {
  const ctx: Ctx = { seen: new Set<string>(), opts };

  const built: DocTab[] = [];
  for (const tab of tabs) {
    const children = toTabChildren(tab.name, tab.navigation, ctx);
    if (!children) continue;

    const icon = tabIcon(tab.name);
    built.push({ tab: tab.name, ...(icon ? { icon } : {}), ...children } as DocTab);
  }

  let name = opts.name;
  if (!name && opts.site) {
    try {
      name = new URL(opts.site).hostname;
    } catch {
      /* fall through to the default below */
    }
  }

  return {
    name: name || "Documentation",
    initialRoute: firstPath(built),
    // Spread before `colors` so a logo key can never displace one of the fields
    // below it, however the brand stage is extended later.
    ...(opts.logos ?? {}),
    colors: opts.colors ?? DEFAULT_COLORS,
    ...(opts.css && opts.css.length > 0 ? { css: opts.css } : {}),
    navigation: { tabs: built },
  };
}
