---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure a Loyalty Promotion Report

Reporting for the new loyalty promotions is available on Insights+ and DataBricks. You can create a custom report and include data from a loyalty promotion. To create a custom loyalty promotions report, refer [Create Report](https://docs.capillarytech.com/docs/create)

To build the custom reports, you can use the following fact tables on Databricks:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Fact
      </th>

      <th style={{ textAlign: "left" }}>
        Fact Table
      </th>

      <th style={{ textAlign: "left" }}>
        Purpose & Documentation
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **Enrollment**
      </td>

      <td style={{ textAlign: "left" }}>
        `issued_promotions_fact`
      </td>

      <td style={{ textAlign: "left" }}>
        Records every instance a customer is successfully enrolled in or issued a promotion. Use this to measure the reach of your campaign.  
        [View Table Documentation](https://docs.capillarytech.com/docs/issued-promotions-fact-table)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **Opt-in**
      </td>

      <td style={{ textAlign: "left" }}>
        `earned_promotions_fact`
      </td>

      <td style={{ textAlign: "left" }}>
        Records when a customer successfully completes the required activity and meets the qualifying conditions. Use this to measure conversion.  
        [View Table Documentation](https://docs.capillarytech.com/docs/earned-promotions-fact)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **Reward Currency**
      </td>

      <td style={{ textAlign: "left" }}>
        `points`
      </td>

      <td style={{ textAlign: "left" }}>
        The central ledger for all currency transactions. Use this to track the exact number of points or currency issued specifically by a promotion.  
        [View Table Documentation](https://docs.capillarytech.com/docs/points-fact-table#points-fact-table)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **Metadata**
      </td>

      <td style={{ textAlign: "left" }}>
        `points_promotions`
      </td>

      <td style={{ textAlign: "left" }}>
        This dimension table stores the configuration details (Name, ID, Type) of your promotions. You link this to the fact tables to filter data by specific campaigns.  
        [View Table Documentation](https://docs.capillarytech.com/docs/dimension-tables#points-promotion)
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} width="80% " src="https://files.readme.io/a5161ec133d2cdbe33c52b5edbece1db83553c679c77f0db9f551ab1412feeea-image.png" className="border" />

<br />