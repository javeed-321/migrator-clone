---
updatedAt: 2026-03-04T06:04:35.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# AI Powered Filters

aiRA powered filters are designed to get customers with a specific prediction. When you combine aiRA-powered filters with standard filters, the chances are higher to achieve hit rate, better incremental sales and offer relevant products to customers at the right time.

aiRA power filters use the AI stack of Capillary (AIRA), which has the best in class algorithms with customer tags. These algorithms compute the historical transaction data, customer behavioral data, campaign data, and more to generate an almost accurate prediction.

To apply a zero power filter, follow these steps

1. In New Audience Filters, go to **Apply filter condition** > **Filter** > **AI Power Filters**. \[Know more]
2. Select your preferred filter from the category.
3. Configure the using the **mandatory** and **optional** filter options as required. For details, see the relevant topics.
4. Click **Save Group** to save the audience group.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/b72c9af-image_2.png" />

## Transaction prediction

This filter helps you build an audience group with customers that are likely to transact with the brand in the next n days.

<Image className="border" border={true} src="https://files.readme.io/a281c07-72jfpIufGCFufuYgkLccsF52xBk7jluZ7A.png" />

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
        Likely to transact in the Next n days\*
      </td>

      <td>
        Select the period (in the next n days) that you want to consider for predicting the transaction probability of customers (likelihood). For example, you can include customers predicted to shop in the next 7, 15, and 30 days.
      </td>
    </tr>

    <tr>
      <td>
        Likelihood\* (probability of the transaction)
      </td>

      <td>
        You need to set the maximum/minimum probability of transacting with the brand in the selected period.

        This option lets you get the customers with maximum or minimum (0-1) probability of responses with the brand in a selected period. You can select very high (>=0.7), high (\<.7 and >=.3), medium (\<.3 and >=.1), and low (\<.1), and one from the list to get top n customers with the highest or lowest probability of responses with the brand in the next n days.

        For example, you can include customers with a very high probability of transacting with the brand in the next 7, 15, and 30 days; you can include customers whose chances are to make only one transaction in the next 15 days.
      </td>
    </tr>
  </tbody>
</Table>

## Lapsation prediction

This filter helps you build an audience group with customers that are not likely to transact with the brand. This filter is beneficial for the churn killer campaign.

The lapsation prediction filter helps you to get high CLTV (Customer Life Time Value) to increase customer retention.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/0f361d5-Zttzdf5umN2YuzZ7KchlzjJsCWISskcMMw.png" />

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
        Likelihood\* (probability of not making the transaction)
      </td>

      <td>
        This option lets you get the customers with maximum or minimum probability of stopping transactions with the brand. You can select very high (>=0.7), high (\<.7 and >=.3), medium (\<.3 and >=.1), and low (\<.1), and one from the list to get top n customers with the highest or lowest probability of responses with the brand in the next n days.

        For example, you can include customers with a very high probability of not going to transact with the brand.
      </td>
    </tr>
  </tbody>
</Table>

## Response prediction

This filter helps you build an audience group with customers who are likely to respond with the brand in the next n days.

![726](https://files.readme.io/86db59d-JLjEnbLfbRiQEbpT7bLyCe3BXz6XpqqQng.png "JLjEnbLfbRiQEbpT7bLyCe3BXz6XpqqQng.png")

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
        Next n days\*
      </td>

      <td>
        Select the period (in the next n days) that you want to consider for predicting the response probability of customers (likelihood). For example, you can include customers predicted to respond in the next 7, 15, and 30 days.
      </td>
    </tr>

    <tr>
      <td>
        Likelihood\* (probability of the response)
      </td>

      <td>
        This option lets you get the customers with maximum or minimum probability of responses with the brand in a selected period. You can select very high (>=0.7), high (\<.7 and >=.3), medium (\<.3 and >=.1), and low (\<.1), and one from the list to get top n customers with the highest or lowest probability of responses with the brand in the next n days.

        For example, you can include customers with a very high probability of responses to the brand in the next 7, 15, and 30 days; you can include customers whose chances are to make only one response in the next 15 days.
      </td>
    </tr>
  </tbody>
</Table>

## Time slot prediction

This filter helps you build an audience group with customers that are likely to transact during the selected day(s), hour range, or week(s) of a month. This filter also helps to achieve higher incremental sales of the brands.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/193baf6-xeCKb98T5G7ixA55Wn87fSm_qfEsgstV7w.png" />

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
        Day of Week\*
      </td>

      <td>
        Select the day (in select day of week) that you want to consider for predicting the transaction probability of customers.

        For example, you can include customers predicted to shop on Sunday.
      </td>
    </tr>

    <tr>
      <td>
        Time Slot
      </td>

      <td>
        Select the time slot  that you want to consider for predicting the transaction probability of customers.

        For example, you can include customers predicted to shop on Sunday between 12 pm to 3 pm, and 6 pm to 9 pm.
      </td>
    </tr>

    <tr>
      <td>
        Week of Month
      </td>

      <td>
        Select the week that you want to consider for predicting the transaction probability of customers.

        For example, you can include customers predicted to shop on Sunday in the 1st week of a month.
      </td>
    </tr>
  </tbody>
</Table>

## Top N transaction prediction

The transaction prediction filter helps you build an audience group with customers that are likely to transact with the brand in the next n days.

This filter has an additional ability to get top customers (highest probability) by absolute count (number) or percentage.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/f0eef99-c6hvy-fiApta1ATLgrqdsaV5pTmKpNKS-w.png" />

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
        Number/Percentage\*
      </td>

      <td>
        Select the unit measure using drop-down options, either number or percentage. This option is a unit measure for the top customer(s) count in number or percentage.

        For example, you can include the top 10 numbers or percentage of customers predicted to transact with the brand in the next 15 days.
      </td>
    </tr>

    <tr>
      <td>
        Top\* (n customers - percentage/absolute)
      </td>

      <td>
        Enter the value for top customers counts according to the number or percentage selected.

        For example, you can include the top 10 customers or the top 10 percent of customers that are likely to transact with the brand in the next 15 days.
      </td>
    </tr>

    <tr>
      <td>
        Next n days\*
      </td>

      <td>
        Select the period (in the next n days) that you want to consider for predicting the transaction probability of customers (likelihood).

        For example, you can include the top 10 customers predicted to shop in the next 7, 15, and 30 days.
      </td>
    </tr>

    <tr>
      <td>
        Likelihood (probability of the transaction)\*
      </td>

      <td>
        You need to set the maximum or minimum probability of transacting with the brand in the selected period.

        This option lets you get the customers with maximum or minimum (0-1) probability of responses with the brand in a selected period. You can select very high (>=0.7), high (\<.7 and >=.3), medium (\<.3 and >=.1), and low (\<.1), and one from the list to get top n customers with the highest or lowest probability of responses with the brand in the next n days.

        For example, you can include customers with a very high probability of transacting with the brand in the next 7, 15, and 30 days; you can include customers whose chances are to make only one transaction in the next 15 days.
      </td>
    </tr>
  </tbody>
</Table>

## Top N lapsation prediction

The lapsation prediction filter helps you build an audience group with customers that are not going to transact with the brand and is beneficial for the churn killer campaign.

This filter has an additional ability to get top customers (highest probability) by absolute count (number) or percentage.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/22095e8-ZF3VldgeTgcc4edUo_BOP1Ma2GxGPUFvcA.png" />

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
        Number/Percentage\*
      </td>

      <td>
        Select the unit measure using drop-down options, either number or percentage.
        This option is a unit measure for the top customer(s) count in number or percentage.

        For example, you can include the top 10 numbers or percentage of customers predicted to stop transactions with the brand.
      </td>
    </tr>

    <tr>
      <td>
        Top\* (n customers - percentage/absolute)
      </td>

      <td>
        Enter the value for top customers counts according to the number or percentage selected.

        For example, you can include the top 10 customers or the top 10 percent of customers that are likely to stop transactions with the brand.
      </td>
    </tr>

    <tr>
      <td>
        Likelihood (probability of not making the transaction)\*
      </td>

      <td>
        This option lets you get the customers with maximum or minimum probability of stopping transactions with the brand. You can select very high (>=0.7), high (\<.7 and >=.3), medium (\<.3 and >=.1), and low (\<.1), and one from the list to get top n customers with the highest or lowest probability of responses with the brand in the next n days.

        For example, you can include customers with a very high probability of not going to transact with the brand; you can include customers whose chances are to make only one transaction.
      </td>
    </tr>
  </tbody>
</Table>

## Top N response prediction

The response prediction filter helps you build an audience group with customers that are likely to respond to the brand in the next n days. .

This filter has an additional ability to get top customers (highest probability) by absolute count (number) or percentage.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/049070d-d_ZPHz0nQBcdf6o5eGxY_-tDZyblde2Ixg.png" />

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
        Number/Percentage\*
      </td>

      <td>
        Select the unit measure using drop-down options,either number, or percentage.
        This option is a unit measure for the top customer(s) count in number or percentage.

        For example, you can include the top 10 number or percentage of customers predicted to respond to the brand in the next 15 days.
      </td>
    </tr>

    <tr>
      <td>
        Top\* (n customers - percentage/absolute)
      </td>

      <td>
        Enter the value for top customers count according to the number or percentage selected.

        For example, you can include the top 10 customers or top 10 percentage of customers that are likely to respond to the brand in the next 15 days.
      </td>
    </tr>

    <tr>
      <td>
        Next n days\*
      </td>

      <td>
        Select the period (in the next n days) that you want to consider for predicting the response probability of customers (likelihood).

        For example, you can include top 10 customers predicted to respond in the next 7, 15, and 30 days.
      </td>
    </tr>

    <tr>
      <td>
        Likelihood (probability of the response)\*
      </td>

      <td>
        This option lets you get the customers with maximum or minimum probability of responses with the brand in a selected period. You can select very high (>=0.7), high (\<.7 and >=.3), medium (\<.3 and >=.1), and low (\<.1), and one from the list to get top n customers with the highest or lowest probability of responses with the brand in the next n days.

        For example, you can include top 10 customers with a very high probability of responses to the brand in the next 7, 15 and 30 days; you can include customers whose chances are to make only one response in the next 15 days.
      </td>
    </tr>
  </tbody>
</Table>

## Top N time slot prediction

The time slot prediction filter helps you build an audience group with customers that are likely to transact during the selected day(s), hour range, or week(s) of a month. This filter also helps to achieve higher incremental sales of the brands.

This filter has an additional ability to get top customers (highest probability) by absolute count (number) or percentage.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/66efcc6-GFeosS31foFMXaUjoiRuO6TpNz6emsprBA.png" />

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
        Number/Percentage\*
      </td>

      <td>
        Select the unit measure using drop-down options, either number or percentage. This option is a unit measure for the top customer(s) count in number or percentage.

        For example, you can include the top 10 numbers or percentage of customers predicted to shop with the brand on Sunday.
      </td>
    </tr>

    <tr>
      <td>
        Top\* (n customers - percentage/absolute)
      </td>

      <td>
        Enter the value for top customers counts according to the number or percentage selected.

        For example, you can include the top 10 customers or the top 10 percent of customers that are likely to shop with the brand on Sunday.
      </td>
    </tr>

    <tr>
      <td>
        Day of Week\*
      </td>

      <td>
        Select the day (in select day of week) that you want to consider for predicting the transaction probability of customers.

        For example, you can include the top 10 customers predicted to shop on Sunday.
      </td>
    </tr>

    <tr>
      <td>
        Time Slot
      </td>

      <td>
        Select the time slot that you want to consider for predicting the transaction probability of customers.

        For example, you can include the top 10 customers predicted to shop on Sunday between 12 pm to 3 pm, and 6 pm to 9 pm.
      </td>
    </tr>

    <tr>
      <td>
        Week of Month
      </td>

      <td>
        Select the week that you want to consider for predicting the transaction probability of customers.

        For example, you can include the top 10 customers predicted to shop on Sunday in the 1st week of a month.
      </td>
    </tr>
  </tbody>
</Table>

## Top N store prediction

The store prediction filter helps you build an audience group with customers that are likely to transact at a store, zone, or concept.

This filter has the additional ability to get top customers by absolute count (number) or percentage.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/f88f76c-yVYma_NDl627kvQprlOz7BExlF2aUGu7yA.png" />

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
        Number/Percentage\*
      </td>

      <td>
        Select the unit measure using drop-down options, either number or percentage.
        This option is a unit measure for the top customer(s) count in number or percentage.

        For example, you can include the top 10 number or percentage of customers predicted to shop from the store(s), zone(s), or concept(s).
      </td>
    </tr>

    <tr>
      <td>
        Top\* (n customers - percentage/absolute)
      </td>

      <td>
        Enter the value for top customers counts according to the number or percentage selected.

        For example, you can include the top 10 customers or top 10 percent of customers that are likely to shop at the store(s), zone(s), or concept(s) you select.
      </td>
    </tr>

    <tr>
      <td>
        Store/Zone/Concept\*
      </td>

      <td>
        Select whether to get top N customers by  concept(s), zone(s), or store(s).
      </td>
    </tr>
  </tbody>
</Table>

## Top N product prediction

The product prediction filter helps you build an audience group with customers that are likely to purchase products using product categories.

This filter has the additional ability to get top customers by absolute count (number) or percentage.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/1fcc655-bUeCGVeN0EOoy7TTwA7N4bgYeNqI76rofw.png" />

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
        Number/Percentage\*
      </td>

      <td>
        Select the unit measure using drop-down options, either number or percentage.
        This option is a unit measure for the top customer(s) count in number or percentage. For example, you can include the top 10 numbers or percentage of customers predicted to purchase products using product categories.
      </td>
    </tr>

    <tr>
      <td>
        Top\* (n customers - percentage/absolute)
      </td>

      <td>
        Enter the value for top customers counts according to the number or percentage selected. For example, you can include the top 10 customers or the top 10 percent of customers that are likely to purchase products using product categories.
      </td>
    </tr>

    <tr>
      <td>
        Product category\*
      </td>

      <td>
        This option filters customers who are predicted to purchase products of a specific category(s). You can filter the results further using either any product or products with these attributes. To get customers who are likely to purchase by the category of the product, select the product category from the drop-down list. You can select the product category using any of the following options.
      </td>
    </tr>

    <tr>
      <td>
        Size of product\*
      </td>

      <td>
        To get customers who are likely to purchase by the size of the product, select the size of product from the drop-down list, and enter the value manually.
      </td>
    </tr>

    <tr>
      <td>
        Product name\*
      </td>

      <td>
        To get customers who are likely to purchase by product name, select product name from the drop-down list.
      </td>
    </tr>

    <tr>
      <td>
        Item code\*
      </td>

      <td>
        To get customers who are likely to purchase by item code, select item code from the drop-down list. S
      </td>
    </tr>
  </tbody>
</Table>

## Top N offer propensity

The top n offer propensity filter helps you build an audience group who are likely to respond to specific types of offers.

For example, consider you have a cashback offer enabled and have a budget for targeting or need to target only 1000 customers with the offer. Instead of seeking assistance from the analytics team to identify the most relevant customers, you can utilize the top n offer propensity filter to get top customers who have the highest inclination towards cashback offers.

* Only orgs that are mapped to the data science vertical will have this filter enabled.

<Image align="center" className="border" border={true} width="80%" src="https://files.readme.io/b336ec9-Ac0AG-GClsFCrG27Y3S0jIMtZF_4ojLTVw.png" />

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
        Top customers\*
      </td>

      <td>
        Absolute value or Percentage value: Select Number to get the exact number of customers \[or] percentage to get a proportion of customers and enter the value in top \_\_\_\_.
        For example, Include top 10 percent of customers.
      </td>
    </tr>

    <tr>
      <td>
        Customer who can respond to offer type\*
      </td>

      <td>
        Select the offer type using the drop-down list.
      </td>
    </tr>
  </tbody>
</Table>