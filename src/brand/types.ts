/**
 * What a source site says about itself: its colours, its logos, its name.
 *
 * ## Why every value carries where it came from
 *
 * The values here are found four different ways, and they are not equally
 * trustworthy. `#1341A9` read out of ReadMe's own project config is the brand
 * colour; the same string guessed from a `theme-color` meta tag is what the
 * browser chrome was told, which is often a header background rather than a
 * brand. And a dark-mode brand this module *computed* is not a fact about the
 * site at all.
 *
 * Shipping those three as one indistinguishable hex string is how a guess gets
 * treated as a decision. So each field is `Sourced<T>` and the report says which
 * rung of the ladder answered — the operator can then confirm the weak ones and
 * leave the strong ones alone.
 */

/** Where one value was found, strongest first. */
export type BrandSource =
  /** ReadMe's own project config, current shape — the site's real setting. */
  | "ssr-props"
  /** The same blob, older projects. Equally authoritative. */
  | "ssr-props-legacy"
  /** `<link rel="icon">` and friends. Reliable for icons, and only icons. */
  | "link-tag"
  /** A `<meta>` tag — `theme-color`, `og:site_name`, `<title>`. */
  | "meta"
  /** ReadMe's og:image generator takes `color=` and `logoUrl=` query params. */
  | "og-image"
  /** A CSS custom property in an inline `<style>`. */
  | "css-variable"
  /** Computed here, not read from the site. */
  | "derived";

export type Sourced<T> = { value: T; from: BrandSource };

/** One site's branding, as far as it could be established. */
export type Brand = {
  /** The project's own name, for `documentation.json`'s `name`. */
  name?: Sourced<string>;
  /** Primary colour for light mode, `#rrggbb`. */
  brandLight?: Sourced<string>;
  /** Primary colour for dark mode. `derived` when the site declared none. */
  brandDark?: Sourced<string>;
  /** The logo shown on a light background. */
  logoLight?: Sourced<string>;
  /** The logo shown on a dark background — usually the white variant. */
  logoDark?: Sourced<string>;
  /** The favicon, which is also what the `logo-small-*` keys take. */
  favicon?: Sourced<string>;
};

/** A field of `Brand`, for reporting one row per value. */
export type BrandField = keyof Brand;

/** What the brand stage did, as data. */
export type BrandReport = {
  /** The page it read. */
  url: string;
  /** One row per value found, in `Brand` key order. */
  found: { field: BrandField; value: string; from: BrandSource }[];
  /** Fields nothing could answer, so the Documentation.AI default stands. */
  missing: BrandField[];
  /** Asset URL -> the local path it was saved to, when assets were saved. */
  assets: Record<string, string>;
  /** Assets that could not be fetched. The config keeps the remote URL. */
  failedAssets: { url: string; message: string }[];
  /**
   * Values the site gave that were moved to clear the contrast bar, with the
   * original kept beside the replacement.
   */
  adjusted: { field: BrandField; was: string; now: string; reason: string }[];
  /**
   * Values the site gave that could not be used at all, so the Documentation.AI
   * default stands. A rejection is always a decision someone should look at.
   */
  rejected: { field: BrandField; value: string; reason: string }[];
};
