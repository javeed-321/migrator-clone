---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure In-App Messaging

# Configuring In-App Messaging

You can enable and configure in-app messages within your application for both iOS and Android.

To enable in-app messaging, follow these steps:

1. Enable in-app messaging by setting the `enable_in_app_messaging` parameter to `true` in your `hydra-config.json` file.
2. Configure in-app messaging for iOS
   1. Add an Image Set named `inAppPlaceholder` in your project's `Assets.xcassets`. This image will serve as a placeholder when an in-app message does not include an image.
   2. In your `AppDelegate.swift` file, add the following at the top:
      ```swift
      import capillary_hydra_ios
      ```
   3. Add the following function to your `AppDelegate.swift` file:
      ```swift
      override func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void){
          HydraNativeAPI.shared.application(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)
      }
      ```
3. Configure in-app messaging for Android
   1. Add an image file named `hydra_in_app_placeholder` to the `android/app/src/main/res/drawable` folder. This image will be used as a placeholder when an in-app message does not include an image. The image file can be in PNG, JPG, or XML format.