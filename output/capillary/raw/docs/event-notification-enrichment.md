---
updatedAt: 2026-03-09T05:51:57.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Event Notification Enrichment

# Requirement

A brand requires the current tier information when a customer is created. The `customerAdded` event is triggered when a customer signs up and includes details such as the customer's first name, last name, and customer ID. However, the brand also needs additional attributes, such as the customer tier, which are not included in the initial payload.

# Solution

To address this, create a [Neo dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/380d7516-b4fe-4b5d-8835-27ef43f6ea7a/version/63332321-c617-4489-9469-3f0cc549c88a?ruleType=org) that enriches the event with the tier information.\
**Note**: To access the dataflow, ensure you have access to the DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

## Step one: Create a Neo dataflow to enrich the event

Create a Neo dataflow with the tag `connectplus` that,

1. Uses the `customerAdded` event as the input.
2. Retrieves the customer's tier information using the [Get Customer Details](https://docs.capillarytech.com/reference/get-customer-details) API.
3. Enriches the event with the tier information.

## Step two: Create a webhook that listens to the `customerAdded` event

Create a webhook from the [Event Notification UI](https://docs.capillarytech.com/docs/add-event-notification-account) .

Use the webhook to perform the following:

* Listen to the event, `customerAdded`.
* In the **Payload enrichment settings**, check the **Enrich through Neo dataflow** option.
* Choose the dataflow created in Step One.

<Image alt="Event notification UI " align="center" width="85% " border={true} src="https://files.readme.io/5d25e35212bb96505b0a0d3f92bebd59b650041de83e5be70555834119ca3094-image.png">
  Event notification UI 
</Image>