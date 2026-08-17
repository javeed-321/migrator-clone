---
updatedAt: 2026-08-12T11:12:55.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Product APIs (v2)

The <Anchor label="Product (also called Inventory)" target="_blank" href="https://docs.capillarytech.com/update/docs/product">Product (also called Inventory)</Anchor> APIs let you create, retrieve, update, and manage product data. Use these APIs to define your product catalogue, define attributes, organise brands and categories, and manage SKUs across organisation units (OUs).

### What you can do

You can use the Product APIs to:

* **Create, read, and update** product entities such as brands, categories, attributes, attribute values, and SKUs
* **Search** across products, brands, categories, attributes, and SKUs using prefix-based queries
* **Build and retrieve hierarchies** for brands and categories, including parent–child relationships
* **Support for bulk create and update operations** <Anchor label="using DIY template" target="_blank" href="https://docs.capillarytech.com/docs/diy-templates-connectplus">using DIY template</Anchor>
* **Scope data by organisation unit (OU)** where OU support is enabled

<Callout icon="🚧" theme="warn">
  Notes

  * Deletion is **not supported** through these APIs. Product entities are expected to be managed through create and update operations only.
  * At present, there is no UI for adding products and will be available in future.
</Callout>

### Search behaviour

Search across Product APIs uses **starts with search** on code. Each API documents its supported search parameters, precedence rules, and warnings to avoid ambiguity.

### Hierarchy model

The Product APIs support hierarchical structures for:

* **Categories** (parent–child category trees)
* **Brands** (parent and child brands)

Hierarchy depth and child limits are controlled through configuration and are documented explicitly in the relevant APIs.

### Activating and deactivating product entities

Brands, categories, SKUs, attributes, and attribute values all carry an `isActive` field that indicates whether the entity is currently active.

* **Default behaviour**: If `isActive` is not provided when creating an entity, it defaults to active (`true`). If `isActive` is not provided when updating an entity, the existing state is left unchanged — omitting the field never deactivates or reactivates an entity.
* **Filtering**: GET APIs accept an `isActive` query parameter to filter results by active state.
* **Brands and categories**: Deactivating a brand or category is blocked while it still has active child brands/categories or active SKUs beneath it. Reactivating a non-root brand or category is blocked unless its parent is active. Creating a brand or category as active under an inactive parent is also blocked.
* **SKUs**: SKUs have no dependents, so deactivating a SKU is always allowed. Reactivating a SKU (or creating one as active) is blocked unless its brand and category are both active.
* **Attributes and attribute values**: `isActive` is accepted and returned, but no activation/deactivation rules are enforced for these two entities.
* **Transactions**: Referencing an inactive SKU in a transaction does not block the transaction — it returns a warning instead.

Each API's Error and warning codes table documents the specific error raised for a blocked activation or deactivation attempt.

### Organisation unit (OU) support

Product entities can be scoped at the organisation level or OU level.

Before using OU-scoped product APIs, you must:

1. Mark the concept as **OU-enabled**
2. Enable **OU-level product and inventory configurations**. To enable OU support for product entities, you need to create a JIRA ticket and enable the config `CONF_OU_LEVEL_PRODUCTS_ENABLED`. For more information, see <Anchor label="Configuring Organisation Unit (OU) support for product entities" target="_blank" href="https://docs.capillarytech.com/docs/inventory-profiles#configuring-organisation-unit-ou-support-for-product-entities">Configuring Organisation Unit (OU) support for product entities</Anchor>.

Both steps are required. If the configuration is incomplete, the APIs return warnings or conflicts. Each API clearly documents OU behaviour, default scope, and conflict scenarios.

### Bulk operations and integrations

All core product entities support **bulk create and update** operations.

You can:

* Submit batch requests through APIs
* Ingest large datasets using **<Anchor label="DYI templates" target="_blank" href="https://docs.capillarytech.com/reference/diy-template-apis">DYI templates</Anchor>**
* Create complete hierarchies (parent and child entities) in a single request

Batch size limits, hierarchy limits, and default behaviours are documented per API.

## QuickStart: set up products using the Product APIs

Use this sequence when onboarding a new catalogue or integrating for the first time. Follow the order to avoid dependency and validation errors.

### Step 1: Create brands

Create parent and child brands first. SKUs and categories reference brand codes and require them to exist.

### Step 2: Create categories

Create product categories and category hierarchies.

### Step 3: Create product attributes

Define custom attributes such as material, size, or fit.

### Step 4: Create attribute values

Create allowed values for attributes that require controlled inputs.

### Step 5: Create SKUs

Create SKUs only after brands, categories, and attributes exist.

### Step 6: Retrieve and verify data

Use GET and search APIs to validate the setup.

<HTMLBlock>{`
<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Capillary Tech API</title> <style> body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell; line-height: 1.6; } .nav-list { list-style: none; padding: 0; margin: 0; max-width: 800px; } .nav-item { padding: 0; border-radius: 8px; margin: 8px 0; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); background-color: rgba(240, 240, 240, 0.4); border: 1px solid rgba(60, 60, 60, 0.1); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02); overflow: hidden; } .nav-item:hover { background-color: rgba(255, 255, 255, 0.8); transform: translateX(4px); border-color: rgba(0, 122, 255, 0.3); box-shadow: 0 8px 16px rgba(0, 122, 255, 0.1); } .nav-link { text-decoration: none !important; border-bottom: none !important; color: #1d1d1f; display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; font-size: 15px; font-weight: 500; } .nav-link:hover { color: #007AFF; text-decoration: none !important; } .badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; min-width: 45px; text-align: center; letter-spacing: 0.5px; transition: all 0.3s ease; opacity: 0.75; } .post { background-color: #e6f7ed; color: #1e7e34; border: 1px solid #bcebc9; } .put { background-color: #fff8e1; color: #b7791f; border: 1px solid #ffeeba; } .get { background-color: #e3f2fd; color: #0d47a1; border: 1px solid #bbdefb; } .delete { background-color: #fde8e8; color: #9b1c1c; border: 1px solid #f5c6c6; } .nav-item:hover .badge { opacity: 1; transform: scale(1.05); color: white; border-color: transparent; } .nav-item:hover .post { background-color: #2ea44f; box-shadow: 0 0 12px rgba(46, 164, 79, 0.5); } .nav-item:hover .put { background-color: #f7811d; box-shadow: 0 0 12px rgba(247, 129, 29, 0.5); } .nav-item:hover .get { background-color: #0366d6; box-shadow: 0 0 12px rgba(3, 102, 214, 0.5); } .nav-item:hover .delete { background-color: #c81e1e; box-shadow: 0 0 12px rgba(200, 30, 30, 0.5); } </style> </head> <body> <div class="doc-container"> <ul class="nav-list"> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/post_v2-product-brands" class="nav-link"> <span>Add Brands</span> <span class="badge post">POST</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/put_v2-product-brands" class="nav-link"> <span>Update Brands</span> <span class="badge put">PUT</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/get_v2-product-brands" class="nav-link"> <span>Get/Search Brands</span> <span class="badge get">GET</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/post_v2-product-skus" class="nav-link"> <span>Add SKUs</span> <span class="badge post">POST</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/put_v2-product-skus" class="nav-link"> <span>Update SKUs</span> <span class="badge put">PUT</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/get_v2-product-skus" class="nav-link"> <span>Get/Search  SKUs</span> <span class="badge get">GET</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/add_product_attributes_v2" class="nav-link"> <span>Add  Attributes</span> <span class="badge post">POST</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/put_v2-product-attributes" class="nav-link"> <span>Update Attributes</span> <span class="badge put">PUT</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/get_v2-product-attributes" class="nav-link"> <span>Get/Search Attributes</span> <span class="badge get">GET</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/add_product_attribute_values_v2" class="nav-link"> <span>Add Attribute Values</span> <span class="badge post">POST</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/put_v2-product-attributevalues" class="nav-link"> <span>Update Attribute Values</span> <span class="badge put">PUT</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/get_v2-product-attributes-attributeid-values" class="nav-link"> <span>Get/Search Attribute Values</span> <span class="badge get">GET</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/post_v2-product-categories" class="nav-link"> <span>Add  Categories</span> <span class="badge post">POST</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/put_v2-product-categories" class="nav-link"> <span>Update Categories</span> <span class="badge put">PUT</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/get_v2-product-categories" class="nav-link"> <span>Get/Search Categories</span> <span class="badge get">GET</span> </a> </li> </ul> </div> </body> </html>
`}</HTMLBlock>

<br />

<HTMLBlock>{`
<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>QuickStart: Set up products using the Product APIs</title> <style> body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell; line-height: 1.6; } .qs-list { list-style: none; padding: 0; margin: 0; max-width: 800px; counter-reset: qs-counter; } .qs-item { padding: 0; border-radius: 8px; margin: 8px 0; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); background-color: rgba(240, 240, 240, 0.4); border: 1px solid rgba(60, 60, 60, 0.1); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02); overflow: hidden; counter-increment: qs-counter; } .qs-item:hover { background-color: rgba(255, 255, 255, 0.8); transform: translateX(4px); border-color: rgba(0, 122, 255, 0.3); box-shadow: 0 8px 16px rgba(0, 122, 255, 0.1); } .qs-link { text-decoration: none !important; border-bottom: none !important; color: #1d1d1f; display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; font-size: 15px; font-weight: 500; gap: 12px; } .qs-link:hover { color: #007AFF; text-decoration: none !important; } .qs-step { display: flex; align-items: center; gap: 12px; } .qs-number { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background-color: #e3f2fd; color: #0d47a1; font-size: 13px; font-weight: 700; flex-shrink: 0; transition: all 0.3s ease; border: 1px solid #bbdefb; } .qs-item:hover .qs-number { background-color: #0366d6; color: white; border-color: transparent; box-shadow: 0 0 10px rgba(3, 102, 214, 0.4); } .qs-desc { font-size: 13px; color: #6e6e73; margin-top: 2px; font-weight: 400; } .qs-text { display: flex; flex-direction: column; } .badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; min-width: 45px; text-align: center; letter-spacing: 0.5px; transition: all 0.3s ease; opacity: 0.75; flex-shrink: 0; } .post { background-color: #e6f7ed; color: #1e7e34; border: 1px solid #bcebc9; } .get { background-color: #e3f2fd; color: #0d47a1; border: 1px solid #bbdefb; } .qs-item:hover .badge { opacity: 1; transform: scale(1.05); color: white; border-color: transparent; } .qs-item:hover .post { background-color: #2ea44f; box-shadow: 0 0 12px rgba(46, 164, 79, 0.5); } .qs-item:hover .get { background-color: #0366d6; box-shadow: 0 0 12px rgba(3, 102, 214, 0.5); } </style> </head> <body> <div class="doc-container"> <ul class="qs-list"> <li class="qs-item"> <a href="https://docs.capillarytech.com/reference/post_v2-product-brands" class="qs-link"> <div class="qs-step"> <span class="qs-number">1</span> <div class="qs-text"> <span>Create brands</span> <span class="qs-desc">Create parent and child brands first. SKUs and categories reference brand codes.</span> </div> </div> <span class="badge post">POST</span> </a> </li> <li class="qs-item"> <a href="https://docs.capillarytech.com/reference/post_v2-product-categories" class="qs-link"> <div class="qs-step"> <span class="qs-number">2</span> <div class="qs-text"> <span>Create categories</span> <span class="qs-desc">Create product categories and category hierarchies.</span> </div> </div> <span class="badge post">POST</span> </a> </li> <li class="qs-item"> <a href="https://docs.capillarytech.com/reference/add_product_attributes_v2" class="qs-link"> <div class="qs-step"> <span class="qs-number">3</span> <div class="qs-text"> <span>Create product attributes</span> <span class="qs-desc">Define custom attributes such as material, size, or fit.</span> </div> </div> <span class="badge post">POST</span> </a> </li> <li class="qs-item"> <a href="https://docs.capillarytech.com/reference/add_product_attribute_values_v2" class="qs-link"> <div class="qs-step"> <span class="qs-number">4</span> <div class="qs-text"> <span>Create attribute values</span> <span class="qs-desc">Create allowed values for attributes that require controlled inputs.</span> </div> </div> <span class="badge post">POST</span> </a> </li> <li class="qs-item"> <a href="https://docs.capillarytech.com/reference/post_v2-product-skus" class="qs-link"> <div class="qs-step"> <span class="qs-number">5</span> <div class="qs-text"> <span>Create SKUs</span> <span class="qs-desc">Create SKUs only after brands, categories, and attributes exist.</span> </div> </div> <span class="badge post">POST</span> </a> </li> <li class="qs-item"> <a href="https://docs.capillarytech.com/reference/get_v2-product-skus" class="qs-link"> <div class="qs-step"> <span class="qs-number">6</span> <div class="qs-text"> <span>Retrieve and verify data</span> <span class="qs-desc">Use GET and search APIs to validate the setup.</span> </div> </div> <span class="badge get">GET</span> </a> </li> </ul> </div> </body> </html>
`}</HTMLBlock>

```
```