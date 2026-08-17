---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Connect and Manage DB

This feature allows you to interact with databases related to extensions by running queries. You can run either a `Read `or a `Write` query based on your requirement.

# Running Queries

1. Navigate to **DB Management** > **Mongo DB Workbench** in the Dev Console.
2. From the **Select Database** drop-down, select the database you want to interact with.
3. From the **Select Collection** drop-down, select the collection.\
   The Response section displays the collection's schema, showing the available fields.\
   **Note**: You can click **Load schema** to manually load the schema for the collection.
4. In the **Write Query** text box, enter your query.\
   You can either enter a write or a read query. Write queries are used to enter the data, such as insertion or update of data, and the read queries are used to retrieve data.
5. Click **Run Query**.\
   The results of the `read` query will be displayed in the console.  Queries involving insert, update, replace, delete, and write require approval, and the results are displayed after approval.\
   **Note**: You can explicitly add a limit clause to your query for the number of results, or the system might enforce a default limit if the number of results is more.

   <Image align="center" className="border" border={true} src="https://files.readme.io/56be905997d8603a3b23912904db7ed3da6f47c5bdf9bdf025a0757416eab388-runQuery.gif" />

# Viewing Query History

You can view the query history from the DB Audit log section.

To view, navigate to **Dev Console**> **DB Management**>**DB Audit Log**.  Click on the **ID** to view the query detail. The query detail page displays the following information:

| Field Name      | Description                        |
| :-------------- | :--------------------------------- |
| Database        | Database name                      |
| Collection      | Collection name                    |
| Query           | Query entered                      |
| Created by      | Name of the user who ran the query |
| Status          | Status of the query                |
| Records fetched | Number of records fetched          |
| Execution time  | Time taken to execute the query    |

<Image align="center" className="border" border={true} src="https://files.readme.io/061bf6ce0fd99a377d403778b7a99b4150bf4c4791f91270049ccc6d735064ed-View_query_history.png" />

# Approval Process for Write Queries

* DB Audit log> Approve