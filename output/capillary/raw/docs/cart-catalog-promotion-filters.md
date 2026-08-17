---
updatedAt: 2026-07-03T10:50:52.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Cart & Catalog Promotion Filters

The filter lets you create an audience list with customers who earned, issued or redeemed  specific number of promotions during a selected period.

<Callout icon="📘" theme="info">
  ### Note

  The Cart Promotion filter supports up to 2,000 cart promotions per organization. This limit includes both active and inactive cart promotions. Once the limit is reached, newly created cart promotions are not available for selection while configuring audience filters. If your organization requires a higher limit, raise a Jira ticket to the Product Support Team.&#x20;
</Callout>

## Promotion Issued

Filter customers based on the number of promotions issued in given time duration.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Filter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Promotion issued count
      </td>

      <td>
        Let's you filter customers based on the number of promotions issued to them within a specific range. You can define a minimum and maximum value. For example, you can target customers who were issued between 5 and 10 promotions. You can also use operators such as **greater than or equal to**, **less than or equal to**, **equals**, and **in range**.
      </td>
    </tr>

    <tr>
      <td>
        Date
      </td>

      <td>
        Considers promotions issued during the selected period. You can define the duration using **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/common-filter-optionsin-filters#specific-dates">Specific dates</Anchor>** or **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/common-filter-optionsin-filters#relative-days">Relative days</Anchor>**.
      </td>
    </tr>

    <tr>
      <td>
        Campaign
      </td>

      <td>
        Filters customers based on the campaign through which the promotion was issued. Select one or more campaign to include only customers who were issued promotions as part of the selected campaign within the specified time period.
      </td>
    </tr>

    <tr>
      <td>
        Promotion name
      </td>

      <td>
        Filters customers based on specific promotions that were issued. You can select one or more promotion names to include customers who were issued the selected promotions during the defined duration.
      </td>
    </tr>

    <tr>
      <td>
        Promotion id
      </td>

      <td>
        Filters customers based on the unique ID(s) of the promotions issued. You can select one or more promotion IDs to precisely target customers, especially when multiple promotions have similar names.

        **Note:** Some promotion IDs may not appear in the “Promotion ID” dropdown due to a hard-coded limit of 1000. While you can search by promotion name, many promotions can share the same name, which may be confusing. Promotion IDs are unique and help differentiate promotions. To increase the limit, raise a ticket with the Product Support Team.
      </td>
    </tr>

    <tr>
      <td>
        Store Hierarchy
      </td>

      <td>
        Filters customers based on the store or zone from which the promotion was issued. You can select individual stores or upload a store list, or narrow down results using zones through the store hierarchy. For more information on store and zones refer to store hierarchy documentation.
      </td>
    </tr>
  </tbody>
</Table>

## Promotion Redeemed

Filter customers based on the number of promotions redeemed in a given time duration.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Filter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Promotion redeemed count
      </td>

      <td>
        Lets you filter customers based on the number of promotions redeemed within a specific range. You can define a minimum and maximum value. For example, you can target customers who redeemed between 5 and 10 promotions. You can also use operators such as **greater than or equal to**, **less than or equal to**, **equals**, and **in range**.
      </td>
    </tr>

    <tr>
      <td>
        Date
      </td>

      <td>
        Considers promotions redeemed during the selected period. You can define the duration using **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/common-filter-optionsin-filters#specific-dates">Specific dates</Anchor>** or **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/common-filter-optionsin-filters#relative-days">Relative days</Anchor>**.
      </td>
    </tr>

    <tr>
      <td>
        Campaign
      </td>

      <td>
        Filters customers based on the campaign through which the promotion was redeemed. Select a campaign to include only those customers who redeemed promotions that were issued as part of the selected campaign within the specified time period.
      </td>
    </tr>

    <tr>
      <td>
        Promotion name
      </td>

      <td>
        Filters customers based on specific promotions that were redeemed. You can select one or more promotion names to include customers who redeemed the selected promotions during the defined duration.
      </td>
    </tr>

    <tr>
      <td>
        Promotion id
      </td>

      <td>
        Filters customers based on the unique ID(s) of the promotions redeemed. You can select one or more promotion IDs to precisely target customers, especially when multiple promotions have similar names.

        **Note:** Some promotion IDs may not appear in the “Promotion ID” dropdown due to a hard-coded limit of 1000. While you can search by promotion name, many promotions can share the same name, which may be confusing. Promotion IDs are unique and help differentiate promotions. To increase the limit, raise a ticket with the Product Support Team.
      </td>
    </tr>

    <tr>
      <td>
        Store Hierarchy
      </td>

      <td>
        Filters customers based on the store or zone from which the promotion was redeemed. You can select individual stores or upload a store list, or narrow down results using zones through the store hierarchy. For more information on store and zones refer to store hierarchy documentation.
      </td>
    </tr>
  </tbody>
</Table>

## About to expire promotions

Filter customers whose promotions will expire during a specified time.

| Filter          | Description                                                                                                                                                                                                                                                                                                                                                                                             |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Promotion count | Lets you filter customers based on the number of promotions that are about to expire within a specific range. You can define a minimum and maximum value. For example, you can target customers who were issued between 5 and 10 promotions. You can also use operators such as **greater than or equal to**, **less than or equal to**, **equals**, and **in range**.                                  |
| Date            | Considers promotions that are set to expire during the selected period. You can define the duration using **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/common-filter-optionsin-filters#specific-dates">Specific dates</Anchor>** or **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/common-filter-optionsin-filters#relative-days">Relative days</Anchor>**. |
| Campaign        | Filters customers based on the campaign linked to the promotions that are about to expire. Select one or more campaign to include only customers whose promotions are linked to the campaign are nearing expiry within the specified time period.                                                                                                                                                       |
| Promotion name  | Filters customers based on specific promotions that are about to expire. You can select one or more promotion names to include customers whose selected promotions are nearing expiry during the defined duration.                                                                                                                                                                                      |

## Promotion earned

Filter customers based on the number of promotions earned in a given time duration.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Filter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Promotion earned count
      </td>

      <td>
        Lets you filter customers whose number of earned promotions is in a specific range. You can select a range from minimum to maximum promotions. For example, you can get customers who earned between 5 -10 promotions. You can also use the operators **greater than** **equal**, **less than equal**, **equals** and **in range of**.
      </td>
    </tr>

    <tr>
      <td>
        Date
      </td>

      <td>
        Considers promotions earned in the specified period. You can choose the duration either by **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/common-filter-optionsin-filters#specific-dates">Specific dates</Anchor>** or **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/common-filter-optionsin-filters#relative-days">Relative days</Anchor>**.
      </td>
    </tr>

    <tr>
      <td>
        Campaign
      </td>

      <td>
        Filters customers based on the campaign through which the promotion was earned. Select one or more campaign to include only those customers who earned promotions that were issued as part of the selected campaign within the specified time period.
      </td>
    </tr>

    <tr>
      <td>
        Promotion name
      </td>

      <td>
        Filters customers based on specific promotions they earned. You can select one or more promotion names to include customers who earned those selected promotions during the defined duration.
      </td>
    </tr>

    <tr>
      <td>
        Promotion id
      </td>

      <td>
        Filters customers based on the unique ID of the promotions earned. You can select one or more promotion IDs. This is useful when you want to precisely target customers who earned a specific promotion, especially when multiple promotions have similar names.

        **Note:** Some promotion IDs may not appear in the “Promotion ID” dropdown due to a hard-coded limit of 1000. While you can search by promotion name, many promotions can share the same name, which may be confusing. Promotion IDs are unique and help differentiate promotions. To increase the limit, raise a ticket with the Product Support Team.
      </td>
    </tr>

    <tr>
      <td>
        Store Hierarchy
      </td>

      <td>
        Filters customers based on the store or zone where the promotion was earned. You can select individual stores or upload a store list, or narrow down results using zones through the store hierarchy. For more information on store and zones refer to store hierarchy documentation.
      </td>
    </tr>
  </tbody>
</Table>

<br />