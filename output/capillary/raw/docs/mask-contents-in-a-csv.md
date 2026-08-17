---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Mask Contents in a CSV

The **hash-csv-fields** block enables you to hash/mask the contents in a CSV file. This can be used when the CSV file contains PII data or any sensitive data. The hashing algorithm supported are:

* SHA-256
* SHA-512
* SHA-1
* MD5
* RIPEMD-160

<Image align="center" className="border" border={true} src="https://files.readme.io/0a81c4ecbc37360b132251062c9027cfa444e1df7032b58bb8cae7369516dafb-Hash_CSV_fields.png" />

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field 
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Enabled
      </td>

      <td>
        Select true to enable the hashing.
      </td>
    </tr>

    <tr>
      <td>
        Hashing Algorithm
      </td>

      <td>
        Lists the available supported hashing algorithms.
      </td>
    </tr>

    <tr>
      <td>
        Headers need to be hashed
      </td>

      <td>
        Define the column header names that need to be hashed. The headings should be comma-separated without spaces between them. **Syntax:** `heading1,heading2`  

        * \*Example:\*\* `email,mobile`
      </td>
    </tr>

    <tr>
      <td>
        Delimiter
      </td>

      <td>
        The delimiter used to separate the header names. The delimiters supported are:  

        * Pipe (|)
        * Comma (,)
        * Ampersand (&)
        * Per cent (%)
      </td>
    </tr>
  </tbody>
</Table>