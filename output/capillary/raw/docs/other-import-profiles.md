---
updatedAt: 2026-05-26T09:25:03.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Other import profiles

## Trackers

Use the profile to add tracker details to the existing transactions of customers or user groups. Only 'bill' and 'lineitem' tracker types are supported for import. If you attempt to import tracker data with any other tracker type, such as 'POINTS', the import will fail with an 'Invalid tracker type' error.

The following table provides the list of fields supported for Trackers profile.

| FIELD NAME                         | DATA TYPE | DESCRIPTION                                             | VALIDATIONS                                                                             | Updatable? | Mandatory?                                     |
| :--------------------------------- | :-------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------------- | :--------- | :--------------------------------------------- |
| Mobile/Email/External ID/User ID\* | STRING    | Customer’s unique identifiers                           | Valid registered identifiers of the customer or the unique user id generated in InTouch | NO         | At least one identifier is mandatory           |
| Bill Number                        | STRING    | Bill Number for which tracker data needs to be imported | Valid transaction number of that customer                                               | NO         | If Identification of Bill is “Standard Fields” |
| Transaction Date                   | DATETIME  | Transaction date                                        | Valid transaction date of the provided transaction number                               | NO         | If Identification of Bill is “Standard Fields” |
| Store Code                         | STRING    | Store code on which the transaction is done             | Valid Store                                                                             | NO         | If Identification of Bill is “Standard Fields” |
| Loyalty Log Id                     | INT       | Email of the existing admin user                        | Should be a valid email id available in InTouch as an active admin user.                | NO         | If Identification of Bill is “Loyalty Log Id”  |
| Item Id                            | INT       | Lineitem Id                                             | Valid line-item id (should be tagged with the given transaction)                        | NO         | If tracker type is line-item                   |
| Tracked Value\*                    | DECIMAL   | Tracked Value                                           | No validation done for now                                                              | NO         | YES                                            |

Configuration Dependencies for Tracker Import

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Denote stores by external ids
      </th>

      <th>
        Indicates if the value provided in “store code” field has the external id of the store
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Replace invalid store names with
      </td>

      <td>
        Replaces invalid stores provided in “store code” field with the store selected in this config
      </td>
    </tr>

    <tr>
      <td>
        Append country code to the mobile number automatically
      </td>

      <td>
        Appends country code to the mobile numbers (Mobile) field automatically
      </td>
    </tr>

    <tr>
      <td>
        Identification of Bill(Transaction)
      </td>

      <td>
        Possible values “LOYALTY_LOG_ID” and “STANDARD_FIELDS”.

        * *LOYALTY_LOG_ID**: If this value is selected, then “Loyalty Log Id” will be mandatory, and the transaction is identified based on the loyalty log id
        * *STANDARD_FIELDS**: if this value is selected, then “bill number”, “store code” and “transaction date” will be mandatory, and the transaction is identified based on all these three fields
      </td>
    </tr>

    <tr>
      <td>
        Choose customers' unique identifier
      </td>

      <td>
        Set the unique identifier used for customers - MOBILE, EXTERNAL_ID, EMAIL, USER_ID.
      </td>
    </tr>

    <tr>
      <td>
        Tracker
      </td>

      <td>
        Choose the tracker for which you want to import data.  
        This config lists all the trackers created for that organization.
      </td>
    </tr>

    <tr>
      <td>
        User Group2 Enabled
      </td>

      <td>
        Check this option to import tracker details for group transactions.

        You will see an option to choose the identifier type to recognize the group - User Group2 Identifier Type.
      </td>
    </tr>

    <tr>
      <td>
        User Group2 Identifier Type
      </td>

      <td>
        Select the identifier for the group used in the CSV file. You can pass any of the following identifiers of the group.

        * GROUP_ID
        * EXTERNAL_ID
        * PRIMARY_USER_ID
        * PRIMARY_USER_MOBILE
        * PRIMARY_USER_EMAIL
        * PRIMARY_USER_EXTERNAL_ID
        * PRIMARY_USER_CARD_NO  
          You need to have the field that you select here in the CSV file and map it to the respective field.
      </td>
    </tr>
  </tbody>
</Table>

> 📘 Notes
>
> When importing customer transactions, trackers will not reflect transactions that are imported outside the tracker window. For example, if the tracker duration is between 1st January 2025 - 31st December 2025, imported transactions made before 1st January 2025 will be added to the tracker.

## Promotional Rewards

**Customer Promotion**

This profile lets you import customer level promotion programs.

* Mobile/Email/External ID/User ID/Card Number/Card External ID\*
* Till IUN Or Store Ext Id(Store Code)\*: Till or Store from which points are issued
* Points\* (to be issued)
* User Group2 Identifier (Fleet Group Identifier) : Identifier selected for the user group. Required for group import.

**Template Configuration**\
If you import multiple files using a specific template, all will have the same promotion identifier assigned to them.

* The identifier is retained as long as no changes are made to the template.
* When you make a change in the template and save, a new identifier is generated.

<Image alt="904" border={false} src="https://files.readme.io/1575112-AgYJY6CfA_HQizD-q9StoSU-BdS0B2d7lg.png" title="AgYJY6CfA_HQizD-q9StoSU-BdS0B2d7lg.png" />

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
        Choose customers' unique identifier
      </td>

      <td>
        Choose the unique identifier of the customer used at the organization.
      </td>
    </tr>

    <tr>
      <td>
        Append country code to the mobile number automatically
      </td>

      <td>
        Check this box to prefix the base country code of the org's base country wherever mobile numbers without country code are identified.
      </td>
    </tr>

    <tr>
      <td>
        Denote stores by external IDs
      </td>

      <td>
        Check if stores are denoted by store external ids.
      </td>
    </tr>

    <tr>
      <td>
        Replace invalid store names with
      </td>

      <td>
        Choose the store that you want to replace with in place of invalid stores identified in the import.
      </td>
    </tr>

    <tr>
      <td>
        Promotion name
      </td>

      <td>
        Enter the name of the promotion.

        **NOTE**: _The name you specify will store in the backend directly. Hence, when you fetch details, the system no longer appends the timestamp to promotion name (as earlier), but retains the name that you specified._
      </td>
    </tr>

    <tr>
      <td>
        All programs for the org
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        Select the expiry strategy for points expiry
      </td>

      <td>
        Choose the desired points expiry strategy for the points issued through the current template.
      </td>
    </tr>

    <tr>
      <td>
        User group2 enabled
      </td>

      <td>
        Check this option if you want to issue points to user groups and not individual.  
        You will see User Group2 Identifier Type. Choose the appropriate group identifier type that you used in the CSV.
      </td>
    </tr>

    <tr>
      <td>
        Set user defined promotion identifier
      </td>

      <td>
        Check this if you want to use an external identifier for the promotion and enter the identifier in the text box that appears.

        * When you provide a  new identifier, a new promotion is created with the given identifier and name.
        * When you provide an existing identifier, points will be awarded under the existing promotion.  
          **NOTE**: _Ensure you provide the same promotion name when using existing promotion identifier. If there is a mismatch, the system will throw an error._
      </td>
    </tr>
  </tbody>
</Table>