---
updatedAt: 2026-06-11T12:11:44.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

# 1. Getting Started & Permissions

### Q: What is the primary difference between a loyalty program and a loyalty promotion?

A: A **loyalty program** is your foundational, always-on framework such as earning 1 point per $1 spent or tier upgrades. A **loyalty promotion** is a time-limited, tactical layer that sits on top of the program to drive specific behaviors like "Earn 2x points this weekend" or "Bonus points for buying a specific product."
For more information, refer [Core Concepts](https://docs.capillarytech.com/docs/loyalty-promotions-core-concepts).

### Q: How can I get access to the new loyalty promotion UI?

A: Access to the new UI is managed via the **User Management** tool. Your CSM or Org Owner must provide you with a "Standard User" profile and enable four specific permission sets: **loyalty promotion Set**, **loyalty promotion Editor**, **loyalty promotion Viewer**, and **loyalty promotion Approver**. If you are an Org Owner and cannot see the new UI, you may need to manually enable these permissions for your own profile.

### Q: What is the maker-checker workflow, and why do I need it?

A: The maker-checker workflow is a security and quality control feature. It separates the role of creating a **loyalty promotion** (maker) from the role of approving it (checker). This prevents unauthorized changes and ensures a second pair of eyes reviews configuration errors before a **loyalty promotion** goes live.
For more information, refer [Role-based access control](https://docs.capillarytech.com/docs/loyalty-promotions-introduction#role-based-access-control-maker-checker).

### Q: I am a "maker." Can I delete or stop a loyalty promotion?

A: Makers can **pause** a live **loyalty promotion** to temporarily stop evaluations. However, only a user with **admin** privileges can **stop** a **loyalty promotion**. Stopping is a permanent action that archives the **loyalty promotion**, which is why it is restricted to admins.
For more information, refer [Pausing and Ending a Loyalty Promotion](https://docs.capillarytech.com/docs/loyalty-promotions-pausing-and-ending-a-loyalty-promotion).

### Q: Can I edit a loyalty promotion once it is live? Does it stop working while I edit?

A: Yes, you can edit a live **loyalty promotion**, and **no**, the live version does not stop working. When you edit a **live** **loyalty promotion**, the system creates a separate **draft** version. The original **loyalty promotion** remains live and continues to reward customers exactly as before. Once the new draft is approved by a checker, it replaces the live version, and the previous version is archived as a **snapshot**.
For more information, refer [Editing a Loyalty Promotion](https://docs.capillarytech.com/docs/loyalty-promotions-editing-a-loyalty-promotion).

### Q: Can I test or simulate a loyalty promotion while it is still in the "draft" state?

A: No. Currently, you cannot simulate a **loyalty promotion**'s behavior while it is in the **draft** state. The **loyalty promotion** must be **live** to be evaluated against transactions or events.

***

# 2. Feature Parity & Migration (Old vs. New UI)

### Q: Will the new loyalty promotion UI be turned on by default for all organizations?

A: For organizations created after January 2026, the new UI is turned on by default. For existing organizations, it is not turned on automatically. You must reach out to your CSM or the product support team to enable it for specific UAT or production organizations.
For more information, refer [Viewing a Loyalty Promotion](https://docs.capillarytech.com/docs/loyalty-promotions-viewing-a-loyalty-promotion).

### Q: Can the old and new loyalty promotion UIs run in parallel?

A: Yes. During the transition, both interfaces can coexist. You can use a toggle menu on the listing page to move between the **Old UI** and **New UI**.

* Existing **loyalty promotions** created in the old UI will continue to run and can be managed there.
* New **loyalty promotions** should be created in the new UI.

For more information, refer [Viewing Old Loyalty Promotions](https://docs.capillarytech.com/docs/loyalty-promotions-viewing-a-loyalty-promotion#viewing-old-loyalty-promotions).

### Q: Is there a global search feature in the new UI?

A: Yes. The new UI includes a global search bar that allows you to find a **loyalty promotion** using its Name, Description, Promotion ID, or External ID.

### Q: Can I skip years in the date picker when setting the loyalty promotion duration?

A: Yes. The new date picker includes a "Next Year" button, allowing you to quickly jump across long durations without clicking through individual months.

### Q: When duplicating a loyalty promotion, is *everything* copied over?

A: Almost everything, like rules, limits, and audience, is copied, with one exception: **Communication (CCS) configurations are NOT copied.** You will need to re-configure the specific creative content, such as SMS or email templates, for the new **loyalty promotion**. This is a safety measure to prevent accidental messaging with incorrect or outdated content.
For more information, refer [Duplicating a Loyalty Promotion](https://docs.capillarytech.com/docs/loyalty-promotions-duplicating-a-loyalty-promotion).

### Q: Will AIRA be available for configuration in the new UI?

A: No. AIRA is currently available to use on the old (v2) loyalty promotions UI.

### Q: What happens to the allocation strategy name from the previous UI? Will the API response return blank?

A: In the new UI, the allocation strategy is assigned an auto-generated name automatically. This name appears wherever the strategy is referenced, including in MemberCare under transaction points and in the Points Ledger Explode APIs. It will not be blank.

### Q: Are direct issue promotions supported in the new UI?

A: Yes. Direct issue promotions are still supported. As shown in the [Terminologies and Mapping](https://docs.capillarytech.com/docs/loyalty-promotions-faqs#7-terminologies--mapping) table, "Direct Issue" corresponds to **Enrolment: Activity-based**, where a customer qualifies via a specific event. This is configured by selecting **Specific members** followed by **Activity-based** during the enrollment step. The [Opt-in](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#step-3-defining-how-members-join-optional-opt-in) option, previously called "Enrol and Issue," allows customers to explicitly join a promotion before earning.

### Q: How are milestone IDs handled in the new UI? Is there still a separate page for milestone creation?

A: Milestones are now created as part of the [promotion creation flow](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#to-configure-a-milestone-activity) rather than on a separate page. Once created, milestones are accessible via the relevant [GET promotion APIs](https://docs.capillarytech.com/reference/get-promotion-by-id), which also return the associated IDs. The IDs are surfaced through API responses rather than a standalone page.

***

# 3. Configuration & Rules (New Features)

### Q: Do I still need to write manual expressions for rules?

A: No. The new UI uses an intuitive dropdown-based rule builder. Instead of writing text expressions, you select the entity such as **Purchase Attribute**, choose a field like **Value**, and select an operator like **Greater than or equal to**.

### Q: What is the difference between Purchase, Customer, and Activity attributes?

A: These attributes categorize the data you use for your qualifying conditions:

* **Purchase Attribute:** Transaction-level data for example, total bill value or store code.
* **Customer Attribute:** Member-level data such as age, country of residence, or a specific customer extended field.
* **Activity Attribute:** Event-level data specific to behavioral triggers like the "feedback" field from a "test drive" event.

### Q: What is a "group of activities" and how is it different from milestones?

A: A **Group of Activities** is a container that allows you to nest multiple distinct actions together and define the logic (AND/OR) between them.

* **Use Case:** You want a customer to "Make a Transaction" **AND** "Update their Profile" to earn a reward.
* **Difference:** A **Milestone** tracks the cumulative progress of a *single* metric over time like spending $500. A Group of Activities tracks the completion of *different* tasks.

For more information, refer [Define a group of earning activities](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#option-2-define-a-group-of-earning-activities).

### Q: Does the system support "AND" and "OR" logic between different activities?

A: Yes.

* **Within a single activity:** All qualifying conditions are treated as **AND**. The customer must meet every condition defined in that activity to qualify.
* **Across different activities:** By default, separate activities act as **OR** conditions for example, complete Activity A *or* Activity B. However, you can use the **Group of Activities** feature to enforce **AND** logic (complete all) or specific **OR** logic (complete any X number of activities).

For more information, refer [Define a group of earning activities](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#option-2-define-a-group-of-earning-activities).

### Q: Can I track transaction count and amount together? ("2x points on the 2nd transaction in a day")

A: Yes.

* **Tracking:** You can configure a **Streak** or **Milestone** based on "Transaction Count" to target the "2nd transaction."
* **Reward Logic:** In the **Issue Currency** action for that activity, select the **Multiplier** strategy like 2x to award double points upon the completion of that specific milestone.

For more information, refer [Issue Currency](https://docs.capillarytech.com/docs/loyalty-promotions-actions#issue-currency).

### Q: Can I write rules based on specific store zones or concepts?

A: Yes, you can create rules based on store attributes using the `Purchase Store` entity. You can filter by attributes such as `Name`, `Code`, or `Custom Fields` like those used to define zones. For handling large lists such as 100+ stores, the new UI supports a **bulk upload** feature where you can upload a CSV file containing the store codes.
For more information, refer [Purchase Store](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#purchase-store).

### Q: Are there OR conditions for items such as Item A OR Item B?

A: Yes. You can use the **"Is One Of"** operator for fields like SKU, Brand, or Category. This allows you to select multiple values like Item A, Item B, and Item C, and the rule passes if the transaction contains *any* of them.
For more information, refer [Operators](https://docs.capillarytech.com/docs/loyalty-promotions-operators#1-standard-comparison-operators).

### Q: How do milestones and streaks work in the new UI?

A: You no longer need to configure milestones or streaks in a separate module. You can now define the milestone or streak logic (targets, timeframes, and cycles) directly within the **activities** section of your **loyalty promotion**.

### Q: Does the point rewarding section support decimal values, or are only integers allowed?

A: The fixed points entry only supports integer values. Decimal values are not supported for fixed point amounts.

### Q: Is the point expiry time configurable, or is it always set to 23:59?

A: The expiry time is always set to **23:59**. Point expiry is processed by a scheduled bulk job that runs at end-of-day, so a custom time within the day cannot be defined.

### Q: Is it possible to stop point allocation if the bill discount exceeds a specific percentage?

A: Dynamic runtime rules of this kind are not supported in the new UI's dropdown-based [rule builder](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions). This requirement can be achieved by computing the discount percentage externally at an integration or NEO level, then passing the pre-calculated value as an attribute in the transaction payload. This attribute can then be used as a [qualifying condition](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions) in the promotion.

### Q: How can complex, cascading OR rules be replicated in the new dropdown rule builder without losing flexibility?

A: The new UI handles complex logic through a structured visual approach. Key tools available are:

* **Multiple activities as OR:** Each activity added to a promotion acts as an OR condition by default, allowing large sets of OR conditions to be built across activities (up to 25 individual activities per promotion).
* **[Group of Activities](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#option-2-define-a-group-of-earning-activities) for nested AND/OR:** Use the Group of Activities feature to nest sub-activities and sub-groups with their own AND/OR logic for multi-level conditions.
* **["Is One Of" operator](https://docs.capillarytech.com/docs/loyalty-promotions-operators#1-standard-comparison-operators):** For rules matching multiple values such as SKUs, stores, or categories, this operator lets you select or upload multiple values in a single condition instead of chaining individual OR rules.
* **CSV bulk upload:** For large lists of 100+ stores or SKUs, use the bulk CSV upload to avoid manual entry.

For setups that exceed these structural limits or require highly complex logic, the **[Loyalty Promotions APIs](https://docs.capillarytech.com/reference/unified-promotions)** can be used to configure promotions programmatically with greater flexibility.

### Q: Is there a way for power users to use expression-based rule authoring alongside the dropdown builder?

A: Expression-based rule writing is not available in the new Loyalty Promotions UI, which uses a visual dropdown [rule builder](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions). Power users can use the **[Loyalty Promotions APIs](https://docs.capillarytech.com/reference/unified-promotions)** to create and configure promotions programmatically, which offers greater flexibility for complex setups. The **[Workflows module](https://docs.capillarytech.com/docs/workflows)** in Loyalty+ continues to use the traditional expression editor for program-level rules.

### Q: Is there a limit on the number of SKUs that can be uploaded, and is there support for reusable SKU groups?

A: The [Upload SKU feature](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#step-4-defining-earning-activities) is available across qualifying conditions in single, milestone, and streak activities. For large product catalogs, an alternative approach is to use [category, brand, or product attribute](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#purchase-attributes) qualifiers instead of enumerating individual SKU codes, which avoids SKU list size constraints entirely. Reusable SKU groups are not supported in the new UI at this time. If the per-file SKU upload limit needs to be reviewed or increased, raise this with the Capillary product team.

### Q: Are there published performance benchmarks for promotions with large rule sets or high SKU volumes?

A: Performance benchmarks for large rule sets or high SKU volumes are not published in the current documentation. The new UI has structural limits, specifically up to 25 individual activities and up to 10 groups/sub-activities per promotion, which naturally caps the complexity of any single promotion configuration. For questions about evaluation latency at scale or high-volume SKU handling, contact your CSM or the Capillary product support team.

***

# 4. Enrollment, Opt-in & Targets

### Q: How does opt-in work for loyalty promotions?

A: Opt-in is optional and requires customers to signal their interest explicitly before they participate. You can set this up in two ways:

* **Activity-based:** The customer must perform a specific action that you define, such as selecting a button in an app or making a qualifying purchase.
* **External trigger:** An API call from an external system opts the customer in.

For more information, refer [Defining how members join (Optional opt-in)](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#step-3-defining-how-members-join-optional-opt-in).

### Q: How do I  include more than one segment (audience group)? Is multi-segment OR logic supported?

A: Yes. During the **enrollment** step, you can select the "Audience Group" option and check multiple groups from the list. The system applies **OR** logic by default, meaning if a customer belongs to *any* of the selected groups, they are eligible for the **loyalty promotion**.
For more information, refer [Enroling a predefined audience group](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#enroling-a-predefined-audience-group).

### Q: Can I use segments from Insights+?

A: Yes, the "Audience Groups" available for selection in the enrollment step are synced from your organization's segments which are often managed via Insights+.
For more information, refer [Enroling a predefined audience group](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#enroling-a-predefined-audience-group).

### Q: Can I set different targets for different customers within the same loyalty promotion?

A: Yes, using the **individual milestones** feature. You can upload a CSV file containing customer identifiers and specific target values.

* **Important:** If your CSV contains customers who are **not** part of the selected audience group, the system will **implicitly enroll** them into the **loyalty promotion** automatically.

For more information, refer [To configure a milestone activity](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#to-configure-a-milestone-activity).

### Q: Can behavior event-based enrollment be restricted based on specific attribute values in the event payload?

A: Yes. Qualifying conditions can be written based on specific [activity attributes](https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#activity-attributes) within the behavior event, so not every matching event will enroll the customer. Enrollment can be restricted based on event source, event date, or any custom attributes defined on the event. For example, if the behavior event is "completing a survey," the promotion can be configured so that a customer is only enrolled if the survey feedback attribute equals "good."

### Q: If a customer does not meet a point threshold at the time of promotion setup but meets it later, when will they be enrolled?

A: The customer will be enrolled as per the **audience refresh** cycle. [Audience groups](https://docs.capillarytech.com/docs/loyalty-promotions-creating-a-loyalty-promotion#enroling-a-predefined-audience-group) used in the enrollment step are synced from segments managed via Insights+, and enrollment reflects the state of that segment at each refresh. Once the segment is refreshed and the customer meets the criteria, they will be enrolled in the promotion at that point.

***

# 5. Rewards & Actions

### Q: Where can I find the "award points" action?

A: The "award points" action has been renamed to **issue currency** to better reflect the ability to issue various types of rewards like points or miles.
For more information, refer [Issue Currency](https://docs.capillarytech.com/docs/loyalty-promotions-actions#issue-currency).

### Q: Does the new UI support WhatsApp for notifications?

A: Yes. WhatsApp is now available as a communication channel within the **loyalty promotion** UI. You can select it alongside SMS and Email when configuring brand actions. Note that your WhatsApp gateway must be pre-configured in the system.

### Q: Are "Issue Coupon" and "Send Communication" separate actions?

A: Yes, they are separate brand actions in the list. However, you can configure the notification like Email, SMS, or WhatsApp **directly inside the Issue Coupon action**, without needing to add a separate "Send Communication" action.
For more information, refer [Issue Coupon](https://docs.capillarytech.com/docs/loyalty-promotions-actions#issue-coupon).

### Q: Can I create an Offer Series directly within the loyalty promotion builder?

A: No. You must first create the Offer Series in the **Offers** module. Once created, it will appear as a selectable option in the dropdown when you configure an "Issue Coupon" action in your **loyalty promotion**.

***

# 6. Operational & Technical FAQs

### Q: Is "Define Limit" the same as points capping?

A: The **"Define Limits"** section covers all types of capping. You can configure:

* **Sum of Currency:** This acts as points capping for example, max 500 points per customer.
* **Count of Activity:** This caps the number of times an action can be rewarded such as max 3 redemptions.

For more information, refer [Loyalty Promotion Limits](https://docs.capillarytech.com/docs/loyalty-promotions-limits).

### Q: How does the new analytics dashboard work?

A: The new UI features a dynamic analytics dashboard that provides a quick view of your **loyalty promotion**'s performance. It displays relevant KPIs based on your configuration, such as points issued, coupons awarded, or enrollment counts. For deeper reporting, you should still refer to Insights+.

### Q: How do I identify which activity triggered a reward in the evaluation logs?

A:

* For **single** activities: The log will explicitly display the `Activity Name` and `Activity ID`.
* For **milestone/streak** activities: The `Activity Name` is included as part of the **rule set name** in the logs.

For more information, refer [Viewing analytics for a loyalty promotion](https://docs.capillarytech.com/docs/loyalty-promotions-viewing-a-loyalty-promotion#viewing-analytics-for-a-loyalty-promotion).

### Q: Can I search for a member to see whether they benefited from a loyalty promotion?

A: No, there is no direct member search within the **loyalty promotion** reporting UI. To find this information, check the member's timeline or transaction history in the **Member Care** module, or use the analytics exports.
For more information, refer [Viewing analytics for a loyalty promotion](https://docs.capillarytech.com/docs/loyalty-promotions-viewing-a-loyalty-promotion#viewing-analytics-for-a-loyalty-promotion).

### Q: Will points be awarded if I configure "Points allocation while maximizing tenders" in a loyalty promotion?

A: No. **Points allocation while maximizing tenders** (tender maximization) is not supported at the loyalty promotion level. This feature only works within the base program workflow. If your promotion uses this setting, no points will be awarded and customer usage counts will remain at zero. This capability is planned for a future release.

### Q: I updated a promotion's rules, but the system is still evaluating the old rule. Why?

A: The system caches promotion rulesets for performance. After you save changes to a promotion's qualifying conditions or actions, the cache may still hold the previous version and continue evaluating it until the cache is refreshed.

To force the system to pick up your latest changes immediately, clear the EMF cache:

1. Go to **Org Settings**.
2. Open **EMF Configurations**.
3. Click **Clear Cache**.

Once cleared, the next transaction or event will be evaluated against the updated rules. If you are testing immediately after a rule change, always clear the cache first to ensure your test reflects the new configuration.

***

# 7. Terminologies & Mapping

The following table maps terms used in the old system to their equivalents in the new **loyalty promotion** system.

| Old Terminology / Concept           | New Terminology / Concept               | Description                                                                                                                                                 |
| :---------------------------------- | :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Campaign**                        | **Loyalty promotion**                   | The overarching object defining the time-bound offer.                                                                                                       |
| **Award Points / Allocate Points**  | **Issue Currency**                      | The action of giving points or other loyalty currencies to a customer.                                                                                      |
| **Upgrade / Renew Tier**            | **Manage Tier**                         | A consolidated action that handles upgrading, downgrading, and renewing customer tiers.                                                                     |
| **Rules / Conditions / Expression** | **Qualifying Conditions**               | The specific logic such as "Transaction > $50" a customer must meet. In the new UI, this is built using a visual builder.                                   |
| **Scope (Stores, Zones, Concepts)** | **Qualifying Conditions (Attributes)**  | Store inclusions/exclusions are now configured as **Qualifying Conditions** using **Purchase Store** attributes for example, `Store Code is One Of...`.     |
| **KPI / Target**                    | **Milestone Target**                    | The cumulative value a customer must reach like "Spend $500".                                                                                               |
| **Forward to Set**                  | **Group of Activities**                 | Complex logic like verifying multiple distinct actions is now handled by nesting actions within a **Group of Activities**.                                  |
| **Available to Issue (Generic)**    | **Enrolment: All members**              | A **loyalty promotion** accessible to everyone is now configured by selecting **"All members of the program"** during Enrolment.                            |
| **Direct Issue**                    | **Enrolment: Activity-based**           | A **loyalty promotion** where a user qualifies via an event is now configured by selecting **"Specific members"** -> **"Activity-based"** during Enrolment. |
| **Enrol & Issue**                   | **Opt-in**                              | The requirement for a customer to explicitly join is now configured in the **"Defining how members join"** step by selecting **Opt-in**.                    |
| **Communication**                   | **CCS (Central Communication Service)** | The integrated engine used for notifications directly within actions like "Issue Currency" or "Issue Coupon."                                               |