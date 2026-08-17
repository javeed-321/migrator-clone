---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attribute - Target Based

## **Attribute: targetAchieved.**

**Profile :** currentEvent & **Event in workflow:** Target Completed\
**Attribute :** Target Achieved (targetAchieved)\
**Type :** Integer(int)\
**Meaning :** Provides the numeric value of the actual achievement of the customer for the given target.\
**Sub-Attribute:** NA\
**Syntax: currentTxn.targetAchieved(“Target Name”)**

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Write a rule to check if the target value achieved for a VNBrand4 is greater than the defined value of the VNBrand5 Target.
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Rule: Condition1 > condition 2**
        **Condition1:**
        Profile: current Event
        Attribute: target achieved
        Target Name: VNTeamPilotBrand
        **Condition2:**
        Profile: current Event
        Attribute: target achieved
        Target Name: VNTeamPilotBrand
        **Rule: currentEvent.targetAchieved("VNBrand4")>currentEvent.targetDefined("VNBrand5")**
      </td>
    </tr>
  </tbody>
</Table>