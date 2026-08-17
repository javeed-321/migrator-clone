---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Connect to Destination

This block enables you to define the details of the v2 API that will be used for running the dataflow.  The API details are auto-filled. You must enter the API client key and secret key to initiate the API.

The table contains the fields and their descriptions.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field name
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Client Key
      </td>

      <td>
        Enter the API client key. For information on creating an API client key, refer to [Creating API client key and secret](https://docs.capillarytech.com/docs/api-client#creating-an-api-client-key-and-secret).
      </td>
    </tr>

    <tr>
      <td>
        Client Secret
      </td>

      <td>
        Enter the API client secret. For information on creating an API client key, refer to [Creating API client key and secret](https://docs.capillarytech.com/docs/api-client#creating-an-api-client-key-and-secret).
      </td>
    </tr>

    <tr>
      <td>
        API EndPoint
      </td>

      <td>
        API endpoint. For example, `/v2/customers`. This field is auto-filled for the available templates.
      </td>
    </tr>

    <tr>
      <td>
        API Base Url
      </td>

      <td>
        API cluster URL of the org. For more information on cluster URLs, refer to [documentation on host URLs](https://docs.capillarytech.com/reference/apioverview#host-urls). This field is auto-filled.
      </td>
    </tr>

    <tr>
      <td>
        OAuth Base Url
      </td>

      <td>
        This URL is used when an API uses the OAuth for authentication and authorization, serving as the base address for the authorization server. For example: \{host}/v3/oauth/token/generate. This field is auto-filled for the pre-defined templates.
      </td>
    </tr>

    <tr>
      <td>
        API Method
      </td>

      <td>
        API method. For example, POST. This field is auto-filled for the pre-defined templates.
      </td>
    </tr>

    <tr>
      <td>
        Bulk Support
      </td>

      <td>
        If set to true, allows for processing multiple records within a single JSON payload. Setting a [grouping limit greater than one](https://docs.capillarytech.com/docs/convert-csv-to-json#step-3-grouping-limit) indicates that the system can create bulk payloads for downstream API calls. This field is auto-filled for the pre-defined templates.
      </td>
    </tr>

    <tr>
      <td>
        Request Split Path
      </td>

      <td>
        This is for internal purposes and can be left empty. 
      </td>
    </tr>

    <tr>
      <td>
        Response Split Path
      </td>

      <td>
        Applicable when Bulk spport is set to true. It is used to divide a single API response containing multiple objects into distinct parts. This is particularly useful for APIs that return a collection of results, such as successes and failures, within a single response. For example, using the expression `$.result.errors.data._,$.result.success.data._`  groups the success data under one object and error data under another. Example response below:  

        \{\
          "result": \{\
            "success": \{\
              "data": [\
                \{\
                  "id": "123",\
                  "status": true,\
                  "message": "Customer created successfully"\
                },\
                \{\
                  "id": "456",\
                  "status": true,\
                  "message": "Order placed successfully"\
                }\
              ][  
                \{  
                  "id": "123",  
                  "status": true,  
                  "message": "Customer created successfully"  
                },  
                \{  
                  "id": "456",  
                  "status": true,  
                  "message": "Order placed successfully"  
                }  
              ]\
            },\
            "errors": \{\
              "data": [\
                \{\
                  "id": "789",\
                  "status": false,\
                  "code": "E101",\
                  "message": "Invalid address"\
                }\
              ][  
                \{  
                  "id": "789",  
                  "status": false,  
                  "code": "E101",  
                  "message": "Invalid address"  
                }  
              ]\
            }\
          }\
        }
      </td>
    </tr>

    <tr>
      <td>
        Recoverable Error Codes
      </td>

      <td>
        Specific error codes that indicate situations in which the system should attempt to retry the failed operation. For example, you can error codes such as - 502 Bad Gateway, 504 Gateway Timeout, 520 Unknown Error, 521 Web Server Is Down etc.
      </td>
    </tr>

    <tr>
      <td>
        Parse Path Map
      </td>

      <td>
        Lets you define expressions to parse the status message and error code from your API response, and include them in the error file. This is crucial since API responses can have varying structures for error information. This field is auto-filled for the pre-defined templates. Ex: `{"status_code": "$.error.code", "error_message": "$.error.message","displayLabel": "$.error.displayLabel"}`
      </td>
    </tr>

    <tr>
      <td>
        Yielding Error Codes
      </td>

      <td>
        Error codes that will be retried an unlimited number of times. This strategy is usually reserved for specific error types where the expectation is that the issue will eventually resolve without intervention, but it might take an indefinite amount of time.\
        Example: When a "429" error (indicating that the request rate is too high) is encountered, the system configured with this strategy will retry the request indefinitely until it is successful. This is because the rate limit is expected to eventually lift, allowing the request to proceed.
      </td>
    </tr>

    <tr>
      <td>
        Max Retries
      </td>

      <td>
        Defines the maximum number of attempts to make an API request in case of failures. This field is auto-filled for the pre-defined templates.
      </td>
    </tr>

    <tr>
      <td>
        Additional headers
      </td>

      <td>
        Applicable only for certain templates. This enables the auto-approval for the request. For example, for issuing goodwill points or for tagging customers to an old transaction templates, this enables auto-approval for those requests.
      </td>
    </tr>
  </tbody>
</Table>

**Error Handling**

In case of any errors connecting to the destination URL, refer [Troubleshooting guide](https://docs.capillarytech.com/docs/troubleshooting-guide-connectplus).