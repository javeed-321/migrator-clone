import type { Brand, Sourced } from "./types";
import { normaliseHex } from "./colors";

/**
 * A ReadMe page's HTML -> its branding.
 *
 * Pure: give it the HTML and the site URL, get the values back. No network, so
 * every rule here is testable against a saved page.
 *
 * ## The ladder
 *
 * Four sources, tried in order, and the **first one that answers a field wins
 * that field** — not the whole object. A site can easily have its colour in the
 * project config and its favicon only in a `<link>` tag, so the ladder is walked
 * per value rather than per source.
 *
 *   1. `<script id="ssr-props">`, current shape   — ReadMe's own project config
 *   2. the same blob, legacy shape                — older ReadMe projects
 *   3. `<link rel="icon">` / `<meta>` tags        — always present, less precise
 *   4. `--color-primary` in an inline `<style>`   — last resort for the colour
 *
 * Rungs 3 and 4 exist because ReadMe has shipped several hub versions and an
 * enterprise variant, and not all of them serve `ssr-props`. On a page that does,
 * they simply never get asked.
 */

// ---------------------------------------------------------------------------
// Reading the blob
// ---------------------------------------------------------------------------

/** The JSON ReadMe embeds for its own client. `undefined` when the page has none. */
export function readSsrProps(html: string): unknown {
  const match = /<script id="ssr-props"[^>]*>([\s\S]*?)<\/script>/.exec(html);
  if (!match?.[1]) return undefined;

  try {
    return JSON.parse(match[1]);
  } catch {
    // A blob we cannot parse is the same as no blob: the ladder moves on to the
    // meta tags rather than the run failing over branding.
    return undefined;
  }
}

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** `at(json, "context.project.name")` — `undefined` at the first missing step. */
function at(root: unknown, path: string): unknown {
  let node: unknown = root;
  for (const key of path.split(".")) {
    if (!isObject(node)) return undefined;
    node = node[key];
  }
  return node;
}

const str = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;

// ---------------------------------------------------------------------------
// Rungs 1 and 2 — the project config
// ---------------------------------------------------------------------------

/**
 * Current ReadMe (SuperHub). Colours live under `appearance.brand`, images under
 * `appearance.logo`, each `{ url, width, height, ... }`.
 */
function fromSsrProps(props: unknown): Brand {
  const data = at(props, "context.projectStore.data");
  const appearance = at(data, "appearance");
  if (!isObject(appearance)) return {};

  const from = "ssr-props" as const;
  const put = <T>(value: T | undefined): Sourced<T> | undefined =>
    value === undefined ? undefined : { value, from };

  const brand = at(appearance, "brand");
  const logo = at(appearance, "logo");

  return compact({
    name: put(str(at(data, "name"))),
    brandLight: put(normaliseHex(str(at(brand, "primary_color")))),
    brandDark: put(normaliseHex(str(at(brand, "primary_color_dark")))),
    logoLight: put(str(at(logo, "main.url"))),
    logoDark: put(str(at(logo, "dark_mode.url"))),
    favicon: put(str(at(logo, "favicon.url"))),
  });
}

/**
 * Older ReadMe. Same information, different shape: colours under
 * `appearance.colors`, and each image is a positional array whose first element
 * is the URL — `["https://…/logo.png", "logo.png", 204, 45, "#000000"]`.
 */
function fromLegacySsrProps(props: unknown): Brand {
  const project = at(props, "context.project");
  const appearance = at(project, "appearance");
  if (!isObject(appearance)) return {};

  const from = "ssr-props-legacy" as const;
  const put = <T>(value: T | undefined): Sourced<T> | undefined =>
    value === undefined ? undefined : { value, from };

  /** The URL out of one of those positional arrays. */
  const url = (key: string): string | undefined => {
    const entry = appearance[key];
    return Array.isArray(entry) ? str(entry[0]) : undefined;
  };

  return compact({
    name: put(str(at(project, "name"))),
    brandLight: put(normaliseHex(str(at(appearance, "colors.main")))),
    brandDark: put(normaliseHex(str(at(appearance, "colors.main_dark")))),
    logoLight: put(url("logo")),
    // ReadMe calls the dark-background logo "white", because that is what it
    // usually is. It is the one to show on a dark page either way.
    logoDark: put(url("logo_white")),
    favicon: put(url("favicon")),
  });
}

// ---------------------------------------------------------------------------
// Rung 3 — meta and link tags
// ---------------------------------------------------------------------------

/** Every `<link>`/`<meta>` attribute pair, as one flat list of tags. */
function tags(html: string, tag: "link" | "meta"): Record<string, string>[] {
  const found: Record<string, string>[] = [];

  for (const match of html.matchAll(new RegExp(`<${tag}\\s[^>]*>`, "gi"))) {
    const attributes: Record<string, string> = {};
    for (const pair of match[0].matchAll(/([a-z-]+)\s*=\s*"([^"]*)"/gi)) {
      attributes[(pair[1] as string).toLowerCase()] = decodeEntities(pair[2] as string);
    }
    found.push(attributes);
  }

  return found;
}

/** Attribute values are entity-encoded; a URL with `&` arrives as `&amp;`. */
function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/g, "'");
}

/** A page-relative `href` made absolute, so the config never carries a bare path. */
function absolute(url: string | undefined, site: URL): string | undefined {
  if (url === undefined) return undefined;
  try {
    return new URL(url, site).toString();
  } catch {
    return undefined;
  }
}

function fromMetaTags(html: string, site: URL): Brand {
  const links = tags(html, "link");
  const metas = tags(html, "meta");

  const meta = (name: string): string | undefined =>
    metas.find((entry) => entry.name === name || entry.property === name)?.content;

  /** The best `<link rel>` icon: a real favicon first, an apple touch icon second. */
  const icon =
    links.find((entry) => /(^|\s)(shortcut )?icon(\s|$)/i.test(entry.rel ?? ""))?.href ??
    links.find((entry) => /apple-touch-icon/i.test(entry.rel ?? ""))?.href;

  /**
   * ReadMe generates its social image through an endpoint that takes the
   * project's colour and logo as query parameters:
   *
   *   …/og-image/create?…&logoUrl=https%3A%2F%2F…%2Flogo.png&color=%231341A9
   *
   * So a page with no `ssr-props` still carries both, just spelled as a URL.
   */
  const ogImage = meta("og:image");
  const ogParams = (() => {
    try {
      return ogImage ? new URL(ogImage).searchParams : undefined;
    } catch {
      return undefined;
    }
  })();

  const themeColour = normaliseHex(meta("theme-color"));
  const ogColour = normaliseHex(ogParams?.get("color") ?? undefined);
  const ogLogo = ogParams?.get("logoUrl") ?? undefined;

  const title = /<title[^>]*>([^<]+)<\/title>/i.exec(html)?.[1]?.trim();
  const name = meta("og:site_name") ?? ogParams?.get("projectTitle") ?? title;

  return compact({
    name: name ? { value: name, from: "meta" as const } : undefined,
    // The og colour is ReadMe's own project colour; `theme-color` is whatever the
    // browser chrome was told, so it is only asked second.
    brandLight: ogColour
      ? { value: ogColour, from: "og-image" as const }
      : themeColour
        ? { value: themeColour, from: "meta" as const }
        : undefined,
    logoLight: ogLogo ? { value: ogLogo, from: "og-image" as const } : undefined,
    favicon: absolute(icon, site)
      ? { value: absolute(icon, site) as string, from: "link-tag" as const }
      : undefined,
  });
}

// ---------------------------------------------------------------------------
// Rung 4 — the stylesheet
// ---------------------------------------------------------------------------

/**
 * ReadMe writes the project colour into the page as a CSS variable, twice:
 * `--project-color-primary` is the setting, `--color-primary` is the theme's
 * working copy. Either is the brand colour, and the first is the more specific.
 */
function fromCssVariables(html: string): Brand {
  for (const name of ["--project-color-primary", "--color-primary"]) {
    const match = new RegExp(`${name}\\s*:\\s*([^;}"']+)`, "i").exec(html);
    const colour = normaliseHex(match?.[1]);
    if (colour) return { brandLight: { value: colour, from: "css-variable" } };
  }
  return {};
}

// ---------------------------------------------------------------------------
// The ladder
// ---------------------------------------------------------------------------

/** Drops the keys whose value is `undefined`, so merging is a plain spread. */
function compact(brand: Record<string, unknown>): Brand {
  return Object.fromEntries(
    Object.entries(brand).filter(([, value]) => value !== undefined),
  ) as Brand;
}

/**
 * Per-field first-wins merge. Later sources fill gaps; they never overwrite.
 */
function merge(...brands: Brand[]): Brand {
  const result: Brand = {};
  for (const brand of brands) {
    for (const [field, value] of Object.entries(brand)) {
      if (value !== undefined && result[field as keyof Brand] === undefined) {
        (result as Record<string, unknown>)[field] = value;
      }
    }
  }
  return result;
}

export function extractBrand(html: string, site: URL): Brand {
  const props = readSsrProps(html);

  return merge(
    fromSsrProps(props),
    fromLegacySsrProps(props),
    fromMetaTags(html, site),
    fromCssVariables(html),
  );
}
