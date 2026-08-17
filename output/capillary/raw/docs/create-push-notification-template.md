---
updatedAt: 2026-03-04T06:04:35.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create Push Notification Template

<Image align="center" border={true} caption="Creating a push notification template" src="https://files.readme.io/da9812c225e4de3ae21883e2502e1a72815fbf8a7b400266d7cbf7c688767a2c-Push_Notification_Flow.png" />

To create a push notification template, follow these steps:

1. In the **Creatives** section on Engage+, select **Push notification**.
2. Select the **Mobilepush Account** to send the content.

   <Image align="center" border={true} width="80% " src="https://files.readme.io/c4ad2e7-image.png" className="border" />
3. Select **Create new** to begin creating a new push notification creative.

   <Image align="center" border={true} width="80% " src="https://files.readme.io/cd24451f974bf27e6b53b1e9224e18e1c0bf0120bff9af630d0569c987357aa0-image.png" className="border" />
4. Enter the following information for the push notification. The fields are as follows:

   | Field         | Description                                                                                                                                                                                                                                           |
   | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Creative name | Relevant name for the push notification creative template. To add a label, select + Add labels and choose a label from the drop-down list. Refer to the documentation for more information on [labels](https://docs.capillarytech.com/docs/labels#/). |
   | Title         | Title (heading) for the push notification                                                                                                                                                                                                             |
   | Message       | Content for the push notification. To add a label, select + Add labels and choose a label from the drop-down list. Refer to the documentation for more information on [labels](https://docs.capillarytech.com/docs/labels#/).                         |

   <br />

   <Image align="center" border={true} width="80% " src="https://files.readme.io/77cd8b3f5398141f8684114e8cab02d0b384de2278b17fba7033e32ec29671f2-image.png" className="border" />
5. Select the iOS tab to create a push notification for iOS. You can select **Same content for both platforms** to sync content across Android and iOS.
6. From the Media type dropdown list, select the type of media to include in the push notification. Refer to the section on the [supported formats for each media type](https://docs.capillarytech.com/docs/create-push-notification-template#supported-formats-and-restrictions-for-push-notification-media-content) for more information.

   <Image align="center" border={true} width="80% " src="https://files.readme.io/cf5e7ec7ef6270941bdce433786314ac75e4a3de0a86cd66d9df688ae5ee3fd0-image.png" className="border" />
7. To add a link that opens when a user selects the notification body, select **Action on click of notification body**. It is recommended to either add an action on click or a call to action button.

   1. Select the link type.
   2. For a <Glossary>deep link</Glossary>, select it from the dropdown list and provide the URL keys if required.
   3. For an External Link, enter the URL.

      <Image align="center" border={true} width="80% " src="https://files.readme.io/f78c959f55aa8a956f2f9df3f77168b6e3a9eb317c17b0b38522110d3027d35e-image.png" className="border" />
8. Select **+ Add primary button** to add a call-to-action (CTA) button to the push notification message. You can add one primary CTA button per template. It is recommended to either add an action on click or a call to action button.

   1. In the **Primary button text** box, enter a title for the button.
   2. Select the link type.
   3. For a <Glossary>deep Link</Glossary>, select it from the dropdown list and provide the <Glossary>URL key</Glossary> if required.
   4. For an External Link, enter the entire URL.
   5. Select **Add secondary button to notification** to add and configure a secondary CTA button.
   6. Select **Save** to add the button or **Delete** to discard your changes.

      <Image align="center" border={true} width="80% " src="https://files.readme.io/23a244167eb04bc9fbb8d7e7a0f694486a68eade05a3d8001671aaf617ab6548-image.png" className="border" />
9. Preview the push notification on the right-hand side.

<Image align="center" border={true} width="40% " src="https://files.readme.io/2579f04f03641e4041a429e64f0edc7d2eed71fecbc0da7addd641d02ec67c54-Screenshot_2025-08-22_at_3.04.55_PM.png" className="border" />

10. (Optional) Select **<Anchor label="Preview and Test" target="_blank" href="https://docs.capillarytech.com/docs/test-and-preview-across-engagement-channels">Preview and Test</Anchor>** to preview the message content and test it with a set of <Anchor label="test customers" target="_blank" href="https://docs.capillarytech.com/docs/configure-campaign-level-settings#test-customers">test customers</Anchor> before sending it.

<Image align="center" border={true} width="550px" src="https://files.readme.io/234eab00b66985478c52874bdc030df831c59c0d4d0fb52463b6665943a1c730-image.png" className="border" />

11. Select **Save Template** to save the changes.

> 👍 Tips
>
> * Select **Same content for both platforms** to synchronise changes between iOS and Android templates.
> * There is no character limit for push notifications. However, ensure the content is added appropriately and displays correctly. For more information on title guidelines for push notifications, refer to the [material design documentation](https://m1.material.io/patterns/notifications.html#) for Android and the [Apple developer documentation](https://developer.apple.com/design/human-interface-guidelines/notifications) for iOS.
> * Make sure that all tags contain data. Inconsistency in the tags will result in a validation error.
>
>   <Image align="center" border={true} width="100% " src="https://files.readme.io/aa11e868f7d8a5dc5898aba974d6132968c19f54076573c5f926b36e522ec871-image.png" className="border" />

## Supported formats and restrictions for push notification media content

The table below describes the supported formats, dimensions, duration and file size for various types of push notification media content

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        **Media type**
      </th>

      <th>
        **Description**
      </th>

      <th>
        **Format and size information**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Image**
      </td>

      <td>
        Include a static image in the push notification message.
      </td>

      <td>
        **Dimensions:** Up to 2048 × 2048 pixels.<br />
        **Formats:** JPEG, JPG, PNG<br /> **GIF** is unsupported.
      </td>
    </tr>

    <tr>
      <td>
        **Video**
      </td>

      <td>
        Include a video in the push notification message.
      </td>

      <td>
        **Formats:** 3GP, MP4, MOV, M4V.
        **Duration:** Up to 600 seconds.
        **File size:** Up to 200 MB.
      </td>
    </tr>

    <tr>
      <td>
        **Carousel**
      </td>

      <td>
        Include multiple static images in the push notification message. Carousel videos and actions for each carousel are unsupported.
      </td>

      <td>
        **Dimensions:** Up to 2048 × 2048 pixels.<br />
        **Formats:** JPEG, JPG, PNG.<br />
        **Count:** Up to 10 individual images.
      </td>
    </tr>
  </tbody>
</Table>