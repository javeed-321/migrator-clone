---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Schema Block

The Schema block in a dataflow allows you to define a JSON schema using JavaScript code. It outlines the rules, header details, and data type requirements for the expected request payload. Once a request is received, the input data is validated against this schema using the [Ajv JSON schema validator](https://ajv.js.org/) on the backend. If validation is successful, the dataflow proceeds with the specified actions; if validation fails, the flow follows the failure path, where you can specify appropriate error codes and messages.

# Standard and custom definitions

You can either use the **standard definitions** which include predefined keywords (for example, `isNotEmpty` can be used to ensure that an input string is not empty and contains data) or define custom validation rules as per your specific requirements.

The custom validation rules are added to the schema by including them in the `definitions` array within the schema object. The `definitions` array is a standard JSON Schema feature that allows you to define reusable components or rules.

You can also combine your schema's custom and standard definitions to create validation rules suited to your application's needs. Predefined definitions allow you to apply common validation patterns, while custom definitions provide the flexibility to handle specific requirements.

The common keywords used as part of standard definitions are:

* `isNotEmpty` - Validates that the input string contains non-whitespace characters, meaning it isn't blank or filled with spaces. The keyword `isNotEmpty` ensures that the input string field contains data and is not left blank or filled with only spaces.

* `dateWithTz`: Validates that a given date string in the input follows a specific format, such as "YYYY-MM-DD," and ensures it includes time zone information. The `dateWithTz` keyword ensures the date input is formatted in a specified format and includes the relevant time zone. This avoids discrepancies caused by time zone differences.

* `phoneValidation`: Validates and formats a phone number in the input to a standard format. The keyword `phoneValidation` ensures phone numbers are valid and follow a standardised format.

* `removeSpecialChar`: Removes special characters from a string in the input, leaving only alphanumeric characters and spaces. The `removeSpecialChar` keyword ensures a string field includes only alphanumeric characters. It removes special characters from the string.

# Example scenario

**Requirement**

You are creating a dataflow for an airline brand that awards loyalty points to customers. Before executing APIs to analyze transaction and customer data, you need to validate the incoming request payload against the following criteria:

1. **Object Structure**:
   * The overall input must be an `object`.
   * This object must include a property named `queryParams`.
2. **Presence of Required Properties in`queryParams`** :
   * The `queryParams` object must contain the following properties:
     * `FFN`
     * `Fname`
     * `lname`
3. **Data Type and Content of Each Property**:
   * `FFN`: Must be a `string` with at least 1 character.
   * `Fname`: Must be a `string` with at least 1 character.
   * `lname`: Must be a `string` with at least 1 character.

**Solution**

You can add a Schema block after the [Trigger block](https://docs.capillarytech.com/docs/trigger) to enforce these validation rules. In the Schema block, define the validation rules and specify custom error messages for cases where the payload does not meet the defined criteria.

## Example script for schema validation

Below is an example of the script you can use in the **Schema block** to validate the incoming request payload. This script uses standard definitions.

```json
const schema = {
  definitions : [],
  spec:{
    type : "object",
    "properties": {
      "queryParams" :{
        type: 'object',
        properties: {
          FFN: {
            type: 'string',
            minLength: 1,
            "errorMessage": {
              minLength: "FFN must not be empty"
            }
          },
          Fname: {
            type: 'string',
            minLength: 1,
            "errorMessage": {
              minLength: "Fname must not be empty"
            }
          },
          lname: {
            type: 'string',
            minLength: 1,
            "errorMessage": {
              minLength: "lname must not be empty"
            }
          }
        },
        required: ['FFN', 'Fname', 'lname'],
        errorMessage: {
          required: {
            FFN: "FFN is missing",
            Fname: "Fname is missing",
            lname: "lname is missing"
          }
        }
      }
    },
    required: ['queryParams'],
    errorMessage: {
      required: {
        queryParams: "queryParams are missing"
      }
    }
  }
};


export {schema as default};

```

## Example with custom error messages

This schema validates several attributes in the body of the incoming request, including type, minimum items, and maximum items. Each attribute is paired with a custom error message.

```json
const schema = {
  definitions : [],
  spec:{
    type : "object",
    "properties": {
      "body" :{
        "type": "array", "minItems": 1, "maxItems": 10,
        "errorMessage": {
          type: "The payload must be an array",
          minItems: "The payload must contain atleast one item",
          maxItems: "The payload cannot contain more than 10 items"
        },
        "items": {
          type: 'object',
          properties: {
            identifierType: {
              type: 'string',
              transform: ['toLowerCase'],
              enum: ['externalid'],
              errorMessage: {
                enum: "The identifierType property must be 'externalId'"
              }
            },
            identifierValue: {
              minLength: 1,
              "errorMessage": {
                minLength: "identifierValue must not be empty"
              }
            },
            source: {
              minLength: 1,
              "errorMessage": {
                minLength: "source must not be empty"
              }
            },
            type: {
              minLength: 1,
              "errorMessage": {
                minLength: "type must not be empty"
              }
            },
            billNumber: {
              minLength: 1,
              "errorMessage": {
                minLength: "billNumber must not be empty"
              }
            },
            billingDate: {
              minLength: 1,
              format: "date-time",
              "errorMessage": {
                minLength: "billingDate must not be empty",
                format: "billingDate must be in ISO 8601 format"
              }
            },
            billAmount: {
              minLength: 1,
              "errorMessage": {
                minLength: "billAmount must not be empty"
              }
            },
            extendedFields: {
              type: 'object',
              properties: {
                  booking_first_name: {
                    type: 'string',
                    minLength: 1,
                    "errorMessage": {
                      minLength: "booking_first_name must not be empty"
                    }
                  },
                  flight_status: {
                    type: 'string',
                    transform: ['trim', 'toLowerCase'],
                    enum : ['flown'],
                    "errorMessage": {
                      enum: "flight_status must be 'flown'"
                    }
                  },
                  pnr_status: {
                    type: 'string',
                    transform: ['trim', 'toLowerCase'],
                    not : {
                      enum: ['utilized'],
                    },
                    minLength: 1,
                    "errorMessage": {
                      not: "pnr_status cannot be 'utilized'",
                      minLength: "pnr_status must not be empty"
                    }
                  },
                  booking_last_name: {
                    type: 'string',
                    minLength: 1,
                    "errorMessage": {
                      minLength: "booking_last_name must not be empty"
                    }
                  },
                  boarding_status: {
                    type: 'string',
                    minLength: 1,
                    "errorMessage": {
                      minLength: "boarding_status must not be empty"
                    }
                  },
                  booking_date: {
                    type: 'string',
                    format: "date",
                    minLength: 1,
                    "errorMessage": {
                      minLength: "booking_date must not be empty",
                      format: "booking_date format must be yyyy-mm-dd"
                    }
                  },
                  pnr_number: {
                    type: 'string',
                    minLength: 1,
                    "errorMessage": {
                      minLength: "pnr_number must not be empty"
                    }
                  },
                  flight_number: {
                    type: 'string',
                    minLength: 1,
                    "errorMessage": {
                      minLength: "flight_number must not be empty"
                    }
                  },
                  departure_date: {
                    type: 'string',
                    format: "date",
                    minLength: 1,
                    "errorMessage": {
                      minLength: "departure_date must not be empty",
                      format: "departure_date format must be yyyy-mm-dd"
                    }
                  },
                  airline_code: {
                    type: 'string',
                    minLength: 1,
                    "errorMessage": {
                      minLength: "airline_code must not be empty"
                    }
                  }
              },required: ['booking_first_name', 'booking_last_name', 'flight_status', 'pnr_status', 'booking_date', 'pnr_number', 'boarding_status', 'flight_number', 'departure_date', 'airline_code'],
              errorMessage: {
                required: {
                  booking_first_name: "booking_first_name extendedField is missing",
                  booking_last_name: "booking_last_name extendedField is missing",
                  flight_status: "flight_status extendedField is missing",
                  pnr_status: "pnr_status extendedField is missing",
                  booking_date: "booking_date extendedField is missing",
                  boarding_status: "boarding_status extendedField is missing",
                  pnr_number: "pnr_number extendedField is missing",
                  flight_number: "flight_number extendedField is missing",
                  departure_date: "departure_date extendedField is missing",
                  airline_code : "airline_code extendedField is missing"
                }
              }
            },
            customFields: {
              type: 'object',
              properties: {
                  origin: {
                    type: 'string',
                    minLength: 1,
                    "errorMessage": {
                      minLength: "origin must not be empty"
                    }
                  },
                  destination: {
                    type: 'string',
                    minLength: 1,
                    "errorMessage": {
                      minLength: "destination must not be empty"
                    }
                  }
              },required: ['origin', 'destination'],
              errorMessage: {
                required: {
                  origin: "origin customField is missing",
                  destination: "destination customField is missing"
                }
              }
            },
            lineItemsV2: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                properties: {
                  itemCode: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: {
                      minLength: "itemCode must not be empty"
                    }
                  },
                  amount: {
                    type: 'number',
                    minLength: 1,
                    errorMessage: {
                      minLength: "amount must not be empty"
                    }
                  }
                },
                required: ['itemCode', 'amount'],
                errorMessage: {
                  required: {
                    itemCode: "itemCode is missing",
                    amount: "amount is missing"
                  }
                }
              }
            }
          },
          required: ['identifierType', 'identifierValue', 'source', 'type', 'billNumber', 'billingDate', 'billAmount', 'extendedFields', 'customFields', 'lineItemsV2'],
          errorMessage: {
            required: {
              identifierType: "identifierType is missing",
              identifierValue: "identifierValue is missing",
              source: "source is missing",
              type: "type is missing",
              billNumber: "billNumber is missing",
              billingDate: "billingDate is missing",
              billAmount: "billAmount is missing",
              extendedFields : "extendedFields are missing",
              customFields : "customFields are missing",
              lineItemsV2 : "lineItemsV2 are missing"
            }
          }
        }
      }
    }
  }
};

export {schema as default};
```

Refer to this example [dataflow](https://eu.intouch.capillarytech.com/extensions/neo/ui/rule/daec5cfa-be66-4d5d-b021-c2f45c3aa322/version/9204edc5-0386-4326-9ef8-9988fe690b64?ruleType=org) to understand how it is configured for a use case. Make sure that you have access to DocDemo org (100737) and [access to Neo](https://docs.capillarytech.com/docs/access-management-neo#enabling-neo-extension-access--user-roles).

# Configuring Schema block

When you create a dataflow, the Schema block is created automatically along with the Trigger block. To configure the Schema block, perform the following:

1. From the dataflow canvas, hover on the **Schema** block and click the edit icon.
2. In the **Block name** section, enter the block name.\
   **Note**: Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
3. In the **Script** section, write a script to validate the input parameter.
4. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
5. Click **Done**.

<Image align="center" alt="Configuring Schema Block" border={true} caption="Configuring Schema Block" src="https://files.readme.io/f3e6189e4386467c63c97625cd6babab3500da90d0a41f703ad26a91aa440c52-13.02.2025_19.22.52_REC_configuring_schema.gif" />