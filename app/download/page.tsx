"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./page.module.css";
import type { HarvestResponse } from "./types";
import type { Block, PageIR } from "@/src/harvest/types";

/**
 * The status a block's target carries, as a colour.
 *
 * `manual` is the only one that needs a person, so it is the only one that gets
 * a warm colour — everything else is already decided.
 */
const STATUS_CLASS: Record<string, string> = {
  direct: styles.ok!,
  transform: styles.warn!,
  manual: styles.manual!,
  drop: styles.muted!,
};

/** Flattens a page's blocks, keeping nested ones with their depth. */
function flatten(blocks: Block[], depth = 0): { block: Block; depth: number }[] {
  return blocks.flatMap((block) => [
    { block, depth },
    ...(block.children ? flatten(block.children, depth + 1) : []),
  ]);
}

function attrsToText(attrs: Record<string, string> | undefined): string {
  if (!attrs) return "";
  return Object.entries(attrs)
    .map(([name, value]) => (value === "true" ? name : `${name}=${JSON.stringify(value)}`))
    .join(" ");
}

function BlockCard({
  block,
  depth,
  active,
  onSelect,
}: {
  block: Block;
  depth: number;
  active: boolean;
  onSelect: () => void;
}) {
  const [open, setOpen] = useState(false);
  const status = block.target.status;

  return (
    <li
      className={`${styles.block} ${active ? styles.blockActive : ""}`}
      style={{ marginLeft: `${depth * 0.9}rem` }}
    >
      <button type="button" className={styles.blockHead} onClick={onSelect}>
        <span className={styles.blockName}>{block.component ?? block.kind}</span>
        <span className={styles.syntax}>{block.syntax}</span>
        <span className={styles.lines}>
          L{block.lines[0]}
          {block.lines[1] !== block.lines[0] ? `–${block.lines[1]}` : ""}
        </span>
        <span className={`${styles.status} ${STATUS_CLASS[status] ?? ""}`}>{status}</span>
      </button>

      <div className={styles.arrow}>
        <span className={styles.from}>
          {block.component ? `<${block.component}>` : block.kind}
        </span>
        <span aria-hidden="true">→</span>
        <span className={styles.to}>
          {block.target.component ? `<${block.target.component}` : "plain markdown"}
          {block.target.component && block.target.attrs
            ? ` ${attrsToText(block.target.attrs)}>`
            : block.target.component
              ? ">"
              : ""}
        </span>
      </div>

      {block.attrs && Object.keys(block.attrs).length > 0 && (
        <div className={styles.attrs}>{attrsToText(block.attrs)}</div>
      )}

      {block.text && !block.attrs && <div className={styles.snippet}>{block.text.slice(0, 160)}</div>}

      {block.tabs && (
        <div className={styles.attrs}>
          {block.tabs.length} tabs: {block.tabs.map((tab) => tab.title ?? tab.lang).join(" · ")}
        </div>
      )}

      {block.table && (
        <div className={styles.attrs}>
          table {block.table.rows.length + 1}×{block.table.header.length}
          {block.table.emptyHeader ? " · empty header row" : ""}
          {block.table.header.length ? ` · ${block.table.header.join(" | ").slice(0, 90)}` : ""}
        </div>
      )}

      {block.target.note && <div className={styles.note}>{block.target.note}</div>}

      {block.notes?.map((note) => (
        <div key={note} className={styles.flag}>
          ⚠ {note}
        </div>
      ))}

      {block.inline && block.inline.length > 0 && (
        <div className={styles.inline}>
          {[...new Set(block.inline.map((hit) => hit.kind))].map((kind) => (
            <span key={kind} className={styles.pill}>
              {kind}
            </span>
          ))}
        </div>
      )}

      <button type="button" className={styles.linkBtn} onClick={() => setOpen((prev) => !prev)}>
        {open ? "Hide JSON" : "Show JSON"}
      </button>
      {open && <pre className={styles.json}>{JSON.stringify(block, null, 2)}</pre>}
    </li>
  );
}

export default function Harvest() {
  const [url, setUrl] = useState("https://docs.capillarytech.com");
  const [filter, setFilter] = useState("docs/");
  const [limit, setLimit] = useState(8);
  const [single, setSingle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HarvestResponse | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);

  const sourceRef = useRef<HTMLDivElement>(null);

  const page: PageIR | undefined = useMemo(
    () => data?.pages?.find((item) => item.slug === activeSlug) ?? data?.pages?.[0],
    [data, activeSlug]
  );
  const raw = page ? (data?.raw?.[page.slug] ?? "") : "";
  const rawLines = useMemo(() => raw.split("\n"), [raw]);
  const flat = useMemo(() => (page ? flatten(page.blocks) : []), [page]);

  const selected = flat.find((entry) => entry.block.i === activeBlock)?.block;
  const [from, to] = selected?.lines ?? [0, -1];

  // Selecting a block on the right scrolls the matching source lines into view
  // on the left. That pairing is the whole point of the screen — the IR is only
  // trustworthy if you can see the text it came from.
  useEffect(() => {
    if (!selected || !sourceRef.current) return;
    const row = sourceRef.current.querySelector(`[data-line="${selected.lines[0]}"]`);
    row?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [selected]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    setActiveSlug(null);
    setActiveBlock(null);

    try {
      const res = await fetch("/api/harvest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, filter: filter || undefined, limit, single }),
      });
      const json = (await res.json()) as HarvestResponse;

      if (!res.ok || !json.ok) {
        setError(json.message ?? `Request failed with ${res.status}`);
        return;
      }
      setData(json);
      setActiveSlug(json.pages?.[0]?.slug ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  const inventory = data?.inventory;
  const manual = inventory?.components.filter((row) => row.target.status === "manual") ?? [];

  return (
    <main className={styles.wide}>
      <a className={styles.back} href="/">
        ← Full discovery
      </a>

      <h1>Harvest source markdown</h1>
      <p className="sub">
        Fetches each page&apos;s authored markdown from <code>&lt;page-url&gt;.md</code> and turns it
        into a component IR — <strong>input on the left, what was identified on the right</strong>.
        Nothing is converted, and nothing is written to disk.
      </p>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://docs.example.com"
          aria-label="Documentation site URL"
        />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Slug prefix, e.g. docs/loyalty"
          aria-label="Slug filter"
          disabled={single}
          style={{ flex: "0 1 14rem" }}
        />
        <input
          type="number"
          min={1}
          max={40}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          aria-label="Page limit"
          className={styles.num}
          disabled={single}
        />
        <label className="check">
          <input type="checkbox" checked={single} onChange={(e) => setSingle(e.target.checked)} />
          One page (the URL is the page)
        </label>
        <button type="submit" disabled={loading || !url}>
          {loading ? "Harvesting…" : "Harvest"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {data && inventory && page && (
        <>
          <div className="stats">
            <div className="stat">
              <div className="n">{data.pages?.length ?? 0}</div>
              <div className="k">Pages harvested</div>
            </div>
            <div className="stat">
              <div className="n">{inventory.blocks}</div>
              <div className="k">Blocks</div>
            </div>
            <div className="stat">
              <div className="n">{inventory.components.length}</div>
              <div className="k">Constructs</div>
            </div>
            <div className="stat">
              <div className="n">{manual.length}</div>
              <div className="k">Need a human</div>
            </div>
            <div className="stat">
              <div className="n">{inventory.parseFallbacks.length}</div>
              <div className="k">Lenient parse</div>
            </div>
            <div className="stat">
              <div className="n">{data.failed?.length ?? 0}</div>
              <div className="k">Failed</div>
            </div>
          </div>

          <p className={styles.scope}>
            {data.listed} pages listed in <code>llms.txt</code>
            {data.matching !== data.listed ? `, ${data.matching} matched the filter` : ""} — the first{" "}
            {data.limit} were harvested. Run <code>npm run harvest</code> for the whole site.
          </p>

          <section>
            <h2>What is on these pages, and what it becomes</h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Construct</th>
                    <th>Syntax</th>
                    <th className={styles.right}>Uses</th>
                    <th className={styles.right}>Pages</th>
                    <th>Documentation.AI</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.components.map((row) => (
                    <tr key={row.name}>
                      <td>
                        <code>{row.name}</code>
                      </td>
                      <td className={styles.dim}>{row.syntax}</td>
                      <td className={styles.right}>{row.count}</td>
                      <td className={styles.right}>{row.pages}</td>
                      <td>
                        {row.target.component ? (
                          <code>&lt;{row.target.component}&gt;</code>
                        ) : (
                          <span className={styles.dim}>plain markdown</span>
                        )}
                      </td>
                      <td>
                        <span
                          className={`${styles.status} ${STATUS_CLASS[row.target.status] ?? ""}`}
                        >
                          {row.target.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className={styles.pagePicker}>
            {data.pages?.map((item) => (
              <button
                type="button"
                key={item.slug}
                className={`${styles.pageBtn} ${item.slug === page.slug ? styles.pageBtnActive : ""}`}
                onClick={() => {
                  setActiveSlug(item.slug);
                  setActiveBlock(null);
                }}
                title={item.slug}
              >
                {item.title || item.slug}
                <span className={styles.pageCount}>{item.blocks.length}</span>
                {item.parseMode === "markdown" && <span className={styles.lenient}>lenient</span>}
              </button>
            ))}
          </div>

          {page.parseMode === "markdown" && (
            <div className={styles.lenientBanner}>
              This page failed the strict MDX parse and fell back to plain markdown, so its syntax
              needs repairing before Documentation.AI will compile it.
              {page.parseError ? ` — ${page.parseError}` : ""}
            </div>
          )}

          <div className={styles.split}>
            <div className={styles.pane}>
              <div className={styles.paneHead}>
                <span>Input — source markdown</span>
                <a href={page.source} target="_blank" rel="noreferrer noopener">
                  {page.source.replace(/^https?:\/\//, "")} ↗
                </a>
              </div>
              <div className={styles.source} ref={sourceRef}>
                {rawLines.map((line, index) => {
                  const number = index + 1;
                  const lit = number >= from && number <= to;
                  return (
                    <div
                      key={number}
                      data-line={number}
                      className={`${styles.srcLine} ${lit ? styles.srcLineLit : ""}`}
                    >
                      <span className={styles.srcNum}>{number}</span>
                      <span className={styles.srcText}>{line || " "}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.pane}>
              <div className={styles.paneHead}>
                <span>Output — {flat.length} blocks identified</span>
                {selected && (
                  <button
                    type="button"
                    className={styles.linkBtn}
                    onClick={() => setActiveBlock(null)}
                  >
                    Clear selection
                  </button>
                )}
              </div>
              <ul className={styles.blocks}>
                {flat.map(({ block, depth }) => (
                  <BlockCard
                    key={`${block.i}-${depth}-${block.lines[0]}`}
                    block={block}
                    depth={depth}
                    active={block.i === activeBlock}
                    onSelect={() => setActiveBlock(block.i === activeBlock ? null : block.i)}
                  />
                ))}
              </ul>
            </div>
          </div>

          {data.failed && data.failed.length > 0 && (
            <section>
              <h2>Failed</h2>
              <pre>{data.failed.map((item) => `${item.slug}\n  ${item.message}`).join("\n\n")}</pre>
            </section>
          )}
        </>
      )}
    </main>
  );
}
