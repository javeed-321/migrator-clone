---
updatedAt: 2026-07-08T09:52:12.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# List of APIs with Additional Timezone Fields

This page provides you with information on timezone related date-time fields in the APIs.

<br />

<Callout icon="❗️" theme="error">
  This document is a work in progress and the complete lists are continously being updated.
</Callout>

<br />

### Points Ledger API Endpoints

| Endpoint URL                             | Old Legacy Field                                                                   | New ISO Field                                                                                        |
| :--------------------------------------- | :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `/v2/pointsLedger/getLedgerExplodeInfo`  | `eventTime`, `expiresOn`, `returnDate`, `billDate`, `awardedOn`, `awardedTillDate` | `eventTimeISO`, `expiresOnISO`, `returnDateISO`, `billDateISO`, `awardedOnISO`, `awardedTillDateISO` |
| `/v2/pointsLedger/getCustomerLedgerInfo` | `ledgerCreatedDate`, `date`, `eventDate`                                           | `ledgerCreatedDateISO`, `dateISO`, `eventDateISO`                                                    |

### Customer Management API Endpoints

| Endpoint URL                               | Old Legacy Field                                                                        | New ISO Field                                                                                          |
| :----------------------------------------- | :-------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `/v2/customers/{id}/customerDetails`       | `autoUpdateTime`, `createdDateTime`                                                     | `autoUpdateTimeISO`, `createdDateTimeISO`                                                              |
| `/v2/customers/{id}/promotionData`         | `issualExpiryDate`, `issualDate`, `enrollmentExpiryDate`, `enrollmentDate`, `startDate` | `issualExpiryDateISO`, `issualDateISO`, `enrollmentExpiryDateISO`, `enrollmentDateISO`, `startDateISO` |
| `/v2/customers/{id}/tierDetails`           | `tierExpiryDate`                                                                        | `tierExpiryDateISO`                                                                                    |
| `GET v2/customers/{customerId}/coupons`    | `createdDate`, `issuedOn`                                                               | `createdDateISO`, `issuedOnISO`                                                                        |
| `GET /v2/customers/{customerId}/statusLog` | `autoUpdateTime`                                                                        | `autoUpdateTimeISO`                                                                                    |
| `GET v2/customers/{userId}/setImage`       | `createdDateTime`, `autoUpdateTime`                                                     | `createdDateTimeISO`, `autoUpdateTimeISO`                                                              |
| `v2/customers/coupons`                     | `createdDate`, `date`                                                                   | `createdDateISO`, `dateISO`                                                                            |

### Customer V2 Lookup API Endpoints

| Endpoint URL                                     | Old Legacy Field                    | New ISO Field                             |
| :----------------------------------------------- | :---------------------------------- | :---------------------------------------- |
| `GET v2/customers/lookup/customerDetails`        | `createdDateTime`, `autoUpdateTime` | `createdDateTimeISO`, `autoUpdateTimeISO` |
| `GET v2/customers/lookup/tierDetails`            | `tierExpiryDate`                    | `tierExpiryDateISO`                       |
| `GET v2/customers/lookup/promisedPointsSchedule` | `redeemableFrom`                    | `redeemableFromISO`                       |

### Points Management API Endpoints

| Endpoint URL                                           | Old Legacy Field                                                 | New ISO Field                                                             |
| :----------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `POST /v2/points/transfer`                             | `pointsTransferDate`                                             | `pointsTransferDateISO`                                                   |
| `GET /v2/points/transfer`                              | `pointsTransferDate`                                             | `pointsTransferDateISO`                                                   |
| `v2/customers/{userId}/pointsTransfers`                | `pointsTransferDate`                                             | `pointsTransferDateISO`                                                   |
| `/v2/customers/lookup/pointsExpirySchedule`            | `expiryDate`                                                     | `expiryDateISO`                                                           |
| `v2/points/updateExpiry`                               | `oldExpiryDate`, `newExpiryDate`, `eventDate`                    | `oldExpiryDateISO`, `newExpiryDateISO`, `eventDateISO`                    |
| `/v2/customers/{customerId}/singlePointsExpiryUpdates` | `expiryChangeTime`, `pointsNewExpiryDate`, `pointsOldExpiryDate` | `expiryChangeTimeISO`, `pointsNewExpiryDateISO`, `pointsOldExpiryDateISO` |
| `/v2/customers/{id}/pointsTransfers`                   | `startDate`, `endDate`                                           | `startDateISO`, `endDateISO`                                              |
| `/v2/customers/{id}/pointsExpirySchedule`              | `expiryDate`                                                     | `expiryDateISO`                                                           |
| `POST /v2/historicalPoints/getHistoricalPoints`        | `eventDate`                                                      | `eventDateISO`                                                            |
| `POST /v2/historicalPoints/getHistoricalPoints/{id}`   | `eventDate`                                                      | `eventDateISO`                                                            |

### Configuration and Metadata API Endpoints

| Endpoint URL            | Old Legacy Field          | New ISO Field                   |
| :---------------------- | :------------------------ | :------------------------------ |
| `/v2/card/statusLog`    | `autoUpdateTime`          | `autoUpdateTimeISO`             |
| `/v2/extendedFields`    | `createdOn`, `modifiedOn` | `createdOnISO`, `modifiedOnISO` |
| `GET v2/extendedFields` | `createdOn`, `modifiedOn` | `createdOnISO`, `modifiedOnISO` |

### Badge API Endpoints

| Endpoint URL                                          | Old Legacy Field                                     | New ISO Field                                                                        |
| :---------------------------------------------------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `POST /v1/badges/badgeMeta`                           | `startOn`, `expiresOn`, `createdOn`, `lastUpdatedOn` | `startOnISO`, `expiresOnISO`, `createdOnISO`, `lastUpdatedOnISO`                     |
| `PUT /v1/badges/badgeMeta`                            | `startOn`, `expiresOn`, `createdOn`, `lastUpdatedOn` | `startOnISO`, `expiresOnISO`, `createdOnISO`, `lastUpdatedOnISO`                     |
| `GET /v1/badges/badgeMeta`                            | `startOn`, `expiresOn`, `createdOn`, `lastUpdatedOn` | `startOnISO`, `expiresOnISO`, `createdOnISO`, `lastUpdatedOnISO`                     |
| `GET /v1/badges/badgeMeta/getFixedWindowDetails`      | `startDate`, `endDate`                               | `startDateISO`, `endDateISO`                                                         |
| `POST /v1/badges/group`                               | `createdOn`, `lastUpdatedOn`                         | `createdOnISO`, `lastUpdatedOnISO`                                                   |
| `PUT /v1/badges/group/{groupId}`                      | `createdOn`, `lastUpdatedOn`                         | `createdOnISO`, `lastUpdatedOnISO`                                                   |
| `GET /v1/badges/group/{groupId}`                      | `createdOn`, `lastUpdatedOn`                         | `createdOnISO`, `lastUpdatedOnISO`                                                   |
| `POST /v1/badges/customField`                         | `createdOn`, `lastUpdatedOn`                         | `createdOnISO`, `lastUpdatedOnISO`                                                   |
| `GET /v1/badges/customer/{customerIdentifierValue}`   | `lastEarnedOnDate`, `lastEarnEventDate`              | `lastEarnedOnDateISO`, `lastEarnEventDateISO`, `startOnISO`, `expiresOnISO`          |
| `POST /v1/badges/customer/earn`                       | `earnEventDate`, `expiresOn`                         | `earnEventDateISO`, `expiresOnISO`                                                   |
| `GET /v1/badges/management/{customerIdentifierValue}` | `createdOn`, `lastUpdatedOn`, `lastEarnedOn`         | `createdOnISO`, `lastUpdatedOnISO`, `lastEarnedOnISO`, `startsOnISO`, `expiresOnISO` |
| `POST /v1/badges/badgeMeta/customer/issueBulk`        | `issueEventDate`, `expiresOn`                        | `issueEventDateISO`, `expiresOnISO`                                                  |
| `POST v1/badges/import/customerBadges`                | `earnEventDate`, `expiresOn`                         | `earnEventDateISO`, `earnExpiresOnISO`, `expiresOnISO`                               |

### Cart Promotion API Endpoints (v1)

| Endpoint URL                                       | Old Legacy Field                                           | New ISO Field                                                          |
| :------------------------------------------------- | :--------------------------------------------------------- | :--------------------------------------------------------------------- |
| `v1/promotions POST`                               | `createdOn`, `startDate`, `endDate`                        | `createdOnISO`, `lastUpdatedOnISO`, `startDateISO`, `endDateISO`       |
| `v1/promotions/redemptions`                        | `redemptionDate`                                           | `redemptionDateISO`                                                    |
| `api_gateway/v1/promotions/{promotionId}/activate` | `timestamp`                                                | `timestampISO`                                                         |
| `v1/promotions/config`                             | `expiry`                                                   | `expiryISO`                                                            |
| `v1/promotions/customer/`                          | `validTill`, `unlockedDate`, `redeemableFrom`, `eventTime` | `validTillISO`, `unlockedDateISO`, `redeemableFromISO`, `eventTimeISO` |
| `v1/promotions/{promotionId}/earn`                 | `eventTime`, `validTill`                                   | `eventTimeISO`, `validTillISO`                                         |
| `v1/promotions/{code}/link`                        | `createdOn`, `validTill`, `redeemableFrom`                 | `createdOnISO`, `validTillISO`, `redeemableFromISO`                    |
| `POST /v1/promotions/redemptions`                  | `transactionDate`                                          | `transactionDateISO`                                                   |

### Target Groups & Milestones API Endpoints

| Endpoint URL                                           | Old Legacy Field                             | New ISO Field                                                                                                    |
| :----------------------------------------------------- | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `POST /v3/targetGroups`                                | `targetCycleStartDate`, `targetCycleEndDate` | `targetCycleStartDateISO`, `targetCycleEndDateISO`, `createdOnISO`, `lastUpdatedOnISO`                           |
| `PUT /v3/targetGroups/editTargetGroup/{targetGroupId}` | `targetCycleStartDate`, `targetCycleEndDate` | `targetCycleStartDateISO`, `targetCycleEndDateISO`, `createdOnISO`, `lastUpdatedOnISO`                           |
| `GET /v3/milestones`                                   | `createdOn`, `lastUpdatedOn`                 | `createdOnISO`, `lastUpdatedOnISO`, `targetCycleStartDateISO`, `targetCycleEndDateISO`                           |
| `GET /v3/targetGroups/{targetGroupId}/targetPeriods`   | `lastUpdatedOn`, `createdOn`                 | `lastUpdatedOnISO`, `createdOnISO`                                                                               |
| `GET /v3/users/{userId}/targetGroups`                  | `enrolledOn`, `periodStartDate`              | `enrolledOnISO`, `periodStartDateWithTimeStampISO`, `periodEndDateWithTimeStampISO`, `targetAchievedDateTimeISO` |
| `GET /v3/users/{userId}/trackedTargetEvents`           | `eventDate`, `eventProcessedDate`            | `eventDateISO`, `eventProcessedDateISO`                                                                          |

### Leaderboard API Endpoints

| Endpoint URL                                          | Old Legacy Field                   | New ISO Field                            |
| :---------------------------------------------------- | :--------------------------------- | :--------------------------------------- |
| `GET /v3.1/leaderboards/targetGroups/{targetGroupId}` | `lastSyncTime`, `lastActivityTime` | `lastSyncTimeISO`, `lastActivityTimeISO` |
| `GET /v3.1/leaderboards/user/{userId}`                | `lastSyncTime`, `lastActivityTime` | `lastSyncTimeISO`, `lastActivityTimeISO` |

### Transaction & Card Update Endpoints

| Endpoint URL                                        | Old Legacy Field                     | New ISO Field                                 |
| :-------------------------------------------------- | :----------------------------------- | :-------------------------------------------- |
| `POST /v2/simulation/transactions`                  | `eventTime`, `billDate`, `expiresOn` | `eventTimeISO`, `billDateISO`, `expiresOnISO` |
| `PUT /v2/card`                                      | `createdOn`, `updatedOn`             | `createdOnISO`, `updatedOnISO`                |
| `PUT /v2/card/bulk`                                 | `createdOn`, `updatedOn`             | `createdOnISO`, `updatedOnISO`                |
| `GET /v2/transactions/{id}`                         | `N/A`                                | `billingTimeInputOffset`                      |
| `GET /v2/transactions/getByBillNumber/{billNumber}` | `N/A`                                | `billingTimeInputOffset`                      |

### Loyalty Promotion (v3)

| Endpoint URL                                          | Old Legacy Field       | New ISO Field                                                                |
| :---------------------------------------------------- | :--------------------- | :--------------------------------------------------------------------------- |
| `GET /v3/members/{memberId}/promotions`               | `startDate`, `endDate` | `startDateISO`, `endDateISO`                                                 |
| `GET /v3/members/{memberId}/promotions/{promotionId}` | `startDate`, `endDate` | `startDateISO`, `endDateISO`, `enrollmentDateISO`, `enrollmentExpiryDateISO` |

### Webhooks

| Endpoint URL                   | Old Legacy Field             | New ISO Field                      |
| :----------------------------- | :--------------------------- | :--------------------------------- |
| `POST /v3/webHooks`            | `createdOn`, `lastUpdatedOn` | `createdOnISO`, `lastUpdatedOnISO` |
| `PUT /v3/webHooks/{webHookId}` | `createdOn`, `lastUpdatedOn` | `createdOnISO`, `lastUpdatedOnISO` |

### Communications & Interactions API Endpoints

| Endpoint URL               | Old Legacy Field | New ISO Field |
| :------------------------- | :--------------- | :------------ |
| `GET /v2/interactions/get` | `sentDate`       | `sentDateISO` |

### Product API Endpoints

| Endpoint URL                                             | Old Legacy Field                                      | New ISO Field                                                                              |
| :------------------------------------------------------- | :---------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `GET /v2/product/attributes`                             | `attribution.createdDate`                             | Same field now sourced from a millisecond-precision timestamp instead of a date-only value |
| `GET /v2/product/attributes/{attributeId}/values`        | `attribution.createdDate`                             | Same field now sourced from a millisecond-precision timestamp instead of a date-only value |
| `GET /v2/product/brand`, `GET /v2/product/brands`        | `attribution.createdDate`, `attribution.modifiedDate` | Same fields now sourced from millisecond-precision timestamps instead of date-only values  |
| `GET /v2/product/category`, `GET /v2/product/categories` | `attribution.createdDate`, `attribution.modifiedDate` | Same fields now sourced from millisecond-precision timestamps instead of date-only values  |