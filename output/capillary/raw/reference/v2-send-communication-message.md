---
updatedAt: 2026-03-25T05:31:19.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Send communication message

This API allows you to send communication message using SMS/WhatsApp/Zalo or Email as a communication channel. You can use it to send messages to a single customer or to multiple customers in bulk.  

> 👍 Note
>
> For detailed information about our APIs and for hands-on testing, refer documentation in [API overview](https://docs.capillarytech.com/reference/apioverview) and  step-by-step guide on making your first API call in [Make your first API call](https://docs.capillarytech.com/reference/make-your-first-api-call) .

# Example request

```curl Sample request for Single email
curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=email' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic *******' \
--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \
--data-raw '{
	"email": [
        {
            "to": "tomswayer@capillarytech.com",
            "cc": "tomswayer21@capillarytech.com",
            "bcc": "",
            "from": "rewards@rallyengage.com",
            "subject": "Request to Void Check: <Reward Transaction ID>",
            "body": ""
        }
	]
}'
```
```curl Sample request for Bulk email
curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=email' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic *******' \
--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \
--data-raw '{
	"email": [
        {
            "to": "tomswayer@capillarytech.com",
           // "cc": "tomswayer21@capillarytech.com",
            "bcc": "",
            "from": "rewards@rallyengage.com",
            "subject": "Request to Void Check: <Reward Transaction ID>",
            "body": ""
        },
        {
            "to": "tomswayer09@capillarytech.com",
            //"cc": "tomswayer21@capillarytech.com",
            "bcc": "",
            "from": "rewards@rallyengage.com",
            "subject": "Request to Void Check: <Reward Transaction ID>",
            "body": ""
        }
	]
}'
```
```curl Sample request for Single sms
curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=sms' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ********' \
--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \
--data '{
    "sms": [
      {
        "to": "919777785302",
        "body": "Hi :smile: (😊 )wish you a happy wedding anniversary!?",
        "scheduledTime": "2025-06-14T18:55:0Z",  
        "sender": "7381814046"
      }
    ]
}'
```
```curl Sample request for Bulk sms
curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=sms' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic *******' \
--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \
--data '{
    "sms": [
      {
        "to": "918866775544",
        "body": "Hi :smile: (😊 )wish you a happy wedding anniversary!?",
        //"scheduledTime": "2025-11-05T12:10:0Z",  
        "sender": "7381814046"
      },
      {
        "to": "914455776688",
        "body": "Hi :smile: (😊 )wish you a happy wedding anniversary!?",
        //"scheduledTime": "2025-06-14T18:55:0Z",  
        "sender": "7381814046"
      }
    ]
}'
```
```curl Sample request for Single whatsapp
curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=whatsapp' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ********' \
--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \
--data ' {
    "whatsappMessage": [
      {
        "receiver": "919988221100",
        "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA",
        "scheduledTime": "2024-02-22T00:25:06+05:30"
      }
    ]
  }'
```
```curl Sample request for Bulk whatsapp
curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=whatsapp' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ********' \
--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \
--data ' {
    "whatsappMessage": [
      {
        "receiver": "918899776655",
        "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA"
        
      },
      {
        "receiver": "919988221100",
        "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA"
        
      }
    ]
  }'
```
```curl Sample request for Zalo
curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=zalo' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ********' \
--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \
--data ' {
    "zaloMessage": [
      {
        "receiver": "919988221100",
        "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA",
        "scheduledTime": "2024-02-22T00:25:06+05:30"
      }
    ]
  }
'
```

# Prerequisites

* [ ] Authentication: Basic or OAuth authentication details
* [ ] Access group resource: WRITE access to Communication access group resource

# Resource information

|             |                                                 |
| :---------- | :---------------------------------------------- |
| URI         | `/communications/sendMessage?channel={channel}` |
| HTTP method | POST                                            |

# Path parameter

| Parameter | Datatype | Description                                                                                                                              |
| :-------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| channel   | Enum     | The communication channel. The supported values are sms, whatsapp, email and zalo. The values are not case-sensitive. Default value-sms. |

# Request Body Parameters (SMS)

| Parameter     | Datatype  | Description                                                                                                                                                                                                                                                        |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sms\*         | array-obj | Details of the SMS to send. Pass each SMS in a separate object.                                                                                                                                                                                                    |
| to\*          | string    | Mobile number of the recipient.                                                                                                                                                                                                                                    |
| body\*        | string    | Message content to be sent.                                                                                                                                                                                                                                        |
| scheduledTime | date-time | Date and time of sending in ISO standard format.                                                                                                                                                                                                                   |
| sender        | string    | Sender ID from which the message has to go (sender IDs configured for the respective OU). If not passed, the default sender ID of the org is considered. Refer [here](https://docs.capillarytech.com/docs/configure-sms-settings#/) for configuring the sender ID. |

# Request body (Email)

| Parameter            | Datatype  | Description                                                                                                                                                                                                                    |
| -------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| email\*              | array-obj | Complete details of the email to send.                                                                                                                                                                                         |
| to\*                 | string    | Recipient's email ID.                                                                                                                                                                                                          |
| cc                   | string    | Email ID to be included in CC                                                                                                                                                                                                  |
| bcc                  | string    | Email IDs to included in BCC.                                                                                                                                                                                                  |
| from\*               | string    | Email ID of the sender.                                                                                                                                                                                                        |
| subject\*            | string    | Subject of the email.                                                                                                                                                                                                          |
| body\*               | string    | Body of the email.                                                                                                                                                                                                             |
| attachments          | obj       | Details of the attachment used in the email.                                                                                                                                                                                   |
| attachment           | array-obj | Details of each attachment in email.                                                                                                                                                                                           |
| file\_name           | string    | Name of the attached file.                                                                                                                                                                                                     |
| file\_type           | string    | Type of the file (file format).                                                                                                                                                                                                |
| file\_data           | string    | Encoded data of the attachment.                                                                                                                                                                                                |
| file\_encoding\_type | string    | Encoding type of the attachment provided in fileData. Required for all base64 encoded image formats such as JPG, PNG, JPEG, and GIF. This is not required for other file types like TXT, and PDF which are not base64 encoded. |
| scheduledTime        | date-time | ISO standard date and time of scheduling the email.                                                                                                                                                                            |

# Request body (WhatsApp)

| Parameter         | Datatype  | Description                                                                               |
| ----------------- | --------- | ----------------------------------------------------------------------------------------- |
| whatsappMessage\* | array-obj | Details of the WhatsApp message to send. Pass each WhatsApp message in a separate object. |
| receiver\*        | string    | Mobile number of the recipient.                                                           |
| template\*        | string    | Message content to be sent. This is the content that will be communicated to the user.    |
| scheduledTime     | date-time | ISO standard date and time of scheduling the message.                                     |

# Request body (Zalo)

| Parameter     | Datatype  | Description                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------------- |
| zaloMessage\* | array-obj | Details of the Zalo message to send. Pass each Zalo message in a separate object.      |
| receiver\*    | string    | Mobile number of the recipient.                                                        |
| template\*    | string    | Message content to be sent. This is the content that will be communicated to the user. |
| scheduledTime | date-time | ISO standard date and time of scheduling the message.                                  |

# Example response

```json Sample response for Single sms
{
    "status": {
        "count": 1,
        "statusCode": {
            "status": true,
            "code": 200,
            "message": "Success"
        },
        "successCount": 1,
        "warnings": [],
        "warningsAsStatusCode": [],
        "code": 200,
        "success": true,
        "message": "Success"
    },
    "smsList": [
        {
            "sms": {
                "to": "919777785302",
                "body": "Hi :smile: (😊 )wish you a happy wedding anniversary!?",
                "scheduledTime": "2025-06-14T18:55:00Z",
                "sender": "7381814046"
            },
            "errors": [],
            "warnings": []
        }
    ]
}
```
```json Sample response for Bulk sms
{
    "status": {
        "count": 2,
        "statusCode": {
            "status": true,
            "message": "Success",
            "code": 200
        },
        "successCount": 2,
        "warnings": [],
        "warningsAsStatusCode": [],
        "message": "Success",
        "code": 200,
        "success": true
    },
    "smsList": [
        {
            "sms": {
                "to": "918866775544",
                "body": "Hi :smile: (😊 )wish you a happy wedding anniversary!?",
                "scheduledTime": "2025-11-05T06:38:37Z",
                "sender": "7381814046"
            },
            "errors": [],
            "warnings": []
        },
        {
            "sms": {
                "to": "914455776688",
                "body": "Hi :smile: (😊 )wish you a happy wedding anniversary!?",
                "scheduledTime": "2025-11-05T06:38:37Z",
                "sender": "7381814046"
            },
            "errors": [],
            "warnings": []
        }
    ]
}
```
```json Sample response for Single email
{
    "status": {
        "count": 1,
        "statusCode": {
            "status": true,
            "code": 200,
            "message": "Success"
        },
        "successCount": 1,
        "warnings": [],
        "warningsAsStatusCode": [],
        "code": 200,
        "success": true,
        "message": "Success"
    },
    "emails": [
        {
            "email": {
                "to": "tomswayer@capillarytech.com",
                "body": "",
                "scheduledTime": "2025-09-26T14:21:07Z",
                "cc": "tomswayer21@capillarytech.com",
                "bcc": "",
                "from": "rewards@rallyengage.com",
                "subject": "Request to Void Check: <Reward Transaction ID>",
                "fileHandler": [],
                "attachments": []
            },
            "errors": [],
            "warnings": []
        }
    ]
}
```
```json Sample response for Bulk email
{
    "status": {
        "count": 2,
        "statusCode": {
            "status": true,
            "message": "Success",
            "code": 200
        },
        "successCount": 2,
        "warnings": [],
        "warningsAsStatusCode": [],
        "message": "Success",
        "code": 200,
        "success": true
    },
    "emails": [
        {
            "email": {
                "to": "tomswayer@capillarytech.com",
                "body": "",
                "scheduledTime": "2025-11-05T06:25:21Z",
                "bcc": "",
                "from": "rewards@rallyengage.com",
                "subject": "Request to Void Check: <Reward Transaction ID>",
                "fileHandler": [],
                "attachments": []
            },
            "errors": [],
            "warnings": []
        },
        {
            "email": {
                "to": "tomswayer09@capillarytech.com",
                "body": "",
                "scheduledTime": "2025-11-05T06:25:21Z",
                "bcc": "",
                "from": "rewards@rallyengage.com",
                "subject": "Request to Void Check: <Reward Transaction ID>",
                "fileHandler": [],
                "attachments": []
            },
            "errors": [],
            "warnings": []
        }
    ]
}
```
```json Sample response for Single whatsapp
{
    "status": {
        "count": 1,
        "statusCode": {
            "status": true,
            "code": 200,
            "message": "Success"
        },
        "successCount": 1,
        "warnings": [],
        "warningsAsStatusCode": [],
        "code": 200,
        "success": true,
        "message": "Success"
    },
    "whatsapp": [
        {
            "whatsappMessage": {
                "scheduledTime": "2024-02-21T18:55:06Z",
                "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA",
                "receiver": "919988221100"
            },
            "errors": [],
            "warnings": []
        }
    ]
}
```
```json Sample response for Bulk whatsapp
{
    "status": {
        "count": 2,
        "statusCode": {
            "status": true,
            "code": 200,
            "message": "Success"
        },
        "successCount": 2,
        "warnings": [],
        "warningsAsStatusCode": [],
        "code": 200,
        "success": true,
        "message": "Success"
    },
    "whatsapp": [
        {
            "whatsappMessage": {
                "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA",
                "receiver": "918899776655"
            },
            "errors": [],
            "warnings": []
        },
        {
            "whatsappMessage": {
                "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA",
                "receiver": "919988221100"
            },
            "errors": [],
            "warnings": []
        }
    ]
}
```
```json Sample response for Zalo
{
    "status": {
        "count": 1,
        "statusCode": {
            "status": true,
            "code": 200,
            "message": "Success"
        },
        "successCount": 1,
        "warnings": [],
        "warningsAsStatusCode": [],
        "code": 200,
        "success": true,
        "message": "Success"
    },
    "zalo": [
        {
            "zaloMessage": {
                "scheduledTime": "2024-02-21T18:55:06Z",
                "receiver": "919988221100",
                "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA"
            },
            "errors": [],
            "warnings": []
        }
    ]
}
```

# Error code

| Error code | Description                                                                            |
| :--------- | :------------------------------------------------------------------------------------- |
| 4203       | Indicates that either the recipient’s mobile number or the SMS message body is missing |
| 8055       | Invalid email ID                                                                       |
| 4201       | Indicates the email is missing a subject                                               |
| 403        | Indicates that the receiver is missing from the request for the WhatsApp channel.      |

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
    "/communications/sendMessage?channel={channel}": {
      "post": {
        "summary": "Send communication message",
        "description": "This API allows you to send communication message using SMS/WhatsApp/Zalo or Email as a communication channel.",
        "operationId": "v2-send-communication-message",
        "parameters": [
          {
            "name": "format",
            "in": "query",
            "schema": {
              "type": "string",
              "enum": [
                "xml",
                "json"
              ]
            }
          },
          {
            "name": "channel",
            "in": "path",
            "description": "sms, email, whatsapp, zalo",
            "schema": {
              "type": "string",
              "enum": [
                ""
              ]
            },
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "RAW_BODY": {
                    "type": "string",
                    "format": "json"
                  }
                }
              },
              "examples": {
                "sms": {
                  "value": {
                    "root": {
                      "sms": [
                        {
                          "to": "447700900000",
                          "body": "Hi, wish you a happy wedding anniversary!",
                          "scheduled_time": "2012-08-05 22:00:00IST",
                          "sender": "918000000000"
                        }
                      ]
                    }
                  }
                },
                "whatsapp": {
                  "value": {
                    "root": {
                      "whatsappMessage": [
                        {
                          "receiver": "919591471711",
                          "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA",
                          "scheduledTime": "2024-02-22T00:25:06+05:30"
                        }
                      ]
                    }
                  }
                },
                "zalo": {
                  "value": {
                    "root": {
                      "zaloMessage": [
                        {
                          "receiver": "919591471711",
                          "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA",
                          "scheduledTime": "2024-02-22T00:25:06+05:30"
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
                  "sms": {
                    "value": {
                      "status": {
                        "count": 1,
                        "statusCode": {
                          "status": true,
                          "code": 200,
                          "message": "Success"
                        },
                        "successCount": 1,
                        "warnings": [],
                        "warningsAsStatusCode": [],
                        "code": 200,
                        "success": true,
                        "message": "Success"
                      },
                      "smsList": [
                        {
                          "sms": {
                            "to": "919777785302",
                            "body": "Hi :smile: (😊 )wish you a happy wedding anniversary!?",
                            "scheduledTime": "2025-06-14T18:55:00Z",
                            "sender": "7381814046"
                          },
                          "errors": [],
                          "warnings": []
                        }
                      ]
                    }
                  },
                  "email": {
                    "value": {
                      "status": {
                        "count": 1,
                        "statusCode": {
                          "status": true,
                          "code": 200,
                          "message": "Success"
                        },
                        "successCount": 1,
                        "warnings": [],
                        "warningsAsStatusCode": [],
                        "code": 200,
                        "success": true,
                        "message": "Success"
                      },
                      "emails": [
                        {
                          "email": {
                            "to": "tomswayer@capillarytech.com",
                            "body": "",
                            "scheduledTime": "2025-09-26T14:21:07Z",
                            "cc": "tomswayer21@capillarytech.com",
                            "bcc": "",
                            "from": "rewards@rallyengage.com",
                            "subject": "Request to Void Check: <Reward Transaction ID>",
                            "fileHandler": [],
                            "attachments": []
                          },
                          "errors": [],
                          "warnings": []
                        }
                      ]
                    }
                  },
                  "whatsapp": {
                    "value": ""
                  },
                  "zalo": {
                    "value": {
                      "status": {
                        "count": 1,
                        "statusCode": {
                          "status": true,
                          "code": 200,
                          "message": "Success"
                        },
                        "successCount": 1,
                        "warnings": [],
                        "warningsAsStatusCode": [],
                        "code": 200,
                        "success": true,
                        "message": "Success"
                      },
                      "zalo": [
                        {
                          "zaloMessage": {
                            "scheduledTime": "2024-02-21T18:55:06Z",
                            "receiver": "919988221100",
                            "template": "747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA"
                          },
                          "errors": [],
                          "warnings": []
                        }
                      ]
                    }
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "title": "sms",
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
                                  "type": "string",
                                  "example": "200"
                                },
                                "message": {
                                  "type": "string",
                                  "example": "success"
                                }
                              }
                            },
                            "sms": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "example": "23423443"
                                },
                                "to": {
                                  "type": "string",
                                  "example": "447700900000"
                                },
                                "status": {
                                  "type": "string",
                                  "example": "Sent"
                                },
                                "scheduled_time": {
                                  "type": "string",
                                  "example": "2012-08-05 22:00:00IST"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "email",
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "object",
                          "properties": {
                            "count": {
                              "type": "integer",
                              "example": 1,
                              "default": 0
                            },
                            "statusCode": {
                              "type": "object",
                              "properties": {
                                "status": {
                                  "type": "boolean",
                                  "example": true,
                                  "default": true
                                },
                                "code": {
                                  "type": "integer",
                                  "example": 200,
                                  "default": 0
                                },
                                "message": {
                                  "type": "string",
                                  "example": "Success"
                                }
                              }
                            },
                            "successCount": {
                              "type": "integer",
                              "example": 1,
                              "default": 0
                            },
                            "warnings": {
                              "type": "array"
                            },
                            "warningsAsStatusCode": {
                              "type": "array"
                            },
                            "code": {
                              "type": "integer",
                              "example": 200,
                              "default": 0
                            },
                            "success": {
                              "type": "boolean",
                              "example": true,
                              "default": true
                            },
                            "message": {
                              "type": "string",
                              "example": "Success"
                            }
                          }
                        },
                        "emails": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "email": {
                                "type": "object",
                                "properties": {
                                  "to": {
                                    "type": "string",
                                    "example": "tom.swayer@capillarytech.com"
                                  },
                                  "body": {
                                    "type": "string",
                                    "example": ""
                                  },
                                  "scheduledTime": {
                                    "type": "string",
                                    "example": "2024-12-20T03:53:14-05:00"
                                  },
                                  "cc": {
                                    "type": "string",
                                    "example": "dicaprio@capillarytech.com"
                                  },
                                  "bcc": {
                                    "type": "string",
                                    "example": ""
                                  },
                                  "from": {
                                    "type": "string",
                                    "example": "rewards@rallyengage.com"
                                  },
                                  "subject": {
                                    "type": "string",
                                    "example": "Request to Void Check: <Reward Transaction ID>"
                                  },
                                  "fileHandler": {
                                    "type": "array"
                                  },
                                  "attachments": {
                                    "type": "array"
                                  }
                                }
                              },
                              "errors": {
                                "type": "array"
                              },
                              "warnings": {
                                "type": "array"
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
          }
        },
        "deprecated": false,
        "x-readme": {
          "code-samples": [
            {
              "language": "curl",
              "code": "curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=email' \\\n--header 'Content-Type: application/json' \\\n--header 'Authorization: Basic *******' \\\n--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \\\n--data-raw '{\n\t\"email\": [\n        {\n            \"to\": \"tomswayer@capillarytech.com\",\n            \"cc\": \"tomswayer21@capillarytech.com\",\n            \"bcc\": \"\",\n            \"from\": \"rewards@rallyengage.com\",\n            \"subject\": \"Request to Void Check: <Reward Transaction ID>\",\n            \"body\": \"\"\n        }\n\t]\n}'",
              "name": "email"
            },
            {
              "code": "curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=sms' \\\n--header 'Content-Type: application/json' \\\n--header 'Authorization: Basic ********' \\\n--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \\\n--data '{\n    \"sms\": [\n      {\n        \"to\": \"919777785302\",\n        \"body\": \"Hi :smile: (😊 )wish you a happy wedding anniversary!?\",\n        \"scheduledTime\": \"2025-06-14T18:55:0Z\",  \n        \"sender\": \"7381814046\"\n      }\n    ]\n}'",
              "language": "shell",
              "name": "sms"
            },
            {
              "code": "curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=whatsapp' \\\n--header 'Content-Type: application/json' \\\n--header 'Authorization: Basic ********' \\\n--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \\\n--data ' {\n    \"whatsappMessage\": [\n      {\n        \"receiver\": \"919988221100\",\n        \"template\": \"747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA\",\n        \"scheduledTime\": \"2024-02-22T00:25:06+05:30\"\n      }\n    ]\n  }'",
              "language": "shell",
              "name": "whatsapp"
            },
            {
              "code": "curl --location 'https://eu.api.capillarytech.com/v2/communications/sendMessage?channel=zalo' \\\n--header 'Content-Type: application/json' \\\n--header 'Authorization: Basic ********' \\\n--header 'Cookie: _cfuvid=ALa0x4zd1i9salqIltaokSaDsHfKQ5LU7Vuat4AO6Es-1758894901926-0.0.1.1-604800000' \\\n--data ' {\n    \"zaloMessage\": [\n      {\n        \"receiver\": \"919988221100\",\n        \"template\": \"747977 is the OTP for Go+. Valid for 15 minutes. f1obOaOBiPA\",\n        \"scheduledTime\": \"2024-02-22T00:25:06+05:30\"\n      }\n    ]\n  }\n'",
              "language": "shell",
              "name": "zalo"
            }
          ],
          "samples-languages": [
            "curl",
            "shell"
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