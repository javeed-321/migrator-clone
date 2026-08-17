---
updatedAt: 2026-04-22T05:41:22.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Join files (3) block

<Callout icon="❗️">
  This block will be deprecated in a future release.
</Callout>

The `three_join` block merges three source files into a single output file based on specified join conditions and matching headers. It acts as a transformation block in a Connect+ dataflow, enabling you to combine data from three separate files using SQL-style join operations before passing the merged output to downstream blocks.

## When to use this block

Use this block when your dataflow needs to combine data from three separate files — for example, merging bill-level, line-level, and payment mode files before ingestion.

## Prerequisites

Before configuring this block, make sure you have:

* Three source files with a common column to join on
* Regex patterns that uniquely identify each file

## Configuration fields

| Field name                                                               | Required | Description                                                                                                                                                          |
| :----------------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Block name**                                                           | No       | A name for the block instance. For example, `Three_Join_Block`.                                                                                                      |
| **Files 1-2 Join Type**                                                  | Yes      | The type of SQL join used to merge File 1 and File 2. Select from the dropdown. Default value: `LEFT_OUTER_JOIN`.                                                    |
| **Files 1-3 Join Type**                                                  | Yes      | The type of SQL join used to merge the result of Files 1-2 with File 3. Select from the dropdown. Default value: `LEFT_OUTER_JOIN`.                                  |
| **All Files Delimiter**                                                  | Yes      | The delimiter used to separate fields in the source files. For example, `,`.                                                                                         |
| **File 1 Regex**                                                         | Yes      | The filename pattern used to identify File 1. For example, `BILL_LEVEL.*.csv`.                                                                                       |
| **File 1 Headers**                                                       | Yes      | The column header name in File 1 used for the join comparison. To match on multiple headers, enter the header names separated by a comma. For example, `BillNumber`. |
| **File 2 Regex**                                                         | Yes      | The filename pattern used to identify File 2. For example, `LINE_LEVEL.*.csv`.                                                                                       |
| **File 2 Headers**                                                       | Yes      | The column header name in File 2 used for the join comparison. To match on multiple headers, enter the header names separated by a comma. For example, `BillNumber`. |
| **File 3 Regex**                                                         | Yes      | The filename pattern used to identify File 3. For example, `PAYMENT_MODE.*.csv`.                                                                                     |
| **File 3 Headers**                                                       | Yes      | The column header name in File 3 used for the join comparison. To match on multiple headers, enter the header names separated by a comma. For example, `BillNumber`. |
| **Output Filename**                                                      | Yes      | The name of the merged output file. For example, `merged_output.csv`.                                                                                                |
| **File Join Use Case**                                                   | No       | The use case for the file join. Select from the dropdown. Default value: `NONE`.                                                                                     |
| **File One Mention Header names (for use in mapping and expressions)**   | No       | The column header names for File 1, separated by commas. Required if File 1 is headerless. For example, `BillNumber,Amount,Date`.                                    |
| **File One is Headerless**                                               | No       | Indicates whether File 1 does not contain column headers. Select `true` or `false` from the dropdown. Default value: `false`.                                        |
| **File Two Mention Header names (for use in mapping and expressions)**   | No       | The column header names for File 2, separated by commas. Required if File 2 is headerless. For example, `BillNumber,ItemCode,Quantity`.                              |
| **File two is Headerless**                                               | No       | Indicates whether File 2 does not contain column headers. Select `true` or `false` from the dropdown. Default value: `false`.                                        |
| **File three is Headerless**                                             | No       | Indicates whether File 3 does not contain column headers. Select `true` or `false` from the dropdown. Default value: `false`.                                        |
| **File Three Mention Header names (for use in mapping and expressions)** | No       | The column header names for File 3, separated by commas. Required if File 3 is headerless. For example, `BillNumber,PaymentMode,Amount`.                             |
| **Merge based on common Name**                                           | No       | Determines whether files are identified and merged based on a common name pattern. Select `true` or `false` from the dropdown. Default value: `false`.               |
| **Merge based on common Name Template File One**                         | No       | The filename template for File 1 using the `<common>` tag to identify the common part of the filename. For example, `TktDocument_<common>.dat`.                      |
| **Merge based on common Name Template File Two**                         | No       | The filename template for File 2 using the `<common>` tag to identify the common part of the filename. For example, `TktDocument_<common>.dat`.                      |
| **Merge based on common Name Template File Three**                       | No       | The filename template for File 3 using the `<common>` tag to identify the common part of the filename. For example, `TktDocument_<common>.dat`.                      |
| **Use Alphabetical Sort**                                                | No       | Determines whether files are sorted in alphanumerical order before merging. Select `true` or `false` from the dropdown. Default value: `false`.                      |