---
updatedAt: 2026-04-02T06:39:05.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Use Cases

These use cases demonstrate how to design User Group Loyalty programs for different business scenarios, covering group structure, tier behaviour, points model, and configuration decisions.

# B2C use cases

## Accelerated tier progression for families

**Description:** A fashion retailer wants family members to pool their spending toward a shared loyalty account, so the group reaches premium tiers faster and all members enjoy the same benefits. Each group can have up to five members.

### Prerequisites

* Enable the `CONF_USER_GROUP_ENABLED` flag for your organisation by raising a JIRA ticket to the Capillary product support team.
* Enable `CONF_USER_GROUP_SIZE` and set the cap to `5` to restrict each group to one primary member and up to four secondary members.
* Ensure your POS or API integration is configured to pass the `member_card_swiped` extended field (or equivalent) in the `AddTransaction` payload to indicate whether a transaction is a group transaction.
* [Configure webhooks](https://docs.capillarytech.com/docs/setup-test-behavioral-events#add-webhook-integration) for `tierUpgraded`, `tierDowngraded`, and `tierRenewed` events to support tier synchronisation.
* [Configure a Neo extension dataflow](https://docs.capillarytech.com/docs/configuration-setup) to receive webhook events and call the manual tier adjustment API.

### Step 1: Configuring group creation

1. Use `POST /v2/userGroup2` to create the group entity with a name and maximum size of `5`.
2. Use `POST /v2/userGroup2/join` to add the primary member. Set `primaryMember` to `true`.
3. Add secondary members using the same endpoint with `primaryMember` set to `false`.

**Example request body for adding a secondary member:**

```json
[
  {
    "userId": 564662499,
    "primaryMember": false,
    "permissions": [
      "allow_points_redemption",
      "allow_points_transfer"
    ],
    "defaultGroup": true,
    "active": true
  }
]
```

### Step 2: Configuring points earning

All member transactions should credit the group wallet rather than individual wallets. To do this, configure a mutually exclusive workflow in Loyalty+:

1. Create a transaction-level extended field, for example `member_card_swiped`, with values `Yes` and `No`.
2. Configure your POS integration to pass this field in the `AddTransaction` payload.
3. In **Loyalty+ > Programs**, open the **Workflows** tab and create two conditions for the `TransactionAdd` activity:
   * Individual transaction condition: `currentTxn.extField_member_card_swiped=="No" || currentTxn.extField_member_card_swiped.isNull()`with the action set to **Transaction point allocation** for individuals.

     <Image align="center" border={true} width="80%" src="https://files.readme.io/bd05e019b75c6cf09b30c50faf0aa15248169f340f6043745b3500b41a586b04-image.png" />
   * Group transaction condition: `currentTxn.extField_member_card_swiped=="Yes"`, with the action set to **Transaction point allocation** for user groups.

     <Image align="center" border={true} width="80%" src="https://files.readme.io/fbfaea52b15ff6c82558bf257c20ab4e3aab8bd2b4597fc32296f42f1a1c0003-image.png" className="border" />
4. Select **Save and Continue**, then **Publish changes**.

**Note:** When a user joins the group, use a custom job to transfer any existing individual points to the group wallet. Promotional points are never moved to the group wallet and remain with the individual.

### Step 3: Configuring tier synchronisation

The group tier does not sync automatically. Use a primary-led synchronisation pattern:

1. Configure event notifications for `tierUpgraded`, `tierDowngraded`, and `tierRenewed`.
2. When a webhook fires, parse the payload to identify the tier name. Match the `upgradedTierNumber` (or `downgradedTierNumber`) against the `tiers` array to find the tier name. Do not use the tier number directly in the manual adjustment call.
3. Call the Retrieve User Group Members List API to get all secondary member IDs.
4. For each secondary member, call `POST /v2/slab/manualSlabAdjustment` with the tier name from the payload. Repeat for every secondary member retrieved.

***

## Friends and family shared points pool

**Description:** A consumer loyalty program lets customers invite up tp three friends or family into a group. All members share a single points bucket. Any member can earn and redeem from the shared pool. A user cannot hold both an individual wallet and a group wallet simultaneously.

### Prerequisites

* Enable `CONF_USER_GROUP_ENABLED` for the organisation.
* Enable `CONF_USER_GROUP_SIZE` and set the cap to `3` to restrict each group to one primary member and up to three secondary members.
* [Configure webhooks](https://docs.capillarytech.com/docs/setup-test-behavioral-events#add-webhook-integration) for `tierUpgraded`, `tierDowngraded`, and `tierRenewed` events to support tier synchronisation.
* [Configure a Neo extension dataflow](https://docs.capillarytech.com/docs/configuration-setup) to receive webhook events and call the manual tier adjustment API.

### Step 1: Configuring group creation

1. Use `POST /v2/userGroup2` to create the group entity.
2. Add the primary member with `primaryMember: true`.
3. When invitations are accepted, add secondary members using `POST /v2/userGroup2/join`. Grant `allow_points_redemption` to allow any member to redeem from the shared pool.

**Example request body for a secondary member with redemption permission:**

```json
[
  {
    "userId": 564662501,
    "primaryMember": false,
    "permissions": [
      "allow_points_redemption"
    ],
    "defaultGroup": true,
    "active": true
  }
]
```

### Step 2: Configuring points earning

Transactions by any group member should credit the shared group bucket:

1. In **Loyalty+ > Programs**, open the **Workflows** tab.
2. Create a condition on the `TransactionAdd` activity using the `currentCustomer.isGroupMember==Yes` expression to scope it to group members.
3. Set the action to **Transaction point allocation** for user groups.

   <Image align="center" border={true} width="80%" src="https://files.readme.io/b8d68a6b7ba6fb7815378055777e4eb57f15bc5192e8c8efe0748a8e4cb26924-image.png" />

### Step 3: Configuring tier synchronisation

The group tier does not sync automatically. Use a primary-led synchronisation pattern:

1. Configure event notifications for `tierUpgraded`, `tierDowngraded`, and `tierRenewed`.
2. When a webhook fires, parse the payload to identify the tier name. Match the `upgradedTierNumber` (or `downgradedTierNumber`) against the `tiers` array to find the tier name. Do not use the tier number directly in the manual adjustment call.
3. Call the Retrieve User Group Members List API to get all secondary member IDs.
4. For each secondary member, call `POST /v2/slab/manualSlabAdjustment` with the tier name from the payload. Repeat for every secondary member retrieved.

***

# B2B use case

## Fleet owner earns from driver transactions

**Description:** A fuel brand wants to reward fleet companies based on the combined refuelling activity of their drivers. Each time a driver refuels, points are credited to the fleet owner's shared group wallet. The fleet owner manages all redemptions; drivers cannot redeem.

### Prerequisites

* Enable `CONF_USER_GROUP_ENABLED` for the organisation by raising a JIRA ticket to the Capillary product support team.
* Enable `FLEET_GROUP_LOYALTY_ENABLED` for the organisation to activate fleet-specific earning and expiry logic.
* Set `FLEET_ENTITY_TYPE` to configure the entity type used for fleet group loyalty.
* Ensure your POS or API integration is configured to pass the `member_card_swiped` extended field (or equivalent) in the `AddTransaction` payload to indicate whether a transaction is a group transaction.
* [Configure webhooks](https://docs.capillarytech.com/docs/setup-test-behavioral-events#add-webhook-integration) for `tierUpgraded`, `tierDowngraded`, and `tierRenewed` events to support tier synchronisation.
* [Configure a Neo extension dataflow](https://docs.capillarytech.com/docs/configuration-setup) to receive webhook events and call the manual tier adjustment API.

### Step 1: Creating the fleet hierarchy

Before creating any group or associating customers, define the hierarchy structure using `POST /v2/fleetHierarchy`. The hierarchy defines the role levels (for example, Owner and Driver) and the rules governing how they relate to each other.

**Example request body:**

```json
{
  "name": "Fleet Hierarchy",
  "code": "FLEET_HIER_001",
  "description": "Hierarchy for fleet owner and driver roles",
  "isAutoGroupCreationEnabled": true,
  "isHierarchyCreationStrict": true,
  "isSkipRoleAllowed": false,
  "isDefault": true,
  "isActive": true
}
```

The key fields to configure:

| Field                        | Description                                                                                                                               |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `isAutoGroupCreationEnabled` | When `true`, a group is automatically created when a customer is assigned to the owner role. No manual group creation API call is needed. |
| `isHierarchyCreationStrict`  | When `true`, members must follow the exact role sequence. A driver cannot be added without an owner being present.                        |
| `isSkipRoleAllowed`          | When `true`, intermediate roles in the hierarchy can be bypassed. Set to `false` for a strict owner-driver model.                         |

### Step 2: Associating customers with the hierarchy

Once the hierarchy is defined, associate each customer with a role using the customer create or update API. Pass the `associationDetails` object with the hierarchy code, role, and company details.

**Example request body:**

```json
{
  "profiles": [
    {
      "identifiers": [
        {
          "type": "mobile",
          "value": "9781027293"
        }
      ]
    }
  ],
  "associationDetails": {
    "hierarchyCode": "FLEET_HIER_001",
    "roleCode": "Driver",
    "fleetCompany": {
      "name": "ABC Logistics",
      "hierarchyDefinitionCode": "FLEET_HIER_001",
      "externalId": "abc_logistics_001"
    }
  }
}
```

If `isAutoGroupCreationEnabled` is `true` on the hierarchy, assigning the owner role automatically creates the group. For driver associations, the driver is added to the owner's existing group.

### Step 3: Creating the group entity

If auto group creation is not enabled, create the group manually using `POST /v2/userGroup2` after the hierarchy is set up.

**Example request body:**

```json
{
  "externalId": "fleet_ug_001",
  "groupName": "ABC Logistics Fleet",
  "maxGroupSize": 20,
  "extendedFields": {
    "ug_status": "Active",
    "ug_registration_date": "2025-11-10T15:10:00Z"
  }
}
```

### Step 4: Adding members to the group

Use `POST /v2/userGroup2/join` to add the fleet owner as the primary member and drivers as secondary members. Block redemption and transfer for drivers so that only the fleet owner can redeem.

**Example request body for the fleet owner:**

```json
[
  {
    "userId": 564662499,
    "primaryMember": true,
    "permissions": [
      "allow_points_redemption",
      "allow_points_transfer"
    ],
    "defaultGroup": true,
    "active": true
  }
]
```

**Example request body for a driver:**

```json
[
  {
    "userId": 564662500,
    "primaryMember": false,
    "permissions": [
      "block_points_redemption",
      "block_points_transfer"
    ],
    "defaultGroup": true,
    "active": true
  }
]
```

### Step 5: Configuring points earning

Configure a mutually exclusive workflow in Loyalty+ so that group transactions credit the group wallet and individual transactions credit the individual wallet:

1. Create a transaction-level extended field (for example, `member_card_swiped`) with values `Yes` and `No`.
2. Configure your POS integration to pass `Yes` when the fleet card is swiped, and `No` or null otherwise.
3. In **Loyalty+ > Programs**, open the **Workflows** tab and create two conditions for the `TransactionAdd` activity:

   * Individual transaction condition: `currentTxn.extField_member_card_swiped=="No" || currentTxn.extField_member_card_swiped.isNull()`with the action set to **Transaction point allocation** for individuals.

     <Image align="center" border={true} width="80%" src="https://files.readme.io/bd05e019b75c6cf09b30c50faf0aa15248169f340f6043745b3500b41a586b04-image.png" />
   * Group transaction condition: `currentTxn.extField_member_card_swiped=="Yes"`, with the action set to **Transaction point allocation** for user groups.

     <Image align="center" border={true} width="80%" src="https://files.readme.io/fbfaea52b15ff6c82558bf257c20ab4e3aab8bd2b4597fc32296f42f1a1c0003-image.png" className="border" />
4. Select **Save and Continue**, then **Publish changes**.

### Step 6: Configuring tier synchronisation

The group tier does not sync automatically. Use a primary-led synchronisation pattern:

1. Configure event notifications for `tierUpgraded`, `tierDowngraded`, and `tierRenewed`.
2. When a webhook fires, parse the payload to identify the tier name. Match the `upgradedTierNumber` (or `downgradedTierNumber`) against the `tiers` array to find the tier name. Do not use the tier number directly in the manual adjustment call.
3. Call the Retrieve User Group Members List API to get all secondary member IDs.
4. For each secondary member, call `POST /v2/slab/manualSlabAdjustment` with the tier name from the payload. Repeat for every secondary member retrieved.

***

## Multi-level buyer group with role-based earning

**Description:** A consumer goods brand operates through a network of regional distributors and store owners. Regional distributors manage multiple store owners beneath them. All purchases by store owners contribute to the distributor's group wallet. The regional distributor controls redemption; store owners can only earn points.

### Prerequisites

* Enable `CONF_USER_GROUP_ENABLED` for the organisation by raising a JIRA ticket to the Capillary product support team.
* Enable `FLEET_GROUP_LOYALTY_ENABLED` for the organisation to activate fleet-specific earning and expiry logic.
* Set `FLEET_ENTITY_TYPE` to configure the entity type used for fleet group loyalty.
* [Configure webhooks](https://docs.capillarytech.com/docs/setup-test-behavioral-events#add-webhook-integration) for `tierUpgraded`, `tierDowngraded`, and `tierRenewed` events to support tier synchronisation.
* [Configure a Neo extension dataflow](https://docs.capillarytech.com/docs/configuration-setup) to receive webhook events and call the manual tier adjustment API.

### Step 1: Creating the distributor hierarchy

Define the hierarchy with skip-role support to allow Store Owners to be linked directly to Regional Distributors when no Area Manager is needed.

**Example request body:**

```json
{
  "name": "Distributor Hierarchy",
  "code": "DIST_HIER_001",
  "description": "Regional distributor and store owner hierarchy",
  "isAutoGroupCreationEnabled": true,
  "isHierarchyCreationStrict": false,
  "isSkipRoleAllowed": true,
  "isDefault": true,
  "isActive": true
}
```

Setting `isSkipRoleAllowed` to `true` allows a Store Owner to be associated directly with a Regional Distributor, bypassing the Area Manager level for smaller regions.

### Step 2: Associating customers with the hierarchy

Associate each customer with their role using the customer create or update API. Pass the `associationDetails` object with the hierarchy code and role assignment.

**Example: Associating a store owner with a regional distributor's company:**

```json
{
  "profiles": [
    {
      "identifiers": [
        {
          "type": "mobile",
          "value": "9876543210"
        }
      ]
    }
  ],
  "associationDetails": {
    "hierarchyCode": "DIST_HIER_001",
    "roleCode": "StoreOwner",
    "fleetCompany": {
      "name": "North Region Distributors",
      "hierarchyDefinitionCode": "DIST_HIER_001",
      "externalId": "north_region_001"
    }
  }
}
```

If `isAutoGroupCreationEnabled` is `true`, the group is created automatically when the Regional Distributor is onboarded. Store Owners are added to the existing group as secondary members.

### Step 3: Creating the group entity

If auto group creation is not enabled, create the group manually after hierarchy setup.

**Example request body:**

```json
{
  "externalId": "dist_ug_north_001",
  "groupName": "North Region Distributor Group",
  "maxGroupSize": 100,
  "extendedFields": {
    "ug_status": "Active",
    "ug_registration_date": "2025-11-10T15:10:00Z"
  }
}
```

### Step 4: Adding members to the group

Add the Regional Distributor as the primary member with full redemption rights. Add Store Owners as secondary members with redemption blocked.

**Example request body for a store owner:**

```json
[
  {
    "userId": 564662501,
    "primaryMember": false,
    "permissions": [
      "block_points_redemption",
      "block_points_transfer"
    ],
    "defaultGroup": true,
    "active": true
  }
]
```

### Step 5: Configuring points earning

All store owner transactions should credit the distributor's group wallet. Configure earning via Loyalty+ promotions rather than core loyalty rules:

1. Define a promotion triggered by the `TransactionAdd` activity.
2. Scope eligibility using the `currentCustomer.isGroupMember==true` condition to target group members only.
3. Set the reward action to **Transaction point allocation** for user groups.

   <Image align="center" border={true} width="80%" src="https://files.readme.io/b8d68a6b7ba6fb7815378055777e4eb57f15bc5192e8c8efe0748a8e4cb26924-image.png" />
4. Select **Save and Continue**, then **Publish changes**.

### Step 6: Configuring tier synchronisation

The group tier does not sync automatically. Use a primary-led synchronisation pattern:

1. Configure event notifications for `tierUpgraded`, `tierDowngraded`, and `tierRenewed`.
2. When a webhook fires, parse the payload to identify the tier name. Match the `upgradedTierNumber` (or `downgradedTierNumber`) against the `tiers` array to find the tier name. Do not use the tier number directly in the manual adjustment call.
3. Call the Retrieve User Group Members List API to get all secondary member IDs.
4. For each secondary member, call `POST /v2/slab/manualSlabAdjustment` with the tier name from the payload. Repeat for every secondary member retrieved.