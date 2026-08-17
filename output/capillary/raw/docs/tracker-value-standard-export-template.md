---
updatedAt: 2026-03-04T06:05:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Tracker Value Standard Export Template

The Tracker Value template is based on the **Points** fact.

It lets you export tracker values generated through the Loyalty Engine to update slabs.

* Provides tracker values at the bill or line-item level.
* Includes all tracker bills within the specified duration, regardless of slab status.
* Exports are by entry, not cumulative.

**Limitations**

* You cannot export the current tracker value.

To know more about trackers and configurations, see [Trackers](https://docs.capillarytech.com/docs/offer-conditions)

## Measures

| Measure               | Description                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| Allocated Points      | Number of points allocated.                                                                          |
| Auto Update Time PA   | Date and time when the Points Awarded table is recently updated (Unix timestamp).                    |
| Auto Update Time PABP | Date and time when the Points Awarded Bill Promotion table is recently updated (Unix timestamp).     |
| Auto Update Time PACP | Date and time when the Points Awarded Customer Promotion table is recently updated (Unix timestamp). |
| Auto Update Time PAL  | Date and time when the Points Awarded Lineitem table is recently updated (Unix timestamp).           |
| Auto Update Time PALP | Date and time when the Points Awarded Lineitem Promotion table is recently updated (Unix timestamp). |
| Auto Update Time PD   | Date and time when the Points Deductions table is recently updated (Unix timestamp).                 |
| Awarded Ref Id        | The reference id of the source from where the points are awarded.                                    |
| Bill Id               | Loyalty log id or bill id for which the points are awarded or redeemed.                              |
| Bill Number           | Bill number for which the points are awarded or redeemed.                                            |
| Event Id              | Unique id of each event entry of the corresponding table.                                            |
| Deducted Points       | Number of redeemed, returned or expired points.                                                      |

## Dimensions

latest\_updated\_date, latest\_updated\_time, awarded\_date, awarded\_expiry\_date,awarded\_points\_promotion, awarded\_zone\_till, category, deduction\_type, Date, Time, User, User Segments,Store Hierarchy, Concept Hierarchy, expiry\_date, expiry\_time, points\_awarded\_type, points\_event\_type,points\_promotion