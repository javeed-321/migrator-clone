---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Transaction (V1)

A transaction represents a purchase or return event. Based on the customers’ loyalty status, transactions are categorized into three types.

* **Loyalty Transactions**: Transactions made by registered customers of your organization’s loyalty program. A customer can be tagged to a loyalty transaction.
* **Non-loyalty Transactions**: Transactions made by customers who are not registered into your loyalty program, but subscribed their mobile number or email id with the organization. These transactions are tagged to the respective identifiers (mobile no/email id)
* **Not-interested Transactions**: Transactions made by customers who are not interested to register into your organization’s loyalty program. These transactions are also considered as anonymous transactions.

Transactions are again classified into the following types:

* **Regular**: Normal transactions made at the PoS. Regular transactions could be loyalty, non-loyalty and not-interested.
* **Return** : Transactions that are returned at the PoS. Return transactions need an identifier reference. Hence, only loyalty and non-loyalty transactions can be returned through APIs. See Transaction Return API for more details.
* **Mixed**: A transaction that involves both regular and return is termed as mixed transaction.

The transaction entity contains all the necessary APIs to manage transactions and retrieve transaction details. The transaction entity stores regular/return transactions, points/coupons redeemed against transactions, retro transactions (converting not interested transactions to loyalty), extended fields, and custom fields.

For information on how the system handles different timezones, see [Handling different timezone](https://docs.capillarytech.com/reference/timezone-in-api-response).

> 📘
>
> Extended fields and custom fields in transactions are used to capture additional information of a transaction or transaction line-item. The extended fields are predefined defined in the system with specific values, whereas, custom fields can have any name and value as required for the org.

## Prerequisites

Before using transaction APIs, understand the transaction configurations of your organization. You can see the transaction related settings on InTouch > Settings > Systems & Deployment > InTouch PoS Configuration > Billing.

* Mandatory parameters required to submit a transaction
* Whether Retro Transaction is enabled to convert not-interested transactions to regular transactions and the maximum duration for which retro transaction is allowed
* Whether Authorization is required for retro transactions
* Whether Transaction Return is enabled for your organization (for transaction returns)
* Scope of transaction numbers to be unique (store level or TILL level) and duration for which repetition is not allowed (20 days, 30 days etc.)
* Maximum and minimum amount allowed per transaction
* Maximum and minimum amount allowed per line-item

> 📘
>
> Ignore error headers. It is still in the evaluation phase.

## Configuring Future Billing Date Limit

By default, transactions with billing dates more than 1 day in the future are rejected with error code 643. You can configure this limit per organization using the `CONF_MAX_TRANSACTION_FUTURE_DAYS` configuration.

### Configuration Details

| Setting            | Value                              |
| ------------------ | ---------------------------------- |
| Configuration name | `CONF_MAX_TRANSACTION_FUTURE_DAYS` |
| Default value      | 1 day                              |
| Minimum value      | 1 day                              |
| Maximum value      | 45 days                            |

### Behavior

* If the configuration is not set, the system defaults to 1 day.
* If the configuration value is invalid (non-numeric, zero, or negative), the system defaults to 1 day.
* If the configuration value exceeds 45, it is capped at 45 days.

> 📘 Note
>
> At present, this is applicable only for USHC cluster. To enable this configuration for your organization, raise a JIRA ticket to the Capillary Product Support team.

## Status Codes

### Success Codes

| Code | Description                                                                                                     |
| ---- | --------------------------------------------------------------------------------------------------------------- |
| 600  | Transaction added successfully.<br />Transaction retrieved successfully.<br />Transaction updated successfully. |
| 1630 | Transaction marked as regular through Retro conversion. Transaction added successfully.                         |

### Error Codes

| Code                                    | Description                                                                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 500                                     | Unable to retrieve transaction.                                                                                                                         |
| 517                                     | Rate limit exceeded for that specific user.                                                                                                             |
| 601                                     | Transaction failed. Transaction amount, quantity, rate, or discount is invalid.                                                                         |
| 602                                     | Transaction number is invalid.                                                                                                                          |
| 603                                     | Points are already used (Deprecated).                                                                                                                   |
| 604                                     | Transaction number already exists.                                                                                                                      |
| 605                                     | Invalid transaction type. Only regular, return and not-interested transaction types are supported.                                                      |
| 606                                     | Customer identifier is not passed. Please enter customer's mobile or email or external id to process.                                                   |
| 607                                     | No transaction id passed. Please pass the transaction id to process.                                                                                    |
| 608                                     | Unable to add transaction.                                                                                                                              |
| 609                                     | Update failed. Please verify all the fields.                                                                                                            |
| 610                                     | Unable to register. Please verify all the fields.                                                                                                       |
| 611                                     | Customer not found.                                                                                                                                     |
| 614                                     | Transaction is already cancelled.                                                                                                                       |
| 615                                     | Transaction details are not passed.                                                                                                                     |
| 616                                     | Item code already exists.                                                                                                                               |
| 617                                     | Invalid attribute for the item.                                                                                                                         |
| 618                                     | Customer is marked as fraud.                                                                                                                            |
| 619                                     | Transaction id is not provided.                                                                                                                         |
| 620                                     | Transaction id is invalid.                                                                                                                              |
| 621                                     | Transaction date is invalid. Transaction date should be within the accepted past or future date range limit.                                            |
| 622                                     | Unable to add line-item.                                                                                                                                |
| 623                                     | Unable to trigger other related events for the transaction.                                                                                             |
| 624                                     | Unable to process return-transaction. You can make a return only after adding a transaction.                                                            |
| 625                                     | Transaction number does not exist.                                                                                                                      |
| 626                                     | Unable to return transaction. The quantity of returned items are more than purchased items.                                                             |
| 627                                     | Quantity cannot be negative.                                                                                                                            |
| 628                                     | Invalid return transaction type.                                                                                                                        |
| 629                                     | The return quantity of the item is more than available quantity.                                                                                        |
| 630                                     | The return amount is more than the transaction/line-item amount.                                                                                        |
| 631                                     | Transaction amount cannot be negative.                                                                                                                  |
| 632                                     | Cannot return the transaction with return type LINE\_ITEM because the type AMOUNT has already been used for returning the same transaction.             |
| 633                                     | The entire transaction is already returned.                                                                                                             |
| 634                                     | This transaction is already returned.                                                                                                                   |
| 635                                     | Cannot return the transaction with the return type AMOUNT because the type LINE\_ITEM has been used for returning the same transaction.                 |
| 636                                     | The transaction is already returned with the return type as LINE\_ITEM. You can process return for other items only with return type LINE\_ITEM.        |
| 637                                     | Unable to revert points issued to the customer (for return transaction). Please try again later.                                                        |
| 638                                     | Unable to return transaction. The transaction is already returned with type LINE\_ITEM. Hence, you cannot use the type AMOUNT for the same transaction. |
| 639                                     | Unable to return full transaction. A part of the transaction or complete transaction is already returned.                                               |
| 640                                     | Points or coupons are not redeemed for this transaction.                                                                                                |
| 641                                     | No customer found.                                                                                                                                      |
| 642                                     | Redemption failed. An error occurred in points/coupon redemption.                                                                                       |
| 643                                     | Invalid transaction. The transaction date exceeds the accepted future date limit.                                                                       |
| 644                                     | Invalid transaction. The transaction date cannot be less than the accepted past date limit.                                                             |
| 645                                     | Transaction addition failed for not interested.                                                                                                         |
| 646                                     | Customer registration failed. The email id is invalid.                                                                                                  |
| 647                                     | Customer registration failed. Email id is already assigned to another customer.                                                                         |
| 648                                     | Customer registration failed. Mobile number is already assigned to another customer.                                                                    |
| 649                                     | Customer registration failed. Mobile number is invalid.                                                                                                 |
| 650                                     | Customer registration failed. Mobile number is not accepted as a unique identifier.                                                                     |
| 651                                     | Customer registration failed. Mobile number is required for registration.                                                                               |
| 652                                     | Customer registration failed. Mobile number/email id/external id is invalid.                                                                            |
| 653                                     | Customer registration failed. External id is already assigned to another customer.                                                                      |
| 654                                     | Customer registration failed. External id is not accepted as a unique identifier.                                                                       |
| 655                                     | Customer registration failed. Customer is not registered in loyalty program.                                                                            |
| 656                                     | No customer found.                                                                                                                                      |
| 657                                     | Customer registration failed. Registration in EUP failed.                                                                                               |
| 658                                     | Customer registration failed. Only email id is not sufficient for registration.                                                                         |
| 659                                     | Customer registration failed. Please enter email id to register.                                                                                        |
| 660                                     | Customer registration failed. Registration date exceeds the accepted past or future date limit.                                                         |
| 661                                     | Amount of the line-item amount cannot be negative.                                                                                                      |
| 662                                     | Value of a line cannot be negative.                                                                                                                     |
| 663                                     | Rate of a line-item cannot be negative                                                                                                                  |
| 664                                     | Discount of a line-item cannot be negative.                                                                                                             |
| 665                                     | Gross amount of the transaction cannot be negative.                                                                                                     |
| 666                                     | Discount cannot be negative.                                                                                                                            |
| 667                                     | Unable to find the transaction ID for this customer.                                                                                                    |
| 668                                     | Unable to find the transaction number for this customer.                                                                                                |
| 669                                     | Unable to update custom field.                                                                                                                          |
| 670                                     | Transaction id/number is not provided.                                                                                                                  |
| 671                                     | Invalid Store or TILL code.                                                                                                                             |
| Invalid category code.                  |                                                                                                                                                         |
| 672                                     | Batch limit exceeded.                                                                                                                                   |
| 673                                     | Returning of transactions is not allowed.                                                                                                               |
| 674                                     | Returning of line item is not allowed.                                                                                                                  |
| 675                                     | Returning of transaction amount is not allowed.                                                                                                         |
| 676                                     | Returning of a complete transaction amount is not allowed.                                                                                              |
| 677                                     | Unable to process. Please enter a transaction number for returning a transaction.                                                                       |
| 678                                     | Amount of returned item is more than purchased item.                                                                                                    |
| 679                                     | Line-item(s) to be returned is not specified.                                                                                                           |
| 680                                     | No transactions of the specific customer were found.                                                                                                    |
| 681                                     | Transactions are blocked for this customer.                                                                                                             |
| 682                                     | Currency conversion is disabled for the org.                                                                                                            |
| 683                                     | Failed to call new bill event EMF.                                                                                                                      |
| 684                                     | Failed EMF new bill DVS event.                                                                                                                          |
| 685                                     | Field length too long.                                                                                                                                  |
| 686                                     | Unable to add transaction.                                                                                                                              |
| 687                                     | Points activities are queued and will be updated later.                                                                                                 |
| Item code `{x}` merge is not supported. |                                                                                                                                                         |
| 688                                     | No matching line-item found for return.                                                                                                                 |
| Transaction number not found.           |                                                                                                                                                         |
| 689                                     | Points processing failed                                                                                                                                |
| 690                                     | Points processing failed                                                                                                                                |
| 691                                     | Points processing failed                                                                                                                                |
| 692                                     | Points processing failed                                                                                                                                |
| 693                                     | Points processing failed                                                                                                                                |
| 694                                     | Points processing failed                                                                                                                                |
| 695                                     | Invalid configuration. Please report to the Capillary Support.                                                                                          |
| 696                                     | Points processing failed                                                                                                                                |
| 697                                     | Points processing failed                                                                                                                                |
| 698                                     | Points processing failed.                                                                                                                               |
| 699                                     | Invalid configuration. Please report to the Capillary Support.                                                                                          |
| 710                                     | Return bill event failed from EMF.                                                                                                                      |
| 820                                     | Current operation is not allowed. The customer is marked as fraud.                                                                                      |
| 1101                                    | Invalid loyalty program ID passed.                                                                                                                      |
| 1102                                    | Invalid currency conversion ratio passed.                                                                                                               |
| 1103                                    | Invalid shipping store code passed.                                                                                                                     |
| 1623                                    | Transaction type is invalid.                                                                                                                            |
| 1624                                    | Insufficient parameters passed to fetch transaction.                                                                                                    |
| 1625                                    | Target type is not specified.                                                                                                                           |
| 1626                                    | The requested transaction type cannot be changed.                                                                                                       |
| 1627                                    | The transaction is already marked as retro.                                                                                                             |
| 1628                                    | Transaction id is invalid                                                                                                                               |
| 1629                                    | Client signature is required to perform this action                                                                                                     |
| 1631                                    | Retro transaction is not enabled for your organization                                                                                                  |
| 1632                                    | Registration date is too older than the transaction date. See the retro configuration set for your organization                                         |
| 1633                                    | The duration between registration and transaction mapping exceeds the limit set                                                                         |
| 1634                                    | Return type is invalid                                                                                                                                  |
| 1635                                    | Please pass line-items that need to be returned                                                                                                         |
| 1636                                    | Transaction status is invalid                                                                                                                           |
| 9601                                    | Failed to add line-item.                                                                                                                                |
| 9602                                    | Failed to add credit notes.                                                                                                                             |
| 9603                                    | Failed to add payment more details (tender).                                                                                                            |
| 9604                                    | Failed to add custom fields                                                                                                                             |
| 9605                                    | Base currency is not set for the org.                                                                                                                   |
| 9606                                    | Currency not passed for the transaction.                                                                                                                |
| 9607                                    | Payment mode (tender) not found.                                                                                                                        |
| 9608                                    | Line-item with the item code `{x}` passed is marked as outlier.                                                                                         |
| 9609                                    | Invalid payment attribute passed.                                                                                                                       |
| 9610                                    | New bill event failed. Points are not awarded.                                                                                                          |
| 9611                                    | Transaction is marked as outlier.                                                                                                                       |
| 9612                                    | Unable to save credit notes.                                                                                                                            |
| 9613                                    | Invalid payment attribute.                                                                                                                              |
| 9614                                    | Multiple loyalty bills found to be returned.                                                                                                            |
| 9615                                    | Validity (in days) for return policy is not defined.                                                                                                    |
| 9616                                    | Single loyalty bill found. Allowing regular return.                                                                                                     |