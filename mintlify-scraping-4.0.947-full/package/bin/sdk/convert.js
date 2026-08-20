import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { convertHeaderLinksToText } from '../components/link.js';
import { createCallout, createCodeGroup, createTabs } from '../customComponents/create.js';
import { rehypeToRemarkCustomComponents } from '../customComponents/plugin.js';
import { selectiveRehypeRemark } from '../customComponents/selective.js';
import { htmlToHast } from '../pipeline/root.js';
import { unifiedRemoveBreaks } from '../utils/breaks.js';
import { unifiedRemoveClassNames } from '../utils/className.js';
import { unifiedRemoveCopyButtons } from '../utils/copyButton.js';
import { framework } from '../utils/detectFramework.js';
import { remarkRemoveEmptyEmphases } from '../utils/emptyEmphasis.js';
import { unifiedRemoveEmptyParagraphs } from '../utils/emptyParagraphs.js';
import { remarkProperlyFormatEmphasis } from '../utils/formatEmphasis.js';
import { removeHastComments } from '../utils/hastComments.js';
import { remarkSpaceListsOut } from '../utils/lists.js';
import { unifiedRemoveNestedRoots } from '../utils/nestedRoots.js';
import { unifiedRemovePositions } from '../utils/position.js';
const rehypeRewriteLinks = (rewriteLink) => () => (tree) => {
    visit(tree, 'element', (node) => {
        if (node.tagName !== 'a' || typeof node.properties?.href !== 'string')
            return;
        const rewritten = rewriteLink(node.properties.href);
        if (rewritten === undefined) {
            delete node.properties.href;
        }
        else {
            node.properties.href = rewritten;
        }
    });
};
export function hastToMdx(fragment, rewriteLink) {
    const originalVendor = framework.vendor;
    framework.vendor ??= 'gitbook';
    try {
        return runHastToMdx(fragment, rewriteLink);
    }
    finally {
        framework.vendor = originalVendor;
    }
}
function runHastToMdx(fragment, rewriteLink) {
    const processor = unified().use(unifiedRemoveBreaks).use(unifiedRemoveCopyButtons);
    if (rewriteLink)
        processor.use(rehypeRewriteLinks(rewriteLink));
    const mdastTree = processor
        .use(createCallout)
        .use(createCodeGroup)
        .use(createTabs)
        .use(unifiedRemoveClassNames)
        .use(unifiedRemoveEmptyParagraphs)
        .use(unifiedRemovePositions)
        .use(selectiveRehypeRemark)
        .use(rehypeToRemarkCustomComponents)
        .use(convertHeaderLinksToText)
        .use(unifiedRemoveNestedRoots)
        .use(remarkSpaceListsOut)
        .use(remarkRemoveEmptyEmphases)
        .use(remarkProperlyFormatEmphasis)
        // @ts-expect-error hast root is transformed to mdast by the plugin chain
        .runSync(fragment);
    return stringifyMdast(mdastTree);
}
export function htmlToMdx(html, rewriteLink) {
    const hast = htmlToHast(html);
    removeHastComments(hast);
    return hastToMdx(hast, rewriteLink);
}
export function markdownToMdx(markdown) {
    const mdastTree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
    visit(mdastTree, 'html', (node) => {
        node.type = 'text';
        node.value = node.value.replace(/<[^>]*>/g, '');
    });
    return stringifyMdast(mdastTree);
}
function stringifyMdast(tree) {
    const result = unified().use(remarkMdx).use(remarkGfm).use(remarkStringify).stringify(tree);
    return String(result)
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}
export function escapeMdxText(text) {
    return markdownToMdx(text.replace(/\r\n/g, '\n'));
}
//# sourceMappingURL=convert.js.map