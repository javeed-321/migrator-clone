---
updatedAt: 2026-03-04T06:05:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Issued Promotions Fact Table

**Databricks Table Name:** issued\_promotions\_fact

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Column Name
      </th>

      <th style={{ textAlign: "left" }}>
        Data Type
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        <Glossary>Linked Table</Glossary>
      </th>

      <th style={{ textAlign: "left" }}>
        Availability for Export in the Standard Template
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        auto\_update\_time
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Date and time when the corresponding table available at the source was last updated. It is in the Unix timestamp format.
      </td>

      <td style={{ textAlign: "left" }}>
        [time](https://docs.capillarytech.com/docs/dimension-tables#time)
      </td>

      <td style={{ textAlign: "left" }}>
        \_
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        auto\_update\_time\_ce
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Indicate customer enrollment date and time.
      </td>

      <td style={{ textAlign: "left" }}>
        [time](https://docs.capillarytech.com/docs/dimension-tables#time)
      </td>

      <td style={{ textAlign: "left" }}>
        \_
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        ce\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Customer enrollment Id.
      </td>

      <td style={{ textAlign: "left" }}>

      </td>

      <td style={{ textAlign: "left" }}>
        \_
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_customer\_enrollment\_date\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Date when the Customer was enrolled for the promotion.
      </td>

      <td style={{ textAlign: "left" }}>
        [date](https://docs.capillarytech.com/docs/dimension-tables#date)
      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_customer\_enrollment\_time\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Time when the Customer was enrolled for the promotion.
      </td>

      <td style={{ textAlign: "left" }}>
        [time](https://docs.capillarytech.com/docs/dimension-tables#time)
      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_event\_date\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates the date associated with a specific event related to the promotion.
      </td>

      <td style={{ textAlign: "left" }}>
        [date](https://docs.capillarytech.com/docs/dimension-tables#date)
      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_event\_time\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Identifier for the time associated with a specific event related to the promotion. This could be used to track when the promotion was issued or redeemed.
      </td>

      <td style={{ textAlign: "left" }}>
        [time](https://docs.capillarytech.com/docs/dimension-tables#time)
      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_event\_user\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Identifier for the customer associated with the promotion.
      </td>

      <td style={{ textAlign: "left" }}>
        [users](https://docs.capillarytech.com/docs/dimension-tables#/users-users)
      </td>

      <td style={{ textAlign: "left" }}>

      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_issued\_expiry\_date\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates the expiration date of the promotion.
      </td>

      <td style={{ textAlign: "left" }}>
        [date](https://docs.capillarytech.com/docs/dimension-tables#date)
      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_issued\_expiry\_time\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates the expiration time of the promotion.
      </td>

      <td style={{ textAlign: "left" }}>

      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_issued\_promotion\_active\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates whether the promotion is active or not.
      </td>

      <td style={{ textAlign: "left" }}>

      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_latest\_updated\_date\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Indicates the time when this row was last updated.
      </td>

      <td style={{ textAlign: "left" }}>
        [date](https://docs.capillarytech.com/docs/dimension-tables#date)
      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dim\_promotion\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Unique identifier for the table record. It is the primary key for the table.
      </td>

      <td style={{ textAlign: "left" }}>
        [cart\_promotion](https://docs.capillarytech.com/docs/dimension-tables?isFramePreview=true#cart-promotion)
      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        event\_log\_id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Identifier for the event log entry associated with this promotion.
      </td>

      <td style={{ textAlign: "left" }}>
        points
      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        id
      </td>

      <td style={{ textAlign: "left" }}>
        bigint
      </td>

      <td style={{ textAlign: "left" }}>
        Unique identifier of the
      </td>

      <td style={{ textAlign: "left" }}>

      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        year
      </td>

      <td style={{ textAlign: "left" }}>
        int
      </td>

      <td style={{ textAlign: "left" }}>
        Year of the promotion issual.
      </td>

      <td style={{ textAlign: "left" }}>
        [date](https://docs.capillarytech.com/docs/dimension-tables#date)
      </td>

      <td style={{ textAlign: "left" }}>
        * <br />
      </td>
    </tr>
  </tbody>
</Table>