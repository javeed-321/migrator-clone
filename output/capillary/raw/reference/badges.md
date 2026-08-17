---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Badges

Badges are a visual form of recognition used within loyalty programs to acknowledge customers for their progress, specific actions, or achievements. They serve as a means of gamification, instilling a sense of pride and accomplishment within users, reinforcing targeted behaviors, and enhancing engagement.

# Supported fields and objects

<Table>
  <thead>
    <tr>
      <th>
        Object
      </th>

      <th>
        Field Name
      </th>

      <th>
        Description
      </th>

      <th>
        Mandatory/Optional
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        General
      </td>

      <td>
        orgId
      </td>

      <td>
        Unique ID associated with the brand.
      </td>

      <td>
        Mandatory
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        id
      </td>

      <td>
        Unique id of the badge.
      </td>

      <td>
        Mandatory
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        name
      </td>

      <td>
        Name for the badge.
      </td>

      <td>
        Mandatory
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        description
      </td>

      <td>
        Detailed description of the badge.
      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        startOn
      </td>

      <td>
        Start date of the badge.\
        Timestamp in the ISO 8601 standard format format YYYY-MM-DDTHH:MM:SS.SSSZ, where:  

        \- YYYY: Year with four digits (e.g., 2024)  

        * MM: Month with two digits (01 for January, 02 for February, and so on)
        * DD: Day with two digits (01 to 31)
        * T: Separator between date and time
        * HH: Hour with two digits in 24-hour format (00 to 23)
        * MM: Minutes with two digits (00 to 59)
        * SS: Seconds with two digits (00 to 59)
        * SSS: Milliseconds with three digits (000 to 999)
        * Z: Indicates that the timestamp is in UTC (Coordinated Universal Time) timezone
      </td>

      <td>
        Mandatory
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        expiresOn
      </td>

      <td>
        Expiry of the badge.\
        Timestamp in the ISO 8601 standard format format YYYY-MM-DDTHH:MM:SS.SSSZ, where:  

        \- YYYY: Year with four digits (e.g., 2024)  

        * MM: Month with two digits (01 for January, 02 for February, and so on)
        * DD: Day with two digits (01 to 31)
        * T: Separator between date and time
        * HH: Hour with two digits in 24-hour format (00 to 23)
        * MM: Minutes with two digits (00 to 59)
        * SS: Seconds with two digits (00 to 59)
        * SSS: Milliseconds with three digits (000 to 999)
        * Z: Indicates that the timestamp is in UTC (Coordinated Universal Time) timezone
      </td>

      <td>
        Mandatory
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        active
      </td>

      <td>
        Activation flag on top of status of the badge.
      </td>

      <td>
        Mandatory
      </td>
    </tr>

    <tr>
      <td>
        Earned Badge Expiry
      </td>

      <td>
        expiryType
      </td>

      <td>
        Defines how the badge expiry is calculated.
      </td>

      <td>
        Mandatory
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        type
      </td>

      <td>
        For ABSOLUTE expiryType.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        expiresOn
      </td>

      <td>
        For FIXED\_DATE type.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        expireWithBadgeMeta
      </td>

      <td>
        For WITH\_BADGE\_META type.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        relativeExpiryType
      </td>

      <td>
        For RELATIVE expiryType.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        value
      </td>

      <td>
        Number of days/weeks/months for RELATIVE expiryType.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        Issued Badge Expiry
      </td>

      <td>
        Same as Earned Badge Expiry
      </td>

      <td>
        Same structure as Earned Badge Expiry.
      </td>

      <td>
        Mandatory
      </td>
    </tr>

    <tr>
      <td>
        Customer Constraints
      </td>

      <td>
        constraintType
      </td>

      <td>
        Type of customer constraint.
      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        maxEarnLimit
      </td>

      <td>
        For CUSTOMER\_BADGE\_FIXED\_VALUE.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        maxEarnForDays
      </td>

      <td>
        For CUSTOMER\_BADGE\_ROLLING\_WINDOW.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        rollForDays
      </td>

      <td>
        Rolling window in days.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        maxEarnForWeeks
      </td>

      <td>
        Maximum earn for weeks.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        rollForWeeks
      </td>

      <td>
        Rolling window in weeks.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        maxEarnForMonths
      </td>

      <td>
        Maximum earn for months.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        rollForMonths
      </td>

      <td>
        Rolling window in months.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        Badge Constraints
      </td>

      <td>
        constraintType
      </td>

      <td>
        Type of badge constraint.
      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        maxEarnLimit
      </td>

      <td>
        For BADGE\_FIXED\_VALUE.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        rollType
      </td>

      <td>
        For BADGE\_ROLLING\_WINDOW.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        rollValue
      </td>

      <td>
        Rolling value for BADGE\_ROLLING\_WINDOW.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        Images
      </td>

      <td>
        name
      </td>

      <td>
        Name of the badge image.
      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        fileSvcHandle
      </td>

      <td>

      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        url
      </td>

      <td>

      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        tag
      </td>

      <td>
        Tag for image state.
      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>
        Ownership
      </td>

      <td>
        restrictedToOwners
      </td>

      <td>
        Defining an owner for the badge is mandatory.
      </td>

      <td>
        Mandatory
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Claims
      </td>

      <td>
        Modules that have claimed the badge and the reference ID for the module.
      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>
        Benefits
      </td>

      <td>
        benefitType
      </td>

      <td>
        Type of benefit linked to the badge.
      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        seriesId
      </td>

      <td>
        Required if benefitType is COUPON.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        Tags
      </td>

      <td>
        name
      </td>

      <td>
        Name of the custom field.
      </td>

      <td>
        Optional
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        value
      </td>

      <td>
        Value of the custom field.
      </td>

      <td>
        Optional
      </td>
    </tr>
  </tbody>
</Table>