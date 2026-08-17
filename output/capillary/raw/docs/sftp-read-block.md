---
updatedAt: 2026-04-22T05:25:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# SFTP (Read) block 

Configuration reference for the Connect to Source block — polls an SFTP or FTP server and downloads files for processing.

The `sftp_read` block is the source or the **Connect to Source** block in a Connect+ dataflow. It connects to a remote SFTP server on scheduled intervals, matches files in a specified directory using a regex pattern, downloads them for processing, and moves them to a processed directory.

## When to use this block

Use this block when your input files are stored on a remote SFTP server and need to be retrieved on a scheduled basis.

## Prerequisites

Before configuring this block, make sure you have:

* SFTP hostname, username, and password
* A source directory on the SFTP server where input files will be placed
* A processed directory on the SFTP server where files will be moved after download
* An error directory path for API error files
* A regex pattern that matches your input filenames

<Callout icon="❗️" theme="error">
  **Note**

  Connection to the SFTP/FTP server fails if your account has Multi-Factor Authentication (MFA) enabled.
</Callout>

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
        The SFTP hostname.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.
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
        The SFTP username.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.
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
        The SFTP password.  
        Select a value from the dropdown. The list shows configurations marked as secret in the Extension Configuration section of the Dev Console.  
        For example, `sftp_password`.  
        **Note**: When creating a password configuration in the Extension Configuration section of the Dev Console, set `Is Secret` to make it available in the dropdown.
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
        The remote source directory to read from.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration ](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager)section of the Dev Console.
        For example, `/APAC2Cluster/A_Connect`.
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
        The regex used to match remote files.  
        Filename pattern: `.*.csv`
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
        The remote directory to move processed files to.  
        For example, `/APAC2Cluster/Process`.
      </td>
    </tr>

    <tr>
      <td>
        **API Error Filepath**
      </td>

      <td>
        Yes
      </td>

      <td>
        The remote path where the error file will be placed.  
        For example, `/APAC2Cluster/Errors`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} width="80% " src="https://files.readme.io/c120697f4afa73fe7d8c67be4ace749a8c92b272adccd1505e056e125849914a-gix.gif" className="border" />

<Callout icon="📘" theme="info">
  **Note**

  Use unique source, processed, and API error directories for each `Live` dataflow. Sharing directories across multiple dataflows can cause files to be picked up by the wrong dataflow, leading to race conditions or misrouted error files.
</Callout>

## Advanced properties

⚠️ Make changes to advanced properties only if you know what you are doing.

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
        **Private key path**
      </td>

      <td>
        No
      </td>

      <td>
        The optional private key path for SFTP authentication.  
        For example, `/home/user/.ssh/id_rsa`.
      </td>
    </tr>

    <tr>
      <td>
        **Key passphrase**
      </td>

      <td>
        No
      </td>

      <td>
        The optional passphrase for the private key. Set to `null` if no passphrase was used.
      </td>
    </tr>

    <tr>
      <td>
        **Unzip Files**
      </td>

      <td>
        No
      </td>

      <td>
        Unzips incoming files before validation. Select `true` to enable or `false` to disable. Default value: `false`.
      </td>
    </tr>

    <tr>
      <td>
        **Search Directory Recursively**
      </td>

      <td>
        No
      </td>

      <td>
        Searches nested folders when listing files. Select `true` to enable or `false` to disable. Default value: `false`.
      </td>
    </tr>

    <tr>
      <td>
        **Port**
      </td>

      <td>
        No
      </td>

      <td>
        The SFTP port. Default value: `22`.
      </td>
    </tr>

    <tr>
      <td>
        **File Delimiter**
      </td>

      <td>
        No
      </td>

      <td>
        The delimiter used for file validation.  
        Default value: `,`.
      </td>
    </tr>

    <tr>
      <td>
        **Report Status Code**
      </td>

      <td>
        No
      </td>

      <td>
        The status codes to include in the error file. For example, `all`. Default value: `all`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} width="70% " src="https://files.readme.io/3d485ed583469e15eab731519b5af21b734bd8b2742d73c9d602aa0b902b3259-image.png" className="border" />

<br />

<br />