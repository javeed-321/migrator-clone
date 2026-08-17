---
updatedAt: 2026-03-04T09:47:14.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Overview of Data Masking

Data masking protects sensitive customer information by controlling what data is visible to different users and systems. [When enabled](https://docs.capillarytech.com/docs/introduction-datamasking#enabling-data-masking), Capillary replaces sensitive field values with masked characters in the Member Care UI, API responses, and the analytics platforms unless explicit access is granted.

This ensures that sensitive information is:

* Visible only to authorized users or API clients
* Protected from accidental or unnecessary exposure
* Handled in line with internal security and privacy requirements

### **Example**

A customer’s mobile number is stored in the system.

* A support user without permission sees the value as `******` in Member Care and in the API responses.
* An authorized user or API client sees the full mobile number on Member Care and in the API responses

# How data masking works

Capillary evaluates masking for each request based on:

* <Anchor label="Organisation level configuration" target="_blank" href="https://docs.capillarytech.com/docs/introduction-datamasking#enabling-data-masking-1">Organisation level configuration</Anchor>
* <Anchor label="Field-level sensitivity classification" target="_blank" href="https://docs.capillarytech.com/docs/marking-custom-fields-extended-fields-as-psi-and-pii">Field-level sensitivity classification</Anchor>
* Access permissions of the <Anchor label="user" target="_blank" href="https://docs.capillarytech.com/docs/managing-permissions">user</Anchor> or <Anchor label="API client" target="_blank" href="https://docs.capillarytech.com/docs/how-capillary-identifies-and-uses-psi-and-pii">API client</Anchor>

Once enabled, this configuration applies across:

* Member Care UI
* All APIs
* Analytics platform (Databricks)

# What data is masked

<Anchor label="When data masking is enabled" target="_blank" href="https://docs.capillarytech.com/docs/introduction-datamasking#enabling-data-masking">When data masking is enabled</Anchor>, certain customer identifiers are handled automatically, while others require you to explicitly <Anchor label="mark them as personally sensitive data" target="_blank" href="https://docs.capillarytech.com/docs/marking-custom-fields-extended-fields-as-psi-and-pii">mark them as personally sensitive data</Anchor>. Once a field is marked, the same masking behaviour is applied consistently across Member Care, API responses, and Databricks.

## Data masking in Member Care & APIs

| Data type                                                            | Masked by default | Requires explicit marking |
| :------------------------------------------------------------------- | :---------------- | :------------------------ |
| Core customer identifiers (first name, last name, and mobile, email) | Yes               | No                        |
| Identifiers under communication channel                              | Yes               | No                        |
| Customer profile custom fields                                       | No                | Yes (mark as PSI)         |
| Customer profile extended fields                                     | No                | Yes (mark as PSI)         |
| Behavioural event attributes                                         | No                | Yes (mark as PSI)         |

<Callout icon="📘" theme="info">
  **Note**

  External IDs are not masked. Card data, Transaction or billing data, and other data other than the mentioned above data are not masked.
</Callout>

## Data masking in Databricks

In Databricks, sensitive customer data is masked by default and displayed as asterisks (`*****`). Unmasked values are shown only when the user or job has been explicitly authorised to access sensitive data.

| Data category                                                                                                                                                                                                                      | Masked in Databricks  | Notes                                                    |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- | :------------------------------------------------------- |
| Core customer identifiers                                                                                                                                                                                                          | Yes                   | First name, last name, email, mobile number, external ID |
| Customer profile custom fields                                                                                                                                                                                                     | Yes, if marked as PSI | Must be explicitly marked to be masked                   |
| Customer profile extended fields                                                                                                                                                                                                   | Yes, if marked as PSI | Must be explicitly marked to be masked                   |
| <Anchor label="Read API tables" target="_blank" href="https://docs.capillarytech.com/docs/getting-started-databricks#read-api-databases">Read API tables</Anchor>                                                                  | Yes                   | Masking applies to PSI-marked fields                     |
| <Anchor label="History-tracking user dimension tables" target="_blank" href="https://docs.capillarytech.com/docs/getting-started-databricks#history-tracking-user-dimension-table">History-tracking user dimension tables</Anchor> | Yes                   | Applicable only to the USHC cluster                      |
| Card data                                                                                                                                                                                                                          | No                    | Not supported                                            |
| Transaction or billing data                                                                                                                                                                                                        | No                    | Not supported                                            |
| Behavioural event data                                                                                                                                                                                                             | No                    | Not masked in Databricks                                 |
| Any other non-customer data                                                                                                                                                                                                        | No                    | Not supported                                            |

# Impact of data masking on existing and new users

When data masking is enabled for an organisation, the behaviour is the same for both existing and new users. All classified sensitive data is masked by default unless the user has <Anchor label="access to sensitive data" target="_blank" href="https://docs.capillarytech.com/docs/managing-permissions">access to sensitive data</Anchor>. By deafult, PSI data masking is disabled

# Managing access to masked data

Capillary applies PSI masking differently for **Member Care users** and **API clients**.

| Access type                                   | What controls masking                       |
| :-------------------------------------------- | :------------------------------------------ |
| Access to sensitive data on Member Care       | Access to `VIEW_MASKED_DATA` permission set |
| Access to sensitive data in the API responses | API client with PSI permission              |

## PSI masking in Member Care

In Member Care, access to masked data is controlled by **<Anchor label="user access" target="_blank" href="https://docs.capillarytech.com/docs/new-user-management-overview">user access</Anchor>**.

### How it works

When data masking is enabled for the organization:

* Users **without access to** VIEW\_MASKED\_DATA permission set see masked values (`*****`) for masked fields.
* Users **access** see unmasked values.

## PSI masking for APIs

For APIs, data masking is controlled by <Anchor label="**API client permissions**, not user roles" target="_blank" href="https://docs.capillarytech.com/docs/api-client#creating-an-api-client-key-and-secret">**API client permissions**, not user roles</Anchor>.

### How it works

When PSI masking is enabled for the organization:

* API clients **without access to masked data** receive masked values for PSI-marked fields.
* API clients **with access** receive unmasked values.

<Callout icon="🚧" theme="warn">
  Data masking is not applicable for Basic Authentication. It is recommended to use OAuth.
</Callout>

# Enabling data masking

By default, data masking is disabled for all organizations. To enable, perform the following:

1. From Organization settings, navigate to **Organization Setup** -> **PII Configurations**.
2. To enable the PII deletion, select the **CONF\_PSI\_MASKING\_ENABLED** check box.

   <Image align="center" border={true} src="https://files.readme.io/83a458ec820e75e5fbe32439b2ecef066e0d76812737f2e6caa2ea031e2a0b04-image.png" className="border" />

**Behaviour**

* When **CONF\_PSI\_MASKING\_ENABLED = false**
  * Data masking is disabled.
  * All fields are returned unmasked,
* When **CONF\_PSI\_MASKING\_ENABLED = true**
  * Data masking is enabled.
  * Capillary evaluates masking for each request based on:
    * Default masked fields
    * <Anchor label="User permissions" target="_blank" href="https://docs.capillarytech.com/docs/managing-permissions">User permissions</Anchor>
    * <Anchor label="Custom and extended fields marked as sensitive" target="_blank" href="https://docs.capillarytech.com/docs/marking-custom-fields-extended-fields-as-psi-and-pii">Custom and extended fields marked as sensitive</Anchor>
    * <Anchor label="API client permissions" target="_blank" href="https://docs.capillarytech.com/docs/how-capillary-identifies-and-uses-psi-and-pii">API client permissions</Anchor>

Once enabled, this configuration applies across:

* Member Care UI
* All APIs
* Analytics platform (Databricks)

<br />