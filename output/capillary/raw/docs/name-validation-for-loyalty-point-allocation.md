---
updatedAt: 2026-08-17T09:31:17.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customer Name Validation for Loyalty Point Allocation

## Requirement

An airline brand needs a validation mechanism to ensure that the first name and last name provided during a flight booking match the customer profile stored on Capillary’s platform. This validation is essential to ensure that loyalty points are allocated to the correct customer.

If the provided names do not match either the primary names or any of the stored alternate names (aliases) in the customer profile, the system will not allocate loyalty points.

Currently, Capillary’s platform does not offer built-in validation to compare the airline’s booking data with the stored customer records.

## Solution

To solve this, create [a Neo dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/daec5cfa-be66-4d5d-b021-c2f45c3aa322/version/9204edc5-0386-4326-9ef8-9988fe690b64?ruleType=org) that compares the passenger names from the airline record with those stored in the Capillary system.\
**Note**: To view the dataflow, make sure you have access to DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

### Step one: Use Schema block to validate input parameters

Perform schema validation to ensure that all mandatory parameters are present. If any parameter is missing, return an appropriate error response. The required input parameters are:

* FFN (Frequent Flyer Number)
* First Name (Fname)
* Last Name (lname)

Handle validation failures with the appropriate error messages.

### Step two: Use the Script block to create payload for the GET Customer API

Use the Script block to construct valid headers and query parameters, transform data to create a request payload for the GET Customer API call by following these steps:

* Fetch the input query parameters.
* Remove unnecessary or error-prone headers.
* Build the query using the required values: `externalId`  (FFN) and `source`.

### Step three: Use API Request block to invoke GET Customer API with the appropriate query parameters

Use the API Request block to invoke the [https://\{host}/v2/customers/lookup/customerDetails]().

### Step four: Use the Script block to compare names

Use the Script block to verify whether the combination of First Name and Last Name from the airline's booking data matches any of the following:

* Primary name in the customer profile
* Any of the alternate names (alias1, alias2, alias3)

If there’s a match, return a success response. If not, return a failure response.