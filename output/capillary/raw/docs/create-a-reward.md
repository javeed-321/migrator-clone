---
updatedAt: 2026-05-18T10:23:58.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create a Reward

Creating a reward is a structured process that defines what a customer can redeem, who can redeem it, how much it costs, and how many times it can be redeemed. The following steps guide you through the complete configuration.

<Callout icon="📘" theme="info">
  **Before you begin**

  Some fields in this flow, such as categories, groups, custom fields, and languages, are only available if they have been configured first. To set them up, go to **Rewards+** and select the **Settings** icon in the top-right corner of the Rewards Catalog page. See [Rewards Catalog settings](https://docs.capillarytech.com/docs/rewards-catalog-settings) for instructions. If you skip this step, those fields will be empty when you reach them.
</Callout>

# **Step 1: Basic details**

Set the reward's core identity, such as its name, duration, type, and whether it publishes automatically on the start date.

1. Go to **Rewards+** > **Rewards Catalog**.

2. Select **New Reward**.

<Image align="center" border={true} width="80%" src="https://files.readme.io/e69214d2d23f62aade1c489789a11776a17c4eeaddb469dbe18ebb4ef0d6fa2a-reward-catalog-new-ui-draft-2-google-docs.png" className="border" />

3. In the **Name** box, enter a name for the reward. The limit is 255 characters.

   This name appears in the catalog list and in admin search results. Admins scanning the list for a reward search against this field.

4. (Optional) In the **Description** box, enter a description. You can add up to 4,000 characters.

<Image align="center" border={true} width="80%" src="https://files.readme.io/5d8b1fcea2ebac80fecfd3b1cb06e57978107bbff6f0a359acef485d94a48d48-reward-catalog-new-ui-draft-2-google-docs_1.png" className="border" />

The description appears on the reward detail page that customers open when they select a reward. Use it to provide customers with context on what they're receiving and any redemption conditions.

5. In the **Duration** field, set a start date and time and, optionally, an end date and time. The Rewards Catalog uses your organization's timezone.

<Image align="center" border={true} width="80%" src="https://files.readme.io/d241b8e428070c808afc6f118daf09c435daf3f99ba53752e485560516f2da92-reward-catalog-new-ui-draft-2-google-docs_2.png" className="border" />

When the start date arrives, the reward status changes from Upcoming to Live and becomes redeemable by eligible customers. When the end date passes, the status changes to Ended, and redemptions stop automatically with no admin action required.

If you change the duration later, it may reset configured inventory limits. See [Edit a reward](https://docs.capillarytech.com/docs/manage-rewards#edit-a-reward) for details.

6. From the **Reward type** dropdown, select a type.

   The reward type determines two things: (1) which pre-configured incentives appear for you to link in Step 3. (2) what the customer actually receives when they redeem the reward. For a full description of each type, see [Reward types](https://docs.capillarytech.com/docs/reward-types).

<Image align="center" border={true} width="80%" src="https://files.readme.io/a178dd26efdab177f0318e1722047631d9312cf42748733583050cf0e7243ebd-reward-catalog-new-ui-draft-2-google-docs_3.png" className="border" />

Once the reward goes Live, these fields cannot be edited. Changing it once the reward goes live would invalidate any codes already issued to customers. You can change it while the reward is Upcoming, which will reset any incentive you've already linked.

<Callout icon="📘" theme="info">
  **Note**

  If you change the reward type after you have already linked an incentive, the system will show a **"Your changes will modify dependent steps"** warning. Confirming will remove the previously linked incentive, because the new reward type requires a different incentive format. You will need to link a new incentive in Step 3.
</Callout>

7. **For the Coupon type only:** The **Reward issued by** field appears. Select who issues the reward:

   * **\[Your organization name]**, your organization issues the reward directly.
   * **Other merchant**, a third-party merchant issues the reward.

<Image align="center" border={true} width="80%" src="https://files.readme.io/6b9fe1d46f838b31a8830b77639b3d35bad2fdb5add513322340c7be5b0a83be-reward-catalog-new-ui-draft-2-google-docs_4.png" className="border" />

This determines which incentive records appear in Step 3 and is recorded against every issual for reconciliation. Changing it later resets the linked incentive.

8. The **Activate reward** toggle is on by default. Here's what each state does:

| Toggle state | What it does                                                                                                                                                                                                                     |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **On**       | The reward becomes visible and redeemable to eligible customers exactly on the start date, with no further admin action needed.                                                                                                  |
| **Off**      | The reward exists in the system but is completely invisible to customers, regardless of the start date. It stays hidden until an admin manually turns it on. Use this when you want to stage a reward without publishing it yet. |

<Image align="center" border={true} width="80%" src="https://files.readme.io/df886abaf6f57229a83a961a82465c0f9772ed34c209cee1a2937efcc124ab52-reward-catalog-new-ui-draft-2-google-docs_5.png" className="border" />

9. Select Continue.

You've now established the reward's core identity and schedule. You can define the target audience next.

# **Step 2: Who can view the reward?**

Define which customers can see and redeem the reward. The system runs this check before showing the reward to any customer.

## All customers

Select **All Customers** to make the reward available to your entire customer base. No filtering runs for every customer who reaches the reward via the catalog, a promotion, or a direct issue where the customer needs to claim the reward and redeem it.

<Image align="center" border={true} width="80%" src="https://files.readme.io/6b4f48d828eac20d823b057e6fe0f102cab604fa4eb55a04f859be2bda83a246-reward-catalog-new-ui-draft-2-google-docs_6.png" className="border" />

## Specific customers

Select **Specific Customers** to restrict the reward to a targeted group. The **Filter customers based on** list appears.

| Filter option                                       | What it does                                                                                                                           |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Loyalty program, Tier and Supplementary program** | Shows the reward only to customers in a specific loyalty program, tier, or supplementary program, for example, Gold tier members only. |
| **Segment and Partition**                           | Shows the reward only to customers in a predefined segment or partition. Use this for behavioral or demographic targeting.             |
| **Customer label**                                  | Shows the reward only to customers carrying a specific label on their profile, such as "VIP" or "At-risk."                             |
| **Card Series**                                     | Shows the reward only to customers who hold a specific card type, such as a co-branded credit card.                                    |

Customers who don't match the filters can't see the reward at all, it doesn't appear in their catalog view.

* **Within a filter category**, OR logic\
  Selecting multiple values in the same category means the customer must match at least one. Selecting "Program A" and "Program B" qualifies a customer enrolled in either program.

* **Across filter categories**, AND logic\
  Combining different categories means the customer must satisfy all of them. Selecting Program A or B, plus Gold or Silver tier, requires the customer to be in one of the programs and one of the tiers.

**You've now defined who can see and redeem the reward. You can configure the incentive and cost next.**

# **Step 3: Incentive and cost details**

Determine the specific incentive a customer receives and configure how they pay for it.

## Link an incentive

An incentive is a pre-configured benefit object built in another area of Rewards+. It defines the actual deliverable a customer receives, such as the specific coupon series with its discount value, the game with its prize pool configuration, the gift card with its denomination and issuing partner, and so on.

<Image align="center" border={true} width="80%" src="https://files.readme.io/b963547f89fe5ae4ec01dc3a12ba5f9703455dcfb0d2e6e7d2f568a71115d1fe-reward-catalog-new-ui-draft-2-google-docs_7.png" className="border" />

The reward wraps the incentive and adds the catalog rules on top: who can see it, what it costs, and how many times it can be redeemed. Without a linked incentive, the reward has no benefit to deliver.

### What incentive type links to each reward type?

Each reward type is compatible with exactly one incentive type. The reward type you selected in Step 1 determines which incentives appear here; all other types are filtered out. Before linking, confirm that an active incentive of the correct type exists in your organization.

| Reward type            | Links to this incentive type | Verify the incentive has these configured                                                                                     | Example                                                                                    |
| :--------------------- | :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| **Auction**            | Auction                      | Minimum bid amount, auction start and end dates, and number of winners                                                        | Bid a minimum of 5,000 points for a limited-edition watch; the top 3 bidders each win one. |
| **Card-linked offer**  | Card-linked offer            | Participating card network or issuer, qualifying merchant scope, and benefit rate (cashback percentage or discount amount)    | Link your Visa card and earn 5% cashback on all restaurant purchases.                      |
| **Cart promotion**     | Cart promotion               | Cart qualifying conditions (minimum order value, eligible SKUs or categories) and the discount to apply at checkout           | Add two shirts to your cart and get 20% off automatically at checkout.                     |
| **Cashback**           | Cashback                     | Cashback percentage or fixed return amount and the qualifying transaction criteria                                            | Shop for ₹1,000 and get ₹100 credited back to your loyalty wallet.                         |
| **Charity**            | Charity                      | Charity partner name and the points-to-donation conversion rate                                                               | Donate 500 points to provide meals for underprivileged children through a partnered NGO.   |
| **Coupon**             | Coupon                       | Coupon series ID, discount value, applicable products or categories, and code generation method, Capillary issues these codes | Receive a unique code for 20% off electronics, applied at checkout.                        |
| **Games**              | Games                        | Game format (spin-the-wheel, scratch card, and so on), prize tier configuration, and win probability per prize                | Spend 100 points to spin the wheel daily for a chance to win 50–500 bonus points.          |
| **Gift card**          | Gift card                    | Card denomination, issuing partner (such as Amazon or Flipkart), and delivery channel (email or SMS)                          | Redeem 2,000 points for a ₹1,000 Amazon gift card delivered to your registered email.      |
| **Gift voucher**       | Gift voucher                 | The product, service, or experience covered; the list of participating outlets; and the voucher's own validity period         | Redeem 800 points for a free pizza voucher at participating outlets, valid for 30 days.    |
| **Miles**              | Miles                        | Conversion rate (how many loyalty points equal how many miles) and the partner airline or travel program                      | Convert 10,000 loyalty points into 5,000 airline miles with a partner carrier.             |
| **Physical reward**    | Physical reward              | Product name, SKU, available inventory count, and fulfilment routing details                                                  | Redeem 3,000 points for branded wireless headphones delivered within 5–7 working days.     |
| **Sweepstakes**        | Sweepstake                   | Prize description, total number of entries available, draw date, and winner selection method (random draw or top entries)     | Every 100 points spent earns one entry into the monthly draw to win a new smartphone.      |
| **Vendor only reward** | Vendor only reward           | Vendor's external reward definition and the API endpoint that receives the redemption request                                 | Redeem 1,500 points for movie tickets via a BookMyShow integration; tickets arrive by SMS. |
| **Wallet offer**       | Cash wallet                  | Wallet credit amount and the qualifying stores or transaction types where the credit applies                                  | Redeem 1,000 points for ₹500 in wallet credits, usable on any in-store or in-app purchase. |

### Steps to link different incentives in the reward catalog

The link experience differs by reward type.

#### Coupon (issued by your organization), Cart promotion, and Gift voucher

1. Under  **Incentive and cost details** step, select the **Link Incentives** section and select the link entry.

<Image align="center" border={true} width="80%" src="https://files.readme.io/df42b1229d88a16720ac16785a3cb495f92b48415ade6b5d702ebd528c307fc6-reward-catalog-new-ui-draft-2-google-docs_8.png" className="border" />

2. A slide panel opens, showing existing incentives of the compatible type. Each row shows the incentive name, offer ID, and validity dates.

   <Image align="center" border={true} width="80%" src="https://files.readme.io/ef4b179b13c13c84b908d49c4daf4412c93f7c9523355a072d13bc5f337fa384-reward-catalog-new-ui-draft-2-google-docs_9.png" className="border" />

3. Select the row of the incentive you want to link and click on **Link to reward**. The linked incentive's name, offer ID, and validity dates appear in the **Link Incentives** section.

<Image align="center" border={true} width="80%" src="https://files.readme.io/b25a9d7bd5c17f5b2eb3f849aed3a3ff6f11cb4eb4baa2ebb639684482ab2464-reward-catalog-new-ui-draft-2-google-docs_10.png" className="border" />

<Callout icon="📘" theme="info">
  **Note**

  * If no incentives appear, no active incentives of the compatible type exist in your organization yet. Create the incentive first in the relevant Rewards+ module, then return to this step.
  * **For Coupon type only:** After selecting a coupon, an **Edit** option appears that lets you edit the coupon's configuration directly within this panel without leaving the reward creation flow. The coupon edit form is the same as the one in [Coupon Management](https://docs.capillarytech.com/docs/manage-coupons). Refer to that page for a full description of each field.
</Callout>

#### All other reward types

For all other types, the link panel shows a list of existing **merchant rewards** which are pre-configured vendor integrations for that reward type. Only active merchant rewards appear and can be linked.

**To use an existing merchant reward:**

1. Select **Link Incentives** section and select the link entry.
2. Find the merchant reward using the search bar or **Merchant** filter.

<Image align="center" border={true} width="80%" src="https://files.readme.io/04a7e25e0c5501891f349e6db76ac16b43df3bf0907abc550df0d87b941a56e4-reward-catalog-new-ui-draft-2-google-docs_11.png" className="border" />

3. Select the row, then select **Link to reward**.

   <Image align="center" border={true} width="80%" src="https://files.readme.io/0a62604dad7aea377fa3f4b7248fcd5cd70e50f0720b6d9cf1d8fee4b525e3eb-reward-catalog-new-ui-draft-2-google-docs_12.png" className="border" />

**To create a new merchant reward:**

1. In the **Merchant** dropdown, select **+ Add merchant** at the bottom of the list. The **New merchant flow** panel opens.

   <Image align="center" border={true} width="80%" src="https://files.readme.io/6f0dd9618c7f0242e7950e33dd51f85d07624c01feb6a340439004d7511f1b37-reward-catalog-new-ui-draft-2-google-docs_13.png" className="border" />

Fill in the following fields:

| Field               | Description                                                                                                 | Business impact                                                                                                             |
| :------------------ | :---------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Merchant name       | Required. The display name for the vendor. Maximum 255 characters.                                          | Visible to reward administrators when selecting a merchant. A clear name prevents mismatched reward and vendor assignments. |
| Description         | Optional. A short description of the merchant. Maximum 1,034 characters.                                    | Helps administrators identify the right vendor at a glance, especially when multiple merchants of the same type exist.      |
| Merchant identifier | Optional. A unique identifier for the merchant. Maximum 50 characters. Must be unique across all merchants. | Used to reference this merchant in integrations or external systems; avoids duplicate entries.                              |

<Image align="center" border={true} width="80%" src="https://files.readme.io/c10c3455aeef869706f753b24e5e41b1b54eb7504be96aab9d76766f004be46b-reward-catalog-new-ui-draft-2-google-docs_14.png" className="border" />

**Adding additional details of the merchant**

Turning on the Additional details toggle exposes the following:

| Sub-field          | Description                                                                                          | Business impact                                                                                                                                                          |
| :----------------- | :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rank               | A positive integer that sets the merchant's display order in lists.                                  | Lower numbers appear first; use this to surface preferred or high-priority vendors above others.                                                                         |
| Key-value metadata | Custom attribute pairs attached to the merchant. Multiple pairs can be added.                        | Stores vendor-specific data (such as contract tier, region, or partner code) that Capillary does not capture in standard fields, making it available for downstream use. |
| Media              | Images (up to 5) and videos (up to 2) associated with the merchant. Each file must be 25 MB or less. | Provides visual assets that can be displayed in reward-facing interfaces, for example, vendor logos or promotional content shown to customers at redemption.             |

<br />

<Image align="center" border={true} width="80%" src="https://files.readme.io/43938aa99452150b26e282d3c748bd2ee6f3030b5bdfa573b44a5a2bee57a9b5-reward-catalog-new-ui-draft-2-google-docs_15.png" className="border" />

Select **Next : New merchant reward** to create **New merchant reward** panel.

2. Fill in the following fields:

| Field             | What it does                                                                |
| :---------------- | :-------------------------------------------------------------------------- |
| **Merchant name** | Required. Up to 255 characters. This name identifies the entry in the list. |
| **Reward type**   | Pre-filled and locked to the reward type from Step 1.                       |
| **Merchant**      | Select the vendor who fulfils this reward from the dropdown.                |

<Image align="center" border={true} width="80%" src="https://files.readme.io/fc12d555fe313c6d13554941feb4b589f4fa253d00f27e248ed1139efa8827fd-reward-catalog-new-ui-draft-2-google-docs_16.png" className="border" />

3. The **Add API for merchant reward** toggle is off by default. Turn it on if an API call is required. When on, the API is triggered, Capillary calls at the moment of redemption:

| Field               | What it does                                                                                                                                                                                           |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API Name**        | Label for this API call. Defaults to "API 1".                                                                                                                                                          |
| **Execution order** | Numeric order this API runs in when multiple APIs are configured. Lower numbers run first. Must be between 1 and 99.                                                                                   |
| **Import cURL**     | Paste a cURL command to auto-fill the API type, URL, headers, and body.                                                                                                                                |
| **API type**        | HTTP method: POST, GET, PUT, or DELETE.                                                                                                                                                                |
| **API URL**         | The vendor endpoint that receives the redemption request.                                                                                                                                              |
| **Headers**         | Request headers as key-value pairs, for example, an authorization token. Select **+ Key-value** to add.                                                                                                |
| **Request body**    | JSON payload sent with the request. Must be valid JSON.                                                                                                                                                |
| **Context keys**    | Maps fields from the API response to named keys that Capillary stores for subsequent actions. A **Voucher** key is pre-added for types that return codes. Select **+ Key-value** to add more mappings. |

Select **+ API** to add another API call. You can add up to 20 API calls per merchant reward. Multiple APIs run in execution order.

4. Select **Test API** to verify the configuration.

5. Select **Save merchant reward**. The entry appears in the list,  select it, then select **Link to reward**.

**You've now linked the incentive. Configure the cost below.**

## Cost of reward

Under **Cost of reward**, configure how customers pay for the reward. Add up to five payment modes to give customers flexible redemption options.

You can select one of the following cost types:

### Free

The reward costs nothing, no points deducted, no cash charged. The only gates are the audience filter and any inventory limits you've set.

Select **Free**. The system sets the cost to zero.

<Image align="center" border={true} width="80%" src="https://files.readme.io/e4445bb85395380f66b7b2078e4f34b6fb624c5f999a2387f17fbdcea3d06b1e-Screenshot_2026-05-17_at_9.09.36_PM.png" className="border" />

### Fixed cost

A set price that stays constant for every redemption. Each payment mode you configure appears as a separate redemption option on the reward detail page, adding more modes gives customers alternative ways to pay, not a higher price.

1. Select **Fixed cost**.

   <Image align="center" border={true} width="80%" src="https://files.readme.io/dfe38d35b0f3c17bb60111a812cf5201ca5c9fc9bb721a8e304490a040174ca1-Screenshot_2026-05-17_at_9.10.51_PM.png" className="border" />

2. Under **Payment mode 1**, select a sub-type:

| Sub-type          | What the customer pays                                           | Validation                                                                                                          |
| :---------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **Fixed cash**    | A set cash amount. Enter it in the **Cash Amount Required** box. | Must be a positive integer greater than 0.                                                                          |
| **Fixed points**  | A set number of points. Enter it in the **Points Required** box. | Must be a positive number greater than 0.                                                                           |
| **Cash + Points** | Both a cash amount and a points amount. Enter both values.       | Both the cash amount and the points amount are required and must each be greater than 0. Neither can be left empty. |

<Image align="center" border={true} width="80%" src="https://files.readme.io/9af04fedbeae63b977107dc5806d58fb40bd9dd2ea71b831f191f5565d266568-Screenshot_2026-05-17_at_9.12.28_PM.png" className="border" />

3. (Optional) Select **Add payment mode** to add more options. You can add up to five payment modes per reward.

<Image align="center" border={true} width="80%" src="https://files.readme.io/fe70c7b52fa2733fbd0b504837ce5aa5841d0082ef2a48ed66e83ce5c936363c-Screenshot_2026-05-17_at_9.13.43_PM.png" className="border" />

**Combination rules:**

* **Fixed cash** and **Fixed points** can each be added only once. If either is already configured, that option is disabled in the **Add payment mode** menu.
* **Cash + Points** can be added multiple times. Each entry is independent, with its own cash and points amounts.
* All three subtypes can be combined in a single reward. For example, you can configure Fixed cash + Fixed points + two Cash + Points entries (four payment modes total), giving customers four different ways to pay.

### Variable cost

Use variable cost when the reward's value isn't fixed, for example, a wallet credit where the customer chooses the amount. The customer enters the amount they want, and the system calculates the points required using the rate you set. The reward's linked incentive determines the minimum and maximum amounts available.

<Callout icon="📘" theme="info">
  **Note**

  Variable cost is available only for the following reward types: **Auction**, **Charity**, **Gift card**, **Miles**, **Sweepstakes**, and **Wallet offer**. For all other reward types, this option does not appear.
</Callout>

1. Select **Variable cost**.

<Image align="center" border={true} width="80%" src="https://files.readme.io/6e3fa80c45f5b14eab6e07b15a7d7ebf1edd7245d255bd3558fd3d6a05726e7d-Screenshot_2026-05-17_at_9.14.58_PM.png" className="border" />

2. In the **Value of 1 point =** box, enter the conversion rate. The value must be greater than 0. For example, `0.5` means 1 point = $0.50, so a $500 reward costs 1,000 points.

<Image align="center" border={true} width="80%" src="https://files.readme.io/33214e2156bd0ae20511bb02a808ad0d278afa89827980d07d2938c9441adaed-Screenshot_2026-05-17_at_9.16.38_PM.png" className="border" />

The system shows a real-time confirmation: *"To purchase 1 value of reward, \[X] points will be redeemed."*

<Callout icon="⚠️" theme="warning">
  **Loyalty program prerequisite for decimal redemptions**

  When the Value of 1 point is set to a decimal number, the points a customer needs to redeem a reward may not always be a whole number. If your Loyalty program is not configured to handle decimal points, these redemptions will fail. To prevent this, [set Allow redemption in multiples](https://docs.capillarytech.com/docs/points#points-consumption-order) of to 0.001 in your Loyalty program's redeem conditions.

  For example, if a customer wants to redeem a reward worth $5 and the value of 1 point is set to 0.233, each loyalty point is worth $0.233 of reward value. To find out how many points are needed, the system divides the reward value by the point value: 5 ÷ 0.233 = 21.459 points, which is a decimal number. By default, Loyalty programs are configured to allow redemptions only in whole numbers (multiples of 1). In this case, the redemption would fail because 21.459 is not a valid whole number of points. You have to configure ["Allow redemption in multiples of"](https://docs.capillarytech.com/docs/points#points-consumption-order) settings in loyalty program to **0.001** for the program to accept redemptions in decimals, allowing 21.459 points to go through successfully.
</Callout>

**You've now configured the incentive and cost. You can set inventory limits to control how often the reward can be redeemed.**

# **Step 4: Inventory limits**

Set limits on how many times the reward can be redeemed. On every redemption attempt, the system checks all configured limits. If any limit is exhausted, the redemption is blocked until the restriction period resets or the limit is cleared.

Inventory limits are optional. Without them, the reward is redeemable unlimited times by any eligible customer.

<br />

Select **Add Limit** to add a limit row.

<Image align="center" border={true} width="80% " src="https://files.readme.io/e2c410d304560b94a4b7f3b923076c2f9bbc7eab04f06a030885710e3afe38d4-Screenshot_2026-05-18_at_3.33.07_PM.png" className="border" />

<br />

Each limit is a single row with three fields:

<Image align="center" border={true} src="https://files.readme.io/fa545a3a15e8fbd70aed27765d51efb9a11c6007e63637938bf7c3171fc17cad-image.png" className="border" />

**Maximum allowed** \[KPI] **is** \[value] \[**scope of limit**] **for the reward duration**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Options
      </th>

      <th>
        Notes
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **KPI**
      </td>

      <td>
        * **quantity of reward** — counts the number of redemptions.
        * **value of reward** — counts the total monetary value redeemed.
      </td>

      <td>
        "value of reward" is only available for variable-cost reward types (Auction, Charity, Miles, Cash Wallet, Sweepstakes, Gift Card) when a variable cost payment mode is configured in Step 3.
      </td>
    </tr>

    <tr>
      <td>
        **Value**
      </td>

      <td>
        A positive number.
      </td>

      <td>
        Enter the maximum allowed value before the limit blocks further redemptions.
      </td>
    </tr>

    <tr>
      <td>
        **Scope of limit**
      </td>

      <td>
        * **per member** — applies per individual customer.
        * **per reward** — applies across all customers combined.
      </td>

      <td>
        Both options are always available regardless of reward type.
      </td>
    </tr>
  </tbody>
</Table>

By default, the limit applies **for the reward duration** (lifetime cap with no reset). To make the limit reset periodically, select **+ Add reset period**.

<Image align="center" border={true} src="https://files.readme.io/ba6f30dc370680e0b2459e6f46844df259a2db35cbfe4024cbefc718a68da27c-Screenshot_2026-05-18_at_3.30.35_PM.png" className="border" />

<br />

## Reset periods

Select **+ Add reset period** on a limit row to add a recurring reset. The period dropdown offers:

| Period                   | How it works                                                                                                                                                |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **every X day(s)**       | Fixed window — all customers share the same cycle. Enter the number of days. The cycle anchor date is set when the reward is created.                       |
| **every week**           | Fixed window — resets for all customers at the start of each week.                                                                                          |
| **every calendar month** | Fixed window — resets for all customers at the start of each calendar month.                                                                                |
| **for last X day(s)**    | Rolling window — evaluates each customer’s history in real time. A redemption on June 3 with a 7-day window counts until June 10. Enter the number of days. |

**Fixed and rolling windows cannot be mixed.** Once one limit on the reward uses a fixed window period, all subsequent timed limits must also use a fixed window period, and vice versa.

To remove a reset period from a limit, select **Remove reset period**. The limit reverts to a lifetime cap.

## Add multiple limits

Select **Add Limit** to add another limit row. You can stack limits of different scopes and periods — for example, a per-member limit of 1 per day and a per-reward limit of 500 for the full duration. On every redemption attempt, all limits are checked. If any one is exhausted, the redemption is blocked.

**Maximum limits per reward:**

* Up to **8 limits** when no reset periods are configured.
* Up to **10 limits** when at least one limit has a reset period.
* Per-member (scope) limits are capped at **8**. Per-reward (scope) limits are capped at **10**.

**You’ve now configured inventory limits. You can add localized content for a global audience next.**

# **Step 5: Content in multi-language**

Localize the reward's name, description, terms, and media so the system serves each customer the version that matches their language preference. If a customer's app or website is set to Arabic, they see the Arabic name, description, terms, and images you configure here. If you haven't configured Arabic, they see the default language (English).

Configure content for each language set up in your organization's [language settings](https://docs.capillarytech.com/docs/rewards-catalog-settings#languages).

1. In the **Content in multi-language** section, select **Edit** next to the language you want to configure.

   <Image align="center" border={true} width="80% " src="https://files.readme.io/5764ec3ce78b03f75e9d1c875083f5ac6b67d887f6184e061ab750ae05c1fc49-Screenshot_2026-05-18_at_10.43.23_AM.png" className="border" />

2. Configure the following fields:

| Field                    | What it does                                                                                                                                                                                                                                                                        |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Activate language**    | Turning this off for a specific language doesn't remove the reward from those customers. It reverts them to the default language. The reward stays visible; only the language version switches. The default language can't be turned off.                                           |
| **Reward name**          | The localized reward name shown to customers browsing in this language. Maximum 255 characters.                                                                                                                                                                                     |
| **Description**          | (Optional) The localized description shown on the reward detail page. Maximum 4,000 characters.                                                                                                                                                                                     |
| **Terms and Conditions** | (Optional) Appears as expandable fine print on the reward detail page. Supports rich text so you can format it with bullet points, bold text, and links. Maximum 50,000 characters.                                                                                                 |
| **Upload media**         | Localized images and videos. Drag and drop files, select **Upload** to browse, or select **Paste URL** to link media from a web address. Up to 10 images (10 MB each) and 2 videos (25 MB each).                                                                                    |
| **Reward image**         | The main image displayed on the reward detail page for this language.                                                                                                                                                                                                               |
| **Thumbnail image**      | A smaller image is used in the list and preview views for this language.                                                                                                                                                                                                            |
| **Custom fields**        | (Optional) These are "Reward creation" scoped custom fields from your organization settings. They appear here so their values can vary per language, for example, a localized tagline or market-specific product code. Select **Add custom field** to choose from available fields. |

![](https://files.readme.io/39bb4a2111c000decf5ff272a3046c5d7b14c4deced02b4ec1be61045773c888-image.png)

<br />

3. Select **Save** to confirm the content for this language.

4. To add content for another language, select **+ Language** and repeat the steps above. To add languages, go to **Settings** > **Languages** > **New language**.

<Image align="center" width="80% " src="https://files.readme.io/265a7c148a8d14726c88b15a822eb3886fb8b6e61f79f52447efbb58724fadfa-Screenshot_2026-05-18_at_10.48.03_AM.png" />

**You've now localized the reward content. You can add internal metadata to organize the reward in the catalog next.**

# **Step 6: Additional details**

Add metadata to control how the reward appears in the catalog and how it's organized internally. All fields in this step are optional. Create groups and categories in [catalog settings](https://docs.capillarytech.com/docs/rewards-catalog-settings) before assigning them here.

| Field              | What it does                                                                                                                                                                                                                                                                                           | Character limit |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| **Reward rank**    | Controls the order rewards appear in the catalog list view. Rank 1 appears at the top. Rewards with no rank assigned appear below all ranked rewards, in creation order. Lower number = higher position. Must be a positive integer.                                                                   | Not applicable  |
| **Group and rank** | Assigns the reward to a browsable group in the catalog. The rank within the group controls the order rewards appear within that group's view. Nesting groups creates a hierarchy (for example, "Summer Sale > Clothing > Women's") that customers navigate. The group rank must be a positive integer. | Not applicable  |
| **Category**       | Customers can filter the catalog by category. Assigning "Electronics" makes this reward appear when a customer applies the Electronics filter. A reward can belong to only one category.                                                                                                               | Not applicable  |
| **Priority**       | Internal only. Customers never see this. Use it for workflow prioritization when reviewing or approving rewards. It has no effect on catalog display order.                                                                                                                                            | Not applicable  |
| **Tier**           | A text label for reporting and internal organization. This does NOT control who can see or redeem the reward, which is configured in Step 2. Use it to tag rewards as "Gold" or "Platinum" so you can filter by tier in analytics.                                                                     | 255 characters  |
| **Group**          | Different from the **Group and rank** field above. This is a free-text internal tag used for grouping in reports. Customers don't see it.                                                                                                                                                              | 255 characters  |
| **Label**          | Appears as a visible badge directly on the reward card in the catalog while customers browse. Use it for urgency cues like "Selling fast, only 23 left!" or "Ends tonight at 11:59 PM."                                                                                                                | 255 characters  |

<br />

<Image align="center" border={true} width="80% " src="https://files.readme.io/65b99052d97a8a548f12b263efbea3f9d603583066a338fc92aa6ce484c9f2fd-Screenshot_2026-05-18_at_11.20.29_AM.png" className="border" />

**You've now added the reward's metadata. Review the full configuration before saving.**

# **Step 7: Preview and save**

Before creating the reward, review the complete configuration.

1. Select **Preview** at the bottom of the page.

2. The preview screen shows a read-only summary across all sections:

   * Basic details

   * Who can view the reward

   * Incentive and cost details

   * Inventory limits

   * Content in multi-language

   * Additional details

3. Expand any section to review the details. Select **Back** to return and make changes.

4. Select **Save** to create the reward and add it to the catalog.

   If you exit before saving, a confirmation dialog appears: "Discard unsaved reward details?" with the message "This reward's configuration will be lost and cannot be recovered." Confirming this dialog permanently discards all entered configuration.

**You've now fully configured a new reward. It goes live on its scheduled start date if the Activate reward toggle is on, or stays invisible to customers until you activate it manually.**

<br />