---
updatedAt: 2026-04-22T09:00:11.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# S3 (Write) block

The `s3_write` block puts an S3 object, writing processed files to a destination Amazon S3 bucket. It acts as the destination block in a Connect+ dataflow, receiving output from upstream blocks and uploading the resulting file to a specified S3 bucket using AWS credentials. The block supports configurable content types, AWS credential-based authentication, and an optional AWS Credentials Provider service for internal authentication.

## When to use this block

Use this block when the processed output of your dataflow needs to be stored in an Amazon S3 bucket.

## Prerequisites

Before configuring this block, make sure you have:

* AWS access key ID and secret access key with write permissions on the destination bucket
* The destination S3 bucket name and AWS region

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
        **S3 Object name/Filename**
      </td>

      <td>
        Yes
      </td>

      <td>
        The name given to the file uploaded to S3.  
        Default value: `${filename}`.
      </td>
    </tr>

    <tr>
      <td>
        **S3 Bucket Name**
      </td>

      <td>
        Yes
      </td>

      <td>
        The name of the destination S3 bucket.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager)  section of the Dev Console.
        Default value: `us-east-1`.
      </td>
    </tr>

    <tr>
      <td>
        **Content Type**
      </td>

      <td>
        Yes
      </td>

      <td>
        The type of the file being uploaded.  
        Default value: `application/octet-stream`.
      </td>
    </tr>

    <tr>
      <td>
        **Access Key**
      </td>

      <td>
        Yes
      </td>

      <td>
        The AWS access key ID used to authenticate with the S3 bucket.  
        Select a value from the dropdown. The list shows all values configured in the [Extension Configuration](https://docs.capillarytech.com/docs/extension-configuration#how-to-use-the-secret-manager)  section of the Dev Console.
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
        **AWS Region**
      </td>

      <td>
        Yes
      </td>

      <td>
        The AWS region of the destination S3 bucket.
      </td>
    </tr>

    <tr>
      <td>
        **AWS Credentials Provider service**
      </td>

      <td>
        Yes
      </td>

      <td>
        The credentials provider to use for authentication.
        Select `None` to use the Access Key and Secret Key, or `InternalService` to use Capillary's internal credentials provider.
        For example, when using the campaign bucket, you can skip providing the Access Key and Secret Key, as authentication is handled by Capillary.
      </td>
    </tr>
  </tbody>
</Table>

<Image align="center" border={true} src="https://files.readme.io/59f2bb07d9462db14917d9511c267228a4faef82f7e2af52d349ea79ca0467bb-Screen_Recording_2026-04-15_at_11.45.52_AM.gif" className="border" />