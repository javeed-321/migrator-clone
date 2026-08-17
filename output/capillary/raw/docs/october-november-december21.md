---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# October-November-December 2021

# Loyalty+

## Say Hi to your Personal Loyalty Assistant

You have probably noticed some suggestions on the Loyalty+ landing page. Those are Loyalty Nudges to help your business be more successful in building loyalty with your customers. Nudges are suggestions that help you take the right actions for your loyalty program, deep dive into data to understand your customers, run new campaigns or journeys, etc.

These nudges include:

* Sharing ideas from the industry best practices on how to engage better with your loyalty customers.
* Identifying long-standing trends and sudden anomalies in your program KPIs.
* Ensuring that all basic program components are set up well and running smoothly.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/eb5d480-Nius2o9vNpWmi-7lgQf0AzLSyNMs4kOlqw.gif" />

Here are a few examples to show Nudges at work:

* **Boost Loyalty through points redemption**
  * Anomaly: Let’s say, our Nudge framework discovered that your Loyalty program's Points Expiry Reminder isn't activated. The industrial figures suggest that 63% of customers prefer to shop at brands in which they have active Loyalty points.
  * Analysis: In the next six months, 76 million points are expiring across the brand for 674K customers.
  * Suggestion: You have a chance to retain 63% of 674K customers who are likely to churn due to points expiring. Set it up now!
* Manage Covid impact through Loyalty
  * Anomaly: Again, our Nudge framework detected a decrease in Points redemption and an increase in points expiring due to the Covid-19 lockdowns.
  * Analysis: In the last year, points expired for 75% of your customers.
  * Suggestion: Get your top customers back to the stores. Increase footfall by up to 75% by extending points expiry for 1 month. Configure it now!

## Target Loyalty - Incentivize customers instantly on Target Completion

### Problem statement

Currently, the target completed event is triggered to loyalty only when the target period is completed. So customers get incentivized only after the completion of the target period even if they had achieved the target before that.

It has also been a long-standing ask from brands and success hub teams to be able to run ‘Tracker-based Promotions’ - Targets now provide a superior method to set those up.

### Use cases

As a brand, I want to reward my customers if they achieve the target/milestone before the period ends & motivate them further. Also, optionally, reward them at the end of the period based on the overachieved value.

Feature description

* The “Target period elapses” customer activity will now be triggered twice, once when the target is achieved and again when the Target period is completed
* In the event, while creating a promotion you can now add a condition ‘currentEvent.isTargetAchievedEvent’ to check if this activity is being triggered for the milestone
* You can the setup points allocation actions or other incentives when the above expression is true

<Image align="center" className="border" width="80%" border={true} src="https://files.readme.io/a647563-RS2z6buV_6y02RYdVF9TN5ceHeGRVjriHA.png" />

## Activate Promotions before customers can start using them

### Problem statement

Brands don't have the option to set a promotion with a capability whether it would require activation or not. Basically, brands want to give the option to their customers to subscribe to an offer or not. Currently, in the Promotion Engine, the promotion created automatically applies to all the customers.

### Use cases

As a brand, I want to create all promotions using meta configuration (activationRequired).\
As a brand, I want my customers to specifically collect/subscribe to an offer.

### Description

When you create a promotion (Loyalty promotion, Loyalty earning a promotion, or Rewards promotion.), you can now enable Issue promotion in the deactivated state to allow your customers to manually collect the promotion.

<Image align="center" className="border" width="80%" border={true} src="https://files.readme.io/d68f310-oOXXkYTnPimKZy9ay6PK47MJjOLgHed1Vg.png" />

When creating promotion using API, you can set activationRequired=true.

Customers can activate or collect the offer manually. The following image is an example of allowing customers to collect an  offer.

<Image align="center" className="border" width="80%" border={true} src="https://files.readme.io/4fb11f5-mV_OUlFtMy9j9eXNArlP-OxWMQ8eoUIqvg.png" />

## Marvel to support game edit and immediate start

### Problem statement

Currently, in Marvel, we don't have the option to extend the game or edit the game once it's created. After the games expire, every time new sets of games have to be created and this becomes difficult to manage. Currently, Marvel only allows editing the games before they start.

### Use cases

As a brand, I want to make required changes to the game after the game is started and before it ends.

As a brand, I want to edit the already created games or extend their date, so that I don't have to recreate the game after their lapsation dates.

### Feature description

Brands can now change the game description, start date, end date, image, user play limit, terms & conditions, max availability, and winning probability for a game.

There are a few restrictions :

* Once the game ends, we cannot edit any of the game details.
* Once the game is started, but not ended. All the changes are feasible except the start date and RedemptionID.
* Once the game starts, Cannot reduce Userplaylimit (Game level) and Maximum availability(Game Item level)

## Fraud controls for Points on Referral

### Problem statement

* The referral points awarded from a ‘Transaction Add’ event do not get returned when that transaction is returned - Customers could exploit this in an e-commerce environment or other industries (e.g. LPG) where orders are fulfilled later and can be canceled or returned in the meantime
* Customers could also redeem the points before canceling the order. We already support promised points which solves this problem, but we were unable to issue promised points against referral

### Feature Description:

* We now support delayed accrual in referral points - this can be set up in the Earn condition
* If the transactions that caused the referrer or referee to earn points is returned, we now return/clawback those points as well - this works in the same way as regular points return

## Evaluate rules on basket items

### Problem statement

Brands want to provide points and benefits on the basis of certain parameters of the line item - typically if the amount is non-zero or if the discount is zero, etc. They also run promotions based on the count of these "qualifying" items.

The supported rule library in Loyalty+ currently does not allow the brand to glean such a count - hence they are resorting to using Extended fields to compute this count outside the system and pass it to us - this presents an abuse of Extended fields and causes unnecessary load at the CDP layer.

### Use cases

As a brand, I want to provide points and benefits on the basis of certain parameters of the line items like amount, discount, quantity, rate, and value.

### Feature description

We have provided a set of attributes in currentTxn profile.

* basketSumIf would return the sum of line item amounts where the conditions hold true
* basketCountIf would return the count of line items where the conditions hold true
* basketQtyIf would return the sum of quantities of line items where the conditions hold true

To make the rule-writing simpler and easier to understand here, We have decided to Split the expression (2nd parameter of the rule) part into 2 segments - Operator to be used & value to be compared with.

<Image align="center" className="border" border={true} src="https://files.readme.io/ab69beb-X_Hv9DCO8xFe6tP3qGnsWZ2CfPSUJVyY9A.png" />

## Ability to write rules based on Gross amount based sums

### Problem statement

Brands want a trigger condition to capture gross value on the basketsum and basketSumRegexBrand. Currently, the net value is captured. There are many campaigns that run on gross values, especially during EOSS.

### Feature description

We have added new facts

* basketSumGross
* basketSumRegexGross
* basketSumRegexBrandGross
* basketSumRegexCategoryGross

These will evaluate the sum of gross value(value of an item without discount) of a basket item based on the attribute name and attribute value provided in the rule condition.

<Image align="center" className="border" width="80%" border={true} src="https://files.readme.io/ab04c6c-1xgJyHLLlyIWQBqkqk6yI93RVXNFu_O_gw.png" />

<br />

# Engage+

## DLT compliant SMS Campaigns

**Overview**\
TRAI has formulated certain guidelines to enhance control, prevent any fraudulent practice and provide greater safety to the end customer. As per the guidelines, the companies who want to communicate with their customers will now have to register themselves with Telecom Operators for sending SMS. The system will be governed using Blockchain technology also known as Distributed Ledger Technology (DLT).

Though TRAI has provided different platforms (Vodafone, Airtel, Jio, BSNL, etc.) to organizations for registering SMS content templates, the process of sharing the content templates with Gateway operators is still very manual and error-prone. Any mistake such as wrong header, wrong template-id, header and template mismatch, length of variable portion, etc. in the campaign configuration can cause the campaign to fail.

### Problem Statement

A lot of effort and money will be wasted if unregistered or wrong message templates are sent to operators.

Since the slightest mismatch between content templates can cause message failure, Capillary also wanted to ensure minimum manual edits in the approved content templates.

### High-level Solution

**Support for DLT approved SMS templates**-

* Users can now upload the DLT approved content templates file and load the approved content templates in Engage+.
* The upload option is available in the Engage+ Creatives section through which users can upload the content templates file downloaded from DLT platforms. For details on how to upload a template, see here.
* It also pre-checks certain errors such as Header value, template approval status, and template ID to ensure wrong templates are not loaded.

### Benefit:

* The file upload option eliminates the need for manual re-writing of approved templates which is error-prone

## SMS campaigns to support only approved templates

* While creating SMS content in a campaign, you can only select from the approved content templates available in Engage+
* You can modify only the variables of the template. Various checks such as variable length, using only registered header, and template-id. are in place.

### Benefit

This ensures campaigns are successfully run and TRAI regulation-compliant messages are delivered to customers.

### Use Case

The Marketing Manager wants to send DLT compliant messages to his customers. For that, she can create the content templates in the DLT portal and submit them. Once approved by DLT, she can upload a file with content templates in Engage+ creatives. This file will be checked for mandatory information such as sender id, template-id, approval status, etc. Once the file is successfully uploaded, DLT approved SMS templates will be available in Creatives. These approved templates can then be used in Campaign messages.

To see how to upload a template and for DLT FAQs, click here.

## OU/MLP filter in campaign creation

This release allows orgs with OUs to filter campaigns of each respective OU on the campaigns listing screen and also allows an org to see the OU name on screen throughout the flow of campaign creation so that they have visibility for which OU they are creating the campaign.

### Problem Statement

Many orgs have multiple OUs and there are various issues when we show all the campaigns of all OUs together for such orgs:

It is difficult for users to have visibility on how many and which campaigns are running for each OU.\
When a user is creating a campaign, it is confusing for the users to know for which OU they are creating the campaign.

### Solution

A campaign-level filter based on OUs is introduced on the campaign listing screen.\
OU name is displayed on screen throughout the campaign creation flow so that users understand which OU they are creating campaigns for.

## MLP support in Engage+

### Problem Statement

For Orgs with multiple Loyalty Programs, it is very important to uniquely segment customers belonging to different programs and then interact with them through personalized communications.

*For example:*

Orgs with many partners: Orgs could issue Partner-co-branded loyalty cards to its customers. Customers use these cards during purchases to avail points/ discounts and other benefits. A customer can be part of more than one Partner Loyalty program.\
Conglomerate with a presence in different verticals such as Hotels, Airlines, and Retail - The org unit or brand in these verticals have their own loyalty program. A customer can be part of more than one Loyalty Programs.

### Solution

It is required to uniquely identify customers according to the Loyalty Program they belong to and send messages/offers accordingly. Sometimes the org may also want to do some cross-vertical sales.

For more details, click here.

### Enhancements made

1. Scope filter on the Message creation page: This helps you select the target audience belonging to a certain loyalty program only. The selected scope is valid throughout the Campaign Message and thus will get applied to Filters and Labels.

The scope set in Message is also considered when creating an Audience Group. The audience list will have customers of the selected loyalty program.\
The scope is automatically applied to transaction and loyalty filters.

2. Audience filter scope according to the selected OU

If you set OU scope in a message, then the Audience Group will have customers of the selected Loyalty Program by default.

## Transaction and Loyalty Filters can now understand scope definition -

* **Transaction filter example**: If Loyalty Program/Card Series A is selected and we give the condition “Include customers whose transaction count is 0-5 during specific date range", then only customers of the card series A who have done less than 5 transactions appear in the list.\
  Since one customer can belong to more than one Loyalty Program, 5 transactions might have been done with a combination of Card Series A/B/C. Without passing scope the identification of the right customer is not possible.
* **Loyalty filter example**: If Loyalty Program/Card Series A is selected and we give the condition “Include customers whose active points are in the range of 0-500 then customers who have less than 500 active points with Card Series A will only appear in the list.

  Since one customer can belong to more than one Loyalty Program, less than 500 points might have been with a combination of Card Series A+B+C. Without passing scope the identification of the right customer is not possible.

3. Labels and tags specific to loyalty program

Now labels/tags related to the selected loyalty program will be applied by default when the respective scope is set for the campaign.

For example: If the selected Loyalty program is A and the tag used in creatives is \{\{total\_points\_to\_expire\_day(7)}} then the Card Series A points will be included in the message.

New labels for Card Series (Card Number, Card Issue Date, Card Series Name) have also been added.

**What's upcoming**

* Multiple Loyalty Programs selection: Marketers will be able to select more than one Loyalty \* Program as scope. If Loyalty Program A, B is selected, then all the customers of both A and B can be targeted for a campaign.
* New filters for Card Series: Card status, card creation, card expiry date, max no. of cards per user, tender code, and tender description.
* Few more card-related labels will be added in OND.
* The following Card Series related filters will be available in the OND quarter: card status, card creation, card expiry, max number of cards per customer, tender code, and tender description.

# Capillary Data Platform

## Support for Card Custom Fields

By default, we support several standard and extended fields for cards. However, your brand requires storing additional information like card delivery address, chip information, state, or PIN code. Most of such additional fields are of type string and unsupported by default extended fields.

With this release, you can add new field types and custom data to make them align with your requirement.

Use Case

Card information which needs to be captured but does not fit into the available card extended fields can now be captured with card custom fields. Some examples can be card delivery address, city, state, pin code etc.

While adding a new custom field for card, field scope should be selected as “customer\_card”

![](https://files.readme.io/2e9f236-StefLpmOeLqa73ATQWTZAOeJ36vZJ2h9oQ.gif "StefLpmOeLqa73ATQWTZAOeJ36vZJ2h9oQ.gif")

The following APIs now support adding or fetching card custom field details.

GET v2/customers\
POST v2/customers\
POST v2/card\
PUT v2/card\
GET v2/card\
PUT v2/card/bulk\
Card update event in Event Notification\
Card Update Event added to the list of available events in Event notifications. You can now receive events whenever a card is updated via Card Update APIs - PUT v2/card and PUT v2/card/bulk.

**Use Case**

A notification needs to be sent to the customer once the physical card is dispatched for delivery. Card status label and card custom fields like address are updated via card update API and a notification is triggered.

## Support to fetch Card details on Sharingan

Sharingan now supports fetching card details of a customer. You can access all card details like card number, series code, card status, label, extended fields etc.

**Use Case**

Show card details of a customer in a microsite.

## Authentication for Behavioral Events

Earlier, the Webhook API requests did not require even a basic authentication. Anyone could just copy the schema and send requests to Capillary.

You can now secure your Webhook API requests with authentication. The added layer of authentication is extremely helpful in preventing fraud or abuse of data. The ideal case where authentication is effective is when your brand uses behavioral events to reward customers with points or coupons.

To avail added security, you need to get the authentication enabled for the brand by raising a ticket with the platform team. You are good to go and you can use till credentials for authenticating requests from Webhook API. You can either use Basic Auth or OAuth.

**Use Case**

Brands using Behavioral events for rewarding customers by issuing points/coupons which have monetary value can use authentication to prevent abuse/fraud.