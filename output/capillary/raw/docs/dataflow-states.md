---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Dataflow States

A dataflow has the following states:

* **Draft** – The default state of a dataflow when it is created. All changes to the dataflow must be made in the **Draft** state.
* **Awaiting Approval** – The state when the dataflow is sent by a Neo user for Neo Admin approval.
* **Approved** – The state after the dataflow has been approved by the Neo Admin. A dataflow in this state cannot be modified.
* **Live** – The state of a dataflow that is executed.

By default, a dataflow starts in the `Draft` state. When sent for Neo admin approval, it moves to `Awaiting Approval`. After the Neo admin approves it, the state changes to `Approved`.

You can make an `Approved` version `Live`, but only one approved version of an API can be live at a time.