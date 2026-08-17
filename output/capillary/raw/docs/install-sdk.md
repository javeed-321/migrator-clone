---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Install SDK

This guide provides information on how to integrate your mobile apps with Capillary's iOS SDK.

> 🚧 The HydraSDK repository is private.
>
> * To access  [hydra-sdk-ios-packages](https://github.com/Capillary/hydra-sdk-ios-packages) repository, you must either have valid GitHub credentials with access to the repository or you can use your GitHub username and provide a Personal Access Token.
> * If you have a valid GitHub credentials with access to the [hydra-sdk-ios-packages](https://github.com/Capillary/hydra-sdk-ios-packages) repository, you need to add them to the Xcode accounts section to integrate the SDK. Follow [these](https://medium.com/nerd-for-tech/how-to-connect-github-and-xcode-499134c62eac) steps to complete the process.

# Prerequisites

**Access to HydraSDK Repository:**\
Valid GitHub credentials with access to the hydra-sdk-ios-packages repository.
OR
GitHub username and a personal access token with access to the repository.

* Using Valid GitHub Credentials:\
  If you are using GitHub credentials, add your GitHub credentials to the Xcode Accounts section. FOr more information, refer to this [documentation](https://medium.com/nerd-for-tech/how-to-connect-github-and-xcode-499134c62eac).
* Using GitHub Username and Personal Access Token:\
  If you are using GitHub username and personal access token, modify the package URL in Swift Package Manager:
  `https://Username:[PERSONAL_ACCESS_TOKEN@github.com](mailto:PERSONAL_ACCESS_TOKEN@github.com)/Capillary/hydra-sdk-ios-packages.git`

You can install the SDK using Swift Package Manager (SPM) or Xcode.

# Installing SDK using Swift Package Manager directly

SPM is a tool that helps to manage the distribution of Swift code. For more information, refer to [Swift.org](https://www.swift.org/package-manager/).

To install the Capillary iOS SDK using SPM, define the package and dependencies in the SPM's configuration file. Use the below snippet:

```swift
import PackageDescription
let package = Package(
  name: “<Project-name>”,
  dependencies: [
    .package(url:"https://github.com/Capillary/hydra-sdk-ios-packages",upToNextMajor(from: "1.1.0"))
  ]
)

```

This makes sure that the SPM fetches the Capillary iOS SDK from the specified repository and includes it as a dependency in your project.

# Installing SDK Using Xcode

You can also use Xcode and define the dependencies in SPM. To install the SDK using Xcode, perform the following:

> 📘 Prerequisites:
>
> * Xcode 14 or later
> * Valid iOS project to integrate Hydra packages
> * Internet connectivity

To install the SDK using Xcode, perform the following:

1. Open the iOS project in Xcode.

<Image align="center" className="border" border={true} width="65% " src="https://files.readme.io/6a06ec0-Open_Xcode.png" />

2. On the **File** menu, select **Add Packages**.

<Image align="center" className="border" border={true} width="65% " src="https://files.readme.io/20bcba9-Add_package.png" />

3. In the search field, enter the URL`<https://github.com/Capillary/hydra-sdk-ios-packages>` or `https://Username:PERSONAL_ACCESS_TOKEN@github.com/Capillary/hydra-sdk-ios-packages.git`.You can also select the package from the list of recently added packages.

<Image align="center" className="border" border={true} width="75% " src="https://files.readme.io/7a9c41e-Search_package.png" />

4. From the **Dependency Rule**, select the version or branch of the package you want to use. To select the latest version of the package automatically, leave the version field blank.\
   Xcode fetches the package’s manifest file and displays its dependencies. Review these dependencies and make sure that they do not conflict with your project’s dependencies.
5. From the **Add to project** combo box, select the appropriate project.
6. Click **Add Package** .\
   A package selection box appears. Select the desired frameworks and click **Add package**.
   Xcode will automatically update your project’s dependencies and generate an Xcode project file for the package.

<Image align="center" className="border" border={true} width="75% " src="https://files.readme.io/ca0fa44-Select_framework.png" />

7. Add the import statement at the top of the file where you want to use the package’s functionality and import the package to your project.

<Image align="center" className="border" border={true} width="75% " src="https://files.readme.io/da1762e-Import_package_to_your_work.png" />

# Installing SDK Using CocoaPods

To install the SDK using CocoaPods, follow these steps:

1. Update your PodfileAdd by adding the following to your podfile, replacing placeholders if using a PAT.

   ```ruby
   # Uncomment the next line to define a global platform for your project
   platform :ios, '13.0'
   use_frameworks!

   target 'YourAppTargetName' do

   # If using PAT, uncomment and define the private_repo URL
   private_repo =
       'https://<YOUR_GITHUB_USERNAME>:<YOUR_PERSONAL_ACCESS_TOKEN>@github.com/Capillary/hydra-sdk-ios-packages.git'

   # Define source for private repo if needed (adjust based on your setup)
   source 'https://github.com/Capillary/hydra-sdk-ios-packages.git' # Or use the private_repo variable

   # Add required Hydra pods
   Ensure you are using the correct source or git URL
   pod 'HydraCore', :git => private_repo
   pod 'HydraPushNotification', :git => private_repo
   pod 'HydraPushNotificationServiceExtension', :git => private_repo
   pod 'HydraInAppMessage', :git => private_repo
   pod 'HydraInboxCore', :git => private_repo
   pod 'HydraInboxUI', :git => private_repo

   # Other pods...
   end

   # If using a PAT and have a Notification Service Extension target:
   target 'YourNotificationServiceExtensionTargetName' do
   # Use the same private_repo variable if defined above
   pod 'HydraPushNotificationServiceExtension', :git => private_repo
   end
   ```

> 📘 Note:
>
> The git approach requires specifying the URL for each pod. Alternatively, if you have set up a private Spec Repo for your organization, you might use the source directive and standard pod names.

2. Install Pods in your project directory. To install, run one of the following:
3. ```shell
   pod install
   ```
   ```shell
   pod install --repo-update
   ```
4. Open the workspace and use the .`xcworkspace` file generated by CocoaPods.