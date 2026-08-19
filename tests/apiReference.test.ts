import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { convertApiExamples, convertParamFields, stripApiArtefacts } from "../src/convert/api-reference";
import type { ConversionNote } from "../src/convert/mdast";
import { convertOneToOne, toMdx } from "../src/convert/one-to-one";
import { convertReadmeMarkdown } from "../src/convert/run";
import { convertTables } from "../src/convert/table";
import { parseMarkdown } from "../src/download/parse";

/** The pipeline slice Section 5 sits in, so a test sees what the page sees. */
function run(source: string, paramFields = false): { mdx: string; notes: ConversionNote[] } {
  const { tree } = parseMarkdown(source);
  const notes: ConversionNote[] = [];
  stripApiArtefacts(tree, notes);
  convertTables(tree, notes);
  notes.push(...convertOneToOne(tree).notes);
  convertApiExamples(tree, notes);
  convertParamFields(tree, notes, { paramFields });
  return { mdx: toMdx(tree).trim(), notes };
}

const ENDPOINT = `Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Get Loyalty Promotion by ID

Get details of the promotion using promotion ID.

# Example request

\`\`\`curl Sample request
curl --location 'https://eu.api.capillarytech.com/v1.1/customer/add'
\`\`\`

# Path parameters

| Parameter Name | Data Type | Description |
| :--- | :--- | :--- |
| programId | String | Unique ID of the program |

# Query parameters

| Parameter Name | Data Type | Description |
| :--- | :--- | :--- |
| \`limit*\` | String | Number of results to display. |
| \`offset\` | Integer | Start index for data retrieval. |

# Example response

\`\`\`json 200 OK
{ "status": "success" }
\`\`\`

# Response parameters

| Field | Data Type | Description |
| :--- | :--- | :--- |
| \`status\` | Object | Contains the status of the response. |
| ..\`code\` | Integer | The HTTP status code. |
| ..\`message\` | String | A human-readable message. |
| \`data\` | Array | The promotions. |

# OpenAPI definition

\`\`\`json
{ "openapi": "3.1.0" }
\`\`\``;

describe("5.6 artefacts that must not reach the target", () => {
  it("drops ReadMe's injected llms.txt preamble", () => {
    const { mdx, notes } = run(ENDPOINT);

    expect(mdx).not.toContain("llms.txt");
    expect(notes.some((note) => note.rule === "api-artefact" && /preamble/.test(note.detail))).toBe(true);
  });

  it("drops the OpenAPI definition dump and everything under it", () => {
    const { mdx } = run(ENDPOINT);

    expect(mdx).not.toContain("OpenAPI definition");
    expect(mdx).not.toContain('"openapi": "3.1.0"');
  });

  it("stops at the next heading of the same depth, so a page that continues keeps it", () => {
    const source = `# OpenAPI definition

\`\`\`json
{ "openapi": "3.1.0" }
\`\`\`

# Support

Ask us anything.`;
    const { mdx } = run(source);

    expect(mdx).not.toContain("OpenAPI definition");
    expect(mdx).toContain("Ask us anything.");
  });

  it("leaves a page that merely mentions llms.txt in prose alone", () => {
    const { mdx } = run("The index lives at https://example.com/llms.txt and lists every page.");

    expect(mdx).toContain("llms.txt");
  });
});

describe("5.5 Request / Response", () => {
  it("wraps the request example, labelled by language", () => {
    const { mdx } = run(ENDPOINT);

    expect(mdx).toContain('<Request tabs="cURL">');
  });

  it("keeps curl as curl — the target aliases it to bash [DAI §5]", () => {
    const { mdx } = run(ENDPOINT);

    expect(mdx).toContain("```curl");
  });

  it("reads the status code out of the fence title into the CODE - Variant form", () => {
    const source = ENDPOINT.replace("```json 200 OK", "```json 400 Invalid payment mode");
    const { mdx } = run(source);

    expect(mdx).toContain('<Response tabs="400 - Invalid payment mode">');
  });

  it("never invents a status code the source does not carry", () => {
    const source = ENDPOINT.replace("```json 200 OK", "```json Sample response");
    const { mdx, notes } = run(source);

    expect(mdx).toContain('<Response tabs="Sample response">');
    expect(notes.some((note) => note.rule === "api-response" && note.level === "flag")).toBe(true);
  });

  it("switches to a dropdown once there are many scenarios", () => {
    const source = `# Path parameters

| Parameter Name | Data Type | Description |
| :--- | :--- | :--- |
| id | String | The id. |

# Example response

\`\`\`json 200 OK
{ "a": 1 }
\`\`\`
\`\`\`json 400 Bad request
{ "a": 2 }
\`\`\`
\`\`\`json 404 Not found
{ "a": 3 }
\`\`\`
\`\`\`json 500 Server error
{ "a": 4 }
\`\`\``;
    const { mdx } = run(source);

    expect(mdx).toContain('tabs="200 - OK,400 - Bad request,404 - Not found,500 - Server error"');
    expect(mdx).toContain('dropdown="true"');
  });

  it("moves the tab label out of the fence, so it is not printed twice", () => {
    const { mdx } = run(ENDPOINT);

    expect(mdx).not.toContain('title="Sample request"');
  });

  it("drops a heading whose whole section moved to the sidebar", () => {
    const { mdx } = run(ENDPOINT);

    expect(mdx).not.toContain("# Example request");
  });

  it("keeps a heading that still has prose under it", () => {
    const source = ENDPOINT.replace(
      "# Example request\n",
      "# Example request\n\nCall the endpoint with your org credentials.\n",
    );
    const { mdx } = run(source);

    expect(mdx).toContain("# Example request");
    expect(mdx).toContain("<Request");
  });

  it("leaves a guide page alone — Request/Response render in the sidebar [DAI §7]", () => {
    const source = `# Making a request

Send the payload like this.

\`\`\`json Body
{ "a": 1 }
\`\`\``;
    const { mdx } = run(source);

    expect(mdx).not.toContain("<Request");
    expect(mdx).not.toContain("<Response");
  });

  it("does not put a CodeGroup inside a Request", () => {
    const { mdx } = run(ENDPOINT);

    expect(mdx).not.toContain("<CodeGroup");
  });

  it("flags a comma in a tab label, which would split the tab in two", () => {
    const source = ENDPOINT.replace("```json 200 OK", "```json 200 OK, created");
    const { notes } = run(source);

    expect(notes.some((note) => note.level === "blocker" && /comma/.test(note.detail))).toBe(true);
  });
});

describe("5.3 ParamField", () => {
  it("is off by default, and says why", () => {
    const { mdx, notes } = run(ENDPOINT);

    expect(mdx).not.toContain("<ParamField");
    expect(mdx).toContain("| Parameter Name |");
    expect(notes.some((note) => note.rule === "param-field" && /openapi-mode/.test(note.detail))).toBe(true);
  });

  it("takes the location from the heading", () => {
    const { mdx } = run(ENDPOINT, true);

    expect(mdx).toContain('<ParamField path="programId" param-type="string">');
    expect(mdx).toContain('<ParamField query="limit"');
  });

  it("reads ReadMe's trailing * as required, and strips it from the name", () => {
    const { mdx } = run(ENDPOINT, true);

    expect(mdx).toContain('<ParamField query="limit" param-type="string" required="true">');
    expect(mdx).not.toContain("limit*");
  });

  it('writes required as the string "true" — required={true} never registers [DAI §14]', () => {
    const { mdx } = run(ENDPOINT, true);

    expect(mdx).not.toContain("required={true}");
  });

  it("omits required rather than writing false, which is already the default", () => {
    const { mdx } = run(ENDPOINT, true);

    expect(mdx).toContain('<ParamField query="offset" param-type="integer">');
  });

  it("refuses the whole table when a row has no name left [PIT Phase 2]", () => {
    const source = `# Path parameters

| Parameter Name | Data Type | Description |
| :--- | :--- | :--- |
| \`id\` | String | The id. |
| | String | The one that shipped nameless. |

# Example request

\`\`\`curl Sample
curl https://example.com
\`\`\``;
    const { mdx, notes } = run(source, true);

    expect(mdx).not.toContain("<ParamField");
    expect(mdx).toContain("| The one that shipped nameless. |");
    expect(notes.some((note) => note.level === "blocker" && /no parameter name/.test(note.detail))).toBe(true);
  });

  it("refuses a nested parameter table, which ParamField has no form for", () => {
    const source = `# Body parameters

| Parameter Name | Data Type | Description |
| :--- | :--- | :--- |
| \`cart\` | Object | The cart. |
| ..\`items\` | Array | Its items. |
| ..\`total\` | Integer | Its total. |

# Example request

\`\`\`curl Sample
curl https://example.com
\`\`\``;
    const { mdx, notes } = run(source, true);

    expect(mdx).not.toContain("<ParamField");
    expect(notes.some((note) => note.level === "flag" && /no nesting form/.test(note.detail))).toBe(true);
  });
});

describe("5.4 ResponseField", () => {
  it("uses field-type, not param-type [DAI §14, §15]", () => {
    const { mdx } = run(ENDPOINT, true);

    expect(mdx).toContain('<ResponseField name="status" field-type="object">');
    expect(mdx).not.toContain('<ResponseField name="status" param-type');
  });

  it("nests deeper rows in an Expandable", () => {
    const { mdx } = run(ENDPOINT, true);

    expect(mdx).toContain('<Expandable title="Status properties" default-open="false">');
    expect(mdx).toContain('<ResponseField name="code" field-type="integer">');
  });

  it("closes the nesting again for the next top-level field", () => {
    const { mdx } = run(ENDPOINT, true);
    const data = mdx.indexOf('name="data"');
    const expandable = mdx.indexOf("</Expandable>");

    expect(expandable).toBeGreaterThan(-1);
    expect(data).toBeGreaterThan(expandable);
  });
});

describe("the whole pipeline, on a real corpus page", () => {
  const source = readFileSync("tests/fixtures/tables/get-promotion-by-id.md", "utf8");

  it("compiles, and carries the endpoint across", async () => {
    const result = await convertReadmeMarkdown(source, { api: { paramFields: true } });

    expect(result.outputCompiles).toBe(true);
    expect(result.mdx).toContain('<Request tabs="cURL">');
    expect(result.mdx).toContain("<ResponseField");
    expect(result.mdx).not.toContain("OpenAPI definition");
    expect(result.mdx).not.toContain("llms.txt");
  });

  it("is idempotent — converting the output again changes nothing", async () => {
    const once = (await convertReadmeMarkdown(source)).mdx;
    const twice = (await convertReadmeMarkdown(once)).mdx;

    expect(twice).toBe(once);
  });
});

describe("5.3 the first-column name, which is the one thing that must never be lost", () => {
  const table = (first: string) => `# Path parameters

| Parameter Name | Data Type | Description |
| :--- | :--- | :--- |
| ${first} | String | The id. |

# Example request

\`\`\`curl Sample
curl https://example.com
\`\`\``;

  it.each([
    ["`accountId`", "accountId"],
    ["**accountId**", "accountId"],
    ["**`accountId`**", "accountId"],
    ["`**accountId**`", "accountId"],
    ["`accountId*`", "accountId"],
    // Literal asterisks in the cell *text* — escaped in the source, so they reach
    // the unwrap as characters rather than as mdast `strong`. This is the only
    // form that can tell a correct unwrap from one that strips a bare leading `*`.
    ["\\*\\*accountId\\*\\*", "accountId"],
    // A name whose first letter is also a regex escape in the indent class.
    ["`sourceType`", "sourceType"],
  ])("keeps the identifier in %s", (written, name) => {
    const { mdx } = run(table(written), true);

    expect(mdx).toContain(`<ParamField path="${name}"`);
  });

  it("treats a leading bullet as depth, not decoration, and so refuses the table", () => {
    const { mdx, notes } = run(table("• accountId"), true);

    expect(mdx).not.toContain("<ParamField");
    expect(notes.some((note) => note.rule === "param-field" && /no nesting form/.test(note.detail))).toBe(true);
  });

  it("says why it left a table alone when there is no description column", () => {
    const source = `# Path parameters

| Parameter Name | Data Type |
| :--- | :--- |
| id | String |

# Example request

\`\`\`curl Sample
curl https://example.com
\`\`\``;
    const { notes } = run(source, true);

    expect(notes.some((note) => note.rule === "param-field" && /no description column/.test(note.detail))).toBe(true);
  });
});
