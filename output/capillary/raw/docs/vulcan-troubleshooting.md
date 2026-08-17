---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Troubleshooting

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Error Code
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        Reason
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        100
      </td>

      <td style={{ textAlign: "left" }}>
        User input validation error
      </td>

      <td style={{ textAlign: "left" }}>
        This error indicates that the input provided by the user is incorrect in format, missing required fields, or the data does not meet validation criteria.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        200
      </td>

      <td style={{ textAlign: "left" }}>
        Identifier validation error
      </td>

      <td style={{ textAlign: "left" }}>
        This error indicates a problem with a specific identifier, such as an application or deployment ID. It usually means the identifier is invalid or not recognised by the system.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        300
      </td>

      <td style={{ textAlign: "left" }}>
        Database failure
      </td>

      <td style={{ textAlign: "left" }}>
        This error indicates a failure at the database level, often due to connection issues, query failures, or integrity constraints being violated.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        400
      </td>

      <td style={{ textAlign: "left" }}>
        Service failure
      </td>

      <td style={{ textAlign: "left" }}>
        This error indicates a generic service failure, which could mean that an internal service is down, not responding, or has faulty service logic.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        500
      </td>

      <td style={{ textAlign: "left" }}>
        Utility failure
      </td>

      <td style={{ textAlign: "left" }}>
        This error indicates a failure in utility functions or operations supporting the main service, such as helper functions or configuration loaders.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        600
      </td>

      <td style={{ textAlign: "left" }}>
        Downstream service failure
      </td>

      <td style={{ textAlign: "left" }}>
        This error indicates a failure in a downstream service that the current service depends on, often due to issues with external API calls, third-party services, or microservices ([Extensions](https://docs.capillarytech.com/reference/introduction-extensions), [Neo Extensions](https://docs.capillarytech.com/reference/api-extension-doc), Shield).
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        700
      </td>

      <td style={{ textAlign: "left" }}>
        Referrer validation error
      </td>

      <td style={{ textAlign: "left" }}>
        This error indicates that the referrer, commonly used in HTTP requests to validate the origin of the request, is invalid.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        800
      </td>

      <td style={{ textAlign: "left" }}>
        Middleware validation error
      </td>

      <td style={{ textAlign: "left" }}>
        This error indicates issues within the middleware layer, often related to authentication, authorisation, or preprocessing steps before the main service logic is executed.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Uncaught Error
      </td>

      <td style={{ textAlign: "left" }}>
        Remote loaded successfully, but `ushc_crm_4000084_membercareDev4000084_MFE`
        could not be found! Verify that the name is correct
        in the Webpack configuration!
      </td>

      <td style={{ textAlign: "left" }}>
        UAT or Prod mode for the application is not enabled and is currently running on localhost.
      </td>
    </tr>
  </tbody>
</Table>

> 📘 Note
>
> API responses may return combined error codes, which include both an internal error code and an HTTP status code.
>
> For example an error code `600412` would mean:
>
> 600: Internal error code.\
> 412: HTTP status code.
>
> Refer to the [HTTP status code list](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) for more information.