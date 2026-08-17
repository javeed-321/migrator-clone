---
updatedAt: 2026-04-22T05:37:02.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create and Manage Groups

Create friends and family groups, business groups, manage members, and delete groups.

Creating and managing user groups is a structured process that covers group creation, membership configuration, and lifecycle management. The following steps guide you through each stage. There are two types of groups: friends-and-family groups and business groups.

# Creating a friends and family group

A friends and family group is a simple user group with a simple hierarchy: a primary member with administrator privileges and secondary members with no permissions or permissions to redeem or transfer points.

## Step 1: Creating a group

Start by creating a user group and defining basic details, such as the user group name, external identifier, and maximum group size. You can also add additional metadata using extended fields.

To create a user group, use the [POST `/v2/userGroup2` API](https://docs.capillarytech.com/reference/add-group) to create a user group and define the following:

| Field            | Description                                                                  |
| :--------------- | :--------------------------------------------------------------------------- |
| `groupName`      | Display name for the group                                                   |
| `maxGroupSize`   | Maximum number of members allowed                                            |
| `externalId`     | Your internal identifier for the group                                       |
| `extendedFields` | Optional custom metadata such as status, avatar URL, registration date, etc. |

> 📘 **Note on extended fields:**
>
> Extended fields for user groups are not arbitrary key-value pairs. They must first be created as extended fields for the `usergroup2` entity type — raise a support ticket to Capillary to have these configured at the backend. Once created, enable them using the Configure Org Extended Field API (`POST /v2/organization/entity/extended_field_config`), specifying `usergroup2` as the entity type. Refer to the [Extended Fields](https://docs.capillarytech.com/docs/extended-fields) documentation for more information.

Example request body:

```json
{
  "externalId": "family_ug_1",
  "groupName": "FamilyGroup1",
  "maxGroupSize": 6,
  "extendedFields": {
    "ug_status": "Active",
    "group_avatar_url": "https://example.com/avatar.png",
    "ug_registration_date": "2025-11-10T15:10:00Z"
  }
}
```

**You have created the group entity and are now ready to update its details or begin adding members.**

## Step 2: Adding members and defining permissions

Once you have created a user group, you can add a primary member and secondary members and define permissions for the members.

### Adding a member

To add members to a user group, use the [POST `/v2/userGroup2/join` API](https://docs.capillarytech.com/reference/join-member-to-group). Set the `primaryMember` value to `true` for the primary member. You can also define permissions to allow or block users from transferring and redeeming points.

The payload structure comprises the following:

| Field           | Description                                                           |
| :-------------- | :-------------------------------------------------------------------- |
| `userId`        | The identifier of the member                                          |
| `primaryMember` | Indicate if the member to be added is a primary member                |
| `permissions`   | The permissions for the member                                        |
| `defaultGroup`  | Indicate if the group is the default group for all group transactions |
| `active`        | Indicate if the member is active in the group                         |

Example request:

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

### Assigning permissions to a member

Permissions can be set at join time using the `permissions` array in the `/v2/userGroup2/join` payload.

| Permission                | Description                                                  |
| :------------------------ | :----------------------------------------------------------- |
| `allow_points_redemption` | Allows the member to redeem points from the group wallet     |
| `allow_points_transfer`   | Allows the member to transfer points out of the group wallet |
| `block_points_redemption` | Blocks the member from redeeming group points                |
| `block_points_transfer`   | Blocks the member from transferring group points             |

To remove a secondary member from the group, see [Removing a secondary member](#removing-a-secondary-member).

You can also create a more structured setup for corporate use cases.

# Creating a business group

A business group is a structured user group with a defined hierarchy. Unlike a friends-and-family group, it can comprise multiple roles with varying permissions, and members are assigned to roles based on their position in the organisational structure.

Setting up a business group is a four-step process:

* Define the hierarchy
* Associate customers with the heirarchy
* Create the group entity
* Add members to the user group.

## Step 1: Create a hierarchy

Define the hierarchy structure before creating any group or associating any customers. See [Create a hierarchy](https://docs.capillarytech.com/docs/hierarchy) for more information.

## Step 2: Associate the hierarchy with a customer

Once the hierarchy is defined, associate it with a new or existing customer using the `associationDetails` object in the associte customer [create](https://docs.capillarytech.com/reference/associate-customer) or [update](https://docs.capillarytech.com/reference/update-association-details) API call.

| Field                                  | Description                                                                              |
| :------------------------------------- | :--------------------------------------------------------------------------------------- |
| `hierarchyCode`                        | The code of the hierarchy definition to associate the customer with                      |
| `roleCode`                             | The role assigned to the customer within the hierarchy (for example, `Drivers`, `Owner`) |
| `fleetCompany.name`                    | Display name of the company entity                                                       |
| `fleetCompany.hierarchyDefinitionCode` | The hierarchy definition code for the company                                            |
| `fleetCompany.externalId`              | The identifier for the company                                                           |

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
    "hierarchyCode": "SIL0101",
    "roleCode": "Drivers",
    "fleetCompany": {
      "name": "X Company",
      "hierarchyDefinitionCode": "SIL0101",
      "externalId": "c_123"
    }
  }
}
```

## Step 3: Create a user group and add members

Follow the steps described in [Creating a friends and family group](#creating-a-friends-and-family-group):

* Create the group entity using `POST /v2/userGroup2` and
* Add members using `POST /v2/userGroup2/join`.

Once a group is created and its members are added, you can perform ongoing membership management such as transfers and removals.

# Managing members

Once a group is created and populated, you can manage membership through dedicated API endpoints. This section covers assigning permissions, removing members, and handling ownership changes.

## Removing a secondary member

To remove a secondary member, use `DELETE /v2/userGroup2/{groupId}/leave` (see [Remove group member](https://docs.capillarytech.com/reference/remove-group-member)). Identify the member using the `identifierName` and `identifierValue` query parameters.

**Example request:**

```shell
curl -L -X DELETE 'https://eu.api.capillarytech.com/v2/userGroup2/3952525/leave
  ?source=INSTORE
  &identifierName=mobile
  &identifierValue=918988123462' \
-H 'Authorization: Basic {token}'
```

> 📘 **Note:**
>
> Only secondary members can be removed this way. Removing the primary member has a different outcome. See [Deleting a group](#deleting-a-group).

## Transferring members between groups

Merging two groups into one is not supported. However, you can move specific members between groups using the transfer API. This is useful when reorganising group structures or consolidating members after a group is dissolved.

Use `POST /v2/userGroup2/transfer` (see [Transfer group member](https://docs.capillarytech.com/reference/transfer-group-member)) and provide the source group ID (`leaveGroupId`), the destination group ID (`joinGroupId`), and a list of member user IDs to move.

**Example request:**

```shell
curl -L 'https://eu.api.capillarytech.com/v2/userGroup2/transfer' \
-d '{
  "leaveGroupId": "3917591",
  "joinGroupId": "3916144",
  "userIds": [564829146, 564709342]
}'
```

> 📘 **Note:**
>
> Points are not transferred automatically when members move between groups. Handle point transfers separately before or after initiating the member transfer.

### **Transaction returns after group updates**

When a member makes a purchase as part of a group and then changes groups before returning the item, the return transaction may be blocked by default. This is because the system validates the member's current group context against the original transaction's group context.

You can override this behavior to allow returns even after the member has moved to a different group. This is particularly relevant in fleet or B2B programs where member transfers between groups are common.

To do this, enable the `CONF_ALLOW_TRANSACTION_RETURN_AFTER_GROUP_TRANSITION` flag by raising a JIRA ticket to the Capillary product support team.

> 📘 **Note:**
>
> Enabling this flag can result in negative group wallet balances. When a return is processed after the original points have already been redeemed, the reversal pushes the group balance below zero.

When a group is no longer needed, it can be deleted through the API.

# Deleting a group

To delete a user group, use `DELETE /v2/userGroup2` (see [Delete user group](https://docs.capillarytech.com/reference/delete-user-group)) with the group's `id` or `externalId` as query parameters.

**Example request:**

```shell
curl -L -X DELETE 'https://eu.api.capillarytech.com/v2/userGroup2?id=3916904&externalId=uat_ug_10_delete_1' \
-H 'Authorization: Basic {token}'
```

By default, a user group is deactivated when the primary member leaves. All members lose access to the shared wallet, and the group can no longer be managed or searched in Member Care. You can override this behavior to keep the group active even after the primary member exits. This is useful when the group's operations should continue independently of the original owner.

**Example:** A fleet owner decides to leave the program. Rather than immediately dissolving the fleet group, the brand enables this flag to keep the group active to allow secondary members to earn and redeem group points.

To do this, enable the `CONF_DISABLE_GROUP_DEACTIVATION_ON_PRIMARY_MEMBER_EXIT` flag by raising a JIRA ticket to the Capillary product support team.

> 📘 **Note:**
>
> When enabled, the group remains active but has no primary member. It is not possible to add a new primary member or reassign primary membership to an existing member once the primary member has exited the user group. Points in the group wallet remain accessible to members with redemption permissions during this period.

<br />