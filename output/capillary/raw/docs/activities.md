---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Customer Activities

A rule expression is a combination of profile, attributes, sub-attributes (for selected attributes), operators, and expression values. Profiles might vary based on the activity and accordingly the attributes, and sub-attributes.

The following table provides the list of profiles supported for each activity. Each profile supports  certain attributes. You can read more about each profile in the next article.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Activity
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        Supported Profiles
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        Make a transaction (TransactionAdd)
      </td>

      <td style={{ textAlign: "left" }}>
        Transaction Add is a combination of a new transaction and tracker finished activities.  Here, you can evaluate conditions and execute actions on a new transaction, tracker, and transaction complete activities.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        currentTracker\
        currentTrackerCondition\
        currentTxn\
        groupPrimaryCustomer\
        organization\
        program\
        referrerCode\
        tenderProfile
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        DelayedAccrual
      </td>

      <td style={{ textAlign: "left" }}>
        Credits points to customer account after a specific number of days.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentEvent\
        currentStore\
        program
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        CustomerRegistration
      </td>

      <td style={{ textAlign: "left" }}>
        Create rules and execute actions on a new customer registration activity.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        groupPrimaryCustomer\
        organization\
        program\
        referrerCode
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        PointsRedemption
      </td>

      <td style={{ textAlign: "left" }}>
        Configure rules and actions on points redemption activity.\
        Even before validating points redemption conditions, the system checks whether the points are redeemable.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        organization\
        program
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        CouponRedemption
      </td>

      <td style={{ textAlign: "left" }}>
        Define rules and conditions on coupon redemption activity.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        organization\
        program
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        ReturnTransaction
      </td>

      <td style={{ textAlign: "left" }}>
        Configure rules and actions on transaction return activity.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        groupPrimaryCustomer\
        organization\
        program\
        returnBill\
        tenderProfile
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        CustomerUpdate
      </td>

      <td style={{ textAlign: "left" }}>
        Configure rules and actions on the customer profile update activity.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        groupPrimaryCustomer\
        organization\
        program
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        TransactionUpdate
      </td>

      <td style={{ textAlign: "left" }}>
        Configure rules and actions on the transaction update activity.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        currentTxn\
        groupPrimaryCustomer\
        organization\
        program
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        SocialConnect
      </td>

      <td style={{ textAlign: "left" }}>
        Execute actions for social events (events through Social Connect)
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        groupPrimaryCustomer\
        organization\
        program
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        SlabUpgrade
      </td>

      <td style={{ textAlign: "left" }}>
        Configure rules for the tier upgrade activity.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        currentTxn\
        groupPrimaryCustomer\
        organization\
        program\
        referrerCode\
        tenderProfile
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        TargetCompleted
      </td>

      <td style={{ textAlign: "left" }}>
        Configure rules for target-based loyalty.
      </td>

      <td style={{ textAlign: "left" }}>
        currentCustomer\
        currentCustomerPartner\
        currentEvent\
        currentStore\
        groupPrimaryCustomer\
        organization\
        program
      </td>
    </tr>
  </tbody>
</Table>