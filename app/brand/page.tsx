"use client";

import { useMemo, useState } from "react";

import styles from "./page.module.css";
import type { BrandResponse } from "./types";
import { DARK_SURFACE, LIGHT_SURFACE, contrast } from "@/src/brand/colors";
import type { BrandField, BrandSource } from "@/src/brand/types";

/**
 * Stage 1b, on its own page.
 *
 * The report `/api/brand` returns is complete, and completely unreadable as a
 * hex string — the questions people bring to it are *is that the right blue*,
 * *does the dark one read on a dark page*, and *why is the logo missing*, none
 * of which JSON can answer. So the values are rendered as the thing they will
 * become: a navbar with the logo in it, a browser tab with the favicon in it,
 * and a link in the brand colour on each of the two backgrounds it has to work
 * against.
 *
 * The JSON is still here, underneath, because it is what gets written.
 */

/** Which rung answered, spelled out — the badge is the value's provenance. */
const SOURCES: Record<BrandSource, { label: string; className: string; title: string }> = {
  "ssr-props": {
    label: "project config",
    className: styles.badgeStrong as string,
    title: "Read from ReadMe's own project settings, embedded in the page. This is the site's real setting.",
  },
  "ssr-props-legacy": {
    label: "project config (legacy)",
    className: styles.badgeStrong as string,
    title: "ReadMe's project settings in their older shape. Equally authoritative.",
  },
  "link-tag": {
    label: "<link> tag",
    className: styles.badgeStrong as string,
    title: "Taken from <link rel=\"icon\">. Reliable for icons.",
  },
  "og-image": {
    label: "og:image params",
    className: styles.badgeStrong as string,
    title: "ReadMe builds its social image from a URL carrying the project's colour and logo as query parameters.",
  },
  meta: {
    label: "meta tag",
    className: styles.badgeWeak as string,
    title: "Guessed from a <meta> tag. theme-color is often a header background rather than a brand colour — worth confirming.",
  },
  "css-variable": {
    label: "CSS variable",
    className: styles.badgeWeak as string,
    title: "Last resort: a --color-primary found in an inline stylesheet.",
  },
  derived: {
    label: "computed here",
    className: styles.badgeDerived as string,
    title: "Not read from the site. Computed from another value to stay readable.",
  },
};

/** The row order the report uses, with a label for each. */
const FIELDS: { key: BrandField; label: string; kind: "colour" | "image" | "text" }[] = [
  { key: "name", label: "Site name", kind: "text" },
  { key: "brandLight", label: "Brand (light)", kind: "colour" },
  { key: "brandDark", label: "Brand (dark)", kind: "colour" },
  { key: "logoLight", label: "Logo (light)", kind: "image" },
  { key: "logoDark", label: "Logo (dark)", kind: "image" },
  { key: "favicon", label: "Favicon", kind: "image" },
];

/**
 * Minimal JSON syntax highlighting — one pass, strings/numbers/keywords, and a
 * string followed by a colon is a key. Everything between matches is emitted
 * verbatim, so the output is always the input.
 */
function highlightJson(json: string) {
  const token = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;

  for (const match of json.matchAll(token)) {
    const [whole, str, colon, keyword, num] = match;
    if (match.index > last) nodes.push(json.slice(last, match.index));

    const className = str
      ? colon
        ? styles.jsonKey
        : styles.jsonStr
      : keyword
        ? styles.jsonKw
        : styles.jsonNum;
    nodes.push(
      <span key={match.index} className={className}>
        {str ?? keyword ?? num}
      </span>,
    );
    if (colon) nodes.push(colon);
    last = match.index + whole.length;
  }

  if (last < json.length) nodes.push(json.slice(last));
  return nodes;
}

function Badge({ from }: { from: BrandSource }) {
  const source = SOURCES[from];
  return (
    <span className={`${styles.badge} ${source.className}`} title={source.title}>
      {source.label}
    </span>
  );
}

/**
 * One theme, as the reader will meet it: a browser tab, a navbar, and a link.
 *
 * The contrast ratio is printed rather than assumed. `brand` draws links, the
 * bar is WCAG AA's 4.5:1, and a preview that shows the colour without saying
 * whether it clears the bar leaves the one decision that matters unanswered.
 */
function Preview({
  theme,
  name,
  brand,
  logo,
  favicon,
}: {
  theme: "light" | "dark";
  name: string;
  brand: string;
  logo: string | undefined;
  favicon: string | undefined;
}) {
  const surface = theme === "light" ? LIGHT_SURFACE : DARK_SURFACE;
  const ratio = contrast(brand, surface);

  return (
    <div
      className={`${styles.preview} ${theme === "light" ? styles.previewLight : styles.previewDark}`}
    >
      <div className={styles.chrome}>
        <div className={styles.tab}>
          {favicon ? (
            // Plain <img>: these are remote CDN URLs that next/image would need
            // configured hosts for, and the point here is to render whatever the
            // site actually serves.
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.favicon} src={favicon} alt="" />
          ) : (
            <span className={styles.faviconMissing} title="No favicon found" />
          )}
          <span className={styles.tabTitle}>{name}</span>
        </div>
      </div>

      <div className={styles.navbar}>
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.logo} src={logo} alt={`${name} logo`} />
        ) : (
          <span className={styles.logoMissing}>{name}</span>
        )}
      </div>

      <div className={styles.body}>
        <h4>Getting started</h4>
        <span>
          Every link on the migrated site is drawn in this colour — see the{" "}
          <a className={styles.brandLink} style={{ color: brand }} href="#preview">
            quickstart guide
          </a>{" "}
          for the rest.
        </span>
        <div className={styles.brandBtn} style={{ background: brand }}>
          Get started
        </div>
      </div>

      <div className={styles.previewFoot}>
        <span className={styles.chip} style={{ background: brand }} />
        {brand}
        <span className={styles.ratio}>
          {ratio.toFixed(2)}:1 {ratio >= 4.5 ? "✓ AA" : "✗ AA"}
        </span>
      </div>
    </div>
  );
}

export default function Brand() {
  const [url, setUrl] = useState("https://docs.capillarytech.com/docs");
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BrandResponse | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, save }),
      });
      const json = (await res.json()) as BrandResponse;

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

  /** Field -> the row that answered it, for the table and the previews. */
  const byField = useMemo(() => {
    const map = new Map<BrandField, { value: string; from: BrandSource }>();
    for (const row of data?.found ?? []) map.set(row.field, { value: row.value, from: row.from });
    return map;
  }, [data]);

  const configJson = useMemo(
    () => (data ? JSON.stringify(data.config, null, 2) : ""),
    [data],
  );
  const configNodes = useMemo(() => highlightJson(configJson), [configJson]);

  async function copyConfig() {
    try {
      await navigator.clipboard.writeText(configJson);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  const siteName = byField.get("name")?.value ?? (data ? new URL(data.site).hostname : "");
  const logoLight = data?.config["logo-light"];
  const logoDark = data?.config["logo-dark"];
  const favicon = data?.config.favicon;

  return (
    <main>
      <a className={styles.back} href="/">
        ← Home
      </a>

      <h1>Brand</h1>
      <p className="sub">
        Reads a ReadMe site&apos;s colours, logos and favicon out of the page it already serves —
        the same stage a migration runs, on its own, so every value can be traced back to where it
        came from.
      </p>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://docs.example.com/docs"
          aria-label="Documentation site URL"
        />
        <label className="check">
          <input type="checkbox" checked={save} onChange={(e) => setSave(e.target.checked)} />
          Download assets
        </label>
        <button type="submit" disabled={loading || !url}>
          {loading ? "Reading…" : "Read brand"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {data && (
        <>
          <div className="stats">
            <div className="stat">
              <div className="n">{data.found.length}</div>
              <div className="k">Found</div>
            </div>
            <div className="stat">
              <div className="n">{data.missing.length}</div>
              <div className="k">Missing</div>
            </div>
            <div className="stat">
              <div className="n">{data.adjusted.length + data.rejected.length}</div>
              <div className="k">Changed</div>
            </div>
            <div className="stat">
              <div className="n">{data.ms}ms</div>
              <div className="k">One request</div>
            </div>
          </div>

          <div className={styles.panel} id="preview">
            <div className={styles.toolbar}>
              <span className={styles.toolbarLabel}>Preview</span>
              <span className={styles.toolbarLabel} style={{ textTransform: "none" }}>
                {data.project}
              </span>
            </div>

            <div className={styles.previews}>
              <Preview
                theme="light"
                name={siteName}
                brand={data.config.colors.light.brand}
                logo={logoLight}
                favicon={favicon}
              />
              <Preview
                theme="dark"
                name={siteName}
                brand={data.config.colors.dark.brand}
                logo={logoDark}
                favicon={favicon}
              />
            </div>

            <div className={styles.footNote}>
              Only <code>brand</code> is taken from the source. <code>heading</code> and{" "}
              <code>text</code> keep Documentation.AI&apos;s defaults — a source site&apos;s body
              grey was picked against its own background, and copying it across is how a migration
              ships unreadable text.
            </div>
          </div>

          {(data.adjusted.length > 0 || data.rejected.length > 0) && (
            <div className={styles.panel}>
              <div className={styles.toolbar}>
                <span className={styles.toolbarLabel}>What was changed</span>
              </div>

              {data.adjusted.map((row) => (
                <div className={styles.notice} key={`adj-${row.field}`}>
                  <div className={styles.noticeHead}>
                    <span className={styles.chip} style={{ background: row.was }} />
                    <span className={styles.mono}>{row.was}</span>
                    <span className={styles.arrow}>→</span>
                    <span className={styles.chip} style={{ background: row.now }} />
                    <span className={styles.mono}>{row.now}</span>
                    <span className={styles.noticeWhy}>· {row.field} moved</span>
                  </div>
                  <div className={styles.noticeWhy}>{row.reason}</div>
                </div>
              ))}

              {data.rejected.map((row) => (
                <div className={styles.notice} key={`rej-${row.field}`}>
                  <div className={styles.noticeHead}>
                    <span className={styles.chip} style={{ background: row.value }} />
                    <span className={styles.mono}>{row.value}</span>
                    <span className={styles.noticeWhy}>
                      · {row.field} rejected, the default stands
                    </span>
                  </div>
                  <div className={styles.noticeWhy}>{row.reason}</div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.panel}>
            <div className={styles.toolbar}>
              <span className={styles.toolbarLabel}>Values &amp; where each came from</span>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th />
                  <th>Field</th>
                  <th>Value</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {FIELDS.map((field) => {
                  const row = byField.get(field.key);
                  return (
                    <tr key={field.key}>
                      <td className={styles.swatchCell}>
                        {row && field.kind === "colour" && (
                          <span className={styles.swatch} style={{ background: row.value }} />
                        )}
                        {row && field.kind === "image" && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img className={styles.thumb} src={row.value} alt="" />
                        )}
                      </td>
                      <td className={styles.field}>{field.label}</td>
                      <td className={styles.value}>
                        {row ? (
                          field.kind === "image" ? (
                            <a href={row.value} target="_blank" rel="noreferrer noopener">
                              {row.value}
                            </a>
                          ) : (
                            row.value
                          )
                        ) : (
                          <span className={styles.valueMissing}>
                            nothing found — the default stands
                          </span>
                        )}
                      </td>
                      <td>{row && <Badge from={row.from} />}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {data.saved && (
              <div className={styles.footNote}>
                {Object.keys(data.saved.assets).length} asset
                {Object.keys(data.saved.assets).length === 1 ? "" : "s"} saved to{" "}
                <code>{data.saved.dir}</code>
                {data.saved.failed.length > 0 &&
                  ` · ${data.saved.failed.length} failed: ${data.saved.failed
                    .map((f) => f.message)
                    .join("; ")}`}
              </div>
            )}
          </div>

          <div className={styles.panel}>
            <div className={styles.toolbar}>
              <span className={styles.toolbarLabel}>documentation.json</span>
              <span className={styles.toolbarActions}>
                <button type="button" className={styles.linkBtn} onClick={copyConfig}>
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </span>
            </div>
            <pre className={styles.code}>
              <code>{configNodes}</code>
            </pre>
            <div className={styles.footNote}>
              Merged into the config a migration writes. Asset URLs stay on the source CDN — a
              saved copy is an archive, not a dependency.
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.toolbar}>
              <span className={styles.toolbarLabel}>styles/brand.css</span>
            </div>
            <pre className={styles.code}>
              <code>{data.css}</code>
            </pre>
          </div>
        </>
      )}
    </main>
  );
}
