---
updatedAt: 2026-04-30T09:35:06.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# January-February-March 2026

# Engage

**Unified Test and Preview Across Engagement Channels**\
You can now preview and send test messages for all engagement channels except Line and WeChat, ensuring content accuracy before campaigns are sent. This feature supports only for approved templates as per channel-specific approval requirements, helping marketing managers validate messages as end users will see them. Easily resolve tags and test communications directly from creatives or campaign flows.

**Documentation link** - <https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels>

**Launch of HTML Email Message Editor**

Marketers can now create dynamic email templates using the HTML editor, with step-by-step guidance for incorporating Liquid expressions to personalize content. The editor offers real-time preview, robust validation for security and compatibility, and best practices for error handling. These enhancements empower brands to design engaging, secure, and responsive email campaigns with ease.

**Documentation link**: <https://docs.capillarytech.com/docs/configure-email#creating-an-email-using-the-html-editor>

**Choose Sender ID in Test and Preview for SMS, Email, and WhatsApp**\
You can now select the desired sender ID when previewing and testing messages for SMS, email, and WhatsApp channels. This enhancement ensures your test messages accurately reflect the sender identity and improve validation. Easily verify message appearance and sender details before sending to your audience.

**Documentation**: <https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels>

**Enhanced Dynamic Labels Usage in Creatives**

Dynamic labels can now be freely added to message content within the creatives section, allowing for personalized communications such as recipient names and event details. During campaign setup, the system restricts the use of unsupported or incorrect labels to ensure message accuracy. Manual label entry and template testing remain available in the creatives section for greater flexibility.

**Documentation link**: <https://docs.capillarytech.com/docs/labels>

**Updated Liquid Expression Validation Workflow in Creatives**

Liquid expressions in SMS, Push Notification, In-App, and Email templates are no longer strictly validated during template creation in the Creatives section. Users can save templates with any Liquid expressions and use Test & Preview without immediate validation errors. However, invalid or unsupported Liquid expressions will trigger errors during campaign creation, preventing the selection or use of such templates.

**Documentation**:  <https://docs.capillarytech.com/docs/add-dynamic-content-using-liquid>

# Customer Data Platform

**Revamped Data Import Framework with Databricks Integration**

The Data Import framework has been redesigned for faster, large-scale data migrations, now supporting direct imports from Databricks. Users can easily configure import jobs, map fields, and monitor progress in real time, streamlining historical data migration without impacting live loyalty processes.

Documentation: <https://docs.capillarytech.com/docs/data-import-new>

**Cortex search auto-enabled for new orgs** Cortex search is now automatically enabled for every new org at creation, along with a default prefix search criteria covering full name, email, external ID, and phone number. No manual configuration or support ticket is needed. Orgs created before this release are unaffected.

**Documentation**: [Search filter for entities](https://docs.capillarytech.com/docs/overview-search-filter#search-auto-enable-for-new-orgs)

**PII deletion now covers merged victim accounts** When a PII deletion request is raised for a survivor account, the system now automatically deletes the PII data of all victim accounts previously merged into it, up to a depth of 10. Identifiers are released for all accounts in the chain with no additional requests needed.

**Documentation**: [How data deletion works and what data is deleted](https://docs.capillarytech.com/docs/how-data-deletion-works-and-what-data-is-deleted)

**Block communication now enforced across all user-facing APIs** Block communication rules configured against customer status labels are now correctly enforced. Previously, `user_id` was not passed to the downstream communication service, so blocks were not honored. With this fix, all communications — transactional and promotional — are suppressed for customers with block communication active on their status label.

**Documentation**: [Customer status — block communications](https://docs.capillarytech.com/docs/customer_entity#suspended-fraud-suspected-fraud-confirmed-and-internal-customer-status)

**Bulk store update API** You can now update up to 200 stores in a single API call using the new `PUT /v2/orgEntity/store/bulk` endpoint, identified by store code.

**Documentation**: [Bulk update stores](https://docs.capillarytech.com/reference/put_v2-orgentity-store-bulk)

**V2 Transactions API — SKU code in points breakup and bill number enhancements** The V2 transactions API response now includes `sku_code` in the points breakup object. Additionally, `GET v2/transactions` by bill number now supports the `pointBreakups` parameter and loyalty point detail params, consistent with the main V2 transactions endpoint.

**Documentation**: [Get transaction details](https://docs.capillarytech.com/reference/get-transaction-details)

**`CONF_ORG_DISABLE_MACHINE_TIME_CONV` configuration deprecated**

The `CONF_ORG_DISABLE_MACHINE_TIME_CONV` org configuration is now deprecated. This setting, which suppressed machine-time conversion in billing time responses, was a temporary migration aid for clients moving from v1.1 to v2. Since timezone offset is now captured natively, this configuration is no longer required and should not be used in new implementations.

**Connect+**

Connect+ is Capillary’s no-code platform for building and automating data pipelines without developer support. With this UI, you can create dataflows that read from SFTP, FTP, S3, and Kafka; transform data using JSLT scripting, field mapping, filtering, and Databricks-powered validation; and write to SFTP, FTP, S3, Kafka, and Capillary APIs. You can create, modify, and copy dataflows using the visual drag-and-drop canvas or aiRA Coder, the built-in AI assistant that generates configurations from natural language prompts.

**Documentation**: <https://docs.capillarytech.com/docs/connect-plus>

# Neo

**Introducing Dataflow Promotion Across Organizations** The new Promote feature in Neo enables seamless, controlled deployment of approved or live dataflows between organizations within the same cluster. It enforces permission and hierarchy checks, ensuring only eligible dataflows are transferred. This streamlines migration, reduces manual effort, and enhances governance for production-ready workflows.

**Documentation**: [Promoting a dataflow](https://docs.capillarytech.com/docs/promote-dataflow)

**Conditional Middleware Execution by Application Context** Dataflows can now access the application context during execution, enabling middleware to run conditionally based on the calling application's name. The new getApplicationName function lets developers tailor middleware logic for specific applications, improving flexibility and efficiency in multi-application environments. This update streamlines middleware management and enhances control over dataflow execution paths.

**Documentation**: [Application context in dataflow execution](https://docs.capillarytech.com/docs/using-applications#application-context-in-dataflow-execution)

# Incentives

### Improved Coupon Issuance Source tracking

Coupon issuance APIs now capture detailed source information, including Source ID, Source Type, and Notes. These fields make it easier to trace exactly where a coupon came from, improving reporting accuracy and attribution.

For more details, refer to <Anchor label="Get coupon details" target="_blank" href="https://docs.capillarytech.com/reference/get-coupon-details">Get coupon details</Anchor>

### Fixed Window Limits for Cart Promotions

Cart Promotions now support fixed window limits, enabling brands to set promotion restrictions that reset on calendar months, weeks, or custom N-day cycles. This enhancement allows for more flexible business rules and better alignment with billing cycles and campaigns, without affecting existing promotion behaviors.

For more details, refer to [Create cart promotions](https://docs.capillarytech.com/reference/create-cart-promotion-api)

### Payment Mode Conditions for Cart Promotions

Cart Promotions now support payment mode-based conditions, enabling offers triggered by how customers pay (e.g., with points or specific cards). New condition types allow combining payment methods with product or combo requirements, expanding promotional flexibility for merchants.

For more details, refer to <Anchor label="Create cart promotions" target="_blank" href="https://docs.capillarytech.com/reference/create-cart-promotion-api">Create cart promotions</Anchor>

### Cart Promotions can be filtered by Last Modified Date

The Cart Promotions Get API now supports filtering results by the last modified date using the 'sort\_by' parameter. This enhancement enables real-time identification of recently updated promotions, improving operational efficiency for integrations.

For more details, refer to <Anchor label="Get all cart promotion details" target="_blank" href="https://docs.capillarytech.com/reference/get_all_cart_promotion_details">Get all cart promotion details</Anchor>\_

# Loyalty

**Updated Loyalty Promotions User Interface and Experience** The Loyalty Promotions module has undergone a significant overhaul, replacing the previous interface with a new dropdown based design. This updated experience streamlines the creation and management of time-bound loyalty promotions, making it easier to launch targeted promotions that reward specific member behaviours.

* **Activity-Based and Broadcast Promotions**: Members can earn rewards through two distinct paths: activity-based promotions that issue rewards after completing a specific task, and broadcast promotions that issue rewards without requiring any specific task. For example, a member can earn a bonus coupon after completing their first purchase of the month, or they can receive a surprise points drop as part of a nationwide holiday giveaway.
* Milestone and Streak Challenges: Instead of just earning points per purchase, members can be enrolled in a milestone to reach a long-term spending goal or streaks to reward consistent behavior over time. For example, run 50 kilometres in the month of March as part of the "Spring Fitness" promotion to earn coupons on fitness products.
* **Diversified Reward Options**: The system moves beyond simple point-earning. A single promotion can now trigger up to 10 different benefits, including issuing discount coupons, awarding badges, granting instant tier upgrades, or enrolling members into exclusive subscription programs.
* **Precision Targeting and Personalization**: Promotions can be narrowed down to specific store locations, certain product categories, or even specific items in a basket. This ensures members receive offers that are actually relevant to their personal shopping habits and local availability.
* **Flexible Participation**: Promotions are designed to be frictionless; members can be automatically entered into promotions if they qualify or given the choice to opt-in to specific promotion.
* Reliable Limits and Budgeting: You can configure user-level, promotion-level and earning-level limits for promotions. These limits prevent abuse and ensure that promotional budgets are distributed fairly so that more members can enjoy the benefits.
* Role Based Access Control: The new maker-checker workflow ensures that every promotion is reviewed and approved by a separate authority before going live. This results in a more structured process to ensure accountability and fewer technical errors.

**Documentation**: [Loyalty Promotions](https://docs.capillarytech.com/docs/loyalty-promotions)

**Support for 'Earn Reward Currency' Member Action in Loyalty Promotions** A new member action now checks if members have earned reward currency before granting additional rewards, such as coupons. For instance, members who accumulate 1,000 points within a month will receive a 50% off coupon.

**Documentation**: [Loyalty Promotions Member Actions](https://docs.capillarytech.com/docs/loyalty-promotions-member-actions)

**New Member Selection Options for Activity-Based Loyalty Promotions** When creating or updating activity-based promotions, you can now target Loyal members, Non-loyal members, or All members using the new `customerEligibilityType` parameter. This gives promotion builders precise control over which customer segments qualify for rewards.

**Documentation**: [Creating a Loyalty Promotion](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion)

**Enhanced Coupon Issuance Metadata Tracking for Loyalty Promotions** The Issue Coupon action now supports additional metadata fields: notes, reason, source type, source ID, and source activity, enabling improved auditability and traceability for each coupon issued.

**Documentation**: [Loyalty Promotions Member Actions](https://docs.capillarytech.com/docs/loyalty-promotions-member-actions)

**Line Item Aggregation and Source Value Rounding for Issue Actions in Loyalty Promotions** Issue Currency, Issue Coupon, and Issue Reward actions now support line item aggregation. You can choose between calculating the action on the total transaction value or independently per line item. Source value rounding is also now configurable for Issue Coupon and Issue Reward, with Round up, Round down, and Round to nearest integer options.

**Documentation**: [Loyalty Promotions Actions](https://docs.capillarytech.com/docs/loyalty-promotions-actions)

**New Event Location Qualifying Condition for Loyalty Promotions** Promotion builders can now filter qualifying events through the concept, zone, or till using the new **Event Location** condition. This enables precise location-based promotion targeting within the rule builder, going beyond store attributes to filter on the actual source of the triggering event.

**Documentation**: [Loyalty Promotions Qualifying Conditions](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions)

**Broadcast Promotions** Loyalty promotions now let you create broadcast-style promotions that issue rewards  such as coupons, points, or badges without requiring a triggering purchase event. This gives promotion builders a simpler, direct path for delivering rewards to eligible members at any time.

**Documentation**: [Create a Broadcast Promotion](https://docs.capillarytech.com/docs/create-a-broadcast-promotion)

**Unified Promotions API Endpoint Renamed to /v3/promotions** The Unified Promotions API base path has changed from `/v3/unifiedPromotions` to `/v3/promotions`. All API references, curl examples, and documentation have been updated. Integrators using the old path should update their implementations accordingly.

**Documentation**: [Create a Loyalty Promotion](https://docs.capillarytech.com/reference/create-a-loyalty-promotion)

**Opt-In Window Support Added to Create Loyalty Promotion API** The Create a Loyalty Promotion API now supports configurable opt-in windows via `optInStartDate` and `optInEndDate` in the `workflowMetadata.optin` object. This allows brands to define a distinct window during which members can opt in, separate from the promotion's active period. Requires the `CONF_ENROLMENT_OPTIN_DURATION_ENABLED` org flag.

**Documentation**: [Create a Loyalty Promotion](https://docs.capillarytech.com/reference/create-a-loyalty-promotion)

**Rolling Period Limits for Issue Currency Action in Loyalty Promotions** The Issue Currency action now supports rolling period-based limits in addition to fixed windows. You can now configure limits that reset over a rolling time window, such as a rolling 30-day period, giving more flexibility in how earning caps are applied across ongoing promotions.

**Documentation**: [Loyalty Promotions Actions - Strategies for Expiring Currency](https://docs.capillarytech.com/docs/loyalty-promotions-actions#strategies-for-expiring-currency)

**Enhanced Loyalty Promotion APIs with External ID, Opt-In Date, and Customer Timeline Support** The Loyalty Promotion APIs now support richer data for customer-facing promotion interactions. The GET customer promotion call returns promotion metadata, customer timeline, and custom fields, and supports filtering by external promotion ID and availability (opt-in, enroll, redeem). The POST opt-in/earn call now accepts a promotion external ID, opt-in date, enrolment window, and custom fields on enrolment.

**Documentation**: [Create a Loyalty Promotion](https://docs.capillarytech.com/reference/create-a-loyalty-promotion)

**State-Aware Editing for Loyalty Promotions** Promotions can now be edited across all lifecycle states (draft, upcoming, live, paused, and ended, with field-level restrictions clearly defined per state. Editing a live promotion creates a separate draft without interrupting the active promotion. Cycle-level editing is also now supported for live promotions, including extending the current cycle and adding or updating future cycles.

**Documentation**: [Editing a Loyalty Promotion](https://docs.capillarytech.com/docs/loyalty-promotions-editing-a-loyalty-promotion)

**New Currency Awarded Attributes for Qualifying Conditions in Loyalty Promotions** Six new purchase attributes are now available in the loyalty promotion rule builder **Currency Awarded On Event** and its User, User Group, and Promised variants. These let promotion builders write conditions based on the amount of currency awarded (or promised) in the current transaction, enabling post-earn conditional rewards.

**Documentation**: [Loyalty Promotions Qualifying Conditions](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions)

**Enhanced Filter Options for Issue-Based Actions in Loyalty Pormotions** Users can now include or exclude specific filters when configuring issue-based actions, providing greater flexibility and control for more precise targeting. Actions are applied only to relevant issues based on defined criteria.

**Documentation**: [Loyalty Promotions Actions](https://docs.capillarytech.com/docs/loyalty-promotions-actions)

**Non-Redeemable Points Attribute in Rule Writing in Loyalty+ programs** A new qualifying condition attribute, `CurrentTxnNonRedeemablePoints`, is now available in the loyalty promotion rule builder. This attribute represents the non-redeemable portion of points in the current transaction, enabling promotion builders to write conditions based on points that cannot be redeemed, supporting more granular, points-type-aware reward logic.

**Documentation**: [Attribute: Transaction Points](https://docs.capillarytech.com/docs/attribute-transaction-points)

**Promotion Enrolment and Opt-In Tracking in Loyalty Promotions** Loyalty promotions now track member enrolments and opt-ins as distinct, auditable events. The opt-in and enrolment sections in the promotion builder have been updated with new actions and API integrations to record when a member opts in or is enrolled, making it easier to monitor promotion participation and build conditions based on enrolment state.

**Documentation**: [Loyalty Promotions Member Actions](https://docs.capillarytech.com/docs/loyalty-promotions-member-actions)

**Communication Tags for All Incentive Actions on Loyalty+** Promotion builders can now configure communication tags for all incentive action types, **Issue Currency**, **Issue Coupon**, **Issue Reward**, and **Issue Badge**. These bulk tags are passed through to the communication service, enabling downstream messaging systems to reference what was awarded in a promotion action. Tags support both points and alternate currency for Issue Currency, and cover coupon, reward, and badge for their respective actions.

**Documentation**: [Loyalty Promotions Actions](https://docs.capillarytech.com/docs/loyalty-promotions-actions)

# Insights

Insights+ now supports module-level role-based access control (RBAC) with three permission sets: Insights View, Insights Create, and Insights Admin. Permissions are managed per module, allowing precise control over who can view, create, edit, or delete content within Reports, Segments, Exports, Chart Library, External Facts, and Settings. This enhancement improves security, compliance, and operational flexibility for administrators managing user access within Insights+. RBAC doesn't apply to KPIs and dimensions. All users with Insights+ access can view, create, edit, and delete KPIs and dimensions regardless of their assigned permission set.

**Documentation**: <https://docs.capillarytech.com/docs/insights-plus-overview#who-can-access-insights>