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
  version: undefined,
  unsupportedVendor: undefined,
};

export function resetFramework(): void {
  framework.vendor = undefined;
  framework.version = undefined;
  framework.unsupportedVendor = undefined;
}

/**
 * Reads `<meta>` / `<link>` tags to identify the docs platform.
 *
 * Returns `false` instead of calling `process.exit(1)` (which is what upstream
 * does) so the same function is safe to call from a Next.js route handler.
 */
export function detectFramework(rootHast: Root): boolean {
  resetFramework();

  visit(rootHast, "element", function (node) {
    const { content: rawContent, rel, name, href } = node.properties;
    const content = (
      Array.isArray(rawContent) ? rawContent.join(" ") : String(rawContent)
    ).toLowerCase();

    // GitBook — recognised so we can say why we are bailing, not supported.
    if (
      (node.tagName === "link" &&
        Array.isArray(rel) &&
        rel.includes("preconnect") &&
        typeof href === "string" &&
        href.startsWith("https://api.gitbook.com")) ||
      (node.tagName === "meta" && name === "generator" && content.includes("gitbook"))
    ) {
      framework.unsupportedVendor = "gitbook";
      return EXIT;
    }

    if (node.tagName !== "meta" || typeof name !== "string") return CONTINUE;

    switch (name) {
      case "readme-deploy":
        framework.vendor = "readme";
        framework.version = undefined;
        return EXIT;

      case "generator":
        if (content.includes("docusaurus")) {
          framework.unsupportedVendor = "docusaurus";
          return EXIT;
        }
        return CONTINUE;
    }

    return CONTINUE;
  });

  if (framework.vendor) {
    log("Successfully detected documentation vendor: " + framework.vendor);
    return true;
  }

  if (framework.unsupportedVendor) {
    log(
      `Detected ${framework.unsupportedVendor}, but this build only implements ReadMe selectors. ` +
        `Add its cases to nav/root.ts, nav/retrieve.ts and tabs/retrieve.ts to support it.`,
      "error"
    );
    return false;
  }

  log("Failed to detect documentation vendor — no <meta name=\"readme-deploy\"> found", "error");
  return false;
}
