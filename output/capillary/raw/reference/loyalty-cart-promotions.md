---
updatedAt: 2026-08-14T05:42:27.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Cart Promotions

The Cart Promotion APIs let you create, manage, and evaluate promotions that scan customer carts at checkout. Use these APIs to automate rewards, including discounts, free items, or bundle pricing based on spend amount, item count, brands, and payment methods.

# What can cart promotion do?

You can use the Cart Promotion APIs to:

* **Create various promotion types:** You can set up rewards based on how they are triggered, such as automatically for your customers, via manual code entry, or as earned rewards.
* **Define trigger conditions:** You can add conditions based on the cart subtotal, the number of items, specific product categories, or the customer's payment method.
* **Apply rewards:** You can set the promotion to issue benefits such as percentage or fixed discounts, combo offers, or free products.
* **Set usage limits:** You can control how many times a promotion can be used by a single customer, within one cart, or across the entire promotion period.
* **Manage how promotions stack:** You can decide which promotions can be used together and which one gets applied first when multiple rewards are available.
* **Restrict where and when:** You can limit availability to specific stores or regions, and set specific days or hours when your promotion is active.
* **Build up quantity across purchases:** You can let a customer's qualifying quantity accumulate across multiple transactions instead of resetting with every cart, and carry over any leftover quantity into the next redemption cycle. See [Accumulation-based offers](#accumulation-based-offers).

# What are the types of cart promotions?

| Promotion Type | How it Works                                                                                                                             |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **POS**        | Applied automatically at checkout for eligible customers. You don't need the customer to take any manual action.                         |
| **CUSTOMER**   | You require the customer to actively opt in or join the offer before the promotion becomes active for them.                              |
| **CODE**       | Your customer triggers the reward by manually entering a specific promo code during the checkout process.                                |
| **EARNING**    | You set a goal that the customer must first complete to "earn" the promotion before they can redeem it.                                  |
| **REWARD**     | You issue this directly to a specific customer or segment. It remains invisible at checkout until you have officially issued it to them. |

# How is the cart promotion structured?

Every cart promotion is built from three functional components:

* **Type**: You can define the target and issuance of your cart promotion, such as identifying a loyalty member at checkout or requiring a customer to enter a specific code.
* **Condition**: You can establish the cart context needed to trigger the cart promotion, such as requiring specific product combinations, such as buying a laptop and a mouse together or a particular payment mode like using a VISA card.
* **Action**: You can specify the benefit the cart promotion provides, such as a monetary discount on the total cart value, a free product, or a fixed price for a bundle.

<Callout icon="🚧" theme="warn">
  Notes

  - **Tender logic:** A `TENDER` condition must always be paired with a `TENDER` action.
  - **Action constraints:** `FIXED_PRICE` actions are only valid with `PRODUCT` or `COMBO_PRODUCT` conditions.
  - **Cart locking:** Temporarily reserving a promotion is disabled by default. You can create a JIRA ticket to enable `isLockingEnabled`.
</Callout>

# How does evaluating carts and redeeming cart promotions work?

Before a promotion is applied, your system must check the cart's eligibility. Once the customer is ready to pay, you can finalise the promotion using one of two redemption strategies.

## Identifying the transaction source

To ensure the correct store gets credit for a sale, the system identifies the "till" using these methods:

* You can specify a till code by including the `X-CAP-API-ATTRIBUTION-TILL-CODE` request header.
* If no header is provided, the system identifies the till using the OAuth or basic Auth credentials provided.

## Choosing your redemption strategy

Your organization's redemption behavior is set at the backend level. Contact your platform administrator to enable the strategy that best fits your technical workflow.

### Strategy 1: Real-time validation (During the sale)

You validate the cart first and then submit the transaction with a unique ID. You should enable the strategy `REDEMPTION_WITH_CART_EVALUATION` within your org.

1. Call the [Evaluate API,](https://docs.capillarytech.com/reference/post_api-gateway-v1-promotions-evaluate) with the cart contents, including any promo codes or payment vouchers the customer wants to apply. The cart can be evaluated even if the customer is not yet identified. The system returns the eligible promotions along with a unique `evaluationId`.
2. Pass the `evaluationId` into the [Transaction V2 API](https://docs.capillarytech.com/reference/add-transaction-single) to finalise the sale. The system validates that the promotions being redeemed match exactly what was evaluated before the transaction.

### Strategy 2: Post-transaction reporting (After the sale)

This lets you report applied promotions after the customer has already paid. Use it when the final quantity or amount is only known once the sale is complete (for example, fuel dispensers), and pricing is flat per unit. You should enable the strategy `REDEMPTION_WITHOUT_CART_EVALUATION` within your org.

**Evaluate**: You can still use the Evaluate API to check for active promotions, but the `evaluationId` is not required for the redemption step.

1. Redeem: Once the transaction is complete, report the applied promotions using the [Redemptions API](https://docs.capillarytech.com/reference/redeem-cart-promotion). You can identify the customer using either their InTouch ID or an external identifier such as a mobile number or email.

### Strategy 3: Capped evaluation (After the sale, with real-time accuracy)

This strategy reports redemptions after the sale, like Strategy 2, but is for pricing that isn't flat per unit (tiered or bulk pricing). Enable `REDEMPTION_WITHOUT_CART_EVALUATION_CAPPED` within your org.

**Evaluate**: Call the Evaluate API with the real cart quantity and amount, the same way as Strategy 1, so the discount is capped against the item's true value rather than a placeholder.

1. Redeem: Report the applied promotions using the [Redemptions API](https://docs.capillarytech.com/reference/redeem-cart-promotion), the same way as Strategy 2.

This strategy currently requires Cart Locking to be disabled for the org, and doesn't support Payment Voucher or Tender-based promotions. See [Configuring cart promotion evaluation strategy](https://docs.capillarytech.com/docs/configuring-cart-promotion-redemption) for the full comparison of all three strategies.

# Stacking and Ranking

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

**1. Segmented promotion** *(Highest priority)* Targets a specific, pre-defined customer group. Because this promotion was deliberately configured for a precise audience, it is treated as the most intentional and takes precedence over all other types.

**2. Reward** The customer spent loyalty points or currency to acquire this promotion. Because the customer has already given up something of value to hold it, the system honours it before considering promotions they received passively.

**3. Code-linked** The customer actively typed in a promo code at checkout, signalling deliberate intent to use that specific offer. This explicit action gives it higher priority than promotions applied automatically.

**4. Earliest expiry** Among promotions that are otherwise equal in priority, the one expiring soonest is applied first. This prevents a customer from losing a nearly-expired offer because a longer-lived one was picked instead.

**5. Maximum discount** *(Lowest priority)* If no other differentiator applies, the promotion that gives the customer the greatest monetary saving is chosen. This acts as the final tiebreaker and ensures the customer always gets the best available value when all else is equal.

<Callout icon="📘" theme="info">
  **Note:**

  The ranking order determines which promotion is applied when multiple promotions qualify and only one can be applied. When stacking is enabled, multiple promotions can be applied together and ranking controls the order in which they are evaluated, not which ones are excluded.
</Callout>

## How to create a cart promotion: API workflow

The sequence of calls depends on the promotion `type`. Use the table below to determine the correct flow for your use case.

| Promotion Type | API Call Sequence                                                           |
| -------------- | --------------------------------------------------------------------------- |
| **POS**        | Create → Evaluate → Redeem                                                  |
| **CUSTOMER**   | Create → Issue → Evaluate → Redeem                                          |
| **CODE**       | Create → Issue codes → Link code to customer (optional) → Evaluate → Redeem |
| **EARNING**    | Create → Earn → Evaluate → Redeem                                           |
| **REWARD**     | Create → Issue → Evaluate → Redeem                                          |

<Callout icon="📘" theme="info">
  A `CUSTOMER`-type promotion always requires the Issue step — it never applies automatically, regardless of other settings.
</Callout>

### Step 1: Create (Required for all)

Define the promotion's core logic. A single `POST /api_gateway/v1/promotions` call sets the conditions, actions, and limits.

### Step 2: Issue (CODE, REWARD, and Opt-in CUSTOMER)

For `CODE` types, you must generate codes via the Issue API before they can be used. For `REWARD` types, the promotion remains invisible at checkout until it is issued to the customer or segment.

### Step 3: Earn (EARNING only)

Use `POST /api_gateway/v1/promotions/{promotionId}/earn` to grant the promotion to customer. For bulk operations, use the `/earn/bulk` endpoint.

### Step 4: Evaluate (Required for all)

Call `POST /api_gateway/v1/promotions/evaluate` with cart contents. The API returns the applicable discounts and a unique **Base64 identifier string** per promotion.

### Step 5: Redeem (Required for all)

Submit the redemption via the Transaction V2 API or redemption API endpoint based on your configured strategy.

# Accumulation-based offers

By default, a `FREE_PRODUCT` reward is evaluated against a single cart: a customer must meet the qualifying condition in one transaction, or the reward doesn't apply. <br /><br />Setting `accumulationConfig.enabled` to `true` on a promotion instead lets the qualifying quantity build up across a customer's purchases over time, so a customer who buys a few units on one visit and a few more on a later visit still earns the reward once their combined purchases cross the threshold.

For a more business-level understanding of this behavior, refer to [Accumulation-based offers](https://docs.capillarytech.com/docs/core-concepts-1#accumulation-based-offers) in Core Concepts.

## How it works

1. A customer makes a purchase via [Transaction V2](https://docs.capillarytech.com/reference/add-transaction-single). The system adds the qualifying quantity to a running total kept for that customer and promotion.
2. On every subsequent call to [Evaluate](https://docs.capillarytech.com/reference/post_api-gateway-v1-promotions-evaluate), the system checks the current cart's quantity against the customer's running total and the promotion's condition.
3. The moment the combined total crosses the condition's threshold, the reward is returned in the Evaluate response, even if the current cart alone doesn't meet the condition.
4. Once the reward is redeemed, the quantity that was used to earn it is deducted from the running total.

**Example:** a promotion with `accumulationConfig.enabled: true` requiring `qty >= 10` of a SKU to reward one free unit:

| Transaction | Qty purchased | Running total            | Reward returned on Evaluate?                      |
| :---------- | :------------ | :----------------------- | :------------------------------------------------ |
| 1           | 4             | 4                        | No                                                |
| 2           | 4             | 8                        | No                                                |
| 3           | 3             | 11 (10 needed + 1 extra) | Yes, on the Evaluate call following transaction 3 |

## Over-achievement: what happens to leftover quantity

In the example above, 1 unit is left over after the reward is redeemed. What happens to it depends on `overAchievementEnabled`, and only matters when the promotion has a recurring `promotionRestrictions` window (daily, weekly, or calendar month) configured. Without one, there's only a single ongoing cycle for the promotion's full duration, so there's nothing to carry into, and `overAchievementEnabled` has no effect.

| `overAchievementEnabled` | Behavior at the end of a cycle                                                  | Example                                                                                                         |
| :----------------------- | :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `false` (default)        | Any quantity beyond what the reward needed is dropped when the cycle resets.    | Cycle resets monthly. Customer accumulates 11 units and redeems the reward. Next cycle starts back at 0, not 1. |
| `true`                   | Leftover quantity carries forward into the next cycle instead of being dropped. | Cycle resets monthly. Customer accumulates 11 units and redeems the reward. Next cycle starts at 1, not 0.      |

See the [Create Cart Promotion API](https://docs.capillarytech.com/reference/create-cart-promotion) reference for the full field-level configuration, and [Core Concepts](https://docs.capillarytech.com/docs/core-concepts-1#cross-transaction-accumulation) for how it works in business terms.

## How to test an accumulation promotion

Accumulation depends on how a purchase is recorded and on customer-level history, so a request that looks correct can still fail to fire if it's tested the wrong way. The steps below walk through testing a promotion requiring `qty >= 10` of `COFFEE-REG` (Regular Coffee) to reward one free unit of the same SKU, the "buy 10 coffees, get the 11th free" promotion example. Refer to [How it works](https://docs.capillarytech.com/docs/core-concepts-1#how-it-works) in Core Concepts for a detailed walkthrough of this example.

### 1. Use a customer ID that has never been tested before

Reusing a customer across repeated test attempts leaves behind purchase history from earlier tests, which can make a promotion fire when it shouldn't, or return an error that has nothing to do with your request.

### 2. Record purchases via Transaction V2

Only purchases recorded through [Transaction V2](https://docs.capillarytech.com/reference/add-transaction-single) count toward accumulation, not the v1.1 Transaction API.

```curl
curl --location 'https://eu.api.capillarytech.com/v2/transactions' \
--header 'Content-Type: application/json' \
--header 'X-CAP-API-AUTH-ORG-ID: <ORG_ID>' \
--header 'Authorization: Basic <CREDENTIALS>' \
--data '{
    "type": "REGULAR",
    "billNumber": "BILL-2026-08-1042",
    "billAmount": "1000.00",
    "grossAmount": "1000.00",
    "discount": "0",
    "customerId": <CUSTOMER_ID>,
    "lineItemsV2": [
        {
            "type": "REGULAR",
            "itemCode": "COFFEE-REG",
            "qty": 4,
            "rate": 250,
            "amount": 1000
        }
    ]
}'
```

The response confirms the transaction was recorded, but not whether it contributed to accumulation; confirm that with Evaluate in the next step.

### 3. Split the quantity across multiple purchases, then confirm with Evaluate

Testing with the full quantity in a single call only proves the base condition works, not that accumulation works. Repeat the Transaction V2 call above with a second visit, also buying 4 coffees (running total: 8). Then call Evaluate with a cart containing the remaining 3 coffees needed to cross the threshold:

```curl
curl --location 'https://eu.api.capillarytech.com/v1/promotions/evaluate' \
--header 'Content-Type: application/json' \
--header 'X-CAP-API-AUTH-ORG-ID: <ORG_ID>' \
--header 'Authorization: Basic <CREDENTIALS>' \
--data '{
    "amount": "750.00",
    "customerId": <CUSTOMER_ID>,
    "cartItems": [
        {
            "sku": "COFFEE-REG",
            "amount": "750.00",
            "qty": "3.000000",
            "discount": null
        }
    ]
}'
```

```json Response
{
  "data": {
    "amount": "750.000000",
    "customerId": <CUSTOMER_ID>,
    "cartItems": [
      {
        "referenceId": "<REFERENCE_ID>",
        "sku": "COFFEE-REG",
        "amount": "750.000000",
        "qty": "3.000000",
        "discount": "0",
        "appliedPromotions": [
          {
            "promotionId": "<PROMOTION_ID>",
            "name": "Buy 10 Coffees, Get the 11th Free",
            "promotionMode": "DISCOUNT",
            "redemptionCount": 1,
            "discount": "250.000000",
            "discountAppliedOnQuantity": "1.000000",
            "promotionAppliedOnQuantity": "3.000000",
            "identifier": "<PROMOTION_IDENTIFIER>"
          }
        ]
      }
    ],
    "evaluationId": "<EVALUATION_ID>"
  }
}
```

The line item shows `discount: "250.000000"` on 1 of the 3 coffees, even though this cart alone only carries 3, below the condition's threshold of 10. The remaining 8 came from the two prior Transaction V2 purchases. A cart calling Evaluate with only 1 or 2 coffees (short of the remaining 2 needed) would return `discount: "0"` instead, confirming the reward genuinely depends on accumulated history rather than firing regardless.

To actually complete the sale, pass `evaluationId` as `promotionEvaluationId` and `identifier` as an entry in `appliedPromotionIdentifiers` on a final Transaction V2 call:

```curl
curl --location 'https://eu.api.capillarytech.com/v2/transactions?identifierName=id&identifierValue=<CUSTOMER_ID>&source=INSTORE' \
--header 'Content-Type: application/json' \
--header 'X-CAP-API-AUTH-ORG-ID: <ORG_ID>' \
--header 'Authorization: Basic <CREDENTIALS>' \
--data '{
    "type": "REGULAR",
    "billNumber": "BILL-2026-08-1043",
    "billAmount": "500.00",
    "grossAmount": "750.00",
    "discount": "250.00",
    "promotionEvaluationId": "<EVALUATION_ID>",
    "appliedPromotionIdentifiers": ["<PROMOTION_IDENTIFIER>"],
    "lineItemsV2": [
        {
            "type": "REGULAR",
            "itemCode": "COFFEE-REG",
            "qty": 3,
            "rate": 250,
            "amount": 750,
            "discount": 250
        }
    ]
}'
```

The system validates that `<PROMOTION_IDENTIFIER>` matches what `<EVALUATION_ID>` actually evaluated before accepting the discount, then deducts the 10 coffees this redemption consumed from the customer's running total.

### 4. Test over-achievement across a cycle reset

Redeeming the reward above used 10 of the 11 coffees accumulated so far (4 + 4 + 3, matching the example in [Core Concepts](https://docs.capillarytech.com/docs/core-concepts-1#accumulation-based-offers)), leaving 1 unit over-achieved. Test this with a recurring `promotionRestrictions` window configured (daily, weekly, or calendar month), not an overall limit — over-achievement has no effect without one.

Once the redemption limit's cycle resets (for example, at the start of the next calendar month), record 8 more coffees via Transaction V2:

```curl
curl --location 'https://eu.api.capillarytech.com/v2/transactions?identifierName=id&identifierValue=<CUSTOMER_ID>&source=INSTORE' \
--header 'Content-Type: application/json' \
--header 'X-CAP-API-AUTH-ORG-ID: <ORG_ID>' \
--header 'Authorization: Basic <CREDENTIALS>' \
--data '{
    "type": "REGULAR",
    "billNumber": "BILL-2026-09-2001",
    "billAmount": "2000.00",
    "grossAmount": "2000.00",
    "discount": "0",
    "lineItemsV2": [
        {
            "type": "REGULAR",
            "itemCode": "COFFEE-REG",
            "qty": 8,
            "rate": 250,
            "amount": 2000
        }
    ]
}'
```

`overAchievementEnabled` is set on the promotion itself, via [Update Cart Promotion](https://docs.capillarytech.com/reference/put_api-gateway-v1-promotions-promotionid), not on the Evaluate request. Toggle it between test runs:

```json Request (overAchievementEnabled true)
{
    "accumulationConfig": {
        "enabled": true,
        "overAchievementEnabled": true
    }
}
```

```json Request (overAchievementEnabled false)
{
    "accumulationConfig": {
        "enabled": true,
        "overAchievementEnabled": false
    }
}
```

Then call Evaluate with a cart containing just 1 more coffee:

```curl
curl --location 'https://eu.api.capillarytech.com/v1/promotions/evaluate' \
--header 'Content-Type: application/json' \
--header 'X-CAP-API-AUTH-ORG-ID: <ORG_ID>' \
--header 'Authorization: Basic <CREDENTIALS>' \
--data '{
    "amount": "250.00",
    "customerId": <CUSTOMER_ID>,
    "cartItems": [
        {
            "sku": "COFFEE-REG",
            "amount": "250.00",
            "qty": "1.000000",
            "discount": null
        }
    ]
}'
```

With `overAchievementEnabled: true`, the running total is 1 (carried over) + 8 + 1 (this cart) = 10, and the discount applies:

```json Response (overAchievementEnabled true)
{
  "data": {
    "amount": "250.000000",
    "customerId": <CUSTOMER_ID>,
    "cartItems": [
      {
        "referenceId": "<REFERENCE_ID>",
        "sku": "COFFEE-REG",
        "amount": "250.000000",
        "qty": "1.000000",
        "discount": "0",
        "appliedPromotions": [
          {
            "promotionId": "<PROMOTION_ID>",
            "name": "Buy 10 Coffees, Get the 11th Free",
            "promotionMode": "DISCOUNT",
            "redemptionCount": 1,
            "discount": "250.000000",
            "discountAppliedOnQuantity": "1.000000",
            "promotionAppliedOnQuantity": "1.000000",
            "identifier": "<PROMOTION_IDENTIFIER>"
          }
        ]
      }
    ],
    "evaluationId": "<EVALUATION_ID>"
  }
}
```

With `overAchievementEnabled: false`, the running total is 0 (dropped at reset) + 8 + 1 (this cart) = 9, and the discount doesn't apply:

```json Response (overAchievementEnabled false)
{
  "data": {
    "amount": "250.000000",
    "customerId": <CUSTOMER_ID>,
    "cartItems": [
      {
        "referenceId": "<REFERENCE_ID>",
        "sku": "COFFEE-REG",
        "amount": "250.000000",
        "qty": "1.000000",
        "discount": "0",
        "appliedPromotions": []
      }
    ],
    "evaluationId": "<EVALUATION_ID>"
  }
}
```

# Code-linked promotions: linked vs unlinked codes

When you create a CODE promotion and issue codes, every code starts as **unlinked** — its `customerId` is null and any customer can use it by passing it at checkout. You can optionally **link** a code to a specific customer, which locks it to that customer permanently.

## Linked vs unlinked codes

|                    | Unlinked code                                                                                                                                    | Linked code                                                                                                               |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **customerId**     | null                                                                                                                                             | Set to the linked customer's ID                                                                                           |
| **Who can use it** | Any customer who provides the code at checkout                                                                                                   | Only the customer is linked to                                                                                            |
| **At evaluation**  | Must be passed in `promoCodes[]` in the [Evaluate API](https://docs.capillarytech.com/reference/post_api-gateway-v1-promotions-evaluate) request | Automatically included by cart promotions using `customerId` — no need to pass in `promoCodes[]` in Evaluate API request. |
| **Linking**        | Any customer can claim it until it is linked                                                                                                     | Once linked, it cannot be transferred to another customer                                                                 |
| **Use case**       | Influencer or mass campaign codes (for example, HOLIMAN100 shared publicly)                                                                      | Personalised codes issued to a specific customer                                                                          |

## End-to-end flow diagram

<Image src="https://files.readme.io/8a9d3c036176eb0dfe099b969904a1dd4cb4513d84f16705fa15860357fc26bf-popo-Photoroom.png" align="center" />

<br />

<Callout icon="📘" theme="info">
  Linking is permanent. Once a code is linked to a customer, it cannot be linked to a different customer. Attempting to link an already-linked code to a different customer returns error `1005: Code linked to another customer`.
</Callout>