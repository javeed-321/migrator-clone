"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./page.module.css";
import type { MigrateProgress, MigrationReport } from "@/src/migrate/types";

/**
 * One URL in, a migrated project out.
 *
 * The three tool pages beside this one each do a stage and hand you its output
 * to carry to the next. This does all four and shows the only thing that is
 * actually wanted at the end: **what is still owed**.
 *
 * So the ordering here is not the order the stages ran in — it is what cannot
 * ship, then what needs a decision, then everything else. The per-page table is
 * last on purpose: on a real site it is 1,500 rows, and it is the answer to a
 * question nobody asks first.
 */

type Response =
  | { ok: true; report: MigrationReport; truncated: boolean; limit: number; ms: number }
  | { ok: false; message: string };

/**
 * What comes back when the server answered with a zip instead of a report.
 *
 * Deployed, there is no folder to write to, so the body is the archive and the
 * numbers ride along in a header — the page still has something to show without
 * asking the reader to unzip anything first.
 */
type Summary = {
  project: string;
  totals: MigrationReport["totals"];
  customComponents: number;
  truncated: boolean;
  limit: number;
  ms: number;
};

/**
 * One line of the progress stream.
 *
 * A discriminated union rather than one shape with optional halves, because the
 * three endings are genuinely different things — a report to render, an archive
 * to save, a message to show — and only `progress` ever repeats.
 */
type Line =
  | ({ type: "progress" } & MigrateProgress)
  | ({ type: "done" } & Extract<Response, { ok: true }>)
  | { type: "zip"; filename: string; summary: Summary; base64: string }
  | { type: "error"; message: string };

/**
 * Reads NDJSON off a response body, a line at a time.
 *
 * A chunk boundary has nothing to do with a line boundary — one read can deliver
 * three events, or half of one — so the tail is held back until its newline
 * arrives. Parsing whatever a chunk happened to contain is how a progress reader
 * throws on the one line that mattered.
 */
async function* readLines(body: ReadableStream<Uint8Array>): AsyncGenerator<Line> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (value) buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    // The last piece is either an incomplete line or the empty string after a
    // trailing newline. Either way it is not ready.
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (line.trim().length > 0) yield JSON.parse(line) as Line;
    }
    if (done) return;
  }
}

/** base64 -> the bytes the server zipped. */
function toBlob(base64: string): Blob {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: "application/zip" });
}

/** Hands the archive to the browser. Revoked immediately — the click is synchronous. */
function save(blob: Blob, filename: string): void {
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(href);
}

function Stat({ n, label, tone }: { n: number; label: string; tone?: "bad" | "warn" }) {
  return (
    <li className={`${styles.stat} ${tone ? styles[tone] : ""}`}>
      <span className={styles.statNum}>{n}</span>
      <span className={styles.statLabel}>{label}</span>
    </li>
  );
}

/** The stages, in the order they run, so the list can show what is still to come. */
const STAGES: { key: MigrateProgress["stage"]; label: string }[] = [
  { key: "discover", label: "Discovering pages" },
  { key: "brand", label: "Reading the brand" },
  { key: "download", label: "Downloading pages" },
  { key: "convert", label: "Converting pages" },
  { key: "write", label: "Writing the project" },
];

/**
 * What the run has said so far.
 *
 * The latest line per stage rather than every line: the download and convert
 * stages emit one an item, and a scrolling log of 400 identical sentences says
 * less than five rows with numbers on them.
 */
function Progress({ seen, done }: { seen: Map<string, MigrateProgress>; done: boolean }) {
  const reached = STAGES.findIndex((stage) => stage.key === [...seen.keys()].at(-1));

  return (
    <ol className={styles.progress}>
      {STAGES.map((stage, index) => {
        const event = seen.get(stage.key);
        const active = !done && index === reached;
        const complete = done || index < reached;
        const pct =
          event?.total && event.total > 0 ? Math.round(((event.done ?? 0) / event.total) * 100) : undefined;

        return (
          <li
            key={stage.key}
            className={`${styles.step} ${active ? styles.stepOn : ""} ${complete ? styles.stepDone : ""}`}
          >
            <span className={styles.stepMark} aria-hidden="true">
              {complete ? "✓" : active ? "•" : "○"}
            </span>
            <span className={styles.stepBody}>
              <span className={styles.stepLabel}>{stage.label}</span>
              {/* The server's own sentence, not a re-description of it — it is the
                  only thing that knows which page is being converted right now. */}
              {event ? <span className={styles.stepDetail}>{event.message}</span> : null}
              {pct !== undefined && !complete ? (
                <span className={styles.bar}>
                  <span className={styles.barFill} style={{ width: `${pct}%` }} />
                </span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function MigratePage() {
  const [url, setUrl] = useState("");
  const [limit, setLimit] = useState(25);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Extract<Response, { ok: true }> | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [seen, setSeen] = useState<Map<string, MigrateProgress>>(new Map());

  async function run(event: React.FormEvent) {
    event.preventDefault();
    if (!url.trim() || busy) return;

    setBusy(true);
    setError("");
    setResult(null);
    setSummary(null);
    setSeen(new Map());

    try {
      const response = await fetch("/api/migrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Asks for the narrated form. Without it the route answers in one piece,
          // exactly as it did before, which is what the `curl` contract expects.
          Accept: "application/x-ndjson",
        },
        body: JSON.stringify({ url: url.trim(), limit }),
      });

      // A rejected request never reaches the stream — the body is one JSON error
      // and the status says so.
      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => null)) as Response | null;
        setError(data && !data.ok ? data.message : `The server answered ${response.status}`);
        return;
      }

      for await (const line of readLines(response.body)) {
        if (line.type === "progress") {
          // A new Map each time: React compares by identity, and mutating this one
          // would leave the list showing the first event forever.
          setSeen((current) => new Map(current).set(line.stage, line));
        } else if (line.type === "done") {
          setResult(line);
        } else if (line.type === "zip") {
          setSummary(line.summary);
          save(toBlob(line.base64), line.filename);
        } else {
          setError(line.message);
        }
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    } finally {
      setBusy(false);
    }
  }

  const report = result?.report;

  return (
    <main className={styles.wide}>
      <Link href="/" className={styles.back}>
        ← Home
      </Link>

      <h1>Migrate</h1>
      <p className="sub">
        Discover, download, convert and report — one URL, one project on disk.
      </p>

      <form className={styles.form} onSubmit={run}>
        <input
          className={styles.url}
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://docs.example.com"
          required
        />
        <input
          className={styles.num}
          type="number"
          min={1}
          max={1000}
          value={limit}
          onChange={(event) => setLimit(Number(event.target.value))}
          title="Pages to migrate"
        />
        <button type="submit" disabled={busy || !url.trim()}>
          {busy ? "Migrating…" : "Migrate"}
        </button>
      </form>

      <p className={styles.scope}>
        Capped at 100 pages a request — a full site is <code>npm run migrate</code>, which has no
        cap and resumes from the download cache.
      </p>

      {error ? <p className={styles.error}>{error}</p> : null}

      {/* Shown while it runs and kept afterwards: "what did it actually do" is
          still the question once the numbers appear. */}
      {seen.size > 0 ? <Progress seen={seen} done={!busy} /> : null}

      {summary ? (
        <>
          <h2>
            {summary.project} <span className="sub">· {(summary.ms / 1000).toFixed(1)}s</span>
          </h2>
          <p className={`${styles.banner} ${styles.bannerWarn}`}>
            Downloaded <strong>{summary.project}.zip</strong> — converted pages,{" "}
            <code>documentation.json</code> and the reports. Images and the raw downloads are
            left out: every image <code>src</code> still points at its original URL, so the
            pages are complete without them. Use <code>npm run migrate</code> if you want them.
          </p>
          <ul className={styles.stats}>
            <Stat n={summary.totals.converted} label="converted" />
            <Stat n={summary.totals.converted - summary.totals.compiles} label="won't compile" tone="bad" />
            <Stat n={summary.totals.blockers} label="blockers" tone="bad" />
            <Stat n={summary.totals.needRepair} label="need repair" tone="warn" />
            <Stat n={summary.totals.quarantined} label="fenced" tone="warn" />
            <Stat n={summary.customComponents} label="components owed" tone="warn" />
          </ul>
          <p className={styles.path}>The full report is inside the zip as <code>report.md</code>.</p>
        </>
      ) : null}

      {report ? (
        <>
          <h2>
            {report.project} <span className="sub">· {(result.ms / 1000).toFixed(1)}s</span>
          </h2>

          <ul className={styles.stats}>
            <Stat n={report.totals.converted} label="converted" />
            <Stat
              n={report.totals.converted - report.totals.compiles}
              label="won't compile"
              tone="bad"
            />
            <Stat n={report.totals.blockers} label="blockers" tone="bad" />
            <Stat n={report.totals.needRepair} label="need repair" tone="warn" />
            <Stat n={report.totals.quarantined} label="fenced" tone="warn" />
            <Stat n={report.totals.failed} label="failed" tone={report.totals.failed ? "bad" : undefined} />
          </ul>

          {result.truncated ? (
            <p className={`${styles.banner} ${styles.bannerWarn}`}>
              This site has {report.discovery.listedPages} pages and the run was capped at{" "}
              {result.limit}. The report below covers only what was migrated — it is not a census
              of the site.
            </p>
          ) : null}

          {report.totals.needRepair > 0 ? (
            <p className={`${styles.banner} ${styles.bannerWarn}`}>
              <strong>{report.totals.needRepair} pages needed the lenient parser.</strong> Their
              source has a syntax error, so they received no component conversions at all. Repair
              the source and run again before reading anything else about them.
            </p>
          ) : null}

          {report.customComponents.length > 0 ? (
            <>
              <h3>Components still owed a decision</h3>
              <p className="sub">
                Each is in the output inside a code fence, so the page compiles and nothing is lost.
                The fences are review scaffolding — convert each one and delete it.
              </p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Kind</th>
                      <th>Uses</th>
                      <th>Pages</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.customComponents.map((row) => (
                      <tr key={row.name}>
                        <td className={styles.mono}>{`<${row.name}>`}</td>
                        <td>
                          <span
                            className={`${styles.kind} ${row.kind === "unknown" ? styles.kindUnknown : ""}`}
                          >
                            {row.kind}
                          </span>
                        </td>
                        <td>{row.uses}</td>
                        <td className={styles.mono}>
                          {row.pages.slice(0, 3).join(", ")}
                          {row.pages.length > 3 ? ` +${row.pages.length - 3}` : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {report.blockers.length > 0 ? (
            <>
              <h3>Blockers</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Line</th>
                      <th>Rule</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.blockers.map((row, index) => (
                      <tr key={`${row.slug}-${index}`}>
                        <td className={styles.mono}>{row.slug}</td>
                        <td>{row.line ?? ""}</td>
                        <td>{row.rule}</td>
                        <td className={styles.detail}>{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {report.notInNavigation.length > 0 ? (
            <>
              <h3>Pages the sidebar cannot reach</h3>
              <p className="sub">
                {report.notInNavigation.length} converted but absent from the navigation, so they
                would ship as orphans. Normal for spec-generated API endpoints — ReadMe&apos;s
                sidebar omits them on purpose.
              </p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <tbody>
                    {report.notInNavigation.map((slug) => (
                      <tr key={slug}>
                        <td className={styles.mono}>{slug}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          <h3>Pages</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Parser</th>
                  <th>Compiles</th>
                  <th>Blockers</th>
                  <th>Flags</th>
                  <th>Fenced</th>
                </tr>
              </thead>
              <tbody>
                {report.pages.map((page) => (
                  <tr key={page.slug}>
                    <td className={styles.mono}>{page.slug}</td>
                    <td>{page.parseMode}</td>
                    <td className={page.outputCompiles ? "" : styles.no}>
                      {page.outputCompiles ? "yes" : "no"}
                    </td>
                    <td>{page.notes.blocker}</td>
                    <td>{page.notes.flag}</td>
                    <td>{page.quarantined.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {report.outDir ? (
            <p className={styles.path}>
              Written to <code>{report.outDir}</code> — <code>pages/</code>,{" "}
              <code>documentation.json</code>, <code>report.json</code> and <code>report.md</code>.
            </p>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
