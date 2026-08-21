import Link from "next/link";

/**
 * The index.
 *
 * This used to be the full-discovery UI for `/api/discover`. That route is gone
 * — discovery now runs entirely through `/api/fetch-pages-links` — so this is a
 * plain landing page. It also keeps `/` alive for the `← Home` links the tool
 * pages point back at.
 */
const TOOLS = [
  {
    href: "/migrate",
    title: "Migrate",
    body: "One URL, end to end — discover, download, convert, and write a project with its report. The other three tools are its stages, kept for looking at one in isolation.",
  },
  {
    href: "/fetch-pages-links",
    title: "Fetch pages & links",
    body: "Read a ReadMe docs site and rebuild its sidebar — every tab, its groups and the pages inside them.",
  },
  {
    href: "/convert",
    title: "Convert",
    body: "Paste a ReadMe page and get Documentation.AI MDX back, with a note for every change.",
  },
  {
    href: "/download",
    title: "Download",
    body: "Read each page's authored markdown from `<slug>.md` and show the components found in it.",
  },
];

export default function Home() {
  return (
    <main>
      <h1>Sidebar Discovery</h1>
      <p className="sub">ReadMe docs migration tools.</p>

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}>
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              style={{
                display: "block",
                padding: "1rem 1.15rem",
                border: "1px solid rgba(128,128,128,0.28)",
                borderRadius: "0.6rem",
                textDecoration: "none",
              }}
            >
              <strong>{tool.title}</strong>
              <span className="sub" style={{ display: "block", margin: "0.3rem 0 0" }}>
                {tool.body}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
