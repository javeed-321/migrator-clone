---
updatedAt: 2026-04-22T14:28:44.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Kafka (Write) block

The `kafka_topic_write` block pushes data to a Kafka topic. It acts as the destination block in a Connect+ dataflow, receiving processed data from upstream blocks and publishing it as messages to a specified Kafka topic. The block supports configurable Kafka client services, a message key for partitioning and identifying events within a topic, and header extraction as data attributes for routing and tracking downstream.

## When to use this block

Use this block when your dataflow writes output messages to a Kafka topic as its final step. For example, forward processed records to a downstream Kafka-based system.

## Prerequisites

Before configuring this block, ensure you have:

* The name of the target Kafka topic
* Access to the `Event-notification-kafka` or `connectplus-kafka `service
* The Kafka key format for partitioning messages

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
        A name for the block instance. The name should be alphanumeric, and there is no limit on the number of characters.
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
        The Kafka client service used to connect to the server.  
        Use `Event-notification-kafka` when publishing event notification data.
        Use `connectplus-kafka service` when publishing to a custom topic created in Neo.
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
        The name of the Kafka topic to which messages are published. |For example, `transactions_topic`.
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
        A user-defined key that identifies each message within the topic and helps partition related events.  
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
        Specifies which Kafka message headers are extracted as data attributes and made available to downstream blocks.  
        Select `Traceable Id` to extract only the traceable identifier, or `All` to extract all headers.  
        Default value: `Traceable Id`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" src="https://files.readme.io/a530223e675e27964a86c2699d892d103d2c3666203e0f45cbfa51dd9628bbc6-Screenshot_2026-04-15_at_12.25.51_PM.png" />