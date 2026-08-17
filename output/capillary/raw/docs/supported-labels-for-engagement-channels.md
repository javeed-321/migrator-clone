---
updatedAt: 2026-08-05T06:51:54.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Supported Labels across Engage+

Labels are dynamic tags used to personalize the message content used in the respective communication channel. These tags allow you to insert specific information, such as a recipient's name, store name, or other relevant details, into the message.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Label
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Store**
      </td>

      <td>
        Name of the branch or outlet of the organization.
      </td>
    </tr>

    <tr>
      <td>
        -**Registered Store**
      </td>

      <td>
        The store where the customer originally registered.
      </td>
    </tr>

    <tr>
      <td>
        \-- **Name**
      </td>

      <td>
        The name of the registered store where the customer originally registered.
      </td>
    </tr>

    <tr>
      <td>
        -**Last transacted Store**
      </td>

      <td>
        The most recent store where the customer made a purchase.
      </td>
    </tr>

    <tr>
      <td>
        \-- **Name**
      </td>

      <td>
        The name of the last transacted store where the customer made the transaction.
      </td>
    </tr>

    <tr>
      <td>
        **Customer**
      </td>

      <td>
        The full name of the customer. Example- Tom Johnson
      </td>
    </tr>

    <tr>
      <td>
        -**First Name**
      </td>

      <td>
        The customer’s first name, used for personalization. Example- Tom
      </td>
    </tr>

    <tr>
      <td>
        -**Last Name**
      </td>

      <td>
        The customer’s last name. Example- Johnson
      </td>
    </tr>

    <tr>
      <td>
        -**First name** (capitalized)
      </td>

      <td>
        The customer’s first name capitalized. Example- TOM
      </td>
    </tr>

    <tr>
      <td>
        -**Last name** (capitalized)
      </td>

      <td>
        The customer’s last name capitalized. Example- JOHNSON
      </td>
    </tr>

    <tr>
      <td>
        -**Full name** (capitalized)
      </td>

      <td>
        Full name of the customer with proper capitalization. Example - TOM JOHNSON
      </td>
    </tr>

    <tr>
      <td>
        -**Loyalty Points**
      </td>

      <td>
        Current available loyalty points of the customer.
      </td>
    </tr>

    <tr>
      <td>
        -**Loyalty Points Floor**
      </td>

      <td>
        Rounds loyalty points down to the nearest whole number.
      </td>
    </tr>

    <tr>
      <td>
        -**Loyalty Points Value**
      </td>

      <td>
        Monetary equivalent of the loyalty points.
      </td>
    </tr>

    <tr>
      <td>
        -**Loyalty Points Value Floor**
      </td>

      <td>
        Rounded value of loyalty points in currency.
      </td>
    </tr>

    <tr>
      <td>
        -**Slab Name**
      </td>

      <td>
        Name of the tier or slab assigned to the customer. For example - Loyalty tier
      </td>
    </tr>

    <tr>
      <td>
        -**Lifetime Purchases**
      </td>

      <td>
        Total purchase value made by the customer to date.
      </td>
    </tr>

    <tr>
      <td>
        -**Lifetime Points**
      </td>

      <td>
        Total loyalty points earned by the customer over time.
      </td>
    </tr>

    <tr>
      <td>
        -**Customer Email**
      </td>

      <td>
        Email address of the customer.
      </td>
    </tr>

    <tr>
      <td>
        -Customer Mobile
      </td>

      <td>
        Mobile number of the customer.
      </td>
    </tr>

    <tr>
      <td>
        -**User Id AES**
      </td>

      <td>
        Unique encrypted identifier of the customer.
      </td>
    </tr>

    <tr>
      <td>
        **Promotion Points**
      </td>

      <td>
        Points awarded as part of a promotion.
      </td>
    </tr>

    <tr>
      <td>
        -**Points Expiry Date**
      </td>

      <td>
        Date when the customer’s loyalty points will expire.
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yyyy**
      </td>

      <td>
        The date (in the specified format) on which the promotion points expire.  Date format: month/day/year. For example- 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd/mm/yyyy**
      </td>

      <td>
        The date (in the specified format) on which the promotion points expire. Date format: day/month/year.  For example- 12/12/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **yyyy-mm-dd**
      </td>

      <td>
        The date (in the specified format) on which the promotion points expire.  Date format: year-month-day. For example- 2025-12-20
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yy**
      </td>

      <td>
        The date (in the specified format) on which the promotion points expire.  Date format: month/day/two-digit year. For example-12/12/25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon yyyy**
      </td>

      <td>
        The date (in the specified format) on which the promotion points expire.  Date format: day abbreviated month year. For example-12 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **Day, Mon dd, yy**
      </td>

      <td>
        The date (in the specified format) on which the promotion points expire.  Date format: weekday, abbreviated month day, two-digit year. For example- Monday, Dec 02, 25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd.mm.yy**
      </td>

      <td>
        The date (in the specified format) on which the promotion points expire.  Date format: day.month.year (two-digit). For example- 02.12.25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon**
      </td>

      <td>
        The date (in the specified format) on which the promotion points expire.  Date format: day abbreviated month. For example- 02 Dec
      </td>
    </tr>

    <tr>
      <td>
        -**Number of points floor**
      </td>

      <td>
        Rounds numbers by removing the decimal points after the whole number. For example, 225.12 points will round to 225.
      </td>
    </tr>

    <tr>
      <td>
        -**Points issued on action**
      </td>

      <td>
        [Points](https://docs.capillarytech.com/docs/points) awarded to the customer by this specific [Issue Currency action](https://docs.capillarytech.com/docs/loyalty-promotions-actions).
      </td>
    </tr>

    <tr>
      <td>
        -**Points issued on event**
      </td>

      <td>
        Total [points](https://docs.capillarytech.com/docs/points) awarded to the customer across all sources (regular and [loyalty promotions](https://docs.capillarytech.com/docs/loyalty-promotions-introduction)) during this event.
      </td>
    </tr>

    <tr>
      <td>
        -**Points issued from promotion**
      </td>

      <td>
        Total [points](https://docs.capillarytech.com/docs/points) awarded to the customer through [loyalty promotions](https://docs.capillarytech.com/docs/loyalty-promotions-introduction) during this event.
      </td>
    </tr>

    <tr>
      <td>
        -**Points issued from benefit**
      </td>

      <td>
        Total [points](https://docs.capillarytech.com/docs/points) awarded to the customer through program benefits during this event.
      </td>
    </tr>

    <tr>
      <td>
        **Alternate Currency**
      </td>

      <td>
        Labels for non-standard currencies configured for your organisation (for example, stars or coins). The currency name in the label reflects the configured currency identifier.
      </td>
    </tr>

    <tr>
      <td>
        -**\{Currency name\} currency issued on action**
      </td>

      <td>
        Amount of the alternate currency issued by this specific [Issue Currency action](https://docs.capillarytech.com/docs/loyalty-promotions-actions).
      </td>
    </tr>

    <tr>
      <td>
        -**\{Currency name\} currency issued on event**
      </td>

      <td>
        Total amount of the alternate currency issued across all sources during this event.
      </td>
    </tr>

    <tr>
      <td>
        -**\{Currency name\} currency issued from promotion**
      </td>

      <td>
        Total amount of the alternate currency issued through [loyalty promotions](https://docs.capillarytech.com/docs/loyalty-promotions-introduction) during this event.
      </td>
    </tr>

    <tr>
      <td>
        -**\{Currency name\} currency issued from benefit**
      </td>

      <td>
        Total amount of the alternate currency issued through program benefits during this event.
      </td>
    </tr>

    <tr>
      <td>
        **Unsubscribe**
      </td>

      <td>
        Provides customers with a clear and easy way to opt out of future communications.
      </td>
    </tr>

    <tr>
      <td>
        **Coupons**
      </td>

      <td>
        List of active coupon codes available to the customer.
      </td>
    </tr>

    <tr>
      <td>
        -**Voucher**
      </td>

      <td>
        Specific voucher assigned to the customer.
      </td>
    </tr>

    <tr>
      <td>
        -**Coupon Expiry Date**
      </td>

      <td>
        Expiry date of the customer’s coupon.
      </td>
    </tr>

    <tr>
      <td>
        \--- **mm/dd/yy**
      </td>

      <td>
        The date (in the specified format) until which the coupon remains valid.  Date format: month/day/two-digit year.  For Example - 12/12/25
      </td>
    </tr>

    <tr>
      <td>
        \--- **dd Mon yyyy**
      </td>

      <td>
        The date (in the specified format) until which the coupon remains valid.  Date format: day abbreviated month year. For Example - 12 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **Voucher Validity**
      </td>

      <td>
        Validity period of the voucher.
      </td>
    </tr>

    <tr>
      <td>
        \--- **Day, Mon dd, yy**
      </td>

      <td>
        The date (in the specified format) until which the coupon remains valid.  Date format: weekday, abbreviated month day, two-digit year. For Example - Monday, Dec 12, 25
      </td>
    </tr>

    <tr>
      <td>
        \--- **dd.mm.yy**
      </td>

      <td>
        The date (in the specified format) until which the coupon remains valid.  Date format: day.month.year (two-digit). For Example - 12.02.25
      </td>
    </tr>

    <tr>
      <td>
        \--- **dd Mon**
      </td>

      <td>
        The date (in the specified format) until which the coupon remains valid.  Date format: day abbreviated month. For Example - 12 Dec
      </td>
    </tr>

    <tr>
      <td>
        **Coupon Start Date**
      </td>

      <td>
        Start date when the coupon becomes valid.
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yyyy**
      </td>

      <td>
        The start date (in the specified format) when the coupon becomes valid.  Date format: month/day/year.  For example: 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd/mm/yyyy**
      </td>

      <td>
        The start date (in the specified format) when the coupon becomes valid. Date format: day/month/year. For example: 02/12/25
      </td>
    </tr>

    <tr>
      <td>
        \-- **yyyy-mm-dd**
      </td>

      <td>
        The start date (in the specified format) when the coupon becomes valid. Date format: year-month-day. For example: 2025-02-12
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yy**
      </td>

      <td>
        The start date (in the specified format) when the coupon becomes valid. Date format: month/day/two-digit year. For example: 12/02/25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon yyyy**
      </td>

      <td>
        The start date (in the specified format) when the coupon becomes valid. Date format: day abbreviated month year. For example: 02 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **Day, Mon dd, yy**
      </td>

      <td>
        The start date (in the specified format) when the coupon becomes valid.<br />Date format: weekday, abbreviated month day, two-digit year.<br />For example: Monday, Dec 02, 25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd.mm.yy**
      </td>

      <td>
        The start date (in the specified format) when the coupon becomes valid. Date format: day.month.year (two-digit). For example: 02.12.25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon**
      </td>

      <td>
        The start date (in the specified format) when the coupon becomes valid. Date format: day abbreviated month. For example: 02 Dec
      </td>
    </tr>

    <tr>
      <td>
        -**Bulk voucher code**
      </td>

      <td>
        Comma-separated list of all coupon codes issued in bulk by this action.
      </td>
    </tr>

    <tr>
      <td>
        -**Number of vouchers issued**
      </td>

      <td>
        Total number of coupons issued by this action.
      </td>
    </tr>

    <tr>
      <td>
        **Badge**
      </td>

      <td>
        Information about [badges](https://docs.capillarytech.com/docs/customer_badges) earned by the customer through a [loyalty promotion](https://docs.capillarytech.com/docs/loyalty-promotions-introduction) or workflow.
      </td>
    </tr>

    <tr>
      <td>
        -**Badge expiry date**
      </td>

      <td>
        Date when the issued badge expires.
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yyyy**
      </td>

      <td>
        The badge expiry date in month/day/year format. For example: 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd/mm/yyyy**
      </td>

      <td>
        The badge expiry date in day/month/year format. For example: 02/12/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **yyyy-mm-dd**
      </td>

      <td>
        The badge expiry date in year-month-day format. For example: 2025-12-02
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yy**
      </td>

      <td>
        The badge expiry date in month/day/two-digit year format. For example: 12/02/25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon yyyy**
      </td>

      <td>
        The badge expiry date in day abbreviated-month year format. For example: 02 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **Day, Mon dd, yy**
      </td>

      <td>
        The badge expiry date in weekday, abbreviated-month day, two-digit year format. For example: Monday, Dec 02, 25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd.mm.yy**
      </td>

      <td>
        The badge expiry date in day.month.two-digit year format. For example: 02.12.25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon**
      </td>

      <td>
        The badge expiry date in day abbreviated-month format. For example: 02 Dec
      </td>
    </tr>

    <tr>
      <td>
        -**Days until badge expiry**
      </td>

      <td>
        Number of days remaining until the issued badge expires.
      </td>
    </tr>

    <tr>
      <td>
        **Rewards**
      </td>

      <td>
        Information about [catalog rewards](https://docs.capillarytech.com/docs/rewards-catalog) issued to the customer through a [loyalty promotion](https://docs.capillarytech.com/docs/loyalty-promotions-introduction) or workflow.
      </td>
    </tr>

    <tr>
      <td>
        -**Number of rewards issued**
      </td>

      <td>
        Total number of catalog rewards issued to the customer by this action.
      </td>
    </tr>

    <tr>
      <td>
        **Dynamic Dates**
      </td>

      <td>
        Auto-fills a date based on the number of days you enter .
      </td>
    </tr>

    <tr>
      <td>
        -**mm/dd/yyyy**
      </td>

      <td>
        Auto fills a date (in the specified format) based on the number of days you enter.<br />Date format: month/day/year.<br />For example: 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        -**dd/mm/yyyy**
      </td>

      <td>
        Auto fills a date (in the specified format) based on the number of days you enter.<br />Date format: day/month/year.<br />For example: 02/12/2025
      </td>
    </tr>

    <tr>
      <td>
        -**yyyy-mm-dd**
      </td>

      <td>
        Auto fills a date (in the specified format) based on the number of days you enter.
        Date format: year-month-day.<br />For example: 2025-12-02
      </td>
    </tr>

    <tr>
      <td>
        -**mm/dd/yy**
      </td>

      <td>
        Auto fills a date (in the specified format) based on the number of days you enter.
        Date format: month/day/two-digit year.<br />For example: 12/02/25
      </td>
    </tr>

    <tr>
      <td>
        -**dd Mon yyyy**
      </td>

      <td>
        Auto fills a date (in the specified format) based on the number of days you enter.
        Date format: day abbreviated month year.<br />For example: 02 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        -**Day, Mon dd, yy**
      </td>

      <td>
        Auto fills a date (in the specified format) based on the number of days you enter.<br />Date format: weekday, abbreviated month day, two-digit year.<br />For example: Monday, Dec 02, 25
      </td>
    </tr>

    <tr>
      <td>
        -**dd.mm.yy**
      </td>

      <td>
        Auto fills a date (in the specified format) based on the number of days you enter.<br />Date format: day.month.year (two-digit).<br />For example: 02.12.25
      </td>
    </tr>

    <tr>
      <td>
        -**dd Mon**
      </td>

      <td>
        Auto fills a date (in the specified format) based on the number of days you enter.<br />Date format: day abbreviated month.<br />For example: 02 12
      </td>
    </tr>

    <tr>
      <td>
        **Slab Expiring On**
      </td>

      <td>
        Date when the customer’s current slab/tier will expire.
      </td>
    </tr>

    <tr>
      <td>
        -**mm/dd/yyyy**
      </td>

      <td>
        The Date (in the specified format) when the customer’s current slab/tier will expire. Date format: month/day/year. For example: 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        -**dd/mm/yyyy**
      </td>

      <td>
        The Date (in the specified format) when the customer’s current slab/tier will expire. Date format: day/month/year. For example: 02/122025
      </td>
    </tr>

    <tr>
      <td>
        -**yyyy-mm-dd**
      </td>

      <td>
        The Date (in the specified format) when the customer’s current slab/tier will expire. Date format: year-month-day. For example: 2025-12-02
      </td>
    </tr>

    <tr>
      <td>
        -**mm/dd/yy**
      </td>

      <td>
        The Date (in the specified format) when the customer’s current slab/tier will expire. Date format: month/day/two-digit year. For example: 12/02/25
      </td>
    </tr>

    <tr>
      <td>
        -**dd Mon yyyy**
      </td>

      <td>
        The Date (in the specified format) when the customer’s current slab/tier will expire. Date format: day abbreviated month year. For example: 02 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        -**Day, Mon dd, yy**
      </td>

      <td>
        The Date (in the specified format) when the customer’s current slab/tier will expire. Date format: weekday, abbreviated month day, two-digit year. For example: Monday, Dec 02, 25
      </td>
    </tr>

    <tr>
      <td>
        -**dd.mm.yy**
      </td>

      <td>
        The Date (in the specified format) when the customer’s current slab/tier will expire. Date format: day.month.year (two-digit). For example: 02.12.25
      </td>
    </tr>

    <tr>
      <td>
        -**dd Mon**
      </td>

      <td>
        The Date (in the specified format) when the customer’s current slab/tier will expire. Date format: day abbreviated month. For example: 02 Dec
      </td>
    </tr>

    <tr>
      <td>
        **Gap to renew**
      </td>

      <td>
        Remaining visits, points, or purchases needed to retain loyalty benefits.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to renew visits**
      </td>

      <td>
        Number of visits remaining to retain slab/loyalty benefits.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to renew tracker**
      </td>

      <td>
        Tracking metric for renewal calculations.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to renew current visits value**
      </td>

      <td>
        Current count of visits considered for renewal.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to renew tracker value**
      </td>

      <td>
        Current value in tracker for renewal.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to renew points**
      </td>

      <td>
        Points required to renew the slab.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to renew purchase**
      </td>

      <td>
        Purchase value required to renew slab.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to renew current points value**
      </td>

      <td>
        Current points considered in renewal calculation.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to renew current purchase value**
      </td>

      <td>
        Current purchase value considered in renewal calculation.
      </td>
    </tr>

    <tr>
      <td>
        Gap to upgrade
      </td>

      <td>
        Days or points remaining for a customer to upgrade their tier/slab.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to upgrade lifetime points**
      </td>

      <td>
        Lifetime points required to upgrade tier.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to upgrade lifetime purchase**
      </td>

      <td>
        Lifetime purchase value required to upgrade tier.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to upgrade tracker**
      </td>

      <td>
        Tracker metric for upgrade calculation.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to upgrade customer points**
      </td>

      <td>
        Customer points considered for upgrade.
      </td>
    </tr>

    <tr>
      <td>
        -**Gap to upgrade tracker value**
      </td>

      <td>
        Tracker value used in upgrade calculation.
      </td>
    </tr>

    <tr>
      <td>
        **Offer Name**
      </td>

      <td>
        Name of the offer being sent to the customer.
      </td>
    </tr>

    <tr>
      <td>
        **Points Expiry Tags**
      </td>

      <td>
        Date when the customer’s loyalty points will expire.
      </td>
    </tr>

    <tr>
      <td>
        -**Loyalty Points Expiry**
      </td>

      <td>
        Date when the customer’s loyalty points will expire.
      </td>
    </tr>

    <tr>
      <td>
        -**Regular Points Expiring on 7th Day**
      </td>

      <td>
        Loyalty points expiring on the 7th day.
      </td>
    </tr>

    <tr>
      <td>
        -**Regular Points Expiring on 15th Day**
      </td>

      <td>
        Loyalty points expiring on the 15th day.
      </td>
    </tr>

    <tr>
      <td>
        -**Regular Points Expiring on 30th Day**
      </td>

      <td>
        Loyalty points expiring on the 30th day.
      </td>
    </tr>

    <tr>
      <td>
        -**Regular Points Expiring by Month End**
      </td>

      <td>
        Loyalty points expiring by the end of the month.
      </td>
    </tr>

    <tr>
      <td>
        -**Currency Value of Regular Points Expiring by Month End**
      </td>

      <td>
        Monetary value of points expiring by month's end.
      </td>
    </tr>

    <tr>
      <td>
        -**Loyalty & Promotional Points Expiry**
      </td>

      <td>
        Combined expiry date of loyalty and promotional points.
      </td>
    </tr>

    <tr>
      <td>
        -**Points Expiring on 7th Day**
      </td>

      <td>
        Total points expiring on the 7th day.
      </td>
    </tr>

    <tr>
      <td>
        -**Points Expiring on 15th Day**
      </td>

      <td>
        Total points expiring on the 15th day.
      </td>
    </tr>

    <tr>
      <td>
        -**Points Expiring on 30th Day**
      </td>

      <td>
        Total points expiring on the 30th day.
      </td>
    </tr>

    <tr>
      <td>
        -**Points Expiring by Month End**
      </td>

      <td>
        Total points expiring by month's end.
      </td>
    </tr>

    <tr>
      <td>
        -**Currency Value of Points Expiring by Month End**
      </td>

      <td>
        Monetary value of points expiring by month's end.
      </td>
    </tr>

    <tr>
      <td>
        **Gift Voucher**
      </td>

      <td>
        Gift voucher assigned to the customer.
      </td>
    </tr>

    <tr>
      <td>
        -**Gift voucher expiry date**
      </td>

      <td>
        Expiry date of the assigned gift voucher.
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yyyy**
      </td>

      <td>
        The date (in specified format) when the assigned gift voucher will expire. Date format: month/day/year. For example: 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd/mm/yyyy**
      </td>

      <td>
        The date (in specified format) when the assigned gift voucher will expire. Date format: day/month/year. For example: 02/12/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **yyyy-mm-dd**
      </td>

      <td>
        The date (in specified format) when the assigned gift voucher will expire. Date format: year-month-day. For example: 2025-12-02
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yy**
      </td>

      <td>
        The date (in specified format) when the assigned gift voucher will expire. Date format: month/day/two-digit year. For example: 12/02/25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon yyyy**
      </td>

      <td>
        The date (in specified format) when the assigned gift voucher will expire. Date format: day abbreviated month year. For example: 02 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **Day, Mon dd, yy**
      </td>

      <td>
        The date (in specified format) when the assigned gift voucher will expire. Date format: weekday, abbreviated month day, two-digit year. For example: Monday, Dec 02, 25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd.mm.yy**
      </td>

      <td>
        The date (in specified format) when the assigned gift voucher will expire. Date format: day.month.year (two-digit). For example: 02.12.25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon**
      </td>

      <td>
        The date (in specified format) when the assigned gift voucher will expire. Date format: day abbreviated month. For example: 02 Dec
      </td>
    </tr>

    <tr>
      <td>
        **Badge**
      </td>

      <td>
        Badge earned by the customer.
      </td>
    </tr>

    <tr>
      <td>
        -**Badge Expiry Date**
      </td>

      <td>
        Date when the earned badge will expire.
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yyyy**
      </td>

      <td>
        The Date (in specified format) when the earned badge will expire. Date format: month/day/year. For example: 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd/mm/yyyy**
      </td>

      <td>
        The Date (in specified format) when the earned badge will expire. Date format: day/month/year. For example: 02/12/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **yyyy-mm-dd**
      </td>

      <td>
        The Date (in specified format) when the earned badge will expire. Date format: year-month-day. For example: 2025-12-02
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yyyy**
      </td>

      <td>
        The Date (in specified format) when the earned badge will expire. Date format: month/day/year. For example: 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon yyyy**
      </td>

      <td>
        The Date (in specified format) when the earned badge will expire. Date format: day abbreviated month year. For example: 02 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **Day, Mon dd, yy**
      </td>

      <td>
        The Date (in specified format) when the earned badge will expire. Date format: weekday, abbreviated month day, two-digit year. For example: Monday, Dec 02, 25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd.mm.yy**
      </td>

      <td>
        The Date (in specified format) when the earned badge will expire. Date format: day.month.year (two-digit). For example: 02.12.25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon yyyy**
      </td>

      <td>
        The Date (in specified format) when the earned badge will expire. Date format: day abbreviated month year  For example: 02 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        -**Badge Issue Expiry Date**
      </td>

      <td>
        Expiry date based on when the badge was issued.
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yyyy**
      </td>

      <td>
        The Date (in specified format) when the badge issued to the customer will expire. Date format: month/day/year. For example: 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd/mm/yyyy**
      </td>

      <td>
        The Date (in specified format) when the badge issued to the customer will expire. Date format: day/month/year. For example: 02/12/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **yyyy-mm-dd**
      </td>

      <td>
        The Date (in specified format) when the badge issued to the customer will expire. Date format: year-month-day. For example: 2025-12-02
      </td>
    </tr>

    <tr>
      <td>
        \-- **mm/dd/yyyy**
      </td>

      <td>
        The Date (in specified format) when the badge issued to the customer will expire. Date format: month/day/year. For example: 12/02/2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon yyyy**
      </td>

      <td>
        The Date (in specified format) when the badge issued to the customer will expire. Date format: day abbreviated month year. For example: 02 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **Day, Mon dd, yy**
      </td>

      <td>
        The Date (in specified format) when the badge issued to the customer will expire. Date format: weekday, abbreviated month day, two-digit year. For example: Monday, Dec 02, 25
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd.mm.yy**
      </td>

      <td>
        The Date (in specified format) when the badge issued to the customer will expire. Date format: day.month.year (two-digit). For example: 02.12.2025
      </td>
    </tr>

    <tr>
      <td>
        \-- **dd Mon yyyy**
      </td>

      <td>
        The Date (in specified format) when the badge issued to the customer will expire. Date format: day abbreviated month year. For example: 02 Dec 2025
      </td>
    </tr>

    <tr>
      <td>
        -**Days Until Expiry**
      </td>

      <td>
        Number of days left before a point, voucher, or badge expires.
      </td>
    </tr>

    <tr>
      <td>
        -**Issue Days Until Expiry**
      </td>

      <td>
        Days remaining from badge/voucher issuance until expiry.
      </td>
    </tr>

    <tr>
      <td>
        -**Badges Issue No Expiry**
      </td>

      <td>
        Badges issued with no expiry date.
      </td>
    </tr>

    <tr>
      <td>
        -**Badges Enroll No Expiry**
      </td>

      <td>
        Badges earned via enrollment that don’t have an expiry.
      </td>
    </tr>

    <tr>
      <td>
        **Promotion**
      </td>

      <td>
        Name or description of the active promotion for the customer.
      </td>
    </tr>

    <tr>
      <td>
        -**Promotion expiry date**
      </td>

      <td>
        Expiry date of the customer's promotion benefits or points.
      </td>
    </tr>

    <tr>
      <td>
        **Concept**
      </td>

      <td>
        <Anchor target="_blank" href="https://docs.capillarytech.com/docs/store-hierarchy#/create-concept">Concept</Anchor> associated with the store or program.
      </td>
    </tr>

    <tr>
      <td>
        -**Registered Concept**
      </td>

      <td>
        The concept where the customer originally registered.
      </td>
    </tr>

    <tr>
      <td>
        \-- **Concept Name**
      </td>

      <td>
        Name of the registered concept.
      </td>
    </tr>

    <tr>
      <td>
        -**Last transacted Concept**
      </td>

      <td>
        The concept where the customer last made a transaction.
      </td>
    </tr>

    <tr>
      <td>
        \-- **Concept Name**
      </td>

      <td>
        Name of the last transacted concept.
      </td>
    </tr>

    <tr>
      <td>
        **Optout**
      </td>

      <td>
        A label allowing customers to opt out of future communications.
      </td>
    </tr>

    <tr>
      <td>
        **view_in_browser** (Email only)
      </td>

      <td>
        Generates a View in Browser link that allows recipients to open the email content in a web browser.

        **Note**: The `{{view_in_browser}}` label must be placed directly in the email content where you want the link to appear. It automatically renders as a clickable View in Browser link when the email is delivered. This tag cannot be used inside HTML attributes such as href=`{{view_in_browser}}`, and it cannot be customized or embedded within another link.
      </td>
    </tr>

    <tr>
      <td>
        **Registration custom fields**
      </td>

      <td>
        Custom fields collected during customer registration. Example: Accessibility Needs, Address, contractstatus, corporatename etc.
      </td>
    </tr>

    <tr>
      <td>
        **Customer extended fields**
      </td>

      <td>
        Additional customer attributes beyond standard profile fields. Example: Gender, DOB, Ethnicity, Nationality etc.
      </td>
    </tr>

    <tr>
      <td>
        **Entry Event** ( This is applicable only for journeys)
      </td>

      <td>
        Captures the information linked to the conditions that trigger a customer’s entry into the journey.
      </td>
    </tr>

    <tr>
      <td>
        -**Customer profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures customer related information  from the entry conditions when either **Current Transaction**, **Partner program linked**, **Customer update**, **Customer Registration**, **Target Enrollment**, **Promotion Issued**, **Reward Issued**, **Points Issued**, **Coupon Issued**, **Tier Upgraded** and **Tier Downgraded**  is selected as the Event Type in the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger">entry trigger</Anchor>. For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor> documentation.
      </td>
    </tr>

    <tr>
      <td>
        -**Transaction Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures transaction related information  from the entry conditions when **Current Transaction** is selected as the Event Type in the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger">entry trigger</Anchor>. For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor> documentation.
      </td>
    </tr>

    <tr>
      <td>
        -**Store Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures store related information from the entry conditions when either **Current Transaction**, **Customer update**, **Coupon Issued**,  is selected as the Event Type in the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger">entry trigger</Anchor>. For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor> documentation.
      </td>
    </tr>

    <tr>
      <td>
        **Customer Registration Event Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures customer registration related information from the entry conditions when **Customer Registration** is selected as the Event Type in the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger">entry trigger</Anchor>. For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor> documentation.
      </td>
    </tr>

    <tr>
      <td>
        **Target Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures information related to a customer’s enrollment in a target-based promotion  from the entry conditions when either **Target Enrollment**, **Target value**, **Promotion issued** is selected as the Event Type in the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger">entry trigger</Anchor>. For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor>documentation.
      </td>
    </tr>

    <tr>
      <td>
        **Promotion Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures promotion related information from the entry conditions when **Promotion Issued** is selected as the Event Type in the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger">entry trigger</Anchor>.  For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor>documentation.
      </td>
    </tr>

    <tr>
      <td>
        **Customer Updated Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures information related to a customer’s profile update from the entry conditions when **Customer Update** is selected as the Event Type in the [entry trigger](https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger) . For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor> documentation.
      </td>
    </tr>

    <tr>
      <td>
        **Reward Issued Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures information related to a reward issued to a customer from the entry conditions when **Reward Issued** is selected as the Event Type in the [entry trigger](https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger) . For more information refer to [Configure events and conditions](http://link) documentation.
      </td>
    </tr>

    <tr>
      <td>
        **Points issued Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures points issued related information from the entry conditions when **Points Issued** is selected as the Event Type in the [entry trigger](https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger) . For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor>documentation.
      </td>
    </tr>

    <tr>
      <td>
        **Coupon Series Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures coupon series related information from the entry conditions when **Coupon Issued** is selected as the Event Type in the [entry trigger](https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger). For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor> documentation.
      </td>
    </tr>

    <tr>
      <td>
        **Tier Upgraded**(This is applicable only for journeys)
      </td>

      <td>
        Captures tier upgrade related information from the entry conditions when **Tier Upgraded** is selected as the Event Type in the [entry trigger](https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger) . For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor>  documentation.
      </td>
    </tr>

    <tr>
      <td>
        **Tier downgraded Profile** (This is applicable only for journeys)
      </td>

      <td>
        Captures tier downgrade–related information from the entry conditions when **Tier Downgraded** is selected as the Event Type in the [entry trigger](https://docs.capillarytech.com/docs/configure-journey#/configuring-the-entry-trigger). For more information refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions#/">Configure events and conditions</Anchor>   documentation.
      </td>
    </tr>
  </tbody>
</Table>