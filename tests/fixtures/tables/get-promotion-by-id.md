---
updatedAt: 2026-05-05T06:54:50.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Get Loyalty Promotion by ID

Get details of the promotion using promotion ID.

> ❗️ This API is being phased out and will no longer be available for viewing loyalty promotions.
>
> To view loyalty promotions, use the [Get Details of all Loyalty Promotions](https://docs.capillarytech.com/reference/get-loyalty-promotion-all) API
>
> <br />

Retrieves a paginated list of promotions for a given program. You can filter the promotions based on source type, event name etc.

By default, the types of promotions are not available for all the orgs. This needs to be enabled separately. For more details on the types of promotions, refer [Types of promotions](https://docs.capillarytech.com/docs/advanced-loyalty-promotions).

> 📘 Note
>
> This API fetches results for loyalty promotions created on the [old UI](https://docs.capillarytech.com/docs/loyalty-promotions-basic-and-advanced#/).

# Example request

```curl Sample request
curl --location 'https://eu.api.capillarytech.com/api_gateway/loyalty/v1/programs/973/promotionsV2?limit=100&offset=0&sourceType=USER_CREATED' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic **********' \
--header 'Cookie: _cfuvid=ZkF.LSNXg9S52IfnjuqAXPBT0mhsN4NBGQOun0VO.bo-1758631730852-0.0.1.1-604800000'
```

# Prerequisites

* [ ] Authentication: Basic or OAuth credentials
* [ ] Access group resource: Read access to customer group resource

# Resource information

|               |                                                              |
| :------------ | :----------------------------------------------------------- |
| URI           | /api\_gateway/loyalty/v1/programs/`{programId}`/promotionsV2 |
| HTTP Method   | GET                                                          |
| Pagination    | Yes                                                          |
| Batch support | No                                                           |

# Path parameters

| Parameter Name | Data Type | Description              |
| :------------- | :-------- | :----------------------- |
| programId      | String    | Unique ID of the program |

# Query parameters

| Parameter Name              | Data Type | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit*`                    | String    | Number of results that need to be displayed. The values from zero to a maximum of 100 are supported.                                                                                                                                                                                                                                                                                                                                |
| `sourceType*`               | ENUM      | Filter promotion data based on its source type. Possible values are `UI`, `IMPORT`, `GOODWILL`, `CAMPAIGN`, `POINTS_TRANSFER`, `IMPORT_API`, `PROMOTION_API`, `POINTS_CONTRIBUTION_TO_GROUP`,`MANUAL_POINTS_ADJUSTMENT`, `BADGES`, `USER_CREATED` \<br/>\<br/> Use the filter `USER_CREATED` to filter the promotions created for [User Created Challenges (UCC)](https://docs.capillarytech.com/reference/user-created-challenges) |
| `offset*`                   | String    | Start index for data retrieval. This value should not be negative.                                                                                                                                                                                                                                                                                                                                                                  |
| `promotionId`               | Integer   | The unique ID of the promotion.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `includeInactivePromotions` | Boolean   | Include promotions that are currently inactive.\<br/>By default this is set to false.                                                                                                                                                                                                                                                                                                                                               |
| `startRuleIdentifier`       | Integer   | The unique identifier of the start rule.                                                                                                                                                                                                                                                                                                                                                                                            |
| `eventName`                 | String    | Set the event name to filter based on an event.                                                                                                                                                                                                                                                                                                                                                                                     |

# Response body

```json
{
    "status": {
        "code": 200,
        "message": "success"
    },
    "validationErrors": null,
    "data": [
        {
            "id": 96664,
            "name": "test_promo_uniqueName110",
            "description": "creating promotion via API",
            "promotionStatus": "LIVE",
            "lastUpdateDate": "2025-06-23T09:25:04Z",
            "lastUpdatedBy": -1,
            "rulesetInfos": [
                {
                    "id": 126412694,
                    "orgName": "DocDemo",
                    "contextID": 2932,
                    "orgID": 100737,
                    "contextType": "program",
                    "rules": [
                        {
                            "id": 126600796,
                            "exp": "true",
                            "expJSON": "{ \"arity\": \"literal\", \"value\": \"true\", \"type\": \"boolean:primitive\" }",
                            "jsonType": "JNODE",
                            "isActive": true,
                            "priority": -1,
                            "startDate": 1089532593324,
                            "endDate": 33593126193324,
                            "createdOn": 1750670704532,
                            "caseToActions": {
                                "true": [
                                    {
                                        "id": 126778453,
                                        "actionName": "AWARD_TARGET_POINTS_ACTION",
                                        "actionClass": "com.capillary.shopbook.pointsengine.endpoint.impl.action.AwardTargetPointsActionImpl",
                                        "mandatoryPropertiesValues": {
                                            "TargetRuleId": "123",
                                            "ProRateOnSourceValue": "EVENT_DEFAULT_VALUE",
                                            "DelayStrategy": "AS_DEFINED_IN_ALLOCATION_STRATEGY",
                                            "SourceValueRoundingStrategy": "ACTUAL",
                                            "TargetGroupId": "1234567",
                                            "ExpiryStrategy": "81042",
                                            "TargetRuleName": "TargetRuleName",
                                            "AwardStrategy": "82690",
                                            "PointsRoundingStrategy": "ACTUAL"
                                        },
                                        "mandatoryComplexPropertiesValues": {},
                                        "description": null
                                    }
                                ]
                            },
                            "ruleScope": "SERVER",
                            "createdBy": -1,
                            "modifiedBy": -1,
                            "modifiedOn": 1750670704532,
                            "name": "Rule 1",
                            "description": "Rule 1",
                            "expDataType": null,
                            "filterInfo": [],
                            "ruleSetId": 126412694,
                            "updatedViaNewUI": false
                        }
                    ],
                    "ruleScope": "SERVER",
                    "startDate": 1089532593324,
                    "endDate": 33593126193324,
                    "createdOn": 1750670704532,
                    "createdBy": -1,
                    "modifiedBy": -1,
                    "modifiedOn": 1750670704532,
                    "name": "rulesetName_uniqueue1",
                    "packageName": "",
                    "description": "Promotional Rulesets",
                    "filterInfo": [
                        {
                            "id": 126654282,
                            "orgID": 100737,
                            "ruleID": -1,
                            "name": "LoyaltyType",
                            "className": "com.capillary.shopbook.emf.impl.filter.LoyaltyTypeFilterImpl",
                            "isInclude": true,
                            "propertyToValues": {
                                "loyaltyType": [
                                    "loyalty"
                                ]
                            }
                        },
                        {
                            "id": 126654283,
                            "orgID": 100737,
                            "ruleID": -1,
                            "name": "EventSource",
                            "className": "com.capillary.shopbook.emf.impl.filter.EventSourceFilterImpl",
                            "isInclude": true,
                            "propertyToValues": {
                                "eventSource": [
                                    "INSTORE"
                                ]
                            }
                        }
                    ],
                    "eventType": null,
                    "cappingInfo": [],
                    "updatedViaNewUI": false,
                    "label": "userCreatedLabel_2025-06-23T09:25:04.532Z",
                    "private": true
                }
            ],
            "programName": "DocDemoDefaultProgram",
            "programId": 973,
            "startDate": "2025-06-23T00:00Z",
            "endDate": "2026-08-25T23:59:59Z",
            "identifier": "test_promo_uniqueIdentifier110",
            "isActive": true,
            "eventName": "TARGETCOMPLETED",
            "allocatePointsOn": "BILL",
            "limits": {
                "pointsPerCustomer": 10,
                "numberOfTimesPerCustomer": 2,
                "totalPointsInPromotion": 10,
                "totalPointsPerEventLimit": -1
            },
            "useProportions": false,
            "pointsOfferType": "LOYALTY",
            "promotionRestrictions": {
                "restrictions": {
                    "redemptionRestrictions": [
                        {
                            "name": "MAX_ALLOWED_TIMES_PER_CUSTOMER",
                            "value": 3,
                            "type": "PERIOD_BASED",
                            "periodType": "MOVING_WINDOW",
                            "periodUnit": "WEEKLY"
                        },
                        {
                            "name": "MAX_ALLOWED_TIMES_PER_PROMOTION",
                            "value": 3,
                            "type": "NON_PERIOD_BASED",
                            "periodType": null,
                            "periodUnit": null
                        },
                        {
                            "name": "MAX_REDEMPTIONS_PER_EARN_PER_CUSTOMER",
                            "value": 100,
                            "type": "NON_PERIOD_BASED",
                            "periodType": null,
                            "periodUnit": null
                        }
                    ],
                    "issualRestrictions": [
                        {
                            "name": "MAX_NUMBER_OF_ISSUALS_PER_CUSTOMER",
                            "value": 3
                        }
                    ],
                    "earnRestrictions": [
                        {
                            "name": "MAX_NUMBER_OF_EARNS_PER_CUSTOMER",
                            "value": 3
                        }
                    ],
                    "expiryRestrictions": [
                        {
                            "name": "ISSUAL_PROMOTION_EXPIRY_BASED_ON",
                            "value": 10,
                            "type": "PROMOTION"
                        }
                    ]
                },
                "scope": null,
                "loyaltyEarningType": "ISSUE_AND_EARN",
                "expiryReminder": null,
                "targetGroupIds": [
                    1234567
                ],
                "targetRuleIds": [
                    123
                ],
                "linkedTargetGroupVsTargetRuleIdMap": {
                    "1234567": [
                        123
                    ]
                },
                "cappingStatus": null,
                "skipEarnedDateCheckOnRedeem": false,
                "isStackable": false,
                "isConsideredForRanking": false,
                "isExclusive": false,
                "isAlwaysApply": false
            }
        }
    ],
    "pageDetails": {
        "pageNumber": 0,
        "pageSize": 100,
        "totalEntries": 1,
        "pageCount": 1
    }
}
```

# Response parameters

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        **Field**
      </th>

      <th>
        **Data Type**
      </th>

      <th>
        **Description**
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `status`
      </td>

      <td>
        Object
      </td>

      <td>
        Contains the status of the API response.
      </td>
    </tr>

    <tr>
      <td>
            • `code`
      </td>

      <td>
        Integer
      </td>

      <td>
        The HTTP status code indicating the outcome of the request.
      </td>
    </tr>

    <tr>
      <td>
            • `message`
      </td>

      <td>
        String
      </td>

      <td>
        A human-readable message summarising the outcome of the API request.
      </td>
    </tr>

    <tr>
      <td>
        `validationErrors`
      </td>

      <td>
        Object or null
      </td>

      <td>
        Contains validation error details when the request fails server-side validation; null if no errors occur.
      </td>
    </tr>

    <tr>
      <td>
        `data`
      </td>

      <td>
        Array of Objects
      </td>

      <td>
        Contains the list of promotions matching the request parameters and filters.
      </td>
    </tr>

    <tr>
      <td>
            • `id`
      </td>

      <td>
        Integer
      </td>

      <td>
        The unique identifier for the promotion.
      </td>
    </tr>

    <tr>
      <td>
            • `name`
      </td>

      <td>
        String
      </td>

      <td>
        The name of the promotion.
      </td>
    </tr>

    <tr>
      <td>
            • `description`
      </td>

      <td>
        String
      </td>

      <td>
        A text field describing the promotion's purpose and business context.
      </td>
    </tr>

    <tr>
      <td>
            • `promotionStatus`
      </td>

      <td>
        String
      </td>

      <td>
        The operational status of the promotion, indicating its current position in the promotion lifecycle.
      </td>
    </tr>

    <tr>
      <td>
            • `lastUpdateDate`
      </td>

      <td>
        String (ISO 8601)
      </td>

      <td>
        The date and time when the promotion was last modified, in ISO 8601 format.
      </td>
    </tr>

    <tr>
      <td>
            • `lastUpdatedBy`
      </td>

      <td>
        Integer
      </td>

      <td>
        The user ID of the person who performed the most recent modification to the promotion.
      </td>
    </tr>

    <tr>
      <td>
            • `rulesetInfos`
      </td>

      <td>
        Array of Objects
      </td>

      <td>
        The rulesets that define the conditions and actions governing how the promotion is evaluated and applied.
      </td>
    </tr>

    <tr>
      <td>
                • `id`
      </td>

      <td>
        Integer
      </td>

      <td>
        The unique identifier for the ruleset.
      </td>
    </tr>

    <tr>
      <td>
                • `orgName`
      </td>

      <td>
        String
      </td>

      <td>
        The name of the organization that owns and manages this ruleset.
      </td>
    </tr>

    <tr>
      <td>
                • `contextID`
      </td>

      <td>
        Integer
      </td>

      <td>
        The ID of the context, such as a program, in which the ruleset is configured and evaluated.
      </td>
    </tr>

    <tr>
      <td>
                • `orgID`
      </td>

      <td>
        Integer
      </td>

      <td>
        The unique system ID of the organization that owns this ruleset.
      </td>
    </tr>

    <tr>
      <td>
                • `contextType`
      </td>

      <td>
        String
      </td>

      <td>
        Specifies the context category, such as program or campaign, determining how the ruleset is applied.
      </td>
    </tr>

    <tr>
      <td>
                • `rules`
      </td>

      <td>
        Array of Objects
      </td>

      <td>
        The rules that define the eligibility conditions and triggering logic for the promotion within this ruleset.
      </td>
    </tr>

    <tr>
      <td>
                    • `id`
      </td>

      <td>
        Integer
      </td>

      <td>
        Unique identifier for the rule.
      </td>
    </tr>

    <tr>
      <td>
                    • `exp`
      </td>

      <td>
        String
      </td>

      <td>
        The conditional expression evaluated to determine whether the rule's actions are triggered.
      </td>
    </tr>

    <tr>
      <td>
                    • `expJSON`
      </td>

      <td>
        String
      </td>

      <td>
        The structured JSON format of the rule expression, enabling programmatic evaluation of the rule logic.
      </td>
    </tr>

    <tr>
      <td>
                    • `jsonType`
      </td>

      <td>
        String
      </td>

      <td>
        Specifies the JSON node structure type used to represent the rule expression.
      </td>
    </tr>

    <tr>
      <td>
                    • `isActive`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if this rule is currently enforced during promotion evaluation; inactive rules are skipped.
      </td>
    </tr>

    <tr>
      <td>
                    • `priority`
      </td>

      <td>
        Integer
      </td>

      <td>
        Determines the evaluation order when multiple rules exist; lower values execute first and take precedence.
      </td>
    </tr>

    <tr>
      <td>
                    • `startDate`
      </td>

      <td>
        Long
      </td>

      <td>
        The epoch timestamp marking when this rule becomes active and begins to be evaluated.
      </td>
    </tr>

    <tr>
      <td>
                    • `endDate`
      </td>

      <td>
        Long
      </td>

      <td>
        The epoch timestamp marking when this rule stops being evaluated.
      </td>
    </tr>

    <tr>
      <td>
                    • `createdOn`
      </td>

      <td>
        Long
      </td>

      <td>
        The epoch timestamp recording when this rule was originally created.
      </td>
    </tr>

    <tr>
      <td>
                    • `caseToActions`
      </td>

      <td>
        Object
      </td>

      <td>
        Maps rule expression outcomes to the actions the promotion executes when each outcome is satisfied.
      </td>
    </tr>

    <tr>
      <td>
                        • `true`
      </td>

      <td>
        Array of Objects
      </td>

      <td>
        Actions to be executed when the expression evaluates to true.
      </td>
    </tr>

    <tr>
      <td>
                            • `id`
      </td>

      <td>
        Integer
      </td>

      <td>
        ID of the action to be executed.
      </td>
    </tr>

    <tr>
      <td>
                            • `actionName`
      </td>

      <td>
        String
      </td>

      <td>
        The type of action to be performed, such as awarding points or issuing vouchers, when the rule condition is met.
      </td>
    </tr>

    <tr>
      <td>
                            • `actionClass`
      </td>

      <td>
        String
      </td>

      <td>
        The fully qualified Java class containing the implementation logic for this action.
      </td>
    </tr>

    <tr>
      <td>
                            • `mandatoryPropertiesValues`
      </td>

      <td>
        Object
      </td>

      <td>
        The required configuration parameters for the action, controlling how it executes.
      </td>
    </tr>

    <tr>
      <td>
                                • `(key-value pairs)`
      </td>

      <td>
        Varies (String, Integer)
      </td>

      <td>
        Specific mandatory properties and their values.
      </td>
    </tr>

    <tr>
      <td>
                            • `mandatoryComplexPropertiesValues`
      </td>

      <td>
        Object
      </td>

      <td>
        Complex structured configurations required by the action; empty if no complex properties are needed.
      </td>
    </tr>

    <tr>
      <td>
                            • `description`
      </td>

      <td>
        String or null
      </td>

      <td>
        Description of the action (if applicable).
      </td>
    </tr>

    <tr>
      <td>
                    • `ruleScope`
      </td>

      <td>
        String
      </td>

      <td>
        Specifies where the rule is evaluated, such as server-side or client-side, determining its execution environment.
      </td>
    </tr>

    <tr>
      <td>
                    • `createdBy`
      </td>

      <td>
        Integer
      </td>

      <td>
        The user ID of the person who originally created this rule.
      </td>
    </tr>

    <tr>
      <td>
                    • `modifiedBy`
      </td>

      <td>
        Integer
      </td>

      <td>
        The user ID of the person who made the most recent changes to this rule.
      </td>
    </tr>

    <tr>
      <td>
                    • `modifiedOn`
      </td>

      <td>
        Long
      </td>

      <td>
        The epoch timestamp recording when this rule was last updated.
      </td>
    </tr>

    <tr>
      <td>
                    • `name`
      </td>

      <td>
        String
      </td>

      <td>
        The display name assigned to this rule for identification within the ruleset.
      </td>
    </tr>

    <tr>
      <td>
                    • `description`
      </td>

      <td>
        String
      </td>

      <td>
        A summary documenting the purpose and behaviour of this rule.
      </td>
    </tr>

    <tr>
      <td>
                    • `ruleSetId`
      </td>

      <td>
        Integer
      </td>

      <td>
        The unique identifier linking this rule to its parent ruleset.
      </td>
    </tr>

    <tr>
      <td>
                    • `updatedViaNewUI`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if this rule was last modified using the Loyalty+ UI.
      </td>
    </tr>

    <tr>
      <td>
           • `ruleScope`
      </td>

      <td>
        String
      </td>

      <td>
        Specifies the execution scope, such as server-side or client-side, determining where the ruleset's rules are evaluated.
      </td>
    </tr>

    <tr>
      <td>
             • `startDate`
      </td>

      <td>
        String
      </td>

      <td>
        The epoch timestamp in milliseconds marking when this ruleset becomes active.
      </td>
    </tr>

    <tr>
      <td>
             • `endDate`
      </td>

      <td>
        String
      </td>

      <td>
        The epoch timestamp in milliseconds marking when this ruleset expires and stops being evaluated.
      </td>
    </tr>

    <tr>
      <td>
             • `createdOn`
      </td>

      <td>
        Long
      </td>

      <td>
        Date the rule was created, in epoch time.
      </td>
    </tr>

    <tr>
      <td>
             • `createdBy`
      </td>

      <td>
        Integer
      </td>

      <td>
        The user ID of the person who originally created this ruleset.
      </td>
    </tr>

    <tr>
      <td>
             • `modifiedBy`
      </td>

      <td>
        Integer
      </td>

      <td>
        The user ID of the person who made the most recent changes to this ruleset.
      </td>
    </tr>

    <tr>
      <td>
           • `modifiedOn`
      </td>

      <td>
        Long
      </td>

      <td>
        The epoch timestamp recording when this rule was last updated.
      </td>
    </tr>

    <tr>
      <td>
           • `name`
      </td>

      <td>
        String
      </td>

      <td>
        The display name assigned to this ruleset for identification and reference.
      </td>
    </tr>

    <tr>
      <td>
        • `packageName`
      </td>

      <td>
        String
      </td>

      <td>
        The package identifier used to group related rulesets together.
      </td>
    </tr>

    <tr>
      <td>
        • `description`
      </td>

      <td>
        String
      </td>

      <td>
        A summary describing the purpose and scope of this ruleset.
      </td>
    </tr>

    <tr>
      <td>
        • `filterInfo`
      </td>

      <td>
        Array
      </td>

      <td>
        The filter objects that restrict which customers or conditions the ruleset's rules are evaluated against.
      </td>
    </tr>

    <tr>
      <td>
             • `id`
      </td>

      <td>
        Integer
      </td>

      <td>
        Unique identifier of the filter.
      </td>
    </tr>

    <tr>
      <td>
         • `orgID`
      </td>

      <td>
        Integer
      </td>

      <td>
        Organization ID linked to the filter.
      </td>
    </tr>

    <tr>
      <td>
         • `ruleID`
      </td>

      <td>
        Integer
      </td>

      <td>
        Rule ID associated with the filter.
      </td>
    </tr>

    <tr>
      <td>
         • `name`
      </td>

      <td>
        String
      </td>

      <td>
        Name of the filter. Example:  LoyaltyType, EventSource
      </td>
    </tr>

    <tr>
      <td>
         • `className`
      </td>

      <td>
        String
      </td>

      <td>
        Java class name that implements the filter.
      </td>
    </tr>

    <tr>
      <td>
        • `isInclude`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates whether the filter:
        -`true` : Includes entities that match the property values defined in `propertyToValues`.
        -`false` : Excludes entities that match the property values defined in `propertyToValues`.
      </td>
    </tr>

    <tr>
      <td>
        • `propertyToValues`
      </td>

      <td>
        Object
      </td>

      <td>
        Key-to-list mapping of filter properties.
      </td>
    </tr>

    <tr>
      <td>
        • `eventType`
      </td>

      <td>
        String
      </td>

      <td>
        The category of customer event that triggers this ruleset's evaluation.
      </td>
    </tr>

    <tr>
      <td>
        • `cappingInfo`
      </td>

      <td>
        Array
      </td>

      <td>
        The capping configuration objects that enforce quantity or frequency limits on promotion benefits within the ruleset.
      </td>
    </tr>

    <tr>
      <td>
        • `updatedViaNewUI`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if the rule was updated via the new UI.
      </td>
    </tr>

    <tr>
      <td>
        • `label`
      </td>

      <td>
        String
      </td>

      <td>
        A display tag used to organise and identify this ruleset.
      </td>
    </tr>

    <tr>
      <td>
        • `private`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if this ruleset is restricted to specific organisations or contexts, rather than shared broadly.
      </td>
    </tr>

    <tr>
      <td>
            • `programName`
      </td>

      <td>
        String
      </td>

      <td>
        The name of the loyalty program under which this promotion operates.
      </td>
    </tr>

    <tr>
      <td>
            • `programId`
      </td>

      <td>
        Integer
      </td>

      <td>
        The unique ID of the loyalty program to which this promotion belongs.
      </td>
    </tr>

    <tr>
      <td>
            • `startDate`
      </td>

      <td>
        String (ISO 8601)
      </td>

      <td>
        Specifies the date and time from which the promotion becomes active, in ISO 8601 format.
      </td>
    </tr>

    <tr>
      <td>
            • `endDate`
      </td>

      <td>
        String (ISO 8601)
      </td>

      <td>
        Specifies the date and time when the promotion stops being available to customers, in ISO 8601 format.
      </td>
    </tr>

    <tr>
      <td>
            • `identifier`
      </td>

      <td>
        String
      </td>

      <td>
        Specifies the external identifier configured for the promotion — a human-readable or externally assigned string used to reference it across systems.
      </td>
    </tr>

    <tr>
      <td>
            • `isActive`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if the promotion is currently available for earning and redemption.
      </td>
    </tr>

    <tr>
      <td>
            • `eventName`
      </td>

      <td>
        String
      </td>

      <td>
        Specifies the customer action or milestone that activates this promotion.
      </td>
    </tr>

    <tr>
      <td>
            • `allocatePointsOn`
      </td>

      <td>
        String
      </td>

      <td>
        Specifies the transaction event at which promotion points are credited to the customer.
      </td>
    </tr>

    <tr>
      <td>
            • `limits`
      </td>

      <td>
        Object
      </td>

      <td>
        Defines various limits related to the promotion.
      </td>
    </tr>

    <tr>
      <td>
                • `pointsPerCustomer`
      </td>

      <td>
        Integer
      </td>

      <td>
        The maximum total points a single customer can earn from this promotion; -1 means unlimited.
      </td>
    </tr>

    <tr>
      <td>
                • `numberOfTimesPerCustomer`
      </td>

      <td>
        Integer
      </td>

      <td>
        The maximum number of times a customer can earn from this promotion; -1 means unlimited.
      </td>
    </tr>

    <tr>
      <td>
                • `totalPointsInPromotion`
      </td>

      <td>
        Integer
      </td>

      <td>
        The maximum total points available across all customers for this promotion; -1 means no overall cap.
      </td>
    </tr>

    <tr>
      <td>
                • `totalPointsPerEventLimit`
      </td>

      <td>
        Integer
      </td>

      <td>
        The maximum points awardable in a single event occurrence; -1 means no per-event cap.
      </td>
    </tr>

    <tr>
      <td>
            • `useProportions`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if points are distributed proportionally based on transaction values rather than as fixed amounts.
      </td>
    </tr>

    <tr>
      <td>
            • `pointsOfferType`
      </td>

      <td>
        String
      </td>

      <td>
        Specifies the category of points awarded by this promotion.
      </td>
    </tr>

    <tr>
      <td>
            • `promotionRestrictions`
      </td>

      <td>
        Object
      </td>

      <td>
        Defines restrictions for the promotion.
      </td>
    </tr>

    <tr>
      <td>
           • `restrictions`
      </td>

      <td>
        Object
      </td>

      <td>
        Object of redemption restrictions.
      </td>
    </tr>

    <tr>
      <td>
                • `redemptionRestrictions`
      </td>

      <td>
        Object
      </td>

      <td>
        Contains information on the redemption limits for a promotion.
      </td>
    </tr>

    <tr>
      <td>
                    • `name`
      </td>

      <td>
        Enum
      </td>

      <td>
        Type of redemption restriction. Possible values:\<br/>`MAX_ALLOWED_POINTS_PER_EVENT`: The maximum points that can be earned for a single activity (make a transaction, redeem points etc.) done by a customer.\<br/>`MAX_ALLOWED_TIMES_PER_CUSTOMER`: The maximum number of activities (make a transaction, redeem points etc.) a customer can do to earn points.\<br/>`MAX_ALLOWED_POINTS_PER_CUSTOMER`:The maximum number of points a customer can earn from a promotion.\<br/>`MAX_ALLOWED_TIMES_PER_PROMOTION`: The maximum number of activities (make a transaction, redeem points etc.) allowed across all customers in the brand for the promotion.\<br/>`MAX_ALLOWED_POINTS_PER_PROMOTION`:The maximum number of points available across all customers in the brand for the promotion.\<br/>`MAX_REDEMPTIONS_PER_EARN_PER_CUSTOMER`:The maximum number of times a customer can redeem a promotion after earning
      </td>
    </tr>

    <tr>
      <td>
                    • `value`
      </td>

      <td>
        Integer
      </td>

      <td>
        Number of units corresponding to the `name`. Specify `-1` for no limit (max limit: 100).
      </td>
    </tr>

    <tr>
      <td>
                    • `type`
      </td>

      <td>
        Enum
      </td>

      <td>
        Type of period for restriction. Possible values: `PERIOD_BASED`, `NON_PERIOD_BASED`.
      </td>
    </tr>

    <tr>
      <td>
                    • `periodType`
      </td>

      <td>
        Enum
      </td>

      <td>
        Type of period. Supported value: `MOVING_WINDOW`.
      </td>
    </tr>

    <tr>
      <td>
                        • `periodUnit`
      </td>

      <td>
        Enum
      </td>

      <td>
        Frequency of the period. Possible values: `DAILY`, `WEEKLY`, `MONTHLY`.
      </td>
    </tr>

    <tr>
      <td>
                • `issualRestrictions`
      </td>

      <td>
        Object
      </td>

      <td>
        Contains information on the issual limits for a promotion.
      </td>
    </tr>

    <tr>
      <td>
                    • `name`
      </td>

      <td>
        Enum
      </td>

      <td>
        Type of issual restriction. Possible values:\<br/>`MAX_NUMBER_OF_ISSUALS_PER_CUSTOMER`: Maximum number of times a promotion can be issued to a customer.
      </td>
    </tr>

    <tr>
      <td>
                    • `value`
      </td>

      <td>
        Integer
      </td>

      <td>
        Number of units corresponding to the `name`. Specify `-1` for no limit (max limit: 100).
      </td>
    </tr>

    <tr>
      <td>
                • `earnRestrictions`
      </td>

      <td>
        Object
      </td>

      <td>
        Contains information on the earn limits for a promotion (specific to enrol-and-issue promotions).
      </td>
    </tr>

    <tr>
      <td>
                    • `name`
      </td>

      <td>
        Enum
      </td>

      <td>
        Type of earn restriction. Possible values:\<br/>`MAX_NUMBER_OF_EARNS_PER_CUSTOMER`: The maximum number of times a loyalty promotion can be issued to a customer.\<br/>`MAX_NUMBER_OF_EARNS_PER_PROMOTION`: The  maximum number of times a loyalty promotion can be issued across customers.\<br/>`MAX_POINTS_PER_EARN_PER_CUSTOMER`: The maximum number of points a customer can earn in a single event from a promotion.
      </td>
    </tr>

    <tr>
      <td>
                    • `value`
      </td>

      <td>
        Integer
      </td>

      <td>
        Number of units corresponding to the `name`. Specify `-1` for no limit (max limit: 100).
      </td>
    </tr>

    <tr>
      <td>
                • `expiryRestrictions`
      </td>

      <td>
        Object
      </td>

      <td>
        Contains information on the expiry for a promotion (mandatory for all promotion types).
      </td>
    </tr>

    <tr>
      <td>
                    • `name`
      </td>

      <td>
        Enum
      </td>

      <td>
        Action that is expiring. Possible values:\<br/>`ISSUAL_PROMOTION_EXPIRY_BASED_ON`: The time period within which the customer must complete the activity required to issue the loyalty promotion. Once this lapses, the customer cannot earn the loyalty promotion.\<br/>`EARN_PROMOTION_EXPIRY_BASED_ON`: The time period within which the customer must complete the activity required to receive the loyalty promotion benefits. Once this lapses, the customer cannot earn the benefits.
      </td>
    </tr>

    <tr>
      <td>
                    • `type`
      </td>

      <td>
        Enum
      </td>

      <td>
        Type of expiration. Possible values: `PROMOTION`, `CUSTOM`.
      </td>
    </tr>

    <tr>
      <td>
                    • `value`
      </td>

      <td>
        Integer
      </td>

      <td>
        Number of days the loyalty promotion expires from the date of issual.
      </td>
    </tr>

    <tr>
      <td>
        `scope`
      </td>

      <td>
        Object or null
      </td>

      <td>
        Scope of the promotion restrictions.
      </td>
    </tr>

    <tr>
      <td>
        `isStackable`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if the promotion can be applied alongside other active promotions within the same transaction.
      </td>
    </tr>

    <tr>
      <td>
        `isConsideredForRanking`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if the promotion is included in priority ranking, which controls which promotions take precedence when multiple are applicable to the same transaction.
      </td>
    </tr>

    <tr>
      <td>
        `loyaltyEarningType`
      </td>

      <td>
        String
      </td>

      <td>
        Indicates how customers earn rewards under this promotion — whether points are issued automatically or the customer must first opt in before earning.
      </td>
    </tr>

    <tr>
      <td>
        `expiryReminder`
      </td>

      <td>
        String
      </td>

      <td>
        Specifies the configuration for automated reminder communications sent to customers before their promotion benefits expire.
      </td>
    </tr>

    <tr>
      <td>
        `isExclusive`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if the promotion is evaluated in isolation, preventing any other promotion from being applied in the same transaction.
      </td>
    </tr>

    <tr>
      <td>
        `isAlwaysApply`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Indicates if the promotion is applied unconditionally, bypassing the ranking and stacking rules configured for the org.
      </td>
    </tr>

    <tr>
      <td>
        `targetGroupIds`
      </td>

      <td>
        Array of Integers
      </td>

      <td>
        The customer group IDs specifying which target segments are eligible for this promotion.
      </td>
    </tr>

    <tr>
      <td>
        `linkedTargetGroupVsTargetRuleIdMap`
      </td>

      <td>
        Object
      </td>

      <td>
        Maps each target customer group to the specific eligibility rules that apply to that group for this promotion.
      </td>
    </tr>

    <tr>
      <td>
        `cappingStatus`
      </td>

      <td>
        String
      </td>

      <td>
        Indicates whether capping limits are currently enforced, disabled, or not configured during promotion evaluation.
      </td>
    </tr>

    <tr>
      <td>
        `skipEarnedDateCheckOnRedeem`
      </td>

      <td>
        Boolean
      </td>

      <td>
        Determines whether redemption must occur within the validity window for the earned promotion.

        * false (default): Enforces date checks during redemption. The event date must be between the `createdOn` and `expiresOn` dates of the earn.
        * true: Skips the earned date window check during redemption; redemption can proceed even if the event date is before `createdOn` or after `expiresOn`.
      </td>
    </tr>

    <tr>
      <td>
        `targetRuleIds`
      </td>

      <td>
        Array of Integers
      </td>

      <td>
        The rule IDs specifying which earning rules define the points and benefits available through this promotion.
      </td>
    </tr>

    <tr>
      <td>
        `pageDetails`
      </td>

      <td>
        Object
      </td>

      <td>
        Contains metadata about the paginated result set, including current page, page size, and total record counts.
      </td>
    </tr>

    <tr>
      <td>
            • `pageNumber`
      </td>

      <td>
        Integer
      </td>

      <td>
        Current page number in the paginated result.
      </td>
    </tr>

    <tr>
      <td>
            • `pageSize`
      </td>

      <td>
        Integer
      </td>

      <td>
        Number of items displayed per page.
      </td>
    </tr>

    <tr>
      <td>
            • `totalEntries`
      </td>

      <td>
        Integer
      </td>

      <td>
        Total number of records available for pagination.
      </td>
    </tr>

    <tr>
      <td>
           • `pageCount`
      </td>

      <td>
        Integer
      </td>

      <td>
        Total number of pages available for the current query and page size.
      </td>
    </tr>
  </tbody>
</Table>

# API specific error codes

| Error | Description                                           |
| :---- | :---------------------------------------------------- |
| 8013  | Identifier name missing or incorrect.                 |
| 8015  | Identifier value missing or incorrect.                |
| 8003  | Source is missing or incorrect.                       |
| 4086  | `limit`, `offset`, or `sourceType` is missing         |
| 4055  | `limit`  is greater than 100                          |
| 4027  | `promotionId` or `startRuleIdentifier`  doesn't exist |
| 4083  | Incorrect event name is passed                        |
| 4082  | `eventName` is null / empty                           |
| 4084  | `sourceType` is empty / null                          |
| 4085  | `sourceType` parameter has an invalid value           |
| 4056  | All mandatory query parameters are missing            |
| 4050  | Query parameter is not supported                      |

<br />

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "v1",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://{host}",
      "variables": {
        "host": {
          "default": "host"
        }
      }
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "http",
        "scheme": "basic"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/api_gateway/loyalty/v1/programs/{programId}/promotions/{promotionId}/get": {
      "get": {
        "summary": "Get Loyalty Promotion by ID",
        "description": "Get details of the promotion using promotion ID.",
        "operationId": "get-promotion-by-id",
        "parameters": [
          {
            "name": "programId",
            "in": "path",
            "description": "Unique program ID.",
            "schema": {
              "type": "integer",
              "format": "int64"
            },
            "required": true
          },
          {
            "name": "promotionId",
            "in": "path",
            "description": "Unique identifier of the promotion",
            "schema": {
              "type": "integer",
              "format": "int64"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": {
                      "status": {
                        "code": 200,
                        "message": "success"
                      },
                      "validationErrors": null,
                      "data": [
                        {
                          "id": 95085,
                          "name": "AllRewards",
                          "description": "",
                          "promotionStatus": "COMPLETED",
                          "lastUpdateDate": "2025-06-23T08:02:58Z",
                          "lastUpdatedBy": 75155288,
                          "rulesetInfos": [
                            {
                              "id": 126408744,
                              "orgName": "DocDemo",
                              "contextID": 973,
                              "orgID": 100737,
                              "contextType": "program",
                              "rules": [
                                {
                                  "id": 126595178,
                                  "exp": "true",
                                  "expJSON": "\n{\n  \"arity\":\"literal\",\n  \"value\":\"true\",\n  \"type\":\"boolean:primitive\"\n}",
                                  "jsonType": "JNODE",
                                  "isActive": true,
                                  "priority": -1,
                                  "startDate": 1118300462375,
                                  "endDate": 2064985262375,
                                  "createdOn": 1749452462375,
                                  "caseToActions": {
                                    "true": [
                                      {
                                        "id": 126771365,
                                        "actionName": "AWARD_POINTS_ACTION",
                                        "actionClass": "com.capillary.shopbook.pointsengine.endpoint.impl.action.AwardPointsActionImpl",
                                        "mandatoryPropertiesValues": {
                                          "ProRateOnSourceValue": "EVENT_DEFAULT_VALUE",
                                          "DelayStrategy": "AS_DEFINED_IN_ALLOCATION_STRATEGY",
                                          "SourceValueRoundingStrategy": "ACTUAL",
                                          "EvaluatedEntity": "USER",
                                          "ExpiryStrategy": "11833",
                                          "PointType": "Main",
                                          "AwardStrategy": "11879",
                                          "DelayExtendedFieldName": "",
                                          "PointsRoundingStrategy": "ACTUAL"
                                        },
                                        "mandatoryComplexPropertiesValues": {},
                                        "description": "2X"
                                      },
                                      {
                                        "id": 126771366,
                                        "actionName": "CONVERT_POINTS_TO_REWARD_ACTION",
                                        "actionClass": "com.capillary.shopbook.pointsengine.endpoint.impl.action.RewardIssualActionImpl",
                                        "mandatoryPropertiesValues": {
                                          "quantityBasedOn": "POINTS_ON_EVENT",
                                          "brandName": "DOCDEMO",
                                          "rewardId": "295948",
                                          "brandId": "61",
                                          "quantityValue": "",
                                          "isRewardIssualForCustomerActivity": "true",
                                          "fulfillmentStatus": "ON ITS WAY"
                                        },
                                        "mandatoryComplexPropertiesValues": {},
                                        "description": "Convert points to reward action"
                                      },
                                      {
                                        "id": 126771367,
                                        "actionName": "BADGE_EARN_ACTION",
                                        "actionClass": "com.capillary.shopbook.pointsengine.endpoint.impl.action.BadgeEarnActionImpl",
                                        "mandatoryPropertiesValues": {
                                          "ownerType": "Loyalty_Promotion",
                                          "badgeMetaId": "67eb99516666db076c3c7519",
                                          "badgeMetaName": "Badge Issue georgetest",
                                          "referenceId": "973_TransactionAdd_c143a683"
                                        },
                                        "mandatoryComplexPropertiesValues": {},
                                        "description": "Badge Issue georgetest"
                                      },
                                      {
                                        "id": 126771368,
                                        "actionName": "ISSUE_ALTERNATE_CURRENCY_9DxGBP",
                                        "actionClass": "com.capillary.shopbook.pointsengine.endpoint.impl.action.BillAwardPointsActionImpl",
                                        "mandatoryPropertiesValues": {
                                          "ProRateOnSourceValue": "EVENT_DEFAULT_VALUE",
                                          "DelayStrategy": "AS_DEFINED_IN_ALLOCATION_STRATEGY",
                                          "SourceValueRoundingStrategy": "ACTUAL",
                                          "EvaluatedEntity": "USER",
                                          "AlternateCurrencyIdentifier": "9DxGBP",
                                          "ZeroAwardStrategy": "11879",
                                          "ExpiryStrategy": "11833",
                                          "PointType": "REGULAR",
                                          "AwardStrategy": "11879",
                                          "DelayExtendedFieldName": "",
                                          "PointsRoundingStrategy": "ACTUAL"
                                        },
                                        "mandatoryComplexPropertiesValues": {},
                                        "description": "2X"
                                      }
                                    ]
                                  },
                                  "ruleScope": "SERVER",
                                  "createdBy": 60594279,
                                  "modifiedBy": 60594279,
                                  "modifiedOn": 1749452462375,
                                  "name": "Rule 1",
                                  "description": "",
                                  "expDataType": null,
                                  "filterInfo": [],
                                  "ruleSetId": 126408744,
                                  "updatedViaNewUI": false
                                }
                              ],
                              "ruleScope": "SERVER",
                              "startDate": 1749427200000,
                              "endDate": 1751327999000,
                              "createdOn": 1749452462375,
                              "createdBy": 60594279,
                              "modifiedBy": 60594279,
                              "modifiedOn": 1749452462375,
                              "name": "ruleset_20250609070102",
                              "packageName": "",
                              "description": "",
                              "filterInfo": [
                                {
                                  "id": 126644898,
                                  "orgID": 100737,
                                  "ruleID": -1,
                                  "name": "LoyaltyType",
                                  "className": "com.capillary.shopbook.emf.impl.filter.LoyaltyTypeFilterImpl",
                                  "isInclude": true,
                                  "propertyToValues": {
                                    "loyaltyType": [
                                      "loyalty"
                                    ]
                                  }
                                },
                                {
                                  "id": 126644899,
                                  "orgID": 100737,
                                  "ruleID": -1,
                                  "name": "EventSource",
                                  "className": "com.capillary.shopbook.emf.impl.filter.EventSourceFilterImpl",
                                  "isInclude": true,
                                  "propertyToValues": {
                                    "eventSource": [
                                      "INSTORE"
                                    ]
                                  }
                                }
                              ],
                              "eventType": null,
                              "cappingInfo": [],
                              "updatedViaNewUI": false,
                              "label": null,
                              "private": false
                            }
                          ],
                          "programName": "DocDemoDefaultProgram",
                          "programId": 973,
                          "startDate": "2025-06-09T00:00Z",
                          "endDate": "2025-06-30T23:59:59Z",
                          "identifier": "0b89574e-aab9-49ad-812f-c1ea709f5daf",
                          "isActive": true,
                          "eventName": "TRANSACTIONADD",
                          "allocatePointsOn": "BILL",
                          "limits": {
                            "pointsPerCustomer": 0,
                            "numberOfTimesPerCustomer": 0,
                            "totalPointsInPromotion": 0,
                            "totalPointsPerEventLimit": 0
                          },
                          "useProportions": false,
                          "pointsOfferType": "GENERIC",
                          "promotionRestrictions": {
                            "restrictions": null,
                            "scope": null,
                            "loyaltyEarningType": null,
                            "expiryReminder": null,
                            "targetGroupIds": null,
                            "targetRuleIds": null,
                            "linkedTargetGroupVsTargetRuleIdMap": null,
                            "cappingStatus": null,
                            "skipEarnedDateCheckOnRedeem": false,
                            "isStackable": false,
                            "isConsideredForRanking": false,
                            "isExclusive": false,
                            "isAlwaysApply": false
                          }
                        }
                      ]
                    }
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "object",
                      "properties": {
                        "code": {
                          "type": "integer",
                          "example": 200,
                          "default": 0
                        },
                        "message": {
                          "type": "string",
                          "example": "success"
                        }
                      }
                    },
                    "validationErrors": {},
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 89972,
                            "default": 0
                          },
                          "name": {
                            "type": "string",
                            "example": "SummerPromotion"
                          },
                          "description": {
                            "type": "string",
                            "example": ""
                          },
                          "promotionStatus": {
                            "type": "string",
                            "example": "LIVE"
                          },
                          "lastUpdateDate": {
                            "type": "string",
                            "example": "2025-04-25T06:43:35Z"
                          },
                          "lastUpdatedBy": {
                            "type": "integer",
                            "example": 75139931,
                            "default": 0
                          },
                          "rulesetInfos": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 126396500,
                                  "default": 0
                                },
                                "orgName": {
                                  "type": "string",
                                  "example": "Bukl Enterprises"
                                },
                                "contextID": {
                                  "type": "integer",
                                  "example": 469,
                                  "default": 0
                                },
                                "orgID": {
                                  "type": "integer",
                                  "example": 100458,
                                  "default": 0
                                },
                                "contextType": {
                                  "type": "string",
                                  "example": "program"
                                },
                                "rules": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "integer",
                                        "example": 126577573,
                                        "default": 0
                                      },
                                      "exp": {
                                        "type": "string",
                                        "example": "true"
                                      },
                                      "expJSON": {
                                        "type": "string",
                                        "example": "{ \"arity\": \"literal\", \"value\": \"true\", \"type\": \"boolean:primitive\" }"
                                      },
                                      "jsonType": {
                                        "type": "string",
                                        "example": "JNODE"
                                      },
                                      "isActive": {
                                        "type": "boolean",
                                        "example": true,
                                        "default": true
                                      },
                                      "priority": {
                                        "type": "integer",
                                        "example": -1,
                                        "default": 0
                                      },
                                      "startDate": {
                                        "type": "integer",
                                        "example": 1114410534106,
                                        "default": 0
                                      },
                                      "endDate": {
                                        "type": "integer",
                                        "example": 2061095334106,
                                        "default": 0
                                      },
                                      "createdOn": {
                                        "type": "integer",
                                        "example": 1745562534106,
                                        "default": 0
                                      },
                                      "caseToActions": {
                                        "type": "object",
                                        "properties": {}
                                      },
                                      "ruleScope": {
                                        "type": "string",
                                        "example": "SERVER"
                                      },
                                      "createdBy": {
                                        "type": "integer",
                                        "example": 60594279,
                                        "default": 0
                                      },
                                      "modifiedBy": {
                                        "type": "integer",
                                        "example": 60594279,
                                        "default": 0
                                      },
                                      "modifiedOn": {
                                        "type": "integer",
                                        "example": 1745562534106,
                                        "default": 0
                                      },
                                      "name": {
                                        "type": "string",
                                        "example": "Rule 1"
                                      },
                                      "description": {
                                        "type": "string",
                                        "example": ""
                                      },
                                      "expDataType": {},
                                      "filterInfo": {
                                        "type": "array"
                                      },
                                      "ruleSetId": {
                                        "type": "integer",
                                        "example": 126396500,
                                        "default": 0
                                      },
                                      "updatedViaNewUI": {
                                        "type": "boolean",
                                        "example": false,
                                        "default": true
                                      }
                                    }
                                  }
                                },
                                "ruleScope": {
                                  "type": "string",
                                  "example": "SERVER"
                                },
                                "startDate": {
                                  "type": "integer",
                                  "example": 1745539200000,
                                  "default": 0
                                },
                                "endDate": {
                                  "type": "integer",
                                  "example": 1746057599000,
                                  "default": 0
                                },
                                "createdOn": {
                                  "type": "integer",
                                  "example": 1745562534106,
                                  "default": 0
                                },
                                "createdBy": {
                                  "type": "integer",
                                  "example": 60594279,
                                  "default": 0
                                },
                                "modifiedBy": {
                                  "type": "integer",
                                  "example": 60594279,
                                  "default": 0
                                },
                                "modifiedOn": {
                                  "type": "integer",
                                  "example": 1745562534106,
                                  "default": 0
                                },
                                "name": {
                                  "type": "string",
                                  "example": "ruleset_20250425062854"
                                },
                                "packageName": {
                                  "type": "string",
                                  "example": ""
                                },
                                "description": {
                                  "type": "string",
                                  "example": ""
                                },
                                "filterInfo": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "integer",
                                        "example": 126614945,
                                        "default": 0
                                      },
                                      "orgID": {
                                        "type": "integer",
                                        "example": 100458,
                                        "default": 0
                                      },
                                      "ruleID": {
                                        "type": "integer",
                                        "example": -1,
                                        "default": 0
                                      },
                                      "name": {
                                        "type": "string",
                                        "example": "LoyaltyType"
                                      },
                                      "className": {
                                        "type": "string",
                                        "example": "com.capillary.shopbook.emf.impl.filter.LoyaltyTypeFilterImpl"
                                      },
                                      "isInclude": {
                                        "type": "boolean",
                                        "example": true,
                                        "default": true
                                      },
                                      "propertyToValues": {
                                        "type": "object",
                                        "properties": {
                                          "loyaltyType": {
                                            "type": "array",
                                            "items": {
                                              "type": "string",
                                              "example": "loyalty"
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "eventType": {},
                                "cappingInfo": {
                                  "type": "array"
                                },
                                "updatedViaNewUI": {
                                  "type": "boolean",
                                  "example": false,
                                  "default": true
                                },
                                "label": {},
                                "private": {
                                  "type": "boolean",
                                  "example": false,
                                  "default": true
                                }
                              }
                            }
                          },
                          "programName": {
                            "type": "string",
                            "example": "Default Program"
                          },
                          "programId": {
                            "type": "integer",
                            "example": 469,
                            "default": 0
                          },
                          "startDate": {
                            "type": "string",
                            "example": "2025-04-25T00:00Z"
                          },
                          "endDate": {
                            "type": "string",
                            "example": "2025-04-30T23:59:59Z"
                          },
                          "identifier": {
                            "type": "string",
                            "example": "68254aca-2f85-4d28-a01b-14c2229ccbda"
                          },
                          "isActive": {
                            "type": "boolean",
                            "example": true,
                            "default": true
                          },
                          "eventName": {
                            "type": "string",
                            "example": "TRANSACTIONADD"
                          },
                          "allocatePointsOn": {
                            "type": "string",
                            "example": "BILL"
                          },
                          "limits": {
                            "type": "object",
                            "properties": {
                              "pointsPerCustomer": {
                                "type": "integer",
                                "example": 0,
                                "default": 0
                              },
                              "numberOfTimesPerCustomer": {
                                "type": "integer",
                                "example": 0,
                                "default": 0
                              },
                              "totalPointsInPromotion": {
                                "type": "integer",
                                "example": 0,
                                "default": 0
                              },
                              "totalPointsPerEventLimit": {
                                "type": "integer",
                                "example": 0,
                                "default": 0
                              }
                            }
                          },
                          "useProportions": {
                            "type": "boolean",
                            "example": false,
                            "default": true
                          },
                          "pointsOfferType": {
                            "type": "string",
                            "example": "LOYALTY_EARNING"
                          },
                          "promotionRestrictions": {
                            "type": "object",
                            "properties": {
                              "restrictions": {
                                "type": "object",
                                "properties": {
                                  "redemptionRestrictions": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "name": {
                                          "type": "string",
                                          "example": "MAX_ALLOWED_POINTS_PER_EVENT"
                                        },
                                        "value": {
                                          "type": "integer",
                                          "example": 100,
                                          "default": 0
                                        },
                                        "type": {
                                          "type": "string",
                                          "example": "NON_PERIOD_BASED"
                                        },
                                        "periodType": {},
                                        "periodUnit": {}
                                      }
                                    }
                                  },
                                  "issualRestrictions": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "name": {
                                          "type": "string",
                                          "example": "MAX_NUMBER_OF_ISSUALS_PER_CUSTOMER"
                                        },
                                        "value": {
                                          "type": "integer",
                                          "example": 1,
                                          "default": 0
                                        }
                                      }
                                    }
                                  },
                                  "earnRestrictions": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "name": {
                                          "type": "string",
                                          "example": "MAX_NUMBER_OF_EARNS_PER_CUSTOMER"
                                        },
                                        "value": {
                                          "type": "integer",
                                          "example": 5,
                                          "default": 0
                                        }
                                      }
                                    }
                                  },
                                  "expiryRestrictions": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "properties": {
                                        "name": {
                                          "type": "string",
                                          "example": "ISSUAL_PROMOTION_EXPIRY_BASED_ON"
                                        },
                                        "value": {
                                          "type": "integer",
                                          "example": 10,
                                          "default": 0
                                        },
                                        "type": {
                                          "type": "string",
                                          "example": "CUSTOM"
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "scope": {},
                              "isStackable": {
                                "type": "boolean",
                                "example": false,
                                "default": true
                              },
                              "isConsideredForRanking": {
                                "type": "boolean",
                                "example": false,
                                "default": true
                              },
                              "loyaltyEarningType": {
                                "type": "string",
                                "example": "ISSUE_AND_EARN"
                              },
                              "expiryReminder": {},
                              "isExclusive": {
                                "type": "boolean",
                                "example": false,
                                "default": true
                              },
                              "isAlwaysApply": {
                                "type": "boolean",
                                "example": false,
                                "default": true
                              },
                              "targetGroupIds": {},
                              "targetRuleIds": {},
                              "linkedTargetGroupVsTargetRuleIdMap": {},
                              "cappingStatus": {}
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false,
        "x-readme": {
          "code-samples": [
            {
              "code": "curl --location 'https://eu.api.capillarytech.com/api_gateway/loyalty/v1/programs/973/promotions/95085/get' \\\n--header 'Accept: application/json' \\\n--header 'Content-Type: application/json' \\\n--header 'accept: application/json' \\\n--header 'Authorization: Basic **********' \\\n--header 'Cookie: _cfuvid=PalohBnIeOaJn_i7_SIjlvuMVIMKCKUXffaPvYTwUdU-1758871239198-0.0.1.1-604800000'",
              "language": "shell",
              "name": ""
            }
          ],
          "samples-languages": [
            "shell"
          ]
        }
      }
    }
  },
  "x-readme": {
    "headers": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
      {
        "key": "Accept",
        "value": "application/json"
      }
    ],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```