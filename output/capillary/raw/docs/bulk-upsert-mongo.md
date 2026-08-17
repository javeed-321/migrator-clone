---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Bulk Upsert Mongo Block

The Bulk Upsert Mongo block enables bulk upsert operations in MongoDB. Upsert is a database operation that combines update and insert actions, allowing new data to be inserted while updating existing records in bulk. Use this block when handling more than ten queries simultaneously.

# Example scenario

**Requirement**

A retail company tracks customers who achieve a specific target within a given timeframe. These customers qualify for rewards as part of the company's loyalty management program, which Capillary handles. The data is exported from the company's database as a CSV file and sent to the Capillary system. If a record exists, Capillary must update the record available in the Capillary database; otherwise, the system should create a new record.

**Solution**

To insert and update a large amount of data in MongoDB, create a dataflow using the Bulk Upsert Mongo block. This block updates existing data and inserts new data if it is missing in the specified collection.

Refer to this example [dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/ee1d88a8-6a2f-4392-b320-7097b82de6b6/version/78c97c99-98e4-48e6-b6f4-ed15fa7e5397?ruleType=org) to understand how it is configured for a use case.\
Make sure you have access to DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

# Configuring the Bulk Upsert Mongo block

To configure the Bulk Upsert Mongo block,

1. From the dataflow canvas, click on the node and select the **Bulk Upsert Mongo** block.
2. In the **Block Name**, enter the name of the block.\
   **Note**: Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
3. In the **Collection Name** field, enter the collection name to be updated.
4. In the **Mode** field, choose the mode of the update as `bulkupsert`.
5. In the **Query** field, enter the data to ingest into MongoDB.

> 📘 Notes
>
> * Both a filter and a query are mandatory in each object.
> * Each object contains:
>   * Selection filter – Finds specific records in the database.
>   * Query – Defines how the record should be updated.
> * DAO methods interact with the database and execute queries.
> * Expression handling enables dynamic query generation, allowing logic or conditions to modify queries before execution.
> * If the filter or query is missing, the operation fails due to an invalid input query.\
>   Below is the code from the Script block
>
> ```json Code in the Script block
> const requestBodyArray = getApiRequest().body;
>
>         const bulkOps = [];
>
>         for (const record of requestBodyArray) {
>             const { userGroupId, targetGroupId, targetRuleId, progressSumAmt, progressAvgAmt } = record;
>
>             // Create the filter using the composite primary key
>             const filter = {
>                 userGroupId,
>                 targetGroupId,
>                 targetRuleId
>             };
>
>             const upsertData = {
>                 filter: JSON.stringify(filter),
>                 query: JSON.stringify({ $set: { progressSumAmt, progressAvgAmt } }),
>                 upsert: true
>             };
>             bulkOps.push(upsertData);
>         }
>
>
>         return {
>             data: bulkOps
>         };
> ```

6. (Optional) In the **Options** field, specify any additional options for the query. These options modify query behavior and how results are returned.\
   **Note**: Refer to [MongoDB documentation on options](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/) for information on **Options**.
7. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
8. Click **Done**.

<Image align="center" alt="Configuring the Bulk Upsert Mongo block" border={true} caption="Configuring the Bulk Upsert Mongo block" src="https://files.readme.io/0c39889ef39e83f5086261b9a4cbcf4b66a2c0e4816725b7aa369c0bbccfacf6-21.02.2025_12.22.32_REC_configuring_bulk_mongo.gif" width="% " />