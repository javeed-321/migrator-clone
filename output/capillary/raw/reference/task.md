---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Task

Tasks could be any activity created by an associate for oneself or for other associate. The task entity allows you to create, update and map tasks and retrieve the details of tasks created in your organization.

## Status Codes

### Success Codes

| Code                                      | Description                  |
| ----------------------------------------- | ---------------------------- |
| 5200                                      | Tasks retrieved successfully |
| Tasks meta data retrieved successfully    |                              |
| Task added successfully                   |                              |
| Task updated successfully                 |                              |
| Task fetched successfully                 |                              |
| Task update log file fetched successfully |                              |
| Task reminder added successfully          |                              |
| Update log file retrieved successfully    |                              |
| Status mapping added successfully         |                              |

### Error Codes

| Code | Description                                                                 |
| ---- | --------------------------------------------------------------------------- |
| 5201 | Unable to fetch task details                                                |
| 5201 | Unable to fetch task meta data                                              |
| 5201 | Unable to add the task                                                      |
| 5021 | Unable to update the task                                                   |
| 5203 | No identifier passed                                                        |
| 5204 | Invalid or empty task identifier                                            |
| 5205 | One or more params you have passed are invalid. Please check the parameters |
| 5206 | Unable to add status mapping                                                |
| 5206 | Unable to add reminder                                                      |
| 5207 | Invalid status passed                                                       |
| 5208 | Task end date should be greater than the task start date                    |
| 5208 | Invalid internal status                                                     |
| 5209 | Task expiry date should be greater than the task end date                   |
| 5211 | No tasks found                                                              |
| 5212 | Invalid id the recipient (an associate) to whom the task is assigned        |
| 5212 | Customers are not registered in this organization                           |
| 5213 | One or more customers passed are not registered                             |
| 5213 | Invalid create by id                                                        |
| 5214 | Please pass the store id to update the task as an admin user                |