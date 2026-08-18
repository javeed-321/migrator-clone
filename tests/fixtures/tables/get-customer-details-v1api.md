---
updatedAt: 2026-08-03T06:55:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Get customer details

Retrieve details of a specific loyalty customer such as loyalty information, subscription status, 10 recent transactions, active coupons, recent store interactions, custom fields, extended fields, and customer’s unique id.

> ❗️ Make sure you have the appropriate access control configured. For more information, see [access group documentation](https://docs.capillarytech.com/docs/access-group).

Retrieve details of a specific loyalty customer such as loyalty information, subscription status, 10 recent transactions, active coupons, recent store interactions, custom fields, extended fields, and customer’s unique ID. To fetch the details for customers in bulk, add the identification details separated by a comma.

> 📘 Note:
>
> Use [V2 Get Customer Details (lookup) API](https://docs.capillarytech.com/reference/get-customer-details) to retrieve:
>
> * Customer details across all the groups of the customer.
> * Details of a specific user group.
> * Account ID for sources with multiple accounts.
> * Customer status details.
> * Alternate currency details.

# Example request

```Text For multiple customers at a time
curl --location 'https://{host}/v1.1/customer/get?format=json&email=sai.ishina9%40gmail.com%2Csai.ishina95%40gmail.com%2C9478341389%40pixar.com' \
--header 'X-CAP-CLIENT-COUNTRYCODE: 1' \
--header 'Authorization: Basic cHVuLjAxOjIwMNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0Yjcw'
```
```curl Single customer
curl --location 'https://eu.api.capillarytech.com/v1.1/customer/get?format=json&id=387020208%2C3879773' \
--header 'X-CAP-CLIENT-COUNTRYCODE: 1' \
--header 'Authorization: Basic cHVjAxOjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0Yjcw'
```

<br />

# Request Query Parameters

Any of the identifiers are mandatory.

| Parameter                       | Type    | Description                                                                                                                                                                                |
| :------------------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                              | int     | Unique user ID of the customer whose details you want to fetch.                                                                                                                            |
| email                           | string  | Email ID of the customer.                                                                                                                                                                  |
| external\_id                    | string  | External ID of the customer.                                                                                                                                                               |
| card\_external\_id              | string  | External ID of the card associated with the customer.                                                                                                                                      |
| number                          | int     | Unique transaction number that want to fetch.                                                                                                                                              |
| store\_code                     | string  | Fetch the transactions of a specific store. Pass the store code.                                                                                                                           |
| till\_code                      | string  | Fetch the transactions of a specific TILL. Pass the respective TILL code.                                                                                                                  |
| amount                          | long    | Filter transactions of a specific amount.                                                                                                                                                  |
| date                            | date    | Filter transactions of a specific date. Pass the date in `YYYY-MM-DD` format.                                                                                                              |
| type                            | string  | Filter transactions of a specific type. Values: `REGULAR`, `NOT_INTERESTED`, `RETURN`, `NOT_INTERESTED_RETURN`, `MIXED`, `NI_MIXED`, `ALL`. By default, shows regular transaction details. |
| tenders                         | boolean | Pass `true` to retrieve transaction details.                                                                                                                                               |
| credit\_notes                   | boolean | Pass `true` to retrieve credit notes.                                                                                                                                                      |
| user\_id                        | boolean | Pass `true` to retrieve unique ID of the customer in response.                                                                                                                             |
| coupon\_limit                   | int     | Limits the number of coupon interactions (issued, redeemed, and expired).                                                                                                                  |
| coupon\_offset                  | int     | Retrieves the next set of coupons according to the issuance sequence.                                                                                                                      |
| coupon\_order\_by               | enum    | Determines the basis for ordering the coupon history. Possible values: `created_date` (default), `created_by`, `valid_till`.                                                               |
| coupon\_sort\_order             | enum    | Orders coupons based on `coupon_order_by`. Values: `asc`, `desc` (default).                                                                                                                |
| next\_slab                      |         | Returns details of the customer's next loyalty tier.                                                                                                                                       |
| slab\_history                   | boolean | Prerequisite: Set `mlp=true`. Returns loyalty tier change history.                                                                                                                         |
| registered\_store               |         | Returns the store where the customer registered. Returned by default.                                                                                                                      |
| registered\_till                |         | Returns the specific store-TILL where the customer registered. Returned by default.                                                                                                        |
| fraud\_details                  |         | Returns the customer's fraud details. Returned by default.                                                                                                                                 |
| ndnc\_status                    |         | Returns the NDNC/DND status of the customer’s mobile number.                                                                                                                               |
| optin\_status                   |         | Returns the services (SMS/email) the customer has opted in or out of.                                                                                                                      |
| expiry\_schedule                |         | Returns summary of points expiry details.                                                                                                                                                  |
| expired\_points                 |         | Returns details of expired points.                                                                                                                                                         |
| points\_summary                 |         | Returns issuance and redemption history.                                                                                                                                                   |
| promotion\_points               |         | Returns promotional points history. Max 1000 results.                                                                                                                                      |
| membership\_retention\_criteria |         | Returns criteria set for membership or tier retention.                                                                                                                                     |
| tier\_upgrade\_criteria         |         | Returns tier upgrade criteria if applicable.                                                                                                                                               |
| mlp                             | boolean | Retrieves loyalty info for brands with multiple loyalty programs (MLP).                                                                                                                    |
| gap\_to\_upgrade\_for           | int     | Prerequisite: `mlp=true`. Indicates what is needed to upgrade after N days.                                                                                                                |
| gap\_to\_renew\_for             | int     | Prerequisite: `mlp=true`. Indicates what is needed to renew after N days.                                                                                                                  |
| user\_group                     |         | Retrieves user group details if available.                                                                                                                                                 |
| customer\_image                 |         | Retrieves the customer’s profile image.                                                                                                                                                    |
| transactions                    |         | Retrieves transaction details.                                                                                                                                                             |
| subscriptions                   |         | Retrieves subscription details.                                                                                                                                                            |
| segments                        |         | Retrieves customer’s segment details.                                                                                                                                                      |
| member\_care\_access            |         | For admin users, shows active customers near them.                                                                                                                                         |
| card\_details                   |         | Retrieves all card details.                                                                                                                                                                |
| delayed\_accrual                |         |                                                                                                                                                                                            |
| coupon\_active                  |         |                                                                                                                                                                                            |
| basic                           |         |                                                                                                                                                                                            |
| programId                       | int     | Loyalty program ID                                                                                                                                                                         |
| coupon\_offer                   | int     | Default value is 0.                                                                                                                                                                        |
| coupon\_org\_entity\_type       | string  |                                                                                                                                                                                            |
| coupon\_org\_entity\_value      | string  |                                                                                                                                                                                            |
| coupon\_status                  | string  |                                                                                                                                                                                            |
| program\_summary                | boolean | If enabled, retrieves the programs the customer is part of.                                                                                                                                |

Note: You can retrieve details of a customer using customer ID, email or external\_id.

<Callout icon="📘" theme="info">
  If you attempt to retrieve data of any deleted customer after a successful PII deletion, you will receive the following response:

  ` "message": "Customer is deleted after PII delete request"`
</Callout>

# Additional Header

| Parameter | Description                                                                                                                                                                                        |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| language  | Specify the ISO language code to get transaction level extended field details in your preferred language (other than English). For example, `zh` for Chinese, `id` for Indonesian, `ar` for Arabic |

# Response parameter

<Table>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        status.success
      </td>

      <td>
        Indicates the success of the operation
      </td>
    </tr>

    <tr>
      <td>
        status.code
      </td>

      <td>
        The code representing the status of the operation
      </td>
    </tr>

    <tr>
      <td>
        status.message
      </td>

      <td>
        The message describing the status of the operation
      </td>
    </tr>

    <tr>
      <td>
        status.total
      </td>

      <td>
        The total count in the response
      </td>
    </tr>

    <tr>
      <td>
        status.success_count
      </td>

      <td>
        The count of successful operations
      </td>
    </tr>

    <tr>
      <td>
        customer.firstname
      </td>

      <td>
        The first name of the customer
      </td>
    </tr>

    <tr>
      <td>
        customer.lastname
      </td>

      <td>
        The last name of the customer
      </td>
    </tr>

    <tr>
      <td>
        customer.mobile
      </td>

      <td>
        The mobile number of the customer
      </td>
    </tr>

    <tr>
      <td>
        customer.email
      </td>

      <td>
        The email address of the customer
      </td>
    </tr>

    <tr>
      <td>
        customer.external_id
      </td>

      <td>
        An external identifier for the customer
      </td>
    </tr>

    <tr>
      <td>
        customer.lifetime_points
      </td>

      <td>
        The total lifetime points accumulated by the customer.  
        If the value is beyond the data type limit, the value is represeted in scientific notation. For example, the value `5,632,820,109` is represented as `5.632820109E9`.
      </td>
    </tr>

    <tr>
      <td>
        customer.lifetime_purchases
      </td>

      <td>
        The total lifetime purchases made by the customer.   
        If the value is beyond the data type limit, the value is represeted in scientific notation. For example, the value `5,632,820,109` is represented as `5.632820109E9`.
      </td>
    </tr>

    <tr>
      <td>
        customer.loyalty_points
      </td>

      <td>
        The current loyalty points of the customer
      </td>
    </tr>

    <tr>
      <td>
        customer.current_slab
      </td>

      <td>
        The current slab of the customer in the loyalty program
      </td>
    </tr>

    <tr>
      <td>
        customer.registered_on
      </td>

      <td>
        The date and time when the customer registered
      </td>
    </tr>

    <tr>
      <td>
        customer.updated_on
      </td>

      <td>
        The date and time when the customer's information was last updated
      </td>
    </tr>

    <tr>
      <td>
        customer.type
      </td>

      <td>
        The type of customer
      </td>
    </tr>

    <tr>
      <td>
        customer.source
      </td>

      <td>
        The source through which the customer was acquired
      </td>
    </tr>

    <tr>
      <td>
        customer.registered_by
      </td>

      <td>
        The individual who registered the customer
      </td>
    </tr>

    <tr>
      <td>
        registered_store.code
      </td>

      <td>
        The code of the store where the customer was registered
      </td>
    </tr>

    <tr>
      <td>
        registered_store.name
      </td>

      <td>
        The name of the store where the customer was registered
      </td>
    </tr>

    <tr>
      <td>
        registered_till.code
      </td>

      <td>
        The code of the till used to register the customer
      </td>
    </tr>

    <tr>
      <td>
        registered_till.name
      </td>

      <td>
        The name of the till used to register the customer
      </td>
    </tr>

    <tr>
      <td>
        fraud_details.status
      </td>

      <td>
        The fraud status of the customer
      </td>
    </tr>

    <tr>
      <td>
        extended_fields.field (gender)
      </td>

      <td>
        The gender of the customer
      </td>
    </tr>

    <tr>
      <td>
        extended_fields.field (city)
      </td>

      <td>
        The city where the customer resides
      </td>
    </tr>

    <tr>
      <td>
        extended_fields.field (dob)
      </td>

      <td>
        The date of birth of the customer
      </td>
    </tr>

    <tr>
      <td>
        item_status.success
      </td>

      <td>
        Indicates the success of the customer item operation
      </td>
    </tr>

    <tr>
      <td>
        item_status.code
      </td>

      <td>
        The code representing the status of the customer item operation
      </td>
    </tr>

    <tr>
      <td>
        item_status.message
      </td>

      <td>
        The message describing the status of the customer item operation
      </td>
    </tr>

    <tr>
      <td>
        programs_list
      </td>

      <td>
        Includes the list of programs the customer is associated with. This will be available only if `program_summary` is set to `true`.
      </td>
    </tr>

    <tr>
      <td>
        program
      </td>

      <td>
        Includes the details of the program such as program ID, program name, program description and more.
      </td>
    </tr>

    <tr>
      <td>
        slab_history
      </td>

      <td>
        Includes details of tier/slab change events. Each object in the array represents a single instance of a slab (tier) upgrade or change, with the most recent change typically listed first.
      </td>
    </tr>

    <tr>
      <td>
        -to
      </td>

      <td>
        The slab to which the user got upgraded or downgraded.
      </td>
    </tr>

    <tr>
      <td>
        -from
      </td>

      <td>
        The slab from which the user got upgraded or downgraded.
      </td>
    </tr>

    <tr>
      <td>
        -store
      </td>

      <td>
        Associated store details.
      </td>
    </tr>

    <tr>
      <td>
        * type
      </td>

      <td>
        Type of slab change. Downgrade or Upgrade.
      </td>
    </tr>

    <tr>
      <td>
        -to_tier_expiry_date
      </td>

      <td>
        Expiry date of the tier to which the customer has moved, in `YYYY-MM-DD HH:MM:SS` format.
      </td>
    </tr>

    <tr>
      <td>
        -from_tier_expiry_date
      </td>

      <td>
        Expiry date of the customer's previous tier, before the tier change occurred, in `YYYY-MM-DD HH:MM:SS` format.
      </td>
    </tr>

    <tr>
      <td>
        -changed_on
      </td>

      <td>
        The date on which slab was changed, in `YYYY-MM-DD HH:MM:SS` format.
      </td>
    </tr>

    <tr>
      <td>
        -notes
      </td>

      <td>
        Additional notes, if any.
      </td>
    </tr>

    <tr>
      <td>
        -program_id
      </td>

      <td>
        Associated loyalty program ID.
      </td>
    </tr>

    <tr>
      <td>
        points_summaries
      </td>

      <td>
        Array containing the details of the loyalty points. Note: You need to 'mlp=true' to retrieve 'points_summaries' in the API response
      </td>
    </tr>

    <tr>
      <td>
        -points_summary
      </td>

      <td>
        A list of individual points summaries.
      </td>
    </tr>

    <tr>
      <td>
        --programId
      </td>

      <td>
        Unique ID of the loyalty program associated with the points summary.
      </td>
    </tr>

    <tr>
      <td>
        --redeemed
      </td>

      <td>
        Number of points redeemed by the customer in the program.
      </td>
    </tr>

    <tr>
      <td>
        --expired
      </td>

      <td>
        Number of points that have expired in the program.
      </td>
    </tr>

    <tr>
      <td>
        --returned
      </td>

      <td>
        Number of points that were initially issued but later reversed or returned to the customer’s account due to specific actions, such as product returns.
      </td>
    </tr>

    <tr>
      <td>
        --adjusted
      </td>

      <td>
        Points that are either credited to or debited from the customer account in adjustments. The value will be negative if debited points are more than credited, and positive if credited points are more than debited.
      </td>
    </tr>

    <tr>
      <td>
        --lifetimePoints
      </td>

      <td>
        Total loyalty points earned by the customer to date.  
        If the value is beyond the data type limit, the value is represeted in scientific notation. For example, the value `5,632,820,109` is represented as `5.632820109E9`.
      </td>
    </tr>

    <tr>
      <td>
        --loyaltyPoints
      </td>

      <td>
        Current loyalty points available for use.  
        If the value is beyond the data type limit, the value is represeted in scientific notation. For example, the value `5,632,820,109` is represented as `5.632820109E9`.
      </td>
    </tr>

    <tr>
      <td>
        --cumulativePurchases
      </td>

      <td>
        Total purchase amount of the customer, associated with the current loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        --currentSlab
      </td>

      <td>
        Current tier of the customer in the loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        --currentSlabDescription
      </td>

      <td>
        Description of the current tier as saved in the loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        --nextSlab
      </td>

      <td>
        Next slab or tier to which the customer can upgrade to.
      </td>
    </tr>

    <tr>
      <td>
        --nextSlabSerialNumber
      </td>

      <td>
        Serial number of the next tier. The lowest tier will have 1, succeeding tier will have 2 and so on.
      </td>
    </tr>

    <tr>
      <td>
        --nextSlabDescription
      </td>

      <td>
        Description of the next tier as saved in the loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        --slabSNo
      </td>

      <td>
        Serial number of the current tier of the customer. The lowest tier will have 1, succeeding tier will have 2 and so on.
      </td>
    </tr>

    <tr>
      <td>
        --slabExpiryDate
      </td>

      <td>
        Expiry date of the current loyalty tier of the customer in ISO `YYYY-MM-DD HH:MM:SS` format.
      </td>
    </tr>

    <tr>
      <td>
        --totalPoints
      </td>

      <td>
        Total points earned by the customer in a loyalty program.  
        If the value is beyond the data type limit, the value is represeted in scientific notation. For example, the value `5,632,820,109` is represented as `5.632820109E9`.
      </td>
    </tr>

    <tr>
      <td>
        --delayed_points
      </td>

      <td>
        Points issued to customers at a later date from issual. For more information on delayed points, refer to the

        [Points Delayed Accrual](https://docs.capillarytech.com/docs/points#configure-points-delayed-accrual)

        documentation.
      </td>
    </tr>

    <tr>
      <td>
        --delayed_returned_points
      </td>

      <td>
        Delayed points that were reversed or returned to the customer’s account due to specific actions, such as product returns.
      </td>
    </tr>

    <tr>
      <td>
        --total_available_points
      </td>

      <td>
        Total points available for redemption.  
        If the value is beyond the data type limit, the value is represeted in scientific notation. For example, the value `5,632,820,109` is represented as `5.632820109E9`.
      </td>
    </tr>

    <tr>
      <td>
        --total_returned_points
      </td>

      <td>
        Total points that were initially issued but later reversed or returned to the customer’s account due to specific actions, such as product returns.  
        If the value is beyond the data type limit, the value is represeted in scientific notation. For example, the value `5,632,820,109` is represented as `5.632820109E9`.
      </td>
    </tr>

    <tr>
      <td>
        --program_title
      </td>

      <td>
        Title of the loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        --program_description
      </td>

      <td>
        Description of the loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        --program_points_to_currency_ratio
      </td>

      <td>
        Ratio of points to currency. It indicates how many points are equivalent to one unit of currency.
      </td>
    </tr>

    <tr>
      <td>
        --linked_partner_programs
      </td>

      <td>
        Details of linked

        [partner programs](https://docs.capillarytech.com/reference/partner-program)

        .
      </td>
    </tr>

    <tr>
      <td>
        ---linked_partner_program
      </td>

      <td>
        A list of linked partner programs, if any.
      </td>
    </tr>

    <tr>
      <td>
        --gap_to_upgrade
      </td>

      <td>
        Gap to upgrade to the next slab. It is the additional purchases, points, visits, or tracker value required for a customer to upgrade to the next tier.
      </td>
    </tr>

    <tr>
      <td>
        ---custom_expression
      </td>

      <td>
        Logical condition that defines the criteria for upgrade. **Example:** `((A AND B) OR C)`
        A and B must both be true, OR C alone must be true for the condition to be satisfied.
        Example usage: If A = Total Purchases > 5000, B = Visits > 3, and C = Points Earned > 2000, the customer qualifies for an upgrade if they either:
        Made purchases > 5000 and visit more than 3 times, or
        Earned more than 2000 points.
        Visible only if custom expression is set.
        For more information on custom conditions, refer to the

        [Tier Upgrade](https://docs.capillarytech.com/docs/tier-upgrade#3-custom-condition)

        documentation.
      </td>
    </tr>

    <tr>
      <td>
        ---expression_relation
      </td>

      <td>
        Structured representation of the conditions in the custom_expression. **Example:** `[[1, 2], [3]]`
        Visible only if custom expression is set.
      </td>
    </tr>

    <tr>
      <td>
        ---upgrade_strategy
      </td>

      <td>
        Provides the set of rules or conditions that defines how a customer progresses to a higher tier in a loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        ----upgrade_based_on
      </td>

      <td>
        Parameter using which the

        [upgrade condition](https://docs.capillarytech.com/docs/tier-upgrade)

        is determined. **Example:** `CUMULATIVE_PURCHASES`; `TRACKER_VALUE_BASED`, `CURRENT_POINTS`
      </td>
    </tr>

    <tr>
      <td>
        ----upgrade_entity_identifers
      </td>

      <td>
        Array containing details of the tracker, if any. Visible in case of

        [tracker based upgrade](https://docs.capillarytech.com/docs/tier-upgrade#4-trackers)

        .
      </td>
    </tr>

    <tr>
      <td>
        -----tracker_name
      </td>

      <td>
        Name of the tracker. **Example:** `amountTracker`
      </td>
    </tr>

    <tr>
      <td>
        -----tracker_type
      </td>

      <td>
        Entity tracked, such as transaction amount, line-item count, or customer visits. **Example:** `BILL_AMOUNT`
      </td>
    </tr>

    <tr>
      <td>
        -----tracker_mode
      </td>

      <td>
        Method used to evaluate tracker values over time, **Example:** `MOVING_WINDOW`, `CYCLIC_WINDOW`, `CALENDAR_BASED_CYCLIC_WINDOW`, or `TIER_CHANGE_WINDOW`.
      </td>
    </tr>

    <tr>
      <td>
        -----tracker_case_name
      </td>

      <td>
        Name of the specific tracker case. **Example:** `amtTrack`.
      </td>
    </tr>

    <tr>
      <td>
        -----tracker_case_period_type
      </td>

      <td>
        Specifies the duration type for evaluating the tracker case, such as days, months, or calendar cycles. **Example:** `DAYS`
      </td>
    </tr>

    <tr>
      <td>
        -----tracker_case_period_value
      </td>

      <td>
        Value of the tracker case period. **Example:** `30`
      </td>
    </tr>

    <tr>
      <td>
        ----upgrade_threshold
      </td>

      <td>
        Threshold value required for an upgrade. **Example:** `10000` points.
      </td>
    </tr>

    <tr>
      <td>
        ----customer_upgrade_entity_values
      </td>

      <td>
        Array containing the current values related to the customer’s upgrade.
      </td>
    </tr>

    <tr>
      <td>
        -----current_value
      </td>

      <td>
        Current value attained by the customer. **Example:** `9786` points.
      </td>
    </tr>

    <tr>
      <td>
        -----gap_to_upgrade
      </td>

      <td>
        Additional value required for the upgrade. **Example:** `15214` points (threshold value minus current value)
      </td>
    </tr>

    <tr>
      <td>
        -----value_valid_upto
      </td>

      <td>
        Date until which the value is valid, in `YYYY-MM-DD` format. **Example:** `2025-05-06`.

        **Note:**
        The `value_valid_upto` field is calculated as the first qualifying award date in the current evaluation window (or today’s date if no award exists) plus the tracker period (for example, 365 days).  
        If the first qualifying award occurs after the cycle start, `value_valid_upto` will be later than the cycle end.

        For example, ff the tracker cycle runs from August 21, 2025, to August 21, 2026, the cycle's actual end date is August 21, 2026.

        A customer earns their first award in this cycle on October 30, 2025. The `value_valid_upto` date will now be  October 30, 2026 (the first award date + 365 days).

        Due to this, the `value_valid_upto` date (October 30, 2026) is later than your cycle's actual end date (August 21, 2026).
      </td>
    </tr>

    <tr>
      <td>
        --gap_to_renew
      </td>

      <td>
        Set of rules or conditions required for tier renewal for the customer in a loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        ---tier_expiry_date
      </td>

      <td>
        Expiry date of the customer’s current tier, in `YYYY-MM-DD` format. **Example:** `2024-12-31`.
      </td>
    </tr>

    <tr>
      <td>
        ---renew_confirmed
      </td>

      <td>
        Indicates if the tier renewal is confirmed. **Values:** `true` or `false`.
      </td>
    </tr>

    <tr>
      <td>
        ---custom_expression
      </td>

      <td>
        Logical condition that defines the criteria for renewal. **Example:** `((A AND B) OR C)`
        A and B must both be true, OR C alone must be true for the condition to be satisfied.
        Example usage: If A = Total Purchases > 5000, B = Visits > 3, and C = Points Earned > 2000, the customer qualifies for an upgrade if they either:
        Made purchases > 5000 and visited more than 3 times, or
        Earned more than 2000 points.
        Visible only if custom expression is set.
        For more information on custom conditions, refer to the

        [Tier Renewal](https://docs.capillarytech.com/docs/tier-downgrade-renewal)

        documentation.
      </td>
    </tr>

    <tr>
      <td>
        ---expression_relation
      </td>

      <td>
        Structured representation of the conditions in the custom_expression. **Example:** `[[1, 2], [3]]`
        Visible only if custom expression is set.
      </td>
    </tr>

    <tr>
      <td>
        ---renew_strategy
      </td>

      <td>
        Array containing details of the rules or conditions for tier renewal.
      </td>
    </tr>

    <tr>
      <td>
        ----renew_based_on
      </td>

      <td>
        Specifies the

        [renewal strategy](https://docs.capillarytech.com/docs/tier-downgrade-renewal)

        . **Example:** `VISITS`, `PURCHASE`, `POINTS`, or `TRACKER`.
      </td>
    </tr>

    <tr>
      <td>
        ----renew_entity_identifiers
      </td>

      <td>
        Array containing details of the tracker. Visible in case of

        [tracker based renewal](https://docs.capillarytech.com/docs/tier-downgrade-renewal#4-trackers)

        .
      </td>
    </tr>

    <tr>
      <td>
        ----renew_threshold
      </td>

      <td>
        Threshold value required by the customer to renew the tier. **Example:** `5.0` for store visits, `10` for purchases.
      </td>
    </tr>

    <tr>
      <td>
        ----customer_renew_entity_value
      </td>

      <td>
        Current value reached by the customer. **Example:** `1` store visit or `123` points
      </td>
    </tr>

    <tr>
      <td>
        ----customer_gap_to_renew_value
      </td>

      <td>
        Additional value required for the tier renewal. **Example:** `4` store visits, `10` purchases or `1877` points.
      </td>
    </tr>
  </tbody>
</Table>

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "customer-v11",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://{host}/v1.1",
      "variables": {
        "host": {
          "default": "host"
        }
      }
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "http",
        "scheme": "basic"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/customer/get": {
      "get": {
        "summary": "Get customer details",
        "description": "Retrieve details of a specific loyalty customer such as loyalty information, subscription status, 10 recent transactions, active coupons, recent store interactions, custom fields, extended fields, and customer’s unique id.",
        "operationId": "get-customer-details-v1",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "Unique user ID of the customer.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "email",
            "in": "query",
            "description": "Email of the customer",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "external_id",
            "in": "query",
            "description": "External ID of the customer.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "coupon_limit",
            "in": "query",
            "description": "Limits the number of coupon interactions (issued,redeemed and expired). Example: coupon_limit=5 retrieves five recent coupon interactions.",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "coupon_offset",
            "in": "query",
            "description": "Retrieves next set of coupons according to issual sequence. For example, if 10 coupons are issued to a customer till date, then coupon_offset=6, returns the 7th, 8th, 9th, and 10th coupon (ignoring the first 6 coupons).",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "coupon_order_by",
            "in": "query",
            "description": "On what basis coupon history need to order.",
            "schema": {
              "type": "string",
              "enum": [
                "created_date",
                "created_by",
                "valid_till"
              ]
            }
          },
          {
            "name": "coupon_sort_order",
            "in": "query",
            "description": "Orders coupons in ascending or descending order based on the coupon_order_by value",
            "schema": {
              "type": "string",
              "enum": [
                "asc",
                "desc"
              ]
            }
          },
          {
            "name": "user_id",
            "in": "query",
            "description": "Pass `true` to fetch unique ID of the customer.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "next_slab",
            "in": "query",
            "description": "Pass `true` to get the details of the next loyalty tier of the customer such as next_slab, next_slab_serial_number, next_slab_description, trackers value (for tracker based strategy), and current_nps_status.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "slab_history",
            "in": "query",
            "description": "Pass `true` to return the details of loyalty tier changes of the customer.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "registered_store",
            "in": "query",
            "description": "Pass `true` to return the store at which the customer is registered. This is returned by default.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "registered_till",
            "in": "query",
            "description": "Pass `true` to return the store-TILL at which the customer is registered. This is returned by default.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "fraud_details",
            "in": "query",
            "description": "Pass `true` to return the fraud details of a customer. This field is returned by default.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "ndnc_status",
            "in": "query",
            "description": "Pass `true` to return the status of the customer’s registered mobile number on NDNC/DND.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "optin_status",
            "in": "query",
            "description": "Pass `true` to return the services (SMS/email) to which the customer has opted in and opted out.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "expiry_schedule",
            "in": "query",
            "description": "Pass `true` to return the details of points expiry summary with number of points to expire, program ID, and date and time of expiry.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "expired_points",
            "in": "query",
            "description": "Pass `true` to return the details of expired points of the customer.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "points_summary",
            "in": "query",
            "description": "Pass `true` to return the history of points issued and redeemed",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "promotion_points",
            "in": "query",
            "description": "Pass `true` to return the history of promotional points issued and redeemed. It also shows the store that issued the points and expiry date for each set of points issued. You can get up to 1000 results (maximum limit).",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "membership_retention_criteria",
            "in": "query",
            "description": "Pass `true` to return the criteria set for membership or tier retention (usually for membership based loyalty program).",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "tier_upgrade_criteria",
            "in": "query",
            "description": "Pass `true` to return the tier upgrade criteria configured in tier_update_criteria object of response payload. This is supported only if the tier upgrade strategy is based on Lifetime Points, Lifetime Purchases, or Current Points, but not on tracker based strategy. Also, you will not see upgrade criteria if the customer is in the highest tier.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "mlp",
            "in": "query",
            "description": "Pass `true` to return loyalty information of the customer for each loyalty program including the gap to upgrade and gap to renew details. Different program details are applicable only for brands with multiple loyalty programs (MLP).",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "gap_to_upgrade_for",
            "in": "query",
            "description": "See the gap after a specific number of days from the current day. Gap is the value of the tier upgrade parameter (purchases/points/tracker) yet to allocate to upgrade the customer’s current tier. Pass 0 to get the gap as of the current day, 1 to get the gap as of the next day, 30 to get the gap as of the 30th day from the current day. The gap might change with days for tracker value based tier upgrade strategy. No negative values are supported.",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "gap_to_renew_for",
            "in": "query",
            "description": "See the gap after a specific number of days from the current day. The required value of purchases/visits/points/tracker to renew the tier (as per the configuration in tier downgrade strategy). Pass 0 to get the renewal value as of the current day, 1 to get renewal value as of the next day, 30 to get the renewal value as of the 30th day from the current day. No negative value is supported.",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "user_group",
            "in": "query",
            "description": "Pass `true` to retrieve the details of user group associated to the user (if available).",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "customer_image",
            "in": "query",
            "description": "Pass `true` to retrieve the customer’s profile image",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "transactions",
            "in": "query",
            "description": "Pass `true` to retrieve transactions of the customer.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "subscriptions",
            "in": "query",
            "description": "Pass `true` to retrieve the subscription details of the customer.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "segments",
            "in": "query",
            "description": "Pass `true` to retrieve the segment details of the customer if applicable. Segments are logical grouping of customers based on one or more parameters.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "member_care_access",
            "in": "query",
            "description": "Pass `true` for admin users, it will show customers that are active within the vicinity of that user.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "card_details",
            "in": "query",
            "description": "Pass `true` to retrieve  the details of all cards of the customer.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "tracker_info",
            "in": "query",
            "description": "Pass `true` to retrieve loyalty tracker information of the customer.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "delayed_accrual",
            "in": "query",
            "description": "Pass `true` to retrieve the customer's promised points and conversion details.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "coupon_active",
            "in": "query",
            "description": "Pass `true` to retrieve all active coupons of the customer.",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "program_id",
            "in": "query",
            "description": "Unique ID of the loyalty program to fetch loyalty details of the customer for that particular program.",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "coupon_offer",
            "in": "query",
            "description": "Unique ID of the coupon series (offer) to include offer details of the customer.",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 0
            }
          },
          {
            "name": "store_code",
            "in": "query",
            "description": "Code of the store",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "till_code",
            "in": "query",
            "description": "Till code",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "coupon_org_entity_type",
            "in": "query",
            "description": "Entity type of the coupon series.",
            "schema": {
              "type": "string",
              "enum": [
                "TILL",
                "STORE",
                "ZONE",
                "CONCEPT"
              ]
            }
          },
          {
            "name": "coupon_org_entity_value",
            "in": "query",
            "description": "Value of the specified coupon entity type.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "coupon_status",
            "in": "query",
            "description": "Get customer coupons of specific status. This is similar to get customer/coupons",
            "schema": {
              "type": "string",
              "enum": [
                "unredeemed",
                "redeemed",
                "expired",
                "active"
              ]
            }
          },
          {
            "name": "language",
            "in": "header",
            "description": "Specify the ISO language code to get transaction level extended field details in your preferred language (other than English). For example, zh for Chinese, id for Indonesian, ar for Arabic.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "program_summary",
            "in": "query",
            "description": "Set to true to fetch the active loyalty program details for the customer.",
            "schema": {
              "type": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"response\": {\n        \"status\": {\n            \"success\": \"true\",\n            \"code\": 200,\n            \"message\": \"Success\",\n            \"total\": \"1\",\n            \"success_count\": \"1\"\n        },\n        \"customers\": {\n            \"customer\": [\n                {\n                    \"firstname\": \"Rita\",\n                    \"lastname\": \"John\",\n                    \"mobile\": \"44700900999\",\n                    \"email\": \"rita.john@example.com\",\n                    \"external_id\": \"XYPZ006\",\n                    \"lifetime_points\": 500,\n                    \"lifetime_purchases\": 0,\n                    \"loyalty_points\": 500,\n                    \"current_slab\": \"Member Tier \",\n                    \"registered_on\": \"2012-09-11 11:11:15\",\n                    \"updated_on\": \"2022-02-18 08:22:34\",\n                    \"type\": \"LOYALTY\",\n                    \"source\": \"instore\",\n                    \"identifiers\": [],\n                    \"gender\": null,\n                    \"registered_by\": \"Hamilton\",\n                    \"registered_store\": {\n                        \"code\": \"webstore\",\n                        \"name\": \"Hamilton\"\n                    },\n                    \"registered_till\": {\n                        \"code\": \"Mobile App\",\n                        \"name\": \"bukl.ind.solution\"\n                    },\n                    \"user_groups2\": [],\n                    \"fraud_details\": {\n                        \"status\": \"NONE\",\n                        \"marked_by\": \"\",\n                        \"modified_on\": \"\",\n                        \"reason\": \"\"\n                    },\n                    \"trackers\": \"\",\n                    \"current_nps_status\": null,\n                    \"custom_fields\": {\n                        \"field\": []\n                    },\n                    \"extended_fields\": {\n                        \"field\": [\n                            {\n                                \"name\": \"gender\",\n                                \"value\": \"Female\"\n                            },\n                            {\n                                \"name\": \"city\",\n                                \"value\": \"Bangalore\"\n                            },\n                            {\n                                \"name\": \"dob\",\n                                \"value\": \"1998-09-01 00:00:00\"\n                            }\n                        ]\n                    },\n                    \"transactions\": {\n                        \"transaction\": []\n                    },\n                    \"coupons\": {\n                        \"coupon\": []\n                    },\n                    \"notes\": [],\n                    \"points_summaries\": {\n                        \"points_summary\": []\n                    },\n                    \"item_status\": {\n                        \"success\": \"true\",\n                        \"code\": \"1000\",\n                        \"message\": \"Customer successfully retrieved\",\n                        \"warnings\": {\n                            \"warning\": []\n                        }\n                    }\n                }\n            ]\n        }\n    }\n}"
                  },
                  "Sample Response for GAP_TO_UPGRADE_FOR": {
                    "value": "{\n\t\"gap_to_upgrade\": {\n\t\t\"upgrade_strategy\": [{\n\t\t\t\"upgrade_based_on\": \"TRACKER_VALUE_BASED\",\n\t\t\t\"upgrade_entity_identifers\": {\n\t\t\t\t\"tracker_name\": \"2 Years Upgrade Tracker\",\n\t\t\t\t\"tracker_type\": \"BILL_AMOUNT\",\n\t\t\t\t\"tracker_mode\": \"MOVING_WINDOW\",\n\t\t\t\t\"tracker_case_name\": \"730Days_Case\",\n\t\t\t\t\"tracker_case_period_type\": \"DAYS\",\n\t\t\t\t\"tracker_case_period_value\": \"730\"\n\t\t\t},\n\t\t\t\"upgrade_threshold\": \"25000\",\n\t\t\t\"customer_upgrade_entity_values\": {\n\t\t\t\t\"current_value\": \"9786\",\n\t\t\t\t\"gap_to_upgrade\": \"15214\",\n\t\t\t\t\"value_valid_upto\": \"2022-05-06\"\n\t\t\t}\n\t\t}]\n\t}\n}"
                  },
                  "Sample response snippet of GAP_TO_RENEW_FOR": {
                    "value": "# For upgrade based on lifetime points\n\n...\n\"gap_to_renew\": {\n  \"tier_expiry_date\": \"2020-09-03\",\n  \"renew_confirmed\": \"false\",\n  \"renew_strategy\": [\n    {\n      \"renew_based_on\": \"VISITS\",\n      \"renew_entity_identifiers\": {},\n      \"renew_threshold\": \"56000\",\n      \"customer_renew_entity_value\": \"1\",\n      \"customer_gap_to_renew_value\": \"55999\"\n    },\n    {\n      \"renew_based_on\": \"PURCHASE\",\n      \"renew_entity_identifiers\": {},\n      \"renew_threshold\": \"30000\",\n      \"customer_renew_entity_value\": \"1200\",\n      \"customer_gap_to_renew_value\": \"28800\"\n    },\n    {\n      \"renew_based_on\": \"POINTS\",\n      \"renew_entity_identifiers\": {},\n      \"renew_threshold\": \"50000\",\n      \"customer_renew_entity_value\": \"460\",\n      \"customer_gap_to_renew_value\": \"49540\"\n    }\n  ]\n}"
                  },
                  "Sample response for user_id": {
                    "value": "{\n    \"response\": {\n        \"status\": {\n            \"success\": \"true\",\n            \"code\": 200,\n            \"message\": \"Success\",\n            \"total\": \"1\",\n            \"success_count\": \"1\"\n        },\n        \"customers\": {\n            \"customer\": [\n                {\n                    \"firstname\": \"Tom\",\n                    \"lastname\": \"Sawyer\",\n                    \"mobile\": \"9988776655\",\n                    \"email\": \"tom.sawyer@gmail.com\",\n                    \"external_id\": null,\n                    \"lifetime_points\": 26447.104,\n                    \"lifetime_purchases\": 183159,\n                    \"loyalty_points\": 12869,\n                    \"current_slab\": \"Platinum\",\n                    \"registered_on\": \"2019-04-14 11:32:30\",\n                    \"updated_on\": \"2023-09-11 08:28:08\",\n                    \"type\": \"LOYALTY\",\n                    \"source\": \"instore\",\n                    \"identifiers\": [\n                    ],\n                    \"gender\": null,\n                    \"registered_by\": \"FG\",\n                    \"registered_store\": {\n                        \"code\": \"changi\",\n                        \"name\": \"FG\"\n                    },\n                    \"registered_till\": {\n                        \"code\": \"changi.str.till_3\",\n                        \"name\": \"changi.str.till_3\"\n                    },\n                    \"user_groups2\": [\n                    ],\n                    \"fraud_details\": {\n                        \"status\": \"NOT_FRAUD\",\n                        \"marked_by\": \"1491395484_Achyuthanandan\",\n                        \"modified_on\": \"2021-11-23 13:12:39\",\n                        \"reason\": \"\"\n                    },\n                    \"trackers\": \"\",\n                    \"user_id\": \"98662653\",\n                    \"current_nps_status\": null,\n                    \"custom_fields\": {\n                        \"field\": [\n                            {\n                                \"name\": \"gender\",\n                                \"value\": \"M\"\n                            },\n                            {\n                                \"name\": \"age_group\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"dateofbirth\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"anniversary\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"tnc\",\n                                \"value\": \"yes\"\n                            },\n                            {\n                                \"name\": \"kid_name\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"kid_birthday\",\n                                \"value\": \"\"\n                            }\n                        ]\n                    },\n                    \"extended_fields\": {\n                        \"field\": [\n                            {\n                                \"name\": \"newsletter_sms\",\n                                \"value\": \"Optin\"\n                            },\n                            {\n                                \"name\": \"newsletter_email\",\n                                \"value\": \"Optin\"\n                            },\n                            {\n                                \"name\": \"gender\",\n                                \"value\": \"Male\"\n                            },\n                            {\n                                \"name\": \"city\",\n                                \"value\": \"Bangalore\"\n                            },\n                            {\n                                \"name\": \"state\",\n                                \"value\": \"Karnataka\"\n                            },\n                            {\n                                \"name\": \"newsletter_mobile_push\",\n                                \"value\": \"Optin\"\n                            }\n                        ]\n                    },\n                    \"transactions\": {\n                        \"transaction\": [\n                            {\n                                \"id\": \"373930882\",\n                                \"number\": \"numtest-1239\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-05 17:07:23\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373886128\",\n                                \"number\": \"test-988\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-04 07:26:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373886281\",\n                                \"number\": \"test-990\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-04 06:26:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373886143\",\n                                \"number\": \"test-989\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-04 04:26:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373872731\",\n                                \"number\": \"test-893\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-03 01:36:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373885837\",\n                                \"number\": \"test-987\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-01 07:26:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"374064490\",\n                                \"number\": \"1681474932\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-03-10 18:48:42\",\n                                \"store\": \"till.maruthi\"\n                            },\n                            {\n                                \"id\": \"374100475\",\n                                \"number\": \"1681711163\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-03-10 18:48:42\",\n                                \"store\": \"till.maruthi\"\n                            },\n                            {\n                                \"id\": \"371742353\",\n                                \"number\": \"787973\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2022-11-25 12:12:12\",\n                                \"store\": \"del.101\"\n                            },\n                            {\n                                \"id\": \"371742352\",\n                                \"number\": \"787975\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2022-11-25 11:11:11\",\n                                \"store\": \"del.101\"\n                            },\n                            {\n                                \"id\": \"14426636\",\n                                \"number\": \"03122020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14426792\",\n                                \"number\": \"03122020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14429363\",\n                                \"number\": \"03122020x005\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14095948\",\n                                \"number\": \"20102020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-20 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092608\",\n                                \"number\": \"19102020x003\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092676\",\n                                \"number\": \"19102020x005\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092493\",\n                                \"number\": \"19102020x002\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            }\n                        ]\n                    },\n                    \"coupons\": {\n                        \"coupon\": [\n                            {\n                                \"id\": \"483792674\",\n                                \"series_id\": \"249170\",\n                                \"code\": \"X2Y7AP5MWG\",\n                                \"description\": \"Offer3\",\n                                \"created_date\": \"2023-01-04 19:47:12\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"483783581\",\n                                \"series_id\": \"249172\",\n                                \"code\": \"GHD8FL854Z\",\n                                \"description\": \"offer2\",\n                                \"created_date\": \"2023-01-04 19:47:04\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"475850391\",\n                                \"series_id\": \"220203\",\n                                \"code\": \"PP97XDRLFM\",\n                                \"description\": \"5% Journey - welcome\",\n                                \"created_date\": \"2022-11-25 20:35:17\",\n                                \"valid_till\": \"2198-12-31 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"475506448\",\n                                \"series_id\": \"226056\",\n                                \"code\": \"PGQVP8WYAM\",\n                                \"description\": \"Harris Farm- ServiceSeeking 10% off\",\n                                \"created_date\": \"2022-11-23 20:30:20\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"454473807\",\n                                \"series_id\": \"142654\",\n                                \"code\": \"WL2ZBJZK\",\n                                \"description\": \"test offer 1\",\n                                \"created_date\": \"2022-05-30 18:10:48\",\n                                \"valid_till\": \"2122-03-08 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179951\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"PT4I43YN\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:06:03\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"true\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179950\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"RI1N4QGF\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:06:00\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179949\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"2E1EF57U\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:05:58\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179948\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"1T5QTYLB\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:05:54\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"270322657\",\n                                \"series_id\": \"18426\",\n                                \"code\": \"IC7FX1EF\",\n                                \"description\": \"Test Offer 20\",\n                                \"created_date\": \"2020-03-26 15:10:19\",\n                                \"valid_till\": \"2120-02-11 23:59:59\",\n                                \"redeemed\": \"true\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            }\n                        ]\n                    },\n                    \"notes\": [\n                    ],\n                    \"points_summaries\": {\n                        \"points_summary\": [\n                        ]\n                    },\n                    \"item_status\": {\n                        \"success\": \"true\",\n                        \"code\": \"1000\",\n                        \"message\": \"Customer successfully retrieved\",\n                        \"warnings\": {\n                            \"warning\": [\n                            ]\n                        }\n                    }\n                }\n            ]\n        }\n    }\n}\n"
                  },
                  "Sample response for coupon_order_by": {
                    "value": "{\n    \"response\": {\n        \"status\": {\n            \"success\": \"true\",\n            \"code\": 200,\n            \"message\": \"Success\",\n            \"total\": \"1\",\n            \"success_count\": \"1\"\n        },\n        \"customers\": {\n            \"customer\": [\n                {\n                    \"firstname\": \"Tom\",\n                    \"lastname\": \"Sawyer\",\n                    \"mobile\": \"9988776655\",\n                    \"email\": \"tom.sawyer@gmail.com\",\n                    \"external_id\": null,\n                    \"lifetime_points\": 26447.104,\n                    \"lifetime_purchases\": 183159,\n                    \"loyalty_points\": 12869,\n                    \"current_slab\": \"Platinum\",\n                    \"registered_on\": \"2019-04-14 11:32:30\",\n                    \"updated_on\": \"2023-09-11 08:28:08\",\n                    \"type\": \"LOYALTY\",\n                    \"source\": \"instore\",\n                    \"identifiers\": [\n                    ],\n                    \"gender\": null,\n                    \"registered_by\": \"FG\",\n                    \"registered_store\": {\n                        \"code\": \"changi\",\n                        \"name\": \"FG\"\n                    },\n                    \"registered_till\": {\n                        \"code\": \"changi.str.till_3\",\n                        \"name\": \"changi.str.till_3\"\n                    },\n                    \"user_groups2\": [\n                    ],\n                    \"fraud_details\": {\n                        \"status\": \"NOT_FRAUD\",\n                        \"marked_by\": \"1491395484_Achyuthanandan\",\n                        \"modified_on\": \"2021-11-23 13:12:39\",\n                        \"reason\": \"\"\n                    },\n                    \"trackers\": \"\",\n                    \"current_nps_status\": null,\n                    \"custom_fields\": {\n                        \"field\": [\n                            {\n                                \"name\": \"gender\",\n                                \"value\": \"M\"\n                            },\n                            {\n                                \"name\": \"age_group\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"dateofbirth\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"anniversary\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"tnc\",\n                                \"value\": \"yes\"\n                            },\n                            {\n                                \"name\": \"kid_name\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"kid_birthday\",\n                                \"value\": \"\"\n                            }\n                        ]\n                    },\n                    \"extended_fields\": {\n                        \"field\": [\n                            {\n                                \"name\": \"newsletter_sms\",\n                                \"value\": \"Optin\"\n                            },\n                            {\n                                \"name\": \"newsletter_email\",\n                                \"value\": \"Optin\"\n                            },\n                            {\n                                \"name\": \"gender\",\n                                \"value\": \"Male\"\n                            },\n                            {\n                                \"name\": \"city\",\n                                \"value\": \"Bangalore\"\n                            },\n                            {\n                                \"name\": \"state\",\n                                \"value\": \"Karnataka\"\n                            },\n                            {\n                                \"name\": \"newsletter_mobile_push\",\n                                \"value\": \"Optin\"\n                            }\n                        ]\n                    },\n                    \"transactions\": {\n                        \"transaction\": [\n                            {\n                                \"id\": \"373930882\",\n                                \"number\": \"numtest-1239\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-05 17:07:23\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373886128\",\n                                \"number\": \"test-988\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-04 07:26:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373886281\",\n                                \"number\": \"test-990\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-04 06:26:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373886143\",\n                                \"number\": \"test-989\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-04 04:26:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373872731\",\n                                \"number\": \"test-893\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-03 01:36:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"373885837\",\n                                \"number\": \"test-987\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-04-01 07:26:38\",\n                                \"store\": \"Mobile App\"\n                            },\n                            {\n                                \"id\": \"374064490\",\n                                \"number\": \"1681474932\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-03-10 18:48:42\",\n                                \"store\": \"till.maruthi\"\n                            },\n                            {\n                                \"id\": \"374100475\",\n                                \"number\": \"1681711163\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-03-10 18:48:42\",\n                                \"store\": \"till.maruthi\"\n                            },\n                            {\n                                \"id\": \"371742353\",\n                                \"number\": \"787973\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2022-11-25 12:12:12\",\n                                \"store\": \"del.101\"\n                            },\n                            {\n                                \"id\": \"371742352\",\n                                \"number\": \"787975\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2022-11-25 11:11:11\",\n                                \"store\": \"del.101\"\n                            },\n                            {\n                                \"id\": \"14426636\",\n                                \"number\": \"03122020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14426792\",\n                                \"number\": \"03122020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14429363\",\n                                \"number\": \"03122020x005\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14095948\",\n                                \"number\": \"20102020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-20 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092608\",\n                                \"number\": \"19102020x003\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092676\",\n                                \"number\": \"19102020x005\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092493\",\n                                \"number\": \"19102020x002\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            }\n                        ]\n                    },\n                    \"coupons\": {\n                        \"coupon\": [\n                            {\n                                \"id\": \"483792674\",\n                                \"series_id\": \"249170\",\n                                \"code\": \"X2Y7AP5MWG\",\n                                \"description\": \"Offer3\",\n                                \"created_date\": \"2023-01-04 19:47:12\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"483783581\",\n                                \"series_id\": \"249172\",\n                                \"code\": \"GHD8FL854Z\",\n                                \"description\": \"offer2\",\n                                \"created_date\": \"2023-01-04 19:47:04\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"475850391\",\n                                \"series_id\": \"220203\",\n                                \"code\": \"PP97XDRLFM\",\n                                \"description\": \"5% Journey - welcome\",\n                                \"created_date\": \"2022-11-25 20:35:17\",\n                                \"valid_till\": \"2198-12-31 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"475506448\",\n                                \"series_id\": \"226056\",\n                                \"code\": \"PGQVP8WYAM\",\n                                \"description\": \"Harris Farm- ServiceSeeking 10% off\",\n                                \"created_date\": \"2022-11-23 20:30:20\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"454473807\",\n                                \"series_id\": \"142654\",\n                                \"code\": \"WL2ZBJZK\",\n                                \"description\": \"test offer 1\",\n                                \"created_date\": \"2022-05-30 18:10:48\",\n                                \"valid_till\": \"2122-03-08 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179951\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"PT4I43YN\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:06:03\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"true\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179950\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"RI1N4QGF\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:06:00\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179949\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"2E1EF57U\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:05:58\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179948\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"1T5QTYLB\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:05:54\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"270322657\",\n                                \"series_id\": \"18426\",\n                                \"code\": \"IC7FX1EF\",\n                                \"description\": \"Test Offer 20\",\n                                \"created_date\": \"2020-03-26 15:10:19\",\n                                \"valid_till\": \"2120-02-11 23:59:59\",\n                                \"redeemed\": \"true\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            }\n                        ]\n                    },\n                    \"notes\": [\n                    ],\n                    \"points_summaries\": {\n                        \"points_summary\": [\n                        ]\n                    },\n                    \"item_status\": {\n                        \"success\": \"true\",\n                        \"code\": \"1000\",\n                        \"message\": \"Customer successfully retrieved\",\n                        \"warnings\": {\n                            \"warning\": [\n                            ]\n                        }\n                    }\n                }\n            ]\n        }\n    }\n}\n"
                  },
                  "program_summary=true": {
                    "value": "{\n    \"response\": {\n        \"status\": {\n            \"success\": \"true\",\n            \"code\": 200,\n            \"message\": \"Success\",\n            \"total\": \"1\",\n            \"success_count\": \"1\"\n        },\n        \"customers\": {\n            \"customer\": [\n                {\n                    \"firstname\": \"Tom\",\n                    \"lastname\": \"Sawyer\",\n                    \"mobile\": \"9988776655\",\n                    \"email\": \"tom.sawyer@gmail.com\",\n                    \"external_id\": null,\n                    \"lifetime_points\": 27169.104,\n                    \"lifetime_purchases\": 554135,\n                    \"loyalty_points\": 2412,\n                    \"current_slab\": \"Rhodium\",\n                    \"registered_on\": \"2019-04-14 11:32:30\",\n                    \"updated_on\": \"2024-04-24 18:50:06\",\n                    \"type\": \"LOYALTY\",\n                    \"source\": \"instore\",\n                    \"identifiers\": [],\n                    \"gender\": null,\n                    \"registered_by\": \"FG\",\n                    \"registered_store\": {\n                        \"code\": \"changi\",\n                        \"name\": \"FG\"\n                    },\n                    \"registered_till\": {\n                        \"code\": \"changi.str.till_3\",\n                        \"name\": \"changi.str.till_3\"\n                    },\n                    \"user_groups2\": [],\n                    \"fraud_details\": {\n                        \"status\": \"NOT_FRAUD\",\n                        \"marked_by\": \"1491395484_Achyuthanandan\",\n                        \"modified_on\": \"2021-11-23 13:12:39\",\n                        \"reason\": \"\"\n                    },\n                    \"trackers\": \"\",\n                    \"current_nps_status\": null,\n                    \"custom_fields\": {\n                        \"field\": [\n                            {\n                                \"name\": \"gender\",\n                                \"value\": \"M\"\n                            },\n                            {\n                                \"name\": \"age_group\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"dateofbirth\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"anniversary\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"tnc\",\n                                \"value\": \"yes\"\n                            },\n                            {\n                                \"name\": \"kid_name\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"kid_birthday\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"reco_prod_1\",\n                                \"value\": \"SKUNU671\"\n                            }\n                        ]\n                    },\n                    \"extended_fields\": {\n                        \"field\": [\n                            {\n                                \"name\": \"newsletter_sms\",\n                                \"value\": \"Optin\"\n                            },\n                            {\n                                \"name\": \"newsletter_email\",\n                                \"value\": \"Optin\"\n                            },\n                            {\n                                \"name\": \"gender\",\n                                \"value\": \"Male\"\n                            },\n                            {\n                                \"name\": \"city\",\n                                \"value\": \"Bangalore\"\n                            },\n                            {\n                                \"name\": \"state\",\n                                \"value\": \"Karnataka\"\n                            },\n                            {\n                                \"name\": \"newsletter_mobile_push\",\n                                \"value\": \"Optin\"\n                            }\n                        ]\n                    },\n                    \"transactions\": {\n                        \"transaction\": [\n                            {\n                                \"id\": \"862925631\",\n                                \"number\": \"NeeTesttr11\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:25:49\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925614\",\n                                \"number\": \"NeeTesttr235789\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:24:16\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925612\",\n                                \"number\": \"NeeTesttr23478\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:24:15\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925602\",\n                                \"number\": \"NeeTest235789\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:23:08\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925601\",\n                                \"number\": \"NeeTest23478\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:23:07\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925330\",\n                                \"number\": \"NeeTest235\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:20:06\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925329\",\n                                \"number\": \"NeeTest234\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:20:05\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925327\",\n                                \"number\": \"NeeTest1289\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:18:10\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925326\",\n                                \"number\": \"NeeTest1288\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:18:09\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925238\",\n                                \"number\": \"num-12343\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:00:29\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"14426636\",\n                                \"number\": \"03122020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14426792\",\n                                \"number\": \"03122020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14429363\",\n                                \"number\": \"03122020x005\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14095948\",\n                                \"number\": \"20102020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-20 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092608\",\n                                \"number\": \"19102020x003\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092676\",\n                                \"number\": \"19102020x005\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092493\",\n                                \"number\": \"19102020x002\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            }\n                        ]\n                    },\n                    \"coupons\": {\n                        \"coupon\": [\n                            {\n                                \"id\": \"1207251260\",\n                                \"series_id\": \"520410\",\n                                \"code\": \"3577101158\",\n                                \"description\": \"$20 Reward for Fleet Farm Credit Card Signup\",\n                                \"created_date\": \"2024-05-02 12:07:38\",\n                                \"valid_till\": \"2024-06-01 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"1131021016\",\n                                \"series_id\": \"444024\",\n                                \"code\": \"1432634513\",\n                                \"description\": \"20% OFF on All Products - Milestone Achievement \",\n                                \"created_date\": \"2023-12-15 09:18:10\",\n                                \"valid_till\": \"2025-12-25 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"1130991112\",\n                                \"series_id\": \"442828\",\n                                \"code\": \"1523773774\",\n                                \"description\": \"10% off on F&B\",\n                                \"created_date\": \"2023-12-14 13:38:10\",\n                                \"valid_till\": \"2024-01-13 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"1117721175\",\n                                \"series_id\": \"115866\",\n                                \"code\": \"7T67R2F4\",\n                                \"description\": \"Discount 10%\",\n                                \"created_date\": \"2023-10-17 09:18:33\",\n                                \"valid_till\": \"2121-12-02 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"483792674\",\n                                \"series_id\": \"249170\",\n                                \"code\": \"X2Y7AP5MWG\",\n                                \"description\": \"Offer3\",\n                                \"created_date\": \"2023-01-04 19:47:12\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"483783581\",\n                                \"series_id\": \"249172\",\n                                \"code\": \"GHD8FL854Z\",\n                                \"description\": \"offer2\",\n                                \"created_date\": \"2023-01-04 19:47:04\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"475850391\",\n                                \"series_id\": \"220203\",\n                                \"code\": \"PP97XDRLFM\",\n                                \"description\": \"5% Journey - welcome\",\n                                \"created_date\": \"2022-11-25 20:35:17\",\n                                \"valid_till\": \"2198-12-31 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"475506448\",\n                                \"series_id\": \"226056\",\n                                \"code\": \"PGQVP8WYAM\",\n                                \"description\": \"Harris Farm- ServiceSeeking 10% off\",\n                                \"created_date\": \"2022-11-23 20:30:20\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"454473807\",\n                                \"series_id\": \"142654\",\n                                \"code\": \"WL2ZBJZK\",\n                                \"description\": \"test offer 1\",\n                                \"created_date\": \"2022-05-30 18:10:48\",\n                                \"valid_till\": \"2122-03-08 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179951\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"PT4I43YN\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:06:03\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"true\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            }\n                        ]\n                    },\n                    \"notes\": [],\n                    \"programs_list\": {\n                        \"program\": [\n                            {\n                                \"programId\": \"469\",\n                                \"programName\": \"Default Program\",\n                                \"programDescription\": \"Metro Brands Limited\",\n                                \"isDefault\": \"true\",\n                                \"pointsToCurrencyRatio\": \"0.01\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": [\n                                        {\n                                            \"partnerProgramId\": \"40\",\n                                            \"partnerProgramName\": \"1 Masan WinMembership Premier Tier\",\n                                            \"partnerProgramDescription\": \"1 Masan WinMembership Premier Tier\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"365\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"28\",\n                                            \"partnerProgramName\": \"1231\",\n                                            \"partnerProgramDescription\": \"123\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"90\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"44\",\n                                            \"partnerProgramName\": \"AAA Subscription\",\n                                            \"partnerProgramDescription\": \"AAA Subscription\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"30\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"18\",\n                                            \"partnerProgramName\": \"Airasia partnership\",\n                                            \"partnerProgramDescription\": \"Test\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Bronze\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Silver\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"Gold\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"15\",\n                                            \"partnerProgramName\": \"AirsiaPartnerProgram\",\n                                            \"partnerProgramDescription\": \"test\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"bronze\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"silver\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"gold\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"11\",\n                                            \"partnerProgramName\": \"Alpha_Airlines_Coalition\",\n                                            \"partnerProgramDescription\": \"Alpha Airlines Coalition Partner\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Bronze Miles\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Silver Wings\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"Golden Sky\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"26\",\n                                            \"partnerProgramName\": \"BMW program\",\n                                            \"partnerProgramDescription\": \"Demo\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"90\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"19\",\n                                            \"partnerProgramName\": \"Capitaland\",\n                                            \"partnerProgramDescription\": \"CapitaStar\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"365\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"41\",\n                                            \"partnerProgramName\": \"Chandrayan deligment subscription program\",\n                                            \"partnerProgramDescription\": \"Chandrayan delighment subscription program\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"90\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"29\",\n                                            \"partnerProgramName\": \"Credit Card\",\n                                            \"partnerProgramDescription\": \"Amex card holders will be enrolled to gold tier directly\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Gold\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Platinum\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"16\",\n                                            \"partnerProgramName\": \"demo\",\n                                            \"partnerProgramDescription\": \"demo\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Red\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Green\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"Blue\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"59\",\n                                            \"partnerProgramName\": \"DemoProgram\",\n                                            \"partnerProgramDescription\": \"DemoProgram\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"365\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"50\",\n                                            \"partnerProgramName\": \"DLPL Subscription \",\n                                            \"partnerProgramDescription\": \"Example of a subscription program\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"12\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"14\",\n                                            \"partnerProgramName\": \"Insignia\",\n                                            \"partnerProgramDescription\": \"Exclusive membership\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"180\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"17\",\n                                            \"partnerProgramName\": \"KrisFlyer Miles\",\n                                            \"partnerProgramDescription\": \"KrisFlyer Miles\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"12\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"49\",\n                                            \"partnerProgramName\": \"Luxury Plus\",\n                                            \"partnerProgramDescription\": \"Luxury Plus\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"365\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"24\",\n                                            \"partnerProgramName\": \"Monkey\",\n                                            \"partnerProgramDescription\": \"Monkey is a animal\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Platinum\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Gold\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"22\",\n                                            \"partnerProgramName\": \"Orange\",\n                                            \"partnerProgramDescription\": \"Orange is a fruit\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"90\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"23\",\n                                            \"partnerProgramName\": \"Panda\",\n                                            \"partnerProgramDescription\": \"Panda is a animal\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"90\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"60\",\n                                            \"partnerProgramName\": \"Rider\",\n                                            \"partnerProgramDescription\": \"Rider\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"365\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"27\",\n                                            \"partnerProgramName\": \"Riders scheme\",\n                                            \"partnerProgramDescription\": \"Demo\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"30\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"31\",\n                                            \"partnerProgramName\": \"Sample sample\",\n                                            \"partnerProgramDescription\": \"Sample o sample\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Panda\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Tiger\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"Elephant\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"32\",\n                                            \"partnerProgramName\": \"Sample Sample Sample\",\n                                            \"partnerProgramDescription\": \"Sample o sample\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Tiger\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Panda\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"52\",\n                                            \"partnerProgramName\": \"Shell Pro\",\n                                            \"partnerProgramDescription\": \"Shell Pro\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"1\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"54\",\n                                            \"partnerProgramName\": \"SPF Partner 1\",\n                                            \"partnerProgramDescription\": \"SPF Partner 1\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Platinum \"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Gold \"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"Silver\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"53\",\n                                            \"partnerProgramName\": \"SPF Subscription Package \",\n                                            \"partnerProgramDescription\": \"SPF Subscription Package \",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"12\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"13\",\n                                            \"partnerProgramName\": \"Starbucks\",\n                                            \"partnerProgramDescription\": \"Starbucks Loyalty Program\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"5\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"48\",\n                                            \"partnerProgramName\": \"test\",\n                                            \"partnerProgramDescription\": \"test\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"90\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"20\",\n                                            \"partnerProgramName\": \"Test 123\",\n                                            \"partnerProgramDescription\": \"Test\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Bronze1\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Silver1\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"Gold1\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"30\",\n                                            \"partnerProgramName\": \"test_Mansi\",\n                                            \"partnerProgramDescription\": \"test_Mansi\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"1\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"43\",\n                                            \"partnerProgramName\": \"test_Mansi2\",\n                                            \"partnerProgramDescription\": \"testing_duplicate\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"2\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"42\",\n                                            \"partnerProgramName\": \"test_SJ2\",\n                                            \"partnerProgramDescription\": \"test__SJ\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"3\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"21\",\n                                            \"partnerProgramName\": \"Test12345\",\n                                            \"partnerProgramDescription\": \"test\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"2\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"one\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"two\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"three\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"39\",\n                                            \"partnerProgramName\": \"Vietnam Airlines\",\n                                            \"partnerProgramDescription\": \"Vietnam Airlines Coalition\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"12\",\n                                            \"partnerProgramName\": \"VIP_Membership\",\n                                            \"partnerProgramDescription\": \"Paid VIP Membership\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"12\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"33\",\n                                            \"partnerProgramName\": \"Web session\",\n                                            \"partnerProgramDescription\": \"abcdef\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Tiger\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Lion\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"6\",\n                                            \"partnerProgramName\": \"Wood-Fire-Pizza\",\n                                            \"partnerProgramDescription\": \"Wood-Fire-Pizza\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Standard\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Premium\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"Exclusive\"\n                                                }\n                                            ]\n                                        }\n                                    ]\n                                }\n                            },\n                            {\n                                \"programId\": \"742\",\n                                \"programName\": \"Nike Move Program\",\n                                \"programDescription\": \"Nike Move Program\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": [\n                                        {\n                                            \"partnerProgramId\": \"58\",\n                                            \"partnerProgramName\": \"Nike\",\n                                            \"partnerProgramDescription\": \"Nike\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"60\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"61\",\n                                            \"partnerProgramName\": \"Nike Dicks Sporting Goods\",\n                                            \"partnerProgramDescription\": \"Partnership Program for Nike DSG \",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Champion\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Pro\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"Athlete\"\n                                                }\n                                            ]\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"62\",\n                                            \"partnerProgramName\": \"Nike NRC Subsciption Program \",\n                                            \"partnerProgramDescription\": \"Nike NRC Subsciption Program \",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"90\",\n                                            \"partnerProgramTiers\": []\n                                        }\n                                    ]\n                                }\n                            },\n                            {\n                                \"programId\": \"753\",\n                                \"programName\": \"TCP Demo\",\n                                \"programDescription\": \"TCP Demo\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": [\n                                        {\n                                            \"partnerProgramId\": \"63\",\n                                            \"partnerProgramName\": \"nj\",\n                                            \"partnerProgramDescription\": \"jj\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"DAYS\",\n                                            \"membershipPeriodValue\": \"45\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"25\",\n                                            \"partnerProgramName\": \"TCP Coailition\",\n                                            \"partnerProgramDescription\": \"TCP Coailition\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Gold\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Silver\"\n                                                }\n                                            ]\n                                        }\n                                    ]\n                                }\n                            },\n                            {\n                                \"programId\": \"772\",\n                                \"programName\": \"B2C Hospitality\",\n                                \"programDescription\": \" \",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": [\n                                        {\n                                            \"partnerProgramId\": \"36\",\n                                            \"partnerProgramName\": \"3fr\",\n                                            \"partnerProgramDescription\": \"3rf3\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"99999\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"37\",\n                                            \"partnerProgramName\": \"ecf\",\n                                            \"partnerProgramDescription\": \"ecw\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"3\",\n                                            \"partnerProgramTiers\": []\n                                        }\n                                    ]\n                                }\n                            },\n                            {\n                                \"programId\": \"795\",\n                                \"programName\": \"Demo\",\n                                \"programDescription\": \"Demo\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": []\n                                }\n                            },\n                            {\n                                \"programId\": \"805\",\n                                \"programName\": \"Seven Entertainment\",\n                                \"programDescription\": \"Seven Entertainment\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": []\n                                }\n                            },\n                            {\n                                \"programId\": \"808\",\n                                \"programName\": \"Rounding Point\",\n                                \"programDescription\": \"Rounding Point\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": []\n                                }\n                            },\n                            {\n                                \"programId\": \"816\",\n                                \"programName\": \"US DEMO\",\n                                \"programDescription\": \"US DEMO\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"0.01\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": []\n                                }\n                            },\n                            {\n                                \"programId\": \"819\",\n                                \"programName\": \"Rack up\",\n                                \"programDescription\": \"Demo Program\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": [\n                                        {\n                                            \"partnerProgramId\": \"56\",\n                                            \"partnerProgramName\": \"Damaka\",\n                                            \"partnerProgramDescription\": \"Additional benefits\",\n                                            \"isTierBased\": \"false\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"SUPPLEMENTARY\",\n                                            \"membershipPeriodType\": \"MONTHS\",\n                                            \"membershipPeriodValue\": \"3\",\n                                            \"partnerProgramTiers\": []\n                                        },\n                                        {\n                                            \"partnerProgramId\": \"57\",\n                                            \"partnerProgramName\": \"test_coalition\",\n                                            \"partnerProgramDescription\": \"test\",\n                                            \"isTierBased\": \"true\",\n                                            \"pointsExchangeRate\": \"1\",\n                                            \"partnerProgramType\": \"EXTERNAL\",\n                                            \"membershipPeriodType\": \"\",\n                                            \"membershipPeriodValue\": \"0\",\n                                            \"partnerProgramTiers\": [\n                                                {\n                                                    \"tierNumber\": \"1\",\n                                                    \"tierName\": \"Platinum\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"2\",\n                                                    \"tierName\": \"Gold\"\n                                                },\n                                                {\n                                                    \"tierNumber\": \"3\",\n                                                    \"tierName\": \"Silver\"\n                                                }\n                                            ]\n                                        }\n                                    ]\n                                }\n                            },\n                            {\n                                \"programId\": \"824\",\n                                \"programName\": \"MoMo\",\n                                \"programDescription\": \"MoMo/MTN\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": []\n                                }\n                            },\n                            {\n                                \"programId\": \"828\",\n                                \"programName\": \"Fleet Farm Program\",\n                                \"programDescription\": \"Fleet Farm Program\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"0.01\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": []\n                                }\n                            },\n                            {\n                                \"programId\": \"830\",\n                                \"programName\": \"Labprogram\",\n                                \"programDescription\": \"Labprogram\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": []\n                                }\n                            },\n                            {\n                                \"programId\": \"831\",\n                                \"programName\": \"Club Salud Program\",\n                                \"programDescription\": \"Club Salud Program\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": []\n                                }\n                            },\n                            {\n                                \"programId\": \"834\",\n                                \"programName\": \"FLEET FARM\",\n                                \"programDescription\": \"FLEET FARM Program\",\n                                \"isDefault\": \"false\",\n                                \"pointsToCurrencyRatio\": \"1\",\n                                \"PartnerPrograms\": {\n                                    \"PartnerProgram\": []\n                                }\n                            }\n                        ]\n                    },\n                    \"points_summaries\": {\n                        \"points_summary\": []\n                    },\n                    \"item_status\": {\n                        \"success\": \"true\",\n                        \"code\": \"1000\",\n                        \"message\": \"Customer successfully retrieved\",\n                        \"warnings\": {\n                            \"warning\": []\n                        }\n                    }\n                }\n            ]\n        }\n    }\n}"
                  },
                  "Sample response for slab_history": {
                    "value": "{\n    \"response\": {\n        \"status\": {\n            \"success\": \"true\",\n            \"code\": 200,\n            \"message\": \"Success\",\n            \"total\": \"1\",\n            \"success_count\": \"1\"\n        },\n        \"customers\": {\n            \"customer\": [\n                {\n                    \"firstname\": \"Tom\",\n                    \"lastname\": \"Sawyer\",\n                    \"mobile\": \"9988776655\",\n                    \"email\": \"tom.sawyer@gmail.com\",\n                    \"external_id\": null,\n                    \"lifetime_points\": 27369.104,\n                    \"lifetime_purchases\": 554135,\n                    \"loyalty_points\": 2212,\n                    \"current_slab\": \"Rhodium\",\n                    \"registered_on\": \"2019-04-14 11:32:30\",\n                    \"updated_on\": \"2024-06-24 22:27:12\",\n                    \"type\": \"LOYALTY\",\n                    \"source\": \"instore\",\n                    \"identifiers\": [],\n                    \"gender\": null,\n                    \"registered_by\": \"FG\",\n                    \"registered_store\": {\n                        \"code\": \"changi\",\n                        \"name\": \"FG\"\n                    },\n                    \"registered_till\": {\n                        \"code\": \"changi.str.till_3\",\n                        \"name\": \"changi.str.till_3\"\n                    },\n                    \"user_groups2\": [],\n                    \"fraud_details\": {\n                        \"status\": \"NOT_FRAUD\",\n                        \"marked_by\": \"1491395484_Achyuthanandan\",\n                        \"modified_on\": \"2021-11-23 13:12:39\",\n                        \"reason\": \"\"\n                    },\n                    \"trackers\": \"\",\n                    \"slab_history\": {\n                        \"history\": [\n                            {\n                                \"to\": \"Rhodium\",\n                                \"from\": \"Rhodium\",\n                                \"store\": {\n                                    \"code\": \"teststore\",\n                                    \"name\": \"test\"\n                                },\n                                \"type\": \"RENEW\",\n                                \"changed_on\": \"2024-01-01 02:30:03\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 9 purchase: 422976.0\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Rhodium\",\n                                \"from\": \"Base\",\n                                \"type\": \"UPGRADE\",\n                                \"changed_on\": \"2023-06-28 17:51:43\",\n                                \"notes\": \"Upgrading to Slab : Slab[6]: Name [Platinum] Description [Platinum] , Criteria: Secondary\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Base\",\n                                \"from\": \"Bronze\",\n                                \"type\": \"DOWNGRADE\",\n                                \"changed_on\": \"2022-08-01 02:30:01\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 3 purchase: 16131.000\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Bronze\",\n                                \"from\": \"Bronze\",\n                                \"type\": \"RENEW\",\n                                \"changed_on\": \"2022-07-01 02:30:03\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 3 purchase: 16131.0\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Bronze\",\n                                \"from\": \"Bronze\",\n                                \"type\": \"RENEW\",\n                                \"changed_on\": \"2022-06-01 02:30:01\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 3 purchase: 16131.0\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Bronze\",\n                                \"from\": \"Bronze\",\n                                \"type\": \"RENEW\",\n                                \"changed_on\": \"2022-05-01 02:30:03\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 5 purchase: 16831.0\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Bronze\",\n                                \"from\": \"Base\",\n                                \"type\": \"UPGRADE\",\n                                \"changed_on\": \"2021-04-14 13:28:30\",\n                                \"notes\": \"Upgrading to Slab : Slab[2]: Name [Gold] Description [Gold] , Criteria: Primary\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Base\",\n                                \"from\": \"Silver\",\n                                \"type\": \"DOWNGRADE\",\n                                \"changed_on\": \"2021-04-01 02:30:44\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 9 purchase: 29199.000\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Silver\",\n                                \"from\": \"Silver\",\n                                \"type\": \"RENEW\",\n                                \"changed_on\": \"2021-03-01 02:32:13\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 11 purchase: 52782.0\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Silver\",\n                                \"from\": \"Silver\",\n                                \"store\": {\n                                    \"code\": \"webstore\",\n                                    \"name\": \"Hamilton\"\n                                },\n                                \"type\": \"RENEW\",\n                                \"changed_on\": \"2021-02-01 02:30:59\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 11 purchase: 52782.0\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Silver\",\n                                \"from\": \"Silver\",\n                                \"store\": {\n                                    \"code\": \"webstore\",\n                                    \"name\": \"Hamilton\"\n                                },\n                                \"type\": \"RENEW\",\n                                \"changed_on\": \"2021-01-01 02:32:16\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 14 purchase: 58921.0\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Silver\",\n                                \"from\": \"Silver\",\n                                \"store\": {\n                                    \"code\": \"webstore\",\n                                    \"name\": \"Hamilton\"\n                                },\n                                \"type\": \"RENEW\",\n                                \"changed_on\": \"2020-12-01 02:32:06\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 11 purchase: 57020.0\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Silver\",\n                                \"from\": \"Silver\",\n                                \"store\": {\n                                    \"code\": \"changi\",\n                                    \"name\": \"FG\"\n                                },\n                                \"type\": \"RENEW\",\n                                \"changed_on\": \"2020-11-01 02:30:20\",\n                                \"notes\": \"points_engine_tier_downgrade visits: 10 purchase: 53020.0\",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Silver\",\n                                \"from\": \"Bronze\",\n                                \"store\": {\n                                    \"code\": \"international_business_park\",\n                                    \"name\": \"International Business Park\"\n                                },\n                                \"type\": \"UPGRADE\",\n                                \"changed_on\": \"2020-04-02 14:32:53\",\n                                \"notes\": \"Upgrading to Slab : Slab[3]: Name [Albatross Elite] Description [Albatross Elite] \",\n                                \"program_id\": \"469\"\n                            },\n                            {\n                                \"to\": \"Bronze\",\n                                \"from\": \"Base\",\n                                \"store\": {\n                                    \"code\": \"webstore\",\n                                    \"name\": \"Hamilton\"\n                                },\n                                \"type\": \"UPGRADE\",\n                                \"changed_on\": \"2019-12-09 08:12:19\",\n                                \"notes\": \"Upgrading to Slab : Slab[2]: Name [Eagle Premium] Description [Eagle Premium] \",\n                                \"program_id\": \"469\"\n                            }\n                        ]\n                    },\n                    \"current_nps_status\": null,\n                    \"custom_fields\": {\n                        \"field\": [\n                            {\n                                \"name\": \"gender\",\n                                \"value\": \"M\"\n                            },\n                            {\n                                \"name\": \"age_group\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"dateofbirth\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"anniversary\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"tnc\",\n                                \"value\": \"yes\"\n                            },\n                            {\n                                \"name\": \"kid_name\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"kid_birthday\",\n                                \"value\": \"\"\n                            },\n                            {\n                                \"name\": \"reco_prod_1\",\n                                \"value\": \"SKUNU671\"\n                            }\n                        ]\n                    },\n                    \"extended_fields\": {\n                        \"field\": [\n                            {\n                                \"name\": \"newsletter_sms\",\n                                \"value\": \"Optin\"\n                            },\n                            {\n                                \"name\": \"newsletter_email\",\n                                \"value\": \"Optin\"\n                            },\n                            {\n                                \"name\": \"gender\",\n                                \"value\": \"Male\"\n                            },\n                            {\n                                \"name\": \"city\",\n                                \"value\": \"Bangalore\"\n                            },\n                            {\n                                \"name\": \"state\",\n                                \"value\": \"Karnataka\"\n                            },\n                            {\n                                \"name\": \"newsletter_mobile_push\",\n                                \"value\": \"Optin\"\n                            }\n                        ]\n                    },\n                    \"transactions\": {\n                        \"transaction\": [\n                            {\n                                \"id\": \"862925631\",\n                                \"number\": \"NeeTesttr11\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:25:49\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925614\",\n                                \"number\": \"NeeTesttr235789\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:24:16\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925612\",\n                                \"number\": \"NeeTesttr23478\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:24:15\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925602\",\n                                \"number\": \"NeeTest235789\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:23:08\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925601\",\n                                \"number\": \"NeeTest23478\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 06:23:07\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925330\",\n                                \"number\": \"NeeTest235\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:20:06\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925329\",\n                                \"number\": \"NeeTest234\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:20:05\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925327\",\n                                \"number\": \"NeeTest1289\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:18:10\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925326\",\n                                \"number\": \"NeeTest1288\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:18:09\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"862925238\",\n                                \"number\": \"num-12343\",\n                                \"type\": \"REGULAR\",\n                                \"created_date\": \"2023-12-15 05:00:29\",\n                                \"store\": \"neestoretillssnee23\"\n                            },\n                            {\n                                \"id\": \"14426636\",\n                                \"number\": \"03122020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14426792\",\n                                \"number\": \"03122020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14429363\",\n                                \"number\": \"03122020x005\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-12-03 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14095948\",\n                                \"number\": \"20102020x001\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-20 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092608\",\n                                \"number\": \"19102020x003\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092676\",\n                                \"number\": \"19102020x005\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            },\n                            {\n                                \"id\": \"14092493\",\n                                \"number\": \"19102020x002\",\n                                \"type\": \"RETURN\",\n                                \"created_date\": \"2020-10-19 10:40:52\",\n                                \"store\": \"changi.str.till_3\"\n                            }\n                        ]\n                    },\n                    \"coupons\": {\n                        \"coupon\": [\n                            {\n                                \"id\": \"1207251260\",\n                                \"series_id\": \"520410\",\n                                \"code\": \"3577101158\",\n                                \"description\": \"$20 Reward for Fleet Farm Credit Card Signup\",\n                                \"created_date\": \"2024-05-02 12:07:38\",\n                                \"valid_till\": \"2024-06-01 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"1131021016\",\n                                \"series_id\": \"444024\",\n                                \"code\": \"1432634513\",\n                                \"description\": \"20% OFF on All Products - Milestone Achievement \",\n                                \"created_date\": \"2023-12-15 09:18:10\",\n                                \"valid_till\": \"2025-12-25 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"1130991112\",\n                                \"series_id\": \"442828\",\n                                \"code\": \"1523773774\",\n                                \"description\": \"100aed Discount on Selected Items\",\n                                \"created_date\": \"2023-12-14 13:38:10\",\n                                \"valid_till\": \"2024-12-31 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"1117721175\",\n                                \"series_id\": \"115866\",\n                                \"code\": \"7T67R2F4\",\n                                \"description\": \"Discount 10%\",\n                                \"created_date\": \"2023-10-17 09:18:33\",\n                                \"valid_till\": \"2121-12-02 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"483792674\",\n                                \"series_id\": \"249170\",\n                                \"code\": \"X2Y7AP5MWG\",\n                                \"description\": \"Offer3\",\n                                \"created_date\": \"2023-01-04 19:47:12\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"483783581\",\n                                \"series_id\": \"249172\",\n                                \"code\": \"GHD8FL854Z\",\n                                \"description\": \"offer2\",\n                                \"created_date\": \"2023-01-04 19:47:04\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"475850391\",\n                                \"series_id\": \"220203\",\n                                \"code\": \"PP97XDRLFM\",\n                                \"description\": \"5% Journey - welcome\",\n                                \"created_date\": \"2022-11-25 20:35:17\",\n                                \"valid_till\": \"2198-12-31 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"475506448\",\n                                \"series_id\": \"226056\",\n                                \"code\": \"PGQVP8WYAM\",\n                                \"description\": \"Harris Farm- ServiceSeeking 10% off\",\n                                \"created_date\": \"2022-11-23 20:30:20\",\n                                \"valid_till\": \"2023-02-28 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"454473807\",\n                                \"series_id\": \"142654\",\n                                \"code\": \"WL2ZBJZK\",\n                                \"description\": \"test offer 1\",\n                                \"created_date\": \"2022-05-30 18:10:48\",\n                                \"valid_till\": \"2122-03-08 23:59:59\",\n                                \"redeemed\": \"false\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            },\n                            {\n                                \"id\": \"370179951\",\n                                \"series_id\": \"12313\",\n                                \"code\": \"PT4I43YN\",\n                                \"description\": \"10 units\",\n                                \"created_date\": \"2021-05-17 19:06:03\",\n                                \"valid_till\": \"2119-07-10 23:59:59\",\n                                \"redeemed\": \"true\",\n                                \"same_user_multiple_redeem\": \"false\"\n                            }\n                        ]\n                    },\n                    \"notes\": [],\n                    \"points_summaries\": {\n                        \"points_summary\": []\n                    },\n                    \"item_status\": {\n                        \"success\": \"true\",\n                        \"code\": \"1000\",\n                        \"message\": \"Customer successfully retrieved\",\n                        \"warnings\": {\n                            \"warning\": []\n                        }\n                    }\n                }\n            ]\n        }\n    }\n}"
                  }
                },
                "schema": {
                  "oneOf": [
                    {
                      "type": "object",
                      "properties": {
                        "response": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "object",
                              "properties": {
                                "success": {
                                  "type": "string",
                                  "example": "true"
                                },
                                "code": {
                                  "type": "integer",
                                  "example": 200,
                                  "default": 0
                                },
                                "message": {
                                  "type": "string",
                                  "example": "Success"
                                },
                                "total": {
                                  "type": "string",
                                  "example": "1"
                                },
                                "success_count": {
                                  "type": "string",
                                  "example": "1"
                                }
                              }
                            },
                            "customers": {
                              "type": "object",
                              "properties": {
                                "customer": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "firstname": {
                                        "type": "string",
                                        "example": "Rita"
                                      },
                                      "lastname": {
                                        "type": "string",
                                        "example": "John"
                                      },
                                      "mobile": {
                                        "type": "string",
                                        "example": "44700900999"
                                      },
                                      "email": {
                                        "type": "string",
                                        "example": "rita.john@example.com"
                                      },
                                      "external_id": {
                                        "type": "string",
                                        "example": "XYPZ006"
                                      },
                                      "lifetime_points": {
                                        "type": "integer",
                                        "example": 500,
                                        "default": 0
                                      },
                                      "lifetime_purchases": {
                                        "type": "integer",
                                        "example": 0,
                                        "default": 0
                                      },
                                      "loyalty_points": {
                                        "type": "integer",
                                        "example": 500,
                                        "default": 0
                                      },
                                      "current_slab": {
                                        "type": "string",
                                        "example": "Member Tier "
                                      },
                                      "registered_on": {
                                        "type": "string",
                                        "example": "2012-09-11 11:11:15"
                                      },
                                      "updated_on": {
                                        "type": "string",
                                        "example": "2022-02-18 08:22:34"
                                      },
                                      "type": {
                                        "type": "string",
                                        "example": "LOYALTY"
                                      },
                                      "source": {
                                        "type": "string",
                                        "example": "instore"
                                      },
                                      "identifiers": {
                                        "type": "array"
                                      },
                                      "gender": {},
                                      "registered_by": {
                                        "type": "string",
                                        "example": "Hamilton"
                                      },
                                      "registered_store": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "webstore"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "Hamilton"
                                          }
                                        }
                                      },
                                      "registered_till": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "Mobile App"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "bukl.ind.solution"
                                          }
                                        }
                                      },
                                      "user_groups2": {
                                        "type": "array"
                                      },
                                      "fraud_details": {
                                        "type": "object",
                                        "properties": {
                                          "status": {
                                            "type": "string",
                                            "example": "NONE"
                                          },
                                          "marked_by": {
                                            "type": "string",
                                            "example": ""
                                          },
                                          "modified_on": {
                                            "type": "string",
                                            "example": ""
                                          },
                                          "reason": {
                                            "type": "string",
                                            "example": ""
                                          }
                                        }
                                      },
                                      "trackers": {
                                        "type": "string",
                                        "example": ""
                                      },
                                      "current_nps_status": {},
                                      "custom_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array"
                                          }
                                        }
                                      },
                                      "extended_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "example": "gender"
                                                },
                                                "value": {
                                                  "type": "string",
                                                  "example": "Female"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "transactions": {
                                        "type": "object",
                                        "properties": {
                                          "transaction": {
                                            "type": "array"
                                          }
                                        }
                                      },
                                      "coupons": {
                                        "type": "object",
                                        "properties": {
                                          "coupon": {
                                            "type": "array"
                                          }
                                        }
                                      },
                                      "notes": {
                                        "type": "array"
                                      },
                                      "points_summaries": {
                                        "type": "object",
                                        "properties": {
                                          "points_summary": {
                                            "type": "array"
                                          }
                                        }
                                      },
                                      "item_status": {
                                        "type": "object",
                                        "properties": {
                                          "success": {
                                            "type": "string",
                                            "example": "true"
                                          },
                                          "code": {
                                            "type": "string",
                                            "example": "1000"
                                          },
                                          "message": {
                                            "type": "string",
                                            "example": "Customer successfully retrieved"
                                          },
                                          "warnings": {
                                            "type": "object",
                                            "properties": {
                                              "warning": {
                                                "type": "array"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Sample Response for GAP_TO_UPGRADE_FOR",
                      "type": "object",
                      "properties": {
                        "gap_to_upgrade": {
                          "type": "object",
                          "properties": {
                            "upgrade_strategy": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "upgrade_based_on": {
                                    "type": "string",
                                    "example": "TRACKER_VALUE_BASED"
                                  },
                                  "upgrade_entity_identifers": {
                                    "type": "object",
                                    "properties": {
                                      "tracker_name": {
                                        "type": "string",
                                        "example": "2 Years Upgrade Tracker"
                                      },
                                      "tracker_type": {
                                        "type": "string",
                                        "example": "BILL_AMOUNT"
                                      },
                                      "tracker_mode": {
                                        "type": "string",
                                        "example": "MOVING_WINDOW"
                                      },
                                      "tracker_case_name": {
                                        "type": "string",
                                        "example": "730Days_Case"
                                      },
                                      "tracker_case_period_type": {
                                        "type": "string",
                                        "example": "DAYS"
                                      },
                                      "tracker_case_period_value": {
                                        "type": "string",
                                        "example": "730"
                                      }
                                    }
                                  },
                                  "upgrade_threshold": {
                                    "type": "string",
                                    "example": "25000"
                                  },
                                  "customer_upgrade_entity_values": {
                                    "type": "object",
                                    "properties": {
                                      "current_value": {
                                        "type": "string",
                                        "example": "9786"
                                      },
                                      "gap_to_upgrade": {
                                        "type": "string",
                                        "example": "15214"
                                      },
                                      "value_valid_upto": {
                                        "type": "string",
                                        "example": "2022-05-06"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Sample response for user_id",
                      "type": "object",
                      "properties": {
                        "response": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "object",
                              "properties": {
                                "success": {
                                  "type": "string",
                                  "example": "true"
                                },
                                "code": {
                                  "type": "integer",
                                  "example": 200,
                                  "default": 0
                                },
                                "message": {
                                  "type": "string",
                                  "example": "Success"
                                },
                                "total": {
                                  "type": "string",
                                  "example": "1"
                                },
                                "success_count": {
                                  "type": "string",
                                  "example": "1"
                                }
                              }
                            },
                            "customers": {
                              "type": "object",
                              "properties": {
                                "customer": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "firstname": {
                                        "type": "string",
                                        "example": "Tom"
                                      },
                                      "lastname": {
                                        "type": "string",
                                        "example": "Sawyer"
                                      },
                                      "mobile": {
                                        "type": "string",
                                        "example": "9988776655"
                                      },
                                      "email": {
                                        "type": "string",
                                        "example": "tom.sawyer@gmail.com"
                                      },
                                      "external_id": {},
                                      "lifetime_points": {
                                        "type": "number",
                                        "example": 26447.104,
                                        "default": 0
                                      },
                                      "lifetime_purchases": {
                                        "type": "integer",
                                        "example": 183159,
                                        "default": 0
                                      },
                                      "loyalty_points": {
                                        "type": "integer",
                                        "example": 12869,
                                        "default": 0
                                      },
                                      "current_slab": {
                                        "type": "string",
                                        "example": "Platinum"
                                      },
                                      "registered_on": {
                                        "type": "string",
                                        "example": "2019-04-14 11:32:30"
                                      },
                                      "updated_on": {
                                        "type": "string",
                                        "example": "2023-09-11 08:28:08"
                                      },
                                      "type": {
                                        "type": "string",
                                        "example": "LOYALTY"
                                      },
                                      "source": {
                                        "type": "string",
                                        "example": "instore"
                                      },
                                      "identifiers": {
                                        "type": "array"
                                      },
                                      "gender": {},
                                      "registered_by": {
                                        "type": "string",
                                        "example": "FG"
                                      },
                                      "registered_store": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "changi"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "FG"
                                          }
                                        }
                                      },
                                      "registered_till": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "changi.str.till_3"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "changi.str.till_3"
                                          }
                                        }
                                      },
                                      "user_groups2": {
                                        "type": "array"
                                      },
                                      "fraud_details": {
                                        "type": "object",
                                        "properties": {
                                          "status": {
                                            "type": "string",
                                            "example": "NOT_FRAUD"
                                          },
                                          "marked_by": {
                                            "type": "string",
                                            "example": "1491395484_Achyuthanandan"
                                          },
                                          "modified_on": {
                                            "type": "string",
                                            "example": "2021-11-23 13:12:39"
                                          },
                                          "reason": {
                                            "type": "string",
                                            "example": ""
                                          }
                                        }
                                      },
                                      "trackers": {
                                        "type": "string",
                                        "example": ""
                                      },
                                      "user_id": {
                                        "type": "string",
                                        "example": "98662653"
                                      },
                                      "current_nps_status": {},
                                      "custom_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "example": "gender"
                                                },
                                                "value": {
                                                  "type": "string",
                                                  "example": "M"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "extended_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "example": "newsletter_sms"
                                                },
                                                "value": {
                                                  "type": "string",
                                                  "example": "Optin"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "transactions": {
                                        "type": "object",
                                        "properties": {
                                          "transaction": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "example": "373930882"
                                                },
                                                "number": {
                                                  "type": "string",
                                                  "example": "numtest-1239"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "example": "REGULAR"
                                                },
                                                "created_date": {
                                                  "type": "string",
                                                  "example": "2023-04-05 17:07:23"
                                                },
                                                "store": {
                                                  "type": "string",
                                                  "example": "Mobile App"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "coupons": {
                                        "type": "object",
                                        "properties": {
                                          "coupon": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "example": "483792674"
                                                },
                                                "series_id": {
                                                  "type": "string",
                                                  "example": "249170"
                                                },
                                                "code": {
                                                  "type": "string",
                                                  "example": "X2Y7AP5MWG"
                                                },
                                                "description": {
                                                  "type": "string",
                                                  "example": "Offer3"
                                                },
                                                "created_date": {
                                                  "type": "string",
                                                  "example": "2023-01-04 19:47:12"
                                                },
                                                "valid_till": {
                                                  "type": "string",
                                                  "example": "2023-02-28 23:59:59"
                                                },
                                                "redeemed": {
                                                  "type": "string",
                                                  "example": "false"
                                                },
                                                "same_user_multiple_redeem": {
                                                  "type": "string",
                                                  "example": "false"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "notes": {
                                        "type": "array"
                                      },
                                      "points_summaries": {
                                        "type": "object",
                                        "properties": {
                                          "points_summary": {
                                            "type": "array"
                                          }
                                        }
                                      },
                                      "item_status": {
                                        "type": "object",
                                        "properties": {
                                          "success": {
                                            "type": "string",
                                            "example": "true"
                                          },
                                          "code": {
                                            "type": "string",
                                            "example": "1000"
                                          },
                                          "message": {
                                            "type": "string",
                                            "example": "Customer successfully retrieved"
                                          },
                                          "warnings": {
                                            "type": "object",
                                            "properties": {
                                              "warning": {
                                                "type": "array"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Sample response for coupon_order_by",
                      "type": "object",
                      "properties": {
                        "response": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "object",
                              "properties": {
                                "success": {
                                  "type": "string",
                                  "example": "true"
                                },
                                "code": {
                                  "type": "integer",
                                  "example": 200,
                                  "default": 0
                                },
                                "message": {
                                  "type": "string",
                                  "example": "Success"
                                },
                                "total": {
                                  "type": "string",
                                  "example": "1"
                                },
                                "success_count": {
                                  "type": "string",
                                  "example": "1"
                                }
                              }
                            },
                            "customers": {
                              "type": "object",
                              "properties": {
                                "customer": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "firstname": {
                                        "type": "string",
                                        "example": "Tom"
                                      },
                                      "lastname": {
                                        "type": "string",
                                        "example": "Sawyer"
                                      },
                                      "mobile": {
                                        "type": "string",
                                        "example": "9988776655"
                                      },
                                      "email": {
                                        "type": "string",
                                        "example": "tom.sawyer@gmail.com"
                                      },
                                      "external_id": {},
                                      "lifetime_points": {
                                        "type": "number",
                                        "example": 26447.104,
                                        "default": 0
                                      },
                                      "lifetime_purchases": {
                                        "type": "integer",
                                        "example": 183159,
                                        "default": 0
                                      },
                                      "loyalty_points": {
                                        "type": "integer",
                                        "example": 12869,
                                        "default": 0
                                      },
                                      "current_slab": {
                                        "type": "string",
                                        "example": "Platinum"
                                      },
                                      "registered_on": {
                                        "type": "string",
                                        "example": "2019-04-14 11:32:30"
                                      },
                                      "updated_on": {
                                        "type": "string",
                                        "example": "2023-09-11 08:28:08"
                                      },
                                      "type": {
                                        "type": "string",
                                        "example": "LOYALTY"
                                      },
                                      "source": {
                                        "type": "string",
                                        "example": "instore"
                                      },
                                      "identifiers": {
                                        "type": "array"
                                      },
                                      "gender": {},
                                      "registered_by": {
                                        "type": "string",
                                        "example": "FG"
                                      },
                                      "registered_store": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "changi"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "FG"
                                          }
                                        }
                                      },
                                      "registered_till": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "changi.str.till_3"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "changi.str.till_3"
                                          }
                                        }
                                      },
                                      "user_groups2": {
                                        "type": "array"
                                      },
                                      "fraud_details": {
                                        "type": "object",
                                        "properties": {
                                          "status": {
                                            "type": "string",
                                            "example": "NOT_FRAUD"
                                          },
                                          "marked_by": {
                                            "type": "string",
                                            "example": "1491395484_Achyuthanandan"
                                          },
                                          "modified_on": {
                                            "type": "string",
                                            "example": "2021-11-23 13:12:39"
                                          },
                                          "reason": {
                                            "type": "string",
                                            "example": ""
                                          }
                                        }
                                      },
                                      "trackers": {
                                        "type": "string",
                                        "example": ""
                                      },
                                      "current_nps_status": {},
                                      "custom_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "example": "gender"
                                                },
                                                "value": {
                                                  "type": "string",
                                                  "example": "M"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "extended_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "example": "newsletter_sms"
                                                },
                                                "value": {
                                                  "type": "string",
                                                  "example": "Optin"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "transactions": {
                                        "type": "object",
                                        "properties": {
                                          "transaction": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "example": "373930882"
                                                },
                                                "number": {
                                                  "type": "string",
                                                  "example": "numtest-1239"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "example": "REGULAR"
                                                },
                                                "created_date": {
                                                  "type": "string",
                                                  "example": "2023-04-05 17:07:23"
                                                },
                                                "store": {
                                                  "type": "string",
                                                  "example": "Mobile App"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "coupons": {
                                        "type": "object",
                                        "properties": {
                                          "coupon": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "example": "483792674"
                                                },
                                                "series_id": {
                                                  "type": "string",
                                                  "example": "249170"
                                                },
                                                "code": {
                                                  "type": "string",
                                                  "example": "X2Y7AP5MWG"
                                                },
                                                "description": {
                                                  "type": "string",
                                                  "example": "Offer3"
                                                },
                                                "created_date": {
                                                  "type": "string",
                                                  "example": "2023-01-04 19:47:12"
                                                },
                                                "valid_till": {
                                                  "type": "string",
                                                  "example": "2023-02-28 23:59:59"
                                                },
                                                "redeemed": {
                                                  "type": "string",
                                                  "example": "false"
                                                },
                                                "same_user_multiple_redeem": {
                                                  "type": "string",
                                                  "example": "false"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "notes": {
                                        "type": "array"
                                      },
                                      "points_summaries": {
                                        "type": "object",
                                        "properties": {
                                          "points_summary": {
                                            "type": "array"
                                          }
                                        }
                                      },
                                      "item_status": {
                                        "type": "object",
                                        "properties": {
                                          "success": {
                                            "type": "string",
                                            "example": "true"
                                          },
                                          "code": {
                                            "type": "string",
                                            "example": "1000"
                                          },
                                          "message": {
                                            "type": "string",
                                            "example": "Customer successfully retrieved"
                                          },
                                          "warnings": {
                                            "type": "object",
                                            "properties": {
                                              "warning": {
                                                "type": "array"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "program_summary=true",
                      "type": "object",
                      "properties": {
                        "response": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "object",
                              "properties": {
                                "success": {
                                  "type": "string",
                                  "example": "true"
                                },
                                "code": {
                                  "type": "integer",
                                  "example": 200,
                                  "default": 0
                                },
                                "message": {
                                  "type": "string",
                                  "example": "Success"
                                },
                                "total": {
                                  "type": "string",
                                  "example": "1"
                                },
                                "success_count": {
                                  "type": "string",
                                  "example": "1"
                                }
                              }
                            },
                            "customers": {
                              "type": "object",
                              "properties": {
                                "customer": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "firstname": {
                                        "type": "string",
                                        "example": "Tom"
                                      },
                                      "lastname": {
                                        "type": "string",
                                        "example": "Sawyer"
                                      },
                                      "mobile": {
                                        "type": "string",
                                        "example": "9988776655"
                                      },
                                      "email": {
                                        "type": "string",
                                        "example": "tom.sawyer@gmail.com"
                                      },
                                      "external_id": {},
                                      "lifetime_points": {
                                        "type": "number",
                                        "example": 27169.104,
                                        "default": 0
                                      },
                                      "lifetime_purchases": {
                                        "type": "integer",
                                        "example": 554135,
                                        "default": 0
                                      },
                                      "loyalty_points": {
                                        "type": "integer",
                                        "example": 2412,
                                        "default": 0
                                      },
                                      "current_slab": {
                                        "type": "string",
                                        "example": "Rhodium"
                                      },
                                      "registered_on": {
                                        "type": "string",
                                        "example": "2019-04-14 11:32:30"
                                      },
                                      "updated_on": {
                                        "type": "string",
                                        "example": "2024-04-24 18:50:06"
                                      },
                                      "type": {
                                        "type": "string",
                                        "example": "LOYALTY"
                                      },
                                      "source": {
                                        "type": "string",
                                        "example": "instore"
                                      },
                                      "identifiers": {
                                        "type": "array"
                                      },
                                      "gender": {},
                                      "registered_by": {
                                        "type": "string",
                                        "example": "FG"
                                      },
                                      "registered_store": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "changi"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "FG"
                                          }
                                        }
                                      },
                                      "registered_till": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "changi.str.till_3"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "changi.str.till_3"
                                          }
                                        }
                                      },
                                      "user_groups2": {
                                        "type": "array"
                                      },
                                      "fraud_details": {
                                        "type": "object",
                                        "properties": {
                                          "status": {
                                            "type": "string",
                                            "example": "NOT_FRAUD"
                                          },
                                          "marked_by": {
                                            "type": "string",
                                            "example": "1491395484_Achyuthanandan"
                                          },
                                          "modified_on": {
                                            "type": "string",
                                            "example": "2021-11-23 13:12:39"
                                          },
                                          "reason": {
                                            "type": "string",
                                            "example": ""
                                          }
                                        }
                                      },
                                      "trackers": {
                                        "type": "string",
                                        "example": ""
                                      },
                                      "current_nps_status": {},
                                      "custom_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "example": "gender"
                                                },
                                                "value": {
                                                  "type": "string",
                                                  "example": "M"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "extended_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "example": "newsletter_sms"
                                                },
                                                "value": {
                                                  "type": "string",
                                                  "example": "Optin"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "transactions": {
                                        "type": "object",
                                        "properties": {
                                          "transaction": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "example": "862925631"
                                                },
                                                "number": {
                                                  "type": "string",
                                                  "example": "NeeTesttr11"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "example": "REGULAR"
                                                },
                                                "created_date": {
                                                  "type": "string",
                                                  "example": "2023-12-15 06:25:49"
                                                },
                                                "store": {
                                                  "type": "string",
                                                  "example": "neestoretillssnee23"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "coupons": {
                                        "type": "object",
                                        "properties": {
                                          "coupon": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "example": "1207251260"
                                                },
                                                "series_id": {
                                                  "type": "string",
                                                  "example": "520410"
                                                },
                                                "code": {
                                                  "type": "string",
                                                  "example": "3577101158"
                                                },
                                                "description": {
                                                  "type": "string",
                                                  "example": "$20 Reward for Fleet Farm Credit Card Signup"
                                                },
                                                "created_date": {
                                                  "type": "string",
                                                  "example": "2024-05-02 12:07:38"
                                                },
                                                "valid_till": {
                                                  "type": "string",
                                                  "example": "2024-06-01 23:59:59"
                                                },
                                                "redeemed": {
                                                  "type": "string",
                                                  "example": "false"
                                                },
                                                "same_user_multiple_redeem": {
                                                  "type": "string",
                                                  "example": "false"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "notes": {
                                        "type": "array"
                                      },
                                      "programs_list": {
                                        "type": "object",
                                        "properties": {
                                          "program": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "programId": {
                                                  "type": "string",
                                                  "example": "469"
                                                },
                                                "programName": {
                                                  "type": "string",
                                                  "example": "Default Program"
                                                },
                                                "programDescription": {
                                                  "type": "string",
                                                  "example": "Metro Brands Limited"
                                                },
                                                "isDefault": {
                                                  "type": "string",
                                                  "example": "true"
                                                },
                                                "pointsToCurrencyRatio": {
                                                  "type": "string",
                                                  "example": "0.01"
                                                },
                                                "PartnerPrograms": {
                                                  "type": "object",
                                                  "properties": {
                                                    "PartnerProgram": {
                                                      "type": "array",
                                                      "items": {
                                                        "type": "object",
                                                        "properties": {
                                                          "partnerProgramId": {
                                                            "type": "string",
                                                            "example": "40"
                                                          },
                                                          "partnerProgramName": {
                                                            "type": "string",
                                                            "example": "1 Masan WinMembership Premier Tier"
                                                          },
                                                          "partnerProgramDescription": {
                                                            "type": "string",
                                                            "example": "1 Masan WinMembership Premier Tier"
                                                          },
                                                          "isTierBased": {
                                                            "type": "string",
                                                            "example": "false"
                                                          },
                                                          "pointsExchangeRate": {
                                                            "type": "string",
                                                            "example": "1"
                                                          },
                                                          "partnerProgramType": {
                                                            "type": "string",
                                                            "example": "SUPPLEMENTARY"
                                                          },
                                                          "membershipPeriodType": {
                                                            "type": "string",
                                                            "example": "DAYS"
                                                          },
                                                          "membershipPeriodValue": {
                                                            "type": "string",
                                                            "example": "365"
                                                          },
                                                          "partnerProgramTiers": {
                                                            "type": "array"
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "points_summaries": {
                                        "type": "object",
                                        "properties": {
                                          "points_summary": {
                                            "type": "array"
                                          }
                                        }
                                      },
                                      "item_status": {
                                        "type": "object",
                                        "properties": {
                                          "success": {
                                            "type": "string",
                                            "example": "true"
                                          },
                                          "code": {
                                            "type": "string",
                                            "example": "1000"
                                          },
                                          "message": {
                                            "type": "string",
                                            "example": "Customer successfully retrieved"
                                          },
                                          "warnings": {
                                            "type": "object",
                                            "properties": {
                                              "warning": {
                                                "type": "array"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "title": "Sample response for slab_history",
                      "type": "object",
                      "properties": {
                        "response": {
                          "type": "object",
                          "properties": {
                            "status": {
                              "type": "object",
                              "properties": {
                                "success": {
                                  "type": "string",
                                  "example": "true"
                                },
                                "code": {
                                  "type": "integer",
                                  "example": 200,
                                  "default": 0
                                },
                                "message": {
                                  "type": "string",
                                  "example": "Success"
                                },
                                "total": {
                                  "type": "string",
                                  "example": "1"
                                },
                                "success_count": {
                                  "type": "string",
                                  "example": "1"
                                }
                              }
                            },
                            "customers": {
                              "type": "object",
                              "properties": {
                                "customer": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "firstname": {
                                        "type": "string",
                                        "example": "Tom"
                                      },
                                      "lastname": {
                                        "type": "string",
                                        "example": "Sawyer"
                                      },
                                      "mobile": {
                                        "type": "string",
                                        "example": "9988776655"
                                      },
                                      "email": {
                                        "type": "string",
                                        "example": "tom.sawyer@gmail.com"
                                      },
                                      "external_id": {},
                                      "lifetime_points": {
                                        "type": "number",
                                        "example": 27369.104,
                                        "default": 0
                                      },
                                      "lifetime_purchases": {
                                        "type": "integer",
                                        "example": 554135,
                                        "default": 0
                                      },
                                      "loyalty_points": {
                                        "type": "integer",
                                        "example": 2212,
                                        "default": 0
                                      },
                                      "current_slab": {
                                        "type": "string",
                                        "example": "Rhodium"
                                      },
                                      "registered_on": {
                                        "type": "string",
                                        "example": "2019-04-14 11:32:30"
                                      },
                                      "updated_on": {
                                        "type": "string",
                                        "example": "2024-06-24 22:27:12"
                                      },
                                      "type": {
                                        "type": "string",
                                        "example": "LOYALTY"
                                      },
                                      "source": {
                                        "type": "string",
                                        "example": "instore"
                                      },
                                      "identifiers": {
                                        "type": "array"
                                      },
                                      "gender": {},
                                      "registered_by": {
                                        "type": "string",
                                        "example": "FG"
                                      },
                                      "registered_store": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "changi"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "FG"
                                          }
                                        }
                                      },
                                      "registered_till": {
                                        "type": "object",
                                        "properties": {
                                          "code": {
                                            "type": "string",
                                            "example": "changi.str.till_3"
                                          },
                                          "name": {
                                            "type": "string",
                                            "example": "changi.str.till_3"
                                          }
                                        }
                                      },
                                      "user_groups2": {
                                        "type": "array"
                                      },
                                      "fraud_details": {
                                        "type": "object",
                                        "properties": {
                                          "status": {
                                            "type": "string",
                                            "example": "NOT_FRAUD"
                                          },
                                          "marked_by": {
                                            "type": "string",
                                            "example": "1491395484_Achyuthanandan"
                                          },
                                          "modified_on": {
                                            "type": "string",
                                            "example": "2021-11-23 13:12:39"
                                          },
                                          "reason": {
                                            "type": "string",
                                            "example": ""
                                          }
                                        }
                                      },
                                      "trackers": {
                                        "type": "string",
                                        "example": ""
                                      },
                                      "slab_history": {
                                        "type": "object",
                                        "properties": {
                                          "history": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "to": {
                                                  "type": "string",
                                                  "example": "Rhodium"
                                                },
                                                "from": {
                                                  "type": "string",
                                                  "example": "Rhodium"
                                                },
                                                "store": {
                                                  "type": "object",
                                                  "properties": {
                                                    "code": {
                                                      "type": "string",
                                                      "example": "teststore"
                                                    },
                                                    "name": {
                                                      "type": "string",
                                                      "example": "test"
                                                    }
                                                  }
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "example": "RENEW"
                                                },
                                                "changed_on": {
                                                  "type": "string",
                                                  "example": "2024-01-01 02:30:03"
                                                },
                                                "notes": {
                                                  "type": "string",
                                                  "example": "points_engine_tier_downgrade visits: 9 purchase: 422976.0"
                                                },
                                                "program_id": {
                                                  "type": "string",
                                                  "example": "469"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "current_nps_status": {},
                                      "custom_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "example": "gender"
                                                },
                                                "value": {
                                                  "type": "string",
                                                  "example": "M"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "extended_fields": {
                                        "type": "object",
                                        "properties": {
                                          "field": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "name": {
                                                  "type": "string",
                                                  "example": "newsletter_sms"
                                                },
                                                "value": {
                                                  "type": "string",
                                                  "example": "Optin"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "transactions": {
                                        "type": "object",
                                        "properties": {
                                          "transaction": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "example": "862925631"
                                                },
                                                "number": {
                                                  "type": "string",
                                                  "example": "NeeTesttr11"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "example": "REGULAR"
                                                },
                                                "created_date": {
                                                  "type": "string",
                                                  "example": "2023-12-15 06:25:49"
                                                },
                                                "store": {
                                                  "type": "string",
                                                  "example": "neestoretillssnee23"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "coupons": {
                                        "type": "object",
                                        "properties": {
                                          "coupon": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string",
                                                  "example": "1207251260"
                                                },
                                                "series_id": {
                                                  "type": "string",
                                                  "example": "520410"
                                                },
                                                "code": {
                                                  "type": "string",
                                                  "example": "3577101158"
                                                },
                                                "description": {
                                                  "type": "string",
                                                  "example": "$20 Reward for Fleet Farm Credit Card Signup"
                                                },
                                                "created_date": {
                                                  "type": "string",
                                                  "example": "2024-05-02 12:07:38"
                                                },
                                                "valid_till": {
                                                  "type": "string",
                                                  "example": "2024-06-01 23:59:59"
                                                },
                                                "redeemed": {
                                                  "type": "string",
                                                  "example": "false"
                                                },
                                                "same_user_multiple_redeem": {
                                                  "type": "string",
                                                  "example": "false"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "notes": {
                                        "type": "array"
                                      },
                                      "points_summaries": {
                                        "type": "object",
                                        "properties": {
                                          "points_summary": {
                                            "type": "array"
                                          }
                                        }
                                      },
                                      "item_status": {
                                        "type": "object",
                                        "properties": {
                                          "success": {
                                            "type": "string",
                                            "example": "true"
                                          },
                                          "code": {
                                            "type": "string",
                                            "example": "1000"
                                          },
                                          "message": {
                                            "type": "string",
                                            "example": "Customer successfully retrieved"
                                          },
                                          "warnings": {
                                            "type": "object",
                                            "properties": {
                                              "warning": {
                                                "type": "array"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "500": {
            "description": "500",
            "content": {
              "application/json": {
                "examples": {
                  "500": {
                    "value": "{\n   \"response\": {\n       \"status\": {\n           \"success\": \"false\",\n           \"code\": 500,\n           \"message\": \"All requests have failed due to errors\",\n           \"total\": \"2\",\n           \"success_count\": \"0\"\n       },\n       \"customers\": {\n           \"customer\": [\n               {\n                   \"id\": \"172157568\",\n                   \"item_status\": {\n                       \"success\": \"false\",\n                       \"code\": \"8109\",\n                       \"message\": \"Customer is deleted after PII delete request\",\n                       \"warnings\": {\n                           \"warning\": []\n                       }\n                   }\n               },\n               {\n                   \"item_status\": {\n                       \"success\": \"false\",\n                       \"code\": \"400\",\n                       \"message\": \"Input is invalid, Please check request parameters or input xml/json\",\n                       \"warnings\": {\n                           \"warning\": []\n                       }\n                   }\n               }\n           ]\n       }\n   }\n}\n"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "response": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "object",
                          "properties": {
                            "success": {
                              "type": "string",
                              "example": "false"
                            },
                            "code": {
                              "type": "integer",
                              "example": 500,
                              "default": 0
                            },
                            "message": {
                              "type": "string",
                              "example": "All requests have failed due to errors"
                            },
                            "total": {
                              "type": "string",
                              "example": "2"
                            },
                            "success_count": {
                              "type": "string",
                              "example": "0"
                            }
                          }
                        },
                        "customers": {
                          "type": "object",
                          "properties": {
                            "customer": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "example": "172157568"
                                  },
                                  "item_status": {
                                    "type": "object",
                                    "properties": {
                                      "success": {
                                        "type": "string",
                                        "example": "false"
                                      },
                                      "code": {
                                        "type": "string",
                                        "example": "8109"
                                      },
                                      "message": {
                                        "type": "string",
                                        "example": "Customer is deleted after PII delete request"
                                      },
                                      "warnings": {
                                        "type": "object",
                                        "properties": {
                                          "warning": {
                                            "type": "array"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false,
        "x-readme": {
          "code-samples": [
            {
              "language": "curl",
              "code": "https://{host}/v1.1/customer/get?id=122728432"
            },
            {
              "code": "curl --location 'https://eu.api.capillarytech.com/v1.1/customer/get?format=json&email=sai.ishina9%40gmail.com%2Csai.ishina95%40gmail.com%2C9478341389%40pixar.com' \\\n--header 'X-CAP-CLIENT-COUNTRYCODE: 1' \\\n--header 'Authorization: Basic cHVuLjAOjIwMNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0Yjcw'",
              "language": "shell",
              "name": "Retrieve details of customer in bulk"
            }
          ],
          "samples-languages": [
            "curl",
            "shell"
          ]
        }
      }
    }
  },
  "x-readme": {
    "headers": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```