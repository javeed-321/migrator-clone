---
updatedAt: 2026-03-05T11:39:20.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Neo DAO Functions

This document provides an overview of the Data Access Object (DAO) functions available in the Neo application. These functions operate across various blocks such as Script, Schema, and Mongo blocks and play a key role in connecting the application's business logic with its data sources.

# Overview

DAO functions handle the logic for accessing and manipulating data. They provide a simple and consistent way to interact with data from sources such as API requests and MongoDB blocks.

# DAO Functions

The following DAO functions are provided in Neo:

## getApiRequest

The `getApiRequest `function retrieves the API request made to the application. It returns the complete input request object, including the HTTP method, the requested URL, headers, and the request body.

### Use cases

**Scenario 1**: Consider that you need to customise the response based on specific headers in the incoming API request.\
**Usage**: Use `getApiRequest`() to access the request headers and determine how to customise the response.

**Syntax**:`const request = dao.getApiRequest();`

**Example Output**

```javascript
{ 
  method: "GET",
  url: "/api/data", 
  headers: { 
    "Authorization": "Bearer token"
  }, 
  body: {} 
}
```

## getIn

The function `getIn`  returns the input properties of the current block. These are the data or parameters that were passed to the block when it was executed.

### Use cases

**Scenario 1**: Consider you need to transform or process data that is passed to a block.\
**Usage**:  Use `getIn()` to access the input properties, perform necessary transformations or calculations, and then use the results.

**Scenario 2** : Consider you need to implement conditional logic based on the input properties.\
**Usage**: Use `getIn()` to retrieve the input properties and apply conditional logic to execute different paths or actions depending on the values of parameters1 and parameter2.

**Input syntax**: `const input = dao.getIn();`

**Output syntax**

```javascript
Example Output: 
{ 
  param1: "value1", 
  param2: "value2" 
}
```

## getOut

The getOut() function retrieves output data from a specific block after it executes: pass the block’s name as a parameter to return that block’s output, or omit the name to return output from the previous or parent block.

You can retrieve the outputs of multiple API requests. The function returns results for all API requests, successful and failed. If any request fails, the block status is marked as "failed" while still maintaining the details of the failed requests.

### Use Cases

**Scenario 1**: You need to use the output of a block executed earlier in the flow.\
**Usage**: Call `getOut()` with the block’s name to retrieve its output. If no name is provided, the function returns the output from the previous or parent block.

**Scenario 2**:  Consider you want to chain multiple blocks together where each block depends on the result of the previous one.\
**Usage** : Use `getOut()` to access the output of the preceding block and feed this data into the next block for further processing.

**Input syntax**: `const output = dao.getOut("blockName");`\
The block name is optional.

**Output syntax**

```javascript
{ 
  status: 200, 
  body: 
  { 
    "key": "value" 
  } 
}
```

## getBody

The function `getBody()` retrieves the body of the output response from a specified block.  If the block name is not specified, it retrieves the body from the previous or parent block. If the output from that block is an array, the function returns `undefined`.

### Use cases

**Scenario 1**: You need to access specific data from the response body of a block.\
**Usage**: Use `getBody()` to retrieve the response body from a specified block. If you don’t provide a block name, the function returns the response body from the previous block.

**Scenario 2**: Consider you need to debug or troubleshoot issues by examining the response body of a block.\
**Usage**:  Use `getBody()` to access and inspect the response body. This allows you to identify any discrepancies or issues in the output data.

**Input syntax**:` const responseBody = dao.getBody("blockName");`\
The block name is optional.

**Output syntax**

```javascript
{ 
  "key": "value" 
}
```

## getMultiBody

The function `getMultiBody()` is used when a block returns an array of responses, each with its own body. This function retrieves all the individual bodies from these responses and returns them as an array. If the block name is not specified, it retrieves the body from the previous or parent block.

### Use cases

**Scenario 1**: Consider you want to combine or analyse data from multiple response bodies returned by a block.\
**Usage**: Use `getMultiBody() `to get an array of response bodies, then aggregate or analyse the data across all the responses.

**Scenario 2**: You need to validate each response body in a collection of responses to ensure it meets specific criteria.\
**Usage**: Use `getMultiBody()` to retrieve the array of response bodies, and then iterate through each one to apply validation checks.

**Input syntax**: `const responseBodies = dao.getMultiBody("blockName");`\
The block name is optional.

**Output syntax**

```javascript
[
  { 
    "data": "data1" 
  }, 
  { "data": "data2" 
  }
]
```

## getHeaders

The `getHeaders()` function is used to retrieve the headers from the output response of a specific block. Headers are key-value pairs that provide essential metadata about the response.

When you call `getHeaders` with a block name, the function returns an object containing all the headers associated with the output response of the specified block. If you don't specify a block name, it returns the headers of the previous or parent block by default.

### Use cases

**Scenario 1**: Consider you need to determine the content type of a response to handle it appropriately, such as parsing JSON or XML data.\
**Usage**: Use `dao.getHeaders("blockName")` to retrieve the `Content-Type` header from the response. This allows you to process the response data according to its type.

**Input syntax**: `const headers = dao.getHeaders("blockName");`\
The block name is optional.

**Example output** :

```javascript
 { 
   "Content-Type": "application/json", 
   "Authorization": "Bearer token" 
 }
```

## getStatus

The `getStatus `function retrieves the HTTP status code from the response generated by a specific block in your application. This status code reflects the result of the block's operation, such as success, error, or another outcome. If the block's output is an array, the function returns `undefined`.

When you call `getStatus `with a block name, the function returns the status code for that specific block. If you do not specify the block name, the function returns the status code from the previous or parent block's output.

### Use cases

**Scenario 1**: Consider you want to implement custom error-handling logic based on the status code returned by a specific block.\
**Usage**: Use `getStatus()` to retrieve the status code from the block's output. This helps you determine the appropriate response or action based on the specific status code

**Scenario 2**: Consider you are executing multiple blocks in sequence, and the execution of a subsequent block depends on the success or failure (status code) of the previous block.\
**Usage**: Use `getStatus()` to check the status code of the previous block. For example, if the status code is 200, whereas a different status code might trigger an alternative flow.

**Input syntax**: `const statusCode = dao.getStatus("blockName");`\
The block name is optional.

**Example Output**: 200

## getMultiStatus

The `getMultiStatus `function retrieves multiple status codes when a block's output consists of an array of responses. Each response in the array has its status code, such as `200`, `404`, or `500`. The `getMultiStatus `function collects these status codes from each response and returns them as an array.

When you call `getMultiStatus`with a block name, the function returns the status code for that specific block. If you do not specify the block name, the function returns the status code from the previous or parent block's output.

### Use cases

**Scenario 1**: Consider you are processing a batch of requests where each request returns a response with its own status code. You need to handle or log the status codes for all responses.\
**Usage**: Use `getMultiStatus()` to retrieve the status codes for all responses in the batch.

**Scenario 2**: Consider you receive responses from multiple sources or services, and you need to make decisions based on the status codes from each response. For example, if any response indicates an error, you might want to trigger a specific action.\
**Usage**: Use `getMultiStatus() `to access all status codes from the array of responses. This allows you to implement conditional logic based on the status codes, such as taking corrective actions if any response contains an error status.

**Input syntax**: `const statusCodes = dao.getMultiStatus("blockName");`

**Example output**: \[200, 404]

## getQueryParams

The `getQueryParams `function retrieves the query parameters from the output response of a specified block. Query parameters are key-value pairs included in the URL of a request. If the block's output is an array, the function returns `undefined`.

When you specify a block name, `getQueryParams `returns the query parameters from that particular block. If you don't provide a block name, the function defaults to returning the query parameters from the output of the previous or parent block.

### Use cases

**Scenario 1**: Consider that you need to analyse the query parameters used in a specific block to verify the correctness of the request.\
**Usage**: Use `getQueryParams()` to retrieve the query parameters from the specified block's output and verify the same.

**Scenario 2**: Consider that you need to generate reports based on different search criteria or pagination settings specified in query parameters.\
**Usage**: Use **getQueryParams()** to extract query parameters such as search terms or page numbers from the block's output.

**Input syntax**: `const queryParams = dao.getQueryParams("blockName");`\
The block name is optional.

**Example output**

```javascript
{ 
  "search": "query", 
   "page": "1" 
}
```

## getPathParams

The `getPathParams `function retrieves the path parameters from a specified block's output. If the output is an array, the function returns `undefined`.

When you specify a block name, `getPathParams `fetches the path parameters from that block. If you don't specify a block name, it retrieves the path parameters from the previous or parent block.

### Use cases

**Scenario 1**: Consider you need to extract and validate a specific path parameter, such as an ID, from a block's output before continuing with the next steps in the logic.\
**Usage**:  Use `getPathParams()` to retrieve the `id` from the block's output, allowing you to validate or use it in subsequent operations.

**Scenario 2**:  Consider you are working with multiple API endpoints, and each requires different path parameters. You want to dynamically retrieve these parameters based on the current block's execution.\
**Usage**: Use `getPathParams()` to access the path parameters of the relevant block, enabling you to manage routing or processing logic based on the retrieved parameters.

**Input syntax**: `const pathParams = dao.getPathParams("blockName");`\
The block name is optional.

**Example Output**

```javascript
{ 
  "id": "123" 
}
```

## getError

The `getError `function is designed to retrieve the error object from the output of a specified block. This error object contains details such as an error message and an error code, which help identify and diagnose issues that occur during the execution of that block. When the block's output is an array of responses, the function returns `undefined`.

When you specify a block name as an argument, the function `getError` fetches the error object from that specific block. If you do not specify a block name, the function returns the error object from the previous or parent block.

### Use cases

**Scenario 1**: Consider you need to debug a specific block that fails during execution.\
**Usage**: Use `getError()` to retrieve the error object from that block. This allows you to see the error message and code, helping diagnose and fix the issue.

**Scenario 2**: Consider you have a workflow where different actions depend on whether a block succeeds or fails.\
**Usage**: Use `getError()` to check if the specified block encountered an error. If the function returns an error object, implement custom error handling or logging based on the error details.

**Input syntax**: `const error = dao.getError("blockName");`\
The block name is optional.

```javascript
{ 
  "message": "An error occurred", "code": "500" 
}
```

## getMultiError

The `getMultiError `function retrieves an array of error objects from the output response when a block's output consists of multiple responses. Each response in the array may have its error object. The function collects all these error objects and returns them as an array.

When you specify a block name, `getMultiError `fetches the array of errors from that specific block's output. If you don't provide a block name, the function defaults to retrieving the errors from the output of the previous or parent block.

### Use case

**Scenario 1**: Consider you are processing multiple API responses, each of which might contain its error object. You must collect and review all the errors to understand the issues across different responses.\
**Usage**: Use `getMultiError()` to gather all error objects from each response in the array. This helps in aggregating error information for comprehensive troubleshooting or reporting.

**Scenario 2**: Consider you are implementing a batch processing system where each response could have its error details. You need to handle errors for each item in the batch individually.\
**Usage**: Use `getMultiError()` to retrieve and manage error details from all responses. This allows you to process errors for each response separately, such as logging them or triggering specific error handling workflows.

**Input syntax**: `const errors = dao.getMultiError("blockName");`\
The block name is optional.

**Example output**

```javascript
[
  { "message": "Error 1" }, 
  { "message": "Error 2" }
]
```

## hasError

The `hasError()` function checks whether an error message exists in the output response of a specified block. It helps determine if the block encountered an error during execution. It returns a boolean value: `true `if an error message is present and `false `otherwise.

If you specify a block name, the function checks that specific block's output. If no block name is provided, it checks the output of the previous or parent block.

### Use case

**Scenario**: Consider a conditional logic based on whether a block encounters an error during execution. For example, you may need to trigger error handling or execute alternative logic if an error occurs.\
**Usage**: Use `hasError()` to check if the specified block generated an error. This enables you to create your logic according to the presence of errors, such as initiating an error handling routine if true.

**Input syntax**: `const hasError = dao.hasError("blockName");`\
The block name is optional.

**Output**: True or False

## isSuccess

The `isSuccess()` is a boolean function used to determine whether a previous operation or transaction was successful. It helps control the logic flow within a system, particularly in error handling and decision-making processes.

`isSuccess()`  checks if data retrieval or a transaction completes without errors. It returns `true `if successful, else it returns `false`. Using this function, you can implement conditional logic based on the success of previous operations and effectively handle errors. This function does not require any input parameters.

### Use case

**Scenario**: Consider an airport check-in system, the application first verifies whether it successfully retrieved a passenger’s data without errors. It then checks specific passenger details, such as a valid ticket and ID.

**Usage 1**: `isSuccess() && (getOut().body.validPassenger)`\
This condition confirms that the operation succeeded and the passenger data is valid. If both are true, the system proceeds with the check-in process.

**Usage 2**: `isSuccess() && (!getOut().body.validPassenger)`\
This condition confirms that the operation succeeded, but the passenger data is invalid. If true, the system can trigger error handling or route the flow to manage the invalid passenger case.

## hasBlockBeenVisited

The `hasBlockBeenVisited()` is a boolean function that checks whether a block has been visited during the dataflow execution.

**Syntax**: `hasBlockBeenVisited("blockName");`

**Output**: True or False

## getValueByKey

The `getValueByKey()` function retrieves a configuration value from the [Configuration Manager](https://docs.capillarytech.com/docs/extension-configuration).

**Syntax**: `getValueByKey('config name')`\
The `config name` parameter is required and specifies the name of the configuration you want to retrieve.

**Usage**: `const KeyLoyaltyId = getValueByKey('KeyLoyaltyId');`

## getParentValueByKey

In a connected organization setup, the `getParentValueByKey()` function retrieves a configuration value stored in the [Configuration Manager](https://docs.capillarytech.com/docs/extension-configuration) at the parent organization level, from within a child organization.

**Syntax**: `getParentValueByKey('config name')`\
The `config name` parameter is required and specifies the name of the configuration to retrieve.

**Usage**: `const parentConfig = getParentValueByKey('ParentKey');`

## executeBlock

The `executeBlock()` function runs a [helper function block](https://docs.capillarytech.com/docs/block-libraries#/reusing-logic-in-a-script-block) from the block library within the current dataflow. To use this function, make sure the correct [version of the block library](https://docs.capillarytech.com/docs/block-libraries#/block-library-versioning) is added to the dataflow. You can then pass dynamic arguments to the block at runtime. The block processes the input and returns a response object, whose structure depends on the logic defined in the block.

### Use case

**Scenario**\
During a dataflow run, you need to:

* Validate a mobile number.
* Calculate the final amount, including tax.

**Solution**\
Call the respective helper blocks using the `executeBlock()` function.

```js
const validationResult = await dao.executeBlock("validateMobileNumber", "+1234567890");
```

### Syntax

```js
await dao.executeBlock("blockName", arg1, arg2, ...);
```

* `blockName` (required): Name of the block in the block library.
* `arg1`, `arg2`, etc. (optional): Input values passed in the expected order.

### Example output

The response object returned by `executeBlock()` varies based on the block’s implementation.

#### Example 1: Validation block

```json
{
  "isValid": true,
  "message": "Valid mobile number"
}
```

#### Example 2: Calculation block

```json
{
  "result": 110,
  "currency": "USD",
  "details": {
    "amount": 100,
    "taxRate": 0.1,
    "tax": 10
  }
}
```

### Error handling

* If the block name is missing:\
  `"executeBlock requires a block name"`

* If the block is not included in the dataflow:\
  Execution fails.

* If expected arguments are missing:\
  The block should handle missing inputs gracefully by using default values or returning a clear error response.

## getFunctionArguments

The `getFunctionArguments()` function retrieves the list of arguments passed to a <Anchor label="helper function block " target="_blank" href="https://docs.capillarytech.com/docs/block-libraries#/reusing-logic-in-a-script-block">helper function block </Anchor>during execution using `executeBlock()`. It returns an array of arguments in the order they were passed.

You can access each argument using its index:

* `args[0]` for the first argument
* `args[1]` for the second, and so on

Use this function when you need to process or validate inputs passed to a reusable helper function block.

### Use cases

**Scenario 1**: You need to access configuration parameters passed to a block in a specific order.\
**Solution**: Use `getFunctionArguments()` to retrieve the array and access parameters by index.

**Scenario 2**: You want to implement logic that changes based on input values.\
**Solution**: Use `getFunctionArguments()` to access and evaluate inputs dynamically.

### Syntax

```javascript
const args = dao.getFunctionArguments();
```

### Example output

```javascript
[
  "value1",  // args[0]
  "value2",  // args[1]
  "value3"   // args[2]
]
```

### Example usage

```javascript
const script = {
  execute: () => {
    const args = dao.getFunctionArguments();
    const firstArg = args[0];
    const secondArg = args[1];

    return {
      firstParam: firstArg,
      secondParam: secondArg,
      message: "Arguments processed successfully"
    };
  }
};
```

### Common patterns

**Access the first argument**

```javascript
const firstArg = dao.getFunctionArguments()[0];
```

**Access the second argument**

```javascript
const secondArg = dao.getFunctionArguments()[1];
```

**Check if arguments are passed**

```javascript
const args = dao.getFunctionArguments();
if (args.length > 0) {
  const firstArg = args[0];
}
```

### Best practices

* Check array length before accessing arguments.
* Use descriptive variable names for clarity.
* Document the expected argument order and purpose.
* Handle missing or invalid arguments gracefully.
* Use array destructuring when possible for cleaner code.

### Limitations

* Arguments are immutable once passed.
* You must access arguments by index.
* The order of arguments is critical.
* Arguments must be provided when the block is invoked using `executeBlock()`.

## getBlockHeaders

The  `getBlockHeaders()`function returns the headers of the specified block.

### Syntax

```javascript
const blockHeaders = getBlockHeaders('blockName');
```

**Parameter**\
The block name parameter is required and specifies the name of the block from which to retrieve headers.

**Return value**\
`IHeaders` : An object representing the headers associated with the specified block. The `IHeaders` type is an object with string keys (header names) and string values (header values).

### Example usage

```json Example usage
const blockHeaders = dao.getBlockHeaders("APICallGetCustomerDetails")
```

### Example output

```json Example output
{
  "Content-Type": "application/json",
    "Authorization": "Bearer token"
}
```

## getApplicationName

The `getApplicationName` function returns the name of the application that contains the currently executing dataflow.

When called from within a middleware (pre-matching or post-matching) dataflow, it returns the application name of the main dataflow that triggered execution and not the middleware's own application.

### Syntax

```javascript
const appName = dao.getApplicationName();
```

### Parameters

None.

### Return value

`string` — The name of the application containing the active dataflow.

### Use cases

| Scenario                     | Description                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Middleware filtering         | Restrict middleware execution to dataflows in specific applications.                                                                                                           |
| Conditional routing          | Route execution to different logic branches based on the calling application.                                                                                                  |
| Logging and auditing         | Include the application name in the log output for better traceability.                                                                                                        |
| Multi-application middleware | Use one middleware dataflow to serve multiple applications, applying different logic for each based on the application name, instead of creating separate middleware for each. |

### Example: Retrieve the application name in a Script block

```javascript
import dao from "neo/dao";

const script = {
  execute: async () => {
    const currentApp = dao.getApplicationName();
    return {
      currentApplication: currentApp
    };
  }
};

export { script as default };
```

**Example output**

```json
{
  "currentApplication": "CustomerManagement"
}
```

### Example: Use in a relation condition

```javascript
dao.getApplicationName() === "CustomerManagement"
```

**Key behaviors**

* When called inside a middleware dataflow, returns the application name of the calling main dataflow.
* When called inside a main dataflow, returns the application name of that dataflow.

# DAO Methods Specific to Filters

## getDataFlowOut

The `getDataFlowOut()` function retrieves the output from a specified dataflow using the `dagType` parameter. `dagType` indicates the type of dataflow.

> 📘 dagType
>
> * The `dagType `is set to 'main' for the original or main data flow.
> * The `dagType `is set to '@PreMatching-P1/2/3' for pre-matching data flows.
> * The `dagType `is set to '@PostMatching-P1/2/3' for post-matching data flows.

## getLatestDataFlowOut

The function `getLatestDataFlowOut()`  fetches the output from the latest execution of a dataflow without needing any parameters.

## doesDataFlowHasError

The function `doesDataFlowHasError()` returns a boolean that indicates whether the specified dataflow encountered an error. Use the `dagType` parameter to specify the type of dataflow.

## doesLatestDataFlowHasError

The function `doesLatestDataFlowHasError()` returns a boolean that indicates whether the latest dataflow encounters an error. No parameters are required.

## getDataFlowError

The function `getDataFlowError()` retrieves the error from a specific dataflow using the `dagType` parameter to identify the target DAG.

## getLatestDataFlowError

The function `getLatestDataFlowError()` retrieves the error from the latest dataflow and does not require any parameters.

## getDataFlowBody

The function `getDataFlowBody()` retrieves the body of a specific dataflow using the `dagType` parameter to indicate which dataflow to access.

## getLatestDataFlowBody

The function `getLatestDataFlowBody()` retrieves the body from the latest dataflow execution without requiring any parameters.

## getDataFlowMultiBody

The function `getDataFlowMultiBody()` is similar to [getMultiBody](https://docs.capillarytech.com/docs/neo-dao-functions#getmultibody) , specify `dagType` in the parameters.

## getLatestDataFlowMultiBody

The function `getLatestDataFlowMultiBody()` is similar to [getMultiBody](https://docs.capillarytech.com/docs/neo-dao-functions#getmultibody) .

## getLatestDataFlowStatus

The `getLatestDataFlowStatus()` function retrieves the status of the most recently executed dataflow.