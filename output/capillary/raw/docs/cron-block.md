---
updatedAt: 2026-04-22T05:49:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Cron block

The `cron_trigger` block schedules a dataflow to run automatically at defined time intervals using a cron expression in a Connect+ dataflow. It acts as the trigger that initiates the dataflow pipeline at the configured schedule.

## When to use this block

Use this block in every dataflow that should run on a recurring schedule, for example, polling an SFTP server every five minutes or running a nightly data sync.

## Prerequisites

Before configuring this block, make sure you have:

* A valid cron expression that defines your desired schedule

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
        **Cron Trigger Schedule**
      </td>

      <td>
        No
      </td>

      <td>
        The cron expression that defines when the dataflow is triggered.   
        Default value: `0 0/5 * * * ?`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/859266eee9bb4d2608351963143fab94b9a6b53c3a55ef6e67660957ad239a2e-Screenshot_2026-04-20_at_5.48.05_PM.png" className="border" />