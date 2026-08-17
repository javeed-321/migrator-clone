---
updatedAt: 2026-03-04T06:04:35.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Purchase Pattern/Behavior Based Filters

## Preferred shopping day/time

This lets you build an audience group based on their purchased day and time behavior. You can get customers who mostly shopped on specific days of the week or month.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/39fc2db-J4zWS-Hk8OjyVmYWxB6GR8sxAgRuxDm8Cw.png" />

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
        Percentage\*
      </td>

      <td>
        This filter will let you choose the preferred shopping day and time.

        Enter the percentage contribution on their overall purchases based on which you want to filter.

        For example, Include customers whose purchase percentage is more than 50% in the first week (1-7) of a month.
      </td>
    </tr>

    <tr>
      <td>
        Day\*
      </td>

      <td>
        From the chosen duration, you can further filter by the shopping days. You can further choose from the day of the week/month.

        * **Day of Month**: Choose this to get customers by monthly shopping behavior, say, customers who shopped more than 50% from 1-5 of every month, and select the days accordingly in **select day of the month**.
        * **Day of Week**: Choose this to get customers by weekly shopping behavior, say, customers who shopped more than 50% on Saturday and Sunday, and select the Weeks accordingly in **select day of the week** .
      </td>
    </tr>

    <tr>
      <td>
        Time\*
      </td>

      <td>
        This lets you further filter based on the purchased time. For example, customers whose more than 40% shopping was between 5 pm to 9 pm.
      </td>
    </tr>

    <tr>
      <td>
        During\*
      </td>

      <td>
        This lets you filter customers who transacted in a specific period.

        You can choose duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>
  </tbody>
</Table>

## Avg. basket size

This filter lets you build an audience group based on their average basket size value. An average basket size refers to the total line items sold (excluding quantity)/total number of transactions.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/1629fda-Qb9pmpgfUTnLOJeDTAl2QSiLuL2Dnh3KWg.png" />

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
        During\*
      </td>

      <td>
        This lets you filter customers by their ABS by customers based on basket size in a specific period.
        You can choose duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>

    <tr>
      <td>
        ABS Range\*
      </td>

      <td>
        You can get the customers whose basket sizes are in the selected range.
        You can either include or exclude a given condition.

        * **Greater than equal**: Get customers whose average basket size is greater than or equal to the value you specify
        * **Less than equal**: Get customers whose average basket size is less than or equal to the value you specify
        * **Equals**: Get customers whose average basket size is equal the value you specify
        * **In range of**:  Get customers whose average basket size is between a specific range (including minimum and maximum value you specify). For example, if you specify 50-100, you will get customers whose average basket size greater than or equal to 50 and less than or equal to 100.
      </td>
    </tr>

    <tr>
      <td>
        Product
      </td>

      <td>
        This lets you further filter our ABS of specific products or categories.

        For example, customers whose ABS in the current year is greater than 3 only from the Electronics category.

        You can select products by Parent category, Category, or Item code. For details on how to configure each option, see Product filter.
      </td>
    </tr>
  </tbody>
</Table>

## Discount seekers

This lets you build an audience group based on the discount value obtained for the chosen period.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/d215280-KRzkL0J8sAewaaLwLB0_4NJ12XsQEivXcw.png" />

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
        During\*
      </td>

      <td>
        This lets you filter customers based on discounts in a specific period.

        You can choose Lifetime or customer duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>

    <tr>
      <td>
        Discount\*
      </td>

      <td>
        This filter lets you choose the discount value by which you want filter customers.\
        You can select discount value from Amount or Percentage.

        * **Amount**: To get by flat discount amount.
        * **Percentage**: To get discount by percentage of transaction amount.

        Following are the sub-options available for the discount selection:

        * **Greater than equal**: Get customers who obtained discount value (percentage or flat) greater than or equal to the value you specify
        * **Less than equal**: Get customers who obtained discount value (percentage or flat) less than or equal to the value you specify\
          Equals: Get customers who obtained discount value (percentage or flat) equal to the value you specify
        * **In range of**:  Get customers who obtained discount value (percentage or flat) between a specific range (including minimum and maximum value you specify). For example, if you specify 50-100, you will get all customers who obtained discount greater than or equal to 50, and less than or equal to 100.
      </td>
    </tr>
  </tbody>
</Table>

## Recency

Let you build an audience group based on when they recently made the purchase. For example, you can get customers that shopped in the last two months.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/65aa44b-vUfNyCq_0J9BqNYZxBRwXewUDIUwvEfoLw.png" />

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
        Range\*
      </td>

      <td>
        You can get the customers based on when they recently made the purchase.
        You can either include or exclude a given condition.

        You can select the quantity using the operators Greater than equal, Less than equal, Equals, and In the range of (this also considers the minimum and maximum points mentioned).
      </td>
    </tr>

    <tr>
      <td>
        Date
      </td>

      <td>
        This filter lets you filter customers based when they made a purchase.\
        You can choose duration either by lifetime purchases, specific dates, or by relative days.
      </td>
    </tr>

    <tr>
      <td>
        During
      </td>

      <td>
        This lets you filter customers based on when they recently made the purchase in a specific period.

        You can choose duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>
  </tbody>
</Table>

## Average spent per unit item

This filter lets you build an audience group based on their average item cost. The average spent per item for a customer is the total transactions/Number of line items purchased.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/0a64039-AwO2fRtM2zs2t6W1Zdq8VKU0DQ_OICKEyA.png" />

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
        Average Spent Range\*
      </td>

      <td>
        This lets you filter customers whose average spent per item is in the specified range.

        You can use operators like greater than, less than, equals, or  in the range of.
      </td>
    </tr>

    <tr>
      <td>
        Product
      </td>

      <td>
        This lets you get customers based on their average spend per unit in a specific category or item.

        For example, customers whose average spent value is greater than $10 from the products of the Electronics category.

        You can select products by Parent category, Category, or Item code. For details on how to configure each option, see Product filter.
      </td>
    </tr>
  </tbody>
</Table>

## Average transaction value

Lets you build an audience group based on their average transaction value (ATV).\
ATV =  Total transaction amount of a customer/Total number of transactions made by the customer

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/c9d09a9-hx1X_BD6yJL08rTIaba43Hy4qWcuP9XaaA.png" />

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
        During\*
      </td>

      <td>
        This lets you filter customers whose average transaction value is in a specific period.

        You can either choose Lifetime or a specific duration.

        * *Lifetime*\*: Lets you get customers based on their average transaction value from all the purchases made till date.

        You can choose custom duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>

    <tr>
      <td>
        Range\*
      </td>

      <td>
        This lets you get customers by the average transaction value range.

        You can use operators like greater than, less than, equals, and in the range of to specify the range.
      </td>
    </tr>

    <tr>
      <td>
        Product
      </td>

      <td>
        This lets you filter average transaction value for a specific category or item.

        For example, customers whose average transaction value for the products purchased from the Jewelry category is greater $500.

        You can select products by Parent category, Category, or Item code. For details on how to configure each option, see Product filter.
      </td>
    </tr>

    <tr>
      <td>
        Store/Zone
      </td>

      <td>
        You can get the customers based on the purchase amount in a specific store(s) or zone(s).
      </td>
    </tr>
  </tbody>
</Table>

## Favorite products

Lets you build an audience list based on the number of purchases of a specific item, category, brand, product, or product attributes.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/1cb1fff-UsOjhvGh0sYJxOS0NFH4o4saQGkcVPYaWQ.png" />

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
        Product\*
      </td>

      <td>
        This lets you get top n customers that purchased a specific item(s).

        * **Parent Category**: Lets you get customers that bought items of a specific parent category. The options you see are based on the parent category defined for the org. You can filter results further using either any product of the selected categories or products with specific attributes. Attributes are that configured for your product hierarchy such as brand name, image url, price, and style
        * **Category**: Lets you get customers that bought items of a specific product category. You can filter the results further using either any product of the selected category(s) or products with specific attributes. Attributes are that configured for your product hierarchy such as brand name, image URL, price, and style
        * **Item Code**: Lets you get customers that bought specific items. You can choose items either by uploading item codes (upload list), fetching manually (enter values) or by product attributes such as brand name, image URL, price, style, and so on (based on attribute)
          You will also see other categories such as Child based on the product hierarchy of your organization.
      </td>
    </tr>

    <tr>
      <td>
        Based on\*
      </td>

      <td>
        This lets you filter customer by favorite product based on a specific parameter.

        * **Quantity bought**: Use this to define favorite products based on the purchase quantity.
        * **Amount spent**: Use this to define favorite products based on the amount spent for the selected product or product category.
        * **Number of bills with product**: Use this to define favorite products based on the number of bills that contain the selected product or product category.
      </td>
    </tr>

    <tr>
      <td>
        Percentage\*
      </td>

      <td>
        This lets you set the favorite condition on the percentage of their transaction.

        For example, get customers who purchased a specific parent product (sandwich) during their lifetime based on the amount spent more than 40%.
      </td>
    </tr>

    <tr>
      <td>
        During\*
      </td>

      <td>
        This lets you get top n customers that purchased a specific item(s) in a specific period.

        You can choose duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>

    <tr>
      <td>
        Day
      </td>

      <td>
        From the chosen duration, you can filter customers based on shopping behavior. You can further choose from the day of the week/month.

        * **Day of Month**: Choose this to get customers by monthly shopping behavior, say, customers who shopped more than 50% from 1-5 of every month, and select the days accordingly in select day of the month
        * **Day of Week:** Choose this to get customers by weekly shopping behavior, say, customers who shopped more than 50% on Saturday and Sunday, and select the Weeks accordingly in select day of the week
      </td>
    </tr>

    <tr>
      <td>
        Hours
      </td>

      <td>
        Lets you further filter customers for a specific time period. You can select a time range in hours. For example, you can get customers who bought more than 40% quantity of an item code in the last one month during the peak hours (say 15:00 - 20:00).

        Click +/- Fields > Select Hours > Specify the time range in the fields that appear.
      </td>
    </tr>

    <tr>
      <td>
        Store/Zone
      </td>

      <td>
        You can get the customers who shopped in a specific store(s) or zone(s).

        For details, see [Store hierarchy](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/store-hierarchy) filter.
      </td>
    </tr>
  </tbody>
</Table>

## Average spent per quantity

This helps you filter customers whose average spent amount matches the specified amount

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
        Range\*
      </td>

      <td>
        This lets you filter customers whose average amount spent per quantity is greater than equal, less than equal, equals, and in range (minimum and maximum amount).
      </td>
    </tr>

    <tr>
      <td>
        Product\*
      </td>

      <td>
        This lets you filter customers whose average spent amount matches the specified amount

        You can select products by Parent category, Category, or Item code. For details on how to configure each option, see Product filter.
      </td>
    </tr>
  </tbody>
</Table>

## Latency

This helps you filter customers based on the latency (average days between two consecutive purchases) in minimum to maximum numbers during specific, relative, or lifetime dates.

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
        Minimum to maximum numbers
      </td>

      <td>
        Choose the latency duration by which you want to filter customers.

        For example, you can get customers who have not shopped for that last 60 days.
      </td>
    </tr>

    <tr>
      <td>
        During\*
      </td>

      <td>
        This filter helps you filter customers based on latency.

        You can either choose Lifetime or a custom duration using [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>
  </tbody>
</Table>

## Recency/ frequency ratio

This filters customers based on their average basket size (in range, minimum/maximum) for their transactions during Lifetime and Specific/Relative dates.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/3fe8107-Recency.png" />

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
        During
      </td>

      <td>
        This filters customers based on their average basket size.

        You can choose lifetime or a custom duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>

    <tr>
      <td>
        Recency Range\*
      </td>

      <td>
        * **Greater than equal**: Get customers who did not shop for more than or equal to x days that you specify in no of days.
          * **Less than equal**: Get customers who did not shop for less than or equal to x days that you specify in no of days.
          * **Equals**: Get customers who did not shop for x days that you specify in no of days.
          * **In range of**:  Get customers who did not shop between a specific range (including minimum and maximum days you specify). For example, if you specify 50-100, you will get customers that did not shop for more than or equal to 50 days and less than or equal to 100 days.
      </td>
    </tr>

    <tr>
      <td>
        Date range
      </td>

      <td>
        Lets you filter customers based on their registration date. You can choose duration either by lifetime purchases, specific dates or by relative days.
      </td>
    </tr>
  </tbody>
</Table>

## Top customers

Lets you build audience group with top n customers based on their purchases or lifetime points earned.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/dac5baa-tDcUuJFMd4VktKPbYCd8RWmcCjicaWvlvw.png" />

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
        Top n customers\*
      </td>

      <td>
        Set the number of customers that want to choose from the top spending list (ranking). For example, set 10 to get top 10 customers, 50 to get top 50 customers, and so on.
      </td>
    </tr>

    <tr>
      <td>
        Lifetime points or Lifetime Purchases\*
      </td>

      <td>
        Choose Lifetime points to get the top n customers by their lifetime points; choose Lifetime purchases to get the top n customers by the purchased amount
      </td>
    </tr>

    <tr>
      <td>
        During\*
      </td>

      <td>
        This filters top customers based on their purchases or lifetime points earned.

        You can choose duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>
  </tbody>
</Table>

## Extra sales

This helps you filter customers based on their total sales/points redeemed ratio in the range greater than equal, less than equal, equals, and in (minimum and maximum count) during specific, relative, and lifetime dates.

| Filter  | Description                                                                                                                                      |
| :------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| Range\* | You can filter out customers based on the points redeemed ratio using the range greater than equal, less than equal, equal, and in the range of. |

## Top N customers

This filter lets you build an audience group with either top spent or more quantities purchased by customers of a specific store, zone, or concept. You can get the list of top n customers.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/25b5213-AVmca_1zQkcI9shZpDVZQQE9nfsUQfEBPg_1.png" />

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
        Top N customers\*
      </td>

      <td>
        Set the ranking number to get the audience list. For example, set 10 to get the top 10 customers, 50 to get the top 50 customers, and so on.
      </td>
    </tr>

    <tr>
      <td>
        Highest amount or quantity\*
      </td>

      <td>
        Choose the amount to get the top n customers by spent amount; choose quantity to get the top n customers by purchased line-item quantity. You can also choose customers based on the number of transactions made.
      </td>
    </tr>

    <tr>
      <td>
        During
      </td>

      <td>
        This filters top n customers based on their purchases or lifetime points earned.

        You can choose lifetime or custom duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>

    <tr>
      <td>
        Store Hierarchy
      </td>

      <td>
        You can get top n customers who shopped in selected stores, zones, or concepts.
      </td>
    </tr>

    <tr>
      <td>
        Product
      </td>

      <td>
        This lets you filter customers based on purchased items for a specific category.

        You can select products by Parent category, Category, or Item code. For details on how to configure each option, see Product filter.
      </td>
    </tr>
  </tbody>
</Table>

## Favourite store/zone/concept

Lets you create an audience group based on their favorite zone, store, or concept. Favorite is decided based on the most number of transactions in a specific duration. You can get customers that mostly shopped at your preferred stores, zones, or concepts.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/f630adf-qrtFKxOa9WZh4LtiJyDwqWAjUuH-rB-Ohw.png" />

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
        Store Hierarchy\*
      </td>

      <td>
        This option lets you filter customers by store(s) at which the activity is done. You can also select stores by zones and concepts.

        You can select the registered customer by using the hierarchy as a store, zone, and concept.
      </td>
    </tr>

    <tr>
      <td>
        During\*
      </td>

      <td>
        Filters customers who made most of their transactions in the store(s) that you select in a specific period.

        You can choose lifetime or custom duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>

    <tr>
      <td>
        Based on\*
      </td>

      <td>
        Filters customers who made most of their transactions in the store(s) that you select

        You can further select from the Quantity bought, Amount spent, and Number of bills with the product.
      </td>
    </tr>

    <tr>
      <td>
        Day
      </td>

      <td>
        From the chosen duration, you can filter customers based on shopping behavior. You can further choose from the day of the week/month.

        To learn more, see here.
      </td>
    </tr>

    <tr>
      <td>
        Hours
      </td>

      <td>
        Lets you further filter customers based on their time of shopping. You can select the time range in hours. For example, you can get customers whose number of bills is more than 40% in store1 for the last one month during the peak hours (say 15:00 - 20:00).
      </td>
    </tr>

    <tr>
      <td>
        Product
      </td>

      <td>
        This lets you filter customers based on purchased items for a specific category.

        You can select products by Parent category, Category, or Item code. For details on how to configure each option, see Product filter.
      </td>
    </tr>
  </tbody>
</Table>

## Top N per registered store customers

Among the registered customers of each store, this filter lets you filter customers that are in the top in the number of purchases, purchased value, or purchased quantity in their lifetime in the org.

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
        Top Customers\*
      </td>

      <td>
        Lets you get top n customers of a specific store or all stores. You can get the customers by either an absolute number or percentage.
      </td>
    </tr>

    <tr>
      <td>
        Store Heirarchy
      </td>

      <td>
        Among the top customers, you can get customers who shopped at least once in a specific store, zone, or concept.
      </td>
    </tr>

    <tr>
      <td>
        Product
      </td>

      <td>
        Among the top customers, you can get only customers who purchased a specific product, category, or product with the specific product attribute.
      </td>
    </tr>

    <tr>
      <td>
        Duration
      </td>

      <td>
        Among the top customers, you can get only customers who shopped at least once in a specific duration.

        You can choose duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>
  </tbody>
</Table>

## Top N Customers per last transacted store

Among the customers whose recent transactions at the current store, this filter fetches the top list (by transaction count, the purchase amount, or purchase quantity) among those customers for each store. The top list is considered on the lifetime purchases at the org list.

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
        Top Customers\*
      </td>

      <td>
        Lets you get top n customers of a specific store or all stores. You can get the customers by either an absolute number or percentage.
      </td>
    </tr>

    <tr>
      <td>
        Store Heirarchy
      </td>

      <td>
        Among the top customers, you can get customers who shopped at least once in a specific store, zone, or concept.
      </td>
    </tr>

    <tr>
      <td>
        Product
      </td>

      <td>
        Among the top customers, you can get only customers who purchased a specific product, category, or product with the specific product attribute.
      </td>
    </tr>

    <tr>
      <td>
        Duration
      </td>

      <td>
        Among the top customers, you can get only customers who shopped at least once in a specific duration.

        You can choose duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>
  </tbody>
</Table>

## Last purchased product

The last purchased product filter helps you build an audience group based on their last shopped product at any store.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/27060bd-VzgviOdCorvXHJ9h09Np3_kRiB7u8ZRROA.png" />

| Filter          | Description                                                                                                                             |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Product\*       | Lets you fetch a list of customers who last purchased products based on product categories or product with specific product attributes. |
| Store Heirarchy | Lets you fetch a list of customers who last purchased products in a specific store, zone, or concept.                                   |

## Favorite product at the Item Level

This filters out customers on the basis of their spending on a specific product for a defined time period.

<Image align="center" className="border" border={true} src="https://files.readme.io/d408a2d-UKgAh5p-0Bokhz7XoiqRf6HSuEFazjD2kw.png" />

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
        Category\*
      </td>

      <td>
        Fetches customers who shopped products of a specific parent category(s)/ category(s)/ item code. You can filter the results further using either any product of the selected category(s) or products with specific attributes. Attributes could be Brand name, image URL, price, style and so on
      </td>
    </tr>

    <tr>
      <td>
        Duration\*
      </td>

      <td>
        Considers transactions done for a specific product in a specific duration.

        You can choose lifetime or custom duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
      </td>
    </tr>

    <tr>
      <td>
        Based on\*
      </td>

      <td>
        Filters out customers whose transactions are based on Quantity bought, Amount spent, or Number of bills for a product.
      </td>
    </tr>

    <tr>
      <td>
        Store Hierarchy
      </td>

      <td>
        Lets you fetch a list of customers whose favorite product is from a specific store, zone, or concept.
      </td>
    </tr>
  </tbody>
</Table>

## Average item value

This filters out the customers on the basis of their average transaction value for a specific product during a defined time period.

<Image align="center" className="border" border={true} src="https://files.readme.io/32a5ab3-TuGR2-zHmYXtbAhG1R6_G7za27PmGHJbDQ.png" />

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
        Product\*
      </td>

      <td>
        Select the product, attribute, or category that you want to consider for the average item value.

        You can use category, sub category, or item code to filter out the customers.
      </td>
    </tr>

    <tr>
      <td>
        Duration\*
      </td>

      <td>
        Choose your preferred duration for which the transactions has to be considered. For example, you can get customers by average value of pizza purchased during the last 3 months.

        You can choose lifetime or custom duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days). You can also choose lifetime for all transactions.
      </td>
    </tr>

    <tr>
      <td>
        ATV Range\*
      </td>

      <td>
        Set your preferred average transaction value using the options available like greater than equal, less than equal, equal, and in the range of.
      </td>
    </tr>
  </tbody>
</Table>

## Promotion earned

The filter lets you create audience list with customers who earned specific number of promotions during a selected period.

<Image align="center" className="border" border={true} width="70% " src="https://files.readme.io/af66bbd-G6wqjSK8D1cGOYiH45q11M5vLLe7KbkDwg.png" />

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
        Promotion Count\*
      </td>

      <td>
        Lets you filter customers whose number of earned promotions is in a specific range. You can select a range from minimum to maximum promotions. For example, you can get customers who earned between 5 -10 promotions. You can also use the operators greater than equal, less than equal, equals and in range of.
      </td>
    </tr>

    <tr>
      <td>
        Duration\*
      </td>

      <td>
        Considers promotions earned in the specified period. You can choose duration either by specific dates or relative days.

        You can choose duration either by [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days). You can also choose lifetime for all transactions.
      </td>
    </tr>

    <tr>
      <td>
        Campaigns
      </td>

      <td>
        Lets you filter out customers on the basis of promotions earned during a specific campaign. You can select the required campaign from the drop down list of available campaigns.
      </td>
    </tr>

    <tr>
      <td>
        Promotion name
      </td>

      <td>
        Lets you filter out customers on the basis of specific promotions earned. You can select the required promotion from the drop down list of available promotions.
      </td>
    </tr>

    <tr>
      <td>
        Store Heirarchy
      </td>

      <td>
        Lets you filter out customers on the basis of promotions earned in a specific store. You can select the required store from the drop down list of available stores.
      </td>
    </tr>
  </tbody>
</Table>