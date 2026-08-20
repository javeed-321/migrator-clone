import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';

import { convertTypedoc } from '../src/sdk/converters/typedoc.js';

const project = {
  id: 0,
  name: '@auth0/example',
  kind: 1,
  children: [
    {
      id: 1,
      name: 'Client',
      kind: 128,
      comment: {
        summary: [
          { kind: 'text', text: 'A client for the [API](https://example.com). Second sentence.' },
        ],
      },
      children: [
        {
          id: 2,
          name: 'constructor',
          kind: 512,
          signatures: [
            {
              id: 3,
              name: 'new Client',
              kind: 16384,
              parameters: [
                {
                  id: 4,
                  name: 'options',
                  kind: 32768,
                  type: { type: 'reference', name: 'ClientOptions' },
                  comment: { summary: [{ kind: 'text', text: 'The options.' }] },
                },
              ],
              type: { type: 'reference', name: 'Client', target: 1 },
            },
          ],
        },
        {
          id: 5,
          name: 'token',
          kind: 1024,
          flags: { isOptional: true },
          type: {
            type: 'union',
            types: [
              { type: 'intrinsic', name: 'string' },
              { type: 'intrinsic', name: 'undefined' },
            ],
          },
          comment: { summary: [{ kind: 'text', text: 'The current token.' }] },
        },
        {
          id: 6,
          name: 'login',
          kind: 2048,
          signatures: [
            {
              id: 7,
              name: 'login',
              kind: 4096,
              comment: {
                summary: [
                  { kind: 'text', text: 'Logs in. See ' },
                  { kind: 'inline-tag', text: 'ClientOptions', target: 8 },
                ],
              },
              type: {
                type: 'reference',
                name: 'Promise',
                typeArguments: [{ type: 'intrinsic', name: 'void' }],
              },
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: 'ClientOptions',
      kind: 256,
      children: [
        {
          id: 9,
          name: 'domain',
          kind: 1024,
          type: { type: 'intrinsic', name: 'string' },
        },
      ],
    },
    { id: 10, name: 'hidden', kind: 64, flags: { isPrivate: true }, signatures: [] },
  ],
};

describe('convertTypedoc', () => {
  let directory: string;

  beforeEach(async () => {
    directory = await mkdtemp(path.join(os.tmpdir(), 'typedoc-'));
  });

  afterEach(async () => {
    await rm(directory, { recursive: true, force: true });
  });

  it('converts a typedoc project into pages and groups', async () => {
    const artifact = path.join(directory, 'typedoc.json');
    await writeFile(artifact, JSON.stringify(project));

    const reference = await convertTypedoc(artifact);

    expect(reference.groups).toEqual([
      { group: 'Classes', pages: ['classes/Client'] },
      { group: 'Interfaces', pages: ['interfaces/ClientOptions'] },
    ]);

    const client = reference.pages.find((page) => page.slug === 'classes/Client');
    expect(client).toBeDefined();
    expect(client?.title).toBe('Client');
    expect(client?.tag).toBe('CLASS');
    expect(client?.description).toBe('A client for the API.');
    expect(client?.content).toContain('## Constructor');
    expect(client?.content).toContain('new Client(options: ClientOptions): Client');
    expect(client?.content).toContain(
      '<ResponseField name={"options"} type={"ClientOptions"} required>'
    );
    expect(client?.content).toContain('<ResponseField name={"token"} type={"string | undefined"}>');
    expect(client?.content).toContain('### login()');
    expect(client?.content).toContain('[ClientOptions](/interfaces/ClientOptions)');
    expect(client?.content).not.toContain('hidden');
  });
});
