---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Error codes

This section lists the possible error codes and the action required.

| Code | Message                                                                                                           |
| ---- | ----------------------------------------------------------------------------------------------------------------- |
| 9001 | Request retrieve unsuccessful                                                                                     |
| 9006 | Request Type is invalid                                                                                           |
| 9008 | Request Base Type is invalid                                                                                      |
| 9009 | Request add failed due to internal error. Please try again later                                                  |
| 9014 | Insufficient request for updating the request                                                                     |
| 9016 | Date format should be yyyy-MM-dd                                                                                  |
| 9021 | Requested On date is in future                                                                                    |
| 9050 | Request not found                                                                                                 |
| 9051 | Same user cannot request and approve                                                                              |
| 9052 | Invalid request status                                                                                            |
| 1060 | Exceeded maximum limit size of 10                                                                                 |
| 400  | Input is invalid, Please check request parameters or input xml/json, No identifier provided to get loyalty users. |
| 1012 | Cannot find customer for provided mobile/external-id/e-mail/id                                                    |

## Gateway timeout errors

Some endpoints, including /rewards and {host}/api, enforce strict read timeouts. If a response takes longer than 20 seconds at the gateway or 30 seconds at downstream services, you receive a 504 Gateway Timeout error. This can affect redeem gift card and code creation operations.

**What to do:**

1. Try your request again after a short wait.
2. If the issue continues, check for possible delays in your request processing or network connectivity.
3. Contact support if you continue to receive timeout errors.