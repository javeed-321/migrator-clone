import type { Root } from "mdast";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { getErrorMessage } from "../utils/errors";

export type ParseResult = {
  tree: Root;
  mode: "mdx" | "markdown";
  error?: string;
};

/**
 * Markdown text -> MDAST, with a deliberate two-tier strategy.
 *
 * Tier 1 is the strict MDX parser. When it accepts a page, `<Callout theme=…>`
 * arrives as an `mdxJsxFlowElement` with its attributes already parsed — the
 * component identification the whole IR is built around comes free.
 *
 * Tier 2 is plain GFM. ReadMe's engine tolerates a lenient dialect it calls
 * "MDXish" — unclosed `<br>`, string `style="…"`, compact headings — and pages
 * using it will not survive tier 1. Rather than lose those pages, they are
 * parsed as markdown, where JSX lands in `html` nodes and the block builder
 * recovers the tag name by hand.
 *
 * The tier is recorded per page as `parseMode`, so a fallback is a visible fact
 * about a page (its MDXish syntax needs repairing before Documentation.AI will
 * compile it), not a silent degradation.
 */
export function parseMarkdown(text: string): ParseResult {
  try {
    const tree = unified().use(remarkParse).use(remarkGfm).use(remarkMdx).parse(text) as Root;
    return { tree, mode: "mdx" };
  } catch (error) {
    const tree = unified().use(remarkParse).use(remarkGfm).parse(text) as Root;
    return { tree, mode: "markdown", error: getErrorMessage(error).replace(/^:\s*/, "") };
  }
}
