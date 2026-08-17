---
updatedAt: 2026-04-22T05:51:33.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Troubleshooting

Common errors by block, how to use error logs, and links to the error documentation reference.

Use this page to diagnose and resolve common issues in Connect+. Each section describes the symptom, the likely cause, and the steps to fix it.

### Dataflow does not pick up files

**Symptom:** The dataflow runs but no files are processed.

**Likely cause:** The filename pattern in the Connect-to-source block does not match the files in the source directory.

**Fix:**

1. Open the Connect-to-source block configuration.
2. Check the **Filename pattern** field. Ensure the pattern matches the actual file names in the source directory. For example, use `.*.csv` to match all CSV files.
3. Verify the **Source directory** path is correct.
4. Save and re-run the dataflow.

### SFTP connection fails

**Symptom:** The dataflow fails at the Connect-to-source block with a connection error.

**Likely cause:** Incorrect credentials or Multi-Factor Authentication is turned on for the SFTP account.

**Fix:**

1. Verify the hostname, username, and password in the Connect-to-source block.
2. Confirm the port is set to `22`.
3. Check whether Multi-Factor Authentication is turned on for the SFTP account. Connect+ does not support MFA. Contact your SFTP administrator to turn it off.

### JSLT transformation produces no output

**Symptom:** The Transform-data block runs but passes no data to the next block.

**Likely cause:** The JSLT expression does not match the field names in the input JSON.

**Fix:**

1. Check the field names in your CSV against the field references in the JSLT expression. Field names are case-sensitive.
2. If your API expects a single object, ensure you are not using `for (.)` in the expression.
3. If your API expects an array, ensure the expression starts with `for (.)` and the **Request split path** in the Connect-to-destination block is set to `$.*`.

### API returns 5XX errors

**Symptom:** The Connect-to-destination block fails with 5XX error codes.

**Likely cause:** The target API is temporarily unavailable or the request payload is malformed.

**Fix:**

1. Check the **Recoverable error codes** field in the Connect-to-destination block. Ensure `521`, `502`, `503`, and `504` are included.
2. Increase the **Maximum retries** value to give the API more time to recover.
3. Review the **Parse path map** to ensure error codes and messages are being extracted correctly from the response.

### API returns 429 errors

**Symptom:** The Connect-to-destination block fails with a `429` error.

**Likely cause:** The dataflow is sending requests faster than the API rate limit.

**Fix:**

1. Ensure `429` is listed in the **Yielding error codes** field in the Connect-to-destination block. This pauses the dataflow and retries after a delay.
2. Reduce the **Rate** value to send fewer requests per minute.

### Authentication fails at the destination

**Symptom:** The Connect-to-destination block fails with a `401` or `403` error.

**Likely cause:** The client key or client secret is incorrect or has expired.

**Fix:**

1. Open the Connect-to-destination block configuration.
2. Verify the **Client key** and **Client secret** fields are set to the correct Extension Configuration values.
3. Confirm the credentials in Extension Configurations are valid and have not expired.

### Filter block passes no records

**Symptom:** No records reach the blocks downstream of the filter block.

**Likely cause:** The filter condition does not match any records in the data.

**Fix:**

1. Open the filter block configuration.
2. Review the **Filter condition** expression. Check the field name and value against the actual data. For example, `${source:equals('INSTORE')}` only passes records where the `source` field is exactly `INSTORE`.
3. Confirm the field name in the expression matches the column header in the source CSV exactly, including case.

### Records fail after CSV conversion

**Symptom:** Records are malformed or missing fields after the Convert-CSV-to-JSON block.

**Likely cause:** The **Sort headers** field does not match the column names in the source CSV.

**Fix:**

1. Open the Convert-CSV-to-JSON block configuration.
2. Check the **Sort headers** field. Ensure the column names match the headers in the source CSV exactly, including case and order.
3. Verify the **Delimiter** matches the delimiter used in the source CSV file.