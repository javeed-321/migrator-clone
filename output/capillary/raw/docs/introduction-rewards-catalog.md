---
updatedAt: 2026-08-11T13:22:24.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Introduction

The Rewards Catalog is used for creating, publishing, and managing all rewards available to your customers. It gives loyalty administrators full control over what rewards customers can discover and redeem, from vouchers and gift cards to physical merchandise and charity donations.

Rewards in the catalog operate independently of any specific loyalty promotion. They define what a customer can receive, while loyalty programs and promotions define when and how a customer earns the right to redeem them.

# **Key features**

* **Flexible reward types:** Build rewards across 14 categories, including vouchers, gift cards, cashback, miles, games, auctions, sweepstakes, and physical goods.
* **Multiple cost configuration:** Let customers pay with points, cash, or a combination of both. Add up to five payment modes per reward.
* **Audience targeting:** Restrict rewards to specific customers by loyalty program, tier, segment, customer label, or card series, or make them available to all customers.
* **Inventory limits:** Control how many times a reward can be redeemed, at both the individual customer level and the total reward level. Set limits by quantity or value, with fixed or rolling reset windows.
* **Multi-language support:** Localize reward names, descriptions, terms and conditions, and media for a global audience, all from a single reward configuration.
* **Reward metadata:** Organize rewards using rank, groups, categories, priority, tier, and label fields.
* **Duplicate reward configurations:** Copy any existing reward to create a new version quickly, with all settings preserved.

# **Where rewards are used**

Rewards you configure here can be issued automatically by other areas of the Capillary platform. Each integration selects a reward by ID and issues it when its own trigger condition is met.

| Integration            | How it issues rewards                                                                                                                                                                                    | Learn more                                                                                                                   |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Loyalty+ workflows** | The **Issue Catalog Reward** action in a workflow rule issues a reward when a customer triggers an event such as registration, a transaction, or a points redemption.                                    | [Issue Catalog Reward from Loyalty Workflow](https://docs.capillarytech.com/docs/issue-catalog-reward-from-loyalty-workflow) |
| **Loyalty promotions** | The **Issue Reward** brand action issues a reward when a customer meets the promotion's earning conditions, such as reaching a minimum transaction value or completing a required number of purchases.   | [Brand Actions](https://docs.capillarytech.com/docs/loyalty-promotions-actions)                                              |
| **Milestones**         | When a customer's cumulative activity crosses the milestone target, the milestone triggers a connected loyalty promotion, which issues the reward via the **Issue Reward** action.                       | [Milestones](https://docs.capillarytech.com/docs/milestones-new-flow)                                                        |
| **Streaks**            | When a customer completes the required activity across every consecutive period in a streak, the streak triggers a connected loyalty promotion, which issues the reward via the **Issue Reward** action. | [Streaks](https://docs.capillarytech.com/docs/streaks)                                                                       |

# **Reward lifecycle**

Every reward moves through a lifecycle based on its configured duration. The system sets the lifecycle status automatically from the reward's start and end dates, you can't set it manually.

| Status       | What it means                                                                                           | What practically changes                                                                                                                                |
| :----------- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Upcoming** | The reward has been created but its start date hasn't arrived. The configuration can still be modified. | No customer can see or redeem the reward. All fields are editable.                                                                                      |
| **Live**     | The reward is within its active duration.                                                               | Redemptions open. Customers in the defined audience can now see and redeem the reward. Start date locks it can no longer be changed. Reward type locks. |
| **Ended**    | The reward's end date has passed.                                                                       | Redemptions close automatically. The reward disappears from the customer-facing catalog. Reward history and reports retain all issued data.             |

## Activation status

In addition to lifecycle status, each reward has an **activation status** that you control manually:

| Activation status | What customers experience                                                                                                                     |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Active**        | The reward appears in the catalog and eligible customers can redeem it.                                                                       |
| **Inactive**      | The reward is completely invisible to customers and can't be redeemed. The configuration is preserved and you can re-activate it at any time. |

**Activation and lifecycle work independently.** A reward can be **Live** in lifecycle terms (within its date range) but **Inactive** in activation terms (toggled off). In that state, the reward is invisible to customers even though its dates are active. This lets you pause a live reward without changing its dates, for example, to suspend redemptions during a stock issue or system outage without altering the reward's schedule.

# **Access to Rewards Catalog**

Go to **Rewards from the side navigation bar**.<br />Rewards Catalog isn't turned on by default for all organizations, to turn it on, raise a ticket to the Capillary Product Support team.

# **Role-based access**

Access to the Rewards Catalog is controlled by user permissions:

| Permission             | Access granted                                 |
| :--------------------- | :--------------------------------------------- |
| **Reward Create**      | Create new rewards and configure all settings. |
| **Reward Edit**        | Edit existing rewards.                         |
| **Reward Detail View** | View reward details in read-only mode.         |

Contact your organization administrator to assign permissions. See [User Management](https://docs.capillarytech.com/docs/new-user-management-overview) for more information.

# **Before you begin**

Configure the following in the Rewards Catalog settings before creating rewards. Options you add in settings become available in the reward creation flow. If you skip this step, those fields are empty when you need them.

| Prerequisite             | Where do you use it in reward creation                                                                                                                          |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Incentives (in Loyalty+) | Step 3, Link a pre-built incentive object of the correct type to the reward. Incentives must exist and be active in Loyalty+ before you can complete this step. |
| Custom fields            | Step 5, Add organization-specific metadata fields to the reward.                                                                                                |
| Languages                | Step 5, Configure localized names, descriptions, terms, and images per language.                                                                                |
| Categories               | Step 6, Assign the reward to a browsable category so customers can filter by it.                                                                                |
| Groups                   | Step 6, Assign the reward to a navigable group collection in the catalog.                                                                                       |

# **Examples**

## Example 1: Tiered redemption catalog (retail)

**Use case:** A fashion retailer wants Gold members to access premium rewards while Silver members see a basic catalog.

**Configuration:** Two sets of rewards are created, targeting **Gold tier** members and one for **Silver tier** members, each with a different cost structure.

**Outcome:** Customers feel their tier status gives them exclusive access, improving loyalty program stickiness.

## Example 2: Mixed points and cash redemption (retail)

**Use case:** A supermarket chain wants customers to redeem rewards even when they don't have enough points for a full redemption, so more customers complete a redemption on each visit.

**Configuration:** Rewards are configured with a Cash + Points payment mode. For example, a ₹500 gift voucher costs either 1,000 points or 500 points + ₹250 cash. Both options appear on the reward detail page and customers choose how to pay.

**Outcome:** Customers with low point balances use cash to top up, increasing redemption rates and reducing point liability while keeping customers engaged with the catalog.

## Example 3: Flash sale reward (food and beverage)

**Use case:** A coffee chain wants to run a 48-hour exclusive offer where the first 500 customers can redeem a free dessert voucher.

**Configuration:** A **Gift voucher** reward with a 48-hour duration, a reward-level inventory limit of 500 total redemptions, and a customer-level limit of one redemption per customer.

**Outcome:** Scarcity and exclusivity drive urgency, and the inventory limit keeps promotion costs controlled.