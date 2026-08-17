---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attributes - Custom Field

## **currentCustomFieldValue**

**Profile :** currentEvent **\
Event in workflow :** Customer Update\*\*\
**Attribute :** currentCustomFieldValue\
**Type :** Boolean\
**Meaning :** Value of custom field after updating\
**Sub-Attribute:** Custom Field Name and Field Value\
**Syntax: currentEvent.currentCustomFieldValue("Custom Field Name","Field Value")\*\*\&#xA;**&#x45;xample: currentEvent.currentCustomFieldValue("age","26")\*\*

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: If the event is "Customer Update", Write a rule to check that the custom field "gstin" number value is changed from 342WER to "8932FHDKS"
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: currentEvent
        Attribute: currentCustomFieldValue
        custom field name: gstin
        Updated custom field value : "8932FHDKS"
        **Rule: currentEvent.currentCustomFieldValue("gstin","8932FHDKS")**
      </td>
    </tr>
  </tbody>
</Table>

## **previousCustomFieldValue**

**Profile :** currentEvent & **Event in workflow:** Customer Update\
**Attribute :** previousCustomFieldValue\
**Type :** Boolean\
**Meaning :** Customer's mobile number before updating\
**Sub-Attribute:** Custom Field Name and Field Valu**e\
Syntax: currentEvent.previousCustomFieldValue("Custom Field Name","Field Value")\
Example: currentEvent.previousCustomFieldValue("age\_group","value")\*\***

<Table align={["left"]}>
  <thead>
    <tr>
      <th>
        Example: Example: If the event is "Customer Update", Write a rule to check that the custom field "gstin" number value is changed from 342WER to "8932FHDKS"
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Profile: currentEvent
        Attribute: currentCustomFieldValue
        custom field name: gstin
        Previous custom field value : "342WER"
        **Rule: currentEvent.currentCustomFieldValue("gstin","8932FHDKS")**
      </td>
    </tr>
  </tbody>
</Table>