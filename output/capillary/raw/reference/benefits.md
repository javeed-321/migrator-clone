---
updatedAt: 2026-08-17T05:45:38.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Benefits

Loyalty benefits define rewards and perks that members earn for qualifying activities within a program, such as extra points on a transaction during a customer's birthday month. Each benefit applies to one or more tiers and follows a maker-checker approval workflow before it goes live.

This is a distinct API surface from Benefit Categories, which group benefits for organization.

### What you can do

You can use the Benefits APIs to:

* **Create and update:** Create benefits in `DRAFT` status and update their configuration. Updating a live benefit forks a new draft version so the live benefit stays unchanged until you publish the edit.
* **Retrieve:** List all benefits for a program with pagination and filters, or retrieve a single benefit by ID.
* **Submit for approval:** Submit a `DRAFT` benefit through the maker-checker approval workflow.
* **Approve or reject:** Publish a benefit or send it back to `DRAFT`.
* **Manage status:** Pause, resume, stop, or revoke a benefit across its lifecycle.
* **Duplicate:** Copy an existing benefit as a new `DRAFT`.

### Benefit lifecycle

Benefits follow a maker-checker workflow before they become active:

1. **Create** a benefit, or **duplicate** an existing one. It starts in `DRAFT` status.
2. **Submit for approval**, which transitions the benefit to `PENDING_APPROVAL`.
3. **Approve or reject** the benefit. Approval moves it to `LIVE` (when the start date has passed) or `UPCOMING` (when the start date is in the future). Rejection or revocation returns it to `DRAFT`.
4. **Manage status** of a live benefit by pausing, resuming, or stopping it.

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
        .post { background-color: #2ea44f; color: #ffffff; }
        .put  { background-color: #f7811d; color: #ffffff; }
        .get  { background-color: #007AFF; color: #ffffff; }
        .patch { background-color: #9b59b6; color: #ffffff; }
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
            <a href="/reference/create-benefit" class="nav-link">
                <span>Create Benefit</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/list-all-benefits" class="nav-link">
                <span>List All Benefits</span>
                <span class="badge get">GET</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/get-benefit" class="nav-link">
                <span>Get Benefit</span>
                <span class="badge get">GET</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/update-benefit" class="nav-link">
                <span>Update Benefit</span>
                <span class="badge put">PUT</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/submit-benefit-for-approval" class="nav-link">
                <span>Submit Benefit for Approval</span>
                <span class="badge patch">PATCH</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/approve-or-reject-benefit" class="nav-link">
                <span>Approve or Reject Benefit</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/manage-benefit-status" class="nav-link">
                <span>Manage Benefit Status</span>
                <span class="badge patch">PATCH</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/duplicate-benefit" class="nav-link">
                <span>Duplicate Benefit</span>
                <span class="badge post">POST</span>
            </a>
        </li>
    </ul>
</div>
</body>
</html>
`}</HTMLBlock>