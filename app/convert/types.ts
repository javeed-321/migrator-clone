import type { ConversionNote } from "@/src/convert/mdast";
import type { ConvertPage, SkippedPage } from "@/src/convert/pages";

/** What `/api/convert-markdown` accepts — one pasted ReadMe page. */
export type ConvertMarkdownRequest = {
  markdown: string;
  /** Frontmatter title, so a duplicate body `# Title` can be dropped. */
  title?: string;
  /** Source site origin, so absolute self-links become site-relative. */
  site?: string;
  /**
   * Pull the page's images into `images/` and point the MDX at the local copies.
   * Defaults to on — this runs on the author's own machine, where saving the
   * assets is the point.
   */
  downloadImages?: boolean;
};

/**
 * What it answers with.
 *
 * `ok` says which half is filled in: `message` on a failure, everything else on
 * success. One flat shape, so the client parses one thing either way.
 */
export type ConvertMarkdownResponse = {
  ok: boolean;
  message?: string;
  mdx?: string;
  notes?: ConversionNote[];
  parseMode?: "mdx" | "markdown";
  parseError?: string;
  /** What the image download did, when it ran. */
  images?: { downloaded: number; fromCache: number; failed: number };
  ms?: number;
};

/** What `/api/convert` accepts — a whole `documentation.json`. Unrelated to the paste box. */
export type ConvertRequest = {
  url: string;
  documentationJson?: unknown;
  filter?: string;
  limit?: number;
};

export type ConvertResponse = {
  ok: boolean;
  message?: string;
  site?: string;
  name?: string;
  source?: string;
  total?: number;
  pages?: ConvertPage[];
  duplicates?: string[];
  skipped?: SkippedPage[];
};
