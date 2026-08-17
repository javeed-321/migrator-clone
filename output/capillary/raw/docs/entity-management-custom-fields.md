---
updatedAt: 2026-06-10T12:43:54.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Custom Fields

## Introduction

Custom fields are user-defined attributes used to capture information not covered by standard or extended fields. They offer flexibility to store specialized data across entities such as customers, transactions, transaction line items, and coupons.

While custom fields are useful for capturing non-standard information, they can pose challenges in maintaining data consistency, generating accurate reports, and conducting reliable analysis.

### Scope of custom fields

You can create custom fields for the following scopes:

* Loyalty registration
* Loyalty transaction
* Customer feedback
* Zone custom fields
* Store custom fields
* Points redemption
* Voucher redemption (coupon redemption)
* Customer advanced feedback
* Customer preferences
* Customer Card

### Key limitations

* **Uncontrolled field values**<br />Custom fields often lack strict data entry rules, resulting in inconsistent or unclear data. For example, a gender field might have entries such as "M," "F," "Male," "Female," or "MF." These differences make it more challenging to filter, search, or report on the data, and often require manual effort to clean and standardize the values.
* **Limited reporting and analytics support**<br />Custom fields are less suitable for reporting and analytics than extended fields.
  * Custom fields cannot be used as dimensions in reports, which are essential for grouping and analyzing data.
  * Custom fields support only simple filtering, such as exact matches (regular expressions). They do not support advanced options, such as filtering by range or partial values. This limits their effectiveness in complex data searches.
* **Implications for CDP integration and data governance**<br />In Loyalty, custom and extended fields are often used interchangeably, such as in rule definitions. However,  Customer Data Platforms (CDPs) enforce stricter standards to ensure data consistency and quality.

  The uncontrolled nature of custom field values can hinder their direct use in CDP-driven use cases like personalization, segmentation, and automated workflows unless rigorous validation and standardization practices are applied.

## Creating a new custom field

> ⚠️ Important
>
> For store-level custom fields, you must enter a label for the field to appear as editable on the store page. If you do not provide a label, the custom field will not be visible or editable in the UI. This requirement is due to how the frontend displays custom fields based on the presence of a label.

To create a new custom field, perform the following:

1. On InTouch, navigate to  **Organization Settings** > **Master Data Management** > **Data Model** > **Custom Fields**.

<Image src="https://files.readme.io/77e3f9c7c4853867cdae644739f414576cbc42e888b8e069ee3b92bff0d179fa-image.png" align="center" width="80% " border={true} />

2. Click **Add New Custom Field.**

<Image src="https://files.readme.io/9b3f43946eae291548d6d0e8ca3defde6d794e5fb45ceb20ca31add06a235f82-image.png" align="center" width="80% " border={true} />

3. Configure the new custom field.

<Image src="https://files.readme.io/473f46e12980e202a84d60ffea547092b3ab1453559d9f348cb7ef66e4fac065-cdp_.gif" align="center" width="80% " border={true} />

The table shows the fields with their descriptions.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        OPTION
      </th>

      <th>
        DESCRIPTION
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Field Name
      </td>

      <td>
        Name of the field.<br />**Note**:  Field names must be unique within each organization, regardless of the scope. You cannot create multiple custom fields with the same name in different scopes within the same organization. Attempting to do so will fail silently, and the custom field will not be created.
      </td>
    </tr>

    <tr>
      <td>
        Applicable Entity
      </td>

      <td>
        Choose the entry of the custom field from the options available.

        - Loyalty registration

        - Loyalty transaction

        - Customer feedback

        - Zone custom fields

        - Store custom fields

        - Points redemption

        - Voucher redemption (coupon redemption)

        - Customer advanced feedback

        - Customer preferences

        - Customer card
      </td>
    </tr>

    <tr>
      <td>
        Label
      </td>

      <td>
        Enter the field name to appear on the UI. <strong>For store-level custom fields, the field is only shown as editable on the store page if a label is configured. If you do not enter a label, the custom field will not appear or be editable in the UI.</strong>
      </td>
    </tr>

    <tr>
      <td>
        Enable Audit Trail
      </td>

      <td>
        Select the checkbox if you want to enable audit logging of the custom field. You can add up to 5 custom fields for audit logging.
      </td>
    </tr>

    <tr>
      <td>
        Is this pii data ?
      </td>

      <td>
        Select the checkbox if you want to classify the custom field as PII data.
      </td>
    </tr>

    <tr>
      <td>
        Is this psi data
      </td>

      <td>
        Select the checkbox to classify the extended field as sensitive data. Refer to the PSI data documentation for more [information on classifying PSI data](https://docs.capillarytech.com/docs/classify-potentially-sensitive-information-psi) .
      </td>
    </tr>
  </tbody>
</Table>

> 📘
>
> **Notes**
>
> * Custom field names have a 20-character limit, and custom field values can contain up to 250 values. Speical characters (! @ # $ % / ? . >) are not supported for custom field names.
> * The data type for all custom fields is set to String by default. You cannot change the data type.

5. Click **Submit**.

The custom field is created.

## Viewing a custom field

1. To view the new custom field, navigate to **Organization Settings** > **Master Data Management** > **Data Model** > **Custom Fields**.

2. Click the scope of the custom field .<br />All custom fields within the scope are visible.

   <Image src="https://files.readme.io/1e9c2015c08a2f954caafdbdfa7577aa6c1c1f67fb1baf96542b95a091099869-scope_of_cf.png" align="center" border={true} />

3. Click the custom field to view.

<Image src="https://files.readme.io/627aa87-image.png" align="center" border={true} />

## Updating a custom field

To update a custom field, perform the following:

1. On InTouch, navigate to  **Organization Settings** > **Master Data Management** > **Data Model** > **Custom Fields**.

<Image src="https://files.readme.io/9495020-image.png" align="center" border={true} />

2. Select the field you want to modify.
3. Click **Edit**.

![](https://files.readme.io/405f028-image.png)

4. Update the custom field according to your requirements.
5. Click **Submit**.

### Updating custom fields via Data Import Framework

When updating custom fields using the Data Import Framework, blank or null values in the import file will not clear the field. To clear or reset a custom field, enter a dash ('-') as the value in the import file. The system will interpret the dash as 'no data' and clear the field value.

## Deleting a custom field

To delete a custom field, perform the following:

1. On InTouch, navigate to  **Organization Settings** > **Master Data Management** > **Data Model** > **Custom Fields.**
2. Click the field you want to delete.
3. Click **Edit**.
4. Select the **Disable Custom Field**.

<Image src="https://files.readme.io/71c30ed-image.png" align="center" border={true} />

5. Click **Submit**.

After you make changes in a custom field:

* For Store Server, perform a complete sync from Settings or wait till the next auto-sync completes.
* For Thin Client, restart your thin client and check if you are able to view the changes.

## Converting custom field to extended field

To convert a custom field to an extended field, raise a ticket to the Platforms team requesting the conversion. The converted extended field is be used in reports and campaigns.

> 📘 NOTE:
>
> * The platforms team verifies whether the conversion is necessary; otherwise, the request is rejected.
> * The platforms team carries out the mapping of custom field to extended field.

<br />