import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { NextRequest } from "next/server";

import { pagesFromDocumentationJson } from "@/src/convert/pages";
import { getErrorMessage } from "@/src/utils/errors";

// Reads a file from the project root and uses node URL/fs — no edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The config this project writes, used when the request does not carry one. */
const LOCAL_CONFIG = "documentation.json";

function failure(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

/**
 * Turns a `documentation.json` into the list of pages to convert.
 *
 * Nothing is fetched here. Every `path` in the config is glued onto the site
 * origin and given a `.md` suffix, which is the URL ReadMe serves the authored
 * markdown at. Downloading and converting that markdown is the next step.
 */
export async function POST(request: NextRequest) {
  // 1. Read the request.
  let body: { url?: string; documentationJson?: unknown; filter?: string; limit?: number };
  try {
    body = await request.json();
  } catch {
    return failure("Body must be JSON", 400);
  }

  if (!body.url) {
    return failure("`url` is required — the docs site the pages live on", 400);
  }

  try {
    new URL(body.url);
  } catch {
    return failure(`Invalid link: ${body.url} — it must start with http(s)://`, 400);
  }

  // 2. Get the config: from the request if it sent one, else from disk.
  //    A string is parsed rather than rejected — the natural thing to paste into
  //    a textarea is the file's text.
  let config: unknown;
  let source: string;
  try {
    if (typeof body.documentationJson === "string" && body.documentationJson.trim()) {
      config = JSON.parse(body.documentationJson);
      source = "request";
    } else if (body.documentationJson && typeof body.documentationJson === "object") {
      config = body.documentationJson;
      source = "request";
    } else {
      config = JSON.parse(readFileSync(join(process.cwd(), LOCAL_CONFIG), "utf8"));
      source = LOCAL_CONFIG;
    }
  } catch (error) {
    const where = body.documentationJson ? "the config in the request" : LOCAL_CONFIG;
    return failure(`Could not read ${where}${getErrorMessage(error)}`, 400);
  }

  // 3. Walk it into the page list.
  try {
    const list = pagesFromDocumentationJson(config, {
      site: body.url,
      filter: body.filter || undefined,
      limit: typeof body.limit === "number" ? body.limit : undefined,
    });

    if (list.pages.length === 0) {
      return failure(
        `No pages found in ${source}. Every navigation entry needs a \`path\`` +
          (body.filter ? `, and none matched the filter \`${body.filter}\`` : ""),
        422
      );
    }

    return Response.json({
      ok: true,
      site: list.site,
      name: list.name,
      source,
      total: list.pages.length,
      pages: list.pages,
      duplicates: list.duplicates,
      skipped: list.skipped,
    });
  } catch (error) {
    return failure(`Could not read the navigation${getErrorMessage(error)}`, 422);
  }
}
