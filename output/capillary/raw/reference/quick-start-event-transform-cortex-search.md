---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Quick Start

# Step 1: Set Up a Neo Transformation Endpoint

1. [Create a transformation NEO endpoint](https://docs.capillarytech.com/docs/extension) that will handle the JSON transformation. This endpoint should:

* Accept POST requests with JSON payload
* Transform the JSON according to your requirements
* Return the transformed JSON

2. You can use the Global dataflows as the starting point. Copy the script, modify and use that in the dataflow you are creating for your org.

   <Image align="center" className="border" width="55% " border={true} src="https://files.readme.io/e1a021c795f41433cc73db3b47f8e14df8b070b901d5664ac89e26961e61b228-image.png" />

# Step 2: Configure the Neo API for Your Organization

[Use the Create or Update API](https://docs.capillarytech.com/reference/enable-custom-event-for-cortex-search) to configure a Neo transformation for your organization:

# Step 3: Test Your Configuration

Send a test event through the system and verify that your transformation is applied correctly.