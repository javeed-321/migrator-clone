---
updatedAt: 2026-07-16T08:03:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create WhatsApp Template

A WhatsApp template is a message format that you can reuse to message users who have opted-in (taking opt-in is recommended but not enforced by WhatsApp) and given your app with the permission to send them messages.

To use a message template, you need to first submit it to WhatsApp. WhatsApp reviews and approves each message template, officially in 24-48 hours, to maintain high-quality content and avoid spam. Once WhatsApp has approved your template, you can use the message template to send notifications.

To create Whatsapp template follow the given steps

1. On the **Creatives** page, navigate to the WhatsApp tab. If multiple gateway accounts are configured, a list of available gateway options will be displayed.

<Image src="https://files.readme.io/995395d8720a765dfd68443e8d63510a3c12af44187435b85aa59c1a2f83353d-image.png" align="center" border={true} />

<Callout icon="📘" theme="info">
  ### Note

  To configure multiple channels on WhatsApp, you have to raise a Jira ticket to Gateway team.
</Callout>

2. Once a gateway account is selected, all templates associated with that gateway will be displayed, along with existing options like **Create**, **Status,** and **Category**.

<Image src="https://files.readme.io/e5d4e7a208499f199b8d55590f3a163cdeb966d4031d6d9630fd02572733f578-image.png" align="center" width="70% " border={true} />

3. Click on Create new.

<Image src="https://files.readme.io/bec683683b9e6978b80918cad43c4f3d3e4e53a17a2c50774a29930bb3278888-image.png" align="center" width="600px" border={true} />

4. In the Template name box, enter a unique name and it can only contain lowercase alphanumeric characters and underscores (\_).

<Callout icon="📘" theme="info">
  ### Tip

  Use a name that helps WhatsApp’s reviewer understand the purpose of your message, for example "order\_delivery" rather than "template\_1"
</Callout>

5. In the **Message language**, select the desired language.
6. In the Template category, select the template category from the options available. Your WhatsApp message templates need to be aligned with one of the following categories. Templates that do not align clearly with the specified template type are more likely to be rejected by WhatsApp during the template approval process.

   The available categories are:

| Category           | Description                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Utility**        | Use for transactional or service-related communication, such as account updates, order updates, delivery notifications, payment reminders, and other important customer information. |
| **Marketing**      | Use for promotional communication, such as promotional offers, product announcements, recommendations, and customer engagement campaigns.                                            |
| **Authentication** | Use for messages containing authentication information, such as one-time passwords (OTPs), verification codes, and other authentication messages.                                    |

<Image src="https://files.readme.io/bc3b532c7b03e1ed77775234f65588dd66bd896c342d2c553191ba77120f020c-image.png" align="center" width="100%" border={true} />

7. From **Media**, select the type of media to include in the template header. The available media options depend on the selected **Template category**.
   <Table>
     <thead>
       <tr>
         <th>
           Media
         </th>

         <th>
           Available for
         </th>

         <th>
           Description
         </th>
       </tr>
     </thead>

     <tbody>
       <tr>
         <td>
           **None**
         </td>

         <td>
           Utility, Marketing, Authentication
         </td>

         <td>
           Creates a text-only template without media in the header.
         </td>
       </tr>

       <tr>
         <td>
           **Image**
         </td>

         <td>
           Utility, Marketing
         </td>

         <td>
           Adds a single image to the template header. You can upload an image with a size limit of up to 5MB.&#x20;

           You can also select **Dynamic image** to send each customer a different, personalized image instead of one fixed image for everyone. See the note below for details.

           Supported formats: JPEG, JPG, PNG.
         </td>
       </tr>

       <tr>
         <td>
           **Video**
         </td>

         <td>
           Utility, Marketing
         </td>

         <td>
           Adds a video to the template header. You can upload a video with a file size limit of up to 16MB.&#x20;

           Supported Format: MP4.
         </td>
       </tr>

       <tr>
         <td>
           **Document**
         </td>

         <td>
           Utility, Marketing
         </td>

         <td>
           Adds a document to the template header. You can upload a document with a size limit of up to 16MB.&#x20;

           Supported Format: PDF.
         </td>
       </tr>

       <tr>
         <td>
           **Carousel**
         </td>

         <td>
           Marketing
         </td>

         <td>
           Displays multiple cards within a single WhatsApp message. Each card can include an image, body text, and buttons, allowing customers to swipe through the cards.
         </td>
       </tr>
     </tbody>
   </Table>

<Image src="https://files.readme.io/dad6da33b303d9515368e65f942072386d20fe0f0effc10221f21bbfe22d885a-image.png" align="center" width="100%" border={true} />

<Callout icon="📘" theme="info">
  ### Note

  - The **Carousel** media option is available only when **Marketing** is selected as the **Template category**. Additional carousel cards can be added only after the template is saved with the first carousel card.
  - Always use lowercase file extensions for carousel images (for example, `.png`, `.jpg`, and `.jpeg`). Uppercase extensions such as `.PNG`, `.JPG`, or `.JPEG` may cause media delivery failures.
  - Ensure that all carousel images are uploaded and configured through the platform before sending the campaign. Incorrectly configured images may prevent carousel messages from being delivered.
  - To send a personalized image to each customer, select **Dynamic image** while creating the WhatsApp template. Upload a sample image for WhatsApp approval, this image is used only during the approval process and is never sent to customers. After the template is approved, the image upload section is replaced with an **Image URL** field. Use **Add labels** to insert a placeholder (for example, `{{custom_tag_1}}`), it maps it to the column containing image URLs in your CSV audience upload. During message delivery, the system replaces the placeholder with each customer's image URL. Dynamic images are supported only for campaigns that use a CSV audience upload or FTP.
</Callout>

8. In the **Message**, type a relevant message that you want to send. The message content should be as per the template category. You can format the text by using asterisks `(*)` before and after the text to display it in bold, and underscores `(_)` before and after the text to display it in italics. This formatting is not visible while creating the template, but is rendered correctly when the message is delivered to customers.

* Custom tags in message: WhatsApp does not support custom tags. If you want to use custom tags in the template, select **+Add Variables**. Once the template is approved, you can replace the variables with the actual tags during campaign message creation. For example, If your message is: Hi {`\{firstname}}\`, here is your voucher {{voucher\_code}} for our EOSS. You need to send it as: Hi {{1}}, here is your voucher {{2}} for our EOSS.<br /><br />**Note:** You can add multiple variables, ensuring there is at least one character (text) between variables.

<Image src="https://files.readme.io/9af78e70069bc8b5fd6e5b014cf966c601846009efd774f730d9dce32e187c01-Screenshot_2025-10-13_at_12.58.36_PM.png" align="center" width="75%" border={true} />

* Support for Special Characters: WhatsApp supports special characters in message templates. This ensures that messages are displayed correctly across all devices, improving readability and preventing formatting issues in customer communications. For example: Hi {{1}}, your payment of ₹1,250 has been received successfully. Dear{{1}}, your transaction ID {{2}} for ₹500 on 12 March 2025 was successful.
* Add links in your template: You may send URLs in a template. For example, “Thanks for registering with Demo Business. To continue, click on <<https://app.example.com”>>. For recipients to see the preview of the link in the message, you need to have an Official WhatsApp Business Account.
* Header and footer in messages: You can use the header and footer message option to keep the conversation engaging. For example, if you set the header "Hi `{{firstname}}`" and footer "Get well soon", the message appears as shown in the below figure:

<Image src="https://files.readme.io/b8dbd4dc9424b81566f92ed2c9d479c0842804af99cbd1500cde1f0292990dff-image.png" align="center" width="70% " border={true} />

<Callout icon="📘" theme="info">
  ### Notes

  - &#x20;To generate message suggestions, click the '**✨' aiRA Content Recommendations** icon in the **Message** field. Enter your prompt, and aiRA recommends content that you can use or modify for your WhatsApp message.
  - As per the Meta policy, you can add a maximum of one variable for the header. For the footer there is no variable option.
  - Ensure that links are included in the WhatsApp message text if you want clicks to be tracked. Links placed only in CTA buttons are not tracked and may result in a 0% click rate in analytics.
</Callout>

* **Quick reply** in messages - You can add quick reply to send pre-defined responses or actions with a single tap. This helps to get more number of responses and saves time for the user.

<Image src="https://files.readme.io/bfa8f6ab49424636d83ff5c0b0fa4ed1889334006942352776822fd407d1fc0a-image.png" align="center" width="70% " border={true} />

7. Click on **Send for approval**. Capillary then sends the template to WhatsApp for approval. You can check the status of the template:

* Awaiting Approval: The template is under review and yet to be approved by WhatsApp as per their norms. (Orange dot)
* Approved: The template has been approved successfully. You can start using approved templates.  (Green dot)
* Rejected: The template is not approved. Check if the template is as per the WhatsApp guidelines. Modify the template accordingly and send it for approval again. (Red dot)

<Image src="https://files.readme.io/2150025a16b75e26b2704856fdfa14ab3a49cb138ee76b3b033a72807bec2caf-image.png" align="center" width="70% " border={true} />

8. (Optional) Once the template is approved, you can <Anchor target="_blank" href="https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels">Preview and Test</Anchor> to preview the message content and test it with a set of <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#test-customers">test customers</Anchor> before sending it for approval.  On the WhatsApp listing page, select any existing approved template, click the three-dot menu, and select **Preview and Test**. The Preview and Test modal appears, allowing you to preview and test the message directly.

<Image src="https://files.readme.io/b8146926d1f529d2083a645cf17b00177c3e60d68b6fdb78fe39d6b032b2cbd7-preview-and-test-google-docs_4.png" align="center" width="600px" border={true} />

<br />

<Image src="https://files.readme.io/555b5222a0d5e9e38acceca30a70a57347e2357f2f05b247b2e5acae8b611d70-image.png" align="center" width="600px" border={true} />

<Callout icon="📘" theme="info">
  ### **Note**

  The **Preview and Test** option is disabled during template creation and is available only for approved templates. It is not available for **Awaiting approval**, **Rejected**, **Pending**, and **Paused** templates.
</Callout>

## Message template approval criteria

Your template text should make it clear to the end-user why they received your message.

### Tips and guidelines

Here are some guidelines for increasing the odds of getting your template approved:

* Placeholders must have double curly braces, such as `{{1}}`; single curly braces will not work.
* Templates must have a specific, self-evident purpose. For example: “{{1}} {{2}}” would be rejected because it could be abused to spam users. You need to surround the parameters with information so that it’s clear what type of information will be inserted.
* Templates should be concise and convey only the necessary information that aligns with the template category. We suggest getting feedback from others to ensure that the template text is clear.
* Templates must not have any grammatical or spelling mistakes. Templates that include even minor spelling or grammatical mistakes are likely to be rejected by WhatsApp.
* Templates should be tagged with the appropriate category and language.
* Once the template is approved, it is available in the WhatsApp tab and has a green dot next to it indicating that the template has been approved. You can then use it to broadcast messages to your customer base. You can also change the dynamic tags after the template has been approved accordingly.

<Callout icon="📘" theme="info">
  ### Note

  Once you submit a template, it cannot be edited.
</Callout>

### Probable reasons for template rejection

* The message template(s) contain content that violates WhatsApp’s Commerce Policy.
* The message template(s) contain content that violates WhatsApp’s Business Policy
* Do not request sensitive identifiers from users. For example, do not ask people to share full length individual payment card numbers, financial account numbers, National Identification numbers, or other sensitive identifiers. This also includes not requesting documents from users that might contain sensitive identifiers.
* A survey after an experience is fine, but do not submit a survey or poll to collect unrelated data from users. Example: “Hi, we're interested in knowing how you feel about certain food groups. Do you mind participating in a survey?”
* The message template(s) contain potentially abusive or threatening content

### Examples of approved and rejected message templates

**Approved message templates**

* Welcome {{1}}. What company do you work for?
* Your {{1}} appointment is coming up on {{2}}.
* Your {{1}} appointment is coming up on {{2}}. Reply with {{3}} or {{4}}
* Unfortunately your pending booking did not go through.
* No charges were made to your bank account.
* You can try to rebook the hotel again.
* We sincerely apologize for the inconvenience.
* Rejected message templates

The following templates don’t provide sufficient detail on how they will be used

Reminder: {{1}}

{{1}} was added

{{1}}, {{2}}!

* Spam message templates

  The following templates are considered spam, as they do not make it clear to the user why they are receiving this message.

  I am Jenn, the virtual assistant.

### Guidelines for using WhatsApp for business

* You should not spam your customers all at once; instead, you should start slow so that customers who are not interested can unsubscribe instead of being blocked permanently.
* Your message should be in sync with the notification category otherwise the chances of not getting it approved increases.
* WhatsApp limitation only allows 120 msgs/sec (rate-limit) and Capillary suggests to send up to 25-60 msgs/sec.
* You can increase this throughput by having multiple phone numbers but this is not suggested as it makes it difficult to improve ratings for businesses.

For information on Generate OTP APIs, refer to the [API documentation](https://docs.capillarytech.com/reference/otp).

<br />

<br />