---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attribute - Transaction Value

## **Value**

**Profile** : currentTxn\
**Attribute** : value\
**Sub-Attribute**: NA\
**Operators:** <,>,<=,>=\
**Syntax**: currentTxn.value.\[Operators]\[Value]\
**Example**: currentTxn.value >= 10.\
**Meaning:** Total value of the transaction

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 1
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Issuing Coupons for current transaction amounts exceeding a certain value.
        Consider that you want to issue coupons for customers whose current transaction amount is greater than 8000, then use the following condition: **currentTxn.value>8000**  

        Issuing Coupons for the current transaction amount between two defined values
        Consider that you want to issue coupons for customers whose current transaction amount is greater than 1000, but less than or equal to 9000, then use the following condition:
        currentTxn.value>1000&&(currentTxn.value\<9000)
      </td>
    </tr>
  </tbody>
</Table>

| Example 2: Suppose you want to issue coupons to customers whose full name matches “John Smith” and whose transaction amount exceeds 3000 yet less than 5000. Then use the following condition: |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (currentTxn.value>3000&&(currentTxn.value<5000)&&(currentCustomer.name.matches("John Smith"))                                                                                                  |

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 3: Issuing coupons depending on the last name and the transaction amount




        Consider that you want to issue coupons for certain customers whose current transaction amount is equal to 5000 and their last name matches Smith. Then use the following condition:
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        currentTxn.value==5000&&(currentCustomer.lastname.matches("Smith"))
      </td>
    </tr>
  </tbody>
</Table>