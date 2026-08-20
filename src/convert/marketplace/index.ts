import type { Parent, Root, RootContent } from "mdast";

import { definedHere } from "../custom-components";
import { liftInlineJsx, type ConversionNote } from "../mdast";
import { advancedTable } from "./advanced-table";
import { banner } from "./banner";
import { compatibility } from "./compatibility";
import { contentModal } from "./content-modal";
import { gitHubBadge } from "./github-badge";
import { grid } from "./grid";
import { keyPress } from "./key-press";
import { quizGame } from "./quiz-game";
import type { Rule } from "./rule";
import { simpleStepper } from "./simple-stepper";
import { spoiler } from "./spoiler";
import { terminal } from "./terminal";
import { toggleList } from "./toggle-list";

/**
 * Plan §4.2 / marketplace-conversion.md §5 — ReadMe Marketplace components ->
 * Documentation.AI.
 *
 * ## What is here, and what is deliberately not
 *
 * Five Marketplace components share a name with a ReadMe built-in — `Accordion`,
 * `Cards`, `Columns`, `Tabs` and `PostmanRunButton` `[RM §9, §12 gotcha 17]` — and
 * the passes that own those names already convert them. Adding rules here would
 * mean two passes racing for the same tag, so they are absent on purpose.
 *
 * Five more are Route 3 `[marketplace-conversion.md §5.3]`: their content is
 * fetched at runtime and is not in the page at all. `PostList`, `StatusPage`,
 * `PostmanRunButton` and `DownloadOASButton` have no faithful conversion, only a
 * link a person must choose — so they fall through to the detector and are
 * reported, rather than being silently turned into a card pointing somewhere this
 * code guessed.
 *
 * `Latex` is the same: it needs a CDN library the target will not load, and
 * neither an image nor a fence is a decision a converter should make alone.
 *
 * ## Where it runs
 *
 * After the built-in component passes and before the custom-component detector.
 * After, because otherwise this pass and `convertColumns` would both claim a
 * `<Columns>`; before, because whatever this pass does not handle should be
 * *reported* as unconverted rather than shipped in silence.
 */
const RULES: Record<string, Rule> = {
  AdvancedTable: advancedTable,
  Banner: banner,
  Compatibility: compatibility,
  ContentModal: contentModal,
  GitHubBadge: gitHubBadge,
  Grid: grid,
  KeyPress: keyPress,
  QuizGame: quizGame,
  SimpleStepper: simpleStepper,
  Spoiler: spoiler,
  Terminal: terminal,
  ToggleList: toggleList,
};

/** The names this pass converts. */
export const MARKETPLACE_HANDLED = new Set(Object.keys(RULES));

/**
 * Child components that carry no rule of their own — their parent consumes them.
 *
 * They still have to be lifted: `<SimpleStep header="Install">Run npm i.</SimpleStep>`
 * written on one line parses as an `mdxJsxTextElement` **inside a paragraph**, so
 * a parent walking its own children for flow elements finds none and emits an
 * empty `<Steps>`. The page compiles and the steps are gone.
 */
const LIFT = new Set([...MARKETPLACE_HANDLED, "SimpleStep", "ToggleListItem"]);

export function convertMarketplace(root: Root, notes: ConversionNote[]): void {
  // A Marketplace component is installed into a project as an *editable* custom
  // component `[RM §9]`, so a page carrying its own `export const Spoiler` has a
  // Spoiler that is no longer the one in the table. Applying the standard rule
  // there would describe a component this site does not have. The local
  // definition wins, and the detector reports it as `local` instead.
  const local = definedHere(root);
  // A component written on one line parses as an inline element inside a
  // paragraph, not as a flow element. Without this, every one-liner is skipped
  // and vanishes from the output while the page still compiles.
  liftInlineJsx(root, LIFT, notes);

  const walk = (parent: Parent): void => {
    const children = parent.children as RootContent[];

    for (let index = 0; index < children.length; index += 1) {
      const child = children[index];
      if (child === undefined) continue;

      if (child.type === "mdxJsxFlowElement" && child.name !== null) {
        const rule = local.has(child.name) ? undefined : RULES[child.name];

        if (rule !== undefined) {
          const replacement = rule(child, notes);
          // `null` means the rule could not convert this and has said why. Leave
          // the node exactly as it was; the detector reports it downstream.
          if (replacement !== null) {
            children.splice(index, 1, ...replacement);
            index += replacement.length - 1;
            continue;
          }
        }
      }

      if ("children" in child && Array.isArray((child as Parent).children)) walk(child as Parent);
    }
  };

  walk(root);
}
