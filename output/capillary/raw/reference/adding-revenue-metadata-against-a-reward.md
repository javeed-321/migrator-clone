---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Adding revenue metadata against a reward

The Revenue Metadata feature allows reward configurators to add commission percentages for various entities involved in reward transactions, such as the brand, Capillary, affiliates, and end customers, for a fixed duration of the reward.

When a brand is configuring a reward, it can set the percentage of commission each entity makes from a reward. These entities are:

1. Brand commission
2. Capillary commission
3. Affiliate commission
4. End customer commission

Consider a scenario,

A brand configures a reward running from January 1st to March 31st and the brand configures the commission percentage for each participant for a fixed cycle during this period. Below are the two methods the brand can use to configure the rewards:

Use case 1: The brand can configure a single fixed cycle.

-**Duration**: January 1st to March 31st

```
Brand commission: 1%

Capillary's commission: 1%

Affiliate commission: 1%

End customer commission: 7%
```

Use case 2: The duration of the fixed cycle is broken down into multiple cycles. The cycles cannot overlap and default values are passed if the commission is missing for a certain period.

-**Duration**: January 1st to January 31st

```
Brand commission: 1%

Capillary's commission: 1%

Affiliate commission: 1%

End customer commission: 7%
```

-**Duration**: February 1st to February 29th

```
Brand commission: 1%

Capillary's commission: 0%

Affiliate commission: 0.5%

End customer commission: 9%
```

-**Duration**: March 1st to March 31st

```
 Brand commission: 1%

 Capillary's commission* 0%

 Affiliate commission: 0.5%

End customer commission: 8%
```