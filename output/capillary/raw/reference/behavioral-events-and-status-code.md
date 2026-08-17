---
updatedAt: 2026-07-03T11:32:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Behavioral Events

Behavioral events help capture customer activities such as registration, forgot password, and cart abandonment. 

There are standard events that are predefined with name, id, and attributes. 

The events resource lets you create custom events and Webhook account, enable standard events for an org, and map event fields.

> 📘 Note
>
> Behavioural events ingestion operates asynchronously. When you send data to a Webhook, it acknowledges receipt and queues the data for processing, but does not provide an immediate response. This differs from synchronous APIs. To verify the status of your events after ingestion, use either the [Get Events Log](https://docs.capillarytech.com/reference/get-events-logs) API or the [Search Events](https://docs.capillarytech.com/reference/search-events) API.

## Status Codes

### Success Codes

| Code | Description             |
| ---- | ----------------------- |
| 7300 | Feed added successfully |

### Error Codes

| Code | Description                                                                                      |
| ---- | ------------------------------------------------------------------------------------------------ |
| 7301 | Unable to add feed.                                                                              |
| 7302 | Source is not specified.                                                                         |
| 7303 | Invalid source passed.                                                                           |
| 7304 | Event is not passed.                                                                             |
| 7305 | Invalid event passed.                                                                            |
| 7306 | UUID is not passed.                                                                              |
| 7307 | Customer ID is not passed.                                                                       |
| 7308 | Invalid customer ID passed.                                                                      |
| 7309 | Invalid SKU passed.                                                                              |
| 7310 | Invalid store code passed.                                                                       |
| 7311 | Invalid customer details passed. <br />Scan event failed.                                        |
| 7312 | Event name does not match any registered behavioral event for the organization.                  |
| 7313 | Payload schema validation failed. Field types or identifiers do not match the configured schema. |