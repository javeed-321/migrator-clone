---
updatedAt: 2026-08-17T05:54:00.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# April-May-June 2023

# Loyalty+

## Advanced delay accrual strategy:

With this enhancement, brands now will have the ability to configure their delay accrual strategy either 'as per the original bill date' or 'as per the processing date'. Brands have to configure this option by going to advanced settings.

More details here: [link](https://docs.capillarytech.com/docs/loyalty-org-settingsdf#setting-delay-accural-based-on-bill-date-or-processing-date:~:text=Click%20Done.-,Setting%20delay%20accural%20based%20on%20bill%20date%20or%20processing%20date,-We%20all%20know)

## Ability to create / edit / delete custom fields:

With this enhancement, now users can directly create / edit / delete custom fields in a very simple way. For this, they have to go to "points promotion" under settings of Loyalty+ module. This enhancement is intended to provide enhanced user experience to users with respect to custom fields accessibility.

More details here: [link](https://docs.capillarytech.com/docs/loyalty-settings-1#:~:text=Loyalty%2B%20settings%20page.-,Creation/deletion/editing%20of%20custom%20fields.,-First%20of%20all)

## Handling of rejected transactions:

Often times, what happens is, Capillary receives some transactions which might have discrepancies. It can be like: a line-item which is not present in our tables, a payment tender which is not present in our system, etc..  With this enhancement, we have created a mechanism which allows transparent & smooth processing of these transactions with a proper flow. This helps brands to handle the loyalty management of their customers without any gaps.

More details here: [link](https://docs.capillarytech.com/docs/handling-of-rejected-transactions)

## Limitation on the size of the csv file in milestone audience upload:

This is one more enhancement we have made keeping in mind the user experience. Now there is a limit of 25 MB on the size of the file that can be uploaded in the "audience upload" flow of milestones. This is because, with bigger files the upload process is getting affected & this 25 MB is the value we have arrived post proper observation.

More details here: [link](https://docs.capillarytech.com/docs/target-loyalty#getting-started:~:text=in%20the%20milestone.-,Getting%20started,-Create%20a%20Milestone)

## Explode API's enhancements

1. Earlier, the Ledger explode APIs were implemented for the following events :

* New Bill
* CustomerRegistration
* TransactionAdd
* GroupTransactionAdd
* GenericEvent
* CustomerPromotionImport
* BillPointsPromotionImport
* LineitemsPointsPromotionImport
* TargetCompleted
* Goodwill allocation
* Points redemption
* Points transfer

This enhancement will add new event i.e Transaction Return event

2. The expiry type field for both the regular and promotional points has been added to all the corresponding events. This field will indicate a rolling or fixed points expiry type.
3. The Explode apis will now fetch the source from which the customers have purchased (app, instore, website) for brands to track purchase behaviour's for brand strategies.
4. The Explode apis will now fetch the Loyalty Promotion names for the points imported from the following Profiles
   1. CustomerPromotionImport
   2. BillPointsPromotionImport
   3. LineitemsPointsPromotionImport
5. For the Goodwill event, now fetch the reason field for points allocation, for brands to know the selected reason for manually added points.
6. For Events with promised points, a maxConversionDate  field has been added which gives the date when the promised points will be converted to regular points.

More details here [link](https://docs.capillarytech.com/reference/get-customer-ledger-information)

## Milestones in the events tab of member-care

After this enhancement, brands/POS employees/IM/etc.. can simply use Membercare to know in detail about the milestones of a customer. This helps greatly enhance the end-user experience and decreases the number of tickets just to know deep details of a milestone.

A full read will be available, [here](https://docs.capillarytech.com/docs/milestones-in-events)

## Behavioral events - Card series

Behavioral events are one of the ways brands use to reward their customers for exhibiting a specific behavior. Once they are configured, whenever a customer exhibits that behavior, they will be triggered and the customer will get the benefits.

Until now, while configuring behavioral events, brands don’t have the ability to create them with respect to card series as an identifier. This became a problem for organizations that are using card series-based loyalty programs.

After this enhancement, now those brands will be able to create behavioral events with respect to card series too. How that works is, while creating the BE, the card number will present as an option for identifier type. Using this, even card series-based organizations can provide benefits and rewards to their customers based on the card series.

Following is the config page where card number can be given:

<Image src="https://files.readme.io/0786258-Screenshot_2023-06-12_at_11.10.09_AM.png" align="center" width="60% " />

Implementation help, [here](https://docs.capillarytech.com/docs/behavioral-loyalty#ability-to-connect-behavioral-event-to-a-specific-card-series)

## Return details in GetCustomerDetails API

All this time, the getCustomerDetails API is being used to get information about various activities regarding the customers like promotional points, expired points, expiry schedules, subscriptions, etc...

However, this API doesn’t have the ability to get information on one of the most important activities . i.e., returned points activity. Because of this, brands are depending on other APIs to get those details indirectly wherever possible. Even though that is achieving the result, not the best way to follow.

After this enhancement, now ‘returnedPoints’ is also added as a query parameter to this API. So from now, when GetCustomerDetails is called with embed = “retunedPoints”, information on the return points will be available in the output.

The following details can be found regarding returns now:

<Image src="https://files.readme.io/e4bd3b2-Screenshot_2023-06-08_at_5.49.55_PM.png" align="center" width="70% " border={true} />

API documentation is, [here](https://docs.capillarytech.com/reference/get-customer-details-2).

## Non-English support for Milestone group name & Milestone name

We are now providing the ability to save the Milestone group name & Milestone name in a non-English language for all the organizations. This means that, now brands don't have to depend only on English for naming convention in Milestones, instead they can provide the name in any language they want.

Milestone group name in non-English:

<Image src="https://files.readme.io/5c22bed-Screenshot_2023-07-12_at_9.58.18_AM.png" align="center" border={true} />

Milestone name in non-English:

<Image src="https://files.readme.io/eb0ba57-Screenshot_2023-07-12_at_9.58.34_AM.png" align="center" border={true} />

# Incentives

## Rewards Catalog

### Update the reward restrictions post it is live

Now users can update reward restrictions on a daily basis once a reward is live. With this new feature, brands will have greater control over their rewards restrictions including maximum quantities per transaction, customer purchase limits within the reward duration, overall purchase limits across all customers, and a No Time Limit option.

To provide more flexibility, we have also added the option for users to input "0" in the above restrictions, enabling specific limitations or exclusions as desired.

**To get started,**

You can refer to the detailed documentation here [Update Reward Restrictions](https://docs.capillarytech.com/docs/rewards-catalog-2#update-the-reward-restrictions-post-it-is-live)

### Personalize the catalog with program & tier scope

You can now tailor rewards catalog based on customer loyalty program memberships, tiers, and supplementary programs. By mapping rewards to specific program IDs, brands

* Can provide a more personalized and relevant experience for their customers
* Can offer exclusive rewards to higher-tier members

<Image src="https://files.readme.io/5f524ba-member_tier.gif" alt="Sample rewards catalog for Member tier" align="center" width="300px" caption="Sample rewards catalog for Member tier" />

<Image src="https://files.readme.io/9f59a19-ambassador_tier.gif" alt="Sample rewards catalog for Ambassador tier" align="center" width="300px" caption="Sample rewards catalog for Ambassador tier" />

You can refer to the detailed documentation here [Mapping rewards with loyalty programs](https://docs.capillarytech.com/docs/rewards-catalog-2#personalize-the-catalog-with-program--tier-scope)

### Rewards catalog now supports points redemption from user groups

With this new update, now the end customers can use the points from their group wallet along with the individual wallet to purchase the rewards from the rewards catalog. This will allow the customers to have more flexibility in redeeming their points and enjoy the benefits associated.

<Image src="https://files.readme.io/5a840bb-screen-capture_4.gif" align="center" width="300px" />

**To get started,**

You can refer to the detailed documentation here [Use group points to purchase the reward](https://docs.capillarytech.com/docs/rewards-catalog-2#rewards-catalog-now-supports-points-redemption-from-user-groups)

### Now users can pass notes in isRedeem and RedeemPoints API

In the issue Reward and issue bulk reward call, users can now pass “notes” field and it will be evaluated i.e. notes are being passed to loyalty from these API calls.

**Sample request body for issue Reward call:**

```
{
  "mobile": "mobile_number",  
  "brand": "brand",  
  "transactionNumber": "2344s4",  
   "notes": "This is a sample note"  
}
```

## Cart Promotions

### Re-use the Expired or Disabled Promotion names

With this new update, now users can use the expired or disabled promotion names in cart promotions. This update eliminates the need to create new names for promotions with similar offers, saving valuable time and effort for marketing teams.

Read more : [Re-use the Promotion names](https://docs.capillarytech.com/docs/cart-catalog-promotions#re-use-the-expired-or-disabled-promotion-names)

### Now cart promotions and gift vouchers can be claimed in different orchestrators

With this new update, cart promotions and gift vouchers can now be claimed in different orchestrators and issued to the end customers, Journeys module is the first in line. This will allow the users to have more flexibility in using the promo engine module.

<Callout icon="📘" theme="info">
  ### Please note that it will be available on Journeys side by the end of August'23 and UI for this feature will come in future sprints. In the meantime, you can start leveraging this capability via the APIs.
</Callout>

**To get started,**

You can refer to the detailed documentation here [Issue cart promotions and gift vouchers from Journeys](https://docs.capillarytech.com/docs/cart-catalog-promotions#claim-cart-promotions-and-gift-vouchers)

# Engage+

## Edit a Live Journey

### Problem statement

Marketer has spotted a mistake in a live journey or a change of strategy has occurred, and brand would want to change some configurations within a live journey.

To make such a change they would have to create a new journey from scratch and stop the existing one. This calls for a tedious process from the marketer’s side while also creating a possible overlap of audience with them receiving the incentive or communication more than the intended number of times.

### Enhancements/New features

#### 1. Edit a Journey

With the help of the Edit feature, brands can easily edit a live journey without the hassle of creating a new one from scratch. Users will be able to modify the contents/configuration of any blocks however you cannot change the structure of the block(add/move/delete any flow control blocks).

Once you edit a journey, save it and send it for approval, the journey will again be sent for approval and another version of the journey will be created. Let’s call the original version v0 and the new version v1. As soon as the approver approves this new version (v1), they will be prompted with an option to select “What should be the previous version behavior”? Sunset, Stop or Pause.

**Sunset**- Customers who have entered the v0 journey will continue to the journey v0 and new customers after v1 is made live, will now enter the journey v1.<br />**Stop**- v0 will be stopped for all customers. Customers who had entered the journey v0 will be exited from the journey. New customers will enter the journey v1.

If the marketer rejects the new version (v1), the original version (v0) will continue to be in a live state.

**Note**: At any point in time, only one version of a particular journey can be in a live state. Rest all versions can be either in Stop / Sunset / Draft / Awaiting approval / Rejected state but cannot be in Live state.

For detailed information, see <https://docs.capillarytech.com/docs/journey-versions/>

### 2. Pausing/Stopping/Sunsetting a Live Journey

In addition to editing a journey, users now also have an option to Pause a journey, sunset a journey or stop a journey. Please see below for more details on the behavior of the journey when either of these three options are selected:

**Pause Journey**: If a user pauses a current journey, it will be paused for all the customers currently in the journey. All the customers will continue to be in the journey however the next block of the journey will be executed only when the user “Resumes” the journey back.

In a paused journey state, no new customers will be allowed to enter a journey.

**Resume a Journey**: This option is only enabled when a journey has previously been paused. If a user resumes a paused journey, the current paused journey will get unpaused. The customers already in the journey will resume back from the stage where they were when the journey was paused and subsequent blocks of the journey will execute for them till the journey state is not changed again.<br />New customers can now start entering this journey.

**Stop a Journey**: If a user selects the Stop option, the journey will be stopped and it will end for all the customers present in the journey. No new customers can enter this journey.

Please note this action cannot be reversed again. A journey once stopped cannot be made live again.

For detailed information, see <https://docs.capillarytech.com/docs/journey-versions#pausingstoppingsunsetting-a-live-journey>

### 3. Other Linked Changes

(a) On Journeys listing page, users will see an option to filter the journeys by **Latest version status**. As each journey now could have multiple versions, the filter works on what is the current status (Live/Draft/Sunset/Stop, etc. ) of the latest version of the journey (most recent version).

![](https://files.readme.io/f961db8-image4.png)

(b) On the listing page of Journeys, under the Version count column, user will see following additional fields against each Journey -

(i) **Total number of versions**

(ii) **Latest version number** (If total versions are 5, they are identified as v0, v1, v2, v3 and v4)

(iii) **Current status of the latest version**- Here the latest version means the last created version

![](https://files.readme.io/2187368-image6.png)

(c) After the user clicks on any journey, if a journey has multiple versions, a list with all the versions for that particular journey will be displayed. You can select any version to navigate to the canvas of that version.

![](https://files.readme.io/57d8008-image3.png)For detailed information, see <https://docs.capillarytech.com/docs/journey-versions#other-linked-changes>

***

## Whatsapp BSP Changes

Meta has updated their WhatsApp business platform to have better alignment with business outcomes, more engagement and higher ROI. They have categorized their templates into three main categories - **Marketing, Utility and Authentication**

1. **Marketing**- Marketing includes all the communication sent to customers to promote brand items and nudge customers to visit their store/website and make a purchase. This will include promotional offers, product announcements and more to increase awareness and engagement
2. **Utility**- Utility communication includes order updates/alerts/order receipts
3. **Authentication**- This communication includes personal authentication information such as receiving OTPs from brands

### Migration of templates

1. For Karix- Initially Karix was supporting the older categories for whatsapp templates namely- Transactional, OTP and Marketing. For Karix, the old templates will work and will just be re-categorised as per the list below. These categories will be changed as follows<br />Transactional → **Utility**
   OTP → **Authentication**
   Marketing → **Marketing**
2. For Gupshup- Old templates will not work and clients will have to create templates as per the new categories. There are no live customers using Gupshup as of now, so migration will not be a hassle
3. For Twilio, we have not yet made this change and the discussion for this is still in progress

### Creating a new WhatsApp template

1. While creating new templates, choose from either of the three categories given in the drop-down menu
2. Other steps to create a WhatsApp template remain the same. Refer to [Create WhatsApp template](https://docs.capillarytech.com/docs/create-whatsapp-content)

![](https://files.readme.io/799b334-small-1.png)

3. While filtering out templates by category, choose any of the categories and all templates belonging to that category will be displayed.

![](https://files.readme.io/03ba857-small-2.png)

***

## Duplicate of a journey

### Use Cases to understand the feature

* In case the user wants to edit any message content or incentive they need to stop the journey and recreate it. Many times the changes are minute but the user has to redraw the entire journey again - which is time consuming & error prone.
* Many times the user wants different versions (slightly different from each other) of the journeys.
  * They can test the different versions results eg: Total revenue and carry on with the journey with best result
  * They can show the different versions to their Managers/ approvers and get only 1 approved
  * They can copy a journey and then edit it eg: Upsell journey & cross sell journey can have same journey design. In upsell we add incentives related to same product, in cross sell the product category or brand can be different

### Problem Statement

* Sometimes it is possible that brands want to create multiple type of similar journeys with minute modifications. It is time-consuming to create multiple such journeys from scratch. Introducing the duplicate feature will save time and efforts of the marketer
* It is also possible that marketers want to have multiple versions of a journey to test it out internally before publishing it. It would not be feasible to create multiple variations from scratch

### How are we solving this?

* Select an existing journey or create a new journey. Once the journey is drafted/waiting for approval/approved; then it can be duplicated
* Click on the duplicate icon next to the save button within the journey canvas

![](https://files.readme.io/f1f472b-small-image2.png)

* Upon clicking on the icon, a confirmation message would be displayed and if yes is selected, a copy of the existing journey will be created. The duplicate journey will be names as ‘Copy of Existing Journey’ which can be edited

![](https://files.readme.io/35e951f-small-image1.png)

* Configurations and changes can be made within the canvas of the journey as required. Click on Save or Send for approval. Once the journey is saved, it can again be duplicated if required
* To know more, refer to [Duplicate a Journey](https://docs.capillarytech.com/docs/duplicate-journey)

***

## Exit Trigger Reset

This feature enables brands to reset their exit trigger within a journey. Suppose a brand wants to remove an existing condition from their journey that lets a customer exit, they can now reset the trigger

### Use Case

1. Initially brands were not able to remove an exit trigger altogether. An error messages **no condition added** would be displayed if they tried to remove an exit trigger
2. A simple reset button not only allows brands to remove a pre-configured existing trigger but in case of multiple triggers, brands can remove all of them with the click of a button. It saves time and the hassle of removing each condition manually

### Resetting an exit trigger

1. Once the journey canvas is opened, navigate to the exit trigger
2. Upon hovering over the exit trigger, a reset icon will appear

![](https://files.readme.io/1010a93-small-4.png)

3. Click on the reset icon to reset the entire configuration of the exit trigger
4. For more information, refer to [Exit Triger](https://docs.capillarytech.com/docs/configure-journey#4-optional-configure-exit-trigger)

***

## Capturing DND status of customers

### Problem Statement

Until now, there was no way for brands to know which customers have opted for a DND service because this information was not getting captured at Capillary end.

Everytime a brand would run a campaign, they would be targeting DND customers also, since CDP did not have this info. The communications would go out from Capillary but will get blocked at the gateway level.

### Enhancement

Now, from the Delivery receipts that are sent by Gateway partners to Capillary, we are also storing the NDNC status of a customer in Capillary CDP. This will help brands to know which customers are DND, before targeting them.

Additionally, if brands want to extract a list of DND customers, they can also do that and reach out to them separately via Store Calls or any other mode of communication.

## SDK

### Android

#### [Version 1.3.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1780353?version=1.3.0) (June 22, 2023)

* **Push Amplification** -  Added support to send push notification through Xiaomi Cloud Push Platform
  * Create functionality to Pass Token to  Hydra SDK
  * Create functionality to Pass Hydra SDK related Push notification Payload to Hydra SDK
  * Send Token List to the backend in the UserUpdate Event
  * Handling notification coming from multiple services based on scope
  * Create Broadcast Receiver extending Mi’s PushMessageReceiver, responsible for generating the token as well as receiving the payload in sample application
  * Create a helper class which will then be interacting with the hydra sdk to pass the token and payload to hydra sdk, also will have methods to initialize the Xiaomi’s sdk. (No unit test for this as the changes are part of the sample app)
  * Adding dlr event push ignored

[Xiaomi Push - 1.0.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1915044?version=1.0.0)

* Added support to send push notification through Xiaomi Cloud Push Platform

[Hydra Core- 1.2.2](https://github.com/Capillary/hydra-sdk-android-maven/packages/1705267?version=1.2.0)

* Updated signature of internal api’s

[Hydra Pushbase - 1.3.1](https://github.com/Capillary/hydra-sdk-android-maven/packages/1774436?version=1.3.0)

* Internal changes relevant to support the Xiaomi Push
* Compatibility update with hydra core

[Hydra Firebase - 1.2.1](https://github.com/Capillary/hydra-sdk-android-maven/packages/1774453?version=1.2.0)

* Compatibility update with hydra core

#### [Version 1.2.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1780353?version=1.2.0) (May 20, 2023)

* **Rich Notification** - Added support for rich push notifications, added stylized template to support different image sizes
  * Base for the rich notification, which will initialize the module and will take input from the push base to build a rich template
  * View layouts for expanded and collapsed notifications supporting Rich notifications with imageImage

[Rich Notification - 1.0.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1863337?version=1.0.0)

* Added support for rich push notifications

[Hydra Pushbase - 1.2.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1774436?version=1.2.0)

* Build stylized template based on whether it is BIG\_PICTURE notification or not
* Internal changes relevant to support rich notifications

#### [Version 1.1.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1780353?version=1.1.0) (April 17, 2023)

* **InApp Notification** - Added support for in app notification
  * Displaying user Milestone In-App notification when the application is in the foreground.
  * Displaying user broadcasts In-App notification when he launches the application for the first time. (no campaign duration supported as yet)
  * Support the following UI templates:
    * Pop up with single static text
    * Pop up with single static text and an image
    * Pop up with single static text, an image and a button (max 1 button supported for now)
    * Pop up with only the image.
    * Pop up with static text with a button
    * Pop up with image and button.
  * DLR events
  * Image caching
  * Support navigation for External\_URL and Deeplink
  * Rule engine

[InApp Message - 1.0.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1863337?version=1.0.0)

* Added support for in app notification

[Hydra Core- 1.1.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1705267?version=1.1.0)

* Lifecycle handling to display in app message on app launches
* Initializing in app module
* Callback for activity’s lifecycle

[Hydra Pushbase - 1.1.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1774436?version=1.1.0)

* Passing the payload to the in app module
* Compatibility update with hydra core

[Hydra Firebase - 1.1.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1774453?version=1.1.0)

* Compatibility update with hydra core

### iOS

#### [Version 1.3.1](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.3.1) (June 20, 2023)

* Fixes DLR event reporting for notifications received in the background.
* Updates sending events to the backend. SDK will now sort the events wrt event creation time before sending them to the backend.
* Added support for sending gateway information to the backend

#### [Version 1.3.0](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.3.0) (June 7, 2023)

* Recreated the authentication flow.
  * The auth flow will be performed just before sending the event.
  * Changed APIs to async-await Swift.
* Removed notifications as a way of communication between classes.
* Added a new Logger system and app can now set the Logger level.
* Added single initialiser for HydraCore object.
* Private EventsManager object. All Events APIs are exposed via HydraCore object.
* Optimised network calls. More efficient now.
* Improved method descriptions.
* Utilised SwiftUI for InAppMessages. Deprecated storyboards.
* Utilised string constants instead of direct usage of strings in the application.
* Added more test cases.
* Improved test case code coverage.
* Added single initialiser for HydraCore.

#### [Version 1.2.1](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.2.1) (May 8, 2023)

* Fixed a crash in Hydra Core when creating a events manager instance
* Added linter for swift coding guidelines

#### [Version 1.1.1 ](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.1.1)(April 26, 2023)

* Updated the frameworks to not embed the dependent libraries
* This resolves the issues occurring when application needs to be uploaded to app store

#### [Version 1.1.0](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.1.0) (April 25, 2023)

* This is the first release of Hydra frameworks in a single package.
* Prior to this release individual frameworks have been released as a separate package.
* This release contains below frameworks
  * Contains [HydraCore 0.2.2](https://github.com/Capillary/HydraCore/releases/tag/0.2.2)
  * Contains [HydraInAppMessage 0.1.0](https://github.com/Capillary/HydraInAppMessage/releases/tag/0.1.0)
  * Contains [HydraPushNotification 0.2.0](https://github.com/Capillary/HydraPushNotification/releases/tag/0.2.0)

**HydraInAppMessage (April 17, 2023)**

#### [Version 0.1.0](https://github.com/Capillary/HydraInAppMessage/releases/tag/0.1.0) (April 17, 2023)

* InApp Notification - Added support for in app notification
  * Displaying user Milestone In-App notification when the application is in the foreground.
  * Displaying user broadcasts In-App notification when he launches the application for the first time. (no campaign duration supported as yet)
  * Support the following UI templates:
    * Pop up with single static text
    * Pop up with single static text and an image
    * Pop up with single static text, an image and a button (max 1 button supported for now)
    * Pop up with only the image.
    * Pop up with static text with a button
    * Pop up with image and button.
  * DLR events
  * Image caching
  * Support navigation for External\_URL and Deeplink
  * Rule engine

**HydraPushNotification**

#### [Version 0.2.0](https://github.com/Capillary/HydraPushNotification/releases/edit/0.2.0) (April 17, 2023)

* Added In-App message support by parsing the notification payload
* Establish communication between the HydraInAppMessage framework and the HydraNotification framework
* Removed the dependency of the HydraCore framework from HydraNotification

**HydraCore**

#### [Version 0.2.2](https://github.com/Capillary/HydraCore/releases/tag/0.2.2) (April 17, 2023)

* Added support for sending below DLR events for In-App Messages
  * Inapp\_message\_show
  * Inapp\_message\_clicked
  * Inapp\_message\_dismissed

# Insights+

## Masking PII Data on the Databricks

**Version:** NA<br />**Date:** July 18, 2023

### Overview

Currently, internal capillary users and brand users can fetch the user information from the Capillary system in bulk via two places - with one of them being Databricks. Since this information contains critical PII information, this poses a serious security risk on the platform.<br />This enhancement enables an Admin user to start or stop masking PII fields in the Analytics database at an Org level.

### How does it work?

Once data masking for a brand is enabled, fields marked as PII data (for now, First name, Last name, Mobile number, Email Id & External ID) would start getting masked in the Analytics database (that is, read\_api tables).<br />All the PII fields would start showing up as a string of asterisks  “\*\*\*\*\*”.

Admin users would be able to stop masking or pause the masking after getting the necessary approvals from the brands.

Any jobs created on the database to fetch the above-mentioned PII information will have to be run on admin\_read\_api tables which selected Databricks users would have access to.<br />Roll out process

### Future enhancements

We are currently in the process of finalizing the process to start/stop PII data masking on Databricks and will get back with the process by Aug'23.

### Documentation

Link: <https://docs.capillarytech.com/docs/mask-pii-data-in-databricks>

# Capillary Data Platform

## API security enhancements

### 1. Increasing oAuth token expiry to 30 days (43200 minutes)

OAuth max expiry limit is increased to 30 days (43200 minutes). For security reasons, this is not enabled by default for all orgs. A ticket needs to be raised to increase the token expiry limit. For more information, refer to Token expiry duration in [API client](https://docs.capillarytech.com/docs/api-client) documentation.

### 2. Changes to permission settings while creating API client

The permission settings configuration during the creation of an API client is replaced with an option to select the appropriate access group. For more information, refer to [API client](https://docs.capillarytech.com/docs/api-client).

### 3. Integration with Customer Identity and Access Management(CIAM) platforms

Until now, brands that built loyalty applications using our platform had to rely on our authentication engine for customer identity management. Although this worked well for most of the smaller brands on our platform, we are increasingly seeing scenarios where enterprise customers want to deploy CIAM solutions for handling customer identity as these solutions are industry standards-compliant and offer a plethora of enterprise-grade security features. For this to happen, the Capillary API gateway, which is tightly integrated with our own authentication engine, should be able to work with the CIAM that the brands deploy and provide access to resources accordingly.

As a first step towards enabling this, we have made enhancements to our API gateway to make it work with the NextReason CIAM platform. With this support, brands can deploy [NextReason](https://nextreason.com/) CIAM for identity management purposes on their loyalty applications.

For more information refer to [Gateway integration with CIAM](https://docs.capillarytech.com/docs/api-gateway-integration-with-ciam-platforms).

***

## Membercare enhancements

### 1. Tracking session logs on Membercare

This feature empowers Membercare to log user sessions and also enforces a mandatory requirement for admin users to provide a reason whenever making changes. For more information, refer to [Session logs](https://docs.capillarytech.com/docs/session-logs#starting-and-ending-a-session).

### 2. Request management screens on new Membecare UI

As of now, brand users raising identifier change or Account merge requests on the new Membercare UI had to navigate to the Older UI to Approve/Reject a request.  As a part of the AMJ quarter, we have migrated these functionalities to the new UI. For more information, refer to [Manage change](https://docs.capillarytech.com/docs/manage-change-request#approve-identifier-change-requests).

### 3. Adding gross amount field to Events -> transactions in a single view and group view

Gross amount field is added to Member View and Group View on Membercare in the Events → Transaction screen. For more information, refer to [customer view](https://docs.capillarytech.com/docs/customer-overview) and [group view](https://docs.capillarytech.com/docs/group-view).

### 4. Masking OTPs on Membercare

A new configuration CONF\_MASK\_OTP is added. This feature allows the masking of OTPs during the GET OTP API calls and on Membercare. For more information, refer to [Mask OTPs](https://docs.capillarytech.com/docs/mask-otps).

### 5. Member and group search on the member view/group view

This enhancement enables you to search for a member or a group from the member view/group view page itself. For more information, refer to [ Searching for a customer or a group](https://docs.capillarytech.com/docs/member-care#searching-for-a-customer-or-group).

### 6. Supporting points expiry, conversion and trigger-based schedules in group view

This enhancement enables you to view points expiry and conversion in group view on the new Membercare UI. For more information, refer to [Incentives](https://docs.capillarytech.com/docs/group-view#incentives).

### 7. Group view completion - goodwill points issue

This enhancement enables you to issue Goodwill points from the new Membercare UI. This is part of group view completion in Membercare. For more information, refer to [Group view](https://docs.capillarytech.com/docs/group-view).

### 8. Group view completion - slab change log screen

This enhancement enables you to view the tier change log history from the new Membercare UI. The slab change log screen in the group view of Membercare is identical to the one in the customer view. This is part of group view completion in Membercare. For more information, refer to [Issue goodwill points](https://docs.capillarytech.com/docs/issue-goodwill-points-coupons#new-membercare-issue-goodwill-points).

### 9. Customer stats in Membercare fetched from Insights+ backend

The customer status widget in Membercare now displays the details fetched from the Insights+ backend. For more information, refer to [Behavioural stats](https://docs.capillarytech.com/docs/customer-overview#behavioural-stats).

***

## Extension

The platform extensions framework is an independent platform that will be utilized for building vertical-specific and even brand-specific features. For more information, refer to [Extension](https://docs.capillarytech.com/reference/introduction-extensions).

### Airmiles calculator on extension framework

We have been focused on building vertical-specific enhancements on our platform over the last year after we signed enterprise-grade clients from airlines, hospitality and other industries. Continuing this theme, we have released an airline loyalty-focused enhancement to compute miles travelled by a customer given an origin airport and destination airport. In airline loyalty, miles (or points) are awarded to customers depending on the distance travelled between an origin and destination. As a result, this becomes an essential feature for onboarding airline companies on our platform. Another important highlight here is that the air miles calculator feature has been built on our new Platform Extensions framework.

For more information, refer to [Airlines miles extension](https://docs.capillarytech.com/docs/airline-miles-extension).

***

## Administration

### Localisation support

The localisation feature in the Capillary platform enables one to view the content of any of the Capillary products in the desired language and also helps to display the terminologies according to the industry. For more information, refer to [Localisation management](https://docs.capillarytech.com/docs/translation-management).

***

## API changes

### 1. Retrieving line item quantity in absolute value

The GET transaction V2 API is modified to support the retrieval of transaction information based on transaction numbers and to get details of each transaction's line item quantities in absolute value. For more information, refer to [GET Transaction details with transaction number API](https://docs.capillarytech.com/reference/retrieve-transaction-details-with-bill-number).

### 2. Transaction search

In airline loyalty programs, Customer Service Representatives (CSRs) often receive requests from loyalty customers to claim miles earned on a flight. Customers or frequent flyers would call with details such as flight number, origin and destination and mention that the booking (or transaction), which is of type non-loyalty, would need to be tagged to them so that they can earn miles for it. CSRs, upon receiving this request, would look at the booking on our platform using the booking attributes shared by the customer and then issue a claim request.

To enable this specific scenario, we have built a new search API that will allow CSRs to look at bookings using pre-defined search criteria - a combination of transaction standard, custom and extended fields - and process miles claim requests.

For more information, refer to [Transaction search API](https://docs.capillarytech.com/reference/meta-search).

***

## Connect+ enhancements

### 1. Connect+ link to be added to Intouch side navigation bar

Connect+ can be accessed from the Intouch side navigation bar now. For more information, refer to [Connect+ introduction](https://docs.capillarytech.com/docs/introduction-7).

### 2. Template for changing test and control status of customer

A new template Test and Control is added to Connect+. For more information, refer to [Test and control template](https://docs.capillarytech.com/docs/test-and-control).

### 3. Enabling *.Ok* file ingestion part of existing templates

This enhancement enables to use .ok files for data ingestion similar to any other file format that Connect+ supports. The existing .ok file template is removed. For more information, refer to [Connect to source](https://docs.capillarytech.com/docs/connect-to-source).

### 4. Filters on more than one header

This enhancement enables Connect+ to support filter expressions for multiple headers. For more information, refer to [Transform data](https://docs.capillarytech.com/docs/transform-data).

***

## Mobile SDK

Capillary SDK for both iOS and Android is released. This enables brands to enhance their applications with seamless push notification functionality and event tracking capabilities. For more information, refer [iOS ](https://docs.capillarytech.com/reference/ios-sdk)and [Android ](https://docs.capillarytech.com/docs/android-sdk-getting-started#/)SDK.