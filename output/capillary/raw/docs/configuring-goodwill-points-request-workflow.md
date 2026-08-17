---
updatedAt: 2026-07-03T12:54:02.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configuring Goodwill Points Request Workflow

This request is mapped to a standard workflow, allowing you to submit requests to issue goodwill points.

### Points redemption standard workflow

As part of the standard workflow, the Capillary platform provides a two-step approval process involving a Maker and Checker-based workflow.

1. Users with “CanMakeRequest” access can submit a request to issue goodwill points.
2. Users with “CanCheckRequest” access can approve or reject the request.

Once a Checker approves a request, the system executes it, allowing the issue of the goodwill points.

### Configurations

* Auto approval - You can enable **Auto-approval** configuration to enable auto-approval of certain user requests.
* Goodwill points upper cap - You can set an upper cap to restrict the issue of goodwill points.

> \[!NOTE]
> Auto-approval of goodwill points requires that a Goodwill Point Expiry Strategy (with is\_goodwill = true) exists for the relevant program. If no such strategy is set, auto-approval fails with error code 3002 (GOODWILL\_EXPIRY\_STRATEGY\_NOT\_FOUND), and the request remains in Pending status until resolved.

To configure, perform the following:

1. From the Request Workflows list, navigate to **Goodwill\_points** > **Edit request workflow mapping**.
2. To set auto-approval, turn on the **Auto-approval flag** toggle.
3. To set an upper cap for goodwill point issue, in **Goodwill points upper cap**, enter the goodwill points upper cap value.
4. For sending e-mail notifications on the request status, enter the customer's e-mail ID.
5. Click **Save**.

![](https://files.readme.io/c67849f-goodwill_points3.gif)

### APIs to create, approve and retrieve request details

**Create request** - <https://docs.capillarytech.com/reference/issue-goodwill-points>

**Approve or reject a request** - <https://docs.capillarytech.com/reference/approve-or-reject-a-request>

**Retrieve details of a request** - <https://docs.capillarytech.com/reference/get-request-info>