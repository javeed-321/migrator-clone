---
updatedAt: 2026-04-22T09:04:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# PGP Encrypt block

Configuration reference for the Encrypt Data block — encrypts the output file before it is transferred to the destination.

The `encrypt_content` block encrypts output files before they are delivered to the destination. It acts as an optional transformation block in a Connect+ dataflow, sitting between the transformation and destination blocks to secure outgoing data. The block supports PGP-based encryption using a public key and can be enabled or disabled without removing it from the dataflow.

## When to use this block

Use this block when the destination server or system requires files to be PGP-encrypted before delivery.

## Prerequisites

Before configuring this block, make sure you have:

* The recipient's PGP public key, in Base64-encoded format
* The user ID associated with the public key

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
        A name for the block instance. For example, `Encrypt_Block`.
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
        The algorithm used to encrypt the output file. Select the algorithm from the dropdown. For example, `PGP`.
      </td>
    </tr>

    <tr>
      <td>
        **Public Key File**
      </td>

      <td>
        Yes
      </td>

      <td>
        The public encryption key used to encrypt the output file. For example, the Base64-encoded content of your PGP public key.
      </td>
    </tr>

    <tr>
      <td>
        **Public Key User Id**
      </td>

      <td>
        Yes
      </td>

      <td>
        The user ID associated with the public key.  
        For example, `john.doe@example.com`.
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
        Enables or disables the encryption block.  
        Select `true` to activate encryption or `false` to skip it.  
        Default value: `true`.
      </td>
    </tr>
  </tbody>
</Table>

# Creating PGP public & private key

PGP is an encryption method based on public-key cryptography. It uses a pair of keys — a public key for encrypting data and a private key for decrypting it. These keys can be created and managed using the GnuPG (GPG) tool, which implements the OpenPGP standard. Perform the following steps to create a PGP key pair using the command line interafce.

1. Install the GnuPG in your operating system.
   1. macOS: `brew install gnupg `
   2. Linux: `sudo apt install gnupg`
   3. Windows PowerShell: `winget install GnuPG.GnuPG`
2. Use the command` gpg --full-generate-key` and generate a PGP key-pair.
3. Select the type of key you want to generate.
4. Define the length of the keys.
5. Specify the duration for which the keys should be valid.
6. Enter the name and email ID for creating the User ID.
7. Enter **Okay**.
8. Enter a passphrase when prompted.

The system creates a public and private key.

```Text PGP public and private key creation
brew install gnupg
bash

gpg --full-generate-key


Please select what kind of key you want:
  (1) RSA and RSA
  (2) DSA and Elgamal
  (3) DSA (sign only)
  (4) RSA (sign only)
  (9) ECC (sign and encrypt) *default*

What keysize do you want? (2048) 1024


Key is valid for? (0) 0
Key does not expire at all
Is this correct? (y/N) y


GnuPG needs to construct a user ID to identify your key.

Real name: <Your Name>
Email address: <your.email@example.com>
Comment: <optional>


You selected this USER-ID:
  "<Your Name> (<optional comment>) <your.email@example.com>"
Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? o


We need to generate a lot of random bytes…
(public key generation may take a moment)


public and secret key created and signed.

pub   dsa1024 YYYY-MM-DD [SC]
      <Key Fingerprint>
uid                      <Your Name> (<optional comment>) <your.email@example.com>
sub   elg1024 YYYY-MM-DD [E]

```

<Image align="center" border={true} src="https://files.readme.io/0b32316451e8193513f8b55a3805be56ed54230d55153bdeaf4f7bfb47b0182f-Screenshot_2026-04-15_at_3.15.21_PM.png" className="border" />