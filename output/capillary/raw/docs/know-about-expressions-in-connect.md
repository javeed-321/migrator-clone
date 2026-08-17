---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Using  expressions for data transformation

This page provides you with information on expressions that you can use in Connect+ actions.

Connect+ uses two kinds of expressions: [spelExpression](https://docs.spring.io/spring-framework/docs/3.0.x/reference/expressions.html) for the transformation block and\
[NiFi expression](https://nifi.apache.org/docs/nifi-docs/html/expression-language-guide.html)  for other fields.

# Creating expression

The table below provides sample expressions along with additional information to assist you in understanding and creating new expressions as needed.

## Arithmetic expressions

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Supported Operators
      </th>

      <th>
        Expression Format
      </th>

      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        *

        -
        - /
      </td>

      <td>
        exp\{hdr\{header 1} [operator] hdr\{header 2}}  

        * \*Note:\*\* Ensure that the braces are matched properly (opened and closed).
      </td>

      <td>
        Example 1: Calculate net amount  

        Headers: LineItem\_Amount, LineItem\_Discount  

        Expression: exp\{hdr\{LineItem\_Amount} - hdr\{LineItem\_Discount}}
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>

      </td>

      <td>
        Example 2: Calculate net amount based on quantity  

        Headers: LineItem\_Amount, Quantity  

        Expression: exp\{hdr\{LineItem\_Amount} \* hdr\{Quantity}}
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>

      </td>

      <td>
        Example 3: Currency conversion (INR to USD)  

        Headers: LineItem\_Amount  

        Expression: exp\{hdr\{LineItem\_Amount} / 74}
      </td>
    </tr>
  </tbody>
</Table>

## String operations

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Supported Operators
      </th>

      <th>
        Expression Format
      </th>

      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        startsWith
        endsWith
        concat
        substring
      </td>

      <td>
        exp\{string expression1.concat(string expression2)}
      </td>

      <td>
        Example 1: Concatenate headers for description  

        Headers: Item\_Name, Item\_Purpose  

        Expression: exp\{hdr\{Item\_Name}.concat(hdr\{Item\_Purpose})}
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>

      </td>

      <td>
        Example 2: Concatenate headers with fixed info for item  

        Headers: Item\_Name, Item\_Purpose  

        Expression: exp\{hdr\{Item\_Name}.concat(' is used for ').concat(hdr\{Item\_Purpose})}
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>

      </td>

      <td>
        Example 3: Remove '+' prefix from mobile number  

        Headers: Mobile\_No  

        Expression: exp\{('hdr\{Mobile\_No}'.startsWith('+')) ? 'hdr\{Mobile\_No}'.substring(1) : 'hdr\{Mobile\_No}'}
      </td>
    </tr>
  </tbody>
</Table>

## Conditional Operations

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Operator
      </th>

      <th>
        Expression Format
      </th>

      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        ? :
      </td>

      <td>
        exp\{(conditional expression) ? expression1 : expression2}
      </td>

      <td>
        Example 1: Add country code +91 to the mobile number if the length of the number is 10, otherwise return the existing value.  

        Headers: Mobile\_No  

        Expression:  exp\{('hdr\{Mobile\_No}'.length() == 10) ? '+91'.concat('hdr\{Mobile\_No}') : 'hdr\{Mobile\_No}' }
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>

      </td>

      <td>
        Example 2: Check if an item is returned. If yes, set transaction type value as 'RETURN' else  set it to 'REGULAR'.  

        Headers: Is\_Returned (Possible values 'true' / 'false')  

        Expression: exp\{ ('yes'.equalsIgnoreCase('hdr\{Is\_Returned}')) ? 'RETURN' : 'REGULAR' }
      </td>
    </tr>
  </tbody>
</Table>

## Complex expressions

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
         Scenario: Calculating non-fractional qualified quantity based on product category  

        Description: In this scenario, we want to compute the qualified quantity based on the product category. If the product category is one of FUEL, JEWEL, or METAL, then the qualified quantity is determined by taking the difference between LineItem\_Amount and LineItem\_Discount and dividing it by LineItem\_Rate. However, if the product category falls outside of these categories, the qualified quantity defaults to LineItem\_Qty.  

        Headers: Product\_Category, LineItem\_Discount, LineItem\_Amount, LineItem\_Rate, LineItem\_Qty  

        Expression:
        exp\{ (\{'FUEL','JEWEL','METAL'}.contains('hdr\{Product\_Category}') ) ? T(Math).floor( (hdr\{LineItem\_Amount} - hdr\{LineItem\_Discount}) / hdr\{LineItem\_Rate}) : T(Math).floor(hdr\{LineItem\_Qty}) }  

        This expression employs conditional logic to ensure accurate calculation of the qualified quantity based on the specified conditions and input data.
      </td>
    </tr>
  </tbody>
</Table>

#

# Using SpEL expressions in data transformation

In the data transformation block, you can use expressions for the following:

* [Filtering data](https://docs.capillarytech.com/docs/know-about-expressions-in-connect#filtering-data)
* [Mapping attribution identifier type](https://docs.capillarytech.com/docs/know-about-expressions-in-connect#mapping-attribution-identifier-type)
* [Mapping header that has consistent values](https://docs.capillarytech.com/docs/know-about-expressions-in-connect#mapping-header-that-has-consistent-values)

## Filtering data

You can use filter expression to filter the data that needs to be processed.

Consider a transaction dataflow that includes a **Financial status** header with values such as paid, refunded, or not paid.

<Image align="center" className="border" border={true} src="https://files.readme.io/1d86b69-Financial_status.png" />

To exclusively process dataflow for transactions that are either paid or not paid, in the Transformation block, you can use the filter expression `${header_value:equals('paid'):or(${header_value:equals('not paid')})}` . This expression should be entered in the **Filter tab** within the **transformation** text box.

<Image align="center" className="border" border={true} src="https://files.readme.io/4c28e6f-Filter_data.png" />

## Mapping attribution identifier type

Every transaction or customer addition is linked to a specific store or till. The details of these stores or tills are configured in the attribution block. Here, you have the flexibility to use expressions to define constant values for the identifier type.

For example, consider the scenario of a customer addition dataflow and the store code information is found under the 'SC\_NUMBER' column in the source file. Here, you would set the identifierType as 'STORE\_CODE' and map the identifierValue to the 'SC\_NUMBER' column.

<Image align="center" className="border" border={true} src="https://files.readme.io/390e3be-Identifier_type.png" />

In this case, use the expression const\{STORE\_CODE} in the identifierType field and specify 'SC\_NUMBER' as the identifierValue. This setup ensures that the attribution of 'STORE CODE' is consistently associated with the 'SC\_NUMBER' column in your data.

<Image align="center" className="border" border={true} src="https://files.readme.io/64b86b9-Attribution.png" />

## Mapping header that has consistent values

Consider a scenario where you're adding transaction data using the "add transaction dataflow," and all the transactions share the same currency code, INR. The challenge here is that there's no specific header column in the source file indicating the currency code; instead, this information was conveyed via email.

In this situation, you can map the header to the API field by performing the following:

1. Add a new column to your source file with the header "Currency Code".
2. Populate this new column with the value "INR" for all transactions.
3. Map this "Transaction Type" header to the API field **currencyCode**.

This way, you explicitly specify that the currency code for all transactions is INR. However, there's a more efficient way to achieve this using an expression.

### Simplify with expressions

You can streamline this process by using the expression const\{INR} in the API field **currencyCode**. This expression communicates that the value for the API field **currencyCode** is consistently "INR" for all transaction data. This approach eliminates the need for additional columns and simplifies the mapping process.

<Image align="center" className="border" border={true} src="https://files.readme.io/5c2e0d3-Expression_for_consistent_values.png" />

# Avoiding common errors in expression

The examples below can help you to avoid errors when working with the MVEL expressions.

| Challenge            | Issue                                                     | Solution                                                                        | Example                                                                     |
| :------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------- |
| Syntax errors        | Incorrect syntax can lead to parsing errors.              | Ensure correct syntax with proper placement of brackets, quotes, and operators. | `exp{'hdr{to_change}'.equals('1')}`                                         |
| Variable scope       | Referencing variables outside their scope can be risky.   | Declare and access variables within the appropriate scope.                      | `exp{var1 = 'Hello'}` followed by `exp{var2 = hdr{to_change}.equals(var1)}` |
| Null handling        | Mishandling null values can lead to errors.               | Use null-safe operators to handle potential null values.                        | `exp{hdr{to_change} != null && hdr{to_change}.equals('1')}`                 |
| Property access      | Incorrect property access syntax can cause issues.        | Access properties with the correct syntax, such as `hdr['to_change']`.          | N/A                                                                         |
| Function calls       | Improper usage of function calls can lead to errors.      | Follow the correct function call syntax with parentheses and parameters.        | `exp{toUpperCase('hello')}`                                                 |
| String concatenation | Incorrect string concatenation syntax can be problematic. | Use the '+' operator for string concatenation.                                  | `exp{'Hello ' + 'world'}`                                                   |
| Operator precedence  | Incorrect operator order can yield unexpected results.    | Use parentheses to control the order of evaluation.                             | `exp{(1 + 2) * 3}`                                                          |
| Type conversion      | Mismatched data types can cause issues.                   | Ensure data types match or perform conversions when needed.                     | `exp{Integer.parseInt(hdr{to_change}) == 1}`                                |
| Collection handling  | Mishandling collections can result in errors.             | Understand collection operations, including indexing.                           | `exp{myList[0]}`                                                            |
| Complex expressions  | Overcomplicated expressions can hinder readability.       | Keep expressions concise and organized.                                         | \`exp\{(a && b                                                              |