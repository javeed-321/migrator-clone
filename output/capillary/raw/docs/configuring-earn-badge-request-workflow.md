---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configuring Request Workflow for Badge Issuance

This request is mapped to a standard workflow and allows you to submit requests to issue badges for customers.

### Earn badges standard workflow

As part of the standard workflow, the Capillary platform provides a two-step approval process involving a Maker and Checker-based workflow.

1. Users with “CanMakeRequest” access can submit a request to issue a badge to a customer.
2. Users with “CanCheckRequest” access can approve or reject the request.

Once a Checker approves a request, the system executes it, issuing a badge to a customer.

### Configurations

You can enable **Auto-approval** configuration to enable auto-approval of certain user requests.

To configure, from the Request Workflows list, navigate to **Earn\_badge** > **Edit request workflow mapping**, turn on the **Auto-approval flag** toggle and click **Save**

![](https://files.readme.io/920f438-earn_badge.gif)

### APIs to create, approve and retrieve request details

**Create request** - <https://docs.capillarytech.com/reference/earn-badge-issue-badge-to-single-customercustomer-earns-the-badge>

**Approve or reject a request** - <https://docs.capillarytech.com/reference/approve-or-reject-a-request>

**Retrieve details of a request** - <https://docs.capillarytech.com/reference/get-request-info>