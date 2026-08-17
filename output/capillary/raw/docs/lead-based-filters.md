---
updatedAt: 2026-03-04T06:04:35.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Lead Based Filters

## Lead status

This filter lets you build an audience groups by current lead status. You can also get customers by current lead status based on created period, lead owner, sub-status, source, and product associated with leads.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/578235b-HQbiJ83_0LPSt_aozxX9MUZsAAQYHclYCw.png" />

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Filter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Status\*
      </td>

      <td>
        Get customers by current lead status. You can select multiple statuses.

        For example, customers whose leads are currently **Open**, **Won**, **Lost**, **Deleted**, or **On hold**. To learn in detail, see [here](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/lead-status).
      </td>
    </tr>

    <tr>
      <td>
        Created Period (Duration)\*
      </td>

      <td>
        These filters let you filter leads by created date.
      </td>
    </tr>

    <tr>
      <td>
        Lifetime\*
      </td>

      <td>
        Let you get all customers whose current lead status is as defined.
      </td>
    </tr>

    <tr>
      <td>
        During\*
      </td>

      <td>
        This lets you further filter customers by purchased date.\
        You can either choose lifetime or duration. Duration could be [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
        Lifetime will consider transactions of the customer from the time of enrolling into the loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        Lead Owner
      </td>

      <td>
        Let you further filter by owners assigned to leads.  For this, you need to select the TILL code followed by the associate.
      </td>
    </tr>

    <tr>
      <td>
        Sub-Status
      </td>

      <td>
        Let you filter further by lead sub-status. These are user-defined and hence you see the values that are created for the org.
      </td>
    </tr>

    <tr>
      <td>
        Source
      </td>

      <td>
        Let you filter further by the source for which the lead is created. For example, e-commerce, and Line.
      </td>
    </tr>

    <tr>
      <td>
        Product
      </td>

      <td>
        Let you filter further by product category or item code.
      </td>
    </tr>
  </tbody>
</Table>

## Lead status change log

This lets you fetch customers whose lead status has changed to another in a specific duration.

<Image align="center" className="border" border={true} width="smart" src="https://files.readme.io/fb11c9f-UwKf0QKx4PSyHcXNbg-g73w1zYVoTB2PZA.png" />

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Filter
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Status\*
      </td>

      <td>
        Get customers based on change of lead status from one to another.
        For example, customers who migrated from Open to On hold. For more details, see [here](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/lead-status).
        You can also select multiple lead statuses.
      </td>
    </tr>

    <tr>
      <td>
        During\*
      </td>

      <td>
        This lets you further filter customers by purchased date.
        You can either choose lifetime or duration. Duration could be [Specific dates](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/specific-dates) or [Relative days](https://docs.capillarytech.com/docs/common-filter-optionsin-filters#/relative-days).
        Lifetime will consider transactions of the customer from the time of enrolling into the loyalty program.
      </td>
    </tr>

    <tr>
      <td>
        Source
      </td>

      <td>
        Let you filter further by the source for which the lead is created.
        For example, e-commerce, and Line.
      </td>
    </tr>
  </tbody>
</Table>