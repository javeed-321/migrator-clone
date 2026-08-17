---
updatedAt: 2026-07-03T12:56:24.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Profile : Current Customer

currentCustomer (Customer Profile)- Allows you to write conditions based on the properties of the customer who is currently performing the activity.

## Attributes - Customer Identity

*The below grouping of attributes is based on customer identity information.*

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attributes
      </th>

      <th>
        Definition
      </th>

      <th>
        Link
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        name
      </td>

      <td>
        Customer’s Full Name.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/attributes-namefirst-namelast-name#name)
      </td>
    </tr>

    <tr>
      <td>
        firstname
      </td>

      <td>
        Customer’s First Name\
        string.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/attributes-namefirst-namelast-name#first-name--last-name-)
      </td>
    </tr>

    <tr>
      <td>
        lastname
      </td>

      <td>
        Customer’s Last Name.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/attributes-namefirst-namelast-name#first-name--last-name-)
      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        Customer's Email ID.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/attributes-namefirst-namelast-name#email)
      </td>
    </tr>

    <tr>
      <td>
        externalId
      </td>

      <td>
        Customer's External ID.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/attributes-namefirst-namelast-name#external-id-externalid)
      </td>
    </tr>

    <tr>
      <td>
        mobile
      </td>

      <td>
        Mobile number of a customer.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/attributes-namefirst-namelast-name#mobile)
      </td>
    </tr>

    <tr>
      <td>
        hasInstoreProfile
      </td>

      <td>
        Checks if the current customer is registered and has an in-store Profile.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/attributes-namefirst-namelast-name#hasinstoreprofile)
      </td>
    </tr>

    <tr>
      <td>
        hasWeChatProfile
      </td>

      <td>
        Returns True, if the current customer has a WeChat Profile.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/attributes-namefirst-namelast-name#haswechatprofile)
      </td>
    </tr>
  </tbody>
</Table>

## Attributes - Custom Field

*The below grouping of attributes is based on custom fields created at the customer level.*

| Attributes               | Definition                                                        | Link                                                                                               |
| :----------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| customFieldValueIncludes | Check if the customer has some custom field present with a value. | [Learn More](https://docs.capillarytech.com/docs/attributes-custom-field#customfieldvalueincludes) |
| customFieldValueExcludes | If the customer has some custom field present.                    | [Learn More](https://docs.capillarytech.com/docs/attributes-custom-field#customfieldvalueexcludes) |
| customFieldValueExists   | checks If the customer data has some custom field present.        | [Learn More](https://docs.capillarytech.com/docs/attributes-custom-field#customfieldvalueexists)   |

## Attributes - KPI based on Points

*The below grouping of attributes is based on the Key Performance Indicators on customer's points.*

| Attributes            | Definition                                                        | Link                                                                                                                |
| :-------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| currentPoints         | Customer's current redeemable points.                             | [Learn More](https://docs.capillarytech.com/docs/attributes-current-customer-points#attribute--currentpoints)       |
| initialCurrentPoints  | Customer's current redeemable points before evaluating the event. | [Learn More](https://docs.capillarytech.com/docs/attributes-current-customer-points#attribute-initialcurrentpoints) |
| currentAllPoints      | The sum of all Points, redeemable as well as Promised Points.     | [Learn More](https://docs.capillarytech.com/docs/attributes-current-customer-points#currentallpoints)               |
| lifetimePoints        | Total points earned by a customer from the date of registration.  | [Learn More](https://docs.capillarytech.com/docs/attributes-current-customer-points#lifetimepoints)                 |
| lifetimeAllPoints     | The sum of lifetimePoints and lifetimeNonRedeemablePoints.        | [Learn More](https://docs.capillarytech.com/docs/attributes-current-customer-points#lifetimeallpoints)              |
| initialLifetimePoints | Customer's lifetime redeemable points before the current event.   | [Learn More](https://docs.capillarytech.com/docs/attributes-current-customer-points#intiallifetimepoints)           |

## Attributes - KPI based on transaction data

*The below grouping is done based on the Key Performance Indicators on the customer's transaction data.*

| Attributes              | Definition                                                                | Link                                                                                        |
| :---------------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| avgBasketSize           | Returns the average number of line items present in a transaction.        | [Learn More](https://docs.capillarytech.com/docs/attributes-kpis#1-attribute-avgbasketsize) |
| avgSpendPerVisit        | This is the average amount a customer is spending on a transaction.       | [Learn More](https://docs.capillarytech.com/docs/attributes-kpis#2-avgspendpervisit)        |
| numberOfTxns            | Number of transactions since the registration date of the customer        | [Learn More](https://docs.capillarytech.com/docs/attributes-kpis#3-numberoftxns)            |
| numberOfTxnsToday       | Number of transactions made by a customer on the current day.             | [Learn More](https://docs.capillarytech.com/docs/attributes-kpis#4-numberoftxnstoday)       |
| numberOfVisits          | Number of unique days when a customer made the transaction                | [Learn More](https://docs.capillarytech.com/docs/attributes-kpis#5-numberofvisits)          |
| lifetimePurchase        | Customer's purchases since start including current transaction's purchase | [Learn More](https://docs.capillarytech.com/docs/attributes-kpis#6-lifetimepurchase)        |
| InitialLifetimePurchase | Customer's purchase since start before current transaction's purchase     | [Learn More](https://docs.capillarytech.com/docs/attributes-kpis#7-initiallifetimepurchase) |

## Attributes - Date

| Attribute | Definition        | Link                                                                          |
| :-------- | :---------------- | :---------------------------------------------------------------------------- |
| joinDate  | Registration date | [Learn More](https://docs.capillarytech.com/docs/attribute-joindate#joindate) |

## Attributes - Tracker based

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Definition
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        trackerValueBeforeEvent
      </td>

      <td>
        Gets the tracker value of a customer excluding the current event — the total accumulated across all previous events. Can be used in any set of the workflows, and can be used in loyalty promotions also.  

        Trackers that are created based on alternate currencies will only work with this profile, as those tracker won't be visible in tracker/points-tracker sets.  

        **Note:** Use this function when checking cumulative thresholds in tier upgrade conditions (for example, verifying that a customer has completed a target number of rentals). Because it reflects the total before the current event is processed, the comparison is stable regardless of the order in which sets are evaluated.  

        * \*E.g.:\*\*currentCustomer.trackerValueBeforeEvent("Tracker name", "Case name")>\<=X
      </td>
    </tr>

    <tr>
      <td>
        trackerValueCurrentEvent
      </td>

      <td>
        Gets the tracker value of a customer including the changes that happened during the current event (until the previous set). Can be used in any set of the workflows (evaluation set, end set), and can be used in loyalty promotions also.  

        Trackers that are created based on alternate currencies will only work with this profile, as those tracker won't be visible in tracker/points-tracker sets.  

        **Note:** For cyclic or calendar-based trackers where each transaction contributes a fixed unit (for example, 1 rental = 1 unit), this function returns only that event's contribution, not the running total. A condition like `trackerValueCurrentEvent >= 6` will therefore always be false after any individual rental. To check whether a customer has reached a cumulative threshold across multiple events, use `trackerValueBeforeEvent` instead.  

        * \*E.g.:\*\*currentCustomer.trackerValueCurrentEvent("Tracker name", "Case name")>\<=X
      </td>
    </tr>
  </tbody>
</Table>

## Attributes - Slab Information

*This grouping of attributes is done on the basis of Tier/Slab Information associated with the customer's loyalty.*

| Attributes        | Definition                                                              | Link                                                                                           |
| :---------------- | :---------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| initialSlabName   | Initial slab name of the Current Customer before evaluating an event.   | [Learn More](https://docs.capillarytech.com/docs/attribute-slab-information#initialslabname)   |
| initialSlabNumber | Initial slab number of the Current Customer before evaluating an event. | [Learn More](https://docs.capillarytech.com/docs/attribute-slab-information#initialslabnumber) |
| slabName          | Customer’s current tier name.                                           | [Learn More](https://docs.capillarytech.com/docs/attribute-slab-information#slabname)          |
| slabNumber        | Current Customer slab number let's say 10, 1, 3, etc                    | [Learn More](https://docs.capillarytech.com/docs/attribute-slab-information#slabnumber)        |

## Attributes - User Segment (EI)

*This grouping of attributes is based on the User Segment (Cluster) creations over the customer's base by brands.*

| Attributes           | Definition                                                                     | Link                                                                                                |
| :------------------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| clusterValueIncludes | Returns true, if a customer belongs to a particular cluster (segment).         | [Learn More](https://docs.capillarytech.com/docs/user-segment-ei-attributes#cluster-value-includes) |
| clusterValueExcludes | Returns true, if a customer does not belong to a particular cluster (segment). | [Learn More](https://docs.capillarytech.com/docs/user-segment-ei-attributes#cluster-value-excludes) |

## Attribute - Other

| Attribute | Definition                                                                   | Link                                                                                         |
| :-------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| isLoyal   | Checks if the current customer is registered in the brand's loyalty program. | [Learn More](https://docs.capillarytech.com/docs/attributes-namefirst-namelast-name#isloyal) |

## Attribute - Customer status & label

| Attribute           | Definition                                                       | Link                                                                        |
| :------------------ | :--------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| customerStatus      | When one wants to write rules based on the staus of the customer | [Link](https://docs.capillarytech.com/docs/attribute-customer-status-label) |
| customerStatusLabel | When one wants to write rules based on the label of the customer | [Link](https://docs.capillarytech.com/docs/attribute-customer-status-label) |

### Customer status behavior and possible values

The `customerStatus` attribute reflects the current status of the customer profile. Common values include `ACTIVE`, `INACTIVE`, and `NOT SET`.

* When a customer registers via MAPP\_SDK and no status is provided, the system sets the status to `NOT SET` by default.
* If the same customer later registers via INSTORE, the system treats this as a profile combine. The status remains `NOT SET` unless the INSTORE registration explicitly sets a status.
* If your organization has not enabled the default option to set new users as `ACTIVE`, only INSTORE registrations with an explicit status will set the status to `ACTIVE`.
* Customers with a `NOT SET` status may experience login issues, as some systems require an `ACTIVE` status for successful login.

**Recommendation:**

* Enable the default option to set new users as `ACTIVE` if you want all new registrations to have an active status.
* Ensure that INSTORE registrations explicitly set the status to avoid unintended `NOT SET` values.

## Attribute - Milestones & Streaks

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Definition
      </th>

      <th>
        Link
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        avgTargetAchieved(targetName)
      </td>

      <td>
        Returns the average of the target value achieved by the customer across the cycles of the milestone (target). 
      </td>

      <td>
        [Link](https://docs.capillarytech.com/docs/attributes-milestones-streaks#avgtargetachievedtargetname)
      </td>
    </tr>

    <tr>
      <td>
        targetAchievedInPeriod(targetName, periodRefCode)
      </td>

      <td>
        Returns the target value achieved by the customer in a specific cycle/period of a particular milestone.  

        `periodRefCode` is the name of the cycle, not the cycle ID.
      </td>

      <td>
        [Link](https://docs.capillarytech.com/docs/attributes-milestones-streaks#targetachievedinperiodtargetname-periodrefcode)
      </td>
    </tr>

    <tr>
      <td>
        isStreakAchieved(streakName)
      </td>

      <td>
        Returns a true/false value indicating whether a user has achieved a specific streak level. Assume there is a streak (ABC) with two levels in it (ABC\_1, ABC\_2).  

        This will indicate whether the customer has achieved the specific level or not.
      </td>

      <td>
        [Link](https://docs.capillarytech.com/docs/attributes-milestones-streaks#isstreakachievedstreakname)
      </td>
    </tr>

    <tr>
      <td>
        streakCurrentValue(streakName)
      </td>

      <td>
        Returns the current streak value of the customer (instead of a simple true/false) for a specific streak level.
      </td>

      <td>
        [Link](https://docs.capillarytech.com/docs/attributes-milestones-streaks#streakcurrentvaluestreakname)
      </td>
    </tr>

    <tr>
      <td>
        targetsAchievedForUnified(unifiedTargetGroupName, periodRefCode)
      </td>

      <td>
        Returns the number of targets achieved by the user in a specific cycle/period of a specific unified target.  

        Assume there is a unified target (ABC) that contains three targets (A, B, C) which the user has to achieve. This will return the number of targets achieved by the user in a cycle of ABC.
      </td>

      <td>
        [Link](https://docs.capillarytech.com/docs/attributes-milestones-streaks#targetsachievedforunifiedunifiedtargetgroupname-periodrefcode)
      </td>
    </tr>

    <tr>
      <td>
        targetAchievedInCurrentPeriod(targetName)
      </td>

      <td>
        Returns the target value achieved by the customer during the current cycle.\
        Only target name is required here and there's no need to specify the cycle's refCode. If there is no current cycle, the return value will be 0.
      </td>

      <td>
        [Link](https://docs.capillarytech.com/docs/attributes-milestones-streaks#targetachievedincurrentperiodtargetname)
      </td>
    </tr>

    <tr>
      <td>
        targetsAchievedForUnifiedInCurrentPeriod(unifiedTargetGroupName)
      </td>

      <td>
        Returns the number of targets achieved by the user during the current cycle of a specific unified target.\
        Only target name is required here and there's no need to specify the cycle's refCode If there is no current cycle, the return value will be 0.
      </td>

      <td>
        [Link](https://docs.capillarytech.com/docs/attributes-milestones-streaks#targetsachievedforunifiedincurrentperiodunifiedtargetgroupname)
      </td>
    </tr>
  </tbody>
</Table>

## Attributes - Customer Subscription Status

*The below grouping of attributes is based on customer's subscription status for various communication channels.*

| Attribute                                              | Definition                                                               | Link                                                                     |
| :----------------------------------------------------- | :----------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| currentCustomer.isSubscribedToChannel("*ChannelName*") | Checks if the customer is subscribed to a specfic communication channel. | [Link](https://docs.capillarytech.com/docs/customer-subscription-status) |