---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Refer Customer

This API allows you to refer someone with the referral code of a specific campaign to a customer (auto-generated referral code).

It is important to understand the following terminologies that you may come across while using the customer/APIs.

|                |                                                                                                                                                                                                                                              |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| referral\_code | Unique code generated for the referrer for a specific campaign. Each referral campaign generates a unique code for each customer.                                                                                                            |
| invitee        | A person who was invited by the referrer.                                                                                                                                                                                                    |
| referees       | Customers from the invitee list who turned up to the stores and made either transactions or registration                                                                                                                                     |
| incentives     | Rewards received by the referral for successful referees of the campaign. Currently, only coupons are issued as incentives.                                                                                                                  |
| scope          | The channel through which the referral was made. Currently, the referrals are supported only through email and mobile numbers. Scopes are used as name-value pairs, the value could be referees, invitees, or incentives as per the context. |

# Prerequisites

* [ ] Authentication: Basic/OAuth authentication
* [ ] Default access group.

# Query Params

| Field        | Data Type | Description                                |
| :----------- | :-------- | :----------------------------------------- |
| mobile/email | string    | Mobile number or email ID of the customer. |

# Resource information

| URI               | v1.1/customer/referrals |
| :---------------- | :---------------------- |
| **HTTP method**   | **POST**                |
| **Pagination**    | **NA**                  |
| **Rate limit**    | **NA**                  |
| **Batch support** | **NA**                  |

# API endpoint example

## Request Parameters

| **Parameter**          | **Data Type** | **Description**                                                                                                                                                                |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **customer**           | Array         | An array of customer details.                                                                                                                                                  |
| \**- mobile* \*\*      | String        | Mobile number of the customer who is referring.                                                                                                                                |
| **- referrals**        | Object        | An object containing referral information.                                                                                                                                     |
| **-- campaign\_token** | String        | The token of the referral campaign to which you are referring. You can get this token from the campaign home page under the referral campaign name.                            |
| \**--- type* \*\*      | String        | Type of referral. Supported values: MOBILE and EMAIL.                                                                                                                          |
| **- referral**         | Array         | An array of referral objects that contains the details of the individual to whom you are referring (invitee).                                                                  |
| \**id* \*\*            | String        | User ID of the individual if any. Else, you can leave this field empty.                                                                                                        |
| \**invited\_on* \*\*   | String        | A timestamp in ISO 8601 format indicating when the referral was invited along with the referral code. For example, 20240910T16:35:52.pV7BF, where  pV7BF is the referral code. |
| **name**               | String        | Name of the invitee                                                                                                                                                            |
| \**identifier* \*\*    | String        | Identifier (e.g., mobile number) of the invitee.                                                                                                                               |

```json
{
    "root": {
        "customer": [
            {
                "mobile": "7999836466",
                "referrals": {
                    "campaign_token": "J0H7Q",
                    "referral_type": {
                        "type": "MOBILE",
                        "referral": [
                            {
                                "id": "",
                                "invited_on": "20240910T16:35:52.pV7BF",
                                "name": "Shikhar",
                                "identifier": "7999836416"
                            }
                        ]
                    }
                }
            }
        ]
    }
}
```

## Response parameters

| **Parameters**     | **Description**                                          |
| ------------------ | -------------------------------------------------------- |
| **status**         | Contains the status of the response.                     |
| **success**        | Indicates if the request was successful.                 |
| **code**           | The HTTP status code.                                    |
| **message**        | A message providing additional details about the status. |
| **customers**      | Contains customer details.                               |
| **customer**       | List of customer objects.                                |
| **email**          | The email of the customer.                               |
| **mobile**         | The mobile number of the customer.                       |
| **external\_id**   | External identifier for the customer.                    |
| **firstname**      | The first name of the customer.                          |
| **lastname**       | The last name of the customer.                           |
| **referrals**      | Contains referral information.                           |
| **referral\_type** | List of referral types.                                  |
| **type**           | The type of referral ((`MOBILE`) or (`EMAIL`)).          |
| **referral**       | List of referral details.                                |
| **id**             | Identifier for the referral.                             |
| **name**           | Name associated with the referral.                       |
| **identifier**     | Identifier for the invited referral.                     |
| **invited\_on**    | Timestamp of when the referral was invited.              |
| **status**         | Status of the referral.                                  |
| **code**           | Status code of the referral.                             |
| **message**        | Message about the referral status.                       |
| **item\_status**   | Contains the item status of the customer.                |
| **success**        | Indicates if the item operation was successful.          |
| **code**           | Status code of the item operation.                       |
| **message**        | Message regarding the item operation status.             |

```json
{
    "response": {
        "status": {
            "success": "true",
            "code": 200,
            "message": "SUCCESS"
        },
        "customers": {
            "customer": [
                {
                    "email": null,
                    "mobile": "917999836466",
                    "external_id": null,
                    "firstname": "shikar",
                    "lastname": "",
                    "referrals": {
                        "referral_type": [
                            {
                                "type": "MOBILE",
                                "referral": [
                                    {
                                        "id": "",
                                        "name": "Shikhar",
                                        "identifier": "7999836416",
                                        "invited_on": "20240910T16:35:52.pV7BF",
                                        "status": {
                                            "success": "true",
                                            "code": 1000,
                                            "message": "Refer was successful"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    "item_status": {
                        "success": "true",
                        "code": 1000,
                        "message": "Referrals are invited successfully"
                    }
                }
            ]
        }
    }
}

```
```json Failure: Invalid Identifier for the type
{
    "response": {
        "status": {
            "success": "true",
            "code": 200,
            "message": "SUCCESS"
        },
        "customers": {
            "customer": [
                {
                    "email": null,
                    "mobile": "917999836466",
                    "external_id": null,
                    "firstname": "shikar",
                    "lastname": "",
                    "referrals": {
                        "referral_type": [
                            {
                                "type": "MOBILE",
                                "referral": [
                                    {
                                        "id": "",
                                        "name": "Shikhar",
                                        "identifier": "79998364",
                                        "invited_on": "20240910T16:35:52.pV7BF",
                                        "status": {
                                            "success": "false",
                                            "code": 1701,
                                            "message": "Invalid Identifier for the type"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    "item_status": {
                        "success": "true",
                        "code": 1000,
                        "message": "Referrals are invited successfully"
                    }
                }
            ]
        }
    }
}
```

## API error codes

| **Code** | **Description**                             |
| -------- | ------------------------------------------- |
| 1012     | Cannot find a customer for provided mobile. |
| 1206     | Referral type is not supported.             |
| 1701     | Invalid Identifier for the type.            |

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "customer-v11",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://{host}/v1.1",
      "variables": {
        "host": {
          "default": "host"
        }
      }
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "http",
        "scheme": "basic"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/customer/referrals": {
      "post": {
        "summary": "Refer Customer",
        "description": "",
        "operationId": "refer-customer",
        "parameters": [
          {
            "name": "mobile",
            "in": "query",
            "description": "Mobile number of the customer. Support values are mobile and email.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "mobile",
                  "type",
                  "id",
                  "invited_on",
                  "identifier"
                ],
                "properties": {
                  "customer": {
                    "type": "array",
                    "description": "Array of customer details.",
                    "items": {
                      "type": "string"
                    }
                  },
                  "mobile": {
                    "type": "string",
                    "description": "Mobile number of the customer"
                  },
                  "referrals": {
                    "type": "object",
                    "description": "Object containing referral information.",
                    "properties": {}
                  },
                  "campaign_token": {
                    "type": "string",
                    "description": "Unique token for the referral campaign."
                  },
                  "type": {
                    "type": "string",
                    "description": "Type of referral Supported values: MOBILE and EMAIL."
                  },
                  "id": {
                    "type": "string",
                    "description": "Unique identifier for the referral."
                  },
                  "invited_on": {
                    "type": "string",
                    "description": "Timestamp indicating when the referral was invited."
                  },
                  "name": {
                    "type": "string",
                    "description": "Name of the referred individual."
                  },
                  "identifier": {
                    "type": "string",
                    "description": "Identifier (e.g., mobile number) of the referred individual."
                  }
                }
              },
              "examples": {
                "Sample POST Request": {
                  "value": {
                    "root": {
                      "customer": [
                        {
                          "mobile": "7999836466",
                          "referrals": {
                            "campaign_token": "J0H7Q",
                            "referral_type": {
                              "type": "MOBILE",
                              "referral": [
                                {
                                  "id": "",
                                  "invited_on": "20240910T16:35:52.pV7BF",
                                  "name": "Shikhar",
                                  "identifier": "7999836416"
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Sample Response": {
                    "value": "{\n    \"response\": {\n        \"status\": {\n            \"success\": \"true\",\n            \"code\": 200,\n            \"message\": \"SUCCESS\"\n        },\n        \"customers\": {\n            \"customer\": [\n                {\n                    \"email\": null,\n                    \"mobile\": \"917999836466\",\n                    \"external_id\": null,\n                    \"firstname\": \"shikar\",\n                    \"lastname\": \"\",\n                    \"referrals\": {\n                        \"referral_type\": [\n                            {\n                                \"type\": \"MOBILE\",\n                                \"referral\": [\n                                    {\n                                        \"id\": \"\",\n                                        \"name\": \"Shikhar\",\n                                        \"identifier\": \"7999836416\",\n                                        \"invited_on\": \"20240910T16:35:52.pV7BF\",\n                                        \"status\": {\n                                            \"success\": \"true\",\n                                            \"code\": 1000,\n                                            \"message\": \"Refer was successful\"\n                                        }\n                                    }\n                                ]\n                            }\n                        ]\n                    },\n                    \"item_status\": {\n                        \"success\": \"true\",\n                        \"code\": 1000,\n                        \"message\": \"Referrals are invited successfully\"\n                    }\n                }\n            ]\n        }\n    }\n}\n"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "response": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "object",
                          "properties": {
                            "success": {
                              "type": "string",
                              "example": "true"
                            },
                            "code": {
                              "type": "integer",
                              "example": 200,
                              "default": 0
                            },
                            "message": {
                              "type": "string",
                              "example": "SUCCESS"
                            }
                          }
                        },
                        "customers": {
                          "type": "object",
                          "properties": {
                            "customer": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "email": {},
                                  "mobile": {
                                    "type": "string",
                                    "example": "917999836466"
                                  },
                                  "external_id": {},
                                  "firstname": {
                                    "type": "string",
                                    "example": "shikar"
                                  },
                                  "lastname": {
                                    "type": "string",
                                    "example": ""
                                  },
                                  "referrals": {
                                    "type": "object",
                                    "properties": {
                                      "referral_type": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "properties": {
                                            "type": {
                                              "type": "string",
                                              "example": "MOBILE"
                                            },
                                            "referral": {
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "properties": {
                                                  "id": {
                                                    "type": "string",
                                                    "example": ""
                                                  },
                                                  "name": {
                                                    "type": "string",
                                                    "example": "Shikhar"
                                                  },
                                                  "identifier": {
                                                    "type": "string",
                                                    "example": "7999836416"
                                                  },
                                                  "invited_on": {
                                                    "type": "string",
                                                    "example": "20240910T16:35:52.pV7BF"
                                                  },
                                                  "status": {
                                                    "type": "object",
                                                    "properties": {
                                                      "success": {
                                                        "type": "string",
                                                        "example": "true"
                                                      },
                                                      "code": {
                                                        "type": "integer",
                                                        "example": 1000,
                                                        "default": 0
                                                      },
                                                      "message": {
                                                        "type": "string",
                                                        "example": "Refer was successful"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "item_status": {
                                    "type": "object",
                                    "properties": {
                                      "success": {
                                        "type": "string",
                                        "example": "true"
                                      },
                                      "code": {
                                        "type": "integer",
                                        "example": 1000,
                                        "default": 0
                                      },
                                      "message": {
                                        "type": "string",
                                        "example": "Referrals are invited successfully"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```