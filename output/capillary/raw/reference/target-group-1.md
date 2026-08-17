---
updatedAt: 2026-04-28T08:34:02.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Milestone & Streaks APIs

These group of APIs are called "Target group controller" APIs. They can be used to perform various actions (GET, POST, PUT) on target groups.

<HTMLBlock>{`
<table border="1" style="border-collapse: collapse;">
  <tr>
    <th style="border: 1px solid black;">Action</th>
    <th style="border: 1px solid black;">API</th>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Create a default(aka single) target group</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/create-target-groups">Create target groups</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Create a unified target group</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/create-unified-targets">Create unified targets</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Create a steak type of target group</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/create-streak">Create streak</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Create a target group based on behavioral event</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/create-target-group-based-on-behavioural-event">Create target group based on behavioral event</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Create a target group based on EMF event</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/create-target-based-on-emf-eventss">Create a target group based on EMF event</a></td>
  </tr>
  <tr>
  </tr>
  <tr>
    <td rowspan="3" style="border: 1px solid black;">Update a target</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/update-target-group">Update target group</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/update-target-period">Update target period</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/modify-target">Modify a target</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Update a target group</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/update-target-group">Update target group</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Update a unified target</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/update-unified-target">Update a unified target</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Update a streak</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/edit-streaks">Update a streak</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Deactivate a target</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/get-all-target-groups">Deactivate a target</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Delete a target group</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/delete-target-group">Delete a target group</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Get target group information based on target ID</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/get-target-groups-id">Get target groups based on ID</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Get the associated target groups of a user</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/getusertargetgroupdetails">Get associated target groups of a user</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Get information on target periods</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/get-target-periods">Get target periods</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Get details of a target in a target group</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/get-targets">Get target details</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Get the communication template of a target</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/get-target-communication-template">Get target communication template</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Get channels in a target</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/get-target-channels">Get target channels</a></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Get all targets in an organisation</td>
    <td style="border: 1px solid black;"><a href="https://docs.capillarytech.com/reference/get-all-milestones">Get all targets</a></td>
  </tr>
</table>
`}</HTMLBlock>

**Status Codes**

| Status code | Interpretation of the code    |
| :---------- | :---------------------------- |
| 200         | Success                       |
| 401         | Unauthorised                  |
| 403         | Forbidden                     |
| 404         | Not found                     |
| 201         | Created (For POST operations) |

> 📘 Note
>
> POST APIs require a request body