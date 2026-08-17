---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attributes - Customer Identity

## **Attributes on Customer Name**

**String Operators widely used with name attributes**

The basic range of string operations serves to resolve the string attribute into a boolean outcome. These operators are inserted after the string attribute using the (.) notation e.g. currentCustomer.email.contains(".com")

| Operator  | Definition                                                                                         |
| :-------- | :------------------------------------------------------------------------------------------------- |
| contains  | Used to see if the string contains the defined value                                               |
| Matches   | This is used to perform regular expression-based matching on the string                            |
| Exists    | Some proper value exists for this string (i.e. source passed a value that was not an empty string) |
| notExists | The string is either Null or Empty                                                                 |
| isNull    | checks if the string is Null i.e. it was not passed from the source                                |
| isNotNull | checks if the string is NOT Null                                                                   |

## **Name**

**Profile: currentCustomer\
Attribute:** name\
**Meaning:** Customer's Full Name \[ name = firstName + " " + lastName ]**\
Type:** String **\
Sub-Attribute :**&#x4E;A \*\*\
Format: currentCustomer.\[(Attribute).(Sub Attribute)].\[ Operators]\[VALUE]\*\*\&#xA;\*\**Syntax : currentCustomer.name\[Operator]\[Value]*

| Profile         | Attributes | Sub- Attributes | Operator | Example                                      |
| :-------------- | :--------- | :-------------- | :------- | :------------------------------------------- |
| currentCustomer | Name       | NA              | contains | currentCustomer.name.contains("akhil reddy") |
| currentCustomer | Name       | NA              | matches  | currentCustomer.name.matches("sak")          |
| currentCustomer | Name       | NA              | ==       | currentCustomer.name == "tripti"             |

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
        Write an Expression to check if the customer name has substring “nar”.
        Expression: ***currentCustomer.name.matches(“naresh silla”)*  **&#xA;Here, Profile -> currentCustomer
                  Attribute -> name
                  Sub Attributes -> NA
                  String Operators -> matches
                  Value -> naresh silla
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 2
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Write an Expression to check if the customer name is “Santosh kumar”
        Expression: **currentCustomer.contains("Santosh kumar")**
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 3
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Write an Expression to check if the customer name contains “shreya”
        Expression: ***currentCustomer.name.contains==“Shreya”***
      </td>
    </tr>
  </tbody>
</Table>

## **First Name & Last Name**

**Profile: currentCustomer\
Attribute:** firstName\
**Meaning:** Customer's First Name \[ name = firstName ]\
**Attribute :** lastName\
**Meaning:** Customer's Last Name \[name = " "+lastName]\
Type: String\
Sub-Attribute : NA

Format: currentCustomer.\[(Attribute).(Sub Attribute)].\[ Operators ]\[VALUE]\
Syntax for First Name Attribute: ***currentCustomer.firstname\[Operator]\[Value]***\
Syntax for last Name Attribute : ***currentCustomer.lastname\[Operator]\[Value]***

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
        Example 1: Write an Expression to check if the customer name has the substring “nar”.
        Expression: **currentCustomer.firstname.matches(“nar”)**
        Here, Profile -> currentCustomer
                  Attribute -> name
                  Sub Attributes -> NA
                  String Operators -> matches
                  Value -> nar
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 2:
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Write an Expression to check if the customer name is “Santosh kumar”
        Expression: **currentCustomer.firstname.contains("Santosh")**
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example 3:
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Write an Expression to check if the customer last name contains “desai”
        Expression: **currentCustomer.lastname==“ desai”**)\*
      </td>
    </tr>
  </tbody>
</Table>

***

## **Email**

**Profile :** currentCustomer\
**Attribute :** Email\
**Type :** String\
**Sub-Attributes :** NA\
**Operator:** contains, exists, isEmpty, isNotNull, isNull, matches, notExists, “==”\
**Meaning :** Customer's email id or checks which organization is in the email of Customer **\
Syntax : currentCustomer.email\[Operators]\[Value]\*\***

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        SubAttribute
      </th>

      <th>
        Operator
      </th>

      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        email
      </td>

      <td>
        NA
      </td>

      <td>
        contains
      </td>

      <td>
        Contains - used to see if the string contains the defined value.\
        Example:**currentCustomer.email.contains("ashish.chelikani")**
      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        NA
      </td>

      <td>
        exists
      </td>

      <td>
        Exists - Some proper value exists for this string (i.e. source passed a value that was not an empty string)\
        **currentCustomer.email.exists()**
      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        NA
      </td>

      <td>
        isEmpty
      </td>

      <td>
        isEmpty - Similar to notExists\
        **currentCustomer.email.isEmpty(“”)**
      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        NA
      </td>

      <td>
        isNotNull
      </td>

      <td>
        isNotNull - checks if the the string is NOT Null i.e. some value was passed from is equal to 1source (even an empty string counts)\
        **currentCustomer.email.isNotNull(“”)**
      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        NA
      </td>

      <td>
        isNull
      </td>

      <td>
        isNull - checks if the string is Null i.e. it was not passed from source\
        **currentCustomer.email.isNull(“”)**
      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        NA
      </td>

      <td>
        notExists
      </td>

      <td>
        notExists - The string is either Null or Empty
      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        NA
      </td>

      <td>
        \==
      </td>

      <td>
        ( == ) returns true if both operands have the same value; otherwise, it returns false . The not-equal-to operator ( != ) returns true if the operands don't have the same value; otherwise, it returns false .\
        **currentCustomer.email=="[shoa17783@gmail.com](mailto:shoa17783@gmail.com)"**
      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        NA
      </td>

      <td>
        matches
      </td>

      <td>
        Matches - this is used to perform regular expression-based matching on the string.\
        **currentCustomer.email.matches("[santosh@tech.com](mailto:santosh@tech.com)")**
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a condition to check if the customer email contains the string “SHR”
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Customer
        Attribute: Email
        Sub-Attribute: NA
        Operator: contains
        **Rule: currentCustomer.email.contains(“SHR”)**
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule to check if the current customer number of visits is equals to 1 and current customer email is not null.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Customer
        Attribute: numberOfVisits and email
        Operator : == & isNotNull
        **Rule: currentCustomer.numberOfVisits==1&&(currentCustomer.email.is.NotNull(“”))**
      </td>
    </tr>
  </tbody>
</Table>

***

## **External ID (externalId)**

**Profile :** currentCustomer\
**Attribute :** externalId\
**Type :** integer/Alphanumeric\
**Sub-Attributes :** NA\
**Operator:** contains, exists, isEmpty, isNotNull, isNull, matches,notExists, “==”\
**Meaning :** Lets say to issue coupons to customers whose external ID contains a certain serial numbers (say 1234), use the following condition: customerCustomer.externalId.contains("1234")\
**Syntax : currentCustomer.externalId\[Operators]\[Value]**

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Profile
      </th>

      <th>
        Attribute
      </th>

      <th>
        Sub-Attribute
      </th>

      <th>
        Operator
      </th>

      <th>
        Meaning
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        currentCustomer
      </td>

      <td>
        externalId
      </td>

      <td>
        NA
      </td>

      <td>
        contains
      </td>

      <td>
        Contains - used to see if the string contains the defined value\
        Example: currentCustomer.externalId.contains("")
      </td>
    </tr>

    <tr>
      <td>
        currentCustomer
      </td>

      <td>
        externalId
      </td>

      <td>
        NA
      </td>

      <td>
        exists
      </td>

      <td>
        Exists - Some proper value exists for this string (i.e. source passed a value that was not an empty string)\
        currentCustomer.externalId.exists()
      </td>
    </tr>

    <tr>
      <td>
        currentCustomer
      </td>

      <td>
        externalId
      </td>

      <td>
        NA
      </td>

      <td>
        isEmpty
      </td>

      <td>
        isEmpty - Similar to notExists\
        currentCustomer.externalId.isEmpty(“”)
      </td>
    </tr>

    <tr>
      <td>
        currentCustomer
      </td>

      <td>
        externalId
      </td>

      <td>
        NA
      </td>

      <td>
        isNotNull
      </td>

      <td>
        isNotNull - checks if the the string is NOT Null i.e. some value was passed from source (even an empty string counts)\
        currentCustomer.externalId.isNotNull(“”)
      </td>
    </tr>

    <tr>
      <td>
        currentCustomer
      </td>

      <td>
        externalId
      </td>

      <td>
        NA
      </td>

      <td>
        isNull
      </td>

      <td>
        isNull - checks if the string is Null i.e. it was not passed from source\
        currentCustomer.externalId.isNull()
      </td>
    </tr>

    <tr>
      <td>
        currentCustomer
      </td>

      <td>
        externalId
      </td>

      <td>
        NA
      </td>

      <td>
        notExists
      </td>

      <td>
        notExists - The string is either Null or Empty
      </td>
    </tr>

    <tr>
      <td>
        currentCustomer
      </td>

      <td>
        externalId
      </td>

      <td>
        NA
      </td>

      <td>
        \==
      </td>

      <td>
        ( == ) returns true if both operands have the same value; otherwise, it returns false . The not-equal-to operator ( != ) returns true if the operands don't have the same value; otherwise, it returns false .\
        currentCustomer.externalID=="17783"\
        currentCustomer.externalId!=""
      </td>
    </tr>

    <tr>
      <td>
        currentCustomer
      </td>

      <td>
        externalId
      </td>

      <td>
        NA
      </td>

      <td>
        matches
      </td>

      <td>
        Matches - this is used to perform regular expression based matching on the string.\
        currentCustomer.internalId.matches("abc1223")
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule to check if the current customer number of visits is equals to 1 and current customer externalId is not null.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Customer
        Attribute: numberOfVisits and externalId
        Operator : == & isNotNull
        Rule: **currentCustomer.numberOfVisits==1&&(currentCustomer.externalId.NotNull(“”))**
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule to check if the current customer contains a string “TRN13”
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Customer
        Attribute: externalId
        Operator : contains()
        Rule: **currentCustomer.externalId.contains(“TRN13”)**
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule to check if the current customer externalID exists
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Customer
        Attribute: externalId
        Operator : exists()
        Rule: **currentCustomer.externalId.exists()**
      </td>
    </tr>
  </tbody>
</Table>

***

## **Mobile**

**Profile :** currentCustomer\
**Attribute :** mobile\
**Type :** integer\
**Meaning :** Mobile number of a customer.\
**Sub-Attribute:** NA\
**Operators:** contains, exists, isEmpty, isNotNull, isNull, matches,notExists, “==”\
**Syntax:** currentCustomer.mobile.\[Operators]\[Value]

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule to check if the mobile number of the current customer contains 98939756.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Customer
        Attribute: mobile
        Operator : contains()
        Rule: currentCustomer.mobile.contains(“98939756”)
      </td>
    </tr>
  </tbody>
</Table>

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: write a rule to check if the current customer's mobile number exists.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
         Profile: Current Customer
        Attribute: mobile
        Operator : exists
        Rule: currentCustomer.mobile.exists()
      </td>
    </tr>
  </tbody>
</Table>

***

## **hasInstoreProfile**

**Profile :** currentCustomer\
**Attribute :** hasInstoreProfile\
**Type :** Boolean\
**Meaning :** returns True, if the current customer is registered and has a instore Profile\
**Sub-Attribute:** NA\
**Syntax:** currentCustomer.hasInstoreProfile()\
**Example: currentCustomer.hasInstoreProfile==true**

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: write a rule to check if the current has a Instore Profile
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Customer
        Attribute: hasInstoreProfile
        Type: Boolean
        Rule: currentCustomer.hasinstoreProfile()
      </td>
    </tr>
  </tbody>
</Table>

***

## **hasWeChatProfile**

**Profile :** currentCustomer\
**Attribute :** hasWeChatProfile\
**Type :** Boolean\
**Meaning :** returns True, if the current customer has a WeChat Profile\
**Sub-Attribute:** **NA\
Syntax: currentCustomer.hasWeChatProfile()\*\***

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: write a rule to check if the current has a Instore Profile
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: Current Customer
        Attribute: hasWeChatProfile
        Type: Boolean
        Rule: currentCustomer.hasWeChatProfile()
      </td>
    </tr>
  </tbody>
</Table>