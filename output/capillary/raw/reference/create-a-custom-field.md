---
updatedAt: 2026-07-21T10:21:35.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create a Custom Field

This API allows you to create custom fields, either applicable across all entities within the organization or specific to a single entity, such as a loyalty transaction. Field names must be unique within each organization, regardless of the scope. You cannot create multiple custom fields with the same name in different scopes within the same organization.

You can create custom fields with the same name separately for the parent and child organizations. This is useful in scenarios where you want to assign distinct values to the custom field at the parent and child levels, such as setting different header content in email campaigns for each organization.

**Note:** For customer registration, it is recommended to avoid using identical custom field names for both parent and child organizations. When a custom field with the same name exists at both levels, the value at the parent level will always override that of the child organization.

## Example request

```curl
curl --location 'https://eu.api.capillarytech.com/v2/customFields' \
--header 'Content-Type: application/json' \
--header 'X-CAP-API-OAUTH-TOKEN: eyJraWQiOiJrMSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJDYXBpbGxhcnkiLCJleHAiOjE3ODQ2MzI4MTksImp0aSI6Ik9XYlFxRUVYUFRzaWJrOHpVaGpGY3ciLCJpYXQiOjE3ODQ2MjkyMTksInN1YiI6Ik5lZXJhaiIsImNsaWVudF9pZCI6MjE5NzYsIm9yZ19pZCI6MTAwNzM3LCJ0b2tlbl91c2UiOiJ0b2tlbl9hY2Nlc3MiLCJjbGllbnRfa2V5IjoieHY0TFc3MXJOOXJyekY4NlcxMUx3M0pneiIsImRlZmF1bHRfdGlsbCI6NzUxNTUyODIsImhhc19wc2lfYWNjZXNzIjp0cnVlLCJzY29wZXMiOiJbXSJ9.aGOKCH0DRpSUYGcb4IdDewDN92u3HGpKlrI-1cDumpK5fQkni6F8BW16dBCe0RN3ViY3nvFTEnTMJY_jS9QW68Q0b2jUjBklUF4G4bbMwtsgMN3NNyoSR9dT0ecWVhDexLYrLIlMiG728PtvKX5mW7XvA7jjmImDt6GVmTXqa3eYQzJqriHVMbB2-eIGbw786r1q84QesF8bJ3YcRcIJ0uCzvWZ3Gl1cQ3R_ZpuNLCcImDg0LX-K_GOQNVVrGVcxq2oM2YnBphQQNPdqFEB_uxZM5zOwzZAty_B66eNgjyZayUvdMs8g63wxTkmg5PDVoZwkGcBHX-Mld-hluQ' \
--data '{
    "scope": "STORE_CUSTOM_FIELDS",
    "customFields": [
        {
            "name": "CF2",
            "type": "textarea",
            "dataType": "String",
            "label": "test2",
            "scope": "STORE_CUSTOM_FIELDS",
            "defaultValue": "",
            "phase": "1",
            "position": 7,
            "rule": "",
            "serverRule": "",
            "regex": "",
            "helptext": "",
            "error": "Enter your special_instructions",
            "attrs": "",
            "isDisabled": 0,
            "isCompulsory": 0,
            "isUpdatable": 1,
            "disableAtServer": 0,

            "enableAuditTrail": 0,
            "isPiiData": 0,
            "isPsiData": 0,
            "options": "",
            "value": ""
        }


























    ]
}'
```

<br />

## Prerequisites

* Authentication: Basic Auth or OAuth
* WRITE access to [the Organization resource](https://docs.capillarytech.com/docs/access-group)

## Body parameters

| Field               | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scope`             | string  | Required | The entity for which the custom field is applicable. Supported values: `LOYALTY_REGISTRATION`, `LOYALTY_TRANSACTION`, `CUSTOMER_FEEDBACK`, `POINTS_REDEMPTION`, `VOUCHER_REDEMPTION`, `ZONE_CUSTOM_FIELDS`, `STORE_CUSTOM_FIELDS`, `CUSTOM_FIELDS_DATA_LOG`, `CHECK_IN_FEEDBACK`, `CUSTOMER_PREFERENCES`, `ADVANCE_FEEDBACK`, `CONCEPT_CUSTOM_FIELDS`, `LOYALTY_LINE_ITEMS` (not in use), `NI_CUSTOM_FIELDS` (not in use), `CUSTOMER_CARD`, `TILL_CUSTOM_FIELDS`, `ORG_CUSTOM_FIELD` (applicable for the entire org). |
| `customFields`      | array   | Required | List of custom fields to create.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `.name`             | string  | Required | Name of the custom field. Max 20 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `.type`             | string  | Required | Field type. Supported values: `text`, `textarea`, `select`, `checkbox`, `radio`, `file`, `template_area`, `datepicker`, `separator`, `button`, `email_body`, `feedback`, `label`.                                                                                                                                                                                                                                                                                                                                     |
| `.dataType`         | enum    | Required | Data type of the custom field. Supported values: `Boolean`, `Integer`, `Double`, `String`.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `.label`            | string  | Optional | Display name shown in the UI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `.defaultValue`     | string  | Optional | Default value for the custom field, for example, `"#1234"`. This is metadata only and is not tagged to an entity by default. Applies to client-side applications like Instore; not validated server-side.                                                                                                                                                                                                                                                                                                             |
| `.phase`            | string  | Optional | Applicable for Instore only; not in use.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `.position`         | integer | Optional | Display order of the custom field in the form, for example, `1` for first position. Applies to client-side applications like Instore; not validated server-side.                                                                                                                                                                                                                                                                                                                                                      |
| `.rule`             | string  | Optional | Logical expression in Infix expression language. Use placeholders like `{{custom_field_name}}`, which are replaced with actual values during evaluation.                                                                                                                                                                                                                                                                                                                                                              |
| `.serverRule`       | string  | Optional | Rule in Infix form. Format: `{"name":"{{custom_field_name}}","value":"{{custom_field_value}}"}`. Placeholders are replaced with actual values during evaluation.                                                                                                                                                                                                                                                                                                                                                      |
| `.regex`            | string  | Optional | Regular expression for input validation, for example, to validate an email address.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `.error`            | string  | Optional | Error message to display for invalid input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `.helptext`         | string  | Optional | Help text for the field.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `.attrs`            | string  | Optional | Additional attributes for the field.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `.options`          | string  | Optional | Additional options for the field.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `.value`            | string  | Optional | Value associated with the custom field.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `.isDisabled`       | boolean | Optional | Indicates whether the custom field is disabled. `0` for false. Applies to client-side applications like Instore; not validated server-side.                                                                                                                                                                                                                                                                                                                                                                           |
| `.isCompulsory`     | boolean | Optional | Indicates whether the custom field is mandatory. `0` for false. Applies to client-side applications like Instore; not validated server-side.                                                                                                                                                                                                                                                                                                                                                                          |
| `.isUpdatable`      | boolean | Optional | Indicates whether the custom field can be updated. `0` for false. Applies to client-side applications like Instore; not validated server-side.                                                                                                                                                                                                                                                                                                                                                                        |
| `.disableAtServer`  | boolean | Optional | Indicates whether the field is disabled on the server. `0` for false.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `.enableAuditTrail` | boolean | Optional | Indicates whether audit trails are enabled for the field. `0` for false.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `.isPiiData`        | boolean | Optional | Indicates whether the field contains PII data. `0` for false.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `.isPsiData`        | boolean | Optional | Indicates whether the field contains PSI data. `0` for false.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

```json
{
  "scope": "ORG_CUSTOM_FIELD",
  "customFields": [
    {
      "name": "Email Footer Color",
      "type": "text",
      "dataType": "STRING",
      "label": "Mail content",
      "scope": "ORG_CUSTOM_FIELD",
      "defaultValue": "#1234",
      "phase": "1",
      "position": 0,
      "rule": "",
      "serverRule": "",
      "regex": "",
      "error": "",
      "isDisabled": 0,
      "isCompulsory": 0,
      "disableAtServer": 0,
      "isUpdatable": 0,
      "enableAuditTrail": 0,
      "isPiiData": 0,
      "isPsiData": 0,
      "helptext": "",
      "attrs": ""
    }
  ]
}
```

<Callout icon="📘" theme="info">
  ### Note

  The maximum number of auditable custom fields that can be created is controlled by the `PRODUCT_CONF_ORG_AUDITABLE_CUSTOM_FIELDS_LIMIT` configuration. If this configuration is not set for a specified organisation, the default limit is set to 5 at the backend.
</Callout>

## Example response

```json
{
    "entity": [
        {
            "orgId": 50399,
            "name": "Email Footer Color",
            "type": "text",
            "dataType": "STRING",
            "label": "Mail content",
            "scope": "ORG_CUSTOM_FIELD",
            "defaultValue": "#1234",
            "phase": "1",
            "position": 0,
            "rule": "",
            "serverRule": "",
            "regex": "",
            "error": "",
            "isDisabled": 0,
            "isCompulsory": 0,
            "disableAtServer": 0,
            "isUpdatable": 0,
            "enableAuditTrail": 0,
            "isPiiData": 0,
            "isPsiData": 0,
            "helptext": "",
            "attrs": "",
            "value": ""
        }
    ],
    "warnings": [],
    "errors": [],
    "success": true
}
```

## Response parameters

| Field               | Type    | Description                                                              |
| ------------------- | ------- | ------------------------------------------------------------------------ |
| `entity`            | array   | List of custom fields that were created.                                 |
| `.orgId`            | integer | Unique identifier of the organization.                                   |
| `.name`             | string  | Name of the custom field.                                                |
| `.type`             | string  | Field type of the custom field.                                          |
| `.dataType`         | string  | Data type of the custom field.                                           |
| `.label`            | string  | Display name of the custom field shown in the UI.                        |
| `.scope`            | string  | Entity scope for which the custom field is applicable.                   |
| `.defaultValue`     | string  | Default value assigned to the custom field.                              |
| `.phase`            | string  | Phase of the custom field (Instore only).                                |
| `.position`         | integer | Display order of the custom field in the form.                           |
| `.rule`             | string  | Logical expression rule for the custom field.                            |
| `.serverRule`       | string  | Server-side rule for the custom field.                                   |
| `.regex`            | string  | Regular expression for validation.                                       |
| `.error`            | string  | Error message for invalid input.                                         |
| `.helptext`         | string  | Help text for the custom field.                                          |
| `.attrs`            | string  | Additional attributes for the custom field.                              |
| `.value`            | string  | Value associated with the custom field.                                  |
| `.isDisabled`       | boolean | Indicates whether the custom field is disabled. `0` for false.           |
| `.isCompulsory`     | boolean | Indicates whether the custom field is mandatory. `0` for false.          |
| `.isUpdatable`      | boolean | Indicates whether the custom field can be updated. `0` for false.        |
| `.disableAtServer`  | boolean | Indicates whether the field is disabled on the server. `0` for false.    |
| `.enableAuditTrail` | boolean | Indicates whether audit trails are enabled for the field. `0` for false. |
| `.isPiiData`        | boolean | Indicates whether the field contains PII data. `0` for false.            |
| `.isPsiData`        | boolean | Indicates whether the field contains PSI data. `0` for false.            |
| `warnings`          | array   | List of warnings returned by the API.                                    |
| `errors`            | array   | List of errors returned by the API.                                      |
| `success`           | boolean | Indicates whether the request was successful.                            |

## Error & warning codes

| Code                                     | Error number | Type  | Description                                                                                         |
| ---------------------------------------- | ------------ | ----- | --------------------------------------------------------------------------------------------------- |
| `INVALID_CUSTOM_FIELD_SCOPE`             | 1018         | Error | Provided scope is invalid.                                                                          |
| `AUDITABLE_CUSTOM_FIELDS_COUNT_BREACHED` | 1023         | Error | Maximum auditable custom field limit is {0}, existing count is {1} (including the current payload). |
| `CUSTOM_FIELD_PARAM_NULL_OR_EMPTY`       | 1024         | Error | Custom field parameter {0} is null or empty.                                                        |
| `DUPLICATE_ORG_CUSTOM_FIELD`             | 1025         | Error | Duplicate organization custom field: {0}.                                                           |
| `FAILED_TO_SAVE_CUSTOM_FIELDS`           | 1026         | Error | Failed to save custom fields. Try again.                                                            |
| `CUSTOM_FIELD_LIST_NULL_OR_EMPTY`        | 1028         | Error | Null or empty custom field list.                                                                    |

**Note:** In the descriptions, `{0}` and `{1}` are placeholders that will be replaced with specific values, such as the maximum limit, current count, or field name based on the context.

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "v2",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://{host}/v2",
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
    "/customFields": {
      "post": {
        "summary": "Create a Custom Field",
        "description": "",
        "operationId": "create-a-custom-field",
        "parameters": [
          {
            "name": "X-CAP-API-AUTH-KEY",
            "in": "header",
            "description": "Auth Key for internal API",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "X-CAP-API-AUTH-ORG-ID",
            "in": "header",
            "description": "Organisation ID",
            "required": true,
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
                "properties": {
                  "RAW_BODY": {
                    "type": "string"
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
                  "Result": {
                    "value": "{\n    \"entity\": [\n        {\n            \"orgId\": 50399,\n            \"name\": \"Email Footer Color\",\n            \"type\": \"text\",\n            \"dataType\": \"STRING\",\n            \"label\": \"Mail content\",\n            \"scope\": \"ORG_CUSTOM_FIELD\",\n            \"defaultValue\": \"#1234\",\n            \"phase\": \"1\",\n            \"position\": 0,\n            \"rule\": \"\",\n            \"serverRule\": \"\",\n            \"regex\": \"\",\n            \"error\": \"\",\n            \"isDisabled\": 0,\n            \"isCompulsory\": 0,\n            \"disableAtServer\": 0,\n            \"isUpdatable\": 0,\n            \"enableAuditTrail\": 0,\n            \"isPiiData\": 0,\n            \"isPsiData\": 0,\n            \"helptext\": \"\",\n            \"attrs\": \"\",\n            \"value\": \"\"\n        }\n    ],\n    \"warnings\": [],\n    \"errors\": [],\n    \"success\": true\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "entity": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "orgId": {
                            "type": "integer",
                            "example": 50399,
                            "default": 0
                          },
                          "name": {
                            "type": "string",
                            "example": "Email Footer Color"
                          },
                          "type": {
                            "type": "string",
                            "example": "text"
                          },
                          "dataType": {
                            "type": "string",
                            "example": "STRING"
                          },
                          "label": {
                            "type": "string",
                            "example": "Mail content"
                          },
                          "scope": {
                            "type": "string",
                            "example": "ORG_CUSTOM_FIELD"
                          },
                          "defaultValue": {
                            "type": "string",
                            "example": "#1234"
                          },
                          "phase": {
                            "type": "string",
                            "example": "1"
                          },
                          "position": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "rule": {
                            "type": "string",
                            "example": ""
                          },
                          "serverRule": {
                            "type": "string",
                            "example": ""
                          },
                          "regex": {
                            "type": "string",
                            "example": ""
                          },
                          "error": {
                            "type": "string",
                            "example": ""
                          },
                          "isDisabled": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "isCompulsory": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "disableAtServer": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "isUpdatable": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "enableAuditTrail": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "isPiiData": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "isPsiData": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "helptext": {
                            "type": "string",
                            "example": ""
                          },
                          "attrs": {
                            "type": "string",
                            "example": ""
                          },
                          "value": {
                            "type": "string",
                            "example": ""
                          }
                        }
                      }
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
        "x-readme": {
          "code-samples": [
            {
              "language": "curl",
              "code": "curl --location 'https://eu.api.capillarytech.com/v2/customFields' \\\n--header 'Content-Type: application/json' \\\n--header 'X-CAP-API-OAUTH-TOKEN: eyJraWQiOiMSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJDYXBpbGxhcnkiLCJleHAiOjE3ODQ2MzI4MTksImp0aSI6Ik9XYlFxRUVYUFRzaWJrOHpVaGpGY3ciLCJpYXQiOjE3ODQ2MjkyMTksInN1YiI6Ik5lZXJhaiIsImNsaWVudF9pZCI6MjE5NzYsIm9yZ19pZCI6MTAwNzM3LCJ0b2tlbl91c2UiOiJ0b2tlbl9hY2Nlc3MiLCJjbGllbnRfa2V5IjoieHY0TFc3MXJOOXJyekY4NlcxMUx3M0pneiIsImRlZmF1bHRfdGlsbCI6NzUxNTUyODIsImhhc19wc2lfYWNjZXNzIjp0cnVlLCJzY29wZXMiOiJbXSJ9.aGOKCH0DRpSUYGcb4IdDewDN92u3HGpKlrI-1cDumpK5fQkni6F8BW16dBCe0RN3ViY3nvFKe_CTEnTMJY_jS9QW68Q0b2jUjBklUF4G4bbMwtsgMN3NNyoSR9dT0ecWVhDexLYrLIlMiG728PtvKX5mW7XvA7jjmImDt6GVmTXqa3eYQzJqriHVMbB2-eIGbw786r1q84QesF8bJ3YcRcIJ0uCzvWZ3Gl1cQ3R_ZpuNLCcImDg0LX-K_GOQNVVrGVcxq2oM2YnBphQQNPdqFEB_uxZM5zOwzZAty_B66eNgjyZayUvdMs8g63wxTkmg5PDVoZwkGcBHX-Mld-hluQ' \\\n--data '{\n    \"scope\": \"STORE_CUSTOM_FIELDS\",\n    \"customFields\": [\n        {\n            \"name\": \"CF2\",\n            \"type\": \"textarea\",\n            \"dataType\": \"String\",\n            \"label\": \"test2\",\n            \"scope\": \"STORE_CUSTOM_FIELDS\",\n            \"defaultValue\": \"\",\n            \"phase\": \"1\",\n            \"position\": 7,\n            \"rule\": \"\",\n            \"serverRule\": \"\",\n            \"regex\": \"\",\n            \"helptext\": \"\",\n            \"error\": \"Enter your special_instructions\",\n            \"attrs\": \"\",\n            \"isDisabled\": 0,\n            \"isCompulsory\": 0,\n            \"isUpdatable\": 1,\n            \"disableAtServer\": 0,\n\n            \"enableAuditTrail\": 0,\n            \"isPiiData\": 0,\n            \"isPsiData\": 0,\n            \"options\": \"\",\n            \"value\": \"\"\n        }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    ]\n}'"
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
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```