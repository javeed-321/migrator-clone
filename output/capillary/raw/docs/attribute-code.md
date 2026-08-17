---
updatedAt: 2026-03-04T06:04:18.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Attribute : Code

## **code**

**Profile:** Current Store\
**Attribute:** Code\
**Sub-Attribute:** NA\
**Operators:** contains, exists, isEmpty, isNotNull, isNull, isValidDate, matches and notExists, ==(string comparison)\
**Syntax:** currentStore.code\[value]\
**Example:** currentStore.code.contains("6TM")

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Attribute
      </th>

      <th style={{ textAlign: "left" }}>
        Attribute
      </th>

      <th style={{ textAlign: "left" }}>
        Operator
      </th>

      <th style={{ textAlign: "left" }}>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        currentStore
      </td>

      <td style={{ textAlign: "left" }}>
        code
      </td>

      <td style={{ textAlign: "left" }}>
        Contains - used to see if the string contains the defined value
      </td>

      <td style={{ textAlign: "left" }}>
        currentStore.code.contains("PUM45")
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        currentStore
      </td>

      <td style={{ textAlign: "left" }}>
        code
      </td>

      <td style={{ textAlign: "left" }}>
        Exists - Some proper value exists for this string (i.e. source passed a value that was not an empty string)
      </td>

      <td style={{ textAlign: "left" }}>
        currentStore.code.exists()
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        currentStore
      </td>

      <td style={{ textAlign: "left" }}>
        code
      </td>

      <td style={{ textAlign: "left" }}>
        Matches - this is used to perform regular expression based matching on the string
      </td>

      <td style={{ textAlign: "left" }}>
        currentStore.code.matches("MH09")
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        currenrStore
      </td>

      <td style={{ textAlign: "left" }}>
        code
      </td>

      <td style={{ textAlign: "left" }}>
        \== (compare the string to find the exact match)
      </td>

      <td style={{ textAlign: "left" }}>
        currentStore.code == "indianterrain.web"
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        currentStore
      </td>

      <td style={{ textAlign: "left" }}>
        code
      </td>

      <td style={{ textAlign: "left" }}>
        isNull - checks if the string is Null i.e. it was not passed from source\
        isNotNull - checks if the the string is NOT Null i.e. some value was passed from source (even an empty string counts)
      </td>

      <td style={{ textAlign: "left" }}>
        currentStore.code.isNotNull()
      </td>
    </tr>
  </tbody>
</Table>

| Example: Write a rule to check the nike store code, located in Hyderabad is "nike.hyd.himayatnagar" |
| :-------------------------------------------------------------------------------------------------- |
| **Rule: currentStore.code == "nike.hyd.himayatnagar"**                                              |