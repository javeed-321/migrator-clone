---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Data Scopes

# Overview

A connected organisation API requires authentication from either a parent or a child organisation. The data scope header determines what data you can access based on your authentication. It allows you to retrieve data from the parent or child organisation, depending on your authentication.

These are types of data scopes and their behaviour for GET and POST calls:

# GET

| Data Scope | Authenticating Organisation                                                                          | Description                                                                                                                                                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **SELF**   |                                                                                                      | The SELF scope provides access to data from the authenticating organisation.                                                                                                                                                                                                               |
|            | **Parent authentication**                                                                            | The response data is limited to the parent organisation.                                                                                                                                                                                                                                   |
|            | **Child authentication**                                                                             | The response data is limited to the child organisation.                                                                                                                                                                                                                                    |
|            |                                                                                                      | **Note:** The data scope defaults to SELF if no header is provided.                                                                                                                                                                                                                        |
| **OTHER**  |                                                                                                      | The OTHER scope allows access to data from a different child organisation within the same connected organisation. You can list up to two child organisations separated by commas in the `DATA-SCOPE-ORGS` parameter.                                                                       |
|            | **Parent authentication:**                                                                           | You can view response data from any specific child organization listed in the `DATA-SCOPE-ORGS` parameter.                                                                                                                                                                                 |
|            | **Child authentication** with the child organisation ID specified in the `DATA-SCOPE-ORGS` parameter | You can view response data from the authenticated child organization specified in the `DATA-SCOPE-ORGS` parameter. This is similar to using the SELF data scope with child authentication. **Note:** It is mandatory to specify the child organisation in the `DATA-SCOPE-ORGS` parameter. |
| **ALL**    |                                                                                                      | The ALL scope provides a unified view of data from both the parent and child organisations.                                                                                                                                                                                                |
|            | **Parent authentication:**                                                                           | You can view response data from the parent and all child organisations within the connected organisation.                                                                                                                                                                                  |
|            | **Child authentication:**                                                                            | You can view response data from both the parent and that specific child organisation only.                                                                                                                                                                                                 |
|            |                                                                                                      | **Note:** A maximum of two child organisation IDs are currently supported. A parent organisation with more than two children in the connected organisation cannot use the ALL scope and will result in an error. The ALL data scope can be used for GET calls only.                        |

# POST

| Data Scope | Authenticating Organisation | Description                                                                                                                                                              |
| ---------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **SELF**   |                             | The SELF scope sends data to the authenticating organisation.                                                                                                            |
|            | **Parent authentication**   | The data sent is limited to the parent organisation. For example, issuing a reward to parent org using parent org authentication.                                        |
|            | **Child authentication**    | The data sent is limited to the child organisation. For example, issue a reward to child org using child org authentication.                                             |
|            |                             | **Note:** The data scope defaults to **SELF** if no header is provided. No **org ID** is required in the header.                                                         |
| **OTHER**  |                             | The OTHER scope sends data across parent and child organisations.                                                                                                        |
|            | **Parent authentication**   | The data is sent to the child organisation, specified in the `DATA-SCOPE-ORG` header. For example, issuing a reward to a child organisation using parent authentication. |
|            | **Child authentication**    | Not Supported                                                                                                                                                            |

<br />

**NOTE:** The ALL data scope can be used for **GET** calls only. It is currently not supported for **POST** API calls.