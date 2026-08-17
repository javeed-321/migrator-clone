---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Introduction

The Dev Console provides observability, system monitoring, and configuration management for teams working on dataflows and classic extensions. It simplifies development, troubleshooting, and debugging processes.

# Accessing Dev Console

To access Dev Console,

1. Open the link, `[https://{host_name}/devconsole]().`

2. Use your InTouch login credentials to access the console.

<Image align="center" border={true} src="https://files.readme.io/69658bf2b830f28db28a8713b1746c2657d6264d72840f1f1abd4ddba2c98ea5-landingpage.png" className="border" />

3. From the dropdown in the top-right corner, choose the organization whose configurations you want to manage.

**Note**: In the Dev Console, you can access all the organizations available to you in InTouch.

## Authentication

The Dev Console uses InTouch portal authentication to manage access. It automatically syncs your login status and organization selection with InTouch. When you log out or switch organizations in InTouch, the Dev Console updates instantly.

Here’s how authentication works in the Dev Console:

* When you log into the InTouch portal in one browser tab, the Dev Console will automatically log you in when you open it in a different tab.
* The Dev Console always connects to the same organization as the InTouch portal.
* When you log out of the InTouch portal, the Dev Console will automatically log you out.
* You can't log in to the Dev Console directly. You must first log in to the InTouch portal.
* When you switch organizations in the InTouch portal, the Dev Console automatically updates to reflect the selected organization.

# Role-Based Access Control

Access to features is provided based on the individual's role. To request access, raise a ticket with the Capillary Product Support team. For information on different types of access, refer to the [User Management documentation](https://docs.capillarytech.com/docs/list-of-standard-permission-sets#dev-console).

# Features

## Platform Metrics

* Provides insights into system performance by tracking metrics across extension products such as Neo, Vulcan, and Connect+.
* Offers high-level metrics such as error percentages and API latency, with capabilities to view API interactions and internal errors.
* Supports custom dashboard creation through XML-like configurations and JavaScript, enabling dynamic queries and varied chart types.

## Log Viewer

* Allows users to select a product, specify a time range, and search logs via request IDs or keywords.
* Logs are retrieved from Loki through API requests, aiding in troubleshooting and debugging.

## Extension Configuration

* Functions as a secret manager for storing key-value pairs.
* Enables the marking of values as confidential and concealed from view, and incorporates an approval process for introducing new configurations.

## DB Management

* Provides direct interaction with extension-related databases.
* Enables running queries to retrieve or insert data, with read queries directed to database replicas and write queries requiring approval.
* Offers query history, collection browsing, and result limits, with possible validation of functions in user queries.

## App Request Logs

* Displays all New Relic transactions for a selected application and time range
* Supports New Relic headers and application-specific custom fields as filters, allowing exact or substring searches to locate specific requests, errors, or patterns.
* For Neo applications, it provides clickable Request IDs that open Neo Log Insights, offering detailed execution data such as raw logs, block execution flow, errors, and request details.

## Package Manager

Supports managing classic extensions by enabling users to select, build, and load extensions based on Intouch access.

## Simplified Access Permissions

Access control within the Dev Console is managed by Intouch, so there is no need to maintain separate credentials.