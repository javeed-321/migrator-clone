---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Fixed Window Restriction in Badges

Introducing a dynamic feature designed to empower marketers with enhanced flexibility and control over badge earning restrictions. With this update, you can effortlessly define fixed window limits, catering to brands with retroactive flows and enabling tailored restrictions aligned with their objectives.

* Effortless Configuration: Easily set daily, weekly, or monthly limits, with the system automatically generating cycles for streamlined management of badge earning activities.
* Real-Time Editing: Seamlessly adapt to evolving needs and optimize engagement strategies with the ability to edit restrictions in real-time.

For example, suppose a brand aims to incentivize weekly purchases by offering badges to customers making at least one transaction every seven days. By selecting the fixed window option with a weekly cycle, the brand ensures customers understand when they can earn badges, fostering increased engagement and loyalty.

### Advantages Over Moving Window for Retro Cases:

In retroactive scenarios where badge earning limits need computing from processing dates, the fixed window option offers distinct advantages. Brands can accurately calculate limits based on specific calendar periods, even for events processed retroactively, ensuring consistency and fairness, thereby enhancing customer trust and satisfaction.

**Read more about retro active issual of badges `[here]`(<https://docs.capillarytech.com/docs/retro-enrolment-and-issue-of-badges>).**

# Scenario 1: Upcoming Badge (start date is in future)

1. User added the fixed window for an upcoming badge for individual customer limit: 1 badge can be earned every 3 days. So the fixed window is also upcoming in this case as there is a start date involved. Applies to both create badge and update badge.

<Image align="center" className="border" border={true} src="https://files.readme.io/05aacd1-image.png" />

2. Until this badge is upcoming, user can change the configuration to weeks or months or even change the refresh period to 7 days and the existing configuration will be replaced. So only one fixed window config can exist until the badge is upcoming. Applies to both create badge and update badge as badge is still in upcoming status.

<Image align="center" className="border" border={true} src="https://files.readme.io/04e2e43-image.png" />

# Scenario 2: Live badge

1. User initially added the fixed window for a badge for individual customer limit: 10 badges can be earned every 5 days. So the fixed window is active in this case as the badge is live. Now user updates the fixed window config to 10 badges can be earned every 7 days. So now, in this case, there is an upcoming config and one active config like shown below as the current cycle has to first end and then only a new config can start.

<Image align="center" className="border" border={true} src="https://files.readme.io/38bb523-image.png" />

2. Once the badge is edited, there is a chance user can again go to update the badge. Now in this case if user again updates the fixed window config, then the config which is active will be untouched and remain as is but the config which is in upcoming status will be replaced as this is still upcoming and user wants to change that. Considering the above badge example only, now user updated the config to weekly once and the week starts from Tuesday. After this change, user will see the below config once saved.

<Image align="center" className="border" border={true} src="https://files.readme.io/a64d9d2-image.png" />

<br />
3. Below is an example of the brand updating the durationType to months.

<Image align="center" className="border" border={true} src="https://files.readme.io/b860040-image.png" />

<br />
4. Below is an example of the brand updating the refreshRate from five days to one day.

<Image align="center" className="border" border={true} src="https://files.readme.io/554e4f0-image.png" />

<br />
5. If the brand updates the max earn limit without updating the durationType and refreshRate, it will update the existing configuration accordingly. This is because the update affects only the earn limit and not the cycle.

<Image align="center" src="https://files.readme.io/6354586-image1.png" />

6. Once the upcoming fixed window config changes to active fixed window config, the active fixed window config will change to expired fixed window config.
7. Now, after this also user might come and add a new config for fixed window, in that case, there will be 1 active config, 1 upcoming config and 1 expired config. But this might extend and at all times, there would be only max 1 active, max 1 upcoming and >=1 expired configs.

* Rolling window is moving window
* Fixed window is fixed window
* Fixed constraint is moving window >> overall badge duration

<Image align="center" src="https://files.readme.io/a790245-image2.png" />

# Scenario 3: Expired badge

1. Badge is expired but user tries to add the fixed window restrictions in the badge, it will be added successfully. Here the cycle status is active because this badge is of type issue and earn where issue expiry is never expires and hence the restrictions will run for lifetime and hence there is no end date involved. The only case where end date will not be present in case of fixed window cycles is the case where badge type is issue\_earn and issue expiry is defined as never expires.

<Image align="center" src="https://files.readme.io/b4efc3d-image1.png" />

2. If user tries to update the cycle in an expired badge, then a new upcoming cycle would be created. In case of an expired badge, it is only possible when the badge is of type issue\_earn

<Image align="center" src="https://files.readme.io/fa19e7a-image1.png" />

3. If only max earn limit is changed, then there will be no change in the cycles created, only the limit will be updated
4. If user tries to update the duration type, then also a new cycle will be created.

<Image align="center" src="https://files.readme.io/e21c186-image1.png" />

# API documentation

1. [Create badge](https://docs.capillarytech.com/reference/create-badges-org)
2. [Update badge](https://docs.capillarytech.com/reference/update-badges)
3. [Get badge details by Id](https://docs.capillarytech.com/reference/get-badge-by-id)
4. [Get fixed window details for a badge](https://docs.capillarytech.com/reference/get-fixed-window-details)
5. [Get customer badges](https://docs.capillarytech.com/reference/get-badges-for-customer)
6. [Get individual badge details of a customer](https://docs.capillarytech.com/reference/get-individual-badge-details-of-a-customer)