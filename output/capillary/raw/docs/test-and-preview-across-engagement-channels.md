---
updatedAt: 2026-08-05T05:58:54.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Test and Preview across engagement channels

When you create new message content for a selected engagement channel, you can use the **Preview and Test** feature to review how the message will appear before sending it to your audience. This feature is supported for all the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#test-customers">engagement channels</Anchor> except Line and WeChat.

This helps you validate both the content and design across all supported engagement channels

* **Preview**: View the email content and design before saving.
* **Test message**: Send test messages from the email test message section to selected test customers or test groups to review the content and design before sending to the audience. Only users added as <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#test-customers">test customers</Anchor> or included in a <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#test-customers">test customer group</Anchor> can receive test messages.

You can do this either from the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels#previewing-and-testing-the-message-content-from-creatives">creatives</Anchor> or from the message creation flow <Anchor target="_blank" href="https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels#previewing-and-testing-the-message-content-within-a-campaign">within a campaign</Anchor>.

<Callout icon="📘" theme="info">
  ### **Note**

  A default limit of 10 test messages per user within a 24-hour window is always enforced. Any messages sent beyond this limit will be blocked until the 24-hour window resets. This limit applies across all the engagement channels. To increase this limit, raise a Jira ticket with the Product Support team. The updated limit will be applied within 24 hours.
</Callout>

# Previewing and testing the message content from creatives

To preview and test a message content from the creatives, follow the steps below.

1. From the **Engage+ homepage**, navigate to the **Creative** section and select the required <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#test-customers">engagement channel</Anchor> to preview and test the message content.

<Image src="https://files.readme.io/99116e5e6969ebee47163140e38fcb6f7d09698864f2d11fd6bd0ce07bfc38a9-preview-and-test-google-docs.png" align="center" width="600px" border={true} />

2. On the engagement channel listing page, you can either navigate to an existing template or select **Create new.**

<Image src="https://files.readme.io/c852af05d91b90a22579918e0f79814e653252fadb5825ea5f8575403388aae4-image.png" align="center" width="600px" border={true} />

3. Select **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/engagement-channels">Create new</Anchor>** to create a new message template for the selected engagement channel and <Anchor target="_blank" href="https://docs.capillarytech.com/docs/supported-labels-for-engagement-channels">add all required labels</Anchor> to it. You can also include the [custom tags](https://docs.capillarytech.com/docs/custom-tags) while creating the template.

4. Select **Preview and test**. A modal appears that lists all tags and labels in the template.

5. Include custom values against the tags and labels, perform the following:
   1. An input form appears with input boxes for all the tags in the template content. Enter the value for the tags.
   2. You can add the values automatically or manually.
      * To fetch the values automatically, navigate to the customer search box and search for a registered customer by using mobile number, email, or external ID. Once a customer is selected, all user-specific tags are automatically filled with that customer's data. The customer should have the values defined in their profile for the fields to populate the values automatically. Otherwise, an error message will appear.

        **Note**: Only registered customers can be searched and selected. If you search for an unregistered customer, a **No customers found** message is displayed.
      * To add the values manually, enter the values for each tag. You can also select **Show JSON** and enter values for these tags in the JSON. Certain tags or labels are marked with an asterisk `*`,for example, `voucher_expiry_date` and `promotion_expiry_date`. The values for all asterisk `*` tags must be entered manually for them to appear in the preview.

6. Select **Update preview**. The message content appears on the right with all tag values filled.

7. To discard custom values, select **Discard custom values**. You can click either of the two layouts to view the message content in desktop or mobile views.

**Note**: For **Web Push**, this step works differently. The preview panel doesn't have a desktop/mobile toggle. Instead, use the **Operating system** and **Browser** dropdowns above the preview to see how the notification renders across combinations. Select the expand icon in the preview panel header to open a full-screen view of the notification in its device frame, with an additional **State** dropdown to switch between the collapsed and expanded notification views. Windows, iOS, and iPadOS support only the collapsed state.

<Image src="https://files.readme.io/0ebd53d79f38d967d4074d68528c9ca07b3453a812122c3d855d149ff88a78ad-_Gif_2.gif" align="center" width="70% " border={true} />

8. After updating the preview, select **Send test messages**. You can select individual <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#/test-customers">test customers</Anchor>, test groups, or select multiple test groups to send messages. The available test users are retrieved from the test customer configurations defined at the organization level.
9. If the required user is not available in the Test Customers field, add them directly from the Test Customers section. This is applicable for **SMS** and **Email** engagement channels only. To add a test customer, follow the steps below:

   i. In the Test Customers field, enter a mobile number or email address based on the selected engagement channel and select **Add as "identifier" Test Customer** from the dropdown.

   **Note**: For SMS, mobile numbers must contain a minimum of 8 digits and a maximum of 15 digits. Numbers outside this range are not accepted and are not allowed to add as a test customer.

   ii. A **Add new test customer** modal appears, verify the pre-filled mobile number or email.

   iii. (Optional) Enter a name in the **Name** field.

   iv. Select **Save**. The added test customer is assigned a customer ID. This ID is for testing purposes only and cannot be looked up in MemberCare.

The user is added as a test customer and is available for selection in the **Test Customers** field. The added customer is also listed in the **Test Customers** section under **Campaign Settings**. If the number or email belongs to an existing customer, a confirmation modal appears displaying their name, mobile number or email, and customer ID, select **Save** to add them to the test customer list, or **Cancel** to exit.

<Image src="https://files.readme.io/a7c22d96a4c50843b1512945c45fad84c4cea8dd43779cf0b63587b7a534542f-test_customer_1.gif" align="center" width="90% " border={true} />

<Callout icon="📘" theme="info">
  **Notes**

  - The test customer you add here is saved to your organization's test customer list in <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#/test-customers">campaign settings</Anchor> and is available for testing across multiple  engagement channels.
  - If a test customer is removed from the test customer list in campaign settings, they no longer appear in the dropdown. To add them again, type the same mobile number or email address in the **Test Customers** field and follow the same steps above. When re-adding, the name field will be empty, enter any name and select Save. The name you enter appears in the current session, but once you refresh the page, the name reverts to what was originally saved for that profile in campaign settings.
</Callout>

10. In the **Delivery settings** section, view the sender details used to send the test message, select the edit (pencil) icon, a modal appears to update the sender details by selecting the required Sender ID based on the configured engagement channel, then select **Done**.

**Note**: This option is available only for **WhatsApp**, **Email**, and **SMS** engagement channels.<br />Multiple sender IDs are available only if they are pre-configured at the gateway level. For WhatsApp, if the selected template is approved for a specific gateway, the **Account** field is non-editable and cannot be changed. Only the **Sender Number** can be updated, and only if multiple numbers are configured for that gateway. For more information on gateway configuration for the above mentioned channels, refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-sms-settings">Configure SMS Settings</Anchor>, <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-email-settings">Configure Email Settings</Anchor>, and <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-whatsapp-settings">Configure WhatsApp Settings</Anchor>.

<Image src="https://files.readme.io/02f84ef5693b260f5e0ffc611b6c0a903c1a8f31e3dedbbff8c89d1c508cc122-gifes.gif" align="center" width="70% " border={true} />

11. Click **Send test message**. The message will be sent to the selected users.

<Image src="https://files.readme.io/f734cfbb50223c36fc35a86e60bed3ca73aeaf91b5324fca56cc603d0b906300-_Gif_3.gif" align="center" width="60% " border={true} />

<Callout icon="📘" theme="info">
  ### **Notes**

  - You can also use **Preview and Test** from the Engagement channel listing page. To preview,  select any engagement channel with existing templates, click the three-dot menu, and select **Preview and Test**. The Preview and Test modal appears, allowing you to preview and test the message directly.
  - You can send up to 10 test emails per day per user when previewing and testing messages. If you reach this limit, the system will display a RATE_LIMIT_EXCEEDED error and block further test emails for that day. To increase this limit, raise a Jira ticket with the Product Support team. The updated limit will be applied within 24 hours. For more information on communication limit refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#set-up-communication-limits-for-each-channel">Set up communication limits for each channel</Anchor> documentation.
</Callout>

# Previewing and testing the message content within a campaign.

To preview and test a message content flow within a campaign, follow the steps below.

1. From the **Engage+** homepage, navigate to the **Campaigns** section. You can either select an existing campaign or <Anchor target="_blank" href="https://docs.capillarytech.com/docs/create-campaign">create a New campaign</Anchor>.
2. <Anchor target="_blank" href="https://docs.capillarytech.com/docs/create-message#add-creative-campaign-message">Create a message</Anchor>, navigate to the creatives section, and select **Add creative**.
3. Select the required **engagement channel** to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels#previewing-and-testing-the-message-content-from-creatives">preview and test</Anchor> the message content from the creatives.
4. You can use **Preview and Test** during the message creation. After selecting the creative, click the three-dot menu and select **Preview and Test** to preview and test the message content.

<Image src="https://files.readme.io/e29ee486b942371478bc78eded9afb7cbc2b4350674a4577ba27230283c6f5d8-preview-and-test-google-docs_2.png" align="center" width="600px" border={true} />

5. <Anchor target="_blank" href="https://docs.capillarytech.com/docs/schedule-message">Schedule the message</Anchor> and **Send for approval**.
6. You can also use **Preview and Test** before the campaign is approved. On the Message Dashboard, in the Content section, the selected channel is displayed. Click Preview and Test on the right side to test the message.

<Image src="https://files.readme.io/41912ddc4550f192c0b03107efc0d0e98d55ae383e8e95a7f36a18093328dd26-preview-and-test-google-docs_3.png" align="center" width="600px" border={true} />

<Callout icon="📘" theme="info">
  **Note**

  When testing messages within a campaign, you can send up to 10 test messsage per user each day. If you exceed this limit, you will see a RATE_LIMIT_EXCEEDED error and cannot send more test emails until the next day. To increase this limit, raise a Jira ticket with the Product Support team. The updated limit will be applied within 24 hours. For more information on communication limit refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#set-up-communication-limits-for-each-channel">Set up communication limits for each channel</Anchor> documentation.
</Callout>