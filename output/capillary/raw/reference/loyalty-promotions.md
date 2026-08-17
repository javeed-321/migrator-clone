---
updatedAt: 2026-08-04T06:16:55.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Loyalty Promotions

Loyalty Promotions are time-bound programs designed to reward members with incentives, such as bonus points or coupons beyond standard program benefits. These promotions drive engagement and sales by triggering rewards for specific activities, including transactions, reaching milestones, or updating profiles.

### **What you can do**

You can use the Loyalty Promotions APIs to:

* **Create and Update:** You can create and update unified promotions with various earning rules, including single or grouped activities, to meet your specific requirements.
* **Manage Enrollment:** You can configure the promotion with opt-in enrollment, allowing members to join via transactions, audience lists, or direct API calls.
* **Review and Approve:** Review and approve promotions to transition them from draft to active states using the review workflow.
* **Search and Filter:** Search for promotions using text-based queries and status filters for efficient management.
* **Configure Limits:** You can configure limits for enrollments, points, and redemptions at the user, promotion, or activity level.
* **Split Liability:** You can split liability for rewards between different programs or partners to balance costs.

Note: Promotions are managed through status updates; for example, you can set the status as `EXPIRED`. The one exception is a pending draft on a published promotion, which you can permanently delete with the [Discard a Loyalty Promotion Draft](https://docs.capillarytech.com/reference/discard-loyalty-promotion-draft) endpoint.

### **Search behaviour**

Search across Loyalty Promotions APIs uses **text-based matching** and **status filtering**.

When you pass a search query:

* **searchText**: The API filters promotions by name or description containing the specific keywords (e.g., "Holiday Bonus").
* **status**: You can filter by specific states such as `DRAFT`, `ACTIVE`, `PAUSED`, `PENDING_APPROVAL`, `LIVE`, or `UPCOMING`.
* **includeDraftDetails**: Set this to true to retrieve the unpublished draft information of a live promotion.

### **Promotion Structure**

The Loyalty Promotions APIs utilize three major structures to define the logic of how rewards are earned:

1. **Activities**
   These are the specific actions a customer must perform to trigger a reward. These can be configured in two ways:

   * Single Activity: A standalone requirement.

     Example: Spend $100 in a single transaction to receive a 12% discount.

   * Group Activity: Multiple requirements that must be met together.

     Example: Spend $100 and purchase two items from the "Footwear" category to receive a 12% discount.

2. **Cycles**
   Cycles define the specific validity period for individual activities or the promotion as a whole.

Example: A 14-day window during a "New Year" campaign where all required activities must be completed to qualify for rewards.

3. **Milestones**
   Milestones are used to track a user's incremental progress toward a reward within a defined cycle.

Example: Hitting a $500 spend mark to automatically trigger a tier upgrade from "Silver" to "Gold" status.

### **Enrolment Models**

The APIs support different [enrolment methods](https://docs.capillarytech.com/reference/create-a-loyalty-promotion?isFramePreview=true#member-enrolment-and-workflows-object-table) to determine how members are enrolled into a promotion:

* **TRANSACTION**: Automatically enrols members when they perform a qualifying purchase.
* **OPT\_IN**: Members are enrolled via an API call or external trigger.
* **AUDIENCE**: Audience enrollment automatically signs up members for a promotion based on their audience group, requiring no manual action from the user.

Example: Pre-enrolling all **"Gold Tier" members** for a festive sale.

### **Limits and Liability**

You can set limits and split the liability of a particular promotion for budget control and fraud prevention:

### **1. Limits**

Defines the limits for rewards to control the budget and prevent over-redemption by restricting the count or frequency.

### [Limits](https://www.google.com/search?q=%5Bhttps://docs.capillarytech.com/reference/create-a-loyalty-promotion%3FisFramePreview%3Dtrue%23limits-object%5D\(https://docs.capillarytech.com/reference/create-a-loyalty-promotion%3FisFramePreview%3Dtrue%23limits-object\)) are applied at three distinct levels:

* ### User Level:
  Restricts how much a single customer can earn.

Example: A member can earn a maximum of 500 points per month (Frequency) or is limited to 3 "Refer-a-Friend" bonuses total (Count).

* ### Promotion Level:
  Restricts the total promotion amount for the entire campaign budget.

Example: The first 10,000 customers to shop get a free voucher; once hit, the promotion will end.

* ### Earn Level:
  Restricts a specific earning rule within a promotion.

Example: In a "Double Points" weekend, the "Double" bonus is limited to the first $200 spent per transaction.

### **2. Liability Split**

Distributes the financial cost of a reward across different business units or external partners using the [liabilityOwnerSplitInfo](https://www.google.com/search?q=%5Bhttps://docs.capillarytech.com/reference/create-a-loyalty-promotion%3FisFramePreview%3Dtrue%23liabilityownersplitinfo-object%5D\(https://docs.capillarytech.com/reference/create-a-loyalty-promotion%3FisFramePreview%3Dtrue%23liabilityownersplitinfo-object\)) object.

Example: For a "Co-branded Credit Card" promotion, the Bank pays 70% of the points cost, and the Retailer pays 30%.

### **Pagination**

All list and search APIs enforce pagination.

* Default size is 10.
* Use page (0-indexed) to retrieve the next set of records.
* Batch support is **not available** for retrieval.

## **QuickStart: set up promotions using the Loyalty Promotions APIs**

Use this sequence to configure and launch a new loyalty campaign.

### **Step 1: Create a promotion**

Use the [Create a Loyalty Promotion](https://docs.capillarytech.com/reference/create-a-loyalty-promotion#the-activities-object-1) to define the promotion's metadata, earning rules (activities), and validity period. The promotion will be created in DRAFT status.

### **Step 2: Refine configuration**

Use the Update a [Loyalty Promotion](https://docs.capillarytech.com/reference/update-loyalty-promotion) to update limits, add liability splits, or modify enrolment criteria before the promotion goes live.

### **Step 3: Review and Approve**

Use the [Review API](https://docs.capillarytech.com/reference/review-loyalty-promotion) to submit an APPROVE action. This transitions the promotion from DRAFT or PENDING\_APPROVAL to ACTIVE.

### **Step 4: Enrol Members**

If the promotion requires manual entry, use the [Enrol API](https://docs.capillarytech.com/reference/enrol-loyalty-promotion) to add members or trigger an opt-in.

### **Step 5: Retrieve and Verify**

Use the [GET APIs](https://docs.capillarytech.com/reference/get-loyalty-promotion-all) to search for the promotion by ID or text (searchText) to verify its status and configuration details.

<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .api-sidebar-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: inherit; 
            padding: 10px;
            max-width: 100%;
        }
        .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .nav-item {
            margin-bottom: 8px;
            border-radius: 8px;
            transition: all 0.25s ease;
            border: 1px solid rgba(128, 128, 128, 0.2);
            background-color: rgba(128, 128, 128, 0.05);
            overflow: hidden;
        }
        .nav-item:hover {
            background-color: rgba(0, 66, 154, 0.1);
            transform: translateX(4px);
            border-color: #007AFF;
        }
        .nav-link {
            text-decoration: none !important;
            border-bottom: none !important;
            color: inherit !important;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 14px;
            font-size: 14px;
            font-weight: 500;
        }
        .badge {
            font-size: 10px;
            font-weight: 800;
            padding: 2px 8px;
            border-radius: 4px;
            min-width: 42px;
            text-align: center;
            text-transform: uppercase;
            flex-shrink: 0;
            opacity: 0.85;
        }
        .post { background-color: #2ea44f; color: #ffffff; }
        .put  { background-color: #f7811d; color: #ffffff; }
        .get  { background-color: #007AFF; color: #ffffff; }
        .delete { background-color: #d73a49; color: #ffffff; }
        .nav-item:hover .badge {
            opacity: 1;
            box-shadow: 0 0 10px rgba(0, 122, 255, 0.4);
        }
        .nav-item:hover .nav-link {
            color: #007AFF !important;
        }
    </style>
</head>
<body>
<div class="api-sidebar-container">
    <ul class="nav-list">
        <li class="nav-item">
            <a href="/reference/create-a-loyalty-promotion" class="nav-link">
                <span>Create a Loyalty Promotion</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/review-loyalty-promotion" class="nav-link">
                <span>Review a Loyalty Promotion</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/enrol-loyalty-promotion" class="nav-link">
                <span>Enrol Members</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/update-loyalty-promotion" class="nav-link">
                <span>Update Promotion</span>
                <span class="badge put">PUT</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/discard-loyalty-promotion-draft" class="nav-link">
                <span>Discard Draft</span>
                <span class="badge delete">DELETE</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/get-loyalty-promotion-id" class="nav-link">
                <span>Get Details (ID)</span>
                <span class="badge get">GET</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/list-member-promotions" class="nav-link">
                <span>List Member Promotions</span>
                <span class="badge get">GET</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/list-member-promotions-explode" class="nav-link">
                <span>Get Member Promotion Explode Details</span>
                <span class="badge get">GET</span>
            </a>
        </li>
    </ul>
</div>
</body>
</html>
`}</HTMLBlock>

<br />

## Old Loyalty Promotions

The Loyalty Promotion are of three types:

* Available without issue - Accessible to all customers and automatically triggered based on predefined rules, behavioural events, or milestone completions. Benefits such as points, tier upgrades, coupons, or badges are directly provided when customers meet the defined criteria.
* Direct issue - A specific promotion is issued to customers based on their behaviour or transactions. Customers must meet the criteria during a future transaction to receive the benefits. This process is initiated through workflows like TransactionAdd or Behavioral events.
* Enroll & Issue - Requires customers to opt in or enrol before receiving a promotion. Involves three steps: enrollment, completing specific actions, and receiving benefits. These promotions engage customers through an interactive approach, targeting specific audiences.

| **Type of Promotion**       | API for Single Issuance and Enrolment                                | API for Bulk Issuance and Enrolment (Can be also used for Single Issual and Enrolment) | API for Revoking Promotion             |
| --------------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :------------------------------------- |
| **Available without issue** | -                                                                    | -                                                                                      | -                                      |
| **Direct issue**            | `v2/promotion/issue` - Promotion type should be **LOYALTY**          | `v2/promotion/bulk/directEarn`- Promotion type should be **LOYALTY**                   | `v2/promotion/bulk/revokeDirectEarn`   |
| **Enroll & Issue**          | `v2/promotion/issue` - Promotion type should be **LOYALTY\_EARNING** | `v2/promotion/bulk/enrolAndEarn`- Promotion type should be **LOYALTY\_EARNING**        | `v2/promotion/bulk/revokeEnrolAndEarn` |

# Terminologies

The table below highlights backend terminologies and their corresponding terms used in the UI/frontend:

| UI/Frontend terminology | Backend terminology | Description                                                                                                                                                                |
| :---------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enrol                   | Issue               | The customer is enrolled into a promotion.                                                                                                                                 |
| Issue                   | Earn                | The customer completes the required activity to earn the promotion. Once the promotion is earned, the customer can fulfil the criteria to receive the associated benefits. |

**Note:** For Direct issue promotions, reward points are only credited after the promotion has been issued to the customer. Triggering the tracker event alone does not award points.

For more information and use cases, refer to the user [documentation on Loyalty Promotions](https://docs.capillarytech.com/docs/loyalty-promotions-basic-and-advanced).