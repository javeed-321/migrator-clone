---
updatedAt: 2026-06-02T06:03:03.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Trackers

Tracker is a powerful tool to track custom values over a specific period. You can use trackers for **Eligibility** and **Renewal** strategies and also in **Workflows** for certain milestones. The custom values are **bill amount, gross bill amount, line-item count, line-item quantity, line item price,** and **customer visits**. You can create tracker strategies and define rule sets based on these custom values.

Tracker values are always scoped by the relevant Concept (for example, Playground Concept). This means tracker calculations and results apply only within the selected Concept.

> 📘 **Note**
>
> Trackers are executed based on the TILL time but not based on the time specified for a transaction.

## Creating Trackers

You can set transaction event trackers by following these steps.

1. On **Intouch**, navigate to **Loyalty+** > **Programs**.
2. In **Programs**, select the program you want to edit.
3. Click **Edit Program** and select **Trackers**.
4. Click **Add Trackers**.

<Image alt="SFz286UjwC6Pffgbr5etxMjGBRH0SMPbag.png 80% " border={false} src="https://files.readme.io/e9771bc-SFz286UjwC6Pffgbr5etxMjGBRH0SMPbag.png" />

5. In **Name**, enter the tracker name.
6. In **Tracked entity**, select any of the following entities that you want to track

| Entity                     | Description                                                                                                                                                                                                                                    |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Transaction amount         | Create tracker cases based on the net transaction amount (with discount). For example, if the gross bill amount is $120 and the discount is $20, the (net) bill amount is $100.                                                                |
| Transaction discount       | Create tracker cases based on the discount amount of a transaction.                                                                                                                                                                            |
| Transaction gross amount   | Create tracker cases based on the gross transaction amount (without discount). For example, if the net bill amount is $100 after a discount of $20, the gross bill amount is $120.                                                             |
| Transaction total quantity | Create tracker cases based on the total quantity of all line items purchased during the tracker period. For example, if a customer makes 10 transactions with 20 line items of quantity 3 each in 90 days, then the bill total quantity is 60. |
| Line-item amount           | Create tracker cases based on the purchase value of individual line items.                                                                                                                                                                     |
| Line-item count            | Create tracker cases based on the number of line items purchased. For example, a customer can have 10 transactions for 20 days where the line items are 200.                                                                                   |
| Line-item quantity         | Create tracker cases based on the number of line items purchased. For example, a customer can have 10 transactions with 22 line items for 90 days. The number of line items purchased could be 50.                                             |
| Customer visits            | Create tracker cases based on the count of unique bills of a customer.                                                                                                                                                                         |
| Points                     | Create tracker cases based on the number of points earned during the tracking period.                                                                                                                                                          |
| Transaction extended field | Create tracker cases on a transaction-level extended field. You can use extended fields with datatypes Integer or Double.                                                                                                                      |
| Line-item extended field   | Create tracker cases on a transaction line-item-level extended field. You can use extended fields with datatypes Integer or Double.                                                                                                            |

<Image alt="LjP8Qrbv4q-DBtuF-aRiLTGLoeTLuFwdrQ.png 40% " border={false} src="https://files.readme.io/e15bb0e-LjP8Qrbv4q-DBtuF-aRiLTGLoeTLuFwdrQ.png" />

7. In the **Tracking Method**, select any of the following methods to track entities.

| Method            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Moving Window** | In Moving Window mode, when a customer makes a transaction, the tracker condition is checked for the previous X days or months (number of days or months set in **Track for \_\_\_ days/months**) until the transaction date. For month-based moving window trackers (for example, a 12-month moving window), the tracker window automatically shifts with each new month, even if the customer has not made any new transactions. As a result, the value shown always depends on the current tracking period, not only on recent activity. <br /><br /> Based on the cycle in which a transaction falls, the tracker cases are evaluated from starting of that cycle until the transaction date. Consider the following examples: <br /><br /> **Moving window (days):** <br /> A tracker was set up on April 5, 2025, to reward 200 bonus points if a customer spends $1000 within a 20-day period. For each transaction, the system looks back 20 days to calculate the total spend. So, for a purchase made on April 7, the tracker checks spend from March 18 to April 7. For a purchase on May 4, it checks from April 15 to May 4, and so on. <br /> This means the window shifts with every transaction, and the set of transactions included in the calculation can change daily. <br /><br /> **Moving window (months):** <br /> A tracker was set up on April 5, 2025, to reward 200 bonus points if a customer spends $1000 within a 1-month period. With month-based logic, the system includes full calendar months in the tracker window and will always start from the 1st of the previous month. So, if purchases are made on March 10th and April 10th, the system considers the spends from March 1st to April 30th. If another purchase is made on May 1st, the window shifts forward—dropping March—and now includes April 1st to May 31st. This approach ensures more stable and predictable tracking by updating only once per month. <br /><br /> To track from the start of the same month, enter the value of **Track for \_\_\_** as `0`. For example, if a purchase is made on 10th April 10th, and **Track for \_\_\_**=`0`, the system considers spend from April 1st to April 30th. |
| **Cyclic Window** | In Cyclic Window mode, when a customer makes a transaction for the first time after the tracker is configured, cycles of equal intervals are created for that customer based on the transaction date. The duration of each cycle depends on the value set in **Track for \_\_\_ days**. <br /><br /> Based on the cycle in which a transaction falls, the tracker cases are evaluated from starting of that cycle until the transaction date. Consider the following example: <br /><br /> A tracker was created on Apr 5, 2019, with a condition to reward a bonus of 200 points on a transaction of $1000 in 20 days ( **Track for \_\_\_ days** ). <br /> Assume that a customer makes subsequent transactions on Apr 7, May 4, 10, and 22. <br /><br /> - In Cyclic Window mode, based on the first transaction date (Apr 7) of the customer (after the strategy is configured), cycles are created with equal intervals of 20 days each.For the first transaction ( Apr 7) the condition is checked only for that day. As the second transaction falls in Cycle 2 (May 4), the condition is checked from starting of the second cycle until the transaction day (Apr 27 - May 4). Similarly, the fourth transaction falls in Cycle 3 and the condition is checked from May 27 - May 22.                                                                                                                                                                                                               > 📘 **Note — Moving Window**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

> The window is anchored to the **bill date** in the transaction payload, not the date the transaction was processed. If transactions are sent with delayed or out-of-order bill dates, the tracker value the system uses for tier evaluation may be lower than what MemberCare shows (which always reflects today's total).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
> \| **Calendar Based Cyclic Window** | Cycles of calendar months are created based on the Start Date and the number of months set irrespective of the transaction date. <br /><br /> For example, if a Calendar based Cyclic Window is created with the start date Apr 5 and the number of months 3, then the cycles are created for three calendar months as shown in the illustration below. Then, based on the date of the transaction, the corresponding cycle will be considered.<br /><br /> > Note<br /> > <br /> > If you set a future start date, the system may shift the cycle window to the past during renewal evaluation. This can cause historical point values to be counted.
> \| **Tier Change Window**           | Calculates tracker values considering the last tier change date. For example, if a customer's tier changed on Aug 2, 2020, tracker values will be calculated from Aug 2, 2020, until the current date.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

<Image alt="vcJC-Y4w6IhO2OtzSfjzE1hRrlwwNLx3hg.png 40% " border={false} src="https://files.readme.io/a22355a-vcJC-Y4w6IhO2OtzSfjzE1hRrlwwNLx3hg.png" />

> 📘 **Note**
>
> Trackers need to be incorporated in Workflows to define when they need to be evaluated and what happens when the milestone conditions are met.

8. In **Case Name**, enter the name for the current tracker case.
9. Under**Track For**, enter the duration of the window to evaluate the tracker case.
10. Select a **Unit** from the dropdown menu, choosing between months or days.

<Image alt=" 100% " border={false} src="https://files.readme.io/3429ebe106f6242d8f905ebf2c71ecb49d2fdcf1e494fdefbd91b9cb703de7be-Screenshot_2025-04-04_at_2.38.01_PM.png" />

8. In **What are the tracker's milestones**, select any of the following options for two fields and enter the desired value.\
   Define the condition of that tracker case in this field. For example, if the Sum of transactions in **365 days** are **Equal to$1000**.

<Image alt="n51JZ0dYsetjZ7-7ljnx5ijT33V1L9s8jA.png smart" border={false} src="https://files.readme.io/fd49339-n51JZ0dYsetjZ7-7ljnx5ijT33V1L9s8jA.png" />

#### **Field 1**:

<Table>
  <thead>
    <tr>
      <th>
        Option
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Sum
      </td>

      <td>
        It is the total of tracked entity values for the specified duration.
        For example for Bill Amount, the sum is the total value of all transactions (amount) tracked for a set duration.
      </td>
    </tr>

    <tr>
      <td>
        Count
      </td>

      <td>
        It is the number of times the entity is tracked in a specified duration.
        For example, for Bill Amount, the count is the number of transactions tracked for a specified time period.
      </td>
    </tr>
  </tbody>
</Table>

#### **Field 2**:

| Option                   | Description                                                                                          |
| :----------------------- | :--------------------------------------------------------------------------------------------------- |
| Equal to                 | The condition becomes true if the Sum or Count is the same as the configured value                   |
| Greater than             | The condition becomes true if the Sum or Count is more than the configured value.                    |
| Less than                | The condition becomes true if the Sum or Count is less than the configured value.                    |
| Greater than or Equal to | The condition becomes true if the Sum or Count is either equal to or more than the configured value. |
| Less than or Equal to    | The condition becomes true if the Sum or Count is either equal to or less than the configured value. |
| Mod of                   |                                                                                                      |
| Between                  | The condition becomes true if the Sum or Count falls between the two configured values.              |

11. Enable **Limit No. of forwards per customer** and enter the value to limit the execution of the current tracker case.

> 📘 **Note**
>
> Once the case is executed successfully for X times for a customer (where X is the value specified in this field), the tracker case will not be evaluated for that customer again.

<Image alt="aONXa4LdHsW7KP_9ZKXaC2KIHjOIHIgVyQ.png smart" border={false} src="https://files.readme.io/4579bc8-aONXa4LdHsW7KP_9ZKXaC2KIHjOIHIgVyQ.png" />

12. You can add multiple tracker cases by clicking **Add Tracker Case**.

<Image alt="KImo_fm4LiczeR1hTXG6irKgtz5YPNx0eA.png smart" border={false} src="https://files.readme.io/f900f0e-KImo_fm4LiczeR1hTXG6irKgtz5YPNx0eA.png" />

13. Click **Save**.

> 📘 **Note**
>
> You can see the configured tracker case in **Preview**.

## Editing a Tracker

To edit a tracker, follow these steps:

1. In the Intouch homepage, go to **Loyalty+** > **Programs**.
2. In **Programs**, scroll down and select the program you want to edit.
3. Click **Edit Program** and scroll down to the **Trackers** section.
4. Click **Trackers**, select the menu button next to the tracker you want to edit, and choose **Edit**.
5. Make the necessary changes and select **Save**.

The tracker is now edited successfully.

<Image alt=" 80% " border={false} src="https://files.readme.io/31dd5d0f88c1cbbfbe186847e62db13d44449bd90ed96f169c0c85da95bfdb8f-Loyalty_Program_Tracker_Setup_Guide_1.gif" />

<br />

> 📘 **Note**
>
> When editing the name or case name for a tracker, update the same name under the tracker sets and point tracker sets under the [workflow section](https://docs.capillarytech.com/docs/trackers#adding-trackers-in-workflows) if used.

## Adding Trackers in Workflows

Once you create a tracker strategy, it is important to configure rule sets to start tracking entities set in tracker strategies, evaluate tracker cases, and trigger actions upon successful execution of tracker cases.

To configure tracker-based rules, go to the **Workflows** page and select **Makes a transaction** (Transaction Add) customer activity (It is usually going to be the activity selected by default).

<Image alt="Screenshot (151).png " border={false} src="https://files.readme.io/cb9d83e-Screenshot_151.png" />

<Image alt="Screenshot (152).png " border={false} src="https://files.readme.io/6436e59-Screenshot_152.png" />

<Image alt="dqkkUo0pvsr1iANc79JQZsIxk3LkPAYggg.png smart" border={false} src="https://files.readme.io/83e16db-dqkkUo0pvsr1iANc79JQZsIxk3LkPAYggg.png" />

The first parent set (Set1) is for new transaction activity, the second one is the TrackerSet where you can define rules on tracker cases. The last parent set is for the transaction finished activity.

<Image alt="uaRehmqoVm5m8bjVE33OhcryoNtY8sjJFg.png smart" border={false} src="https://files.readme.io/18ca093-uaRehmqoVm5m8bjVE33OhcryoNtY8sjJFg.png" />

When a transaction is made, the first set is invoked and forwards to the second set. The second set validates all the trackers and executes actions based on the rules and actions configured. The event then gets forwarded to the third set which completes the transaction event.

#### **To create tracker based rules, do the following**:

1. On the **EventsView** page, choose **TransactionAdd** event and navigate to TrackerSet.
2. Click **+Condition**.

<Image alt="dc3-LSKGEZ0mhs9Yo3zmGzW5uDR2ib_D3g.png smart" border={false} src="https://files.readme.io/ad384cf-dc3-LSKGEZ0mhs9Yo3zmGzW5uDR2ib_D3g.png" />

3. Leave **Expression** and **Expression equals** to true.
4. In the **When** field, click + and select the default **Forward to** Set action using **+Add action** > Click **Save** > **Enable transaction item** > Click **Save**.

<Image alt="ker5-iDfDuFutwa-Ju5ZYI8RUjv2khmULg.png smart" border={false} src="https://files.readme.io/b2ba5ad-ker5-iDfDuFutwa-Ju5ZYI8RUjv2khmULg.png" />

<Image alt="SH2xzZnoe95hNAKuIxH2mmNmqz16KaNb3g.png smart" border={false} src="https://files.readme.io/973528c-SH2xzZnoe95hNAKuIxH2mmNmqz16KaNb3g.png" />

A new tracker is created under the TrackerSet as shown above. The tracker name is generated by default. You cannot modify the tracker name. You can tag a tracker strategy to the tracker. Tag a tracker strategy to the tracker as explained in the following.

5. Navigate to the child tracker set. In the **When** condition click + and Select the **Tracker Evaluation** action and click Save.

<Image alt="rrKbmxMBijOwKzDZBDwg6FINdk3WyO2-RA.png smart" border={false} src="https://files.readme.io/efb44c4-rrKbmxMBijOwKzDZBDwg6FINdk3WyO2-RA.png" />

6. In **Add tracker evaluation action**, choose the tracker case for which you want to configure rules.

<Image alt="S0g4klbx5te-qmRkJ6nRGClCe4iU205ptg.png smart" border={false} src="https://files.readme.io/b2dfefe-S0g4klbx5te-qmRkJ6nRGClCe4iU205ptg.png" />

* In **Trackers** (Action field), choose the tracker strategy that you want to tag for the tracker and click **Save**.\
  Similarly, you can create multiple child tracker sets under the parent set. To know how to configure rules, see [Configuring Events](https://docs.capillarytech.com/docs/tiers-2).

<Image alt="rNekeLjqbPsWYaRPoGmwSI5qC53p32t7PQ.png smart" border={false} src="https://files.readme.io/956ef2f-rNekeLjqbPsWYaRPoGmwSI5qC53p32t7PQ.png" />

## Using Trackers in Tiers

Trackers offer powerful ways to control tier eligibility and renewal conditions based on recent activity. For example, you can upgrade a customer based on visits in the last year or purchases in a calendar month, and renew based on purchases made as part of a specific tier.

To set up:

1. Select "Tracker" as part of the eligibility criteria or renewal conditions.
2. Select a Tracker Case. This is only for the purpose of setting the tracking duration. The values for eligibility or renewal are based on the values set in the tier strategy, not the milestones.
3. Include the Tracker and set it up inside workflows so the values are evaluated and tier upgrades work smoothly.

> 📘 **Important**
>
> To allow customers to skip tiers based on tracker values, you must explicitly configure the Transaction Point Allocation action after tracker evaluation in your workflow. If you do not configure this action, customers will be upgraded sequentially and cannot skip tiers, regardless of their tracker values.
>
> Tracker values are always scoped by the relevant Concept. Tracker calculations and results apply only within the selected Concept.

> 📘 **Note**
>
> It is recommended that "Tier Change Window" type trackers are used for renewal in most cases.
> Dynamic Slab Upgrade is only supported when the tracker is value-based, such as transaction amount or line-item amount. If you use points or AC trackers, the system does not split the source value for dynamic calculation. All points are awarded at the current slab, not dynamically across tiers.

## Milestone based Loyalty using Trackers

You can setup the Loyalty Program to be able to celebrate milestones as part of the customer’s journey in the Loyalty Program or during certain seasonal time periods. For example, you can award a coupon to a customer if they make 5 visits within the first year of membership or 500 bonus points to a customer on shopping for $1000 once they reach the Gold Tier.

To setup, you can create the milestones  by setting up all 4 steps inside the Tracker as explained above. You can then set the appropriate actions inside the different Tracker Case rulesets.

> 📘 **Note**
>
> One Tracker can have multiple milestones

## Points Allocation inside Trackers

When you allocate points inside trackers, using the percentage allocation method, whatever is the tracked entity becomes the source value.