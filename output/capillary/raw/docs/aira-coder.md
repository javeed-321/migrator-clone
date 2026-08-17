---
updatedAt: 2026-05-21T06:47:26.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# aiRA Coder

Know what aiRA coder is and it's capabilities

Connect+ includes a built-in AI assistant called aiRA Coder. It is integrated directly into the dataflow canvas and lets you build, understand, and manage dataflows through plain-language conversation. Instead of assembling every block manually or writing transformation scripts from scratch, you describe what you want and aiRA Coder generates the result.

aiRA Coder is available by default in the Connect+ UI. No separate setup is required. You access it by clicking the  icon in the bottom-right corner of any dataflow canvas.

aiRA Coder is particularly useful for bridging the gap between technical and non-technical users. Standard integration patterns can be generated without knowing which blocks to select or what scripts to write. For experienced developers, it speeds up repetitive configuration tasks and makes it easier to understand flows built by others.

## How aiRA Coder works

Every prompt you enter goes through a five-step process before any output is shown on the canvas.

1. **Prompt enrichment**: The system enhances your input using Retrieval-Augmented Generation. Relevant context and examples are added to your prompt before it reaches the language model.

2. **Intent interpretation**: The language model analyses the enriched prompt and identifies what you are trying to accomplish.

3. **Dataflow generation**: Based on the interpreted intent, the system generates a draft configuration. This includes the required blocks, connections, and any transformation scripts.

4. **Validation**: A system-level validator checks the generated output for missing or misconfigured blocks, empty nodes, and syntax issues in script blocks.

5. **Preview and explanation**: The validated draft appears on the canvas alongside a step-by-step explanation of each block. You can accept the output, request changes with a new prompt, or discard and regenerate.

## Accessing aiRA Coder

To open aiRA Coder from the Connect+ UI,

1. Log in to Connect+ and open any dataflow.
2. Click any version on the version listing page to open the canvas.
3. Click the icon in the bottom-right corner of the canvas.

   <Image src="https://files.readme.io/7306cd6bdfa7121e34054a3cb75700f3dfcec0ca91dfc7015cfc2b133113d1be-Screenshot_2026-04-14_at_10.57.55_AM.png" align="center" border={true} />

The aiRA Coder panel opens. You can type a prompt and click the **Send** icon to submit it.

## Capabilities

aiRA Coder supports five distinct capabilities. Each is described below with guidance on when to use it and example prompts.

### Create a dataflow

You can describe a dataflow requirement in plain language and aiRA Coder generates the full block sequence, including transformation scripts where needed.

This is the fastest way to start a new dataflow when a matching global template does not exist or when your use case has specific requirements that a template does not cover.

**When to use this**: When building a new dataflow from scratch and you have a clear description of the source, transformation, and destination.

**How to use it**:

1. Create a new dataflow and open the canvas.

2. Click the chat icon in the bottom-right corner to open aiRA Coder.

3. Select **Create dataflow**.<br />A list of templates appears.

4. Select a template or enter a prompt to create a dataflow based on your requirements.

   <Image src="https://files.readme.io/530633bc9538074f9bd197fd0f0cb4e2eb8a8c56be054b3d40f29d13ff001c55-Screenshot_2026-04-15_at_7.04.57_PM.png" align="center" width="80% " border={true} />

5. Click the **Send** icon to submit the prompt.<br />aiRA returns a proposed dataflow with a step-by-step explanation and a preview.

6. Review the changes.

7. Click **Close Preview** to close the preview without making any changes.

8. To accept or reject changes, open the **aiRA Coder** modal by clicking **aiRA Coder**. In the modal, you can:
   * **Accept Preview** – Save and apply the AI-generated changes.

   * **Reject Preview** – Discard the AI-generated changes.

<Image src="https://files.readme.io/fc4cd99432c8d05f90ae24afb6aee0e32480ecc820e6de9e61c095a39f475e63-Screenshot_2026-04-15_at_7.10.01_PM.png" align="center" width="80% " border={true} />

**Example prompts**:

* "Read a CSV file from SFTP, convert it to JSON, and call the InTouch v2 customer bulk API."
* "Create a dataflow that reads transaction data from FTP on a daily schedule and calls the transaction add API."

> 📘
>
> **Note**: aiRA Coder generates a starting configuration based on your prompt. Review the output and update any field mappings specific to your organization before making the dataflow live.

### Modify a dataflow

You can use aiRA Coder to update an existing dataflow in Draft state. Instead of editing block configurations manually, you describe the change you want, and aiRA Coder applies it.

Supported modifications include:

* Adding or removing blocks
* Changing filter conditions
* Updating JSLT transformation expressions
* Reconfiguring block properties such as API endpoints, group size, and error codes

**When to use this**: When you need to make structural or logical changes to a Draft dataflow and want to avoid manual block-level editing.

**How to use it**:

1. Open the dataflow in Draft state that needs modification.

2. Click the aiRA Coder icon.

3. Click  **Modify Dataflow** or enter a prompt describing the modification.<br />On clicking **Modify Dataflow** aiRA Coder lists common changes.

   <Image src="https://files.readme.io/4f68ead21174c7c1a7292257b1639a2663d4c6a900a51d7e1c28f2218dc81386-Screenshot_2026-04-16_at_1.39.32_PM.png" align="center" border={true} />

4. Click a suggested change or enter a prompt describing your modification  click the **Send** icon.<br />aiRA Coder generates the updated configuration and displays a preview.

   <Image src="https://files.readme.io/1be61cb0297de3e7371d06ca41c32c10dc024e91fb76bf847bbf1361b5b76177-Screenshot_2026-04-16_at_1.58.00_PM.png" align="center" border={true} />

5. Review the changes using the Preview icon.

   <Image src="https://files.readme.io/4f7a2d6d0aa29bdac1ebc46bd2d6f4123a41d794725b95253b5f7ee313e39798-Screenshot_2026-04-16_at_6.49.40_PM.png" align="center" border={true} />

6. After the review, click **Accept** to apply the changes to the canvas or **Reject** to discard the changes.

7. If you selected **Accept**, select **Yes, continue** on the confirmation modal.

   <Image src="https://files.readme.io/e4f6e5921a3e3c33f7893661e16ed3df69d3ce4366f8a8d7d4af452216f007ea-Screenshot_2026-04-17_at_1.27.48_PM.png" align="center" border={true} />

8. Click **Save**.

**Example prompts**:

* Update the group size in the Convert-CSV-to-JSON block from 10 to 20
* Add a filter block between the Convert-CSV-to-JSON block and the Transform-data block to pass only records where the source is INSTORE.
* Remove the filter block from the dataflow and connect the Convert-CSV-to-JSON block directly to the Transform-data block.

### Summarise a dataflow

You can ask aiRA Coder to explain what a dataflow does. It reads the current configuration and returns a plain-language description of each block and an overall summary of the flow.

This is useful when you need to understand a dataflow built by someone else, review logic before approval, or prepare documentation for a handover.

**When to use this**: When opening an unfamiliar dataflow or reviewing a dataflow before sending it for approval.

**How to use it**:

1. Open the dataflow version for which you need a summary.

2. Click the icon to open aiRA Coder.

3. Select **Explain dataflow** or enter your prompt.<br />A list of explanation level options appears.

   <Image src="https://files.readme.io/ab22596227b201220d3f355b6d2f1044b771ecdb2502c46f163499bebea02a75-Screenshot_2026-04-17_at_1.41.32_PM.png" align="center" border={true} />

4. Select the required level of explanation.

   <Image src="https://files.readme.io/46120e9a503c35d208be7514b9e430fb86e9f64cf5daea0f5da1a83258c1736e-Screenshot_2026-04-17_at_1.46.14_PM.png" align="center" border={true} />

aiRA Coder provides a block-by-block breakdown or an overall description of the dataflow’s purpose and logic, based on the selected option.

<Image src="https://files.readme.io/588a023e5194e3594907f09d3b0849bde3c8ffea48f2d02d95d42d27ddea4a11-Untitled_design_3.gif" align="center" border={true} />

**Example prompts**:

* "Explain this dataflow."
* "Explain the `http_write` block."
* "What does this dataflow do?"

### Copy and paste a dataflow

You can use aiRA Coder to copy a dataflow from one organization and paste it into another, within the same cluster. This removes the need to rebuild common integration patterns from scratch in each organization.

The copy and paste operation requires three sequential prompts: a copy prompt, a view prompt, and a paste prompt. To skip the view step, use the copy and paste options in aiRA Coder. In this case, the view step is integrated with the paste step.

When you copy a dataflow, it is saved to your personal dataflow store, which is linked to your email address. You can store and retrieve dataflows across sessions.

**When to use this**: When a working dataflow in one organization needs to be reused in another organization, or when a global dataflow template needs to be brought into your organization.

**How to use it**:

**Step 1: Copy the dataflow**

1. Open the dataflow you want to copy.

2. Open aiRA Coder.

3. Select **Copy Dataflow** to auto-generate the copy prompt in the text bar, or enter the copy prompt manually with a meaningful description.

   <Image src="https://files.readme.io/9f9061d174965eaf14229347cb8a1594193ce37c6cc9fb6a828243743167d3c5-Screenshot_2026-04-17_at_3.15.47_PM.png" align="center" border={true} />

4. Click the Send icon.

The aiRA Coder saves the dataflow to your personal dataflow store. Only saved dataflow versions are copied. Unsaved changes on the canvas are not included.

**Example copy prompt**

"Copy version 4 of the dataflow `AddCutomerV2` with the description 'Move to ANB organization'."

**Step 2: View your dataflow store**

1. Navigate to the target organization and open a canvas.
2. Open aiRA Coder and enter a view prompt specifying the cluster.
3. Click the **Send** icon.

aiRA Coder lists the last ten dataflows you copied in the specified cluster.

<Image src="https://files.readme.io/a2e7d829a19d65344bfc098461d9f37d7249ef4d8fcc976a5f7c310a66964a8e-Screenshot_2026-04-17_at_4.11.51_PM.png" align="center" border={true} />

**Example view prompt**

* "View my dataflow store from the APAC cluster."
* "View my stash in the EU cluster."

**Step 3: Paste the dataflow**

1. Select the dataflow from the list returned in Step 2.<br />Alternatively, select **Paste Dataflow** in aiRA Coder.<br />aiRA Coder lists the dataflows copied in the cluster and automatically generates the paste prompt. The paste prompt is not editable.
2. Click the **Send** icon.

   <Image src="https://files.readme.io/ee589a6f97e9d5a377daf35f01eb5c6228aa3fd58307e1340d925e2559c2f529-Untitled_design_5.gif" align="center" border={true} />

The dataflow is pasted onto the canvas in Draft state. Review and edit as needed before saving.

**Guidelines for copy and paste**:

* Always include a meaningful description in your copy prompt. This is mandatory. If you omit it, aiRA Coder will ask you to provide one.
* Specify a version number in the copy prompt to copy a specific version. If you do not specify a version, aiRA Coder copies the version currently open on the canvas.
* Specify the cluster name in the view prompt. You can only view one cluster at a time.
* The Trigger block and any tags assigned to the dataflow are not copied.
* You can copy and paste only one dataflow at a time.
* The original dataflow remains intact after copying. This feature copies, not moves.

### Get documentation assistance

You can ask aiRA Coder questions about Connect+ concepts, features, and workflows directly from within the canvas. aiRA Coder queries the official documentation and returns an answer in plain language.

This is useful when you need a quick reference without leaving the interface, or when you want to understand platform behaviour, block options, or configuration rules.

**When to use this**: When you have questions about how Connect+  works and want an answer without switching to external documentation.

**How to use it**:

1. Open any dataflow canvas.
2. Click the aiRA Coder icon.
3. Type your question and click the **Send** icon.

Alternatively, select **Product Query** in aiRA Coder and choose an option from the list to get information on that topic.

<Image src="https://files.readme.io/ed6ed4b813b501e9bc2b50fa9603198e856dc2cad35355843828f77c3f30e1fc-Untitled_design_6.gif" align="center" border={true} />

**Example prompts**:

* "What is a sttp\_read block?"
* "Explain the usage of JSLT transform block"?"
* "What is the difference between Pause and Stop?"

## Known limitations

The following limitations apply to the current version of aiRA Coder. These will be addressed in future releases.

* Token size limitations may restrict the generation of complex dataflows. If your dataflow is very large, break it into smaller prompts.
* Nesting or calling one dataflow from another is not supported.
* External libraries are not supported.
* aiRA Coder generates a starting configuration. Review all outputs before making a dataflow live.
* Currently, you cannot create a dataflow which uses an API with query parameters.

## Prompting Best Practices

To get the best results from aiRA, follow these tips:

* Use clear and specific language
* Write in full sentences or step-by-step instructions
* Avoid vague prompts like `Hi` or `Help`

<br />