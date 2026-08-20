import { attr, lineOf, readAttr, type ConversionNote } from "../mdast";
import type { Rule } from "./rule";

/**
 * `<GitHubBadge>` -> `<Image>` (marketplace-conversion.md §5.4).
 *
 * **The one live-data component that converts natively and stays live.** The
 * whole render is a single image `[MP GitHubBadge]`:
 *
 * ```js
 * const badgeUrl = `https://github.com/${owner}/${repo}/actions/workflows/${workflow}/badge.svg?branch=${branch}`;
 * ```
 *
 * GitHub regenerates that SVG on every request, so an `<Image>` pointed at the
 * same URL keeps updating with no JavaScript — unlike every other Group C
 * component, nothing is frozen and nothing needs to degrade to a link.
 *
 * `alt` is required on the target `[DAI §16]` and is built from the workflow name,
 * matching the source's own `alt={`${workflow} status`}`.
 */
export const gitHubBadge: Rule = (node, notes: ConversionNote[]) => {
  const owner = readAttr(node, "owner")?.trim();
  const repo = readAttr(node, "repo")?.trim();
  const workflow = readAttr(node, "workflow")?.trim();
  const branch = readAttr(node, "branch")?.trim() || "main";

  if (!owner || !repo || !workflow) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<GitHubBadge> needs `owner`, `repo` and `workflow` to build its badge URL — one is missing, and a URL must not be invented",
    });
    return null;
  }

  const src = `https://github.com/${owner}/${repo}/actions/workflows/${workflow}/badge.svg?branch=${branch}`;

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: "<GitHubBadge> -> <Image> pointing at GitHub's badge SVG — the badge stays live, since GitHub regenerates it per request",
  });

  return [
    {
      type: "mdxJsxFlowElement",
      name: "Image",
      attributes: [attr("src", src), attr("alt", `${workflow} status`)],
      children: [],
    },
  ];
};
