---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Partner Program

Partner programs are loyalty programs that are created outside Capillary. This entity contains APIs to add customer to a partner program and manage details, to use this API's "partner program linking" must be enabled for your organization. To get started, please submit a ticket to capillary.

## Status Codes

### Error Codes

| Code | Description                                                                                     |
| ---- | ----------------------------------------------------------------------------------------------- |
| 2001 | Cannot process the partner program event.                                                       |
| 2002 | Cannot proceed if `updateDetails`, `updatedTierName`, or `partnerProgramName` is empty or null. |
| 2003 | Partner tier expiry date should not be a past date.                                             |
| 2004 | Link the customer with the partner program.                                                     |
| 2005 | Customer is already linked with the partner program.                                            |
| 2005 | Enroll the customer in the Loyalty Program.                                                     |
| 2006 | Cannot find the partner program.                                                                |
| 2007 | Cannot find the partner program tier.                                                           |
| 2008 | Cannot process if partner program limit is more than `50`.                                      |
| 2009 | updateType  supports only UPDATE, RENEW, DOWNGRADE.                                             |
| 2010 | Partner program events are presented in a queue for the user.                                   |
| 2011 | Cannot find partner program activity for the customer.                                          |
| 2012 | Cannot fetch partner program activity.                                                          |
| 2013 | Input time interval should be less than a year for activity history.                            |
| 2014 | Invalid input. Activity type passed should be `LINKINGUPDATES` or `BENEFITSAVAILED`.            |
| 2015 | Cannot allow the date parameter if `activityType` = `linkingUpdates`.                           |
| 2016 | Incorrect benefit name.                                                                         |
| 2017 | Benefits count should be more than `0`.                                                         |
| 2018 | Cannot add benefits to supplementary membership.                                                |