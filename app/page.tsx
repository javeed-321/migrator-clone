"use client";

import { useState } from "react";

import type { DiscoveryReport, DocsConfig, NavigationEntry } from "@/src/types/nav";

type DiscoverResponse = DiscoveryReport & { docsConfig: DocsConfig };

function NavTree({ items }: { items: NavigationEntry[] }) {
  return (
    <ul className="tree">
      {items.map((item, i) =>
        typeof item === "string" ? (
          <li key={`${item}-${i}`}>
            <span className="slug">{item}</span>
          </li>
        ) : (
          <li key={`${item.group}-${i}`}>
            <span className="group-name">{item.group}</span>
            <NavTree items={item.pages} />
          </li>
        )
      )}
    </ul>
  );
}

export default function Home() {
  const [url, setUrl] = useState("https://docs.capillarytech.com/docs");
  const [filter, setFilter] = useState("");
  const [skipFetch, setSkipFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DiscoverResponse | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, filter: filter || undefined, skipFetch }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message ?? `Request failed with ${res.status}`);
      } else {
        setData(json as DiscoverResponse);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Sidebar discovery</h1>
      <p className="sub">
        Fetches one page, finds <code>nav.rm-Sidebar</code>, and walks its <code>&lt;li&gt;</code>{" "}
        tree into a nav tree and a URL list. ReadMe sites only.
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
            checked={skipFetch}
            onChange={(e) => setSkipFetch(e.target.checked)}
          />
          Discovery only (skip fetching page bodies)
        </label>
        <button type="submit" disabled={loading || !url}>
          {loading ? "Discovering…" : "Discover"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {data && (
        <>
          <div className="stats">
            <div className="stat">
              <div className="n">{data.discovered.length}</div>
              <div className="k">Discovered</div>
            </div>
            <div className="stat">
              <div className="n">{data.internal.length}</div>
              <div className="k">Internal</div>
            </div>
            <div className="stat">
              <div className="n">{data.external.length}</div>
              <div className="k">External</div>
            </div>
            <div className="stat">
              <div className="n">{data.tabs.length}</div>
              <div className="k">Tabs</div>
            </div>
            <div className="stat">
              <div className="n">{data.failed.length}</div>
              <div className="k">Failed</div>
            </div>
          </div>

          <section>
            <h2>Navigation tree</h2>
            <NavTree items={data.navigation} />
          </section>

          <section>
            <h2>Discovered URLs</h2>
            <pre>{data.discovered.join("\n")}</pre>
          </section>

          {data.failed.length > 0 && (
            <section>
              <h2>Failed</h2>
              <pre>{data.failed.map((f) => `${f.url}\n  ${f.message}`).join("\n\n")}</pre>
            </section>
          )}

          <section>
            <h2>docs.json</h2>
            <pre>{JSON.stringify(data.docsConfig, null, 2)}</pre>
          </section>
        </>
      )}
    </main>
  );
}
