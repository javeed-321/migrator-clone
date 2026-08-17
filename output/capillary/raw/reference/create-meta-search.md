---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create search filter

This API allows you to create a search criteria.

> 👍 Notes
>
> * Make sure that you have appropriate access control configured. For more information, see [access group documentation](https://docs.capillarytech.com/docs/access-group).
> * The maximum number of PREFIX criteria you can create for a Customer entity per organization is two.
> * The maximum number of COMBINATION crtieria for an entiry per organization is five.

This API allows you to create a search filter/criteria. After the search filter is created, you need to [make a bulk trigger API request](\[https://docs.capillarytech.com/reference/enable-bulk-trigger]\(https://docs.capillarytech.com/reference/enable-bulk-trigger\)) to activate this.

# Example request

```json Create Transaction Search Criteria
curl --location 'https://eu.api.capillarytech.com/api_gateway/cortex/v1/criteria' \
--header 'X-CAP-API-AUTH-ORG-ID: 100737' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic bmVlcmFqLmpiNGFmODA0MDA5Y2IwMzZhNGNjZGMzMzQzMWVmOWFjOQ==' \
--header 'Cookie: _cfuvid=d6B6HLH6oGwJZ21oIncVwhv3KVFCQL1tV0M8y1Bz2L8-1740672713496-0.0.1.1-604800000' \
--data '{
    "name": "TransactionSearch3",
    "entityType": "TRANSACTION",
    "searchStrategyType": "COMBINATION",
    "fieldDefinitions": [
        {
            "fieldId": "billNumber",
            "fieldAlias": "billNumber",
            "fieldType": "INDEXED",
            "dataSourceDetails": {
                "fieldReference": "billNumber"
            },
            "dataType": "STRING"
        }
        
    ],
    "searchDataPolicy": {
        "dataRetentionPolicy": {
            "unit": "DAYS",
            "value": 10
        },
        "expireDataFrom": "CREATE"
    }
}'
```
```curl Create Customer Search Criteria
curl --location 'https://eu.api.capillarytech.com/api_gateway/cortex/v1/criteria' \
--header 'X-CAP-API-AUTH-ORG-ID: 100737' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic bmVlcmFqLmRvYzpiNGFmODA0MDA5Y2IwMzZhNGNjZGMzMzQzMWVmOWFjOQ==' \
--header 'Cookie: _cfuvid=d6B6HLH6oGwJZ21oIncVwhv3KVFCQL1tV0M8y1Bz2L8-1740672713496-0.0.1.1-604800000' \
--data '{
    "name": "CustomerSearch1",
    "entityType": "CUSTOMER",
    "searchStrategyType": "COMBINATION",
    "fieldDefinitions": [
        {
            "fieldId": "firstName",
            "fieldAlias": "firstName",
            "fieldType": "INDEXED",
            "dataSourceDetails": {
                "fieldReference": "firstName"
            },
            "dataType": "STRING"
        },
 {
            "fieldId": "lastName",
            "fieldAlias": "lastName",
            "fieldType": "FILTERABLE",
            "dataSourceDetails": {
                "fieldReference": "lastName"
            },
            "dataType": "STRING"
        }

        
    ],
    "searchDataPolicy": {
        "dataRetentionPolicy": {
            "unit": "DAYS",
            "value": 10
        },
        "expireDataFrom": "CREATE"
    }
}'
```

# Request body parameter

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        name
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        Name of the search entity.
      </td>
    </tr>

    <tr>
      <td>
        entityType
      </td>

      <td>
        enum
      </td>

      <td>
        Yes
      </td>

      <td>
        Type of entity being searched (`TRANSACTION`, `CUSTOMER`).
      </td>
    </tr>

    <tr>
      <td>
        searchStrategyType
      </td>

      <td>
        String
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the search strategy type. `COMBINATION`: Matches records based on a combination of multiple defined fields. `PREFIX`: Matches records where field values start with the specified prefix.
      </td>
    </tr>

    <tr>
      <td>
        fieldDefinitions
      </td>

      <td>
        Array
      </td>

      <td>
        Optional
      </td>

      <td>
        List of field definitions used in the search.
      </td>
    </tr>

    <tr>
      <td>
        .fieldId
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        The field to search on. For the Customer entity, the supported fields are: `firstName`, `lastName`, `email`, `mobile`, `externalId`, `fullName`, `cardnumber` and `cardExternalId`. For the Transaction entity, the supported fields are: `outlierStatus`, `billDate`, `billNumber`, and `storecode` (additional field).
      </td>
    </tr>

    <tr>
      <td>
        .fieldAlias
      </td>

      <td>
        String
      </td>

      <td>
        Optional
      </td>

      <td>
        A user-friendly display name for a field. It pairs with the technical parameter name (`fieldId`) when defining search criteria. The alias can be used by clients or UI layers to render meaningful labels. For example, if the `fieldId` is `dob`, the `fieldAlias` can be set as **Date of Birth**, which the client/UI page displays instead of the raw key.
      </td>
    </tr>

    <tr>
      <td>
        .fieldType
      </td>

      <td>
        enum
      </td>

      <td>
        Yes
      </td>

      <td>
        Type of field. For `COMBINATION` search strategy: 
        **`INDEXED`**: Required to fetch results. At least one indexed field must always be provided. - **`FILTERABLE`**: Optional. Used to refine results when combined with indexed fields. 
        **Examples** If fields **A** and **B** are indexed, both must be included in the search request. If **A** is indexed and **B** is filterable, you can search with **A** alone or with **A + B** for more specific results. **Limits** - Up to **5 filterable fields** are allowed. - Up to **6 indexed fields** are allowed. For `PREFIX`, all the fields should be defined as `INDEXED`.
      </td>
    </tr>

    <tr>
      <td>
        .dataSourceDetails
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Contains details about the field source.
      </td>
    </tr>

    <tr>
      <td>
        ..fieldReference
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        Applicable in **`COMBINATION`** criteria when you include custom, extended, or additional fields. **Examples** `extendedFields.ship_email` - lets you search customers by their shipping email. `customFields.age` → lets you search customers by a custom age field. `additionalFields.storecode` → *(transaction only)*, lets you search transactions by store code.
      </td>
    </tr>

    <tr>
      <td>
        ..dataType
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        Data type of the field (e.g., `STRING`).
      </td>
    </tr>

    <tr>
      <td>
        .numberOfCards
      </td>

      <td>
        String
      </td>

      <td>
        Conditional
      </td>

      <td>
        Specifies the number of card identifiers (`cardNumber` or `cardExternalId`) indexed for each customer profile. Applicable for `cardNumber`, `cardExternalId`. This defines the maximum number of cards you can use to search for a customer. 
        **Behaviour:** 

        * If a customer has more cards linked than the configured limit, only the most recently linked cards (up to the limit) are indexed. 
        * The same value should be set for both `cardNumber` and `cardExternalId` to avoid inconsistency. 
          Supported values: Minimum 1, maximum 5
      </td>
    </tr>

    <tr>
      <td>
        searchDataPolicy
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the data retention policy and expiration details for the search data.
      </td>
    </tr>

    <tr>
      <td>
        .dataRetentionPolicy
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines how long the search data is retained.
      </td>
    </tr>

    <tr>
      <td>
        ..unit
      </td>

      <td>
        String
      </td>

      <td>
        Optional
      </td>

      <td>
        Time unit for data retention. Only `DAYS` is supported.
      </td>
    </tr>

    <tr>
      <td>
        ..value
      </td>

      <td>
        Integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Number of days of historical data to fetch, counted backwards from when the search criteria is created. **Default**: 180 days **Maximum**: 365 days (transaction), 1826 days (customer)
      </td>
    </tr>

    <tr>
      <td>
        . expireDataFrom
      </td>

      <td>
        String
      </td>

      <td>
        Optional
      </td>

      <td>
        Specifies the action (such as creating or updating a search criteria) from which the search data gets indexed. Currently, only **`CREATE`** is supported.
      </td>
    </tr>
  </tbody>
</Table>

# Response parameters

| Parameter Name          | Type    | Description                                                                         |
| ----------------------- | ------- | ----------------------------------------------------------------------------------- |
| data.id                 | String  | Unique identifier for the search criteria.                                          |
| data.orgId              | Integer | Organization ID associated with the search.                                         |
| data.name               | String  | Name of the search entity.                                                          |
| data.searchStrategyType | enum    | Defines the search strategy type (e.g., `COMBINATION`).                             |
| data.entityType         | enum    | Type of entity being searched (e.g., `TRANSACTION`).                                |
| data.bulkJobStatus      | String  | Status of the bulk job (e.g., `OPEN`).                                              |
| data.fieldDefinitions   | Array   | List of fields that will be available by default in the response during the search. |
| fieldId                 | String  | Unique identifier for the field.                                                    |
| fieldAlias              | String  | Alias name for the field.                                                           |
| fieldType               | enum    | Type of field (e.g., `INDEXED`, `FILTERABLE`).                                      |
| fieldReference          | String  | Reference to the actual field in the data source.                                   |
| dataType                | String  | Data type of the field (e.g., `STRING`, `DATE`).                                    |
| searchDataPolicy        | Object  | Defines policies for data retention.                                                |
| unit                    | String  | Time unit for data retention (e.g., `DAYS`).                                        |
| value                   | Integer | Number of units for data retention (e.g., `10`).                                    |
| expireDataFrom          | String  | Defines when the data expires (e.g., `CREATE`).                                     |
| status                  | String  | Status of the criteria verification (e.g., `VERIFICATION_IN_PROGRESS`).             |
| createdOn               | String  | Timestamp of when the search entity was created.                                    |
| createdBy               | Integer | User ID of the creator.                                                             |
| lastUpdatedOn           | String  | Timestamp of the last update.                                                       |
| lastUpdatedBy           | Integer | User ID of the last updater.                                                        |
| errors                  | Array   | List of errors encountered during processing (if any).                              |

```json
{
    "data": {
        "id": "67c091299e22382d75d405bc",
        "orgId": 100737,
        "name": "TransactionSearch3",
        "searchStrategyType": "COMBINATION",
        "entityType": "TRANSACTION",
        "fieldDefinitions": [
            {
                "fieldId": "billNumber",
                "fieldAlias": "billNumber",
                "fieldType": "INDEXED",
                "dataSourceDetails": {
                    "fieldReference": "billNumber"
                },
                "dataType": "STRING"
            }
        ],
        "dataFieldDefinitions": [
            {
                "fieldId": "billNumber",
                "fieldAlias": "billNumber",
                "fieldType": "DATA",
                "dataSourceDetails": {
                    "fieldReference": "billNumber"
                },
                "dataType": "STRING"
            },
            {
                "fieldId": "billDate",
                "fieldAlias": "billDate",
                "fieldType": "DATA",
                "dataSourceDetails": {
                    "fieldReference": "billDate"
                },
                "dataType": "DATE"
            }
        ],
        "searchDataPolicy": {
            "dataRetentionPolicy": {
                "unit": "DAYS",
                "value": 10
            },
            "expireDataFrom": "CREATE"
        },
        "criteriaStatus": {
            "status": "VERIFICATION_IN_PROGRESS"
        },
        "bulkJobStatus": "OPEN",
        "auditInfo": {
            "createdOn": "2025-02-27T16:22:01.911+00:00",
            "createdBy": 75155282,
            "lastUpdatedOn": "2025-02-27T16:22:01.911+00:00",
            "lastUpdatedBy": 75155282
        }
    },
    "errors": []
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
    "/api_gateway/cortex/v1/criteria": {
      "post": {
        "summary": "Create search criteria",
        "description": "This API allows you to create a search criteria.",
        "operationId": "create-meta-search",
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Search criteria created": {
                    "value": "{\"data\":{\"id\":\"67c091299e22382d75d405bc\",\"orgId\":100737,\"name\":\"TransactionSearch3\",\"searchStrategyType\":\"COMBINATION\",\"entityType\":\"TRANSACTION\",\"fieldDefinitions\":[{\"fieldId\":\"billNumber\",\"fieldAlias\":\"billNumber\",\"fieldType\":\"INDEXED\",\"dataSourceDetails\":{\"fieldReference\":\"billNumber\"},\"dataType\":\"STRING\"}],\"dataFieldDefinitions\":[{\"fieldId\":\"billNumber\",\"fieldAlias\":\"billNumber\",\"fieldType\":\"DATA\",\"dataSourceDetails\":{\"fieldReference\":\"billNumber\"},\"dataType\":\"STRING\"},{\"fieldId\":\"billDate\",\"fieldAlias\":\"billDate\",\"fieldType\":\"DATA\",\"dataSourceDetails\":{\"fieldReference\":\"billDate\"},\"dataType\":\"DATE\"}],\"searchDataPolicy\":{\"dataRetentionPolicy\":{\"unit\":\"DAYS\",\"value\":10},\"expireDataFrom\":\"CREATE\"},\"criteriaStatus\":{\"status\":\"VERIFICATION_IN_PROGRESS\"},\"bulkJobStatus\":\"OPEN\",\"auditInfo\":{\"createdOn\":\"2025-02-27T16:22:01.911+00:00\",\"createdBy\":75155282,\"lastUpdatedOn\":\"2025-02-27T16:22:01.911+00:00\",\"lastUpdatedBy\":75155282}},\"errors\":[]}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "example": "67c091299e22382d75d405bc"
                        },
                        "orgId": {
                          "type": "integer",
                          "example": 100737,
                          "default": 0
                        },
                        "name": {
                          "type": "string",
                          "example": "TransactionSearch3"
                        },
                        "searchStrategyType": {
                          "type": "string",
                          "example": "COMBINATION"
                        },
                        "entityType": {
                          "type": "string",
                          "example": "TRANSACTION"
                        },
                        "fieldDefinitions": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "fieldId": {
                                "type": "string",
                                "example": "billNumber"
                              },
                              "fieldAlias": {
                                "type": "string",
                                "example": "billNumber"
                              },
                              "fieldType": {
                                "type": "string",
                                "example": "INDEXED"
                              },
                              "dataSourceDetails": {
                                "type": "object",
                                "properties": {
                                  "fieldReference": {
                                    "type": "string",
                                    "example": "billNumber"
                                  }
                                }
                              },
                              "dataType": {
                                "type": "string",
                                "example": "STRING"
                              }
                            }
                          }
                        },
                        "dataFieldDefinitions": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "fieldId": {
                                "type": "string",
                                "example": "billNumber"
                              },
                              "fieldAlias": {
                                "type": "string",
                                "example": "billNumber"
                              },
                              "fieldType": {
                                "type": "string",
                                "example": "DATA"
                              },
                              "dataSourceDetails": {
                                "type": "object",
                                "properties": {
                                  "fieldReference": {
                                    "type": "string",
                                    "example": "billNumber"
                                  }
                                }
                              },
                              "dataType": {
                                "type": "string",
                                "example": "STRING"
                              }
                            }
                          }
                        },
                        "searchDataPolicy": {
                          "type": "object",
                          "properties": {
                            "dataRetentionPolicy": {
                              "type": "object",
                              "properties": {
                                "unit": {
                                  "type": "string",
                                  "example": "DAYS"
                                },
                                "value": {
                                  "type": "integer",
                                  "example": 10,
                                  "default": 0
                                }
                              }
                            },
                            "expireDataFrom": {
                              "type": "string",
                              "example": "CREATE"
                            }
                          }
                        },
                        "criteriaStatus": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "string",
                              "example": "VERIFICATION_IN_PROGRESS"
                            }
                          }
                        },
                        "bulkJobStatus": {
                          "type": "string",
                          "example": "OPEN"
                        },
                        "auditInfo": {
                          "type": "object",
                          "properties": {
                            "createdOn": {
                              "type": "string",
                              "example": "2025-02-27T16:22:01.911+00:00"
                            },
                            "createdBy": {
                              "type": "integer",
                              "example": 75155282,
                              "default": 0
                            },
                            "lastUpdatedOn": {
                              "type": "string",
                              "example": "2025-02-27T16:22:01.911+00:00"
                            },
                            "lastUpdatedBy": {
                              "type": "integer",
                              "example": 75155282,
                              "default": 0
                            }
                          }
                        }
                      }
                    },
                    "errors": {
                      "type": "array"
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
              "code": "curl --location 'https://eu.api.capillarytech.com/api_gateway/cortex/v1/criteria' \\\n--header 'X-CAP-API-AUTH-ORG-ID: 100737' \\\n--header 'Content-Type: application/json' \\\n--header 'Authorization: Basic bmVlcmFqLmpiNGFmODA0MDA5Y2IwMzZhNGNjZGMzMzQzMWVmOWFjOQ==' \\\n--header 'Cookie: _cfuvid=d6B6HLH6oGwJZ21oIncVwhv3KVFCQL1tV0M8y1Bz2L8-1740672713496-0.0.1.1-604800000' \\\n--data '{\n    \"name\": \"TransactionSearch3\",\n    \"entityType\": \"TRANSACTION\",\n    \"searchStrategyType\": \"COMBINATION\",\n    \"fieldDefinitions\": [\n        {\n            \"fieldId\": \"billNumber\",\n            \"fieldAlias\": \"billNumber\",\n            \"fieldType\": \"INDEXED\",\n            \"dataSourceDetails\": {\n                \"fieldReference\": \"billNumber\"\n            },\n            \"dataType\": \"STRING\"\n        }\n        \n    ],\n    \"searchDataPolicy\": {\n        \"dataRetentionPolicy\": {\n            \"unit\": \"DAYS\",\n            \"value\": 10\n        },\n        \"expireDataFrom\": \"CREATE\"\n    }\n}'",
              "name": "Transaction Search Criteria"
            },
            {
              "language": "curl",
              "code": "curl --location 'https://eu.api.capillarytech.com/api_gateway/cortex/v1/criteria' \\\n--header 'X-CAP-API-AUTH-ORG-ID: 100737' \\\n--header 'Content-Type: application/json' \\\n--header 'Authorization: Basic bmVlcmFqLmRvYzFmODA0MDA5Y2IwMzZhNGNjZGMzMzQzMWVmOWFjOQ==' \\\n--header 'Cookie: _cfuvid=XfPD1k6yhtSKjydb78p1yRVTyPer7G3A10DLFGZS3Dc-1741063927669-0.0.1.1-604800000' \\\n--data '{\n    \"name\": \"CustomerSearch5\",\n    \"entityType\": \"CUSTOMER\",\n    \"searchStrategyType\": \"PREFIX\",\n    \"fieldDefinitions\": [\n        {\n            \"fieldId\": \"firstName\",\n            \"fieldAlias\": \"firstName\",\n            \"fieldType\": \"INDEXED\",\n            \"dataSourceDetails\": {\n                \"fieldReference\": \"firstName\"\n            },\n            \"dataType\": \"STRING\"\n        },\n {\n            \"fieldId\": \"lastName\",\n            \"fieldAlias\": \"lastName\",\n            \"fieldType\": \"INDEXED\",\n            \"dataSourceDetails\": {\n                \"fieldReference\": \"lastName\"\n            },\n            \"dataType\": \"STRING\"\n        },\n        \n{\n            \"fieldId\": \"mobile\",\n            \"fieldAlias\": \"mobile\",\n            \"fieldType\": \"INDEXED\",\n            \"dataSourceDetails\": {\n                \"fieldReference\": \"mobile\"\n            },\n            \"dataType\": \"STRING\"\n        }\n        \n    ],\n    \"searchDataPolicy\": {\n        \"dataRetentionPolicy\": {\n            \"unit\": \"DAYS\",\n            \"value\": 180\n        },\n        \"expireDataFrom\": \"CREATE\"\n    }\n}'",
              "name": "Customer Search Criteria"
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