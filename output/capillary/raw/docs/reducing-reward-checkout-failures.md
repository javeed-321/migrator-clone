---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Reducing Reward Checkout Failures

**Background**

In the past, when partner rewards were not successfully issued, downstream systems did not receive error responses from reward partners. Consequently, brands were unable to display accurate error messages to end users.

Reward Issuance could fail at any of the below steps and hence proper error message was required to show to the end users for better customer experience:

* isRedeemable >> checks if the customer has enough points to redeem the reward
* issueReward/issueCoupon >> coupon is issued to the customer
* RedeemPoints >> points are redeemed from customer’s account
* issueCouponReversal >> In case reward is issued but points are not deducted, then reward reversal will take place at this step

Previously, in case of failure in the above steps, following response would be generated:

```
{
    "status": {
        "success": false,
        "code": 8004,
        "message": "fail to issue reward as issue failed"
    }
    rewards:null
}
```

**Enhancement**

With the recent enhancement, error messages from partners can now be retrieved and included in the response. This will allow brands to display accurate error messages to the end-users in case of reward issuance failures making the customer experience better.

After the enhancement, in case of failure, following response would be generated:

```
{
    "status": {
        "success": false,
        "code": 8004,
        "message": "fail to issue reward as : IsRedeemable API failed CardNumberRequired &NumberNotFound",
        "partnerError": {
            "codes": [
                "100106",
                "100105"
            ],
            "messages": [
                "CardNumberRequired",
                "NumberNotFound"
            ]
        }
    },
    "rewards":null  
}
```

```
{
    "status": {
        "success": false,
        "code": 1010,
        "message": "Points redeem API failed: Invalid token - not found",
        "partnerError": {
            "codes": [
                "990102"
            ],
            "messages": [
                "Invalid token - not found"
            ]
        }
    },
    "rewards": null
}
```

**Table showing different error codes and corresponding message and comments**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Error code
      </th>
      <th>
        Message
      </th>
      <th>
        Comments
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        8004
      </td>
      <td>
        fail to issue reward as &lt;reason&gt;
      </td>
      <td>
        Issue failed while getting customer details or isRedeemable check or redeem points check.
      </td>
    </tr>
    <tr>
      <td>
        8003
      </td>
      <td>
        fail to issue reward
      </td>
      <td>
        1\. Any Request validation errors.\
        2\. When all reward’s issue failed.
      </td>
    </tr>
    <tr>
      <td>
        8010
      </td>
      <td>
        Reward issued partially
      </td>
      <td>
        In issue bulk call, not all rewards are issued successfully.
      </td>
    </tr>
    <tr>
      <td>
        1010
      </td>
      <td>
        Failed to redeem points
      </td>
      <td>
        When unable to redeem the points.
      </td>
    </tr>
    <tr>
      <td>
        1026
      </td>
      <td>
        Points vendor configurations are not set
      </td>
      <td>
        Brand not configured points vendor redemptions properly.
      </td>
    </tr>
  </tbody>
</Table>

For tech detailing, refer to this [doc](https://capillarytech.atlassian.net/wiki/spaces/LOYAL/pages/3558932485/Handling+vendor+API+response)