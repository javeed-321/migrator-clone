---
updatedAt: 2026-07-28T09:42:24.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure RCS Content

This allows you to configure and send interactive, media-rich messages to customers via RCS. You can personalize message content, add media, and include action buttons while adhering to the approved RCS template format.# Configure RCS content.

# Prerequisites

* [ ] <Anchor target="_blank" href="https://docs.capillarytech.com/docs/create-rcs-template-#/">Create RCS template</Anchor>.

# Configure RCS content

To configure RCS content follow the given steps:

1. From the **Engage+** homepage, **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/create-campaign#/">create a new campaign</Anchor>** or select an existing one.

<Image src="https://files.readme.io/6fd73882718f33689939e2e467687b7e649b57914440814f6ea8dc388301c2d5-Screenshot_2025-10-13_at_2.35.33_PM.png" align="center" width="70% " border={true} />

2. <Anchor target="_blank" href="https://docs.capillarytech.com/docs/create-message#/">Create a message</Anchor> within the campaign.
3. In the **Content** section, click **+Add creative**. From the list of engagement channels, navigate to the **RCS** tab.
4. On the RCS Template listing page, view the list of approved templates and select the one that best suits your campaign message.
5. A modal appears to edit the RCS creative. You can modify only the variables in the **Template Title** and **Text Message fields**by selecting **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/labels#/">+Add labels</Anchor>** in the respective sections that were added during template creation.
6. (Optional) Select **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels">Preview and Test</Anchor>** to preview the message content and test it with a set of <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#test-customers">Test customers</Anchor> before sending it.
7. Select **Done**. The changes are applied to the message content.

<Image src="https://files.readme.io/c15d77ca2858d40c8bddbb2a6b57d61baeac5a6c8cbb497e793cfb79111d38e0-ffhg.gif" align="center" width="70% " border={true} />

<Callout icon="📘" theme="info">
  ### Notes

  - You cannot change the template's structure, text, or layout. You can only populate its pre-defined variables.
  - Test Thoroughly: Ensure all dynamic labels have data to prevent sending failed messages.
  - The **Preview and Test** option is disabled during template creation and is enabled only after the template is approved.
  - If the template has a **Fallback SMS message** configured, **Preview and Test** shows two tabs — **RCS** and **SMS Fallback** ,so you can preview and test each channel separately, including its own sender ID. Personalization tags in the RCS content including carousel card titles, descriptions, and button text are replaced with your test values in the preview.
</Callout>

<br />