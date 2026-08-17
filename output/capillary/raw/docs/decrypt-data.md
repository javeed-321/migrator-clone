---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Decrypt Data

This block enables the decryption of an encrypted source file. It is an optional feature that can be enabled if the source file is encrypted. All the fields within this block become mandatory once you enable the Decrypt data action block. You can use the **Is Enabled** drop-down to control the activation of this block.

| Field name           | Description                                                                                                                                                                                                                          |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unzip Files          | If the files are compressed, you can select this option to unzip the file and then select the original file.                                                                                                                         |
| Encryption Algorithm | The algorithm that was used to encrypt the file. At present, only files encrypted using the PGP algorithm can be decrypted. Hence, by default, PGP encryption is always selected.                                                    |
| Private Key File     | [Private Key in the base64 encoded format.](https://docs.capillarytech.com/docs/encrypt-data#creating-pgp-public--private-key-)                                                                                                      |
| Private Passphrase   | <Anchor label="The password required to unlock the private key." target="_blank" href="https://docs.capillarytech.com/docs/encrypt-data#creating-pgp-public--private-key-">The password required to unlock the private key.</Anchor> |
| Is Enabled           | Enable or disable the decrypt function.                                                                                                                                                                                              |
| Flename Extension    | Enter the file name extension.                                                                                                                                                                                                       |

<Image align="center" border={true} src="https://files.readme.io/e4b50e7bc2851984f97a2e834321f4f225eac8ba88d29161f62b94d7c52f19da-image.png" className="border" />

<br />