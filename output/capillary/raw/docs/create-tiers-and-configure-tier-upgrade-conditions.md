---
updatedAt: 2026-04-15T07:09:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create Tiers and Configure Tier Upgrade Conditions

# Creating a tier

To create and configure tiers, follow these steps:

1. On **Intouch**, navigate to Menu > **Loyalty+** > **Programs**.
2. In **Programs**, select the program you want to edit.
3. Select **Edit Program**.

<Image align="center" className="border" border={true} src="https://files.readme.io/8f60834-Image_1_tier_upgrade_configuration.png" />

4. Create a **base tier**:
   * Navigate to the **Tiers** tab. You will see a default or base tier.
   * Select **Edit** icon to modify the name of the tier.

<Image align="center" className="border" border={true} src="https://files.readme.io/fc3cefa-Image_2_tier_upgrade_configuration.png" />

* Name the tier.

<Image align="center" className="border" border={true} src="https://files.readme.io/c90f6ec-Image_3_tier_configuration.png" />

* Describe the tier in brief.

<Image align="center" className="border" border={true} src="https://files.readme.io/112cb0d-Image_4_tier_configuration.png" />

* Select an appropriate color for the tier if required.

> 📘
>
> You can configure each tier with a color of your preference.

<Image align="center" className="border" border={true} src="https://files.readme.io/d51ca51-image_5_configuration.png" />

> 📘 Note
>
> You cannot set conditions for the default tier.

5. Review the Changes and add necessary details.

<Image align="center" className="border" width="80% " border={true} src="https://files.readme.io/4e47c14bc4811bef801e2c5aee474fbcd1b26162ec79b002a7a4da9e8af8f5fc-Screenshot_2025-04-04_at_2.24.40_PM.png" />

5. Click **Done** to save.

<br />

# Configuring tier upgrade

When you use tracker values as eligibility criteria for tier upgrades, you must explicitly configure the Transaction Point Allocation action after tracker evaluation. This configuration is required if you want members to skip tiers based on their tracker values.

If you do not configure the Transaction Point Allocation action after tracker evaluation, members will be upgraded one tier at a time, even if their tracker values meet the criteria for higher tiers. Members cannot skip tiers in this case.

Tracker values are scoped by the relevant Concept. Make sure you select the correct Concept when setting up tracker-based eligibility criteria.

From the second tier that you create, you need to configure the eligibility criteria for the tier upgrade and define the upgrade condition for each tier. This needs to be done by going to the Advanced Settings tab.

> 📘
>
> * The eligibility criteria type that you set for tier upgrade remains the same for all the subsequent tiers that you create.
> * Make sure you create tiers in sequence. You cannot create a new tier between existing tiers and cannot delete an existing tier.

1. Click **Create New Tier** and perform the following:

* Name the tier.
* Describe the tier.
* Select an appropriate color for the slab if required.

2. In **Edit tier**, select **Go to advance settings**.
3. In **Eligibility Criteria**, select the base consideration for tier upgrade.

* [Current points](https://docs.capillarytech.com/docs/tier-upgrade#current-points)
* [Lifetime points](https://docs.capillarytech.com/docs/tier-upgrade#lifetime-points)
* [Lifetime purchases](https://docs.capillarytech.com/docs/tier-upgrade#lifetime-purchases)
* [Tracker value](https://docs.capillarytech.com/docs/tier-upgrade#trackers) - A minimum of one tracker needs to be available for the Tracker value option to be available.

4. In **Upgrade type**, select type of tier upgrade. This is applied when a customer fulfills the eligibility criteria.
   * [Issue points and then upgrade to the next tier](https://docs.capillarytech.com/docs/tier-upgrade#issue-points-and-then-upgrade-to-the-next-tier)
   * [Upgrade to the next tier and then issue points](https://docs.capillarytech.com/docs/tier-upgrade#upgrade-to-the-next-tier-and-then-issue-points)
   * [Issue points, upgrade tier, and then issue remaining points](https://docs.capillarytech.com/docs/tier-upgrade#issue-points-upgrade-tier-and-then-issue-remaining-points)

5. Select **Add[Secondary Criteria](https://docs.capillarytech.com/docs/tier-upgrade#secondary-criteria)** , to add another eligibility criteria. For example, if you have the primary eligibility criteria on lifetime purchases, you can also add another tracker value.

<Image align="center" className="border" border={true} src="https://files.readme.io/a6ef018-Image_1_create_more_tiers.png" />

6. Select **Done**.

## Configuring tier upgrades for user groups

To enable tier upgrades for user groups, you must explicitly configure the SlabUpgrade activity for the User Group entity. This ensures that group-level tier upgrades are processed correctly.

## Validate downgrade conditions for a return transaction

Enabling this option allows you to downgrade a customer if the customer returns the transaction that upgraded the customer to a higher tier.

<Image align="center" className="border" border={true} src="https://files.readme.io/8be5399-Validate_downgrade_condition.png" />