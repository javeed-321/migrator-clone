---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Use Case

# Requirement

By default, customer mobile numbers are stored and indexed with the international country code prefix (e.g., +91 for India), as defined in the global transformation. For Indian clients who often search using only the local mobile number (without +91), this leads to no search results because the stored data includes the prefix. To improve the search experience, there’s a need to strip the +91 prefix from the mobile number during the transformation phase, specifically for that organisation’s customer events.

# The Solution with Neo Transformation

Create a custom Neo transformation dataflow to modify the mobile number. If the number starts with +91, the script removes the first three characters. More advanced logic can also be added to handle multiple country codes or use a list of prefixes to remove.

This custom endpoint can then be configured using the [Configuration API](https://docs.capillarytech.com/reference/enable-custom-event-for-cortex-search). Once activated, you can create a [new customer search criteria](https://docs.capillarytech.com/docs/create-search-filter) for the organisation that allows searching by mobile number. This search criteria uses the custom event transformation enabled for the org, and the  [search API](https://docs.capillarytech.com/reference/perform-search)allows users to find customers without needing to enter the country code