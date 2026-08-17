---
updatedAt: 2026-03-09T05:51:57.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Composing a Dataflow

To create and compose a new [dataflow](https://docs.capillarytech.com/docs/dataflows), perform the following:

1. Navigate to the Neo extension portal [\{host url}/extensions/neo/ui]()         and select the organization in which you want to create the dataflow.
2. (Optional) Select an [application](https://docs.capillarytech.com/update/docs/using-applications#/) from the drop-down list to create the dataflow inside that application.
3. Click **Create new dataflow** and enter a name for the dataflow in the **Name** field.
4. (Optional) [Create or assign a tag](https://docs.capillarytech.com/docs/tags-filters-in-dataflow) for the dataflow.
5. Click **Done**.\
   The dataflow is created on the **Dataflows** page under the **[My Dataflows](https://docs.capillarytech.com/docs/execution-monitoring#execution-scope)** tab.
6. On the **Dataflows** page, click the dataflow.\
   The dataflow version page opens, showing the dataflow as version `v1` in `Draft` status.
7. Click on version `v1` of the dataflow.\
   The Neo UI canvas opens with the Trigger and Schema block.
8. Add [blocks](https://docs.capillarytech.com/docs/building-block-configuration) to the dataflow as required by clicking a node. To reuse common logic, use the [Helper Function block ](https://docs.capillarytech.com/docs/script-block#/using-script-block-to-define-reusable-logic)and [invoke](https://docs.capillarytech.com/docs/composing-a-neo_dataflow#/executing-script-block-with-reusable-logic) using the `dao.executeBlock()` function.\
   **Note**: Blocks do not follow a fixed sequence; arrange them logically based on requirements.
9. Click **Save**.
10. [Test the dataflow](https://docs.capillarytech.com/docs/execution-monitoring) using an API testing tool.
11. Click **Send for Approval** to submit the dataflow for [approval](https://docs.capillarytech.com/docs/approval-flow).\
    The dataflow status changes to `Awaiting approval`.

<Image align="center" alt="Composing a dataflow" border={true} caption="Composing a dataflow" src="https://files.readme.io/4aa4d40d857aa34e5fd30c5df0eaa188389c1c8ce93c8f4d8bbcb54eba2d0b21-compose_dataflow.gif" />

## Executing script block with reusable logic

You can run a script block with reusable logic (<Anchor label=" helper function block " target="_blank" href="https://docs.capillarytech.com/docs/script-block#/using-script-block-to-define-reusable-logic"> helper function block </Anchor> ) using the `dao.executeBlock()` function. This function calls a Script block from the block library and passes input arguments to it. The called block processes the input and returns a response.

### Steps to execute a helper function block

1. Create and publish the helper function block in the block library.
2. In your main Script or Schema block, import `dao` from `"neo/dao"`.
3. Use `dao.executeBlock()` to run the helper block:

   * Pass the helper block name as the first argument.
   * Pass input arguments as additional parameters.
   * Use the `await` keyword to wait for the block's response.

   **Example:**

   ```javascript Usage of executeBlock
   const validationResult = await dao.executeBlock("validateMobileNumber", mobile);
   ```

   * `validateMobileNumber` is the name of the helper block.
   * `mobile` is the input value.
   * `validationResult` stores the response returned by the helper block.

## Example scenario

**Requirement**\
During a dataflow execution, you need to:

* Validate a mobile number.
* Calculate the total amount, including tax.

### Script block using `executeBlock`

```json executeBlock
import dao from "neo/dao";
import logger from "neo/logger";

const script = {
  execute: async () => {
    const mobile = "+1234567890";
    const amount = 100;
    const tax = 18;

    // Call the mobile number validation helper block
    const validationResult = await dao.executeBlock("validateMobileNumber", mobile);

    if (!validationResult.isValid) {
      return { error: "Invalid mobile number" };
    }

    // Call the tax calculation helper block
    const totalAmountResult = await dao.executeBlock("calculateTotalAmount", amount, tax);

    return {
      validatedMobile: validationResult.cleanedNumber,
      totalAmount: totalAmountResult.amountWithTax
    };
  }
};

export {
  script as default
};
```

### What this script does

1. **Create and publish helper blocks**\
   The blocks `validateMobileNumber` and `calculateTotalAmount` are saved to the block library.

2. **Import`dao`**\
   The main Script block imports `dao` to access DAO functions like `executeBlock()`.

3. **Call`executeBlock()` with block name and arguments**

   * Pass `"validateMobileNumber"` and `mobile` to validate the number.
   * Pass `"calculateTotalAmount"` along with `amount` and `tax` to compute the total.

4. **Use`await` to get the result**\
   The `await` keyword pauses execution until the helper block returns a response. This ensures that you work with the actual result.

### **Best practices**

* Include only the required blocks in your dataflow to improve performance.
* Use clear, descriptive block names that reflect the block’s purpose.
* Document the expected arguments and their order for each block.
* Validate all input arguments inside the block using `getFunctionArguments()`.
* Always use the JavaScript keyword `await` with `executeBlock` to ensure proper execution flow.

### **Limitations**

* Only blocks included in the current dataflow's block library can be executed.
* Execution is asynchronous and must be awaited.
* Each block defines its response format; there is no standard structure.
* Arguments must be accessed by index, not by name.
* Blocks must be explicitly added to the dataflow to be executable.