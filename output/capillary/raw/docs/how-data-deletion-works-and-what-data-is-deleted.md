---
updatedAt: 2026-08-12T11:40:20.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# How Data Deletion Works and What Data is Deleted

When data deletion is enabled, certain customer identifiers are handled automatically, while others require you to explicitly mark them as personally identifiable information. Once a field is marked, the same masking behaviour is applied consistently across Member Care and API responses.

# Understanding what data is deleted and retained

When a deletion request is executed, the system removes sensitive customer information while retaining certain non-personally identifiable information (non-PII) data.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Deleted data
      </th>

      <th>
        Non-deletion data
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        First name and last name
      </td>

      <td>
        User ID
      </td>
    </tr>

    <tr>
      <td>
        Identifiers such as mobile, e-mail, and external id
      </td>

      <td>
        Transactions (but transaction custom/extended fields can be configured to be deleted).  See

        <Anchor target="_blank" href="https://docs.capillarytech.com/docs/marking-custom-fields-extended-fields-as-psi-and-pii#classifying-custom--extended-fields-as-piipsi">Classifying custom field, extended field and payment attribute data as PII data</Anchor>
      </td>
    </tr>

    <tr>
      <td>
        Customer custom and extended fields. This is configurable. See

        <Anchor target="_blank" href="https://docs.capillarytech.com/docs/marking-custom-fields-extended-fields-as-psi-and-pii#classifying-custom--extended-fields-as-piipsi">Classifying custom field, extended field and payment attribute data as PII data</Anchor>
      </td>

      <td>
        Communications data
      </td>
    </tr>

    <tr>
      <td>
        Payment mode attributes against a transaction
      </td>

      <td>
        Payment mode (Card, UPI, BNPL) details used for the transaction. But the attributes can be deleted. See Configuring data that need not be deleted.
      </td>
    </tr>

    <tr>
      <td>
        V1 and V2 profile identifiers
      </td>

      <td>
        PII data in the promo engine or on the OTA (Over The Air) side
      </td>
    </tr>

    <tr>
      <td>
        V1 and V2 profile comm channels
      </td>

      <td>
        Coupons/promotions/gift vouchers and all benefits
      </td>
    </tr>

    <tr>
      <td>
        Identifiers/login details in the auth engine
      </td>

      <td>
        Behavioural events
      </td>
    </tr>

    <tr>
      <td>
        Card custom fields and card extended fields. See Configuring data that need not be deleted.
      </td>

      <td>
        Points data (will still be attributed to User ID)
      </td>
    </tr>

    <tr>
      <td>
        Search database (solr/ES)
      </td>

      <td>
        Supplementary and coalition memberships
      </td>
    </tr>

    <tr>
      <td>
        Identifier change logs
      </td>

      <td>
        Targets and Member care profiles -  If you have the profile URL, you can access the profile; however, the page displays a message indicating that the customer has been deleted.
      </td>
    </tr>

    <tr>
      <td>
        Identifiers that are kept in the change requests log are set to null
      </td>

      <td>
        User group dependencies and associations. Deleted customers remain part of groups/companies unless explicitly removed from groups (User ID remains)
      </td>
    </tr>

    <tr>
      <td>
        Customer data audit logs
      </td>

      <td>
        PII captured in leads data
      </td>
    </tr>

    <tr>
      <td>
        \_
      </td>

      <td>
        Any other details not mentioned under Deleted data.
      </td>
    </tr>
  </tbody>
</Table>

> 📘
>
> Note
>
> In Databricks, deleted customers must be explicitly excluded in queries to ensure accurate reporting.

## Actions blocked while a customer is in pending-deletion state

While a customer is in **pending-deletion** state (a PII deletion request has been raised but not yet completed), the platform blocks merges that involve that customer. This applies to both parties in a merge: the customer being merged and the survivor or target customer they would be merged into.

If either customer in a merge is in pending-deletion state, the request is rejected with error code `8109` (*"this action is not supported for customer having pending deletion state"*). This covers both the change-identifier merge flow and customer merge requests. Resolve or cancel the pending deletion before retrying the merge.

> **Note:** This check applies only when PII deletion is enabled for your organisation.

## PII deletion for accounts with merged victims

When a PII deletion request is approved for a survivor account, the system automatically deletes the PII data of all victim accounts previously merged into that survivor. You do not need to raise separate deletion requests for victim accounts.

As part of the same deletion job, the system does the following:

1. Identifies all victim accounts merged into the survivor, traversing the merge history recursively up to a depth of 10.
2. Triggers PII deletion for each victim account found, in addition to the survivor.
3. Releases the identifiers of all accounts in the chain: email, mobile number, last name, external ID, and other registered identifiers.

> **Note:** The system traverses the merge chain up to a maximum depth of 10. Accounts beyond depth 10 are not included in the deletion run.

### Configuration requirements for identifier release

Identifier release for victim accounts is controlled by two org-level configurations:

| Configuration                               | Type    | Description                                                                                                                                                                                                                             |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONF_VICTIM_IDENTIFIER_RELEASE_ENABLED`    | Boolean | Enables or disables the victim identifier release flow. When set to `false` (default), the system skips identifier release for victim accounts even when a PII deletion job runs. Must be set to `true` for identifiers to be released. |
| `CONF_VICTIM_IDENTIFIER_RELEASE_AFTER_DAYS` | Integer | Number of days after a successful merge before the system schedules identifier release. Applies only when `CONF_VICTIM_IDENTIFIER_RELEASE_ENABLED` is `true`. This value does not have any minimum or maximum value constraints.        |

> 📘
>
> Note
>
> Contact Capillary Support to enable `CONF_VICTIM_IDENTIFIER_RELEASE_ENABLED` for your organisation.

> 🚧
>
> Identifier release is not instantaneous, even at `CONF_VICTIM_IDENTIFIER_RELEASE_AFTER_DAYS = 0`
>
> Identifier release runs as part of the org's PII deletion cron job, not immediately after the merge. This cron picks up eligible requests and queues them for processing once daily, at a time configurable per organisation (default 1:00 AM, server time zone). If the merge completes before that day's scheduled run, identifiers are released the same day; if it completes after, release happens on the next day's run. So the release can take up to approximately 24 hours from the time of the merge.

### What gets deleted for victim accounts

[The same data categories deleted for a survivor account](https://docs.capillarytech.com/docs/how-data-deletion-works-and-what-data-is-deleted) are deleted for each victim account in the merge chain. Data not deleted for a survivor, such as transactions, points, behavioral events, and coupons, is also not deleted for victim accounts.