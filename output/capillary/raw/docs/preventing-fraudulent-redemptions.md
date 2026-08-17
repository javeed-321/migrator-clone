---
updatedAt: 2026-04-14T12:16:55.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Preventing Fraudulent Redemptions

In real-world retail environments, a small delay exists between a cashier applying a discount and the system officially recording it as "redeemed." This delay can create a loophole where a customer might try to use the same promotion across two different checkout counters simultaneously.

To close this loophole, Capillary uses an internal **Cart Locking** mechanism.

### 1. The transaction flow

Understanding the sequence of events helps clarify why "Locking" is necessary:

1. **Evaluation:** The cashier adds items and calls the system to see which offers are available. The system returns the offers but has **not** yet officially redeemed them.
2. **Application:** The cashier applies the offer and the customer receives the benefit on their bill. Because the benefit is already given, the system cannot "reject" the redemption later without causing a conflict at the register.
3. **Completion:** The transaction is sent to Capillary via the transactionAdd API. Only at this point are the redemption KPIs (limits) updated permanently.

**The Loophole:** If a second transaction is started between Step 2 and Step 3, the system might not yet know the limit has been reached, potentially allowing a customer to exceed their allowed redemptions.

### 2. How cart locking works

To prevent abuse, the system triggers an internal "lock" as soon as a promotion is applied.

<Callout icon="📘" theme="info">
  This feature is **automatically enabled**. You do not need to turn it on manually.
</Callout>

* **Transient KPIs:** When a promotion is applied to a unique **Cart Identifier**, the system creates "temporary" records of that redemption. These temporary records block the promotion from being used by other carts for that same customer.
* **Unique Identifiers:** Every evaluate or getOffers call from the POS during a single transaction must use the same unique Cart Identifier to maintain the lock.
* **Permanent vs. Released:**
  * **Success:** Once the transaction completes, the temporary lock becomes a permanent redemption record.
  * **Failure/Timeout:** If a transaction is cancelled or times out, the lock is released so the customer can use the offer again.

### 3. The customer and cashier experience

Here is how this technical process looks in practice:

1. **Scanning:** As the cashier scans items and requests offers, the system **temporarily locks** the promotion and updates the KPI tracker.
2. **Prevention:** If the system detects an attempt to re-apply an already locked offer (for a different cart), it blocks the action:
   * **Discounts:** Fail at the promotionId level.
   * **Vouchers:** Fail at the earnId level.
3. **Visibility:** If a customer checks their mobile app or asks the store staff while a transaction is mid-way, the offer will show as **"Locked."**
4. **Resolution:** If a transaction is delayed or stuck, the customer has three options:
   * **Wait** for the current transaction to finish.
   * **Contact Support** to manually investigate the transaction state.
   * **Auto-Unlock:** The system will automatically release the lock after **24 hours** if no final confirmation is received.