import type { Element, ElementContent } from "hast";
import type { Code } from "mdast";
import { CONTINUE, visit } from "unist-util-visit";

import type { HastNode, HastNodeIndex, HastNodeParent } from "../types/hast";
import { hasClassName } from "../utils/className";

/**
 * ReadMe renders tabbed code as:
 *
 *   <div class="CodeTabs">
 *     <div class="CodeTabs-toolbar">
 *       <button value="json">JSON</button>          one per tab
 *     </div>
 *     <div class="CodeTabs-inner">
 *       <pre><code class="rdmd-code" data-lang="json">…</code></pre>
 *     </div>
 *   </div>
 *
 * The language is in `data-lang` (or the toolbar button's `value`), never a
 * `language-*` class, so a plain conversion would drop it. Documentation.AI's
 * CodeGroup needs at least two tabs (ucc/CodeGroup.json), so a single-tab block
 * is rebuilt as an ordinary fenced code block instead — with its language
 * restored via a `language-*` class that survives `removeClassNames`.
 */
type Tab = { lang: string; title: string; value: string };

function textOf(node: Element): string {
  let text = "";
  visit(node, "text", function (textNode) {
    text += textNode.value;
  });
  return text;
}

function collectTabs(node: Element): Tab[] {
  const titles: { title: string; value: string }[] = [];
  const codes: { lang: string; value: string }[] = [];

  visit(node, "element", function (subNode) {
    if (subNode.tagName === "button") {
      titles.push({
        title: textOf(subNode).trim(),
        value: typeof subNode.properties.value === "string" ? subNode.properties.value : "",
      });
      return CONTINUE;
    }
    if (subNode.tagName === "code" && hasClassName(subNode, "rdmd-code")) {
      codes.push({
        lang: typeof subNode.properties.dataLang === "string" ? subNode.properties.dataLang : "",
        value: textOf(subNode).replace(/\n$/, ""),
      });
    }
    return CONTINUE;
  });

  return codes.map((code, index) => {
    const button = titles[index];
    const lang = code.lang || button?.value || "";
    const title = button?.title || lang;
    return { lang, title, value: code.value };
  });
}

export function readmeScrapeCodeGroup(
  node: HastNode,
  _index: HastNodeIndex,
  _parent: HastNodeParent
): Element | undefined {
  if (node.tagName !== "div" || !hasClassName(node, "CodeTabs")) return undefined;

  const tabs = collectTabs(node);
  if (tabs.length === 0) return undefined;

  // A single tab is not a group — emit a normal fenced block, but keep the
  // language by re-encoding it as the `language-*` class the bridge reads.
  if (tabs.length === 1) {
    const only = tabs[0]!;
    return {
      type: "element",
      tagName: "pre",
      properties: {},
      children: [
        {
          type: "element",
          tagName: "code",
          properties: only.lang ? { className: [`language-${only.lang}`] } : {},
          children: [{ type: "text", value: only.value }],
        },
      ],
    };
  }

  // Each tab becomes a fenced code block; its title rides in `meta`, which
  // Documentation.AI reads as the tab label.
  const children = tabs.map(
    (tab): Code => ({
      type: "code",
      lang: tab.lang || null,
      meta: tab.title || null,
      value: tab.value,
    })
  );

  return {
    type: "element",
    tagName: "CodeGroup",
    properties: {},
    children: children as unknown as ElementContent[],
  };
}
