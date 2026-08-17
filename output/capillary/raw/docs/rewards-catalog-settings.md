---
updatedAt: 2026-05-18T10:06:24.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Rewards Catalog settings

The Rewards Catalog settings let you configure the organization-wide building blocks that power reward configuration: categories, custom fields, languages, groups, fulfilment statuses, event notifications, and redemption limits. Configure these before creating rewards. Options you add here become available during the reward creation flow.

Select the **Settings** icon in the top-right corner of the Rewards Catalog page. The settings menu on the left has the following sections:

* [Categories](#categories)
* [Custom fields](#custom-fields)
* [Event notification](#event-notification)
* [Fulfilment status](#fulfilment-status)
* [Groups](#groups)
* [Languages](#languages)
* [Redemption limit](#redemption-limit)

***

# **Categories**

When you assign a category to a reward, that reward appears when customers filter the catalog by that category. Without a category, the reward only appears in the unfiltered "All" view.

Examples: Electronics, Fashion, Food & Beverage, Travel, Health & Wellness

## Create a category

1. Go to **Settings** > **Categories**.

<Image align="center" border={true} src="https://files.readme.io/d553d37f26e261914b03ed345ea264e4ae0dcc32f8d3442d7591b68b244dde62-Screenshot_2026-05-12_at_12.13.57_PM.png" className="border" />

2. Select **New Category**.

<Image align="center" border={true} width="80% " src="https://files.readme.io/94a3859916bebd003062b037f0cbaf37cfd3a50f135f86a2844ae8dfd8717058-Screenshot_2026-05-12_at_12.14.56_PM.png" className="border" />

2. In the **Create category** dialog, enter a **Name**. Maximum 255 characters.

<Image align="center" border={true} width="75% " src="https://files.readme.io/5dec7d876bd2c72c474e2b541085ed606703c3ecb617e2e54492947ce149e977-Screenshot_2026-05-12_at_12.16.02_PM.png" className="border" />

3. Select **Save**.

## How to deactivate a category?

Once a category is deactivated, it is immediately restricted from being used in any new rewards.

When a category is deactivated, the following changes occur to existing rewards:

* **Category Tag Removal:** The category tag is removed from all rewards currently using it.
* **Reward Visibility:** Affected rewards are not deleted; they will remain in the catalog without a category and will only appear in the unfiltered "All" view.
* **Reactivation Logic:** If you choose to reactivate the category later, previously assigned rewards are **not** automatically re-linked. You must manually re-assign the category to each reward.

To deactivate category:

* Select the **toggle** next to the category.

<Image align="center" border={true} width="75% " src="https://files.readme.io/5ef16d9df84f67540345acf5a702e5acd0a055aef6f6d8a60362089f74e46fb8-Screenshot_2026-05-12_at_12.23.15_PM.png" className="border" />

* When prompted, select **Confirm** to deactivate.

<Image align="center" border={true} width="75% " src="https://files.readme.io/9c70b2d3f7e747d57deb3af0fa516bca39a40502fdd7cc037c68072c1925e805-Screenshot_2026-05-12_at_12.24.12_PM.png" className="border" />

# **Custom fields**

Custom fields attach extra metadata to rewards beyond the standard fields. The scope determines exactly where the field appears. Not all custom fields appear during reward creation.

| Scope                 | Where the field appears                                                       | What it captures                                                                                            |
| :-------------------- | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| **Reward creation**   | Step 5 (multi-language content step), when an admin creates or edits a reward | Extra detail about the reward itself, such as a budget code or localized tagline that can vary per language |
| **Reward issual**     | When an operator issues a reward to a specific customer                       | Per-transaction data at the moment of issuance, not per-reward data                                         |
| **Catalog promotion** | In promotion rules that reference the catalog                                 | Data used by promotion logic to reference catalog items                                                     |

<Image align="center" border={true} width="80% " src="https://files.readme.io/967b8921501c3cd1ac24b815b8ab2da3e61bcaa2bf4f953943d30640a0c153f4-Screenshot_2026-05-14_at_2.33.11_PM.png" className="border" />

## Supported data types

| Data type         | Description                                                   | Example use case                                                     |
| :---------------- | :------------------------------------------------------------ | :------------------------------------------------------------------- |
| **Boolean**       | A true/false value displayed as a toggle.                     | "Online Only": whether the reward is redeemable only on the website. |
| **Date and time** | A date and time selected from a calendar.                     | "Event Date": for a reward granting access to a concert or workshop. |
| **Enum**          | A predefined list of values the user selects from a dropdown. | "Brand Partner": a preset list of partner brands.                    |
| **Number**        | A numerical value.                                            | "Product SKU": a unique product identifier.                          |
| **String**        | A single line of plain text.                                  | "Coupon Code": to store a discount code.                             |
| **Rich text**     | Formatted text with bold, italics, and lists.                 | "Redemption Instructions": detailed steps on how to claim a reward.  |

Up to 20 active Rich text custom fields are supported per organization.

<Image align="center" border={true} width="80% " src="https://files.readme.io/7ef70ca0126a71d3b3d781408be5d8a55199f7911e71d3fe8c1f66d151d9f82d-Screenshot_2026-05-14_at_2.34.13_PM.png" className="border" />

## How to create a custom field?

1. Go to **Settings** > **Custom Fields**.

<Image align="center" border={true} width="75% " src="https://files.readme.io/a40a7784685136d51488a9db3668cc1d6b7a1c046f08932578003c88b640f32f-Screenshot_2026-05-12_at_12.26.42_PM.png" className="border" />

2. Select **New custom field**.

<Image align="center" border={true} width="75% " src="https://files.readme.io/f1d2a7b4f3c00a95003224189d100394dea50ee94e3d79a3db5bc92fa88fb9c7-Screenshot_2026-05-12_at_12.27.39_PM.png" className="border" />

2. Configure the following:

   * **Name:** Enter a unique name. Maximum 255 characters.
   * **Scope:** Select where the field appears: Reward creation, Reward issual, or Catalog promotion.
   * **Data type:** Select the type of data this field holds.

   <br />

   <Image align="center" border={true} width="75% " src="https://files.readme.io/2094668731487d6e582888780b7822ac12fd0c2d1bc115b1075e4872ad9b9163-Screenshot_2026-05-12_at_12.29.05_PM.png" className="border" />
3. (Optional) Turn on **Is this custom field mandatory?** to require this field on every new save. Every admin who creates or edits any reward must fill it in before saving. Existing rewards without a value aren't blocked retroactively. The check applies only to new saves.

<Image align="center" border={true} width="75% " src="https://files.readme.io/1da2ae48bd094cc9eee9b1f968acd3bda11f725f2953275ddb03d0c11cb8c847-Screenshot_2026-05-12_at_12.30.55_PM.png" className="border" />

2. (Optional) Enter a **Default value** to pre-fill the field when no value is entered. Default values apply only to mandatory fields.
3. Select **Done**.

## How to delete a custom field?

When a custom field is deleted, the following changes occur to existing rewards:

* **Permanent Data Loss**: All values stored within that specific field across all rewards are permanently lost and cannot be recovered.
* **Entity Unlinking:** The custom field is unlinked from all associated rewards or entities where it was being used.
* **Reward Retention**: The rewards themselves are not deleted; they remain in the system, but the specific data associated with that custom field is removed.

<Image align="center" border={true} width="80% " src="https://files.readme.io/d9ea5135c950f39180612e6b8cd033087843fad546714003edad4bb4499f9c3c-Screenshot_2026-05-14_at_2.35.36_PM.png" className="border" />

# **Event notification**

These settings apply globally to every reward within the organization and cannot be limited to specific rewards. When a reward approaches its expiry date, the system evaluates all active notification rules and triggers those that match the current timing.

The following logic applies to all global notification rules:

* **Universal Application**: Rules fire for every reward in the organization. You cannot apply a rule to only a subset of rewards.
* **Relative Timing**: Triggers are based on each reward's end date. For example, a "7 days before" rule is triggered, or exactly one week before the specific expiry date of each reward.
* **Channel Configuration**: This setting controls only the timing of the trigger. The actual delivery channel (Email, SMS, or Push) is managed through your organization's primary communication settings.

<Image align="center" border={true} width="80% " src="https://files.readme.io/d094d7ed69feb7e56446f5d0bdbe4886d8789562199a9517d3aaf21e09856573-image.png" className="border" />

<br />

Note: An organization can support a maximum of 20 active event notifications at any time.

## Turn on or turn off all event notifications

Use the **Enable expiry event notification for the rewards in this org** toggle at the top of the Event Notification page to turn all expiry notifications on or off for your organization at once. Turning this off pauses all expiry notifications regardless of individual rule configurations.

<Image align="center" src="https://files.readme.io/6653c5f52c9ff4a4c89bfc468b43bc0499b504642f7b7c6668cea4891d36d3c2-Screenshot_2026-05-14_at_2.38.53_PM.png" />

## Create an event notification

1. Go to **Settings** > **Event Notification**.
2. Select **New event notification**.

<Image align="center" border={true} width="80% " src="https://files.readme.io/0dc0d89ad3413bf3c21e5c5348498b37c27a41ee1b5a46625f65a93a1d33f9b8-Screenshot_2026-05-14_at_2.40.24_PM.png" className="border" />

1. Select when to send the notification:

   * **On the reward's end date:** The notification fires on the day the reward expires.
   * **Before reward's end date:** The notification fires a set number of days before expiry. Enter the number of days (minimum 1), for example, enter `7` to notify customers one week before their reward expires.

   <Image align="center" border={true} width="80% " src="https://files.readme.io/8da5a0b6711301863a7b314d022701537ffc001658665e2537ccbd153d85a3b8-image.png" className="border" />

   <br />
2. Select **Done**.

## Set the default send time

The **Default time to send expiry event notification** field sets the time of day at which all expiry notification rules fire. This applies to every rule in the organization

1. Go to **Settings** > **Event Notification**.
2. Select the **Default time to send expiry event notification** field.
3. Select the time you wish to keep as the default.
4. Select **Save new default time for expiry event notification**

<Image align="center" border={true} width="80% " src="https://files.readme.io/ced19126613c37ccfd3685eb6bccd9a6c02163bd89ec58bb0ce414a0a1603f7a-Screenshot_2026-05-14_at_2.43.39_PM.png" className="border" />

# **Fulfilment status**

Fulfilment statuses appear on the order tracking view that customers see after redeeming a physical reward. When an operator updates a redemption's status to "Shipped," the customer sees "Shipped" in their order history. Status transitions are manual. An operator or integrated system updates them. The system doesn't transition statuses automatically.

Examples: Processing, Shipped, Out for Delivery, Delivered, Received, In-Progress, Denied, Completed.

<Image align="center" border={true} width="80% " src="https://files.readme.io/3b2348b55b8d095c7b673622b9b63f992998d79fb0ced886ab5d17bb5bf49c61-image.png" className="border" />

<br />

## Create a fulfilment status

1. Go to **Settings** > **Fulfilment Status**.
2. Select **New fulfilment status**.

<Image align="center" border={true} src="https://files.readme.io/5c11d8c44082dd8312356cd5b801c4a05c890e5f7b7fd6373b3eb79b43cb1168-Screenshot_2026-05-14_at_2.47.15_PM.png" className="border" />

3. Enter a **Name**. Maximum 255 characters.

<Image align="center" border={true} width="80% " src="https://files.readme.io/696a8fe4613b89c9862f2b78f0d007b7436663a450c5d6d0759882593d8154a8-image.png" className="border" />

<br />

4. Select **Save**.

## Delete a fulfilment status

Select the delete icon next to the status. When prompted, select **confirm** to delete.

**What happens to existing records**

* All redemption records currently showing that status are updated to show no status.
* The redemptions themselves remain. Only the status label is removed.

<Image align="center" border={true} src="https://files.readme.io/1b4c453f608ed9afe0c0a487c03f71657683cb357d6b3e66c86a026b29ffa339-Screenshot_2026-05-14_at_2.52.09_PM.png" className="border" />

# **Groups**

Groups appear as browsable collections in the customer-facing catalog. When you assign a reward to a group, customers browsing that group see the reward. The rank within the group controls the display order within it.

Multi-level nesting creates a hierarchy that customers can navigate, for example, `Seasonal Promotions / Winter 2025 / Clothing` creates a three-level path. You assign groups and their ranks to rewards in Step 6 of reward creation.

## Create a group

1. Go to **Settings** > **Groups**.
2. Select **New Group**.
3. In the **Create group** dialog, enter:
   * **Name:** The display name for the group. Maximum 255 characters.
   * **Enter rank** (Optional): Controls the group's display order in the catalog. Lower numbers appear first. Must be a positive integer.
4. Select **Save**.

## How to delete a group?

Once a group is deleted, it is immediately and permanently removed from the system.

When a group is deleted, the following changes occur to existing rewards:

* **Group and Rank Removal:** The group and rank metadata is removed from all assigned rewards.
* **Reward Visibility:** The rewards themselves remain in the catalog under the "All" view — they just no longer appear within the deleted group's collection.

To delete a group:

* Select the **delete icon** next to the group.
* When prompted, select **Confirm** to delete.

***

# **Languages**

Adding a language makes it available in Step 5 of reward creation, where admins configure localized names, descriptions, terms, and images. No existing rewards are automatically translated. Admins must go into each reward and add the language content manually.

The Language Code is used by the system to match the language to the customer's device or app locale setting. An incorrect code means the language is never served to customers even if content has been added. The system can't match the code to any device locale.

English is the default and fallback language. It can't be turned off.

## Add a language

1. Go to **Settings** > **Languages**.
2. Select **New Language**.
3. Enter:
   * **Language name:** The full name, for example, `Arabic`. Accepts letters, numbers, and spaces only.
   * **Language Code:** The ISO 639-1 code for the language, for example, `ar`. Maximum 9 characters. Accepts letters, hyphens, and underscores only.
4. Select **Save**.

The language now appears in the **Content in multi-language** step of reward creation.

## Deactivate a language

Select the toggle next to the language. When prompted, *"Once deactivated, this language cannot be used in any catalog item. However, it can be re-activated later."* confirm to deactivate.

**What happens to customers mid-campaign:** Customers whose language preference matches the deactivated language immediately see the reward in the default language. Their redemption ability isn't affected. They can still see and redeem the reward, just in the default language. The language configuration is preserved and can be reactivated at any time. Languages can't be deleted, only deactivated.

***

# **Redemption limit**

Points redemption limits set organization-wide rules that cap the maximum points any customer can redeem within a defined timeframe. These rules apply across rewards. They aren't tied to a specific reward. When a customer attempts a redemption that would exceed the limit, the redemption fails. The customer sees an error and no points are deducted.

Up to 15 redemption limits are supported per organization.

**Limits stack:** If you create two rules, one daily and one monthly, a customer must have headroom under both to redeem. If they've hit the daily limit, they're blocked even if the monthly limit still has headroom.

## Create a redemption limit

1. Go to **Settings** > **Redemption Limit**.

2. Select **New redemption limit**.

3. In the **Create points redemption limit** dialog, configure the following:

   **Apply limits to**

   | Option                | What it does                                                                                                                              |
   | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
   | **Every customer**    | Applies the limit to all customers in the organization.                                                                                   |
   | **Specific customer** | Applies the limit only to customers matching specific criteria: Loyalty Program, Tier, Segment, Supplementary Program, or Customer Label. |

   **Limit on specific reward type** *(Optional)*

   Turn on **Limit on specific reward type** to apply the limit to a specific type, for example, Auction, Voucher, or Gift card. When off, the limit applies to all reward types.

   **Frequency of limit**

   | Frequency        | What it does                                                                                                                                                                   |
   | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **Daily**        | Resets the limit every day.                                                                                                                                                    |
   | **Weekly on**    | Resets the limit every week on the selected day.                                                                                                                               |
   | **Monthly**      | Resets the limit at the start of each calendar month.                                                                                                                          |
   | **No frequency** | Creates a lifetime cap. The customer can redeem up to X points total from this organization, forever. Once hit, all further redemptions are blocked regardless of reward type. |

   **Redemption limit per customer:** Enter the maximum points a customer can redeem within the frequency period.

   **Redemption limit end date & time** *(Optional):* Set a date and time after which this limit expires and no longer applies.

4. Select **Done**.

> 👍 Example
>
> To prevent any customer from redeeming more than 10,000 points per month on gift cards:
>
> * **Apply limits to:** Every customer
> * **Limit on specific reward type:** Gift card
> * **Frequency:** Monthly
> * **Redemption limit per customer:** 10,000