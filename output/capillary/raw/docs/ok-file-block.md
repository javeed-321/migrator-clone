---
updatedAt: 2026-04-22T05:48:13.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Ok File block

<Callout icon="❗️">
  This block will be deprecated in a future release.
</Callout>

The `ok_file_3` block acts as a file acceptance marker in a Connect+ dataflow. It signals that the file has been successfully processed and is ready to pass to the next block in the pipeline.

**When to use this block**

Use this block when the dataflow template requires an explicit file acceptance signal before proceeding to the next stage.

## Configuration fields

| Field name     | Required | Description                                                    |
| :------------- | :------- | :------------------------------------------------------------- |
| **Block name** | No       | A name for the block instance. For example, `Ok_File_3_Block`. |