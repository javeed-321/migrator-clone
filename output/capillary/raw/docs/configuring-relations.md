---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configuring Relations

Relations in Neo define how blocks connect and determine the dataflow path during execution. They work like a switch statement, where each condition directs the execution to the next block based on the dataflow logic. You can define relations using DAO functions or JavaScript. All Neo blocks support Relations.

By default, Neo provides two path relations using DAO functions:

* isSuccess() – Executes when the operation succeeds.
* hasError() – Executes when an error occurs.

You can add, edit, or delete these default path relations based on your requirements. However, at least one path relation must always be defined.

#### **Adding a Path Relation**

To add a path relation,

1. Click **+ Add Path**.
2. In **Path Relation**, enter the condition to be checked. You can also use the **autocomplete feature** to select a DAO function and block name from the dropdown list. To do this:

   1. Select the expand icon to expand the text box

      <Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/fc27030d7c7bf0348929bfb12d6e1fe9f8ab8ca52a1e4550fca585070acdad0a-Screenshot_2025-07-01_at_11.35.28_AM.png" />
   2. Start typing a DAO function starting with `.dao` to trigger the autocomplete dropdown for DAO functions.

      <Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/00786c64e6c16565a09286753ad470edd27a3d65bb1ceccae5ea294a0127ba9a-image.png" />

      1. Select the required DAO function from the drop-down list or click on `tab` to select the highlighted function. You can hover over the DAO function to view its syntax, parameters, and usage examples.

         <Image align="center" className="border" border={true} width="80% " src="https://files.readme.io/f445e1fefe1e7ac8dc20606cce17301c809c552a35025642af35710e374b0b3e-image.png" />
      2. Start typing an open parenthesis `(` to trigger the autocomplete dropdown for block names. The dropdown lists the block name and the block type in the following format: `blockName (Block Type)`.

         <Image align="center" width="80% " src="https://files.readme.io/91d5b7d40cd35d9c46bc8ff808fed5bda93316615ddc6703534555cae5862c58-image.png" />
      3. Select the required block name from the drop-down list or click on `tab` to select the highlighted block name.
      4. Select **Done** to save the changes.
         > 📘 Note
         >
         > When writing relations, it is required to prefix function names with `dao.`. For example, for the DAO function `getApiRequest`, define the function as `dao.getApiRequest`.