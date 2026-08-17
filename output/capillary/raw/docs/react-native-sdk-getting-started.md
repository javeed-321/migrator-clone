---
updatedAt: 2026-08-14T05:51:12.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Getting Started

To use the Capillary Engagement platform on a React Native application, you need to set up the React Native Wrapper using the Native Hydra Android and iOS SDKs.

# Prerequisites

Before you start the integration, ensure you have the following prerequisites met:

* [ ] Register your application with the Capillary apps team by providing the following:
  * `Bundle Id` for your iOS app
  * `ApplicationId` for your Android app
  * App signature (SHA256) from your Android app signing report\
    After registering with the Capillary apps team, you will be provided the Account ID, base URL (endpoint), and SSL public key.

* [ ] Obtain access to the necessary GitHub repositories. You need access to the following repositories:
  * [react-native-hydra-lib](https://github.com/Capillary/react-native-hydra-lib)
  * [hydra-sdk-ios-packages](https://github.com/Capillary/hydra-sdk-ios-packages)
  * [hydra-sdk-android-maven](https://github.com/Capillary/hydra-sdk-android-maven)

    **If you have a registered Capillary email address:**
  * Raise a JIRA ticket to the ACM team for access to the required GitHub repositories. After gaining access, generate a PAT and save it, along with your GitHub username, for later use in this setup.
  * You can use a single token to access all three packages: React Native (RN), Android, and iOS.

    **If you do not have a registered Capillary email address:**
  * The team will provide you with a GitHub username and two tokens —one for iOS and one for Android. These tokens are required when setting up React Native.

* [ ] Clone the main branch of the [react-native-hydra-lib](https://github.com/Capillary/react-native-hydra-lib)  repository. Obtain the following files from the cloned repository:
  * template/.env.template

  * template/.npmrc.template

  * template/.yarnrc.yml.template

  * template/HydraConfig.plist

  * template/hydra-config.json

* [ ] To configure push notifications, ensure the following prerequisites are met:
  * Register your application on Firebase. To register, refer to this [guide](https://support.google.com/appsheet/answer/10104995?hl=en).
  * Download the `google-services.json` file for Android and the `GoogleService-Info.plist` file for iOS from your Firebase project. Do not make any code changes suggested by Firebase at this stage.

* [ ] Get the Account ID, base URL (End point), SSL public key and Remote log level from the remote configuration tool (CMS tool).

  * **Using Firebase Remote Config:** Initialisers for iOS and Android are provided to fetch these parameters from the Firebase Remote Config. If you choose this method, add the following four parameters in the Firebase console:
    * hydra\_account\_id
    * hydra\_base\_url
    * hydra\_ssl\_public\_key
    * hydra\_remote\_log\_level

  > 📘 Note
  >
  > If you use a multi-Hydra account setup, set the most common default values in the keys above. For the remaining Hydra accounts, define new keys. If you have three Hydra accounts for the India, USA, and Europe regions, you can set up one of these key pairs in the default keys. For the other two regions, create a similar set of four keys on Firebase remote config.
  >
  > For example, to set up keys for India, you might define the following:\
  > `ind_hydra_account_id`
  > `ind_hydra_base_url`
  > `ind_hydra_ssl_public_key`
  > `ind_hydra_remote_log_level`
  >
  > You will need to provide these values when you want to [configure a custom Hydra account](https://docs.capillarytech.com/docs/react-native-sdk-api-reference#configure-hydra-account-settings).

  * **Using other CMS tools:** If you prefer a different CMS tool, you must use alternative initialisers in iOS and Android. Refer to the Setup for iOS and Setup for Android documentation for details on initialisers.
  * To use Experience+ gamification campaigns and views, add three more keys: `hydra_gamification_key`, `hydra_gamification_region`, and `hydra_gamification_base_url` (optional). See [Configure Gamification](https://docs.capillarytech.com/docs/gamification-react-native).

  # Sample app

  Clone the examples demonstrating how to use the package in projects with different React Native versions and architectures from the following branches of the [react-native-hydra-lib](https://github.com/Capillary/react-native-hydra-lib)  repository:

  * example\_rn72\_new\_arch
  * example\_rn72\_old\_arch
  * example\_rn74\_old\_arch
  * example\_rn75\_old\_arch
  * example\_rn76\_new\_arch
  * example\_rn77\_new\_arch