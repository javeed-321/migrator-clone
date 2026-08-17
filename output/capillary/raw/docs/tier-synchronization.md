---
updatedAt: 2026-04-02T06:38:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure Group Tier Synchronisation

Group members have individual customer profiles; their tiers don't synchronise automatically when the primary member's tier changes. The recommended approach is primary-led synchronisation: the primary member's tier serves as the reference point, and an automated webhook workflow updates all secondary members to match whenever the primary's tier changes.

This pattern requires external integration to receive webhook events and call Capillary APIs. You can use the Neo extension platform to create a dataflow that receives the event notification, retrieve the group details and synchronise the tiers for all group members.

The steps below highlight how to set up this webhook-based synchronisation pattern.

# Tier synchronisation on joining

When a new member joins an existing group, their tier doesn't change automatically. They retain whatever tier they held before joining. If the brand wants the new member's tier to match the primary's, it must trigger a manual tier adjustment at the time of joining using the [manual tier adjustment API](https://docs.capillarytech.com/reference/manual-tier-adjustment).

Similarly, if a secondary member's tier is higher than the primary's at the time they join, there's no automatic downgrade. The brand must explicitly downgrade them to match the primary.

To configure tier synchronisation for group members through primary-led synchronisation follow these steps:

## Step 1: Configure event notifications

Configure webhooks for the following events in your [notification settings](https://docs.capillarytech.com/docs/configure-event-notification): [`tierUpgraded`](https://docs.capillarytech.com/docs/event-schema-tier#tier-upgraded-tierupgraded), [`tierDowngraded`](https://docs.capillarytech.com/docs/event-schema-tier#tier-downgraded-event-tierdowngraded), and [`tierRenewed`](https://docs.capillarytech.com/docs/event-schema-tier#tier-renewed-event-tierrenewed). Each event delivers a payload identifying the affected customer and their new tier.

## Step 2: Parse the event payload and identify the tier name

When a webhook fires, the dataflow must extract the tier name from the payload, as the manual tier adjustment API requires the name.

In the payload, locate the `upgradedTierNumber` (or `downgradedTierNumber` or `currentTierNumber`) and match it against the `tiers` array to find the corresponding name.

**Example: `tierUpgraded` payload**

```json
{
  "eventName": "tierUpgraded",
  "data": {
    "entityInformation": { "entityId": 347266498 },
    "loyaltyProgramDetails": {
      "tiers": [
        { "tierNumber": 1, "tierName": "Silver" },
        { "tierNumber": 2, "tierName": "Gold" }
      ]
    },
    "upgradedTierNumber": 2
  }
}
```

In this example, `upgradedTierNumber` is `2`. Match it to the `tiers` array to find the name `"Gold"`. Use this name in the manual tier adjustment call.

> 🚧 \*\*Note:
>
> \*\* Don't use `tierNumber` directly in the manual tier adjustment call. The API requires the tier name. Map the tier number to the name each time, as tier names can vary between programs.

## Step 3: Retrieve group members

1. Call the [Retrieve user group members list](https://docs.capillarytech.com/reference/retrieve-user-group-member-details) API.
2. From the response, collect all `userId` values where `primaryMember` is `false`. These are the secondary members that need to be updated.

## Step 4: Execute the tier sync

For each secondary member, call `POST /v2/slab/manualSlabAdjustment`.

Include the following in the request body:

| Parameter                      | Description                                                                                                     |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `programId`                    | The loyalty program ID                                                                                          |
| `slabAction`                   | `UPGRADE`, `DOWNGRADE`, or `RENEWAL`, matching the triggering event                                             |
| `toSlabName`                   | The tier name identified in Step 2. Required when `slabAction` is `UPGRADE` or `DOWNGRADE`                      |
| `manualSlabActionValidity`     | Validity period for the tier change. Use `AS_PER_TIER_STRATEGY` to follow the program's configured expiry rules |
| `manualSlabActionValidityUpto` | Required when `manualSlabActionValidity` is `FIXED_DURATION` or `SPECIFIC_DATE`                                 |

**Example request body**

```json
{
  "programId": 973,
  "toSlabName": "Gold",
  "slabAction": "UPGRADE",
  "manualSlabActionValidity": "AS_PER_TIER_STRATEGY"
}
```

Repeat this call for every secondary member retrieved in Step 3.

**Example: full curl request**

```shell
curl --location 'https://eu.api.capillarytech.com/v2/slab/manualSlabAdjustment?identifierName=id&identifierValue=456789&source=INSTORE' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data '{
  "programId": 973,
  "toSlabName": "Gold",
  "slabAction": "UPGRADE",
  "manualSlabActionValidity": "AS_PER_TIER_STRATEGY"
}'
```

## Handling sync failures

If the process fails to sync a secondary member for example, due to a network timeout, the platform has no native retry mechanism. The secondary member remains on their current tier until the failure is resolved and the call is retried manually.

If you are making parallel calls to update multiple secondary members, partial failures can occur where some calls may succeed while others fail. These partial failures will not appear in the `isSuccess()` flow; instead, they will be captured in the `hasError()` flow. on the Neo extension platform. Ensure you explicitly check and handle the `hasError()` flow to identify and retry failed updates.