---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# July-August-September 2021

# Insights+

## Enhancements in Advanced Options of Explore Mode

Explore Mode allows users to slice and dice the charts using Advanced options. However, some enhancements were required to improve the presentation and usability of these Advanced options to make them much more intuitive and user-friendly.

With this release, users will be able to better analyze the charts.

### Use cases

**Use Case 1**:

Analyze KPIs across the same event:  While checking overall sales, loyalty sales, or non-loyalty sales across attributes, you can apply one attribute to all KPIs together by just enabling the toggle button. This helps to analyze the KPIs across the same “event” - ex: last update date, bill conversion date, latest date, etc. Analyzing KPIs across the same base attribute provides the correct picture of the business

**Use Case 2**:

Prioritization of KPIs and Attributes - While analyzing acquisitions or registrations across customer tiers, Dates, and other KPIs, by using the newly introduced prioritization feature, one can easily view charts via multiple perspectives.

For example, Dates can be prioritized to view date-wise registration or tiers can be prioritized to view which dates have been more fruitful for acquisitions.

## Toggle button to enable users to apply a specific option across all KPIs

While checking overall sales, loyalty sales, or non-loyalty sales across attributes, you can apply one attribute to all KPIs together by just enabling the toggle button. This helps to analyze the KPIs across the same event. For example, last update date, bill conversion date, latest date, etc. Analyzing KPIs across the same base attribute provides a correct picture of the business.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/d4a7378--5dyzfdk5Y8vUe6AguJ7jEoB_Lxca-Jr1A.png" />

Applicable for the following sections

Dimension value based on the date

* Display % of total
* KPI Filters
* KPI Time Period

## Visibility of KPIs and attributes

Visible in their own containers in each of the advanced options for ease of use.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/319d6e4-d35a8_-fKGxZJbLfCC8CVFA_DRiy_2GuLg.gif" />

## Prioritization of KPIs and attributes

While analyzing acquisitions or registrations across customer tiers, Dates, and other KPIs, by using the newly introduced prioritization feature, one can easily view charts via multiple perspectives.

For example, Dates can be prioritized to view date-wise registration or tiers can be prioritized to view which dates have been more fruitful for acquisitions.

Users can drag and drop in respective containers, to order the KPIs and dimensions on the chart.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/a0d667a-wksbAx8EBY3vyp26JVtp2yT3SiqnBm_sEw.gif" />

Apply time-based dimension to all KPIs just with a single click.

## Inserting rows and columns in Pivot Table

Now, rows and columns have been stacked in parallel for better usability,

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/df1fee3-T6D0A05KMWBSII0RiIW-q9VHmYPBMgEZIA.gif" />

## Ability to add custom date for time-based dimensions

You can also add your preferred custom date to the chart for analysis requirements.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/f304969-ZF56HtKXMzSUTW7IksX_doxg5vJH8wRjmw.png" />

## Ability to include or exclude a specific filter from a KPI (variable KPIs)

As part of the KPI time period, you can specify a specific value of the KPI - for example, last 2 days, 10 days

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/1c96150-vzPRPiCB-OrlsZYfJiWQJg2indZ8Esc0RQ.png" />

<br />

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/2080fa1-UCskgcSYJh5PSUdOP3uCdva87poyPpDgXA.png" />

<br />

# Engage+

## Revoke a promotion

This release allows an org to revoke certain promotions that have already been issued to customers.\
With this release, an org can now revoke a loyalty earning or reward promotion for a particular customer and also revoke an earn instance(s) of a particular promotion.

API

* To revoke a promotion(s) for a customer, pass the customerID and promotionID.
* To revoke an earn instance, pass the earnID along with customerID and promotionID.

## Limit the days for unlocking or earning a promotion

With this release, you can limit the days in which a customer can unlock a promotion. This will help to increase the customer's engagement with org more efficiently. You can configure the days in which the customer can unlock the promotion and this feature is available only for a single activity type of earning promotion.

![](https://files.readme.io/ef1a3c6-promotons.png "promotons.png")

## Configure combo conditions in cart promotions

Earlier a customer could get incentivized even if they fulfilled only one condition out of three, as cart promotion supported ALL and OR based conditions and did check and validate expressions individually.

This feature allows an org to write a condition for combo offers. For example,

* Get chai and Samosa for 20
* Get iPhone and iWatch at 100K
* Buy 1 Shirt and 1 Jeans and get 50% off on Shoes.

![](https://files.readme.io/2230e43-shoes.png "shoes.png")

## Nested sorting logic in cart promotions

Brands were restricted to choose between expiry first or best discount strategy. Now they can decide the primary and secondary parameters for sorting among the two options available.

The promo engine allows brands to set the sorting logic used to decide which promotions to apply if there are multiple promotions applicable on products or carts. Brands could either sort them by Earliest expiry (a promotion that expires first) or Maximum discount, (promotion with the highest benefit).

![](https://files.readme.io/c2115ee-benefit.png "benefit.png")

## Multiple Language Support

**Problem Statement**\
Earlier, brands could display their content on the website and mobile app only in English, which was not understood by people from regions of the world.

**Solution**\
We supported English as the base language for any configuration or meta around entities, but now we have extended the support to add multiple languages through this feature.

**Scope of the feature**

* **Cart promotions**: Standard or custom fields of offers created using Cart Promotions.
* **Store**: Store-related fields.

![](https://files.readme.io/f2d16da-fields.png "fields.png")

**Use Case**\
**Show promotion and store details in org's preferred language**: Orgs with an online presence (web/mobile app) in languages, other than English, can add translations for the required fields of cart promotion in their preferred language and show translated text on their website using APIs.

**Before starting**

* You will need to enable the multi-lingual feature for the org.
* Have the support for different languages that you wanted to use.
* Enable the fields (of cart promotion or stores) for which you need translations.\
  For this, you need to create a JIRA ticket and assign it to the support or project management team with the complete details of the requirement.

*It might take 24 to 48 working hours to enable multi-language/fields for tranlation for the org.*

**Adding translation content**

To navigate to this feature, in the Organization Settings, find an option titled Tools and click on Localize page where you will find the multi-lingual configuration.

![](https://files.readme.io/e0d0ac6-heree.png "heree.png")

**APIs to fetch details in your preferred language**

*Get configs of a promotion*

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Request Type
      </th>

      <th>
        GET
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Headers
      </td>

      <td>
        Content-Type: application/json\
        X-CAP-API-AUTH-ORG-ID: \{\{orgId}}\
        Authorization: \{\{basic auth}}\
        Accept-Language: \{\{languagecode}}
      </td>
    </tr>
  </tbody>
</Table>

<HTMLBlock>{`
{host}/api_gateway/v1/promotions/config?promotionIds={promotionId}
`}</HTMLBlock>

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Request Type
      </th>

      <th>
        GET
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Header
      </td>

      <td>
        Content-Type: application/json\
        X-CAP-API-AUTH-ORG-ID: \{\{orgId}}\
        Authorization: \{\{basic auth}}\
        Accept-Language: \{\{languagecode}}
      </td>
    </tr>
  </tbody>
</Table>

<HTMLBlock>{`
{host}/api_gateway/v1/promotions/till/{{tillID}}
`}</HTMLBlock>

### FAQs

**How do we enable multilingual support for our organization?**\
Create a JIRA and assign it to the support or project management team. They will reach out to the respective team. It will take 24-48 working hours to enable this.

**How to add a new language?**\
Create a JIRA and assign it to the support or project management team. They will reach out to the respective team. It will take 24-48 working hours to enable this.

**What if I need it for another module apart from promotions and stores?**\
This will require effort from development and will go through the customer request or enhancement process.

## Offer Expiry Reminders

With this release, a notification is sent to a brand's or Capillary's POC before an offer expires. You can now change coupon expiry, issual, redemption settings based on the performance/ usage of coupons. For more details, click [here.](https://docs.capillarytech.com/docs/send-offer-expiry-reminders)

![](https://files.readme.io/2009d85-HERE.png "HERE.png")

## Message Delivery Status

**Problem Statement**\
When an org sends out a campaign message, the org used to receive a delivery report on whether the message was successfully sent or not after 12-24 hours. But customers needed an immediate response. This delay issue contributed to 30%-40% of the gateway issues.

**Solution**\
You can now see the time taken to update the delivery report on the Campaign's Message listing page. In case the delivery rate is not updated even after 12-24 hours, you can raise a ticket. For more details, click [here.](https://docs.capillarytech.com/docs/message-delivery-status)

![](https://files.readme.io/5a9f4da-HE.png "HE.png")

<br />

# Capillary Data Platform

Enhancements for this quarter.

* Retry Failed Loyalty Events
* Cart Promotions
* OTP Validation for Changing Customer Status

## Retry Failed Loyalty Events

On the customer profile page on Member Care, you can now view the list of loyalty events that have failed or are in the queue. In addition, you can also re-trigger failed events from the same page.

This release helps the support personnel whenever they receive calls/tickets from customers regarding loyalty event failures.

![](https://files.readme.io/9c502205f39512e854f2a329314a82cb961fac7d3a6c908fe76efe7cf151f156-image.png)

## Cart Promotions

On the customer profile page on Member Care, a separate tab to view Cart Promotions has been introduced, where you can see all cart promotions issued to a customer and cart promotions redeemed by a customer.

![](https://files.readme.io/06cb78ba7fa8bacf7a34f6afb47c80d2aa63ad363a981580b78586d1a6a3a164-image.png)

## OTP Validation for Changing Customer Status

With this release, you can validate a customer's status change to Deleted status by entering the OTP that is sent to the customer on Member Care. For more details, see OTP Validation for Changing Customer Status.

<Image align="center" src="https://files.readme.io/06ad5acd3752a4f81998ab6e2daf238ed74b53c80c42da2ba2339bbd695dbe97-f646ee8-otp_validation.gif" />