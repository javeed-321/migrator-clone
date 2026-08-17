---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Points (v2)

Points represent loyalty points issued to customers through Loyalty+, Engage+, GoodWill (Member Care), or Data Import. Customers can redeem the points within the validity period and can also transfer their points to other loyalty customers.

## Status Codes

### Success Codes

| Code | Description                                          |
| ---- | ---------------------------------------------------- |
| 800  | Points redeemed successfully, points can be redeemed |

### Error Codes

| Code | Description                                                                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 412  | Configuration key `CONF_FRAUD_STATUS_CHECK_POINTS_TRANSFER`in the `config_keys` table is not set properly.                                                   |
| 413  | Problem fetching the configuration key `CONF_FRAUD_STATUS_CHECK_POINTS_TRANSFER`                                                                             |
| 414  | Destination customer status is fraud. Points cannot be transferred to customers with fraud status.                                                           |
| 415  | Source customer status is fraud. Points cannot be transferred by customers with fraud status.                                                                |
| 416  | Points related validation failed from Thrift.                                                                                                                |
| 417  | Customer with fraud status exists.                                                                                                                           |
| 418  | From and To customers are same.                                                                                                                              |
| 419  | Merged customer found with id: \{x}, where x is the user id of the customer.                                                                                 |
| 686  | User is from campaign and has not enrolled in the loyalty program. Points redemption is not applicable for the user.                                         |
| 801  | Points you are trying to redeem are invalid                                                                                                                  |
| 802  | Mobile number/email id/external id you have entered is invalid                                                                                               |
| 803  | Unable to redeem. The points you are trying to redeem is more than the available points                                                                      |
| 804  | Insufficient current points.                                                                                                                                 |
| 805  | Insufficient lifetime points.                                                                                                                                |
| 806  | Insufficient lifetime purchases amount.                                                                                                                      |
| 807  | Unable to redeem. Make sure that the points you are trying to redeem is a multiple of `<X>`. Check the points redemption configuration of your organization. |
| 808  | Unable to redeem. Validation code is invalid.                                                                                                                |
| 809  | Unable to process. Customer is marked as fraud.                                                                                                              |
| 810  | The system is busy processing other requests. Please try again later                                                                                         |
| 811  | The transaction number entered to redeem/revert points is invalid                                                                                            |
| 812  | The points have been reverted already for this transaction number                                                                                            |
| 813  | Insufficient current points available for redemption                                                                                                         |
| 814  | No points were redeemed on this transaction number                                                                                                           |
| 815  | Unable to process points at this moment. Please try again later                                                                                              |
| 816  | Unable to find customer in this organization                                                                                                                 |
| 817  | Points redemption failed.                                                                                                                                    |
| 818  | Current points are less than points requested for redemption.                                                                                                |
| 819  | Points you are trying to redeem are more than the maximum allowed redemption limit.                                                                          |
| 820  | Unable to process. Customer is marked as fraud                                                                                                               |
| 821  | Points you are trying to redeem are less than the minimum redemption limit                                                                                   |
| 822  | Unable to find missed call from the registered mobile number                                                                                                 |
| 823  | Missed call redemption is disabled for your organization                                                                                                     |
| 824  | Mobile number validation is mandatory for redeeming points                                                                                                   |
| 825  | Client signature is required                                                                                                                                 |
| 826  | Invalid points category or invalid configuration                                                                                                             |
| 827  | Unable to redeem points. Points redemption is enabled for your organization.                                                                                 |
| 859  | The redemption time you have passed is invalid                                                                                                               |
| 860  | Unable to issue OTP.                                                                                                                                         |
| 881  | Customer is not registered into the loyalty program.                                                                                                         |
| 886  | Unable to process points. Please try again later.                                                                                                            |
| 887  | Unable to process points. Please try again later.                                                                                                            |
| 888  | Configuration is invalid. Please report to Capillary Support                                                                                                 |
| 889  | Points processing failed. Please try again later.                                                                                                            |
| 894  | Unable to process points at this moment. Please try again later                                                                                              |
| 895  | Loyalty program is not configured for your organization.                                                                                                     |
| 896  | Unable to process points. Please try again later.                                                                                                            |
| 898  | Unable to process points at this moment. Please try again later                                                                                              |
| 899  | Configuration is invalid. Please report to Capillary Support                                                                                                 |
| 901  | Invalid points or points redemption Id passed.                                                                                                               |
| 902  | Redemption ID does not exist.                                                                                                                                |
| 903  | Unable to redeem points.                                                                                                                                     |
| 904  | Invalid customer details passed.                                                                                                                             |
| 3045 | Points Redemption is not allowed for the customer with id \{x} as the status is fraud.                                                                       |
| 3802 | Points reversal redeemed points already reversed.                                                                                                            |
| 8015 | Customer not found for the given identifiers                                                                                                                 |

### Warning Codes

| Code | Description                                                                                                       |
| ---- | ----------------------------------------------------------------------------------------------------------------- |
| 872  | Unable to fetch points-to-currency conversion ratio.                                                              |
| 873  | Invalid transaction number passed.                                                                                |
| 876  | Points are redeemable but unable to generate OTP.                                                                 |
| 877  | Unable to allocate points.                                                                                        |
| 900  | Pending events present in queue for this user. Queue size-\{0},failed event -\{1},reason -\{2},status code -\{3}. |
| 901  | Invalid points or points redemption ID.                                                                           |
| 902  | Redemption ID does not exist.                                                                                     |
| 903  | Unable to redeem points.                                                                                          |
| 904  | Invalid customer details passed.                                                                                  |
| 905  | points redemption reversal is disabled for the org.                                                               |