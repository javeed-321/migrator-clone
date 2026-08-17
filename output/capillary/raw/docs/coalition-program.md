---
updatedAt: 2026-06-11T12:01:16.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Coalition program

This section provides you with information about coalition programs and how to set up a coalition program.

Coalition programs (previously called partner programs) are loyalty programs of the Org that are created outside Capillary. Loyalty+ supports syncing tiers of partner programs and adding customers to the program. This means that two or more brands can collaborate to give incentives to customers. Here the burden of the incentive cost is divided between the brands and the customer can become loyal to all these brands simultaneously. For example, a car manufacturer and an insurance company can come together to incentivise customers to pick them together.

Some of the salient features of the coalition program are:

* Brand partnerships to increase customer touchpoints to improve engagement and recall
* Enrollment only via linking APIs
* Can sync with partner tiers based on enrollment or update triggers
* Does not expire unless a customer is delinked or unsubscribed from the partner's loyalty program
* No program expiry, generally these contracts are long-term.

<Image align="center" className="border" border={true} src="https://files.readme.io/adfc4cf-Coalition_program.png" />

# Add a coalition program

To add a subscription program

1. From the home page, click on the desired program.
2. Click **Edit program**.

<Image align="center" className="border" border={true} src="https://files.readme.io/53f68a3-Edit_Coalition_program.png" />

3. In the **Coalition Program** tab, click **Add coalition program**.

<Image align="center" className="border" border={true} src="https://files.readme.io/8a7f72d-Add_coalition.png" />

4. In the **Name** field, enter a name for the partner program. The name can include alphanumeric characters, spaces, and special characters. The name cannot exceed 50 characters.
5. In the **Description** box, enter a brief description of the program.
6. Click **Next**.

<Image align="center" className="border" border={true} src="https://files.readme.io/bb0967a-Click_next.png" />

7. Add benefits. See [Add, edit and delete benefits](https://docs.capillarytech.com/docs/add-edit-and-delete-benefit).
8. If required, set the tier settings. See [Tier settings](https://docs.capillarytech.com/docs/coalition-program#tier-settings).
9. Click **Save**.
10. Click **Publish changes**.
11. Enter the details about the change and click **Publish**.

<Image align="center" className="border" border={true} src="https://files.readme.io/ea418f7-Publish_coalition.png" />

# Edit a coalition program

To edit a subscription program,

1. From the **Coalition Program**, click desired coalition program > three dots icon > Edit.
2. Make the desired changes.
3. Click **Save**.
4. Click **Publish changes**.
5. Enter the details about the change and click **Publish**.

<Image align="center" className="border" border={true} src="https://files.readme.io/bff18f2-Edit_Coalition.gif" />

## Tier settings

In the tier settings, you can create a partner program tier and configure a loyalty tier downgrade.

### Create partner program tier

1. If you want to define and map the tiers in the coalition partner program to the loyalty tiers defined in the current program, in the \*\*Partner program tier,\*\*click **Yes**.
2. In the **Tier** field, enter the highest and lowest tier names. For example, Gold, Silver etc. To add more tiers, click **Add tier** and enter the names.
3. Click **Save**

### Configure loyalty tier downgrade

When a customer unsubscribes or delinks from a program, you can set it to downgrade their loyalty tier automatically.

To set, in the **Set loyalty tier on downgrade**, select **Yes** and from the **Downgrade to loyalty tier** drop-down, select the tier to which the customer should be downgraded and click **Save**.

<Image align="center" className="border" border={true} src="https://files.readme.io/257e888-Tier_Settings.gif" />

> **Note:** Customer activity history is only recorded when the partner program has tiers enabled (**Partner program tier: Yes**). If tiers are not configured, the `customerActivityHistory` array returned by the `GET /v2/partnerProgram/customerActivityHistories` API will always be empty, even if the customer has been linked or unlinked from the program.

# Integration

For information on integration, see [Integration](https://docs.capillarytech.com/docs/integration).

# Workflow

For information on workflow, see [Inside workflow](https://docs.capillarytech.com/docs/inside-workflows).