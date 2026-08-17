---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Idempotency

# What is an idempotency check

Idempotency ensures that performing the same API action multiple times results in the same outcome as performing it once. This is crucial for reward issuance and currency allocation APIs, where network retries or partial failures could otherwise lead to duplicate rewards or points being issued. Some Capillary APIs implement idempotency using unique request identifiers, allowing safe retries and preventing duplicate processing.

## Examples

1. A customer redeems 500 points for a coffee. The app sends the request with a unique ID: `RED-123`. If the request fails due to a timeout and the customer retries, the app sends the same ID. The system detects the duplicate `RED-123`, realizes the first attempt actually succeeded on the backend, and refuses to redeem points a second time. This ensures the customer is only charged once, even if they submit the same redemption request multiple times.
2. A customer redeems four separate vouchers for their family in one go. The app sends the request with a unique ID: `REDVOUCH-123`. If the system processes two vouchers but the connection drops before the rest finish, it’s a partial success. When the customer taps retry, the system recognizes the unique request and sees that two vouchers were already handled. It only processes the remaining two, ensuring the first two aren't accidentally redeemed twice. This allows the customer to get all four vouchers without any duplicates or errors.

## How idempotency works

Capillary APIs use unique identifiers to track and prevent duplicate requests. When you submit a request with an idempotency key:

1. **First request**: The API processes the request and stores the idempotency key
2. **Duplicate request**: If the same idempotency key is sent again, the API detects it as a duplicate and either returns an error or the original result (depending on the API). The request is not processed again.

The idempotency key remains active based on the event status and API-specific rules.

<Image align="center" border={true} width="80% " src="https://files.readme.io/591bf1ea793f12ad1c8dd9c88e5989ae6da24076e0a9b230634ab180f73b9606-image.png" className="border" />

## Key Features

* **Unique Request Identifier:**\
  Each API call that should be idempotent includes a unique identifier (`requestId` or `uniqueId`) in the request payload.
* **Duplicate Detection:**\
  If the same identifier is used in multiple requests, the system recognizes the duplicate and ensures the operation is only processed once.
* **Partial Success Handling:**\
  In scenarios where only part of a bulk operation succeeds, you can safely retry the request with the same identifier. The system will only process the remaining items, not duplicate those that have already been successful.

# APIs that use idempotency

### Issue reward currency (points and alternate currencies)

The following APIs have an idempotency check to prevent duplication of requests:

| API                                                                                                                                                                   | Idempotency Field           |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------- |
| Issue rewards APIs ([single](https://docs.capillarytech.com/reference/post-issue-user-reward) and [bulk](https://docs.capillarytech.com/reference/issue-bulk-reward)) | `requestId`                 |
| [Manual Currency Allocation API](https://docs.capillarytech.com/reference/issue-reward-currency)                                                                      | `uniqueId`                  |
| [Redeem Points API](https://docs.capillarytech.com/reference/redeem-points)                                                                                           | `external_reference_number` |

# FAQs

**Q1: How long are idempotency keys stored?**\
A: Idempotency keys are stored permanently for successful events. They remain active as long as the event record exists in the system.

\*\*Q2: Can I retry a failed event with the same unique ID?
A: No. Only partially successful events can be retried. For failed events, you must investigate the cause and submit a new request with a different `uniqueId`.

**Q3: What happens if I don't include an idempotency key?**\
A: The request will be processed normally, but you won't have duplicate protection. If you retry, it may result in duplicate processing.

**Q4: Can I use the same idempotency key across different customers?**\
A: No. Each idempotency key should be unique across all redemptions/issuances to ensure proper idempotency checks.

**Q5: How do I handle partial success in batch operations?**\
A: When you receive partial success, retry the same request with the same idempotency key. The system will only process the previously failed items.

**Q6: Should I generate a new idempotency key for every retry?**\
A: No. Use the same uniqueId across all retry attempts. This allows the system to detect duplicates and handle partial success correctly.