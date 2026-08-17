---
updatedAt: 2026-07-31T11:34:54.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Event details

The **Events** tab on the Customer Single View page shows the transactional summary of the customer.

<Image align="center" border={true} src="https://files.readme.io/10e30c5-Events_overview.png" className="border" />

# Transactions

The **Transactions** tab provides a summary of the transactions made by the selected customer in base currency.

You can view transaction details such as transaction number, transacted time, transaction ID, loyalty program associated with points or coupons issued, store name, transaction amount, gross amount, applied discount, details of points, line items, and payment information.

<Image align="center" border={true} src="https://files.readme.io/ca82183-transactions.png" className="border" />

**Important:**

* By default, the system displays only the 200 most recent transactions for a customer. To view older transactions, apply a date filter for the desired period.
* The system loads a maximum of 50 transactions per search within the selected date range. You cannot view more than 50 transactions at a time.
* Transactions are sorted by date, with the most recent first.
* You can filter the loaded transactions using available filters. Filtering applies only to the transactions already loaded. It does not search beyond the initial 50 transactions.
* Searching by transaction number is not supported.
* You must select a date range to view transactions. You cannot select arbitrary years or months outside the allowed range.

**Note:** The separator used in transaction values is determined by the base currency. For example, if the base currency is set to DE (Germany), the period ('.') will be used as the separator. For example, 80,000 will be displayed as 80.000.

**Note:** Evaluation logs for a transaction are retained for 90 days from the transaction's bill date, not the date the transaction was actually processed. If you submit a backdated transaction whose bill date is already more than 90 days old (for example, while importing historical data), its evaluation log is deleted almost immediately after being written, since it's already past the retention window.

<Image align="center" border={true} src="https://files.readme.io/29834eb-Separator.png" className="border" />

<br />

## Viewing retro transaction

To view the retro transaction,

* Verify if the transaction is processed according to the transaction date.
* Confirm if the transaction is converted into a regular transaction based on retro functionality.

1. On the Member Care customer single view page, Click **Events**.

<Image align="center" border={true} width="600px" src="https://files.readme.io/242717e-image.png" className="border" />

2. Click on the transaction to check if the transaction has been converted from not-interested to regular.

<Image align="center" border={true} width="70% " src="https://files.readme.io/5cf6505-Screenshot_2023-04-18_at_5.40.50_PM.png" className="border" />

### Advanced points view

Advanced points breakup provides information about:

* Lineitem earn breakup
* Transactional level earn breakup

This view allows you to understand the points allocation at line-item & bill level.

To check how the retro transaction is handled, click on a retro transaction, and click **Advanced points view**.

<Image align="center" border={true} width="600px" src="https://files.readme.io/f2c1133-Screenshot_2023-04-18_at_5.29.43_PM.png" className="border" />

<Image align="center" border={true} width="600px" src="https://files.readme.io/a2a5900-image.png" className="border" />

> 📘 Note
>
> Raise a ticket to the Capillary's tech team and the UI team, to enable advanced points view.

For more information on retro transaction requests, refer to the [retro transaction requests](https://docs.capillarytech.com/docs/retro_transaction) documentation.

# Behavioral events

Behavioral events are non-transactional events that include customers' activities across different channels. You can see the history of Behavioral Events data of the customer.

<Image align="center" border={true} src="https://files.readme.io/7fdc3e5-Behavioral_events.png" className="border" />

Click on the search icon to search for the behavioral event using the account ID, and event name.

<Image align="center" border={true} src="https://files.readme.io/9887f77-Search_beh_events.gif" className="border" />

# Milestones

The **Milestones** tab displays all the <Glossary>target</Glossary>-related information about the customer. Milestones is a method that brands can use to monitor the Key Performance Indicators (KPIs) of their customers and acknowledge them for their loyalty. For more information on Milestones, refer [Milestone loyalty documentation](https://docs.capillarytech.com/docs/target-loyalty).\
The card displays all the <Glossary>target group</Glossary>  the customer is a part of. A customer can be a part of multiple targets.

<Image align="center" border={true} src="https://files.readme.io/11170cb-milestones.png" className="border" />

Each card represents a target. You can find the following information on the card:

* Name of the target,
* Duration of the target
* The number of <Glossary>cycle</Glossary> present in the target.

<Image align="center" border={true} width="50% " src="https://files.readme.io/1900b25-Screenshot_2023-05-26_at_5.37.23_PM.png" className="border" />

Click on a target group, to view information about the target and the timeline, including the target name, tracker type, evaluation type, and KPI of the target.

<Image align="center" border={true} src="https://files.readme.io/4fc7aeb-information.png" className="border" />

The timeline depicts the customer's progression within the target, including details such as the milestone start date, cycle duration, target status, and milestone end date.

<Image align="center" border={true} src="https://files.readme.io/943ca37-time.png" className="border" />

Sub-milestones are intermediate rewards that are given to customers. A milestone can have <Glossary>sub-milestones</Glossary> inside each cycle.\
For example, if the target reward is 10,000 points, the brands can break up the reward into smaller target rewards like 2000 points, 2000 points, 2000 points, and 4000 points.

<Image align="center" border={true} src="https://files.readme.io/93d56d6-subtarget.gif" className="border" />

You can click the dropdown and view the access details about the sub-milestones. To determine the completion status, you can check the border of the target icon. When the cycle is completed, the target icon changes from a grey color to green.

<Image align="center" border={true} src="https://files.readme.io/3d8c122-status.gif" className="border" />

> 📘 Note
>
> Inactive milestones are not displayed in Member Care. However, milestones that have ended remain visible in Member Care along with their respective status.
>
> <Image align="center" border={true} width="45% " src="https://files.readme.io/83c91a2750da0593a5a9f7ffe95c12d8e13bb6824378fd1cf0d3cb2aced993db-image_8.png" className="border" />

# Rewards catalog

A rewards catalog is a curated collection of items or experiences that are available for redemption by members of a loyalty program. The **Rewards catalog** displays the reward programs associated with the organisation. You can click on any reward program to view the details of the rewards such as reward type, reward ID, coupon series etc.

<Image align="center" border={true} src="https://files.readme.io/b2bffbb-rewards_cata.png" className="border" />

# Audit logs

> 🚧 Note
>
> By deafault, audit logging feature is not enabled for all organisations. To enable, create a JIRA ticket with the org ID to the sustenance team.

The Audit logs display a detailed trail of records and track activities related to member interactions and system changes.

By default, the changes to the following fields are audited:

* StandardField, - first name and last name
* Communication channels
* Merge events
* Subscription status
* Customer status
* Customer merge
* Identifier change

You can also enable **Audit Trial** for the [custom field](https://docs.capillarytech.com/docs/data-fields#create-new-custom-fields) and [extended fields](https://docs.capillarytech.com/docs/data-fields#edit-extended-fields--add-enum-values-using-intouch) in the organisation settings, and can track changes to the below fields:

* Customer extended and custom fields
* Card extended and custom fields

> 📘 Note
>
> A maxium of 5 custom field and extended field can be audited.

To search for a log, you can click the search icon and search using Log ID.

<Image align="center" border={true} width="70% " src="https://files.readme.io/f42ca3a-Audit_log.png" className="border" />

You can filter the audit logs with the type of change.

<Image align="center" border={true} width="70% " src="https://files.readme.io/7b0592b-Filter_result.png" className="border" />