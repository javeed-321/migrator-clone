---
updatedAt: 2026-07-03T11:12:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customer entity

This page provides you with information on customer entity

The Customer entity is the focal point around which all our data revolves. This entity includes information about each customer, ranging from essential contact details to demographic and geographic data. In addition, It also includes information about their purchase history, behavioural activities, loyalty details, the user groups they are part of, reward and coupon details and other related information.

Within this framework, the source through which a customer is registered is called a customer data source. This source serves as the initial touchpoint, capturing the basic details that contribute to the making of a customer profile. Additionally, the channels available for communication with the customer are referred to as customer communication channels. These channels play a pivotal role in establishing meaningful connections and fostering effective communication with customers.

## Related entities

A customer entity can have information related to other entities and similarly the other entities can include customer entity information. For example, card entity, and transaction entity can include information related to customer entity and vice-versa.

# Supported objects and fields

The image below provides you with information about the supported objects and fields in the customer entity.

<Image align="center" border={true} width="150% " src="https://files.readme.io/d643219-Customer.jpg" className="border" />

# Understanding data sources

In our system, a "Source" refers to the origin or system from which customer information is integrated. Each source represents a unique system, integration, or data feed.

Customers may be represented differently across various sources. For instance, a customer named "Christopher" in one source could appear as "Christo" in another. This discrepancy underscores the necessity for identity resolution to establish a unified and accurate view of the customer.

Data integration involves collecting information from different sources, including identifiers, subscription statuses, and email addresses. This process merges and creates a consolidated, reliable customer profile. When the system receives information from the same identifier already present but from a different source, it analyzes, [merges](https://docs.capillarytech.com/docs/manage-change-request#merge-accounts), and adds it to the existing customer profile under a different source.

On Member Care, within the customer profile, you can view all the sources from which the customer registered.

<Image align="center" border={true} width="35% " src="https://files.readme.io/afc70c0-Customer_source.png" className="border" />

## Supported data sources

The entity supports the following data sources:

1. Facebook
2. Web\_engage
3. WeChat
4. Instore
5. E-Commerce
6. Website
7. Line
8. Mobile-APp
9. Linkedin
10. Mpush-FCM
11. Mapp\_SDK
12. OAuth\_External

# Understanding communication channels

A "Communication Channel" represents the medium through which customers receive messages. Examples include SMS, push notifications, web engagement, and POS (Point of Sale) systems.\
Some sources may act as both a source and a communication channel. For instance, WeChat not only provides customer information but also serves as a communication channel. Communication channels can vary, and information may be collected from diverse sources. For instance, a customer's communication channel, such as WeChat, may exclusively come from the WeChat system. Overlapping scenarios may arise where the source and communication channel are the same, while in other cases, they can be different. The system is designed to handle these variations effectively.

## Supported communication channels

The entity supports the following communication channels:

1. WeChat
2. Mobile
3. iOS
4. Line
5. Email
6. WhatsApp
7. Android
8. Postmail

# Managing customer lifecycle with customer status

> **Important**
>
> When registering or importing customers, only the V2 API sets the customer status and status label fields to the organization-level defaultStatus. If you use the V1.1 API for registration or import, these fields remain NOT SET or N/A. To ensure customer status is assigned as expected, use the V2 API for member registration and import operations.

A customer status defines the relationship between a brand and a customer. For example, a customer who interacts often with the brand can be defined as an active customer. Further, these statuses can be used to run the loyalty program and assign coupons, reward points etc accordingly. For example, more offers can be offered to a customer to make an inactive customer to active customer..

## Activating customer status

To activate customer status for your organisation, navigate to **Organisation settings> Miscellaneous> Customer Status configuration** and select the  **Enable customer status** check box.

On enabling the customer status, the existing fraud status will be replaced by the customer status function.

## Types of customer statuses

The various customer statuses available in the Capillary platform that you can configure are:

1. Active
2. Suspended
3. Deleted
4. Fraud suspected
5. Fraud confirmed
6. Internal
7. Pending deletion

## Creating a custom label

You can click the **Create new label** option in the customer label and enter a new label name to assign a custom name for the status. You can add multiple labels if required. The first status label that you create is set as the default status value.

<Image align="center" border={true} src="https://files.readme.io/e70b5ed-H3fEa_kClhg1C9buCL58znQ3t4tvnHcb2g.png" className="border" />

## Active customer status

The active status can be used to indicate that the customer is active.

> 📘 NOTES:
>
> * There are no restrictions for customers with Active status.
> * All customers are marked Active by default.

## Suspended, Fraud suspected, Fraud confirmed, and Internal customer status

You can restrict the following operations for users with Suspended, Fraud Suspected, Fraud Confirmed, or Internal status.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Restriction
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Block communications
      </td>

      <td>
        When block communication is active for a customer's status label, all outbound messages are suppressed. This includes transactional messages, promotional messages, OTPs, goodwill notifications, and subscription notifications. There is no exception by message type. Block communication operates independently of a customer's subscription preferences. A customer can be opted in to all channels and still have all communications suppressed if their status label has block communication enabled. For the list of APIs on which communication will be blocked, see <Anchor label="here" target="_blank" href="https://docs.capillarytech.com/docs/customer_entity#request-apis">here</Anchor>.
      </td>
    </tr>

    <tr>
      <td>
        Block coupons redemption
      </td>

      <td>
        Restrict from redeeming coupons.
      </td>
    </tr>

    <tr>
      <td>
        Block issual of loyalty promotions
      </td>

      <td>
        Restrict from receiving points.
      </td>
    </tr>

    <tr>
      <td>
        Block identifier change and account merge
      </td>

      <td>
        Restrict from account merging and identifier change requests.
      </td>
    </tr>

    <tr>
      <td>
        Block issual of badges
      </td>

      <td>
        This is a future development feature.
      </td>
    </tr>

    <tr>
      <td>
        Block issual of coupons
      </td>

      <td>
        Restrict from providing coupons.
      </td>
    </tr>

    <tr>
      <td>
        Block enrollment into loyalty promotions
      </td>

      <td>
        This is a future development feature.
      </td>
    </tr>

    <tr>
      <td>
        Block points allocation
      </td>

      <td>
        Restrict from providing points.

        When this restriction is added on any label, then the points allocation from any points-related action (like transaction point allocation, allocation points, target point allocation, issue to the referrer, issue to referee, goodwill points, import profile) will be blocked for the customer.
      </td>
    </tr>

    <tr>
      <td>
        Block points redemption
      </td>

      <td>
        Restrict from redeeming points.
      </td>
    </tr>

    <tr>
      <td>
        Block tier upgrade
      </td>

      <td>
        Restrict from tier upgrade.
      </td>
    </tr>

    <tr>
      <td>
        Block transaction
      </td>

      <td>
        Restrict future transactions.
      </td>
    </tr>

    <tr>
      <td>
        Mark transaction outlier
      </td>

      <td>
        Mark the transactions made by the selected label(s) as outliers.
      </td>
    </tr>
  </tbody>
</Table>

To restrict access, select the individual status labels or all the created status labels from the desired restriction drop-down. Click **Select**, and then click **Update**.

<Image align="center" border={true} src="https://files.readme.io/ccef7e2-lb5ZVDRSQL_JkADaNE0G9ONiVhqtT0GynQ.png" className="border" />

## Request APIs

* `POST /v1.1/request/add` — change mobile SMS, change email, goodwill SMS/email
* `POST /v1.1/request/approve` — same, on approval
* `POST /v2/customer/{customerId}/changeRequest` — change mobile SMS, change email
* `PUT /v2/changeRequest/{id}` — change identifier approval
* `POST /v2/customer/{customerId}/goodwillRequest` — goodwill SMS/email
* `PUT /v2/goodwillRequest/{id}` — goodwill approval

## Direct Communication APIs

* `POST /v1.1/communications/email`
* `POST /v1.1/communications/sms`
* `POST /v2/communications/email`
* `POST /v2/communications/sendMessage`
* `POST /v2/communications/wechat`

## OTP APIs

* `POST /v2/otp/generate`
* `POST /v2/otp/validate`

## Subscription API

* `POST /v2/internal/subscription/configuration`

## Deleted customer status

The deleted status allows you to block every action for customers with this status. To configure restriction, from the **Block everything** drop-down, select the individual custom labels or select all labels created for Deleted. Click **Select** and then click **Update**.

<Image align="center" border={true} width="35% " src="https://files.readme.io/a198377-Delete_customer_status.png" className="border" />

<Callout icon="🚧" theme="warn">
  **Deleted status and PII deletion**

  If `CONF_ENABLE_PII_DELETION` is enabled for your organization, you cannot change a customer's status to Deleted using the standard status update API or the Membercare status-change UI. Attempting to do so returns error code `UPDATECUSTOMERSTATUS_1032` with the message: "Customer update with pending deletion or deleted status not allowed."

  When PII deletion is enabled, the Deleted status is a reserved system state. The platform sets it automatically only after a PII deletion request is raised and approved through the proper flow.

  To move a customer to Deleted status, use the PII deletion flow:

  1. In Membercare, open the customer's profile and click the three-dots menu.
  2. From the ID change request dropdown, select **Delete member's account** and submit the request.
  3. A user with approver access must approve the request.

  Once approved, the customer's status moves to Pending Deletion, and then to Deleted after the configured waiting period lapses.

  For full details, see [Performing Data Deletion](https://docs.capillarytech.com/docs/performing-data-deletion).
</Callout>

## Pending deletion customer status

This status is used to indicate the status of customers for whom a deletion request is raised. For **Pending Deletion**, whenever a PII deletion request is triggered, a label Deletion\_pending is automatically created and assigned to the customer, regardless of any other label that may have been created and set as default.

# Managing subscription

A subscription refers to the voluntary action taken by customers to either opt in or opt out of receiving promotional or transactional communications from specific sources within the organization.

You can configure the promotional and transactional subscription settings for a customer according to their preferences. For more information, refer to the [Subscription management](https://docs.capillarytech.com/docs/subscription_management) documentation.

You can also view and set the subscription statuses on the customer's profile on [Member Care](https://docs.capillarytech.com/docs/customer_overview#subscription-status).

# Managing loyalty status

A customer can be of two types: a loyalty customer and a non-loyalty customer. A loyalty customer is a registered member of your organization's loyalty program, while non-loyalty customers are those who have not enrolled in your loyalty program but have subscribed using their mobile number or email ID with the organization. Transactions for these customers are tagged to their respective identifiers (mobile number/email ID).

You can define the loyalty type of a customer during <Anchor label="customer registration" target="_blank" href="https://docs.capillarytech.com/reference/v2-add-customer#/">customer registration</Anchor> or while [adding a transaction](https://docs.capillarytech.com/reference/add-transaction-single).

The loyalty status of a customer is displayed on the [Customer status](https://docs.capillarytech.com/docs/customer_overview#customer-status-and-name) in the customer's Member Care profile.

# Managing test and control status

The customer list is split into a test and control group. Customers in the test audience group receive campaign communications, while those in the control audience group do not. The test and control statuses are displayed based on the group to which they belong. These statuses are maintained by the brands or auto-assigned and can be changed either through  [Member Care](https://docs.capillarytech.com/docs/customer_overview#customer-status-and-name) or [Connect+](https://docs.capillarytech.com/docs/test_and_control).

# Managing fraud status

You can configure the fraud management and the statuses as per your requirements. For more information on fraud management, refer to the [Fraud management documentation](https://docs.capillarytech.com/docs/fraud-detection).

> 📘 Note
>
> If customer status is enabled, the fraud status will be superseded by the customer status.

# Getting started

## Setup customer fields

Standard fields, Extended fields and Custom fields are the fields that are applicable for Customer entity. For more information on these, refer to the [documentation on fields](https://docs.capillarytech.com/docs/data-fields).

## Setup customer configs

> **Note**
>
> The customer status and status label fields are set to the org-level defaultStatus only when you use the V2 API for customer registration or import. If you use the V1.1 API, these fields are not set and remain as NOT SET or N/A. Use the V2 API to ensure status assignment during registration.

To configure customer registration, follow these steps.

1. On the InTouch home page, navigate to **Profile > Organization Settings > Miscellaneous > Registration Configuration**.
2. Configure the required fields based on the description provided in the following table.

<br />

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        OPTION
      </th>

      <th>
        DESCRIPTION
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        CONF_REGISTRATION_PRIMARY_KEY
      </td>

      <td>
        Choose the primary identifier of the customer. This is the unique identifier of the customer required for registration.
      </td>
    </tr>

    <tr>
      <td>
        CONF_ALLOW_REGISTRATION_FROM_ANY_IDENTIFIERS
      </td>

      <td>
        Select this to allow the registration of customers using any of the identifiers.
      </td>
    </tr>

    <tr>
      <td>
        CONF_USERS_IS_EMAIL_REQUIRED
      </td>

      <td>
        Check this if email id is a mandatory parameter to register a customer.
      </td>
    </tr>

    <tr>
      <td>
        CONF_USERS_IS_EMAIL_UNIQUE
      </td>

      <td>
        Check this to make the email ID a unique identifier. If any registered email ID is registered the accounts will be merged automatically.
      </td>
    </tr>

    <tr>
      <td>
        CONF_USERS_USE_EXTERNAL_ID
      </td>

      <td>
        Check this to capture the external ID of customers while registering.
      </td>
    </tr>

    <tr>
      <td>
        CONF_USERS_IS_EXTERNAL_ID_REQUIRED
      </td>

      <td>
        Check this to make the external ID mandatory to register a customer. Not applicable if the external ID is the primary identifier.
      </td>
    </tr>

    <tr>
      <td>
        CONF_USERS_IS_MOBILE_REQUIRED
      </td>

      <td>
        Check this to make the mobile number mandatory to register a customer. Not applicable if mobile is the primary identifier.
      </td>
    </tr>

    <tr>
      <td>
        CONF_ALLOW_MOBILE_UPDATE
      </td>

      <td>
        Check this to allow updating registered mobile numbers of customers.
      </td>
    </tr>

    <tr>
      <td>
        CONF_ALLOW_EMAIL_UPDATE
      </td>

      <td>
        Check this to allow updating registered email IDs of customers.
      </td>
    </tr>

    <tr>
      <td>
        CONF_LOYALTY_ALLOW_EXTERNAL_ID_UPDATE
      </td>

      <td>
        Check this to allow updating registered external IDs of customers.
      </td>
    </tr>

    <tr>
      <td>
        CONF_PRIMARY_IDENTIFIER_STRICT_CHECK
      </td>

      <td>
        Check this to verify if the primary identifier is already registered in a different account. An error message will be displayed that the secondary identifier match is found in a different account but not the primary identifier.
      </td>
    </tr>

    <tr>
      <td>
        CONF_SKIP_SECONDARY_ID_ON_PRIMARY_MISMATCH
      </td>

      <td>
        Check this to skip account merging if only secondary identifiers match but primary identifiers are different. A new customer will be created with the provided primary identifier. The secondary identifier will be ignored automatically.
      </td>
    </tr>

    <tr>
      <td>
        USE_CRM_REGISTRATION_INFO_FROM_BASE_STORE
      </td>

      <td>
        NA
      </td>
    </tr>

    <tr>
      <td>
        CONF_GIFT_CARD_ENABLED
      </td>

      <td>
        Check this to enable gift card
      </td>
    </tr>

    <tr>
      <td>
        CONF_ORG_CURRENCY_CODE
      </td>

      <td>
        Set the ISO currency code of the org.
      </td>
    </tr>

    <tr>
      <td>
        CONF_ORG_CURRENCY_SYMBOL
      </td>

      <td>
        Set the currency symbol of the org as per the currency code.
      </td>
    </tr>

    <tr>
      <td>
        CONF_MIN_REGISTRATION_DATE
      </td>

      <td>
        Set the minimum date and time from which the registration is valid. Registration fails if the registration date and time is prior to the value set herein ( especially through API or Data Import).
      </td>
    </tr>

    <tr>
      <td>
        SERVER_VALIDATION_PIN_SMS
      </td>

      <td>
        Configure the verification SMS that will be sent to customers to validate the registered mobile numbers. Use the tag \{\{pin}} to insert the verification PIN in the message. For example, Please use the code \{\{pin}} to verify your mobile number.
      </td>
    </tr>

    <tr>
      <td>
        SERVER_VALIDATION_PIN_EMAIL
      </td>

      <td>
        Configure the verification email that will be sent to customers to validate the registered email ID. Use the tag \{\{pin}} to insert the verification PIN in the message. For example, Please use the code \{\{pin}} to verify your email ID.
      </td>
    </tr>

    <tr>
      <td>
        CONF_LOYALTY_REGISTER_CUSTOMER_GENDER
      </td>

      <td>
        Choose the custom field for gender from the drop-down.
      </td>
    </tr>

    <tr>
      <td>
        CONF_LOYALTY_REGISTER_CUSTOMER_AGE
      </td>

      <td>
        Choose the custom field for age from the drop-down.
      </td>
    </tr>

    <tr>
      <td>
        CONF_CLIENT_V2_API_ENABLED
      </td>

      <td>
        Check this if sources other than InStore are supported for the org.
      </td>
    </tr>

    <tr>
      <td>
        CONF_GEN_CARD_NUMBER_AS_EXTERNAL_ID_ENABLED
      </td>

      <td>
        Check this to enable generating external IDs automatically from the Capillary end.
      </td>
    </tr>

    <tr>
      <td>
        SOURCE_ACCOUNTS_EXTERNALID_ENABLED
      </td>

      <td>
        Check this to enable support for external ID capture.
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_NUMBER_GENERATION_ENABLED
      </td>

      <td>
        Check this to enable generating card numbers automatically from the Capillary end.
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_NUMBER_SUFFIX
      </td>

      <td>
        Specify the suffix you want to have for the external card (supports alphanumeric value).
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_NUMBER_PREFIX
      </td>

      <td>
        Specify the prefix for the external card (supports alphanumeric value). For example, BRAND20.
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_NUMBER_LENGTH
      </td>

      <td>
        Specify the length of the external card. You can have up to 50 characters.
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_NUMBER_OFFSET
      </td>

      <td>
        Specify the card sequence numbers that you want to ignore from the top. For example, if you set 10, the first 10 cards will be considered invalid.
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        Check this to enable primary identifier checks when registering or updating customers.
      </td>
    </tr>

    <tr>
      <td>
        CONF_IDENTIFIERS_SYNC_ENABLED
      </td>

      <td>
        Check this to synchronize identifiers such as mobile numbers, email addresses, and external IDs between Instore profiles and V2 profiles (external profiles such as WebEngage)  within the system.

        * _-_*  When the identifier change request is made from Membercare, any changes to identifiers (mobile/email, externalId) will update both the Instore profile and the corresponding V2 profile identifiers.
        * *Note: **The Customer Unique Identifier (CUID) will not change in V2 profiles if this identifier exists.
        * *- ** To make changes to the external profile CUID, the following steps are performed after the identifier change request on Membercare:
        * -Creation of a new payload with updated identifiers and pushing it to an S3 bucket. --Execution of` v2/integrations/customer/upsert API` with the source set to `WEB_ENGAGE `and the new payload.  The upsert API ensures that the changes are reflected in all instances of the profile, including updating the CUID and communication channels.
          * *Default value: **False.
      </td>
    </tr>

    <tr>
      <td>
        -CONF_CLIENT_DEFAULT_COUNTRYCODE_PASSED
      </td>

      <td>
        Check this to auto select country code to the mobile number entered on the registration screen. The validation sequence will be as follows.  
        validates initial letters of mobile numbers for base or supported currency codes. inserts each country code and validates the number. First with base country code, followed by supported country codes.
      </td>
    </tr>
  </tbody>
</Table>

### Mobile number validation

The platform validates mobile numbers based on the country configured during registration.

**India**: If the selected country is India, the system accepts only valid Indian mobile numbers. A valid number must follow one of these rules:

* 10 digits and starts with 6, 7, 8, or 9
* 12 digits and starts with 91

If you enter 10 digits, the system automatically prefixes 91 and validates again.

**India and Other**: If the supported country list includes India and Other, the validation follows a two-step sequence:

* Validate using Indian rules
* If India rules fail, apply generic international rules

**Generic international rules:**

* Number must start with 1–9
* Number must be 9 to 15 digits long

This allows international numbers only when the number does not meet Indian validation rules.

**Important:**

* If you disable mobile number validation, the system still enforces mobile number length checks when a base country is configured. Disabling validation does not bypass length validation. The system checks that the mobile number matches the expected length for the configured country.
* You can use the append country config to automatically add the country code to mobile numbers during import. When enabled, this configuration appends the appropriate country code to numbers that do not already include it, based on the base country or supported country list. This helps ensure that imported numbers meet length and format requirements.

# External ID configuration

You can use the below configurations to enable the generation of a customised external ID for customers. Once this configuration is enabled, the external ID in the customer add API payload will be replaced with the generated external ID.

> **Important**
>
> The system strictly enforces both the prefix and length for External IDs during customer import and API operations. These requirements are set in Org Settings > Registration. Only External IDs that match the configured prefix (for example, LM\*) and the exact length (for example, 10 digits) are accepted. If an External ID does not meet these requirements, the system rejects the record during both import and API workflows. Rejected records are not processed, which can impact event processing and eligibility updates for those customers. Ensure that all External IDs, whether imported or submitted via API, meet the required prefix and length to avoid data loss or processing failures.

> **Failure scenarios**
>
> External ID generation may fail in the following cases:
>
> * If all possible candidate external IDs within the allowed retry limit are already assigned to existing customers, the system cannot generate a new unique external ID. In this case, the registration fails and the customer profile is not created.
> * If the highest external ID in the database does not match the configured prefix or suffix, the system may not be able to increment the counter correctly. This can cause the external ID generation process to skip updating the internal counter, resulting in missing external IDs for new registrations.
>
> These failures can prevent new customer registrations and may cause downstream integration issues. To avoid these problems, regularly review your external ID configuration, including prefix, suffix, and length, and ensure that the available ID range is sufficient for your expected registration volume.

> ❗️ Attention
>
> There is no UI to enable this configuration. You need to raise a JIRA ticket ([sample ticket](https://capillarytech.atlassian.net/browse/CAP-97635)) to the sustenance team to enable these configurations. Turn around time is five days.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Configuration & Description
      </th>

      <th>
        Value
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        CONF_CARD_NUMBER_GENERATION_ENABLED (Mandatory) Enables external ID number generation.
      </td>

      <td>
        0 - Disable 1 - Enable
      </td>
    </tr>

    <tr>
      <td>
        SOURCE_ACCOUNTS_EXTERNALID_ENABLED (Mandatory) Enables external ID generation only for the defined source account in the Customer ADD API.
      </td>

      <td>
        ["INSTORE:"] -  Instore

        ["web_engage:1234"]["web_engage:1234"] - Webengage where 1234 is the account id

        ["INSTORE:", "web_engage:1234"]["INSTORE:", "web_engage:1234"]  -  Both Instore and webengage where 1234 is account id.
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_CHECKSUM_DIGIT_ALGO (Mandatory)  
        Defines the algorithm to generate the checksum. The checksum is added as the last digit of the external ID.
      </td>

      <td>
        LUHN_ALGO (MOD10), MOD7_ALGO, AUTO_INC, RANDOM, RANDOM_LUHN, RANDOM_MOD7
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_NUMBER_LENGTH (Mandatory)  
        Defines the external ID length. This is the total length of the external id including prefix, suffix, and checksum.

        Example: If card number length = 12, Prefix = 1234, Suffix = 3401, Offset = 3000, and algorithm = AUTO_INC, then card number can be 123430003401.  
        **Note:** Suffix is not applicable for MOD7 and LUHN_ALGO (MOD10) algorithms.
      </td>

      <td>
        Integers ranging from 1-50.
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_NUMBER_OFFSET (Optional)  
        Defines the offset value for the external ID. For example for a card number series with offset value 3000, can be 111200000030004, 111200000030015 etc.
      </td>

      <td>
        Any integer value
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_NUMBER_PREFIX  (Optional)  
        Defines the prefix for the external ID number.
      </td>

      <td>
        Any integer value but prefix + suffix + system-generated number should not be more than 50.
      </td>
    </tr>

    <tr>
      <td>
        CONF_CARD_NUMBER_SUFFIX  (Optional)  
        Defines the SUFFIX for the external ID number. This is only applicable for AUTO_INC alogrithm.
      </td>

      <td>
        Any integer value but prefix + suffix + system-generated number should not be more than 50.
      </td>
    </tr>

    <tr>
      <td>
        CONF_VALUES_TO_INCLUDE_FOR_CHECKSUM_DIGIT  (Optional)  
        Specifies whether the prefix should be considered when generating the checksum value.
      </td>

      <td>
        PREFIX - Prefix is considered  
        NONE - Prefix is not considered
      </td>
    </tr>
  </tbody>
</Table>

# Customer ingestion restriction configuration

> ❗️ Warning
>
> There is no UI to enable this configuration. You need to raise a JIRA ticket ([sample ticket](https://capillarytech.atlassian.net/browse/CAP-97635)) to the sustenance team to enable these configurations. Turn around time is five days.

`CONF_RESTRICT_ORPHAN_V2_PROFILE` - This configuration prevents the ingestion of a WebEngage profile into the Capillary platform for a specific customer if they do not already have an existing Instore profile.

## Setup customer status

For configuring customer status, refer to the [Activating customer status section](https://docs.capillarytech.com/docs/customer_entity#activating-customer-status).

# Dual eligibility

The Dual Eligibility feature allows you to register multiple users with the same secondary identifiers. When the Dual Eligibility feature is enabled, only one identifier is considered the primary identifier and the rest of the identifiers are considered for communication. The primary identifier for both of these profiles must be unique.

**Example:** Consider a brand user who is registered on the platform using Email <abc@example.com>, Mobile 123-456-7890 (primary identifier), and External ID ABC123. With the Dual Eligibility feature enabled, another user can be registered again using Email <abc@example.com> and External ID ABC124.

**Notes:**

* For the users registered with Dual Eligibility, the information about the user can be retrieved only using the primary identifier.

## Use Case

**User John**:

* Works for **Employer A** and registers on the employer’s healthcare App with:
  * **Email**: <john@example.com>
  * **Mobile**: 123-456-7890

**John’s Spouse, Jane**:

* Works for **Employer B** and registers her family on the healthcare App. During registration:
  * She adds John as a dependent using the **same email (<john@example.com>)** but a different **mobile number 456-123-123)**.

**Outcome**:

* Two **unique profiles** are created for John:
  * One is associated with **Employer A** (where John is the primary user).
  * Another is associated with **Employer B** (where John is a dependent under Jane’s profile).

## Enabling dual eligibility

To enable dual eligibility for an organization, create a JIRA ticket to the Product Support team and enable the configuration CONF\_INSTORE\_V2\_ENABLED.

In addition, make sure that the below configurations are configured as per the table:

| **Configuration Name**                                | **Configuration**              |
| ----------------------------------------------------- | ------------------------------ |
| **CONF\_REGISTRATION\_PRIMARY\_KEY**                  | External ID or mobile or email |
| **CONF\_REGISTRATION\_PRIMARY\_KEY\_REQUIRED**        | 1 - Enable                     |
| **CONF\_ALLOW\_REGISTRATION\_FROM\_ANY\_IDENTIFIERS** | 0 - Disable                    |
| **CONF\_USERS\_IS\_MOBILE\_REQUIRED**                 | 0 - Not required               |

## FAQs

**Q: Is dual eligibility applicable for both loyalty and non-loyalty users?**\
A: Dual eligibility is applicable only for Loyalty users.

**Q: Is it applicable to all types of orgs such as connected orgs, standard orgs, and Org Units?**\
A: The dual eligibility feature applies to all the orgs.

**Q: Can we migrate users with the same secondary identifiers and unique primary identifiers?**\
A: Yes. You can migrate.

**Q: What happens if I register a customer with the same primary identifier and other identifiers but a different source?**\
A: The customer gets merged, and on MemberCare, you will be able to see both registration sources.