---
updatedAt: 2026-07-31T13:22:30.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customer profiles

When you import data to the local database, you will see the list of errors, auto-corrections, and download report option. You can download the entire report. The following table provides the list of errors that could encounter while importing for the customer.

<Callout icon="📘" theme="info">
  Note

  For customers registered using dataimport,  External IDs will not be generated automatically.
</Callout>

## Error Description

To know about supported fields and template configuration for each profile, skip to the next section.

| Error                                                                                                                                     | Explanation                                                                                                                        |
| :---------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| When different users are linked with the email                                                                                            | Email is already present for some other registered user in the system                                                              |
| When an error on duplicate external id occurs                                                                                             | All records would be rejected                                                                                                      |
| When an error on duplicate value for mobile in the file occurs                                                                            | All records would be rejected                                                                                                      |
| When an error on duplicate value for external\_id in the file occurs                                                                      | All records would be rejected                                                                                                      |
| When an error on duplicate value for an email in the file occurs                                                                          | All records would be rejected                                                                                                      |
| When a different user is linked with the mobile                                                                                           | Mobile number is already registered for a different user in the system                                                             |
| When different mobile is linked with the users                                                                                            | Since the mobile number is not allowed to update though import, trying to update an existing mobile for a user leads to such error |
| Different external id linked to the user                                                                                                  | The external id already exists in our database or the external id is associated with a different user                              |
| Invalid Mobile Number                                                                                                                     | Check the pre-configured mobile regex for brand                                                                                    |
| When a different user gets linked with the external id, duplicate value for mobile in a file, duplicate value for an email in file occurs | External ID / Card number is already registered for a different user                                                               |
| Invalid email id                                                                                                                          | Deviation from standard Email regex                                                                                                |
| Deactivated user / Fraud User                                                                                                             | The user is inactive or marked as fraud (as per brand requirement)                                                                 |
| When customer name contains special characters                                                                                            | Customer Name should not contain any special characters other than alphabets/space                                                 |
| join\_date is invalid/null/void/of future date                                                                                            | Invalid join date                                                                                                                  |
| join\_store is invalid/null/void                                                                                                          | The store(s) specified in the file are not present in the system                                                                   |

## Card Import

Lets you import the historical data of customer’s card details

**Setup Import**
To set up the import, follow these steps.

* In Choose profile, select Card Import profile to create an import template.

![473](https://files.readme.io/ac7769b-setup_import.png "setup import.png")

* In Choose template, select template using the drop-down options. If no template available in the drop-down option, follow these steps
  * In Create new template, enable the checkbox to create a new template.
  * In Name of the template, enter the name of the template.
* Click Submit.

**Template Configuration**
To configure the template, follow these steps.

* In **Choose customer's unique identifier**, select customer identifier that is present in the CSV file - *mobile, email, external id, user id.*
* In **Link user**, enable the option to tag the customer.
* Click **Submit.**

**Configure Field Mapping**
The following are the fields to map with the CSV headers(column names).

| Field                                   | Description                                                                                                                                     |
| :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| Card Number(Number) \*                  | The unique number of the card as per the card series configuration.                                                                             |
| Card Series Code(Series Code) \*        | The unique code (supports up to 50 characters) for the card series. Only alpha-numeric is allowed.                                              |
| Card Status Label(Status Label) \*      | Current user-defined status of the card. Check your user-defined values for the system values (not issued, active, inactive, deleted, expired). |
| Till IUN Or Store Ext Id(Store Code) \* | The unique identifier of the Till or store which is tagged to the card series.                                                                  |
| User Id                                 | The unique code to identify the customer to whom the card is allotted.                                                                          |
| Mobile                                  | The mobile number of the customer to whom the card is allotted.                                                                                 |
| External Id                             | The external ID of the customer.                                                                                                                |
| Email                                   | Email address of the customer to whom the card is allotted.                                                                                     |
| Card External ID(Card External Id)      | This is the external reference ID of a card provided by the Org.                                                                                |

Note: \* Mandatory field.

**CSV Sample:**

Card Number,Card Series Code,Card Status Label,Till IUN,Mobile,Email,External Id,User Id,Card External ID

GOLDPHY2TT12311,GOLDPHY2,NOT\_ISSUED,1234,8765433279,<xyz@abc.com>,WA8765433279,1234234,E34334

## Card Series Import

Lets you create new card series for the organization or organization units. For example, value cards, premium cards, digital cards, physical cards, and many more cards.

Card series stores information such as card series name, the procedure to create card numbers for the card series, card expiry date or time period, and more.

The following are a few more information stored on the card series.

* Card series name
* Card series code
* Card number generation configurations
* Card expiry configuration

To auto-generate the card for the series set the Card Generation Enabled field value - true.

**Setup Import**
To set up the import, follow these steps.

* In Choose profile, select Card Series Import profile to create an import template.

![508](https://files.readme.io/cbf5247-import.png "import.png")

* In Choose template, select template using the drop-down options. If no template available in the drop-down option, follow these steps
  * In Create new template, enable the checkbox to create a new template.
  * In Name of the template, enter the name of the template.
* Click Submit.

Template Configuration
To configure the template, follow these steps.

* In Select fields to be Update, add or remove your preferred fields to update.

![503](https://files.readme.io/6a9d8fe-configure.png "configure.png")

* Click **Submit**.

**Configure Field Mapping**
The following are the fields to map with the CSV headers(column names).

| Field                                   | Description                                                                                                        |
| :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| Card Series Code(Series Code) \*        | Unique code (supports up to 50 characters) for the card series. Only alpha-numeric is allowed.                     |
| Expiry Days                             | Validity of the card series in the number of days from the issued date.                                            |
| Card Type \*                            | Type of the card. For example, PHYSICAL (for physical cards), DIGITAL (for digital or soft copies).                |
| Card Suffix                             | Ending characters of a card series.                                                                                |
| Card Prefix                             | Starting characters of a card series.                                                                              |
| Card Length                             | Length of the card series number. For example, on a credit or debit card you can see 16 digits of the card number. |
| Card Generation Enabled                 | Enter the value as true to auto-generate cards for the series, false to generate cards manually.                   |
| Till IUN Or Store Ext Id(Store Code) \* | Unique identifier of the Till or store which is tagged to the card series.                                         |
| Card Series Description(Description)    | Description of the card series.                                                                                    |

Note: \* Mandatory field.

**CSV Sample:**

Card Series Code,Card Series Description,Card Type,Card Generation Enabled,Card Suffix,Card Prefix,Card Length,Expiry Days,Till IUN

GOLDPHY2,Gold Card,PHYSICAL,true,2021,GOLD2,16,1000,1234

## Coupon Redemption

This profile allows you redeem coupons offline. To redeem coupons in bulk, create a CSV file with the following fields

* Voucher Series Id\*
* Voucher Code\*
* Store's External ID/ Store Terminal User Name\*
* User Identification Input\*
* Date of Redemption\*
* Transaction Number\*
* Transaction Amount
* CSV Sample:

Coupon Series Id(Voucher Series Id),Coupon Code(Voucher Code),Till IUN,User Identification Input,Redeemed Date,Transaction Number(Bill Number)
5309,7003008,mal1,919900111111,12/15/2016 15:06

#### Template Configuration

<Image src="https://files.readme.io/388f942-TemplateConfiguration.png" align="center" width="smart" border={true} />

| OPTION                                                 | DESCRIPTION                                                                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Disable existing data updation                         | Check this box to not allow updating existing details                                                                                |
| Denote stores by external ids                          | Check this box if the stores of the organization use store external ids as store codes                                               |
| Select fields to be updated                            | Add fields that you want to allow updating for the current profile template                                                          |
| Validate Transaction Number                            | Check this box to validate transaction numbers before saving to the database                                                         |
| Choose customers' unique identifier                    | Choose the unique identifier of the customer used at the organization                                                                |
| Do not check redemption range                          | Check this box to disable validating redemption date range                                                                           |
| Replace invalid voucher series id with                 | Choose the coupon series id that you want to replace with in place of invalid series ids identified in the import                    |
| Append country code to the mobile number automatically | Check this box to prefix the base country code of the org's base country wherever mobile numbers without country code are identified |

## Customer Status Import (Customer Status Update)

Lets you update customers' status labels.

> \[!IMPORTANT]
> **External ID validation:**
> When you update customer status using this import, the system strictly enforces the External ID prefix and length as configured in your organization settings. Only External IDs that match the required prefix and length are accepted. Records with External IDs that do not meet these requirements will be rejected.

The following are the supported fields for the profile.

* Customer identifier\* (user ID/email ID/external ID/mobile)
* Customer Status Label\* - New status label of the customer
* Till IUN Or Store Ext Id(Store Code)   - to associate with the update action.

**CSV Sample:**

Mobile,External ID,Status Label,StoreCode,

91982737437,Active,store.4683

**Setup Import**

To set up the import, follow these steps.

* In Choose profile, select Customer Status Import profile to create an import template

![588](https://files.readme.io/47ef9f7-setup.png "setup.png")

* In Choose template, select template using the drop-down options. If no template available in the drop-down option, follow these steps
  * In Create new template, enable the checkbox to create a new template.
  * In Name of the template, enter the name of the template.
* Click Submit.

**Template Configuration**
To configure the template, follow these steps.

* In Choose customers' unique identifier, select your preferred customer's identifier - \*Mobile, External ID, User ID, and Email.
*

![450](https://files.readme.io/86613bb-email.png "email.png")

* Click Submit.

**Configure Field Mapping**
The following are the fields to map with the CSV headers(column names).

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        User Id
      </td>

      <td>
        The unique code to identify the customer.
      </td>
    </tr>

    <tr>
      <td>
        Mobile
      </td>

      <td>
        The mobile number of the customer.
      </td>
    </tr>

    <tr>
      <td>
        External Id
      </td>

      <td>
        The external ID of the customer.
      </td>
    </tr>

    <tr>
      <td>
        Email
      </td>

      <td>
        The email address of the customer.
      </td>
    </tr>

    <tr>
      <td>
        Customer Status Label(Status Label)
      </td>

      <td>
        Current user-defined status label of the customer.
        Check user-defined values created for each standard status (Active, Suspended, Deleted, Fraud Suspected, Fraud Confirmed, and Internal).
        To know more, see create customer status labels.
      </td>
    </tr>

    <tr>
      <td>
        Till IUN Or Store Ext Id(Store Code)
      </td>

      <td>
        The unique identifier of the Till or store that is tagged to the customer.
      </td>
    </tr>
  </tbody>
</Table>

Note: \* Mandatory field.

## Entity Life Cycle

Lets you map customer registrations with the source registration events of the org such as WeChat Follow, and WeChat Register.

The following are the supported fields for the Entity Life Cycle profile.

* Entity Type\*
* Entity ID\*
* Org Source ID\*  (ID of the source through which the customer is registered)
* Activity\* (Activity for which the customer is registered)
* State\*
* Added by\*
* Reference ID\*
* Updated on\*

## Loyalty Customers

> \[!WARNING]
> **Possible missing external IDs:**
> When you import new customer profiles, external ID generation may fail if all candidate IDs (when automatic External ID generation runs, the system generates a candidate ID) within the retry limit are already present, or if the maximum external ID in the database does not match the required prefix or suffix. In these cases, new customers may be created without external IDs. This can cause downstream integration failures or missing customer records in connected systems. Always review import reports for missing external IDs and resolve any issues before relying on the imported data.

This profile is used to manage loyalty customers - add new customers or update existing customers' profiles. Apart from the standard fields specified below, you can also add custom field values and customer-level extended field values. The CSV file of loyalty customers should contain the following fields.

> **Note:** The Loyalty Customers import profile updates standard customer fields and custom fields. It does not update tracker values. To import tracker data, use the [Trackers import profile](https://docs.capillarytech.com/docs/other-import-profiles#trackers) instead. Note that the Trackers profile supports only `bill` and `lineitem` tracker types; importing with a `points` tracker type will fail with an "Invalid tracker type" error.

> \[!IMPORTANT]
> **External ID validation:**
> When you import loyalty customers, the system strictly enforces the External ID prefix and length as configured in your organization settings (Org Settings > Registration). Only External IDs that match the required prefix (for example, LM\*) and length (for example, 10 digits) are accepted. Records with External IDs that do not meet these requirements will be rejected during import.

* Mobile no./External id\* (Email id that represents unique customer identity)
* Store's External ID/ Store Terminal Username\*
* Registration date
* First Name
* Last Name
* Email ID\*
* Mobile No.\*
* Loyalty Points
* Lifetime Points
* Lifetime Purchases
* External ID\*
* Date of Joining
* Store Code\*
* Slab Name
* User ID\*\* (required to update existing customer profile)

**CSV Sample:**

First Name,Last Name,Mobile,Email,External Id,Till IUN Or Store Ext Id

Tom,Sawyer,9900111111,<tom.sawyer@capllary.com>,lb67p,mal

**Template Configuration**

![820](https://files.readme.io/d8fbb3e-submitttt.png "submitttt.png")

| Option                                                 | Description                                                                                                                           |
| :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Disable existing data updation                         | Check this box to not allow updating existing customer details                                                                        |
| Disable updation of custom fields with empty values    | Check this box to not allow updating custom field values with null values                                                             |
| Select fields to be updated                            | Add the fields that you want to allow updating for the current template                                                               |
| Replace invalid store names with                       | Choose the store that you want to replace with wherever invalid stores are identified                                                 |
| Append country code to the mobile number automatically | Check this box to prefix the base country code of the org's base country wherever mobile numbers without country code are identified. |
| Disable mobile number validation                       | Check this box to disable validating mobile numbers while registering customers (through the current import)                          |
| Disable email id validation                            | Check this box to disable validating email ids while registering customers (through the current import)                               |
| Denote stores by external ids                          | Check this box if the stores of the organization use store external ids as store codes                                                |
| Choose customers' unique identifier                    | Choose the unique identifier of the customer used at the organization                                                                 |

<Callout icon="📘" theme="info">
  ### Note

  If points ledger is enabled, the import process creates an OPENING_BALANCE entry for each imported customer. For non-loyalty customers without a valid CPS_ID, the system assigns cps_id = -1. Importing multiple non-loyalty customers can create duplicate (org_id, cps_id, entry_type, event_log_id) combinations, which causes a unique constraint violation. As a result, the import job fails with an ERR_IMPORT_POINTS_LEDGER_INSERT error.

  If you encounter this error, verify that the import file contains only valid loyalty customers when points ledger is enabled.
</Callout>

## User Subscription (Subscription Service New)

This profile is used to update the status of the subscription of customers for different channels. You can only use mobile numbers and email IDs that are registered in the org. Extended fields update also has Replay option - When an import job is failed to upload from the temporary database to the main database for some reason, the system retries to upload for up to three times, until successful upload. If the import fails even then, you have an option to manually retry in the import details using Click to Replay on the Import File Details page. This option is available for up to seven days.

<Callout icon="🚧" theme="warn">
  **Note**

  Updates made using the Subscription Service import template with `orgUnitId = -1` apply to non-InStore source profiles and do not update the InStore profile’s subscription status in the users table. The Members export template derives subscription data specifically from the InStore profile. As a result, when subscriptions are updated using `orgUnitId = -1`, the Members export may continue to display outdated or `NOT-SET` subscription values, even though the subscription was successfully updated for other profiles.
</Callout>

![1036](https://files.readme.io/ae88265-profit.png "profit.png")

**Template Configuration**

![273](https://files.readme.io/01d6804-subm.png "subm.png")

* In Select the user input type, select the unique identifier of customers used in the CSV file (MOBILE/EMAIL/ETERNAL ID/USER ID)
  For bulk subscription update, create a CSV file with the  following fields.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Account Name
      </td>

      <td>
        Required for channels with multiple accounts.
      </td>
    </tr>

    <tr>
      <td>
        Org Unit or Concept Code
      </td>

      <td>
        Concept code or org unit code for which you want to update subscription details.
      </td>
    </tr>

    <tr>
      <td>
        Comm Channel\*
      </td>

      <td>
        The communication channel for which you need to update customer subscription status.
        Supported values: line, mobile, email, whatsapp, ios, android, postmail, mobilePush
      </td>
    </tr>

    <tr>
      <td>
        Priority\*
      </td>

      <td>
        Type of message to update status.
        Supported values: TRANS, BULK
      </td>
    </tr>

    <tr>
      <td>
        Sub Status\*
      </td>

      <td>
        The new status of the channel.
        Supported values: OPTIN, OPTOUT
      </td>
    </tr>

    <tr>
      <td>
        Mobile\* \*
      </td>

      <td>
        Mobile number of the customer. This is required if  Select the user input type in _Template Configuration is Mobile._
      </td>
    </tr>

    <tr>
      <td>
        External ID\*\*
      </td>

      <td>
        External ID of the customer. This is required if  Select the user input type in Template Configuration is External_ID.
      </td>
    </tr>

    <tr>
      <td>
        User ID\*\*
      </td>

      <td>
        User ID of the customer. This is required if  Select the user input type in Template Configuration is User_ID.
      </td>
    </tr>

    <tr>
      <td>
        Email\*\*
      </td>

      <td>
        Email ID of the customer. This is required if  Select the user input type in Template Configuration is Email.
      </td>
    </tr>
  </tbody>
</Table>

**CSV Sample of Subscription to Trans SMS:**

Mobile,Subscription Status,Channel,Priority
9900111111,OPTIN,SMS,TRANS

**CSV Sample of subscription to bulk email**
Mobile,Subscription Status,Channel,Priority
9900111111,OPTIN,EMAIL,BULK

## Update Fraud Status

This profile lets you update the fraud status of customers.

> \[!IMPORTANT]
> **External ID validation:**
> When you update fraud status using this import, the system strictly enforces the External ID prefix and length as configured in your organization settings. Only External IDs that match the required prefix and length are accepted. Records with External IDs that do not meet these requirements will be rejected.

The CSV file should contain the following fields.

* Mobile no./External id/External ID/User ID\*
* Fraud status\* (Values: INTERNAL, MARKED, CONFIRMED, RECONFIRMED, NOT\_FRAUD)
* Fraud reason\*
* Store code\*

Any one customer identifier among the mobile number, email ID, external ID, or user ID is mandatory.

**CSV Sample to update fraud status**

Mobile,Status,Reason,StoreCode
9900111111,INTERNAL,Staff customer,store654

**Template configuration**

<Image src="https://files.readme.io/1142374-none.png" alt="450" align="center" border={true} />

| Option                           | Description                                                                                                 |
| :------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| Replace invalid store names with | Choose the store that you want to replace with instead of invalid stores.                                   |
| Denote stores by external ids    | Check this box if the stores of the organization use store external ids as store codes.                     |
| Select the user input type       | Choose the unique identifier used for the customer in the CSV file - MOBILE, EMAIL, EXTERNAL\_ID, USER\_ID. |

## V2 Profile Identifier Add/Update

This import profile is used to update V2 profiles of users. The V2 profiles represent user details specific to each communication channel or source of creation, example WebEngage, WhatsApp, WeChat.

> \[!IMPORTANT]
> **External ID validation:**
> When you update V2 profiles using this import, the system strictly enforces the External ID prefix and length as configured in your organization settings. Only External IDs that match the required prefix and length are accepted. Records with External IDs that do not meet these requirements will be rejected.

You use this when you need to update user profile information for one or more communication channels or when a user’s account information or communication channel has changed in the source system.

The template matches each incoming profile record to a corresponding user based on unique identifiers and updates the corresponding V2 profile entry with the latest data from the import file.

**CSV Sample**

```
User_ID,Source,Account_ID,Identifier_Type,Identifier_Value
575539069,MAPP_SDK,gpq-73812,cuid,6591394935
```

**Setup Import**

To set up the import, follow these steps.

1. In **Choose profile**, select the *V2 Profile Identifier Add/Update* profile from the drop-down list to create an import template.

<Image src="https://files.readme.io/7f4389144d304529a32f78bc39df01ed5a3bdb8cb55c63473a4f68682ad5c472-v.png" align="center" width="75% " border={true} />

2. In **Choose template,** select a template by using the drop-down list. If no template is available in the drop-down list, follow these steps.
   1. In **Create new template,** enable the checkbox to create a new template.
   2. In **Name of the template**, enter the name of the template.
3. Click **Submit**.

**Template Configuration**
To configure the template, follow these steps.

1. Click the checkbox next to **Allow updating existing identifier**.
2. (Optional) In the Store access group, the Admin (default) access group appears. Change the default access group for stores from API Access Settings.
3. Click **Submit.**

**Cancel File Import**
You can cancel or delete the file import by selecting the appropriate radio button.

**Configure Field Mapping**
To configure the mapping,

1. Map the following fields with the CSV headers.

| Field (Fields marked with an asterisk (\*) are mandatory) | Description                                                                                                                                                                                                            |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User ID(User Id)\*                                        | The unique code to identify the customer.                                                                                                                                                                              |
| Source(Source)\*                                          | The source where the customer was created.                                                                                                                                                                             |
| Account ID(Account Id) \*                                 | The unique account ID of the customer.                                                                                                                                                                                 |
| Identifier Type(Identifier Type) \*                       | The type of customer identifier.<br />The valid identifier types are: `wechat, martjackId, cuid, fbid, unionId, fcmToken, line.`<br />For WebEngage, use the cuid identifier type, which represents the mobile number. |
| Identifier Value(Identifier Value) \*                     | The value of the identifier                                                                                                                                                                                            |

2. Click **Submit**.

<br />