---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attributes - KPI (Basket)

Attributes based on Basket/Cart of currentTxn:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Attributes
      </th>

      <th style={{ textAlign: "left" }}>
        Data Type
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        basketSum
      </td>

      <td style={{ textAlign: "left" }}>
        BigDecimal
      </td>

      <td style={{ textAlign: "left" }}>
        Sum of value of the items matching the inventory attribute
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketSumRegex
      </td>

      <td style={{ textAlign: "left" }}>
        \`BigDecimal
      </td>

      <td style={{ textAlign: "left" }}>
        Sum of value of the items matching the inventory attribute - regular expression
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketQty
      </td>

      <td style={{ textAlign: "left" }}>
        BigDecimal
      </td>

      <td style={{ textAlign: "left" }}>
        Total quantity of items in the bill matching the inventory. For instance, if 2 items of a given line-item are bought, then the basket quantity is 2
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketQtyRegex
      </td>

      <td style={{ textAlign: "left" }}>
        BigDecimal
      </td>

      <td style={{ textAlign: "left" }}>
        Quantity of items in the bill matching the regular expression
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketcount
      </td>

      <td style={{ textAlign: "left" }}>
        int
      </td>

      <td style={{ textAlign: "left" }}>
        Number of products in the transaction of the given inventory type - irrespective of quantity
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketcountRegex
      </td>

      <td style={{ textAlign: "left" }}>
        int
      </td>

      <td style={{ textAlign: "left" }}>
        Number of products whose item attribute matches the given regular expression
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketIncludes
      </td>

      <td style={{ textAlign: "left" }}>
        Boolean
      </td>

      <td style={{ textAlign: "left" }}>
        Products contained in the transaction.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketExcludes
      </td>

      <td style={{ textAlign: "left" }}>
        Boolean
      </td>

      <td style={{ textAlign: "left" }}>
        Products not contained in the transaction
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketIncludesRegex
      </td>

      <td style={{ textAlign: "left" }}>
        Boolean
      </td>

      <td style={{ textAlign: "left" }}>
        If the bill includes products whose item attribute does not match the given regular expression
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketExcludesRegex
      </td>

      <td style={{ textAlign: "left" }}>
        Boolean
      </td>

      <td style={{ textAlign: "left" }}>
        If the bill does not include products whose item attribute does not match the given regular expression
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketSumIf
      </td>

      <td style={{ textAlign: "left" }}>
        BigDecimal
      </td>

      <td style={{ textAlign: "left" }}>
        Returns the sum of amount of line items (in basket) that satisfies a specific condition. You can define conditions based on the amount, discount, quantity, rate, or value of line items in the basket.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketCountIf
      </td>

      <td style={{ textAlign: "left" }}>
        BigDecimal
      </td>

      <td style={{ textAlign: "left" }}>
        Returns the count of line items of the basket that satisfies a specific condition. You can define condition based on the amount, discount, quantity, rate, or value of line items in the basket.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketQtyIf
      </td>

      <td style={{ textAlign: "left" }}>
        BigDecimal
      </td>

      <td style={{ textAlign: "left" }}>
        Return the sum of quantities of qualifying line items in the basket. The qualifying condition could be on the amount, discount, quantity, rate, or value of the line item.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketSize
      </td>

      <td style={{ textAlign: "left" }}>
        int
      </td>

      <td style={{ textAlign: "left" }}>
        Total number of items in the bill - irrespective of quantity of each item
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketSumGross
      </td>

      <td style={{ textAlign: "left" }}>
        BigDecimal
      </td>

      <td style={{ textAlign: "left" }}>
        Returns the sum of the gross amount of each line items in a basket whose attribute name matches with a specific value. Supported attribute names: product name, short description, SKU number, category, and subcategory.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        basketSumRegexGross
      </td>

      <td style={{ textAlign: "left" }}>
        BigDecimal
      </td>

      <td style={{ textAlign: "left" }}>
        Returns the sum of gross amount of each line item in the basket\
        whose product attribute values match the given regular expression.
      </td>
    </tr>
  </tbody>
</Table>

***

## **basketSum**

**Profile**: Current Transaction (currentTxn)\
**Data Type**: BigDecimal\
**Sub-Attributes**: Attribute Name and Inventory Value\
**Description**: sum of amount of all line items which are matching input inventory attribute and their inventory  attribute value matches exactly with input attribute value\
**Syntax: currentTxn.basketSum(“Attribute Name”,”Attribute Inventory Value”)\&#xA;**&#x45;xample :- currentTxn.basketSum("company\_code","PETRON"), this will give the sum of all the amount of petron products of company\_code inventory.

| Example 1: write a condition to check if the current transaction value for product “blue socks” exceeds 1000. |
| :------------------------------------------------------------------------------------------------------------ |
| currentTxn.basketSum(“Socks”,”Blue”)>1000                                                                     |

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 2 : “Buying Products of a Particular Brand”




        Suppose you want to issue coupons to customers who purchase products of a specific brand exceeding a certain transaction amount i.e 2000.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        To issue coupons for customers purchasing items of the Puma brand for more than 2000, use the following condition:
        Profile: currentTxn, Attribute:basketSum, Inventory Attribute Name: BrandName, Inventory Value: Puma, Transaction Value: 2000
        Syntax: currentTxn.basketSum(“Attribute Name”,”Inventory Attribute Value”)[operator][Value]
        **currentTxn.basketSum("BrandName","Puma")>2000**
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 3: As a marketing manager I want to allocate points based on basked Sum Value of a particular product category i.e shirting, if value exceeds 3000 but only to the customers who are in crosssale cluster and sub cluster value is solsuiting.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Rule :[Condition 1] AND [Condition 2]**  

        * \*Condition 1:\*\* basketSum value of product category i.e shirting should be greater than 3000
          Profile: currentTxn
          Attribute: basketSum
          Inventory Attribute name : Product Category
          Inventory Attribute Value: Shirting
          Condition1: currentTxn.basketSum(“Product Category”,”Shirting”)>3000
            
        * \*Condition 2 : \*\*Customer should belong to crosssale cluster and sub cluster value is solsuitting.
          Profile: currentCustomer
          Attribute : clusterValueIncludes
          Cluster Name:crosssale cluster
          Cluster Value:solsuitting.
          Condition2 : currentCustomer.clusterValueIncludes(“crosssale”,”solsuitting”)
            

        **Overall rule => currentCustomer.clusterValueIncludes(“crosssale”,”solsuitting”)&&(currentTxn.basketSum(“Product Category”,”Shirting”)>3000)**
      </td>
    </tr>
  </tbody>
</Table>

| Example 4: Write a rule for a customer transaction to check if the customer belongs to “diwali cluster: valueseeker16” and buy from the gents section with a sum value greater than 2999. |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currentCustomer.clusterValueIncludes("Diwali\_Cluster","valueseeker16")&&(currentTxn.basketSum("Section","GENTS")>2999                                                                    |

***

## **basketSumRegex**

**Profile**: Current Transaction (currentTxn)\
**Data Type**: BigDecimal\
**Sub-Attributes**: Attribute Name and Inventory Value\
**Description:** sum of the amount of all line items which are matching input inventory attribute and their inventory attribute value matches with input regex.\
**Syntax: currentTxn.basketSumRegex("Inventory Attribute Name","Inventory Attribute Regex")**\
**Example** :- currentTxn.basketSumRegex("company\_code","PET.\*")

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example1: Write an expression to check if the inventory commodities amount sum of the inventory attribute “SUMMER” and value “shirts”, “shorts”, is greater than 3000.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Transaction(currentTxn)
        Attribute: basketSumRegex
        Inventory Attribute Name: SUMMER
        Inventory Attribute Value : SHIRTS & SHORTS
        Inventory attribute matching Regex: “SH.\*”  

        Rule: currentTxn.basketSumRegex(“SUMMER”,”SH.\*”)
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example2: Write an expression to check if the current Transaction Value is less than 5000 and inventory items belonging to footwear, kids boy, kids girl, kids infant, ladies ethnic, ladies western,Mens ethnic, Mens Lower, Mens Upper is equal to or greater than 2999.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Transaction(currentTxn)
        Attribute: basketSumRegex
        Inventory Attribute Name: Division
        Inventory Attribute Value : FOOTWEAR|KIDS BOY|KIDS GIRL|KIDS GIRL|KIDS INFANT|LADIES ETHNIC|LADIES WESTERN|MENS ETHNIC|MENS LOWER|MENS UPPER  

        **Rule: currentTxn.value\<5000&&(currentTxn.basketSumRegex("Division","FOOTWEAR|KIDS BOY|KIDS GIRL|KIDS INFANT|LADIES ETHNIC|LADIES WESTERN|MENS ETHNIC|MENS LOWER|MENS UPPER"))>2999**
      </td>
    </tr>
  </tbody>
</Table>

***

## **basketQty**

**Profile**: Current Transaction (currentTxn)\
**Data Type**: BigDecimal\
**Sub-Attributes**: Attribute Name and Inventory Attribute Value\
**Description**: sum of quantity of all line items which are matching input inventory attribute and their inventory attribute value exactly matches with input attribute value.\
**Syntax: currentTxn.basketQty("Attribute Name","Attribute Value")\[OPERATORS]\[VALUE]**\
Example: currentTxn.basketQty("product","TROUSER")>=2

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write an expression to check if the count of product in the inventory is from attribute name : company_code and attribute value is PETRON, is greater than 6.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: currentTxn()
        Attribute: basketQty()
        Sub-Attribute: Attribute Name: Company\_code and Inventory Attribute Value: Petron  

        Example: currentTxn.basketQty(“company\_code”:”PETRON”)>6
      </td>
    </tr>
  </tbody>
</Table>

***

## **basketQtyRegex**

**Profile**: Current Transaction (currentTxn)\
**Data Type**: BigDecimal\
**Sub-Attributes:** Attribute Name and Inventory Attribute Value Regex.\
**Description:** sum of quantity of all line items which are matching input inventory attribute and their inventory attribute value matches with input regex.\
**Syntax: currentTxn.basketQtyRegex("Attribute Name","Attribute Value Regex")\[OPERATORS]\[VALUE]**\
**Example**: currentTxn.basketQtyRegex("product","TR.\*?")>=2

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write an expression to check if the count of product in the inventory is from attribute name : company_code and attribute value is SHIRT and SHORTS, is greater than 7.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: currentTxn()
        Attribute: basketQty()
        Sub-Attribute: Attribute Name: Company\_code and Inventory Attribute Value: Shirts and Shorts.
        Example: currentTxn.basketQty(“company\_code”:”SH.\*”)>6
      </td>
    </tr>
  </tbody>
</Table>

***

## **basketCount**

**Profile**: Current Transaction (currentTxn)\
**Data Type:** BigDecimal\
**Meaning:** count of line items from request payload which are matching input inventory attribute and their inventory attribute value matches exactly with input attribute value.\
**Sub-Attributes**: Attribute name and Attribute value\
**Syntax:** currentTxn.basketCount(“Attribute Name”,”Attribute Value”)\
**Example: currentTxn.basketCount(“Brand”,”Puma”)**

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a condition to check if the count of PUMA shoes in the transaction is equal to the total basket Size.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Profile: current Transaction (currentTxn)**
        Attribute: basketCount
        SubAttribute Name: PUMA
        SubAttribute Value: Shoes
        Condition2:
        Profile: currentTransaction
        Attribute: basketSize  

        **Rule: currentTxn.basketCount(“PUMA”,”Shoes”) == currentTxn.basketSize**
      </td>
    </tr>
  </tbody>
</Table>

| Example: Write a condition to check that the basket contains at least one product of “Trouser\_AW15” from “Product” Attribute and slab Number is greater than 1. |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rule: currentTxn.basketCount("product","Trouser\_AW15")>=1&&(currentCustomer.slabNumber>1)                                                                       |

***

## **basketIncludes**

**Profile**: Current Transaction (currentTxn)\
**Data Type**: BigDecimal\
**Output Type:** Boolean\
**Meaning:** return true if any line item matches input inventory attribute and their inventory attribute value matches exactly with input attribute value, basically it returns true if the line item contains a particular Product.\
**Sub-Attributes:** Inventory Attribute Name and Inventory Attribute Value.\
**Syntax: currentTxn.basketIncludes(“Attribute Name”,”Attribute Value”)**\
**Example:** currentTxn.basketIncludes(“Brand”,”Puma”)

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 1: Let’s say a transaction bill contains 3 items from a particular brand. For example a Tshirt, shoes and Cap from Sports Brand “Adidas”. Now we need to write a rule to check if the current Transaction bill contains the shoes from Adidas or not.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Condition:
        Profile: current Transaction (currentTxn)
        Attribute: basketIncludes
        SubAttribute Name: Adidas
        SubAttribute Value: Shoes
        Rule: currentCustomer.basketIncludes(“Attribute Name”,”Attribute Value”)
        **Example: currentCustomer.basketIncludes(“Adidas”,”Shoes”)**
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 2: Write a rule to check if the basket contains the product of a specific product code




        261010009/ 261010010 and excludes 261010006.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        (currentTxn.basketIncludes("MC\_CODE","261010009")||currentTxn.basketIncludes("MC\_CODE","261010010"))&&(currentTxn.basketExcludes("MC\_CODE","261010006"))
      </td>
    </tr>
  </tbody>
</Table>

| Example 3: Write a rule to check if the basket Includes “Shirts” and excludes “Women Trousers” from the inventory attribute name “Product” |
| :----------------------------------------------------------------------------------------------------------------------------------------- |
| currentTxn.basketIncludes("PRODUCT","Shirts")&&(currentTxn.basketExcludes("PRODUCT","WOMEN TROUSERS"))                                     |

***

## **basketExcludes**

**Profile**: Current Transaction (currentTxns)\
**Data Type:** BigDecimal\
**Output Type:** Boolean\
**Meaning:** return false if any lineitem matches input inventory attribute and their inventory attribute value matches with input regex or the bill does not include products whose item attribute does not match the given regular expression it returns False.\
**Sub-Attributes:** Inventory Attribute Name and Inventory Attribute Value.\
**Syntax:** currentTxn.basketExcludes(“Attribute Name”,”Attribute Value”)\
**Example:** currentTxn.basketExcludes("Jeans","Levis002")

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 1: Write a rule to check if the basket contains the product of a specific product code




        261010009/ 261010010 and excludes 261010006.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        (currentTxn.basketIncludes("MC\_CODE","261010009")||currentTxn.basketIncludes("MC\_CODE","261010010"))&&(currentTxn.basketExcludes("MC\_CODE","261010006")
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example2: Write a condition where the current Customer belongs to Adventure-seeker cluster from behavioral segments  and current transaction basket excludes Nike shoes and current transaction value is less than 5000.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Rule: Condition1 AND Condition2 AND Condition3
        (currentCustomer.clusterValueIncludes("Behavioral Segment","Adventure-seeker"))&&(currentTxn.basketExcludes("nike","shoes"))&&(currentTxn.value\<5000)
      </td>
    </tr>
  </tbody>
</Table>

***

## **basketSumIf**

**Profile**: Current Transaction (currentTxn)\
**Data Type:** BigDecimal

**Meaning**: Returns the sum of the amount of line items (in basket) that satisfies a specific condition. You can define conditions based on the amount, discount, quantity, rate, or value of line items in the basket. For example, sum of line items amount in the basket whose quantity is more than 2.

**Sub-Attributes:** AMOUNT, DISCOUNT, QUANTITY, RATE, and VALUE.

**Supported Operators:** GREATER\_THAN, LESS\_THAN, LESS\_THAN\_EQUALS\_TO, GREATER\_THAN\_EQUALS\_TO, EQUALS\_TO, NOT\_EQUALS\_TO

**Syntax: currentCustomer.basketSumIf(“\{Sub-Attribute}”, “\{expression}”,"\{value}")\[operator]\{value})**\
**Example : currentTxn.basketSumIf("DISCOUNT","GREATER\_THAN","10")>4**

Examples of Rules for basketSumIf() Attribute.

| Profile    | Attribute     | Sub-Attribute | Operator                  | Expression and Example                                                |
| :--------- | :------------ | :------------ | :------------------------ | :-------------------------------------------------------------------- |
| currentTxn | basketSumif() | AMOUNT        | GREATER\_THAN             | (currentTxn.basketSumIf("AMOUNT","GREATER\_THAN","1000")>5000))       |
| currentTxn | basketSumif() | DISCOUNT      | LESS\_THAN                | (currentTxn.basketSumIf("DISCOUNT","LESS\_THAN","10")>90))            |
| currentTxn | basketSumif() | QUANTITY      | LESS\_THAN\_EQUALS\_TO    | (currentTxn.basketSumIf("QUANTITY","LESS\_THAN\_EQUALS\_TO","10")>3)) |
| currentTxn | basketSumif() | RATE          | GREATER\_THAN\_EQUALS\_TO | (currentTxn.basketSumIf("RATE","GREATER\_THAN\_EQUALS\_TO","500")>7)) |
| currentTxn | basketSumif() | VALUE         | EQUALS\_TO                | (currentTxn.basketSumIf("VALUE","EQUALS\_TO","200")>400))             |

***

## **basketCountIf**

**Profile**: Current Transaction (currentTxn)\
**Data Type:** BigDecimal

**Meaning:** Returns the count of line items of the basket that satisfies a specific condition. You can define conditions based on the amount, discount, quantity, rate, or value of line items in the basket.

**Sub-Attributes:** AMOUNT, DISCOUNT, QUANTITY, RATE, and VALUE.\
**Supported EXPRESSION:** GREATER\_THAN, LESS\_THAN, LESS\_THAN\_EQUALS\_TO, GREATER\_THAN\_EQUALS\_TO, EQUALS\_TO, NOT\_EQUALS\_TO

**Syntax:** **currentTxn.basketCountIf(“\{parameter}”, “\{expression}”,"\{value}")\[operator]\{value})**\
Example :- currentTxn.basketCountIf("DISCOUNT","GREATER\_THAN","10")<5

| Profile    | Attribute       | Sub-Attribute | Operator                  | Expression and Example                                                  |
| :--------- | :-------------- | :------------ | :------------------------ | :---------------------------------------------------------------------- |
| currentTxn | basketCountif() | AMOUNT        | GREATER\_THAN             | (currentTxn.basketCountIf("AMOUNT","GREATER\_THAN","1000")>5))          |
| currentTxn | basketCountif() | DISCOUNT      | LESS\_THAN                | (currentTxn.basketCountIf("DISCOUNT","LESS\_THAN","10")>9))             |
| currentTxn | basketCountif() | QUANTITY      | LESS\_THAN\_EQUALS\_TO    | (currentTxn.basketCountIf("QUANTITY","LESS\_THAN\_EQUALS\_TO","10")>4)) |
| currentTxn | basketCountif() | RATE          | GREATER\_THAN\_EQUALS\_TO | (currentTxn.basketCountIf("RATE","GREATER\_THAN\_EQUALS\_TO","500")>4)) |
| currentTxn | basketCountif() | VALUE         | EQUALS\_TO                | (currentTxn.basketCountIf("VALUE","EQUALS\_TO","200")>3))               |

***

## **basketQtyIf**

**Profile**: Current Transaction (currentTxn)\
**Data Type**: BigDecimal\
**Meaning:** Return the sum of quantities of qualifying line items in the basket. The qualifying condition could be on the amount, discount, quantity, rate, or value of the line item.\
**For example,** quantity of all line items in the basket whose discount is less or equals to $10.\
currentTxn.basketQtyIf("DISCOUNT","LESS\_THAN\_EQUALS\_TO","10")>20

**Sub-Attributes:** AMOUNT, DISCOUNT, QUANTITY, RATE, and VALUE.\
**Supported EXPRESSION:** GREATER\_THAN, LESS\_THAN, LESS\_THAN\_EQUALS\_TO, GREATER\_THAN\_EQUALS\_TO, EQUALS\_TO, NOT\_EQUALS\_TO

**Syntax: currentTxn.basketCountIf(“\{parameter}”, “\{expression}”,"\{value}")\[operator]\{value})**\
Example :- currentTxn.basketCountIf("DISCOUNT","GREATER\_THAN","10")<5

| Profile    | Attribute     | Sub-Attribute | Operator                  | Expression and Example                                                |
| :--------- | :------------ | :------------ | :------------------------ | :-------------------------------------------------------------------- |
| currentTxn | basketQtyif() | AMOUNT        | GREATER\_THAN             | (currentTxn.basketQtyIf("AMOUNT","GREATER\_THAN","1000")>5))          |
| currentTxn | basketQtyif() | DISCOUNT      | LESS\_THAN                | (currentTxn.basketQtyIf("DISCOUNT","LESS\_THAN","10")>9))             |
| currentTxn | basketQtyif() | QUANTITY      | LESS\_THAN\_EQUALS\_TO    | (currentTxn.basketQtyIf("QUANTITY","LESS\_THAN\_EQUALS\_TO","10")>4)) |
| currentTxn | basketQtyif() | RATE          | GREATER\_THAN\_EQUALS\_TO | (currentTxn.basketQtyIf("RATE","GREATER\_THAN\_EQUALS\_TO","500")>4)) |
| currentTxn | basketQtyif() | VALUE         | EQUALS\_TO                | (currentTxn.basketQtyIf("VALUE","EQUALS\_TO","200")>3))               |

***

## **basketSumGross**

**Profile**: Current Transaction (currentTxn)\
**Data Type**: BigDecimal\
**Meaning**: Returns the sum of the gross amount of each line item in a basket whose attribute name matches with a specific value. Supported attribute names: product name, short description, SKU number, category, and subcategory.\
**Standard expression: currentTxn.basketSumGross\{("\[Attribute Name]","\[Inventory Value]")\[Operator]\[Value]}**

| Write an expression If the total gross amount of line items in the basket with attribute name value is "demoname", exceeds 2000, then execute a specific action. |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currentTxn.basketSumGross("name","demoname")>2000                                                                                                                |

***

## **basketSumRegexGross**

**Profile**: Current Transaction (currentTxn)\
**Data Type**: Boolean\
**Meaning:** Returns the sum of gross amount of each line item in the basket whose product attribute values match the given regular expression.

**Standard expression: currentTxn.basketSumRegexGross\{("\[Attribute Name]","\[Attribute Regex]") \[Operator] \[Value]}**

| Example: If the sum of the gross amount of line items of the basket, whose attribute name (brand) starts with purple, exceeds 5000 execute a specific action. |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Expression: currentTxn.basketSumRegexGross("brand","^purple")>5000                                                                                            |

***

## **basketSumRegexBrandGross**

**Profile**: Current Transaction (currentTxn)\
**Data Type:** Boolean\
**Meaning:** Returns the sum of the gross amount of each line item in the basket whose brand name matches with the given regular expression.

Standard expression: **currentTxn.basketSumRegexCategoryGross\{("\[Regex]")\[Operator]\[Value]}**

| Example:If the sum of the gross amount of line items of the basket with brand names containing “demo” exceeds 1000 execute a specific action. |
| :-------------------------------------------------------------------------------------------------------------------------------------------- |
| currentTxn.basketSumRegexCategoryGross("demo\*")>1000                                                                                         |

## **basketSize**

**Profile** : currentTxn\
**Attribute :** basketSize\
**Type** : String\
**Meaning** : Total number of items in the bill - irrespective of quantity of each item or number of line items passed in payload\
**Sub-Attribute**: NA\
**Operators:** <,>,<=,>=,==\
**Syntax**: currentTxn.basketSize.\[Operators]\[Value]\
**Example**: currentTxn.basketSize >= 10.

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: write a rule for a current customer to check if the customer is a part of “CrownFeb2019” cluster and speaks English (sub segment) and current transaction done by the customer has line item count is less than 10.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Rule: condition 1 && condition 2
        currentCustomer.clusterValueIncludes("CrownFeb2019","English")&&(currentTxn.basketSize\<10)
      </td>
    </tr>
  </tbody>
</Table>