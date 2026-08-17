---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# October-November-December 2023

# Loyalty+

## Unified targets

For any brand, cross-selling across verticals, products, and categories is a dream run. This is because, cross-selling means: more sales, an increase in diverse purchases, faster shelf clearance, etc.. 

After this enhancement, from now on, you'll be able to give multiple targets to your users from a single milestone. It's like multiple targets moving parallelly as a bundle, and the user has to achieve the bundle to get the benefits.

To know more in detail: [Unified targets, will be an interesting read](https://docs.capillarytech.com/docs/unified-milestones), and [API](https://docs.capillarytech.com/reference/create-unified-targets)

## Customer status & label action

If there is any metadata that is of high importance to any brand, it is the "customer status & label". This information helps brands in doing various types of actions (like running promotions, fraud control, etc..) on their customers.

From now on, you'll be having "action" in programs & promotions using which you can simply configure "status & label" for your customers in an extremely simple way. Not only this, you'll be able to write rules based on "status & label" which is a cherry on the top.

To know more in detail: [Customer status & label, a loyalty action](https://docs.capillarytech.com/docs/actions#customer-status--label), and [rule writing.](https://docs.capillarytech.com/docs/avgbasket-size#attribute---customer-status--label)

## Blockage of points

As of now, whenever a customer label is tagged to "points blockage", the points for the customer are being blocked when allocated using the "transaction point allocation". This could be a challenge as points can be given to customers using other actions also.

After this enhancement, whenever a customer label is tagged to "points blockage", the allocation of points will be blocked from all types of points actions like "target point allocation", "allocation points", etc..

To know more in detail: [Blockage of points](https://docs.capillarytech.com/docs/customer-2#suspended-fraud-suspected-fraud-confirmed-and-internal-customer-status)

# Incentives

## Badges

### Elevate Customer Experiences with Badge Groups and Rankings

Now marketers can control the customer views of badges by defining the badge groups, group ranking, and badge ranking. With customizable sorting, you can effortlessly highlight your badge collections, making it a visual feast for your customers.

<Image align="center" src="https://files.readme.io/6294cea-image2.png" />

Let's dive into the details, [here](https://docs.capillarytech.com/docs/customer_badges#placement-of-badges-for-customer-views).

### Save Time and Increase Efficiency by Creating/Updating Badges in Bulk

Say goodbye to the days of creating badges one by one. Introducing the power of bulk badge creation through CSV file upload which will save your time and increase efficiency.

Let's dive into the details, [here](https://docs.capillarytech.com/docs/create_badges).

### Retro Earn of Badges

This feature empowers you to recognize and reward your customers for past actions, even when events reach our system later due to integration delays or scheduled batch processing. With this update, badges can be retroactively earned based on event dates, ensuring a more comprehensive recognition of customer engagement. The feature seamlessly handles various badge states, from upcoming to live and expired, providing flexibility in retroactive scenarios.

Let's dive into the details, [here](https://docs.capillarytech.com/docs/customer_badges#retro-enrolment-and-issue-of-badges).

### Historical Data Migration of Badges

Don’t worry if you’re a brand already running badges in your loyalty programs and want to migrate to our platform. The system supports historical data migration of customer’s earned badges and allows you to migrate seamlessly.

Let's dive into the details, [here](https://docs.capillarytech.com/docs/customer_badges#historical-data-migration-of-badges).

### Send Communication to Customers on Earning Badges

Now you can send communication when the customers earn the badges on any transactional or non-transactional behavior celebrating their achievement.

<Image align="center" src="https://files.readme.io/1eb089c-image1.png" />

Let's dive into the details, [here](https://docs.capillarytech.com/docs/customer_badges#issuing-badges-and-revoking-via-loyalty-workflows-and-promotions).

## Rewards Catalog

### Introducing Cross-Workflow Rewards Integration

Now, as a marketing manager, you have the power to seamlessly link rewards to different workflows like loyalty, campaigns, journeys, and more. Our latest feature allows you to define the owner module while creating rewards, giving you unmatched control. Want to link rewards to specific instances? No problem! Rewards catalog lets you link rewards to multiple instances of the same owner. Worried about existing rewards? Don't be! We have ensured backward compatibility.\
Get ready to elevate your rewards strategy, boost cross-workflow collaboration, and make every reward count.

Let's dive into the details, [here](https://docs.capillarytech.com/docs/rewards-catalog-2#ownership-concept-in-rewards-catalog).

### Introducing Dynamic Custom Fields

Earlier brands could only create custom fields but couldn’t update or delete them but with our latest feature, brands can now update and disable custom fields to tailor their rewards marketplace like never before. Whether it's displaying personalized information, streamlining accounting, or enhancing partner reconciliation, the possibilities are endless.

Let's dive into the details, [here](https://docs.capillarytech.com/docs/rewards-catalog-2#enrich-your-rewards-catalog-view-with-the-newly-introduced-custom-fields).

## Coupons

Now you can add upto 20 custom fields for a coupon series which will help the brands to record more data related to coupon series for reporting and auditing purposes.

<Image align="center" src="https://files.readme.io/073481d-image3.png" />

Let's dive into the details, [here](https://docs.capillarytech.com/docs/incentive-related-settings#auto-generated-coupon-settings).

# Engage+

## Badges in Campaigns

Campaigns now support a new Incentive type called Badges. You can now enrol your desired audience group for a particular Badge. Badges serve as a form of gamification and a sense of pride and accomplishment within the user, reinforcing the targeted behaviours and boosting engagement.

Read more about Badges [here](https://docs.capillarytech.com/docs/badges-in-campaigns).

## FTP connector on Audience upload

While creating an audience group, many brands have a requirement to fetch customer lists from an external source on a daily basis. This external source could be (other than Capillary DB).

To achieve this, brands had to use the Segments capability on Insights+ to create audience groups which had customers from a source other than the Capillary database (could be client FTP or a third-party FTP that the client works with). But now you can do that directly in the Audience module, by importing a file from an external FTP. Please note that this is not available by default for all customers and approvals are required from the Business team in order to use this capability. Read about the import of audience using FTP [here](https://docs.capillarytech.com/docs/audience-management#import-via-ftp-connector).

## Barcode capability in Email

When it comes to personalized emails, we have gone one step further and in addition to addressing the customer using their names, and focusing on their recent activities, we can now have a customer identifier (in the form or barcode). The roadmap here is to use this capability to have a QR code which can redirect customers to a generic/personalized link—more information [here](https://docs.capillarytech.com/docs/barcode-generation).

## Credit config Mandate for Journeys

Till date, brands were able to create a journey without checking whether your org had credit rates configured for all channels that are used for communication in the journey.\
However, now there is a mandate to have the new credit system onboarded and channel rates configured in order to make a Journey live. This is done to ensure that there are no discrepancies in the way clients are billed.\
Information related to these configs is added to the [documentation](https://docs.capillarytech.com/docs/configure-journey#6-send-journey-for-approval).

## Zalo template

We now support the Zalo notification service (ZNS) to send messages through Zalo, a popular communication channel in Vietnam. Information on configuring the Zalo template and using Zalo for communication can be found [here](https://docs.capillarytech.com/docs/create-zalo-template).

## SDK

### Andriod

#### [Version 1.4.2](https://github.com/Capillary/hydra-sdk-android-maven/packages/1780353?version=1.4.0) (December 22, 2023)

[InApp Message - 1.0.1](https://github.com/Capillary/hydra-sdk-android-maven/packages/1863337?version=1.0.1)\
Added support for following types of in-app messages

* Rating
* Feedback
* AppRating

Added support for GIF images for all types of supported in-app messages

### iOS

#### [Version 1.4.4](https://github.com/Capillary/hydra-sdk-ios-packages/releases/tag/1.4.4) (December 19, 2023)

Added support for following types of in-app messages

* Rating
* Feedback
* AppRating

Added support for GIF images for all types of supported in-app messages.

# Capillary Data Platform

## Templates for OTP messages

Until now, for SMS and Email channels, the templates (or the message body) had to be passed as part of the body of the v2/otp/generate every time an OTP had to be sent. In case the template needed changing, there was a dependency on the implementation team to update the API request body at the integration layer. With the new OTP templates feature, systems integrators can now configure templates on our platform for various actions supported by the v2/otp/generate API. That means, that if the template needs changing, template updates can be made on our platform instead of making changes at the integration layer. [Documentation link](https://docs.capillarytech.com/reference/otp-template-guidelines)

Next update on this track: UI for configuring OTP templates + support for more channels.

## User On-boarding with Permissions

Until now, there was a dependency on the access team to assign permissions (access to Engage+, for example) to new users who are added to InTouch - our product platform - via the Admin Users import profile or via the user creation UI. With the new Connect+ template to on-board users to InTouch, Customer Success Managers (CSMs) can create new users and also assign permissions to them in one go, thereby removing dependency on the access team partially.[Documentation link](https://docs.capillarytech.com/docs/onboard-users-to-intouch)

Next update on this track: Support for updating existing user permissions using the same template.

## Set Expiry Period for Refresh Token Key

On successful authentication of a user on our auth engine, an access token is generated along with a refresh token or key. Until now, there was no way to set an expiry period for the refresh token. If it were compromised, a malicious attacker could use it to call the token regenerate end point and generate a new access token, thereby gaining access to protected resources. To prevent this scenario from occurring, we have introduced a new configuration to set an expiry period for the refresh token. [Link](https://docs.capillarytech.com/reference/validate-password#configuring-validity-for-the-key)

## Config to skip OTP validation for MFA

We have introduced configs in the auth engine for skipping the OTP validation step while setting up or resetting the Multi-factor Authentication(MFA) pin or password. System integrators can utilize these configurations for improving app usability, if required, in certain scenarios. [Link](https://docs.capillarytech.com/reference/multi-factor-authentication)

## Mitigating abuse of OTP generate API

Recently, we have seen a few bot attacks wherein the OTP generate API has been abused, leading to financial losses. We have made an enhancement to mitigate such attacks on auth engine OTP API. [Link](https://docs.capillarytech.com/reference/generate-otp-api#encrypting-the-api-payload)