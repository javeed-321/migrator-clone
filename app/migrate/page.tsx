"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./page.module.css";
import type { MigrationReport } from "@/src/migrate/types";

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

/** The filename the server chose, so the download is named after the project. */
function filenameOf(response: globalThis.Response): string {
  const match = /filename="([^"]+)"/.exec(response.headers.get("content-disposition") ?? "");
  return match?.[1] ?? "migration.zip";
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

export default function MigratePage() {
  const [url, setUrl] = useState("");
  const [limit, setLimit] = useState(25);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Extract<Response, { ok: true }> | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

  async function run(event: React.FormEvent) {
    event.preventDefault();
    if (!url.trim() || busy) return;

    setBusy(true);
    setError("");
    setResult(null);
    setSummary(null);

    try {
      const response = await fetch("/api/migrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), limit }),
      });

      // A zip body means this is deployed and the files are coming back with the
      // response rather than being written anywhere. Save it, and read the
      // numbers off the header so the page can still report.
      if (response.headers.get("content-type")?.startsWith("application/zip")) {
        const raw = response.headers.get("x-migration-summary");
        if (raw) setSummary(JSON.parse(decodeURIComponent(raw)) as Summary);
        save(await response.blob(), filenameOf(response));
        return;
      }

      const data = (await response.json()) as Response;
      if (data.ok) setResult(data);
      else setError(data.message);
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
