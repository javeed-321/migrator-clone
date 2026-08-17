---
updatedAt: 2026-04-20T05:54:54.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Overview

This page gives you the overview of Timezone management across APIs, transactions, behavioural events, rewards, and event notifications. .

Date and time values appear across APIs, transactions, behavioural events, rewards, and event notifications. These values may be created in one timezone, processed in another, and consumed globally.

Capillary follows a consistent timezone handling model to ensure predictable behaviour across regions and systems.

This page explains how date-time values are accepted, stored, and returned across the platform, from the organization's timezone settings all the way through to API responses and event notifications.

📘 **Note:** For organizations created from 2026 onwards, standardized timezone behavior is enabled by default. For organizations created before 2026, for some modules, certain configurations must be enabled manually.

***

## Core concepts

This section introduces the foundational concepts that Capillary's timezone model is built on. Understanding these terms will help you interpret the behaviour described in later sections.

***

### Organization timezone settings

Every Capillary organization has a **base timezone** that reflects where the business primarily operates. This is configured in the Capillary UI under **Organization Settings > Organization Profile > [Set Org TimeZone](https://docs.capillarytech.com/docs/org-management#set-org-timezone-tab)**.

Capillary's timezone model extends beyond the organization level. Timezones can be configured at each level of the store hierarchy: zone, store, and till. This allows individual stores and checkout points to operate in their own local timezones, independent of the organization's base setting.

***

### IANA timezone convention

Capillary uses the **IANA timezone format** (also called the tz database or Olson database) to represent timezones. Examples: `Asia/Kolkata`, `America/New_York`, `Europe/London`.

IANA names are preferred over fixed offsets (such as `+05:30`) because they carry **Daylight Saving Time (DST) rules** automatically. When you provide a timezone in IANA format, the system automatically applies the correct DST offset without any additional configuration.

For information on how DST affects specific modules, see the [Timezone resolution and configuration](/reference/timezone-resolution-and-configuration) section.

***

### Server timezone

The **server timezone** is the timezone of the Capillary cluster that processes your data. This is not the same as your organization's timezone and cannot be configured by your organization.

All date-time values are normalized to the server timezone before storage. GET API responses return date-time values in the server timezone. Behavioural events and event notifications use epoch milliseconds instead.

For how each surface handles the server timezone, see [How timezone works](/reference/handling-datetime-in-apis).

***

### Time formats

Capillary uses two standard time formats depending on the context.

**ISO 8601** is the international standard for representing date and time values. Capillary uses the pattern `yyyy-MM-ddTHH:mm:ssXXX`. This format is used in all GET API responses and accepted by POST and PUT APIs.

**Epoch milliseconds** represent a point in time as the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. This format is timezone-neutral. It is used for behavioural events and event notifications.

For usage details by module, see [How timezone works](/reference/handling-datetime-in-apis).

***

### Offset preservation

**Offset preservation** is Capillary's mechanism for storing the original timezone context in which data was ingested. When data is converted to the server timezone for storage, the original local time context is preserved by extracting and storing the timezone offset separately as an extended field.

This preserved offset is returned in GET API responses and can be used by downstream systems to reconstruct the original local time, for example, when evaluating whether a transaction falls within a time-windowed promotion.