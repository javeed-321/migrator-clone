---
updatedAt: 2026-08-13T19:50:44.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create a Cart Promotion

You can build a cart promotion by following this guided workflow. Define the metadata, conditions, and benefits of your promotion, then apply specific limits to ensure it reaches the right audience at the right time.

This guide provides a step-by-step walkthrough of the entire cart promotion lifecycle, from initial qualification triggers to redemption conditions and automated customer communication.

<HTMLBlock>{`
<style>
  /* ReadMe often allows styles if they are inside the HTML block itself */
  .glow-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    width: 100%;
    max-width: 900px;
    font-family: -apple-system, system-ui, sans-serif;
  }
  .glow-card {
    position: relative;
    text-decoration: none !important;
    transition: all 0.3s ease;
  }
  .glow-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1.6 / 1;
    border-radius: 12px;
    padding: 12px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  /* THE GLOW EFFECT */
  .glow-card:hover .glow-tile {
    transform: translateY(-4px);
    border-color: #2563eb;
    background: #ffffff;
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3), 0 0 40px rgba(37, 99, 235, 0.1);
  }
  .glow-ext {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 22px;
    height: 22px;
    background: rgba(37, 99, 235, 0.05);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    z-index: 10;
  }
  .glow-step {
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    color: #2563eb;
    margin-bottom: 4px;
  }
  .glow-label {
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    color: #1e293b;
    line-height: 1.3;
  }
  @media (prefers-color-scheme: dark) {
    .glow-tile { background: #1e293b; border-color: #334155; }
    .glow-label { color: #f8fafc; }
    .glow-card:hover .glow-tile { box-shadow: 0 0 25px rgba(59, 130, 246, 0.5); }
  }
</style>

<div class="glow-grid">
  <div class="glow-card">
    <a href="https://docs.capillarytech.com/docs/create-a-cart-promotions#step-1-defining-the-promotion-details" target="_blank" class="glow-ext">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </a>
    <a href="#step-1-defining-the-promotion-details" class="glow-tile">
      <span class="glow-step">Step 01</span>
      <span class="glow-label">Defining Promotion Details</span>
    </a>
  </div>

  <div class="glow-card">
    <a href="https://docs.capillarytech.com/docs/create-a-cart-promotions#step-2-configuring-promotion-earning" target="_blank" class="glow-ext">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </a>
    <a href="#step-2-configuring-promotion-earning" class="glow-tile">
      <span class="glow-step">Step 02</span>
      <span class="glow-label">Configuring Promotion Earning</span>
    </a>
  </div>

  <div class="glow-card">
    <a href="https://docs.capillarytech.com/docs/create-a-cart-promotions#step-3-defining-conditions-to-be-met-to-earn-benefit" target="_blank" class="glow-ext">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </a>
    <a href="#step-3-defining-conditions-to-be-met-to-earn-benefit" class="glow-tile">
      <span class="glow-step">Step 03</span>
      <span class="glow-label">Defining Benefit Conditions</span>
    </a>
  </div>

  <div class="glow-card">
    <a href="https://docs.capillarytech.com/docs/create-a-cart-promotions#step-4-defining-where-to-apply-benefits" target="_blank" class="glow-ext">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </a>
    <a href="#step-4-defining-where-to-apply-benefits" class="glow-tile">
      <span class="glow-step">Step 04</span>
      <span class="glow-label">Defining Benefit Application</span>
    </a>
  </div>

  <div class="glow-card">
    <a href="https://docs.capillarytech.com/docs/create-a-cart-promotions#step-5-define-scope-and-restriction" target="_blank" class="glow-ext">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </a>
    <a href="#step-5-define-scope-and-restriction" class="glow-tile">
      <span class="glow-step">Step 05</span>
      <span class="glow-label">Define Scope and Restriction</span>
    </a>
  </div>

  <div class="glow-card">
    <a href="https://docs.capillarytech.com/docs/create-a-cart-promotions#step-7-configuring-communication-triggers" target="_blank" class="glow-ext">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </a>
    <a href="#step-7-configuring-communication-triggers" class="glow-tile">
      <span class="glow-step">Step 06</span>
      <span class="glow-label">Additional Information</span>
    </a>
  </div>

  <div class="glow-card">
    <a href="https://www.google.com/search?q=https://docs.capillarytech.com/docs/create-a-cart-promotions%23step-7-configuring-communication-triggers" target="_blank" class="glow-ext">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </a>
    <a href="#step-7-configuring-communication-triggers" class="glow-tile">
      <span class="glow-step">Step 07</span>
      <span class="glow-label">Communication Triggers</span>
    </a>
  </div>

  <div class="glow-card">
    <a href="https://docs.capillarytech.com/docs/create-a-cart-promotions#step-8-managing-promotion-stacking" target="_blank" class="glow-ext">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </a>
    <a href="#step-8-managing-promotion-stacking" class="glow-tile">
      <span class="glow-step">Step 08</span>
      <span class="glow-label">Managing Promotion Stacking</span>
    </a>
  </div>
</div>
`}</HTMLBlock>

# Step 1: Defining the promotion details

Start by defining the promotion's basic identification and the active window for your campaign.

1. Go to **Engage+**, open the campaign where you want to create the promotion, and navigate to the **Promotions** tab.

2. Select **New cart promotion**.

<Image src="https://files.readme.io/630c4779a3af0d077d2168321dde025e5645183e78b2d9e27747d721efd33be0-Screenshot_2026-02-15_at_9.55.42_PM.png" align="center" width="70%" border={true} />

3. In the **Promotion Name** box, enter a unique name. The name must be unique across your organisation and can be up to **50 characters**.

4. In the **Description** box, outline the business case or key configuration details for internal reference. The description can be up to **200 characters** and is for internal use only — it is not shown to customers.

5. In the **Duration** box, select the start and end date

6. You can select specific hours for the promotion by selecting the **Time** box at the bottom of the date picker. The duration will be based on your organization's timezone.

<Image src="https://files.readme.io/d68436a3176a185390d92eb851b921ff103a94477bd35def97d73d071c2e5bb1-Screenshot_2026-02-15_at_10.02.37_PM.png" align="center" width="70%" border={true} />

7. Under **[Promotion type](https://docs.capillarytech.com/docs/types-of-cart-promotion-)**, select a specific structure based on your goal:

<Image src="https://files.readme.io/051d944ee38e1502d37e6678550e8c0d079e71ef6564aeea640c7b3a0e5d8e98-Screenshot_2026-02-15_at_10.06.53_PM.png" align="center" width="70%" border={true} />

<br />

8. Toggle **Customer Activation Required** to **Enabled** to issue the promotion in a deactivated state. The customer must manually activate it via the app or website before it applies at checkout. This is available for **Loyalty promotion**, **Loyalty earning promotion**, and **Rewards promotion** only.
9. Select **Continue**.

<Callout icon="📌" theme="info">
  Not all steps appear for every promotion type. The steps that appear depend on how the promotion is issued and redeemed. Promotion types that apply automatically or via a code entry do not require an earning configuration, so the workflow skips Step 2. Promotion types that do not support communication triggers skip Step 7.

  | Promotion type                | Steps included         |
  | :---------------------------- | :--------------------- |
  | **Loyalty promotion**         | 1, 3, 4, 5, 6, 7, 8    |
  | **Loyalty earning promotion** | 1, 2, 3, 4, 5, 6, 7, 8 |
  | **POS promotion**             | 1, 3, 5, 6             |
  | **Rewards promotion**         | 1, 2, 3, 4, 5, 6, 7, 8 |
  | **Code linked promotion**     | 1, 3, 5, 6             |

  Step 2 (Configuring promotion earning) only appears for **Loyalty earning promotion** and **Rewards promotion** because these are the only types where the customer must first complete an action or spend points before the promotion becomes available to them.
</Callout>

# Step 2: [Configuring promotion earning](https://docs.capillarytech.com/docs/promotion-earning-conditional)

Promotion Earning defines the specific triggers required for a customer to qualify for and "unlock" a promotion. While standard POS promotions apply automatically based on cart contents, earning-based promotions, such as **Loyalty Earning** and **Rewards Promotions**, require a specific set of actions before the benefit becomes available for redemption at the point of sale.

### Loyalty earning cart promotion

Under **Loyalty Earning Cart Promotion,** there are two types of earning cart promotion: **Single Activity** and **Activity Milestone**.

## Single activity-based promotion

A Single activity-based promotion allows you to reward customers for a one-time specific action, such as joining your program or completing a purchase.

To configure promotion earning based on a **Single activity**, follow these steps:

<Image src="https://files.readme.io/45d26d9fdf397c1792c0c4ef1fcd28df1bcb5d34a5d2aa59bc849c6e097a9431-image.png" align="center" width="70%" border={true} />

1. Select the **activity** that the target customer should achieve to earn promotion

| Option              | Description                                |
| :------------------ | :----------------------------------------- |
| Makes a transaction | Customer makes a purchase with your brand  |
| Registers           | Customer registers in your loyalty program |
| Updates profile     | Customer updates their profile             |

<Image src="https://files.readme.io/d37c00493c2af76f911e33c34d52b16c257d1eabba4fde340200e8953e0ca822-Screenshot_2026-02-26_at_10.15.55_PM.png" align="center" width="70% " border={true} />

2. Define the **scope** of the promotion.

Specify where the promotion should run by limiting it to specific store entities: Concepts, Stores, or Zones. so only customers transacting in those selected entities are eligible for the offer.

<Image src="https://files.readme.io/1baac5b49e0205778b86c562894db1b4f87e29694667ba72b027b0c55edddde5-image.png" align="center" width="70%" border={true} />

* [Concept](https://docs.capillarytech.com/docs/organisation-units-ou#zone) – A logical grouping of stores, typically by brand or business line, for example, groceries, electronics, apparel.
* [Store ](https://docs.capillarytech.com/docs/organisation-units-ou#store)– A physical or operational outlet (branch) that belongs to one concept and is mapped to one or more zones.
* [Zone](https://docs.capillarytech.com/docs/organisation-units-ou#zone) – A geographical grouping of stores used for regional structuring, categorization, and reporting, for example, India-North, Bangalore-East.

3. Define the **earning conditions** for the cart promotion.

Specify the earning conditions for the cart promotion by specifying what conditions must be true, for example, attributes or behaviors, so that the customer becomes eligible to earn this promotion.

The fields are as follows:

|                                |                                                                                                                                     |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| What conditions are to be met? | Condition to be evaluated. For more information, refer to the document on [Profiles](https://docs.capillarytech.com/docs/profiles). |

<Image src="https://files.readme.io/671aeb6f668d23df742da9c6ec2bfb9a14fdf48060c84b79ba929d781e350aa5-image.png" align="center" width="70%" border={true} />

4. Define the **additional settings** for the cart promotion.

| Field                        | Description                                                                                                                                |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| Maximum earning per customer | Limit the number of times a customer can earn this promotion. Enable the toggle and enter the maximum count in the **Limit to** field.     |
| Restrict earning days        | Limit the earning window from the date of issual. Enable the toggle and enter the number of days in the **From the date of issual** field. |

<Image src="https://files.readme.io/22fd8cd411180ac044282912492e4e0a4ce1871287f2799aac8ce90e951bd8c2-image.png" align="center" width="70%" border={true} />

## Activity milestone-based earning

Activity milestone-based earning lets you reward customers only after they complete a predefined milestone. You can specify a milestone group or choose a specific target to be achieved, and also limit how many times each customer can earn the cart promotion.

To configure this: In the Configure Earning section, select **Activity Milestone**.

1. Under **Select Milestone Group**, choose the milestone group. Refer to the documentation for more information on [Milestones](https://docs.capillarytech.com/docs/milestones-new-flow).

<Image src="https://files.readme.io/42de91c9f60f80040aad093f64851c97a6315efe9408b8709023b077b8237f1c-image.png" align="center" width="70%" border={true} />

2. Select the target that should be achieved by the audience group to earn promotion

<Image src="https://files.readme.io/967d762bed8d3d727d1124008710420b6a4084ffd9d06a0df6fcb7d866c2ca4a-image.png" align="center" width="70%" border={true} />

3. Enable the toggle under **Maximum earning per customer** and add the maximum times a customer can earn the cart promotion.

<Image src="https://files.readme.io/8e9a55c95b949d68e61affcf3e7149785377e6bd7e7a92a77508606ede631a07-image.png" align="center" width="70%" border={true} />

## Rewards cart promotion

Rewards cart promotion lets you automatically issue benefit-based cart promotions when customers meet predefined behaviors or preferences, using a direct trigger and optional per-customer earning limits to control how many times the benefit can be earned.

1. Select **Direct trigger** to automatically issue the promotion based on predefined customer behaviors or preferences—no manual action is required from the customer.

<Image src="https://files.readme.io/2a7891a9b63f2dd90f548329326fe376919ee05fabb1d756f78a267b761aa7d1-Screenshot_2025-04-11_114416.png" align="center" width="70%" border={true} />

2. You can define the maximum earnings per customer that will limit the number of times a customer can earn the promotion.

<Image src="https://files.readme.io/dbaa26feaa083dd3bbcc670d48f834d1d432874acba98fac57ba8d772cf2b14c-Screenshot_2025-04-11_114524.png" align="center" width="70%" border={true} />

3. Select **Continue**.

**You have successfully configured the promotion earning; now proceed to Step 3 to define the cart conditions.**

# Step 3: [Defining conditions to be met to earn benefit](https://docs.capillarytech.com/docs/configuring-conditions-)

Here, you can specify the cart rules, such as cart amount, item counts, product-level sums, payment modes, or gift vouchers, that can be configured as earning criteria for the promotion's benefit to be applied.

| Cart Property             | Detailed Description                                                       | Example                                                                                                                 |
| :------------------------ | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| Cart Amount               | Evaluates the Total Gross Value of the cart (before tax/discounts).        | Spend More, Save More: "Shop for $500 or more to unlock a 10% discount."<br />Operator: `>=` · Value: `500`             |
| Count of Items            | Counts the total number of distinct items (SKUs) in the cart.              | Volume Driver: "Buy any 5 items and get the cheapest one free."<br />Operator: `>=` · Value: `5`                        |
| Sum of Line Item Amount   | Calculates the total price of only the selected products, ignoring others. | Category Target: "Spend $1000 on Denim to get a free belt."<br />Scope: Category=Denim · Operator: `>=` · Value: `1000` |
| Sum of Line Item Quantity | Counts total units for only selected products. Ideal for bundles.          | Bundle Offer: "Buy any 3 T-Shirts for a bundle price."<br />Scope: Category=T-Shirts · Operator: `>=` · Value: `3`      |
| Payment Mode              | Triggers based on specific payment methods (Cash, Card, Points, etc.).     | Loyalty Drive: "5% extra off if you pay using Loyalty Points."<br />Identifier: Points · Value: Starts with "Loyalty"   |
| Gift Voucher              | Triggers only if a specific Gift Voucher Code is applied.                  | Employee Benefit: "Apply Employee Special Voucher for 20% off."<br />Value: `Employee_Special_Voucher`                  |

<Image src="https://files.readme.io/a8f6678fb2771025880d57a3d8d1d2719cd59337029dfcb678439cd12c53c91c-Screenshot_2026-02-25_at_10.53.39_AM.png" align="center" width="70%" border={true} />

### Understanding "product scope" & inclusions

For properties like **Sum of line Item Amount for selected product** or **Sum of line Item Quantity for selected product**, you must configure which products to count.

1. Navigate to **Select product** to open the **Define qualifying conditions** drawer.

   <Image src="https://files.readme.io/13b3f6d9baaf2ee9b3ff1ab3f4383af5ad840af933f2057f60e6cb48a7b57aab-Screenshot_2026-02-25_at_12.19.27_PM.png" align="center" width="70%" border={true} />

2. Under **Products identified based on**, choose how to target your items:

   <Image src="https://files.readme.io/46d71c030e891d1778eace82181492633e7ad0c3b68e9b4430aeaa4220599f69-Screenshot_2026-02-25_at_12.21.13_PM.png" align="center" width="70%" border={true} />

* **List of SKU codes**: Select this to target specific items via a file upload. You can map up to **250 SKUs** to a single cart promotion condition. This allows you to precisely target a large set of products when categories or brands are not specific enough.

  * Select **Choose file** to upload your CSV. The system will validate that the total number of SKUs does not exceed 250.

  <Image src="https://files.readme.io/b14dfe1b787041240cf701ff28284115cb293469ec74ad6cf0354d652090cdbe-Screenshot_2026-02-25_at_12.22.40_PM.png" align="center" width="70%" border={true} />

* **Selected categories/Brands/Attributes**: Select this to target products dynamically based on your catalog hierarchy.

  <Image src="https://files.readme.io/3e6f91f837eeaa202b625ab55c6d56a4943b7341bf7f3c0df17a1cf48a363265-Screenshot_2026-02-25_at_12.24.20_PM.png" align="center" width="70%" border={true} />

3. Configure the **Include** and **Exclude** rules:

* **Include**: Only count items that match these criteria.

  * In the **Select criteria** dropdown, choose **Categories**, **Brands**, or **Product attributes**.

  <Image src="https://files.readme.io/6573d963a5be47f00d01c6f0721695355ffe59f5e375761b9c1253cbff352b32-Screenshot_2026-02-25_at_12.25.26_PM.png" align="center" width="70%" border={true} />

  * Search for or select the specific values (e.g., "Sandwich" or "Style") and click **Select**.

  <Image src="https://files.readme.io/aaded4f7f15728d22350284651f097b86d6cf56cd70f998d8eb0969fc6e7b931-Screenshot_2026-02-25_at_12.27.07_PM.png" align="center" width="70%" border={true} />

* **Exclude**: Count everything except these items.

  * You can exclude items based on **Categories**, **Brands**, **Product attributes**, or by uploading a specific **List of SKU codes**.

  <Image src="https://files.readme.io/a088a806478d6018ca041203a9ca7445bdfef674e56c7a3f8089ac8bab09eb19-Screenshot_2026-02-25_at_12.37.26_PM.png" align="center" width="70%" border={true} />

4. Select **Done** to save your product scope.

<Callout icon="⚠️" theme="warning">
  Removing a condition resets all benefit settings configured in Step 4. Before removing a condition, note your current benefit configuration so you can re-enter it after saving.
</Callout>

### Understanding "AND logic" (multiple conditions)

Multiple conditions can be layered together to create highly specific promotions — for example, requiring a specific combination of products to be purchased using a specific payment method. The promotion triggers only when **every single condition** is met simultaneously.

**+ Add condition** is available for **Sum of line item amount for selected product**, **Sum of line item quantity for selected product**, and **Payment mode** only. It is not available for **Cart amount**, **Count of items in the cart**, or **Gift voucher** — these function strictly as standalone conditions. Selecting any of them as your first condition disables the **+ Add condition** button.

To configure multiple conditions, follow these steps:

1. After defining your first eligible condition (for example, Payment mode or Sum of line item quantity for selected product), select **+ Add condition**.

<Image src="https://files.readme.io/6f5017844ec5662d6d19d09f543bd388e45316785d3dd79e60ca21f146d7deb7-Screenshot_2026-02-25_at_1.52.47_PM.png" align="center" width="70%" border={true} />

2. Choose the next **Cart property** from the dropdown, such as **Sum of line item amount for selected product**.

3. Select the **Operator** and enter the required **Value**.

   <Image src="https://files.readme.io/8cb5e46a87785a332c1401932e99cac608128409e225f96be714e41a3e6dbe37-Screenshot_2026-02-25_at_2.11.26_PM.png" align="center" width="70%" border={true} />

4. Select **+ Add condition** again to add more conditions.

<Image src="https://files.readme.io/470605d316cc1979acd22174349a603e0dd53c3bd040b2f4d225cf55fe5851bc-Screenshot_2026-02-25_at_2.16.47_PM.png" align="center" width="70%" border={true} />

A maximum of 10 conditions can be added per promotion. All conditions are linked by AND logic — the promotion applies only when every rule is met simultaneously.

**Example Scenario 1: "Premium combo logic"**

* **Condition 1:** Sum of line item amount (Electronics) `>=` $2000.
* **Condition 2:** Sum of line item quantity (Accessories) `>=` 2.

**Result:** A customer buying a $2100 laptop and 2 chargers gets the benefit. A customer who buys the laptop with only 1 charger does not qualify because not all conditions were met.

**Example Scenario 2: "Payment mode combo product"**

* **Condition 1:** Payment mode `IS` Capital One Card.
* **Condition 2:** Sum of line item quantity (Coffee) `>=` 2.
* **Condition 3:** Sum of line item quantity (Muffin) `>=` 1.

**Result:** An exclusive combo offer tied to a payment method. The customer must pay with the Capital One Card and have at least 2 coffees and 1 muffin in their cart. Missing any one of the three conditions means the benefit does not apply.

**You have successfully defined the conditions; now proceed to Step 4 to configure the benefits.**

# Step 4: [Defining where to apply benefits](https://docs.capillarytech.com/docs/configuring-benefits-)

Once the qualifying conditions are met, you must define the specific benefit the customer will receive. This involves determining whether the discount applies to the entire cart or specific items, and choosing the calculation method for the benefit.

## 1. Select benefit scope

Choose where the discount should be applied:

* **Cart**: Applies the discount to the final bill subtotal.
* **Select products in cart**: Applies the discount only to specific items within the cart.
* **Payment mode**: Applies the discount based on the payment method used in the transaction. Selecting this option restricts the benefit to customers who pay using the method specified in the **Payment mode** qualifying condition in Step 3. If the customer pays using a different method, the promotion does not apply even if all other cart conditions are met. This option only appears when you have configured a **Payment mode** qualifying condition in Step 3.

<Image src="https://files.readme.io/5e00a73390cfdebca0ba60bcf23e15b31383f50537840f11319bcf4f84410278-Screenshot_2026-02-26_at_10.17.39_AM.png" align="center" width="70%" border={true} />

## 2. Configure product logic

If you chose **Select products in cart**, you must define how the system identifies the items to be discounted:

| Logic Option                     | Description                                                                     | Real-World Example                                                          |
| :------------------------------- | :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------- |
| **Over and above the condition** | The discount applies to items **excluding** those that triggered the condition. | **Buy X, Get Y:** Buy a Laptop (Condition), get a Mouse (Benefit) for free. |
| **Selected in condition**        | The discount applies to the **same** items that met the qualifying condition.   | **Buy X, Get % off X:** Buy a T-shirt, get 20% off that same T-shirt.       |

<Image src="https://files.readme.io/c0601b3acd40ed886bfd93e7af15c64a727ea192b1c773890f86fdb1ec94fab3-Screenshot_2026-02-26_at_10.20.10_AM.png" align="center" width="70%" border={true} />

### Selecting products for the benefit

When **Over and above the condition** is selected, choose how the system identifies the specific items to which the benefit applies:

* **Single SKU**: The benefit applies to one specific product, identified by uploading a CSV with the SKU code. Because the benefit is tied to a single SKU, there is no ambiguity about what the customer receives — use this for gifting a specific item or clearing a targeted product line.
* **Multiple SKUs**: The benefit applies only when all the specified products are present in the cart together. Use this to build combo and bundle promotions that drive customers to purchase complementary products they might not otherwise add. Because all products must be present simultaneously, the all-or-nothing rule increases average basket size rather than rewarding a single item purchase.
* **Brand / Category / Attribute**: The benefit applies to all products matching a catalog attribute, such as a specific brand, category, or product attribute. Use this for category-level promotions where you want the benefit to cover a wide range of products without maintaining a SKU list — any product added to the matched attribute automatically qualifies.

#### Configuring a Multiple SKUs (combo product) benefit

1. The system displays two empty product blocks. Each block represents one product required in the combination. Starting with two enforces the minimum pairing needed for a bundle — the promotion cannot trigger on a single product alone.
2. In each block, select **Upload file** to upload a CSV containing the target SKU codes.
   * The system validates each uploaded SKU and displays a count of valid products (for example, "3 products uploaded"). Invalid SKUs are flagged and listed in a popover.
3. To require a specific quantity of each product, select **Add quantities** within the block and configure:
   * **Operator**: Set to **=** (equals).
   * **Value**: Enter the required quantity. Specifying a quantity per product controls the exact basket composition — for example, requiring 2 coffees and 1 sandwich ensures the customer commits to the full combo before the discount applies, preventing partial redemptions.
   * **Type**: Select **Selected in condition** to inherit the quantity already defined in the qualifying condition, keeping the condition and benefit in sync. Select **Custom** to set a different quantity for the benefit product, which is useful when the benefit item differs in quantity from the triggering item.
4. To add more products to the combination, select **+ Add condition**. A divider labelled **And also** separates each block. Each product added makes the combo more specific — use this when the promotion targets a curated bundle, but keep the total number of required products achievable for your target customer.
5. To remove a product from the combination, select the **X** on its block.

A single combo benefit supports up to 10 products. The benefit triggers only when every listed product is present in the cart — if any one product is missing, the discount does not apply.

<Callout icon="📘" theme="info">
  The **Selected in condition** option is not available when the benefit type is **Free product**. Configure free product benefits using **Over and above the condition** with a specific product target instead.
</Callout>

## 3. Choose benefit type

Select the format of the benefit:

* **Fixed amount**: A specific currency value is deducted (e.g., ₹100 off).
* **Percentage based**: A percentage is deducted from the price (e.g., 10% off).
* **Free product**: A specific item is given at no cost. After selecting this type, configure the **Quantity type** to control how many free units the customer receives:
  * **None**: No quantity constraint — the free product is added without a unit limit.
  * **Custom**: Enter a specific number of units in the **Value** field. Use this when the free item quantity differs from the purchase condition, for example, buy 3 shirts and get 2 socks free.
  * **Selected in condition**: The free product quantity matches the quantity defined in the qualifying condition in Step 3, keeping both values in sync.
* **Fixed target amount**: Also known as a **Bundle Price**, where a group of items is sold for a set price (e.g., Buy 3 for ₹999).

  <Image src="https://files.readme.io/81c0990aa348fadefe48eaafd9f13ea64d674529f7cc433fa343ce8722c20f1d-Screenshot_2026-02-26_at_10.27.12_AM.png" align="center" width="70%" border={true} />

## 4. [Recurring benefits](https://docs.capillarytech.com/update/docs/types-of-cart-promotion-?isFramePreview=true#d-recurring-benefits-apply-benefit-on-each-unit)

To allow a benefit to repeat within the same transaction, toggle **Apply benefit on each unit** to **Enabled**.

* **Example:** For every 2 items bought, the customer gets ₹50 off. If they buy 4 items, they get ₹100 off.
* **Configuration:**

  1. In the **Divide benefit per** field, enter the unit size that triggers one instance of the benefit. For example, enter `2` to apply the benefit for every 2 qualifying units.
  2. Under **KPI**, select whether to count by **Quantity** (number of items) or **Amount** (spend value).

  <Image src="https://files.readme.io/4c579ad254e469e438862eb1fea6b0b6e4143af692dac63d161c0e537f45e52e-Screenshot_2026-02-26_at_10.32.46_AM.png" align="center" width="70%" border={true} />

## 5. Benefit earning criteria

By default, a **Free product** benefit is evaluated against a single transaction: a customer must meet the qualifying condition in one purchase, or the promotion doesn't apply. **Benefit earning criteria** lets you instead let the qualifying quantity build up across a customer's purchases over time, so a customer who buys a few units on one visit and a few more on a later visit still earns the reward once their combined purchases cross the threshold.

<Image src="https://files.readme.io/9ddaeaf2775d3ec42f58c43502b8b3f79e94c31bdf649ea8cc0c8b679575cc92-accu_ss_video.gif" border={true} />

<br />

This section only appears when your organization has accumulation enabled. Raise a ticket with Capillary support to turn it on. Within an enabled org, the **Across multiple transactions** option is only selectable when all of the following are also true for the promotion:

| Requirement                | Value                                           |
| :------------------------- | :---------------------------------------------- |
| Qualifying condition       | Sum of line item quantity for selected products |
| Benefit on                 | Select products in cart                         |
| Apply benefit on each unit | Off                                             |
| Benefit type               | Free product                                    |
| Redemption limit           | Daily, weekly, monthly, or overall              |

If any of these aren't met yet, hovering the **Across multiple transactions** option shows a tooltip listing which conditions are still missing.

### Choosing how the condition is evaluated

* **On single transaction** (default): Only items purchased within a single transaction are evaluated for the promotion.

  <Image src="https://files.readme.io/5e708b3259d9559e6ef29c78e13f80c977125a40013b47b38e964e43e27f9b3b-image.png" border={true} />

* **Across multiple transactions**: Progress accumulates across transactions, and the benefit is awarded once the qualifying condition is met, even if no single transaction meets it alone.

  <Image src="https://files.readme.io/dc0f4b9855273f70e3869cebfc8450915e9ac949eabfd12ffc4e984bda54df81-image.png" border={true} />

For a worked example of how quantity builds up across visits, see [Accumulation-based offers](https://docs.capillarytech.com/docs/core-concepts-1#accumulation-based-offers) in Core Concepts.

### Carrying forward excess quantity

Once **Across multiple transactions** is selected, a **Carry forward excess purchase count/value to the next redemption** toggle appears. This is available only for **daily**, **weekly**, and **calendar month** redemption limits. Hovering over the toggle when it's disabled shows a tooltip explaining which redemption limit type is required.

<Image src="https://files.readme.io/3537d4c7be35fb00e3f8f4e303e28f2661319be4d978b992b1e51c0eb3558266-image.png" border={true} />

When you turn this toggle on, choose how long the carried-forward quantity should apply:

* **For entire promotion duration**: The excess carries forward for as long as the promotion runs, for example, a promotion with no recurring redemption limit at all.

  <Image src="https://files.readme.io/617e061db38b3229cd9ef3eba3e13934824c4a38ad9dae117cdf05e89efc3d5d-image.png" border={true} />

* **For a fixed number of redemption cycle(s)**: Enter the number of cycles the excess should carry into. This option is available only when the promotion's redemption limit uses a recurring cycle (see [Reset period](#5-reset-period)); if multiple fixed-window redemption limits are configured, the system uses whichever has the shortest cycle (for example, weekly over calendar month) to determine the carry-forward cycle.<br />

  <Image src="https://files.readme.io/9f19a41f4218f61b1c4a3f160e819115bcac7cdaf87712d5bc71d00d85eae27c-image.png" border={true} />

For what happens to leftover quantity with this setting on versus off, see [Over-achievement](https://docs.capillarytech.com/docs/core-concepts-1#over-achievement-what-happens-to-leftover-quantity) in Core Concepts.

* If you later change the qualifying condition, benefit configuration, or redemption limit on a live promotion so it no longer meets the requirements above, the system automatically switches the promotion back to **On single transaction** and shows a banner explaining which requirement is no longer met.&#x20;
* Switching a live promotion from **Across multiple transactions** back to **On single transaction** ends customers' accumulated progress, and it can't be restored, and also removes any carry-forward settings.&#x20;
* Turning off **Carry forward** on a live promotion ends customers' carried-forward progress once the promotion is live. Both changes prompt a confirmation before taking effect.

Before making a promotion using this feature live, see [How to test an accumulation promotion](https://docs.capillarytech.com/reference/loyalty-cart-promotions#how-to-test-an-accumulation-promotion).

# Step 5: Define scope and restriction

Defining the **where**, **when**, and **who** for your promotion ensures campaign integrity and budget control. This step allows you to set boundaries on eligibility and prevent over-redemption by establishing clear usage parameters.

1. Select **+ Add scope/restrictions** under the **Define scope and restrictions on availing promotions** section.

   <Image src="https://files.readme.io/766ec840ecb11e99e3e29925c5eae0451731d0372a0d01963111eb02f230ba40-Screenshot_2026-02-26_at_10.36.12_AM.png" align="center" width="70%" border={true} />

<br />

## **5.1 Defining eligibility (Scope)**

Configure the physical and demographic boundaries of your promotion to ensure it reaches the intended audience.

### Location and time scope

* **Limit to specific store entities**: Select **Customize** to restrict the promotion to specific physical or logical locations.

  <Image src="https://files.readme.io/e0df06c6e0d85d8a770ec1babc909b38b9b830c5943a6ee4b9d9872d7c809882-Screenshot_2026-02-26_at_11.00.26_AM.png" align="center" width="70%" border={true} />

  * **Concept**: Select specific brand concepts from the dropdown.

  <Image src="https://files.readme.io/135a6d95b7fe465575073fdbbb94deb069f0a1920c94fd2cc44b8bc44d309a3e-Screenshot_2026-02-26_at_11.01.35_AM.png" align="center" width="70%" border={true} />

  * **Store**: Choose individual stores or **Upload stores** via a file.

  <Image src="https://files.readme.io/5f96f48831f33f7c0a3ab5bdec7b2663ed77b4375ce4e24bd46f8eb73ebc96cb-Screenshot_2026-02-26_at_11.02.34_AM.png" align="center" width="70%" border={true} />

  * **Zone**: Restrict by geographical zones.

  <Image src="https://files.readme.io/543054c7da95292d0c3fa5a89636e1d25b1c62e02fad23817a19968741c697b8-Screenshot_2026-02-26_at_11.04.31_AM.png" align="center" width="70%" border={true} />

### Limit the cart promotion to a specific day/time scope

Select **Customize** to define the recurring active window.

<Image src="https://files.readme.io/24cedeaa8df2613298c6e797751a2e8e8f335e3c01688bd00889ed2a2295051f-Screenshot_2026-02-26_at_11.05.10_AM.png" align="center" width="70%" border={true} />

**Select the Recurrence Frequency**: Use the **Days/month scope** dropdown to decide how often the window repeats.

<Image src="https://files.readme.io/dd10f1cab6fa53ba165e4403de3d62949e94aef27ee455e78acbd77befb4998e-Screenshot_2026-02-26_at_11.25.48_AM.png" align="center" width="70%" border={true} />

* **Weeks**: Choose this for weekly patterns, for example, every Tuesday.
* **Days**: Choose this for monthly patterns for example the 1st and 15th of every month).
* **Does not repeat**: Choose this if the promotion should run 24/7 during its active dates.

<br />

### Define the days the promotion should be active

Based on your selection in Step 1, the system will enable or disable specific fields:

* **If you chose "Weeks"**: The **Days of the week** field becomes active. Select the specific days (e.g., Monday, Wednesday) the promotion should run. The **Dates of the month** field will be greyed out.

  <Image src="https://files.readme.io/31c1f8baf9d4af038fddb575fb8711997674202e11cc7601d416ca9ff7b7e0d0-Screenshot_2026-02-26_at_11.28.06_AM.png" align="center" width="40% " border={true} />

* **If you chose "Days"**: The **Dates of the month** field becomes active.

<Image src="https://files.readme.io/f984570fb9cdcb5c28777a8c36ea2b60567cdfc7f5490f09497d63cf407c8bee-Screenshot_2026-02-26_at_11.29.34_AM.png" align="center" width="40% " border={true} />

**Set the Daily Active Window**: Regardless of the recurrence, define the specific hours of the day:

* **Start time**: The exact time the benefit goes "live" on the selected days.

  <Image src="https://files.readme.io/095df622260a255d8af1846a5c9fe7eb555b5c98da314a991d2ecc5afcf8313e-Screenshot_2026-02-26_at_11.30.29_AM.png" align="center" width="40% " border={true} />

* **Duration in hours**: How long the benefit stays active from the start time.

  <Image src="https://files.readme.io/d1658cd0d349f60ba35967df6c84ab320e2a5cb1b8b15fe8a13a858a9504c80c-Screenshot_2026-02-26_at_11.31.01_AM.png" align="center" width="40% " border={true} />

### Customer eligibility

Select **Customize** next to **Limit to specific customers** to define your target audience:

<Image src="https://files.readme.io/ab69fa953e504fd652257457e3dacb925dc2b0ba67de3706ccee760bd669b7ba-Screenshot_2026-02-26_at_11.40.59_AM.png" align="center" width="70%" border={true} />

Customer eligibility settings allow you to narrow down your audience from the general public to specific loyalty tiers or subscription members.

> **Note**: This option applies to **POS cart promotions only**. For other promotion types, customer targeting is handled differently: Loyalty and Loyalty Earning promotions target customers through campaign issuance; Rewards promotions are self-selected by customers from the Rewards Catalog; Code-linked promotions are accessible to any customer who holds the promo code.

1. **Select the primary Audience**: Under the **Customers who are eligible for this promotion** section, choose the primary group.

<Image src="https://files.readme.io/13d3c4c12773800401d3332593a79b1bb852a11f86131eab2ba9df9318a89db6-Screenshot_2026-02-26_at_11.41.56_AM.png" align="center" width="70%" border={true} />

* **All customers**: Select this to make the promotion available to every registered user in your database.
* **Loyalty customers**: Select this to restrict the offer specifically to members of your loyalty program.

<br />

2. **Define the Loyalty Scope**: If you selected **Loyalty customers**, specify which members are eligible by making a selection under **Who belongs to loyalty type**.

<Image src="https://files.readme.io/ce955ed97fbbe59913ce38db522039f6b6af1d3f2d585a5287264be9e9d2dda1-Screenshot_2026-02-26_at_11.50.24_AM.png" align="center" width="70%" border={true} />

* **All:** The promotion is open to every member across all programs and tiers.
* **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/subscription-program">Supplementary program</Anchor>**: Choose this to target members of a specific sub-program, such as a paid subscription or a partner program.
* **<Anchor target="_blank" href="https://docs.capillarytech.com/docs/strategies_tiers">Tier</Anchor>**: Select this to target specific status levels, for example, Gold or VIP tier.

**Targeting by Tier**

1. **Select Main program**: Navigate to the **Main program** dropdown and select the primary loyalty program, for example, Group Loyalty Program.

<Image src="https://files.readme.io/d9fcacfa45b7c9698002d8ea546acf11a5fcfbd3283dc54bc911a744a097001b-Screenshot_2026-02-26_at_12.29.14_PM.png" align="center" width="70%" border={true} />

2. **Select Tier**: Once the program is selected, the **Tier** dropdown becomes active. Select a specific tier, for example, the Gold tier, from the list.

<Image src="https://files.readme.io/7c153644bb4e2df2412860ada8718dc5fc375d6f3445b691df42dd9fb4759e27-Screenshot_2026-02-26_at_12.30.32_PM.png" align="center" width="70%" border={true} />

<br />

3. Select **Done**.

**Targeting by Supplementary Program**

1. **Select Main program**: Navigate to the **Main program** dropdown and select the primary loyalty program associated with the subscription.

<Image src="https://files.readme.io/566baf2f406a8c96bc586de8bcb21b5e2aab16d07cc52fb5adea2ffb3fda2e00-Screenshot_2026-02-26_at_12.31.57_PM.png" align="center" width="70%" border={true} />

2. **Select Supplementary program**: Once the program is selected, the **Supplementary program** dropdown becomes active.

<Image src="https://files.readme.io/5c015619b3f6f72d42cbabeeb27617ff3707f96c6069052095c37533fd81aed1-Screenshot_2026-02-26_at_12.33.36_PM.png" align="center" width="70%" border={true} />

3. Select **Done** .

<Callout icon="📘" theme="info">
  To prevent configuration errors, the specific **Tier** or **Supplementary program** lists remain greyed out until a **Main program** is defined. If you change the Main program, the sub-selections reset to ensure the logic remains valid.
</Callout>

## 5.2 Understanding restrictions by promotion type

Different promotion goals require different levels of control; the fields available under **Issual** and **Redemption** restrictions vary by promotion type.

The following table shows what type of limits are supported by each promotion type.

| Restriction Feature            | POS | Loyalty | Loyalty Earning | Rewards | Code-linked |
| :----------------------------- | :-- | :------ | :-------------- | :------ | :---------- |
| **Individual Issual Limit**    | ✕   | ✓       | ✓               | ✓       | ✕           |
| **Individual Code Limits**     | ✕   | ✕       | ✕               | ✕       | ✓           |
| **Earn Limits** (Per Earn)     | ✕   | ✕       | ✓               | ✓       | ✕           |
| **Individual Cart Limits**     | ✓   | ✓       | ✓               | ✓       | ✓           |
| **Individual Customer Limits** | ✓   | ✓       | ✓               | ✓       | ✕           |
| **Global Customer Limits**     | ✓   | ✓       | ✕               | ✕       | ✕           |

## 5.3 Managing issuance and access restrictions

The following settings define how a promotion is issued to a customer or how they access it via codes, and how many times it can be redeemed. By configuring issual, code-level, cart-level, customer-level, and cross-customer limits, you can prevent misuse and limit overall discounts provided based on your requirements.

### 1. Individual promotion issual limit

You can configure Individual promotion issual limit for **Loyalty**, **Loyalty Earning**, and **Rewards** promotions.

1. Locate the **Individual promotion issual limit** field.
2. Enter the numerical value for how many times a customer can be issued this promotion. The maximum value is **50**.

### 2. Individual code limits

You can configure Individual code limits only for **Code-linked** promotions. A code-level limit is mandatory — the promotion cannot be saved without one.

1. Click **Add limit**.
2. In the **scope of limit** dropdown, select **per code limit**.
3. In the action type dropdown, select what to limit:
   * **count of redemptions** — limits the number of times a single promo code can be redeemed.
   * **count of transactions** — limits the number of transactions in which a promo code can be applied.
   * **sum of discount** — limits the total discount a single promo code can provide across redemptions.
4. Enter the maximum value in the input field.
5. To make the limit reset on a recurring cycle, select **+ Add reset period** under the limit row and configure the cycle type. For details, see [Section 5: Reset period](#5-reset-period).

### 5.4 Configuring redemption restrictions

You can specify restrictions to control how often a promotion can be used and how much discount it can give. Here you can set limits per earn, per cart, per customer, and across all customers, and these settings can’t be changed after the promotion goes live.

### 1. Earn limits

You can use earn limits to control how many times each earned benefit can be redeemed and how much discount a single earn can give.

You can configure earn limits for **Loyalty Earning** and **Rewards** promotions.

1. Click **Add limit**.
2. In the **scope of limit** dropdown, select **per earn**.
3. In the action type dropdown, select what to limit:
   * **count of redemptions** — limits the number of times a single earned benefit can be redeemed.
   * **count of transactions** — limits the number of transactions in which a single earned benefit can be applied.
   * **sum of discount** — limits the total discount a single earned benefit can provide.
4. Enter the maximum value in the input field.
5. To make the limit reset on a recurring cycle, select **+ Add reset period** under the limit row and configure the cycle type. For details, see [Section 5: Reset period](#5-reset-period).

### 2. Individual cart limits

You can configure Individual cart limits for **all** promotion types. Cart limits apply per transaction and do not support reset periods.

1. Click **Add limit**.
2. In the **scope of limit** dropdown, select **per cart**.
3. In the action type dropdown, select what to limit:
   * **count of redemptions** — limits the number of times the promotion can apply within a single cart.
   * **sum of discount** — limits the total discount the promotion can give within a single cart.
4. Enter the maximum value in the input field.

### 3. Individual customer limits

You can configure individual customer limits for **POS**, **Loyalty**, **Earning**, and **Rewards**. **Code-linked promotions** do not support per-customer limits — use the **Individual code limits** in section 2 above to control how often each code can be redeemed.

1. Click **Add limit**.
2. In the action type dropdown, select what to limit:
   * **count of redemptions** — limits the number of times a customer can use the promotion.
   * **count of transactions** — limits the number of transactions in which a customer can use the promotion.
   * **sum of discount** — limits the total discount amount a customer can receive across redemptions.
3. Enter the maximum value in the input field.
4. In the **scope of limit** dropdown, select **per customer**.
5. To make the limit reset on a recurring cycle, select **+ Add reset period** under the limit row and configure the cycle type. For details, see [Section 5: Reset period](#5-reset-period).

### 4. Promotion limits across customers

You can configure promotion limits across customers for **POS** and **Loyalty** promotions.

1. Click **Add limit**.
2. In the **scope of limit** dropdown, select **per promotion**.
3. In the action type dropdown, select what to limit:
   * **count of redemptions** — limits the total number of times the promotion can be redeemed across all customers.
   * **count of transactions** — limits the total number of transactions in which the promotion can be applied across all customers.
   * **sum of discount** — limits the total discount the promotion can give across all redemptions.
4. Enter the maximum value in the input field.
5. To make the limit reset on a recurring cycle, select **+ Add reset period** under the limit row and configure the cycle type. For details, see [Section 5: Reset period](#5-reset-period).

### 5. Reset period

You can select **+ Add reset** under a configured limit row to make the limit refresh automatically after a specified interval. For more details, refer to [Reset Period for limits](https://docs.capillarytech.com/docs/core-concepts-1#reset-periods).

For example, selecting **every calendar month** resets the customer's counter on the 1st of each month, allowing them to use the promotion again in the next cycle. Once a reset period is configured, a **Preview cycle** button appears next to the limit row. Select it to preview the upcoming cycle dates and verify the schedule before saving.

A no-cycle limit and a fixed-window limit can be set together on the same restriction level and KPI. Both are enforced independently; the customer is blocked when either is exhausted. For example, set a lifetime redemption limit of 50 and a monthly limit of 5 to control both the total and the monthly rate on the same promotion.

<Callout icon="⚠️" theme="warning">
  - **every X days**, **every week**, and **every calendar month** are fixed-window cycles and cannot be combined with **for last X days** or **for last X weeks** rolling-window cycles in the same promotion, since they use incompatible counting methods. Configure all limit rules using the same window type.
  - When editing an existing cart promotion, a no-cycle limit and a fixed-window limit cannot be combined on the same KPI, which keeps a promotion customers are already redeeming against from being changed into a conflicting limit setup. This restriction applies only while editing an existing promotion; both limit types can be combined freely on the same KPI when creating a new promotion, and on different KPIs at any time. For example, if an existing promotion already has a lifetime limit on **count of redemptions**, you cannot add a monthly limit to the same KPI while editing that promotion, but you can still add it to a different KPI such as **sum of discount**.
</Callout>

### Cycle start date

When you configure a fixed-window reset period (**every X days**, **every week**, or **every calendar month**), you can choose when each customer's cycle begins using the **Cycle start date** setting.

| Option                       | How it works                                                                                                                                                                                                                                                                                                                     | Available for                                           |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| **Promotion config date**    | All customers share the same cycle anchor — a specific reference date you set when creating the promotion. Every customer resets on the same schedule regardless of when they received the promotion. For example, if the reference date is 1 June and the cycle is monthly, all customers reset on 1 July, 1 August, and so on. | All promotion types                                     |
| **Customer's issuance date** | Each customer's cycle begins on the date the promotion was issued to them. A customer who receives the promotion on 5 June resets on 5 July, while one who receives it on 20 June resets on 20 July. Use this to give every customer an equal window from the moment they receive the promotion.                                 | **Loyalty Earning** and **Code linked** promotions only |

<Callout icon="📘" theme="info">
  - Each limit row includes a **copy icon** on the right. Select it to duplicate the rule as a starting point for a second rule — useful for combining a lifetime cap with a recurring window cap on the same KPI.
  - The maximum number of limit rules across all scopes is **10** for the promotion as a whole, not per scope.
  - If duplicate limit rules are detected, a warning banner appears at the top of the limits section. Resolve all duplicates before proceeding.
  - For **Code linked promotions**, a per-code limit is mandatory. The promotion cannot be saved without one — the system prompts you if it is missing.
</Callout>

## 5.5 Set the expiry of the earned promotion

For **Loyalty Earning** and **Rewards** promotions, define when the issued benefit becomes invalid.

Select one of the following options to define when the earned benefit expires. This setting controls how long a customer has to use the promotion after it's issued or earned, and directly affects whether customers lose access at the same time or on individual timelines.

* **Along with the promotion**: The earned benefit expires on the same date as the promotion end date. All customers lose access simultaneously, regardless of when they earned the promotion. Use this when you want a clean campaign cutoff.
* **From the date of earning**: Enter the number of **Days** the promotion remains valid after the customer earns it. Each customer gets a personal countdown from the moment they earn the benefit. A customer who earns on day one and one who earns on day 20 will have different expiry dates. Use this to give every customer equal time to redeem.
* **From the date of issuance**: Enter the number of **Days** the promotion remains valid after the system issues it to the customer. The clock starts at the moment the system issues the promotion, not when the customer earns or claims it. Use this when issuance and the earning event happen at different points in time.

<Image src="https://files.readme.io/6ad82f3e6806e42f4f8c9e7c5af7f0a8ad13c385ba72538bd70a2e3dd39cb478-Screenshot_2026-02-26_at_8.28.49_PM.png" align="center" width="70%" border={true} />

<Callout icon="⚠️" theme="warning">
  Changing the number of days after the promotion is live immediately affects all customers who have already received the promotion, activating or expiring their benefit without delay.
</Callout>

# Step 6: Additional information

Enter values for custom fields your organisation has configured for this promotion. These fields don't affect how the promotion applies to customers at checkout — they're internal metadata that tags the promotion for reporting, financial tracking, or campaign management purposes. To learn how to set up custom fields, refer to [Cart Promotion Settings](https://docs.capillarytech.com/docs/cart-promotion-settings).

If your organisation has not configured any custom fields, this step displays an empty state with a link to **Cart Promotion Settings**. Select the link to navigate there and create the fields you need, then return to the promotion to complete this step.

Custom fields use one of the following input types:

| Field type | Description                         |
| :--------- | :---------------------------------- |
| **Number** | Accepts a numerical value.          |
| **Text**   | Accepts free-form text input.       |
| **Date**   | Accepts a date via the date picker. |

Complete all required fields before proceeding. You can leave optional fields blank.

1. Enter the value for each custom field displayed.
2. Select **Continue**.

<Image src="https://files.readme.io/ee8d1bb9644a729e1f40d21deaa5e12af54c44669b61083d23f97c119295506f-Screenshot_2025-06-05_141355.png" align="center" width="70%" border={true} />

<br />

# Step 7: Configuring communication triggers

This section defines how the system automatically communicates with your customers at key points in the promotion journey. Configuring communication helps drive awareness and timely redemption — customers who receive a notification when they earn a benefit are more likely to use it, and those who receive a reminder before it expires are less likely to let it lapse unused.

<Callout icon="📘" theme="info">
  The **On earning** trigger is available for **Loyalty earning promotion** and **Rewards promotion** only. It does not appear for **Loyalty promotion**, **POS promotion**, or **Code linked promotion**, because those promotion types either apply automatically at checkout or use a code for access, and don't have a distinct earning moment.
</Callout>

## On earning

This trigger fires at the moment the customer earns the promotion — for example, when they complete their third purchase or buy a reward with points. The message notifies the customer that a new benefit is now available for them to use at their next checkout.

1. Select **+ Add creative on earning**.

   <Image src="https://files.readme.io/d978157049838dcef68c7bf681f278ff0bf794e86714ed7b2f7b5e57774af8ea-Screenshot_2026-02-26_at_8.53.00_PM.png" align="center" width="70%" border={true} />

2. From the **Message strategy** dropdown, select how messages are delivered when multiple channels are configured:

   * **Broadcast**: The message is sent across all configured channels simultaneously. Use this when you want every customer to receive the notification on every channel they are reachable on.
   * **Channel priority**: The message is delivered through the highest-priority channel that successfully reaches the customer. If the first channel fails or the customer is unreachable on it, the system tries the next channel in order. Use this to maximise delivery while avoiding duplicate messages.
   * **Personalisation**: The message content adapts based on the customer's product or store affinity. When this strategy is selected, you must attach the relevant product or store category to the creative. The system will surface a validation warning if you save without attaching the required category.

3. Under **Audience**, select the customers who should receive this communication. By default, all customers eligible for the promotion are included. Select specific **Audience groups** to narrow the recipients to a defined segment — for example, send the earning notification only to customers in a specific tier or region.

4. Select a channel tab — **SMS**, **Email**, **WeChat**, or **Mobile push** — and choose a pre-defined template.

   <Image src="https://files.readme.io/d85b826a066cd0dee24d28f1b8357541a0f55a29dcc85d10a6112f9183651161-Screenshot_2026-02-26_at_8.54.02_PM.png" align="center" width="70%" border={true} />

5. Configure the delivery settings for the selected channel.

<Callout icon="⚠️" theme="warning">
  If the template content includes offer-related tags, an offer must be attached to the creative before saving — otherwise the system displays: "Please add offer tags to the above content." If the content includes points-related tags, a loyalty program must be selected. Resolve all tag warnings before proceeding.
</Callout>

### SMS

| Field                        | Description                                                                                                                                                                        |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GSM Sender ID**            | The sender ID used for GSM network messages.                                                                                                                                       |
| **CDMA Sender ID**           | The sender ID used for CDMA network messages.                                                                                                                                      |
| **SMS Domain**               | The domain through which the SMS is routed.                                                                                                                                        |
| **Send to DND customers**    | Toggle to **Enabled** to include customers who have registered on the Do Not Disturb list. By default, DND customers are excluded.                                                 |
| **Use tiny URL**             | Toggle to **Enabled** to automatically shorten any links in the message content. Reduces message length and character count.                                                       |
| **Send to brand POCs**       | Toggle to **Enabled** to route a copy of the message to configured brand Points of Contact.                                                                                        |
| **Maximum messages per day** | Enter a number to limit how many messages the system sends to a single customer per day. This prevents over-messaging if a customer earns the promotion multiple times in one day. |

### Email

| Field                        | Description                                                                                                               |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Sender ID**                | The email address that appears as the sender.                                                                             |
| **Sender Name**              | The display name shown in the recipient's inbox.                                                                          |
| **Reply-to ID**              | The email address customers reply to.                                                                                     |
| **Email Domain**             | The domain used for sending the email.                                                                                    |
| **Send to NDNC customers**   | Toggle to **Enabled** to include customers on the National Do Not Call registry. By default, NDNC customers are excluded. |
| **Use tiny URL**             | Toggle to **Enabled** to shorten links in the message content.                                                            |
| **Send to brand POCs**       | Toggle to **Enabled** to route a copy to configured brand Points of Contact.                                              |
| **Maximum messages per day** | Enter a number to cap how many emails the system sends to a single customer per day.                                      |

### WeChat

| Field              | Description                                         |
| :----------------- | :-------------------------------------------------- |
| **WeChat account** | Select the WeChat account to send the message from. |

## Set expiry reminder

This trigger fires a specified number of days before the customer's earned promotion expires. It nudges customers who have earned but not yet used the benefit, encouraging them to redeem before they lose access.

1. Select **+ Add creative expiry reminder**.

   <Image src="https://files.readme.io/da36cfaa6153d179184826fd2fa28a49fbeafb130a34025efa43e3340523a77a-Screenshot_2026-02-26_at_8.54.34_PM.png" align="center" width="70%" border={true} />

2. In the **Expiry before days** field, enter the number of days before expiry that the system should send the reminder. For example, entering `3` sends the reminder 3 days before the promotion expires for each customer.

3. From the **Message strategy** dropdown, select the delivery strategy. See the **On earning** section above for the available options and when to use each.

4. Under **Audience**, select the customers who should receive the reminder. By default, all eligible customers are included.

5. Select a channel tab and choose a template.

   <Image src="https://files.readme.io/f9abe38d6ca3b6b170785c1cd0d19a2d901b03e8998e01111863f0b7e7e07246-Screenshot_2026-02-26_at_8.55.29_PM.png" align="center" width="70%" border={true} />

6. Configure the delivery settings for the selected channel using the same options in **On earning** above.

# Step 8: Managing promotion stacking

This step defines whether this promotion can apply alongside other active promotions or must apply in isolation. This directly affects how much total discount a customer can receive in a single cart — setting a promotion as exclusive protects your margins by ensuring only this promotion applies, while leaving it stackable lets customers benefit from multiple overlapping offers simultaneously.

The options available here depend on the stacking configuration set at the org level in [Cart Promotion Settings](https://docs.capillarytech.com/docs/cart-promotion-settings).

<Callout icon="📘" theme="info">
  Compatibility settings only appear if your organisation has enabled cart-level or product-level stacking in Cart Promotion Settings. If this section isn't visible, contact your system administrator.
</Callout>

1. Select **Show** next to **Compatibility settings** at the bottom of the page.

<Image src="https://files.readme.io/ec916fd249096d09829d6ce87abe13635ea843cd09f8d71c3cc3d05e9ed258fd-Screenshot_2025-11-20_at_2.17.21_PM.png" align="center" width="70%" border={true} />

### Exclusive at cart level

This option is available when the benefit scope in Step 4 is set to **Cart**.

2. Toggle **Mark this promotion as exclusive at cart level**.

<Image src="https://files.readme.io/f7b858d0e1104aa4983849117f3e292acbdcb7dfe66b5270bbdab0218aa5a0e2-Screenshot_2025-11-20_at_2.21.45_PM.png" align="center" width="70%" border={true} />

* **Enabled**: If this promotion is applied, no other promotions will be applied to the same cart. The customer receives the benefit of this promotion only, even if other valid promotions exist for the same cart.
* **Disabled**: Other applicable promotions can be applied to the cart alongside this one. The customer can benefit from multiple promotions in the same transaction.

### Exclusive for selected products

This option is available when the benefit scope in Step 4 is set to **Select products in cart**.

3. Toggle **Mark this promotion as exclusive for selected products**.

* **Enabled**: No other promotion can apply a discount to the same products in this cart. The selected products are locked to this promotion's benefit only.
* **Disabled**: Other promotions can also apply discounts to the same products, allowing a single product to receive multiple overlapping discounts.

4. If you enabled **Mark this promotion as exclusive for selected products**, select the **Exclusivity level**:

* **Quantity level**: Exclusivity applies at the individual unit level. Each unit of a qualifying product can only receive a discount from one promotion at a time. If a customer has 3 units of a product and two promotions qualify, each unit is assigned to at most one promotion.

5. Select **Continue** to save the settings.

**You have successfully configured the benefits, scope, restrictions, and communication settings; now proceed to finalize the promotion.**

Review your configuration and select **Create promotion** to activate the cart promotion

<Callout icon="📘" theme="info">
  ### Note

  By default, an organization can have up to **250 active promotions** across all types. If needed, this limit can be increased based on requirements.
</Callout>

<br />

<br />