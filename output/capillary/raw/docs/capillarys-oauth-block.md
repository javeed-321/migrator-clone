---
updatedAt: 2026-07-07T10:07:11.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# OAuth Block

The OAuth block generates an [OAuth](https://docs.capillarytech.com/docs/api-client#oauth-authentication) token for a given key and secret during the dataflow execution.

# Example scenario

**Requirement**

A parent organization manages four child organizations, each requiring 10 unique APIs to perform organization-specific operations. This results in a total of 40 APIs—10 per child organization. This arrangement has caused redundancy, increased maintenance efforts, and heightened complexity. To simplify this, the OrgContextSwitch block is utilized. The OrgContextSwitch requires an OAuth token to connect to the child organization.

**Solution**<br />To generate the OAuth token during the dataflow execution, use the OAuth block.

Refer to this [dataflow ](https://eu.intouch.capillarytech.com/extensions/neo/ui/app/1knscT/rule/3cd05d44-f366-412a-956a-1ddc5c948534/version/58f88995-546f-44d4-b114-c5cf78c77420?ruleType=org)example to understand its configuration for the use case.

Make sure you have access to DocDemo org (100737) in the EU cluster and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo).

# Configuring the OAuth block

To configure the OAuth block,

1. From the dataflow canvas, click on the connector.
2. Select the **Capillary’s OAuth** block from the pop-up window.
3. In the **Block Name**, enter the name of the block.<br />Note: Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
4. In the **Client Key,** enter the key used to generate the OAuth token.
5. In the **Client Secret** field, enter the secret to generate the OAuth token.<br />**Note**: If the **Key** and **Secret** are stored in the [Configuration Manager](https://docs.capillarytech.com/docs/extension-configuration), [you can use DAO functions to retrieve them](https://docs.capillarytech.com/docs/configuration-manager).
6. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
7. Click **Done**.

<Image src="https://files.readme.io/f1a6a6929288ff958686592cbb02626839c80a11c4a6c7bd7bb355fcdc25e456-config_OAuth_block.gif" alt="Configuring Capillary's OAuth block" align="center" caption="Configuring Capillary's OAuth block" border={true} />

<br />