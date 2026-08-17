---
updatedAt: 2026-03-04T06:03:59.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Target loyalty

## User target loyalty import

This profile lets you update custom target values for a list of customers. Target loyalty import overrides the default target value for a customer that is defined while adding a target in the UI.

* Customer identifier\* (User ID/External ID/Email/Mobile)
* Target name\*: Name of the target.
* Created By: User who created the target.
* Updated By: User who updated the target.
* Period 1(AF): Name of the period.
* Period 2(AF): Name of the period.

> 📘 - If the period field is blank in the CSV file, then the system will consider the default target value.
>
> * If you pass any value including 0  in the period field, the system will set the new value as the target (by overriding the default value).

CSV Sample using User ID:

User Id,TargetName,CreatedBy,UpdatedBy,Period1,Period2\
2334445,DemoTarget,345678,783456,P1,P2

**Template configuration**

![645](https://files.readme.io/4305ebe-wEaHFv7mXHsUOSKQw_MocOvf3XqDR0tATw.png "wEaHFv7mXHsUOSKQw_MocOvf3XqDR0tATw.png")

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        OPTION
      </th>

      <th>
        DESCRIPTION
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Choose customers' unique identifier
      </td>

      <td>
        Choose the unique customer identifier used in the CSV to identify customers. 

        * USER\_ID
        * MOBILE
        * EMAIL
        * EXTERNAL\_ID 
      </td>
    </tr>

    <tr>
      <td>
        Enter Target Group Name
      </td>

      <td>
        Select the target group name for which you want to update custom target values.
      </td>
    </tr>

    <tr>
      <td>
        Target Periods
      </td>

      <td>
        Add/remove the target duration.
      </td>
    </tr>
  </tbody>
</Table>