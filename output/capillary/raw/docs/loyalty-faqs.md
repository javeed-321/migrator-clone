---
updatedAt: 2026-04-09T08:23:14.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

## Loyalty Programs (Single & Multi-Loyalty)

If I have two loyalty programs running simultaneously, how I do know which one is active for stores and which one is being used for point allocation?\
Every org will have a default program (org level). When you have multi-loyalty programs configured for the org, points are issued from the program mapped to the TILL.

However, this depends on the configuration. For example, if a customer is enrolled in all the programs then the logic will run for all the programs but if the customer is only in one program then he will be evaluated for the rules written in that program and the points will be given for that program only. When it comes to an MLP kind of structure than one customer could be part of multiple programs or just one program and each program can have a different allocation strategy so all this is evaluated when the ‘add transaction’ call comes to us and whatever they are mapped to allocation happens as per that.\
In the case of MLP, there are 2 programs that are always evaluated one is the default program for that ORG, and the other is where they are enrolled.

Can I use a single loyalty program for multiple stores?\
Yes, you can achieve this by applying scope to your rule in workflows.

Is there a concept of equivalent tiers in loyalty programs? How is a single card which is used for different events mapped to the program? Is there a need/ solution for it in the loyalty program?

## Tiers

What is the difference between tier expiry and tier downgrade?\
Tier expiry is when you have set a date for expiry and the user is automatically downgraded when the expiration date comes up. But when you are downgraded, you can basically set certain configurations, and depending on those configurations, the user will be downgraded.

What happens to the status of my customer if he/she does not fulfill any of the tier eligibility criteria?\
By default, the customer will be in the base tier of the program.

Does each of the renewal conditions have to be met or any one of them is enough?\
As of now, it's an 'or' condition, so either of those conditions will result in a renewal.

Will changing eligibility force the tiers to compute the settings for all users in advanced settings?\
Yes, it depends on the tier evaluation cycle.

Can I set an action in the workflows to send a communication to the customer after I retain the customer tier based on conditions such as at least 10 visits or 1000 points, even if the customer has not met the tier criteria?\
Yes, that action can be set in the workflows.

Is it possible to upgrade tiers by using any other means apart from the usual upgrade conditions like a coupon or passing the points rule?\
As of now, you can do this manually through member care.

When I configure 26K points to upgrade a tier (say Gold), will it consider 26,000 points or 26,001 to qualify?\
When configuring a tier, you will only see upgrade rules greater than or equal to (>=). Hence, a customer with 26000 points or more will be in the Gold tier.

## Points

Can I limit the number of times my customer can earn points?\
You can limit the number of points a customer can earn in the points earning condition. However, there is no option to limit the number of times the points are issued for a customer.

What is the use of proportion and max point allocation?\
Use Proportion lets you issue points based on the line item amount. The Maximum points allocation is to set a threshold value for the number of points a customer can earn.

How is the Transaction Points Allocation action different from Allocate Points?\
**Transactional Points** - Points you earn as per the configured ruleset for making a transaction.

**Allocate Points** - Points you can assign on the transaction amount and custom field values based on the configured ruleset.

## Trackers

What tracking method should I apply to the use case in the tracker?

"Reward a customer on their 10th visit"\
You could either use Cyclic Windows or Calendar-based Cyclic Window. However, it is recommended to use Cyclic Window in this case.

In a moving window tracking method, if the duration is 365 days and the tracking entity is a customer transaction, will it include the data of the current day also?\
It will include the current date's data. For example, assume you are tracking customer transactions with a moving window tracking method with a duration of 365 days. If a customer does a transaction on Nov 24, 2021, then the tracking window will be from Nov 23, 2020, to Nov 24, 2021 (including the dates mentioned).

Can I use tracker for actions other than Tier Upgrade?\
You can use trackers for Tier eligibility, tier renewals, customer milestones, incentivization, and other custom activities.

If a tier is upgraded using tracker value, does dynamic point earning work?\
Yes, dynamic points earning will work for tier upgrades based on tracker value.

What type of incentives are supported for tracker conditions?\
You can award points and offers to customers on tracker aggregate.

Can you share an example of a tracker which is used to issue coupons based on line-item purchases?\
In cases where the brand doesn't want to credit the B2B customer every item they purchase (say cigarette/alcohol).
For example, In the case of Metro, if you don't want to incentivize customers on the purchase of cigarettes/alcohol. You can exclude such line item prices from the tracker.

Will the Transaction Return be considered as a visit in a tracker?\
No, Transaction Return will not be considered as a visit in any case.

Is the Scope applied to the ruleset level or the entire workflow level?\
The scope you apply in Workflow will apply to that particular page (activity).

## Return transactions

What happens when no reference to original bill is passed or the reference bill no. passed in not found?

The return bill is submitted without storing any reference to the original bill.

How returns would be handled if there are two bill numbers with same purchase date?

Error is raised if multiple references are found. But, this is questionable, because the same return bill can be submitted if no reference to original bill is passed.

What if the line items passed in the return bill do not match with the original bill?\
It depends on the type of return - line item, full or amount.
Depends on normal or mixed return.

If `type` is line item, the line item will be matched with the line items in the original bill for amount, quantity, code, etc. If any of them do not match, error would be raised.\
If normal return and type is amount, the amount at transaction level will be compared with the amount of original bill. It will also be checked whether any earlier return happened, and if there is any balance left for return.
If mixed return and type is amount, the amount mentioned in the line item will be compared with the amount in the original bill.

If type is full, all the line items would be returned.

What if there are multiple line items with type amount for a mixed transaction?

For a mixed return transaction,

1. First line item with return type amount would be considered a return transaction and would be compared with amount of original bill.

2. Second line item with type amount would be considered another return transaction. The amount would be compared with the balance amount (original amount - first return amount).

Is it possible to return NI transaction without original bill reference?

Yes, it is possible. In this case, line level data will not be saved since no validation is possible. Only the amount will be returned.

## Points only for the net amount (not on delivery fees, taxes, etc..)

Is there a functionality to set across the board for all transactions not to include delivery fee and tax value to be included as points?

**Answer**:

<Image align="center" width="70%" src="https://files.readme.io/ae92088-small-Screenshot_2023-04-27_at_6.23.29_PM.png" />