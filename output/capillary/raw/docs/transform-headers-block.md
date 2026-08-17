---
updatedAt: 2026-04-22T05:48:49.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Transform (Headers) block

The `transform_header_data` block manipulates and remaps CSV column headers using header mappings and expressions as a transformation block in a Connect+ dataflow. It defines the structure and order of the output file, supports headerless input files, and passes the transformed data to downstream blocks.

## When to use this block

Use this block when your source file's column headers need to be renamed, reordered, or derived from expressions before the file is passed to downstream blocks.

## Prerequisites

Before configuring this block, make sure you have:

* A list of the desired output column headers in the required order
* A mapping from output headers to input headers
* If the input file is headerless, a list of column names to assign to the input columns

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
        Yes
      </td>

      <td>
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **Output Headers Order**
      </td>

      <td>
        Yes
      </td>

      <td>
        The comma-separated list of output column headers in the order they should appear in the output file.   
        For example, `TAmount,bill_name,BillID`.
      </td>
    </tr>

    <tr>
      <td>
        **Output File Delimiter**
      </td>

      <td>
        Yes
      </td>

      <td>
        The delimiter used to separate fields in the output file. Default value: `,`.
      </td>
    </tr>

    <tr>
      <td>
        **Output Filename**
      </td>

      <td>
        Yes
      </td>

      <td>
        The name of the output file including its extension.   
        Default value: `${filename}`.
      </td>
    </tr>

    <tr>
      <td>
        **Header Mapping**
      </td>

      <td>
        Yes
      </td>

      <td>
        A JSON object that maps output column headers to input column headers.   
        Default value: `{}`.
      </td>
    </tr>

    <tr>
      <td>
        **Is the file headerless?**
      </td>

      <td>
        Yes
      </td>

      <td>
        Determines whether the input file has column headers. Select `true` or `false` from the dropdown.   
        Default value: `false`.
      </td>
    </tr>

    <tr>
      <td>
        **Mention header names (for use in mapping and expressions)**
      </td>

      <td>
        No
      </td>

      <td>
        Defines the column header names when the input file is headerless, for use in mapping and expressions.   
        For example, `TAmount,BillID`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/134146872da67d7e5b7ed209374c18b4c69dfbce608cc8d290455fe3027687ac-Screenshot_2026-04-20_at_5.27.43_PM.png" className="border" />