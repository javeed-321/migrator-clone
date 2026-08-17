---
updatedAt: 2026-03-04T06:05:01.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Fact & Dimension Tables

A [fact table](https://docs.capillarytech.com/docs/fact-tables) stores quantitative data, containing metrics (facts) such as sales, revenue, or transactions. A [dimension table](https://docs.capillarytech.com/docs/dimension-tables) holds descriptive attributes related to facts, such as customer information, product details, or time periods, which help categorize and filter the data.

In reporting, fact tables provide the numeric data to be analysed, while dimension tables allow users to dig deep and filter this data for specific insights.

Facts and dimensions, are structured in a **STAR Schema Layout** within our data storage system. In a star schema layout, fact tables are stored at the centre, containing the quantitative data, while dimension tables are stored around the fact table, connected by foreign or linking keys, providing descriptive context to the data. This structure optimizes queries and facilitates efficient data analysis and reporting.

<br />

<Image align="center" border={true} width="40% " src="https://files.readme.io/563f675-Start_schema.png" className="border" />

## Examples of fact and dimension tables

Consider the badges fact and dimension tables:\
For Badges, there are 3 fact tables linked to 7 dimension tables.\
Badges Fact Tables are:

* Badges Earn
* Badges Issued and
* Badges Earned Benefits

E.g. Badges\_earn Fact Table Screenshot (sample)

<Image align="center" border={true} src="https://files.readme.io/f75a7e4-Facts_table.png" className="border" />

Dimension Tables that are linked to the Badges Fact Table are:

* Badge meta
* Badges owner type
* Coupon series
* Enabled
* Users
* Date
* Time

E.g. Badge\_meta Dimension Table Screenshot (sample)

<Image align="center" border={true} src="https://files.readme.io/cd716f1-Dimensions_table.png" className="border" />

The fact tables store the details of the badges specific events and the corresponding dimension tables contain the fields on the basis of which the entries in these fact tables can be grouped/filtered for reporting.

<Callout icon="📘" theme="info">
  Note:

  If any of the tables or columns are missing in a specific org database, kindly contact the product team.
</Callout>

<br />