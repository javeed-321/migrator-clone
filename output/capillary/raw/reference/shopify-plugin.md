---
updatedAt: 2026-03-04T06:19:03.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Shopify plugin

You can integrate Capillary with Shopify and activate a loyalty program for your website.

# Capillary Shopify Integration

Navigate to [Capillary Shopify integration](https://apps.shopify.com/capillary-crm-integration) to integrate the Capillary plugin into Shopify.

***

## Introduction – Project overview

### Purpose of this document

The purpose of this document is to give a detailed overview of all Shopify user flows and how to navigate the application.

### Scope of this document

The scope of this document is to cover the Shopify user flows relating to Phase 1.1.

***

## Plugin installation steps

To install the Shopify app publicly, you must publish the app in the Shopify App Marketplace.
Alternatively, you can install the app in development stores from the Shopify Partner account.

### Create a public app in Shopify Partner

1. Log in to the Shopify Partner account.
2. Go to **Apps** from the left sidebar.
3. Click **Create app**.
4. Choose **Public app**.
5. Add the following details:

   * App name
   * App URL
     (Server domain URL)
   * Allowed redirection URL
     (`app_url/authenticate`)
6. Create the app.

After creation, you receive:

* API key
* API secret key

Add these values to the `.env` file of the Laravel application.

***

### Install the app in a Shopify store

1. Go to **Apps** in the Partner dashboard.
2. Select the created app.
3. Click **Select store**.
4. Choose a development store from the list.
5. Install the app.

***

## Shopify user flows

### Authentication

1. Go to **Apps → Capillary CRM Integration**.
2. Click **General Authenticate**.
3. Provide authentication details:

   * Client ID
   * Client secret key
   * Base URL of the API (contact Capillary team)
4. Submit the configuration.

To view the store frontend:

1. Go to **Online Store**.
2. Click **View your store**.

***

## Theme configuration

### Turn on app embeds

1. Go to **Online Store → Customize**.
2. Select **Theme settings → App embeds**.
3. Enable:

   * Capillary – Setting
   * Capillary – Includes
4. Enable **Capillary – jQuery Files** if jQuery is not already used.

***

### Cart page with blocks

1. Go to **Online Store → Customize**.
2. Search for **Cart**.
3. Click **Add block**.
4. Add required Capillary app blocks and checkout button.

***

### Cart page without blocks

Add the following `div` elements to the cart page:

* Redeem points

  ```html
  <div id="cap-cart-point"></div>
  ```

* Coupon

  ```html
  <div id="cap-cart-coupon"></div>
  ```

* Redeem points discount value

  ```html
  <div id="cap-redeem-point-discount-value"></div>
  ```

* Coupon discount

  ```html
  <div id="cap-coupon-discount"></div>
  ```

* Checkout button

  ```html
  <div id="cap-check-out-btn"></div>
  ```

**Notes**

* Redeem points and coupons require the Capillary checkout button.
* These settings apply only to the cart page.

***

## OTP fields on registration page

### Mobile OTP

1. Go to **Apps → Capillary CRM Integration → Config Capillary Settings**.
2. Open **OTP verification**.
3. Enable **Mobile OTP Enable**.
4. Enter the phone input field ID.
5. Save the configuration.
6. Add the following classes in the registration page:

   * Send OTP button:
     `send-mobile-otp-btn`
   * OTP input and verify block:
     `mobile-otp-box`

***

### Email OTP

1. Enable **Email OTP Enabled**.
2. Enter the email input field ID.
3. Save the configuration.
4. Add the following classes:

   * Send OTP button:
     `send-email-otp-btn`
   * OTP input and verify block:
     `email-otp-box`

***

## Display blocks

### Point history

```html
<div id="point-history-div"></div>
```

### Coupon history

```html
<div id="cap-coupon-div"></div>
```

### Transaction history

```html
<div id="cap-trans"></div>
```

### Available points

```html
<div id="cap-point-id"></div>
```

### Slab name

```html
<div id="cap-tier-id"></div>
```

***

## Attribute mapping

### Create attributes in Shopify

1. Go to **Apps → Capillary CRM Integration**.
2. Click **Capillary Tech → Assign Attributes**.
3. Click **Assign Attribute**.
4. Set:

   * Status: Enabled
   * Attribute type: Custom field or Extended field
   * Attribute code
   * Capillary attribute code
5. Save.

Ensure the attribute exists on the Capillary side.

***

## Customer creation configuration

### Enable customer creation

1. Go to **Config Capillary Settings → Customer**.
2. Set **Enabled Customer Creation** to **Yes**.
3. Save the configuration.
4. Register a user on the storefront.

Customer appears in:

* Shopify → Customers
* Capillary dashboard

***

### Disable customer creation

1. Set **Enabled Customer Creation** to **No**.
2. Save the configuration.
3. Register a user.

Customer appears only in Shopify.

***

## Customer updation

### Enable customer updation

1. Set **Enabled Customer Updation** to **Yes**.
2. Edit a customer from Shopify admin.

Customer updates reflect in Capillary.

***

### Disable customer updation

1. Set **Enabled Customer Updation** to **No**.
2. Edit customer details in Shopify.

Updates do not reflect in Capillary.

***

## Loyalty points and slab

### Enable

1. Go to **Stores → Configuration → Capillary Tech → CMI Integration**.
2. Set **Enabled Customer Fetch** to **Yes**.
3. Save.
4. Add:

   ```html
   <div id="cap-point-id"></div>
   <div id="cap-tier-id"></div>
   ```

***

### Disable

1. Set **Enabled Customer Fetch** to **No**.
2. Save.

Loyalty points and slab are not displayed.

***

## Transactions

### Enable success transactions

1. Go to **Config Capillary Settings → CRM Integration**.
2. Set:

   * Enabled Add Transactions: Yes
   * Enable Customer grouping: Yes
3. Save.
4. Add:

   ```html
   <div id="cap-trans"></div>
   ```

***

### Disable success transactions

1. Set **Enabled Add Transactions** to **No**.
2. Save.

Transaction history is not shown.

***

## Cancel transactions

### Enable

1. Enable **Cancel Transactions**.
2. Place and cancel an order.

Both success and cancel transactions appear.

***

### Disable

1. Disable **Cancel Transactions**.
2. Cancel an order.

Cancel transaction does not appear.

***

## Transaction attribute mapping

1. Go to **Capillary Tech → Assign Transaction Attributes**.
2. Create transaction attributes.
3. Map them to Capillary custom or extended fields.
4. Place an order.

Transaction data reflects in Capillary Member Care.

***

## Tracker API

Configure **Progress Tracker Data** under **CRM Integration**:

* Minimum value
* Maximum value
* Total tiers
* Tier data (JSON/array)

Save the configuration.

***

## OTP validation during registration

### Enable OTP validation

1. Enable:

   * Mobile OTP
   * Email OTP
   * Country code (optional)
2. Provide input field IDs.
3. Save.

OTP validation applies during registration.

***

### Disable OTP validation

1. Disable Mobile and Email OTP.
2. Save.

Users can register without OTP.

***

## Group coupon redemption

### Enable

1. Set **Group Redemption enabled** to **Yes**.
2. Save.

Primary and group users share coupon history.

***

### Disable

1. Set **Group Redemption enabled** to **No**.
2. Save.

Group users cannot redeem primary user coupons.

***

## Redeem coupons at SKU level

1. Place an order for a specific SKU.
2. Receive coupon.
3. Apply coupon only for the same SKU.

Applying it to other SKUs fails.

***

## Pilot program

### Enable

1. Enable **Pilot program**.
2. Set:

   * Custom field: `pilot`
   * Value: `yes`
3. Save.

Only pilot users can access loyalty features.

***

### Disable

1. Disable **Pilot program**.
2. Save.

No users can access loyalty features.

***

## Points redemption

### Enable

1. Enable **Points redemption**.
2. Set:

   * Minimum points
   * Maximum points
   * Multiples
3. Save.

Points field appears on the cart.

***

### Disable

1. Disable **Points redemption**.
2. Save.

Points field does not appear.

***

## Status messages

* Home
* General Authenticate
* Config Capillary Settings
* Capillary Tech
* Success! Configured!
* Failed! Something went wrong!

<br />