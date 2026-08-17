---
updatedAt: 2026-06-17T09:05:52.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# API Reference Guide

## Overview

Capillary exposes APIs across four versioned layers:

* **v1** — Legacy InTouch stack. Covers core domains (coupon, transaction, points, product, store, tasks). Superseded by v1.1 and v2.
* **v1.1** — Extended legacy layer. Adds richer customer, organisation, and request management. Still active but v2 is preferred.
* **v2** — Current recommended layer. Significantly expanded surface covering all modern domains.
* **v3** — Dedicated gamification and targeting layer (milestones, streaks, target groups, loyalty promotions).

Authentication is HTTP Basic  Base64-encoded or an `X-CAP-API-OAUTH-TOKEN` header for all the APIs. Base URLs: `https://{host}/v1.1`, `https://{host}/v2`, `https://{host}/v3`.

***

## API Coverage Summary

<table>
  <tr>
    <td align="center" style="padding:16px 24px; border:1px solid #e0e0e0; border-radius:8px;">
      <div style="font-size:2em; font-weight:bold; color:#1a73e8;">40</div>
      <div>API Sections</div>
    </td>
    <td align="center" style="padding:16px 24px; border:1px solid #e0e0e0; border-radius:8px;">
      <div style="font-size:2em; font-weight:bold; color:#888;">99</div>
      <div>v1 Endpoints</div>
    </td>
    <td align="center" style="padding:16px 24px; border:1px solid #e0e0e0; border-radius:8px;">
      <div style="font-size:2em; font-weight:bold; color:#1a73e8;">77</div>
      <div>v1.1 Endpoints</div>
    </td>
    <td align="center" style="padding:16px 24px; border:1px solid #e0e0e0; border-radius:8px;">
      <div style="font-size:2em; font-weight:bold; color:#34a853;">233</div>
      <div>v2 Endpoints</div>
    </td>
    <td align="center" style="padding:16px 24px; border:1px solid #e0e0e0; border-radius:8px;">
      <div style="font-size:2em; font-weight:bold; color:#9c27b0;">25</div>
      <div>v3 Endpoints</div>
    </td>
    <td align="center" style="padding:16px 24px; border:1px solid #e0e0e0; border-radius:8px;">
      <div style="font-size:2em; font-weight:bold; color:#34a853;">33</div>
      <div>Sections with v2 coverage</div>
    </td>
  </tr>
</table>

***

## Domain Coverage Analysis

> Sections are grouped into 24 capability domains. Endpoint counts per version are shown. Where v1/v1.1 endpoints exist, the v2 equivalent should always be preferred. Product and Labels are grouped together as the v2 Product APIs include label management for products, customers, and stores. v1 counts include api\_gateway/v1 endpoints (Badges, Reward Catalog, Cart Promotions).

| #  | Domain                        | Sections included                                                           | v1 | v1.1 | v2 | v3 | Availability   |
| -- | ----------------------------- | --------------------------------------------------------------------------- | -- | ---- | -- | -- | -------------- |
| 1  | Customer Management           | Customer, Customer (Lookup), Customer labels, User authentication, Referral | —  | 19   | 57 | —  | v1.1 · v2      |
| 2  | Transaction Management        | Transaction, Transaction rejection                                          | 4  | 4    | 9  | —  | v1 · v1.1 · v2 |
| 3  | Points Management             | Points, Points ledger                                                       | 3  | 3    | 10 | —  | v1 · v1.1 · v2 |
| 4  | Coupon Management             | Coupon, Coupon upload                                                       | 9  | 6    | 11 | —  | v1 · v1.1 · v2 |
| 5  | Card Management               | Card                                                                        | —  | —    | 8  | —  | v2 only        |
| 6  | User Group & Fleet            | User group                                                                  | —  | —    | 15 | —  | v2 only        |
| 7  | Organisation Management       | Organization, Company                                                       | 7  | 7    | 12 | —  | v1 · v1.1 · v2 |
| 8  | Behavioural Events & Webhooks | Behavioural events, Event logs                                              | —  | —    | 8  | 3  | v2 · v3        |
| 9  | Requests & Workflows          | Requests, PII deletion                                                      | 6  | 7    | 8  | —  | v1 · v1.1 · v2 |
| 10 | OTP & Authentication          | OTP                                                                         | —  | —    | 3  | —  | v2 only        |
| 11 | Communication & Subscriptions | Communications                                                              | 4  | 4    | 1  | —  | v1 · v1.1 · v2 |
| 12 | Product Catalogue             | Product, Labels                                                             | 10 | 10   | 38 | —  | v1 · v1.1 · v2 |
| 13 | Leads & Partner Program       | Leads, Partner program                                                      | —  | —    | 17 | —  | v2 only        |
| 14 | Staff & Store Management      | Staff, Store                                                                | 9  | 9    | 13 | —  | v1 · v1.1 · v2 |
| 15 | Target Group & Milestones     | Target group                                                                | —  | —    | —  | 14 | v3 only        |
| 16 | Badges                        | Badges                                                                      | 14 | —    | —  | —  | v1 only        |
| 17 | Reward Catalog                | Reward catalog                                                              | 17 | —    | —  | —  | v1 only        |
| 18 | Tasks                         | Tasks                                                                       | 8  | 8    | 4  | —  | v1 · v1.1 · v2 |
| 19 | Promotions                    | Cart Promotions, Loyalty Promotions, Loyalty Promotions (Legacy)            | 8  | —    | 6  | 8  | v1 · v2 · v3   |
| 20 | Survey                        | Survey                                                                      | —  | —    | 7  | —  | v2 only        |
| 21 | Activity Sessions             | Activity Sessions                                                           | —  | —    | 4  | —  | v2 only        |
| 22 | Custom Fields                 | Custom Fields                                                               | —  | —    | 8  | —  | v2 only        |
| 23 | Global Search & Simulation    | Global Search, Simulation                                                   | —  | —    | 2  | —  | v2 only        |
| 24 | Locations                     | Locations                                                                   | —  | —    | 2  | —  | v2 only        |

***

## Version Availability Legend

| Badge            | Meaning                                              |
| ---------------- | ---------------------------------------------------- |
| `v1 · v1.1 · v2` | Available across all three legacy and current layers |
| `v1.1 · v2`      | Available in extended legacy and current layers      |
| `v1 · v1.1 only` | Features covered through other v2 APIs               |
| `v2 only`        | Current layer only                                   |
| `v3 only`        | Gamification/targeting layer only                    |
| `v2 · v3`        | Spans current and gamification layers                |
| `v1 only`        | API gateway v1 (Badges / Reward Catalog)             |

> **Note:** Where a domain shows both v1/v1.1 and v2 counts, the v2 API is the recommended integration path. v1 endpoints have no access group resource mapping in the Zion authorization service.

***

## Detailed API Reference

### Badges

| Title                                 | Version | Method | API endpoint                                                   | Access group resource |
| ------------------------------------- | ------- | ------ | -------------------------------------------------------------- | --------------------- |
| Create badges org meta                | v1      | POST   | `api_gateway/v1/badges/orgMeta`                                | —                     |
| Update badges org meta                | v1      | PUT    | `api_gateway/v1/badges/orgMeta`                                | —                     |
| Get badges org meta                   | v1      | GET    | `api_gateway/v1/badges/orgMeta`                                | —                     |
| Create badges                         | v1      | POST   | `api_gateway/v1/badges/badgeMeta`                              | —                     |
| Update badges                         | v1      | PUT    | `api_gateway/v1/badges/badgeMeta`                              | —                     |
| Get all badges                        | v1      | GET    | `api_gateway/v1/badges/badgeMeta`                              | —                     |
| Get badge by ID                       | v1      | GET    | `api_gateway/v1/badges/badgeMeta/{badgeId}`                    | —                     |
| Claim badge                           | v1      | POST   | `api_gateway/v1/badges/badgeMeta/{badgeId}/claim`              | —                     |
| Update the activation status of badge | v1      | PUT    | `api_gateway/v1/badges/badgeMeta/{badgeId}/{activationStatus}` | —                     |
| Enroll customers in badges            | v1      | POST   | `api_gateway/v1/badges/badgeMeta/customer/issueBulk`           | —                     |
| Issue badge to the customer           | v1      | POST   | `api_gateway/v1/badges/customer/earn`                          | —                     |
| Revoke enrolment of a badge           | v1      | POST   | `api_gateway/v1/badges/badgeMeta/customer/revokeIssue`         | —                     |
| Revoke issual of a badge              | v1      | POST   | `api_gateway/v1/badges/customer/revokeEarn`                    | —                     |
| Get badges for customer               | v1      | GET    | `api_gateway/v1/badges/customer/{customerId}`                  | —                     |

***

### Behavioural events

| Title                     | Version | Method | API endpoint                    | Access group resource |
| ------------------------- | ------- | ------ | ------------------------------- | --------------------- |
| Add Event (Custom)        | v2      | POST   | `v2/events`                     | Behavioural Events    |
| Update Event (Custom)     | v2      | PUT    | `v2/events`                     | Behavioural Events    |
| Get Event Details         | v2      | GET    | `v2/events`                     | Behavioural Events    |
| Get Running Events Status | v2      | GET    | `v2/events/running_status`      | Behavioural Events    |
| Get Customer Events       | v2      | GET    | `v2/events/event_data/{userId}` | Behavioural Events    |
| Add Webhook               | v2      | POST   | `v2/events/webhook`             | Behavioural Events    |
| Get Audit Logs            | v2      | GET    | `v2/events/audit_logs`          | Behavioural Events    |
| Get Events Logs           | v2      | GET    | `v2/events/logs`                | Behavioural Events    |

***

### Card

| Title                           | Version | Method | API endpoint              | Access group resource |
| ------------------------------- | ------- | ------ | ------------------------- | --------------------- |
| Develop Cards                   | v2      | POST   | `v2/card/generate`        | Card                  |
| Get Card Generation Log         | v2      | GET    | `v2/card/generation/logs` | Card                  |
| Add Card (Single)               | v2      | POST   | `v2/card`                 | Card                  |
| Update Card Details (Single)    | v2      | PUT    | `v2/card`                 | Card                  |
| Update Card Details (Bulk)      | v2      | PUT    | `v2/card/bulk`            | Card                  |
| Get Card Details                | v2      | GET    | `v2/card`                 | Card                  |
| Get Status Log                  | v2      | GET    | `v2/card/statusLog`       | Card                  |
| Limit Active Cards per Customer | v2      | POST   | `v2/organization/configs` | Organization          |

***

### Communications

| Title                     | Version | Method | API endpoint                | Access group resource |
| ------------------------- | ------- | ------ | --------------------------- | --------------------- |
| Send email communications | v2      | POST   | `v2/communications/email`   | Communications        |
| Send SMS                  | v1.1    | POST   | `v1.1/communications/sms`   | Communications        |
| Get SMS                   | v1.1    | GET    | `v1.1/communications/sms`   | Communications        |
| Send Email                | v1.1    | POST   | `v1.1/communications/email` | Communications        |
| Get Email                 | v1.1    | GET    | `v1.1/communications/email` | Communications        |
| Send SMS                  | v1      | POST   | `v1/communications/sms`     | —                     |
| Get SMS                   | v1      | GET    | `v1/communications/sms`     | —                     |
| Send Email                | v1      | POST   | `v1/communications/email`   | —                     |
| Get Email                 | v1      | GET    | `v1/communications/email`   | —                     |

***

### Company

| Title                                  | Version | Method | API endpoint                       | Access group resource |
| -------------------------------------- | ------- | ------ | ---------------------------------- | --------------------- |
| Add Company                            | v2      | POST   | `v2/companies`                     | Companies             |
| Update Company                         | v2      | PUT    | `v2/companies`                     | Companies             |
| Get Company Details                    | v2      | GET    | `v2/companies`                     | Companies             |
| Remove Company                         | v2      | DELETE | `v2/companies`                     | Companies             |
| Get Org Companies                      | v2      | GET    | `v2/companies/all`                 | Companies             |
| Get Companies by Extended Field Values | v2      | GET    | `v2/companies/extendedFieldSearch` | Companies             |

***

### Coupon

| Title                         | Version | Method | API endpoint               | Access group resource |
| ----------------------------- | ------- | ------ | -------------------------- | --------------------- |
| Create coupon series          | v2      | POST   | `v2/coupon/series`         | Coupon                |
| Update coupon series          | v2      | PUT    | `v2/coupon/series/{id}`    | Coupon                |
| Get coupon series details     | v2      | GET    | `v2/coupon/series`         | Coupon                |
| Issue single coupon           | v2      | POST   | `v2/coupon/issue`          | Coupon                |
| Issue bulk coupons            | v2      | POST   | `v2/coupon/bulk/issue`     | Coupon                |
| Redeem single coupon          | v2      | POST   | `v2/coupon/redeem`         | Coupon                |
| Redeem bulk coupons           | v2      | POST   | `v2/coupon/bulk/redeem`    | Coupon                |
| Check if coupon is redeemable | v2      | GET    | `v2/coupon/is_redeemable`  | Coupon                |
| Reactivate redeemed coupon    | v2      | POST   | `v2/coupon/reactivate`     | Coupon                |
| Get coupon details            | v2      | GET    | `v2/coupon`                | Coupon                |
| Issue Coupon                  | v1.1    | POST   | `v1.1/coupon/issue`        | Coupon                |
| Resend Coupon                 | v1.1    | GET    | `v1.1/coupon/resend`       | Coupon                |
| Redeem Coupon                 | v1.1    | POST   | `v1.1/coupon/redeem`       | Coupon                |
| Get Coupon details            | v1.1    | GET    | `v1.1/coupon/get`          | Coupon                |
| Is Coupon Redeemable          | v1.1    | GET    | `v1.1/coupon/isredeemable` | Coupon                |
| Get Coupon series details     | v1.1    | GET    | `v1.1/coupon/series`       | Coupon                |
| Issue Coupon                  | v1      | POST   | `v1/coupon/issue`          | —                     |
| Resend Coupon                 | v1      | GET    | `v1/coupon/resend`         | —                     |
| Redeem Coupon                 | v1      | POST   | `v1/coupon/redeem`         | —                     |
| Get Coupon details            | v1      | GET    | `v1/coupon/get`            | —                     |
| Is Coupon Redeemable          | v1      | GET    | `v1/coupon/isredeemable`   | —                     |
| Get Coupon series details     | v1      | GET    | `v1/coupon/series`         | —                     |

***

### Coupon upload

| Title                          | Version | Method | API endpoint                                               | Access group resource |
| ------------------------------ | ------- | ------ | ---------------------------------------------------------- | --------------------- |
| Get Status of Redeemed Coupons | v2      | GET    | `v2/upload/getUploadRedeemedCouponStatus/{couponSeriesId}` | —                     |
| Get Uploaded Coupons Status    | v1      | GET    | `v1/upload/getUploadStatus/`                               | —                     |
| Upload Redeemed Coupons        | v1      | POST   | `v1/upload/getUploadRedeemedCouponStatus`                  | —                     |
| Upload Coupons (Batch)         | v1      | POST   | `coupon/api/v1/upload/file/{couponSeriesId}`               | —                     |

***

### Customer

| Title                                   | Version | Method | API endpoint                                                      | Access group resource |
| --------------------------------------- | ------- | ------ | ----------------------------------------------------------------- | --------------------- |
| Add Customer                            | v2      | POST   | `v2/customers`                                                    | Customer              |
| Get Customer ID                         | v2      | GET    | `v2/customers/lookup`                                             | Customer              |
| Update Identifier/Issue Card            | v2      | PUT    | `v2/{userId}/changeIdentifier`                                    | Customer              |
| Upsert Customer                         | v2      | POST   | `v2/integrations/customer/upsert/bulk?skipChangeIdentifier=false` | Customer              |
| Associate Customer                      | v2      | POST   | `v2/bulk`                                                         | Customer              |
| Get Customer Details                    | v2      | GET    | `v2/customers/{customerId}`                                       | Customer              |
| Get customer hierarchy in a user group  | v2      | GET    | `v2/customers/bulk`                                               | Customer              |
| Update Customer Details                 | v2      | PUT    | `v2/customers/{userId}`                                           | Customer              |
| Update association details              | v2      | PUT    | `v2/bulk`                                                         | Customer              |
| Search Customers                        | v2      | GET    | `v2/customers/search`                                             | Customer              |
| Update Subscription Details             | v2      | PUT    | `v2/customers/{userId}/subscriptions`                             | Customer              |
| Get Subscription Details                | v2      | GET    | `v2/customers/{customerId}/subscriptions`                         | Customer              |
| Get Points Expiry Schedule              | v2      | GET    | `v2/customers/{userId}/pointsExpirySchedule`                      | Customer              |
| Get Points Expiry Schedule (Light API)  | v2      | GET    | `v2/customers/lookup/pointsExpirySchedule`                        | Customer              |
| Get Loyalty Events                      | v2      | GET    | `v2/customers/{userId}/loyaltyEvents`                             | Customer              |
| Get Loyalty Details                     | v2      | GET    | `v2/customers/{customerId}/loyaltyDetails`                        | Customer              |
| Get Points Transfer Summary             | v2      | GET    | `v2/customers/{userId}/pointsTransfers`                           | Customer              |
| Get Points Balance                      | v2      | GET    | `v2/customers/{userId}/points/balance`                            | Customer              |
| Get Customer Tier                       | v2      | GET    | `v2/customers/{userId}/tierDetails`                               | Customer              |
| Get Points Conversion Schedule          | v2      | GET    | `v2/customers/{userId}/promisedPointsSchedule`                    | Customer              |
| Get Customer Coupons (Detailed)         | v2      | GET    | `v2/customers/{customerId}/coupons`                               | Customer              |
| Get Retro Requests                      | v2      | GET    | `v2/customers/{customerId}/retroRequest`                          | Customer              |
| Get Identifier Change Requests          | v2      | GET    | `v2/customers/{customerId}/changeRequest`                         | Customer              |
| Get Goodwill Requests                   | v2      | GET    | `v2/customers/{customerId}/goodwillRequest`                       | Customer              |
| Request Goodwill points (Group)         | v2      | GET    | `v2/requests/`                                                    | Requests              |
| Add Customer Image                      | v2      | POST   | `v2/customers/{customerId}/setImage`                              | Customer              |
| Delete Customer Image                   | v2      | DELETE | `v2/customers/{userId}/deleteImage`                               | Customer              |
| Get Customer Coupons (Basic)            | v2      | GET    | `v2/customers/coupons`                                            | Customer              |
| Link/Delink Card                        | v2      | POST   | `v2/customers/{userId}/changeIdentifier`                          | Customer              |
| Add Referrals                           | v2      | POST   | `v2/customers/{userId}/referrals`                                 | Customer              |
| Get Referrals                           | v2      | GET    | `v2/customers/{userId}/referrals`                                 | Customer              |
| Get Customer Status Log                 | v2      | GET    | `v2/customers/{userId}/statusLog`                                 | Customer              |
| Get Customer Subscription Log           | v2      | GET    | `v2/customers/{userId}/subscriptionStatusChangeLog`               | Customer              |
| Get user group customer tracker details | v2      | GET    | `v2/customers/userEntityTrackers`                                 | Customer              |
| Get customer transactions               | v2      | GET    | `v2/customers/{id}/transactions`                                  | Customer              |
| Add Customer                            | v1.1    | POST   | `v1.1/customer/add`                                               | Customer              |
| Update Customer details                 | v1.1    | POST   | `v1.1/customer/update`                                            | Customer              |
| Update Customer Identifier              | v1.1    | POST   | `v1.1/customer/update_identity`                                   | Customer              |
| Get Customer Details                    | v1.1    | GET    | `v1.1/customer/get`                                               | Customer              |
| Get Customer Transactions               | v1.1    | GET    | `v1.1/customer/transactions`                                      | Customer              |
| Get Customer Redemptions                | v1.1    | GET    | `v1.1/customer/redemptions`                                       | Customer              |
| Get Customer Coupons                    | v1.1    | GET    | `v1.1/customer/coupons`                                           | Customer              |
| Add/Update Customer Notes               | v1.1    | POST   | `v1.1/customer/notes`                                             | Customer              |
| Get Customer Notes                      | v1.1    | GET    | `v1.1/customer/notes`                                             | Customer              |
| Get Product Recommendations             | v1.1    | GET    | `v1.1/customer/recommendations`                                   | Customer              |
| Get Customer Interactions               | v1.1    | GET    | `v1.1/customer/interaction`                                       | Communications        |
| Add Ticket                              | v1.1    | POST   | `v1.1/customer/tickets`                                           | Customer              |
| Get Ticket Details                      | v1.1    | GET    | `v1.1/customer/tickets`                                           | Customer              |
| Refer Customer                          | v1.1    | POST   | `v1.1/customer/referrals`                                         | Customer              |
| Get Referral Details                    | v1.1    | GET    | `v1.1/customer/referrals`                                         | Customer              |
| Add/Update Customer Preferences         | v1.1    | POST   | `v1.1/customer/preferences`                                       | Customer              |
| Get Customer Preferences                | v1.1    | GET    | `v1.1/customer/preferences`                                       | Customer              |
| Update Subscription Details             | v1.1    | POST   | `v1.1/customer/subscriptions`                                     | Customer              |
| Get Subscription Details                | v1.1    | GET    | `v1.1/customer/subscriptions`                                     | Customer              |

***

### Customer (Lookup)

| Title                          | Version | Method | API endpoint                                 | Access group resource |
| ------------------------------ | ------- | ------ | -------------------------------------------- | --------------------- |
| Get promotion data             | v2      | GET    | `v2/customers/lookup/promotionData`          | Customer              |
| Update Customer Details        | v2      | PUT    | `v2/customers/lookup`                        | Customer              |
| Get Customer Details           | v2      | GET    | `v2/customers/lookup/customerDetails`        | Customer              |
| Update Customer Status         | v2      | PUT    | `v2/customers/lookup/status`                 | Customer              |
| Get Subscription Details       | v2      | GET    | `v2/customers/lookup/subscriptions`          | Customer              |
| Get Customer Loyalty Details   | v2      | GET    | `v2/customers/lookup/loyaltyDetails`         | Customer              |
| Get Retro Requests             | v2      | GET    | `v2/customers/lookup/retroRequest`           | Customer              |
| Add Customer Image             | v2      | POST   | `v2/customers/lookup/setImage`               | Customer              |
| Get Referrals                  | v2      | GET    | `v2/customers/lookup/referrals`              | Customer              |
| Get Customer Recommendations   | v2      | GET    | `v2/customers/lookup/recommendations`        | Customer              |
| Get Points Balance             | v2      | GET    | `v2/customers/lookup/points/balance`         | Customer              |
| Get Customer Tier              | v2      | GET    | `v2/customers/lookup/tierDetails`            | Customer              |
| Get Points Conversion Schedule | v2      | GET    | `v2/customers/lookup/promisedPointsSchedule` | Customer              |

***

### Customer labels

| Title                     | Version | Method | API endpoint                               | Access group resource |
| ------------------------- | ------- | ------ | ------------------------------------------ | --------------------- |
| Add Labels                | v2      | POST   | `v2/organization/label`                    | Organization          |
| Get Org Labels            | v2      | GET    | `v2/organization/labels`                   | Organization          |
| Tag Customers (to Labels) | v2      | POST   | `v2/customers/{userId}/changeLabels`       | Customer              |
| Get Customer Labels       | v2      | GET    | `v2/customers/{userId}/labels`             | Customer              |
| Search Customers by Label | v2      | GET    | `v2/customers/labels/search?q={LabelName}` | Customer              |

***

### Event logs

| Title                           | Version | Method | API endpoint                     | Access group resource |
| ------------------------------- | ------- | ------ | -------------------------------- | --------------------- |
| Get Event Log (by Request ID)   | v3      | GET    | `v3/webHooks/eventLog/requestId` | Webhooks              |
| Get Event Log (by Reference ID) | v3      | GET    | `v3/webHooks/eventLog/refId`     | Webhooks              |
| Get Event Log (by Event ID)     | v3      | GET    | `v3/webhooks/eventLog`           | Webhooks              |

***

### Labels

| Title                    | Version | Method | API endpoint                   | Access group resource |
| ------------------------ | ------- | ------ | ------------------------------ | --------------------- |
| Create Labels            | v2      | POST   | `v2/labels`                    | Labels                |
| Update Labels            | v2      | PUT    | `v2/labels`                    | Labels                |
| Get/Search Labels        | v2      | GET    | `v2/labels`                    | Labels                |
| Create Label Assignments | v2      | POST   | `v2/labels/assignments`        | Labels                |
| Get Label Assignments    | v2      | GET    | `v2/labels/assignments`        | Labels                |
| Search Label Assignments | v2      | GET    | `v2/labels/assignments/search` | Labels                |
| Update Label Assignments | v2      | PUT    | `v2/labels/assignments`        | Labels                |
| Remove Label Assignments | v2      | DELETE | `v2/labels/assignments`        | Labels                |

***

### Leads

| Title                  | Version | Method | API endpoint                  | Access group resource |
| ---------------------- | ------- | ------ | ----------------------------- | --------------------- |
| Add Lead               | v2      | PATCH  | `v2/leads`                    | Leads                 |
| Add Lead Substatus     | v2      | POST   | `v2/leads/substatus`          | Leads                 |
| Update Lead Status     | v2      | PUT    | `v2/leads/{leadId}/status`    | Leads                 |
| Update Lead Followups  | v2      | POST   | `v2/leads/{leadId}/followup`  | Leads                 |
| Update Lead            | v2      | PUT    | `v2/leads/{leadId}`           | Leads                 |
| Configure lead reasons | v2      | POST   | `v2/leads/reasons`            | Leads                 |
| Get Lead Status Log    | v2      | GET    | `v2/leads/{leadId}/statusLog` | Leads                 |
| Get Lead follow-ups    | v2      | GET    | `v2/leads/{leadId}/followups` | Leads                 |
| Get Lead Reasons       | v2      | GET    | `v2/leads/reasons`            | Leads                 |
| Get Lead Details       | v2      | GET    | `v2/leads`                    | Leads                 |
| Get Lead Substatus     | v2      | GET    | `v2/leads/substatuses`        | Leads                 |
| Assign Lead            | v2      | GET    | `v2/leads`                    | Leads                 |
| Search lead            | v2      | GET    | `v2/leads`                    | Leads                 |

***

### Organization

| Title                  | Version | Method | API endpoint                     | Access group resource    |
| ---------------------- | ------- | ------ | -------------------------------- | ------------------------ |
| Get Custom Fields      | v2      | GET    | `v2/organization/customFields`   | Organization Data Fields |
| Get Config Key Values  | v2      | GET    | `v2/organization/configkeyvalue` | Organization             |
| Get org till details   | v2      | GET    | `v2/organization/till`           | Organization             |
| Get Active Tills       | v2      | GET    | `v2/organization/activeTill`     | Organization             |
| Get Loyalty Programs   | v2      | GET    | `v2/organization/programs`       | Points                   |
| Add Store              | v2      | POST   | `v2/orgEntity/store`             | Organization             |
| Get Org Details        | v1.1    | GET    | `v1.1/organization/get`          | Organization             |
| Get Org Entities       | v1.1    | GET    | `v1.1/organization/entities`     | Organization             |
| Get Org Configurations | v1.1    | GET    | `v1.1/organization/configs`      | Organization             |
| Get Org Statistics     | v1.1    | GET    | `v1.1/organization/statistics`   | —                        |
| Get Top Selling Items  | v1.1    | GET    | `v1.1/organization/topitems`     | Organization             |
| Get Org Custom Fields  | v1.1    | GET    | `v1.1/organization/customfields` | Organization Data Fields |
| Get Org Payment Modes  | v1.1    | GET    | `v1.1/organization/tenders`      | Organization             |
| Get Org Details        | v1      | GET    | `v1/organization/get`            | —                        |
| Get Org Entities       | v1      | GET    | `v1/organization/entities`       | —                        |
| Get Org Configurations | v1      | GET    | `v1/organization/configs`        | —                        |
| Get Org Statistics     | v1      | GET    | `v1/organization/statistics`     | —                        |
| Get Top Selling Items  | v1      | GET    | `v1/organization/topitems`       | —                        |
| Get Org Custom Fields  | v1      | GET    | `v1/organization/customfields`   | —                        |
| Get Org Payment Modes  | v1      | GET    | `v1/organization/tenders`        | —                        |

***

### OTP

| Title        | Version | Method | API endpoint      | Access group resource |
| ------------ | ------- | ------ | ----------------- | --------------------- |
| Generate OTP | v2      | POST   | `v2/otp/generate` | OTP                   |
| Validate OTP | v2      | POST   | `v2/otp/validate` | OTP                   |
| Get OTP      | v2      | GET    | `v2/otp`          | OTP                   |

***

### Partner program

| Title                            | Version | Method | API endpoint                                     | Access group resource |
| -------------------------------- | ------- | ------ | ------------------------------------------------ | --------------------- |
| Link Customer to Partner Program | v2      | POST   | `v2/partnerProgram/linkCustomer`                 | Partner Program       |
| Update Customer                  | v2      | POST   | `v2/partnerProgram/customerPartnerProgramUpdate` | Partner Program       |
| Delink Customer                  | v2      | POST   | `v2/partnerProgram/deLinkCustomer`               | Partner Program       |
| Get Customer Activity            | v2      | GET    | `v2/partnerProgram/customerActivityHistory`      | Partner Program       |

***

### PII deletion

| Title                                   | Version | Method | API endpoint       | Access group resource |
| --------------------------------------- | ------- | ------ | ------------------ | --------------------- |
| Add a PII deletion request              | v2      | POST   | `v2/requests`      | Requests              |
| Update PII deletion status              | v2      | PUT    | `v2/requests`      | Requests              |
| Retrieve request status of PII deletion | v2      | GET    | `v2/requests/{id}` | Requests              |
| Retrieve PII deletion request details   | v2      | GET    | `v2/requests`      | Requests              |

***

### Points

| Title                                    | Version | Method | API endpoint                           | Access group resource |
| ---------------------------------------- | ------- | ------ | -------------------------------------- | --------------------- |
| Customer Points Transferrable            | v2      | POST   | `v2/points/isTransferrable`            | Points                |
| Transfer Customer Points                 | v2      | POST   | `v2/points/transfer`                   | Points                |
| Get Points Transfer Details              | v2      | GET    | `v2/points/transfer`                   | Points                |
| Reverse Redeemed Points                  | v2      | POST   | `v2/points/reverse`                    | Points                |
| Group Points Transferrable               | v2      | POST   | `v2/points/userGroup2/isTransferrable` | Points                |
| Transfer Group Points                    | v2      | POST   | `v2/points/userGroup2/transfer`        | Points                |
| Points Unlock API                        | v2      | POST   | `v2/points/unlockPromisedPoints`       | Points                |
| Check If Points Redeemable               | v1.1    | GET    | `v1.1/points/isredeemable`             | Points                |
| Issue Validation Code (to redeem points) | v1.1    | GET    | `v1.1/points/validationcode`           | Points                |
| Redeem Points                            | v1.1    | POST   | `v1.1/points/redeem`                   | Points                |
| Check If Points Redeemable               | v1      | GET    | `v1/points/isredeemable`               | —                     |
| Issue Validation Code (to redeem points) | v1      | GET    | `v1/points/validationcode`             | —                     |
| Redeem Points                            | v1      | POST   | `v1/points/redeem`                     | —                     |

***

### Points ledger

| Title                           | Version | Method | API endpoint                               | Access group resource |
| ------------------------------- | ------- | ------ | ------------------------------------------ | --------------------- |
| Get Customer Ledger Balance     | v2      | GET    | `v2/pointsLedger/getCustomerLedgerBalance` | Points                |
| Get Customer Ledger Information | v2      | GET    | `v2/pointsLedger/getCustomerLedgerInfo`    | Points                |
| Get Points Ledger Explode info  | v2      | GET    | `v2/pointsLedger/getLedgerExplodeInfo`     | Points                |

***

### Product

| Title                      | Version | Method | API endpoint                                 | Access group resource |
| -------------------------- | ------- | ------ | -------------------------------------------- | --------------------- |
| Add Product                | v1.1    | POST   | `v1.1/product/add`                           | Product               |
| Get Product Details        | v1.1    | GET    | `v1.1/product/get`                           | Product               |
| Search Products            | v1.1    | GET    | `v1.1/product/search`                        | Product               |
| Add Product Attributes     | v1.1    | POST   | `v1.1/product/attributes`                    | Product               |
| Get Product Attributes     | v1.1    | GET    | `v1.1/product/attributes`                    | Product               |
| Get Product Categories     | v1.1    | GET    | `v1.1/product/categories`                    | Product               |
| Get Product Brands         | v1.1    | GET    | `v1.1/product/brands`                        | Product               |
| Get Product Colors         | v1.1    | GET    | `v1.1/product/colors`                        | Product               |
| Get Product Sizes          | v1.1    | GET    | `v1.1/product/sizes`                         | Product               |
| Get Product Meta Sizes     | v1.1    | GET    | `v1.1/product/meta_sizes`                    | Product               |
| Add Product                | v1      | POST   | `v1/product/add`                             | —                     |
| Get Product Details        | v1      | GET    | `v1/product/get`                             | —                     |
| Search Products            | v1      | GET    | `v1/product/search`                          | —                     |
| Add Product Attributes     | v1      | POST   | `v1/product/attributes`                      | —                     |
| Get Product Attributes     | v1      | GET    | `v1/product/attributes`                      | —                     |
| Get Product Categories     | v1      | GET    | `v1/product/categories`                      | —                     |
| Get Product Brands         | v1      | GET    | `v1/product/brands`                          | —                     |
| Get Product Colors         | v1      | GET    | `v1/product/colors`                          | —                     |
| Get Product Sizes          | v1      | GET    | `v1/product/sizes`                           | —                     |
| Get Product Meta Sizes     | v1      | GET    | `v1/product/meta_sizes`                      | —                     |
| Add Product                | v2      | POST   | `v2/product`                                 | Product               |
| Get Product                | v2      | GET    | `v2/product`                                 | Product               |
| Get Products (Bulk)        | v2      | GET    | `v2/product/getbulk`                         | Product               |
| Add Products (Bulk)        | v2      | POST   | `v2/product/bulk`                            | Product               |
| Add Brands                 | v2      | POST   | `v2/product/brands`                          | Product               |
| Update Brands              | v2      | PUT    | `v2/product/brands`                          | Product               |
| Get/Search Brands          | v2      | GET    | `v2/product/brands`                          | Product               |
| Add Categories             | v2      | POST   | `v2/product/categories`                      | Product               |
| Update Categories          | v2      | PUT    | `v2/product/categories`                      | Product               |
| Get/Search Categories      | v2      | GET    | `v2/product/categories`                      | Product               |
| Add Attributes             | v2      | POST   | `v2/product/attributes`                      | Product               |
| Update Attributes          | v2      | PUT    | `v2/product/attributes`                      | Product               |
| Get/Search Attributes      | v2      | GET    | `v2/product/attributes`                      | Product               |
| Add Attribute Values       | v2      | POST   | `v2/product/attributeValues`                 | Product               |
| Update Attribute Values    | v2      | PUT    | `v2/product/attributeValues`                 | Product               |
| Get Attribute Values       | v2      | GET    | `v2/product/attributes/{attributeId}/values` | Product               |
| Add SKUs                   | v2      | POST   | `v2/product/skus`                            | Product               |
| Update SKUs                | v2      | PUT    | `v2/product/skus`                            | Product               |
| Get/Search SKUs            | v2      | GET    | `v2/product/skus`                            | Product               |
| Add Integration Attributes | v2      | POST   | `v2/integrations/attributes/add`             | Product               |

***

### Referral

| Title                  | Version | Method | API endpoint  | Access group resource |
| ---------------------- | ------- | ------ | ------------- | --------------------- |
| Validate referral code | v2      | GET    | `v2/validate` | Customer              |

***

### Requests

| Title                                | Version | Method | API endpoint           | Access group resource |
| ------------------------------------ | ------- | ------ | ---------------------- | --------------------- |
| Add transaction request              | v2      | POST   | `v2/requests/`         | Requests              |
| Update transaction request           | v2      | PUT    | `v2/requests/`         | Requests              |
| Retrieve transaction request status  | v2      | GET    | `v2/requests/{id}`     | Requests              |
| Retrieve transaction request details | v2      | GET    | `v2/requests`          | Requests              |
| Add Request                          | v1.1    | POST   | `v1.1/request/add`     | Requests              |
| Approve Requests                     | v1.1    | POST   | `v1.1/request/approve` | Requests              |
| Reject Requests                      | v1.1    | POST   | `v1.1/request/reject`  | Requests              |
| Get Request Details                  | v1.1    | GET    | `v1.1/request/get`     | Requests              |
| Get Request Logs                     | v1.1    | GET    | `v1.1/request/logs`    | Requests              |
| Send retro request                   | v1.1    | POST   | `v1.1/request/`        | Requests              |
| Approval of the request              | v1.1    | POST   | `v1.1/request/approve` | Requests              |
| Approve Requests                     | v1      | POST   | `v1/request/approve`   | —                     |
| Reject Requests                      | v1      | POST   | `v1/request/reject`    | —                     |
| Get Request Details                  | v1      | GET    | `v1/request/get`       | —                     |
| Get Request Logs                     | v1      | GET    | `v1/request/logs`      | —                     |
| Send retro request                   | v1      | POST   | `v1/request`           | —                     |
| Approval of request                  | v1      | POST   | `v1/request/approve`   | —                     |

***

### Reward catalog

| Title                          | Version | Method | API endpoint                                                                                                     | Access group resource |
| ------------------------------ | ------- | ------ | ---------------------------------------------------------------------------------------------------------------- | --------------------- |
| Create Reward                  | v1      | POST   | `api_gateway/rewards/core/v1/reward/create`                                                                      | —                     |
| Update Reward                  | v1      | PUT    | `api_gateway/rewards/core/v1/reward/{rewardId}/brand/{brandId}`                                                  | —                     |
| Create custom field            | v1      | POST   | `api_gateway/rewards/core/v1/brand/customfield`                                                                  | —                     |
| Get custom field               | v1      | GET    | `api_gateway/rewards/core/v1/brand/customfield`                                                                  | —                     |
| Get user brand rewards         | v1      | GET    | `api_gateway/rewards/core/v1/user/reward/{rewardId}/brand/{brandName}`                                           | —                     |
| Get Brands Rewards             | v1      | GET    | `api_gateway/rewards/core/v1/reward/brand/{brandId}`                                                             | —                     |
| Get User Reward Details        | v1      | GET    | `api_gateway/rewards/core/v1/user/vouchers/brand/{brandName}?mobile={mobile}&username={store}`                   | —                     |
| Get User Reward by ID          | v1      | GET    | `api_gateway/rewards/core/v1/user/reward/{rewardId}/vouchers/brand/{brandName}?mobile={mobile}&username={store}` | —                     |
| Issue User Reward              | v1      | POST   | `api_gateway/rewards/core/v1/user/reward/{rewardId}/issue?username={store}&skip_validation=true`                 | —                     |
| Issue bulk reward              | v1      | POST   | `api_gateway/rewards/core/v1/user/rewards/issue?username={store}&skip_validation=true`                           | —                     |
| Create Catalog Promotion       | v1      | POST   | `api_gateway/rewards/core/v1/promotion/create`                                                                   | —                     |
| Update Catalog Promotion       | v1      | PUT    | `api_gateway/rewards/core/v1/promotion/{rewardId}/brand/{brandId}`                                               | —                     |
| Get Catalog Promotion Details  | v1      | GET    | `api_gateway/rewards/core/v1/promotion/{promotionId}/brand/{brandId}`                                            | —                     |
| Get List of Promotions         | v1      | GET    | `api_gateway/rewards/core/v1/promotion/brand/{brandId}`                                                          | —                     |
| Disable Promotion              | v1      | PUT    | `api_gateway/rewards/core/v1/promotion/{promotionId}/status/false/brand/{brandId}`                               | —                     |
| Get Rewards for User           | v1      | GET    | `api_gateway/rewards/core/v1/user/reward/brand/{brandName}?userId={userId}`                                      | —                     |
| Get rewards for User (New API) | v1      | GET    | `api_gateway/rewards/core/v1/user/userReward/brand/{brandName}`                                                  | —                     |

***

### Staff

| Title                            | Version | Method | API endpoint                        | Access group resource |
| -------------------------------- | ------- | ------ | ----------------------------------- | --------------------- |
| Add Staff Account                | v2      | POST   | `v2/staff`                          | Staff                 |
| Get Access Token                 | v2      | GET    | `v2/staff/accessToken`              | Staff                 |
| Edit Staff Details               | v2      | POST   | `v2/staff/edit`                     | Staff                 |
| Get Staff Details                | v2      | GET    | `v2/staff`                          | Staff                 |
| Change Account Password          | v2      | POST   | `v2/staff/changePassword`           | Staff                 |
| Send OTP                         | v2      | POST   | `v2/staff/sendOtp`                  | Staff                 |
| Validate OTP                     | v2      | POST   | `v2/staff/validate`                 | Staff                 |
| Change Identifier (Send OTP)     | v2      | POST   | `v2/staff/changeidentifier/sendotp` | Staff                 |
| Change Identifier (Validate OTP) | v2      | POST   | `v2/staff/changeidentifier`         | Staff                 |
| Transfer Staff User              | v2      | POST   | `v2/staff/transfer`                 | Staff                 |
| Get Staff of Store/Zone          | v2      | GET    | `v2/staff/getUsersList`             | Staff                 |
| Logout Staff Account             | v2      | GET    | `v2/staff/logout`                   | Staff                 |
| Remove Staff Account             | v2      | POST   | `v2/staff/delete`                   | Staff                 |

***

### Store

| Title                          | Version | Method | API endpoint                | Access group resource |
| ------------------------------ | ------- | ------ | --------------------------- | --------------------- |
| Get Store Details              | v1.1    | GET    | `v1.1/store/get`            | Store                 |
| Get Store Staff Details        | v1.1    | GET    | `v1.1/store/staff`          | Store                 |
| Get Store Tasks                | v1.1    | GET    | `v1.1/store/tasks`          | Store                 |
| Verify Store Login Credentials | v1.1    | GET    | `v1.1/store/login`          | Store                 |
| Upload Store Logs              | v1.1    | POST   | `v1.1/store/logs`           | Store                 |
| Upload Store Reports           | v1.1    | POST   | `v1.1/store/reports`        | Store                 |
| Get Store Reports              | v1.1    | GET    | `v1.1/store/reports`        | Store                 |
| Get Store Configurations       | v1.1    | GET    | `v1.1/store/configurations` | Store                 |
| Verify Login Credentials       | v1.1    | GET    | `v1.1/store/login`          | Store                 |
| Get Store Details              | v1      | GET    | `v1/store/get`              | Store                 |
| Get Store Staff Details        | v1      | GET    | `v1/store/staff`            | Store                 |
| Get Store Tasks                | v1      | GET    | `v1/store/tasks`            | Store                 |
| Verify Store Login Credentials | v1      | GET    | `v1/store/login`            | Store                 |
| Upload Store Logs              | v1      | POST   | `v1/store/logs`             | Store                 |
| Upload Store Reports           | v1      | POST   | `v1/store/reports`          | Store                 |
| Get Store Reports              | v1      | GET    | `v1/store/reports`          | Store                 |
| Get Store Configurations       | v1      | GET    | `v1/store/configurations`   | Store                 |
| Verify Login Credentials       | v1      | GET    | `v1/store/login`            | Store                 |

***

### Target group

| Title                             | Version | Method | API endpoint                                                         | Access group resource |
| --------------------------------- | ------- | ------ | -------------------------------------------------------------------- | --------------------- |
| Deactivate target                 | v3      | DELETE | `v3/targetGroups/{groupId}/targets/{targetId}`                       | Target Loyalty        |
| Create target groups              | v3      | POST   | `v3/targetGroups`                                                    | Target Loyalty        |
| Get target groups                 | v3      | GET    | `v3/targetGroups/{targetGroupId}`                                    | Target Loyalty        |
| Get target periods                | v3      | GET    | `v3/targetGroups/{targetGroupId}/targetPeriods`                      | Target Loyalty        |
| Get targets details               | v3      | GET    | `v3/targetGroups/{targetGroupId}/targets`                            | Target Loyalty        |
| Get target communication template | v3      | GET    | `v3/targetGroups/{targetGroupId}/targets/{targetId}/communications`  | Target Loyalty        |
| Upsert target communication       | v3      | POST   | `v3/targetGroups/{groupId}/targets/{targetId}/communications/upsert` | Target Loyalty        |
| Get target channels               | v3      | GET    | `v3/targetGroups/channels`                                           | Target Loyalty        |
| Delete target group               | v3      | DELETE | `v3/targetGroups/{groupId}`                                          | Target Loyalty        |
| Create target period              | v3      | POST   | `v3/targetGroups/{groupId}/targetPeriods`                            | Target Loyalty        |
| Update target period              | v3      | PUT    | `v3/targetGroups/{groupId}/targetPeriods`                            | Target Loyalty        |
| Create targets                    | v3      | POST   | `v3/targetGroups/{groupId}/targets`                                  | Target Loyalty        |
| Modify targets                    | v3      | PUT    | `v3/targetGroups/{groupId}/targets/{targetId}`                       | Target Loyalty        |
| Target group                      | v3      | GET    | `v3/users/{userId}/targetGroups`                                     | Target Loyalty        |

***

### Tasks

| Title                        | Version | Method | API endpoint              | Access group resource |
| ---------------------------- | ------- | ------ | ------------------------- | --------------------- |
| Add Tasks                    | v1.1    | POST   | `v1.1/task/add`           | Task                  |
| Update Tasks                 | v1.1    | POST   | `v1.1/task/update`        | Task                  |
| Get Tasks Metadata           | v1.1    | GET    | `v1.1/task/metadata`      | Task                  |
| Get Task Logs                | v1.1    | GET    | `v1.1/task/log`           | Task                  |
| Update Status Mappings       | v1.1    | POST   | `v1.1/task/statusmapping` | Task                  |
| Get Status Mappings          | v1.1    | GET    | `v1.1/task/statusmapping` | Task                  |
| Get Task Reminders           | v1.1    | GET    | `v1.1/task/reminder`      | Task                  |
| Create/Update Task Reminders | v1.1    | POST   | `v1.1/task/reminder`      | Task                  |
| Add Tasks                    | v1      | POST   | `v1/task/add`             | Task                  |
| Update Tasks                 | v1      | POST   | `v1/task/update`          | Task                  |
| Get Tasks Metadata           | v1      | GET    | `v1/task/metadata`        | Task                  |
| Get Task Logs                | v1      | GET    | `v1/task/log`             | Task                  |
| Update Status Mappings       | v1      | POST   | `v1/task/statusmapping`   | Task                  |
| Get Status Mappings          | v1      | GET    | `v1/task/statusmapping`   | Task                  |
| Get Task Reminders           | v1      | GET    | `v1/task/reminder`        | Task                  |
| Create/Update Task Reminders | v1      | POST   | `v1/task/reminder`        | Task                  |
| Get Task Logs                | v2      | GET    | `v2/task/log`             | Task                  |
| Get Tasks Metadata           | v2      | GET    | `v2/task/metadata`        | Task                  |
| Update Status Mappings       | v2      | POST   | `v2/task/statusmapping`   | Task                  |
| Get Status Mappings          | v2      | GET    | `v2/task/statusmapping`   | Task                  |

***

### Transaction

| Title                                     | Version | Method | API endpoint                                    | Access group resource |
| ----------------------------------------- | ------- | ------ | ----------------------------------------------- | --------------------- |
| Add/Return Transaction (bulk)             | v2      | POST   | `v2/transactions/bulk`                          | Transaction           |
| Add/Return transaction (single)           | v2      | POST   | `v2/transactions`                               | Transaction           |
| Update Transaction                        | v2      | PUT    | `v2/transactions`                               | Transaction           |
| Get Transaction Details                   | v2      | GET    | `v2/transactions/{id}`                          | Transaction           |
| Get transaction details using bill number | v2      | GET    | `v2/transactions/getByBillNumber/{bill_number}` | Transaction           |
| Add Transaction                           | v1.1    | POST   | `v1.1/transaction/add`                          | Transaction           |
| Add Transaction with Local Currency       | v1.1    | POST   | `v1.1/transaction/add_with_local_currency`      | Transaction           |
| Update Transaction Details                | v1.1    | POST   | `v1.1/transaction/update`                       | Transaction           |
| Get Transaction Details                   | v1.1    | GET    | `v1.1/transaction/get`                          | Transaction           |
| Add Transaction                           | v1      | POST   | `v1/transaction/add`                            | —                     |
| Add Transaction with Local Currency       | v1      | POST   | `v1/transaction/add_with_local_currency`        | —                     |
| Update Transaction Details                | v1      | POST   | `v1/transaction/update`                         | —                     |
| Get Transaction Details                   | v1      | GET    | `v1/transaction/get`                            | —                     |

***

### Transaction rejection

| Title                   | Version | Method | API endpoint                                            | Access group resource |
| ----------------------- | ------- | ------ | ------------------------------------------------------- | --------------------- |
| getRejectedTransactions | v2      | GET    | `v2/rejectedTransactions`                               | Transaction           |
| getReTriggerStatus      | v2      | GET    | `v2/rejectedTransactions/retriggerStatus/{retriggerId}` | Transaction           |
| markFailed              | v2      | PUT    | `v2/rejectedTransactions/markFailed`                    | Transaction           |
| retriggerTransactionAdd | v2      | POST   | `v2/rejectedTransactions/retrigger`                     | Transaction           |

***

### User authentication

| Title           | Version | Method | API endpoint                  | Access group resource |
| --------------- | ------- | ------ | ----------------------------- | --------------------- |
| Register User   | v2      | POST   | `v2/user_auth/register`       | Customer              |
| Authorize User  | v2      | POST   | `v2/user_auth/authorize_user` | Customer              |
| Update Password | v2      | POST   | `v2/user_auth/update`         | Customer              |

***

### User group

| Title                                                        | Version | Method | API endpoint                            | Access group resource |
| ------------------------------------------------------------ | ------- | ------ | --------------------------------------- | --------------------- |
| Add Group                                                    | v2      | POST   | `v2/userGroup2`                         | User Groups           |
| Update User Group                                            | v2      | PUT    | `v2/userGroup2`                         | User Groups           |
| Search user groups by name, ID, and mobile number            | v2      | GET    | `v2/userGroup2/search`                  | User Groups           |
| Delete User Group                                            | v2      | DELETE | `v2/userGroup2`                         | User Groups           |
| Join Member to Group                                         | v2      | POST   | `v2/userGroup2/join`                    | User Groups           |
| Remove group member                                          | v2      | DELETE | `v2/userGroup2/{groupId}/leave`         | User Groups           |
| Transfer Group Member                                        | v2      | POST   | `v2/userGroup2/transfer`                | User Groups           |
| Get group transactions                                       | v2      | GET    | `v2/userGroup2/transactions`            | User Groups           |
| Retrieve user group members list                             | v2      | GET    | `v2/userGroup2`                         | User Groups           |
| Retrieve user group members list with cards & status details | v2      | GET    | `v2/userGroup2/members`                 | User Groups           |
| Retrieve Primary & Secondary Member Details                  | v2      | GET    | `v2/userGroup2`                         | User Groups           |
| Retrieve group slab/tier log history                         | v2      | GET    | `v2/userGroup2/slabHistory`             | User Groups           |
| Retrieve group ledger information                            | v2      | GET    | `v2/pointsLedger/getCustomerLedgerInfo` | Points                |
| Retrieve points expiry schedule of a group                   | v2      | GET    | `v2/userGroup2/pointsExpirySchedule`    | User Groups           |
| Retrieve points conversion schedule                          | v2      | GET    | `v2/userGroup2/promisedPointsSchedule`  | User Groups           |

***

### Activity Sessions

| Title                     | Version | Method | API endpoint                                 | Access group resource |
| ------------------------- | ------- | ------ | -------------------------------------------- | --------------------- |
| Create Activity Session   | v2      | POST   | `v2/activitySessions`                        | Activity Sessions     |
| Get Activity Session      | v2      | GET    | `v2/activitySessions/{sessionId}`            | Activity Sessions     |
| Add Activities to Session | v2      | POST   | `v2/activitySessions/{sessionId}/activities` | Activity Sessions     |
| End Activity Session      | v2      | POST   | `v2/activitySessions/{sessionId}/endSession` | Activity Sessions     |

***

### Cart Promotions

| Title                          | Version | Method | API endpoint                                        | Access group resource |
| ------------------------------ | ------- | ------ | --------------------------------------------------- | --------------------- |
| Create Cart Promotion          | v1      | POST   | `api_gateway/v1/promotions`                         | —                     |
| Update Cart Promotion          | v1      | PUT    | `api_gateway/v1/promotions/{promotionId}`           | —                     |
| Evaluate Cart Promotions       | v1      | POST   | `api_gateway/v1/promotions/evaluate`                | —                     |
| Redeem Cart Promotion          | v1      | POST   | `api_gateway/v1/promotions/redemptions`             | —                     |
| Get Cart Promotion Redemptions | v1      | GET    | `api_gateway/v1/promotions/redemptions`             | —                     |
| Earn Cart Promotion            | v1      | POST   | `api_gateway/v1/promotions/{promotionId}/earn`      | —                     |
| Issue Cart Promotions in Bulk  | v1      | POST   | `api_gateway/v1/promotions/{promotionId}/issueBulk` | —                     |
| Earn Cart Promotions in Bulk   | v1      | POST   | `api_gateway/v1/promotions/earn/bulk`               | —                     |

***

### Custom Fields

| Title                              | Version | Method | API endpoint                | Access group resource    |
| ---------------------------------- | ------- | ------ | --------------------------- | ------------------------ |
| Get Org Extended Fields            | v2      | GET    | `v2/extendedFields`         | Organization Data Fields |
| Configure Org Extended Fields      | v2      | POST   | `v2/org/extendedFields`     | Organization Data Fields |
| Get Org Extended Fields (org path) | v2      | GET    | `v2/org/extendedFields`     | Organization Data Fields |
| Get Extended Fields Meta           | v2      | GET    | `v2/org/extendedFieldsMeta` | Organization Data Fields |
| Get Custom Fields                  | v2      | GET    | `v2/org/customFields`       | Organization Data Fields |
| Create Custom Field                | v2      | POST   | `v2/customFields`           | Organization Data Fields |
| Get All Custom Fields              | v2      | GET    | `v2/customFields`           | Organization Data Fields |
| Get Entity Extended Fields         | v2      | GET    | `v2/entity/extendedFields`  | Organization Data Fields |

***

### Global Search

| Title         | Version | Method | API endpoint       | Access group resource |
| ------------- | ------- | ------ | ------------------ | --------------------- |
| Search Entity | v2      | GET    | `v2/search/entity` | —                     |

***

### Locations

| Title         | Version | Method | API endpoint   | Access group resource |
| ------------- | ------- | ------ | -------------- | --------------------- |
| Get Locations | v2      | GET    | `v2/locations` | Organization          |
| Add Location  | v2      | POST   | `v2/locations` | Organization          |

***

### Loyalty Promotions

| Title                       | Version | Method | API endpoint                                     | Access group resource |
| --------------------------- | ------- | ------ | ------------------------------------------------ | --------------------- |
| Create Loyalty Promotion    | v3      | POST   | `v3/promotions`                                  | —                     |
| Get All Loyalty Promotions  | v3      | GET    | `v3/promotions`                                  | —                     |
| Get Loyalty Promotion by ID | v3      | GET    | `v3/promotions/{promotionId}`                    | —                     |
| Update Loyalty Promotion    | v3      | PUT    | `v3/promotions/{promotionId}`                    | —                     |
| Enrol Members in Promotion  | v3      | POST   | `v3/promotions/enrol`                            | —                     |
| Review Loyalty Promotion    | v3      | POST   | `v3/promotions/{promotionId}/review`             | —                     |
| Get Member Promotions       | v3      | GET    | `v3/members/{memberId}/promotions`               | —                     |
| Get Member Promotion by ID  | v3      | GET    | `v3/members/{memberId}/promotions/{promotionId}` | —                     |

***

### Loyalty Promotions (Legacy)

| Title                      | Version | Method | API endpoint                           | Access group resource |
| -------------------------- | ------- | ------ | -------------------------------------- | --------------------- |
| Issue Promotion            | v2      | POST   | `v2/promotion/issue`                   | Customer              |
| Create Promotion           | v2      | POST   | `v2/promotion/create`                  | Customer              |
| Bulk Direct Earn           | v2      | POST   | `v2/promotion/bulk/directEarn`         | Customer              |
| Bulk Enrol and Earn        | v2      | POST   | `v2/promotion/bulk/enrolAndEarn`       | Customer              |
| Bulk Revoke Direct Earn    | v2      | POST   | `v2/promotion/bulk/revokeDirectEarn`   | Customer              |
| Bulk Revoke Enrol and Earn | v2      | POST   | `v2/promotion/bulk/revokeEnrolAndEarn` | Customer              |

***

### Simulation

| Title                | Version | Method | API endpoint                 | Access group resource |
| -------------------- | ------- | ------ | ---------------------------- | --------------------- |
| Simulate Transaction | v2      | POST   | `v2/simulation/transactions` | Event Simulation      |

***

### Survey

| Title                     | Version | Method | API endpoint                              | Access group resource |
| ------------------------- | ------- | ------ | ----------------------------------------- | --------------------- |
| Get Surveys               | v2      | GET    | `v2/survey`                               | Survey                |
| Get Survey Questions      | v2      | GET    | `v2/survey/questions`                     | Survey                |
| Get Survey Question       | v2      | GET    | `v2/survey/question`                      | Survey                |
| Submit Survey Responses   | v2      | POST   | `v2/survey/responses`                     | Survey                |
| Get Survey Responses      | v2      | GET    | `v2/survey/responses`                     | Survey                |
| Lookup Survey Question    | v2      | GET    | `v2/survey/questions/lookup/{externalId}` | Survey                |
| Get Survey Question by ID | v2      | GET    | `v2/survey/questions/{surveyQuestionId}`  | Survey                |

<br />