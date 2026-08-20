import type { Parent, Root, RootContent } from "mdast";

import { definedHere } from "../custom-components";
import { liftInlineJsx, type ConversionNote } from "../mdast";
import { advancedTable } from "./advanced-table";
import { banner } from "./banner";
import { compatibility } from "./compatibility";
import { contentModal } from "./content-modal";
import { downloadOasButton } from "./download-oas-button";
import { gitHubBadge } from "./github-badge";
import { grid } from "./grid";
import { keyPress } from "./key-press";
import { latex } from "./latex";
import { postmanRunButton } from "./postman-run-button";
import { quizGame } from "./quiz-game";
import { postList, type PostListOptions } from "./post-list";
import type { FoundPostList, Rule, RuleContext } from "./rule";
import { simpleStepper } from "./simple-stepper";
import { snapSlider } from "./snap-slider";
import { spoiler } from "./spoiler";
import { statusPage } from "./status-page";
import { terminal } from "./terminal";
import { toggleList } from "./toggle-list";
import { windows } from "./windows";

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
 * `PostmanRunButton` is the exception among those five, and it is handled here:
 * unlike the other four, **no pass owns it**, so without a rule it would be
 * reported as an unknown custom component — a blocker saying "the definition is
 * not in this file" about a component that is fully documented `[RM §4.15]`.
 *
 * `SnapSlider` and `Windows` are Route 2 `[marketplace-conversion.md §5.2]`: pure
 * decoration with no native equivalent, converted to a classed wrapper whose
 * styling lives in `styles/marketplace.css`. They wrap rather than prerender, so
 * their children stay real markdown nodes and stay searchable.
 *
 * `PostList` is here but is only half-converted by this pass: it needs the network,
 * and rules are synchronous, so it records its node and `fetchPostLists` fills it
 * in afterwards — the two-phase shape the image pass already uses.
 *
 * `Latex` converts, but only to a marker: the target has no math support at all, so
 * `latex.ts` emits `<div className="math">` and the rendering is arranged at site
 * level by `scripts/katex-render.js`.
 *
 * **Every one of the 24 is now claimed** — by a rule here, or by the pass that owns
 * its built-in name. What still reaches the detector is a Marketplace *child*
 * component found outside its parent (an orphaned `<ToggleListItem>`, say), which
 * is a real authoring error worth reporting.
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
  DownloadOASButton: downloadOasButton,
  GitHubBadge: gitHubBadge,
  Grid: grid,
  KeyPress: keyPress,
  Latex: latex,
  PostList: postList,
  PostmanRunButton: postmanRunButton,
  QuizGame: quizGame,
  SimpleStepper: simpleStepper,
  SnapSlider: snapSlider,
  Spoiler: spoiler,
  StatusPage: statusPage,
  Terminal: terminal,
  ToggleList: toggleList,
  Windows: windows,
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

export function convertMarketplace(root: Root, notes: ConversionNote[]): FoundPostList[] {
  const ctx: RuleContext = { postLists: [] };
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
          const replacement = rule(child, notes, ctx);
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
  return ctx.postLists;
}

export { fetchPostLists } from "./post-list";
export type { PostListOptions } from "./post-list";
