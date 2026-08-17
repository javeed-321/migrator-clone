---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attributes - KPIs (Transaction Data)

Attributes covered: avgBasketSize , avgSpendPerVisit, clusterValueIncludes, clusterValueExcludes, numberOfTxns, numberOfTxns, numberOfVisits

## **1. avgBasketSize**

**Profile:** currentCustomer()\
**Attribute:** avgBasketSize\
**Sub-Attributes:** NA\
**Data type** -> Int (Integer)\
**Operator:** <(less than),>(greater than),<=(less than or equal to),>=(greater than or equal to),==(compare the LHS with RHS),!=(not equal to).

**Meaning:** The ratio of total line items purchased till date to the number of transactions/bills till date of a particular customer.\
**avgBasketSize = (Sum of total line items)/Number of Transaction (aka Count of transaction)**

**Syntax: currentCustomer.avgBasketSize\[Operators]\[Value]**

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 1 : Write a rule to check if the average basket size is greater than 10.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: current customer
        Attribute: avgBasketSize
        Operator: ">"
        Rule: ***currentCustomer.avgBasketSize>10***
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 2: Write a rule to check if the average basket size is equal to 10 and avg spend per visit is 80.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Rule: Condition 1 && Condition 2**
        **Condition1:**
        Profile: current Customer
        Attribute: average Basket Size
        Operator: ==
        **Condition2:**
        Profile: current Customer
        Attribute: averageSpendPerVisit
        Operator: ==
        Rule: ***currentCustomer.avgBasketSize==10&&(currentCustomer.avgSpendPerVisit)==80***
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 3: Write a rule to check if the average Basket Size is less than or equals to 203.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: current Customer
        Attribute: average Basket Size
        Operator: "\<=" i.e "less than or equal to"
        Rule: ***currentCustomer.avgBasketSize\<=203***
      </td>
    </tr>
  </tbody>
</Table>

***

## **2. avgSpendPerVisit**

**Profile:** currentCustomer()\
**Attribute:** avgSpendPerVisit\
**Sub-Attributes:** NA\
**Data type** -> BigDecimal\
**Operator:** <(less than),>(greater than),<=(less than or equal to),>=(greater than or equal to),==(compare the LHS with RHS),!=(not equal to).

**Meaning:** This is the average amount a customer is spending on a transaction.

**Formula: AvgSpendPerVisit = lifetimePurchase / numberOfVisits**

**Syntax: currentCustomer.avgSpendPerVisit\[Operators]\[Value]**

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 1: Write a rule to check if the average Spend per customer is greater than 5000 and currently all points are greater than or equals to 1000.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Rule: Condition 1 && Condition 2**
        **Condition1:**
        Profile: current Customer
        Attribute: average Spend per customer
        Operator: >
        **Condition2:**
        Profile: current Customer
        Attribute: currentAllPoints
        Operator: >=
        **Rule: currentCustomer.avgSpendPerVisit>=5000&&(currentCustomer.currentAllPoints>=1000)**
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 2:  Write a rule to check if the average basket size is equal to 10 and avg spend per visit is 10.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Rule: Condition 1 && Condition 2**
        **Condition1:**
        Profile: current Customer
        Attribute: average Basket Size
        Operator: ==
        **Condition2:**
        Profile: current Customer
        Attribute: averageSpendPerVisit
        Operator: ==
        **Rule: currentCustomer.avgBasketSize==10&&(currentCustomer.avgSpendPerVisit==10)**
      </td>
    </tr>
  </tbody>
</Table>

***

## **3. numberOfTxns**

**Profile:** Current Customer (currentCustomer)\
**return data type** -> Integer\
**Attribute Label** -> numberOfTrnx\
**Meaning** -> number of transactions since start for a customer\
**Sub-Attributes**: NA\
**Syntax: currentCustomer.NumberOfTxns\[operators]\[Value]**\
**Example:** currentCustomer.numberOfTxns==1

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule, to check the condition that total number of Transactions made by the customer is greater than or equals to 10.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: current Customer
        Attribute: numberOf Trnx
        Sub-Attribute: NA
        Rule: currentCustomer.numberOfTxns >=10
      </td>
    </tr>
  </tbody>
</Table>

***

## **4. numberOfTxnsToday**

**Profile:** Current Customer (currentCustomer)\
**return data type**: Integer\
**Attribute Label**: numberOfTrnxToday\
**Meaning**: Number of transactions made by a customer the current day\
**Sub-Attributes:** NA\
**Syntax: currentCustomer.NumberOfTxnsToday\[operators]\[Value]**\
**Example:** currentCustomer.numberOfTxnToday==1

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule, to check the condition that total number of Transactions made by the customer  in the current date is greater than or equals to 1.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: current Customer
        Attribute: numberOf Trnx
        Sub-Attribute: NA
        Rule: currentCustomer.numberOfTxnsToday >= 1
      </td>
    </tr>
  </tbody>
</Table>

***

## **5. numberOfVisits**

**Profile:** Current Customer (currentCustomer)\
**return data type**: Integer\
**Attribute Label**: numberOfVisits\
**Meaning:** number of unique days when customer made transaction\
**Sub-Attributes:** NA\
**Syntax: currentCustomer.NumberOfVisits\[operators]\[Value]**\
**Example:** currentCustomer.numberOfVisits==10

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule, to check the condition that total number of Visits made by the customer  is greater than or equals to 11.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: current Customer
        Attribute: numberOf Trnx
        Sub-Attribute: NA
        Rule: currentCustomer.numberOfVisits >= 11
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example:  Write a rule to check if the average Spend per customer is greater than 5000 OR number of transaction done on unique days is greater than 15.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Rule: Condition 1 || Condition 2**
        **Condition1:**
        Profile: current Customer
        Attribute: average Spend per customer
        Operator: >
        **Condition2:**
        Profile: current Customer
        Attribute: numberOfVisits
        Operator: >=
        **Rule: currentCustomer.avgSpendPerVisit>=5000||currentCustomer.numberOfVisits>=1000**
      </td>
    </tr>
  </tbody>
</Table>

***

## **6. lifetimePurchase**

**Data Type:** BigDecimal\
**Description:** customer's purchase since start including current transaction's purchase\
**Formula : lifetime purchase =\[ sum of all purchase - sum of refund amount ]**\
**Syntax: currentCustomer.lifetimePurchase\[Operators like <,>,>=,<=,=]\[VALUE]**

| Example1. Write a rule for current customers to check if LifetimePurchase is greater than 1000. |
| :---------------------------------------------------------------------------------------------- |
| currentCustomer.lifetimePurchase>1000                                                           |

| Example 2: check if LifetimePurchase is less than or equal to 1000. |
| :------------------------------------------------------------------ |
| currentCustomer.lifetimePurchase<=1000                              |

| Example3: write a rule to check if LifetimePurchase is between 1500 to 3000 and the customer did transaction only once till now. |
| :------------------------------------------------------------------------------------------------------------------------------- |
| (currentCustomer.lifetimePurchase>1500&¤tCustomer.lifetimePurchase<3000)&&(currentCustomer.numberOfVisits==1)                    |

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 4: write an expression for current customer to check if current slab number is less than 2 and lifetimePurchase is between 5000 to 15000.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Rule: Profile: currentCustomer
                  Attribute to check Slab number: slabNumber
                  Attribute to check lifetime Purchase: lifetimePurchase
                  And -> &&
                  Less than (>)
        Expression: **((currentCustomer.slabNumber\<2)&&((currentCustomer.lifetimePurchase > 5000)&&(currentCustomer.lifetimePurchase \<= 15000))**
      </td>
    </tr>
  </tbody>
</Table>

***

## **7. InitialLifetimePurchase**

**Data Type:** BigDecimal\
**Description:** customer's purchase since start before current transaction's purchase\
**Formula : Initial lifetime purchase =\[ sum of all purchases - sum of refund amount ] before evaluating the current transaction.\&#xA;**&#x53;yntax: currentCustomer.initialLifetimePurchase\[Operators like <,>,>=,<=,=]\[VALUE]\*\*

| Example 3: write a rule to check if initialLifetimePurchase is greater than 3000 and the customer did the transaction only twice. |
| :-------------------------------------------------------------------------------------------------------------------------------- |
| (currentCustomer.lifetimePurchase<3000)&&(currentCustomer.numberOfVisits==2)                                                      |