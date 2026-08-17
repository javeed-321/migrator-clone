---
updatedAt: 2026-04-22T13:58:42.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Transform (CSV to XML) block

The `convert_csv_to_xml` block converts CSV files into XML format. It acts as a transformation block in a Connect+ dataflow, sitting between the source and destination blocks to produce structured XML output from ingested CSV data. The block allows you to define the XML document structure by specifying the top-level wrapper element, the repeating row component, the file delimiter used in the source CSV, the output XML filename, and the closing bottom element.

## When to use this block

Use this block when a downstream system or destination requires data in XML format rather than CSV or JSON.

## Prerequisites

Before configuring this block, make sure you have:

* Defined the expected XML structure, including the wrapper and repeating element names
* Identified the delimiter used in the source CSV file

## Configuration fields

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field name
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Block name**
      </td>

      <td>
        No
      </td>

      <td>
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **XML Top**
      </td>

      <td>
        Yes
      </td>

      <td>
        The opening XML element that wraps the entire document.   
        For example, `<records>`.
      </td>
    </tr>

    <tr>
      <td>
        **XML file name**
      </td>

      <td>
        Yes
      </td>

      <td>
        The name of the output XML file to be generated.   
        For example, `output_file.xml`.
      </td>
    </tr>

    <tr>
      <td>
        **XML Repeating Component**
      </td>

      <td>
        Yes
      </td>

      <td>
        The XML element that wraps each row from the CSV file.   
        For example, `<record>`.
      </td>
    </tr>

    <tr>
      <td>
        **Input File Delimiter**
      </td>

      <td>
        Yes
      </td>

      <td>
        The character used to separate fields in the input CSV file.   
        For example, `,` for comma-separated or `
      </td>
    </tr>

    <tr>
      <td>
        **XML Bottom**
      </td>

      <td>
        Yes
      </td>

      <td>
        The closing XML element that ends the document.   
        For example, `</records>`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/c972a1250a07ac650abf8c2ef2436092d02353ea514f4bb47d59eef7a02ef091-Screenshot_2026-04-15_at_2.44.34_PM.png" className="border" />