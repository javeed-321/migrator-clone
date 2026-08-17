---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure Push Notifications

# Configuring push notifications for Android

Follow these steps to configure push notifications for your Android project:

1. Add the following class path in `dependencies classpath` in the `android/build.gradle` file:
   ```
   'com.google.gms:google-services:4.4.2'
   ```
2. In `android/app/build.gradle`, apply the following plugin at the top of the file, where other plugins are initialized:
   ```gradle
   apply plugin: "com.google.gms.google-services"
   ```
3. Add a `colors.xml` resource file in the `android/app/src/main/res/values` folder if one does not already exist. Add the following color resource:
   ```xml
   <color name="hydra_notification_color">#FF03DAC5</color>
   ```
4. Add a small icon file named `hydra_notification_small_icon` to the `android/app/src/main/res/drawable` folder. This icon is used in the notification drawer. The file can be in XML, PNG, or JPG format.

# Configuring push notifications for iOS

Follow these steps to configure push notifications for your iOS project:

1. Ensure you have added the Push Notification capability for your app identifier on the [Apple Developer website](https://developer.apple.com/).
2. In your Xcode project settings for your application target, add the following capabilities under Signing & Capabilities:
   * Push Notification
   * Background Modes, with Background fetch and Remote notifications enabled.
3. In `HydraConfig.plist`, set` SUPPORTS_PUSH_NOTIFICATION` to `YES`.
   > 📘 Note
   >
   > It is mandatory to set up rich notifications for push notifications to function correctly on iOS. Refer to the instructions under Configure rich notifications for iOS for detailed steps.

## Configuring rich notifications for iOS

Follow these steps to configure rich push notifications for your iOS project.

1. Go to your project settings in Xcode and add a new target and select Notification Service Extension from the available templates. This adds a Notification Service Extension to your project.

   <Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/425ac7aca18db38c8f1fc3e5739a15d70f8b50b44cc27c7b1954ab71fbf49fa5-image.png" />
2. When configuring the new target, Xcode will append the `ProductName` of your main target to its bundle identifier to create the bundle identifier for this extension. You must add this extension bundle identifier on the [Apple Developer website](https://developer.apple.com).

<Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/4e6b398bdee413ff26531398ea311e4577c6edceb10649a457b6c64286fde377-image.png" />

3. Select the language as `Objective-C`if your `AppDelegate` is Objective-C and `Swift` if your AppDelegate is Swift.

   <Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/02b47dde83d3360d459dac5d69b941cdda4ef07a490b2bf87ba14d5f7ae20c25-image.png" />
4. Add the `App Groups` capability in `Signing & Capabilities` for both your main application target and the new extension target. You will need to create and add a group in both targets. The group name must follow the format `group.<runner_target_bundle_id>.hydra`, where `<runner_target_bundle_id>` is replaced with the actual bundle identifier of your main application target. This App group also needs to be added on the [Apple Developer website](https://developer.apple.com) for both app identifiers.
5. In your ios/Podfile, add `extension_pods` within the target block for your new extension target, as shown here:

   ```ruby
   target 'HydraRichNotification' do
    extension_pods
   end
   ```
6. Install the pods again by opening your terminal, changing the current working directory to your project's ios folder, and running the command:
   ```shell
   pod install
   ```
7. Replace the entire code `NotificationService.mm`(Objective-C) or `NotificationService.swift` (Swift) with the following code:
   ```objectivec
   #import "NotificationService.h"
   #import "HydraPushNotificationServiceExtension/HydraPushNotificationServiceExtension.h"
   @implementation NotificationService
   HydraRemoteNotificationService* service;
   -(id)init{
     self = [super init];
     service = [[HydraRemoteNotificationService alloc] init];
     return  self;
     
   }
   - (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
     [service didReceiveNotificationRequest:request withContentHandler:contentHandler];
   }
   - (void)serviceExtensionTimeWillExpire {
     [service serviceExtensionTimeWillExpire];
   }
   @end
   ```
   ```swift
   import UserNotifications
   import HydraPushNotificationServiceExtension
   class NotificationService: UNNotificationServiceExtension {
       let service:HydraRemoteNotificationService = .init()
       
       override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
           service.didReceive(request, withContentHandler: contentHandler)
       }
       
       override func serviceExtensionTimeWillExpire() {
           service.serviceExtensionTimeWillExpire()
       }
   }
   ```