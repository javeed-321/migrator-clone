---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Decrypt Block

The decrypt block converts the data encrypted using the RSA and AES algorithms back to its original form. The block retrieves the encrypted data from the input and fetches the required key or password to unlock it. Based on its settings, it identifies the appropriate decryption method, as AES or RSA. Using the key and the selected decryption method, it converts the encrypted data back into its readable form.

# Example scenario

**Requirement**

A mobile app displays a digital card as a QR code in the customer’s profile. Customers must present this QR code at the store during billing to apply offers and earn loyalty points. However, a static QR code increases the risk of fraudulent activities. To prevent this, the app generates a QR code dynamically upon request. The mobile backend creates an encrypted key using a digital number and timestamp, which the mobile app then converts into a QR code for display.

However, to update loyalty points after a transaction, the system must retrieve the digital number by decrypting the QR code.

**Solution**

To resolve this issue, create a [dataflow ](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/b13e61e9-bb24-464c-9e86-afe87c6c8a8e/version/6ee65b59-c5d8-4868-b770-5ea30f1176a6?ruleType=org)with a decrypt block to retrieve the encrypted digital number. Once decrypted, the system can use the digital number to update the loyalty points.

To view the dataflow, make sure you have access to DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

# Configuring the Decrypt block

To configure the Decrypt block:

1. From the dataflow canvas, click the connector.
2. Select the Decrypt block from the pop-up window.
3. In the **Block Name** field, enter a name for the block.\
   Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
4. In the **Decrypt Algorithm** field, enter the algorithm used to decrypt the payload.
5. In the **Payload** field, enter the content to be decoded.
6. In the **Password** field, enter the password or key shared during encryption.
7. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [execution path](https://docs.capillarytech.com/docs/configuring-relations) as needed.
8. Click **Done** to save the configuration.

<Image align="center" alt="Configuring the Decrypt block" border={true} caption="Configuring the Decrypt block" src="https://files.readme.io/10ee2da0bc3272269f28e276120d3c1803f7d1d9502d5d3330fff41992fae529-24.03.2025_20.08.44_REC_Configuring_decrypt_block.gif" />