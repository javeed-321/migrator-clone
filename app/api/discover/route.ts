import type { NextRequest } from "next/server";

import { discover } from "@/src/index";
import { setLogsEnabled } from "@/src/utils/log";

// The pipeline uses node:fs and undici — it cannot run on the edge runtime.
export const runtime = "nodejs";
// Discovery hits the network on every request; never prerender or cache it.
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  let body: { url?: string; filter?: string; skipFetch?: boolean };

  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Body must be JSON" }, { status: 400 });
  }

  if (!body.url) {
    return Response.json({ success: false, message: "`url` is required" }, { status: 400 });
  }

  try {
    new URL(body.url);
  } catch {
    return Response.json(
      { success: false, message: `Invalid link: ${body.url} — it must start with http(s)://` },
      { status: 400 }
    );
  }

  setLogsEnabled(false);
  try {
    const result = await discover(body.url, {
      filter: body.filter,
      // Never write to disk from a request; `skipFetch` controls whether page
      // bodies are fetched at all.
      skipFetch: body.skipFetch ?? false,
    });

    if (!result.success) {
      return Response.json({ success: false, message: result.message }, { status: 422 });
    }

    return Response.json(result.data);
  } catch (error) {
    return Response.json(
      { success: false, message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  } finally {
    setLogsEnabled(true);
  }
}
