import type { NextRequest } from "next/server";

import { migrateSite, projectName } from "@/src/migrate/run";
import { DiskSink, MemorySink } from "@/src/migrate/sink";
import { buildZip, zipFilename } from "@/src/migrate/zip";
import { outputRoot, projectDir } from "@/src/paths";
import { getErrorMessage } from "@/src/utils/errors";
import { setLogsEnabled } from "@/src/utils/log";

// `migrateSite` writes files and uses undici plus a module-level singleton.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * How many pages one request may migrate.
 *
 * Not a judgement about the site — a request has 300 seconds and a full ReadMe
 * corpus is 1,500 pages, so a browser asking to migrate one is asking for a
 * timeout. `npm run migrate` has no cap and resumes from the download cache,
 * which is the thing to point people at rather than raising this.
 */
const MAX_PAGES = 1000;
const DEFAULT_PAGES = 25;

/**
 * Folder, or zip.
 *
 * Writing a folder is only useful when the machine running this *is* the
 * machine asking — otherwise the files land on a server the reader cannot
 * reach, which is worse than no answer, because it looks like it worked. So the
 * default follows where the code is running, and `MIGRATE_OUTPUT` overrides it
 * for the self-hosted case, where it is "production" but the disk is still
 * yours.
 */
function defaultDelivery(): "disk" | "zip" {
  const forced = process.env["MIGRATE_OUTPUT"];
  if (forced === "disk" || forced === "zip") return forced;
  return process.env["NODE_ENV"] === "production" ? "zip" : "disk";
}

function failure(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

/**
 * The whole migration, from one URL.
 *
 * Discover -> download -> convert -> write, in one request. Locally that writes
 * `output/projects/<project>/` and answers with the report. Deployed it answers
 * with a `.zip` of the same files, minus the images and the raw downloads, which
 * do not travel usefully through a browser.
 */
export async function POST(request: NextRequest) {
  let body: {
    url?: string;
    filter?: string;
    limit?: number;
    name?: string;
    refetch?: boolean;
    images?: boolean;
    /** `disk` writes a folder, `zip` streams a download. Defaults by environment. */
    delivery?: "disk" | "zip";
    /** Run without writing or returning files. Just the report. */
    dryRun?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return failure("Body must be JSON", 400);
  }

  if (!body.url) {
    return failure("`url` is required — the docs site to migrate", 400);
  }

  let site: URL;
  try {
    site = new URL(body.url);
  } catch {
    return failure(`Invalid link: ${body.url} — it must start with http(s)://`, 400);
  }

  const limit = Math.min(
    typeof body.limit === "number" && body.limit > 0 ? body.limit : DEFAULT_PAGES,
    MAX_PAGES,
  );

  const delivery = body.delivery ?? defaultDelivery();
  if (delivery === "disk" && defaultDelivery() === "zip" && !process.env["MIGRATE_OUTPUT"]) {
    return failure(
      "`delivery: \"disk\"` writes to the server's filesystem, which is not the machine that " +
        "asked — the files would be unreachable. Use `zip`, or set MIGRATE_OUTPUT=disk if this " +
        "server's disk is yours.",
      400,
    );
  }

  const project = projectName(site);
  const root = outputRoot();
  const sink = body.dryRun
    ? undefined
    : delivery === "zip"
      ? new MemorySink()
      : new DiskSink(projectDir(project, root));

  setLogsEnabled(true);
  const startedAt = Date.now();

  try {
    const report = await migrateSite(site.toString(), {
      ...(sink ? { sink } : {}),
      // Images go to the shared `output/images/` folder, and only when there is
      // a real disk worth putting them on. A zip run skips downloading them at
      // all rather than fetching megabytes it will then discard.
      ...(delivery === "disk" && !body.dryRun ? { outDir: root } : {}),
      ...(body.filter ? { filter: body.filter } : {}),
      ...(body.name ? { name: body.name } : {}),
      ...(body.refetch ? { refetch: true } : {}),
      ...(body.images !== undefined ? { images: body.images } : {}),
      limit,
    });

    if (sink instanceof MemorySink) {
      const archive = await buildZip(project, sink.files);
      // The report travels in a header as well as inside the zip: the browser is
      // about to save a file, not render JSON, and the page still wants to show
      // what happened without unzipping anything.
      return new Response(archive as unknown as BodyInit, {
        headers: {
          "content-type": "application/zip",
          "content-disposition": `attachment; filename="${zipFilename(project)}"`,
          "content-length": String(archive.byteLength),
          "x-migration-summary": encodeURIComponent(
            JSON.stringify({
              project,
              totals: report.totals,
              customComponents: report.customComponents.length,
              truncated: report.discovery.listedPages > limit,
              limit,
              ms: Date.now() - startedAt,
            }),
          ),
        },
      });
    }

    return Response.json({
      ok: true,
      report,
      delivery,
      // Said explicitly rather than left to be inferred from the page count: a
      // capped run looks exactly like a complete one in the report, and quietly
      // reporting on a quarter of a site is the failure this whole thing exists
      // to prevent.
      truncated: report.discovery.listedPages > limit,
      limit,
      ms: Date.now() - startedAt,
    });
  } catch (error) {
    // Not a ReadMe site, or no tab had navigation. Both mean there is nothing to
    // migrate, and the message is the useful half.
    return failure(`Migration failed${getErrorMessage(error)}`, 422);
  }
}
