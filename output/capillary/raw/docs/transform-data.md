---
updatedAt: 2026-07-03T14:18:12.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Transform Data

Data transformation in Connect+ is the process of converting the ingested data to JSON format. To achieve this,  you need to map the fields in the source files to the appropriate API fields in this block.  This helps connect+ to convert the data to JSON, call the APIs successfully and upload the data. These fields in this Connect+ block are parameters of the JSON payload of the API associated with the template that you have selected for the dataflow.

Perform the following to map the fields:

1. If the workspace is linked to multiple orgs, select the org ID from the **Intouch Org** drop-down.

<Image src="https://files.readme.io/2bafd5e-Select_intouch_org.png" align="center" width="20% " border={true} />

2. In the **File Delimiter** text box, enter the delimiter used to separate the headings in the source file. By default, the delimiter is set as a comma.
3. Map the API fields with the appropriate columns in the source file. To map, perform the following:

   1. If the column header fields were not uploaded or defined, enter the column header name in the **File header** text box. This is the name of the column header in the source file that will have information for an API field. For example, a column named source can have values for the API field called source. You can also click on **Add more headers**  and can [add more headers](https://docs.capillarytech.com/docs/configure-actions#adding-additional-header) or [add headers using expression](https://docs.capillarytech.com/docs/configure-actions#adding-a-header-using-the-expression).

   2. Select the **API field** name from the API fields drop-down that corresponds to the column header specified in the File header text box. The number of mandatory fields that need to be mapped is displayed next to the parent API field.
      <Callout icon="📘" theme="info">
        ### Note

        For a partial return, the `returnType: "LINE_ITEM"` field must be placed at the transaction level in the payload, not inside the `lineItemsV2` array.
      </Callout>

   3. If required, in the **Filter data** text box, use [expression language](https://docs.capillarytech.com/docs/configure-actions#adding-a-header-using-the-expression) and add a filter condition to include or exclude data from the source file. **Example:** Consider a transaction dataflow that includes a **Financial status** header with values such as paid, refunded, or not paid. To exclusively process dataflow for transactions that are either paid or not paid, you can use the filter expression `${header_value:equals('paid'):or(${header_value:equals('not paid')})}`.<br />Refer [Defining column headers](https://docs.capillarytech.com/docs/configure-actions#defining-column-header-for-transform-block) for more information on mapping the API fields.

      <Image src="https://files.readme.io/153e3d20ec05d81eb50d7ddfe558b08cba36445430818bc07c1789197b48ce4d-with_header1.gif" align="center" width="80% " border={true} />

<br />

<Callout icon="📘" theme="info">
  ###

  **Note on switching organizations**

  When switching organizations (orgId) in Connect+, organization-level custom fields for the transaction entity are not displayed immediately. These custom fields become visible only after all mandatory fields are mapped and the **Continue** button is clicked during dataflow configuration. As a result, users cannot view or validate transaction-level custom fields until the required field-mapping step is completed, as the system fetches custom field metadata only after this step.
</Callout>

## Adding a header using the expression

If the value of an **API Field** is the same for all the customers, you can use `const{value}`. For example, to categorize **loyaltyType** as **loyalty** for all customers, you can enter `const{loyalty}` against the API field **loyaltyType**.  For more information, refer to the documentation on [using expression](https://docs.capillarytech.com/docs/know-about-expressions-in-connect#mapping-header-that-has-consistent-values).

To add a header using an expression,

1. Click **Add header using expression**.
2. Enter the expression in the text box.
3. From the API field drop-down, select the API field you want to map to the header.

<Image src="https://files.readme.io/b6e180e-Expression.png" align="center" border={true} />

## Adding additional header

If you selected **Add manually** as the Column headers input method (with or without header names) for transforming data in the **Connect to source** block, you will have the option to add additional headers. You can add the additional header while mapping the fields or [editing]().

<Callout icon="🚧" theme="warn">
  ### Note

  If you added the header information through the CSV file method, you cannot add additional headers.
</Callout>

<br />