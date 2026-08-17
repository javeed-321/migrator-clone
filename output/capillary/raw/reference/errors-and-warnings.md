---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# API status codes

This page provides you information regarding the errors and warnings that might occur during API calls.

API responses are generated at the request level and item level.

* Request Level Responses: These response codes are generated at the request level (for an entire request).
* Item Level Responses: These response codes are generated at individual items of a request.

For instance, assume that a batch API call is made to add multiple transactions. The entire request will have a status (successful, failed or partial success) and each transaction item will have its own response code element. You can see API level response in the element and item level in the element.

# Request level response codes

> 📘 **Note**
>
> There are two types of failure cases - Errors and Warnings. Errors occur when the main activity fails - it could be due to internal error or incorrect input. Warnings occur when the primary activity is succeeded, but the secondary activity/activities failed.

| Code | Description                                                                                                                                                                                                      |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200  | Global request success.                                                                                                                                                                                          |
| 201  | One or more requests have failed due to errors.                                                                                                                                                                  |
| 400  | Invalid input. Please check request body parameters or input xml/json.<br />Invalid path parameter.<br />Invalid X-CAP-API-ATTRIBUTION-LOOKUP-TYPE specified.<br />Error with range passed or array in indexing. |
| 401  | Authentication failed. Please check username and password.                                                                                                                                                       |
| 403  | V2 is not enabled for the org.<br />Mandatory field is missing. Field `\{x\}` is mandatory.                                                                                                                      |
| 404  | Incorrect resource or resource not found.                                                                                                                                                                        |
| 405  | The operation is not supported for the resource.                                                                                                                                                                 |
| 415  | Unsupported media type. Occurs when the Content-Type is not defined properly. for JSON, `Content-Type` should be `application/json`.                                                                             |
| 461  | Search Engine is busy or unable to respond. Please try after some time.                                                                                                                                          |
| 500  | Requests have failed due to errors.                                                                                                                                                                              |
| 521  | Multiple actions are running for the same customer. Please try after some time.                                                                                                                                  |
| 1060 | Batch limit size exceeded.                                                                                                                                                                                       |
| 1061 | X-CAP-API-ATTRIBUTION-LOOKUP-TYPE header required with X-CAP-API-ATTRIBUTION-LOOKUP header.                                                                                                                      |
| 1062 | Invalid test and control status.                                                                                                                                                                                 |
| 1064 | Invalid org ID passed.                                                                                                                                                                                           |
| 503  | Authorization status is unavailable. Make sure that your API resource has appropriate access control permissions.                                                                                                |
| 403  | Access denied. Make sure that your API resource has appropriate access control permissions.                                                                                                                      |

# Item level response codes

Each entity has a different set of response codes. Item-level response codes for each entity are provided in the respective entity section.