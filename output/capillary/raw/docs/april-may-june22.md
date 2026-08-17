---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# April-May-June 2022

# Loyalty+

## New and improved UI for Loyalty+ Promotions!

Loyalty+ Promotions are coming to you with a fresh coat of paint and some serious usability improvements across the board. Here's what you can look forward to:

* A calendar view to better visualize the schedule of your promotions and plan better
* View all your promotions across all programs and various customer activities listed in a single view
* See performance KPIs along with the promotions listing!
* Create and edit promotions in a single streamlined flow
* Performance improvements so that your promotions load fast even if you have hundreds of them

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/77a7e1d-Screenshot_2022-05-25_at_10.46.38_AM.png" />

### North star for tracking: Promotions Dashboard

The Promotions Dashboard is hands down the strongest addition to your campaign tracking, reporting and implementation. While inaccessible before, we’re now making this live for you to track:

* **Campaign Performance** - through points issued and redeemed in the campaign
* **Status** - If a campaign is active or inactive
* **Timeframes** - Duration of when the promotions are/were live for easier reporting
* **Owners** - Who was responsible for implementation of each promotion
* **Campaign Tagging** - Which customer activity and program a promotion is tied to

![](https://files.readme.io/dbe2b0b-promotions.gif "promotions.gif")

### Plan like a pro with the Promotions Calendar View

Get an insight into all promotions active in a time frame in a single snapshot view. The calendar view is created for pro marketers who want to plan in advance, avoid redundant overlaps and implement winning strategies.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/7e1e078-unnamed_2.gif" />

* **One-click activation** - Want to activate a promotion? Click. Want to pause a promotion? Click. It’s honestly as simple as that.

<Image align="center" className="border" width="smart" border={true} src="https://files.readme.io/2308f0d-unnamed_3.gif" />

## Supplementary Memberships to manage expiry of the scheme/program

Supplementary programs are micro programs run on top of the brand's core loyalty offerings. These offer customization at a segment level. However these programs can have limited life as they are promotional in nature or based on partner related benefits.

Currently we do not allow setting up the end of a particular supplementary program.

So, we have now enabled a feature supplementary program where brands can choose the exact date when they want the program to end.

While setting up the programs, we now have two additional toggle buttons :

* **Set Validity** - Brands can set/update the end date of a supplementary program (SP) while setting up the program. As soon as they toggle the button to yes, an option appears below (Validity till) where they can set/choose the date when you want to end the supplementary program.
* **Move customers to another program on expiry** - Once the program gets expired or deactivated as per the validity set in the above option, brands can move their customers to a different supplementary program. As soon as they toggle the button to yes, a drop down appears below (Backup partner programs), where they can select the partner program they want their customer to move to.\
  Only those partner programs who have the validity/expiry greater than the current partner programs will appear in the drop down.

![](https://files.readme.io/b3a20cc-LLM0AQHzUNaeY3pNCcaufCLLL0Z7NwE4Bw.png "LLM0AQHzUNaeY3pNCcaufCLLL0Z7NwE4Bw.png")

### Improved integrations for Loyalty+ Promotions

* Currently apps show running active loyalty promotions (points as benefit) to the customers. However there is no getCustomerPromotions API since loyalty promotions are not issued to a customer. They are event triggered.
* The challenge is to remove these promotions once the customer achieves the condition and points have been allocated for the promotion. For cart promotions, they check the redemption counts available and then do. However points promotions are displayed as a hack via cart promotion API.
* So, in the getPromotionsMetadata API for loyalty promotions, we have added a parameter “includeRestrictions” .
* If the parameter is passed, api to return the following limits set along with the customer achieved values against those limits

1. Maximum Points to be Issued in a Single Event
2. Restrict Number of Point Events for a Member
3. Maximum Points to be issued to a member
4. Maximum Points to be issued from the Promotion\
   Sample payload :\
   "limits": \{

   ```
                             “maxPointsperEvent”:100
   ```

"pointsPerCustomer": 1000,

```
                          "numberOfTimesPerCustomer": 2,

                          "totalPointsInPromotion": -1

        },

        "customerLimits": {
```

"currentPointsPerCustomer": 100,

```
                          "currentNumberOfTimesPerCustomer": 2,

        }
```

“promotionLimit”\{

```
                          "currentTotalPointsInPromotion": -1
```

}

### OU updates

* Improvements on Org Units (combined with CDP)
* OUs now recognize Product Masters and each OU can have independent product Masters
* OU added as a new element in “Scopes” for rule writing
* Loyalty Rules Engine now also recognizes Product attributes based on the OU

### Gift vouchers powered by Promotion Engine

Gift vouchers (Powered by Promotion Engine), enable brands to distribute or issue payment vouchers to their customers that act as currency. These are distributed via coalition or other marketing channels and can be physical or digital vouchers.

The key features of gift vouchers are :

* These can be owned by both Loyal and Non-loyal customers.
* They can specific to certain product category for eg. $10 Fuel voucher or $20 NFR voucher
* Depending on the subscription program(scheme), customers can get additional discounts
* Like cart promotions, gift vouchers can be configured as an incentive as a part of the Promotion Engine.

![](https://files.readme.io/e3c104b-ihGLWckZAp5eG5kMbwP72C4sOtV4EwyFMg.png "ihGLWckZAp5eG5kMbwP72C4sOtV4EwyFMg.png")

Stay tuned for more details !!

### Stacking of promotions at a quantity, lineitem and cart level (product-based or promotion-based approach)

Currently the system works in the way that only one promotion can be applied to one product or lineitem i.e it is technically not possible for us to evaluate the point based promotions, coupons, cart promotions/ gift vouchers in a single call.\
So, now brands can enable stacking of promotions at a quantity, lineitem and cart level.\
Stacking means applying multiple promotions on a product or at cart value.\
Product promotions means the benefit is on SKU/products.\
Cart promotions means the benefit is on cart total after applying the product promotions.\
So in the settings for Cart Promotions, you will now see the options to enable multiple promotions for a single lineitem/product & for cart level.\
You can simply toggle these buttons and configure the setting accordingly :\
Exclude any product/SKU if you want to from stacking.\
Apply further conditions on the product and enable stacking depending on the quantity of the product.\
Define a limit on the number of promotions (multiple promotions) applying on the cart if you wish to.\
Set discount calculation on the cart at a gross or net amount.

![](https://files.readme.io/61cba08-3Vph4P-LK0k4xgqKCWYvK3KJeyjW4y5TpQ.png "3Vph4P-LK0k4xgqKCWYvK3KJeyjW4y5TpQ.png")

### Tender-based cart promotions

Your brand might need to promote a specific payment mode or have tie ups with banks or payment providers. With the addition of tender based discount, you can now provide instant rebates to your consumers on the payment mode. You can completely customize it to any level.\
For example, you can issue a 10% discount to customers of Bangalore locations who shopped using ABC bank credit card.

![](https://files.readme.io/6af0c9e-hmPCN5_dLYk4D-4ScJVjO1wTAxHvrz0QVA.png "hmPCN5_dLYk4D-4ScJVjO1wTAxHvrz0QVA.png")

### Marvel now supports third-party points as currency for the purchase of rewards

Marvel reward issual are tightly coupled to the Loyalty+ for the points redemption, but what if the source of reference of the loyalty points is different for a brand. The requirement here is having rewards (from marvel) allocated to users by validating and redeeming the points from a third party instead referring to the default approach of validating and redeeming directly from the Capillary Loyalty system.

![](https://files.readme.io/1bbaf5f-juWabpxdo_NYDJvn3FAjkUkoS3KA3gDzFg.png "juWabpxdo_NYDJvn3FAjkUkoS3KA3gDzFg.png")

So, we have made this enhancement in the product module (marvel), to extend the support of external points systems to validate and redeem points against the voucher and catalog selected by the User.

<br />

## Data Import

Changes to promotion nomenclature and ID handling for customer promotion points through Import Framework

### Summary

We have made some key enhancements for the benefit of brands and system integrators that display promotion names for imported points in a customer-facing app or website and/or leverage promotion IDs for reporting on import activities across time.

The following are the changes made -

1. The promotion name you specify during import is now retained as-is - no timestamp is appended to the name.
2. Files imported using a particular import template will have the same promotion identifier assigned.
3. Specify an external promotion identifier for a particular import template. This could be a new or existing identifier.
4. The following import profiles will have the changes mentioned.

* Customer Promotion
* Bill Points Promotion(Accrual)
* Line Item Points Promotion
* Transactions(Bills) Deduction

> 📘
>
> For the Transactions (Bills) deduction profile, promotion expires all points and awards the remaining back as a single PABP entry for which the user specifies the name. Hence, it is part of this enhancement.

### Problem

Import framework is preferred and used extensively by brands to add promotional points to a customer’s account for multiple reasons. For example, bulk goodwill, integration lapses, promotions executed through other 3rd party systems, etc. While using the import framework, there are some challenges that brands and system integrators force.

1. Appending the date and time of processing the file automatically at the end of the promotion name.

* For example, If you name the promotion in the template as Bonus Points, then it would show up as Bonus Points-20220503122236.
* This was done earlier to maintain uniqueness, prevent conflicts in the system, and enable easy debugging.\
  Other superior methods (i.e. event logging) have come up since then to address these problems, but the timestamp remained.
* This made it unsightly and unfriendly from a UX perspective when used in a customer-facing app or website

2. Each file imported would get a separate internal promotion identifier generated by the system

* This made it difficult to pivot across all the points given through a single template for the purpose of business reporting or analysis
* This was particularly a problem since the import framework has file size limits, and there would often be instances where a single intended import has to be split across multiple files, and each ended up with their own identifiers

3. Users could not specify the external promotion identifier against these imported points

* This limits the usability of the external identifier feature
* It also made it impossible to have an activity where part of it would be executed through the Loyalty events, and a part gets imported

### Solution

1. The system no longer adds the timestamp to the end of the promotion name, and instead retains the name the user specifies. When you create these point entries, names stored in the backend are directly impacted and not just restricted to displaying names while fetching.

* For example, the name used to appear as “Bonus Points-20220503122236”, will now show up only as “Bonus Points”.

2. Multiple files imported using a particular saved import template will all have the same promotion identifier assigned to them

* This ID is retained as long as no changes are made to the template.
* When a new change is made in the template and saved, a new ID is generated.

3. Users can now input an external promotion identifier against a particular import template for those four mentioned templates

* This is optional.
* The user can provide a brand new identifier, in which case a new promotion is created with this identifier and name.
* The user can also provide an existing identifier, in which case points will be awarded under the existing promotion.

> 📘
>
> The user must take care to provide the same name as the existing promotion’s name. If there is a mismatch, the system will throw an error.

For more details,  see Bill points promotion, Line item points promotion, Customer promotion, and Transaction deduction.

### Future Scope

The following additional enhancements are planned in the near future to further improve the usability of the above features and to address some of the unsolved problems.

1. Easy traceability of the import file details against a particular point entry.

* The import file ID for a particular point entry will be made available through Ledger Explode API.
* The same will also be used in Member Care so that the user can find the import file ID directly from the points ledger in Member Care’s new UI in a few clicks.

2. Ability to import points from multiple activities/promotions in a single file or scheduled import.

* We will allow the user to optionally specify the promotion names and details as part of the file rather than the template itself, so that they may include multiple promotions in a single file itself.
* This can be useful in flat/batch file-based integrations with other third-party systems.

# Engage+

## Introducing Rich Communication Services (RCS) channel

### Context

Capillary provides various communication channels for marketers to engage with consumers. For example, SMS, email, WhatsApp, push notifications etc. While technology is advancing, parallelly the battle to capture consumers' attention is also increasing. Hence, reaching out to consumers creatively is a top priority. We are enhancing the product suite to enable marketers efficiently reach out to consumers, capture their attention and increase their engagement.

### Introduction

RCS (Rich Communications Services) messaging is aimed to replace SMS with a richer text system. This combines the messaging features of popular messaging apps like WhatsApp and Facebook Messenger delivered via the default SMS messaging app.

![](https://files.readme.io/25fd1be-z-w59HvLLLSvybZ-Z1OUKm003zcFiH40SA.png "z-w59HvLLLSvybZ-Z1OUKm003zcFiH40SA.png")

![](https://files.readme.io/aef2c24-Sdk3emzo9Qk--Jqoo4uk57xQayS0B3fv4Q.png "Sdk3emzo9Qk--Jqoo4uk57xQayS0B3fv4Q.png")

### What makes RCS stand out? - Features

* RCS allows brands to send media messages such as Images, Videos, and carousel media messages, add a CTA button in messages, and better UX.
* RCS enables brands to have their verified profile, business profile picture, and bio which increases the brand’s verifiability.
* RCS offers detailed analytics of campaigns ran, ranging from messages delivered to opened and click rates on links.
* Capillary allows brands to configure Fall back SMS within RCS Campaign so that users who are not reachable on RCS can be automatically reached out through SMS.

### What is the fallback SMS mechanism?

When a certain user is not reachable through RCS, then the system will send the configured fallback SMS to the user.

### What is the use of fallback SMS?

Brands can easily reach out to all its customer through one campaign and do not need to run separate campaigns for RCS and SMS. A possible small set of users who might not receive will directly get an SMS. So communication to each user is done through a campaign.

![](https://files.readme.io/6fb1d42-BUMGzpd0_Zdt1Fjdk4GreISwkj5Ha2cO5A.png "BUMGzpd0_Zdt1Fjdk4GreISwkj5Ha2cO5A.png")

### Benefits of RCS

* RCS messages are delivered in an SMS messaging box, where consumers are habituated to receiving promotional messages hence decreasing the chances of users blocking the brand.
* Through RCS  brands can engage their customers better by sharing high-resolution photos and videos, making it easier to add appointments to a calendar, mapping directions to physical outlets, sharing a carousel of products, and more!
* RCS does not have template whitelisting, therefore a smoother process for brands to run campaigns.
* RCS does not have a mandatory opt-out tag process, hence brands can leverage it to reach out to unreachable customers on another channel.

### Benefits with using Capillary for RCS

* Capillary enables brands to attach and issue offers to consumers and engage on the RCS channel.
* Capillary enables brands to segment target users and runs RCS campaigns, which yields better ROI.
* Capillary provides detailed analytics of campaign performance, user-level insights, purchase pattern, and ROI from both the online and offline world which helps brands to take data-backed decisions.
* Capillary provides functionality to configure fallback SMS, therefore, brands can run a single RCS campaign and target all sets of users, users who are not reachable on RCS directly gets an SMS.

### How to get access to RCS?

* We are going live with RCS in May, hence we are opening doors for brands to start with their RCS account creation process.
* For any brand to run RCS campaigns, it is mandatory to have an RCS account created, hence it would be in the best interest to start the onboarding process of respective brands.

Find a detailed feature guide for RCS which Capillary is going to support, [Rich Communication Service (RCS)](https://docs.capillarytech.com/docs/rich-communication-service-rcs) here].

Find a detailed feature guide for RCS which Capillary is going to support, here.

## New audience filter - Earned Promotions

Context\
We offer various types of filters to create audience lists.  This helps you target a precise set of audience to get more engagement and ROI on campaigns. Certain categories of filters are Promotion based, Loyalty based, User Profile based, Transaction based etc. We continuously try to add valid filters so that brands can have more edges while creating an target audience base for campaigns.

Problem Statement\
To increase customer engagement, brands run various promotions and set up rules for users to earn those promotions. In order to leverage this construct, and increase user loyalty - brands want to engage with specific users who have earned respective promotions. Brands want to run specialized campaigns for earned promotion users, and remind them about the promotions.

Earlier, we were not supporting filters for targeting promotions earned users.

Solution\
We have introduced a new filter, “Promotions Earned” in the Audience Manager.

* Promotions Earned - The filter will target the audience who earned promotions during a specific period.

<Image align="center" className="border" width="80%" border={true} src="https://files.readme.io/487fd4f-n1vZO80oLlN4-A4KPEfPPZt2cI9MsiXgjA.png" />

Example:  Filter users who have earned promotions more than 3 times in July month.\
Consider Zoha has earned 2 promotions on July 7, and 3 promotions on July 10, and Raj has earned 1 promotion on July 10.\
Who will make it to the filter list? - Zoha; As we want a user who has earned more than 3 promotions in the selected time range.

# Insights+

## Making text search case insensitive in Insights

### Problem Statement -

While searching for the filter value in the filter search option, the API returned only case-sensitive results. If the case is not matching despite the value match, the search won't return the asked value.

### Use Case -

* User wants to make a case insensitive search for the value

### Solution -

* Case insensitive search has been enabled in "Filters".

![](https://files.readme.io/54e0902-45c080b-4.png "45c080b-4.png")

## Data export - Fetch data for points at the line item level

### Problem statement -

Brands have point allocation rules at the line item level. The points allocation data at the line item level is used on a regular basis for audit and reconciliation purposes. But this data could not be fetched via exports in our system.

### Solution/Enhancement made -

Following changes have been made to resolve this -

* bill\_lineitem\_id column has been  onboarded to points fact so that data can directly be exported using the export templates
* The details of the line item against that particular line item ID can be obtained from Transaction Fact (which is also available on EI).
* Now bill\_lineitem\_id  of  Points fact can be tied with the transaction fact lineitem\_Id to check for points at the line item level.

## Return\_bill details(New export template)

### Problem Statement:

As part of handback data flow the information to tie any return transaction flows via three files:

1. **Return Transaction Fact** –This includes details about the return transaction
2. **Transaction Fact** –This helps to tie return transaction with original transaction
3. **Points Fact** –This file gives details of points returned against the transaction

There is no common identifier to map the points  return entry to the return transaction entry. Only cumulative return points can be reported as part of reporting.

![](https://files.readme.io/3b6f37a-image_8.png "image (8).png")

### Use Case:

User wants to export points data defining which return points entry corresponds to which return transaction entry

### Solution:

To resolve this, we have created a new Export Template which will have the Return Transaction Id of Return Transaction Fact and Points Event Id  of Points Fact. This way the user will be able to map the return points entry to the return transactions. This is more clearly depicted in the image below.

![](https://files.readme.io/6cb5a84-image_9.png "image (9).png")

### Steps to use the template :

Under the Export Template section , user can view the template returned\_bill\_details as shown in the screenshot below -

![](https://files.readme.io/3d09851-e598bae-returnbill.png "e598bae-returnbill.png")

## Introducing Capillary's Mobile View in Insights+ Reports

Now access Capillary's insightful reports - "anytime and anywhere on your mobiles''. The release of Mobile view for Insight+ reports marks the entry of Capillary's Core Products in the mobile UI world.

With the release of Mobile View of these reports, users can be more efficient in accessing the insights via Insights+ reports.

You can access Reports via Mobile by opening the Intouch module directly on the mobile browser or by clicking on View Report on Scheduled Reports email in your mobile.

On the mobile view on the browser, following capabilities are provided:

* Filter by Date Range and Compare across time Period

<Image align="center" width="smart" src="https://files.readme.io/18e6b11-lg4YorpEVq2PxtgWQ5r2itzvMQH3SkQF8Q.png" />

* Search for reports by report name
* Mark reports as Favorites

<Image align="center" width="smart" src="https://files.readme.io/b66f97a-i3tUNSnko_yHcHrBRsDjqqy0HhYlOuJYqw.jpeg" />

* Filter reports by category tags

<Image align="center" width="smart" src="https://files.readme.io/674cff1-GC2kUqnE9ZNe0tVbmCszSHJpLeSRdHn4xg.png" />

* View Details of the charts - KPIs and Filters

<Image align="center" width="smart" src="https://files.readme.io/9272d48-opEL3Ej5L3IitEkakGr5mRHjRjI-SLhE5A.jpeg" />

* Save reports as image

<Image align="center" width="smart" src="https://files.readme.io/aeb8a04-4rGXW5pXs9ebaqkIGxYynJ76ld0IudKjBg.jpeg" />

# Capillary Data Platform

## Introducing a new design to Member Care

We are happy to announce the new interface to Member Care with some fresh paint. In the current phase (phase 1), we rolled out the most frequently used component - The Customer Single View (CSV) page. You can now see a CSV page with a cleaner, better-organized view of customer information and a more intuitive user experience.

### Background

The old UI is dated and, as a result, has accumulated issues over the years. The feedback on the CSV, which is used by various personas, including customer Support personnel, System Integrators, Marketing Managers, Pre-sales teams, and Incident managers, has specifically revolved around the issues. The following is the list at a broad level.

* Clutter - The CSV has a lot of information on a single, long page. This leads to cognitive overload for users.
* Aesthetics - The UI of CSV and Member Care is not on par with Capillary products and competing products in the market. While the UI of other products has been refreshed, Member Care has been left behind until now.
* Unorganized - Customer information is not grouped together properly. Each source profile is a tab in the customer single view, although nothing changes between each except for identifiers and subscription statuses.
* Navigation - Useful information such as transactions, vouchers, loyalty details, and fraud/customer status are in different places and not easily accessible.
* Customization - With CSR and new vertical-specific use cases coming up, customization will become a requirement in the future. There is limited scope for customization in the old UI.

### Solution (Phase 1)

With the new design, you can see the following changes to the CSV page -

* UI that is consistent with other Capillary products.
* Reduced cognitive load as information is presented in an organized and progressive manner.
* Designed with the view of enabling customization in the future.
* A persistent left sidebar highlighting key aspects of a customer's profile such as sources, identifiers, loyalty slab information, and recent events.
* New, easy-to-access pages for viewing loyalty information, customer events, incentives, and interactions.
* Better visualization of points data using the recently launched Ledger API-driven points data.
* Useful additions include slab renewal, slab upgrade, cards, and other widgets.

### Upcoming changes

In the current phase, you will not see limited components. You can expect the following components in our upcoming releases.

* Actions - Identifier change, goodwill points/coupons issual, mobile reallocation, account merge, tag transactions, fraud status change, customer status change, subscription status change, test, and control status change, card linking/delinking, target value change, and card status change.
* From the More Information section in the current UI, the following will not be present in the first release of the new CSV UI - Leads, Audit Trails, B2B Loyalty, Points -> Slab Change Log, Points -> Expiry Schedule, Points -> Historical Points Log.
* User Groups v1 and v2 information and events.
* Request management, Tickets management, coupon search, and other items in Member Care that are not related to the CSV.\
  These items will be implemented through the AMJ’22 quarter and released sprint-wise.

### Rollout plan

Instead of a single big-bang release, we aim to roll out these UI/UX improvements incrementally over the coming quarters. The rollout will happen in phases and on an on-demand basis initially. Brands that opt to use the new UI now will be able to familiarize themselves with the new layout by toggling between the current and new layout before we eventually phase out the current layout.

For more details, see <https://docs.capillarytech.com/docs/member-care-v2>

## New template in Connect+ - Data Reconciliation

We have introduced a new Connect+ template for data reconciliation - comparing data in the Capillary CDP and client-given source data to identify events that got missed during ingestion into our CDP. This will directly replace the Diff Tool that has been leveraged for identifying missing events (such as transactions) and the Intap tool for ingesting those missing events in the CDP.

### Background

There have been cases over the years where source-side events fail to get ingested into Capillary CDP for various reasons, including integration issues, system downtime, time-out errors, and others. Typically, the source side events that get missed are transactions. If transactions are missed consistently, brands that rely on Insights+ will have problems on the reporting front. More importantly, if these transactions are for loyalty customers, there is an expensive implication on downstream Loyalty+ events for those customers.

To ensure that transactions or events such as customer registrations, return transactions, and transaction line items that happen at the source side are not missed, Capillary system integrators have been using a service called Diff Tool for a long time now. To identify missing events in the Capillary CDP, Diff Tool compares data from the source side with the data exported from Capillary CDP (via Data Export Framework). The data are compared based on fields such as bill\_number or a combination of bill\_number and store\_code for transactions (for customer data, it will be a customer identifier) to uniquely identify events in both data sets and then mark the missing items on the source data. These marked items are then ingested to Capillary CDP through another service called Intap.

For the last year, we have seen several issues on the Diff Tool front, which is consuming considerable developer bandwidth to maintain. Also, with Connect+ becoming the one-stop tool for integrations, data ingress, and egress, we have considered moving Diff Tool functionality to Connect+.

### Solution

With this release, Diff Tool functionality is now part of Connect+ as a new template. We will be moving away from calling it Diff Tool in Connect+ and calling it Data Reconciliation template as reconciling data on the source side and Capillary is the objective behind it. There is a change in the way how Connect+ handles data reconciliation vis-à-vis the Diff Tool. That is explained in the next section.

### How is the Data Reconciliation Template different from the Diff Tool?

Diff Tool compares two files and marks the missing records in Capillary CDP. The two files are:

* **Source side data** - This is the data, in the form of a CSV file typically, given by the client and is the source of truth. Let’s say there are 100 events (transaction events, for example) on a specific date, say Jan 1st, 2022, that was supposed to be captured on Capillary CDP. But due to some issues/errors, Capillary CDP has only 90 events. 10 events have gone missing, and these need to be ingested back into the system. The source-side data will have all the records that were supposed to be ingested, including the 10 missing events. This is dumped in an FTP location directly by the client.
* **Capillary CDP data** - This has the events data actually ingested in the Capillary CDP. This data can be exported from Data Export Framework on a daily basis. In our case, we will have Jan 1st, 2022 transaction data, in the form of a CSV file, exported into an FTP location using a recurring Data Export schedule typically. It will have only 90 events.\
  Now, what Diff Tool does is it compares these two files record by record depending on the comparison key (bill\_number, for example) setup. Then, it marks the missing records in the source data by adding a new column and writing one against missing events in the Capillary CDP. After this, the source file with the additional diff field (1 or 0 values) is placed into an FTP folder. Intap is then used to ingest the missing events.

In the Connect+ Data Reconciliation approach, the source data will not be compared to an exported file from the Data Export Framework. Instead, the source data will be compared directly with all the events (transactions in this scenario) present in the Insights+ backend. This way, the additional step of exporting data is removed. Overall, a system integrator needs to point to the FTP location where source data will be dumped and the type of event in the Connect+ approach. After that, the comparison will be made directly with the events in the Insights+ backend by the data reconciliation data flow to generate the missing events (marked by 1 in a new field).

For details on setting up data reconciliation flow, see [Step 4: Configure Dataflow Execution Frequency](https://docs.capillarytech.com/docs/step-4-configure-dataflow-execution-frequency) Setting up the Data Reconciliation Data Flow.