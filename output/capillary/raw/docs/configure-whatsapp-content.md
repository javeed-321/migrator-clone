---
updatedAt: 2026-03-04T06:04:35.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure WhatsApp Content

This allows you to configure and send personalized, template-based messages to customers via WhatsApp. Messages can include text, media, buttons, and quick replies, and must comply with WhatsApp’s template guidelines for approval.

# Prerequisite

* [ ] <Anchor label="Create a WhatsApp template" target="_blank" href="https://docs.capillarytech.com/docs/create-whatsapp-template#/">Create a WhatsApp template</Anchor>

To configure a WhatsApp Content follow the steps below:

1. **<Anchor label="Create a new campaign" target="_blank" href="https://docs.capillarytech.com/docs/create-campaign#/">Create a new campaign</Anchor>** or select an existing campaign.

<Image align="center" border={true} width="75% " src="https://files.readme.io/6fd73882718f33689939e2e467687b7e649b57914440814f6ea8dc388301c2d5-Screenshot_2025-10-13_at_2.35.33_PM.png" className="border" />

2. **<Anchor label="Create a message" target="_blank" href="https://docs.capillarytech.com/docs/create-message#/">Create a message</Anchor>** within the campaign.
3. In the Content section, select **Add Creative** and choose **WhatsApp** as the engagement channel and select the desired template from the list.
4. In the Message section, you can modify only the variables added during template creation. You can also **<Anchor label="add labels" target="_blank" href="https://docs.capillarytech.com/docs/supported-labels-for-engagement-channels#/">add labels</Anchor>** if needed. **Note**: When using dynamic labels in templates (for example, `{{gap_to_upgrade_tracker}}`, `{{gap_to_renew_tracker}}`), the system validates all labels before sending the message. If any label fails to resolve and returns a null value, the message is not sent, and the customer can be skipped from the communication.
5. Navigate to the **Card Body Text** and update the variables by adding the required <Anchor label="labels" target="_blank" href="https://docs.capillarytech.com/docs/supported-labels-for-engagement-channels#/">labels</Anchor>. It is applicable for the following message types: **image**, **video**, **carousel** and **document**.
6. (Optional) Select **<Anchor label="Preview and Test" target="_blank" href="https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels">Preview and Test</Anchor>** to preview the message content and test it with a set of <Anchor label="test customers" target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#test-customers">test customers</Anchor> before sending.

<Image align="center" border={true} width="600px" src="https://files.readme.io/c4cf918e9e73513ae4325c50d274e6dc2f2445c3fd8990cc62e930d9aa1c6cc9-image.png" className="border" />

7. Select **Done**. The changes are applied to the message content.

<Image align="center" border={true} width="80% " src="https://files.readme.io/fd86cc0ffb7f92cdb0d06ee4c014aaa1c7fdc99574e4d4495e4e4adfb02af043-GIF3_3.gif" className="border" />

> 🚧 Note
>
> You cannot change the template's structure, static text, or layout. You can only populate its pre-defined variables.
>
> Test Thoroughly: Ensure all dynamic labels have data to prevent sending failed messages.