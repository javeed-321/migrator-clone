---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Coupon (V1.1 APIs)

Coupon represents store promotions or discounts created through Capillary Campaign Manager. A single campaign could contain one or more coupons or coupon series. Coupons are issued to loyalty or non-loyalty customers through SMS or email.

You cannot create new coupons using coupon APIs. You can just send or retrieve coupons that are already created in your campaigns. Hence, it is important to note the coupon code, coupon id or coupon series id for making API calls.

The coupon entity allows you to perform the following tasks:

* Issue coupons to customers
* Resend a specific coupon to the respective customer
* Retrieve details of a specific coupon/coupon series
* Check whether a customer can redeem a specific coupon and redeem the coupon

### Success Codes

| Code | Description                        |
| ---- | ---------------------------------- |
| 700  | Coupon processed successfully      |
| 700  | Coupon series fetched successfully |

### Error Codes

| Code | Description                                                                                    |
| ---- | ---------------------------------------------------------------------------------------------- |
| 701  | Unable to find the customer. Please enter correct mobile number/email id/external id           |
| 702  | Coupon code is invalid                                                                         |
| 703  | Coupon not issued to this customer                                                             |
| 704  | Unable to send coupon to the customer’s mobile number                                          |
| 705  | Invalid coupon code and validation code                                                        |
| 706  | Unable to redeem coupon                                                                        |
| 707  | Coupon series id is invalid                                                                    |
| 709  | Unable to redeem coupon                                                                        |
| 710  | Coupon cannot be redeemed by this customer                                                     |
| 711  | Coupon is redeemed already                                                                     |
| 712  | Unable to redeem. Either coupon series or campaign might have expired                          |
| 713  | Coupon has expired                                                                             |
| 714  | Unable to redeem. Maximum redemptions allowed for this campaign are already reached            |
| 715  | Unable to redeem. The coupon is not valid for this organization                                |
| 716  | Unable to redeem. Cannot redeem same coupon multiple times                                     |
| 718  | Unable to redeem. Please enter transaction number must be entered to redeem                    |
| 719  | Coupon code does not exist                                                                     |
| 720  | Unable to redeem. This is just a trial coupon and cannot be redeemed                           |
| 721  | Unable to issue/redeem coupon. Customer is invalid                                             |
| 722  | Unable to issue coupon                                                                         |
| 723  | Unable to redeem. The coupon cannot be used by this customer                                   |
| 724  | Unable to send message                                                                         |
| 725  | Unable to redeem coupon. Please provide validation code to redeem                              |
| 726  | Validation not required                                                                        |
| 728  | Unable to redeem. Maximum number of coupon redemptions allowed has already been reached        |
| 729  | Invalid redemption date range for the coupon series                                            |
| 730  | Unknown error                                                                                  |
| 732  | No Missed call received from the customer                                                      |
| 733  | Transaction amount invalid                                                                     |
| 735  | Unable to redeem coupon. The coupon cannot be redeemed at this store                           |
| 736  | Unable to redeem coupon. Maximum number of coupon redemptions allowed has already been reached |
| 738  | Cannot redeem the coupon. Please wait for `<X>` days to redeem this coupon again               |
| 739  | Unable to redeem. Make sure that the redemption date you have entered is valid                 |
| 740  | Unable to process. Customer is marked as fraud                                                 |
| 742  | Coupon issual or redemption is blocked for this customer                                       |
| 750  | Unable to process. Customer is marked as fraud                                                 |
| 786  | Unable to process coupon. Please try again later                                               |
| 787  | Unable to process coupon. Please try again later                                               |
| 788  | Configuration is invalid. Please report to Capillary Support                                   |
| 789  | Unable to process coupon. Please try again later                                               |
| 790  | Unable to process coupon. Please try again later                                               |
| 791  | Unable to process coupon. Please try again later                                               |
| 792  | Unable to process coupon. Please try again later                                               |
| 793  | Unable to process coupon. Please try again later                                               |
| 794  | Unable to process coupon. Please try again later                                               |
| 795  | Configuration is invalid. Please report to Capillary Support                                   |
| 796  | Unable to process coupon. Please try again later                                               |
| 797  | Unable to process coupon. Please try again later                                               |
| 798  | Unable to process coupon. Please try again later                                               |
| 799  | Configuration is invalid. Please report to Capillary Support                                   |