---
updatedAt: 2026-04-14T08:31:54.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create a Dataflow

With Neo Extensions, you can now generate dataflows using natural language prompts through the built-in AI assistant, **Aira Coder**. This simplifies the workflow creation process, reducing manual effort and speeding up development. The following are the steps to create a dataflow using Aira coder:

1. From the Aira Coder, enter your prompt describing what you want to build.
   * Neo uses Retrieval-Augmented Generation (RAG) to enrich your prompt with context.
   * The LLM identifies required building blocks such as Schema, Script, or API blocks.

2. Click the **Send** icon to submit the prompt.\
   AIRA returns a proposed dataflow with a step-by-step explanation and a preview. As per the requirement, the coder can also create queries in [EJSON](https://docs.capillarytech.com/docs/put-mongo#/extended-json-ejson) format in the `getMongo` and `putMongo` block.

3. To preview the dataflow that is created, click the **View Preview** icon. The preview option also displays a detailed code difference between the current version and the previous version of the dataflow.

   <Image align="center" border={true} src="https://files.readme.io/6ae618236fcde6eb5e9d368863c575f78d833fa36efe9b9c0f45de0865297227-GIF3_10.gif" className="border" />

4. Review the changes.

5. Click **Close Preview** to close the preview without making any changes.

6. To accept or reject changes, open the **AIRA Coder** modal by clicking **AIRA Coder**. In the modal, you can:
   * **Accept Preview** – Save and apply the AI-generated changes.

   * **Reject Preview** – Discard the AI-generated changes.

<Image align="center" border={true} src="https://files.readme.io/79db33ac6356e1bc71883ba891146f3be3fa4d55820a26f22bf8a4a7e37996c0-Accept-rejectpreview.png" className="border" />

# Testing and Executing the Dataflow

Before execution:

* Update the **API URL** in the **Trigger block**
* Save the dataflow

To test and monitor execution, refer to the [Execution & Monitoring guide](https://docs.capillarytech.com/docs/execution-monitoring).

# Prompting Best Practices

To get the best results from AIRA, follow these tips:

* Use clear and specific language
* Write in full sentences or step-by-step instructions
* Avoid vague prompts like `Hi` or `Help`

### **Example Prompt 1**

```plaintext Example Prompt 1
Create a dataflow to perform the following:
1. Take input: FFN, Fname, Lname
2. Validate the parameters
3. Fetch customer details
4. Extract names for alias check
5. Perform alias validation
```

### **Example Prompt 2**

```
Create a dataflow that can search customer details from mongo collection 'customer_info' from date greater than '2025-10-25'
```

### Response for prompt 2

The screenshot below shows the dataflow created for the prompt above. Here, in the `getMongo` block the AIRA coder has generated the query in the [EJSON](https://docs.capillarytech.com/docs/put-mongo#/extended-json-ejson) format.

<Image align="center" border={true} src="https://files.readme.io/c6ec5153d6c4fbe9b4f37f49171700b7804be128ffd0779d995cbca87406b1d9-Screenshot_2025-10-29_at_12.48.51_PM.png" className="border" />

<Image align="center" border={true} width="75% " src="https://files.readme.io/e91a682df822a046e272cb87b7bf3a0ec23926337b7303157fa51830b95a3cba-Screenshot_2025-10-29_at_2.03.11_PM.png" className="border" />

<br />