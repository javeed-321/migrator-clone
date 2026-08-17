---
updatedAt: 2026-05-19T18:00:49.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

#  Exceptions and Known Limitations

The sections above describe the standardized timezone model that applies across most of the platform. The following are exceptions or known limitations where the model does not apply or is incomplete.

# Offers API

The Offers API does not currently follow the standardized timezone model. Existing timezone behaviour remains unchanged. Standardization is planned as part of an ongoing revamp initiative.

# v1 and v1.1 APIs

v1 and v1.1 APIs retain legacy timezone behaviour. Timezone standardization is not applied to these API versions.

These API versions are not being deprecated. They will adopt the standardized model in a future release.

# Multi-timezone (custom timezone) promotion applicability

Promotions are currently scheduled and evaluated in the timezone selected while scheduling. A promotion that expires at midnight will close for all users at that moment, regardless of the customer's local time. Per-user local timezone evaluation is planned for a future release.

# DST fall-back handling

The system does not handle the repeated 01:00–01:59 hour during a DST fall-back. This is a deliberate trade-off to avoid large-scale changes to legacy servers and data types.

# Offset preservation scope

Offset preservation is currently available for transactions and behavioural events. It is not yet extended to all API types. Support for offset preservation in other areas (such as customer-level data and rewards) will be added in future releases.

# Reward catalog

The Rewards Catalog API always returns datetime values in UTC with a Z suffix.

**With offset:** If you send 2025-09-10T14:30:00+05:30, the API recognizes the offset and correctly converts it to UTC and response returns 2025-09-10T09:00:00Z.

**Without offset:** If you send 2025-09-10T14:30:00, the API has no timezone information, so it assumes the time is in the server's timezone and converts it to UTC based on the current servers timezone. If the server is on IST, the response still returns 2025-09-10T09:00:00Z, but if you actually meant a different timezone, the returned UTC value will be incorrect.

<br />