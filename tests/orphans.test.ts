import { describe, expect, it } from "vitest";

import type { PageRef } from "../src/download/types";
import { placementsForUnreachable, tabsForUnreachable } from "../src/migrate/orphans";
import { buildDocumentationJson, type TabInput } from "../src/output/documentationJson";

const tab = (name: string, navigation: TabInput["navigation"]): TabInput => ({
  name,
  url: `/${name.toLowerCase()}`,
  navigation,
});

/** An `llms.txt` entry. Only `slug` and `section` matter here. */
const ref = (slug: string, section: string): PageRef => ({
  title: slug,
  description: "",
  source: `https://x.test/${slug}.md`,
  url: `https://x.test/${slug}`,
  slug,
  section,
  kind: "guide",
});

describe("navigation for pages the sidebar could not reach", () => {
  it("puts a section with no matching tab into a new tab of that name", () => {
    const tabs = tabsForUnreachable(
      ["reference/getaccount", "reference/closeaccount"],
      [ref("reference/getaccount", "API Reference"), ref("reference/closeaccount", "API Reference")],
      [tab("Guides", [{ group: "Start", pages: ["docs/intro"] }])],
    );

    expect(tabs).toHaveLength(2);
    expect(tabs[1]?.name).toBe("API Reference");
    // Flat, not wrapped in a group named after the tab it already sits in.
    expect(tabs[1]?.navigation).toEqual(["reference/closeaccount", "reference/getaccount"]);
  });

  it("appends a group to a tab that already carries that section's name", () => {
    const tabs = tabsForUnreachable(
      ["docs/hidden"],
      [ref("docs/hidden", "Guides")],
      [tab("Guides", [{ group: "Start", pages: ["docs/intro"] }])],
    );

    expect(tabs).toHaveLength(1);
    expect(tabs[0]?.navigation).toEqual([
      { group: "Start", pages: ["docs/intro"] },
      { group: "Guides", pages: ["docs/hidden"] },
    ]);
  });

  // ReadMe's own tab names are title-case and its `llms.txt` headings are too,
  // but nothing guarantees they agree — and a case mismatch would silently
  // produce a second tab with the same name, which renders as two tabs.
  it("matches a tab name regardless of case", () => {
    const tabs = tabsForUnreachable(["docs/hidden"], [ref("docs/hidden", "guides")], [
      tab("Guides", ["docs/intro"]),
    ]);

    expect(tabs).toHaveLength(1);
    expect(tabs[0]?.name).toBe("Guides");
  });

  it("collects pages whose llms.txt entry carried no heading", () => {
    const tabs = tabsForUnreachable(["docs/loose"], [ref("docs/loose", "")], [tab("Guides", [])]);

    expect(tabs[1]?.name).toBe("Other pages");
    expect(tabs[1]?.navigation).toEqual(["docs/loose"]);
  });

  it("leaves the tabs untouched when nothing is unreachable", () => {
    const input = [tab("Guides", ["docs/intro"])];
    expect(tabsForUnreachable([], [], input)).toBe(input);
  });

  // The caller passes `discovery.tabs`, which the report also counts pages from.
  it("does not mutate the tabs it was given", () => {
    const input = [tab("Guides", [{ group: "Start", pages: ["docs/intro"] }])];
    tabsForUnreachable(["docs/hidden"], [ref("docs/hidden", "Guides")], input);

    expect(input[0]?.navigation).toEqual([{ group: "Start", pages: ["docs/intro"] }]);
  });

  /*
   * The appended tabs go last so the builder's dedupe keeps the real sidebar's
   * placement. Without the ordering, a page the sidebar owns could be pulled
   * into the guessed group instead and vanish from where the author put it.
   */
  it("never displaces a page the real sidebar already owns", () => {
    const tabs = tabsForUnreachable(
      ["docs/hidden"],
      [ref("docs/hidden", "API Reference"), ref("docs/intro", "API Reference")],
      [tab("Guides", [{ group: "Start", pages: ["docs/intro"] }])],
    );

    const config = buildDocumentationJson(tabs, { name: "X", pathPrefix: "pages" });
    const paths: string[] = [];
    const walk = (node: unknown): void => {
      if (Array.isArray(node)) node.forEach(walk);
      else if (node && typeof node === "object") {
        const record = node as Record<string, unknown>;
        if (typeof record["path"] === "string") paths.push(record["path"]);
        Object.values(record).forEach(walk);
      }
    };
    walk(config.navigation);

    expect(paths).toEqual(["pages/docs/intro", "pages/docs/hidden"]);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("produces an entry for every unreachable page", () => {
    const slugs = ["reference/a", "reference/b", "docs/c"];
    const tabs = tabsForUnreachable(
      slugs,
      [ref("reference/a", "API Reference"), ref("reference/b", "API Reference"), ref("docs/c", "Guides")],
      [tab("Guides", ["docs/intro"])],
    );

    const config = buildDocumentationJson(tabs, { name: "X" });
    const json = JSON.stringify(config);
    for (const slug of slugs) expect(json).toContain(`"${slug}"`);
  });
});

describe("reporting where they went", () => {
  it("says which sections merged and which made a new tab", () => {
    const placements = placementsForUnreachable(
      ["reference/a", "reference/b", "docs/c"],
      [ref("reference/a", "API Reference"), ref("reference/b", "API Reference"), ref("docs/c", "Guides")],
      [tab("Guides", ["docs/intro"])],
    );

    expect(placements).toEqual([
      { section: "Guides", count: 1, placement: "merged" },
      { section: "API Reference", count: 2, placement: "new-tab" },
    ]);
  });

  it("reports nothing when nothing was unreachable", () => {
    expect(placementsForUnreachable([], [], [tab("Guides", [])])).toEqual([]);
  });
});
