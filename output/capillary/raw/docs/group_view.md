---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Group view

This section provides you with information on how to view details related to user groups.

> 📘 Group view is visible only if configuration `ENABLE_USER_GROUP_LOYALTY` is enabled. You can raise a ticket to sustenance for enabling this config.

In Group view, you can view group information, group members, status, interactions and other loyalty details of a group. For information on user groups, see [User group](https://docs.capillarytech.com/docs/group-loyalty).

To view the overview of customer details:

1. Log on to InTouch and navigate to **Member Care**.
2. In the **Search** ,  from the drop-down, select **Groups**.
3. In the search box, you can search using the group external id or any primary member identifier enter the group name from the search result list and select the group.

<Image align="center" className="border" border={true} src="https://files.readme.io/2702c62-small-Search_group.png" />

The group view page includes the following information:

* Basic details of the group
* Overview
* Loyalty details
* Events
* Incentives details

By default, the application displays the **Overview** tab. The **Overview** tab displays the basic details of the group.

# Overview

<Image align="center" className="border" border={true} src="https://files.readme.io/54aa037-Overview_.png" />

The overview tab includes below details:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        No.
      </th>

      <th>
        Title
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        1
      </td>

      <td>
        Group basic info
      </td>

      <td>
        Displays the following:

        * Present status of the group
        * Group name
        * Group registered data
        * Group external id
      </td>
    </tr>

    <tr>
      <td>
        2
      </td>

      <td>
        Group primary member detail
      </td>

      <td>
        Displays the name of the group's primary member along with the primary identifier detail.
      </td>
    </tr>

    <tr>
      <td>
        3
      </td>

      <td>
        Group member details and lifetime spend
      </td>

      <td>
        Displays the number of members in the group and the total amount spent by the group. You can also click the download icon and download the group member list.
      </td>
    </tr>

    <tr>
      <td>
        4
      </td>

      <td>
        Group program detail
      </td>

      <td>
        Displays the program to which the group is assigned. For example, gold, classic etc.
      </td>
    </tr>

    <tr>
      <td>
        5
      </td>

      <td>
        Recent transactions
      </td>

      <td>
        Displays the most recent transactions performed by any group member.
      </td>
    </tr>

    <tr>
      <td>
        6
      </td>

      <td>
        Group status
      </td>

      <td>
        Displays the total number of active members, exited members and total lifetime purchases.
      </td>
    </tr>

    <tr>
      <td>
        7
      </td>

      <td>
        Customers
      </td>

      <td>
        Displays the group member list with their role, joined date, points earned by each and permissions set for each member. You can click the download icon and download the group members list.
      </td>
    </tr>

    <tr>
      <td>
        8
      </td>

      <td>
        Group points
      </td>

      <td>
        Enables you to assign points for a group
      </td>
    </tr>
  </tbody>
</Table>

# Loyalty details

To view the group loyalty details, navigate to the **Loyalty** tab.

## Tier details

This section shows the below details related to tier:

* Tier category
* Validity details
* Points required to upgrade the tier
* Tier change log

<Image align="center" className="border" border={true} src="https://files.readme.io/fe728be-View_tier_history.png" />

## Program Points Summary

This section shows a points summary of the selected program. You can view details of all the types of available points such as current points, lifetime points, redeemed points, return points, adjusted points, and promised points.

<Image align="center" className="border" border={true} src="https://files.readme.io/8e93ead-small-Program_point_summary.png" />

## Trackers

This shows the trackers that are currently active for the selected user profile.

<Image align="center" className="border" border={true} src="https://files.readme.io/9d5b2d0-small-Trackers.png" />

# Events

The events tab displays the complete transaction details of the group such as transaction number, transacted time, transaction ID, group member who performed the transaction, loyalty program associated with points issued, store at which the transaction is made, transaction amount, discount applied, details of points, line items, payment, and more.

> 📘 The primary difference between the event tab in customer view and group view is that the group view also displays the specific group member's information responsible for the transaction.

<Image align="center" className="border" border={true} src="https://files.readme.io/cf64013-small-Events.png" />

# Incentives

The incentive tab displays include information about all points-related (earn/burn/expiry/return) and point schedule events related to loyalty. This also displays the detail of the group member who performed the event.  This is similar to the group ledger API.

> 📘 The primary difference between the Incentives tab in customer view and group view is that the group view also displays the specific group member's information responsible for the event.

<Image align="center" className="border" border={true} src="https://files.readme.io/17ab477-GRoup_Incentive.png" />

# Issue group points

See [Issue group points](https://docs.capillarytech.com/docs/issue-goodwill-points-coupons#new-membercare-issue-goodwill-points).