import type { Root as HastRoot } from 'hast';
export type RewriteLink = (href: string) => string | undefined;
export declare function hastToMdx(fragment: HastRoot, rewriteLink?: RewriteLink): string;
export declare function htmlToMdx(html: string, rewriteLink?: RewriteLink): string;
export declare function markdownToMdx(markdown: string): string;
export declare function escapeMdxText(text: string): string;
