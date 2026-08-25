import type { BrandConfig } from "@/src/brand";
import type { BrandReport } from "@/src/brand";

/**
 * What `POST /api/brand` answers with.
 *
 * A flattened `BrandReport` — the same rows, lifted to the top level so the page
 * reads `data.found` rather than `data.report.found`, plus the two artefacts a
 * migration would write.
 */
export type BrandResponse = {
  ok: boolean;
  message?: string;
  site: string;
  /** The folder a migration would write this into, e.g. `docs-capillarytech-com`. */
  project: string;
  ms: number;

  found: BrandReport["found"];
  missing: BrandReport["missing"];
  adjusted: BrandReport["adjusted"];
  rejected: BrandReport["rejected"];

  /** The keys destined for `documentation.json`. */
  config: BrandConfig;
  /** The text destined for `styles/brand.css`. */
  css: string;

  /** Present only when the request asked for the assets to be downloaded. */
  saved?: {
    dir: string;
    assets: Record<string, string>;
    failed: { url: string; message: string }[];
  };
};
