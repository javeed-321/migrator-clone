---
updatedAt: 2026-04-22T05:25:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# SFTP (Write) block

The `sftp_write `block writes output files to a destination SFTP server with optional compression. In a Connect+ dataflow, it serves as the **Connect to Destination** block, receiving processed data from upstream blocks and writing it to a remote path on the destination server.

## When to use this block

Use this block when the processed output of your dataflow needs to be pushed to a remote SFTP server.

## Prerequisites

Before configuring this block, make sure you have:

* Destination SFTP hostname, username, and password configured in the [Extensions Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager)
* A remote directory path on the destination server configured in the [Extensions Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager)

## Standard properties

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
        The SFTP hostname of the destination server.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager)  section of the Dev Console.  
        For example, `data.capillarydata.com`.
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
        The SFTP username for server authentication.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager)  section of the Dev Console.  
        For example, `sftp_user`.
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
        The SFTP password for server authentication.
        Select a value from the dropdown.  
        The list shows configurations marked as secret in the Extension Configuration section of the Dev Console. 

        **Note**: When creating a password configuration in the Extension Configuration section of the Dev Console, set `Is Secret` to make it available in the dropdown.
      </td>
    </tr>

    <tr>
      <td>
        **Remote Path**
      </td>

      <td>
        Yes
      </td>

      <td>
        The directory path on the destination server where the file is transferred.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration ](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.  
        For example, `/APAC2Cluster/A_Connect`.
      </td>
    </tr>

    <tr>
      <td>
        **Create Remote Directory**
      </td>

      <td>
        Yes
      </td>

      <td>
        Creates the remote directory if it does not already exist at the destination. Select `true` to enable or `false` to disable.   
        Default value: `false`.
      </td>
    </tr>

    <tr>
      <td>
        **Conflict Resolution**
      </td>

      <td>
        Yes
      </td>

      <td>
        Specifies how to handle a naming conflict when a file with the same name already exists at the destination path.   
        For example, `Replace`.
      </td>
    </tr>

    <tr>
      <td>
        **Zip Files**
      </td>

      <td>
        Yes
      </td>

      <td>
        Compresses the output file before pushing it to the destination server. Select `true` to enable or `false` to disable.   
        Default value: `false`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} width="90% " src="https://files.readme.io/29d2b2c1ccc09dc9edbda7e32bdcdb91bf05291970d31622b5faa2ed19e90f42-gixx.gif" className="border" />

## Advanced properties

⚠️ Make changes to advanced properties only if you know what you are doing.

| Field name           | Required | Description                                                                           |
| :------------------- | :------- | :------------------------------------------------------------------------------------ |
| **Port**             | No       | The SFTP port of the destination server. Default value: `22`.                         |
| **Output File Name** | No       | The name of the output file written to the destination. Default value: `${filename}`. |
| **Private key**      | No       | The optional private key for SFTP authentication.                                     |
| **Key passphrase**   | No       | The optional passphrase for the private key. Set to `null` if no passphrase was used. |

<Image align="center" border={true} width="70% " src="https://files.readme.io/73d1448e2c07d36c0127d47388d870165dff8e8eb5632f3c4341a7d3ab21afd6-image.png" className="border" />

<br />