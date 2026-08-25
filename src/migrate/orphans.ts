import type { PageRef } from "../download/types";
import type { TabInput } from "../output/documentationJson";
import type { NavigationEntry } from "../types/nav";

/**
 * Navigation entries for the pages the sidebar walk could not reach.
 *
 * ## The gap this closes
 *
 * Discovery produces two lists and they are not the same length. The sidebar
 * walk answers *what is the navigation*, `llms.txt` answers *what pages exist*,
 * and the download runs on the union — so a page listed only by `llms.txt` is
 * fetched, converted and written to `pages/<slug>.mdx` with nothing in
 * `documentation.json` pointing at it.
 *
 * That combination is the one that is always wrong. Either the page is in scope,
 * in which case it needs an entry; or it is not, in which case it should never
 * have been fetched. Writing the file and omitting the link costs the whole
 * download and delivers a page no reader can reach and no reviewer will notice
 * is broken.
 *
 * On modulr.readme.io that is 190 of 371 pages — every `reference/*` endpoint.
 *
 * ## Why the section heading is the grouping
 *
 * `llms.txt` is flat. Its only structure is the `##` heading each entry sits
 * under, and that heading is a short, stable set — `Guides`, `API Reference`,
 * `Recipes`, `Changelog`, `Pages` across every ReadMe site checked. It is not
 * the sidebar the source site had, and this module does not pretend otherwise:
 * the report says the grouping came from `llms.txt` so a human can regroup it.
 *
 * A guessed group that is reachable beats a perfect group that is not.
 */

/** The tab that takes pages whose `llms.txt` entry carried no `##` heading. */
const FALLBACK_TAB = "Other pages";

/** Case-insensitive, so a `Guides` section finds a `guides` tab. */
function sameName(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

/**
 * Slug -> its `llms.txt` section, for the slugs being placed.
 *
 * First ref wins. A slug appearing twice in `llms.txt` under two headings is
 * malformed input, and picking the first keeps the output stable across runs
 * rather than depending on iteration order.
 */
function sectionsFor(slugs: Set<string>, refs: PageRef[]): Map<string, string> {
  const sections = new Map<string, string>();

  for (const ref of refs) {
    if (!slugs.has(ref.slug) || sections.has(ref.slug)) continue;
    sections.set(ref.slug, ref.section.trim() || FALLBACK_TAB);
  }

  return sections;
}

/**
 * The tab list with the unreachable pages folded into it.
 *
 * Placement, per section:
 *
 * - a tab of that name exists -> a group is appended to it
 * - no such tab -> a new tab of that name is appended, holding the pages flat
 *
 * The new tabs go **last**, which matters more than it looks: the config builder
 * dedupes by slug and keeps the first occurrence, so appending guarantees a page
 * the real sidebar owns is never displaced by this one's guess at where it goes.
 *
 * `slugs` should be the pages that actually **converted**, not everything
 * discovery listed — an entry for a page whose `.mdx` was never written is a
 * sidebar link to a 404, which is worse than the orphan it replaces.
 */
export function tabsForUnreachable(
  slugs: string[],
  refs: PageRef[],
  tabs: TabInput[],
): TabInput[] {
  if (slugs.length === 0) return tabs;

  const sections = sectionsFor(new Set(slugs), refs);

  // Insertion-ordered, so sections come out in the order `llms.txt` listed them
  // and a re-run produces the same file.
  const bySection = new Map<string, string[]>();
  for (const slug of [...slugs].sort()) {
    const section = sections.get(slug) ?? FALLBACK_TAB;
    const existing = bySection.get(section);
    if (existing) existing.push(slug);
    else bySection.set(section, [slug]);
  }

  // Copied rather than mutated: `discovery.tabs` is also what the report counts
  // pages from, and a stage that quietly grows its own input is how two numbers
  // that should agree stop agreeing.
  const result: TabInput[] = tabs.map((tab) => ({ ...tab, navigation: [...tab.navigation] }));

  for (const [section, pages] of bySection) {
    const host = result.find((tab) => sameName(tab.name, section));

    if (host) {
      const group: NavigationEntry = { group: section, pages };
      host.navigation.push(group);
      continue;
    }

    result.push({
      name: section,
      // Unused by the config builder — tabs are named, not linked — but the type
      // is shared with the scraper's own tabs, where it is the path that was
      // walked. The section is the closest true thing to say.
      url: `llms.txt#${section}`,
      navigation: [...pages],
    });
  }

  return result;
}

/** One row of what `tabsForUnreachable` did, for the report. */
export type UnreachablePlacement = {
  /** The `llms.txt` section the pages came from. */
  section: string;
  count: number;
  /** `merged` into an existing tab, or placed in a `new-tab`. */
  placement: "merged" | "new-tab";
};

/** Where each section ended up, without rebuilding the tabs. */
export function placementsForUnreachable(
  slugs: string[],
  refs: PageRef[],
  tabs: TabInput[],
): UnreachablePlacement[] {
  if (slugs.length === 0) return [];

  const sections = sectionsFor(new Set(slugs), refs);
  const counts = new Map<string, number>();

  for (const slug of [...slugs].sort()) {
    const section = sections.get(slug) ?? FALLBACK_TAB;
    counts.set(section, (counts.get(section) ?? 0) + 1);
  }

  return [...counts].map(([section, count]) => ({
    section,
    count,
    placement: tabs.some((tab) => sameName(tab.name, section)) ? "merged" : "new-tab",
  }));
}
