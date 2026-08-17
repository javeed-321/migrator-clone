---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Troubleshooting guide

This page provides information on troubleshooting generic Connect+ errors.

# General instructions

* [ ] For Connect+ cluster-specific URLs, refer to the [documentation on accessing Connect+ ](https://docs.capillarytech.com/docs/connect_plus#accessing-connect).
* [ ] For merging, do not upload multiple files at a time.  Upload only two files at a time.
* [ ] Make sure that the FTP credentials are correct and that the user has the appropriate access. Move access is required for the uninterrupted movement of the files between FTP folders.
* [ ] Make sure that the correct Intouch org is selected in the Transform block.
* [ ] Make sure that the expressions used are correct.
* [ ] Make sure that only the files specified for acceptance are uploaded. For example, if CSV files are specified for acceptance do not add .xlxs in the FTP path.
* [ ] Make sure that the API parameters are entered correctly using the appropriate capitalization. For example, if the source is INSTORE, it should be entered as INSTORE and not Instore.
* [ ] Make sure that the date format is in YYYY-MM-DD.
* [ ] Avoid duplicate entries in the file.
* [ ] Make sure that you have the appropriate access to the workspace
* [ ] Make sure that your API credentials have appropriate [access group](https://docs.capillarytech.com/docs/access-group) permissions.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Problem
      </th>

      <th style={{ textAlign: "left" }}>
        Probable cause
      </th>

      <th style={{ textAlign: "left" }}>
        Recommended action
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        631 ERR\_LOYALTY\_BILL\_AMOUNT\_NEGATIVE
      </td>

      <td style={{ textAlign: "left" }}>
        Transaction amount cannot be negative
      </td>

      <td style={{ textAlign: "left" }}>
        Enter the correct transaction amount
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        631	ERR\_RETURN\_TXN\_NOT\_EXISTS
      </td>

      <td style={{ textAlign: "left" }}>
        The return transaction does not exist
      </td>

      <td style={{ textAlign: "left" }}>
        Enter the return transaction details
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        631	DUPLICATE\_GENERIC\_COUPON\_CODE
      </td>

      <td style={{ textAlign: "left" }}>
        Duplicate coupon codes
      </td>

      <td style={{ textAlign: "left" }}>
        Make sure that the coupon codes are unique
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        665	ERR\_LOYALTY\_BILL\_GROSS\_AMOUNT\_NEGATIVE
      </td>

      <td style={{ textAlign: "left" }}>
        Transaction gross amount cannot be negative
      </td>

      <td style={{ textAlign: "left" }}>
        Enter the correct transaction amount
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        666	ERR\_LOYALTY\_BILL\_DISCOUNT\_NEGATIVE
      </td>

      <td style={{ textAlign: "left" }}>
        Transaction discount cannot be negative
      </td>

      <td style={{ textAlign: "left" }}>
        Enter the correct transaction amount
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        661	EMPTY\_REDEMPTION\_ID
      </td>

      <td style={{ textAlign: "left" }}>
        No Redemption id passed
      </td>

      <td style={{ textAlign: "left" }}>
        Enter the redemption ID
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        661	ERR\_LOYALTY\_LINEITEM\_AMOUNT\_NEGATIVE
      </td>

      <td style={{ textAlign: "left" }}>
        lineitem with negative amount is not allowed
      </td>

      <td style={{ textAlign: "left" }}>
        Enter the correct transaction amount
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        604	EMPTY\_VALIDATION\_CODE
      </td>

      <td style={{ textAlign: "left" }}>
        No otp passed
      </td>

      <td style={{ textAlign: "left" }}>
        Enter validation code
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        604	ERR\_NULL\_UUID
      </td>

      <td style={{ textAlign: "left" }}>
        No or invalid uuid passed
      </td>

      <td style={{ textAlign: "left" }}>
        Enter valid UUID
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        604	ERR\_EXPECTED\_DELIVERY\_DATE\_BEFORE\_CREATED\_DATE
      </td>

      <td style={{ textAlign: "left" }}>
        created date is later to expected date
      </td>

      <td style={{ textAlign: "left" }}>
        Enter the correct date
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        604	ERR\_LOYALTY\_DUPLICATE\_BILL\_NUMBER
      </td>

      <td style={{ textAlign: "left" }}>
        Duplicate bill number
      </td>

      <td style={{ textAlign: "left" }}>
        Enter a unique bill number
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        604	VOUCHER\_ERR\_ALREADY\_USED
      </td>

      <td style={{ textAlign: "left" }}>
        Voucher already used
      </td>

      <td style={{ textAlign: "left" }}>
        Enter a unique voucher ID
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        604	MULTIPLE\_REDEMPTION\_FOR\_USER\_AND\_COUPON\_NOT\_ALLOWED
      </td>

      <td style={{ textAlign: "left" }}>
        Coupon already used
      </td>

      <td style={{ textAlign: "left" }}>
        Enter a unique redemption code
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        8084	CUST\_DETAILS\_NOT\_PASSED
      </td>

      <td style={{ textAlign: "left" }}>
        Customer details not sent
      </td>

      <td style={{ textAlign: "left" }}>
        Enter correct customer details
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        8015	CUSTOMER\_NOT\_FOUND
      </td>

      <td style={{ textAlign: "left" }}>
        Customer not found for the given identifiers
      </td>

      <td style={{ textAlign: "left" }}>
        Enter correct customer details
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Connection refused 
      </td>

      <td style={{ textAlign: "left" }}>
        Temporary error
      </td>

      <td style={{ textAlign: "left" }}>
        Reload the page
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Transaction processing in the FTP was successful; however, upon inspection of the user profile, the corresponding transaction was not found
      </td>

      <td style={{ textAlign: "left" }}>
        Uploading multiple files at the same time
      </td>

      <td style={{ textAlign: "left" }}>
        Upload only two files at a time
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Failed to fetch extended fields
      </td>

      <td style={{ textAlign: "left" }}>
        Temporary error
      </td>

      <td style={{ textAlign: "left" }}>
        Try after some time
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Transactions occasionally fail to enter the Capillary system
      </td>

      <td style={{ textAlign: "left" }}>
        Temporary error
      </td>

      <td style={{ textAlign: "left" }}>
        Reprocess the file
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        When attempting to create a workspace, the EU region option is not available for selection
      </td>

      <td style={{ textAlign: "left" }}>
        Accessing the wrong cluster
      </td>

      <td style={{ textAlign: "left" }}>
        Connect+ is available for each cluster separately now. Refer to the [documentation on accessing Connect+ ](https://docs.capillarytech.com/docs/connect_plus#accessing-connect)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
         The data does not undergo processing or rejection within the system
      </td>

      <td style={{ textAlign: "left" }}>
        Invalid user credentials/file 
      </td>

      <td style={{ textAlign: "left" }}>
        Make sure that:  

        * the user credentials are correct and the user has the appropriate access to the FTP folders
        * only the files specified for acceptance are uploaded. For example, if CSV files are specified for acceptance do not add .xlxs in the FTP path
        * the expressions are correct
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        The transaction CSV files in the FTP location have been moved to the processed folder, but the corresponding transactions are not accessible in the Member Care
      </td>

      <td style={{ textAlign: "left" }}>
        Wrong Intouch org or FTP credentials
      </td>

      <td style={{ textAlign: "left" }}>
        Make sure that:  

        * the Intouch org is correct in the Transform data section
        * FTP credentials are correct
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        The member details are not loading properly on the Member Care UI
      </td>

      <td style={{ textAlign: "left" }}>
        Wrong API details or\
        Wrong file name
      </td>

      <td style={{ textAlign: "left" }}>
        Make sure that:  

        * the API parameters are entered correctly using the appropriate capitalization. For example, if the source is INSTORE, it should be entered as INSTORE and not Instore
        * the file name
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Test and Control template - User status not changing
      </td>

      <td style={{ textAlign: "left" }}>
        Wrong data format in the source file
      </td>

      <td style={{ textAlign: "left" }}>
        \- In the file enter the test and control status in Small letters. For example, test, and control  

        * Do not include the users whose status need not be changed
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        The registered user data is stored in the error folder
      </td>

      <td style={{ textAlign: "left" }}>
        Expected behaviour
      </td>

      <td style={{ textAlign: "left" }}>
        When a file is successful, the files will fall into the error folder with API\_Error\_Code status = 200
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Connect+ is rejecting the transaction
      </td>

      <td style={{ textAlign: "left" }}>
        Multiple reasons
      </td>

      <td style={{ textAlign: "left" }}>
        Make sure that:  

        * the file does not contain duplicate records
        * the date format is YYYY-MM-DD
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Information missing in the user profile
      </td>

      <td style={{ textAlign: "left" }}>
        Wrong mapping of the fields
      </td>

      <td style={{ textAlign: "left" }}>
        Map the fields correctly
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        File processing issue for files with more than 5 lakh rows.
      </td>

      <td style={{ textAlign: "left" }}>
        Maximum attempt not enough
      </td>

      <td style={{ textAlign: "left" }}>
        Set the Max Retries in the Connect to destination to 5
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Points allocation is not working as expected for a transaction having multiple line items
      </td>

      <td style={{ textAlign: "left" }}>
        Incorrect bill amount information
      </td>

      <td style={{ textAlign: "left" }}>
        Make sure that when entering the bill amount, you consider the cumulative sum of line item amounts. The points awarded during the bill level check are based on the overall bill amount, not individual line item amounts. Ensure accuracy by providing the correct sum of line item values to meet your requirements.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Files not processed
      </td>

      <td style={{ textAlign: "left" }}>
        Inappropriate FTP access
      </td>

      <td style={{ textAlign: "left" }}>
        Make sure that you have appropriate FTP access that allows you to move the files. Otherwise, the files will not get processed and be moved to the "Processed" folder.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        502
      </td>

      <td style={{ textAlign: "left" }}>
        Bad gateway error
      </td>

      <td style={{ textAlign: "left" }}>
        Retry after some time. If the issue persists, raise a JIRA ticket and contact the Capillary sustenance team.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        504
      </td>

      <td style={{ textAlign: "left" }}>
        Gateway timeout error
      </td>

      <td style={{ textAlign: "left" }}>
        Retry after some time. If the issue persists, raise a JIRA ticket and contact the Capillary sustenance team.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        520
      </td>

      <td style={{ textAlign: "left" }}>
        Bad response.
      </td>

      <td style={{ textAlign: "left" }}>
        Retry after some time. If the issue persists, raise a JIRA ticket and contact the Capillary sustenance team.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        521
      </td>

      <td style={{ textAlign: "left" }}>
        The web server is down.
      </td>

      <td style={{ textAlign: "left" }}>
        Retry after some time. If the issue persists, raise a JIRA ticket and contact the Capillary sustenance team.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Failed to generate OAuth token: access forbidden
      </td>

      <td style={{ textAlign: "left" }}>
        * Incorrect credentials
        * Insufficient permissions to generate OAuth token.
        * Invalid redirect URI
        * Account restrictions
        * API restrictions
      </td>

      <td style={{ textAlign: "left" }}>
        * Ensure the auth key and secret are correct.
        * Ensure you have the necessary permissions and access.
        * Verify if the redirect URI in the request matches the one registered with the OAuth provider.
        * Ensure the account used for authentication is active and not restricted.
        * Check for specific requirements or limitations for the API.
      </td>
    </tr>
  </tbody>
</Table>

<br />

For any other codes, you can search with the error code [here](https://script.google.com/a/macros/capillarytech.com/s/AKfycbyqJ7lkVUnXhDTH0RbUPLlGWAzhfzCakp0MEudRvPDYZyMiElpaG9llh9tULDDP4leV/exec).