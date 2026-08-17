---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# July-August-September 2022

# Loyalty+

## Supplementary Memberships to manage expiry of the scheme/program

Supplementary programs are micro programs run on top of the brand's core loyalty offerings. These offer customization at a segment level. However, these programs can have limited life as they are promotional in nature or based on partner related benefits.

Earlier, there was no option to set the validity of a particular supplementary program. Now, you can set the end date for supplementary programs.

While setting up the programs, we now have two additional toggle buttons -

* **Set validity** - You can set/update the end date of a supplementary program (SP) while adding.  Set the toggle button to *Yes*, you will see the **Validity till** option where you can set the end date of the supplementary program.
* **Move customers to another program on expiry** - If the program expires or deactivates as per the validity set, you can move the customers of that program to a different supplementary program. Set the toggle button to *Yes*, a drop-down appears below (Backup partner programs). Select the partner program where you want to move those customers.\
  In the drop-down box, you will see only those partner programs whose validity/expiry is greater than the current partner program.

## Improved integrations for Loyalty+ Promotions

Currently, apps only show running active loyalty promotions (points as benefit) to customers. There is no `getCustomerPromotions` API since loyalty promotions are not issued to a customer. They are event triggered.

The challenge is to remove these promotions once the customer achieves the condition and points have been allocated for the promotion. For cart promotions,  redemption count is checked  available and then do. However, points promotions are displayed as a hack via cart promotion API.

So, in the getPromotionsMetadata API for loyalty promotions, we have added a parameter “includeRestrictions”.

Pass the parameter to return the following limits set along with the customer achieved values against those limits

* Maximum points to be issued in a single event&#x9;
* Restrict number of point events for a member
* Maximum points to be issued to a member
* Maximum points to be issued from the promotion

### Sample Response

```json
"limits": {
   “maxPointsperEvent”:100
   "pointsPerCustomer": 1000,
   "numberOfTimesPerCustomer": 2,
   "totalPointsInPromotion": -1
   },
	 "customerLimits": {
   "currentPointsPerCustomer": 100,
   "currentNumberOfTimesPerCustomer": 2,
    }
“promotionLimit”{
   	"currentTotalPointsInPromotion": -1
}
```

## Calculate Target on Net amount and Gross amount

Earlier, in the “Add Target” flow of Target Loyalty, when target is to be set on the Sales KPI, it would by default be set on the basis of net amount (gross amount - discount) .

As a loyalty manager, I would want to set the target on the basis of gross amount.\
Eg: A customer achieves a target of Rs.5000 in a month, then the target is achieved.Here the amount 5000 can be either gross amount or net amount depending on the business requirement.

Description for this update:

* For a particular target group, in the “Add Target” window, there are options to select KPIs on the basis of which you want to track the target values.
* For the Sales KPI , now we have introduced the option to select “Net amount” or “Gross amount”. These are radio buttons and either of them can be selected.
* Under the condition block below this, if “Transactions” is selected in the drop down, then the net amount and gross amount are the bill amounts.
* Under the condition block below this, if “Line Items” is selected in the drop down, then the net amount and gross amount are the sum of line items.

<Image align="center" width="3000px" src="https://files.readme.io/811eb7c-unnamed.gif" />

## Event notifications for target value updates

Currently we do not send communication to the customers on any updates done in the Targets.

As a marketing manager, I want to notify customers on target related updates to keep them informed and nudge them for further engagement

Description for this update:\
The event notifications have been created for the below target events:

* Target is achieved
* Target achieved value is updated
* Target defined value is updated
* Target period is completed

<Image align="center" width="3000px" src="https://files.readme.io/0859fd1-unnamed_1.png" />

## Link Supplementary Programs in various Loyalty events

Currently we support supplementary program linking in the AddTransaction event. However the linking event has a much broader applicability.

As a loyalty manager, I would like to be able to link members to supplementary programs based on customer attributes. Eg: BMW owners have a special supplementary program curated for them. This can happen at the time of registration or customer update.

Brands link members as part of rewards for various engagements like :

* Giving a coupon to the customer for linking
* Giving it as a benefit on tier upgrade
* Some behavioral events like playing games or completing N number of referrals…etc.

We successfully support the linking of supplementary program action in the following events :

1. Customer Registration event
2. Transaction Update event
3. Redeems a coupon event
4. Updates customer profile event
5. Behavioral events
6. Target completed event

## Field - “redemptionId”’s is added to the Bulk redeem coupons API response

Currently whenever multiple coupons are redeemed in bulk, the Redeem Customer Coupons (bulk) API does not send redemption Ids of the coupons in the response.

We have successfully added the redemption Ids in the response of the Redeem Customer Coupons (bulk) API. Please find below a sample response payload :

<HTMLBlock>{`
{  
    "response": \[  
        {  
            "entityId": 369454015,  
            "result": {  
                "id": 369454015,  
                "redemptionId":"123",  
                "currencyInput": false,  
                "localToBaseCurrencyExchangeRate": 0,  
                "warnings": \[],  
                "appendedErrorMessage": "",  
                "code": "U6ER8MJ5",  
                "discountCode": "NO_VALUE",  
                "seriesCode": 84093,  
                "isAbsolute": true,  
                "couponValue": 100.0,  
                "redemptionStatus": {  
                    "statusCode": {  
                        "status": true,  
                        "message": "Coupon processing successful",  
                        "code": 700  
                    },  
                    "warnings": \[],  
                    "warningsAsStatusCode": \[],  
                    "message": "Coupon processing successful",  
                    "code": 700,  
                    "success": true  
                },  
                "discountType": "ABS",  
                "discountValue": 100,  
                "discountUpto": 0  
            },  
            "errors": \[]  
        }  
    ],  
    "totalCount": 1,  
    "failureCount": 0  
}
`}</HTMLBlock>

## A filter added in 'Get Customer Coupons' API to fetch only the redeemable coupons of a customer

In the ‘Get Customer Coupons’ API, currently we don’t return the coupons which are redeemable. .

Once a coupon is redeemed, even if it can be redeemed more times, it will fall under an unredeemable coupon because it's redeemed once.

It is not possible to fulfill this requirement using the existing query params :

* ‘unredeemed’ - fetches only unredeemed, ignores redeemed coupons where the maximum redemptions are not yet met
* ‘redeemed' - fetches all redeemed coupons
* 'active' - fetches coupons based on expiry dates irrespective of redemption is possible or not

There are cases where a certain coupon can be redeemed multiple number of times. So, as a marketing manager, I would like to be able to show all the redeemable coupons to my customers.

We have successfully added a new parameter titled “redeemable”, that fetches all active coupons with redemptions available.

## The coupon code character limit increased to maximum 40 across clusters

Currently the max coupon code length varies from cluster to cluster and in some clusters we allow max 20 characters. Also we do not support hyphens in the coupon codes while uploading them.

Description of this update:

1. We have set the max coupon code length to 40 in all clusters.
2. We now support the hyphen symbol (-) in the upload coupon codes.

## 1-Click view of Loyalty Performance Reports

On the current Loyalty UI, users aka Loyalty CRM Managers, Product teams and any external or internal members using Capillary’s Loyalty+, have only a view of the Loyalty Program Set Up including the Tiers, Reward Currency, Communications, Expiry details etc.\
To understand how these programs are performing and periodically measure and understand the KPIs, they had to follow a step-by-step process to reach Capillary’s analytics Product - Insights+. Taking cognizance of this multi-step access, we have improved it for users to have a nimble approach to checking the performance and KPI.

This step-by-step process has now been reduced to a single-click process. Now you can quickly access the specific critical Reports of your Loyalty Programs with one 1-Click.

**Problem statement**

User’s path to access to a specific critical reports on Insights+ from Loyalty+ has been a multi-step process causing users to lose motivation on the way.\
Measuring engagement and understanding user’s intent on Loyalty+ could not be fully ascertained.

**Use cases**

* User should be able to access specific reports on Insights in 1 click
* User should be able to view the specific reports opened on a separate tab so that context of Loyalty UI is maintained

**Solution**

1. Specific reports links have been put upfront on the Home page of Loyalty+ UI
2. Each Section as below has been tied up with relevant report which can be accessed by clicking on “View Reports” link on the respective tab

a. Following are the mappings:

i. Overall Performance: Top 5 reports

* Loyalty Sales Report
* Points Report
* Coupons Report
* Points Expiry Reminder
* Loyalty Standard Report

| Loyalty Feature Tab   | Associated Report       | Purpose                                                                         |
| :-------------------- | :---------------------- | :------------------------------------------------------------------------------ |
| Tiers                 | Loyalty Standard Report | To view overall KPIs for each of the tiers and overall loyalty base performance |
| Reward Currency       | Points Report           | To view Points allocation and redemption-related KPIs                           |
| Offers                | Coupons Report          | To view Coupons issuance and consumption KPIs                                   |
| Communication         | Loyalty Standard Report | To view the overall performance of Loyalty Base across strategic KPIs           |
| Points Expiry Section | Points Expiry Report    | To view overall KPIs related Points Expiry and reminders                        |

<Image align="center" className="border" border={true} src="https://files.readme.io/87e88d2-image_2.png" />

<Image align="center" className="border" border={true} src="https://files.readme.io/7870912-image_1.png" />

## Support for Hex Code in Loyalty tiers

**Problem Statement :**

Earlier the users could choose the color of the tier in the tier settings, by dragging the mouse on the color palette. But this allowed only limited colors to be selected for the tiers.

**Use Case:**

As a Loyalty program manager, I would like to use silver color for my silver tier, golden color for my gold tier, green color for my highest tier etc. but the color drag palette does not support these customized colors.

**Feature Description:**

The tier color settings have been enhanced now. As you know each color is associated with a HEX code, so now you can edit this Hex code in the tier settings.If a color is not available in the color palette, simply type-in the HEX code of the required color, and the tier will acquire that color. The color cannot be changed for the default tier.

![](https://files.readme.io/be61e02-unnamed.png)

## Bulk Configuration tool for Workflows

**Problem Statement :**

* Through marvel rewards, brands setup catalogs with products, coupons, cart promotions, vendor reward etc. The currency for all these rewards are points owned by the customer.
* Currently we support static currencies i.e for the entire reward period the currency stays the same for the reward unless manually updated.
* If a brand wants to run promotions on their reward catalog i.e give discounts in the point value for a certain time and show additional promotions metadata for those items, it is not supported dynamically and needs to be changed manually at every instance.

**Feature Description:**

* Users will now be able to download a ruleset from any activity as a template as a file into their PC.
* This downloaded file will include both the true and false conditions with their respective expressions along with the actions configured within them.
* Users will be able to see which program this template was from, along with the customer activity, ruleset type (in case of Transaction Add it will be one of the 4 root types, it doesn’t matter for all other events) and the labels of the source rulesets (if available)
* Now, the users will be simply able to upload this downloaded file wherever they require the same set of configurations. But they will have to ensure that they replicate the sets in the same customer activity ( download rule sets from Transaction Add customer activity and upload them in any program, but in Transaction Add customer activity).

# Engage+

## Introducing Journeys in Engage+

Journeys is an engagement automation interface that enables you to create scenario based flows to nurture your customers throughout their lifecycle. It helps marketers identify the right course of action by creating multi-campaign flows, incentivizing customers, and engaging them via multi-channel personalized communication, all at one place. It helps businesses automate their Customer engagement flow.

#### What are journeys?

A Journey is an engagement flow that drives your interaction with customers towards a certain marketing objective. It starts with an entry trigger and diverges into several branches based on the conditions set up. A customer goes through flows which are set up by the user.

Capillary Journey product is composed of different components that decide how the user will move in the Engagement flow.

1. Entry Triggers
2. Building Blocks\
   i. Engagements\
   ii. Flow Control

*Entry Triggers: Entering a Journey*\
These are the points where customers enter the journey. Triggers are basically a set of rules that decide which customers to enter the Journey. A Trigger sets the context of a Journey.

**Entry Triggers** are classified into:

1. **User Initiated Triggers**

These are the entry triggers or conditions that are based on many user properties such as user events, audience list etc. When a user satisfies the conditions set by use, she will enter the Journey. Events are evaluated in real time.

User Initiated triggers are classified into:

**User Events**\
This Entry trigger is defined based on the user events. Marketers can set up upon which customer event a customer enters the journey. This includes transactional events like Purchase, Discount On transaction, Points redeemed etc.

To learn about **How to set up Entry Triggers**,

**Example:** Marketer wants the customers whose transactional value is greater than $ 10,000, to be included in the Journey.

<https://lh6.googleusercontent.com/yMrHNWsuPZUAIILKZr592NvXRs65X9EaPnsE6w3nSkVZCRAe5him9M7l-YNEoAqosZpV1Mzu0gJMhOp6dQBjZz93R-GkPKuxMFqOtdoIarN0BFhjIVbksmoCbfH70oVZ5TIlIgzAWRgPFo8Xg6M>

**Audience List:** Brands can upload a list of users or create an Audience Group using filters and and initiate a journey for them.\
A customer enters a journey through these Entry triggers and then follows certain conditions to personalize the engagement flow. These can be set up by the **Building blocks of Journeys**

*Building Blocks of Journeys*

Building Blocks of Journeys are the customizable in-built logic variables that you define while creating a Journey.

*Engagements*\
The engagement block contains different types of channels that can be used to engage with your customers. A marketer can add an engagement block (of a particular channel) and can configure the content in that block (specific to that channel) to reach out to users.

It is a Multi-channel Engagement block which supports the following channels

1. Email

2. SMS

Any number of communications can be set up by simply Drag & drop of the channels and content can be configured in the same block itself.

**Example:** Marketer wants the customers whose transactional value is greater than $ 10,000, to be included in the Journey. Furthermore, he wants to **communicate the discounts** availed by these customers via **SMS channel**.

Flow control\
It helps you control the flow by applying conditions to user events or preferences.

This Building Block controls the customer experience and Journey flow by configuring conditions on the behavior or preferences of the user in the Journey

These are differentiating conditions set by the marketer to define a flow for the user who entered a journey. It is an extra point of decision making where the user is pushed into a different or the same flow based on certain conditions on Time or Event based preferences.

Flow Control is further divided into:

**Wait**\
The Wait blocks lets the users wait for a defined amount of time before they continue a journey. Basically the user awaits its Journey flow for some time defined by you to achieve the desired objectives. The wait can be for X amount of Days/Months/weeks, before the user can proceed in the flow.

**Example:** Marketer wants the customers whose transactional value is greater than $ 10,000, to be included in the Journey. Furthermore, he wants to communicate the discounts availed by these customers via SMS channel. The marketer wants to wait for the customer to avail these discounts and wants to send a follow back communication after waiting for a period of time

**Wait till event**\
This block waits for the user from proceeding in the Journey flow until the user has performed the desired User events or actions.

Basically you set up certain conditions on the events performed by the customer. If these event conditions fit with the user actions, the user proceeds along the path. If not, then the user Waits for a specific amount of time before entering the next block

**Example:** Marketer wants the customers whose transactional value is greater than $ 10,000, to be included in the Journey. Furthermore, he wants to communicate the discounts availed by these customers via SMS channel. The marketer wants to wait for the customer to avail these discounts and wants to send a follow back communication after waiting for a period of time, let’s say 5 days. He wants to then incentivize the customers who have redeemed the coupon after 5 days but have customer points more than 150. If this condition is not followed, the user waits another 3 days before proceeding to the next block.

**Decision Split**\
The Decision split divides the flow into different  paths. If the user actions or attributes match with the conditions specified, User goes to the former path. If not then go to other paths.

***How to Guide***

This section tells you the step by step process to set up a Journey or it’s components.

* **Journey: Getting Started**
  * **Creating a New Journey**

To create a Journey in the Engage+ UI:

1. Log on to **InTouch** of your cluster and navigate to **Engage+** from the menu.
2. Click on Journeys to open the Journeys Homepage\
   <https://lh5.googleusercontent.com/0vR-7gHP9W79Guwyg-heq1fYAWpLLpj21OlqZKTLjxBN322HdouSGt6qeBEhRWPiucJ4K3zQyqG-Kg5PZ_-7ahunuFeDj4qKBTB2xKdwV7UT97brnVbgvFPykrmbzeLG1jG4Ny7fVdRyXlWfLek>

<https://lh4.googleusercontent.com/xxGLJlU91HYS1TcrEVLWqR0cvYB4PwtxGIzn10anwVxsihTzUFl5azoG7ZUlALU-WDvQDOUZUqUb79C4Nw6NzoetD7BBBfVdocW1nEGfxIFvlODX0AhJ6a9nK9ZlPVDISyAdFEDd3w9IPsZUuQQ>

1. Search your Journeys by name
2. This represents the Status of the Journeys created.
   * Draft: The Journeys that are created and saved. A Journey is only editable in draft state.
   * Live: The journeys that have started
   * Approved: The journeys that have been approved but have a later date to start from.
   * Completed: The journeys that have been completed the end date of the live journeys\
     Awaiting Approval: The Journeys that have been Sent for Approval to the user with Journey Approving privilege.
3. Click on **Create new**
4. Enter a **Journey name** and select a **strategy** for your Journey or **Search Strategy** to select the strategy of your choice.\
   <https://lh6.googleusercontent.com/oI8IN_0u9MyrVFvds83hwq7zeap4x3cxRAk9nZ5_Mw1ORF_wIQpWGXLJwteMDrqk8a4QI1TUm04f35nkVjJuqRcD1sON5JQHgKlCRzW0vVVl3xAji1TwqRKIVSp1y3d9xGJxIQ7KcDpWDgqpzU0>
5. Click on **Build from Scratch** to create a customized Journey
6. Click **Continue**
7. Drag & Drop blocks from **Building Blocks** to create the desired flows
   * Shows the name of the Journey
   * These are the Building Blocks(Add link to Building Blocks) of the Journey
   * Shows the journey flows and paths
   * You can **Save** a Journey and **Send for Approval**.\
     <https://lh4.googleusercontent.com/PhgCVEGddTL9TfkFwFS5z3F9gl-nvlCM-hCdmep_O7295ZmxGc68kpCsq6p9o0G-iMHW7jT_uvdOVsBUHz_zTg_fM2-9NJxrxIzbWCq6hLQW5R-Wn-e5acLrMTKwA1m2Inwlv1mJmTz3B9q6znY>
8. Add an **Entry Trigger** to define which users would enter the Journey.\
   <https://lh6.googleusercontent.com/b6JCBzdpfGp5sm_RueVq6_iXStGz8fiJnQiM-0Kfee_Ox2wxJouTJ480soFAq6bG_piExKZumNK1TxacQGwSK0jydKN7b3ukEQFDM94FVOHYxIUEaUv66QUWmaSPYaZzojV6sXqJXiiDXLJP8fg>
9. **Drag & Drop** components from the Building Blocks to build relevant flows and paths.
   * Add **Engagements** to select a communication channel that would be used to engage with your customers. **Configure the Engagement Block** by adding creatives and offers.
   * Add **Flow Control** to control your customer experience based on their preferences. Configure Flow Control
10. Click **Save** to save a Journey as a Draft. Click **Send for Approval** to send it to approval to the user with Journey-approving privilege.

<https://lh3.googleusercontent.com/ufwKaoOa6mPYtRFovTdHb0-sx7H_7s5Hk8dsJAoWWPlQEK4GXX-uHdTD1LrN8HHKClGO8mu1tiV2Aa4jjf27ya_5pkGzdKWaMuyF4EPNkNL-0JCJh1HWOU2p-FcPePq-D3HCkxPd1dF-Dn-WB70>

11. Once a Journey is approved, it will go live as per the schedule.
    * Building Blocks and Entry Triggers
    * How to set up an entry Trigger\
      To set up an entry trigger:
    * Click on **Entry Trigger** to define how customer enters the Journey\
      <https://lh5.googleusercontent.com/EEAAIxVuJPJySN9ZJIoWMsCAmWESgylW9Nxg7NBsXyJoPU0kW_eT4AwcSiglvZTENQWj7QW1sXodtuCItFoIynu5rYvfUmmYtFoEA6CIkVrxv354EL6xWr1JJUoYOS1NkyrboBUA4zI770tO--4>
    * Select User Events and click Next

<https://lh5.googleusercontent.com/td95DUpM1GAlOHvfDHPnGaTQqwyhhXAfZXUPcmLfknF3Wq7loe_PoDZjX7YAgRSoMouRBIF0O0GoE8RPHSpPonEjfOjfx9JmepqJjG3H2Di2pJ3JadcTxWpb6MThHSFp24Z8UHay7YCPyiDqaHc>

* Click Select Event to define the event performed by the customer on which the logic based conditions would be written.

<https://lh5.googleusercontent.com/td95DUpM1GAlOHvfDHPnGaTQqwyhhXAfZXUPcmLfknF3Wq7loe_PoDZjX7YAgRSoMouRBIF0O0GoE8RPHSpPonEjfOjfx9JmepqJjG3H2Di2pJ3JadcTxWpb6MThHSFp24Z8UHay7YCPyiDqaHc>

* Click Add Entry Paths to define the path conditions on the event selected

<https://lh5.googleusercontent.com/XPuAUJQNDzr1-8uiH5MhgAH3CVo0zrhpph1vx0Smn-SvO-HP0fLUoLBBolXdIm7BW178oJWnl0hPWR6gINeqQskBZUDMmrigdFf2E1uXnKevSdrBgwsvvHykW1YwfPXSTlafJCzYLjVMZyCnT64>

<https://lh5.googleusercontent.com/rXXSAHd5MScm0XWEcUirjsuY8C0WPcIQ77mgpz7TTOJJVUbzaunguvIeNgtJzGWav3Mw9S6mrztAGfXZoIw-a7KKCcv_biNSHaphJDj7tKdm8mbArrI7Mei1qx0NyEVUgl_QSaC0hdkSO2kuFbg>

* You can add multiple AND conditions here. ALL the conditions added here have to be followed by the customer to proceed in the logic filtering\
  <https://lh6.googleusercontent.com/Ft3dFTMpQUJznvHHshNUlwFtDuB9a5rP-W6_KnyyQE5fT2NUxpudWs62O1y5Y5lIr-CdJPEa5uVuwjSBPSuk05JjRaJxG2gDUb2-EHb7yeBSpsQh1p9VR18aZVbe_PbysXO4z2jA8-nctboceOQ>
* You can add multiple OR conditions by selecting this. ANY condition has to be followed by the customer to proceed in the logic filtering\
  <https://lh3.googleusercontent.com/mea6PqnLgDa3NdlHzGEf5z9dPVkxqdAFvBj3g-BdK_ixLKDQI7dcZEFIF154t2Y96WOrWa8YzGGXrybK1o-shd6OqUwlb88nPYdTxLNh2kEL-mF0OznVPHEVcPrldLNOJBkVvbjzIHxkQEwJ4jM>
* You can add a separate path for the customers following  different conditions on the entry event(Current Transaction in this case). There can be multiple paths for a single Entry Trigger. This means that the customers would get filtered on the basis of the respective path conditions defined.\
  <https://lh4.googleusercontent.com/iKVi5S39M9V7zVyuhnW9YXz8Vvb0uEmgwlhLkDnpqW6m299Bk8Cz34wO3a9tVtVAYacTt7svzlaSdu0wI-z5Ky6MHfTbiIcM7uXyOuHV3LKozYTiukE6TNbhf-nSUQnB7gDMqn5wsksT7JwIxLA>
* A customer proceeds this path when he/she satisfies the logic based conditions defined in a particular path. If there’s only one path, then the customer satisfying the conditions of the former would only proceed in the Journey.

If there are multiple paths, the customer proceeds in the Top path first. If the customer doesn’t follow the conditions set, he doesn’t enter the Journey

* Shows you the total number of paths created by the user.

<https://lh4.googleusercontent.com/Yi851K6SzxkwhTV9UWd9U_-1mg2Y4I8Mx99Q0xnxDoPOquxU1FGNZfKMHbpvvpnmIOa7tv5FhULGdgQCIjxrff6dK2w49cW-nSS5OmmVciIXpNiRko9cCypeAL59OVcMXo7P04Zn6pWyIVX5c4g>

5. Click Done to set up the Entry Trigger
   * You can see the Entry Trigger configured with the defined event and the respective paths according to the conditions set.\
     <https://lh3.googleusercontent.com/T09wKxQIPkfrofuYb71Nn8xwtfzvghPJ31Gs8cXAOlFxfPvqOtJAoiF6rsLbDTSWnjUxZlI2e3bwW78eldg6xJrKWr4b4iqwGSIH17j1hegyq5zSlPh8QUMuNSJy3tjkPJ1PwrPYo-KZdgMq9OM>

**How to configure an Engagement Block**

To Configure an Engagement Block:

1. Drag & Drop the Engagement channel that you want to use for engaging your customers on the desired path. Currently, SMS and Email are supported.\
   <https://lh6.googleusercontent.com/7faWdoCTorfjic25qVs0HRFVkGKYOaL5waIHuXuCnUqO-vi1SCQv5HSPbrqVTb65xkWytLHifw1g4hH68ld2YFCkJOz2-gA7qZmaFHYauCiQEtQROXbd2kWFTUTeRBRdU1SWNyF6uc89rzLpqvI>
2. Hover over the block to see the options to Configure and Delete the block. You can also configure the block by simply clicking on it.

<https://lh6.googleusercontent.com/ILfKl7AN2UA_6iStzSknFHh3CiRD2fZJO-ue8st0VaK6FPIrJZ9PfpqiT5-WFNpiYNI-WNQixi9wcFqJOZEIv8RNH3on5kAiHspplNrJoBN9Nlo9bfWSlQmkf8Zdk1iFoyh-1IjLK2BXqxUq_JQ>

3. Click on the Block to configure the creative that you want to send your customer.

4. Add an Engagement name for your communication

<https://lh5.googleusercontent.com/v6LhFYUCxOLyV15Rb-qYucRa7LQPgbED9uy982AtBYWMn-PebmWiooATULr8MYmCjOckGIMj5d8hXAfhT6M_29PA6Y7B9g5TxI7TaW0TnpnyCmmWN5ej_2V2NnF5MBeZeOkqS5plWGx0-Gxy-4A>

5. Click Add Creative to configure the content that you want to send your customers.(CTA to the adding the creative how-to

6. Click Add Incentive to configure the Offer that you want to provide to your customers(CTA to add incentive how-to)

7. You can set up the desired Delivery Settings for your communication by clicking Show

<https://lh6.googleusercontent.com/_Tn8TXLg21Hw14pO_YMi1aXm4UOTUm3zbxtmC0iwbXQbn7w2h1yIV2xbzUF-qw8udcp84oKuB9U1PGaLImoz-x4_WarAWq_FneZKshk3sEGNCzjNPNB47Bk4MVt7TqaqN7FqO8bYhKzaMelM3Qs>

8. Add delivery settings steps

9. Click Done to set up the Engagement block.

10. You can see the set up Engagement details in the path by Hovering over the Block. This has the details of the type of channel used, attached creative and the incentive attached.

<https://lh4.googleusercontent.com/78s49PRbSOYyzpDPSs5UR8uW9SwTg98yfFEoPrYt4rYaskcJEJnGgl3uADZj4JbTE77ZzdpIKlLbOamtW5JEjX3axez4cNCNV-I5F2J95ZnkMIIVD-cZ8z4-Ijy5yWyXxUeWdHORGeEK7if7hEQ>

**Flow Control**

To configure a Flow Control Block:

* Drag & Drop the preferred block in any of the paths, to control customer experience based on their preferences and behavior. Currently, Wait & Wait till Event & Decision split blocks are the available blocks.\
  <https://lh6.googleusercontent.com/rAuJA6khRHlYbT5AyOIJJ7QRYydDeZHs2obIk673BWkJsd9oy32c352aEdZh-iAXlHO_XzT3zpUmkxXr_Z5HSk4yVL6TBVszNH4b92wvsSVnPcLYfufGkdCuQ7HzY492qmO8wHcDIU8oIipgP-U>
* To set up a Wait block:
  * Hover on the block to see the options to delete and configure it. You can also configure the block by simply clicking on it.\
    <https://lh6.googleusercontent.com/ugEhoUm2Gsy8SMEd0QkX6foJahfUqlUr2pJfDJ75Zhqo2h1nvtjVhQI3KODxP2Cm7jNqgY5eHQzOQDBwTKoLKm6t5Iocvwu4k0j-9zTG0Mk8PrQoO6_M15shqMheopxxIHgs0mHqHM4fqFzZxa4>
* Specify the Waiting time by either selecting Wait for a duration to select a fixed duration or Wait until a date to select a particular date. Currently, only Wait for a Duration is supported\
  <https://lh6.googleusercontent.com/dcJOd7MdHU9xRs45Zl0sg8MiW9I63hLwVxg2D-tO3kTv-3I2tP2BHfxzuRWS2mZA1Axx8NYC5uVNKDF-2rcal6BBrmgmi_kTjTXMwFK2XkkZ8YEqo1TzM3zyypxCq3v2-lOS8OBAeaPRqpohoFI>
* 1: Specify the Duration in terms of a number
* 2: Select the unit of the Duration added. This can be Days, Hours, Weeks, Months or Years
* By default, Days is selected for the time unit
* Click Done to configure the Wait Block\
  <https://lh6.googleusercontent.com/hp3pUqzjO3M7A17zYG1CB-RF-y_ClOvKz3OCgIeoP33qkeKgoOCxnntbAjjUxqLl7KX_GL7Im5NpYjS7CCvVzbm1qr1EPPiJOJXWDTXZh61LwrsNSsqEx4_x-XPBKBvFnA3c3-MkSoWY-p9kcyw>
* You can see the block added in the path specifying the time of wait\
  <https://lh3.googleusercontent.com/tEHPNeqQw99IsBFwRaxz1OFF75lSKUCDAv61zp7CMbzpT4dtr21AmJjJzADPNkLWmJXi3sGdpbXhxBwt7CSN2b33PjUaf7SeYRp0FMJzVd7FSRC_F8nE5m18q4xMT0X-7iC-64fYLWTCYxlsReM>
* To Set up a Wait till event block:
  * Hover on the block to see the options to delete and configure it. You can also configure the block by simply clicking on it.\
    <https://lh5.googleusercontent.com/Pq2cS4ChYN0KbjtY-Oaoxkh6dB3rwOs4xMLrsfBaQZ-29wMZLgIsr853wNkaccmBfZmTx8dwnBImiZs3GzuMqcYW_p8S18qC1-l_ZRaau8FQ4EZLmwS428ONJ4sSZiPcx2Rg0CTDC4ezyj09Dy4>

<https://lh3.googleusercontent.com/sPcNIw99Og2aowNviQT9W3NUwW3i_Pi5w85pDG7Fb7UGL00GP9OIlzG3Ad0foLSPbPn5mqjmI9WY6AwKu6Kkzi7i6MUDJJraEO3EkZMF4Yai1Le3ZBOEdhcGWWUxGEkJD_WhB0BXTR_DlYCA99s>

* Event Path: This path would be followed by the customers who satisfy the conditions set up by the user.
* Specifies the event performed by the customer on which the conditions would be written.
* This path is followed by a customer when he doesn’t follow the Event based condition set up or doesn’t perform the event.
* This is the Wait Duration that can be set up by the user. A customer who doesn’t follow the event based conditions or doesn’t perform the event would Wait for this specified Duration before proceeding in the path
* Click Select Event to specify the Event performed by the customer on which the conditions would be written.
* Click Add entry paths define the condition on the event selected.\
  <https://lh6.googleusercontent.com/I1ff0oTArVsLi6AWBn9GSXmJOPBLj1GnXy9NvYr1N2I3c4khfOcCnGQRXQvPkGd4dOlA3XCWXe8tGuBjsAucOk2j3GqydjUNIWYNK7v6kbvdzXqLnovgQGlwQi7fX27me768X_81g743fh2fvKA>
* Select the wait time for the customer by specifying the Duration. The Duration can be Hours, Days, Weeks, Months or Years.\
  <https://lh4.googleusercontent.com/93aRscivqfoBST3iRDEwbXlxIfaifrCXXNSGOHIUhQbg0h8gY-jQK67CvVV8SWO0UEZaOGOnERCib8l6qPk8Aao4i0rsPQNb2yIkYpUUsKHRazwj0iVKV1SB7Tq6tP89T9FSvmL29bsusJx6gqk>
* Click Done to configure the Wait till event Block.
* You can see two different paths created for the customers to follow.\
  <https://lh4.googleusercontent.com/5NnmYMcmoLnYCN0M4QDLkTzjsp_11Xzl1brVawWN7j0CJApQnjNfB0iQEHRiqdQOmX_Dxf_ZoXpHn12LsI8ABM4kfy8Cdd9jjk3l_9oSz3sFN8_OH71C4WB0TCvqWsbAn_aHNJ33EV8KjsmZkss>
* To set up Decision split block:
  * Decision split can split customers into different paths based on customers KPIs\
    <https://lh5.googleusercontent.com/zFiZZBEBuS9qzfKYHjFDRw6DpGxiNP5pnF11vKKd761qpEpXRWmXezS5zMh1Hl5caxaBwfeNbrRkR4r1iI-AAwg62N5DL65X6mIsemZRvOzKY9G0GuJkrsG_3PQJXQozshih95uJdjeN3m-yJGs>

For more details, see [Journeys](https://docs.capillarytech.com/docs/journeys).

# Insights+

## Navigation Panel

### Problem Statement:

The current landing page of Insights+, reports listing page has all reports listed without any proper grouping and structure.\
The users find it difficult and tiresome to everytime search for  the reports that they wish to see\
Lack of structure in the listing page tends to discourage the users to find meaningful usage of Insights+ and leads to transactional engagement at best\
Landing Page of Insights+ lacks standardization which could have led to greater ease of use

### Use Cases:

Below are the use cases :

* As a user you would want to discover and access your reports easily
* View your Standard Reports upfront with minimal efforts.
* Easily identify your  product - wise reports.
* Smoothly navigate across  all the modules of the Insights+
* Discover reports/charts containing specific KPI/s

### Solution:

On the Landing page of Insights+, we have a Navigation Panel on the left side of the screen. The Navigation Panel will help you to traverse smoothly across the different modules of the product. The panel ensures better accessibility and discoverability of Reports .

Navigation Panel has following features and flows:

Users can  view and navigate to all the sections of the product via the  Navigation Panel.\
The reports are grouped under different categories in the navigation panel.\
For each of the products namely Engage+ , Loyalty+ , CDP and SmartStore+ , the Standard reports are listed in the Navigation Panel upfront.\
Users can scroll through the list of Standard reports and click on the report names to Navigate to the particular report.\
To view the list of custom reports, the user can simply click on the custom report tab in the Navigation Panel.\
Users can also navigate to the reports created by him/her and the ones marked as favorite via the Navigation Panel

The sub - sections of the different modules of the product are listed upfront and one can directly navigate to that page/section.\
Users can filter out the list of reports/charts which contain a certain KPI/s via the filter provided on the landing page

![](https://files.readme.io/70b6333-ezgif.com-gif-maker_3.gif "ezgif.com-gif-maker (3).gif")

For more detailed information,visit the article : [Product Navigation](https://docs.capillarytech.com/docs/product-navigation-1)

# Capillary Data Platform

## Pre-computed extended fields

In the airline industry, miles (equivalent of points) are awarded based on distance traveled by a customer between an origin and destination city pair. When a flight booking of a customer is sent to our CDP, the miles information for a booking between origin and destination is not typically made available in the booking file by the airline system. The CDP is expected to compute the distance for any city pair sent.

For supporting this, we now have an import profile to pre-compute and populate the distance between city pairs that is sent in the transaction add call. That is, for a given airline, the routes or city pairs and distance between them are known upfront. Using the import profile, you can upload the distance between city pairs into the CDP beforehand. When a booking comes with a specific origin and destination pair, the miles field is automatically filled with the appropriate distance.

Origin, destination and miles are all transaction extended fields. Based on origin and destination value passed in the booking, miles value is fetched from the CDP (you have already given the value in import) and added against the miles extended field. Note that this enhancement is not specific to city pairs use case above or origin/destination extended fields alone. This can be utilized for any use case where an extended value needs to be derived based on values passed in other extended fields.

## Transaction Requests for Receipt Scanning Loyalty Programs

A new type of request entity - transaction request - has been built to support Customer Service Representative (CSR) workflows for receipt scan-based loyalty programs. In receipt scanning loyalty programs, which are typically run by Consumer Packaged Goods(CPG) companies, customers make a purchase at a store, scan the purchase receipt and upload it to an app or web portal of the company running a loyalty program to earn points.

The interpretation of the uploaded receipt is typically done by a receipt scanning service that is able to identify the line items, pick the quantity, amount and other relevant to the items specific to the brand that is running the program from the receipt and then make a transaction add call to the CDP for points earning. This interpretation of the receipt by the scanning service might be inaccurate at times and these will have to go through a manual review process by CSRs of the brand.

For this purpose, we will have built a transaction requests entity where these inaccurate interpretations of receipts can be parked for review. CSRs can review the content (via a frontend app such as Member Care) of the transaction and images of receipts uploaded by the customer, modify it if needed and then approve it so that the transaction is captured and points are issued to the customer.

## External identifier for Behavioral Events

Similar to bill number for transaction events, we now have support for an external identifier for Behavioral Events. Brands will now be able pass their own identifiers for each event they send to our CDP. As a result, they will be able to achieve two things - First, when the same event is sent more than once to the CDP, the CDP will be able to reject duplicates based on configurations set for Behavioral Events based on external identifier passed (similar to bill number in transaction entity). This way, points will not be issued more than once for the same event and brands will be able to avoid unnecessary liability. Second, brands will be able to audit events accurately as events can be tagged using the external identifiers passed from the event source itself.

## Customer Status Update Event Notifications

Whenever the Customer Status of a customer is updated, you will be able to see the status update along with reason, if any, as a part of the CustomerUpdated event. This will be useful in several scenarios where downstream applications are dependent on event notifications. For example, let’s say that a customer has been identified as a fraud and his/her/their status has been changed to a FRAUD CONFIRMED status label. In such a scenario, the downstream apps should be aware of this change so that they can take corresponding actions. This will now be possible with the release of this enhancement.

## Auto Generation of Customer External ID

Typically, in cases where mobile or e-mail is not the primary identifier, the external identifier is used as a customer’s primary identifier. This external identifier is nothing but a customer identifier that is generated by a brand and passed to our CDP during customer registration.

However, in certain industries, the CDP is expected to generate the customer identifier for every customer who registers. For example, in the airline industry, the customer primary identifier is something called Frequent Flyer Number (although mobile or email are typically captured during customer registration). This number, abbreviated as FFN, is generated by the loyalty system (in our case, our CDP) as an identifier when a customer registers. The FFN is expected to be of a specific length and have a check digit (MOD7 or MOD10) at the end of it. Think of this as something similar to credit card numbers.

We now have support for generating the customer external identifier on our CDP for customer registration events. The length, offset and check digit of the external ID can be pre-configured and the numbers will be generated accordingly every time a customer registers.

## Connect+ Enhancements

We have released a couple of minor enhancements on Connect+ in the last quarter:

Join based on common file name

As of now, Connect+ ingests or joins files based on a first come first serve basis. That is, the file (s) that is first uploaded in the source FTP folder is picked first for ingestion or join. Although this may work for API templates, it led to issues in join templates.

For instance, let’s say a user wants to join two files - File 1 and File 2 on a weekly basis - and push into another FTP folder. File 1 CSVs are named in the following format - File\_1\_20211201, File\_1\_20211202 and so on. File 2 CSVs are named in the following format - File\_2\_20211201, File\_2\_20211202 and so on. Now let us say that the user uploads 7 files (one file for each day) of File 1 and File 2 respectively every Sunday and wants to join the files based on the date on which they were generated. That is, File\_1\_20211201 should be joined with File\_2\_20211201. Similarly, File\_1\_20211202 should be joined with File\_2\_20211202 and on.\
Until now, this was not possible as the File 1 and File 2 files were joined based on the time at which they were uploaded in the source FTP folder. For example, if File\_1\_20211201 was uploaded first followed by File\_2\_20211202, Connect+ used to attempt to join these two files instead of waiting for the right join file - File\_2\_20211201.

With the common file name join enhancement, you can tell Connect+ to wait for the right file to join using the naming convention used for files. In the case above, you can direct Connect+ to join only when the dates match in the names of File 1 and File 2.

Data Reconciliation Summary Report

We released the data reconciliation template in the last quarter for identifying events missed from ingestion in our CDP when compared to source data. For example, with the reconciliation template, a brand can compare transaction data between its source and Capillary CDP to identify transactions that got missed from ingestion in the CDP. Post identification, missing data can be ingested using the transaction add template on Connect+ itself.

To make the Connect+ user experience better, we have introduced a summary report for every reconciliation dataflow that runs on Connect+. Whenever a source file is processed and compared to data in our CDP, a summary report is parked in a FTP folder giving some useful information on the reconciliation job that was attempted. This includes data such as number of rows in the source file, number of unique matches with the data on the CDP (depending on what is being subject to reconciliation) and so on.

## Member Care new UI Enhancements

On the Member Care new UI, we have the following enhancements released

Customer Data Audit Logs

Brands using the new UI will now be able to view customer data audit logs (if enabled) on Member Care under the Events -> Audit Logs section. Currently, only the following aspects of the customer can be logged:\
a. Custom fields\
b. Extended fields\
c. Identifiers\
d. First name and Last name\
e. Card status (linked to customer)\
f. Subscription status\
g. Customer status

Note that this is a limited release and we will be rolling it out only to a few brands.

Role Based Access Control in the new UI

We have introduced RBAC in the new Member Care UI as well. Until now, any user of an org who had access to Member Care was allowed to use the new UI completely (without restrictions, if UI was enabled in an org ). Now, with RBAC applied to the new UI, role-based restrictions that were present in the old UI will be applicable to the new UI too. With this, we will be going ahead and enabling the new Member Care UI in all orgs in OND’22 quarter.

Note that you will be able to seamlessly switch between the new and old UI still. However, the new UI will become default.

Line-level data export

You will now be able to export line-level data of a specific transaction in the new UI. Please head to Transactions -> Events -> Transaction (select any) -> Line item details to initiate the download

## Custom Pages on Member Care

Member care already supports a few "native" actions such as change identifiers, retro transaction linking, goodwill points/coupon issual and so on. In the last year or so, we have been getting requests to enable Customer Service Representatives (CSRs) who use Member Care to perform "custom" actions such as editing customer profiles, linking/ delinking customers to partner programs, add transactions and others. Such "custom" actions (or actions customized to needs of a brand's CSR team) can now be enabled on Member Care via Sharingan custom pages. For example, let us say that a brand wants to allow its CSR to modify specific attributes of customers. This can be accomplished by building a custom page on Sharingan and embedding it Member Care. Only CSRs who have access to Member Care will be able to use these embedded pages. Also, on Sharingan, a page can be built for custom actions using any Capillary built APIs. There will be no need for any kind of onboarding.