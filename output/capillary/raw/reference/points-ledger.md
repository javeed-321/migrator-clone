---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Points Ledger

Points as incentives are treated as currency within an org and its affiliates. The multitude of credits, debits, and adjustments impact the pool of points in the customer account. When points issued from different programs of the org can be redeemed across the org units or loyalty programs, it is important to understand the debit and credit history. Ledger APIs help you retrieve the points debit and credit details across the programs of the org.

## Status Codes

<Table>
  <thead>
    <tr>
      <th>
        Code
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        11001
      </td>

      <td>
        This combination of request parameters is not supported. Try removing parameters.
      </td>
    </tr>

    <tr>
      <td>
        11002
      </td>

      <td>
        This customer has pending events, hence the ledger may be incomplete. Please retry after some time to get a complete ledger
      </td>
    </tr>

    <tr>
      <td>
        11003
      </td>

      <td>
        There are no ledger entries present for the given parameters. Try removing parameters to widen the search
      </td>
    </tr>

    <tr>
      <td>
        11004
      </td>

      <td>
        Invalid tillId passed in request
      </td>
    </tr>

    <tr>
      <td>
        11005
      </td>

      <td>
        Invalid programId passed in request
      </td>
    </tr>

    <tr>
      <td>
        11006
      </td>

      <td>
        Limit cannot be greater than 10
      </td>
    </tr>

    <tr>
      <td>
        11007
      </td>

      <td>
        Invalid ledgerEntryType passed in request
      </td>
    </tr>

    <tr>
      <td>
        11008
      </td>

      <td>
        Invalid pointCategoryType passed in request
      </td>
    </tr>

    <tr>
      <td>
        11009
      </td>

      <td>
        Startdate is after endDate
      </td>
    </tr>

    <tr>
      <td>
        11010
      </td>

      <td>
        Time interval between startDate and endDate is greater than 90 days
      </td>
    </tr>

    <tr>
      <td>
        11011
      </td>

      <td>
        The date format used is not supported. Enter the date in (yyyy-MM-ddTHH:mm:ss) format
      </td>
    </tr>

    <tr>
      <td>
        11012
      </td>

      <td>
        Invalid userId passed in request
      </td>
    </tr>

    <tr>
      <td>
        11013
      </td>

      <td>
        identifierName, identifierValue, source can not be empty
      </td>
    </tr>

    <tr>
      <td>
        11014
      </td>

      <td>
        Event name not found :\{0},  
        Requested cannot be processed. Max 10  
        events are allowed in params.
      </td>
    </tr>

    <tr>
      <td>
        11015
      </td>

      <td>
        Error setting event detail
      </td>
    </tr>

    <tr>
      <td>
        11016
      </td>

      <td>
        Event detail not found for event log id \{0}
      </td>
    </tr>

    <tr>
      <td>
        11017
      </td>

      <td>
        Event id format exception:\{0}
      </td>
    </tr>

    <tr>
      <td>
        11018
      </td>

      <td>
        No users found for provided roles
      </td>
    </tr>

    <tr>
      <td>
        11019
      </td>

      <td>
        Source value  
        capturing status is disabled. Please enable it from org settings page
      </td>
    </tr>
  </tbody>
</Table>

### EMF Errors

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Code
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        9003
      </td>

      <td>
        Error fetching points ledger data : \{0}
      </td>
    </tr>

    <tr>
      <td>
        9004
      </td>

      <td>
        Warning while fetching ledger info : \{0}
      </td>
    </tr>

    <tr>
      <td>
        9005
      </td>

      <td>
        Invalid alternateCurrencyNames field  
        value
      </td>
    </tr>
  </tbody>
</Table>