---
updatedAt: 2026-06-18T05:58:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Core Concepts

Key terms and concepts in Connect+ — workspace, dataflow, template, and building block.

## Dataflow

A dataflow is the central unit of work in Connect+. It defines the pipeline from source to destination, including what to read, how to transform it, which API to call, and when to run. Each organization can have multiple dataflows. Each dataflow has its own version history, status, and performance metrics.

Dataflows can be scoped to a single organization or made available more broadly. An organization dataflow is private to the organization it belongs to. A template is defined at the Capillary platform level and is accessible to all organizations within a cluster.

Templates serve as ready-to-use dataflow for common integration patterns. You can copy a template into your organization using Aira Coder, configure it for your specific requirements, and take it through the standard approval process before making it live. This removes the need to build frequently used pipeline structures from scratch.

To create a dataflow, refer to [Creating a dataflow](https://docs.capillarytech.com/docs/creating-and-managing-connect-dataflows).

**Example**: An Add Transaction dataflow connects to an SFTP source, decrypts the file if needed, maps columns to Capillary API fields, and posts the data via the transaction V2 API.

Dataflows in Connect+ support two types of ingestion:

* File-based ingestion — the dataflow is triggered when a file is placed in a monitored source location, such as an SFTP folder.
* Stream-based ingestion — the dataflow continuously consumes messages from a Kafka topic.

**Note:** A single dataflow handles one ingestion type. If you need both file-based and stream-based ingestion for the same data, create separate dataflows for each.

## Block

A block is a modular processing unit within a dataflow. Each block performs a specific operation like reading data, transforming it, validating it, or delivering it to a destination. Blocks are connected in sequence to form the full processing pipeline.

When a dataflow runs, data passes through each block in order. Every block receives input from the preceding block, performs its operation, and passes output to the next.

You can view the different blocks available in Connect+ [here](https://docs.capillarytech.com/docs/connect-building-block-configuration).

**Note:** Each block is configured independently. Block names within a dataflow must be unique and cannot contain spaces or special characters other than underscores.

## Record

When a file-based dataflow processes a file, it splits the file into individual rows after the CSV-to-JSON conversion step. Each row becomes a record, an independent unit of data that flows through the remaining blocks and is processed separately.

A unique request ID is assigned to each record at the point of splitting. This request ID travels with the record through every subsequent block and is used to trace the record's journey in the metrics dashboard and logs.

**Note:** In stream-based dataflows, each Kafka message is treated as a single record. A request ID is assigned to each message.

## Lineage ID

A lineage ID is a unique identifier assigned to each file processed by a file-based dataflow. It groups all records that originated from the same file, allowing you to view aggregate statistics such as total records, success count, and failure count for that specific file.

When you drill down into the metrics dashboard, you can filter by lineage ID to investigate what happened to all records in a particular file.

**Note:** If a dataflow merges two files (for example, a transaction file and a line-item file), each file currently receives its own lineage ID. A future update will introduce a single lineage ID derived from the primary file.

## Version

Connect+ maintains a full version history for every dataflow. Each version represents a complete snapshot of the dataflow's configuration at a point in time.

A [dataflow version](https://docs.capillarytech.com/docs/view-and-organize-dataflows#dataflow-versioning) passes through the following states:&#x20;

<Table>
  <thead>
    <tr>
      <th>
        State
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Draft
      </td>

      <td>
        This is the default state when you create a new dataflow or when the system generates a new version automatically. The canvas is unlocked. You can drag and drop blocks, map fields, and configure Vault Manager credentials.

        When the configuration is complete, click **Save** and then **Send for Approval**.
      </td>
    </tr>

    <tr>
      <td>
        Awaiting approval
      </td>

      <td>
        The dataflow enters this state after you submit it for review. The canvas is temporarily locked for editing. An approver must open the dataflow, click **Review and approve**, and evaluate the changes using the review modal.
      </td>
    </tr>

    <tr>
      <td>
        Rejected
      </td>

      <td>
        If the reviewer finds missing or incorrect configurations, the dataflow is rejected. To make changes, click **Edit** on the canvas. The state reverts to `Draft`. You can then resolve the issues manually before resubmitting.
      </td>
    </tr>

    <tr>
      <td>
        Approved
      </td>

      <td>
        The dataflow has passed governance checks and is ready for production. The configuration remains locked. Click **Make Live** to deploy the dataflow to the processing engine.
      </td>
    </tr>

    <tr>
      <td>
        Live
      </td>

      <td>
        The dataflow is actively deployed and listening for data. It polls an SFTP folder for files or consumes a Kafka stream.
      </td>
    </tr>
  </tbody>
</Table>

When a version is made live, Connect+ automatically creates a new draft version for any future edits. All changes must be made in the latest draft; you cannot edit a version that is live or approved.

Only one version can be live at any time for a given dataflow. If you need to make changes while the current version is processing files, you can use the **pause** option to queue the update until processing completes.

> 📘
>
> **Note**
>
> You can make an older approved version live again at any time by selecting it and following the same approval and go-live steps.

## Dataflow Status

A live dataflow can be in one of three operational states:

| Status  | Meaning                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------- |
| Active  | The dataflow is active and picking up new files or messages for processing.                                             |
| Paused  | The dataflow is not picking up new files, but any files currently in processing will complete.                          |
| Stopped | The dataflow has been fully halted. All in-progress processing is cleared. Files must be re-sent to be processed again. |

Use **pause** when you want to deploy a configuration update without losing files that are in processing. Use **stop** when you want to fully halt a dataflow, for example, during maintenance.<br />Refer [Pause and stop a dataflow](https://docs.capillarytech.com/docs/creating-and-managing-connect-dataflows#pause-and-stop-a-dataflow) to see how to change the status.

## Template

A template is a pre-built dataflow configuration designed for a common integration pattern. Templates include all the necessary blocks, default configurations, and transformation scripts required for a specific task  such as adding customers, processing transactions, or reconciling data.

You can use a template as a starting point and customise it for your org's specific requirements. Templates reduce setup time and help ensure consistency across dataflows that serve similar purposes.

For a full list of available templates, refer to [Explore Templates](https://docs.capillarytech.com/docs/connect-explore-templates).

## Centralizing credentials and connection details

Extension Configurations is a secure store in Dev Console where you save the connection details that your dataflow blocks need. It holds both non-sensitive values such as SFTP hostnames, folder paths, and FTP directories, and sensitive values such as usernames, passwords, and API credentials.

To access [Extension Configurations](https://docs.capillarytech.com/docs/extension-configuration), in Dev Console, through **Extension Configurations**.

When you configure a block that requires a connection detail or credential, you select the relevant value from a dropdown rather than entering it directly. This keeps sensitive values out of the dataflow configuration and makes updates straightforward.

When a credential is rotated, you do not need to update each block individually. Use the **Sync** action on the dataflow to pull the latest values from Extension Configurations across all blocks in a single step.

## Approval Workflow

Before a dataflow version can go live, it must be [reviewed and approved](https://docs.capillarytech.com/docs/creating-and-managing-connect-dataflows#review-and-approve-a-dataflow). This approval step ensures that configuration changes are validated before they affect production data.

The workflow is as follows:

1. The dataflow creator saves the draft and clicks **Send for Approval**.
2. The reviewer reviews the configuration and either approves or rejects it.
3. If approved, the creator can make the version live.

This workflow applies to both new dataflows and updates to existing ones.

## Error File

When a file-based dataflow finishes processing a file, it generates an error file containing all records that failed during ingestion. The error file is written to the output path configured in the dataflow.

Error files are named using the format: `result_<timestamp>_<original_filename>`, making it straightforward to match an error file to the source file that produced it. This error file is available in the SFTP/FTP server in the location mentioned during the block configuration.

In addition to the error file, Connect+ sends an email notification summarising the completed run. The summary includes the dataflow name, file name, ingestion time, total record count, success count, and failure count broken down by block.

## Dev Console

The Dev Console is Capillary's observability and configuration management interface. For Connect+, it provides the metrics dashboard where you can monitor dataflow performance, investigate individual files and records, and review block-level logs.

You can access the Dev Console from within the Connect+ UI by clicking the **[Performace Metrics](https://docs.capillarytech.com/docs/platform-metrics)** option on any dataflow. The Dev Console opens in a new tab, pre-filtered to the selected org and dataflow.

## Metrics and Observability

Connect+ provides real-time visibility into [dataflow performance through the Dev Console ](https://docs.capillarytech.com/docs/monitoring-and-observability-in-connect)metrics dashboard. Key terms used in the dashboard are:

RPM (Records Per Minute) — the rate at which records are being successfully or unsuccessfully processed within a given minute. For long-running files, RPM gives you a live view of ingestion throughput.

Latency (P90 / P95) — the processing time for requests at the 90th and 95th percentile, measured in seconds. P95 latency means 95% of records were processed within that time.

4xx errors — responses indicating a client-side issue, such as a bad request payload or a record that fails API validation (for example, a duplicate customer).

5xx errors — responses indicating a server-side issue with the downstream API.

Error rate — the percentage of records that received an error response within a given time window.

Downstream service — any external system called within the dataflow, such as the Capillary InTouch APIs or Neo APIs. Downstream service metrics are tracked separately to help isolate where errors are originating.

## Alert

An [alert](https://docs.capillarytech.com/docs/monitoring-and-observability-in-connect#alerts) is a notification triggered when a dataflow metric crosses a defined threshold. Alerts help you detect and respond to issues without having to monitor the dashboard continuously.

You can configure alerts based on the following metrics:

* 4xx error rate
* 5xx error rate
* P90 or P95 latency
* Failure percentage
* Retry exhaustion (records that have failed after all retry attempts)

Alerts can be scoped to a specific dataflow or applied across all dataflows for an organization.

## aiRA Coder

[aiRA Coder](https://docs.capillarytech.com/docs/aira-coder) is an AI assistant integrated into the Connect+ UI. It helps you build, understand, and manage dataflows using natural language.

You can use aiRA Coder to:

* Create a dataflow — describe your requirement in plain language and aiRA Coder generates the block sequence, including any required transformation scripts.
* Explain a dataflow — ask aiRA Coder to summarise what an existing dataflow does, and it returns a plain-language description of each block and an overall summary of the flow.
* Copy and paste a dataflow — copy a dataflow's configuration to a clipboard buffer and paste it into a new dataflow in another org, enabling template-based reuse without manual rebuilding.

**Note:** aiRA Coder generates a starting configuration based on your prompt. You should review the output — particularly transformation scripts — and adjust any org-specific field mappings before making the dataflow live.

## Tags

Tags are labels you can assign to dataflows to organise and group them. A dataflow can have one tag. On the dataflow listing page, you can filter by tag to view all dataflows associated with a particular integration, project, or business function.

Tags are optional and do not affect how a dataflow runs.

<br />