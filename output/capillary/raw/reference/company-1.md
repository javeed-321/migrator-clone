---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Company

Company is an entry in the fleet hierarchy.  An org can have child and parent companies. This entity contains APIs to manage companies of the org.

## Status Codes

### Error Codes

| Code | Description                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 400  | Invalid input : `{x}`.                                                                                                               |
| 1600 | Fleet code `{x}` exists.                                                                                                             |
| 1601 | Fleet minimum number of roles `{x}` not met.                                                                                         |
| 1602 | Fleet maximum number of roles `{x}` exceeded.                                                                                        |
| 1603 | Fleet role code cannot be empty or null.                                                                                             |
| 1604 | Fleet max child per role cannot be negative.                                                                                         |
| 1605 | Max limit of `{0}` on total number of child per role exceeded for `{1}`. Contact support team to increase the limit.                 |
| 1606 | Duplicate fleet role codes passed in the payload.                                                                                    |
| 1607 | Invalid child role code passed `{x}`.                                                                                                |
| 1608 | Cyclic hierarchy is not supported.                                                                                                   |
| 1609 | Fleet hierarchy ID/code `{x}` is invalid.                                                                                            |
| 1610 | Fleet hierarchy is not active.                                                                                                       |
| 1611 | Fleet max child not passed for the role `{x}`.                                                                                       |
| 1612 | Fleet child role code not passed for the role `{x}`.                                                                                 |
| 1613 | Fleet hierarchy code cannot be null or empty.                                                                                        |
| 1614 | Any one role needs to be marked as aggregation level for auto group creation to be enabled.                                          |
| 1615 | Role Code `{x}` is invalid.                                                                                                          |
| 1616 | Fleet hierarchy code invalid `{x}`.                                                                                                  |
| 1617 | Fleet role code for the child customers doesn't qualify the hierarchy.                                                               |
| 1618 | Total number of child for the role `{0}` can not exceed `{1}`.                                                                       |
| 1619 | Group ID `{x}` invalid.                                                                                                              |
| 1620 | User `{0}` does not belong to group `{1}`.                                                                                           |
| 1621 | User with `{x}` does not exist.                                                                                                      |
| 1622 | Users do not belong to the same company.                                                                                             |
| 1623 | User `{0}` already present in group `{1}`.                                                                                           |
| 1624 | Group transfer not allowed for primary member `{0}`.                                                                                 |
| 1625 | Fleet parent customer `{x}` not mapped in the hierarchy.                                                                             |
| 1626 | Customer is already mapped to a different hierarchy.                                                                                 |
| 1627 | Customer fleet user role can't be changed.                                                                                           |
| 1628 | Customer fleet company can't be changed.                                                                                             |
| 1629 | Fleet role permission code cannot be null or empty.                                                                                  |
| 1630 | Fleet role permission code not exist.                                                                                                |
| 1631 | Fleet role permission code `{x}` duplicated.                                                                                         |
| 1632 | Fleet group ID/externalID/primary userID `{x}` passed is not valid.                                                                  |
| 1633 | Fleet group external ID `{x}` already exists.                                                                                        |
| 1634 | Fleet group externalId can't be null.                                                                                                |
| 1635 | Fleet group query param is not passed.                                                                                               |
| 1636 | Customer is already a member of the group.                                                                                           |
| 1637 | Primary member exists for the group.                                                                                                 |
| 1638 | Total members in the group reached maximum group capacity `{x}`.                                                                     |
| 1639 | Fleet group max size cannot exceed product limit `{x}`.                                                                              |
| 1640 | Fleet group max size field should be a positive value.                                                                               |
| 1641 | Invalid permission code `{x}` passed.                                                                                                |
| 1642 | Fleet user is primary member in a different group.                                                                                   |
| 1643 | Nothing to update in the fleet group.                                                                                                |
| 1644 | Fleet group details not passed.                                                                                                      |
| 1645 | Fleet group details passed are not valid.                                                                                            |
| 1646 | Fleet group transfer entity type invalid.                                                                                            |
| 1647 | Get trackers entity type not set/invalid. Supported types include `FLEET`,`CUSTOMER`.<br />Default Fleet group not set for the user. |
| 1648 | Multiple child customers cannot be marked as default for the same parent customer.                                                   |
| 1649 | Only one role should be marked as points aggregation role.                                                                           |
| 1650 | Role can not be both pointsAggregationRole and nonAutomatedPointsAggregationRole.                                                    |
| 1651 | Points transfer from a group can not be done by a user who is not part of the group.                                                 |
| 1701 | Fleet hierarchy code `{x}` does not exist.                                                                                           |
| 1702 | Company externalID `{x}` already exists.                                                                                             |
| 1703 | Parent company externalID `{0}` does not exist.                                                                                      |
| 1704 | Company does not exist with given ID/externalID `{x}`.                                                                               |
| 1705 | Fleet company is inactive.                                                                                                           |
| 1706 | Fleet company cannot be activated.                                                                                                   |
| 1707 | Fleet `{x}` externalID cannot be null or empty.                                                                                      |
| 1708 | Fleet company identifiers ID/externalID should pass.                                                                                 |
| 1709 | Fleet company cannot be parent company itself.                                                                                       |
| 1710 | Cyclic parenting not supported.                                                                                                      |
| 1711 | Fleet hierarchy update is not allowed.                                                                                               |