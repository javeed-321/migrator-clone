---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Encrypt Block

The Encrypt block encrypts data using hash algorithms during the dataflow execution. It creates a unique, fixed-length value (hash) from input data. The hash algorithms supported are SHA256, SHA1, SHA512, MD5, MD5-SHA1, AES128, AES-256-CBC, AES256, and RSA.

# Example scenario

**Requirement**

A gas company offers a mobile application that allows customers to find the nearest gas station, check available facilities, view fueling details, track transactions, and access receipts. The company's loyalty program is managed by Capillary.

For secure transaction processing, all transactions between Capillary and the gas company must go through a financial services provider. Before any transaction can occur, an account must be created with the provider.

To ensure data security, Capillary must encrypt customer details before transmitting them securely to the financial services provider.

**Solution**

To encode customer details, create a dataflow with the **Encrypt** block. This block generates a hash-encoded data format, which the system uses to create an account with the financial services provider.

Refer to this example [dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/f9522329-05ac-4a2c-9c4e-55355ae449a0/version/a15a544a-ddf0-45ad-bdf0-f916b7adeb06?ruleType=org) to understand how it is configured for a use case. Make sure you have access to DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

# Configuring the Encrypt block

To configure the Encrypt block,

1. From the dataflow canvas, click on the node and select the **Encrypt** block.
2. In the **Block Name**, enter the name of the block.\
   **Note**: Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
3. In the **Hash Algorithm,** choose the hash algorithm to compute the HMAC. Supported values are SHA256, SHA1, SHA512, MD5, MD5-SHA1, AES128, AES-256-CBC, AES-256, and RSA.
4. In the **Payload** field, enter the content to be encoded.
5. In the **Password/Public Key** for encryption field, enter the password or the public key.\
   This field is required when using the RSA or AES hash algorithm.
   * If you select RSA, provide the public key.
   * If you choose AES, provide the password as the encryption key.\
     For additional details, refer to [Passwords and Keys in Encryption](https://docs.capillarytech.com/docs/encrypt-block#passwords-and-keys-in-encryption).
6. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
7. Click **Done**.

<Image align="center" alt="Configuring Encrypt block" border={true} caption="Configuring Encrypt block" src="https://files.readme.io/1636fc155f3ba78f8897ccf910f234a99e370be42c56d4c3bd3c24c93ca3986e-24.03.2025_19.35.40_REC_encrypt_withpassword.gif" />

# Passwords and keys in encryption

The `Password/Public Key` field in the Encrypt block provides encryption credentials based on the selected encryption method—RSA or AES.

## RSA encryption

* The field stores the public key, which encrypts the data.
* RSA uses a key pair: a public key for encryption and a private key for decryption.
* Only the recipient with the private key can decrypt the data.
* Key pairs can be generated using external tools like [Key Generator](https://emn178.github.io/online-tools/rsa/key-generator/).
* For security, store the public and private keys in a [Configuration Manager](https://docs.capillarytech.com/docs/extension-configuration) instead of hardcoding them.

## AES encryption

* The field contains the password, used for encryption and decryption.
* Unlike RSA, AES is a symmetric algorithm that uses the same key for both encryption and decryption.
* You can create a password using a [Password Generator](https://emn178.github.io/online-tools/aes/encrypt/).
* The provided password encrypts the payload.
* For security, store the password in a [Configuration Manager](https://docs.capillarytech.com/docs/extension-configuration) instead of hardcoding it.