import { existsSync } from "node:fs";
import { join } from "node:path";

import { write } from "../utils/file";

/**
 * Where a migration's files go.
 *
 * ## The split this exists to make
 *
 * `migrateSite` used to convert a page and write it in the same breath, so
 * *where files land* was baked into the conversion. That is fine until there is
 * a second destination — and on a deployed site there is no folder to write to,
 * because the server is not the reader's machine.
 *
 * So the migration now produces files and hands them over, and a sink decides
 * what happens next. Same migration, two endings: a folder on your own machine,
 * a zip in your browser when it is deployed. Anything later — object storage, a
 * git push, publishing straight to Documentation.AI — is one more sink and no
 * change to any conversion.
 *
 * ## What a sink is not responsible for
 *
 * **Images.** They live in a shared `output/images/` folder outside every
 * project (see `src/paths.ts`), because they are content-addressed and worth
 * sharing, and because no page points at them. They are written straight to
 * disk by the image downloader, or not downloaded at all — never routed through
 * here.
 */

/** One file to write. `body` allows bytes because images and fonts are not text. */
export type OutputFile = { path: string; body: string | Uint8Array };

export interface Sink {
  /**
   * Is this file already here?
   *
   * The download cache is the reason a second run takes seconds rather than
   * refetching a whole site, and "already here" is a question only a real
   * directory can answer. A sink with no persistence answers `false`, which is
   * correct rather than a limitation: nothing is cached, so nothing is stale.
   */
  has(path: string): boolean;
  write(file: OutputFile): void;
  /** A one-line description of where the files went, for the report and the log. */
  describe(): string;
}

/** Writes into a real directory — the local run, and what the CLI always uses. */
export class DiskSink implements Sink {
  constructor(private readonly root: string) {}

  has(path: string): boolean {
    return existsSync(join(this.root, path));
  }

  write(file: OutputFile): void {
    write(join(this.root, file.path), file.body);
  }

  describe(): string {
    return this.root;
  }
}

/**
 * Keeps everything in memory.
 *
 * Two uses, and the second is the one that matters: it is what the zip is built
 * from, and it is what lets the whole migration be tested end to end without
 * touching a filesystem.
 */
export class MemorySink implements Sink {
  readonly files: OutputFile[] = [];

  has(): boolean {
    return false;
  }

  write(file: OutputFile): void {
    const at = this.files.findIndex((existing) => existing.path === file.path);
    if (at === -1) this.files.push(file);
    else this.files[at] = file;
  }

  describe(): string {
    return `${this.files.length} files, in memory`;
  }
}
