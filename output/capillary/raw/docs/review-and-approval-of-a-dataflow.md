---
updatedAt: 2026-03-09T05:51:57.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Review and Approval of a Dataflow

After saving a dataflow, it must be approved before it can be used. Before sending it for review, you can view the code differences between the current and previous versions. Once you verify the changes, send the dataflow for approval. After approval, the dataflow moves to the **Approved** state and can be made live.

## Sending a dataflow for approval

To send a dataflow version for approval, on your dataflow canvas, click **Send for approval**. The dataflow moves to the [Waiting Approval](https://docs.capillarytech.com/docs/dataflow-states#/) state.

<Image align="center" border={true} src="https://files.readme.io/c6f216b65314afdddcfbd30b873d9c471e5f281c3d5f07e236fff9c1986559fa-Send_for_approval.png" className="border" />

## Reviewing a dataflow

The review of a dataflow can be performed by an Admin user. These changes, including a summary, comments, description, and code differences, can be viewed in the **Review Changes** modal, which provides a detailed view of the dataflow through four tabs:

* **Summary** – Displays the changes between the version under review and the previous version, including modified blocks.\
  **Note:** The **Summary** tab is not available for version 1.

* **Comments** – Shows both AI-generated and admin review comments. You can view AI-generated comments or add your own before approving or rejecting the version.

* **Description** – Provides detailed information about the dataflow, including blocks, workflow, and overall functionality.

* **Code Diff** – Displays code-level differences between the version under review and the previous version.

Using the information in these tabs, the admin can decide whether to approve or reject the dataflow.

<Image align="center" border={true} src="https://files.readme.io/535c9456f995f988396e81a15b6d53399a35f666ff7a729dae57fc696fc5b5bf-GIF3_12.gif" className="border" />

To review and approve or reject a dataflow, perform the following:

1. On the **Dataflow** > **Version Listing** page, open the dataflow that you want to review. The data flow due for review will be in an **Awaiting approval** state.

2. On the **Dataflow Composer** page, click **Review and approve**.\
   The **Review Changes** modal opens.

<Image align="center" border={true} src="https://files.readme.io/36935c547ffab16f8fcb8f62ea7021e83cc111ea4c16ba5f8b66435c68e6e82d-review_changes.png" className="border" />

<br />

3. (Optional) Add the review comments. To add review comments, perform the following:
   1. Navigate to the **Comments tab > Add Your Review** section and select the block name from the **Block Name** drop-down list.\
      **Note:** Select **GLOBAL** if the comment applies to all blocks in the dataflow.

      <Image align="center" border={true} src="https://files.readme.io/b2f193680250905c95536f855f0458a8e0d412bc35043224c7b0fbff66abe889-addreviewcomment.png" className="border" />
   2. In **Block Type**, select the type of block from the drop-down list.\
      **Note:** Select **DATAFLOW** if the comment applies to the entire dataflow.
   3. In **Criticality**, choose the criticality level — **Low**, **Medium**, **High**, or **Critical**.
   4. In the **Comment** field, enter your review comment.
   5. Click **Add Review** to save the comment.
4. To approve, click **Approve** and when the confirmation message appears, click **Yes** to confirm.\
   The dataflow version is approved.
5. To reject, click **Reject** and when the confirmation message appears, click **Yes** to confirm.\
   The dataflow version is rejected.

   <Image align="center" border={true} src="https://files.readme.io/9048d6e5c17dff4f7085b1063b68f43553ab5f3124b5f4aa2de5d69fe2919f5e-Screenshot_2025-10-23_at_3.50.38_PM.png" className="border" />

## Fixing the review comments

If the dataflow is rejected after review by the Neo Admin, the user must address the review comments. There are two types of review comments:

* [AI generated](https://docs.capillarytech.com/docs/review-and-approval-of-a-dataflow#/fixing-ai-comments-automatically)
* [Review comments provided by the Neo Admin](https://docs.capillarytech.com/docs/review-and-approval-of-a-dataflow#/fixing-manual-feedback-comments)

Both types of comments appear under the **Comments** tab in the **Compare Changes in Different Versions** modal. Admin review comments must be resolved manually. AI-generated comments can be resolved either manually, similar to admin comments, or automatically using the Fix with AI option. The dataflow must be in the Draft state to make any changes.

### Fixing AI comments automatically

To fix review comments using AI, perform the following:

1. On the data flow page, open the rejected data flow.\
   The Version Listing page opens.

2. On the **Version Listing** page, click the version in the *Rejected* state.\
   The Dataflow Composer page opens.

3. Click **Edit,** and on the confirmation message, click **Yes.**\
   The dataflow moves to the **Draft** state.

4. Click the **Compare Version Configuration** icon.\
   The **Compare Changes in Different Versions** modal opens.

5. Navigate to the **Comments** tab to view the list of AI-generated and admin review comments and select the **Resolve with AI** checkbox next to the comments you want to resolve.

<Image align="center" border={true} src="https://files.readme.io/bfc0758705723276b9b993b61baa0dd5d34b7b777c64d5047484b040f652e206-Resolve_with_AI.png" className="border" />

<br />

6. Click **Fix with AI**.\
   The **AIRA Coder** panel opens with the suggested changes.

   <Image align="center" border={true} src="https://files.readme.io/51b1ae4942fc2f7457f76feb44aab83587010c8b556e34fe2a36ad6f484d8028-Fix_with_AI.png" className="border" />
7. Click the **Send** icon to apply the fixes.\
   The data flow is automatically updated based on the resolved comments.

   <Image align="center" border={true} src="https://files.readme.io/75c51975b032433db73fa49503a163b9006abdf8be32bc3dc7a98796549792fd-AIRA_Coder_-_send.png" className="border" />

**Note**:  It is not mandatory to resolve all comments before sending the dataflow again for approval. A dataflow can be approved even if some comments remain unresolved, depending on their criticality.

8. Click **Mark Resolved** in the **Compare Changes in Different Versions** modal after resolving a comment.\
   **Note**: You can also reopen a comment that has been marked as resolved.

After resolving the comments, the data flow is updated and ready to be sent again for approval.

### Fixing manual review comments

The review comments by the admin user must be solved manually by [editing the relevant blocks of the dataflow](https://docs.capillarytech.com/docs/editing-a-dataflow#/). They can have different severity levels and apply to individual blocks, multiple blocks, or the entire dataflow.

## Making a version live

An approved version of a dataflow can be made Live.

To make a dataflow version `Live`,

1. Open the **Dataflow** page and select the dataflow you want to make `Live`.

2. On the Version Listing page, click the approved version you want to make Live.\
   The dataflow composing page opens.

3. Click **Make Live**.\
   A confirmation message appears.

4. Click **Yes** on the confirmation message.

**Note**:

* It takes around 10 minutes for a version to become `Live`.
* only one approved version of a dataflow can be Live at any time.
* You can roll back one version and make another version Live.

<Image align="center" border={true} src="https://files.readme.io/18b36d30c2289a74c52ef62c41da7db76d8282c2c37dfb21b4cc37314c82bf33-MakeLive.png" className="border" />