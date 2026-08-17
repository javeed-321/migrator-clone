---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure Notification Center

This document outlines the steps to integrate Notification Center into your React Native project using the Hydra SDK. Follow the instructions below to enable and configure Notification Center for your application.

An In-App Notification Centre is a centralised hub within the dashboard, allowing you to stay updated on important events, actions, and announcements without leaving the app.

<Image align="center" border={false} caption="Notification centre on Android" src="https://files.readme.io/2b86f5234d7677edf82be916aeef2e4ddd01c2734a0fc93349ca063dc2acf1ae-image.png" width="60% " />

<Image align="center" border={false} caption="Notification centre on iOS" src="https://files.readme.io/0db981e45dc7eb95b7a16b91570b1d0951177fa090e23a6c1e4d3408d62e9a41-image.png" width="60% " />

# Configuring the Inbox API

This API allows you to retrieve and display a list of messages for a user.

To set up the Inbox API, enable the Inbox API by setting the `enable_inbox_api` parameter to `YES` in your `hydra-config.plist` file.

> 📘 Notes
>
> * To use the Inbox API in iOS, you must have added the notification service extension by following the instructions under Configuring rich notifications for iOS.
> * The inbox API is always enabled for Android.

# Configuring the Inbox UI

This allows you to use the native notification center UI included in Hydra SDK.

To enable the Inbox UI, follow these steps:

1. Enable the Inbox API by following the instructions under Configuring the Inbox API.
2. For iOS:
   1. [Configure the Inbox API](https://docs.capillarytech.com/docs/react-native-sdk-notification-center#configuring-the-inbox-api).
   2. Enable the Inbox UI by setting the `ENABLE_INBOX_UI` parameter to `YES` in your `hydra-config.plist` file.
   3. Configure Inbox UI for iOS by adding an image asset named `inboxUIPlaceholder` in your project's `images.xcassets`.
   4. To use the default UI configuration for the built-in notification centre, set `USE_DEFAULT_INBOX_UI_CONFIG` to `YES` in `HydraConfig.plist`.
   5. To apply a custom UI configuration, set `USE_DEFAULT_INBOX_UI_CONFIG` to `NO`, and define the configuration in the `INBOX_UI_CONFIG` key in `HydraConfig.plist`. The `HydraConfig.plist`. includes all the configuration options.
3. For Android:
   1. Enable the Inbox UI by setting the `enable_inbox_ui` parameter to `true` in your `hydra-config.json` file.
   2. Configure Inbox UI for Android by adding an image file named `hydra_inbox_ui_placeholder` to the `android/app/src/main/res/drawable` folder. Inbox UI on Android uses the default configuration.