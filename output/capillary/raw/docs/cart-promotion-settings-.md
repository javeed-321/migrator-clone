---
updatedAt: 2026-04-14T12:16:40.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Cart Promotion Settings

The following steps guide you through the high-level configuration of the Cart Promotions engine, including evaluation sequences, stacking logic, ranking priorities, and rounding rules.

# Step 1: Setting the evaluation mechanism

Define the primary sequence the engine follows to calculate discounts. This determines whether the system prioritizes individual items or the total cart subtotal.

1. Navigate to **Settings > Cart Promotion**.
2. Under **Evaluation Mechanism**, select one of the following sequences:

* **Lineitem then cart:** Promotions apply to individual items first. The cart-level discount is then calculated based on the new reduced subtotal.
  * Example: For **Shoes ($100) + Towel ($20)**, a 10% item promo reduces shoes to $90. The subtotal becomes $110. A subsequent "10% off > $99" cart promo applies to $110.
* **Cart or lineitem with cart first:** Cart-level promotions take priority. Individual item promotions are only applied if no cart-level offers are valid.
  * Example: For **Shoes ($100) + Towel ($20)**, the total is $120. A "10% off > $99" cart promo applies immediately ($108). The system then **skips** all item-level discounts.

# Step 2: Managing multiple promotions for single lineitems

This setting allows different promotions to target different quantities of the same product SKU within a single cart.

1. Toggle **Multiple promotion for single lineitem** to **Enabled**.

### A. Exclude products

Toggle **Exclude below products** to protect specific items from quantity-splitting logic.

* **Based on product attribute:** Filter by metadata like "Category" or "Brand."
* **Upload SKUs:** Bulk-upload a CSV (Max 5MB) of specific SKUs to be excluded.

### B. Multiple promotion on single quantity (stacking)

Toggle **Stacking** to allow multiple discounts to layer on a **single unit** of a product.

* **Maximum promotions:** Select **No limit** or enter a **Custom limit**.
* **Calculation Base:** Choose **Gross** (original price) or **Net** (price after previous discounts/taxes).

### C. Product-level restrictions

Toggle **Multiple promotion defined at product level** to restrict stacking logic to a specific scope.

* **Select product:** Apply logic to **All** inventory or **Specific Products**.
* **Inclusion/Exclusion:** Refine the scope using attributes or SKU uploads.

# Step 3: Configuring multiple promotions at cart level

This allows customers to "stack" multiple global, order-wide offers (for example, combining "Free Shipping" with a "10% Discount").

1. Toggle **Multiple promotion for cart level** to **Enabled**.
2. **Maximum number of promotion:** Set a numerical cap or select **No limit**.
3. **Calculate percentage discount on:**
   * **Gross:** Calculated on the original subtotal before any charges.
   * **Net:** Calculated on the subtotal remaining after line-item discounts are applied.

# Step 4: Establishing promotion ranking order

When multiple promotions are eligible, the ranking order determines which offers are applied first and which take priority in conflicts.

1. Locate the **Promotion Ranking Order** section.
2. Use **drag-and-drop** to reorder the following elements (top is highest priority):

* **POS promotion**: Standard offers available to all customers that apply automatically based on cart contents.
* **Earning promotion**: Offers issued to a customer only after they complete a specific milestone or activity.
* **Loyalty promotion**: Offers designed to target specific customer groups automatically based on their purchase history or tier status.
* **Reward**: Benefit-based offers redeemed by the customer using loyalty points from the Rewards Catalog.
* **Code linked:** Promotions triggered by the manual entry of a specific promo code at checkout.
  Earliest expiry: Prioritizes the offer that is scheduled to end the soonest.
* **Maximum discount**: Automatically chooses the offer that saves the customer the most money.

# Step 5: Defining discount rounding logic

Control how the system handles decimal values when a discount results in a non-whole number.

1. Under **Rounding Option**, select the required mathematical logic:
   * **UP / DOWN:** Rounds away from or toward zero.
   * **CEILING / FLOOR:** Rounds toward positive or negative infinity.
   * **HALF UP / DOWN / EVEN:** Standard rounding to the nearest value with specific logic for .5 cases.
2. In the **Decimal Precision** box, enter the number of digits to retain (for example, "2" for $10.55).

# Step 6: Creating custom metadata fields

Add internal tracking parameters that will appear during the promotion creation process for reporting purposes.

1. Navigate to the **Custom Fields** section.
2. Select **Create New Field**.
3. Enter the field name (for example, "Department ID" or "Vendor Name").
4. Select **Save**.

<Callout icon="📘" theme="info">
  Once created, these fields appear in Step 6 (Additional Information) of the standard cart promotion creation flow.
</Callout>