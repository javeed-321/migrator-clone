---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Multiple Badge Issuances

The enhancement allows for multiple badge issuances for the same badge type and customer, as long as the issuance periods don't overlap. This provides more flexibility and corrects the previous limitations.

Let's break down the example scenario:

## Badge 1 Configuration

* Available from: September 1st
* Available until: September 30th
* Duration after issuance: 2 weeks

Now, let's say a customer, Alice, interacts with your system in a way that qualifies her for Badge1 twice in September.

### Issuance 1

* Issued on: September 2nd
* Expires on: September 16th (2 weeks after issuance)

Alice qualifies for the badge again later in the month.

### Issuance 2

* Issued on: September 17th (the day after the first issuance expired)
* Expires on: October 1st (2 weeks after this issuance, even though it's past the badge's availability end date)

In this scenario:

Alice receives the badge twice.

The issuances don't overlap (the second one starts after the first one ends). The system allows both issuances because they're within the badge's availability period (September 1-30).

The second issuance's expiry extends into October, which is allowed because it's based on the issuance date, not the badge's availability end date.

This new system provides several benefits:

* It allows for repeated achievements within a given period.
* It prevents errors from overlapping issuances.
* It provides a more accurate representation of a user's achievements over time.\
  For example, in a loyalty program, this could represent a customer reaching a spending threshold twice in a month, earning the "Big Spender" badge each time, but not simultaneously.

## Advantages of Issual ID

1. Each badge issuance can be uniquely identified, even if the same badge type is issued multiple times to the same user.
2. This allows for precise tracking and referencing of specific badge instances.
3. Provides a clear record of when and how many times a particular badge was issued to a user.
4. Allows for tracking the entire lifecycle of each badge instance separately
5. Makes it easier to identify and correct errors related to specific badge issuances without affecting other instances
6. Allows for providing users with detailed history of their badge acquisitions, including specific dates and contexts for each issuance