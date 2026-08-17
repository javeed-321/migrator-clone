---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# API Request Block

The API Request Block allows you to make API calls within a dataflow. You can configure it by specifying the HTTP method, API endpoint, headers, query, body, and path parameters. The methods supported are GET, POST, PUT, DELETE, and PATCH.

You can use the API Request Block to invoke the private APIs. When you use this block, ensure that you use the endpoints `https://{host_name}/das/getUserDetails`.

# Example scenario

**Requirement**\
Consider a scenario where, during the creation of a [dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/daec5cfa-be66-4d5d-b021-c2f45c3aa322/version/9204edc5-0386-4326-9ef8-9988fe690b64?ruleType=org), you need to retrieve customer details using the **Get Customer Details** API.

**Solution**\
You can add an API Request Block with the following details.

* Method: GET
* URL: `https://{host}/v2/customers/lookup/customerDetails `
* Query Parameters:
  * Key: embed
  * Value: points, mlp

# Configuring the API Request Block

To configure the API Request block, perform the following:

1. From the dataflow canvas, click on the connector.
2. Select the **API Request** block from the pop-up window.
3. In the **Block name** section, enter the block name.\
   **Note**: Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
4. In the **Method** section, select a method from the drop-down menu. The available methods are GET, POST, PUT, DELETE, and PATCH.
5. In the **URL** section, enter the API URL.\
   **Syntax**: `https://{host}/{URL}`
   **Example**: `https://{host}/v2/customers/lookup/customerDetails `
6. In the **Query Parameters** section, enter the key and its corresponding value. The entries into the **Key** and the **Value** fields depend on the API parameters.\
   **Example**: For the API endpoint `https://{host}/v2/customers/lookup/customerDetails`, some of the query parameters are `source`, `embed`, and `identifierName`. The query parameters are set as **Key**, and their corresponding values are provided as **Value**.
   Consider the parameter `embed`. Some possible values for `embed` are `points`, `subscriptions`, and `mlp`. So, if the **Key** is `embed`, the **Value** can be `points`, `subscriptions`, or `mlp`.
7. If applicable, in the **Path Parameters** section, enter the **Key** and its corresponding **Value** . The entries into the **Key** and the **Value** fields depend on the API parameters.\
   **Example**: For the API endpoint, `https://{host}/api_gateway/loyalty/v1/programs/{programs}/promotions/{promotions}/get`, the path parameters are `program` and `promotion`. Here, `program` and `promotion` are set as **Key**, and their respective values should be provided in the **Value** section.
8. If applicable, in the **Headers** section, enter the **Key** and its corresponding **Value**. For more information on headers, see [Header Management in Neo](https://docs.capillarytech.com/docs/api-request-block#header-management-in-neo).
9. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and[ define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
10. Click **Done**.

<Image align="center" alt="Configuring API Request block" border={true} caption="Configuring API Request block" src="https://files.readme.io/2723631b86d71f8c1f3dc293cd0438826924f4a8db684c94f2f5e3ff9f0c8423-13.02.2025_19.48.10_REC_configuring_API_Request.gif" />

## Header management in Neo

Request headers are key-value pairs in an HTTP request that provide essential information about the request context. They help the server understand how to process the request and respond appropriately.

Below is a list of headers available in Neo. Additionally, you can create custom headers according to your requirements.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Key
      </th>

      <th>
        Description
      </th>

      <th>
        Possible Values & Default Value
      </th>

      <th>
        Modifiable in the dataflow
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Content-Type**
      </td>

      <td>
        The Content-Type header specifies the format of the request or response body. It tells the server or client how to process the transmitted data.
      </td>

      <td>
        **Default**: application/json

        Neo includes this header by default. You can override the default value or skip the header. To ignore the header, set its value to an empty string ("").
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        **Accept-Encoding**
      </td>

      <td>
        The Accept-Encoding header informs the server about the compression methods supported by the client. This helps reduce the response size and speeds up data transfer.
      </td>

      <td>
        **Default**: gzip, deflate, br  
        Neo includes this header by default.
      </td>

      <td>
        No
      </td>
    </tr>

    <tr>
      <td>
        **User-Agent**
      </td>

      <td>
        The User-Agent header identifies the API client for the server. It enables the server to customise responses based on the client’s software, operating system, or device type.
      </td>

      <td>
        **Default**: neo  
        Neo includes this header by default.
      </td>

      <td>
        No
      </td>
    </tr>

    <tr>
      <td>
        **Referer**
      </td>

      <td>
        A header that indicates the source of a request. It helps Neo identify the origin of the request.
      </td>

      <td>
        URL of the Neo dataflow that is triggered.

        Neo includes this header by default. You can override the default value or skip the header. To skip the header, set its value to an empty string ("").
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        **Authorization**
      </td>

      <td>
        Applicable for API requests that come directly from POS terminal to the Capillary Server. The [Authorization header](https://docs.capillarytech.com/reference/basic-authentication#using-authorization-header) value is constructed using the below format: `Basic <Base64 encoded (username:md5(password))>`
      </td>

      <td>
        If the incoming request to the dataflow includes a value, Neo sets the header with that value. If no value is provided, the header is excluded.
      </td>

      <td>
        Modifiable in a hierarchical organization using the **OrgContextSwitch** block to switch the dataflow execution context from the parent organization to the child organization.
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-api-oauth-token**
      </td>

      <td>
        A custom authentication header for Capillary internal APIs. Applicable for POS server-to-server integration, FTP server-to-server integration, Server-to-server custom integration and Prebuilt server-to-server integrations. [OAuth](https://docs.capillarytech.com/docs/api-client#oauth-authentication) token generated using the API key and secret.
      </td>

      <td>
        If the incoming request to the dataflow includes a value, Neo sets the header with that value. If no value is provided, the header is excluded.
      </td>

      <td>
        Modifiable in a hierarchical organization using the **OrgContextSwitch** block to switch the dataflow execution context from the parent organization to the child organization.
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-api-auth-key**
      </td>

      <td>
        A custom authentication header for Capillary internal APIs. It adds an extra security layer to verify API requests and ensures that only authorized clients can access Capillary’s services.
      </td>

      <td>
        If the incoming request to the dataflow includes a value, Neo sets the header with that value. If no value is provided, the header is excluded.
      </td>

      <td>
        Modifiable in a hierarchical organization using the **OrgContextSwitch** block to switch the dataflow execution context from the parent organization to the child organization.
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-api-auth-org-id**
      </td>

      <td>
        A custom authentication header for Capillary internal APIs. It identifies the organization making the API request.
      </td>

      <td>
        If the incoming request to the dataflow includes a value, Neo sets the header with that value. If no value is provided, the header is excluded.
      </td>

      <td>
        Modifiable in a hierarchical organization using the **OrgContextSwitch** block to switch the dataflow execution context from the parent organization to the child organization.
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-neo-block-log-level**
      </td>

      <td>
        A custom header for Capillary internal APIs that defines the log level for the Neo platform, similar to the logger in the Script block. Logs are generated according to the specified level.
      </td>

      <td>
        debug, info, warn, error
        **Default**: Debug
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-neo-debug-enabled**
      </td>

      <td>
        A custom header for Capillary internal APIs, when set to **true**, captures platform logs from all services processing the request, not just Neo.
      </td>

      <td>
        True or false **Default**: False
      </td>

      <td>
        Yes. You can also use the Dev Console to set or change the value of this header.
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-neo-dag-scope**
      </td>

      <td>
        A custom header in Capillary’s Neo platform that defines the scope of execution.
      </td>

      <td>
        Org, global, parent **Default**: org
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-api-attribution-entity-code**
      </td>

      <td>
        A custom header for Capillary internal APIs used to specify the code associated with a particular entity type.
      </td>

      <td>
        If the value is in the incoming request, Neo uses it. If not, Neo ignores it. However, setting a value in the [block properties](https://docs.capillarytech.com/docs/dataflows#field-values-in-a-block-block-properties) overrides the request value.
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-api-attribution-entity-type**
      </td>

      <td>
        A custom header for Capillary internal APIs that specifies the type of entity posting the data.
      </td>

      <td>
        If the value is in the incoming request, Neo uses it. If not, Neo ignores it. However, setting a value in the [block properties](https://docs.capillarytech.com/docs/dataflows#field-values-in-a-block-block-properties) overrides the request value.
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-request-id**
      </td>

      <td>
        A custom header that uniquely identifies each request. The system uses this header for tracking and logging. This is applicable for Capillary internal APIs.
      </td>

      <td>
        If the value is in the incoming request, Neo uses it. If not, Neo ignores it. However, setting a value in the [block properties](https://docs.capillarytech.com/docs/dataflows#field-values-in-a-block-block-properties) overrides the request value.
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-direct-replay**
      </td>

      <td>
        A custom header that determines whether the system processes the request synchronously or asynchronously. This is applicable for Capillary internal APIs.
      </td>

      <td>
        If the value is in the incoming request, Neo uses it. If not, Neo ignores it. However, setting a value in the [block properties](https://docs.capillarytech.com/docs/dataflows#field-values-in-a-block-block-properties) overrides the request value.
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-neo-sla**
      </td>

      <td>
        A custom header to route non-critical or long-running requests to a separate instance optimised for lower-priority processing, ensuring they do not interfere with high-priority, real-time traffic.
      </td>

      <td>
        no-sla
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        **x-cap-api-version**
      </td>

      <td>
        A custom header indicating the dataflow status.
      </td>

      <td>
        The dataflow's status determines the value of the header:

        * live dataflows return their version number.

        * draft dataflows return the value `Draft`.
      </td>

      <td>
        No
      </td>
    </tr>
  </tbody>
</Table>

# Handling bulk API call errors

When Neo executes multiple APIs in a single request, it handles the error as follows:

* If any individual call fails, the respective API Request Block's response displays `"msg": "failed"` .
* Neo continues executing the remaining calls and collects all responses, including the successful ones.

Below is a sample response when Neo executes multiple APIs in a single request.

```json Sample Response
{
  "api1Output": "1234fjefenjkrfknj4rvjkn",
  "api2Output": {
    "code": 500,
    "message": "{\"code\":500,\"message\":\"UNKNOWN EXCEPTION\",\"err\":\"TypeError: Cannot set properties of undefined (setting 'x-cap-neo-error-msg')\"}",
    "err": {
      "message": "{\"code\":500,\"message\":\"UNKNOWN EXCEPTION\",\"err\":\"TypeError: Cannot set properties of undefined (setting 'x-cap-neo-error-msg')\"}"
    }
  },
  "api3Output": "1234fjefenjkrfknj4rvjkn",
  "msg": "failed"
}
```

**Explanation**

* `api1Output, api2Output`, and `api3Output `are the names of the individual API calls.
* `api1Output `and `api3Output `contains successful responses.
* `api2Output `contains a 500 error response with detailed metadata.

The `msg `field shows the overall status. It reads "failed" because `api2Output `failed.

# Using private APIs

You can use the API Request block to invoke [private APIs](https://docs.capillarytech.com/reference/private-apis). To use the output in subsequent blocks, add a Script block after the API Request block and use the DAO function [getOut()](https://docs.capillarytech.com/docs/neo-dao-functions#getout) to retrieve the response.

## Example use case

**Requirement**\
Retrieve a customer's expired points using the private API `getExpiredPointsByCustomerIdAndYear`, and transform the data into a cleaned-up, format with only the fields `customerId`, `year`, `earned`, and `expired` from the output, which is in an array format.

**Solution**\
Add a **Script** block after the **API Request** block. Use the DAO function `getOut()` to extract the output from the API Request block, then transform the array into the required summarised format.

Below is a sample script from the Script block to achieve the same.

```json Script block code
import dao from "neo/dao";
import logger from "neo/logger";
//These are some dao methods already imported.
//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.
const {
    getBody,
    getEffectiveHeaders,
    getIn,
    getApiRequest,
    getOut,
} = dao;




const script = {


    execute: () => {
      var payload = dao.getOut();
      logger.info("test"+JSON.stringify(payload));
      //return payload;
      //logger.info(JSON.stringify(payload, null, 2));
        //Write your code here.
      const result =  transformPointsData(payload);
      logger.info(JSON.stringify(result, null, 2));
      return {
              "http": {
                   "res": {
                       "json": result,
                       "status": 200
                   }
               }
 }
    }
}


/**
 * Transforms an array of point-earning records into a summarized format.
 *
 * @param {Array<Object>} inputData The array of original point records.
 * @returns {Array<Object>} The array of transformed objects.
 */
function transformPointsData(inputData) {
  // Get the current year to compare against the creation year.
  const currentYear = new Date().getFullYear();


  // Use the map function to iterate over each item and transform it.
  return inputData.map(item => {
    // Create a Date object from the timestamp (which is in milliseconds).
    const createdDate = new Date(item.created_on);
    const createdYear = createdDate.getFullYear();


    // Determine the value for 'expired'. If the points were earned in the
    // current year, 0 points have expired. Otherwise, all earned points
    // are considered expired for this transformation.
    const expiredPoints = (currentYear === createdYear) ? 0 : item.earned;


    // Return the new object with the desired structure and keys.
    return {
      customerId: item.customer_id, // Renaming 'customer_id' to 'customerId'
      year: createdYear,
      earned: item.earned,
      expired: expiredPoints
    };
  });
}


export {
    script as default
}

```