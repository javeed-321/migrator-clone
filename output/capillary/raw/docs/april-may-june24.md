---
updatedAt: 2026-03-04T06:05:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# April-May-June 2024

# Loyalty+

## Ability to create milestones/streaks in the past

As of today, one can create a milestone/streak only from the current date. However, with this enhancement, now users will be able to create a milestone/streak in the past as well.

This helps brands in creating backdated promotions of milestones/streaks type unlocking new avenues. 

**More details here:**`[Milestones]`(<https://docs.capillarytech.com/docs/milestones-new-flow#milestone-details>) & `[Streaks]`(<https://docs.capillarytech.com/docs/configure-streaks#basic-details>)

## Expiry conditions based on extended fields

After seeing several point-expiry-based use cases in the market (where few of them do not fall under any of our existing expiry strategies), we have built this new capability where the expiry date can be sent via an extended field.

Brands can send whatever date as per whatever logic they want, and the expiry will happen accordingly.

**More details here:**[Click here](https://docs.capillarytech.com/docs/points-1-1#expiry-conditions)

## Enrol/Unenrol API for milestones/streaks

With this brand-new API, now customers can be enrolled/unenrolled into a milestone/streak via APIs without depending on the UI. So, brands would be able to enroll/unenroll their users into a milestone/streak whenever they want (at the beginning, in the middle of the duration, etc.) as per their use case in an easy manner. 

**More details here:**[Click here](https://docs.capillarytech.com/reference/enrol-customer-to-a-milestone)

## Import profile to update customer's slab expiry date

We have enhanced the slab-related import profile where you can explicitly override the slab expiry dates of several customers in a single shot.

This slab expiry date will override the existing expiry date of the customer, and this can be very helpful to brands in a bunch of user scenarios.

**More details here:**[Click here](https://docs.capillarytech.com/docs/points-slabs#slab)

## Breaking the shackles of trackers, and letting them be used anywhere in loyalty.

Until now, once a tracker is created, it has life only inside the tracker/points-tracker set of workflows. Now, we have added support for the following profiles using which the tracker value of a customer can be fetched in any set of the workflows, and can be used even in the promotions. Yes, that's right, now trackers can be used in the promotions as well using the following profiles.

* currentCustomer.trackerValueBeforeEvent("Tracker name", "Case name")
* currentCustomer.trackerValueCurrentEvent("Tracker name", "Case name")

To know more details: `[here]`(<https://docs.capillarytech.com/docs/avgbasket-size#attributes---tracker-based>)

## Giving more boost to Milestones/Streaks to be used in any customer activity.

Once a milestone/streak is created, the customer's achievement (and corresponding reward allocation) can be done only via the "milestone or streak is updated (aka target-period elapsed)" customer activity so far. To solve this problem, a bundle of new profiles is created that can be used in any customer activity & access the customer's current milestone/streak status. For example:

* currentCustomer.targetAchievedInPeriod("targetName", "periodName") brings the value achieved by the customer in a specific period of a specific target.
* and many more

To know more details: `[here]`(<https://docs.capillarytech.com/docs/avgbasket-size#attribute---milestones--streaks>)

## Promised points conversion based on behavioral event's attribute

A brand new delayed-accrual strategy support is added for behavioral events, using which the promised points can be converted to regular points based on the attribute of the behavioral event. This can unlock many customized use cases, and here is one example:

* Deadpool wants to gift 1000 points to Wolverine on the latter's birthday. But being him, the former is not sure if he can remember that so looking for a solution:
* After this enhancement, Deadpool can simply purchase the points in the promised state (with the DOB of Wolverine as the value of the attribute) & that's it. Now, these promised points will be converted to regular points on the given date.  

To know more details: [here: go to the 7th point (delay strategies)](https://docs.capillarytech.com/docs/actions#transaction-point-allocation--allocate-points-action)

## Enhancements in alternate currencies

Now, the alternate currencies become more powerful with the following enhancements:

* Support for return & return re-evaluation: `[here]`(<https://docs.capillarytech.com/docs/alternate-currencies>)
* Event notifications: `[here]`(<https://docs.capillarytech.com/docs/event-schema-payload#alternate-currencies>)
* Source onboarding of alternate currencies tables

## Enhancements in Milestones/Streaks

Now, the streaks become much more powerful with the following enhancement:

* Sub-targets in streaks: `[here]`(<https://docs.capillarytech.com/docs/configure-streaks#sub-targets-in-streaks>)
* Event notifications: `[here]`(<https://docs.capillarytech.com/docs/event-schema-payload#streak-level-achievement>)
* 3 time-dimensional tracking in Milestones/Streaks: `[here]`(<https://docs.capillarytech.com/docs/milestones-new-flow#target-details>)
  1. After this enhancement, now milestones/streaks can be used to track across 3 time dimensions parallelly unlocking some of the difficult use cases in the market. For example:\
     **Use case 1:** Drink apple juice 1 time a day, 4 times a week, 10 weeks a quarter.
     **Use case 2:** Walk 5k steps a day, 6 days a week, 11 weeks a quarter.
* Individual target benefits allocation in unified targets: `[here]`(<https://docs.capillarytech.com/docs/unified-milestones#creating-a-unified-target>)

## API Enhancements

Following are some of the major API enhancements made to help brands use them more flexibly:

* API to enrol/un-enrol/re-enrol users into a milestone/streak: `[here]`(<https://docs.capillarytech.com/reference/enrol-customer-to-a-milestone>) & `[here]`(<https://docs.capillarytech.com/reference/un-enrol-users-into-a-milestonestreak>)
* Enhancements in getUserTargets: `[here]`(<https://docs.capillarytech.com/reference/getusertargetgroupdetails>)

1. A new query param to bring only the active targets
2. Availability of achievement date in the getUserTargets for milestones & streaks
3. Timestamp along with the date for each cycle 
4. Returning all streak-levels information

# Incentives

<span style={{fontSize: "26pt"}}>Coupons</span>

<span style={{color: "#434343", fontSize: "13.999999999999998pt"}}>Bulk Coupon Redeem API Enhancement</span>

<p><strong><span style={{fontSize: "11pt"}}>What’s New</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><span style={{fontSize: "11pt"}}>The Bulk Coupon Redeem API now supports redeeming 100 coupons in one API call, up from the previous limit of 20.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Problem Solved</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><span style={{fontSize: "11pt"}}>Users faced delays and inefficiencies when redeeming large number of coupon codes because the API only supported 20 coupon codes per call, necessitating a middle layer to call the API repeatedly.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Benefits</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><span style={{fontSize: "11pt"}}>Faster Redemptions: Reduced response times for bulk redemptions.</span></p>

<p><span style={{fontSize: "11pt"}}>Improved Experience: Smoother and quicker reward processing for end users.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Refer to the API documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt"}}>here</span></strong><strong><span style={{fontSize: "11pt"}}>.</span></strong></p>

<span style={{fontSize: "26pt"}}>Rewards Catalog</span>

<span style={{color: "#434343", fontSize: "13.999999999999998pt"}}>Reward Management: Fulfilment Status and Transaction Custom Fields </span>

<p><strong><span style={{fontSize: "11pt"}}>What’s New</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Fulfilment status</span></strong><span style={{fontSize: "11pt"}}>: Track reward fulfillment status (e.g., received, in-progress, denied, completed).</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Custom Fields</span></strong><span style={{fontSize: "11pt"}}>: Add up to 10 custom fields for additional metadata related to reward issuance.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>How It Helps</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Improved Tracking</span></strong><span style={{fontSize: "11pt"}}>: Streamline the management of reward statuses and additional details.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Enhanced Experience</span></strong><span style={{fontSize: "11pt"}}>: Provides real-time updates and clearer information for better customer interactions.</span></p>

<p><span style={{fontSize: "11pt"}}>When Jamie redeems his reward, the brand uses custom fields to provide details like delivery address and order ID. Additionally, real-time tracking of reward status—such as "in-progress" or "completed"—keeps Jamie informed about his reward’s journey, ensuring he always knows exactly what’s happening with his redemption.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Refer to the documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt"}}>here</span></strong><strong><span style={{fontSize: "11pt"}}>. </span></strong></p>

<span style={{color: "#434343", fontSize: "13.999999999999998pt"}}>Multiple Payment Options for Rewards</span>

<p><strong><span style={{fontSize: "11pt"}}>What’s New</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Choice of Payments</span></strong><span style={{fontSize: "11pt"}}>: Rewards can be redeemed using different combinations of points and cash. For example, a reward can be obtained with 400 points OR 200 points + $2 OR 300 points + $1 OR $4.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>How It Helps</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Flexible Redemption</span></strong><span style={{fontSize: "11pt"}}>: Users have more options for redeeming rewards, making it easier to use their preferred payment method.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Enhanced Experience</span></strong><span style={{fontSize: "11pt"}}>: Provides varied redemption choices to suit different preferences.</span></p>

<p style={{textAlign: "center"}}>
  <span style={{fontSize: "11pt"}}>
    <span style={{border: "none"}} />
  </span>
</p>

<p>
  <br />
</p>

<p><span style={{fontSize: "11pt"}}>Sophia wants to redeem a reward but only has 200 points and $2. With the new flexible payment options, she can use her points and cash together, making it easy to get her desired reward without needing to save up more points. This versatility enhances her overall redemption experience.</span></p>

<p>
  <br />
</p>

<p><strong><span style={{fontSize: "11pt"}}>Refer to the documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt"}}>here</span></strong></p>

<span style={{color: "#434343", fontSize: "13.999999999999998pt"}}>Adding support for various content types</span>

<p><strong><span style={{fontSize: "11pt"}}>What’s New</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>New Reward Types</span></strong><span style={{fontSize: "11pt"}}>: Introducing Gift Card, Physical Reward, Auction, Sweepstakes, Cashback, Charity, Voucher, Miles, Cash Wallet, Card-Linked Offer, Games as reward types to streamline the redemption journeys for the end user.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Flexible Payment Methods</span></strong><span style={{fontSize: "11pt"}}>: Redeem rewards using points, cash, or a combination of both for the above reward types.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>How It Helps</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Enhanced Engagement</span></strong><span style={{fontSize: "11pt"}}>: Offers diverse ways to redeem rewards, boosting user interaction and making the interface interactive for the users.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Simplified Navigation:</span></strong><span style={{fontSize: "11pt"}}> Access and manage new reward types seamlessly, improving overall user experience and satisfaction.</span></p>

<strong>
  <span style={{fontSize: "13pt"}}>
    <span style={{border: "none"}} />
  </span>
</strong>

<p>
  <br />
</p>

<p><span style={{fontSize: "11pt"}}>Alex wants to get 1,000 miles towards his next flight. With the new system, he can easily convert his points to miles based on the set conversion ratio, providing a flexible and personalized redemption experience.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Refer to the documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt"}}>here</span></strong><strong><span style={{fontSize: "11pt"}}>.</span></strong></p>

<span style={{color: "#434343", fontSize: "13.999999999999998pt"}}>Advanced Point Redemption Controls for the Catalog</span>

<p><strong><span style={{fontSize: "11pt"}}>What’s New</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Enhanced Control</span></strong><span style={{fontSize: "11pt"}}>: Marketing managers can now set limits on points redemption in the rewards catalog based on Program, Tier, Label, Supplementary Program, and Segments.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Customizable Time Frames</span></strong><span style={{fontSize: "11pt"}}>: Define redemption limits with flexible time dimensions including daily, weekly, and monthly limits, or apply overall limits without specific time frames.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>How It Helps</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Optimized Redemption</span></strong><span style={{fontSize: "11pt"}}>: Prevents over-redemption by enforcing tailored restrictions, ensuring points are used efficiently.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Increased Business</span></strong><span style={{fontSize: "11pt"}}>: Encourages customers to use points during transactions, boosting overall business for brands.</span></p>

<p><span style={{fontSize: "11pt"}}>Jane, a Gold-tier member of the Skymiles program, enjoys exclusive access to higher point redemption limits in the rewards catalog, allowing her to redeem up to 5,000 points monthly, while base-tier members have more modest limits, ensuring tailored engagement across loyalty tiers.</span></p>

<p style={{textAlign: "center"}}>
  <span style={{fontSize: "11pt"}}>
    <span style={{border: "none"}} />
  </span>
</p>

<p><strong><span style={{fontSize: "11pt"}}>Refer to the documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt"}}>here</span></strong><strong><span style={{fontSize: "11pt"}}>.</span></strong></p>

<span style={{color: "#434343", fontSize: "13.999999999999998pt"}}>Segment-Based Personalization for Rewards</span>

<p><strong><span style={{fontSize: "11pt"}}>What’s New</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Segment-Specific Rewards:</span></strong><span style={{fontSize: "11pt"}}> Brands can now create and display rewards based on customer segments, in addition to loyalty program tiers and supplementary programs.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>How It Helps</span></strong><span style={{fontSize: "11pt"}}>:</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Personalized Experience:</span></strong><span style={{fontSize: "11pt"}}> Offers tailored rewards to specific customer segments, increasing relevance and engagement.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Streamlined Catalog:</span></strong><span style={{fontSize: "11pt"}}> Reduces clutter by showing only relevant rewards, enhancing user experience.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Better ROI:</span></strong><span style={{fontSize: "11pt"}}> Focuses marketing efforts on targeted segments for improved results.</span></p>

<p><span style={{fontSize: "11pt"}}>Sarah is part of the "Premium Shoppers" segment. When she browses the rewards catalog, she only sees rewards curated specifically for "Premium Shoppers," ensuring a personalized and relevant experience.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Refer to the documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt"}}>here</span></strong><strong><span style={{fontSize: "11pt"}}>.</span></strong></p>

<span style={{color: "#434343", fontSize: "13.999999999999998pt"}}>Enhanced Reward Groups Management</span>

<p><strong><span style={{fontSize: "11pt"}}>What’s New:</span></strong></p>

<p><span style={{fontSize: "11pt"}}>Multiple Group Tagging: You can now link a single reward to multiple groups and define its rank within each group.</span></p>

<p><span style={{fontSize: "11pt"}}>Rank Management: Set individual ranks for rewards within groups without affecting global sorting.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>How It Helps:</span></strong></p>

<p><span style={{fontSize: "11pt"}}>Flexible Catalog Management: Brands can now feature rewards across different groups with specific ranks, enhancing visibility and customization.</span></p>

<p><span style={{fontSize: "11pt"}}>Improved User Experience: Users see rewards sorted by group-specific rank or default order, ensuring relevant rewards are prioritized.</span></p>

<p>
  <span style={{fontSize: "11pt"}}>
    <span style={{border: "none"}} />
  </span>
</p>

<p><span style={{fontSize: "11pt"}}>A marketing manager can now tag a reward to both the “Recommended Products” group and “Home & Kitchen” group, setting distinct ranks for each. When users view rewards in the “Recommended Products” group, they see the reward at rank 1, while the “Home & Kitchen” group shows the same reward at rank 2, improving targeted visibility and relevance.</span></p>

<p><strong><span style={{fontSize: "11pt"}}>Refer to the documentation </span></strong><strong><span style={{color: "#1155cc", fontSize: "11pt"}}>here</span></strong></p>

# Engage+

## Journeys Reporting

You can now view block-level KPIs on the Journeys canvas as shown below:

<Image align="center" className="border" border={true} src="https://files.readme.io/b420fb080c5a7cf83b8dc245f524ce16a90e60453a73019186c6857a49d40ed4-image.png" />

Some of the KPIs that you can see on the Journeys canvas include:

Customer measures such as number of individuals who entered a block, who are waiting in a block and so on.

Channel-level measures such as messages sent, delivered, opened and clicked.

Incentives-related measures such as redemptions and issuals.

Please note this feature needs to be enabled by raising a ticket to sustenance for the time being. We will be making this available for all organizations by default by next quarter. For documentation, please go `[here]`(<https://docs.capillarytech.com/docs/block-level-report-of-journeys>).

## Partner Program Linked Event in Journeys

We have added the partner program linked event to support customer journeys based on association with a subscription loyalty program. You can now use the event as the entry user event for a customer journey, in exit blocks and event-based wait blocks.

# Insights+

## Automated Onboarding of Behavioral Events:

Until recently, new behavioural events required onboarding by the Sustenance team before you could create funnel charts, export data, or build audience groups based on the filters created by an analyst. With this enhancement, behavioural events created in the CDP would be onboarded automatically into the Insights database when the data is pushed into the behavioural event, eliminating the need for the Sustenance team while allowing you to perform the same functions as before.\
For more information, please refer to the documentation `[here]`(<https://docs.capillarytech.com/docs/setup-test-behavioral-events#reporting>).

## Reporting on Platform Extensions:

Currently, platform extensions allow you to extend the platform’s capabilities and store additional data. However, until now, reporting on this data through the extensions was not possible.  As a part of this enhancement we have built a functionality that syncs this data with the ETL runs in the Insights Database on a daily basis, enabling comprehensive reporting.\
For more information, please refer to the documentation `[here]`(<https://docs.capillarytech.com/docs/extension#reporting-on-extension-data>).

# Capillary Data Platform (CDP)

## Behavioural Events Lookup API

We have introduced a new API to look up behavioural events and filter using one or more query parameters including event name, customer identifiers, group identifiers (if the event is a user group behavioural event), date range and even the value of attributes of events. For more details on this powerful API, please go `[here]`(<https://docs.capillarytech.com/reference/search-events>).

## Till Custom Fields

We have introduced custom field support for the till entity. In case you want to capture additional information against a till, you can use custom fields for that purpose. However, please remember that you cannot act on data in custom fields on any of our downstream products. Please go `[here]`(<https://docs.capillarytech.com/reference/add-till-with-new-custom-fields>) for more details on how to add custom fields against a till.

## Bulk Transaction Update API

You can now update transaction-level custom fields and extended fields and also line-level extended fields (there are no custom fields supported at the line level for now) in bulk using a new [transaction update bulk](https://docs.capillarytech.com/reference/update-transaction-bulk) API. Please read the FAQ section in the document to understand what the API can and cannot do.

## Update Permissions of Members in a User Group

Another update API - Permissions related to what a member of a user group (v2) can do can now be updated using our new [permissions update API](https://docs.capillarytech.com/reference/update-user-group-permission).

## UI extensions on the Capillary platform (Vulcan Framework)

A brief about Vulcan Framework

Vulcan is a react-based UI framework using which you can create customized UI screens & embed them on Capillary platform. As of now, you can use it to create any react-based UI application behind intouch authentication and embed it on Membercare. Long-term vision is that you would be able to create any UI application & embed it in any intouch module apart from creating external applications.

Overall, we seek to replace our Sharingan framework which was based on PHP tech-stack with this new framework. However, it’s not just the tech-stack upgrade that we get as a part of Vulcan; it is more secure & integrates seamlessly with our Intouch UI. From these UI extension applications, you can access any Capillary API (Intouch APIs, Node APIs, API Extensions based APIs) and UI design elements out of the box.

To know more on how you can create a new application, host it on the Capillary platform & embed it in Intouch UI, check out the documentation on UI extensions `[here]`(<https://docs.capillarytech.com/reference/ui-extension>).

**Member care Customizations using Vulcan**

Over the past few quarters, we have been receiving a number of customization requests on Membercare. These customizations range from very basic ones like removing a widget from a screen to very complex ones like changing the search functionality/ redoing the layout of Membercare.

To cater to these requests, we have created a Vulcan replica of our existing Member Care product (yes, Vulcan is that powerful!) & are making it available on the platform.\
For now, we are suggesting that if a brand has a huge list of customization requests - you can download the Vulcan replica of Membercare & edit it to suit the brand’s requirements.

However, if there are very few customization requirements - as of now, we would refrain from using the Vulcan replica of Membercare - owing to a few ongoing internal decisions.

Check out how you can completely customize a [brand’s Membercare experience here](https://docs.capillarytech.com/reference/customizing-the-member-care-ui).

# Neo Extension

The Neo Extensions platform is a low-code alternative to the Classic extension platform. With Neo, you can create workflows for the entire development process using an intuitive drag-and-drop interface. This approach simplifies development and allows you to focus on core tasks while worrying less about setting up connections, libraries, and other technical details. The workflows built using the drag-and-drop blocks are called dataflows in Neo and the drag-and-drop blocks are called the building blocks. Neo is the default extension platform and is always recommended. Fore more information, refer to the doc <Anchor label="here" target="_blank" href="https://docs.capillarytech.com/docs/overview-neo#/neo-extension-extension-20">here</Anchor>.