---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Success and error codes

This page provides you with information on success and error codes associated with OTP API.

# Success Code

| Code | Description                    |
| ---- | ------------------------------ |
| 610  | OTP is validated successfully. |

# Error Codes

| Code | Description                                                                                                                                                                                                                                                                                                                                      |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 429  | Rate limit exceeded. OTP generation is limited per mobile number based on your organization's configuration. The maximum number of OTPs allowed (otpMaxCount) and the time window in minutes (otpTimeOut) are set at the organization level. If these values are not set, there is no rate limit, and OTPs can be generated without restriction. |
| 600  | Invalid or null `action` passed.                                                                                                                                                                                                                                                                                                                 |
| 601  | Invalid or null `entity_type` passed.                                                                                                                                                                                                                                                                                                            |
| 602  | Invalid or null `entity_value` passed.                                                                                                                                                                                                                                                                                                           |
| 603  | Invalid or null `communication channel` value passed.                                                                                                                                                                                                                                                                                            |
| 604  | No OTP passed.                                                                                                                                                                                                                                                                                                                                   |
| 605  | OTP is either invalid, expired, or null.                                                                                                                                                                                                                                                                                                         |
| 606  | Unable to generate OTP at the moment.                                                                                                                                                                                                                                                                                                            |
| 874  | Unable to generate validation code (OTP).                                                                                                                                                                                                                                                                                                        |
| 875  | Unable to generate validation code (OTP).                                                                                                                                                                                                                                                                                                        |
| 876  | OTP Validation Failed                                                                                                                                                                                                                                                                                                                            |
| 9001 | No valid  OTP found.                                                                                                                                                                                                                                                                                                                             |