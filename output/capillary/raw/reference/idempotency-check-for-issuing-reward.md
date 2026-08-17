---
updatedAt: 2026-08-02T18:34:41.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Idempotency Check for Issuing Reward

Idempotency means that performing the same action multiple times will have the same result as performing it once. Idempotency check-in rewards ensure that a customer is rewarded only once, even if the API is requested multiple times. This prevents duplicate or additional rewards and allows you to safely repeat the request in case of partial success. (Partial success occurs when only some rewards are issued successfully, while others fail due to issues like incorrect details or limitations.) This ensures that rewards are issued exactly as requested.

> \[!NOTE]
> The Issue Reward API does not allow multiple simultaneous (parallel) requests for the same customer. If you send parallel requests for the same customer, the API returns error code 10004 with the message "Parallel calls are not allowed for same customer." Wait for the first request to complete before sending another request for the same customer.

To ensure the idempotency check is carried out, provide an additional **Request ID** in the request parameters of the Issue Reward APIs.

```json
{
    "mobile": "919825752814",
    "brand": "testOrg_marvel_20230822_147",
    "transactionNumber": "2344s4",
    "notes": "This is test",
    "eventLogId":"eventLogId124",
    "rewards": [
        {
            "rewardId": 125099,
            "quantity": 2,
            "requestId":"req3"//This is used for performing idempotency check.
        },
        {
            "rewardId": 125101,
            "quantity": 2,
            "requestId":"req4"//This is used for performing idempotency check.
        }
    ]
}
```

# Example

Consider a case where you are trying to issue two rewards using the payment mode "POINTS." The first reward is redeemed by using five points, and the second one with ten points, with a requested quantity of two for each.

* **Reward 1 (R1):** 5 points
* **Reward 2 (R2):** 10 points
* **Requested Quantity:** Two quantities of R1 and two quantities of R2

#### Scenario 1: Maximum Issuance Limit per Customer: One per R1 and R2

In this scenario, when you attempt to issue rewards to the customer, only one reward of R1 and one reward of R2 will be issued due to the restriction. This is known as a Partial Success Scenario, as only one of each reward is issued despite the request for two.

#### Scenario 2: Maximum Issuance Limit per Customer: One for R1 and Two for R2

Now, if you retry issuing the remaining quantity after adjusting the issuance limit, the API responds with "Reward issued partially," successfully redeeming the remaining 10 points for R2. However, the remaining points for R1 are still not processed.

#### Scenario 3: Maximum Issuance Limit per Customer: No Limit for R1 and R2

When you retry issuing after removing the issuance restrictions, the API responds with "Reward issued successfully," successfully redeeming the remaining 5 points for R1. Due to the idempotency check, even though the same request is made, no additional points are processed for R2, as they were successfully processed in the previous requests.

In total, 30 points are successfully redeemed through all issued rewards. The Idempotency Check ensures that only the requested points are redeemed and that the intended results are achieved, even after multiple retries.

Refer to the documentation below:

* [Create Reward ](https://docs.capillarytech.com/reference/post-create-reward): Create reward using Payment Mode as **POINTS** and redemption value as **INTOUCH\_POINTS**.
* [Issue Bulk Reward](https://docs.capillarytech.com/reference/issue-bulk-reward): Issue Reward using the **Request ID** in the Request Body Param.