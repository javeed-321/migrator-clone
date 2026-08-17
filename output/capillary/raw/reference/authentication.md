---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Authentication

This page provides you information regarding the authentications used in API Capillary APIs.

Capillary supports three types of authentication:

1. **OAuth**\
   This auth flow is used when the API requests are made from a program or service running on a server. This flow uses an access token to authenticate an API request. You can enable oAuth from InTouch as mentioned in the respective section below.
2. **Basic auth**\
   This is used where POS terminals are directly integrated with Capillary server. This flow uses Till ID and MD5 hash encoded password to authenticate an API request. Find more details in the section below.
3. **Authentication for end-customer web and mobile apps**\
   This is used for end-customer authentication where you want end-customers to login to a mobile or web application built on Capillary CDP.

> 📘 It is mandatory to use only store-specific Till/Store Center credentials as API response depends on this identification.

## When to use Basic & OAuth?

| Authentication Type | Description                                                                                                                                                                                                                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Basic**           | Can be used for POS integrations where API requests come to the Capillary server directly from POS front end or POS store server.                                                                                                                                                                                                                          |
| **oAuth**           | Shall be used for backend integrations (from one backend to another backend). For example, POS integrations where API requests come to the Capillary server from an API gateway or a central server; FTP integrations where backend service needs to be authenticated; 3rd party integration where API requests come to Capillary from a backend platform. |

## Authentication scenarios and recommended authentication

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Scenario
      </th>

      <th>
        Description
      </th>

      <th>
        Authentication 
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        POS client-to-server integration
      </td>

      <td>
        POS terminals are directly integrated with Capillary server. API requests come directly from POS terminal to the Capillary Server.
      </td>

      <td>
        Basic authentication using till username and password
      </td>
    </tr>

    <tr>
      <td>
        POS server-to-server integration
      </td>

      <td>
        POS servers are directly integrated with Capillary Server.  API requests come directly from POS server to the Capillary Server.
      </td>

      <td>
        oAuth2 client credentials flow using API key and secret
      </td>
    </tr>

    <tr>
      <td>
        FTP server-to-server integration
      </td>

      <td>
        Client  systems are configured to  Push files to an FTP and Capillary access the is  and Capillary will access and process files from FTP. (process - Via connect+ or OOB solution).
      </td>

      <td>
        oAuth2 client credentials flow using API key and secret
      </td>
    </tr>

    <tr>
      <td>
        Server-to-server custom integration
      </td>

      <td>
        Client server will consume capillary API via. wrapper service. Development and maintenance is subjective to the deal.
      </td>

      <td>
        oAuth2 client credentials flow using API key and secret
      </td>
    </tr>

    <tr>
      <td>
        Prebuilt server-to-server integrations (Magento, Shopify, SFMC connectors)
      </td>

      <td>
        In this, client-systems would consume Capillary Plugin to communicate with Capillary.
      </td>

      <td>
        oAuth2 client credentials flow using API key and secret
      </td>
    </tr>

    <tr>
      <td>
        End customer apps integration
      </td>

      <td>
        These are third-party apps and consumes Mobile APIs and Gateway APIs to communicate with Capillary.
      </td>

      <td>
        Mobile APIs auth service,\
        using  

        * username & password/otp;  
        * till username & password  

        Custom & non-standard (non oAuth2 or OIDC) authorization  

        * No social login options supported
      </td>
    </tr>

    <tr>
      <td>
         End-customer IAM (CIAM) in Partner Apps
      </td>

      <td>
        Enable clients of Capillary’s direct customers to be able to access data in the Capillary Platform. Allow users to use the Customer’s login credentials to provide access to the 3rd Party clients to access data on behalf of the customer.
      </td>

      <td>
        OAuth 2.0 Authorization Code Flow and SSO
      </td>
    </tr>
  </tbody>
</Table>