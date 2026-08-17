---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attribute - Loyalty Information

## **previousLoyaltytype**

Profile : currentEvent\
Attribute : previousLoyaltytype\
Type : Boolean\
Meaning : Checks the loyalty status of the customer before the current event. Supported only for CustomerUpdate event\
Sub-Attribute: NA\
Values: LOYALTY/NON\_LOYALTY\
Example:\
currentEvent.previousLoyaltyType=="LOYALTY" or currentEvent.previousLoyaltyType=="NON\_LOYALTY"

| Example: Write a rule to check that the current customer loyalty before the event  was Non-loyalty customer and currently it's a loyalty customer. |
| :------------------------------------------------------------------------------------------------------------------------------------------------- |
| currentEvent.previousLoyaltyType.matches("NON\_LOYALTY")&&(currentEvent.currentLoyaltyType.matches("LOYALTY"))                                     |

## **currentLoyaltytype**

Profile : currentEvent\
Attribute : currentLoyaltytype\
Type : Boolean\
Meaning : Checks the loyalty status of the customer in the current event.\
Sub-Attribute: NA\
Values: LOYALTY/NON\_LOYALTY\
Example:\
currentEvent.currentLoyaltyType=="LOYALTY" or currentEvent.currentLoyaltyType=="NON\_LOYALTY"

| Example: Write a rule to check that the current customer loyalty before the event  was Non-loyalty customer and currently it's a loyalty customer. |
| :------------------------------------------------------------------------------------------------------------------------------------------------- |
| currentEvent.previousLoyaltyType.matches("NON\_LOYALTY")&&(currentEvent.currentLoyaltyType.matches("LOYALTY"))                                     |