---
updatedAt: 2026-03-04T06:05:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# List of KPIs and Dimensions

# KPIs

A broad grouping of [KPIs](https://docs.capillarytech.com/docs/kpi-and-dimensions#kpi) is given below:

* Coupon - Includes KPIs such as Coupon Issued, Coupon Redeemed, Badge Earned.
* Campaign - Includes KPIs such as Contacted Customers, Responding Customers, Message Delivered.
* Points -  Includes KPIs such as Current Points, Points Returned, Expired Cashback.
* Customer - Includes KPIs such as New Customers, Customer Sales, Repeat Customers Visits.
* Transaction - Includes KPIs such as Loyalty Transactions, Return Transactions, Active Stores.
* Capillary AI - Includes KPIs such as Lap Customers, Expected Win Back Sales, Transact Spend Per Visit.
* Credits - Includes KPIs such as Credited, Debited, Balance.
* External Fact KPIs - Includes KPIs such as NPS Score.

Each KPI group has multiple subsections. For example, the coupons KPI along with the coupons related KPIs has multiple badges KPIs such as Badge Issued, Badge Earned, Badge Issued customers, and Badge Earned customers. You can select the KPI of interest for creating charts and reports.

<Image align="center" src="https://files.readme.io/eef687f52873f83eee13068bd610fcabe8131022fea6661ead97436465da26fe-image.png" width="auto" />

## KPI Library: Definitions and Applications

A list of the most frequently used KPIs is provided below, along with their descriptions, formulas for calculating KPI values (if applicable), and the business use of each KPI.

<HTMLBlock>{`
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr>
  <th style="border: 1px solid #ddd; padding: 8px;">KPI</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Formula used for calculation</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Business Use</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Redemption Rate</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Ratio of the number of coupons issued and the number of coupon redeemed, in the specified report duration.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Redemption Rate = 100* (Number of Coupon Redeemed) / (Number of Coupon Issued)<br>Count of the coupons derived from the COUPONS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of coupons redeemed by the customers during the report period. This can be further evaluated with respect to dimensions such as date, time, user attributes, store and zones, or campaign attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Coupon Issued</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of coupons issued, in the specified report duration.<br></p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of the total issued coupons derived from the COUPONS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of coupons distributed, in the specified report duration. This can be further evaluated with respect to dimensions such as date, time, user attributes, store and zones, or campaign attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Coupon Redeemed</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of coupons redeemed, in the specified report duration.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of the total redeemed coupons derived from the COUPONS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of coupons redeemed, in the specified report duration. This can be further evaluated with respect to dimensions such as date, time, user attributes, store and zones, or campaign attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Coupon Redeemer</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of customers who redeemed the coupon, in the specified report duration.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of the customers who redeemed the coupons from the COUPONS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of unique customers who redeemed a coupon. This can be further evaluated with respect to dimensions such as date, time, user attributes, store and zones, or campaign attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of final bill amount including taxes and discounts, but excluding returns. Transactions include both members and non-members.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of the bill_amount derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Revenue generated from transactions. This can help to evaluate business performance.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total Sales with Discount</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total sales from transactions made by both members and non-members, where a discount has been applied.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of the bill_amount derived from the BILL_LINEITEMS fact table, where discount is greater than 0.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total sales from transactions made by both members and non-members, where a discount has been applied. This helps analyze the impact of discounts on overall sales performance.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Net Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of final transaction amount including taxes, discounts and returns. Return sales are the value of items customers has returned.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Net Sales = (Total Sales) - (Return Sales)<br>Total sales The values are derived from the BILL_LINEITEMS fact table and Return Sales are derived from the RETURN_BILL_LINEITEM fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Actual revenue generated from sales after adjustments, providing insights into overall sales performance.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Return Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of the total sales that resulted in return transactions.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Return Sales = 100*( (Return Sales) / (Total Sales) )<br>Total sales The values are derived from the BILL_LINEITEMS fact table and Return Sales are derived from the RETURN_BILL_LINEITEM fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Proportion of sales that resulted in returns, useful for evaluating product performance and customer satisfaction.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>ATV</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average Transaction Value is calculated by dividing the total sales by the total number of transactions.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>ATV = (Total Sales) / (Total Transactions)<br>Total sales and Total Transactions are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average value of transaction, helps in understanding the purchasing behavior of the customers.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>ABS</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average Basket Size is the ratio of sum of item quantity and the total number of transactions. This does not consider returns.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>ABS = (Total Quantity) / (Total Transactions)<br>Total Quantity and Total Transactions are derived from BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average number of items per transaction, helps understand purchase volume per visit.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Loyalty conversion</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of total transactions made by customers enrolled in the loyalty program.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Loyalty Conversion = 100*( (Loyalty Transactions) / (Total Transactions) )<br>Transaction values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of total transactions made by loyalty customers.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Loyalty sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of final bill amount of all loyalty transactions including taxes, and discounts (excluding returns).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of the bill_amount derived from the BILL_LINEITEMS fact table for the loyalty customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total revenue generated from loyalty customers, useful for tracking loyalty-driven sales.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Product sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of line item amount in the transactions.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of the line_item_amount derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Product performance can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for buying, or product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Loyalty Txns</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of total transactions that were loyalty transactions (transactions made by loyalty customers).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Loyalty Txns = 100*( (Loyalty Transactions) / (Total Transactions) )<br>Transaction values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of total transactions that were loyalty transactions, helps understand the contribution of loyalty members to overall transactions.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Loyalty ATV</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average transaction value for transactions done by loyalty customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Loyalty ATV = (Loyalty Sales) / (Loyalty Transactions)<br>values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average transaction value for loyalty customers, useful for understanding loyalty customer spending behavior.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Loyalty ABS</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average number of items per transaction for loyalty customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Loyalty ABS = (Loyalty Quantity) / (Loyalty Transactions)<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average number of items per transaction for loyalty customers, valuable for understanding purchase volume by loyalty members.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Point Redemption bills</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of bills where points are redeemed by the loyalty customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of the customers who redeemed the points from the POINTS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of transactions where points were redeemed, useful for understanding customers point redemption behavior.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Point redemption sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sales generated by customers against redeeming points including taxes, and discounts (excluding returns).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of the bill_amount derived from the BILL_LINEITEMS fact table, where redeemed_points is greater than 0.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sales generated by customers against redeeming points, useful for understanding customers point redemption behavior.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Loyalty txns</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of transactions made by loyalty customers, across slabs.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of the bill_id derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total transactions by loyalty members, useful for understanding loyalty customer behaviour across slabs. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Points Expiry Communications Sent</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total communications sent to notify customers of points expiration within the selected time period.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of reminder_id derived from the POINTS_EXPIRY_REMINDER_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of reminders sent to customers about expiring points, in a specific period of time. This can be further evaluated with respect to dimensions such as date, time, communication channel, and user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Points Expiry Customers Contacted</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of customers contacted regarding points expiry, during the selected period.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of dim_event_user_id in the POINTS_EXPIRY_REMINDER_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of customers contacted regarding points expiry, during the selected period. This can be further evaluated with respect to dimensions such as date, time, communication channel, and user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Days Before Points Expiry</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of days before which the expiry reminder SMS was sent (before scheduled date of points expiry).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Maximum value for reminded_before_days column derived from the POINTS_EXPIRY_REMINDER_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Timing of expiry notifications, providing insights into the optimal reminder period for encouraging point redemption.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total Task</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of call tasks created within a specified date range. Call tasks are tasks created and assigned to store staff to process. The tasks could be call customers for birthday wishes that will get populated every day for the cashier to process.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of the dim_task_id derived from the CALL_TASK_CUSTOMER_STATUS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of call tasks created within a specified date range. This data can be further evaluated with zone, customer segment, call task action type, start or end date of the call task, or creator of the call task.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total Closed Task</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of call tasks closed within the specified date range.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of the dim_task_id derived from the CALL_TASK_CUSTOMER_STATUS fact table, where the status of the call task is COMPLETE.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of completed call tasks in a specific date range, useful for measuring task completion with respect to time. This data can be further evaluated with zone, customer segment, call task action type, start or end date of the call task, or creator of the call task.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total Open Task</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of call tasks remaining open within the specified date range.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of the dim_task_id derived from the CALL_TASK_CUSTOMER_STATUS fact table, where the status of the call task is OPEN.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of tasks still open, helping monitor pending tasks. This data can be further evaluated with zone, customer segment, call task action type, start or end date of the call task, or creator of the call task.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Tasks Open</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of total call tasks that are open.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Tasks Open = 100*( (Total Number of Open Tasks) / (Total Number of Tasks) )<br>Values are derived from the CALL_TASK_CUSTOMER_STATUS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Proportion of tasks still open. This data can be further evaluated with zone, customer segment, call task action type, start or end date of the call task, or creator of the call task.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Tasks Closed</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of total call tasks that are closed.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Tasks Closed = 100*( (Total Number of Closed Tasks) / (Total Number of Tasks) )<br>Values are derived from the CALL_TASK_CUSTOMER_STATUS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of tasks completed. This data can be further evaluated with zone, customer segment, call task action type, start or end date of the call task, or creator of the call task.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Tasks Picked</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of call tasks picked up (closed + in-progress).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Tasks Picked = 100*(( (Total Number of Closed Tasks) + (Total Number of InProgress Tasks) )/ (Total Number of Tasks) )<br>Values are derived from the CALL_TASK_CUSTOMER_STATUS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of tasks engaged (either closed or in-progress). This data can be further evaluated with zone, customer segment, call task action type, start or end date of the call task, or creator of the call task.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Test Responders - Closed and In-Progress Tasks</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>In a campaign there are two group of audiences - Test and Control.<br>Test: The audience that receives the campaign communication to measure its impact.<br>Control: The audience excluded from the campaign communication to serve as a benchmark for comparison.<br>Test Responders - Closed and In-Progress Tasks - This metric tracks the number of Test audience members who responded to the campaign by interacting with closed or in-progress call tasks. These tasks represent actions initiated by the store staff that have either been completed (Closed) or are actively being worked on (In Progress).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the RESPONSE_INFO and CALL_TASK_CUSTOMER_STATUS fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Behaviour of the Test Responders with respect to Closed and In-Progress Tasks. This can be compared for multiple campaigns, for a specified period.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Test Responder Sales - Closed and In-Progress Tasks</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total sales value generated by the Test audience members who responded to closed or in-progress call tasks. It reflects the revenue impact of tasks assigned to store staff that led to customer engagement and purchases.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the RESPONSE_INFO and CALL_TASK_CUSTOMER_STATUS fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total sales generated from responses associated with closed or in-progress tasks, for multiple campaigns, for a specified period.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Test Responder Txns - Closed and In-Progress Tasks</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>This metric represents the total number of transactions conducted by the Test audience members in response to closed or in-progress call tasks. It provides insights into the transactional behavior resulting from store staff&#39;s engagement efforts.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the RESPONSE_INFO and CALL_TASK_CUSTOMER_STATUS fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of transactions linked to customer responses in closed or in-progress tasks, for multiple campaigns, for a specified period.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Tasks In-Progress</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of total tasks created in the selected duration that are currently in progress, assigned by a particular store.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Tasks In-Progress = 100*( (Total Number of InProgress Tasks) / (Total Number of Tasks) )<br>Values are derived from the CALL_TASK_CUSTOMER_STATUS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Proportion of tasks currently in-progress out of all tasks created. These can be further evaluated with respect to the dimensions such as store attributes, user attributes, task action type, campaign attributes, date and time.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total InProgress Task</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of call tasks created in a date range and are in-progress.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of the dim_task_id derived from the CALL_TASK_CUSTOMER_STATUS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Volume of tasks still in progress within a selected date range. These can be further evaluated with respect to the dimensions such as store attributes, user attributes, task action type, campaign attributes, date and time.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Customers_ITD</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Customer ITD (Inception to Date) - Total number of customers registered in loyalty program in the selected duration.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the CUSTOMER_SUMMARY fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of customers who registered in the loyalty program within a specified period. This data can be further evaluated with store, date, time or customer segment.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Unsubscribed_ITD</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who unsubscribed from communication channels within the selected date range.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the CONTACT_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of customers who unsubscribed from communication channels within the selected date range. This data can be further evaluated with store, date, time or customer segment.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Active Campaigns</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of campaigns active in selected duration. A campaign is considered active if a customer is contacted or a contacted customer responds.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the CONTACT_INFO and RESPONSE_INFO fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of campaigns active in selected duration. This data can be further evaluated with respect to dimensions such as date, time, store, slab details of the customer, or campaign type.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Contacted Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers whose communications were successfully delivered during the campaign period.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the CONTACT_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of customers who received campaign communications, enabling analysis of campaign reach and communication success. This data can be further evaluated with respect to dimensions such as date, time, store, slab details of the customer, or campaign type.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Responder Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total sum of all transaction amounts, generated by customers who responded during the campaign. These include taxes and discounts (excluding returns).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the RESPONSE_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total sales generated by customers who engaged with the campaign. This data can be further evaluated with respect to dimensions such as date, time, store, slab details of the customer, or campaign type.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Responder Txns</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of transactions made by contacted customers during the campaign period.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the RESPONSE_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of transactions by customers who engaged with the campaign. This data can be further evaluated with respect to dimensions such as date, time, store, slab details of the customer, or campaign type.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Repeat Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of customers who made multiple purchases (repeat customers) within the selected period. It is calculated as the ratio of repeat customers to the total number of customers who shopped.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Repeat Customers = 100*( (Total number of repeat customers) / (total number of customers shopped) )<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Share of customers making repeat purchases, useful for understanding customer loyalty and retention within the period. This data can be further analyzed with respect to dimensions such as date, time, store, product details, ordering channel, or customer&#39;s card details.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Repeat Among New</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of new customers, who joined and made multiple transactions within the selected time range, calculated against the total new customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Repeat Among New Customers = 100*( (Customers who made multiple transaction and joined in a date range) / (Total customers who joined and transacted in the same date range) )<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of new customers making repeat transactions. This data can be further analyzed with respect to dimensions such as date, time, store, product details, ordering channel, or customer&#39;s card details.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Extra Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sales generated by customers against redeeming points including taxes, and discounts (excluding returns).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of the bill_amount derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Revenue from point-redemption purchases. This data can be further evaluated with store, date, time or customer segment.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Current Points</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total points that customers (registered during the report period) can currently redeem.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of the loyalty_points derived from the CUSTOMER_SUMMARY fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Current points that loyalty customers can redeem. This data can be further evaluated with store, date, time or customer segment.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Earn To Burn Ratio</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The ratio of total points earned and the total points redeemed by loyalty customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>(Total points earned) / (Total points redeemed)<br>Values are derived from the POINTS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Balance between points earned and redeemed. This data can be further evaluated with store, date, time or customer segment.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Points Redeemed</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of points redeemed by the loyalty customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the POINTS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total points redeemed by loyalty members. This data can be further evaluated with store, date, time or customer segment.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Member ATV</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average transaction value (ATV) for members, calculated as total sales from members divided by the number of member transactions.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>(Member Sales) / (Member Transactions)<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average transaction value for loyalty members, allowing for comparison with non-members. This data can be further analyzed with respect to dimensions such as date, time, store, product details, ordering channel, or customer&#39;s card details.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Non Member ATV</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average transaction value (ATV) for not-interested customers, calculated as total sales from not-interested customers divided by the number of not-interested customer transactions.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>((Non members sales) / (Non member transactions))</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average transaction value for non-members. This can be compared to member values and analyzed across dimensions such as date, time, store, product details, ordering channel, or customer card details.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers registered in the loyalty program, during the selected time period, with a particular store.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of user_id derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of customers registered in loyalty program, during a specific period, at a particular store. Helps evaluate the performance of the store, with respect to date, time, and customer attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Member Txns</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of total transactions made by members, with a particular store.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Member Txns = 100*( (Member Transactions) / (Total Transactions) )<br>Values derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Proportion of transactions made by loyalty members, in a particular store. This can be further evaluated with respect to date, time, or customer attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Sign Ups</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of customers who signed up for the loyalty program, in a particular month.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>% Sign Ups = 100* (customers) /( (customers) + (Non Member Transactions) )<br>Values are derived from the BILL_LINEITEMS and CUSTOMER_SUMMARY fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Percentage of customers who joined the loyalty program, in a particular month. This can be further evaluated with respect to dimensions such as time, store, or user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Active Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who are still actively purchasing (in recent months) and have not yet lapsed, having joined within the given date range. The default lapsation period is 90 days since their last purchase.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of active customers, in a given time period. This can be further evaluated with respect to dimensions such as time, store, or user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Winback Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who made a purchase within the selected date range, with their previous transaction being more than 90 days ago.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of days_since_last_visit derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Number of lapsed customers who resumed purchasing after a set period. This can be further evaluated with respect to dimensions such as time, store, or user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Avg Latency</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average number of days between consecutive customer visits.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the CUSTOMER_SUMMARY fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average number of days between consecutive customer visits. Provides insights into visit frequency.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Member Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of final bill amount of all member transactions including taxes, and discounts (excluding returns).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Tracks revenue generated from loyalty members.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Points Issued</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of points issued to loyalty customers, excluding any points deducted due to returns.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the POINTS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of points issued to loyalty customers, excluding any points deducted due to returns. These can be further evaluated with respect to the dimensions such as date, time, promotion attributes, programs, store and user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Expired Cashback</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of points that have expired for loyalty customers within the selected date range.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the POINTS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of points that have expired for loyalty customers. These can be further evaluated with respect to the dimensions such as date, time, promotion attributes, programs, store and user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>LCI</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The contribution of incremental sales to total sales, given as a percentage.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Incremental sales /total sales<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Highlights the contribution of loyalty program-driven sales. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Incremental sales LCI</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The contribution of incremental sales made by customers who redeemed their loyalty points (redeemers) compared to those who did not (non-redeemers).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Incremental sales LCI = ( (Redeemers count) *(( (Redeemers Sales) / (Redeemers count) )-( (Non Redeemers Sales) / (Non Redeemers count) )))<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sales contribution from the redeemers in comparison to non-redeemers. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Redeemers Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of final bill amount made by customers who redeemed their loyalty points (redeemers)</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Revenue generated by redeemers sales. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Non Redeemers Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of final bill amount made by customers who did not redeem their loyalty points (non-redeemers).</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Revenue generated from non-redeemers. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Spend per redeemers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average amount spent by redeemers, calculated as the total sales generated by redeemers divided by the number of redeemers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Spend per redeemers = (Redeemers sales) / (Redeemers count)<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average amount spend by redeemers. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Spend per non-redeemers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average amount spent by non-redeemers, calculated as the total sales generated by non-redeemers divided by the number of non-redeemers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Spend per non-redeemers = (Non redeemers sales) / (non redeemers count)<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average amount spent by non-redeemers. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Spend Per Visit Non Redeemers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average amount spent per visit by non-redeemers, calculated as the total non-redeemer sales divided by their visit count.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Spend Per Visit Non Redeemers = (Non redeemers sales) / (Non redeemers visit count)<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average amount spent per visit by non-redeemers, helps in understanding their spending behavior. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Spend Per Visit Redeemers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average amount spent per visit by redeemers, calculated as the total redeemer sales divided by their visit count.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Spend Per Visit Redeemers = (Redeemers sales) / (Redeemers visit count)<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average amount spent per visit by redeemers, helps understand their spending pattern. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Non Redeemers count</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who did not redeem any loyalty points within the selected period.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Non Redeemers count is the count of customers who have never redeemed their loyalty points. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Redeemers count</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who redeemed loyalty points within the selected period.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Redeemers count is the count of customers who redeemed their loyalty points. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Visit per customers Non Redeemers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average number of visits per non-redeemer customer, calculated as the total number of non-redeemer visits divided by the number of non-redeemer customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Visit per customers Non Redeemers = (Non Redeemers visit count) / (Non Redeemers count)<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average number of visits per non-redeemer customer. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Visit per customers Redeemers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average number of visits per redeemer customer, calculated as the total number of redeemer visits divided by the number of redeemer customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Visit per customers Redeemers = (Redeemers visit count) / (Redeemers count)<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average number of visits per redeemer customer. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Avg Sales Price</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average sales price, calculated as total sales divided by the total quantity sold within the selected date range.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Avg Sales Price = Total Sales / Total quantity count<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Provides average sales price. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Qty per customer</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average quantity purchased per customer, calculated as the total quantity sold divided by the total number of customers in the selected date range.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Qty per customer = Total qty / Total customer count<br>Values are derived from the BILL_LINEITEMS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Average purchase quantity per customer, helps understanding customer buying patterns. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Points credited</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of points credited to loyalty customers, including both issued points and any adjustments made. Points adjustments are changes made to a customer&#39;s points balance, in cases such as returns.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Points credited = (Points Issued) + (Points Adjustments)<br>Values are derived from the POINTS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of points credited to loyalty customers, in a specific time period.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Points Debited</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of points debited for the loyalty customers.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the POINTS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total number of points debited for the loyalty customers, in a specific time period.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Liability</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>This provides the current points liability of the redeemable points. Calculated as Points issued + Points Adjustment - Points Debited. It is recommended to use this KPI as ITD in charts. The standard report includes fraud users and admin tills. To exclude them, create a custom chart.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Liability = (Points Issued) + (Points Adjustments) - (Points debited)<br>Values are derived from the POINTS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Shows the current points liability. It is advisable to use this KPI as ITD in charts. In the standard report, this KPI includes data from fraud users and admin tills. To exclude them, consider creating a custom chart.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Redemption Transaction Net Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average net sales per redemption transaction. Redemption transactions are transactions where customers redeem points for a purchase.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Redemption Transaction Net Sales = (Extra Sales) / (Points Redeemed)<br>Values are derived from the BILL_LINEITEMS and POINTS fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Helps evaluate how much revenue, on average, is generated during a transaction involving points redemption.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Points Returned</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of points adjusted due to return transactions.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the POINTS fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Tracks points returned due to transactions, helps understand customer behavior.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Test Responder Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of transaction amount generated by test customers in campaigns. This includes taxes and discounts but excludes returns.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of bill_amount derived from the RESPONSE_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Reflects sales generated from test responders, providing data to evaluate campaign impact.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Hit Rate</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The ratio of the total Customers Responded to the total Customers Contacted, during a campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Hit Rate = 100* (Responding Customers) / (Contacted Customers)<br>Values are derived from the RESPONSE_INFO and CONTACT_INFO fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Measures campaign effectiveness by identifying the percentage of contacted customers who responded.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Responding Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who responded to the campaign, including both the test and control groups.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the RESPONSE_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Indicates the total customer response count for a campaign, helps evaluate campaign performance.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Response Product Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of lineitem amount of all response transactions. Response transactions are transactions where customers respond to a campaign by making a purchase.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of line_item_amount derived from the RESPONSE_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Tracks revenue generated from customer responses to measure campaign effectiveness. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Msg Sent</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of messages sent to customers during the campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count derived from the CONTACT_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Provides insight into the volume of messages sent to customers during a campaign. This can be further evaluated with respect to dimensions such as time, store, or user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Msg Delivered</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of messages delivered to customers during the campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count derived from the CONTACT_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Provides insight into the volume of messages delivered to customers during a campaign. This can be further evaluated with respect to dimensions such as time, store, or user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Delivery Rate</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of sent messages that were successfully delivered.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Delivery Rate = 100* (Msg delivered) / (Msg sent)<br>Values are derived from the CONTACT_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Reflects the success of message delivery. A higher rate indicates that more messages reached the intended recipients, improving the overall campaign effectiveness. This can be further evaluated with respect to dimensions such as time, store, or user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Incremental Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The additional sales generated by test customers compared to control customers, in a campaign, calculated as Incremental Sales = ((Test Hit Rate - Control Hit Rate) *(TEST Responders Spend per Customer) * (Test Customers Contacted))/100</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Incremental Sales = maxOf(((( (Test Responding Customers) / (Test Contacted Customers) )-( (Control Responding Customers) /maxOf( (Control Contacted Customers) ,0.0001)))* (Test Contacted Customers) * (Test Responder Sales) / (Test Responding Customers) ),0)<br>Values are derived from the CONTACT_INFO and RESPONSE_INFO fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Reflects the additional sales generated in a campaign, by the test group relative to the control group. This helps determine the impact of the campaign on sales. This can be further evaluated with respect to dimensions such as time, store, or user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>UpLift</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage increase in response rate of test customers compared to control customers, calculated as UpLift = ((Test Hit Rate - Control Hit Rate) / Control Hit Rate) * 100.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>UpLift = 100*(( (Test Responding Customers) / (Test Contacted Customers) )-( (Control Responding Customers) /maxOf( (Control Contacted Customers) ,0.0001)))/(( (Control Responding Customers) /maxOf( (Control Contacted Customers) ,0.0001)))<br>Values are derived from the CONTACT_INFO and RESPONSE_INFO fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Measures the relative performance increase in the test group compared to the control group. It helps evaluate the effectiveness of the campaign. This can be further evaluated with respect to dimensions such as time, store, or user attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Responder ATV</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The average transaction value for customers who responded to the campaign, excluding returns. Calculated as Responder ATV = Responder Sales / Responder Transactions.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Responder ATV = (Responder Sales) / (Responder Txns)<br>Values are derived from the RESPONSE_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Calculates the average transaction value for customers who responded to the campaign. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Campaign Points redeemed</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of points redeemed by loyalty customers in response to the campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of the redeemed_points derived from the RESPONSE_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Tracks the total number of loyalty points redeemed by customers in response to the campaign, helping understand customer redemption behavior. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Campaign Points redeemer</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who redeemed points while responding to the campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of user_id derived from the RESPONSE_INFO fact table, where redeemed_points are GREATER_THAN 0.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Shows the total number of customers who redeemed points during the campaign. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Test Contacted Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers contacted as part of the test group in the campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of user_id derived from the CONTACT_INFO fact table, where group_type is TEST.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Provides the number of customers contacted in the test group. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Control Contacted Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers contacted as part of the control group in the campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of user_id derived from the CONTACT_INFO fact table, where group_type is CONTROL.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Provides the number of customers contacted in the control group. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Test Responding Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers from the test group who responded to the campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of user_id derived from the RESPONSE_INFO fact table, where group_type is TEST.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Tracks the number of customers from the test group who responded to the campaign. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Control Responding Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers from the control group who responded to the campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of user_id derived from the RESPONSE_INFO fact table, where group_type is CONTROL.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Shows the number of customers from the control group who responded to the campaign. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Test Hit Rate</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of customers from the test group who responded to the campaign, calculated as Test Hit Rate = (Test Responding Customers / Test Contacted Customers) * 100.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Test Hit Rate = 100* (Test Responding Customers) / (Test Contacted Customers)<br>Values are derived from the CONTACT_INFO and RESPONSE_INFO fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Measures the success rate of the campaign. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Control Hit Rate</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of customers from the control group who responded to the campaign, calculated as Control Hit Rate = (Control Responding Customers / Control Contacted Customers) * 100.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Control Hit Rate = 100* (Control Responding Customers) / (Control Contacted Customers)<br>Values are derived from the CONTACT_INFO and RESPONSE_INFO fact tables.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Serves as a baseline to compare the test group&#39;s campaign performance. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Msg Not Delivered</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of messages that were not delivered to customers during the campaign.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the CONTACT_INFO fact table, where campaign_delivery_status is Delivered&#39;,&#39;Marked Unsubscribe&#39;,&#39;Marked Spam&#39;,&#39;Clicked&#39;,&#39;Opened&#39;.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Helps identify campaign message delivery issues to optimize messaging strategies.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Unsubscribed</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who unsubscribed from the communication channel.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the CONTACT_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Provides insight into customer disengagement.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Unique open rate</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of delivered messages that were opened at least once, during the campaign. Calculated as Unique Open Rate = (Unique Open Count / Msg Delivered) * 100.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Unique open rate = 100* (Unique open count) / (Msg Delivered)<br>Values are derived from the CONTACT_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Measures customer engagement by tracking how many delivered messages were opened, helping to assess the effectiveness of campaign messaging. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Unique Click Rate</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The percentage of delivered messages that were clicked at least once, during the campaign. Calculated as Unique Click Rate = (Unique Click Count / Msg Delivered) * 100.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Unique Click Rate = 100*( (Unique Click Count) / (Msg Delivered) )<br>Values are derived from the CONTACT_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Assesses the level of customer interest in the campaign, tracking how often delivered messages are clicked. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total open count</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of times emails were opened, during the campaign. Currently, this is equivalent to the &quot;open count&quot; KPI.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of the msg_id derived from the CONTACT_INFO fact table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Tracks overall email opens, helping to evaluate the reach of email campaigns and their engagement level. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, channel used for communication, or campaign message attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>First Timer Customers</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of loyalty customers who transacted for the first time with the brand.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of user_id derived from the BILL_LINEITEMS fact table, where repeat_status equals FIRST_TIME.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Monitors the success of acquiring new customers.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Customers Shopped</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who made a purchase and provided contact information, such as an email or phone number.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Distinct count of user_id derived from the BILL_LINEITEMS fact table, where membership column equals MEMBER.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Tracks the customer base that has provided contact details and made purchases, helping businesses understand their active customer set.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Repeat Customers Shopped</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of customers who have purchased on more than 1 transaction day. Once a customer makes a repeat purchase, they are considered a repeat customer for all future transactions.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Values are derived from the BILL_LINEITEMS fact table, where visit_day_count is GREATER_THAN 1.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Provides insight into customer retention by tracking repeat buyers.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Repeat Sales</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The sum of final bill amount of all repeat transactions including taxes, and discounts (excluding returns) by repeat customers in a transaction date range.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Sum of the bill_amount derived from the BILL_LINEITEMS fact table, where visit_day_count is GREATER_THAN 1 and membership equals MEMBER.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Measures the value of repeat purchases by loyal customers, important for evaluating long-term customer value and loyalty program effectiveness. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Total Txns</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The total number of transactions made by both members and non-members, excluding returns.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Count of bill_id derived from the BILL_LINEITEMS fact table</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Shows the total transaction volume, for understanding the overall sales performance for both loyalty members and non-members. This can be further evaluated with respect to dimensions such as date, time, user attributes, store attributes, ordering channel, card and product attributes.</p>
</td>
</tr>
</tbody>
</table>
`}</HTMLBlock>

# Dimensions

The list of [dimensions](https://docs.capillarytech.com/docs/kpi-and-dimensions#dimension) is given below, with each group containing multiple dimensions organized under these header dimensions. For detailed description of the dimentsion tables, refer to the [Dimension Tables documentation](https://docs.capillarytech.com/docs/dimension-tables).

|                              |                               |                             |
| ---------------------------- | ----------------------------- | --------------------------- |
| Source                       | Time                          | Last Purchased Store        |
| Last Purchased Concept Store | Conversion Date               | Last Transaction Date       |
| User                         | User Segments                 | Store Hierarchy             |
| Concept Hierarchy            | Conversion Time               | First Transaction Date      |
| First Redemption Date        | Loyalty                       | Date                        |
| Last Redemption Date         | Lapsation Date                | Preferred Order Channel     |
| First Purchased Till         | First Purchased Concept Store | Dob                         |
| Wedding Date                 | First Points Redemption Date  | Last Points Redemption Date |
| Repeat                       | First Awarded Date            | Voucher Redemption Status   |
| Points Redemption Status     | Latest Updated Date           | Latest Updated Time         |
| Joined Date                  | Coupon Event Type             | Coupon Series               |
| Expiry Date                  | Issual Date                   | Issual Time                 |
| Issual Type                  | Campaign Group                | Campaign                    |
| Issual Zone Till             | Entry Type                    | Membership                  |
| Line Item Outlier            | Product                       | Bill Outlier                |
| Line Item Type               | Parent Item                   | Order Channel               |
| Special Lineitem Type        | Nps                           | Cashier Id                  |
| Lineitem Cashier             | Conversion Request Date       | Conversion Request Time     |
| Bill Conversion Date         | Bill Conversion Time          | Item Discount Type          |
| Cashier Name                 | Card Used                     | Group Id                    |
| Communication Type           | Communication Channel         | Unsubscription Status       |
| Link Open Date               | Link Open Time                | Campaign Message            |
| Campaign Delivery Status     | Journey Block                 | Credit Event Type           |
| Credit Channel Rate          | Credit Utilization Campaign   | Credit Usage                |
| Badgemeta                    | Badges Owner Type             | Badges Issue Active         |

<br />

Each dimension group has multiple subsections. For example, the **Expiry Date** has multiple selectable levels such as Day of Month, Week of Year and Day of Week. You can select the dimension of interest for creating charts and reports.

<Image align="center" src="https://files.readme.io/fd3ea00c9b073cc4a39d985ce84b38f124eddf4f290c501d4d359ded87276739-image.png" width="auto" />