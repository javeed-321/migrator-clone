---
updatedAt: 2026-04-02T06:39:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Reports for User Groups

Export group loyalty data and identify group activity in Insights+.

Group loyalty data surfaces in Insights+ through the standard Points and Points Redemption Summary export templates. Group activity doesn't create a separate data model. Instead, it's identifiable through specific fields within the existing fact tables.

# Finding group transactions in reports

Standard fact tables use `dim_event_user_id` to identify the individual member who triggered an event, not the group entity. To analyze performance at the group level, you need to join on group membership data to associate individual member IDs with their respective groups.

There are two fields for identifying group-specific activity:

* In the **[Points Redemption Summary](https://docs.capillarytech.com/docs/points-fact-table#points_redemption_summary-fact-table)** fact table, `dim_redemption_type_id` takes the value `group_redemption` for points redeemed from a group wallet. For these rows, `point_category_id` is set to `-1`.
* In the **[Reward Fact](https://docs.capillarytech.com/docs/rewards-fact-table)** tables, the `group_loyalty_redemption` field identifies redemptions made against a group wallet.

In the event log data, group transactions are recorded under the `GroupTransactionAdd` event, separate from the individual `TransactionAdd` event. Filter on this event name to isolate transactions made on behalf of a group.

Once you have identified the relevant fields and events, use the following export templates to pull the data.

# Exporting group loyalty data

Use the following Insights+ export templates to pull group loyalty performance data.

| Template                                                                                                                | What it covers                                                                                                                                        |
| :---------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Points](https://docs.capillarytech.com/docs/points-fact-table#points-fact-table)                                       | Points earned and deducted events per member. Filter on `GroupTransactionAdd` to the scope to group transactions.                                     |
| [Points Redemption Summary](https://docs.capillarytech.com/docs/points-fact-table#points_redemption_summary-fact-table) | Redemption events per member. Filter `dim_redemption_type_id = 'group_redemption'` to isolate group wallet redemptions.                               |
| Members                                                                                                                 | Member-level loyalty profile data, including current tier, points balance, and lifetime purchases. Use to analyse group members' individual standing. |

To schedule exports, go to **Insights+** > **Data Connectors** > [**Export Schedules**](https://docs.capillarytech.com/docs/schedule-an-export-job) and create a new schedule using the relevant template.

<Callout icon="📘" theme="info">
  ## **Note:**

  Standard export templates don't include a native group-level aggregation. Aggregating data to the group level requires post-processing the exported data using the group membership list, which you can download from the Member Care group view or retrieve via `GET /v2/userGroup2` (see [Get user group details](https://docs.capillarytech.com/reference/get-user-group-details)).
</Callout>

<br />