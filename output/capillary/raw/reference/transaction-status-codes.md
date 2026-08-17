---
updatedAt: 2026-08-11T14:19:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Status codes

### Success Codes

| Success Code | Description                                                                |
| ------------ | -------------------------------------------------------------------------- |
| 600          | Transaction added successfully                                             |
| 1630         | Transaction retrospectively marked REGULAR, Transaction added successfully |
|              |                                                                            |

### Error Codes

| Error Code | Description                                                                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8084       | Customer details not sent. Returned when identifierName or identifierValue is empty, blank, or not passed in the add transaction request.                                     |
| 8154       | Invalid identifier value passed. Returned when identifierName is id and identifierValue is non-numeric; previously this returned a generic HTTP 500.                          |
| 8155       | Invalid identifierName passed. Returned when identifierName is not one of the identifiers supported for the given source.                                                     |
| 500        | Transaction retrieval unsuccessful                                                                                                                                            |
| 601        | Invalid Bill Amount                                                                                                                                                           |
| 602        | Invalid transaction number                                                                                                                                                    |
| 603        | Invalid transaction id                                                                                                                                                        |
| 604        | Duplicate transaction number                                                                                                                                                  |
| 607        | No transaction id passed                                                                                                                                                      |
| 620        | Invalid Transaction ID                                                                                                                                                        |
| 624        | Invalid return transaction time, Return transaction should happen after add transaction                                                                                       |
| 625        | Parent Bill Number for the return transaction does not exist.                                                                                                                 |
| 626        | Quantity of returned item is more than purchased item for ItemCode                                                                                                            |
| 627        | Quantity cannot be negative                                                                                                                                                   |
| 628        | Invalid return transaction type passed                                                                                                                                        |
| 630        | Total returned amount is more than purchase amount                                                                                                                            |
| 631        | Transaction number to be returned is not set                                                                                                                                  |
| 632        | Transaction is already returned with return type LINE\_ITEM, you cannot return transaction with return type AMOUNT                                                            |
| 633        | Transaction is already fully returned, you cannot return this transaction again                                                                                               |
| 638        | Transaction is already returned with return type AMOUNT, you cannot return again with return type LINE\_ITEM                                                                  |
| 639        | Transaction is already returned, you cannot return full transaction again                                                                                                     |
| 643        | Transaction date too ahead in the future                                                                                                                                      |
| 644        | Transaction date too behind in past                                                                                                                                           |
| 660        | Invalid line item for return                                                                                                                                                  |
| 661        | Lineitem with negative amount is not allowed                                                                                                                                  |
| 662        | Lineitem with negative value is not allowed                                                                                                                                   |
| 663        | Lineitem with negative rate is not allowed                                                                                                                                    |
| 664        | Lineitem with negative discount is not allowed                                                                                                                                |
| 665        | Transaction gross amount cannot be negative                                                                                                                                   |
| 666        | Transaction discount cannot be negative                                                                                                                                       |
| 667        | Transaction id not found for this customer                                                                                                                                    |
| 668        | Transaction number not found for this customer                                                                                                                                |
| 669        | Unable to update custom field                                                                                                                                                 |
| 670        | Invalid brand code                                                                                                                                                            |
| 671        | Invalid store/till code passed                                                                                                                                                |
| 672        | Invalid size code                                                                                                                                                             |
| 673        | Invalid style code                                                                                                                                                            |
| 674        | Invalid color palette                                                                                                                                                         |
| 675        | Inventory duplicate lineItem                                                                                                                                                  |
| 676        | Invalid attribute value                                                                                                                                                       |
| 677        | Base SKU not found                                                                                                                                                            |
| 678        | Invalid item SKU passed                                                                                                                                                       |
| 679        | Invalid combo item details passed                                                                                                                                             |
| 680        | Invalid add-on item details passed                                                                                                                                            |
| 681        | Invalid split item details passed                                                                                                                                             |
| 682        | Return not possible for combo or split item                                                                                                                                   |
| 683        | Emf new bill event call failed                                                                                                                                                |
| 684        | Emf new bill dvs event failed                                                                                                                                                 |
| 685        | Field length too long                                                                                                                                                         |
| 686        | Transaction cannot be added                                                                                                                                                   |
| 687        | No line Item found matching for return                                                                                                                                        |
| 688        | `{0}` bill number not found                                                                                                                                                   |
| 690        | Invalid transaction type                                                                                                                                                      |
| 691        | Not able to fetch transaction status                                                                                                                                          |
| 708        | Update request rejected due to bill number ambiguity. The bill number exists for both an original transaction and a return. Use transactionId for updates to avoid ambiguity. |
| 710        | Emf Return bill event failed                                                                                                                                                  |
| 9601       | Adding lineitem failed                                                                                                                                                        |
| 9602       | Adding credit note failed                                                                                                                                                     |
| 9603       | Adding payment mode details failed                                                                                                                                            |
| 9604       | Adding custom fields failed                                                                                                                                                   |
| 9605       | Base currency not set for this org                                                                                                                                            |
| 9606       | Transaction currency not passed                                                                                                                                               |
| 9607       | `{0}` - Payment tender not found                                                                                                                                              |
| 9608       | Line item with Item code `{0}` is marked outlier                                                                                                                              |
| 9609       | `{0}` Payment Attribute value is not valid                                                                                                                                    |
| 9610       | Emf new bill event failed points not awarded                                                                                                                                  |
| 9611       | Transaction is marked as outlier                                                                                                                                              |
| 9612       | Could not save the credit notes                                                                                                                                               |
| 9613       | `{0}` Payment Attribute is not valid                                                                                                                                          |
| 9614       | Multiple loyalty bills found to be returned                                                                                                                                   |
| 9615       | Return policy days not defined                                                                                                                                                |
| 9616       | Single loyalty bill found, Allowing regular return                                                                                                                            |
| 1101       | invalid programId passed                                                                                                                                                      |
| 1102       | invaid currency ratio                                                                                                                                                         |
| 1103       | invalid shipping store code passed                                                                                                                                            |
| 1104       | Customer details are missing                                                                                                                                                  |
| 1105       | Returnable Days should be greater than -1                                                                                                                                     |
| 1106       | Failed to add custom fields                                                                                                                                                   |
| 1107       | Invalid combination of roles & user ids selected in filter                                                                                                                    |
| 1108       | Invalid user id passed                                                                                                                                                        |
| 1109       | Maximum 1000 transactions can be fetched                                                                                                                                      |
| 1110       | Invalid embed params                                                                                                                                                          |
| 1111       | Invalid transaction limit                                                                                                                                                     |
| 1112       | Invalid offset                                                                                                                                                                |
| 1113       | Error fetching customer transaction details                                                                                                                                   |
| 1114       | Invalid date                                                                                                                                                                  |
| 1115       | Start should not be after end date                                                                                                                                            |
| 1116       | Emf simulate transaction add event call failed                                                                                                                                |
| 1117       | Invalid event logs param                                                                                                                                                      |
| 1118       | Transaction could not be updated                                                                                                                                              |
| 1119       | Invalid line item id passed                                                                                                                                                   |
| 1120       | Invalid line item code passed                                                                                                                                                 |
| 1121       | Outlier Bill Cannot be returned                                                                                                                                               |
| 3045       | `{0}` is not allowed for the customer with id `{2}` as the status is `{1}`                                                                                                    |

### Warning Codes

| Warning Code | Description                                        |
| ------------ | -------------------------------------------------- |
| 9605         | Base currency not set for this org                 |
| 9606         | Transaction currency not passed                    |
| 9607         | `{0}` - Payment tender not found                   |
| 9608         | Line item with Item code `{0}` is marked outlier   |
| 9609         | `{0}` Payment Attribute value is not valid         |
| 9610         | Emf new bill event failed points not awarded       |
| 9611         | Transaction is marked as outlier                   |
| 9612         | Could not save the credit notes                    |
| 9613         | `{0}` Payment Attribute is not valid               |
| 9614         | Multiple loyalty bills found to be returned        |
| 9615         | Return policy days not defined                     |
| 9616         | Single loyalty bill found, Allowing regular return |

<br />

> 📘
>
> The error code `625` could also appear in warning if the configuration `CONF_ALLOW_NOT_EXISTING_BILL_RETURN` is enabled. However, this is a very special case for a code that could appear as a error or warning.
> When `CONF_RETURN_WITHOUT_ORIGINAL_BILL_PROCESSING` is also on for the org, this same warning means the system also deducted the return amount from the customer's lifetime purchases, instead of leaving lifetime purchases unchanged.