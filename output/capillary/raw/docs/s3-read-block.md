---
updatedAt: 2026-04-22T05:26:11.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# S3 (Read) block

The `s3_read` block retrieves files from an Amazon S3 bucket and brings them into your Connect+ dataflow for processing.  It acts as the source or **Connect to Source** block in a Connect+ dataflow. It uses AWS credentials to connect to the specified bucket, picks up files matching a defined filename pattern, and moves them to an output path once downloaded. Any errors that occur during processing are written to a designated error file path for review.

## When to use this block

Use this block when your input files are stored in an Amazon S3 bucket and need to be retrieved on a scheduled basis.

## Prerequisites

Before configuring this block, make sure you have:

* AWS access key ID and secret access key with read permissions on the bucket
* The S3 bucket name and AWS region
* An input path and an output (processed) path within the bucket
* A regex pattern that matches your input filenames

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
        A name for the block instance. The name must be alphanumeric. There is no character limit.
      </td>
    </tr>

    <tr>
      <td>
        **Bucket Name**
      </td>

      <td>
        Yes
      </td>

      <td>
        The name of the S3 bucket to poll.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.
      </td>
    </tr>

    <tr>
      <td>
        **S3 Region**
      </td>

      <td>
        Yes
      </td>

      <td>
        The AWS region where the S3 bucket is located.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.
        Default value: `us-east-1`.
      </td>
    </tr>

    <tr>
      <td>
        **S3 accessKey**
      </td>

      <td>
        Yes
      </td>

      <td>
        The AWS access key ID used to authenticate with the S3 bucket.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.
      </td>
    </tr>

    <tr>
      <td>
        **Secret Key**
      </td>

      <td>
        Yes
      </td>

      <td>
        The AWS secret access key used for authentication.

        Select a value from the dropdown. The list shows configurations marked as secret in the Extension Configuration section of the Dev Console.  
        **Note**: When creating the configuration in the Extension Configuration section of the Dev Console,  `Is Secret` must be set to make it available in the dropdown.
      </td>
    </tr>

    <tr>
      <td>
        **Input Path**
      </td>

      <td>
        Yes
      </td>

      <td>
        The path within the S3 bucket where the input files are located.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.  
        For example, `data/incoming/`.
      </td>
    </tr>

    <tr>
      <td>
        **Output Path**
      </td>

      <td>
        Yes
      </td>

      <td>
        The path within the S3 bucket where files are moved after being downloaded.   Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.  
        For example, `data/processed/`.
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
        The regex pattern used to match files in the input path.  
        File pattern: .*.csv
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
        The path where API error files are stored.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager) section of the Dev Console.  
        For example, `data/errors/`.
      </td>
    </tr>

    <tr>
      <td>
        **File Delimiter**
      </td>

      <td>
        Yes
      </td>

      <td>
        The delimiter used for file validation. Default value: `,`.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} width="90% " src="https://files.readme.io/0aff2ef257e85d6ec6abe6891dcaf20394771426448af3d560120c9607e58b8e-s3_read.gif" className="border" />