---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Retro Enrolment and Issue of Badges

# Overview:

The Retroactive Badge Issuance enables organizations to acknowledge and reward customers for their past transactions or actions and allows the issuing of expired badges.\
**Example:**\
Suppose a brand introduces a new loyalty badge called "Gold Shopper." The badge is awarded to customers who have made a total purchase of $500 between Oct 1 - Oct 30th.

Without Retroactive Badge Issuance, a customer who reached the $500 threshold before the badge was introduced would not receive the "Gold Shopper" badge.

With Retroactive Badge Issuance, the Retroactive Badge Issuance feature allows the platform to identify customers who met the $500 threshold even before the badge was introduced.\
Customers who made qualifying purchases in the past say six months ago, would retroactively receive the "Gold Shopper" badge, acknowledging their loyalty.

In retroactive badge flows, the system evaluates badge eligibility based on the event (sail) date, while the actual badge issuance date may differ and is used for triggering subsequent rewards or perks.
**Example:**\
If a customer makes a qualifying purchase on March 11, 2025 (sail date), but the badge is issued on April 20, 2025, the badge allocation is based on the March 11 event.

# Key concepts:

* **Event Date vs. Issual Date** - Retroactive badges are based on the event date (when the customer action happened), ensuring accurate recognition. The issuance date (when the badge is awarded) triggers additional rewards or perks triggered by awarding the badge.
* **Issuance expiry**: Badges expire based on the current date/processing date, not the event date.
* Timezone: Retroactive badge issuances consider the timezone configured at the organisational level.
* **Restrictions:**
  * Fixed Windows badge constraint - If selected, restrictions will be checked based on the event date if fixed Windows restrictions are chosen for the badge.
  * Rolling windows badge constraint - Restrictions based on rolling windows are not handled in retro enrolment.

# Handling upcoming, live and expired badges

<br />

<Table>
  <thead>
    <tr>
      <th>
        Badge Scenario
      </th>

      <th>
        Badge type
      </th>

      <th>
        Handling Approach
      </th>

      <th>
        Additional API Considerations
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Upcoming Badges
      </td>

      <td>
        -
      </td>

      <td>
        Retroactive Handling: Not Applicable
      </td>

      <td>
        -
      </td>
    </tr>

    <tr>
      <td>
        Active Badge Scenarios
      </td>

      <td>
        Enrol & Issue
      </td>

      <td>
        * Expired Enrolment: No retroactive handling. Requires re-enrolment before issuance for the badge issue. The badge issue date will be calculated based on the current processing date.
      </td>

      <td>
        * Enrol API: The event date must align with the badge's active period.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Direct enrolment and issue
      </td>

      <td>
        Directly issue the badge.
      </td>

      <td>
        -
      </td>
    </tr>

    <tr>
      <td>
        Expired Badges
      </td>

      <td>
        Enrol & Issue Type
      </td>

      <td>
        * Valid Enrolment: Directly issue the badge. - Expired Enrolment: Enrol first, then issue. - No Enrolment: Enrol first, then issue.
      </td>

      <td>
        * Enrol API: The event date must align with the badge's active period. - Issue API: The event date must fall between the enrolled event date and the enrolment expiry.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Direct enrolment & issue
      </td>

      <td>
        Directly issue the badge.
      </td>

      <td>
        -
      </td>
    </tr>
  </tbody>
</Table>

## Configuring retroactive badge issuance window

You can define the period that needs to be considered for the customer's past actions.

To define, perform the following:

1. Navigate to **Intouch > Organisation settings > Billing**.
2. Define the below configurations:
   * **CONF\_CLIENT\_RETRO\_MAX\_ALLOWED\_AGE\_DAYS**: This parameter determines the maximum allowed age (in days) for retroactive transactions. For example, if the value is set to 30 days, customers can claim badges for transactions that occurred within the last 30 days from the registration date.
   * **CONF\_CLIENT\_RETRO\_DELAY\_SINCE\_REGISTRATION\_HOURS**: This parameter introduces a buffer time or delay (in hours) since customer registration before they can claim retroactive badges.

For more information on Retro transactions, refer to the [Retro transaction documentation](https://docs.capillarytech.com/docs/tag-not-interested-transactions#configuring-the-window-period-for-retro-transaction).

**Note:** If the badge metadata such as the end date of the badge changes, the time until which the badge can be issued retroactively will also change based on the retro configs defined at an org level. For example, if the configured retro days are 30 and the badge expiry date is extended for 10 days, the retroactive days will be calculated from this new expiry date.

<Image alt=" " border={false} src="https://lh7-us.googleusercontent.com/bJ6OhNw2obxG8JLNBF00O61ECalwkJQEgx4UL8R3dGNwq_NXJF1HHNldVS0C0lvvmMK-qCiBRVdThlfARGcy2to2czomN8XEr85fLXKRtQRYOsx2QXYVOwjxwjEdV3jAKRd5jPhWjLdTa57JtgDv6Rc" />

## Example

Consider a badge with the following characteristics:

* Active period: October 1st to 15th
* Type: Enrol\&Issue (requires both enrolment and issuance)
* Enrolment expiry: 2 days after enrolment
* Badge issuance expiry: 2 days after issuance
* Current date: October 20th
* \`\`: October 10th
* Retro days configured to 30 days

<Table>
  <thead>
    <tr>
      <th>
        **Scenario**
      </th>

      <th>
        **Description**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Enrolment status
      </td>

      <td>
        The enrol instance succeeds as the enrol event date is between the badge start date and end date and will expire on October 12th.
      </td>
    </tr>

    <tr>
      <td>
        : October 14th
      </td>

      <td>
        As the enrolment expires on October 12th, this will result in an invalid issue event of the badge.
      </td>
    </tr>

    <tr>
      <td>
        Issue event date: October 11th
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        Fixed Restriction (a customer can be issued a maximum of two badges  every three days)
      </td>

      <td>
        * If a single badge was issued between the 10th to 12th Oct, the customer will receive an additional badge on October 11th.
      </td>
    </tr>
  </tbody>
</Table>

* If two badges were issued between the 10th to 12th Oct, the customer is ineligible for any further badges.
* If no badge was issued between the 10th to 12th Oct, the customer will receive a badge on October 11th. |
  \| Issue event date: October 20th.
* customer reports a "badge not issued" complaint irrespective of his/her eligibility
* Restriction: Rolling window (Customer can get the badge twice in last 2 days) | - Issue instances on the current date will be checked, if two badges were issued in the previous two days,  the badge will not be issued to the customer
* On 20th Oct, if only one badge was issued to the customer for the last two days, the customer will be issued one more badge
* If on 20th Oct no badge was issued for the last 2 days, the customer will be issued one badge
* Expiry: The expiry of the badge is calculated from the current date, hence this issue will expire on 22nd Oct |
  \| Issue event date: Oct 20th\
  Customer registers on Oct 20th for loyalty | Badge not issued irrespective of eligibility. |

# Refer to the APIs below:

[Enroll customers in badges](https://docs.capillarytech.com/reference/enroll-customers-in-badges)

[Issue badge to the customer](https://docs.capillarytech.com/reference/issue-badge-to-the-customer)