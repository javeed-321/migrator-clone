import type { ScrapedPage } from "./result";

/**
 * The nav tree the sidebar walk produces.
 *
 * A bare `string` is a leaf page (its slug, which doubles as the output file
 * path). A `NavigationGroup` is a sidebar section with children. This is the
 * same recursive shape @mintlify/models exports as `NavigationEntry`.
 */
export type NavigationEntry = string | NavigationGroup;

export type NavigationGroup = {
  group: string;
  pages: NavigationEntry[];
};

/** A top-level tab from the site header. Each one is scraped as its own site. */
export type Tab = {
  name: string;
  url: string;
};

/** Minimal docs.json shape — navigation is the part this project actually derives. */
export type DocsConfig = {
  $schema: string;
  name: string;
  navigation: NavigationEntry[];
  tabs?: Tab[];
};

/** What a full discovery run hands back to the CLI or the API route. */
export type DiscoveryReport = {
  /** Every page converted to MDX. Empty when `skipFetch` is on. */
  pages: ScrapedPage[];
  site: string;
  vendor: string;
  /** Every URL the sidebar walk produced, before partitioning. */
  discovered: string[];
  internal: string[];
  external: string[];
  root: string[];
  /** URLs that failed to fetch, already pruned from `navigation`. */
  failed: { url: string; message: string }[];
  navigation: NavigationEntry[];
  tabs: Tab[];
};
