---
updatedAt: 2026-04-27T07:06:28.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Kafka Event (Write) block

<Callout icon="❗️">
  This block will be deprecated in future releases.
</Callout>

The event\_publish\_kafka block publishes data to a Kafka topic. It acts as a destination block in a Connect+ dataflow, connecting to a specified Kafka service and writing data to a defined topic using a configured key. It also forwards header attributes to downstream consumers for traceability.

## When to use this block

Use this block when your dataflow writes output messages to a Kafka topic as its final step. For example, forward processed records to a downstream Kafka-based system.

Select the Kafka service based on your use case:

* Use `Event-notification-kafka` when publishing event notification data.
* Use `connectplus-kafka` when publishing to a custom topic created in Neo.

## Prerequisites

Before configuring this block, make sure you have:

* The name of the target Kafka topic
* Access to the `Event-notification-kafka` or `connectplus-kafka `service
* The Kafka key format for partitioning messages.

## Configuration fields

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field name
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Block name**
      </td>

      <td>
        No
      </td>

      <td>
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **Kafka client service to connect to server**
      </td>

      <td>
        Yes
      </td>

      <td>
        The Kafka service used to connect to the server.  
        Select `Event-notification-kafka` or `connectplus-kafka service`.  
        Default value: `Event-notification-kafka`.
      </td>
    </tr>

    <tr>
      <td>
        **Kafka topic**
      </td>

      <td>
        Yes
      </td>

      <td>
        The name of the Kafka topic to publish events to.  
        For example, `transactionAdded`.
      </td>
    </tr>

    <tr>
      <td>
        **Kafka key**
      </td>

      <td>
        Yes
      </td>

      <td>
        The key used when publishing messages to the Kafka topic.  
        For example, `${customerId}`.
      </td>
    </tr>

    <tr>
      <td>
        **Headers as Attribute**
      </td>

      <td>
        Yes
      </td>

      <td>
        Determines which headers are forwarded as attributes to the Kafka message.  
        Select `Traceable Id` or `All`.  
        Default value: `Traceable Id`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/2c6193bdb82dea21e678652242673c06f536ed38701a4fb24f1c9734ca0852f9-Screenshot_2026-04-21_at_5.00.21_PM.png" className="border" />