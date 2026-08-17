---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Communication

Communication allows the org to reach out to customers and inform them about their tier upgrade or if their tier is renewed or if their points are getting expired through various channels -**Email**, **SMS**, **Wechat**, **Mobilepush**.

To set communication for tier upgrade, tier renewal, and points expiry, do the following.

1. On Intouch, navigate to **Menu** > **Loyalty+** > **Programs**.
2. In **Programs**, select the program you want to edit.
3. Click **Edit Program**.
4. Click **Communication**.
5. Configure **Tier Upgrade** communication.
6. Configure **Tier Downgrade** communication.
7. Configure **Points Expiry** communication.

## Tier Upgrade

Notify customers when they are upgraded to different tiers. To configure Tier upgrade notification, do the following.

1. Enable the tier/tiers to which the customer gets upgraded.

<Image className="border" width="smart" border={true} src="https://files.readme.io/04c75be-OhmhbGj7VdreSo2pqy1wpceOKGIqq9fRsQ.png" />

> 📘 For example, you enable **Upgrades to Tier 3**, customers will receive a message before they get upgraded to Tier 3 via any configured channel.

2. Click **Add Creative** for channels to configure a tier upgrade message. You can choose from existing templates or create a new creative. But for Wechat, only the existing templates can be used.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Channel
      </th>

      <th>
        Reference Link
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        SMS
      </td>

      <td>
        [Create SMS Template](https://docs.capillarytech.com/docs/create-email-template)
      </td>
    </tr>

    <tr>
      <td>
        Email
      </td>

      <td>
        [Create Email Template](https://docs.capillarytech.com/docs/create-sms-template)
      </td>
    </tr>

    <tr>
      <td>
        Mobile Push
      </td>

      <td>
        [Create Mobile Push Template](https://docs.capillarytech.com/docs/create-mobile-push-template)
      </td>
    </tr>

    <tr>
      <td>
        WeChat
      </td>

      <td>
        Create WeChat Template
      </td>
    </tr>
  </tbody>
</Table>

<Image className="border" width="smart" border={true} src="https://files.readme.io/12f56d2-1XFN1Yg2IxfP8xBKZEh9DnqXfcZh3W4V0Q.png" />

## Tier Renewal

Enable your preferred option to alert the customer before or after the tier renewal or tier downgrade.\
**Note**: The customer will not receive tier renewal/downgrade notifications if you have not configured tier renewal conditions.

> 📘 You can add and configure multiple alerts for tier downgrade. The alert is only sent if customers meet certain conditions.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Option
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Alert \_\_\_\_ Days before Renewal Check
      </td>

      <td>
        Customers are alerted before the configured days before tier renewal. For example, if a customer's tier is to be renewed on June 15, 2021, and you configure **Alert 7 Days before Renewal Check**, then customers will receive an alert on June 8, 2021.
      </td>
    </tr>

    <tr>
      <td>
        Alert Immediately after Renewal
      </td>

      <td>
        Customers receive an alert immediately after their tier is renewed.
      </td>
    </tr>

    <tr>
      <td>
        Alert Immediately after Downgrade
      </td>

      <td>
        Customers receive an alert immediately after they are downgraded to a lower tier.
      </td>
    </tr>
  </tbody>
</Table>

<Image className="border" width="smart" border={true} src="https://files.readme.io/9788d47-_mc9Mc2X5fZBt3ezk7ZKJ7NphWIWrw941w.png" />

## Points Expiry

To define communication for when points get expired for each tier, do the following.

1. In **Alert**, enter the number of days before the customer is alerted about tier downgrade.

<Image className="border" width="smart" border={true} src="https://files.readme.io/4a30630-SwTjdro-B3a7scWQ3TyZZjJOYmaBBBE7Hw.png" />

> 📘 If there are no renewal conditions set up, then renewal/downgrade reminder messages will NOT be sent out.

2. In **Only when the following criteria are true**, enable your preferred option and enter the desired value.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Option
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Cumulative Points
      </td>

      <td>
        Customers will receive an alert only if their lifetime points are greater than the configured value.
      </td>
    </tr>

    <tr>
      <td>
        Purchases
      </td>

      <td>
        Customers will receive an alert only if their lifetime purchases are greater than the configured value.
      </td>
    </tr>

    <tr>
      <td>
        Current points
      </td>

      <td>
        Customers will receive an alert only if their current points are greater than the configured value.
      </td>
    </tr>

    <tr>
      <td>
        Expiry Points
      </td>

      <td>
        Customers will receive an alert only if their expiry points are greater than the configured value.
      </td>
    </tr>
  </tbody>
</Table>

<Image className="border" width="smart" border={true} src="https://files.readme.io/dc84cc1-8HLo9Yv7IMviUr0aUZ6p-77TvxsiQEsIzA.png" />

3. In **And belongs to any of these tiers**, enable the desired tier(s).

<Image className="border" width="smart" border={true} src="https://files.readme.io/7d946cb-xkIJrJAlkaK9j5GsRdT_ZG7tvb6OB_I3tA.png" />

4. Click **Save & Continue**.

> 📘 Customers belonging to the enabled tier(s) will only receive the alert message.

## Advanced Settings

These settings help increase productivity by reaching out to customers based on your org's preferred channel (mandatory) and other channels based on customers'  availability in the order of priority. This can also minimize the cost of communication by reaching out to cheap communication channels and maximize the probability of conversion by prioritizing channels that could give better ROI.

To configure communication settings, follow these steps.

1. On **Intouch**, navigate to **Menu** > **Loyalty+** > **Programs**.
2. In Programs, select the program for which you want to set the communication setting and click **Edit Program** > **Advanced settings**.

![1042](https://files.readme.io/7e9a6ec-comms1.png "comms1.png")

3. In the **Communication Channels**, enable the Setup Communication toggle button to set mandatory channels and priority channels.

![1002](https://files.readme.io/25a09ef-comms2.png "comms2.png")

**Mandatory Channels**: Channels that are mandatory for sending the notifications\
**Priority Channels**: Channels that need to be triggered based on priority and availability. For example, if Mobile is set as priority 1, Mobile Push as priority 2, and email as priority 3, the system first checks whether SMS is configured and then checks if the mobile number is available for the customer. If anyone fails, then it will try to send the notification through mobile push and so on.

For example, consider for a tier upgrade event, SMS is set as a Mandatory Channel and the priority channels are eMail (1) and WeChat (2). When a tier is upgraded for the customers mentioned in the following table, notifications are sent based on the channel availability and configuration settings as explained below.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Channel
      </th>

      <th>
        SMS
      </th>

      <th>
        eMail
      </th>

      <th>
        WeChat
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Customer A
      </td>

      <td>
        Ma
      </td>

      <td>
        Ea
      </td>

      <td>
        Wa
      </td>
    </tr>

    <tr>
      <td>
        Customer B
      </td>

      <td>
        Mb
      </td>

      <td>
        *
      </td>

      <td>
        Wb
      </td>
    </tr>

    <tr>
      <td>
        Customer C
      </td>

      <td>
        *
      </td>

      <td>
        Ec
      </td>

      <td>
        *
      </td>
    </tr>
  </tbody>
</Table>

* Customer A will get an SMS on Ma and an eMail on Ea.
* Customer B will get an SMS on Mb and a WeChat message on Wb.
* Customer C will not get an SMS and gets an eMail on Ec.

4. Click Done.

> 📘 Channels that are selected in Mandatory Channels will not appear in Priority Channels and vice versa.

* For notifications configured for external sources such as Facebook, if a specific channel is not available for a customer, then the notification is sent through identifiers available in internal sources (such as mobile no. and WeChat). For example, consider that an org (that is in both internal and external channels) wants to send an SMS for a Facebook event. Based on the channel availability on a customer's Facebook account, notifications are sent as explained in the following.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Source
      </th>

      <th>
        Facebook (External)
      </th>

      <th>
        Ecrm (Internal)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Customer A
      </td>

      <td>
        Maf
      </td>

      <td>
        Mae
      </td>
    </tr>

    <tr>
      <td>
        Customer B
      </td>

      <td>
        Mbf
      </td>

      <td>
        *
      </td>
    </tr>

    <tr>
      <td>
        Customer C
      </td>

      <td>
        *
      </td>

      <td>
        Mce
      </td>
    </tr>
  </tbody>
</Table>

If an SMS notification is sent for a Facebook event:

* Customer A gets a message on mobile Maf.
* Customer B gets a message on mobile Mbf.
* Customer C gets a message on mobile Mce.

If an SMS is sent for an eCRM event:

* Customer A gets a message on mobile Mae.
* Customer B won’t get any message.
* Customer C gets a message on mobile Mce.