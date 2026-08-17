---
updatedAt: 2026-08-03T06:55:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Upload images to file service

This API is upload an image to the file service.

> 👍 Note
>
> * For detailed information about our APIs and for hands-on testing, refer documentation in [API overview](https://docs.capillarytech.com/reference/apioverview) and step-by-step guide on making your first API call in [Make your first API call](https://docs.capillarytech.com/reference/make-your-first-api-call).

# Prerequisites

* [ ] Authentication: Basic or OAuth credentials
* [ ] Default access group

# Resource information

|                        |                                                                |
| :--------------------- | :------------------------------------------------------------- |
| URI                    | /api\_gateway/file-service/rewards`{file name with extension}` |
| HTTP Method            | POST                                                           |
| Pagination             | No                                                             |
| Batch support          | No                                                             |
| Rate limit information | None                                                           |

# API endpoint example

`https://{host}/api_gateway/file-service/rewards/test.png`

# Request path parameters

| Parameter  | Data type | Description                                                                                                 |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| filename\* | String    | The name of the image to be uploaded. All file image extensions are supported. Example: test.png, test.jpg. |

# Request body parameters

| Parameter                | Data Type | Description                                                                                                                                                                                                                                                                                         |
| :----------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`File path location`** | String    | The location of the image stored on your computer. If a file path is provided, the image is stored in S3. \<br>\<br>**Example**: `@/Users/nikhil/Downloads/IMG_20220730_180352311.jpg`\<br>\<br>**Note**: If no file path is given, a placeholder is created in the S3 location to store the image. |

```json
@/Users/nikhil/Downloads/IMG_20220730_180352311.jpg
```

# Response parameters

| Parameter            | Data Type | Description                                                                           |
| -------------------- | --------- | ------------------------------------------------------------------------------------- |
| code                 | Integer   | HTTP status code indicating the outcome of the request.                               |
| status               | String    | A Boolean indicating the status of the file upload operation.                         |
| message              | String    | A message describing the outcome of the operation.                                    |
| file.name            | String    | The name of the uploaded file.                                                        |
| file.namespace       | String    | The namespace categorization for the file.                                            |
| file.version         | Integer   | The version number of the file.                                                       |
| file.acl             | String    | Access control level of the file.                                                     |
| file.fileSize        | String    | The size of the file in bytes.                                                        |
| file.file\_handle    | String    | A unique identifier for the file handle.                                              |
| file.content\_type   | String    | The MIME (Multipurpose Internet Mail Extensions) type of the file, e.g., "image/png". |
| file.s3\_token       | String    | A token representing the file in the S3 storage.                                      |
| file.latest\_version | Integer   | The latest version number of the file.                                                |
| file.last\_modified  | String    | The timestamp of the last modification to the file.                                   |
| file.s3\_url         | String    | The URL to access the file directly from S3 storage.                                  |
| secureFilePath       | String    | A secure URL to access the file, including authentication tokens and parameters.      |

```json
{
    "code": 200,
    "status": "true",
    "message": "Successfully uploaded file",
    "file": {
        "name": "test.png",
        "namespace": "rewards",
        "version": 2,
        "acl": "PRIVATE",
        "fileSize": "51",
        "file_handle": "73e78929-1e07-4cc5-a738-b54470a7dc8c",
        "content_type": "image/png",
        "s3_token": "rewards/100606/b21f3aea-ad38-4634-82a4-db2aaa0b.png",
        "latest_version": 2,
        "last_modified": "2024-05-08 09:10:59",
        "s3_url": "s3:/eucrm-solutions/rewards/100606/b21f3aea-ad38-4634-82a4-db2aaa0b.png"
    },
    "secureFilePath": "https://{host}/{path}"
}
```

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
    "/api_gateway/file-service/rewards/{file name with extension}": {
      "post": {
        "summary": "Upload images to file service",
        "description": "",
        "operationId": "post-images-to-file-service",
        "parameters": [
          {
            "name": "fileName",
            "in": "path",
            "description": "Name of the image to upload with extension.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"code\": 200,\n    \"status\": \"true\",\n    \"message\": \"Successfully uploaded file\",\n    \"file\": {\n        \"name\": \"test.png\",\n        \"namespace\": \"rewards\",\n        \"version\": 2,\n        \"acl\": \"PRIVATE\",\n        \"fileSize\": \"51\",\n        \"file_handle\": \"73e78929-1e07-4cc5-a738-b54470a7dc8c\",\n        \"content_type\": \"image/png\",\n        \"s3_token\": \"rewards/100606/b21f3aea-ad38-4634-82a4-db2aaa0b.png\",\n        \"latest_version\": 2,\n        \"last_modified\": \"2024-05-08 09:10:59\",\n        \"s3_url\": \"s3://eucrm-solutions/rewards/100606/b21f3aea-ad38-4634-82a4-db2aaa0b.png\"\n    },\n    \"secureFilePath\": \"https://{host}/{path}\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "code": {
                      "type": "integer",
                      "example": 200,
                      "default": 0
                    },
                    "status": {
                      "type": "string",
                      "example": "true"
                    },
                    "message": {
                      "type": "string",
                      "example": "Successfully uploaded file"
                    },
                    "file": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "example": "test.png"
                        },
                        "namespace": {
                          "type": "string",
                          "example": "rewards"
                        },
                        "version": {
                          "type": "integer",
                          "example": 2,
                          "default": 0
                        },
                        "acl": {
                          "type": "string",
                          "example": "PRIVATE"
                        },
                        "fileSize": {
                          "type": "string",
                          "example": "51"
                        },
                        "file_handle": {
                          "type": "string",
                          "example": "73e78929-1e07-4cc5-a738-b54470a7dc8c"
                        },
                        "content_type": {
                          "type": "string",
                          "example": "image/png"
                        },
                        "s3_token": {
                          "type": "string",
                          "example": "rewards/100606/b21f3aea-ad38-4634-82a4-db2aaa0b.png"
                        },
                        "latest_version": {
                          "type": "integer",
                          "example": 2,
                          "default": 0
                        },
                        "last_modified": {
                          "type": "string",
                          "example": "2024-05-08 09:10:59"
                        },
                        "s3_url": {
                          "type": "string",
                          "example": "s3://eucrm-solutions/rewards/100606/b21f3aea-ad38-4634-82a4-db2aaa0b.png"
                        }
                      }
                    },
                    "secureFilePath": {
                      "type": "string",
                      "example": "https://{host}/{path}"
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
              "language": "curl",
              "code": "@/Users/nikhil/Downloads/IMG_20220730_180352311.jpg"
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