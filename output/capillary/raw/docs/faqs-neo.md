---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

1. What versions of Capillary APIs does Neo support?\
   **Answer**: Neo supports V1 and V2 APIs.
2. What are the versions of an API in Neo?\
   **Answer**: A new version of the API is created every time you make changes and save. They are represented as V1, V2 and so on.
3. Which version of a dataflow is executed on triggering the API?\
   **Answer**: By default, the Live version of the dataflow is executed.
4. What are the different statuses of an API?\
   **Answer**: An API has three states: `Draft`, `Waiting for approval`, `Approved`, and `Live`. By default, an API starts in the `Draft` state. It moves to the `Waiting for approval `state after being sent for Neo admin approval. Once the Neo admin approves it, the state changes to Approved.\
   Approved versions can be made `Live`, but only one approved version of an API can be `Live` at any time.
5. What is variant ID? Why is it required?\
   **Answer**: A variant ID is a unique identifier for a specific version of an API. It is obtained from the URL of the API version and is required to execute an API that is not Live.\
   The variant ID is essential for testing and managing different versions of an API that are not in the Live state. It is not recommended for use with Live dataflows.\
   **Example**: Consider the link, `https://{host}/extensions/neo/ui/rule/7d6b2730-ab4c-400e-80b6-bda8a7a6236e/version/20c8c7ab-626a-47c9-b1dd-00ed3939e1cd`\
   The string after ‘version’ forms the variant ID. In this example, the variant ID is **20c8c7ab-626a-47c9-b1dd-00ed3939e1cd**.
6. How do you check the performance of an API?\
   **Answer**:  There is a dashboard to check the performance of an API. It gives you information about how many calls go through, the success and failure rate. You can access the dashboard using the following link,\
   [https://\{host\_name}/devconsole]().
7. Can you delete a dataflow?\
   **Answer**: You cannot delete a dataflow, but deactivate it. A deactivated dataflow will appear as Inactive in the Neo Extension UI. You can reactivate the dataflow at any time. On deactivation, all versions of the dataflow are deactivated.
8. How do you deactivate and activate a dataflow?\
   **Answer**: A dataflow is active by default when created. Follow these steps to activate or deactivate a dataflow using the menu on the dataflow page, where all versions are visible.

   <Image align="center" border={true} width="85% " src="https://files.readme.io/2d2a9aa008e9496877a1c7a2a0babfa7114be96d87c63c330985423b4c616595-act_deact_neo.png" className="border" />

   To deactivate,

   1. Click on the dataflow name.
   2. Navigate to the ellipsis menu.
   3. Click **Deactivate dataflow**.

   To activate,

   1. Click on the dataflow name.
   2. Navigate to the ellipsis menu.
   3. Click **Activate dataflow**.
9. Can I roll back a Live version?\
   **Answer**: The dataflows in Neo extensions are version-controlled. You can roll back one version and make another version Live. Currently, it takes around 10 minutes for a version to become Live.
10. How do we migrate the dataflows from one environment to another?\
    **Answer**: Migration of dataflows from one environment to another is done using the [copy and paste feature](https://docs.capillarytech.com/docs/copy-and-paste-a-dataflow) in Aira Coder.
11. What are tags?\
    **Answer**: Tags are keywords or labels assigned to the dataflow to help categorise and organise. They help improve the searchability and retrieval of related dataflows. You can add up to 5 tags to a dataflow and create 100 tags per organisation.
12. Can webhooks be leveraged in the flow?\
    **Answer**: Webhooks can be used in this flow. Webhooks typically communicate with external Capillary endpoints. We currently have event notifications for this purpose.
13. Will Neo support the transformation of XML format or SOAP APIs?\
    **Answer**: No, not at this point.
14. How to ensure atomicity while working with multiple APIs and a database?\
    **Answer**: Transaction-level atomicity is managed by the flow design. Atomicity across APIs is not yet supported.