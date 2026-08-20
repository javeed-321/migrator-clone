import fse from 'fs-extra';
import path from 'node:path';
import { markdownToMdx } from '../convert.js';
const KIND = {
    project: 1,
    module: 2,
    namespace: 4,
    enum: 8,
    enumMember: 16,
    variable: 32,
    function: 64,
    class: 128,
    interface: 256,
    constructor: 512,
    property: 1024,
    method: 2048,
    callSignature: 4096,
    indexSignature: 8192,
    constructorSignature: 16384,
    parameter: 32768,
    typeLiteral: 65536,
    accessor: 262144,
    getSignature: 524288,
    setSignature: 1048576,
    typeAlias: 2097152,
};
const SECTIONS = [
    { kind: KIND.class, group: 'Classes', dir: 'classes', tag: 'CLASS' },
    { kind: KIND.interface, group: 'Interfaces', dir: 'interfaces', tag: 'INTERFACE' },
    { kind: KIND.enum, group: 'Enumerations', dir: 'enums', tag: 'ENUM' },
    { kind: KIND.function, group: 'Functions', dir: 'functions', tag: 'FUNCTION' },
    { kind: KIND.typeAlias, group: 'Type Aliases', dir: 'types', tag: 'TYPE' },
    { kind: KIND.variable, group: 'Variables', dir: 'variables', tag: 'VARIABLE' },
];
export async function convertTypedoc(sourcePath) {
    const project = (await fse.readJson(sourcePath));
    const modules = project.children?.some((child) => child.kind === KIND.module) === true
        ? (project.children?.filter((child) => child.kind === KIND.module) ?? [])
        : [project];
    const multiModule = modules.length > 1;
    const slugById = new Map();
    for (const module of modules) {
        const prefix = multiModule ? slugify(module.name) : '';
        for (const { node, namespacePath } of collectDeclarations(module)) {
            const section = SECTIONS.find((entry) => entry.kind === node.kind);
            if (!section)
                continue;
            slugById.set(node.id, path.posix.join(prefix, ...namespacePath.map(slugify), section.dir, slugify(node.name)));
        }
    }
    const renderer = new TypedocRenderer(slugById);
    const pages = [];
    const groups = [];
    for (const module of modules) {
        const prefix = multiModule ? `${module.name} ` : '';
        const declarations = collectDeclarations(module);
        for (const section of SECTIONS) {
            const entries = declarations
                .filter(({ node }) => node.kind === section.kind && !node.flags?.isPrivate)
                .sort((left, right) => qualifiedName(left).localeCompare(qualifiedName(right)));
            if (entries.length === 0)
                continue;
            const sectionPages = entries.map((entry) => renderer.renderPage(entry.node, section, qualifiedName(entry)));
            pages.push(...sectionPages);
            groups.push({ group: `${prefix}${section.group}`, pages: sectionPages.map((p) => p.slug) });
        }
    }
    return { pages, groups };
}
function qualifiedName({ node, namespacePath }) {
    return [...namespacePath, node.name].join('.');
}
function collectDeclarations(container, namespacePath = []) {
    const declarations = [];
    for (const child of container.children ?? []) {
        if (child.kind === KIND.namespace) {
            declarations.push(...collectDeclarations(child, [...namespacePath, child.name]));
        }
        else {
            declarations.push({ node: child, namespacePath });
        }
    }
    return declarations;
}
function slugify(name) {
    return name.replace(/[^a-zA-Z0-9-_.]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
}
class TypedocRenderer {
    constructor(slugById) {
        this.slugById = slugById;
    }
    renderPage(node, section, title) {
        const slug = this.slugById.get(node.id) ?? path.posix.join(section.dir, slugify(node.name));
        const lines = [];
        const summary = this.comment(node.comment);
        if (summary)
            lines.push(summary);
        switch (node.kind) {
            case KIND.class:
            case KIND.interface:
                lines.push(...this.renderClassLike(node));
                break;
            case KIND.enum:
                lines.push(...this.renderEnum(node));
                break;
            case KIND.function:
                lines.push(...this.renderSignatures(node, 2));
                break;
            case KIND.typeAlias:
            case KIND.variable:
                lines.push(this.codeBlock(`${node.kind === KIND.variable ? 'const' : 'type'} ${node.name}${node.kind === KIND.typeAlias ? ' =' : ':'} ${this.type(node.type)}`));
                break;
        }
        return {
            slug,
            title: title ?? node.name,
            description: this.firstSentence(node.comment),
            tag: section.tag,
            content: lines.filter(Boolean).join('\n\n'),
        };
    }
    renderClassLike(node) {
        const lines = [];
        const heritage = [
            ...(node.extendedTypes?.length
                ? [`extends ${node.extendedTypes.map((t) => this.type(t)).join(', ')}`]
                : []),
            ...(node.implementedTypes?.length
                ? [`implements ${node.implementedTypes.map((t) => this.type(t)).join(', ')}`]
                : []),
        ];
        if (heritage.length) {
            lines.push(this.codeBlock(`${node.kind === KIND.class ? 'class' : 'interface'} ${node.name} ${heritage.join(' ')}`));
        }
        const members = (node.children ?? []).filter((child) => !child.flags?.isPrivate);
        const constructors = members.filter((child) => child.kind === KIND.constructor);
        const properties = members
            .filter((child) => child.kind === KIND.property || child.kind === KIND.accessor)
            .sort((left, right) => left.name.localeCompare(right.name));
        const methods = members
            .filter((child) => child.kind === KIND.method)
            .sort((left, right) => left.name.localeCompare(right.name));
        for (const ctor of constructors) {
            lines.push('## Constructor');
            lines.push(...this.renderSignatures(ctor, 3));
        }
        if (properties.length) {
            lines.push('## Properties');
            for (const property of properties) {
                const type = property.kind === KIND.accessor ? property.getSignature?.type : property.type;
                const optional = property.flags?.isOptional === true;
                lines.push(this.responseField(property.name, this.type(type), optional, this.comment(property.comment ?? property.getSignature?.comment)));
            }
        }
        if (methods.length) {
            lines.push('## Methods');
            for (const method of methods) {
                lines.push(`### ${method.name}()`);
                lines.push(...this.renderSignatures(method, 4));
            }
        }
        return lines;
    }
    renderEnum(node) {
        const lines = ['## Members'];
        for (const member of node.children ?? []) {
            lines.push(this.responseField(member.name, member.type?.type === 'literal' ? JSON.stringify(member.type.value) : '', false, this.comment(member.comment)));
        }
        return lines;
    }
    renderSignatures(node, depth) {
        const lines = [];
        for (const signature of node.signatures ?? []) {
            const params = (signature.parameters ?? [])
                .map((param) => `${param.name}${param.flags?.isOptional || param.defaultValue !== undefined ? '?' : ''}: ${this.type(param.type)}`)
                .join(', ');
            lines.push(this.codeBlock(`${signature.name}(${params}): ${this.type(signature.type)}`));
            const comment = this.comment(signature.comment);
            if (comment)
                lines.push(comment);
            if (signature.parameters?.length) {
                lines.push(`${'#'.repeat(depth)} Parameters`);
                for (const param of signature.parameters) {
                    lines.push(this.responseField(param.name, this.type(param.type), param.flags?.isOptional === true || param.defaultValue !== undefined, this.comment(param.comment)));
                }
            }
            const returns = signature.comment?.blockTags?.find((tag) => tag.tag === '@returns');
            const returnType = this.type(signature.type);
            if (returnType && returnType !== 'void') {
                lines.push(`${'#'.repeat(depth)} Returns`);
                lines.push(`\`${escapeInlineCode(returnType)}\`${returns ? `\n\n${this.parts(returns.content)}` : ''}`);
            }
        }
        return lines;
    }
    responseField(name, type, optional, body) {
        const typeAttr = type ? ` type=${this.jsxString(truncate(type, 80))}` : '';
        const requiredAttr = optional ? '' : ' required';
        return `<ResponseField name=${this.jsxString(name)}${typeAttr}${requiredAttr}>\n${indent(body || '')}\n</ResponseField>`;
    }
    jsxString(value) {
        return `{${JSON.stringify(value)}}`;
    }
    codeBlock(code) {
        return `\`\`\`typescript\n${code}\n\`\`\``;
    }
    comment(comment) {
        if (!comment?.summary?.length)
            return '';
        const markdown = this.parts(comment.summary);
        const deprecated = comment.blockTags?.find((tag) => tag.tag === '@deprecated');
        const example = comment.blockTags?.find((tag) => tag.tag === '@example');
        const chunks = [markdown];
        if (deprecated)
            chunks.push(`<Warning>Deprecated${deprecated.content.length ? `: ${this.parts(deprecated.content)}` : ''}</Warning>`);
        if (example)
            chunks.push(this.parts(example.content));
        return chunks.filter(Boolean).join('\n\n');
    }
    parts(parts) {
        const markdown = parts
            .map((part) => {
            if (part.kind === 'inline-tag') {
                if (typeof part.target === 'number' && this.slugById.has(part.target)) {
                    return `[${part.text}](/${this.slugById.get(part.target)})`;
                }
                if (typeof part.target === 'string')
                    return `[${part.text}](${part.target})`;
                return `\`${part.text}\``;
            }
            return part.text;
        })
            .join('');
        return markdownToMdx(markdown);
    }
    firstSentence(comment) {
        if (!comment?.summary?.length)
            return undefined;
        const text = comment.summary
            .filter((part) => part.kind === 'text')
            .map((part) => part.text)
            .join('')
            .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
            .replace(/[`*_]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        if (!text)
            return undefined;
        const sentence = text.split(/(?<=\.)\s/)[0] ?? text;
        return truncate(sentence, 160);
    }
    type(type) {
        if (!type)
            return 'void';
        switch (type.type) {
            case 'intrinsic':
                return type.name ?? 'unknown';
            case 'reference': {
                const args = type.typeArguments?.length
                    ? `<${type.typeArguments.map((arg) => this.type(arg)).join(', ')}>`
                    : '';
                return `${type.name ?? 'unknown'}${args}`;
            }
            case 'union':
                return (type.types ?? []).map((entry) => this.type(entry)).join(' | ');
            case 'intersection':
                return (type.types ?? []).map((entry) => this.type(entry)).join(' & ');
            case 'array':
                return `${this.type(type.elementType)}[]`;
            case 'literal':
                return JSON.stringify(type.value);
            case 'tuple':
                return `[${(type.elements ?? []).map((entry) => this.type(entry)).join(', ')}]`;
            case 'reflection':
                return this.reflection(type.declaration);
            case 'typeOperator':
                return `${type.operator} ${this.type(type.target)}`;
            case 'indexedAccess':
                return `${this.type(type.objectType)}[${this.type(type.indexType)}]`;
            case 'conditional':
                return `${this.type(type.checkType)} extends ${this.type(type.extendsType)} ? ${this.type(type.trueType)} : ${this.type(type.falseType)}`;
            case 'query':
                return `typeof ${this.type(type.target)}`;
            case 'templateLiteral':
                return 'string';
            default:
                return type.name ?? 'unknown';
        }
    }
    reflection(declaration) {
        if (!declaration)
            return 'object';
        if (declaration.signatures?.length) {
            const signature = declaration.signatures[0];
            const params = (signature.parameters ?? [])
                .map((param) => `${param.name}: ${this.type(param.type)}`)
                .join(', ');
            return `(${params}) => ${this.type(signature.type)}`;
        }
        if (declaration.children?.length) {
            return `{ ${declaration.children.map((child) => `${child.name}: ${this.type(child.type)}`).join('; ')} }`;
        }
        return 'object';
    }
}
function indent(text) {
    return text
        .split('\n')
        .map((line) => (line ? `  ${line}` : line))
        .join('\n');
}
function truncate(text, max) {
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
function escapeInlineCode(text) {
    return text.replace(/`/g, '');
}
//# sourceMappingURL=typedoc.js.map