---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Organization (V2)

This entity consist of the list of APIs related to adding and fetching sources and accounts of the org.

## Status codes

## Org Entity

### Error Codes

| Code | Description                                        |
| ---- | -------------------------------------------------- |
| 3213 | Unable to find org source                          |
| 3214 | Unable to add org source                           |
| 3215 | No source types found                              |
| 3216 | Invalid source name                                |
| 3217 | Invalid account identifier of the source           |
| 3218 | Invalid source type                                |
| 3219 | Unable to update source. Invalid UUID              |
| 3220 | Org source already exists with the given values    |
| 3221 | Unable to update org source / Invalid org id       |
| 3222 | No configurations found for the provided source id |

## Organization Entity

| Code | Description                                 |
| ---- | ------------------------------------------- |
| 3200 | Custom fields fetch successful              |
| 3208 | Organization configuration fetch successful |

### Error Codes

| Code | Description                                                                  |
| ---- | ---------------------------------------------------------------------------- |
| 200  | Invalid value in entity 'id' parameter                                       |
| 500  | Organization entities could not be fetched                                   |
| 500  | Type is not passed, please send `type`                                       |
| 500  | Type is invalid. Please pass type STORE/STR\_SERVER/TILL/ZONE/CONCEPT        |
| 3209 | Organization config '\{x}' not set                                           |
| 3212 | Invalid value \{1} for organization config '\{0}'                            |
| 3214 | Organization get success                                                     |
| 3210 | Organization fetch failure                                                   |
| 3209 | Organization configurations not found                                        |
| 3211 | Organization configuration invalid scope                                     |
| 3229 | Organization configuration invalid value-type                                |
| 3200 | Entity search successful                                                     |
| 3202 | Entity with \{0} \{1} not found                                              |
| 3203 | Custom fields fetch failed                                                   |
| 3204 | Custom fields not found for given scope                                      |
| 3205 | Organization configuration addition successful                               |
| 3206 | Organization configuration addition failure, Config Key not found: \{0}      |
| 3212 | Organization configuration invalid value                                     |
| 3213 | Org source not found with \{0} : \{1}                                        |
| 3214 | Org source addition failed                                                   |
| 3215 | No Source types found                                                        |
| 3216 | Org source \{0} failed, Invalid source name passed                           |
| 3217 | Org source addition failed, Invalid source account identifier passed         |
| 3218 | Org source \{0} failed, Invalid source type passed                           |
| 3219 | Org source update failed, Invalid UUID passed                                |
| 3220 | Org source \{0} failed, Org source already exits with given \{1}, \{2}, \{3} |
| 3221 | Org source update failed OR Org id passed is invalid                         |
| 3222 | No configs found for given source id                                         |

### Warnings

| Code | Description                                                                    |
| ---- | ------------------------------------------------------------------------------ |
| 3212 | Invalid value \{1} for organization setting '\{0}'                             |
| 3212 | Could not fetch points-to-currency-ratio                                       |
| 3235 | Base currency not defined for org                                              |
| 3236 | Invalid currency code passed                                                   |
| 3237 | Currency conversion exchange rate missing for local \{0} to base currency \{1} |
| 3238 | Uploaded file not present                                                      |
| 3225 | Invalid org source details passed                                              |
| 3226 | Unsupported communication channel id                                           |
| 3226 | Unsupported org source id                                                      |
| 3227 | Till does not exist                                                            |
| 3228 | Organization Details updating failed                                           |
| 3229 | Invalid value of `minSmsHour` or `maxSmsHour`                                  |