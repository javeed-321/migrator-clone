---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customer (V1)

A customer is an individual who purchases goods/services, or subscribes to the organization’s newsletters. An organization refers to a store, business firm, hospital or restaurant.

Based on the registration status, customers are categorized into three types:

* Loyalty customers: Customers who have registered into the organization’s loyalty program
* Non-loyalty customers: Customers who have subscribed (mobile number or email id) to organization’s newsletter to receive campaign/transaction messages but not enrolled into the organization’s loyalty program
* Not-interested or anonymous customers: Customers who have neither enrolled in the loyalty program nor subscribed to the organization’s newsletter

The customer entity contains APIs related to registering customers into the loyalty program, managing loyalty accounts and updating subscription status of both registered and non-registered customers. It stores customer related information such as identifiers, profile details, custom field details, transactions, preferences, subscription details (mobile number/email id), tier details, points history and coupons history.

Customer APIs allow you to do the following -

* Register customers into your organization’s loyalty program
* Update loyalty customers’ profile information
* Update primary or secondary identifiers (mobile no, email id, or external id)
* Retrieve customer details of loyalty and non-loyalty customers
* Capture complaints and feedback of loyalty customers
* Add, update and retrieve customer preferences of loyalty customers
* Retrieve transactions of loyalty/non-loyalty customers

## Response Codes

### Success Codes

| Code | Description                                           |
| ---- | ----------------------------------------------------- |
| 1000 | Customer registered successfully.                     |
|      | Customer retrieved successfully.                      |
|      | Subscription updated successfully.                    |
|      | Subscription retrieved successfully                   |
|      | Customer updated successfully.                        |
|      | Coupons retrieved successfully.                       |
|      | Customer notes added/updated successfully             |
|      | Customer notes retrieved successfully                 |
|      | Customer preferences retrieved successfully.          |
|      | Customer preferences updated successfully.            |
| 1000 | Referral statistics retrieved successfully            |
|      | Referrals are invited successfully                    |
| 1040 | Customer id change request has submitted successfully |
| 1061 | Customer recommendations fetched successfully         |
| 1052 | Transactions fetched successfully                     |
| 1300 | Ticket retrieved successfully                         |
|      | Ticket added successfully                             |

### Error Codes

| Error code | Description                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| 400        | Input is invalid. Please check request parameters or input xml/json; No identifier provided to get loyalty users. |
| 500        | All requests failed due to errors.                                                                                |
| 618        | Not allowed - customer is marked as fraud.                                                                        |
| 8014       | Unable to register. Country configuration is missing or invalid.                                                  |
| 816        | Customer not found for organization.                                                                              |
| 1001       | Unable to register. Invalid mobile number.                                                                        |
| 1002       | Unable to register. Invalid email ID.                                                                             |
| 1003       | Unable to register. Invalid external ID.                                                                          |
| 1004       | Failed to populate store.                                                                                         |
| 1006       | Unable to register. Mobile number is required.                                                                    |
| 1007       | Unable to register customer. No valid primary identifier (mobile number, email ID, or external ID) passed.        |
| 1008       | Unable to register with external ID.                                                                              |
| 1009       | Unable to add registered customer to MLM.                                                                         |
| 1010       | Unable to update loyalty points of the customer.                                                                  |
| 1011       | Cannot find customer for provided identifier.                                                                     |
| 1012       | Cannot find customer with the provided mobile number, external ID, or email ID.                                   |
| 1013       | Customer is not registered for the loyalty program.                                                               |
| 1014       | Customer is already registered.                                                                                   |
| 1015       | No identifier provided to get loyalty users.                                                                      |
| 1016       | Unable to register. Email ID already exists for another user.                                                     |
| 1017       | Provided custom field is invalid.                                                                                 |
| 1018       | Unable to update custom field.                                                                                    |
| 1019       | Mobile number or external ID is required along with the email ID to register.                                     |
| 1020       | Customer is not registered for the loyalty program.                                                               |
| 1021       | Invalid validation code.                                                                                          |
| 1023       | Unable to register customer to loyalty program.                                                                   |
| 1024       | Unable to update customer profile.                                                                                |
| 1025       | Mandatory fields do not match for customer identity update.                                                       |
| 1026       | Count of optional fields matched is less than required.                                                           |
| 1027       | Field name provided for verification is invalid.                                                                  |
| 1028       | No customer notes are available.                                                                                  |
| 1029       | Unable to retrieve customer preferences.                                                                          |
| 1030       | Unable to update customer preferences.                                                                            |
| 1031       | No preferences set for this customer.                                                                             |
| 1032       | A customer already exists with the same mobile number.                                                            |
| 1033       | A customer already exists with the same external ID.                                                              |
| 1034       | Unable to register. Registration date is not within the allowed past or future date limit.                        |
| 1035       | Unable to update some customer preferences.                                                                       |
| 1036       | One or more notes could not be added or updated for the customer.                                                 |
| 1037       | Unable to add or update customer notes.                                                                           |
| 1038       | Unable to register with external ID.                                                                              |
| 1039       | Unable to register. Email ID is required.                                                                         |
| 1041       | Customer ID change request failed.                                                                                |
| 1042       | Invalid mobile number, email ID, or external ID.                                                                  |
| 1043       | Unable to register. Customer’s external ID is required.                                                           |
| 1044       | You do not have sufficient permission to view customer details.                                                   |
| 1045       | No valid identifier (mobile or email) passed for non-loyalty customer.                                            |
| 1046       | Conversion of loyalty customer to non-loyalty is not allowed.                                                     |
| 1047       | Customer's primary identifier does not match other identifiers.                                                   |
| 1048       | Customer’s email ID is required to convert to a loyalty customer.                                                 |
| 1049       | Customer’s external ID is required to convert to a loyalty customer.                                              |
| 1051       | No transactions or recommendations found for the customer.                                                        |
| 1053       | Preferred store specified is not found.                                                                           |
| 1060       | Batch limit exceeded.                                                                                             |
| 1062       | Invalid test and control status.                                                                                  |
| 1086       | Points processing failed.                                                                                         |
| 1087       | Points processing failed.                                                                                         |
| 1088       | Unable to issue points. Please report to Capillary Support.                                                       |
| 1089       | Points processing failed.                                                                                         |
| 1090       | Points processing failed.                                                                                         |
| 1091       | Points processing failed.                                                                                         |
| 1092       | Points processing failed.                                                                                         |
| 1093       | Points processing failed.                                                                                         |
| 1094       | Points processing failed.                                                                                         |
| 1095       | Points processing failed.                                                                                         |
| 1096       | Points processing failed.                                                                                         |
| 1097       | Points processing failed.                                                                                         |
| 1098       | Points processing failed.                                                                                         |
| 1099       | Points processing failed.                                                                                         |
| 1101       | Invalid channel type.                                                                                             |
| 1102       | Invalid priority type.                                                                                            |
| 1103       | Invalid scope.                                                                                                    |
| 1104       | Invalid identifier or no identifier passed.                                                                       |
| 1105       | Multiple scopes are not allowed.                                                                                  |
| 1106       | Invalid subscription status passed.                                                                               |
| 1107       | Invalid campaign ID passed.                                                                                       |
| 1108       | Invalid outbox ID passed.                                                                                         |
| 1109       | Unable to add, update, or fetch subscription details.                                                             |
| 1110       | Unable to update subscription details.                                                                            |
| 1150       | Invalid store ID passed.                                                                                          |
| 1202       | Invalid campaign token.                                                                                           |
| 1203       | Invalid campaign configured.                                                                                      |
| 1204       | Customer may not be eligible for the referral program.                                                            |
| 1205       | Unable to find the referrer in the specified campaign.                                                            |
| 1206       | Failed to add referral. Referral type is not supported.                                                           |
| 1222       | Internal error occurred with the referral system.                                                                 |
| 1301       | A ticket already exists with the same subject.                                                                    |
| 1302       | Ticket registration failed.                                                                                       |
| 1303       | Ticket subject must not be empty.                                                                                 |
| 9028       | Unable to update identity. A change request for the same identifier and new value is already pending.             |
| 10001      | Failed to add customer.                                                                                           |
| 10002      | Failed to update customer details.                                                                                |
| 91001      | Failed to get point details.                                                                                      |
| 91002      | Failed to get subscription details.                                                                               |
| 91003      | Validation failed.                                                                                                |
| 91004      | Failed to get segmentation details.                                                                               |
| 91005      | `{x}` is a primary key. `{y}` cannot be updated.                                                                  |
| 91006      | `{x}` update is not allowed.                                                                                      |
| 91007      | `{x}` is already occupied by another user. Ignoring it.                                                           |
| 91009      | Retrieved survivor account for the requested merge victim.                                                        |
| 91010      | Downgrade strategy is not configured.                                                                             |
| 91011      | Customer is already in the lowest slab.                                                                           |
| 91012      | Customer is already in the highest slab.                                                                          |
| 91013      | Call to Points Engine for tier upgrade criteria failed: `{x}`.                                                    |
| 91014      | Call to Points Engine for tier renewal criteria failed: `{x}`.                                                    |
| 91015      | Failed to update extended fields or field length is too long: `{x}`.                                              |
| 91016      | WeChat profile is not available for the customer.                                                                 |
| 91017      | Web Engage profile is not available for the customer.                                                             |
| 91018      | Unable to load WeChat notifications.                                                                              |
| 91019      | Unable to load Web Engage notifications.                                                                          |
| 91020      | Invalid TILL passed for registration.                                                                             |
| 91021      | Invalid attribution TILL passed.                                                                                  |
| 91022      | Failed to update subscription for `{x}` channel and priority `{y}`.                                               |