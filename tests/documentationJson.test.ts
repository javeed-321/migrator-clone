import { describe, expect, it } from "vitest";

import { buildDocumentationJson, type TabInput } from "../src/output/documentationJson";

const tab = (name: string, navigation: TabInput["navigation"]): TabInput => ({
  name,
  url: `/${name.toLowerCase()}`,
  navigation,
});

describe("documentation.json builder", () => {
  it("maps groups and pages onto the Documentation.AI shape", () => {
    const config = buildDocumentationJson(
      [
        tab("Documentation", [
          { group: "Getting Started", pages: ["docs/introduction", "docs/quickstart"] },
        ]),
      ],
      { name: "Capillary Docs" }
    );

    expect(config).toEqual({
      name: "Capillary Docs",
      initialRoute: "docs/introduction",
      colors: {
        light: { brand: "#3143e3", heading: "#1a1a1a", text: "#374151" },
        dark: { brand: "#85a1ff", heading: "#f2f2f2", text: "#c1c1c1" },
      },
      navigation: {
        tabs: [
          {
            tab: "Documentation",
            icon: "book",
            groups: [
              {
                group: "Getting Started",
                pages: [
                  { title: "Introduction", path: "docs/introduction" },
                  { title: "Quickstart", path: "docs/quickstart" },
                ],
              },
            ],
          },
        ],
      },
    });
  });

  it("keeps nested groups, which a group's pages array is allowed to hold", () => {
    const config = buildDocumentationJson([
      tab("Docs", [
        {
          group: "Loyalty",
          pages: ["docs/loyalty", { group: "Rewards", pages: ["docs/rewards"] }],
        },
      ]),
    ]);

    const [first] = config.navigation.tabs as unknown as [{ groups: unknown[] }];
    expect(first.groups).toEqual([
      {
        group: "Loyalty",
        pages: [
          { title: "Loyalty", path: "docs/loyalty" },
          { group: "Rewards", pages: [{ title: "Rewards", path: "docs/rewards" }] },
        ],
      },
    ]);
  });

  it("obeys the one-child rule by wrapping loose pages when a tab also has groups", () => {
    const config = buildDocumentationJson([
      tab("Guides", ["docs/overview", { group: "Setup", pages: ["docs/install"] }]),
    ]);

    const [first] = config.navigation.tabs as unknown as [{ groups: { group: string }[] }];
    // A tab may not hold `pages` and `groups` at once, so the loose page moves
    // into a group named after the tab and stays first.
    expect(first).not.toHaveProperty("pages");
    expect(first.groups[0]).toEqual({
      group: "Guides",
      pages: [{ title: "Overview", path: "docs/overview" }],
    });
    expect(first.groups[1]?.group).toBe("Setup");
  });

  it("emits `pages` when a tab has no groups at all", () => {
    const config = buildDocumentationJson([tab("Reference", ["reference/auth"])]);
    expect(config.navigation.tabs[0]).toEqual({
      tab: "Reference",
      icon: "code",
      pages: [{ title: "Auth", path: "reference/auth" }],
    });
  });

  it("drops a slug a previous tab already claimed", () => {
    const config = buildDocumentationJson([
      tab("Docs", [{ group: "A", pages: ["docs/shared", "docs/only-here"] }]),
      tab("Other", [{ group: "B", pages: ["docs/shared", "other/page"] }]),
    ]);

    const second = config.navigation.tabs[1] as unknown as { groups: { pages: { path: string }[] }[] };
    expect(second.groups[0]?.pages.map((p) => p.path)).toEqual(["other/page"]);
  });

  it("omits a tab left empty by deduping", () => {
    const config = buildDocumentationJson([
      tab("Docs", [{ group: "A", pages: ["docs/shared"] }]),
      tab("Duplicate", [{ group: "B", pages: ["docs/shared"] }]),
    ]);
    expect(config.navigation.tabs).toHaveLength(1);
  });

  it("keeps duplicates when dedupe is switched off", () => {
    const config = buildDocumentationJson(
      [
        tab("Docs", [{ group: "A", pages: ["docs/shared"] }]),
        tab("Duplicate", [{ group: "B", pages: ["docs/shared"] }]),
      ],
      { dedupe: false }
    );
    expect(config.navigation.tabs).toHaveLength(2);
  });

  it("title-cases a shouted group name but leaves mixed case alone", () => {
    const config = buildDocumentationJson([
      tab("Docs", [
        { group: "CAPILLARY DATA PLATFORM", pages: ["docs/a"] },
        { group: "OAuth Setup", pages: ["docs/b"] },
      ]),
    ]);

    const [first] = config.navigation.tabs as unknown as [{ groups: { group: string }[] }];
    expect(first.groups.map((g) => g.group)).toEqual(["Capillary Data Platform", "OAuth Setup"]);
  });

  it("prefers a real page title over one derived from the slug", () => {
    const config = buildDocumentationJson(
      [tab("Docs", [{ group: "G", pages: ["docs/loyalty-overview"] }])],
      { titles: { "docs/loyalty-overview": "Introduction to Loyalty+" } }
    );

    const [first] = config.navigation.tabs as unknown as [{ groups: { pages: { title: string }[] }[] }];
    expect(first.groups[0]?.pages[0]?.title).toBe("Introduction to Loyalty+");
  });

  it("falls back to the site hostname for the name", () => {
    const config = buildDocumentationJson([tab("Docs", ["docs/a"])], {
      site: "https://docs.capillarytech.com/docs",
    });
    expect(config.name).toBe("docs.capillarytech.com");
  });
});
