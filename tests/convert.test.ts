import { describe, expect, it } from "vitest";

import { pagesFromDocumentationJson } from "../src/convert/pages";

const SITE = "https://docs.example.com";

const config = {
  name: "Example Docs",
  navigation: {
    tabs: [
      {
        tab: "User Documentation",
        groups: [
          {
            group: "Getting Started",
            pages: [
              { title: "Introduction", path: "docs/introduction" },
              {
                group: "Loyalty",
                pages: [{ title: "Create a reward", path: "docs/create-a-reward" }],
              },
            ],
          },
        ],
      },
      {
        tab: "API Documentation",
        pages: [{ title: "Get member", path: "reference/get-member" }],
      },
    ],
  },
};

describe("pagesFromDocumentationJson", () => {
  it("walks tabs, groups and nested groups into one flat list", () => {
    const list = pagesFromDocumentationJson(config, { site: SITE });

    expect(list.pages.map((page) => page.slug)).toEqual([
      "docs/introduction",
      "docs/create-a-reward",
      "reference/get-member",
    ]);
    expect(list.name).toBe("Example Docs");
    expect(list.pages.map((page) => page.order)).toEqual([0, 1, 2]);
  });

  it("builds the `.md` URL every page's markdown is served at", () => {
    const [first] = pagesFromDocumentationJson(config, { site: SITE }).pages;

    expect(first?.url).toBe("https://docs.example.com/docs/introduction");
    expect(first?.source).toBe("https://docs.example.com/docs/introduction.md");
  });

  it("records the tab and the group breadcrumb a page came from", () => {
    const list = pagesFromDocumentationJson(config, { site: SITE });
    const nested = list.pages.find((page) => page.slug === "docs/create-a-reward");

    expect(nested?.tab).toBe("User Documentation");
    expect(nested?.groups).toEqual(["User Documentation", "Getting Started", "Loyalty"]);
    expect(nested?.section).toBe("Loyalty");
  });

  it("classifies reference pages as api, like the download stage does", () => {
    const list = pagesFromDocumentationJson(config, { site: SITE });

    expect(list.pages.find((page) => page.slug === "reference/get-member")?.kind).toBe("api");
    expect(list.pages.find((page) => page.slug === "docs/introduction")?.kind).toBe("guide");
  });

  // The entry URL a user pastes usually has a path on it. Joining `docs/x` onto
  // `https://host/docs` would give `/docs/docs/x`, so only the origin is used.
  it("ignores any path on the site URL", () => {
    const list = pagesFromDocumentationJson(config, { site: "https://docs.example.com/docs" });

    expect(list.site).toBe("https://docs.example.com");
    expect(list.pages[0]?.url).toBe("https://docs.example.com/docs/introduction");
  });

  it("normalises a leading slash and a file extension on `path`", () => {
    const list = pagesFromDocumentationJson(
      { navigation: { tabs: [{ tab: "T", pages: [{ path: "/docs/setup.mdx" }] }] } },
      { site: SITE }
    );

    expect(list.pages[0]?.slug).toBe("docs/setup");
    expect(list.pages[0]?.source).toBe("https://docs.example.com/docs/setup.md");
  });

  it("derives a title when the entry has none", () => {
    const list = pagesFromDocumentationJson(
      { navigation: { tabs: [{ tab: "T", pages: [{ path: "docs/get-started" }] }] } },
      { site: SITE }
    );

    expect(list.pages[0]?.title).toBe("Get Started");
  });

  it("skips entries with nothing to fetch, and says why", () => {
    const list = pagesFromDocumentationJson(
      {
        navigation: {
          tabs: [
            {
              tab: "T",
              pages: [
                { path: "docs/real" },
                { path: "https://elsewhere.com/docs/x" },
                { path: "#section" },
                { path: "  " },
              ],
            },
          ],
        },
      },
      { site: SITE }
    );

    expect(list.pages.map((page) => page.slug)).toEqual(["docs/real"]);
    expect(list.skipped).toHaveLength(3);
    expect(list.skipped[0]?.reason).toContain("not a local page");
  });

  // ReadMe sidebars cross-list pages, so a config can carry the same path twice.
  it("keeps the first occurrence of a duplicated path", () => {
    const list = pagesFromDocumentationJson(
      {
        navigation: {
          tabs: [
            { tab: "A", pages: [{ title: "First", path: "docs/x" }] },
            { tab: "B", pages: [{ title: "Second", path: "docs/x" }] },
          ],
        },
      },
      { site: SITE }
    );

    expect(list.pages).toHaveLength(1);
    expect(list.pages[0]?.title).toBe("First");
    expect(list.duplicates).toEqual(["docs/x"]);
  });

  it("filters by slug prefix without matching a sibling prefix", () => {
    const list = pagesFromDocumentationJson(
      {
        navigation: {
          tabs: [
            {
              tab: "T",
              pages: [
                { path: "docs/loyalty" },
                { path: "docs/loyalty/tiers" },
                { path: "docs/loyalty-2" },
              ],
            },
          ],
        },
      },
      { site: SITE, filter: "docs/loyalty" }
    );

    expect(list.pages.map((page) => page.slug)).toEqual(["docs/loyalty", "docs/loyalty/tiers"]);
  });

  it("applies a limit and reports what it left out", () => {
    const list = pagesFromDocumentationJson(config, { site: SITE, limit: 2 });

    expect(list.pages).toHaveLength(2);
    expect(list.skipped[0]?.reason).toContain("past the limit of 2");
  });

  it("walks dropdowns and pages held directly under navigation", () => {
    const list = pagesFromDocumentationJson(
      {
        navigation: {
          dropdowns: [{ dropdown: "More", pages: [{ path: "docs/from-dropdown" }] }],
          pages: [{ path: "docs/loose" }],
        },
      },
      { site: SITE }
    );

    expect(list.pages.map((page) => page.slug)).toEqual(["docs/from-dropdown", "docs/loose"]);
    expect(list.pages[0]?.groups).toEqual(["More"]);
  });

  it("rejects input it cannot interpret at all", () => {
    expect(() => pagesFromDocumentationJson("nope", { site: SITE })).toThrow(/JSON object/);
    expect(() => pagesFromDocumentationJson({ name: "x" }, { site: SITE })).toThrow(/navigation/);
    expect(() => pagesFromDocumentationJson(config, { site: "not-a-url" })).toThrow();
  });
});
