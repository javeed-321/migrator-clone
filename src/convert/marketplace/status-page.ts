import { lineOf, readAttr, type ConversionNote } from "../mdast";
import { linkCard } from "./link-card";
import type { Rule } from "./rule";

/**
 * `<StatusPage>` -> `<Card>` (marketplace-conversion.md §5.3).
 *
 * Source `[MP StatusPage]`: `({ title, url })`, polling a public Atlassian
 * Statuspage and rendering the current indicator.
 *
 * **This is the component where freezing the output would be actively harmful.**
 * A snapshot reading "All systems operational" is permanent: when the service goes
 * down, the documentation says it is fine, and nothing on the platform will ever
 * refresh it. A reader trusts what is on the page. So the live value is not
 * carried across at all — the link is, and the link cannot go stale.
 *
 * Contrast `<GitHubBadge>`, which *does* stay live after conversion, because its
 * value is served as an image the provider regenerates per request rather than
 * fetched by JavaScript.
 */
export const statusPage: Rule = (node, notes: ConversionNote[]) => {
  const url = readAttr(node, "url")?.trim();
  const title = readAttr(node, "title")?.trim();

  if (!url) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<StatusPage> has no `url` — there is no status page to link to, and the live indicator must not be frozen into the page",
    });
    return null;
  }

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: "<StatusPage> -> <Card> linking to the status page — the live indicator is deliberately not frozen into the page, where it could not be refreshed",
  });

  return [linkCard(title || "Service status", url, "activity", "Check the current status of all services.")];
};
