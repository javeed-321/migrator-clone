---
updatedAt: 2026-03-04T06:05:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Fraud Detection Rules

The fraud detection framework uses analytical rules based on KPIs and their thresholds (as defined by the brand) to detect anomalous activities.

# Terminologies

Below table gives the key terminologies in fraud management.

| Term           | Description                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Rule           | A predefined condition or guideline used to evaluate customer activities for signs of fraud.                                 |
| Threshold      | A predefined limit or value used to flag unusual or suspicious activity when exceeded or not met.                            |
| Critical Score | The minimum score a customer must reach for their activities to be flagged as potentially fraudulent.                        |
| Weightage      | The importance assigned to a specific rule in calculating the overall fraud score, expressed as a value between 0 and 1.     |
| Multiplier     | A value (1 for violation or 0 for no violation) applied to a rule’s weight to calculate its contribution to the fraud score. |

# Rules

The table below explains these rules in detail.

<Table>
  <thead>
    <tr>
      <th>
        Rule
      </th>

      <th>
        KPI
      </th>

      <th>
        Description
      </th>

      <th>
        Fraud Indication (Comparison with Threshold Value)
      </th>

      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Vintage and Visit**
      </td>

      <td>
        Vintage\_visit \< Threshold
      </td>

      <td>
        Vintage refers to the number of days since the customer's first transaction.\
        Visit refers to the total number of store visits made by the customer.\
        This Vintage​/ Visit value must remain above a predefined threshold value to avoid being flagged as fraud.\
        A very low value indicates that the customer is visiting the store too often in a short time, which might be suspicious.
      </td>

      <td>
        Lower than threshold indicates fraud (Frequent visits in a short time)
      </td>

      <td>
        If a customer made their first transaction 5 days ago (Vintage = 5) and has visited the store 5 times till now (Visit = 5), the KPI would be: 5/5=1\
        Suppose the predefined threshold for the KPI is 2. In that case, this value of 1 indicates that the customer is visiting the store more frequently than expected in a short time, which could be flagged as suspicious or fraudulent activity.
      </td>
    </tr>

    <tr>
      <td>
        **Transaction Hours Count in a Day**
      </td>

      <td>
        Distinct\_\
        transaction \_hours > Threshold
      </td>

      <td>
        Transaction hours are the distinct hours in a day when the customer makes transactions.\
        If a customer exceeds a predefined number of distinct transaction hours in a single day, it may indicate unusual activity.\
        This rule helps identify patterns like multiple purchases spread across different times of the day, which could suggest fraudulent behavior.
      </td>

      <td>
        Higher than threshold indicates fraud (Multiple purchases across different hours)
      </td>

      <td>
        If a customer purchases at 10 AM, 1 PM, 3 PM, and 7 PM on the same day, the distinct transaction hours are 4 (10 AM, 1 PM, 3 PM, 7 PM). If the predefined threshold for distinct transaction hours is 3, this customer exceeds the limit. This could indicate unusual behavior, such as multiple transactions at various times of the day, which might be flagged for further investigation.
      </td>
    </tr>

    <tr>
      <td>
        **Transaction Amount Limit**
      </td>

      <td>
        Max\_bill  

        * amount > Threshold
      </td>

      <td>
        Transaction amount refers to the total value of a transaction.\
        If a customer's transaction exceeds a predefined threshold, the system flags the transaction as suspicious.
      </td>

      <td>
        Higher than threshold indicates fraud (Large transaction amounts)
      </td>

      <td>
        If a customer makes a transaction with an amount significantly higher than the usual bill, for example, $1,500 when the predefined threshold is $500, the transaction exceeds the threshold. In this case, the customer will be flagged for further investigation, as this could indicate suspicious behavior.
      </td>
    </tr>

    <tr>
      <td>
        **Top Customer Percentile**
      </td>

      <td>
        Lifetime\_\
        purchase  

        * rank \< Threshold
      </td>

      <td>
        Evaluates a customer's position in the total purchase value percentile (e.g., lifetime purchase rank). If a customer's Rank is lower than the predefined threshold (say 0.1), it means they are among the top spenders. These customers are flagged for potential fraud, as high-spending behavior could include unusual activities, such as adding others' transactions.
      </td>

      <td>
        Lower than threshold indicates fraud (High lifetime purchase rank)
      </td>

      <td>
        If a customer ranks in the 0.1 percentile with lifetime purchases totaling $500, but suddenly makes significantly larger purchases, their behavior may be inconsistent and flagged as suspicious.\
        This rule helps detect anomalies in spending patterns among top customers.
      </td>
    </tr>

    <tr>
      <td>
        **Transactions in Different Zones**
      </td>

      <td>
        Max\_zones  

        * with  
        * billing on\_same  
        * day > Threshold
      </td>

      <td>
        If a customer makes multiple transactions in different regions on the same day or with a gap of 6 hours, it could indicate suspicious behavior.
      </td>

      <td>
        Higher than threshold indicates fraud (Transactions in multiple regions in one day)
      </td>

      <td>
        If a customer makes purchases in two different regions on the same day, such as in Region A at 10 AM and Region B at 3 PM, this might be flagged for investigation, as it is unusual to make purchases in two regions on the same day.
      </td>
    </tr>

    <tr>
      <td>
        **Visits and Latency**
      </td>

      <td>
        Latency outside threshold range
      </td>

      <td>
        Visits refers to the total number of store visits made by the customer.\
        Latency is the average time between visits, calculated as: (last bill date−joined date)/(visits−1).\
        The customer is more prone to fraud if they have a high number of visits and low latency (frequency of visits over time).
      </td>

      <td>
        Outside the threshold range indicates fraud (Frequent visits in a short period)
      </td>

      <td>
        If a customer has visited the store 10 times, and the time between the first and last visit is only 5 days, the latency =5/(10-1) = 5/9 = 0.56 days. If the threshold latency range is 0.1 and 2.0, this would be flagged as suspicious.
      </td>
    </tr>

    <tr>
      <td>
        **Spike in Transaction Amounts**
      </td>

      <td>
        Has\_spike  

        * bill = 1
      </td>

      <td>
        If there is an increase/ spike in transaction amount, more than 10 times the average transaction amount, the customer is likely engaged in fraudulent activity.
      </td>

      <td>
        Equal or higher than threshold indicates fraud (Transaction far exceeding the average)
      </td>

      <td>
        If the average transaction amount is $100 and a customer makes a $1,200 transaction, this amount is more than 10 times the average. This would be flagged for further investigation.
      </td>
    </tr>

    <tr>
      <td>
        **Transaction per Day**
      </td>

      <td>
        Max\_bill  

        * count  
        * in\_day > Threshold
      </td>

      <td>
        If the customer makes more transactions in a day than a predefined critical value, it could indicate suspicious behavior.
      </td>

      <td>
        Higher than threshold indicates fraud (Excessive transactions in one day)
      </td>

      <td>
        If a customer makes 15 transactions in one day, and the predefined critical value is 5, the customer will be flagged for fraud due to excessive transactions in a single day.
      </td>
    </tr>

    <tr>
      <td>
        **Transaction per Week**
      </td>

      <td>
        Max\_bill  

        * count  
        * in\_week > Threshold
      </td>

      <td>
        If the customer makes more transactions in a week than a predefined critical value, it could indicate suspicious behavior.
      </td>

      <td>
        Higher than threshold indicates fraud (Excessive transactions in one week)
      </td>

      <td>
        If a customer makes 30 transactions in a week, and the threshold value is 10, the customer will be flagged for fraud due to exceeding the number of transactions per week.
      </td>
    </tr>

    <tr>
      <td>
        **Latency of Redemption**
      </td>

      <td>
        Redemption\_\
        latency outside threshold range
      </td>

      <td>
        Redeemed visits are visits where the customer has redeemed coupons or points.\
        The Latency of redemption is defined as (max date of redemption – min date of redemption) / (# unique days where points were redeemed– 1).\
        If the number of redeemed visits is more than a predefined value and the latency of redemption is less than a predefined value, then the customer is more likely to commit fraud.
      </td>

      <td>
        Outside the threshold range indicates fraud (Rapid redemption activity)
      </td>

      <td>
        If a customer redeemed points 5 times in 2 days, with the latency of redemption being (2-1)/4 = 0.25 days, and the predefined threshold for latency is 1 day, this would indicate suspicious behavior.
      </td>
    </tr>

    <tr>
      <td>
        **Number of Times Points Redeemed**
      </td>

      <td>
        Redeemed  

        * visit  
        * days  > Threshold
      </td>

      <td>
        If the number of points redeemed by a customer exceeds a predefined threshold, the customer may be flagged for fraud.
      </td>

      <td>
        Higher than threshold indicates fraud (Excessive redemptions of points)
      </td>

      <td>
        If a customer redeems points 15 times in one month, and the predefined threshold is 5, this customer could be flagged for fraudulent behavior due to excessive redemptions.
      </td>
    </tr>

    <tr>
      <td>
        **Redeeming Rate**
      </td>

      <td>
        Redeemed  

        * rate > Threshold
      </td>

      <td>
        (Redeemed Visit Days) / (Awarded Visit Days)\
        Redeemed Visit days are the number of days when the customer redeemed points. Awarded Visit Days are the number of days when the customer was awarded points.\
        If the ratio of redeemed visit days to awarded visit days exceeds a predefined value, it could indicate suspicious behavior.
      </td>

      <td>
        Higher than threshold indicates fraud (Excessive redemptions compared to awarded days)
      </td>

      <td>
        If a customer has redeemed points on 8 days out of 10 awarded days, the ratio is 8/10 = 0.8. If the threshold is 0.5, it may suggest suspicious behavior.
      </td>
    </tr>

    <tr>
      <td>
        **Total Points Redeemed**
      </td>

      <td>
        Redeemed  

        * points  

        > Threshold
      </td>

      <td>
        If the total points redeemed by a customer exceeds a critical value, they may be flagged as fraud.
      </td>

      <td>
        Higher than threshold indicates fraud (Excessive points redeemed)
      </td>

      <td>
        If a customer has redeemed 50000 points in one month, and the critical value is 25000 points, the customer will be flagged for fraud due to excessive redemptions.
      </td>
    </tr>
  </tbody>
</Table>

> 📘 Note: If a brand needs to implement additional rules/ indicators, please contact the Data Science team.

# Sample fraud management input template

<Image align="center" className="border" border={true} src="https://files.readme.io/65543d78220434ebd7386b9946ca92c1d3a7b94d13ed33a204bc5cab25121c55-image.png" />