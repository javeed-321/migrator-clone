---
updatedAt: 2026-04-22T05:22:08.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create and Manage Connect+ Dataflows

How to create and manage dataflow

You can create a dataflow in Connect+ to define how data is ingested, transformed, and routed from a source to a destination.

Connect+ provides three ways to create a dataflow:

* A visual drag-and-drop canvas for manual configuration
* aiRA Coder, the built-in AI assistant, using natural language prompts
* Global dataflow templates copied into your organization using aiRA Coder

For full details on aiRA Coder and how to use it, see aiRA Coder.

When you create a new dataflow, it is assigned the Draft state by default. You must complete all structural changes and block configurations in this state.

## Method 1: Create a dataflow manually

To compose a dataflow using the drag-and-drop canvas:

1. Navigate to the Connect+ extension portal and select the organization where you want to create the dataflow.
2. Click **Create new dataflow**.
3. Enter a unique name in the **Name** field.
4. Optionally, assign tags to categorize the dataflow.
5. Click **Done**.
   The dataflow appears on the Dataflows page under the My Dataflows tab.
6. On the Dataflows page, click your dataflow.
   The version listing page opens, showing the dataflow as version v1 in Draft status.
7. Click version v1.
   The canvas opens with the Trigger block.
8. Add blocks by clicking a node. Blocks do not follow a fixed sequence. Arrange them based on your data flow requirements.
9. Click a block to open its properties panel and configure the required fields.
   For source and destination blocks, select all connection values from the dropdown rather than entering them directly. This includes non-sensitive values such as hostnames and directory paths, and sensitive values such as usernames, passwords, and API keys. These values are stored in [Extension Configurations](https://docs.capillarytech.com/docs/extension-configuration).
10. Click **Save**.
11. Click **Send for Approval** to submit the dataflow for review.

## Method 2: Create a dataflow using aiRA Coder

You can describe your requirement in plain language, and aiRA Coder generates the full block sequence, including transformation scripts. This is the fastest way to start a new dataflow when building from scratch.

For step-by-step instructions and example prompts, see the [Create a dataflow section in aiRA Coder](https://docs.capillarytech.com/docs/aira-coder#create-a-dataflow).

## Method 3: Copy from global templates

You can use aiRA Coder to copy a global template from another organization or cluster directly into your dataflow store. The copied dataflow is saved in Draft state and is associated with your account. This removes the need to recreate common integration patterns from scratch.

For step-by-step instructions, see the [Copy and paste a dataflow section in aiRA Coder](https://docs.capillarytech.com/docs/aira-coder#copy-and-paste-a-dataflow).

# Review and approve a dataflow

After saving a dataflow, it must go through an approval process before it can be used. Before sending it for review, you can view the code differences between the current and previous versions.

Only users with Admin access can review, approve, or reject a dataflow.

### Send a dataflow for approval

1. Navigate to the Connect+ UI and open the main listing page.
2. Select the dataflow you want to send for approval.
3. Click **Send for approval**.

   <Image align="center" border={true} src="https://files.readme.io/539ed5105833e2181c576670ff65b4bef044b4427e6ef92e5b9a6e58af65aae8-sendforapproval-dataflow.png" className="border" />
4. Click **Yes** on the confirmation modal.

   <Image align="center" border={true} src="https://files.readme.io/c91664ca040d8a1e26df9e5d9af7fda20ef5e137c75ae8ebc56c80d387f45324-yes-dataflow_approval.png" className="border" />

The dataflow moves to the Awaiting Approval state.

### Review a dataflow

When a dataflow is submitted for approval, the reviewer can compare the new version with previous versions before approving.

1. Navigate to the Connect+ UI and open the main listing page.
2. Select the dataflow in the **Awaiting Approval** state.
3. On the dataflow canvas, click **Send for approval**.
   The Review changes modal appears.

   <Image align="center" border={true} src="https://files.readme.io/4b27b68464f432dec349c8e98554077650a4b62484ce829677f8b211208ebcb2-sendforapproval-dataflow.png" className="border" />
4. Select the two versions you want to compare.

   <Image align="center" border={true} src="https://files.readme.io/9c33ca07e7de4c3f38b6a8a94918b985545a68cb017200ca2ebb743c4d951f32-code-diff.png" className="border" />
5. After reviewing the changes, click **Accept** or **Reject**.
6. Click **Yes** on the confirmation modal.

If approved, the dataflow moves to the Approved state. The system automatically creates the next version in `Draft` state for future updates.

If rejected, the dataflow moves to the Rejected state. You can edit it after reverting it to `Draft` state.

<Callout icon="📘" theme="info">
  **Note**

  If you approve a new version while a previous version is `Live` and actively processing files, the system does not interrupt ongoing processing. Connect+ registers an Async Update. Active files complete processing on the current version. The system then automatically switches to the newly approved `Live` version.
</Callout>

## Edit a dataflow

You can edit a dataflow only when it is in the `Draft` state. This ensures that active production dataflows are not disrupted.

### If the dataflow is Live

When a version is made `Live`, the system automatically generates the next version in `Draft` state. Apply all updates to this newly generated draft. The Live version continues processing without interruption.

### If the dataflow is Rejected

1. Open the dataflow.
2. Click **Edit** on the canvas.
3. Confirm the action.

The dataflow transitions back to Draft state, allowing you to apply the required changes.

### Edit a dataflow manually

1. Navigate to the Connect+ UI and select your organization.
2. Locate the required dataflow from the listing page and open it.
3. On the version listing page, select the version in `Draft` state.
4. Perform edits on the canvas. You can:
   * **Modify a block**: Select a block to open its properties panel. Update configurations such as API endpoints, file delimiters, or expression logic.
   * **Add a block**: Select the output node of an existing block and choose a new block from the drop-down list.
   * **Delete a block**: Hover over the block, select the delete icon, and confirm the action.
   * **Modify connections**: Drag connector lines between blocks to change the execution sequence.
5. Click **Save** to store your changes.
6. Click **Send for Approval** to submit the updated version for review.

### Edit a dataflow using aiRA Coder

You can also use aiRA Coder to modify a dataflow in Draft state using a natural language prompt. Supported changes include adding or removing blocks, updating script logic, changing validation conditions, and reconfiguring block properties.

For step-by-step instructions and example prompts, see the Modify a dataflow section in [Modify a dataflow section in aiRA Coder.](https://docs.capillarytech.com/docs/aira-coder)

## Making a version live

An approved version of a dataflow can be made `Live`.

To make a dataflow version `Live`,

1. Open the **Dataflow** page and select the dataflow you want to make `Live`.

2. On the Version Listing page, click the approved version you want to make Live.\
   The dataflow composing page opens.

3. Click **Make Live**.\
   A confirmation message appears.

4. Click **Yes** on the confirmation message.

**Note**:

* It takes around 10 minutes for a version to become `Live`.
* Only one approved version of a dataflow can be Live at any time.
* You can roll back one version and make another version Live.

<Image align="center" border={true} src="https://files.readme.io/9a6ce0cb13a399e867648bcec3df03f068cdd01d0e38589a5d816ac3765e9685-Screenshot_2026-04-13_at_5.17.23_PM.png" className="border" />

## Pause and stop a dataflow

Use these controls to temporarily or permanently halt a live dataflow without deleting it.

### Pause a dataflow

Pausing stops the dataflow from picking up new files. Files already in processing complete before the dataflow stops. Use this for temporary or safe deactivation.

To pause a dataflow,

1. Navigate to the Connect+ UI and select your organization.
2. Open the live dataflow that you want to pause, click **Pause dataflow**.\
   A confirmation modal appears.

   <Image align="center" border={true} src="https://files.readme.io/8e02e7c2e75208613219725bf82c4827dad65daa7e0dc4eef414ed270e2d0339-Screenshot_2026-04-13_at_5.57.02_PM.png" className="border" />
3. Click **Pause**.\
   The dataflow is paused.

   <Image align="center" border={true} src="https://files.readme.io/2e5ec3665106143ee9f9af9fa2b7723e8fff14e09eb47d9491e5020674efb6d0-Screenshot_2026-04-13_at_6.00.01_PM.png" className="border" />

### Stop a dataflow

Stopping immediately halts all processing. No new files are picked up, and any file currently being processed is terminated.

To stop a dataflow,

1. Navigate to the Connect+ UI and select your organization.
2. Open the live dataflow that you want to stop, click **Stop dataflow**.\
   A confirmation modal appears.

   <Image align="center" border={true} src="https://files.readme.io/a9f62288124b119e250839ca71b81c44c80989d3f73c2e7232d4a4c85160474a-Screenshot_2026-04-13_at_6.06.21_PM.png" className="border" />
3. Click **Stop**.\
   The dataflow is stopped.

   <Image align="center" border={true} src="https://files.readme.io/50f9edd3ba11a7dc0b062fe27d0911d0e897276bfb8036001a78e15465f39daa-Screenshot_2026-04-13_at_6.08.40_PM.png" className="border" />

### Start a dataflow

Use Start to resume a dataflow that was paused or stopped.

1. Navigate to the Connect+ UI and select your organization.
2. Open the live dataflow that you want to start, and click **Start dataflow**.\
   A confirmation modal appears.

   <Image align="center" border={true} src="https://files.readme.io/071fc685fe376d6524aa7f98ab6d986dc3723698750baa3b19a3ecfab2d6ccda-Screenshot_2026-04-13_at_6.17.42_PM.png" className="border" />
3. Click **Start**.\
   The dataflow resumes polling the configured source for new files.

<Image align="center" border={true} src="https://files.readme.io/37413fccb5e467cdca84f5b65099281952844cdc5ad76a78e58798477d7ac633-Screenshot_2026-04-13_at_6.22.18_PM.png" className="border" />

# Deactivating a dataflow

A Connect+ dataflow can't be deleted. However, ypou can deactivate the dataflow.
**Note**: A dataflow is active by default when created.

The following are the steps to deactivate a dataflow.

1. Navigate to the Connect+ UI and select your organization.
2. In the **My Dataflows** tab, use the search bar to find the dataflow you want to deactivate.
3. Click on the dataflow.\
   The dataflow version page opens.
4. In the dataflow version page, click the ellipsis menu.
5. Click **Deactivate dataflow**.\
   A confirmation modal appears.
6. Click **Yes**.

The dataflow is deactivated.

<Image align="center" border={true} src="https://files.readme.io/1bd4d9ffac6f7d14de465b866a6553068aab8675c523c6d9240b18585ecbd73b-Screenshot_2026-04-13_at_6.26.26_PM.png" className="border" />

# Activating a dataflow

You can activate a deactivated dataflow.

To activate,

1. Navigate to the Connect+ UI and select your organization.
2. In the **My Dataflows** tab, use the search bar to find the dataflow you want to activate.
3. Click on the dataflow.\
   The dataflow version page opens.
4. In the dataflow version page, click the ellipsis menu.
5. Click **Activate dataflow**.\
   A confirmation modal appears.
6. Click **Yes**.\
   The dataflow is activated.

   <Image align="center" border={true} src="https://files.readme.io/233d45b7643b6336228c655295da8ee262a1ad525f471c9b9494c34444362cf0-Screenshot_2026-04-13_at_6.32.45_PM.png" className="border" />

<br />