---
updatedAt: 2026-03-04T06:05:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Points awarded/deducted scenarios

The major fact tables to refer to understand the use cases and possible scenarios of events related to points are as below:

<Table>
  <thead>
    <tr>
      <th>
        <Glossary>EI</Glossary>

         tables for Points data
      </th>

      <th>

      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Fact tables
      </td>

      <td>
        Dimension tables
      </td>
    </tr>

    <tr>
      <td>
        points
      </td>

      <td>
        points

        \_

        awarded

        \_

        type
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        points

        \_

        category
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        points

        \_

        event

        \_

        type
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        points

        \_

        promotions
      </td>
    </tr>

    <tr>
      <td>

      </td>

      <td>
        deduction

        \_

        type
      </td>
    </tr>

    <tr>
      <td>
        points

        \_

        redemption

        \_

        summary
      </td>

      <td>
        Date , zone

        \_

        till , time
      </td>
    </tr>

    <tr>
      <td>
        points

        \_

        expiry

        \_

        reminder

        \_

        info
      </td>

      <td>
        Date , communication

        \_

        channel, time
      </td>
    </tr>
  </tbody>
</Table>

The dimension table for Point Fact which gives info regarding the points awarded scenario is *points\_awarded\_type.*

## Values for awarded\_type and their context:

### POINTS\_AWARDED:

* It refers to the regular points awarded to the user  for making any  transactions.
* *Scenario*:
  * Customer made a txn of Rs.1000 on 1st Feb
  * Customer is awarded  100 points
* *Effect* :
  * Entry in the points fact on EI side with granularity at  awarded\_ref\_id level.
  * Each entry refers to a unique event of points awarded at transaction level.
  * The column dim\_points\_awarded\_type\_id will be 1 referring to enum ‘POINT\_AWARDED’.
  * Allocated\_points = 100 \[populated from the points\_exclusive column of the points\_awarded table in the source ] against the bill\_id.

### POINTS\_AWARDED\_BILL\_PROMOTION

* Promotional points given on top of regular point at transaction level

* *Scenario*:
  * Customer made a txn of Rs.1000 on 1st Feb and got 100 points.
  * Also got 50 bonus points through a promotion running.

* *Effect*:
  * Entry in the points fact on EI side with granularity at  awarded\_ref\_id level.
  * Each entry refers to a unique event of points awarded at transaction level.
  * The column dim\_points\_awarded\_type\_id will be 2 referring to enum POINT\_AWARDED\_BILL\_PROMOTION.
  * Allocated\_points = 100 \[populated from the points\_exclusive column of the points\_awarded table in the\
    source ]\[populated from the points\_exclusive column of the points\_awarded table in the\
    source ] against the bill\_id in the points fact.
  * Allocated\_points = 50\[populated from the points\_value column of points\_awarded\_bill\_promotions  table in\
    the source ]\[populated from the points\_value column of points\_awarded\_bill\_promotions  table in\
    the source ] against the bill\_id in the points fact

### POINTS\_AWARDED\_LINEITEM

* Regular points awarded for purchasing a specific product

* *Scenario*:
  * Customer made a txn of Rs. 1000, containing 3 items of Rs. 200, Rs. 350 and Rs. 450,
  * He gets 20 points on item 1, 35 points on item 2 and 45 points on item 3.
  * Also gets 40 bonus points on item 1 through a promotion running on that SKU

* *Effect*:
  * Entry in the points fact on EI side with granularity at  awarded\_ref\_id level.
  * Each entry refers to a unique event of points awarded at transaction level.\
    -The column dim\_points\_awarded\_type\_id will be 3 referring to enum POINT\_AWARDED\_LINEITEM.

* On source side there would be an entry against each line item
  * points\_exclusive column of points\_awarded\_lineitems table  will have 20 points against first bill\_lineitem, (id\
    will be in bill\_lineitem\_id column)
  * points\_exclusive column of points\_awarded\_lineitems table  will have 35 points against second bill\_lineitem,\
    (id will be in bill\_lineitem\_id column)
  * points\_exclusive column will have 45 points against thrift bill\_lineitem, (id will be in bill\_lineitem\_id column)\
    event\_log\_id in all 3 records with id generated in the event\_log table

* In customer\_points\_summary  table, against that point category,
  * current\_points will become x + 100 (x is the current\_points before this event)
  * cumulative\_points will become x +100
  * event\_log\_id with id generated in the event\_log table

* If Ledger is enabled, points\_ledger table will have an
  * entry of 100 points with entry\_type as CREDIT
  * cps\_id which got affected in the above CPS
  * event\_log\_id with id generated in the event\_log table

### POINTS\_AWARDED\_LINEITEM\_PROMOTION

* Promotional points given on top of regular point at line item level

* *Scenario*:
  * Customer made a txn of Rs. 1000, containing 3 items of Rs. 200, Rs. 350 and Rs. 450,
  * He gets 20 points on item 1, 35 points on item 2 and 45 points on item 3.
  * Also gets 40 bonus points on item 1 through a promotion running on that SKU

* *Effect*:
  * Entry in the points fact on EI side with granularity at  awarded\_ref\_id level.
  * Each entry refers to a unique event of points awarded at transaction/line item/promotion level.
  * The column dim\_points\_awarded\_type\_id will be 4 referring to enum

### POINTS\_AWARDED\_LINEITEM\_PROMOTION.

* In the event\_log table, an event record will be inserted with event\_type\_id as 15.

* The id generated here is event\_log\_id.

* In points\_awarded\_lineitems table, there will be 3 entries
  * points\_exclusive column will have 20 points against first bill\_lineitem (id will be   in bill\_lineitem\_id column),
  * points\_exclusive column will have 35 points against second bill\_lineitem (id will be in bill\_lineitem\_id\
    column),
  * points\_exclusive column will have 45 points against thrift bill\_lineitem (id will be in bill\_lineitem\_id column),
  * event\_log\_id in all 3 records with id generated in the event\_log table

* In points\_awarded\_lineitem\_promotion table, there will a single entry
  * points\_value column will have 40 points against the first bill\_lineitem.

* In customer\_points\_summary table, against that point category,
  * current\_points will become x + 140 (x is the current\_points before this event)
  * cumulative\_points will become x +140
  * event\_log\_id with id generated in the event\_log table

* If Ledger is enabled, points\_ledger table will have an
  * entry of 140 points with entry\_type as CREDIT
  * cps\_id which got affected in the above CPS
  * event\_log\_id with id generated in the event\_log table

### POINTS\_AWARDED\_CUSTOMER\_PROMOTION

* Promotional points given on top of regular points at customer level.

* *Scenario*:
  * Customer gets 100 bonus points while enrolling/registering in the program.

* *Effect*:
  * Entry in the points fact on EI side with granularity at  awarded\_ref\_id level.
  * Each entry refers to a unique event of points awarded at transaction/line item/promotion level.
  * The column dim\_points\_awarded\_type\_id will be 4 referring to enum

### POINTS\_AWARDED\_CUSTOMER\_PROMOTION.

* In the event\_log table, an event record will be inserted with event\_type\_id as 2.

* The id generated here is event\_log\_id

* In points\_awarded\_customer\_promotion table,
  * points\_value column will have 100 points,
  * event\_log\_id with id generated in the event\_log table

* In customer\_enrollment table, against that point category,
  * a new entry will be created for the customer
  * event\_log\_id with id generated in the event\_log table

* In customer\_points\_summary table, against that point category,
  * a new entry will be created for the customer
  * current\_points will become 100
  * cumulative\_points will become 100
  * event\_log\_id with id generated in the event\_log table

* If Ledger is enabled, points\_ledger table will have an
  * entry of 100 points with entry\_type as CREDIT
  * cps\_id which got affected in the above CPS
  * event\_log\_id with id generated in the event\_log table

The dimension table for Point Fact which gives info regarding the points deducted scenario is deduction\_type.

## Values for deduction\_type and their context:

### EXPIRED

* Points awarded to the user are expired and deducted.

* *Scenario:*
  * Customer made a transaction of Rs.1000 on 1st feb and was awarded 100 points.
  * The above awarded points expired on 10th feb.

* *Effect:*
  * All points that expire will appear in the Point Fact at the granularity of the awarded\_ref\_id against which the\
    points have expired.
  * Points shall appear in the ‘deducted\_points’ column. Effect is reduction in user’s point balance.
  * The column dim\_deduction\_type\_id will be 2 referring to enum EXPIRED.
  * Till 9th feb, the flow will be usual like the above awarded scenarios, because the points will be in awarded\
    tables.

* **On 10th feb, the following will happen :**
  * In event\_log table  new entry will be created with event\_type\_id as 2

* In PA table,
  * points\_exclusive column will stay 100
  * expired\_exclusive\_value column will become 100
  * status column will change from AVAILABLE to EXPIRED

* In CPS table
  * current\_points column will reduce by 100
  * cumulative\_points column will stay the same
  * points\_expired column will become x+100

* If Ledger is Enabled,
  * an entry\_type column with DEBIT will be created
  * points column will be 100
  * event\_log\_id column will have the id generated in the above event\_log table

* In PD  table,
  * an entry will be created with deduction\_type as EXPIRED
  * points\_deducted column will have 100.
  * event\_log\_id will the id generated in the above event\_log table
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)

### REDEEMED

* User redeems the points allocated to him for any transaction

* *Scenario*:
  * Customer made a txn of Rs.1000 on 1st Feb and got 100 points.
  * The points are redeemed by the customer on 8th Feb.

* *Effect*:
  * All points that expire will appear in the Point Fact at the granularity of the awarded\_ref\_id against which\
    the points have redeemed.
  * The column dim\_deduction\_type\_id will be 4 referring to enum REDEEMED.

* **On 8th Feb, In event\_log table**
  * new entry will be created with event\_type\_id as 3

* In PA table,
  * points\_exclusive column will stay 100
  * redeemed\_exclusive\_value column will become 100
  * status column will change from AVAILABLE to REDEEMED

* In CPS table,
  * current\_points column will reduce by 100
  * cumulative\_points column will stay the same
  * points\_redeemed column will become x+100

* If Ledger is Enabled,
  * an entry\_type column with DEBIT will be created
  * points column will be 100
  * event\_log\_id column will have the id generated in the above event\_log table

* In PD  table,
  * an entry will be created with deduction\_type as REDEEMED
  * points\_deducted column will have 100.
  * event\_log\_id will the id generated in the above event\_log table
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)

* In PRS table,
  * an entry will be created with redemption\_type column as REDEEMED
  * points\_redeemed column will have 100
  * redemption\_id column will have a unique id generated by loyalty
  * bill\_id / bill\_number column will have the bill against which points were redeemed(if passed in the\
    payload)
  * event\_log\_id will the id generated in the above event\_log table

### RETURN

* Points are allocated to the user on a transaction.

* Before the points are redeemed or expired, the user returns the transaction.

* The points awarded on these transaction are then deducted

* *Scenario*:
  * Customer made a txn 1 of Rs.1000 on 1st Feb and got 100 points.
  * The expiry date of the points is 10th Feb.
  * txn 1 is returned by the customer on 5th Feb.

* *Effect*:
  * All points that expire will appear in the Point Fact at the granularity of the awarded\_ref\_id against which the\
    points have been returned.
  * The column dim\_deduction\_type\_id will be 5 referring to enum RETURN.

* **On 5th Feb, In event\_log table**
  * new entry will be created with event\_type\_id as 5

* In PA table,
  * points\_exclusive column will stay 100
  * returned\_exclusive\_value column will become 100
  * status column will change from AVAILABLE to RETURNED

* In CPS table,
  * current\_points column will reduce by 100
  * cumulative\_points column will stay the same
  * points\_returned column will become x+100

* If Ledger is Enabled,
  * an entry\_type column with DEBIT will be created
  * points column will be 100
  * event\_log\_id column will have the id generated in the above event\_log table

* In PD  table,
  * an entry will be created with deduction\_type as RETURN
  * points\_deducted column will have 100.
  * event\_log\_id will the id generated in the above event\_log table
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)

### REDEMPTION\_REVERSAL

* User redeems the points for a transaction ,

* later he decides not to use those points and reverse the redemption

* OR the transaction on which he redeemed the points is reverted.

* *Scenario*:
  * Customer made a txn 1 of Rs.1000 on 1st Feb and got 100 points.The expiry date of the points is 10th Feb.
  * Customer makes another txn 2 of Rs 2000 on 3rd Feb and redeems 100 points.
  * Customer returns txn 2 on 5th Feb

* *Effect*:
  * All points that expire will appear in the Point Fact at the granularity of the awarded\_ref\_id against which the\
    redeemed points have been reversed.
  * The column dim\_deduction\_type\_id will be 7 referring to enum REDEMPTION\_REVERSAL.

* **On 3rd Feb, In event\_log table**
  * first entry will be created with event\_type\_id as 3 for Redeem---- e1
  * 2nd entry will be created with event\_type\_id as 15 for transaction/add------e2

* In PA table,
  * The PA created for the 1st transaction will be updated with
  * redeemed\_exclusive\_value column will become x+100
  * status column will become REDEEMED

* In CPS Table,
  * points\_redeemed column will become x + 100
  * current\_points will reduce by 100 (x-100)

* If Ledger is enabled, Points Ledger table will have,
  * DEBIT entry of 100 will be created against e1 event\_log\_id
  * cps\_id will be the one that is affected above

* In PD table,
  * an entry will be created with deduction\_type as REDEEMED
  * points\_deducted column will have 100.
  * event\_log\_id will the id as e1
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)

* In PRS table,When redemption occurred
  * an entry will be created with redemption\_type column as REDEEMED
  * points\_redeemed column will have 100
  * redemption\_id column will have a unique id generated by loyalty
  * billNumber / billId will be -1
  * event\_log\_id will the id generated as e1

* When 2nd transaction occurs, If unique redemption id is passed in the payload,
  * billNumber / billId column will get updated to bill\_number\_2 / bill\_id\_2

* **After 5thFeb, when Txn2 is returned,**

* In event\_log table,
  * an entry will be created with event\_type\_id as 5 ----- e3

* In PA Table,
  * redeemed\_exclusive\_value will become x-100
  * status column will change from REDEEMED to AVAILABLE
  * points\_exclusive stay as it is.

* In CPS Table,
  * points\_redeemed column will become x - 100
  * current\_points will increase by 100 (x+100)

* If Ledger is enabled, Points Ledger table will have,
  * CREDIT entry of 100 will be created against e3 event\_log\_id
  * cps\_id will be the one that is affected above

* In PD table,
  * an entry will be created with deduction\_type as REDEMPTION\_REVERSAL
  * points\_deducted column will have 100.
  * event\_log\_id will the id as e3
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)

* In PRS table, When redemption occurred
  * an entry will be created with redemption\_type column as REVERSAL\_ON\_RETURN
  * points\_redeemed column will have 100
  * redemption\_id column will have a unique id generated by loyalty
  * billNumber / billId will be -1
  * event\_log\_id will the id generated as e3

### REDEMPTION\_REVERTED

* Points are allocated to the user on a transaction and he redeems these points.

* Later, the transaction on which he earned these points is returned.

* *Scenario*:
  * Customer made a txn 1 of Rs.1000 on 1st Feb and got 100 points.The expiry date of the points is 10th Feb.
  * Customer makes another txn 2 of Rs 2000 on 3rd Feb and redeems 100 points.
  * Customer returns txn 1 on 5th Feb

* *Effect*:
  * All points that expire will appear in the Point Fact at the granularity of the awarded\_ref\_id against which the\
    redeemed points have been reverted.
  * The column dim\_deduction\_type\_id will be 9 referring to enum REDEMPTION\_REVERTED .

* **On 5th Feb, when Txn2 is returned**,

* In event\_log table,
  * an entry will be created with event\_type\_id as 5 ----- e3

* In PA Table,
  * redeemed\_exclusive\_value will become x-100
  * status column will change from REDEEMED to RETURNED
  * points\_exclusive stay as it is.
  * returned\_exclusive\_value will become x+100

* In PABP Table,New entry will be created with
  * points\_value column will be 0
  * redeemed\_value column will be x+100
  * status column will be CONSUMED
  * event\_log\_id will be e3
  * promotion\_id will be the id of the promotion mapped to ReturnBillPromotion

* In CPS Table,Assuming x is the points before this event came
  * points\_redeemed column will stay as it is
  * points\_returned column will become x+100
  * current\_points will become x-100
  * cumulative\_points will become x-100

* If Ledger is enabled, Points Ledger table will have,
  * DEBIT entry of 100 will be created against e3 event\_log\_id
  * cps\_id will be the one that is affected above

* In PD table,For the points that were awarded on txn1
  * one entry will be created with deduction\_type as RETURN and points\_deducted column will have 100.
  * one entry will be created with deduction\_type as REDEMPTION\_REVERTED and points\_deducted column will\
    have 100
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)
  * event\_log\_id will the id as e3

* For the PABP negative points that was created
  * one entry will be created with deduction\_type as REDEEMED and points\_deducted column will have 100.
  * points\_awarded\_ref\_id will point to the PABP\_id which got affected
  * points\_awarded\_ref\_type will be POINT\_AWARDED\_BILL\_PROMOTION
  * event\_log\_id will the id as e3

### EXPIRY\_REVERTED

* The points allocated to the user for any transaction are expired .

* After this the user returns the transaction on which he had earned these points

* *Scenario*:
  * Customer made a txn 1 of Rs.1000 on 1st Feb and got 100 points.
  * The points expired on 10th Feb.
  * Customer returns txn1 on 12th Feb

* *Effect*:
  * All points that expire will appear in the Point Fact at the granularity of the awarded\_ref\_id against which the\
    expired  points have been reverted.
  * The column dim\_deduction\_type\_id will be 8  referring to enum EXPIRY\_REVERTED

* **On 12th Feb ,In event\_log table**
  * new entry will be created with event\_type\_id as 5 ---- e3.

* In PA Table,
  * expired\_exclusive\_value will become x-100
  * returned\_exclusive\_value will become x+100
  * status column will change from EXPIRED to RETURNED
  * points\_exclusive stay as it is.

* In CPS Table,Assuming x is the points before this event came
  * points\_expired column will become x-100
  * points\_returned column will become x+100
  * current\_points will stay as it is
  * cumulative\_points will stay as it is

* If Ledger is enabled, Points Ledger table will have,
  * DEBIT entry of 100 will be created against e3 event\_log\_id
  * cps\_id will be the one that is affected above

* In PD table,For the points that were awarded on txn1
  * one entry will be created with deduction\_type as RETURN and points\_deducted column  will have 100.
  * one entry will be created with deduction\_type as EXPIRY\_REVERTED and points\_deducted column will have\
    100
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)
  * event\_log\_id will the id as e3

### REDEEMED\_BY\_TRANSFER

* One user (sender) transfers the points to another user (receiver).

* Points are deducted from the sender's entry

* *Scenario*:
  * Customer made a txn 1 of Rs.1000 on 1st Feb and got 100 points.
  * Customer transfers 100 points to his friend on 5th Feb

* *Effect*:

* **On 5th Feb**,

* In event\_log table
  * new entry will be created with event\_type\_id as 24  -->Sender is c1, Receiver is c2.

* In PA table,
  * points\_exclusive column for c1 will stay 100
  * redeemed\_exclusive\_value column for c1 will become 100
  * status column for c1 will change from AVAILABLE to REDEEMED

* In PACP table
  * new entry will be created for c2
  * points\_value column will be 100
  * status will be AVAILABLE
  * promotion\_id will be DefaultPointsTransferPromotion
  * event\_log\_id column will have the id generated in above event\_log table

* In CPS table,

* For c1,
  * current\_points column will reduce by 100
  * cumulative\_points column will stay the same
  * points\_redeemed column will become x+100

* For c2
  * current\_points column will increase by 100
  * cumulative\_points will become x+100

* If Ledger is Enabled,

* For c1
  * an entry\_type column with DEBIT will be created
  * points column will be 100
  * event\_log\_id column will have the id generated in the above event\_log table

* For c2
  * an entry\_type column with CREDIT will be created
  * points column will be 100
  * event\_log\_id column will have the id generated in the above event\_log table

* In PD  table,

* For c1
  * an entry will be created with deduction\_type as REDEEMED\_BY\_TRANSFER
  * points\_deducted column will have 100.
  * event\_log\_id will the id generated in the above event\_log table
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)

* In PRS table,

* For c1
  * an entry will be created with redemption\_type column as REDEEMED
  * points\_redeemed column will have 100
  * redemption\_id column will have a unique id generated by loyalty
  * bill\_id  column will be -1 / bill\_number column will be empty
  * event\_log\_id will the id generated in the above event\_log table

* In PTS table, a new entry will be created
  * from\_customer\_id column will be c1
  * to\_customer\_id column will be c2
  * points\_deducted column will have 100
  * points\_credited column will have 100
  * event\_log\_id will the id generated in the above event\_log table

### REDEEMED\_BY\_TRANSFER\_REVERTED

* This appears when there is a points transfer made from an account, following which the transaction where the points were awarded is returned.

* *Scenario*:
  * Customer made a txn 1 of Rs.1000 on 1st Feb and got 100 points.
  * Customer transfers 100 points to his friend on 5th Feb
  * Customer returns txn 1 on 7th Feb

* *Effect*:

* **On 7th Feb**,

* In event\_log table,
  * an entry will be created with event\_type\_id as 5 ----- e3

* In PA Table,
  * redeemed\_exclusive\_value will become x-100
  * status column will change from REDEEMED to RETURNED
  * points\_exclusive column will stay as its
  * returned\_exclusive column will become x+100

* In CPS Table,
  * current\_points will become x-100
  * points\_returned wil become x+100
  * cumulative\_points will become x-100

* If Ledger is enabled, Points Ledger table will have,
  * DEBIT entry will be created with 100 against e3 event\_log\_id
  * cps\_id will be the one that is affected above

* In PD table,

* For the points that were transferred
  * one entry will be created with deduction\_type as RETURN and points\_deducted column will have 100.
  * one entry will be created with deduction\_type as REDEEMED\_BY\_TRANSFER\_REVERTED and points\_deducted\
    column will have 100
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)
  * event\_log\_id will the id as e3

* For the PABP negative points that was created
  * one entry will be created with deduction\_type as REDEEMED\_BY\_TRANSFER and points\_deducted column will\
    have 100.
  * points\_awarded\_ref\_id will point to the PABP\_id which got affected
  * points\_awarded\_ref\_type will be POINT\_AWARDED\_BILL\_PROMOTION
  * event\_log\_id will the id as e3

### REDEEMED\_BY\_CONVERSION

* This scenario is used when delayed accrual is enabled.

* When the delay is over, a bulk job runs and converts promised points into regular points.

* This is when a RBC entry is made in the deduction table pointing to the PA entry of those points, but with\
  points category Promised Points .

* After this, a new PA entry is made in the PA table but with points category Regular points.

* *Scenario*:
  * Customer made a txn 1 of Rs.1000 on 1st Feb which has a return period of 5 days and got 100 points in his\
    promised points account
  * Customer has not returned the txn till 6th Feb midnight
  * 100 points get converted on 7th Feb morning

* *Effect*:

* **On 7th Feb**,

* In event\_log table,
  * an event record will be inserted with event\_type\_id as 16. The id generated here is event\_log\_id

* In PA table,\
  For the existing record with DelayedAccrualPointCategory:

  * points\_exclusive column will have 100 points,
  * redeemed\_exclusive\_value column will become 100 points
  * status column will be marked as CONSUMED\_BY\_CONVERSION

  A new record will be created in PA for Main Point Category:

  * points\_exclusive column will have 100
  * event\_log\_id with id generated in the event\_log table above
  * status will be AVAILABLE
  * rest all columns will be copied from the existing record of DelayedAccrualPointCategory

* In CPS table, For the DelayedAccrualPointCategory,

  * current\_points will become x - 100 (x is the current\_points before this event)
  * cumulative\_points won't change
  * points\_redeemed will become x + 100

    For the Main Point Category,
  * current\_points will become x + 100 (x is the current\_points before this event)
  * cumulative\_points column will become x + 100

* If Ledger is enabled, PL table will have an\
  For DelayedAccrualPointCategory

  * entry of 100 points with entry\_type as DEBIT
  * cps\_id which got affected in the above CPS
  * event\_log\_id with id generated in the event\_log table

  For Main Point Category

  * entry of 100 points with entry\_type as CREDIT
  * cps\_id which got affected in the above CPS
  * event\_log\_id with id generated in the event\_log table

* In PD table, an entry will be created with
  * deduction\_type column as REDEEMED\_BY\_CONVERSION
  * points\_deducted will be 100
  * event\_log\_id with id generated in the event\_log table
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)

### RETURN\_HISTORICAL

* This is used to adjust for partial returns that happen to promised points prior to conversion

* *Scenario*:
  * Customer made a txn 1 of Rs.1000 on 1st Feb which has a return period of 5 days and got 100 points in his\
    promised points account
  * Customer has returned Rs. 500 for the txn on 4th Feb
  * 50 points get converted on 7th Feb morning
  * 50 points get returned as RETURN\_HISTORICAL

* *Effect*:

* **On 4th Feb,**

* In event\_log table
  * new entry will be created with event\_type\_id as 5, with id as e1

* In PA table,
  * points\_exclusive column will stay 100
  * returned\_exclusive\_value column will become 50
  * status column will stay as AVAILABLE

* In CPS table,
  * current\_points column will reduce by 50
  * cumulative\_points column will stay the same
  * points\_returned column will become x+50

* If Ledger is Enabled,
  * an entry\_type column with DEBIT will be created
  * points column will be 50
  * event\_log\_id column will have e1

* In PD  table,
  * an entry will be created with deduction\_type as RETURN
  * points\_deducted column will have 50.
  * event\_log\_id will the id as e1
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)

* **On 7th Feb**,

* In event\_log table
  * new entry will be created with event\_type\_id as 5, with id as e2

* In PA table, For the existing record with DelayedAccrualPointCategory:

  * points\_exclusive column will stay as 100,
  * returned\_exclusive\_column will stay as 50
  * redeemed\_exclusive\_value column will change to 50 points
  * status column will be marked as CONSUMED\_BY\_CONVERSION

  A new record will be created in PA for Main Point Category:

  * points\_exclusive column will have 100
  * returned\_exclusive\_value column will have 50
  * event\_log\_id with id as e2
  * status will be AVAILABLE
  * rest all columns will be copied from the existing record of DelayedAccrualPointCategory

* In CPS table, For the DelayedAccrualPointCategory,

  * current\_points will become x - 50 (x is the current\_points before this event)
  * cumulative\_points won't change
  * points\_returned column will stay as it is
  * points\_redeemed will become x + 50

    For the Main Point Category,
  * current\_points will become x + 50 (x is the current\_points before this event)
  * cumulative\_points column will become x + 100
  * points\_returned column will become x + 50

* If Ledger is enabled, PL table will have an

  For DelayedAccrualPointCategory

  * entry of 50 points with entry\_type as DEBIT (mapped to delayed point category)
  * cps\_id which got affected in the above CPS
  * event\_log\_id with id as e2

  For Main Point Category

  * entry of 50 points with entry\_type as CREDIT
  * cps\_id which got affected in the above CPS (mapped to main point category)
  * event\_log\_id with id as e2

* In PD table, For the existing DelayedAccrualPointsCategory entry

  * deduction\_type column as REDEEMED\_BY\_CONVERSION
  * points\_deducted will be 50
  * event\_log\_id with id as e2
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)

  For the Main Point Category

  * deduction\_type column as RETURN\_HISTORICAL
  * points\_deducted will be 50
  * event\_log\_id with id as e2
  * points\_awarded\_ref\_id will point to the PA\_id which got affected
  * points\_awarded\_ref\_type will be POINTS\_AWARDED (if points were on bill)