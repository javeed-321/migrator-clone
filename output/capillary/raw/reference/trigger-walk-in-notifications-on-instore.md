---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Trigger Walk-in Notifications on InStore

Triggers customer walkin notifications on InStore. That is, when a customer walks in to the store, InStore triggers a desktop notification with the customer details.

<Callout icon="❗️">
  This API is deprecated.
</Callout>

## Status codes

| Code | Description                             |
| :--- | :-------------------------------------- |
| 8099 | No identifier passed in the param       |
| 8098 | Invalid Till                            |
| 8097 | SNS service not working                 |
| 8096 | Invalid Till code                       |
| 8095 | Invalid source passed                   |
| 8094 | No identifier value passed in the param |
| 8093 | Walkin failed from store network        |

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "organization-1",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://{host}.api.capillarytech.com/v2/organization",
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
        "type": "oauth2",
        "flows": {}
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/customer/walkin": {
      "get": {
        "summary": "Trigger Walk-in Notifications on InStore",
        "description": "Triggers customer walkin notifications on InStore. That is, when a customer walks in to the store, InStore triggers a desktop notification with the customer details.",
        "operationId": "trigger-walk-in-notifications-on-instore",
        "parameters": [
          {
            "name": "till_code",
            "in": "query",
            "description": "Destination TILL code where you want to push the notification.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "identifierName",
            "in": "query",
            "description": "Identifier tracked when the customer walked in.",
            "schema": {
              "type": "string",
              "enum": [
                "MOBILE",
                "EMAIL"
              ]
            }
          },
          {
            "name": "identifierValue",
            "in": "query",
            "description": "The respective identifier value.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "source",
            "in": "query",
            "description": "Source in which the provided customer identifier is available.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "accountId",
            "in": "query",
            "description": "Specific account ID of the source (for sources with multiple account ids).",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n   \"entity\": \"Customer check-in successful\",\n   \"warnings\": [],\n   \"errors\": [],\n   \"success\": true\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "entity": {
                      "type": "string",
                      "example": "Customer check-in successful"
                    },
                    "warnings": {
                      "type": "array"
                    },
                    "errors": {
                      "type": "array"
                    },
                    "success": {
                      "type": "boolean",
                      "example": true,
                      "default": true
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
        "deprecated": false,
        "x-readme": {
          "code-samples": [
            {
              "language": "html",
              "code": "https://{host}/v2/customer/walkin?till_code=kn.003&identifierName=mobile&identifierValue=9012345678}&source=INSTORE"
            }
          ],
          "samples-languages": [
            "html"
          ]
        }
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": false
  },
  "x-readme-fauxas": true
}
```