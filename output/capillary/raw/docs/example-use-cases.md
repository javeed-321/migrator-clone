---
updatedAt: 2026-08-16T19:35:06.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Example Use Cases

# Use case 1:  Buy 2 Get 1 Free

**Requirement**: Automatically discount 1 item when a customer adds 3 qualifying items to their cart.

**Promotion Type**: POS Cart Promotion, which automatically apply discount if the criteria are fulfilled.  (no coupon code required).

## Step 1: Basic setup

1. Navigate: Go to Engage+ > Campaigns > Select your active campaign.
2. Create: Go to the Promotions tab and click New cart promotion.
3. Define Basic Details:
   * **Name**: Enter a clear system name (for example, PROMO\_B2G1\_Coffee\_Jan25).
   * **Description**: "Buy any 2 Coffees, Get the 3rd Free. Applied to the lowest price item."
   * **Timezone**: Specifies the timezone where the promotion was created
   * **Duration**: Set the Start Date and End Date.
   * **Promotion Type**: Select POS Cart Promotion. This type ensures that the POS automatically triggers the discount when the cart rules are met.

<Image align="center" border={true} width="80% " src="https://files.readme.io/a9307d75c5d4702bf21fdc4d63ad554e7a9f3997259fd788c04da9d17332eb1d-1.png" className="border" />

## Step 2: Configuration

Scroll to the section Availing conditions and benefits.

### Step 2.2: Set the trigger (condition)

You need to tell the system to count specific items.

1. Click Add conditions/benefits.

<Image align="center" border={true} width="80% " src="https://files.readme.io/0be7e1b7ea768acae7a3ea0a7d8d935bf981c55dcec682c4dd4d8b57657b8634-Screenshot_2026-02-11_at_2.54.29_PM.png" className="border" />

<br />

2. In the Conditions column, configure the following:

| Field Name           | Selection / Value                                  | Explanation                                                                                                                     |
| :------------------- | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| Qualifying Condition | Sum of line item quantity for the selected product | We are counting how many items are in the basket, not the price of the items.                                                   |
| Select Product       | Select or upload sku                               | Defines which items count toward the deal. You can also select specific categories here.                                        |
| Operator             | Greater than or equal to                           | Allows the deal to trigger when the product quantity reaches the specified criteria.                                            |
| Value                | 3                                                  | CRITICAL: This is the Total Cart Count required. The customer must bring 2 paid items + 1 free item to the counter (Total = 3). |

<br />

<Image align="center" border={true} width="70% " src="https://files.readme.io/dc0f4637a0755f2f6059ea319d875120082d9c25c41c672f12d6c182275c2c7b-Screenshot_2026-02-11_at_3.13.54_PM.png" className="border" />

<br />

### Step 2.3: Set the reward benefits

You need to tell the system which item gets the discount.

1. In the Benefits column, configure the following:

| Field Name     | Selection / Value             | Explanation                                                                             |
| :------------- | :---------------------------- | :-------------------------------------------------------------------------------------- |
| Benefit On     | Selected products in the cart | Ensures the discount applies only to the coffee, not unrelated items like gum or water. |
| Select Product | SKU                           | Must match the sku selected in Conditions.                                              |
| Benefit type   | Free product                  | This gives the qualifying item for free when the cart quantity condition is met.        |

<Image align="center" border={true} width="70% " src="https://files.readme.io/31be79fde6768bdac7bebc27c18fd753a3809c65d4646af71d5c234b9defd98d-Screenshot_2026-02-11_at_3.16.50_PM.png" className="border" />

<br />

## Step 3: Restrictions and limits

Prevent revenue loss and system abuse.

### 3.1. Repeat behavior (cart limits)

Scroll to **Define scope and restrictions on availing promotions** Click on continue towards **Restriction tab**

* Field: Number of times promotion can be redeemed in a single cart
  * Option A: Add value as `1` for Single Use.

    * **Behavior**: Customer buys 6 coffees -> Gets 1 free.
    * **Use Case**: Limited-time offers.

    <Image align="center" border={true} width="70% " src="https://files.readme.io/ec933be5a21da6549be15acb420207d9cb4bef851ef20f06c734389bf0693318-Screenshot_2026-02-11_at_3.24.01_PM.png" className="border" />

    * Option B: You can leave the value empty if you require no limit.
      * **Behavior**: Customer buys 6 coffees -> Gets 2 free.
      * **Use Case**: Standard "Happy Hour" behavior.

### 4.2. Stacking and exclusivity

Navigate to Compatibility settings (bottom of page).

* **Setting**: Mark this promotion as exclusive at the cart level.
* **Action**: Turn the toggle `ON`.
* **Why**: This prevents "Double Dipping." If a customer has a "10% Off Entire Bill" coupon, enabling exclusivity ensures they cannot use it on top of getting a free coffee. The system will calculate which offer gives the customer the best deal and apply only that one.

# Use case 2:  Configuring combo product promotion (Coffee + Sandwich)

**Requirement:** Increase average transaction value by offering a **10% discount** on both items when a customer purchases at least one Coffee and one Sandwich together.

**Promotion Type:** **POS Cart Promotion**, which automatically applies the discount if the criteria are fulfilled (no coupon code required).

## Step 1: Basic setup

* **Navigate:** Go to **Engage+** > **Campaigns** > Select your active campaign.
* **Create:** Go to the **Promotions** tab and click **New cart promotion**.
* **Define Basic Details:**
  * **Name:** PROMO\_BUNDLE\_COFFEE\_SANDWICH\_2026.
  * **Description:** "Purchase any Coffee and any Sandwich together to receive 10% off both items."
  * **Timezone:** Set to the local timezone of the store.
  * **Duration:** Set the Start Date and End Date.
  * **Promotion Type:** Select **POS Cart Promotion**.

## Step 2: Configuration

Scroll to the section **Availing conditions and benefits**.

**Step 2.2: Set the Trigger (Condition)**

You need to tell the system to look for a specific mix of different categories.

| Field Name        | Selection / Value                                     | Explanation                                                                    |
| :---------------- | :---------------------------------------------------- | :----------------------------------------------------------------------------- |
| **Cart Property** | **Sum of line item quantity for selected product**    | Allows the system to look for a specific mix of units across categories.       |
| **Product Scope** | Group 1: Category: Coffee Group 2: Category: Sandwich | Defines that both a Coffee and a Sandwich must be present to trigger the deal. |
| **Operator**      | **Greater than or equal to (>=)**                     | Triggers once the minimum quantity for both groups is met.                     |
| **Value**         | **1** (for both groups)                               | Requires at least one unit from each category to be in the cart.               |

<Image align="center" border={true} width="70% " src="https://files.readme.io/e3ccda0fe727c1ce8c345b299e22917c871d09d37dad8a51b0d9d74d877a79da-Screenshot_2026-02-16_at_12.03.25_PM.png" className="border" />

**Step 2.3: Set the Reward Benefits**

You need to tell the system which items in the bundle get the discount.

| Field Name         | Selection / Value                 | Explanation                                                                        |
| :----------------- | :-------------------------------- | :--------------------------------------------------------------------------------- |
| **Benefit On**     | **Selected products in the cart** | Ensures the discount applies specifically to the Coffee and Sandwich.              |
| **Product Logic**  | **Selected in condition**         | Directs the 10% discount only to the specific items that met the trigger criteria. |
| **Benefit Action** | **Percentage Based**              | The discount is calculated as a fraction of the item's price.                      |
| **Value**          | **10**                            | The percentage amount to be deducted from each qualifying item.                    |

<Image align="center" border={true} width="70% " src="https://files.readme.io/322afb4711a88f481a6c3bcb0de2afad5ca3835a69ed7e3f3478ccd77b8aac71-Screenshot_2026-02-16_at_12.09.30_PM.png" className="border" />

<br />

* **Why:** This prevents "Double Dipping." If the Coffee is already discounted via another item-level offer, this prevents the bundle discount from stacking on that same unit.

# Use case 3: Configuring tiered milestone rewards

**Requirement:** Reward repeat customers by offering a **25% discount** on their 3rd purchase of high-value lubricants after completing two prior qualifying transactions.

**Promotion Type:** **Loyalty Earning Promotion**, which requires customer identification at the POS to track historical behavior.

## Step 1: Basic setup

* **Navigate:** Go to **Engage+** > **Campaigns** > Select your active campaign.
* **Create:** Go to the **Promotions** tab and click **New cart promotion**.
* **Define Basic Details:**
  * **Name:** PROMO\_LUBE\_LOYALTY\_25OFF\_2026.
  * **Description:** "25% off your 3rd Oil Change after 2 prior qualifying purchases."
  * **Promotion Type:** Select **Loyalty Earning Promotion**.

## Step 2: Configuration

Scroll to the **Promotion Earning** section.

**Step 2.2: Set the Milestone Trigger**

<Image align="center" border={true} width="70% " src="https://files.readme.io/47fddc1428f259291cc6a822db18178a76662441821bcd2bc3b41f74ee847ef1-Screenshot_2026-02-16_at_12.24.11_PM.png" className="border" />

You need to target a specific milestone goal that the audience group must achieve.

| Field Name                       | Selection / Value            | Explanation                                                                      |
| :------------------------------- | :--------------------------- | :------------------------------------------------------------------------------- |
| **Select Milestone Group**       | Choose your predefined group | Connects the promotion to a specific group of customers tracked for oil changes. |
| **Select Milestone**             | Predefined Milestone Target  | Defines the specific goal (e.g., 3 transactions) required to earn the reward.    |
| **Maximum earning per customer** | Toggle ON & Enter "**1**"    | Limits how many times the reward is issued.                                      |

<br />

<Image align="center" border={true} width="70% " src="https://files.readme.io/a638c78a7e7f7df033c3ba8801a21cff00f6d724b31dda8b2ea66c621253eeb9-Screenshot_2026-02-16_at_12.26.06_PM.png" className="border" />

**Step 2.3: Set the Reward Benefits**

You need to define the discount available once the milestone is met.

<Image align="center" border={true} width="70% " src="https://files.readme.io/c0d23ce4c07768cc055931d482f07e604b337a0afb57bb697acc4304c79fb46e-Screenshot_2026-02-16_at_12.27.33_PM.png" className="border" />

<br />

Set the specific conditions that trigger the earning process for each transaction.

| Field Name        | Selection / Value          | Explanation                                                              |
| :---------------- | :------------------------- | :----------------------------------------------------------------------- |
| **Cart Property** | **Cart amount**            | Evaluates the total monetary value of the transaction.                   |
| **Operator**      | Greater than or equal to   | Triggers the earning logic once the spend reaches the target.            |
| **Value**         | **\[Enter Minimum Spend]** | The required spend to qualify for this transaction toward the milestone. |

### Step 2.3: Set the reward benefits

Define the discount available once the milestone is met.

| Field Name                 | Selection / Value                 | Explanation                                                              |
| :------------------------- | :-------------------------------- | :----------------------------------------------------------------------- |
| **Benefit On**             | **Selected products in the cart** | **Restricts the discount to specific qualifying items.**                 |
| **Product Identification** | **List of SKU codes**             | **CRITICAL: Select the specific SKU for the high-value lubricant here.** |
| **Benefit Action**         | **Percentage Based**              | **Deducts a fixed percentage from the price.**                           |
| **Value**                  | **25**                            | **The percentage amount to be deducted.**                                |

<Image align="center" border={true} width="70% " src="https://files.readme.io/1785f3adcf70a19804909b0f6b687bb884436f6b62f171bf317331990b50e230-Screenshot_2026-02-16_at_3.39.09_PM.png" className="border" />

# Step 3: Restrictions and limits

### 3.1. Set redemption limits and expiry

Scroll to **Define scope and restrictions on availing promotions** and click **Modify >**. Within the configuration wizard, click **Continue** to navigate to the **Add restrictions** tab.

1. **Go to Tab 2: Add restrictions**

   * Click the **Issual restrictions** section at the top of the page.
   * Select the button for **Individual promotion issue limit** and add value "**1**".

   <Image align="center" border={true} width="70% " src="https://files.readme.io/f5b5537b1a5dba6ecada08ce52e9fa86a1378ec1ba0d3cbf0d1c5d196551da37-Screenshot_2026-02-16_at_3.43.32_PM.png" className="border" />

   This restricts the customer to receiving this specific reward only once during the campaign period.
2. **Go to Tab 3: Promotion Expiry**

   * Select the button for **From the date of earning**.
   * Enter "**30**" in the Days value field.
   * Click **Done**.

   <Image align="center" border={true} width="70% " src="https://files.readme.io/43fe00f05b20a5834f89ae50aff8352cc01db30f6fc31d6e366b5eb5a9bcd265-Screenshot_2026-02-16_at_3.45.49_PM.png" className="border" />

   Once the customer completes the milestone, they must use the discount within 30 days before it expires.

### 3.2. Stacking and exclusivity

Navigate to **Compatibility settings** at the bottom of the page.

* **Setting**: Mark this promotion as **exclusive at the cart level**.
* **Action**: Turn the toggle **ON**.
* **Why**: This protects high-margin lubricants by ensuring the 25% discount is a standalone offer that cannot be combined with general "Total Bill" discounts or other store-wide coupons.

<br />

# Use case 3: Configuring weekend clearance (POS promotion)

**Requirement**: Automatically discount all items in a specific category (for example, Wafers) to a fixed price during designated weekend hours.

**Promotion Type**: POS Cart Promotion (No coupon code required).

## Step 1: Basic setup

1. Navigate: Go to **Engage+** > **Campaigns** > Select your active campaign.
2. Create: Go to the **Promotions** tab and click **New cart promotion**.
3. Define Basic Details:
   * **Name**: PROMO\_WEEKEND\_WAFER\_CLEARANCE
   * **Description**: "Clearance sale: All Wafers at $2.90. Available Saturday and Sunday between 10 AM - 6 PM."
   * **Promotion Type**: Select **POS Cart Promotion**.

## Step 2: Configuration

### Step 2.1: Set the trigger (condition)

1. Click **Add conditions/benefits**.
2. In the **Conditions** column, configure the following:

| Field Name               | Selection / Value                                  | Explanation                                                         |
| :----------------------- | :------------------------------------------------- | :------------------------------------------------------------------ |
| **Qualifying Condition** | Sum of line item quantity for the selected product | Counts the total number of items in the basket to trigger the rule. |
| **Product Scope**        | Category: Wafers                                   | Defines that the discount applies only to this specific group.      |
| **Operator**             | Greater than or equal to (≥)                       | Triggers the deal once the quantity hits the target.                |
| **Value**                | 1                                                  | The minimum quantity required in the cart to qualify.               |

### Step 2.2: Set the reward benefits

1. In the **Benefits** column, configure the following:

| Field Name         | Selection / Value             | Explanation                                                          |
| :----------------- | :---------------------------- | :------------------------------------------------------------------- |
| **Benefit On**     | Selected products in the cart | Ensures the discount applies specifically to the wafers.             |
| **Product Logic**  | Selected in condition         | Directs the benefit to the same items that met the trigger criteria. |
| **Benefit Action** | Fixed target amount           | Sets the final price regardless of the original cost.                |
| **Value**          | 2.90                          | The specific price all qualifying wafers will be set to.             |

# Step 3: Restrictions and scoping

### 3.1. Time-based activation

Scroll to **Define scope and restrictions on availing promotions** and navigate to **Scoping**.

* **Days of Week**: Check Saturday and Sunday.
* **Start Time**: Set to 10:00 AM.
* **Duration in Hours**: Set to 8 hours (Automatically sets end time to 6 PM).

### 3.2. Stacking and exclusivity

Navigate to **Compatibility settings** (bottom of page).

* **Setting**: Mark this promotion as **Exclusive at quantity level**.
* **Action**: Toggle **ON**.

# Use case 4: Configuring digital greetings (profile update)

**Requirement**: Create a one-time 15% discount issued when a member completes their profile or updates their email.

**Promotion Type**: Loyalty Earning Promotion (Issued upon a non-purchase activity).

## Step 1: Basic setup

1. Navigate: Go to **Engage+** > **Campaigns** > Select your active loyalty campaign.
2. Create: Click **New cart promotion**.
3. Define Basic Details:
   * **Name**: PROMO\_PROFILE\_UPDATE\_INCENTIVE
   * **Description**: "Complete your profile to receive 15% off your next purchase."
   * **Promotion Type**: Select **Loyalty earning promotion**.

## Step 2: Configuration

### Step 2.1: Set the earning trigger

1. In the **Promotion Earning** section, configure the following:

| Field Name           | Selection / Value  | Explanation                                       |
| :------------------- | :----------------- | :------------------------------------------------ |
| **Earning Setup**    | Single activity    | Triggered by a one-time action.                   |
| **Earning Activity** | Updates profile    | The system monitors for profile completions.      |
| **Logic**            | Automatic Issuance | Once updated, the promo moves to "Earned" status. |

### Step 2.2: Set the reward benefits

1. In the **Benefits** column, configure the following:

| Field Name         | Selection / Value | Explanation                                                   |
| :----------------- | :---------------- | :------------------------------------------------------------ |
| **Benefit On**     | Complete cart     | Applies the discount to the final subtotal of the next visit. |
| **Benefit Action** | Percentage based  | The discount is calculated as a fraction of the total price.  |
| **Value**          | 15                | The percentage amount to be deducted.                         |

## Step 3: Restrictions and communication

### 3.1. Usage limits

Scroll to **Restriction** tab.

* **Field**: **Enable limit on the number of times a customer could avail the promotion**
  * **Action**: Toggle **ON**.
  * **Maximum times**: Set to 1.
* **Field**: **Expiry of Earned Promotion**
  * **Value**: 30 days.

# Use case 5: Configuring Gold Member VIP

**Requirement**: Offer an exclusive "Gold-Tier Only" 20% discount on total bills over $100.

**Promotion Type**: Loyalty Promotion.

## Step 1: Basic setup

1. Navigate: Go to **Engage+** > **Campaigns**.
2. Create: Click **New cart promotion**.
3. Define Metadata:
   * **Name**: PROMO\_GOLD\_EXCLUSIVE\_20OFF\_2026
   * **Description**: "Exclusive Gold Member Benefit: 20% off your entire purchase over $100. Standalone offer."
   * **Promotion Type**: Select **Loyalty promotion**.

## Step 2: Configuration

### Step 2.1: Set the trigger

1. Click **Add conditions/benefits**.
2. In the **Conditions** column, configure the following:

| Field Name               | Selection / Value            | Explanation                                                  |
| :----------------------- | :--------------------------- | :----------------------------------------------------------- |
| **Qualifying Condition** | Sum of line item amount      | Evaluates the total monetary value of the transaction.       |
| **Operator**             | Greater than or equal to (≥) | Triggers once the subtotal reaches $100.                     |
| **Value**                | 100                          | The minimum spend required to unlock the VIP discount.       |
| **Limit to Customers**   | Filter by Tier (Gold)        | Restricts the offer specifically to identified Gold members. |

### Step 2.2: Set the reward benefits

1. In the **Benefits** column, configure the following:

| Field Name         | Selection / Value | Explanation                                                    |
| :----------------- | :---------------- | :------------------------------------------------------------- |
| **Benefit On**     | Entire Cart       | Applies the discount to the final subtotal of the transaction. |
| **Benefit Action** | Percentage based  | Calculates the discount as a fraction of the total price.      |
| **Value**          | 20                | The VIP discount percentage.                                   |

## Step 3: Restrictions and exclusivity

### 3.1. Stacking strategy

Navigate to **Compatibility settings** at the bottom of the page.

* **Setting**: Mark this promotion as **Exclusive at cart level**.
* **Action**: Toggle **ON**.
* **Why**: Ensures the 20% VIP discount is the only offer applied.

# Use case 6: Configuring the agnostic stacker

**Requirement**: Allow multiple fuel-specific discounts to apply to the same liter of fuel simultaneously.

**Promotion Type**: POS Cart Promotion (Automatic application).

## Step 1: Global settings

1. In **Cart Promotion Settings**, ensure **Apply multiple promotions on a single line item** is toggled **ON**.
2. Strategy: Ensure **Category Overrides** are enabled for the target category (for example, Fuel) to "Allow multiple promotions on same quantity."

## Step 2: Configuration

### Step 2.1: Set the trigger

1. In the **Conditions** column, configure the following:

| Field Name               | Selection / Value            | Explanation                                               |
| :----------------------- | :--------------------------- | :-------------------------------------------------------- |
| **Qualifying Condition** | Sum of line item quantity    | Counts the units (Liters/Gallons) in the basket.          |
| **Product Scope**        | Category: Fuel               | Defines the group of products that allow stacking.        |
| **Operator**             | Greater than or equal to (≥) | Triggers as long as fuel is present.                      |
| **Value**                | 1                            | Ensures logic evaluates even for a single liter purchase. |

### Step 2.2: Set the reward benefits

1. In the **Benefits** column, configure the following:

| Field Name            | Selection / Value             | Explanation                                                                     |
| :-------------------- | :---------------------------- | :------------------------------------------------------------------------------ |
| **Benefit On**        | Selected products in the cart | Targeted discount on the specific qualifying items.                             |
| **Benefit Action**    | Percentage based              | Calculates the discount based on the price.                                     |
| **Calculation Logic** | Gross Value                   | **CRITICAL**: Ensures discounts apply to the original price, not the net price. |

## Step 3: Restrictions and non-exclusivity

### 3.1. Stacking settings

Navigate to **Compatibility settings**.

* **Setting**: Mark this promotion as **Exclusive at quantity level**.
* **Action**: Toggle **OFF**.
* **Why**: Exclusivity must be disabled to allow multiple promotions to compound.

# Use case 7: Configuring points visibility

**Requirement**: Display a point-earning opportunity in the mobile app (for example, "Earn 50 pts") without issuing a real reward.

**Promotion Type**: Loyalty Earning Promotion.

## Step 1: Basic setup

1. **Name**: DUMMY\_MARKETING\_POINTS\_VISIBILITY\_2026.
2. **Description**: "Internal promo used to provide Points Eligibility metadata to the Mobile App."
3. **Promotion Type**: Select **Loyalty earning promotion**.

## Step 2: Configuration

### Step 2.1: Set the trigger

1. In the **Conditions** column, configure:

| Field Name               | Selection / Value       | Explanation                                          |
| :----------------------- | :---------------------- | :--------------------------------------------------- |
| **Qualifying Condition** | Sum of line item amount | Evaluates the monetary value of the cart.            |
| **Select Product**       | Category: Fuel          | Defines where the points icon should appear.         |
| **Operator**             | Greater than (>)        | Triggers based on value exceeding target.            |
| **Value**                | 9,999,999               | Impossible spend to ensure no reward is ever issued. |

### Step 2.2: Set the reward benefits

1. In the **Benefits** column, configure:

| Field Name         | Selection / Value | Explanation                  |
| :----------------- | :---------------- | :--------------------------- |
| **Benefit Action** | Fixed amount      | Sets a flat deduction value. |
| **Value**          | 0                 | Ensures no financial impact. |

## Step 3: App UI Customization

### 3.1. Custom fields

Navigate to the **Additional Information** tab.

* **applicable\_screen**: Product\_Details
* **standard\_image**: Points\_Bonus\_Icon.png
* **marketing\_text**: "Earn 50 Points today!"

### 3.2. Scoping

* **Display in App/Web**: Toggle **ON**.

# Use case 8: Configuring progressive slab logic

**Requirement**: Drive higher Average Transaction Value by offering increasing discounts based on spend tiers (for example, 10 off 100 OR 25 off 200).

**Promotion Type**: POS Cart Promotion (Requires two separate promotions).

## Step 1: Basic setup

1. In **Cart Promotion Settings**, ensure **Promotion Ranking Order** is set to **Maximum Discount**.
2. Create **Slab A** (10 off 100) and **Slab B** (25 off 200).

## Step 2: Configuration

### Step 2.1: Set the trigger

| Promotion  | Qualifying Condition    | Operator | Value |
| :--------- | :---------------------- | :------- | :---- |
| **Slab A** | Sum of line item amount | ≥        | 100   |
| **Slab B** | Sum of line item amount | ≥        | 200   |

### Step 2.2: Set the reward benefits

| Field Name         | Selection / Value         | Explanation                                  |
| :----------------- | :------------------------ | :------------------------------------------- |
| **Benefit On**     | Entire Cart               | Discount comes off the total payable amount. |
| **Benefit Action** | Fixed amount              | Deducts a specific cash value.               |
| **Value**          | 10 (Slab A) / 25 (Slab B) | The monetary discount for each tier.         |

## Step 3: Restrictions and exclusivity

### 3.1. Stacking Control

Navigate to **Compatibility settings** for both.

* **Setting**: Mark as **Exclusive at cart level**.
* **Action**: Toggle **ON**.
* **Behavior**: When spending 250, only the 25 discount applies.

# Use case 9: Configuring "fixed discount for every spend"

**Requirement**: Reward bulk buying by providing a fixed discount for every specific amount spent (e.g., ₹50 off for every ₹500).

**Promotion Type**: POS Cart Promotion.

## Step 1: Basic setup

1. **Name**: PROMO\_WHOLESALE\_EVERY\_500.
2. **Promotion Type**: Select **POS Cart Promotion**.

## Step 2: Configuration

### Step 2.1: Set the trigger

| Field Name               | Selection / Value            | Explanation                                   |
| :----------------------- | :--------------------------- | :-------------------------------------------- |
| **Qualifying Condition** | Sum of line item amount      | Evaluates total monetary value in the basket. |
| **Select Product**       | All Products                 | All items contribute to the spending goal.    |
| **Operator**             | Greater than or equal to (≥) | Triggers at target subtotal.                  |
| **Value**                | 500                          | Minimum spend for the first block.            |

### Step 2.2: Set the reward benefits

| Field Name                     | Selection / Value | Explanation                                                             |
| :----------------------------- | :---------------- | :---------------------------------------------------------------------- |
| **Benefit Action**             | Fixed amount      | Deducts specific currency value.                                        |
| **Value**                      | 50                | Amount deducted for every qualifying block.                             |
| **Apply Benefit on Each Unit** | **Enabled**       | **CRITICAL**: Ensures the discount repeats (for example, 100 off 1000). |

## Step 3: Restrictions and exclusivity

### 3.1. Usage limits

* **Individual Cart Limit**: Leave empty to allow the recurring logic to trigger.

# Use case 10: Configuring gift voucher benefits

**Requirement**: Automatically apply a 50% discount only when a specific internal employee gift voucher is scanned.

**Promotion Type**: POS Cart Promotion.

## Step 1: Basic setup

1. **Name**: PROMO\_EMPLOYEE\_HIDDEN\_50OFF.
2. **Promotion Type**: Select **POS Cart Promotion**.

## Step 2: Configuration

### Step 2.1: Set the condition (gift voucher)

| UI Field / Property    | Selection / Value  | Explanation                                |
| :--------------------- | :----------------- | :----------------------------------------- |
| **Primary Condition**  | Gift Voucher       | Focuses rule on the presence of a voucher. |
| **Operator**           | Equals             | Requires an exact match for the code.      |
| **Voucher Identifier** | EMP\_PRIVATE\_2026 | The pre-configured gift voucher.           |

### Step 2.2: Set the reward benefits

| Field Name         | Selection / Value | Explanation                                               |
| :----------------- | :---------------- | :-------------------------------------------------------- |
| **Benefit On**     | Entire Cart       | Applies the discount to the total value.                  |
| **Benefit Action** | Percentage based  | Discount is calculated as the percentage of total amount. |
| **Value**          | 50                | The percentage amount to be deducted.                     |

## Step 3: Restrictions and limits

### 3.1. Stacking and exclusivity

Navigate to **Compatibility settings**.

* **Setting**: Mark as **Exclusive at cart level**.
* **Action**: Toggle **ON**.
* **Why**: Ensures employee discount does not stack with public sales.

<br />

# Use case 11: Configuring a percentage discount with a maximum discount value

**Requirement**: Apply a 10% discount when a cart contains either SKU A or SKU B, but cap the total discount at Rs 12 regardless of cart value.

**Promotion Type**: **POS Cart Promotion**, which automatically applies the discount if the criteria are fulfilled (no coupon code required).

## Step 1: Basic setup

1. Navigate: Go to **Engage+** > **Campaigns** > Select your active campaign.
2. Create: Go to the **Promotions** tab and click **New cart promotion**.
3. Define Basic Details:
   * **Name**: PROMO\_10PCT\_MAXDISC\_12.
   * **Description**: "10% off on SKU A or SKU B. Maximum discount value: Rs 12."
   * **Promotion Type**: Select **POS Cart Promotion**.

## Step 2: Configuration

Scroll to the section **Availing conditions and benefits**.

### Step 2.1: Set the trigger (condition)

1. Click **Add conditions/benefits**.
2. In the **Conditions** column, configure the following:

| Field Name               | Selection / Value                                | Explanation                                                          |
| :----------------------- | :----------------------------------------------- | :------------------------------------------------------------------- |
| **Qualifying Condition** | Sum of line item amount for the selected product | Evaluates the total monetary value of the qualifying items.          |
| **Select Product**       | SKU A, SKU B                                     | Defines which items count toward the promotion trigger.              |
| **Operator**             | Greater than or equal to (≥)                     | Triggers once the combined value of qualifying items meets the rule. |
| **Value**                | 1                                                | Ensures the promotion evaluates as long as either SKU is present.    |

### Step 2.2: Set the reward benefits

1. In the **Benefits** column, configure the following:

| Field Name                 | Selection / Value             | Explanation                                                                                  |
| :------------------------- | :---------------------------- | :------------------------------------------------------------------------------------------- |
| **Benefit On**             | Selected products in the cart | Restricts the discount to SKU A and SKU B only.                                              |
| **Product Logic**          | Selected in condition         | Applies the discount to the same items that met the trigger criteria.                        |
| **Benefit Action**         | Percentage based              | Calculates the discount as a fraction of each qualifying item's price.                       |
| **Value**                  | 10                            | The percentage amount to be deducted.                                                        |
| **Maximum discount value** | 12                            | The discount will not exceed Rs 12 regardless of cart value. Excess discount is not applied. |

Refer <Anchor label="here" target="_blank" href="https://docs.capillarytech.com/docs/core-concepts-1#how-discount-is-calculated-during-evaluation">here</Anchor> to understand how the discount is evaluated by cart promotions.

## Step 3: Restrictions and limits

### 3.1. Stacking and exclusivity

Navigate to **Compatibility settings** at the bottom of the page.

* **Setting**: Mark this promotion as **exclusive at the cart level**.
* **Action**: Turn the toggle **ON**.
* **Why**: Prevents the percentage discount from combining with other cart-level offers, which would cause the maximum discount value to be exceeded across stacked promotions.

# Use case 12: Configuring a discount on a different product using a decimal quantity condition

**Requirement**: Apply a 10% discount on Peppers when a customer buys at least 1.5 Kg of Rice.

**Promotion Type**: **POS Cart Promotion**, which automatically applies the discount if the criteria are fulfilled (no coupon code required).

## Step 1: Basic setup

1. Navigate: Go to **Engage+** > **Campaigns** > Select your active campaign.
2. Create: Go to the **Promotions** tab and click **New cart promotion**.
3. Define Basic Details:
   * **Name**: PROMO\_RICE\_PEPPER\_10OFF.
   * **Description**: "Buy at least 1.5 Kg of Rice, get 10% off Peppers."
   * **Promotion Type**: Select **POS Cart Promotion**.

## Step 2: Configuration

Scroll to the section **Availing conditions and benefits**.

### Step 2.1: Set the trigger (condition)

1. Click **Add conditions/benefits**.
2. In the **Conditions** column, configure the following:

| Field Name               | Selection / Value                                  | Explanation                                                                                   |
| :----------------------- | :------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **Qualifying Condition** | Sum of line item quantity for the selected product | Measures how much Rice is in the cart by weight, not by unit count.                           |
| **Select Product**       | Rice (SKU)                                         | Defines the weight-based product that must be present.                                        |
| **Operator**             | Greater than or equal to (≥)                       | Triggers once the Rice quantity meets the threshold.                                          |
| **Value**                | 1.5                                                | The quantity field accepts decimals, so a value like 1.5 correctly represents 1.5 Kg of Rice. |

### Step 2.2: Set the reward benefits

1. In the **Benefits** column, configure the following:

| Field Name         | Selection / Value             | Explanation                                                                                                                                                                                                                                                        |
| :----------------- | :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Benefit On**     | Selected products in the cart | Restricts the discount to Peppers.                                                                                                                                                                                                                                 |
| **Product Logic**  | Specific value                | CRITICAL: Turn this off from "Selected in condition" and pick Peppers separately. The discounted product doesn't have to be the same product that triggered the promotion.                                                                                         |
| **Select Product** | Peppers (SKU)                 | The item that receives the discount.                                                                                                                                                                                                                               |
| **Benefit Action** | Percentage based              | Calculates the discount as a fraction of the Peppers price.                                                                                                                                                                                                        |
| **Value**          | 10                            | The percentage amount deducted. Because it's calculated on the Peppers price, the resulting discount amount is also carried in decimals (for example, 10% of $6.23 = $0.62), rounded per the account's configured rounding precision, not just the input quantity. |

## Step 3: Restrictions and limits

### 3.1. Stacking and exclusivity

Navigate to **Compatibility settings** at the bottom of the page.

* **Setting**: Mark this promotion as **exclusive at the cart level**.
* **Action**: Turn the toggle **ON**.
* **Why**: Prevents the Peppers discount from stacking with another cart-level offer on the same item.

# Use case 13: Configuring an accumulation-based offer

**Requirement**: Reward a customer with a free coffee after they buy 10 coffees, whether in one visit or spread across several.

**Promotion Type**: **POS Cart Promotion**, which automatically applies the reward if the criteria are fulfilled (no coupon code required).

**Prerequisite**: Accumulation must be enabled for your org. If you don't see the **Benefit earning criteria** section in Step 2.3 below, raise a ticket with Capillary support to turn it on.

## Step 1: Basic setup

1. Navigate: Go to **Engage+** > **Campaigns** > Select your active campaign.
2. Create: Go to the **Promotions** tab and click **New cart promotion**.
3. Define Basic Details:
   * **Name**: PROMO\_ACCUM\_COFFEE\_10PLUS1.
   * **Description**: "Buy 10 coffees across any number of visits, get the 11th free."
   * **Promotion Type**: Select **POS Cart Promotion**.

## Step 2: Configuration

Scroll to the section **Availing conditions and benefits**.

### Step 2.1: Set the trigger (condition)

1. Click **Add conditions/benefits**.
2. In the **Conditions** column, configure the following:

| Field Name               | Selection / Value                                  | Explanation                                               |
| :----------------------- | :------------------------------------------------- | :-------------------------------------------------------- |
| **Qualifying Condition** | Sum of line item quantity for the selected product | Counts how many coffees the customer has bought.          |
| **Select Product**       | Coffee (SKU)                                       | The product whose purchases count toward the total.       |
| **Operator**             | Greater than or equal to                           | Triggers once the coffee count reaches the target.        |
| **Value**                | 10                                                 | The number of coffees required before the reward applies. |

### Step 2.2: Set the reward benefits

1. In the **Benefits** column, configure the following:

| Field Name         | Selection / Value             | Explanation                                                                                                                       |
| :----------------- | :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| **Benefit On**     | Selected products in the cart | Restricts the reward to the coffee, not other items in the cart.                                                                  |
| **Select Product** | Coffee (SKU)                  | Use a different SKU from the trigger product for the free item, since a same-SKU reward doesn't fire correctly with accumulation. |
| **Benefit Type**   | Free product                  | Gives one qualifying item at no cost once the condition is met.                                                                   |

### Step 2.3: Set the benefit earning criteria

By default, the system only counts coffees bought in a single transaction. Turn this on to count coffees across a customer's visits instead.

**Across multiple transactions** is only selectable when all of the following are also true for the promotion:

| Requirement                | Value                                           |
| :------------------------- | :---------------------------------------------- |
| Qualifying condition       | Sum of line item quantity for selected products |
| Benefit on                 | Select products in cart                         |
| Apply benefit on each unit | Off                                             |
| Benefit type               | Free product                                    |
| Redemption limit           | Daily, weekly, monthly, or overall              |

Steps 2.1 and 2.2 already satisfy the qualifying condition, benefit on, and benefit type requirements above. The redemption limit requirement is set in Step 3.1. Leave **Apply benefit on each unit** off — it isn't used anywhere in this walkthrough, and turning it on would break eligibility for accumulation.

1. Navigate to the **Benefit earning criteria** section.
2. Click **Across multiple transactions**.

   <Image src="https://files.readme.io/dc0f4b9855273f70e3869cebfc8450915e9ac949eabfd12ffc4e984bda54df81-image.png" border={true} />

   A customer who buys 4 coffees on one visit and 4 more on a later visit now has a running total of 8. On a third visit, they buy 3 more coffees, and the total reaches 11. The reward applies on that third visit, and 1 coffee remains uncounted toward the next reward.

## Step 3: Restrictions and limits

### 3.1. Set a recurring redemption limit

1. Scroll to **Define scope and restrictions on availing promotions**. Click **Continue** to navigate to the **Restrictions** tab.
2. Add a redemption limit and set it to reset **every calendar month**.

   A recurring limit gives the promotion cycles to reset between, which the next step needs.

### 3.2. Turn on carry forward for leftover quantity

1. In the **Benefit earning criteria** section, turn the **Carry forward excess purchase count/value to the next redemption** toggle **ON**.
2. Click **For a fixed number of redemption cycle(s)** and enter the number of cycles.

   <Image src="https://files.readme.io/9f19a41f4218f61b1c4a3f160e819115bcac7cdaf87712d5bc71d00d85eae27c-image.png" border={true} />

   With this on, the 1 leftover coffee from Step 2.3 carries into next month's count instead of resetting to zero. With this off, it's dropped when the month resets.

### 3.3. Stacking and exclusivity

Navigate to **Compatibility settings** at the bottom of the page.

* **Setting**: Mark this promotion as **exclusive at the cart level**.
* **Action**: Turn the toggle **ON**.
* **Why**: Keeps the accumulated free coffee from stacking with another cart-level offer on the same item.

Before making this promotion live, see [How to test an accumulation promotion](https://docs.capillarytech.com/reference/loyalty-cart-promotions#how-to-test-an-accumulation-promotion) — accumulation depends on customer purchase history, so it needs a specific test sequence, not just a single-cart check.