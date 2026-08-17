---
updatedAt: 2026-07-07T09:57:41.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# OrgContextSwitch Block

This block is used in a [connected organization](https://docs.capillarytech.com/docs/organization-management#connected-organizations-connected-orgs) context where a parent-child relationship exists. A parent organization can have one or multiple child organizations under it. Using this block, you can change the execution context from the parent organization to a specific child organization, ensuring that all subsequent blocks execute within the child’s context.

The request originates from the parent organization, and once the context is switched to a child organization, it cannot be reverted to the parent. However, you can execute certain blocks within the parent organization's context by selecting the execution context during block configuration.

# Example scenario

**Requirement**

A parent organization manages four child organizations, each requiring 10 unique APIs to perform organization-specific operations. This leads to a total of 40 APIs - 10 per child organization. This setup caused redundancy, higher maintenance efforts, and increased complexity.

**Solution**

To simplify this, use the OrgContextSwitch block. Create the 10 APIs at the parent organization level. Each API has the following workflow:

1. Execute parent-level operations.

2. Use **OrgContextSwitch** to dynamically switch to the child organization making the request.

3. Complete child-specific operations.

This approach removes 30 redundant APIs.

Refer to this example [dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/app/1knscT/rule/3cd05d44-f366-412a-956a-1ddc5c948534/version/58f88995-546f-44d4-b114-c5cf78c77420?ruleType=org) to understand how it is configured for the use case.<br />Make sure you have access to DocDemo org (100737) in EU cluster and  [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

# Configuring the OrgContextSwtich block

To configure the OrgContextSwtich block,

1. From the dataflow canvas, click on the node and select the **OrgContextSwitch** block.
2. In the **Block Name**, enter the name of the block.<br />Note: Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
3. In the **Authorization** field, enter the basic authorization to access the child organization.
4. In the **X-CAP-API-AUTH-ORG-ID** field, enter the orgID of the child organization.
5. In the **X-CAP-API-AUTH-KEY** field, enter the authorization key of the child organization.
6. In the **X-CAP-API-AUTH-ENTITY-ID** field\*\*,\*\* enter the entity ID of the child organization.
7. If authenticating using the OAuth token, in the **X-CAP-API-OAUTH-TOKEN** field, enter the OAuth token required to access the child organization.<br />**Note**:  You can create the OAuth Token using the [OAuth block](https://docs.capillarytech.com/docs/capillarys-oauth-block).
8. In the **Block Context Execution Strategy** field, choose the execution context. The execution contexts available are CHILD and PARENT.

   * If the execution strategy is set to **CHILD**, all blocks following the **OrgContextSwitch** block will execute within the child organization’s context.
   * If the execution strategy is set to **PARENT**, the MongoDB, Redis Evict, and Kafka blocks will operate within the context of the parent organization, while other blocks will function within the context of the child organization.
9. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
10. Click **Done**.

<Image src="https://files.readme.io/ecd6a7ac10887449bc0d8af2f53fdfd69bed30a424535a29e95568125143c8ee-19.02.2025_17.16.46_REC_configuring_orgcontextswitch.gif" alt="Configuring OrgContextSwitch block" align="center" caption="Configuring OrgContextSwitch block" border={true} />

<br />