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

/** A tab that produced no page links and was dropped from `tabs`. */
export type SkippedTab = {
  name: string;
  url: string;
  reason: string;
};

export type FetchPagesResponse = {
  ok: boolean;
  message?: string;
  /** The entry URL the run started from. */
  site: string;
  vendor: string;
  tabs: TabResult[];
  /** Tabs removed for having zero links. Present only when something was dropped. */
  skipped?: SkippedTab[];
};
