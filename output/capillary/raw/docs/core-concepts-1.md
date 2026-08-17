---
updatedAt: 2026-08-13T19:54:17.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Core Concepts

Cart promotions help to provide immediate purchase incentives by offering real-time benefits at the point of sale. Unlike loyalty programs that reward behavior over time, these promotions automatically scan the cart, check the rules, and apply rewards the moment conditions are met.

Every cart promotion is built on four key components:

| Component                 | Purpose                                                                        |
| :------------------------ | :----------------------------------------------------------------------------- |
| **Eligibility**           | Defines who can access the promotion and under what circumstances.             |
| **Qualifying Conditions** | Defines what the cart must contain for the promotion to trigger.               |
| **Benefit**               | Defines the reward or discount applied when conditions are met.                |
| **Limits**                | Defines the boundaries that control how often and how long the promotion runs. |

# Eligibility

Eligibility defines who can access the promotion and where it can be applied. A promotion is only evaluated if the transaction falls within the defined conditions.

| Scope Type | Description                                                               | Example                                                   |
| :--------- | :------------------------------------------------------------------------ | :-------------------------------------------------------- |
| Store/Zone | Restricts the promotion to specific physical locations or logical groups. | Valid only at Bangalore and Kerala store locations.       |
| Day/Time   | Restricts the promotion to specific days of the week or time windows.     | Happy Hour: Valid only on Weekdays between 4 PM and 6 PM. |
| Customer   | Restricts the promotion to specific customer segments or tiers.           | Exclusive offer for Gold Tier members only.               |

## Earning criteria for loyalty earning cart promotions

This section applies to promotions that require customers to earn the benefit first.

| Earning Type       | Description                                                                                   | Example                                             |
| :----------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| Single Activity    | Triggered by a one-time action like making a transaction, registering, or updating a profile. | Earn a discount when you sign up for email updates. |
| Activity Milestone | Triggered when a customer reaches a cumulative goal from a pre-configured tracker.            | Earn a reward on your 5th visit.                    |

# Duration

Duration defines the time during which a cart promotion is active.

| Setting                  | Description                                                                       | Example                                     |
| :----------------------- | :-------------------------------------------------------------------------------- | :------------------------------------------ |
| Validity Period          | The overall start and end dates for the promotion.                                | Promotion runs from June 1 to June 30.      |
| Redemption Window        | For earned promotions, the number of days a customer has to redeem after earning. | Must be redeemed within 30 days of earning. |
| Time-of-Day Restrictions | Limits the promotion to specific hours within valid days.                         | Valid only between 4 PM and 6 PM.           |

<Callout icon="📘" theme="info">
  By default, an organisation can have up to 250 active promotions across all types. To increase this limit, raise a Jira ticket to the Capillary Product Support team.
</Callout>

# Qualifying conditions

Qualifying conditions define what the cart must contain for the promotion to apply. The system evaluates the cart in real-time, and the promotion triggers only when ALL configured conditions are met.

## Cart-level conditions

These conditions evaluate the entire cart as a single unit:

| Condition Type                                 | What it checks                                          | Supports AND logic (+ Add condition) | Example                                          |
| :--------------------------------------------- | :------------------------------------------------------ | :----------------------------------- | :----------------------------------------------- |
| Cart Amount                                    | Total gross value of the cart before tax and discounts. | No — standalone only                 | Cart total must be $500 or more.                 |
| Count of items in the cart                     | Total number of distinct items (SKUs) in the cart.      | No — standalone only                 | The cart must contain at least 5 items.          |
| Sum of line item amount for selected product   | Total price of only the selected products.              | Yes                                  | Spend at least $1000 on Denim products.          |
| Sum of line item quantity for selected product | Total number of units for only the selected products.   | Yes                                  | Buy at least 3 T-Shirts.                         |
| Payment Mode                                   | The payment method used for the transaction.            | Yes                                  | Pay using a credit card to qualify.              |
| Gift Voucher                                   | Whether a specific gift voucher code is applied.        | No — standalone only                 | Apply the Employee\_Special\_Voucher to qualify. |

<Callout icon="📘" theme="info">
  **Sum of line item quantity for selected product** accepts decimal values, so it also works for weight-based or other fractional-quantity products. For example, a threshold of 1.5 correctly represents 1.5 Kg of Rice. This condition's product doesn't have to match the product that receives the benefit. Turn off **Selected in condition** in the benefit configuration to reward a different product instead, for example: Buy at least 1.5 Kg of Rice, get 10% off Peppers. Since the discount is a percentage of the Peppers price, the resulting discount amount is carried in decimals too, rounded per the account's configured rounding precision.
</Callout>

## Product-level conditions

These conditions target specific items within the cart using filters:

| Filter Type | What it does                                                                                                           | Example                                             |
| :---------- | :--------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| Include     | Only count items that match the specified criteria.                                                                    | Include only items where Brand = "Nike".            |
| Exclude     | Count everything except items matching the specified criteria.                                                         | Exclude items where Category = "Clearance".         |
| CSV Upload  | Upload a list of specific SKUs to include or exclude. You can map up to 250 SKUs to a single cart promotion condition. | Upload a CSV with up to 250 specific product codes. |

# Benefits

The benefit is the reward a customer receives when their cart meets the qualifying conditions.

## Benefit scope

Benefit scope determines where the discount applies:

| Scope                       | How it works                                                                         | Example                              |
| :-------------------------- | :----------------------------------------------------------------------------------- | :----------------------------------- |
| Cart                        | The discount applies to the entire bill total. The cart is treated as a single unit. | Get a flat $10 off your entire bill. |
| Select products in the cart | The discount applies only to specific items within the cart.                         | Get 20% off on Running Shoes only.   |

## Product benefit logic

When applying discounts to specific products, define the relationship between triggering items and rewarded items:

| Logic Type                                  | How It Works                                                                              | Example                               |
| :------------------------------------------ | :---------------------------------------------------------------------------------------- | :------------------------------------ |
| Over and above the condition (Buy X, Get Y) | Items that met the condition stay at full price. The benefit applies to additional items. | Buy 2 Pants, Get 1 Belt for 50% off.  |
| Selected in condition (Buy X, Get % off X)  | The benefit applies to the same items that met the condition.                             | Buy 2 Pants, Get 10% off those Pants. |

## Product criteria

When the benefit is set to **Over and above the condition**, define which specific products receive the discount.

| Criteria Type                | How It Works                                                                                                                                                                                                                                                                                                            | Example                                                       |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| Single SKU                   | The benefit applies to one specific product, identified by uploading a CSV with the SKU code. Because the discount is tied to a single SKU, there is no ambiguity about what the customer receives — ideal for gifting or clearing a targeted product. You can map up to 250 SKUs to a single cart promotion condition. | A free water bottle added to the cart when spending over $50. |
| Multiple SKUs                | The benefit applies only when all the specified products are present in the cart together. The all-or-nothing rule drives customers to add complementary products they might not otherwise purchase, increasing average basket size.                                                                                    | Buy a Sandwich and a Coffee together, get 20% off both.       |
| Brand / Category / Attribute | The benefit applies to all products matching a catalog attribute such as brand, category, or product attribute. New products added to the matched attribute automatically qualify, so the promotion stays current without requiring SKU list updates.                                                                   | 10% off all Nike shoes when spending $200 or more.            |

## Benefit value types

Benefit value type defines how the discount amount is calculated:

| Benefit Type        | How It Works                                                    | Example                           |
| :------------------ | :-------------------------------------------------------------- | :-------------------------------- |
| Fixed Amount        | Deducts a fixed currency value from the price.                  | Get $150 off. Price: $500 → $350. |
| Percentage Based    | Deducts a percentage of the price.                              | Get 20% off. Price: $100 → $80.   |
| Free Product        | Adds a specific SKU to the cart at $0 cost.                     | Get a free Summer Tote Bag.       |
| Fixed Target Amount | Sets items to a fixed bundle price regardless of original cost. | Buy any 3 Jeans for exactly $999. |

## Recurring benefits

Enable **Apply Benefit on Each Unit** to make the benefit repeat within a single transaction:

| Unit Type     | How It Works                                  | Example                                                        |
| :------------ | :-------------------------------------------- | :------------------------------------------------------------- |
| Item Quantity | Benefit triggers for every X items purchased. | Every 2 shirts bought = ₹50 off. Buy 4 Shirts = ₹100 off.      |
| Item Amount   | Benefit triggers for every $X spent.          | Every ₹1000 spent on Denim = ₹100 off. Spend ₹2500 = ₹200 off. |

# Stacking and priority

When multiple promotions are valid for a single transaction, stacking rules and priority settings determine which promotions are applied and in what order.

## Stacking behaviour

Each promotion has a stacking setting that controls whether it can be applied with other promotions on the same cart.

| Setting                           | How it works                                                                  | When to use                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Exclusive** (stacking disabled) | If this promotion is applied, no other promotions can be applied to the cart. | Use for high-value offers like "Flat 50% Off Everything" where additional discounts are not intended. |
| **Stackable** (stacking enabled)  | Other applicable promotions can be applied alongside this one.                | Use for smaller incentives like "Free Shipping" that should combine with other discounts.             |

**When exclusive and stackable promotions qualify at the same time**, the exclusive promotion takes precedence and blocks all others from being applied, regardless of their individual stacking settings.

**When multiple exclusive promotions qualify**, only one can be applied. The system uses the promotion ranking order below to determine which exclusive promotion wins.

**When multiple stackable promotions qualify**, all of them are applied. The ranking order determines the sequence in which each discount is calculated — this matters because some discounts are applied to the original cart value, while others are applied to the already-discounted amount.

## Promotion ranking order

When the system must choose between promotions — either because stacking is disabled or to determine the order of application — it evaluates them in the following priority order:

**1. Segmented promotion** (Highest priority)
Targets a specific, pre-defined customer group. Because this promotion was deliberately configured for a precise audience, it is treated as the most intentional and takes precedence over all other types.

**2. Reward**
The customer spent loyalty points or currency to acquire this promotion. Because the customer has already given up something of value to hold it, the system honours it before considering promotions they received passively.

**3. Code-linked**
The customer actively typed in a promo code at checkout, signalling deliberate intent to use that specific offer. This explicit action gives it higher priority than promotions applied automatically.

**4. Earliest expiry**
Among promotions that are otherwise equal in priority, the one expiring soonest is applied first. This prevents a customer from losing a nearly-expired offer because a longer-lived one was picked instead.

**5. Maximum discount** (Lowest priority)
If no other differentiator applies, the promotion that gives the customer the greatest monetary saving is chosen. This acts as the final tiebreaker and ensures the customer always gets the best available value when all else is equal.

<Callout icon="📘" theme="info">
  The ranking order applies within the constraints of your stacking configuration. A lower-ranked stackable promotion can still be applied alongside a higher-ranked one — ranking only determines the winner when a choice must be made.
</Callout>

# Communication

Configure automatic notifications to customers at key moments in the promotion journey.

| Trigger         | Availability                                                                                                                        | What It Does                                           | Example                                                                      |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- | :--------------------------------------------------------------------------- |
| On Earning      | Loyalty earning promotion and Rewards promotion only. Not available for Loyalty promotion, POS promotion, or Code linked promotion. | Sends a message when the customer earns the promotion. | "Congratulations! You've earned a 15% discount for completing your profile." |
| Expiry Reminder | All Promotion Types                                                                                                                 | Sends a reminder before the promotion expires.         | "Don't miss out! Your 'Buy 2 Get 1' offer expires in 48 hours."              |

Supported channels: SMS, Email, and Push Notifications.

# Limits

Limits control how often and how widely a promotion can be used. These ensure the promotion remains financially viable and prevents misuse.

## Constraint types

| Constraint Level | What it controls                                                             | Example                                                           |
| :--------------- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| Global           | Total redemptions across all customers for the promotion's entire lifecycle. | First 1,000 customers only.                                       |
| Per Customer     | Maximum redemptions or discount value for each individual customer.          | Max 3 uses per customer, or max $500 total discount per customer. |

## Available limit settings

| Limit                        | Description                                                                                                                                                                                                                                                                          | Example                                                                           |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Individual Cart Limit        | Max times the promotion applies within a single transaction.                                                                                                                                                                                                                         | Limit: 1. Customer buys 6 Coffees (Buy 2 Get 1 Free) but gets only 1 free coffee. |
| Individual Customer Limits   | Max lifetime uses or total discount value per customer.                                                                                                                                                                                                                              | Max 3 redemptions, or max $500 total discount.                                    |
| Refresh Period               | When the customer's limit resets. For a fixed interval, choose **Never**, **Days**, or **Weeks**. For advanced cycling, configure a **Reset period** with one of five cycle types: **Every X days**, **Every week**, **Every calendar month**, **Last X days**, or **Last X weeks**. | Reset every calendar month, or count redemptions over a rolling 30-day window.    |
| Global Count                 | Hard cap on total redemptions across all customers.                                                                                                                                                                                                                                  | First 1,000 customers only. Once reached, promotion ends for everyone.            |
| Maximum Earning per Customer | For earning-type promotions, limits how many times a customer can earn the promotion.                                                                                                                                                                                                | Each customer can earn this promotion once.                                       |
| Validity days from issue     | For earned promotions, how long can the customer redeem after issuance.                                                                                                                                                                                                              | Must be redeemed within 30 days of earning.                                       |

<Callout icon="⚠️" theme="warning">
  Redemption restrictions cannot be updated once the promotion is live.
</Callout>

## Reset periods for limits

A reset period makes a limit refresh automatically after a specified interval, rather than applying once for the entire promotion. When a cycle ends, the customer's usage counter clears and they can use the promotion again in the next window.

You can add a reset period to **per customer**, **per promotion**, **per code**, and **per earn** limits. **Per cart** limits do not support reset periods — they apply to individual transactions only, with no recurring cycle.

The following table describes the available reset period types:

| Reset period             | Description                                                                                                                                                                                                             | Example                                                                                                                                                                                  |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **every X days**         | Resets the limit at fixed intervals of X days. Enter the number of days and select a **reference date** to anchor the first cycle — all subsequent cycles count forward from it.                                        | A customer is limited to **5 redemptions** every **7 days**, starting from the promotion launch date. Once the 7-day window closes, the counter resets and they can redeem again.        |
| **every week**           | Resets the limit at the start of each new week. Enter the number of weeks and select the **starting weekday** (Sunday through Saturday) that begins each cycle.                                                         | A customer can use the promotion a maximum of **2 times** per week. With the week starting on **Monday**, the counter resets every Monday regardless of when the customer last redeemed. |
| **every calendar month** | Resets the limit on the first day of each calendar month. No additional fields required — all customers reset on the same day.                                                                                          | A customer can receive a maximum of **3 discounts** per **calendar month**. On the 1st of the next month, their counter resets to zero.                                                  |
| **for last X days**      | Applies a rolling window that counts only redemptions in the most recent X days. The window shifts continuously — a redemption clears from the count exactly X days after it occurred, with no fixed calendar boundary. | A customer is limited to **1 redemption** in the **last 14 days**. A redemption made 15 days ago no longer counts, making the customer eligible again.                                   |
| **for last X weeks**     | Applies a rolling window measured in weeks. The week boundary is fixed as **Sunday to Saturday** and is not configurable. Usage is measured against a continuously shifting window.                                     | A customer can redeem a maximum of **2 times** in the **last 4 weeks** (Sun–Sat boundary). As the oldest week rolls out of the window, that usage no longer counts.                      |

# Accumulation-based offers

Most free-product promotions reset with every cart: a customer who buys 4 coffees today and 4 more tomorrow never triggers a "buy 10, get 1 free" promotion, because neither visit reaches 10 on its own. Accumulation-based offers solve this by allowing the qualifying quantity to accumulate across a customer's purchases rather than resetting at checkout.

| Without accumulation                                                               | With accumulation                                                                      |
| :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| Each cart is evaluated only on what's in it right now.                             | Each cart is evaluated on what's in it **plus** everything the customer bought before. |
| A customer who buys 4, then 4, then 3 coffees across three visits never qualifies. | The same customer qualifies on the third visit, once the running total crosses 10.     |
| Simple to reason about, but misses customers who build up quantity over time.      | Rewards loyal, repeat buyers without requiring a single large purchase.                |

## A customer's journey

Coffee costs $2.50. The promotion requires 10 coffees to get the 11th free.

* **Monday, 3 August**: Maya orders 4 coffees for her team meeting and pays $10.00. Her running count is now **4 of 10**. Nothing on the receipt looks different from any other day.
* **Thursday, 6 August**: Maya orders 4 more coffees and pays another $10.00. Her running count is now **8 of 10**. Still 2 short, so nothing changes at checkout.
* **Monday, 10 August**: Maya orders 3 coffees. Her running count reaches **11**, 1 past the threshold. The system applies the free-coffee discount immediately: her bill comes to **$5.00** (2 paid coffees at $2.50 each) instead of $7.50, a **$2.50** saving, with no coupon, card, or advance notice required.
* **1 extra coffee left over**: Maya paid for 11 coffees but only needed 10, so 1 coffee is unaccounted for. If the promotion has a recurring redemption limit (for example, resetting every calendar month) with carry-forward turned on, that 1 coffee carries into her count for September instead of resetting to 0.

Maya never tracked a punch card or watched a progress bar. The system had been counting since her very first coffee on 3 August, and the reward applied itself the moment her total crossed 10, on whichever visit that happened to be.

## How it works

1. A customer makes a purchase, the system adds the qualifying quantity to a running total kept for that customer and promotion.
2. On every subsequent cart evaluation, the system checks the current cart's quantity against the customer's running total and the promotion's condition.
3. The moment the combined total crosses the set promotion condition, the promotion is issued even if the current cart alone doesn't meet the condition.
4. Once the promotion is redeemed, the quantity that was used to earn it is deducted from the running total.

**Example:** "Buy 10 coffees across any number of visits, get the 11th free":

| Visit | Coffees bought this visit | Running total after this visit | Reward fires?                       |
| :---- | :------------------------ | :----------------------------- | :---------------------------------- |
| 1     | 4                         | 4                              | No                                  |
| 2     | 4                         | 8                              | No                                  |
| 3     | 3                         | 11 (10 needed + 1 extra)       | Yes: free coffee applied on visit 3 |

## Over-achievement: what happens to leftover quantity

In the example above, the customer bought 11 coffees, but the promotion only needed 10, there's 1 coffee "left over" after the reward fires. What happens to that leftover unit is a separate setting, and it only matters if the promotion has a **recurring reset period** (see [Reset periods for limits](#reset-periods-for-limits) above). Without a reset period, there's only a single, ongoing cycle, so there's nothing to carry into, this setting has no effect.

| Over-achievement | Behavior at the end of a cycle                                                  | Example                                                                                                    |
| :--------------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| Off (default)    | Any quantity beyond what the reward needs is dropped when the cycle resets.     | Cycle resets monthly. Customer buys 11 coffees and redeems the reward. Next month starts back at 0, not 1. |
| On               | Leftover quantity carries forward into the next cycle instead of being dropped. | Cycle resets monthly. Customer buys 11 coffees and redeems the reward. Next month starts at 1, not 0.      |

<Callout icon="📘" theme="info">
  ### Note

  Accumulation is a cart promotion mechanic, not a Loyalty program milestone or tracker. It applies only to `FREE_PRODUCT` reward promotions with a quantity-based condition, and needs to be enabled for your org, raise a ticket with Capillary support. See the [Create Cart Promotion API](https://docs.capillarytech.com/reference/create-cart-promotion) reference for the full field-level configuration.
</Callout>

## How to test an accumulation promotion

Accumulation depends on how a purchase is recorded and on customer-level history, so a setup that looks correct in the promotion builder can still fail to fire if it's tested the wrong way.

1. **Use a customer who has never been tested before.** Reusing a customer across repeated test attempts leaves behind purchase history from earlier tests, which can make a promotion fire when it shouldn't, or fail with an error that has nothing to do with your configuration.
2. **Record test purchases through the [Transaction V2](https://docs.capillarytech.com/reference/add-transaction-single) API.** Only purchases recorded this way count toward accumulation, purchases recorded through the v1.1 Transaction API don't contribute.
3. **Split the qualifying quantity across at least two purchases**, instead of putting the full quantity in one cart. Record a purchase below the threshold and confirm the reward doesn't apply yet, then record a second purchase that pushes the combined total over the threshold and confirm the reward applies on that second purchase. Testing with the full quantity in a single purchase only proves the base condition works, not that accumulation works.
4. **If over-achievement is on, test it with a recurring redemption limit configured** (daily, weekly, or calendar month), not an overall limit. Accumulate more than the required quantity in one cycle so some quantity is left over, move to the next cycle, and confirm the leftover quantity carries into the new purchase with **Carry forward** on, and doesn't with it off.