---
updatedAt: 2026-05-26T10:22:22.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Join Data

Configuration reference for the Join Data block — merges two CSV files into one based on matching column values.

<Callout icon="❗️">
  This block currently doesn't exist.
</Callout>

The Join Data block merges two CSV files into one based on matching column values. It is used in templates that receive data across multiple files — for example, merging a bill-level file with a line-item file before posting the combined data to the transaction API.

**Block type:** `JoinProcessor`

Joins two CSV files using one of four join strategies: Inner Join, Left Outer Join, Right Outer Join, or Outer Join.

## Configuration fields

| Field                         | Description                                                                            |
| :---------------------------- | :------------------------------------------------------------------------------------- |
| File One Merge Headers \*     | Comma-separated column names from File 1 to use as join keys                           |
| File Two Merge Headers \*     | Comma-separated column names from File 2 to use as join keys                           |
| Join Type \*                  | Join strategy: `INNER_JOIN`, `LEFT_OUTER_JOIN`, `RIGHT_OUTER_JOIN`, or `OUTER_JOIN`    |
| Merge Based on Common Name \* | Enable to match files by a common filename fragment. Strongly recommended for accuracy |
| Alphabetical Sort             | Sort files alphabetically before merging. Recommended for correct multi-file ordering  |
| Output File Delimiter         | Delimiter used in the merged output file (e.g., comma, pipe)                           |

<br />

<Callout icon="📘" theme="info">
  **Note**

  It is strongly recommended to enable both **Merge Based on Common Name** and **Alphabetical Sort** when using the Join Data block, as these settings ensure files are matched and sequenced correctly.
</Callout>