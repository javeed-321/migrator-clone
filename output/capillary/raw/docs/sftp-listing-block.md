---
updatedAt: 2026-04-22T05:49:04.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# SFTP (Listing) block

<Callout icon="❗️">
  This block will be removed in the future releases.
</Callout>

The `credential_aware_ftp_listing` block polls an SFTP server and fetches source files matching a defined filename pattern as a source block in a Connect+ dataflow. It uses credential-based authentication to connect to the server and moves processed files to a designated directory for reconciliation purposes.

## When to use this block

Use this block instead of `sftp_read` when server credentials are managed centrally and selected from a dropdown rather than entered manually. It is commonly used in reconciliation dataflows.

## Prerequisites

Before configuring this block, make sure you have:

* SFTP server credentials already registered in Connect+
* A source directory and a processed directory on the SFTP server

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
        No
      </td>

      <td>
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **Hostname**
      </td>

      <td>
        Yes
      </td>

      <td>
        The hostname of the SFTP server to connect to. Select the hostname from the dropdown. The list shows all values configured in the [Extension Configuration ](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager)section of the Dev Console.  
        **For example**: data.capillarydata.com.
      </td>
    </tr>

    <tr>
      <td>
        **Username**
      </td>

      <td>
        Yes
      </td>

      <td>
        The username used to authenticate with the SFTP server. Select the username from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.  
        **For example**: sftp_user.
      </td>
    </tr>

    <tr>
      <td>
        **Password**
      </td>

      <td>
        Yes
      </td>

      <td>
        The password used to authenticate with the SFTP server. Select the password from the dropdown. The list shows configurations marked as secret in the Extension Configuration section of the Dev Console.
        For example, sftp_password.
        **Note**: When creating a password configuration in the Extension Configuration section of the Dev Console, set Is Secret to make it available in the dropdown.
      </td>
    </tr>

    <tr>
      <td>
        **Source Directory**
      </td>

      <td>
        Yes
      </td>

      <td>
        The directory path on the SFTP server where the source files are located. Select the source directory from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.  
        For example, /APAC2Cluster/A_Connect.
      </td>
    </tr>

    <tr>
      <td>
        **Filename Pattern**
      </td>

      <td>
        Yes
      </td>

      <td>
        The regex pattern used to match source files on the SFTP server. Select `*.csv` or `.*`.  
        Default value: `*.csv`.
      </td>
    </tr>

    <tr>
      <td>
        **Processed Directory**
      </td>

      <td>
        Yes
      </td>

      <td>
        The directory path on the SFTP server where processed files are moved after download. Select the processed directory from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager)  section of the Dev Console.  
        For example, /APAC2Cluster/A_Connect.
      </td>
    </tr>

    <tr>
      <td>
        **Port**
      </td>

      <td>
        Yes
      </td>

      <td>
        The port number used to connect to the SFTP server. Default value: `22`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} width="80% " src="https://files.readme.io/9cf1dc65b2e5ea6330b054b286e9f541218ff10fbdc8fa1883e936d3756aa876-credential.gif" className="border" />