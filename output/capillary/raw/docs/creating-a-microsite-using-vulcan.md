---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Creating a Microsite Using Vulcan

The following procedure outlines how to set up the Vulcan framework and create the microsite:

1. ### [Set up the Vulcan application](https://docs.capillarytech.com/reference/vulcan-getting-started#application-setup).
   1. [Access the Vulcan UI](https://docs.capillarytech.com/reference/vulcan-getting-started#accessing-vulcan-ui).
   2. Create the application on Vulcan UI.
   3. Enter the [basic details ](https://docs.capillarytech.com/reference/vulcan-getting-started#basic-details)and [internationalization details ](https://docs.capillarytech.com/reference/vulcan-getting-started#internationalization-details)(if required) for the application.\ <br />
2. ### [Initialize the project on the local machine](https://docs.capillarytech.com/reference/vulcan-getting-started#local-project-initialization).
   1. Run [`create-vulcan-app`](https://storage.crm.n.content-cdn.io/create-vulcan-app.sh) on a new terminal.
   2. Provide the required details as prompted by the system.
   3. Open the generated folder on your code editor.\ <br />
3. ### [Begin the React microsite development using a code editor](https://docs.capillarytech.com/reference/application-development-process).
4. ### [Generate the `build.zip` file](https://docs.capillarytech.com/reference/application-development-process#starting-and-building-your-application).
   1. Navigate to your project directory and open a terminal interface.
   2. Run the following command to build the application for deployment and hosting:
      ```
      npm run build
      ```
   3. Identify the `build.zip` file under your project folder.\ <br />
5. ### [Host your microsite on the InTouch platform](https://docs.capillarytech.com/reference/application-development-process#hosting-a-vulcan-app).
   1. [Access the Vulcan UI](https://docs.capillarytech.com/reference/vulcan-getting-started#accessing-vulcan-ui) and open the application.
   2. Click **Deployments** and **Upload Build**.
   3. Enter the build description for your application.
   4. Click **Select Zip** and choose the `build.zip` file from your device.
   5. Click **Confirm upload** to upload the build and save changes.
   6. Enable UAT or Prod mode for your build.
   7. Identify the UAT/Prod URL generated and displayed in the Application Details section. This URL can be used for testing or accessing your microsite.

> 📘 Note:
>
> To embed your microsite on InTouch, raise a JIRA request to the Capillary Tech team.