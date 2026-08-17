/**
 * The library surface.
 *
 * There is no CLI and no `discover()` entry point any more — discovery runs
 * through `/api/fetch-pages-links`, which composes these pieces directly:
 * fetch -> parse -> detect vendor -> find tabs -> walk each tab's sidebar (or
 * its paginated list) -> tidy into navigation.
 *
 * It stops at the structure. Nothing here fetches or converts a page body: the
 * next stage takes these slugs and requests `<slug>.md` from ReadMe.
 */
export { scrapeSite } from "./pipeline/site";
export { retrieveNavItems } from "./nav/retrieve";
export { retrieveListNavItems, retrieveListPage } from "./nav/list";
export { retrieveRootNavElement } from "./nav/root";
export { buildDocumentationJson } from "./output/documentationJson";
export { retrieveTabLinks } from "./tabs/retrieve";
export { detectFramework, framework } from "./utils/detectFramework";
export { htmlToHast } from "./pipeline/root";
export { fetchPageHtml } from "./utils/network";
export type { DiscoveryReport, DocsConfig, NavigationEntry, Tab } from "./types/nav";
