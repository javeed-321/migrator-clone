---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Install React Native SDK

# Prerequisites

Before you begin setting up the React Native SDK for Android and iOS, ensure the following prerequisites are met. The files mentioned for the prerequisites are available in the [react-native-hydra-lib.git](https://github.com/Capillary/react-native-hydra-lib.git) repository.

## 1. Rename the template files:

* Rename `.env.template` to `.env`.
* Rename .`npmrc.template` to `.npmrc`.
* Rename `.yarnrc.yml.template` to `.yarnrc.yml`.

Place these renamed files in the root folder of your project.

## 2. Configure the`.env` file:

The .env file requires three properties for your GitHub username and Personal Access Tokens (PATs) for Android and iOS. Ensure the key names match those in .env.template and set their respective values:

```
HYDRA_GITHUB_USER_NAME=<YOUR_GITHUB_USERNAME>
HYDRA_ANDROID_GITHUB_PAT=<YOUR_ANDROID_GITHUB_TOKEN>
HYDRA_IOS_GITHUB_PAT=<YOUR_IOS_GITHUB_TOKEN>
```

Alternatively, you can set these three variables in your shell environment (e.g., bash or zsh) using the export commands:

```shell Bash
export HYDRA_GITHUB_USER_NAME=<YOUR_GITHUB_USERNAME>
export HYDRA_ANDROID_GITHUB_PAT=<YOUR_ANDROID_GITHUB_TOKEN>
export HYDRA_IOS_GITHUB_PAT=<YOUR_IOS_GITHUB_TOKEN>
```

Save these commands in your shell's configuration file as a `.zshrc` or equivalent extension.

## 3. Configure the`.npmrc` file:

Make the following changes to your `.npmrc` file:

```
//npm.pkg.github.com/:_authToken=<YOUR_RN_GITHUB_TOKEN>
@capillary:registry=https://npm.pkg.github.com

Replace <YOUR_RN_GITHUB_TOKEN> with your React Native GitHub PAT.
```

## 4. Configure the`.yarnrc.yml` file:

If you are using Yarn, the .yarnrc.yml file also requires the GitHub PAT.

> 📘 Note
>
> The older Yarn versions use `.npmrc`, while newer versions use `.yarnrc.yml`.

Add the following scope to the file, if it's not already present:

```yaml
npmScopes:
    {
    capillary:
        {
        npmRegistryServer: 'https://npm.pkg.github.com',
        npmAuthToken: '<YOUR_RN_GITHUB_TOKEN>',
        },
    }
//Replace <YOUR_RN_GITHUB_TOKEN> with your React Native GitHub PAT.
```

## 5. Add package dependency

Add the package dependency to your `package.json` file:

* For npm:
* ```shell
  npm install @capillary/react-native-hydra-lib
  ```
* For Yarn:
  ```shell
  yarn add @capillary/react-native-hydra-lib
  ```

# Platform Specific Setup

Once you have set up the React Native SDK, you can install the platform-specific SDKs (Android and iOS).

## Installing iOS SDK

To install React Native for iOS, follow these steps:

1. In **ios/Podfile**, make the following changes:

   1. Add the following lines just below the `require` block for React Native:

      ```ruby
      require Pod::Executable.execute_command('node', ['-p',
        'require.resolve(
          "@capillary/react-native-hydra-lib/scripts/HydraPods.rb",
          {paths: [process.argv[1]]},
        )', __dir__]).strip
      ```
   2. Add the following lines just below the `config = use_native_modules!`, in your main target:

      ```ruby
      hydra_pods
      ```
2. Go to the terminal, navigate to the **ios** folder of your project, and run `pod install`.
3. Add `GoogleServices-Info.plist` to your iOS project using Xcode.
4. Copy `HydraConfig.plist` from the template folder of the cloned main branch.  Then, add it to your iOS project using Xcode. You can also change the values in the .plist file as needed.
5. Configure the initialiser for your Content Management System (CMS) tool. In your `AppDelegate.mm`, you need to initialise the Hydra SDK.

   1. For Firebase Remote configuration:

      1. Add the import statement at the top of your file:

         ```objectivec
         #import <react-native-hydra-lib/HydraNativeInitializer.h>
         ```
         ```swift
         import react_native_hydra_lib
         ```
      2. Navigate to the following functions:
         ```objectivec
         - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
         ```
         ```swift
         func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool
         ```
      3. Replace the following `return` statements:

         ```objectivec
         return [super application:application didFinishLaunchingWithOptions:launchOptions];

         // Replace the above with:

         BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
         [[HydraNativeInitializer sharedInstance] initApplicationUsingFirebaseRemoteConfig:application 
                                                             didFinishLaunchingWithOptions:launchOptions];

         return result;
         ```
         ```swift
         return super.application(application, didFinishLaunchingWithOptions: launchOptions)

         // Replace the above with:

         let result = super.application(application, didFinishLaunchingWithOptions: launchOptions)
         HydraNativeInitializer.sharedInstance().initApplication(
             usingFirebaseRemoteConfig: application,
             didFinishLaunchingWithOptions: launchOptions
         )

         return result
         ```
   2. For other CMS tools:

      1. Add the import statement at the top of your file:
         ```objectivec
         #import <react-native-hydra-lib/HydraNativeInitializer.h>
         #import <react-native-hydra-lib/HydraNativeRemoteConfig.h>
         ```
         ```swift
         import react_native_hydra_lib
         ```
      2. Navigate to the following functions:
         ```objectivec
         - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
         ```
         ```swift
         func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool
         ```
      3. Replace the following `return` statements:

         ```objectivec
         return [super application:application didFinishLaunchingWithOptions:launchOptions];

         //Replace the above with:
         BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
         HydraNativeRemoteConfig *remoteConfig = [[HydraNativeRemoteConfig alloc]
                                                   initWithAccountId:@"<YOUR_ACCOUNT_ID>"
                                                   baseUrl:@"<YOUR_BASE_URL>"
                                                   sslPublicKey:@"<YOUR_SSL_PUBLIC_KEY>"
                                                   remoteLogLevel:0];
         [[HydraNativeInitializer sharedInstance] initApplication:application didFinishLaunchingWithOptions:launchOptions withHydraRemoteConfig:remoteConfig];
         return result;
         ```
         ```swift
         return super.application(application, didFinishLaunchingWithOptions: launchOptions)

         //Replace the above with:
         let result = super.application(application, didFinishLaunchingWithOptions: launchOptions)
         let remoteConfig = HydraNativeRemoteConfig(accountId: "<YOUR_ACCOUNT_ID>", baseUrl: "<YOUR_END_POINT>", sslPublicKey: "<YOUR_SSL_KEY>", remoteLogLevel: 0)
         HydraNativeInitializer.sharedInstance().initApplication(application, didFinishLaunchingWithOptions: launchOptions, withHydraRemoteConfig: remoteConfig)
         return result
         ```

> 📘 Note
>
> If you use a version of Xcode earlier than 16, you might encounter import issues in iOS Objective-C classes for this package. To fix the issue you can try either of the following:
>
> * Upgrade Xcode to the latest version (for example, 16.2).
> * Change the import statements and create a patch for this package.

## Installing Android SDK

To install React Native for Android, follow these steps:

1. In `android/app/build.gradle`, add the following lines at the bottom of the file:
   ```
   apply from: file("../../node_modules/@capillary/react-native-hydra-lib/scripts/hydra_github_setup.gradle")
   ```
2. Add `google-services.json` to the android/app folder.
3. Copy `hydra-config.json` from the template folder of the cloned main branch. Paste it into the `android/app/src/main/assets` folder. You can also change the values in the .json file as needed.
4. In your `MainApplication` file, you need to initialise the Hydra SDK. Add the following import statements at the top of your file:
   ```kotlin
   import com.hydralib.nativeapis.HydraInitializer
   import com.hydralib.nativeapis.HydraRemoteConfig
   ```
   ```java
   import com.hydralib.nativeapis.HydraInitializer;
   import com.hydralib.nativeapis.HydraRemoteConfig;
   ```
5. Configure the initialiser for your Content Management System (CMS) tool.

   1. For Firebase Remote configuration:\
      Use the following methods to get the Account ID, SSL Public Key, Base URL, and Remote Log Level from Firebase Remote Config. Add the following code to the `onCreate` function, immediately after the default React Native generated code:
      ```kotlin
      HydraInitializer.initializeUsingFirebaseRemoteConfig(this)
      ```
      ```java
      HydraInitializer.initializeUsingFirebaseRemoteConfig(this);
      ```
   2. For other CMS tools:\
      Use the following methods to get the Account ID, SSL Public Key, Base URL, and Remote Log Level from your CMS. Add the following code to the `onCreate` function, immediately after the default React Native generated code:

      ```kotlin
      val accountId = "your_account_id"
      val baseURL = "your_base_url"
      val sslPublicKey = "your_ssl_public_key"
      val remoteDebugLevel = 0 // For example, 0 for no logs, adjust as needed

      HydraRemoteConfig.Builder(
          accountId, baseURL, sslPublicKey, remoteDebugLevel
      ).build().let { remoteConfig ->
          HydraInitializer.initialize(this, remoteConfig)
      }
      ```
      ```java
      String accountId = "your_account_id";
      String baseURL = "your_base_url";
      String sslPublicKey = "your_ssl_public_key";
      int remoteDebugLevel = 0; // For example, 0 for no logs, adjust as needed

      HydraRemoteConfig remoteConfig = new HydraRemoteConfig.Builder(accountId, baseURL, sslPublicKey, remoteDebugLevel)
              .build();

      HydraInitializer.initialize(this, remoteConfig);
      ```

## Initialising React Native

Before you can use APIs from the `react-native-hydra-lib` package, ensure the Hydra SDK is initialised successfully.

To initialise Hydra SDK for React Native, register for the SDK initialisation event to get the callback when the SDK's initialisation succeeds or fails. Use the [Get callback for Hydra SDK initialisation result API](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#get-callback-for-hydra-sdk-initialization-result) to register.