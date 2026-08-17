---
updatedAt: 2026-08-13T13:35:25.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Archive journeys

As organizations create seasonal journeys, A/B test journeys, and one-time customer journeys, the list of journeys can grow over time, making it difficult to identify journeys that are still relevant. This can also make it harder to manage the journey list and locate completed journeys.

The **Archive** and **Unarchive** feature helps keep the journey list organized by allowing you to remove journeys that are no longer required from the default view without deleting them. Archived journeys remain available, and all their associated data, including reports, exports, and delivery logs, is retained. You can restore archived journeys at any time using the **Unarchive** option.

Journeys must be in an eligible status before you can archive them. **Live** journeys and those in **Awaiting Approval** status can't be archived. Only **Draft**, **Rejected,** and **Ended** journeys can be archived.

<Callout icon="📘" theme="info">
  ### Note

  Journey archival is not enabled by default. Create a Jira ticket to the PST team to enable it for your organization.
</Callout>

## Archive a journey

To archive a journey, follow the given steps below:

1. From the left navigation panel, navigate to **Engage+** > **Journeys**.
2. Find the journey you want to archive.
3. Select the actions menu (⋮) for that journey.&#x20;
4. Select **Archive**.
5. In the confirmation dialog, select **Archive** to confirm.

The journey is removed from the default journey list and moved to the archived view. A success notification appears: Journey archived successfully.

<Image src="https://files.readme.io/cebbb226e37ee08dfbbc3ae0a2d48554efba02fac33bdb075989ec658d5626ee-journey_single_archive.gif" border={true} />

## Bulk archive journeys

To archive bulk journey, follow the given steps below:

1. From the left navigation panel, navigate to **Engage+** > **Journeys**.
2. Select the checkboxes next to the journeys you want to archive. You can select up to 200 journeys at a time. If your selection includes **Live** or **Awaiting Approval** journeys, the **Archive** button remains disabled. Deselect ineligible journeys before proceeding.
3. Select **Archive**.
4. In the confirmation dialog, review the count, then select **Archive** to confirm.

A toast confirms how many journeys were archived, for example: "10 journeys archived successfully."

<Image src="https://files.readme.io/af786760698cacc0bfa772296a1833718bbc2a5b6d6d16ab074a513297b59d96-bulk_archive_journeys.gif" border={true} />

## View archived journeys

Archived journeys don't appear in the default journey list. To view them:

1. From the left navigation panel, navigate to **Engage+** > **Journeys**.
2. Select **Archived journeys** from the filter options next to **+ New journey**.

You can search archived journeys the same way you would active ones.

<Image src="https://files.readme.io/710c3ef600e6c1c1fc0d14fba69de1b2b9ecbd67c39886c64b5acc58f27b8f6c-view_archived_journey_.gif" border={true} />

## Unarchive a journey

To unarchive a journey, follow the given steps below:

1. From the left navigation panel, navigate to **Engage+** > **Journeys**.
2. Select **Archived journeys** from the filter options next to **+ New journey**.
3. Find the journey you want to unarchive.
4. Select the actions menu (⋮) for that journey.
5. Select **Unarchive**.
6. In the confirmation dialog, select **Unarchive** to confirm.

The journey returns to the active journey list. A success notification appears: Journey unarchived successfully.

<Image src="https://files.readme.io/bea907a2c8f6983c58b96027cafa2bc574ffb550768aaef5de170258989cfb22-unarchive_journey.gif" border={true} />

## Bulk unarchive journeys

To bulk unarchive a journey, follow the given steps below:

1. From the left navigation panel, navigate to **Engage+** > **Journeys**.
2. Select **Archived journeys** from the filter options next to **+ New journey**.
3. Select the checkboxes next to the journeys you want to unarchive.
4. Select **Unarchive**.
5. In the confirmation dialog, select **Unarchive** to confirm.

A toast confirms how many journeys were unarchived, for example: "10 journeys unarchived successfully."

<Image src="https://files.readme.io/39fa5d4a8812ac47dd789bbe4a464f51d7aa2c025f13e81c8bd5bc2f682fa32f-bulk_unarchive.gif" border={true} />

<br />

<Callout icon="📘" theme="info">
  ### Note

  Archived journeys can't be edited. To make changes to an archived journey, first unarchive it. After making the required updates and the journey reaches the Ended status or draft status again, you can archive it if needed.
</Callout>