---
updatedAt: 2026-03-10T10:59:11.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Overview

An event is a system-generated record that indicates something significant has happened in the Capillary platform. Events capture specific actions or state changes, such as a customer being added, a transaction being recorded, or loyalty points being issued. Event Notifications is a framework that provides near-real-time data for events generated in the Capillary system. It helps brands subscribe to notifications for specific events.

Event Notifications enable you to build integrations with Capillary events originating from either:

* **Capillary APIs** (for example, customerAdded, transactionAdded)
* **Capillary products** such as Loyalty+ (pointsIssued, pointsRedeemed), Engage+, or others.

Once configured, Event Notifications let brands create custom solutions that trigger predefined actions when specific events occur. The generated event data is sent through webhooks configured in the Capillary Event Notifications framework.

<Image align="center" border={true} src="https://files.readme.io/479c5eb33e869fe21623cc011af42e25ae35801023c2f471c47eea83a6236d7d-Event_Notification.png" className="border" />

# Use Cases

### Enable PII-less communication

Some brands prefer not to share customers’ personally identifiable information (PII) such as name, email address, or mobile number with Capillary.
In such cases, brands can use Event Notifications to receive events that trigger customer communications, such as registration, transactions, points issuance, redemption, or transfer.
Upon receiving these events, the brand’s system can send personalised messages using its own identifiers and customer data.

### Integrate with third-party applications

Event Notifications enable seamless integration with external systems.
For example, you can:

* Send a post-transaction survey to customers using a platform like **Medallia**.
* Sync customer loyalty information with an e-commerce platform such as **Magento**.

Integrations can consume real-time events, optionally enrich the data using Capillary APIs, and then forward it to the third-party system through the brand’s APIs.

### Event notification for customer messaging

You can use Event Notifications when you want your own system (or a third-party tool) to decide how and when to message a customer after an event occurs in Capillary.

For example:

* Capillary generates an event such as pointsIssued.
* The Event Notification Service (ENS) sends this event payload to your configured webhook.
* Your system receives the payload and processes it.
* Based on your business logic, your system sends:
  * an SMS via your in-house SMS gateway or vendor (for example, Twilio, Infobip, or Kaleyra),
  * a push notification via your app, or
  * an email via your ESP (for example, SendGrid, Netcore, or AWS SES).

<br />