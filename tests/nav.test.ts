import { describe, expect, it, beforeEach } from "vitest";

import { OVERVIEW_PAGE_SLUG } from "../src/constants";
import { iterateOverNavItems } from "../src/nav/iterate";
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

  it("recognises GitBook but reports it as unsupported", () => {
    const hast = htmlToHast(
      '<html><head><meta name="generator" content="GitBook"></head><body></body></html>'
    );
    expect(detectFramework(hast)).toBe(false);
    expect(framework.vendor).toBeUndefined();
    expect(framework.unsupportedVendor).toBe("gitbook");
  });

  it("fails on an unknown vendor", () => {
    const hast = htmlToHast("<html><head></head><body></body></html>");
    expect(detectFramework(hast)).toBe(false);
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
