export const docVendors = ["readme"] as const;

export type FrameworkVendor = (typeof docVendors)[number];

/**
 * Upstream carries a `version` here too, but it is the *Docusaurus* major
 * version (2 or 3, which have different DOM) — every other vendor sets it to
 * undefined and never reads it again. Nothing about ReadMe is versioned, so it
 * is not ported.
 */
export type Framework = {
  vendor: FrameworkVendor | undefined;
};
