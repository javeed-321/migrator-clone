import fse from 'fs-extra';
import os from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { convertJavadoc } from '../src/sdk/converters/javadoc.js';

const TRAVERSAL_INDEX = 'typeSearchIndex = [{"p":"com/../../../etc","l":"Passwd"}];';
import type { SdkReference } from '../src/sdk/types.js';

const page = (title: string, body: string) => `<!DOCTYPE HTML>
<html lang="en">
<head><title>${title} (fake API)</title></head>
<body class="class-declaration-page">
<main role="main">
${body}
</main>
</body>
</html>`;

const greeterHtml = page(
  'Greeter',
  `<div class="header">
<h1 title="Class Greeter" class="title">Class Greeter</h1>
</div>
<section class="class-description" id="class-description">
<hr>
<div class="type-signature"><span class="modifiers">public class </span><span class="element-name type-name-label">Greeter</span></div>
<div class="block">Greets people politely. Supports many languages.</div>
</section>
<section class="summary">
<ul class="summary-list">
<li>
<section class="method-summary" id="method-summary">
<h2>Method Summary</h2>
<div class="summary-table three-column-summary">
<div class="col-first even-row-color"><code>String</code></div>
<div class="col-second even-row-color"><code><a href="#greet(java.lang.String)" class="member-name-link">greet</a>(String name)</code></div>
<div class="col-last even-row-color"><div class="block">SUMMARY_ROW_MARKER greet a person.</div></div>
</div>
<div class="inherited-list">
<h3>Methods inherited from class java.lang.Object</h3>
<code>equals, hashCode, toString</code>
</div>
</section>
</li>
</ul>
</section>
<section class="details">
<ul class="details-list">
<li>
<section class="method-details" id="method-detail">
<h2>Method Details</h2>
<ul class="member-list">
<li>
<section class="detail" id="greet(java.lang.String)">
<h3>greet</h3>
<div class="member-signature"><span class="modifiers">public</span>&nbsp;<span class="return-type">String</span>&nbsp;<span class="element-name">greet</span><span class="parameters">(String&nbsp;name)</span></div>
<div class="block">Builds a greeting for the given <a href="Person.html" title="interface in com.example">Person</a> name.</div>
<dl class="notes">
<dt>Parameters:</dt>
<dd><code>name</code> - who to greet.</dd>
</dl>
</section>
</li>
</ul>
</section>
</li>
</ul>
</section>`
);

const personHtml = page(
  'Person',
  `<div class="header">
<h1 title="Interface Person" class="title">Interface Person</h1>
</div>
<section class="class-description" id="class-description">
<hr>
<div class="type-signature"><span class="modifiers">public interface </span><span class="element-name type-name-label">Person</span></div>
<div class="block">A person that can be greeted.</div>
</section>`
);

let dir: string;
let ref: SdkReference;

beforeAll(async () => {
  dir = await fse.mkdtemp(path.join(os.tmpdir(), 'javadoc-test-'));
  await fse.writeFile(path.join(dir, 'element-list'), 'com.example\n');
  const pkgDir = path.join(dir, 'com', 'example');
  await fse.mkdirp(pkgDir);
  await fse.writeFile(path.join(pkgDir, 'Greeter.html'), greeterHtml);
  await fse.writeFile(path.join(pkgDir, 'Person.html'), personHtml);
  await fse.writeFile(
    path.join(pkgDir, 'package-summary.html'),
    page('com.example', '<h1>Package com.example</h1>')
  );
  ref = await convertJavadoc(dir);
});

afterAll(async () => {
  await fse.remove(dir);
});

describe('convertJavadoc', () => {
  it('emits one page per type with package-based slugs', () => {
    expect(ref.pages.map((p) => p.slug).sort()).toEqual([
      'com-example/Greeter',
      'com-example/Person',
    ]);
  });

  it('groups types by package', () => {
    expect(ref.groups).toEqual([
      { group: 'com.example', pages: ['com-example/Greeter', 'com-example/Person'] },
    ]);
  });

  it('extracts title, tag, and first-sentence description', () => {
    const greeter = ref.pages.find((p) => p.slug === 'com-example/Greeter');
    expect(greeter?.title).toBe('Greeter');
    expect(greeter?.tag).toBe('CLASS');
    expect(greeter?.description).toBe('Greets people politely.');
    const person = ref.pages.find((p) => p.slug === 'com-example/Person');
    expect(person?.tag).toBe('INTERFACE');
  });

  it('keeps method detail sections and rewrites type links', () => {
    const content = ref.pages.find((p) => p.slug === 'com-example/Greeter')?.content ?? '';
    expect(content).toContain('### greet');
    expect(content).toContain('public String greet(String name)');
    expect(content).toContain('`name` - who to greet.');
    expect(content).toContain('[Person](/com-example/Person)');
  });

  it('drops summary tables and inherited-method boilerplate', () => {
    const content = ref.pages.find((p) => p.slug === 'com-example/Greeter')?.content ?? '';
    expect(content).not.toContain('SUMMARY_ROW_MARKER');
    expect(content).not.toContain('Method Summary');
    expect(content).not.toContain('Methods inherited from');
  });

  it('ignores search-index entries with invalid package names', async () => {
    const evil = await fse.mkdtemp(path.join(os.tmpdir(), 'javadoc-evil-'));
    await fse.writeFile(path.join(evil, 'type-search-index.js'), TRAVERSAL_INDEX);
    await expect(convertJavadoc(evil)).rejects.toThrow(/No element-list or package-list found/);
    await fse.rm(evil, { recursive: true, force: true });
  });
});
