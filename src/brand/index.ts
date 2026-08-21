import { downloadImages } from "../download/images";
import { DEFAULT_COLORS, type DocColors } from "../output/documentationJson";
import { fetchPageHtml } from "../utils/network";
import { DARK_SURFACE, LIGHT_SURFACE, deriveReadable, isColourful, isReadableOn } from "./colors";
import { extractBrand } from "./extract";
import type { Brand, BrandField, BrandReport } from "./types";

export { extractBrand, readSsrProps } from "./extract";
export * from "./colors";
export type { Brand, BrandReport } from "./types";

/**
 * Stage 0 of a migration: the source site's own branding, into
 * `documentation.json`.
 *
 * A migrated site that ships with Documentation.AI's default blue and no logo
 * does not look like the site it replaced, and the person reviewing it reads that
 * as "the migration is not finished" long before they look at a single page. The
 * values are all right there in the page ReadMe already serves, so this reads
 * them once and writes them where the target expects them.
 *
 * ## What it will not do
 *
 * **It sets `brand` only.** `heading` and `text` keep Documentation.AI's
 * defaults, which are chosen for contrast. A source site's body-text grey was
 * picked against *its* background, and copying it across is how a migration
 * ships unreadable text that no page-level review would catch.
 *
 * **It does not repoint the config at local files.** The same policy the image
 * pass follows: a copy of every asset is saved so re-hosting later is possible,
 * and `documentation.json` keeps the CDN URL that is serving today. `local: true`
 * asks for the other behaviour explicitly.
 */

export type BrandOptions = {
  /** Where to save copies of the logo and favicon. Omit to skip the download. */
  outDir?: string;
  /** Folder name under `outDir`. Default `brand`. */
  dir?: string;
  /** Point `documentation.json` at the saved copies instead of the source CDN. */
  local?: boolean;
  /** Injectable, so tests do not reach the network. */
  fetchHtml?: (url: URL) => Promise<string>;
  fetchImpl?: typeof fetch;
};

export type BrandResult = {
  brand: Brand;
  report: BrandReport;
  /** The keys to merge into `documentation.json`. */
  config: BrandConfig;
  /** `styles/brand.css` — the palette as CSS variables. */
  css: string;
};

/** The branding half of `documentation.json` `[LIVE-DAI /docs/customize/branding]`. */
export type BrandConfig = {
  name?: string;
  colors: DocColors;
  "logo-light"?: string;
  "logo-dark"?: string;
  "logo-small-light"?: string;
  "logo-small-dark"?: string;
};

const FIELDS: BrandField[] = [
  "name",
  "brandLight",
  "brandDark",
  "logoLight",
  "logoDark",
  "favicon",
];

type Usable = {
  brand: Brand;
  adjusted: BrandReport["adjusted"];
  rejected: BrandReport["rejected"];
};

/**
 * Makes the two colours usable, and records every change.
 *
 * Three things happen here, and each is a change to what the site said, so each
 * one is reported:
 *
 * 1. **The dark brand is filled in.** ReadMe leaves `primary_color_dark` null on
 *    most projects because its own theme lightens the primary colour at render
 *    time — so copying the light value across reproduces the *config* and not
 *    what the *site looked like*. Documentation.AI's defaults show the intended
 *    relationship: `#3143e3` light, `#85a1ff` dark, one hue, lightened until it
 *    reads.
 * 2. **A colour that fails contrast is moved** until it clears WCAG AA on the
 *    surface it will sit on. `brand` draws links, and an unreadable link is a
 *    broken page, not a styling preference.
 * 3. **A colour with no hue to keep is dropped.** `developers.miro.com` has
 *    `primary_color: "#ffffff"` — the setting is really its header background.
 *    Darkening white gives a grey that is nobody's brand, so the default stands
 *    and the report says so.
 */
function usableColours(input: Brand): Usable {
  const brand: Brand = { ...input };
  const adjusted: BrandReport["adjusted"] = [];
  const rejected: BrandReport["rejected"] = [];

  const fix = (field: "brandLight" | "brandDark", surface: string, theme: string): void => {
    const entry = brand[field];
    if (entry === undefined || isReadableOn(entry.value, surface)) return;

    if (!isColourful(entry.value)) {
      delete brand[field];
      rejected.push({
        field,
        value: entry.value,
        reason: `unreadable on the ${theme} background and has no hue to shift — usually a header colour rather than a brand colour`,
      });
      return;
    }

    const moved = deriveReadable(entry.value, surface);
    adjusted.push({
      field,
      was: entry.value,
      now: moved,
      reason: `${entry.value} does not reach 4.5:1 on the ${theme} background, so the same hue was moved until it did`,
    });
    brand[field] = { value: moved, from: "derived" };
  };

  fix("brandLight", LIGHT_SURFACE, "light");

  // Filling in comes after the light colour is settled, so a derived dark is
  // derived from the value that will actually ship.
  if (brand.brandDark === undefined && brand.brandLight !== undefined) {
    brand.brandDark = {
      value: deriveReadable(brand.brandLight.value, DARK_SURFACE),
      from: "derived",
    };
  }

  fix("brandDark", DARK_SURFACE, "dark");

  return { brand, adjusted, rejected };
}

/** The extracted values as the keys `documentation.json` uses. */
export function toBrandConfig(brand: Brand, assets: Record<string, string> = {}): BrandConfig {
  /** The saved copy when there is one, the original URL when there is not. */
  const asset = (value: string | undefined): string | undefined =>
    value === undefined ? undefined : (assets[value] ?? value);

  const light = brand.brandLight?.value;
  const dark = brand.brandDark?.value;

  const logoLight = asset(brand.logoLight?.value);
  // A project with one logo has one that works on both, so the same file is used
  // for both themes rather than leaving dark mode with none at all.
  const logoDark = asset(brand.logoDark?.value) ?? logoLight;
  const favicon = asset(brand.favicon?.value);

  return {
    ...(brand.name ? { name: brand.name.value } : {}),
    colors: {
      light: { ...DEFAULT_COLORS.light, ...(light ? { brand: light } : {}) },
      dark: { ...DEFAULT_COLORS.dark, ...(dark ? { brand: dark } : {}) },
    },
    ...(logoLight ? { "logo-light": logoLight } : {}),
    ...(logoDark ? { "logo-dark": logoDark } : {}),
    // `logo-small-*` is what the target uses for the browser tab, which is what a
    // favicon is. One file serves both themes unless the project had two.
    ...(favicon ? { "logo-small-light": favicon, "logo-small-dark": favicon } : {}),
  };
}

/**
 * The palette as CSS variables, for `styles/brand.css`.
 *
 * `documentation.json` already themes the site, so this changes nothing on its
 * own — it declares variables and no rules, which is the point. It gives the
 * custom HTML a conversion emits (the wrapped `SnapSlider` and `Windows` blocks,
 * an inline style someone adds later) one place to reach for the brand colour
 * instead of hard-coding a hex that then breaks in dark mode.
 */
export function renderBrandCss(brand: Brand, site: string): string {
  const light = brand.brandLight?.value ?? DEFAULT_COLORS.light.brand;
  const dark = brand.brandDark?.value ?? DEFAULT_COLORS.dark.brand;

  return [
    "/*",
    ` * Brand palette, read from ${site}.`,
    " *",
    " * Variables only — no rules — so including this file cannot change the theme.",
    " * The theme itself comes from `colors` in documentation.json.",
    " */",
    ":root {",
    `  --rm-brand: ${light};`,
    `  --rm-brand-light: ${light};`,
    `  --rm-brand-dark: ${dark};`,
    "}",
    "",
    '[data-theme="dark"] {',
    `  --rm-brand: ${dark};`,
    "}",
    "",
  ].join("\n");
}

/** One URL -> its branding, its saved assets, and the config keys to merge. */
export async function fetchBrand(site: URL, options: BrandOptions = {}): Promise<BrandResult> {
  const html = await (options.fetchHtml ?? fetchPageHtml)(site);
  const { brand, adjusted, rejected } = usableColours(extractBrand(html, site));

  const urls = [brand.logoLight?.value, brand.logoDark?.value, brand.favicon?.value].filter(
    (url): url is string => url !== undefined,
  );

  let assets: Record<string, string> = {};
  let failedAssets: BrandReport["failedAssets"] = [];

  if (options.outDir && urls.length > 0) {
    const dir = options.dir ?? "brand";
    const saved = await downloadImages([...new Set(urls)], {
      outDir: options.outDir,
      dir,
      // Relative, with no leading slash: that is the only form Documentation.AI
      // accepts for a project-relative path `[LIVE-DAI /docs/customize/custom-css]`.
      publicPath: dir,
      ...(options.fetchImpl ? { fetchImpl: options.fetchImpl } : {}),
    });
    assets = saved.map;
    failedAssets = saved.failed;
  }

  const report: BrandReport = {
    url: site.toString(),
    found: FIELDS.flatMap((field) => {
      const entry = brand[field];
      return entry ? [{ field, value: entry.value, from: entry.from }] : [];
    }),
    missing: FIELDS.filter((field) => brand[field] === undefined),
    assets,
    failedAssets,
    adjusted,
    rejected,
  };

  return {
    brand,
    report,
    // A saved copy is only written into the config when it was asked for — see
    // the note at the top of this file.
    config: toBrandConfig(brand, options.local ? assets : {}),
    css: renderBrandCss(brand, site.toString()),
  };
}
