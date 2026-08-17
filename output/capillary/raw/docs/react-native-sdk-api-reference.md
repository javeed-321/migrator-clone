---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# API Reference for Event Tracking, Notifications, and User Lifecycle

# User Management, Account Configuration, and Event Tracking

## SignUp

This API can be used to register a user to the platform and report when a user registers.

```typescript
static signUp(
  userDetails: HydraUserDetails,
  customAttributes: Record<string, any> | null = null
): Promise<boolean>;
```

### Parameters

| Parameter        | Type                                                                                                    | Required/Optional | Description                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| userDetails      | [HydraUserDetails](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrauserdetails) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrauserdetails) |
| customAttributes | Record\<string, any>                                                                                    | optional          | You can pass custom attributes that can be used for analytics                                                          |

**Returns**: `Promise<boolean>` indicating if sign up was successfully requested

**Usage**:

```typescript
HydraCore.signUp(userDetails, customAttributesObj)
  .then((res: any) => {
    console.log('HydraCore.signUp success', res);
  })
  .catch((err: any) => {
    console.log('HydraCore.signUp error', err);
  });
```

***

## Sign In

This API can be used to sign in a user to the platform and report when a user signs in.

```typescript
static signIn(
  userDetails: HydraUserDetails,
  customAttributes: Record<string, any> | null = null
): Promise<boolean>;
```

### Parameters

| Parameter        | Type                                                                                                    | Required/Optional | Description                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| userDetails      | [HydraUserDetails](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrauserdetails) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrauserdetails) |
| customAttributes | Record\<string, any>                                                                                    | optional          | You can pass custom attributes that can be used for analytics                                                          |

**Returns**: `Promise<boolean>` indicating if sign in was successfully requested

**Usage**:

```typescript
HydraCore.signIn(userDetails, customAttributesObj)
  .then((res: any) => {
    console.log('HydraCore.signIn success', res);
  })
  .catch((err: any) => {
    console.log('HydraCore.signIn error', err);
  });
```

***

## Update User

This API can be used to update a user's profile and report when a user has updated their profile.

```typescript
static updateUser(
  userDetails: HydraUserDetails,
  customAttributes: Record<string, any> | null = null,
  subscriptions: Object[] | null = null
): Promise<boolean>;
```

### Parameters

| Parameter        | Type                                                                                                    | Required/Optional | Description                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| userDetails      | [HydraUserDetails](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrauserdetails) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrauserdetails) |
| customAttributes | Record\<string, any>                                                                                    | optional          | You can pass custom attributes that can be used for analytics                                                          |
| subscriptions    | Object\[]                                                                                               | optional          | List of Subscriptions which include channel, accountId, priority, type and sourcename                                  |

**Returns**: `Promise<boolean>` indicating if update was successfully requested

**Usage**:

```typescript
HydraCore.updateUser(userDetails, customAttributesObj, subscriptionsObj)
  .then((res: any) => {
    console.log('HydraCore.updateUser', res);
  })
  .catch((err: any) => {
    console.log('HydraCore.updateUser', err);
  });
```

***

## Update Geo Config

This API can be used to update a user's geo config and report when a user has updated their geo config.

```typescript
static updateGeoConfig(geoConfig: HydraGeoConfig): Promise<boolean>;
```

### Parameters

| Parameter | Type                                                                                                | Required/Optional | Description                                                                                                          |
| --------- | --------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| geoConfig | [HydraGeoConfig](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrageoconfig) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrageoconfig) |

**Returns**: `Promise<boolean>` indicating if geo config update was successful

**Usage**:

```typescript
HydraCore.updateGeoConfig(geoConfig).then((updateRequested) => {
  console.log('Geo config update requested = ', updateRequested);
}).catch((err: any) => {
  console.log('HydraCore.updateGeoConfig', err);
});
```

***

## Sign Out

This API can be used to sign out a user and report when a user has signed out.

```typescript
static signOut(customerId: string): Promise<boolean>;
```

### Parameters

| Parameter  | Type   | Required/Optional | Description                         |
| ---------- | ------ | ----------------- | ----------------------------------- |
| customerId | string | required          | Customer id of the user to sign out |

**Returns**: `Promise<boolean>` indicating if sign out was successful

**Usage**:

```typescript
HydraCore.signOut(customerId)
  .then((signOutRequested) => {
    console.log('Signed Out');
  })
  .catch((err: any) => {
    console.log('HydraCore.signOut', err);
  });
```

***

## Update User Push Preferences

This API can be used to update a user's push preference and report when a user has updated their push preference.

```typescript
static updatePushPreferences(
  customerId: string,
  preferences: HydraPushPreferences
): Promise<boolean>;
```

### Parameters

| Parameter   | Type                                                                                                            | Required/Optional | Description                                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| customerId  | string                                                                                                          | required          | Customer id of the user to update push preferences                                                                         |
| preferences | [HydraPushPreferences](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrapushpreferences) | required          | [Read more about this class here](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrapushpreferences) |

**Returns**: `Promise<boolean>` indicating if preferences update was successful

**Usage**:

```typescript
HydraCore.updatePushPreferences(customerId, pushPreferences)
  .then((res: any) => {
    console.log('HydraCore.updatePushPreferences success', res);
  })
  .catch((err: any) => {
    console.log('HydraCore.updatePushPreferences error', err);
  });
```

***

## Report custom user events

This API can be used to report custom user events.

```typescript
static reportUserEvent(
  eventName: string,
  attributes: Record<string, any> | null = null
): Promise<boolean>;
```

### Parameters

| Parameter  | Type                 | Required/Optional | Description                                                |
| ---------- | -------------------- | ----------------- | ---------------------------------------------------------- |
| eventName  | string               | required          | Name of the event you want to report                       |
| attributes | Record\<string, any> | optional          | List of key value pairs for additional data with the event |

**Returns**: `Promise<boolean>` indicating if event reporting was successful

**Usage**:

```typescript
HydraCore.reportUserEvent('test_event', {
  testKey: 'testValue',
})
  .then((res: any) => {
    console.log('HydraCore.reportUserEvent success', res);
  })
  .catch((err: any) => {
    console.log('HydraCore.reportUserEvent error', err);
  });
```

***

## Configure Hydra account settings

This API can be used to configure the Hydra account settings for the user.

```typescript
static setHydraAccountConfig(
   hydraAccountConfig: HydraAccountConfig
 ): Promise<boolean>;
```

### Parameters

| Parameter          | Type                                                                                                        | Required/Optional | Description                                                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| hydraAccountConfig | [HydraAccountConfig](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydraaccountconfig) | required          | Read more about this class [here](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydraaccountconfig). |

**Returns**: `Promise<boolean>` indicating if the account update was successful

**Usage**:

```typescript
HydraCore.setHydraAccountConfig(HhydraAccountConfig)
     .then((res: any) => {
               console.log('HydraCore.setHydraAccountConfig   
               success', res})
           .catch((err: any) => {
         console.log('HydraCore.setHydraAccountConfig       
         error',err)
      });
```

***

## Configure Firebase remote configuration keys

This API can be used to configure the Firebase Remote configuration keys.

```typescript
static setFirebaseRemoteConfigKeys(
   remoteConfigKeys: HydraFirebaseRemoteConfigKeys
 ): Promise<boolean>;
```

### Parameters

| Parameter        | Type                                                                                                                              | Required/Optional | Description                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| remoteConfigKeys | [HydraFirebaseRemoteConfigKeys](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrafirebaseremoteconfigkeys) | required          | Read more about this class [here](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydrafirebaseremoteconfigkeys). |

**Returns**: `Promise<boolean>` indicating if the remote key update was successful

**Usage**:

```typescript
 HydraCore.setFirebaseRemoteConfigKeys(remoteConfigKeys)
     .then((res: any) => {
               console.log('HydraCore.setFirebaseRemoteConfigKeys   
               success', res})
           .catch((err: any) => {
         console.log('HydraCore.setFirebaseRemoteConfigKeys       
         error',err)
      });
```

***

# Managing Push Notifications

## Get FCM Token

This API can be used to get the FCM token and report when the token is retrieved.

```typescript
static getFCMToken(): Promise<string>;
```

**Returns**: `Promise<string>` containing FCM token (throws error if unavailable)

**Usage**:

```typescript
HydraPushNotification.getFCMToken().then((token) => {
  console.log('FCM Token - ', token);
}).catch((err: any) => {
  console.log('HydraPushNotification.getFCMToken', err);
});
```

***

## Request Permission for Push notifications

This API can be used to request permission for push notifications from the user and report when the push permission has been granted.

```typescript
static requestPermission(): Promise<boolean>;
```

**Returns**: `Promise<boolean>` indicating if permission was granted

**Usage**:

```typescript
HydraPushNotification.requestPermission()
  .then((status) => {
    console.log('Notification permission status - ', status);
  })
  .catch((err: any) => {
    console.log('HydraPushNotification.requestPermission', err);
  });
```

***

# Managing the Notification Inbox

## Get list of Hydra Notifications

This API can be used to get the list of notifications.

```typescript
static async getInboxMessages(): Promise<HydraNotification[]>;
```

**Returns**: `Promise<HydraNotification[]>`

**Usage**:

```typescript
HydraInbox.getInboxMessages().then((messages) => {
  if (messages.length > 0) {
    console.log('Inbox message first - ', messages[0]);
  } else {
    console.log('No messages in inbox');
  }
});
```

***

## Get Unread Hydra Notifications Count

This API can be used to get the number of unread notifications.

```typescript
static getUnreadMessagesCount(): Promise<number>;
```

**Returns**: `Promise<number>` with unread count

**Usage**:

```typescript
HydraInbox.getUnreadMessagesCount().then((count) => {
  console.log('Unread count - ', count);
});
```

***

## Mark a Hydra Notification as read

This API can be used to mark a notification as read and report when a notification has been marked as read.

```typescript
static markInboxMessageAsRead(
  hydraNotification: HydraNotification
): Promise<boolean>;
```

### Parameters

| Parameter         | Type                                                                                                                          | Required/Optional | Description                                                                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hydraNotification | [HydraNotification](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#managing-notification-data-structures) | required          | Hydra Notification to mark as read from the list of Hydra Notification obtained [here](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#managing-notification-data-structures) |

**Returns**: `Promise<boolean>` indicating success

**Usage**:

```typescript
HydraInbox.markInboxMessageAsRead(hydraNotification).then((res) => {
  console.log('Marked as read - ', res);
});
```

***

## Delete a Hydra Notification

This API can be used to delete a notification and report when a notification has been deleted.

```typescript
static deleteInboxMessage(
  hydraNotification: HydraNotification
): Promise<boolean>;
```

### Parameters

| Parameter         | Type                                                                                                                          | Required/Optional | Description                                                                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hydraNotification | [HydraNotification](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#managing-notification-data-structures) | required          | Hydra Notification to delete from the list of Hydra Notification obtained [here](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#managing-notification-data-structures) |

**Returns**: `Promise<boolean>` indicating success

**Usage**:

```typescript
HydraInbox.deleteInboxMessage(hydranotification).then((deleted) => {
  console.log('Deleted message - ', deleted);
});
```

***

## Delete all Hydra Notifications

This API can be used to delete all notifications and report when all notifications have been deleted.

```typescript
static deleteAllInboxMessages(): Promise<boolean>;
```

**Returns**: `Promise<boolean>` indicating success

**Usage**:

```typescript
HydraInbox.deleteAllInboxMessages().then((deleted) => {
  console.log('All messages deleted - ', deleted);
});
```

***

# Managing the In-App Notification Centre

## Show In-Built Notification Centre

This API can be used to show the built-in notification centre.

```typescript
static showNotificationCenter(): Promise<void>;
```

**Usage**:

```typescript
HydraInboxUI.showNotificationCenter();
```

***

## Hide In-Built Notification Centre if Showing

This API can be used to hide the built-in notification centre.

```typescript
static hideNotificationCenterIfShowing(): Promise<void>;
```

**Usage**:

```typescript
HydraInboxUI.hideNotificationCenterIfShowing().then(() => {
  console.log('Notification Center hidden');
});
```

***

# SDK Event Tracking

## Get Singleton Instance

This API can be used to get the singleton instance.

```typescript
static getInstance(): HydraNativeEventEmitter;
```

**Returns**: Singleton Instance of HydraNativeEventEmitter to invoke all other functions of this class

**Usage**:

```typescript
HydraNativeEventEmitter.getInstance();
```

***

## Get callback for Hydra SDK initialization result

This API can be used to get the result of initialisation.

```typescript
HydraNativeEventEmitter.addHydraSdkInitializationResultListener(
  listener: (success: boolean, errorMessage: string | null) => void
): EmitterSubscription;
```

### Parameters

| Parameter | Type                                                     | Required/Optional | Description                                                                                                                                                             |
| --------- | -------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| listener  | (success: boolean, errorMessage: string \| null) => void | required          | A function which accepts a boolean if the initialization was successful or not, the function also has an optional string to pass errorMessage when initialization fails |

**Returns**: subscription object of type EmitterSubscription, this should be saved if you want to remove the listener later

**Usage**:

```typescript
const hydraSdkIntializationResultSubscription =
  HydraNativeEventEmitter.getInstance().addHydraSdkInitializationResultListener(
    (result, message) => {}
  );
```

***

## Get callback when a new FCM token is available

This API can be used to get a callback and report when a new FCM token is available.

```typescript
HydraNativeEventEmitter.addTokenAvailableListener(
  listener: (token: string) => void
): EmitterSubscription;
```

### Parameters

| Parameter | Type                    | Required/Optional | Description                                               |
| --------- | ----------------------- | ----------------- | --------------------------------------------------------- |
| listener  | (token: string) => void | required          | A function which accepts a string parameter for FCM token |

**Returns**: subscription object of type EmitterSubscription, this should be saved if you want to remove the listener later

**Usage**:

```typescript
const tokenAvailableSubscription =
  HydraNativeEventEmitter.getInstance().addTokenAvailableListener(
    (token) => {
      console.log('>>> onTokenAvailable:', token);
    }
  );
```

***

## Get callback when a Hydra Notification is received

This API can be used to get a callback and report when a new notification is received.

```typescript
HydraNativeEventEmitter.addHydraNotificationReceivedListener(
  listener: (notification: HydraNotification) => void
): EmitterSubscription;
```

### Parameters

| Parameter | Type                                      | Required/Optional | Description                                                                      |
| --------- | ----------------------------------------- | ----------------- | -------------------------------------------------------------------------------- |
| listener  | (notification: HydraNotification) => void | required          | A function which accepts a HydraNotification parameter for received notification |

**Returns**: subscription object of type EmitterSubscription, this should be saved if you want to remove the listener later

**Usage**:

```typescript
const notificationReceivedSubscription = HydraNativeEventEmitter.getInstance().addHydraNotificationReceivedListener((notification : HydraNotification) => {
  console.log('>>>>>>> Notification received >>>>>> ', notification);
});
```

***

## Get a callback for notification click

This API can be used to get a callback and report when a notification is clicked.

```typescript
HydraNativeEventEmitter.addHydraNotificationClickedListener(
  listener: (notification: HydraNotification | null, cta: HydraNotificationCta) => void
): EmitterSubscription;
```

### Parameters

| Parameter | Type                                                                         | Required/Optional | Description                                                                                                                                                                                                                                                  |
| --------- | ---------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| listener  | (notification: HydraNotification \| null, cta: HydraNotificationCta) => void | required          | A function which accepts an optional HydraNotification parameter for received notification and a required [HydraNotificationCta](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#hydranotificationcta) parameter for CTA that was clicked |

**Returns**: subscription object of type EmitterSubscription, this should be saved if you want to remove the listener later

**Usage**:

```typescript
function onHydraNotificationClicked(
  notification: HydraNotification | null,
  cta: HydraNotificationCta
) {
  console.log(
    '>>>>>>>>> onHydraNotificationClicked',
    notification, 'cta', cta);
  if (cta.type === HydraNotificationCtaType.external) {
    if (cta.action) {
    }
  } else if (cta.type === HydraNotificationCtaType.deepLink) {
    console.log('DeepLink clicked', cta.action);
  }
}

const notificationClickedSubscription = HydraNativeEventEmitter.getInstance().addHydraNotificationClickedListener( onHydraNotificationClicked );
```

***

## Callback when Hydra Notification is Shown

This API can be used to get a callback and report when a notification token is shown.

```typescript
HydraNativeEventEmitter.addHydraNotificationShownListener(
  listener: (notification: HydraNotification) => void
): EmitterSubscription;
```

### Parameters

| Parameter | Type                                      | Required/Optional | Description                                                                   |
| --------- | ----------------------------------------- | ----------------- | ----------------------------------------------------------------------------- |
| listener  | (notification: HydraNotification) => void | required          | A function which accepts a HydraNotification parameter to show a notification |

**Returns**: subscription object of type EmitterSubscription, this should be saved if you want to remove the listener later

**Usage**:

```typescript
const notificationShownSubscription =
  HydraNativeEventEmitter.getInstance().addHydraNotificationShownListener(
    (notification: HydraNotification) => {
      console.log('>>>>>>>>> onHydraNotificationShown', notification);
    }
  );
```

***

## Callback when user dismisses a hydra notification

This API can be used to get a callback and report when a user dismisses a notification.

```typescript
HydraNativeEventEmitter.addHydraNotificationDismissedListener(
  listener: (notification: HydraNotification) => void
): EmitterSubscription;
```

### Parameters

| Parameter | Type                                      | Required/Optional | Description                                                                         |
| --------- | ----------------------------------------- | ----------------- | ----------------------------------------------------------------------------------- |
| listener  | (notification: HydraNotification) => void | required          | A function which accepts a HydraNotification parameter for a dismissed notification |

**Returns**: subscription object of type EmitterSubscription, this should be saved if you want to remove the listener later

**Usage**:

```typescript
const notificationDismissedSubscription = HydraNativeEventEmitter.getInstance().addHydraNotificationDismissedListener(
  (notification: HydraNotification) => {
    console.log('>>>>>>>>> onHydraNotificationDismissed', notification);
  }
);
```

***

## Callback when In-Built notification center is dismissed

This API can be used to get a callback and report when a user dismisses the in-built notification center.

```typescript
HydraNativeEventEmitter.addNotificationCenterDismissedListener(
  listener: () => void
): EmitterSubscription;
```

### Parameters

| Parameter | Type       | Required/Optional | Description                       |
| --------- | ---------- | ----------------- | --------------------------------- |
| listener  | () => void | required          | A function without any parameters |

**Returns**: subscription object of type EmitterSubscription, this should be saved if you want to remove the listener later

**Usage**:

```typescript
const notificationCenterDismissedSubscription =
  HydraNativeEventEmitter.getInstance().addNotificationCenterDismissedListener(
    () => {
      console.log('>>>>>>> Notification center dismissed >>>>>>');
    }
  );
```

***

## Callback when the inbox is updated

This API can be used to get a callback and report when the inbox is updated.

```typescript
HydraNativeEventEmitter.addInboxUpdatedListener(
  listener: () => void
): EmitterSubscription;
```

### Parameters

| Parameter | Type       | Required/Optional | Description                       |
| --------- | ---------- | ----------------- | --------------------------------- |
| listener  | () => void | required          | A function without any parameters |

**Returns**: subscription object of type EmitterSubscription, this should be saved if you want to remove the listener later

**Usage**:

```typescript
const inboxUpdatedSubscription =
  HydraNativeEventEmitter.getInstance().addInboxUpdatedListener(() => {
    console.log('>>>>>>> Inbox updated >>>>>>');
  });
```

***

## Remove an added listener

This API can be used to get a callback and report when an added listener is removed.

```typescript
HydraNativeEventEmitter.removeListener(
  emitterSubscription: EmitterSubscription
): void;
```

### Parameters

| Parameter           | Type                | Required/Optional | Description                                    |
| ------------------- | ------------------- | ----------------- | ---------------------------------------------- |
| emitterSubscription | EmitterSubscription | required          | Subscription returned when adding the listener |

**Returns**: void

**Usage**:

```typescript
HydraNativeEventEmitter.getInstance().removeListener(
  inboxUpdatedSubscription
);
```

***

# Managing User Data Structures

## HydraUserDetails

This class stores the user's details.

```typescript
constructor HydraUserDetails(
  customerId: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  phone?: string | null
): HydraUserDetails;
```

### Parameters

| Parameter  | Type   | Required/Optional | Description                                                                                                                                                                                                                                                                 |
| ---------- | ------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customerId | string | required          | customerId can be mobile, email, InTouchUserId, externalId or FCMToken. It depends on how your app is configured on capillary CRM dashboard in `Organisation settings -> Omni Channel Settings -> Channel Configurations -> MAPP_SDK` Look for `Account Linking Identifier` |
| firstName  | string | optional          | First name of the user                                                                                                                                                                                                                                                      |
| lastName   | string | optional          | Last name of the user                                                                                                                                                                                                                                                       |
| email      | string | optional          | Email of the user                                                                                                                                                                                                                                                           |
| phone      | string | optional          | Phone number of the user                                                                                                                                                                                                                                                    |

**Usage**:

```typescript
const userDetails = new HydraUserDetails(
  '8888888888',
  'FirstName',
  'LastName',
  'hydra.test@capillarytech.com',
  '918888888888',
);
```

***

## HydraGeoConfig

This class stores the geo config details of a user.

```typescript
constructor HydraGeoConfig(
  city: string,
  country: string,
  countryCode: string,
  timezone?: string | null
): HydraGeoConfig;
```

### Parameters

| Parameter   | Type   | Required/Optional | Description                    |
| ----------- | ------ | ----------------- | ------------------------------ |
| city        | string | required          | City of the user               |
| country     | string | required          | Country of the user            |
| countryCode | string | required          | Country code for mobile number |
| timezone    | string | optional          | User's timezone                |

**Usage**:

```typescript
const geoConfig = new HydraGeoConfig(
  'Bangalore',
  'India',
  'IN',
  'Asia/Kolkata'
);
```

***

## HydraPushPreferences

This class stores the push preference details of a user.

```typescript
constructor HydraPushPreferences(
  promPushOpted: boolean,
  transPushOpted: boolean
): HydraPushPreferences;
```

### Parameters

| Parameter      | Type    | Required/Optional | Description                                     |
| -------------- | ------- | ----------------- | ----------------------------------------------- |
| promPushOpted  | boolean | required          | Enable/disable promotional push notifications   |
| transPushOpted | boolean | required          | Enable/disable transactional push notifications |

**Usage**:

```typescript
const pushPreferences = new HydraPushPreferences(
  true,
  true
);
```

***

## HydraLogLevel

This enumeration defines the constants used to set the console and remote log levels in hydra configuration. The higher level includes all the levels below.

```typescript
enum HydraLogLevel {
  off = 0,
  error = 1,
  warn = 2,
  info = 3,
  debug = 4,
  verbose = 5,
}
```

This enumeration defines the constants used to set the console and remote log levels in hydra configuration. The higher level includes all the levels below that.

***

## HydraAccountConfig

This is a model class used to update user’s account configurations.

```typescript
constructor HydraAccountConfig(accountId: string, baseUrl: string,
sslPublicKey: string, remoteDebugLevel: HydraLogLevel = HydraLogLevel.off
 ): HydraAccountConfig;
```

### Parameters

| Parameter        | Type   | Required/Optional | Description                                     |
| ---------------- | ------ | ----------------- | ----------------------------------------------- |
| accountId        | string | required          | Account id of the hydra account config          |
| baseUrl          | string | required          | Enable/disable transactional push notifications |
| sslPublicKey     | string | required          | sslPublicKey of the hydra account config        |
| remoteDebugLevel | string | required          | remoteDebugLevel of the hydra account config    |

**Usage**:

```typescript
const HydraAccountConfig = new HydraAccountConfig(
     accountId,
     baseUrl,
     sslPublicKey,
     remoteDebugLevel
   );
```

***

## HydraFirebaseRemoteConfigKeys

This is a model class used to update a user's remote account configurations.

```typescript
constructor HydraFirebaseRemoteConfigKeys(keyForAccountId: string, keyForBaseUrl: string, keyForSsl: string, keyForRemoteDebugLevel: string ) : HydraFirebaseRemoteConfigKeys;
```

### Parameters

| Parameter              | Type   | Required/Optional | Description                                                    |
| ---------------------- | ------ | ----------------- | -------------------------------------------------------------- |
| keyForAccountId        | string | required          | Firebase config Key for your applicable hydra AccountId        |
| keyForBaseUrl          | string | required          | Firebase config Key for your applicable hydra BaseUrl          |
| KeyForSsl              | string | required          | Firebase config Key for your applicable hydra SSL              |
| keyForRemoteDebugLevel | string | required          | Firebase config Key for your applicable hydra RemoteDebugLevel |

**Usage**:

```typescript
const remoteConfigKeys = new HydraFirebaseRemoteConfigKeys(
     'ind_hydra_account_id',
     'ind_hydra_base_url',
     'ind_hydra_ssl_key',
     'ind_hydra_remote_debug_level'
    );
```

***

# Managing Notification Data Structures

## HydraNotification Structure

This class stores the structure for a notification.

```typescript
class HydraNotification {
  readonly cuid: string | null;
  readonly scope: string | null;
  readonly campaignId: string | null;
  readonly variationId: string | null;
  readonly senderId: string | null;
  readonly senderSource: string | null;
  readonly custom: string | null;
  readonly customData: Record<string, any> | null;
  readonly priority: string | null;
  readonly validity: string | null;
  readonly messageId: string | null;
  readonly gateway: HydraNotificationGateway | null;
  readonly body: HydraNotificationBody | null;
  readonly expandableDetails: HydraNotificationExpandedDetails | null;
  readonly isRead: boolean | null;
  readonly imageIdentifier: string | null;
  readonly accountId: string | null;
  readonly channelId: string | null;
  readonly payload: string | null;
  readonly createdAt: Date | null;
  readonly isExpanded: boolean | null;
  readonly isMessageEllipsized: boolean | null;
  readonly isTitleEllipsized: boolean | null;
  readonly showArrow: boolean | null;
}
```

## HydraNotificationBody

This class stores the body for a notification.

```typescript
class HydraNotificationBody {
  readonly title: string | null;
  readonly message: string | null;
  readonly cta: HydraNotificationCta | null;
  readonly image: string | null;
}
```

## HydraNotificationCta

This class stores the call to action (CTA) for a notification.

```typescript
class HydraNotificationCta {
  readonly type: HydraNotificationCtaType | null;
  readonly action: string | null;
  readonly actionText: string | null;
}
```

## HydraNotificationCtaType Enum

This class stores the call to action (CTA) type for a notification.

```typescript
enum HydraNotificationCtaType {
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

```typescript
class HydraNotificationExpandedDetails {
  readonly ctas: HydraNotificationCta[] | null;
  readonly message: string | null;
  readonly image: string | null;
  readonly style: string | null;
}
```

## HydraNotificationGateway Enum

This class stores the gateway details for a notification.

```typescript
enum HydraNotificationGateway {
  fcm,
  xiaomi,
  unknown,
}
```