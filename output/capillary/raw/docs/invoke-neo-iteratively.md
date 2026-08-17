---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Invoke Neo Iteratively

The **Invoke-Neo-Iteratively** block allows you to import data from a [Neo API](https://docs.capillarytech.com/reference/introduction-to-extension-platform) and configure the number of times the API is invoked.

<Image align="center" className="border" width="100% " border={true} src="https://files.readme.io/c4bcb487cbb0fe30b9213793897481ca8875ad550b31069009d8a02ec6fe8215-image.png" />

The following table lists the fields:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Enter url
      </td>

      <td>
        Select the [Neo API](https://docs.capillarytech.com/reference/introduction-to-extension-platform) from the drop-down menu. The drop-down lists [Dataflows](https://docs.capillarytech.com/reference/dataflows) labelled as `connectplus`.
      </td>
    </tr>

    <tr>
      <td>
        Authorization
      </td>

      <td>
        Authorisation key for the API, if required.
      </td>
    </tr>

    <tr>
      <td>
        NEO API METHOD
      </td>

      <td>
        Method of the API. Supported values: `GET`and `POST`.  

        * \*Note:\*\* This block supports only `POST` calls that do not require any body parameters.
      </td>
    </tr>

    <tr>
      <td>
        Split Response
      </td>

      <td>
        Set the value to `true` using the drop-down to separate each array in a response. For example, if an API returns an array of objects, and each object has its own set of properties, setting the value to `true` will list each array as an individual response.
      </td>
    </tr>

    <tr>
      <td>
        API Iteration End Condition
      </td>

      <td>
        Conditions for terminating the API call. You can define a custom condition for terminating the API call.
      </td>
    </tr>

    <tr>
      <td>
        Max retries
      </td>

      <td>
        Number of times the API is called. There is no limit for the number of retries.
      </td>
    </tr>
  </tbody>
</Table>