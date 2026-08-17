---
updatedAt: 2026-05-12T06:29:16.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

1. Can I add a tier in between two existing tiers?\
   You cannot add a tier between two existing tiers. A new tier is always an upgrade to the last tier. If it is highly\
   required to add a tier in between two tiers, contact your Capillary PoC. The Capillary Admin needs to perform\
   the following steps.

* Edit all the tiers from where you need to modify
* Change rule expressions and conditions
* Do a data clean up
* Reconfigure the loyalty program

2. Can I change the points allocation type of an existing tier?\
   When you create a tier, it shows the default points allocation type - prorated (% of the transaction amount). To\
   change the points allocation type, create a new points allocation strategy. Then, on the **EventsView** page,\
   modify the action for the **TransactionAdd** event by replacing the existing Transaction Points Allocation\
   strategy with the new strategy. Save the changes and Reconfigure the loyalty program to reflect the changes in the live program.

3. How are tiers structured in an MLP?\
   Tiers are independent across programs in an MLP. Each program can have different numbers of tiers.

4. Can different tiers have different eligibility criteria?\
   The eligibility criteria that you set for tier upgrade remains the same for all the subsequent tiers that you create.

5. What happens to the status of my customer if he/she does not fulfill any of the tier eligibility criteria?\
   By default, the customer will be in the base tier of the program.

6. Does each of the renewal conditions have to be met or any one of them is enough?\
   This depends on how the renewal condition is configured:
   * **All** — the customer must satisfy every configured condition.
   * **Any** — the customer must satisfy the number of conditions specified. For example, with **Any 1**, satisfying a single condition is sufficient. With **Any 2**, the customer must meet at least two conditions. A customer who meets only one condition when **Any 2** is required will still be downgraded, even if that individual condition is satisfied.\
     Refer to [Creating dynamic renewal criteria](https://docs.capillarytech.com/docs/tier-downgrade-renewal#creating-dynamic-renewal-criteria) for more information.

7. Will changing eligibility force the tiers to compute the settings for all users in advanced settings?\
   Yes, it depends on the tier evaluation cycle.

8. Can I set an action in the workflows to send a communication to the customer after I retain the customer tier based\
   on conditions such as at least 10 visits or 1000 points, even if the customer has not met the tier criteria?\
   Yes, that action can be set in the workflows.

9. Is it possible to upgrade tiers by using any other means apart from the usual upgrade conditions like a coupon or\
   passing the points rule?\
   As of now, you can do this manually through member care.

10. When I configure 26K points to upgrade a tier (say Gold), will it consider 26,000 points or 26,001 to qualify?\
    When configuring a tier, you will only see upgrade rules greater than or equal to (>=). Hence, a customer with\
    26000 points or more will be in the Gold tier.

11. Can tracker values for issuance be negatively adjusted for a return if the original transaction information is not available?\
    In cases where a return occurs without reference to the original transaction, there are a few options to manage adjustments:
    * Import Profiles for Downgrading Customers: To downgrade the customer's status, you can use import profiles. Currently, there are no available APIs for this process.
    * Manual Point Adjustments: For deducting points, you can use the manual adjustment API to perform point adjustments.\
      There is no out-of-the-box (OOB) capability to cap agent-level points. However, a custom solution can be implemented using behavioural events and loyalty promotions. Create a JIRA ticket and assign it to the Product team for guidance on this.

12. Does Tier Downgrade work in real-time?
    * The tier downgrade does not work in real-time. Instead, it operates on a 24-hour sync cycle. While tier upgrades happen in real-time, downgrades are processed within a 24-hour sync period.

13. Why was a customer downgraded even though they appear to have met a renewal condition?\
    When the **Any N** condition is configured (for example, **Any 2**), the customer must meet at least N conditions to qualify for renewal. If the customer satisfies fewer conditions than the configured minimum, the system downgrades them — even if one or more individual conditions are met.\
    For example, if the renewal criteria are purchase ≥ $400 and at least 5 store visits, and the condition is set to **Any 2**, a customer who spends $433 but makes only 3 visits will be downgraded because only 1 of the 2 required conditions was met.\
    To confirm the renewal configuration for a tier, check the **Renewal conditions** section in the tier settings. Refer to [Creating dynamic renewal criteria](https://docs.capillarytech.com/docs/tier-downgrade-renewal#creating-dynamic-renewal-criteria).