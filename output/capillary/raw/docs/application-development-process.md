---
updatedAt: 2026-07-08T06:04:44.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Application Development Process

After installing the necessary dependencies, navigate to your project directory and begin the [React application development process](https://react.dev/learn). You can use a code editor like Visual Studio Code (VS Code) for writing and managing code.

The development process also includes the following steps:

* [ ] [Generating a React Container](https://docs.capillarytech.com/docs/application-development-process#generating-a-react-container)
* [ ] [State Transitions with React Router](https://docs.capillarytech.com/docs/application-development-process#state-transitions-with-react-router)
* [ ] [Setting Up Internationalization](https://docs.capillarytech.com/docs/application-development-process#setting-up-internationalization-during-development)
* [ ] [Pushing Data to Google Tag Manager](https://docs.capillarytech.com/docs/application-development-process#pushing-data-to-google-tag-manager)
* [ ] [Starting and Building your Application](https://docs.capillarytech.com/docs/application-development-process#starting-and-building-your-application)
* [ ] [Hosting a Vulcan Application](https://docs.capillarytech.com/docs/application-development-process#hosting-a-vulcan-app)

<Callout icon="📘" theme="info">
  ### Note:

  All Vulcan components are based on Ant Design. Refer to the [Ant Design component library](https://3x.ant.design/components/grid/) when developing react components using the Vulcan component library.
</Callout>

# Generating a React Container

This process sets up a container and generates the entire component with index, messages, styles, reducer, saga, actions and constants files, allowing you to develop and add UI elements easily. This eliminates the need to refer to or copy other boilerplate components.

To generate a react component, follow these steps:

1. Navigate to your project directory and open a terminal interface.
2. Run the following command:
   ```
   npm run generate
   ```
3. Choose the generator type from the options.

<Callout icon="📘" theme="info">
  ### Note:

  The types of generators available are:

  | **Generator** | **Description**                                                                        | **Example**                                                                                    |
  | :------------ | :------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
  | **Organisms** | Larger UI components composed of smaller components.                                   | A header with a search bar and navigation links                                                |
  | **Pages**     | Containers that include various elements and other components to form a complete page. | A dashboard page containing charts, tables, and other widgets.                                 |
  | **Templates** | Predefined layouts or structures with placeholders for content.                        | An analytics dashboard template with sections for graphs, user metrics, and recent activities. |
</Callout>

4. Provide a name for the container.
5. Follow the setup procedure to complete the generation process.

<Image src="https://files.readme.io/ab151a6-image15.png" align="center" />

# State Transitions with React Router

Page containers created while generating a react container have a history property that uses React Router to do state transitions.

Sample:<br />`history.push('/state/route');`

<Callout icon="📘" theme="info">
  ### Note:

  Only use the part of the path that defines the state. For example, just /contact, and not the full URL like [https://example.com/contact](https://example.com/contact).

  Refer to [routes.js](https://www.npmjs.com/package/routes-js) for the state route paths.
</Callout>

# Setting Up Internationalization During Development

The setup and files required for internationalization are created while generating a React container. To manually set up internationalization in the development process, follow these steps:

1. Import `injectIntl` from the `react-intl` package using the following:<br />`import { injectIntl } from 'react-intl';`

<Callout icon="📘" theme="info">
  ### Note:

  The `injectIntl` package will be imported if you have already set up a React container.
</Callout>

2. Use injectIntl to wrap the component while exporting it, using the following:<br />`(withRouter(injectIntl(clearDataOnUnmount(Listing))));`

<Callout icon="📘" theme="info">
  ### Note:

  Wrapping the `injectIntl` component will enable `intl` in the props section.
</Callout>

![](https://files.readme.io/5d06853-image13.png)

3. Create the `messages.js` file in your project folder for defining the messages.

Sample:

```
import { defineMessages } from 'react-intl';  
export const scope = 'vulcanWebapp.components.pages.Listing';  
export default defineMessages({  
       searchPlaceholder: {  
         id: `${scope}.searchPlaceholder`,  
         defaultMessage: 'Enter appname to search...',  
        },  
     });
```

<Image src="https://files.readme.io/9571d1c-image4.png" align="center" />

<Callout icon="📘" theme="info">
  ### Note:

  Once the messages.js file has been created, you can use these in your component by using:

  `<p>{formatMessage(messages.searchPlaceholder)}</p>`
</Callout>

<Callout icon="📘" theme="info">
  ### Note:

  The `messages.js` file will be created if you have already set up a React container.
</Callout>

4. Extract `formatMessage` using the following lines:

```
const { intl } = props;  
const { formatMessage } = intl;
```

<Image src="https://files.readme.io/d7663bd-image17.png" align="center" />

5. From the `intl` props use the `formatMessage` method that includes the ID and default message of the object.

For example:

```
{formatMessage(messages.vulcanApplications)}
```

<Image src="https://files.readme.io/5bf4a69-image9.png" align="center" />

6. Once the development process is completed, run the following command:

```
npm run extract-int
```

<Callout icon="📘" theme="info">
  ### Note:

  This will scan all the files named `messages.js` and extract all strings, pasting them in the `en.json` file.
</Callout>

Sample:

```
{  
	'vulcanWebapp.components.pages.Listing.searchPlaceholder': 'Enter appname to search.'  
}
```

## Importing to Locize

Once you have generated the language .json file, you will need to import it to Locize.

Refer to the [Locize documentation ](https://docs.locize.com/integration/getting-started/add-content#you-got-some-files-you-like-to-import)to import the file into your project.

# Pushing Data to Google Tag Manager

To facilitate [FullStory ](https://developer.fullstory.com/overview/api-basics/)integration, you can push data to [Google Tag Manager](https://support.google.com/tagmanager/answer/6102821?hl=en) (GTM).

* During the project setup, specify the Google Analytics (GA) and GTM tracking IDs when prompted by the CLI tool. This will configure the tracking IDs in the code.
* Use the [pushDataToGTM ](https://developers.google.com/tag-platform/tag-manager/datalayer)utility or [window.dataLayer.push ](https://developers.google.com/tag-platform/tag-manager/datalayer#custom_data_layer_methods)(Ex. Cap.js) to push events with data to GTM.

<Image src="https://files.readme.io/df0fa21-image7.png" align="center" />

<br />

<Image src="https://files.readme.io/a1d016c-image3.png" align="center" />

# Starting and Building your Application

Once you have built the application you can test your application on localhost and build the application to be hosted on Vulcan.

To start or build the application, follow these steps:

1. Navigate to your project directory and open a terminal interface.
2. Run the following command to **start** the application on localhost:

```
npm run start 
```

<Image src="https://files.readme.io/18ec36b-image1.png" align="center" />

3. Run the following command to **build** the application for deployment and hosting:

```
npm run build
```

<Image src="https://files.readme.io/1c8338c-image11.png" align="center" />

<br />

<Image src="https://files.readme.io/4524904-image5.png" align="center" />

<Callout icon="📘" theme="info">
  ### Note:

  Ensure the Vulcan app is created on the Vulcan UI platform first. The app ID is needed to validate:

  - Authentication (vulcan\_endpoint)
  - Translation messages (if enabled during setup) (vulcan\_endpoint)
  - Intouch API calls (vulcan\_endpoint)
  - XAJA API calls (vulcan\_endpoint)
  - API extension calls (vulcan\_endpoint)
  - CRM node API calls (arya\_endpoint)
</Callout>

<Callout icon="📘" theme="info">
  ### Note:

  The `endpoints.js` file is used to manage all API calls from the UI. Configure the local UI to point to any production environment for local testing (absoluteURLs).

  Third-party APIs can be called by defining them as endpoints. These need to be defined as full URLs in absoulteURLs and partialURLs. All endpoints are referenced in the `api.js` file, where functions are defined to handle API calls for sagas.

  Export components via the `mfe-exposed-components.js` file for embedding in other UIs, such as Member Care.
</Callout>

# Hosting a Vulcan App

After completing application development and the build, the next steps involve uploading the build file to the Vulcan UI.

To upload and host your app, follow these steps:

1. [Access the Vulcan UI](https://docs.capillarytech.com/docs/vulcan-getting-started#accessing-vulcan-ui).
2. Click the application to open the page.
3. Click **Deployments** and then **Upload Build**.
4. Enter the build description for your application.
5. Click **Select zip** and choose the `build.zip` file from your device.

<Callout icon="📘" theme="info">
  ### Note:

  The maximum supported size is 50 MB.
</Callout>

6. Click **Confirm upload** to upload the build and save changes.
7. After the upload is complete, enable UAT by clicking on the three dots under the Actions tab.
8. Identify the UAT URL generated and displayed in the Application Details section. This URL can be used for testing.

<Callout icon="📘" theme="info">
  ### Note:

  Refer to the tutorial [video ](https://youtu.be/Xvdv1Lu3IvA)for more information.
</Callout>

9. After testing the application, enable Prod by clicking on the three dots under the Actions tab.
10. Identify the Prod URL generated and displayed in the Application Details section. This URL can be used to access your application after testing.

## Embedding Vulcan Application to Member Care UI

Embedding a Vulcan application into the native Member Care UI is currently unsupported and requires assistance from the Capillary UI team.

Developers can integrate Vulcan applications on the new Member Care, built on the Vulcan Framework, and embed the Vulcan Application within it.

Refer to the documentation on [Customizing the Member Care UI](https://docs.capillarytech.com/docs/customizing-the-member-care-ui).

<Callout icon="📘" theme="info">
  ### Note:

  For reference on embedding the application into Member Care, watch the demo [video](https://youtu.be/cSUcfqaGH_g).

  To embed a Vulcan app natively on Member Care, raise a JIRA request to the Capillary UI team.
</Callout>

# Updating the Vulcan SDK

Updating the Vulcan SDK is essential to ensure that your project benefits from the latest features, performance enhancements, and bug fixes.

To update the Vulcan SDK follow these steps:

1. Open the project folder on your local machine and navigate to the `package.json` file in the root folder.
2. Update the version number under the `@capillarytech/vulcan-react-sdk` package.
3. Open a terminal in your project directory and run the following command:
   ```shell
   npm install
   ```

The Vulcan SDK is now updated to the specified version.