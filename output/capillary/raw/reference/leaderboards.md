---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Leaderboards

A leaderboard is a high-score list. It ranks participants according to their relative success in comparison to their competitors. Leaderboards in Capillary can be implemented on a milestone (using target value achieved by each user) to encourage participation and enhance gamification.

# Sample use Case

Consider a fitness brand with an existing loyalty program. It rewards participants with points for reaching milestones. In addition, they maintain a leaderboard that ranks participants based on their performance. For example, a person who walks 7,000 steps is rewarded with 100 points, and additional points are given to the participant who walked the most. The leaderboard allows participants to see how they rank against others, such as in the “Most Steps Walked This Week” category. Top rankers can earn extra benefits like free classes or private gym access, motivating and incentivizing them to stay competitive.

<Image align="center" className="border" width="30% " border={true} src="https://files.readme.io/6e3a6a9189b73f8d9d569c040c2d844c8caa1fa45038e9dbfd04df42bcfdb14a-6.png" />

# Prerequisites

* [ ] Enable leaderboards for the organisation.
* [ ] Create a target (milestone).
* [ ] Enable the leaderboard for the milestone or streak

# Getting Started

To get started with leaderboards, first enable them for your organisation, then set up a target milestone to track participants' progress. You can enable leaderboards through the Milestone page settings or via the API, which allows you to rank participants based on their performance.

# Enabling Leaderboard for the Organisation

To enable leaderboards for your organisation, follow these steps:

1. Navigate to settings on the **Milestone** page.
2. Enable leaderboards for the organisation by turning on the toggle beside **Leaderboard for milestones.**

<Image align="center" className="border" width="70% " border={true} src="https://files.readme.io/3eede16807c291a5ea2ba1dfaabedcd3afa8c7374fa07c2636109141659555b0-Screenshot_2024-11-04_at_5.23.15_PM.png" />

# Creating a Target (milestone)

To implement leaderboards for a milestone, [create a milestone](https://docs.capillarytech.com/docs/milestones-new-flow#creating-a-milestone) or edit an existing milestone.

> 📘 Note
>
> As of now, these leaderboards are supported only for default (aka single) targets that are configured as of the 'fixed calendar window type'.
>
> These are not supported for streaks as well.

# Enabling the Leaderboard for a Milestone

A milestone or target is a predefined goal or target that a customer needs to reach to receive certain benefits or rewards as part of a brand's loyalty program.

Refer to the documentation on [Milestones](https://docs.capillarytech.com/docs/milestones-new-flow) for more information.

To enable leaderboard for a milestone using the UI, follow these steps:

1. Navigate to the [milestone configuration page](https://docs.capillarytech.com/docs/milestones-new-flow#accessing-the-milestone-configuration-page) and select the milestone to enable the leaderboard feature.
2. Select **Advanced settings** to open the settings menu.
3. Enable leaderboards for the milestone by turning on the toggle under **Enable tracking of milestone for Leaderboard.**
4. Select **Done** under the **Advanced settings** menu to apply the change.
   1. <Image align="center" className="border" width="60% " border={true} src="https://files.readme.io/c82949f6331440570488cd95d67b361ed1e0b753a97535d36e142e5255fb7b46-Screenshot_2024-11-04_at_12.34.57_PM.png" />
5. Select **Done** under the edit milestone page to save the changes.

> 📘 Notes
>
> * Leaderboard can be enabled for a target using API as well. Add "leaderboardEnabled": true in the request body while making the POST call during the creation of target.
> * There is a 24 hour ETL (Extract, Transform, and Load)  sync delay between enabling the leaderboards feature and data synchronisation.  ETL Sync extracts data from the production database, typically overnight for each cluster. For example, the EU cluster refresh starts at 10:00 p.m. GMT. Data is updated every 24 hours and used for all reporting and analytics on the Capillary platform. If the leaderboard feature is enabled before the 24-hour ETL refresh, the leaderboard data is updated in the next scheduled refresh. If the feature is enabled after a refresh, the leaderboard data will be updated in the following refresh.

# Enabling Additional Fields to a Leaderboard List

Once the leaderboard is enabled on org & milestone level, following are the APIs that can be used by the brands to get the leaderboard information of their customers.

1. Fetching top-N customers: [here](https://docs.capillarytech.com/reference/get-top-ranked-users)
2. Fetching the rank of a customer across target groups: [here](https://docs.capillarytech.com/reference/get-user-ranks-across-target-groups)

By default, the leaderboard response will have standard information like userID, target achieved value by the user, etc... However, if a brand wants to get more information along with the standard available information, that is also possible.

A brand can add a total of up to **three** additional customer fields such as [extended fields](https://docs.capillarytech.com/docs/set-up-fields#extended-fields) and [custom fields](https://docs.capillarytech.com/docs/attributes-custom-field) to a leaderboard.

To enable additional fields, raise a JIRA ticket to the sustenance team.