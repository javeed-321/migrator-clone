---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attribute - Line Item Information

## **Code**

**Profile:** CurrentLineItem (Current Line Item)\
**Data Type:** Integer/ Alphanumeric\
**Sub-Attribute:** NA\
**Operators :** contains, exists, isEmpty, isNotNull, isNull, matches, and notExists.\
**Numerical Operator :** “=,==”\
**Description:** Item code of the line-item as assigned in the inventory.\
**Syntax: currentLineItem.code\[Operators]\[Value]**\
Example : currentLineItem.code==“20170207120113”

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule to check if the items listed in the basket have an item with code 9989.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: currentLineItem
        Attribute: code
        Output type : Boolean
        Rule: currentLineItem.code==”9989”
      </td>
    </tr>
  </tbody>
</Table>

| Example: Write a condition to check if the line item code is not equals to 2. |
| :---------------------------------------------------------------------------- |
| Rule: currentLineItem.code!="2"                                               |

| Example: As a marketing manager, I want to reward points to the customer who is buying specific products with a code 10010 or 10008. Write a condition to check if the lineItem is eligible for the point allocation. |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rule: currentLineItem.code=="10010"\|\|currentLineItem.code=="10008"                                                                                                                                                  |

| Example: Write a condition to check if the transaction has any lineitem whose products belongs to a specific code series PNR123 |
| :------------------------------------------------------------------------------------------------------------------------------ |
| Rule: currentLineItem.code.contains(“PNR123”)                                                                                   |

***

## **description**

**Profile:** CurrentLineItem (Current Line Item)\
**Attribute:** Description\
**Data Type:** String\
**Sub-Attribute:** NA\
**Operators :** contains, exists, isEmpty, isNotNull, isNull, matches, and notExists.\
**Description:** The description specified for the line-item in the inventory, passed in the payloads.\
**Syntax: currentLineItem.description\[Operator]\[Value]**\
**Example :** currentLineItem.description.contains("Carry Bag -Re-usable")

| Example: Write a condition to check if the LineItem Description is Not Null. |
| :--------------------------------------------------------------------------- |
| Rule: currentLineItem.description.isNotNull()                                |

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a condition to check if the lineItem Description is not null and contains a word “Saree” and write a condition if transaction value is greater than 4999.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Rule: (condition 1 && condition 2)&& condition(3)
        Condition 1 and Condition 2
        Profile: currentLineItem
        Attribute: description
        Operator: isNotNull()
        Condition3
        Profile: currentTransaction (currentTxn)
        Attribute: description
        Operator: >
        **Rule: ((currentLineItem.description.isNotNull() && currentLineItem.description.contains("SAREES")) && (currentTxn.value > 4999))**
      </td>
    </tr>
  </tbody>
</Table>

| Example: As a Marketing Manager, write a condition to check if the line items description is not null and does not contain any description related in DIAMOND, COIN, PACKET, BULLION.                                                                                                                      |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rule : ((((currentLineItem.description.isNotNull() && (currentLineItem.description.contains("DIAMOND") == false)) && (currentLineItem.description.contains("COIN") == false)) && (currentLineItem.description.contains("PACKET") == false)) && (currentLineItem.description.contains("BULLION") == false)) |

***

## **doesItemMatch()**

**Profile:** CurrentLineItem (Current Line Item)\
**Attribute:** doesItemMatch()\
**Data Type:** Boolean\
**Sub-Attribute:** custom field Name and custom Field Value.\
**Description:** Check if a code matches with the given code, so basically lets say the transaction bill has a column of product category and size too.

**Syntax: currentLineItem.doesItemMatch(“custom field Name”,”custom field Value”)**\
Example : (currentLineItem.doesItemMatch("Shirt","L”))

| Example: As a marketing manager I want to provide an offer if a customer is buying a Diamond from a specific category i.e Studded or Loose Diamonds. |
| :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax: currentLineItem.doesItemMatch(“Diamond”,”STUDDED”)\|\|currentLineItem.doesItemMatch(“Diamond”,”Loose Diamonds”)                              |

| Example: Write an expression to check if the Transaction bill consists of line Item with (No description and Zero discount ) and Line items with discount value greater than 0 and the cart consist of Product category consist of an item called Procco-gift card. |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Rule: ((currentLineItem.description=="N")&&(currentTxn.discount==0))&&(currentLineItem.discount>0)&&(currentLineItem.doesItemMatch("Product","Procco - Gift Card"))                                                                                                 |

| Example: Write an Expression to check if the line item matches with the custom field: Product Category and the custom field Value: shoes. |
| :---------------------------------------------------------------------------------------------------------------------------------------- |
| Rule: currentLineItem.doesItemMatch(“Product Category”,”SHOES”)                                                                           |