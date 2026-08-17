import { toMarkdownUrl } from "../download/fetch";
import type { PageRef } from "../download/types";
import { removeLeadingSlash, removeTrailingSlash } from "../utils/strings";

/**
 * Step 1 of conversion: a `documentation.json` in, the list of pages to fetch out.
 *
 * Discovery already walked the sidebar and wrote every page's slug into the
 * config as a `path`. Those slugs are exactly what ReadMe serves markdown for, so
 * the conversion stage needs no crawling of its own — it reads the config, glues
 * each `path` onto the site origin, and appends `.md`.
 *
 * The input is treated as untrusted: it arrives from a request body or a file a
 * human has edited, so every node is checked rather than cast. Anything that is
 * not a usable page is *reported* in `skipped` rather than dropped silently —
 * a page missing from a migration is the failure mode that is hardest to notice.
 */

/** A page to convert, plus where it sat in the navigation. */
export type ConvertPage = PageRef & {
  /** The tab it came from. */
  tab: string;
  /** Group breadcrumb, outermost first. Empty when a tab holds the page directly. */
  groups: string[];
  /** Position in document order, after deduping. */
  order: number;
};

export type SkippedPage = { path: string; reason: string };

export type PageList = {
  /** The origin every URL was built from. */
  site: string;
  /** `name` from the config, when it has one. */
  name: string;
  pages: ConvertPage[];
  /** Paths that appeared more than once. The first occurrence is the one kept. */
  duplicates: string[];
  skipped: SkippedPage[];
};

export type PageListOptions = {
  /** The docs site, e.g. `https://docs.capillarytech.com`. Only its origin is used. */
  site: string;
  /** Keep only slugs under this prefix, e.g. `docs/loyalty`. */
  filter?: string;
  /** Stop after this many pages, for iterating on a slice. */
  limit?: number;
};

/**
 * Keys whose value is a list of navigation children.
 *
 * `pages` and `groups` are what the builder emits. `dropdowns` and `dimensions`
 * are the other two containers Documentation.AI accepts, so a hand-written or
 * dashboard-exported config walks correctly too.
 */
const CHILD_KEYS = ["pages", "groups", "dropdowns", "dimensions"] as const;

/** Keys a container might carry its display name under, most specific first. */
const NAME_KEYS = ["group", "tab", "dropdown", "dimension", "title", "name"] as const;

type NavNode = Record<string, unknown>;

/**
 * The child lists on a node, in the order the config declares them.
 *
 * Walking `CHILD_KEYS` directly would impose its own order — every loose page
 * ahead of every dropdown — so a page's position in the output would not match
 * its position in the file. Object keys preserve insertion order, so reading them
 * off the node keeps document order intact.
 */
function childKeysOf(node: NavNode): string[] {
  return Object.keys(node).filter((key) => (CHILD_KEYS as readonly string[]).includes(key));
}

function isRecord(value: unknown): value is NavNode {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(node: NavNode, key: string): string | undefined {
  const value = node[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function nameOf(node: NavNode): string {
  for (const key of NAME_KEYS) {
    const found = readString(node, key);
    if (found) return found;
  }
  return "";
}

/**
 * `path` -> the slug the site actually serves.
 *
 * Returns a reason instead of a slug for anything that is not a local page. An
 * absolute URL is the common one: discovery leaves external links in the tree as
 * stubs, and there is no markdown to fetch for a page on someone else's domain.
 */
function toSlug(path: string): { slug: string } | { reason: string } {
  const trimmed = path.trim();
  if (!trimmed) return { reason: "empty path" };
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return { reason: `not a local page: ${trimmed}` };
  if (trimmed.startsWith("#")) return { reason: `anchor only: ${trimmed}` };

  // A config may spell the path with or without a leading slash, and a
  // hand-edited one sometimes keeps the file extension.
  const slug = removeLeadingSlash(removeTrailingSlash(trimmed)).replace(/\.mdx?$/i, "");
  if (!slug) return { reason: "empty path" };

  return { slug };
}

/** `docs/loyalty` matches `docs/loyalty` and `docs/loyalty/*`, not `docs/loyalty-2`. */
function matchesFilter(slug: string, filter: string): boolean {
  const prefix = removeLeadingSlash(removeTrailingSlash(filter));
  return slug === prefix || slug.startsWith(prefix + "/");
}

/** Same classification the download stage uses, so both stages label a page identically. */
function kindForSlug(slug: string, section: string): PageRef["kind"] {
  if (slug.startsWith("reference/") || /api/i.test(section)) return "api";
  if (slug.startsWith("page/")) return "page";
  return "guide";
}

/** `docs/get-started` -> `Get Started`, for a config whose entry has no title. */
function titleFromSlug(slug: string): string {
  const last = slug.split("/").filter(Boolean).at(-1) ?? slug;
  return last
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())
    .trim();
}

type WalkContext = {
  origin: string;
  tab: string;
  groups: string[];
  /** First slug wins; later ones are recorded as duplicates. */
  seen: Map<string, ConvertPage>;
  duplicates: string[];
  skipped: SkippedPage[];
};

function addPage(node: NavNode, path: string, ctx: WalkContext): void {
  const resolved = toSlug(path);
  if ("reason" in resolved) {
    ctx.skipped.push({ path, reason: resolved.reason });
    return;
  }

  const { slug } = resolved;
  if (ctx.seen.has(slug)) {
    ctx.duplicates.push(slug);
    return;
  }

  // The origin only — a `path` already carries the full pathname, so joining it
  // onto an entry URL like `https://host/docs` would double the `/docs`.
  const url = new URL("/" + slug, ctx.origin).toString();
  const section = ctx.groups.at(-1) ?? ctx.tab;

  ctx.seen.set(slug, {
    title: readString(node, "title") ?? titleFromSlug(slug),
    description: readString(node, "description") ?? "",
    source: toMarkdownUrl(url),
    url,
    slug,
    section,
    kind: kindForSlug(slug, section),
    tab: ctx.tab,
    groups: [...ctx.groups],
    order: ctx.seen.size,
  });
}

/**
 * One navigation node.
 *
 * A node with a `path` is a leaf page. Anything else is a container, and is
 * walked through every child list it carries — a group's `pages` may hold both
 * pages and further groups, so this is mutually recursive with itself by design.
 */
function walkNode(value: unknown, ctx: WalkContext): void {
  if (Array.isArray(value)) {
    for (const child of value) walkNode(child, ctx);
    return;
  }
  if (!isRecord(value)) return;

  // Any string `path` makes this a page, including a blank one — an entry that
  // means to be a page but names none is a fault to report, not a container to
  // walk into.
  if (typeof value.path === "string") {
    addPage(value, value.path, ctx);
    return;
  }

  const name = nameOf(value);
  const groups = name ? [...ctx.groups, name] : ctx.groups;
  for (const key of childKeysOf(value)) {
    walkNode(value[key], { ...ctx, groups });
  }
}

/**
 * Every page in a `documentation.json`, as a `.md` URL to fetch.
 *
 * Throws only on input that cannot be interpreted at all — a config with no
 * navigation, or a site that is not a URL. A config that is *shaped* right but
 * yields nothing returns an empty list, which the caller reports as its own
 * (quite different) problem.
 */
export function pagesFromDocumentationJson(config: unknown, opts: PageListOptions): PageList {
  const origin = new URL(opts.site).origin;

  if (!isRecord(config)) {
    throw new Error("documentation.json must be a JSON object");
  }

  const navigation = config.navigation;
  if (!isRecord(navigation) && !Array.isArray(navigation)) {
    throw new Error("documentation.json has no `navigation` — nothing to convert");
  }

  const ctx: WalkContext = {
    origin,
    tab: "",
    groups: [],
    seen: new Map(),
    duplicates: [],
    skipped: [],
  };

  if (Array.isArray(navigation)) {
    // A bare list of entries, with no tabs to attribute pages to.
    walkNode(navigation, ctx);
  } else {
    // `tabs` is walked one tab at a time so each page records which tab it came
    // from; the other containers a config may put straight under `navigation`
    // are walked as-is. Key order is the file's, so output order is too.
    for (const key of Object.keys(navigation)) {
      if (key === "tabs") {
        for (const tab of Array.isArray(navigation.tabs) ? navigation.tabs : []) {
          if (!isRecord(tab)) continue;
          walkNode(tab, { ...ctx, tab: nameOf(tab) });
        }
      } else if ((CHILD_KEYS as readonly string[]).includes(key)) {
        walkNode(navigation[key], ctx);
      }
    }
  }

  let pages = [...ctx.seen.values()];

  if (opts.filter) {
    const filter = opts.filter;
    const before = pages.length;
    pages = pages.filter((page) => matchesFilter(page.slug, filter));
    if (pages.length < before) {
      ctx.skipped.push({
        path: filter,
        reason: `${before - pages.length} pages outside the filter`,
      });
    }
  }

  if (opts.limit !== undefined && opts.limit >= 0 && pages.length > opts.limit) {
    ctx.skipped.push({
      path: "",
      reason: `${pages.length - opts.limit} pages past the limit of ${opts.limit}`,
    });
    pages = pages.slice(0, opts.limit);
  }

  // `order` is assigned during the walk, so re-number after filtering to keep it
  // an index into the list actually returned.
  pages = pages.map((page, index) => ({ ...page, order: index }));

  return {
    site: origin,
    name: readString(config, "name") ?? "",
    pages,
    duplicates: ctx.duplicates,
    skipped: ctx.skipped,
  };
}
