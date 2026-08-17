---
updatedAt: 2026-07-07T10:14:11.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Points Rolling Expiry

Points rolling expiry is a feature that resets or extends the expiry date of loyalty points when a customer performs certain actions, such as making a transaction or redeeming points. These actions are referred to as "rolling events." Points rolling expiry allows you to control when loyalty points expire, ensuring that points remain valid as long as the customer continues to engage in rolling events.

When a rolling event occurs, the expiry date for all points earned is updated or rolled to a later date. The "rolling window" determines how far this expiry date is extended. For example, a rolling window of 12 months will extend the expiry date of the earned points by 12 months.

# Creating a Points Rolling Expiry

To configure the points rolling expiry for a loyalty program, follow these steps:

1. On the Loyalty+ home page, navigate to the **Settings** page by clicking the  icon

   <Image align="center" className="border" width="80%" border={true} src="https://files.readme.io/64b830120e85aec6c4247c2d2384fd11cf16521b55bd38edd0ced7e2dcdc0b74-image.png" ></Image>
2. Select **Points Rolling Expiry** from the menu.
3. Enable points rolling expiry for all programs using the **Points rolling expiry across program** toggle.
4. Select the rolling expiry strategy using the **Points rolling expiry strategy** dropdown.

The rolling expiry strategies are as follows:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Rolling Expiry Strategy
      </th>
      <th>
        Description
      </th>
      <th>
        Example
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Maximum expiry date
      </td>
      <td>
        All points earned by the customer are assigned a single expiry date. If the date passes without a new rolling event, the expiry date for the points is reset to the [expiry conditions](https://docs.capillarytech.com/docs/points#expiry-conditions) configured within the loyalty program. This applies to points with a 'rolling' expiry strategy.
      </td>
      <td>
        A customer earns points on January 1st 2025. The following configurations define the expiration of the points earned by the customer:
        * Points expiry for loyalty program: six months from date of issual (July 1st 2025).
        * Points rolling expiry strategy: 12 months from the date of issual. The customer makes a transaction on June 1st 2025, extending the expiry to June 1st of the following year (2026). If no further rolling events occur and the rolling window date (June 1st, 2026) has passed, the points will expire on this day.
      </td>
    </tr>
    <tr>
      <td>
        Add one more rolling window
      </td>
      <td>
        If no rolling events happen during the last rolling window, the expiry date is extended by another rolling window. The strategies for which the rolling window applies can be selected.
        Refer to the [expiry conditions table](https://docs.capillarytech.com/docs/points#expiry-conditions) for more information on the strategies available for points expiry.
      </td>
      <td>
        A customer earns points that expire after 12 months. If no rolling events occur during this time, the expiry date automatically extends by another 12 months.
      </td>
    </tr>
  </tbody>
</Table>

5. Select the expiry strategies for which the rolling window is applied using the **Types of points expiry strategies to be rolled over** dropdown. This is applicable for the **Add one more rolling window** rolling expiry strategy.
6. Enter the period for the rolling window and select the units (**Days** or **Months**) from the dropdown menu.
7. Select the customer activities for which the rolling window is applied using the **Customer activities for points expiry extension** dropdown.\
   For more information on the types of activities and events, refer to the documentation on [customer activities](https://docs.capillarytech.com/docs/milestones-new-flow#3-other-customer-level-activities) and [behavioural events](https://docs.capillarytech.com/docs/setup-test-behavioral-events#types-of-behavioral-events).

   > **Note:** Rolling expiry only recalculates when one of the selected customer activities occurs. For example, if **Point Redemption** is the only activity selected, an ordinary earning transaction will not roll the expiry date.
8. Select **Done** to save the changes and create a points rolling expiry.

The points rolling expiry for all loyalty programs is successfully created.

<Image align="center" className="border" width="60%" border={true} src="https://files.readme.io/9f89c4ca36b909be2d93d4cd800d64cc0e20704ba7187cf095d7202144dde136-Points_Expiry_Settings_Guide.gif" ></Image>

# Editing a Points Rolling Expiry

1. On the Loyalty+ home page, navigate to the **Settings** page by clicking the  icon.

   <Image align="center" className="border" width="80%" border={true} src="https://files.readme.io/64b830120e85aec6c4247c2d2384fd11cf16521b55bd38edd0ced7e2dcdc0b74-image.png" ></Image>
2. Select **Points Rolling Expiry** from the menu.
3. Edit the required fields.
4. Select **Done** to save the changes.

The points rolling expiry for all loyalty programs is successfully edited.