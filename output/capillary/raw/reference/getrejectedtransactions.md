---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# getRejectedTransactions

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "organization-2",
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
    "/rejectedTransactions": {
      "get": {
        "summary": "getRejectedTransactions",
        "description": "",
        "operationId": "getrejectedtransactions",
        "parameters": [
          {
            "name": "errorCode",
            "in": "query",
            "description": "transactions errorCode filters. e.g 683 / 684 etc",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "errorValue",
            "in": "query",
            "description": "transactions errorValue filters. e.g how many txns got failed bec of sku value",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "isTransactionPayloadRequired",
            "in": "query",
            "description": "is txn payload string required in response.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "rejected transaction current status filter, Default ALL means get all with partially fixed and open status.",
            "schema": {
              "type": "string",
              "enum": [
                "OPEN",
                "FIXED",
                "PARTIAL_FIXED",
                "PERMANENT_FAILED",
                "SUCCESS",
                "REPLAYED",
                "MAX_OUT"
              ]
            }
          },
          {
            "name": "userId",
            "in": "query",
            "description": "all transactions of single userId",
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          },
          {
            "name": "transactionNumber",
            "in": "query",
            "description": "one single transaction number which was rejected",
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          },
          {
            "name": "startDate",
            "in": "query",
            "description": "date in format yyyy-MM-dd, by default last 30 days data",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "description": "date in format yyyy-MM-dd, by default last 30 days data",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "sortBy",
            "in": "query",
            "description": "sort by field. By default sortBy addedDate asc limit 10. Supported values: \"addedDate\"",
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
                    "value": "{\n    \"pagination\": {\n        \"limit\": 10,\n        \"offset\": 0,\n        \"total\": 7\n    },\n    \"data\": [\n        {\n            \"userId\": 381582455,\n            \"entityId\": 50672045,\n            \"orgId\": 51174,\n            \"retryCount\": 0,\n            \"billNumber\": \"1684130582\",\n            \"eventDate\": \"2023-05-15T11:33:02+05:30\",\n            \"autoUpdateTime\": \"2023-05-15T11:33:02+05:30\",\n            \"status\": \"OPEN\",\n            \"errors\": [\n                {\n                    \"message\": \"invalid item code: sku_prk123457111111111\",\n                    \"value\": \"sku_prk123457111111111\",\n                    \"code\": 683,\n                    \"status\": false,\n                    \"referenceId\": 50671643\n                }\n            ]\n        },\n        {\n            \"userId\": 381805963,\n            \"entityId\": 50672045,\n            \"orgId\": 51174,\n            \"retryCount\": 0,\n            \"billNumber\": \"1684130611\",\n            \"eventDate\": \"2023-05-15T11:33:32+05:30\",\n            \"autoUpdateTime\": \"2023-05-15T11:33:32+05:30\",\n            \"status\": \"OPEN\",\n            \"errors\": [\n                {\n                    \"message\": \"invalid payment mode:Card Payment\",\n                    \"value\": \"Card Payment\",\n                    \"code\": 842,\n                    \"status\": false,\n                    \"referenceId\": -1\n                }\n            ]\n        },\n        {\n            \"userId\": 381582455,\n            \"entityId\": 50672045,\n            \"orgId\": 51174,\n            \"retryCount\": 0,\n            \"billNumber\": \"1684131085\",\n            \"eventDate\": \"2023-05-15T11:41:25+05:30\",\n            \"autoUpdateTime\": \"2023-05-15T11:41:25+05:30\",\n            \"status\": \"OPEN\",\n            \"errors\": [\n                {\n                    \"message\": \"invalid payment mode:Card Payment\",\n                    \"value\": \"Card Payment\",\n                    \"code\": 842,\n                    \"status\": false,\n                    \"referenceId\": -1\n                }\n            ]\n        },\n        {\n            \"userId\": 381612161,\n            \"entityId\": 50672045,\n            \"orgId\": 51174,\n            \"retryCount\": 0,\n            \"billNumber\": \"1684131108\",\n            \"eventDate\": \"2023-05-15T11:41:49+05:30\",\n            \"autoUpdateTime\": \"2023-05-15T11:41:49+05:30\",\n            \"status\": \"OPEN\",\n            \"errors\": [\n                {\n                    \"message\": \"invalid payment mode:Card\",\n                    \"value\": \"Card\",\n                    \"code\": 842,\n                    \"status\": false,\n                    \"referenceId\": -1\n                }\n            ]\n        },\n        {\n            \"userId\": 381612161,\n            \"entityId\": 50672045,\n            \"orgId\": 51174,\n            \"retryCount\": 0,\n            \"billNumber\": \"1684131117\",\n            \"eventDate\": \"2023-05-15T11:41:58+05:30\",\n            \"autoUpdateTime\": \"2023-05-15T11:41:58+05:30\",\n            \"status\": \"OPEN\",\n            \"errors\": [\n                {\n                    \"message\": \"invalid payment mode:Card123\",\n                    \"value\": \"Card123\",\n                    \"code\": 842,\n                    \"status\": false,\n                    \"referenceId\": -1\n                }\n            ]\n        },\n        {\n            \"userId\": 381612161,\n            \"entityId\": 50672045,\n            \"orgId\": 51174,\n            \"retryCount\": 0,\n            \"billNumber\": \"1684131125\",\n            \"eventDate\": \"2023-05-15T11:42:05+05:30\",\n            \"autoUpdateTime\": \"2023-05-15T11:42:05+05:30\",\n            \"status\": \"OPEN\",\n            \"errors\": [\n                {\n                    \"message\": \"invalid payment mode:Card12345\",\n                    \"value\": \"Card12345\",\n                    \"code\": 842,\n                    \"status\": false,\n                    \"referenceId\": -1\n                }\n            ]\n        },\n        {\n            \"userId\": 381805979,\n            \"entityId\": 50672045,\n            \"orgId\": 51174,\n            \"retryCount\": 0,\n            \"billNumber\": \"1684131298\",\n            \"eventDate\": \"2023-05-15T11:44:58+05:30\",\n            \"autoUpdateTime\": \"2023-05-15T11:44:58+05:30\",\n            \"status\": \"OPEN\",\n            \"errors\": [\n                {\n                    \"message\": \"invalid item code: sku_prk123459\",\n                    \"value\": \"sku_prk123459\",\n                    \"code\": 683,\n                    \"status\": false,\n                    \"referenceId\": 50671643\n                }\n            ]\n        }\n    ],\n    \"warnings\": [],\n    \"errors\": []\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "pagination": {
                      "type": "object",
                      "properties": {
                        "limit": {
                          "type": "integer",
                          "example": 10,
                          "default": 0
                        },
                        "offset": {
                          "type": "integer",
                          "example": 0,
                          "default": 0
                        },
                        "total": {
                          "type": "integer",
                          "example": 7,
                          "default": 0
                        }
                      }
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "userId": {
                            "type": "integer",
                            "example": 381582455,
                            "default": 0
                          },
                          "entityId": {
                            "type": "integer",
                            "example": 50672045,
                            "default": 0
                          },
                          "orgId": {
                            "type": "integer",
                            "example": 51174,
                            "default": 0
                          },
                          "retryCount": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "billNumber": {
                            "type": "string",
                            "example": "1684130582"
                          },
                          "eventDate": {
                            "type": "string",
                            "example": "2023-05-15T11:33:02+05:30"
                          },
                          "autoUpdateTime": {
                            "type": "string",
                            "example": "2023-05-15T11:33:02+05:30"
                          },
                          "status": {
                            "type": "string",
                            "example": "OPEN"
                          },
                          "errors": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "message": {
                                  "type": "string",
                                  "example": "invalid item code: sku_prk123457111111111"
                                },
                                "value": {
                                  "type": "string",
                                  "example": "sku_prk123457111111111"
                                },
                                "code": {
                                  "type": "integer",
                                  "example": 683,
                                  "default": 0
                                },
                                "status": {
                                  "type": "boolean",
                                  "example": false,
                                  "default": true
                                },
                                "referenceId": {
                                  "type": "integer",
                                  "example": 50671643,
                                  "default": 0
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "warnings": {
                      "type": "array"
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
        "deprecated": false
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