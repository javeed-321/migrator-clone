---
updatedAt: 2026-07-28T08:51:45.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# April - May - June 2026

# Engage

**Test and Control Groups for Journeys**

Journey creators can now set a test and control split directly within Journey Settings. You can define the percentage of users who will receive communications (test group) versus those who will move through the journey silently without receiving any communications or incentives (control group). This lets you measure the true incremental impact of a journey by comparing the behavior of both groups. The setting is configurable in Draft state and becomes read-only once the journey goes live.

**Documentation link**: <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-journey#test-and-control-ratio-for-a-journey">Configure test and control ratio for a journey</Anchor>

**Add Test Customers from the Test and Preview Page**

Users can now add new test customers directly from the Test and Preview page, not just the campaign settings. This enhancement streamlines the testing process, offering greater flexibility and efficiency for campaign validation. The update improves user workflow by reducing navigation steps and making test customer management more accessible during campaign setup.

**Documentation link** - <Anchor target="_blank" href="https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels"><https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels></Anchor>

**Wait for Future Event Context Tags in Journey Engagement Blocks**

You can now personalize engagement block messages using context tags derived from the **Wait for future event** block configured in a journey. When a customer performs the specified event and moves to the next step, both entry event-based tags and Wait for future event context tags become available in the engagement block editor. This allows brands to send highly personalized communications based on the customer's actions at each stage of the journey.

**Documentation link**: <https://docs.capillarytech.com/docs/context-based-tags-in-engagement-block>

**Ignore Unsubscribed Users in Campaign Delivery**

You can now send communications to the complete audience list by enabling the **Ignore Unsubscribed Users** option during campaign configuration. When enabled, the system checks whether users are reachable on the selected channel at the time of delivery and sends the communication even if they have unsubscribed. This helps brands bypass the unsubscribed user flow when required and ensures important communications can still be delivered.

**Documentation link:** <https://docs.capillarytech.com/docs/configure-communication-channel-settings#send-messages-to-unsubscribed-users>

**Simplified Configuration for Loyalty Value-Based Labels**

You no longer need to configure earning or expiry conditions for loyalty labels that only display customer values such as points balance, slab details, purchase values, or upgrade and renewal gaps. These labels can now be used directly in communication templates, making the configuration process simpler and reducing unnecessary setup steps while creating campaigns and journeys.

Documentation link: <https://docs.capillarytech.com/docs/engagement-building-block#adding-engagement-block>

<https://docs.capillarytech.com/docs/create-message#add-incentive-campaign-offerpoints-strategy>

**Matches Regex operator in journeys**

Filter customers in Entry Trigger and Event-based Wait blocks using regex patterns, giving you precise control over string-type attribute matching beyond what standard operators like Contains offer.

Documentation link: [https://docs.capillarytech.com/docs/configure-events-and-conditions#matches-regex-operator](https://docs.capillarytech.com/docs/configure-events-and-conditions#matches-regex-operator "https://docs.capillarytech.com/docs/configure-events-and-conditions#matches-regex-operator")

**Coupon Series Selection in Journey Conditions**

You can now select specific coupon series when adding a **Coupon from Mentioned Series** condition in a journey. The dropdown lists all coupon series in your org and loads more as you scroll. You can also search by name to quickly find a series. Selected series are pinned to the top of the dropdown and are retained when you save and reopen the journey. This condition is available in the Entry Trigger, Event-based Wait, and Exit Trigger blocks.

**Documentation link**: [Configure events and conditions](https://docs.capillarytech.com/docs/configure-events-and-conditions)

**Exists and Does not exist condition operators in Journey Builder**

Journey entry trigger and event-based wait conditions using the Exists or Does not exist operators (for example, checking that External ID is not empty) now save and preview correctly. These operators previously failed validation or showed "null" in the condition preview for some attributes.

**Documentation link**: [Configure events and conditions](https://docs.capillarytech.com/docs/configure-events-and-conditions#string-operators)

**Store names now shown in audience filter descriptions**

When you filter an audience group by store, for example using **Registered store**, the audience description now shows the selected store names instead of staying blank. Audience groups created earlier don't reflect this change; newly created audience groups show the store names correctly.

**Documentation link**: [Common filter options (in filters)](https://docs.capillarytech.com/docs/common-filter-optionsin-filters)

**A/B testing block performance in journey reports**

Journeys with an A/B testing block now show per-variant KPIs, a winning-variant marker, and a final-variant marker in Report Mode, so you can review test results directly on the journey canvas without leaving it.

**Documentation link**: [Block-Level Reporting in Journey](https://docs.capillarytech.com/docs/block-level-reporting-in-journey)

**WhatsApp dynamic personalized images**

WhatsApp image templates now support a **Dynamic image** mode. Instead of sending the same static image to everyone, you can send each customer a personalized image sourced from their own image URL, mapped through a custom tag in a CSV audience upload. This is fully self-serve and requires no support ticket.

**Documentation link**: [Create WhatsApp Template](https://docs.capillarytech.com/docs/create-whatsapp-template)

# Customer Data Platform

**Event Notifications now delivered in near real time**

Capillary now publishes event notifications in near real time: 95% of events are published for delivery within about 2 to 3 minutes of being generated, at up to 50,000 requests per minute (RPM). This replaces the previous one-hour delivery SLA. End-to-end delivery time still depends on your webhook's responsiveness.

**Documentation link**: [Event Delivery and Reliability](https://docs.capillarytech.com/docs/copy-of-consuming-event-notifications#event-delivery-time)

**New List Data Type for Extended Fields**

Extended fields now support a `LIST` data type, enabling fields that store an ordered list of values. Each LIST field includes metadata defining the element type (`TEXT`, `INTEGER`, or `DECIMAL`), optional allowed values for a closed list, and optional minimum and maximum item count constraints. Values are passed as a comma-separated string or a JSON array.

**Documentation link**: [Get Org Extended Fields](https://docs.capillarytech.com/reference/get-org-extended-fields)

**Create Custom Field API Now Available to All Authenticated Users**

The `POST /v2/customFields` API previously restricted access to admin users (entity type `ADMIN_USER`). This restriction has been removed. Any authenticated user with WRITE access to the Organization resource can now create custom fields.

**Documentation link**: [Create a Custom Field](https://docs.capillarytech.com/reference/create-a-custom-field)

**Victim Identifier Release Now Controlled by a Dedicated Boolean Flag**

A new org-level configuration, `CONF_VICTIM_IDENTIFIER_RELEASE_ENABLED`, replaces the previous days-based gating for the victim identifier release flow. When enabled, the system releases the identifiers of victim accounts after a successful merge, scheduled by `CONF_VICTIM_IDENTIFIER_RELEASE_AFTER_DAYS`, and emits a new `identifierReleased` webhook event so downstream systems can react without polling. When disabled (default), the release step is skipped entirely. Contact Capillary Support to enable this configuration.

**Documentation link**: [How data deletion works and what data is deleted](https://docs.capillarytech.com/docs/how-data-deletion-works-and-what-data-is-deleted) | [Event Schema (Payload) — Customer and User Group](https://docs.capillarytech.com/docs/event-schema-customer)

**Allow Reuse of Identifiers Held by Campaign and Victim Users (V2 API)**

Previously, when a V2 API request tried to assign a mobile number, email, or external ID to a customer, the request failed if that identifier was already held by a campaign user (a non-registered user) or a victim user (a merged-away account). This caused registration and profile-update flows to block unnecessarily when the identifier was held by an inactive account.

A new org-level configuration, `CONF_ALLOW_CAMPAIGN_AND_VICTIM_USER_IDENTIFIER_REUSE`, allows the API to automatically clear the conflicting identifier from the campaign or victim user and assign it to the requesting customer. This applies to `mobile`, `email`, and `externalId` identifiers for `source=INSTORE` requests. Contact Capillary Support to enable this configuration.

**Documentation link**: [Add or Remove Customer Identifiers](https://docs.capillarytech.com/v1.0/reference/update-identifiersissue-card)

**Transaction Update API: Support for Return and Not-Interested Transactions**

The v2 Transaction Update API now supports updating extended fields and custom fields for `RETURN`, `NOT_INTERESTED`, and `NOT_INTERESTED_RETURN` transaction types. Previously, only regular transactions could be updated. Use the new `type` field in the request body to scope the lookup. Note: `MIXED` transactions are not yet supported.

**Documentation link**: [Update Transaction](https://docs.capillarytech.com/reference/update-transaction)

**GET Locations API — OR-Based q Filter Search**

The `q` parameter in the GET Locations API now combines multiple filter types (name, code, external\_id) using OR logic instead of AND. A location matching any one of the provided filters is returned, making it easier to search across multiple criteria simultaneously.

**Documentation link**: [Get Locations](https://docs.capillarytech.com/reference/get_v2-locations)

**v2 Locations API — Bulk Create and Update Endpoints**

Org admins can now create and update stores, zones, concepts, and tills in bulk using the v2 Locations API. Each endpoint accepts up to 50 records per request and returns per-row results with granular error details. The PUT endpoints support partial updates, so only the fields included in the request are changed.

**Documentation links**: [Add stores in bulk](https://docs.capillarytech.com/reference/add-stores-in-bulk) · [Add zones in bulk](https://docs.capillarytech.com/reference/add-zones-in-bulk) · [Add concepts in bulk](https://docs.capillarytech.com/reference/add-concepts-in-bulk) · [Add tills in bulk](https://docs.capillarytech.com/reference/add-tills-in-bulk) · [Update stores in bulk](https://docs.capillarytech.com/reference/update-stores-in-bulk) · [Update zones in bulk](https://docs.capillarytech.com/reference/update-zones-in-bulk) · [Update concepts in bulk](https://docs.capillarytech.com/reference/update-concepts-in-bulk) · [Update tills in bulk](https://docs.capillarytech.com/reference/update-tills-in-bulk)

**Labels V2 API — Labels and Assignments**

The new `/v2/labels` and `/v2/labels/assignments` APIs let you create, update, and manage labels for customers, products, and stores, and assign those labels to entities in bulk. Labels support configurable expiry (fixed date or relative duration) and three entity types: `CUSTOMER`, `PRODUCT`, and `STORE`. All operations support batch requests of up to 10 items.

**Documentation link**: [Create Labels](https://docs.capillarytech.com/reference/create-labels-v2)

**Search Customers by Label — Exact Match and Case-Insensitive**

The Search Customers by Label API (`GET /v2/customers/labels/search`) now performs an exact, case-insensitive match on the label name. Previously the `q` parameter supported fuzzy and prefix search (for example, `pre` to find all labels starting with "pre"). Callers must now pass the full label name.

**Documentation link**: [Search Customers by Label](https://docs.capillarytech.com/reference/search-customers-by-labels)

**Audit Logs for User Management**

Org owners and administrators can now view, filter, and export a chronological record of User Management actions taken in Intouch — such as adding users, changing permissions, and exporting user lists. The audit log table shows up to 20 events per page and supports filtering by date range (up to 30 days), user, and action type. Security-sensitive events, such as adding an org owner or updating admin permissions, automatically send email notifications to relevant org owners and the affected user. Export the full log set as a CSV file delivered by email.

**Documentation link**: [Audit logs](https://docs.capillarytech.com/docs/audit-logs)

**Coupon Series productInfo Updates**

Coupon series now support specifying products by code (`productCodes`) in addition to by ID (`productIds`) within a `productInfo` block. Provide one or the other per block, supplying both returns an error. Per-block limits: BRAND and ATTRIBUTE support up to 250 IDs, CATEGORY up to 1,000, and SKU up to 10,000. The Get Coupon Series API now returns all configured categories instead of truncating at 20.

**Documentation link**: [Create Coupon Series](https://docs.capillarytech.com/reference/create-coupon-series-copy-archive)

**Generate Cards API — Reduced Limit and Duplicate Card Handling**

The maximum number of cards that can be generated in a single request has been reduced from 100,000 to 50,000. In addition, when duplicate card numbers are encountered during bulk generation, they are now excluded from the response and surfaced as a consolidated warning (`FEW_CARDS_ALREADY_EXISTS`, code 3059) with the list of affected card numbers — previously, duplicate cards could silently fail to persist in the database.

**Documentation link**: [Generate Cards](https://docs.capillarytech.com/reference/generate-cards)

**Payment Modes for Not-Interested Transactions**

Payment modes (tenders) are now correctly returned for `NOT_INTERESTED` transactions when `tenders=true` is passed — a previous bug forced this off regardless of the query parameter. Payment mode details also now include a `notes` field when available.

**Documentation link**: [Get Transaction Details](https://docs.capillarytech.com/reference/get-transaction-details)

**Add Transaction API: Empty Identifier Now Returns a Clear Error**

The Add Transaction API (`POST /v2/transactions`) now validates the `identifierName` and `identifierValue` query parameters. If either is empty or blank, the request returns error code `8084` (Customer details not sent) instead of failing with a server error. The API documentation has been corrected to show `8084` for this case, replacing the earlier incorrect `400` reference.

**Documentation link**: [Add a Transaction](https://docs.capillarytech.com/reference/add-transaction-single)

# Loyalty+

**Revamped Tiers page**

The Tiers page now shows all of a program's tiers side by side in a single comparison table, so you can see eligibility, renewal, and downgrade criteria across tiers at a glance. Creating and editing tiers goes through a guided form with a live preview, and all changes go through a maker-checker approval workflow before they take effect on the live program.

**Documentation link**: [Create and Manage Tiers](https://docs.capillarytech.com/docs/create-manage-tiers)

**Loyalty Benefits APIs**

You can now create and manage loyalty benefits through APIs. Benefits follow an approval flow — create a draft, submit it for review, and it goes live on approval; live benefits can be paused, resumed, or stopped. You can also list, retrieve, update, and duplicate benefits.

**Documentation link**: [Create Benefit](https://docs.capillarytech.com/reference/create-benefit)

**Concept-Level Attribution in the Points Ledger API**

Brands using multi-concept org hierarchies can now retrieve concept-level attribution for each points ledger entry. Pass `includeConceptDetails=true` in the request and the API returns the `conceptId` and `conceptName` of the concept associated with the store where each transaction occurred.

**Documentation link**: [Get Points Ledger](https://docs.capillarytech.com/reference/get-ledger-information)

**Reverse Redeemed Points Using an External Reference Number**

You can now reverse redeemed points using an `externalReferenceNumber` instead of the internal `redemptionId`. If your system tracks redemptions using an external reference, you no longer need a separate lookup to find the `redemptionId` before reversing. The two identifiers are mutually exclusive; providing both returns an error.

**Documentation link**: [Reverse Redeemed Points](https://docs.capillarytech.com/reference/reverse-redeemed-points)

**Cross-Member Points Redemption with FEFO Draw Order**

When cross-member redemption is enabled for a UserGroup2 group, points are now drawn from the combined balance of all group members in FEFO (First Expiry, First Out) order — the earliest-expiring batch across all members is consumed first. The response includes a per-member breakdown showing exactly whose points were used and from which expiry batch. The v1.1 Redeem Points API also now returns `is_group_redemption` in the response to indicate whether a redemption was processed as a cross-member group redemption.

**Documentation link**: [Redeem Customer Points](https://docs.capillarytech.com/reference/redeem-customer-points) · [Redeem Points (v1.1)](https://docs.capillarytech.com/reference/redeem-points)

**Retrieve Cross-Member Redemption History with the Group Points Ledger API**

A new API lets you retrieve paginated cross-member redemption and reversal history for a user group. Filter by scope to view an individual member's activity or the full group's history. Each entry includes a `userRole` field identifying whether the member initiated the redemption or was a source member whose points were drawn.

**Documentation link**: [Get Group Points Ledger](https://docs.capillarytech.com/reference/get-group-points-ledger)

**Partner Program Supplementary Membership Relinking**

Brands can now schedule a future-dated membership relinking for customers in supplementary partner programs. Setting a future start date queues the relink to activate automatically on that date. Pending relinks can also be cancelled before they activate using the Update Customer Tier API.

**Documentation link**: [Link Customer to Partner Program](https://docs.capillarytech.com/v1.0/reference/link-customer-to-partner-program__)

**Edit the opt-in window on loyalty promotions**

You can now change the opt-in window (`optInStartDate` and `optInEndDate`) on an existing `LOYALTY_EARNING` promotion through the Update Loyalty Promotion API, when the `CONF_ENROLLMENT_OPTIN_DURATION_ENABLED` org flag is on. What you can change depends on the promotion status: drafts allow free edits, the start date locks once the window opens, and the end date can only be extended. Activity-based and external-trigger enrolments do not support an opt-in window.

**Documentation link**: [Update a Loyalty Promotion](https://docs.capillarytech.com/reference/update-loyalty-promotion#editing-the-opt-in-window) · [Create a Loyalty Promotion](https://docs.capillarytech.com/reference/create-a-loyalty-promotion)

**Remove loyaltyProgramEnrollments from Customer API Documentation**

The `loyaltyProgramEnrollments` object and its sub-fields (`programId`, `tierNumber`, `loyaltyPoints`, `tierExpiryDate`, `pointsExpiryDate`) have been removed from the request parameter tables and code examples across customer API pages.&#x20;

**Subscription CRUD APIs**

A new set of APIs lets you create, retrieve, list, and update subscription programs for a loyalty program. New and edited programs go through an approval step before going live, so changes to a live program never take effect until they're approved.

**Documentation link**: [Create Subscription](https://docs.capillarytech.com/reference/create-subscription)

**Rule builder: updated operator labels and grouped attribute picker**

Operators in the Loyalty Promotions rule builder now show clearer display names — for example, Is Null is now Is set, and Matches is now Matches Regex. The attribute picker now organizes attributes into named groups, including Custom Fields, Customer Extended Field, Transaction Extended Field, and Line Item Extended Field, with attributes sorted alphabetically within each group.

**Documentation link**: [Operators](https://docs.capillarytech.com/docs/loyalty-promotions-operators)

**Transaction and currency metrics in the Loyalty Promotions rule builder**

You can now write qualifying conditions based on a member's transaction history or currency balances using two new metric types — **Currency Metrics** and **Transaction Metrics** — in the rule builder. Select a metric type under the **Event** group in the member attributes dropdown, choose a fact, refine with filters, and define an aggregation to build precise, history-based conditions.

**Documentation link**: [Qualifying Conditions and Attributes](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions)

**Filter Historical Points by Program ID and Activity Type**

You can now filter historical points records by loyalty program or activity type (for example, earned or redeemed points), giving you more control over the data you retrieve. Date range filters require a full timestamp with timezone offset — plain date strings are not supported.

**Documentation link**: [Get Historical Points](https://docs.capillarytech.com/reference/post_v2-historicalpoints-gethistoricalpoints-id)

**Reversal Breakdown for Cross-member Redemptions**

When you reverse a cross-member redemption, you can now see a breakdown of how the reversed points are returned to each group member who contributed to the original redemption.

**Documentation link**: [Reverse Redeemed Points](https://docs.capillarytech.com/reference/reverse-redeemed-points)

**Tier Management APIs**

You can now create, update, and delete tiers through the API, and manage the full approval process — from submitting a tier for review to approving or rejecting it and tracking pending approvals.

**Documentation links**: [List All Tiers](https://docs.capillarytech.com/reference/list-tiers) · [Get Tier](https://docs.capillarytech.com/reference/get-tier) · [Create Tier](https://docs.capillarytech.com/reference/create-tier) · [Update Tier](https://docs.capillarytech.com/reference/update-tier) · [Delete Tier](https://docs.capillarytech.com/reference/delete-tier) · [Submit Tier for Approval](https://docs.capillarytech.com/reference/submit-tier-for-approval) · [Approve or Reject Tier](https://docs.capillarytech.com/reference/approve-or-reject-tier) · [List Pending Tier Approvals](https://docs.capillarytech.com/reference/list-pending-tier-approvals)

**Tier Advanced Settings APIs**

You can now retrieve and update the program-level upgrade and downgrade settings that govern how customers move between tiers. Configure these settings before you create tiers, because tier creation requires the program to have upgrade and downgrade configuration in place.

**Deduct points and alternate currencies from user group**

You can now manually deduct reward currencies (points or alternate currencies) directly from a group or fleet ledger using the new `POST /v2/userGroup2/negativePointsAdjustment` API. Identify the group using its internal ID, external ID, or the primary member's identifier. The adjustment routes through the same validation and processing path as individual customer deductions, with the balance updating on the group's shared ledger.

**Documentation link**: [Deduct points and alternate currencies from user group](https://docs.capillarytech.com/reference/deduct-points-and-alternatecurrencies-from-user-group)

**Revoke a Loyalty Promotion API**

You can now programmatically revoke a customer's enrollment or opt-in from a v3 unified loyalty promotion using the new `POST /v3/promotions/revoke` API. Use `REVOKE_ENROLL` to remove an enrollment or `REVOKE_OPTIN` to remove an opt-in. Revoke specific IDs or use `revokeAllEnrollments` / `revokeAllOptIns` to remove all active records in a single call. Revoking an enrollment on a promotion that supports both enrollment and opt-in automatically cascades the opt-in revoke. You can also retroactively timestamp the revoke using `optOutDate` and attribute it to a source system using `sourceDetails`.

**Documentation link**: [Revoke a Loyalty Promotion](https://docs.capillarytech.com/reference/revoke-a-loyalty-promotion)

**New rounding strategy: Round half even**

A new rounding strategy, "Round half even," is now available for earn action configurations. When the calculated points value is exactly halfway between two whole numbers, it rounds to the nearest even integer — for example, 2.5 rounds to 2 and 3.5 rounds to 4. This approach, also known as Banker's Rounding, reduces cumulative rounding bias in high-volume programs.

**Documentation link**: [Issue currency — Strategies for rounding the issued currency](https://docs.capillarytech.com/docs/loyalty-promotions-actions#issue-currency) · [Create a Loyalty Promotion](https://docs.capillarytech.com/reference/create-a-loyalty-promotion)

**Rounding Strategies Can Now Honor Program Decimal Precision**

A new organisation-level configuration allows rounding strategies to honor the program's configured decimal precision instead of always rounding to a whole number. To enable, raise a JIRA ticket to the Capillary product support team.

**Documentation link**: [Create a Loyalty Promotion](https://docs.capillarytech.com/reference/create-a-loyalty-promotion)

# Incentives

**Cart Promotions: Choose How Fixed-Window Limits Reset per Customer**

Fixed-window reset periods on cart promotion limits now support a **Cycle start date** setting with two options: **Promotion config date** resets all customers on the same shared schedule, and **Customer's issuance date** starts each customer's cycle from when the promotion was individually issued to them. The issuance date option is available for Loyalty Earning and Code linked promotions and gives every customer an equal redemption window regardless of when they received the promotion.

For more details, refer to [Create a Cart Promotion](https://docs.capillarytech.com/docs/create-a-cart-promotions)

**Activate and Deactivate Cart Promotions**

Cart promotions can now be reactivated after being deactivated. The activate and deactivate actions are available from the three-dot menu in the promotions list and are fully reversible, allowing brands to pause and resume promotions without recreating them.

For more details, refer to [Manage Cart Promotions](https://docs.capillarytech.com/docs/editing-or-deleting-a-cart-promotion)

**Role-Based Access Control for Incentives**

Incentives now supports role-based access control (RBAC), enabling organisations to define granular permissions for the Incentives module. This allows teams to control who can configure and manage incentives based on their role.

**Decimal Precision for Rewards Catalog**

Rewards catalog can now set conversion ratios using decimal values for any reward type that supports the conversion ratio payment mode. This allows you to have the flexibility to create more accurate reward offers, for example, 0.44 miles per point or 0.005 wallet credit per point.

Previously, you were limited to whole numbers, which made it harder to fine-tune your rewards. With this enhancement, you can tailor your point-to-reward conversions to support your business goals better.

For more details, refer to [Issue Reward](https://docs.capillarytech.com/reference/post-issue-user-reward)

**Increased Category Limit for Coupon Series**

Coupons now support attaching up to 1,000 product categories to a coupon series, up from the previous limit of 20. With this increase, merchants can use a single coupon series to cover a much broader range of products.<br />

For more details, refer to <Anchor target="_blank" href="https://docs.capillarytech.com/reference/create-coupon-series">Create coupon series</Anchor><br />

**Revoke User Reward API**

A new Revoke User Reward API moves an issued reward transaction to CANCELLED and refunds the points consumed at issuance. It is gated by the brand-level REVOKE\_ENABLE flag, which is disabled by default.

**Documentation link**: [Revoke User Reward](https://docs.capillarytech.com/reference/revoke-user-reward)

# Data Import

**Payment mode import profile**

You can now bulk-import payment mode data, such as cash, card, or UPI payments, against existing transaction bills using the new payment mode import profile in the Data Import framework. A single job can mix rows for different payment mode types. The profile supports both regular and not-interested bills in the same job.

**Documentation link**: [Payment mode import profile](https://docs.capillarytech.com/docs/payment-mode-profile)

<br /><br />