---
updatedAt: 2026-07-07T11:56:49.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Vendor Integration other than SendGrid

If you want to use a vendor other than the capillary’s vendor which is <Anchor target="_blank" href="https://docs.capillarytech.com/docs/sendgrid#/">sendgrid</Anchor> you have to integrate the new vendor to the system.

**Prerequisites:**

* Create a ticket with the PST team to add the new vendor in the backend.
* Create a ticket to the PST team to get the Webhook URL and Service URL.
* Obtain the API key from the vendor.
* Obtain the username and password from either the Gateway team or the vendor.
* A relay ticket is created with the Engineering team for establishing a connection between the Capillary system and the vendor

Steps to integrate a new vendor

1. In the desired cluster (for example, the EU cluster), navigate to Organization Settings of the Capillary Technologies organization.

2. Select **Communication & Gateway** >**Domains** > **Domain Gateway Mapping**.

   <Image src="https://files.readme.io/b795cb3e7b5e20c8b72c1f6c88e252fa5e65f5807b4e6ef45b0514dabc252ff5-Screenshot_2025-11-12_at_4.58.19_PM.png" align="center" width="75% " border={true} />

3. Select **+Domain-Gateway Mapping**  and provide the following details:

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
        **Domain**
      </td>

      <td>
        The default domain used in the system. For example, _capillary.co.in_, which is already configured in the _Configure Domains_ section..
      </td>
    </tr>

    <tr>
      <td>
        **Mailed by/Subdomain**
      </td>

      <td>
        A reference name to identify the domain. The naming format is `vendorname_cluster/brandname_Bulk` or `brandname_Transactional`. For example: _phalcon\_adidas/eu\_bulk_.
      </td>
    </tr>

    <tr>
      <td>
        **Gateway Vendor**
      </td>

      <td>
        The third-party providers connected with Capillary for sending messages through channels such as email, SMS, and WhatsApp.
      </td>
    </tr>

    <tr>
      <td>
        **Hostname**
      </td>

      <td>
        Not applicable.
      </td>
    </tr>

    <tr>
      <td>
        **Short Name**
      </td>

      <td>
        A shortened label for the domain, usually the same as the _Subdomain_ value.
      </td>
    </tr>

    <tr>
      <td>
        **Username and Password**
      </td>

      <td>
        The credentials required to establish a secure connection between Capillary and the vendor, provided by the Gateway team or the vendor.
      </td>
    </tr>

    <tr>
      <td>
        **Connection Properties**
      </td>

      <td>
        The authentication and communication details used to connect with the vendor. It includes:

        - **API key** – Obtained from the vendor. It is used to authenticate Capillary’s system with the vendor for secure email delivery.
        - **Webhook URL** – Provided by the PST team. Used for communication between Capillary and the vendor (for example, to receive delivery status updates or callbacks).  **Example:** `{“url”:“https://spd6hzcltl.execute-api.eu-webhooks//solutionsbulk”, “apiKey”:“Aad7f6e74ad57cd98e331ec2fc1f0547f”}`
      </td>
    </tr>

    <tr>
      <td>
        **Service Ip**
      </td>

      <td>
        Null by default.
      </td>
    </tr>

    <tr>
      <td>
        **Service Url**
      </td>

      <td>
        The endpoint used to connect Capillary with the vendor’s system to process messages. This is provided by the PST team.
      </td>
    </tr>

    <tr>
      <td>
        **StatusCheck Url**
      </td>

      <td>
        The endpoint used to retrieve or receive delivery status reports from the vendor.  This is provided by the PST team.
      </td>
    </tr>

    <tr>
      <td>
        **Channel Count**
      </td>

      <td>
        The number of batches into which the email audience is split.  For example, if the audience size is 1,000 and the value is 5, then 200 emails are sent in each batch.
      </td>
    </tr>
  </tbody>
</Table>

4. Save the configuration.

<Image src="https://files.readme.io/4c6f56c2aa33dda1afcfa8c093b3e431fe236865629f9e814be60440b0865d49-Screenshot_2025-11-12_at_5.01.57_PM.png" align="center" width="75% " border={true} />

The new vendor is now integrated into the Capillary system for the brand.

<br />