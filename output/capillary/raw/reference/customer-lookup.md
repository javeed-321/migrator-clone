---
updatedAt: 2026-07-03T11:12:52.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customer (V2 Lookup)

Customer Lookup is an extension to normal customer APIs. Here, instead of identifying a customer using userId, you can use registered identifiers like mobile number, email ID, external ID, card number to update or fetch customer details.

Customer Lookup is an extension to normal customer APIs where instead of fetching or updating details using customer ID, you can use registered identifiers like mobile number, email ID, external ID, card number and so on in /customer/lookup.

##

## Status Codes

This section provides the list of success codes, error codes, and warning codes of the `customers` resource.

### Success Codes

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Code
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        1000
      </td>

      <td>
        Customer registered successfully.\
         Customer retrieved successfully.\
         Subscription updated successfully.\
         Subscription retrieved successfully.\
         Customer updated successfully.\
         Coupons retrieved successfully.\
         Customer notes added/updated successfully.\
         Customer notes retrieved successfully.\
         Customer preferences retrieved successfully.\
         Customer preferences updated successfully.\
        Referral statistics retrieved successfully.\
        Referrals are invited successfully.
      </td>
    </tr>

    <tr>
      <td>
        1040
      </td>

      <td>
        Customer id change request has submitted successfully.
      </td>
    </tr>

    <tr>
      <td>
        1061
      </td>

      <td>
        Customer recommendations fetched successfully.
      </td>
    </tr>

    <tr>
      <td>
        1050
      </td>

      <td>
        Customer recommendations fetched successfully.
      </td>
    </tr>

    <tr>
      <td>
        1052
      </td>

      <td>
        Transactions fetched successfully.
      </td>
    </tr>

    <tr>
      <td>
        1300
      </td>

      <td>
        Ticket retrieved successfully.\
         Ticket added successfully.
      </td>
    </tr>
  </tbody>
</Table>

### Error Codes

> \[!NOTE]
> The /v2/customers/lookup endpoint does not return campaign users (non-loyal users), even if their identifiers (such as email) exist in the system. If you search for an identifier that belongs to a campaign user, you will receive error code 8015. If you try to register a new user with the same identifier, you will receive error code 8153, indicating the identifier is already associated with an existing campaign user. Member Care may display these users, but GET customer API calls will not retrieve them.

| Code  | Description                                                                                                                                                                                          |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400   | Input is invalid. Please check request parameters or input xml/json; No identifier provided to get loyalty users.                                                                                    |
| 500   | All requests failed due to errors.                                                                                                                                                                   |
| 618   | Not allowed - customer is marked as fraud.                                                                                                                                                           |
| 816   | Customer not found for organization.                                                                                                                                                                 |
| 1001  | Unable to register. Invalid mobile number.                                                                                                                                                           |
| 1002  | Unable to register. Invalid email id.                                                                                                                                                                |
| 1003  | Unable to register. Invalid external id.                                                                                                                                                             |
| 1004  | Failed to populate store.                                                                                                                                                                            |
| 1006  | Unable to register. Mobile number is required.                                                                                                                                                       |
| 1007  | Unable to register customer. No valid primary identifier mobile number, email ID, or external ID passed.                                                                                             |
| 1008  | Unable to register with external id.                                                                                                                                                                 |
| 10100 | Failed to generate external ID for customer profile. All candidate IDs are already in use or the maximum external ID does not match the configured prefix or suffix. Customer registration failed.   |
| 1009  | Unable to add registered customer to MLM.                                                                                                                                                            |
| 1010  | Unable to update loyalty points of the customer.                                                                                                                                                     |
| 1011  | Cannot find customer for provided identifier.                                                                                                                                                        |
| 1012  | Cannot find customer with the provided mobile number/external ID/e-mail ID.                                                                                                                          |
| 1013  | Customer is not registered for the loyalty Program.                                                                                                                                                  |
| 1014  | Customer is registered already.                                                                                                                                                                      |
| 1015  | No identifier provided to get loyalty users.                                                                                                                                                         |
| 1016  | Unable to register. Email provided already exists for some other user.                                                                                                                               |
| 1017  | Provided Custom Field is invalid.                                                                                                                                                                    |
| 1018  | Unable to update custom field.                                                                                                                                                                       |
| 1019  | Mobile number or external id is required along with the email Id to register.                                                                                                                        |
| 1020  | The customer is not registered for loyalty program.                                                                                                                                                  |
| 1021  | Invalid validation code.                                                                                                                                                                             |
| 1023  | Unable to register customer to loyalty program.                                                                                                                                                      |
| 1024  | Unable to update customer profile.                                                                                                                                                                   |
| 1025  | Mandatory fields are not matching for customer identity update.                                                                                                                                      |
| 1026  | Count of optional fields match is less than required.                                                                                                                                                |
| 1027  | Field name provided for verification is invalid.                                                                                                                                                     |
| 1028  | No customer notes are available.                                                                                                                                                                     |
| 1029  | Unable to retrieve customer preferences.                                                                                                                                                             |
| 1030  | Unable to update customer preferences.                                                                                                                                                               |
| 1031  | No preferences set for this customer.                                                                                                                                                                |
| 1032  | A customer already exists with the same mobile number.                                                                                                                                               |
| 1033  | A customer already exists with the same external id.                                                                                                                                                 |
| 1034  | Unable to register. Registration date is not within the allowed past or future date limit.                                                                                                           |
| 1035  | Unable to update few customer preferences.                                                                                                                                                           |
| 1036  | One or more notes could not be added/updated for customer.                                                                                                                                           |
| 1037  | Unable to add/update customer notes.                                                                                                                                                                 |
| 1039  | Unable to register. Email ID is required.                                                                                                                                                            |
| 1041  | Customer id change request failed.                                                                                                                                                                   |
| 1042  | Invalid mobile no/email id/external id.                                                                                                                                                              |
| 1043  | Unable to register. Customer’s external id is required.                                                                                                                                              |
| 1044  | You do not have sufficient permission to view the customer details.                                                                                                                                  |
| 1045  | No valid identifier (mobile/email) passed for non-loyalty customer.                                                                                                                                  |
| 1046  | Conversion of loyalty customer to non-loyalty is not allowed.                                                                                                                                        |
| 1047  | Customer's primary identifier not matching with other identifiers.                                                                                                                                   |
| 1048  | Customer’s email id is required to convert to loyalty customer.                                                                                                                                      |
| 1049  | Customer’s external id is required to convert to loyalty customer.                                                                                                                                   |
| 1051  | No transactions or recommendations found for the customer.                                                                                                                                           |
| 1059  | Error in customer registration. Email or Mobile is required.                                                                                                                                         |
| 1060  | Batch limit exceeded.                                                                                                                                                                                |
| 1062  | Invalid Test & Control status.                                                                                                                                                                       |
| 1088  | Unable to issue points. Please report to capillary support.                                                                                                                                          |
| 1099  | Unable to fetch tracker data for the customer.                                                                                                                                                       |
| 1101  | Invalid channel type.                                                                                                                                                                                |
| 1102  | Invalid priority type.                                                                                                                                                                               |
| 1103  | Invalid scope.                                                                                                                                                                                       |
| 1104  | Invalid identifier or no identifier passed.                                                                                                                                                          |
| 1105  | Multiple scopes are not allowed.                                                                                                                                                                     |
| 1106  | Invalid subscription status passed.                                                                                                                                                                  |
| 1107  | Invalid campaign id passed.                                                                                                                                                                          |
| 1108  | Invalid outbox id passed.                                                                                                                                                                            |
| 1109  | Unable to add, update or fetch subscription details.                                                                                                                                                 |
| 1150  | Invalid store ID passed.                                                                                                                                                                             |
| 1110  | Unable to update subscription details.                                                                                                                                                               |
| 1222  | Internal error occurred with the referral system.                                                                                                                                                    |
| 1202  | Invalid campaign token.                                                                                                                                                                              |
| 1203  | Invalid campaign configured.                                                                                                                                                                         |
| 1204  | The customer may not be eligible for the referral program.                                                                                                                                           |
| 1205  | Unable to find the referrer in the specific campaign.                                                                                                                                                |
| 1206  | Failed to add referral. Referral type is not supported.                                                                                                                                              |
| 1212  | Invalid entity type passed.                                                                                                                                                                          |
| 1213  | Invalid programId passed in request.                                                                                                                                                                 |
| 1214  | startDate is after endDate.                                                                                                                                                                          |
| 1215  | \{x} cannot be a past date.                                                                                                                                                                          |
| 1216  | The date format used for \{x} is not supported. Enter the the date in (YYYY-MM-DD) format.                                                                                                           |
| 1217  | Date mentioned is a far future date. \{x} cannot be after 100 years from now.                                                                                                                        |
| 1222  | Internal error occurred with the referral system.                                                                                                                                                    |
| 1301  | A ticket already exists with the same subject.                                                                                                                                                       |
| 1302  | Ticket registration failed.                                                                                                                                                                          |
| 1303  | Ticket subject should not be empty.                                                                                                                                                                  |
| 8011  | Invalid source account passed.                                                                                                                                                                       |
| 8013  | Customer identifier is invalid. Also check if the parameter identifierName is passed correctly.                                                                                                      |
| 8015  | No customer found with the given identifier. If the identifier belongs to a campaign user (non-loyal user), the /v2/customers/lookup endpoint will not return the user and this error will be shown. |
| 8045  | Account id is not passed.                                                                                                                                                                            |
| 8065  | No customer found in the given source with the given identifier.                                                                                                                                     |
| 8089  | Customer not registered for the Loyalty Program.                                                                                                                                                     |
| 10001 | Failed to add customer.                                                                                                                                                                              |
| 10002 | Failed to update customer details.                                                                                                                                                                   |
| 91009 | Retrieved survivor account for the requested merge victim.                                                                                                                                           |
| 91010 | Downgrade strategy is not configured.                                                                                                                                                                |
| 91020 | Invalid TILL passed for registration.                                                                                                                                                                |
| 91021 | Invalid attribution TILL passed.                                                                                                                                                                     |
| 91022 | Failed to update subscription for \{x} channel and priority \{y}.                                                                                                                                    |

### Warning Codes

| Code  | Description                                                      |
| ----- | ---------------------------------------------------------------- |
| 1053  | Preferred store specified is not found.                          |
| 91001 | Failed to get point details.                                     |
| 91002 | Failed to get subscription details.                              |
| 91003 | Failed to validate.                                              |
| 91004 | Failed to get segmentation details.                              |
| 91005 | \{x} is primary identifier and cannot be updated.                |
| 91006 | \{x} update is not allowed.                                      |
| 91007 | Failed to register. \{x} already exists for some other user.     |
| 91011 | Customer is already in the lowest slab.                          |
| 91012 | Customer is already in the highest slab.                         |
| 91013 | Call to Points Engine for tier upgrade criteria has failed \{x}. |
| 91014 | Call to Points Engine for tier renewal criteria has failed \{x}. |
| 91015 | Failed to update extended fields; or field \{x} length too long. |
| 91016 | WECHAT profile is not available for the customer.                |
| 91017 | WEB\_ENGAGE profile is not available for the customer.           |
| 91018 | Unable to load WeChat notifications.                             |
| 91019 | Unable to load Web Engage notifications.                         |