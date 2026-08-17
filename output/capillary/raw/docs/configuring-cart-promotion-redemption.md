---
updatedAt: 2026-08-13T20:53:38.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configuring Cart Promotion Redemption 

This guide outlines the different methods for managing cart promotions, covering both the technical configuration of redemption workflows and the specific logic governing how various promotion types are issued and validated.

# Configuring cart promotion evaluation strategy

A customer at a grocery till pays for a basket that's already complete: every item is known before the discount is applied. A customer at a fuel pump doesn't work this way: the discount has to be worked out before fuelling and finalised only after fuelling stops, because nobody, including the pump, knows the final litres until then.

Capillary offers three redemption strategies to cover both situations. Pick based on your business:

* **You know the full cart before the sale finishes** (a standard retail checkout): use **Strategy 1**.
* **You only know the final amount after the sale starts** (fuel, quantity-based goods), **and your pricing is flat per unit** (the same rate applies no matter how much the customer buys): **Strategy 2** works today for most existing integrations.
* **You only know the final amount after the sale starts, and your pricing isn't flat** (tiered or bulk pricing, where the per-unit rate changes with quantity): use **Strategy 3**, so the discount is always capped against the item's real value instead of a placeholder guess.

## 1. Redemption with cart validation (`REDEMPTION_WITH_CART_EVALUATION`)

*For businesses that finalize the cart before the customer pays.*

* **How it works:** The POS sends the complete, final cart to the [evaluate](https://docs.capillarytech.com/reference/post_api-gateway-v1-promotions-evaluate) endpoint and gets back the applicable discounts along with a secure evaluation ID. Confirming the sale means submitting that ID with the transaction, so the engine can check the confirmed promotions against the original evaluation before recording the redemption.
* **Best for:** A standard retail checkout, or any business where the basket is scanned, totalled, and paid for in one continuous step, with nothing left to confirm afterward.
* **Example:** A clothing store scans a customer's basket, sends the finalized cart to Capillary, and applies the returned discount before printing the receipt.

This is also the redemption strategy required for [accumulation-based offers](https://docs.capillarytech.com/docs/core-concepts-1#accumulation-based-offers), and an org must be on this strategy before accumulation can be enabled on a promotion.

![](https://files.readme.io/9bcd08cc577818824dd1f9eda5ec8e71329ccd31f5452900466519bbd918a859-Cart_Promo_WF_1.png)

## 2. Redemption via post-transaction reporting (`REDEMPTION_WITHOUT_CART_EVALUATION`)

*For businesses where the final purchase amount is only known after the sale has already started.*

* **How it works:** The POS calls evaluate with a placeholder cart before the final quantity is known, completes the transaction once it does, and separately reports the applied promotions to the [redemptions](https://docs.capillarytech.com/reference/redeem-cart-promotion) API with the actual amount. The reported discount is locked in as-is; Capillary doesn't re-evaluate it against the original request.
* **Best for:** Fuel dispensers, quantity-based checkouts, or any business where the sale must complete before the exact purchase details exist.
* **Example:** A customer with a VIP subscription identifies themselves at the pump before fuelling starts. The POS calls Evaluate with a placeholder cart (1 gallon of fuel at a nominal price, since the real gallon count isn't known yet), and the response says the customer qualifies for 10¢ off per gallon. The customer fuels 12 gallons and stops. The POS calculates the actual discount itself: 12 gallons × 10¢ = $1.20, and reports the completed transaction, along with that $1.20 discount, to Capillary.

![](https://files.readme.io/9ca66dd98e762e5c3a88c88e23538c4afdc0cfbea28556d55fd97dc80b599f0d-Cart_Promo_WF_2.png)

## 3. Redemption with capped evaluation (`REDEMPTION_WITHOUT_CART_EVALUATION_CAPPED`)

*For businesses in the same situation as Strategy 2, but where pricing isn't flat per unit.*

* **How it works:** Like Strategy 1, Evaluate is called with the real quantity and real amount, so the discount is capped against the item's true value from the start. Like Strategy 2, the sale still has to complete before the real quantity is known, so the POS separately reports the applied promotions to the [redemptions](https://docs.capillarytech.com/reference/redeem-cart-promotion) API afterward, scaling the per-unit discount Evaluate returned by the actual quantity. The reported discount is locked in as-is; Capillary doesn't re-evaluate it against the original request.
* **Best for:** Fuel dispensers or quantity-based checkouts with tiered or bulk pricing, where the per-unit rate changes depending on how much the customer buys.
* **Example:** A fuel retailer prices tiered by volume: the first gallon costs $3.00, and every gallon after that costs $2.50. A promotion gives $4.00 off per gallon. The POS calls Evaluate with the real cart, quantity 6 gallons, amount $15.50 (the true blended total for 6 gallons at tiered pricing). Against that real $15.50, the $4.00/gallon discount is well within the item's value, so Evaluate returns the full $4.00/gallon. The customer fuels 6 gallons and stops; the POS scales $4.00 by 6 gallons and reports a $24.00 discount, the promotion's full, correct value.
* **Stacking:** Multiple promotions can still apply to the same item; each is evaluated and reported independently; there's no ranking or residual-splitting between them.
* **Requirements:**
  * Disable Cart Locking for the org before enabling this strategy. Locking can't be enabled while this strategy is active.
  * Payment Voucher promotions and Tender-based promotions aren't supported while this strategy is active.
  * Configure limits at the promotion, customer, earn, or code level for promotions running under this strategy. Cart-level limits are checked once, at evaluation, and can't be re-verified when the redemption is reported, since there's no saved cart to check them against — don't configure Cart-level limits for promotions running on this strategy.

To configure the cart promotion redemption strategy for your organisation, raise a JIRA ticket to the Capillary Product Support team.

# Understanding cart promotion issuance and redemption

| Cart Promotion Type           | How is it issued?                                                                                   | How is it redeemed?                                                                                   | Does it require [evaluation?](https://docs.capillarytech.com/reference/evaluate-cart-promotions)                                 | Example                                                                      |
| :---------------------------- | :-------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| **Loyalty Promotion**         | Automatically available to all loyalty members, no specific issue is required.                      | Applied automatically at checkout when the shopping cart meets the specified conditions.              | Requires evaluation to check cart conditions and promotion limits against the customer                                           | "All loyalty members get 20% off on carts above $100."                       |
| **Loyalty Earning Promotion** | Earned when a customer completes a specific action, like registering or finishing a 3rd purchase.   | Becomes available to redeem only when the customer makes a **future** transaction after it is earned. | Requires evaluation for two checks: 1. Did the customer finish the goal? 2. Does the current cart meet the specified conditions? | "Complete 3 purchases to unlock 30% off on your **next** order."             |
| **POS Promotion**             | Available at the store level, it can be restricted to a specific tier, like Gold or Silver members. | Applied automatically based on the store location, time of day, or membership level.                  | Automatically applied based on transaction context (store, time, tier). No evaluation is required.                               | "Gold tier members get a flat 50% off during Black Friday at select stores." |
| **Rewards Promotion**         | The customer redeems loyalty points from the Rewards Catalog to claim the promotion.                | Applied as a cart discount at the next qualifying checkout after the points redemption is confirmed.  | Requires evaluation to validate the points redemption and check cart conditions.                                                 | "Redeem 500 points to unlock a Buy 1 Get 1 Free offer."                      |
| **Code-Linked Promotion**     | Unique codes are created and shared with customers (e.g., via email or ads).                        | The customer must manually enter the code at checkout.                                                | Requires evaluation to validate promo code and check limits.                                                                     | "Use code **SAVE20** to get 20% off on orders above $50."                    |

<Callout icon="📘" theme="info">
  By default, Cart Promotion is not enabled for all the orgs. Raise a ticket to the Product Support team to enable.
</Callout>