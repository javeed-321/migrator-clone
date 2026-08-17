---
updatedAt: 2026-08-03T09:49:45.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Block-Level Reporting in Journey

The Journey Block Level Reporting feature provides detailed insights into the performance of individual blocks within a journey. This enhanced reporting capability helps you to understand how each block is performing and enables you to take action if required.

> 🚧 Notes
>
> * By default, this feature is not available for all the orgs. You need to raise a Jira ticket to the sustenance team to enable the feature for your org.
> * Journey **View Report** data is available only after a one-time Insights onboarding is completed for your organization. This setup is not automatic and must be explicitly requested.
>
>   Until onboarding is completed, the report shows 0 entries even when customers have entered and progressed through the journey.
>
>   To enable reporting, raise an onboarding ticket to the Insights engineering team.
>
>   This is a one-time setup per organization. Once completed, reporting will reflect actual journey data going forward.

## Type of KPIs in the report

The application fetches different types of KPIs, depending on the blocks used in the journey:

* Basic channel measures  such as Sent, delivered, clicked and opened (wherever applicable)
* Basic journey measures such as the number of customers who entered a block, number of customers who exited the journey, number of customers waiting in a wait block and so on
* Incentives measures - Issued and Redeemed

> 📘 Notes
>
> A journey report will be available 24 hours after the Journey goes live. This is based on the ETL sync time as it is based on the date from the Insights backend.

**KPI calculation details**

> * Open Rate is calculated as the number of opened emails divided by delivered emails (Open Rate = Opens ÷ Delivered).

* Delivery Rate is calculated as the number of delivered emails divided by sent emails (Delivery Rate = Delivered ÷ Sent).
* The number of sent emails may be lower than the targeted audience because customers can be excluded due to control group allocation, email subscription status (unsubscribed), or invalid/unreachable email addresses.
* Issuance Rate is calculated as the number of incentives issued divided by the number of eligible customers who reached the incentive block.
* The Incentive UI may display counts that differ from the Journey report because it uses a separate data source and may apply different filtering or processing logic.

## Viewing a report

To view a report of a Journey, perform the following:

1. From the Journey listing page, open the journey for which you want to see the performance report.
2. Turn on the **View report** toggle switch. The report is displayed for the individual blocks.

   <Image align="center" border={true} src="https://files.readme.io/1f48f364ce5fd5f49d95d080c923f453613ed5a0026c49f14e2118fb2b753470-image_4.png" className="border" />
3. You can use the date filter the performance date based on the date range. The maximum duration of a report is not limited, but you can adjust the date range as needed. Refer to  section [Using date filter](https://docs.capillarytech.com/docs/block-level-report-of-journeys#using-date-filter-for-report).

   <Image align="center" border={true} width="50% " src="https://files.readme.io/3bbc180-Date_filter.png" className="border" />
4. From the meat-ball menu, click the **Reset to default view** to reset the view.

## Using date filter for report

The date filter allows you to view the report for a desired date range. Below are the features of the date filter:

* The default date range for the report is from the date the journey went live until the current date.
* You can alter the date range for the report by changing the start and end dates.
* When you open the report mode, the application displays relevant data based on the selected version. For instance, if you have two versions of your journey and Version 1 spans from August 2 to August 3, the application will display the report for that specific duration when you open Version 1.