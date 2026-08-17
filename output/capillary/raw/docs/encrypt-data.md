---
updatedAt: 2026-04-15T09:42:14.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Encrypt Data

This block enables the encryption of an output file generated using the PGP algorithm. You can use the **Is Enabled** drop-down to control the activation of this block.

| Field name           | Description                                                                                                                               |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| Encryption Algorithm | The algorithm to encrypt the file. At present, only the PGP algorithm is supported. Hence, by default, PGP encryption is always selected. |
| Public User Id       | [Public user ID](https://docs.capillarytech.com/docs/encrypt-data#creating-pgp-public--private-key-).                                     |
| Public Key File      | [Public encryption key](https://docs.capillarytech.com/docs/encrypt-data#creating-pgp-public--private-key-).                              |
| Is Enabled           | Enable or disable the encrypt function.                                                                                                   |

<Image align="center" border={true} src="https://files.readme.io/7ebe064-encrypt.jpg" className="border" />

# Creating PGP public & private key

PGP is an encryption method based on public-key cryptography. It uses a pair of keys — a public key for encrypting data and a private key for decrypting it. These keys can be created and managed using the GnuPG (GPG) tool, which implements the OpenPGP standard. Perform the following steps to create a PGP key pair using the command line interafce.

1. Install the GnuPG in your operating system.
   1. macOS: `brew install gnupg `
   2. Linux: `sudo apt install gnupg`
   3. Windows Powershel: `winget install GnuPG.GnuPG`
2. Use the command` gpg --full-generate-key` and generate a PGP key-pair.
3. Select the type of key you want to generate.
4. Define the length of the keys.
5. Specify the duration for which the keys should be valid.
6. Enter the name and email ID for creating the User ID.
7. Enter **Okay**.
8. Enter a passphrase when prompted.

The system creates a public and private key.

```Text Example PGP key creation on the terminal
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

<br />