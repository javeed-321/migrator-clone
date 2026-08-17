---
updatedAt: 2026-04-22T05:41:22.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Filter (Hidden) block

<Callout icon="❗️">
  This block will be deprecated in future releases.
</Callout>

The `filter_on_condition_hidden` block filters data based on conditions before it is processed by downstream blocks. It acts as a transformation block in a Connect+ dataflow, evaluating each record against a defined expression and passing only the records that satisfy the condition. The block uses JSON expression to define filter conditions based on header values.

## When to use this block

Use this block in dataflows where records carry an internal boolean-style flag, and you want to pass only records where the flag is `true` or not set.

## Prerequisites

Before configuring this block, make sure you have:

* Identified the header field and value to filter on
* Familiarity with JSON expression

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
        No
      </td>

      <td>
        A name for the block instance. For example, `Filter_Hidden_Block`.
      </td>
    </tr>

    <tr>
      <td>
        **Filter Condition**
      </td>

      <td>
        No
      </td>

      <td>
        The expression used to filter records. Only records that satisfy the condition are passed downstream.  
        Default value: `${header_value:equals('true'):or(${header_value:isEmpty()})}`.  
        For example, use `${header_value:equals('true')}` to pass only records where the header value is `true`.
      </td>
    </tr>
  </tbody>
</Table>