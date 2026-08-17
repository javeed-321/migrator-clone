---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Transaction (V2)

A transaction represents a purchase or return event.

Transactions are classified into the following types:

* **Regular:**
  A standard sale recorded at the PoS. A regular transaction can be:
* * Loyalty
  * Non-loyalty
  * Not-interested
* **Return:**
  A transaction that reverses a previous sale at the PoS.

  A return must reference an existing bill identifier. Because of this dependency, only loyalty and non-loyalty transactions can be returned through APIs.

  For implementation details, see the Transaction Return API.
* **Mixed:**
  A transaction that combines a new sale and a return from a previous bill in the same billing flow.

  In a mixed transaction:

  * The system creates a new bill for the current purchase.
  * The system creates a return entry against the original bill for the returned items.
  * The new bill acts as the parent reference for the overall transaction context.

  Use a mixed transaction when a customer purchases new items and returns items from an earlier bill during the same checkout.

#### Prerequisites

Before using transaction APIs, understand the transaction configurations of your organization. You can see the transaction related settings on InTouch.\
**Intouch > Settings > Systems and Deployment > Intouch PoS Configuration > Billing**

* Mandatory parameters required to submit a transaction.
* Scope of transaction number uniqueness (store level or TILL level) and duration for which repetition is not allowed (20 days, 30 days etc.).
* Maximum and minimum amount allowed per transaction.
* Maximum and minimum amount allowed per line-item.

For information on how the system handles different timezones, see [Handling different timezone](https://docs.capillarytech.com/reference/timezone-in-api-response).

The `transaction/add` API lets you do the following:

* Supports transactions with Product Variant and Product Bundle details.
* Adds product variant to the database when a new variant product is passed with an existing base product.
* Adds base product to the database when a new base product/variant product is passed. However, if a new base product is passed with variant details, it adds only base product and ignores variant .
* Adds custom field and extended field details both at the transaction and line-item level.

**Variant Product**: A same product having different variations in terms of common properties such as size, and color.

**Product Bundle**: A group of items that are sold as a single pack. This can include Combo items (Example: pack of 2, combo offers), Split items (Example: a necklace having gold rate, store rate, making charge, wastage charge and so on) and add-on items (Example: Pizza with extra cheese, and personalized toppings).

The maximum size for storing transaction data is MEDIUMTEXT (16,777,215 bytes or 16 MiB).

#### Configuring Future Billing Date Limit

By default, transactions with billing dates more than 1 day in the future are rejected with error code 643. You can configure this limit per organization using the `CONF_MAX_TRANSACTION_FUTURE_DAYS` configuration.

| Setting            | Value                              |
| ------------------ | ---------------------------------- |
| Configuration name | `CONF_MAX_TRANSACTION_FUTURE_DAYS` |
| Default value      | 1 day                              |
| Minimum value      | 1 day                              |
| Maximum value      | 45 days                            |

**Behavior:**

* If the configuration is not set, the system defaults to 1 day.
* If the configuration value is invalid (non-numeric, zero, or negative), the system defaults to 1 day.
* If the configuration value exceeds 45, it is capped at 45 days.

> 📘 Note
>
> At present, this is applicable only for USHC cluster. To enable this configuration for your organization, raise a JIRA ticket to the Capillary Product Support team.