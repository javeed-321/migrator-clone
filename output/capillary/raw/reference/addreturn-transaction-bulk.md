---
updatedAt: 2026-08-13T09:48:02.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Add/Return Transaction in Bulk

# Add Transaction API

Use this API to add a customer transaction to the loyalty system. Supports regular purchases, returns, and not-interested transactions.

## Example request

```
curl --location 'https://eu.api.capillarytech.com/v2/transactions/bulk' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic VjMT' \
--data '[
    {
        "identifierType": "mobile",
        "identifierValue": "919999988886",
        "source": "INSTORE",
        "accountId": "",
        "type": "REGULAR",
        "billNumber": "test00transact087",
        "billingDate": "2025-04-11T11:00:00+05:30",
        "discount": "",
        "billAmount": "6000.0",
        "note": "Transaction number 87",
        "grossAmount": "110",
        "deliveryStatus": "PLACED",
        "paymentModes": [
            {
                "mode": "CardPayment",
                "value": "6000.0",
                "notes": "SPay",
                "attributes": {
                    "card_type": "Visa"
                }
            }
        ],
        "lineItemsV2": [
            {
                "itemCode": "model_id_001",
                "amount": 2000.0,
                "description": "Steel Bottle",
                "discount": 0,
                "rate": 500.0,
                "qty": 4,
                "value": 2000.0,
                "extendedFields": {
                    "MetalRate": "22.02",
                    "GrossWeight": "10.50"
                }
            },
            {
                "itemCode": "model_id_002",
                "amount": 2000.0,
                "description": "Sports Shoe",
                "discount": 0,
                "rate": 1000.0,
                "value": 2000.0,
                "qty": 2,
                "extendedFields": {
                    "MetalRate": "22.02",
                    "GrossWeight": "10.50"
                }
            },
            {
                "itemCode": "model_id_003",
                "amount": 2000.0,
                "rate": 2000.0,
                "qty": 1,
                "value": 2000.0,
                "extendedFields": {
                    "gender": "Male",
                    "marital_status": "Married"
                },
                "customFields": {
                    "cashierid": "jim2345",
                    "city": "Bangalore"
                }
            } 
        ]
    },
    {
        "identifierType": "mobile",
        "identifierValue": "919999988886",
        "source": "INSTORE",
        "accountId": "",
        "type": "REGULAR",
        "billNumber": "test00transact086",
        "billingDate": "2025-04-11T11:00:00+05:30",
        "discount": "1000",
        "billAmount": "6000.0",
        "note": "Transaction number 86",
        "grossAmount": "7000",
        "deliveryStatus": "PLACED",
        "paymentModes": [
            {
                "mode": "CardPayment",
                "value": "6000.0",
                "notes": "SPay",
                "attributes": {
                    "card_type": "Visa"
                }
            }
        ],
        "lineItemsV2": [
            {
                "itemCode": "model_id_001",
                "amount": 2000.0,
                "description": "Steel Bottle",
                "discount": 1000.0,
                "rate": 750.0,
                "qty": 4,
                "value": 3000.0,
                "extendedFields": {
                    "MetalRate": "22.02",
                    "GrossWeight": "10.50"
                }
            },
            {
                "itemCode": "model_id_002",
                "amount": 2000.0,
                "description": "Sports Shoe",
                "discount": 0,
                "rate": 1000.0,
                "value": 2000.0,
                "qty": 2,
                "extendedFields": {
                    "MetalRate": "22.02",
                    "GrossWeight": "10.50"
                }
            },
            {
                "itemCode": "model_id_003",
                "amount": 2000.0,
                "rate": 2000.0,
                "qty": 1,
                "value": 2000.0,
                "extendedFields": {
                    "gender": "Male",
                    "marital_status": "Married"
                },
                "customFields": {
                    "cashierid": "jim2345",
                    "city": "Bangalore"
                }
            }    
        ]
    }
]'
```

<br />

## Prerequisites

* Authentication details
* Authorization/access group details

> 🚧 You cannot register a customer with this API. Pass only registered customer identifiers.

## Header information

| Header name     | Description                                                                                                                                                                                                                                                                               |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SKIP-DOWNSTREAM | When set to `true`, the transaction is written directly to the database without notifying downstream systems (Loyalty Engine/EMF or event notification services). No loyalty actions or event triggers are executed. Use this to import transaction data without generating side effects. |

## Path parameters

Not applicable.

## Query parameters

Not applicable.

## Body parameters

### Transaction (top level)

| Field                       | Type      | Required    | Description                                                                                                                                                                                                                                                  |
| :-------------------------- | :-------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| identifierType              | enum      | Yes         | Registered identifier type of the customer. Values: `mobile`, `email`, `externalId`, `wechat`, `martjackId`, `fbId`, `id`.                                                                                                                                   |
| identifierValue             | string    | Yes         | Value for the specified `identifierType`. This field is mandatory when `identifierType` is `mobile`. For example, if `identifierType` is `mobile`, pass the mobile number. If missing or empty, the API returns a 400 Bad Request error.                     |
| source                      | enum      | Yes         | Source from which the transaction originates. Values: `INSTORE`, `WECHAT`, `MARTJACK`, `WEB_ENGAGE`, `ECOMMERCE`, `JD`, `TAOBAO`, `TMALL`, `FACEBOOK`, `WEBSITE`, `OTHERS`.                                                                                  |
| accountId                   | string    | Optional    | For multi-account sources such as `MARTJACK` and `WECHAT`, pass the respective account ID.                                                                                                                                                                   |
| type                        | enum      | Yes         | Transaction type. Values: `REGULAR`, `RETURN`, `NOT_INTERESTED`, `NOT_INTERESTED_RETURN`.                                                                                                                                                                    |
| notInterestedReason         | string    | Optional    | Reason the customer declined loyalty enrollment. Applicable when `type` is `NOT_INTERESTED`. Max 255 characters.                                                                                                                                             |
| returnType                  | enum      | Conditional | Return type. Required when `type` is `RETURN`. Values: `AMOUNT`, `FULL`, `LINE_ITEM`, `CANCELLED`. <br><br>**Note:** For `NOT_INTERESTED_RETURN` transactions, only `AMOUNT`, `FULL`, and `LINE_ITEM` are valid. `CANCELLED` is not supported for this type. |
| billNumber                  | string    | Yes         | Unique transaction number. For return transactions, pass the original transaction's bill number. Max 50 characters. Uniqueness scope (till, store, or org) is org-configured.                                                                                |
| id                          | long      | Optional    | Transaction ID of the transaction to return. Use when `CONF_LOYALTY_BILL_NUMBER_UNIQUE_ONLY_STORE` is enabled and the same bill number exists across multiple stores, to identify which specific transaction to return.                                      |
| billAmount                  | double    | Yes         | Net transaction amount. Negative values are not accepted.                                                                                                                                                                                                    |
| billingDate                 | date-time | Optional    | Date and time of the transaction. ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.                                                                                                                                                                                   |
| discount                    | double    | Optional    | Discount amount applied at the transaction level. Negative values are not accepted.                                                                                                                                                                          |
| grossAmount                 | double    | Optional    | Transaction amount before discount.                                                                                                                                                                                                                          |
| outlierStatus               | enum      | Optional    | Transaction-level outlier status. Overrides configured outlier settings. Values: `NORMAL`, `INTERNAL`, `FRAUD`, `OUTLIER`, `TEST`, `DELETED`, `FAILED`, `OTHER`.                                                                                             |
| note                        | string    | Optional    | Additional information about the transaction.                                                                                                                                                                                                                |
| deliveryStatus              | enum      | Optional    | Delivery status of the item. Values: `PLACED`, `PROCESSED`, `SHIPPED`, `DELIVERED`, `RETURNED`. Update this field using `v2/transaction/update`.                                                                                                             |
| purchaseTime                | date-time | Conditional | Billing time of the original transaction for which a return is being made. Required when `type` is `RETURN`. ISO 8601: `YYYY-MM-DDTHH:MM:SSZ`.                                                                                                               |
| currencyCode                | string    | Optional    | ISO currency code for transactions in local currency. Examples: `INR`, `SGD`, `EUR`, `IQD`. The currency must be enabled in **InTouch > Organization Setup** and a conversion ratio must be set via `v2/currencyratio`.                                      |
| addWithLocalCurrency        | boolean   | Optional    | Pass `true` to add the transaction in local currency.                                                                                                                                                                                                        |
| promotionEvaluationId       | string    | Optional    | Promotion evaluation code (cart or catalog) applied to the transaction.                                                                                                                                                                                      |
| appliedPromotionIdentifiers | array     | Optional    | Base64-encoded cart or catalog promotion identifiers applied to the transaction. Each entry contains: `promotionId`, `discount`, `amount`, `discountAppliedQty`, `promotionAppliedQty`, `redemptionCount`, `sku`, `version`.                                 |
| loyaltyPromotionIdentifiers | array     | Optional    | Identifiers of loyalty promotions to tag to the transaction.                                                                                                                                                                                                 |
| extendedFields              | object    | Optional    | Transaction-level extended field details as name-value pairs.                                                                                                                                                                                                |
| lineItemsV2                 | object    | Optional    | Line item details. See [lineItemsV2 object](#lineitemsv2-object).                                                                                                                                                                                            |
| attribution                 | object    | Optional    | Maps the transaction to a different user or till. See [attribution object](#attribution-object).                                                                                                                                                             |
| redemptions                 | object    | Optional    | Points and coupon redemption details. See [redemptions object](#redemptions-object).                                                                                                                                                                         |
| paymentModes                | object    | Optional    | Payment mode details. See [paymentModes object](#paymentmodes-object).                                                                                                                                                                                       |

#### User group parameters

Use these parameters to associate the transaction with a user group. At least one `userGroup2` parameter is required to make the association.

| Field                                | Type   | Required    | Description                                                                                                                                                                                        |
| :----------------------------------- | :----- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userGroup2Id                         | int    | Conditional | Unique ID of the user group.                                                                                                                                                                       |
| userGroup2PrimaryUserId              | long   | Conditional | User ID of the primary group member.                                                                                                                                                               |
| userGroup2ExternalId                 | string | Conditional | External ID of the user group.                                                                                                                                                                     |
| userGroup2PrimaryUserIdentifierType  | enum   | Conditional | Identifier type for the group primary member. Values: `mobile`, `email`, `externalId`, `wechat`, `martjackId`, `fbId`, `id`.                                                                       |
| userGroup2PrimaryUserIdentifierValue | string | Conditional | Value for the specified group identifier type.                                                                                                                                                     |
| userGroup2PrimaryUserSource          | enum   | Conditional | Source in which the group primary member's identifier is registered. Values: `INSTORE`, `WECHAT`, `MARTJACK`, `WEB_ENGAGE`, `ECOMMERCE`, `JD`, `TAOBAO`, `TMALL`, `FACEBOOK`, `WEBSITE`, `OTHERS`. |
| userGroup2PrimaryUserAccountId       | string | Conditional | Account ID for multi-account sources such as `WECHAT`.                                                                                                                                             |

### `attribution` object

| Field          | Type      | Required | Description                                                                                                                        |
| :------------- | :-------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| createDate     | date-time | Optional | Date of the transaction. ISO 8601 format.                                                                                          |
| createdBy      | object    | Optional | User ID or store entity (till, store) to associate with the transaction.                                                           |
| createdBy.code | string    | Optional | Unique code of the entity.                                                                                                         |
| createdBy.type | enum      | Optional | Type of the attribution entity. Values: `ZONE`, `CONCEPT`, `STORE`, `TILL`, `STR_SERVER`, `ADMIN_USER`, `ASSOCIATE`, `RULE`, `OU`. |

### `lineItemsV2` object

> 📘 Note
>
> Custom fields are supported only at the customer, bill, and redemption levels. Only extended fields are supported at the line item level.

| Field                       | Type      | Required    | Description                                                                                                                                         |
| :-------------------------- | :-------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| amount                      | double    | Optional    | Net line item amount (`value` minus `discount`).                                                                                                    |
| description                 | string    | Optional    | Short description of the line item.                                                                                                                 |
| discount                    | int       | Optional    | Discount applied to the line item.                                                                                                                  |
| itemCode                    | string    | Optional    | Unique code of the line item.                                                                                                                       |
| qty                         | double    | Optional    | Quantity of the line item.                                                                                                                          |
| rate                        | double    | Optional    | Price per unit.                                                                                                                                     |
| serial                      | string    | Optional    | Serial number of the line item.                                                                                                                     |
| value                       | double    | Optional    | Gross amount of the line item (`rate` multiplied by `qty`).                                                                                         |
| returnable                  | boolean   | Optional    | Pass `true` if the item is eligible for return.                                                                                                     |
| returnableDays              | int       | Optional    | Maximum number of days within which the item can be returned.                                                                                       |
| customFields                | object    | Optional    | Transaction or line item-level custom field details.                                                                                                |
| imgUrl                      | string    | Optional    | URL of the product image.                                                                                                                           |
| attributes                  | object    | Optional    | Attributes of combo, bundle, or split items.                                                                                                        |
| comboDetails                | object    | Optional    | Details of combo or bundle items.                                                                                                                   |
| addOnDetails                | object    | Optional    | Details of add-on items.                                                                                                                            |
| splitDetails                | object    | Optional    | Details of split items.                                                                                                                             |
| parentBillNumber            | string    | Optional    | Original transaction bill number for return line items in a mixed transaction (one that contains both purchase and return items).                   |
| purchaseTime                | date-time | Conditional | Billing time of the original transaction for which a return is being made. Required for return line items. ISO 8601: `YYYY-MM-DDTHH:MM:SSZ`.        |
| returnType                  | enum      | Optional    | Return type for the line item. Values: `AMOUNT`, `FULL`, `LINE_ITEM`. Not applicable when the transaction-level `returnType` is `FULL` or `AMOUNT`. |
| type                        | enum      | Optional    | Type of the line item. Values: `REGULAR`, `NOT_INTERESTED`, `RETURN`, `NOT_INTERESTED_RETURN`.                                                      |
| appliedPromotionIdentifiers | array     | Optional    | Base64-encoded cart or catalog promotions applied to the line item. Same structure as the transaction-level `appliedPromotionIdentifiers`.          |
| extendedFields              | object    | Optional    | Line item-level extended field details.                                                                                                             |

### `redemptions` object

| Field             | Type  | Required | Description                                                                            |
| :---------------- | :---- | :------- | :------------------------------------------------------------------------------------- |
| pointsRedemptions | array | Optional | Unique points redemption IDs to apply to the transaction. Example: `[727272, 237878]`. |
| couponRedemptions | array | Optional | Unique coupon redemption IDs to apply to the transaction. Example: `[727272, 237878]`. |

### `paymentModes` object

| Field      | Type   | Required | Description                                              |
| :--------- | :----- | :------- | :------------------------------------------------------- |
| mode       | string | Optional | Payment mode.                                            |
| value      | double | Optional | Amount paid via this mode.                               |
| notes      | string | Optional | Additional payment mode information. Max 250 characters. |
| attributes | object | Optional | Payment mode attributes as name-value pairs.             |

## Example response

```
{
    "response": [
        {
            "entityId": 884796252,
            "result": {
                "identifierType": "mobile",
                "identifierValue": "919999988886",
                "source": "INSTORE",
                "accountId": "",
                "deliveryStatus": "PLACED",
                "type": "REGULAR",
                "billAmount": 6000.0,
                "billNumber": "test00transact087",
                "grossAmount": 110.0,
                "note": "Transaction number 87",
                "lineItemsV2": [
                    {
                        "amount": 2000.0,
                        "description": "Steel Bottle",
                        "discount": 0.0,
                        "itemCode": "model_id_001",
                        "qty": 4.0,
                        "rate": 500.0,
                        "value": 2000.0,
                        "returnable": true,
                        "returnableDays": -1,
                        "comboDetails": [],
                        "addOnDetails": [],
                        "splitDetails": [],
                        "extendedFields": {
                            "GrossWeight": 10.5,
                            "MetalRate": 22.02
                        }
                    },
                    {
                        "amount": 2000.0,
                        "description": "Sports Shoe",
                        "discount": 0.0,
                        "itemCode": "model_id_002",
                        "qty": 2.0,
                        "rate": 1000.0,
                        "value": 2000.0,
                        "returnable": true,
                        "returnableDays": -1,
                        "comboDetails": [],
                        "addOnDetails": [],
                        "splitDetails": [],
                        "extendedFields": {
                            "GrossWeight": 10.5,
                            "MetalRate": 22.02
                        }
                    },
                    {
                        "amount": 2000.0,
                        "itemCode": "model_id_003",
                        "qty": 1.0,
                        "rate": 2000.0,
                        "value": 2000.0,
                        "returnable": true,
                        "returnableDays": -1,
                        "customFields": {
                            "cashierid": "jim2345",
                            "city": "Bangalore"
                        },
                        "comboDetails": [],
                        "addOnDetails": [],
                        "splitDetails": [],
                        "extendedFields": {}
                    }
                ],
                "notInterestedReason": "",
                "sideEffects": [
                    {
                        "entityType": "USER",
                        "rawAwardedPoints": 1.000,
                        "customerId": 564703252,
                        "awardedPoints": 1,
                        "type": "points"
                    }
                ],
                "isUseDefaultUserGroup2": false,
                "paymentModes": [
                    {
                        "mode": "CardPayment",
                        "value": 6000.0,
                        "notes": "SPay",
                        "attributes": {
                            "card_type": "Visa"
                        }
                    }
                ],
                "billingDate": "2025-04-11T05:30:00Z",
                "useDefaultUserGroup2": false
            },
            "errors": [],
            "warnings": [
                {
                    "status": false,
                    "code": 91016,
                    "message": "Extended field name gender is invalid."
                },
                {
                    "status": false,
                    "code": 91016,
                    "message": "Extended field name marital_status is invalid."
                }
            ],
            "loyaltyDetails": []
        },
        {
            "entityId": 884796253,
            "result": {
                "identifierType": "mobile",
                "identifierValue": "919999988886",
                "source": "INSTORE",
                "accountId": "",
                "deliveryStatus": "PLACED",
                "type": "REGULAR",
                "billAmount": 6000.0,
                "billNumber": "test00transact086",
                "discount": 1000.0,
                "grossAmount": 7000.0,
                "note": "Transaction number 86",
                "lineItemsV2": [
                    {
                        "amount": 2000.0,
                        "description": "Steel Bottle",
                        "discount": 1000.0,
                        "itemCode": "model_id_001",
                        "qty": 4.0,
                        "rate": 750.0,
                        "value": 3000.0,
                        "returnable": true,
                        "returnableDays": -1,
                        "comboDetails": [],
                        "addOnDetails": [],
                        "splitDetails": [],
                        "extendedFields": {
                            "GrossWeight": 10.5,
                            "MetalRate": 22.02
                        }
                    },
                    {
                        "amount": 2000.0,
                        "description": "Sports Shoe",
                        "discount": 0.0,
                        "itemCode": "model_id_002",
                        "qty": 2.0,
                        "rate": 1000.0,
                        "value": 2000.0,
                        "returnable": true,
                        "returnableDays": -1,
                        "comboDetails": [],
                        "addOnDetails": [],
                        "splitDetails": [],
                        "extendedFields": {
                            "GrossWeight": 10.5,
                            "MetalRate": 22.02
                        }
                    },
                    {
                        "amount": 2000.0,
                        "itemCode": "model_id_003",
                        "qty": 1.0,
                        "rate": 2000.0,
                        "value": 2000.0,
                        "returnable": true,
                        "returnableDays": -1,
                        "customFields": {
                            "cashierid": "jim2345",
                            "city": "Bangalore"
                        },
                        "comboDetails": [],
                        "addOnDetails": [],
                        "splitDetails": [],
                        "extendedFields": {}
                    }
                ],
                "notInterestedReason": "",
                "sideEffects": [],
                "isUseDefaultUserGroup2": false,
                "paymentModes": [
                    {
                        "mode": "CardPayment",
                        "value": 6000.0,
                        "notes": "SPay",
                        "attributes": {
                            "card_type": "Visa"
                        }
                    }
                ],
                "billingDate": "2025-04-11T05:30:00Z",
                "useDefaultUserGroup2": false
            },
            "errors": [],
            "warnings": [
                {
                    "status": false,
                    "code": 91016,
                    "message": "Extended field name gender is invalid."
                },
                {
                    "status": false,
                    "code": 91016,
                    "message": "Extended field name marital_status is invalid."
                }
            ],
            "loyaltyDetails": []
        }
    ],
    "totalCount": 2,
    "failureCount": 0
}
```

<br />

## Response parameters

### `sideEffects` object

| Field              | Type           | Description                                                                                                                                                                                           |
| :----------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entityType`       | enum           | Entity that receives points. **Possible values**: `USER`, `USERGROUP2`.                                                                                                                               |
| `rawAwardedPoints` | decimal number | Total number of points awarded, without rounding. For a `RETURN` (or `NOT_INTERESTED_RETURN`) line item, this value is negative, representing a points deduction rather than a second positive award. |
| `customerId`       | integer        | Unique ID of the customer who is awarded (or, for a return, has points deducted).                                                                                                                     |
| `awardedPoints`    | decimal number | Total number of points awarded, with rounding applied. Same sign convention as `rawAwardedPoints`: negative for a return line item.                                                                   |
| `type`             | enum           | Type of side effect. **Possible values**: `points`, `coupon`, `slab`, `alternate_currency`, `Points promotion`, `Revoke Issue Promotion`, `Revoke Earn Promotion`.                                    |

> 📘 Note
>
> For a mixed transaction (a single bulk line item that combines a purchase and a return using [`parentBillNumber`](#lineitemsv2-object)), the API merges the purchase's earn side effect with the return's negative side effect into one net `sideEffects` entry in the response, instead of returning two separate entries.

## Error and warning codes

| Code                                                 | Type  | Description                                                                                                                                                                                                                                                                                               |
| :--------------------------------------------------- | :---- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time mismatch between billing time and response time | Error | Timezone conversion is not disabled. Enable `CONF_ORG_DISABLE_MACHINE_TIME_CONV` to store the time from the payload without UTC offset conversion. See [Timezone Management](https://docs.capillarytech.com/reference/timezone-management#configuration-to-ignore-conversion-of-timezone-in-transaction). |
| 624                                                  | Error | Invalid return transaction time. Return transaction should happen after add transaction. Include `purchaseTime` in the request payload.                                                                                                                                                                   |
| 400                                                  | Error | `identifierValue` is missing or empty when `identifierType` is `mobile`. The API returns a 400 Bad Request error in this case.                                                                                                                                                                            |
| 628                                                  | Error | Invalid return transaction type. Use only `AMOUNT`, `FULL`, or `LINE_ITEM` as `returnType` for `NOT_INTERESTED_RETURN` transactions. `CANCELLED` and other values are not supported for this transaction type.                                                                                            |

## Configurations

To enable or disable any of the following configurations, raise a Jira ticket to the Capillary Product Support team.

| Configuration                                              | Default  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :--------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CONF\_ORG\_DISABLE\_MACHINE\_TIME\_CONV                    | Disabled | When enabled, stores the time from the payload without UTC offset conversion, for all clusters. See [Timezone Management](https://docs.capillarytech.com/reference/timezone-management#configuration-to-ignore-conversion-of-timezone-in-transaction).                                                                                                                                                                                                                                                                                            |
| CONF\_ALLOW\_TRANSACTION\_RETURN\_AFTER\_GROUP\_TRANSITION | Disabled | When enabled, allows returns for former group members. When a return is performed for a user who has left the group, points allocated to the group as part of the original transaction are also reverted.                                                                                                                                                                                                                                                                                                                                         |
| CONF\_POINTS\_RETURN\_ENABLED                              | Enabled  | When disabled, earned points are not reversed when a transaction is returned. To reverse points manually, use the [Manual Points Adjustment API](https://docs.capillarytech.com/reference/deduct-points-and-alternatecurrencies-from-user-using-userid#/).                                                                                                                                                                                                                                                                                        |
| CONF\_RETURN\_WITHOUT\_ORIGINAL\_BILL\_PROCESSING          | Disabled | When on, a `RETURN` transaction whose bill number doesn't match any existing transaction, or the return portion of a `MIXED` transaction with no bill number, still deducts the returned amount from the customer's lifetime purchases using a hidden internal record. When off, the system records the same return as a standalone return with no change to lifetime purchases. If `CONF_ALLOW_NOT_EXISTING_BILL_RETURN` is off, this configuration overrides it so the return still succeeds with warning `625` instead of failing as an error. |
| CONF\_LOYALTY\_BILL\_NUMBER\_UNIQUE\_ONLY\_STORE           | Disabled | When enabled, bill number uniqueness is scoped to the store level. Use the `id` parameter in return transactions to disambiguate identical bill numbers across stores.                                                                                                                                                                                                                                                                                                                                                                            |
| CONFIG\_SKIP\_SECONDARY\_ID\_ON\_PRIMARY\_MISMATCH         | Disabled | When enabled, if the primary identifier differs but a secondary identifier matches, a new customer is registered with the primary identifier, ignoring the secondary. Configurable at **InTouch > Organization Settings > Miscellaneous > Registration Page**.                                                                                                                                                                                                                                                                                    |