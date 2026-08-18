/**
 * A marker appended to a group's landing page when that page's slug is a prefix
 * of one of its children (`/guides` heading `/guides/setup`).
 *
 * It never changes where anything is written. Upstream strips it again in step
 * 9b and its only lasting effect is a boolean that makes the page's frontmatter
 * title "Overview" instead of its H1 — i.e. it matters in the MDX stage this
 * build deliberately stops before.
 *
 * The match is a plain `startsWith`, so it also fires on prefix-sharing
 * siblings (`/docs/loyalty` vs `/docs/loyalty-a`). Harmless, since the marker
 * is stripped either way.
 */
export const OVERVIEW_PAGE_SLUG = "/clone_overview";

/** How many pages are fetched concurrently per chunk. */
export const CHUNK_SIZE = 16;

/**
 * Safety cap on the paginated-list fallback in `nav/list.ts`.
 *
 * ReadMe's own changelog runs to 22 pages, so this leaves headroom without
 * letting a large Discussions forum turn one tab into hundreds of fetches.
 * Hitting the cap is logged rather than silently truncated.
 */
export const MAX_LIST_PAGES = 25;

export const SPACES = " ".repeat(13);

export const NAV_FAILURE_MSG = `failed to retrieve nav items from HTML.
${SPACES}Could not find the sidebar element. This build only implements ReadMe selectors (nav.rm-Sidebar).`;


/**
 * Where downloaded page images are written, relative to the project root, and the
 * path the MDX points at. One constant so the folder on disk and the `src` in the
 * page can never drift apart.
 */
export const IMAGE_DIR = "images";
