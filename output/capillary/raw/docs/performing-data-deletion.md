---
updatedAt: 2026-07-03T13:25:04.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Performing Data Deletion

At a high level, enabling PII deletion involves:

* Verifying prerequisites such as customer status configuration and PII classification.
* Enabling and configuring PII deletion settings at the organization level.
* Creating and submitting PII deletion requests through Member Care or APIs.
* Approving the request

Once configured, Capillary processes deletion requests automatically based on the defined waiting period and approval workflow.

<Callout icon="👍" theme="okay">
  ###

  Data Deletion in Connected Organizations

  In a connected organization setup, the PII deletion is always initiated from the parent organization, and the data gets deleted from both the parent and child organizations. However, the PII configuration is maintained separately. For the child organisation, the PII configuration should be set at the child level.
</Callout>

<Image src="https://files.readme.io/c669af0-PII.jpg" align="center" border={true} />

## Step 1: Make sure the following prerequisites are met

1. Enable customer status. See <Anchor target="_blank" href="https://docs.capillarytech.com/docs/customer_entity#activating-customer-status">Enable customer status</Anchor>.

<Image src="https://files.readme.io/8f013a2-Enable_customer_status.png" align="center" border={true} />

2. Make sure that a label is created for each customer status. For more information on customer status labels, see [Create customer status label](https://docs.capillarytech.com/docs/customer_entity#creating-a-custom-label).
   <Callout icon="📘" theme="info">
     ###

     For Pending Deletion, the platform creates a deletion\_pending status automatically and assigns it whenever a deletion request is raised. The platform does not use any label that you created against the Pending Deletion status.
   </Callout>
3. Configure PII deletion. See <Anchor target="_blank" href="https://docs.capillarytech.com/docs/performing-data-deletion#step-2-define-pii-deletion-configurations-as-required">Configuring PII deletion</Anchor>.
4. If required, select and mark the required extended field, custom field and payment mode attributes as PII data. See [Classifying custom field, extended field, and payment attribute as PII data](https://docs.capillarytech.com/docs/marking-custom-fields-extended-fields-as-psi-and-pii#classifying-custom--extended-fields-as-piipsi).

## Step 2: Define PII deletion configurations as required.

To enable and configure the PII deletion

1. From Organisation settings, navigate to **Organization Setup** -> **PII Configurations**.
2. To enable the PII deletion, select the **CONF\_ENABLE\_PII\_DELETION** check box.

<Image src="https://files.readme.io/5cc0ebb-Enable_delete_PII.png" align="center" border={true} />

<Callout icon="📘" theme="info">
  ###

  **Effect on standard status updates**

  Once `CONF_ENABLE_PII_DELETION` is enabled, the Deleted customer status becomes a reserved system state. Users can no longer change a customer's status to Deleted through the standard status-change UI in Membercare or via the status update API. Any such attempt returns error `UPDATECUSTOMERSTATUS_1032`.

  From this point, the only way to delete a customer is through the PII deletion request flow described in Steps 3 and 4 below.
</Callout>

3. To set the number of days after which the data is deleted (deletion waiting period), enter the number in the **CONF\_PII\_DATA\_DELETE\_AFTER\_DAYS** field. You can enter any value between 0-90.

   <Callout icon="📘" theme="info">
     ### Note

     If the waiting period is set to 0 days, the system deletes the data on the same day that you raised the requests and approves if approval workflow is involved. For example, if a customer raises a deletion request at 1400 hrs, the system processes deletion at midnight on the same day depending on the time zone of the cluster the org belongs to on the Capillary platform.
   </Callout>
4. Click **Submit**.

## Step 3: Create a deletion request

A PII deletion request can be performed from the Member Care, refer to [the documentation on user deletion from Member Care](https://docs.capillarytech.com/docs/manage-id-change_requests#delete-member-account).
For more information on the PII deletion APIs, see [Add deletion request API documentation](https://docs.capillarytech.com/reference/add-a-pii-deletion-request).

<Callout icon="📘" theme="info">
  ### Note

  When you initiate PII deletion through Connect+, the system checks records in both the Users table and the Loyalty table. Users who exist only in the Users table and do not have a corresponding record in the Loyalty table fail this check. For such users, use Identifier Cleanup via Import instead. Identifier Cleanup does not check the Loyalty table, so the deletion succeeds in cases where standard PII deletion fails.
</Callout>

## Step 4: (for approvers) Approve the PII deletion request from Membercare

For information on approving member account deletion requests from Membercare, refer to <Anchor target="_blank" href="https://docs.capillarytech.com/docs/manage-id-change_requests#delete-member-account">Request management</Anchor> documentation.

### Deletion request status

| Action                                                       | Request status | Customer status and status label    |
| :----------------------------------------------------------- | :------------- | :---------------------------------- |
| Capillary receives a deletion request                        | PENDING        | No change to the customer status    |
| The brand rejects the deletion request                       | REJECTED       | No change to the customer status    |
| Capillary receives a deletion request                        | APPROVED       | Pending Deletion: Deletion\_pending |
| The customer cancels the deletion request                    | CANCELED       | Previous customer status            |
| Capillary deletes the customer PII after the waiting period. | DELETED        | DELETED: Deleted                    |

After a customer is deleted, the system triggers a customerUpdate event notification to indicate the customer deletion.