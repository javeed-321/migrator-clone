---
updatedAt: 2026-08-11T13:09:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Location APIs (v2)

Businesses with multiple physical or operational outlets need a way to organize their locations. A business may operate across multiple brands, business units, regions, cities, stores, and point-of-sale terminals. Managing these relationships consistently is essential for reporting, customer engagement, and day-to-day operations.

The Location APIs let you create and manage this location structure in Capillary. They allow you to organize your business in two independent ways:

* **By business structure**, such as brands, business units, or sales channels.
* **By geographic or operational structure**, such as countries, regions, cities, or operational areas.

The Location APIs organize your locations using three parent relationship fields:

* **Group parent code**

  \- Organizes locations by **business structure**, such as business units, brands, sales channels, or franchises. These business-unit groupings are represented as **Concepts** in the APIs. Each concept links to its parent using the`groupParentCode` parameter, the field that points to the concept directly above it in the business hierarchy. For example, suppose a parent business unit called acme-group contains a brand called acme-retail. When creating acme-retail, set `groupParentCode` parameter to acme-group.&#x20;

  If `groupParentCode` is left blank, the grouping has no parent and becomes a **root concept**. A root is a concept with no grouping above it. It sits at the top of its own business hierarchy. You can create multiple root concepts, with each one starting an independent business hierarchy.

  A root concept can also be marked as an [organizational unit](https://docs.capillarytech.com/docs/organisation-units-ou) by setting the `isOrgUnit` flag. This allows it to represent a business unit, such as a parent company. Additional business-unit groupings can then be created under it, and stores can be linked to those groupings.

**Example**

```
acme_group
(root concept,
isOrgUnit = true)

└── acme_retail
    (groupParentCode: acme_group)

    └── store_01
        (groupParentCode: acme_retail)
```

In this example:

\- `acme_group` is created without a `groupParentCode`, making it the root concept.

\- `acme_group` is also marked as an organizational unit using `isOrgUnit`.

\- `acme_retail` is linked to `acme_group`.

\- `store_01` belongs to `acme_retail`.

***

* **Area parent code**

  – Organizes locations by **geographic or operational structure**, such as countries, regions, cities, territories, or operational areas. These geographic or operational groupings are represented as **Zones** in the APIs. Each zone links to its parent using `areaParentCode` parameter, building a nested hierarchy, for example, a city zone sitting under a region zone, which sits under a country zone, so your zones reflect your business's real geographic structure.

  Unlike business-unit groupings, every geographic or operational grouping must have a parent. You cannot leave `areaParentCode` parameter blank to create a new root grouping.

  Each organization already contains a built-in root grouping with the code `root`. Every new geographic or operational grouping must reference either:

  * `Root`
  * another existing geographic or operational grouping

**Example**

```
root

└── India
    (areaParentCode: root)

    └── South India
        (areaParentCode: India)

        └── Bangalore
            (areaParentCode: South India)
```

Each grouping references only its immediate parent. For example, **Bangalore** references **South India**. It does not directly reference **India** or **root**.

Unlike business-unit groupings, geographic or operational groupings cannot be marked as organizational units.

***

* **Store parent code & Tills** – Links a **point of transaction** to the physical or operational location where transactions take place. Points of transaction are represented as **Tills** in the APIs, while physical or operational locations are represented as **Stores** in the APIs.&#x20;

  Every physical or operational location belongs to both a business-unit grouping using `groupParentCode` and a geographic or operational grouping using `areaParentCode`, thereby linking the business and geographic structures. Both parameters are required when creating or updating a physical or operational location.&#x20;

  Each till links to its store using `storeParentCode` parameter, so that the till automatically inherits the store's settings and every transaction can be traced back to the exact location it happened in.

**Example**

Suppose you have:

* A business unit grouping called **Retail**.
* A geographic or operational grouping called **Bangalore**.

You then create a physical or operational location called **Store\_01** with:

```
groupParentCode: retail
areaParentCode: bangalore
```

Next, you create a point of transaction called **Till\_01** with:

```
storeParentCode: store_01
```

In this example:

The resulting relationships look like this:

```
                 (Retail)
                    │
                    │ 
                    ▼
               Store-01 ─────────────────────▶ Till-01
                           
                    ▲
                    │ 
                    │
               (Bangalore)
```

* **Store\_01** is linked to the **Retail** business-unit grouping using `groupParentCode`.
* **Store\_01** is linked to the **Bangalore** geographic or operational grouping using `areaParentCode`.
* **Till\_01** is linked to **Store\_01** using `storeParentCode`.
* **Till\_01** automatically inherits the business-unit grouping, geographic or operational grouping, and locale settings from **Store\_01**.

## **Example: Setting up locations for an airline**

Suppose SkyJet operates flights across multiple cities in India. It wants to organize its business by airline brand, geographic regions, airport service locations, and check-in counters.

So consider -&#x20;

* Parent company (Root concept): skyjet\_group
* Business-unit grouping (Concept): skyjet\_airlines
* Geographic or operational grouping (Zone): south\_india&#x20;
* Physical or operational location (Store): blr\_airport\_service&#x20;
* Points of transaction (Tills): counter\_01 and counter\_02 (check-in counters)

The complete structure looks like this:

```
Business structure                          Geographic structure

skyjet_group                                root
  └── skyjet_airlines                         └── India
                                                 └── South India
                    \                         /
                     \                       /
                      \                     /
                       └── blr_airport_service
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
            counter_01                    counter_02
```

In this example:

* `skyjet_group` is the root business-unit grouping and is marked as an organizational unit.
* `skyjet_airlines` belongs to `skyjet_group` using `groupParentCode`.
* `India` and `South India` are organized using `areaParentCode`.
* `blr_airport_service` belongs to both the `skyjet_airlines` business-unit grouping and the `South India` geographic grouping.
* `counter_01` and `counter_02` belong to `blr_airport_service` using `storeParentCode`.
* Both points of transaction automatically inherit the business-unit grouping, geographic grouping, language, currency, and timezone from their parent location.

## API operations

Each write operation processes items independently. If one item fails validation or processing, the remaining items in the same request continue to be processed.

The HTTP response status indicates the overall result.

| HTTP status          | Meaning                                                      |
| :------------------- | :----------------------------------------------------------- |
| **201 Created**      | All items were processed successfully.                       |
| **207 Multi-Status** | Some items were processed successfully, while others failed. |
| **400 Bad Request**  | All items failed validation or processing.                   |

The following endpoints are available for managing location data.

| Operation                                         | Method | Endpoint                 | Batch limit                |
| :------------------------------------------------ | :----- | :----------------------- | :------------------------- |
| Search locations                                  | GET    | `/v2/locations`          | Up to 100 results per page |
| Create business-unit groupings (CONCEPT)          | POST   | `/v2/locations/concepts` | 100 per request            |
| Update business-unit groupings (CoONCEPT)         | PUT    | `/v2/locations/concepts` | 100 per request            |
| Create geographic or operational groupings (ZONE) | POST   | `/v2/locations/zones`    | 100 per request            |
| Update geographic or operational groupings (ZONE) | PUT    | `/v2/locations/zones`    | 100 per request            |
| Create physical or operational locations (STORE)  | POST   | `/v2/locations/stores`   | 100 per request            |
| Update physical or operational locations (STORE)  | PUT    | `/v2/locations/stores`   | 100 per request            |
| Create points of transaction (TILL)               | POST   | `/v2/locations/tills`    | 50 per request             |
| Update points of transaction (TILL)               | PUT    | `/v2/locations/tills`    | 50 per request             |

## Quick Start

Create your location structure in the following order. A child cannot be created until its parent exists.

### Step 1 — Create business-unit groupings

Create your top-level business-unit groupings, such as parent companies, brands, or sales channels.

* Call **Add concepts in bulk**.
* Leave `groupParentCode` blank to create a root concept.

### Step 2 — Create geographic or operational groupings

Create the geographic or operational structure for your business, such as countries, regions, and cities.

* Call **Add zones in bulk**.
* Set `areaParentCode` to an existing parent grouping.
* Use the built-in `root` grouping as the parent for top-level groupings.

### Step 3 — Create physical or operational locations

Create the physical or operational locations where your business operates.

* Call **Add stores in bulk**.
* Set `groupParentCode` to the appropriate business-unit grouping.
* Set `areaParentCode` to the appropriate geographic or operational grouping.

### Step 4 — Create points of transaction

Create the individual points where transactions take place.

* Call **Add tills in bulk**.
* Set `storeParentCode` to the parent physical or operational location.
* Language, currency, and timezone are inherited automatically from the parent location.

### Step 5 — Verify the location structure

Call **Get locations** to verify that your location structure has been created successfully.

Useful query parameters include:

* `includeChildren=true` to retrieve the immediate children of a location.
* `entityCodes` to retrieve a specific location.
* `type` to list all locations of a specific type.

<br />