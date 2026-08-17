---
updatedAt: 2026-05-20T09:03:33.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Reward Issuance with Quantity and Redemption Value Details

The example below illustrates how point values are calculated for rewards with the payment configuration CONV\_RATIO and KPI as Quantity or KPI as Redemption Value.

> ⚠️ Loyalty program prerequisite for decimal redemptions
>
> If the conversion ratio results in a decimal points value, for example, 2,475 points × 0.005 ratio = 12.375 points, the Loyalty program must be configured to allow redemptions in multiples of **0.001**. Without this setting, the reward issuance will fail. To configure this, set **Allow redemption in multiples of** to **0.001** in the Loyalty program's redeem conditions. See [Points, Create redeem conditions](https://docs.capillarytech.com/docs/points#points-consumption-order) for instructions. The exact decimal amount is also returned in the `pointsRedeemedInDecimal` field in the API response.

### Example Scenarios

#### Scenario 1: Single/Bulk Issue Reward with No Quantity and No Payment Config (KPI = Quantity/Redemption value)

**Input JSON:**

```json
{
  "mobile": "911886022308",
  "brand": "marvel_automation",
  "transactionNumber": "Transaction-1716621508000"
}
```

**Details:**

* **Quantity:** null (defaults to 1)
* **Payment Config:** null (no specific payment config used)

**Calculations:**

* **Redemption Value:** 1 (default quantity).
* **Points Deducted:** Quantity ÷ Ratio = 1 ÷ 0.35 ≈ 2.85 (rounded to 3).

***

#### Scenario 2: Single/Bulk Issue Reward with Explicit Quantity and No Payment Config (KPI = Quantity/Redemption value)

**Input JSON:**

```json
{
  "mobile": "911886022308",
  "brand": "marvel_automation",
  "transactionNumber": "Transaction-1716621508000",
  "quantity": 40
}
```

**Details:**

* **Quantity:** 40 (explicitly set).
* **Payment Config:** null (no specific payment config used).

**Calculations:**

* **Redemption Value:** 40 (explicitly provided quantity).
* **Points Deducted:** Quantity ÷ Ratio = 40 ÷ 0.35 ≈ 114.29 (rounded to 114).

***

#### Scenario 3: Single/Bulk Issue Reward with Quantity and Payment Config that Includes Points (KPI = Quantity/Redemption value)

**Input JSON:**

```json
{
  "mobile": "911886022308",
  "brand": "marvel_automation",
  "transactionNumber": "Transaction-1716621508000",
  "quantity": 40,
  "paymentConfig": {,
    "points": 500
  }
}
```

**Details:**

* **Quantity:** 40.
* **Payment Config:** Points = 500.

**Calculations:**

* **Redemption Value:** Points × Ratio = 500 × 0.35 = 175.
* **Points Deducted:** 500 (directly used from the payment configuration).

***

#### Scenario 4: Single/Bulk Issue Reward with Quantity and Payment Config that Includes ID but Not Points (KPI = Quantity/Redemption value)

**Input JSON:**

```json
{
  "mobile": "911886022308",
  "brand": "marvel_automation",
  "transactionNumber": "Transaction-1716621508000",
  "quantity": 40,
  "paymentConfig": {
    "id": 307
  }
}
```

Details:

Quantity: 40.\
Payment Config: Contains an ID but not points (defaults to using quantity).\
Calculations:

Redemption Value: 40 (quantity used directly).\
Points Deducted: Quantity ÷ Ratio = 40 ÷ 0.35 ≈ 114.29 (rounded to 114).

***

#### Scenario 5: Bulk Issue Reward with Multiple Payment Configurations

**Input JSON:**

```json
{
  "mobile": "919886022338",
  "brand": "marvel_automation",
  "transactionNumber": "Transaction-1716621508000",
  "rewards": [
    {
      "rewardId": 13649,
      "quantity": 40,
      "paymentConfig": {
        "id": 307,
        "points": 500
      }
    },
    {
      "rewardId": 14746,
      "quantity": 1
    }
  ]
}
```

**Details:**

* **Reward 1:**
  * Reward ID: 13649.
  * Quantity: 40.
  * Payment Config: Points = 500.
  * **Calculations:**
    * Redemption Value = Points × Ratio = 500 × 0.35 = 175.
    * Points Deducted = 500 (directly used).
* **Reward 2:**
  * Reward ID: 14746.
  * Quantity: 1.
  * Payment Config: None specified.
  * **Outcome:**
    * If multiple payment configs exist and none is specified, the system cannot process this reward and will fail for Reward 2 but proceed with Reward 1 using its default configuration.

#### Scenario 6: Issue Single Reward with Quantity and Redemption Value (KPI = Redemption value or Quantity)

<br />

```json
{  
  "mobile": "11223569865",  
  "brand": "BUKL",  
  "quantity": 3,  
    "paymentConfig": {  
            "redemptionValue": 100  
     }  
}
```

* Quantity: 1 (defaults to 1 for single issue)
* Payment Config: Contains a specific redemption value
* Conv\_ratio is set as 0.35

**Calculations:**

* Redemption Value: 100 (used directly)
* Points Deducted: (Redemption Value ÷ Conv Ratio) × Reward Quantity = 100 ÷ 0.35 ≈ 285.71 (rounded to 286)

<br />

#### Scenario 7:  Bulk Issue Reward with Quantity and Redemption Value (KPI = Redemption value or Quantity)

```json
{  
    "mobile": "11223569865",  
    "brand": "BUKL",  
    "rewards": [  
        {  
            "rewardId": 308697,  
            "quantity": 3,  
            "paymentConfig": {  
                "redemptionValue": 100  
            }  
        }  
    ]  
}
```

<br />

* Quantity: 3 (explicitly set)
* Payment Config: Contains specific redemption value.
* Conv\_ratio is set as 0.35

**Calculations:**

* Redemption Value: 100, quantity = 3, so total redemption value= 100 x 3 = 300
* Points Deducted: (Redemption Value ÷ Conv Ratio) × Reward Quantity = (100 ÷ 0.35) x 3 ≈ 857.

***