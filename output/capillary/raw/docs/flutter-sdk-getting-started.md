---
updatedAt: 2026-08-14T05:51:12.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Getting Started

Flutter is an open-source UI software development framework by Google. You can use Flutter to develop cross platform applications from a single codebase.

# Prerequisites

Before you start the integration, ensure you have the following prerequisites met:

* [ ] Register your application with the Capillary apps team by providing the following:

  * `Bundle Id` for your iOS app
  * `ApplicationId` for your Android app
  * App signature (SHA256) from your Android app signing report\
    After registering with the Capillary apps team, you will be provided the Account ID, base URL (End point), and SSL public key.

* [ ] Obtain access to the necessary GitHub repositories. You need access to the following repositories:

  * [flutter-hydra-lib](https://github.com/Capillary/flutter-hydra-lib)
  * [hydra-sdk-ios-packages](https://github.com/Capillary/hydra-sdk-ios-packages)
  * [hydra-sdk-android-maven](https://github.com/Capillary/hydra-sdk-android-maven)\ <br />

  **If you have a registered Capillary email address:**

  * Raise a JIRA ticket to the ACM team for access to the required GitHub repositories. After gaining access, generate a GitHub Personal Access Token (PAT) with access to all three repositories.
  * Rename `hydra_github_cred.env.template` to `hydra_github_cred.env` and provide the username and PAT as `HYDRA_GITHUB_USER_NAME` and `HYDRA_GITHUB_PAT` respectively.
    > 📘 Note
    >
    > Do not add any space after the equal (=) sign and do not add any quotes or double quotes.

  **If you do not have a registered Capillary email address:**

  * The team will provide you with a username and a Personal Access Token (PAT) file named `hydra_github_cred.env`. Save this file to be used later in this integration.
    > 📘 Note
    >
    > The PAT has an expiry date that can be a month or two. Before these credentials expire, our team will provide you with new files. You will need to re-run the setup script once you get the new credentials.

* [ ] Clone the main branch of the [flutter-hydra-lib.git](https://github.com/Capillary/flutter-hydra-lib.git) repository. Ensure you obtain the following files from the cloned repository:
  * setup\_local.sh
  * setup\_cicd.sh
  * hydra-config.json.template
  * hydra\_github\_cred.env.template

* [ ] *(Optional)* Clone the `hydra-lib-example` branch of the [flutter-hydra-lib.git](https://github.com/Capillary/flutter-hydra-lib.git) repository to access the example app. You can use this as a reference while integrating the plugin in your project.

* [ ] Get the Account ID, base URL (End point),  SSL public key and Remote log level from Firebase Remote Configuration.\
  For this, you will need to add four parameters in the Firebase console. The names of these parameters must be:

  * hydra\_account\_id
  * hydra\_base\_url
  * hydra\_ssl\_public\_key
  * hydra\_remote\_log\_level\
    If you prefer to use a different CMS tool, you have the option to pass these values to the Hydra SDK after you fetch them from your chosen CMS
  * Experience+ gamification support is not yet released for Flutter. See [Configure Gamification](https://docs.capillarytech.com/docs/gamification-flutter) (currently hidden) for the planned configuration keys, which will be added here once the feature ships.

  To configure push notifications, ensure the following prerequisites are met:

* [ ] Register your application on Firebase. To register, refer to this [guide](https://support.google.com/appsheet/answer/10104995?hl=en).

* [ ] Download the `google-services.json` file for Android and the `GoogleService-Info.plist` file for iOS from your Firebase project. Do not make any code changes suggested by Firebase at this stage.