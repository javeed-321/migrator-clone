---
updatedAt: 2026-04-22T05:27:46.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Kafka (Read) block

The `kafka_topic_read` block pulls data from a Kafka topic. It acts as the source block in a Connect+ dataflow, connecting to a Kafka server and consuming messages from one or more predefined topics. The block supports configurable consumer group IDs, header extraction as data attributes for routing and tracking, and a unique ID for end-to-end message tracing across the dataflow.

## When to use this block

Use this block when your dataflow sources data from a Kafka topic, such as streaming event data or real-time transaction feeds.

## Prerequisites

Before configuring this block, make sure you have:

* The name of the Kafka topic or topics to consume from
* Access to the appropriate Kafka client service

## Standard properties

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
        Yes
      </td>

      <td>
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **Kafka topics comma separated**
      </td>

      <td>
        Yes
      </td>

      <td>
        The Kafka topic names to consume messages from. Enter multiple topics separated by commas. 
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
        Select `Event-notification-kafka` or `connectplus-kafka service`.   
        Default value: `Event-notification-kafka`.
      </td>
    </tr>
  </tbody>
</Table>

## Advanced properties

⚠️ Make changes to advanced properties only if you know what you are doing.

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
        **Consumer Group Id**
      </td>

      <td>
        No
      </td>

      <td>
        The consumer group ID used to identify this block's consumer within the Kafka cluster. If you do not provide a value, the system uses a default value derived from the expression `${neoDataflowId}`.
      </td>
    </tr>

    <tr>
      <td>
        **Headers as Attribute**
      </td>

      <td>
        No
      </td>

      <td>
        Specifies which Kafka message headers are extracted as data attributes and made available to downstream blocks.   
        Select `All` to extract all headers, or `Traceable Id` to extract only the traceable identifier.   
        Default value: `All`.
      </td>
    </tr>

    <tr>
      <td>
        **Unique Id for tracing**
      </td>

      <td>
        No
      </td>

      <td>
        The unique identifier used to trace a message through the dataflow. If you do not provide a value, the system uses a default value derived from the expression 
        `${kafka.key}_${kafka.offset}_${kafka.partition}_${kafka.topic}`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/6861091041661716bc81344cc4722a053a2a5a6856ea2be9f15fd605a695a5fb-Screenshot_2026-04-15_at_12.19.02_PM.png" className="border" />