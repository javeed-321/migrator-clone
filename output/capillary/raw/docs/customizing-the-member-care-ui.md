---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customising the Member Care UI

# Overview

A brand may need to customise Member Care to fit their specific requirements. Vulcan enables the building of UI customisations and enable these apps as Member Care overrides specific to the organization.

Customising the UI allows brands to see their version instead of the standard Capillary application.

# Prerequisites

To get started ensure that you have the following prerequisites:

* [ ] [VULCAN SUPERADMIN](https://docs.capillarytech.com/reference/vulcan-getting-started#access-roles) access
* [ ] Node.js 14.21.3 (preferrably using [nvm](https://dev.to/csituma/install-nvm-on-mac-windows-and-linux-1aj9)).\
  You can install the specific node.js version using the following command:
  ```
  nvm install 14.21.3
  ```
* [ ] Member Care UI replica [template](https://github.com/Capillary/cap-member-care-vulcan-replica) . For access, raise a JIRA request to the Capillary UI team.
* [ ] Pre-built Vulcan application
* [ ] Application configuration file

The following procedure outlines how to set up the Vulcan application and create a Member Care UI replica :

1. ### [Set up the Vulcan application](https://docs.capillarytech.com/reference/vulcan-getting-started#application-setup).
   1. Access the Vulcan UI.
   2. Create the application on Vulcan UI.
   3. Enter the [basic details ](https://docs.capillarytech.com/reference/vulcan-getting-started#basic-details)and [internationalization details ](https://docs.capillarytech.com/reference/vulcan-getting-started#internationalization-details)(if required) for the application.\ <br />
      > ❗️ Important:
      >
      > For customised member care overrides, create your app name in the given format:\
      > `member-care-ui-<orgID>`.
      >
      > Example:\
      > If your Organization ID is "1231", the application name should be in the following format:\
      > `member-care-ui-1231`
2. ### Download the App Configuration

   1. Navigate to the Vulcan UI and click the three dots under **Actions**.
   2. Click **Download Configuration** to download the `app-config.js` file.

   <Image align="center" className="border" border={true} src="https://files.readme.io/79272db-image.png" />

   <br />

   3. Move the downloaded file to the downloaded template repository folder.

      <Image align="left" className="border" width="40% " border={true} src="https://files.readme.io/f9c1d6f0f10c3aa48130ceba4104b8557ca66c9e0ea9d25df28945d0a8abd046-image.png" />
3. ### [Initialize the project on the local machine](https://docs.capillarytech.com/reference/vulcan-getting-started#local-project-initialization).
   1. Run [`create-vulcan-app`](https://storage.crm.n.content-cdn.io/create-vulcan-app.sh) on a new terminal.
   2. Provide the required details as prompted by the system.
   3. Open the generated folder on your code editor.\ <br />
4. ### [Begin the React app development using a code editor](https://docs.capillarytech.com/reference/application-development-process).
   1. Run the command following command to update your project's `index.html` and `global-styles.js` files with the app-specific details. This command fetches app info from `app-config` and updates the index files for your React app.
      ```
      npm run init
      ```
   2. Build the application following the React app development process. Use the Member Care UI replica [template](https://github.com/Capillary/cap-member-care-vulcan-replica) as the base code to begin customising.
5. ### [Generate the `build.zip` file](https://docs.capillarytech.com/reference/application-development-process#starting-and-building-your-application).
   1. Navigate to your project directory and open a terminal interface.
   2. Run the following command to build the application for deployment and hosting:
      ```
      npm run build
      ```
   3. Identify the `build.zip` file under your project folder.\ <br />
6. ### [Host your application on the InTouch platform](https://docs.capillarytech.com/reference/application-development-process#hosting-a-vulcan-app).
   1. Access the [Vulcan UI](https://docs.capillarytech.com/docs/getting-started-4#accessing-vulcan-ui) and open the application.
   2. Click **Deployments** and **Upload Build**.
   3. Enter the build description for your application.
   4. Click **Select Zip** and choose the `build.zip` file from your device.
   5. Click **Confirm upload** to upload the build and save changes.
   6. Enable UAT or Prod mode for your build.
   7. Identify the UAT/Prod URL generated and displayed in the Application Details section. This URL can be used for testing or accessing your application.
7. ### Override the Member Care UI

   1. Access the [Vulcan UI](https://docs.capillarytech.com/docs/getting-started-4#accessing-vulcan-ui) and open the application.
   2. Click on **Override with UAT version** or **Override with Prod version** depending on your development stage. The custom Member Care UI is now active.

      <Image align="center" src="https://files.readme.io/7e1271a-image.png" />

      > 📘 Note:
      >
      > If another app is already overriding Member Care for your organization, the following message will appear:
      >
      > <Image align="center" src="https://files.readme.io/55c46cb-image.png" />

# Updating the project

Updates to the Member Care UI replica [template](https://github.com/Capillary/cap-member-care-vulcan-replica)are notified on the Slack group for Vulcan users.

To pull the latest changes to your project, follow these steps:

1. Run the following command on a terminal, in the directory your repository is stored at to add the template to your repo as [remote](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories):
   ```
   git remote add template https://github.com/Capillary/cap-member-care-vulcan-replica
   ```
2. Run the following command to fetch all branches from the remote repository:
   ```
   git fetch --all
   ```
3. Run the following command to merge:
   ```
   git merge template/<branch to merge> --allow-unrelated-histories
   ```

> ❗️ Note:
>
> Carefully resolve conflicts and merge code to ensure proper updating.

# Sharing Member Care Replica Apps Across Organizations

Member Care replica apps can be shared across multiple organisations. Once shared the organisation must enable the Member Care override from the Vulcan UI.

To share a Member Care replica app across multiple organizations, follow these steps:

1. In the Vulcan UI, go to the Vulcan application you want to share.
2. In edit mode, navigate to the basic details section and select the organizations to share to.

   <Image align="center" className="border" width="80% " border={true} src="https://files.readme.io/92e7bab010bfec78a787c6f8995788e5732947c1b5a44b7ca7809ff1f600cf50-image.png" />
3. Select **Update application** to apply the changes. The application is shared in view-only mode with the recipient organisation.
4. Override the Member Care UI with the shared application in the recipient organisation.

> 📘 Note
>
> * Shared Vulcan apps are view-only for recipient organisations and can’t be edited, deleted, or disabled. If Member Care override is enabled, recipient organisations cannot change which organizations have access to the original app.
> * Vulcan applications can be shared with organisations that the user has access to.

# Additional UI Customisations

## Adding a new route in the left navigation menu

The replica template comes preconfigured with the default Member Care navigation options. Using Vulcan, you can customise these options and add custom navigations links.

To enable the collapsible left navigation, ensure that `useLatestLeftNavigation` is set to **false** is set in the `app-config` file on your project.

The `navigation.js` file includes the customisation for the collapsible left navigation bar on Member Care.

<Image align="center" src="https://files.readme.io/f7e5d74-image.png" />

To add a new route in the left navigation menu, follow these steps:

1. Navigate to your project directory and open a terminal interface.
2. Generate a new page using the following command:
   ```
   npm run generate
   ```
3. Choose **pages** as the type of component when prompted.
4. Give an appropriate name for the page when prompted.
5. Follow the remaining setup procedure as prompted by the system.

   <Image align="center" src="https://files.readme.io/8378209-image2.png" />
6. Start the page development by following the [react development process](https://react.dev/learn).
7. Add the following code to the `routes.js` file to test your changes as a page:
   ```
   {
      exact: true,
      path: `/loadWhateverYouWant`,
      type: 'newRoute',
      component: NewPage,
    },
   ```

> 📘 Note:
>
> The details of the fields are as follows:
>
> | Field     | Description                                              |
> | :-------- | :------------------------------------------------------- |
> | path      | The route path URL.                                      |
> | component | Name of the component use during the generation process. |

8. Add the new route to the `navigation.js` file to view it as a left navigation link.

```
 {
    label: 'Your OWN route',
    value: 'newRoute',
    route: '/loadWhateverYouWant',
    icon: '',
    defaultExpanded: false,
    children: [],
},
```

> 📘 Note:
>
> The details of the fields are as follows:
>
> | Field           | Description                                                |
> | :-------------- | :--------------------------------------------------------- |
> | label           | The name of the route path.                                |
> | route           | The route path URL.                                        |
> | icon            | Custom icon that is displayed on the left navigation menu. |
> | defaultExpanded | The default state of the navigation menu.                  |
> | children        | The properties related to child pages of the menu.         |

## Adding a custom link in the left navigation menu

To enable the collapsible left navigation, ensure that `useLatestLeftNavigation` is set to **false** is set in the `app-config` file on your project.

The `navigation.js` file includes the customisation for the collapsible left navigation bar on Member Care.

Add the following to the `navigation.js` file along with the custom URL:

```
{
  label: ( // define custom markup and label for your left nav item here
   <>
     <CapTooltip
       title={
         <FormattedMessage
           {...messages.requestTooltip}
         />
       }
     >
       Google Link
       <CapImage src={OpenInIcon} alt="Open In Icon" />
     </CapTooltip>
   </>
 ),
 value: 'google_customUrlLink', // this value should always be of pattern <sometext>_customUrlLink in order for this feature to work
 route: '', // this will be empty always
 url: 'https://www.google.com/' // specify the custom URL to open on click
}

```

> 📘 Note:
>
> Replace the `url` field with your custom URL.

<Image align="center" src="https://files.readme.io/d78176c-image7.png" />

<br />

## Embed a pre-developed Vulcan application component

You can embed a pre-developed Vulcan application component from the Vulcan platform into another Vulcan application. This allows you to import and add multiple Vulcan application components to a new Vulcan application in development.

To embed a  Vulcan application component onto another Vulcan application, follow these steps:

1. On the Vulcan UI, navigate to the Vulcan application that contains the components to be embedded.
2. [Host and enable UAT or Prod mode](https://docs.capillarytech.com/reference/application-development-process#hosting-a-vulcan-app) for the application if it is not already done.
3. Select the <img src="https://dev.intouch.capillarytech.com/vulcan/ui/c2c6d25f0e2c00ea2763.png" alt="Flaticon Image" width="2.5%" height="2.5%" /> icon next to the UAT or Prod URL. This action lists the exported components for the application for the particular build (UAT or PROD).

   <Image align="center" className="border" width="80% " border={true} src="https://files.readme.io/cb521ca5cc5665ae48364c23c7974777133455ad0df46527871f5b5b100eb704-image.png" />
4. Select the <img src="https://cdn-icons-png.flaticon.com/128/9428/9428873.png" alt="Flaticon Image" width="2.5%" height="2.5%" /> icon next to the component to copy the component configuration code to the clipboard.

   <Image align="center" className="border" width="80% " border={true} src="https://files.readme.io/3aaa646baedac58da0e0225dc1055e224552b2faa84d6d5458428aa933489f0c-image.png" />
5. Navigate to the local project folder of the Vulcan application in development, and paste the code into the required section. For example, if you want to import a component to customer search, paste the copied code under the respective `CustomerSearch.js` section.

   <Image align="center" className="border" width="80% " border={true} src="https://files.readme.io/8f2bfa4a7fac7a8d9a135c319c51a2335c4078ae6c838ce7382cd197138d6b87-image.png" />
6. Import the required components according to the instructions provided in the comments.

   <Image align="center" className="border" width="80% " border={true} src="https://files.readme.io/dccfd0c4e3fd73f9d15e7888ae55a51500a8ecd968cf0c0f9bb6dd9903a9fb5f-image.png" />
7. Navigate to` app.js` in the project directory and paste the **scope** under **`VulcanSDKSetup`>`importedScopes`** . This ensures that the required flags are set to the local storage during app load up on the browser.

   <Image align="center" className="border" width="80% " border={true} src="https://files.readme.io/72d8bafb7140f9d058bd0590b685ef9ea9d58c276c8574e778e74ddd8d391275-image6.png" />

> 📘 Note:
>
> The copied code can be used for any React 18-based project using the Vulcan SDK (Vulcan application or product UI) provided by the Capillary tech team.

8. [Host](https://docs.capillarytech.com/reference/application-development-process#hosting-a-vulcan-app) the new application and enable UAT or Prod mode to view the changes.

> 📘 Note:
>
> Enabling UAT or Prod for the application is necessary to prevent errors and to view and copy modules that are exported from the components.

# Enabling Sharingan functionality

To enable Sharingan functionality on a Member Care replica, follow these steps:

1. Open the project folder on your local machine.
2. Navigate to the file **webapp/app/components/molecules/IdentifiersOptions/IdentifierOptions.js**.
3. Find the section of the code that contains **\{actionsContainerName}** and uncomment the line.

   <br />

   <Image align="center" className="border" width="80% " border={true} src="https://files.readme.io/b6ff34597fcdd6c9a40db507c64720aa0555211f9e46cb0d2052e1da1a06d94f-image.png" />
4. Build and host the application on the Vulcan platform. Once hosted, the Sharingan app is visible on the UI if configured for the organization.

> 📘 Note
>
> The rendering of the Sharingan app in the UI is managed within the code.