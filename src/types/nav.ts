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

/**
 * What one tab's walk hands back.
 *
 * Navigation only. This project stops at the structure — fetching each page and
 * converting it is a separate stage, which reads these slugs and requests
 * `<slug>.md` from ReadMe directly.
 */
export type DiscoveryReport = {
  site: string;
  vendor: string;
  navigation: NavigationEntry[];
  tabs: Tab[];
};
