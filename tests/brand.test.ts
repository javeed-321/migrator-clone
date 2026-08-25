import { describe, expect, it } from "vitest";

import {
  contrast,
  deriveDarkBrand,
  extractBrand,
  fetchBrand,
  normaliseHex,
  renderBrandCss,
  toBrandConfig,
} from "../src/brand";
import { buildDocumentationJson } from "../src/output/documentationJson";

const SITE = new URL("https://docs.capillarytech.com/docs");

/** The shape current ReadMe serves, trimmed to the fields the extractor reads. */
function ssrProps(appearance: unknown, name = "Capillary Documentation"): string {
  const props = { context: { projectStore: { data: { name, appearance } } } };
  return `<script id="ssr-props" type="application/x-ssr-props">${JSON.stringify(props)}</script>`;
}

/** The older shape, where every image is a positional array. */
function legacyProps(appearance: unknown, name = "Legacy Docs"): string {
  const props = { context: { project: { name, appearance } } };
  return `<script id="ssr-props" type="application/x-ssr-props">${JSON.stringify(props)}</script>`;
}

const FULL_APPEARANCE = {
  brand: { primary_color: "#1341A9", primary_color_dark: "#7aa5ff", link_color: "#2b61d7" },
  logo: {
    main: { url: "https://files.readme.io/bba3939-logo.png", width: 204, height: 45 },
    dark_mode: { url: "https://files.readme.io/8dd20af-white-logo.png" },
    favicon: { url: "https://files.readme.io/4956d96-favicon.ico" },
  },
};

describe("colour helpers", () => {
  it("normalises every hex form the wild uses", () => {
    expect(normaliseHex("#1341A9")).toBe("#1341a9");
    expect(normaliseHex("1341a9")).toBe("#1341a9");
    expect(normaliseHex("#abc")).toBe("#aabbcc");
    expect(normaliseHex("rgb(19, 65, 169)")).toBe("#1341a9");
    // Alpha is dropped, not blended: the target takes an opaque colour.
    expect(normaliseHex("#1341a9ff")).toBe("#1341a9");
  });

  it("refuses anything that is not a colour", () => {
    for (const value of ["", "   ", "inherit", "var(--x)", "#12345", "rgb(300, 0, 0)", null]) {
      expect(normaliseHex(value)).toBeUndefined();
    }
  });

  it("lightens a dark brand until it reads on a dark page", () => {
    const derived = deriveDarkBrand("#1341a9");

    expect(contrast("#1341a9", "#111827")).toBeLessThan(4.5);
    expect(contrast(derived, "#111827")).toBeGreaterThanOrEqual(4.5);
  });

  it("leaves a colour that already reads alone", () => {
    expect(deriveDarkBrand("#85a1ff")).toBe("#85a1ff");
  });
});

describe("brand extraction — the ladder", () => {
  it("reads the current ReadMe project config", () => {
    const brand = extractBrand(ssrProps(FULL_APPEARANCE), SITE);

    expect(brand).toEqual({
      name: { value: "Capillary Documentation", from: "ssr-props" },
      brandLight: { value: "#1341a9", from: "ssr-props" },
      brandDark: { value: "#7aa5ff", from: "ssr-props" },
      logoLight: { value: "https://files.readme.io/bba3939-logo.png", from: "ssr-props" },
      logoDark: { value: "https://files.readme.io/8dd20af-white-logo.png", from: "ssr-props" },
      favicon: { value: "https://files.readme.io/4956d96-favicon.ico", from: "ssr-props" },
    });
  });

  it("reads the legacy shape, where images are positional arrays", () => {
    const html = legacyProps({
      colors: { main: "#1341A9", main_dark: "" },
      logo: ["https://files.readme.io/bba3939-logo.png", "logo.png", 204, 45, "#000000"],
      logo_white: ["https://files.readme.io/8dd20af-white-logo.png", "white-logo.png"],
      favicon: ["https://files.readme.io/4956d96-favicon.ico", "favicon.ico", 16, 16],
    });

    const brand = extractBrand(html, SITE);

    expect(brand.brandLight).toEqual({ value: "#1341a9", from: "ssr-props-legacy" });
    expect(brand.logoDark?.value).toBe("https://files.readme.io/8dd20af-white-logo.png");
    // `main_dark: ""` is not a colour, so the field stays open for the deriver.
    expect(brand.brandDark).toBeUndefined();
  });

  it("fills gaps per field rather than per source", () => {
    // The project config has the colour but no favicon; the `<link>` tag has the
    // favicon. Both must survive.
    const html = [
      ssrProps({ brand: { primary_color: "#1341A9" } }),
      '<link rel="shortcut icon" href="/favicon-v3.ico">',
    ].join("");

    const brand = extractBrand(html, SITE);

    expect(brand.brandLight?.from).toBe("ssr-props");
    expect(brand.favicon).toEqual({
      value: "https://docs.capillarytech.com/favicon-v3.ico",
      from: "link-tag",
    });
  });

  it("falls back to the og:image parameters when there is no project config", () => {
    const html =
      '<meta property="og:image" content="https://cdn.readme.io/og-image/create?type=docs' +
      "&amp;projectTitle=Capillary%20Documentation" +
      "&amp;logoUrl=https%3A%2F%2Ffiles.readme.io%2Fbba3939-logo.png" +
      '&amp;color=%231341A9">';

    const brand = extractBrand(html, SITE);

    expect(brand.brandLight).toEqual({ value: "#1341a9", from: "og-image" });
    expect(brand.logoLight).toEqual({
      value: "https://files.readme.io/bba3939-logo.png",
      from: "og-image",
    });
    expect(brand.name).toEqual({ value: "Capillary Documentation", from: "meta" });
  });

  it("falls back to theme-color, apple-touch-icon and <title>", () => {
    const html = [
      "<title>Acme Docs</title>",
      '<meta name="theme-color" content="#ff6600">',
      '<link rel="apple-touch-icon" href="https://cdn.acme.com/touch.png">',
    ].join("");

    const brand = extractBrand(html, SITE);

    expect(brand.brandLight).toEqual({ value: "#ff6600", from: "meta" });
    expect(brand.favicon?.value).toBe("https://cdn.acme.com/touch.png");
    expect(brand.name?.value).toBe("Acme Docs");
  });

  it("falls back to the CSS variable last of all", () => {
    const html = "<style>:root{--project-color-primary:#1341A9;--color-primary:#1341A9;}</style>";

    expect(extractBrand(html, SITE).brandLight).toEqual({
      value: "#1341a9",
      from: "css-variable",
    });
  });

  it("survives a page with no branding at all, and one with a broken blob", () => {
    expect(extractBrand("<html><body>hi</body></html>", SITE)).toEqual({});
    expect(
      extractBrand('<script id="ssr-props" type="application/x-ssr-props">{oops</script>', SITE),
    ).toEqual({});
  });
});

describe("brand -> documentation.json", () => {
  it("sets brand only, and keeps the accessible defaults for heading and text", () => {
    const config = toBrandConfig(extractBrand(ssrProps(FULL_APPEARANCE), SITE));

    expect(config.colors).toEqual({
      light: { brand: "#1341a9", heading: "#1a1a1a", text: "#374151" },
      dark: { brand: "#7aa5ff", heading: "#f2f2f2", text: "#c1c1c1" },
    });
  });

  it("uses the one logo for both themes when the project has one", () => {
    const brand = extractBrand(
      ssrProps({ logo: { main: { url: "https://cdn/logo.png" } } }),
      SITE,
    );
    const config = toBrandConfig(brand);

    expect(config["logo-light"]).toBe("https://cdn/logo.png");
    expect(config["logo-dark"]).toBe("https://cdn/logo.png");
  });

  // The browser tab is `favicon` and nothing else: `layout.tsx` reads that key
  // alone, and both navbars render `logo-small-*` as the logo on a narrow
  // viewport. Writing the favicon there lost the tab icon *and* stretched a
  // 16×16 `.ico` across the mobile header.
  it("puts the favicon on the favicon key", () => {
    const config = toBrandConfig(extractBrand(ssrProps(FULL_APPEARANCE), SITE));

    expect(config.favicon).toBe("https://files.readme.io/4956d96-favicon.ico");
  });

  it("puts the logo, not the favicon, on the small-navbar keys", () => {
    const config = toBrandConfig(extractBrand(ssrProps(FULL_APPEARANCE), SITE));

    expect(config["logo-small-light"]).toBe("https://files.readme.io/bba3939-logo.png");
    expect(config["logo-small-dark"]).toBe("https://files.readme.io/8dd20af-white-logo.png");
  });

  it("prefers a saved local copy when one was asked for", () => {
    const brand = extractBrand(ssrProps(FULL_APPEARANCE), SITE);
    const config = toBrandConfig(brand, {
      "https://files.readme.io/bba3939-logo.png": "brand/bba3939-logo.png",
    });

    expect(config["logo-light"]).toBe("brand/bba3939-logo.png");
    // Not saved, so it keeps the URL that is serving it today.
    expect(config["logo-dark"]).toBe("https://files.readme.io/8dd20af-white-logo.png");
  });

  it("carries the logos and the stylesheet into the built config", () => {
    const config = buildDocumentationJson(
      [{ name: "Docs", url: "/docs", navigation: ["docs/introduction"] }],
      {
        name: "Capillary Documentation",
        colors: toBrandConfig(extractBrand(ssrProps(FULL_APPEARANCE), SITE)).colors,
        logos: { "logo-light": "https://cdn/logo.png" },
        css: [{ src: "styles/brand.css" }],
      },
    );

    expect(config["logo-light"]).toBe("https://cdn/logo.png");
    expect(config.css).toEqual([{ src: "styles/brand.css" }]);
    expect(config.colors.light.brand).toBe("#1341a9");
    expect(config.navigation.tabs).toHaveLength(1);
  });

  it("registers no css key when there is no stylesheet", () => {
    const config = buildDocumentationJson(
      [{ name: "Docs", url: "/docs", navigation: ["docs/introduction"] }],
      {},
    );

    expect(config.css).toBeUndefined();
    expect("logo-light" in config).toBe(false);
  });
});

describe("fetchBrand", () => {
  const html = ssrProps({
    brand: { primary_color: "#1341A9", primary_color_dark: null },
    logo: FULL_APPEARANCE.logo,
  });

  it("derives the dark brand ReadMe leaves unset, and says that it did", async () => {
    const result = await fetchBrand(SITE, { fetchHtml: async () => html });

    expect(result.brand.brandDark?.from).toBe("derived");
    expect(contrast(result.brand.brandDark?.value as string, "#111827")).toBeGreaterThanOrEqual(4.5);
    expect(result.report.found.find((row) => row.field === "brandDark")?.from).toBe("derived");
  });

  it("reports what it found and what it did not", async () => {
    const result = await fetchBrand(SITE, {
      fetchHtml: async () => ssrProps({ brand: { primary_color: "#1341A9" } }, ""),
    });

    expect(result.report.found.map((row) => row.field)).toEqual(["brandLight", "brandDark"]);
    expect(result.report.missing).toEqual(["name", "logoLight", "logoDark", "favicon"]);
  });

  it("refuses a colour with no hue, rather than shipping an invisible link", async () => {
    // developers.miro.com really does have `primary_color: "#ffffff"` — the
    // setting is its header background, not a brand colour.
    const result = await fetchBrand(SITE, {
      fetchHtml: async () => ssrProps({ brand: { primary_color: "#ffffff" } }),
    });

    expect(result.report.rejected).toEqual([
      {
        field: "brandLight",
        value: "#ffffff",
        reason:
          "unreadable on the light background and has no hue to shift — usually a header colour rather than a brand colour",
      },
    ]);
    // The default stands, so links stay readable.
    expect(result.config.colors.light.brand).toBe("#3143e3");
    expect(result.config.colors.dark.brand).toBe("#85a1ff");
  });

  it("moves a colourful brand that fails contrast, and keeps the original in the report", async () => {
    const result = await fetchBrand(SITE, {
      fetchHtml: async () => ssrProps({ brand: { primary_color: "#ffd400" } }),
    });

    const light = result.config.colors.light.brand;
    expect(light).not.toBe("#ffd400");
    expect(contrast(light, "#ffffff")).toBeGreaterThanOrEqual(4.5);
    expect(result.report.adjusted[0]).toMatchObject({ field: "brandLight", was: "#ffd400" });
  });

  it("touches no asset when there is nowhere to save one", async () => {
    const result = await fetchBrand(SITE, {
      fetchHtml: async () => html,
      fetchImpl: () => {
        throw new Error("the asset download must not run without an outDir");
      },
    });

    expect(result.report.assets).toEqual({});
    expect(result.config["logo-light"]).toBe("https://files.readme.io/bba3939-logo.png");
  });

  it("writes a variables-only stylesheet", () => {
    const brand = extractBrand(ssrProps(FULL_APPEARANCE), SITE);
    const css = renderBrandCss(brand, SITE.toString());

    expect(css).toContain("--rm-brand: #1341a9;");
    expect(css).toContain("--rm-brand-dark: #7aa5ff;");
    // No rules, so including the file can never change the theme.
    expect(css).not.toMatch(/^\s*[a-z][a-z-]*\s*\{/m);
  });
});
