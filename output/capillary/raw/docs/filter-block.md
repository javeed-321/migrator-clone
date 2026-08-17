---
updatedAt: 2026-04-22T05:31:12.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Filter block

The `filter_on_condition` block passes only the records that meet a defined condition to downstream blocks. It acts as a transformation block in a Connect+ dataflow, evaluating each record against the condition. Records that meet the condition move to the next block; all others are dropped. Write conditions using the `${field:function(value)} `syntax.

## When to use this block

Use this block when you want to process only a specific subset of records. For example:

* Pass only transactions where `status` is `paid`
* Pass only customers where `source` is `INSTORE`
* Pass only records where `loyaltyType` is `loyalty`

## Prerequisites

Before configuring this block, make sure you have:

* Identified the header field and value to filter on
* Familiarity with JSON expression language syntax

## Configuration fields

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field name
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Block name**
      </td>

      <td>
        Yes
      </td>

      <td>
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **Filter Condition**
      </td>

      <td>
        Yes
      </td>

      <td>
        The expression used to filter records. Only records that satisfy the condition are passed downstream.  
        Default value: `${header_value:notNull()}`.  
        For example, use `${header_value:equals('paid')}` to pass only records where the header value is `paid`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/4bb7d561848bade54b4ddd7be0475083bdbd96c9a7ae5e6a60e8e70a7f48a9b3-Screenshot_2026-04-15_at_6.52.21_PM.png" className="border" />

<br />