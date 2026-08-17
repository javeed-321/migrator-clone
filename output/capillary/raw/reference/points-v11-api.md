---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Points (v1.1)

Points represent loyalty points of an organization that are issued to the loyalty customers through different sources such as Loyalty Manager, Data Import (import profiles) and Member Care (GoodWill points). Customers can redeem their points against transactions.

> 📘
>
> Points cannot be issued through APIs. It can be issued only through modules such as Loyalty Manager, Data Import and Member Care.

The APIs of points entity are interdependent. For example, to redeem points, first you need to check whether a customer can redeem those points (`isredeemable`), validate customer’s registered mobile number by issuing validation code, and then redeem points using the validation code received by the customer.

The points entity allows you to perform the following tasks -

* Check whether a specific number of points can be redeemed by a customer
* Issue validation code to the registered mobile number/email id to validate customer
* Redeem points using the validation code received by the customer

## Status Codes

### Success Codes

| Code | Description                  |
| ---- | ---------------------------- |
| 800  | Points redeemed successfully |

### Error Codes

| Code | Description                                                                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 686  | User is from campaign and has not enrolled in the loyalty program. Points redemption is not applicable for the user.                                         |
| 801  | Points you are trying to redeem are invalid                                                                                                                  |
| 802  | Mobile number/email id/external id you have entered is invalid                                                                                               |
| 803  | Unable to redeem. The points you are trying to redeem is more than the available points                                                                      |
| 804  | Insufficient current points.                                                                                                                                 |
| 805  | Insufficient lifetime points.                                                                                                                                |
| 806  | Insufficient lifetime purchases amount.                                                                                                                      |
| 807  | Redemptions points not divisible.                                                                                                                            |
| 809  | Customer is marked as fraud.                                                                                                                                 |
| 818  | Current points are less than points requested for redemption.                                                                                                |
| 819  | Points to redeem exceeds the threshold limit (maximum points that can be redeemed in a transaction).                                                         |
| 821  | Points you are trying to redeem are less than the minimum points allowed.                                                                                    |
| 886  | Unable to process points. Please try again later.                                                                                                            |
| 887  | Unable to process points. Please try again later.                                                                                                            |
| 888  | Invalid configuration. Please report to capillary support.                                                                                                   |
| 801  | Points you are trying to redeem are invalid                                                                                                                  |
| 802  | Mobile number/email id/external id you have entered is invalid                                                                                               |
| 803  | Unable to redeem. The points you are trying to redeem is more than the available points                                                                      |
| 804  | Insufficient current points.                                                                                                                                 |
| 805  | Insufficient lifetime points.                                                                                                                                |
| 806  | Insufficient lifetime purchases amount.                                                                                                                      |
| 807  | Unable to redeem. Make sure that the points you are trying to redeem is a multiple of `<X>`. Check the points redemption configuration of your organization. |
| 808  | Unable to redeem. Validation code is invalid                                                                                                                 |
| 809  | Unable to process. Customer is marked as fraud                                                                                                               |
| 810  | The system is busy processing other requests. Please try again later                                                                                         |
| 811  | The transaction number entered to redeem/revert points is invalid                                                                                            |
| 812  | The points have been reverted already for this transaction number                                                                                            |
| 813  | Insufficient current points available for redemption                                                                                                         |
| 814  | No points were redeemed on this transaction number                                                                                                           |
| 815  | Unable to process points at this moment. Please try again later                                                                                              |
| 816  | Unable to find customer in this organization                                                                                                                 |
| 817  | Points redemption failed.                                                                                                                                    |
| 818  | Points you are trying to redeem are more than the available points                                                                                           |
| 819  | Points you are trying to redeem are more than the maximum allowed redemption limit.<br /> Unable to send message to customer                                 |
| 820  | Unable to process. Customer is marked as fraud                                                                                                               |
| 821  | Points you are trying to redeem are less than the minimum redemption limit                                                                                   |
| 822  | Unable to find missed call from the registered mobile number                                                                                                 |
| 823  | Missed call redemption is disabled for your organization                                                                                                     |
| 824  | Mobile number validation is mandatory for redeeming points                                                                                                   |
| 825  | Client signature is required                                                                                                                                 |
| 826  | Invalid points category or invalid configuration                                                                                                             |
| 827  | Unable to redeem points. Points redemption is enabled for your organization                                                                                  |
| 859  | The redemption time you have passed is invalid                                                                                                               |
| 860  | Unable to issue OTP                                                                                                                                          |
| 881  | Customer is not registered into the loyalty program                                                                                                          |
| 888  | Configuration is invalid. Please report to Capillary Support                                                                                                 |
| 889  | Points processing failed. Please try again later.                                                                                                            |
| 894  | Unable to process points at this moment. Please try again later                                                                                              |
| 895  | Loyalty program is not configured for your organization                                                                                                      |
| 898  | Unable to process points at this moment. Please try again later                                                                                              |
| 899  | Configuration is invalid. Please report to Capillary Support                                                                                                 |
| 901  | Invalid points or points redemption Id passed.                                                                                                               |
| 902  | Redemption ID does not exist.                                                                                                                                |
| 903  | Unable to redeem points.                                                                                                                                     |
| 904  | Invalid customer details passed.                                                                                                                             |
| 3045 | Points Redemption is not allowed for the customer with id `{x}` as the status is fraud.                                                                      |
| 3802 | Points reversal redeemed points already reversed.                                                                                                            |