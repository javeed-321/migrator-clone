import type { NavigationEntry } from "@/src/types/nav";

/** One top-level tab and the nav tree its own sidebar produced. */
export type TabResult = {
  name: string;
  /** The path the tab points at, e.g. `/docs`. */
  url: string;
  navigation: NavigationEntry[];
  groups: number;
  pages: number;
  /** False when this tab failed to scrape — `navigation` is then empty. */
  ok: boolean;
  message?: string;
};

export type FetchPagesResponse = {
  ok: boolean;
  message?: string;
  /** The entry URL the run started from. */
  site: string;
  vendor: string;
  tabs: TabResult[];
};
