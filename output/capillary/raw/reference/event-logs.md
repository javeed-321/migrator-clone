---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Event notification logs

Event Notification allows building integrations with Capillary events that originate either through Capillary API (such as customerAdded and transactionAdded)requests or Capillary products such as Loyalty+ (such as pointsIssued and pointsRedeemed), Engage+ or other. Once an event notification is configured, brands can build custom solutions to trigger for pre-configured actions.

Event Notifications are sent through Webhooks configured in Capillary Event Notifications.

## Use Cases

There are several use cases of event notifications. A couple of examples are provided in the following.

### Enable PII-less Communication

In some cases, brands prefer not to send customers’ personally identifiable information (PII data) such as names, email ID, and mobile number to Capillary and manage communication completely at their end. Event Notification can be used to get the events that require communication such as customer registration, transaction, points issual, points redemption, points transfer, etc. On receiving these events, clients can send communication to customers with their names and identifiers as needed.

### Integration with 3rd Party Applications

Event notification can be used to build integrations with 3rd party applications. For example, send a survey link to a customer post transaction event from a survey application such as Medallia; sync customer’s loyalty information to an e-commerce platform such as Magento. Integration can be built to receive real-time events, enrich information using Capillary APIs (if required), and sync it to the 3rd party application using the brand’s APIs.

### Where to use Event Notifications

There are several use cases of event notifications. A couple of examples are provided in the following.

Also, see

* [How to consume event notifications ?](https://support.capillarytech.com/en/support/solutions/articles/4000157394-consuming-event-notifications)
* [Sample schema/payloads of all events to post event data.](https://support.capillarytech.com/en/support/solutions/articles/4000159789-event-schema-payload-)

### Process

You can retrieve the event notification logs using:

* **event request ID** - This can be retrieved from member care or using [Audit log API ](https://docs.capillarytech.com/reference/get-entity-audit-logs).
* <Image align="center" className="border" border={true} src="https://files.readme.io/0a97246e6111c4534a48d76c037c9ad7fad2b34ec5352bb29a284be14b02d0d9-image.png" />

  **event reference ID:** This value can be found in the response of the [GET event log using request ID API](https://docs.capillarytech.com/reference/get-event-log-by-request-id-).
* **event ID:** This value can be retrieved from the response of the [GET event log using the event reference ID API](https://docs.capillarytech.com/reference/get-event-log-by-reference-id-).