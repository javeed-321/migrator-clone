---
updatedAt: 2026-04-22T13:59:43.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Building Block Configuration

Configuration reference for every Connect+ block — fields, purpose, and usage notes.

This section provides a configuration reference for every block available in Connect+. Each page covers one block: its purpose, configuration fields, and any usage notes.

<Callout icon="📘" theme="info">
  The blocks present in a dataflow depend on the selected template. Not every block appears in every template, and optional blocks can often be skipped.
</Callout>

<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Building Block Configuration</title>
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
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/trigger-block" class="nav-link" target="_blank">Trigger block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/sftp-read-block" class="nav-link" target="_blank">SFTP (Read) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/sftp-write-block" class="nav-link" target="_blank">SFTP (Write) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/s3-read-block" class="nav-link" target="_blank">S3 (Read) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/s3_write-block" class="nav-link" target="_blank">S3 (Write) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/kafka-read-block" class="nav-link" target="_blank">Kafka (Read) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/kafka-write-block" class="nav-link" target="_blank">Kafka (Write) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/transform-csv-to-json-block" class="nav-link" target="_blank">Transform (CSVt to JSON) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/transform-csv-to-xml-block" class="nav-link" target="_blank">Transform (CSV to XML) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/pgp-decrypt-block" class="nav-link" target="_blank">PGP Decrypt block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/pgp-encrypt-block" class="nav-link" target="_blank">PGP Encrypt block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/databricks-validation-block" class="nav-link" target="_blank">Databricks (Validation) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/api-request-http_write-block" class="nav-link" target="_blank">API request block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/filter-block" class="nav-link" target="_blank">Filter block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/filter-hidden-block" class="nav-link" target="_blank">Filter (Hidden) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/join-files-2-block" class="nav-link" target="_blank">Join files-2 block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/join-files-3-block" class="nav-link" target="_blank">Join files-3 block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/join-files-4-block" class="nav-link" target="_blank">Join files-4 block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/event-notification-read-block" class="nav-link" target="_blank">Event notification (Read) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/kafka-event-write-block" class="nav-link" target="_blank">Kafka Event(Write) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/hashing-csv-block" class="nav-link" target="_blank">Hashing (CSV) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/databricks-jobs-block" class="nav-link" target="_blank">Databricks (Jobs) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/iris-audience-refresh-ftp-block" class="nav-link" target="_blank">Iris Audience Refresh (FTP) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/jslt-block" class="nav-link" target="_blank">JSLT block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/jolt-block" class="nav-link" target="_blank">JOLT block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/ok-file-block" class="nav-link" target="_blank">OK File block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/split-block" class="nav-link" target="_blank">Split block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/transform-headers-block" class="nav-link" target="_blank">Transform (Headers) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/sftp-listing-block" class="nav-link" target="_blank">SFTP (Listing) block</a></li>
        <li class="nav-item"><a href="https://docs.capillarytech.com/docs/cron-block" class="nav-link" target="_blank">Cron block</a></li>
    </ul>
</body>
</html>
`}</HTMLBlock>

<br />