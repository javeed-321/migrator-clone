---
updatedAt: 2026-03-09T05:51:57.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Block Libraries

A Block Library in Neo enables users to create reusable, standardized blocks that can be utilized across different dataflows without the need to reconfigure them each time. This addresses the challenge of replicating blocks with similar configurations across multiple dataflows or rules.

# Features

* **Reusability:** Allow users to build blocks with specific configurations or logic once and then reuse them in various dataflows. This avoids duplication of effort and promotes efficiency.
* **Standardization:** Ensures that certain functionalities or integrations are implemented consistently across different dataflows.
* **Central Management:** The Block Library acts as a central repository for these reusable components, making them easier to find, manage, and update.
* **Versioning and Approval**: Block Libraries are version-controlled and follow an approval process.
* **Integration with Rules/Dataflows:** Once approved, blocks from the library can be easily imported and used within rule versions or dataflows.
* **Global Library:** There is also a Global Library with predefined, read-only blocks managed at a higher organizational level.

# Global block libraries & org-specific block library

**Global Block Library:** Global Library includes a set of pre-defined uneditable blocks managed by the Capillary Technology organization and is available for use across organisations, in that particular cluster. Blocks in the Global Library are read-only within your current organization. You can use these blocks in your dataflows, but you cannot modify their configurations directly.

**Org-specific Block Library** - These libraries are created and managed within individual organizations. Users with the appropriate Neo Edit Access can create and update blocks in these libraries. Updates to these blocks are allowed only when the library version is in the draft state.

| Feature                    | Global Blocks                                                                                             | Org-Specific Blocks                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Ownership & Management** | Defined and managed by **Capillary Technology organization**.                                             | Created and managed within **individual organizations**.                                     |
| **Editability**            | **Read-only** within your current organization. Configurations cannot be directly modified.               | Can be **edited** by users with **Neo Edit Access**. Updates are allowed in **Draft state**. |
| **Accessibility & Scope**  | **Available for use in your dataflows**. Intended for use across organizations in the respective cluster. | Specific to an **organization**. Can be reused within that organization.                     |
| **Creation & Versioning**  | Created & Versioned by **Capillary** .                                                                    | Created & versioned by users within the specific organization.                               |

# Access control & user roles

| Access           | User Role                                                                |
| :--------------- | :----------------------------------------------------------------------- |
| Neo View Access  | View the available block libraries and their configurations              |
| Neo Edit Access  | Create new block libraries and update existing blocks within libraries   |
| Neo Admin Access | Approve or reject new block library versions or changes to existing ones |

For information on Neo access and more, refer to the documentation [here](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

# Block library versioning

Block libraries are version-controlled. By default, the version `v1` is available in the `Draft` state, allowing users with edit access to add blocks.

When a Neo Admin approves a version under review, the system automatically creates a new version with the next consecutive number. This new version starts in the `Draft` state and is a copy of the recently approved version, allowing further modifications.

## Switching library versions in dataflows

Once a dataflow is approved, you cannot change its block library version. To use a different block library version, you must create a new dataflow and link it to the updated library version.

## Linking library to dataflows

A block library is linked to a specific dataflow version, not the dataflow itself. As a result, a dataflow can use multiple block library versions across different versions of the dataflow.

# Managing blocks in the block library

## Adding a block to a version

To add a block to a specific library version,

1. On the Dataflows page in the Neo UI, click **Access Libraries**.

   <Image align="center" alt="Access Libraries" border={true} caption="Access Libraries" src="https://files.readme.io/9fa91d01741352bd8edff4db57935210e9262afca18e51232c1465f9c067f0ab-access_libraries.png" />
2. On the **Libraries** page, choose the version in `Draft` state where you want to add the block.

   > 📘 **Note**
   >
   > * If no versions are available, any new block you create is automatically added to version `v1` in the `Draft` state.
   > * You can't add blocks into a version in the `Published` state.

   <Image align="center" alt="Choose versions" border={true} caption="Choose versions" src="https://files.readme.io/caa0c922d079d9bfaddfe86f8bbe55d40d5ffe478cd2f2c2c28dc7f498e4fb79-library_versions.png" />
3. (Optional) Hover over **Add a description**, to enter a description for the block library version.

   <Image align="center" alt="Add a description" border={true} caption="Add a description" src="https://files.readme.io/fea4a440e128dd88b4e66fac59643b3fc8953123bf024b5e8abe8158069b6071-add_desc.png" />
4. Hover over **+Add new block**  and select the block to add to the block library version.
5. Enter the **Block name**, **Description**, and **Script**.

   > 📘 **Note**:
   >
   > * A version cannot have two blocks with the same name.
   > * You can use an existing block name in a different version, but the block type must be the same.
6. Click **Done**.

<Image align="center" alt="Adding a block to the library" border={true} caption="Adding a block to the library" src="https://files.readme.io/2ac6e0b4d3f12a160c54e118ba300b82ee9d17d2d12bf713c1640204f50e0e0e-Create_block_library_schema.gif" />

The block is created in the chosen library version and is in the `Draft` state.

## Modifying a Version

You can edit blocks from a version in the `Draft` state.

To edit a block,

1. On the **Libraries** page, select the version in the `Draft` state that you want to modify.
2. Hover over the ellipsis next to the block you want to edit and click **Edit block**.

   <Image align="center" alt="Edit block in a version" border={true} caption="Edit block in a version" src="https://files.readme.io/9324cfcd829cab7a337aab4128e92be0acd9c117013aa584d5f68a26ae930019-image.png" />
3. Edit the required fields in the block and click **Done**.\
   **Note**: You cannot edit the **Block name** field.

   The block is successfully updated.

## Deleting a block from a version

You can delete blocks from a version in the `Draft` state.

To delete a block,

1. On the **Libraries** page, select the version in the `Draft` state that you want to modify.
2. Hover over the ellipsis next to the block you want to edit and click **Delete block**.\
   A confirmation message is received.

   <Image align="center" className="border" border={true} src="https://files.readme.io/e4b8b8f767a262a0e7f9b6e8a62c0b8606b3be001ccec60ef15913271751c537-image.png" />
3. Click **Yes, delete**.

The specified block is deleted from the version.

**Note**: If you delete a block from a block library version that a dataflow uses and then try to update the dataflow to a new library version where the block no longer exists, Neo triggers a validation error. To fix this, you must remove the outdated block from the dataflow before switching to the new block library version.

# Block library approval workflow

The approval workflow for block library versions ensures that changes are reviewed and validated before deploying. The block library versions progress through different statuses, allowing you to create, submit, and refine block configurations.

Below are the key statuses in the workflow:

* **Draft:** The initial state where you can edit and update block configurations.
* **Awaiting Approval:** You can submit the version for approval once the changes are complete.
* **Published:** After a Neo Admin approves the version, it becomes available for use in dataflows.
* **Rejected:** If the version is rejected, you can edit the Block Library version and revert its status to `Draft` for further modifications.

Below is a flow chart illustrating the state change of a block library version.

<Image align="center" alt="States of a Block Library version" border={true} caption="States of a block library version" src="https://files.readme.io/4b48194b8915f3cf73a749b520ddd34c012b0e3fa660cfb367ad625df17d9268-Block_Library_flow.png" width="60% " />

## Sending a block library version for approval

After making the necessary changes to the Block Library version, it is sent to the Neo Admin for approval.

To send the block library version for approval,

1. On the **Libraries** page, click **Send for approval**.\
   A confirmation message appears.

   <Image align="center" alt="Send version for approval" border={true} caption="Send the version for approval" src="https://files.readme.io/16b43959bf06a9639618738429e42534cf80b17faa6cd8d7da90077908f6d8f5-library_sendforapproval.png" />
2. On the confirmation message, click **Yes**.

   <Image align="center" alt="Confirmation screen" border={true} caption="Confirmation screen" src="https://files.readme.io/3ed27245b6c36f496b056fbdb01864a0a048f7718d04c0148a83afb588821efd-image.png" />

The block library version is sent for approval by the Neo Admin and transitions to the **Awaiting Approval** state.

## Approving a block library version

The Neo Admin can approve the block library version.

To approve,

1. On the **Libraries** page, click **Review and approve**.\
   The Review changes modal appears.

   <Image align="center" alt="Review and approve Block Library version by the Neo Admin" border={true} caption="Review and approve the block library version by the Neo Admin" src="https://files.readme.io/1886c0739f2dc8b1d5b7ef53726a91e48797bede62ea2f1e82e89c01462201d9-library_reviewandapprove.png" />
2. On the **Review changes** modal, review the changes by comparing the versions.

   > 📘 Note
   >
   > If multiple versions of the Block Library exist, you can select the versions to compare from the drop-down.

   <Image align="center" alt="Compare versions" border={true} caption="Compare versions" src="https://files.readme.io/4b09e42700a03622f0617a2eee53580896fa7d25722d5cd73e6c3706fc010034-image.png" />
3. Click **Approve**.\
   A confirmation message appears.
4. In the confirmation message, enter a reason for approval and click **Yes**.

The block library version is approved and moves to the `Published` state.

# Using block libraries in a dataflow

1. **Attach a Library Version**: To use blocks from a block library in a dataflow, attach an approved library version to the specific dataflow version you are working on. You can attach either a global or an organisation-specific library. This attachment happens at the dataflow version level, ensuring that all blocks within that dataflow version consistently use the same library version.
2. **Import Blocks**: Once a library version is attached, you can import any block from that library onto your dataflow canvas using **Import from Library**  from the block option.
3. **Modify Block**:  You can make modifications and override the Input Execution Logic, Cacheable feature, and Execution Path in the block imported from the library.

<Image align="center" alt="Using Block Libraries in the dataflow" border={true} caption="Using block libraries in a dataflow" src="https://files.readme.io/4dec88129714e9ad840b276cfd8e5417a399a60e5f89229fa26f90af1090ae2d-Innovative_Approaches_in_Modern_Education.gif" />

<br />

> 📘 Notes
>
> * You can add, modify, or delete blocks within a Block Library version while it is in the Draft state
> * Each Block Library is tied to a specific dataflow version, not the dataflow itself. If you delete blocks from a library version that are still being referenced by an approved dataflow version, a validation error will occur when trying to update the dataflow version's library reference. In such cases, the outdated library blocks must be removed from the dataflow before the library version can be updated.
> * In the Neo UI, when you use a block from a library, the block's name (from BlockLibraryMeta) is displayed on the canvas. This name might change across different library versions, even if the underlying blockMetaId remains the same.