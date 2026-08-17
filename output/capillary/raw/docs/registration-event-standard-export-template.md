---
updatedAt: 2026-03-04T06:05:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Registration Event Standard Export Template

The registration event template is based on the [registration\_event](https://docs.capillarytech.com/docs/fact_registration-event) fact.

Lets you export the details of the events in which an entity (customer/ store staff) registration takes place.

# Measures

| Measure Name                       | Description                                                                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Activity                           | Specifies the source activity that triggered the registration event. Specifies the source activity that triggered the registration event. Possible values are - wechat\_follow, wechat\_register, tmall\_register, system, website\_register, ecommerce\_register, and jd\_register. |
| Registration Event Rank            | Rank for the event, computed on the Insights side.                                                                                                                                                                                                                                   |
| Auto Update Time Entity Life Cycle | Date and time when the corresponding record in the entity life cycle table available at the source was last updated. It is in the Unix timestamp format.                                                                                                                             |
| Reference Id                       | Represents the request\_id of the API call that resulted in the creation of this entity. For example, it could be the requestId from a customer update call.                                                                                                                         |
| Id                                 | Unique identifier of the table.                                                                                                                                                                                                                                                      |

# Dimensions

| **Dimension Name**                                                                            | **Description**                                                                                                                                        |
| :-------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Entity Type](https://docs.capillarytech.com/docs/dimension-tables#entity-type)               | Identifier for the entity type. Possible values are - Customer, and Store staff.                                                                       |
| [User](https://docs.capillarytech.com/docs/dimension-tables#users-users)                      | User details such as user id, source, slab name, external id, fraud status, mobile, email, etc.                                                        |
| [User Segments](https://docs.capillarytech.com/docs/dimension-tables#users-users)             | Segment details of the customers such as valued customer, lapsed customer.                                                                             |
| [User Attributes](https://docs.capillarytech.com/docs/dimension-tables#users-users)           | User attributes such as total visits, recent view.                                                                                                     |
| [Channel Account](https://docs.capillarytech.com/docs/dimension-tables#channel-account)       | Identifier for the channel where the customer's profile was created. These include Whatsapp, Web\_engage, Mobile\_app, Line, and WeChat.               |
| [State](https://docs.capillarytech.com/docs/dimension-tables#state)                           | Identifier of the status of the registration. Possible values are - Completed, executing, int\_wait, failed, queued, temporary failure, and ext\_wait. |
| [Store Hierarchy (zone till)](https://docs.capillarytech.com/docs/dimension-tables#zone-till) | Identifier for the store, till id.                                                                                                                     |
| [Concept Hierarchy](https://docs.capillarytech.com/docs/dimension-tables#zone-till)           | Identifier for the concept.                                                                                                                            |
| [Ou Hierarchy](https://docs.capillarytech.com/docs/dimension-tables#zone-till)                | Identifier for the organization unit.                                                                                                                  |
| [Date](https://docs.capillarytech.com/docs/dimension-tables#date)                             | Date attributes of the registration.                                                                                                                   |
| [Time](https://docs.capillarytech.com/docs/dimension-tables#time)                             | Time attributes of the registration.                                                                                                                   |
| [Latest Updated Date](https://docs.capillarytech.com/docs/dimension-tables#date)              | Latest date when the data is updated.                                                                                                                  |
| [Latest Updated Time](https://docs.capillarytech.com/docs/dimension-tables#time)              | Latest time when the data is updated.                                                                                                                  |