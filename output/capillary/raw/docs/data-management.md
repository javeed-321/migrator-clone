---
updatedAt: 2026-04-22T05:25:07.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Data Management

Templates for data reconciliation, PII cleanup, customer status updates, and triggering Databricks jobs.

Data management templates handle data quality, compliance, reconciliation, and administrative setup within the Capillary platform. Each template provides a pre-configured block sequence for a specific use case. Select a template, configure the block details for your environment, and deploy the dataflow.

The following templates are available for data management.

## Data reconciliation (SFTP)

Compares source data from an FTP or SFTP location against the data in the Insights+ backend to identify events that were missed during ingestion into Capillary. The template marks missing records in the output file and stores the results in a configured directory for further action.

In the output file, the template adds a column called `CAP_API_STATUS`. Missing records are marked with 0 and existing records are marked with 1. You can use the output file with a transaction add or customer add template to re-ingest the missing records.

<Callout icon="📘" theme="info">
  **Note:**

  Data in the Insights+ backend has a one-day delay because the ETL process runs once every night. Schedule the reconciliation trigger at least 12 to 24 hours after the ETL completes to ensure new data is not incorrectly marked as missing.
</Callout>

**Use case**

On January 1st, 2022, 100 transaction events were expected to be recorded in the Capillary platform. Due to an integration issue, only 90 events were successfully ingested, leaving 10 missing. Using this template, the brand compares the source data file against the Insights+ backend, identifies the 10 missing events, and uses the reconciliation output to re-ingest them without requiring a full data export from the platform.

### Block configuration

The following table lists the blocks in the Data reconciliation (SFTP) template, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                                                                 | Configuration Field | Configured Value                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------- |
| **[Connect-to-source](https://docs.capillarytech.com/docs/credential_aware_ftp_listing-block)**<br />Type: `credential_aware_ftp_listing`                  | Host                | `data.capillarydata.com`         |
|                                                                                                                                                            | Username            | `null`                           |
|                                                                                                                                                            | Password            | Redacted                         |
|                                                                                                                                                            | Source path         | `/tmp/`                          |
|                                                                                                                                                            | Filename pattern    | `.*.csv`. Matches all CSV files. |
|                                                                                                                                                            | Processed path      | `/`                              |
|                                                                                                                                                            | Port                | `21`                             |
| **[Ok-file](https://docs.capillarytech.com/docs/ok_file_3-block)**<br />Type: `ok_file_3`                                                                  | —                   | —                                |
| **Map-fields-for-reconciliation**<br />Type: `diff_tool`                                                                                                   | —                   | —                                |
| **[Filter-data](https://docs.capillarytech.com/docs/filter_on_condition-block)**<br />Type: `filter_on_condition`                                          | Filter condition    | `${header_value:notNull()}`      |
| **[Reconciliation-job](https://docs.capillarytech.com/docs/databricks_job_trigger_and_status_check-block)**<br />Type: `databricks_job_trigger_and_status` | —                   | —                                |

<br />