---
updatedAt: 2026-04-22T13:32:07.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

Frequently asked questions about Connect+.

## Extension Configurations

**Why doesn't my config appear in the dropdown when I configure a block?**

Check that **isSecret** is turned on for sensitive fields such as passwords, tokens, and client secrets. Configs without isSecret enabled don't appear in the block configuration dropdown. The isSecret setting can't be changed after the config is created. Delete the config and recreate it with isSecret turned on.

**How do I update an existing config value?**

Use the same **Add Config** form in Dev Console. Enter the existing config name and the new value. The system recognizes the name as an existing entry and treats the submission as an update. The change goes through the same approval process and stays in the Pending state until it is approved.

**How do I apply updated config values to a running dataflow without reconfiguring each block?**

Use the **Sync** option on the dataflow. Open the dataflow, click the sync icon in the top-right corner of the canvas, review the diff between the current config and the latest from Extension Configurations, and click **Sync now**. The dataflow applies the latest values across all blocks without restarting.

**What values should I store in Extension Configurations?**

Store all connection details and credentials your blocks need. This includes non-sensitive values such as SFTP hostnames, folder paths, and FTP directories, and sensitive values such as usernames, passwords, API keys, and client secrets. Mark sensitive values as isSecret.

## Dataflow lifecycle

**Can I edit a Live dataflow?**

Not directly. When a dataflow is approved, Connect+ automatically creates the next version in Draft state. Make all edits in that draft version and submit it for approval. The Live version continues processing without interruption.

**Can I delete a dataflow?**

No. Connect+ dataflows can't be deleted. You can deactivate a dataflow using the **Pause** or **Stop** controls on a Live dataflow.

**What happens if I approve a new version while the previous version is still processing files?**

Connect+ doesn't interrupt active processing. It registers an async update. Files already in progress complete on the current version. The system then switches to the newly approved version automatically.

**What happens when a dataflow is rejected?**

The dataflow moves to the Rejected state. Click **Edit** on the canvas to revert it to Draft state, fix the issues, and resubmit for approval. You can also use aiRA Coder to edit and fix the dataflow before resubmitting.

## Creating dataflows

**What are the three ways to create a dataflow?**

Connect+ provides three creation methods: manually using the drag-and-drop canvas, using aiRA Coder with a natural language prompt, and copying a global template from another organization using aiRA Coder.

**How many tags can I add to a dataflow?**

Up to five tags per dataflow. Each tag has a maximum length of 15 characters.

## Block configuration

**Why should I select credentials from the dropdown instead of entering them directly?**

Credentials in Extension Configurations are centrally managed. Selecting from the dropdown keeps sensitive values out of the dataflow configuration. When a credential is rotated, syncing the dataflow updates all blocks in a single step without manual reconfiguration.

**What is the traceable identifier in the Kafka read block?**

The traceable ID is a unique identifier attached to each Kafka message that tracks the message as it moves through the dataflow. In the **Headers as Attribute** field, select **Traceable Id** to extract only this identifier, or select **All** to extract all message headers.

## Alerts and monitoring

**How does Connect+ notify me when something goes wrong?**

Connect+ sends email alerts when a dataflow encounters a critical issue. Each alert shows what went wrong, identifies the failing block, and links to the affected dataflow so you can take action.

**What signals does Connect+ monitor?**

Connect+ monitors three signals across your dataflows: throughput per minute, processing latency, and error rate.

**Where do I monitor dataflow performance?**

From the **Platform Metrics** tab in Dev Console. Configure alert thresholds from **[Alert Management](https://docs.capillarytech.com/docs/alert-management)**. For more information, see [Connect+ performance in Dev Console](https://docs.capillarytech.com/docs/platform-metrics#connect-platform-metrics).

<br />