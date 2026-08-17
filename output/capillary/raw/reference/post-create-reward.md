---
updatedAt: 2026-08-03T07:20:44.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Create Reward

This API creates a new reward in Capillary. You can define various attributes for the reward, such as type, priority, category, redemption type, and vendor details. The API supports adding custom fields, rich-text content, and mapping the reward to specific loyalty programs, tiers, segments, or supplementary programs for catalog personalization.

# Example request

```curl Sample request
curl --location 'https://eu.api.capillarytech.com/api_gateway/rewards/core/v1/reward/create' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic bWFkaHzI3MjU2YQ==' \
--header 'Cookie: _cfuvid=QnNsjQy2xw_5IexMyp1lVPVBlGdYOX.2APjTsu0a.2Y-1763380682991-0.0.1.1-604800000' \
--data '{
    /******** Mandatory parameters *********/
    "startTime": "2025-09-16T05:15:00Z",
    "endTime": "2025-09-31T06:00:00Z",
    "type": "VOUCHER",
    "brandId": 61,
    "redemptionType": "INTOUCH_REWARD",
    "languageSpecificInfo": [ //mandatory
        {
            "languageCode": "en", //mandatory
            "name": "UAT Reward 11", //mandatory
            "description": "Test Reward for UAT Team",
            "enabled": true, //mandatory
            "richContentRO": {
                "UAT_RCT_1": {
                    "content": "Rich Content Text for UAT",
                    "isEnabled": true
                }
            }//,
            // "customFields": { "UAT_CF_9": "EV1" }
        }
    ],
    /******** Non Mandatory Parameters ********/
    "enabled": true,
    "priority": "1",
    // "tier": "Emerald",
    // "intouchPoints": 100, Use payments config block instead
    "intouchSeriesId": "844312",
    "categories": [
        486
    ],
    // "vendorRedemption": "2846",
    "paymentConfigs": [
       {
            "paymentMode": "POINTS",
            // "conversionRatio":0.33,
            "points": 100
        }
    ]//,
    // "restrictions": {
    //     "rewardLevel": [
    //         {
    //             "kpi": "REDEMPTION_VALUE",
    //             "windowType": "FIXED",
    //             "repeatFrequencyType": "WEEKS",
    //             "weekStartDay": "TUESDAY",
    //             "limit": 2
    //         }
    //     ],
    //     "customerLevel": [
    //         {
    //             "kpi": "REDEMPTION_VALUE",
    //             "windowType": "FIXED",
    //             "repeatFrequencyType": "DAYS",
    //             "startOfCycle": "2025-07-31T00:00:00Z",
    //             "limit": 2,
    //             "interval": 2
    //         },
    //         {
    //             "kpi": "QUANTITY",
    //             "windowType": "FIXED",
    //             "repeatFrequencyType": "MONTHS",
    //             "limit": 6
    //         }
    //     ]
    // }
}
```
```json With rank
{
    "startTime": "2025-09-26T20:00:00Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
  
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1
        }
    ],
    "categories": [
        4
    ],
    "rewardRank":"1",
    "intouchSeriesId": "301233",
    "redemptionType": "INTOUCH_REWARD",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
    "supplementaryCriteriaRO": [
        {
            "loyaltyProgramId": 469,
            "tierIds": null,
            "partnerProgramIds": [
                48
            ]
        },
        {
            "loyaltyProgramId": 690,
            "tierIds": null,
            "partnerProgramIds": null
        }
    ],
    "customFields": {
        "CF1": "Custom field 1"
    },
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With image support
{
    "startTime": "2025-02-06T07:43:30.00Z",
    "endTime": "2026-11-29T05:39:49.00Z",
    "type": "POINTS",
    "brandId": 3,
    "priority": 1,
    "enabled": true,
    "intouchPoints": 1,
    "intouchSeriesId": "6538e3ac60ce5c504144bb07",
    "tier": "SILVER",
    "geography": [
        {
            "countryId": 7
        }
    ],
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": " INTOUCH Enabled",
            "description": "Description",
            "termNConditionsId": "EXDR12987R",
            "imageId": "EXDR12987U",
            "thumbnailId": "EXDR12987T",
            "enabled": true,
            "images": [
                {
                    "name": "imagename1",
                    "id": "9b648b66-5700-4c6d-84ea-01ddf73927c6",
                },
                {
                    "name": "imagename2",
                    "id": "9b648b66-5700-4c6d-84ea-01ddf73927c6"
                },
                {
                    "name": "imagename2",
                    "id": "9b648b66-5700-4c6d-84ea-01ddf73927c6"
                }
            ],
            "videos": [
                {
                    "name": "videoname1",
                    "id": "9b648b66-5700-4c6d-84ea-01ddf73927c6",
                    "isExternal": false
                },
                {
                    "name": "videoname1",
                    "url": "https://www.youtube.com/watch?v=a_aSgmOqgrA",
                    "isExternal": true
                }
            ]
        }
    ],
    "categories": [
        5
    ],
    "redemptionType": "CART_PROMOTION",
    "communications": [
        4
    ],
    "owners": [
        {
            "ownerType": "LOYALTY_PROGRAM",
            "ownerId": "123"
        }
    ]
}
```
```json With multi lingual custom field
{
    "startTime": "2025-03-07T08:53:49.00Z",
    "endTime": "2026-03-14T05:39:49.00Z",
    "type": "POINTS",
    "brandId": "8",
    "priority": 1,
    "enabled": true,
    "intouchPoints": 3,
    "intouchSeriesId": "73684275",
    "tier": "GOLD",
    "geography":
    [
        {
            "countryId": "14"
        }
    ],
    "languageSpecificInfo":
    [
        {
            "name": " INTOUCH Enabledsdqwerty",
            "description": "Description",
            "termNConditions": "ABC",
            "thumbnailId": "EXDR12987T",
            "imageId": "EXDR12987U",
            "enabled": true,
            "termNConditionsId": "EXDR12987R",
            "languageCode": "en",
             "customFields":{
                "mandatory - CF1": "englishvalue1"
            }
        },
        {
            "name": " INTOUCH Enabledsdoiu",
            "description": "Description",
           	"termNConditions": "ABCD",
            "thumbnailId": "EXDR12987T",
            "imageId": "EXDR12987U",
            "enabled": true,
            "termNConditionsId": "EXDR12987R",
            "languageCode": "fr",
             "customFields":{
                "mandatory - CF1": "frenchvalue1",
                "mandatory - CF2":"frenchvalue2"
            }
        }
    ],
    "customFields":{
        "mandatory - CF1": "rewardvalue1",
        "mandatory - CF2": "rewardvalue2"
    },
    "categories":
    [
        "11"
    ],
    "rewardRank":"1",        
    "redemptionType": "INTOUCH_REWARD",
    "communications":
    [
        "11"
    ],
    "vendorRedemption": null,
    "group": null,
    "label": null
}
```
```Text With revenue metadata

{
    "startTime": "2025-03-07T17:04:30.00Z",
    "endTime": "2026-10-31T05:39:49.00Z",
    "rewardRevenueMeta" : [
        {
            "commissionParticipant": "BRAND",
            "commissionRate": "1.0",
            "cycleStartDate": "2025-03-07T17:04:30.000Z",
            "cycleEndDate": "2026-02-06T07:43:30.000Z"
        },
        {
            "commissionParticipant": "AFFILIATE",
            "commissionRate": "1.2",
            "cycleStartDate": "2025-03-07T17:04:30.000Z",
            "cycleEndDate": "2026-02-06T07:43:30.000Z"
        }
    ],
    "rewardRevenueDefaults": [
        {
            "commissionParticipant": "AFFILIATE",
            "defaultValue": "1.1"
        },
        {
            "commissionParticipant": "END_CUSTOMER",
            "defaultValue": "1.3"
        },
        {
            "commissionParticipant": "END_CUSTOMER",
            "defaultValue": "1.3"
        }
    ],
      "type": "VOUCHER",
  "brandId": 3,
  "priority": 1,
  "enabled": true,
  "intouchPoints": 1,
  "intouchSeriesId": "1135336",
  "tier": "SILVER",
  "geography": [
    {
      "countryId": 7
    }
  ],
  "languageSpecificInfo": [
    {
      "languageCode": "en",
      "name": " INTOUCH Enabled",
      "description": "Description",
      "termNConditionsId": "EXDR12987R",
      "imageId": "EXDR12987U",
      "thumbnailId": "EXDR12987T",
      "enabled": true
    }
  ],
  "categories": [
    5
  ],
  "redemptionType": "INTOUCH_REWARD",
  "communications": [
    4
  ],
  "owners":[{
      "ownerType":"LOYALTY_PROGRAM",
      "ownerId":"123"
      }
  ]
  
}
```
```json With payment mode info
{
    "startTime": "2025-09-26T20:00:00Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1
        }
    ],
"paymentConfigs": [
       {
            "paymentMode": "POINTS",
            "points":100
        }
    ],
    "categories": [
        4
    ],
    "rewardRank":"1",
    "intouchSeriesId": "301233",
    "redemptionType": "INTOUCH_REWARD",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
    "supplementaryCriteriaRO": [
        {
            "loyaltyProgramId": 469,
            "tierIds": null,
            "partnerProgramIds": [
                48
            ]
        },
        {
            "loyaltyProgramId": 690,
            "tierIds": null,
            "partnerProgramIds": null
        }
    ],
    "customFields": {
        "CF1": "Custom field 1"
    },
    
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With segment information
 {
"startTime": "2027-10-03T07:47:33Z",
  "endTime": "2030-07-10T09:48:34Z",
  "type": "FREE_VOUCHER",
  "brandId": 3,
  "priority": 1,
  "enabled": true,
  "intouchPoints": 0,
  "intouchSeriesId": "1137472",
  "tier": "SILVER",
  "geography": [
    {
      "countryId": 7
    }
  ],
  "languageSpecificInfo": [
    {
      "languageCode": "en",
      "name": " English",
      "description": "Description",
      "termNConditionsId": "EXDR12987R",
      "imageId": "EXDR12987U",
      "thumbnailId": "EXDR12987T",
      "enabled": true
    }
  ],
  "categories": [
    5
  ],
  "redemptionType": "INTOUCH_REWARD",
  "communications": [
    4
  ]
   ,
 "segment":[
    {
    "segmentId":"6134",
    "partitionId": ["2669"]
    },
    {
    "segmentId":"6136",
    "partitionId": ["2675"]
    }
  ]
}
```
```json With linking reward to multiple group

    "startTime": "2024-07-17T11:00:00.000Z",
    "endTime": "2025-07-11T14:43:00.000Z",
    "priority": 1,
    "groups" : [
        {
            "groupName":"groupName012",
            "groupRank": 8
        },
        {
            "groupName":"groupName013"
            // "groupRank": 6
        }
    ],
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1
        }
    ],

"paymentConfigs": [
       {
            "paymentMode": "POINTS",
            "points":100
        }
    ],

    "categories": [
        4
    ],
    "rewardRank":"1",
    "intouchSeriesId": "350219",
    "redemptionType": "INTOUCH_REWARD",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
 
    "customFields": {
        "CF1": "Custom field 1"
    },
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With multiple payment mode info
{
    "startTime": "2025-09-26T20:00:00Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1
        }
    ],
"paymentConfigs": [
        {
            "paymentMode": "POINTS",
            "points": 150
        },
        {
            "paymentMode": "CASH",
            "cash": 500
        },
        {
            "paymentMode": "POINTS_CASH",
          	"points": 200,
            "cash": 500
        },
    ],
    "categories": [
        4
    ],
    "rewardRank":"1",
    "intouchSeriesId": "301233",
    "redemptionType": "INTOUCH_REWARD",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
    "supplementaryCriteriaRO": [
        {
            "loyaltyProgramId": 469,
            "tierIds": null,
            "partnerProgramIds": [
                48
            ]
        },
        {
            "loyaltyProgramId": 690,
            "tierIds": null,
            "partnerProgramIds": null
        }
    ],
    "customFields": {
        "CF1": "Custom field 1"
    },
    
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With Payment mode as "POINTS"
{
    "startTime": "2025-09-26T20:00:00Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1
        }
    ],
"paymentConfigs": [
        {
            "paymentMode": "POINTS",
            "points": 150
        }
    ],
    "categories": [
        4
    ],
    "rewardRank":"1",
    "intouchSeriesId": "301233",
    "redemptionType": "INTOUCH_REWARD",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
    "supplementaryCriteriaRO": [
        {
            "loyaltyProgramId": 469,
            "tierIds": null,
            "partnerProgramIds": [
                48
            ]
        },
        {
            "loyaltyProgramId": 690,
            "tierIds": null,
            "partnerProgramIds": null
        }
    ],
    "customFields": {
        "CF1": "Custom field 1"
    },
    
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With Payment mode as "CASH"
{
    "startTime": "2025-09-26T20:00:00Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1
        }
    ],
"paymentConfigs": [
        {
            "paymentMode": "CASH",
            "cash": 300
        }
    ],
    "categories": [
        4
    ],
    "rewardRank":"1",
    "intouchSeriesId": "301233",
    "redemptionType": "INTOUCH_REWARD",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
    "supplementaryCriteriaRO": [
        {
            "loyaltyProgramId": 469,
            "tierIds": null,
            "partnerProgramIds": [
                48
            ]
        },
        {
            "loyaltyProgramId": 690,
            "tierIds": null,
            "partnerProgramIds": null
        }
    ],
    "customFields": {
        "CF1": "Custom field 1"
    },
    
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With Payment mode as "POINTS_CASH"
{
    "startTime": "2025-09-26T20:00:00Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1
        }
    ],
"paymentConfigs": [
        {
            "paymentMode": "POINTS_CASH",
            "points": 300,
          	"cash": 200
        }
    ],
    "categories": [
        4
    ],
    "rewardRank":"1",
    "intouchSeriesId": "301233",
    "redemptionType": "INTOUCH_REWARD",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
    "supplementaryCriteriaRO": [
        {
            "loyaltyProgramId": 469,
            "tierIds": null,
            "partnerProgramIds": [
                48
            ]
        },
        {
            "loyaltyProgramId": 690,
            "tierIds": null,
            "partnerProgramIds": null
        }
    ],
    "customFields": {
        "CF1": "Custom field 1"
    },
    
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With Payment mode as "CONV_RATIO"
{
    "name": "testreward1poitu",
    "description": "testreward11",
    "startTime": "2025-09-26T20:00:00Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1
        }
    ],
"paymentConfigs": [
        {
            "paymentMode": "CONV_RATIO",
            "conversionRatio": 0.33
        }
    ],
    "categories": [
        4
    ],
    "rewardRank":"1",
    "intouchSeriesId": "301233",
    "redemptionType": "MILES",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
    "supplementaryCriteriaRO": [
        {
            "loyaltyProgramId": 469,
            "tierIds": null,
            "partnerProgramIds": [
                48
            ]
        },
        {
            "loyaltyProgramId": 690,
            "tierIds": null,
            "partnerProgramIds": null
        }
    ],
    "customFields": {
        "CF1": "Custom field 1"
    },
    
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With Payment mode as "FREE"
{
    "startTime": "2025-09-26T20:00:00Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1
        }
    ],
"paymentConfigs": [
        {
            "paymentMode": "FREE"
        }
    ],
    "categories": [
        4
    ],
    "rewardRank":"1",
    "intouchSeriesId": "301233",
    "redemptionType": "MILES",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
    "supplementaryCriteriaRO": [
        {
            "loyaltyProgramId": 469,
            "tierIds": null,
            "partnerProgramIds": [
                48
            ]
        },
        {
            "loyaltyProgramId": 690,
            "tierIds": null,
            "partnerProgramIds": null
        }
    ],
    "customFields": {
        "CF1": "Custom field 1"
    },
    
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With REDEMPTION_VALUE
{
    "startTime": "2024-08-26T06:29:00.000Z",
    "endTime": "2025-07-11T14:43:00.000Z",
    "priority": 1,
  
    "type": "VOUCHER",
    "brandId": "1",
    "enabled": true,
    "intouchPoints": 500,
    "geography": [
        {
            "countryId": 1 
        }
    ],

"paymentConfigs": [
       {
            "paymentMode": "CONV_RATIO",
            "conversionRatio": 0.33
        }
    ],

    "categories": [
        4
    ],
    "rewardRank":"1",
    "redemptionType": "MILES",
    "vendorRedemption": null,
    "communications": [
        "1"
    ],
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "REDEMPTION_VALUE",
                "limit": 1000,
                "repeatFrequencyType": "MONTHS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 50,
                "repeatFrequencyType": "DAYS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "REDEMPTION_VALUE",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
 
    "customFields": {
        "CF1": "Custom field 1"
    },
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testreward1",
            "description": "testreward1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```json With Labels
{
    "startTime": "2025-11-28T13:56:00.000Z",
    "endTime": "2026-11-28T14:10:00.000Z",
    "type": "FREE_VOUCHER",
    "brandId": 1,
    "priority": 1,
    "enabled": true,
    "intouchPoints": 0,
    "tier": "PLATINUM",
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": " INTOUCH Enabled",
            "description": "Description",
            "termNConditionsId": "EXDR12987R",
            "imageId": "EXDR12987U",
            "thumbnailId": "EXDR12987T",
            "enabled": true
        }
    ],
    "redemptionType": "PHYSICAL_REWARD",
    "labels":[12751,5462]
}
```
```json With Cards
{
    "startTime": "2025-11-28T13:56:00.000Z",
    "endTime": "2026-11-28T14:10:00.000Z",
    "type": "FREE_VOUCHER",
    "brandId": 1,
    "priority": 1,
    "enabled": true,
    "intouchPoints": 0,
    "tier": "PLATINUM",
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": " INTOUCH Enabled",
            "description": "Description",
            "termNConditionsId": "EXDR12987R",
            "imageId": "EXDR12987U",
            "thumbnailId": "EXDR12987T",
            "enabled": true
        }
    ],
    "redemptionType": "PHYSICAL_REWARD",
    "cardSeries":["26NOV2024TRYLEN17","26NOV2024TRYLEN18"]
}
```
```Text with group and label (advanced filtering - old UI)
{
    "startTime": "2025-01-16T10:10:00.000Z",
    "endTime": "2026-11-28T14:10:00.000Z",
    "type": "FREE_VOUCHER",
    "brandId": 61,
    "priority": 1,
    "group":"testgoupfilter",
    "label":"testlabel",

    "enabled": true,
    
    "tier": "PLATINUM",
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": " INTOUCH Enabled",
            "description": "Description",
            "termNConditionsId": "EXDR12987R",
            "imageId": "EXDR12987U",
            "thumbnailId": "EXDR12987T",
            "enabled": true
        }
    ],
    "redemptionType": "PHYSICAL_REWARD"
    
    
}
```
```curl With KPI as Quantity
{
    "startTime": "2025-01-27T08:07:05Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
    "type": "VOUCHER",
    "redemptionType": "MILES",
    "brandId": "1",
    "enabled": true,
   
"paymentConfigs": [
       {
            "paymentMode": "CONV_RATIO",
            "conversionRatio":0.33
        }
    ],
 
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 1000,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "QUANTITY",
                "limit": 1000,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
 
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testcreate1",
            "description": "testcreate1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```curl With KPI as Redemption Value
{
    "startTime": "2025-01-27T08:22:20Z",
    "endTime": "2026-10-31T11:59:30Z",
    "priority": 1,
    "type": "VOUCHER",
    "redemptionType": "MILES",
    "brandId": "1",
    "enabled": true,
    
    
    
    
    
    

"paymentConfigs": [
       {
            "paymentMode": "CONV_RATIO",
            "conversionRatio":0.33
        }
    ],
    
    
    
    
    
    
    
    
    
    
    "restrictions": {
        "customerLevel": [
            {
                "kpi": "REDEMPTION_VALUE",
                "limit": 1000,
                "repeatFrequencyType": "DAYS",
                "interval": "30"
            },
            {
                "kpi": "REDEMPTION_VALUE",
                "limit": 1000,
                "repeatFrequencyType": "MONTHS",
                "interval": "12"
            }
        ],
        "rewardLevel": [
            {
                "kpi": "REDEMPTION_VALUE",
                "limit": 10000,
                "repeatFrequencyType": "NO_LIMIT"
            }
        ]
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "testcreate1",
            "description": "testcreate1",
            "imageId": "bef4d522-2cf8-4fea-8087-376c449d5c85",
            "termNConditions": "t&c",
            "thumbnailId": "c886f064-2b3f-4c19-9e86-7f7e5ab5ae04",
            "termNConditionsId": "820a3d7f-2601-405b-9f56-4a3ba8e9df73",
            "enabled": true
        }
    ],
    "isactive" : true
}
```
```Text With frequency restriction
{
    "intouchPoints": 0,
    "redemptionType": "AUCTION",
    "type": "FREE_VOUCHER",
    "restrictions": {
        "rewardLevel": [
            {
                "kpi": "QUANTITY",
                "windowType": "FIXED",
                "repeatFrequencyType": "WEEKS",
                "weekStartDay": "TUESDAY",
                "limit": 2
            }
        ],
        "customerLevel": [
            {
                "kpi": "QUANTITY",
                "windowType": "FIXED",
                "repeatFrequencyType": "DAYS",
                "startOfCycle": "2025-06-24T13:00:00Z",
                "limit": 2,
                "interval": 2
                
            },
            {
                "kpi": "QUANTITY",
                "windowType": "FIXED",
                "repeatFrequencyType": "MONTHS",
                "limit": 6
            }
        ]
    },
    "languageSpecificInfo": [
        {
            "languageCode": "en",
            "name": "english rewardName",
            "description": "hello",
            "enabled": true
        }   
    ],
    "brandId": 61,
    "enabled": true,
    "startTime": 1742284015000,
    "endTime": 1759564015000    
}
```

# Prerequisites

* Authentication: Basic or OAuth authentication.
* Default access group

# Body parameters

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        .startTime
      </td>

      <td>
        datetime
      </td>

      <td>
        Yes
      </td>

      <td>
        Indicates the start date and time of the reward. It can be set to the present, a future date, or up to 10 years in the past, but cannot be modified once the reward is live. The timestamp must be in UTC format: `YYYY-MM-DDTHH:MM:SSZ` (for example: `2024-11-01T06:00:00Z`). It also accepts Unix Epoch values (for example: `2024-11-01T06:00:00Z` → `1730440800`).
      </td>
    </tr>

    <tr>
      <td>
        .endTime
      </td>

      <td>
        datetime
      </td>

      <td>
        Yes
      </td>

      <td>
        Indicates the end date and time of the reward. It can be set to the present, a future date, or up to 10 years in the past, and remains editable even after the reward is live. The timestamp must be in UTC format: `YYYY-MM-DDTHH:MM:SSZ` (for example: `2026-11-01T06:00:00Z`). It also accepts Unix Epoch values (for example: `2026-11-01T06:00:00Z` → `1782597600`).
      </td>
    </tr>

    <tr>
      <td>
        .priority
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Specifies the order in which rewards are applied. Lower numbers have higher priority. By default, the priority value is 0. Promotions with priority 0 are applied first. Example If there are three reward—A (priority 0), B (priority 1), and C (priority 2) The order of application will be: Reward A(priority 0) Reward A (priority 1) Reward C (priority 2)
      </td>
    </tr>

    <tr>
      <td>
        .type
      </td>

      <td>
        enum
      </td>

      <td>
        Yes
      </td>

      <td>
        Indicates the type of the reward. Supported values: `POINTS`, `PHYSICAL_VOUCHER`, `FREE_VOUCHER`, `VOUCHER`.
      </td>
    </tr>

    <tr>
      <td>
        .group
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines a group to the reward and helps to filter the rewards based on the group name. The maximum number of characters allowed is 255.
      </td>
    </tr>

    <tr>
      <td>
        .rewardExternalId
      </td>

      <td>
        String
      </td>

      <td>
        Optional
      </td>

      <td>
        An external identifier you assign to map this reward to a third-party offer or partner system ID. Must be alphanumeric and unique per brand. If a duplicate value is submitted, the request fails with error code 6081.
      </td>
    </tr>

    <tr>
      <td>
        .label
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines a label to the reward and helps to filter the rewards based on the label name. The maximum number of characters allowed is 255.
      </td>
    </tr>

    <tr>
      <td>
        .brandId
      </td>

      <td>
        long
      </td>

      <td>
        Yes
      </td>

      <td>
        Indicates the unique identifier of the  brand. To retrieve the `brandId`, use the [Retrieve Brand ID](https://docs.capillarytech.com/reference/retrieve-brand-id#/) API
      </td>
    </tr>

    <tr>
      <td>
        .enabled
      </td>

      <td>
        boolean
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates if the reward is enabled. Supported values : `true` , `false`
      </td>
    </tr>

    <tr>
      <td>
        .intouchPoints
      </td>

      <td>
        int
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the number of points required to redeem the reward.
      </td>
    </tr>

    <tr>
      <td>
        .intouchSeriesId
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the unique identifier of the Coupon series ID or cart promotion ID when intouch reward is selected. (Coupon should be active*). NOTE: If the redemptionType provided is handled by an external vendor, the intouchSeriesId field must be null.
      </td>
    </tr>

    <tr>
      <td>
        .tier
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the tier level, e.g., "SILVER". The maximum character limit is 255 characters. Note: Blank input resets the field to null.
      </td>
    </tr>

    <tr>
      <td>
        .geography
      </td>

      <td>
        Array of objects
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines Geographic details, including countryId for restriction.
      </td>
    </tr>

    <tr>
      <td>
        ..countryId
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the ID of the country. Must be a positive value.
      </td>
    </tr>

    <tr>
      <td>
        ..cityId
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the ID of the city.
      </td>
    </tr>

    <tr>
      <td>
        ..areaId
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the ID of the area.
      </td>
    </tr>

    <tr>
      <td>
        ..longitude
      </td>

      <td>
        decimal
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the longitude coordinate.
      </td>
    </tr>

    <tr>
      <td>
        ..latitude
      </td>

      <td>
        decimal
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates thelatitude coordinate.
      </td>
    </tr>

    <tr>
      <td>
        .paymentConfigs
      </td>

      <td>
        Array of objects
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the list of payment mode supported by the reward.
      </td>
    </tr>

    <tr>
      <td>
        ..paymentMode
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the type of payment mode supported to redeem the reward. Supported values: `POINTS`, `FREE`, `CASH`, `POINTS_CASH`, `CONV_RATIO`. Multiple payments are not supported within `FREE` and `CONV_RATIO` modes.
        **Note**: The same payment method cannot be used twice to create a reward. For example, only the first entry will be considered if you use `POINTS` twice as a payment mode.
      </td>
    </tr>

    <tr>
      <td>
        ...cash
      </td>

      <td>
        decimal
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the total amount in cash required to redeem the reward.
      </td>
    </tr>

    <tr>
      <td>
        ...points
      </td>

      <td>
        decimal
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the total amount in points required to redeem the reward.
      </td>
    </tr>

    <tr>
      <td>
        .groups
      </td>

      <td>
        Array of objects
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates an array containing information about groups and rewards associated with reward.
      </td>
    </tr>

    <tr>
      <td>
        ..groupName
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the group name assigned to a set of rewards to organize them based on common themes or purposes.Eg. `electronics` , `clothing`The maximum character limit is 255 characters.
      </td>
    </tr>

    <tr>
      <td>
        ..groupRank
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the priority level assigned to a reward group to determine its display order in the reward catalog.
      </td>
    </tr>

    <tr>
      <td>
        .rewardRank
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the priority level assigned to an individual reward within a group to which determines which one is applied first.
      </td>
    </tr>

    <tr>
      <td>
        .categories
      </td>

      <td>
        Array
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the metadata for the reward to categorize different rewards in different categories for end users. It can be null.
      </td>
    </tr>

    <tr>
      <td>
        .redemptionType
      </td>

      <td>
        enum
      </td>

      <td>
        Yes
      </td>

      <td>
        Defines the type of intouch reward or vendor reward. Supported values: `GAMES`, `AUCTION`, `CART_PROMOTION`, `CASH_WALLET`, `VOUCHER`, `CASH_BACK`, `PHYSICAL_REWARD`, `CHARITY`, `MILES`, `GIFT_CARD`, `SWEEPSTAKES`, `INTOUCH_REWARD`, `CARD_DISC`. Notes: 1. If redemptionType is `MILES`, Payment config is mandatory. 2. `CONV_RATIO` mode is supported only for `CHARITY`, `MILES`, `CASH_WALLET`, `SWEEPSTAKES`, `AUCTION`, `GIFT_CARD`, `PHYSICAL_REWARD` type of redemption types. 3. If redemptionType is `FREE_VOUCHER` and payment mode is set, no points will be deducted. 4. For the `INTOUCH_REWARD` and `CART_PROMOTION` redemption type, a numeric `intouchSeriesId` is mandatory. 5. For the `VENDOR_INTOUCH_REWARD` redemption type, both a numeric `intouchSeriesId` and a valid `vendorRedemption` are mandatory. 6. For `INTOUCH_REWARD` redemption type, `intouchSeriesId` is mandatory.
      </td>
    </tr>

    <tr>
      <td>
        .vendorRedemption
      </td>

      <td>
        long
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the reward configured for a particular vendor. NOTE: If the `redemptionType` provided does not support vendor flow (i.e., when redemption is handled by an external vendor), the `vendorRedemption` field must be null.
      </td>
    </tr>

    <tr>
      <td>
        .communications
      </td>

      <td>
        Array
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the communication IDs related to the reward.
      </td>
    </tr>

    <tr>
      <td>
        .supplementaryCriteriaRO
      </td>

      <td>
        Array
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates Tier/subscription programs for which the reward is being created.
      </td>
    </tr>

    <tr>
      <td>
        ..loyaltyProgramId
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the unique identifier of the loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        ..tierIds
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the unique identifier of the tier.
      </td>
    </tr>

    <tr>
      <td>
        ..partnerProgramIds
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the unique identifier of the partner program.
      </td>
    </tr>

    <tr>
      <td>
        .languageSpecificInfo
      </td>

      <td>
        Array
      </td>

      <td>
        Yes
      </td>

      <td>
        Enables the display of reward level information specified in this object in the desired language. Note: There is no limit on the number of languages a user can define for custom fields. Prerequisite: If the desired language is not available in the system, raise a ticket to the Capillary support team to have it added.
      </td>
    </tr>

    <tr>
      <td>
        ..languageCode
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the ISO code for the language. For ex: `FR`-French, `JA`-Japanese etc. Character limit of `languageCode` is 255 characters. `languageCodes` can have space. `languageCode` has to be Unique.
      </td>
    </tr>

    <tr>
      <td>
        ..name
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the name of the reward in the specified language. Character limit of `name` is 255 characters.
      </td>
    </tr>

    <tr>
      <td>
        ..description
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the description of the reward in the specified language.
      </td>
    </tr>

    <tr>
      <td>
        ..termNConditionsId
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the identifier for terms and conditions. Uploading the termsNconditons file to the file service/solutions workspace generates this unique identifier.
      </td>
    </tr>

    <tr>
      <td>
        ..imageId
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        File_handle of the main image. Uploading the image to the file service/solutions workspace generates this unique identifier. This is the image that the brand configures during the reward creation.
      </td>
    </tr>

    <tr>
      <td>
        ..thumbnailId
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the identifier for the thumbnail image.
      </td>
    </tr>

    <tr>
      <td>
        ..enabled
      </td>

      <td>
        boolean
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates if the language should be enabled or not.
      </td>
    </tr>

    <tr>
      <td>
        ..images
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        A list of image details related to the reward. Notes: A maximum of 10 images can be added to the reward. The brand can update the main image from these 10 images. You can use the ID or image URL to add the image. There is no limit in dimension or size for images. Image in any format is supported.
      </td>
    </tr>

    <tr>
      <td>
        ...name
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the name of the image. The name should be unique. Warning: If a name is added twice for the same image, only the first one will be considered.
      </td>
    </tr>

    <tr>
      <td>
        ...id
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        The file_handle of the image. Uploading the image to the file service/solutions workspace generates this unique identifier.
      </td>
    </tr>

    <tr>
      <td>
        ...isExternal
      </td>

      <td>
        boolean
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates if the image is hosted on an external server. By default, the value is false.
      </td>
    </tr>

    <tr>
      <td>
        ...urlString
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        External URL of the image.
      </td>
    </tr>

    <tr>
      <td>
        ...altText
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the Alternative text or description of the image. You can use alt text to convey the meaning and context of visual content to users who cannot view images, such as individuals using screen readers due to visual impairments, or in situations where images fail to load.
      </td>
    </tr>

    <tr>
      <td>
        ..videos
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the a list of video details related to the reward. Notes: A maximum of 10 videos can be added to the reward. The brand can update the main videos from these 10 videos. You can use the ID or video URL to add the videos. There is no limit in dimension or size for videos. Videos in any format are supported.
      </td>
    </tr>

    <tr>
      <td>
        ...name
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the name of the video. The name should be unique. Warning: If a name is passed twice, only the first one will be considered.
      </td>
    </tr>

    <tr>
      <td>
        ...id
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        The file_handle of the video. Uploading the video to the file service/solutions workspace generates this unique identifier.
      </td>
    </tr>

    <tr>
      <td>
        ...urlString
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        URL of the video.
      </td>
    </tr>

    <tr>
      <td>
        ...isExternal
      </td>

      <td>
        boolean
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates if the video is hosted on an external server.
      </td>
    </tr>

    <tr>
      <td>
        ...altText
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Alternative text or description of the video.
      </td>
    </tr>

    <tr>
      <td>
        ..customFields
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines a map of custom key-value pairs for
        the reward. Custom fields are unique
        columns used to store specific, non-standard
        information (e.g., custom loyalty levels,
        partner IDs, descriptive tags, etc.). Before
        using this field, custom fields must be
        defined at the organization level using the
        [Create Custom Field API](https://docs.capillarytech.com/reference/create-a-custom-field#/).  
        Character Limit of `customFields` is 255 characters. If language-specific custom fields are unavailable, English values are used. If language-level custom fields are not defined, reward-level custom fields are used else, meta-level default values are used.
      </td>
    </tr>

    <tr>
      <td>
        ...customFieldName
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Name of the custom field.
      </td>
    </tr>

    <tr>
      <td>
        ...customFieldValue
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Value of the custom field.
      </td>
    </tr>

    <tr>
      <td>
        ..richContentRO
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        An object containing HTML-formatted rich text content.
      </td>
    </tr>

    <tr>
      <td>
        ...content
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        The HTML-formatted rich text content.
      </td>
    </tr>

    <tr>
      <td>
        ...isEnabled
      </td>

      <td>
        boolean
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates whether the rich text content is enabled. Supported Values: `true` or `false`
      </td>
    </tr>

    <tr>
      <td>
        .owners
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        List containing detailed owner information
      </td>
    </tr>

    <tr>
      <td>
        ..ownerType
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        The module for which the reward was created. Supported values: `LOYALTY_PROGRAM`, `MILESTONES`, `CAMPAIGNS`, `JOURNEYS`, `GOODWILL`.
      </td>
    </tr>

    <tr>
      <td>
        ..ownerId
      </td>

      <td>
        string
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the unique identifier of the owner to claim the reward. Multiple owner IDs are supported for a single reward with the same owner type.
      </td>
    </tr>

    <tr>
      <td>
        .rewardRevenueMeta
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates an object with commission details for different participants over specific periods.
      </td>
    </tr>

    <tr>
      <td>
        ..commissionParticipant
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the entity receiving the commission. Supported values: `BRAND`, `CAPILLARY`, `AFFILIATE`, `END_CUSTOMER`.
      </td>
    </tr>

    <tr>
      <td>
        ..commissionRate
      </td>

      <td>
        decimal
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the amount of commission to be received.
      </td>
    </tr>

    <tr>
      <td>
        ..cycleStartDate
      </td>

      <td>
        date
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the start date of the commission cycle. Note: `cycleStartDate` should be greater than `rewardStartDate`. `cycleStartDate` must be in the future
      </td>
    </tr>

    <tr>
      <td>
        ..cycleEndDate
      </td>

      <td>
        date
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the end date of the commission cycle. Note: `cycleEndDate` should smaller than `rewardEndDate`. `cycleEndDate` must be in the future
      </td>
    </tr>

    <tr>
      <td>
        .rewardRevenueDefaults
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the object with the default commission. In case multiple blocks with the same `commissionParticipant` are passed, only the first is considered.
      </td>
    </tr>

    <tr>
      <td>
        ..commissionParticipant
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        The entity receiving the commission. Supported values: `BRAND`, `CAPILLARY`, `AFFILIATE`, `END_CUSTOMER`
      </td>
    </tr>

    <tr>
      <td>
        ..defaultValue
      </td>

      <td>
        decimal
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the default commission rate associated with the participant. Note: If no `defaultValue` is passed, then 0 is considered as the `defaultValue`.
      </td>
    </tr>

    <tr>
      <td>
        .segment
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the Customer Segmentation which logically groups audiences based on shared characteristics. You can create segments using the Insights+ UI. You can use these segments to create rewards targeting specific customer groups. Note: The segments and partition information should be valid and the segments must be active while creating the reward.
      </td>
    </tr>

    <tr>
      <td>
        ..segmentId
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the unique identifier used to create or update segment information.
      </td>
    </tr>

    <tr>
      <td>
        ..partitionId
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the Partition ID is a unique identifier used to create or update partition information.
      </td>
    </tr>

    <tr>
      <td>
        .cardSeries
      </td>

      <td>
        Array of Objects
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the list of card series codes associated with the reward. Brands can use cards and labels to offer personalized rewards. There is no limit on the number of card series code. You can use Get Card Details API to get the series code of the card. Example: `"cardSeries":["26NOV2024TRYLEN17","26NOV2024TRYLEN18"]`. Note: You cannot link the same reward to multiple attributes at a time.
      </td>
    </tr>

    <tr>
      <td>
        .labels
      </td>

      <td>
        Array of Objects
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the list of label IDs associated with the reward. You can get the Label ID from Get Customer Labels API. There is no limit on the number of label IDs. Note:\<br> * Blank input resets the field to null.\<br> * You cannot link the same reward to multiple attributes at a time.
      </td>
    </tr>

    <tr>
      <td>
        .isActive
      </td>

      <td>
        boolean
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates if the reward is active or Inactive. Supported values: `true` or `false`.
      </td>
    </tr>

    <tr>
      <td>
        .restrictions
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines how and when a reward can be issued—at both the reward level (total limit across all users) and the customer level (limit per individual user). For example, \<br>* Allow only 1,000 total redemptions of a reward across all users. \<br>* Limit each customer to 5 redemptions per month.
      </td>
    </tr>

    <tr>
      <td>
        ..rewardLevel
      </td>

      <td>
        Object
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the total number of times a reward can be issued across all customers. Example: If the limit for a reward is set to 1000, a maximum of 1,000 total redemptions will be allowed. Once this limit is reached, the reward will no longer be available for issuance to any customer.
      </td>
    </tr>

    <tr>
      <td>
        ...kpi
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the Key Performance Indicator (KPI) on which the reward is created. Supported values : `QUANTITY`, `REDEMPTION_VALUE`. Example: \<br>* `QUANTITY` Limits a "Free Drink" reward based on the total number of times it's redeemed (e.g., 500 redemptions). \<br>* `REDEMPTION_VALUE` Limits an "Airline Miles" reward based on the total accumulated value of miles redeemed (e.g., 100,000 miles). \<br>Note: When `redemptionType` is `MILES`, set the KPI value to `REDEMPTION_VALUE` as miles are always tracked by their total redeemed value.
      </td>
    </tr>

    <tr>
      <td>
        ...windowType
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        Specifies the type of window for the reward. Supported values: include `ROLLING` and `FIXED`.
      </td>
    </tr>

    <tr>
      <td>
        ...repeatFrequencyType
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines how often the reward limit resets when `windowType` is set to `FIXED`. Supported Values: \<br>* `DAYS`: The limit resets every N days. Example: A limit of 100 redemptions resets every 10 days. \<br>* `WEEKS`: The limit resets weekly. Example: A limit of 500 redemptions resets each week, starting on Monday. \<br>* `MONTHS`: The limit resets every calendar month. Example: A limit of 1,000 redemptions resets per month. \<br>* `NO_LIMIT`: There's no reset. The limit is tracked for the entire duration of the reward. Example: A one-time limit of 2,000 redemptions applies over the full reward period.
      </td>
    </tr>

    <tr>
      <td>
        ...weekStartDay
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        Specifies the day of the week that the week starts on. Supported values : `MONDAY`, `TUESDAY`, etc.
      </td>
    </tr>

    <tr>
      <td>
        ...limit
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the maximum number of times the reward can be issued across all customers during a fixed window. \<br>* If `windowType` is `FIXED`, the limit applies to each fixed cycle (e.g., per week or per month). \<br>* If `windowType` is `ROLLING`, the limit applies over a sliding time window (e.g., past 30 days). \<br>* If `repeatFrequencyType` is `NO_LIMIT`, the cap is applied for the entire lifetime of the reward.
      </td>
    </tr>

    <tr>
      <td>
        ..customerLevel
      </td>

      <td>
        Array
      </td>

      <td>
        Optional
      </td>

      <td>
        Define the maximum number of times an individual customer can redeem a specific reward. Example: If the limit is set to 3 and `repeatFrequencyType` to `MONTHS`, each customer will be able to redeem the reward up to 3 times within a calendar month.
      </td>
    </tr>

    <tr>
      <td>
        ...kpi
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the Key Performance Indicator (KPI) on which the reward is created. Supported values : `QUANTITY`, `REDEMPTION_VALUE`. Example: \<br>* `QUANTITY` Limits a "Free Drink" reward based on the total number of times it's redeemed (e.g., 500 redemptions). \<br>* `REDEMPTION_VALUE` Limits an "Airline Miles" reward based on the total accumulated value of miles redeemed (e.g., 100,000 miles). \<br>Note: When `redemptionType` is `MILES`, set the KPI value to `REDEMPTION_VALUE` as miles are tracked by their total value, not as individual units.
      </td>
    </tr>

    <tr>
      <td>
        ...windowType
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        Specifies the type of window for the reward. Supported values: include `ROLLING` and `FIXED`. \<br>`ROLLING`: Tracks usage within a sliding time window relative to the current date. Limits are recalculated dynamically; for instance, over the last 30 days from today. \<br>Use case: You want to restrict reward issuance to 1,000 redemptions in any rolling 30-day period. If 1,000 redemptions have already occurred within the past 30 days, the reward will not be issued again today. \<br>`FIXED`: Tracks usage within predefined fixed cycles, such as calendar weeks, months, or N-day blocks. Limits apply to a specific date range, and each cycle is evaluated independently. \<br>Use case: You want to allow a reward to be redeemed up to 500 times per calendar month. In this case, redemptions from March 1st to March 31st are counted together. On April 1st, a new cycle begins with a fresh limit.
      </td>
    </tr>

    <tr>
      <td>
        ...repeatFrequencyType
      </td>

      <td>
        enum
      </td>

      <td>
        Optional
      </td>

      <td>
        Indicates the frequency at which the reward is repeated. Supported values : Include `DAYS`, `WEEKS`, `MONTHS`, and `NO_LIMIT`. \<br>* `DAYS`— `weekStartDay` isn’t supported; `startOfCycle` and `interval` (+ve) are mandatory \<br>* `WEEKS`— `interval` and `startOfCycle` aren’t supported; `weekStartDay` is optional (default Monday) \<br>* `MONTHS` — `interval`, `startOfCycle`, and `weekStartDay` aren’t supported
      </td>
    </tr>

    <tr>
      <td>
        ...startOfCycle
      </td>

      <td>
        date
      </td>

      <td>
        Optional
      </td>

      <td>
        Specifies the start date and time of the reward cycle in ISO 8601 Time Format.
      </td>
    </tr>

    <tr>
      <td>
        ...limit
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the maximum number of times a single customer can receive or redeem the reward within a fixed cycle. \<br>* If `windowType` is `FIXED`, the limit applies to each fixed cycle. For example, a customer could receive this reward a maximum of 3 times per week or per month. \<br>* If `windowType` is `ROLLING`, the limit applies over a sliding time window. For example, a customer could receive this reward a maximum of 5 times over the past 30 days. \<br>* If `repeatFrequencyType` is `NO_LIMIT`, the limit is applied for the entire lifetime of the reward for that individual customer.
      </td>
    </tr>

    <tr>
      <td>
        ...interval
      </td>

      <td>
        integer
      </td>

      <td>
        Optional
      </td>

      <td>
        Defines the interval for the frequency type, indicating how often the reward can be issued within the specified frequency.
      </td>
    </tr>
  </tbody>
</Table>

## Example response

```json Sample response
{
    "status": {
        "success": true,
        "code": 6002,
        "message": "Reward created successfully"
    },
    "reward": {
        "id": 488443
    }
}
```
```json 400
{
   "status": {
       "success": false,
       "code": 6003,
       "message": "Unable to create reward as Org doesn't have the custom field/s: CF0"
   },
   "reward": null
}
```
```json 400 Conversion ratio with unsupported redemptiontypes
{
    "status": {
        "success": false,
        "code": 400,
        "message": "Conversion ratio can be set only for MILES, CASH_WALLET and CHARITY content types."
    }
}
```
```json 400-CONV RATIO with other payment mode
{
    "status": {
        "success": false,
        "code": 400,
        "message": "Multiple payments is not supported within FREE and CONV_RATIO modes"
    }
}
```
```json Invalid segment ID
{
    "status": {
        "success": false,
        "code": 6003,
        "message": "Unable to create reward as Invalid Segment Id:  6136"
    },
    "reward": null
}
```
```json 400-Vendor Reward is required
{
    "status": {
        "success": false,
        "code": 400,
        "message": "Vendor redemption is required in case of Vendor rewards"
    }
}
```
```json 400- Reward Term & Conditions can't be null
{
    "status": {
        "success": false,
        "code": 400,
        "message": "Reward Term & Conditions can't be null or empty."
    }
}
```
```json 400- Label ID is incorrect
{
    "status": {
        "success": false,
        "code": 6003,
        "message": "Unable to create reward as Label not found for label_id: 12749822"
    },
    "reward": null
}
```
```json 400- Card Series not found
{
    "status": {
        "success": false,
        "code": 6003,
        "message": "Unable to create reward as Card series not found for series_code: 26NOV2024TR573"
    },
    "reward": null
}
```

## Response parameters

| Field     | Type    | Description                                       |
| :-------- | :------ | :------------------------------------------------ |
| .status   | Object  | Contains details about the status of the request. |
| ..success | boolean | Indicates whether the request was successful.     |
| ..code    | integer | Status code associated with the response.         |
| ..message | string  | Descriptive message of the response.              |
| .reward   | Object  | Contains details about the reward created.        |
| ..id      | integer | Unique identifier for the created reward.         |

## Error codes

| Code     | Description                                                                                                   |
| :------- | :------------------------------------------------------------------------------------------------------------ |
| **6003** | Reward creation failed due to the absence of a required custom field in the Org settings - Invalid segment ID |
| **6003** | Invalid segment ID                                                                                            |
| **6003** | Invalid label ID                                                                                              |
| **6003** | Card series not found.                                                                                        |
| **400**  | Conversion ratio can be set only for MILES, CASH\_WALLET and CHARITY content types.                           |
| **400**  | Multiple payments is not supported within FREE and CONV\_RATIO modes                                          |
| **400**  | Vendor redemption is required in case of Vendor rewards                                                       |
| **400**  | Reward Term & Conditions can't be null or empty.                                                              |
| **400**  | Reward startTime and endTime can't be null or empty.                                                          |
| **6081** | Duplicate external ID. The `rewardExternalId` value already exists for another reward in this brand.          |

## **Additional notes**

* Reward Linking – A reward can be linked to one entity type at a time: card, label, segment, tier, or loyalty program. You can link the same reward to multiple entries within the same type (e.g., multiple labels or card series).
  *Example: Link to both "Gold Card Series" and "Platinum Card Series", but not to a card and a label together.*
* The type field now accepts POINTS, PHYSICAL\_VOUCHER, and FREE\_VOUCHER.
  VendorOnlyReward and VendorIntouchReward are deprecated—update your integrations accordingly.
* Define all the necessary configurations. For new brands, use the paymentConfig block instead of Intouch Points.
* To add Rich Text Content, ensure metadata is created first – see [this guide](https://docs.capillarytech.com/reference/adding-rich-text-content-metadata) and [API reference](https://docs.capillarytech.com/reference/create-rich-content-meta).
* Without metadata, rich content can’t be saved or retrieved. Always validate it before use.

<br />

# OpenAPI definition

```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "Sample API",
    "version": "1.0.0",
    "description": "API specification generated from cURL for POST /v1.1/customer/add"
  },
  "servers": [
    {
      "url": "https://{host}"
    }
  ],
  "paths": {
    "/api_gateway/rewards/core/v1/reward/create": {
      "post": {
        "description": "",
        "operationId": "",
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "examples": {
                  "Sample response": {
                    "summary": "Sample response",
                    "value": {
                      "status": {
                        "success": true,
                        "code": 6002,
                        "message": "Reward created successfully"
                      },
                      "reward": {
                        "id": 488443
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [],
        "x-readme": {
          "code-samples": [
            {
              "code": "curl --location 'https://eu.api.capillarytech.com/api_gateway/rewards/core/v1/reward/create' \\\n--header 'Content-Type: application/json' \\\n--header 'Authorization: Basic bWFkaHzI3MjU2YQ==' \\\n--header 'Cookie: _cfuvid=QnNsjQy2xw_5IexMyp1lVPVBlGdYOX.2APjTsu0a.2Y-1763380682991-0.0.1.1-604800000' \\\n--data '{\n    /******** Mandatory parameters *********/\n    \"startTime\": \"2025-09-16T05:15:00Z\",\n    \"endTime\": \"2025-09-31T06:00:00Z\",\n    \"type\": \"VOUCHER\",\n    \"brandId\": 61,\n    \"redemptionType\": \"INTOUCH_REWARD\",\n    \"languageSpecificInfo\": [ //mandatory\n        {\n            \"languageCode\": \"en\", //mandatory\n            \"name\": \"UAT Reward 11\", //mandatory\n            \"description\": \"Test Reward for UAT Team\",\n            \"enabled\": true, //mandatory\n            \"richContentRO\": {\n                \"UAT_RCT_1\": {\n                    \"content\": \"Rich Content Text for UAT\",\n                    \"isEnabled\": true\n                }\n            }//,\n            // \"customFields\": { \"UAT_CF_9\": \"EV1\" }\n        }\n    ],\n    /******** Non Mandatory Parameters ********/\n    \"enabled\": true,\n    \"priority\": \"1\",\n    // \"tier\": \"Emerald\",\n    // \"intouchPoints\": 100, Use payments config block instead\n    \"intouchSeriesId\": \"844312\",\n    \"categories\": [\n        486\n    ],\n    // \"vendorRedemption\": \"2846\",\n    \"paymentConfigs\": [\n       {\n            \"paymentMode\": \"POINTS\",\n            // \"conversionRatio\":0.33,\n            \"points\": 100\n        }\n    ]//,\n    // \"restrictions\": {\n    //     \"rewardLevel\": [\n    //         {\n    //             \"kpi\": \"REDEMPTION_VALUE\",\n    //             \"windowType\": \"FIXED\",\n    //             \"repeatFrequencyType\": \"WEEKS\",\n    //             \"weekStartDay\": \"TUESDAY\",\n    //             \"limit\": 2\n    //         }\n    //     ],\n    //     \"customerLevel\": [\n    //         {\n    //             \"kpi\": \"REDEMPTION_VALUE\",\n    //             \"windowType\": \"FIXED\",\n    //             \"repeatFrequencyType\": \"DAYS\",\n    //             \"startOfCycle\": \"2025-07-31T00:00:00Z\",\n    //             \"limit\": 2,\n    //             \"interval\": 2\n    //         },\n    //         {\n    //             \"kpi\": \"QUANTITY\",\n    //             \"windowType\": \"FIXED\",\n    //             \"repeatFrequencyType\": \"MONTHS\",\n    //             \"limit\": 6\n    //         }\n    //     ]\n    // }\n}",
              "language": "shell",
              "name": "Sample request"
            }
          ],
          "samples-languages": [
            "shell"
          ]
        }
      }
    }
  },
  "x-readme": {}
}
```