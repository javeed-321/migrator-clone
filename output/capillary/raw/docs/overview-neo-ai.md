---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Overview

Neo supports AI-powered dataflow generation and editing using Aira Coder. This allows you to build workflows simply by describing your use case in natural language. Whether you're creating a new dataflow or updating an existing one, the Aira Coder interprets your intent and generates the necessary dataflow automatically.

You can use Aira Coder to perform the following actions:

* **<Anchor label="Create dataflows" target="_blank" href="https://docs.capillarytech.com/docs/create-a-dataflow-using-ai#/">Create dataflows</Anchor>**: Generate a new dataflow by describing what it must accomplish.

* **[Modify dataflows](https://docs.capillarytech.com/docs/update-a-dataflow-using-ai#/)**: Update an existing dataflow by changing the logic, adding or removing blocks, or reconfiguring block properties.

* **[Describe dataflows](https://docs.capillarytech.com/docs/explain-dataflow-neo-ai#/)**: Get a clear explanation of how a dataflow works and understand its logical flow.

* **[Copy and paste dataflows](https://docs.capillarytech.com/docs/copy-and-paste-a-dataflow#/)**: Copy-paste a dataflow from one organization to another or across clusters using natural-language prompts.

* **[Get documentation assistance](https://docs.capillarytech.com/docs/ask-documentation-related-questions#/)**: Access help and explanations for Neo concepts, features, and workflows.

The feature is available by default along with Neo.

# How it works: Aira Coder processing flow

1. **Prompt Enrichment (RAG):**\
   The system enhances your natural language prompt with additional context and examples using Retrieval-Augmented Generation (RAG).

2. **AI-Generated Draft:**\
   The LLM (Large Language Model) translates your prompt into a draft dataflow with all necessary blocks.

3. **Validation Layer:**\
   A system-level validator checks for:
   * Missing or misconfigured blocks
   * Empty or incomplete nodes
   * Syntax issues in script blocks

4. **Auto-Explanation + Preview:**\
   Once validated, the draft dataflow appears in the UI along with a clear, step-by-step explanation of what each block does.

5. **Interactive Refinement:**\
   You can:
   * Accept and render the dataflow
   * Request changes via a new prompt
   * Discard and regenerate

# Accessing Aira Coder

You can access Aira Coder from the Neo UI. To open Aira Coder, follow these steps:

1. Log in to the [Neo Extensions UI](https://docs.capillarytech.com/docs/composing-a-neo_dataflow) and create or open a dataflow.\
   The version listing page opens.

2. From the version listing, click on any version.

3. Launch the **AIRA Coder** by clicking the chat icon in the bottom-right corner.

<Image align="center" border={true} src="https://files.readme.io/39b7156ef9d57bac7727d7a8a111934e818a3e76fdb8955ddba93ebd924d4e97-AI_Create_Dataflow.gif" className="border" />

<br />

<br />