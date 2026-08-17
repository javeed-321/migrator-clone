---
updatedAt: 2026-03-04T06:05:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Dimensions & attributes

## A

### admin\_user

| Attribute                                                                 | Values | Description                                                   |
| :------------------------------------------------------------------------ | :----- | :------------------------------------------------------------ |
| first\_name, middle\_name, last\_name, is\_active, is\_deleted, id, email | -      | Same as user dimension. Refer to the U table for more details |
| is\_active                                                                | 0, 1   | Whether the user is active (1) or inactive (0)                |
| is\_deleted                                                               | 0, 1   | Whether the user is deleted (1) or not                        |

### awarded\_type

| Attribute | Values                                                                                                                                              | Description                                                      |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| points    | POINT\_AWARDED, POINT\_AWARDED\_BILL\_PROMOTION, POINT\_AWARDED\_LINEITEM, POINT\_AWARDED\_LINEITEM\_PROMOTION, POINT\_AWARDED\_CUSTOMER\_PROMOTION | Points awarded through a loyalty program or promotional program. |

*Point awarded: Total number of points awarded\&#xA;*&#x20;Point awarded bill promotion: Bill level promotional points awarded\
*Point awarded lineitem: Points awarded at lineitem level\&#xA;*&#x20;Point awarded lineitem promotion: Lineitem level promotion points awarded

* Point awarded customer promotion: Customer level promotion points awardedWithin a transaction it also highlights whether awarded type point was at a product level or not |

### awarded\_zone\_till

| Attribute | Values   | Description                                                                       |
| --------- | -------- | --------------------------------------------------------------------------------- |
| points    | Till\_ID | TILL id from which points are awarded. This works on the basis of store hierarchy |

## B

### badgemeta

| Attribute     | Values           | Description                                                                           |
| ------------- | ---------------- | ------------------------------------------------------------------------------------- |
| badgeRank     | 1,2,3...         | The rank of a badge within a group.                                                   |
| groupRank     | 1,2,3,4          | The hierarchical order of various groups, determining their priority.                 |
| expiresOn     | Date             | Expiry date of the badge.                                                             |
| isActive      | true, false      | Indicates whether the badge is currently active.                                      |
| startOn       | Date             | Timestamp indicating when the badge starts.                                           |
| badgeMetaId   | String value     | Unique identifier for each badge. This is generated during the creation of the badge. |
| earnType      | earn, issue earn | The method the brand has used to issue the badge, either "earn" or "issue earn".      |
| badgeName     | String value     | Name of the badge.                                                                    |
| groupName     | String value     | Name of the badge group.                                                              |
| groupIsActive | true, false      | Indicates whether the group is currently active or not.                               |
| badgeGroupId  | String value     | Unique identifier for the badge group.                                                |

### badges\_owner\_type

| Attribute | Values | Description                                                                                                                                                                                                       |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | 1 to 9 | The module for which the badge is created. Possible values are - Referral\_Campaigns, Audience\_Campaigns, Membercare, Rewards\_Catalog, Milestones, Historical\_Import, Journeys, Goodwill\_Module, and Loyalty. |

### bill\_type

| Attribute | Values                   | Description                                                                                                                                                                |
| --------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | REGULAR, NOT\_INTERESTED | Type of bill based on loyalty status of customers.<br  />Regular for transactions with customer tagging and not\_interested for transactions without any customer tagging. |

### booking\_type

| Attribute     | Values                     | Description |
| ------------- | -------------------------- | ----------- |
| booking\_type | dine\_in, delivery, pickup | -           |

## C

### campaign\_delivery\_status

| Attribute                    | Values                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Description |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Attributes explained below   | status\_id, veneno\_status\_label, campaign\_legend\_status\_id, campaign\_legend\_lebel                                                                                                                                                                                                                                                                                                                                                                                                                                  |             |
| (attributes explained below) |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |             |
| status\_id                   | -3 to 30                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |             |
| veneno\_status\_label        | DELAYED\_DELIVERY, CLICKED, OPENED, SENT, DELIVERED, NOT\_DELIVERED, FAILED, SENT\_TO\_NSADMIN, SENT\_TO\_CALL\_TASK, BLOCKED, DND\_BLOCKED, NDNC\_BLOCKED, CREDIT\_LIMIT\_EXCEEDED, RELEVENCE\_TIMEOUT, PARTIAL\_RESPONSE, RATE\_LIMIT\_EXCEEDED, IN\_GTW, HARD\_BOUNCED, SOFT\_BOUNCED, TIMEOUT, RETRY\_TIMEOUT, HANDLER\_NOT\_FOUND, OPENED\_INTOUCH, CLICKED\_INTOUCH, MARKED\_SPAM, GTW\_NOT\_FOUND, ORG\_DISABLED, MARKED\_UNSUBSCRIBED, SUBSCRIPTION\_SERVICE\_ERROR, GTW\_PROCESSED, MOBILE\_WHITELISTED\_BLOCKED |             |
| campaign\_legend\_status\_id | 0-13                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |             |
| campaign\_legend\_lebel      | Not Delivered, Clicked, Opened, Sent, Delivered, Not Delivered, System Error, About to send, Customers cannot be targeted, Bounced, Marked Spam, Configuration issue, Marked Unsubscribe, Users not whitelisted                                                                                                                                                                                                                                                                                                           |             |

### campaign\_group

| Attribute                                                                                                            | Values                  | Description                                                         |
| :------------------------------------------------------------------------------------------------------------------- | :---------------------- | :------------------------------------------------------------------ |
| campaign start date, campaign end date, group type, name, campaign, group\_version\_number, roi\_type, is\_recurring | -                       | Consists of campaign level attributes                               |
| is\_recurring                                                                                                        | true, false             | Whether the campaign is a recurring campaign or a one-time campaign |
| campaign start date                                                                                                  |                         | Start date of a campaign                                            |
| campaign end date                                                                                                    |                         | End date of a campaign                                              |
| group\_type                                                                                                          | test, control, all      |                                                                     |
| name                                                                                                                 | campaign group name     |                                                                     |
| campaign                                                                                                             | campaign name           | Name of the campaign                                                |
| roi\_type                                                                                                            | onetime, birthday\_comm |                                                                     |
| group\_version\_number                                                                                               |                         | Version number of the campaign group as in the source               |

### campaign\_message

| Attribute             | Values                                   | Description                                  |
| :-------------------- | :--------------------------------------- | :------------------------------------------- |
| campaign\_start\_date |                                          |                                              |
| msg\_type             |                                          |                                              |
| id                    |                                          |                                              |
| is\_recurring         | true, false                              |                                              |
| guid                  |                                          |                                              |
| scheduled\_type       | SCHEDULED, PARTICULAR\_DATE, IMMEDIATELY |                                              |
| status                | OPEN, SENT, REJECTED                     |                                              |
| campaign              | Campaign names                           | Name of a campaign as defined while creating |
| campaign\_end\_date   |                                          | End date of a campaign                       |

### campaign\_schedule\_date

| Attribute     | Values | Description                                                                                |
| ------------- | ------ | ------------------------------------------------------------------------------------------ |
| date-property | -      | Date when the campaign is Scheduled (Date property). Refer to the D table for more details |

### cashier\_discount\_reason

| Attribute                     | Values                                                                                                                                                                                                 | Description |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| reason, auto\_update\_cashier | Reason: manager\_discount, gift\_card\_discount, employee\_discount, member\_discount, incorrect\_label, advertisement, wrong\_display, bulk\_customer, wrong\_scan, customer, display, faulty, damage | -           |

### channel\_account

| Attribute                                                                                         | Values | Description |
| ------------------------------------------------------------------------------------------------- | ------ | ----------- |
| channel\_account\_id, auto\_update\_org\_channel\_accounts, account\_name, auto\_update\_channels | -      |             |

### communication\_channel

The mode of communication with the customer

| Attribute      | Values                                     | Description |
| :------------- | :----------------------------------------- | :---------- |
| channel        | sms, email, wechat, android and IOS        |             |
| activity\_name | SendSMSActivity, SendEmailActivity, Others |             |

### communication\_type

| Attribute | Values                                       | Description                                                                                                                                                                                                                                                     |
| --------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type      | trans, trans\_emf, bulk\_test, bulk\_control | Communication category via. which a customer was contacted. <br  />Trans for transaction message, trans\_emf for transactions generated through emf, bulk\_test for bulk messages sent to test group, and bulk\_control for bulk messages sent to control group |

### Concept Hierarchy

It is a logical grouping of stores. For example, electronics, jewelry, apparels and so on

| Attribute     | Values                                  | Description                                                                                                                     |
| ------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| concept\_name | Concept names as defined for the client | If store require classification which are non-geographic, concepts are used,for example store in mall or store outside mall etc |

### coupon\_issual\_type

| Attribute | Values            | Description                                                                                                                                                                                                    |
| --------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coupon    | Single, Bulk, NCA | If multiple coupons are issued for a campaign, it is termed as bulk coupon issual type.<br  />If a single coupon is issued as a response to a bounce back campaign, it is termed as single coupon issual type. |

### coupon\_series

| Attribute                | Values                                     | Description                   |
| :----------------------- | :----------------------------------------- | :---------------------------- |
| campaign                 |                                            | Name of a campaign            |
| discount\_value          |                                            | Discount amount of a campaign |
| series\_id               |                                            |                               |
| owner\_valid\_till\_date |                                            |                               |
| campaign\_id             |                                            | Unique ID of the campaign     |
| description              |                                            |                               |
| discount\_code           |                                            |                               |
| series\_type             | campaign, goodwill, DVS, loyalty, timeline |                               |
| client\_handling\_type   |                                            |                               |
| discount\_type           | ABS, PERC                                  |                               |
| valid\_till\_date        |                                            |                               |
| expiry\_strategy\_type   | days, series\_expiry                       |                               |
| expiry\_strategy\_value  |                                            |                               |

### customer\_slab

| Attribute                        | Values | Description                                                                                                                                                                                               |
| -------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| slab\_no, slab\_name, serial\_no | -      | slab\_name: Name of a loyalty tier as defined in the organization's loyalty program. <br  />slab\_no: Tier number as per the source<br  />serial\_no: Order of a tier. For example, 1 for the lowest tier |

## D

### date

Denotes time range selection for events like transaction, registration and campaign communication

| Attribute         | Values                                         | Description                                                                                  |
| :---------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Year              |                                                | Year in YYYY format                                                                          |
| Quarter           | Q1, Q2, Q3, Q4 followed by year in YYYY format | Quarter (Q1, Q2, Q3, Q4) along with the respective year. For example, Q3, 2019               |
| Quarter\_no       |                                                | Quarter number starting from the year 1901                                                   |
| Year\_quarter\_no |                                                | Quarter number with respect to the calendar year- 1 for Q1, 2 for Q2, 3 for Q3, and 4 for Q4 |
| Month             |                                                | Month of the event along with the year. For example, Dec, 2019                               |
| Data              |                                                | Date of the event in 'YYYY-MM-DD' format                                                     |

### deduction type

| Attribute       | Values                                            | Description                                                                                                                                                                                                                                                                                                        |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Points          | Expired, Migration, Redeemed, Return              | Entry through which points were deducted from customers account. <br  /> Redeemed: Points that were redeemed against transactions <br  /> Expired: Points that were expired as per expiry strategy <br  /> Migration: Points that are migrated <br  /> Return: Points that were reverted due to transaction return |
| Delivery Status | campaign delivery status, NSAdmin delivery status | Delivery status of a communication sent to a customer. <br  /> campaign delivery status is the delivery status given by the final third party gateway which pushes the communication. <br  /> NSAdmin delivery status describes the delivery status given back by the internal gateway of Capillary.               |

## E

### Email Open Date & Time

| Attribution                      | Value | Description                                 |
| :------------------------------- | :---- | :------------------------------------------ |
| Email open date, Email open time |       | Date and time when email was opened         |
| email\_open\_date                |       | Date property when an email is first opened |
| email\_open\_time                |       | Time property when an email is first opened |

### Enabled

| Attribution | Value       | Description                            |
| :---------- | :---------- | :------------------------------------- |
| value       | True, False | Gives the enabled status of the badge. |

## L

### latest\_updated\_date

| Attribute                                                         | Value                                                             | Description                                                                                                                    |
| :---------------------------------------------------------------- | :---------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| Date property. Refer to the Date dimension in table D for details | Date property. Refer to the Date dimension in table D for details | Date when the event is recently updated. Refer to the Date dimension in D table for all attributes and values of date property |

### loyalty\_type

| Attribution | Value                | Description                                               |
| ----------- | -------------------- | --------------------------------------------------------- |
|             | Loyalty, Non-loyalty | This represents to which loyalty type a customer belongs. |

A customer that is part of the organization's loyalty program is a loyalty customer.\
A customer that did not enroll in the organization's loyalty program but registered either mobile number or email id to receive transactional and promotional messages from the organization is a non-loyalty customer. |

## M

### Membership Type

| Attribute | Value                                          | Description                                                                                                                                                                                                                                           |
| :-------- | :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type      | Member, Not-interested, loyalty not-interested | Membership type can be described as Member or Non Member. Customers who shared their personal identifier (mobile, email) with the organization are members and who did not share their personal identifier are non-members (not-interested customers) |

### merge\_status

| Attribute | Values           | Description |
| --------- | ---------------- | ----------- |
| status    | unmerged, merged | -           |

### mongo\_event\_button\_state

| Attribute | Values          | Description |
| --------- | --------------- | ----------- |
| state     | normal, deleted | -Internal-  |

### mongo\_event\_button\_type

| Attribute | Values      | Description |
| --------- | ----------- | ----------- |
| type      | view, click | -           |

## N

### ndnc\_status

| Attribute | Values                      | Description |
| --------- | --------------------------- | ----------- |
| status    | NDNC, INVALID, DND, UNKNOWN | \*\*\*      |

### nps\_score

| Attribute | Values | Description |
| --------- | ------ | ----------- |
| score     | 0-7    | -           |

### nsadmin\_priority

| Attribute | Values              | Description |
| --------- | ------------------- | ----------- |
| priority  | high, default, bulk | -           |

## P

### points\_awarded\_type

| Attribute | Values                                                                                                                                         | Description                                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| type      | Points awarded, points awarded bill promotion, points awarded customer promotion, points awarded line-item, points awarded line-item promotion | Source from which points are allocated to customers. <br  />For example, bill promotion, product promotion, or customer promotion (on birthdays) |

### Points Category

| Attribute | Values                     | Description                                                                                                                                                                         |
| --------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| points    | Redeemable, Non-redeemable | Redeemable points are the issued points that can be redeemed by a customer. <br  />Non-redeemable points are tracker points that can neither be redeemed by a customer nor expired. |

### points\_event\_type

| Attribute | Values                          | Description                                                                                                                                                                         |
| --------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type      | Points awarded, Points deducted | Points allocated to a customer will reflect as points awarded and points were taken off from a customer account (as redeemed, expired, or returned) will reflect as points deducted |

### points\_promotion

| Attribute  | Values                                     | Description                                                        |
| ---------- | ------------------------------------------ | ------------------------------------------------------------------ |
| type, name | -                                          | The promotional event through which points are issued to customers |
| type       | Varies based on the promotion setup        | -                                                                  |
| name       | User defined name of the promotion program | -                                                                  |

### Product

This is a product hierarchy dimension which has a drill down and roll up feature for every department to drill down on the basis of product category, available only after category mapping from configuration page

| Attribute | Values              | Description |
| --------- | ------------------- | ----------- |
| category  | User defined values | -           |

| Attribute    | Values              | Description |
| ------------ | ------------------- | ----------- |
| sub category | User defined values | -           |

| Attribute  | Values              | Description |
| ---------- | ------------------- | ----------- |
| department | User defined values | -           |

### Promotion Type

| Attribute | Values                     | Description                                                                                                                |
| --------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| points    | Customer promo, Bill promo | Represents the source of promotional points awarded to customers - customer level promotion or transaction level promotion |

## S

### Store Hierarchy

A hierarchical store level attribute used to get store level information of KPIs.

| Attribute    | Value                                      | Description                                                                                                                                                                                                                         |
| :----------- | :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| till\_name   | Till names as defined in Capillary system  | Name of the till, this is the lowest entity at a store level, a till is named after a point of sale in a store                                                                                                                      |
| is\_billable | billable, non billable                     | If a store is charged by Capillary to the client , it is termed as billable otherwise its non billable                                                                                                                              |
| store\_city  | City names                                 | City corresponding to a store                                                                                                                                                                                                       |
| store\_name  | Store names as defined in Capillary system | One level above till, this name pertains to the single store                                                                                                                                                                        |
| type         | admin, general                             | General stores are the stores which are actually present with the client, admin stores are virtual or actual stores but 100% used for testing out Capillary process, data from these stores are removed from analysis and reporting |
| till         |                                            | Name of the till, this is the lowest entity at a store level, a till is named after a point of sale in a store                                                                                                                      |
| zone\_name   | zones to which store belong                | These are geographic zones that are used to categorize stores for Zonal Manager's view                                                                                                                                              |
| store        | Client defined store name                  | This is the store name as per the client naming convention used and serves the same purpose as store\_name                                                                                                                          |
| zone         | Zone to which a store belongs              | Geographical zones used to categorize stores                                                                                                                                                                                        |

## T

### Time

Timestamp of events like transaction, registration, and campaign communication

| Attribute  | Value                               | Description                                                                   |
| ---------- | ----------------------------------- | ----------------------------------------------------------------------------- |
| Day\_shift | Morning, afternoon, night, midnight | > =06:00:00 to \ =12:00:00 to \ =16:00:00 to \ =20:00:00 to \ =00:00:00 to \\ |