---
updatedAt: 2026-08-03T06:55:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Organisation Level Configuration for Rewards Catalog

This API allows you to set the org's config for Rewards Catalog.

> 👍 Note
>
> * For detailed information about our APIs and for hands-on testing, refer documentation in [API overview](https://docs.capillarytech.com/reference/apioverview) and step-by-step guide on making your first API call in [Make your first API call](https://docs.capillarytech.com/reference/make-your-first-api-call).

# Prerequisites

* [ ] Authentication: Basic or OAuth authentication
* [ ] Default access group

# Resource information

|                        |                                           |
| :--------------------- | :---------------------------------------- |
| URI                    | api\_gateway/rewards/core/v1/brand/config |
| HTTP Method            | POST                                      |
| Pagination             | No                                        |
| Batch support          | No                                        |
| Rate limit information | None                                      |

# API endpoint example

`https://{host}/api_gateway/rewards/core/v1/brand/config`

# Supported Configuration Values

| Config Key Name                                      | Description                                                                                                                                                                                                                                                                                               |
| :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CONF\_START\_OF\_THE\_WEEK\_FOR\_ORG\_RESTRICTION    | To add the start of the week for the org level restrictions, this will be applied to all org level restrictions with Week configurations. The default values may be:- MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY. By default, the start day will be MONDAY.                           |
| CONF\_SEND\_REWARD\_EXPIRY\_NOTIFICATION\_ENABLED    | To enable or disable the expiry notification for rewards. If enabled, the system will send expiry notification for rewards after setting the NUMBER\_OF\_DAYS\_BEFORE\_EXPIRY. The default value may be True or False.                                                                                    |
| CONF\_SEND\_EXPIRY\_NOTIFICATION\_FOR\_REWARD\_TIME  | To set the time of the day to send the expiry notification for rewards. The default timing for sending the event is 16:00 (HH:MM).                                                                                                                                                                        |
| CONF\_EXT\_POINTS\_VENDOR                            | To enable a third-party vendor for points redemption. The default value may be True or False.                                                                                                                                                                                                             |
| CONF\_ENABLE\_FEATURE\_CATALOG\_PROMOTION            | To enable the catalog promotion feature for a brand or organization. The default value may be True or False.                                                                                                                                                                                              |
| CONF\_CATALOG\_PROMOTION\_BUFFER\_END\_TIME\_MINUTES | To add buffer time in minutes to the expiry date of a catalog promotion while issuing a reward. The integer value representing minutes can range from 0 to 30 (MM).                                                                                                                                       |
| CONF\_ENABLE\_ORG\_TIMEZONE                          | Enables organization-specific timezone handling for all reward constraint evaluations. When set to `true`, calculations for daily, weekly, monthly, and rolling windows will use the organization's configured timezone. If `false` (the default), calculations are based on the server's timezone (UTC). |

# Request body parameters

| Parameter      | Data Type | Description                                                                                                                               |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| configKeyName  | String    | The name of the configuration setting which you want to enable.                                                                           |
| configKeyValue | String    | The value of the configuration setting.                                                                                                   |
| brandId        | Integer   | You can use the [API](https://eu.api.capillarytech.com/api_gateway/rewards/core/v1/brand/getAll) and retrieve the brand ID of your brand. |
| label          | String    | A descriptive note or label regarding the start date of the restriction.                                                                  |

<br />

```json To configure the start week for org restriction
{
    "configKeyName": "CONF_START_OF_THE_WEEK_FOR_ORG_RESTRICTION",
    "configKeyValue": "SUNDAY",
    "brandId": 47
}
```
```json To Enable Reward Expiry Notification
{
    "configKeyName": "CONF_SEND_REWARD_EXPIRY_NOTIFICATION_ENABLED",
    "configKeyValue": "true",
    "brandId": 1
}
```
```json To set Reward Expiry TIme
{
    "configKeyName": "CONF_SEND_EXPIRY_NOTIFICATION_FOR_REWARD_TIME",
    "configKeyValue": "16:00",
    "brandId": 1
}
```

<br />

# Response parameters

| Parameter      | Data Type | Description                                                                                                                               |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| success        | Boolean   | Indicates if the API call was successful.                                                                                                 |
| code           | Integer   | A code representing the API status.                                                                                                       |
| message        | String    | A description of the API call.                                                                                                            |
| configKeyName  | String    | The name of the configuration setting.                                                                                                    |
| configKeyValue | String    | The value assigned to the configuration setting.                                                                                          |
| brandId        | Integer   | You can use the [API](https://eu.api.capillarytech.com/api_gateway/rewards/core/v1/brand/getAll) and retrieve the brand ID of your brand. |
| label          | String    | A descriptive label explaining the configuration setting, its implications, and the context where it applies.                             |

<br />

```json Response: To configure the start week for org restriction
{
    "status": {
        "success": true,
        "code": 3008,
        "message": "Org config updated successfully"
    },
    "configList": [
        {
            "configKeyName": "CONF_START_OF_THE_WEEK_FOR_ORG_RESTRICTION",
            "configKeyValue": "TUESDAY",
            "brandId": null,
            "label": "Add the start of the week for the org level restrictions, this will be applied to all org level restrictions with Week configurations"
        }
    ]
}
```
```json Response: To Enable Reward Expiry Notification
{
    "status": {
        "success": true,
        "code": 3008,
        "message": "Org config updated successfully"
    },
    "configList": [
        {
            "configKeyName": "CONF_SEND_REWARD_EXPIRY_NOTIFICATION_ENABLED",
            "configKeyValue": "true",
            "brandId": 1,
            "label": "Key to enable or disable the expiry notification for rewards. If enabled, the system will send expiry notification for rewards after setting the NUMBER_OF_DAYS_BEFORE_EXPIRY."
        }
    ]
}
```
```json Response: To set Reward Expiry TIme
{
    "status": {
        "success": true,
        "code": 3008,
        "message": "Org config updated successfully"
    },
    "configList": [
        {
            "configKeyName": "CONF_SEND_EXPIRY_NOTIFICATION_FOR_REWARD_TIME",
            "configKeyValue": "16:00",
            "brandId": 1,
            "label": "Key to set the time of the day to send the expiry notification for rewards."
        }
    ]
}
```
```json Failure: Brand or Config Key is incorrect
{
    "status": {
        "success": false,
        "code": 3011,
        "message": "Brand or config key not found"
    },
    "configList": [
        {
            "configKeyName": "CONF_SN_ENABLED",
            "configKeyValue": "true",
            "brandId": 1,
            "label": null
        }
    ]
}
```

<br />

# API- specific errors

| Error code | Description                                     |
| :--------- | :---------------------------------------------- |
| 3004       | Brand not found. Pass a valid brand identifier. |
| 3011       | Brand or config key is incorrect                |

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "v1",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://{host}",
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
    "/api_gateway/rewards/core/v1/brand/config": {
      "post": {
        "summary": "Organisation Level Configuration for Rewards Catalog",
        "description": "",
        "operationId": "organisation-level-configuration-for-rewards-catalog",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "RAW_BODY": {
                    "type": "string",
                    "description": "{     \"configKeyName\": \"CONF_START_OF_THE_WEEK_FOR_ORG_RESTRICTION\",     \"configKeyValue\": \"SUNDAY\",     \"brandId\": 47,     \"label\": \"\" }"
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
                  "To configure the start week for org restriction": {
                    "value": "{\n    \"status\": {\n        \"success\": true,\n        \"code\": 3008,\n        \"message\": \"Org config updated successfully\"\n    },\n    \"configList\": [\n        {\n            \"configKeyName\": \"CONF_START_OF_THE_WEEK_FOR_ORG_RESTRICTION\",\n            \"configKeyValue\": \"TUESDAY\",\n            \"brandId\": null,\n            \"label\": \"Add the start of the week for the org level restrictions, this will be applied to all org level restrictions with Week configurations\"\n        }\n    ]\n}"
                  },
                  "To Enable Reward Expiry Notification": {
                    "value": "{\n    \"status\": {\n        \"success\": true,\n        \"code\": 3008,\n        \"message\": \"Org config updated successfully\"\n    },\n    \"configList\": [\n        {\n            \"configKeyName\": \"CONF_SEND_REWARD_EXPIRY_NOTIFICATION_ENABLED\",\n            \"configKeyValue\": \"true\",\n            \"brandId\": 1,\n            \"label\": \"Key to enable or disable the expiry notification for rewards. If enabled, the system will send expiry notification for rewards after setting the NUMBER_OF_DAYS_BEFORE_EXPIRY.\"\n        }\n    ]\n}"
                  },
                  "To set Reward Expiry TIme": {
                    "value": "{\n    \"status\": {\n        \"success\": true,\n        \"code\": 3008,\n        \"message\": \"Org config updated successfully\"\n    },\n    \"configList\": [\n        {\n            \"configKeyName\": \"CONF_SEND_EXPIRY_NOTIFICATION_FOR_REWARD_TIME\",\n            \"configKeyValue\": \"16:00\",\n            \"brandId\": 1,\n            \"label\": \"Key to set the time of the day to send the expiry notification for rewards.\"\n        }\n    ]\n}"
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "title": "To configure the start week for org restriction",
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "object",
                          "properties": {
                            "success": {
                              "type": "boolean",
                              "example": true,
                              "default": true
                            },
                            "code": {
                              "type": "integer",
                              "example": 3008,
                              "default": 0
                            },
                            "message": {
                              "type": "string",
                              "example": "Org config updated successfully"
                            }
                          }
                        },
                        "configList": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "configKeyName": {
                                "type": "string",
                                "example": "CONF_START_OF_THE_WEEK_FOR_ORG_RESTRICTION"
                              },
                              "configKeyValue": {
                                "type": "string",
                                "example": "TUESDAY"
                              },
                              "brandId": {},
                              "label": {
                                "type": "string",
                                "example": "Add the start of the week for the org level restrictions, this will be applied to all org level restrictions with Week configurations"
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "To Enable Reward Expiry Notification",
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "object",
                          "properties": {
                            "success": {
                              "type": "boolean",
                              "example": true,
                              "default": true
                            },
                            "code": {
                              "type": "integer",
                              "example": 3008,
                              "default": 0
                            },
                            "message": {
                              "type": "string",
                              "example": "Org config updated successfully"
                            }
                          }
                        },
                        "configList": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "configKeyName": {
                                "type": "string",
                                "example": "CONF_SEND_REWARD_EXPIRY_NOTIFICATION_ENABLED"
                              },
                              "configKeyValue": {
                                "type": "string",
                                "example": "true"
                              },
                              "brandId": {
                                "type": "integer",
                                "example": 1,
                                "default": 0
                              },
                              "label": {
                                "type": "string",
                                "example": "Key to enable or disable the expiry notification for rewards. If enabled, the system will send expiry notification for rewards after setting the NUMBER_OF_DAYS_BEFORE_EXPIRY."
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "To set Reward Expiry TIme",
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "object",
                          "properties": {
                            "success": {
                              "type": "boolean",
                              "example": true,
                              "default": true
                            },
                            "code": {
                              "type": "integer",
                              "example": 3008,
                              "default": 0
                            },
                            "message": {
                              "type": "string",
                              "example": "Org config updated successfully"
                            }
                          }
                        },
                        "configList": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "configKeyName": {
                                "type": "string",
                                "example": "CONF_SEND_EXPIRY_NOTIFICATION_FOR_REWARD_TIME"
                              },
                              "configKeyValue": {
                                "type": "string",
                                "example": "16:00"
                              },
                              "brandId": {
                                "type": "integer",
                                "example": 1,
                                "default": 0
                              },
                              "label": {
                                "type": "string",
                                "example": "Key to set the time of the day to send the expiry notification for rewards."
                              }
                            }
                          }
                        }
                      }
                    }
                  ]
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
                    "value": "{\n    \"status\": {\n        \"success\": false,\n        \"code\": 3011,\n        \"message\": \"Brand or config key not found\"\n    },\n    \"configList\": [\n        {\n            \"configKeyName\": \"CONF_SN_ENABLED\",\n            \"configKeyValue\": \"true\",\n            \"brandId\": 1,\n            \"label\": null\n        }\n    ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "object",
                      "properties": {
                        "success": {
                          "type": "boolean",
                          "example": false,
                          "default": true
                        },
                        "code": {
                          "type": "integer",
                          "example": 3011,
                          "default": 0
                        },
                        "message": {
                          "type": "string",
                          "example": "Brand or config key not found"
                        }
                      }
                    },
                    "configList": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "configKeyName": {
                            "type": "string",
                            "example": "CONF_SN_ENABLED"
                          },
                          "configKeyValue": {
                            "type": "string",
                            "example": "true"
                          },
                          "brandId": {
                            "type": "integer",
                            "example": 1,
                            "default": 0
                          },
                          "label": {}
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false,
        "x-readme": {
          "code-samples": [
            {
              "language": "curl",
              "code": "curl --location 'https://{host}/api_gateway/rewards/core/v1/brand/config' \\\n--header 'Content-Type: application/json' \\\n--header 'Authorization: Basic aWFtc2hpdblahblahjJlODM4ZjhlMzRkNWI1YTI5MWY=' \\\n--data '{\n    \"configKeyName\": \"CONF_SEND_REWARD_EXPIRY_NOTIFICATION_ENABLED\",\n    \"configKeyValue\": \"true\",\n    \"brandId\": 1\n}'",
              "name": "Request body"
            }
          ],
          "samples-languages": [
            "curl"
          ]
        }
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