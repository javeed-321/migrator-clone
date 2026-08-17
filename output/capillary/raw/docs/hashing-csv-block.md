---
updatedAt: 2026-04-22T05:45:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Hashing (CSV) block

The `hash_csv_columns` block hashes CSV data cell by cell using a specified hashing algorithm as a transformation block in a Connect+ dataflow. It applies one-way hashing to designated column headers in the source file, enabling data anonymisation or masking before the data is passed to downstream blocks.

## When to use this block

Use this block when you need to anonymise or mask personally identifiable information (PII) — such as email addresses or mobile numbers — before the data is delivered to its destination.

## Prerequisites

Before configuring this block, make sure you have:

* Identified the column headers that contain data to be hashed
* Selected the hashing algorithm appropriate for your security requirements

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
        **Enabled**
      </td>

      <td>
        Yes
      </td>

      <td>
        Determines whether hashing is applied.   
        Select `true` or `false` from the dropdown.   
        Default value: `false`.
      </td>
    </tr>

    <tr>
      <td>
        **Hashing Algorithm**
      </td>

      <td>
        Yes
      </td>

      <td>
        The algorithm used to hash the CSV column data.   
        Select `SHA-256`, `SHA-512`, `MD5`, `SHA-1`, or `RIPEMD-160` from the dropdown.   
        Default value: `SHA-256`.
      </td>
    </tr>

    <tr>
      <td>
        **HeadersToBeHashed**
      </td>

      <td>
        Yes
      </td>

      <td>
        The column headers to be hashed, entered as a comma-separated list.   
        For example, `email,mobile`.
      </td>
    </tr>

    <tr>
      <td>
        **Delimiter**
      </td>

      <td>
        Yes
      </td>

      <td>
        The delimiter used to separate fields in the CSV file. Default value: `,`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/dcb280a70e13344ca4e622e6c1d5d9ab53c5029fe5719c8c76ceaa2d84c32181-Screenshot_2026-04-22_at_11.15.15_AM.png" className="border" />