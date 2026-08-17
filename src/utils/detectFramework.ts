import type { Root } from "hast";
import { visit, EXIT, CONTINUE } from "unist-util-visit";

import type { Framework } from "../types/framework";
import { log } from "./log";

/**
 * Step 3 of the pipeline.
 *
 * A module-level mutable singleton, exactly as upstream does it. Every selector
 * downstream (sidebar root, list-item shape, content root, tab bar) reads
 * `framework.vendor` rather than taking it as an argument — which is why this
 * has to be set before anything else runs.
 */
export const framework: Framework = {
  vendor: undefined,
};

export function resetFramework(): void {
  framework.vendor = undefined;
}

/**
 * Confirms the page is a ReadMe site, by its deploy meta tag.
 *
 * ReadMe stamps every page with `<meta name="readme-deploy" content="…">`. That
 * one tag is the whole check — this build implements ReadMe selectors only, so
 * there is nothing to dispatch on and no other vendor to look for.
 *
 * Returns `false` instead of calling `process.exit(1)` (which is what upstream
 * does) so the same function is safe to call from a Next.js route handler.
 */
export function detectFramework(rootHast: Root): boolean {
  resetFramework();

  visit(rootHast, "element", function (node) {
    if (node.tagName !== "meta" || node.properties.name !== "readme-deploy") return CONTINUE;
    framework.vendor = "readme";
    return EXIT;
  });

  if (framework.vendor) {
    log("Successfully detected documentation vendor: " + framework.vendor);
    return true;
  }

  // Worth being specific: the most likely way to land here is pointing the tool
  // at a docs site built on something else, and "unsupported vendor" would not
  // say which tag was looked for or where to add support.
  log(
    'Not a ReadMe site — no <meta name="readme-deploy"> in this page\'s HTML. ' +
      "This build implements ReadMe selectors only; another vendor needs its own cases in " +
      "nav/root.ts, nav/retrieve.ts, pipeline/page.ts and tabs/retrieve.ts.",
    "error"
  );
  return false;
}
