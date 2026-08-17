---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Response codes

This page lists the response codes related to the Product APIs.

# Success Code

| Code | Description                    |
| ---- | ------------------------------ |
| 2100 | Product retrieved successfully |
| 9100 | Product added successfully     |

# Error Code

| Code  | Description                                                 |
| ----- | ----------------------------------------------------------- |
| 2101  | Unable to retrieve product details                          |
| 9102  | Item SKU not passed                                         |
| 9103  | Product Price not passed                                    |
| 9106  | Product price is not numeric                                |
| 9108  | Trying to add product with an already existing EAN          |
| 25005 | No inventory found for combination of sku, OU and fetchType |

## Attribute Error Codes

| Code  | Description                                                      |
| ----- | ---------------------------------------------------------------- |
| 10212 | Attribute with the specified code not found.                     |
| 10213 | Attribute type cannot be changed after the attribute is created. |

# Category Error Codes

| Code  | Description                                                                                    |
| ----- | ---------------------------------------------------------------------------------------------- |
| 9137  | Category not found with the specified code                                                     |
| 9174  | Category name length exceeds 100 characters                                                    |
| 10061 | Request body is empty                                                                          |
| 10062 | Batch size exceeds the limit of 100 categories                                                 |
| 10063 | Category code is missing or empty                                                              |
| 10064 | Category code already exists (for create operations)                                           |
| 10065 | Category name is missing or empty                                                              |
| 10066 | Duplicate category codes in the request                                                        |
| 10067 | Parent category code does not exist                                                            |
| 10068 | Parent category has reached the maximum number of children                                     |
| 10069 | Category hierarchy depth exceeds the maximum limit                                             |
| 10070 | Parent category code cannot be updated. Delete and recreate the category to change its parent. |

# Attribute Value Error Codes

| Code  | Description                                          |
| ----- | ---------------------------------------------------- |
| 10250 | Attribute not found with the specified code          |
| 10251 | Attribute value not found with the specified code    |
| 10252 | Attribute value name length exceeds 100 characters   |
| 10253 | Request body is empty                                |
| 10254 | Batch size exceeds the limit of 100 attribute values |
| 10255 | Attribute value code is missing or empty             |
| 10256 | Attribute code is missing or empty                   |
| 10257 | Duplicate attribute value codes in the request       |

# Warning Code

| Code | Description                                                 |
| ---- | ----------------------------------------------------------- |
| 9190 | Invalid sort key provided. Valid values are `id` and `sku`. |