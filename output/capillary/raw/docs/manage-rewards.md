---
updatedAt: 2026-05-13T06:09:26.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Manage rewards

After creating rewards, search, filter, view, edit, duplicate, and manage the activation status of each reward from the Rewards Catalog home page.

# **The Rewards Catalog home page**

Go to **Rewards+** > **Rewards Catalog** to open the home page.

The rewards list shows all rewards in your organization. Each row tells you what you need to know at a glance before taking action:

| Column            | What does it tell you                                                                                                                                                           |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Reward name**   | The reward's display name. Select it to open the read-only detail view. Use this to confirm the configuration before editing.                                                   |
| **Status**        | The lifecycle status: **Upcoming**, **Live**, or **Ended**. This tells you whether the reward is active for customers right now, not yet started, or already past its end date. |
| **Duration**      | The start and end date and time in your organization's timezone. Lets you confirm at a glance whether a reward is within its active window.                                     |
| **Reward vendor** | The vendor or issuer associated with the reward. Useful for filtering when you manage rewards across multiple vendor partnerships.                                              |
| **Last updated**  | The date the reward was last modified. Select the column header to sort. This is helpful for finding recently changed rewards during a campaign.                                |
| **Actions**       | Icons to view, edit, duplicate, or change the activation status of a reward.                                                                                                    |

<br />

<br />

## Search and filter rewards

**Search by name:** Use the **Search reward by name** bar to find a specific reward. The list filters as you type.

**Filter the list:** Select **Filters** to narrow results by:

| Filter                | Options                                                                          |
| :-------------------- | :------------------------------------------------------------------------------- |
| **Status**            | Upcoming, Live, Ended                                                            |
| **Activation status** | Active, Inactive                                                                 |
| **Reward type**       | Select from all available reward types (Voucher, Gift card, Cashback, and so on) |
| **Reward vendor**     | Filter by a specific vendor or issuer                                            |
| **Duration**          | Set a date range to find rewards active within a specific window                 |

Select **Apply** to apply the filters. Select **Clear All** to reset.

# **View a reward**

The view mode gives you a read-only summary of a reward's complete configuration. Use it to review settings without making changes.

1. Go to the **Rewards Catalog** home page.
2. Find the reward and do one of the following:
   * Select the **reward name** in the list.
   * Select the **View** (eye) icon in the **Actions** column.
3. The reward detail page opens in read-only mode with the following expandable sections:
   * Basic details
   * Who can view the reward
   * Incentive and cost details
   * Inventory limits
   * Content in multi-language
   * Additional details
4. Select any section header to expand it.

# **Edit a reward**

Modify a reward's configuration at any point in its lifecycle. Some fields lock based on the reward's current lifecycle status. Changing them after go-live would create inconsistencies for customers who've already interacted with the reward.

1. Go to the **Rewards Catalog** home page.
2. Find the reward and select the **Edit** (pencil) icon in the **Actions** column.
3. Make your changes in the relevant section.
4. *(Optional)* To change the linked incentive, select the **edit icon** next to the incentive, then select **Replace incentive**.
5. Select **Continue** to move through the remaining sections to the **Preview** screen.
6. Review your changes on the preview screen, then select **Save**.

## Which fields can be edited?

| Field                                                                  | Upcoming | Live | Ended |
| :--------------------------------------------------------------------- | :------: | :--: | :---: |
| Start date                                                             |     ✓    |   ✗  |   ✗   |
| Reward type                                                            |     ✓    |   ✗  |   ✗   |
| Inventory limits                                                       |     ✓    |   ✓  |   ✓   |
| All other fields *(name, end date, audience, cost, content, metadata)* |     ✓    |   ✓  |   ✓   |

> 📘 **Note**
>
> When **Start date** is not editable, hovering over the field shows a tooltip: *"Start date is not editable in \[status] reward."* This confirms the field is locked due to the reward's current lifecycle status.

## Data reset warnings

Some changes reset configuration. When this happens, the system shows a **"Your changes will modify dependent steps"** dialog before applying the change.

| Action                                               | What resets                             | Why it resets                                                                                                                                                                          |
| :--------------------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changing the **Reward type** (upcoming rewards only) | Linked incentive and cost configuration | The new reward type requires a different incentive format entirely. The previously linked incentive is incompatible with the new type.                                                 |
| Changing the **Duration**                            | May reset configured inventory limits   | Some inventory limit configurations use the reward's start date as their reference point for calculating reset cycles. Changing the start date makes those cycle calculations invalid. |

# **Change a reward's activation status**

Activation status and lifecycle status are two separate and independent controls:

| Status type                                    | What controls it                                      | What it means                                             |
| :--------------------------------------------- | :---------------------------------------------------- | :-------------------------------------------------------- |
| **Lifecycle status** (Upcoming / Live / Ended) | Automatic, driven by the reward's start and end dates | Whether the reward is within its configured date range    |
| **Activation status** (Active / Inactive)      | Manual. You control it                                | Whether the reward is visible and redeemable to customers |

A reward can be **Live** in lifecycle terms (within its date range) but **Inactive** in activation terms (toggled off). In that state, the reward is completely invisible to customers even though its dates are active. This lets you pause a live reward without changing its dates for example, to temporarily suspend a reward during a system outage or stock issue.

When a reward is **Active**, eligible customers see it in the catalog and can redeem it. When it's **Inactive**, the reward disappears from the catalog entirely, and the customers can't see it, and no redemptions go through.

## From the rewards list

1. Find the reward in the list.
2. Select the **activation toggle** in the **Actions** column.
3. A confirmation modal appears:
   * **When deactivating:** *"Once deactivated, the reward cannot be issued to the customers. However, it can be re-activated later."*
   * **When activating:** *"Once activated, the reward will be available for issual to the customers."*
4. Confirm the action. A notification confirms the change:
   * *"\[Reward name] has been activated successfully."*
   * *"\[Reward name] has been deactivated successfully."*

## From the edit flow

1. Open the reward in the edit flow.
2. In **Step 1: Basic details**, turn the **Activate reward** toggle on or off.
3. Move through the remaining sections and select **Save**.

# **Duplicate a reward**

Duplicating creates an independent copy of a reward with all settings carried over. The copy lands in **Upcoming** status with its activation status set to **Inactive**, giving you time to review and modify it before making it live.

**What carries over to the duplicate:** Everything from all 6 steps, such as the incentive link, cost structure, audience filters, inventory limits, multi-language content, and all metadata fields.

**What you must update before activating:** The duplicate has the same name and the same duration as the original. The name doesn't auto-append any suffix, so it's identical to the original. The duration is also identical, which means if the original reward has already ended, the duplicate immediately enters **Ended** status the moment it's created. Always update the name and duration before activating.

1. Go to the **Rewards Catalog** home page.
2. Find the reward and select the **Duplicate** (copy) icon in the **Actions** column.
3. A confirmation message appears: *"“\[Reward name]” reward has been duplicated successfully."*
4. Select **Edit** on the duplicate to update its name, duration, and any other settings before activating it.

**You've now created a copy of the reward. Update the duration and name before activating.**