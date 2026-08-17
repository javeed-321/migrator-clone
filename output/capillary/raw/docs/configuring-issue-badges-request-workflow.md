---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configuring Request workflow for Customer Enrolment

This request is mapped to a standard workflow and allows you to submit requests to enrol badges for customers.

## Issue badges standard workflow

As part of the standard workflow, the Capillary platform provides a two-step approval process involving a Maker and Checker-based workflow.

1. Users with “CanMakeRequest” access can submit a request to enrol a customer in badges.
2. Users with “CanCheckRequest” access can approve or reject the request.

Once a Checker approves a request, the system executes it, enrolling the customer in the badges.

### Configurations

You can enable **Auto-approval** configuration to enable auto-approval of certain user requests.

To configure, from the Request Workflows list, navigate to **Issue\_badge** > **Edit request workflow mapping**, turn on the **Auto-approval flag** toggle and click **Save**

![](https://files.readme.io/01c2285-issue_badge.gif)

### APIs to create, approve and retrieve request details

* Creating a request - [\<https://docs.capillarytech.com/reference/earn-badge-issue-badge-to-single-customercustomer-earns-the-badge>](https://docs.capillarytech.com/reference/issue-badge-enrol-customers-for-badges)
* Approving a request - <https://docs.capillarytech.com/reference/approve-or-reject-a-request>
* Retrieve request details - <https://docs.capillarytech.com/reference/get-request-info>