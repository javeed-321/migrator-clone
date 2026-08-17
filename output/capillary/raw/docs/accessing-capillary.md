---
updatedAt: 2026-08-11T09:34:56.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Accessing Capillary

This section provides the different ways of accessing InTouch.

InTouch is Capillary's cloud-based platform that houses all product modules, including Organization Settings and Workbench. It is deployed across multiple regional clusters, and access is managed by role, not all users will have write access or access to every module. <Anchor target="_blank" href="https://docs.capillarytech.com/docs/new-user-management-overview">Super Admins</Anchor> assign access based on role and scope.

Before logging in, you need:

* Your cluster URL
* Login credentials provided by Capillary

# Cluster URLs

The following table lists the links to the different InTouch clusters:

| Cluster | URL                                               |
| ------- | ------------------------------------------------- |
| EU      | <https://eu.intouch.capillarytech.com>            |
| India   | <https://intouch.capillary.co.in>                 |
| APAC2   | <https://apac2.intouch.capillarytech.com/>        |
| US      | <https://north-america.intouch.capillarytech.com> |

# Authentication methods

InTouch supports three login methods:

| Method                                                                      | Best For                                  |
| --------------------------------------------------------------------------- | ----------------------------------------- |
| [Login with Capillary credentials](#login-with-capillary-credentials)       | Standard users                            |
| [Login with Capillary Google account](#login-with-capillary-google-account) | Capillary employees                       |
| [Login with SSO](#login-with-sso)                                           | Enterprise/brand users with their own IdP |

You can also enable two-factor authentication (MFA) for your org. To enable this, raise a JIRA ticket with the Capillary Product Support team. If SSO is enabled, Two-factor authentication will not be considered

# Login with Capillary credentials

Enter the credentials provided by Capillary in the **Email ID** and **Password** fields, then click **Sign in**.

<Image src="https://files.readme.io/0dbe388e91e7f304976e665478111d0344b009fba67e6a797c8d5f13344074d4-image.png" align="center" width="40% " border={true} />

# Login with Capillary Google account

You can now sign in to **InTouch** using your Capillary Google Workspace account. This allows you to access the platform using your existing organizational credentials without maintaining a separate password for InTouch.

With Google Workspace sign-in:

* You no longer need to remember a separate InTouch password
* Monthly InTouch password resets are no longer required
* Authentication is handled through Google’s secure sign-in mechanism, improving both convenience and security

**Prerequisites**

* A Capillary Google Workspace account (email ending in `@capillarytech.com`)

## Login with Google credentials

To log in with Google credentials, follow the steps below:

1. Open the URL for your cluster in a browser:

| Cluster | Login URL                                            |
| ------- | ---------------------------------------------------- |
| EU      | <https://eu.intouch.capillarytech.com/auth/login>    |
| SG      | <https://apac2.intouch.capillarytech.com/auth/login> |
| India   | <https://intouch.capillary.co.in/auth/login>         |

2. Click **Sign in with Google**.

<Image src="https://files.readme.io/124fff06a00c7b48b693d08cf874452061afe84fdd465115d8ec56e6aa235ab2-image.png" align="center" width="40% " border={true} />

3. Enter your Capillary Google Workspace email address and click **Next**.
4. Enter your password and click **Next**.

<Image src="https://files.readme.io/639deba9be8e92000a2d358124c4b2961c0c2f773a8b8669dbdf760b1f5bbb8c-image.png" align="center" width="40% " border={true} />

You will be taken to the InTouch Workbench. If you are already signed in to your Capillary Google Workspace account, you will be directed there automatically.

<Image src="https://files.readme.io/303472d-Workbench.png" alt="InTouch Workbench" align="center" width="100% " border={true} />

# Login with SSO

Sign in with a single set of credentials used for multiple applications provided by third parties like Microsoft ADFS,<br />G Suite SAML. It allows brand users to log in to Capillary Intouch using their Identity Provider (IdP).

**Set up SSO with Okta**<br />We have partnered with Okta for the integration. SSO setup requires configuring a connection for Capillary in Org’s IdP and setting up Org’s Identity in Okta Admin Console.

To set up SSO with Okta, follow these steps.

### Step 1: [Set up a connection for Capillary in your org's IdP](#setting-up-a-connection-for-capillary-in-your-orgs-idp)

### Step 2: [Set up the Identity Provider in Capillary](#setting-up-identity-provider-in-capillary)

### Step 3: [Provide Capillary application access to org users](#providing-capillary-applications-access-to-org-users)

### Step 4: [Authenticate with SSO](#authenticating-with-sso)

***

## Setting up a connection for Capillary in your org's IdP

For setting up a connection for capillary in your org's Idp follow the steps below:

1. The Capillary Point of Contact (PoC) must send an email to the Capillary Access Team requesting SSO setup for the organization. The request must include the following details:
   * Organization name and organization ID
   * Organization email domain
     For example, if the email address is <abc@org.com>, the domain is org.com.
2. The Capillary Access Team will share the following information. This information must be provided to the organization’s PoC for configuring the IdP connection.
   * Assertion Consumer Service (ACS) URL.
   * Service Provider (SP) Entity ID or Audience URL or Entity ID.
   * User profile attributes need to be passed as <Anchor target="_blank" href="https://www.cloudflare.com/en-gb/learning/access-management/what-is-saml/">SAML</Anchor> assertion - email, first name, and last name. Email ID mandatory.
   * (Optional) Attribute that defines if the user has access to Capillary. For example, a group or organization. This is required if the org wants to define which employees have access to Capillary.
3. The organization’s PoC will use the above information to create a connection for Capillary in their IdP.

   After completing the configuration, the PoC must share the following details with the Capillary Access Team:

   * Identity Provider SSO URL.
   * Identity Provider Entity ID.
   * Identity Provider Certificate signature.

## Setting up Identity Provider in Capillary

For setting up Identity Provider in Capillary follow the given steps:

1. The **Capillary or organization PoC** must share the **IdP configuration details** (Identity Provider SSO URL, Entity ID, and certificate signature) collected during the IdP setup with the Capillary Access Team.

2. The Capillary Access team will add an Identity Provider in Okta Admin Console and respond with setup confirmation.

<Image src="https://files.readme.io/4611040-YcZE7z1u94dsCfdrLsaNl3MHQv3dLLoLXw.png" align="center" width="50% " border={true} />

## Providing Capillary application’s access to Org users

Use Data Import to add Org users to the Capillary application with the appropriate access level.

**Note**: When you add users on InTouch, a verification email is sent along with the password setup link. The required change to disable the step is in progress and will be released soon. Until then, only Data Import to add Org users.

## Authenticating with SSO

Once setup is completed, the org users can authenticate using SSO( Single sign-on) as explained in the following steps.

1. On the new sign-in page, select **Sign in with SSO**.

<Image src="https://files.readme.io/9f8ecf6b751c1131447de367300a601c1c4b92967fe7429257dd964f11fce68a-image.png" align="center" width="40% " border={true} />

2. In **Username** field, enter a valid email address and select **Next**. You are redirected to your organization’s Identity Provider (Idp) page to continue authentication.

<Image src="https://files.readme.io/fc06d3a-JbFVF8IG9WAPHdhx0jG6_7ZWTVzYp65YmQ.png" align="center" width="40% " border={true} />

3. On the Identity Provider page, enter your credentials (email address and password) and select **Sign in**.

<Image src="https://files.readme.io/58636b9-Dkn_2OjHNw_Om0sRCt_LIOk6jdl9UctSSQ.png" align="center" width="50% " border={true} />

After successful authentication, you are redirected to the InTouch home page.

# Configuring two-factor authentication (MFA)

To enable two-factor authentication for your org, raise a JIRA ticket with the Capillary Product Support team. If SSO is enabled, two-factor authentication will not be required.

To configure the two-factor authentication settings, follow these steps:

1. Configure MFA settings by navigating to **InTouch > Organization Setup > Authentication Configurations**.

<Image src="https://files.readme.io/7cc238d2d617d4e97b6a06a6fed7e8daf820902fdde7553a3505c1f6ac155b56-MFA_config.png" alt="MFA configuration screen" align="center" width="80% " border={true} />

2. Configure the following authentication settings:

| Field                                                     | Description                                                                                                          | Maximum    | Example                                                                                                                                    |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Validity Period for 2 Factor Authentication (in days)** | Specifies how long a user's 2FA authentication remains valid before they must verify again.                          | 90 days    | If set to **1 day**, a user who completes 2FA today will not be prompted again for the next **24 hours**.                                  |
| **Validity Period for OTP Expiration (in minutes)**       | Specifies how long a **One-Time Password (OTP)** remains valid before it expires.                                    | 15 minutes | If set to **15 minutes**, the OTP sent to the user's email or phone expires after **15 minutes** if it is not used.                        |
| **Validity Period for Login Session (in hours)**          | Specifies how long a user's login session remains active before they are automatically logged out due to inactivity. | 24 hours   | If set to **24 hours**, the user remains logged in for **24 hours** unless they log out manually or the session expires due to inactivity. |

3. Select **Submit**.