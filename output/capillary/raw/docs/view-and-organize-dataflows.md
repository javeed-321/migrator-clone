---
updatedAt: 2026-04-22T05:24:02.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# View and Organize Dataflows

The Connect+ UI provides search, filter, and tag options to help you organize dataflows within your organization.

## View dataflows

You can view all created dataflows on the Connect+ home page. Search for dataflows by name or filter them using tags.

<Image align="center" border={true} src="https://files.readme.io/77b9987f346ac9ada430bb55ec571783794c0ec68d195e8f4b59df98e9746e8a-Screenshot_2026-04-13_at_3.35.07_PM.png" className="border" />

## Organize dataflows using tags

A tag is a label used to categorize dataflows. It helps you group and easily locate related dataflows.

For example, you can assign the tag `Transaction` to all dataflows related to the transaction entity, making them easier to identify and manage.

A tag can be associated with multiple dataflows, but each dataflow can have only one tag. The maximum length of a tag is 15 characters.

To assign a tag, enter a label in the **Tags** field when creating or editing a dataflow in the `Draft` state.

<Image align="center" border={true} src="https://files.readme.io/5cb135379a5e23636ded219958d439b145331241fcd3db4d7531562f1785d63d-Screenshot_2026-04-13_at_3.45.59_PM.png" className="border" />

## Search and filter dataflows

Use the search and filter options on the dataflow listing page to find specific dataflows. You can use text search, tags, or both.

Use **Text search** to enter the full or partial name of a dataflow in the search bar.
Use **Tag** to select a tag from the filter options and view only the dataflows associated with that tag.

<Image align="center" border={true} src="https://files.readme.io/f4e57cea16f2d7015a96a1a88baed887dd0f5f8978a8c9af16378c5b58fe9fb4-Screenshot_2026-04-13_at_3.54.06_PM.png" className="border" />

## View dataflow versions

Connect+ dataflows are version-controlled. When you create a dataflow, it starts as version v1 in the `Draft` state.

When a [version is approved](https://docs.capillarytech.com/docs/creating-and-managing-connect-dataflows#review-and-approve-a-dataflow), the system automatically creates the next version with an incremented number. The new version starts in the `Draft` state and is a copy of the approved version, ready for further updates.

<Image align="center" border={true} src="https://files.readme.io/346b9321e9b78c256830d73d7e84a9e315a6f98f17d2855e2239e08ffd9193eb-Screenshot_2026-04-13_at_4.03.18_PM.png" className="border" />

### Compare versions

You can compare code changes between any two versions of a dataflow.

1. In the dataflow canvas, click the version compare icon.
   The compare versions window opens.

   <Image align="center" border={true} src="https://files.readme.io/36e8ef7488fb785e55079a261f3c6ed89b688b213bc0fbe0f14d0bcaa79b6461-Screenshot_2026-04-13_at_4.54.22_PM.png" className="border" />
2. Use the drop-down to select the two versions you want to compare.

   <Image align="center" border={true} src="https://files.readme.io/09d1d7ec37c221ce997dc5a400fd67af86ee485ee1d3caeaad08618fae58f01c-Screenshot_2026-04-13_at_4.56.33_PM.png" className="border" />

<Callout icon="📘" theme="info">
  **Note**

  The version compare icon is available only for dataflows in `Draft` state.
</Callout>

### Restore a version

You can revert the current dataflow version to the most recently approved version.

1. In the dataflow canvas, click the restore version icon.
   A Revert Rule modal appears.

   <Image align="center" border={true} src="https://files.readme.io/0eb1e706520dde16d62de523f445992b69b73c305b54bbcc9f39c51031733135-Screenshot_2026-04-13_at_4.58.48_PM.png" className="border" />
2. Enter the dataflow name on the confirmation modal.
3. Click **Yes**.

   <Image align="center" border={true} src="https://files.readme.io/675de3e74e72566cfefcc80255efc832fab7ce3d4694d1d08d6c78580351369c-Screenshot_2026-04-13_at_5.01.00_PM.png" className="border" />

The version is restored to the most recently approved version.

<Callout icon="📘" theme="info">
  **Note**

  The restore version icon is available only for dataflows in Draft state.
</Callout>

## Sync config updates

When config values are updated in [Extension Configurations](https://docs.capillarytech.com/docs/extension-configuration), you don't need to update each block individually. The sync option pulls the latest values from Extension Configurations to the dataflow in a single step, including updated credentials.

1. Open the dataflow in `Live` status.
2. Click the sync icon in the top-right corner of the canvas.\
   The **Sync Configuration** panel opens.

   <Image align="center" border={true} src="https://files.readme.io/33fccb66cdc242b5697c09c2bd3a2c7ad80b3abb390cc44b10b8c6527d9f420f-Sync-canvas.png" className="border" />
3. Review the difference between **Current Config** on the left and **Config Manager (latest)** on the right. Fields marked **CHANGED** show values that have been updated in Extension Configurations.

   <Image align="center" border={true} src="https://files.readme.io/7530054134775c5cb867ad8dea77a322fb1782adb27c7710426c81379944c268-sync-diff.png" className="border" />
4. Click **Sync**.\
   A confirmation dialog appears.
5. Click **Sync now**.\
   The dataflow applies the latest values across all blocks without restarting.

   <Image align="center" border={true} src="https://files.readme.io/44641ff18e254c067cb008bb81fa8a9130908cac785794fb36ddb90d2845a81f-confirm-syncnow.png" className="border" />

<Callout icon="📘" theme="info">
  **Note**

  Masked values are displayed as `*****` in both columns. You can't preview secret values here, but syncing still applies any updated secret values from Extension Configurations.
</Callout>