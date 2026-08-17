---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# July-August-September 2023

# Loyalty+

## Brand new creation flow for Milestones

A completely revamped user flow is created for using Milestones after this enhancement. With this flow, the user will be able to create Milestones in a single & simple flow. In the very near future, even the configuring of the actions for the Milestone (like point allocation, and coupon allocation) can also be done in the same flow without having to switch to the loyalty promotions section.

More details : [here](https://docs.capillarytech.com/docs/milestones-new-flow)

## RBAC (Role-based access control)

Until now, whenever a user requests access to any organization, the provided access will be kind of super-admin level. This means, with that access, the user can view, edit, approve, and delete configs present in the organization. This could lead to a lot of unintentional changes which might cause a lot of impact. With this enhancement, users can get access of different roles (view, edit, approve, delete) depending on the need.

More details: [here](https://docs.capillarytech.com/docs/rbac-role-based-access-control)

## Loyalty+ → Workflows enhancements

You can now rename sets in all the customer activities / events.Once the changes are saved, then only, the sets will be renamed successfully. Refer to the gif below.

In the “Makes a Transaction” customer activity, sets are now categorized, for better understanding and well explained descriptions. There are four major categories of sets in the Transaction event, and each one of them has a role to play. So, we have enhanced the UX here, and given a better picture. Don't forget to read the descriptions of each category.\
Refer to the gif below :

## Loyalty+ → Workflows→ Scope enhancements

In Scopes,  the selection of Stores became simpler. Currently, it is confusing, as it has exclude/include toggle along with checkboxes. Post enhancement, there will be just the checkboxes, depicting, ticked as included, and unticked as excluded.\
Before :

After :

In Scopes, now we have provided proper information, in stores selection, that why a certain store cant be selected. If a store is excluded from the parent set, it cannot be included in any of the child sets. So, the description tells you, that in which parent set, a particular store is excluded. Refer to the image below :

## Loyalty+ → Strategies → Coupons/Offers enhancements

You can no longer create Offers/Coupons from the Loyalty+ module with expiry as “Along the campaign”. The only expiry available would be “Fixed expiry”.

You can claim the coupons in Loyalty → Strategies → Offers. But remember, only the coupon series with “Fixed expiry” & Claimed by Loyalty, will be visible in the “Issue coupon” action, under Workflows.\
In case, the coupon selected before the release, does not meet the above criteria, you will see an error in your configuration. This is just an error and nothing will be changed from functionality pov, so if you see this error, just go and select the right coupon. Refer to the image below :

You can also search the coupons, from the drop down, in the “Issue coupon action” under workflows.

## Loyalty+ → Workflows → Actions enhancements

In the “Allocate Points action” and all the other actions, where, we get the option to select the source value - “Prorate on”, on which the points will be allocated, currently, there are 3 options present - Event default value, Current aggregate & Previous aggregate. But, from these, the later two, only work in the case of Trackers.\
So, we have disabled them, in the Allocate points action, in the regular sets, and they would only be enabled, when the action is used in trackers. Refer to the image below :

## Introducing "points to reward conversion" workflow

The "Auto Points conversion to reward" feature allows the automated redemption of a certain number of points based on a defined value and issues a reward. The reward can be a coupon, cart promotion, gift voucher, or third-party coupon.

For example, When the user purchases and gets 100 points, the points should be deducted from the user account and they will get a $5 off coupon code and when they reach 200 points, they will get a 2X $5 off coupon code.

## Event Simulation(TransactionAdd Event)

The simulation API helps to enhance brand engagement and boost guest conversions into loyal customers. It accomplishes this by providing customers with precise information about the points they can earn for specific purchases, including a detailed breakdown of both base and promotional point earnings at the line item level. For more information, refer to the [event simulation API documentation](https://docs.capillarytech.com/reference/simulate_transactionadd).

## Minor but impactful enhancements

1. Now, “Evaluation start” is a set category available in all the customer activities, with relevant descriptions in each activity/event.
2. In the Subscription-based loyalty programs, benefit linking is no longer mandatory.
3. The “Activity reward current limit” tab, which is the activity/event level capping window, is removed from the Loyalty Promotion workflows, as this is activity level capping, and should be set in the loyalty core workflows.
4. There was an enhancement made last quarter, where we removed the “Include” & “Exclude” functionality, from Scopes, in Loyalty workflows. There were some issues in it, and hence it is revoked. So, now, the older version is back, and you can continue using include and exclude toggles, in the scope.

## Advanced capping capabilities

As of now with our existing capping capabilities, we all know that only the "points" can capped and this is a major limitation for several brands. To solve this problem, brands are depending on indirect methods like set-level cappings to achieve the use cases. But, because of these multiple set-level cappings that brands are configuring, we are encountering a huge increase in the number of sets. This leads to issues like set complexity, a decrease in computational speed, an increase in workflow processing time, etc..

Along with that, brands have to create the capping type of milestones first in order to set “customer-level cappings”. We felt this was a bad user experience as the user had to switch between 2 different modules.

With this latest enhancement of cappings, we have improved the capping in such a way that all the above issues are solved & along with that we have added a lot of new capabilities too (Cappings of type Lineitem amount, Lineitem quantity, etc..). We believe that you are going to have a very good time with these advanced enhancements of capping.

Please read here for more details: [here](https://docs.capillarytech.com/docs/advance-capping)

## customerActivitiesHistories API

As of now, we do not have an API that can fetch all the subscription (supplementary) or coalition (external) programs of a customer. This includes the programs in the past & the present programs. Because of this, brands are using indirect hacks whenever such use cases arise.

With this enhancement, we have built an API that can give you all subscription/coalition programs of a customer (past & present) in an extremely simple way.

More details here: [API](https://docs.capillarytech.com/reference/customeractivityhistories)

## Behavioral attributes as tags in the communication.

After this enhancement, now brands can use the "attributes" of behavioral events as "tags" in the creatives. We are supporting these in 3 creatives as of now:

1. Send SMS
2. Send Email
3. Send mobile notification

More details [here](https://docs.capillarytech.com/docs/behavioral-loyalty#behavioral-attributes-as-tags-in-the-communication)

# Incentives

## Badges

We're super excited to announce the launch of a new incentive : **BADGES**!

Think of them as the secret sauce to spice up your brand's loyalty program. These digital badges are more than just eye-catching icons; they're powerful tools to reward your customers, boost engagement, and influence behaviors. They make your loyalty program feel like an adventure, with customers collecting badges for various achievements. Whether it's about being a Premium member, a referral master, or an all-around superstar shopper, these badges bring a new level of excitement to your loyalty program and make the customers feel proud and tap into their emotional side. So, get ready to unlock a world of loyalty possibilities with Badges.

<Image align="center" src="https://files.readme.io/12ac47f-Badges_Landing_page_copy.jpg" />

### Refer to this Badges [user documentation](https://docs.capillarytech.com/docs/badges-1) and[ API documentation](https://docs.capillarytech.com/reference/badges)

<Image align="center" src="https://files.readme.io/1507907-Badges_Landing_page_copy_2.jpg" />

### Timeline of developments for Badges:

**What can you do today ?**

* Badges creation and update via APIs
* Badges listing page, view mode and upload images on UI
* Issual of badges from loyalty workflows and loyalty promotions

**What will be available in Jan’24 (Post OND’23 releases) ?**

* Badges creation and update via connect+ templates
* Retro support for badges
* Advanced get API for full control on view customizations (ranking and grouping in displaying badges)
* Reporting
* Filters in Engage
* Enrolment in badges via campaigns

**What will be available in Apr’24 (Post JFM’24 releases) ?**

* Create, edit, duplicate badges via UI
* Upload based creation with native support in UI
* Issual of badges from Journeys
* Membercare view of badges
* Direct enrolment, issual and revoke of badges from Membercare
* Support for fixed window issual restrictions in badges

<Image align="center" src="https://files.readme.io/1710151-Badges_Landing_page_copy_3.jpg" />

## Rewards Catalog

### Enhancements in getUserRewards API for enhanced clarity and user experience

**Changes in Existing API:**

We've heard you! In the past, users couldn't peek at the points spent when purchasing rewards from the rewards catalog. Now, with the new enhancement, we're pulling back the curtain. You and your customers can see the exact number of points spent on each reward. No more mysteries, just clarity.

Refer to the detailed API documentation [here](https://docs.capillarytech.com/reference/get-rewards-for-user).

**Introduction of New API:**

We're rolling out a shiny new API. It's like giving you a fresh pair of glasses to see your rewards even more clearly. Say goodbye to those confusing aggregated views. Now, when you want to check your last 5 purchased rewards, the new API will give you just that - the last 5 vouchers, no extra fluff.

For example, Imagine you have 10 vouchers from one reward and 3 vouchers from another. If you want to see your last 2 purchases, the old API would show you a total of 13 purchases (10 from the first reward and 3 from the second). It's like mixing apples and oranges.

Now, with the new API, it's crystal clear. When you check for your last 2 purchases, you'll only see the most recent 2 vouchers you've received. It's like organizing your closet so you can find your favorite shirt right away.

Refer to the detailed API documentation [here](https://docs.capillarytech.com/reference/get-rewards-for-user-new-api).

> 📘 Note: There are no changes in response structure of the existing API, we have just built the new API for a more clear view of the rewards purchased by the customer.

### Optimize your rewards budget & catalog inventory

With recent changes in reward restrictions, our marketing maestros can now lay down the below laws for their rewards:

🛍️ Maximum quantities of a reward that a single customer can snag during the reward bonanza.

🎁 Maximum quantities of a reward that can be snatched up by all your amazing customers combined.

This new update allows for more equal opportunities for customers to avail benefits while also optimizing spending at the reward level.

But wait, there's more! You can tweak these restrictions daily once a reward goes live. That's right, control is now at your fingertips. We've even thrown in the option to input a big fat "0" for those moments when you want things ultra-exclusive enabling specific limitations, exclusions as desired or out of stock scenarios.

*Below images are mere samples to indicate possible customer views and not product view*

<Image align="center" width="200px" src="https://files.readme.io/cedb668-image1.jpg" />

<Image align="center" width="200px" src="https://files.readme.io/9dd69e9-image2.jpg" />

So, go ahead, start optimizing like a pro! For all the details on this, check out our in-depth documentation [here](https://docs.capillarytech.com/docs/rewards-catalog-2#optimize-your-rewards-budget--catalog-inventory)

*Please note that the corresponding UI changes for this fantastic feature will be arriving in future sprints. For now, dive into the world of API-based implementation.*

### Check the reward restrictions on Membercare and answer customer queries faster

Now you've got a front-row seat to your rewards catalog purchases and restrictions right in Membercare! 🚀 This means you'll have eyes on your rewards catalog events, making it easier to handle customer questions like a pro.

<Image align="center" width="500px" src="https://files.readme.io/ea9c8f1-image3.png" />

For all the nitty-gritty details, head over to our documentation [here](https://docs.capillarytech.com/docs/rewards-catalog-2#now-brands-can-see-rewards-catalog-events-in-membercare).

Happy Redeeming:)

# Engage+

## Bridging knowledge gap

**Bridging knowledge gap around static audience list that is created with the combination of 2 or more parent groups.**

### Added disclaimer at multiple junctions to support seamless creation of audience filters.

When an audience filter is created combining two existing groups, that particular new set of data remains static and does not refresh even if there has been a change in the 2 parent groups. For example, I combine 2 audience lists A and B (namely C).\
A consists of 1,2,3 and B consists of 1,2,4,5,6, and I choose the C to have common elements of A and B, then C will have 1 and 2.\
However, even if A gets updated with 1,2,3,5 in future, there will be no impact on C, and C will continue to have 1 and 2 only.\
This has been the behavior of the system always but it has created confusion among users. Therefore, we have introduced the mechanism to educate the users upfront about the mechanism of this feature like below:

![](https://files.readme.io/18e2b4a-image.png)

![](https://files.readme.io/45dbeb2-image.png)

### Complete capitalisation of First, Last or Full name is now possible via Engage+ creatives!

Hey THERE! Or Hey THERE BUDDY!\
More often than not, we have observed that marketers want to emphasize on the names of their customers while addressing them through social campaigns. To make this activity more prominent, we are now allowing campaign creators to make the entire first/last or full name in uppercase format.

You can use the Tag mentioned in the screenshot below for the same:

<Image align="center" className="border" border={true} src="https://files.readme.io/2b7a5cc-image.png" />

### Exit Trigger in Journeys

Brands were tired of keeping track of customers who do not meet the entry criteria of a particular journey and had to try hard to keep them at bay. Now, with the new exit trigger option, brands can automate the exit of such customers who do not fulfill the entry criteria of that particular journey.\
It’s easier to implement than you think. All you need to do is toggle the button (as seen in this screenshot).

<Image align="center" className="border" border={true} src="https://files.readme.io/58ec3f2-image.png" />

Please note that this feature is optional and by default this will be set as “NO”. Also, it will be applicable only when the Entry criteria is formed using an “Audience List”.

More details can be found on the documentation page [here](https://docs.capillarytech.com/docs/configure-journey#adding-an-exit-trigger).

### Cart Promotions and Gift Voucher in Journeys!

One of the most awaited incentives in Journeys is now live - Cart Promotions.\
Cart promotions can be selected as an incentive type and can be claimed like any other offer.\
It doesn’t stop there - Now, Cart promotion can also be applied at:\
Event based wait; Exit trigger; Audience Manager and Decision split block\
You can include customers who have redeemed a particular gift voucher/cart promotion.\
Some examples are attached below:

#### Cart Promo/Gift voucher in Event Based Wait:

<Image align="center" className="border" border={true} src="https://files.readme.io/a5fdbe1-image.png" />

#### Cart Promo/Gift voucher in Exit Trigger:

<Image align="center" className="border" border={true} src="https://files.readme.io/b221509-image.png" />

More details can be found on the documentation page.

### Email Whitelisting

There have been enough requests for email whitelisting and we all were tired of doing that manually, so we now give the option to upload and whitelist a bigger chunk of emails at once.\
You can find this option under Engage+ settings. It’s as simple as you’d see in the image below:

<Image align="center" className="border" border={true} src="https://files.readme.io/533d1a9-image.png" />

You can also refer to the documentation [link]() for this

### International Number formatting on Campaigns Home Page

Campaign performance KPIs and left-over communication credits can now be viewed as per the locale selection of the respective org.

Based on the "Base country" selection in the global org setting, the format for KPIs and credits on the campaign home page will change respectively.

<Image align="center" src="https://files.readme.io/368d6f4-Screenshot_2023-11-28_at_3.34.23_PM.png" />

Example shown below:

Case 1 - if base country selected as India

<Image align="center" src="https://files.readme.io/7347168-Screenshot_2023-11-28_at_3.34.36_PM.png" />

Case 2 - if base country is United States

<Image align="center" src="https://files.readme.io/4b994b3-Screenshot_2023-11-28_at_3.34.41_PM.png" />

and so on.

## SDK

### Android

#### [Version 1.4.1](https://github.com/Capillary/hydra-sdk-android-maven/packages/1780353?version=1.4.0) (August 22, 2023)

[Hydra Inbox UI - 1.0.1](https://github.com/Capillary/hydra-sdk-android-maven/packages/1915044?version=1.0.1)

Added support for the customizing Notification Centre theme.\
The Following fields can be modified using a custom theme

* Background colour of the Notification Item based on the read/unread state of the notification
* Text colour of the Notification title, message and date label based on the read/unread state of the notification
* Font can be updated for Notification title, message and date label based on the read/unread state of the notification
* The text colour and font of the label stating "No Notifications Found"

NOTE - Application developers can opt for the default theme for the standard template.

#### [Version 1.4.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1780353?version=1.4.0) (August 9, 2023)

* **Notification Centre** -  Added support for notification centre through which your users will have a unified and streamlined notification experience, where they can easily access and manage their notifications in one place
  * The notifications will be displayed in form of a list, consisting of
    * Heading
    * Time and date of receiving
    * A short description
  * The user can click on the notification, which will navigate them to the correct path be it an external url or a deep link inside the app
  * The content of the notification is parsed from the push notifications sent out.
  * Adding dlr event push deleted
* **Bug Fix** -  Reporting of events based on the correct account Id

[Hydra Inbox Core - 1.0.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1915044?version=1.0.0)

* Provides a base to retrieve, delete or alter the stored notifications in the database
* Also exposes api’s for the UI to be consumed

[Hydra Inbox UI - 1.0.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1915044?version=1.0.0)

* Module to show the notifications in form of a list within an activity or fragment

[Hydra Core- 1.3.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1705267?version=1.2.0)

* New tables to store the notifications

[Hydra Pushbase - 1.4.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1774436?version=1.3.0)

* Internal changes relevant to support the Notification center
* Compatibility update with hydra core

[Hydra Firebase - 1.3.0](https://github.com/Capillary/hydra-sdk-android-maven/packages/1774453?version=1.2.0)

* Compatibility update with hydra core

### iOS

#### [Version 1.4.3](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.4.3releases/tag/1.4.2) (September 8, 2023)

Done the required changes to resolve the issue where events are not being sent to the server.\
It was observed that the events that are received from the application are not sent to the server.\
While debugging the issue it was found that the issue is happening only when the application is running on a simulator with iOS version 16.2.\
Have done the required changes to overcome the issue and with this release the events are now sent to the server as expected.

#### [Version 1.4.2](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.4.2) (August 23, 2023)

Added support for the customising Notification Centre theme.\
The Following fields can be modified using a custom theme

* Background colour of the Notification Item based on the read/unread state of the notification
* Text colour of the Notification title, message and date label based on the read/unread state of the notification
* Font can be updated for Notification title, message and date label based on the read/unread state of the notification
* The text colour and font of the label stating "No Notifications Found"

NOTE - Application developers can opt for the default theme for the standard template.

#### [Version 1.4.1](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.4.1) (August 16, 2023)

* iOS 13 support - Hydra SDKs are now supported iOS 13 and above
* Swift Tool version - Updated the swift tool version to 5.7 for backward compatibility

#### [Version 1.4.0](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.4.0) (August 10, 2023)

* **Notification Centre** -  Added support for notification centre through which application users will have a unified and streamlined notification experience, where they can easily access and manage their notifications in one place.
  * There are two frameworks HydraInboxCore and HydraInboxUI needs to be used to show Notification Centre
  * Notification Centre will be storing all the remote notifications locally
  * In the Notification Centre the notifications will be displayed in form of a list, consisting of
    * Heading
    * A short description
    * Time and date of receiving
  * The notifications which are unread have different styling than the one which are already read
  * The user can perform actions like
    * click on the notification
    * delete a particular notification
    * delete all available notifications from the Notification Centre
  * The user can click on the notification, which will navigate them to the correct path be it an external URL or a deep link inside the app
  * Adding dlr event push deleted
* **App Groups** - Added support for App Groups in order to function the Inbox feature seamlessly. App group is necessary to establish communication between the application and the Push Notification Service extension to perform the operations on received remote notification such as insertion in the database.
  * We added support for the App Group identifier strictly in the format\
    *group.\{app bundle id}.hydra* to make sure HydraInboxCore and HydraInboxUI function as expected.

# Insights+

## Extending customer status functionality to Insights

Last year, we rolled out the customer status feature on our platform. It was introduced on the platform to serve as a unified repository for capturing various customer statuses and made the existing Fraud status redundant.

Until now, we have been excluding users tagged as “Fraud marked” and “Internal” users under Fraud status for all the brands including the ones, where the brand is using Customer status (and not Fraud status). Our recent release, aims to solve this issue by making customer status based filters apply by default instead of Fraud status based filters wherever brands are using customer status feature to mark users as Fraud or Internal users.

Note that with this change in default filters; fraud, deleted & internal users based on Customer status would start getting excluded while fetching chart data.\
At the same time, fraud status based filters would be made null and void wherever fraud status based default filters were in action. And where fraud status based default filters are not in action - users would get a warning prompt asking them to change filter criteria from Fraud status to Customer status.

Overall, this change would result in a one-time update in the numbers which brands have been seeing across reports - but it is being done to weed out unwanted data which might skew the data. In case, brand users still want to checkout the data based on previous filters - the same is doable via new chart creation or via report filters.

For more, information you can checkout the user documentation here: <https://docs.capillarytech.com/docs/create-normal-migration-charts>

## Fixing KPI clutter on Insights

Over time, Insights has accumulated an extensive list of 700+ global KPIs, resulting in a crowded and sometimes confusing dropdown menu for users when creating charts.

To address this, we've introduced 2 separate tabs, My Org KPIs and ALL KPIS in the List of KPI section.

My Org KPIs will have the KPIs created by your org, along with the KPIs used within your org and  All KPIs will have KPIs available across all orgs.

For information, you can refer to the user documentation of [KPIs and Dimensions](https://docs.capillarytech.com/docs/kpi-and-dimensions).

# Capillary Data Platform

## Connect+

### **Enhanced Navigation for Connect+**

We're thrilled to announce an update to improve your navigation experience as we migrate Connect+ to Intouch in our clusters. This change involves a simple URL update, ensuring a seamless transition.

The Connect+ link on the home page of our product navigation, alongside other products like Engage+ and Loyalty+, has been updated. This change applies to the US, India, SG, Tata and EU clusters, which have already been migrated successfully, ensuring consistency and clarity in your access to Connect+ within Intouch.

Note: The authentication for Intouch and Connect+ still sits separately and will be taken up in coming quarters.

[Link](https://docs.capillarytech.com/docs/connect_plus#accessing-connect)

### **Enhanced SQL Join Options for Better Data Integration**

We are delighted to introduce a powerful feature in Connect+ that empowers you to select the type of SQL join command for your data integration needs. This enhancement offers more control and flexibility in merging your data. Here's what's new:

Inner Join (Existing Join): Retrieve rows with matching values in both tables, creating a precise merged table, perfect for scenarios like item purchases and cost calculations.

Left Outer Join: Access all rows from the left table and matching rows from the right table, ensuring no data is left behind. Ideal for scenarios like customer and order records.

Right Outer Join: Capture all rows from the right table and matching rows from the left table, providing comprehensive results, even when data might be missing.

Outer Join: Get a complete picture by including all rows from both tables, whether they have matches or not. This is the ultimate choice for a comprehensive view of your data.

Experience the power of choice with Connect+ and streamline your data integration processes like never before!

[Link](https://docs.capillarytech.com/docs/configure-actions#join-data)

### **Addition of Customer Registration Date**

We're thrilled to bring you a valuable enhancement to Connect+ that eases customer addition. You can now include a registration date for customers added through the "Customer v2 Add" template directly in the transformation block.

### **Default Enablement of v2 APIs for Seamless Integration**

We're excited to introduce a significant improvement for Connect+ setup that will enhance your integration experience. Starting now, v2 APIs are enabled by default for organizations across clusters. This change simplifies the setup process and eliminates potential errors in data flows arising due to this. Say goodbye to manual configuration – it's all set up for you!

### **Improved Workspace and Org Management**

We're excited to introduce a significant enhancement to Connect+ that streamlines your workspace and organization management for a smoother experience. Based on user feedback, we've made the following changes:

1:1 Mapping of Workspace and Org: Going forward, each workspace can be associated with one organization, and each workspace can have only one organization. This alignment simplifies the migration process to Intouch, reducing migration complexities for newer workspaces, and calls for better security measures being taken.

Efficient Org Selection: If an organization is already part of an existing workspace, it will no longer appear in the selection dropdown when adding a new workspace in the Connect+ admin UI. This ensures clarity and avoids unintentional duplicates.

Automated Workspace Removal: When an organization is deactivated on Intouch, the corresponding workspace in Connect+ will be automatically removed, including dataflows and configurations. This keeps your Connect+ environment up to date and organized.

We believe these enhancements will enhance your overall workflow and make your transition to Intouch even smoother, and productive with Connect+!

## Member Care

### **Point Conversion & Trigger Based Schedule:**

For single loyalty program Orgs, you can now view the Points expiry schedule, Conversion schedule and Trigger based point details on the new Member Care UI under Incentives > Points Schedule section.\
User doc: <https://docs.capillarytech.com/docs/incentive-details#points-schedule>

### **Card Status update through the new Member Care UI**

You can now update the card status and its label from the new Member Care UI.\
<https://docs.capillarytech.com/docs/customer-overview#change-card-status--label>

### **PII Deletion on new Membecare UI**

Continuing on our efforts to migrate all the brands to New Membercare UI, we have migrated the PII deletion functionality on the new UI.\
User doc: <https://docs.capillarytech.com/docs/manage-change-request#delete-member-account>

## APIs and other new features and changes

### **Enhancing Points Issued Event Schema**

Say hello to the unique Awarded Reference ID which we are thrilled to unveil as an exciting addition to the schema in the Points Issued Event. Each point issued, be it normal or promo, now the point block will be able to add its exclusive Awarded Reference ID.

To take advantage of this feature, simply enable the configuration "awardedReferenceEnrichmentEnabled." by raising a JIRA ticket with our sustenance team.

[Link](https://docs.capillarytech.com/docs/event-schema-payload)

### **API for Identifier Change in Auth Engine**

We're excited to announce a powerful addition to the Auth Engine in Intouch. With our latest API, you can now seamlessly update mobile numbers, email IDs, username and External IDs. Upgrade your experience with Auth Engine!

[Link](https://docs.capillarytech.com/reference/change_identifier-on-auth-engine)