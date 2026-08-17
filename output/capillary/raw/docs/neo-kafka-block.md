---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Kafka Block

The Kafka block in the Neo application sends events to specific Kafka topics based on your input.

A Kafka topic is a channel or category in Apache Kafka where messages are published and stored. Producers are applications or services that send messages to specific topics, while consumers are applications that read messages from those topics. Each topic has a unique name within a Kafka cluster and can be divided into partitions

The Kafka block is generally configured after the JSON Schema validation block successfully validates the headers or input parameters, and the JavaScript block generates the payload.

# Example scenario

**Requirement**

Consider a scenario where post-flight booking details of up to 1,000 requests per minute are sent to the Capillary system every hour. This data is processed to allocate loyalty points to the airline’s loyalty customers. Processing these requests synchronously would introduce latency and degrade system performance.

**Solution**

To solve this, use the Kafka block in the Neo dataflow to push messages into the Kafka system for asynchronous processing. Later, the system retrieves the messages from Kafka, processes the data, and allocates loyalty points.

Refer to this example [dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/c5e214c9-7b3c-4dbe-a7c4-49e4d02dc45e/version/8cd821ec-a2ef-4d87-9562-36261ecb0708?ruleType=org) to understand how it is configured for a use case. Make sure you have access to DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

# Configuring Kafka block

To configure the Kafka block,

1. From the dataflow canvas, click on the node and select the **Kafka** block.

2. In the **Block name** field, enter the block name.\
   Note: Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.

3. In the **Topic Name** field, enter the Kafka topic to determine where to send the event.\
   Topic name formats:

   * Draft/Approved Versions: `neo_${orgId}${topic}_uat`\
     Example: `neo_56123_Transaction_uat`
   * Live Version: `neo_${orgId}_${topic}`\
     Example: `neo_56123_Transaction`

   Kafka creates the topic automatically if it doesn’t exist.

4. In the **Message Key** field, enter a user-defined key that identifies each event within a topic and helps partition related events. If the key is defined in earlier blocks, retrieve it using DAO functions. Otherwise, define it using a JavaScript expression or enter a value manually. The **Message Key** must be a string.

5. In the **Message Value** field, enter the event’s data or payload.  If the value is defined in earlier blocks, retrieve it using DAO functions. Otherwise, define it using a JavaScript expression or enter a value manually. The **Message Value** must be a string.

6. (Optional) In the **Headers** field, add the required headers. If any of the headers listed below are included in the incoming request to Neo (for example, when a dataflow is triggered as part of an event and data is sent to Neo), Neo automatically includes them in the Kafka request.
   * `x-cap-neo-test-variant-id`
   * `x-cap-request-id`
   * `x-cap-api-attribution-entity-type`
   * `x-cap-api-attribution-entity-code`
   * `x-cap-api-auth-org-id`

**Note**: For details on headers, refer to [Header Management in Neo](https://docs.capillarytech.com/docs/api-request-block#header-management-in-neo).

7. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
8. Click **Done**.

<Image align="center" alt="Configuring the Kafka block" border={true} caption="Configuring the Kafka block" src="https://files.readme.io/60253691b555cc89b2e3e4a85ebf84401f59d3b6784e3839f098ccf99451c0b9-17.02.2025_11.20.25_REC_Configuring_Kafka.gif" width="85% " />