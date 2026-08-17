---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# January-February-March 2024

# Loyalty+

## Promotions 2.0

Promotions 2.0 , an advanced version of Loyalty Promotions…..is a sleek addition to the Incentive Manager module, designed to hook your customers with gamified motivation & personalized experiences.

### Diverse range of loyalty promotions for improved engagement

Brands can now run diverse promotions like hand-raiser in travel & hospitality, click to collect in ecommerce, choose your benefit, cross-sell products or create offers that can be unlocked by a specific target segment

* Customer has a choice to opt for one of the promotions; 1 free night OR 10% discount on F\&B OR free airport transfers
* On a spend of 10,000 in a month, the customer unlocks 2X points on all incremental spends for the rest of the month.
* Customer plays scratch & win, and win 500 bonus points on purchase of denim in next transaction

**More details here:**[Link](https://docs.capillarytech.com/docs/advanced-loyalty-promotions#:~:text=Powered%20by-,Types%20of%20promotions,-Suggest%20Edits)

### Advanced Budget controls

\--> Optimize your budgets by limiting the promotions that can apply on a product or entire cart. Create promotions that are exclusive, selectively stacked with other promotions or always apply like birthday/anniversary promotions

* Customers are eligible to earn 500 bonus points or 5% extra points. Now, based on max benefit strategy, on a spend of 5000 – promotion of 500 bonus points is applied, while on spend of 15000 – promotion of 5% extra points is applied. Thereby optimizes the brand spend while also making it customer friendly.
* It's the end of season time, and the brand wants to apply only the EOSS SALE promotion, and doesn't want the other regular promotions to apply for the time being. On top of this, the only promotions which continue to apply are the birthday and anniversary promotions as a mandate.Simply mark the EOSS promotion exclusive & birthday & anniversary promotions as always apply. Promotions 2.0 will handle the rest.

**More details here :**[Link](https://docs.capillarytech.com/docs/loyalty-promotion-priority-order-stacking-strategy#:~:text=Powered%20by-,Loyalty%20Promotion%20Priority%20Order%20%26%20Stacking%20Strategy,-Suggest%20Edits)

\--> Advanced points allocation controls help you prevent any fraudulent behavior. Add terms and conditions like :

* Max points that can be earned by a customer in a day/ week/ month
* Max points that can be earned by a customer in an instance(customer activity) in a day/ week/ month
* Max points that can be earned by a customer across instances in a day/ week/ month
* Max points that be issued from a promotion across customers or number of instances in a day/ week/ month

**More details here :** [Link](https://docs.capillarytech.com/docs/loyalty-promotions#advance-settings:~:text=Limits%20when%20Promotions%202.0%20is%20enabled)

## New tracking capabilities in Milestones & Streaks:

Milestones & Streaks are one of the most powerful gamification & behavior creation capabilities using which brands can greatly increase their user-retention & loyal customer base. Now, these modules have become much more powerful with the added new capabilities.

**Now, brands can track:**

* Transactional fields (e.g.: Gross sales, New sales, Quantity, Visits, etc.)
* Behavioral events (e.g.: Number of times the user has updated the profile picture, Number of times the user has clicked on a CTA, etc.)
* Extended fields (e.g.: Amount of GST paid, Number of grams of gold purchased, etc.)
* EMF events (e.g.: Number of times the user has redeemed points, Number of times the user has referred new customers,  etc.)

**More details here:**[Link](https://docs.capillarytech.com/docs/milestones-new-flow#target-details)

## Streaks, a brand new gamification capability.

With the help of Streaks, brands can now induce continuous purchasing (or activity-doing) behavior in their customers using the principles of behavioral psychology. Brands now can implement use cases as per their requirement & get the desired outputs. For example, now brands can say:

* Drink one cappuccino coffee every day for 10 days, and get a coffee-lover badge.
* Make at least 2 transactions in a week for 5 weeks continuously, and get a $2 coupon.
* Walk 200k steps in a month for any 10 months in a year, and get a fitness badge & 10k points.
* Post 1 review every 3 days, and do this 6 times continuously to get 600 points.

**More details:** [Link](https://docs.capillarytech.com/docs/streaks)

## Alternate currencies (a new variation of reward currencies)

With this new capability, now brands can further gamify their end-user journey by awarding various kinds of reward currencies instead of just points. Brands can create different reward currencies like stars, stamps, boosts, etc.. as per their use cases & issue them to their customers along with points.

1. Very easy to create, and easy to use.
2. More control over their operation (can make them active/inactive, set a duration, etc..)
3. More control of vital properties like redeemability, returns, etc..
4. Available in the output of all important APIs

**More details:**[Link](https://docs.capillarytech.com/docs/alternate-currencies-copy)

## getCustomerLedgerInfo is timeless

From now on, whenever the getCustomerLedgerInfo is called without any start-date or end-date, by default it will bring all the data without any time limit restrictions.

[API Link here](https://docs.capillarytech.com/reference/get-ledger-information)

## A brand new milestones API

As of today, whenever you want to know the full details of a milestone/streak, multiple API calls have to be made. One for target groups, one for periods, one for targets, etc... This makes life a little difficult as these multiple calls can:

1. Make the app or the landing page slow to load
2. Bad use experience
3. More prone to error scenarios

To solve all these issues, we have built a brand new single milestone API that provides all the necessary information in a single call. Refer to this link for more details: [Link](https://docs.capillarytech.com/reference/get-all-milestones)

## Expiry of promised points

As of now, the expiry of the promised points is always calculated based on the bill date. This is not a very ideal scenario for any customer, as the new usable days can drastically decrease.

To solve this, we expiry of promised points can be based on:

1. Bill date
2. Points conversion date

**To config looks like the below:**

<Image align="center" className="border" width="90% " border={true} src="https://files.readme.io/a0bb0a3-Screenshot_2024-04-19_at_4.11.14_PM.png" />

# Incentives

## Coupons

### Coupon Redemption Just Got Better!

Now, you can update important details like txn number, txn amount, txn id and custom fields post coupon is redeemed. Yup, you read that right!

This upgrade means more flexibility and accuracy when tracking coupon redemptions. Whether you're keeping tabs on reward fulfillment or giving customers real-time updates on their mobile apps, this enhancement has you covered! 📈

**Use Cases:**

1. **Track coupons fulfillment in rewards catalog:** Update custom fields to monitor the fulfillment status of coupons within the rewards catalog. This enables real-time tracking of coupon status and facilitates accurate reporting.
2. **Sync the coupon redemption and txn number:** Pass transaction numbers easily post the Redeem Coupon API and Transaction Add API, straight from your POS system. This integration keeps coupon redemption and transaction records in sync, giving customers the latest information for audit and reporting.

**Refer to the API documentation[here](https://docs.capillarytech.com/reference/update-coupon-redeem-field).**

## Badges

### Presenting Badges UI: Your Gateway to Effortless Badge Management!

The UI enables you to

1. Create a badge

2. Edit a badge

3. Duplicate a badge

With just a few clicks, brands can now streamline their badge journeys, crafting badges that resonate with their audience and objectives. It's time to take your badge game to the next level with our production-ready Badges UI.

<Image align="center" src="https://files.readme.io/796591b-image1.gif" />

**Refer to the documentation[here](https://docs.capillarytech.com/docs/enabling-creating-a-badge).**

### Issue Badges from Campaigns

Now you can seamlessly enrol specific audiences into badges based on particular criteria, and effortlessly issue badges to target audiences, enhancing engagement, and recognition. For example

1. Issue VIP badge to high-value customers or top spenders, providing a sense of exclusivity and recognition.
2. Issue the badge to a specific audience who attended an offline event organized by the brand.

<Image align="center" src="https://files.readme.io/8fefd1b-image1.gif" />

Refer to the documentation [here](https://docs.capillarytech.com/docs/enrolling-and-issuing-badges-from-campaigns).

Brands who don’t use Engage product and want to issue the badges directly to a specific audience from external sources can use the bulk issual API for Badges.

Refer to the documentation [here](https://docs.capillarytech.com/reference/issue-badge-to-multiple-customers).

### Enrich badges view with the newly introduced custom fields

Now you can add custom metadata to badges. This feature will give brands the flexibility to show custom/personalized data in app/web and add metadata for audit and reporting purposes.

<Image align="center" src="https://files.readme.io/89055c3-Screenshot_2024-03-27_at_12.14.40_PM.png" />

**Refer to the documentation[here](https://docs.capillarytech.com/docs/customer_badges#enrich-customer-views-for-badges-with-the-newly-introduced-custom-fields).**

### Elevate Customer Engagement with Enhanced Customer Badge’s APIs!

Revolutionize badge management and get greater flexibility and insight into customer badge interactions. With the 2 new APIs, you can now seamlessly access comprehensive details of individual badges for specific customers, as well as efficiently retrieve lists of badges for various customer interactions.

**🏅Detailed Badge Information API:** Gain in-depth insights into individual badges for specific customers. With this enhanced API, you can effortlessly track customer badge achievements with unparalleled precision.

**Refer to the documentation[here](https://docs.capillarytech.com/reference/get-individual-badge-details-of-a-customer)**

🔍**Streamlined Badge Listings:** Easily retrieve lists of badges available for enrollment, available for issual, earned, and expired badges for a particular customer

**Refer to the documentation[here](https://docs.capillarytech.com/reference/get-all-customer-badges)**

### Fixed window based Limits for issual of Badges

Introducing a dynamic feature designed to empower marketers with enhanced flexibility and control over badge earning restrictions. With this update, you can effortlessly define fixed window limits, catering to brands with retroactive flows and enabling tailored restrictions aligned with their objectives.

<Image align="center" src="https://files.readme.io/47ec2f9-image3.gif" />

*The UI for this feature will come in future sprints.*

Refer to the documentation [here](https://docs.capillarytech.com/reference/fixed-window-use-case).

## Rewards Catalog

### Enhanced Visual Experience: Support for more Images and Videos in Rewards Catalog

Bringing a new feature in rewards catalog which will elevate user engagement and captivate audiences like never before.

* **Multiple Images:** Now add up to 10 captivating images for each reward in the catalog, with flexibility to customize naming.
* **Video Support:** Introduce up to 2 videos per reward, allowing seamless integration of multimedia content and enhancing the customer experience.

**Refer to the documentation here,[create reward](https://docs.capillarytech.com/reference/post-create-reward) and [update reward.](https://docs.capillarytech.com/reference/put-update-reward)**

### Elevate Customer Experiences with Groups and Rankings in Rewards Catalog

Now, marketers can effortlessly organize and showcase rewards exactly as they envision. With customizable groups and rankings, you have the power to curate a visually stunning catalog that captivates your audience.

Elevate your customers' experience by defining groups and rankings for each reward, allowing for seamless sorting and segmentation. Now, you have the flexibility to tailor the catalog to your brand's unique style and preferences.

<Image align="center" src="https://files.readme.io/47e9942-image2.png" />

**Refer to the documentation[here](https://docs.capillarytech.com/docs/rewards-catalog#elevate-customer-experiences-with-groups-and-rankings-in-rewards-catalog).**

### Introducing Multilingual Custom Fields for Enhanced Brand Personalization!

Now, you can tailor the experience for your customers by providing custom field data in their preferred language, enhancing engagement and satisfaction. This feature will allow you to define custom fields in different languages for each reward in the catalog.

With English as the default language and fallback option, you have the flexibility to create custom fields in multiple languages. This update will empower the brands to effortlessly localize their rewards catalog, providing a seamless experience for customers worldwide.

**Refer to the documentation here,[create reward](https://docs.capillarytech.com/reference/post-create-reward) and [update reward.](https://docs.capillarytech.com/reference/put-update-reward)**

### Introducing Point Redemption Controls for the Catalog

Initially brands were facing the issue where they couldn’t control the points that customers redeem on the catalog which led to over redemption of points on the catalog thereby decreasing new business. But now, marketing managers can effortlessly

* Control the points that can be spent on the catalog
* Prevent over redemption in the catalog
* Encourage customers to use points during transactions, ultimately driving more business.

Refer to the documentation [here](https://docs.capillarytech.com/docs/rewards-catalog#introducing-point-redemption-controls-for-the-catalog).

### Implement Points+Cash journeys in Rewards Catalog

Brands can now expand their catalog to include rewards purchased with cash or a combination of points and cash, offering customers greater flexibility and incentive to engage with the loyalty program. Brands gain enhanced flexibility and control over reward issuance with options including

* FREE
* POINTS
* CASH
* POINTS + CASH

<Image align="center" width="500px" src="https://files.readme.io/b154f01-image2.png" />

Refer to the documentation [here](https://docs.capillarytech.com/docs/rewards-catalog#implement-pointscash-journeys-in-rewards-catalog).

# Engage+

## 1. In app as a new communication channel

Keeping the demand of every marketer in mind and the rise of mobile first channels in different markets, we have added In app messaging as a one more channel to our portfolio. You know what is even more special about this channel ? This entire capability is powered by our very own Hydra SDK.

In app messaging enables you to reach the customer when they are active on your app. So while you are already in the customer’s sight and their mind, you have that leverage to grab the customer’s attention one more time, right at the perfect moment. You can currently achieve the in-app communication in four different layouts as per your requirements - Full screen, Popup, Top banner, Bottom banner.

There's more on the roadmap - styling of the In app communication, drag and drop capability, HTML based configuration, ready-to-use feedback templates. Watch this space to hear more on the new launches.

For the current capabilities, you can refer to the documentation [here](https://docs.capillarytech.com/docs/in-app-message).

<Image align="center" className="border" border={true} src="https://files.readme.io/594484d-InApp.jpeg" />

## 2. Campaigns execution only after sync completion

Now at some point in our campaign's journey, we all have faced issues wherein due to unavoidable technical issues, EI sync cannot be completed as per the schedule. Due to this, the audience refresh is delayed and hence the recurring campaigns using an audience group, might not get executed as per the expectation.

Hence, we have introduced a capability to execute a recurring campaign only when we have a confirmation that EI sync has happened and audience refresh is up to date. Know how to configure this for your brands [here.](https://docs.capillarytech.com/docs/options-to-schedule-messages#scheduling-messages-post-audience-sync-confirmation)

<Image align="center" className="border" border={true} src="https://files.readme.io/ebd0fb3-Campaign_Sync.png" />

## 3. Recurring message expiry alert

For brands who run recurring campaigns for longer durations, you now have a capability to set a reminder alert for the recurring campaigns that are approaching their end date. This will definitely take away all your hassles of re-configuring an entire campaign if it has expired.

Know how to set it up for your brand [here.](https://docs.capillarytech.com/docs/report-notification-and-failure-alert-settings#recurring-message-expiry-alert)

<Image align="center" className="border" border={true} src="https://files.readme.io/a5088ef-Recurring_message.png" />

## 4.  Test and Skip Wait capability in Journeys

**Current scenario:**\
Testing any Journey workflow today has been a very tedious process. One of the major reasons being that most journeys use Wait and Event based Wait blocks very commonly.

In such a case, if a brand has configured a wait block of 2 days, then during the testing, the brand actually has to wait for 2 days before they can be assured that the journey is working properly and the customer is moving to the next block as per the configurations.

**New scenario:**\
Brands can now skip the wait time and proceed to the next block immediately. This will help them save a lot of time while testing, and give much more flexibility in terms of the number of scenarios they want to test.

<Image align="center" className="border" border={true} src="https://files.readme.io/d07f007-255a796-Skip_wait_.gif" />

To know more about how you can use this feature, read more [here](https://docs.capillarytech.com/docs/testpreview-journey). For brands using Journeys, do test out this feature and let us know the feedback !

## 5. A/B Testing

A lot of loyalty engagement platforms give you the option of A/B testing your messages before deploying them. While most allow you to configure a basic test, they discount the intricacies involved in conducting modern marketing experiments. These include:

1. Audience size

A large sample size reduces the random variation and increases the reliability of an A/B test. This is particularly important in marketing A/B tests wherein emotions elicited by the test could dramatically skew outcomes.

Capillary’s A/B testing solution chooses the test audience at random. All you have to do is define the total number of test participants. We recommend including at least 20-30% of the total audience to conduct the test to improve reliability.

2. Test criteria

Not all A/B tests are created equal. And they certainly can’t be measured the same way. For instance, open rate can’t be the sole success metric for testing a conversion-focused message. Similarly, delivery rate cannot define the success of a message with an incentive.

Capillary understands this and allows you to set custom test criteria to determine campaign success. You can choose up to 5 engagement and incentive KPIs in total, depending on the engagement channel, and test the effectiveness of the message. 

3. KPI weightage

The goal of the message must determine how you test it. For instance, sure, deliverability, open rates, and redemptions all matter when sending an incentive message. But redemptions matter most. And most loyalty engagement platforms don’t let you evaluate message success on such granular terms.

Capillary allows you to add weightage to individual KPIs, including incentive redemptions, to find the most impactful marketing message reliably.

<Image align="center" src="https://files.readme.io/a81bc46-AB_Testing.gif" />

Learn more about setting up an A/B test within Journeys [here](https://docs.capillarytech.com/docs/ab-testing_overview#notification-on-the-ab-testing). And if you’re having any trouble with the setup, shoot an email to our CS team. They’ll get back to you.

## 6. Adding Multiple WhatsApp numbers

Adding more numbers under 1 Whatsapp Account - This had been one of the most sought after (and rightly so) features for Whatsapp and we now support the same. You can request PST teams to add multiple numbers under a brand's whatsapp account which you can select to run campaigns from. Once the number is added, it would appear within the campaign delivery setting like this.

<Image align="center" className="border" border={true} src="https://files.readme.io/dffd1e4-image.png" />

You can read more on the documents page [here](https://docs.capillarytech.com/docs/delivery-settings#adding-a-new-whatsapp-number-to-the-source-account).

## 7.Ability to add Header and Footer in Whatsapp messages

You might have received messages like this from brands:

<Image align="center" className="border" border={true} src="https://files.readme.io/98681fe-image.png" />

Brands can add such headers and footers to their whatsapp campaign and make it more engaging as well. [Here ](https://docs.capillarytech.com/docs/create-whatsapp-content)are more details on how to go about it.

## 8. Quick Reply buttons on WhatsApp

Quick Reply buttons on WhtasApp are used to capture instant response by end users by making it easier for them to respond to a message through providing 2-3 options. These responses are stored and used as important insight to consumer behaviour. Here's how it looks like:

<Image align="center" className="border" width="500px" border={true} src="https://files.readme.io/c0be475-image.png" />

[Here's](https://docs.capillarytech.com/docs/create-whatsapp-content) how you can add these quick reply buttons in your campaigns.

# Insights+

## Enabling encryption capabilities in Exports

In recent quarters, we've focused on enhancing Customer Data Security by identifying vulnerabilities and implementing crucial security measures. Some of those enhancements being, placing limitations on downloads from Databricks & enabling masking of PII information in Analytics tables.

During our evaluation of data exports, we recognized a potential security risk with SFTP-based transfers if data were compromised. To address this, we've introduced an update enabling users to export encrypted files to their SFTP locations. Users can now set up PGP keys within the Insights Settings screen to configure exports securely. Currently, our Insights Export feature supports PGP algorithm-based encryptions.

Please note that this feature won’t affect the already scheduled exports but encryption can be enabled as per the brand’s requirement by editing the schedule.

Currently, we have released this feature for around 70% of the brands and we will be releasing it for the rest of them in a phased manner by the end of this quarter.

For more information, please refer to the documentation here:

<https://docs.capillarytech.com/docs/settings#data-encryption-settings-for-export>

## Audience Filter based reporting - Enhancement

Until recently, brands faced a challenge when attempting to compare audience behavior before and after campaigns. This was because Insights restricted access to audience data, providing only the audience list version at the report end date. Consequently, for pre-campaign analysis, when the audience didn't yet exist, brands were unable to conduct thorough assessments.

In this release, we've addressed this issue with a minor enhancement to the report generation logic. Now, if no audience existed at the report end date, we utilize the first version of the Audience, enabling brands to conduct comprehensive analyses across campaign timelines.

For more information, please refer to the documentation here: <https://docs.capillarytech.com/docs/add-audience-group>

# Capillary Data Platform

## Updates to Connect+

### 1. Behavioural Events' Ingestion Template

Connect+ introduces the Behavioral Events' Ingestion template which empowers our users to ingest Behavioral Events, as already configured in Org Settings Page, to our platform by uploading files containing these events and their attributes instead of directly receiving it through webhooks. Even retro events will be allowed to be ingested through this template. Users can seamlessly handle FTP locations, decrypt encrypted files, schedule triggers and map event attributes with a limitation of one single event per dataflow.

For more information, refer to the [user documentation](ttps://docs.capillarytech.com/docs/behavioural-events-ingestion).

### 2. Error Summary, Metrics and Logs

Connect+ brings you a dissection of your dataflow misses through error summaries and error logs!!

With our new dashboard, effortlessly navigate through the intricacies of error management, gaining a comprehensive overview of error occurrences and their associated blocks. Easily pinpoint the root causes of errors, as each block's contribution is meticulously unveiled, facilitating swift troubleshooting and enhancing your workflow efficiency. Delve deeper into specific error messages, armed with the frequency and block of occurrence, equipping you with the clarity needed to resolve issues with precision.

Do check it out [here](https://docs.capillarytech.com/docs/analyse-dataflow-performance)!

### 3. Metrics on Home Page

With our latest release, keeping an eagle eye on your dataflows has never been easier. Seamlessly access crucial metrics such as error counts and data processing accuracy directly from the Connect+ homepage. No more tedious navigation through individual dataflows to grasp the big picture – now, effortlessly monitor the health of your operations at a glance.

But that's not all – we've taken it a step further to empower your decision-making process. With the ability to view “Accuracy%”, and compare multiple dataflows side by side, evaluating performance and identifying trends has never been more straightforward.

Know more about it [here](https://docs.capillarytech.com/docs/connectplus_getting_started#analyze-dataflow-performance)!

### 4. Transformation Block Revamp

Are you tired of searching the relevant API fields in the Transformation Block? Afraid to make mistakes when typing out the headers for these API fields? Well, worry no more!!

We have revamped our current Transformation Block to equip it with dropdowns and the ability to pick headers from a sample file you gave to Connect+. This will help you easily navigate through the block resulting in a faster configuration of your dataflow in conjunction to lesser chances of making typos resulting in errors.

Do check it out [here](https://docs.capillarytech.com/docs/configure-actions#transform-data)!

### 5. New Template: Audience Reload from FTP

Now Connect+ allows you to refresh files in an SFTP location at set intervals giving near real-time capabilities while empowering users to automatically update the audience lists that we have in Engage+ with the same name.

Know more about it [here](https://docs.capillarytech.com/docs/audience-reload-from-ftp)!

### 6. SFTP to SFTP with Headers Definition Template

Introducing the new SFTP to SFTP with Headers Definition Template – the ultimate solution for your file transfer woes!

Now, you can seamlessly download, unzip, remap headers, and push files between servers with ease. Whether you're renaming columns from "TransactionAmount" to "trans\_value", adding missing headers or transforming the values of a column via expressions, this template ensures your data lands just the way you need it.

Say goodbye to manual header adjustments and hello to streamlined transfers!

Do check it out [here](https://docs.capillarytech.com/docs/sftp-to-sftp-with-headers-definition)!

## New User Management

The new user management is live that helps org owners/admins to manage all other org users instead of being dependent on other teams for the same task.

With this feature, users with special access (owner or admin) will be able to:

1. Adding new users to org - vial email and bulk
2. Assign role to user as "owner" or "standard" user - an owner would have complete access to an org, whereas a standard user may have access to limited entities like store, zone etc.
3. Removing user(s) from an org
4. Assigning permissions for new and existing user(s).
5. Customise permission set(s) to suit the requirement of brand or vertical.
6. Update access level or permission(s) for user(s)

Do check out more details [here](https://docs.capillarytech.com/docs/onboard-intouch-users).

## New Request Workflow

Until now, Membercare had selected customer profile actions behind the maker-check approval flow. Once an action was put behind such a workflow - brands had a way to gate-keep critical user actions and track them efficiently.\
However, the user actions where such a maker checker flow was supported were selected & very standardized in nature. With the release of the new request workflow framework, we can now:

1. Gate-keep new user actions quickly on the technical side.
2. Support brand-specific maker checker workflows, which were hitherto not feasible on the platform.

### What’s a maker checker flow?

Certain actions on user profiles are very critical & brands sometimes want to gate-keep them from either getting abused or to ensure the sanctity of customer data.\
Here, people want a workflow to gate-keep it - wherein a user would raise a request & some other users would approve it in a similar scenario.

### What features do the request workflow support?

Brands can use standard workflows - which come as an Out-of-box solution to cater to basic requirements around maker checker processes.\
These standard flows are designed to be parameterized in nature so that brands can add their brand-specific configurations.\
For example:

* Goodwill points upper cap
* Auto-approval feature.

Apart from this, we can now create & support more customized and complex use cases like:

* Multi-approval workflows
* Extension/complex logic-based validations
* Organization unit-specific maker checkers are now supported

**Caveat:** While customization features can now be supported on the product; it would still need to be created & set up by your service delivery team & involve relevant costs.

User actions that are currently using the new request workflows:

* Change customer status
* Points redemption request
* Issue Goodwill points
* Earn Badge
* Issue Badge

## Expanded Channel Coverage in Send Communications API: Now Includes WhatsApp and Zalo

We have upgraded the send communications API and broadened its channel coverage to include WhatsApp and Zalo. For details, please go [here](https://docs.capillarytech.com/reference/v2-send-communication-message).

## Enhanced OTP Communication via WhatsApp and Zalo

More channel news: If your brand is using Capillary’s Authentication Engine as the identity manager, you can now start [sending authentication OTPs](https://docs.capillarytech.com/reference/authentication-configurations#integrating-whatsapp-and-zalo-for-otp-communication) to customers via WhatsApp and Zalo.

## Configurable Account Locking for Enhanced Security

More Authentication Engine news: We can now configure a threshold for a number of incorrect OTP/password validation attempts after which the customer account gets locked. The locking period is also configurable. For implementation, please go [here](https://docs.capillarytech.com/reference/authentication-configurations#account-locking-feature).

## Android Hydra SDK

### Version 1.4.3

### Redesigned layouts of Header and Footer type in-app messages

* The layouts for the Header and Footer type in-app messages is updated as per the given mockup.
* Primary CTA action is provided to all the components shown on in-app messages.
* Now user can click on the message text, image or the CTA button to perform the primary CTA action.

## iOS Hydra SDK

## Version 1.4.5

### Redesigned layouts of Header and Footer type in-app messages

* The layouts for the Header and Footer type in-app messages is updated as per the given mockup
* Primary CTA action is provided to all the components shown on in-app messages
* Now user can click on the message text, image or the CTA button to perform the primary CTA action
* Added support to send gateway and token information in the form of an array.