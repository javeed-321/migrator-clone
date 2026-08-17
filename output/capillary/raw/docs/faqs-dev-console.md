---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

**Q: What happens if I change the selection from the console or web interface?**

* The system automatically synchronises changes between the console and web interfaces.

**Q: How are permissions handled?**

* Permissions are managed via Intouch authorization sheet data, determining access to different modules and actions.

**Q: Can permissions be set for viewing or executing queries?**

* Yes, permissions control whether a user can view queries, execute them, or both.

**Q: How are read and write queries managed?**

* Functions are categorised as read or write. If a query contains at least one function from the write list, it is treated as a write query.

**Q: Is there a limit to query results?**

* Yes, a default limit of 10 is applied if the user does not explicitly set a limit.

**Q: Can system-related queries be executed?**

* Yes, but only predefined functions are validated and executed.

**Q: Are query results saved?**

* No, only execution time and metadata are saved.

**Q: How is the approval process for write queries managed?**

* Write queries require approval through Hotswa. A reference ID is stored for tracking.

**Q: Are there separate APIs for approval and creation?**

* Yes, there are console-specific APIs for approval and creation.

**Q: How are graphs generated?**

* Chart IDs map to queries stored in the system. Data is fetched through APIs and plotted using charting libraries.

**Q: Can users sign up from the dashboard?**

* Yes, user sign-up is supported.

**Q: How does logout work?**

* Logging out from the homepage redirects to Octa, invalidating the session. Implementing single logout ensures Octa sessions are invalidated.

***