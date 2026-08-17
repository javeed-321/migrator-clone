---
updatedAt: 2026-04-09T08:20:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Frequenty Asked Questions

Common questions and tips for User Group Loyalty.

## 1. Can Group Loyalty work within a Multi-Loyalty Program (MLP)?

Yes. Enable `ENABLE_GROUP_PROGRAMS_REDEMPTION` for the [MLP environment](/docs/create-a-multi-loyalty-program) to support group redemptions. See [Configuring redemption rules](./points-configuration.md#configuring-redemption-rules).

## 2. Can group points go into a negative balance?

Yes. If Member A earns points, Member B spends them, and Member A [returns the original purchase](/docs/return-after-redemption-scenarios), the resulting reversal can push the balance negative.

## 3. Can a member redeem only the points they personally contributed?

No. Reward currencies are [pooled collectively](/docs/redeeming-points-from-user-groups). Any member with redemption permission burns from the entire shared pool. Per-member partitioned redemption is not currently supported.

## 4. What happens to points when the primary member leaves?

The group becomes inactive by default and points remain tied to the inactive group entity. Use `CONF_DISABLE_GROUP_DEACTIVATION_ON_PRIMARY_MEMBER_EXIT` to keep the group active. Custom external logic is required to transfer remaining points to the primary member's individual account. See [Deleting a group](./creating-and-managing-groups.md#deleting-a-group).

## 5. What happens to a secondary member's tier when they leave?

Their [tier](./tier-synchronization.md) resets to the base level. If their individual transaction history qualifies them for a higher tier, it upgrades on their next individual transaction after leaving.

## 6. Can a member belong to multiple groups?

Yes. Enable `CONF_USER_GROUP_ENABLED` to turn on user group functionality, then configure membership based on your program's rules. If a member belongs to more than one group, use `defaultGroup` to indicate which group should be the default for group transactions.

## 7. Is there a maximum number of groups an organization can create?

There is no limit on the total number of groups. You can limit the number of members within a single group using `CONF_USER_GROUP_SIZE`. See [Membership capping](./prerequisites-and-limitations.md#membership-capping).

## 8. Can point allocation rules be based on an individual member's tier?

Yes. Configure your ruleset to reference the [individual's tier](/docs/loyalty-promotions-qualifying-conditions) using an expression such as `currentCustomer.slabName=="Gold"`.

## 9. Can the primary member role be transferred to another member?

No. The primary member role cannot be reassigned to another member. If a change in leadership is needed, the current primary member must be removed, which deletes the group. Members can then be transferred to a new group using the [transfer API](./creating-and-managing-groups.md#transferring-members-between-groups).

## 10. Can two groups be merged into one?

No. Group merging is not supported. You can move specific members from one group to another using `POST /v2/userGroup2/transfer` (see [Transferring members between groups](./creating-and-managing-groups.md#transferring-members-between-groups)), but the source group itself is not merged or dissolved as part of that operation.