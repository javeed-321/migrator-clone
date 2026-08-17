---
updatedAt: 2026-08-17T09:31:22.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Asynchronous High-Volume Data Processing for Loyalty Point Allocation

You can create a Neo dataflow with a Kafka block to handle bulk data processing asynchronously.

Asynchronous processing allows the system to handle tasks without blocking or delaying others while waiting for results. It enables multiple tasks to run in parallel or process them sequentially as they arrive.

# Example scenario

## Requirement

An airline brand uses a Passenger Service System (PSS) to send post-flight passenger details to the Capillary system. This data is sent in bulk every hour, reaching up to 1,000 requests per minute. Due to the large volume of data, real-time processing isn’t feasible. The system needs a way to process bulk data asynchronously, validate it, and allocate loyalty points to eligible passengers using Capillary's transaction APIs.

## Solution

To address the challenge of processing high-volume post-flight passenger data asynchronously and allocating loyalty points, the following solution is in place:

### Step one - Create a Neo dataflow to post data into a Kafka topic

Create a [Neo dataflow with a Kafka block](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/c5e214c9-7b3c-4dbe-a7c4-49e4d02dc45e/version/8cd821ec-a2ef-4d87-9562-36261ecb0708?ruleType=org) to receive post-flight data from the PSS.  To access the dataflow, ensure you have access to the DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

This dataflow pushes incoming passenger data into a Kafka topic. In this setup, the Neo dataflow acts as the [Kafka producer](https://docs.capillarytech.com/docs/neo-kafka-block), pushing the PSS data into the Kafka topic.

### Step two - Create a Neo dataflow to validate and transform data to invoke the Add Transaction API

Create a [Neo dataflow to validate](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/daec5cfa-be66-4d5d-b021-c2f45c3aa322/version/9204edc5-0386-4326-9ef8-9988fe690b64?ruleType=org) the input and transform it into the required payload for calling the Add Transaction API.

### Step three - Use a Connect+ template to pull data from the Kafka topic and invoke the Neo dataflow for validation and transformation

Use the Connect+ template, Ingest Kafka Stream in API, to pull data from a Kafka topic, validate and process it, and allocate loyalty points. The template consists of the following blocks:

1. **Connect-to-source-kafka**: Connects to the Kafka brokers and pulls data from the configured topic.
2. **neo-Transformer**: Invokes a Neo dataflow created in step two to validate the input and transform it into the required payload for calling the Add Transaction API.
3. **Connect-to-destination**: Sends the transformed data to the Add Transaction API to allocate loyalty points.

# Troubleshooting

| Error                       | Description                                                                    |
| :-------------------------- | :----------------------------------------------------------------------------- |
| Header Validation issues    | Ensure the headers are not missing, empty and in the correct format.           |
| Data pushing to Kafka fails | Ensure the Kafka block is properly configured with the required key and value. |

# FAQs

1. What is Kafka used for in this Neo dataflow?\
   Answer: Kafka handles bulk data processing asynchronously by enabling message publishing and consumption between Neo dataflows and Connect+.
2. Why is Kafka suitable for bulk processing scenarios?\
   Answer: Kafka also supports asynchronous processing, making it ideal for scenarios where real-time processing is not feasible.
3. What happens if the Kafka block configuration is incorrect?\
   Answer: If the Kafka block configuration is incorrect, messages fail to publish or get sent to the wrong topic.
4. What should I include in the Kafka message key and value?\
   Answer: The key includes a unique identifier for the event within the topic, and the value contains the information to send to Kafka.