import type { NextRequest } from "next/server";

import type { ConvertResponse } from "@/app/convert/types";
import { convertHtmlFragment } from "@/src/mdx/convert";
import type { CleanAttributesOptions } from "@/src/mdx/hastClean";
import { getErrorMessage } from "@/src/utils/errors";

// The converter mutates a module-level `framework` singleton — no edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A paste box is not a crawler: anything past this is somebody sending a whole
 * site through, which belongs in the CLI where it can cache to disk.
 */
const MAX_BYTES = 2_000_000;

/** Only the four flags `cleanAttributes` understands, and only as booleans. */
function readOptions(input: unknown): CleanAttributesOptions {
  if (!input || typeof input !== "object") return {};
  const source = input as Record<string, unknown>;
  const options: CleanAttributesOptions = {};

  for (const key of ["keepClassNames", "keepStyles", "keepIds", "dropHashedClassNames"] as const) {
    if (typeof source[key] === "boolean") options[key] = source[key];
  }
  return options;
}

/** Every error path returns the same shape, so the UI only parses one. */
function failure(message: string, status: number) {
  const payload: ConvertResponse = { ok: false, message };
  return Response.json(payload, { status });
}

export async function POST(request: NextRequest) {
  let body: { html?: string; options?: unknown };

  try {
    body = await request.json();
  } catch {
    return failure("Body must be JSON", 400);
  }

  const html = typeof body.html === "string" ? body.html : "";
  if (!html.trim()) {
    return failure("`html` is required", 400);
  }

  if (html.length > MAX_BYTES) {
    return failure(
      `Input is ${Math.round(html.length / 1000)} KB; the limit is ${MAX_BYTES / 1000} KB. Use the CLI for whole pages.`,
      413
    );
  }

  const startedAt = Date.now();
  try {
    const mdx = convertHtmlFragment(html, readOptions(body.options));
    const payload: ConvertResponse = { ok: true, mdx, ms: Date.now() - startedAt };
    return Response.json(payload);
  } catch (error) {
    // A conversion failure is a bad *input*, not a broken server — the message
    // is the useful half, so it goes back rather than into a 500 with no body.
    return failure(`Conversion failed:${getErrorMessage(error)}`, 422);
  }
}
