---
updatedAt: 2026-04-23T10:56:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Profile : Current Transaction

Attributes based on Transaction

**Profile : Current Transaction(currentTxn)**\
The currentTxn profile returns the details of a transaction. We generally use this profile to write rules on transactions, basket size, custom fields, and so on. Refer to the table below for all the supported attributes of customerTxn.

## Attributes - KPI (Transaction/Basket)

*The below grouping of attributes is based on the key Performance Indicator of transactions/basket.*

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attributes
      </th>

      <th>
        Description
      </th>

      <th>
        Link
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        basketSum()
      </td>

      <td>
        The sum of value of the items matching the inventory attribute.
      </td>

      <td>
        [Learn More]()
      </td>
    </tr>

    <tr>
      <td>
        basketSumRegex()
      </td>

      <td>
        The sum of the value of the items matching the inventory attribute RegEx.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketsumregex)
      </td>
    </tr>

    <tr>
      <td>
        basketQty()
      </td>

      <td>
        The total quantity of items in the bill matches the inventory.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketqty)
      </td>
    </tr>

    <tr>
      <td>
        basketQtyRegex()
      </td>

      <td>
        The quantity of items in the bill matches the regular expression.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketqtyregex)
      </td>
    </tr>

    <tr>
      <td>
        basketcount()
      </td>

      <td>
        Number of products in the transaction of the given inventory type, irrespective of quantity.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketcount)
      </td>
    </tr>

    <tr>
      <td>
        basketcountRegex()
      </td>

      <td>
        Number of products whose item attribute matches the given regular expression.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        basketIncludes()
      </td>

      <td>
        Products contained in the transaction.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketincludes)
      </td>
    </tr>

    <tr>
      <td>
        basketExcludes()
      </td>

      <td>
        Products not contained in the transaction.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketexcludes)
      </td>
    </tr>

    <tr>
      <td>
        basketSumIf
      </td>

      <td>
        Returns the sum of the amount of line items that satisfies a specific condition.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketsumif)
      </td>
    </tr>

    <tr>
      <td>
        basketCountIf
      </td>

      <td>
        Returns the count of line items of the basket that satisfies a specific condition.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketcountif)
      </td>
    </tr>

    <tr>
      <td>
        basketQtyIf
      </td>

      <td>
        Return the sum of quantities of qualifying line items in the basket.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketqtyif)
      </td>
    </tr>

    <tr>
      <td>
        basketSize
      </td>

      <td>
        Total number of items in the bill - irrespective of quantity of each item.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basket-size)
      </td>
    </tr>

    <tr>
      <td>
        basketSumGross
      </td>

      <td>
        The sum of the gross amount of each line item in a basket with a specific attribute.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketsumgross)
      </td>
    </tr>

    <tr>
      <td>
        basketSumRegexGross
      </td>

      <td>
        The sum of the gross amount of each line item in the basket  
        whose product attribute values match the given regular expression.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/a#basketsumregexgross)
      </td>
    </tr>
  </tbody>
</Table>

## Attribute - Transaction Number

| Attributes | Definition                | Link                                                                                                      |
| :--------- | :------------------------ | :-------------------------------------------------------------------------------------------------------- |
| number     | Transaction number or ID. | [Learn More](https://docs.capillarytech.com/docs/attributes-based-on-customer-identity#attribute--number) |

## Attribute - Date

| Attribute | Definition              | Link                                                                                      |
| :-------- | :---------------------- | :---------------------------------------------------------------------------------------- |
| date      | date of the Transaction | [Learn More](https://docs.capillarytech.com/docs/attribute-date-transactionpurchase-date) |

## Attributes - Custom Field (Transaction)

*The below grouping of attributes is based on custom fields created at the transaction level.*

| Attributes               | Definition                                                                   | Link                                                                                                |
| :----------------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| customFieldValueIncludes | Returns True if input custom field value matches with bill's custom fields.  | [Learn More](https://docs.capillarytech.com/docs/attributes-custom-fields#customfieldvalueincludes) |
| customFieldValueExcludes | Returns False if input custom field value matches with bill's custom fields. | [Learn More](https://docs.capillarytech.com/docs/attributes-custom-fields#customfieldvalueexcludes) |

## Attributes - Transaction Value

| Attributes | Definition                     | Link                                                                          |
| :--------- | :----------------------------- | :---------------------------------------------------------------------------- |
| value      | Total value of the transaction | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-value) |

## Attributes - Discount

| Attributes | Definition                          | Link                                                                 |
| :--------- | :---------------------------------- | :------------------------------------------------------------------- |
| discount   | Discounted value on the transaction | [Learn More](https://docs.capillarytech.com/docs/attribute-discount) |

## Attributes - Note

| Attributes | Definition                                                              | Link                                                                             |
| :--------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| note       | Transaction level notes specified by the cashier during the transaction | [Learn More](https://docs.capillarytech.com/docs/attribute-using-standard-field) |

## Attributes - Reward currency (points and alternate currencies)

| Attributes                          | Definition                                                                                                                                                                                                                        | Link                                                                           |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| points                              | Total points issued for a transaction. Points include only regular points earned on transactions made as part of a loyalty program. This includes points earned by individual users and user groups.                              | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| pointsForUser                       | Total points issued for a transaction for an individual user.                                                                                                                                                                     | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| pointsForUserGroup                  | Total points issued for a transaction for a specific user group.                                                                                                                                                                  | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| promisedPoints                      | Total promised points issued for a transaction. Refer to the [glossary section](https://docs.capillarytech.com/docs/glossary-1#delayed-accrual-and-promised-points)  for more information on promised points and delayed accrual. | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| promisedPointsForUser               | Total promised points issued for a transaction for an individual user.                                                                                                                                                            | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| promisedPointsForUserGroup          | Total promised points issued for a transaction for a specific user group.                                                                                                                                                         | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| currencyAwarded                     | Total redeemable alternate currency points awarded for the current transaction, for a specified currency identifier.                                                                                                              | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| currencyAwardedForUser              | Redeemable alternate currency points awarded to the individual user for the current transaction, for a specified currency identifier.                                                                                             | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| currencyAwardedForUserGroup         | Redeemable alternate currency points awarded to the user's group for the current transaction, for a specified currency identifier.                                                                                                | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| promisedCurrencyAwarded             | Total promised (non-redeemable) alternate currency points awarded for the current transaction, for a specified currency identifier.                                                                                               | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| promisedCurrencyAwardedForUser      | Promised alternate currency points awarded to the individual user for the current transaction, for a specified currency identifier.                                                                                               | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |
| promisedCurrencyAwardedForUserGroup | Promised alternate currency points awarded to the user's group for the current transaction, for a specified currency identifier.                                                                                                  | [Learn More](https://docs.capillarytech.com/docs/attribute-transaction-points) |