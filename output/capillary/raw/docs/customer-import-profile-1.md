---
updatedAt: 2026-07-29T11:42:03.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customer Import Profile

# Overview

With Customer Import Profile, you can bring customer data into Capillary from a connected Databricks workspace without manual file uploads. You select a source table, choose how records are added or updated, map the fields to Capillary's customer profile, and validate everything before the import runs.

Use this feature to register new customers in bulk, refresh existing profiles, or do both in a single import. The four-step flow guides you through the process, and you can save a draft at any step to finish later.

## Import methods

The following are the import methods that are supported by the profile:

* Insert adds new records only
* Update changes existing records only
* Upsert adds new records and updates existing ones

# Create an import job

Select the data source and the table you want to import from your Databricks workspace.

### Step 1: Job settings

1. Select the job type:
   * **One-time**: runs a single import and stops.
   * **Recurring**: automatically runs on a schedule you define.

     <Image src="https://files.readme.io/99efef0ff24be5a87eb91c3f62f48545feff4ec3c103bd3d03dcfbbff5a1c4e4-2importmethods.png" border={true} />

2. If you selected **Recurring**, set the frequency:

   | Frequency                | Additional fields                                                                                             |
   | ------------------------ | ------------------------------------------------------------------------------------------------------------- |
   | Every 15 mins            | None                                                                                                          |
   | Hourly                   | None                                                                                                          |
   | Daily                    | **At**: select a time                                                                                         |
   | Weekly                   | **On**: select a day of the week; **At**: select a time                                                       |
   | Monthly                  | **On**: select First day of the month, 15th day of the month, or Last day of the month; **At**: select a time |
   | Custom (cron expression) | **Cron expression**: enter a valid cron expression                                                            |

   <Image src="https://files.readme.io/b04112c2256f566b587638ae61a86937b463abd9f17044e0621f039e9e784384-set_frequency.png" border={true} />

3. If you selected **Recurring**, set the start and end time for the schedule:
   * **Start time**: select **Start immediately** to begin on the next scheduled occurrence, or select **Specific date and time** to set a date and time.
   * **End time**: select **Runs indefinitely** to keep the schedule running until you stop it manually, or select **Specific date and time** to set when the schedule stops.

     <Image src="https://files.readme.io/b6214c63925867c70bfa3683386e76fa2f4b7056c696f9197ddb3657788deed5-Screenshot_2026-07-10_at_2.15.08_PM.png" border={true} />

4. Under **Run approval**, select how the job is approved before importing:
   * **Auto-approve this import** (default): the job runs without manual review.
   * **Send for approval when the import crosses a limit of**: the system holds the job for manual approval when the import meets either condition below. Select one or both:
     * **Number of records**: enter a threshold. The system sends the job for approval when the import contains more than the specified number of records.
     * **Error rate**: enter a percentage. The system sends the job for approval when the error rate exceeds the specified percentage.

       <Image src="https://files.readme.io/ae7709402e40da63c039b66f082849723f9781d65e983797781524f97f295e8b-runApproval.png" border={true} />

5. In the **Notify** field, enter the email addresses of users who should receive a notification when a run crosses a limit. Select **Enter** after each address.

> **Note:** Select **Save as draft** at any step to save your progress and return to the job later.

6. Select **Next**.

## Step 2: Data to import

1. Under **Data source**, select **Databricks**.

2. In the **Table pattern** field, enter the name of your source table. The name must exactly match the table name in Databricks.

3. When the system finds a match, a confirmation appears: "1 tables matched". <br />In the **Select table** dropdown, select your table.

   <Image src="https://files.readme.io/7d3b549a5a148f48627ff2c8c56090eaaf9746a99dcbe32e52f1f91b02d3bf71-table_match.png" border={true} />

4. A preview of the top 50 records appears along with the total record count. Review the preview to confirm you've selected the correct table.

   <Image src="https://files.readme.io/fb94d8bf6a4f851a71f2a2e11bcee507ea0eb646de3a0da6be7be9516d887d19-tale_content.png" border={true} />

5. Select **Next**.

## Step 3: Profile and method

Define the import profile that matches your data type and select how the records should be written to the Capillary database.

1. Under **Import profile**, select the dropdown and select the profile that matches the type of data you are importing. The profile tells the system what entity the data belongs to and how it should be validated and processed.

   The following profiles are available:

   * **Customer:** For importing customer registration or profile data.

<Image src="https://files.readme.io/9fe953c93df77e0a61da75102a67dd03f8ddf8ce84fa9b788a6c5413cf93a49c-data-import-google-docs_4.png" align="center" width="85% " border={true} />

2. Under **Import method**, select how the records from your table should be written to the Capillary database. Three methods are available:

| Method | Description                                                         |
| :----- | :------------------------------------------------------------------ |
| Insert | Inserts new records only; skips if an existing record is found      |
| Update | Updates existing records if found; does not insert new records      |
| Upsert | Updates existing records if found; otherwise inserts as new records |

**Note:** The Upsert method is supported even when <Anchor target="_blank" href="https://docs.capillarytech.com/docs/customer_entity#setup-customer-configs">CONF\_ALLOW\_REGISTRATION\_FROM\_ANY\_IDENTIFIERS</Anchor> is enabled for the organization.

<Image src="https://files.readme.io/5fbcac8c7db8655610b06f89de4bfb8d7bb39e534bb4acd65b04e252277dfb51-data-import-google-docs_5.png" align="center" width="85% " border={true} />

3. Under **Additional configurations**, set the **Unique ID**. This defines the identifier the system uses to distinguish between customer accounts during the import.

   Select one of the following:

   * **MOBILE**

   * **EXTERNAL\_ID**

   * **USER\_ID**

   * **EMAIL**

<Image src="https://files.readme.io/8faa34677a95dc2227de28967d61c3749f5b7deb72a09492770d05f50c439baf-data-import-google-docs_6.png" align="center" width="85% " border={true} />

4. Once you have configured the profile, method, and Unique ID, do one of the following:

   * Select **Previous step** to go back to [Step 1: Data to import](#step-1-data-to-import).
   * Select **Save as draft** to save the current configuration and continue later. A modal appears prompting you to enter a Job name and an optional Description. Select **Save** to store the draft. The job appears on the imports listing page, where you can return to edit and complete it later.
   * Select **Next** to proceed to [Step 3: Fields mapping](#step-3-fields-mapping).

## Step 4: Fields mapping

Map the fields from your source data to the corresponding customer profile fields to ensure accurate data import.

1. In the **Fields mapping** section, review the list of source fields displayed under **Fields of source data to be imported**. The banner at the top shows how many mandatory profile fields still need to be mapped, for example: 0/4 mandatory profile fields mapped.

<Image src="https://files.readme.io/04da8f68c9d6946902534ef4e5563e0bba255f886604c03c8da71ebcef3dabc3-data-import-google-docs_7.png" align="center" width="85% " border={true} />

2. Select **View mandatory fields** to see which fields are required for the selected profile. The modal lists all mandatory fields marked with `*`.

<Image src="https://files.readme.io/d3dce7b6fe6ecd13a31f849a0acb197c3d7e403bcd0be27859994aed095b585c-data-import-google-docs_8.png" align="center" width="85% " border={true} />

3. For each source field, select **Select profile field** under **Customer profile fields** and select the appropriate field. Fields are organised into the following categories:

* [Standard fields](https://docs.capillarytech.com/docs/standard-fields)

* <Anchor target="_blank" href="https://docs.capillarytech.com/docs/dimension-tables#customer-slab">Customer slab</Anchor>

* <Anchor target="_blank" href="https://docs.capillarytech.com/docs/customer_entity#managing-customer-lifecycle-with-customer-status">Customer status</Anchor>

* [Custom fields](https://docs.capillarytech.com/docs/entity-management-custom-fields)

* [Extended fields](https://docs.capillarytech.com/docs/extended-fields)

<Image src="https://files.readme.io/b859871aec4b731d06dd1cc4167286fc53e03a8388d2b6417cea1d0845badfe7-data-import-google-docs_9.png" align="center" width="85% " border={true} />

**Note:** When you map a field that is mandatory for the selected profile, the Mark as mandatory checkbox is automatically selected.

4. Track your mapping progress using the banner at the top, for example: 3/4 mandatory profile fields mapped. The Customer profile fields column header also shows a running count.

5. Optionally, select the **Mark as mandatory** checkbox next to any additional field to enforce it as mandatory for this import. Fields marked as mandatory must have valid values; otherwise, the record is marked as invalid during import.

   **Note -** If you selected the **Update** import method, identifier fields such as mobile, email, and external ID cannot be updated. Mapping these fields has no effect. Only non-identifier fields are updated.

6. Once mapping is complete, do one of the following:

   * Select **Next** to proceed to [Step 4: Review and proceed](#step-4-review-and-proceed).
   * Select **Save as draft** to save the current configuration and continue later. A modal appears prompting you to enter a Job name and an optional Description. Select **Save** to store the draft. The job appears on the imports listing page, where you can return to edit and complete it later.
   * Select **Previous step** to go back to [Step 2: Profile and method](#step-2-profile-and-method).

## Step 5: Review and proceed

Review the complete configuration of your import job and submit it for validation.

To review and proceed, follow the steps given below.

1. Enter a **Job name** to help identify the job later.

2. Optionally, enter a **Description** for this job.

   <Image src="https://files.readme.io/cfc61b9b043e042a34b6bffab6fe153d0ee30f8f692a5aeac6f836be9543791d-data-import-google-docs_10.png" align="center" width="85% " border={true} />

3. Review the **Configuration summary**. This section provides an overview of all settings configured across the previous steps. Verify each section before proceeding.

   <Image src="https://files.readme.io/68057efb5318107a63c05167a123633a162f079e38f205da61e537a4c0e9e860-data-import-google-docs_11.png" align="center" width="85% " border={true} />

4. Navigate to the **Profile and method** section and select **Show additional configurations** to expand and view the additional settings configured in [Step 2](#step-2-profile-and-method). Select **Hide additional configurations** to collapse the section.

   <Image src="https://files.readme.io/d97f694aec80edc0d57b68724c22760952dfa61cdf20d184a37049b5a9cd5c3a-data-import-google-docs_12.png" align="center" border={true} />

5. Navigate to the **Fields mapping** section and select **Show mapping** to expand and view the complete field mapping. Fields marked with `*` and a green checkmark under Required indicate mandatory fields that have been mapped. Select **Hide mapping** to collapse the mapping table.

<Image src="https://files.readme.io/75765708cb17e46f18c44e0e54ddc905778dff45061a7b5751c743ace0f9424e-data-import-google-docs_13.png" align="center" width="85% " border={true} />

6. Once you have reviewed the configuration, do one of the following:

   * Select **Previous step** to go back to [Step 3: Fields mapping](#step-3-fields-mapping).

   * Select **Save as draft** to save the current configuration and continue later. A modal appears prompting you to enter a Job name and an optional Description. Select **Save** to store the draft. The job appears on the imports listing page, where you can return to edit and complete it later.

   * Select **Proceed to validate** to submit the import job for validation. A confirmation modal appears. Select **Yes, validate** to confirm.

<br />