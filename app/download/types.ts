import type { Inventory, PageIR } from "@/src/harvest/types";

export type HarvestResponse = {
  ok: boolean;
  message?: string;
  /** The site the pages came from. */
  site?: string;
  /** How many pages llms.txt listed, before the filter. */
  listed?: number;
  /** How many matched the filter — usually more than were harvested. */
  matching?: number;
  /** The per-request page cap that was applied. */
  limit?: number;
  pages?: PageIR[];
  /** slug -> the raw markdown that produced the IR. The "input" pane. */
  raw?: Record<string, string>;
  failed?: { slug: string; message: string }[];
  inventory?: Inventory;
};
