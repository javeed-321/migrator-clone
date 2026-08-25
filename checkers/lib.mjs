/**
 * The plumbing both checkers share: find files, parse them, collect findings,
 * print them. No rules live here — a rule belongs to whichever contract it
 * enforces, and putting them in one place is how the two checkers would quietly
 * become one.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMdx);

/* ------------------------------------------------------------------ *
 * Files
 * ------------------------------------------------------------------ */

/** Every `.mdx` under the given paths, recursively. A file path is taken as-is. */
export function collectFiles(paths) {
  const files = [];
  const walk = (path) => {
    const stats = statSync(path);
    if (stats.isFile()) {
      if (path.endsWith('.mdx') || path.endsWith('.md')) files.push(path);
      return;
    }
    for (const entry of readdirSync(path).sort()) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      walk(join(path, entry));
    }
  };
  for (const path of paths) walk(resolve(path));
  return files;
}

/**
 * Frontmatter off the front, with the number of lines it occupied.
 *
 * `remark-frontmatter` is not a dependency of this repo, and stripping by hand
 * means the parser cannot mistake a YAML value for JSX. The line count comes
 * back so every position the parser reports can be shifted to match the file.
 */
export function splitFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/.exec(text);
  if (!match) return { yaml: '', body: text, offset: 0 };
  return { yaml: match[1], body: text.slice(match[0].length), offset: match[0].split('\n').length - 1 };
}

/** MDX text -> tree, or the parser's own error. */
export function parseMdx(body) {
  try {
    return { tree: processor.parse(body) };
  } catch (error) {
    return { error };
  }
}

/** The parse error, with its position, in one line. */
export function describeParseError(error, offset = 0) {
  const message = error?.reason ?? error?.message ?? String(error);
  const line = error?.line ?? error?.place?.start?.line ?? error?.position?.start?.line;
  const column = error?.column ?? error?.place?.start?.column ?? error?.position?.start?.column;
  return { message, line: line === undefined ? undefined : line + offset, column };
}

/* ------------------------------------------------------------------ *
 * Tree
 * ------------------------------------------------------------------ */

/**
 * Depth-first over every node, with its parent.
 *
 * A visitor returning `false` prunes that subtree. Both checkers need it for the
 * same reason: once a node is going to be swallowed whole — flattened into one
 * htmlBlock, quoted into one fence — every descendant is part of that single
 * fact, and reporting each of them turns one decision into forty rows.
 */
export function walk(node, visit, parent = null) {
  if (visit(node, parent) === false) return;
  if (Array.isArray(node.children)) for (const child of node.children) walk(child, visit, node);
}

export const isJsx = (node) =>
  node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';

export const lineOf = (node, offset = 0) =>
  node?.position?.start?.line === undefined ? undefined : node.position.start.line + offset;

/** `{ name: value }` for plain attributes; expression values keep their source. */
export function attrsOf(node) {
  const out = [];
  for (const attribute of node.attributes ?? []) {
    if (attribute.type !== 'mdxJsxAttribute') {
      out.push({ name: null, value: null, expression: attribute.value?.value ?? '', spread: true });
      continue;
    }
    const value = attribute.value;
    if (value && typeof value === 'object') {
      out.push({ name: attribute.name, value: null, expression: value.value ?? '' });
    } else {
      out.push({ name: attribute.name, value: value ?? '', expression: null });
    }
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Findings
 * ------------------------------------------------------------------ */

/**
 * Three levels, because the two failures they separate are genuinely different
 * kinds of problem and get worked at different times.
 *
 *   blocker — the page does not render. Fix before publishing.
 *   degrade — it renders, and loses content the first time it is edited.
 *   flag    — it renders and survives editing, but not the way you meant.
 */
export const LEVELS = ['blocker', 'degrade', 'flag'];

export function makeReporter(file) {
  const findings = [];
  const report = (level, rule, line, message) => findings.push({ file, level, rule, line, message });
  return {
    findings,
    blocker: (rule, line, message) => report('blocker', rule, line, message),
    degrade: (rule, line, message) => report('degrade', rule, line, message),
    flag: (rule, line, message) => report('flag', rule, line, message),
  };
}

/* ------------------------------------------------------------------ *
 * Output
 * ------------------------------------------------------------------ */

const colour = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code, text) => (colour ? `[${code}m${text}[0m` : text);
const LEVEL_STYLE = { blocker: (t) => paint(31, t), degrade: (t) => paint(33, t), flag: (t) => paint(36, t) };

export function printReport({ title, findings, files, root, only }) {
  const kept = only ? findings.filter((f) => LEVELS.indexOf(f.level) <= LEVELS.indexOf(only)) : findings;
  const byFile = new Map();
  for (const finding of kept) {
    if (!byFile.has(finding.file)) byFile.set(finding.file, []);
    byFile.get(finding.file).push(finding);
  }

  console.log(`\n${paint(1, title)}  ${files.length} file${files.length === 1 ? '' : 's'}\n`);

  for (const [file, list] of byFile) {
    console.log(paint(4, relative(root, file)));
    list.sort((a, b) => LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level) || (a.line ?? 0) - (b.line ?? 0));
    for (const finding of list) {
      const level = LEVEL_STYLE[finding.level](finding.level.toUpperCase().padEnd(7));
      const where = finding.line === undefined ? '   -' : String(finding.line).padStart(4);
      console.log(`  ${level} ${paint(90, where)}  ${finding.message}  ${paint(90, `[${finding.rule}]`)}`);
    }
    console.log('');
  }

  const counts = Object.fromEntries(LEVELS.map((level) => [level, kept.filter((f) => f.level === level).length]));
  const clean = files.length - byFile.size;
  console.log(
    `${LEVEL_STYLE.blocker(`${counts.blocker} blocker`)}  ` +
      `${LEVEL_STYLE.degrade(`${counts.degrade} degrade`)}  ` +
      `${LEVEL_STYLE.flag(`${counts.flag} flag`)}  ` +
      paint(90, `· ${clean}/${files.length} files clean\n`)
  );

  return counts;
}

/* ------------------------------------------------------------------ *
 * CLI
 * ------------------------------------------------------------------ */

/** Flags that take a value, so `--only blocker` works as well as `--only=blocker`. */
const VALUE_FLAGS = new Set(['only']);

export function parseArgs(argv) {
  const paths = [];
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      paths.push(arg);
      continue;
    }
    const [key, value] = arg.slice(2).split('=');
    if (value !== undefined) {
      flags[key] = value;
    } else if (VALUE_FLAGS.has(key) && argv[i + 1] && !argv[i + 1].startsWith('--')) {
      flags[key] = argv[i + 1];
      i += 1;
    } else {
      flags[key] = true;
    }
  }
  return { paths, flags };
}

/**
 * Read, check, print, exit. Both checkers are the same programme with a
 * different `check` — so the programme is written once and the rules are the
 * argument.
 */
export function runChecker({ title, check, argv, usage }) {
  const { paths, flags } = parseArgs(argv);
  if (paths.length === 0) {
    console.error(usage);
    process.exit(2);
  }

  const files = collectFiles(paths);
  const findings = [];
  for (const file of files) {
    findings.push(...check(file, readFileSync(file, 'utf8')));
  }

  if (flags.json) {
    console.log(JSON.stringify({ title, files: files.length, findings }, null, 2));
  } else {
    printReport({ title, findings, files, root: process.cwd(), only: flags.only });
  }

  const blockers = findings.filter((f) => f.level === 'blocker').length;
  const degrades = findings.filter((f) => f.level === 'degrade').length;
  process.exit(blockers > 0 || (flags.strict && degrades > 0) ? 1 : 0);
}
