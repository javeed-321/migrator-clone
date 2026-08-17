---
updatedAt: 2026-08-12T06:02:30.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Archive Campaigns

As organizations create seasonal promotions, recurring campaigns, A/B tests, and one-time customer communications, the list of campaigns can grow over time, making it difficult to identify campaigns that are still relevant. This can also make it harder to manage the campaign list and locate completed campaigns.

The Archive and Unarchive feature helps keep the campaign list organized by allowing you to remove campaigns that are no longer required from the default view without deleting them. Archived campaigns remain available, and all their associated data, including reports and analytics, is retained. You can restore archived campaigns at any time using the **Unarchive** option.

Only campaigns with an Ended status can be archived. Campaigns with a Live, Upcoming, or Waiting for approval status can't be archived.

<Callout icon="📘" theme="info">
  ### **Note**

  Campaign archival is not enabled by default. Create a Jira ticket to the Product Support Team to enable it for your organization.
</Callout>

## Archiving a campaign

To archive a campaign, follow the given steps below:

1. Navigate to **Engage+** > **Campaigns**.
2. Find the campaign you want to archive.
3. Select the actions menu (⋮) for that campaign.
4. Select **Archive**.
5. In the confirmation dialog, select **Archive** to confirm.

The campaign is removed from the default campaign list and moved to the archived view. A success notification appears: Campaign archived successfully.

<Image src="https://files.readme.io/47f243178e7e54c64e2e8da7d2c9cb215951d988b7dfcfe916cbfd7aed9c6e1f-ac.gif" align="left" width="75%" border={true} wrap={false} />

## Bulk archiving campaigns

To archive bulk campaigns, follow the given steps below:

1. Navigate to **Engage+** > **Campaigns**.
2. Select the checkboxes next to the campaigns you want to archive. You can select up to 200 campaigns at a time. If your selection includes Live or Upcoming campaigns, the **Archive** button remains disabled. Deselect ineligible campaigns before proceeding.
3. Select **Archive**.
4. In the confirmation dialog, review the count, then select **Archive** to confirm.

A toast confirms how many campaigns were archived, for example: "10 campaigns archived successfully."

<Image src="https://files.readme.io/30698d50eb8dee396334dcf6788c6c7e97f68b06ae99f14b3261ade12fe8ca79-ac_sc_1.gif" align="left" width="75%" border={true} wrap={false} />

## Viewing archived campaigns

Archived campaigns don't appear in the default campaign list. To view them:

1. Navigate to **Engage+** > **Campaigns**.
2. Select **Archived** from the filter options next to **New campaign**.

You can search and filter archived campaigns the same way you would active ones.

<Image src="https://files.readme.io/6efa9a026e229ba56cab202fcaaa09289605197074fa12ee33794923005d2e10-view_archievbe_1.gif" align="left" width="75%" border={true} wrap={false} />

## Unarchiving a campaign

To unarchive a campaign, follow the given steps below:

1. Navigate to **Engage+** > **Campaigns**.
2. In the status filter, select **Archived**.
3. Find the campaign you want to unarchive.
4. Select the actions menu (⋮) for that campaign.
5. Select **Unarchive**.
6. In the confirmation dialog, select **Unarchive** to confirm.

The campaign returns to the active campaign list. A success notification appears: Campaign unarchived.

<Image src="https://files.readme.io/329fd2a47eb00e04025789b45e570b7de7a027769445d8a63147f5cab6a4b507-single_archieve.gif" align="left" width="75%" border={true} wrap={false} />

## Bulk unarchiving campaigns

To bulk unarchive a campaign, follow the given steps below:

1. Navigate to **Engage+** > **Campaigns**.
2. In the status filter, select **Archived**.
3. Select the checkboxes next to the campaigns you want to unarchive.
4. Select **Unarchive**.
5. In the confirmation dialog, select **Unarchive** to confirm.

A toast confirms how many campaigns were unarchived, for example: "10 campaigns unarchived successfully."

<Image src="https://files.readme.io/d09671a321d86480ef185ce16d7604c012d14b9306a9f7dec4fe42df0e7c01b2-ua_bulk.gif" align="left" width="75%" border={true} wrap={false} />

<Callout icon="📘" theme="info">
  ### Note

  When you switch to the Archived campaigns view, search returns only archived campaigns. You can also filter archived campaigns by **campaign type**. The New campaign option is not available, and each campaign's More (⋮) menu displays only the Unarchive action. If you refresh the page, the view resets to the default active campaigns listing page.

  Archived campaigns can't be edited. To make changes to an archived campaign, first unarchive it. After making the required updates and the campaign reaches the Ended status again, you can archive it if needed.
</Callout>