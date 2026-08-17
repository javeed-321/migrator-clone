---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Neo Transformer Block

The Neo Transformer block allows you to invoke a NEO dataflow for data transformation. Below is the screenshot showing the fields in the block.

<Image align="center" className="border" border={true} src="https://files.readme.io/0926a1877c79431fb1281b644712c50ac3291886d2d628cdc62dd96e98301887-image.png" />

The table below describes the fields in the block.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field Name
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
        Select the [Neo Dataflow](https://docs.capillarytech.com/docs/dataflows) from the drop-down menu. The drop-down lists Dataflows with the `Connectplus` tag.
      </td>
    </tr>

    <tr>
      <td>
        Authorization
      </td>

      <td>
        Authorisation key for the API (if required).
      </td>
    </tr>

    <tr>
      <td>
        Split Response
      </td>

      <td>
        Splits the response when the API returns an array of objects.  

        * \*True \*\*- Separates each array element in the API response into individual responses  
        * \*False \*\*- Keeps the response as a single array without separation
      </td>
    </tr>
  </tbody>
</Table>