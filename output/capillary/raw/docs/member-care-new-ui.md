---
updatedAt: 2026-06-24T13:17:27.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Member Care

The member care page provides the complete details of a customer.

# Introduction

The new Member Care UI displays the customer details in a better-organised way and provides a better user experience.

By default, the new member care is enabled for all the orgs.

> **Note on expiry date display**
>
> When the configuration to display expiry dates in the user's local timezone is enabled, expiry dates are shown based on your device's timezone. If your local timezone is behind your organization's timezone, expiry dates that end at midnight may appear as the previous day. This display difference does not affect the actual expiry time stored in the system.

> **Note**
>
> You can search only by the primary card number for each customer by default. Secondary card numbers are not searchable unless you specify search criteria that include the number of cards. If you enter a secondary card number, the system will not return results unless the search is configured to include multiple cards per customer.

**Transaction search limitations:**

* You can view up to 50 transactions per search. The system retrieves a maximum of 50 transactions per request, sorted by date in descending order, within the selected date range.
* You can filter these transactions using the available filters. Filtering applies only to the transactions already loaded. The system does not support searching by transaction number on the server.
* You cannot select arbitrary years or months for the date range. The date range selection is limited to predefined options.

<Image src="https://files.readme.io/dfe3269-1.gif" align="center" width="smart" border={true} />

# Switching to the new UI

To switch to the new member care from the old UI <Glossary>CSV</Glossary> page, click **Open new Member Care**.

<Image src="https://files.readme.io/e4c005a-Switch_to_new_UI.png" align="center" border={true} />

Also, from the old UI, if you click **Customer Search** the customer search opens in the new UI.

<Image src="https://files.readme.io/7bf007a-3.gif" align="center" border={true} />

## Sharing new profile link

To share the new member care UI, use url *{host URL}/member-care/ui/*.

To share or view the customer page in the new UI, use url *{host URL}/member-care/ui/{userId}*.

For example, [https://eu.intouch.capillarytech.com](https://eu.intouch.capillarytech.com/ "https://eu.intouch.capillarytech.com/")[/member-care/ui/172076358](https://eucrm.cc.capillarytech.com/member-care/ui/172076358).

# Switching to the old UI

From the **Customer Search** page, click **Open old Member Care** to switch to the old UI.

<Image src="https://files.readme.io/6c42392-Switch_to_Old_member_care.gif" align="center" border={true} />

In addition, from the search result page, you can click on the switch icon and switch from the new UI to the old UI.

![](https://files.readme.io/4bad84a-Switch_to_Old_UI.png)

> 👍 Note
>
> * [ ] Switching behavior is applicable only for **Search** > **Customer** and CSV pages. Once you switch to the old UI, everything else will work as it is.
> * [ ] You can enable the config `CONF_MCARE_ENABLE_ORG_TZ_CHANGES` to ensure the details appear on the New Member Care UI according to the organization's time zone. To enable this config, create a ticket to the Capillary Product Support Team. This configuration is not applicable for the Old Member Care UI.

## Sharing old UI profile link

You can share the old UI customer profile link directly. To share, use the url *{host}/memberCare/search/Customer?oldFlow=true*.

For example, [https://eu.intouch.capillarytech.com//memberCare/search/Customer?id=172076358\&oldFlow=tru](https://eucrm.cc.capillarytech.com/memberCare/search/Customer?id=172076358\&oldFlow=true)

> ❗️ You must use oldFlow=true parameter to directly navigate to the old UI search page. If you use the same URL without the oldFlow parameter, you will be redirected to the new Customer Search page.

<br />