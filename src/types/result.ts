/**
 * Mirrors @mintlify/scraping's `Result<T>`.
 *
 * Every step in the pipeline returns one of these instead of throwing, so a
 * single 404 in a 400-page site never kills the run. `data` is present even on
 * failure — that is how step 9 knows *which* path to prune from the nav tree.
 */
export type Result<T> = { success: true; data?: T } | { success: false; message: string; data?: T };

/** `[originalUrl, writtenSlug]` — the shape every page-level Result carries. */
export type PageResultData = [string, string];
