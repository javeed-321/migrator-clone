---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# GET Mongo Block

Get Mongo block allows you to write a query to read from the MongoDB. It helps you interact with MongoDB directly from the Neo UI, allowing you to fetch data from a MongoDB collection based on a specific query.

# Example scenario

**Requirement**
An airline brand allows customers to redeem loyalty points to book flight tickets for their dependants. However, before redeeming points, the dependants must be added as nominees. The system stores nominee details in a separate MongoDB table, with a maximum limit of five nominees per customer. Before adding a new nominee, the system must verify that the total number of nominees is less than five.

**Solution**

To implement this, create a dataflow that retrieves a customer's nominee information. Use a **GetMongo** block to determine the number of existing nominees.

Refer to this example [dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/95200b0d-e270-496a-a203-01cd2f33bc9f/version/d2b9f02b-9a56-4b01-baae-28b870b667f2?ruleType=org) to understand how it is configured for a use case. Make sure that you have access to DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

# Configuring the Get Mongo block

To configure the Get Mongo block,

1. From the dataflow canvas, click on the node and select the **GET Mongo** block.
2. In the **Block name** field, enter the block name.
   **Note:** Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
3. In the **Collection Name** field, enter the name of the MongoDB collection you want to query.
4. In the **Query** field, define the criteria for fetching data from MongoDB using JavaScript. You can also include EJSON format to handle complex data types. For more details, see [EJSON support in Mongo blocks](https://docs.capillarytech.com/docs/put-mongo#/extended-json-ejson).
5. In the **Sort** field, specify how to sort the results. You can sort the results in ascending (represented by **1**) or descending order (represented by **-1**). To sort, include the field and the sort order in the syntax \{field: sorting\_order}. If sorting is not required, use `{}` as the default value.
   **Example usage:**
   \{age:1} - Sorts the age field in ascending order
   \{age:-1} - Sorts the age field in descending order
6. (Optional) In the **Limit** field, specify the limit on the number of data fetched. In the **Options** field, specify any additional options for the query. These options modify query behavior and how results are returned.
   **Note**: For information on available options, refer to the  [MongoDB documentation on options](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/).
7. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
8. Click **Done**.

<Image align="center" alt="Configuring GET Mongo block" border={true} caption="Configuring the GET Mongo block" src="https://files.readme.io/06721970dd8545e1983ac2ca6caf1c1a732f0cbdbb5b3225f2c0f163dbdba250-26.02.2025_16.57.38_REC_configuring_get_mongo.gif" width="85% " />