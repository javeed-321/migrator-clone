import fse from 'fs-extra';
import path from 'node:path';
import { htmlToHast } from '../../pipeline/root.js';
import { removeHastComments } from '../../utils/hastComments.js';
import { hastToMdx } from '../convert.js';
const TYPE_NAME_PATTERN = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/;
const DROPPED_CLASSES = new Set([
    'summary',
    'inherited-list',
    'sub-title',
    'header',
    'inheritance',
]);
export async function convertJavadoc(sourcePath) {
    const types = await discoverTypes(sourcePath);
    if (types.length === 0) {
        throw new Error(`No javadoc types found in ${sourcePath}`);
    }
    const slugByFile = new Map(types.map((type) => [type.file, type.slug]));
    const pages = [];
    const byPackage = new Map();
    for (const type of types) {
        const html = await fse.readFile(path.join(sourcePath, type.file), 'utf8');
        pages.push(renderPage(type, html, slugByFile));
        const siblings = byPackage.get(type.pkg) ?? [];
        siblings.push(type);
        byPackage.set(type.pkg, siblings);
    }
    const groups = [...byPackage.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([pkg, members]) => ({
        group: pkg,
        pages: members
            .sort((left, right) => left.name.localeCompare(right.name))
            .map((member) => member.slug),
    }));
    return { pages, groups };
}
async function discoverTypes(root) {
    const entries = (await typesFromSearchIndex(root)) ?? (await typesFromPackageDirs(root));
    const seen = new Set();
    const types = [];
    for (const entry of entries) {
        if (seen.has(entry.file))
            continue;
        seen.add(entry.file);
        if (await fse.pathExists(path.join(root, entry.file)))
            types.push(entry);
    }
    return types;
}
async function typesFromSearchIndex(root) {
    const indexPath = path.join(root, 'type-search-index.js');
    if (!(await fse.pathExists(indexPath)))
        return undefined;
    const raw = await fse.readFile(indexPath, 'utf8');
    const json = raw
        .slice(raw.indexOf('=') + 1)
        .trim()
        .replace(/;$/, '');
    let parsed;
    try {
        parsed = JSON.parse(json);
    }
    catch {
        return undefined;
    }
    if (!Array.isArray(parsed))
        return undefined;
    const types = [];
    for (const item of parsed) {
        const pkg = item.p;
        const name = item.l?.replace(/<.*$/, '');
        if (!pkg || !name || !TYPE_NAME_PATTERN.test(pkg) || !TYPE_NAME_PATTERN.test(name))
            continue;
        types.push(makeType(pkg, name));
    }
    return types.length > 0 ? types : undefined;
}
async function typesFromPackageDirs(root) {
    const packages = await readPackageList(root);
    const types = [];
    for (const pkg of packages) {
        if (!TYPE_NAME_PATTERN.test(pkg))
            continue;
        const dir = path.join(root, ...pkg.split('.'));
        if (!(await fse.pathExists(dir)))
            continue;
        for (const file of await fse.readdir(dir)) {
            if (!file.endsWith('.html'))
                continue;
            const name = file.slice(0, -'.html'.length);
            if (name.startsWith('package-') || !TYPE_NAME_PATTERN.test(name))
                continue;
            types.push(makeType(pkg, name));
        }
    }
    return types;
}
async function readPackageList(root) {
    for (const listFile of ['element-list', 'package-list']) {
        const listPath = path.join(root, listFile);
        if (!(await fse.pathExists(listPath)))
            continue;
        const raw = await fse.readFile(listPath, 'utf8');
        return raw
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0 && !line.startsWith('module:'));
    }
    throw new Error(`No element-list or package-list found in ${root}`);
}
function makeType(pkg, name) {
    return {
        pkg,
        name,
        file: `${pkg.split('.').join('/')}/${name}.html`,
        slug: `${pkg.replace(/\./g, '-')}/${name}`,
    };
}
function renderPage(type, html, slugByFile) {
    const hast = htmlToHast(html);
    removeHastComments(hast);
    const main = findElement(hast, (el) => el.tagName === 'main') ??
        findElement(hast, (el) => el.properties?.id === 'main-content') ??
        findElement(hast, (el) => hasClass(el, 'contentContainer')) ??
        hast;
    const declaration = findElement(main, (el) => hasClass(el, 'class-description')) ??
        findElement(main, (el) => hasClass(el, 'description'));
    const details = findElement(main, (el) => hasClass(el, 'details'));
    const description = extractDescription(declaration);
    const tag = extractTag(main);
    const kept = [declaration, details].filter((node) => node !== undefined);
    const anchors = collectDetailAnchors(kept);
    const resolveHref = makeHrefResolver(type, slugByFile, anchors);
    const signatures = [];
    for (const node of kept) {
        pruneChrome(node);
        unwrapLists(node);
        resolveLinks(node, resolveHref);
        signatures.push(...codifySignatures(node));
    }
    const root = { type: 'root', children: kept };
    let content = hastToMdx(root);
    for (const signature of signatures) {
        content = content
            .split(`\`\`\`\n${signature}\n\`\`\``)
            .join(`\`\`\`java\n${signature}\n\`\`\``);
    }
    return { slug: type.slug, title: type.name, description, tag, content };
}
function makeHrefResolver(type, slugByFile, anchors) {
    const pkgDir = type.pkg.split('.').join('/');
    return (href) => {
        if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//'))
            return href;
        if (href.startsWith('#')) {
            const name = decodeFragment(href.slice(1)).split('(')[0] ?? '';
            return anchors.has(name) ? `#${name.toLowerCase()}` : undefined;
        }
        const target = href.split('#')[0] ?? '';
        if (!target.endsWith('.html'))
            return undefined;
        const resolved = path.posix.normalize(path.posix.join(pkgDir, target));
        const slug = slugByFile.get(resolved);
        return slug === undefined ? undefined : `/${slug}`;
    };
}
function decodeFragment(fragment) {
    try {
        return decodeURIComponent(fragment);
    }
    catch {
        return fragment;
    }
}
function collectDetailAnchors(nodes) {
    const anchors = new Set();
    for (const node of nodes) {
        visitElements(node, (el) => {
            if (!hasClass(el, 'detail'))
                return;
            const id = el.properties.id;
            if (typeof id === 'string')
                anchors.add(id.split('(')[0] ?? id);
        });
    }
    return anchors;
}
function resolveLinks(node, resolveHref) {
    node.children = node.children.flatMap((child) => {
        if (child.type !== 'element')
            return [child];
        resolveLinks(child, resolveHref);
        if (child.tagName !== 'a' || typeof child.properties.href !== 'string')
            return [child];
        const resolved = resolveHref(child.properties.href);
        if (resolved === undefined)
            return child.children;
        child.properties.href = resolved;
        return [child];
    });
}
function pruneChrome(node) {
    node.children = node.children.filter((child) => {
        if (child.type !== 'element')
            return true;
        if (child.tagName === 'hr')
            return false;
        return !elementClasses(child).some((name) => DROPPED_CLASSES.has(name));
    });
    for (const child of node.children) {
        if (child.type !== 'element')
            continue;
        if (child.tagName === 'a')
            delete child.properties.title;
        pruneChrome(child);
    }
}
const UNWRAPPED_LISTS = new Set(['details-list', 'member-list', 'detail-list']);
function unwrapLists(node) {
    node.children = node.children.flatMap((child) => {
        if (child.type !== 'element' ||
            child.tagName !== 'ul' ||
            !elementClasses(child).some((name) => UNWRAPPED_LISTS.has(name))) {
            return [child];
        }
        return child.children.flatMap((item) => item.type === 'element' && item.tagName === 'li' ? item.children : []);
    });
    for (const child of node.children) {
        if (child.type === 'element')
            unwrapLists(child);
    }
}
function codifySignatures(node) {
    const signatures = [];
    visitElements(node, (el) => {
        if (!hasClass(el, 'member-signature') && !hasClass(el, 'type-signature'))
            return;
        const signature = textOf(el)
            .replace(/\u00a0/g, ' ')
            .trim();
        signatures.push(signature);
        el.tagName = 'pre';
        el.properties = {};
        el.children = [
            {
                type: 'element',
                tagName: 'code',
                properties: {},
                children: [{ type: 'text', value: signature }],
            },
        ];
    });
    return signatures;
}
function extractTag(scope) {
    const heading = findElement(scope, (el) => el.tagName === 'h1');
    const title = heading ? textOf(heading).trim() : '';
    if (title.startsWith('Annotation'))
        return 'ANNOTATION';
    if (title.startsWith('Enum'))
        return 'ENUM';
    if (title.startsWith('Interface'))
        return 'INTERFACE';
    return 'CLASS';
}
function extractDescription(declaration) {
    if (!declaration)
        return undefined;
    const block = findElement(declaration, (el) => hasClass(el, 'block'));
    if (!block)
        return undefined;
    const text = textOf(block).replace(/\s+/g, ' ').trim();
    if (!text)
        return undefined;
    const sentence = text.split(/(?<=\.)\s/)[0] ?? text;
    return sentence.length > 160 ? `${sentence.slice(0, 159)}…` : sentence;
}
function elementClasses(el) {
    const className = el.properties?.className;
    return Array.isArray(className) ? className.map(String) : [];
}
function hasClass(el, name) {
    return elementClasses(el).includes(name);
}
function findElement(scope, predicate) {
    for (const child of scope.children) {
        if (child.type !== 'element')
            continue;
        if (predicate(child))
            return child;
        const found = findElement(child, predicate);
        if (found)
            return found;
    }
    return undefined;
}
function visitElements(scope, visitor) {
    for (const child of scope.children) {
        if (child.type !== 'element')
            continue;
        visitor(child);
        visitElements(child, visitor);
    }
}
function textOf(node) {
    let text = '';
    for (const child of node.children) {
        if (child.type === 'text')
            text += child.value;
        else if (child.type === 'element' && child.tagName !== 'script' && child.tagName !== 'style') {
            text += textOf(child);
        }
    }
    return text;
}
//# sourceMappingURL=javadoc.js.map