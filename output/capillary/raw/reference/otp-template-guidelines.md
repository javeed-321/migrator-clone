---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# OTP template guidelines

This page provides you with information on creating an OTP template for SMS, Email, WhatsApp and ZALO, and on the OTP workflow.

An OTP template is a predefined format or structure for sending One-Time Passwords (OTPs). An OTP template includes placeholders for the one-time password, expiration time, and other details as required.\
**Example:** Dear user, your one-time password (OTP) is: \{\{otp\_code}}. This OTP is valid for the next 10 minutes.

# SMS and Email template

> 🚧 Approval for SMS template
>
> Depending on the country of operation, approval might be required from the respective authorities for the SMS template. Make sure that you have appropriate approval.

To create or update the OTP template for SMS and Email, create a JIRA ticket ([sample ticket](https://capillarytech.atlassian.net/browse/CAP-110360)) and assign it to the sustenance team. The ticket should have the following details:

* Name of the template
* Action for which the template is used. The supported actions are:
  * COUPON
  * POINTS
  * REGISTRATION
  * GENERIC
  * USERGROUP
  * POINTSTRANSFER
  * SUBSCRIPTION
  * CUSTOMER\_STATUS\_UPDATE
  * CUSTOMER\_IDENTIFIER\_CHANGE
  * CUSTOMER\_ISSUE\_LINK\_CARD.
* Template format
* Org ID and the org name
* Email subject (for Email templates only)
* For the Email template, include HTML tags/creative information as required. This needs to be pasted as part of the body.

> 📘 Note
>
> Only one template can be create for an action (coupon, point, subscription etc) for both SMS and Email.

You can create an Email template on Engage+ also. Refer to the [documentation](https://docs.capillarytech.com/docs/create-email-template) for more information.

# WhatsApp

The OTP template for WhatsApp is created on Engage+.  For information on creating the template, refer to the documentation on [creating a WhatsApp template on Engage+](https://docs.capillarytech.com/docs/create-whatsapp-template). This needs to be approved by WhatsApp.

> 📘 Notes:
>
> * The template should be separate for each language and the template name should be unique at the org level.
> * Make sure that the OTP template does not have multiple placeholders for the OTP. This can lead to displaying OTP in all placeholders.
> * The template should be as per the [WhatsApp guidelines](https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates/).

# ZALO

Zalo is a multi-functional mobile application which is popular in Vietnam.

For creating an OTP template for ZALO, contact your CSR. Detailed documentation on the Zalo template is available [here](https://docs.capillarytech.com/docs/create-zalo-template).

> 📘 Note
>
> Make sure that the OTP template does not have multiple placeholders for the OTP. This can lead to displaying OTP in all placeholders.

# Sending OTP - flow chart

<Image align="center" className="border" width="25% " border={true} src="https://files.readme.io/b48302e-Flowchart.png" />

For information on configuring the channel gateway, refer to the [channel configuration documentation](https://docs.capillarytech.com/docs/channel-configuration).

For information on configuring OTP settings, refer to the [OTP settings configuration](https://docs.capillarytech.com/docs/setup-otp-verification-rules) documentation.