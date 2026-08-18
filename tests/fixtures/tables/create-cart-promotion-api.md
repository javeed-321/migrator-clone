---
updatedAt: 2026-08-13T20:01:12.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create Cart Promotions

This endpoint allows you to create a new cart promotion. Cart promotions can be configured with different conditions, actions, and restrictions. You can define conditions based on cart subtotal, item counts, specific products, and tender types.

# Example request

```curl
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OTNZTk=' \
--header 'Cookie: _cfuvid=YpGNgiRLeLVURs3BaON5u5yvlKJ031kZrvv7e3ePAEc-1759774707339-0.0.1.1-604800000' \
--data '{
  "name": "Combo Product promotion ",
  "type": "CUSTOMER",
  "messageLabel": "Get 15% off combo products",
  "active": true,
  "priority": 0,
  "isStackable": false,
  "startDate": 1759363200000,
  "endDate": 1790985600000,
  "campaignId": "286038",
  "condition": {
    "type": "COMBO_PRODUCT",
    "comboProductCondition": {
      "productConditions": [
        {
          "kpi": "QUANTITY",
          "operator": "GREATER_THAN_OR_EQUAL",
          "value": "1.000000",
          "criteriaList": [
            {
              "entity": "SKU",
              "operator": "IN",
              "values": [
                "SKU001",
                "SKU002"
              ]
            }
          ]
        },
        {
          "kpi": "QUANTITY",
          "operator": "GREATER_THAN_OR_EQUAL",
          "value": "1.000000",
          "criteriaList": [
            {
              "entity": "BRAND",
              "operator": "IN",
              "values": [
                "BRAND_A"
              ]
            }
          ]
        }
      ]
    }
  },
  "action": {
    "type": "PRODUCT_BASED",
    "productBasedAction": {
      "type": "PERCENTAGE",
      "value": "15.000000",
      "productBasedCondition": {
        "type": "COMBO_PRODUCT",
        "comboProductCondition": {
          "productConditions": [
            {
              "kpi": "QUANTITY",
              "operator": "GREATER_THAN_OR_EQUAL",
              "value": "1.000000",
              "criteriaList": [
                {
                  "entity": "SKU",
                  "operator": "IN",
                  "values": [
                    "SKU001",
                    "SKU002"
                  ]
                }
              ]
            },
            {
              "kpi": "QUANTITY",
              "operator": "GREATER_THAN_OR_EQUAL",
              "value": "1.000000",
              "criteriaList": [
                {
                  "entity": "BRAND",
                  "operator": "IN",
                  "values": [
                    "BRAND_A"
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },
  "customerActivationRequired": true,
  "maxIssuancePerCustomer": 1,
  "promotionRestrictions": {
    "Promotion": [
      {
        "kpi": "REDEMPTION",
        "limit": "5000.000000"
      }
    ],
    "Customer": [
      {
        "kpi": "TRANSACTION",
        "frequency": "WEEKS",
        "minTimeBetweenRepeat": 604800000,
        "limit": "2.000000"
      },
      {
        "kpi": "DISCOUNT",
        "limit": "200.000000"
      },
      {
        "kpi": "REDEMPTION",
        "frequency": "DAYS",
        "minTimeBetweenRepeat": 86400000,
        "limit": "3.000000"
      }
    ],
    "Cart": [
      {
        "kpi": "DISCOUNT",
        "limit": "50.000000"
      }
    ]
  },
  "customFieldValues": {
    "Age": 25
  }
}'
```

# API Quick Reference

```curl Reference structure
{{https://eu.api.capillarytech.com/api_gateway/v1/promotions}}
   └─ {{promotions}}
      ├─ {{createCartPromotion}}({{CartPromotionRequest}}) -> {{CartPromotionResponse}}
      ├─ {{CartPromotionRequest}}
      │   ├─ {{Name}} (string)
      │   ├─ {{Type}} (enum)
      │   ├─ {{MessageLabel}} (string)
      │   ├─ {{Active}} (boolean)
      │   ├─ {{Priority}} (integer)
      │   ├─ {{IsStackable}} (boolean)
      │   ├─ {{StartDate}} (long)
      │   ├─ {{EndDate}} (long)
      │   ├─ {{CampaignId}} (string)
      │   ├─ {{Mode}} (enum)
      │   ├─ {{Condition}}
      │   │   ├─ {{ConditionType}} (enum)
      │   │   ├─ {{CartCondition}}
      │   │   │   ├─ {{CartKpi}} (enum)
      │   │   │   ├─ {{CartOperator}} (enum)
      │   │   │   └─ {{CartValue}} (number)
      │   │   ├─ {{TenderCondition}}
      │   │   │   └─ {{TenderModes}} []
      │   │   │       ├─ {{TenderType}} (string)
      │   │   │       ├─ {{TenderIdentifiers}} []
      │   │   │       └─ {{NestedCondition}} (Object)
      │   │   ├─ {{ProductCondition}}
      │   │   │   ├─ {{CriteriaList}} []
      │   │   │   │   ├─ {{Entity}} (string)
      │   │   │   │   ├─ {{EntityOperator}} (enum)
      │   │   │   │   └─ {{EntityValues}} []
      │   │   │   ├─ {{ProductKpi}} (enum)
      │   │   │   ├─ {{ProductOperator}} (enum)
      │   │   │   └─ {{ProductValue}} (string)
      │   │   ├─ {{ComboProductCondition}}
      │   │   │   └─ {{ProductConditions}} []
      │   │   │       ├─ {{ComboCriteriaList}} []
      │   │   │       ├─ {{ComboKpi}} (enum)
      │   │   │       ├─ {{ComboOperator}} (enum)
      │   │   │       └─ {{ComboValue}} (string)
      │   │   ├─ {{PaymentModeScopeConditionRO}}
      │   │   │   ├─ {{PaymentModeConditionRO}}
      │   │   │   │   └─ {{PaymentModeSelectionCriteriaRO}}
      │   │   │   │       ├─ {{SelectionOperator}} (enum)
      │   │   │   │       └─ {{SelectionValues}} []
      │   │   │   └─ {{ScopeCondition}} (Object)
      │   │   └─ {{PaymentComboProductConditionRO}}
      │   │       ├─ {{PaymentTenderCondition}} (Object)
      │   │       └─ {{PaymentComboProductCondition}} (Object)
      │   ├─ {{Action}}
      │   │   ├─ {{ActionType}} (enum)
      │   │   ├─ {{CartBasedAction}}
      │   │   │   ├─ {{CartActionType}} (enum)
      │   │   │   └─ {{CartActionValue}} (number)
      │   │   ├─ {{TenderBasedAction}}
      │   │   │   ├─ {{TenderActionType}} (enum)
      │   │   │   └─ {{TenderActionValue}} (string)
      │   │   ├─ {{ProductBasedAction}}
      │   │   │   ├─ {{ProductActionType}} (enum)
      │   │   │   ├─ {{ProductActionValue}} (number)
      │   │   │   ├─ {{IncludeItemsFromConditionSet}} (boolean)
      │   │   │   └─ {{ProductBasedCondition}}
      │   │   │       ├─ {{TargetType}} (enum)
      │   │   │       ├─ {{TargetProductCondition}} (Object)
      │   │   │       └─ {{TargetComboProductCondition}} (Object)
      │   │   ├─ {{FreeProductAction}}
      │   │   │   ├─ {{FreeIncludeItemsFromConditionSet}} (boolean)
      │   │   │   └─ {{FreeProductBasedCondition}} (Object)
      │   │   ├─ {{FixedPriceAction}}
      │   │   │   ├─ {{FixedPriceValue}} (number)
      │   │   │   ├─ {{FixedIncludeItemsFromConditionSet}} (boolean)
      │   │   │   └─ {{FixedProductBasedCondition}} (Object)
      │   │   └─ {{PerUnitAction}}
      │   │       ├─ {{PerUnitKpi}} (enum)
      │   │       ├─ {{PerUnitDivider}} (string)
      │   │       └─ {{RewardAction}}
      │   │           ├─ {{RewardActionType}} (enum)
      │   │           ├─ {{RewardProductBasedAction}} (Object)
      │   │           ├─ {{RewardFreeProductAction}} (Object)
      │   │           └─ {{RewardFixedPriceAction}} (Object)
      │   ├─ {{CustomerActivationRequired}} (boolean)
      │   ├─ {{MaxIssuancePerCustomer}} (integer)
      │   ├─ {{PromotionRestrictions}}
      │   │   ├─ {{PromotionLevel}} []
      │   │   │   ├─ {{RestrictionKpi}} (enum)
      │   │   │   ├─ {{RestrictionFrequency}} (enum)
      │   │   │   ├─ {{MinTimeBetweenRepeat}} (long)
      │   │   │   └─ {{RestrictionLimit}} (string)
      │   │   ├─ {{CustomerLevel}} []
      │   │   ├─ {{CartLevel}} []
      │   │   ├─ {{CodeLevel}} []
      │   │   └─ {{EarnLevel}} []
      │   ├─ {{CustomFieldValues}} (Object)
      │   ├─ {{IsLoyaltyOnly}} (boolean)
      │   ├─ {{EarningCriteria}}
      │   │   ├─ {{CriteriaActive}} (boolean)
      │   │   ├─ {{CriteriaDsl}} (string)
      │   │   ├─ {{CriteriaDslJson}} (string)
      │   │   ├─ {{CriteriaName}} (string)
      │   │   ├─ {{EarnedFromType}} (enum)
      │   │   ├─ {{EventType}} (enum)
      │   │   ├─ {{GroupId}} (integer)
      │   │   └─ {{MilestoneId}} (integer)
      │   ├─ {{MaxEarningPerCustomer}} (integer)
      │   ├─ {{StoreCriteria}}
      │   │   ├─ {{StoreType}} (enum)
      │   │   ├─ {{StoreValues}} []
      │   │   └─ {{StoreOperator}} (enum)
      │   ├─ {{TimeCriteria}}
      │   │   ├─ {{StartTime}} (string)
      │   │   ├─ {{DurationInHours}} (string)
      │   │   ├─ {{RepeatFrequency}} (enum)
      │   │   └─ {{WeeklyValues}} []
      │   └─ {{SupplementaryCriteria}}
      │       ├─ {{LoyaltyProgramId}} (integer)
      │       ├─ {{ProgramType}} (enum)
      │       └─ {{PartnerProgramId}} (integer)
      └─ {{CartPromotionResponse}}
          ├─ {{Data}}
          │   ├─ {{ResponseId}} (string)
          │   ├─ {{ResponseName}} (string)
          │   ├─ {{ResponseOrgId}} (integer)
          │   ├─ {{ResponseType}} (string)
          │   ├─ {{ResponseActive}} (boolean)
          │   ├─ {{CreatedBy}} (long)
          │   ├─ {{CreatedOn}} (long)
          │   └─ {{LastUpdatedOn}} (long)
          ├─ {{Errors}} []
          │   ├─ {{ErrorCode}} (integer)
          │   └─ {{ErrorMessage}} (string)
          └─ {{Warnings}} []
              └─ {{WarningMessage}} (string)
```

# Prerequisites

* Authentication: Basic or OAuth authentication.
* Default access group

# Request body parameters

| Field                                                 | Type              | Required    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :---------------------------------------------------- | :---------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                                                  | String            | Yes         | Indicates a unique name of the cart promotion. Character limit: 1-50.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| type                                                  | Enum              | Yes         | Specifies the type of cart promotion. Supported values are: • **POS** (Point of Sale): Applies automatically at checkout when cart or purchase conditions are met. \* Constrain: If a POS cart promotion is not restricted to loyal customers(isLoyaltyOnly is false), it cannot have Customer level restrictions. • **CODE**: Requires the customer to enter a cart promotion code for redemption. \* Constrain: Code cart promotions cannot have Customer level restrictions. They also require Code level restrictions to be present. • **CUSTOMER**: Targets specific customer segments or individuals based on attributes or behaviour. A `CUSTOMER`-type promotion always requires issuing to the customer via the [Issue Cart Promotion](https://docs.capillarytech.com/reference/issue-cart-promotion) API before it becomes visible in the Evaluate API response — it never applies automatically. • **EARNING**: Grants rewards (such as points or benefits) when earning conditions are fulfilled. • **REWARD**: Offers a direct reward, such as a discount or complimentary item, upon meeting specific conditions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| messageLabel                                          | String            | Optional    | Specifies a label for the cart promotion message. There is no character limit set for labels. **Example**: SummerSale2025.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| active                                                | Boolean           | Yes         | Indicates if the cart promotion is active. Supported values: true, false. **Default value is true**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| priority                                              | Integer           | Yes         | Specifies the order in which cart promotions are applied. Lower numbers have higher priority, with **0 being the highest**. Example: If there are three promotions—A (priority 0), B (priority 1), and C (priority 2), the order of application will be A, then B, then C. **Note**: If customerActivationRequired is enabled, the priority order does not apply until the customer activates the promotion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| isStackable                                           | Boolean           | Yes         | Indicates whether this cart promotion can be used with other cart promotions. Supported values: true, false. **Default**: false. If set to `false` (exclusive) and this promotion qualifies for a cart, it blocks every other promotion from being applied, including other stackable ones, regardless of ranking. See [Stacking and priority](https://docs.capillarytech.com/docs/core-concepts-1#stacking-and-priority) before setting this field.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| startDate                                             | Long              | Yes         | Specifies the date and time when the cart promotion becomes active, as a Unix epoch timestamp in milliseconds (UTC). **Example**: 1757388651000 corresponds to 2025-09-12 06:30:51 UTC. Note: This field will be deprecated in the future and is being replaced by `startDateISO`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| startDateISO                                          | String            |             | Defines the date and time when the cart promotion becomes active in ISO 8601 format, including the region offset. <br /><br /> For example: The start date is at 14:30:45 on December 16, 2025, in India. <br /><br /> Format for the request parameter: `2025-12-16T14:30:45+05:30` <br /><br /> Note: The response time zone always matches the server time zone, regardless of the time zone offset in the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| endDate                                               | Long              | Yes         | Specifies the end date and time when the cart promotion expires, as a Unix epoch timestamp in milliseconds (UTC). **Example**: 1726123456789 corresponds to 2024-09-12 10:24:16 UTC. Note: This field will be deprecated in the future and is being replaced by `endDateISO`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| endDateISO                                            | String            |             | Defines the end date and time when the cart promotion expires in ISO 8601 format, including the region offset. <br /><br /> For example: The expiration date is at 14:30:45 on December 16, 2025, in India. <br /><br /> Format for the request parameter: `2025-12-16T14:30:45+05:30` <br /><br /> Note: The response time zone always matches the server time zone, regardless of the time zone offset in the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| campaignId                                            | String            | Yes         | Specifies the unique identifier of the campaign that the cart promotion is linked to. Example: 12345. **There is no validation for the campaign ID**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| mode                                                  | Enum              | Optional    | Specifies the application mode of the promotion. Supported values: `DISCOUNT` : A price reduction applied directly to items or the total cart during checkout. Example: A "Buy One, Get One Free" offer at Starbucks that applies when you add two eligible drinks to your order. `PAYMENT_VOUCHER` :A specific code with a fixed monetary value (e.g., ₹50) that a customer must enter to redeem its value against their bill. Example: Using a "ZOMATO50" voucher code on Zomato to get a flat ₹50 off the total food bill. if the field is omitted , it defaults to "DISCOUNT"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| condition                                             | Object            | Yes         | Specifies the rules that determine how the cart promotion applies.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ..type                                                | Enum              | Yes         | [CART](https://docs.capillarytech.com/reference/create-cart-promotion-api#when-the-promotions-condition-type-is-cart) : Conditions based on the entire shopping cart's properties, like its total value or item count. [TENDER](https://docs.capillarytech.com/reference/create-cart-promotion-api#when-the-promotions-condition-type--is-tender) : Conditions based on the customer's specific method of payment. [COMBO\_PRODUCT](https://docs.capillarytech.com/reference/create-cart-promotion-api#when-the-promotions-condition-type--is-combo_product) : Conditions based on the presence of multiple, specific products or product groups being purchased together. [PRODUCT](https://docs.capillarytech.com/reference/create-cart-promotion-api#cart-promotion-with-the-promotions-condition-type-as-product) : Conditions based on a specific group of products. [PAYMENT\_MODE\_SCOPE](https://docs.capillarytech.com/reference/create-cart-promotion-api#cart-promotion-with-condition-type-payment_mode_scope): Conditions based on a specific payment method like points, cash being used in combination with a nested PRODUCT or CART condition. [PAYMENT\_MODE\_COMBO\_PRODUCT](https://docs.capillarytech.com/reference/create-cart-promotion-api#cart-promotion-with-condition-type-payment_mode_combo_product): Conditions based on a specific payment method being used in combination with a nested `COMBO_PRODUCT` condition. [PAYMENT\_MODE](https://docs.capillarytech.com/reference/create-cart-promotion-api#cart-promotion-with-condition-type-payment_mode): Conditions based solely on a specific payment method being used. |
| **Condition Objects - CART**                          |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .cartCondition                                        | Object            | Yes         | Defines rules that apply to the entire shopping cart.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ..kpi                                                 | Enum              | Yes         | Metric to evaluate. **Supported**: `SUBTOTAL`,`ITEMCOUNT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ..operator                                            | Enum              | Yes         | Comparison operator. **Supported**: `EQUALS`, `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ..value                                               | Number            | Yes         | The number to compare against. **Example**: 250.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Condition Objects - TENDER**                        |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .tenderCondition                                      | Object            | Yes         | Defines rules based on the customer's method of payment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ..tenderModes                                         | Array             | Yes         | Lists specific payment modes that trigger this condition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ...type                                               | String            | Yes         | Specifies the payment category. Supported values: `CARD`, `CASH` , `PAYMENT_VOUCHER`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ...identifiers                                        | Array             | Conditional | The identifiers used for the `CARD` and `PAYMENT_VOUCHER` payment category.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ..condition                                           | Object            | Conditional | Defines an additional condition that must also be met. Required when `tenderModes[].type` is `CARD` or `CASH`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ...type                                               | Enum              | Yes         | Specifies the type of nested condition. Supported values: `CART`, `PRODUCT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ...cartCondition                                      | Object            | Conditional | Defines rules based on the overall cart.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ....kpi                                               | Enum              | Yes         | Metric to evaluate. `SUBTOTAL`, `ITEMCOUNT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ....operator                                          | Enum              | Yes         | Comparison operator. `EQUALS`, `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ....value                                             | Number            | Yes         | The number to compare against.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ...productCondition                                   | Object            | Conditional | Defines rules based on specific products.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ....criteriaList                                      | Array             | Yes         | Lists criteria that identify the products.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ....kpi                                               | Enum              | Yes         | Specifies the product-level metric. `NONE`, `QUANTITY` ,`AMOUNT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ....operator                                          | Enum              | Conditional | Comparison operator. Supported value: `EQUALS`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ....value                                             | String            | Conditional | Specifies the target value for the comparison.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Condition Objects - COMBO\_PRODUCT**                |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .comboProductCondition                                | Object            | Yes         | Defines rules that require specific product combinations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ..productConditions                                   | Array             | Yes         | List of product condition objects. You can include up to 250 SKUs in a single cart promotion condition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ...kpi                                                | Enum              | Yes         | Metric used to evaluate condition. `NONE`, `QUANTITY`, `AMOUNT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ...operator                                           | Enum              | Conditional | Comparison logic. `EQUALS`, `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ...value                                              | String            | Conditional | Target value for the comparison.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ...criteriaList                                       | Array             | Yes         | Defines which products or attributes are part of the condition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ....entity                                            | String            | Yes         | Product attribute to evaluate. e.g., `PRODUCT_NAME`, `BRAND`, `CATEGORY`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ....operator                                          | Enum              | Yes         | Defines how attribute values are compared. `IN`, `NOT_IN`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ....values                                            | Array             | Yes         | List of attribute values.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Condition Objects - PRODUCT**                       |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .productCondition                                     | Object            | Yes         | Defines rules that apply to specific products.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ..criteriaList                                        | Array             | Yes         | Specific products that must be present. You can include up to 250 SKUs in a single cart promotion condition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ...entity                                             | String            | Yes         | Attribute to evaluate: `SKU`, `BRAND`, `ATTRIBUTE`, `CATEGORY`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ...operator                                           | Enum              | Yes         | Attribute comparison: `IN`, `NOT_IN`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ...values                                             | Array             | Yes         | List of attribute values. You can specify up to 250 SKUs in this list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ..kpi                                                 | Enum              | Yes         | Metric to evaluate: `NONE`, `QUANTITY`, `AMOUNT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ..operator                                            | Enum              | Conditional | Comparison logic: `EQUALS`, `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ..value                                               | String            | Conditional | Target value for comparison.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Condition Objects - PAYMENT\_MODE\_SCOPE**          |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .paymentModeScopeConditionRO                          | Object            | Yes         | Container for a payment condition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ..paymentModeConditionRO                              | Object            | Yes         | Specific payment method rules.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ...paymentModeSelectionCriteriaRO                     | Object            | Yes         | Criteria for selecting the payment mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ....operator                                          | Enum              | Yes         | Logical operator: `IN`, `NOT_IN`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ....values                                            | Array             | Yes         | Payment mode identifier strings. Max 100.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ..condition                                           | Object            | Yes         | Standard subcondition that must also be met.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ...type                                               | Enum              | Yes         | Nested condition type: `PRODUCT`, `CART`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Condition Objects - PAYMENT\_MODE\_COMBO\_PRODUCT** |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .paymentComboProductConditionRO                       | Object            | Yes         | Container for payment based combo condition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ..paymentModeCondition                                | Object            | Yes         | Payment method rules to trigger promotion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ..comboProductCondition                               | Object            | Yes         | Defines the combo product condition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Condition Objects - PAYMENT\_MODE**                 |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .paymentModeCondition                                 | Object            | Yes         | Payment method rules that will trigger the promotion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ..paymentModeSelectionCriteriaRO                      | Object            | Yes         | Criteria for selecting the payment mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ...operator                                           | Enum              | Yes         | Logical operator: `IN`, `NOT_IN`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ...values                                             | Array             | Yes         | List of payment mode identifiers. Max 100.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| action                                                | Object            | Yes         | Specifies what happens when the cart promotion is applied.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ..type                                                | Enum              | Yes         | Scope of the action: `CART_BASED`, `PRODUCT_BASED`, `TENDER`, `PER_UNIT`, `FREE_PRODUCT`, `FIXED_PRICE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Action Objects - CART\_BASED**                      |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .cartBasedAction                                      | Object            | Yes         | Reward action that applies to the entire cart.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ..type                                                | Enum              | Yes         | Type of action: `ABSOLUTE`, `PERCENTAGE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ..value                                               | Number            | Yes         | Fixed monetary amount for the discount.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Action Objects - TENDER**                           |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .tenderBasedAction                                    | Object            | Yes         | Action that applies when using a specific payment method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ..type                                                | Enum              | Yes         | Discount calculation method: `ABSOLUTE`, `PERCENTAGE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ..value                                               | String            | Yes         | Amount of discount to apply in numbers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Action Objects - PRODUCT\_BASED**                   |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .productBasedAction                                   | Object            | Yes         | Discount applied to specific products.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ..type                                                | Enum              | Yes         | Calculation method: `ABSOLUTE`, `PERCENTAGE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ..value                                               | Number            | Yes         | Amount or percentage of discount.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ..includeItemsFromConditionSet                        | Boolean           | Yes         | Apply benefit to triggering items (`true`) or target set (`false`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ..productBasedCondition                               | Object            | Conditional | Set of products to which the action's benefit will be applied.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ...type                                               | Enum              | Yes         | Grouping method: `PRODUCT`, `COMBO_PRODUCT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Action Objects - PER\_UNIT**                        |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .perUnitAction                                        | Object            | Yes         | Reward action applied repeatedly.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ..perUnitKPI                                          | Enum              | Yes         | Metric used to group items. Supported: `QUANTITY`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ..perUnitDivider                                      | String            | Yes         | Minimum quantity before action repeats.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ..rewardAction                                        | Object            | Yes         | Defines specific benefit for each group.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ...type                                               | Enum              | Yes         | Type of reward: `PRODUCT_BASED`, `FREE_PRODUCT`, `FIXED_PRICE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Action Objects - FREE\_PRODUCT**                    |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .freeProductAction                                    | Object            | Yes         | Reward action where specific products are made free.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ..includeItemsFromConditionSet                        | Boolean           | Yes         | Apply benefit to trigger items (`true`) or target set (`false`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ..productBasedCondition                               | Object            | Yes         | Defines set of products to be made free.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Action Objects - FIXED\_PRICE**                     |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .fixedPriceAction                                     | Object            | Yes         | Reward action where price is changed to specific value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ..value                                               | Number            | Yes         | New fixed price for items.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ..includeItemsFromConditionSet                        | Boolean           | Yes         | Apply benefit to trigger items (`true`) or target set (`false`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ..productBasedCondition                               | Object            | Yes         | Defines products sold at fixed price.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| customerActivationRequired                            | Boolean           | Optional    | Indicates if a customer must opt-in for a cart promotion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| maxIssuancePerCustomer                                | Integer           | Optional    | Total number of times promotion can be issued to a single customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Accumulation Config Object**                        |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| accumulationConfig                                    | Object            | Optional    | Lets a customer build up quantity toward a `FREE_PRODUCT` reward across multiple purchases instead of hitting the condition in a single transaction. For example, "buy 10 coffees over any number of visits this month, get the 11th free." Only supported with a `PRODUCT`, `COMBO_PRODUCT`, `PAYMENT_MODE_SCOPE`, or `PAYMENT_MODE_COMBO_PRODUCT` condition using a `QUANTITY` KPI, a `FREE_PRODUCT` action, `DISCOUNT` mode, a non-stackable promotion, and no moving-window restrictions. The org must also have accumulation enabled, with [cart locking](https://docs.capillarytech.com/docs/preventing-fraudulent-redemptions) and the `REDEMPTION_WITH_CART_EVALUATION` [redemption strategy](https://docs.capillarytech.com/docs/configuring-cart-promotion-redemption) turned on. Contact Capillary support to enable this for your org. Purchases only count toward the threshold when recorded through the [Transaction V2](https://docs.capillarytech.com/reference/add-transaction-single) API; transactions recorded through the v1.1 Transaction API do not contribute.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| .enabled                                              | Boolean           | Optional    | Turns on quantity accumulation across cycles for this promotion. Defaults to `false`. Can only be switched from `false` to `true` before the promotion goes live; turning it on after the promotion has started returns an error. For example, turn this on before a promotion first launches, when no customer has a purchase history against it yet.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| .overAchievementEnabled                               | Boolean           | Optional    | When `true`, quantity purchased beyond what's needed for one reward cycle carries over toward the next cycle instead of resetting. Defaults to `false`. Requires `enabled` to also be `true`. Like `enabled`, this can only be switched on before the promotion goes live. For example, a customer who buys 11 units when only 10 were needed keeps that extra 1 unit toward the next cycle's count instead of losing it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| .lookbackPeriodLastXCycles                            | Integer           | Conditional | Number of past accumulation cycles to include when carrying over over-achieved quantity. Only allowed when `overAchievementEnabled` is `true`; setting it while `overAchievementEnabled` is `false` returns an error. When `overAchievementEnabled` is `true` and this is left blank, the lookback window defaults to the promotion's `startDate`. For example, setting this to `2` carries over-achieved quantity from up to the last 2 cycles, not just the one immediately before.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Promotion Restrictions Object**                     |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| promotionRestrictions                                 | Object            | Optional    | Usage limits on the cart promotion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| .Customer                                             | Array             | Conditional | Restrictions that apply per customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| .Cart                                                 | Array             | Conditional | Restrictions that apply per cart.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| .Promotion                                            | Array             | Conditional | Restrictions that apply to the overall cart promotion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| .Code                                                 | Array             | Conditional | Restrictions that apply to codes. Required when type is `CODE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .Earn                                                 | Array             | Conditional | Restrictions that apply to earning. Only valid for type `EARNING`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ..kpi                                                 | Enum              | Yes         | Metric to be limited. Supported values: \<br>\* `REDEMPTION`: Limits how many times a customer can redeem the promotion, for example limiting a coupon to one use per customer. \<br>\* `TRANSACTION`: Limits how many separate transactions the promotion can apply to, for example restricting a discount to a customer's first three purchases. \<br>\* `DISCOUNT`: Limits the total discount amount a customer can receive across all redemptions, for example limiting cumulative savings to a fixed amount.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ..frequency                                           | Enum              | Optional    | How often the restriction resets. Supported values: \<br>\* `DAYS`: Use when the reset should follow a fixed number of days regardless of calendar boundaries, for example a redemption cap that refreshes every 10 days. \<br>\* `WEEKS`: Use when the reset should happen on the same day every week, for example a redemption cap that refreshes every Monday. \<br>\* `DOES_NOT_REPEAT`: Use for a one-time, lifetime cap that never resets, for example a "first purchase only" offer. If omitted, the restriction does not repeat.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ..minTimeBetweenRepeat                                | Long              | Conditional | Interval at which the limit resets.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ..limit                                               | BigDecimal        | Yes         | Maximum allowed value for the restriction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ..windowType                                          | Enum              | Optional    | Limit window type. Supported values: \<br>\* `OVERALL`: Use for a simple lifetime cap with no reset, for example a promotion a customer can only ever redeem once. \<br>\* `MOVING`: Use for a rolling window that recalculates from each use via `frequency` and `minTimeBetweenRepeat`, for example capping usage within any trailing period. \<br>\* `FIXED`: Use for a cap that resets on a recurring calendar cycle via `fixedWindowConfig`, for example a limit that renews every month. \<br>\* `CLASSIC`: Legacy scalar restriction mode for promotions created before moving-window support was introduced. Cannot be changed to `OVERALL` or `MOVING` on an existing promotion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ..fixedWindowConfig                                   | Object            | Conditional | Required when `windowType` is `FIXED`. Defines the cycle configuration for the fixed window.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ...cycleType                                          | Enum              | Yes         | Type of fixed cycle. Supported values: \<br>\* `CALENDAR_MONTH`: Use when the reset should always land on the 1st of the month, for example a monthly allowance that follows the billing calendar. \<br>\* `WEEK`: Use when the reset should happen on a chosen weekday every week; configure the start day via `weekStartDay`. \<br>\* `N_DAY`: Use when the reset should follow a custom interval instead of calendar boundaries; configure the interval via `refreshRate` and the anchor via `cycleReferenceDate`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ...weekStartDay                                       | Enum              | Conditional | Required when `cycleType` is `WEEK`. Supported values: `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ...refreshRate                                        | Integer           | Conditional | Required when `cycleType` is `N_DAY`. Number of days per cycle (must be ≥ 1).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ...cycleReferenceDate                                 | Long              | Conditional | Epoch timestamp in milliseconds used as the anchor date from which `N_DAY` cycles are calculated forward and backward. Required when `cycleType` is `N_DAY` and `cycleReferenceDateSource` is `PROMOTION_CONFIG`. Interpreted in the org's configured timezone. Defaults to the promotion's `startDate` if omitted. Example: `1748908800000` (1 June 2025 00:00:00 UTC).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ...cycleReferenceDateSource                           | Enum              | Optional    | Specifies whether the fixed-window cycle start date is shared across all customers or calculated individually per customer based on when the promotion was issued to them. Supported values: • `PROMOTION_CONFIG`: All customers' counters reset on the same date, set in `cycleReferenceDate`. The reset schedule is identical for every customer regardless of when they received the promotion. Example: A monthly promotion with `cycleReferenceDate` of 1 June 2025 resets every customer's counter on 1 July, 1 August, and so on. • `ISSUANCE_DATE`: Each customer's counter resets based on the date the promotion was issued to that customer. Example: A customer issued on 5 June gets a monthly window from 5 June to 5 July; a customer issued on 20 June gets a window from 20 June to 20 July. Valid only at `Earn` and `Code` restriction levels. If omitted, defaults to `PROMOTION_CONFIG`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| customFieldValues                                     | Object            | Optional    | Key-value map for storing custom metadata.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| isLoyaltyOnly                                         | Boolean           | Optional    | Promotion applies only to identified loyalty members. Valid only for type `POS`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Earning Criteria Object**                           |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| earningCriteria                                       | Object            | Conditional | Conditions for earning a reward. Required when type is `EARNING`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| .active                                               | Boolean           | Yes         | Enable/disable this earning rule.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| .criteriaDsl                                          | String            | Yes         | Earning rule in simple language.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| .criteriaDslJson                                      | String            | Yes         | Escaped JSON string of rule's values.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| .criteriaName                                         | String            | Yes         | Name for earning criteria rule.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| .earnedFromType                                       | Enum              | Yes         | Event type: `ACTIVITY`, `MILESTONE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| .eventType                                            | Enum              | Yes         | Specific activity: `TransactionAdd`, `CustomerUpdate`, `CustomerRegistration`. An `EARNING` promotion with `eventType` set to `CustomerRegistration` is available to any matching customer as soon as they register, without a separate issuing step. Every other `eventType` value requires the promotion to be earned individually before it applies.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| .groupId                                              | Integer           | Yes         | Identifier for grouping related criteria.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| .milestoneId                                          | Integer           | Yes         | Identifier for specific milestone.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| maxEarningPerCustomer                                 | Integer           | Optional    | Max times a customer can earn reward from `EARNING` promotion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Store Criteria Object**                             |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| storeCriteria                                         | Object            | Optional    | Limits promotion to specific locations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| .type                                                 | Enum              | Yes         | Entity type: `STORE`, `ZONE`, `CONCEPT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| .values                                               | Array of Integers | Yes         | IDs corresponding to the type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| .operator                                             | Enum              | Yes         | Logical operator: `IN`, `NOT_IN`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Time Criteria Object**                              |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| timeCriteria                                          | Object            | Optional    | Restricts promotion to specific times or days.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| .startTime                                            | String            | Yes         | Start time in "HH:mm" format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| .durationInHours                                      | Integer           | Yes         | Duration of window in hours.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| .repeatFrequency                                      | Enum              | Yes         | Repeat logic: `WEEKS`, `DAYS`, `DOES_NOT_REPEAT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| .weeklyValues                                         | Array of Strings  | Conditional | Required if frequency is `WEEKS`. e.g. `["MONDAY"]`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Supplementary Criteria Object**                     |                   |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| supplementaryCriteria                                 | Object            | Optional    | Targets customers in loyalty tier or subscription.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| .loyaltyProgramId                                     | Integer           | Yes         | ID of the loyalty program.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| .programType                                          | Enum              | Yes         | Type: `TIER`, `SUBSCRIPTION`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| .partnerProgramId                                     | Integer           | Yes         | ID of the specific tier or subscription.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

# Action Types and Scenarios

The **action** object defines **what happens** when a cart promotion’s **condition** is met.
In simple terms:

* **Condition** = *When does the offer apply?*
* **Action** = *What benefit does the customer get?*

| Concept   | Purpose                                                                 | Example                                   |
| :-------- | :---------------------------------------------------------------------- | :---------------------------------------- |
| condition | Specifies the trigger criteria for the cart promotion.                  | When the cart subtotal is ₹1,000 or more. |
| action    | Specifies the reward action or benefit once the condition is satisfied. | Apply a ₹200 discount.                    |

# Action Type Comparison Table

| Action Type    | When to Use It                                                 | What It Does                                                                       | Example cart Promotion                                           |
| :------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| CART\_BASED    | When the discount applies to the entire cart total.            | Gives a single discount based on the total value of all items in the cart.         | Get $200 off when your cart total is $1,000 or more.             |
| TENDER         | When the reward action depends on the payment method used.     | Applies a discount if the customer uses a specific payment mode.                   | Pay with a VISA card and get $100 off your total bill.           |
| PRODUCT\_BASED | When you want to discount specific products or categories.     | Applies a fixed or percentage discount to particular items that meet set criteria. | Get 10% off all Paint Supplies.                                  |
| FREE\_PRODUCT  | For "Buy X, Get Y Free" offers.                                | Reduces the price of one or more specific items to zero.                           | Buy a laptop and get a computer mouse for free.                  |
| FIXED\_PRICE   | To sell an item or group of items at a specific special price. | Overrides the original price of an item with a new, set price.                     | Get any large pizza for $10.                                     |
| PER\_UNIT      | When the reward action should repeat per quantity or group.    | Applies benefits repeatedly for each qualifying group of items or value.           | Buy 2 Paint Buckets, get 1 Paint Brush free for every 2 buckets. |

# Example response

```json 200 OK
{
    "data": {
        "id": "68e4b3d8dd46cd232fb723d3",
        "name": "Combo Product promotion ",
        "orgId": 100737,
        "priority": 0,
        "active": true,
        "messageLabel": "Get 15% off combo products",
        "type": "CUSTOMER",
        "condition": {
            "type": "COMBO_PRODUCT",
            "comboProductCondition": {
                "productConditions": [
                    {
                        "criteriaList": [
                            {
                                "entity": "SKU",
                                "operator": "IN",
                                "values": [
                                    "SKU001",
                                    "SKU002"
                                ]
                            }
                        ],
                        "kpi": "QUANTITY",
                        "value": "1.000000",
                        "operator": "GREATER_THAN_OR_EQUAL"
                    },
                    {
                        "criteriaList": [
                            {
                                "entity": "BRAND",
                                "operator": "IN",
                                "values": [
                                    "BRAND_A"
                                ]
                            }
                        ],
                        "kpi": "QUANTITY",
                        "value": "1.000000",
                        "operator": "GREATER_THAN_OR_EQUAL"
                    }
                ]
            }
        },
        "action": {
            "type": "PRODUCT_BASED",
            "productBasedAction": {
                "productBasedCondition": {
                    "type": "COMBO_PRODUCT",
                    "comboProductCondition": {
                        "productConditions": [
                            {
                                "criteriaList": [
                                    {
                                        "entity": "SKU",
                                        "operator": "IN",
                                        "values": [
                                            "SKU001",
                                            "SKU002"
                                        ]
                                    }
                                ],
                                "kpi": "QUANTITY",
                                "value": "1.000000",
                                "operator": "GREATER_THAN_OR_EQUAL"
                            },
                            {
                                "criteriaList": [
                                    {
                                        "entity": "BRAND",
                                        "operator": "IN",
                                        "values": [
                                            "BRAND_A"
                                        ]
                                    }
                                ],
                                "kpi": "QUANTITY",
                                "value": "1.000000",
                                "operator": "GREATER_THAN_OR_EQUAL"
                            }
                        ]
                    }
                },
                "type": "PERCENTAGE",
                "value": "15.000000",
                "includeItemsFromConditionSet": false
            }
        },
        "createdBy": 75197941,
        "createdOn": 1759818712969,
        "createdOnISO": "2025-10-07T06:31:52Z",
        "lastUpdatedBy": 75197941,
        "lastUpdatedOn": 1759818712969,
        "lastUpdatedOnISO": "2025-10-07T06:31:52Z",
        "startDate": 1759363200000,
        "startDateISO": "2025-10-02T00:00:00Z",
        "endDate": 1790985600000,
        "endDateISO": "2026-10-03T00:00:00Z",
        "campaignId": 286038,
        "promotionRestrictions": {
            "Promotion": [
                {
                    "kpi": "REDEMPTION",
                    "limit": "5000.000000"
                }
            ],
            "Cart": [
                {
                    "kpi": "DISCOUNT",
                    "limit": "50.000000"
                }
            ],
            "Customer": [
                {
                    "kpi": "TRANSACTION",
                    "frequency": "WEEKS",
                    "minTimeBetweenRepeat": 604800000,
                    "limit": "2.000000"
                },
                {
                    "kpi": "DISCOUNT",
                    "limit": "200.000000"
                },
                {
                    "kpi": "REDEMPTION",
                    "frequency": "DAYS",
                    "minTimeBetweenRepeat": 86400000,
                    "limit": "3.000000"
                }
            ]
        },
        "earnLimitedToSpecificAudience": true,
        "customFieldValues": {
            "Age": "25"
        },
        "customerActivationRequired": true,
        "mode": "DISCOUNT",
        "maxIssuancePerCustomer": 1,
        "isStackable": false
    }
}
```

# Response parameters

| Field                                  | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data                                   | Object          | Indicates the main container for the cart promotion object.                                                                                                                                                                                                                                                                                                                                                    |
| ..id                                   | String          | Specifies the unique, system-generated identifier for the cart promotion.                                                                                                                                                                                                                                                                                                                                      |
| ..name                                 | String          | Specifies the unique name of the cart promotion.                                                                                                                                                                                                                                                                                                                                                               |
| ..orgId                                | Integer         | Specifies the unique identifier for the organization to which this cart promotion belongs.                                                                                                                                                                                                                                                                                                                     |
| ..type                                 | String          | Specifies the type of cart promotion. Possible values: POS, CODE, CUSTOMER, EARNING, REWARD.                                                                                                                                                                                                                                                                                                                   |
| ..messageLabel                         | String          | Specifies a customer-facing label for the cart promotion message.                                                                                                                                                                                                                                                                                                                                              |
| ..active                               | Boolean         | Specifies if the cart promotion is active. Possible values: true, false.                                                                                                                                                                                                                                                                                                                                       |
| ..priority                             | Integer         | Specifies the order of application, where lower numbers have higher priority (0 is the highest). Defaults to 0 if not explicitly set during creation.                                                                                                                                                                                                                                                          |
| ..isStackable                          | Boolean         | Specifies if this cart promotion can be combined with other cart promotions. Defaults to false if not provided. Possible values: true, false.                                                                                                                                                                                                                                                                  |
| ..startDate                            | Long            | Specifies the start time of the cart promotion in Unix epoch milliseconds (UTC).                                                                                                                                                                                                                                                                                                                               |
| ..startDateISO                         | String          | Specifies the start date and time of the cart promotion in ISO 8601 format, returned in the server time zone. EU server example: `2025-10-02T00:00:00Z` → 02 October 2025, 00:00:00 (UTC). India server example: `2025-10-02T05:30:00+05:30` → 02 October 2025, 05:30:00 (IST). Note: The response time zone always matches the server time zone, regardless of the time zone offset in the request.           |
| ..endDate                              | Long            | Specifies the end time of the cart promotion in Unix epoch milliseconds (UTC).                                                                                                                                                                                                                                                                                                                                 |
| ..endDateISO                           | String          | Specifies the end date and time of the cart promotion in ISO 8601 format, returned in the server time zone. EU server example: `2026-10-03T00:00:00Z` → 03 October 2026, 00:00:00 (UTC). India server example: `2026-10-03T05:30:00+05:30` → 03 October 2026, 05:30:00 (IST). Note: The response time zone always matches the server time zone, regardless of the time zone offset in the request.             |
| ..campaignId                           | String          | Specifies the identifier of the campaign that the cart promotion is linked to.                                                                                                                                                                                                                                                                                                                                 |
| ..createdBy                            | Long            | Specifies the unique identifier of the user who created the cart promotion.                                                                                                                                                                                                                                                                                                                                    |
| ..createdOn                            | Long            | Specifies the creation time of the cart promotion in Unix epoch milliseconds (UTC).                                                                                                                                                                                                                                                                                                                            |
| ..createdOnISO                         | String          | Specifies the timestamp when the cart promotion was created, in ISO 8601 format, returned in the server time zone. EU server example: `2025-10-07T06:31:52Z` → 07 October 2025, 06:31:52 (UTC). India server example: `2025-10-07T12:01:52+05:30` → 07 October 2025, 12:01:52 (IST). Note: The response time zone always matches the server time zone, regardless of the time zone offset in the request.      |
| ..lastUpdatedBy                        | Long            | Specifies the unique identifier of the user who has last updated the cart promotion.                                                                                                                                                                                                                                                                                                                           |
| ..lastUpdatedOn                        | Long            | Specifies the last updated time of the cart promotion in Unix epoch milliseconds (UTC).                                                                                                                                                                                                                                                                                                                        |
| ..lastUpdatedOnISO                     | String          | Specifies the timestamp when the cart promotion was last updated, in ISO 8601 format, returned in the server time zone. EU server example: `2025-10-07T06:31:52Z` → 07 October 2025, 06:31:52 (UTC). India server example: `2025-10-07T12:01:52+05:30` → 07 October 2025, 12:01:52 (IST). Note: The response time zone always matches the server time zone, regardless of the time zone offset in the request. |
| ..condition                            | Object          | Specifies the rules that determine how the cart promotion applies.                                                                                                                                                                                                                                                                                                                                             |
| ....type                               | String          | Specifies the type of condition to evaluate. CART, TENDER, COMBO\_PRODUCT.                                                                                                                                                                                                                                                                                                                                     |
| ....cartCondition                      | Object          | Contains rules for the entire shopping cart.                                                                                                                                                                                                                                                                                                                                                                   |
| ......kpi                              | String          | Metric used to evaluate: SUBTOTAL, ITEMCOUNT.                                                                                                                                                                                                                                                                                                                                                                  |
| ......operator                         | String          | Comparison operator: EQUALS, GREATER\_THAN, GREATER\_THAN\_OR\_EQUAL.                                                                                                                                                                                                                                                                                                                                          |
| ......value                            | String          | Numerical value to compare kpi against.                                                                                                                                                                                                                                                                                                                                                                        |
| ....tenderCondition                    | Object          | Rules based on customer's payment method.                                                                                                                                                                                                                                                                                                                                                                      |
| ......tenderModes                      | Array           | Specific payment methods that will trigger condition.                                                                                                                                                                                                                                                                                                                                                          |
| ........type                           | String          | Category of the payment method. Possible value: CARD.                                                                                                                                                                                                                                                                                                                                                          |
| ........identifiers                    | Array           | Exact payment methods, e.g. \["VISA\_CARD"].                                                                                                                                                                                                                                                                                                                                                                   |
| ......condition                        | Object          | Contains a nested condition (typically CART type) that must also be satisfied.                                                                                                                                                                                                                                                                                                                                 |
| ....comboProductCondition              | Object          | Multiple product sets that must be in the cart.                                                                                                                                                                                                                                                                                                                                                                |
| ......productConditions                | Array           | Product conditions that must all be satisfied.                                                                                                                                                                                                                                                                                                                                                                 |
| ..action                               | Object          | Defines the action taken when the cart promotion applies.                                                                                                                                                                                                                                                                                                                                                      |
| ....type                               | String          | Specifies scope: CART\_BASED, PRODUCT\_BASED, TENDER, PER\_UNIT.                                                                                                                                                                                                                                                                                                                                               |
| ....cartBasedAction                    | Object          | Action for the entire cart.                                                                                                                                                                                                                                                                                                                                                                                    |
| ......type                             | String          | Type of cart-based action. Possible value: ABSOLUTE.                                                                                                                                                                                                                                                                                                                                                           |
| ......value                            | String          | Fixed monetary amount for discount.                                                                                                                                                                                                                                                                                                                                                                            |
| ....tenderBasedAction                  | Object          | Reward for tender-based promotion.                                                                                                                                                                                                                                                                                                                                                                             |
| ......type                             | String          | Calculation method: ABSOLUTE.                                                                                                                                                                                                                                                                                                                                                                                  |
| ......value                            | String          | Fixed monetary amount to be discounted.                                                                                                                                                                                                                                                                                                                                                                        |
| ....perUnitAction                      | Object          | Repeating reward action.                                                                                                                                                                                                                                                                                                                                                                                       |
| ......perUnitKPI                       | String          | Metric used to group items: QUANTITY.                                                                                                                                                                                                                                                                                                                                                                          |
| ......perUnitDivider                   | String          | Units required to trigger one instance of rewardAction.                                                                                                                                                                                                                                                                                                                                                        |
| ......includeItemsFromConditionSet     | Boolean         | Benefit applies to trigger items (`true`) or target set (`false`).                                                                                                                                                                                                                                                                                                                                             |
| ......rewardAction                     | Object          | Benefit granted for each qualifying unit group.                                                                                                                                                                                                                                                                                                                                                                |
| ........type                           | String          | Type: PRODUCT\_BASED, FREE\_PRODUCT, FIXED\_PRICE.                                                                                                                                                                                                                                                                                                                                                             |
| ........productBasedAction             | Object          | Discount on specific products.                                                                                                                                                                                                                                                                                                                                                                                 |
| ..........type                         | String          | Discount method: ABSOLUTE, PERCENTAGE.                                                                                                                                                                                                                                                                                                                                                                         |
| ..........value                        | String          | Discount amount or percentage.                                                                                                                                                                                                                                                                                                                                                                                 |
| ..........includeItemsFromConditionSet | Boolean         | Benefit applies to trigger items (`true`) or target set (`false`).                                                                                                                                                                                                                                                                                                                                             |
| ..........productBasedCondition        | Object          | Target set of products.                                                                                                                                                                                                                                                                                                                                                                                        |
| ............type                       | String          | Targeting mode: PRODUCT, COMBO\_PRODUCT.                                                                                                                                                                                                                                                                                                                                                                       |
| ............productCondition           | Object          | Contains target products using a list of criteria.                                                                                                                                                                                                                                                                                                                                                             |
| ..............criteriaList             | Array           | Array of rule objects.                                                                                                                                                                                                                                                                                                                                                                                         |
| ................entity                 | String          | Attribute evaluated (e.g., CATEGORY, SKU).                                                                                                                                                                                                                                                                                                                                                                     |
| ................operator               | String          | Operator: IN, NOT\_IN.                                                                                                                                                                                                                                                                                                                                                                                         |
| ................values                 | Array           | Strings to match against entity. Max 100.                                                                                                                                                                                                                                                                                                                                                                      |
| ..............kpi                      | String          | Metric for filtering: NONE, QUANTITY.                                                                                                                                                                                                                                                                                                                                                                          |
| ........freeProductAction              | Object          | Reward where products are given free.                                                                                                                                                                                                                                                                                                                                                                          |
| ..........includeItemsFromConditionSet | Boolean         | Benefit applies to trigger items (`true`) or target set (`false`).                                                                                                                                                                                                                                                                                                                                             |
| ..........productBasedCondition        | Object          | Products to be marked as free.                                                                                                                                                                                                                                                                                                                                                                                 |
| ........fixedPriceAction               | Object          | Products sold at fixed price.                                                                                                                                                                                                                                                                                                                                                                                  |
| ..........value                        | String          | New fixed price returned as string.                                                                                                                                                                                                                                                                                                                                                                            |
| ..........includeItemsFromConditionSet | Boolean         | Benefit applies to trigger items (`true`) or target set (`false`).                                                                                                                                                                                                                                                                                                                                             |
| ..........productBasedCondition        | Object          | Products sold at fixed price.                                                                                                                                                                                                                                                                                                                                                                                  |
| ..customerActivationRequired           | Boolean         | Specifies if customer must opt-in.                                                                                                                                                                                                                                                                                                                                                                             |
| ..maxIssuancePerCustomer               | Integer         | Max times promotion can be issued to single customer.                                                                                                                                                                                                                                                                                                                                                          |
| ..accumulationConfig                   | Object          | Cross-transaction quantity accumulation settings. Omitted if not configured.                                                                                                                                                                                                                                                                                                                                   |
| ...enabled                             | Boolean         | Whether accumulation across cycles is on for this promotion.                                                                                                                                                                                                                                                                                                                                                   |
| ...overAchievementEnabled              | Boolean         | Whether over-achieved quantity carries over to the next cycle.                                                                                                                                                                                                                                                                                                                                                 |
| ...lookbackPeriodLastXCycles           | Integer         | Number of past cycles included in over-achievement carryover. Defaults to the promotion `startDate` when null.                                                                                                                                                                                                                                                                                                 |
| ..earningCriteria                      | Object          | Conditions for EARNING type promotions.                                                                                                                                                                                                                                                                                                                                                                        |
| ....active                             | Boolean         | Specifies if earning rule is active.                                                                                                                                                                                                                                                                                                                                                                           |
| ....criteriaDsl                        | String          | DSL string representing rule.                                                                                                                                                                                                                                                                                                                                                                                  |
| ....criteriaDslJson                    | String          | Escaped JSON representation of rule.                                                                                                                                                                                                                                                                                                                                                                           |
| ....criteriaName                       | String          | Human-readable name for criteria rule.                                                                                                                                                                                                                                                                                                                                                                         |
| ....duration                           | Object          | Placeholder for duration-based rules.                                                                                                                                                                                                                                                                                                                                                                          |
| ....earnedFromType                     | String          | Event type: ACTIVITY.                                                                                                                                                                                                                                                                                                                                                                                          |
| ....eventType                          | String          | Trigger activity: TransactionAdd.                                                                                                                                                                                                                                                                                                                                                                              |
| ....groupId                            | Integer         | Identifier for grouping related criteria.                                                                                                                                                                                                                                                                                                                                                                      |
| ....milestoneId                        | Integer         | Identifier for milestone within program.                                                                                                                                                                                                                                                                                                                                                                       |
| ..maxEarningPerCustomer                | Integer or null | Max times reward can be earned from EARNING promotion.                                                                                                                                                                                                                                                                                                                                                         |
| ..promotionRestrictions                | Object          | Usage limits and constraints.                                                                                                                                                                                                                                                                                                                                                                                  |
| ....Promotion                          | Array           | Restrictions applying to overall promotion.                                                                                                                                                                                                                                                                                                                                                                    |
| ....Customer                           | Array           | Restrictions applying per customer.                                                                                                                                                                                                                                                                                                                                                                            |
| ....Cart                               | Array           | Restrictions applying per cart.                                                                                                                                                                                                                                                                                                                                                                                |
| ....Code                               | Array           | Restrictions for CODE promotions.                                                                                                                                                                                                                                                                                                                                                                              |
| ......kpi                              | String          | Metric limited: REDEMPTION, TRANSACTION, DISCOUNT.                                                                                                                                                                                                                                                                                                                                                             |
| ......frequency                        | String          | Reset frequency: DAYS, WEEKS.                                                                                                                                                                                                                                                                                                                                                                                  |
| ......minTimeBetweenRepeat             | Long            | Time between uses in ms.                                                                                                                                                                                                                                                                                                                                                                                       |
| ......limit                            | String          | Max allowed value for restriction.                                                                                                                                                                                                                                                                                                                                                                             |
| ......windowType                       | Enum            | Limit window type.                                                                                                                                                                                                                                                                                                                                                                                             |
| ......fixedWindowConfig                | Object          | Cycle configuration for FIXED window.                                                                                                                                                                                                                                                                                                                                                                          |
| .......cycleType                       | Enum            | Type of fixed cycle.                                                                                                                                                                                                                                                                                                                                                                                           |
| .......weekStartDay                    | Enum            | Start day for weekly cycle.                                                                                                                                                                                                                                                                                                                                                                                    |
| .......refreshRate                     | Integer         | Number of days per cycle.                                                                                                                                                                                                                                                                                                                                                                                      |
| .......cycleReferenceDate              | Long            | Anchor date for N\_DAY cycle. Epoch milliseconds.                                                                                                                                                                                                                                                                                                                                                              |
| .......cycleReferenceDateISO           | String          | ISO 8601 representation of `cycleReferenceDate`.                                                                                                                                                                                                                                                                                                                                                               |
| .......cycleReferenceDateSource        | Enum            | The cycle start date mode applied to this promotion. `PROMOTION_CONFIG`: all customers reset on the shared date in `cycleReferenceDate`. `ISSUANCE_DATE`: each customer resets on their individual issue date.                                                                                                                                                                                                 |
| ..customFieldValues                    | Object          | Key-value map for metadata.                                                                                                                                                                                                                                                                                                                                                                                    |
| ..mode                                 | String          | Application mode: DISCOUNT.                                                                                                                                                                                                                                                                                                                                                                                    |
| ..earnLimitedToSpecificAudience        | Boolean         | If earning is limited to audience.                                                                                                                                                                                                                                                                                                                                                                             |
| ..expiryDateChangeJobList              | Array           | Jobs created to change expiry dates.                                                                                                                                                                                                                                                                                                                                                                           |
| ....jobType                            | String          | Entity type: ISSUED, EARNED, CODE.                                                                                                                                                                                                                                                                                                                                                                             |
| ....status                             | String          | OPEN, IN\_PROGRESS, COMPLETED, FAILED, CANCELLED.                                                                                                                                                                                                                                                                                                                                                              |
| ....createdOn                          | Long            | Job creation date/time.                                                                                                                                                                                                                                                                                                                                                                                        |
| ....createdBy                          | Long            | User who created the job.                                                                                                                                                                                                                                                                                                                                                                                      |
| ....lastUpdatedOn                      | Long            | Last updated date/time.                                                                                                                                                                                                                                                                                                                                                                                        |
| ....lastUpdatedBy                      | Long            | User who last updated the job.                                                                                                                                                                                                                                                                                                                                                                                 |
| ....message                            | String          | Details about the expiry date change.                                                                                                                                                                                                                                                                                                                                                                          |

# Error codes

| Code | Description                                                                                                                                                                                                                      |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400  | Invalid request. Check required parameters. Ensure all required parameters are provided and valid.                                                                                                                               |
| 400  | SKU values exceed 100. Ensure the SKU values added are under 100 values.                                                                                                                                                         |
| 400  | Enum value is invalid. The scope must be "REWARD". Pass `scope` as `"REWARD"` only.                                                                                                                                              |
| 400  | defaultValue is required when isMandatory is true. Add a `defaultValue` if `isMandatory` is set to `true`.                                                                                                                       |
| 701  | Error while calling the segmentation engine. Check segmentation engine service connectivity and logs.                                                                                                                            |
| 703  | Org timezone fetch failed. Verify org timezone configuration and service availability.                                                                                                                                           |
| 704  | Invalid reward type passed. Provide a valid reward type as per API specification.                                                                                                                                                |
| 705  | Exceeded maximum active promotions for an org. Deactivate some active promotions before creating a new one.                                                                                                                      |
| 706  | Promotion has expired. Use a valid, non-expired promotion for the operation.                                                                                                                                                     |
| 707  | The passed promotion type is not supported. Change the promotion type to one supported by the system.                                                                                                                            |
| 708  | Exceeded the max earn per customer limit. Adjust the earn amount or check the customer limits setup.                                                                                                                             |
| 709  | Promotion not in running state. Ensure the promotion is currently running before proceeding.                                                                                                                                     |
| 710  | Error while saving earned promotion. Retry after checking backend/infrastructure logs.                                                                                                                                           |
| 711  | Error while saving promotion or Could not get product details. Check input data and ensure product service is available.                                                                                                         |
| 712  | Error while creating/updating emf rules. Check rule configuration and retry or contact support.                                                                                                                                  |
| 713  | Earned from type cannot be changed. Do not change `earnedFromType` on existing earned promotions.                                                                                                                                |
| 714  | Earn is not supported for this promotion type. Switch to a supported promotion type for earn operations.                                                                                                                         |
| 715  | Promotion was not issued to current customer. Ensure the promotion was issued to the specified customer.                                                                                                                         |
| 716  | Promotion name must be unique. Use an unused, unique promotion name.                                                                                                                                                             |
| 1011 | Cannot change restriction schema type on an existing promotion. Do not change `windowType` between `CLASSIC` and moving-window (`OVERALL`/`MOVING`) modes on a live promotion.                                                   |
| 1012 | Accumulation promotions only support `FREE_PRODUCT` (Buy X Get Y) rewards. Change the action type to `FREE_PRODUCT`.                                                                                                             |
| 1013 | Accumulation is not enabled for this org. Contact Capillary support to enable it.                                                                                                                                                |
| 1014 | Accumulation promotions cannot be stackable. Set `isStackable` to `false`.                                                                                                                                                       |
| 1015 | Over-achievement can only be enabled when accumulation is enabled. Set `accumulationConfig.enabled` to `true` first.                                                                                                             |
| 1016 | Accumulation is not supported for this condition type. Use `PRODUCT`, `COMBO_PRODUCT`, `PAYMENT_MODE_SCOPE`, or `PAYMENT_MODE_COMBO_PRODUCT`.                                                                                    |
| 1017 | Amount-based conditions are not supported for accumulation. Use a quantity-based (`kpi=QUANTITY`) condition instead.                                                                                                             |
| 1018 | Accumulation cannot be enabled once the promotion is live. Enable accumulation before the promotion's `startDate`.                                                                                                               |
| 1019 | `lookbackPeriodLastXCycles` can only be set when `overAchievementEnabled` is `true`. Remove the field or enable over-achievement first.                                                                                          |
| 1020 | Moving window restrictions are not supported for accumulation promotions. Use fixed window restrictions instead.                                                                                                                 |
| 1021 | Accumulation cannot be enabled for the org when locking is not enabled. Enable locking for the org first.                                                                                                                        |
| 1022 | Over-achievement cannot be enabled once the promotion is live. Enable over-achievement before the promotion's `startDate`.                                                                                                       |
| 1027 | Accumulation is not supported for `PAYMENT_VOUCHER` mode promotions. Use `DISCOUNT` mode instead.                                                                                                                                |
| 1028 | Accumulation can only be enabled when the org's redemption strategy is `REDEMPTION_WITH_CART_EVALUATION`. Update the org [redemption strategy](https://docs.capillarytech.com/docs/configuring-cart-promotion-redemption) first. |
| 500  | Internal server error. Retry the request after a short delay. If the error persists, contact support with details and logs.                                                                                                      |

# Example Overview

* [Spend $100, Get $10 Off : \[CART Condition\]](#spend-100-get-10-off-cart-condition)
* [Pay with VISA, Get $20 Off on Orders Above $100 : \[TENDER Condition\]](#pay-with-visa-get-20-off-on-orders-above-100-tender-condition)
* [Pay with Cash, Get $5 Off Paint Supplies : \[TENDER Condition\]](#pay-with-cash-get-5-off-paint-supplies-tender-condition)
* [Holiday Bonus Vouchers : \[TENDER Condition\]](#holiday-bonus-vouchers-tender-condition)
* [2 KitKats for 200 Points : \[TENDER Condition\]](#2-kitkats-for-200-points-tender-condition)
* [Buy a Burger and Fries, Get 15% Off : \[COMBO\_PRODUCT Condition\]](#buy-a-burger-and-fries-get-15-off-combo_product-condition)
* [Buy 2 Paint Supplies, Get $15 Off : \[PRODUCT Condition\]](#buy-2-paint-supplies-get-15-off-product-condition)
* [SAVE50 with Points on ChocoBrand : \[PAYMENT\_MODE\_SCOPE Condition\]](#save50-with-points-on-chocobrand-payment_mode_scope-condition)
* [Coke + ChocoBrand with Points for 50% off Maggi : \[PAYMENT\_MODE\_COMBO\_PRODUCT Condition\]](#coke-chocobrand-with-points-for-50-off-maggi-payment_mode_combo_product-condition)
* [Pay with Points, Get 10% Off : \[PAYMENT\_MODE Condition\]](#pay-with-points-get-10-off-payment_mode-condition)
* [Spend $100, Get $10 Off : \[CART\_BASED Action\]](#spend-100-get-10-off-cart_based-action)
* [Pay with VISA, Get $20 Off on Orders Above $100 : \[TENDER Action\]](#pay-with-visa-get-20-off-on-orders-above-100-tender-action)
* [Laptop + Accessory Bundle Deal : \[PRODUCT\_BASED Action\]](#laptop-accessory-bundle-deal-product_based-action)
* [25 Percent Off First Two Snacks : \[PRODUCT\_BASED Action\]](#25-percent-off-first-two-snacks-product_based-action)
* [Get 25% Off All Snacks : \[PER\_UNIT Action\]](#get-25-off-all-snacks-per_unit-action)
* [Buy 2 Shirts, Get a Tie Free : \[PER\_UNIT Action\]](#buy-2-shirts-get-a-tie-free-per_unit-action)
* [Any Large Pizza for $10 : \[PER\_UNIT Action\]](#any-large-pizza-for-10-per_unit-action)
* [Work From Home Bundle - 50% Off : \[PRODUCT\_BASED Action\]](#work-from-home-bundle---50-off-product_based-action)
* [Ultimate Workstation Bundle - $1200 : \[FIXED\_PRICE Action\]](#ultimate-workstation-bundle---1200-fixed_price-action)
* [Any Large Pizza for $10 : \[FIXED\_PRICE Action\]](#any-large-pizza-for-10-fixed_price-action)
* [Happy Hour Daily Discount : \[CUSTOMER Level Restriction\]](#happy-hour-daily-discount-customer-level-restriction)
* [Monthly Freshness Deal : \[FIXED Window Restriction\]](#monthly-freshness-deal-fixed-window-restriction)
* [25% Off Sitewide (Capped at $100) : \[CART Level Restriction\]](#25-off-sitewide-capped-at-100-cart-level-restriction)
* [Grand Opening - First 1000 Customers : \[PROMOTION Level Restriction\]](#grand-opening---first-1000-customers-promotion-level-restriction)
* [15% Off First Order - Single-Use Codes : \[CODE Level Restriction\]](#15-off-first-order---single-use-codes-code-level-restriction)
* [Milestone Reward - $50 Voucher : \[EARNING Criteria\]](#milestone-reward---50-voucher-earning-criteria)
* [New Store Opening Special : \[STORE Criteria\]](#new-store-opening-special-store-criteria)
* [Weekday Happy Hour : \[TIME Criteria\]](#weekday-happy-hour-time-criteria)
* [Gold Tier Exclusive : \[SUPPLEMENTARY Criteria\]](#gold-tier-exclusive-supplementary-criteria)
* [Buy 10 Coffees Across Multiple Visits, Get the 11th Free : \[accumulationConfig Object\]](#buy-10-coffees-across-multiple-visits-get-the-11th-free-accumulationconfig-object)

# Detailed Examples

<a id="spend-100-get-10-off-cart-condition" />

### Spend $100, Get $10 Off : \[CART Condition]

##### **Requirement:** The brand wants to set up a cart promotion, "Spend $100, Get $10 Off," with the condition that if the cart's subtotal is greater than or equal to $100, a fixed discount of $10 is applied to the entire cart.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OTNhAxMzU5NGIwNDllZTk=' \
--header 'Cookie: _cfuvid=5O_PtucI3YnfDUgjgMPnHbPeEKcKJjaHWDOkNDip3Po-1760116657904-0.0.1.1-604800000' \
--data '{
  "name": "Spend 100 Get 10 Off12",
  "orgId": 100737,
  "type": "CUSTOMER",
  "messageLabel": "Get $10 off on orders over $100!",
  "active": true,
  "priority": 0,
  "isStackable": false,
  "startDate": 1759363200000,
  "endDate": 1790985600000,
  "campaignId": "286039",
  "condition": {
    "type": "CART",
    "cartCondition": {
      "kpi": "SUBTOTAL",
      "operator": "GREATER_THAN_OR_EQUAL",
      "value": 100
    }
  },
  "action": {
    "type": "CART_BASED",
    "cartBasedAction": {
      "type": "ABSOLUTE",
      "value": 10
    }
  },
  "customerActivationRequired": true,
  "maxIssuancePerCustomer": 1,
  "promotionRestrictions": {},
  "customFieldValues": {}
}'
```

<a id="pay-with-visa-get-20-off-on-orders-above-100-tender-condition" />

### Pay with VISA, Get $20 Off on Orders Above $100 : \[TENDER Condition]

##### **Requirement: 1** The brand wants to set up a cart promotion, "Pay with VISA, Get $20 Off on Orders Above $100," with conditions that if a customer's cart subtotal is greater than or equal to $100 AND they pay with a VISA card, an absolute discount of $20 is applied.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Cookie: _cfuvid=9769067-0.0.1.1-604800000; _cfuvid=5O_PtucI3YnfDUgjgMPnHbPeEKcKJjaHWDOkNDip3Po-1760116657904-0.0.1.1-604800000' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OTNhMjI2MTk1OGE2NWI5ZjAxMzU5NGIwNDllZTk=' \
--data '{
  "name": "Cash Discount on Paint Supplies5",
  "orgId": 100737,
  "type": "CUSTOMER",
  "messageLabel": "Pay with Cash and Get $5 Off Paint Supplies",
  "active": true,
  "priority": 0,
  "isStackable": false,
  "startDate": 1759363200000,
  "endDate": 1790985600000,
  "campaignId": "286039",
  "condition": {
    "type": "TENDER",
    "tenderCondition": {
      "tenderModes": [
        {
          "type": "CASH"
        }
      ],
      "condition": {
        "type": "PRODUCT",
        "productCondition": {
          "criteriaList": [
            {
              "entity": "CATEGORY",
              "values": [
                "Paint Supplies"
              ],
              "operator": "IN"
            }
          ],
          "kpi": "QUANTITY",
          "operator": "GREATER_THAN_OR_EQUAL",
          "value": "1"
        }
      }
    }
  },
  "action": {
    "type": "TENDER",
    "tenderBasedAction": {
      "type": "ABSOLUTE",
      "value": "5"
    }
  },
  "customerActivationRequired": false,
  "maxIssuancePerCustomer": 1,
  "promotionRestrictions": {},
  "customFieldValues": {}
}'
```

<a id="pay-with-cash-get-5-off-paint-supplies-tender-condition" />

### Pay with Cash, Get $5 Off Paint Supplies : \[TENDER Condition]

##### **Requirement 2**: The brand wants to set up a cart promotion, "Pay with Cash, Get $5 Off Paint Supplies," with conditions that if a customer buys at least one item from the "Paint Supplies" category AND they pay with cash, an absolute discount of $5 is applied.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OMzU5NGIwNDllZTk=' \
--header 'Cookie: _cfuvid=5O_PtucI3YnfDUgjgMPnHbPeEKcKJjaHWDOkNDip3Po-1760116657904-0.0.1.1-604800000' \
--data '{
  "name": "Cash Discount on Paint Supplies21",
  "orgId": 100737,
  "type": "CUSTOMER",
  "messageLabel": "Pay with Cash and Get $5 Off Paint Supplies",
  "active": true,
  "priority": 0,
  "isStackable": false,
  "startDate": 1759363200000,
  "endDate": 1790985600000,
  "campaignId": "286039",
  "condition": {
    "type": "TENDER",
    "tenderCondition": {
      "tenderModes": [
        {
          "type": "CASH"
        }
      ],
      "condition": {
        "type": "PRODUCT",
        "productCondition": {
          "criteriaList": [
            {
              "entity": "CATEGORY",
              "values": [
                "Paint Supplies"
              ],
              "operator": "IN"
            }
          ],
          "kpi": "QUANTITY",
          "operator": "GREATER_THAN_OR_EQUAL",
          "value": "1"
        }
      }
    }
  },
  "action": {
    "type": "TENDER",
    "tenderBasedAction": {
      "type": "ABSOLUTE",
      "value": "5"
    }
  },
  "customerActivationRequired": false,
  "maxIssuancePerCustomer": 1,
  "promotionRestrictions": {},
  "customFieldValues": {}
}'
```

<a id="holiday-bonus-vouchers-tender-condition" />

### Holiday Bonus Vouchers : \[TENDER Condition]

##### **Requirement 3:** The brand has previously issued a specific set of high-value gift vouchers (e.g., "Holiday Bonus Vouchers") to select customers. For the redemption of these specific vouchers, they want to run a special promotion. The condition is: if a customer pays using one of these specific "Holiday Bonus Vouchers" (identified by its unique ID), the system will apply an additional $100 absolute discount to their transaction.

```json
{
  "name": "Gift voucher promotion test 5",
  "orgId": 100458,
  "type": "REWARD",
  "messageLabel": "Gift voucher test",
  "active": true,
  "priority": 0,
  "isStackable": false,
  "startDate": 1761105600000,
  "endDate": 1764565199999,
  "campaignId": "286039",
  "condition": {
    "type": "TENDER",
    "tenderCondition": {
      "tenderModes": [
        {
          "type": "PAYMENT_VOUCHER",
          "identifiers": [
            "68f73e2d4a314550c4b458a3"
          ]
        }
      ]
    }
  },
  "action": {
    "type": "TENDER",
    "tenderBasedAction": {
      "type": "ABSOLUTE",
      "value": "100"
    }
  },
  "customerActivationRequired": false,
  "maxIssuancePerCustomer": 1,
  "maxEarningPerCustomer": 100,
  "promotionRestrictions": {},
  "customFieldValues": {}
}
```

<a id="2-kitkats-for-200-points-tender-condition" />

### 2 KitKats for 200 Points : \[TENDER Condition]

##### Requirement 4: The brand wants to offer a special redemption rate for loyalty members. The promotion is: "Redeem 2 KitKat items for only 200 points (usual 400 points)." This special rate is only triggered if the customer has chosen to pay using "Points" as their payment method.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzN4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=mhzUbsb0moSA\vZgzvXzivXm5uY-1761199170391-0.0.1.1-604800000' \
--data '{
  "name": "Preferential Redemption - KitKat Bundle",
  "orgId": 100458,
  "type": "REWARD",
  "messageLabel": "Special Offer: 2 KitKats for 200 Points!",
  "active": true,
  "priority": 0,
  "isStackable": false,
  "startDate": 1759363200000,
  "endDate": 1790985600000,
  "campaignId": "293076",
  "condition": {
    "type": "TENDER",
    "tenderCondition": {
      "tenderModes": [
        {
          "type": "CARD",
          "identifiers": [
            "Points"
          ]
        }
      ],
      "condition": {
        "type": "PRODUCT",
        "productCondition": {
          "criteriaList": [
            {
              "entity": "SKU",
              "values": [
                "KITKAT_SKU"
              ],
              "operator": "IN"
            }
          ],
          "kpi": "QUANTITY",
          "operator": "GREATER_THAN_OR_EQUAL",
          "value": "2"
        }
      }
    }
  },
  "action": {
    "type": "TENDER",
    "tenderBasedAction": {
      "type": "ABSOLUTE",
      "value": "200"
    }
  },
  "customerActivationRequired": false,
  "maxIssuancePerCustomer": 10,
  "promotionRestrictions": {},
  "customFieldValues": {}
}'
```

<a id="buy-a-burger-and-fries-get-15-off-combo_product-condition" />

### Buy a Burger and Fries, Get 15% Off : \[COMBO\_PRODUCT Condition]

##### **Requirement:** The brand wants to set up a cart promotion, "Buy a Burger and Fries, Get 15% Off," with conditions that if a customer's cart contains at least one item from the "Burgers" category AND at least one item from the "Fries" category, a 15% discount is applied to those specific items.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY22NWI5ZjAxMzU5NGIwNDllZTk=' \
--header 'Cookie: _cfuvid=5O_PtucI3YnfcKJjaHWDOkNDip3Po-1760116657904-0.0.1.1-604800000' \
--data '{
  "name": "Burger and Fries Combo Discount",
  "orgId": 100737,
  "type": "CUSTOMER",
  "messageLabel": "Get 15% off our Burger and Fries Combo!",
  "active": true,
  "priority": 0,
  "isStackable": false,
  "startDate": 1759363200000,
  "endDate": 1790985600000,
  "campaignId": "286039",
  "condition": {
    "type": "COMBO_PRODUCT",
    "comboProductCondition": {
      "productConditions": [
        {
          "kpi": "QUANTITY",
          "operator": "GREATER_THAN_OR_EQUAL",
          "value": "1",
          "criteriaList": [
            {
              "entity": "CATEGORY",
              "operator": "IN",
              "values": [
                "Burgers"
              ]
            }
          ]
        },
        {
          "kpi": "QUANTITY",
          "operator": "GREATER_THAN_OR_EQUAL",
          "value": "1",
          "criteriaList": [
            {
              "entity": "CATEGORY",
              "operator": "IN",
              "values": [
                "Fries"
              ]
            }
          ]
        }
      ]
    }
  },
  "action": {
    "type": "PRODUCT_BASED",
    "productBasedAction": {
      "type": "PERCENTAGE",
      "value": "15.00",
      "productBasedCondition": {
        "type": "COMBO_PRODUCT",
        "comboProductCondition": {
          "productConditions": [
            {
              "kpi": "QUANTITY",
              "operator": "GREATER_THAN_OR_EQUAL",
              "value": "1",
              "criteriaList": [
                {
                  "entity": "CATEGORY",
                  "operator": "IN",
                  "values": [
                    "Burgers"
                  ]
                }
              ]
            },
            {
              "kpi": "QUANTITY",
              "operator": "GREATER_THAN_OR_EQUAL",
              "value": "1",
              "criteriaList": [
                {
                  "entity": "CATEGORY",
                  "operator": "IN",
                  "values": [
                    "Fries"
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },
  "customerActivationRequired": true,
  "maxIssuancePerCustomer": 1,
  "promotionRestrictions": {},
  "customFieldValues": {}
}'
```

<a id="buy-2-paint-supplies-get-15-off-product-condition" />

### Buy 2 Paint Supplies, Get $15 Off : \[PRODUCT Condition]

##### **Requirement**: The brand wants to set up a cart promotion, "Buy 2 'Paint Supplies', Get $15 Off Your Order," with the condition that if the cart contains at least two items from the "Paint Supplies" category, a fixed discount of $15 is applied to the entire cart.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRW86Mm5ZjAxMzU5NGIwNDllZTk=' \
--header 'Cookie: _cfuvid=5O_PtucI3YnHbPip3Po-1760116657904-0.0.1.1-604800000' \
--data '{
    "name": "Buy 2 Paint Supplies Get 15 Off",
    "type": "CUSTOMER",
    "messageLabel": "Get $15 off when you buy two paint supplies!",
    "active": true,
    "priority": 0,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "PRODUCT",
        "productCondition": {
            "criteriaList": [
                {
                    "entity": "CATEGORY",
                    "operator": "IN",
                    "values": [
                        "Paint Supplies"
                    ]
                }
            ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "2"
        }
    },
    "action": {
        "type": "CART_BASED",
        "cartBasedAction": {
            "type": "ABSOLUTE",
            "value": 15
        }
    },
    "customerActivationRequired": false,
    "maxIssuancePerCustomer": 1,
    "promotionRestrictions": {},
    "customFieldValues": {}
}'\'''
```

<a id="save50-with-points-on-chocobrand-payment_mode_scope-condition" />

### SAVE50 with Points on ChocoBrand : \[PAYMENT\_MODE\_SCOPE Condition]

##### **Requirement:** A convenience store wants to set up a code-based promotion: "Use code SAVE50, Get 50% Off on 'ChocoBrand' cake when paying with Points".

```json
{
    
    "name": "CODE: POINTS Payment + Oreo → 50% Off",
    "orgId": 50672,
    "priority": 5,
    "active": true,
    "messageLabel": "test!!",
    "type": "CODE",
    "condition": {
        "type": "PAYMENT_MODE_SCOPE",
        "paymentModeScopeConditionRO": {
            "paymentModeCondition": {
                "paymentModeSelectionCriteriaRO": {
                    "operator": "IN",
                    "values": [
                        "POINTS"
                    ]
                }
            }
            ,
            "condition": {
                "type": "PRODUCT",
                "productCondition": {
                    "criteriaList": [
                        {
                            "entity": "SKU",
                            "operator": "IN",
                            "values": [
                                "ChocoBrand"
                            ]
                        }
                    ],
                    "kpi": "QUANTITY",
                    "value": 1.000000,
                    "operator": "GREATER_THAN_OR_EQUAL"
                }
            }
        }
    },
    "action": {
        "type": "PRODUCT_BASED",
        "productBasedAction": {
            "type": "PERCENTAGE",
            "value": 50.000000,
            "includeItemsFromConditionSet": false
        }
    },
    "createdBy": 1234,
    "createdOn": 1761670118230,
    "lastUpdatedBy": 1234,
    "lastUpdatedOn": 1761670118230,
    "startDate": 1761497318230,
    "endDate": 1762104742000,
    "campaignId": 2013,
    "promotionRestrictions": {
        "Code": [
            {
                "kpi": "REDEMPTION",
                "limit": 100.000000
            }
        ]
    },
    "earnLimitedToSpecificAudience": false,
    "customFieldValues": {
        "f1": "v1",
        "f2": "v2"
    },
    "mode": "DISCOUNT",
    "maxIssuancePerCustomer": 1,
    "isStackable": false
}
```

<a id="coke-chocobrand-with-points-for-50-off-maggi-payment_mode_combo_product-condition" />

### Coke + ChocoBrand with Points for 50% off Maggi : \[PAYMENT\_MODE\_COMBO\_PRODUCT Condition]

##### **Requirement:** A convenience store wants to set up a POS promotion, "Buy Coke & ChocoBrand biscuit with Points payment mode, and get 50% off on Maggi noodles."

```json
{
    "name": "POINTS Payment Combo: Coke+ChocoBrand → 50% off Maggi",
    "type": "POS",
    "mode": "DISCOUNT",
    "campaignId": "286039",
    "condition": {
        "type": "PAYMENT_MODE_COMBO_PRODUCT",
        "paymentComboProductConditionRO": {
            "paymentModeCondition": {
                "paymentModeSelectionCriteriaRO": {
                    "operator": "IN",
                    "values": ["POINTS"]
                }
            },
            "comboProductCondition": {
                "productConditions": [
                    {
                        "criteriaList": [
                            {
                                "entity": "SKU",
                                "operator": "IN",
                                "values": ["COKE"]
                            }
                        ],
                        "kpi": "AMOUNT",
                        "value": 2,
                        "operator": "GREATER_THAN_OR_EQUAL"
                    },
                    {
                        "criteriaList": [
                            {
                                "entity": "SKU",
                                "operator": "IN",
                                "values": ["ChocoBrand"]
                            }
                        ],
                        "kpi": "AMOUNT",
                        "value": 1,
                        "operator": "GREATER_THAN_OR_EQUAL"
                    }
                ]
            }
        }
    },
    "action": {
        "type": "PRODUCT_BASED",
        "productBasedAction": {
            "productBasedCondition": {
                "type": "PRODUCT",
                "productCondition": {
                    "criteriaList": [
                        {
                            "entity": "SKU",
                            "operator": "IN",
                            "values": ["MAGGI"]
                        }
                    ],
                    "kpi": "AMOUNT",
                    "value": 0,
                    "operator": "GREATER_THAN"
                }
            },
            "type": "PERCENTAGE",
            "value": 50,
            "includeItemsFromConditionSet": false
        }
    }
}
```

<a id="pay-with-points-get-10-off-payment_mode-condition" />

### Pay with Points, Get 10% Off : \[PAYMENT\_MODE Condition]

##### **Requirement:** A store wants to set up a promotion, "Pay with Points, Get 10% Off Your Order," where a 10% discount is applied to the cart when a customer pays using Points.

```json
{
    "name": "Pay with Points - 10% Off",
    "orgId": 50672,
    "type": "CUSTOMER",
    "mode": "DISCOUNT",
    "messageLabel": "Pay with Points and save 10%",
    "active": true,
    "priority": 0,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "PAYMENT_MODE",
        "paymentModeCondition": {
            "paymentModeSelectionCriteriaRO": {
                "operator": "IN",
                "values": [
                    "POINTS"
                ]
            }
        }
    },
    "action": {
        "type": "PRODUCT_BASED",
        "productBasedAction": {
            "type": "PERCENTAGE",
            "value": 10,
            "includeItemsFromConditionSet": false
        }
    }
}
```

<a id="spend-100-get-10-off-cart_based-action" />

### Spend $100, Get $10 Off : \[CART\_BASED Action]

##### **Requirement**: The brand wants to set up a cart promotion, "Spend $100, Get $10 Off," with the condition that if the cart's subtotal is greater than or equal to $100, a fixed discount of $10 is applied to the entire cart.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Cookie: _cfuv_vSE54e.Ky_kOxQM.ixIiU-1760115687488-0.0.1.1-604800000' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW85OGE2NWI5ZjAxMzU5NGIwNDllZTk=' \
--data '{
  "name": "Spend 100 Get 10 Off",
  "orgId": 100737,
  "type": "CUSTOMER",
  "messageLabel": "Get $10 off on orders over $100!",
  "active": true,
  "priority": 0,
  "isStackable": false,
  "startDate": 1759363200000,
  "endDate": 1790985600000,
  "campaignId": "286039",
  "condition": {
    "type": "CART",
    "cartCondition": {
      "kpi": "SUBTOTAL",
      "operator": "GREATER_THAN_OR_EQUAL",
      "value": 100
    }
  },
  "action": {
    "type": "CART_BASED",
    "cartBasedAction": {
      "type": "ABSOLUTE",
      "value": 10
    }
  },
  "customerActivationRequired": true,
  "maxIssuancePerCustomer": 1,
  "promotionRestrictions": {},
  "customFieldValues": {}
}'
```

<a id="pay-with-visa-get-20-off-on-orders-above-100-tender-action" />

### Pay with VISA, Get $20 Off on Orders Above $100 : \[TENDER Action]

##### **Requirement**: The brand wants to set up a cart promotion, "Pay with VISA, Get $20 Off on Orders Above $100," with conditions that if a customer's cart subtotal is greater than or equal to $100 AND they pay with a VISA card, an absolute discount of $20 is applied.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlI5ZjAxMzU5NGIwkNDip3Po-1760116657904-0.0.1.1-604800000' \
--data '{
  "name": "VISA Discount on Cart Total",
  "orgId": 100737,
  "type": "CUSTOMER",
  "messageLabel": "Get $20 off with VISA on orders above $100",
  "active": true,
  "priority": 0,
  "isStackable": false,
  "startDate": 1759363200000,
  "endDate": 1790985600000,
  "campaignId": "286039",
  "condition": {
    "type": "TENDER",
    "tenderCondition": {
      "tenderModes": [
        {
          "type": "CARD",
          "identifiers": [
            "VISA_CARD"
          ]
        }
      ],
      "condition": {
        "type": "CART",
        "cartCondition": {
          "kpi": "SUBTOTAL",
          "operator": "GREATER_THAN_OR_EQUAL",
          "value": 100
        }
      }
    }
  },
  "action": {
    "type": "TENDER",
    "tenderBasedAction": {
      "type": "ABSOLUTE",
      "value": "20"
    }
  },
  "customerActivationRequired": true,
  "maxIssuancePerCustomer": 1,
  "promotionRestrictions": {},
  "customFieldValues": {}
}'
```

<a id="laptop-accessory-bundle-deal-product_based-action" />

### Laptop + Accessory Bundle Deal : \[PRODUCT\_BASED Action]

##### **Requirement 1**: The brand wants to set up a cart promotion where a customer buys any laptop, they should receive a 50% discount on an accessory bundle.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOGFmNDI3MGQ3YzI4ZjU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=m_cAUxdAS9kIldmFfEaOkagijzS7nWq3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data 'curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOGFmNDI3MGQ3YzI4ZjU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=m_cAUxdAS9kIldmFfEaOkagijzS7nWq3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "Laptop + Accessory Bundle Deal",
    "type": "POS",
    "messageLabel": "Buy a Laptop, Get 50% Off a Mouse & Keyboard!",
    "active": true,
    "priority": 5,
    "isStackable": false,
    "startDate": 1760332800000,
    "endDate": 1792031999000,
    "campaignId": "286039",
    "condition": {
        "type": "PRODUCT",                             
        "productCondition": {
            "criteriaList": [
                {
                    "entity": "CATEGORY",
                    "operator": "IN",
                    "values": ["Laptops"]             
                }
            ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "1"                              
        }
    },
    "action": {
        "type": "PRODUCT_BASED",                      
        "productBasedAction": {
            "type": "PERCENTAGE",                     
            "value": "50",                            
            "includeItemsFromConditionSet": false,    
            "productBasedCondition": {
                "type": "COMBO_PRODUCT",              
                "comboProductCondition": {
                    "productConditions": [            
                        {
                            "criteriaList": [
                                {
                                    "entity": "CATEGORY",
                                    "operator": "IN",
                                    "values": ["Mouse"] 
                                }
                            ],
                            "kpi": "QUANTITY",        
                            "operator": "EQUALS",     
                            "value": "1"              
                        },
                        {
                            "criteriaList": [
                                {
                                    "entity": "CATEGORY",
                                    "operator": "IN",
                                    "values": ["Keyboards"] 
                                }
                            ],
                            "kpi": "QUANTITY",        
                            "operator": "EQUALS",     
                            "value": "1"              
                        }
                    ]
                }
            }
        }
    }
}'\''''\'''
```

<a id="25-percent-off-first-two-snacks-product_based-action" />

### 25 Percent Off First Two Snacks : \[PRODUCT\_BASED Action]

##### **Requirement 2**: A brand wants to offer a "25% Off Snacks" cart promotion, but to manage costs, they want the discount to apply only to the first two snack items a customer buys.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOGFmNDI3MGQ3YzI4ZjU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=m_cAUxdAS9kIldmFfEaOkagijzS7nWq3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "25 Percent Off First Two Snacks",
    "type": "POS",
    "messageLabel": "25% Off the first two snacks you buy!",
    "active": true,
    "priority": 1,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "PRODUCT",                             // Trigger: If the cart contains at least one snack.
        "productCondition": {
            "criteriaList": [
                {
                    "entity": "CATEGORY",
                    "operator": "IN",
                    "values": ["Snacks"]
                }
            ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "1"
        }
    },
    "action": {
        "type": "PRODUCT_BASED",                      // Action: Apply a discount to specific products.
        "productBasedAction": {
            "type": "PERCENTAGE",                     // The discount is 25%.
            "value": "25.00",
            "productBasedCondition": {
                "type": "PRODUCT",
                "productCondition": {
                    "criteriaList": [                 // Rule: Find items in the "Snacks" category.
                        {
                            "entity": "CATEGORY",
                            "operator": "IN",
                            "values": [
                                "Snacks"
                            ]
                        }
                    ],
                    "kpi": "QUANTITY",                // KPI: Apply the discount based on the quantity of snacks.
                    "operator": "EQUALS",             // Logic: The quantity must be an exact match.
                    "value": "2"                      // Value: The discount applies to exactly TWO snack items.
                }
            }
        }
    },
    "customerActivationRequired": false,
    "maxIssuancePerCustomer": 10,
    "promotionRestrictions": {},
    "customFieldValues": {}
}'\'''
```

<a id="get-25-off-all-snacks-per_unit-action" />

### Get 25% Off All Snacks : \[PER\_UNIT Action]

##### **Requirement 1** : The brand wants to set up a product-specific discount cart promotion, "Get 25% Off All Snacks," with conditions that if a customer adds any item from the "Snacks" category to their cart, a 25% discount is applied to those specific items.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOGFmNDjU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=m_cAUxdASkagijzS7nWq3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "Buy a Drink, Get 25% Off Two Snacks",
    "type": "POS",
    "messageLabel": "Buy a Drink, Get 25% Off Up to Two Snacks!",
    "active": true,
    "priority": 1,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "PRODUCT",                             // The trigger condition is buying a specific product.
        "productCondition": {
            "criteriaList": [
                {
                    "entity": "CATEGORY",
                    "operator": "IN",
                    "values": ["Drinks"]              // Triggers if the cart contains at least one item from the "Drinks" category.
                }
            ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "1"
        }
    },
    "action": {
        "type": "PER_UNIT",                           // Using PER_UNIT to precisely control the reward.
        "perUnitAction": {
            "perUnitKPI": "QUANTITY",                 // The logic is based on the quantity of items.
            "perUnitDivider": "1",                    // This action logic will run once per triggering item.
            "rewardAction": {
                "type": "PRODUCT_BASED",              // The reward is a discount on specific products.
                "productBasedAction": {
                    "type": "PERCENTAGE",             // The discount is 25%.
                    "value": 25,
                    "includeItemsFromConditionSet": false, // The discount applies to snacks, NOT the drink that triggered the promo.
                    "productBasedCondition": {
                        "type": "PRODUCT",
                        "productCondition": {
                            "criteriaList": [         // Identifies the items eligible for the discount.
                                {
                                    "entity": "CATEGORY",
                                    "operator": "IN",
                                    "values": ["Snacks"] // The discount applies only to items in the "Snacks" category.
                                }
                            ],
                            "kpi": "QUANTITY",        // Use a KPI to limit how many snacks get the discount.
                            "operator": "EQUALS",     // The quantity must be an exact match.
                            "value": "2"              // The 25% discount applies to exactly TWO snack items.
                        }
                    }
                }
            }
        }
    },
    "customerActivationRequired": false,
    "maxIssuancePerCustomer": 10,
    "promotionRestrictions": {},
    "customFieldValues": {}
}'\'''
```

<a id="buy-2-shirts-get-a-tie-free-per_unit-action" />

### Buy 2 Shirts, Get a Tie Free : \[PER\_UNIT Action]

##### **Requirement 2:** The brand wants to set up a cart promotion, where a customer buys any two items from the 'Shirts' category, they are eligible to receive one item from the 'Ties' category for free.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOjU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=m_cAUxdAS9kIldnWq3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "Buy 2 Shirts, Get a Tie Free",
    "type": "POS",
    "messageLabel": "Free tie when you buy any two shirts!",
    "active": true,
    "priority": 1,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "PRODUCT",                             // The trigger is based on specific products.
        "productCondition": {
            "criteriaList": [
                {
                    "entity": "CATEGORY",
                    "operator": "IN",
                    "values": ["Shirts"]              // Checks for items in the "Shirts" category.
                }
            ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "2"                              // Triggers when the cart has at least two shirts.
        }
    },
    "action": {
        "type": "PER_UNIT",
        "perUnitAction": {
            "perUnitKPI": "QUANTITY",                 // Logic is based on the quantity of triggering items.
            "perUnitDivider": "2",                    // The reward action will trigger for every 2 shirts.
            "rewardAction": {
                "type": "FREE_PRODUCT",               // The reward is a free product.
                "freeProductAction": {
                    "includeItemsFromConditionSet": false, // The free item is NOT a shirt.
                    "productBasedCondition": {
                        "type": "PRODUCT",
                        "productCondition": {
                            "criteriaList": [         // Identifies the item that will be made free.
                                {
                                    "entity": "CATEGORY",
                                    "operator": "IN",
                                    "values": ["Ties"]// The free item must be from the "Ties" category.
                                }
                            ],
                            "kpi": "QUANTITY",        // Use a KPI to specify how many ties are made free.
                            "operator": "EQUALS",     // The quantity must be an exact match.
                            "value": "1"              // Exactly ONE tie will be made free.
                        }
                    }
                }
            }
        }
    },
    "customerActivationRequired": false,
    "maxIssuancePerCustomer": 10,
    "promotionRestrictions": {},
    "customFieldValues": {}
}''\'''
```

<a id="any-large-pizza-for-10-per_unit-action" />

### Any Large Pizza for $10 : \[PER\_UNIT Action]

##### **Requirement 3**: The brand wants to set up a cart promotion, "Any Large Pizza for $10," with conditions that if a customer buys any item from the "Large Pizzas" category, its price is set to $10.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OTNhMjI2MTk1OGE2NWI5ZjAxMzU5NGIwNDllZTk=' \
--header 'Cookie: _cfuvid=5O_PtucI3YnfDUgjgMPnHbPeEKcKJjaHWDOkNDip3Po-1760116657904-0.0.1.1-604800000' \
--data '{
  "name": "Any Large Pizza for 10 Dollars",
  "orgId": 100737,
  "type": "POS",
  "messageLabel": "Hot Deal: Any Large Pizza for just $10!",
  "active": true,
  "priority": 2,
  "isStackable": true,
  "startDate": 1759363200000,
  "endDate": 1790985600000,
  "campaignId": "286039",
  "condition": {
    "type": "CART",
    "cartCondition": {
      "kpi": "ITEMCOUNT",
      "operator": "GREATER_THAN_OR_EQUAL",
      "value": 1
    }
  },
  "action": {
    "type": "PER_UNIT",
    "perUnitAction": {
      "perUnitKPI": "QUANTITY",
      "perUnitDivider": "1",
      "rewardAction": {
        "type": "FIXED_PRICE",
        "fixedPriceAction": {
          "value": 10,
          "includeItemsFromConditionSet": false,
          "productBasedCondition": {
            "type": "PRODUCT",
            "productCondition": {
              "criteriaList": [
                {
                  "entity": "CATEGORY",
                  "values": [
                    "Large Pizzas"
                  ],
                  "operator": "IN"
                }
              ],
              "kpi": "NONE"
            }
          }
        }
      }
    }
  },
  "customerActivationRequired": false,
  "maxIssuancePerCustomer": 10,
  "promotionRestrictions": {},
  "customFieldValues": {}
}'
```

<a id="work-from-home-bundle---50-off-product_based-action" />

### Work From Home Bundle - 50% Off : \[PRODUCT\_BASED Action]

##### **Requirement 4**: The brand wants to set up a cart promotion in which "If a customer buys a Laptop, a Mouse, and a Keyboard all in the same transaction, they get 50% off all three items."

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOGFmN4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=8M02INsasy1bHCM-1760357020184-0.0.1.1-604800000' \
--data '{
    "name": "Work From Home Bundle - 50% Off",
    "type": "POS",
    "messageLabel": "Get 50% off when you buy a Laptop, Mouse, and Keyboard together!",
    "active": true,
    "priority": 0,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "COMBO_PRODUCT",                   // The trigger requires a combination of products.
        "comboProductCondition": {
            "productConditions": [                 // All three of these conditions must be met.
                {
                    "kpi": "QUANTITY",
                    "operator": "GREATER_THAN_OR_EQUAL",
                    "value": "1",
                    "criteriaList": [
                        { "entity": "CATEGORY", "operator": "IN", "values": ["Laptops"] }
                    ]
                },
                {
                    "kpi": "QUANTITY",
                    "operator": "GREATER_THAN_OR_EQUAL",
                    "value": "1",
                    "criteriaList": [
                        { "entity": "CATEGORY", "operator": "IN", "values": ["Mice"] }
                    ]
                },
                {
                    "kpi": "QUANTITY",
                    "operator": "GREATER_THAN_OR_EQUAL",
                    "value": "1",
                    "criteriaList": [
                        { "entity": "CATEGORY", "operator": "IN", "values": ["Keyboards"] }
                    ]
                }
            ]
        }
    },
    "action": {
        "type": "PRODUCT_BASED",                     // The action is a discount on specific products.
        "productBasedAction": {
            "type": "PERCENTAGE",                     // The discount is 50%.
            "value": 50,
            "includeItemsFromConditionSet": true      // CRITICAL: This tells the action to discount the items from the main condition (the bundle).
        }
    },
    "customerActivationRequired": false,
    "maxIssuancePerCustomer": 10,
    "promotionRestrictions": {},
    "customFieldValues": {}
}''\'''
```

<a id="ultimate-workstation-bundle---1200-fixed_price-action" />

### Ultimate Workstation Bundle - $1200 : \[FIXED\_PRICE Action]

##### **Requirement**: A tech store wants to create an "all-in-one" bundle deal. "If a customer buys a premium laptop (over $1000), a 'Pro Gaming Mouse', AND a 'Mechanical Keyboard' all in the same transaction, they get all three items for a combined, fixed price of **$1200**."

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOGFmNDI3MGQ3YzI4ZjU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=8M02INwaH44vLLEiiCcBIHKDdvTjqsnNjksasy1bHCM-1760357020184-0.0.1.1-604800000' \
--data '{
    "name": "Ultimate Workstation Bundle - $1200",
    "type": "POS",
    "messageLabel": "Get a Premium Laptop, Pro Mouse, and Mechanical Keyboard for just $1200!",
    "active": true,
    "priority": 1,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "COMBO_PRODUCT",                   // The trigger requires a 3-part combo.
        "comboProductCondition": {
            "productConditions": [
                {
                    "criteriaList": [ { "entity": "CATEGORY", "operator": "IN", "values": ["Laptops"] } ],
                    "kpi": "AMOUNT",
                    "operator": "GREATER_THAN_OR_EQUAL",
                    "value": "1000"               // Part 1: A laptop valued at $1000 or more.
                },
                {
                    "criteriaList": [ { "entity": "SKU", "operator": "IN", "values": ["GM-PRO-001"] } ],
                    "kpi": "QUANTITY",
                    "operator": "GREATER_THAN_OR_EQUAL",
                    "value": "1"                  // Part 2: The specific 'Pro Gaming Mouse'.
                },
                {
                    "criteriaList": [ { "entity": "CATEGORY", "operator": "IN", "values": ["Mechanical Keyboards"] } ],
                    "kpi": "QUANTITY",
                    "operator": "GREATER_THAN_OR_EQUAL",
                    "value": "1"                  // Part 3: Any mechanical keyboard.
                }
            ]
        }
    },
    "action": {
        "type": "FIXED_PRICE",                    // The reward sets a fixed price for the items.
        "fixedPriceAction": {
            "value": 1200,                        // The fixed price for the entire bundle is $1200.
            "includeItemsFromConditionSet": true, // The price applies to the items from the main condition.
            "productBasedCondition": {
                "type": "COMBO_PRODUCT",          // This re-defines the items to satisfy the validator.
                "comboProductCondition": {
                    "productConditions": [        // Each part MUST use kpi: QUANTITY and operator: EQUALS.
                        {
                            "criteriaList": [ { "entity": "CATEGORY", "operator": "IN", "values": ["Laptops"] } ],
                            "kpi": "QUANTITY",
                            "operator": "EQUALS",
                            "value": "1"
                        },
                        {
                            "criteriaList": [ { "entity": "SKU", "operator": "IN", "values": ["GM-PRO-001"] } ],
                            "kpi": "QUANTITY",
                            "operator": "EQUALS",
                            "value": "1"
                        },
                        {
                            "criteriaList": [ { "entity": "CATEGORY", "operator": "IN", "values": ["Mechanical Keyboards"] } ],
                            "kpi": "QUANTITY",
                            "operator": "EQUALS",
                            "value": "1"
                        }
                    ]
                }
            }
        }
    },
    "customerActivationRequired": false,
    "maxIssuancePerCustomer": 10,
    "promotionRestrictions": {},
    "customFieldValues": {}
}'\'''
```

<a id="any-large-pizza-for-10-fixed_price-action" />

### Any Large Pizza for $10 : \[FIXED\_PRICE Action]

##### **Requirement**: The brand wants to set up a cart promotion, "Any Large Pizza for $10." The condition is that if a customer buys any item from the "Large Pizzas" category, its price is set to a fixed $10.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--data '{
    "name": "Any Large Pizza for 10 Dollar",
    "type": "POS",
    "messageLabel": "Hot Deal: Any Large Pizza for just $10!",
    "active": true,
    "priority": 2,
    "isStackable": true,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "PRODUCT",
        "productCondition": {
            "criteriaList": [
                {
                    "entity": "CATEGORY",
                    "operator": "IN",
                    "values": [
                        "Large Pizzas"
                    ]
                }
            ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "1"
        }
    },
    "action": {
        "type": "FIXED_PRICE",
        "fixedPriceAction": {
            "value": 10,
            "includeItemsFromConditionSet": true,
            "productBasedCondition": {
                "type": "PRODUCT",
                "productCondition": {
                    "criteriaList": [
                        {
                            "entity": "CATEGORY",
                            "operator": "IN",
                            "values": [
                                "Large Pizzas"
                            ]
                        }
                    ],
                    "kpi": "QUANTITY",
                    "operator": "EQUALS",
                    "value": "1"
                }
            }
        }
    },
    "customerActivationRequired": false,
    "promotionRestrictions": {},
    "customFieldValues": {}
}'\'''
```

<a id="happy-hour-daily-discount-customer-level-restriction" />

### Happy Hour Daily Discount : \[CUSTOMER Level Restriction]

##### **Customer level restriction requirement**: A coffee shop wants to offer a "Happy Hour" cart promotion for "$2 off any drink" but wants to limit each customer to using this offer only once per day.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OTNhMjI2MTk1OllZTk=' \
--header 'Cookie: _cfuvid=m_cAUxdzS7nWq3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "Happy Hour Daily Discount",          
    "type": "CUSTOMER",                          
    "messageLabel": "$2 off any drink, once per day!",
    "active": true,
    "priority": 10,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "PRODUCT",                        
        "productCondition": {
            "criteriaList": [
                {
                    "entity": "CATEGORY",         
                    "operator": "IN",
                    "values": ["Coffee", "Tea", "Juice"] 
                }
            ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "1"                          
        }
    },
    "action": {
        "type": "CART_BASED",
        "cartBasedAction": {
            "type": "ABSOLUTE",
            "value": 2                            
        }
    },
    "promotionRestrictions": {
        "Customer": [                             
            {
                "kpi": "REDEMPTION",
                "frequency": "DAYS",
                "minTimeBetweenRepeat": 86400000,
                "limit": "1"
            }
        ]
    }
}'\'''
```

<a id="monthly-freshness-deal-fixed-window-restriction" />

### Monthly Freshness Deal : \[FIXED Window Restriction]

##### **Customer level restriction requirement (fixed window)**: A grocery chain offers a "Monthly Freshness Deal" — customers can redeem a 10% discount up to 3 times per calendar month.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OTNhMjI2MTk1OllZTk=' \
--header 'Cookie: _cfuvid=m_cAUxdzS7nWq3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "Monthly Freshness Deal",
    "type": "CUSTOMER",
    "messageLabel": "10% off on fresh produce, up to 3 times this month!",
    "active": true,
    "priority": 10,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "PRODUCT",
        "productCondition": {
            "criteriaList": [
                {
                    "entity": "CATEGORY",
                    "operator": "IN",
                    "values": ["Produce", "Dairy", "Bakery"]
                }
            ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "1"
        }
    },
    "action": {
        "type": "CART_BASED",
        "cartBasedAction": {
            "type": "PERCENTAGE",
            "value": 10
        }
    },
    "promotionRestrictions": {
        "Customer": [
            {
                "kpi": "REDEMPTION",
                "windowType": "OVERALL",
                "limit": "20"
            },
            {
                "kpi": "REDEMPTION",
                "windowType": "FIXED",
                "fixedWindowConfig": {
                    "cycleType": "CALENDAR_MONTH"
                },
                "limit": "3"
            }
        ]
    }
}'\'''
```

<a id="25-off-sitewide-capped-at-100-cart-level-restriction" />

### 25% Off Sitewide (Capped at $100) : \[CART Level Restriction]

##### **Cart level restriction requirement**: A fashion retailer offers a "25% Off Everything" cart promotion but wants to cap the maximum discount at $100 per transaction.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OOGE2NWI5ZjAxMzU5NGIwNDllZTk=' \
--header 'Cookie: _cfuvid=m_cAUxdAzS7nWq3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "25% Off Sitewide (Capped at $100)",    
    "type": "POS",                                
    "messageLabel": "Get 25% off your order! Max discount $100.",
    "active": true,
    "priority": 5,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "CART",
        "cartCondition": {
            "kpi": "SUBTOTAL",
            "operator": "GREATER_THAN",
            "value": 0                            
        }
    },
    "action": {
        "type": "CART_BASED",
        "cartBasedAction": {
            "type": "PERCENTAGE",                 
            "value": 25                           
        }
    },
    "promotionRestrictions": {
        "Cart": [                                 
            {
                "kpi": "DISCOUNT",                
                "limit": "100"                    
            }
        ]
    }
}'\''
'
```

<a id="grand-opening---first-1000-customers-promotion-level-restriction" />

### Grand Opening - First 1000 Customers : \[PROMOTION Level Restriction]

##### **Promotion Level Restriction requirement**: A new store is launching with a "Grand Opening" offer where the first 1,000 customers get $10 off.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OTN5ZjAxMzU5NGIwNDllZTk=' \
--header 'Cookie: _cfuvid=m_cAUxdAS9kIldmF3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "Grand Opening - First 1000 Customers", 
    "type": "POS",
    "messageLabel": "$10 off for our first 1000 customers!",
    "active": true,
    "priority": 1,                                
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "CART",
        "cartCondition": {
            "kpi": "SUBTOTAL",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": 10                           
        }
    },
    "action": {
        "type": "CART_BASED",
        "cartBasedAction": {
            "type": "ABSOLUTE",
            "value": 10                           
        }
    },
    "promotionRestrictions": {
        "Promotion": [                            
            {
                "kpi": "REDEMPTION",              
                "limit": "1000"                   
            }
        ]
    }
}'\'''
```

<a id="15-off-first-order---single-use-codes-code-level-restriction" />

### 15% Off First Order - Single-Use Codes : \[CODE Level Restriction]

##### **Code level restriction requirement**: A company provides new subscribers with a unique, single-use code for "15% off their first order."

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbWjI2MTk1OGE2NWI5ZjAxMzU5NGIwNDllZTk=' \
--header 'Cookie: _cfuvid=m_cAUxdAagijzS7nWq3g15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "15% Off First Order - Single-Use Codes", 
    "type": "CODE",                              
    "messageLabel": "Welcome! Here is 15% off your first order.",
    "active": true,
    "priority": 0,
    "isStackable": false,
    "startDate": 1759363200000,
    "endDate": 1790985600000,
    "campaignId": "286039",
    "condition": {
        "type": "CART",
        "cartCondition": {
            "kpi": "SUBTOTAL",
            "operator": "GREATER_THAN",
            "value": 0                            
        }
    },
    "action": {
        "type": "CART_BASED",
        "cartBasedAction": {
            "type": "PERCENTAGE",
            "value": 15                           
        }
    },
    "promotionRestrictions": {
        "Code": [                                 
            {
                "kpi": "REDEMPTION",              
                "limit": "1"                      
            }
        ]
    }
}'\'''
```

<a id="milestone-reward---50-voucher-earning-criteria" />

### Milestone Reward - $50 Voucher : \[EARNING Criteria]

##### **Requirement:** brand wants to setup a cart promotion where a customer reaches milestone 12345, they get a $50 voucher.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJNzYzNDkxOGFU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=m_cAUxdASmg15w1dpuKfA-1760347164530-0.0.1.1-604800000' \
--data '{
    "name": "Milestone Reward - $50 Voucher",
    "type": "EARNING",
    "messageLabel": "Congratulations! You'\''ve earned a $50 voucher.",
    "active": true,
    "priority": 1,
    "isStackable": false,
    "startDate": 1760332800000,
    "endDate": 1792031999000,
    "campaignId": "286039",
    "condition": {
        "type": "CART",
        "cartCondition": {
            "kpi": "SUBTOTAL",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "50.000000"
        }
    },
    "action": {
        "type": "CART_BASED",
        "cartBasedAction": {
            "type": "ABSOLUTE",
            "value": "50.000000"
        }
    },
    "earningCriteria": {
        "active": true,
        "earnedFromType": "MILESTONE",
        "eventType": "TransactionAdd",
        "criteriaName": "Milestone_Achievement_12345",
        "criteriaDsl": "true",
        "criteriaDslJson": "{ \"arity\":\"literal\", \"value\":\"true\", \"type\":\"boolean:primitive\" }",
        "groupId": 1,
        "milestoneId": 12345
    }
}'
```

<a id="new-store-opening-special-store-criteria" />

### New Store Opening Special : \[STORE Criteria]

##### **Requirement:** The brand wants to offer a "15% Off Store Opening Special" that is only valid at their two new store locations (IDs: 101 and 102).

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOGFmN4ZjU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=Fl.R3pP_RtM6ZaoUweo7cHOk4zcxuRg-1761063598566-0.0.1.1-604800000' \
--data '{
    "name": "New Store Opening Special",
    "type": "POS",
    "startDate": 1761019200000,
    "endDate": 1764565199999,
    "campaignId": 286039,
    "storeCriteria": {
        "type": "STORE",
        "values": [101, 102],
        "operator": "IN"
    },
    "condition": {
        "type": "CART",
        "cartCondition": {
            "kpi": "SUBTOTAL",
            "operator": "GREATER_THAN",
            "value": 0
        }
    },
    "action": {
        "type": "CART_BASED",
        "cartBasedAction": {
            "type": "PERCENTAGE",
            "value": 15
        }
    }
}'
```

<a id="weekday-happy-hour-time-criteria" />

### Weekday Happy Hour : \[TIME Criteria]

##### **Requirement:** The brand wants a "Weekday Happy Hour" offering 20% off from 4:00 PM to 5:59 PM every Monday through Friday.

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOGFmNDIZjU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=Fl.R3pP_RilU3aoUweo7cHOk4zcxuRg-1761063598566-0.0.1.1-604800000' \
--data '{
    "name": "Weekday Happy Hour",
    "type": "POS",
    "startDate": 1761019200000,
    "endDate": 1764565199999,
    "campaignId": "286039",
    "timeCriteria": {
        "startTime": "16:00",                 
        "durationInHours": "2",               
        "repeatFrequency": "WEEKS",
        "weeklyValues": [
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY"
        ]
    },
    "condition": {
        "type": "PRODUCT",
        "productCondition": {
            "criteriaList": [ { "entity": "CATEGORY", "operator": "IN", "values": ["Beverages"] } ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": "1"
        }
    },
    "action": {
        "type": "PRODUCT_BASED",
        "productBasedAction": {
            "type": "PERCENTAGE",
            "value": "20",
            "includeItemsFromConditionSet": true
        }
    }
}'
```

<a id="gold-tier-exclusive-supplementary-criteria" />

### Gold Tier Exclusive : \[SUPPLEMENTARY Criteria]

##### **Requirement:** Offer an exclusive "10% off for Gold Tier members" (Tier ID 99) who are part of the main loyalty program (ID 123).

```json
curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic Z2VvcmdlLmJ1a2w6NzYzNDkxOGFmND3YzI4ZjU4ZjY3MmNhZjY1ZmY=' \
--header 'Cookie: _cfuvid=Fl.R3pP_RilU3UFbHOk4zcxuRg-1761063598566-0.0.1.1-604800000' \
--data '{
    "name": "Gold Tier Exclusive",
    "type": "CUSTOMER",
    
    "startDate": 1761019200000,
    "endDate": 1764565199999,
    "campaignId": "286039",
    "supplementaryCriteria": {
        "loyaltyProgramId": 123,
        "programType": "TIER",
        "partnerProgramId": 99
    },
    "condition": {
        "type": "CART",
        "cartCondition": { "kpi": "SUBTOTAL", "operator": "GREATER_THAN", "value": 0 }
    },
    "action": {
        "type": "CART_BASED",
        "cartBasedAction": { "type": "PERCENTAGE", "value": 10 }
    }
}'
```

<a id="buy-10-coffees-across-multiple-visits-get-the-11th-free-accumulationconfig-object" />

### Buy 10 Coffees Across Multiple Visits, Get the 11th Free : \[accumulationConfig Object]

##### **Requirement:** A café brand wants a "Buy 10, Get 1 Free" coffee reward that doesn't require all 10 purchases in a single visit; a customer should be able to build up the count across any number of visits over the life of the promotion, and get the 11th coffee free once they cross the threshold. Over-achievement is also turned on with a 3-cycle lookback, so if a customer buys more coffees than needed in one stretch, the extra quantity still counts toward their next reward instead of being lost.

```json
{
    "name": "Buy 10 Coffees, Get the 11th Free",
    "orgId": 20981,
    "priority": 5,
    "active": true,
    "type": "REWARD",
    "condition": {
        "type": "PRODUCT",
        "productCondition": {
            "criteriaList": [
                { "entity": "SKU", "operator": "IN", "values": ["COFFEE"] }
            ],
            "kpi": "QUANTITY",
            "operator": "GREATER_THAN_OR_EQUAL",
            "value": 10
        }
    },
    "action": {
        "type": "FREE_PRODUCT",
        "freeProductAction": {
            "includeItemsFromConditionSet": true,
            "productBasedCondition": {
                "type": "PRODUCT",
                "productCondition": {
                    "criteriaList": [
                        { "entity": "SKU", "operator": "IN", "values": ["COFFEE"] }
                    ],
                    "kpi": "QUANTITY",
                    "operator": "EQUALS",
                    "value": 1
                }
            }
        }
    },
    "startDate": 1761019200000,
    "endDate": 1764565199999,
    "mode": "DISCOUNT",
    "isStackable": false,
    "accumulationConfig": {
        "enabled": true,
        "overAchievementEnabled": true,
        "lookbackPeriodLastXCycles": 3
    }
}'
```

<br />

# OpenAPI definition

```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "Sample API",
    "version": "1.0.0",
    "description": "API specification generated from cURL for POST /v1.1/customer/add"
  },
  "servers": [
    {
      "url": "https://{host}"
    }
  ],
  "paths": {
    "/api_gateway/v1/promotions": {
      "post": {
        "description": "",
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "Name ": {
                      "type": "string"
                    }
                  }
                },
                "examples": {
                  "New Example": {
                    "summary": "New Example",
                    "value": {
                      "data": {
                        "id": "68e7966845de881062349048",
                        "name": "testing 1234",
                        "orgId": 100737,
                        "priority": 0,
                        "active": true,
                        "messageLabel": "testing 1234",
                        "type": "REWARD",
                        "condition": {
                          "type": "CART",
                          "cartCondition": {
                            "kpi": "SUBTOTAL",
                            "operator": "EQUALS",
                            "value": "100.000000"
                          }
                        },
                        "action": {
                          "type": "CART_BASED",
                          "cartBasedAction": {
                            "type": "ABSOLUTE",
                            "value": "1000.000000"
                          }
                        },
                        "createdBy": 75197941,
                        "createdOn": 1760007784199,
                        "createdOnISO": "2025-10-09T11:03:04Z",
                        "lastUpdatedBy": 75197941,
                        "lastUpdatedOn": 1760007784199,
                        "lastUpdatedOnISO": "2025-10-09T11:03:04Z",
                        "startDate": 1758479400000,
                        "startDateISO": "2025-09-21T18:30:00Z",
                        "endDate": 1758738599999,
                        "endDateISO": "2025-09-24T18:29:59Z",
                        "campaignId": 1255614,
                        "promotionRestrictions": {},
                        "earnLimitedToSpecificAudience": false,
                        "customFieldValues": {
                          "qwer": ""
                        },
                        "customerActivationRequired": true,
                        "mode": "DISCOUNT",
                        "maxIssuancePerCustomer": 1,
                        "isStackable": false
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [],
        "x-readme": {
          "code-samples": [
            {
              "code": "curl --location 'https://eu.api.capillarytech.com/api_gateway/v1/promotions' \\\n--header 'Content-Type: application/json' \\\n--header 'Authorization: Basic Z2VvcmdlLmRvY2RlbW86MmQ1OTNZTk=' \\\n--header 'Cookie: _cfuvid=YpGNgiRLeLVURs3BaON5u5yvlKJ031kZrvv7e3ePAEc-1759774707339-0.0.1.1-604800000' \\\n--data '{\n  \"name\": \"Combo Product promotion \",\n  \"type\": \"CUSTOMER\",\n  \"messageLabel\": \"Get 15% off combo products\",\n  \"active\": true,\n  \"priority\": 0,\n  \"isStackable\": false,\n  \"startDate\": 1759363200000,\n  \"endDate\": 1790985600000,\n  \"campaignId\": \"286038\",\n  \"condition\": {\n    \"type\": \"COMBO_PRODUCT\",\n    \"comboProductCondition\": {\n      \"productConditions\": [\n        {\n          \"kpi\": \"QUANTITY\",\n          \"operator\": \"GREATER_THAN_OR_EQUAL\",\n          \"value\": \"1.000000\",\n          \"criteriaList\": [\n            {\n              \"entity\": \"SKU\",\n              \"operator\": \"IN\",\n              \"values\": [\n                \"SKU001\",\n                \"SKU002\"\n              ]\n            }\n          ]\n        },\n        {\n          \"kpi\": \"QUANTITY\",\n          \"operator\": \"GREATER_THAN_OR_EQUAL\",\n          \"value\": \"1.000000\",\n          \"criteriaList\": [\n            {\n              \"entity\": \"BRAND\",\n              \"operator\": \"IN\",\n              \"values\": [\n                \"BRAND_A\"\n              ]\n            }\n          ]\n        }\n      ]\n    }\n  },\n  \"action\": {\n    \"type\": \"PRODUCT_BASED\",\n    \"productBasedAction\": {\n      \"type\": \"PERCENTAGE\",\n      \"value\": \"15.000000\",\n      \"productBasedCondition\": {\n        \"type\": \"COMBO_PRODUCT\",\n        \"comboProductCondition\": {\n          \"productConditions\": [\n            {\n              \"kpi\": \"QUANTITY\",\n              \"operator\": \"GREATER_THAN_OR_EQUAL\",\n              \"value\": \"1.000000\",\n              \"criteriaList\": [\n                {\n                  \"entity\": \"SKU\",\n                  \"operator\": \"IN\",\n                  \"values\": [\n                    \"SKU001\",\n                    \"SKU002\"\n                  ]\n                }\n              ]\n            },\n            {\n              \"kpi\": \"QUANTITY\",\n              \"operator\": \"GREATER_THAN_OR_EQUAL\",\n              \"value\": \"1.000000\",\n              \"criteriaList\": [\n                {\n                  \"entity\": \"BRAND\",\n                  \"operator\": \"IN\",\n                  \"values\": [\n                    \"BRAND_A\"\n                  ]\n                }\n              ]\n            }\n          ]\n        }\n      }\n    }\n  },\n  \"customerActivationRequired\": true,\n  \"maxIssuancePerCustomer\": 1,\n  \"promotionRestrictions\": {\n    \"Promotion\": [\n      {\n        \"kpi\": \"REDEMPTION\",\n        \"limit\": \"5000.000000\"\n      }\n    ],\n    \"Customer\": [\n      {\n        \"kpi\": \"TRANSACTION\",\n        \"frequency\": \"WEEKS\",\n        \"minTimeBetweenRepeat\": 604800000,\n        \"limit\": \"2.000000\"\n      },\n      {\n        \"kpi\": \"DISCOUNT\",\n        \"limit\": \"200.000000\"\n      },\n      {\n        \"kpi\": \"REDEMPTION\",\n        \"frequency\": \"DAYS\",\n        \"minTimeBetweenRepeat\": 86400000,\n        \"limit\": \"3.000000\"\n      }\n    ],\n    \"Cart\": [\n      {\n        \"kpi\": \"DISCOUNT\",\n        \"limit\": \"50.000000\"\n      }\n    ]\n  },\n  \"customFieldValues\": {\n    \"Age\": 25\n  }\n}'",
              "language": "json",
              "name": ""
            }
          ],
          "samples-languages": [
            "json"
          ]
        },
        "operationId": "post_api-gateway-v1-promotions",
        "summary": "Create Cart Promotions"
      }
    }
  },
  "x-readme": {}
}
```