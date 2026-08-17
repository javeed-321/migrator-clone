---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Cards

Card enables orgs to run card based loyalty memberships with multiple card types. A customer can have multiple cards of a same or different series as intended by the org.

`Card Series` represents different types of cards of a brand. For example, Value Card, Premium card, Digital Card, and Physical Card. A card series stores information such as card series name, card type, card numbers, config details, and expiry details.

A card is either physical or digital and is associated with a Card Series. A card stores information such as issued date, expiry date, store or source account from which the card is issued, and current status.

Cards are specific to customers and not to source accounts. A customer can have multiple cards of the same card series. Issuing a card means linking a card to a customer. The following are the different types of cards supported.

* Create auto-generated physical/digital cards for a series.
* Issue cards when a customer is registered (supports org level or OU level)
* Create manually generated physical/digital cards for a series.
* Issue external cards (that are not created in Capillary)

## Status Codes

### Error Codes

| Code | Description                                                                                                                 |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
| 701  | Invalid configurations set                                                                                                  |
| 702  | Maximum card numbers reached.                                                                                               |
| 703  | Card number generation disabled                                                                                             |
| 704  | Invalid card number length configured.                                                                                      |
| 705  | Card number generation failed due to unexpected reason.                                                                     |
| 1060 | Exceeded maximum limit size of 200.                                                                                         |
| 3000 | Invalid card series.                                                                                                        |
| 3001 | Series code empty.                                                                                                          |
| 3002 | Series already exists.                                                                                                      |
| 3003 | Series type is empty.                                                                                                       |
| 3004 | Series does not exist.                                                                                                      |
| 3005 | Card length invalid.                                                                                                        |
| 3006 | Card configuration already exists with the same prefix, suffix and card length.                                             |
| 3007 | Card generation config not passed.                                                                                          |
| 3008 | Card series expired.                                                                                                        |
| 3009 | Card number exists.                                                                                                         |
| 3010 | Card number does not exists.                                                                                                |
| 3011 | Card status not passed.                                                                                                     |
| 3012 | Card status same as passed.                                                                                                 |
| 3013 | Card status can only be changed to expired, deleted or suspended.                                                           |
| 3014 | Status labels are empty.                                                                                                    |
| 3015 | Duplicate statuses passed.                                                                                                  |
| 3016 | \{x} card status is not valid.                                                                                              |
| 3017 | Status label invalid.                                                                                                       |
| 3018 | Card status label is not mapped to NOT\_ISSUED.                                                                             |
| 3019 | Card expiry days should not be negative.                                                                                    |
| 3020 | DIGITAL & PHYSICAL are the only possible card types.                                                                        |
| 3021 | No change in card generation configurations.                                                                                |
| 3022 | Card prefix passed is not a standard string.                                                                                |
| 3023 | Card suffix passed is not a standard string.                                                                                |
| 3024 | Card number total length should not be more than 150.                                                                       |
| 3025 | Count field invalid.                                                                                                        |
| 3026 | Card count exceeds 100000.                                                                                                  |
| 3027 | Card is not linkable.                                                                                                       |
| 3028 | Card length should not be less than 5.                                                                                      |
| 3029 | Card number max length exceeded.                                                                                            |
| 3030 | Card generation failed.                                                                                                     |
| 3031 | Card can not get be unlinked.                                                                                               |
| 3032 | \{x} is not alphanumeric. <br />Org unit passed is not valid.                                                               |
| 3033 | Card expiry days not passed.<br />\{x} status mapping is not passed.                                                        |
| 3034 | Max active card per customer passed is negative. <br />Default label is not set for \{x} status.                            |
| 3035 | Multiple cards can not be registered/updated in a single call. <br />More than one label is set as default for \{x} status. |
| 3036 | Active cards of the customer exceeded the max configured value for this card series. <br />\{x} label passed is repeating.  |
| 3037 | Multiple cards can not be linked or unlinked at once. <br />Org unit passed is linked to a different card series.           |
| 3038 | Card status can not be changed from \{x} to \{y}.<br />Registration trigger exists for a different card series.             |
| 3039 | No update in status label.<br />Active cards of the customer exceeded the max configured value for this org.                |
| 3040 | \{x} action not supported for status \{y}.                                                                                  |
| 3041 | \{x} action not mapped for label \{y}                                                                                       |
| 3042 | customer status was marked to deleted. Any further changes on this customer are not allowed.                                |
| 3043 | Org unit trigger exists for this org.                                                                                       |
| 3044 | Customer status is disabled.                                                                                                |
| 3045 | Card external id exists.                                                                                                    |
| 3046 | Card external id & card number mismatch.                                                                                    |
| 3047 | Card offset invalid.                                                                                                        |
| 3048 | Mapped Entity type \{x} and Entity value \{y} passed is invalid.                                                            |
| 3049 | Mapped Entity Type Passed is invalid.                                                                                       |
| 3050 | Card external id length \{x} should be equal or greater than card id length \{y}.                                           |
| 3051 | Unable to update/generate card external id.                                                                                 |