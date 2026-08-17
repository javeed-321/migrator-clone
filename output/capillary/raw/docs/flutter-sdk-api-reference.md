---
updatedAt: 2026-03-26T06:57:38.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# API Reference for Event Tracking, Notifications, and User Lifecycle

# User Management, Account Configuration, and Event Tracking

## SignUp

This API can be used to register a user to the platform and report when a user registers.

```dart
static Future<bool> signUp({
 required HydraUserDetails userDetails,
 Map<String, dynamic>? customData,
});
```

### Parameters

| Parameter   | Type                                                                                               | Required/Optional | Description                                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| userDetails | [HydraUserDetails](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrauserdetails) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrauserdetails) |
| customData  | Map\<String, dynamic>?                                                                             | optional          | Custom attributes for analytics                                                                                   |

**Returns**: `Future<bool>` indicating if sign up was successfully requested

**Usage**:

```dart
bool signUpResult = await HydraCore.signUp(
 userDetails: userDetails,
);
```

***

## Sign In

This API can be used to sign in a user to the platform and report when a user signs in.

```dart
static Future<bool> signIn({
 required HydraUserDetails userDetails,
 Map<String, dynamic>? customData,
});
```

### Parameters

| Parameter   | Type                                                                                               | Required/Optional | Description                                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| userDetails | [HydraUserDetails](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrauserdetails) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrauserdetails) |
| customData  | Map\<String, dynamic>?                                                                             | optional          | Custom attributes for analytics                                                                                   |

**Returns**: `Future<bool>` indicating if sign in was successfully requested

**Usage**:

```dart
bool signInResult = await HydraCore.signIn(
 userDetails: userDetails,
);
```

***

## Sign Out

This API can be used to sign out a user and report when a user has signed out.

```dart
static Future<bool> signOut({
 required String customerId,
});
```

### Parameters

| Parameter  | Type   | Required/Optional | Description        |
| ---------- | ------ | ----------------- | ------------------ |
| customerId | String | required          | User's customer ID |

**Returns**: `Future<bool>` indicating if sign out was successful

**Usage**:

```dart
bool signOutResult = await HydraCore.signOut(
 customerId: "8888888888",
);
```

***

## Update User

This API can be used to update a user's profile and report when a user has updated their profile.

```dart
static Future<bool> updateUser({
 required HydraUserDetails userDetails,
 Map<String, dynamic>? customData,
 List<Map<String, dynamic>>? subscriptions,
});
```

### Parameters

| Parameter     | Type                                                                                               | Required/Optional | Description                                                                                                       |
| ------------- | -------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| userDetails   | [HydraUserDetails](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrauserdetails) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrauserdetails) |
| customData    | Map\<String, dynamic>?                                                                             | optional          | Custom attributes for analytics                                                                                   |
| subscriptions | List\<Map\<String, dynamic>>?                                                                      | optional          | List of Subscriptions with channel, accountId, priority, type and sourcename                                      |

**Returns**: `Future<bool>` indicating if update was successfully requested

**Usage**:

```dart
bool updateUserResult = await HydraCore.updateUser(
 userDetails: updatedUserDetails,
 customData: {"Key" : "Value"},
 subscriptions: [
   {"channel": "channel1", "type": "topic1", "priority": 1},
 ],
);
```

***

## Update Geo Config

This API can be used to update a user's geo config and report when a user has updated their geo config.

```dart
static Future<bool> updateGeoConfig({
 required HydraGeoConfig config,
});
```

### Parameters

| Parameter | Type                                                                                           | Required/Optional | Description                                                                                                     |
| --------- | ---------------------------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| config    | [HydraGeoConfig](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrageoconfig) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrageoconfig) |

**Returns**: `Future<bool>` indicating if geo config update was successful

**Usage**:

```dart
bool updateGeoConfigResult = await HydraCore.updateGeoConfig(
    config: config,
);
```

***

## Update User Push Preferences

This API can be used to update a user's push preference and report when a user has updated their push preference.

```dart
static Future<bool> updatePushPreferences({
 required String customerId,
 required HydraPushPreferences preferences,
});
```

### Parameters

| Parameter   | Type                                                                                                       | Required/Optional | Description                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| customerId  | String                                                                                                     | required          | User's customer ID                                                                                                    |
| preferences | [HydraPushPreferences](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrapushpreferences) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydrapushpreferences) |

**Returns**: `Future<bool>` indicating if preferences update was successful

**Usage**:

```dart
bool result = await HydraCore.updatePushPreferences(
 preferences: pushPreferences,
 customerId: "8888888888",
);
```

***

## Report custom user events

This API can be used to report custom user events.

```dart
static Future<bool> reportUserEvent({
 required String eventName,
 Map<String, dynamic>? attributes,
});
```

### Parameters

| Parameter  | Type                   | Required/Optional | Description           |
| ---------- | ---------------------- | ----------------- | --------------------- |
| eventName  | String                 | required          | Name of the event     |
| attributes | Map\<String, dynamic>? | optional          | Additional event data |

**Returns**: `Future<bool>` indicating if event reporting was successful

**Usage**:

```dart
bool sendEventResult = await HydraCore.reportUserEvent(
 eventName: "TestEvent",
 attributes:  {"Key" : "Value"},
);
```

***

# Managing Push Notifications

## Get FCM Token

This API can be used to get the FCM token and report when the token is retrieved.

```dart
static Future<String> getFCMToken();
```

**Returns**: `Future<String>` containing FCM token (throws error if unavailable)

**Usage**:

```dart
String fcmToken = await HydraPushNotification.getFCMToken();
```

***

## Request Permission for Push notifications

This API can be used to request permission for push notifications from the user and report when the push permission has been granted.

```dart
static Future<bool> requestPermission();
```

**Returns**: `Future<bool>` indicating if permission was granted

**Usage**:

```dart
bool granted = await HydraPushNotification.requestPermission();
```

***

# Managing the Notification Inbox

## Get list of Hydra Notifications

This API can be used to get the list of notifications.

```dart
static Future<List<HydraNotification>> getInboxMessages();
```

**Returns**: `Future<List<HydraNotification>>`

**Usage**:

```dart
List<HydraNotification> notifications = await HydraInbox.getInboxMessages();
```

***

## Get Unread Hydra Notifications Count

This API can be used to get the number of unread notifications.

```dart
static Future<int> getUnreadInboxMessagesCount();
```

**Returns**: `Future<int>` with unread count

**Usage**:

```dart
int unreadNotificationCount = await HydraInbox.getUnreadInboxMessagesCount();
```

***

## Mark a Hydra Notification as read

This API can be used to mark a notification as read and report when a notification has been marked as read.

```dart
static Future<bool> markInboxMessageAsRead({
 required HydraNotification notification,
});
```

### Parameters

| Parameter    | Type                                                                                                               | Required/Optional | Description                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| notification | [HydraNotification](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydranotification-model-classes) | required          | Notification to mark as read. The list of Hydra Notifications are obtained from [here](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#get-list-of-hydra-notifications). |

**Returns**: `Future<bool>` indicating success

**Usage**:

```dart
bool marked = await HydraInbox.markInboxMessageAsRead(notification: notification);
```

***

## Delete a Hydra Notification

This API can be used to delete a notification and report when a notification has been deleted.

```dart
static Future<bool> deleteInboxMessage({
 required HydraNotification notification,
});
```

### Parameters

| Parameter    | Type                                                                                                               | Required/Optional | Description                                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| notification | [HydraNotification](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydranotification-model-classes) | required          | Notification to delete. The list of Hydra Notifications are obtained from [here](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#get-list-of-hydra-notifications). |

**Returns**: `Future<bool>` indicating success

**Usage**:

```dart
bool deleted = await HydraInbox.deleteInboxMessage(notification: notification);
```

***

## Delete all Hydra Notifications

This API can be used to delete all notifications and report when all notifications have been deleted.

```dart
static Future<bool> deleteAllInboxMessages();
```

**Returns**: `Future<bool>` indicating success

**Usage**:

```dart
bool deleted = await HydraInbox.deleteAllInboxMessages();
```

***

# HydraInboxUI class APIs

## Show In-Built Notification Center

This API can be used to show the built-in notification center.

```dart
static Future<void> showNotificationCenter();
```

**Usage**:

```dart
HydraInboxUI.showNotificationCenter();
```

***

## Hide In-Built Notification Center if Showing

This API can be used to hide the built-in notification center.

```dart
static Future<void> hideNotificationCenterIfShowing();
```

**Usage**:

```dart
await HydraInboxUI.hideNotificationCenterIfShowing();
```

***

# HydraNativeEvent class APIs

## Add event handler

This API can be used to add and report when an event handler is added.

```dart
static void addEventHandler(HydraNativeEventHandler handler);
```

### Parameters

| Parameter | Type                                                                                                                 | Required/Optional | Description      |
| --------- | -------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- |
| handler   | [HydraNativeEventHandler](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydranativeevent-class-apis) | required          | Handler instance |

**Usage**:

```dart
HydraNativeEvents.addEventHandler(handler);
```

***

## Remove event handler

This API can be used to remove an event handler.

```dart
static void removeEventHandler(HydraNativeEventHandler handler);
```

### Parameters

| Parameter | Type                                                                                                                 | Required/Optional | Description      |
| --------- | -------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- |
| handler   | [HydraNativeEventHandler](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydranativeevent-class-apis) | required          | Handler instance |

**Usage**:

```dart
HydraNativeEvents.removeEventHandler(handler);
```

***

## Remove all event handlers

This API can be used to remove all registered event handlers.

```dart
static void removeAllEventHandlers();
```

**Usage**:

```dart
HydraNativeEvents.removeAllEventHandlers();
```

***

# SDK Event Tracking

This class stores the details of the event handler.

```dart
class HydraNativeEventHandler {
 void onTokenAvailable({required String token}) {}
 void onHydraNotificationReceived({required HydraNotification notification}) {}
 void onHydraNotificationClicked({HydraNotificationCTA? cta, HydraNotification? notification}) {}
 void onHydraNotificationDismissed({required HydraNotification notification}) {}
 void onHydraNotificationShown({required HydraNotification notification}) {}
 void onNotificationCenterDismissed() {}
 void onHydraSdkInitializationResult({required bool success, String? error}) {}
}
```

## Callback Descriptions

* **onTokenAvailable**: New FCM token available
* **onHydraNotificationReceived**: Notification received
* **onHydraNotificationClicked**: Notification/CTA clicked
* **onHydraNotificationDismissed**: Notification dismissed
* **onHydraNotificationShown**: Notification shown
* **onNotificationCenterDismissed**: Notification center closed
* **onHydraSdkInitializationResult**: SDK initialization result

***

# Managing User Data Structures

## HydraUserDetails

This class stores the details of a user.

```dart
HydraUserDetails({
 required this.customerId,
 this.email,
 this.phoneNumber,
 this.firstName,
 this.lastName,
});
```

### Parameters

| Parameter   | Type    | Required/Optional | Description         |
| ----------- | ------- | ----------------- | ------------------- |
| customerId  | String  | required          | User identifier     |
| firstName   | String? | optional          | User's first name   |
| lastName    | String? | optional          | User's last name    |
| email       | String? | optional          | User's email        |
| phoneNumber | String? | optional          | User's phone number |

**Usage**:

```dart
HydraUserDetails userDetails = HydraUserDetails(
 customerId: '8888888888',
 firstName: 'FirstName',
 lastName: 'LastName',
 email: 'test@capillarytech.com',
 phoneNumber: '918888888888',
);
```

***

## HydraGeoConfig

This class stores the geo config details of a user.

```dart
HydraGeoConfig({
 required this.city,
 required this.country,
 required this.countryCode,
 this.timezone,
});
```

### Parameters

| Parameter   | Type    | Required/Optional | Description    |
| ----------- | ------- | ----------------- | -------------- |
| city        | String  | required          | User's city    |
| country     | String  | required          | User's country |
| countryCode | String  | required          | Country code   |
| timezone    | String? | optional          | Timezone       |

**Usage**:

```dart
HydraGeoConfig geoConfig = HydraGeoConfig(
 city: "Bangalore",
 country: "India",
 countryCode: "IN",
 timezone: "Asia/Kolkata",
);
```

***

## HydraPushPreferences

This class stores the push preference details of a user.

```dart
HydraPushPreferences({
 required this.promPushEnabled,
 required this.transPushEnabled,
});
```

### Parameters

| Parameter        | Type | Required/Optional | Description          |
| ---------------- | ---- | ----------------- | -------------------- |
| promPushEnabled  | bool | required          | Promotional pushes   |
| transPushEnabled | bool | required          | Transactional pushes |

**Usage**:

```dart
HydraPushPreferences pushPreferences = HydraPushPreferences(
     promPushEnabled: false,
     transPushEnabled: true,
);
```

***

# Managing Notification Data Structures

## HydraNotification Structure

This class stores the structure for a notification.

```dart
class HydraNotification {
 final String? cuid;
 final String? scope;
 final String? campaignId;
 final String? variationId;
 // ... (other properties)
 final HydraNotificationGateway? gateway;
 final HydraNotificationBody? body;
 final HydraNotificationExpandedDetails? expandableDetails;
 // ... (other properties)
}
```

## HydraNotificationBody

This class stores the body for a notification.

```dart
class HydraNotificationBody {
 final String? title;
 final String? message;
 final String? image;
 final HydraNotificationCTA? cta;
}
```

## HydraNotificationCTA

This class stores the call to action (CTA) for a notification.

```dart
class HydraNotificationCTA {
 final HydraNotificationCTAType? type;
 final String? action;
 final String? actionText;
}
```

## HydraNotificationCTAType Enum

This class stores the call to action (CTA) type enums for a notification.

```dart
enum HydraNotificationCTAType {
 external,
 deepLink,
 rating,
 feedback,
 appRating,
 unknown,
}
```

## HydraNotificationExpandedDetails

This class stores the expanded details for a notification.

```dart
class HydraNotificationExpandedDetails {
 final List<HydraNotificationCTA>? ctas;
 final String? message;
 final String? image;
 final String? style;
}
```

## HydraNotificationGateway Enum

This class stores the gateway details for a notification.

```dart
enum HydraNotificationGateway {
 fcm,
 xiaomi,
 unknown,
}
```