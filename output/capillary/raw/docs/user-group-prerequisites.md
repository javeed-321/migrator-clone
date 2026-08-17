---
updatedAt: 2026-04-02T06:49:13.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Prerequisites

Configuration flags and prerequisites required to enable User Group Loyalty.

To implement User Group Loyalty, ensure the following configurations are completed. All organizational flags listed below require a JIRA ticket submitted to the Capillary Product Support Team to be enabled.

# 1. Configure the loyalty program

Before enabling group-specific features, a loyalty program must be active and incentives such as the tiers, points issual and expiry rules must be defined. This program can be used for both individuals and user groups.

# 2. Enable the mandatory user group flags

These flags are required to enable user groups for your organization:

* `CONF_USER_GROUP_ENABLED`: Must be set to `true` to enable any user group functionality.
* `CONF_USER_GROUP_SIZE`: Enables membership capping. Use this to restrict the maximum number of members per group (e.g., limiting a "Family Plan" to 5 members to prevent system abuse).

  Example: With a cap of 5, a group may consist of 1 primary member and 4 secondary members. Any attempt to add a 6th member will be automatically declined.

# 3. Enable the mandatory fleet hierarchy flags

These additional flags are required to enable fleet-based (business) user groups for your organization:

* `IS_HEIRARCHY_STRICT`: Enforcement of exact role sequences. Skipping intermediate roles is prohibited.
* `IS_SKIP_ROLE_ALLOWED`: Bypasses intermediate roles, allowing direct assignment for example, Owner directly to Driver.
* `GROUP_CREATION_ENABLED`: Set to `true` to trigger automatic group creation whenever a user is assigned to a specific hierarchy role. This is recommended for fleet programs to streamline member association.

# 4. Enable flags for OTP verification and security

Define the level of authentication required for group modifications. Choose one of the following flags based on your security requirements:

* `CONF_USER_GROUP_OTP_ENABLE`: Mandates OTP verification for all join and leave actions for every member.
* `CONF_USER_GROUP_PRIMARY_USER_OTP_ENABLE`: Restricts OTP verification to administrative actions performed by the primary member, for example removing members or editing group settings.