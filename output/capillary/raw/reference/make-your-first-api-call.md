---
updatedAt: 2026-08-03T06:55:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Make Your First API Request

In this page, you will learn to make your first Capillary API call.

# Prerequisites:

1. Authentication details - Till ID and password for [basic auth](https://docs.capillarytech.com/reference/oauth) and valid access token for [OAuth](https://docs.capillarytech.com/reference/basic-authentication).
2. Appropriate [access group](https://docs.capillarytech.com/docs/access-group) access.
3. API details
4. Any API testing tool such as Postman, Swagger, etc.

# Step-by-step instructions:

1. Determine the necessary API for your first request.

2. Select an API tool. Below are some suggested tools along with guidance on their usage:
   1. [Postman](https://docs.capillarytech.com/reference/make-your-first-api-call#getting-started-with-postman)
   2. <Anchor label="'Try it' from ReadMe" target="_blank" href="https://docs.capillarytech.com/reference/make-your-first-api-call#getting-started-with-try-it-on-readme">'Try it' from ReadMe</Anchor>

3. Build a URL for the API call. For more information, refer to the [API URL structure](https://docs.capillarytech.com/reference/servers#api-url-structure) documentation.

4. Select the type of API call. For information on API call types, refer to the [API HTTP methods](https://docs.capillarytech.com/reference/overview-1) documentation.

5. Enter the authentication details. You can use Basic auth or OAuth. For more information refer to the [Basic Auth](https://docs.capillarytech.com/reference/basic-authentication) and [OAuth](https://docs.capillarytech.com/reference/oauth) documentation.

   <Callout icon="🚧" theme="warn">
     Ensure that your till has the appropriate access group permissions. For example, if your till lacks write permissions for Customer resources, you will be unable to add a customer using those till credentials. For more information, refer to the [access group](https://docs.capillarytech.com/docs/access-group). documentation.
   </Callout>

6. Run the request.

7. Evaluate the response.
   * For information on API response codes, refer [API status codes](https://docs.capillarytech.com/reference/errors-and-warnings) documentation.\
     Once you have successfully made a request, make sure to check the response to ensure it is correct and as expected.

***

# Getting started with Postman

## Prerequisites:

1. Authentication details - Till ID and password for [basic auth](https://docs.capillarytech.com/reference/oauth) and valid access token for [OAuth](https://docs.capillarytech.com/reference/basic-authentication).
2. Appropriate [access group](https://docs.capillarytech.com/docs/access-group) access.
3. API endpoint details.

## Step by step instructions

1. Open Postman and from the home page, click  **New** .

<Image align="center" className="border" border={true} width="45% " src="https://files.readme.io/6eac91c-NEW_IMPORT_POSTMAN.gif" />

2. Select the **Authorization** tab and from the **Type** drop-down, select the authentication type. For basic authentication, select **Basic auth** and for authenticating using an access token, select **No Auth**.

<Image align="center" className="border" border={true} width="40% " src="https://files.readme.io/98d3529-AUTH.gif" />

**Basic Auth**\
To authenticate using basic auth, enter the Till ID in **Username** and in the Password field, enter the till password in MD5 format. For more information on these, refer [Basic authentication](https://docs.capillarytech.com/reference/basic-authentication) documentation.

<Image align="center" className="border" border={true} width="65% " src="https://files.readme.io/1bcc2d0-Basic_auth.png" />

**Authenticating using access token**\
To authenticate using an access token, [generate the token](https://docs.capillarytech.com/reference/oauth#generating-access-token), select **Headers**, and enter the **Key** X-CAP-API-OAUTH-TOKEN, then input the token in the **Value** field. The **Content-Type** and **accept** key fields are auto-generated.

<Image align="center" className="border" border={true} src="https://files.readme.io/052a6df-Access_token.png" />

> 🚧 Warning
>
> Ensure that your till has the appropriate access group permissions. For example, if your till lacks write permissions for Customer resources, you will be unable to add a customer using those till credentials. For more information, refer to the [access group](https://docs.capillarytech.com/docs/access-group). documentation.

3. From the method drop-down, select the method type.

<Image align="center" className="border" border={true} width="40% " src="https://files.readme.io/96735bf-Type.png" />

4. In the URL text box, enter the API URL. Refer [API Index](https://dash.readme.com/project/capillary-documentation/v1.0/refs/api-index) for a list of our APIs and refer to the [API URL structure](https://docs.capillarytech.com/reference/servers#api-url-structure) documentation for information on building a URL.

<Image align="center" className="border" border={true} src="https://files.readme.io/6209f2f-API_URL_text_box.png" />

5. (a) For **POST** and **PUT** methods, select **Body** tab >  **raw** and enter the body parameters.

<Image align="center" className="border" border={true} width="50% " src="https://files.readme.io/78b078f-Body.png" />

(b)For **GET** / **DELETE** methods, select the **Parameters** tab and enter the query parameters.

<Image align="center" className="border" border={true} width="65% " src="https://files.readme.io/076535e-GET.png" />

5. Click **Send**. The response is displayed on the interface.

<Image align="center" src="https://files.readme.io/c15b0f4-save.png" />

```json POST CUSTOMER
{
    "loyaltyInfo": {
        "loyaltyType": "loyalty"
    },
    "profiles": [
        {
            "firstName": "Brad",
            "lastName": "Pitt",
            "identifiers": [
                {
                    "type": "mobile",
                    "value": "988001234"
                },
                {
                    "type" : "email",
                    "value" : "bradpitt@gmail.com"
                }
            ],
            "source": "INSTORE"
        }
    ]
}

```
```json GET CUSTOMER ID
//REQUEST
https://{host}/v2/customers/lookup?source=INSTORE&identifierName=mobile&identifierValue=9449489999

//RESPONSE

{
  "entity": 552695692,
  "warnings": []
}

```
```json PUT
// BODY

{
  "profiles": [
    {
      "firstName": "Tom",
      "lastName": "Hill",
      "fields": {
        "gender": "Male",
        "city": "Bangalore"
      },
      "identifiers": [
        {
          "type": "mobile",
          "value": 919111111111
        },
        {
          "type": "email",
          "value": "tomhill@gmail.com"
        },
        {
          "type": "wechat",
          "value": "wc_2"
        }
      ],
      "commChannels": [
        {
          "type": "email",
          "value": "tomhill@gmail.com",
          "primary": "true",
          "verified": "false",
          "meta": {
            "residence": true
          }
        },
        {
          "type": "wechat",
          "value": "wc_2",
          "primary": "true",
          "verified": "true",
          "meta": {
            "residence": true
          }
        },
        {
          "type": "mobilePush",
          "value": "abcd12343434",
          "primary": true,
          "verified": true,
          "meta": {
            "lastViewedDate": "2019-10-25"
          }
        }
      ],
      "source": "WECHAT",
      "accountId": "1234"
    }
  ],
  "loyaltyInfo": {
    "loyaltyType": "loyalty"
  },
  "extendedFields": {
    "gender": "MALE",
    "city": "Bangalore"
  }
}



//RESPONSE

{
  "createdId": 162116213,
  "warnings": [],
  "sideEffects": [
    {
      "awardedPoints": 25,
      "type": "points"
    }
  ]
}

```
```json DELETE
//REQUEST

https://{host}/v2/userGroup2/1234/leave?source=INSTORE&accountId=321&identifierName=mobile&identifierValue=1234566789

//RESPONSE

{
  "warnings": [],
  "errors": [],
  "success": true
}

```

You can click **Save as example** to save the response for future reference.

<Image align="center" className="border" border={true} width="40% " src="https://files.readme.io/95dc9cb-save_as_ex.gif" />

# Using Postman for Bulk API requests

You can configure automation for repetitive API requests in Postman. This approach allows the automatic execution of numerous API requests and is useful when there is no specific BULK API available for your requirements.

> 👍 Note
>
> This method is primarily intended for cleanup activities during migrations or other rare circumstances. It is not recommended for all APIs and should not be considered a replacement for BULK APIs.

To create a Bulk API request using POSTMAN, perform the following:

1. Click on the Add icon.

<Image align="center" className="border" border={true} width="55% " src="https://files.readme.io/cc7178f-Add_Icon.png" />

2. Click **Blank collection**. A new collection is created.

<Image align="center" className="border" border={true} width="55% " src="https://files.readme.io/e728889-blank_collection.png" />

3. Click the three-dot menu, and click **Add a request**.

<Image align="center" className="border" border={true} width="45% " src="https://files.readme.io/81ad138-Add_request.png" />

3. Enter the API information such as HTTP method, API endpoint, and authorization.

<Image align="center" className="border" border={true} width="50% " src="https://files.readme.io/d408b15-Api_info.png" />

3. In the **Body**, enter the body parameters. For the dynamic values, define the value using a variable. The variables should be defined in the format `{{variablename}}`. For example, see the below sample body of a transaction ADD API where "mobilenumber", "billNumber", and "billAmount" are the variables:

<Image align="center" className="border" border={true} width="65% " src="https://files.readme.io/238811a-Add_transaction.png" />

6. Define the values for the variables in a CSV file and save it. Make sure that the names of the variables defined and those in the CSV files are the same. For example, if the variables are "mobilenumber", "billNumber", and "billAmount", define the values for those in the CSV file.

<Image align="center" className="border" border={true} src="https://files.readme.io/8bb7517-Variable_file.png" />

7. Save the request.
8. Click the three-dot menu, and click **Run collection**.
9. Click **Select File** and upload the  CSV file which contains the variables and the values for the dynamic parameters.
10. Select the **Persist response for a session** checkbox to view the response in the results.
11. Click **Run**.
12. To view the responses, click on the Iterations.

<Image align="center" className="border" border={true} width="45% " src="https://files.readme.io/f62a339-Response.png" />

***

# Getting started wih 'Try it' on ReadMe

This section will walk you through the steps to make your API request from the ReadMe portal.

## Prerequisites

1. Basic Auth credentials -  till ID and MD5 encoded password. For more information refer to the [Basic authentication](https://docs.capillarytech.com/reference/basic-authentication) documentation.
2. Host URL

## Step by step instructions

1. Navigate to the Capillary [developer documentation portal](https://docs.capillarytech.com/reference).
2. Select the API you want to run. For example, [Add a user group](https://docs.capillarytech.com/reference/add-group).
3. Enter the body parameters (for POST and PUT) or query parameters (for GET and DELETE) information.

<Image align="center" className="border" border={true} src="https://files.readme.io/77e6ae5-Readme_body_parameters.png" />

**NOTE:** Parameters marked required are mandatory.\
For POST or PUT calls, if the body parameters fields are not available, enter the API payload in the **RAW\_BODY** in the appropriate JSON format.

<Image align="center" className="border" border={true} src="https://files.readme.io/77866e6-RAW_BODY.png" />

4. From the **CURL** section, select **CURL** from the drop-down. To view available request CURL examples, click the **REQUEST** drop-down and select the CURLs.

<Image align="center" className="border" border={true} src="https://files.readme.io/3e55a0a-CURL_examples.png" />

To clear an example, select **Clear example**.

<Image align="center" width="450px" src="https://files.readme.io/fab22ce-image.png" />

5. In the **URL**, enter the HOST URL.

<Image align="center" className="border" border={true} src="https://files.readme.io/9e19ada-Enter_HOST.png" />

6. If applicable, Enter the appropriate header values. The headers section is visible only if the API supports any additional headers.

<Image align="center" className="border" border={true} width="45% " src="https://files.readme.io/df557a2-image.png" />

7. In the **Authorization** section, enter the till ID and password in MD5 format.\
   **NOTE:** This is not required if you have entered the access token in the `X-CAP-API-OAUTH-TOKEN` header.

<Image align="center" className="border" border={true} src="https://files.readme.io/d997854-Readme_Authentication.png" />

8. Click  **Try it!** . The **Response** section displays the response.

<Image align="center" className="border" border={true} width="450px" src="https://files.readme.io/a6cbd1a-image.png" />

To view other sample responses, click the **RESPONSE** drop-down. The drop-down displays the available example responses.

<Image align="center" className="border" border={true} width="45% " src="https://files.readme.io/822414c-Response_example.png" />

## Testing API using ReadMe Try it

<Image align="center" className="border" border={true} src="https://files.readme.io/faa3d03-try_it-min.gif" />

## Viewing example in ReadMe

<Image align="center" className="border" border={true} src="https://files.readme.io/2d7952f-Example.gif" />

> 👍 Congratulations! You have successfully sent your first Capillary API call!