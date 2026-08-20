import type { Code, RootContent } from "mdast";

import { attr, lineOf, readAttr, type ConversionNote } from "../mdast";
import { parseJsLiteral, type JsValue } from "./js-literal";
import { table, type FoundPostList, type Rule } from "./rule";

/**
 * `<PostList>` -> its data, fetched at conversion time and written into the page
 * (marketplace-conversion.md §5.3).
 *
 * Source `[MP PostList]`: `({ url })`, fetching a JSON endpoint on mount and
 * rendering each record as a card.
 *
 * ## Why this one is fetched rather than linked
 *
 * The other Route 3 components link out because their value is *current*: a
 * status page that says "operational" must never be frozen, because the frozen
 * copy will eventually be a lie nothing can refresh.
 *
 * `PostList` is different. Its data is **illustrative** — it shows what an
 * endpoint returns — so a snapshot is not a stale truth-claim, it is an example.
 * And its `url` is a JSON endpoint, not a page: linking a reader to raw JSON is
 * worse than showing them the shape.
 *
 * The trade is explicit and recorded in a note on every conversion: **the data is
 * frozen at conversion time.** Re-run the conversion to refresh it.
 *
 * ## Why the fetch is opt-in
 *
 * This is the only part of the converter that would make a network request to a
 * URL taken from the page it is converting. Left on by default, a page
 * containing `<PostList url="http://169.254.169.254/latest/meta-data/" />` would
 * make the converter fetch cloud-instance metadata on the operator's behalf. So
 * it is gated behind `options.data`, exactly as image downloading is gated behind
 * `options.images`, and the private-address ranges are refused outright.
 */

export type PostListOptions = {
  /** Fetch each `<PostList>` URL and write the response into the page. */
  enabled: boolean;
  /** Abort a request after this long. Default 10s. */
  timeoutMs?: number;
  /** Refuse a response larger than this. Default 512 KB. */
  maxBytes?: number;
  /** Injectable, so tests do not reach the network. */
  fetchImpl?: typeof fetch;
};

/**
 * Records the node and leaves it in place.
 *
 * Returning `null` is deliberate: until the data arrives there is nothing to put
 * here, and emitting an empty container would look converted while holding
 * nothing. The node is mutated later, or reported.
 */
export const postList: Rule = (node, notes: ConversionNote[], ctx) => {
  const url = readAttr(node, "url")?.trim();

  if (!url) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<PostList> has no `url` — there is no endpoint to read the example data from",
    });
    return null;
  }

  ctx.postLists.push({ url, node, line: lineOf(node) });
  return null;
};

// ---------------------------------------------------------------------------
// Phase two — the fetch
// ---------------------------------------------------------------------------

/** Hosts a converter must not be talked into fetching by the page it is converting. */
function isPrivate(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host === "::1") return true;

  const parts = host.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part))) return false;

  const [a, b] = parts as [number, number, number, number];
  if (a === 127 || a === 0 || a === 10) return true;
  if (a === 169 && b === 254) return true; // link-local, incl. cloud metadata
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  return false;
}

/**
 * Renders fetched data as page content.
 *
 * An array of flat records becomes a table — the same shape `advanced-table.ts`
 * produces, and for the same reasons: every value stays indexed, and `cellNodes`
 * disarms any `{…}` in the data before it becomes MDX body text.
 *
 * Anything else — a bare object, nested arrays, a scalar — has no honest table
 * form, so it is shown as JSON. That is still the content, and still searchable.
 */
export function renderData(value: JsValue): RootContent[] {
  const isFlatRecord = (item: JsValue): item is Record<string, JsValue> =>
    item !== null &&
    typeof item === "object" &&
    !Array.isArray(item) &&
    Object.values(item).every((field) => field === null || typeof field !== "object");

  if (Array.isArray(value) && value.length > 0 && value.every(isFlatRecord)) {
    const keys = Object.keys(value[0] as Record<string, JsValue>);

    if (keys.length > 0) {
      return [
        table(
          keys.map((key) => key.charAt(0).toUpperCase() + key.slice(1)),
          value.map((row) =>
            keys.map((key) => {
              const field = row[key];
              return field === undefined || field === null ? "" : String(field);
            }),
          ),
        ),
      ];
    }
  }

  const code: Code = { type: "code", lang: "json", value: JSON.stringify(value, null, 2) };
  return [code];
}

/**
 * Fetches each recorded `<PostList>` and rewrites its node into the data.
 *
 * The node is mutated in place rather than spliced, because by this point the
 * component passes have finished and the only handle on it is the reference the
 * rule recorded. It becomes a `<div className="rm-postlist">` wrapping the
 * rendered content — a real element with a styling hook, whose children are real
 * markdown nodes rather than an opaque HTML string.
 */
export async function fetchPostLists(
  found: FoundPostList[],
  options: PostListOptions | undefined,
  notes: ConversionNote[],
): Promise<void> {
  if (found.length === 0) return;

  if (!options?.enabled) {
    for (const entry of found) {
      notes.push({
        rule: "marketplace",
        level: "flag",
        line: entry.line,
        detail: `<PostList url="${entry.url}"> was left in place — set \`data.enabled\` to fetch the endpoint and write its response into the page, or replace it with a link by hand`,
      });
    }
    return;
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? 10_000;
  const maxBytes = options.maxBytes ?? 512 * 1024;

  for (const entry of found) {
    const failed = (reason: string): void => {
      notes.push({
        rule: "marketplace",
        level: "blocker",
        line: entry.line,
        detail: `<PostList url="${entry.url}"> could not be read — ${reason}. The component is left in place rather than replaced with an empty table`,
      });
    };

    let parsed: URL;
    try {
      parsed = new URL(entry.url);
    } catch {
      failed("the url is not absolute");
      continue;
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      failed(`the protocol ${parsed.protocol} is not fetched`);
      continue;
    }
    if (isPrivate(parsed.hostname)) {
      failed("it points at a private or link-local address, which this converter refuses to fetch");
      continue;
    }

    try {
      const response = await fetchImpl(entry.url, {
        signal: AbortSignal.timeout(timeoutMs),
        headers: { accept: "application/json" },
      });

      if (!response.ok) {
        failed(`the endpoint answered ${response.status}`);
        continue;
      }

      const body = await response.text();
      if (body.length > maxBytes) {
        failed(`the response is larger than the ${maxBytes}-byte limit`);
        continue;
      }

      // The same reader the prop-carried components use: it accepts JSON, and
      // refuses anything that is not a literal instead of executing it.
      const value = parseJsLiteral(body);
      if (value === null) {
        failed("the response is not JSON this converter can read");
        continue;
      }

      const rendered = renderData(value);

      entry.node.name = "div";
      entry.node.attributes = [attr("className", "rm-postlist")];
      entry.node.children = rendered as never;

      notes.push({
        rule: "marketplace",
        level: "flag",
        line: entry.line,
        detail: `<PostList> -> the response from ${entry.url}, written into the page. **The data is frozen at conversion time** — re-run the conversion to refresh it`,
      });
    } catch (error) {
      failed(error instanceof Error ? error.message : "the request failed");
    }
  }
}
