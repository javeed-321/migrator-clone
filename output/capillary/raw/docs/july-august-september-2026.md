---
updatedAt: 2026-08-14T02:44:11.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# July - August - September 2026

# Customer Data Platform

**Label Event Notifications**

Capillary now raises webhook event notifications when labels and label assignments change, so downstream systems can react in real time. The new events are `labelCreated`, `labelUpdated`, `labelAssignmentCreated`, `labelAssignmentUpdated`, and `labelAssignmentRemoved`.

**Documentation link**: [Label event schemas](https://docs.capillarytech.com/docs/event-schema-labels)

**Customer Merge Request Failures Now Surfaced**

The Add Request API for customer merge (`POST /v2/requests`) now returns a proper error response when a merge request fails downstream, instead of a success response with a request ID. For example, if the victim or survivor customer is not found, the API returns error `9042` (Customer not found for given identifiers) and does not create the request.

**Documentation link**: [Add Request](https://docs.capillarytech.com/reference/add-request-transaction-customer-merge)

**Self-serve product catalog management**

You can now create and manage SKUs, Brands, Categories, Attributes, Labels, and dynamic Collections directly from the Products page in Capillary InTouch, without a support ticket or the Product APIs.

**Documentation link**: [Managing products](https://docs.capillarytech.com/docs/product-entities-management)

**Self-serve Locations management**

You can now create and manage Stores, Zones, Concepts, Tills, Labels, and dynamic Collections from a single Locations page, without a support ticket or data import. Enabling a Concept as an Organization Unit may still require a Platforms ticket.

**Documentation link**: [Manage locations (Stores, Zones, Concepts, and Tills)](https://docs.capillarytech.com/docs/locations-entities-management)

**Self-serve Customer labels**

You can now create and manage Customer entity labels, tags with an optional expiry for filtering and reporting on customers, from the Customers entity page, without a support ticket or data import.

**Documentation link**: [Managing customer labels](https://docs.capillarytech.com/docs/customer-entities-management)

**Tier Upgrade History ISO Timestamp Field**

The customer tier/slab upgrade history response now includes a `changedOnISO` field, a reliably formatted ISO 8601 timestamp for when a tier change occurred. Use this field instead of the existing `changedOn` field, which has a known issue where it can return the calling system's local time incorrectly labeled as UTC.

**Documentation link**: [Get Customer Details (V2)](https://docs.capillarytech.com/reference/get-customer-details-v2)

**Case-Insensitive External ID Lookup for Dual Eligibility**

External ID lookups and duplicate checks are now case-insensitive for dual eligibility organizations. For example, a customer registered with external ID `ABC123` can now be found by a lookup for `abc123`.

**Documentation link**: [Get Customer ID](https://docs.capillarytech.com/reference/get-customer-id)

**Not interested transaction import profile**

Bulk-import bill and line-item data for transactions from customers with no loyalty enrollment and no customer identifier, using the new Graviton-based Data Import framework. Supports Insert for new bills and a limited Update to mark a bad import as deleted so it can be corrected and re-imported.

**Documentation link**: [Not interested transaction import profile](https://docs.capillarytech.com/docs/not-interested-transaction-profile)

**Points expiry import profile**

Bulk-update the expiry date of loyalty points you've already awarded to members, across points, promotion, and bill line-item tables. Expiry dates in the past or today are deducted immediately; future dates are just redated and expire later as usual.

**Documentation link**: [Points expiry import profile](https://docs.capillarytech.com/docs/points-expiry-profile)

**Scheduled import approval thresholds**

Recurring Data Import jobs can now be held for manual approval when they cross a record-count or error-rate threshold you set, with an email notification to the schedule owner and any recipients you add. One-time imports are never held.

**Documentation link**: [Creating an import job](https://docs.capillarytech.com/docs/data-import-new#step-1-job-settings)

**Case-Insensitive SKU Matching for Label Assignments**

Assigning, removing, or looking up product labels by SKU code is now case-insensitive. If your product catalog uses SKU `ABC123`, a request using `abc123` now works too, instead of failing with an entity-not-found error.

**Documentation link**: [Create label assignments](https://docs.capillarytech.com/reference/create-label-assignments)

**Returns Without an Original Bill**

You can now let returns without a matching original bill still deduct from a customer's lifetime purchases. This keeps tier calculations and reporting accurate even when a customer returns an item without their receipt. Ask the Capillary Product Support team to turn this on for your organization.

**Documentation link**: [Add Transaction (V2)](https://docs.capillarytech.com/reference/add-transaction-single)

**Parent Event Log Details on Redemption Reversal Ledger Entries**

The Get Points Ledger API can now link a points redemption reversal back to the original redemption it undid. Pass `includeParentEventLogDetails=true` to have each `PointsRedemptionReversal` ledger entry include the `eventLogId` of the redemption event it reverses, useful for audit and dispute resolution.

**Documentation link**: [Get Points Ledger](https://docs.capillarytech.com/reference/get-ledger-information)

**Invalid Identifier Value Error on Add Transaction**

The Add Transaction API now returns error `8154` (invalid identifier value) when `identifierName` is `id` and `identifierValue` is non-numeric, instead of a generic HTTP 500. This gives integrations a clear client-side error to handle for malformed customer IDs.

**Documentation link**: [Add Transaction (V2)](https://docs.capillarytech.com/reference/add-transaction-single)

**Corrected Points Side Effect for Returns in Bulk Add/Return Transaction**

A return line item processed through the Add/Return Transaction (bulk) API now correctly appears as a points deduction, with negative `rawAwardedPoints` and `awardedPoints` values, instead of incorrectly showing up as a second positive points award. For a mixed transaction that combines a purchase and a return in the same bulk call, the purchase and return side effects are now merged into a single accurate net side effect.

**Documentation link**: [Add/Return Transaction in Bulk](https://docs.capillarytech.com/reference/addreturn-transaction-bulk)

**Points and Line-Item Details on Customer Transaction List APIs**

The Get Customer Transactions and Lookup Customer Transactions APIs now support optional query parameters to fetch loyalty points history (`includeLoyaltiesPointDetails`) and line-item details (`includeLineItemDetails`) directly in the transaction list response, avoiding a separate API call per transaction. For organizations with multiple loyalty programs, also pass `mlp=true` to retrieve points data.

**Documentation link**: [Get customer transactions](https://docs.capillarytech.com/reference/v2api-get-customer-transactions)

**Org Entity Special Characters Support**

The `code` field for stores, zones, concepts, and tills now accepts letters from any language, digits, underscores, and dots (hyphens and spaces are no longer allowed), and the `name` field is no longer character-restricted. Requests using invalid `code` characters now return the `INVALID_CHARACTERS` error.

**Documentation link**: [Add stores in bulk](https://docs.capillarytech.com/reference/add-stores-in-bulk)

**Update Default Group of a Member**

You can now set, move, or clear a user group member's default group directly through a new API, instead of only being able to set it at the time the member joins a group. Setting a new default automatically clears the member's previous one.

**Documentation link**: [Update Default Group](https://docs.capillarytech.com/reference/update-default-group-of-a-member)

**Customer Details Lookup Validation Error Codes**

The Get Customer Details lookup API (`GET /v2/customers/lookup/customerDetails`) now returns clear validation errors instead of failing when an INSTORE lookup passes `basicIdentifierLookup=TRUE` with an empty or unsupported identifier. It returns `ERR_INVALID_PARAM_PASSED` (8130) when the identifier name or value is empty, and `INVALID_IDENTIFIER_PASSED` (8013) when the identifier type is not supported.

**Documentation link**: [Get Customer Details](https://docs.capillarytech.com/reference/get-customer-details)

**Pending-Deletion Block On Customer Merge**

Customer merges are now blocked when either customer involved is in pending-deletion (PII deletion) state. Attempting such a merge returns error code `8109`. This applies to the change-identifier merge flow and customer merge requests, and only when PII deletion is enabled.

**Documentation link**: [How Data Deletion Works and What Data is Deleted](https://docs.capillarytech.com/docs/how-data-deletion-works-and-what-data-is-deleted)

**Cross-Member Ledger Reversal Visibility Fix**

The cross-member points ledger API (`scope=user`) no longer shows reversal events a member had no part in, which was previously causing an error and hiding that member's own redemption history. Each member continues to see their own redemption details as expected.

**Documentation link**: [Get group points ledger](https://docs.capillarytech.com/reference/get-group-points-ledger)

**New tabs and quick links on the Customers page**

The Customers entity page now has Customer status, Registration, and Subscription tabs alongside Labels, plus quick links to Member care and Audiences in its header. Customer status is configured directly in the tab; Registration and Subscription open in your organization settings.

**Documentation link**: [Customers entity page](https://docs.capillarytech.com/docs/customer-entities-management)

**User Group Audit Logs API**

A new API, `GET /v2/userGroup2/auditLogs`, retrieves the change history of a user group, covering both group attribute changes and membership events. Address a group by its ID, external ID, or primary member, and filter the results by feature type, actor, action, and date range, with sorting and pagination. All lookups are status-agnostic, so deleted and inactive groups keep their history reachable.

**Documentation link**: [Get user group audit logs](https://docs.capillarytech.com/reference/get-user-group-audit-logs)

# Engage

**Archive and unarchive templates**

Templates (creatives) can now be archived to keep the templates list clutter-free, and unarchived at any time to bring them back. Archiving never deletes a template or affects campaigns and journeys that already reference it. Not available for Zalo, and WhatsApp/RCS templates must reach a final approval status before they can be archived.

**Documentation link**: [Archive and unarchive templates](https://docs.capillarytech.com/docs/archive-and-unarchive-templates)

**Realtime audience filters**

Audience groups can now be built from live behavioral events and session activity instead of waiting for the next data sync, and can include anonymous website or app visitors alongside known customers. Requires the `ENABLE_REALTIME_AUDIENCE` feature flag, which is off by default and turned on per org via a Jira ticket.

**Documentation link**: [Realtime Audience Filters](https://docs.capillarytech.com/docs/realtime-audience-filters)

**Segment filtering moved into the filter list**

The **All customers or Select segments** toggle is gone. To include customers from specific segments in an audience group, add a **Segment** filter from the filter list instead, the same way you add any other filter.

**Documentation link**: [User profile based filters](https://docs.capillarytech.com/docs/user-profile-based-filters#segment)

**Archive campaigns and journeys**

Creators and Admins can now archive ended campaigns and journeys to keep the listing pages clean without deleting any data. Archived items are hidden from the default view and can be unarchived at any time. Bulk archive is supported for up to 200 items per operation. Archived campaigns and journeys remain accessible in reports, exports, and delivery logs.

**Documentation link**: <Anchor target="_blank" href="https://docs.capillarytech.com/docs/archive-campaign">Archive campaigns</Anchor> | <Anchor target="_blank" href="https://docs.capillarytech.com/docs/archive-journey">Archive journeys</Anchor>

**RCS carousel templates and SMS fallback**

You can now build RCS carousel templates, up to 10 swipeable cards, each with its own image or video, title, description, and button, and attach an optional Fallback SMS message to any RCS template so customers on non-RCS devices still get the message. RCS button URLs also support a Dynamic type that resolves from a variable at send time. Preview and Test show separate RCS and SMS Fallback tabs when a fallback is configured.

**Documentation link**: [Create RCS Template](https://docs.capillarytech.com/docs/create-rcs-template-)

**RCS engagement block in Journeys**

RCS is now available as an engagement block in Journey Builder, alongside SMS, Email, WhatsApp, and the other channels. You can add RCS creatives and incentives, and configure delivery settings, including an optional fallback SMS sender when the attached RCS template has a fallback message.

**Documentation link**: [Engagement building block](https://docs.capillarytech.com/docs/engagement-building-block)

**Web Push channel in Creatives**

Create Web Push browser notification templates in Creatives, with a title, message, image, brand icon, and up to two call-to-action buttons. Includes a live preview across operating systems (macOS, Windows, iOS, iPadOS, Android) and browsers (Chrome, Firefox, Edge, Safari, Opera).

**Documentation link**: [Create a Web Push Template](https://docs.capillarytech.com/docs/create-web-push-template)

**Test & Preview for Web Push**

Web Push templates now support Preview and Test, the same as other engagement channels. Preview notifications across operating systems and browsers, personalize with tags, and send a test push to a customer or test group before publishing.

**Documentation link**: [Test and Preview across engagement channels](https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels)

# Loyalty+

**Organize Loyalty Benefits into Categories**

New Create, Update, and Get APIs let you group loyalty benefits into categories scoped to specific tiers within a program.

**Documentation link**: [Create Benefit Category](https://docs.capillarytech.com/reference/create-benefit-category)

**Redesigned Tiers, Subscriptions, and Benefits UI**

Loyalty+ now offers a redesigned experience for Tiers, Subscription programs, and a new standalone Benefits module, built on the same maker-checker workflow as Promotions V3. The new UI is backward compatible with the existing Tiers and Subscriptions UI.

**Documentation link**: [Loyalty Programs (New UI)](https://docs.capillarytech.com/docs/loyalty-programs-new-ui)

**Activity-Level Breakdown in the Points Ledger Explode API**

The Points Ledger Explode API can now return a breakdown of how promotional points were earned across individual activities, such as specific milestones or streaks, instead of just the total. This makes it easier to explain to a member exactly which activities contributed to a points award.

**Documentation link**: [Get Points Ledger Explode Info](https://docs.capillarytech.com/reference/get-points-ledger-explode-info)

**Spend Thresholds and Wider Filtering for Loyalty Promotions**

The Issue Currency action with fixed allocation now supports an optional spend threshold, so a reward only pays out once a member's qualifying spend on filtered items or tenders crosses a value you set. Line-item filtering for issue actions also now covers tender types and product attributes, not just SKUs, brands, and categories, and each filter block can hold up to 200 attribute keys, up from 2.

**Documentation link**: [Create a Loyalty Promotion](https://docs.capillarytech.com/reference/create-a-loyalty-promotion)

**Tender-Level Attribution on Transaction Details**

The Get Transaction Details API can now return a tender-level breakdown of a transaction, showing how the reward-eligible amount and points split across each payment mode used, both at the bill level and per line item. Returns are covered too, with the reversed eligible spend and points reported separately so you can see exactly what was rolled back.

**Documentation link**: [Get Transaction Details (V2)](https://docs.capillarytech.com/reference/get-transaction-details)

**Corrected Eligible Amount on Transaction Details**

The Get Transaction Details response no longer inflates the eligible amount beyond a transaction's actual bill total. The response now separates how much of a member's spend went to each tender or item from how much of it actually earns points (returned as separate `allocatedAmount` and `eligibleAmount` fields), so the eligible portion never exceeds the transaction amount.

**Documentation link**: [Get Transaction Details (V2)](https://docs.capillarytech.com/reference/get-transaction-details)

**Pause and Resume Subscription Programs**

Members can now pause and resume their subscription (supplementary) partner program enrollment for a fixed date range instead of only being fully linked or delinked. While paused, the member's benefits under that program are suspended, and the subscription's current status and pause window are visible in the customer activity history response.

**Documentation link**: [Pause Subscription](https://docs.capillarytech.com/reference/pause-subscription)

**Loyalty Configuration Attributes on Partner Program Enrollment**

You can now capture custom loyalty configuration attributes, such as a partner tier label or a qualifying spend amount, when linking, delinking, or updating a customer's partner program enrollment. These attributes are returned in the customer activity history, so you can see exactly what was captured for each enrollment event.

**Documentation link**: [Link Customer to Partner Program](https://docs.capillarytech.com/reference/link-customer-to-partner-program__)

**Promotion Type and Loyalty Earning Type on Promotion Listing**

Member promotion responses now include a `promotionType` field that classifies each promotion (generic, loyalty, loyalty earning, direct issue, or enrol-and-issue), plus a `loyaltyEarningType` field that further distinguishes direct-earn from issue-and-earn promotions. This makes it easier for apps to categorize and display a member's promotions without inferring the type from other fields.

**Documentation link**: [List Member Promotions](https://docs.capillarytech.com/reference/list-member-promotions)

**Activity Attribution Fixed for Alternate Currency Redemptions**

Promotions that award alternate currencies now correctly attribute redemption events to the promotion activity that triggered them. Previously, some of these redemptions could show up without their activity details in a member's promotion timeline.

**Documentation link**: [List Member Promotions (Explode)](https://docs.capillarytech.com/reference/list-member-promotions-explode)

**Activity Summary and Opt-In/Opt-Out Dates on Promotion Listing**

The member promotion listing API can now optionally return an activity-level breakdown of benefits earned per promotion, along with the member's most recent opt-in and opt-out dates for each promotion. The maximum page size for this API has also been increased from 20 to 50.

**Documentation link**: [List Member Promotions](https://docs.capillarytech.com/reference/list-member-promotions)

**Promotion Details on Promised Points**

The simulation and points ledger explode APIs now return the promotion ID, name, and unique identifier for promised (delayed accrual) points earned from a promotion, matching the detail already available for immediate promotional points. This makes it easier to trace which promotion is behind a delayed points award.

**Documentation link**: [Get Points Ledger Explode Info](https://docs.capillarytech.com/reference/get-points-ledger-explode-info)

**Discard a Draft on Live Loyalty Promotions**

Makers and admins can now discard a pending draft created while editing a live promotion, instead of sending it for approval, useful when the edit was started by mistake or the live promotion has since changed. If the live promotion changes after the draft was created, Send for approval and Save and exit are disabled with a tooltip prompting you to discard and recreate the draft.

**Documentation link**: [Edit a Loyalty Promotion](https://docs.capillarytech.com/docs/loyalty-promotions-editing-a-loyalty-promotion)

**Discard a Loyalty Promotion Draft API**

A new API lets you permanently delete a pending draft on a published promotion, so you can start over with a clean edit surface without affecting the running promotion. This is the API behind the Discard Draft option now available in the UI.

**Documentation link**: [Discard a Loyalty Promotion Draft](https://docs.capillarytech.com/reference/discard-loyalty-promotion-draft)

**Backdated Tier Changes on Manual Tier Adjustment**

The Manual Tier Adjustment API now accepts an optional historical date, so you can record a tier upgrade, downgrade, or renewal as having happened on a past date instead of always using the current time. This is useful when recreating a tier change that should have been applied earlier, since the tier's expiry is calculated from that date instead of today.

**Documentation link**: [Manual Tier Adjustment](https://docs.capillarytech.com/reference/manual-tier-adjustment)

**Badge Reward Type in the Get Benefits Currency Metric**

The Reward Type filter under the Get Benefits currency metric (used to build loyalty promotion qualifying conditions) now supports Badge alongside Coupon and Reward, so you can count a member's earned badges in a condition.

**Documentation link**: [Qualifying Conditions and Attributes](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions)

**Contains and Matches Regex Fixed for Pre-Populated Attributes**

The Contains and Matches Regex operators in the Loyalty Promotions qualifying conditions builder now correctly show a text box on attributes with predefined values, such as store code, brand, or category. Previously these operators showed a dropdown of existing values instead, making it impossible to enter a substring or pattern.

**Documentation link**: [Operators](https://docs.capillarytech.com/docs/loyalty-promotions-operators)

**Date Difference Operators Fixed, Plus Is Not Between**

Selecting a date-difference operator (Date Diff, Days Diff, Days Diff from String, or Minutes Diff) on a date attribute in the Loyalty Promotions qualifying conditions builder now correctly lets you pick a comparison operator and enter a value to complete the condition. Previously the condition was marked complete as soon as you picked the difference operator, with no way to finish it. A new Is Not Between operator is also available alongside Is Between on date attributes.

**Documentation link**: [Qualifying Conditions and Attributes](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions)

**Promotion Limits, Usage, and Activity Progress in the Explode API**

The member promotion explode API can now optionally return a promotion's configured enrollment, opt-in, redemption, and KPI limits alongside the member's current usage against each one, so you can see at a glance how close a member is to hitting a cap. It can also return the member's progress on milestone and streak activities tied to the promotion, including past, current, and future cycles.

**Documentation link**: [List Member Promotions (Explode)](https://docs.capillarytech.com/reference/list-member-promotions-explode)

**Corrected Customer Promotion Benefits Summary Response**

The customer promotion benefits summary API's response has been corrected to accurately reflect the fields it actually returns, including per-incentive issuance counts and values, and a promotion identifier. The response no longer documents point and alternate currency fields that this API does not return.

**Documentation link**: [Get Customer Promotion Details](https://docs.capillarytech.com/reference/get-customer-promotion-details)

**Block Points Redemption for Merged Customer Identifiers**

The Redeem Points API now supports a `block_merged_customers` parameter. Set it to `true` to stop a redemption when the identifier passed belongs to a customer whose account was merged into another account, instead of silently redeeming against the surviving account.

**Documentation link**: [Redeem Points](https://docs.capillarytech.com/reference/redeem-points)

**Coupons, Badges, and Enrolment Status on Promotion Listing**

The member promotion listing API's activity summary now includes coupon and badge benefits alongside points, each identified by its coupon series or badge ID. The response can also include the member's current enrolment status for each promotion (not applicable to generic promotions), and an optional net points earned total.

**Documentation link**: [List Member Promotions](https://docs.capillarytech.com/reference/list-member-promotions)

**Promotions Must Now Be Created in Draft Status**

Creating a promotion with any status other than Draft is now rejected. Previously, a promotion could be created directly in an active or pending-approval state, bypassing the draft-to-approval-to-publish workflow. Omit the status field or set it to Draft, then use the review and approval APIs to move the promotion forward.

**Documentation link**: [Create a Loyalty Promotion](https://docs.capillarytech.com/reference/create-a-loyalty-promotion)

**Reliable Edit-Blocking During Promotion Approval**

Editing a promotion is now reliably rejected while it's Pending Approval, instead of occasionally letting a concurrent edit (for example, a UI draft and an API call at the same time) create a second, conflicting draft version. Recall the promotion to Draft status first if you need to make further changes.

**Documentation link**: [Update a Loyalty Promotion](https://docs.capillarytech.com/reference/update-loyalty-promotion)

# Connect+

**Query parameter support in the JSLT block**

The JSLT block now supports query parameters for API requests. You can add query parameters directly in the block's advanced properties — no need to modify the API endpoint URL or build a separate Neo dataflow. Use the **Attributes** property to preserve source field values that are removed during JSLT transformation and reference them as path parameters or request headers in the http\_write block using `$attributeName`. The **Send each record separately** property controls whether records are sent as individual API calls (`true`) or as a single bulk request (`false`).

**Documentation link**: [JSLT block](https://docs.capillarytech.com/docs/jslt-block)

# Insights

**Download export schedules to your browser**

Export Schedules now offer a **Download** destination alongside FTP. Choose **Download** to create a one-time export and download the CSV directly from the browser via the Execution Log, without setting up an FTP server. Downloading requires the Exports Admin permission, and files are limited to 10 MB (use FTP for larger exports).

**Documentation link**: [Create an export job (Step 1 of 3)](https://docs.capillarytech.com/docs/create-an-export-job-step-1-of-3)