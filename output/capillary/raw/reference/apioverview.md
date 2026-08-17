---
updatedAt: 2026-08-03T06:55:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Overview

This page gives you the overview of Capillary APIs.

Capillary APIs are structured following the REST model. Our APIs use HTTPS protocol and support requests and responses in JSON format.

# HTTP methods

The HTTP methods used in Capillary APIs are as follows:

| Command    | Description                               |
| :--------- | :---------------------------------------- |
| **POST**   | To create a new resource.                 |
| **PUT**    | To update an existing resource.           |
| **GET**    | To retrieve a resource.                   |
| **DELETE** | To delete a resource.                     |
| **PATCH**  | To partially update an existing resource. |

# Know about API URL structure, host URL and headers

## API URL structure

The below image displays Capillary API structure with an example:

<Image align="center" border={true} width="50% " src="https://files.readme.io/c951292-API_URL_structure.jpeg" className="border" />

The resource ID is a combination of the Entity and the action you tell the API to perform. In this case, adding a `customer` is the entity and *add* is the action. For more information on entities, see  [Entities management](https://docs.capillarytech.com/docs/data-entities).

## Host URLs

A host is a server to which the API calls are made, usually the API cluster URL.

The host URLs are the same for both v1.1, v2, and v3 APIs. However, the v1 APIs mentioned in the documentation have different URLs for each entity. You can see those URLs under the respective section.

| Cluster                      | Host URL                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| **Asia**                     | [https://apac.api.intouch.capillarytech.com](tps://apac.intouch.capillarytech.comhttps://\{host}) |
| **Europe**                   | [https://eu.api.capillarytech.com](https://eu.intouch.capillarytech.com)                          |
| **US**                       | [https://ushc.api.capillarytech.com](https://ushc.intouch.capillarytech.com)                      |
| **Asia 2 (South East Asia)** | [https://sea.api.capillarytech.com](https://\{host})                                              |

## Request Headers

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Header
      </th>

      <th>
        Description
      </th>

      <th>
        Value
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Accept**
      </td>

      <td>
        Request format from the server side
      </td>

      <td>
        `application/json` for JSON format<br /> `application/xml` for XML format
      </td>
    </tr>

    <tr>
      <td>
        **Content-Type**
      </td>

      <td>
        Representation of data at the client side.
      </td>

      <td>
        `application/json` for JSON format<br /> `application/xml` for XML format
      </td>
    </tr>

    <tr>
      <td>
        **User-Agent**
      </td>

      <td>
        A characteristic string that lets servers and network peers identify the application, operating system, vendor, and/or version of the requesting user agent.
      </td>

      <td>
        Format `\{product\} {product-version} \{comment\}`<br /> Example: `User-Agent: Mozilla\{version\} ({system-information}) \{platform\} ({platform-details}) \{extensions\}`
      </td>
    </tr>

    <tr>
      <td>
        **CAP-API-ACCESS-TOKEN**
      </td>

      <td>
        Unique access token generated with the Key and Secret combination. Applicable for OAuth based authentication.
      </td>

      <td>
        Generated token value.
      </td>
    </tr>

    <tr>
      <td>
        **X-CAP-API-ATTRIBUTION-ENTITY-TYPE**
      </td>

      <td>
        Till or store from which you want to post the data. This is applicable for the OAuth authentication only.
      </td>

      <td>
        `TILL, STORE_CODE, STORE_NAME, STORE_EXTERNAL_ID, STORE_EXTERNAL_ID_1, STORE_EXTERNAL_ID_2.`<br /> The default value is `TILL`.
      </td>
    </tr>

    <tr>
      <td>
        **X-CAP-API-ATTRIBUTION-ENTITY-CODE**
      </td>

      <td>
        Value of the specified entity type.
      </td>

      <td>
        Example: If `X-CAP-API-ATTRIBUTION-ENTITY-TYPE` is `STORE_CODE`, then `X-CAP-API-ATTRIBUTION-ENTITY-CODE` is the store code that you want to tag to POST data.<br /> By default, it considers the Till associated with the client key and secret.
      </td>
    </tr>

    <tr>
      <td>
        **X-CAP-API-ATTRIBUTION-LOOKUP-TYPE:`\{name}`<br /> X-CAP-API-ATTRIBUTION-LOOKUP:`\{value}`**
      </td>

      <td>
        Supported only for v2 APIs:<br /> Lets you submit requests on behalf of other TILLs (active TILLs) instead of the authenticating till. In db, the combination of attribution_lookup and lookup_code are mapped to TILL ids and org ids. When a new POST request is placed with the combination of a lookup name and lookup code, the data will be inserted in the db on behalf of the TILL that is mapped to the specified combination.

        * _NOTE:_* It is recommended to use OAuth authentication.
      </td>

      <td>
        Accepted values are WECHAT and MOBILE_TRIGGER.
      </td>
    </tr>
  </tbody>
</Table>

## Response headers

<br />

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        X-Cap-Requestid
      </td>

      <td>
        A unique ID generated for every promotional request. This ID is sent in the response headers and can be used to track the request and its response end-to-end. For batch transactions, this ID tracks the entire API call, including all promotions processed within the batch.
      </td>
    </tr>

    <tr>
      <td>
        x-cap-api-request-uri
      </td>

      <td>
        This standardises endpoint identification by exposing the URI pattern in a response header instead of the raw URI, enabling cleaner metrics, better observability, and easier debugging. Example:
        Request → GET /v1/promotions/customer/12345
        Response header → x-cap-api-request-uri: /v1/promotions/customer/customerId
      </td>
    </tr>
  </tbody>
</Table>

# API version

Capillary's APIs are divided into four versions:

* v1
* v1.1
* v2
* v3

These versions are not merely upgrades; they are a combination of:

* new sets of APIs that receive new version numbers, and
* upgraded versions of existing APIs.

The v1 APIs support both JSON and XML. The V2 and V3 APIs are developed in JSON.

## Additional features of v2 and v3 APIs

The list below highlights the additional features that v2 and v3 APIs support compared to v1 and v1.1 APIs:

* Provide extended support for multiple sources, i.e., you can now manage accounts of different sources such as InStore, MartJack, WeChat, e-commerce and Facebook.

* Support multiple accounts of a single source. For example, an org could have multiple accounts on WeChat and Facebook. Each account will have a different account ID. You would need to pass the respective account ID when making API calls.

* Merge accounts automatically when the same identifier is registered in different sources. For example, assume that a customer has registered on InStore using his mobile number and e-commerce site using his email ID. Now, if the customer registers the same mobile number on the e-commerce site, the accounts will be merged automatically to a single customer ID. You can retrieve the customer details from various sources of an organization using the unique customer ID.

**NOTE:** By default, all the API versions are enabled for the organisations across clusters.

# Organization setup

An organization associated with Capillary is registered in Intouch. Based on the organization’s architecture, store TILL or Store Center accounts are created besides zones, concepts, and stores. Only Capillary users have access to register an organization in inTouch. For more information, contact your Account Manager or Delivery Manager of Capillary.

To set up an organization as a Capillary admin, see [Setting up Organization](https://docs.capillarytech.com/docs/organization-profile#organization-point-of-contact-tab).