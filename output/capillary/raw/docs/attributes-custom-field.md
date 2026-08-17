---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attributes - Custom Field

# Profile - currentCustomer()

1. **Profile: currentCustomer :** Allows you to write conditions based on the properties of the customer who is currently performing the activity.
2. **Custom Fields :** Custom fields are columns that store special or custom information related to customers, transactions, transaction line-items, coupons, category and so on.

The following are different entries for which you can create custom fields.

1. Loyalty registration
2. Loyalty transaction
3. Customer feedback
4. Zone custom fields
5. Store custom fields
6. Points redemption
7. Voucher redemption (coupon redemption)
8. Customer advanced feedback
9. Customer preferences
10. Customer Card\
    To know how to create a Custom Fields, [click here](https://docs.capillarytech.com/docs/data-fields#create-new-custom-fields)

**Attributes :** Attributes based on Custom Fields for Customer profile are listed below in the table.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Data Type
      </th>

      <th>
        Description
      </th>

      <th>
        Sub-Attributes
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        customFieldValueIncludes
      </td>

      <td>
        boolean
      </td>

      <td>
        checks If customer has some custom field present with particular value
      </td>

      <td>
        Sub-Attributes 1: custom Field Name\
        Sub-Attributes 2: Value of custom field
      </td>
    </tr>

    <tr>
      <td>
        customFieldValueExists
      </td>

      <td>
        boolean
      </td>

      <td>
        checks If customer has some custom field present
      </td>

      <td>
        Sub-Attribute 1: Custom field Value
      </td>
    </tr>

    <tr>
      <td>
        customFieldValueExcludes
      </td>

      <td>
        boolean
      </td>

      <td>
        checks If customer has some custom field is not present with particular value
      </td>

      <td>
        Sub-Attributes 1: custom Field Name\
        Sub-Attributes 2: Value of custom field
      </td>
    </tr>
  </tbody>
</Table>

## **customFieldValueIncludes**

**Profile : currentCustomer**\
**Attribute:** customFieldValueIncludes\
**Data Type :** Boolean\
**Description :** checks If the customer has some custom field present with a particular value.\
**Sub-Attributes:** Custom Field Name, Custom Field Value\
**Syntax: currentCustomer.customFieldValueIncludes(“custom\_field\_name”,”custom\_field\_value”)**

| Example 1: Lets see we have created a custom field by the name of cities and value includes delhi, Indore, bangalore etc. Now a marketing manager wants to provide incentive to those customers who are from bangalore. |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The rule : currentCustomer.customFieldValueExcludes("cities","Bangalore")                                                                                                                                               |

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 2: Suppose the college team in your city has won a major championship and you want to celebrate the event by offering discounts to customers who had included that sport as their favorite.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        To issue coupons to customers who had included SportX as their favorite, use the following condition:
        **currentCustomer.customFieldValueIncludes("Favorite\_Sport","SportX")**
        If the value returned is SportX, then the coupon is issued.
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 3: A marketing Manager of a corporate gifting company wanted to select the customers from selected companies to send the communication of the latest festival offers.







        Custom field name : corporate




        Custom field value : KPMG, Magnus India,Polaris, Time of India,RENAISSANCE, Epicenter Technology, Capillary, "NESS TECHNOLOGIES".




        Out of all the values, they want to send communication to KPMG, CAPILLARY, TOI
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Rule: currentCustomer.customFieldValueIncludes(“corporate”,”KPMG”)||currentCustomer.customFieldValueIncludes(“corporate”,”TOI”)||currentCustomer.customFieldValueIncludes(“corporate”,”capillary”)
      </td>
    </tr>
  </tbody>
</Table>

| Another: rule to check if customer age is between 25-40 or 40-90 and gender is Male and current transaction basket contains POLO and number of transactions done is greater than 1.                                                                                      |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (currentCustomer.customFieldValueIncludes("age","25-40")\|\|currentCustomer.customFieldValueIncludes("age","40-90"))&&(currentCustomer.customFieldValueIncludes("gender","Male"))&&(currentTxn.basketIncludes("Producttype","polo"))&&(currentCustomer.numberOfVisits>1) |

***

## **customFieldValueExcludes**

**Profile : currentCustomer**\
**Attribute :** customFieldValueExcludes **\
Data Type:** Boolean\
**Description :** checks If customers do not have some custom field present with a particular value.\
**Sub-Attributes:** Custom Field Name, Custom Field Value\
**Syntax: currentCustomer.customFieldValueExcludes(“custom\_field\_name”,”custom\_field\_value”)**

| Example: As a marketing manager I want to check if the customer is from homeclub\_number and value 12 or 11.                           |
| :------------------------------------------------------------------------------------------------------------------------------------- |
| currentCustomer.customFieldValueExcludes("homeclub\_number","12")\|\|currentCustomer.customFieldValueExcludes("homeclub\_number","11") |

| Example: write a rule to evaluate a current customer credit\_customer field value is 1 and current slab name is homeclubMember and number of transactions made till now is 1 and the current transaction basket includes Tablets, from category\_descriptions custom field. |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currentCustomer.customFieldValueExcludes("credit\_customer","1")&&(currentCustomer.slabName=="HomeClub Member"&&(currentCustomer.numberOfVisits==1)&&((currentTxn.basketIncludes("Category\_Description","Tablets"))                                                        |

| Example: Write an expression to evaluate that current customer, DVS custom field value is Home lovers and preferred language is not Arabic. |
| :------------------------------------------------------------------------------------------------------------------------------------------ |
| currentCustomer.clusterValueIncludes("DVS","Home Lovers")&&(currentCustomer.customFieldValueExcludes("preferredlanguage","Arabic"))         |

***

## **customFieldValueExists**

**Profile : currentCustomer**\
**Attribute :** customFieldValueExists\
**Data Type :** Boolean\
**Description :** checks If the customer has some custom field present\
**Sub-Attributes:** Custom Field Name\
**Syntax: currentCustomer.customFieldValueExists(“custom\_field\_name”,”custom\_field\_value**”)

| Example: Write a rule to check if current customer has a custom field by the name billdelayed. |
| :--------------------------------------------------------------------------------------------- |
| currentCustomer.customFieldValueExists(“billdelayed”)                                          |