---
updatedAt: 2026-04-22T05:48:36.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Split block

The `split_json` block splits an input JSON payload into multiple individual flow files as a transformation block in a Connect+ dataflow. It uses a JSONPath expression to identify the array or elements to split on, enabling downstream blocks to process each record separately.

## When to use this block

Use this block when the upstream block produces a JSON array and downstream blocks need to process each element individually.

## Prerequisites

Before configuring this block, make sure you have:

* A JSON Path expression that identifies the array or elements to split on

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
        **JsonPath Expression**
      </td>

      <td>
        Yes
      </td>

      <td>
        The JSONPath expression used to identify the elements to split on.   
        Default value: `$.[*]`.
      </td>
    </tr>

    <tr>
      <td>
        **Split Response**
      </td>

      <td>
        Yes
      </td>

      <td>
        Determines whether the response is split into multiple flow files. Select `true` or `false` from the dropdown.   
        Default value: `true`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/24151dccab33028735d6115db64a21aef4114bfd2d3646e4c415c1cc2f4f4be9-Screenshot_2026-04-20_at_4.28.56_PM.png" className="border" />