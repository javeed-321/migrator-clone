---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# July-August-September 2024

# Loyalty+

## Leaderboards for Milestones

A new feature to gamify [milestones](https://docs.capillarytech.com/docs/milestones-new-flow). Leaderboards provide a high-score list where customers are ranked based on their progress towards a milestone. Brand can enable leaderboards for existing milestones or create new leaderboard-enabled milestones.

To enable leaderboards for a milestone refer to the [leaderboards documentation](https://docs.capillarytech.com/reference/leaderboards).

### APIs for leaderboards

1. **Get top ranked users:** Get a ranked list of users who have achieved a target within a timeframe.
2. **Get user rank across target groups**: Get a user’s rankings in all enrolled targets within a timeframe.

Refer to the documentation on the [get top ranked users](https://docs.capillarytech.com/reference/get-top-ranked-users) API and the [get user rank across target groups](https://docs.capillarytech.com/reference/get-user-ranks-across-target-groups) API.

## User Created Challenges

A new feature for [milestones](https://docs.capillarytech.com/docs/milestones-new-flow) that lets users create a challenge for themselves and earn rewards for completing them. Existing milestone APIs have been updated to support this feature.

To know more, refer to the documentation on [user created challenges](https://docs.capillarytech.com/reference/user-created-challenges).

## Connected Organisations Milestone APIs

Connected Organisations (Connected Orgs) represent an enhanced version of the Org Unit concept, designed with data segregation and security in consideration. In this model, each business unit is structured as a separate organisation, connected to one common organisation, which itself functions as an independent entity.

To know more about the Milestone APIs that supports connected orgs, refer to the documentation [here](https://docs.capillarytech.com/reference/connected-org-apis).

## Tier Enhancements

With the latest tier enhancements, brands now will be able to implement the following use cases in both tier upgrades & tier renewals.

1. ANY (N-1)
2. ALL N
3. Custom conditions

To know more about this, refer [tier-upgrades](https://docs.capillarytech.com/docs/tier-upgrade#creating-upgrade-criteria) & [tier-renewals](https://docs.capillarytech.com/docs/tier-downgrade-renewal#creating-dynamic-renewal-criteria).

## Enhancements to Advanced Capping

Enhancements to the advanced settings for capping loyalty points.

1. Configuration page for advanced capping is moved to the **Advanced settings** of the loyalty program.
2. Support for all types of [customer activities](https://docs.capillarytech.com/docs/activities).
3. Limit for individual customer limits increased to 50.
4. Choose the customer segment (audience) when creating a limit for individual customers.

To know more, refer to the documentation on [advanced capping](https://docs.capillarytech.com/docs/advanced-capping).

## Enhancements to Ledger Explode API

Enhancements to the get points ledger explode info API.

1. Addition of two new query parameters: `eventName` and `eventReferenceIds`.
2. Support for behavioral events.

To know more, refer to the documentation on [Get Points Ledger Explode info](https://docs.capillarytech.com/reference/get-points-ledger-explode-info) API.

# Incentives+

## Coupons

### Issue Multiple Coupons to a Customer in a Single API Call

**What’s New:**\
Introducing a new API that allows issuing multiple coupons from the same series to a single customer in one API call.

**Problem Solved:**\
Brands previously faced limitations when issuing multiple coupons to a single customer for tier changes or event-based activities, requiring repetitive API calls.

**How It Helps:**

* Efficient Coupon Distribution: Streamlines the process of issuing multiple coupons, reducing manual effort and improving response times.
* Flexible Campaigns: Supports use cases like issuing 10 coupons on tier upgrades (e.g., Silver to Gold) or rewarding customers with 5 coupons from the same series for completing a milestone.

**Refer to the documentation[here](https://docs.capillarytech.com/reference/issue-bulk-coupon-with-count-from-series).**

### Custom Expiry Date Changes for Coupons

**What’s New:**\
You can now extend or shorten the expiry dates of active or expired coupon codes, providing enhanced flexibility to meet unique customer needs.

**Problem Solved:**

* Lack of Flexibility: Previously, customers could not extend or modify the expiry dates of active or expired coupons, limiting their ability to redeem offers when needed.
* Inability to Accommodate Special Circumstances: Brands struggled to adjust coupon expiry dates to address special requests or unforeseen delays, impacting customer satisfaction and loyalty.

**Use Cases:**

* Frequent Flyer: Imagine a frequent flyer who receives a special coupon for her next flight. Due to unforeseen delays, she can't book in time. With the new feature, her request to extend the coupon's expiry is promptly handled by customer support, ensuring a seamless experience.
* Hotel Guest: A hotel guest can now use an active coupon even if it originally expired during their stay, thanks to the ability to extend the expiry date. This flexibility enhances the guest's experience and ensures they benefit from the offer.

This feature ensures the coupons remain relevant and useful, helping to boost customer satisfaction and brand loyalty.

**Refer to the documentation[here](https://docs.capillarytech.com/reference/update-coupon-code-expiry-date).**

### API for Revoking Active Issued Coupons

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>What’s New:</span></strong></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Revoke active issued coupons for a particular customer for a coupon series</span></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Revoke specific active issued coupons for a particular coupon series </span></p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Problems Solved:</span></strong></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Lack of synchronous API to revoke coupons for individual customers or specific coupon codes.</span></p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Use case:</span></strong></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>When a customer's tier is upgraded, this API helps revoke all active issued coupons tied to their previous tier, ensuring they receive fresh, relevant coupons aligned with their new tier status. This streamlines tier-based rewards management and enhances customer experience.</span></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>In cases of suspected customer fraud or business-driven decisions to deactivate certain coupon codes, this API allows users to revoke specific active issued coupon codes which are not redeemed, either individually or in bulk. This ensures control over coupon misuse and enables flexible management of coupons.</span></p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>For detailed API documentation, refer </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>this</span></strong><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>.</span></strong></p>

<p>
  <br />
</p>

### Support for Coupon Code Formatting in Get Calls

#### What’s New:

Users can now retrieve coupon codes in their preferred format—uppercase, lowercase, or as originally entered—offering greater flexibility in how codes are displayed and managed.

#### Problem Solved:

Previously, coupon codes were returned solely in uppercase, even when created with mixed or lowercase characters. This led to redemption issues in case-sensitive third-party systems. With this update, exact-case retrieval and flexible formatting options ensure smooth compatibility and accurate coupon usage across systems.

#### Key Details:

* Formatting Options: Choose from three formats when retrieving coupon codes:
  * LOWER: Converts codes to lowercase.
  * UPPER: Converts codes to uppercase (default setting).
  * AS\_IT\_IS: Keeps the code in its original format as entered (e.g., "abAB123" remains "abAB123").

Refer to the API documentation below:

1. [Get customer coupons](https://docs.capillarytech.com/reference/get-customer-coupons-basic)
2. [Get coupon details v2](https://docs.capillarytech.com/reference/get-coupon-details)
3. [Get coupon details v1](https://docs.capillarytech.com/reference/get-coupon-detail)

## Badges

### Badge API Updates: Group Data and Filtering Added

Customer badge APIs now pass group name, group rank, and badge rank, with added support for group ID filtering.

**Read the API documentation[here](https://docs.capillarytech.com/reference/badges).**

### Historical Badge Import and Earned Badge Management

**What’s New:**

* **Historical Badge Import:** Introducing a new feature to support the creation of badges in bulk with historical start dates using the Connect+ template.
  * By using the "X-CAP-BADGES-MIGRATION":"migration" header in the Additional Headers field, you can now seamlessly migrate both expired and ongoing badges from other platforms into the Capillary system.
  * This ensures that badges, whether expired or still active but started in the past, are accurately reflected in the system, maintaining continuity in your loyalty programs.
  * **Read[here](https://docs.capillarytech.com/docs/create_badges#creating-a-historical-badge-badge-with-a-past-date).**
* **Customer Earned Badges Import:** Introducing a template to manage the migration of earned badges for customers.
  * This template allows brands to transfer historical badges, including those that have expired or are still active but were awarded in the past.
  * Ideal for bulk migration and offline activities, this feature ensures a seamless transition to Capillary’s loyalty platform without losing any customer achievements.
  * **Read[here](https://docs.capillarytech.com/docs/import-earned-badges-of-customer-template).**

### Fixed Window Tracking for Badge Issual Restrictions

<p>
  <br />
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>What’s New:</span></strong></p>

<p>
  <br />
</p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Added support for fixed window tracking in badge issual restrictions, allowing brands to set time-based limits (daily, weekly, or monthly) for badge issuals.</span></p>

<p>
  <br />
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Problem Solved:</span></strong></p>

<p>
  <br />
</p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Brands with retroactive workflows needed more flexible time-based limits for badge issuals. The current moving window approach didn't fully support retro activities.</span></p>

<p>
  <br />
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Use Cases:</span></strong></p>

<p>
  <br />
</p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Brands can now set fixed time-based limits when badges are issued within a specific period.</span></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Supports retroactive flows where the system evaluates badge limits based on fixed window defined instead of moving window.</span></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Users can choose daily, weekly, or calendar-monthly windows for badges and configure them with specific refresh rates.</span></p>

<p>
  <br />
</p>

<p>
  <strong>
    <span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>
      <span style={{border: "none"}} />
    </span>
  </strong>
</p>

<p>
  <br />
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>For more details, refer to </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>this</span></strong><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}> documentation.</span></strong></p>

### Now add Cart Promotions and Gift Vouchers as a benefit to Badges

<p>
  <br />
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>What’s New:</span></strong></p>

<p>
  <br />
</p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Introducing the ability to add cart promotions and gift vouchers as benefits to badges, in addition to existing options like points and coupons.</span></p>

<p>
  <br />
</p>

<p>
  <strong>
    <span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>
      <span style={{border: "none"}} />
    </span>
  </strong>
</p>

<p>
  <br />
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>For more details, refer to </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>this</span></strong><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}> documentation</span></strong></p>

### UI for Managing Custom Fields and Placement Metadata in Badges

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>What’s New:</span></strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}> </span></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>UI to manage custom fields for badges as well as organize group and rank placement metadata is now available.</span></p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Key Features:</span></strong></p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Custom Fields Management:</span></strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}> Easily create, update, and manage custom fields for badges through the UI, offering more flexibility and control.</span></p>

<p>
  <span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>
    <span style={{border: "none"}} />
  </span>
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Groups & Rank Placement Metadata:</span></strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}> Organize badges with group and rank placement metadata to enhance sorting and display, all within a user-friendly interface.</span></p>

<p>
  <span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>
    <span style={{border: "none"}} />
  </span>
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Refer to the documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>here</span></strong><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>.</span></strong></p>

### Track and Export Badge Metrics

<p>
  <br />
</p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Now, effortlessly track badge performance with our robust reporting feature. Export badges issued and earned, and dive deep into key metrics like badge issuance, and earning based on badge type.</span></p>

<p>
  <br />
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Key Features:</span></strong></p>

<p>
  <br />
</p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Standard insights report</span></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Export Badges: Seamlessly export all badges in which customers are enrolled and all badges which are issued to the customers for in-depth analysis.</span></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Track Performance KPIs: Monitor metrics such as number of badges created, issued, and earned, along with distribution by status and key criteria.</span></p>

<p>
  <br />
</p>

<p>
  <span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>
    <span style={{border: "none"}} />
  </span>
</p>

<p>
  <br />
</p>

<p>
  <br />
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Read the documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>here</span></strong></p>

### Enhanced Badge Ownership and Claim Information

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>What’s New:</span></strong><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}><br /><br /></span></strong></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>We’ve introduced a clear distinction between badge ownership in Loyalty Promotions and Loyalty Workflows to improve auditing and reporting.</span></p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Key Changes:</span></strong></p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>New Ownership Categories:</span></strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}> Badges now have distinct owners: "Loyalty" for loyalty workflows and "Loyalty Promotions" for loyalty promotions.</span></p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Badge Visibility:</span></strong></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Badges tagged as "Loyalty Promotions" will appear in Loyalty Promotions.</span></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Badges tagged as "Loyalty" will be listed in Loyalty Workflows under Programs.</span></p>

<p><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>If a badge is tagged as both "Loyalty Promotions" and "Loyalty", it will be visible in both sections.</span></p>

<p>
  <span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>
    <span style={{border: "none"}} />
  </span>
</p>

<p><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>Refer to the documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>here</span></strong><strong><span style={{fontSize: "11pt", fontFamily: "Arial,sans-serif"}}>.</span></strong></p>

### View Customer Badges in Membercare

We've enhanced the Membercare experience by enabling users to access and view customer badges directly within the Membercare interface. This provides clearer visibility into customer achievements and improves support insights. Users can now view customer badges within Membercare, with clear categorization for easier navigation—showing badges that are Available to Enrol, Available to Issue, Issued, and Expired.

<Image align="center" src="https://files.readme.io/73802dbbe9197713b05748a7cad02e1d02e0916c4d6c2fe698194f882ca111ed-Membercare_view_of_badges.gif" />

Refer to the documentation [here](https://docs.capillarytech.com/docs/badges-in-membercare)

## Rewards Catalog

### Save Time and Increase Efficiency by Creating/Updating Rewards in Bulk using Connect+ Template

Say goodbye to the days of creating rewards one by one. Introducing the power of bulk reward creation through CSV file upload which will save your time and increase efficiency.

Let's dive into the details, [create rewards](https://docs.capillarytech.com/docs/create-rewards_connectplus-template) and [update rewards](https://docs.capillarytech.com/docs/update-reward-connectplus).

### Enhanced Reward Data Tracking in Facts and Dimensions

All issued reward transaction data is now stored in facts and dimensions, offering a unified, detailed view for seamless reporting and tracking.

Check out the detailed documentation for the tables [here](https://docs.capillarytech.com/docs/rewards-fact-table).

### Event notification when a reward expires

What’s New:

Now you can create event notifications to alert users when a reward expires.

Key Benefits:

* User Engagement: Notify users via push, email, or SMS when rewards expire, improving re-engagement. Helps prevent users from missing the opportunity to redeem rewards.
* Automation: Automatically trigger the databricks notebook to finalize sweepstake winners, ensuring timely and transparent winner selection.
* Flexibility: Allows configuration of notification triggers at both the reward end date and pre-defined intervals. Ex: on the day of reward expiry or 7 days before reward expiry.

Read the documentation [here](https://docs.capillarytech.com/docs/rewards-event-notification).

### Enhancements in APIs:

Key Changes:

* Status Field: A new status field has been added to track rewards with values LIVE, UPCOMING, and ENDED based on their start and end date.
* Filtering: Enhanced filters for date range, reward status, vendor, and reward type.
* Response Improvements: New response fields include vendor info, reward status, last updated timestamps etc.
* Custom Fields Filtering: Introduced a scope parameter to filter the list of custom fields for rewards, issue reward and catalog promotions.
* Vendor Redemptions: A new API to fetch all vendor redemptions for the org with support for filters, pagination, and sorting.

Check the API documentation [here](https://docs.capillarytech.com/reference/rewards-catalog-api).

# Rewards+

## Content Type Integrations

### Cinema e-Vouchers

What are Cinema e-Vouchers?\
Cinema e-vouchers are digital coupons or electronic vouchers that can be redeemed for movie tickets at participating cinemas. These e-vouchers allow customers to purchase movie tickets online or at the cinema using the voucher instead of cash or credit. These vouchers make it easier for customers to plan their cinema visits and enjoy discounted movie experiences.

**Key Features**

* Easy Purchase Process - Customers can now browse, select, and purchase cinema e-vouchers effortlessly within the platform
* The platform is integrated with third-party API's to ensure a smooth booking experience for e-vouchers purchases
* The entire process, from selecting a cinema chain to purchasing an e-vouchers has been optimized for a user-friendly experience
* E-vouchers are delivered instantly upon purchases, ready to be used at participating cinema chains
* Enjoy discounted rates for cinema e-vouchers, available through our platform as a special reward offering

### Event ticket booking

#### What is Event ticket booking?

Event ticket booking refers to the process of purchasing tickets to attend various events such as concerts, sports games, theatre performances, festivals, conferences, and other live events.\
Rewards+ partners with multiple vendor providing event tickets and integrates with platform as a special reward offering

**Key Features**

* Easy Purchase Process - Customers can now browse, select, and purchase event tickets effortlessly within the platform
* The platform is integrated with third-party API's to ensure a smooth booking experience for e-vouchers purchases
* Customers are allowed to select their seats based on availability, often displaying an interactive seating chart
* The entire process, from selecting a cinema chain to purchasing a e-vouchers has been optimized for a user-friendly experience
* Customers can use their debit or credit card to make purchases
* Tickets are delivered instantly upon purchases.

### Affiliate Vouchers

**Key Features:**

* Customers can now access and redeem affiliate vouchers from 1000's of merchants directly through our platform
* This content type is fully integrated, ensuring a smooth and efficient user experience from voucher selection to activation.
* This enhances the platform's offering allowing us to provide more value and drive user engagement.

## New Features

### Cashback Engine

**Problem statement** - Due to non-disclosure agreements, commission-sharing between brands and capillary must remain confidential. It was important to handle these commissions within capillary rather than through external partners.

**Solution**:

* The Cashback engine allows us to manage and automate the commission split offered by merchants at a tenant and offer-type levels, significantly enhancing our platform's flexibility and scalability.
* Brands can now set up the commission splits between end-customers, Brand, Capillary and Aggregrator
* Feature will ensure the offer ingested for the brand must have commission splits so end-customers can view accordingly.\
  For Example: If Nike offers 10% cashback, the Brand can set up 90% for end-customers and remaining 10% between Brand, capillary and aggregator. In this case the end-customer would see 9% cashback on the Rewards+ platform.

### Offer Quality Control management

**Problem statement** - With integration providing offers from 1000's of merchants, publishing these offers directly to customers raised quality concerns.

**Solutions**:

* Designed a review process of offers to ensure quality of offers published to end-customers
* New offers for a brand automatically moved to Review state for manual verification of creatives, copies and working codes (if available).
* Feature needs to be enabled for an org.

### Segmentation

While we're all familiar with segmentation in CRM, we have developed a simplified version of segmentation for Rewards+ to meet immediate client requests. This includes:

1. Create a segment on customer profile information(conditions) and tag them to specific offers.
2. Uploading a list of customers to be targeted with a particular offer.

For example -\
Create a segment of customers whose birthday month is the current month. A rule-based segment is created in our Content management system and tagged to an offer.
When the customer launches the application, the system evaluates their attributes, and if the rule matches, the birthday offer is shown in real time.

**Note** - You can create Rule based segments to all customer attributes provided by brand as customer profile information in Rewards+

### Personalization of offers

We have redesigned the Rewards+ Personalization API to offer based on customer information captured in Rewards+:

* Personalised offers to customers based on customer preferences/Interest, customer offer activation, customer offer favorite
* Personalized offers are overridden to support real-estate optimization on the platform

# Engage+

## SDK

### Version 1.5.6 (September 5, 2024)

* Notification centre enhancement feature
* Added support for custom fonts, borders, and styling for CTA buttons.
* Improved logic for displaying expandable content based on notification style.
* Updated background colour functionality for primary CTAs.
* Introduced new CTA design options as per mockups.

Docs:

* [Android](https://docs.capillarytech.com/reference/configure-notification-center)
* [iOS](https://docs.capillarytech.com/reference/configure-notification-center_ios)

### Version 1.5.5 (August 27, 2024)

* Fixed crash related to core data migration for events model
* Implemented a custom mapping model for Core Data migration to ensure all events are retained during the transition.
* Fixed the Core Data migration crash when updating from the old data model version to the newer version.

### Version 1.5.4 (August 14, 2024)

* Introduced remote logging feature
* Introduced a Remote Logger feature that syncs logs to the server, depending on the log level selected by the application.
* Updated the sign-up event to make all fields optional except for cuid.
* Now, cuid is the only required field for the sign-up event.

### Version 1.5.3 (July 19, 2024)

* Resolve bug related to date formatting
* Resolve the Date formatting issue where locale change causes converting current date to future date

### Version 1.5.2 (July 15, 2024)

* SDK will show a notification badge on the application icon
* Show notification badge count of unread notifications on application icon whenever application receives valid notification
* Resolve issue where application receives an in-app message in the background unable to show it when application comes to foreground

# Neo Extension

## Impactful improvements to code diff feature in Neo UI

* Enhanced version comparison UI for better usability
* Refined tooltip behavior and dropdown menu layout
* Improved version selection interface with clearer visual cues
* Updated terminology for clarity

These changes aim to streamline your workflow when comparing different versions of your code configurations.

***

## Kafka Producer Block and Connect+ Integration

The Neo application introduces a **Kafka Producer block** as part of its event-driven architecture, using the Pub/Sub pattern. This block allows Neo to generate and push events to Kafka topics, enabling asynchronous workflows.

**Key functions:**

* **Event Generation**: Neo sends events to Kafka, which are then consumed by Connect+.
* **Event Consumption and Callback**: Connect+ processes these events and makes an HTTP callback to Neo, triggering appropriate workflows or APIs.

**Use case**: Ideal for handling **bulk operations**, where large datasets can be processed asynchronously — ensuring scalability for high-volume tasks.

**Documentation:** <https://docs.capillarytech.com/docs/neo-kafka-block#/>

## Block Execution Strategy

Neo now supports configurable execution strategies for each block type in the UI.

* **AND** (default): A block waits for **all** parent blocks to complete before execution.
* **OR**: A block executes when **any one** of the parent blocks completes—ideal for mutually exclusive paths.

This enhancement is fully **backward-compatible** with existing flows.

**Documentation:** <https://docs.capillarytech.com/docs/configuring-conditions#/>

***

## UI Feature Control

This feature is **controlled** and may not be active by default for all organizations.

* If disabled, submit a ticket to the **PST team** to request activation.
* The UI will clearly indicate if the feature is not enabled.

## Changes to Neo UI

Neo UI now includes major improvements focused on **data handling** and **error management** through wrapper decoupling.

**Key updates:**

* The use of `*` and `any` statements in relations has been **discontinued**.
* These are now replaced by:

  * `isSuccess()`: To check for successful execution.
  * `hasError()`: To identify error conditions.
* These functions provide more **precise control flow** within relations.

In addition, Neo introduces:

* **PreMatching filters**: To refine data input before matching begins.
* **PostMatching filters**: To filter and refine output after matching.

These enhancements allow for **advanced control** over how data flows through your workflows.

**Documentation:** <https://docs.capillarytech.com/docs/tags-filters-in-dataflow#/>

***