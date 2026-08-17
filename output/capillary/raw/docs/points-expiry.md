---
updatedAt: 2026-05-26T12:02:42.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Points expiry

> **Note:** By default, point expiry imports reject updates in two cases:
>
> * **New expiry date is in the past** — the record fails with the error *"past expiry date or redeemable points not available"*. Use **Immediate expiry** instead to expire points right away.
> * **Existing expiry is already past** — those customer records are skipped.
>
> To override either restriction, raise a JIRA ticket to the Capillary product support team to enable the relevant org-level flag:
>
> | Flag                                               | What it allows                                                     |
> | :------------------------------------------------- | :----------------------------------------------------------------- |
> | `ALLOW_EXPIRY_UPDATE_WHEN_EXISTING_EXPIRY_IN_PAST` | Update records where the customer's current expiry is already past |
> | `ALLOW_EXPIRY_UPDATE_WHEN_NEW_EXPIRY_IN_PAST`      | Set a new expiry date that is itself in the past                   |
>
> Enable both flags to update already-expired records to a new past date.

## Update Points Expiry (Date range)

This profile lets you update the validity of points for a customer that are expiring in a specific date range. Only points in Available status are updated. Points that are already Redeemed or Expired are skipped and their expiry dates are not changed.

If you reverse a redemption after the original expiry date, the points are restored and immediately expired in the same transaction. You will see both REDEMPTION\_REVERSAL and EXPIRED entries for these points.

Example:

Consider Blue Purple(org) loyalty program is having 12 months of points validity for a list of customers which they want to change to 24 months. In such case, you can select the extended expiry type and use the relative point expiry option to update the point expiry duration from 12 to 24 months.

| Facts                      | Date & duration                              |
| :------------------------- | :------------------------------------------- |
| Current date               | August 01, 2021                              |
| Actual point expiry date   | July 31, 2022 (12 months from current date)  |
| Extended point expiry date | July 31, 2023  (24 months from current date) |

**CSV Fields**

Customer identifier (User ID/External ID/Email/Mobile/Card Number)\*\
**CSV Sample using User ID**:

User Id

1250755

![](https://files.readme.io/8771f26-p42i7B0Vhepn4lZ93XxfxfHtLdbfNLE7kQ.png "p42i7B0Vhepn4lZ93XxfxfHtLdbfNLE7kQ.png")

**Template configuration**

![](https://files.readme.io/bca8224-Screenshot_2023-06-23_at_1.03.37_PM.png)

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Option
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Choose customer's unique identifier
      </td>

      <td>
        Choose the unique customer identifier used in the CSV to identify customers.\
        USER\_ID\
        MOBILE\
        EMAIL\
        EXTERNAL\_ID\
        CARD\_NUMBER
      </td>
    </tr>

    <tr>
      <td>
        Program Name
      </td>

      <td>
        Select the loyalty program name for which you want to update the point expiry date.
      </td>
    </tr>

    <tr>
      <td>
        Select start date -  

        Select end date
      </td>

      <td>
        Set the duration for which you want to update the expiry date. Any points that are expiring in the specified duration will be updated as per the new expiry date you set.
      </td>
    </tr>

    <tr>
      <td>
        Select Expiry Update Reason Type
      </td>

      <td>
        Choose your preferred type for points update.  

        * **Early expiry**: Select this option to expire points before the actual expiry date.\
          For example, If the actual point expiry date is August 30, 2021, then the early expiry date must be before August 30, 2021.  
        * **Extended expiry**: Select this option to extend the expiry date from the actual expiry date.\
          For example, If the actual point expiry date is August 30, 2021, then the extended expiry date must be after August 30, 2021.
      </td>
    </tr>

    <tr>
      <td>
        Select Expiry Update Reason Note
      </td>

      <td>
        Enter the reason for updating the point expiry date.
      </td>
    </tr>

    <tr>
      <td>
        Set expiry date to
      </td>

      <td>
        Choose the expiry date from the following options.  

        * **Fixed date expiry**: Set a date on which you want to expire the points. Fixed date expiry must be greater than the current date.\
          For example, If the current date is August 29, 2021, then the fixed date expiry must start from August 30, 2021  
        * **Relative date expiry**: Set the number of days or months after which the points will expire.\
          For example, If the current date is July 29, 2021(today) and you set the expiry count to 5 days then the point expiry date will be August 02, 2021.  
        * **Immediate expiry**: Select this option if you want the points to be expired immediately(the moment system has successfully updated the point expiry using data import. 
      </td>
    </tr>

    <tr>
      <td>
        Expire Promised Points
      </td>

      <td>
        Select this to expire promised points. 
      </td>
    </tr>
  </tbody>
</Table>

## Update Points Expiry (PointsType & RefID)

This profile lets you modify the points expiry of a customer based on Point Awarded Reference Type and Point Awarded Reference ID. It is very important to understand how the issued and expired points will be affected by this import.

**Example**:

Consider there are five customers in an org with different reasons to update their point expiry and you want to update customer 1, customer 2, and rest customers(customer 3, 4, and 5) with different expiry type(extended or early expiry) and date(fixed, relative, or immediate).

* **Use case 1 -  Update expiry for a customers with point awarded reference ID**\
  Consider customer 1 has accidentally received points with a incorrect validly (incorrect validity awarded - 4 months, correct validity should be - 6 months). In this case, you can update customer 1 with an extended points expiry of 2 months(relative) using point awarded reference ID.\
  Note: When point awarded reference ID is mentioned then you also have to mention point awarded reference type in the csv file.\
  &#x9;

| Facts                       | Date & duration                                                    |
| :-------------------------- | :----------------------------------------------------------------- |
| Current date                | August 01, 2021                                                    |
| Incorrect point expiry date | September 31, 2021 (31 days from current date)                     |
| Extended point expiry date  | October 31, 2021 (After 2 months from incorrect point expiry date) |

* **Use case 2 -  Update expiry for a customers with point awarded reference type**\
  Consider customer 1 has 100 points that are going to expire on August 31, 2021 but the store will be closed from August 22, 2021 to August 31, 2021(10 days) due to store redesigning. In this case, you can update customer 2 with an extended points expiry of 10 days(relative) using point awarded reference type.

| Facts                      | Date & duration                                                                  |
| :------------------------- | :------------------------------------------------------------------------------- |
| Current date               | August 01, 2021                                                                  |
| Actual point expiry date   | August 31, 2021 (31 days from current date)                                      |
| Extended point expiry date | September 09, 2021 (Points expiring after 10 days from actual point expiry date) |

* **Use case 3 -  Update expiry for a list of customers**\
  Consider customer 3, 4, and 5 have 100 points each that are going to expire on September 30, 2021 but the store will be closed permanently after August 31, 2021 due to business failure. In this case, you can update customer 3, 4, and 5 with an early points expiry date - August 31, 2021(fixed).

| Facts                    | Date & duration                                                   |
| :----------------------- | :---------------------------------------------------------------- |
| Current date             | August 01, 2021                                                   |
| Actual point expiry date | September 30, 2021                                                |
| Early point expiry date  | August 31, 2021 (Points expiring before actual point expiry date) |

The following are fields of the csv file.

Customer identifier (User ID/External ID/Email/Mobile/Card Number)\*

* Point Awarded Ref Type\*
* Point Awarded Ref ID\*
* Expiry Type\*
* Expiry Unit\*
* Expiry Value\*
* Expiry Update Reason Type\*
* Expiry Update Reason Note

**CSV Sample using User ID**:

User Id,Point Awarded Ref Type,Point Awarded Ref Id,Expiry Type,Expiry Unit,New Expiry Value,Expiry Update Reason Type,Expiry Update Reason Note

235233,POINTS\_AWARDED,134435,relative,months,12,Extend\_Expiry,Covid

![](https://files.readme.io/b7bc048-VogGSXX7XdD7W--0o4S0c3QASENrDf6asg.png "VogGSXX7XdD7W--0o4S0c3QASENrDf6asg.png")

**Template configuration**

![](https://files.readme.io/bd6ed8f-Screenshot_2023-06-23_at_2.08.44_PM.png)

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Option
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Choose customer's unique identifier
      </td>

      <td>
        Choose the unique customer identifier used in the CSV to identify customers.  

        * USER\_ID  
        * MOBILE  
        * EMAIL  
        * EXTERNAL\_ID  
        * CARD\_NUMBER 
      </td>
    </tr>

    <tr>
      <td>
        Choose Program Name
      </td>

      <td>
        Select the loyalty program for which you want to update the point expiry date of a customer.
      </td>
    </tr>

    <tr>
      <td>
        Select Expiry Update Reason Type
      </td>

      <td>
        Choose your preferred type for points update.  

        * **Early expiry**: Select this option to expire points before the actual expiry date.\
          For example, If the actual point expiry date is August 30, 2021, then the early expiry date must be before August 30, 2021.  
        * **Extended expiry**: Select this option to extend the expiry date from the actual expiry date.\
          For example, If the actual point expiry date is August 30, 2021, then the extended expiry date must be after August 30, 2021.
      </td>
    </tr>

    <tr>
      <td>
        Select Expiry Update Reason Note
      </td>

      <td>
        Enter the reason for updating the point expiry date/days/months.
      </td>
    </tr>

    <tr>
      <td>
        Expire promised points
      </td>

      <td>
        Select this to expire promised points.  
      </td>
    </tr>
  </tbody>
</Table>

## Update Points Expiry (using Promotion ID)

This profile lets you update the points expiry of a customer based on Loyalty Promotion ID.

It is very important to understand how the issued and expired points will be affected by this import.

**Example**:

Consider that 100 promotional points wrongly awarded to 10 customers of an org. Now the org want to remove the promotional points from all 10 customers. In such case, you can select the promotion and use the customer identifier(User ID/External ID/Email/Mobile/Card Number) to change the expiry type(early expiry) and date(immediately).

| Facts                   | Date & duration                               |
| :---------------------- | :-------------------------------------------- |
| Early point expiry date | Immediate expiry (on the date of data import) |

* Customer identifier (User ID/External ID/Email/Mobile/Card Number)\*

**CSV Sample using User ID:**

User Id

1250755

![](https://files.readme.io/514555b-p42i7B0Vhepn4lZ93XxfxfHtLdbfNLE7kQ_1.png "p42i7B0Vhepn4lZ93XxfxfHtLdbfNLE7kQ (1).png")

**Template configuration**

![](https://files.readme.io/888a40a-Screenshot_2023-06-23_at_2.11.27_PM.png)

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Option
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Choose customer's unique identifier
      </td>

      <td>
        Choose the unique customer identifier used in the CSV to identify customers.  

        * USER\_ID  
        * MOBILE  
        * EMAIL  
        * EXTERNAL\_ID  
        * CARD\_NUMBER 
      </td>
    </tr>

    <tr>
      <td>
        Program Name
      </td>

      <td>
        Select the loyalty program for which you want to update the point expiry date of a customer.
      </td>
    </tr>

    <tr>
      <td>
        Select Promotion
      </td>

      <td>
        Select the promotion for which you want to update the point expiry date of a customer.
      </td>
    </tr>

    <tr>
      <td>
        Select Expiry Update Reason Type
      </td>

      <td>
        Choose your preferred type for points update.  

        * **Early expiry**: Select this option to expire points before the actual expiry date.\
          For example, If the actual point expiry date is August 30, 2021, then the early expiry date must be before August 30, 2021.  
        * **Extended expiry**: Select this option to extend the expiry date from the actual expiry date.\
          For example, If the actual point expiry date is August 30, 2021, then the extended expiry date must be after August 30, 2021.
      </td>
    </tr>

    <tr>
      <td>
        Select Expiry Update Reason Note
      </td>

      <td>
        Enter the reason for updating the point expiry date.
      </td>
    </tr>

    <tr>
      <td>
        Set expiry date to
      </td>

      <td>
        Choose the expiry date from the following options.  

        * **Fixed date expiry**: Set a date on which you want to expire the points. Fixed date expiry must be greater than the current date.\
          For example, If the current date is August 29, 2021, then the fixed date expiry must start from August 30, 2021  
        * **Relative date expiry**: Set the number of days or months after which the points will expire.\
          For example, If the current date is July 29, 2021(today) and you set the expiry count to 5 days then the point expiry date will be August 02, 2021.  
        * **Immediate expiry**: Select this option if you want the points to be expired immediately(the moment system has successfully updated the point expiry using data import. 
      </td>
    </tr>

    <tr>
      <td>
        Expire promised points
      </td>

      <td>
        Select this to expire promised points. 
      </td>
    </tr>
  </tbody>
</Table>