---
updatedAt: 2026-08-17T05:46:32.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Subscriptions

Subscription programs let members opt into a supplementary loyalty program with its own duration, points exchange ratio, and benefits — separate from the base program. Each subscription program follows a maker-checker approval workflow before it goes live.

> **Note:** `/v3/subscriptions` is the primary API surface for creating and managing subscription programs (formerly called "Partner Programs"). It's a different, newer API from the legacy Partner Program customer link and delink APIs, which remain in use for enrolling individual customers into an already-published subscription program. This section covers only `/v3/subscriptions`.

### What you can do

You can use the Subscriptions APIs to:

* **Create and update:** Create a subscription program in `DRAFT` status and update its configuration. Updating a `LIVE` subscription program forks a new draft version so the live program stays unchanged until the change is approved.
* **Retrieve:** List all subscription programs for a loyalty program with pagination, or retrieve a single subscription program by ID and status.
* **Manage the approval workflow:** Submit a `DRAFT` for approval, withdraw a submission, or approve or reject a submission that's `PENDING_APPROVAL`.
* **Pause and resume the program:** Pause a `LIVE` subscription program and resume it later, separate from the customer-level pause covered under [Pause Subscription](https://docs.capillarytech.com/reference/pause-subscription).
* **Discard a draft:** Permanently remove a `DRAFT` that was never published.
* **Link and unlink benefits:** Attach or remove a benefit from a subscription program directly by ID.

### Subscription lifecycle

Subscription programs move through a maker-checker workflow before they go live:

1. **Create** a subscription program. It is created in `DRAFT` status.
2. **Submit for approval:** [Update Subscription Status](https://docs.capillarytech.com/reference/update-subscription-status) with `action: SUBMIT_FOR_APPROVAL` transitions the program to `PENDING_APPROVAL`.
3. **Approve or reject:** [Approve Subscription](https://docs.capillarytech.com/reference/approve-subscription) either publishes the program to `LIVE`, or sends it back to `DRAFT` with the reviewer's comment attached.
4. **Withdraw:** while a submission is still `PENDING_APPROVAL`, the maker can call [Update Subscription Status](https://docs.capillarytech.com/reference/update-subscription-status) with `action: REVOKE` to pull it back to `DRAFT` without waiting on a reviewer.
5. **Pause and resume:** a `LIVE` program can be paused and resumed with `action: PAUSE` and `action: RESUME` on the same endpoint.
6. **Stop:** `action: STOP` ends a `LIVE` program.

Filter with `status=ACTIVE` to list published programs; each returned record reports its lifecycle status as `LIVE`.

Once a `DRAFT` is no longer needed, delete it with [Discard Subscription](https://docs.capillarytech.com/reference/discard-subscription). Only `DRAFT` subscriptions can be discarded.

<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .api-sidebar-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: inherit;
            padding: 10px;
            max-width: 100%;
        }
        .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .nav-item {
            margin-bottom: 8px;
            border-radius: 8px;
            transition: all 0.25s ease;
            border: 1px solid rgba(128, 128, 128, 0.2);
            background-color: rgba(128, 128, 128, 0.05);
            overflow: hidden;
        }
        .nav-item:hover {
            background-color: rgba(0, 66, 154, 0.1);
            transform: translateX(4px);
            border-color: #007AFF;
        }
        .nav-link {
            text-decoration: none !important;
            border-bottom: none !important;
            color: inherit !important;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 14px;
            font-size: 14px;
            font-weight: 500;
        }
        .badge {
            font-size: 10px;
            font-weight: 800;
            padding: 2px 8px;
            border-radius: 4px;
            min-width: 42px;
            text-align: center;
            text-transform: uppercase;
            flex-shrink: 0;
            opacity: 0.85;
        }
        .post  { background-color: #2ea44f; color: #ffffff; }
        .put   { background-color: #f7811d; color: #ffffff; }
        .get   { background-color: #007AFF; color: #ffffff; }
        .patch { background-color: #6f42c1; color: #ffffff; }
        .delete { background-color: #e53e3e; color: #ffffff; }
        .nav-item:hover .badge {
            opacity: 1;
            box-shadow: 0 0 10px rgba(0, 122, 255, 0.4);
        }
        .nav-item:hover .nav-link {
            color: #007AFF !important;
        }
    </style>
</head>
<body>
<div class="api-sidebar-container">
    <ul class="nav-list">
        <li class="nav-item">
            <a href="/reference/create-subscription" class="nav-link">
                <span>Create Subscription</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/list-subscriptions" class="nav-link">
                <span>List All Subscriptions</span>
                <span class="badge get">GET</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/get-subscription" class="nav-link">
                <span>Get Subscription</span>
                <span class="badge get">GET</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/update-subscription" class="nav-link">
                <span>Update Subscription</span>
                <span class="badge put">PUT</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/pause-subscription" class="nav-link">
                <span>Pause Subscription</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/resume-subscription" class="nav-link">
                <span>Resume Subscription</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/update-subscription-status" class="nav-link">
                <span>Update Subscription Status</span>
                <span class="badge patch">PATCH</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/approve-subscription" class="nav-link">
                <span>Approve Subscription</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/discard-subscription" class="nav-link">
                <span>Discard Subscription</span>
                <span class="badge delete">DELETE</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/link-benefit-to-subscription" class="nav-link">
                <span>Link Benefit to Subscription</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/unlink-benefit-from-subscription" class="nav-link">
                <span>Unlink Benefit from Subscription</span>
                <span class="badge delete">DELETE</span>
            </a>
        </li>
    </ul>
</div>
</body>
</html>
`}</HTMLBlock>