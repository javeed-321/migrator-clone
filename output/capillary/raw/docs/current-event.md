---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Profile : Current Event

CurrentEvent: The current event profile returns the event that is triggered by the event listener, i.e., the event on which the rule is created.

The following table consists of the descriptions of all the attributes of currentEvent.

## Attributes - Target based

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Definition
      </th>

      <th>
        Link
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        targetAchieved
      </td>

      <td>
        Provides the numeric value of the actual achievement of the customer for the given target.
      </td>

      <td>
        [Learn More](https://docs.capillarytech.com/docs/attribute-target-based)
      </td>
    </tr>

    <tr>
      <td>
        targetDefined
      </td>

      <td>
        Provides the numerical target value that is defined by the brand
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        targetExists
      </td>

      <td>
        Verifies whether the current event contains information about the target.  

        * \*Example:\*\* currentEvent.targetExists("ABC")
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        targetName
      </td>

      <td>
        Verifies whether the current event is talking about the target whose name contains the given string.  

        * \*Example:\*\* currentEvent.targetName.contains("AB")
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        isTargetAchievedEvent
      </td>

      <td>
        Verifies whether the current event is for the achievement of a target.  

        * \*Example:\*\* currentEvent.isTargetAchievedEvent
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        isUnifiedTargetAchievedEvent
      </td>

      <td>
        Verifies whether the current event is for the achievement of a unified target.  

        * \*Example:\*\* currentEvent.isUnifiedTargetAchievedEvent.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        isStreakAchievedEvent
      </td>

      <td>
        Verifies whether the current event is for the achievement of a streak level.  

        * \*Example:\*\* currentEvent.isStreakAchievedEvent
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        isSubTargetAchievedEvent
      </td>

      <td>
        Verifies whether the current event is for the achievement of a sub-target  

        * \*Example:\*\* currentEvent.isSubTargetAchievedEvent
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        targetMilestoneTrigger
      </td>

      <td>
        Verifies whether the current event is about the specific sub-target.  

        * \*Example:\*\* currentEvent.targetMilestoneTrigger.contains("name of sub-target")
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        streakName
      </td>

      <td>
        Verifies whether the current event is about the specific streak-level.  

        * \*Example:\*\* currentEvent.streakName("name of streak level")
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        streakExists
      </td>

      <td>
        Verifies whether the current event contains information about the streak-level mentioned.  

        * \*Example:\*\* currentEvent.streakExists("name of streak level")
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Attributes - Loyalty Information

| Attribute           | Definition                                                                                                  | Link                                                                                                |
| :------------------ | :---------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| previousLoyaltytype | Checks the loyalty status of the customer before the current event. Supported only for CustomerUpdate event | [Learn More](https://docs.capillarytech.com/docs/attribute-loyalty-information#previousloyaltytype) |
| currentLoyaltytype  | Checks the loyalty status of the customer during the current event. Supported only for CustomerUpdate event | [Learn More](https://docs.capillarytech.com/docs/attribute-loyalty-information#currentloyaltytype)  |

## Attribute - Custom Field

| Attribute                | Definition                               | Link                                                                                                 |
| :----------------------- | :--------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| currentCustomFieldValue  | Value of custom field after updating     | [Learn More](https://docs.capillarytech.com/docs/attributes-custom-field-1#currentcustomfieldvalue)  |
| previousCustomFieldValue | Customer's mobile number before updating | [Learn More](https://docs.capillarytech.com/docs/attributes-custom-field-1#previouscustomfieldvalue) |