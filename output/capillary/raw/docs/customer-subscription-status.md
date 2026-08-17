---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customer Subscription Status

## isSubscribedToChannel expression

Use the `isSubscribedToChannel` expression to check if a customer has opted in to a specific communication channel. This is important for compliance with messaging regulations like **CAN-SPAM**, **GDPR**, and **CASL**, which often require **explicit consent** for promotional messages.

### Purpose

Prevent sending messages to users who haven't subscribed to a particular channel.

### Usage

* **Profile**: `currentCustomer()`
* **Attribute**: `isSubscribedToChannel`
* **Data type**: `ENUM`

### Supported channels

You can check subscription status for the following channels:

* `MOBILE`
* `EMAIL`
* `ANDROID` (push notifications)
* `IOS` (push notifications)
* `WHATSAPP`
* `WECHAT`
* `LINE`
* `VIBER`
* `XENGAGE`
* `RCS`
* `ZALO`

### Syntax

```js
currentCustomer.isSubscribedToChannel("CHANNEL_NAME")
```

### Examples

| Example 1: Write a rule to check if the customer is subscribed to email communications. |
| :-------------------------------------------------------------------------------------- |
| currentCustomer.isSubscribedToChannel("EMAIL")                                          |

| Example 2: Write a rule to check if the customer is subscribed to iOS push notifications. |
| :---------------------------------------------------------------------------------------- |
| currentCustomer.isSubscribedToChannel("IOS")                                              |

| Example 3: Write a rule to check if the customer is subscribed to SMS and WhatsApp communication. |
| :------------------------------------------------------------------------------------------------ |
| currentCustomer.isSubscribedToChannel("SMS")&\&Customer.isSubscribedToChannel("WHATSAPP")         |