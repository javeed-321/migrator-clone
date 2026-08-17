---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# July - August - September 2025

# Platform

## Enhancement of Search criteria

The customer search has been enhanced to support searching for customers who have multiple cards. You can now search for a customer by their card number or card external ID. The [Create Search Criteria API](https://docs.capillarytech.com/reference/create-meta-search#/) documentation and the [Search API documentation](https://docs.capillarytech.com/reference/perform-search#/) have been updated accordingly.

## Handling linked loyalty cards during PII deletion

Introduced a new configuration, CONF\_DELINK\_CARDS\_PII\_DELETION, that lets administrators define how linked loyalty cards are handled when a customer's PII is deleted. When enabled, cards are automatically delinked during PII deletion, and their status is updated to Not issued or Deleted as per the configuration. **Documentation:** <https://docs.capillarytech.com/docs/pii-configuration#/handling-customer-cards-during-pii-deletion>

## Member Care Extensions via Vulcan

You can now extend the Member Care interface using **Vulcan-based extensions**. This enhancement lets you add new actions or custom pages directly within Member Care using Vulcan apps.

Previously, extending Member Care such as adding new tabs or actions was possible only through Sharingan apps. Using Vulcan required replicating the entire Member Care setup before making changes.

<https://docs.capillarytech.com/docs/vulcan-application-extension-in-member-care#/>

# Engage+

## Customize unsubscribe landing page

You can now customise the default unsubscribe landing page using Vulcan. You can personalise elements such as brand logos, custom messaging, and language-specific versions to match your brand’s voice. To enable this, contact your customer success executive. For details, refer to [Unsubscribe Landing Page Customization](https://docs.capillarytech.com/docs/configure-email-content#/customize-unsubscribe-landing-page).

<Image align="center" border={true} width="40% " src="https://files.readme.io/09002de767ba7d045df072b1c1e7a23f19017c2f89d6e1c59414511ac32d8e21-image_4.png" className="border" />

## Liquid support for all channels

You can now use Liquid expressions across all engagement channels - email, SMS, push notifications, and in-app messages. This allows you to create dynamic, personalized content consistently across platforms. For details, refer to [Add Dynamic Content Using Liquid](https://docs.capillarytech.com/docs/add-dynamic-content-using-liquid-#/).

## Message Throttle Settings

You can now control the rate of message delivery to large audiences using throttle settings, allowing you to manage hourly limits and reduce delivery overload for better performance. This setting is available for immediate or scheduled one-time campaigns​​ with a minimum audience size of 3,000 customers. For details, [refer to Message Throttle Settings](https://docs.capillarytech.com/docs/schedule-message#/message-throttle-settings).

<Image align="center" border={true} width="45% " src="https://files.readme.io/c089643936b26a153b643822c5a7a51fd14ef5c6ff1ae602f0bf416c157d4177-Screenshot_2025-08-01_at_6.27.48_PM.png" className="border" />

## Engagement Events in Journeys

You can now control journey flows based on user engagement using the Wait for Engagement Event block. This allows you to track if a customer opens a message or clicks a link, and guide them through different paths accordingly to deliver more personalized experiences. For details, refer to [Wait for Engagement Event](https://docs.capillarytech.com/docs/flow-control-building-block#/wait-for-engagement-event).

<Image align="center" border={true} width="45% " src="https://files.readme.io/4cc6de4a429b80f779409156caf26f1c7ced9ea620b0677754e1296accb41f03-Screenshot_2025-08-01_at_6.30.58_PM.png" className="border" />

## Skip Campaign Execution for Same Audience List

You can now automatically skip campaign execution if the audience list on a particular day is the same as the previous day. In such cases, the campaign is skipped for that day and you’ll be notified via alert. For details, refer to [Skip Campaign Execution for Same Audience List](https://docs.capillarytech.com/docs/recurring-campaign#/step-4-monitor-and-troubleshoot).

## Limit Messages Sent Through Campaigns

You can now limit the number of messages sent to customers across campaigns to prevent over-communication. Set daily, weekly, and monthly message limits per channel and overall to improve customer experience. For details, refer to [Setting up Communication Limits](https://docs.capillarytech.com/docs/limit-message#/).

## Unified link tracking across all channels

Link tracking is now supported across all input fields and communication channels, including text and media components. This enhancement ensures consistent engagement tracking for emails, SMS, push notifications, in-app messages, and more, even when using shortened URLs. For more details, refer to the [documentation](https://docs.capillarytech.com/docs/configure-campaign-level-settings#/enable-tracking-of-clicked-links).

## Journey alerts configuration

Journey Alerts can now be configured to notify users by email about key events such as approvals, status changes, and upcoming expiries. This helps teams stay informed and take timely action without manually checking journey statuses. For more details, refer to the [documentation](https://docs.capillarytech.com/docs/configure-journey#/journey-alerts).

## Support of date attributes in event-based wait block

You can now use new **date-related conditions** in Journeys to check if a user has performed an event on a specific date or within a given date range. For details, refer to the [documentation](https://docs.capillarytech.com/docs/overview-journey#/conditions).

## Control when in-app messages are displayed

You can now choose when to display in-app messages — either immediately when the app is open or on the next app launch. This flexibility helps you prioritize time-critical alerts or schedule non-urgent messages for better user engagement. For more details, refer to the [documentation](https://docs.capillarytech.com/docs/schedule-message#/message-display-configuration-for-in-app-messages).

# Automatic fallback for WhatsApp and Viber campaign delivery

A new automatic fallback mechanism ensures higher delivery rates for WhatsApp and Viber campaigns. If a customer’s [V2 profile](https://docs.capillarytech.com/docs/customer-profiles#/v2-profile-identifier-addupdate) lacks a WhatsApp or Viber number, the system now checks linked SMS profiles and uploaded audience lists before marking the message as failed. The [documentation](https://docs.capillarytech.com/docs/understand-audience-reachability-status#/whatsapp-and-viber-fallback-mechanism) is updated accordingly.

## Unified link tracking across all channels

Link tracking is now supported across all input fields and communication channels, including text and media components. This enhancement ensures consistent engagement tracking for emails, SMS, push notifications, in-app messages, and more, even when using shortened URLs. For more details, refer to the [documentation](https://docs.capillarytech.com/docs/configure-campaign-level-settings#/enable-tracking-of-clicked-links).

## Increased limit for custom tags in CSV audience uploads

You can now add up to 15 custom tags when uploading a CSV file to create an audience group. This update gives you more flexibility to include detailed customer attributes for better segmentation. The [documentation](https://docs.capillarytech.com/docs/create-audience-group#create-audience-group-using-csv-file-1) is updated accordingly.

## New metric in campaign performance dashboard

A new metric called **Converted** is now available in the Campaign Performance view. It shows the percentage of customers who completed the defined conversion goal, helping you measure campaign effectiveness more precisely. The [documentation](https://docs.capillarytech.com/docs/view-campaign-reports#/campaigns-overall-performance-report) on the Campaign reports is updated accordingly.

## Webhook block in journey

A **Webhook block** is now available in Journeys, enabling real-time data exchange with external systems. You can send event details via POST or PUT methods using configurable headers, query parameters, and JSON payloads for external processing. For details, refer to the [documentation](https://docs.capillarytech.com/docs/action-building-block#/webhook).

## Journey history: real-time customer path tracking

Monitor and analyze customer progression in real time with the new Journey History feature, providing detailed logs of each step a customer takes. Search by name, ID, email, mobile, or external ID, and track entry timestamps and block status for single or multiple journey entries. For more details, refer to the [documentation](https://docs.capillarytech.com/docs/search-user-journey-history#/).

## Event context tags support across all journey channels and fields

Event context tags are now resolved consistently across all communication channels in Journeys, including Email, WhatsApp, In-App and Push. These tags can now be used in all input fields, such as subject lines, media, CTAs, and message titles. The following documents are updated accordingly: [Configure Push Notification Content](https://docs.capillarytech.com/docs/configure-push-notification-content#/) ,[Configure Email Content](https://docs.capillarytech.com/docs/configure-email-content#/configuring-the-email-body-content) ,[Configure In-app Message Content](https://docs.capillarytech.com/docs/configure-in-app-message-content#/) ,[Configure Whatsapp Content](https://docs.capillarytech.com/docs/configure-whatsapp-content#/)

## Hydra SDK - Android

### Version 1.9.13

**User Analytics**

* Granular Data Tracking: Gain deeper insights with the new ability to track specific types of user data changes, such as profile or preference updates.
* Push Token Analytics: Now includes improved analytics for tracking the generation and updates of push notification tokens.

For more details, refer to the [documentation](https://docs.capillarytech.com/docs/android-sdk-api-reference#user-update).

### Version 1.9.14

**Rich Push Notifications**

* Android 14+ Compatibility: The auto-carousel feature for rich notifications is now fully compatible and reliable on Android 14 and newer versions.
* Graceful Fallbacks: Notifications will continue to function correctly even if specific permissions are not granted by the user.
* Enhanced Stability: Improved error handling and recovery mechanisms have been implemented for a more resilient experience.
* Improved Debugging: Added comprehensive logging for permission status and scheduling to simplify troubleshooting.

For more details, refer to the [documentation](https://docs.capillarytech.com/docs/push-notification#rich-push-notification).

### Version 1.9.15

**In-App Messaging**

* Advanced Customization: Applications now have enhanced control and flexibility to manage the rendering and interaction of In-App messages.
* Reliable Deeplinks: Deeplinks within In-App messages now navigate correctly when tapped by users.
* Improved Display Consistency: The internal structure for message layout and view handling has been enhanced for more reliable display.

**Performance and Stability**
Enhanced Stability: Internal code structure has been improved for better performance and maintainability.

For more details, refer to the [documentation](https://docs.capillarytech.com/docs/in-app-messaging).

# Incentives

## Update merchant details

Rewards Catalog now allows merchant information to be updated. This includes details like merchant metadata, images, and videos. This provides greater flexibility and control over vendor data, ensuring accuracy.

For more details, refer [here](https://docs.capillarytech.com/reference/update-vendor-metadata#/)

## Standardized time zone support in Rewards Catalog APIs

The reward catalog APIs have been enhanced to ensure that all time-based evaluations within the Rewards Catalog align with the organization's time zone.  To achieve this, a <Anchor label="new configuration " target="_blank" href="https://docs.capillarytech.com/reference/timezone-management#/">new configuration </Anchor>has been introduced that, when enabled, standardises the time zone according to the organization's settings in the reward catalog APIs.

## Filter rewards by customer’s actual purchase date

You can now <Anchor label="filter user rewards based on the event date" target="_blank" href="https://docs.capillarytech.com/reference/get-rewards-for-user-new-api#/">filter user rewards based on the event date</Anchor>, the actual date and time a customer performed an activity, rather than only the system’s processing date.

## Change upcoming rewards to ended reward before launch

You can now  end an upcoming reward before it goes live. By s<Anchor label="etting the reward’s end date to a date earlier than its start date" target="_blank" href="https://docs.capillarytech.com/reference/put-update-reward#/">etting the reward’s end date to a date earlier than its start date</Anchor>, the reward is marked as ended. This ensures that only valid and intended rewards are ever available to customers.

## Transaction-based coupon filtering

The <Anchor label="API used to retrieve available coupons" target="_blank" href="https://docs.capillarytech.com/reference/get-customer-coupons-basic#/">API used to retrieve available coupons</Anchor> for a customer has been updated to support filtering coupons based on the transaction number. This helps in scenarios such as a return transaction where you want to cancel the coupons provided as part of the transaction.

## Exact coupon expiry time in v2 API

The v2 <Anchor label="Get Customer Coupon API " target="_blank" href="https://docs.capillarytech.com/reference/get-customer-coupons-basic#/">Get Customer Coupon API </Anchor>now includes a new field, validTillDateTime, that shows the exact expiry timestamp for a coupon.
Previously, when a coupon’s expiry was updated to a specific time (for example, 2025-05-09T12:35:00Z), the v2 API did not reflect the exact timestamp. Instead, it was showing the expiry as the end of the day (23:59:59). This made this API inaccessible for brand adoption.
This update ensures that you can now use the v2 API with confidence for precise and consistent coupon expiry information.

## Create and update cart promotions through APIs

Promotions can now be created and updated directly through the exposed <Anchor label="promotion APIs" target="_blank" href="https://docs.capillarytech.com/reference/create-cart-promotion-api#/">promotion APIs</Anchor>. This makes it easier to sync offers with external systems, automate workflows, and launch promotions faster.

## Badge earn event can now align with customer action time

Badges now allow the earn event date to be set 24 hours into the future, which allows badges to be earned based on when the customer's action occurred, not just when the system processes it.
The [documentation](https://docs.capillarytech.com/reference/issue-badge-to-the-customer#/) has been updated to reflect the same.

# Connect+

## SSH Support for SFTP Connections

The SSH authentication feature is now available in the Connect to Source and in Connect to Destination blocks for templates that use SFTP. This enhancement allows users to connect to SFTP servers using an SSH private key in addition to the existing password-based method. The private key must be in OpenSSH format with valid header and footer tags and can include an optional passphrase for added security.
<https://docs.capillarytech.com/docs/connect-to-source#/ssh-authentication>