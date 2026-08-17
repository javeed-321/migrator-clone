---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# PUT Mongo Block

The Put block lets you perform data operations such as INSERT, UPDATE, or UPSERT directly to the database based on a specified query and query key. This block is essential for modifying or adding new data entries within MongoDB during dataflow execution in Neo UI.

**Note:** You cannot delete any data entries from the MongoDB. This avoids unintentional deletion of that data. If you want to delete, you update the data entry and change the status to Inactive or Close. You can achieve this by using the [upsert command](https://docs.capillarytech.com/docs/bulk-upsert-mongo).

# Example scenario

**Requirement**

An airline brand allows customers to redeem loyalty points to book flight tickets for their dependants. However, before redeeming points, the dependants must be added as nominees. The system stores nominee details in a separate MongoDB table, with a maximum limit of five nominees per customer. The system must allow customers to add nominees while ensuring the limit is not exceeded.

**Solution**

To add nominees, create a dataflow that inserts information into the MongoDB table. Use a **PutMongo** block.

Refer to this example [dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/95200b0d-e270-496a-a203-01cd2f33bc9f/version/d2b9f02b-9a56-4b01-baae-28b870b667f2?ruleType=org)  to understand how it is configured for the given use case. Make sure that you have access to DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

In this dataflow, the **GET Mongo** block initially fetches the available nominees. Subsequently, the **PUT Mongo** block is utilized to update the nominee. If the number of nominees is fewer than the maximum limit of five, the system permits the addition of a nominee.

# Configuring the Put Mongo block

To configure the Put Mongo block,

1. From the dataflow canvas, click on the node and select the **PUT Mongo** block.
2. In the **Block name** field, enter the block name.
   **Note:** Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
3. In the **Collection Name** field, enter the name of the MongoDB collection you want to query.
4. In the **Mode** field, choose the mode. The available modes are Insert, Update, and Upsert.
5. In the **Query** field, enter the data you want to inject into MongoDB using JavaScript. You can also use [EJSON format](https://docs.capillarytech.com/docs/put-mongo#/extended-json-ejson) for complex data types.
6. (Optional) In the **Query Key** field, specify the key used to perform the update. The key identifies the specific record in the database that needs to be updated. You can also use [EJSON format](https://docs.capillarytech.com/docs/put-mongo#/extended-json-ejson) for complex data types.
7. (Optional) In the **Options** field, specify any additional options for the query. These options modify query behavior and how results are returned.
   **Note**: For information on available options, refer to the [MongoDB documentation on options](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/).
8. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions),[ cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
9. Click **Done**.

<Image align="center" alt="Configuring the Put Mongo block" border={true} caption="Configuring the Put Mongo block" src="https://files.readme.io/45fa9390ba92b582424645f3f644b94cc6249ed0a260e54d0dfc74ab63e46acc-17.02.2025_10.42.29_REC_Configuring_PUT_Mongo.gif" width="85% " />

# Extended JSON (EJSON)

Extended JSON (EJSON) is a JSON-based format that adds support for data types not natively handled by standard JSON. It is designed to represent complex types such as dates, 64-bit integers, or binary data without losing their original meaning. This avoids ambiguity, prevents data loss, and ensures values are interpreted consistently across systems.

EJSON is supported in both PUT and GET MongoDB blocks without requiring any additional libraries.

## Key features of EJSON

* **Type preservation:** EJSON retains original types, such as dates, 64-bit integers, object ID, and binary data.

* **JSON-compatible**: EJSON uses standard JSON text, ensuring JSON compatibility.

* **Explicit encoding**: EJSON represents extended types as objects with keys prefixed by $ through explicit encoding. For example: "$date", “$oid”

* **Interoperability**: EJSON ensures consistent interpretation of data across different systems and applications.

**EJSON vs JSON**

| Aspect               | JSON                                                       | EJSON                                                                  |
| -------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| Supported data types | Strings, numbers, booleans, arrays, objects, `null`        | All JSON types plus extended types like dates, int64, binary, ObjectId |
| Type fidelity        | Loses distinction. For example: date vs. string vs. number | Preserves original type with explicit notation                         |
| Date representation  | ISO 8601 string (`"2025-08-29T12:00:00Z"`) or timestamp    | `{"$date": "2025-08-29T12:00:00Z"}`                                    |
| 64-bit integers      | Stored as a number and may lose precision                  | `{"$numberLong": "1756468800000"}`                                     |
| Binary data          | Stored as a base64 string                                  | `{"$binary": {"base64": "...", "subType": "00"}}`                      |
| Compatibility        | Widely supported across systems                            | Designed for MongoDB and tools that support extended types             |

For more details on EJSON, refer to the documentation for [EJSON on MongoDB](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/)

## Use case

### Problem

In a loyalty program, customer transactions are stored in MongoDB. Standard JSON cannot represent certain data types, such as dates or unique identifiers. For example:

* If a transaction date is stored as a plain string (`"2025-08-29T12:00:00Z"`), the system cannot reliably distinguish it from any other string.

* If a transaction identifier is stored as a simple string, it loses the uniqueness and type safety that MongoDB’s `ObjectID` provides.

This ambiguity creates challenges in querying, sorting, and linking records.

### Solution

Use EJSON in MongoDB blocks within Neo dataflows.

**Example**

A transaction record in EJSON format:

```json
{
  "transactionId": { "$oid": "64fa1b9c5e7c3f001234abcd" },
  "customerId": { "$oid": "64fa1b9c5e7c3f001234abce" },
  "amount": 250,
  "transactionDate": { "$date": "2025-08-29T12:00:00Z" }
}
```

With this format, MongoDB can:

* Recognize `transactionDate` as an actual date for queries and sorting.
* Ensure that both `transactionId` and `customerId` are unique `ObjectID` values.

Refer to the screenshot below to understand the use of EJSON in the PUT MongoDB block.

<Image align="center" className="border" border={true} width="55% " src="https://files.readme.io/3b5a3fae020648a91a0204a93c8433d402814c383885033693eb76348bb37ea9-Screenshot_2025-09-03_at_11.20.27_AM.png" />