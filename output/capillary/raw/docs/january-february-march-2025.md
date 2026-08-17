---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# January-February-March 2025

# Engage+

## Mobile SDK

### Hydra iOS SDK release [1.6.0](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.6.0)

* Performance Improvements
  * Used backgroundContext for CRUD operations to improve Core Data efficiency.
  * Optimized database operations using asynchronous perform methods.
  * Created a separate queue for thread-safe resource access.
* Bug Fixes
  * Resolved issues in event handling and pull notifications.
* Feature Enhancements
  * Added public methods to update various Hydra attributes.
  * Added completion blocks for critical asynchronous operations like DLR event reporting and database insertions.
* Database and Notification Handling
  * Set mergePolicy for the backgroundContext to handle conflicts gracefully.
  * Improved unread notification count retrieval with a dedicated method.
  * Updated notifications as read when a user interacts with them.
  * Enhanced pull approach by saving valid notifications into the database before further processing.

### Hydra iOS SDK release [1.6.2](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.6.2)

**New Features & Enhancements**

* Database Improvements:
  * Added missing fields in the database.
  * Changed the type of the custom field to \[\[String: Any]].
* Shared Data Support:
  * Added support to share the Events database using App Groups.
  * Now using shared user defaults to store and fetch the push notification opt-in status.
* SwiftUI Support:
  * Introduced a public API to get the NotificationCenterView in SwiftUI applications.
* Badge Count Enhancements:
  * Reset badge count to zero on the first-time install of the app.

### Andoroid SDK release (1.8.10)

Included the following versions of dependencies -\
`versions = [  
            core     : '1.6.9',  
            pushbase        : '1.7.10',  
            firebase        : '1.7.9',  
            richnotification: '1.3.9',  
            mipushkit       : '1.3.9',  
            inboxcore: '1.4.9',  
            inboxui  : '1.4.10',  
            inapp           : '1.3.9',  
            catalog  : '1.8.10'  
    ]`

## New event onboarded

On popular demand, we have onboarded the below events as entry trigger to journeys:

* Customer Update
* Promotion Issued
* Coupon Issued
* Points Issued
* Reward Issued
* Tier Upgraded
* Tier Downgraded

You can find all the available entry trigger events over [here](https://docs.capillarytech.com/docs/configure-journey#user-events-trigger).

## New tags added

We added the below tags to journeys:

Transaction Id and Bill Points to the Transaction Profile as a part of Transaction Entry Event. We have also added the User Id AES tag to the Customer section

<Image align="center" className="border" border={true} width="25% " src="https://files.readme.io/d112737213bc628994f9d4a7ddb90d4acc57a7694a88d671f96c25faa34bafb2-Screenshot_2025-02-11_at_3.27.22_PM.png" />

<Image align="center" className="border" border={true} width="25% " src="https://files.readme.io/fabf873022d61e44f7ea0ce01f088cf4a02952d82b7c8026d373030a5c4574bc-Screenshot_2025-02-11_at_3.26.56_PM.png" />

## View multiple user entry in Journey History

Now that we allow the same user to enter the journey multiple times, we have enhanced the journey user history feature. When you click on the search icon, a side panel opens where you enter the user's Id. When searching, you can see the list of entries for the user ordered by latest first. You can then select a specific entry to see the user's journey.

<Image align="center" src="https://files.readme.io/cae0e483b69a83bc2ddc1ce016050733ae81e51036b3ad8bfbe7a187a4d36838-830e2b84627893e715e20155a4ceefc8e55059d19dc16b98efcd9b82969a904c-Search_Customer.gif" />

You can find more information [here](https://docs.capillarytech.com/docs/search-user-journey-history).

## LINE and Viber Channels now available in Journeys

We've introduced LINE and Viber as new communication channels within Journeys. This enhancement lets you reach customers more effectively through their preferred messaging platforms.

<Image align="center" className="border" border={true} src="https://files.readme.io/529db53e70312c6726edc8aacbce6727cf1908e17edbd751eeba859849eee775-Line_and_viber_in_journey_.gif" />

For more details, please refer to the documentation [here](https://docs.capillarytech.com/docs/building-blocks-of-a-journey#engagement-building-block).

## Multiple gateway integrations for WhatsApp and Zalo channels

We now support multiple gateway integrations for WhatsApp and Zalo. This feature enables brands to effectively manage costs by switching gateway vendors.

<Image align="center" className="border" border={true} src="https://files.readme.io/b64d1cefff3bd9d34797e8c0a4862a7e5253d9533e65e20535d4a2036dc91cdf-image5.png" />

## Support for Special Characters in WhatsApp

WhatsApp now supports special characters, ensuring messages are displayed correctly across all devices.\
This enhancement improves readability and prevents formatting issues in customer communications.

<Image align="center" className="border" border={true} width="50% " src="https://files.readme.io/f7580fcb44baf21b3104368cbe11ad82f7814c40a265527743eee8e1195a062e-Screenshot_2025-04-16_at_2.47.35_PM.png" />

## Editing messages in a live journey

Previously, when editing a journey, a new version was created, but customers who had already entered a specific journey version could continue in the same version and, therefore, receive the older content.\
With this feature, we now offer support for moving users from one version of the journey to the next while going live with the newer version, enabling real-time updates without stopping/sunsetting the journey.
This allows for greater flexibility and optimization based on ongoing performance.

<Image align="center" className="border" border={true} width="100% " src="https://files.readme.io/2c2cf887d1ffbca216c7d883e9d952897a8e75e5ac447d070518c3e8d90a3cc2-image2.png" />

## Launching Whatsapp Carousel Component

We've introduced the WhatsApp carousel component in Creatives, allowing you to add multiple images or videos to your WhatsApp creative.

This enables Retail brands to send interactive product offers to their customers.

<Image align="center" className="border" border={true} width="100% " src="https://files.readme.io/8bc192e5817683f96ca57770bb9f4a897a3dc40ebb7899853b27a7485ac7cdb1-image4.png" />

For more details, please refer to the documentation [here](https://docs.capillarytech.com/docs/create-whatsapp-template#examples).

## Reachability calculation for all channels (Viber, Whatsapp, RCS, etc)

Previously, we computed reachability for SMS and used it for channels like Viber and WhatsApp. Now, with the availability of v2 channels, we calculate reachability specifically for each channel.

<Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/f61bdf898626ce1bb9ede652c4c1ad87b3d6508ce2cd46b2967386b6c0df7f58-Screenshot_2025-04-16_at_3.03.27_PM.png" />

For more details, please refer to the documentation [here](https://docs.capillarytech.com/docs/line-sending-campaign-messages#creating-an-audience-group).

# Insights+

## Enhancing Reporting - Support for all types of Audience Groups as filters

Previously, only filter-based audience groups were supported as filters in the reports. As a part of this minor enhancement, we have enriched reporting to support all types of audience groups—combined, uploaded, or filter-based as filters.\
This will enable brands to compare reports across a combination of audience groups, including uploaded ones.
You can find more information [here](https://docs.capillarytech.com/docs/add-audience-group).

## Enhanced Reporting on Concept Hierarchy

Building on our commitment to empowering brand and business teams with more relevant reporting structures, we’ve now extended the flexibility of our Concept Hierarchy feature in Insights to support deeper and more complex store structures.

Previously, Concept Hierarchy allowed the grouping of stores across up to 3 levels, limiting how deeply brands could model their operational hierarchies. To address the growing need for more granular and business-specific reporting, we’ve enhanced the hierarchy support to allow up to 7 levels, enabling significantly more detailed drill-downs and performance comparisons.

For example:\
A brand that previously used: Country → Zone → Store
Can now define: Business Unit  → Region → Zone → Store → Till

This means reports can now answer questions like:\
"How did premium apparel stores in malls perform in the Northern zone compared to standalone stores in the same region?"

For more details, please refer to the documentation [here](https://docs.capillarytech.com/docs/concept-hierarchy).

## Reducing the upload based segments availability time from T+2 -> T+1

Previously, when brands needed to create complex segments using files created based on Databricks notebooks, the process took T+2 days - one day for ETL and another for syncing the uploaded file via FTP. This delayed time-sensitive campaigns & promotions.

We’ve now reduced this delay to T+1 day by introducing SQL traits based on complex business logic. These attributes are processed during ETL and made available directly to the segment builder the next day, removing the need for an additional sync step.

For more details, refer to the documentation [here](https://docs.capillarytech.com/docs/segment-creation-using-sql-traits).

# Incentives

## Enhanced Coupon Code Redemption Limits

Brands can now set a maximum redemption limit for a coupon code across all customers.

**Example**

A brand issues a "SALE50" coupon with the following settings:

* Coupon code redemption limit as 50 and anyone can redeem the coupon

John receives the "SALE50" coupon and shares it with his friends. Since the coupon is not restricted to a single user, anyone with the code can redeem it. However, once the total number of redemptions reaches 50, the coupon becomes invalid for all customers, even if some individuals have not yet used it.

This update provides brands with greater control over coupon distribution, preventing excessive redemptions beyond the predefined limit.

<Image align="center" className="border" border={true} src="https://files.readme.io/df211fbf69c74a72bd0793454a6d9beb5a6062f1bd5c5c81525b822aabf1d03f-image1.png" />

### UX Revamp: Improved Coupon Issuance & Redemption Limits UI

We've redesigned the coupon issuance and redemption limits interface for a more intuitive and seamless user experience. Managing limits is now simpler and more efficient.

<Image align="center" src="https://files.readme.io/a63de45b67edf2f49cea5f4d8e332a07ed35a432b0f761ddd5b1b92f50bdcb2e-Issual_and_Redemption_Limits_Process_Steps_1.gif" />

For more information, refer to the documentation [here](https://docs.capillarytech.com/docs/manage-coupons#configuring-the-redemption-settings).

## Merge Customer Rewards During Customer Merge

The Customer Merge feature is now enhanced to support the merge of rewards. When two customer accounts are merged, the rewards from the survivor (merged) account are transferred to the victim (retained) account. This ensures that all rewards are consolidated under the surviving account.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/docs/manage-change-request#merge-accounts).

## Ability to add metadata and images for vendors

The Vendor Management API has been enhanced to support adding a description, vendor code, rank, images, and videos related to the vendor. This enhances the presentation of vendor information, improving the customer experience.

<Image align="center" className="border" border={true} width="45% " src="https://files.readme.io/e5ca53916fa37165c799283293fa6f3c27bf0004937157480be0a1af626dd654-image.png" />

To know more about this feature, refer to the documentation on [Vendor Management API](https://docs.capillarytech.com/reference/createvendor).

## Support for adding external image URL and altText in rewards

The Reward APIs have been enhanced to support external image and video URLs, allowing reward images to be provided via a URL alongside the existing option of uploading images and videos to the internal S3 file service. Additionally, an optional alt text field has been introduced for both images and videos, which can be used to add a description of the image’s or video’s context.

<Image align="center" className="border" border={true} width="40% " src="https://files.readme.io/d838ebba75aadff92f9e4bd767868b4e55a724d2e87e563e07fb79ab9d141e0e-image.png" />

For more information, refer to the documentation [here](https://docs.capillarytech.com/reference/post-create-reward).

## Support for enum data type in Reward's custom fields

The Create Custom Field for Rewards API has been updated to support the ENUM data type. This allows you to create a custom field with multiple possible pre-defined values.

For example, as a reward manager, you can create a custom field called "Reward Category" and define possible values such as "Discount", "Free Gift", ”Merchandise” and "Cashback." When creating or updating a reward, you can select one of these predefined values for the "Reward Category" custom field.

<Image align="center" alt="The UI is tentative and will come in future sprints." border={true} caption="The UI is tentative and will come in future sprints." src="https://files.readme.io/ee07f798f7afc8cc36f12e9653adc1487bb3cc85bda4fd068656fda67c7cf636-image.png" width="55% " />

For more information, refer to the documentation [here](https://docs.capillarytech.com/reference/create-vendor-redemption).

## Get Reward Transaction API now accepts only transactionId and return the details

The GET Reward Transaction API has been enhanced to retrieve reward transaction details using only the reward transaction id without the need to pass the customer id.

For more information, refer to the documentation [here](https://docs.capillarytech.com/reference/get-transaction-details-by-reward-transaction-id).

<br />

## Improved Timezone Handling in Rewards Catalog

Previously, reward timings in the get APIs were returned in the server’s timezone, often leading to confusion for teams working across regions. For instance, if a reward was set for 25th April, 10:00 AM Dubai time, it might incorrectly appear as 11:30 AM IST, without any timezone label, just because the server was running in India timezone.

To resolve this, we’ve standardized all reward times to UTC behind the scenes:SS

* All inputs must now be in UTC
* All API responses will return UTC
* This ensures full consistency across environments and teams

<Image align="center" width="400px" src="https://files.readme.io/21eb859915dd84eeef6d0b02680be4ba6325beef5aea0b8edd404d237395fc3a-Screenshot_2025-04-24_at_6.16.35_PM.png" />

<br />

### For example:

If a reward is scheduled to start at 25th April, 10:00 AM Dubai time (UTC+4), it should be entered as; Start Time (UTC): 2025-04-25T06:00:00Z.

This same UTC value (2025-04-25T06:00:00Z) will be returned in all the get API responses.

📝 Please note:

* These changes apply only to the APIs
* There is no change on the legacy Marvel UI. The UI changes wrt to timezone will roll out as part of the Rewards Catalog UI revamp

For more information, refer to [this](https://docs.capillarytech.com/reference/rewards-catalog-api) API doc

## Support for Retroactive Rewards & Event Date-Based Processing

Rewards can now be created with past start dates for retroactive issuance or migration use cases. You can also issue rewards based on the event date when the customer actually did the activity, even if it’s processed later.

### Example:

Customer activity on 1st April, processed on 5th April, reward is issued with 1st April as the reference.

* Accurate reward timelines
* Supports backdated rewards and migrations
* Aligns with customer actions, not processing delays

📝 For more details refer to this [API](https://docs.capillarytech.com/reference/post-issue-user-reward#response-parameters) doc

## Enhancements in get calls for customer badges

Previously, some badge GET APIs provided only the posted date, while others included the earned date when the customer performed the activity. This inconsistency led to challenges in accurately tracking and reporting customer badges, particularly for retroactive or migrated data.

#### What’s new?

The GET APIs for customer badges now include two new fields:

* lastEarnedOnDate: System-generated timestamp for when the badge was earned
* lastEarnEventDate: Brand-provided activity date when the customer qualified for the badge.

### For example:

If a customer earns a badge for completing an activity on March 11, 2025, but the badge is granted and posted in the Capillary system on April 20, 2025, the response will look like this:

lastEarnEventDate: March 11, 2025, 10:55:12 UTC : This is when the customer actually performed the activity (e.g., making a purchase, completing a task, etc.), qualifying them for the badge.\
lastEarnedOnDate: April 20, 2025, 14:08:16 UTC : This is when the badge was issued to the customer in the Capillary system (the posted time).
📝 Refer to the updated [Badge API](https://docs.capillarytech.com/reference/badges) documentation for details.

## Enhanced Reward Descriptions with Rich Text Formatting

Reward descriptions now support HTML formatting, enabling:

* Clearer Listings: Use bullet points for easy-to-read benefits and steps.
* Direct Links: Embed clickable web addresses.
* Faster Performance: HTML storage optimizes app loading.

<br />

<br />

<Image align="left" width="150px" src="https://files.readme.io/b08abec4f9057778af8ba1208e170228c93c7343169bf1991e7060c5a876d5db-image4.png" />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

**Impact**: More engaging and understandable rewards through better formatting and direct access to important links.

<br />

<br />

<br />

<br />

<Image align="center" src="https://files.readme.io/78cd4dcf8d6815fbdacdf458dff6bcc9cb81d4f9b88f1fe0d409013dcb5a540a-image1.png" />

*UI for this feature will come in future sprints.*

<br />

## Minor updates/enhancements

1. #### Benefit linking has been removed from badges

Now to add the benefits to badges, benefits should be issued from loyalty promotions along with issual of badge.

2. #### Now badges can be created in the past via UI for retro processing

   <Image align="center" width="400px" src="https://files.readme.io/26790fb53a7aad690e0c51e67467f1bdde23e25e79aa7205d61aa6295d1ca2b4-Screenshot_2025-04-24_at_6.29.27_PM.png" />

3. #### Reward reporting enhancement:
   Reward transactions can now be mapped with customer card and label data, enabling richer insights. Brands can analyze engagement by segments (e.g., platinum card holders vs. regular card holders) and tailor future campaigns more effectively.\
   Refer to [this](https://docs.capillarytech.com/docs/offer-reporting) documentation for details.

4. #### Support for coupon updates without series ID
   The Coupon Expiry and Revoke APIs now support updates and revocation of a single coupon code without requiring the series ID. This enhancement simplifies small-scale operations, improves support efficiency, and reduces manual effort. For larger batches, where more than one update or revocation is needed, the series ID remains necessary to ensure optimal performance.\
   Refer to [this](https://docs.capillarytech.com/reference/update-coupon-code-expiry-date) documentation for details.

5. #### Support for product attributes in coupon APIs
   The coupon APIs now support a new product type: ATTRIBUTE. This allows brands to map coupons using key product attributes instead of individual SKUs, simplifying large-scale campaign setup. Existing API structures remain unchanged. Note: UI support for ATTRIBUTE mapping will come in a future release.\
   Refer to [this](https://docs.capillarytech.com/reference/create-coupon-series)  documentation for details.\ <br />

# Loyalty+

## Publishing Loyalty Programs And Promotions Separately

When publishing a change made to a loyalty promotion, any changes made within the loyalty program will also be published along with the promotion. We've updated how publishing a promotion works to provide better control when making changes to loyalty programs and promotions.

**What's New:**

* You can publish changes made to a loyalty program or loyalty promotions separately without affecting the other.
* If you need to publish promotions and loyalty programs separately, you can request this by raising a ticket to the sustenance team.
* Important: Once this setting is enabled, it is permanent and cannot be reverted.

To know more about this feature, refer to the documentation on [Loyalty Promotions](https://docs.capillarytech.com/docs/loyalty-promotions).

## Support For Reward Currencies (Points & Alternate Currencies) In Unified Targets

Unified targets now support tracking both points and alternate currencies, offering greater flexibility in defining customer goals.

**What’s New:**

* You can now track both points and alternate currencies within a unified target. To do this, select **Earn reward currency** as the customer activity when creating a milestone.
* A combination of different targets can be set up to track points and alternate currencies separately.

**Example:**\
A brand creates a yearly unified target to earn 1,000 loyalty points, collect 500 “Stamps” and collect 100 “Green Coins.” Customers who meet all three targets earn the “Super Customer” badge for the year.

To know more, refer to the [Customer Activities](https://docs.capillarytech.com/docs/milestones-new-flow#customer-activities) section in the Milestones documentation.

## Revamped Enrol Audience For Milestones

To encourage more use cases, the customer enrolment section when creating milestones has been updated to improve the user experience and include a feature to skip enrolment.

**What’s New:**

* The UI has been revamped – A new drop-down **Add audience** to add audience groups or upload a `.csv` file containing customer details.
* A new option to skip adding customers to a milestone. When this option is selected, no customers are enrolled in the milestone. You can then add customers using the enrol milestones API.
* You can now edit the enrolment method for a live milestone.

To know more refer to the section on [Customer Enrolment](https://docs.capillarytech.com/docs/milestones-new-flow#customer-enrolment) in the Milestones documentation.

## Support For “Overall” Target Value For Non-Transactional Targets In A Unified Target

An overall target is an additional goal that users must achieve alongside other targets within a unified milestone. This feature was available for transactional activities. You can now enable an “overall” target for targets that track non-transactional events. You can also use this for multiple targets with different tracking KPIs.

**Example:**\
A fitness brand creates the following monthly targets to encourage customer engagement and activity:
Dance for 15 minutes, jog for 30 minutes, and do yoga for 30 minutes daily. Customers who complete all three activities daily receive the “Fit Today” badge. To motivate customers to exceed their goals, the brand includes an Overall Target: stay active for at least 120 minutes per day. Customers who meet the Overall Target receive the “Superfit Today” badge.

To know more, refer to the [Milestones UI](https://docs.capillarytech.com/docs/milestones-new-flow#target-details) and the [Milestones API](https://docs.capillarytech.com/reference/create-unified-targets) documentations.

## Configurable Rounding Methods For Reward Currencies In Advanced Program Settings

You can already set the number of decimal points to round reward values. Now, you can also select a rounding method for Reward Currencies (points and alternate currencies) based on the decimal points configured.

**Example:**\
25.8751 points are to be allocated to a customer and the round-off is set to two decimal places. If the rounding method selected is “Ceiling”, the points are rounded to two decimal places and rounded up to 25.88.

**What’s New:**

* Define a rounding strategy for points and alternate currencies based on your program’s needs.
* Rounding is applied based on the configured decimal places. For example, rounding to two decimal places means rounding to the nearest hundredths.
* The following rounding methods are available: Ceiling, Floor, Round Half Up, Round Half Down, Round Half Even.
* This enhancement gives brands more control over how reward currency balances are handled, ensuring consistency in point calculations.

To know more, refer to the [Reward Currency Rounding Strategy](https://docs.capillarytech.com/docs/points#reward-currency-rounding-strategy) section in the Points documentation.

## Rolling Point Expiry When No Points Are Given

The points rolling feature is an existing feature that extends the expiry window for loyalty points based on conditions set by the brand. By default, the expiry window extends only when a customer earns some points.

**What’s New:**

* You can now enable `ROLLING_EXPIRY_INCLUDE_ZERO_POINTS` to ensure that even when no points are awarded for a customer they are considered for extending the expiry.
* This ensures that valid rolling events—even if they do not award points—still help extend the expiry date of existing points. To enable this feature, raise a ticket to the sustenance team.

To know more, refer to the [Rolling Points Expiry When No Points Are Issued](https://docs.capillarytech.com/docs/points-rolling-expiry#including-zero-points-in-rolling-expiry) section in the Points rolling expiry documentation.

## Event Notification On Creation Or Updation Of A Loyalty Promotion

You can now send an event notification when a new loyalty promotion is created or an existing loyalty promotion is updated.

**What’s New:**

* Two new event notifications `promotionCreated` and `promotionUpdated` are added.
* When a loyalty promotion is created or updated, an event notification is triggered, which notifies the user that the promotion has been created or updated.
* These event notifications are triggered when a loyalty promotion is created or updated using the UI and the create and update loyalty promotion APIs.

To know more, refer to the [Loyalty Promotion](https://docs.capillarytech.com/docs/event-schema-payload#loyalty-promotion) section in the Event Schema documentation.

## New Event Identifier For Event Notifications

The **event schema payload** for various points-related event notifications now includes a new field: **`eventLogId`** – a unique identifier generated when an event is triggered.

The eventLogId lets you look up detailed points activity (like earning, spending, or adjustments) for a specific event using the [Points Ledger Explode API](https://docs.capillarytech.com/reference/get-points-ledger-explode-info). For example, you can track exactly how points were added or removed during a purchase or promotion.

To know more, refer to the [Event Schema Payload](https://docs.capillarytech.com/docs/event-schema-payload#points) documentation.

## Adding Two New Fields In The Return Explode API

The Points Ledger Explode API has two new fields to help you identify bill returns.

**What’s New:**

* When getting details of a bill return, two new fields have been added to the response:
  * `billNumber`: The identifier for the original transaction.
  * `returnBillId`: The identifier for the return transaction.

To know more, refer to the [Points Ledger Explode API](https://docs.capillarytech.com/reference/get-points-ledger-explode-info#response-parameters).

## New API: Manual Tier Adjustments for Customers

A new API has been introduced to manually upgrade, downgrade, renew, or extend a customer’s loyalty tier (slab), including control over tier expiry dates and reassessment rules.

**What’s New:**

* Manually make tier adjustments for a customer:
  * Upgrade or downgrade a customer’s tier.
  * Renew their current tier or extend its expiry date.
* Expiry flexibility: Extend tiers for a fixed duration, to a specific date, or align with your loyalty program’s rules.
* Choose whether the system should automatically reassess tiers during the customer’s next activity.

**Example:**\
A customer wins a special brand giveaway and is upgraded to the VIP tier for 30 days (fixed duration).

To learn more, refer to the [Manual Tier Adjustment](https://docs.capillarytech.com/reference/manual-tier-adjustment) API

## Gifting Tier as an Incentive

The Upgrade to Tier action has a new advanced setting to define expiry rules for upgraded tiers to control how long customers retain their upgraded tier before reverting.

**What’s New:**

* Validity types: Define when an upgraded tier expires:
  * Specific Date: Set a fixed expiry date (e.g., December 31, 2025) for all upgraded tiers.
  * Specific Duration: Set a fixed number of days (e.g., 30 days) after upgrade.
* Expiry flexibility:
  * Manually: Assign the same expiry date/duration for all customers.
  * As per transaction extended field: Dynamically calculate expiry based on transaction data (e.g., purchase date).

**Example:**\
A brand upgrades customers to a VIP Tier with a 30-day duration after a purchase made during a special promotional period. The brand can now define the validity of the tier for the customer and define a specific duration till the customer is reverted to their original tier.

To learn more, refer to the [Upgrade to Tier](https://docs.capillarytech.com/docs/actions#upgrade-to-tier) section in the  Actions documentation.

## New API: Get Promotion Benefit Details

A new API has been introduced to retrieve a consolidated summary of all benefits (points, badges, rewards, and alternate currencies) a customer earned from a specific loyalty promotion.

**What’s New:**

* Fetch details of points, alternate currencies (ACs), rewards, and badges earned by a customer for a loyalty promotion.
* Get benefits for specific promotions by providing the programId and promotionId or promotionIdentifier of the loyalty promotion.

To learn more, refer to the [Get Promotion Benefits for a Customer](https://docs.capillarytech.com/reference/get-promotion-benefits-for-customer) API.

## Central communications engine integration on Loyalty+

Sending loyalty-related communications via WhatsApp and other channels using the Central Communications Engine is now integrated with Loyalty+ workflows.

**What’s New:**

* All communication channels available on Engage+ will now be available on Loyalty+
* Leverage communication channels like WhatsApp, LINE and Zalo to send loyalty-related messages to customers.
* Get reports on communications sent to customers through loyalty programs and loyalty promotions.
* Note: This feature is still in beta and is not available for all users.

To learn more, refer to the [Send Messages](https://docs.capillarytech.com/docs/actions#send-messages) section in the Actions documentation.

## New Issual Restriction for Loyalty Promotions\*\*

Loyalty promotions already let you set limits on the number of times a promotion can be issued to a single customer and redeemed by a customer. Now, you can also restrict the total number of times a promotion is issued across your entire customer base with a new overall limit.

**What’s New:**

* Set a limit on the total number of times a loyalty promotion can be issued to all customers within a brand.
* Note: Leave the field blank to allow unlimited issuals (no capping).

**Example:**\
A brand creates a promotion with a maximum issual limit of 1000. This means the promotion can be issued to customers a total of 1000 times across the entire brand. Once this threshold is reached, the promotion will not be issued to more customers even if they are eligible.

To learn more, refer to the [Advanced Settings](https://docs.capillarytech.com/docs/loyalty-promotions#issual-limit) section in the Loyalty Promotions documentation.

## New Expression to Track Promised Points in Workflows

You can already track points issued to customers after a transaction in workflows. Now, workflows support tracking promised points (non-redeemable points with delayed accrual) for greater flexibility in loyalty campaigns.

**What’s New:**

* A new attribute **promisedPoints** to track total promised points issued for a transaction.
* The attribute has two sub-attributes:
* **promisedPointsForUser:** Tracks promised points issued to an individual user in a transaction.
* **promisedPointsForUserGroup:** Tracks promised points issued to a user group in a transaction.

**Example:**\
Trigger a message when the promised points issued for a transaction is more than 300 points. To track this, use the expression in the loyalty workflows: **currentTxn.promisedPoints>= 300** and create the message action to send a message to the customer.

To learn more, refer to the [current transaction expressions](https://docs.capillarytech.com/docs/profiles#expressions-on-current-transaction-profile-currenttxn) section in the Profiles and attributes documentation.

## New Workflow Action: Convert Promised Alternate Currencies to Redeemable Alternate Currencies

A new workflow action has been introduced to convert promised alternate currencies (e.g., "Gold Coins") to redeemable based on rules specified for transactional updates.

**What’s New:**

* Convert promised alternate currencies to redeemable currencies immediately or after an item’s return period has expired and the customer has not made any returns.
* Notes:
  * This action is supported only for the TransactionUpdate customer activity.
  * Promised alternate currencies do not affect tier upgrades/downgrades until converted to redeemable.

**Example:**\
Reward customers with 50 promised "Travel Miles" after a flight booking. These miles convert to redeemable miles 30 days later if no cancellations occur. If the customer is qualified for a tier upgrade, they are upgraded to a higher tier once the “Travel Miles” are redeemable.

To learn more, refer to the [Promised alternate currency conversion](https://docs.capillarytech.com/docs/actions#promised-alternate-currency-conversion) section in the Actions documentation.

## Month-Based Moving Window Tracking for Workflows

Moving window tracking, which already supports days to track customer activities over a rolling period, now includes months for more flexible reward calculations.

**What’s New:**

* Month-based tracking: Define moving windows using full calendar months (e.g., track activity over 1 or 3 months).
* Windows align with month boundaries from the first day of the month to the last day of the month.
* Track current month: Set the window to 0 months to start from the 1st day of the current month.

**Example:** A tracker rewards 200 bonus points if a customer spends $1,000 in a 1-month window. Purchases on March 10 and April 10 are tracked from March 1–April 30. A purchase on May 1 shifts the window to April 1–May 31, dropping March data.

To learn more, refer to the documentation on [Trackers](https://docs.capillarytech.com/docs/trackers#creating-trackers).

## Points Unlock API Now Supports Alternate Currencies

The Points Unlock API already lets you convert promised points into redeemable points. Now, you can also use this API to convert promised alternate currencies into redeemable alternate currencies.

**What’s New:**

* Convert both promised points and alternate currencies (e.g., gold coins, stamps) to redeemable currencies in a single API call.
* Note: All promised reward currencies (points and alternate currencies) are unlocked simultaneously when using the API.

To learn more, refer to the [Convert Promised Points](https://docs.capillarytech.com/reference/points-unlock-api) (Points Unlock) API documentation.

## Pro-Rate Support for Unified Target Achievement

Pro-rate strategies, already available for single targets, can now be applied to a unified target achievement (target groups with multiple achievable targets) to calculate rewards based on customer progress.

**What’s New:**

* Unified target prorating: Choose from four existing strategies for reward calculation:\
  Defined Target, Achieved Value, Achieved Value Above Defined Target and Qualifying value

**Example:**\
A unified target has two targets: "attend 12 classes" and "burn 10,000 calories." Using “Achieved Value Above Defined Target”, customers earn rewards for exceeding both goals.

To learn more, refer to the [Issue Points](https://docs.capillarytech.com/docs/actions#issue-points) section in the Actions documentation.

# Introducing Dev Console - New Capillary tool built to optimize operations for integration platforms

**Devconsole**, is a robust Capillary tool built to optimize operations for integration platforms. Devconsole consolidates all features previously available in the **APITester** portal, removing the need for separate access and onboarding.

Users can now log in seamlessly via the **Intouch portal**, reducing operational delays.

**Enhanced capabilities include:**

* Tenant-specific log access
* Metrics monitoring
* CI/CD support for Classic extensions
* MongoDB management

Three new access groups are also intriduced in Devconsole to streamline user permissions and enhance functionality:

* **Dev Console External Developer**

  * View access to:

    * Package Manager
    * Platform Metrics
    * Log Viewer
    * DB Audit Logs
    * Extension Configurations
  * Permissions:

    * Execute **read** queries
    * Raise requests for **write** queries and **new config** setups

* **Dev Console External Tech Lead**

  * Includes all Developer permissions
  * Additional capabilities:

    * Build Classic extensions via Package Manager
    * Approve write queries
    * Approve config requests

* **Dev Console Brand POC**

  * Restricted to viewing **Platform Metrics** only

<br />

**Documentation:** <https://docs.capillarytech.com/docs/dev-console#/>