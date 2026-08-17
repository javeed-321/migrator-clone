---
updatedAt: 2026-04-22T05:20:51.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Use Cases

End-to-end dataflow examples for common integration scenarios in Connect+.

Connect+ use cases show you how to build end-to-end dataflows for common integration scenarios. Each use case covers the full block sequence, configuration values, and any data transformations involved.

## Use case 1: Bulk add customer

Use this dataflow to register customer profiles in bulk. The dataflow reads customer data from a source CSV file, groups records into batches, transforms each batch into the format required by the Capillary V2 API, and posts them to the `/v2/customers/bulk` endpoint.

**Scenario**

A brand conducting an in-store registration drive collects customer data in CSV format. The file includes names, mobile numbers, registration source, and loyalty type for each customer. Connect+ reads the file, groups records into batches of 10, transforms each batch into the nested API payload, and posts them to the Capillary platform in a single scheduled operation.

**Sample CSV input**

| firstname | lastname | value        | source  | loyaltyType | identifierType |
| --------- | -------- | ------------ | ------- | ----------- | -------------- |
| John      | Doe      | 919812345678 | INSTORE | loyalty     | mobile         |
| Ravi      | Kumar    | 919812340814 | INSTORE | loyalty     | mobile         |
| Jane      | Smith    | 919812349864 | INSTORE | loyalty     | mobile         |

**Block sequence**

`Connect-to-source` → `Convert-CSV-to-JSON` → `Transform-data` → `Connect-to-destination`

### Block configuration

The following table lists the blocks in this dataflow, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                                  | Block Description                                                                                                                                    | Configuration Field          | Configured Value                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| **[Connect-to-source](https://docs.capillarytech.com/docs/sftp-read-block)**<br />Type: `sftp_read`                         | Connects to the source SFTP server, polls for CSV files matching the specified filename pattern, and makes them available for downstream processing. | Hostname                     | `data.capillarydata.com`                                                                                 |
|                                                                                                                             |                                                                                                                                                      | Username                     | `capillary`                                                                                              |
|                                                                                                                             |                                                                                                                                                      | Password                     | Redacted                                                                                                 |
|                                                                                                                             |                                                                                                                                                      | Source directory             | `/Capillary testing/connectplus/sourceNewConnect+`                                                       |
|                                                                                                                             |                                                                                                                                                      | Filename pattern             | `.*.csv`. Matches all CSV files.                                                                         |
|                                                                                                                             |                                                                                                                                                      | Processed directory          | `/Capillary testing/connectplus/processedNewConnect+`                                                    |
|                                                                                                                             |                                                                                                                                                      | Error file path              | `/Capillary testing/connectplus/errorNewConnect+`                                                        |
|                                                                                                                             |                                                                                                                                                      | Unzip files                  | `false`                                                                                                  |
|                                                                                                                             |                                                                                                                                                      | Search directory recursively | `false`                                                                                                  |
|                                                                                                                             |                                                                                                                                                      | Port                         | `22`                                                                                                     |
|                                                                                                                             |                                                                                                                                                      | File delimiter               | `,`                                                                                                      |
|                                                                                                                             |                                                                                                                                                      | Report status code           | `all`                                                                                                    |
| **[Convert-CSV-to-JSON](https://docs.capillarytech.com/docs/transform-csv-to-json-block)**<br />Type: `convert_csv_to_json` | Converts the source CSV to JSON and groups records into batches of 10 for bulk processing.                                                           | File type                    | `5c5b9607-0173-1000-87ad-a0b9ca44885f`                                                                   |
|                                                                                                                             |                                                                                                                                                      | Sort headers                 | `firstname,lastname,value,source,loyaltyType,identifierType`                                             |
|                                                                                                                             |                                                                                                                                                      | Alphabetical sort            | `false`                                                                                                  |
|                                                                                                                             |                                                                                                                                                      | Group size                   | `10`                                                                                                     |
|                                                                                                                             |                                                                                                                                                      | Line numbers                 | `$[0].LINE_NO`                                                                                           |
|                                                                                                                             |                                                                                                                                                      | JSON path expression         | `$.[*]`                                                                                                  |
|                                                                                                                             |                                                                                                                                                      | Split response               | `false`                                                                                                  |
| **[Transform-data](https://docs.capillarytech.com/docs/jslt-block)**<br />Type: `jslt_transform`                            | Reshapes each batch of flat JSON records into the nested structure required by the `/v2/customers/bulk` API. See JSLT transformation below.          | —                            | —                                                                                                        |
| **[Connect-to-destination](https://docs.capillarytech.com/docs/api-request-http_write-block)**<br />Type: `http_write`      | Posts each transformed batch to the Capillary `/v2/customers/bulk` API endpoint and handles retries for recoverable errors.                          | API base URL                 | `https://{host}.api.capillarytech.com`                                                                   |
|                                                                                                                             |                                                                                                                                                      | OAuth base URL               | `https://{host}.api.capillarytech.com`                                                                   |
|                                                                                                                             |                                                                                                                                                      | API endpoint                 | `/v2/customers/bulk`                                                                                     |
|                                                                                                                             |                                                                                                                                                      | API method                   | `POST`                                                                                                   |
|                                                                                                                             |                                                                                                                                                      | Client key                   | `****************`                                                                                       |
|                                                                                                                             |                                                                                                                                                      | Client secret                | Redacted                                                                                                 |
|                                                                                                                             |                                                                                                                                                      | Bulk support                 | `true`                                                                                                   |
|                                                                                                                             |                                                                                                                                                      | Request split path           | `$.*`                                                                                                    |
|                                                                                                                             |                                                                                                                                                      | Response split path          | `$.*`                                                                                                    |
|                                                                                                                             |                                                                                                                                                      | Parse response               | `true`                                                                                                   |
|                                                                                                                             |                                                                                                                                                      | Parse path map               | `{"status_code": "$.['errors'].*.code", "error_message": "$.['errors'].*.message", "entity_id": "$.Id"}` |
|                                                                                                                             |                                                                                                                                                      | Recoverable error codes      | `521,502,503,504`                                                                                        |
|                                                                                                                             |                                                                                                                                                      | Yielding error codes         | `429`                                                                                                    |
|                                                                                                                             |                                                                                                                                                      | Maximum retries              | `3`                                                                                                      |
|                                                                                                                             |                                                                                                                                                      | Rate                         | `1000`                                                                                                   |
|                                                                                                                             |                                                                                                                                                      | Period                       | `1`                                                                                                      |
|                                                                                                                             |                                                                                                                                                      | Time unit                    | `MINUTES`                                                                                                |

### Connect-to-source

Connect-to-source connects to the SFTP server, polls for CSV files matching the specified filename pattern, and passes them to the Convert-CSV-to-JSON block.

### Convert-CSV-to-JSON

Convert-CSV-to-JSON reads the source CSV and converts each row into a flat JSON object. A group size of 10 batches records before Transform-data processes them.

### JSLT transformation

Connect+ converts each CSV row into a JSON object and passes the full array to the jslt\_transform block before sending the data to the destination.

The Transform Data block uses the following JSLT expression to reshape each flat JSON record into the nested structure required by the /v2/customers/bulk API. The `for (.)` loop iterates over each record in the batch.

**Input row (as JSON after CSV conversion)**

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "value": "919812345678",
  "source": "INSTORE",
  "loyaltyType": "loyalty",
  "identifierType": "mobile"
}
```

**JSLT expression**

```json JSLT
[
  for (.)
  {
    "profiles": [
      {
        "firstName": .firstname,
        "lastName": .lastname,
        "source": .source,
        "identifiers": [
          {
            "type": .identifierType,
            "value": .value
          }
        ]
      }
    ],
    "loyaltyInfo": {
      "loyaltyType": .loyaltyType
    }
  }
]
```

**Output JSON**

```json Output JSON
[
  {
    "profiles": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "source": "INSTORE",
        "identifiers": [
          {
            "type": "mobile",
            "value": "919812345678"
          }
        ]
      }
    ],
    "loyaltyInfo": {
      "loyaltyType": "loyalty"
    }
  },
  {
    "profiles": [
      {
        "firstName": "Ravi",
        "lastName": "Kumar",
        "source": "INSTORE",
        "identifiers": [
          {
            "type": "mobile",
            "value": "919812340814"
          }
        ]
      }
    ],
    "loyaltyInfo": {
      "loyaltyType": "loyalty"
    }
  },
  {
    "profiles": [
      {
        "firstName": "Jane",
        "lastName": "Smith",
        "source": "INSTORE",
        "identifiers": [
          {
            "type": "mobile",
            "value": "919812349864"
          }
        ]
      }
    ],
    "loyaltyInfo": {
      "loyaltyType": "loyalty"
    }
  }
]

```

**How the expression works:**

<Table>
  <thead>
    <tr>
      <th>
        Expression
      </th>

      <th>
        What it does
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `for (.)`
      </td>

      <td>
        Iterates over every row in the input array and produces one output object per row  
        **Note**: Place the `for` loop at the beginning.
      </td>
    </tr>

    <tr>
      <td>
        `.firstname`, `.lastname`, `.source`
      </td>

      <td>
        Map directly from the CSV column names to the corresponding API field names
      </td>
    </tr>

    <tr>
      <td>
        `.identifierType`
      </td>

      <td>
        Maps to the `type` field inside the `identifiers` array
      </td>
    </tr>

    <tr>
      <td>
        `.value`
      </td>

      <td>
        Maps to the `value` field inside the `identifiers` array
      </td>
    </tr>

    <tr>
      <td>
        `.loyaltyType`
      </td>

      <td>
        Maps to `loyaltyType` inside the `loyaltyInfo` object
      </td>
    </tr>
  </tbody>
</Table>

The following table describes each field mapping.

| CSV column       | API field                        | Notes                                         |
| ---------------- | -------------------------------- | --------------------------------------------- |
| `firstname`      | `profiles[].firstName`           | Customer's first name                         |
| `lastname`       | `profiles[].lastName`            | Customer's last name                          |
| `source`         | `profiles[].source`              | Registration source, for example `INSTORE`    |
| `identifierType` | `profiles[].identifiers[].type`  | Identifier type, for example `mobile`         |
| `value`          | `profiles[].identifiers[].value` | Identifier value, for example a mobile number |
| `loyaltyType`    | `loyaltyInfo.loyaltyType`        | Loyalty programme type, for example `loyalty` |

### Connect-to-destination

Connect-to-destination receives the transformed JSON from Transform-data and posts each batch to the `/v2/customers/bulk` API endpoint. It handles OAuth authentication, retries recoverable errors, and applies rate limiting.

## Use case 2: Add a single customer

Use this dataflow to register one customer record at a time. The dataflow reads customer data from a source CSV file, processes each row individually, transforms the record into the format required by the Capillary V2 API, and posts it to the `/v2/customers` endpoint.

**Scenario**

A brand collects individual customer registrations from an in-store system in CSV format, with each record containing the customer's name, mobile number or email address, and registration source. Connect+ reads the file, processes each row one at a time, transforms the flat record into the nested API payload, and posts it to the Capillary platform.

**Sample CSV input**

| firstname | lastname | value                  | source  | identifierType |
| --------- | -------- | ---------------------- | ------- | -------------- |
| John      | Smith    | 918298526106           | INSTORE | mobile         |
| Jane      | Doe      | <jane.doe@example.com> | INSTORE | email          |

**Block sequence**

`Connect-to-source` → `Convert-CSV-to-JSON` → `Transform-data` → `Connect-to-destination`

### Block configuration

The following table lists the blocks in this dataflow, describes what each block does, and provides the configured values for each field.

| Block Name                                                                                                                  | Block Description                                                                                                                                    | Configuration Field          | Configured Value                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| **[Connect-to-source](https://docs.capillarytech.com/docs/sftp-read-block)**<br />Type: `sftp_read`                         | Connects to the source SFTP server, polls for CSV files matching the specified filename pattern, and makes them available for downstream processing. | Hostname                     | `data.capillarydata.com`                                                                               |
|                                                                                                                             |                                                                                                                                                      | Username                     | `capillary`                                                                                            |
|                                                                                                                             |                                                                                                                                                      | Password                     | Redacted                                                                                               |
|                                                                                                                             |                                                                                                                                                      | Source directory             | `/Capillary testing/connectplus/sourceNewConnect+`                                                     |
|                                                                                                                             |                                                                                                                                                      | Filename pattern             | `.*.csv`. Matches all CSV files.                                                                       |
|                                                                                                                             |                                                                                                                                                      | Processed directory          | `/Capillary testing/connectplus/processedNewConnect+`                                                  |
|                                                                                                                             |                                                                                                                                                      | Error file path              | `/Capillary testing/connectplus/errorNewConnect+`                                                      |
|                                                                                                                             |                                                                                                                                                      | Unzip files                  | `false`                                                                                                |
|                                                                                                                             |                                                                                                                                                      | Search directory recursively | `false`                                                                                                |
|                                                                                                                             |                                                                                                                                                      | Port                         | `22`                                                                                                   |
|                                                                                                                             |                                                                                                                                                      | File delimiter               | `,`                                                                                                    |
|                                                                                                                             |                                                                                                                                                      | Report status code           | `all`                                                                                                  |
| **[Convert-CSV-to-JSON](https://docs.capillarytech.com/docs/transform-csv-to-json-block)**<br />Type: `convert_csv_to_json` | Converts the source CSV to JSON and processes one record at a time.                                                                                  | File type                    | `5c5b9607-0173-1000-87ad-a0b9ca44885f`                                                                 |
|                                                                                                                             |                                                                                                                                                      | Sort headers                 | `firstname,lastname,value,source,identifierType`                                                       |
|                                                                                                                             |                                                                                                                                                      | Alphabetical sort            | `false`                                                                                                |
|                                                                                                                             |                                                                                                                                                      | Group size                   | `1`                                                                                                    |
|                                                                                                                             |                                                                                                                                                      | Line numbers                 | `$[0].LINE_NO`                                                                                         |
|                                                                                                                             |                                                                                                                                                      | JSON path expression         | `$.[*]`                                                                                                |
|                                                                                                                             |                                                                                                                                                      | Split response               | `false`                                                                                                |
| **[Transform-data](https://docs.capillarytech.com/docs/jslt-block)**<br />Type: `jslt_transform`                            | Reshapes each flat JSON record into the nested structure required by the `/v2/customers` API. See JSLT transformation below.                         | —                            | —                                                                                                      |
| **[Connect-to-destination](https://docs.capillarytech.com/docs/api-request-http_write-block)**<br />Type: `http_write`      | Posts each transformed record to the Capillary `/v2/customers` API endpoint and handles retries for recoverable errors.                              | API base URL                 | `https://{host}.api.capillarytech.com`                                                                 |
|                                                                                                                             |                                                                                                                                                      | OAuth base URL               | `https://{host}.api.capillarytech.com`                                                                 |
|                                                                                                                             |                                                                                                                                                      | API endpoint                 | `/v2/customers`                                                                                        |
|                                                                                                                             |                                                                                                                                                      | API method                   | `POST`                                                                                                 |
|                                                                                                                             |                                                                                                                                                      | Client key                   | Select from Extension Configurations                                                                   |
|                                                                                                                             |                                                                                                                                                      | Client secret                | Select from Extension Configurations                                                                   |
|                                                                                                                             |                                                                                                                                                      | Bulk support                 | `false`                                                                                                |
|                                                                                                                             |                                                                                                                                                      | Parse response               | `true`                                                                                                 |
|                                                                                                                             |                                                                                                                                                      | Parse path map               | `{"status_code": "$.status.code", "error_message": "$.status.message", "entity_id": "$.customers.id"}` |
|                                                                                                                             |                                                                                                                                                      | Recoverable error codes      | `521,502,503,504`                                                                                      |
|                                                                                                                             |                                                                                                                                                      | Yielding error codes         | `429`                                                                                                  |
|                                                                                                                             |                                                                                                                                                      | Maximum retries              | `3`                                                                                                    |
|                                                                                                                             |                                                                                                                                                      | Rate                         | `1,000`                                                                                                |
|                                                                                                                             |                                                                                                                                                      | Period                       | `1`                                                                                                    |
|                                                                                                                             |                                                                                                                                                      | Time unit                    | `MINUTES`                                                                                              |

### Connect-to-source

Connect-to-source connects to the source SFTP server, polls for CSV files matching the specified filename pattern, and passes them to the Convert-CSV-to-JSON block.

### Convert-CSV-to-JSON

Convert-CSV-to-JSON reads the source CSV and converts each row into a flat JSON object. A group size of `1` ensures each record passes to the Transform-data block individually before Connect-to-destination posts it to the API.

### JSLT transformation

Connect+ converts each CSV row into a JSON object and passes it—one record at a time—to the Transform-data block.

**Step 1: Input**

The Convert-CSV-to-JSON block converts each CSV row into a flat JSON object before it reaches Transform-data.

```json
{
  "firstname": "John",
  "lastname": "Smith",
  "value": "918298526106",
  "source": "INSTORE",
  "identifierType": "mobile"
}
```

**Step 2: JSLT expression**

Unlike the bulk add use case, this expression does not use a `for (.)` loop. It maps a single flat JSON object directly to the nested structure required by the `/v2/customers` API.

```json
{
  "profiles": [
    {
      "firstName": .firstname,
      "lastName": .lastname,
      "source": .source,
      "identifiers": [
        {
          "type": .identifierType,
          "value": .value
        }
      ]
    }
  ]
}
```

**Step 3: Output**

The expression produces a single JSON object with a nested `profiles` array.

```json
{
  "profiles": [
    {
      "firstName": "John",
      "lastName": "Smith",
      "source": "INSTORE",
      "identifiers": [
        {
          "type": "mobile",
          "value": "918298526106"
        }
      ]
    }
  ]
}
```

**How the expression works**

| Expression                           | What it does                                                                |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `.firstname`, `.lastname`, `.source` | Map directly from the CSV column names to the corresponding API field names |
| `.identifierType`                    | Maps to the `type` field inside the `identifiers` array                     |
| `.value`                             | Maps to the `value` field inside the `identifiers` array                    |

**Field mapping**

| CSV column       | API field                        | Notes                                             |
| ---------------- | -------------------------------- | ------------------------------------------------- |
| `firstname`      | `profiles[].firstName`           | Customer's first name                             |
| `lastname`       | `profiles[].lastName`            | Customer's last name                              |
| `source`         | `profiles[].source`              | Registration source, for example `INSTORE`        |
| `identifierType` | `profiles[].identifiers[].type`  | Identifier type, for example `mobile` or `email`  |
| `value`          | `profiles[].identifiers[].value` | Identifier value—a mobile number or email address |

### Connect-to-destination

Connect-to-destination receives the transformed JSON from Transform-data and posts each record to the `/v2/customers` API endpoint, handling OAuth authentication, retrying recoverable errors, and applying rate limiting.