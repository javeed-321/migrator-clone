---
updatedAt: 2026-03-09T05:51:57.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Editing a Dataflow

You can edit a dataflow only when it is in the `Draft` status.\
**Note**:  For dataflows in the `Reject` status, click **Edit** on the dataflow canvas to change the status to `Draft` before making edits.

To edit,

1. Navigate to the Neo extension portal \[\{host url}/extensions/neo/ui]\()          , select the organization where you want to create the dataflow.
2. In the **My Dataflows** tab, use the search bar to find the dataflow you want to edit.
3. Click on the dataflow.\
   The dataflow version page opens.
4. In the dataflow version page, click the version of the dataflow that is in `Draft` status to modify it.
5. [Add](https://docs.capillarytech.com/docs/editing-a-dataflow#adding-a-block), [delete](https://docs.capillarytech.com/docs/editing-a-dataflow#deleting-a-block), modify blocks, [modify connections](https://docs.capillarytech.com/docs/editing-a-dataflow#modifying-dataflow-connections) as per your requirement.
6. Click **Save**.
7. [Test the dataflow](https://docs.capillarytech.com/docs/execution-monitoring) using an API testing tool.
8. Click **Send for Approval** to submit the dataflow for [approval](https://docs.capillarytech.com/docs/approval-flow).\
   The dataflow status changes to `Awaiting approval`.

<Image align="center" className="border" border={true} width="85% " src="https://files.readme.io/8ac379550b378c8392ad744333d8ff1bdb13513d7646b49ebbd87e9bbdb643de-Edit_Dataflow.gif" />

## Modifying dataflow connections

In a dataflow, [blocks are connected](https://docs.capillarytech.com/docs/dataflows#relationship-between-blocks) by connector lines. When editing a dataflow, you can add a block, modify or remove these connections from the [canvas](https://docs.capillarytech.com/docs/introduction-to-the-ui-neo).

### Changing a connection

You can change a connection to link to a different block.

To change a connection,

1. Click the connection line between two blocks that you want to move.
2. Drag the connection to the input node of the new target block on the canvas.
3. Release the connection to attach it to the new block.

### Removing a connection

You can remove a connection between blocks.

To remove a connection,

1. Select the connection you want to remove.
2. Drag it to an empty area on the canvas.
3. Release it to delete the connection.

<Image align="center" className="border" border={true} width="85% " src="https://files.readme.io/4ce156765d501f598c9b2485aec0a6b0c110a1d2e08c683a058cadf4f11e7b25-remove_change_connections.gif" />

## Adding a block

On the dataflow [canvas](https://docs.capillarytech.com/docs/introduction-to-the-ui-neo), you can add blocks to meet your dataflow requirements. You also have the option to [copy a block from another block](https://docs.capillarytech.com/docs/editing-a-dataflow#/copying-a-block) and use it here.

To add a block,

1. Click the output node of an existing block.
2. Choose the desired block from the list that appears.

The block is added to the dataflow.

<Image align="center" className="border" border={true} width="90% " src="https://files.readme.io/40fd9e1d6fc898bac0ab2dd6f15eb837ef6a008ee9df125db314f8b5ce35b223-add_block.gif" />

## Deleting a block

On the dataflow [canvas](https://docs.capillarytech.com/docs/introduction-to-the-ui-neo), you can delete blocks as needed for your dataflow.

To delete a block:

1. Hover over the block you want to delete.
2. Click the delete icon.
3. Click **Yes, delete** on the delete block modal.

The block and its connections are removed from the dataflow.

<Image align="center" className="border" border={true} src="https://files.readme.io/d801e9368649294a63b5372faa73a1f214d9de37077d8ea30278361f825975a4-delete_block.gif" />

## Copying a block

On the dataflow [canvas](https://docs.capillarytech.com/docs/introduction-to-the-ui-neo), you can copy a block along with its configurations. You can then paste the block into the same dataflow or another within the same organisation. You can also paste inside the [block library](https://docs.capillarytech.com/docs/block-libraries#/).

To copy a block, follow these steps:

1. Hover over the block you want to copy and select the copy icon.
2. To paste the block, use `control+V`  on Windows or `command+V` on macOS or right-click and select **Paste**.
3. Rename the block with an appropriate name.
4. Use the connector to connect it to the appropriate block.
5. To paste the block in a block library:
   1. Hover over the block you want to copy and select the copy icon.
   2. On the Dataflows page in the Neo UI, select **Access Libraries**.
   3. Select **Paste block** to paste the copied block.

      <Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/1b37f2124698753a2d4c8235933d3b6d1ddd6e82baabab4953d81601fec1b473-image.png" />
   4. Configure the block and select **Done** to add the block to the block library.

The block and its configurations are copied.

<Image align="center" className="border" border={true} width="100% " src="https://files.readme.io/0ddda790c6e8d56702d1b6825e53f0c1e0da855a46a195f29782faf04b9d87da-Untitled_1.gif" />

> 📘 Note
>
> * You can copy blocks from dataflows that is in any state.
> * You can only paste blocks into a dataflow that is in the **Draft** state.
> * Copying and pasting the trigger block is not supported.