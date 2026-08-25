import type { MigrationReport } from "./types";

/**
 * The run, as something a person reads.
 *
 * `report.json` is the same data and is what a script should consume. This exists
 * because the operator's first question is never *"what is the shape of the
 * result"* — it is **"what do I have to do next?"** — and a JSON file answers
 * that only after someone writes a query.
 *
 * So the order here is the order the work happens in: what cannot ship, what
 * needs a decision, what merely changed. Counts come first because a migration is
 * estimated before it is worked.
 */

/** A cell that will not break the table it is in. */
function cell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

function plural(count: number, one: string, many = `${one}s`): string {
  return `${count} ${count === 1 ? one : many}`;
}

export function renderMigrationMarkdown(report: MigrationReport): string {
  const lines: string[] = [];
  const { totals, discovery } = report;

  lines.push(`# Migration report — ${report.project}`, "");
  lines.push(
    `${report.site} · ${discovery.vendor} · page list from ${discovery.source}`,
    "",
    `${plural(totals.pages, "page")} · ${totals.converted} converted · ${totals.failed} failed · ` +
      `${totals.blockers} blockers · ${totals.flags} flags`,
    "",
    `Run finished ${report.finishedAt}.`,
    "",
  );

  // A capped run and a complete one produce the same-shaped report, and reporting
  // on a twentieth of a site as though it were the whole thing is the silent
  // truncation `[PIT Phase 0]` warns about. Said first, because it changes how
  // every number below it should be read.
  if (totals.pages < discovery.listedPages) {
    lines.push(
      `> **This run covered ${totals.pages} of the site's ${discovery.listedPages} pages.** ` +
        "Everything below describes only those — it is not a census of the site. " +
        "Raise `--limit`, or drop it for the whole site.",
      "",
    );
  }

  // The two numbers that mean "this will not ship", stated before anything else.
  if (totals.compiles < totals.converted) {
    lines.push(
      `> **${plural(totals.converted - totals.compiles, "page")} will not compile as MDX.** ` +
        "Those pages fail to sync — see the per-page table below.",
      "",
    );
  }
  if (totals.needRepair > 0) {
    lines.push(
      `> **${plural(totals.needRepair, "page")} needed the lenient parser.** Their source has a ` +
        "syntax error, so they received *no component conversions at all*. Repair the source and " +
        "convert again before reading anything else about them.",
      "",
    );
  }

  if (report.brand) {
    const { brand } = report;
    const label: Record<string, string> = {
      name: "Site name",
      brandLight: "Brand colour (light)",
      brandDark: "Brand colour (dark)",
      logoLight: "Logo (light)",
      logoDark: "Logo (dark)",
      favicon: "Favicon",
    };
    // `derived` is called out on its own line rather than left as a word in a
    // table cell: it is the one row that is this tool's arithmetic and not the
    // site's setting, and it is the row someone should look at.
    const derived = brand.found.filter((row) => row.from === "derived");

    lines.push("## Branding", "", "| Value | Taken from | Source |", "|---|---|---|");
    for (const row of brand.found) {
      lines.push(`| ${label[row.field] ?? row.field} | ${cell(row.value)} | ${row.from} |`);
    }
    lines.push("");

    if (brand.rejected.length > 0) {
      lines.push(
        `> **${plural(brand.rejected.length, "value")} the site gave could not be used**, so the ` +
          "Documentation.AI default stands. This is the one branding row that always needs a human:",
        "",
        ...brand.rejected.map(
          (row) => `- **${label[row.field] ?? row.field}** was \`${cell(row.value)}\` — ${cell(row.reason)}`,
        ),
        "",
      );
    }

    if (brand.adjusted.length > 0) {
      lines.push(
        ...brand.adjusted.map(
          (row) =>
            `- **${label[row.field] ?? row.field}** moved from \`${cell(row.was)}\` to ` +
            `\`${cell(row.now)}\` — ${cell(row.reason)}`,
        ),
        "",
      );
    }

    if (derived.length > 0) {
      lines.push(
        `> ${plural(derived.length, "value was", "values were")} **computed here, not read from the ` +
          "site** — ReadMe leaves the dark-mode brand colour unset on most projects and lightens it " +
          "at render time. Check it against the live site before publishing.",
        "",
      );
    }
    if (brand.missing.length > 0) {
      lines.push(
        `Not found, so Documentation.AI's default stands: ${brand.missing.join(", ")}.`,
        "",
      );
    }
    if (brand.failedAssets.length > 0) {
      lines.push(
        `${plural(brand.failedAssets.length, "asset")} could not be saved locally. ` +
          "`documentation.json` still points at the source URL, so the site renders — but nothing " +
          "is re-hostable until they are fetched.",
        "",
        ...brand.failedAssets.map((asset) => `- \`${asset.url}\` — ${cell(asset.message)}`),
        "",
      );
    }
    lines.push(
      "`heading` and `text` are deliberately left at the Documentation.AI defaults: they are " +
        "chosen for contrast, and a source site's values were picked against its own background.",
      "",
    );
  }

  lines.push("## Navigation", "");
  lines.push("| Tab | Groups | Pages |", "|---|---:|---:|");
  for (const tab of discovery.tabs) {
    lines.push(`| ${cell(tab.name)} | ${tab.groups} | ${tab.pages} |`);
  }
  lines.push("");

  if (discovery.skippedTabs.length > 0) {
    lines.push(
      "Tabs with no navigation in them, skipped:",
      "",
      ...discovery.skippedTabs.map((tab) => `- **${cell(tab.name)}** (\`${tab.url}\`) — ${cell(tab.reason)}`),
      "",
    );
  }

  if (report.notInNavigation.length > 0) {
    const placed = report.navPlacements ?? [];

    lines.push(
      "### Pages the sidebar could not reach",
      "",
      `${plural(report.notInNavigation.length, "page")} came from \`llms.txt\` but not the sidebar ` +
        "walk. On ReadMe this is normal — the sidebar omits spec-generated API endpoints, and a tab " +
        "that fails to load takes its whole subtree with it.",
      "",
    );

    if (placed.length > 0) {
      lines.push(
        "They have been given navigation entries, so nothing ships unreachable:",
        "",
        ...placed.map(
          (row) =>
            `- **${cell(row.section)}** — ${plural(row.count, "page")}, ` +
            (row.placement === "merged" ? "added to the existing tab" : "in a new tab of that name"),
        ),
        "",
        "**Check the grouping.** `llms.txt` is a flat list; its `##` heading is the only structure " +
          "there was to go on, and it is not the sidebar the source site had.",
        "",
      );
    } else {
      lines.push(
        "They have **no navigation entries**, so they would ship as orphans — files in `pages/` that " +
          "nothing links to. Either give them entries, or filter them out at discovery so they are " +
          "never fetched.",
        "",
      );
    }

    lines.push(
      ...report.notInNavigation.slice(0, 50).map((slug) => `- \`${slug}\``),
      ...(report.notInNavigation.length > 50
        ? [`- …and ${report.notInNavigation.length - 50} more (see \`report.json\`)`]
        : []),
      "",
    );
  }

  if (report.customComponents.length > 0) {
    lines.push(
      "## Components still owed a decision",
      "",
      "Each of these is in the output inside a code fence, so the page compiles and nothing is " +
        "lost. **The fences are review scaffolding and must not ship** — convert each one and " +
        "delete it.",
      "",
      "| Component | Kind | Uses | Pages |",
      "|---|---|---:|---|",
    );

    for (const row of report.customComponents) {
      const where =
        row.pages.length > 3
          ? `${row.pages.slice(0, 3).map((slug) => `\`${slug}\``).join(", ")} +${row.pages.length - 3}`
          : row.pages.map((slug) => `\`${slug}\``).join(", ");
      lines.push(`| \`<${cell(row.name)}>\` | ${row.kind} | ${row.uses} | ${cell(where)} |`);
    }

    lines.push(
      "",
      "`unknown` means the definition is not in anything that was downloaded — it lives in " +
        "ReadMe's *Settings → Custom Components*. Fetch it or decide what it should become; do " +
        "not convert it on a guess.",
      "",
    );
  }

  if (report.blockers.length > 0) {
    lines.push("## Blockers", "", "| Page | Line | Rule | Detail |", "|---|---:|---|---|");
    for (const blocker of report.blockers.slice(0, 200)) {
      lines.push(
        `| \`${cell(blocker.slug)}\` | ${blocker.line ?? ""} | ${cell(blocker.rule)} | ${cell(blocker.detail)} |`,
      );
    }
    if (report.blockers.length > 200) {
      lines.push(`| … | | | ${report.blockers.length - 200} more, see \`report.json\` |`);
    }
    lines.push("");
  }

  if (report.failed.length > 0) {
    lines.push(
      "## Pages that could not be fetched",
      "",
      "These must be dropped from `documentation.json` or it will point at files that do not exist.",
      "",
      "| Page | Why |",
      "|---|---|",
      ...report.failed.map((row) => `| \`${cell(row.slug)}\` | ${cell(row.message)} |`),
      "",
    );
  }

  lines.push("## Pages", "", "| Page | Parser | Compiles | Blockers | Flags | Fenced |", "|---|---|---|---:|---:|---:|");
  for (const page of report.pages) {
    lines.push(
      `| \`${cell(page.slug)}\` | ${page.parseMode} | ${page.outputCompiles ? "yes" : "**no**"} | ` +
        `${page.notes.blocker} | ${page.notes.flag} | ${page.quarantined.length} |`,
    );
  }
  lines.push("");

  return lines.join("\n");
}
