---
updatedAt: 2026-06-16T09:44:32.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Extended Fields

## Introduction

Extended fields are configurable, system-recognized fields designed to capture structured information specific to certain business verticals, such as food and beverage, hospitality, aviation, and retail. Unlike free-form custom fields, extended fields enforce data consistency through controlled inputs, making them ideal for operational and analytical use.

**Important:** When you onboard an extended field as Integer type for bill or lineitem entities, the system converts null values from the source to 0 during ETL transformation. This helps with numeric aggregations but means null values are not preserved. If you need to retain nulls, onboard the field as String type instead.

Each extended field is predefined with attributes such as:

* Field ID
* Name
* Entity type (Example: customer, transaction, transaction line item)
* Label name
* Data type (Example: integer, double, enum, string)

### Key characteristics

* **Standardization**: Extended fields help standardize data capture across brands or organizations, reducing inconsistency often seen with custom fields.
* **Controlled input**: Developers define field names, data types, enum values, and applicable scopes. Validation rules help maintain clean, usable data.
* **Rule-based value capture**: Values for extended fields can be captured and validated based on predefined rules. These rules include:
  * **Logical expressions**: Simple boolean conditions that dictate value acceptance.
  * **Regular expressions (regex)**: Sophisticated patterns that validate data format and content (For example, ensuring an IMEI or a Global Unique Identifier (GUID) adheres to a specific structure). This ensures data conforms to exact specifications from the point of entry.
* **Vertical-specific data capture**: Extended fields are created for specific business verticals like food and beverage, hospitality, aviation, or jewelry. This allows businesses to capture unique attributes relevant to their industry.
* **Reporting-friendly**: Since the values are consistent and structured, extended fields are readily available for reporting, filtering, and analytics.
* **Null value handling for Integer fields**: For bill or lineitem entities, if you use Integer type extended fields, the system converts null values to 0 during ETL transformation. This supports numeric aggregations but does not preserve nulls. To retain null values, use String type for the extended field.

### Entity types

Entity types define the specific categories of objects or records to which an extended field can be attached. The supported entity types are:

* customer
* regular\_transaction
* return\_transaction
* not\_interested\_transaction
* not\_interested\_return\_transaction
* regular\_lineitem
* return\_lineitem
* not\_interested\_lineitem
* not\_interested\_return\_lineitem

### Supported data types

The following data types are supported for extended fields.

| Data type         | Description                                                                                                                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `INTEGER`         | Whole number values (no decimals). For bill or lineitem entities, null values are converted to `0` during ETL.                                                                                                                                                                                                                       |
| `STRING`          | Free-form text values.                                                                                                                                                                                                                                                                                                               |
| `DOUBLE`          | Decimal number values.                                                                                                                                                                                                                                                                                                               |
| `DATE`            | Date values in `YYYY-MM-DD` format.                                                                                                                                                                                                                                                                                                  |
| `DATETIME`        | Date and time values. Supports ISO 8601 format with timezone offset. See [Supported date formats](#supported-date-formats-in-extended-fields).                                                                                                                                                                                       |
| `STANDARD_STRING` | Text values restricted to a predefined system-level set.                                                                                                                                                                                                                                                                             |
| `STANDARD_ENUM`   | Enumeration restricted to predefined system-level values (for example, `gender`).                                                                                                                                                                                                                                                    |
| `CUSTOM_ENUM`     | Enumeration with values defined by the organization. Only organizations mapped to the field can use it.                                                                                                                                                                                                                              |
| `COUNTRY`         | Country selection from a system-defined list.                                                                                                                                                                                                                                                                                        |
| `CURRENCY`        | Currency selection from a system-defined list.                                                                                                                                                                                                                                                                                       |
| `LANGUAGE`        | Language selection from a system-defined list.                                                                                                                                                                                                                                                                                       |
| `ASSOCIATE_USER`  | Reference to an associated user in the system.                                                                                                                                                                                                                                                                                       |
| `ORG_ENTITY`      | Reference to an organization-level entity.                                                                                                                                                                                                                                                                                           |
| `CARD`            | Reference to a card record.                                                                                                                                                                                                                                                                                                          |
| `STRING_SET`      | A set of unique string values.                                                                                                                                                                                                                                                                                                       |
| `LIST`            | An ordered list of values. Each LIST field has metadata defining the element type (`TEXT`, `INTEGER`, or `DECIMAL`), optional allowed values, and optional minimum and maximum item counts. Values are passed as a comma-separated string (for example, `"RED,GREEN,BLUE"`) or a JSON array (for example, `["RED","GREEN","BLUE"]`). |

### Properties of extended fields

* Combination of name and entity type for extended fields must be unique.
* Extended fields are not case-sensitive.
* For Integer type extended fields on bill or lineitem entities, null values from the source are converted to 0 during ETL transformation. If you need to preserve nulls, use String type for the extended field.

### Mapping of extended fields

Extended fields are mapped to vertical IDs that represent business domains. These vertical IDs are further linked to organization IDs, enabling standardized field usage across organizations within the same vertical.

The following diagram illustrates the mapping.

<Image align="center" border={true} width="smart" src="https://files.readme.io/36f8462-ZWDw6OuJQNhrsbLCLQt7UY4EBgvDDsWNkg.png" className="border" />

### Verticals and vertical IDs

A vertical is a group that defines the nature of the business. An organization can have multiple verticals mapped to it.

For example, if an organization ABC sells fitness items and apparel, and another organization XYZ sells stationery and sports items, both organizations have one common vertical—sports.

Verticals have the following properties:

* Each vertical is mapped to the relevant set of extended fields.
* The vertical name should be unique across the table.

### Mapping extended fields and vertical IDs

The following properties apply to mapping extended fields and vertical IDs:

* Each extended field can be mapped to only one vertical ID.
* One vertical ID can be mapped to multiple extended fields.
* An extended field with vertical ID `-1` is available for all organizations. These are global fields and can be used by any organization.

### Mapping vertical IDs and organizations

Here are the properties of vertical ID and organization ID mapping:

* Organizations and Verticals have a many-to-many mapping.
* An organization cannot use an extended field that is not within the Verticals associated with it.
* Any organization can use extended fields with the Vertical ID `-1`.

### Validation rules

A validation rule can contain a logical or regex expression that evaluates the extended field values. Validation rules verify whether a field value meets the defined standards before saving it to the database.

That is, if a rule is applied on an extended field, a validation check is performed whenever the field value is received. Once the field value is validated successfully, it will be saved to the database.

Examples of logical rules: >, <, >=, <=, =

You first create rules (>, <) and then map each rule to the extended fields. Following are the properties of validation rules:

* Multiple rules can be applied to an extended field
* One rule can be applied to different fields

#### Configuration: CONF\_ENABLE\_TRANSACTION\_EXTENDEDFIELD\_SYNC\_VALIDATOR

This configuration controls whether extended field values are validated and persisted reliably during transaction processing.

* **When enabled (recommended):**
  * Extended field values are validated and saved as expected.
  * Data entered through API requests is correctly stored and appears in user interfaces, such as Member Care profiles.

* **When disabled:**
  * Extended field values may not be saved if a validation conflict occurs during processing.
  * In some cases, extended fields may be missing from Member Care profiles, even if the API request contains the correct data.
  * This can result in incomplete or missing information for users.

**Recommendation:**
Enable CONF\_ENABLE\_TRANSACTION\_EXTENDEDFIELD\_SYNC\_VALIDATOR to ensure extended field values are consistently validated and saved. Disabling this configuration may cause data loss or missing fields in user-facing applications.

### Other validations

In addition to rule validation, we also perform scope validation that is defined in the database tables.

* Only organizations mapped to them can use extended fields with custom enumeration values.
* An organization can use only extended fields that are mapped to it through vertical identifiers.
* Any organization can use extended fields with vertical identifier mapping of `-1`.

## Creating extended fields

To create an extended field, contact the Capillary support team. Extended fields are available in your organization by default. You can hide unused extended fields in the user interface (UI).

## Viewing extended fields

To view the default extended fields for your organization, do the following:

1. In InTouch, navigate to **Settings** > **Master Data Management** > **Data Model** > **Extended Fields**.

<Image align="center" border={true} src="https://files.readme.io/90345f2-image.png" className="border" />

2. To view all extended fields, click **All Extended Fields**. Expand the verticals to see the extended fields available for your organization.

<Image align="center" border={true} src="https://files.readme.io/aabb2dc-image.png" className="border" />

## Updating extended fields

You can update an extended field to show/hide it, set the position on the UI, choose whether mandatory or optional, and add enum values. The extended field format is `longtext`, which supports up to 4GB of text.

To update,

1. Click the extended field to edit in the **Enabled Extended Fields** tab.

<Image align="center" border={true} src="https://files.readme.io/c2d3113-image.png" className="border" />

2. Update the extended field as required.\
   The screenshot shows the editable values for extended fields.

<Image align="center" border={true} width="55% " src="https://files.readme.io/14951f8abbb679b18a229acbdef10463b659933f5dcf8932f87ddf8e4bec4549-Update_extended_fields.png" className="border" />

The table shows the editable values with their descriptions.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Insert Enum Values (applicable for fields with  `enum` datatype)
      </td>

      <td>
        Enter each supported value for the field and click **Add**.
      </td>
    </tr>

    <tr>
      <td>
        New Enum Values (applicable for fields with `enum` datatype)
      </td>

      <td>
        Click the value to select and click **Remove**, to remove any value from the list.
      </td>
    </tr>

    <tr>
      <td>
        Hide Display
      </td>

      <td>
        Select the **Hide Display** checkbox to hide the extended field from InTouch.  
        **Note**:  This field is currently not used.
      </td>
    </tr>

    <tr>
      <td>
        Is Mandatory
      </td>

      <td>
        Select the **Is Mandatory** checkbox to make the extended field mandatory.
      </td>
    </tr>

    <tr>
      <td>
        Is Updatable
      </td>

      <td>
        Select the **Is Updatable** checkbox to allow updating the extended field values once entered.
      </td>
    </tr>

    <tr>
      <td>
        Position
      </td>

      <td>
        Enter the position of the extended field on the InStore UI. Use `1` for the top, `2` for the second, and so on.
      </td>
    </tr>

    <tr>
      <td>
        Default Value
      </td>

      <td>
        Enter the default value for the extended field.
      </td>
    </tr>

    <tr>
      <td>
        Enable audit trail
      </td>

      <td>
        Select the checkbox to enable audit logging for the extended field. By default, you can enable audit logging for up to five extended fields. To increase this limit, raise a ticket with PST to update the configuration value `PRODUCT_CONF_ORG_AUDITABLE_EXTENDED_FIELDS_LIMIT`.
      </td>
    </tr>

    <tr>
      <td>
        Is it PII data
      </td>

      <td>
        Select the **Is it PII data** to classify the extended field as [PII data](https://docs.capillarytech.com/docs/pii-configuration#/).
      </td>
    </tr>

    <tr>
      <td>
        Reject txn on invalid value
      </td>

      <td>
        Select **Reject txn on invalid value** checkbox to reject the transaction if the values are invalid.
      </td>
    </tr>

    <tr>
      <td>
        Is it PSI data
      </td>

      <td>
        Select the **Is PSI Data** checkbox to classify the extended field as [PSI data](https://docs.capillarytech.com/docs/classify-potentially-sensitive-information-psi#/).
      </td>
    </tr>
  </tbody>
</Table>

4. Click **Submit**.

The system updates the extended field.

### View extended fields of a vertical

To view extended fields of a vertical, click the respective + **icon**. For example, if you want to view the Generic section, click the plus icon.

<Image align="center" border={true} width="smart" src="https://files.readme.io/082f850-Extended_field_overview.png" className="border" />

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        FIELD
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Name
      </td>

      <td>
        Name of the extended field as created in the DB
      </td>
    </tr>

    <tr>
      <td>
        Entity Type
      </td>

      <td>
        Type of the field
      </td>
    </tr>

    <tr>
      <td>
        Label
      </td>

      <td>
        Name of the field as it appears on the UI
      </td>
    </tr>

    <tr>
      <td>
        Data Type
      </td>

      <td>
        The data type of the field
      </td>
    </tr>

    <tr>
      <td>
        Enum Values
      </td>

      <td>
        Supported values of the field (if applicable)
      </td>
    </tr>

    <tr>
      <td>
        Is Mandatory
      </td>

      <td>
        Indicates if the extended field is mandatory. This field applies to client-side applications like Instore and does not undergo any server-side validation.
      </td>
    </tr>

    <tr>
      <td>
        Is Updatable
      </td>

      <td>
        Indicates if the extended field is updatable. This field applies to client-side applications like Instore and does not undergo any server-side validation.
      </td>
    </tr>

    <tr>
      <td>
        Hide Display
      </td>

      <td>
        Indicates if extended field is configured to hide from the client application. This field applies to client-side applications like Instore and does not undergo any server-side validation.  
        **Note**: This field is currently not used.
      </td>
    </tr>

    <tr>
      <td>
        Position
      </td>

      <td>
        Displays the position set for the extended field. This field applies to client-side applications like Instore and does not undergo any server-side validation.
      </td>
    </tr>

    <tr>
      <td>
        Default value
      </td>

      <td>
        Displays the default value of the extended field. This field applies to client-side applications like Instore and does not undergo any server-side validation.
      </td>
    </tr>

    <tr>
      <td>
        Is Audit trail enabled
      </td>

      <td>
        Indicates if audit logging of the extended field is enabled.
      </td>
    </tr>

    <tr>
      <td>
        Is PII data
      </td>

      <td>
        Indicates if the extended field is classified as PII data.
      </td>
    </tr>

    <tr>
      <td>
        Is PSI data
      </td>

      <td>
        Indicates if the extended field is classified as PSI data. Refer to the PSI data documentation for more [information on classifying PSI data](https://docs.capillarytech.com/docs/classify-potentially-sensitive-information-psi).
      </td>
    </tr>
  </tbody>
</Table>

## Enabling and disabling extended fields for a vertical

You can add or remove extended fields for a vertical. Do this from the **Extended Fields Vertical Mapping** tab. The **Disabled Verticals** section lists verticals that are available to your organization. The **Enabled Verticals** section lists verticals that are enabled for your organization.

<Image align="center" border={true} width="85% " src="https://files.readme.io/cfc82df97295921011906a4e2206ff9965efe6f0e47093cd75beabe82547750d-Screenshot_2025-07-31_at_12.24.46_PM.png" className="border" />

To enable a vertical,

1. From the **Extended Fields Vertical Mapping** tab, from the list of verticals under **Disabled Verticals**, select a vertical to enable to your organization.
2. Click **add >>**.
3. Click **Submit**.

The extended fields for the vertical are enabled for your organization.

To disable a vertical,

1. From the **Extended Fields Vertical Mapping** tab, from the list of verticals under **Enabled Verticals**, select a vertical to disable to your organization.
2. Click  **<< remove**.
3. Click **Submit**.

The extended fields for the vertical are disabled for your organization.

## Transformation Stats

This feature is no longer in use and is marked as deprecated.

<Image align="center" border={true} src="https://files.readme.io/ccdecfaaeb51683f02c21f0a710076eb5ed95a6710418a469321f42ac8c97e1a-Screenshot_2025-07-31_at_11.06.08_AM.png" className="border" />

## Supported date formats in extended fields

Extended fields support the following date formats:

* yyyy-MM-dd
* yyyy-MM-ddTHH:mm:ssZ (ISO 8601 with Z for UTC timezone)
* yyyy-MM-ddTHH:mm:ss+hh:mm (ISO 8601 with offset)

The table below explains the behaviour using an example specific to the India cluster.

| **Input Format**            | **Example Value**             | **Interpretation**             | **Saved in DB (UTC)**           | **Shown in Member Care**    |
| --------------------------- | ----------------------------- | ------------------------------ | ------------------------------- | --------------------------- |
| `yyyy-MM-dd`                | `"1986-07-15"`                | Time assumed as `00:00:00` UTC | `1986-07-15T00:00:00.000+00:00` | `1986-07-15T05:30:00+05:30` |
| `yyyy-MM-ddTHH:mm:ssZ`      | `"1986-07-15T00:00:00Z"`      | Exact UTC timestamp            | `1986-07-15T00:00:00.000+00:00` | `1986-07-15T05:30:00+05:30` |
| `yyyy-MM-ddTHH:mm:ssZ`      | `"1986-07-15T14:30:00Z"`      | Exact UTC timestamp            | `1986-07-15T14:30:00.000+00:00` | `1986-07-15T20:00:00+05:30` |
| `yyyy-MM-ddTHH:mm:ss+05:30` | `"1986-07-15T14:30:00+05:30"` | Local time with offset         | `1986-07-15T09:00:00.000+00:00` | `1986-07-15T14:30:00+05:30` |

> 📘 Note
>
> DateTime and Timestamp extended fields require an explicit timezone offset
>
> If you send a DateTime or Timestamp extended field value as a raw epoch millisecond
> integer (for example, `1769889600000`), the system treats it as UTC and converts it
> to the server timezone for ruleset evaluation. This can cause a significant time shift
> and result in incorrect promotion evaluation.
>
> Always send DateTime and Timestamp values in ISO 8601 format with an explicit timezone offset.
>
> | Format               | Example                                    | Behaviour                                                   |
> | -------------------- | ------------------------------------------ | ----------------------------------------------------------- |
> | Epoch (no offset)    | `"show_time": 1769889600000`               | Treated as UTC → converted to server timezone → time shifts |
> | ISO 8601 with offset | `"show_time": "2026-01-31T20:00:00-06:00"` | Interpreted as local time, no conversion applied            |
>
> This applies **only** to DateTime and Timestamp extended fields. Date-type extended
> fields follow a separate configuration (`CONF_DATE_EF_TZ_FIX_ENABLED`).

<br />

## Creating reports using extended fields

To display the extended fields on Insights and use this data to create reports, perform the following:

* Create a JIRA ticket to the Sustenance team and create a vertical-level field on the Capillary platform.
* Create a JIRA ticket to the Insights team and create an audience filter for the extended field.

## Configuring org extended fields through API

You can configure extended fields for your organization through the Configure organization extended fields API. See the [API documentation](https://docs.capillarytech.com/reference/configure-org-extended-field).

<br />