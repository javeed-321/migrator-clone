---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# April-May-June 2021

# Insights+

<br />

## Improved chart details panel

The following are the improved chart details panel.

* Improved UI for better readability.
* Individual KPI, dimension, and filter details are shown in a separate panel for easier navigation.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/28927c5-zCiFSozTfDtHBSESCS-1b6S2cSb0SOJm-Q.png" />

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/2ecf5c2-qwJzeSWaCQQ2uq5r8IZCQEBqpbJ04OEM0g.png" />

## Dimension selection window

The following is the change in the dimension selection window.

* Clicking on the selected dimension will open the dimension listing panel with a focus on preselected values.
* This panel will allow users to add/remove dimensions from the chart.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/99e7261-gfGd5zwVyEZznDvSxvE0jufm1jTc-nRVVQ.gif" />

* You can remove the dimension without opening the dimension listing window.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/b574953-rzTcSf_z73pnMaQwEXpgz6Jc-cDZl-g1Gw.gif" />

## Chart legend

The following is the change in the chart legend.

Chart legend is available at the bottom of the chart. It’ll include details like KPI names, absolute values,  value change, and color corresponding to the KPIs.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/8e62c14-34B3-VriM-nGve7mwPq-hckglbnx54qyqA.png" />

## Chart details tooltip

The following is the change in the chart details tooltip.

Hovering over individual chart entities will show the KPI value details corresponding to the dimension value in focus.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/1d88836-FA7M8KU_Ju1nRJ493hJumP1yEBMLhNEkqQ.gif" />

## Chart drill down

The following is the change in the chart drill down.

Clicking on a specific dimension value will apply that as a filter.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/e43580f-bFpqSKa9dqV8-Rkd2NA0opfyFF0abWF9EQ.gif" />

## Chart slider

The following are changes in the chart slider.

Improved slider design allows easier navigation when the chart has too many values to fit in the normal view.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/128e860-tXvGu--XXEvipH_rKgU2jd7Conh4NBgQCw.gif" />

## Date filter

The following are changes in the date filter interaction.

* The date filter now shows the active selection box - a box will appear around the active date selection window. This will help users to know if they are selecting report\_start\_date or report\_end\_date before clicking the calendar icon.
* The selection box will keep alternating between report\_start\_date and report\_end\_date so users can easily select required dates with just 2 clicks on the calendar.

<br />

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/960d0f9-r_fGlL-QTcbiMLeYWvgkujvdjZT_ykRnLg.gif" />

<br />

# Engage+

## Social Media CRM Ads - Facebook & Instagram

### Problem Statement

* CRM marketers have been using direct channels such as SMS, Email, Mobile Push, etc to engage with their customers, whereas, users are increasingly using social media. Hence, it makes sense for CRM marketers to engage customers where they are.
* Telecom regulations are getting stricter and the cost of SMS is increasing. Hence, for brands, social media is a good alternative to SMS.

### Solution

* With this release, we support Social media CRM campaigns in Engage+.

### Features

* Enables marketers to configure CRM campaigns on Facebook, Instagram, and Facebook partner networks directly from Engage+.
* Currently, Facebook & Instagram Image, Carousel, and Video ads are supported.

### Upcoming

* Google Display Ads will be supported (Post 3 - 4 quarters).
* Performance reports will additionally reflect KPIs reported by the social channel itself (Post 3 - 4 quarters).\
  For details, see [Create a Facebook Campaign](https://docs.capillarytech.com/docs/create-a-facebook-campaign#explore).

<br />

## Attach both offers and point strategy in a message

### Problem Statement

Many organizations prefer sending communication to customers with the following functionality.

* Assign one or more offers to a message and share the offer details such as offer name and voucher code with customers.
* Show the customer's current points and points nearing to expire (in the next 30 days).\
  Earlier, after attaching an offer to a message, it was not possible to attach Points Strategy (Loyalty Program) to that message.

Loyalty-related tags such as loyalty points, expiring points (in the next 30 days) were unavailable.

### Solution

Now, brands can attach both offers and point strategy to a message.

To attach both offer and point strategy, follow the steps.

* In Content (Creative + Incentive), hover on Add Incentives to see the following options.
  * Add offers
  * Add points

![](https://files.readme.io/184a9840a4d3ddbeca59e7bf9f67d16883226cab560fbebfb5761a395b006b06-image.png)

> 📘 To create a new offer, see create new offer section.
>
> To know more about points strategy, see the points strategy.

* Select Add offers to include offers to the message and preview the added Offers.

![](https://files.readme.io/c997cff7a25517db282ca7e97191774889f71737055c39e673ecaac1682bdbd3-image.png)

* Select Add points to include points related information to the message.
  * In Points Strategy, select the loyalty program to issue points to customers in different tiers.

![](https://files.readme.io/cfaf7057bd831e752979c97a0b2fa958987caa257e59185ace0b48603338503a-image.png)

* Preview the added Points (loyalty program) and click Continue.

![](https://files.readme.io/5529b12f4062a9641d4078e1fc6f17e465418e7f8682adba9306b691a67d0108-image.png)

<br />

# Capillary Data Platform

<br />

The following are the new releases.

* AIRA models dashboard
* User Group-based loyalty: Build business engagements
* Customer Status: Make statuses more meaningful with custom labels
* Enable event mapping for custom events (Behavioral Events)
* Get parent bill number for return transactions
* Customer registration and profile update (Member Care)
* Merge line and bill-level files (Connect+)
* File size limits (Connect+)

<br />

## AIRA dashboard

AIRA models dashboard is Capillary’s end-to-end observability platform to view, initiate, train, and manage Capillary’s machine learning propensity models.

### Problem Statement

Capillary has built several propensity models over the last two years in order to help clients to run personalized marketing campaigns. For example, Engage+ has a lapsation propensity filter to empower orgs to target customers who are going to leave in the next 30 days. This filter is driven by the lapsation propensity model and built by Capillary’s customer intelligence (CI) team. Similarly, there are other models and corresponding audience group filters for running campaigns based on offer propensity, transaction propensity, product propensity, campaign propensity, and other inferred customer behavior patterns.

* Until now, there was no visibility into the list of models available for usage by an org. Customer success managers (CSMs) had to discuss with the product team or the customer intelligence team to understand available models and select the suitable model for their business objectives.
* After model selection and initiation, there was a lot of effort involved to ensure sufficient data to train the model and get desired results.
* After training, when the model is in production, the customer intelligence team had to manually check accuracy parameters and take decisions on whether models needed to be re-trained. All of these tasks led to productivity losses and delivery delays.

### Solution

Capillary’s AIRA models dashboard overcomes the above issues by automating the entire machine learning model lifecycle. It allows users (CSMs, Data Analysts, and Customer Intelligence team members) to view, initiate, validate, train, and manage the entire gamut of machine learning models built by the customer intelligence team in a single place.\
The following are few sample images.

![](https://files.readme.io/352442a7a4d096fd4f3eecfb026a55698125fa4a6a067e5336547fbddad67d5f-image.png)

Landing Page

![](https://files.readme.io/d76fdf0c512f5325cf36a0c05650b7fd989539c9c1dc312225782f114de6ef30-image.png)

New model page

![](https://files.readme.io/062e9835a890f8c69643eb6be8927684d4050503852002b9d2f0e0d36fb77769-image.png)

<br />

#### Model details page

Key Highlights\
The following are the key highlights of AIRA.

* Capillary’s machine learning operations (ML-Ops) platform gets models into production quickly and effortlessly.
* The entire machine learning model lifecycle is automated and handled on the platform - No more follow-ups through tickets and meetings.
* Complete visibility on the status of models initiated – Identify and take action on models that are falling below accuracy thresholds.
* Propensity models are available on Engage+ filters that are already available for initiation. There are more than 25 models in the pipeline for upcoming releases.

<br />

## User group-based loyalty: Build business engagements

For any brand to achieve the ultimate aim of benefiting its customers, it is important to motivate or encourage the contributors involved in this process. With the addition of this feature, the businesses also can launch B2B loyalty programs conveniently and systematically benefiting various levels of hierarchy.

Currently, the usability of Loyalty+ for any business or a brand is limited to benefit its end customers. The current addition facilitates orgs to create personalized loyalty programs not just to the end customer group, but also to the contributors in the supply chain.

### Use Case

* Fleet Loyalty: Fleet Drivers can earn points by purchasing fuel at retail outlets but points redemption can happen by fleet owners in the same group.
* Affiliate Marketing programs: The affiliate enrolled in the program can make customers buy products. With a product purchased by the customer, the rewards are accrued to the affiliate's account.
* Multi-Level Marketing Programs: A sales structure where existing distributors can recruit new distributors to sell the products. Distributors make money through a percentage of their recruits' sales and also direct sales of products to customers.
* Corporate Loyalty Programs: Employees making transactions and rewards are awarded and redeemed at a company level.

### About User Group Loyalty

<br />

Group Loyalty programs are customer retention solutions with custom group structures and loyalty mechanisms designed to help brands establish brand loyalty. These programs typically treat and incentivize individuals who are part of the same account (as a single group of users). The end-customers benefit from these programs because it allows them to have accelerated rewards as a group. For example, if a B2B account is a “Platinum” account then all members of the group enjoy better benefits, although to attain the “Platinum” account status the previous members might have done loyalty related activities to achieve that status. Orgs benefit from programs like this because it allows them to capture a larger share of mind by involving the community rather than individuals and drive collective behaviour in the desired manner.

### Difference between B2B and B2C loyalty groups

Existing user groups are primarily aimed at B2C member groups. In the B2C model, with the help of the Engage+ platform, orgs are able to directly benefit the end customer, ignoring the various levels involved in the chain.

B2C model has only one primary member with multiple secondary associated. Due to the lack of flexibility in the B2C model, several use cases such as accessing points earned lie mainly with the primary user.

Whereas, in the B2B model the user can effectively incentivize various groups in the hierarchy. By studying the industry landscape and the B2C user groups requirements, we are targeting to make new user group entities that can cater to a wider variety of use cases, eventually fulfilling the B2B requirement.

### Features of B2B User Groups

* Segmentation of groups in a hierarchical manner.
* Customizable hierarchy and user role depending on the org structure.
* Ability to have a user in multiple groups.
* Distinct loyalty actions depending on the user role.
* Hierarchy Definition to capture client company’s organisational structure.
* Ability to capture a customer’s association with other customers.
* Auto creation of groups and addition of members based on user roles.
* Loyalty permissions in a group based on user role.
* Granular control of rewards to the group and individual accounts.

<br />

### Terminologies

The following are the new terminologies of user group loyalty.

* Client: A business entity that is enrolled in the org’s User Group Loyalty. A client can have sub-clients under it (smaller business entities).
* Role: Part (function) played by an individual associated with the business. For example, a company enrolled in a fleet loyalty program can have various user roles such as fleet driver, fleet owner and group fleet owner.
* Customer Hierarchy: It is the ranking of members of org/clients according to the relative status, or position. Hierarchy helps define the association between two customer roles. In the previous example, a fleet driver can report to a fleet owner, whereas a fleet owner can report to a group fleet owner. In this, the customer hierarchy captures each role and their reporting role.

![](https://files.readme.io/cec3bf9a98498f9e425f1543fe538a2474ab645c4c351e4756daf312a40aaf91-image.png)

* Hierarchy definition stores attribute required to create a hierarchy (such as customer roles), validation rules for each role, group automation and role-based loyalty permissions.
  * You can define multiple hierarchy definitions for an org and the default hierarchy definition.
  * Each client can have only 1 hierarchy. Once the hierarchy is set up, all the attributes and configurations created in the hierarchy will apply to the customers associated with the company.
* Validation rules: Used to define the parent-child relationship with other roles. You can limit the max. no. of child roles for each role. Configs for skip-level parent-child mapping available.
* Group Automations: Groups can be implicitly created when a user is associated with a specific role. The user becomes the owner of the group and other users can be added to the group based on the association with the owner.
* Group Permissions: Allows setting up Loyalty permissions such as points redemption and points transfer for each member of the group based on the role.\
  Front end APIs, see User Group Loyalty APIs

## Customer status: Make statuses more meaningful with custom labels

As a starting point for brands to develop and launch impactful marketing campaigns it is really important to categorize their customers according to their engagement with the brand. You can now create different status labels against each standard status making it more meaningful. An active customer is not just an antonym to inactive, you can have meaningful labels that make sense to your brand like registered, transacted, regular. You can restrict specific status from redeeming points or coupons.

<br />

![](https://files.readme.io/f52e44311680ab81f9d1d5d77175aaef16863ed07bda61ecf7dc331cf17ccfff-image.png)

<br />

## Enable event mapping for custom events (Behavioral Events)

In the behavioral events module, event mapping for custom events is now enabled. This is used in cases where you want to change the event name or attributes coming from other sources. The source event name and attributes can be mapped to a custom event name stored in our system.

### Use Case

The events coming from WebEngage are having space in their names and are not supported by our system. For example, an event named Promotion Viewed is coming from WebEngage. Since the system does not support event names with space, we create a custom event named promotionViewed. Now you can map the custom event’s name to the original event’s name coming from WebEngage.

## Get parent bill number for return transactions

In a Return transaction type, the parent\_bill\_number is the unique transaction number of the original bill. This parentbill\_number can be added using Add Transaction API to link the return transaction with its original transaction. Now, parent\_bill\_number is enabled in the\_GET Transaction APIs. So, when a return type transaction is retrieved, we also get the parent\_bill\_number associated with that transaction.

The following are APIs that can help you to retrieve parent\_bill\_number.

* Get Transaction API \[v1.1]
* Get Customer Transactions API \[v1.1]
* Get Transaction API \[v2]

<br />

## Customer registration and profile update (Member Care)

Now Member Care can be used to register new customers and edit the profile details of existing customers. Service desk executives familiar with Member Care can use the platform directly for performing any profile updates or customer registrations. For details, see customer registration and profile update.

## Merge line and bill-level files (Connect+)

Connect+ is a no-code data integration tool. Now it comes with support for joining line-level and bill-level data files and ingesting the joined file using Add Transaction API(v2) in one go/single template. In many orgs, line-level data and bill-level data come in separate files. The new Transaction LineItem Merge template on Connect+ will make transaction data ingestion seamless in such cases.

To set up the Transaction LineItem Merge template, follow these steps.

1. In **Connect+**, click **Add dataflow** to create a new dataflow on Connect+.
2. Click **Select Template** and choose the **Transaction LineItem Merge** template.
3. In the **Connect-to-Source** stage, fill in the required FTP-related information - FTP location where the source line-level and bill-level files will be placed for ingestion.

![](https://files.readme.io/d662fafc640c3aa8dd7ceb71a861e42da6430514e8f077840781a1426c2cc86c-image.png)

4. In the Join-data stage, enter details pertaining to the bill- and line-level files that need to be joined.

![](https://files.readme.io/b9b512ab3145a8cdbdad859fe952c3e310c6954d212ca5fac937c61a5ed29168-image.png)

<br />

The following are the fields to join line level and bill level.

1. **File 1 Regex:** Enter the file name pattern for File 1. The pattern specified for the bill-level file is bill\_.csv.
2. **File 2 Regex:** Enter the file name pattern for File 2. The pattern specified for the line-level file is line\_.csv.
3. **File 1-2 Join Type:** Choose the method for joining the two files - INNER JOIN, LEFT\_OUTER\_JOIN, and FULL\_OUTER\_JOIN .
4. **File 1 Headers and File 2 Headers:** Enter the headers on which bill-level and line-level files need to be joined.
5. **File Join Use Case:** Select TRANSACTION\_LINE\_ITEM .
6. After completing the above actions, the next steps are the same as setting up Transaction v2 add-on Connect+. For details, see [Configure Field Mapping & Data Transformation](https://docs.capillarytech.com/docs/step-2-configure-field-mapping-data-transformation).

<br />

## File size limits (Connect+)

Now we have added restrictions on the file size ingested via Connect+ to prevent the platform from overload.

The following are the restrictions.

* A file waiting for ingestion on Connect+ should not exceed 200 MB.
* Connect+ cannot allow more than 2 million records in a file.

If a file exceeds any of the above conditions, an error message will appear on Connect+.