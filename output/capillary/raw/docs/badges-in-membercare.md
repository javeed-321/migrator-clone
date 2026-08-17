---
updatedAt: 2026-08-02T18:29:29.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Badges in Membercare

Badges are a type of visual recognition used in loyalty programs to reward customers for their progress, specific actions or achievements. Customer can view their badges details from membercare.

**To view a badge in Membercare, follow these steps:**

1. Navigate to **Membercare** >> **Incentives** >> **Badges**. Under the Badges section, you can see all the details of the badges which are available for the customer.

<Image alt="Badges in Membercare" align="center" border={true} src="https://files.readme.io/b4be1104ca353b51c4675fa571965c00373b2d690e94e6c469f601678a192f94-image.png">
  Badges in Membercare
</Image>

2. Select the filter tabs to filter the badges based on the type

**These are the available filters for badges:**

## Available to Enrol

The`Available to Enrol` section includes the badges of the type **[Enrol and Issue](https://docs.capillarytech.com/docs/type-of-badges#enrol-and-issue-badges-issue-earn)** where customer can enrol and then issue the badge. Customers can browse these badges, read their descriptions, and review the badges details. Only **[Enrol and Issue](https://docs.capillarytech.com/docs/type-of-badges#enrol-and-issue-badges-issue-earn)** type of badges can be viewed here.

> **Note:** For badges configured with the 'Enrol and Issue' flow, the customer must be enrolled or issued the badge before any earn action is processed. If a customer is not enrolled or issued the badge, earn requests will be rejected and no badge-earned record will be created. Promotion conditions, such as lifetime purchase value, are evaluated before badge actions are generated.

## Available to Issue

The `Available to Issue` section includes the badges that can either be directly issued using the **[Direct Issue](https://docs.capillarytech.com/docs/type-of-badges#direct-issue-earn)** type or are already enrolled and ready to be issued to customers using the **[Enrol and Issue](https://docs.capillarytech.com/docs/type-of-badges#enrol-and-issue-badges-issue-earn)** type. All badges from both the **[Enrol and Issue](https://docs.capillarytech.com/docs/type-of-badges#enrol-and-issue-badges-issue-earn)** and **[Direct Issue](https://docs.capillarytech.com/docs/type-of-badges#direct-issue-earn)** types can be viewed here.

## Issued

The `Issued` section includes badges that have been successfully issued to customers and are now active in the customer's profile. Customers can view these badges in their profiles, including detailed information about their benefits, validity periods, and status. When the validity period of an issued badge ends, these badges will expire.

## Expired

The `Expired` section includes badges that are no longer active and have completed their validity periods. These badges remain accessible for reference purposes, allowing customers to review past achievements.

<Image alt="Types of Badges" align="center" border={true} src="https://files.readme.io/867596a296b7eca3b00a1094a0d8749e15c3f343cffdd7d0e062fb0c054769c2-Enrollment_and_Issuance_Steps.gif">
  Types of badges
</Image>

3. Click on a particular Badge to see the details of the badge, **Badge's timeline** and **Additional details** of the Badge. A quick view card on the left shows the following details. For example:\
   Badge Name : VIP\
   Creation Date and time : Nov 21, 2024 1:44 AM\
   Summary of badge timeline : 6 times issued

<Image align="center" className="border" width="75% " border={true} src="https://files.readme.io/5424d948c047bafe1236d8bb7e70ca2e089024cbcbdef37020bc1863d4f2a57c-Screenshot_2025-01-21_at_12.48.13_PM.png" />

You can view these information about the badge:

* Badge Details
* Badge's timeline
* Additional details

## Badge Details

Detailed information of the badges which includes, Badge ID, Description, Status, Start date, End date, Type, Owned by, Claimed by.

<Image alt="Details of Badge" align="center" width="50% " border={true} src="https://files.readme.io/c2ad149e6b450612b42ddf3426ee0e0bbae8341a575b6d283ee9d2307956e99f-image.png">
  Details of Badge
</Image>

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Badge ID
      </td>

      <td>
        Unique ID of the badge which is generated when you create the badge.
      </td>
    </tr>

    <tr>
      <td>
        Description
      </td>

      <td>
        Description of the badge.
      </td>
    </tr>

    <tr>
      <td>
        Status
      </td>

      <td>
        Status of the badge whether it is **Active**, **Inactive** or **Expired**.
      </td>
    </tr>

    <tr>
      <td>
        Start Date
      </td>

      <td>
        Timestamp indicating when the badge is active.
      </td>
    </tr>

    <tr>
      <td>
        End Date
      </td>

      <td>
        Timestamp indicating when the badge expires.
      </td>
    </tr>

    <tr>
      <td>
        Type
      </td>

      <td>
        Type of badge.\
        `Direct issue`: A direct issue badge is directly awarded to customers without enrolling the customer to that badge. or `Enrol and issue badges`: Enrol and issue badges require customers to be enrolled in the badge first and then issue the badge to that customer.
      </td>
    </tr>

    <tr>
      <td>
        Owned By
      </td>

      <td>
        Module under which the badge is owned, including categories such as `Loyalty`, `Loyalty Promotion`, `Referral Campaign`, `Broadcast Campaign`, `Journey`, and `Milestones`.
      </td>
    </tr>

    <tr>
      <td>
        Claimed By
      </td>

      <td>
        Module where the badge was claimed. For example, `Loyalty`, `Loyalty Promotion`, `Referral Campaign`, `Broadcast Campaign`, `Journey`, and `Milestones`.
      </td>
    </tr>
  </tbody>
</Table>

## Badge's Timeline

Detailed timeline of all badge items which include Issual or Enrolment. Including badge issual, badge revocation, benefits linked with the badge and badge expiration. Multiple badge

<Image alt="Badge's Timeline" align="center" width="35% " border={true} src="https://files.readme.io/48a667eae6e4db44d57340c7050e6cb01f67b05b94af5c27c8bd4f3e83e41bb2-image.png">
  Badge's timeline
</Image>

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Status
      </td>

      <td>
        Status of the badge item whether it is **Live**, **Expired**,**Revoked**. The status is independent for each issual or enrolment. Example: If the status of Issual 1 is LIVE, it is specific to that issual and not for the overall badge status.
      </td>
    </tr>

    <tr>
      <td>
        Issual/Enrolment expires on
      </td>

      <td>
        Indicates when the badge issual or enrolment will expire. Possible Values:

        * **On fixed date**: Badge will expire on a specified date.
        * **After specific period from badge issual**: Badge will expire after a specific period from the badge issual date.
        * **Along with badge**: Badge expiry will be same as badge end date.
        * **Never expires**: Badges will never expire.
      </td>
    </tr>

    <tr>
      <td>
        Expires on
      </td>

      <td>
        Timestamp indicating when the badge will get expired.
      </td>
    </tr>

    <tr>
      <td>
        Issual/Enrolment ID
      </td>

      <td>
        Unique ID of the badge which is generated when you issue or enrol the badge to a customer.
      </td>
    </tr>

    <tr>
      <td>
        Issued/Enrolled by
      </td>

      <td>
        Modules under which the badge is issued or enrolled, including categories such as `Loyalty`, `Loyalty Promotion`, `Referral Campaign`, `Broadcast Campaign`, `Journey`, and `Milestones`.
      </td>
    </tr>

    <tr>
      <td>
        Benefits linked
      </td>

      <td>
        Benefits linked with the badge.
      </td>
    </tr>

    <tr>
      <td>
        Revoked on
      </td>

      <td>
        Timestamp indicating when the badge is revoked.
      </td>
    </tr>
  </tbody>
</Table>

## Additional Details

Additional information about the badge. For example: Terms and Condition.

<Image alt="Additional Details" align="center" width="40% " border={true} src="https://files.readme.io/c02c28c9f151ef3c5f90addd489f9b778e09b6b3ba338872b464a505b5c534c9-image.png">
  Additional details
</Image>