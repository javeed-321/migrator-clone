---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# React Native Setup Overview

1. For a multi-Hydra account setup, you must use one of the following methods to initialise the Hydra SDK from the React Native side when switching Hydra accounts for a given user. You can set Hydra account details in two ways:
   * When fetching Hydra account values yourself, use [setHydraAccountConfig](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#configure-hydra-account-settings).
   * When you are using Firebase Remote Config, use [setFirebaseRemoteConfigKeys](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#configure-firebase-remote-configuration-keys).\
     If you have a single-Hydra account setup, no action is required.

2. Use the HydraCore class for user management. It includes static functions such as: [signUp](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#signup) and [signIn](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#sign-in). These functions require a customerId that must match the configuration on the Capillary CRM dashboard.

3. Use the [signUp](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#signup) function to register the user. For subsequent launches, use [signIn](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#sign-in).

4. The [HydraPushNotification](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrapushnotification-class-apis) class provides static functions for push notifications: [requestPermission](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#request-permission-for-push-notifications) and [getFCMToken](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#get-fcm-token). To receive push notifications, you can ask for permission using [requestPermission](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#request-permission-for-push-notifications).

5. Use [getFCMToken](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#get-fcm-token) to get the FCM token. You can also add the listener using [addTokenAvailableListener](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#get-callback-when-a-new-fcm-token-is-available) API in HydraNativeEventEmitter to get it when it is available.

6. The HydraCore class includes additional functions:
   1. Use [updateUser](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#update-user) to update the userDetails set in the signUp or signIn API.
   2. Use [signOut](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#sign-out) to sign out a user.
   3. Use [updateGeoConfig](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#update-geo-config) to update users' geo configuration, such as city, country and countryCode.
   4. Use [updatePushPreferences](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#update-user-push-preferences) to update push notification preferences and enable or disable promotional and transactional push notifications.
   5. Use [reportUserEvent](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#report-custom-user-events) to report a custom user event to help analyse users' behaviour patterns.

7. Use the HydraInbox class to manage them with functions like [getInboxMessages](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#get-list-of-hydra-notifications), [getUnreadMessagesCount](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#get-unread-hydra-notifications-count), [markInboxMessageAsRead](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#mark-a-hydra-notification-as-read), [deleteInboxMessage](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#delete-a-hydra-notification), and [deleteAllInboxMessages](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#delete-all-hydra-notifications). The Hydra SDK has a database of the Hydra notifications and doesn't save any non-Hydra notifications. These APIs allow you to implement your UI for Notification Centre.

8. Use the [HydraInboxUI](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#/managing-the-in-app-notification-centre) class functions: [showNotificationCenter](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#/show-in-built-notification-centre) and [hideNotificationCenterIfShowing](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#/hide-in-built-notification-centre-if-showing) to use the built-in notification centre from the Hydra plugin.

9. The [HydraNativeEventEmitter](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#/sdk-event-tracking) class allows you to register listeners for different events from the SDK.
   1. Use [getInstance](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#/get-singleton-instance) API to get the singleton instance.
   2. Use [addHydraNotificationReceivedListener](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#/get-callback-when-a-hydra-notification-is-received) when a Hydra notification is received.
   3. Use [addHydraNotificationClickedListener](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#get-a-callback-for-notification-click) to receive a callback when a hydra push notification is clicked, an InApp message is clicked, or a notification is clicked in the hydra built-in notification centre.
   4. Use [addHydraNotificationShownListener](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#callback-when-hydra-notification-is-shown) to receive a callback when a hydra notification is shown using notification preview.
   5. Use [addHydraNotificationDismissedListener](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#callback-when-user-dismisses-a-hydra-notification) when a Hydra notification is dismissed by the user.
   6. Use [addNotificationCenterDismissedListener](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#callback-when-in-built-notification-center-is-dismissed) to get the callback when the Hydra in-built notification centre is dismissed by the user.
   7. Use [addInboxUpdatedListener](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#callback-when-the-inbox-is-updated) when the Hydra notification database is updated.
   8. Use [removeListener](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#remove-an-added-listener) API to remove a listener.

10. Configure log levels in `hydra-config.json` for Android and in `HydraConfig.plist`for iOS. Console log level is used for logging in XCode console and LogCat logs for iOS and Android, respectively. Remote log level is used to save the logs in the backend. Both logs have to be integers between 0 to 5, where 0 turns off the logs and 5 is verbose. Use the LOG\_LEVELS key on iOS and log\_levels to configure iOS and Android logs, respectively.