---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# October-November-December 2024

# Engage+

## Liquid for personalization

Creatives now support Liquid, a prominent templating language that allows users to format dynamic content based on tags. With Liquid, users can format strings to capitalize, uppercase, lowercase, etc., or format date, time, and currency. Users can also use conditional logic, such as an if/else condition, to render different content for each customer.

<Image align="center" className="border" border={true} width="60% " src="https://files.readme.io/85776bb9751995abfbdebe80251ce5205f55281cf96263cc325a1f283adca408-image.png" />

You can find more information [here](https://docs.capillarytech.com/docs/liquid-language-in-messages).

## Event context tags on messages

You can now use entry event attributes as tags within messages in journeys. To add these tags, go to messages within a journey, and under Add Label; you will find the Entry Event section, within which there would be specific profiles where you can select an attribute to be used in the message.

Please note that these tags are only visible on journeys when choosing an event as an entry trigger. Also, each entry event would have a dynamic set of tags that would be visible to the user.

<Image align="center" className="border" border={true} width="60% " src="https://files.readme.io/af3d8ad70a7441fe4be2618d507a79289a8a9aaf25e57455d97870b5172e6c45-image.png" />

You can find more information [here](https://docs.capillarytech.com/docs/labels#entry-event).

## Event context on journey blocks

We now have entry event context available at various blocks, such as decision splits and wait blocks. You can use the entry event attributes on your wait steps to wait.

To use this, select Based on entry trigger event in the Wait Type drop-down. You can wait until the Exact Date, a Specific Time Before the Date, or a Specific Time After the Date. Once selected, you can choose the attribute you want to wait on.

<Image align="center" className="border" border={true} width="60% " src="https://files.readme.io/393fe9a9db5ffff4234b916e5ca636750ca00fc21a1cb387813fdac402aa0360-image.png" />

You can find more information [here](https://docs.capillarytech.com/docs/building-blocks-of-a-journey#configuring-event-based-wait-block).

## Enabled Org Tags

We now support organization-level tags that can be used in messages to format or render dynamic content. This is beneficial in the Connected Orgs setup, where the journeys with messages can be created on the parent org, and it can render the tags from child orgs.

Please note that org custom fields can currently be created via an API where you set the value.

Once done, these tags will appear under Organization Custom Fields when you click on Add Label

<Image align="center" className="border" border={true} width="50% " src="https://files.readme.io/be8c45305f73c8f3babc278c2ce6b69cdd20c9422bb3b79f8bb4936caaac8620-image.png" />

You can find more information [here](https://docs.capillarytech.com/docs/add-dynamic-content-using-custom-fields).

## Advanced Journey settings

With this release, we have overhauled Advanced journey settings. We have now introduced three sections:

<Image align="center" className="border" border={true} width="60% " src="https://files.readme.io/197ab987b5e5d2b085e05ba20d3403909459cc7a3901bb39d7d269c522eba77e-image.png" />

### Entry Settings:

This section allows you to set how frequently users can re-enter a journey.

<Image align="center" className="border" border={true} width="60% " src="https://files.readme.io/6474c714b51c92e5983cf3c78642dd5270c43818e4721351cc0c54a0cace95e4-image.png" />

### Communication Settings:

This section currently allows you to override unsubscribe status for sending transactional communication. Note that we don't currently override NDNC status, but this will be available soon.

<Image align="center" className="border" border={true} width="60% " src="https://files.readme.io/b9b0be43b944c435c28760ac31033a3a4ea286d206c70ea0fffab40f356a5f4a-image.png" />

<br />

### Link Tracking Settings:

By default, we have enabled CTA tracking for all messages within journeys. We also provide a setting to enable URL shortening for links used in messages in a journey.

<Image align="center" className="border" border={true} width="60% " src="https://files.readme.io/a53986e4b179a2ecf90ce292b00c0cb8e8bcc4060c4a573365b04c3157777c2a-image.png" />

You can find more information [here](https://docs.capillarytech.com/docs/configure-journey#5-configure-journey-settings).

## New gateway onboarding: ICS for Whatsapp

We have now integrated with ICS for Whatsapp.

## SDK

### iOS

#### Hydra iOS SDK Release [1.5.9](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.5.9)

* Primary CTA Action on Images
  * Added support for executing the primary call-to-action (CTA) when clicking on images in notifications.
* Notification Improvements
  * Multi-line titles are now supported in the notification center for better readability.
  * Badge count display is now conditioned on the user's login status, ensuring badges are only shown for logged-in users.
  * Refined badge handling, including removal of badge count upon user logout.
* Enhanced Notification Handling
  * The notification center now refreshes when a new notification is received in the foreground.
  * Notifications retain their expanded state when a new notification arrives, preserving user context.\
    Improved handling of deep link actions in notification trays.

#### Hydra iOS SDK Release [Version 1.5.8](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.5.8) (October 29, 2024)

* Improvements to notification handling and display

  **Key Updates:**

  * **Shared User Defaults Accessibility:**
    * Updated the shared user defaults to "No Protection," allowing access in the Notification Service Extension even when the device is locked. This ensures notifications are processed and displayed correctly in locked states.

#### Hydra iOS SDK Release [Version 1.5.7](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.5.7) (October 21, 2024)

* Significant updates and enhancements for notification handling and data management

  **Key Updates:**

  * **Notification Sync & Pull:**
    * Added functionality to store and fetch the last sync time for pull message requests.
    * Enhanced the notification database to support updates within sync operations.
    * Established a structured process for pulling undelivered notifications and updated status parsing logic.

  * **Core Data & Database Management:**
    * Executed migrations between non-shared and shared persistent stores, especially for logs and notification data.
    * Enabled log data to be shared across different environments.
    * Applied migration steps using app group identifiers to transition data from non-shared to shared persistent stores.

  * **Notification Event Handling:**
    * Extended `HydraNotificationType` enum with a new type: `NC`.
    * Utilized `HydraNotificationsReceiverProtocol` for receiving undelivered in-app and push notifications.
    * Added logic to refresh the inbox upon user interaction with a notification.

  * **New Domains & Protocols:**
    * Introduced a new domain for the Pull Approach, extending its logic for more efficient notification management.
    * Optimized `NotificationCore+PullApproach.swift` to handle pull requests on a separate serial queue, improving performance and preventing queue blocking.

  * **Miscellaneous Improvements:**
    * Added Codable support to store server configurations in shared user defaults.
    * Refactored and removed redundant code for better readability.
    * Updated `EventScheduler.swift` and `HydraDBFactory.swift` with performance optimizations.
    * Added support for handling notification badge updates on the app icon and reporting DLR (Delivery Receipt) for push notifications.

# Loyalty

## Create sub-targets based on absolute value for milestones

You can now create sub-targets for milestones based on **absolute value** as the achievement criteria.

**How It Works:**

* Define a specific achievement value required to reach the sub-target.
* Example: Achieve ₹5000 in purchases to receive a discount coupon.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/docs/milestones-new-flow#creating-a-sub-target).

## New search API to check the validity of a milestone / streak name

A new API is now available to **check the validity of milestone / streak names**. This API ensures that the name provided for a target group, target, streak, streak level, and period is unique within an organization.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/reference/check-validity-of-milestone-name).

## New request parameters in get points ledger information API.

Several new query parameters have been added to the **Get Points Ledger Information API** to filter and streamline the response.\
The following filters have been added to the API:

* `tillIds`: Get the customer’s ledger information from a list of tills.
* `storeId`: Get the customer’s ledger information from a specific store using a store ID.
* `storeCode`: Get the customer’s ledger information from a specific store using a store code.
* `includeAlternateCurrencies`: Retrieves all [alternate currencies](https://docs.capillarytech.com/docs/alternate-currencies) available with the customer.
* `alternateCurrencyNames`: Filter [alternate currencies](https://docs.capillarytech.com/docs/alternate-currencies) by name by passing a comma-separated list of names.
* `excludePointCategories`: Exclude ledger records for points transactions.

To know more about these new parameters, refer to the documentation [here](https://docs.capillarytech.com/reference/get-ledger-information).

## Create alternate currency based targets using API and UI

You can now create a milestone and track alternate currencies using the **Create Target Group Based on Alternate Currencies** API.  This functionality is also available through the UI, where you can create a target or milestone based on alternate currencies.

**How It Works:**

* Tracks the alternate currencies earned by customers.
* Customers are rewarded upon reaching the target.

To know more about this feature, refer to the API documentation [here](https://docs.capillarytech.com/reference/create-target-based-on-alternate-currencies) and UI documentation [here](https://docs.capillarytech.com/docs/milestones-new-flow#target-details).

## Add limits to alternate currencies

Brands can now limit the alternate currencies they issue to customers, just like they’ve been able to with points. This feature helps maintain control over liability by ensuring that [alternate currencies](https://docs.capillarytech.com/docs/alternate-currencies) are issued only until the set threshold is reached.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/docs/advanced-capping).

## Increased limit for the number of targets for unified targets

The limit for the number of individual targets in unified targets has been increased. You can now add **up to 50 individual targets** when creating a [unified target](https://docs.capillarytech.com/docs/unified-milestones).

## Link milestones or streaks to a loyalty promotion

You can now link specific milestones or streaks to a loyalty promotion when defining customer activity.

**How It Works:**

* When selecting the customer activity for a loyalty promotion, choose **Milestone or Streak is updated**.
* Select the specific milestones or streaks that qualify customers for the promotion.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/docs/loyalty-promotions#to-create-a-promotion-program-do-the-following).

## Deduct alternate currencies from user

The Negative Points Adjustment (Manual Points Adjustment) API now supports deducting alternate currencies from a user, in addition to the existing functionality for points.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/reference/deduct-points-and-alternatecurrencies-from-user).

## Deduct promised points and alternate currencies from users

The Negative Points Adjustment (Manual Points Adjustment) API also supports deducting promised and external points and alternate currencies from a user, in addition to the existing functionality for regular points.

**How It Works:**

* A new request parameter, \*\*`pointCategoryTypes`\*\*has been added to define the type of currency to be deducted.
* You can use this parameter to specify whether you are deducting **regular**, **promised** or **external** points or alternate currencies.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/reference/deduct-points-and-alternatecurrencies-from-user).

## New API to generate expression JSON endpoint

Introducing a new API to generate a JSON representation (expressionJson) for a given logical rule expression.

**How It Works**

* Provide a workflow expression to convert into a JSON expression.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/reference/generate-expression-json-endpoint).

## New API to get customer events associated with a target.

Introducing the Get TrackedTargetEvent API, to fetch customer events associated with a target or streak.

**How It Works:**

* Provide a `userId` (Customer ID) and the `targetRuleId `of the target or streak the customer is enrolled in.
* Fetch data for customer events, including both behavioural and non-behavioural events.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/reference/get-target-events).

## New points rolling expiry strategy

The **Points Rolling Expiry** strategy has been enhanced to provide greater flexibility in managing point expirations.\
A new expiry strategy has been introduced:

* **Add one more rolling window**: If no rolling events occur during the last rolling window, the expiry date is automatically extended by another rolling window.

**How It Works:**

* Points earned by customers remain valid as long as rolling events (e.g., transactions or redemptions) occur.
* With the new update, the expiry date is extended if no rolling events occur, giving customers more opportunities to use their points.

To know more about this feature, refer to the documentation [here](https://docs.capillarytech.com/docs/points-rolling-expiry).

# Incentives

## Optimize your rewards budget & catalog inventory

With recent changes in reward restrictions, you can now lay down the below limits for the rewards:

* Maximum value that a single customer can snag during the reward for reward types like miles or gift cards
* Maximum value that can be snatched up by all your amazing customers combined for reward types like miles or gift cards

This new update allows for more equal opportunities for customers to avail benefits while also optimizing spending at the reward level.

Refer to the documentation [here](https://docs.capillarytech.com/reference/redemption-value).

## Enhancements in getPurchasedRewards API

The Get Purchased Rewards for User API now supports additional query parameters to enable advanced filtering. These new filters provide greater flexibility in retrieving rewards data based on categories, vendors, group names, reward types, and purchase date ranges. This helps brands to better manage and display purchased rewards.

For more information, refer to the documentation [here](https://docs.capillarytech.com/reference/get-rewards-for-user-new-api#request-query-parameters).

## Idempotency check in issue reward

​​When issuing rewards in bulk via EMF, retries due to circumstances such as partial failures (e.g, due to processing delays) resulted in duplicate issuance of rewards. To address this issue, an Idempotency check has been introduced during the reward issuance process.

With this enhancement:

* Repeated requests will no longer result in duplicate issuance of rewards.
* A new parameter, requestId, has been added to the Issue Reward API.
* The requestId ensures that each request is uniquely identified and processed only once, even if the request is retried.

For more information, refer to the documentation [here](https://docs.capillarytech.com/reference/idempotency-check-for-issuing-reward).

## Allow Multiple Coupon Codes for a Single User in a File Upload

The system now supports the ability to assign multiple coupon codes to a single customer within the same offer or coupon series in a single file upload. This enhancement eliminates the need for uploading multiple files to manage multiple coupon codes for the same customer.

<Image align="center" src="https://files.readme.io/0dbee116b6a57e6556a46ae77f6c2b5700817e5719bf5c2249ac74f2dc9bf9e4-image2.png" />

Refer to the documentation [here](https://docs.capillarytech.com/docs/manage-coupons#issue-multiple-coupon-codes-to-a-customer).

## Issue Multiple Coupons from Loyalty workflows and Loyalty promotions on an event

You can now issue multiple coupons directly from Loyalty Workflows and Loyalty Promotions. This functionality lets you issue coupons either in fixed quantities or based on specific transaction events, offering more flexibility for rewards.

Fixed Quantity Coupon Issuance : Issue a pre-determined number of coupons either uniformly across all tiers or uniquely for each tier.

<Image align="center" className="border" border={true} src="https://files.readme.io/a1219f41812c6a36c48453e18db6e7d987155c31f407357bddfa1943834bb2c7-image1.gif" />

Refer to the documentation [here](https://docs.capillarytech.com/docs/actions#issue-coupon).

## Card Series and Customer Labels based Personalization for Rewards

Brands can now create and display rewards based on card series and customer labels, in addition to loyalty program tiers, supplementary programs and customer segments.

* Personalized Experience: Offers tailored rewards to specific card series and customer labels, increasing relevance and engagement.
* Streamlined Catalog: Reduces clutter by showing only relevant rewards, enhancing user experience.\
  Better ROI: Focuses marketing efforts on targeted customers for improved results.

**Use cases:**

Sarah holds a "Platinum Visa" credit card. When she browses the rewards catalog, she sees exclusive rewards curated for Platinum Visa cardholders, ensuring a personalized and relevant experience.\
John has a "Health Enthusiast" label based on his preferences. When he browses the rewards catalog, he sees exclusive wellness rewards like gym memberships and organic supplements, ensuring a personalized and relevant experience.

**Refer to the documentation[here](https://docs.capillarytech.com/docs/personalizing-the-catalog-with-program-tier-scope)**.

## Event notifications for rewards catalog

A new event notification is available now that enables sending notifications whenever a reward transaction (ex: change in custom fields associated with transaction or fulfilment status) is updated.

**Use case:**\
Emma redeems a designer backpack from the rewards catalog with 5000 loyalty points. When the fulfillment status for the reward updates to "Shipped," she receives a notification with tracking details, keeping her informed about the delivery.

**Refer to the documentation[here](https://docs.capillarytech.com/docs/event-schema-payload#update-reward-transaction-updaterewardtransaction)**.

## Reward APIs for Connected orgs

A new set of APIs for the Rewards Catalog is now available, allowing you to issue rewards and retrieve details associated with a reward for a specific org, parent and child orgs, or all connected orgs.

**Refer to the API Docs[here](https://docs.capillarytech.com/reference/get-all-available-rewards-for-user-in-a-connected-org)**.

## Enhancements in Customer’s Rewards API

The API now supports **advanced filtering** (by category, group, reward type, vendor, points, cash, status etc) and **sorting** (by points, cash, reward rank, expiry date and more) for customer rewards. These updates improve flexibility in managing and displaying rewards.

**Refer to the documentation[here](https://docs.capillarytech.com/reference/get-rewards-for-user).**

# Insights+

## Automated creation of Audience Filters for Behavioral Events

In the previous quarter, we automated the onboarding of behavioral events into the Insights database as soon as the data was pushed. With the growing volume of behavioral events, creating audience filters for each event became time-consuming for analysts. To address this, we have automated the creation of audience filters based on these events, significantly reducing manual effort and enabling new ways to segment users.

### How it works

Now, as soon as a behavioral event is created and its data is available in Insights, an audience filter is available for segregating users. These filters can be used to create audience groups (through Engage) for sending bulk communications and filtering the reports in Insights, based on event attributes, including segmentation based on the number of times an event was performed by a user.\
For example, if a new behavioral event is onboarded that tracks user steps and device type used for capturing the activity (e.g., Mobile/Smart Watch), then the brand managers can create an audience group such as: "Users who have walked more than 500 steps in the last week and used Mobile devices for capturing the activity."

**Refer to the documentation[here](https://docs.capillarytech.com/docs/audience-group-filters#behavioral-event-based-filters).**

## Masking PSI data in Databricks

Currently, critical PII information is masked in Databricks when enabled. However, certain data points, when combined, may still pose a security risk by revealing sensitive user information. This enhancement allows Admins to control the masking of PSI (Potentially Sensitive Information) fields at the org level within the analytics database.

### How it works

When data masking is enabled for a brand, PSI fields (including custom and extended fields) in the Analytics database (i.e., read\_api tables) will be masked, appearing as a string of asterisks (“\*”).\
Users can stop or pause masking with the necessary approvals from the brand, by raising a Jira ticket to the product support team.
For jobs requiring access to the PSI data, it must be run on the admin\_read\_api tables, which can be accessible to selected Databricks users only.

**Refer to the documentation[here](https://docs.capillarytech.com/docs/mask-data-in-databricks#psi-data-masking).**

## Running Databricks jobs automatically after ETL completion

We have introduced an enhancement to the Databricks notebook scheduling process. Previously, notebooks were set to run at a fixed time using a scheduler. However, if the ETL process was not completed by the scheduled time, the notebook would either run with outdated data or fail.

To address this limitation, we’ve implemented an automated solution that removes the need for a fixed schedule. Now, Databricks notebooks will automatically execute once the ETL process is completed, ensuring they always run with the most up-to-date data.

### How it works

To enable this feature, users need to raise a task ticket to the product support team. After the ticket is submitted, the team will grant the necessary permissions. Once the permissions are provided, Databricks users can link the notebooks in both sequential and parallel formats, ensuring they run automatically after the ETL process is completed.

**Refer to the documentation[here](https://docs.capillarytech.com/docs/automated-notebook-execution-based-on-etl-completion).**

# Neo Extension

## Introducing Block Library for Streamlined Dataflows

A common challenge in creating dataflows is the need to replicate blocks with similar configurations across multiple dataflows. This approach often leads to duplication and increases the risk of misconfiguration due to manual copy-pasting.

The Block Library addresses this by enabling you to create reusable, standardized blocks that can be utilized across dataflows (or rules) without reconfiguring them each time. For more info, refer to the doc [here]().

## Log Level Header Support in Neo

We’ve introduced new log level headers for Platform and Neo services, providing granular control over logging per request.

**New headers available:**

* `x-cap-neo-block-log-level`: Set log levels (`debug`, `info`, `warn`, `error`) for Neo services.
* `x-cap-neo-debug-enabled`: Enable platform debug logs by setting this to `true`.

This enhancement increases flexibility in monitoring API requests, improving security and log visibility.

**Upcoming Feature: Organization-Wide Debug Mode**

A new feature is coming soon that allows organizations to enable debug mode for both Platform and Neo services for a predefined period. During this time, all requests will automatically include log level and debug headers — enabling better observability and easier troubleshooting.

**Documentation:** <https://docs.capillarytech.com/docs/api-request-block#/header-management-in-neo>

***

## Tenant-Specific Metrics Dashboard for Neo & Extension Platform on Dev Console (APITester)

We’ve launched a **Metrics Dashboard** for Neo and the Extension Platform, providing:

* **Performance Metrics**: Detailed insight into Neo and Extension service performance.
* **Tenant-Specific Metrics**: Granular observability for individual users or organizations.
* **Downstream Capillary Platform Metrics**: Integrated data from the Capillary platform for complete system health visibility.

This dashboard gives users full control over monitoring, enabling faster identification of performance issues and bottlenecks.

**Upcoming Enhancement: Drill-Down Capabilities**

Soon, you’ll be able to:

* Drill down from high-level metrics to detailed API performance data.
* Track slow APIs or high error rates and gain visibility into request IDs.
* Perform request-level debugging by drilling into logs for faster resolution.

**Documentation:** <https://docs.capillarytech.com/docs/neo-debugging-extension#/>

***

## Header Management in Neo

Neo now classifies headers into the following categories:

* **Default Headers**: Automatically applied to all API calls.

  * Examples: `Content-Type`, `Accept-Encoding`, `User-Agent`

* **Immutable Headers**: Cannot be modified in downstream calls. These ensure internal security.

  * Examples: `Authorization`, `x-cap-api-auth-key`

* **Mutable Headers**: Can be overridden on a per-request basis for flexibility.

  * Examples: `x-cap-neo-block-log-level`, `x-cap-neo-debug-enabled`

**Documentation:** <https://docs.capillarytech.com/docs/api-request-block#/header-management-in-neo>

## Cross-Org Dataflow Lookup

* Execute dataflows from the **Global Organization** across any organization.
* **Parent organization** dataflows are accessible to both parent and child orgs, maintaining execution integrity.
* **Note**: Dataflows in **child organizations cannot be executed** by parent organizations.

**Documentation:** <https://docs.capillarytech.com/docs/execution-monitoring#/executing-a-cross-organizational-dataflow>

## View Dataflows Across Organizations

* **Read-Only Access**: View dataflows and rules from **Global** and **Parent** Organizations without switching context.
* **Operational Insights**: Gain visibility into cross-org workflows for reference and improved collaboration.

**Documentation:** <https://docs.capillarytech.com/docs/viewing-dataflow-list#/view-dataflows-across-organizations-in-connected-organization>

## Copy cURL Feature for API Testing

* Quickly copy cURL commands for **B2B** and **B2C** API testing.
* Supports tools like Postman.
* Includes key headers:

  * `x-cap-neo-test-variant-id` — for non-live rule versions
  * `x-cap-neo-dag-scope` — for Parent or Global Organization dataflows

**Documentation:** <https://docs.capillarytech.com/docs/execution-monitoring#/copying-a-dataflow-curl>