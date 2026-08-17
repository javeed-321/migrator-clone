---
updatedAt: 2026-08-17T05:46:10.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Loyalty Config Attributes

Loyalty config attributes let your org define custom metadata fields for subscription programs and benefits, then enforce them at write time. Define an attribute once for a program and scope, and every subsequent create or update against that scope is validated against it. An unrecognized key is rejected, values are type-checked, and mandatory attributes must be present.

> **Note:** The legacy Partner Program [Link Customer](https://docs.capillarytech.com/reference/link-customer-to-partner-program) and [Delink Customer](https://docs.capillarytech.com/reference/delink-customer) APIs also support config attributes, using the field name `name` instead of `key` in their request and response payloads. Both surfaces enforce config attributes defined through the APIs on this page; only the wire field name differs by endpoint.

### What you can do

You can use the Loyalty Config Attributes APIs to:

* **Create:** Define a new config attribute for a program under a specific scope, with a data type, an optional default value, and whether it's mandatory.
* **Retrieve:** List all config attributes defined for a program, optionally filtered by scope, or list the scopes available on your org.
* **Update:** Activate or deactivate a config attribute. The attribute's name, data type, and other defining fields can't be changed after creation.

### Scopes

A config attribute is defined against exactly one scope, which determines where it's enforced. Retrieve the full list with [List Loyalty Config Attribute Scopes](https://docs.capillarytech.com/reference/list-loyalty-config-attribute-scopes). Available scopes include `SUBSCRIPTION_META` (subscription programs, enforced on [Create Subscription](https://docs.capillarytech.com/reference/create-subscription) and [Update Subscription](https://docs.capillarytech.com/reference/update-subscription)) and `BENEFIT` (benefits).

### Example: making an attribute mandatory

Say your org defines a config attribute named `price` on scope `SUBSCRIPTION_META` and sets `isMandatory: true`. From that point on, every [Create Subscription](https://docs.capillarytech.com/reference/create-subscription) or [Update Subscription](https://docs.capillarytech.com/reference/update-subscription) call for that program must include a `price` value in `configAttributes`, or the request fails with `CONFIG_ATTRIBUTE.MANDATORY_MISSING`. This is a general mechanism for enforcing your own required fields. The platform has no built-in concept of a "price" field or of free versus paid programs; `price` here is just an attribute name your org chose.

> **Note:** A `defaultValue` set on a config attribute is stored as metadata only. It's never applied automatically. If an attribute is mandatory, the caller must still send a value explicitly; a configured default doesn't satisfy the mandatory check.

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
            <a href="/reference/create-loyalty-config-attribute" class="nav-link">
                <span>Create Loyalty Config Attribute</span>
                <span class="badge post">POST</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/list-loyalty-config-attributes" class="nav-link">
                <span>List All Loyalty Config Attributes</span>
                <span class="badge get">GET</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/update-loyalty-config-attribute" class="nav-link">
                <span>Update Loyalty Config Attribute</span>
                <span class="badge put">PUT</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="/reference/list-loyalty-config-attribute-scopes" class="nav-link">
                <span>List Loyalty Config Attribute Scopes</span>
                <span class="badge get">GET</span>
            </a>
        </li>
    </ul>
</div>
</body>
</html>
`}</HTMLBlock>