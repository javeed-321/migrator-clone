---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# User-Created Challenges

User-created challenges let people set their own goals. Unlike milestones set by brands, this puts users in control. They create challenges for themselves and earn rewards for completing them.

For example, a fitness brand has an app that lets users create personal challenges. For instance, a user might set a goal to drink eight glasses of water every day. They log their water intake in the app. When they reach their goal consistently for a week, they earn points. These points can be used for discounts on fitness gear or healthy snacks. This way, users feel accomplished and get rewarded for taking care of their health.

<Image align="center" className="border" border={true} src="https://files.readme.io/9cf395cc5191799c306a08f9881537f225c6c2bbdc6cf616ebc7df9de572e4ab-UCC_WF_3.png" />

> 📘 Notes
>
> Raise a JIRA ticket to enable user-created challenges for your organisation.

> 🚧 Attention
>
> * Once a user-created target group is created, it cannot be changed to a default target.
> * Currently, a maximum of one Target Rule (expression) can be configured for a user-created target group.
> * The Target Rules created must be of the `enrolmentMethod` `IMPORT` for a user-created target group.

The following table list the APIs that can be used to create and get details of user-created challenges:

| Objective                                       | API                                                                                                                          | Notes                                                                                                                                                                                     |
| :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create behavioral event                         | [Create event](https://docs.capillarytech.com/reference/create-event-custom-be)                                              | Create and publish a new behavioural event or use an existing event.                                                                                                                      |
| Create a user-created target                    | [Create target groups](https://docs.capillarytech.com/reference/create-target-groups)                                        | Create the target for the behavioural event. Set the default values for the target as 2 for `targetType=COUNT`.                                                                           |
| Create a promotion                              | [Create promotion for UCC](https://docs.capillarytech.com/reference/create-promotion-for-ucc)                                | While creating the promotion, set the value of `id` to `-1` under the `promotion`, `rulesetInfos`  and `rules`. This indicates that a new promotion request is being made in the backend. |
| Enroll a user on a user-created target          | [Enroll a user to a milestone or streak](https://docs.capillarytech.com/reference/enrol-customer-to-a-milestone)             | Enrolling a user on a user-created target can be done using the enrol API. Set the `targetGroupId` and `targetID` of the user-created target.                                             |
| Unenroll a user from a user-created target      | [Unenroll a user from a milestone or streak](https://docs.capillarytech.com/reference/un-enrol-users-into-a-milestonestreak) | Enrolling a user on a user-created target can be done using the enrol API. Set the `targetGroupId` and `targetID` of the user-created target.                                             |
| Get all milestones in an organisation           | [Get all milestones](https://docs.capillarytech.com/reference/get-all-milestones)                                            | Set the `includeUserCreatedTargetGroups` parameter in the request body as `true` to get data related to UCC.                                                                              |
| Get promotion data                              | [Get Promotion Data](https://docs.capillarytech.com/reference/get-promotion-data-new)                                        | Set the `sourceType` as `USER_CREATED`to filter filter promotions created for UCC.                                                                                                        |
| Get all user-created target groups              | [Get target groups based on ID](https://docs.capillarytech.com/reference/get-target-groups-id)                               | Set the `includeUserCreatedTargetGroups` parameter in the request body as `true` to get data related to UCC.                                                                              |
| Get user created target groups by tracking type | [Get all milestones](https://docs.capillarytech.com/reference/get-all-milestones)                                            | Set the `includeUserCreatedTargetGroups` parameter in the request body as `true` to get data related to UCC.                                                                              |
| Get all active targets of a customer            | [Get active targets](https://docs.capillarytech.com/reference/get-active-targets)                                            | Set the `includeUserCreatedTargetGroups` parameter in the request body as `true` to get data related to UCC.                                                                              |