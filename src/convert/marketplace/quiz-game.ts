import type { List, RootContent } from "mdast";

import { lineOf, readAttr, type ConversionNote } from "../mdast";
import { parseRecordArray } from "./js-literal";
import { boldPara, expandable, para, type Rule } from "./rule";

/**
 * `<QuizGame>` -> the question, the options, and the answer
 * (marketplace-conversion.md §7.3).
 *
 * Source `[MP QuizGame]`: `({ question, options })` where `options` is
 * `[{ text, isCorrect }]`, scored on click.
 *
 * The interaction cannot survive, but the material can — and **`isCorrect` must
 * survive with it.** Dropping it turns a quiz into an unanswerable list, which
 * reads as complete and is not: exactly the silent loss `[PIT Phase 2]` warns
 * about. So the correct answers go into an `<Expandable>`, which keeps them out
 * of sight until the reader asks, the nearest thing the target has to "submit".
 *
 * Everything here is in props, so all of it has to be lifted into the body.
 */
export const quizGame: Rule = (node, notes: ConversionNote[]) => {
  const question = readAttr(node, "question")?.trim();
  const raw = readAttr(node, "options");
  const options = raw === undefined ? null : parseRecordArray(raw);

  if (!question || options === null || options.length === 0) {
    notes.push({
      rule: "marketplace",
      level: "blocker",
      line: lineOf(node),
      detail: "<QuizGame> is missing a readable `question` or `options` array — the quiz cannot be rebuilt without inventing its content",
    });
    return null;
  }

  const list: List = {
    type: "list",
    ordered: false,
    spread: false,
    children: options.map((option) => ({
      type: "listItem",
      spread: false,
      children: [para(String(option.text ?? ""))],
    })),
  };

  const correct = options.filter((option) => option.isCorrect === true).map((option) => String(option.text ?? ""));

  const out: RootContent[] = [boldPara(question), list];

  if (correct.length > 0) {
    out.push(expandable("Show answer", [boldPara(correct.join(", "))] as never, false));
  } else {
    notes.push({
      rule: "marketplace",
      level: "flag",
      line: lineOf(node),
      detail: "<QuizGame> marks no option `isCorrect: true` — the options are kept but no answer could be recorded",
    });
  }

  notes.push({
    rule: "marketplace",
    level: "change",
    line: lineOf(node),
    detail: `<QuizGame> -> a question, ${options.length} options and the answer in an <Expandable> — scoring is lost, the material is kept`,
  });

  return out;
};
