---
updatedAt: 2026-04-22T05:24:54.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# File Transfer & Transformation

Templates for transferring files between SFTP, FTP, and S3, with optional header manipulation, file joins, and format conversion.

File transfer and transformation templates move, merge, reformat, or convert files between FTP, SFTP, and S3 locations. These templates do not send data to Capillary ingestion APIs. Select a template, configure the block details for your environment, and deploy the dataflow.

The following templates are available for file transfer and transformation.

## SFTP to SFTP with 2 files join

Downloads two files from an SFTP server, unzips, joins them on matching fields, zips the merged output, and pushes it to an SFTP server.

**Use case**

A brand exports two related datasets to an SFTP location daily and needs them combined into a single file before the data is shared with a downstream system. This template joins the two files on a common field and delivers the merged output to the destination SFTP server in a single scheduled run.

### Block configuration

The following table lists the blocks in the SFTP to SFTP with 2 Files Join template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                 | Configuration Field          | Configured Value                               |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------- |
| **[Connect-to-source](https://docs.capillarytech.com/docs/sftp-read-block)**<br />Type: `sftp_read`        | Hostname                     | `data.capillarydata.com`                       |
|                                                                                                            | Username                     | `null`                                         |
|                                                                                                            | Source Directory             | `/tmp/`                                        |
|                                                                                                            | Filename Pattern             | `.*.csv`. Matches all CSV files.               |
|                                                                                                            | Processed Directory          | `null`                                         |
|                                                                                                            | Unzip Files                  | `false`                                        |
|                                                                                                            | API Error File Path          | `null`                                         |
|                                                                                                            | Search Directory Recursively | `false`                                        |
|                                                                                                            | Port                         | `22`                                           |
|                                                                                                            | File Delimiter               | `,`                                            |
|                                                                                                            | Report Status Code           | `all`                                          |
| **[Decrypt-data](https://docs.capillarytech.com/docs/pgp-decrypt-block)**<br />Type: `decrypt_content`     | Encryption Algorithm         | `PGP`                                          |
|                                                                                                            | Private Key File             | Redacted                                       |
|                                                                                                            | Private Passphrase           | Redacted                                       |
|                                                                                                            | Is Enabled                   | `false`                                        |
| **[Ok-file](https://docs.capillarytech.com/docs/ok-file-block)**<br />Type: `ok_file_3`                    | —                            | —                                              |
| **[Join-data](https://docs.capillarytech.com/docs/join-files-2-block)**<br />Type: `two_join`              | Join Type                    | `INNER_JOIN`                                   |
|                                                                                                            | Files Delimiter              | `,`                                            |
|                                                                                                            | File 1 Regex                 | `merge.*.csv`                                  |
|                                                                                                            | File 1 Join Headers          | `mobile`                                       |
|                                                                                                            | File 2 Regex                 | `null`                                         |
|                                                                                                            | File 2 Join Headers          | `mobile`                                       |
|                                                                                                            | Joined Filename              | `merg_now():format('yyyy-MM-dd').csv`          |
|                                                                                                            | Join Use Case                | `NONE`                                         |
|                                                                                                            | Use Alphabetical Sort        | `true`                                         |
|                                                                                                            | Merge Based on Name          | `false`                                        |
|                                                                                                            | File 1 Template              | `File_1_{'<common>'}.csv`                      |
|                                                                                                            | File 2 Template              | `File_2_{'<common>'}.csv`                      |
|                                                                                                            | File 1 Is Headerless         | `false`                                        |
|                                                                                                            | File 1 Headers               | `null`                                         |
|                                                                                                            | File 2 Is Headerless         | `false`                                        |
|                                                                                                            | File 2 Headers               | `null`                                         |
|                                                                                                            | Match All Regex              | `false`                                        |
|                                                                                                            | All Unique Match             | `false`                                        |
| **[Encrypt-data](https://docs.capillarytech.com/docs/pgp-encrypt-block)**<br />Type: `encrypt_content`     | Encryption Algorithm         | `PGP`                                          |
|                                                                                                            | Public Key File              | Redacted                                       |
|                                                                                                            | Public Key User ID           | `null`                                         |
|                                                                                                            | Is Enabled                   | `false`                                        |
| **[Connect-to-destination](https://docs.capillarytech.com/docs/sftp-write-block)**<br />Type: `sftp_write` | Hostname                     | `data.capillarydata.com`                       |
|                                                                                                            | Username                     | `capillary`                                    |
|                                                                                                            | Password                     | Redacted                                       |
|                                                                                                            | Remote Path                  | `null`                                         |
|                                                                                                            | Create Remote Directory      | `true`                                         |
|                                                                                                            | Conflict Resolution          | `IGNORE`                                       |
|                                                                                                            | Zip Files                    | `true`                                         |
|                                                                                                            | Port                         | `22`                                           |
|                                                                                                            | Output File Name             | `${'${filename }'}`. Uses the source filename. |
|                                                                                                            | Output File Name             | `${filename} `. Uses the source filename.      |
|                                                                                                            | Private Key Path             | Not configured                                 |

## SFTP to FTP with 2 files join

Downloads two files from an SFTP server, unzips, joins them, zips the merged output, and pushes it to an FTP server.

**Use case**

A brand stores two separate data files on an SFTP server and needs to deliver a merged file to a partner system that accepts data only via FTP. This template handles the join and transfer in a single operation.

### Block configuration

The following table lists the blocks in the SFTP to FTP with 2 files join template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                 | Configuration Field          | Configured Value                         |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------- |
| [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`        | Hostname                     | `data.capillarydata.com`                 |
|                                                                                                            | Username                     | `null`                                   |
|                                                                                                            | Source directory             | `/tmp/`                                  |
|                                                                                                            | Filename pattern             | `.*.csv`. Matches all CSV files.         |
|                                                                                                            | Processed directory          | `null`                                   |
|                                                                                                            | Unzip files                  | `false`                                  |
|                                                                                                            | API error file path          | `null`                                   |
|                                                                                                            | Search directory recursively | `false`                                  |
|                                                                                                            | Port                         | `22`                                     |
|                                                                                                            | File delimiter               | `,`                                      |
|                                                                                                            | Report status code           | `all`                                    |
| [**Decrypt-data**](https://docs.capillarytech.com/docs/pgp-decrypt-block)<br />Type: `decrypt_content`     | Encryption algorithm         | `PGP`                                    |
|                                                                                                            | Private key file             | Redacted                                 |
|                                                                                                            | Private passphrase           | Redacted                                 |
|                                                                                                            | Is enabled                   | `false`                                  |
| [**Ok-file**](https://docs.capillarytech.com/docs/ok-file-block)<br />Type: `ok_file_3`                    | —                            | —                                        |
| [**Join-data**](https://docs.capillarytech.com/docs/join-files-2-block)<br />Type: `two_join`              | Join type                    | `INNER_JOIN`                             |
|                                                                                                            | Output file delimiter        | `,`                                      |
|                                                                                                            | File 1 regex                 | `merge.*.csv`                            |
|                                                                                                            | File 1 merge headers         | `mobile`                                 |
|                                                                                                            | File 2 regex                 | `null`                                   |
|                                                                                                            | File 2 merge headers         | `mobile`                                 |
|                                                                                                            | Joined filename              | `merg_now():format('yyyy-MM-dd').csv`    |
|                                                                                                            | Join use case                | `NONE`                                   |
|                                                                                                            | Alphabetical sort            | `false`                                  |
|                                                                                                            | Merge based on common name   | `false`                                  |
|                                                                                                            | File 1 template              | `File_1_<common>.csv`                    |
|                                                                                                            | File 2 template              | `File_2_<common>.csv`                    |
|                                                                                                            | File 1 is headerless         | `false`                                  |
|                                                                                                            | File 2 is headerless         | `false`                                  |
|                                                                                                            | File 1 headers               | `null`                                   |
|                                                                                                            | File 2 headers               | `null`                                   |
|                                                                                                            | Match all regex              | `true`                                   |
|                                                                                                            | All unique match             | `true`                                   |
| [**Encrypt-data**](https://docs.capillarytech.com/docs/pgp-encrypt-block)<br />Type: `encrypt_content`     | Encryption algorithm         | `PGP`                                    |
|                                                                                                            | Public key file              | Redacted                                 |
|                                                                                                            | Public key user ID           | `null`                                   |
|                                                                                                            | Is enabled                   | `false`                                  |
| [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write` | Hostname                     | `data.capillarydata.com`                 |
|                                                                                                            | Username                     | `capillary`                              |
|                                                                                                            | Password                     | Redacted                                 |
|                                                                                                            | Remote path                  | `null`                                   |
|                                                                                                            | Create remote directory      | `true`                                   |
|                                                                                                            | Conflict resolution          | `IGNORE`                                 |
|                                                                                                            | Zip files                    | `true`                                   |
|                                                                                                            | Port                         | `22`                                     |
|                                                                                                            | Output file name             | `${filename}`. Uses the source filename. |
|                                                                                                            | Private key path             | Redacted                                 |
|                                                                                                            | Key passphrase               | Redacted                                 |

## SFTP to FTP with 3 files join

Downloads three files from an SFTP server, unzips, joins them, remaps headers, zips the merged output, and pushes it to an FTP server.

**Use case**

A brand receives data across three separate files from different upstream systems and needs to consolidate them before sharing with a partner. This template joins all three files and remaps column headers to match the partner's expected format before delivering the output to the FTP destination.

### Block configuration

The following table lists the blocks in the SFTP to FTP with 3 Files Join template, describes what each block does, and provides the configured values for each field.

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
        [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`
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
        [**Decrypt-data**](https://docs.capillarytech.com/docs/pgp-decrypt-block)<br />Type: `decrypt_content`
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
        [**Ok-file**](https://docs.capillarytech.com/docs/ok-file-block)<br />Type: `ok_file_3`
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
        [**Join-data**](https://docs.capillarytech.com/docs/join-files-3-block)<br />Type: `three_join`
      </td>

      <td>
        File 1 and File 2 join type
      </td>

      <td>
        `LEFT_OUTER_JOIN`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 and File 3 join type
      </td>

      <td>
        `OUTER_JOIN`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Files delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 regex
      </td>

      <td>
        `merge.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 join headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 regex
      </td>

      <td>
        `push.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 join headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 regex
      </td>

      <td>
        `jointx.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 join headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Joined filename
      </td>

      <td>
        `merged3_now():format('yyyy-MM-dd').csv`.  
        Uses the current date in the format yyyy-MM-dd.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Join use case
      </td>

      <td>
        `NONE`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 is headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 is headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 is headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Merge based on name
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Use alphabetical sort
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>
        [**Rebuild-headers**](https://docs.capillarytech.com/docs/transform-headers-block)<br />Type: `transform_header_data`
      </td>

      <td>
        Output headers order
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Output file delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Output filename
      </td>

      <td>
        `merge_now():format('yyyy-MM-dd').csv`.  
        Uses the current date in the format yyyy-MM-dd.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Headers mapping
      </td>

      <td>
        `{"source":"source","loyaltyType":"loyaltyType",  
                        "accountId":"accountId","identifierType":"identifierType",  
                        "identifierValue":"identifierValue","mobile":"mobile",  
                        "wechat":"wechat","gender":"gender"}`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Is headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Headerless mapping
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>
        [**Encrypt-data**](https://docs.capillarytech.com/docs/pgp-encrypt-block)<br />Type: `encrypt_content`
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
        Public key file
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Public key user ID
      </td>

      <td>
        `null`
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
        [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write`
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
        `capillary`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Password
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Remote path
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Create remote directory
      </td>

      <td>
        `true`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Conflict resolution
      </td>

      <td>
        `IGNORE`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Zip files
      </td>

      <td>
        `true`
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
        Output filename
      </td>

      <td>
        `${filename }`. Uses the source filename.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private key path
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Key passphrase
      </td>

      <td>
        Redacted
      </td>
    </tr>
  </tbody>
</Table>

## SFTP to FTP with 4 files join

Downloads four files from an SFTP server, unzips, joins them, remaps headers, zips the merged output, and pushes it to an FTP server.

**Use case**

A brand consolidates data from four source files before pushing the merged result to a downstream FTP location. This template handles the multi-file join, header remapping, and delivery in one scheduled operation.

### Block configuration

The following table lists the blocks in the SFTP to FTP with 4 Files Join template, describes what each block does, and provides the configured values for each field.

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
        [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`
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
        Source Directory
      </td>

      <td>
        `/tmp/`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Filename Pattern
      </td>

      <td>
        `.*.csv`. Matches all CSV files.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Processed Directory
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Unzip Files
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        API Error File Path
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Search Directory Recursively
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
        File Delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Report Status Code
      </td>

      <td>
        `all`
      </td>
    </tr>

    <tr>
      <td>
        [**Decrypt-data**](https://docs.capillarytech.com/docs/pgp-decrypt-block)<br />Type: `decrypt_content`
      </td>

      <td>
        Encryption Algorithm
      </td>

      <td>
        `PGP`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private Key File
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private Passphrase
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Is Enabled
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>
        [**Ok-file**](https://docs.capillarytech.com/docs/ok-file-block)<br />Type: `ok_file_3`
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
        [**Join-data**](https://docs.capillarytech.com/docs/join-files-4-block)<br />Type: `four_join`
      </td>

      <td>
        File 1–2 Join Type
      </td>

      <td>
        `OUTER_JOIN`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1–3 Join Type
      </td>

      <td>
        `OUTER_JOIN`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1–4 Join Type
      </td>

      <td>
        `OUTER_JOIN`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Files Delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Regex
      </td>

      <td>
        `one.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Join Headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Regex
      </td>

      <td>
        `two.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Join Headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Regex
      </td>

      <td>
        `3.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Join Headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 4 Regex
      </td>

      <td>
        `4.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 4 Join Headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Joined Filename
      </td>

      <td>
        `merged4files_now():format('yyyy-MM-dd').csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Is Headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Is Headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Is Headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 4 Is Headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 4 Headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Use Alphabetical Sort
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Merge Based on Name
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 4 Template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>
        [**Rebuild-headers**](https://docs.capillarytech.com/docs/transform-headers-block)<br />Type: `transform_header_data`
      </td>

      <td>
        Output Headers Order
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Output File Delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Output Filename
      </td>

      <td>
        `merge_now():format('yyyy-MM-dd').csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Headers Mapping
      </td>

      <td>
        `{'{"source":"source","loyaltyType":"loyaltyType",  
                        "accountId":"accountId","identifierType":"identifierType",  
                        "identifierValue":"identifierValue","mobile":"mobile",  
                        "wechat":"wechat","gender":"gender"}'}`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Is Headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Headerless Mapping
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>
        [**Encrypt-data**](https://docs.capillarytech.com/docs/pgp-encrypt-block)<br />Type: `encrypt_content`
      </td>

      <td>
        Encryption Algorithm
      </td>

      <td>
        `PGP`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Public Key File
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Public Key User ID
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Is Enabled
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>
        [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write`
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
        `capillary`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Password
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Remote Path
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Create Remote Directory
      </td>

      <td>
        `true`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Conflict Resolution
      </td>

      <td>
        `IGNORE`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Zip Files
      </td>

      <td>
        `true`
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
        Output File Name
      </td>

      <td>
        `${'${filename }'}`. Uses the source filename.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private Key Path
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Key Passphrase
      </td>

      <td>
        Redacted
      </td>
    </tr>
  </tbody>
</Table>

## SFTP to FTP with 3 files join with encrypt and decrypt

Downloads three files from an SFTP server, decrypts them, unzips, joins, remaps headers, zips, encrypts the output, and pushes it to an FTP server.

**Use case**

A brand receives three encrypted source files on an SFTP server and needs to merge them before sending the combined result to a partner via FTP. The partner requires the output file to be encrypted. This template handles decryption on ingress, the join and header remap, and re-encryption on egress in a single automated flow.

### Block configuration

The following table lists the blocks in the SFTP to FTP with 3 Files Join with Encrypt and Decrypt template, describes what each block does, and provides the configured values for each field.

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
        [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`
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
        [**Decrypt-data**](https://docs.capillarytech.com/docs/pgp-decrypt-block)<br />Type: `decrypt_content`
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
        [**Join-data**](https://docs.capillarytech.com/docs/join-files-3-block)<br />Type: `three_join`
      </td>

      <td>
        File 1 and File 2 join type
      </td>

      <td>
        `LEFT_OUTER_JOIN`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 and File 3 join type
      </td>

      <td>
        `LEFT_OUTER_JOIN`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Files delimiter
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 regex
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 join headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 regex
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 join headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 regex
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 join headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Joined filename
      </td>

      <td>
        `joinfile_now():format('yyyyMMddHHmmss').csv`. Uses a timestamp in the format yyyyMMddHHmmss.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Join use case
      </td>

      <td>
        `NONE`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 is headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 is headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 is headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Merge based on name
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 template
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Use alphabetical sort
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>
        [**Define-headers-and-transform-data**](https://docs.capillarytech.com/docs/transform-headers-block)<br />Type: `transform_header_data`
      </td>

      <td>
        Output headers order
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Output file delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Output filename
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Headers mapping
      </td>

      <td>
        `{}`. No header remapping is configured.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Is headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Headerless mapping
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>
        [**Encrypt-data**](https://docs.capillarytech.com/docs/pgp-encrypt-block)<br />Type: `encrypt_content`
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
        Public key file
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Public key user ID
      </td>

      <td>
        `null`
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
        [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write`
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
        Not configured
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Remote path
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Create remote directory
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Conflict resolution
      </td>

      <td>
        `IGNORE`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Zip files
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
        `21`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Output filename
      </td>

      <td>
        `${'${filename }'}`.  
        Uses the source filename.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private key path
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Key passphrase
      </td>

      <td>
        `null`
      </td>
    </tr>
  </tbody>
</Table>

## SFTP to SFTP merge 3 files join with encrypt and decrypt

Downloads three files from an SFTP server, decrypts them, unzips, joins, remaps headers, encrypts the output, zips, and pushes it to an SFTP server.

**Use case**

A brand picks up encrypted customer data exports from an SFTP location, generated by the Data Export Framework in Insights+. The brand needs to merge three files, secure the output with encryption, and deliver it to a destination SFTP folder. This template was introduced to give brands a secure, generic way to migrate files between SFTP locations with both decryption and encryption support.

### Block configuration

The following table lists the blocks in the SFTP to SFTP Merge 3 Files Join with Encrypt and Decrypt template, describes what each block does, and provides the configured values for each field.

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
        [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`
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
        Source Directory
      </td>

      <td>
        `/tmp/`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Filename Pattern
      </td>

      <td>
        `.*.csv`. Matches all CSV files.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Processed Directory
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Unzip Files
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        API Error File Path
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Search Directory Recursively
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
        File Delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Report Status Code
      </td>

      <td>
        `all`
      </td>
    </tr>

    <tr>
      <td>
        [**Decrypt-data**](https://docs.capillarytech.com/docs/pgp-decrypt-block)<br />Type: `decrypt_content`
      </td>

      <td>
        Encryption Algorithm
      </td>

      <td>
        `PGP`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private Key File
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private Passphrase
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Is Enabled
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>
        [**Ok-file**](https://docs.capillarytech.com/docs/ok-file-block)<br />Type: `ok_file_3`
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
        [**Join-data**](https://docs.capillarytech.com/docs/join-files-3-block)<br />Type: `three_join`
      </td>

      <td>
        File 1–2 Join Type
      </td>

      <td>
        `LEFT_OUTER_JOIN`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1–3 Join Type
      </td>

      <td>
        `OUTER_JOIN`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Files Delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Regex
      </td>

      <td>
        `merge.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Join Headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Regex
      </td>

      <td>
        `push.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Join Headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Regex
      </td>

      <td>
        `jointx.*.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Join Headers
      </td>

      <td>
        `mobile`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Joined Filename
      </td>

      <td>
        `merged3_now():format('yyyy-MM-dd').csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Join Use Case
      </td>

      <td>
        `NONE`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Is Headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Is Headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Is Headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Headers
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Merge Based on Name
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 1 Template
      </td>

      <td>
        `File_1_{'<common>'}.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 2 Template
      </td>

      <td>
        `File_2_{'<common>'}.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        File 3 Template
      </td>

      <td>
        `File_3_{'<common>'}.csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Use Alphabetical Sort
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>
        [**Rebuild-headers**](https://docs.capillarytech.com/docs/transform-headers-block)<br />Type: `transform_header_data`
      </td>

      <td>
        Output Headers Order
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Output File Delimiter
      </td>

      <td>
        `,`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Output Filename
      </td>

      <td>
        `merge_now():format('yyyy-MM-dd').csv`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Headers Mapping
      </td>

      <td>
        `{'{"source":"source","loyaltyType":"loyaltyType",  
                                "accountId":"accountId",  
                                "identifierType":"identifierType",  
                                "identifierValue":"identifierValue"  
                                ,"mobile":"mobile",  
                                "wechat":"wechat","gender":"gender"}'}`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Is Headerless
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Headerless Mapping
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>
        [**Encrypt-data**](https://docs.capillarytech.com/docs/pgp-encrypt-block)<br />Type: `encrypt_content`
      </td>

      <td>
        Encryption Algorithm
      </td>

      <td>
        `PGP`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Public Key File
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Public Key User ID
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Is Enabled
      </td>

      <td>
        `false`
      </td>
    </tr>

    <tr>
      <td>
        [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write`
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
        `capillary`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Password
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Remote Path
      </td>

      <td>
        `null`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Create Remote Directory
      </td>

      <td>
        `true`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Conflict Resolution
      </td>

      <td>
        `IGNORE`
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Zip Files
      </td>

      <td>
        `true`
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
        Output File Name
      </td>

      <td>
        `${'${filename }'}`. Uses the source filename.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Private Key Path
      </td>

      <td>
        Redacted
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Key Passphrase
      </td>

      <td>
        Redacted
      </td>
    </tr>
  </tbody>
</Table>

## SFTP to SFTP merge 4 files join with encrypt and decrypt

Downloads four files from an SFTP server, decrypts them, unzips, joins, remaps headers, encrypts the output, zips, and pushes it to an SFTP server.

**Use case**

A brand consolidates four encrypted source files into a single encrypted output and delivers it to a destination SFTP location. This template handles all steps from decryption through to re-encryption and transfer in one scheduled run.

### Block configuration

The following table lists the blocks in the SFTP to SFTP Merge 4 Files Join with Encrypt and Decrypt template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                            | Configuration Field          | Configured Value                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`                   | Hostname                     | `data.capillarydata.com`                                                                                                                                                                                  |
|                                                                                                                       | Username                     | `null`                                                                                                                                                                                                    |
|                                                                                                                       | Source Directory             | `/tmp/`                                                                                                                                                                                                   |
|                                                                                                                       | Filename Pattern             | `.*.csv`. Matches all CSV files.                                                                                                                                                                          |
|                                                                                                                       | Processed Directory          | `null`                                                                                                                                                                                                    |
|                                                                                                                       | Unzip Files                  | `false`                                                                                                                                                                                                   |
|                                                                                                                       | API Error File Path          | `null`                                                                                                                                                                                                    |
|                                                                                                                       | Search Directory Recursively | `false`                                                                                                                                                                                                   |
|                                                                                                                       | Port                         | `22`                                                                                                                                                                                                      |
|                                                                                                                       | File Delimiter               | `,`                                                                                                                                                                                                       |
|                                                                                                                       | Report Status Code           | `all`                                                                                                                                                                                                     |
| [**Decrypt-data**](https://docs.capillarytech.com/docs/pgp-decrypt-block)<br />Type: `decrypt_content`                | Encryption Algorithm         | `PGP`                                                                                                                                                                                                     |
|                                                                                                                       | Private Key File             | Redacted                                                                                                                                                                                                  |
|                                                                                                                       | Private Passphrase           | Redacted                                                                                                                                                                                                  |
|                                                                                                                       | Is Enabled                   | `false`                                                                                                                                                                                                   |
| [**Ok-file**](https://docs.capillarytech.com/docs/ok-file-block)<br />Type: `ok_file_3`                               | —                            | —                                                                                                                                                                                                         |
| [**Join-data**](https://docs.capillarytech.com/docs/join-files-4-block)<br />Type: `four_join`                        | File 1–2 Join Type           | `OUTER_JOIN`                                                                                                                                                                                              |
|                                                                                                                       | File 1–3 Join Type           | `OUTER_JOIN`                                                                                                                                                                                              |
|                                                                                                                       | File 1–4 Join Type           | `OUTER_JOIN`                                                                                                                                                                                              |
|                                                                                                                       | Files Delimiter              | `,`                                                                                                                                                                                                       |
|                                                                                                                       | File 1 Regex                 | `one.*.csv`                                                                                                                                                                                               |
|                                                                                                                       | File 1 Join Headers          | `mobile`                                                                                                                                                                                                  |
|                                                                                                                       | File 2 Regex                 | `two.*.csv`                                                                                                                                                                                               |
|                                                                                                                       | File 2 Join Headers          | `mobile`                                                                                                                                                                                                  |
|                                                                                                                       | File 3 Regex                 | `3.*.csv`                                                                                                                                                                                                 |
|                                                                                                                       | File 3 Join Headers          | `mobile`                                                                                                                                                                                                  |
|                                                                                                                       | File 4 Regex                 | `4.*.csv`                                                                                                                                                                                                 |
|                                                                                                                       | File 4 Join Headers          | `mobile`                                                                                                                                                                                                  |
|                                                                                                                       | Joined Filename              | `merged4files_now():format('yyyy-MM-dd').csv`                                                                                                                                                             |
|                                                                                                                       | File 1 Is Headerless         | `false`                                                                                                                                                                                                   |
|                                                                                                                       | File 1 Headers               | `null`                                                                                                                                                                                                    |
|                                                                                                                       | File 2 Is Headerless         | `false`                                                                                                                                                                                                   |
|                                                                                                                       | File 2 Headers               | `null`                                                                                                                                                                                                    |
|                                                                                                                       | File 3 Is Headerless         | `false`                                                                                                                                                                                                   |
|                                                                                                                       | File 3 Headers               | `null`                                                                                                                                                                                                    |
|                                                                                                                       | File 4 Is Headerless         | `false`                                                                                                                                                                                                   |
|                                                                                                                       | File 4 Headers               | `null`                                                                                                                                                                                                    |
|                                                                                                                       | Use Alphabetical Sort        | `false`                                                                                                                                                                                                   |
|                                                                                                                       | Merge Based on Name          | `false`                                                                                                                                                                                                   |
|                                                                                                                       | File 1 Template              | `File_1_{'<common>'}.csv`                                                                                                                                                                                 |
|                                                                                                                       | File 2 Template              | `File_2_{'<common>'}.csv`                                                                                                                                                                                 |
|                                                                                                                       | File 3 Template              | `File_3_{'<common>'}.csv`                                                                                                                                                                                 |
|                                                                                                                       | File 4 Template              | `File_4_{'<common>'}.csv`                                                                                                                                                                                 |
| [**Rebuild-headers**](https://docs.capillarytech.com/docs/transform-headers-block)<br />Type: `transform_header_data` | Output Headers Order         | `null`                                                                                                                                                                                                    |
|                                                                                                                       | Output File Delimiter        | `,`                                                                                                                                                                                                       |
|                                                                                                                       | Output Filename              | `merge_now():format('yyyy-MM-dd').csv`                                                                                                                                                                    |
|                                                                                                                       | Headers Mapping              | `{'{"source":"source","loyaltyType":"loyaltyType","accountId":"accountId","identifierType":"identifierType","identifierValue":"identifierValue","mobile":"mobile","wechat":"wechat","gender":"gender"}'}` |
|                                                                                                                       | Is Headerless                | `false`                                                                                                                                                                                                   |
|                                                                                                                       | Headerless Mapping           | `null`                                                                                                                                                                                                    |
| [**Encrypt-data**](https://docs.capillarytech.com/docs/pgp-encrypt-block)<br />Type: `encrypt_content`                | Encryption Algorithm         | `PGP`                                                                                                                                                                                                     |
|                                                                                                                       | Public Key File              | Redacted                                                                                                                                                                                                  |
|                                                                                                                       | Public Key User ID           | `null`                                                                                                                                                                                                    |
|                                                                                                                       | Is Enabled                   | `false`                                                                                                                                                                                                   |
| [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write`            | Hostname                     | `data.capillarydata.com`                                                                                                                                                                                  |
|                                                                                                                       | Username                     | `capillary`                                                                                                                                                                                               |
|                                                                                                                       | Password                     | Redacted                                                                                                                                                                                                  |
|                                                                                                                       | Remote Path                  | `null`                                                                                                                                                                                                    |
|                                                                                                                       | Create Remote Directory      | `true`                                                                                                                                                                                                    |
|                                                                                                                       | Conflict Resolution          | `IGNORE`                                                                                                                                                                                                  |
|                                                                                                                       | Zip Files                    | `true`                                                                                                                                                                                                    |
|                                                                                                                       | Port                         | `22`                                                                                                                                                                                                      |
|                                                                                                                       | Output File Name             | `${'${filename }'}`. Uses the source filename.                                                                                                                                                            |
|                                                                                                                       | Private Key Path             | Redacted                                                                                                                                                                                                  |
|                                                                                                                       | Key Passphrase               | Redacted                                                                                                                                                                                                  |

## SFTP to SFTP transfer

Transfers files from one SFTP server to another. Supports optional encryption and decryption as part of the transfer.

**Use case**

A brand needs to move files generated by the Data Export Framework in Insights+ from a Capillary SFTP location to a destination SFTP server managed by a partner or internal team. When data security is required, the template can decrypt the source file and encrypt the output before delivery. Encryption and decryption are both optional and can be used independently or together.

### Block configuration

The following table lists the blocks in the SFTP to SFTP Transfer template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                                      | Configuration Field          | Configured Value                                |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------- |
| [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`                             | Hostname                     | `data.capillarydata.com`                        |
|                                                                                                                                 | Username                     | `null`                                          |
|                                                                                                                                 | Source Directory             | `/tmp/`                                         |
|                                                                                                                                 | Filename Pattern             | `.*.csv`. Matches all CSV files.                |
|                                                                                                                                 | Processed Directory          | `null`                                          |
|                                                                                                                                 | Unzip Files                  | `false`                                         |
|                                                                                                                                 | API Error File Path          | `null`                                          |
|                                                                                                                                 | Search Directory Recursively | `false`                                         |
|                                                                                                                                 | Port                         | `22`                                            |
|                                                                                                                                 | File Delimiter               | `,`                                             |
|                                                                                                                                 | Report Status Code           | `all`                                           |
| [**Decrypt-data**](https://docs.capillarytech.com/docs/pgp-decrypt-block)<br />Type: `decrypt_content`                          | Encryption Algorithm         | `PGP`                                           |
|                                                                                                                                 | Private Key File             | Redacted                                        |
|                                                                                                                                 | Private Passphrase           | Redacted                                        |
|                                                                                                                                 | Is Enabled                   | `false`                                         |
| [**Data-Validation-Block**](https://docs.capillarytech.com/docs/databricks-validation-block)<br />Type: `databricks_validation` | Databricks Job ID            | Not configured                                  |
|                                                                                                                                 | Is Enabled                   | `false`                                         |
| [**Encrypt-data**](https://docs.capillarytech.com/docs/pgp-encrypt-block)<br />Type: `encrypt_content`                          | Encryption Algorithm         | `PGP`                                           |
|                                                                                                                                 | Public Key File              | Redacted                                        |
|                                                                                                                                 | Public Key User ID           | `null`                                          |
|                                                                                                                                 | Is Enabled                   | `false`                                         |
| [**hash-csv-fields**](https://docs.capillarytech.com/docs/hashing-csv-block)<br />Type: `hash_csv_columns`                      | Enabled                      | `false`                                         |
|                                                                                                                                 | Hashing Algorithm            | `SHA-256`                                       |
|                                                                                                                                 | Headers to be Hashed         | `null`. No columns are specified.               |
|                                                                                                                                 | Delimiter                    | `,`                                             |
| [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write`                      | Hostname                     | `data.capillarydata.com`                        |
|                                                                                                                                 | Username                     | `capillary`                                     |
|                                                                                                                                 | Password                     | Redacted                                        |
|                                                                                                                                 | Remote Path                  | `null`                                          |
|                                                                                                                                 | Create Remote Directory      | `true`                                          |
|                                                                                                                                 | Conflict Resolution          | `IGNORE`                                        |
|                                                                                                                                 | Zip Files                    | `true`                                          |
|                                                                                                                                 | Port                         | `22`                                            |
|                                                                                                                                 | Output File Name             | `${'${filename } '}`. Uses the source filename. |
|                                                                                                                                 | Output File Name             | `${filename} `. Uses the source filename.       |
|                                                                                                                                 | Private Key Path             | Redacted                                        |

## SFTP to SFTP with headers definition

Downloads a single file from an SFTP server, unzips it, remaps or defines column headers, zips the output, and pushes it to an SFTP server.

**Use case 1**

A file named `abc.csv` is being transferred from the Capillary server to a brand's server. The columns have headers named `Transaction_value` and `Bill_ID`. The brand requires the file to arrive with column names `TAmount` and `Bill_No` instead. This template renames the headers during transfer without changing the underlying data.

**Use case 2**

A file named `abc.csv` is being transferred from the Capillary server to a brand's server. The columns in the file do not have header names. The brand requires the output file to include column headers. This template adds the defined header names to the file during transfer.

### Block configuration

The following table lists the blocks in the SFTP to SFTP with Headers Definition template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                                              | Configuration Field          | Configured Value                                |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------- |
| [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`                                     | Hostname                     | `data.capillarydata.com`                        |
|                                                                                                                                         | Username                     | `null`                                          |
|                                                                                                                                         | Source Directory             | `/tmp/`                                         |
|                                                                                                                                         | Filename Pattern             | `.`. Matches all files.                         |
|                                                                                                                                         | Processed Directory          | `null`                                          |
|                                                                                                                                         | Unzip Files                  | `false`                                         |
|                                                                                                                                         | API Error File Path          | `null`                                          |
|                                                                                                                                         | Search Directory Recursively | `false`                                         |
|                                                                                                                                         | Port                         | `22`                                            |
|                                                                                                                                         | File Delimiter               | `,`                                             |
|                                                                                                                                         | Report Status Code           | `all`                                           |
| [**Ok-file**](https://docs.capillarytech.com/docs/ok-file-block)<br />Type: `ok_file_3`                                                 | —                            | —                                               |
| [**Decrypt-data**](https://docs.capillarytech.com/docs/pgp-decrypt-block)<br />Type: `decrypt_content`                                  | Encryption Algorithm         | `PGP`                                           |
|                                                                                                                                         | Private Key File             | Not configured                                  |
|                                                                                                                                         | Private Passphrase           | Not configured                                  |
|                                                                                                                                         | Is Enabled                   | `false`                                         |
| [**Define-headers-and-transform-data**](https://docs.capillarytech.com/docs/transform-headers-block)<br />Type: `transform_header_data` | Output Headers Order         | `null`                                          |
|                                                                                                                                         | Output File Delimiter        | `,`                                             |
|                                                                                                                                         | Output Filename              | `null`                                          |
|                                                                                                                                         | Headers Mapping              | Not configured                                  |
|                                                                                                                                         | Is Headerless                | `false`                                         |
|                                                                                                                                         | Headerless Mapping           | `null`                                          |
| [**Encrypt-data**](https://docs.capillarytech.com/docs/pgp-encrypt-block)<br />Type: `encrypt_content`                                  | Encryption Algorithm         | `PGP`                                           |
|                                                                                                                                         | Public Key File              | Not configured                                  |
|                                                                                                                                         | Public Key User ID           | `null`                                          |
|                                                                                                                                         | Is Enabled                   | `false`                                         |
| [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write`                              | Hostname                     | `null`                                          |
|                                                                                                                                         | Username                     | Not configured                                  |
|                                                                                                                                         | Password                     | Not configured                                  |
|                                                                                                                                         | Remote Path                  | `null`                                          |
|                                                                                                                                         | Create Remote Directory      | `false`                                         |
|                                                                                                                                         | Conflict Resolution          | `IGNORE`                                        |
|                                                                                                                                         | Zip Files                    | `false`                                         |
|                                                                                                                                         | Port                         | `22`                                            |
|                                                                                                                                         | Output File Name             | `${'${filename } '}`. Uses the source filename. |
|                                                                                                                                         | Private Key Path             | Not configured                                  |
|                                                                                                                                         | Key Passphrase               | Redacted                                        |

## SFTP to FTP with headers definition

Downloads a single file from an SFTP server, unzips it, remaps or defines column headers, zips the output, and pushes it to an FTP server.

**Use case**

A brand transfers a single file to a partner system that accepts data only via FTP and requires specific column header names. This template remaps or adds headers during the transfer to match the partner's expected format.

### Block configuration

The following table lists the blocks in the SFTP to FTP with Headers Definition template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                                              | Configuration Field          | Configured Value                               |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------- |
| [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`                                     | Hostname                     | `data.capillarydata.com`                       |
|                                                                                                                                         | Username                     | `null`                                         |
|                                                                                                                                         | Source Directory             | `/tmp/`                                        |
|                                                                                                                                         | Filename Pattern             | `.*.csv`. Matches all CSV files.               |
|                                                                                                                                         | Processed Directory          | `null`                                         |
|                                                                                                                                         | Unzip Files                  | `false`                                        |
|                                                                                                                                         | API Error File Path          | `null`                                         |
|                                                                                                                                         | Search Directory Recursively | `false`                                        |
|                                                                                                                                         | Port                         | `22`                                           |
|                                                                                                                                         | File Delimiter               | `,`                                            |
|                                                                                                                                         | Report Status Code           | `all`                                          |
| [**Define-headers-and-transform-data**](https://docs.capillarytech.com/docs/transform-headers-block)<br />Type: `transform_header_data` | Output Headers Order         | `null`                                         |
|                                                                                                                                         | Output File Delimiter        | `,`                                            |
|                                                                                                                                         | Output Filename              | `null`                                         |
|                                                                                                                                         | Headers Mapping              | Not configured                                 |
|                                                                                                                                         | Is Headerless                | `false`                                        |
|                                                                                                                                         | Headerless Mapping           | `null`                                         |
| [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write`                              | Hostname                     | `data.capillarydata.com`                       |
|                                                                                                                                         | Username                     | Not configured                                 |
|                                                                                                                                         | Remote Path                  | `null`                                         |
|                                                                                                                                         | Create Remote Directory      | `false`                                        |
|                                                                                                                                         | Conflict Resolution          | `IGNORE`                                       |
|                                                                                                                                         | Zip Files                    | `false`                                        |
|                                                                                                                                         | Port                         | `21`                                           |
|                                                                                                                                         | Output File Name             | `${'${filename }'}`. Uses the source filename. |
|                                                                                                                                         | Private Key Path             | `null`                                         |
|                                                                                                                                         | Key Passphrase               | `null`                                         |

## FTP to S3

Transfers files from an FTP or SFTP server to an AWS S3 bucket.

**Use case**

A brand stores processed output files on an FTP server and needs to archive them in an S3 bucket for downstream processing or long-term storage. This template picks up the file from FTP and uploads it to the configured S3 bucket and path in a single scheduled operation.

### Block configuration

The following table lists the blocks in the FTP to S3 template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                             | Configuration Field              | Configured Value                               |
| ------------------------------------------------------------------------------------------------------ | -------------------------------- | ---------------------------------------------- |
| [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`    | Hostname                         | `data.capillarydata.com`                       |
|                                                                                                        | Username                         | `null`                                         |
|                                                                                                        | Source directory                 | `/tmp/`                                        |
|                                                                                                        | Filename pattern                 | `.*.csv`. Matches all CSV files.               |
|                                                                                                        | Processed directory              | `null`                                         |
|                                                                                                        | Unzip files                      | `false`                                        |
|                                                                                                        | API error file path              | `null`                                         |
|                                                                                                        | Search directory recursively     | `false`                                        |
|                                                                                                        | Port                             | `22`                                           |
|                                                                                                        | File delimiter                   | `,`                                            |
|                                                                                                        | Report status code               | `all`                                          |
| [**Connect-to-destination**](https://docs.capillarytech.com/docs/s3_write-block)<br />Type: `s3_write` | S3 object key                    | `${'${filename }'}`. Uses the source filename. |
|                                                                                                        | S3 bucket name                   | `null`                                         |
|                                                                                                        | Content type                     | `application/octet-stream`                     |
|                                                                                                        | Access key                       | `null`                                         |
|                                                                                                        | Secret key                       | Redacted                                       |
|                                                                                                        | AWS region                       | `us-east-1`                                    |
|                                                                                                        | AWS credentials provider service | `null`                                         |

## CSV to XML conversion

Converts CSV files to XML format and delivers the converted file to a destination SFTP server. Supports optional encryption of the output file.

**Use case**

A data analyst receives data from various departments as CSV files containing fields such as product ID, product name, and price. The downstream system ingests data only in XML format. XML's hierarchical structure also makes the data easier for both humans and automated systems to interpret. Using this template, the analyst converts all CSV files to XML on a schedule, removing the need for manual conversion before delivery.

### Block configuration

The following table lists the blocks in the CSV to XML conversion template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                                | Configuration Field          | Configured Value                 |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------- |
| [**Connect-to-source**](https://docs.capillarytech.com/docs/sftp-read-block)<br />Type: `sftp_read`                       | Hostname                     | `data.capillarydata.com`         |
|                                                                                                                           | Source Directory             | `/tmp/`                          |
|                                                                                                                           | Filename Pattern             | `.*.csv`. Matches all CSV files. |
|                                                                                                                           | Processed directory          | `null`                           |
|                                                                                                                           | Unzip files                  | `false`                          |
|                                                                                                                           | API error file path          | `null`                           |
|                                                                                                                           | Search directory recursively | `false`                          |
|                                                                                                                           | Port                         | `22`                             |
|                                                                                                                           | Report Status Code           | `all`                            |
| [**Decrypt-data**](https://docs.capillarytech.com/docs/pgp-decrypt-block)<br />Type: `decrypt_content`                    | Encryption Algorithm         | `PGP`                            |
|                                                                                                                           | Private key file             | Redacted                         |
|                                                                                                                           | Private passphrase           | Redacted                         |
|                                                                                                                           | Is enabled                   | `false`                          |
| [**Ok-file**](https://docs.capillarytech.com/docs/ok-file-block)<br />Type: `ok_file_3`                                   | —                            | —                                |
| [**CSV-to-XML-converter**](https://docs.capillarytech.com/docs/transfer-csv-to-xml-block)<br />Type: `convert_csv_to_xml` | XML top                      | `<xml>`                          |
|                                                                                                                           | XML file name                | `output.xml`                     |
|                                                                                                                           | XML repeating component      | `<repeat></repeat>`              |
|                                                                                                                           | Input file delimiter         | `,`                              |
|                                                                                                                           | XML bottom                   | `</xml>`                         |
| [**Encrypt-data**](https://docs.capillarytech.com/docs/pgp-encrypt-block)<br />Type: `encrypt_content`                    | Encryption algorithm         | `PGP`                            |
|                                                                                                                           | Public key file              | Redacted                         |
|                                                                                                                           | Is enabled                   | `false`                          |
| [**Connect-to-destination**](https://docs.capillarytech.com/docs/sftp-write-block)<br />Type: `sftp_write`                | Hostname                     | `data.capillarydata.com`         |
|                                                                                                                           | Username                     | `null`                           |
|                                                                                                                           | Password                     | Redacted                         |
|                                                                                                                           | Destination directory        | `/tmp/`                          |
|                                                                                                                           | Port                         | `22`                             |
|                                                                                                                           | Conflict strategy            | `IGNORE`                         |
|                                                                                                                           | Retain source filename       | `true`                           |