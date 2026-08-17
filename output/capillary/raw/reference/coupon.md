---
updatedAt: 2026-05-07T13:47:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Coupon (V2 APIs)

Coupon represents store promotions or discounts created through Capillary Campaign Manager. A single campaign could contain one or more coupons or coupon series. Coupons are issued to loyalty or non-loyalty customers through SMS or email.

You cannot create new coupons using coupon APIs. You can just send or retrieve coupons that are already created in your campaigns. Hence, it is important to note the coupon code, coupon id or coupon series id for making API calls.

You cannot create new coupons using coupon APIs; instead, you can send or retrieve coupons that are already created in your campaigns. Hence, it is important to note the coupon code, coupon id or coupon series id to use coupon APIs.

The V2 coupon entity just allows you to -

* Redeem coupons in batch
* Check whether specific coupons can be redeemed or not

For any other coupon related APIs, please use v1.1 APIs.

## Status Codes

### Error Codes

<Table>
    <thead>
    <tr>
        <th>
            Code
        </th>

        <th>
            Description
        </th>
    </tr>
    </thead>

    <tbody>
    <tr>
        <td>
            412
        </td>

        <td>
            Coupon gateway service error. Please try again later.
        </td>
    </tr>

    <tr>
        <td>
            413
        </td>

        <td>
            Coupon gateway connection exhausted. Please try again later.
        </td>
    </tr>

    <tr>
        <td>
            500
        </td>

        <td>
            All requests have failed due to errors
        </td>
    </tr>

    <tr>
        <td>
            510
        </td>

        <td>
            Invalid Redemption ids present
        </td>
    </tr>

    <tr>
        <td>
            629
        </td>

        <td>
            Invalid Input. This can also occuer if you try to redeem more than 100 coupons.
        </td>
    </tr>

    <tr>
        <td>
            621
        </td>

        <td>
            Maximum number of coupons issued per user has been exceeded.
        </td>
    </tr>

    <tr>
        <td>
            626
        </td>

        <td>
            Maximum number of coupons issued per series has been exceeded.
        </td>
    </tr>

    <tr>
        <td>
            660
        </td>

        <td>
            Coupon code has been revoked
        </td>
    </tr>

    <tr>
        <td>
            661
        </td>

        <td>
            No Redemption id passed
        </td>
    </tr>

    <tr>
        <td>
            662
        </td>

        <td>
            Coupon gateway validation error.
        </td>
    </tr>

    <tr>
        <td>
            683
        </td>

        <td>
            Voucher Redemption event failed
        </td>
    </tr>

    <tr>
        <td>
            687
        </td>

        <td>
            Points activities are queued and will be updated later
        </td>
    </tr>

    <tr>
        <td>
            700
        </td>

        <td>
            Coupon series fetched successfully<br />Coupon processing successful.<br />Coupon resent successfully.<br />Coupon processing successful.<br />Coupon isRedeem successful
        </td>
    </tr>

    <tr>
        <td>
            701
        </td>

        <td>
            The customer could not be found. Please check mobile, email, external id passed
        </td>
    </tr>

    <tr>
        <td>
            702
        </td>

        <td>
            Coupon code is invalid
        </td>
    </tr>

    <tr>
        <td>
            707
        </td>

        <td>
            Coupon Series ID is invalid
        </td>
    </tr>

    <tr>
        <td>
            703
        </td>

        <td>
            Coupon not issued to this customer
        </td>
    </tr>

    <tr>
        <td>
            704
        </td>

        <td>
            Error in sending coupon through SMS
        </td>
    </tr>

    <tr>
        <td>
            705
        </td>

        <td>
            Both coupon code and the validation code are invalid
        </td>
    </tr>

    <tr>
        <td>
            707
        </td>

        <td>
            Coupon Series ID = \{x} is invalid
        </td>
    </tr>

    <tr>
        <td>
            709
        </td>

        <td>
            Coupon processing failed
        </td>
    </tr>

    <tr>
        <td>
            710
        </td>

        <td>
            Coupon is not meant for this customer
        </td>
    </tr>

    <tr>
        <td>
            711
        </td>

        <td>
            Coupon is already used
        </td>
    </tr>

    <tr>
        <td>
            712
        </td>

        <td>
            Coupon Series / Campaign has expired
        </td>
    </tr>

    <tr>
        <td>
            713
        </td>

        <td>
            Coupon has expired
        </td>
    </tr>

    <tr>
        <td>
            714
        </td>

        <td>
            Campaign over, it was first come first serve
        </td>
    </tr>

    <tr>
        <td>
            715
        </td>

        <td>
            Invalid organization
        </td>
    </tr>

    <tr>
        <td>
            716
        </td>

        <td>
            Cannot redeem same Coupon multiple times
        </td>
    </tr>

    <tr>
        <td>
            718
        </td>

        <td>
            Transaction number needed for redemption
        </td>
    </tr>

    <tr>
        <td>
            719
        </td>

        <td>
            Coupon code does not exist
        </td>
    </tr>

    <tr>
        <td>
            720
        </td>

        <td>
            Coupon is a test Coupon. Cannot be redeemed
        </td>
    </tr>

    <tr>
        <td>
            721
        </td>

        <td>
            Invalid customer
        </td>
    </tr>

    <tr>
        <td>
            722
        </td>

        <td>
            Unable to create coupon
        </td>
    </tr>

    <tr>
        <td>
            723
        </td>

        <td>
            Coupon not issued to this customer
        </td>
    </tr>

    <tr>
        <td>
            724
        </td>

        <td>
            Unable to communicate information to customer
        </td>
    </tr>

    <tr>
        <td>
            725
        </td>

        <td>
            Validation required
        </td>
    </tr>

    <tr>
        <td>
            726
        </td>

        <td>
            Validation not required
        </td>
    </tr>

    <tr>
        <td>
            728
        </td>

        <td>
            Maximum number of redemptions reached
        </td>
    </tr>

    <tr>
        <td>
            729
        </td>

        <td>
            Invalid redemption range For coupon series
        </td>
    </tr>

    <tr>
        <td>
            730
        </td>

        <td>
            Unknown error
        </td>
    </tr>

    <tr>
        <td>
            731
        </td>

        <td>
            Coupon redemption successful
        </td>
    </tr>

    <tr>
        <td>
            732
        </td>

        <td>
            No Missed call received from the customer
        </td>
    </tr>

    <tr>
        <td>
            733
        </td>

        <td>
            Invalid transaction amount
        </td>
    </tr>

    <tr>
        <td>
            735
        </td>

        <td>
            Invalid store
        </td>
    </tr>

    <tr>
        <td>
            736
        </td>

        <td>
            Allowed redemption consumed
        </td>
    </tr>

    <tr>
        <td>
            738
        </td>

        <td>
            Allowed redemption gap is invalid
        </td>
    </tr>

    <tr>
        <td>
            739
        </td>

        <td>
            Allowed redemption date is invalid
        </td>
    </tr>

    <tr>
        <td>
            740
        </td>

        <td>
            Fraud customer
        </td>
    </tr>

    <tr>
        <td>
            742
        </td>

        <td>
            Coupon issue and redemption blocked for customer
        </td>
    </tr>

    <tr>
        <td>
            744
        </td>

        <td>
            Couldn't save coupon series fields
        </td>
    </tr>

    <tr>
        <td>
            745
        </td>

        <td>
            Saved coupon series fields successfully
        </td>
    </tr>

    <tr>
        <td>
            746
        </td>

        <td>
            Please provide series id
        </td>
    </tr>

    <tr>
        <td>
            747
        </td>

        <td>
            Multiple redemption not allowed
        </td>
    </tr>

    <tr>
        <td>
            748
        </td>

        <td>
            Coupon service timed out
        </td>
    </tr>

    <tr>
        <td>
            749
        </td>

        <td>
            Coupon Redeem/isRedeem failed because of failure on other coupons in the batch
        </td>
    </tr>

    <tr>
        <td>
            750
        </td>

        <td>
            Operation not allowed. Not allowed - customer is marked as fraud.
        </td>
    </tr>

    <tr>
        <td>
            751
        </td>

        <td>
            coupon series with same series code is already present
        </td>
    </tr>

    <tr>
        <td>
            752
        </td>

        <td>
            coupon series with same series code is already present
        </td>
    </tr>

    <tr>
        <td>
            753
        </td>

        <td>
            series code cannot be empty
        </td>
    </tr>

    <tr>
        <td>
            754
        </td>

        <td>
            generic cannot be empty for series type GENERIC
        </td>
    </tr>

    <tr>
        <td>
            755
        </td>

        <td>
            invalid coupon series id
        </td>
    </tr>

    <tr>
        <td>
            756
        </td>

        <td>
            invalid value for mutually exclusive config series
        </td>
    </tr>

    <tr>
        <td>
            759
        </td>

        <td>
            Coupon redemption failed
        </td>
    </tr>

    <tr>
        <td>
            777
        </td>

        <td>
            coupon source not valid for issue coupon
        </td>
    </tr>

    <tr>
        <td>
            780
        </td>

        <td>
            Coupon not found Identifier: \{x}. <br />Coupon isRedeem failed
        </td>
    </tr>

    <tr>
        <td>
            781
        </td>

        <td>
            Either coupon ID or coupon code is missing
        </td>
    </tr>

    <tr>
        <td>
            786
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            787
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            788
        </td>

        <td>
            Invalid configuration. Please report to capillary support
        </td>
    </tr>

    <tr>
        <td>
            789
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            790
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            791
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            792
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            793
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            794
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            795
        </td>

        <td>
            Invalid configuration. Please report to capillary support.
        </td>
    </tr>

    <tr>
        <td>
            796
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            797
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            798
        </td>

        <td>
            Coupon processing failed, Please try again later
        </td>
    </tr>

    <tr>
        <td>
            799
        </td>

        <td>
            Invalid configuration. Please report to capillary support
        </td>
    </tr>

    <tr>
        <td>
            1000
        </td>

        <td>
            Filters not provided
        </td>
    </tr>

    <tr>
        <td>
            811
        </td>

        <td>
            Operation not supported for GENERIC_REDEEMABLE series.
        </td>
    </tr>
    </tbody>
</Table>

## Coupon Series Limits

A coupon series may have a fixed number of coupons, especially when coupons are manually uploaded. Once all coupons in the series have been issued, no further redemptions are possible for that series. Any attempt to redeem a coupon after the series limit is reached will fail. This ensures that the total number of redemptions does not exceed the configured limit for the coupon series.

**Note:** Always ensure that the coupon series has sufficient unused coupons available before attempting redemption operations.