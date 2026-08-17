---
updatedAt: 2026-04-23T06:06:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

### 1. When are filtered audiences refreshed?

Filtered audiences are **not refreshed automatically by default** after ETL sync. They are refreshed automatically only when used in an active journey. In such cases, the audience is updated after each ETL sync.

***

### 2. Under what conditions are filtered audiences not refreshed automatically?

Filtered audiences are not refreshed automatically by default. They remain unrefreshed unless they are used in an active journey.

***

### 3. When does a manual refresh reflect in campaigns?

Manual refresh reflects in campaigns based on the campaign type:

* **One-time campaigns:**\
  The updated audience is used only if the campaign is scheduled **after the manual refresh**.

* **Recurring campaigns:**\
  The audience is refreshed **before each execution**, so the latest data is always used.

***

### 4. When are filtered audiences refreshed in active campaigns using ETL sync?

For **active recurring campaigns**, the associated filtered audience is refreshed **before each execution**, ensuring the latest data is used.