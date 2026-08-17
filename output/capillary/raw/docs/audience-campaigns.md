---
updatedAt: 2026-04-22T05:24:43.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Audience & Campaigns

Templates for syncing audience data and reloading campaign segments from SFTP.

Audience and campaigns templates let you manage audience lists and campaign-related customer data in Engage+. Each template provides a pre-configured block sequence for a specific use case. Select a template, configure the block details for your environment, and deploy the dataflow.

The following templates are available for audience and campaigns.

## Audience reload from SFTP

Refreshes files in a defined FTP location at specified intervals and automatically updates the matching audience list in Engage+. The template reads the updated audience file from FTP, pushes it to the configured S3 bucket, and calls the Iris audience reload API to update the list.

**Prerequisites**

* The audience CSV file must be available in the FTP location.
* An audience list must be created in the Engage+ Audience Manager before configuring this template. The audience list name must match the name used in the template configuration and must not contain any spaces. For example, FTP\_Test is a valid name; FTP Test is not.

**Use case**

A brand runs a recurring campaign that targets a customer segment updated daily from an external data source outside the Capillary database. The updated customer list is generated in Databricks each day and placed in an FTP location. Using this template, the brand configures a scheduled dataflow that picks up the new file, pushes it to S3, and triggers a reload of the corresponding Engage+ audience list. The campaign then runs against the refreshed audience, removing the need for manual list updates before each send.

### Block configuration

The following table lists the blocks in the Audience reload from SFTP template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                                                  | Configuration Field    | Configured Value                              |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------- |
| **[Connect-to-source](https://docs.capillarytech.com/docs/sftp-read-block)**<br />Type: `sftp_read`                                         | Hostname               | `data.capillarydata.com`                      |
|                                                                                                                                             | Username               | `capillary`                                   |
|                                                                                                                                             | Password               | Redacted                                      |
|                                                                                                                                             | Source directory       | `/capillary testing/vtest/source`             |
|                                                                                                                                             | Filename pattern       | `.*.csv`. Matches all CSV files.              |
|                                                                                                                                             | Processed directory    | `/capillary testing/vtest/process`            |
|                                                                                                                                             | API error file path    | `/capillary testing/vtest/error`              |
|                                                                                                                                             | Port                   | `22`                                          |
|                                                                                                                                             | File delimiter         | `,`                                           |
|                                                                                                                                             | Report status code     | `all`                                         |
| **[Push-to-S3](https://docs.capillarytech.com/docs/push-to-s3)**<br />Type: `s3_write`                                                      | S3 object key          | `${'${filename}'}`. Uses the source filename. |
|                                                                                                                                             | S3 bucket name         | `newValue`                                    |
|                                                                                                                                             | Content type           | `application/octet-stream`                    |
|                                                                                                                                             | AWS region             | `us-east-1`                                   |
| **[Destination-Iris-audience](https://docs.capillarytech.com/docs/iris_ftp_audience_refresh-block)**<br />Type: `iris_ftp_audience_refresh` | API method             | `POST`                                        |
|                                                                                                                                             | API URL                | `/`                                           |
|                                                                                                                                             | Organization ID header | Not configured                                |
|                                                                                                                                             | Capillary token        | Not configured                                |

<br />