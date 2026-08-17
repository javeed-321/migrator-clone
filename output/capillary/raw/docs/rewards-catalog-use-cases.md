---
updatedAt: 2026-06-03T06:34:10.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Rewards catalog - use cases

# Use case 1: Restrict a cashback reward to Gold tier members

**Requirement:** A fashion retailer wants to offer a 10% cashback reward exclusively to Gold-tier loyalty members. Silver and lower-tier customers should not see or redeem it.

## Step 1: Basic details

1. Go to **Rewards+** > **Rewards Catalog** and select **New Reward**.
2. Configure the following:

| Field               | Value                                                          |
| :------------------ | :------------------------------------------------------------- |
| **Name**            | Gold Member Cashback - 10%                                     |
| **Description**     | 10% cashback for Gold-tier members on qualifying transactions. |
| **Duration**        | Campaign start date — 31 Dec 2025                              |
| **Reward type**     | Cashback                                                       |
| **Activate reward** | On                                                             |

<Image align="center" border={true} width="80% " src="https://files.readme.io/d268778fa683c8178ca7f156b148402d3aa688c13d7ada9beaf0b0b3c0328b54-image.png" className="border" />

<br />

3. Select **Continue**.

## Step 2: Who can view the reward?

1. Select **Specific customers**.
2. From **Filter customers based on**, select **Loyalty program, Tier and Supplementary program**.
3. Configure the following:

| Field                                                      | Value                    |
| :--------------------------------------------------------- | :----------------------- |
| **Loyalty Program**                                        | Prestige Rewards Program |
| **Select specific tiers or supplementary program or both** | Enabled                  |
| **Tier in selected loyalty program**                       | Gold                     |

<Image align="center" border={true} width="80% " src="https://files.readme.io/048e387b8ba73971c70b734f531aac189f105519e57f2fab73aa7d054ba17bcc-Screenshot_2026-05-18_at_12.36.47_PM.png" className="border" />

4. Complete the remaining steps and select **Save**.

The reward is now visible only to Gold-tier members.

***

# Use case 2: Restrict a gift voucher to VIP customers

**Requirement:** A fashion brand running an exclusive preview sale wants to issue a ₹500 gift voucher only to customers tagged as "valuable customer". Non-VIP customers should have no visibility of the reward.

## Step 1: Basic details

1. Go to **Rewards+** > **Rewards Catalog** and select **New Reward**.
2. Configure the following:

| Field               | Value                                                                  |
| :------------------ | :--------------------------------------------------------------------- |
| **Name**            | VIP Exclusive Preview Sale Voucher - ₹500                              |
| **Description**     | Exclusive ₹500 gift voucher for VIP customers during the preview sale. |
| **Duration**        | Campaign start date — 15 Dec 2025                                      |
| **Reward type**     | Gift Voucher                                                           |
| **Activate reward** | On                                                                     |

<Image align="center" border={true} width="80% " src="https://files.readme.io/56f9a0e6bfc8f842b1de843071f2985a2ffeb6049b1c925bc64b9b18259c4db7-image.png" className="border" />

<br />

3. Select **Continue**.

## Step 2: Who can view the reward?

1. Select **Specific customers**.
2. From **Filter customers based on**, select **Customer label**.
3. Configure the following:

| Field              | Value |
| :----------------- | :---- |
| **Customer label** | VIP   |

<Image align="center" border={true} width="80% " src="https://files.readme.io/a2a2b142e60440ad28fe0c438c03354b0cd23f5be293c6e2792535eb33998f21-Screenshot_2026-05-18_at_12.49.08_PM.png" className="border" />

4. Complete the remaining steps and select **Save**.

The reward is now visible only to Valuable customer labelled customers. Non-VIP customers cannot see or redeem the reward.

***

# Use case 3: Restrict a wallet offer to a specific card series (NOT DONE)

**Requirement:** A bank has partnered with a retail brand to offer ₹200 wallet credits exclusively to HDFC Signature co-branded cardholders. Customers with any other card or no card should not see the offer.

## Step 1: Basic details

1. Go to **Rewards+** > **Rewards Catalog** and select **New Reward**.
2. Configure the following:

| Field               | Value                                                                     |
| :------------------ | :------------------------------------------------------------------------ |
| **Name**            | HDFC Signature Cardholder Wallet Credit - ₹200                            |
| **Description**     | ₹200 wallet credit exclusively for HDFC Signature co-branded cardholders. |
| **Duration**        | Campaign start date — 31 Jan 2026                                         |
| **Reward type**     | Wallet Offer                                                              |
| **Activate reward** | On                                                                        |

<Image align="center" border={true} width="80% " src="https://files.readme.io/7e6a79be04a4b032d1358658f2bac0eb9c1ab9a38bc35084be31e3d6c89d6f4b-image.png" className="border" />

<br />

3. Select **Continue**.

## Step 2: Who can view the reward?

1. Select **Specific customers**.
2. From **Filter customers based on**, select **Card Series**.
3. Configure the following:

| Field           | Value          |
| :-------------- | :------------- |
| **Card Series** | HDFC Signature |

<br />

4. Complete the remaining steps and select **Save**.

The reward is now visible only to customers holding the HDFC Signature card. Customers with a different card or no card will not see it in the catalog API response.

***

# Use case 4: AND logic across audience filters : Program and Tier

**Requirement:** A travel brand wants to offer a free airport lounge access coupon only to customers who are both enrolled in the Prestige Travel Program and hold Platinum tier status. Enrollment in the program alone or Platinum status in a different program is not sufficient.

## Step 1: Basic details

1. Go to **Rewards+** > **Rewards Catalog** and select **New Reward**.
2. Configure the following:

| Field               | Value                                                                             |
| :------------------ | :-------------------------------------------------------------------------------- |
| **Name**            | Platinum Prestige - Free Airport Lounge Access                                    |
| **Description**     | Complimentary airport lounge access for Prestige Travel Program Platinum members. |
| **Duration**        | Campaign start date — 31 Mar 2026                                                 |
| **Reward type**     | Coupon                                                                            |
| **Activate reward** | On                                                                                |

<Image align="center" border={true} width="80% " src="https://files.readme.io/74f9559951954c3dfbda0d98e7ba1003e7dac968783571ab699f177ced06eef0-image.png" className="border" />

<br />

3. Select **Continue**.

## Step 2: Who can view the reward?

1. Select **Specific customers**.
2. From **Filter customers based on**, select **Loyalty program, Tier and Supplementary program**.
3. Configure the following:

| Field                                                      | Value                   |
| :--------------------------------------------------------- | :---------------------- |
| **Loyalty Program**                                        | Prestige Travel Program |
| **Select specific tiers or supplementary program or both** | Enabled                 |
| **Tier in selected loyalty program**                       | Platinum                |

<Image align="center" border={true} width="80% " src="https://files.readme.io/0d00543a6bc44c30e6bc13293fec6354bba0ba3d63c70f07ffa0369ec1bd23d3-image.png" className="border" />

<br />

4. Complete the remaining steps and select **Save**.

The reward is now visible only to customers who are enrolled in the Prestige Travel Program and hold Platinum tier status. Customers in the same program at a lower tier, customers in a different program, and customers with no program enrollment will not see it in the user reward API response.

<br />

# Use case 5: Create a Gold-tier-only discount coupon

**Requirement:** A fashion retailer wants to offer Gold tier members an exclusive 20% discount coupon redeemable in-store, available for one month and limited to one redemption per customer.

## Step 1: Basic details

1. Go to **Rewards+** > **Rewards Catalog** and select **New Reward**.
2. Configure the following:

| Field                | Value                                                              |
| :------------------- | :----------------------------------------------------------------- |
| **Name**             | Gold Member 20% Off Coupon                                         |
| **Description**      | Exclusive 20% discount for Gold tier members, valid in-store only. |
| **Duration**         | Campaign start date — last day of the month                        |
| **Reward type**      | Coupon                                                             |
| **Reward issued by** | Your organization name                                             |
| **Activate reward**  | On                                                                 |

<Image align="center" border={true} width="80% " src="https://files.readme.io/ddfcb877ba99db57c6121b386bad78492a60c019faec080f7b7a3c0866b69c14-image.png" className="border" />

<br />

3. Select **Continue**.

## Step 2: Who can view the reward?

1. Select **Specific customers**.
2. From **Filter customers based on**, select **Loyalty program, Tier and Supplementary program**.
3. Configure the following:

| Field                                                      | Value                       |
| :--------------------------------------------------------- | :-------------------------- |
| **Loyalty program**                                        | Select your loyalty program |
| **Select specific tiers or supplementary program or both** | Enabled                     |
| **Tier in selected loyalty program**                       | Gold                        |

<Image align="center" border={true} width="80% " src="https://files.readme.io/b8b69b02ca06a2dbffe2605adfee1e28b560e539e122c7714b7fa5d94e89c263-image.png" className="border" />

<br />

4. Select **Continue**.

## Step 3: Incentive and cost details

1. Under **Link Incentives**, select the link entry and choose the coupon series configured with 20% off from the panel.
2. Under **Cost of reward**, select **Free**.

<br />

3. Select **Continue**.

   <Image align="center" border={true} src="https://files.readme.io/2f708a2c6751fc114c368c51fd9c00f10f7917532521929be7b9ed6ba6baf03f-image.png" className="border" />

## Step 4: Inventory limits

1. Select **Add Limit** and configure the following:

| Field              | Value              |
| :----------------- | :----------------- |
| **KPI**            | quantity of reward |
| **Value**          | 1                  |
| **Scope of limit** | per member         |

<Image align="center" border={true} width="80% " src="https://files.readme.io/72f243ae31cd1c96b468e91247f54d994338b846191c8379d0e597a58362339d-image.png" className="border" />

<br />

2. Complete the remaining steps and select **Save**.

Gold tier customers see this coupon in their catalog for the entire month. Each customer can redeem it once. Non-Gold customers cannot see it.

# Use case 6: Run a weekend flash sale with a total redemption cap

**Requirement:** A grocery chain wants to give away a free ₹200 grocery voucher over a single weekend — limited to the first 300 customers who claim it, with one voucher per customer.

## Step 1: Basic details

1. Go to **Rewards+** > **Rewards Catalog** and select **New Reward**.
2. Configure the following:

| Field               | Value                                                                                   |
| :------------------ | :-------------------------------------------------------------------------------------- |
| **Name**            | Weekend Flash: Free ₹200 Grocery Voucher                                                |
| **Description**     | Claim your free ₹200 grocery voucher this weekend — limited to the first 300 customers. |
| **Duration**        | Saturday 00:00 — Sunday 23:59                                                           |
| **Reward type**     | Gift voucher                                                                            |
| **Activate reward** | On                                                                                      |

<Image align="center" border={true} width="80% " src="https://files.readme.io/f79560b1200af468d8c9cabdfaa7775ccfbeacf9e82a8bea2216f294f8335929-image.png" className="border" />

<br />

3. Select **Continue**.

## Step 2: Who can view the reward?

1. Select **All customers**, then select **Continue**.

   <Image align="center" border={true} width="80% " src="https://files.readme.io/f9fdf4d0ac90cc88ce0f27afa3515390c14a7ee46edf6492e765ea4af78e622f-image.png" className="border" />

## Step 3: Incentive and cost details

1. Under **Link Incentives**, select the grocery voucher incentive from the panel.
2. Under **Cost of reward**, select **Free**, then select **Continue**.

<Image align="center" border={true} width="80% " src="https://files.readme.io/6b165df8c00c2ec2f62e79a690b4ad1abd28ba797a425d6a1c759a8ccfe48c8a-image.png" className="border" />

## Step 4: Inventory limits

1. Select **Add Limit** and configure the per-customer limit:

| Field              | Value              |
| :----------------- | :----------------- |
| **KPI**            | quantity of reward |
| **Value**          | 1                  |
| **Scope of limit** | per member         |

<Image align="center" border={true} width="80% " src="https://files.readme.io/535632453b75ece3fada69ce49b276707a346952e5dafbc48722fd06a8e7ce5a-image.png" className="border" />

<br />

2. Select **Add Limit** again and configure the total limit for reward:

| Field              | Value              |
| :----------------- | :----------------- |
| **KPI**            | quantity of reward |
| **Value**          | 300                |
| **Scope of limit** | per reward         |

<Image align="center" border={true} width="80% " src="https://files.readme.io/9a6e93415a6ea4acc80664ab93143eadab577cfbba8e730f0225d4b76468bad6-image.png" className="border" />

3. Select **Continue**.

## Step 6: Additional details

1. In **Label**, enter `Hurry — only 300 available!`.

<Image align="center" border={true} src="https://files.readme.io/828cd6b988043f2acac3d3dc4555f0b42725a75770cac77fcc74f8b2d6060541-Screenshot_2026-05-20_at_5.01.27_PM.png" className="border" />

2. Complete the remaining steps and select **Save**.

The voucher disappears from the catalog the moment 300 customers claim it or the weekend ends, whichever comes first. Each customer can claim only one.

# Use case 7: Let customers convert points to airline miles

**Requirement:** A travel brand has partnered with an airline and wants customers to convert their loyalty points into miles at a fixed rate of 0.5 miles per point. Customers choose how many miles they want.

## Step 1: Basic details

1. Go to **Rewards+** > **Rewards Catalog** and select **New Reward**.
2. Configure the following:

| Field               | Value                                                                 |
| :------------------ | :-------------------------------------------------------------------- |
| **Name**            | Convert Points to AirCap Miles                                        |
| **Description**     | Convert your loyalty points into AirCap miles at 0.5 miles per point. |
| **Duration**        | Partnership campaign window                                           |
| **Reward type**     | Miles                                                                 |
| **Activate reward** | On                                                                    |

<Image align="center" border={true} width="80% " src="https://files.readme.io/3e5729b98756f4fdd7a3c524bc1e8781f1b9844c84aeed8e9f6cd5a1257a5e1f-image.png" className="border" />

3. Select **Continue**.

## Step 2: Who can view the reward?

1. Select **All customers**, then select **Continue**.

   <Image align="center" border={true} width="80% " src="https://files.readme.io/191cca360733a165ac1b2ae96933940d3db1e5cfcf41bfbdfc367016f65b6b8c-image.png" className="border" />

## Step 3: Incentive and cost details

1. Under **Link Incentives**, select the link entry, find the Miles merchant reward from the panel, select the row, then select **Link to reward**.
2. Under **Cost of reward**, select **Variable cost** and configure the following:

| Field                  | Value |
| :--------------------- | :---- |
| **Value of 1 point =** | 0.5   |

3. Confirm the system shows: *"To purchase 1 value of reward, 2 points will be redeemed."*
4. Complete the remaining steps and select **Save**.

Customers enter the number of miles they want; the system calculates the points to deduct at checkout automatically.

***

<br />