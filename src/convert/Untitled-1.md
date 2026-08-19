---
'0': H
'1': e
'2': l
'3': l
'4': o
---
| (Parameters marked with \* are mandatory) | Type    | Description                                                                                                                      |
| :---------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------- |
| active\*                                  | Boolean | Indicates if the webhook is active.                                                                                              |
| customerIdentifiersToBeEnriched\*         | Array   | List of customer identifiers to be enriched.                                                                                     |
| eventNames\*                              | Array   | • List of event names that trigger the webhook. • **Note**: At least one event name is required.                                 |
| maxAllowedConnections\*                   | Integer | Maximum connections allowed at the same time for this webhook.                                                                   |
| methodType\*                              | String  | HTTP method used by the webhook. **Example:** `POST`, `PUT`,` GET` or `DELETE`.                                                  |
| name\*                                    | String  | Name of the webhook **Note:** Name of the webhook should be unique.                                                              |
| slaInSeconds                              | Integer | Expected delivery time of the [event notification](https://docs.capillarytech.com/docs/configure_event_notification) in seconds. |
| webHookHeaders\*                          | Array   | Headers sent with the webhook request.                                                                                           |
| • Authorization                           | String  | Authorization header for authentication.                                                                                         |
| • Content-Type                            | String  | Specifies the content, **Example:** `application/json`                                                                           |
| webHookType\*                             | String  | Type of webhook, **Example:** `HTTP`                                                                                             |
| webHookUrl\*                              | String  | URL where the webhook sends its requests.                                                                                        |

