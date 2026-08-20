import { lineOf, readAttr, type ConversionNote } from "../mdast";
import { linkCard } from "./link-card";
import type { Rule } from "./rule";

/**
 * `<PostmanRunButton>` -> `<Card>` (marketplace-conversion.md §5.3).
 *
 * **This one tag exists in both vocabularies** — a ReadMe built-in `[RM §4.15]`
 * and a Marketplace component `[RM §9]` — with the same two props that matter,
 * `collectionId` and `collectionUrl`. One rule serves both, which is why it is
 * the only name-collision among the five that is handled here rather than left to
 * the pass that owns the built-in: no pass owns it.
 *
 * The source injects Postman's `run-button.js` and lets it draw a fork button
 * `[MP PostmanRunButton]`. The target has no component that injects a script, so
 * the button becomes the link it was always pointing at.
 *
 * **`collectionId` alone is not enough.** Postman's fork URL is assembled by their
 * script from the id, the workspace and the visibility; reconstructing it here
 * would be a guess at another product's URL scheme, and a wrong `href` is worse
 * than a reported one.
 */
export const postmanRunButton: Rule = (node, notes: ConversionNote[]) => {
  const url = readAttr(node, "collectionUrl")?.trim();
  const id = readAttr(node, "collectionId")?.trim();

  if (!url) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: id
        ? `<PostmanRunButton> has collectionId="${id}" but no \`collectionUrl\` — the fork URL is built by Postman's own script and must not be reconstructed here. Supply the collection's URL`
        : "<PostmanRunButton> has no `collectionUrl` — there is no destination to link to",
    });
    return null;
  }

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: "<PostmanRunButton> -> <Card> linking to the collection — the fork button is lost, since the target runs no page scripts",
  });

  return [linkCard("Run in Postman", url, "play", "Fork this collection into your Postman workspace.")];
};
