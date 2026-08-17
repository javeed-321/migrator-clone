---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Leads

A lead is an individual interested in buying a product. Leads can be created for both loyalty and non-loyalty customers. This resource provides you the APIs to create, manage and fetch leads.

Following are the predefined enum values for type and status respectively.

* Enums for type : SKU, CATEGORY, BRAND, CUSTOM (for custom types)
* Enums for status : OPEN, WON, LOST, ON\_HOLD, DELETED

## Status Codes

### Error Codes

| Code  | Description                                          |
| ----- | ---------------------------------------------------- |
| 92001 | Lead not found                                       |
| 92002 | Duplicate Lead Status                                |
| 92003 | Invalid Lead Status \{0}                             |
| 92004 | Lead Reason not found with id \{0}                   |
| 92005 | `followedUpOn` cannot be null                        |
| 92006 | `leadFor` cannot be null                             |
| 92007 | `userId` cannot be null                              |
| 92008 | No user found with the given userId \{0}             |
| 92009 | Invalid Lead Type                                    |
| 92010 | `LeadId` cannot be null                              |
| 92011 | Customer Registration failed                         |
| 92012 | User Details cannot be empty                         |
| 92013 | Org Source cannot be null                            |
| 92014 | Invalid org source                                   |
| 92015 | Invalid Id Type                                      |
| 92016 | Invalid SKU \{0}                                     |
| 92017 | Invalid Brand \{0}                                   |
| 92018 | Invalid Category \{0}                                |
| 92019 | Invalid lead owner \{0}                              |
| 92020 | Invalid lead sub status \{0}                         |
| 92021 | Lead sub status \{0} already exists for status \{1}  |
| 92022 | Lead status cannot be empty                          |
| 92023 | Lead sub status cannot be empty                      |
| 92024 | Status change not allowed on closed leads            |
| 92025 | Customer is not registered. Auto-registration is off |