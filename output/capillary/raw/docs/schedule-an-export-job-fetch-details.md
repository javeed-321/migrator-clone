---
updatedAt: 2026-07-27T08:34:31.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Schedule an Export Job & Fetch Details

An export job can be either:

* Recurring: This job runs on a regular schedule (e.g., daily). It only exports new or updated data since the last export. For example, if the job is set to run daily for a month, each day it exports only the data from the previous day.
* One-Time: This job runs only once and exports the data available at that specific time.

# Prerequisites

* Insights access
* [FTP server configuration](https://docs.capillarytech.com/docs/configure-ftp-server-for-data-export) — required only when the export destination is **FTP**. Make sure the FTP server is correctly set up to handle data exports. This setup is crucial for the successful transfer of data.
* For a **Download** export, no FTP setup is needed. You need the **Exports Admin** permission to download the generated file.

> 📘 Note
>
> * The system does not assure a fixed finish time for the jobs. The export framework picks up a job according to the order of scheduled time.
> * Please note that you cannot:
>   * Edit the template after creation.
>   * Modify KPIs, dimensions, filters, and customer list once scheduled.
>   * Export measures (such as bill id, bill number, bill amount, auto update time) and custom fields in custom templates. You can export only KPIs and its dimensions.
> * Current day's data will not be included in the exported data as the data will be synced to the capillary server only during non-business hours.

<br />

# Configuring an export schedule

Perform the following steps to configure an export schedule:

1. [Create an Export Job (Step 1 of 3)](https://docs.capillarytech.com/docs/create-an-export-job-step-1-of-3)  .
2. [Select Data Templates (Step 2 of 3)](https://docs.capillarytech.com/docs/select-data-templates-step-2-of-3) templates that you want to export.
3. [Modifying Template & Creating Schedule (Step 3 of 3)](https://docs.capillarytech.com/docs/modifying-template-creating-schedule-step-3-of-3) templates to add or remove fields, apply filters and dimensions to export a specific data that you need
4. Click **Create** to schedule

> 📘 Important
>
> * When you use a Dimension template, the entire data will be exported irrespective of the duration filter applied. Hence, it is recommended not to use templates of Dimensions, Users for example, for recurring schedules unless you wanted to apply the Audience Group filter on it
> * You cannot apply standard filters such as outlier status, fraud status, merge status, and admin TILL

Once scheduled, the recipients will receive emails as per the scheduled frequency with the job details including the destination link of the exported data.

> 📘 Note
>
> The Notify Recipients dropdown only displays users who belong to the currently active organization (orgUsers) or are internal users. Users created under a different organization, even if they have the correct permissions, will not appear in the recipient list.

<Image align="center" className="border" border={true} src="https://files.readme.io/aa16acc-Uv54KdWoMjekGZdBu9jNzng3_KTWhoGbUQ.png" />

> 📘 Note
>
> As the export job writes the files in the specified FTP location, It is recommended to periodically check whether the username/password of the FTP location is configured correctly.\
> To access files from the FTP location, user should have read access to the FTP location

# Viewing Export Jobs

After creating an export job, you can view its status on the **Export Schedules** page. Additional search options are available to refine your search.

* **Name search**: Use the search box to find a specific export job, by its name.
* **Filter list by frequency**: Filter jobs by frequency: Once, Daily, Weekly, or Monthly. By default, all frequencies are displayed.
* **Filter list by status**: Filter jobs by status: All, Active, or Completed. By default, all jobs are displayed.

The **More** options icon is used to either **Duplicate** a job, **Delete** a job, or **View** the execution log of a job..

<Image align="center" className="border" border={true} src="https://files.readme.io/3cd91dbf908d3270bb699694c1169a10d19869d4ee7987e6d7a364715b1bd6ed-Export_schedule_1.png" />

A job has one of the following statuses: Yet to Execute, Success, or In Progress.

| **Icon**        | **Description**                                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Clock icon**  | Indicates that the job is created but has not yet executed.                                                                                                                                                       |
| **Yellow icon** | Indicates that an execution is currently in progress. A recurring scheduled job can have multiple executions, while a one-time job will have only one.                                                            |
| **Green icon**  | Indicates the job is successfully executed. For recurring jobs, the icon turns green upon successful completion of the current execution. It will change back to yellow when the next scheduled execution begins. |
| **Red icon**    | Indicates the job is unable to execute.                                                                                                                                                                           |

##

> 📘 Note
>
> * A recurring schedule job can have more than 1 executions where as a one-time schedule will have only one execution
> * When the job is in progress, you cannot kill or rerun the job
> * For each successful **FTP** export job, an email is sent to all the chosen recipients with the destination links of the exported files. To download files from the FTP server, select the link in the email, sign in, and download the zip file.
> * **Download** export jobs aren't emailed. Download the file from the **Execution Log**, as described below.

To view details of a specific job:

1. Click on the **schedule** that you want to see

<Image align="center" className="border" border={true} src="https://files.readme.io/d5a41f4-fZmsndk_oK3ggNnBVcKb-n8BbUNWhJmqhg.png" />

2. On the **Overview** tab, you can see the details of the schedule such as schedule name, description, schedule type, FTP tag, frequency, execution date, export data fields, notify recipients, and templates.

3. To see the execution log, click the **Execution** Log tab.

![](https://files.readme.io/0169fe1-auWMH_aldn_gOCem_FvvTDtrV8GBHmpE_Q.png "auWMH_aldn_gOCem_FvvTDtrV8GBHmpE_Q.png")

For a **Download** export schedule, the Execution Log shows a **Download CSV** link for each successful run. Select it to download the file from your browser.

> 📘 Note
>
> * Downloading the file requires the **Exports Admin** (`EXPORTS_ADMIN`) permission, granted through your role or user group. Admins with the permission see an active **Download CSV** link. Without it, the export still runs successfully, but the link stays disabled and hovering shows: "You do not have the permission to perform this action. Please contact your admin to request access."
> * Downloads are permission-gated because exported files can contain sensitive or personally identifiable information (PII).
> * Download supports files up to 10 MB. For larger exports, use the **FTP** destination instead.

4. If an export job fails in the middle for some reason, you can run the job manually by clicking the **Rerun** button. The job will run from the previous successful schedule.

##