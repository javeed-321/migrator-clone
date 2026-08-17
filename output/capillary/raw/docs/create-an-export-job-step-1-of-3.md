---
updatedAt: 2026-07-28T05:28:39.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create an export job (Step 1 of 3)

To schedule an export event, do the following: (All fields marked by \* are mandatory)

1. On Insights+, navigate to **Data connectors > Export Schedules**.
2. Click **Create Export Schedule**.

<Image src="https://files.readme.io/0e387aa724c343e300d428bcccfe6843e5f32d7157d1bdf0bf2388d071611662-Screenshot_2026-07-27_at_4.56.20_PM.png" align="center" border={true} />

3. **Schedule Name**: Specify a unique name for the current schedule job without any special characters.  You can use *or space in the name if required. For example, Summer Sale Transactions or Summer*Sale\_Transactions
4. **Description**: Specify a short description of the schedule.
5. **Export Destination**: Choose where the export goes.
   * **FTP**: Sends the exported files to a configured FTP server, on a one-time or recurring schedule. Continue with steps 6-11 below.
   * **Download**: Generates a one-time CSV file that you download from the browser. Selecting **Download** hides the FTP server, frequency, notify recipients, and encryption options. See [Exporting with the Download destination](https://docs.capillarytech.com/docs/create-an-export-job-step-1-of-3#export-data-using-the-download-destination).
6. From the **FTP** drop-down, choose the FTP Server to which you want to export the current data.  The file will save in the default location of the chosen FTP server (Configuring FTP Server for Data Export). You can add up to 2 folders as explained in Step 3 of 3, [Modifying Template & Creating Schedule (Step 3 of 3)](https://docs.capillarytech.com/docs/modifying-template-creating-schedule-step-3-of-3) Template.
7. **Frequency**: Choose the frequency of running the current export job - Once, Daily, Weekly or Monthly. You can set a maximum duration of one year.

<Callout icon="📘" theme="info">
  ### Note

  - In Validity of recurring schedules, you cannot select past dates, but can only select current date or a future date
  - In Export Data of one-time schedules, you can only select past duration until when the data is available
  - You can schedule an export based on the use Last Updated Date or Event Date
</Callout>

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
        Once
      </td>

      <td>
        Runs the export job on the scheduled date(only once).<br />In this, the **Execute on** date will be selected by default, which is the current date.<br />In **Export Data** from, you need to choose the duration for which you want to capture data (supports up to one-year duration). You can select only up to the last sync date but not the current date or future date.
      </td>
    </tr>

    <tr>
      <td>
        Daily
      </td>

      <td>
        Runs the export job on a daily basis for the duration you specify.<br />In **Validity**, choose the duration for which you want this daily schedule to run. You can select only current and future dates.<br />You will get the previous day's data the next day. For example, you will get the current day's data the next day.<br />**Note**: You cannot select past date in Validity
      </td>
    </tr>

    <tr>
      <td>
        Weekly
      </td>

      <td>
        Runs the job on a weekly basis for the duration you specify.<br />In Execute on, select the day of the week when you want to run the weekly schedule<br />In Validity, choose the duration for which you want this weekly schedule to run. You can select only current and future dates. You can schedule up to a maximum of one year duration.

        **Note** :  If you want the file weekly, every Monday, then Execute on should be set to Sunday.
      </td>
    </tr>

    <tr>
      <td>
        Monthly
      </td>

      <td>
        Runs the job on a monthly basis for the specified duration.<br />In **Execute on**, select the day of the month when you want to run the monthly schedule, which is from 1-30/31.<br />In **Validity**, choose the duration for which you want this monthly schedule to run. You can select only current and future dates and schedule up to a maximum of one-year duration.<br />**Note**: If Execute on is set to 1, you will get monthly data that is available until the 1st of every month on the 2nd.
      </td>
    </tr>
  </tbody>
</Table>

8. Notify Recipients: Select the recipients for the current schedule and click Select to apply. These users will get recurring notifications (until the validity of the job) whenever the job runs and sends the link of the target location of the exported data
9. Enable the **Encrypt data** toggle switch, if you want to encrypt the export data. Configure the public keys, if the public keys are not configured. Refer to [documentation on the data encryption settings for export](https://docs.capillarytech.com/docs/settings).
10. From the **Public key** drop-down, select the public key name.
11. Continue to next steps.

## Export data using the download destination

Select **Download** as the export destination to generate a CSV file that you can download directly from your browser without configuring an FTP server. Unlike the FTP destination, the Download destination does not support **Frequency, FTP Server, Notify Recipients,** or **Encryption** settings. Download exports run only once and are not emailed to recipients.

1. For **Export Destination**, select **Download**.

2. In **Export Data**, select the **From** and **Till** dates for the data you want to export. <br />**Note**: You can select a date range of up to one year. The end date cannot be later than the last sync date.

3. Click **+Add/Remove templates** to select the templates to export. For more information, see [Select Data Templates (Step 2 of 3)](https://docs.capillarytech.com/docs/select-data-templates-step-2-of-3).

   <Image src="https://files.readme.io/22a19dd0bd88280b191a9095407442828bbccbbf659c929af93b37da7085bba7-Screenshot_2026-07-27_at_5.11.18_PM.png" border={true} />

4. Select **Create**.

   <Image src="https://files.readme.io/30e106b2ef62870a69b49fefca9c4f329c2a46bdc280fdb2ada87c9940da079f-Screenshot_2026-07-27_at_5.16.55_PM.png" border={true} />

   &#x20;After the export completes, you can download the file from the **Execution Log**. For more information, see [Viewing Export Jobs](https://docs.capillarytech.com/docs/schedule-an-export-job-fetch-details#viewing-export-jobs).

<Callout icon="📘" theme="info">
  ### Note

  - Anyone who can create export schedules can create a Download export. Downloading the file requires the **Exports Admin** (`EXPORTS_ADMIN`) permission, granted through your role or user group.
  - Admins with the permission see an active **Download CSV** link. Without it, the export still runs successfully, but the link stays disabled and hovering shows: "You do not have the permission to perform this action. Please contact your admin to request access."
  - Downloads are permission-gated because exported files can contain sensitive or personally identifiable information (PII).
  - Download supports files up to 10 MB. For larger exports, use the **FTP** destination instead.
</Callout>

<br />