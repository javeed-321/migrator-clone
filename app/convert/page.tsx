"use client";

import Link from "next/link";
import { useState } from "react";

import type { ConversionNote } from "@/src/convert/mdast";

import styles from "./page.module.css";
import type { ConvertMarkdownResponse } from "./types";

/**
 * Paste ReadMe markdown on the left, read Documentation.AI MDX on the right.
 *
 * Deliberately plain: two boxes and a button. The notes list is the only other
 * thing on the page, because a conversion that shows output alone tells you
 * nothing about what it dropped. Options that most pastes do not need sit behind
 * a disclosure rather than in the way.
 */

const SAMPLE = `# Create a reward

> 📘 Before you begin
>
> You need an API key with the \`loyalty:write\` scope.

<Table align={["left","left"]}>
  <thead>
    <tr><th>Field</th><th>Type</th></tr>
  </thead>
  <tbody>
    <tr><td>\`customer\`</td><td>object</td></tr>
    <tr><td>* \`email\`</td><td>string</td></tr>
    <tr><td>** \`domain\`</td><td>string</td></tr>
  </tbody>
</Table>

<Accordion title="Troubleshooting" icon="fa-info-circle">
  Check the API key first.
</Accordion>

<Accordion title="Advanced">
  Set \`retryAttempts\` in your config.
</Accordion>

<Cards columns={2}>
  <Card title="Quickstart" href="doc:quickstart" icon="fa-rocket">
    Ten minutes, start to finish.
  </Card>

  <Card title="Reference" href="ref:get-member" icon="fa-code">
    Every endpoint.
  </Card>
</Cards>

<Embed typeOfEmbed="iframe" url="https://player.vimeo.com/video/1071296714" iframe="true" width="100%" height="370px" />

\`\`\`curl Sample request
curl https://api.example.com/rewards
\`\`\`
\`\`\`json Sample response
{ "ok": true }
\`\`\`

See <Anchor label="Super Admins" target="_blank" href="https://docs.capillarytech.com/docs/admins">Super Admins</Anchor>.
`;

/** Blockers first — they are the only notes that need a decision. */
const ORDER = { blocker: 0, flag: 1, change: 2 } as const;

export default function Convert() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [site, setSite] = useState("");
  const [mdx, setMdx] = useState("");
  const [notes, setNotes] = useState<ConversionNote[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function convert() {
    setLoading(true);
    setError("");
    setMdx("");
    setNotes([]);

    try {
      const res = await fetch("/api/convert-markdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown, title: title || undefined, site: site || undefined }),
      });
      const data = (await res.json()) as ConvertMarkdownResponse;

      if (!data.ok) {
        setError(data.message ?? "Conversion failed");
        return;
      }

      setMdx(data.mdx ?? "");
      setNotes([...(data.notes ?? [])].sort((a, b) => ORDER[a.level] - ORDER[b.level]));
      if (data.parseError) {
        setError(
          "Strict MDX rejected this page, so it was read as plain markdown — its JSX will not convert.",
        );
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not reach the converter");
    } finally {
      setLoading(false);
    }
  }

  const blockers = notes.filter((note) => note.level === "blocker").length;

  return (
    <main>
      <p className="sub">
        <Link href="/">← Home</Link>
      </p>

      <h1>Convert</h1>

      <div className={styles.bar}>
        <button onClick={convert} disabled={loading || !markdown.trim()}>
          {loading ? "Converting…" : "Convert"}
        </button>
        <button onClick={() => setMarkdown(SAMPLE)} disabled={loading}>
          Sample
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.panes}>
        <textarea
          className={styles.box}
          value={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
          placeholder="Paste ReadMe markdown here…"
          spellCheck={false}
        />
        <textarea
          className={styles.box}
          value={mdx}
          readOnly
          placeholder="Documentation.AI MDX appears here"
          spellCheck={false}
        />
      </div>

      <details className={styles.options}>
        <summary>Options</summary>
        <label className={styles.field}>
          Page title
          <input
            className={styles.input}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="drops a duplicate body H1"
          />
        </label>
        <label className={styles.field}>
          Source site
          <input
            className={styles.input}
            value={site}
            onChange={(event) => setSite(event.target.value)}
            placeholder="https://docs.example.com"
          />
        </label>
      </details>

      {notes.length > 0 && (
        <details className={styles.options} open={blockers > 0}>
          <summary>
            {notes.length} note{notes.length === 1 ? "" : "s"}
            {blockers > 0 && <span className={styles.blocker}> · {blockers} to decide</span>}
          </summary>
          <ul className={styles.notes}>
            {notes.map((note, index) => (
              <li key={`${note.rule}-${index}`} className={styles[note.level]}>
                {note.detail}
              </li>
            ))}
          </ul>
        </details>
      )}
    </main>
  );
}
