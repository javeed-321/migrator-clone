import type { NextRequest } from "next/server";

import { migrateSite, projectName, type MigrateOptions } from "@/src/migrate/run";
import { DiskSink, MemorySink, type Sink } from "@/src/migrate/sink";
import type { MigrationReport } from "@/src/migrate/types";
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
 * The same migration, narrated line by line.
 *
 * ## Why NDJSON and not Server-Sent Events
 *
 * SSE is the usual answer and is the wrong one here. It is a `GET`-shaped
 * protocol — `EventSource` cannot send a request body — so the URL would have to
 * carry the site, the limit and the filter as query parameters, and the run could
 * be started by anything that can make the browser follow a link. One JSON object
 * per line over the existing `POST` keeps the request exactly as it was and needs
 * nothing but `response.body.getReader()` to read.
 *
 * ## Why the zip comes back inside the stream
 *
 * A response has one body. Once it is carrying progress lines it cannot also be
 * an archive, so on the zip path the archive rides in the final line as base64 —
 * about a third larger than the bytes, on a payload that is markdown and JSON and
 * capped at 100 pages. The alternative is holding the archive server-side behind
 * a second request, which means state, a lifetime and a way to clean it up, for a
 * file the caller is about to save anyway.
 *
 * A failure is a `line`, not a status code: the headers went out with the first
 * progress event, long before anything could go wrong, so there is no status left
 * to set. The reader distinguishes on `type`.
 */
function streamMigration(
  url: string,
  options: MigrateOptions,
  ctx: {
    project: string;
    sink: Sink | undefined;
    summaryOf: (report: MigrationReport) => unknown;
    onReport: (report: MigrationReport) => unknown;
  },
): Response {
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: unknown): void => {
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };

      try {
        const report = await migrateSite(url, {
          ...options,
          onProgress: (event) => send({ type: "progress", ...event }),
        });

        if (ctx.sink instanceof MemorySink) {
          const archive = await buildZip(ctx.project, ctx.sink.files);
          send({
            type: "zip",
            filename: zipFilename(ctx.project),
            summary: ctx.summaryOf(report),
            base64: Buffer.from(archive).toString("base64"),
          });
        } else {
          send({ type: "done", ...(ctx.onReport(report) as object) });
        }
      } catch (error) {
        send({ type: "error", message: `Migration failed${getErrorMessage(error)}` });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      // Every layer between here and the browser will happily hold a response
      // until it is complete, which is the one thing this must not do.
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
    },
  });
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

  const options = {
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
  };

  const summaryOf = (report: MigrationReport) => ({
    project,
    totals: report.totals,
    customComponents: report.customComponents.length,
    truncated: report.discovery.listedPages > limit,
    limit,
    ms: Date.now() - startedAt,
  });

  // The streaming path, asked for by `Accept: application/x-ndjson`.
  //
  // Opt-in rather than the default because the plain JSON below is a documented
  // contract — `curl -X POST /api/migrate` is in the README — and a migration is
  // also perfectly usable as one request when nobody is watching it. The browser
  // is the caller that cannot wait in silence, so the browser is the one that
  // asks.
  if (request.headers.get("accept")?.includes("application/x-ndjson")) {
    return streamMigration(site.toString(), options, {
      project,
      sink,
      summaryOf,
      onReport: (report) => ({
        ok: true,
        report,
        delivery,
        truncated: report.discovery.listedPages > limit,
        limit,
        ms: Date.now() - startedAt,
      }),
    });
  }

  try {
    const report = await migrateSite(site.toString(), options);

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
          "x-migration-summary": encodeURIComponent(JSON.stringify(summaryOf(report))),
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
