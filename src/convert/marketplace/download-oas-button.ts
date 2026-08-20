import { lineOf, readAttr, type ConversionNote } from "../mdast";
import { linkCard } from "./link-card";
import type { Rule } from "./rule";

/**
 * `<DownloadOASButton>` -> `<Card>` (marketplace-conversion.md §5.3).
 *
 * Source `[MP DownloadOasButton]`: `({ url })`, fetching the spec and triggering a
 * download through a synthesised anchor. Note the exported name is
 * **`DownloadOASButton`** — capital OAS — while the folder is `DownloadOasButton`.
 *
 * A plain link to the same URL downloads the same file without any script. The
 * only thing lost is the forced `download` attribute, which has no documented
 * target equivalent `[PLAN §1.7, open question 11]`.
 *
 * The filename in the body is derived the way the component derives it — last
 * path segment, falling back to `openapi.json` — so the card says which file it
 * hands over.
 */
function fileNameFrom(url: string): string {
  try {
    return new URL(url).pathname.split("/").pop() || "openapi.json";
  } catch {
    // A relative or malformed URL is still a usable href; only the label suffers.
    return url.split("/").pop() || "openapi.json";
  }
}

export const downloadOasButton: Rule = (node, notes: ConversionNote[]) => {
  const url = readAttr(node, "url")?.trim();

  if (!url) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<DownloadOASButton> has no `url` — `url` is required on the source component and there is nothing to link to",
    });
    return null;
  }

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: "<DownloadOASButton> -> <Card> linking to the spec — the forced download is lost, the file is still one click away",
  });

  return [
    linkCard("Download OpenAPI spec", url, "download", [
      { type: "text", value: "Download " },
      { type: "inlineCode", value: fileNameFrom(url) },
      { type: "text", value: "." },
    ]),
  ];
};
