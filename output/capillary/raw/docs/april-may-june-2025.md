---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# April - May - June 2025

# Incentives

**Enhance your reward catalog app experience with these customer-facing API enhancements.**

***

## Sort by Start Date or End Date

Customers can now filter rewards based on **expiry date** and **launch date** while navigating the rewards catalog, making it easier to find newly launched or soon-to-expire rewards.

<img src="https://files.readme.io/b5b18b40ebb96a32beefd197cefac6d459118ca8a4ea919243c6317bd798017d-image3.png" alt="Date Sorting Filters" width="150" />

For more details, please refer to the documentation [here.](https://docs.capillarytech.com/reference/get-rewards-for-user)

***

## Multi-Status Reward Filtering

* Now you can filter rewards based on specific statuses like **LIVE, ENDED, UPCOMING**, or any combination—giving you complete control over what’s displayed. Previously, **LIVE** and **UPCOMING** rewards were returned by default.
* This enhancement lets you easily power pages that highlight "LIVE" rewards, spotlight "UPCOMING" offers, or create a seamless experience combining both—without any extra filtering.

For more details, please refer to the documentation [here](https://docs.capillarytech.com/reference/get-rewards-for-user).

***

## Reward Grouping Enhancement: Filtering by Reward ID

* Rewards can now group all transactions under the same reward ID for Sweepstakes and Auction rewards, where users can make multiple entries.
* This enhancement ensures that when customers participate multiple times in sweepstakes or auctions, they see only one clear reward listing—no matter how many times they’ve entered. This enables customers to easily track their participation without repeated listings.

For more details, please refer to the documentation [here.](https://docs.capillarytech.com/reference/get-rewards-for-user-new-api)

***

## Event Notification Support for V2 Bulk Coupon Redemption API

We have enhanced the V2 single and Bulk Coupon Redemption API's to trigger the EMF event (e.g- voucherRedemption) for a single-coupon redemption request.When you redeem multiple coupons in one call, EMF is not triggered.

<img src="https://files.readme.io/085a02559e41c9c29f4c7968bdbd8ea4efd99be055e474868e413a501361670b-image2.png" alt="Bulk Coupon Redemption" width="600" />

**Previously:**
The V2 Redemption API endpoint did not trigger EMF

event after redemption. Users had to revert to the V1 API to trigger those EMF events.

**Impact:**
Brands can now migrate fully to the modern V2 API enjoying improved performance while retaining real-time SMS or workflow notifications for every single-coupon redemption, and without impacting bulk operations.

For more details, please refer to the documentation [here.](https://docs.capillarytech.com/reference/redeem-bulk-coupons)

<br />

## Preserve Original Coupon Code Casing in Rewards Catalog

GET calls in Rewards Catalog API now return coupon codes exactly as created in reward catalog, preserving their original casing.
Earlier, the system converted all codes to uppercase, which caused issues on platforms that required case-sensitive validation. Now, it returns codes like a5dD9Yx, SAVE20, or PromoCode123 exactly as issued—without any changes.

For more details, refer [here](https://docs.capillarytech.com/update/reference/get-reward-issue-transaction-details#/)

## Smarter Vendor Discovery in Rewards Catalog

Customers can now easily explore more offers from the same brand—right from the listing pages. The rewards catalog now shows vendor details, making it simpler to discover related rewards and engage deeper with your brand.

<Image align="center" width="30% " src="https://files.readme.io/4ccf7c39e06a03463d6245ae853ad2486497fe881bd2f7836344694dd9760d66-image1.png" />

<br />

<br />

**Why this matters?**

This update improves visibility for all offers from a vendor, higher conversion rates, and more efficient use of catalog space.

**How this is achieved?**

Now we show vendorId and redemptionType in listing APIs, making it easier for brands to display their offers right from the catalog view.

This is achieved by displaying the vendor ID and redemption type in the listing APIs.
Vendor ID in the listing APIs lets you group rewards by vendor, making it easier for customers to browse all offers from the same vendor.

Redemption type helps filter or label rewards based on how they can be claimed—whether they're INTOUCH\_REWARD, PHYSICAL\_REWARD, or others—giving customers clearer choices and boosting engagement.

For more details, [refer here.](https://docs.capillarytech.com/reference/get-rewards-for-user#/)

# Engage+

## Mobile SDK

### Hydra iOS SDK release 1.6.4

* Resolved the crash happening in HydraPushNotification due to tightly coupled dependency of the HydraCore instance.

### Android SDK release (1.9.2)

This release includes a resolution of following bug fixes

* ConcurrentModificationException in initilization of SDK There was a crash encountered whilw sdk is initialized, this build fixes this issue
* Fix for push notification click issue on react native
* New api to support inapp message on launch on flutter

**Updated Dependencies**

hydra-core: 1.8.0
hydra-pushbase: 1.9.0
hydra-firebase-push: 1.9.0
hydra-richnotification: 1.5.0
hydra-mi-pushkit: 1.5.0
hydra-inbox-core: 1.6.0
hydra-inbox-ui: 1.6.0
hydra-inapp: 1.5.0

### Android SDK release (1.9.4)

This release includes a resolution of following bugs

* Downgraded kotlin version to support backward compatibilty for clients
* Added delay in push module to allow the push functionality work once the HydraApi is initialized
* New api to support adding console logs before the hydra api is initialized

**Updated Dependencies**

hydra-core: 1.8.2
hydra-pushbase: 1.9.2
hydra-firebase-push: 1.9.2
hydra-richnotification: 1.5.2
hydra-mi-pushkit: 1.5.2
hydra-inbox-core: 1.6.2
hydra-inbox-ui: 1.6.2
hydra-inapp: 1.5.2

### Android SDK release (1.9.4)

This release includes a resolution of small bug fixes

* Fixing remote logging functionality in case of early logger init

**Updated Dependencies**

hydra-core: 1.8.5
hydra-pushbase: 1.9.5
hydra-firebase-push: 1.9.5
hydra-richnotification: 1.5.5
hydra-mi-pushkit: 1.5.5
hydra-inbox-core: 1.6.5
hydra-inbox-ui: 1.6.5
hydra-inapp: 1.5.5

### Android SDK release (1.9.9)

This is a minor release which includes a resolution of small bug fixes

* Inapp scroll issue for pop up view
* Sign up fix in sample app
* Removing phone no validation from hydra's sign up api

**Updated Dependencies**

hydra-core: 1.8.7
hydra-pushbase: 1.9.7
hydra-firebase-push: 1.9.7
hydra-richnotification: 1.5.7
hydra-mi-pushkit: 1.5.7
hydra-inbox-core: 1.6.7
hydra-inbox-ui: 1.6.7
hydra-inapp: 1.5.7

## Track Campaign Performance with Conversion Goals

You can measure the impact of your campaigns by tracking customer actions. The new Conversion Goal feature in Engage+ helps you understand how well your messages reach customers, allowing you to refine your messaging and targeting for better results for a specific campaign.

For example, a retail brand running a Black Friday Sale can set a conversion goal to track how many customers make a purchase of over $300 after receiving the campaign message. You can set the tracking period for 22 days after the message is delivered and count the last message interaction as the conversion source. This helps you measure the campaign’s impact on real customer behavior.

<Image align="center" className="border" border={true} src="https://files.readme.io/0d213fe8158195ce074995bbf000d2cdce4c0a138698cb29d58cbe679e4388c4-Screenshot_2025-07-01_at_11.49.40_AM.png" />

For more information, please refer to the documentation [here](https://docs.capillarytech.com/docs/broadcast-campaign#/tracking-campaign-performance-based-on-conversion-goals).

# Customer Data Platform

## Using multiple identifiers in GET calls

You can now send multiple identifiers in API requests where the customer identifier is used. The system detects the primary identifier automatically and fetches the correct customer profile, even when secondary identifiers overlap. This is applicable only for orgs where the **Dual Eligibility** feature is enabled. For details refer to [Get Customer Details](https://docs.capillarytech.com/reference/get-customer-details#/). As part of the changes other API endpoints like [Get Customer ID](https://docs.capillarytech.com/reference/get-customer-id), [Get Subscription Details](https://docs.capillarytech.com/reference/get-subscription-details) also have been modified.

## Subscription message language configuration

You can now control the language of email subscription success or failure messages using the `CONF_ORG_SUBSCRIPTION_UPDATE_MSG` config. The system prioritises the request's language code, then the config's default language, and defaults to English if neither is set. For details refer to [Subscription Message Language Configuration](https://docs.capillarytech.com/docs/subscription_management#/subscription-message-language-configuration).

## Skipping custom and extended fields during customer merge

Use `CONF_SKIP_MERGE_HANDLER` to skip merging custom or extended fields during a customer merge. Control overwriting of conflicting extended fields using `CONF_CUSTOMER_MERGE_OVERWRITE_EXTENDED_FIELD_VALUE`. Raise a ticket to enable either config. For more information refer to [Skipping custom and extended fields during customer merge](https://docs.capillarytech.com/docs/manage-change-request#/skipping-custom-and-extended-fields-during-customer-merge).

## Viber interactions in customer API

You can now retrieve Viber messages using the Get Customer Interactions v2 API. The response includes message ID, sent and delivery timestamps, status, sender name, and message content. Use `viber` as the network or type filter. See [Get Customer Interactions](https://docs.capillarytech.com/reference/v2get-customer-interactions#/) for more details.

## MOD10 check digit support for external ID generation

You can now use the MOD10 (Luhn’s algorithm) for generating a checksum digit in external IDs. Set `CONF_CARD_CHECKSUM_DIGIT_ALGO` to `LUHN_ALGO` when enabling external ID generation. Raise a JIRA ticket to activate the required configurations. For details refer [External ID configuration](https://docs.capillarytech.com/docs/customer_entity#/external-id-configuration).

## Exact match support for event attribute filters

Use the new `allowExactMatch` parameter in the Event Search API to control how event attributes are matched. Set it to `true` for exact matches, useful for values with special characters. Leave it to `false` (default) for flexible, partial matching. To see how to use it, refer to [Search event](https://docs.capillarytech.com/reference/search-events#/).

## Organisation switcher in Org Settings

Users with access to multiple organisations can now switch between orgs directly from the Org Settings page using the new dropdown.

## Copy cURL support for Search API

You can now use the Copy cURL feature in the Search Filter UI to quickly use Search API requests. Once a filter is active, copy the generated cURL and run it in your preferred API testing tool. To see how it is done, refer to [Copy cURL](https://docs.capillarytech.com/docs/performing-search-#/using-the-copy-curl-feature).

## Enhanced multi-organisation user management

Admins and Org owners can now manage proxy user permissions, assign roles, and onboard users across organisations without Capillary backend support. You can also view, filter, and set profile preferences for multi-org users directly in the new user management UI, streamlining cross-org access and control. For more information, refer to [Managing Permission for Users in Multiple Organizations](https://docs.capillarytech.com/docs/managing-permission-for-users-in-multiple-orgs#/managing-multi-organization-users-in-the-old-user-management).

## Connect+

### SSH Authentication Support

Connect+ now supports SSH encryption for SFTP transfers in addition to PGP. Brands can securely transfer input files using widely adopted SSH encryption, improving compatibility and operational efficiency.

For more details, refer to the documentation [here](https://docs.capillarytech.com/docs/connect-to-source#/).

### Connect+ Migration to Intouch

Connect+ is now fully\* integrated into Intouch. Users can access it with Intouch credentials, similar to Loyalty and Engage, eliminating the need for separate authentication and privilege management. This simplifies access, reduces administrative effort, and aligns Connect+ with other Intouch products.

\*Migration for EU is completed, and rollouts for other regions will be completed by next week.

For more details, refer to the documentation [here](https://docs.capillarytech.com/docs/connectplus_getting_started#/).

### Connect+ Data Validation Block

A new Databricks validation block allows brands to clean, process, and manipulate incoming data before sending it to other Connect+ blocks. This ensures only clean, structured, and reliable data flows through pipelines, reducing errors and manual fixes. Customers experience accurate balances, error-free rewards, and smoother digital interactions that build trust in the brand.

For more details, refer to the documentation [here](https://docs.capillarytech.com/docs/data-validation-block#/).

# Neo Extension

## Improvements Implemented

* **Graceful Error Handling**: The system now continues processing all API calls in a block, even if one or more calls fail.
* **Preserved Responses**: The `getOut()` function now returns outputs for **all** API calls—both successful and failed—so no data is lost.
* **Consistent Status Reporting**: If any call fails, the block status is marked as `"failed"`, but all responses (including error details) are retained for debugging or partial processing.

## Aira Coder

Neo’s Aira Coder is a powerful new addition to the Neo Extensions platform that leverages natural language input to:

* Create new workflows (a.k.a. dataflows)
* Modify existing workflows
* Answer queries related to the Neo platform
* Explain workflows in plain English, block by block

For more information, refer to the doc [here](https://docs.capillarytech.com/docs/ai-neo-dataflow#/).

## Reusing Logic in Script Blocks

Define reusable logic or functions inside Script Blocks using `executeBlock` and `getFunctionArguments`. This allows centralized logic management, reduces duplication, and improves maintainability across workflows.

* [📘 Reusing Logic in Script Block](https://docs.capillarytech.com/docs/script-block#/using-script-block-to-define-reusable-logic)
* [📘 executeBlock](https://docs.capillarytech.com/docs/neo-dao-functions#/executeblock)
* [📘 getFunctionArguments](https://docs.capillarytech.com/docs/neo-dao-functions#/)

## Path Parameters in Triggers

Triggers now support path parameters (e.g., `/user/:customerId`), enabling dynamic routing and more RESTful APIs. Access path values within workflows for flexible request handling.

* [📘 Adding Path Parameters in Triggers](https://docs.capillarytech.com/docs/trigger#/)

## Private APIs

Create lightweight, internal GET APIs for specific data needs without modifying standard APIs. Choose between Local (org-specific), Global (shared), or Public exposure options. Neo acts as the orchestration layer.

* [📘 Private APIs](https://docs.capillarytech.com/reference/private-apis#/)

## Cache Manager Block

Use the Cache Manager block to interact with systems like Redis—get/set values, manage distributed locks, and improve performance through caching within Neo dataflows.

* [📘 Cache Manager Block](https://docs.capillarytech.com/docs/cachemanager-executor#/)

## Internal Dataflow Optimisation

Neo API now supports in-memory execution for nested DAG calls within the same instance. This removes http overhead & results in faster performance for internal Neo calls, lower resource usage, and improved reliability—no configuration changes needed.

## Auto-complete in Script Blocks

Script Blocks now feature smart auto-complete for functions, variables, and syntax. This improves speed, accuracy, and ease of scripting.

* [📘 Auto-complete in Script Block](https://docs.capillarytech.com/docs/script-block#/configuring-script-block)

## Auto-complete in Relations

Auto-complete is now available in relation configurations, making it easier to connect fields and entities accurately and efficiently.

* [📘 Auto-complete in Relations](https://docs.capillarytech.com/docs/configuring-relations#/)

## Copying Blocks in Dataflow

You can now copy and paste blocks (with configurations) across the same or different dataflows within your org, or into the block library. Just rename and reconnect as needed.

* [📘 Copying a Block in Dataflow](https://docs.capillarytech.com/docs/editing-a-dataflow#/copying-a-block)

***

## DAO Enhancements

* **New`getBlockHeaders`** function added to extract response headers of an API response from the API Block.
* **`xCapApiVersion`** introduced for version tracking, with planned support for performance comparisons and alerts.
* **Custom headers`xCapCustomEntity` and `xCapCustomMessage`** enable advanced debugging via Developer Console search and attribution. These headers are tracked in Dev Console to help attribute custom property tracking.

# Loyalty

## Loyalty promotions API updates

You can now view the maximum times a promotion can be issued across a customer's limit via the Loyalty Promotion GET APIs. This limit indicates the number of times a promotion can be issued across all customers within your brand.

To learn more, refer to the [Get promotion by Id](https://docs.capillarytech.com/reference/get-promotion-by-id), [Get details of all promotions](https://docs.capillarytech.com/reference/get-promotion-details) and [Get promotion data](https://docs.capillarytech.com/reference/get-promotion-data-new)
API documentation.

## Deliver Loyalty+ updates via WhatsApp, LINE, and more using a new action

The existing Send messages allows you to send loyalty-related notifications, such as "points redeemed successfully" or "points expiring soon," directly to customers through email and SMS. Using the new Send communication action, you can send loyalty notifications to more messaging channels such as WhatsApp, LINE, and Zalo and get reports of message delivery and engagement.

This seamless integration allows you to deliver timely, relevant updates to customers on channels they actively use.

<Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/929c9b56fa68d7fad627bf4bfb165843d07e00ab480d82e5123e4ffac4de33e2-Loyalty_Release_Notes.png" />

To learn more, refer to the [Send communication](https://docs.capillarytech.com/docs/actions#send-communication) section under the Actions document.

## Include promotions when creating reward currency limits

You can now precisely manage how reward currency limits impact loyalty promotions.  In addition to the existing filtering feature to exclude loyalty promotions from reward currency limits, you can now define whether specific loyalty promotions are included, excluded, or include all active loyalty promotions in the reward currency limit.. This feature provides greater flexibility in determining how your customers earn points from various loyalty promotions.

Example:
BrewLabs, a coffee shop, wants to set a monthly 500-point limit for customers. They have three loyalty promotions: "Double Points Tuesdays," "Birthday Bonus," and "Refer-a-Friend Bonus".

* All: A customer can earn a maximum of 500 points per month across all combined loyalty promotions.
* Include: If "Double Points Tuesdays" and "Refer-a-Friend Bonus" are included, the 500-point cap applies only to these two promotions. Points from the "Birthday Bonus" are unlimited and do not count toward the cap.
* Exclude: If "Birthday Bonus" is excluded, points from this promotion are exempt from the cap. All other promotions (Double Points Tuesdays + Refer-a-Friend) share the 500-point limit.

Note: You can either include or exclude loyalty promotions, but you cannot do both simultaneously.

<Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/d518e9d7b454f2b1d5e37d0476a5011d3c3da236ffc07196ac6306969a34ff6e-image.png" />

To learn more, refer to the “Promotions” field in the table under [Creating a Points / Alternate Currency Allocation Limit](https://docs.capillarytech.com/docs/advanced-capping#creating-a-points--alternate-currency-allocation-limit).

## New user group and card expression on Loyalty+ workflows

You can now use expressions for user groups and cards in the Workflows section of Loyalty+. Use these expressions to track loyalty events for both user groups and customer loyalty cards.
For details on the syntax and usage, see the documentation for [Current User Group](https://docs.capillarytech.com/docs/profile-current-user-group#/) and [Current Card](https://docs.capillarytech.com/docs/profile-current-card#/).

## Include points custom fields in the issue catalog reward action

You can now include custom metadata for points when issuing a catalog reward. Use this field to store the total points a customer has earned till the issual of the catalog reward.

To learn more, refer to the “Points” field in the mapping type table under [Issue Catalog Reward](https://docs.capillarytech.com/docs/actions#/issue-catalog-reward).

## Check if a user has opted in for a communication channel.

You can use the new expression to check if a customer is part of a communication channel in the Workflows section of Loyalty+. Using this, you can filter and send loyalty-related communications only to customers who are subscribed to a particular channel.

<Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/98a1ac6987239b99c63f199b3838c95df458c5b35a84d715bd651e8cfb2bc72b-image.png" />

For more information on the syntax and usage, refer to the documentation on [Customer Subscription Statuses](https://docs.capillarytech.com/docs/customer-subscription-status).

## Custom fields support in the points redemption API

The points redemption API now supports custom fields. You can use these custom fields to include custom, additional metadata related to the points redemption. These custom fields are also available when viewing point redemption details using the Get Points Ledger Explode API.

For more information, refer to the [Update Redeem Points API](https://docs.capillarytech.com/reference/update-redeem-points#/) and [Get Points Ledger Explode Info](https://docs.capillarytech.com/reference/get-points-ledger-explode-info#/) API documentation.

## New API to update the expiry of points for a customer

You can now use the Update Currency Expiry API to manually update when points earned by a customer will expire. This allows you to schedule the points to expire on a specific date, after a certain number of days, months, or immediately.

For more information, refer to the [Update Currency Expiry API](https://docs.capillarytech.com/reference/update-points-expiry#/) documentation.

## New API to manually allocate reward currency

You can use the Issue reward currency API to manually allocate reward currency (points or alternate currency) for up to ten customers or user groups.

For more information, refer to the [Issue Reward Currency API](https://docs.capillarytech.com/reference/bulkmanualcurrencyallocation#/) documentation.

## Viewing reward currency earn, redemption, expiry and return condition IDs.

You can now view the earn, redemption, expiry and return condition IDs defined for a loyalty program. To view the ID on the UI, hover over a condition to view the ID.

<Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/9c1a6b7d6ce0164cce2193da6fd0fbe3c2ee8aa2ac88d409f0c90c85f6a48ef2-image.png" />

For more information, refer to the [Viewing conditions configured for points](https://docs.capillarytech.com/docs/points#/viewing-conditions-configured-for-points) section in the Points documentation.

# Insights

## Embedded Power BI Dashboards in Insights

Power BI dashboards can now be viewed in the Insights environment, allowing brands to access interactive, visually rich reports without switching platforms. Data separation is ensured for security, and users can apply filters, sort data, view dashboards in full-screen mode, download chart content in Excel, and copy charts directly. This enhancement supports advanced reporting needs, including complex KPIs and custom field-based metrics, making data exploration more centralized and efficient.

For more details on how to view the Power BI reports, refer to the documentation [here](https://docs.capillarytech.com/docs/power-bi-dashboards-integration-into-intouch#/).