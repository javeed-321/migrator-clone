---
updatedAt: 2026-04-22T05:28:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# PGP Decrypt block

Configuration reference for the Decrypt Data block — decrypts encrypted source files before processing.

The `decrypt_content` block decrypts encrypted source files before they are processed downstream. It acts as an optional transformation block in a Connect+ dataflow, sitting between the source and transformation blocks to handle secure content. The block supports PGP-based decryption using a private key and passphrase, and can be enabled or disabled without removing it from the dataflow.

## When to use this block

Use this block when your source files are PGP-encrypted and must be decrypted before transformation or validation can occur.

## Prerequisites

Before configuring this block, make sure you have:

* The private key used to decrypt the files, in Base64-encoded format
* The passphrase for the private key (if one was set during key generation)

## Configuration fields

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field name
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Block name**
      </td>

      <td>
        No
      </td>

      <td>
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **Encryption Algorithm**
      </td>

      <td>
        Yes
      </td>

      <td>
        The algorithm that was used to encrypt the source file.  
        Select the algorithm from the dropdown.  This block supports only `PGP`
      </td>
    </tr>

    <tr>
      <td>
        **Private Key File**
      </td>

      <td>
        Yes
      </td>

      <td>
        The [private key used to decrypt](https://docs.capillarytech.com/docs/pgp-encrypt-block#creating-pgp-public--private-key) the file, provided in Base64-encoded format.
      </td>
    </tr>

    <tr>
      <td>
        **Private Passphrase**
      </td>

      <td>
        Yes
      </td>

      <td>
        The [passphrase associated with the private key](https://docs.capillarytech.com/docs/pgp-encrypt-block#creating-pgp-public--private-key). Required only if a passphrase was set during key generation.
      </td>
    </tr>

    <tr>
      <td>
        **Is Enabled**
      </td>

      <td>
        Yes
      </td>

      <td>
        Enables or disables the decryption block.  
        Select `true` to activate decryption or `false` to skip it.  
        Default value: `true`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/e34c9556de5f3998c6cac0535ca25e6318d197d28f8c091615d7ee9e646c5ca3-Untitled_design.gif" className="border" />