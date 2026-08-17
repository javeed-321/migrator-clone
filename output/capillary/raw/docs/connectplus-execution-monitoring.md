---
updatedAt: 2026-03-09T10:56:54.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Execution & Monitoring

# Execution of a Dataflow

After creating a dataflow, you can integrate it into applications. You can also import it to any API testing tool and execute or test it.

## Copying a dataflow cURL

To copy the dataflow cURL,

1. **Identify the Dataflow Scope:**\
   Go to the **Dataflows** page and select the tab based on the dataflow’s scope:

   * **My Dataflows** → For dataflows within your organization.

   * **Global Dataflows** → For dataflows at the global level.

     <Image align="center" className="border" width="100% " border={true} src="https://files.readme.io/822892a81b21e98b9053e7dc5251f22b991a9a055f89843f3cc38d133879f0a9-Dataflow_execution_my_global_dataflow.png" />

2. **Select the Dataflow:**

* Click the dataflow you want to execute.

* Choose the version you want to run.

3. **Copy the cURL:**\
   On the dataflow composition page, hover over **Copy curl** and click to copy the required cURL.

   * B2B cURL → Use this when one system interacts with another (business to business).

   * B2C cURL → Use this for customer-facing interactions where the system communicates directly with end users.

   > 📘 Note
   >
   > * B2B cURL: Uses OAuth or Basic authorization.
   > * B2C cURL: Uses mobile OTPs or social logins for authorization.

   <br />

   <Image align="center" className="border" border={true} src="https://files.readme.io/e6dd96501e5f5770acc2df22346caf222208f85c343e84ec09878ac9784b00b1-copy_curl_dataflow_execution.png" />

## Executing a cross-organizational dataflow

Cross-organizational dataflows allow execution across different organizations.

### Execution scope

* **Global Dataflows:** Defined at the global organization level and accessible to all organizations.
* **Parent Dataflows:** Defined in a parent organization and accessible to both self and its child organizations. Applicable for Connected Organizations.
* **Organization Dataflows**: Defined in your organization and available only for your organization.

> 📘 Note
>
> * Global dataflows execute within the context of the calling organization, even though they are globally defined.
> * Context Switching: Execution can switch from a parent organization to its child organization using a "context switch" block. However, execution cannot switch from a child organization to its parent.
> * A parent organization cannot execute a dataflow from a child organization.

### Testing a cross-organizational dataflow

1. [Copy the dataflow cURL](https://docs.capillarytech.com/docs/execution-monitoring#copying-a-dataflow-curl).

2. Import the cURL Command into an API testing tool.

3. Set the `x-cap-neo-dag-scope` Header.

   * `global`: Executes a dataflow from the global organization.
   * `parent`: Executes a dataflow from the parent organization.
   * `org`: Executes a dataflow from your organization.

4. Enter Body Parameters

   * For `POST` and `PUT` methods, provide the necessary request body parameters.

5. Execute the Dataflow

   * Run the cURL command from the API testing tool.

# Observability & monitoring

You can view and analyze the performance of your Neo API, the APIs used in the Neo dataflow, view the logs, etc, using the [Dev Console](https://docs.capillarytech.com/docs/dev-console). The Dev Console helps in the monitoring and debugging process for the dataflow.