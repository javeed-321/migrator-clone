import { describe, expect, it, beforeEach } from "vitest";

import { OVERVIEW_PAGE_SLUG } from "../src/constants";
import { iterateOverNavItems } from "../src/nav/iterate";
import { retrieveListNavItems, retrieveListPage } from "../src/nav/list";
import { retrieveNavItems } from "../src/nav/retrieve";
import { retrieveRootNavElement } from "../src/nav/root";
import { htmlToHast } from "../src/pipeline/root";
import { retrieveTabLinks } from "../src/tabs/retrieve";
import { detectFramework, framework, resetFramework } from "../src/utils/detectFramework";

const READ_ME_META = '<meta name="readme-deploy" content="1">';

function sidebarHtml(inner: string) {
  return `<html><head>${READ_ME_META}</head><body>
    <nav class="rm-Sidebar">${inner}</nav>
  </body></html>`;
}

/** Matches the DOM ReadMe actually ships: a <button> heading, not an <h2>. */
function section(heading: string, listItems: string) {
  return `<section class="rm-Sidebar-section">
    <button class="rm-Sidebar-category"><span>${heading}</span></button>
    <ul class="rm-Sidebar-list">${listItems}</ul>
  </section>`;
}

function leaf(href: string, label: string) {
  return `<li class="Sidebar-item"><a class="rm-Sidebar-link childless" href="${href}"><span>${label}</span></a></li>`;
}

function parent(href: string, label: string, children: string) {
  return `<li class="Sidebar-item">
    <a class="rm-Sidebar-link Sidebar-link_parent" href="${href}"><span>${label}</span><button><i class="icon-chevron-rightward"></i></button></a>
    <ul class="subpages rm-Sidebar-list">${children}</ul>
  </li>`;
}

function parse(html: string) {
  const hast = htmlToHast(html);
  detectFramework(hast);
  const sidebar = retrieveRootNavElement(hast);
  return { hast, sidebar };
}

describe("vendor detection", () => {
  beforeEach(resetFramework);

  it("detects ReadMe from its deploy meta tag", () => {
    const hast = htmlToHast(sidebarHtml(""));
    expect(detectFramework(hast)).toBe(true);
    expect(framework.vendor).toBe("readme");
  });

  it("rejects a docs site built on anything else", () => {
    const hast = htmlToHast(
      '<html><head><meta name="generator" content="GitBook"></head><body></body></html>'
    );
    expect(detectFramework(hast)).toBe(false);
    expect(framework.vendor).toBeUndefined();
  });

  it("fails when there is no vendor meta at all", () => {
    const hast = htmlToHast("<html><head></head><body></body></html>");
    expect(detectFramework(hast)).toBe(false);
    expect(framework.vendor).toBeUndefined();
  });
});

describe("sidebar root", () => {
  beforeEach(resetFramework);

  it("finds nav.rm-Sidebar", () => {
    const { sidebar } = parse(sidebarHtml(section("Getting Started", leaf("/docs/intro", "Intro"))));
    expect(sidebar?.tagName).toBe("nav");
  });

  it("returns undefined when there is no sidebar", () => {
    const { sidebar } = parse(`<html><head>${READ_ME_META}</head><body><main></main></body></html>`);
    expect(sidebar).toBeUndefined();
  });
});

describe("nav tree walk", () => {
  beforeEach(resetFramework);

  it("names a section from its heading, not its first link", () => {
    const { sidebar } = parse(
      sidebarHtml(
        section("Capillary Data Platform", parent("/docs/data-entities", "Entities Management", leaf("/docs/customer", "Customer")))
      )
    );

    expect(retrieveNavItems(sidebar!)).toEqual([
      {
        group: "Capillary Data Platform",
        pages: [
          { group: "Entities Management", pages: ["docs/data-entities", "docs/customer"] },
        ],
      },
    ]);
  });

  it("does not duplicate a section's first page", () => {
    const { sidebar } = parse(
      sidebarHtml(section("Getting Started", leaf("/docs/intro", "Intro") + leaf("/docs/setup", "Setup")))
    );

    expect(retrieveNavItems(sidebar!)).toEqual([
      { group: "Getting Started", pages: ["docs/intro", "docs/setup"] },
    ]);
  });

  it("keeps a parent page as the first entry of its own group", () => {
    const { sidebar } = parse(
      sidebarHtml(section("Loyalty", parent("/docs/loyalty", "Loyalty", leaf("/docs/setup", "Setup"))))
    );

    const [group] = retrieveNavItems(sidebar!) as [{ group: string; pages: unknown[] }];
    const inner = group.pages[0] as { group: string; pages: string[] };
    expect(inner.pages).toEqual(["docs/loyalty", "docs/setup"]);
  });

  it("marks a landing page whose slug prefixes a child's", () => {
    const { sidebar } = parse(
      sidebarHtml(section("Loyalty", parent("/docs/loyalty", "Loyalty", leaf("/docs/loyalty-a", "A"))))
    );

    const [group] = retrieveNavItems(sidebar!) as [{ group: string; pages: unknown[] }];
    const inner = group.pages[0] as { group: string; pages: string[] };
    // The marker is a plain prefix match, so a sibling triggers it too. It is
    // stripped again in step 9b, so the published slug is still docs/loyalty.
    expect(inner.pages[0]).toBe("docs/loyalty" + OVERVIEW_PAGE_SLUG);
  });

  it("skips ReadMe API endpoint links", () => {
    const apiLink = `<li><a class="rm-Sidebar-link" href="/reference/get-user"><span class="rm-APIMethod">get</span><span>Get user</span></a></li>`;
    const { sidebar } = parse(sidebarHtml(section("API", apiLink + leaf("/reference/intro", "Intro"))));

    expect(retrieveNavItems(sidebar!)).toEqual([{ group: "API", pages: ["reference/intro"] }]);
  });

  it("skips anchors with no href and bare # links", () => {
    const { sidebar } = parse(
      sidebarHtml(section("Misc", `<li><a class="rm-Sidebar-link" href="#">Toggle</a></li>` + leaf("/docs/real", "Real")))
    );

    expect(retrieveNavItems(sidebar!)).toEqual([{ group: "Misc", pages: ["docs/real"] }]);
  });

  it("returns pages ungrouped when a section has no heading", () => {
    const { sidebar } = parse(
      sidebarHtml(`<section class="rm-Sidebar-section"><ul>${leaf("/docs/a", "A")}</ul></section>`)
    );

    expect(retrieveNavItems(sidebar!)).toEqual(["docs/a"]);
  });
});

describe("paginated list fallback", () => {
  beforeEach(resetFramework);

  /** The shape ReadMe ships for changelog and discussions: no sidebar at all. */
  function listHtml(entries: string, pagination = "") {
    return `<html><head>${READ_ME_META}</head><body>
      <header class="rm-Header"><nav><a href="/main/changelog">Changelog</a></nav></header>
      <main class="rm-Changelog" id="content">${entries}${pagination}</main>
    </body></html>`;
  }

  const post = (slug: string, title: string) =>
    `<article class="rm-Changelog-post"><a href="/main/changelog/${slug}"><h1>${title}</h1></a></article>`;

  const CHANGELOG = new URL("https://docs.example.com/main/changelog");

  it("collects entry slugs and reads the page counter", () => {
    const hast = htmlToHast(
      listHtml(
        post("first-post", "First") + post("second-post", "Second"),
        `<nav class="rm-Pagination"><span>1 of 22</span>
         <a aria-label="Next Page" href="/main/changelog?page=2&amp;lang=en"></a></nav>`
      )
    );
    detectFramework(hast);

    const page = retrieveListPage(hast, CHANGELOG);
    expect(page?.slugs).toEqual(["main/changelog/first-post", "main/changelog/second-post"]);
    expect(page?.totalPages).toBe(22);
    expect(page?.next?.toString()).toBe("https://docs.example.com/main/changelog?page=2&lang=en");
  });

  it("does not mistake the pagination link for an entry", () => {
    const hast = htmlToHast(
      listHtml(
        post("only-post", "Only"),
        `<nav class="rm-Pagination"><a aria-label="Next Page" href="/main/changelog?page=2"></a></nav>`
      )
    );
    detectFramework(hast);

    expect(retrieveListPage(hast, CHANGELOG)?.slugs).toEqual(["main/changelog/only-post"]);
  });

  it("builds one flat group, named after the tab, for a single-page list", async () => {
    const hast = htmlToHast(listHtml(post("a", "A") + post("b", "B")));
    detectFramework(hast);

    // No counter and no next link, so this resolves without touching the network.
    await expect(retrieveListNavItems(hast, CHANGELOG, { title: "Changelog" })).resolves.toEqual([
      { group: "Changelog", pages: ["main/changelog/a", "main/changelog/b"] },
    ]);
  });

  it("names the group from the path when no tab name is given", async () => {
    const hast = htmlToHast(listHtml(post("a", "A")));
    detectFramework(hast);

    const [group] = (await retrieveListNavItems(hast, CHANGELOG)) as unknown as [{ group: string }];
    expect(group.group).toBe("Changelog");
  });

  it("refuses a landing page, so its links never become a Home tab", async () => {
    // ReadMe's landing page sits at "/" and links into every other tab. Left
    // unchecked the base-path test degenerates to `startsWith("/")` and hoovers
    // up the lot.
    const hast = htmlToHast(
      `<html><head>${READ_ME_META}</head><body>
         <main class="rm-LandingPage" id="content">
           <a href="/docs/loyalty-overview">Loyalty</a>
           <a href="/reference/customer">Customer API</a>
         </main>
       </body></html>`
    );
    detectFramework(hast);

    await expect(
      retrieveListNavItems(hast, new URL("https://docs.example.com/"))
    ).resolves.toEqual([]);
  });

  it("refuses the site root even when the page looks like a list", async () => {
    const hast = htmlToHast(
      listHtml(post("a", "A") + post("b", "B"))
        .replace('class="rm-Changelog"', 'class="rm-Changelog"')
    );
    detectFramework(hast);

    // Same markup that works at /main/changelog returns nothing at "/".
    await expect(retrieveListNavItems(hast, new URL("https://docs.example.com/"))).resolves.toEqual(
      []
    );
  });

  it("refuses a custom page, whose links all belong to other tabs", async () => {
    const hast = htmlToHast(
      `<html><head>${READ_ME_META}</head><body>
         <main class="SuperHubCustomPage rm-CustomPage" id="content">
           <a href="/page/developerdocumentation/extra">Extra</a>
         </main>
       </body></html>`
    );
    detectFramework(hast);

    await expect(
      retrieveListNavItems(hast, new URL("https://docs.example.com/page/developerdocumentation"))
    ).resolves.toEqual([]);
  });

  it("returns nothing for a client-rendered list, so the sidebar error still wins", async () => {
    // ReadMe's Recipes tab: the container is present but the entries are not.
    const hast = htmlToHast(
      `<html><head>${READ_ME_META}</head><body><main class="rm-Recipes" id="content"></main></body></html>`
    );
    detectFramework(hast);

    await expect(
      retrieveListNavItems(hast, new URL("https://docs.example.com/main/recipes"))
    ).resolves.toEqual([]);
  });

  it("ignores a list page when the vendor is not ReadMe", async () => {
    const hast = htmlToHast(listHtml(post("a", "A")));
    // Deliberately no detectFramework call — vendor stays undefined.
    await expect(retrieveListNavItems(hast, CHANGELOG)).resolves.toEqual([]);
  });
});

describe("flattening", () => {
  beforeEach(resetFramework);

  it("resolves slugs against the origin", () => {
    const urls = iterateOverNavItems(
      [{ group: "G", pages: ["docs/a", { group: "H", pages: ["docs/b"] }] }],
      "https://docs.example.com"
    );
    expect(urls.map((u) => u.toString())).toEqual([
      "https://docs.example.com/docs/a",
      "https://docs.example.com/docs/b",
    ]);
  });
});

describe("tab discovery", () => {
  beforeEach(resetFramework);

  it("collects header tabs and drops auth links", () => {
    const html = `<html><head>${READ_ME_META}</head><body>
      <header class="rm-Header">
        <nav>
          <a href="/docs">User Documentation</a>
          <a href="/reference">API Documentation</a>
          <a href="https://status.example.com">Status</a>
        </nav>
        <div class="rm-Header-right"><a href="/login?redirect_uri=/docs">Log In</a></div>
      </header>
    </body></html>`;

    const hast = htmlToHast(html);
    detectFramework(hast);

    expect(retrieveTabLinks(hast)).toEqual([
      { name: "User Documentation", url: "/docs" },
      { name: "API Documentation", url: "/reference" },
    ]);
  });
});
