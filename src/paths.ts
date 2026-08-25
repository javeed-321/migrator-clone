import { join } from "node:path";

import { IMAGE_DIR } from "./constants";

/**
 * Where everything the tool writes goes, in one place.
 *
 * ## Why images sit outside the project
 *
 * Every image is named by a hash of its own bytes
 * (`0dbe388e…-image.png`), so the same picture always lands on the same
 * filename. Put the folder inside a project and a logo used by three migrated
 * sites is fetched and stored three times; put it beside them and it is fetched
 * once and shared, and a re-run of any project finds it already there.
 *
 * That is only safe because **no page points at these files.** The converter
 * leaves every `src` on the URL it was authored with — the copy on disk exists
 * so re-hosting later is a decision someone can make deliberately, not a
 * dependency of the output. Which is also why the deployed download leaves them
 * out entirely: the pages are complete without them.
 */

/** `output/` — the root of everything written. */
export const OUTPUT_DIR = "output";

/** `output/projects/` — one folder per migrated site. */
export const PROJECTS_DIR = "projects";

/**
 * ## Where the converted `.mdx` files go, and why there is no constant for it
 *
 * **A navigation `path` is the MDX file path with `.mdx` removed** `[DAI §26]`,
 * so a folder name is not just a folder name — it is half of every entry in
 * `documentation.json`.
 *
 * There used to be a `PAGES_DIR = "pages"` here, and it caused exactly the
 * failure this comment warned about. The source slug already carries its own
 * section (`docs/introduction`, `reference/get-a-customer`), the navigation
 * builder emits that slug verbatim, and the writer added `pages/` in front of it
 * — so the config said `docs/introduction` and the file sat at
 * `pages/docs/introduction.mdx`. Valid config, real pages, nothing resolving.
 *
 * So the slug is the path, at the project root: `docs/introduction.mdx`. One
 * spelling, in one place (`migrate/run.ts`), which is the only arrangement the
 * two halves cannot drift apart in. `buildDocumentationJson` still takes a
 * `pathPrefix` for a caller that genuinely nests its pages — but then it must be
 * given, not assumed.
 */
export function outputRoot(cwd: string = process.cwd()): string {
  return join(cwd, OUTPUT_DIR);
}

/** `output/projects/<project>/` — one migration's own files. */
export function projectDir(project: string, root: string = outputRoot()): string {
  return join(root, PROJECTS_DIR, project);
}

/**
 * The parent the image downloader is given, since it appends `dir` itself.
 * Together these make `output/images/`.
 */
export function imagesOptions(root: string = outputRoot()): {
  outDir: string;
  dir: string;
  publicPath: string;
} {
  return { outDir: root, dir: IMAGE_DIR, publicPath: `/${IMAGE_DIR}` };
}
