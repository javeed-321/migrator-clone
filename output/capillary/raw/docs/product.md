---
updatedAt: 2026-08-17T10:18:53.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Product (Old)

A **product** is an item your organisation sells. It includes details such as price, description, brand, category, and other characteristics like size or colour. Each product is stored separately in the system and can be organised and filtered in different ways. After creating products, you can use them to run promotions,  campaigns, etc.

***

## SKU (Stock Keeping Unit)

A **SKU** is the unique code used to identify a specific version of a product.

For example, a blue shirt in size Medium and the same shirt in size Large are treated as two different SKUs. Each SKU represents one distinct version of a product and helps you track pricing, inventory, and variations accurately.

Every product in the system must have a unique SKU.

***

## Product attribute

A **product attribute** describes a characteristic of a product.

Examples:

* Colour
* Size
* Material
* Warranty

Attributes help you define what information should be captured for products. You can create attributes based on your business needs.

Think of attributes as the labels that describe your products.

***

## Attribute value

An **attribute value** is a specific option under an attribute.

For example:

* Attribute: Colour
* Attribute values: Red, Blue, Green

If the attribute is Size, the values could be Small, Medium, and Large.

Attribute values ensure that products use consistent and standard options instead of free-text entries.

***

## Category

A **category** groups similar products together.

For example:

* Apparel

  * Shirts
  * Trousers

Categories help you organise products and make them easier to search, filter, and report on.

***

## Brand

A **brand** represents the name or label associated with a product.

For example:

* Nike
* Adidas
* Apple

Brands help you group products by manufacturer or label and support reporting and organisation.

# Managing products

There is currently no user interface (UI) to manage products. You must use the <Anchor label="Product APIs " target="_blank" href="https://docs.capillarytech.com/reference/product-v2-apis">Product APIs </Anchor>to create, update, and retrieve product details.

For bulk imports, use the existing Product APIs along with <Anchor label="DIY templates" target="_blank" href="https://docs.capillarytech.com/docs/diy-templates-connectplus">DIY templates</Anchor>.

The current product import feature available under <Anchor label="Inventory Profiles " target="_blank" href="https://docs.capillarytech.com/docs/inventory-profiles">Inventory Profiles </Anchor>will be deprecated soon.

<br />