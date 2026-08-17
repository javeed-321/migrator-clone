---
updatedAt: 2026-06-03T06:34:17.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Rewards Catalog FAQ

# 1. Getting Started & Access

### Q: How do I turn on the Rewards Catalog for my organization?

The Rewards Catalog is not turned on by default. Raise a ticket to the Capillary Product Support team and include your organization ID and the cluster your organization is on (IN, SG, or EU). Once turned on, go to **Rewards+** > **Rewards Catalog** to access it.

### Q: What permissions do I need to create and manage rewards?

| Permission             | Access granted                                 |
| :--------------------- | :--------------------------------------------- |
| **Reward Create**      | Create new rewards and configure all settings. |
| **Reward Edit**        | Edit existing rewards.                         |
| **Reward Detail View** | View reward details in read-only mode.         |

Contact your organization administrator to assign the appropriate permissions. See [User Management](https://docs.capillarytech.com/docs/new-user-management-overview) for instructions.

### Q: Do I need to configure anything before creating my first reward?

Yes. Some fields in the reward creation flow (categories, groups, custom fields, and languages) only appear if you have already added them in settings. Configure these first under **Rewards+** > **Settings** (the icon in the top-right corner of the Rewards Catalog page). If you skip this step, those fields will be empty when you reach them during reward creation.

For more information, see [Rewards Catalog settings](https://docs.capillarytech.com/docs/rewards-catalog-settings).

### Q: What is the difference between a reward and a loyalty promotion?

A **reward** is a redeemable benefit that defines what a customer receives, such as a gift card or voucher. A **loyalty promotion** is a time-bound campaign that defines when and how a customer qualifies to earn something. A loyalty promotion can issue rewards from the catalog as its benefit, but the two are configured independently.

|                          | Reward                                   | Loyalty promotion                             |
| :----------------------- | :--------------------------------------- | :-------------------------------------------- |
| **Purpose**              | Defines a redeemable benefit             | Defines an earning campaign                   |
| **Customer interaction** | Customers browse and redeem              | Customers qualify and earn                    |
| **Duration**             | Has a validity window                    | Has an active campaign window                 |
| **Example**              | "₹500 Amazon gift card for 2,000 points" | "Spend ₹1,000 three times to win a gift card" |

***

# 2. Reward Types

### Q: How many reward types are available, and how do I choose the right one?

There are 14 reward types, grouped by how they deliver value:

| Group                           | Types                                                                           | When to use                                                                                                                          |
| :------------------------------ | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Direct value delivery**       | Coupon, Gift card, Gift voucher, Cashback, Wallet offer, Miles, Physical reward | When you want to put money, credits, codes, or goods directly in the customer's hands.                                               |
| **Engagement and experience**   | Games, Auction, Sweepstakes                                                     | When the goal is participation and excitement, where the customer spends points for a chance to win rather than a guaranteed payout. |
| **Automatic and transactional** | Cart promotion, Card linked                                                     | When you want the benefit to trigger automatically with no customer action beyond the qualifying transaction.                        |
| **Partner and external**        | Vendor only reward                                                              | When a third-party vendor owns fulfilment and the catalog is the front-end entry point.                                              |
| **Social**                      | Charity                                                                         | When customers want to donate points to a charitable cause rather than receive a personal benefit.                                   |

For more information, see [Reward types](https://docs.capillarytech.com/docs/reward-types).

### Q: What is the difference between a Coupon and a Gift voucher?

A **Coupon** issues a unique or common discount code that a customer applies at checkout to get a configured discount on specific products, categories, or order values. A **Gift voucher** is redeemable for a specific product, service, or experience at a participating outlet, tied to a predefined item or event rather than a discount code.

### Q: What is the difference between a Vendor intouch reward and a Vendor only reward?

With a **Vendor intouch reward**, Capillary records the issual and forwards the fulfilment request to the vendor. Capillary tracks the transaction while the vendor delivers the benefit. With a **Vendor only reward**, the entire redemption and delivery happen outside the platform through vendor APIs. Capillary sends the redemption request to the vendor, but the vendor manages and fulfils everything independently.

### Q: Can I change a reward's type after it is created?

You can change the reward type while the reward is in **Upcoming** status. Changing it resets any incentive you have already linked in Step 3. The system shows a warning before applying the change. Once the reward goes **Live**, the type locks and cannot be changed.

***

# 3. Cost, Audience & Inventory

### Q: What payment modes can customers use to redeem a reward?

Customers can pay with points, cash, or a combination of both. You can add up to five payment modes per reward. The payment mode options available depend on your organization's configuration.

### Q: Can I restrict a reward so only specific customers can see or redeem it?

Yes. In Step 2 of reward creation, you can target the reward to specific customers by:

* **Loyalty program**: only members of a specific program.
* **Tier**: only members at a specific tier level.
* **Segment**: only customers in a defined audience segment.
* **Customer label**: only customers tagged with a specific label.
* **Card series**: only customers associated with a specific card series.

Select **All Customers** to make the reward visible and redeemable by your entire customer base.

### Q: How do inventory limits work, and what is the difference between customer-level and reward-level limits?

Inventory limits control how many times a reward can be redeemed:

* **Customer-level limits** set a limit on how many times a single customer can redeem the reward within a reset window.
* **Reward-level limits** set a limit on the total number of redemptions across all customers. Once this limit is reached, the reward stops being available to everyone.

Both types of limits can be set by **quantity** (number of redemptions) or **value** (total points or cash), with fixed or rolling reset windows. Limits can be updated while the reward is **Upcoming** or **Live**, but lock once the reward has **Ended** and become the historical record.

### Q: Can I set an organization-wide limit on how many points any customer can redeem?

Yes. Under **Settings** > **Redemption Limit**, you can create rules that limit the maximum points any customer can redeem within a defined timeframe: daily, weekly, monthly, or as a lifetime limit. These rules apply across all rewards, not to a specific reward. You can also restrict a limit to a specific reward type, such as Auction or Gift card.

If multiple rules are active, they stack, meaning a customer must have headroom under all active rules to redeem. You can configure up to 15 redemption limits per organization.

For more information, see [Redemption limit](https://docs.capillarytech.com/docs/rewards-catalog-settings#redemption-limit).

***

# 4. Reward Lifecycle & Activation

### Q: What are the lifecycle statuses and what changes at each stage?

| Status       | What it means                                                  | What changes                                                                             |
| :----------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| **Upcoming** | The reward has been created but its start date hasn't arrived. | No customer can see or redeem the reward. All fields are editable.                       |
| **Live**     | The reward is within its active duration.                      | Redemptions open. The start date and reward type lock and can no longer be changed.      |
| **Ended**    | The reward's end date has passed.                              | Redemptions close automatically. Inventory limits lock and become the historical record. |

### Q: What is the difference between lifecycle status and activation status?

**Lifecycle status** is automatic; the system sets it based on the reward's start and end dates. **Activation status** is a manual control you toggle. A reward can be **Live** in lifecycle terms but **Inactive** in activation terms. In that state, the reward is completely invisible to customers even though its dates are active. This lets you pause a live reward without changing its schedule, for example during a stock issue or system outage.

### Q: Can I edit a reward after it goes live?

Yes, most fields remain editable while a reward is **Live**. The fields that lock once live are the **start date** and **reward type**. Changing either would create inconsistencies for customers who have already seen or redeemed the reward. All other fields (name, end date, audience, cost, content, and metadata) can be updated at any time.

### Q: What happens if I set no end date for a reward?

The reward stays **Live** indefinitely until you either manually deactivate it using the **Activate reward** toggle or set an end date by editing the reward's duration.

***

# 5. Settings: Categories, Groups, and Languages

### Q: What is the difference between categories and groups?

**Categories** are used for filtering. When you assign a category to a reward, it appears when customers filter the catalog by that category. Without a category, the reward appears only in the unfiltered "All" view.

**Groups** are browsable collections that appear as named sections in the customer-facing catalog. When you assign a reward to a group, customers navigating that group see it listed there. Groups support multi-level nesting to create a hierarchy, for example `Seasonal / Winter 2025 / Clothing`.

### Q: If I deactivate a category, what happens to rewards already using it?

The category tag is removed from all rewards that currently use it. Those rewards aren't deleted; they continue to appear in the catalog under the unfiltered "All" view. If you reactivate the category, previously assigned rewards are **not** automatically re-linked. You need to re-assign the category to each reward manually.

### Q: What are custom fields, and when should I use them?

Custom fields let you attach extra metadata to rewards beyond the standard fields. There are three scopes:

| Scope                 | Where it appears                                        | What it captures                                                          |
| :-------------------- | :------------------------------------------------------ | :------------------------------------------------------------------------ |
| **Reward creation**   | Step 5 when creating or editing a reward                | Extra detail about the reward, such as a budget code or localized tagline |
| **Reward issual**     | When an operator issues a reward to a specific customer | Per-transaction data at the moment of issual                              |
| **Catalog promotion** | In promotion rules that reference the catalog           | Data used by promotion logic to reference catalog items                   |

Supported data types include Boolean, Date and time, Enum, Number, String, and Rich text. You can add up to 20 active Rich text custom fields per organization.

### Q: What happens to customers when I deactivate a language?

Customers whose language preference matches the deactivated language immediately see the reward in the default language (English). Their ability to see and redeem the reward is not affected. The language configuration is preserved and can be reactivated at any time. Languages cannot be deleted, only deactivated.

***

# 6. Sweepstakes & Auctions

### Q: How are sweepstakes and auctions different from other reward types?

Most rewards are self-contained; a customer redeems and immediately receives something. Sweepstakes and auctions span a lifecycle: customers enter during an active window, winners are selected later, and the prize is claimed in a separate step. The Rewards Catalog handles the front-end configuration and entry. The actual entry tracking, winner selection, and prize fulfilment happen through backend systems wired up through vendors and vendor redemptions.

### Q: What do I need to configure before creating a sweepstakes or auction reward?

Two backend components must be configured before the reward goes live:

* **A vendor**: the third-party system that processes entries. Configure it with OAuth client credentials (`client` and `secret`) via [Create a Vendor](https://docs.capillarytech.com/reference/createvendor).
* **A vendor redemption**: the action the vendor takes when the reward is issued, which is issuing an entry coupon to the customer. Create it via [Create Vendor Redemption](https://docs.capillarytech.com/reference/post_api-gateway-rewards-core-v1-vendor-redemption-create).

Both the `vendorId` and `vendorRedemption` ID must be included in the reward payload when you create the reward. Once set up, no further manual steps are needed; entry coupon issuance happens automatically.

### Q: How does a customer's entry get recorded in a sweepstakes?

When a customer enters, [Issue single reward](https://docs.capillarytech.com/reference/post-issue-user-reward) (`POST /api_gateway/rewards/core/v1/user/rewards/issue`) is called. This issues the catalog reward and immediately triggers the linked vendor redemption. The vendor then calls [Issue single coupon](https://docs.capillarytech.com/reference/issue-single-coupon) to push an entry coupon from the configured series to the customer. Each entry generates one coupon, and this coupon pool is what winner selection queries later.

### Q: How are winners selected and notified?

On the draw date, a scheduled Databricks notebook queries the entry coupon pool and applies the selection logic (random draw for sweepstakes, top bidders for auctions) to produce a winner list. This runs entirely outside the catalog. For each winner, [Update fulfillment status and transaction custom fields for issued rewards](https://docs.capillarytech.com/reference/update-fulfilment-status-and-txn-custom-fields) is called to set the status to `WON` (sweepstakes) or `BID_WON` (auction). Winner notifications go out via Connect+ at this point.

### Q: How does a winner claim their prize?

The catalog reads the fulfilment status and unlocks the **claim prize** flow only for transactions with `WON` or `BID_WON` status. The winner returns to the catalog, where the winning coupon (configured on the reward via `winning_coupon_series_id` and `winning_coupon` custom fields) is issued to them as the prize.

***

# 7. Managing Rewards

### Q: When I duplicate a reward, what carries over to the copy?

All settings carry over: the incentive link, cost structure, audience filters, inventory limits, multi-language content, and metadata fields. The duplicate lands in **Upcoming** status with its activation status set to **Inactive**.

**Important:** The duplicate has the same name and duration as the original. If the original has already ended, the duplicate immediately enters **Ended** status the moment it is created. Always update the name and duration before activating.

### Q: Can I temporarily hide a live reward without ending it?

Yes. Use the **activation toggle** in the **Actions** column on the Rewards Catalog home page, or turn off the **Activate reward** toggle in Step 1 of the edit flow. Setting the reward to **Inactive** makes it completely invisible to customers and blocks all redemptions, while preserving the reward's dates and configuration. You can re-activate it at any time.

### Q: Is there a way to find recently modified rewards?

Yes. On the Rewards Catalog home page, select the **Last updated** column header to sort the list by the most recently modified reward. You can also use the **Filters** panel to narrow results by status, activation status, reward type, vendor, or date range.

***

# 8. Terminologies & Mapping

The following table maps common terms to their equivalents in the Rewards Catalog.

| Term                  | What it means in Rewards Catalog                                                                                                                                                                    |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Reward**            | A redeemable benefit a customer can claim from the catalog, such as a voucher, gift card, or physical item.                                                                                         |
| **Incentive**         | The pre-built backend object that defines the mechanics of the reward (discount value, code generation method, auction parameters, and so on). Each reward type links to a specific incentive type. |
| **Lifecycle status**  | The automatic status the system assigns based on the reward's dates: Upcoming, Live, or Ended.                                                                                                      |
| **Activation status** | The manual on/off control for whether the reward is visible and redeemable. Active or Inactive.                                                                                                     |
| **Inventory limit**   | A cap on how many times a reward can be redeemed, at the customer level or the total reward level.                                                                                                  |
| **Redemption limit**  | An organization-wide points cap that restricts how many points any customer can redeem within a defined timeframe, across rewards.                                                                  |
| **Category**          | A tag assigned to a reward that lets customers filter the catalog.                                                                                                                                  |
| **Group**             | A browsable collection in the customer-facing catalog. Rewards assigned to a group appear when customers navigate that group.                                                                       |
| **Custom field**      | An extra metadata field attached to a reward beyond the standard fields. Scope determines where it appears (reward creation, reward issual, or catalog promotion).                                  |
| **Fulfilment status** | A label shown on the customer's order tracking view after redeeming a physical reward, such as Shipped or Delivered. Updated manually by an operator or an integrated system.                       |
| **Vendor**            | The third-party system that processes entries or fulfilment for sweepstakes, auction, vendor only, and vendor intouch rewards.                                                                      |
| **Vendor redemption** | The action definition that tells the vendor what to do when a reward is issued. For sweepstakes and auctions, this is issuing an entry coupon.                                                      |
| **Draw date**         | The date on which winners are selected for a sweepstakes or auction. Runs as a scheduled backend job outside the catalog.                                                                           |

<br />