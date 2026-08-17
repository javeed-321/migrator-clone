---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Script Block

The **Script Block** in a dataflow allows you to execute custom JavaScript code. You can use the **Script Block** to modify the dataflow to meet specific requirements, such as altering the request payload format to match an API’s expectations or applying logic to transform and enrich API responses. **Access to data** is managed through   [Data Access Object (DAO) functions](https://docs.capillarytech.com/docs/neo-dao-functions) and the **Business logic** can be defined using JavaScript methods.

Using the Script block, you can define and execute custom functions such as transforming API responses and modifying the request payload based on your requirements. It supports both single-line statements in the form of expressions and complex scripts to implement business logic.

# Example scenario

**Requirement**:\
Consider a scenario where you need to add multiple execution paths after a validation block in a dataflow for an airline brand. The validation block validates the input against a schema in the Schema block. The result of this validation can be either **success** or **failure**, and you need to define separate execution paths for each outcome:

1. **If the validation succeeds**: The system should retrieve customer details to proceed with issuing loyalty points.
2. **If the validation fails**: The system should return appropriate error messages and codes.

**Solution**\
To handle these scenarios, you can add Script blocks after the [Schema block](https://docs.capillarytech.com/docs/json-schema-block). These scripts will manage the success and failure paths.

## For a successful validation

When the validation succeeds, use the Script block to prepare the request for fetching customer details. This involves the following steps:

1. Remove Unnecessary Headers:\
   Certain headers can cause errors if they contain invalid values. Remove the following headers:
   * `X-cap-neo-test-variant-id`
   * `X-cap-api-attribution-entity-type`
   * `x-cap-api-attribution-entity-code`
   * `x-cap-api-attribution-till-code`
2. Format Query Parameters:\
   Format the parameters to match the expected input of the Get Customer Details API:
   * Set `FFN` as `externalId` to align with the API’s input format.
   * If the `source` parameter is missing, set it to `INSTORE`.
3. Send the Request:\
   Include the following headers and query parameters in the API request:
   * `identifierName` (e.g., `externalId` or `FFN`)
   * `source` (e.g., `INSTORE`)

Below is an example of the script you can use in the Script block for the validation success scenario:

```json
import dao from "neo/dao";


const {
    getEffectiveHeaders,
    getApiRequest
} = dao;


const script = {
    execute: () => {
        const requestQueryParams = getApiRequest().queryParams;
       
        let requestHeaders = getEffectiveHeaders();
        // Remove these headers because customer lookup api will throw error incase invalid values are passed here
        delete requestHeaders["x-cap-neo-test-variant-id"];
        delete requestHeaders["x-cap-api-attribution-entity-type"];
        delete requestHeaders["x-cap-api-attribution-entity-code"];
        delete requestHeaders["x-cap-api-attribution-till-code"];


        let queryParameters = {
            "identifierName" : "externalId",
            "identifierValue" : requestQueryParams.FFN,
            "source" : requestQueryParams.source ? requestQueryParams.source.toUpperCase() : "INSTORE"
        }
        return {
            headers : requestHeaders,
            queryParams : queryParameters
        };
    }
}


export {script as default}

```

## For a failed validation

If the validation fails, use the Script block to generate a structured error response by,

* Retrieving validation errors
* Transforming the error into JSON format with the appropriate error code and message
* Returning an HTTP response with error details

Below is an example of the script in the Script block to handle the failure scenario.

```json
import dao from "neo/dao";


const {
    getIn,
    getEffectiveHeaders
} = dao;


const script = {


    execute: () => {


        const validationErrors = getIn()?.err;
        const errorArr = validationErrors.map((currErr) => {
            return {
                "status": false,
                "code": 6001,
                "message" : currErr.message,
                "path" : currErr.instancePath
            }
        })
        return {
           http: {
               "res": {
                    status : 400,
                    "json": {
                        "errors" : errorArr
                    }
               }
           }
        }
    }


}


export {script as default}

```

Refer to this example [dataflow ](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/daec5cfa-be66-4d5d-b021-c2f45c3aa322/version/9204edc5-0386-4326-9ef8-9988fe690b64?ruleType=org) to understand how it is configured for a use case. Make sure that you have access to DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

# Configuring Script block

To configure the Script block, perform the following:

1. From the dataflow canvas, click on the connector.
2. Select the Script block from the pop-up window.
3. In the **Block name** section, enter the block name.\
   **Note**: Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
4. In the **Script** section, write a script to meet your requirements. You can also use the **autocomplete feature** to select a DAO function and block name from the dropdown list. To do this:

   1. Start typing a DAO function within the execute object to trigger the autocomplete dropdown for DAO functions.

      <Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/a7cf612387baa18e16a313ae794ff3131c3fbceefaf81fced52faebe68fac71b-Screenshot_2025-07-04_at_6.57.51_PM.png" />

   2. Select the required DAO function from the drop-down list or click on `tab` to select the highlighted function. You can hover over the DAO function to view its syntax, parameters, and usage examples.

      <Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/8db37e60f04014ace938055ab8f51601f22e615471efb994d2e0df6ea83739cf-Screenshot_2025-07-04_at_7.00.31_PM.png" />

   3. Start typing an open parenthesis `(` to trigger the autocomplete dropdown for block names. The dropdown lists the block name and the block type in the following format: `blockName (Block Type)`.

      <Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/0564b32c710d2cc852839b33e42778dc8319c23f783b9263d39e3975ac0d4c74-Screenshot_2025-07-04_at_6.58.50_PM.png" />

   4. Select the required block name from the drop-down list or click on `tab` to select the highlighted block name. You can use the arrows on the page indicator to choose a specific block if there are multiple block of the same type.

   > 📘 Note
   >
   > The DAO object is already defined in the script block and it is not required to prefix function names with `dao.`. You can use the function name directly.
5. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
6. Select **Done** to save the changes.

<Image align="center" alt="Configuring the Script block" border={true} caption="Configuring the Script block" src="https://files.readme.io/ac4f8046ae3f6183b60aa20bbde812db274317b93910ba26510165c3968a069b-13.02.2025_19.37.05_REC_configuring_script.gif" width="80% " />

# Using Script block to define reusable logic

You can reuse common logic by writing it in a Script block and <Anchor label="adding the block to the library" target="_blank" href="https://docs.capillarytech.com/docs/block-libraries#/adding-a-block-to-a-version">adding the block to the library</Anchor>. The Script block containing the reusable logic is called a **Helper Function block**. You can <Anchor label="execute the helper function block" target="_blank" href="https://docs.capillarytech.com/docs/block-libraries#/executing-the-helper-function-block">execute the helper function block</Anchor> using the DAO function, [executeBlock](https://docs.capillarytech.com/docs/neo-dao-functions#/executeblock).

The helper function blocks are useful for handling repetitive tasks such as validations, calculations, and data transformations. You can pass input values to these blocks during execution. The block uses those inputs and returns a response based on its logic. The input values (arguments) are passed using the DAO function [getFunctionArguments](https://docs.capillarytech.com/docs/neo-dao-functions#/getfunctionarguments).

## Common use cases

**Validations**

* Mobile number format check
* Email validation
* Required field checks

**Calculations**

* Tax or price calculations
* Currency conversion
* Statistical functions

**Data Transformations**

* Field normalization
* Format conversion

**Utilities**

* Logging and auditing
* Common business logic
* Conditional routing

## Example: Helper function block to validate a mobile number

To reuse common logic like validating a mobile number, you can create a **Helper function block** (Script block that contains this reusable logic) and add it to the block library.

The following example defines a helper function block named `validateMobileNumber`. This block checks whether the provided mobile number follows a valid format.

#### What the script does

* Uses `dao.getFunctionArguments()` to get the input arguments.
* Extracts the first argument and stores it in `mobileNumber`.
* Validates the number using a regular expression: it must start with a `+` and be followed by exactly 10 digits.
* Returns an object with:

  * `isValid`: a boolean indicating if the number is valid.
  * `message`: a confirmation message.

```json Sample helper function to validate mobile number
// Block Library Block Implementation
const validateMobileNumber = {
  execute: () => {
    // Access the mobile number argument
    const args = dao.getFunctionArguments();
    const mobileNumber = args[0]; // First argument passed to executeBlock
    
    // Perform validation
    return {
      isValid: /^\+[0-9]{10}$/.test(mobileNumber),
      message: "Valid mobile number"
    };
  }
};
```