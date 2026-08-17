---
updatedAt: 2026-07-22T06:19:35.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# OAuth

This page provides you with information on how to authenticate APIs using OAuth.

When using OAuth, the API client key and secret key or an access token are used for calling APIs, rather than the user's credentials. This enhances security by avoiding misuse of user's credentials and creates secure pathways for accessing your organization's data via Capillary APIs.

# Creating API client key and secret

API client key and secret can be created from the Authentication page in the organization settings. Refer to documentation [Create an API client key and secret](https://docs.capillarytech.com/docs/api-client#creating-an-api-client-key-and-secret).

# Generating access token

**Prerequisite** : API client key and secret.

Once you get the key and secret, you can generate an access token or JWT (JSON Web Token) using the token/generate API. JWT is a compact URL and JSON-based used to transfer data securely between two parties.

<Callout icon="📘" theme="info">
  ### The token validity will be as per the value set for the client (Token expiry duration). If a token expires, you can regenerate it using the same API.
</Callout>

## Resource endpoint

| Parameter               | Value                 |
| ----------------------- | --------------------- |
| URI                     | /oauth/token/generate |
| API version             | v3                    |
| HTTP method             | POST                  |
| Authentication Required | No                    |
| Batch Support           | No                    |

# Header

**Content-Type:** application/json

## POST request schema

```Text SAMPLE URL
https://eu.api.capillarytech.com/v3/oauth/token/generate
```

```json
{
  "key": "",
  "secret": ""
}
```

### Example:

```Text SAMPLE URL
https://eu.api.capillarytech.com/v3/oauth/token/generate
```

```Text SAMPLE REQUEST
{
  "key": "WnCygRI1Fmlf6YudKwTxQq1LI",
  "secret": "hoqSBz6VwefECaZA8Q3oNx4V4H3pMDITksarZVES"
}
```

```Text SAMPLE RESPONSE
{
    "data": {
     "accessToken": "eyJraWQiOiJrMSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJDYXBpbGxhcnkiLCJleHAiOjE1NzUyNzAyNzAsImp0aSI6IjJaX2FqUjcwYzJABChVUjlDVTVpUlEiLCJpYXQiOjE1NzUyNjk5NzAsInN1YiI6Im5hbWVfODQzNjIwODIwMSIsImNsaWVudF9pZCI6MjEsIm9yZ19pZCI6MTExNSwidG9rZW5fdXNlIjoidG9rZW5fYWNjZXNzIn0.Ala1-XTDlPtrHFQfCtJKsXe3h_WVyq4QOGI3ZnLNJqOa-yJc1UPGbypUysWemzEaiQC_BJ0n9G68SYkVZGi4CSVOhHRNA_dILe8y1Sa90YZKwHVHogJmIKzLmksJrTbjn8s8hSMePBaaUcEdUZ1XssxdFrZhEHHN1fWVYtkdb74PB3sZ7OMDqKUysON8YTNQxLgKOJ3kq0o2QUUDQo1q3gxXFuswate6-jj3oBkcdd1ohhXkPIWZlAb_1lRcLr-ECaaBfh473gayeMVV_6khdKJ7cXrUQ3CXppkrPIzBb7rS6I93iWZw0IlmWbaGduTmPPOhLX6HZLOb84Y28st-cw",
        "ttlSeconds": 300
    },
    "errors": null
}
```

# Response

| Parameter   | Description                                                                                                  |
| :---------- | :----------------------------------------------------------------------------------------------------------- |
| accessToken | Generated access token for the given key and secret. This is unique and varies every time you make the call. |
| ttlSeconds  | The validity of the token in seconds.                                                                        |

# Using access token

Once you generate the access token, you can use it to authenticate API calls as shown below.

Set the authentication to **No Auth** and pass the following headers.

| Header                                | Value                                                                                                                                                                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **X-CAP-API-OAUTH-TOKEN**\*           | Generated access token.                                                                                                                                                                                                                                                                    |
| **Content-Type**\*                    | This should be set as application/json                                                                                                                                                                                                                                                     |
| **Accept**\*                          | This should also be set as application/json                                                                                                                                                                                                                                                |
| **X-CAP-API-ATTRIBUTION-ENTITY-TYPE** | Till or store from which you want to post the data. Supported Values: TILL, STORE\_CODE, STORE\_NAME, STORE\_EXTERNAL\_ID, STORE\_EXTERNAL\_ID\_1, STORE\_EXTERNAL\_ID\_2. The default value is TILL.                                                                                      |
| **X-CAP-API-ATTRIBUTION-ENTITY-CODE** | Pass the entity value based on the entity type. For example, if X-CAP-API-ATTRIBUTION-ENTITY-TYPE is STORE\_CODE, then X-CAP-API-ATTRIBUTION-ENTITY-CODE is the store code that you want to tag to POST data. By default, it considers the Till associated with the client key and secret. |

# Error Handling

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Error
      </th>

      <th>
        Probable cause
      </th>

      <th>
        Recommended action
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Failed to generate OAuth token
      </td>

      <td>
        - Client key or secret invalid - Insufficient permission to access group
      </td>

      <td>
        - Ensure the auth key and secret are correct.  - Ensure you have right permissions to the appropriate access group. To know more about access group, see [Access group](https://docs.capillarytech.com/docs/access-group#access-group)


      </td>
    </tr>
  </tbody>
</Table>

# Caching OAuth token

You can enable token caching (`CONF_ENABLE_OAUTH_TOKEN_REUSE`) to reuse a token for 30 seconds. This reduces unnecessary token generation and improves performance. It ensures the same token is used across multiple flows for a short period, lowering API traffic and memory usage.

When this configuration is enabled:

* A generated token is stored in cache for 30 seconds.
* Any request within this 30-second window uses the cached token.
* After 30 seconds, the cache expires and a new token is generated.

**Configuration details**

**Default state:** Disabled.

**Enablement:** Create a ticket with the Capillary Product Support team.

**Caching duration:** Fixed at 30 seconds. This value cannot be changed.