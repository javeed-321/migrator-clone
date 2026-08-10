export const docVendors = ["readme"] as const;

export type FrameworkVendor = (typeof docVendors)[number];

/**
 * Detected vendors we can *recognise* but have not implemented selectors for.
 * Kept separate from `docVendors` so `detectFramework` can fail with a useful
 * message instead of a generic "unknown vendor".
 */
export const recognisedButUnsupported = ["gitbook", "docusaurus"] as const;

export type UnsupportedVendor = (typeof recognisedButUnsupported)[number];

export type Framework = {
  vendor: FrameworkVendor | undefined;
  version: number | undefined;
  /** Set when we recognised the vendor but have no selectors for it. */
  unsupportedVendor?: UnsupportedVendor;
};
