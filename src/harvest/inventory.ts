import { targetForComponent, targetForMagicBlock, targetForSyntax } from "./mapping";
import type { Block, Inventory, InventoryRow, PageIR, Target } from "./types";

/**
 * The site-wide census.
 *
 * This is the artefact that answers "what do I actually have to build a
 * converter for?" before a single page is converted — every component that
 * appears anywhere, how often, on how many pages, where it lands on
 * Documentation.AI, and which ones have no landing place at all.
 */

type Accumulator = {
  count: number;
  pages: Set<string>;
  examples: string[];
  syntax: Block["syntax"];
  target: Target;
};

function targetFor(block: Block): Target {
  if (block.target) return block.target;
  if (block.syntax === "magic-block") return targetForMagicBlock(block.component ?? "");
  if (block.component) return targetForComponent(block.component);
  return targetForSyntax(block.kind);
}

export function buildInventory(pages: PageIR[], site: string, generatedFrom: string): Inventory {
  const components = new Map<string, Accumulator>();
  const inline = new Map<string, { count: number; pages: Set<string>; examples: string[] }>();
  const notes = new Map<string, { count: number; examples: string[] }>();
  let blockCount = 0;

  const walk = (page: PageIR, blocks: Block[]) => {
    for (const block of blocks) {
      blockCount++;

      const name = block.component ?? block.kind;
      const entry = components.get(name) ?? {
        count: 0,
        pages: new Set<string>(),
        examples: [],
        syntax: block.syntax,
        target: targetFor(block),
      };
      entry.count++;
      entry.pages.add(page.slug);
      if (entry.examples.length < 5 && !entry.examples.includes(page.slug)) {
        entry.examples.push(`${page.slug}#${block.i}`);
      }
      components.set(name, entry);

      for (const hit of block.inline ?? []) {
        const row = inline.get(hit.kind) ?? { count: 0, pages: new Set<string>(), examples: [] };
        row.count++;
        row.pages.add(page.slug);
        if (row.examples.length < 5) row.examples.push(hit.value.slice(0, 120));
        inline.set(hit.kind, row);
      }

      for (const note of block.notes ?? []) {
        const row = notes.get(note) ?? { count: 0, examples: [] };
        row.count++;
        if (row.examples.length < 5) row.examples.push(`${page.slug}#${block.i}`);
        notes.set(note, row);
      }

      if (block.children) walk(page, block.children);
    }
  };

  for (const page of pages) walk(page, page.blocks);

  const rows: InventoryRow[] = [...components.entries()]
    .map(([name, entry]) => ({
      name,
      syntax: entry.syntax,
      count: entry.count,
      pages: entry.pages.size,
      target: entry.target,
      examples: entry.examples,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    site,
    generatedFrom,
    pages: pages.length,
    blocks: blockCount,
    parseFallbacks: pages.filter((page) => page.parseMode === "markdown").map((page) => page.slug),
    components: rows,
    inline: [...inline.entries()]
      .map(([kind, row]) => ({ kind, count: row.count, pages: row.pages.size, examples: row.examples }))
      .sort((a, b) => b.count - a.count),
    notes: [...notes.entries()]
      .map(([note, row]) => ({ note, count: row.count, examples: row.examples }))
      .sort((a, b) => b.count - a.count),
  };
}

/** The same census as a page you can read without opening a JSON viewer. */
export function renderInventoryMarkdown(inventory: Inventory): string {
  const lines: string[] = [];
  // Only `manual` needs a person. `drop` is already a decision, and listing it
  // here buried the three things that genuinely do under a wall of `<br />`.
  const needsWork = inventory.components.filter((row) => row.target.status === "manual");
  const dropped = inventory.components.filter((row) => row.target.status === "drop");

  lines.push(`# Component inventory — ${inventory.site}`, "");
  lines.push(
    `${inventory.pages} pages · ${inventory.blocks} blocks · ` +
      `${inventory.components.length} distinct constructs · ` +
      `${inventory.parseFallbacks.length} pages needed the lenient parser`,
    "",
    `Page list from \`${inventory.generatedFrom}\`.`,
    ""
  );

  lines.push("## What is on the site, and what it becomes", "");
  lines.push("| Construct | Syntax | Uses | Pages | Documentation.AI | Status | Note |");
  lines.push("| --- | --- | ---: | ---: | --- | --- | --- |");
  for (const row of inventory.components) {
    lines.push(
      `| \`${row.name}\` | ${row.syntax} | ${row.count} | ${row.pages} | ` +
        `${row.target.component ? `\`<${row.target.component}>\`` : "plain markdown"} | ` +
        `${row.target.status} | ${row.target.note ?? ""} |`
    );
  }
  lines.push("");

  if (needsWork.length) {
    lines.push("## No direct equivalent — decide before converting", "");
    for (const row of needsWork) {
      lines.push(
        `- \`${row.name}\` (${row.count}× on ${row.pages} pages) — ${row.target.note ?? "no mapping"}. ` +
          `e.g. ${row.examples.slice(0, 3).join(", ")}`
      );
    }
    lines.push("");
  }

  if (dropped.length) {
    lines.push("## Not carried over", "");
    for (const row of dropped) {
      lines.push(`- \`${row.name}\` (${row.count}×) — ${row.target.note ?? "dropped"}`);
    }
    lines.push("");
  }

  if (inventory.inline.length) {
    lines.push("## Inline syntax", "");
    lines.push("| Kind | Uses | Pages | Examples |");
    lines.push("| --- | ---: | ---: | --- |");
    for (const row of inventory.inline) {
      const examples = row.examples.map((value) => `\`${value.replace(/\|/g, "\\|")}\``).join(" ");
      lines.push(`| ${row.kind} | ${row.count} | ${row.pages} | ${examples} |`);
    }
    lines.push("");
  }

  if (inventory.notes.length) {
    lines.push("## Flagged for repair", "");
    lines.push("| Issue | Occurrences | Examples |");
    lines.push("| --- | ---: | --- |");
    for (const row of inventory.notes) {
      lines.push(`| ${row.note.replace(/\|/g, "\\|")} | ${row.count} | ${row.examples.slice(0, 3).join(", ")} |`);
    }
    lines.push("");
  }

  if (inventory.parseFallbacks.length) {
    lines.push("## Pages that failed the strict MDX parse", "");
    lines.push(
      "These use ReadMe's lenient MDXish dialect. They are fully blocked out, but the syntax needs",
      "repairing before Documentation.AI will compile them.",
      ""
    );
    for (const slug of inventory.parseFallbacks.slice(0, 50)) lines.push(`- ${slug}`);
    if (inventory.parseFallbacks.length > 50) {
      lines.push(`- …and ${inventory.parseFallbacks.length - 50} more (see \`inventory.json\`)`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
