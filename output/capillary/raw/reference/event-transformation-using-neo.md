---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Event Transformation for Cortex Search

Neo Event Transformation is a service that takes complex customer and transaction events and turns them into a simple, consistent format. This optimizes the event for search indexing. By removing extra layers and standardizing fields, it makes the data easy to search and analyse.

**Custom Event Transformation**

You can also define custom transformations for customer and transaction events. For example, if you want to remove the country code from mobile numbers so users can search without it, you can configure an event transformation using Neo that removes the prefix before the data is indexed. Once you publish and enable this custom logic, any search using just the local mobile number will return the correct results.

## Default Event Transformation Behaviour

If no custom logic is configured, the Cortex Search framework applies  [Global dataflows](https://docs.capillarytech.com/docs/dataflows#dataflows-in-neo) created on Neo for events related to **[Customer](https://eu.intouch.capillarytech.com/extensions/neo/ui/2a793a1f-7367-4219-a74b-dc0d7e3d1c0c/version/list?ruleType=global)** and **[Transaction](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/7739b794-6be1-437d-a53b-6b5a2bf6d0d3/version/37d52c3f-77a0-4ef9-8402-bdea2858fef1?ruleType=global)** entities. This default transformation extracts relevant fields, restructures custom and extended attributes into searchable formats, and standardises identifiers and other commonly used attributes. This ensures that incoming events are consistently formatted and optimised for indexing in Cortex Search. These are applied automatically unless you override them.

## Customising Event Transformation

You can configure a custom event transformation if the default transformation doesn’t meet your organisation’s requirements. This allows you to define how event data should be modified before being indexed in Cortex Search.

To implement a custom transformation, you can [create a new event transformation dataflow](https://docs.capillarytech.com/docs/composing-a-neo_dataflow) in Neo for your organisation. The global dataflows available for both Customer and Transaction events can be used as a starting point. Copy the `Event Router` script from the relevant global dataflow, modify it to suit your needs, and publish your new dataflow.

Once published and [enabled](https://docs.capillarytech.com/reference/enable-custom-event-for-cortex-search) for your organisation, this custom logic will override the global transformation for that entity type and will be applied to new search criteria that you create.  You can [disable ](https://docs.capillarytech.com/reference/enable-custom-event-for-cortex-search)the custom config using the API and can also apply other custom logic as per your requirement. Only one active custom configuration can exist for a given entity type within an organisation at any time.

### Benefits

* **Organization-Specific Transformations:** Configure transformations tailored to your organization's needs
* **Per-Entity Type Configuration:** Set different transformation endpoints for customers, transactions, and other entity types
* **Flexible Deployment:** Use either organization-specific or global default transformations
* **Easy Management:** Simple API for creating, updating, and managing transformation configurations
* **Enhanced Transformation Capabilities:** Support for complex business logic that goes beyond simple mapping

> 👍 Note
>
> Ensure your custom transformation endpoint includes proper error handling and returns descriptive error messages when transformations fail.

# Examples for Custom Transformation

## Transaction Events Example

### **Configuration**

```json
{
  "orgId": 15511,
  "entityType": "TRANSACTION",
  "transformEndpoint": "/transform/transaction/custom",
  "active": true
}
```

### **Input Event**

```json
{
  "eventId": "756748cd-54a5-41ab-ac7e-ecc47b34e1df",
  "eventType": "15511_transactionAdded",
  "consumerGroupId": "",
  "actionType": "START",
  "timeStamp": 1683543603022,
  "attributes": {
    "eventName": "transactionAdded",
    "data": {
      "amount": 200,
      "billNumber": "2023-05-12_44",
      "enteredAt": 1684836269988,
      "billDate": 1684836269988,
      "transactionId": 2149289332,
      "deliveryStatus": "SHIPPED",
      "billType": "REGULAR",
      "lineItemCount": 2,
      "discount": 10,
      "grossAmount": 110,
      "enteredBy": {
        "id": 15071481,
        "till": {
          "code": "cm.1",
          "name": "cm.1"
        },
        "store": {
          "code": "mergestore1",
          "name": "MERGE FRONT ONE",
          "externalId": "aS123",
          "externalId1": "Q123",
          "externalId2": "ASDA123"
        }
      },
      "customerIdentifiers": {
        "customerId": 424872520,
        "loyaltyType": "loyalty",
        "instore": {
          "mobile": "919755252060",
          "email": "tomholland@gmail.com"
        }
      },
      "customFields": [
        {
          "key": "field2",
          "value": "10"
        }
      ],
      "extendedFields": [
        {
          "key": "field4",
          "value": "25.24"
        }
      ]
    },
    "orgId": 15511,
    "refId": "15511_2149289332",
    "apiRequestId": "7d408f9c7531f28ef7298a5668eacdd6",
    "createdAt": 1684836270214
  }
}
```

### **Transformed Output**

```json
{
  "eventName": "transactionAdded",
  "amount": 200,
  "billnumber": "2023-05-12_44",
  "enteredAt": 1684836269988,
  "billdate": 1684836269988,
  "entityId": 2149289332,
  "deliveryStatus": "SHIPPED",
  "entityReference": "REGULAR",
  "entityreference": "REGULAR",
  "lineItemCount": 2,
  "discount": 10,
  "grossAmount": 110,
  "additionalfields": {
    "storecode": "mergestore1",
    "storename": "MERGE FRONT ONE"
  },
  "customerIdentifiers": {
    "customerId": 424872520,
    "loyaltyType": "loyalty",
    "instore": {
      "mobile": "919755252060",
      "email": "tomholland@gmail.com"
    }
  },
  "customfields": {
    "field2": "10"
  },
  "extendedfields": {
    "field4": "25.24"
  },
  "orgId": 15511,
  "refId": "15511_2149289332",
  "apiRequestId": "7d408f9c7531f28ef7298a5668eacdd6",
  "createdOn": 1684836270214
}
```

<br />

## Customer Events Example

### **Configuration**

```json
{
  "orgId": 150698,
  "entityType": "CUSTOMER",
  "transformEndpoint": "/cortex/transform/customer",
  "active": true
}
```

### Input Event

```json
{
    "eventId": "81b1f0ce-8119-4826-9cca-610bd31d4038",
    "eventType": "150698_customerAdded",
    "consumerGroupId": null,
    "actionType": "START",
    "timeStamp": 1683874799984,
    "attributes": {
        "createdAt": 1683874799971,
        "data": {
            "loyaltyType": "LOYALTY",
            "source": "instore",
            "firstName": "ROSMA",
            "lastName": "DEW I",
            "enteredAt": 1683883798000,
            "enteredBy": {
                "id": 200320889,
                "till": {
                    "code": "kanmo.idn.mothercare.rpm",
                    "name": "kanmo.idn.mothercare.rpm"
                },
                "store": {
                    "code": "kanmo.idn.mother care.rpm",
                    "name": "Mothercare RSIA Paramount Makassar",
                    "externalId": "MOTHERCARERPM",
                    "externalId1": "",
                    "externalId2": ""
                }
            },
            "customerIdentifiers": {
                "customerId": 164875382,
                "instore": {
                    "mobile": "6282396092287",
                    "email": "tomneo@gmail.com",
                    "externalId": "226682932023"
                }
            },
            "customFields": [
                {
                    "key": "MembershipLevel",
                    "value": "Gold"
                }
            ],
            "extendedFields": [
                {
                    "key": "PreferredLanguage",
                    "value": "English"
                }
            ]
        },
        "eventName": "customerAdded",
        "refId": "150698_164875382",
        "apiRequestId": "0c52fc98594959bf0d577218bf565798",
        "orgId": 150698
    }
}
```

### Transformed Output

```json
{
    "createdOn": 1683874799971,
    "loyaltyType": "LOYALTY",
    "source": "instore",
    "firstname": "ROSMA",
    "lastname": "DEW I",
    "enteredAt": 1683883798000,
    "additionalfields": {
        "storecode": "kanmo.idn.mother care.rpm"
    },
    "customfields": {
        "membershiplevel": "Gold"
    },
    "extendedfields": {
        "preferredlanguage": "English"
    },
    "entityId": 164875382,
    "instore": {
        "mobile": "6282396092287",
        "email": "tomneo@gmail.com",
        "externalId": "226682932023"
    },
    "web_engage": {},
    "wechat": {},
    "entityReference": "instore_",
    "fullname": "ROSMA DEW I",
    "eventName": "customerAdded",
    "refId": "150698_164875382",
    "apiRequestId": "0c52fc98594959bf0d577218bf565798",
    "orgId": 150698
}
```