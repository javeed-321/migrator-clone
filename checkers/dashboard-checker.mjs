#!/usr/bin/env node
/**
 * Checker 2 — will the page survive being OPENED IN THE DASHBOARD?
 *
 * A page can render perfectly on the site and still be quietly destroyed the
 * first time someone edits it, because the editor is a lossy round-trip:
 *
 *   mdx-utils.ts        MDX -> mdast -> ProseMirror JSON
 *   *Node.ts            ProseMirror enforces a content model; misfits are dropped
 *   proseMirrorToMdx    ProseMirror -> mdast -> MDX, restringified from scratch
 *
 * Nothing here throws. `mdxToProseMirror` logs a console.warn nobody reads and
 * carries on, ProseMirror discards children that do not fit its schema without
 * comment, and the next save writes the result back over your file. That is why
 * most of what this finds is `degrade` rather than `blocker`: the damage is not
 * visible until after it has happened.
 *
 *   node checkers/dashboard-checker.mjs output/projects/docs-x/pages/
 *   node checkers/dashboard-checker.mjs page.mdx --strict   # degrade also exits 1
 *
 * Exits 1 on any blocker (or on any degrade with --strict).
 */

import { ATTRS, CONTENT_MODEL, EDITOR_COMPONENTS, EDITOR_INLINE } from './contract.mjs';
import {
  attrsOf, describeParseError, isJsx, lineOf, makeReporter, parseMdx, runChecker, splitFrontmatter, walk,
} from './lib.mjs';

function check(file, raw) {
  const { yaml, body, offset } = splitFrontmatter(raw);
  const report = makeReporter(file);

  // The dashboard's own sync gate: unparseable MDX is refused entry to the
  // shared document, so the page cannot be edited at all until it parses.
  const { tree, error } = parseMdx(body);
  if (error) {
    const { message, line } = describeParseError(error, offset);
    report.blocker('sync-gate', line, `validateMdxForSync would reject this — ${message}`);
    return report.findings;
  }

  if (!/^\s*title\s*:/m.test(yaml)) {
    report.blocker('frontmatter', 1, 'every MDX page must have `title` in frontmatter');
  }

  checkComponents(tree, report, offset);
  checkContentModel(tree, report, offset);
  checkStringifyChurn(tree, body, report, offset);
  return report.findings;
}

/* ------------------------------------------------------------------ *
 * Does the editor know this component?
 * ------------------------------------------------------------------ */

function checkComponents(tree, report, offset) {
  walk(tree, (node) => {
    if (!isJsx(node) || node.name === null) return;
    const { name } = node;
    const line = lineOf(node, offset);

    if (node.type === 'mdxJsxFlowElement' && !EDITOR_COMPONENTS.has(name)) {
      const inside = (node.children ?? []).length > 0 ? ', and everything inside it,' : '';
      const why = /^[A-Z]/.test(name)
        ? `<${name}> has no case in mdx-utils`
        : `raw HTML <${name}> has no node type in the editor`;
      report.degrade(
        'not-in-editor',
        line,
        `${why} — it${inside} is flattened into one frozen htmlBlock, and stops being editable content on first save`
      );
      // Its descendants are inside that one block; they are not separate findings.
      return false;
    }

    if (node.type === 'mdxJsxTextElement' && !EDITOR_INLINE.has(name)) {
      report.degrade(
        'inline-unwrapped',
        line,
        `inline <${name}> is not a mark the editor knows — the tag is dropped and only its text is kept`
      );
      return;
    }

    // Attributes: kebab on disk, camel in the editor, kebab again on save.
    const schema = ATTRS[name];
    const seen = new Set();
    for (const attribute of attrsOf(node)) {
      if (attribute.spread) continue;
      seen.add(attribute.name);

      if (/[A-Z]/.test(attribute.name)) {
        const kebab = attribute.name.replace(/([A-Z])/g, '-$1').toLowerCase();
        report.flag(
          'attribute-case',
          line,
          `<${name} ${attribute.name}=…> is rewritten to \`${kebab}\` the first time this page is saved — write it kebab-case now and the diff stays clean`
        );
      }

      const allowed = schema?.enums?.[attribute.name];
      if (allowed && attribute.value !== null && !allowed.includes(attribute.value)) {
        report.flag('enum', line, `<${name} ${attribute.name}="${attribute.value}"> is outside ${allowed.join(', ')}`);
      }
    }

    for (const required of schema?.required ?? []) {
      if (!seen.has(required)) {
        report.flag('missing-attribute', line, `<${name}> has no \`${required}\` — the editor substitutes its own default`);
      }
    }
  });
}

/* ------------------------------------------------------------------ *
 * Will ProseMirror keep the children?
 * ------------------------------------------------------------------ */

function checkContentModel(tree, report, offset) {
  walk(tree, (node) => {
    if (node.type !== 'mdxJsxFlowElement' || node.name === null) return;
    const model = CONTENT_MODEL[node.name];
    if (!model) return;
    const line = lineOf(node, offset);
    const children = node.children ?? [];

    if (model.kind === 'none') {
      if (children.length > 0) {
        report.degrade('atom-children', line, `<${node.name}> is an atom in the editor schema — anything written inside it is discarded`);
      }
      return;
    }

    if (model.kind === 'block') return;

    if (children.length === 0) {
      report.flag(
        'empty-container',
        line,
        `<${node.name}> is empty — to satisfy its schema the editor inserts ${model.placeholder ?? 'placeholder content'}, and that invented text is what the next save writes`
      );
      return;
    }

    for (const child of children) {
      if (model.kind === 'code') {
        if (child.type === 'code') continue;
        report.degrade(
          'content-model',
          lineOf(child, offset) ?? line,
          `<${node.name}> holds only code fences (content: 'codeBlock*') — this ${describe(child)} is dropped when the page is opened`
        );
        continue;
      }

      // kind === 'jsx'
      if (child.type === 'mdxJsxFlowElement' && model.allow.includes(child.name)) continue;

      // A component that shares a line with prose is parsed as inline JSX inside
      // a paragraph. It renders correctly on the site and is dropped here, which
      // is the hardest version of this bug to see — so it is worth saying which
      // component got swallowed rather than only "a paragraph was dropped".
      const wrapped = child.type === 'paragraph'
        ? (child.children ?? []).filter(
            (grandchild) => grandchild.type === 'mdxJsxTextElement' && model.allow.includes(grandchild.name)
          )
        : [];
      if (wrapped.length > 0) {
        report.degrade(
          'inline-wrapped-child',
          lineOf(child, offset) ?? line,
          `<${wrapped[0].name}> parsed as inline JSX inside a paragraph — give it a blank line above and below, or the editor drops it from <${node.name}> along with the paragraph`
        );
        continue;
      }

      report.degrade(
        'content-model',
        lineOf(child, offset) ?? line,
        `<${node.name}> accepts only ${model.allow.map((n) => `<${n}>`).join(' or ')} — this ${describe(child)} is dropped when the page is opened`
      );
    }
  });
}

function describe(node) {
  if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') return `<${node.name}>`;
  if (node.type === 'paragraph') return 'paragraph';
  if (node.type === 'heading') return `h${node.depth}`;
  if (node.type === 'list') return 'list';
  if (node.type === 'code') return 'code fence';
  return node.type;
}

/* ------------------------------------------------------------------ *
 * What the round-trip rewrites even when nothing is lost
 * ------------------------------------------------------------------ */

/**
 * `proseMirrorToMdx` does not patch the file — it restringifies the whole
 * document with fixed options (bullet '-', emphasis '_', rule '-', fences,
 * listItemIndent 'one'). Anything written in a different style comes back
 * rewritten, so the first save after a migration produces a diff touching lines
 * nobody edited. Cheap to avoid; expensive to review later.
 */
function checkStringifyChurn(tree, body, report, offset) {
  const seen = new Set();
  const once = (rule, line, message) => {
    const key = `${rule}:${line}`;
    if (seen.has(key)) return;
    seen.add(key);
    report.flag(rule, line, message);
  };

  walk(tree, (node) => {
    const start = node.position?.start?.offset;
    if (start === undefined) return;
    const char = body[start];

    if (node.type === 'listItem' && (char === '*' || char === '+')) {
      once('bullet-style', lineOf(node, offset), `\`${char}\` bullets are restringified as \`-\``);
    }
    if (node.type === 'emphasis' && char === '*') {
      once('emphasis-style', lineOf(node, offset), '*italic* is restringified as _italic_');
    }
    if (node.type === 'thematicBreak') {
      const line = body.slice(start, body.indexOf('\n', start)).trim();
      if (line !== '---') once('rule-style', lineOf(node, offset), `\`${line}\` is restringified as \`---\``);
    }
    if (node.type === 'heading' && char !== '#') {
      once('heading-style', lineOf(node, offset), 'a setext heading is restringified as ATX (`##`)');
    }
  });
}

runChecker({
  title: 'dashboard-checker — will this survive being edited?',
  check,
  argv: process.argv.slice(2),
  usage: 'Usage: node checkers/dashboard-checker.mjs <file-or-dir>... [--json] [--strict] [--only blocker|degrade|flag]',
});
