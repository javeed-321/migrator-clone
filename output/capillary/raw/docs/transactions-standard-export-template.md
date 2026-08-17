---
updatedAt: 2026-07-06T11:38:58.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Transactions Standard Export Template

The Transactions template is based on the **Bill Lineitems** fact.

This template lets you export transaction-related details such as:

**Note:** The `parent_line_number` field is populated only from line item extended fields when a value is explicitly provided. Values from custom fields or coupons are not mapped to `parent_line_number`. If the extended field is not provided, `parent_line_number` defaults to 0.

* Bill and line-item level transactions
* Member and non-member transactions
* Store level transactions
* Audience list (irrespective of selected date-range)
* Transaction level points
* Transactions of user segments
* Transaction level custom fields, and extended fields
* Line item level custom fields and extended fields
* User level extended fields

# Measures

<Table>
  <thead>
    <tr>
      <th>
        Measure
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Initial Bill Value
      </td>

      <td>
        Represents the original bill amount before any discounts are applied.
      </td>
    </tr>

    <tr>
      <td>
        Bill Number
      </td>

      <td>
        A unique number for a transaction that is either auto-generated at the POS machine or provided manually. The uniqueness of the bill number depends on the configurations.  
        **Note**:   

        * Exports based on the `bill_lineitems` table show one row for every individual item in a bill. So, if a bill has several items, the bill_number will repeat across multiple rows—one for each item.  
          If you want each bill_number to appear only once (one row per bill), use the bill_summary table instead, or set up your export to combine the item details into a single row.  
        * When exporting transactions with this template, the system joins the bill_lineitems table with the users and user_custom_fields tables. Only transactions with a Bill Number linked to a user are included. Any transaction without a linked user is excluded from the export.
      </td>
    </tr>

    <tr>
      <td>
        Visit Count
      </td>

      <td>
        Total number of visits made by a customer. It is based on the number of transactions recorded for the customer.
      </td>
    </tr>

    <tr>
      <td>
        Bill Amount
      </td>

      <td>
        Net amount of the transaction made by the customer after discounts, taxes, etc. Represents the final amount the customer is required to pay.
      </td>
    </tr>

    <tr>
      <td>
        Visit Day Count
      </td>

      <td>
        nth visit of the customer, based on ranking by dates. Even if the customer visits multiple times on the same day, it counts as one day in the visit count.
      </td>
    </tr>

    <tr>
      <td>
        Bill Discount
      </td>

      <td>
        Total discount applied on the bill.
      </td>
    </tr>

    <tr>
      <td>
        Redeemed Points
      </td>

      <td>
        Number of points redeemed for a specific transaction.
      </td>
    </tr>

    <tr>
      <td>
        Days Since Last Visit
      </td>

      <td>
        The number of days since the customer's last transaction.
      </td>
    </tr>

    <tr>
      <td>
        Tax Amount
      </td>

      <td>
        Total tax levied at the bill level.
      </td>
    </tr>

    <tr>
      <td>
        Central Gst
      </td>

      <td>
        GST tax levied by the Central Government.
      </td>
    </tr>

    <tr>
      <td>
        Integrated Gst
      </td>

      <td>
        GST levied by the Central Government for inter-state trade.
      </td>
    </tr>

    <tr>
      <td>
        State Gst
      </td>

      <td>
        Taxes levied by the State Government on the bill.
      </td>
    </tr>

    <tr>
      <td>
        Auto Update Time Bill
      </td>

      <td>
        Date and time when the record in the bill table was last updated, in Unix timestamp format.
      </td>
    </tr>

    <tr>
      <td>
        Auto Update Time Shipping
      </td>

      <td>
        Date and time when the record in the shipping table was last updated, in Unix timestamp format.
      </td>
    </tr>

    <tr>
      <td>
        Auto Update Time Combo Details
      </td>

      <td>
        Date and time when the record in the combo_details table was last updated, in Unix timestamp format.
      </td>
    </tr>

    <tr>
      <td>
        Auto Update Time Bill Extended Fields
      </td>

      <td>
        Date and time when the record in the bill extended fields table was last updated, in Unix timestamp format.
      </td>
    </tr>

    <tr>
      <td>
        Total Quantity
      </td>

      <td>
        Total number of line items in the bill.
      </td>
    </tr>

    <tr>
      <td>
        Reason
      </td>

      <td>
        Captures the reason for the transaction.
      </td>
    </tr>

    <tr>
      <td>
        Notes
      </td>

      <td>
        Field for capturing important notes related to a line item, such as a custom description or specific details while recording line-item level data.
      </td>
    </tr>

    <tr>
      <td>
        Converted Bill Id
      </td>

      <td>
        The new bill id after conversion from non-loyal customer to loyal customer.
      </td>
    </tr>

    <tr>
      <td>
        Allocated Points
      </td>

      <td>
        Number of loyalty points allocated to a customer for a specific transaction, either at the bill, line item, or customer level.
      </td>
    </tr>

    <tr>
      <td>
        Bill Id
      </td>

      <td>
        A unique id generated for the bill internally by the system, helping differentiate one customer's bill from another.
      </td>
    </tr>

    <tr>
      <td>
        Rate
      </td>

      <td>
        Total cost of a line item, obtained by multiplying the item price by the quantity purchased.
      </td>
    </tr>

    <tr>
      <td>
        Line Item Amount
      </td>

      <td>
        Total amount for the line item after discounts and taxes.
      </td>
    </tr>

    <tr>
      <td>
        Quantity
      </td>

      <td>
        Number of units/line items bought.
      </td>
    </tr>

    <tr>
      <td>
        Initial Line Item Value
      </td>

      <td>
        The original value of a line item before discounts or taxes.
      </td>
    </tr>

    <tr>
      <td>
        Item Code
      </td>

      <td>
        Unique code assigned to a line item within the transaction.
      </td>
    </tr>

    <tr>
      <td>
        Line Item Discount
      </td>

      <td>
        Discount applied to the specific line item.
      </td>
    </tr>

    <tr>
      <td>
        Parent Line Item Id
      </td>

      <td>
        Identifier for the parent line item in combo or add-on transactions.
      </td>
    </tr>

    <tr>
      <td>
        Additional Discount
      </td>

      <td>
        Extra discount applied, such as for combo or bulk items, based on user input.
      </td>
    </tr>

    <tr>
      <td>
        Total Unit Cost
      </td>

      <td>
        Total price of the item, including taxes and other charges.
      </td>
    </tr>

    <tr>
      <td>
        Auto Update Time Lineitem
      </td>

      <td>
        Date and time when the line item table (e.g., product name, quantity, price) was last updated, in Unix timestamp format.
      </td>
    </tr>

    <tr>
      <td>
        Auto Update Time Lineitem Extended Fields
      </td>

      <td>
        Date and time when the line item extended fields table was last updated, in Unix timestamp format.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem Uuid
      </td>

      <td>
        Universal Unique Identifier (UUID) for the line item.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem Serial Number
      </td>

      <td>
        Unique serial number for the line item.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem Vat Tax Percentage
      </td>

      <td>
        Percentage of VAT levied by the Central Government on the line item.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem Vat Amount
      </td>

      <td>
        Amount of VAT levied by the Central Government on the line item.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem Service Tax Amount
      </td>

      <td>
        Amount of service tax applicable to the line item.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem Service Tax Percentage
      </td>

      <td>
        Percentage of service tax levied on the line item.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem Central Gst
      </td>

      <td>
        GST levied by the Central Government on the line item.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem State Gst
      </td>

      <td>
        State GST applicable to the line item.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem Integrated Gst
      </td>

      <td>
        Integrated GST levied by the Central Government on the line item.
      </td>
    </tr>

    <tr>
      <td>
        Lineitem Size
      </td>

      <td>
        Size of the line item.
      </td>
    </tr>

    <tr>
      <td>
        Description
      </td>

      <td>
        Description of the line items.
      </td>
    </tr>

    <tr>
      <td>
        Items In Product Set
      </td>

      <td>
        Count of items within a product set.
      </td>
    </tr>

    <tr>
      <td>
        Item Discount Description
      </td>

      <td>
        Description of the reason for applying the discount to the item.
      </td>
    </tr>

    <tr>
      <td>
        Item Points Discount
      </td>

      <td>
        Discount applied to the line item using loyalty points.
      </td>
    </tr>

    <tr>
      <td>
        Item Coupon Discount
      </td>

      <td>
        Discount applied to the line item using coupons.
      </td>
    </tr>

    <tr>
      <td>
        Item Unit Margin
      </td>

      <td>
        Profit margin associated with the item.
      </td>
    </tr>

    <tr>
      <td>
        Line Item Id
      </td>

      <td>
        Unique id generated by the system for the specific line item.
      </td>
    </tr>
  </tbody>
</Table>

# Dimensions

| Dimension Name                                                                                                                                             | Description                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Membership](https://docs.capillarytech.com/docs/dimension-tables#membership-type)                                                                         | Specifies the membership type and Id of the customer who completed the transaction.                                                                                                                                                                                        |
| [User](https://docs.capillarytech.com/docs/dimension-tables#users-users)                                                                                   | User details such as user id, source, slab name, external id, fraud status, mobile, email, etc.                                                                                                                                                                            |
| [User Segments](https://docs.capillarytech.com/docs/dimension-tables#users-users)                                                                          | Segment details of the customers such as valued customer, lapsed customer.                                                                                                                                                                                                 |
| [User Attributes](https://docs.capillarytech.com/docs/dimension-tables#users-users)                                                                        | User attributes such as total visits, recent view.                                                                                                                                                                                                                         |
| [Time](https://docs.capillarytech.com/docs/dimension-tables#time)                                                                                          | Time attributes.                                                                                                                                                                                                                                                           |
| [Store Hierarchy](https://docs.capillarytech.com/docs/dimension-tables#zone-till)                                                                          | Identifier assigned to the point-of-sale (POS) terminal within a store.                                                                                                                                                                                                    |
| [Concept Hierarchy](https://docs.capillarytech.com/docs/dimension-tables#zone-till)                                                                        | Identifier for the concept.                                                                                                                                                                                                                                                |
| [Ou Hierarchy](https://docs.capillarytech.com/docs/dimension-tables#zone-till)                                                                             | Identifier for the organization unit.                                                                                                                                                                                                                                      |
| [Line Item Outlier](https://docs.capillarytech.com/docs/dimension-tables#outlier-status)                                                                   | Outlier status of the bill at the line item level.                                                                                                                                                                                                                         |
| [Product](https://docs.capillarytech.com/docs/dimension-tables#item)                                                                                       | Product related attributes such as item code, category, item id, color, style, etc.                                                                                                                                                                                        |
| [Product Attributes](https://docs.capillarytech.com/docs/dimension-tables#item)                                                                            | Additional product attributes such as description, item sku and item Id.                                                                                                                                                                                                   |
| [Bill Outlier](https://docs.capillarytech.com/docs/dimension-tables#outlier-status)                                                                        | Outlier status of the bill.                                                                                                                                                                                                                                                |
| [Date](https://docs.capillarytech.com/docs/dimension-tables#date)                                                                                          | Date attributes.                                                                                                                                                                                                                                                           |
| [Repeat](https://docs.capillarytech.com/docs/dimension-tables#repeat-status)                                                                               | Shows if the customer has made previous purchases or if it's their first transaction.                                                                                                                                                                                      |
| [Loyalty](https://docs.capillarytech.com/docs/dimension-tables#loyalty-type)                                                                               | Indicates the loyalty type of the customer. Possible values are - loyalty, non loyalty, not registered (who have not provided their contact details).                                                                                                                      |
| [Source](https://docs.capillarytech.com/docs/dimension-tables#source-type)                                                                                 | Indicates the source of the bill. Possible values are instore, e-comm, newsletter, campaigns, NCA, Wechat, Facebook, etc.                                                                                                                                                  |
| [Line Item Type](https://docs.capillarytech.com/docs/dimension-tables#line-item-type)                                                                      | Type of the line item; such as an add on item, combo item, combo parent, and split.                                                                                                                                                                                        |
| [Parent Item](https://docs.capillarytech.com/docs/dimension-tables#item)                                                                                   | Product related attributes of the parent item, such as item code, category, item id, color, style, etc.                                                                                                                                                                    |
| [Order Channel](https://docs.capillarytech.com/docs/dimension-tables#order-channel)                                                                        | It indicates the specific channel through which the transaction was completed. They include - online, in-store, through a mobile app, etc.                                                                                                                                 |
| [Special Lineitem Type](https://docs.capillarytech.com/docs/dimension-tables#special-line-item-type)                                                       | Identifier for the special line item type. Possible values are - free item, and processing fee information.                                                                                                                                                                |
| [Nps](https://docs.capillarytech.com/docs/dimension-tables#nps-score)                                                                                      | Net Promoter Score (NPS) for the transaction, where NPS is a measure for customer satisfaction, ranging from 1 to 10.                                                                                                                                                      |
| [Cashier Id](https://docs.capillarytech.com/docs/dimension-tables#cashier)                                                                                 | Identifier of the cashier who processed the transaction.                                                                                                                                                                                                                   |
| [Lineitem Cashier Discount Reason](https://docs.capillarytech.com/docs/dimension-tables#reason-for-the-cashier-discount-line-item-cashier-discount-reason) | Identifier of the reason behind the discount applied to the lineitem.                                                                                                                                                                                                      |
| [Lineitem Cashier](https://docs.capillarytech.com/docs/dimension-tables#line-item-cashier-id)                                                              | Identifier of the cashier who processed the transaction.                                                                                                                                                                                                                   |
| [Lineitem External Coupon Code](https://docs.capillarytech.com/docs/dimension-tables#line-item-external-coupon-code)                                       | Coupon code id if any external coupon has been applied on the lineitems.                                                                                                                                                                                                   |
| [Lineitem Return Reason](https://docs.capillarytech.com/docs/dimension-tables#line-item-return-reason-id)                                                  | Identifier of the reason for returning the lineitem.                                                                                                                                                                                                                       |
| [Conversion Request Date](https://docs.capillarytech.com/docs/dimension-tables#date)                                                                       | Date when the request was raised to convert a bill from non-loyalty customer to loyalty customer status.                                                                                                                                                                   |
| [Conversion Request Time](https://docs.capillarytech.com/docs/dimension-tables#time)                                                                       | Time when the request was raised to convert a bill from non-loyalty customer to loyalty customer status.                                                                                                                                                                   |
| [Bill Conversion Date](https://docs.capillarytech.com/docs/dimension-tables#date)                                                                          | Date of the bill conversion when the customer has been converted from non loyalty customer to loyalty customer.                                                                                                                                                            |
| [Bill Conversion Time](https://docs.capillarytech.com/docs/dimension-tables#time)                                                                          | Time of the bill conversion when the customer has been converted from non loyalty customer to loyalty customer.                                                                                                                                                            |
| [Latest Updated Date](https://docs.capillarytech.com/docs/dimension-tables#date)                                                                           | Latest date when the data is updated.                                                                                                                                                                                                                                      |
| [Latest Updated Time](https://docs.capillarytech.com/docs/dimension-tables#date)                                                                           | Latest date when the data is updated.                                                                                                                                                                                                                                      |
| [Cashier Discount Reason](https://docs.capillarytech.com/docs/dimension-tables#reason-for-the-cashier-discount-line-item-cashier-discount-reason)          | Identifier of the reason behind the discount applied to the bill.                                                                                                                                                                                                          |
| [Buyer Type](https://docs.capillarytech.com/docs/dimension-tables#buyer-type)                                                                              | Identifier for the type of buyer. Possible values are retail, and wholesale.                                                                                                                                                                                               |
| [Membership Card Present](https://docs.capillarytech.com/docs/dimension-tables#membership-card-present)                                                    | Indicates whether a membership card is present for the customer or not.                                                                                                                                                                                                    |
| [Item Tax Code](https://docs.capillarytech.com/docs/dimension-tables#line-item-tax-code)                                                                   | Indicates a specific tax category. Includes GST at the central and state levels, interstate GST, and taxes levied to the total bill.                                                                                                                                       |
| [Item Promotion Code](https://docs.capillarytech.com/docs/dimension-tables#line-item-promotion-code)                                                       | Gives the line item promotion code information                                                                                                                                                                                                                             |
| [Item Discount Type](https://docs.capillarytech.com/docs/dimension-tables#line-item-discount-type)                                                         | Identifier of the type of discount given to the customer.                                                                                                                                                                                                                  |
| [Cashier Name](https://docs.capillarytech.com/docs/dimension-tables#cashier-name)                                                                          | Name of the cashier who processed the transaction.                                                                                                                                                                                                                         |
| [Card Used](https://docs.capillarytech.com/docs/dimension-tables#card-used-card_used)                                                                      | Identifier for the card used in the transaction.                                                                                                                                                                                                                           |
| Parent Line Number                                                                                                                                         | Indicates the parent line number for a line item. This value is populated only from line item extended fields when explicitly provided. If the extended field is not provided, the value defaults to 0. Values from custom fields or coupons are not mapped to this field. |