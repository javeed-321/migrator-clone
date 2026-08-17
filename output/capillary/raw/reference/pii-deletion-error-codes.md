---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Error codes

This section lists the possible error codes and the action required.

1. **Error:**
   ```json
   ERR_REQUEST_RETRIEVE.message=Request retrieve unsuccessful
   ERR_REQUEST_RETRIEVE.code=9001
   ERR_REQUEST_RETRIEVE.status=false
   ```
   **Reason:** Not able to retrieve the data.\
   **Solution:** Try again after some time.
2. **Error:**

```json
REQUEST_TYPE_NOT_SUPPORTED.message=Request Type is invalid
REQUEST_TYPE_NOT_SUPPORTED.code=9006
REQUEST_TYPE_NOT_SUPPORTED.status=false
```

**Reason:** `_requestType_` is invalid.\
**Solution:** Make sure that the entered `requestType` is valid.

3. **Error:**
   ```json
   CIR_INVALID_CHANGE_TYPE.code=9008
   CIR_INVALID_CHANGE_TYPE.message=Request Base Type is invalid
   CIR_INVALID_CHANGE_TYPE.status=false
   ```
   **Reason:** `requestSubType` is invalid.\
   **Solution:**&#x4D;ake sure that the entered `requestSubType` is valid.
4. **Error:**

   ```json
   REQUEST_ID_CREATION_FAILED.message=Request add failed due to internal error. Please try again later
   REQUEST_ID_CREATION_FAILED.code=9009
   REQUEST_ID_CREATION_FAILED.status=false
   ```

   **Reason:**&#x52;equest failed due to an internal error.\
   **Solution:**&#x54;ry again after some time.
5. **Error:**
   ```json
   INSUFFICIENT_REQUEST.message=Insufficient request for updating the request
   INSUFFICIENT_REQUEST.code=9014
   INSUFFICIENT_REQUEST.status=false
   ```
   **Reason:**\
   **Solution:**
6. **Error:**
   ```json
   INCORRECT_DATE_FORMAT.message=Date format should be yyyy-MM-dd
   INCORRECT_DATE_FORMAT.code=9016
   INCORRECT_DATE_FORMAT.status=false
   ```
   **Reason:**&#x44;ate format is wrong.\
   **Solution:**&#x4D;ke sure that the date format is in *yyyy-mm-dd*.
7. **Error:**
   ```json
   REQUEST_DATE_MORE_THAN_BOUNDARY.message=Requested On date is in future
   REQUEST_DATE_MORE_THAN_BOUNDARY.code=9021
   REQUEST_DATE_MORE_THAN_BOUNDARY.status=false
   ```
   **Reason:**&#x44;ate entered is a future date.\
   **Solution:**&#x4D;ake sure that the date is not a future date.
8. **Error:**
   ```json
   REQUEST_NOT_FOUND.code=9050
   REQUEST_NOT_FOUND.message=Request not found
   REQUEST_NOT_FOUND.status=false
   ```
   **Reason:**&#x52;equest not found.\
   **Solution:**&#x4D;ake sure that request details, request type and url are valid.
9. **Error:**
   ```json
   REQUESTER_CANNOT_APPROVE.code=9051
   REQUESTER_CANNOT_APPROVE.message=Same user cannot request and approve
   REQUESTER_CANNOT_APPROVE.status=false
   ```
   **Reason:**&#x53;ame user who raised the deletion request raised the approval request.\
   **Solution:** Raise deletion approval requests from a different user. Same user cannot approve the deletion request.
10. **Error:**
    ```json
    INVALID_STATUS.code=9052
    INVALID_STATUS.message=Invalid request status
    INVALID_STATUS.status=false
    ```
    **Reason:**&#x49;nvalid request status.\
    **Solution:**&#x45;nter the request status from the list of statuses available.
11. **Error:**
    ```json
    GLOBAL_MAX_BATCH_LIMIT_EXCEEDED.message=Exceeded maximum limit size of 10
    GLOBAL_MAX_BATCH_LIMIT_EXCEEDED.code=1060
    GLOBAL_MAX_BATCH_LIMIT_EXCEEDED.status=false
    ```
    **Reason:**&#x45;xceeded maximum limit size.\
    **Solution:**&#x45;nter a value lesser than 10.
12. **Error:**
    ```json
    ERR_PII_DELETION_ENABLED.message = Org Config for PII Deletion is Disabled
    ERR_PII_DELETION_ENABLED.code = 3232
    ERR_PII_DELETION_ENABLED.status = false
    ```
    **Reason:**&#x50;II deletion is disabled.\
    **Solution:**&#x45;nable *CONF\_ENABLE\_PII\_DELETION* in **PII configurations**.
13. **Error:**
    ```json
    CUSTOMER_GET_INVALID_IDENTIFIERS.message=Input is invalid, Please check request parameters or input xml/json, No identifier provided to get loyalty users.
    CUSTOMER_GET_INVALID_IDENTIFIERS.code=400
    CUSTOMER_GET_INVALID_IDENTIFIERS.status=false
    ```
    **Reason:**&#x49;nvalid input.\
    **Solution:**&#x4D;ake sure that the input is invalid.
14. **Error:**
    ```json
    CUSTOMER_NOT_FOUND.message=Cannot find customer for provided mobile/external-id/e-mail/id
    CUSTOMER_NOT_FOUND.code=1012
    CUSTOMER_NOT_FOUND.status=false
    ```
    **Reason:** Customer not available for the entered identifier.\
    **Solution:**&#x4D;ake sure that the identifiers are correct and the customer exists for the mentioned identifier.