---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Mark stores as inactive using the data import

You can mark stores as inactive using the data import feature. Perform the following:

1. Create a file with column `store_code ` and enter the list of store codes you want to deactivate in that column.

   <Image align="center" className="border" border={true} src="https://files.readme.io/47ae6e8-Store_with_one_coloumn.png" />
2. Configure the template using the profile `Org Entity Status Update`.
3. From the identifier drop-down, select **ORG\_ENTITY\_CODE** and from the Entity type drop-down, select **STORE**.
4. Clear the **Activate** checkbox.

   <Image align="center" className="border" border={true} src="https://files.readme.io/84988f0-Configure_template.png" />
5. Map the store code against the Org Entity Code in the below image and import. The stores are deactivated after the data import.

   <Image align="center" className="border" border={true} src="https://files.readme.io/660b106-Mapping.png" />