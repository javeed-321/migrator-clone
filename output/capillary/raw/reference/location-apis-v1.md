---
updatedAt: 2026-06-29T09:23:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Location APIs (v1)

The store entity holds information about all stores configured for an organization. This entity contain APIs to manage and fetch store details such   as retrieve store information, upload log files to the server, get store report, and fetch store tasks. Store details and configurations cannot be  updated using store APIs.

## Status Codes

### Success Codes

| Code | Description                          |
| ---- | ------------------------------------ |
| 900  | Store details retrieved successfully |
| 900  | Report uploaded successfully         |
| 900  | Store report retrieved successfully  |
| 910  | Tasks retrieved successfully         |

### Error Codes

| Code | Description                                                                |
| ---- | -------------------------------------------------------------------------- |
| 901  | Store information retrieval failed                                         |
| 902  | Store identifier is invalid                                                |
| 903  | Unable to fetch store details. No store id is passed                       |
| 904  | Client log file size does not match with the file size uploaded on server  |
| 905  | Client log file signature does not match with the file signature on server |
| 906  | Uploading client log file to file service failed.                          |
| 907  | Insert client log file metadata in database failed                         |
| 908  | Tasks retrieval failed                                                     |
| 909  | No tasks found                                                             |
| 911  | Report type is invalid                                                     |
| 912  | Report upload failed                                                       |
| 913  | Unable to fetch store details. No identifier is passed                     |
| 921  | Unable to insert one or more store server stats                            |
| 922  | Unable to insert the entire store server stats                             |
| 923  | Unable to insert one or more till diagnostic details                       |
| 924  | Unable to insert all till diagnostics details                              |