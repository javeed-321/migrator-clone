---
updatedAt: 2026-08-03T09:57:37.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Edit a Loyalty Promotion

You can edit a loyalty promotion at any stage of its lifecycle. You may need to modify a promotion to update its rules, correct an error, or extend its duration. This action is typically performed by a maker, who can make changes to promotions in the draft state. Editing a live promotion is also possible; this action creates a separate, editable copy without disrupting the active promotion. Once a promotion has been stopped, it cannot be edited.

To edit a loyalty promotion, follow these steps:

1. In the promotion list view, navigate to the loyalty promotion to edit.

2. Select the **Edit** (pen) icon next to the promotion.

<Image src="https://files.readme.io/37ff4d0c5ca65ea0a298611f0a45342ef8efaf919e1507a23bd6ff04ecd70773-image.png" width="80%" border={true} />

3. Make the required changes. See [What you can edit by status](#what-you-can-edit-by-status) for the fields available in each state.

4. Select **Send for approval**.

<Callout icon="📘" theme="info">
  ### Note

  For live promotions, selecting the edit icon creates a separate draft. The live promotion continues running while the draft is reviewed and approved.
</Callout>

## Discard a draft

Discard a draft instead of sending it for approval if you no longer need it, for example if you started editing by mistake, or the live promotion changed after you created the draft.

The **Discard draft** button appears next to **Send for approval** and **Save and exit** whenever a pending draft exists for the promotion. Only a maker or admin can discard a draft; checkers and viewers don't have access to this button.

To discard a draft:

1. Open the live promotion from the promotions list view, which contains the draft.
2. Scroll to the end of the page and select **Discard draft**.
3. In the confirmation dialog, select **Discard draft** to confirm, or **Cancel** to keep the draft.

   ![](https://files.readme.io/fc585b730ef10308cf24c5d065536a8b08f0fb90a02fe444aa915816bb9cc9d5-Screen_Recording_2026-08-03_at_3.14.45_PM.gif)

<Callout icon="📘" theme="info">
  ### Note

  Discarding a draft deletes it permanently. The live promotion isn't affected.
</Callout>

### Stale draft errors

If the live promotion changes after a draft was created from it (for example, someone edits the qualifying conditions on the live promotion directly), the draft becomes stale. **Send for approval** and **Save and exit** stay disabled on the stale draft until you discard it. Hovering over either disabled button shows this tooltip:

> The promotion has changed since the draft was submitted for approval. Discard this draft and create a new one based on the latest promotion details.

To resolve a stale draft, discard it and start a new edit from the current live promotion.

## What you can edit by status

### Draft

The table below lists whether a field can be edited in the draft stage:

| Field                         | Editable? |
| ----------------------------- | --------- |
| Promotion name                | Yes       |
| Promotion description         | Yes       |
| Program                       | Yes       |
| Timezone                      | Yes       |
| Start date                    | Yes       |
| End date                      | Yes       |
| Promotion type                | Yes       |
| Promotion external identifier | Yes       |
| Enrolment criteria            | Yes       |
| Opt-in criteria               | Yes       |
| Activity type                 | Yes       |
| Qualifying conditions         | Yes       |
| Brand actions                 | Yes       |
| Limits                        | Yes       |
| Advanced settings             | Yes       |

### Upcoming

The table below lists whether a field can be edited in the upcoming stage:

| Field                         | Editable?   | Notes                                                                                                           |
| ----------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| Promotion name                | Yes         |                                                                                                                 |
| Promotion description         | Yes         |                                                                                                                 |
| Program                       | No          |                                                                                                                 |
| Timezone                      | Yes         |                                                                                                                 |
| Start date                    | No          | Locked once the promotion is approved.                                                                          |
| End date                      | Extend only | Disabled if the promotion uses cyclic window or period-agnostic cycles, or a streak with a non-custom duration. |
| Promotion type                | No          |                                                                                                                 |
| Promotion external identifier | Yes         |                                                                                                                 |
| Enrolment criteria            | No          |                                                                                                                 |
| Opt-in criteria               | No          |                                                                                                                 |
| Activity type                 | Yes         |                                                                                                                 |
| Qualifying conditions         | Yes         |                                                                                                                 |
| Brand actions                 | Yes         |                                                                                                                 |
| Limits                        | Yes         |                                                                                                                 |
| Advanced settings             | Yes         |                                                                                                                 |

### Live

The table below lists whether a field can be edited in the live stage:

| Field                         | Editable?   | Notes                                                                                                                                      |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Promotion name                | Yes         |                                                                                                                                            |
| Promotion description         | Yes         |                                                                                                                                            |
| Program                       | No          |                                                                                                                                            |
| Timezone                      | No          |                                                                                                                                            |
| Start date                    | No          |                                                                                                                                            |
| End date                      | Extend only | Disabled if the promotion uses cyclic window or period-agnostic cycles, a non-custom-duration streak, or has an audience group configured. |
| Promotion type                | No          |                                                                                                                                            |
| Promotion external identifier | Yes         |                                                                                                                                            |
| Enrolment criteria            | No          |                                                                                                                                            |
| Opt-in criteria               | No          |                                                                                                                                            |
| Activity type                 | No          |                                                                                                                                            |
| Qualifying conditions         | Yes         |                                                                                                                                            |
| Brand actions                 | Yes         |                                                                                                                                            |
| Limits                        | Yes         |                                                                                                                                            |
| Advanced settings             | Yes         |                                                                                                                                            |

<Callout icon="📘" theme="info">
  ### Note

  The **Delete Cycles** action is disabled for live and upcoming promotions.
</Callout>

### Paused

The table below lists whether a field can be edited in the paused stage:

| Field                         | Editable?   | Notes                                                                                                                                      |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Promotion name                | Yes         |                                                                                                                                            |
| Promotion description         | Yes         |                                                                                                                                            |
| Program                       | No          |                                                                                                                                            |
| Timezone                      | No          |                                                                                                                                            |
| Start date                    | No          |                                                                                                                                            |
| End date                      | Extend only | Disabled if the promotion uses cyclic window or period-agnostic cycles, a non-custom-duration streak, or has an audience group configured. |
| Promotion type                | No          |                                                                                                                                            |
| Promotion external identifier | Yes         |                                                                                                                                            |
| Enrolment criteria            | No          |                                                                                                                                            |
| Opt-in criteria               | No          |                                                                                                                                            |
| Activity type                 | No          |                                                                                                                                            |
| Qualifying conditions         | Yes         |                                                                                                                                            |
| Brand actions                 | Yes         |                                                                                                                                            |
| Limits                        | Yes         |                                                                                                                                            |
| Advanced settings             | Yes         |                                                                                                                                            |

### Ended

The table below lists whether a field can be edited after it has ended:

| Field                         | Editable? |
| ----------------------------- | --------- |
| Promotion name                | Yes       |
| Promotion description         | Yes       |
| Program                       | No        |
| Timezone                      | No        |
| Start date                    | No        |
| End date                      | No        |
| Promotion type                | No        |
| Promotion external identifier | Yes       |
| Enrolment criteria            | No        |
| Opt-in criteria               | No        |
| Activity type                 | No        |
| Qualifying conditions         | Yes       |
| Brand actions                 | Yes       |
| Limits                        | Yes       |
| Advanced settings             | Yes       |

## Edit cycles in a live promotion

You can update a promotion's cycle schedule without disrupting members who are already in progress.

### Current cycle

The table below lists what you can edit for the current cycle:

| Action                                     | Allowed? |
| ------------------------------------------ | -------- |
| Extend the end date                        | Yes      |
| Shorten the cycle or change the start date | No       |

### Future cycles

The table below lists what you can edit for future cycles:

| Action                                 | Allowed? | Notes                                                                                |
| -------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| Add, remove, or update upcoming cycles | Yes      | Includes dates and milestone targets.                                                |
| Increase the total cycle count         | Yes      | Fixed-window cycle types only: daily, weekly, monthly, annually, or custom duration. |
| Reduce the total cycle count           | No       | Cannot go below the number of cycles that have already started.                      |

### Streaks in a live promotion

The table below lists what you can edit for streaks in a live promotion:

| Action                                                | Allowed? |
| ----------------------------------------------------- | -------- |
| Change the streak duration type (daily, weekly, etc.) | No       |
| Change the number of repetitions                      | No       |
| Change the consecutive or non-consecutive setting     | No       |
| Update custom streak cycles not yet started           | Yes      |

<Callout icon="🚧" theme="warn">
  ### Important

  Cyclic window and period-agnostic cycles do not support end date extension. If your promotion uses these cycle types, the end date field will be disabled when editing a live or upcoming promotion.
</Callout>