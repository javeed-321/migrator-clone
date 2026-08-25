import type { BrandReport } from "../brand/types";
import type { NavigationEntry } from "../types/nav";
import type { UnreachablePlacement } from "./orphans";
import type { FoundCustom } from "../convert/custom-components";

/**
 * What one migration run produces, in one object.
 *
 * ## Why the report is a type and not a log
 *
 * The four stages each already knew something the next one needed and nobody
 * else ever saw: discovery knew which tabs were empty, download knew which pages
 * 404'd, conversion knew which components had no home. Each printed its own half
 * to its own console and the operator held the join in their head.
 *
 * `[PIT Phase 0]` is that a migration's real unit of work is *the queue of things
 * still owed*, and a queue that lives in four places is not a queue. So the run
 * returns one, and `report.md` is a rendering of it rather than a parallel
 * account that can disagree.
 */

/** One page, from URL to `.mdx`. */
export type PageReport = {
  slug: string;
  title: string;
  /** The human URL, not the `.md` one — this is what someone opens to compare. */
  url: string;
  /**
   * `markdown` means strict MDX rejected the source and it fell back to GFM. Such
   * a page gets **no component conversions at all**, so this is the single most
   * important field on the row.
   */
  parseMode: "mdx" | "markdown";
  /** Whether the *output* compiles. `false` means the page will fail to sync. */
  outputCompiles: boolean;
  notes: { blocker: number; flag: number; change: number };
  /** Components fenced by the quarantine pass, so the page compiles regardless. */
  quarantined: { name: string; kind: FoundCustom["kind"]; line?: number }[];
  /** Where the `.mdx` was written, when the run had somewhere to write it. */
  path?: string;
  /**
   * The endpoint this page was bound to, when its source carried a spec.
   *
   * Recorded per page because the two facts a reviewer needs are *which* endpoint
   * a page drives and *how much* of the page the spec writes — and `mode: "auto"`
   * means the body is not what will be rendered, which nothing else on the row
   * would say.
   */
  openapi?: { spec: string; method: string; route: string; mode: "auto" | "custom" };
};

/** One component across the whole corpus — the unit the queue is worked in. */
export type CustomComponentRow = {
  name: string;
  kind: FoundCustom["kind"];
  /** Total call sites, which is the size of the job. */
  uses: number;
  /** Slugs it appears on, so a decision can be checked against a real page. */
  pages: string[];
};

/** A blocker, kept with the page it came from. */
export type BlockerRow = { slug: string; rule: string; line?: number; detail: string };

export type DiscoveryReport = {
  vendor: string;
  /** Where the page list came from — `llms.txt` or the sidebar walk. */
  source: string;
  tabs: { name: string; url: string; groups: number; pages: number }[];
  skippedTabs: { name: string; url: string; reason: string }[];
  /** Pages the sidebar walk found. The navigation is built from these. */
  navPages: number;
  /** Pages the page list had. Usually larger — the sidebar hides API endpoints. */
  listedPages: number;
};

export type MigrationReport = {
  /** Directory-safe name for the site, e.g. `docs-capillarytech-com`. */
  project: string;
  site: string;
  startedAt: string;
  finishedAt: string;
  /** Absolute path everything was written under, when the run wrote anything. */
  outDir?: string;
  discovery: DiscoveryReport;
  totals: {
    pages: number;
    converted: number;
    failed: number;
    /** Pages whose output compiles as MDX. Anything less than `converted` is a bug. */
    compiles: number;
    /** Pages that needed the lenient parser, so their source needs repairing first. */
    needRepair: number;
    blockers: number;
    flags: number;
    quarantined: number;
    /** Pages bound to an OpenAPI spec, so they render a playground. */
    endpoints: number;
  };
  pages: PageReport[];
  customComponents: CustomComponentRow[];
  blockers: BlockerRow[];
  failed: { slug: string; message: string }[];
  /**
   * Downloaded, converted, and **not reachable from the sidebar walk**.
   *
   * `[PIT Phase 0]`: the nav is a lower bound, not the page list. ReadMe's
   * sidebar omits spec-generated API endpoints, and a tab that fails to load
   * takes its whole subtree with it, so this is normally non-empty on an
   * API-heavy site.
   *
   * These are no longer orphans: `navUnreachable` gives each one an entry
   * grouped by its `llms.txt` section, and `navPlacements` says where they went.
   * The list stays because the grouping is a guess and this is the set to check
   * it against.
   */
  notInNavigation: string[];
  /**
   * Where the `notInNavigation` pages were placed. Absent when there were none,
   * or when `navUnreachable` was off — in which case they really are orphans.
   */
  navPlacements?: UnreachablePlacement[];
  /**
   * The colours, logos and favicon read off the source site, and which source
   * answered each one. Absent when the brand stage was skipped or failed.
   */
  brand?: BrandReport;
};

/** The navigation half, kept so `documentation.json` can be rebuilt without a refetch. */
export type DiscoveredTab = { name: string; url: string; navigation: NavigationEntry[] };
