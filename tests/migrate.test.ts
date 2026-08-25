import { describe, expect, it } from "vitest";

import { renderMigrationMarkdown } from "../src/migrate/report";
import { projectName } from "../src/migrate/run";
import type { MigrationReport } from "../src/migrate/types";

const base: MigrationReport = {
  project: "docs-example-com",
  site: "https://docs.example.com",
  startedAt: "2026-08-21T10:00:00.000Z",
  finishedAt: "2026-08-21T10:04:00.000Z",
  outDir: "/tmp/output/projects/docs-example-com",
  discovery: {
    vendor: "readme",
    source: "llms.txt, plus any sidebar page missing from it",
    tabs: [{ name: "Guides", url: "/docs", groups: 4, pages: 30 }],
    skippedTabs: [{ name: "Recipes", url: "/recipes", reason: "no page links found in this tab" }],
    navPages: 30,
    listedPages: 42,
  },
  totals: {
    pages: 3,
    converted: 3,
    failed: 0,
    compiles: 2,
    needRepair: 1,
    blockers: 1,
    flags: 4,
    quarantined: 3,
    endpoints: 0,
  },
  pages: [
    {
      slug: "docs/one",
      title: "One",
      url: "https://docs.example.com/docs/one",
      parseMode: "mdx",
      outputCompiles: true,
      notes: { blocker: 0, flag: 2, change: 5 },
      quarantined: [{ name: "Widget", kind: "unknown", line: 12 }],
    },
    {
      slug: "docs/two",
      title: "Two",
      url: "https://docs.example.com/docs/two",
      parseMode: "mdx",
      outputCompiles: true,
      notes: { blocker: 0, flag: 1, change: 3 },
      quarantined: [{ name: "Widget", kind: "unknown", line: 4 }],
    },
    {
      slug: "reference/get-thing",
      title: "Get thing",
      url: "https://docs.example.com/reference/get-thing",
      parseMode: "markdown",
      outputCompiles: false,
      notes: { blocker: 1, flag: 1, change: 0 },
      quarantined: [{ name: "ToggleListItem", kind: "marketplace" }],
    },
  ],
  customComponents: [
    { name: "Widget", kind: "unknown", uses: 2, pages: ["docs/one", "docs/two"] },
    { name: "ToggleListItem", kind: "marketplace", uses: 1, pages: ["reference/get-thing"] },
  ],
  blockers: [
    { slug: "reference/get-thing", rule: "mdx", line: 3, detail: "the converted page will not compile" },
  ],
  failed: [],
  notInNavigation: ["reference/get-thing"],
};

describe("project naming", () => {
  it("turns a host into a directory-safe name", () => {
    expect(projectName(new URL("https://docs.capillarytech.com/docs/thing"))).toBe(
      "docs-capillarytech-com",
    );
  });

  it("ignores the path, so two entry points share one project", () => {
    const a = projectName(new URL("https://docs.example.com/docs"));
    const b = projectName(new URL("https://docs.example.com/reference/get-thing"));
    expect(a).toBe(b);
  });
});

describe("the migration report", () => {
  const markdown = renderMigrationMarkdown(base);

  it("leads with the two counts that mean a page will not ship", () => {
    // Both stated before the navigation section, because a report read top-down
    // should surface what is broken before what was found.
    const notCompiling = markdown.indexOf("will not compile as MDX");
    const repair = markdown.indexOf("needed the lenient parser");
    const nav = markdown.indexOf("## Navigation");

    expect(notCompiling).toBeGreaterThan(-1);
    expect(repair).toBeGreaterThan(-1);
    expect(notCompiling).toBeLessThan(nav);
    expect(repair).toBeLessThan(nav);
  });

  it("rolls components up to one row each, not one per call site", () => {
    expect(markdown).toContain("| `<Widget>` | unknown | 2 |");
    expect(markdown.match(/`<Widget>`/g)).toHaveLength(1);
  });

  it("names the pages the sidebar could not reach", () => {
    expect(markdown).toContain("Pages the sidebar could not reach");
    expect(markdown).toContain("`reference/get-thing`");
  });

  // With no `navPlacements` on the report, those pages really are orphans, and
  // the report has to say so rather than describing a placement that never
  // happened.
  it("calls them orphans when nothing placed them", () => {
    expect(markdown).toContain("no navigation entries");
  });

  it("says where each section went when they were placed", () => {
    const placed = renderMigrationMarkdown({
      ...base,
      navPlacements: [
        { section: "API Reference", count: 190, placement: "new-tab" },
        { section: "Guides", count: 2, placement: "merged" },
      ],
    });

    expect(placed).toContain("**API Reference** — 190 pages, in a new tab of that name");
    expect(placed).toContain("**Guides** — 2 pages, added to the existing tab");
    expect(placed).not.toContain("no navigation entries");
    // The grouping is a guess off a flat list, and the report must not present
    // it as the structure the source site had.
    expect(placed).toContain("Check the grouping");
  });

  it("reports a tab that scraped empty rather than dropping it silently", () => {
    expect(markdown).toContain("Recipes");
    expect(markdown).toContain("no page links found in this tab");
  });

  it("says the fences must not ship", () => {
    expect(markdown).toContain("must not ship");
  });

  it("escapes a pipe in a detail so the table survives it", () => {
    const withPipe = renderMigrationMarkdown({
      ...base,
      blockers: [{ slug: "docs/one", rule: "mdx", detail: "expected `a | b` here" }],
    });
    expect(withPipe).toContain("expected `a \\| b` here");
  });

  it("says so when the run covered less than the whole site", () => {
    // 3 pages against a 42-page site: the same-shaped report as a complete run,
    // which is how a twentieth of a site gets read as all of it.
    expect(markdown).toContain("covered 3 of the site's 42 pages");
    expect(markdown).toContain("not a census of the site");
  });

  it("collapses whitespace in a cell so a wrapped reason keeps its row", () => {
    const messy = renderMigrationMarkdown({
      ...base,
      discovery: {
        ...base.discovery,
        skippedTabs: [{ name: "Home", url: "/", reason: "could not find\n     the sidebar" }],
      },
    });
    expect(messy).toContain("could not find the sidebar");
  });

  it("stays quiet about sections it has nothing for", () => {
    const clean = renderMigrationMarkdown({
      ...base,
      totals: { ...base.totals, compiles: 3, needRepair: 0, blockers: 0, quarantined: 0 },
      discovery: { ...base.discovery, skippedTabs: [], listedPages: 3 },
      customComponents: [],
      blockers: [],
      notInNavigation: [],
    });

    expect(clean).not.toContain("## Blockers");
    expect(clean).not.toContain("Components still owed a decision");
    expect(clean).not.toContain("will not compile as MDX");
    expect(clean).toContain("## Pages");
  });
});
