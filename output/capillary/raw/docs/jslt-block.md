---
updatedAt: 2026-07-03T11:20:14.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# JSLT block

The `jslt_transform` block applies a JSLT transformation to JSON data as a transformation block in a Connect+ dataflow. JSLT is an open-source query and transformation language for JSON. The block accepts a JSLT expression that defines how the input JSON is restructured or mapped before being passed to downstream blocks. The block name must be alphanumeric.

**When to use this block**

Use this block when your dataflow needs to restructure, filter, or remap a JSON payload before it is passed to the destination, for example, renaming fields, extracting nested values, or reshaping the payload structure.

**Prerequisites**

Before configuring this block, make sure you have a JSLT transformation expression prepared for your use case

## Standard properties

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
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **JSLT Transformation**
      </td>

      <td>
        Yes
      </td>

      <td>
        The JSLT expression used to transform the input JSON data. Enter the transformation template in the code editor.
      </td>
    </tr>

    <tr>
      <td>
        **Send each record separately**
      </td>

      <td>
        No
      </td>

      <td>
        Determines whether each record is sent as a separate API request.

        - Select `true` to send one API request per record. The JSLT expression processes one record at a time. This value must remain `true` even if the **Grouping Limit** in [**Transform (CSV to JSON)**](https://docs.capillarytech.com/docs/transform-csv-to-json-block) is set to more than `1`.
        - Select `false` to send multiple records in a single bulk API request. In this mode, the JSLT expression must include a `for` loop to process multiple records.

        Default value: `true`.
      </td>
    </tr>
  </tbody>
</Table>

## Advanced properties

⚠️ Advanced properties for JSLT JSON Transform. Make changes only if you know what you are doing.

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
        **Query parameters**
      </td>

      <td>
        No
      </td>

      <td>
        Defines the key-value pairs that are appended to the API URL when making the request.

        For each query parameter value:

        - If the value matches a header name in the source file, Connect+ automatically replaces it with the corresponding value from that record.
        - If the value does not match any header in the source file, Connect+ treats it as a constant value and sends it as entered.

        You do not need to manually append query parameters to the API URL. Connect+ automatically adds the configured query parameters when sending the request.
      </td>
    </tr>

    <tr>
      <td>
        **Attributes**
      </td>

      <td>
        No
      </td>

      <td>
        Defines the values that can be referenced later in the dataflow for downstream processing, such as API path parameters or additional headers.

        For each attribute value:

        - If the value matches a header name in the source file, Connect+ replaces it with the corresponding value from that record at runtime.
        - If the value does not match any header in the source file, Connect+ treats it as a constant value and uses it as entered.

        **Example:** If your source file contains a column named `externalId`, but the destination API expects the value as `userId` in the endpoint `v2/customers/{userId}/labels`, create an attribute with `userId` as the **key** and `externalId` as the **value**. During execution, Connect+ reads the value of `externalId` from each record and replaces `{userId}` in the API request with that value.
      </td>
    </tr>
  </tbody>
</Table>

For details on writing the JSLT expression for different use cases, refer to the [Use cases](https://docs.capillarytech.com/docs/connectplus-use-cases).

**When the API expects a single object**

Write a direct mapping. The expression maps one flat JSON input to the required nested structure and produces a single output object. Use this for endpoints like `/v2/customers`, which accept one record per request.

```json
{
  "profiles": [
    {
      "firstName": .firstname,
      "lastName": .lastname,
      "source": .source,
      "identifiers": [
        {
          "type": .identifierType,
          "value": .value
        }
      ]
    }
  ]
}
```

**When the API expects an array of objects**

Use `for (.)` at the beginning of the expression. The loop iterates over every row in the input batch and produces one output object per row, wrapping all results into an array. Use this for endpoints like `/v2/customers/bulk`, which accept multiple records in a single request.

```json
[
  for (.)
  {
    "profiles": [
      {
        "firstName": .firstname,
        "lastName": .lastname,
        "source": .source,
        "identifiers": [
          {
            "type": .identifierType,
            "value": .value
          }
        ]
      }
    ]
  }
]
```

<br />

**Note:** When writing JSLT transformations, handle both `null` and empty-string values explicitly. If these cases are not handled, Connect+ can omit fields from the API payload, which can cause downstream API validation failures.

For fallback values, use conditions such as `is-null(field)` along with `field == ""` when required.