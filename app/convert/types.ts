import type { ConvertPage, SkippedPage } from "@/src/convert/pages";

/** What `/api/convert` accepts. */
export type ConvertRequest = {
  /** The docs site. Only its origin is used. */
  url: string;
  /**
   * The config to read. An object or a JSON string. Omit it to use the
   * `documentation.json` in the project root.
   */
  documentationJson?: unknown;
  /** Keep only slugs under this prefix, e.g. `docs/loyalty`. */
  filter?: string;
  limit?: number;
};

/**
 * What it answers with.
 *
 * `ok` says which half of this is filled in: `message` on a failure, everything
 * else on success. One flat shape, so the client parses one thing either way.
 */
export type ConvertResponse = {
  ok: boolean;
  /** Present when `ok` is false. */
  message?: string;
  site?: string;
  name?: string;
  /** Where the config came from. */
  source?: string;
  total?: number;
  pages?: ConvertPage[];
  duplicates?: string[];
  skipped?: SkippedPage[];
};
