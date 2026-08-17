---
updatedAt: 2026-07-28T10:50:28.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Engagement Building Block

The engagement block contains different types of channels that can be used to engage with your customers. A marketer can add an engagement block (of a particular channel) and configure the content in that block (specific to that channel) to reach out to users.

The various engagement blocks available are:

1. SMS
2. Email
3. M-push
4. WhatsApp
5. Zalo
6. Line
7. Viber
8. Zalo
9. RCS

### Use Case

A brand wants to include customers whose transactional value is greater than $10,000 in the Journey and communicate the discounts that can be availed by these customers via SMS.

### Adding engagement block

To add an engagement block,

1. Click on the engagement block.
2. In the **Engagement name** text box, enter a name for the engagement block.
3. Click **Add creative**.
4. Select an existing template or create a new template. For information on creating templates, see [SMS Template](https://docs.capillarytech.com/docs/create-sms-template-#/), [Email Template](https://docs.capillarytech.com/docs/create-email-template-#/), [M-Push Template](https://docs.capillarytech.com/docs/create-push-notification-template#/), [WhatsApp template](https://docs.capillarytech.com/docs/create-whatsapp-template#/), [ZALO template](https://docs.capillarytech.com/docs/create-zalo-template-#/), [ Line template](https://docs.capillarytech.com/docs/create-line-template-#/), [Viber template](https://docs.capillarytech.com/docs/create-viber-template-#/) and <Anchor target="_blank" href="https://docs.capillarytech.com/docs/create-rcs-template-">RCS template</Anchor>. You can use the Channel Priority block to send the communication message based on the availability of the customer's communication channel. For more information, refer to the [documentation on Channel Priority in Journey](https://docs.capillarytech.com/docs/channel-priority#/).

   **Note**: In the case of email communication, ensure that the customer’s email ID is not marked as INVALID, as emails may be blocked for such addresses. You can override this by enabling <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-email-settings#configure-email-whitelisting">email whitelisting</Anchor> in Engage settings, which allows emails to be sent to whitelisted addresses even if their status is INVALID.
5. Add the required content. To configure the content, refer to the  respective [Engagement Channel](https://docs.capillarytech.com/docs/engagement-channels#/) . While configuring the content, you can also add labels. For more information on supported labels, refer to  [Supported Labels for Engagement Channels](https://docs.capillarytech.com/docs/supported-labels-for-engagement-channels#/).

   **Note**:  If you use personalization tags in your communication content, ensure that the corresponding values are available when the Journey is triggered. Missing values may prevent the communication from being sent.
6. Click **Done**.
7. To add incentives along with the engagement message, click **+Add incentives** and add desired incentives. Currently offers, points, cart promotions, gift vouchers and badges are the Incentives supported in Journeys. For more information on how to add incentives, see [Add incentives](https://docs.capillarytech.com/docs/engagement-building-block#/incentives-in-engagement-message).
8. To remove or change incentives, click the three dots adjacent to the offers/points and click **Remove/Change**`<Incentive name>`**.**
9. To preview or remove the template added, click the three dots inside the template and click **Preview/Remove.**
10. In the **Delivery settings**, enter the delivery settings details. See [Delivery settings](https://docs.capillarytech.com/docs/delivery-settings).

<Image src="https://files.readme.io/8277f2e-Configuring_creatives.gif" align="center" border={true} />

<Callout icon="📘" theme="info">
  ### Note

  If you use loyalty-related labels in a journey, adding an <Anchor target="_blank" href="https://docs.capillarytech.com/docs/points#configure-points-earn-conditions">earning</Anchor> and <Anchor target="_blank" href="https://docs.capillarytech.com/docs/points#expiry-conditions">expiring condition</Anchor> is mandatory.

  For use cases where you only want to display points without issuing them:

  - Create an earning and expiring condition with 0 points and 0-day expiry on Loyalty+.
  - In the journey, add the respective incentive in the **Creatives** section of the **Engagement block** and attach this condition

  This allows the journey to pass validation without allocating any points.

  However, if you are using loyalty labels that only display a value or name such as points balance, slab name, or lifetime purchases, you do not need to configure an earning or expiry condition. The following labels fall into this category:

  ]\([https://docs.capillary](https://docs.capillary), ch.com/docs/create-email-templ, e-#/), \[M-Pus, Template]\([https://docs](https://docs), apillarytech.com/do, /create-push-notific, ion-template#/), \[WhatsApp, emplate]\([https://docs.c](https://docs.c), illarytech.com/docs/crea, -whatsapp-template#/), \[ZALO template, [https://docs.capillarytech.com](https://docs.capillarytech.com), ocs/create-zalo-templat, #/), \[ Line template]\(htt, ://docs.capillarytech.com/docs/create, ine-template-#/), and \[Viber template]\(, all //docs.capillaryte related tags.**&#x20;**

  For example: If you want to remind a customer how many points they need to renew their slab such as "You need 200 more points to renew your Gold membership!", you can use , refer to the \[documen directly in your campaign message without configuring an earning or expiry condition.<br /><br />For more information on these tags, refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/supported-labels-for-engagement-channels">Supported Labels across Engage+</Anchor>.
</Callout>

# Incentives in engagement message

You can add incentives such as offer, points and cart promotion details along with the engagement messages. To add, perform the following:

1. Click on the engagement block.
2. Click **Add incentives**.
3. Select the desired option.

<Image src="https://files.readme.io/b06a3f329998dfce621d8ab47905d78ee10c59899194ba5cfb477e2dea36064e-Screenshot_2025-10-08_at_11.21.48_AM.png" align="center" width="50% " border={true} />

<Callout icon="📘" theme="info">
  Note

  **[Points](https://docs.capillarytech.com/docs/points#/configure-points-earn-conditions)**, **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/create-cart-promotion#/">cart promotions</Anchor>**, and **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-a-gift-voucher#/">gift vouchers</Anchor>** must be pre-created before adding them as incentives in the message content. In contrast, **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/create-offer-1#/create-offers">offers</Anchor>** and **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/enrolling-and-issuing-badges-from-campaigns#/">badges</Anchor>** can be created during message creation, based on the message requirements.
</Callout>

4. Click **Select/Done/Claim**.

<Image src="https://files.readme.io/da69176-Add_Incentive.jpg" align="center" border={true} />

5. Click **Done**.

The selected incentive is added to the engagement message. For information on creating any type of incentive, see  [Incentive management ](https://docs.capillarytech.com/docs/incentive-management).

# A/B Test in engagement block

## Overview

A/B testing, also known as split testing, is a method in customer Journeys that helps to compare different content and engagement methods for specific segments of customers over a defined period. This allows you to gather valuable insights about which configurations perform better with the audience. Based on the results obtained, you can make informed decisions about which configuration to adopt for the remainder of the customer journey.

**Note**: The A/B Test block is not enabled by default. To use this feature, raise a JIRA ticket to the Product Support team (PST) to enable it for your organization.

### Example

Consider a scenario where a brand wants to run a holiday e-mail marketing campaign journey for 20 days. With A/B testing you can trigger the campaign with two different subject lines: "Save Big Today!" and "Limited-Time Offer Inside!". Here, the independent variable would be the subject line variation, while the dependent variable would be the click-through rate – how many recipients open the email and click on the links inside. By conducting A/B testing for the initial few days, you can compare the performance of these two subject lines and determine which one leads to a higher click-through rate. Once you've analyzed the results and identified the most effective subject line, you can use that version for the remaining duration of the holiday email campaign journey, maximizing engagement with your target audience.

## Configuring A/B testing for a journey

To configure the A/B testing for a journey, perform the following while configuring a journey:

1. Drag and drop the **A/B testing block** on the journey canvas.

<Callout icon="📘" theme="info">
  ### Note

  The A/B testing block is a replacement for the engagement block. If you are running an A/B test, you don’t need to include another engagement block.
</Callout>

2. In the **Block name**, enter a name for the A/B testing.
3. From the **Variants and audience split section**, select the **Engagement channel** and **Incentives** (optional).
4. In the **Variants**, add Creatives and Incentives (if applicable) for the variants. To add an additional variant, click **Add more variant**. A maximum of three variants are supported.

<Image src="https://files.readme.io/845553e-AB_Testing.png" align="center" border={true} />

5. Click **Edit audience split** and define the audience proportion for the variants, the split of what %age of your test customers should get which variant. By default, audiences for the variants are split equally.

<Callout icon="📘" theme="info">
  ### Notes

  - Sum of audience split percentages for each variant should equal 100%.
  - Audience split for any variant cannot be zero.
  - Fractional values are not allowed.
</Callout>

<Image src="https://files.readme.io/ad8d318-Audience_split.png" align="center" border={true} />

6. In the **Deliver settings**, configure the delivery settings.

<Image src="https://files.readme.io/62353fb-Delivery_setting.png" align="center" border={true} />

7. In the **Length of the test** section, define the following:
   1. **Number of customers (mandatory):** The minimum number of customers that should enter the journey.
      1. You can define this number based on your knowledge and should be realistic based on the journey configured and your organization’s customer base. For example, if your organisation’s customer base is 10,000 do not set the test criteria to be more than 1000-2000. The ideal number of test customers is 20-30% of your expected audience count who will enter the journey.
      2. The number of entrants should be equal to or greater than the number of variants.
      3. The number of entrants should not exceed the total number of customers in the organization. ii. **Duration (Optional)**: After defining the number of entrants, you can choose to **conclude the test immediately** or select an **additional number of days** for the test to run after reaching the minimum number of entrants. The system then automatically selects the next set of defined number of entrants for the additional days.

<Callout icon="📘" theme="info">
  ### Note:

  A minimum of one-day wait duration is applicable to all A/B tests after the number of test users criteria is met. For example, if the A/B testing gets completed in a couple of hours, the system still takes a minimum of one day to decide the winning variant.
</Callout>

<Image src="https://files.readme.io/9294b43-AB_testing_length.png" align="center" border={true} />

8. From the **Test- criteria** dropdown, select the KPIs to calculate the winning variant of your test. The system displays the KPIs based on the engagement selected.

   1. **Engagement Level KPIs**: The engagement level KPIs are available by default. The Engagement Level KPIs listed in the dropdown depend on the selected channel. For instance, in Email, you will have access to metrics such as open rate and delivery rate, whereas in SMS, only the delivery rate will be available.
   2. **Incentive Level KPIs**: These are available only if you have added Incentives for the test. You can select a Maximum of 5 KPIs in total across both categories.

   <Image src="https://files.readme.io/2b0c8ef-KPIs.png" align="center" border={true} />

9. Click **Weightage** , edit the weightage for the KPIs and arrange the order of the KPIs. The winning variant is calculated based on the KPI value and the %age weightage assigned to it. Ranking order is needed if there is a tie between the scores of two variants.

<Callout icon="📘" theme="info">
  ### Note

  Total sum weightage for all KPIs should be 100%.
</Callout>

9. Click **Done**. Your A/B test setup is complete.
10. Send your journey for approval.

<Callout icon="📘" theme="info">
  ### Notes

  - A user can set up multiple A/B tests in a single journey. Setting up of each A/B test should be done in a similar way as defined aboveOnce your journey is live, your A/B test begins.

  - When the criteria defined for the test, such as the number of entrants and wait duration, are met, the test results are calculated.

  - Based on the specified Key Performance Indicators (KPIs) and their respective weightage, the winning variant is determined.

  - After the test is completed and until the user takes any action, the winning criteria are sent by default.

  - [Overriding the winning criteria](https://docs.capillarytech.com/docs/ab-testing_overview) is only allowed for 2 days after the test is completed. After that, the winning criteria are sent by default.
</Callout>

## After A/B test setup: Understanding the post-setup process

<Callout icon="❗️" theme="error">
  ### Attention

  You cannot edit the A/B test block after a journey is live.
</Callout>

### Notification on the A/B testing

* Users will receive an email notification informing them of the test completion and providing detailed results.
* Email IDs of users who should receive the results of the A/B test should be added in Engage Settings > Alerts > Journey alerts > A/B test alerts.

<Image src="https://files.readme.io/7433855-Alerts.png" align="center" border={true} />

### Editing Journeys with Active A/B Tests:

If you edit the journey while an A/B test is in progress, your test will be reset. When you make the edited journey live, your test will start from the beginning, starting again from entrant number 1.

### A/B testing scenario when pausing a journey:

If you pause a journey where an A/B test is live, the test will also be paused. The test will resume when you resume the journey and the test will be completed when the test criteria (number of entrants) and additional wait duration are fulfilled.

### A/B testing in a Sunset journey scenario:

An A/B test block in a sunset journey will work the same as it does in a live version of a journey.

### Overriding the winning variant

You can override a winning variant within two days of the result. For instance, if three variants (A, B, and C) were defined and Variant B is determined as the winner, but you prefer to send Variant C to customers entering the journey after the test, you can do so. Perform the following:

1. Navigate to the Journey where the A/B test was set up and access the A/B test block. By default, the winning variant is selected.
2. Select Variant C and declare it as the final variant to be sent to all customers entering the journey.

# Context-based tags in engagement block

Context tags are dynamic placeholders you can insert into engagement blocks (such as emails and SMS) to personalize message content with event-specific data. The attributes available as context tags are derived from the event configured at that point in the journey. Depending on where a customer is in the journey, two sets of context tags are available:

* **Entry event-based tags** — When you configure a journey, you define an [entry trigger](https://docs.capillarytech.com/docs/configure-journey#configuring-the-entry-trigger), a specific action a customer must perform to enter the journey (such as making a transaction or enrolling in a target). The attributes associated with that action become available as entry event-based tags. You can use these tags in any engagement block to personalize the message based on what the customer did when they entered the journey.

  **Example:** A retail brand wants to send a personalized SMS to customers who make a transaction worth 10,000. In the entry trigger, the brand selects **Current Transaction** as the event, selects **Add entry paths**, and sets the condition as **Transaction Value is equal to 10,000**. In the SMS engagement block, the brand selects **Add label** and navigates to **Entry event > Transaction Profile** to insert the transaction value tag into the message. When a customer makes a qualifying transaction, the SMS is sent with the actual transaction value personalized for that customer.

  <Image src="https://files.readme.io/ac25f21ecab5055cb034658a284019a0a77be91b1e054fa2861e3d403392ab74-JOURNEY.gif" align="center" width="80% " border={true} />

* **Wait for future event context tags** — The Wait for future event block pauses the journey until a specified customer action occurs.Once the event occurs and the customer moves to the next step, both entry event-based tags and the attributes from wait for future event become available as context tags. You can use these tags in the engagement block that follows to personalize the message based on what the customer did at that point in the journey. Note that within the [Event-based wait](https://docs.capillarytech.com/docs/flow-control-building-block#event-based-wait) block, context tags are supported only for the [**Wait for future event**](https://docs.capillarytech.com/docs/flow-control-building-block#event-based-wait) type.

  **Example:** A brand wants to notify customers when a promotion is issued to them. In the **Event based wait** block, the **Wait Type** is set to **Wait for future event** and the event is set to **Promotion issued**. Once the promotion is issued and the customer moves to the next step, the SMS engagement block on the primary path shows two sets of tags under **Add label**, entry event-based tags and **Promotion issued (Event based wait)** tags. The brand uses tags from both sections to personalize the SMS with details from both the entry event and the issued promotion.

  <Image src="https://files.readme.io/6fbb51a4a19d78c94d6c06491a414e5b25701a3855574b49506f7a31f27849d5-GUFXX.gif" align="center" width="80% " border={true} />

## How the path determines tag availability

Context tags from a Wait till event block are available **only in the path that follows a successful event match** (the primary path). They are **not available** in the else/fallback path (when the event does not occur).

**Note:** If a customer exits through the else path, context tags from that **Wait for future event** block are not populated. Design your else path communications using only entry trigger tags or static content.

## Steps to use context tags

To use the context tags, perform the following steps below:

1. Go to Engage+ and select **Journeys**. Click **Create Journey**.

2. Configure the <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-journey#configuring-the-entry-trigger">entry trigger</Anchor>. Define your entry trigger by selecting a user event and configuring the entry condition.

<Image src="https://files.readme.io/ece2d2d74d57f641f522c06ea2f15070735c0edc46676478372c48d8955f8bda-wait-till-event-context-tags-google-docs.png" align="center" width="80% " border={true} />

3. Add an engagement block after the entry trigger. While configuring the block, select **Add labels**. The attributes you selected in the entry trigger will be available here under **Entry event**.

<Image src="https://files.readme.io/14bb7c45a179ef30d98c635ff2fb16bcf2981bde0b79202dcd7a727130a65767-wait-till-event-context-tags-google-docs_1.png" align="center" width="80% " border={true} />

4. Further along the journey, add an **Event based wait** block and configure it with the relevant <Anchor target="_blank" href="https://docs.capillarytech.com/docs/configure-events-and-conditions">event and attributes</Anchor>. Save the block configuration.

   **Note:** You can add multiple **Event-based wait** blocks in a journey. Each block contributes its own set of context tags based on its configured event type. If a journey has more than one **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/flow-control-building-block#event-based-wait">Wait for future event</Anchor>** block, each engagement block shows context tags for the Wait for future event block that immediately precedes it on that specific path.

<Image src="https://files.readme.io/130bff584575e9eb0a0fb272aa32d287adc50ffb868a7cd65e9dfea9e1411a9a-wait-till-event-context-tags-google-docs_2.png" align="center" width="80% " border={true} />

5. Add an engagement block on the primary path. On the primary (success) path of the event-based wait block, add an engagement block (such as an email). Open the block to edit its content.

<Image src="https://files.readme.io/69b45b78d642d425f03b6a3a541de39a29ef88b0c049b7dc0c5f2dc9488ec0ea-wait-till-event-context-tags-google-docs_3.png" align="center" width="80% " border={true} />

5. In the engagement block editor, look for the tags panel. Select the relevant tag from the Wait till event context tags section and insert it into your content.

<Image src="https://files.readme.io/79d5a78789617bd38c5336fe0398545d9fb5387384c1b592a5170ef76b0fdfdc-wait-till-event-context-tags-google-docs_4.png" align="center" width="80% " border={true} />

5. Select **Save** to apply your changes. The engagement block will now use personalized data from the wait event when it is triggered for a customer.

<Callout icon="📘" theme="info">
  ### Note

  If your Journey uses context-based tags, ensure that the required `eventContext` configuration is enabled for your organization. Without this configuration, the Journey cannot resolve context-based tags, which may cause message blocks to fail even when customers successfully enter the Journey. This is a one-time organization-level configuration. Raise a Jira ticket to the Product Support Team to enable it for your organization.&#x20;
</Callout>

<br />