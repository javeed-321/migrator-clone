---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Coupon redeem template

The coupon redeem template allows you to redeem active coupons of a loyalty customer.

# Configuring coupon redeem dataflow

To configure coupon redeem dataflow, perform the below steps/actions:

1. In the **Connect-to-source section** <Glossary>Block</Glossary> enter the source server details where the source\
   data is present and the location for saving the processed file. See [Connect to source](https://docs.capillarytech.com/docs/configure-actions#connect-to-source).
2. In the **Decrypt data** block, if the files are encrypted, enter the details to decrypt the data. See [Decrypt data](https://docs.capillarytech.com/docs/configure-actions#decrypt-data).
3. In the **Transform Data** block, map the API fields with the source file. For information on how to map the fields, see [Transform data](https://docs.capillarytech.com/docs/configure-actions#transform-data).
   > 🚧
   >
   > Make sure that you include at least one identifier detail, such as a mobile number or email address. At least one identifier value is mandatory.
4. In the **Connect-to-destination** block, enter the API endpoint details.\
   For this template the API `/v2/coupon/redeem`, is used.  See [Connect to destination](https://docs.capillarytech.com/docs/configure-actions#connect-to-destination).
5. In the **Trigger** block, enter the details to schedule the trigger. See [Trigger](https://docs.capillarytech.com/docs/configure-actions#schedule-trigger).