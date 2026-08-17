---
updatedAt: 2026-08-17T05:47:20.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Tiers

Tiers define the loyalty levels (slabs) within a program — such as Silver, Gold, and Platinum — and the upgrade and downgrade conditions that move members between them.

### What you can do

You can use the Tiers APIs to:

* **Create and update:** Create tiers in DRAFT status and update their configuration before publishing.
* **Retrieve:** Fetch all tiers for a program or retrieve a specific tier by ID.
* **Delete:** Soft-delete a DRAFT tier that has not yet been approved.
* **Submit for approval:** Submit a DRAFT tier through the maker-checker approval workflow.
* **Approve or reject:** Approve or reject a tier that is pending approval.
* **List approvals:** Retrieve all tiers currently awaiting approval for a program.

### Tier lifecycle

Tiers follow a maker-checker workflow before they become active:

1. **Create** a tier — it is created in `DRAFT` status.
2. **Submit for approval** — transitions the tier to `PENDING_APPROVAL`.
3. **Approve or reject** — an approver either moves the tier to `ACTIVE` or sends it back to `DRAFT`.

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
            <a href="/reference/create-tier" class="nav-link">
                <span>Create Tier</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/list-all-tiers" class="nav-link">
                <span>List All Tiers</span>
                <span class="badge get">GET</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/get-tier" class="nav-link">
                <span>Get Tier</span>
                <span class="badge get">GET</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/update-tier" class="nav-link">
                <span>Update Tier</span>
                <span class="badge put">PUT</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/delete-tier" class="nav-link">
                <span>Delete Tier</span>
                <span class="badge delete">DELETE</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/submit-tier-for-approval" class="nav-link">
                <span>Submit Tier for Approval</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/approve-or-reject-tier" class="nav-link">
                <span>Approve or Reject Tier</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/list-pending-tier-approvals" class="nav-link">
                <span>List Pending Tier Approvals</span>
                <span class="badge get">GET</span>
            </a>
        </li>
    </ul>
</div>
</body>
</html>
`}</HTMLBlock>