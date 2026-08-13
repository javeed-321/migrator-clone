"use client";

import { useMemo, useState } from "react";

import styles from "./page.module.css";
import type { DiscoveryReport, NavigationEntry, NavigationGroup } from "@/src/types/nav";
import { convertStrToTitle } from "@/src/utils/strings";

/** `/api/discover` answers with the report on success and this on failure. */
type ApiFailure = { success: false; message: string };

/** One entry in the strip along the top of the mock. */
type TabView = {
  name: string;
  /** Path on the source site, e.g. `/docs`. Empty for the synthetic "All pages" tab. */
  url: string;
  navigation: NavigationEntry[];
  pages: number;
};

/** A leaf, flattened so the detail pane can look it up without re-walking. */
type PageInfo = {
  slug: string;
  title: string;
  /** Group names from the root down to the page's own group. */
  crumbs: string[];
  depth: number;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chev} ${open ? styles.chevOpen : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/** `docs/getting-started` -> `Getting Started`. */
function slugToTitle(slug: string): string {
  const last = slug.split("/").filter(Boolean).at(-1) ?? slug;
  return convertStrToTitle(last) || slug;
}

function countPages(entries: NavigationEntry[]): number {
  return entries.reduce(
    (total, entry) => total + (typeof entry === "string" ? 1 : countPages(entry.pages)),
    0
  );
}

/**
 * Flattens the tree in sidebar order, remembering each page's group path.
 *
 * Reading order is what makes previous/next in the detail pane meaningful, and
 * the crumbs are the only way to show which section a page sits in once it has
 * been selected out of context.
 */
function flatten(entries: NavigationEntry[], crumbs: string[] = []): PageInfo[] {
  const out: PageInfo[] = [];

  for (const entry of entries) {
    if (typeof entry === "string") {
      out.push({ slug: entry, title: slugToTitle(entry), crumbs, depth: crumbs.length });
    } else {
      out.push(...flatten(entry.pages, [...crumbs, entry.group]));
    }
  }

  return out;
}

/** Keeps only the leaves a predicate accepts, and drops any group left empty. */
function filterTree(
  entries: NavigationEntry[],
  keep: (slug: string) => boolean
): NavigationEntry[] {
  const out: NavigationEntry[] = [];

  for (const entry of entries) {
    if (typeof entry === "string") {
      if (keep(entry)) out.push(entry);
      continue;
    }
    const pages = filterTree(entry.pages, keep);
    if (pages.length) out.push({ group: entry.group, pages });
  }

  return out;
}

/** `/reference` -> `reference`, so it can be matched against a `reference/x` slug. */
function tabPrefix(url: string): string {
  return url.replace(/^https?:\/\/[^/]+/, "").replace(/^\/+|\/+$/g, "");
}

/**
 * Splits the merged navigation into one tree per tab.
 *
 * `scrapeAllSiteTabs` flattens every tab's navigation into a single array before
 * it reaches the report, so tab ownership has to be recovered from the slugs.
 */
function buildTabs(report: DiscoveryReport): TabView[] {
  const all: TabView = {
    name: "All pages",
    url: "",
    navigation: report.navigation,
    pages: countPages(report.navigation),
  };

  const perTab = report.tabs
    .map((tab) => {
      const prefix = tabPrefix(tab.url);
      const navigation = prefix
        ? filterTree(report.navigation, (slug) => slug === prefix || slug.startsWith(`${prefix}/`))
        : [];
      return { name: tab.name || tab.url, url: tab.url, navigation, pages: countPages(navigation) };
    })
    // A tab whose pages never made it into the tree has nothing to show.
    .filter((tab) => tab.pages > 0);

  // With one tab or none, the split adds nothing over the merged tree.
  return perTab.length > 1 ? [all, ...perTab] : [all];
}

/** Wraps the first match of `term` so the search hit is visible in the row. */
function highlight(text: string, term: string) {
  if (!term) return text;
  const at = text.toLowerCase().indexOf(term.toLowerCase());
  if (at === -1) return text;

  return (
    <>
      {text.slice(0, at)}
      <mark className={styles.mark}>{text.slice(at, at + term.length)}</mark>
      {text.slice(at + term.length)}
    </>
  );
}

function Group({
  group,
  depth,
  defaultOpen,
  term,
  selected,
  onSelect,
}: {
  group: NavigationGroup;
  depth: number;
  defaultOpen: boolean;
  term: string;
  selected: string | null;
  onSelect: (slug: string) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li>
      <button
        type="button"
        className={`${styles.row} ${styles.groupRow}`}
        style={{ paddingLeft: `${0.45 + depth * 0.8}rem` }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <Chevron open={open} />
        <span className={styles.rowText}>{group.group}</span>
        <span className={styles.rowCount}>{countPages(group.pages)}</span>
      </button>

      {open && (
        <ul>
          {group.pages.map((entry, i) => (
            <Node
              key={typeof entry === "string" ? `${entry}-${i}` : `${entry.group}-${i}`}
              entry={entry}
              depth={depth + 1}
              defaultOpen={defaultOpen}
              term={term}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function Node({
  entry,
  depth,
  defaultOpen,
  term,
  selected,
  onSelect,
}: {
  entry: NavigationEntry;
  depth: number;
  defaultOpen: boolean;
  term: string;
  selected: string | null;
  onSelect: (slug: string) => void;
}) {
  if (typeof entry !== "string") {
    return (
      <Group
        group={entry}
        depth={depth}
        defaultOpen={defaultOpen}
        term={term}
        selected={selected}
        onSelect={onSelect}
      />
    );
  }

  const active = entry === selected;

  return (
    <li>
      <button
        type="button"
        className={`${styles.row} ${styles.pageRow} ${active ? styles.pageRowActive : ""}`}
        style={{ paddingLeft: `${0.45 + depth * 0.8}rem` }}
        onClick={() => onSelect(entry)}
        title={`/${entry}`}
      >
        <span className={styles.dot} />
        <span className={styles.rowText}>{highlight(slugToTitle(entry), term)}</span>
      </button>
    </li>
  );
}

export default function NavPage() {
  const [url, setUrl] = useState("https://docs.capillarytech.com/docs");
  const [filter, setFilter] = useState("");
  const [convert, setConvert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<DiscoveryReport | null>(null);

  const [active, setActive] = useState(0);
  const [term, setTerm] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  // Bumping this remounts the tree, which resets every group to `allOpen`.
  const [allOpen, setAllOpen] = useState(true);
  const [treeKey, setTreeKey] = useState(0);

  const tabs = useMemo(() => (report ? buildTabs(report) : []), [report]);
  const tab = tabs[active];

  const origin = useMemo(() => {
    if (!report) return "";
    try {
      return new URL(report.site).origin;
    } catch {
      return "";
    }
  }, [report]);

  // Reading order for the current tab, which drives previous/next and crumbs.
  const flat = useMemo(() => (tab ? flatten(tab.navigation) : []), [tab]);
  const current = useMemo(
    () => flat.find((page) => page.slug === selected) ?? null,
    [flat, selected]
  );
  const currentAt = current ? flat.indexOf(current) : -1;

  // Searching filters leaves by title and slug, then forces every surviving
  // group open so the hits are actually on screen.
  const searching = term.trim().length > 0;
  const visible = useMemo(() => {
    if (!tab) return [];
    if (!searching) return tab.navigation;
    const needle = term.trim().toLowerCase();
    return filterTree(
      tab.navigation,
      (slug) =>
        slug.toLowerCase().includes(needle) || slugToTitle(slug).toLowerCase().includes(needle)
    );
  }, [tab, term, searching]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setReport(null);
    setActive(0);
    setTerm("");
    setSelected(null);

    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `skipFetch` walks the sidebar without downloading and converting every
        // page — the difference between seconds and twenty minutes.
        body: JSON.stringify({ url, filter: filter || undefined, skipFetch: !convert }),
      });
      const json = (await res.json()) as DiscoveryReport | ApiFailure;

      if (!res.ok || "success" in json) {
        setError("success" in json ? json.message : `Request failed with ${res.status}`);
        return;
      }
      setReport(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  function pickTab(index: number) {
    setActive(index);
    setSelected(null);
    setTerm("");
  }

  return (
    // Wider than the 60rem the global `main` allows — a two-pane layout needs it.
    <main style={{ maxWidth: "82rem" }}>
      <a className={styles.back} href="/">
        ← Full discovery
      </a>

      <h1>Navigation</h1>
      <p className="sub">
        Rebuilds a ReadMe site&apos;s sidebar: tabs across the top, pages down the side, and
        everything known about the selected page on the right.
      </p>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://docs.example.com/docs"
          aria-label="Documentation site URL"
        />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Path filter (optional)"
          aria-label="Path filter"
          style={{ flex: "0 1 13rem" }}
        />
        <label className={styles.checkbox}>
          <input type="checkbox" checked={convert} onChange={(e) => setConvert(e.target.checked)} />
          Fetch page bodies (slow)
        </label>
        <button type="submit" disabled={loading || !url}>
          {loading ? "Walking sidebar…" : "Load navigation"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {report && tab && (
        <div className={styles.browser}>
          {/* ---- tabs ---------------------------------------------------- */}
          <div className={styles.topbar}>
            <span className={styles.brand}>
              <span className={styles.brandDot} />
              {origin.replace(/^https?:\/\//, "")}
            </span>
            <nav className={styles.tabs} role="tablist">
              {tabs.map((t, i) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  key={`${t.url}-${i}`}
                  className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                  onClick={() => pickTab(i)}
                >
                  {t.name}
                  <span className={styles.pill}>{t.pages}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className={styles.body}>
            {/* ---- sidebar ---------------------------------------------- */}
            <aside className={styles.side}>
              <div className={styles.sideHead}>
                <input
                  type="text"
                  className={styles.search}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Filter pages…"
                  aria-label="Filter pages"
                />
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => {
                    setAllOpen((prev) => !prev);
                    setTreeKey((k) => k + 1);
                  }}
                  title={allOpen ? "Collapse all groups" : "Expand all groups"}
                >
                  {allOpen ? "Collapse" : "Expand"}
                </button>
              </div>

              {visible.length === 0 ? (
                <div className={styles.empty} style={{ padding: "1.5rem 0.75rem" }}>
                  {searching ? `No page matches “${term}”.` : "This tab has no pages."}
                </div>
              ) : (
                <ul className={styles.tree} key={`${active}-${treeKey}-${searching}`}>
                  {visible.map((entry, i) => (
                    <Node
                      key={typeof entry === "string" ? `${entry}-${i}` : `${entry.group}-${i}`}
                      entry={entry}
                      depth={0}
                      // A search hit is useless behind a closed group.
                      defaultOpen={searching || allOpen}
                      term={searching ? term.trim() : ""}
                      selected={selected}
                      onSelect={setSelected}
                    />
                  ))}
                </ul>
              )}

              <div className={styles.sideFoot}>
                {countPages(visible)} of {tab.pages} pages
              </div>
            </aside>

            {/* ---- detail ----------------------------------------------- */}
            <section className={styles.content}>
              {current ? (
                <>
                  <div className={styles.crumbs}>
                    <span>{tab.name}</span>
                    {current.crumbs.map((crumb) => (
                      <span key={crumb}>
                        <span className={styles.crumbSep}> / </span>
                        {crumb}
                      </span>
                    ))}
                  </div>

                  <h2 className={styles.title}>{current.title}</h2>
                  <span className={styles.slug}>{current.slug}</span>

                  <div>
                    <a
                      className={styles.openBtn}
                      href={`${origin}/${current.slug}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Open live page ↗
                    </a>
                  </div>

                  <div className={styles.facts}>
                    <div className={styles.fact}>
                      <div className={styles.factK}>Group</div>
                      <div className={styles.factV}>{current.crumbs.at(-1) ?? "—"}</div>
                    </div>
                    <div className={styles.fact}>
                      <div className={styles.factK}>Nesting depth</div>
                      <div className={styles.factV}>{current.depth}</div>
                    </div>
                    <div className={styles.fact}>
                      <div className={styles.factK}>Position in tab</div>
                      <div className={styles.factV}>
                        {currentAt + 1} of {flat.length}
                      </div>
                    </div>
                    <div className={styles.fact}>
                      <div className={styles.factK}>Output file</div>
                      <div className={styles.factV}>{current.slug}.mdx</div>
                    </div>
                  </div>

                  <p className={styles.sectionK}>Neighbours in the sidebar</p>
                  <div className={styles.siblings}>
                    <button
                      type="button"
                      className={styles.sibling}
                      disabled={currentAt <= 0}
                      onClick={() => {
                        const prev = flat[currentAt - 1];
                        if (prev) setSelected(prev.slug);
                      }}
                    >
                      <div className={styles.siblingK}>Previous</div>
                      <div className={styles.siblingV}>{flat[currentAt - 1]?.title ?? "—"}</div>
                    </button>
                    <button
                      type="button"
                      className={styles.sibling}
                      disabled={currentAt < 0 || currentAt >= flat.length - 1}
                      onClick={() => {
                        const next = flat[currentAt + 1];
                        if (next) setSelected(next.slug);
                      }}
                    >
                      <div className={styles.siblingK}>Next</div>
                      <div className={styles.siblingV}>{flat[currentAt + 1]?.title ?? "—"}</div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className={styles.title}>{tab.name}</h2>
                  <p className={styles.empty} style={{ padding: "0 0 1.25rem" }}>
                    Pick a page on the left to see where it sits and where it came from.
                  </p>

                  <div className={styles.facts}>
                    <div className={styles.fact}>
                      <div className={styles.factK}>Pages</div>
                      <div className={styles.factV}>{tab.pages}</div>
                    </div>
                    <div className={styles.fact}>
                      <div className={styles.factK}>Top-level groups</div>
                      <div className={styles.factV}>{tab.navigation.length}</div>
                    </div>
                    <div className={styles.fact}>
                      <div className={styles.factK}>Vendor</div>
                      <div className={styles.factV}>{report.vendor}</div>
                    </div>
                    <div className={styles.fact}>
                      <div className={styles.factK}>{tab.url ? "Tab path" : "Site"}</div>
                      <div className={styles.factV}>{tab.url || report.site}</div>
                    </div>
                  </div>

                  <p className={styles.sectionK}>Groups in this tab</p>
                  <div className={styles.groupGrid}>
                    {tab.navigation.map((entry, i) =>
                      typeof entry === "string" ? (
                        <button
                          type="button"
                          key={`${entry}-${i}`}
                          className={styles.groupCard}
                          onClick={() => setSelected(entry)}
                        >
                          <span className={styles.rowText}>{slugToTitle(entry)}</span>
                          <span className={styles.pill}>1</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          key={`${entry.group}-${i}`}
                          className={styles.groupCard}
                          onClick={() => {
                            const first = flatten(entry.pages)[0];
                            if (first) setSelected(first.slug);
                          }}
                        >
                          <span className={styles.rowText}>{entry.group}</span>
                          <span className={styles.pill}>{countPages(entry.pages)}</span>
                        </button>
                      )
                    )}
                  </div>

                  {report.failed.length > 0 && (
                    <>
                      <p className={styles.sectionK} style={{ marginTop: "1.5rem" }}>
                        {report.failed.length} page{report.failed.length === 1 ? "" : "s"} pruned —
                        could not be read
                      </p>
                      <ul className={styles.failList}>
                        {report.failed.slice(0, 6).map((fail) => (
                          <li key={fail.url}>
                            {fail.url} — {fail.message}
                          </li>
                        ))}
                        {report.failed.length > 6 && (
                          <li>…and {report.failed.length - 6} more</li>
                        )}
                      </ul>
                    </>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
