---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Rebuild Headers / Define Headers and Transform Data

This block enables you to map and manipulate the data in the input file during file transfer. Below is the screenshot of the block.

<Image align="center" className="border" border={true} src="https://files.readme.io/576dd24-template_define_headers_and_transform_data.png" />

The table contains the fields and their descriptions.

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
        Headers Mapping
      </td>

      <td>
        Map the column headers or headings according to the input file.  

        * \*Syntax:\*\* `{"heading1 of output file":"heading1 of input file", "heading2 of output file":"heading2 of input file"}`  
        * \*Example:\*\*` {"TAmount":"t_amount", "BillID":"Bill_Number"}`\
          Here,` t_amount` and `Bill_Number` in the input file are stored as `TAmount` and `BillID `respectively in the output file. The information in the input and output files is identical.\
            

        You can manipulate or change the information in the output during file transfer. This is done by using expressions.  

        * \*Example:\*\*` {"TAmount":exp{hdr"t_amount"+1}}`\
          Here,` t_amount` in the input file is stored as `TAmount` in the output file. Each value under `TAmount` in the output file is the value from `t_amount` in the input file increased by 1.\
            

        See [Example use case](https://docs.capillarytech.com/docs/sftp-to-sftp-with-headers-definition#example-use-case) for details.
      </td>
    </tr>

    <tr>
      <td>
        Output Headers Order
      </td>

      <td>
        Specify the order of column headers in the output file or skip columns during the transfer. The headings should be comma-separated without spaces between them.  

        * \*Syntax:\*\* `heading1,heading2`  
        * \*Example:\*\* `TAmount,bill_name,BillID `\
          See [Example use case](https://docs.capillarytech.com/docs/sftp-to-sftp-with-headers-definition#example-use-case)  for details.
      </td>
    </tr>

    <tr>
      <td>
        Input File Delimiter
      </td>

      <td>
        File delimiter separates fields in the input file.
      </td>
    </tr>

    <tr>
      <td>
        Output File Delimiter
      </td>

      <td>
        File delimiter separates fields in the output file. Delimiter allowed: pipe (|), comma (,) ampersand (&), per cent (%). Alphabets and numbers cannot be delimiters.
      </td>
    </tr>

    <tr>
      <td>
        Output Filename
      </td>

      <td>
        Name of the output filename with extension. Extensions allowed: .txt or .csv.\
        The output filename cannot be null. Ensure that the output filename matches the one specified in the Connect to destination block.
      </td>
    </tr>

    <tr>
      <td>
        Is the file headerless?
      </td>

      <td>
        Select the check box if the columns in the input file do not have a header.
      </td>
    </tr>

    <tr>
      <td>
        Mention header names (for use in mapping and expressions)
      </td>

      <td>
        Define the column header or heading in the output file if the input file does not have a heading or column header. There cannot be spaces between two heading names and do not use double quotes.  

        * \*Syntax:\*\* `heading1,heading2`  
        * \*Example:\*\* `TAmount,BillID`\
          See [Example use case](https://docs.capillarytech.com/docs/sftp-to-sftp-with-headers-definition#example-use-case)  for details.
      </td>
    </tr>
  </tbody>
</Table>