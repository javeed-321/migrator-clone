---
updatedAt: 2026-03-06T09:31:57.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Organizing Dataflows using Applications

The Applications feature in Neo provides a structured way to organize and manage dataflows within an organization. The feature helps group related dataflows under a logical container based on their purpose or business function.

For example, you can create an application named Customer Management and group all dataflows that create, update, or validate customer profiles under that application. This helps keep similar dataflows organized in one place, making it easier to locate, maintain, and track them as the number of dataflows increases in your organization.

# Accessing applications

You can access Applications from the **Dataflows** page in the Neo extension UI.\
Users with the Neo Viewer permission can view available applications and their associated dataflows. An edit icon indicates custom applications.

To view applications, select the applications drop-down list. All available applications are displayed.

<Image align="center" border={true} src="https://files.readme.io/363383f6355db51e607e9e54de5716e7e46ec07254f7700546e4e38f9afb5053-Applications.png" className="border" />

# Types of applications

To support different kinds of dataflow grouping, Neo provides three application types. An application type defines how Neo classifies and manages dataflows within an application. Each application type serves a different purpose and follows specific management rules within Neo. The following are the application types:

* Default Application

* Middleware Application

* Custom Applications

The following sections describe each application type and how Neo manages dataflows within them.

## Default application

The Default Application is available by default and contains all existing dataflows created before the Applications feature was introduced.

**Key behaviors**

* Adds new dataflows to the Default Application unless you select a different application.

* Allows moving dataflows from the Default Application to a custom application.

* Does not allow moving dataflows back to the Default Application.

## Middleware application

The Middleware Application is a system-managed application that automatically groups dataflows based on [tags](https://docs.capillarytech.com/docs/tags-filters-in-dataflow#/). You cannot manually add, edit, or move dataflows in or out of this application.

Middleware dataflows are identified by the following tags:

* Pre-matching

* Post-matching

These tags determine when the dataflow runs in relation to the main dataflow execution.

**Key behaviors**

* Moves the dataflow to the Middleware Application when you assign a pre-matching or post-matching tag.

* Moves the dataflow to the Default Application when you remove the tag.

* Prevents manually moving dataflows into or out of the Middleware Application.

* Prevents moving middleware dataflows to custom applications unless the matching tag is removed.

## Custom application

Custom applications group dataflows based on specific business functions or use cases.

**Key behaviors**

* Allows creating custom applications if you have the Neo Edit permission.

* Allows moving dataflows from the Default Application to a custom application.

* Allows moving dataflows between custom applications.

* Allows renaming custom applications from the UI.

Once you determine how you want to group your dataflows, you can create a custom application for each group. The section below explains how to create a custom application.

# Application context in dataflow execution

Neo makes the application context available during the execution of each dataflow. This means you can write conditional logic inside a dataflow based on the application it belongs to.

For middleware dataflows, the application context refers to the application of the main dataflow that triggered the middleware — not the middleware's own application. This is enabled through the DAO function [getApplicationName](https://docs.capillarytech.com/docs/neo-dao-functions#getapplicationname).

## Using `getApplicationName` in middleware dataflows

Middleware dataflows (pre-matching and post-matching filters) run before or after every main dataflow in your organization. In some cases, you may want a middleware to apply its logic only for dataflows that belong to a specific application, and skip execution for others.

The `getApplicationName` function lets you identify the calling application at runtime and use that information to control the execution path.

**Key behaviors**

* Returns the application name of the calling main dataflow when invoked from within a middleware dataflow.
* Returns the application name of the current dataflow when invoked from within a main dataflow.
* Is available in Script blocks, Schema blocks, and relation conditions.

### Use case: Run middleware only for specific applications

**Requirement**

Your organization has a pre-matching middleware dataflow that performs an authentication step. You want this middleware to execute its full logic only for dataflows inside the `CustomerManagement` application, and return early for all others.

**Solution**

Add a Script block named `ValidateApplication` at the start of the middleware dataflow. This block uses `getApplicationName` to identify the calling application and checks it against a list of applications that should run the middleware. A relation condition then routes execution based on that check.

**Step 1: Add a `ValidateApplication` Script block**

```javascript
import dao from "neo/dao";

const script = {
  execute: async () => {
    const allowedApplications = ["CustomerManagement", "LoyaltyFlows"];
    const currentApplication = dao.getApplicationName();

    return {
      allowedApplications: allowedApplications,
      currentApplication: currentApplication
    };
  }
};

export { script as default };
```

**Step 2: Configure a relation on the `ValidateApplication` block**

In the **Relations** section of the `ValidateApplication` block, add the following path relation:

```javascript
dao.getBody("ValidateApplication").allowedApplications.includes(
  dao.getBody("ValidateApplication").currentApplication
)
```

* If this evaluates to `true`, execution proceeds to the main middleware logic block.
* If this evaluates to `false`, execution routes to an exit block, skipping the middleware logic.

### Use case: Route to different logic per application within the same middleware

If your organization requires different middleware logic for different applications, you can handle multiple applications within a single middleware dataflow. This is useful when you have reached the limit of pre-matching or post-matching filter slots (maximum three each).

**Step 1: Add a `RouteApplication` Script block**

```javascript
import dao from "neo/dao";

const script = {
  execute: async () => {
    return {
      allowedApplicationsSet1: ["CustomerManagement"],
      allowedApplicationsSet2: ["OrderTracking"],
      currentApplication: dao.getApplicationName()
    };
  }
};

export { script as default };
```

**Step 2: Define multiple relations on the `RouteApplication` block**

* **Relation 1:** `dao.getBody("RouteApplication").allowedApplicationsSet1.includes(dao.getBody("RouteApplication").currentApplication)` — connects to the `LogicForCustomerManagement` block.
* **Relation 2:** `dao.getBody("RouteApplication").allowedApplicationsSet2.includes(dao.getBody("RouteApplication").currentApplication)` — connects to the `LogicForOrderTracking` block.

A single middleware dataflow can now serve multiple applications with distinct logic.

# Creating a custom application

To create custom applications, you need the Neo Edit permission.

**Note**: Each organization can have up to 20 custom applications.

To create a custom application:

1. On the **Dataflows** page, open the applications drop-down list.

2. Select **New Application**.\
   The **Create New Application** modal opens.

<Image align="center" src="https://files.readme.io/ce8341a6bc154f629139355166fc797bf0eb02df528173e4eaa861d28e44090b-New-Application.png" />

3. In **Application Name**, enter the name of the application.
4. Select **Create**.\
   The custom application is added to the list.

   <Image align="center" border={true} src="https://files.readme.io/8fb06a5991393c069774870fb82c42c9ee8dd8886a01ebb90d5149741479fe5e-Screenshot_2025-11-14_at_10.46.42_AM.png" className="border" />

# Manage applications

After creating applications, you can view, edit and reorganize them as needed.

## Editing an application name

You can edit the name of a custom application if you have the Neo Edit permission.

To edit an application name:

1. Open the applications drop-down list.

2. Select the edit icon next to the application you want to update.\
   The **Update Application Details** modal opens.

3. Update the application name.

4. Select **Save**.

   <Image align="center" border={true} src="https://files.readme.io/8d7c03187bfc5b7a8032e732ab7e4850d42b92062b32f7e930eee167b4cefff7-Edit___application.png" className="border" />

## Reassigning dataflows to other applications

You can move dataflows from the Default application or from one custom application to another custom application. Only users with the Neo Edit permission can perform this action. Dataflows cannot be moved into the Middleware application or back to the Default application.

To move a dataflow to another application:

1. Open the applications drop-down list and select the application that contains the dataflow you want to move.

2. In the dataflow list, select the toggle selection mode icon to enable multi-select.\
   The option to select dataflows is available.

   <Image align="center" border={true} src="https://files.readme.io/03d84c199f825e8dbaab8cc7657d36e762e0e97cb0310442def3d32545a3fea3-Toggle_selection_mode.png" className="border" />

3. Select one or more dataflows you want to move.

4. Select the **Move selected rules** icon.\
   The **Move Dataflow To** modal opens.

5. From the list of target applications drop-down, select the destination custom application.

6. Select **Move**.\
   The selected dataflows are moved to the chosen application.

   <Image align="center" border={true} src="https://files.readme.io/568c9389a5453ff10cbe2bc39137193827109b21151891cbd996228265c71b6c-movedftoapplication.gif" className="border" />

## Viewing dataflows within an application

You can view all dataflows grouped under an application from the Neo extension UI. Users with the Neo Viewer permission or higher can view applications and their associated dataflows.

To view dataflows within an application:

1. Open the applications drop-down list on the **Dataflows** page.

2. Select the application you want to view.\
   The list of dataflows in that application appears.

You can select any dataflow in the list to view its configuration, tags, and execution details.

<Image align="center" border={true} src="https://files.readme.io/d387abd910714cc1c950b8c00d84ffd39f552161451dd32dd64ca9c550db7f60-output.gif" className="border" />

# FAQs

1. What is the purpose of Applications in Neo?\
   Applications help you organize related dataflows under logical containers so you can manage, view, and maintain them more easily.
2. Can I create a new application?\
   Yes. You can create custom applications if you have the Neo Edit permission.
3. How many custom applications can I create?\
   You can create up to 20 custom applications in an organization.
4. Can I rename an application?\
   Yes. You can rename custom applications if you have the Neo Edit permission.
5. Can I delete an application?\
   No. Applications cannot be deleted from the UI.
6. Can I move dataflows between applications?\
   Yes. You can move dataflows between custom applications or from the Default Application to a custom application. You must have the Neo Edit permission.
7. Can I move dataflows into the Middleware Application?\
   No. Dataflows are moved into the Middleware Application automatically based on pre-matching or post-matching tags.
8. What happens if I remove a pre-matching or post-matching tag from a middleware dataflow?\
   The dataflow automatically moves to the Default Application.
9. Do tags affect where dataflows appear?\
   Only matching-related tags (pre-matching and post-matching) affect placement. All other tags are informational and do not control where dataflows are grouped.
10. Does moving a dataflow change its execution URL or behavior?\
    No. Application grouping affects only how dataflows are organized in the UI. It does not change the execution URL, logic, or behavior.
11. Can I view applications without edit permissions?\
    Yes. Users with the Neo Viewer permission can view all applications and their dataflows.
12. Are applications available for global dataflows?\
    Yes. Applications are visible for global dataflows, but you cannot create or modify global applications from the UI.