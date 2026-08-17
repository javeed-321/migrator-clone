---
updatedAt: 2026-08-14T06:00:03.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Data Ingestion

Templates for ingesting customer, transaction, event, and user data into the Capillary platform.

Data ingestion templates let you bring customer, transaction, event, and user data into the Capillary platform from FTP or SFTP locations on a schedule. Each template provides a pre-configured block sequence for a specific ingestion use case. You select a template, configure the block details for your environment, and deploy the dataflow.

The following templates are available for data ingestion.

## Force generate barcode

Use this template to generate barcodes in bulk for existing customers. The template reads customer identifiers from a source file and calls the Capillary barcode generation API for each record.

**Use case**

A brand migrating customers from a legacy system needs to generate barcodes in bulk for existing loyalty members who do not yet have one in the Capillary platform. The customer identifiers are provided in a file and the template runs the generation API for each record in a single scheduled operation.

### Block configuration

The following table lists the blocks in the Force generate barcode template, describes what each block does, and provides the configured values for each field.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Block Name
      </th>

      <th>
        Configuration Field
      </th>

      <th>
        Configured Value
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **[Connect-to-source](https://docs.capillarytech.com/docs/sftp-read-block)**<br />Type: `sftp_read`
      </td>

      <td>
        Hostname
      </td>

      <td>
        `data.capillarydata.com`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Username
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Source directory
      </td>

      <td>
        `/tmp/`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Filename pattern
      </td>

      <td>
        `.*.csv`. Matches all CSV files.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Processed directory
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Unzip files
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        API error file path
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Search directory recursively
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Port
      </td>

      <td>
        `22`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Report status code
      </td>

      <td>
        `all`
      </td>
    </tr>

    <tr>
      <td>
        **[Decrypt-data](https://docs.capillarytech.com/docs/pgp-decrypt-block)**<br />Type: `decrypt_content`
      </td>

      <td>
        Encryption algorithm
      </td>

      <td>
        `PGP`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private key file
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private passphrase
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Is enabled
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>
        **[Ok-file](https://docs.capillarytech.com/docs/ok-file-block)**<br />Type: `ok_file_3`
      </td>

      <td>
        —
      </td>

      <td>
        —
      </td>
    </tr>

    <tr>
      <td>
        **Transform-data**<br />Type: `barocde_generate`
      </td>

      <td>
        —
      </td>

      <td>
        —
      </td>
    </tr>

    <tr>
      <td>
        **[Filter-data](https://docs.capillarytech.com/docs/filter_on_condition_hidden-block)**<br />Type: `filter_on_condition_hidden`
      </td>

      <td>
        Filter condition
      </td>

      <td>
        `${"${header_value:equals('true'):  
                or(${header_value:isEmpty()})}"}`
      </td>
    </tr>

    <tr>
      <td>
        **[Connect-to-destination](https://docs.capillarytech.com/docs/api-request-http_write-block)**<br />Type: `http_write`
      </td>

      <td>
        Client key
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Client secret
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        API endpoint
      </td>

      <td>
        `/v2/customers/barcode/forceGenerate?source=INSTORE&format=json`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        API base URL
      </td>

      <td>
        `https://{host}`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        API method
      </td>

      <td>
        `POST`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        OAuth base URL
      </td>

      <td>
        `https://{host}`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Parse response
      </td>

      <td>
        `true`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Bulk support
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Request split path
      </td>

      <td>
        `$`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Response split path
      </td>

      <td>
        `$`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Recoverable error codes
      </td>

      <td>
        `502,504,520,521`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Parse path map
      </td>

      <td>
        `{"status_code": "$.['errors']._.code", "error_message": "$.['errors']._.message"}`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Yielding error codes
      </td>

      <td>
        `429`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Maximum retries
      </td>

      <td>
        `3`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Additional headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Rate
      </td>

      <td>
        `1000`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Period
      </td>

      <td>
        `1`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Time unit
      </td>

      <td>
        `MINUTES`
      </td>
    </tr>
  </tbody>
</Table>

<br />