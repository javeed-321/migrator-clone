---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Target/Milestone

# Basic introduction

This section contains APIs for various capabilities powered by "targets" in the system. The following are the capabilities that are currently being powered by targets:

1. **Milestones**
   1. Single milestone: Contains only 1 target
   2. Unified milestone: Contains more than 1 target & they are linked together with arithmetic operations like:
      1. ALL: Works similar to AND
      2. ANY (N-1): Words identical to OR
2. **Streaks**
3. **Cappings** (Individual customer type of capping)
4. **User-created challenges**
   1. These are similar to single milestones but can be created by the end-user directly from the mobile app instead of the brand creating them via CRM for their end-users. In this case, the word 'challenge' is analogous to 'milestone'.

# Good to know information:

To know how the target (and its downstream capabilities) works, it is advised to know about the following nuances for better & enhanced understanding. Following are the 4 major components involved here:

1. **Target group**
   1. This is like a container (or a bowl) that can hold one/more target rules in it.
   2. This will have core properties associated with it like:
      1. Tracking type: Defines what is the nature of the tracking
         1. Single
         2. Unified
         3. Streak
         4. Capping
      2. Start & End date on a whole
      3. Frequency
      4. The number of periods/cycles, etc...
2. **Periods/Cycle**
   1. This will have information on the timelines within which the tracking will happen.
      1. Will have the exact start & end date for each cycle of the target group.
   2. If the frequency & number of cycles are given as weekly, 3 in the target group level info, then this contains what is the exact start & end date for all the 3 cycles:
      1. 1st cycle: Start date (point a) - End date (point b)
      2. 2nd cycle: Start date (point b)  - End date (point c)
      3. 3rd cycle: Start date (point c) - End date (point d)
   3. A few points to note here are:
      1. The start date given in the target group (point x) should always be <=  1st cycle's start date (point a)
      2. The end date given in the target group (point y) should always be >= Last cycle's end date (point d)
      3. No tracking will happen between point (x, a) & point (d, y). Tracking will always happen within cycles.
      4. <Image align="center" className="border" width="70% " border={true} src="https://files.readme.io/34ca65052a646b4a5190e7aae8bc23e2ed9a0350b3ed97a72020d1030026cb9f-Screenshot_2024-11-04_at_11.32.00_AM.png" />
3. **Target rule (some call this as the target itself)**

   1. This contains information on what to track exactly
      1. KPI to be tracked
      2. Target value
      3. Filters, etc...
   2. Depending on the tracking type of target group, a single target group can have 1 target or multiple targets

      1. | Capability              | How many target groups | How many target rules |
         | :---------------------- | :--------------------- | :-------------------- |
         | Single milestone        | 1                      | 1                     |
         | Unified milestone       | 1                      | more than 1           |
         | Streak                  | 1                      | 1                     |
         | Capping                 | 1                      | 1                     |
         | User-created challenges | 1                      | 1                     |

         <br />
      2. No matter how many target rules are present in a target group, all of them will have the same period/cycle information. For instance, even though more than 1 target is present in unified target milestones, all the targets are tracked in similar timelines.

         1. This means that, period/cycle is associated with 'target group' but not 'target rule'.
4. **Streak**
   1. When the tracking type is mentioned as 'streak' in the target group info, then this extra information will also need to be added to the payload.
   2. This essentially contains information on how many continuous/non-continuous periods the user has to achieve to get the rewards.