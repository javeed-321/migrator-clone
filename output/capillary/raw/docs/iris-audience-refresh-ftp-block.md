---
updatedAt: 2026-04-27T09:55:03.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Iris Audience Refresh (FTP) block

The `iris_ftp_audience_refresh` block refreshes an audience list on Engage+ by triggering the Iris FTP audience reload API. It acts as a destination block in a Connect+ dataflow, calling the iris `/v2/audience/ftp/reload` endpoint and passing the required organisation and authentication headers to route the request.

## When to use this block

Use this block when your dataflow needs to refresh an Engage+ audience list from a file in an FTP location. The block triggers the reload after the file is available, updating the audience list automatically.

## Prerequisites

Before configuring this block, make sure you have:

* The audience CSV file is available in the FTP location
* An audience list created in the Engage+ Audience Manager. The audience name must not contain spaces. For example, use `FTP_Test` instead of `FTP Test`.
* The Capillary organisation identifier (`X_CAP_ORG`)
* The Capillary API authentication token (`X_CAP_CT`). If you do not have a token, enter any string in this field.

## Configuration fields

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field name
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Block name**
      </td>

      <td>
        Yes
      </td>

      <td>
        A name for the block instance.
      </td>
    </tr>

    <tr>
      <td>
        **API Method**
      </td>

      <td>
        Yes
      </td>

      <td>
        The HTTP method used to call the API. 
        Default value: `POST`.
      </td>
    </tr>

    <tr>
      <td>
        **Remote API URL**
      </td>

      <td>
        Yes
      </td>

      <td>
        The relative API URL to send the audience refresh request to.  
        Accepted value: `/v2/audience/ftp/reload`. 
      </td>
    </tr>

    <tr>
      <td>
        **X_CAP_ORG**
      </td>

      <td>
        Yes
      </td>

      <td>
        The Capillary organisation identifier passed as a request header.  
        For example, `100458`.
      </td>
    </tr>

    <tr>
      <td>
        **X_CAP_CT**
      </td>

      <td>
        Yes
      </td>

      <td>
        The Capillary cluster identifier passed as a request header.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/c5f538f77ce59a9010f27bc7ad31cf85003258051ac2ee7a06b14e2455be0798-Screenshot_2026-04-27_at_3.10.24_PM.png" className="border" />