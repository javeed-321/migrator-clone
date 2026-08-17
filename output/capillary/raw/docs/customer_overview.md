---
updatedAt: 2026-07-03T12:58:41.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customer overview

In Member Care, you can view profile information, customer status, subscription details, interactions, transactions, and other loyalty details of a customer. This section provides information on how to access customer details and update specific information from Member Care.

To view the overview of customer details:

1. Log on to InTouch and navigate to **Member Care**.
2. From the drop-down in **Search**, select **Customers.**
3. In the search box, enter the complete customer identifier such as registered mobile number, email ID, external ID, card number, card external ID, or name, and from the search result list select the customer profile.

<Image align="center" border={true} src="https://files.readme.io/94cfca6-Customer_seach.png" className="border" />

By default, the application displays the **Overview** tab. The **Overview** tab displays the basic details of the customer. This page is also called Customer Single View (CSV).

To know more details about the customer click the **Loyalty**, **Events**, **Incentives**, and **Communications** tabs.

<Callout icon="📘" theme="info">
  **Note**

  If a user does not have permission set, <Anchor label="PSI values" target="_blank" href="https://docs.capillarytech.com/docs/marking-custom-fields-extended-fields-as-psi-and-pii">PSI values</Anchor> are masked and displayed as `XXXXX`. For more information, refer to the <Anchor label="data masking" target="_blank" href="https://docs.capillarytech.com/docs/data-masking">data masking</Anchor> documentation.
</Callout>

# Overview

<Image align="center" border={true} src="https://files.readme.io/c87a2af-Customer_overview.gif" className="border" />

The overview tab contains below details:

| No. | Title                                                                                                      |
| :-- | :--------------------------------------------------------------------------------------------------------- |
| 1   | [Source profile](https://docs.capillarytech.com/docs/customer-overview#source-profiles)                    |
| 2   | [Customer status and name](https://docs.capillarytech.com/docs/customer-overview#customer-status-and-name) |
| 3   | [Customer identifiers](https://docs.capillarytech.com/docs/customer-overview#customer-identifiers)         |
| 4   | [Communication channels](https://docs.capillarytech.com/docs/customer-overview#communication-channels)     |
| 5   | [Customer attributes](https://docs.capillarytech.com/docs/customer-overview#customer-attributes)           |
| 6   | [Customer stats](https://docs.capillarytech.com/docs/customer-overview#customer-stats)                     |
| 7   | [Store details](https://docs.capillarytech.com/docs/customer-overview#store-details)                       |
| 8   | [Active Coupons](https://docs.capillarytech.com/docs/customer-overview#active-coupons)                     |
| 9   | [Recent transactions](https://docs.capillarytech.com/docs/customer-overview#recent-transactions)           |
| 10  | [Customer segments](https://docs.capillarytech.com/docs/customer-overview#customer-segments)               |

## Source profiles

This page shows the customer registration sources in multiple tabs. Capillary supports different sources such as InStore, Facebook, Webengage, WeChat (China-specific), mobile app websites, Line, TMALL, E-commerce sites, WhatsApp, and more.\
By default, InStore is set as the default source. There are also sources such as Mobile Push, Facebook, and WeChat that can have multiple accounts within the org. You can see the customer details from each account of the source.

<Image align="center" border={true} src="https://files.readme.io/a8a2028-Customer_source.png" className="border" />

For example, in the above image, you can see numbers on top of the profile icons. The number 3 on the Whatsapp icon means that the customer has profiles from three WhatsApp accounts of the org. You can click on the Whatsapp icon and choose between one of the three profiles that you want to see.

## Customer status and name

This section shows the current status (custom status label or fraud status) of the customer, the name, and the date when the customer registered. The customer status setting is not by default enabled for an org, its enabled only on a request from the Success team.

<Image align="center" border={true} src="https://files.readme.io/ecda604-Customer_status.png" className="border" />

All orgs might not have Customer Status enabled. Hence, you would see Fraud Status (default enabled) for orgs that have not enabled Customer Status. The *Fraud Status* is the legacy version of *Customer Status*.

Fraud status contains predefined values (MARKED, CONFIRMED, NOT\_FRAUD, RECONFIRMED, INTERNAL), unlike Customer label which contains user-defined values (called custom labels).

This remains blank when Both Customer Status and Fraud Status are not set for the customer.

You can also see the Status card available in the overview tab.

<Image align="center" border={true} width="smart" src="https://files.readme.io/bb7ddd7-Status.png" className="border" />

Here you can see the following statuses of the customer:

* **Loyalty status**: Displays the loyalty status. For example, Loyal.
* **Test & control status**: You can also change the current group of customers from test to control or vice versa. Click on the more options icon > Change test and control status > In **Change to**, set the new status.
* **Customer status code**:  Defines the current customer status in the Capillary system.
* **Customer status label**: Defines the customer status.   To change the customer status label, click on the more options icon > **Change customer status label** >  **Change to**, choose the new status >  **Reason** , type the reason or notes for updating the status label > Click **Save**.

> 👍 Note
>
> From June 2024, the customer status feature will be enabled by default for new organizations.

## Group details

> ❗️ This is applicable only to customers who are part of a hierarchy. See [Member hierarchy](https://docs.capillarytech.com/docs/hierarchy) for more details.

The section shows below details:

* The number of groups the customer belongs to
* Customer's contribution towards the group
* Group lifetime spend
* Company name and role of the member in the group

You can click the download icon and download the total list of groups the customer belongs to.

<Image align="center" alt="Company group" border={true} caption="Company group" src="https://files.readme.io/971f2ba-small-Company_info_and_role.png" />

## Customer identifiers

This section shows the registered identifiers of the customer. The first identifier is the primary identifier of the org and the remaining are the supported secondary identifiers. Member Care supports mobile numbers, email ID, external ID, card number, card external ID, WeChat union ID, and more. However, you will see only org-supported identifiers

<Image align="center" border={true} src="https://files.readme.io/d508da7-Customer_identifier.png" className="border" />

By default, it shows up to three identifiers. To view more identifiers, click **Show more**.

## Member hierarchy

> ❗️ This is applicable only for customers who are part of a company group.

For members who are part of a company/non-family & friends group, you can click the hierarchy icon and view the member hierarchy. For more information on hierarchy, see [Member hierarchy](https://docs.capillarytech.com/docs/hierarchy).

<Image align="center" border={true} src="https://files.readme.io/9cc024c-small-Hierarchy.png" className="border" />

The member hierarchy page displays the member hierarchy with their primary identifier. You can search for a member and also click on the **Download** option to download the member list.

<Image align="center" border={true} src="https://files.readme.io/fc369d5-small-Member_hierarchy_page.png" className="border" />

## Communication channels

This shows the communication channels associated with each source profile. Click on the drop-down to expand. Each source can have multiple communication channels. A customer can have different identifiers for a channel across sources.

The section **Reachable on** shows the communication channels that are available for the customer. For example, if a customer has logged in to the org's app, we capture the Android or iOS device ID. A mobile push icon will be shown. Similarly, if a user has shared his/her email address, we will show the e-mail icon.

<Image align="center" border={true} src="https://files.readme.io/482e5d6-Communication_details.png" className="border" />

<Callout icon="📘" theme="info">
  The Communication channels section shows blank when no information is available. This happens especially when customer has registered using card number or external  ID without providing any communication details.
</Callout>

## Active coupons

This section shows the list of active coupons available for the customer. Only coupon redemptions with the 'active' flag set to true are displayed. Reversed redemptions are not shown. Use the horizontal scroll options to toggle between different coupons. You will see the code and the applicable discount for each coupon.

> Note
>
> The 'active' field is not present in the read\_api.coupons table. This may cause differences in coupon redemption visibility and reconciliation between Databricks and Member Care.

<Image align="center" border={true} src="https://files.readme.io/da89e81-Active_Coupons.png" className="border" />

## Recent transactions

This section shows up to the latest 5 transactions of the customer, sorted by billing date in descending order. You will see the transaction date, transaction number, points issued, points redeemed, and the type of transaction—Regular, Return, or Mixed. Use the horizontal scroll options to toggle between different transactions available.

<Image align="center" border={true} src="https://files.readme.io/5f31237-Recent_Transactions.png" className="border" />

To view complete details of each transaction or access recent transactions, click **View all**.

> Note
>
> Member Care displays only the 200 most recent transactions for a customer by default. To view transactions older than the most recent 200, apply a date filter. This limit may cause differences between the full transaction dataset and what is visible in Member Care unless you use filters.

## Customer attributes

This shows the custom field and extended field details captured for the customer. The names shown in the screenshot may differ for each org depending on what was created or enabled for your org.

Custom fields are denoted with a blue dot.

<Image align="center" border={true} width="smart" src="https://files.readme.io/1229c5c-customfields.png" className="border" />

## Store details

This shows the store-related information of the customer such as registered TILL, recently transacted store, date and time of the recent transaction, and preferred store (store code).

You can also change the preferred store of the customer. To change click the more options icon > **Change preferred store**. You will see the current store and an option to change the store.
**Note:** The **Last Transacted On** field uses the billing date of the most recent transaction from the latest 5 transactions.

In **Change to**, choose the new preferred store and click **Save**.

<Image align="center" border={true} src="https://files.readme.io/621c8d1-Store_details.png" className="border" />

## Behavioural stats

This shows the key metrics of the customer transactions such as:

* Lifetime purchase
* Average transaction value
* Total transactions
* Average basket size
* Frequency of visit
* Earn-burn ratio
* Coupon redemption rate
* Referrals made

<Image align="center" border={true} src="https://files.readme.io/3424601-Behavioural_stats.png" className="border" />

## Segments

Customer Segmentation is a logical grouping of audiences based on shared characteristics. Segments are used to tailor the marketing efforts of brands effectively. Segmentation is usually done based on demographics or customer behavior. Member Care shows the list of segments that the customer is in. These segments were created on Insights+. You can see the segment value of the customer in each segment.

To view segment details, click **View all**. You can search for a specific segment using the Search box.

<Image align="center" border={true} src="https://files.readme.io/332129c-Customer_segments.png" className="border" />

## Groups

> ❗️ This is only applicable if customer is part of any group.

Displays the details of groups the customer belongs to. You can also click the download icon and download the group details.

<Image align="center" border={true} src="https://files.readme.io/9f022eb-small-Groups.png" className="border" />

## Subscription status

This section allows you to view and set the subscription status of a customer.

To view the subscription status, click on the desired source profile > select the org from the drop-down > select the channel.

<Image align="center" border={true} src="https://files.readme.io/2301a8d-View_Subscription_status.png" className="border" />

To set the subscription status,

1. Select the source > org and click on the three dots.
2. Select the channel.
3. To enable or disable the promotional subscription status, click the **Promotional status** toggle switch.
4. To enable or disable the transactional subscription status, click the **Transactional status** toggle switch.
5. Click **Save**.

<Image align="center" border={true} src="https://files.readme.io/05ebee6-Set_subscription.jpg" className="border" />

## Cards

You can view the details of each active card of the customer. To toggle between different cards,  either use the horizontal scroll options or the drop-down box.\
To view the loyalty details of a specific card, click on the card or select the card from the drop-down.

<Image align="center" border={true} src="https://files.readme.io/4833403-Card_options.png" className="border" />

### Link card

To link a card,

1. On the **Cards** section, click the three dots menu.
2. In the **Card number** field, enter the card number that you want to link.
3. Click **Check availability** to check the availability of the card.
4. From the **Card label** drop-down, select **ACTIVE**. Only ACTIVE labels can be assigned to the cards issued from here.
5. Click **Save**.

<Image align="center" border={true} width="33% " src="https://files.readme.io/68f8be3-Link_card.png" className="border" />

To configure card issual settings and OTP validation, refer [Card issual settings](https://docs.capillarytech.com/docs/issue-update-cards#card-issual-settings).

## Issue card

To issue a card,

1. From the **Select card series** drop-down, select the card series.
2. From the **Card label** drop-down, select **ACTIVE**. Only ACTIVE labels can be assigned to the cards issued from here.
3. If OTP validation is enabled for the org, enter the OTP received.
4. Click **Issue**.

<Image align="center" border={true} width="250px" src="https://files.readme.io/2b9cc15-image.png" className="border" />

## Change card status & label

To change the status and label of a card,

1. On the **Cards** section, click the three dots menu.
2. From the **Card number** drop-down, select the card number for which you want to change the status and label.
3. From the **New card status & label**, select the card status and label.
4. Click **Save**.

<Image align="center" border={true} width="35% " src="https://files.readme.io/5d1c91e-image.png" className="border" />

> 📘 Note
>
> You cannot configure any restrictions/blocking actions for customers based on the card status.