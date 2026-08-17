---
updatedAt: 2026-03-04T06:05:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Supplementary Partner Program Fact Table

**Databricks Table Name:** supplementary\_partner\_programs

| Column Name                             | Data Type  | Description                                                                            | Linked Table(s)                                                                                                                    |
| :-------------------------------------- | :--------- | :------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **is\_tier\_based**                     | boolean    | Indicates whether the program is tier-based.                                           | [partner\_programs](https://docs.capillarytech.com/docs/dimension-tables#partner-programs-partner_programs)                        |
| **partner\_program\_name**              | string     | The name of the partner program.                                                       | [partner\_programs](\[partner_programs]\(https://docs.capillarytech.com/docs/dimension-tables#partner-programs-partner_programs\)) |
| **supplementary\_partner\_program\_id** | integer    | A unique identifier for a supplementary partner program.                               | -                                                                                                                                  |
| **points\_exchange\_ratio**             | bigdecimal | The ratio used to exchange points between the loyalty program and the partner program. | [partner\_programs](\[partner_programs]\(https://docs.capillarytech.com/docs/dimension-tables#partner-programs-partner_programs\)) |
| **description**                         | string     | A description of the program.                                                          | [partner\_programs](\[partner_programs]\(https://docs.capillarytech.com/docs/dimension-tables#partner-programs-partner_programs\)) |
| **partner\_program\_type**              | enum       | The type of the partner program.                                                       | [partner\_programs](\[partner_programs]\(https://docs.capillarytech.com/docs/dimension-tables#partner-programs-partner_programs\)) |
| **is\_active**                          | boolean    | Indicates whether the program is currently active.                                     | [partner\_programs](\[partner_programs]\(https://docs.capillarytech.com/docs/dimension-tables#partner-programs-partner_programs\)) |
| **auto\_update\_time**                  | bigint     | The Unix timestamp of the last update to the record in the source table.               | [time](https://docs.capillarytech.com/docs/dimension-tables#/time)                                                                 |
| **loyalty\_program\_id**                | int        | The ID of the loyalty program to which the partner program is linked.                  | [partner\_programs](\[partner_programs]\(https://docs.capillarytech.com/docs/dimension-tables#partner-programs-partner_programs\)) |
| **partner\_program\_identifier**        | string     | A unique identifier for the partner program, set by the brand.                         | [partner\_programs](\[partner_programs]\(https://docs.capillarytech.com/docs/dimension-tables#partner-programs-partner_programs\)) |

<br />