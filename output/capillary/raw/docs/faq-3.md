---
updatedAt: 2026-05-06T18:05:27.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

# 1. Getting started

### Q: How do I enable cart promotions for my organisation?

A: Cart promotions are not enabled by default. Raise a JIRA ticket to the Capillary Product Support team and include your organisation ID and the cluster your organisation is on (IN, SG, or EU). Once enabled, you can access cart promotions from **Engage+** under the **Promotions** tab.

### Q: What is the maximum number of active cart promotions an organisation can have?

A: The default limit is **250 active cart promotions** at a time across all types. If you need more, contact the Capillary Product Support team to request an increase.

***

# 2. Promotion types

### Q: What is the difference between a POS promotion and a Loyalty cart promotion?

A:

|                       | POS promotion                                              | Loyalty cart promotion                              |
| --------------------- | ---------------------------------------------------------- | --------------------------------------------------- |
| **Who it applies to** | All customers at checkout, including non-loyalty customers | Loyalty members only                                |
| **How it is issued**  | Available automatically — no issuance needed               | Automatically available to eligible loyalty members |
| **Example**           | 50% off during Black Friday at selected stores             | 20% off on carts above $100 for all loyalty members |

### Q: When should I use a Loyalty earning promotion versus a Loyalty promotion?

A:

* Use a **Loyalty earning promotion** when you want the customer to first complete an activity (for example, make 3 purchases) to unlock a promotion, which they then redeem on a future transaction. The promotion isn't available to the customer until the system confirms the earning event.
* Use a **Loyalty promotion** when you want to make a promotion available to eligible loyalty members without requiring them to complete any activity first. Eligible customers receive the benefit automatically when their cart meets the conditions.

### Q: What is a Rewards promotion and how is it different from a Loyalty promotion?

A: A **Rewards promotion** is offered through the Rewards Catalog. Customers spend loyalty points to claim the reward, which then applies as a cart discount at checkout. Because the customer actively spends points to claim it, the promotion only becomes available after the system confirms the redemption. A **Loyalty promotion** is made available directly to eligible loyalty members without requiring them to spend points — they receive it automatically based on their profile or tier.

### Q: Can I apply a cart promotion to non-loyalty (guest) customers?

A: Yes, with **POS promotion** and **Code linked promotion**. These apply regardless of loyalty membership status. **Loyalty promotion**, **Loyalty earning promotion**, and **Rewards promotion** require the customer to be a registered loyalty member, as the system needs to verify membership, tier, or earning history to determine eligibility.

***

# 3. Configuration and rules

### Q: Can I create a promotion that applies to specific products and also requires a minimum cart total?

A: Conditions cannot be stacked with **Cart amount** — it functions as a standalone condition only. To combine product-level rules or tie a product condition to a payment method, use **+ Add condition** with **Sum of item amount for selected product**, **Sum of item quantity for selected product**, or **Payment mode** as your starting condition. For example: `Sum of item quantity (Shirts) ≥ 2` AND `Payment mode IS Visa`.

For more information, refer to [Core Concepts](https://docs.capillarytech.com/docs/core-concepts-1).

### Q: What condition types are available for cart promotions?

A:

You can map up to 250 specific products (SKUs) to a single product-based condition. This allows you to target a large set of products directly when categories or brands are not specific enough.

| Condition type                                | What it checks                                                     | Supports AND logic (+ Add condition) |
| --------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------ |
| **Cart amount**                               | Total gross value of the cart                                      | No — standalone only                 |
| **Count of items in the cart**                | Total number of items (SKUs) in the cart                           | No — standalone only                 |
| **Sum of item amount for selected product**   | Total price of specific products (up to 250 SKUs per condition)    | Yes                                  |
| **Sum of item quantity for selected product** | Total quantity of specific products (up to 250 SKUs per condition) | Yes                                  |
| **Payment mode**                              | The payment method used at checkout                                | Yes                                  |
| **Gift voucher**                              | Whether a specific gift voucher is applied                         | No — standalone only                 |

### Q: What benefit types can I configure?

A:

| Benefit type                   | What it does                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| **Fixed amount**               | Deducts a fixed currency value from the cart or product price                               |
| **Percentage based**           | Deducts a percentage of the cart total or product price                                     |
| **Free product**               | Adds a specific SKU to the cart at no cost                                                  |
| **Fixed target amount**        | Sets a bundle of items to a fixed price regardless of their individual original prices      |
| **Apply benefit on each unit** | Repeats the benefit for every qualifying group of items or every qualifying spend threshold |
| **Payment mode benefit**       | Applies a discount based on the payment method used at checkout                             |

### Q: Can I restrict a cart promotion to specific stores or time windows?

A: Yes. Under **Define scope and restrictions** in the promotion creation flow, you can limit the promotion to specific store entities (Concept, Store, or Zone) and to specific days of the week, dates of the month, or time windows.

For more information, refer to [Creating a Cart Promotion](https://docs.capillarytech.com/docs/create-a-cart-promotions).

### Q: What does the customer activation required toggle do?

A: When enabled, the promotion is issued to the customer in a deactivated state. The customer must manually activate it via the app or website before it can apply at checkout. This is supported for Loyalty Cart, Loyalty Earning, and Reward promotion types.

***

# 4. Limits and controls

### Q: Can I limit how many times a single customer can use a promotion?

A: Yes. Under **Customer limits**, you can set the maximum number of times a customer can use the promotion, with an optional reset period (Days or Weeks), and a maximum total discount value per customer.

For more information, refer to [Core Concepts](https://docs.capillarytech.com/docs/core-concepts-1).

### Q: Can I set a global cap on total redemptions for a promotion?

A: Yes. Under **Promotion limits**, set the **Total redemptions allowed** field. Once this cap is reached, the promotion stops applying for all customers, even if individual customer limits have not been reached.

### Q: Can I update limits after the promotion goes live?

A: No. Redemption restrictions — cart limits, customer limits, and promotion limits — cannot be updated once the promotion is live. Plan your limits carefully before activating the promotion. If limits need to change, you must disable the current promotion and create a new one.

### Q: What are the available reset period cycle types and how do they differ?

A: The reset period controls when a customer's individual usage counter resets. There are five cycle types:

| Cycle type               | How it works                                                                                                                                                                                                               | Example                                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **every X days**         | The counter resets every X days. Set a reference date when configuring the promotion — all cycles count forward from that date.                                                                                            | Reset every 7 days from January 1 — resets on January 8, January 15, and so on.                                           |
| **every week**           | The counter resets at the start of a configurable weekday. Enter the number of weeks in the interval and select the weekday that begins each cycle — for example, Monday for a Mon–Sun week, or Sunday for a Sun–Sat week. | Set to 1 week starting Monday — a customer who uses the promotion on Wednesday gets a fresh counter the following Monday. |
| **every calendar month** | The counter resets on the first day of each calendar month. No additional configuration is needed.                                                                                                                         | Usage in January does not carry over to February.                                                                         |
| **for last X days**      | A rolling window — the system counts only redemptions in the last X days at any given moment. No calendar boundary.                                                                                                        | With a limit of 2 uses per 30 days: a use on January 5 clears from the count on February 4.                               |
| **for last X weeks**     | A rolling window — the system counts only redemptions in the last X weeks. The week boundary is fixed as Sunday to Saturday and is not configurable.                                                                       | With a limit of 1 use per 2 weeks: a use on Monday clears from the count 14 days later.                                   |

**every X days**, **every week**, and **every calendar month** are fixed-window cycles — the counter resets on a set schedule. **for last X days** and **for last X weeks** are rolling-window cycles — the window moves continuously relative to each redemption. You cannot combine fixed-window and rolling-window cycles in the same promotion.

***

# 5. Fraud prevention

### Q: What is cart locking and do I need to enable it?

A: Cart locking temporarily reserves a promotion when it is applied to a cart, preventing it from being applied to another cart for the same customer before the first transaction completes. This prevents a loophole where the same promotion could be redeemed multiple times before the system registers the first redemption.

Cart locking is automatically enabled. You do not need to turn it on manually.

For more information, refer to [Preventing Fraudulent Redemptions](https://docs.capillarytech.com/docs/preventing-fraudulent-redemptions).

### Q: A customer's cart is locked and they cannot use their promotion. How do I release it?

A: A locked cart can be released in two ways:

* **Manually**: From the evaluation log in Engage+, find the cart by its cart identifier and select **Release cart**.
* **Automatically**: The lock releases after 24 hours if no transaction confirmation is received.

<br />