---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Getting started

This page provides you with information on geting started with Connect+.

# Prerequisites

* [ ] **Know about terminologies used in Connect+** -  Refer to documentation on [Connect+ terminologies](https://docs.capillarytech.com/docs/connectplus_overview#terminologies-in-connect---understanding-key-concepts).
* [ ] **OAuth credentials, API client secret and key** - Connect+ supports only OAuth authentication. For information on how to create a client secret and key, refer to the documentation [Creating an API client key and secret](https://docs.capillarytech.com/docs/api-client#creating-an-api-client-key-and-secret).
* [ ] **Access to the relevant access groups** - If you do not have sufficient access group permission, the API will not run successfully. For more information on setting access group permissions, refer to our documentation on [access groups](https://docs.capillarytech.com/docs/access-group).
* [ ] **Intouch access to organization** - To access Connect+ for an organization, you must gain Intouch access to that organization. To request Intouch access, submit a Jira ticket with the Access Control Team.
* [ ] **FTP server for file transfer with appropriate access** - Move access is required for uninterrupted movement of the files between folders.

# Accessing Connect+

To access Connect+ from the Intouch home page,

1. Select the organization to open Connect+.
2. Click **Home** and select **Connect+**.

<Image align="center" border={true} width="25% " src="https://files.readme.io/39b36a5-Connect.png" className="border" />

The system redirects you to Connect+ without needing to log in again.

# Creating dataflow

Dataflow is a defined sequence of steps or operations that you set up to collect data from a defined source, transform, or process data, and transfer it to a defined location.

To create a dataflow, follow the steps below:

1. On the Connect+ homepage, from the drop-down, select the workspace to add your dataflow.

<Image align="center" border={true} src="https://files.readme.io/c9677f9-Select_workspace.gif" className="border" />

1. Click on **Add dataflow**.

<Image align="center" border={true} width="65% " src="https://files.readme.io/51f4ecb-add.gif" className="border" />

3. In the **Dataflow name** text box, enter the name for the dataflow.

<Image align="center" border={true} width="45% " src="https://files.readme.io/9da1fae-dataflow_new.gif" className="border" />

3. In the **Template** section, click **Select template** and from the **Dataflow templates** window, select your preferred template.

<Image align="center" border={true} src="https://files.readme.io/71b1087-save.gif" className="border" />

4. Click **Done**.
5. Click **Continue**.

<Image align="center" border={true} src="https://files.readme.io/2188740-Click_continue.gif" className="border" />

The blocks to configure the template appear.

> 🚧 Note
>
> These are based on the template selected and can differ from template to template.

6. Refer to the documentation of the respective block and enter the details:

* [Connect to Source](https://docs.capillarytech.com/docs/configure-actions#connect-to-source)  - Data source information action block
* [Decrypt-data](https://docs.capillarytech.com/docs/configure-actions#decrypt-data) - Encryption details action block
* [Transform-data](https://docs.capillarytech.com/docs/configure-actions#transform-data) - Mapping header action block.
* [Connect to Destination](https://docs.capillarytech.com/docs/configure-actions#connect-to-destination) - API details action block
* [Trigger ](https://docs.capillarytech.com/docs/configure-actions#schedule-trigger) - Schedule trigger action block

<Image align="center" border={true} src="https://files.readme.io/964e6e0-Action_block.png" className="border" />

7. Click **Save and continue**

If all the inputs are valid, Connect + will successfully create the data flow. For monitoring the performance of dataflow, navigate to the **Performance** page. For more information, refer to the [documentation](https://docs.capillarytech.com/docs/analyse-dataflow-performance) on analysing dataflow.

<Image align="center" border={true} width="400px" src="https://files.readme.io/5329393-success.png" className="border" />

# Viewing dataflow configuration

To view the configured dataflow details, perform the following:

1. From the home page, click on the dataflow you want to view.
2. Click the **Configuration** tab.\
   The tab displays the configuration details.

<Image align="center" border={true} width="50% " src="https://files.readme.io/16c05a3-Configuration_tab.png" className="border" />

# Editing dataflow

At any point in time, you can navigate to the Connect+ home page, search for the dataflow and edit it. You cannot edit a live data flow. To edit a dataflow, follow the steps below:

1. Navigate to the home and search for the dataflow. Click on the kebab menu and select **Edit**.

<Image align="center" border={true} src="https://files.readme.io/6cfcde4-Search.png" className="border" />

2. Click on any of the action blocks you wish to edit.

<Image align="center" border={true} src="https://files.readme.io/0332c42-image.png" className="border" />

3. Make the required changes.
4. Click **Save and continue**.

<Image align="center" border={true} src="https://files.readme.io/97fa140-image.png" className="border" />

<Image align="center" border={true} width="450px" src="https://files.readme.io/20fcf8f-image.png" className="border" />

# Stop and restart dataflow

## Stop dataflow

To stop a dataflow, perform the following steps:

1. On the Connect+ homepage, click on the kebab menu corresponding to the dataflow you wish to stop.

<Image align="center" border={true} src="https://files.readme.io/2be9ddc-image.png" className="border" />

2. Click **Stop**.

<Image align="center" border={true} src="https://files.readme.io/9ca3288-image.png" className="border" />

3. Click **Yes, stop** to stop the dataflow.

<Image align="center" border={true} src="https://files.readme.io/ec300b9-image.png" className="border" />

4. From the **Status** dropdown, click on **Stopped** to view the stopped dataflow.

<Image align="center" border={true} src="https://files.readme.io/6a85107-image.png" className="border" />

The dataflow stops and the status changes to **Stopped.**

## Restart dataflow

To start a stopped workflow, perform the following steps:

1. On the Connect+ homepage, click on the kebab menu corresponding to the template you wish to start.

<Image align="center" border={true} src="https://files.readme.io/76f46ae-image.png" className="border" />

2. Click **Start**.

<Image align="center" border={true} src="https://files.readme.io/e8e96b2-image.png" className="border" />

The dataflow starts and the status changes to **Live**.

# Deleting dataflow

To delete a dataflow, perform the following steps:

1. On the Connect+ homepage, choose the dataflow you wish to delete and click on the corresponding kebab menu.

<Image align="center" border={true} src="https://files.readme.io/2be9ddc-image.png" className="border" />

2. Click **Delete**.

<Image align="center" border={true} src="https://files.readme.io/06e094c-image.png" className="border" />

3. Click **Yes, delete**.

<Image align="center" border={true} src="https://files.readme.io/03a98a4-image.png" className="border" />

The dataflow is deleted and the status is changed to **Deleted**.

# Analyze dataflow performance

The Connect+ home page displays the list of dataflows running along with their performance status for the last 24 hours.

<Image align="center" border={false} src="https://files.readme.io/0f44001-Home_page_Connectplus.png" />

For a detailed dataflow analysis, click on the respective dataflow to view the detailed performance and error data.  Refer to the [Analyse dataflow](https://docs.capillarytech.com/docs/analyse-dataflow-performance)  for documentation and dataflow analysis and refer to [Troubleshooting guide](https://docs.capillarytech.com/docs/troubleshooting-guide-connectplus) for troubleshooting steps.