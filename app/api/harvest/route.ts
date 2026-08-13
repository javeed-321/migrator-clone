import type { NextRequest } from "next/server";

import type { HarvestResponse } from "@/app/harvest/types";
import { fetchLlmsTxt, slugFromUrl, toMarkdownUrl, toPageUrl } from "@/src/harvest/fetch";
import { harvest } from "@/src/harvest/run";
import type { PageRef } from "@/src/harvest/types";
import { getErrorMessage } from "@/src/utils/errors";
import { setLogsEnabled } from "@/src/utils/log";

// `harvest` uses node:fs and a module-level singleton — no edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * How many pages one request may harvest.
 *
 * The response carries every page's raw markdown *and* its full block IR so the
 * UI can show both halves side by side, which is roughly 30 KB a page. A browser
 * asking for a look at what is on a site does not need 1,500 of them — that is
 * what `npm run harvest` is for, and it caches to disk besides.
 */
const MAX_PAGES = 40;
const DEFAULT_PAGES = 8;

/** One explicit page URL, when the caller wants to inspect exactly one. */
function singlePageRef(url: string): PageRef {
  const source = toMarkdownUrl(url);
  const slug = slugFromUrl(source);
  return {
    title: "",
    description: "",
    source,
    url: toPageUrl(source),
    slug,
    section: "",
    kind: slug.startsWith("reference/") ? "api" : slug.startsWith("page/") ? "page" : "guide",
  };
}

export async function POST(request: NextRequest) {
  let body: { url?: string; filter?: string; limit?: number; single?: boolean };

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Body must be JSON" }, { status: 400 });
  }

  if (!body.url) {
    return Response.json({ ok: false, message: "`url` is required" }, { status: 400 });
  }

  let urlObj: URL;
  try {
    urlObj = new URL(body.url);
  } catch {
    return Response.json(
      { ok: false, message: `Invalid link: ${body.url} — it must start with http(s)://` },
      { status: 400 }
    );
  }

  const limit = Math.min(Math.max(1, Number(body.limit) || DEFAULT_PAGES), MAX_PAGES);

  function fail(message: string): Response {
    return Response.json({ ok: false, message } satisfies HarvestResponse);
  }

  setLogsEnabled(false);
  try {
    // `--page` mode: the URL *is* the page. Otherwise the site's llms.txt is the
    // page list, the same source the CLI defaults to.
    const refs = body.single
      ? [singlePageRef(urlObj.toString())]
      : await fetchLlmsTxt(urlObj.toString());

    if (!refs.length) {
      return fail(
        `No pages listed for ${urlObj.toString()} — its llms.txt is missing or empty. ` +
          `Paste a single page URL and tick "one page" instead.`
      );
    }

    const filter = body.filter?.trim().replace(/^\//, "") || undefined;
    const matching = filter ? refs.filter((ref) => ref.slug.startsWith(filter)) : refs;
    if (!matching.length) {
      return fail(`No page slug starts with "${filter}" — ${refs.length} pages were listed.`);
    }

    const report = await harvest(refs, {
      // No outDir: nothing is cached or written. A browser request should not
      // leave files in the repo.
      filter,
      limit,
      keepRaw: true,
    });

    if (!report.pages.length) {
      return fail(report.failed[0]?.message ?? `Nothing could be harvested from ${urlObj.toString()}`);
    }

    return Response.json({
      ok: true,
      site: report.site || urlObj.origin,
      listed: refs.length,
      matching: matching.length,
      limit,
      pages: report.pages,
      raw: report.raw ?? {},
      failed: report.failed,
      inventory: report.inventory,
    } satisfies HarvestResponse);
  } catch (error) {
    return fail(getErrorMessage(error).replace(/^:\s*/, "") || "Unknown error");
  } finally {
    setLogsEnabled(true);
  }
}
