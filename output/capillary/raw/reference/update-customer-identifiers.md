---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

### Request Body Parameters

> \[!NOTE]
> When CONF\_IDENTIFIERS\_SYNC\_ENABLED is enabled and you update a mobile number, the system checks if the new number already exists in another profile. If it does, the update fails and the external system is not updated. You will receive an error response indicating that the mobile number is already in use.

| Parameter    | Datatype | Description                                                                                                                                   |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| identifier\* | enum     | Pass the identifier name that you want to update. Value: `mobile`, `email`, `external_id`.                                                    |
| old\_value\* | string   | Provide the existing value the identifier that you want to update. **Note:** For mobile numbers, add the mobile number with the country code. |
| new\_value\* | string   | Provide the new value of the identifier.                                                                                                      |

<aside class="notice">Parameters marked with * are mandatory.</aside>

### Response Parameters

| Parameter    | Datatype | Description                                                   |
| ------------ | -------- | ------------------------------------------------------------- |
| identifier\* | enum     | Name of the identifier.                                       |
| old\_value\* | string   | Earlier value of the identifier.                              |
| new\_value\* | string   | New identifier value.                                         |
| updated      | boolean  | Returns `true` if the the identifier is updated successfully. |