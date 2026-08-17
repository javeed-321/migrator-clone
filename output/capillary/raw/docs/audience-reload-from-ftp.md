---
updatedAt: 2026-06-25T06:24:05.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Audience Reload from FTP

This page provides you with information on the Audience Reload from FTP template.

This template allows the refreshing of files in the defined FTP location at specified intervals and enables automatic updating of the audience list on Engage+.

# Prerequisites:

* The audience CSV file from Databricks should be available in the FTP location.
* An audience list must be created in the Engage+ Audience Manager. The same name should be used when configuring the template. The audience name should not contain any 'whitespace.' For example, FTP Test is an invalid name; instead, you should use FTP\_Test.

# Configuring the template

1. In the **Connect-to-FTP** <Glossary>Block</Glossary>, enter the FTP location where the file is present and the location for saving the processed file. For information on this block. Refer to the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/connect-to-source#/">Connect to source</Anchor> documentation.

<Image src="https://files.readme.io/2adce57e1b604d1c346a03d02ec8c946159532a2fb63ea0e6dfef04e11cc7ba8-Screenshot_2025-12-10_at_4.27.18_PM.png" align="center" width="75% " border={true} />

<Callout icon="📘" theme="info">
  ###

  Notes

  - The source directory should be different for each audience list.
  - It is recommended to keep the source FTP location name similar to the audience list name. For example, if the audience list name is INxyz, name the FTP file directory IN\_xyz.
  - If the audience list is large, it is recommended to compress the file and upload. Make sure that you enable the **Unzip files** option.
</Callout>

2. In the **Push-To-S3**, enter the S3 block details. For more information, refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/push-to-s3#/">Push to S3 </Anchor>.

<Image src="https://files.readme.io/bf9c0a2145f4bd85138473ea484a0c063623cfdc3fdc8f45990f5d0bbf3d1937-Screenshot_2025-12-10_at_4.46.22_PM.png" align="center" border={true} />

* **S3 Object name/Filename** - Enter the object name in the format `connect_plus_audience_upload/YOUR_AUDIENCE_GROUPNAME/${filename}`, where audience\_Group\_Name is the audience name used in the Engage+.

  For example: `connect_plus_audience_upload/names_mobile/${filename}`, where names\_mobile is the audience name used in the Engage+
* **S3 Bucket Name** - Use the appropriate bucket name depending on the cluster region.

| Region          | Bucket name                 |
| :-------------- | :-------------------------- |
| INCRM / APAC    | campaignsindia              |
| USCRM           | uscrm-campaignst949oay82p   |
| EUCRM           | campaignseu                 |
| SEACRM          | seacrm-campaignstpdieqyipk  |
| ASIACRM / APAC2 | asiacrm-campaignspgxdbptutk |

* **AWS region** - Enter the AWS region to which you are transferring the files.

| Region         | Description                            |
| :------------- | :------------------------------------- |
| US East 1      | For the bucket in the India region     |
| EU West 1      | For the bucket in the EU region        |
| AP Southeast 1 | For the bucket in the Singapore region |
| US East 2      | For the bucket in the US regions       |

Note: If you do not have information on the Access key, secret and AWS region, create a ticket to the Product Support team.

<Image src="https://files.readme.io/bf9c0a2145f4bd85138473ea484a0c063623cfdc3fdc8f45990f5d0bbf3d1937-Screenshot_2025-12-10_at_4.46.22_PM.png" align="center" border={true} />

3. In the **Destination-Iris-Audience** block, enter the API endpoint details. This API enables refreshing and updating the audience list as per the updated file in the FTP. The API used is`iris/v2/audience/ftp/reload`. Enter the details as follows:
   * API Method - POST
   * Remote API URL - `{host_url}/iris/v2/audience/ftp/reload`. The host URL is cluster-based.<br />For example, `https://eu.api.capillarytech.com/iris/v2/audience/ftp/reload`.<br />Refer to table below for the appropriate URL based on your cluster:

     | Cluster         | Remote API URL                                                    |
     | :-------------- | :---------------------------------------------------------------- |
     | EUCRM / APAC    | `https://eu.api.capillarytech.com/iris/v2/audience/ftp/reload`    |
     | INCRM / APAC    | `https://apac.api.capillarytech.com/iris/v2/audience/ftp/reload`  |
     | ASIACRM / APAC2 | `https://apac2.api.capillarytech.com/iris/v2/audience/ftp/reload` |
     | USCRM           | `https://us.api.capillarytech.com/iris/v2/audience/ftp/reload`    |
   * X\_CAP\_ORG - Organisation ID
   * X\_CAP\_CT - Capillary API authentication token. The token is not mandatory, and you can enter any random string in this field if you do not have token. &#x20;

<Image src="https://files.readme.io/b4bf045ec993b0ad815857ac94772ab3fbe8153f4818213d2b7c9bccaeb40063-Screenshot_2025-12-10_at_5.03.12_PM.png" align="center" width="80% " border={true} />

4. In the **Trigger section** block, define the duration at which the system should check the FTP location for the new file and update the audience list. For information on how to define the dataflow trigger duration, refer to the documentation on scheduling [Trigger](https://docs.capillarytech.com/docs/configure-actions#schedule-trigger).

<Image src="https://files.readme.io/b658f9ffdc157951e760f0cd5e587f9868d5e12f89310d8ccc921fefabea2b2c-Screenshot_2025-12-10_at_5.22.32_PM.png" align="center" width="75% " border={true} />

5. Select **save and continue**.

<br />