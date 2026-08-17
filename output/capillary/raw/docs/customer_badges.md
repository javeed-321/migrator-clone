---
updatedAt: 2026-04-16T21:18:52.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Badges

# What is a badge?

A badge acts like a digital trophy for a customer’s journey. It is a non-monetary asset used to recognize specific actions, milestones, or a customer's relationship status with a brand. Unlike points or coupons that have a cash-equivalent value, badges are visual symbols (icons or images) that appear in a user’s profile. They focus on **emotional loyalty**—using gamification to give customers a sense of pride, identity, and status.

<Callout icon="📘" theme="info">
  **Note**

  By default, Badges UI is not enabled for all the orgs. Raise a ticket to the Capillary Product Support team to enable this feature for your org.
</Callout>

# What does it do?

A badge drives three types of psychological engagement:

1. **Recognize behavior.** It validates actions like joining the program (“New Member”), writing a review (“Reviewer”), or referring a friend (“Referral Champion”).
2. **Build emotional connection.** It taps into a customer’s sense of ownership. A badge encourages users to internalize their identity as a “VIP” or “Brand Advocate.”
3. **Nudge participation.** By visualizing a collection of locked and unlocked achievements, it motivates customers to complete their profiles or increase visit frequency to “collect them all.”

# How does it work?

### **Brand setup**

A marketing manager defines the "Achievement" logic in the system.

* **The Look:** Create or bulk-upload badge icons and define their visual hierarchy (ranking) in the app using the Badges UI.
* **The Trigger:** Link the badge to a specific workflow—like a customer journey, a transactional rule, or a manual “Direct Issue” for event attendees.
* **The Management:** Set up “Retro Earn” logic to account for past data or migrate badges from legacy systems using CSV uploads.

### **Customer experience**

The customer performs an activity, such as making their first purchase or hitting a spend threshold. The system verifies the criteria and instantly triggers a notification: *“You’ve earned the Milestone Maker badge!”* The customer can then view their digital trophy case, see the criteria they met, and even share their achievement on social media.

# How is it different from other promotions

| Promotion type     | How it works                        | The vibe                      |
| ------------------ | ----------------------------------- | ----------------------------- |
| **Badge**          | Visual recognition for milestones.  | “Look what I’ve achieved.”    |
| **Points**         | Currency earned for future use.     | “I’m saving for later.”       |
| **Coupon**         | Requires a code to unlock a deal.   | “I have a code for this.”     |
| **Cart promotion** | Applies automatically at checkout.  | “Nice—the bill just dropped.” |
| **Gift voucher**   | Works like digital cash at payment. | “I’m paying with a balance.”  |

# **Real-world examples**

### **The Onboarding (Welcome)**

A customer registers and immediately sees a “New Member” badge on their profile to provide instant positive reinforcement.

### **The Advocate (Referral)**

A customer refers three friends and unlocks the “Referral Champion” badge, signaling their status as a brand promoter.

### **The VIP (Status)**

A high-spender hits a specific tier and receives a “Gold Elite” badge, which store agents can see in the system to provide priority service.

### **The Persona (Identity)**

A customer who only shops at night receives a “Night Owl” badge, deepening their emotional connection by reflecting their shopping habits.

# **Benefits of Badges**

| Feature                     | Brand Benefits                                                                                                                                     | Customer Benefits                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Gamified Engagement**     | **Non-Liable Loyalty:** Drive repeat behavior without adding financial liability to the balance sheet (no discounts or points).                    | **Status & Identity:** Provides a sense of progression and social standing within the brand community.             |
| **Operational Versatility** | **Multi-Channel Issuance:** Issue badges via automated journeys, bulk CSV uploads, or real-time APIs for external integrations.                    | **Clear Progress:** Clicking a badge reveals exactly what was done to earn it and what benefits it provides.       |
| **Deep Visibility**         | **Audit & Analytics:** Track badge events in real-time. Support teams can view a customer’s full badge timeline via Membercare for better service. | **Social Advocacy:** Easy-to-share achievements that allow customers to show off their loyalty on social channels. |

<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Badges</title>
    <style>
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell;
            line-height: 1.6;
        }

        .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .nav-item {
            padding: 12px 16px;
            border-radius: 8px;
            margin: 8px 0;
            transition: all 0.2s ease;
            background: #D8EDFF;
            border: 1px solid #A8CFEE;
            position: relative;
            overflow: hidden;
        }

        .nav-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: #2466EA;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.15s ease;
        }

        .nav-item:hover {
            background: #BFE0F7;
            transform: translateX(4px);
            border-color: #2466EA;
        }

        .nav-item:hover::before {
            transform: scaleX(1);
        }

        .nav-link {
            text-decoration: none !important;
            display: block;
            font-size: 16px;
            font-weight: 700;
            color: #091E42;
            transition: color 0.15s ease;
        }

        .nav-link:hover {
            color: #2466EA;
        }
    </style>
</head>
<body>
    <ul class="nav-list">
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/introduction-to-badges" class="nav-link">Introduction to Badges</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/type-of-badges" class="nav-link">Type of Badges</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/getting-started-badges" class="nav-link">Getting Started</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/configuration-for-badges" class="nav-link">Configuration for Badges</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/managing-badges" class="nav-link">Managing Badges</a></li>
    </ul>
</body>
</html>
`}</HTMLBlock>

<br />