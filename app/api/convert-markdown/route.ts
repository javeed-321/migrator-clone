import type { NextRequest } from "next/server";

import { convertReadmeMarkdown } from "@/src/convert/run";
import { getErrorMessage } from "@/src/utils/errors";

// The converter is synchronous and pure, but remark/mdx are node builds.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A paste box is not a migration: anything past this is somebody sending a whole
 * site through, which belongs in the CLI where it can cache to disk.
 */
const MAX_BYTES = 500_000;

function failure(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

/**
 * ReadMe markdown in, Documentation.AI MDX out.
 *
 * One page at a time, in memory, nothing written. Link rewriting is limited here
 * on purpose: `doc:`/`ref:` resolution needs the site-wide slug map, which a
 * single pasted page does not have, so those links convert to their default
 * paths and are reported in `notes` rather than guessed at.
 */
export async function POST(request: NextRequest) {
  let body: { markdown?: string; title?: string; site?: string };

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
      `Input is ${Math.round(markdown.length / 1000)} KB; the limit is ${MAX_BYTES / 1000} KB. ` +
        `Use the CLI for whole pages.`,
      413
    );
  }

  const startedAt = Date.now();
  try {
    const result = convertReadmeMarkdown(markdown, {
      title: body.title?.trim() || undefined,
      site: body.site?.trim() || undefined,
    });

    return Response.json({
      ok: true,
      mdx: result.mdx,
      notes: result.notes,
      parseMode: result.parseMode,
      ...(result.parseError ? { parseError: result.parseError } : {}),
      ms: Date.now() - startedAt,
    });
  } catch (error) {
    // A conversion failure is a bad *input*, not a broken server — the message is
    // the useful half, so it goes back rather than into an empty 500.
    return failure(`Conversion failed${getErrorMessage(error)}`, 422);
  }
}
