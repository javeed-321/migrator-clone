---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Organize Dataflows

As the number of dataflows in an organization increases, it becomes difficult to track what each dataflow does and how it relates to others. Organizing dataflows helps improve visibility and supports efficient management.

Neo provides two features to help organize dataflows effectively:

* [Tags](https://docs.capillarytech.com/docs/tags-filters-in-dataflow#/): Tags label individual dataflows for identification or filtering.
* [Applications](https://docs.capillarytech.com/docs/using-applications#/): Applications group multiple related dataflows into logical containers.

## How applications differ from tags

[Applications](https://docs.capillarytech.com/docs/using-applications#/) and [tags](https://docs.capillarytech.com/docs/tags-filters-in-dataflow#/) both help manage dataflows in Neo. A tag is a keyword or label you associate with an individual dataflow, while an application is a container that holds multiple dataflows. Tags identify dataflows, and applications group them.

The table below compares applications and tags and how each is used in Neo.

| Aspect         | Applications                                                                                                                   | Tags                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Purpose**    | Used to group related dataflows under a logical container based on a common theme or business function.                        | Used to label dataflows for easier identification and filtering. |
| **Scope**      | Works as a container that can hold multiple dataflows.                                                                         | Works at the individual dataflow level.                          |
| **Management** | Can be created and edited (by users with Neo Edit permission); supports moving dataflows between applications.                 | Can be freely added or removed from any dataflow.                |
| **Automation** | Middleware dataflows are automatically assigned to the *Middleware* application based on tags (pre-matching or post-matching). | Tags do not affect the location or grouping of dataflows.        |