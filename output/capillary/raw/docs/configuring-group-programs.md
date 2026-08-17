---
updatedAt: 2026-04-22T05:41:12.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure Group Programs

Enrol groups in loyalty programs, set up promotions, and configure group trackers.

This page covers how to configure a loyalty program for user groups in the Loyalty+ UI. It includes enrolling groups in programs, setting up tier definitions and trackers, and configuring how points are earned, allocated, and redeemed. This page is intended for marketers and program administrators.

# Enrolling a group in a program

Group enrolment to the loyalty program happens automatically through the API. When you create a user group using `POST /v2/userGroup2` and add a primary member using `POST /v2/userGroup2/join`, the group is associated with the default loyalty program for your organisation. No separate enrollment step is required.

The configurations required before a group can participate in a program are covered in the [Prerequisites](./prerequisites-and-limitations.md) section. Ensure the relevant flags are enabled before creating and enrolling groups.

## Writing conditions for user groups

To write workflow conditions based on the group entity on loyalty workflows, use the `currentUserGroup` profile.

For the full list of available attributes and operators, refer to the [Profiles](https://docs.capillarytech.com/docs/profile-current-user-group) documentation.

> 📘 **Note on `currentCustomer.isGroupMember`:**
>
> `currentCustomer.isGroupMember` evaluates the customer's group membership status at the time the workflow processes the event, not at the time the transaction was submitted. The valid value is `==Yes` — using `==true` is not valid and will cause the condition to evaluate incorrectly. This attribute is supported for the `TransactionAdd` activity.

# Setting up promotions for user groups

Promotions for user groups are configured in Loyalty+ using the same workflow as standard promotions, with group-specific qualifying conditions applied to scope eligibility correctly.

Three sets of attributes are available for targeting group members:

* **Group primary member**:  Define eligibility based on the primary member's profile, such as their tier, lifetime purchases, or points balance. These are useful when you want to create a promotion based on the group owner's attributes.
* **Current group primary** These attributes work similar to group primary member, but evaluate the primary member's data at the exact moment the event occurs, rather than at a fixed point.
* **User group** These attributes let you define conditions based on the group entity itself, such as the group's current points balance, tier status, member count, or lifetime purchases.

For the full list of supported attributes and operators for each category, refer to the [Qualifying Conditions and Attributes](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions) documentation.