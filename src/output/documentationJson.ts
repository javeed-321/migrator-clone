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

/** A leaf page. `path` is the slug, which doubles as the MDX file path. */
export type DocPage = {
  title: string;
  path: string;
  icon?: string;
};

/** A sidebar section. `pages` may hold pages and further groups. */
export type DocGroup = {
  group: string;
  icon?: string;
  expandable?: boolean;
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

export type DocumentationConfig = {
  name: string;
  initialRoute: string;
  colors: DocColors;
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
  /**
   * Real page titles by slug, when the fetch stage produced them. Without this
   * the title is derived from the slug: `docs/get-started` -> `Get Started`.
   */
  titles?: Record<string, string> | Map<string, string>;
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
};

const DEFAULT_COLORS: DocColors = {
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
  return { title: lookupTitle(slug, ctx.opts.titles) ?? titleFromSlug(slug), path: slug };
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
    colors: opts.colors ?? DEFAULT_COLORS,
    navigation: { tabs: built },
  };
}
