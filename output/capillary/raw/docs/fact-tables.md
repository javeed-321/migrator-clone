---
updatedAt: 2026-04-01T12:52:28.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Fact tables

Fact and dimension tables form the foundation for all reporting conducted within Insights+.

Fact tables contain quantitative data, typically numerical values that represent the measurements or metrics of a business process. For instance, in a sales environment, a fact table might record each sale transaction, with columns representing details such as transaction ID, sale amount, product ID, and date of sale. Each row in the fact table corresponds to a unique event or transaction and often references multiple dimension tables, which provide context to the facts.

> 📘 Note
>
> By default, fact tables are not onboarded for all organisations. To enable them, raise a JIRA ticket with the Capillary Product Support team.

**Below is the list of frequently used fact tables**

<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fact tables</title>
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
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/badges-fact-table" class="nav-link">Badges</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/bill-line-items-fact-table" class="nav-link">Bill Line Items</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/call-task-customer-status-fact-table" class="nav-link">Call Task Customer Status</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/communication-credits-log-fact-table" class="nav-link">Communication Credits Log</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/contact-info-fact-table" class="nav-link">Contact Info</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/coupons-fact-table" class="nav-link">Coupons</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/custom-field-data-fact-table" class="nav-link">Custom Field Data</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/customer-merge-log-fact-table" class="nav-link">Customer Merge Log</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/customer-notes-fact-table" class="nav-link">Customer Notes</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/customer-summary-members-fact-table" class="nav-link">Customer Summary (members)</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/daily-till-summary-fact-table" class="nav-link">Daily Till Summary</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/email-click-stats-fact-table" class="nav-link">Email Click Stats</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/fact_milestones" class="nav-link">Milestones</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/fact_registration-event" class="nav-link">Registration Event</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/fact_streaks" class="nav-link">Streaks</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/goodwill-requests-fact-table" class="nav-link">Goodwill Requests</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/invitation-sent-fact-table" class="nav-link">Invitation Sent</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/issue-tracker-fact-table" class="nav-link">Issue Tracker</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/journeys-fact-table" class="nav-link">Journeys</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/nsadmin-messages-fact-table" class="nav-link">Nsadmin Messages</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/payment-details-fact" class="nav-link">Payment Details</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/points-fact-table" class="nav-link">Points</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/profile-users-fact-table" class="nav-link">Profile Users</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/referrals-fact-table" class="nav-link">Referrals</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/referrers-fact-table" class="nav-link">Referrers</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/response-info-fact-table" class="nav-link">Response Info</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/return-bill-line-item-fact-table" class="nav-link">Return Bill Line Item</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/rewards-fact-table" class="nav-link">Rewards</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/slab-change-log-fact-table" class="nav-link">Slab Change Log</a></li>
    </ul>
</body>
</html>
`}</HTMLBlock>