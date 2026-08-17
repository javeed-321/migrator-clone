"use client";

import { useState } from "react";

import styles from "./page.module.css";
import { DEFAULT_OPTIONS, type ConvertOptions, type ConvertResponse } from "./types";

/**
 * A worked example rather than lorem ipsum: this is the shape that used to lose
 * its styling entirely — a styled layout block, a `target`/`rel` link, a merged
 * table header, and plain prose that should stay plain.
 */
const SAMPLE = `<footer class="sessionm-footer">
  <div class="sessionm-footer__col">
    <p class="sessionm-footer__heading">Company</p>
    <a href="https://www.sessionm.com/" target="_blank" rel="noopener noreferrer">SessionM</a>
    <a href="/release-notes/overview">Release Notes</a>
  </div>
</footer>

<table>
  <tr><th colspan="2">API Coverage</th></tr>
  <tr>
    <td style="padding:16px 24px; border:1px solid #e0e0e0;">
      <div style="font-size:2em; font-weight:bold; color:#1a73e8;">40</div>
      API Sections
    </td>
    <td>99 v1 Endpoints</td>
  </tr>
</table>

<p>Ordinary prose stays ordinary prose.</p>`;

const OPTION_LABELS: Array<{ hint: string; key: keyof ConvertOptions; label: string }> = [
  { key: "keepClassNames", label: "Keep classes", hint: "class → className" },
  { key: "keepStyles", label: "Keep inline styles", hint: 'style="…" → style={{…}}' },
  { key: "dropHashedClassNames", label: "Drop hashed classes", hint: "CSS-module build noise" },
  { key: "keepIds", label: "Keep ids", hint: "off — ids collide across pages" },
];

export default function ConvertPage() {
  const [html, setHtml] = useState("");
  const [options, setOptions] = useState<ConvertOptions>(DEFAULT_OPTIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ ms: number; mdx: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function convert(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html, options }),
      });
      const data: ConvertResponse = await response.json();

      if (!data.ok) setError(data.message);
      else setResult({ mdx: data.mdx, ms: data.ms });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.mdx);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main>
      <h1>Converter playground</h1>
      <p className="sub">
        Paste HTML from a docs page and see the MDX the migrator produces. This runs the same
        pipeline as a real page conversion, so what you see here is what a migration writes.
      </p>

      <form onSubmit={convert}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.ghostBtn}
            onClick={() => {
              setHtml(SAMPLE);
              setResult(null);
              setError(null);
            }}
          >
            Load sample
          </button>
          <button
            type="button"
            className={styles.ghostBtn}
            onClick={() => {
              setHtml("");
              setResult(null);
              setError(null);
            }}
            disabled={!html}
          >
            Clear
          </button>
          <span className={styles.spacer} />
          <button type="submit" className={styles.primaryBtn} disabled={loading || !html.trim()}>
            {loading ? "Converting…" : "Convert"}
          </button>
        </div>

        <fieldset className={styles.options}>
          <legend className={styles.legend}>Attribute handling</legend>
          {OPTION_LABELS.map(({ key, label, hint }) => (
            <label key={key} className={styles.option}>
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(event) =>
                  setOptions((prev) => ({ ...prev, [key]: event.target.checked }))
                }
              />
              <span>
                {label}
                <em className={styles.hint}>{hint}</em>
              </span>
            </label>
          ))}
        </fieldset>

        <div className={styles.panes}>
          <section className={styles.pane}>
            <header className={styles.paneHead}>
              <span className={styles.paneLabel}>HTML in</span>
              {html ? <span className={styles.meta}>{html.length.toLocaleString()} chars</span> : null}
            </header>
            <textarea
              className={styles.input}
              value={html}
              onChange={(event) => setHtml(event.target.value)}
              placeholder="Paste HTML here, or press “Load sample”."
              spellCheck={false}
            />
          </section>

          <section className={styles.pane}>
            <header className={styles.paneHead}>
              <span className={styles.paneLabel}>MDX out</span>
              {result ? (
                <>
                  <span className={styles.meta}>{result.ms} ms</span>
                  <button type="button" className={styles.copyBtn} onClick={copy}>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </>
              ) : null}
            </header>
            {error ? (
              <p className={styles.error}>{error}</p>
            ) : result ? (
              <pre className={styles.output}>
                <code>{result.mdx}</code>
              </pre>
            ) : (
              <p className={styles.placeholder}>Output appears here.</p>
            )}
          </section>
        </div>
      </form>
    </main>
  );
}
