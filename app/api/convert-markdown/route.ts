import type { NextRequest } from "next/server";

import { convertReadmeMarkdown } from "@/src/convert/run";
import { IMAGE_DIR } from "@/src/constants";
import { getErrorMessage } from "@/src/utils/errors";

// The converter is async only because it can fetch images; this route never
// asks it to, so nothing is written to disk. remark/mdx are node builds.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A backstop, not a policy. This route runs on the author's machine, so the cap
 * only exists to keep a runaway paste from parking the whole thing in memory —
 * real ReadMe pages, tables and all, land far under it.
 */
const MAX_BYTES = 20_000_000;

function failure(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

/**
 * ReadMe markdown in, Documentation.AI MDX out.
 *
 * One page at a time. The only thing written to disk is a copy of the page's images, into
 * `images/` at the project root, which the caller can turn off. Link rewriting is limited here
 * on purpose: `doc:`/`ref:` resolution needs the site-wide slug map, which a
 * single pasted page does not have, so those links convert to their default
 * paths and are reported in `notes` rather than guessed at.
 */
export async function POST(request: NextRequest) {
  let body: { markdown?: string; title?: string; site?: string; downloadImages?: boolean };

  try {
    body = await request.json();
  } catch {
    return failure("Body must be JSON", 400);
  }

  const markdown = typeof body.markdown === "string" ? body.markdown : "";
  if (!markdown.trim()) {
    return failure("`markdown` is required — paste a ReadMe page into it", 400);
  }

  if (markdown.length > MAX_BYTES) {
    return failure(
      `Input is ${Math.round(markdown.length / 1_000_000)} MB; the limit is ${MAX_BYTES / 1_000_000} MB. ` +
        `Use the CLI for a whole site.`,
      413
    );
  }

  const startedAt = Date.now();
  try {
    // Images are fetched by default. This route runs on the author's machine, not
    // a shared server, so writing the assets next to the pages is the point of it
    // — `process.cwd()` is the project root, and they land in `images/`.
    const withImages = body.downloadImages !== false;

    const result = await convertReadmeMarkdown(markdown, {
      title: body.title?.trim() || undefined,
      site: body.site?.trim() || undefined,
      ...(withImages ? { images: { outDir: process.cwd(), dir: IMAGE_DIR, publicPath: `/${IMAGE_DIR}` } } : {}),
    });

    return Response.json({
      ok: true,
      mdx: result.mdx,
      notes: result.notes,
      // The components nothing converted, each now inside a fence in `mdx` with
      // its own source and line. The caller renders this as the page's to-do
      // list; without it the fences are the only sign anything is outstanding.
      quarantined: result.quarantined,
      parseMode: result.parseMode,
      ...(result.parseError ? { parseError: result.parseError } : {}),
      ...(result.images
        ? {
            images: {
              downloaded: result.images.downloaded,
              fromCache: result.images.fromCache,
              failed: result.images.failed.length,
            },
          }
        : {}),
      ms: Date.now() - startedAt,
    });
  } catch (error) {
    // A conversion failure is a bad *input*, not a broken server — the message is
    // the useful half, so it goes back rather than into an empty 500.
    return failure(`Conversion failed${getErrorMessage(error)}`, 422);
  }
}
