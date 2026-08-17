---
updatedAt: 2026-07-07T12:51:58.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Authentication

This page provides you with information on enabling basic auth and creating API client key and secret.

Capillary supports three types of authentication:

1. Basic
2. OAuth
3. Authentication for end-customer web and mobile apps

# Basic authentication

In basic authentication, the till ID and password (in MD5 format) are used for authenticating the APIs. For information on creating a till ID and password, see [Add till](https://docs.capillarytech.com/docs/store-hierarchy-1#add-till).

By default, basic authentication is disabled for new organizations. To enable it, raise a ticket with the Product Support Team (PST).

For existing organizations where basic authentication is already enabled and needs to be disabled, raise a ticket with the Product Support Team (PST).

# OAuth authentication

OAuth (Open Authorization) is a standardized framework that enables secure and controlled access to resources, such as data and services, without requiring the sharing of sensitive credentials, like passwords.

In OAuth, API client key and secret or access token are used for API authentication.

## Creating an API client key and secret

Perform the following:

1. Log on to InTouch of your cluster.

2. Navigate to the **Profile icon > Organization Settings > Tools > Authentication**.

<Image src="https://files.readme.io/17c930d-Authentication.png" align="center" width="15% " border={true} />

3. Click the **API client** tab.
4. Click Register.

<Image src="https://files.readme.io/b458f7d-register.png" align="center" border={true} />

5. In **Client name**, enter a name for the client.

<Image src="https://files.readme.io/f690f6e-Access.png" align="center" width="40% " border={true} />

6. In the **Description**, enter a short description of the client.

7. Select the **Allow access to sensitive information** checkbox if you want to allow the API client to access unmasked PSI data. If you leave this option disabled, API responses return PSI fields as masked when you use the OAuth token. This behaviour applies only <Anchor target="_blank" href="https://docs.capillarytech.com/docs/introduction-datamasking#enabling-data-masking">when organization-level PSI masking is enabled</Anchor>.

   <Image src="https://files.readme.io/6a0d8a2f1245d43a3baddeb32f1b7e884f07c3c1e038d955fcc8d54f1cbe0c22-image.png" align="center" width="35% " border={true} />

8. In **Token expiry duration**, set the default expiry for the tokens created for the client. By default, the maximum duration of an access token that you can set is configured as 60 minutes. An error message is displayed, if you try to set the token expiry duration for more than 60 minutes. This is for `/v3/oauth/token/generate`only. For information on creating an access token, see [Generating access token](https://docs.capillarytech.com/reference/oauth#generating-access-token).

<Image src="https://files.readme.io/06e18e0-60_min_limit.png" align="center" border={true} />

<Callout icon="📘" theme="info">
  ### Note

  If required, you can raise a ticket and set the maximum token expiry duration that you can set to 30 days. You can set the duration in minutes, hours or days. An error message is displayed if you try to set the maximum duration for more than 30 days.
</Callout>

<Image src="https://files.readme.io/40e1b46-Token_30_days.png" align="center" border={true} />

<Callout icon="🚧" theme="warn">
  ### For security reasons, Capillary does not recommend setting the token duration for more than 60 minutes.
</Callout>

8. In **Default till code**, enter default till code for the API and click **Validate**. If a till code is not passed in the API header, the default till is used for API attribution.
9. Select the default till code check box to use this till code for API attribution, If an invalid till is passed in the API header.
10. From the **Access group** drop-down, select the appropriate access group for your API client. For information on access groups, see [Access group](https://docs.capillarytech.com/docs/access-group). This access group restriction is applicable only for the API client and not the till.

<Image src="https://files.readme.io/ac9b19c-Select_access_group.png" align="center" width="40% " border={true} />

11. Click **Next**. The Client key and Client secret are generated for the client.

<Image src="https://files.readme.io/11dd3fd-clie.png" align="center" width="40% " border={true} />

12. Copy the Client key and client secret and use it for authentication (OAuth).
    <Callout icon="🚧" theme="warn">
      ### After the client key and secret are generated, if you exit the API Credentials page, you cannot access the client secret again for that client
    </Callout>
13. Click **Done** to close the screen.
14. To create more API client accounts, click **New API Client**.

<Image src="https://files.readme.io/825679d-clienttt.png" align="center" border={true} />

<br />

<Image src="https://files.readme.io/916d8e7-demo.png" align="center" border={true} />

<Callout icon="🚧" theme="warn">
  ### After the client key and secret are generated, if you exit the API Credentials page, you cannot access the client secret again for that client
</Callout>

## Creating an access token

You can use the API client key and secret and create an access token for authentication. For information on creating an access token, see [Generating access token](https://docs.capillarytech.com/reference/oauth#generating-access-token).