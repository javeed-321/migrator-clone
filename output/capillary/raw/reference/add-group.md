---
updatedAt: 2026-03-31T10:05:09.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Add User Group

Lets you create a new user group. Groups you create will be added to the default loyalty program of the org automatically.

# Example request

```curl Sample request
curl --location 'https://eu.api.capillarytech.com/v2/userGroup2' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic bWFkajU2YQ==' \
--data '{
    "externalId": "uat_ug_12",
    "groupName": "uatUserGroup11",
    "maxGroupSize": 6   
}'
```
```curl Sample request with extended fields
curl --location 'https://eu.api.capillarytech.com/v2/userGroup2' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic bWFkaH3MjU2YQ==' \
--data '{
    "externalId": "uat_ug_13",
    "groupName": "uatUserGroup11",
    "maxGroupSize": 6,
    "extendedFields": {
        "ug_status": "Active",
        "group_avatar_url": "wwww.habluhablu.com",
        "metadata": "whatMetadata",
        "ug_primary_user": "yeshas",
        "ug_registration_date": "2025-11-10T15:10:00Z",
        "usergroup2_automation_extended_field": "25"
    }
}'
```

# Prerequisites

* [ ] Authentication: Basic or OAuth authentication
* [ ] Access group resource: Read and write access to the `User Group` resource

# Resource information

|                        |                |
| :--------------------- | :------------- |
| URI                    | /v2/userGroup2 |
| HTTP Method            | POST           |
| Pagination             | No             |
| Batch support          | No             |
| Rate limit information | NA             |

# Request body parameters

<HTMLBlock>{`
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr>
  <th style="border: 1px solid #ddd; padding: 8px;">Parameter<br>(Parameters marked with * are mandatory)</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Type</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>externalId*</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>string</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Unique ID of the group. The maximum number of allowed characters is 50.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>groupName</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>string</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Name of the group. The maximum number of allowed characters is 50.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>maxGroupSize*</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>integer</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Maximum size of the group. The maximum group size is as defined by the product configuration <code>CONF_MAX_FLEET_GROUP_SIZE</code>. If this configuration is not set, the default maximum size is 30,000.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>limit</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>integer</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Maximum number of items to be retrieved.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>extendedFields</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>array</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>An array containing the<a href="https://docs.capillarytech.com/docs/data-entities#extended-fields"> extended fields </a>and their corresponding values, enabled for specific verticals within the organisation. These extended fields capture additional information about the group. <strong>Example</strong>:  A brand X wants to capture the type of group: Platinum, Gold, or Silver. It uses the extended fields to capture the information and decides the rewards depending on the group.<br> <strong>Note</strong>: Extended field support is available for fields created using the <a href="https://docs.capillarytech.com/docs/data-entities">entity type </a><code>usergroup2</code>.</p>
</td>
</tr>
</tbody>
</table>
`}</HTMLBlock>

# Example response

```json Sample response
{
    "entity": 3962909,
    "warnings": []
}
```
```json Sample response with extended fields
{
    "entity": 3962910,
    "warnings": []
}
```

# Response parameters

| Parameter | Description                                |
| --------- | ------------------------------------------ |
| entity    | Unique ID of the user group created.       |
| warnings  | Array containing warning messages, if any. |

# API-specific error codes

<HTMLBlock>{`
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr>
  <th style="border: 1px solid #ddd; padding: 8px;">Error code</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>1633</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Group ID exists. Change the value of the field <code>externalId</code></p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>91017</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Value of the extended field does not match the data type.<br><strong>Note</strong>: This is a warning, The user group is created, but the extended fields are not updated.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>91016</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Extended field name is incorrect.<br><strong>Note</strong>: This is a warning. The user group is created, but the extended fields are not updated.</p>
</td>
</tr>
</tbody>
</table>
`}</HTMLBlock>

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
    "/userGroup2": {
      "post": {
        "summary": "Add Group",
        "description": "Lets you create a new user group. Groups you create will be added to the default loyalty program of the org automatically.",
        "operationId": "add-group",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "externalId",
                  "maxGroupSize"
                ],
                "properties": {
                  "externalId": {
                    "type": "string",
                    "description": "External ID of the group."
                  },
                  "groupName": {
                    "type": "string",
                    "description": "Name of the group. The maximum allowed number of characters is 50."
                  },
                  "maxGroupSize": {
                    "type": "integer",
                    "description": "Maximum size (members) of the group.",
                    "format": "int32"
                  },
                  "extendedFields": {
                    "type": "array",
                    "description": "Array containing the extended fields and their values. **Note**: Extended fields are supported only for the `usergroup2` entity.",
                    "items": {
                      "type": "string"
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
                    "value": {
                      "entity": 3962909,
                      "warnings": []
                    }
                  },
                  "Sample Response with extended fields": {
                    "value": {
                      "entity": 3962910,
                      "warnings": []
                    }
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "title": "Sample Response",
                      "type": "object",
                      "properties": {
                        "entity": {
                          "type": "integer",
                          "example": 2361,
                          "default": 0
                        },
                        "warnings": {
                          "type": "array"
                        }
                      }
                    },
                    {
                      "title": "Sample Response with extended fields",
                      "type": "object",
                      "properties": {
                        "entity": {
                          "type": "integer",
                          "example": 51298,
                          "default": 0
                        },
                        "warnings": {
                          "type": "array"
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
              "language": "shell",
              "code": "curl --location 'https://eu.api.capillarytech.com/v2/userGroup2' \\\n--header 'Content-Type: application/json' \\\n--header 'Accept: application/json' \\\n--header 'Authorization: Basic bWFkaHVwNMjU2YQ==' \\\n--data '{\n    \"externalId\": \"uat_ug_12\",\n    \"groupName\": \"uatUserGroup11\",\n    \"maxGroupSize\": 6   \n}'",
              "name": "Sample request"
            },
            {
              "language": "curl",
              "code": "curl --location 'https://eu.api.capillarytech.com/v2/userGroup2' \\\n--header 'Content-Type: application/json' \\\n--header 'Accept: application/json' \\\n--header 'Authorization: Basic bWFkaHMjU2YQ==' \\\n--data '{\n    \"externalId\": \"uat_ug_13\",\n    \"groupName\": \"uatUserGroup11\",\n    \"maxGroupSize\": 6,\n    \"extendedFields\": {\n        \"ug_status\": \"Active\",\n        \"group_avatar_url\": \"wwww.habluhablu.com\",\n        \"metadata\": \"whatMetadata\",\n        \"ug_primary_user\": \"yeshas\",\n        \"ug_registration_date\": \"2025-11-10T15:10:00Z\",\n        \"usergroup2_automation_extended_field\": \"25\"\n    }\n}'",
              "name": "Sample request with extended fields"
            }
          ],
          "samples-languages": [
            "shell",
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