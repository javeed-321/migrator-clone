---
updatedAt: 2026-08-17T05:45:22.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Benefit Categories

Benefit categories group [loyalty benefits](https://docs.capillarytech.com/reference/benefits) by the tiers (slabs) they apply to within a program. Unlike benefits, a benefit category has no maker-checker approval workflow. It's created, updated, and retrieved directly.

This is a distinct API surface from Benefits, which define the rewards and perks themselves.

### What you can do

You can use the Benefit Categories APIs to:

* **Create:** Create a benefit category for a program, scoped to one or more tiers (slabs).
* **List:** Retrieve a paginated list of benefit categories, optionally filtered by program or active state.
* **Retrieve:** Get a single benefit category by ID.
* **Update:** Change a benefit category's name or its tier (slab) scope.
* **Activate:** Reactivate a benefit category.
* **Deactivate:** Deactivate a benefit category. This automatically unlinks any benefits that reference it.