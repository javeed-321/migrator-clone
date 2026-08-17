---
updatedAt: 2026-08-05T09:06:12.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure RCS Settings

Before configuring an RCS account in Capillary, ensure that an RCS account has already been created with the RCS vendor.

If the brand uses a Capillary-supported RCS vendor, the Capillary Gateway team coordinates with the vendor to create the vendor account for the brand. Once the vendor account is set up, the Gateway team raises a ticket to the PST team, which <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-rcs-settings#configure-rcs-account">configures the RCS account</Anchor> in Capillary using the vendor-provided account credentials.

# Configure RCS account

To configure your RCS account in the platform, follow these steps:

1. Navigate to Channel Configuration

   1. Go to **Organisation Settings** in the platform.
   2. Select **Omni Channel**, then click **Channel Configuration**.
   3. On the top-right, use the search bar and search for RCS.
   4. Select RCS and click **Add Account**.

<Image src="https://files.readme.io/18e9ff8c2afab16facd52fbd471b18f5678039a75f050013df0d82650b9635ab-6622c49e844f173af0053ebeef755ef56436291efaff996a26d92fd0257e1dc3-Gif_4.gif" align="center" border={true} />

2. Enter Account Details

Fill in the required fields to complete the RCS account setup:

* **Account Name**: A name to identify the RCS account in Capillary.
* **Source Account ID**: The username or account ID provided by the RCS vendor.
* **Enable Mirror**: Enables template synchronization with the vendor account.
* **Access Token**: The authentication credential (password or token) provided by the RCS vendor.

<Image src="https://files.readme.io/163c1bafcdf138bed591755f2ec24f71096cf73d9b9b666ebf3b5b949cd16aab-image.png" align="center" width="70% " border={true} />

The **Source Account ID&#x20;**&#x61;nd **Access Token** map the Capillary RCS account to the corresponding vendor account. When you create an RCS template in Capillary, it uses these credentials to create and manage the corresponding template in the mapped vendor account.

Once the RCS account is onboarded, it appears in the list of available RCS accounts in the creatives section. If multiple RCS accounts are configured, you can select the appropriate account while creating an RCS template. The selected account determines the vendor account used to create and manage the corresponding template. This mapping ensures that communications are sent through the selected RCS gateway account.

<Callout icon="📘" theme="info">
  ### Notes

  If the brand uses an RCS vendor that is not supported by Capillary, Capillary must first integrate the vendor before onboarding the RCS account. This requires backend implementation to support the vendor's APIs and configuration and is planned as a Sprint task. The integration typically takes 1–2 months to complete. For more information on setting up the account Contact Capillary gateway team.
</Callout>