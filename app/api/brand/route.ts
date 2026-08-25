import type { NextRequest } from "next/server";

import { fetchBrand } from "@/src/brand";
import { projectName } from "@/src/migrate/run";
import { outputRoot, projectDir } from "@/src/paths";
import { getErrorMessage } from "@/src/utils/errors";

// `fetchBrand` uses undici and, when saving, writes files — no edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Stage 1b on its own, so it can be looked at without running a migration.
 *
 * The brand stage is one HTTP GET and a pile of parsing, but inside `POST
 * /api/migrate` its result is a handful of keys buried in a report about 25
 * pages. Which is the wrong shape for the question people actually ask of it —
 * *where did this colour come from, and why is it not the one on the site?*
 *
 * So this answers exactly that: every value, **which rung of the ladder found
 * it**, what was missing, and what was changed or thrown away on the way to
 * `documentation.json`. Same function the migration calls, so what it prints is
 * what a migration would write.
 *
 * ```
 * GET  /api/brand?url=https://docs.capillarytech.com/docs
 * POST /api/brand  { "url": "…", "save": true, "local": true }
 * ```
 *
 * `GET` is here because this is a thing people check by hand, and a URL that can
 * be pasted into a browser is worth more than a tidier API.
 */

/** Nothing is written unless `save` asks for it — see the note on `save`. */
type BrandRequest = {
  url?: string;
  /**
   * Download the logo and favicon to `output/projects/<host>/brand/`.
   *
   * Off by default. Reading is free and repeatable; fetching three assets onto
   * a disk that may not be the caller's is neither, and this endpoint exists to
   * be run repeatedly while someone works out why a colour is wrong.
   */
  save?: boolean;
  /**
   * Point the config at the saved copies rather than ReadMe's CDN.
   *
   * Implies `save` — there is nothing to point at otherwise.
   */
  local?: boolean;
};

function failure(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

async function run(body: BrandRequest) {
  if (!body.url) {
    return failure("`url` is required — the ReadMe site to read branding from", 400);
  }

  let site: URL;
  try {
    site = new URL(body.url);
  } catch {
    return failure(`Invalid link: ${body.url} — it must start with http(s)://`, 400);
  }

  const save = body.save === true || body.local === true;
  const project = projectName(site);
  const startedAt = Date.now();

  try {
    const { brand, report, config, css } = await fetchBrand(site, {
      ...(save ? { outDir: projectDir(project, outputRoot()) } : {}),
      ...(body.local ? { local: true } : {}),
    });

    return Response.json({
      ok: true,
      site: site.toString(),
      project,
      ms: Date.now() - startedAt,

      /*
       * `found` first, because it is the answer. Each row carries `from`, which
       * is the difference between a value read out of ReadMe's own project
       * config and one guessed off a `theme-color` meta tag — the report is only
       * worth having because it keeps those apart.
       */
      found: report.found,
      missing: report.missing,
      /** Colours the site gave that had to be moved to stay readable. */
      adjusted: report.adjusted,
      /** Colours the site gave that could not be used, so a default stands. */
      rejected: report.rejected,

      /** Exactly the keys a migration would merge into `documentation.json`. */
      config,
      /** Exactly the bytes a migration would write to `styles/brand.css`. */
      css,

      ...(save
        ? {
            saved: {
              dir: projectDir(project, outputRoot()),
              /** Source URL -> the path written into the config. */
              assets: report.assets,
              failed: report.failedAssets,
            },
          }
        : {}),
    });
  } catch (error) {
    /*
     * 422, not 500. Every failure here is a fact about the site — not a ReadMe
     * hub, unreachable, HTML this build cannot read — and the message is the
     * half worth reading.
     */
    return failure(`Brand lookup failed${getErrorMessage(error)}`, 422);
  }
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const flag = (name: string): boolean => {
    const value = params.get(name);
    return value !== null && value !== "false" && value !== "0";
  };

  return run({
    ...(params.get("url") ? { url: params.get("url") as string } : {}),
    save: flag("save"),
    local: flag("local"),
  });
}

export async function POST(request: NextRequest) {
  let body: BrandRequest;

  try {
    body = await request.json();
  } catch {
    return failure("Body must be JSON", 400);
  }

  return run(body);
}
