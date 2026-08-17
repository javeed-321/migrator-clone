---
updatedAt: 2026-04-02T06:58:05.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create a Broadcast Promotion

A broadcast promotion directly issues rewards to a targeted group of members without requiring them to complete any qualifying activity. This makes it ideal for delivering one-time incentives, seasonal rewards, or appreciation gifts to a specific audience on a defined schedule.

For more information on broadcast promotions and how they differ from activity-based promotions, refer to [Core Concepts](https://docs.capillarytech.com/docs/loyalty-promotions-core-concepts#objective).

***

# **Step 1: Defining the promotion details**

Start by defining the promotion's basic details, such as its name, description, duration, and the loyalty program it belongs to.

1. Go to the **Promotions** tab under **Loyalty+**.

2. Select **Create Promotion** and select **New Promotions (v3)** from the dropdown.

3. In the **Promotion Name** box, enter a unique name. The character limit for the promotion name is 255 characters.

   > 👍 Tip
   >
   > Use a consistent naming convention for easier analysis. A recommended format is `[Timeframe]_[Audience]_[Offer]_[Objective]`, for example, `Q4-2025_PlatinumTier_BonusPoints_Appreciation`.

4. *(Optional)* In the **Description** box, outline the business case or key configuration details. The character limit for the description is 1000 characters.

5. From the **Program** dropdown, select a [loyalty program](https://docs.capillarytech.com/docs/features-of-loyalty#/). This step is required for organisations with [multiple loyalty programs](https://docs.capillarytech.com/docs/create-a-multi-loyalty-program) (MLP).

6. From the **Timezone** dropdown, select a time zone. This is the time zone where the loyalty promotion was created.

   > 📘 Note
   >
   > This information is for reference only. The system always displays information in the organisation time zone.

7. In the **Duration of the promotion** box, select the start and end date and time. The promotion operates in your organisation's time zone.

   > 📘 Note
   >
   > If you do not provide a time along with the date, the times will default to 00:00 and 23:59 (start of the day to end of the day).

8. Under **Promotion type**, select **Broadcast promotion**.

9. In the **Promotion external identifier** box, enter a unique ID for tracking and reporting. The character limit is 255 characters.

10. Select **Next**.

    <Image src="https://files.readme.io/29c24190c1140335deb482eb79c7e02318b704788eaf52c72943b33d4262b4aa-image.png" border={true} width="80%" />

**You have now established the promotion's core identity and schedule, preparing you to define the target audience.**

***

# **Step 2: Defining the target members**

Specify which members will receive the broadcast promotion. You can target one or more predefined audience groups.

1. Select **Add** under the **Add target members** section.

2. In the **Audience groups** window, select the checkboxes for the groups you want to include.

3. Select **Done** and **Next**.

> 📘 Note
>
> The audience groups available for selection are synced from your organisation's segments. Multiple groups can be selected and the system applies OR logic, meaning members belonging to any of the selected groups will receive the promotion.

<Image src="https://files.readme.io/016556f204423795b9a1e59406d4322cd02cd0a6e8c9c62898a20ceaa1e2c599-image.png" border={true} width="80%" />

**You have successfully defined the target audience, ensuring that only members of the selected groups will receive the promotion's rewards.**

***

# **Step 3: Configuring brand actions**

Define the reward that will be issued directly to the targeted members.

1. Select **Add brand action** and select the required action from the list. For more information on the available brand actions and how to configure them, refer to [Brand Actions](https://docs.capillarytech.com/docs/loyalty-promotions-actions).

2. Configure the selected brand action.

3. Select **Save**.

4. *(Optional)* Select **Add brand action** again to add more actions.

5. Select **Next**.

   <Image src="https://files.readme.io/0c5b3ee47365d998e2d20bf993b9238147a5fee7533c86b1837a1116c1b6990d-image.png" border={true} width="80%" />

**You have configured the rewards to be issued to the target members when the broadcast promotion runs.**

***

# **Step 4: Scheduling the promotion**

Define when the broadcast promotion runs and how frequently it issues rewards to the targeted members.

1. Select the schedule type. The following options are available:

| Schedule type                  | Description                                                                                     | Example                                                                                          |
| :----------------------------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| **Immediately after approval** | Issue the reward to all targeted members immediately after the broadcast promotion is approved. | A brand issues 500 bonus points to all Gold-tier members once a checker approves it.             |
| **Specific date & time**       | Issue the reward to all targeted members at a single, defined point in time.                    | A brand issues 500 bonus points to all Platinum-tier members at 10:00 AM on December 25th, 2025. |

2. *(Optional)* If you select **Specific date & time**, set the date and time for the promotion to run.

3. Under Frequency, select how often the promotion issues rewards to the targeted members. The following options are available:

| Frequency | Description                                                                                     |
| :-------- | :---------------------------------------------------------------------------------------------- |
| **Once**  | The promotion issues rewards to the selected members only once, on the scheduled date and time. |
| **Daily** | Triggers the brand actions daily for newly added members in the selected audience groups.       |

4. Select **Next**.

   <Image src="https://files.readme.io/72ecdc9ae2d2de8f5d792f21f37da5270afb32ab08f664d5447fb4049231aa2e-image.png" border={true} width="80%" />

**You have defined the broadcast promotion schedule, ensuring that rewards are issued to the targeted members at the configured time.**

***

# **Step 5: Configuring additional settings (Optional)**

You can configure settings for internal operations and reporting, such as associating a [till code](https://docs.capillarytech.com/docs/store-hierarchy#/add-till) or defining the liability split for shared promotions.

1. *(Optional)* Select a till code from the dropdown or enter a till code to associate with the loyalty promotion. All points allocated on promotion achievement will be tagged to the selected till.

2. *(Optional)* Select **Edit** to define the liability split for the loyalty promotion, select **Add liability owner**, and select a new liability partner from the dropdown. This feature serves primarily as metadata for accounting purposes and does not affect the customer's experience or the logic of the promotion.

3. Select **Done** to save the changes.

   <Image src="https://files.readme.io/4c10196f9286c51e420726b9ce9b440b349b8b46a1bea2ebc95530e0131ede29-image.png" border={true} width="80%" />

**You have configured the advanced operational settings, ensuring the promotion is properly tagged for internal reporting and financial tracking.**

***

# **Step 6: Finalising the promotion**

Once you have completed all the configuration steps, you have two options:

* **Save and exit:** Save the promotion as a draft to continue working on it later.
* **Send for approval:** Submit the promotion to be reviewed and activated.

  <Image src="https://files.readme.io/4c2f24401844cc0ffc9587b1cfee7669abc18dd2d06247463ee976365ba331e9-image.png" border={true} width="80%" />

**By following these steps, you have fully configured a new broadcast promotion, which is now saved as a draft or is awaiting approval from a checker.**

<br />