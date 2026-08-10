"use client";

import { useState } from "react";

import styles from "./page.module.css";
import type { FetchPagesResponse, TabResult } from "./types";
import type { NavigationEntry } from "@/src/types/nav";
import { convertStrToTitle } from "@/src/utils/strings";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chev} ${open ? styles.chevOpen : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
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

function Group({
  group,
  origin,
  depth,
  defaultOpen,
}: {
  group: { group: string; pages: NavigationEntry[] };
  origin: string;
  depth: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li>
      <button
        type="button"
        className={`${styles.row} ${styles.groupRow}`}
        style={{ paddingLeft: `${0.5 + depth * 0.85}rem` }}
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
              origin={origin}
              depth={depth + 1}
              defaultOpen={defaultOpen}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function Node({
  entry,
  origin,
  depth,
  defaultOpen,
}: {
  entry: NavigationEntry;
  origin: string;
  depth: number;
  defaultOpen: boolean;
}) {
  if (typeof entry !== "string") {
    return <Group group={entry} origin={origin} depth={depth} defaultOpen={defaultOpen} />;
  }

  return (
    <li>
      <a
        className={`${styles.row} ${styles.pageRow}`}
        style={{ paddingLeft: `${0.5 + depth * 0.85}rem` }}
        href={`${origin}/${entry}`}
        target="_blank"
        rel="noreferrer noopener"
        title={`/${entry}`}
      >
        <span className={styles.chevSpacer} />
        <span className={styles.rowText}>{slugToTitle(entry)}</span>
        <span className={styles.open}>↗</span>
      </a>
    </li>
  );
}

function Sidebar({
  tab,
  origin,
  defaultOpen,
}: {
  tab: TabResult;
  origin: string;
  defaultOpen: boolean;
}) {
  if (!tab.ok) {
    return <div className={styles.broken}>{tab.message ?? "This tab produced no pages."}</div>;
  }

  return (
    <ul className={styles.tree}>
      {tab.navigation.map((entry, i) => (
        <Node
          key={typeof entry === "string" ? `${entry}-${i}` : `${entry.group}-${i}`}
          entry={entry}
          origin={origin}
          depth={0}
          defaultOpen={defaultOpen}
        />
      ))}
    </ul>
  );
}

export default function FetchPagesLinks() {
  const [url, setUrl] = useState("https://docs.capillarytech.com/docs");
  const [filter, setFilter] = useState("");
  const [verifyPages, setVerifyPages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FetchPagesResponse | null>(null);
  const [active, setActive] = useState(0);
  // Changing this remounts the tree, which resets every group to the new
  // default-open state.
  const [treeKey, setTreeKey] = useState("open-0");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    setActive(0);
    setTreeKey("open-0");

    try {
      const res = await fetch("/api/fetch-pages-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, filter: filter || undefined, verifyPages }),
      });
      const json = (await res.json()) as FetchPagesResponse;

      if (!res.ok || !json.ok) {
        setError(json.message ?? `Request failed with ${res.status}`);
        return;
      }
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  const tab = data?.tabs[active];
  const origin = data ? new URL(data.site).origin : "";
  const totalPages = data?.tabs.reduce((sum, t) => sum + t.pages, 0) ?? 0;

  return (
    <main>
      <a className={styles.back} href="/">
        ← Full discovery
      </a>

      <h1>Fetch pages &amp; links</h1>
      <p className="sub">
        Reads a ReadMe docs site and rebuilds its sidebar — every tab, its groups, and the pages
        inside them.
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
          placeholder="Path filter (optional), e.g. /docs"
          aria-label="Path filter"
          style={{ flex: "0 1 16rem" }}
        />
        <label className="check">
          <input
            type="checkbox"
            checked={verifyPages}
            onChange={(e) => setVerifyPages(e.target.checked)}
          />
          Verify every page (slower)
        </label>
        <button type="submit" disabled={loading || !url}>
          {loading ? "Loading…" : "Load pages"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {data && tab && (
        <>
          <div className="stats">
            <div className="stat">
              <div className="n">{data.tabs.length}</div>
              <div className="k">Tabs</div>
            </div>
            <div className="stat">
              <div className="n">{totalPages}</div>
              <div className="k">Pages</div>
            </div>
            <div className="stat">
              <div className="n">{tab.groups}</div>
              <div className="k">Groups in tab</div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.headLabel}>Tab</span>
              {data.tabs.map((t, i) => (
                <button
                  type="button"
                  key={`${t.url}-${i}`}
                  className={`${styles.tabBtn} ${i === active ? styles.tabBtnActive : ""} ${
                    t.ok ? "" : styles.tabBtnBroken
                  }`}
                  onClick={() => setActive(i)}
                >
                  {t.name || t.url}
                  <span className={styles.tabCount}>{t.pages}</span>
                </button>
              ))}
            </div>

            <div className={styles.toolbar}>
              <span className={styles.toolbarLabel}>Groups</span>
              <span className={styles.toolbarActions}>
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => setTreeKey(`open-${Date.now()}`)}
                >
                  Expand all
                </button>
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => setTreeKey(`shut-${Date.now()}`)}
                >
                  Collapse all
                </button>
              </span>
            </div>

            <Sidebar
              key={`${active}-${treeKey}`}
              tab={tab}
              origin={origin}
              defaultOpen={treeKey.startsWith("open")}
            />

            <div className={styles.slugLine}>
              {tab.pages} pages in {tab.groups} groups · tab path <code>{tab.url}</code>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
