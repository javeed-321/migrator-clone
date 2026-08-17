---
updatedAt: 2026-07-07T06:18:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Reward State Management

Reward state management APIs control the lifecycle of an issued reward transaction. An issued reward can be redeemed, reverse-redeemed, or revoked:

* Redeeming moves the reward from `ISSUED` to `REDEEMED`.
* Reverse-redeeming moves the reward from `REDEEMED` back to `ISSUED`.
* Revoking cancels the reward and refunds the points consumed during issuance.

Each state transition is gated by a brand-level configuration flag and is disabled by default.

| API                                                                                               | Description                                                                                     |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Redeem User Reward](https://docs.capillarytech.com/reference/redeem-user-reward)                 | Redeems an issued reward transaction (`ISSUED` to `REDEEMED`).                                  |
| [Reverse-Redeem User Reward](https://docs.capillarytech.com/reference/reverse-redeem-user-reward) | Reverses a redemption (`REDEEMED` to `ISSUED`).                                                 |
| [Revoke User Reward](https://docs.capillarytech.com/reference/revoke-user-reward)                 | Revokes an issued reward transaction (`ISSUED` to `CANCELLED`) and refunds the consumed points. |