---
updatedAt: 2026-04-27T07:14:50.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# JOLT block

<Callout icon="❗️">
  This block will be deprecated in future releases.
</Callout>

The `jolt_transform` block applies a JOLT transformation to JSON data as a transformation block in a Connect+ dataflow. [JOLT](https://github.com/bazaarvoice/jolt) is an open-source JSON-to-JSON transformation library that uses a JSON-based specification to define how input JSON is restructured or mapped. The block accepts a JOLT specification that defines how the input JSON is restructured or mapped before being passed to downstream blocks.

## When to use this block

Use this block when your dataflow needs to reshape a JSON payload using a JOLT specification — for example, when integrating with systems that require a specific JSON schema.

## Prerequisites

Before configuring this block, make sure you have:

* A JOLT transformation specification prepared for your use case
* A sample of the input JSON to validate your specification

## Configuration fields

| Field name              | Required | Description                                                                                                         |
| :---------------------- | :------- | :------------------------------------------------------------------------------------------------------------------ |
| **Block name**          | No       | A name for the block instance. The name must be alphanumeric. There is no character limit.                          |
| **JOLT Transformation** | Yes      | The JOLT specification used to transform the input JSON data. Enter the transformation template in the code editor. |