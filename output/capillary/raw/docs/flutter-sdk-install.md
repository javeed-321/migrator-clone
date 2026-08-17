---
updatedAt: 2026-03-26T06:57:38.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Install Flutter SDK

# Prerequisites

Before you begin setting up the Flutter SDK for Android and iOS, ensure the following prerequisites are met. The files mentioned for the prerequisites are available in the  [flutter-hydra-lib.git](https://github.com/Capillary/flutter-hydra-lib.git) repository.

## 1. Configure continuous integration and continuous delivery (CI/CD)

To set up CI/CD, follow these steps:

1. Set the environment variables listed in `hydra_github_cred.env`. Ensure the variable names and values match exactly what is in the file.
2. After setting the environment variables, run the `setup_cicd.sh` script.

## 2. Configure the developer system

Use the `setup_local.sh` script to set up your system. To set up the environment, follow these steps:

1. Place the `hydra_github_cred.env` and `setup_local.sh` files in the same folder.
2. Open Terminal and change the current working directory to that folder.
3. Run the following command:
   ```shell
   ./setup_local.sh
   ```
4. After the script finishes, restart your terminal. If you are using VS Code or Android Studio, restart the editor.

# Installing Flutter SDK

You need to add two dependencies to your `pubspec.yaml` file. The `ref` parameter specifies a particular version of the dependency. When specifying the version number, ensure you prefix it with "v". No explicit SDK initialisation is required. The SDK auto-initialises using the configuration files. On initialisation success or failure, the SDK triggers a callback which you can listen to. For more information on the listener, refer to the [Flutter setup summary documentation](https://docs.capillarytech.com/docs/flutter-setup-summary#/).

Add the following dependencies to your `pubspec.yaml`:

```yaml
capillary_hydra:
 git:
   url: https://github.com/Capillary/flutter-hydra-lib.git
   ref: v1.0.5
   path: capillary_hydra


capillary_hydra_platform_interface:
 git:
   url: https://github.com/Capillary/flutter-hydra-lib.git
   ref: v1.0.5
   path: capillary_hydra_platform_interface
```

To add a configuration file as an asset in your project, follow these steps:

1. Create a folder named `capillary` in the root directory of your Flutter project.
2. Rename the `hydra-config.json` template file to `hydra-config.json` and move the file to the `capillary` folder.
3. Optionally, change the values in the `hydra-config.json` file as required for your project.
4. In your `pubspec.yaml`, add the capillary folder to the assets section as shown below:
   ```yaml
   assets:
     - capillary/
   ```
5. Get the dependencies by running this command in your terminal:
   ```shell
   flutter pub get
   ```
6. Invoke initialiser for Hydra plugin in main function before `runApp` using the following:
   ```Text Dart
   WidgetsFlutterBinding.ensureInitialized();
   HydraInitializer.initialize();
   ```

# Platform Specific Setup

Once you have installed the Flutter SDK, you can install the platform-specific SDKs (Android and iOS).

## Installing Android SDK

To configure Android for Flutter, follow these steps:

1. Add GitHub Maven credentials to your project's build file.
   1. If your app uses `android/build.gradle.kts` (Kotlin), add the following block to the `allprojects` > `repositories` section:
      ```kotlin
      allprojects {
          repositories {
              // ... other repositories
              maven {
                  url = uri("https://maven.pkg.github.com/Capillary/hydra-sdk-android-maven")
                  credentials {
                      username = System.getenv("HYDRA_GITHUB_USER_NAME")
                      password = System.getenv("HYDRA_GITHUB_PAT")
                  }
              }
          }
      }
      ```
   2. If your app uses `android/build.gradle` (Groovy), add the following block to the `allprojects` > `repositories` section:
      ```groovy
      allprojects {
          repositories {
              // ... other repositories
              maven {
                  url "https://maven.pkg.github.com/Capillary/hydra-sdk-android-maven"
                  credentials {
                      username System.getenv("HYDRA_GITHUB_USER_NAME")
                      password System.getenv("HYDRA_GITHUB_PAT")
                  }
              }
          }
      }
      ```

2. Update the Application class name in your `android/app/src/main/AndroidManifest.xml`. By default, Flutter apps do not use a custom Application class in Android, but the SDK requires one for initialization. Find the `<application>` tag and set its android:name attribute to "com.capillary.plugins.hydra.HydraApplication" as shown in this example:
   ```xml
   <application
       android:name="com.capillary.plugins.hydra.HydraApplication"
       ...>
   </application>
   ```
   > 📘 Note
   >
   > If you are using your own Application class or plan to use another CMS, follow the steps in the [Advanced Android setup](https://docs.capillarytech.com/docs/flutter-sdk-advanced-setup#advanced-android-setup) documentation instead of this step.

3. Set an `AppCompat` theme for your application in your `AndroidManifest.xml`. The SDK requires that your application theme is set to an AppCompat theme. If your app's theme is not already set to an `AppCompat` theme, add or update the `android:theme` attribute within the `<application>` tag as shown in this example:
   ```xml
   <application
       android:theme="@style/Theme.AppCompat.DayNight.NoActionBar"
   >
   </application>
   ```

## Installing iOS SDK

If Swift Package Manager is already enabled in your project, you can skip the first two steps below and proceed to the remaining steps. Otherwise, follow all steps

To setup for iOS, follow these steps:

1. Add the following to the top of the iOS/Podfile:
   ```ruby
   require_relative './.symlinks/plugins/capillary_hydra_ios/script/HydraPods.rb'
   ```
2. Add the following in the `target 'Runner'` section of the iOS/Podfile:

   ```ruby
   target 'Runner' do
     use_frameworks!

     hydra_pods # Add this line

     flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))
     target 'RunnerTests' do
       inherit! :search_paths
     end
   end
   ```
3. Open your terminal, change the current working directory to the iOS folder of your project, and run the following command:
   ```shell
   pod install
   ```

If you are using another CMS, follow the steps in the [Advanced iOS Setup](https://docs.capillarytech.com/docs/flutter-sdk-advanced-setup#advanced-ios-setup) documentation instead.

<br />

# Initialising Flutter SDK

Before you can use APIs from the `flutter-hydra-lib` package, ensure the Hydra SDK is initialised successfully.

To initialise Hydra SDK for Flutter set up a [HydraNativeEventHandler](https://docs.capillarytech.com/docs/flutter-sdk-api-reference#hydranativeeventhandler-class)  and add it using the following code:

```Text Dart
HydraNativeEvents.addEventHandler(handler);
```