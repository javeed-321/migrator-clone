---
updatedAt: 2026-04-02T06:39:10.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Limitations

The following features are not supported for User Group Loyalty:

| Feature                                                    | What this means                                                                                                                                                                                                                        |
| :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Issue coupons                                              | You cannot issue or redeem coupons at the group level.                                                                                                                                                                                 |
| Issue badges                                               | You cannot award badges to a group entity.                                                                                                                                                                                             |
| Issue cart promotions                                      | Cart-level promotions do not apply to groups and cannot be triggered by group activity.                                                                                                                                                |
| Tiers                                                      | User groups do not have a tier tied to them. To implement a tier system for user groups, refer to [Tier Synchronization](./tier-synchronization.md).                                                                                   |
| Redeeming personal contributions                           | Members cannot redeem only the points they personally earned. All redemptions draw from the full shared pool, regardless of individual contribution.                                                                                   |
| Redeeming from two wallets at once                         | A member cannot redeem from their individual wallet and the group wallet in the same transaction. It is one or the other.                                                                                                              |
| Negative balance protection                                | A group wallet can go into a negative balance. This happens when Member A earns points, Member B redeems them, and Member A then returns the original purchase. The reversal has nowhere to pull from, pushing the balance below zero. |
| Viewing dissolved groups                                   | Once a group is dissolved, it no longer appears in Member Care and cannot be searched or managed.                                                                                                                                      |
| Mid-transaction tier splits                                | If a member's transaction causes a tier upgrade partway through, the system cannot split point allocation across the two tiers within that single transaction.                                                                         |
| Promotions or notifications triggered by membership events | There are no event-triggered promotions or notifications for group membership events such as a member joining or leaving a group.                                                                                                      |