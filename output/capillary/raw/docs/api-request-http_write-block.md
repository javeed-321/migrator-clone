---
updatedAt: 2026-07-03T11:57:26.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# API request (http_write) block

The `http_write` block sends data to an external HTTP API endpoint using OAuth-based authentication as a destination block in a Connect+ dataflow. It supports rate limiting, configurable retry logic, and response parsing. The block is typically used to post process data to Capillary or third-party APIs.

## When to use this block

Use this block when your dataflow needs to deliver data to an HTTP API, for example, posting transactions to the Capillary Transaction v2 API.

## Prerequisites

Before configuring this block, make sure you have:

* OAuth client key and secret
* The API endpoint path
* The HTTP method required by the API (`POST` or `PUT`)

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
        Yes
      </td>

      <td>
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **Client Key**
      </td>

      <td>
        Yes
      </td>

      <td>
        The OAuth client key used for authentication. Select the client key from the dropdown. The list shows configurations created in the [Extension Configuration ](https://docs.capillarytech.com/docs/extension-configuration)section of the Dev Console.
      </td>
    </tr>

    <tr>
      <td>
        **Client Secret**
      </td>

      <td>
        Yes
      </td>

      <td>
        The OAuth client secret used for authentication. Select the client secret from the dropdown. The list shows configurations marked as secret in the [Extension Configuration ](https://docs.capillarytech.com/docs/extension-configuration)section of the Dev Console.

        **Note**: When creating a password configuration in the Extension Configuration section of the Dev Console, set `Is Secret` to make it available in the dropdown.
      </td>
    </tr>

    <tr>
      <td>
        **API Endpoint**
      </td>

      <td>
        Yes
      </td>

      <td>
        The relative endpoint path of the API to call.<br />For example, `/v2/transactions/bulk`.
        For Neo endpoints, use the format `/x/neo/<neo_dataflow_name>`. <br />To insert a path parameter populated at runtime, use `$attributeName`, where `attributeName` is a variable declared in the **Attributes** property of the JSLT block. <br />For example, if you declared a `userId` attribute, enter `/v2/customer/$userId`.<br /><br />**Note**: <br />- Attributes referenced here must be declared in the JSLT block. If an attribute is not declared in the JSLT block, you cannot use it here.<br />- Do not append query parameters manually using `?` in the API URL. Connect+ automatically appends the configured query parameters when sending the request.
      </td>
    </tr>

    <tr>
      <td>
        **API Method**
      </td>

      <td>
        Yes
      </td>

      <td>
        The HTTP method used to call the API.<br />Select `POST` or `PUT` from the dropdown.<br />Default value: `POST`.
      </td>
    </tr>

    <tr>
      <td>
        **Parse API Response**
      </td>

      <td>
        No
      </td>

      <td>
        Parses the API response after each request and extracts specific values using the Parse path map.<br />Select `true` to extract values from the response.<br />Select `false` to skip response parsing.<br />When set to `true`, the parse path map defines which fields to extract from the response:

        - status\_code — the error code returned by the API
        - error\_message — the error description
        - entity\_id — the ID of the created or updated record

        Default value: `true`.<br />Set the value to `false` for Neo APIs.
      </td>
    </tr>
  </tbody>
</Table>

## Advanced properties

⚠️ Advanced properties for OAuth HTTP API Call. Make changes only if you know what you are doing.

| Field name                  | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API Base URL**            | Yes      | The base URL of the API. You can use the default value.<br />If you enter a URL, do not include a trailing `/`.<br />Default value: `{intouch_url}`.                                                                                                                                                                                                                                                                             |
| **OAuth Base URL**          | Yes      | The base URL used to obtain the OAuth token. You can use the default value.<br />If you enter a URL, do not include a trailing `/`.<br />Default value: `{intouch_url}`.                                                                                                                                                                                                                                                         |
| **Bulk Support**            | Yes      | Determines whether bulk API calls are supported. Select from the dropdown.<br />Select `false` when the target API expects individual objects.<br />Select `true` when the target API expects an array.<br />Default value: `true`.                                                                                                                                                                                              |
| **Request Split Path**      | Yes      | The JSONPath expression used to split outgoing requests.<br />Default value: `$.*`.                                                                                                                                                                                                                                                                                                                                              |
| **Response Split Path**     | Yes      | The JSONPath expression used to split API responses.<br />Default value: `$.*`.                                                                                                                                                                                                                                                                                                                                                  |
| **Parse Path Map**          | Yes      | The JSONPath map used to parse API responses.<br />Default value: `{"status_code":"$.[errors'].*.code","error_message":"$.[errors'].*.r..."}`.                                                                                                                                                                                                                                                                                   |
| **Recoverable Error Codes** | No       | Comma-separated HTTP status codes that trigger a retry.<br />Default value: `521,502,503,504`.                                                                                                                                                                                                                                                                                                                                   |
| **Yielding Error Codes**    | No       | Comma-separated HTTP status codes that cause the block to yield and wait before retrying.<br />Default value: `429`.                                                                                                                                                                                                                                                                                                             |
| **Max Retries**             | No       | The maximum number of retry attempts on failure.<br />Default value: `3`.                                                                                                                                                                                                                                                                                                                                                        |
| **Additional Headers**      | No       | Additional HTTP headers to include in the API request, entered as a JSON object.<br />For example, `{"X-Custom-Header": "value"}`.<br /><br />To reference an attribute declared in the JSLT block, use `$attributeName`. For example, `{"X-Cap-Id": "$userId"}`.<br /><br />**Note**: Attributes referenced here must be declared in the JSLT block. If an attribute is not declared in the JSLT block, you cannot use it here. |
| **Rate**                    | Yes      | The number of flow files processed per time period.<br />Default value: `1000`.                                                                                                                                                                                                                                                                                                                                                  |
| **Time Period**             | Yes      | The duration of the rate-limiting time window.<br />Default value: `1`.                                                                                                                                                                                                                                                                                                                                                          |
| **Time Unit**               | Yes      | The time unit for the rate-limiting period. Select `SECONDS`, `MINUTES`, or `HOURS` from the dropdown.<br />Default value: `MINUTES`.                                                                                                                                                                                                                                                                                            |

<Image src="https://files.readme.io/fd5c7ebc2fae4e790dc3c2e149500141243b150b503aac4378d0236a08cf653b-Untitled_design_2.gif" align="center" border={true} />

<br />