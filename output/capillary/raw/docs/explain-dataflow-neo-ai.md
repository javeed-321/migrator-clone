---
updatedAt: 2026-06-22T13:03:23.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Summarize a Dataflow

You can ask Aira Coder to explain what a dataflow does. This helps you understand complex flows and validate logic.

![](https://files.readme.io/d71f756a94c5c1486a16bfd454b484df73d0821e52f8d66c589a729f8eba4e86-data_flow_6.gif)

<br />

**Example Prompt 1:**

```json Prompt
explain this dataflow
```

````json Response
Dataflow Explanation
This dataflow is designed to fetch extended field configuration data from the Capillary InTouch API with proper authentication and error handling.

Block Breakdown
1. prepareBody (Script Block - Source)
Type: Script Block (Entry Point)
Purpose: Prepares authentication headers for the API call
Configuration:
- Retrieves the organization ID from incoming request headers (`x-cap-api-auth-org-id`) - Sets up authentication with a hardcoded API token - Returns headers object containing: - `X-CAP-API-AUTH-KEY`: Static authentication token - `X-CAP-API-AUTH-ORG-ID`: Organization ID from incoming request
Flow: On successful execution (`isSuccess()`), proceeds to `ActualCall` block
2. ActualCall (APIRequest Block)
Type: API Request Block
Purpose: Makes the actual GET request to fetch extended field configuration
Configuration:
- Method: GET - URL: `
https://eu.intouch.capillarytech.com/v2/entity/extendedFieldConfig`
- Uses headers prepared by the `prepareBody` block
Flow:
- On success (`isSuccess()`): Routes to `getResponse` block - On error (`hasError()`): Routes to `getError` block
3. getResponse (Script Block)
Type: Script Block
Purpose: Processes successful API response
Configuration:
- Retrieves the response body from `ActualCall` block using `getBody("ActualCall")` - Returns the response data in a structured format
Flow: Terminal block (no further relations)
4. getError (Script Block)
Type: Script Block
Purpose: Handles API call failures
Configuration:
- Constructs an error response object with: - `status`: 500 (Internal Server Error) - `success`: false - `message`: Contains the error details from `ActualCall` block
Flow: Terminal block (no further relations)
Flow Relationships
``` prepareBody (Script) ↓ [isSuccess()] ActualCall (APIRequest) ↓ [isSuccess()] ↓ [hasError()] getResponse (Script) getError (Script) ```

Overall Working
This dataflow implements a secure API proxy pattern with the following workflow:

Authentication Setup: The flow begins by preparing authentication credentials, extracting the organization ID from the incoming request and combining it with a static API token.
API Call Execution: The prepared headers are used to make a GET request to the Capillary InTouch API endpoint for extended field configuration.
Conditional Response Handling:
- Success Path: If the API call succeeds, the response data is extracted and returned to the caller - Error Path: If the API call fails, an error response with status 500 is constructed and returned
This pattern ensures proper authentication, clean error handling, and structured response formatting for retrieving extended field configuration data from the Capillary platform.
````

**Example Prompt 2:**

```json Prompt
explain the block 'prepareBody'
```

````json Response
Explanation of the 'prepareBody' Block
What is the 'prepareBody' Block?
The 'prepareBody' block is a Script block in the NEO Dataflow that serves as the entry point (source block) of this workflow. Its primary purpose is to prepare authentication headers required for making an API call to the Capillary InTouch platform.

Block Configuration Details
Type and Position
Block Type: Script Block
Position: Starting point of the DAG (x: 320, y: 0)
Source Block: Yes (marked as `"source": true`)
Execution Strategy: "and" (all conditions must be met)
Functionality
The block executes custom JavaScript code that:

Retrieves Organization ID: Extracts the organization ID from the incoming request's effective headers using `getEffectiveHeaders()['x-cap-api-auth-org-id']`
Sets Authentication Token: Defines a hardcoded authentication token value: `"Qjc0M0ExMDE0MDBBMTUzRDVFRTVFNDI0N0Q5QzAxOEI="`
Returns Authentication Headers: Creates and returns a headers object containing:
- `X-CAP-API-AUTH-KEY`: The authentication token - `X-CAP-API-AUTH-ORG-ID`: The extracted organization ID
Output Structure
``` { headers: { 'X-CAP-API-AUTH-KEY': 'Qjc0M0ExMDE0MDBBMTUzRDVFRTVFNDI0N0Q5QzAxOEI=', 'X-CAP-API-AUTH-ORG-ID': } } ```
Relationship with Other Blocks
The prepareBody block has one outgoing relation:

Relation Name: "6gUJJQOQvV"
Condition: `isSuccess()` - executes only if the script completes successfully
Target Block: "ActualCall" - an API Request block that makes the actual HTTP GET call to fetch extended field configurations
Role in the Overall Workflow
The prepareBody block acts as the authentication preparation layer in this workflow. It ensures that the subsequent API call to the Capillary InTouch platform (`ActualCall` block) has the necessary authentication credentials by:

Dynamically extracting the organization context from the incoming request
Combining it with a static authentication token
Passing these headers forward to authorize the API request
This design pattern separates authentication logic from the actual API call, making the workflow more maintainable and modular.
````

<br />