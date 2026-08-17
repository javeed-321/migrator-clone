---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Communications (v1)

Communications represent personalized messages (SMSs/emails) sent to the loyalty customers. Messages such as transaction notifications, birthday wishes, anniversary wishes can be sent through communications APIs.

The communications entity stores personalized messages, and message templates, To send messages the communication gateway should be enabled for your organization with enough message credits.

The communications entity allows you to perform the following tasks:

* Fetch details of a specific email/SMS by message id
* Send personalized emails/SMSs
* Retrieve details of a specific email/sms template
* Create new SMS/email templates or update existing templates

<div>
  <strong>Status Codes</strong>
</div>

### Success Codes

| Code                                | Description                                          |
| ----------------------------------- | ---------------------------------------------------- |
| 4100                                | Message sent successfully                            |
| Message fetched successfully        |                                                      |
| Template added/updated successfully |                                                      |
| 4200                                | Email sent successfully / Email fetched successfully |

### Error Codes

| CODE | DESCRIPTION                                        |
| ---- | -------------------------------------------------- |
| 4101 | Unable to send message                             |
| 4201 | Unable to send email                               |
| 4102 | Unable to find/retrieve SMS                        |
| 4202 | Unable to find/retrieve email                      |
| 4203 | Invalid template type passed                       |
| 4204 | Template not found                                 |
| 4205 | Unable to update the template                      |
| 4206 | Invalid template id passed                         |
| 4207 | No template is available with the given parameters |
| 4208 | Invalid email id                                   |